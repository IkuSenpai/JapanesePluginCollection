//=============================================================================
// Plugin_Name : Absorbs damage
// File_Name   : RX_T_AbsorbsDamage.js
// Version     : 1.11
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Absorbs damage below a specified value(actors & enemies).
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes
 * @text System Word 1
 * @desc The system word to fill in the notes section
 * @default AbsorbsLessDamage
 *
 * @param SystemWord in Notes2
 * @text System Word 2
 * @desc The system word to fill in the notes section
 * @default AbsorbsMoreDamage
 *
 * @param SystemWord in Notes3
 * @text System word 3
 * @desc The system word to fill in the notes section
 * @default DisableDamageAbsorption
 *
 * @param absorbMsgTypeActor
 * @text AbsorbMSGType:Actor
 * @desc How the message is displayed when damage is absorbed
 * @type select
 * @option Configured in the plugin parameters
 * @value plugin
 * @option "Actor Recovery" in the "Terms" section of the Database
 * @value heal
 * @default plugin
 *
 * @param absorbMsgActor
 * @parent absorbMsgTypeActor
 * @text The text when absorbs
 * @desc Text to be displayed when damage is absorbed
 * %1 is replaced to battler's name, %2 is damage numeric
 * @type string
 * @default %1 has absorbed %2 damage!
 *
 * @param absorbMsgTypeEnemy
 * @text AbsorbMSGType:Enemy
 * @desc How the message is displayed when damage is absorbed
 * @type select
 * @option Configured in the plugin parameters
 * @value plugin
 * @option "Enemy Recovery" in the "Terms" section of the Database
 * @value heal
 * @default plugin
 *
 * @param absorbMsgEnemy
 * @parent absorbMsgTypeEnemy
 * @text The text when absorbs
 * @desc Text to be displayed when damage is absorbed
 * %1 is replaced to battler's name, %2 is damage numeric.
 * @type string
 * @default %1 has absorbed %2 damage!
 *
 * @param AbsorbRule
 * @text Absorption rule
 * @desc In the event of a combination of damage absorption conditions, the process
 * @type select
 * @option Total
 * @value total
 * @option Max
 * @value max
 * @option Min
 * @value min
 * @default max
 *
 * @help Absorbs damage
 * 
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * You will be able to create enemies, actors, states, weapons, and armors
 * that absorb more, or less, than a certain amount of damage.
 * Skills with this effect can also be practically created, because
 * it can set to state.
 *
 * And you can also ignore these features to create skills and items
 * that do damage.
 *
 * ◆Usage
 * Fill in the notes section.
 * (target of Effect: enemies, actors, states, weapons and armors).
 *
 * For example:Absorbs damage of 50 or less.
 * <AbsorbsLessDamage:50>
 *
 * For example:Absorbs damage of 50 or more.
 * <AbsorbsMoreDamage:50>
 *
 * Settings for disabling damage absorption(skills, items)
 * <DisableDamageAbsorption>
 *
 * [About Plugin Parameters]
 * You don't need to worry about the system word.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * ★AbsorbMSGType:Actor(or Enemy)
 * -Configured in the plugin parameters(param:plugin)
 *  The content of "The text when absorbs" described below is applied.
 * -"Friendly Recovery" in the "Terms" section of the Database(param:heal)
 *  Apply the content of "Friendly Recovery" in "Terms" under "Database".
 *
 * ★The text when absorbs
 * You can set the text you want to appear in the Battle Log when the
 * damage is absorbed.
 * Be sure to include "%1" and "%2" in the text.
 *
 * ★absorption rule
 * Sets how damage absorption conditions are handled when they overlap.
 * On the actor's side, it is determined using the values set for things like
 * the actor, the state it is receiving, the weapon it is equipped with, and
 * the armor it is equipped with.
 * This is referred to as Group A.
 * On the enemy's side, it is determined using the values set for the enemy,
 * and the values set for the state it is receiving.
 * This is referred to as Group B.
 *
 * -Total
 *  The specified amount of damage absorbed is the sum of the groups A/B.
 *
 * -Max
 *  The prescribed amount of damage absorbed is the maximum amount of value in
 *  groups A/B.
 *
 * -Min
 *  The prescribed amount of damage absorbed is the minimum amount of value in
 *  groups A/B.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 規定以内（または以上）のダメージを吸収する敵キャラやアクター等を作れるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes
 * @text システムワード1
 * @desc メモ欄に記入するシステムワード
 * @default 指定値内ダメージ吸収

 * @param SystemWord in Notes2
 * @text システムワード2
 * @desc メモ欄に記入するシステムワード
 * @default 指定値以上ダメージ吸収
 *
 * @param SystemWord in Notes3
 * @text システムワード3
 * @desc メモ欄に記入するシステムワード
 * @default ダメージ吸収無効
 *
 * @param absorbMsgTypeActor
 * @text 吸収時メッセージType：味方
 * @desc ダメージ吸収時に表示するメッセージの設定箇所
 * @type select
 * @option パラメータで直接設定
 * @value plugin
 * @option データベースの「味方回復」
 * @value heal
 * @default plugin
 *
 * @param absorbMsgActor
 * @parent absorbMsgTypeActor
 * @text 吸収時表示文
 * @desc ダメージ吸収時に表示する文章
 * %1がバトラー名に、%2がダメージ値に置き換えられます
 * @type string
 * @default %1は %2 のダメージを吸収した！
 *
 * @param absorbMsgTypeEnemy
 * @text 吸収時メッセージType：敵
 * @desc ダメージ吸収時に表示するメッセージの設定箇所
 * @type select
 * @option パラメータで直接設定
 * @value plugin
 * @option データベースの「敵回復」
 * @value heal
 * @default plugin
 *
 * @param absorbMsgEnemy
 * @parent absorbMsgTypeEnemy
 * @text 吸収時表示文
 * @desc ダメージ吸収時に表示する文章
 * %1がバトラー名に、%2がダメージ値に置き換えられます
 * @type string
 * @default %1は %2 のダメージを吸収した！
 *
 * @param AbsorbRule
 * @text 吸収ルール
 * @desc ダメージ吸収条件が重なった場合の処理
 * @type select
 * @option 総和
 * @value total
 * @option 最大値
 * @value max
 * @option 最小値
 * @value min
 * @default max
 *
 * @help ダメージの吸収
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 規定以内（または以上）のダメージを吸収する敵キャラ、アクター、
 * ステート、武器、防具を作れるようになります。
 * ステートに設定できるので、この効果を持つスキルも
 * 実質作ることができます。
 * 
 * また、このような特徴を無視してダメージを与える
 * スキルやアイテムを作ることもできます。
 *
 * ◆使い方
 * アクター、敵キャラ、ステート、武器、防具のメモ欄に記入します。
 *
 * 例1：50ポイント以内のダメージを吸収する場合の書式
 * <指定値内ダメージ吸収:50>
 *
 * 例2：50ポイント以上のダメージを吸収する場合の書式
 * <指定値以上ダメージ吸収:50>
 *
 * ダメージ吸収を無効化する場合（スキル、アイテム）
 * <ダメージ吸収無効>
 *
 * 【プラグインパラメータについて】
 * システムワードについては設定不要です。
 *
 * ★吸収時メッセージType：味方（or敵）
 * ・パラメータで直接設定（値：plugin）
 *  後述の「吸収時表示文」の内容が反映されます。
 * ・データベースの「味方回復」（値：heal）
 *  「データベース」の「用語」にある「味方回復」の内容が反映されます。
 *
 * ★吸収時表示文
 * ダメージを吸収された時、バトルログに表示させたい文章を設定できます。
 * 必ず「%1」と「%2」が含まれた内容に設定してください。
 *
 * ★吸収ルール
 * ダメージ吸収条件が重なった時にどう処理するか決めます。
 * アクター側の場合、アクター、受けているステート、装備中の武器、防具に
 * 設定された値を使って決めます。以下、A群と呼びます。
 * 敵キャラ側の場合、敵キャラ、受けているステートに設定された値を使って
 * 決めます。以下、B群と呼びます。
 *
 * ・総和
 * ダメージを吸収する規定量がA群/B群の総和になります。
 *
 * ・最大値（デフォルト設定）
 * ダメージを吸収する規定量がA群/B群の中での最大値になります。
 *
 * ・最小値（デフォルト設定）
 * ダメージを吸収する規定量がA群/B群の中での最小値になります。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/

