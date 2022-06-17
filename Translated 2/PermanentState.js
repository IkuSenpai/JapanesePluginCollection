//
//  永続ステート ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['PermanentState'] = 1.00;
/*:
 * @target MZ MV
 * @plugindesc ver1.00/戦闘不能や全回復で解除されないステートを設定できるようにします。
 * @author Yana
 * 
 * @help
 * 使用方法
 * ------------------------------------------------------
 * ステートのメモ欄に
 * <永続ステート>
 * または、
 * <Permanent>
 * と記述すると、そのステートは戦闘不能や全回復で解除されなくなります。
 * それ以外は通常のステートと同じようにターン経過、バトル終了、解除効果などで
 * 解除されます。
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
 * 
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 素材利用は自己責任でお願いします。
 */

(function () {
	////////////////////////////////////////////////////////////////////////////////////

	var parameters = PluginManager.parameters('PermanentState');

	////////////////////////////////////////////////////////////////////////////////////

	DataManager.isPermanent = function (state) {
		if (!state) { return false }
		return !!state.meta['永続ステート'] || !!state.meta['Permanent'];
	};

	////////////////////////////////////////////////////////////////////////////////////

	var __GBBase_clearStates = Game_BattlerBase.prototype.clearStates;
	Game_BattlerBase.prototype.clearStates = function () {
		var states = this._states ? this._states.clone() : [];
		var turns = this._stateTurns ? JsonEx.makeDeepCopy(this._stateTurns) : {};
		__GBBase_clearStates.call(this);
		if (states.length < 1) { return }
		states.forEach(function (stateId) {
			var state = $dataStates[stateId];
			if (DataManager.isPermanent(state)) {
				this._states.push(state.id);
				this._stateTurns[state.id] = turns[state.id]
			}
		}.bind(this));
	};

	////////////////////////////////////////////////////////////////////////////////////

}());
