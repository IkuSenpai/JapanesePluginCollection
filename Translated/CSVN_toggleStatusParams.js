/*=============================================================================
 CSVN_toggleStatusParams.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/13 初版
 1.0.1 2021/07/17 PluginCommonBase採用
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Toggle show/hide of status params.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/ne5da99d8d97a
 *
 * @help CSVN_toggleStatusParams.js
 *
 * Toggle show/hide of atk/def/mat/mdf/agi/luk in status window
 * with plugin settings.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
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
 * @plugindesc ステータス画面の能力値の表示/非表示を切り替えます。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/ne5da99d8d97a
 *
 * @help CSVN_toggleStatusParams.js
 *
 * ステータス画面の攻撃力／防御力／魔法力／魔法防御／敏捷性／運の
 * ６項目について設定で表示をON/OFFします。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
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

    const atkParamId = 2;
    const defParamId = 3;
    const matParamId = 4;
    const mdfParamId = 5;
    const agiParamId = 6;
    const lukParamId = 7;

    //
    // index(表示位置)とparamId(パラメータ)の関係を決定
    //
    let indexes = [0, 1, 2, 3, 4, 5];
    let paramIds = [
        atkParamId,
        defParamId,
        matParamId,
        mdfParamId,
        agiParamId,
        lukParamId,
    ];

    if (!params.atk) {
        indexes.pop();
        paramIds.splice(indexes.length - 5, 1);
    }
    if (!params.def) {
        indexes.pop();
        paramIds.splice(indexes.length - 4, 1);
    }
    if (!params.mat) {
        indexes.pop();
        paramIds.splice(indexes.length - 3, 1)
    }
    if (!params.mdf) {
        indexes.pop();
        paramIds.splice(indexes.length - 2, 1);
    }
    if (!params.agi) {
        indexes.pop();
        paramIds.splice(indexes.length - 1, 1);
    }
    if (!params.luk) {
        indexes.pop();
        paramIds.splice(indexes.length - 0, 1);
    }

    Window_StatusParams.prototype.drawItem = function(index) {
        if (index >= indexes.length) return;

        index = indexes[index];
        const paramId = paramIds[index];

        const rect = this.itemLineRect(index);
        const name = TextManager.param(paramId);
        const value = this._actor.param(paramId);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(name, rect.x, rect.y, 160);
        this.resetTextColor();
        this.drawText(value, rect.x + 160, rect.y, 60, "right");
    };

    Window_EquipStatus.prototype.drawAllParams = function() {
        for (let i = 0; i < 6; i++) {
            if (!indexes.includes(i)) continue;

            const ix = indexes[i];
            const x = this.itemPadding();
            const y = this.paramY(ix);
            const p = paramIds[ix];
            this.drawItem(x, y, p);
        }
    };
})();