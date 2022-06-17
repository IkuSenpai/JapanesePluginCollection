/*=============================================================================
 CSVN_damageValueFromFormula.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/11 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Critical Damage Value Customization
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n6a2b8e384df4
 *
 * @help CSVN_damageValueFromFormula.js
 *
 * Change critical damage value formula from "damage * 3"
 * to your own formula.
 *
 * @param formula
 * @text formula
 * @type text
 * @default d * 3
 * @desc d is damage value without critical.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc クリティカルダメージのカスタマイズ
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n6a2b8e384df4
 *
 * @help CSVN_damageValueFromFormula.js
 *
 * クリティカル発生時のダメージを「算出値の３倍固定」ではなく
 * 任意の数式の計算結果で返すよう変更します。
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
 * @default d * 3
 * @desc dはクリティカルなしの場合の算出値です。
 */

(() => {
    'use strict';
    function setDefault(input, dflt) {
        return input ? input : dflt;
    }

    const params = PluginManager.parameters("CSVN_damageValueFromFormula");
    const formula = setDefault(params['formula'], 'd * 3');

    //
    // 設定された式の評価を以て計算結果とする
    //
    Game_Action.prototype.applyCritical = function(d) {
        return eval(formula);
    };

})();
