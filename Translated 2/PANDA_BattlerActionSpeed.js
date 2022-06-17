//=============================================================================
// PANDA_BattlerActionSpeed.js
//=============================================================================
// [Update History]
// 2021-08-19 Ver.1.0.0 First Release for MV/MZ.

/*:
 * @target MV MZ
 * @plugindesc change the speed from minimum for each action.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210819222423.html
 * 
 * @help [How to Use]
 * You can set the "Speed" value in the "Activation" of skills or items,
 * but when the character acts more than once in 1 turn,
 * the minimum value of each speed will be adopted.
 * So, when the character acts "Guard" or "Substitute" with high speed
 * and a normal attack with speed 0 in the same time, speed 0 will be adopted,
 * and it will not take the action "Guard" or "Substitute" at first.
 * 
 * With this plugin, you can select the calculation method of speed
 * by the plugin parameter, so you can reflect the difference in speed value.
 * 
 * Please specify the calculation method from the following:
 *  - Minimum (min) : as same as RPG Maker standard
 *  - Maximum (max)
 *  - Average (avg)
 *  - Total value (sum)
 *  - Value of first action (first)
 *  - Value of last action (last)
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param CalcType
 * @text Calculation Method
 * @desc Select the calculation method of speed when acting multiple times.
 * @default avg
 * @type select
 * @option Minimum (RPG Maker standard)
 * @value min
 * @option Maximum
 * @value max
 * @option Average
 * @value avg
 * @option Total value
 * @value sum
 * @option Value of first action
 * @value first
 * @option Value of last action
 * @value last
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 複数回行動時の速度補正の算出方法を各行動の最小値から変更します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210819222423.html
 * 
 * @help ■ 使い方
 * スキルやアイテムの発動条件で速度補正を設定することができますが、
 * 1ターンに2回以上行動する場合は、速度補正の最小値が採用されます。
 * 従って、速度補正の高い防御やかばうと、速度補正が0の通常攻撃を同時に行うと、
 * 速度補正0が採用され、真っ先に防御やかばうの行動を取ってくれません。
 * 
 * このプラグインを使うと、プラグインパラメータで速度補正の算出方法を選択でき、
 * 速度補正の違いを反映させることができます。
 * 
 * 算出方法は以下の中から指定します。
 *  - 最小値 (min)：ツクールの標準と同じ
 *  - 最大値 (max)
 *  - 平均値 (avg)
 *  - 合計値 (sum)
 *  - 最初の行動の値 (first)
 *  - 最後の行動の値 (last)
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param CalcType
 * @text 算出方法
 * @desc 複数回行動時の速度補正の算出方法を指定します。
 * @default avg
 * @type select
 * @option 最小値（ツクール標準）
 * @value min
 * @option 最大値
 * @value max
 * @option 平均値
 * @value avg
 * @option 合計値
 * @value sum
 * @option 最初の行動の値
 * @value first
 * @option 最後の行動の値
 * @value last
 */

/*:ko
 * @target MV MZ
 * @plugindesc 여러 번 행동시 속도 보정을 각 행동의 최소치로부터 변경합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210819222423.html
 * 
 * @help [사용법]
 * 스킬이나 아이템 발동에서 속도 보정을 설정할 수 있지만,
 * 1턴에 두번 이상 행동할 때에는, 속도 보정의 최소치가 채용됩니다.
 * 따라서, 속도 보정이 높은 "보호"나 "대체"와
 * 속도 보정이 0인 일반 공격을 동시에 수행하면,
 * 속도 보정은 0이 채용되어 가장 먼저 "보호"나 "대체"를 수행해 주지 않습니다.
 * 
 * 이 플러그인을 사용하변, 플러그인 매개 변수로 속도 보정의 산출 방법을
 * 선택함으로, 속도 보정의 차이를 반영시킬 수 있습니다.
 * 
 * 산출 방법은 이하에서 지정합니다.
 *  - 최소치 (min) : RPG Maker 표준과 같음
 *  - 최대치 (max)
 *  - 평균치 (avg)
 *  - 합계 (sum)
 *  - 첫 행동의 값 (first)
 *  - 마지막 행동의 값 (last)
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param CalcType
 * @text 산출 방법
 * @desc 여러 번 행동시 속도 보정의 산출 방법을 지정합니다.
 * @default avg
 * @type select
 * @option 최소치 (RPG Maker 표준)
 * @value min
 * @option 최대치
 * @value max
 * @option 평균치
 * @value avg
 * @option 합계
 * @value sum
 * @option 첫 행동의 값
 * @value first
 * @option 마지막 행동의 값
 * @value last
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const CalcType = parameters['CalcType'] || 'min';
	
	
	//--------------------------------------------------
	// Game_Battler.makeSpeed
	//  [Modified Definition]
	//--------------------------------------------------
	Game_Battler.prototype.makeSpeed = function() {
		
		let speed = 0;
		
		// array of action speeds
		const speeds = this._actions.map(action => action.speed());
		if (speeds.length > 0) {
			
			switch (CalcType) {
				
				// min (default)
				case 'min':
					speed = Math.min(...speeds);
					break;
					
				// max
				case 'max':
					speed = Math.max(...speeds);
					break;
					
				// average
				case 'avg':
					speed = (speeds.reduce( function(p, c) { return p + c; } )) / speeds.length;
					break;
					
				// sum
				case 'sum':
					speed = speeds.reduce( function(p, c) { return p + c; } );
					break;
					
				// first
				case 'first':
					speed = speeds[0];
					break;
					
				// last
				case 'last':
					speed = speeds[speeds.length - 1];
					break;
				
			}
			
		}
		
		this._speed = speed;
		
	};
	
})();

