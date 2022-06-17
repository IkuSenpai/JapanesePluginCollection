//=============================================================================
// Plugin_Name : Fixing the State
// File_Name   : RX_T_FixingTheState.js
// Version     : 1.00
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc It is possible to create a state that does not change state at all.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes
 * @text System word
 * @desc System word to fill in the notes field
 * @default FixState
 *
 * @help Fixing the State
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * It is possible to create a state that does not change state at all.
 * While in this state, no state changes will be accepted, with the exceptions
 * listed below.
 * The same applies to the automatic release of the game based on time (turns)
 * and number of steps.
 *
 * [Conditions for Exceptions]
 * ･Defense, invincibility, no combat due to 0 HP, states with "state
 * fixation" applied
 * ･State manipulation by events (or common events that are triggered by using
 * items or skills)
 *
 * ◆Usage
 * Fill in the notes section of the states.
 *
 * <FixState>
 *
 * ◆Caution: For users of the "Guts State" plug-in
 * The gutsy states won't be removed either.
 * Be careful when fixing the state.
 *
 * ◆Notes
 * You don't need to worry about the plugin parameters.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc ステートが一切変化しないステートを作ることができます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default ステート固定
 *
 * @help ステートの固定
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * ステートが一切変化しないステートを作ることができます。
 * このステートになっている間は、下記の例外条件を除いて一切のステート変化が
 * 受け付けなくなります。
 * 時間（ターン）経過や歩数による自動解除についても同様です。
 *
 * 【例外条件】
 * ・防御、無敵、HP0による戦闘不能、「ステート固定」が適用されたステート
 * ・イベントによるステート操作（アイテム、スキルを使ったコモンイベントも同様）
 *
 * ◆使い方
 * ステートのメモ欄に記入します。
 *
 * <ステート固定>
 *
 * ◆ご注意：「根性ステート」プラグインをご利用の方へ
 * 根性系のステートも固定されます。
 * ステートを固定する際は充分にご注意ください。
 *
 * ◆備考
 * プラグインのパラメータを気にする必要はありません。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

	//RX-T plugin parameters
	const parameters = PluginManager.parameters('RX_T_FixingTheState');
	const rx_lockStWord = parameters['SystemWord in Notes'];

	//Game_Battler

	Game_Battler.prototype.rx_chgStatePerm = function(stateId) {
		let rx_stLkResult = false;
		let rx_isLockState = false;
		let rx_systemState = false;
	    this.states().forEach(function(state) {
	        if (state.meta[rx_lockStWord] !== undefined) rx_isLockState = true;
	    }, this);
	    rx_systemState = (stateId === 2 || stateId === 3 || (stateId === 1 && this.hp <= 0));
	    if (!rx_isLockState) rx_stLkResult = true;
	    if (rx_systemState) rx_stLkResult = true;
	    return rx_stLkResult;
	};

	const rx_t_gbas200904_addState = Game_Battler.prototype.addState;
	Game_Battler.prototype.addState = function(stateId) {
		const rx_stLkResult1 = this.rx_chgStatePerm(stateId);
		const rx_stLkResult2 = ($dataStates[stateId].meta[rx_lockStWord] !== undefined || $gameTemp._rx_ctrlStateFEv);
		if (!rx_stLkResult1 && !rx_stLkResult2) return;
	    rx_t_gbas200904_addState.call(this, stateId);
	    if ($gameTemp._rx_ctrlStateFEv) $gameTemp._rx_ctrlStateFEv = false;
	};

	const rx_t_gbrs200904_removeState = Game_Battler.prototype.removeState;
	Game_Battler.prototype.removeState = function(stateId) {
		const rx_stLkResult1 = this.rx_chgStatePerm(stateId);
		const rx_stLkResult2 = ($dataStates[stateId].meta[rx_lockStWord] !== undefined || $gameTemp._rx_ctrlStateFEv);
		if (!rx_stLkResult1 && !rx_stLkResult2) return;
	    rx_t_gbrs200904_removeState.call(this, stateId);
	    if ($gameTemp._rx_ctrlStateFEv) $gameTemp._rx_ctrlStateFEv = false;
	};

	//Game_Actor

	const rx_t_gauss200904_updateStateSteps = Game_Actor.prototype.updateStateSteps;
	Game_Actor.prototype.updateStateSteps = function(state) {
		const rx_stLkResult1 = this.rx_chgStatePerm(state.id);
		const rx_stLkResult2 = ($dataStates[state.id].meta[rx_lockStWord] !== undefined);
	    if (state.removeByWalking) {
	    	if (!rx_stLkResult1 && !rx_stLkResult2) return;
	    }
	    rx_t_gauss200904_updateStateSteps.call(this, state);
	};

	//Game_Interpreter（ツクールのバージョン判定 undefined:MV, object:MZ）

	if (PluginManager._commands !== undefined){
		// Change State

		const rx_t_gic313200904_command313 = Game_Interpreter.prototype.command313;
		Game_Interpreter.prototype.command313 = function(params) {
			$gameTemp._rx_ctrlStateFEv = true;
			return rx_t_gic313200904_command313.call(this, params);
		};

		// Change Enemy State

		const rx_t_gic333200904_command333 = Game_Interpreter.prototype.command333;
		Game_Interpreter.prototype.command333 = function(params) {
			$gameTemp._rx_ctrlStateFEv = true;
			return rx_t_gic333200904_command333.call(this, params);
		};
	}else{
		const rx_t_gic313200904_command313 = Game_Interpreter.prototype.command313;
		Game_Interpreter.prototype.command313 = function() {
			$gameTemp._rx_ctrlStateFEv = true;
			return rx_t_gic313200904_command313.call(this);
		};

		const rx_t_gic333200904_command333 = Game_Interpreter.prototype.command333;
		Game_Interpreter.prototype.command333 = function() {
			$gameTemp._rx_ctrlStateFEv = true;
			return rx_t_gic333200904_command333.call(this);
		};
	}

})();