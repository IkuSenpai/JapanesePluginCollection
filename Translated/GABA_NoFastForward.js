//=============================================================================
// RPG Maker MZ - No Fast Forward
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Disable fast forward.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_NoFastForward.js(ver1.0.1)
 *
 * Disable fast forward.
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param canBattleLogFastForward
 * @text Enables fast forward of battle logs.
 * @type boolean
 * @desc ON:Fast forward enabled. / OFF:Fast forward disabled.
 * @on ON
 * @off OFF
 * @default true
 *
 *
 */

/*:ja
 * @target MZ
 * @plugindesc イベントの早送りを禁止します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_NoFastForward.js(ver1.0.1)
 *
 * ボタン押しっぱなしによるイベントの早送りを無効化します。
 *
 * ・メッセージ
 *   ボタン押しっぱなしでは次のメッセージに進まなくなります。
 *   メッセージの表示中に１度ボタンを押すと一括表示されます。
 *
 * ・バトルログ
 *   パラメーターで早送り禁止にするか設定してください。
 *   禁止にすると、ボタン押しっぱなし時の戦闘のテンポが悪くなります。
 *
 * ・テキストスクロールの早送り
 *   本プラグインは影響しません。イベントを作る時に毎回指定してください。
 *
 * プラグインコマンドはありません。
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param canBattleLogFastForward
 * @text バトルログの早送りは可能にする
 * @type boolean
 * @desc ON:早送り可能 OFF:早送り禁止
 * @on ON
 * @off OFF
 * @default true
 *
 */

(() => {
	"use strict";
	const pluginName = "GABA_NoFastForward";

	const parameters = PluginManager.parameters(pluginName);
	const canBattleLogFastForward = parameters["canBattleLogFastForward"]  === "true";

	Scene_Map.prototype.isFastForward = function() {
		return false;
	};

	// トリガー判定の上書き
	const _Window_Message_isTriggered = Window_Message.prototype.isTriggered;
	Window_Message.prototype.isTriggered = function() {
		const result = _Window_Message_isTriggered.apply(this, arguments);

		return (
			Input.isTriggered("ok") ||
			Input.isTriggered("cancel") ||
			TouchInput.isTriggered()
		);
	};

	const _Window_BattleLog_isFastForward = Window_BattleLog.prototype.isFastForward;
	Window_BattleLog.prototype.isFastForward = function() {
		if (!canBattleLogFastForward) {
			return false;
		}
		return _Window_BattleLog_isFastForward.apply(this, arguments);
	};

})();
