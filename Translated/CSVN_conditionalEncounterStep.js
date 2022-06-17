/*=============================================================================
 CSVN_conditionalEncounterStep.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/09/17 初版
 1.0.1 2021/09/17 マップIDの条件がきいていないバグを修正
 1.0.2 2021/09/17 いちど条件合致判定されるとそのままになるバグを修正
 1.0.3 2021/09/18 変数の条件判定のバグを修正
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Change the encounter steps under certain conditions
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n606e3e2ac9e4
 *
 * @help CSVN_conditionalEncounterStep.js
 *
 * Determine the values of the switches and variables set on the plug-in side,
 * and change encounter steps on the specified map.
 *
 * If you set both the switch and the variable, encounter steps will
 * change if both conditions are met.
 *
 * If multiple conditions are met on the same map at the same time,
 * the content of the higher-level condition is prioritized.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param conditions
 * @text conditions
 * @desc The target map, switch, variable, and encounter steps after the change are retained as set values.
 * @default []
 * @type struct<conditions>[]
 */
/*~struct~conditions:
 *
 * @param mapId
 * @text map ID
 * @desc The map ID for which you want to change encounter steps.
 * @default 1
 * @type number
 *
 * @param switchId
 * @text switch ID
 * @desc The condition for the change is that this switch is ON. If left blank, it will be ignored.
 * @default
 * @type switch
 *
 * @param varId
 * @text variable ID
 * @desc The value of this variable to be checked. If left blank, it will be ignored.
 * @default
 * @type variable
 *
 * @param varValue
 * @text variable value
 * @desc The value of the variable specified by the variable ID.
 * @default 0
 * @type number
 *
 * @param varInequality
 * @text ineuqality
 * @desc An inequality sign that compares the value of a specified variable with the set value.
 * @type select
 * @option =
 * @value 0
 * @option <=
 * @value 1
 * @option >=
 * @value 2
 * @default 0
 *
 * @param encounterStep
 * @text encounter steps after change
 * @desc The modified encounter steps to apply when the conditions are met.
 * @type number
 * @default 30
 */

/*:ja
 * @target MZ
 * @plugindesc 特定条件下で敵出現歩数を変更
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n606e3e2ac9e4
 *
 * @help CSVN_conditionalEncounterStep.js
 *
 * プラグイン側で設定したスイッチや変数の値を見て、指定したマップでの
 * 敵出現歩数を変更します。
 *
 * スイッチと変数両方を設定した場合は、両方の条件を満たした場合に
 * 敵出現歩数が変更されます。
 *
 * 同じマップで複数条件が同時に合致した場合、
 * 上位に設定されている条件の内容を優先します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param conditions
 * @text 設定
 * @desc 対象マップやスイッチ、変数、変更後の敵出現歩数を設定値として保持します。
 * @default []
 * @type struct<conditions>[]
 */
/*~struct~conditions:ja
 *
 * @param mapId
 * @text マップID
 * @desc 敵出現歩数を変更したいマップID。
 * @default 1
 * @type number
 *
 * @param switchId
 * @text スイッチID
 * @desc このスイッチがONであることが変更の条件になります。空欄にすると無視します。
 * @default
 * @type switch
 *
 * @param varId
 * @text 変数ID
 * @desc この変数の値を確認します。空欄にすると無視します。
 * @default
 * @type variable
 *
 * @param varValue
 * @text 変数値
 * @desc 変数IDで指定した変数の値です。
 * @default 0
 * @type number
 *
 * @param varInequality
 * @text 変数の不等号
 * @desc 指定した変数の値と設定値を比較する不等号です。
 * @type select
 * @option =
 * @value 0
 * @option <=
 * @value 1
 * @option >=
 * @value 2
 * @default 0
 *
 * @param encounterStep
 * @text 変更後の敵出現歩数
 * @desc 条件が満たされた場合に適用する変更後の敵出現歩数。
 * @type number
 * @default 30
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);
    const conditions = params.conditions;

    const _Game_Map_encounterStep = Game_Map.prototype.encounterStep;
    Game_Map.prototype.encounterStep = function() {
        let matchedCondition = null;
        for (const condition of conditions) {
            // 合否判断
            const judge = judgeCondition(condition);

            // 設定した条件を満たしていたらその条件を採用する
            if (judge) {
                matchedCondition = condition;
                break;
            } else {
                // 設定条件を満たしていなかったら次の条件の判断に移る
                continue;
            }
        }

        // 設定した条件のなかでひとつでも合致していれば、
        // その条件にそって変更した敵出現歩数を返す
        if (matchedCondition !== null) {
            //console.log(`----> changed: ${matchedCondition.encounterStep}`);
            return matchedCondition.encounterStep;
        } else {
            // 設定条件を満たしていなかったらマップ設定の値をそのまま返す
            //console.log(`----> not changed: ${_Game_Map_encounterStep.call(this)}`);
            return _Game_Map_encounterStep.call(this);
        }
    };

    /**
     * スイッチ・変数の設定有無も考慮した合否判断
     */
    function judgeCondition(condition) {
        let judge = false;

        // マップIDが入っている
        if (condition.mapId) {
            if ($gameMap.mapId() == condition.mapId) {
                // 条件にスイッチが設定されている
                if (condition.switchId) {
                    // 指定したスイッチがON
                    if ($gameSwitches.value(condition.switchId)) {
                        // 条件に変数が設定されている
                        if (condition.varId && condition.varValue) {
                            // 変数が条件を満たしているか判断
                            judge = judgeByVar(condition);
                        } else {
                            // 条件に変数が設定されていない
                            judge = true;
                        }
                    } else {
                        // 指定したスイッチがOFF
                        judge = false;
                    }
                } else {
                    // 条件にスイッチが設定されていない
                    // 条件に変数が設定されている
                    if (condition.varId && condition.varValue) {
                        // 変数が条件を満たしているか判断
                        judge = judgeByVar(condition);
                    } else {
                        // 条件に変数が設定されていない
                        judge = false;
                    }
                }
            } else {
                judge = false;
            }
        }

        //console.log(`mapId: ${$gameMap.mapId()}`);
        //console.log(condition);
        //console.log(`judge: ${judge}`);
        return judge;
    }

    /**
     * 設定条件のうち変数部分を満たしているかの判断
     */
    function judgeByVar(condition) {
        let judge = false;
        const varId = condition.varId;
        const varValue = condition.varValue;
        switch (Number(condition.varInequality)) {
            case 0:
                if ($gameVariables.value(varId) == varValue) {
                    judge = true;
                }
                break;
            case 1:
                if ($gameVariables.value(varId) <= varValue) {
                    judge = true;
                }
                break;
            case 2:
                if ($gameVariables.value(varId) >= varValue) {
                    judge = true;
                }
                break;
            default:
                if ($gameVariables.value(varId) == varValue) {
                    judge = true;
                }
                break;
        }

        return judge;
    }
})();