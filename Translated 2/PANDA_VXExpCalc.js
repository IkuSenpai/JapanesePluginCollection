//=============================================================================
// PANDA_VXExpCalc.js
//=============================================================================
// [Update History]
// 2020-10-25 Ver.1.0.0 First Release for MV/MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 delete pluginName.

/*:
 * @target MV MZ
 * @plugindesc Change the calculation method of the required EXP to the VX method.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201025223419.html
 * 
 * @help Change the calculation method of the required EXP for each level
 * to the RPG Maker VX method as follows:
 *  M[1] = Base Value
 *  N[2] = 0.75 + Acceleration A / 200
 *  M[Lv] = M[Lv-1] * (1 + N[Lv])
 *  N[Lv] = N[Lv-1] * 0.9
 *  Total EXP[2] = M[1]
 *  Total EXP[Lv] = Total EXP[Lv-1] + M[Lv-1]
 * 
 * Only the Base Value and the Acceleration A of the EXP curve are used,
 * and the Extra Value and the Acceleration B are ignored.
 * It is different from "To Next Level" and "Total" values of the EXP curve.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 必要経験値の算出方法をVXの方式に変更します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201025223419.html
 * 
 * @help 各レベルで必要な経験値の算出方法を、RPGツクールVXの方式に変更します。
 * 以下の計算式で算出されます。
 *  M[1] = 基本値
 *  N[2] = 0.75 + 増加度A / 200
 *  M[Lv] = M[Lv-1] * (1 + N[Lv])
 *  N[Lv] = N[Lv-1] * 0.9
 *  累計経験値[2] = M[1]
 *  累計経験値[Lv] = 累計経験値[Lv-1] + M[Lv-1]
 * 
 * 経験値曲線の基本値および増加度Aのみが用いられ、補正値と増加度Bは無視されます。
 * 経験値曲線で表示される「次のレベルまで」「累計」の値とは異なります。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 필요 EXP(경험치) 산출 방법을 VX 방식으로 변경합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201025223419.html
 * 
 * @help 각 레벨에 필요한 EXP(경험치)의 산출 방법을 RPG Maker VX의 방식으로 변경합니다.
 * 다음 계산식으로 산출됩니다.
 *  M[1] = 기본 값
 *  N[2] = 0.75 + 증가도A / 200
 *  M[Lv] = M[Lv-1] * (1 + N[Lv])
 *  N[Lv] = N[Lv-1] * 0.9
 *  총계EXP[2] = M[1]
 *  총계EXP[Lv] = 총계EXP[Lv-1] + M[Lv-1]
 * 
 * EXP 곡선의 기본 값 및 증가도A만이 사용되고 보정 값과 증가도B는 무시됩니다.
 * EXP 곡선에서 표시되는 [다음 레벨까지]와 [총계]의 값과는 다릅니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
	'use strict';
	
	
	//--------------------------------------------------
	// Game_Actor.expForLevel
	//  [Modified Definition]
	//--------------------------------------------------
	Game_Actor.prototype.expForLevel = function(level) {
		const c = this.currentClass();
		const basis = c.expParams[0];
		const extra = c.expParams[1];
		const acc_a = c.expParams[2];
		const acc_b = c.expParams[3];
		let m = basis;
		let n = 0.75 + acc_a / 200.0;
		let exp = 0;
		while (--level > 0) {
			exp += Math.floor(m);
			m *= 1 + n;
			n *= 0.9;
		}
		return exp;
	};
	
})();

