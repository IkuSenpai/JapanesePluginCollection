//=============================================================================
// Plugin_Name : Conditional branching in Self-switch for battle events
// File_Name   : RX_T_SelfSw_for_BattleEv.js
// Version     : 1.01
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Enable conditional branching by self-switch when setting battle events.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 * 
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * @help Conditional branching in Self-switch for battle events
 *
 * ◆Summary
 * You can use a self-switch to perform a conditional branching when setting up
 * a battle events.
 *
 * ◆Notes (mainly for engineers)
 * The internal configuration of the self-switch used in combat events is
 * designed so that it does not overlap with the internal configuration of the
 * self-switch used in map events.
 * 
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MV MZ
 * @plugindesc セルフスイッチの操作およびセルフスイッチを使った条件分岐（戦闘イベント用）
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @help セルフスイッチでの条件分岐(戦闘イベント用)MV＆MZ
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * セルフスイッチの操作およびセルフスイッチを使った条件分岐を
 * 戦闘イベントでも行えるようになります。
 * 
 * ◆備考（主に技術者向け）
 * 戦闘イベントで使用するセルフスイッチの内部構成は
 * マップイベントで使用するセルフスイッチの内部構成と重複しないように
 * 設計されています。
 * 
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
	'use strict';

	//RPG Maker Version
	const rx_RMVer = PluginManager._commands !== undefined ? "MZ" : "MV";

	// Conditional Branch
	const rx_t_gipmvz200916_command111 = Game_Interpreter.prototype.command111;
	Game_Interpreter.prototype.command111 = function(params) {
		// Self Switch(in Battle)
		const rx_RMPar = rx_RMVer === "MZ" ? params : this._params;
		if ($gameTroop._troopId > 0 && $gameParty.inBattle() && rx_RMPar[0] === 2) {
			let rx_gtName = $dataTroops[$gameTroop._troopId].name + "_ID:" + $gameTroop._troopId.toFixed();
			let rx_1key = [rx_gtName, $gameTroop._troopId, rx_RMPar[1]];
			let rx_1result = ($gameSelfSwitches.value(rx_1key) === (rx_RMPar[2] === 0));
			this._branch[this._indent] = rx_1result;
			if (this._branch[this._indent] === false) {
				this.skipBranch();
			}else{
				return true;
			}
		}
		return rx_t_gipmvz200916_command111.call(this, rx_RMPar);
	};

	// Control Self Switch
	const rx_t_gipmvz200916_command123 = Game_Interpreter.prototype.command123;
	Game_Interpreter.prototype.command123 = function(params) {
		// in Battle
		const rx_RMPar = rx_RMVer === "MZ" ? params : this._params;
		if ($gameTroop._troopId > 0 && $gameParty.inBattle()) {
			//technical notes:battle self-switch key:[Troop name(adds troop ID), troop ID, switch(A to D)]
			let rx_gtName = $dataTroops[$gameTroop._troopId].name + "_ID:" + $gameTroop._troopId.toFixed();
			let rx_1key = [rx_gtName, $gameTroop._troopId, rx_RMPar[0]];
			$gameSelfSwitches.setValue(rx_1key, rx_RMPar[1] === 0);
		}
		return rx_t_gipmvz200916_command123.call(this, rx_RMPar);
	};

})();