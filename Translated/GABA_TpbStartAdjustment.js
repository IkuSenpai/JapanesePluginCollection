//=============================================================================
// RPG Maker MZ - Tpb Start Adjustment
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adjust the initial value of the time progress battle bar.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_TpbStartAdjustment.js(ver1.0.1)
 *
 * Adjust the initial value of the time progress battle bar.
 * Affects only immediately after the start of battle.
 *
 * The initial value is calculated by the following formula.
 * Specify each value as a parameter.
 *
 * Basic value + Random value x Speed ​​value
 *
 * - Basic value
 * Regardless of other values, it will start with this value added.
 *
 * - Random value
 * You can specify the upper limit with the parameter.
 * The default is 50%.
 * It is possible to set not to use a random value.
 * If you do not use a random value, the speed value described below will also be ignored.
 *
 * - Speed ​​value
 * Calculated automatically by the core script.
 * The fastest character is 1, and the slower the character, the closer to 0.
 * You can specify whether to enable the speed value with the parameter.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param baseValue
 * @text Base value
 * @type number
 * @desc Specify the base value in%. (0-100)
 * @default 0
 * @min 0
 * @max 100
 *
 * @param useRandom
 * @text Enable random value
 * @type boolean
 * @desc Specifies whether to add a random value to the base value.
 * @default true
 *
 * @param randomValueUpper
 * @text Random value upper limit
 * @type number
 * @desc Specify the upper limit of the random value in%. (0-100)
 * @default 50
 * @min 0
 * @max 100
 *
 * @param useCharaSpeed
 * @text Enable speed value
 * @type boolean
 * @desc Specifies whether to multiply the speed value by a random value.
 * @default true
 *
 */

/*:ja
 * @target MZ
 * @plugindesc タイムプログレス戦闘のバーの初期値を調整します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_TpbStartAdjustment.js(ver1.0.1)
 *
 * タイムプログレス戦闘のバーの初期値を調整します。
 * ※戦闘開始直後にだけ影響します。
 *
 * 初期値は次の計算式で求めます。
 * それぞれの値をパラメーターで指定してください。
 *
 * 基本値 ＋ ランダム値 × スピード値
 *
 * ■基本値
 * 他の値にかかわらず、この値が加算された状態でスタートします。
 *
 * ■ランダム値
 * パラメーターで上限値を指定できます。デフォルト50%です。
 * ランダム値を使用しない設定も可能です。
 * ランダム値を使用しない場合、スピード値は無視されます。
 *
 * ■スピード値
 * コアスクリプトで自動的に算出されます。
 * 最速キャラを1として、遅いキャラほど0に近付く値です。
 * パラメーターでスピード値を有効にするかどうかを指定できます。
 *
 * ☆ランダム値を使用しない場合、
 *  基本値が0だと最初のコマンド選択までヒマになります。
 *  50%くらいがおすすめです。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param baseValue
 * @text 基本値
 * @type number
 * @desc 基本値を%で入力します。(0-100)
 * @default 0
 * @min 0
 * @max 100
 *
 * @param useRandom
 * @text ランダム値を使用する
 * @type boolean
 * @desc 基本値にランダム値を加算するか指定します。
 * @default true
 *
 * @param randomValueUpper
 * @text ランダム値上限
 * @type number
 * @desc ランダム値の上限を%で入力します。(0-100)
 * @default 50
 * @min 0
 * @max 100
 *
 * @param useCharaSpeed
 * @text スピード値を使用する
 * @type boolean
 * @desc キャラのスピード値をランダム値に掛けるか指定します。
 * @default true
 *
 */

(() => {
    "use strict";
    const pluginName = "GABA_TpbStartAdjustment";

	const parameters = PluginManager.parameters(pluginName);
    const baseValue = (Number(parameters["baseValue"]) || 0) / 100;
    const useRandom = parameters["useRandom"]  === "true";
    const randomValueUpper = Number(parameters["randomValueUpper"]) || 0;
    const useCharaSpeed = parameters["useCharaSpeed"]  === "true";

    const _Game_Battler_initTpbChargeTime = Game_Battler.prototype.initTpbChargeTime;
    Game_Battler.prototype.initTpbChargeTime = function(advantageous) {
        _Game_Battler_initTpbChargeTime.apply(this, arguments);

        // _tpbChargeTimeを再計算
        if (!advantageous) {
            const speedValue = this.tpbRelativeSpeed();

            let randomValue = 0;
            if (useRandom) {
                randomValue = Math.random() * randomValueUpper / 100;
            }

            if (useCharaSpeed) {
                this._tpbChargeTime = baseValue + randomValue * speedValue;
            } else {
                this._tpbChargeTime = baseValue + randomValue;
            }
            if (this.isRestricted()) {
                this._tpbChargeTime = 0;
            }
        }
    };

})();
