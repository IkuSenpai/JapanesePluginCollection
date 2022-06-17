// --------------------------------------------------------------------------
// 
// VictoryRecoverAll.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2020/08/21 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc 戦闘勝利後にパーティーメンバーを全回復するプラグイン
 * @author kotonoha*
 * @url https://aokikotori.com/
 *
 * @help 戦闘勝利後にパーティーメンバーを全回復するプラグインです。
 * 戦闘不能や状態異常などもまとめて回復します。
 *
 * 改変自由、商用利用可能です。
 * 作者名のクレジットや利用報告は不要です。ご自由にどうぞ！
 * 
 */

(function() {
	
	_Game_Party_prototype_performVictory = Game_Party.prototype.performVictory;

	Game_Party.prototype.performVictory = function() {
		_Game_Party_prototype_performVictory.call(this);
	    this.members().forEach(function(actor) {
			actor.performVictory();
	        actor.recoverAll();
	   });
	};

})();