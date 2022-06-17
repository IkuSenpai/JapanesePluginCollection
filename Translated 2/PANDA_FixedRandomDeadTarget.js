//=============================================================================
// PANDA_FixedRandomDeadTarget.js
//=============================================================================
// [Update History]
// 2022-01-19 Ver.1.0.0 First Release for MZ.

/*:
 * @target MZ
 * @plugindesc Fix a bug which the target of resurrection skill would not be random.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220119014724.html
 * 
 * @help Fix a bug in the core script that when an enemy uses a resurrection skill,
 * even if there are multiple dead members,
 * the first dead member will always be the target,
 * so that the target is randomly selected.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 敵が使う蘇生スキルのターゲットがランダムにならない不具合を修正します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220119014724.html
 * 
 * @help 敵が蘇生スキルを使ってくる際に、死亡者が複数いたとしても、
 * 必ず先頭の死亡者が対象になってしまうというコアスクリプトの不具合を修正し、
 * 対象者がランダムに選ばれるようにします。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ko
 * @target MZ
 * @plugindesc 적이 쓰는 소생 스킬의 대상이 랜덤이 되지 않는 버그를 수정합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220119014724.html
 * 
 * @help 적 캐릭터가 소생 스킬을 사용할 때, 사망자가 복수 있어도
 * 반드시 선두 사망자가 대상이 된다는 코어 스크립트의 버그를 수정해
 * 대상자가 랜덤으로 선택되도록 합니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
	'use strict';
	
	//--------------------------------------------------
	// Game_Action.targetsForDead
	//  [Modified Definition]
	//--------------------------------------------------
	Game_Action.prototype.targetsForDead = function(unit) {
		if (this.isForOne()) {
			if (this._targetIndex < 0) {
				return [unit.randomDeadTarget()];
			} else {
				return [unit.smoothDeadTarget(this._targetIndex)];
			}
		} else {
			return unit.deadMembers();
		}
	};
	
	
})();

