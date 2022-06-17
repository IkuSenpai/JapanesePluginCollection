//=============================================================================
// PANDA_FixedTimer.js
//=============================================================================
// [Update History]
// 2021-09-11 Ver.1.0.0 First Release for MV/MZ.

/*:
 * @target MV MZ
 * @plugindesc Treat timers more strictly in units of the decimal point.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210911103413.html
 * 
 * @help Fix a bug in the core script that the seconds after the decimal point
 * is truncated when the timer is judged by conditional branch,
 * and the judgement will be made with a deviation of about 1 second.
 * 
 * The timer of RPG Maker holds the number of seconds after the decimal point,
 * which is less than one second, but it is "truncated" to the second
 * when it is actually used.
 * So if the timer is specified as "<= 0 seconds" in the conditional branch,
 * it is judged that is has become 0 seconds when it is less than 1 second,
 * even though there are actually 0.99 seconds left.
 * This plugin fixes this, so that the timer can be judged correctly.
 * 
 * Also, when displaying the timer or controling variabels,
 * the number of seconds after the decimal point will be "rounded up".
 * 
 * [Thanks to] Hoshigata (StarlagoonAP)
 * http://artificialprovidence.web.fc2.com/
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc タイマーを小数点以下の単位でより厳密に判定します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210911103413.html
 * 
 * @help 条件分岐でタイマーの判定をする際に小数点以下の秒数が切り捨てられ、
 * 約1秒ズレて判定されるというコアスクリプトの不具合を修正します。
 * 
 * RPGツクールのタイマーは、1秒未満の小数点以下の秒数も保持していますが、
 * 実際に使用される際は秒単位に切り詰められます。
 * この時、小数点以下の秒数が「切り捨て」られるため、
 * 条件分岐でタイマーを例えば「0秒以下」と指定した場合、
 * 実際にはまだ0.99秒残っているにもかかわらず、
 * 1秒を切った時点で0秒以下になったと判定されてしまいます。
 * 本プラグインはそれを修正し、小数点以下まで正しく判定できるようにします。
 * 
 * また、残りタイマー表示や変数操作の際は、
 * 小数点以下の秒数が「切り上げ」られるようにします。
 * 
 * ■ Thanks to 星潟(StarlagoonAP)
 * http://artificialprovidence.web.fc2.com/
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 타이머를 소수점 이하의 단위로 보다 엄격하게 판정합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210911103413.html
 * 
 * @help 조건 분기에서 타이머의 판정을 할 때, 소수점 이하의 초수가 잘리고
 * 약 1초 어긋나 판정되는 코어 스크립트의 버그를 수정합니다.
 * 
 * RPG Maker의 타이머는 1초 미만의 소수점 이하의 초수도 보유하고 있지만,
 * 실제로 사용될 때는 초 단위로 잘립니다.
 * 이때 소수점 이하의 초수가 "내림"되기 때문에,
 * 조건 분기에서 예를 들어 "0초 이하"로 지정한 경우,
 * 실제로는 아직 0.99초 남아 있음에도 불구하고,
 * 1초 미만이 된 시점에서 0초 이하로 되었다고 판정됩니다.
 * 이 플러그인은 이를 수정하고
 * 소수점 이하까지 정확하게 판정할 수 있도록 합니다.
 * 
 * 또한, 잔여 타이머 표시 및 변수 조작시,
 * 소수점 이하의 초수는 "올림"되도록 합니다.
 * 
 * [Thanks to] 호시가타 (StarlagoonAP)
 * http://artificialprovidence.web.fc2.com/
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
	'use strict';
	
	
	//--------------------------------------------------
	// Game_Timer.initialize
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Timer_initialize = Game_Timer.prototype.initialize;
	Game_Timer.prototype.initialize = function() {
		_Game_Timer_initialize.call(this);
		this._mode = '';
	};
	
	//--------------------------------------------------
	// Game_Timer.setMode
	//  [New Definition]
	//--------------------------------------------------
	Game_Timer.prototype.setMode = function(mode) {
		this._mode = mode;
	};
	
	//--------------------------------------------------
	// Game_Timer.seconds
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Timer_seconds = Game_Timer.prototype.seconds;
	Game_Timer.prototype.seconds = function() {
		if (this._mode === 'conditional') {
			// when conditional branch
			return this._frames / 60;
		} else if (this._mode === 'variable') {
			// when control variables
			return Math.ceil(this._frames / 60);
		} else if (this._mode === 'sprite') {
			// when sprite timer
			return Math.ceil(this._frames / 60);
		} else {
			return _Game_Timer_seconds.call(this);
		}
	};
	
	
	//--------------------------------------------------
	// Game_Interpreter.command111
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Interpreter_command111 = Game_Interpreter.prototype.command111;
	Game_Interpreter.prototype.command111 = function(params) {
		$gameTimer.setMode('conditional');
		return _Game_Interpreter_command111.call(this, params);
	}
	
	//--------------------------------------------------
	// Game_Interpreter.gameDataOperand
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Interpreter_gameDataOperand = Game_Interpreter.prototype.gameDataOperand;
	Game_Interpreter.prototype.gameDataOperand = function(type, param1, param2) {
		$gameTimer.setMode('variable');
		return _Game_Interpreter_gameDataOperand.call(this, type, param1, param2);
	}
	
	
	//--------------------------------------------------
	// Sprite_Timer.updateBitmap
	//  [Added Definition]
	//--------------------------------------------------
	const _Sprite_Timer_updateBitmap = Sprite_Timer.prototype.updateBitmap;
	Sprite_Timer.prototype.updateBitmap = function() {
		$gameTimer.setMode('sprite');
		_Sprite_Timer_updateBitmap.call(this);
	};
	
})();

