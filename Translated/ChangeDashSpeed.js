/*:
 * @target MZ
 * @plugindesc Change Dash Speed
 * @author キュウブ
 *
 * @help ChangeDashSpeed.js
 *
 * This plugin can you to change the speed of the dash.
 * @param dashCorrection
 * @text Dash Correction
 * @desc The higher this value is, the dash will be fast.
 * @default 2.0
 * @type number
 * @decimals 1
 * @min 1
 */

/*:ja
 * @target MZ
 * @plugindesc ダッシュ時のスピードを変更する
 * @author キュウブ
 *
 * @help ChangeDashSpeed.js
 *
 * ダッシュ時のスピードが変化する。
 * @param dashCorrection
 * @text ダッシュ補正
 * @desc この値が大きい程速くなります。
 * @default 2.0
 * @type number
 * @decimals 1
 * @min 1
 */

(() => {
    'use strict';
    const pluginName = "ChangeDashSpeed";
    Game_CharacterBase.prototype.realMoveSpeed = function() {
        const dashCorrection = PluginManager.parameters(pluginName).dashCorrection;
        return this._moveSpeed + (this.isDashing() ? Number(dashCorrection) : 0);
    };
})();