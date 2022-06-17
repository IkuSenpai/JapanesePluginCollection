/*=============================================================================
 CSVN_executeDamageMetasla.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/03 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Overwrite part of 0 damage to 1
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n26a7b2096142
 *
 * @help CSVN_executeDamageMetasla.js
 *
 * When you physically attack a very hard enemy and the damage is 0,
 * it will be overwritten with 1 with the set probability.
 * In short, it achieves met_l-slime-like behavior.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param rate
 * @text Probability of becoming 1 (%)
 * @type number
 * @default 20
 * @desc With this probability, 0 damage will be overwritten by 1.
 */

/*:ja
 * @target MZ
 * @plugindesc ダメージ0の一部を1に上書き
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n26a7b2096142
 *
 * @help CSVN_executeDamageMetasla.js
 *
 * めちゃめちゃ硬い敵を物理攻撃してダメージが0だったとき、
 * 設定した確率でそれを1に上書きします。
 * 要するに、メ○ルスライムっぽい挙動を実現します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param rate
 * @text 1になる確率(%)
 * @type number
 * @default 20
 * @desc この確率で0のダメージが1に上書きされます。
 */
(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
    Game_Action.prototype.executeDamage = function(target, value) {
        if (this.isPhysical() && value === 0) {
            if (Math.randomInt(100) < params.rate) {
                value = 1;
            }
        }

        _Game_Action_executeDamage.call(this, target, value);
    };
})();