(() => {
    'use strict';

	//RX-T plugin parameters
	const parameters = PluginManager.parameters('RX_T_AbsorbsDamage');
	const absorbWord = parameters['SystemWord in Notes'];
	const OVDMabsorbWord = parameters['SystemWord in Notes2'];
	const disabsorbWord = parameters['SystemWord in Notes3'];
	const absorbMsgTypeActor = parameters['absorbMsgTypeActor'] || 'plugin'
	const absorbMsgActor = (parameters['absorbMsgActor'] || "%1 has absorbed %2 damage!");
	const absorbMsgTypeEnemy = parameters['absorbMsgTypeEnemy'] || 'plugin'
	const absorbMsgEnemy = (parameters['absorbMsgEnemy'] || "%1 has absorbed %2 damage!");
	const absorbRule = parameters['AbsorbRule'];

	//RX_T original process
	class RX_T {
		static getAbsVar(object, option, valuetype = "") {
			if (object === undefined) return undefined;
			if (option === 0) {
				const value = valuetype === "int" ? parseInt(object.meta[absorbWord]) : object.meta[absorbWord];
				return value;
			}
			if (option === 1) {
				const value = valuetype === "int" ? parseInt(object.meta[OVDMabsorbWord]) : object.meta[OVDMabsorbWord];
				return value;
			}
		}
		static absorbDamageCalc(target, option){
			let rx_target = target.isActor() ? target.actor() : target.enemy();
			let rx_maxMinValue = [];
			let rx_totalValue = 0;
			let rx_eqItem = 0;
			const rx_equipSize = target.isActor() ? target.equips().length : 0;
			const rx_equips = target.isActor() ? target.equips() : [];
			if (absorbRule !== "total" && this.getAbsVar(rx_target, option) !== undefined) rx_maxMinValue.push(this.getAbsVar(rx_target, option));
			if (absorbRule === "total" && this.getAbsVar(rx_target, option) !== undefined) rx_totalValue += this.getAbsVar(rx_target, option, "int");
		    target.states().forEach(function(state) {
		    	if(absorbRule !== "total" && RX_T.getAbsVar(state, option) !== undefined) rx_maxMinValue.push(RX_T.getAbsVar(state, option));
		    	if(absorbRule === "total" && RX_T.getAbsVar(state, option) !== undefined) rx_totalValue += RX_T.getAbsVar(state, option, "int");
		    }, target);
		    for (let i = 0; i < rx_equipSize; i++){
		    	if (!target.isActor()) continue;
		    	if (rx_equips[i] === null) continue;
		    	rx_eqItem = i === 0 ? RX_T.getAbsVar($dataWeapons[rx_equips[i].id], option) : RX_T.getAbsVar($dataArmors[rx_equips[i].id], option);
		    	if(absorbRule !== "total" && rx_eqItem !== undefined) rx_maxMinValue.push(rx_eqItem);
		    	if(absorbRule === "total" && rx_eqItem !== undefined) rx_totalValue += parseInt(rx_eqItem);
		    }
			if (absorbRule === "max") return rx_maxMinValue.length < 1 ? -1 : Math.max.apply(null, rx_maxMinValue);
			if (absorbRule === "min") return rx_maxMinValue.length < 1 ? -1 : Math.min.apply(null, rx_maxMinValue);
			return rx_totalValue === 0 ? -1 : rx_totalValue;
		}
		static getAbsCalc(target, value, or_less, or_more) {
			target._rx_hpAbsorb = 0;
			if (or_less || or_more) {
				value *= -1;
				if (target.isActor() && absorbMsgTypeActor === "plugin") target._rx_hpAbsorb = value;
				if (!target.isActor() && absorbMsgTypeEnemy === "plugin") target._rx_hpAbsorb = value;
				if (target._rx_disableAbsorb){
					value *= -1;
					target._rx_hpAbsorb = 0;
					target._rx_disableAbsorb = false
				}
			}
			return $gameTemp._rx_byPotionAb ? -value : value;
		}
		static absorbLastValue(target, value){
			const minusDamage = this.absorbDamageCalc(target, 0);
			const ovDamage = this.absorbDamageCalc(target, 1);
			const or_lessDamageAb = (value > 0 && minusDamage > 0 && value <= minusDamage);
			const or_moreDamageAb = (value > 0 && ovDamage > 0 && value >= ovDamage);
			return this.getAbsCalc(target, value, or_lessDamageAb, or_moreDamageAb);
		}
		static makeHpAbsorbText(target) {
			const result = target.result();
		    const damage = result.hpDamage;
		    const isActor = target.isActor();
		    let fmt;
	        fmt = isActor ? absorbMsgActor : absorbMsgEnemy;
			target._rx_hpAbsorb = 0;
	        return fmt.format(target.name(), -damage);
		}
	}

	//Game_Action

	const rx_t_gae2008201_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
	    target._rx_disableAbsorb = this.item().meta[disabsorbWord] ? true : false;
	    rx_t_gae2008201_apply.call(this, target);
	};

	const rx_t_gae151101_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		value = RX_T.absorbLastValue(target, value);
		rx_t_gae151101_executeDamage.call(this, target, value);
	};

	const rx_t_gaierh2010011_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
	Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
	    $gameTemp._rx_byPotionAb = true;
	    rx_t_gaierh2010011_itemEffectRecoverHp.call(this, target, effect);
	};

	//Game_Battler

	const rx_t_gbgh2010011_gainHp = Game_Battler.prototype.gainHp;
	Game_Battler.prototype.gainHp = function(value) {
		if (!this._rx_disableAbsorb && value < 0 && $gameTemp._rx_byPotionAb) value = RX_T.absorbLastValue(this, -value);
		if ($gameTemp._rx_byPotionAb) $gameTemp._rx_byPotionAb = false;
		rx_t_gbgh2010011_gainHp.call(this, value);
	};

	//Scene_Title

	const rx_t_stc2010011_create = Scene_Title.prototype.create;
	Scene_Title.prototype.create = function() {
	    rx_t_stc2010011_create.call(this);
	    $gameTemp._rx_byPotionAb = false;
	};

	//Scene_Battle

	const rx_t_sbc2010011_create = Scene_Battle.prototype.create;
	Scene_Battle.prototype.create = function() {
	    rx_t_sbc2010011_create.call(this);
	    $gameTemp._rx_byPotionAb = false;
	};

	//Window_BattleLog

	const rx_t_gae2008201_makeHpDamageText = Window_BattleLog.prototype.makeHpDamageText;
	Window_BattleLog.prototype.makeHpDamageText = function(target) {
		if (target._rx_hpAbsorb < 0) return RX_T.makeHpAbsorbText(target);
	    return rx_t_gae2008201_makeHpDamageText.call(this, target);
	};

})();