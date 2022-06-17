/*=============================================================================
 CSVN_criticalDamageFormula2.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/03 初版
 1.0.1 2021/08/03 魔法スキルの会心にも適用されてしまっていた問題の修正
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Critical damage calculation formula
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n26a7b2096142
 *
 * @help CSVN_criticalDamageFormula2.js
 *
 * A special damage calculation formula is applied when a critical hit occurs.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param formula
 * @text formula
 * @type text
 * @default a.atk
 * @desc Can be set in the same way as the calculation formula part of skill editing.
 */

/*:ja
 * @target MZ
 * @plugindesc クリティカルがでたとき専用ダメージ計算式
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n26a7b2096142
 *
 * @help CSVN_criticalDamageFormula2.js
 *
 * クリティカルがでたとき専用ダメージ計算式を適用します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param formula
 * @text 計算式
 * @type text
 * @default a.atk
 * @desc スキル編集の計算式部分と同様に設定できます
 */
(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
        if (this.isPhysical() && target.result().critical) {
            value = this.reEvalDamageFormulaCritical(target);
            value = this.applyVariance(value, this.item().damage.variance);
        }

        _Game_Action_executeDamage.call(this, target, value);
    };

    Game_Action.prototype.reEvalDamageFormulaCritical = function(target) {
        try {
            const item = this.item();
            const a = this.subject(); // eslint-disable-line no-unused-vars
            const b = target; // eslint-disable-line no-unused-vars
            const v = $gameVariables._data; // eslint-disable-line no-unused-vars
            const sign = [3, 4].includes(item.damage.type) ? -1 : 1;
            const value = Math.max(eval(params.formula), 0) * sign;
            return isNaN(value) ? 0 : value;
        } catch (e) {
            return 0;
        }
    };
})();