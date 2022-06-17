/*=============================================================================
 CSVN_disableFloorDamage.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/09 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Disable floor damage by switch, steps, equipments.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n3bca5fac7506
 *
 * @help CSVN_disableFloorDamage.js
 *
 * Disables floor damage with certain switches or equipments.
 * Floor damage will only be disabled for members equipped with equipment
 * that has <disableFloorDamage:1> in the memo field.
 *
 * Also, when a variable is specified in the plugin parameter,
 * it operates as follows.
 * @ The value of the specified variable is 1 or more and
 *   it is not damage floor that you stepped on.
 * > Decrease the value of the specified variable by 1.
 * @ The value of the specified variable is 1 or more and
 *   it is damage floor thta you stepped on.
 * > Disable floor damage without changing the value of the specified
 *   variable.
 * @ Specified vatiable is 0.
 * > Normal processing regardless of whether it is damage floor or not.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param switchId
 * @text
 * @desc
 * @type switch
 *
 * @param varId
 * @text
 * @desc
 * @type variable
 */

/*:ja
 * @target MZ
 * @plugindesc ダメージ床無効状態を実装します
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n3bca5fac7506
 *
 * @help CSVN_disableFloorDamage.js
 *
 * 特定のスイッチもしくは装備品でダメージ床を無効化します。
 * メモ欄に <disableFloorDamage:1> と書いてある装備品を
 * 装備しているメンバーのみ、ダメージ床は無効になります。
 *
 * また、プラグインパラメータで変数を指定した場合は以下のとおり
 * 動作します。
 * ・指定変数の値が1以上でかつ踏んだのがダメージ床でない
 * 　指定変数の値を1減。
 * ・指定変数の値が1以上でかつ踏んだのがダメージ床である
 * 　指定変数の値は変えずにダメージ床を無効化。
 * ・指定変数が0。
 * 　ダメージ床かどうかによらず通常通りの処理。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param switchId
 * @text 無効化スイッチ
 * @desc
 * @type switch
 *
 * @param varId
 * @text 残歩数を入れる変数
 * @desc
 * @type variable
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
    Game_Party.prototype.onPlayerWalk = function() {
        if (!$gamePlayer.isOnDamageFloor()
         && $gameSwitches.value(params.switchId)) {
            let leftSteps = $gameVariables.value(params.varId);
            leftSteps--;
            $gameVariables.setValue(params.varId, leftSteps);

            if (leftSteps == 0) {
                $gameSwitches.setValue(params.switchId, false);
            }
        }

        _Game_Party_onPlayerWalk.call(this);
    };

    const _Game_Actor_basicFloorDamage = Game_Actor.prototype.basicFloorDamage;
    Game_Actor.prototype.basicFloorDamage = function() {
        if ($gameSwitches.value(params.switchId)) {
            return 0;
        }

        for (const equip of this.equips()) {
            if (equip && equip.meta && equip.meta.disableFloorDamage == 1) {
                return 0;
            }
        }

        return _Game_Actor_basicFloorDamage.call(this);
    };
})();