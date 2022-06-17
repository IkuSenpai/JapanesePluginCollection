/*=============================================================================
 CSVN_levelUpParamsDiff.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/19 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/
/*:ja
 * @target MZ
 * @plugindesc Add params diff to given message when level up.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n84ef73d3134b
 *
 * @help CSVN_levelUpParamsDiff.js
 *
 * Add params diff to given message when level up.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param textformat
 * @text text format
 * @type text
 * @default %1:  %2 -> %3
 * @desc %1: name %2: previous %3: current
 *
 * @param atk
 * @text atk
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param def
 * @text def
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param mat
 * @text mat
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param mdf
 * @text mdf
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param agi
 * @text agi
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 *
 * @param luk
 * @text luk
 * @type boolean
 * @on Show
 * @off Hide
 * @default true
 */

/*:ja
 * @target MZ
 * @plugindesc レベルアップ時のメッセージに能力値の変化についての内容を追加します。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n84ef73d3134b
 *
 * @help CSVN_levelUpParamsDiff.js
 *
 * レベルアップ時のメッセージに能力値の変化についての内容を追加します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param textformat
 * @text フォーマット
 * @type text
 * @default %1 が %2 から %3 にあがった！
 * @desc %1: なまえ %2: 前の値 %3: 今の値
 *
 * @param atk
 * @text 攻撃力
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
 * @param def
 * @text 防御力
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
 * @param mat
 * @text 魔法力
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
 * @param mdf
 * @text 魔法防御
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
 * @param agi
 * @text 敏捷性
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 *
 * @param luk
 * @text 運
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 */
(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);
    const paramsList = [
        true,
        true,
        params.atk,
        params.def,
        params.mat,
        params.mdf,
        params.agi,
        params.luk
    ];

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this._lastLevel = 0;
    }

    const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function(exp, show) {
        this._lastLevel = this._level

        _Game_Actor_changeExp.call(this, exp, show);

        if (show && this._level > this._lastLevel) {
            this.displayLevelUpParamsDiff();
        }
        this.refresh();
    }

    Game_Actor.prototype.displayLevelUpParamsDiff = function() {
        let lines = [];
        let paramsCount = this.currentClass().params.length;
        let paramName = '';
        let prevParamValue = 0;
        let currentParamValue = 0;
        for (let i = 0; i < paramsCount; i++) {
            if (!paramsList[i]) continue;

            paramName = TextManager.param(i);
            prevParamValue = this.currentClass().params[i][this._lastLevel];
            currentParamValue = this.currentClass().params[i][this._level];

            if (prevParamValue == currentParamValue) continue;

            lines.push(params.textformat.format(paramName, prevParamValue, currentParamValue));
        }

        $gameMessage.newPage();
        $gameMessage.add(lines.join("\n"));
    }
})();