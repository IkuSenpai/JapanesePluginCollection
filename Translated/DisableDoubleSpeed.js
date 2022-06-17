/*:
* @target MZ
* @plugindesc イベント早回し禁止するアレ
* Ver 1.0.0
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help DisableDoubleSpeed.js
*
* ＜アレ＞
* ＭＺから決定操作ボタンを押している間、
* キャラクターの移動が早送りになる様になっています。
* その動作を禁止することが出来ます。
*
* 当方作「フェイレンワールドばぬべんちゃ」からより抜きのプラグイン。
* https://game.nicovideo.jp/atsumaru/games/gm16819
* （※２０２１年４月現在）
*
* ＜他＞
* プラグインコマンドはありません。
*
* 無保証。改造自由。
* 利用も商用・無償・年齢区分にかかわらず自由。
* ライセンスはＭＩＴでたのんます。
* 改造する時このヘルプの下部にあるＭＩＴに関する文章をいじくらなければＯＫ。
*
* ＜履歴＞
* Ver 1.0.0
* ・一応リリース。
*
* ＜ＭＩＴライセンス条文＞
* MIT License
* 
* Copyright (c) 2021 木下英一
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.

* @param disable_double_speed
* @text マップイベント早回しを無効にするかどうか
* @desc マップイベント中の決定キー長押しによる早回し操作を無効にします。
* @type boolean
* @default false
* @on うむッ！
* @off いかんッ！
*/

(() => {
	'use strict';
	//-----------------------------------------------------------------------------
	//
	//
	// パラメータをほじくるときに使います

	let plugin_params = PluginManager.parameters("DisableDoubleSpeed");
	//設定が無効になっているときはデフォルト値
	if(plugin_params["disable_double_speed"] === undefined)plugin_params["disable_double_speed"] = "false";

	//マップキャラ早回しの拒否設定
	{
		Scene_Map.prototype.isFastForward = function() {
			return (
				$gameMap.isEventRunning() &&
				!SceneManager.isSceneChanging() &&
				(Input.isLongPressed("ok") || TouchInput.isLongPressed()) &&
				!(plugin_params["disable_double_speed"] === "true")
			);
		};

		const old_game_interpreter_terminate = Game_Interpreter.prototype.terminate;
		Game_Interpreter.prototype.terminate = function() {
			old_game_interpreter_terminate.apply(this, arguments);
			$gamePlayer.forceMovingFollower = null;
		};
	}
})();
