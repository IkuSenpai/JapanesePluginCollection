//=============================================================================
// PANDA_AdvancedEventMove.js
//=============================================================================
// [Update History]
// 2021-06-17 Ver.1.0.0 First Release for MV/MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc makes Random or Approach Autonomous Movement of events sophisticated.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210617230830.html
 * 
 * @help Adjust random or approaching movement of events.
 * 
 * 1. When "Move at Random" in Movement Route Setting,
 * the movement direction is randomly selected from the movable directions.
 * By default, events do not move if the selected direction is immovable,
 * but this plugin makes events always move by selecting from the movable
 * directions.
 * 
 * 2. When "Random" in Autonomous Movement Type,
 * by default, it is not completely random to show the movement natural,
 * there is a 1/3 chance of random movement, a 1/2 chance of moving forward,
 * and a 1/6 chance of stopping.
 * You can set the probabilities of forward and stop with plugin parameters.
 * 
 * 3. When "Approach" in Autonomous Movement Type,
 * by default, to give a little play, there is a 2/3 chance of approaching
 * the player, a 1/6 chance of random movement, a 1/6 chance of moving forward.
 * You can set the probabilities of random and forward with plugin parameters.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param RandomForwardRate
 * @text Forward Rate in Random
 * @desc Specify the probability of moving forward when Autonomous Movement Type is Random in %. The default is 50%.
 * @type number
 * @decimals 0
 * @default 50
 * @max 100
 * @min 0
 * 
 * @param RandomStopRate
 * @text Stop Rate in Random
 * @desc Specify the probability of stopping when Autonomous Movement Type is Random in %. The default is 17% (1/6).
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 * @param TowardRandomRate
 * @text Random Rate in Approach
 * @desc Specify the probability of moving random when Autonomous Movement Type is Approach in %. The default is 17% (1/6).
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 * @param TowardForwardRate
 * @text Forward Rate in Approach
 * @desc Specify the probability of moving forward when Autonomous Movement Type is Approach in %. The default is 17% (1/6).
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc イベントのランダム移動や近づく移動をより洗練された動きにします。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210617230830.html
 * 
 * @help イベントの移動をより洗練された動きに調整します。
 * 
 * 1. 移動ルートの設定で「ランダムに移動」の際、
 * 移動可能な方向の中からランダムで移動方向が選択されるようになります。
 * 標準では、ランダムに選ばれた方向が移動不可だと移動が発生しませんが、
 * このプラグインを使うと移動可能な方向の中から選ぶため、必ず移動が発生します。
 * 
 * 2. 自律移動を「ランダム」に設定した場合、
 * 標準では、完全にランダム移動ではなく、自然な移動に見せるため、
 * 1/3の確率でランダム移動、1/2の確率で前進、1/6の確率でその場に停止します。
 * プラグインパラメータで、前進と停止の確率をそれぞれ調整できます。
 * 
 * 3. 自律移動を「近づく」に設定した場合、
 * 標準では、少し遊びを設けるため、2/3の確率でプレイヤーに近づき、
 * 1/6の確率でランダム移動、1/6の確率で今向いている方向に前進します。
 * プラグインパラメータで、ランダム移動と前進の確率をそれぞれ調整できます。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param RandomForwardRate
 * @text ランダム時前進確率
 * @desc 自律移動が「ランダム」の時に前進する確率を%で指定します。デフォルトは50%です。
 * @type number
 * @decimals 0
 * @default 50
 * @max 100
 * @min 0
 * 
 * @param RandomStopRate
 * @text ランダム時停止確率
 * @desc 自律移動が「ランダム」の時に停止する確率を%で指定します。デフォルトは17%(1/6)です。
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 * @param TowardRandomRate
 * @text 近づく時ランダム確率
 * @desc 自律移動が「近づく」の時にランダム移動する確率を%で指定します。デフォルトは17%(1/6)です。
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 * @param TowardForwardRate
 * @text 近づく時前進確率
 * @desc 自律移動が「近づく」の時に前進する確率を%で指定します。デフォルトは17%(1/6)です。
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 이벤트의 랜덤 이동 및 접근 이동을 더 정교하게 만듭니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210617230830.html
 * 
 * @help 이벤트의 이동을 더 정교하게 조정합니다.
 * 
 * 1. 이동 루트 설정에서 "랜덤으로 이동" 시,
 * 이동 가능한 방향 중에서 랜덤으로 이동 방향이 선택됩니다.
 * 표준에서는 랜덤으로 선택된 방향이 이동 불가능하면 이동이 발생하지 않지만,
 * 이 플러그인을 사용하면 이동 가능한 방향에서만 선택되기 때문에
 * 반드시 이동이 발생합니다.
 * 
 * 2. 자율 이동을 "랜덤"으로 설정했을 때,
 * 표준에서는 완전히 랜덤 이동이 아니라 움직임을 자연스럽게 보여주기 위해서
 * 1/3 확률로 랜덤 이동, 1/2 확률로 전진, 1/6 확률로 그 자리에 정지합니다.
 * 플러그인 매개 변수로 전진과 정지의 확률을 각각 조정할 수 있습니다.
 * 
 * 3. 자율 이동을 "접근"으로 설정했을 때,
 * 표준에서는 조금 여유를 갖게 2/3 확률로 플레이어에게 접근하고,
 * 1/6 확률로 랜덤 이동, 1/6 확률로 현재 방향으로 전진합니다.
 * 플러그인 매개 변수로 랜덤 이동과 전진의 확률을 각각 조정할 수 있습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param RandomForwardRate
 * @text 랜덤시 전진 확률
 * @desc 자율 이동이 "랜덤"일 때, 전진할 확률을 %로 지정합니다. 표준은 50%입니다.
 * @type number
 * @decimals 0
 * @default 50
 * @max 100
 * @min 0
 * 
 * @param RandomStopRate
 * @text 랜덤시 정지 확률
 * @desc 자율 이동이 "랜덤"일 때, 정지할 확률을 %로 지정합니다. 표준은 17%(1/6)입니다.
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 * @param TowardRandomRate
 * @text 접근시 랜덤 확률
 * @desc 자율 이동이 "접근"일 때, 랜덤 이동할 확률을 %로 지정합니다. 표준은 17%(1/6)입니다.
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 * @param TowardForwardRate
 * @text 접근시 전진 확률
 * @desc 자율 이동이 "접근"일 때, 전진할 확률을 %로 지정합니다. 표준은 17%(1/6)입니다.
 * @type number
 * @decimals 0
 * @default 17
 * @max 100
 * @min 0
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const RandomForwardRate = Number(parameters['RandomForwardRate']) || 0;
	const RandomStopRate = Number(parameters['RandomStopRate']) || 0;
	const TowardRandomRate = Number(parameters['TowardRandomRate']) || 0;
	const TowardForwardRate = Number(parameters['TowardForwardRate']) || 0;
	
	
	//--------------------------------------------------
	// Game_Character.moveRandom
	//  [Modifie Definition]
	//--------------------------------------------------
	const _Game_Character_moveRandom = Game_Character.prototype.moveRandom;
	Game_Character.prototype.moveRandom = function() {
		// direction list
		const dlist = [2, 4, 6, 8].filter(d => this.canPass(this.x, this.y, d));
		if (dlist.length > 0) {
			const d = dlist[Math.randomInt(dlist.length)];
			this.moveStraight(d);
		}
	};
	
	
	//--------------------------------------------------
	// Game_Event.moveTypeRandom
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Event_moveTypeRandom = Game_Event.prototype.moveTypeRandom;
	Game_Event.prototype.moveTypeRandom = function() {
		// make rate
		const rate = Math.randomInt(100);
		if (rate < RandomForwardRate) {
			// move forward
			if (this.canPass(this.x, this.y, this.direction())) {
				this.moveForward();
			} else {
				this.moveRandom();
			}
		} else if (rate < RandomForwardRate + RandomStopRate) {
			// stop
			this.resetStopCount();
		} else {
			// move random
			this.moveRandom();
		}
	};
	
	
	//--------------------------------------------------
	// Game_Event.moveTypeTowardPlayer
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Event_moveTypeTowardPlayer = Game_Event.prototype.moveTypeTowardPlayer;
	Game_Event.prototype.moveTypeTowardPlayer = function() {
		if (this.isNearThePlayer()) {
			// make rate
			const rate = Math.randomInt(100);
			if (rate < TowardRandomRate) {
				// move random
				this.moveRandom();
			} else if (rate < TowardRandomRate + TowardForwardRate) {
				// move forward
				if (this.canPass(this.x, this.y, this.direction())) {
					this.moveForward();
				} else {
					this.moveRandom();
				}
			} else {
				// move toward player
				this.moveTowardPlayer();
			}
		} else {
			// Original Process
			_Game_Event_moveTypeTowardPlayer.call(this);
		}
	};
	
})();
