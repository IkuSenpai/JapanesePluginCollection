//=============================================================================
// Plugin_Name : Damage Reduction
// File_Name   : RX_T_DamageReduction.js
// Version     : 1.02
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Regardless of the attribute, damage reduction can be set to various factors.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes1
 * @text System word 1
 * @desc System word to fill in the notes field
 * @default DamageReduction
 *
 * @param SystemWord in Notes2
 * @text System word 2
 * @desc System word to fill in the notes field
 * @default IgnoreDamageReduction
 *
 * @param ReductRule
 * @text Damage reduction rule
 * @desc The process when the damage reduction conditions overlap
 * @type select
 * @option Multiplication
 * @value multiplication
 * @option Max
 * @value max
 * @default multiplication

 * @help Damage Reduction
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * Regardless of the attribute, damage reduction can be set to
 * various factors.
 * e.g., 50% or 25%.
 * This can be set for actors, enemies, states and equipment.
 * And you can also ignore these features to create skills and items
 * that do damage.
 *
 * ◆Usage
 * Fill in the notes section.
 * Example 1: If you want to reduce the damage by 60%.
 * target of Effect: actors, enemies, states, weapons and armors
 *
 * <DamageReduction:60>
 *
 * Example 2: If you want them to ignore the damage reduction
 * target of Effect: skills and items
 *
 * <IgnoreDamageReduction>
 *
 * ◆About Plugin Parameters
 * You don't need to worry about the system word.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * ★Damage reduction rule
 * Sets how damage reduction conditions are handled when they overlap.
 * On the actor's side, it is determined using the values set for things like
 * the actor, the state it is receiving, the weapon it is equipped with, and
 * the armor it is equipped with.
 * This is referred to as Group A.
 * On the enemy's side, it is determined using the values set for the enemy,
 * and the values set for the state it is receiving.
 * This is referred to as Group B.
 *
 * -Multiplication
 *  The percentage of damage reduction is multiplied from Group A/B by the
 *  following formula.
 *  Example: if the target has 50% damage reduction and damage reduction
 *  states 1 and 2 are 20% and 30% respectively.
 *
 *  1 * (100 - 50) / 100 * (100 - 20) / 100 * (100 - 30) / 100 * Damage
 *  *rounding down the decimal point
 *
 * -Max
 *  The prescribed amount of damage voided is the maximum amount of value in
 *  groups A/B.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc ダメージを軽減する敵キャラやアクター、ステート、装備品を作ることができます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes1
 * @text システムワード1
 * @desc メモ欄に記入するシステムワード
 * @default ダメージ軽減
 *
 * @param SystemWord in Notes2
 * @text システムワード2
 * @desc メモ欄に記入するシステムワード
 * @default ダメージ軽減無視
 *
 * @param ReductRule
 * @text 軽減ルール
 * @desc ダメージ軽減条件が重なった場合の処理
 * @type select
 * @option 乗算
 * @value multiplication
 * @option 最大値
 * @value max
 * @default multiplication
 *
 * @help ダメージ軽減
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 属性に関わらずダメージを50%、25%といった軽減の設定ができます。
 * これはアクター、敵キャラ、ステート、武器、防具に設定可能です。
 * また、このような特徴を無視してダメージを与える
 * スキルやアイテムを作ることもできます。
 *
 * ◆使い方
 * メモ欄に記入します。
 * 例１：ダメージを60%軽減させる場合
 *（アクター、敵キャラ、ステート、武器、防具）
 *
 * <ダメージ軽減:60>
 *
 * 例２：ダメージ軽減を無視させる場合（スキル、アイテム）
 *
 * <ダメージ軽減無視>
 *
 * ◆プラグインパラメータについて
 * システムワードについては設定不要です。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * ★軽減ルール
 * ダメージ軽減条件が重なった時にどう処理するか決めます。
 * アクター側の場合、アクター、受けているステート、装備中の武器、防具に
 * 設定された値を使って決めます。以下、A群と呼びます。
 * 敵キャラ側の場合、敵キャラ、受けているステートに設定された値を使って
 * 決めます。以下、B群と呼びます。
 *
 * ・乗算（デフォルト設定）
 * ダメージ軽減率がA群/B群の中から
 * 以下の方式で乗算されます。
 * 例：対象のダメージ軽減が50％で、ダメージ軽減ステートその１とその2
 * （それぞれ20％と30％）を受けている場合
 *
 * 1 * (100 - 50) / 100 * (100 - 20) / 100 * (100 - 30) / 100 * ダメージ
 * （小数点以下切り捨て）
 *
 * ・最大値
 * ダメージ軽減率がA群/B群の中での最大値になります。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

	//RX-T plugin parameters
	const parameters = PluginManager.parameters('RX_T_DamageReduction');
	const rx_dmgReductState = parameters['SystemWord in Notes1'];
	const rx_dmgReductPiercer = parameters['SystemWord in Notes2'];
	const rx_reductRule = parameters['ReductRule'];

	//RX_T original process
	class RX_T {
		static reductDamageCalc(target){
			const rdTarget = target.isActor() ? target.actor() : target.enemy();
			if (rdTarget._rx_reductDmgPierce) return 1;
			let dmgReducts = [];
		    let dmgReductRate = 1;
			let rx_eqItem = 0;
			const rx_equipSize = target.isActor() ? target.equips().length : 0;
			const rx_equips = target.isActor() ? target.equips() : [];
			if(rx_reductRule === "max" && rdTarget.meta[rx_dmgReductState] !== undefined) dmgReducts.push(rdTarget.meta[rx_dmgReductState]);
			if(rx_reductRule !== "max" && rdTarget.meta[rx_dmgReductState] !== undefined) dmgReductRate *= (100 - rdTarget.meta[rx_dmgReductState]) / 100;
		    target.states().forEach(function(state) {
		    	if(rx_reductRule === "max" && state.meta[rx_dmgReductState] !== undefined) dmgReducts.push(state.meta[rx_dmgReductState]);
		    	if(rx_reductRule !== "max" && state.meta[rx_dmgReductState] !== undefined) dmgReductRate *= (100 - state.meta[rx_dmgReductState]) / 100;
		    }, target);
		    for (let i = 0; i < rx_equipSize; i++){
		    	if (!target.isActor()) continue;
		    	if (rx_equips[i] === null) continue;
		    	rx_eqItem = i === 0 ? $dataWeapons[rx_equips[i].id].meta[rx_dmgReductState] : $dataArmors[rx_equips[i].id].meta[rx_dmgReductState];
		    	if(rx_reductRule === "max" && rx_eqItem !== undefined) dmgReducts.push(rx_eqItem);
		    	if(rx_reductRule !== "max" && rx_eqItem !== undefined) dmgReductRate *= (100 - parseInt(rx_eqItem)) / 100;
		    }
		    if(rx_reductRule === "max") return dmgReducts.length < 1 ? 1 : parseInt(Math.max.apply(null, dmgReducts)) / 100;
		    return dmgReductRate;
		}
		static getReductCalc(target, value){
			const reductRate = this.reductDamageCalc(target);
			value = Math.floor(value * reductRate);
			return $gameTemp._rx_byPotionRd ? -value : value;
		}
	}

	//Game_Action

	const rx_t_gaa200904_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
	    target._rx_reductDmgPierce = this.item().meta[rx_dmgReductPiercer] ? true : false;
	    rx_t_gaa200904_apply.call(this, target);
	};

	const rx_t_gae200904_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		if (!target._rx_reductDmgPierce) value = value > 0 ? RX_T.getReductCalc(target, value) : value;
		rx_t_gae200904_executeDamage.call(this, target, value);
	};

	const rx_t_gaierh2010012_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
	Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
	    $gameTemp._rx_byPotionRd = true;
	    rx_t_gaierh2010012_itemEffectRecoverHp.call(this, target, effect);
	};

	//Game_Battler

	const rx_t_gbgh2010012_gainHp = Game_Battler.prototype.gainHp;
	Game_Battler.prototype.gainHp = function(value) {
		if (!this._rx_reductDmgPierce && value < 0 && $gameTemp._rx_byPotionRd) value = RX_T.getReductCalc(this, -value);
		if ($gameTemp._rx_byPotionRd) $gameTemp._rx_byPotionRd = false;
		rx_t_gbgh2010012_gainHp.call(this, value);
	};

	//Scene_Title

	const rx_t_stc2010012_create = Scene_Title.prototype.create;
	Scene_Title.prototype.create = function() {
	    rx_t_stc2010012_create.call(this);
	    $gameTemp._rx_byPotionRd = false;
	};

	//Scene_Battle

	const rx_t_sbc2010012_create = Scene_Battle.prototype.create;
	Scene_Battle.prototype.create = function() {
	    rx_t_sbc2010012_create.call(this);
	    $gameTemp._rx_byPotionRd = false;
	};

})();