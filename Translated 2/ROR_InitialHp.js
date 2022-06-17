/*
 * --------------------------------------------------
 * ROR_InitialHp.js
 *   ver.1.0.0
 * Copyright (c) 2022 R.Orio
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc 敵キャラクターの戦闘開始時のHPを最大HPとは別の値に設定できるようにします。
 * @author R.Orio
 * @version 1.0.0
 *
 * @help
 * 敵キャラクターの戦闘開始時のHPを最大HPとは別の値に設定できるようにします。
 *
 * 使い方:
 * 設定する敵キャラクターのメモ欄に「<ihp:戦闘開始時のHP>」の形式で
 * 入力してください。
 *
 * 例）
 * <ihp:500>：戦闘開始時のHPが500になります
 *
 * ※最大HP未満で設定してください。最大HP以上で設定した場合は
 * 　最大HPが戦闘開始時のHPになります。
 * ※自然数（0より大きい整数）で入力してください。
 * 　数値以外や0が設定されている場合は無視されます。
 *
 *尚、スキル等のダメージ計算式においてもb.ihp等と入力することで、
 *設定した戦闘開始時のHPを参照することが可能です。
 *アクターの戦闘開始時のHPもa.ihp等で参照可能です。
 *
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 */

(() => {
	'use strict';

	const _Game_Enemy_setup = Game_Enemy.prototype.setup;
	Game_Enemy.prototype.setup = function(enemyId, x, y){
		_Game_Enemy_setup.call(this,enemyId, x, y);
		let note = $dataEnemies[enemyId].note;
		const start_position = note.indexOf('<ihp:');
		if(start_position >= 0){
			note = note.substr(start_position + 5);
			const end_position = note.indexOf('>');
			note = note.substr(0, end_position);
			if(parseInt(note) > 0 && parseInt(note) < this._mhp){
				this._hp = parseInt(note);
				this.ihp = parseInt(note);
			}else{
				this.ihp = this._mhp;
			}
		}
		for(const actor_id of $gameParty._actors){
			$gameActors._data[actor_id].ihp = $gameActors._data[actor_id]._hp;
		}
	};

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

})();