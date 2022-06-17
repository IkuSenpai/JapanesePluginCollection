//=============================================================================
// Plugin_Name : Guts State
// File_Name   : RX_T_GutsState.js
// Version     : 1.01
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You can create a state where your HP remains even if you take heavy, life-threatening damage.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes1
 * @text System word
 * @desc System word to fill in the notes field
 * @default Guts
 *
 * @param SystemWord in Notes2
 * @text System word
 * @desc System word to fill in the notes field
 * @default SuperGuts
 *
 * @param SystemWord in Notes3
 * @text System word
 * @desc System word to fill in the notes field
 * @default RemoveGutsAtEndOfTurn
 *
 * @help Guts State
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * You can create a state where your HP remains even if you take damage
 * so large that your HP drops to 0.
 * It also allows you to keep a certain amount of HP even if you take a lot of
 * damage.
 * Applying this effect to an enemy's setting could make the enemy's behavior
 * even more varied.
 * Of course, you can also set up the actors, so try to find different ways to
 * use it.
 *
 * ◆Usage
 * Fill in the notes section of the states.
 * Example 1: If you want to create a state where your HP is at least 5% of
 * your maximum and you want to hold on at 1 HP even if you get hit by an
 * attack that reduces your HP to 0
 *
 * <Guts:5>
 *
 * Example 2: If you want to create a state where you can maintain HP at 70% of
 * maximum value even if you receive attack that reduces HP to less than 70% of
 * maximum value
 *
 * <SuperGuts:70>
 *
 * All numbers are percentages.
 * You can also put multiple guts states on it, so use it to your advantage.
 *
 * The state also has a once you have withstood an attack that reduces your
 * HP to 0, or an attack that reduces your HP to a specified value or less,
 * the state is immediately canceled, regardless of the condition for
 * canceling the state.
 * But, you can add the following setting to the guts state so that the state is
 * removed at the end of a turn that you hold on to(In TPB mode, when it's that
 * battler's turn after hold on).
 *
 * <RemoveGutsAtEndOfTurn>
 *
 * Guts (except for Super guts) is automatically removed when you reach a
 * lower HP than the value of guts you set, even if you don't hold on at 1 HP.
 * Removed states in any setting will not be revival even if HP is healed.
 *
 * ◆Caution
 * If you want to create more than one guts state, you must set them all to
 * different values.
 * If you set more than one state with the same number, it will not behave
 * correctly when you receive more than one of those states.
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
 * @plugindesc HPが0になるほどの大ダメージを受けてもHPが1残るステートを作成できます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes1
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 根性
 *
 * @param SystemWord in Notes2
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 超根性
 *
 * @param SystemWord in Notes3
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 根性ターン解除
 *
 * @help 根性ステート
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * HPが0になるほどの大ダメージを受けてもHPが1残るステートを作成できます。
 * また、ある程度のダメージを受けても一定のHPをキープさせることもできます。
 * この効果を利用した敵キャラを作ると、敵キャラの行動に更なる変化を
 * 持たせられるでしょう。
 * もちろん、アクター側にも設定できるので使い方をいろいろ模索してみてください。
 *
 * ◆使い方
 * ステートのメモ欄に記入します。
 * 例１：HPが最大値の5%以上ある時、HPが0になる攻撃を受けても
 * HP1で踏ん張るステートを作る場合
 *　
 * <根性:5>
 *
 * 例２：HPが最大値の70%以上ある時、HPが70%を下回る攻撃を受けても
 * HPが最大値の70%で踏ん張るステートを作る場合
 *　
 * <超根性:70>
 *
 * 数値は全てパーセンテージです。
 * 複数の根性ステートを付けることもできるので、上手く利用しましょう。
 *
 * また、このステートは一度でも踏ん張った場合、ステートの解除条件に関係なく
 * 即座にステートが解除されますが、根性ステートに以下の設定を加えることで
 * 踏ん張ったターンの終了後に（TPBモード時は踏ん張った後、その踏ん張った
 * バトラーの順番が来た時）ステートが解除されるようになります。
 *
 * <根性ターン解除>
 *
 * 根性（超根性は除く）は、HP1で踏ん張らなくても設定した根性の値未満の
 * HPに達した時点で自動解除されます。
 * いずれの設定であっても解除されたステートは、HPが回復しても復活しません。
 *
 * 【ご注意】
 * 複数の根性ステートを作る場合は数値はすべて違うものにしてください。
 * 同じ数値のステートを複数設定すると、それらのステートを複数受けたときに
 * 正常な動作をしなくなります。
 *
 * 【備考】
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
	const parameters = PluginManager.parameters('RX_T_GutsState');
	const rx_guts = parameters['SystemWord in Notes1'];
	const rx_superGuts = parameters['SystemWord in Notes2'];
	const rx_turnRemGuts = parameters['SystemWord in Notes3'];

	//Game_Action

	const rx_t_gaehd200831_executeHpDamage = Game_Action.prototype.executeHpDamage;
	Game_Action.prototype.executeHpDamage = function(target, value) {
		target._rx_gutsHP = target.hp;
		target._rx_guts = target.rx_getGutsState();
		target._rx_damageGuts = value <= 0 ? 0 : value;
		rx_t_gaehd200831_executeHpDamage.call(this, target, value);
	};

	//Game_BattlerBase
	
	Game_BattlerBase.prototype.rx_getPsntHp = function(gutsId) {
		if (this._rx_guts === undefined) return 0;
		if (this._rx_guts[gutsId] === 0) return 0;
		return this._rx_guts[gutsId] * this.mhp / 100 | 0;
	}

	const rx_t_gbbsh200831_setHp = Game_BattlerBase.prototype.setHp;
	Game_BattlerBase.prototype.setHp = function(hp) {
		let rx_gutsPsntHP = this.rx_getPsntHp(0);
		let rx_spGutsPsntHP = this.rx_getPsntHp(1);
		const rx_gutsStateId = this._rx_gutsStates === undefined ? 0 : this._rx_gutsStates[String(this._rx_guts[0])];
		const rx_spGutsStateId = this._rx_spGutsStates === undefined ? 0 : this._rx_spGutsStates[String(this._rx_guts[1])];
		this._rx_turnRemoveGutsStateId = 0;
		//hpがrx_gutsPsntHP(HP最大値のthis._rx_guts[0]%以上)なら
		//ダメージ後HP0時、1残してステート解除
		if (this._rx_gutsHP >= rx_gutsPsntHP && hp <= 0 && this._rx_guts[0] > 0){
			hp = 1;
			if ($dataStates[rx_gutsStateId].meta[rx_turnRemGuts] === undefined){
				this.removeState(rx_gutsStateId);
			}else{
				this._rx_turnRemoveGutsStateId = rx_gutsStateId;
			}
		}
		//hpがrx_spGutsPsntHP(HP最大値のthis._rx_guts[1]%以上)なら
		//ダメージ後HPrx_spGutsPsntHP以下時、rx_spGutsPsntHP分残してステート解除
		if (this._rx_gutsHP >= rx_spGutsPsntHP && hp <= rx_spGutsPsntHP && this._rx_guts[1] > 0){
			hp = rx_spGutsPsntHP;
			if ($dataStates[rx_spGutsStateId].meta[rx_turnRemGuts] === undefined){
				this.removeState(rx_spGutsStateId);
			}else{
				this._rx_turnRemoveGutsStateId = rx_spGutsStateId;
			}
		}
		rx_t_gbbsh200831_setHp.call(this, hp);
	};

	//Game_Battler

	Game_Battler.prototype.rx_getGutsState = function() {
	    let rx_gutsPsnt = 0;
	    let rx_spGutsPsnt = 0;
	    let gutsPsnt = [];
	    let spGutsPsnt = [];
	    this._rx_gutsStates = {};
	    this._rx_spGutsStates = {};
	    this.states().forEach(function(state) {
	        if (state.meta[rx_guts] !== undefined){
	        	gutsPsnt.push(state.meta[rx_guts]);
	        	this._rx_gutsStates[String(state.meta[rx_guts])] = state.id;
	        }
	        if (state.meta[rx_superGuts] !== undefined){
	        	spGutsPsnt.push(state.meta[rx_superGuts]);
	        	this._rx_spGutsStates[String(state.meta[rx_superGuts])] = state.id;
	        }
	    }, this);
	    if (gutsPsnt.length > 0) rx_gutsPsnt = Math.max.apply(null, gutsPsnt);
	    if (spGutsPsnt.length > 0) rx_spGutsPsnt = Math.max.apply(null, spGutsPsnt);
	    return [rx_gutsPsnt, rx_spGutsPsnt];
	};

	const rx_t_gbrsa200901_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
	Game_Battler.prototype.removeStatesAuto = function(timing) {
	    rx_t_gbrsa200901_removeStatesAuto.call(this, timing);
	    for (const state of this.states()) {
			if(state.id === this._rx_turnRemoveGutsStateId && timing === 2) this.removeState(state.id);
	    }
	};

	//Window_BattleLog

	const rx_t_wbldhd200902_removeStatesAuto = Window_BattleLog.prototype.displayHpDamage;
	Window_BattleLog.prototype.displayHpDamage = function(target) {
	    rx_t_wbldhd200902_removeStatesAuto.call(this, target);
		let rx_gutsPsntHP = target.rx_getPsntHp(0);
		let rx_spGutsPsntHP = target.rx_getPsntHp(1);
		const rx_gutsStateId = target._rx_gutsStates === undefined ? 0 : target._rx_gutsStates[String(target._rx_guts[0])];
	    if (target.result().hpAffected) {
	    	if (target.hp < rx_gutsPsntHP && target.hp > 0 && target._rx_guts[0] > 0) {
	    		if ($dataStates[rx_gutsStateId].meta[rx_turnRemGuts] !== undefined) target.removeState(rx_gutsStateId);
	    	}
	    }
	};

})();