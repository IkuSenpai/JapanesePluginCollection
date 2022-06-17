//=============================================================================
// Plugin_Name : Voids damage
// File_Name   : RX_T_VoidsDamage.js
// Version     : 1.03
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc It is possible to create an element that void damage below or above the specified value.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes
 * @text System Word 1
 * @desc The system word to fill in the notes section
 * @default VoidsLessDamage
 *
 * @param SystemWord in Notes2
 * @text System Word 2
 * @desc The system word to fill in the notes section
 * @default VoidsMoreDamage
 *
 * @param SystemWord in Notes3
 * @text System word 3
 * @desc The system word to fill in the notes section
 * @default DamageVoidPiercer
 *
 * @param voidMsgTypeActor
 * @text VoidMSGType:Actor
 * @desc How the message is displayed when damage is voided
 * @type select
 * @option Configured in the plugin parameters
 * @value plugin
 * @option "Actor No Damage" in the "Terms" section of the Database
 * @value nodmg
 * @default plugin
 *
 * @param voidMsgActor
 * @parent voidMsgTypeActor
 * @text The text when voids
 * @desc Text to be displayed when damage is voided.
 * %1 is replaced to battler's name.
 * @type string
 * @default %1 has voided the damage!
 *
 * @param voidMsgTypeEnemy
 * @text VoidMSGType:Enemy
 * @desc How the message is displayed when damage is voided
 * @type select
 * @option Configured in the plugin parameters
 * @value plugin
 * @option "Enemy No Damage" in the "Terms" section of the Database
 * @value nodmg
 * @default plugin
 *
 * @param voidMsgEnemy
 * @parent voidMsgTypeEnemy
 * @text The text when voids
 * @desc Text to be displayed when damage is voided.
 * %1 is replaced to battler's name.
 * @type string
 * @default %1 has voided the damage!
 *
 * @param name
 * @text Void-SE File Name
 * @desc SE file name to sound when damage is voided
 * @default Earth2
 * @type string
 *
 * @param pan
 * @text Pan
 * @desc Sound-Pan
 * Usually 0.
 * @min -100
 * @max 100
 * @default 0
 * @type number
 *
 * @param pitch
 * @text Pitch
 * @desc Sound-Pitch
 * Usually 100.
 * @min 50
 * @max 150
 * @default 70
 * @type number
 *
 * @param volume
 * @text Volume
 * @desc Sound-Volume
 * The default for MZ is 90.
 * @min 0
 * @max 100
 * @default 90
 * @type number
 *
 * @param VoidRule
 * @text Void damage rule
 * @desc The process when the damage void conditions overlap
 * @type select
 * @option Total
 * @value total
 * @option Max
 * @value max
 * @option Min
 * @value min
 * @default max
 *
 * @help Voids damage
 * 
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * It is possible to create an element that void damage below or above the
 * specified value.
 * e.g. actors, enemies, states, weapons and armors.
 * And you can also ignore these features to create skills and items
 * that do damage.
 *
 * ◆Usage
 * Fill in the notes section
 * Target of Effect: actors, enemies, states, weapons and armors.
 *
 * For example:Voids damage of 50 or less.
 * <VoidsLessDamage:50>
 *
 * For example:Voids damage of 50 or more.
 * <VoidsMoreDamage:50>
 *
 * Settings for ignoring damage-voiding
 * Target of effect: skills and items
 *
 * <DamageVoidPiercer>
 *
 * [About Plugin Parameters]
 * You don't need to worry about the system word.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * ★VoidMSGType:Actor/Enemy
 * -Configured in the plugin parameters(param: plugin)
 *  The content of "The text when voids" described below is applied.
 * -"Actor No Damage" in the "Terms" section of the Database(param: nodmg)
 *  Apply the content of "Actor No Damage" in "Terms" under "Database".
 *
 * ★The text when voids
 * You can set the text you want to appear in the Battle Log when the
 * damage is voided.
 * Be sure to include "%1" in the text.
 *
 * ★Setting of SE when voided
 * You can sound the SE when the damage is disabled.
 * For the file name, choose the name of the SE file you want to sound
 * from the SE folder in the project folder.
 * You can leave this field blank to prevent SEs from sounding.
 * The range of values you can set for SE is the same as in the editor.
 *
 * ★Void damage rule
 * Sets how damage void conditions are handled when they overlap.
 * On the actor's side, it is determined using the values set for things like
 * the actor, the state it is receiving, the weapon it is equipped with, and
 * the armor it is equipped with.
 * This is referred to as Group A.
 * On the enemy's side, it is determined using the values set for the enemy,
 * and the values set for the state it is receiving.
 * This is referred to as Group B.
 *
 * -Total
 *  The specified amount of damage voided is the sum of the groups A/B.
 *
 * -Max
 *  The prescribed amount of damage voided is the maximum amount of value in
 *  groups A/B.
 *
 * -Min
 *  The prescribed amount of damage voided is the minimum amount of value in
 *  groups A/B.
 *
 * Default settings is Max. 
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 指定以内／以上のダメージを無効化する敵キャラやアクター、ステート等を作れるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes
 * @text システムワード1
 * @desc メモ欄に記入するシステムワード
 * @default 指定値内ダメージ無効

 * @param SystemWord in Notes2
 * @text システムワード2
 * @desc メモ欄に記入するシステムワード
 * @default 指定値以上ダメージ無効
 *
 * @param SystemWord in Notes3
 * @text システムワード3
 * @desc メモ欄に記入するシステムワード
 * @default ダメージ無効貫通
 *
 * @param voidMsgTypeActor
 * @text 無効化メッセージType：味方
 * @desc ダメージ無効化時に表示するメッセージの設定箇所
 * @type select
 * @option パラメータで直接設定
 * @value plugin
 * @option データベースの「味方ノーダメージ」
 * @value nodmg
 * @default plugin
 *
 * @param voidMsgActor
 * @parent voidMsgTypeActor
 * @text 無効化時表示文
 * @desc ダメージ無効化時に表示する文章
 * %1がバトラー名に置き換えられます
 * @type string
 * @default %1は ダメージを無効化した！
 *
 * @param voidMsgTypeEnemy
 * @text 無効化時メッセージType：敵
 * @desc ダメージ無効化時に表示するメッセージの設定箇所
 * @type select
 * @option パラメータで直接設定
 * @value plugin
 * @option データベースの「敵ノーダメージ」
 * @value nodmg
 * @default plugin
 *
 * @param voidMsgEnemy
 * @parent voidMsgTypeEnemy
 * @text 無効化時表示文
 * @desc ダメージ無効化時に表示する文章
 * %1がバトラー名に置き換えられます
 * @type string
 * @default %1は ダメージを無効化した！
 *
 * @param name
 * @text 無効化時SEファイル名
 * @desc ダメージを無効化された時に鳴らすSEのファイル名
 * @default Earth2
 * @type string
 *
 * @param pan
 * @text 位相
 * @desc 音の位相
 * 通常は 0 です。
 * @min -100
 * @max 100
 * @default 0
 * @type number
 *
 * @param pitch
 * @text ピッチ
 * @desc 音のピッチ
 * 通常は 100 です。
 * @min 50
 * @max 150
 * @default 70
 * @type number
 *
 * @param volume
 * @text 音量
 * @desc 音のボリューム
 * MZでのデフォルトは 90 です。
 * @min 0
 * @max 100
 * @default 90
 * @type number
 *
 * @param VoidRule
 * @text 無効化ルール
 * @desc ダメージ無効条件が重なった場合の処理
 * @type select
 * @option 総和
 * @value total
 * @option 最大値
 * @value max
 * @option 最小値
 * @value min
 * @default max
 *
 * @help ダメージの無効化
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 規定以内（または以上）のダメージを無効化する敵キャラやアクター他に
 * ステート、武器、防具を作れるようになります。
 *
 * また、このような特徴を無視してダメージを与える
 * スキルやアイテムを作ることもできます。
 *
 * ◆使い方
 * メモ欄に記入します（アクター、敵キャラ、ステート、武器、防具）。
 *
 * 例1：50ポイント以内のダメージを無効化する場合の書式
 * <指定値内ダメージ無効:50>
 *
 * 例2：50ポイント以上のダメージを無効化する場合の書式
 * <指定値以上ダメージ無効:50>
 *
 * ダメージ無効化を貫通させる場合（スキル、アイテム）
 * <ダメージ無効貫通>
 *
 * 【プラグインパラメータについて】
 * システムワードについては設定不要です。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * ★無効化時メッセージType：味方（or敵）
 * ・パラメータで直接設定（値：plugin）
 *  後述の「無効化時表示文」の内容が反映されます。
 * ・データベースの「味方ノーダメージ」（値：nodmg）
 *  「データベース」の「用語」にある「味方ノーダメージ」の内容が反映されます。
 *
 * ★無効化時表示文
 * ダメージを無効化された時、バトルログに表示させたい文章を設定できます。
 * 必ず「%1」が含まれた内容に設定してください。
 *
 * ★無効化時SEの設定
 * ダメージを無効化された時のSEを鳴らすことができます。
 * ファイル名はプロジェクトフォルダ内のSEフォルダに入っているものから
 * 選んで入力してください。
 * この欄を空白に設定してSEを鳴らさない設定もできます。
 * SE関連の設定できる数値の範囲はエディタと同様です。
 *
 * ★無効化ルール
 * ダメージ無効化条件が重なった時にどう処理するか決めます。
 * アクター側の場合、アクター、受けているステート、装備中の武器、防具に
 * 設定された値を使って決めます。以下、A群と呼びます。
 * 敵キャラ側の場合、敵キャラ、受けているステートに設定された値を使って
 * 決めます。以下、B群と呼びます。
 *
 * ・総和
 * ダメージを無効化する規定量がA群/B群の総和になります。
 *
 * ・最大値（デフォルト設定）
 * ダメージを無効化する規定量がA群/B群の中での最大値になります。
 *
 * ・最小値
 * ダメージを無効化する規定量がA群/B群の中での最小値になります。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/

(() => {
    'use strict';

	//RX-T plugin parameters
	const parameters = PluginManager.parameters('RX_T_VoidsDamage');
	const rx_lessVoidDmgWord = parameters['SystemWord in Notes'];
	const rx_moreVoidDmgWord = parameters['SystemWord in Notes2'];
	const rx_dmgVoidPierceWord = parameters['SystemWord in Notes3'];
	const rx_voidMsgTypeActor = parameters['voidMsgTypeActor'] || 'plugin'
	const rx_voidMsgActor = (parameters['voidMsgActor'] || "%1 has voided the damage!");
	const rx_voidMsgTypeEnemy = parameters['voidMsgTypeEnemy'] || 'plugin'
	const rx_voidMsgEnemy = (parameters['voidMsgEnemy'] || "%1 has voided the damage!");
	const rx_voidRule = parameters['VoidRule'];
	const rx_dmgVoidSound = {}; //SEの構造体
	rx_dmgVoidSound.name = parameters['name'];
	rx_dmgVoidSound.pan = parseInt(parameters['pan']); //以下パラメータ文字列を整数に変換して代入
	rx_dmgVoidSound.pitch = parseInt(parameters['pitch']);
	rx_dmgVoidSound.volume = parseInt(parameters['volume']);

	//RX_T original process
	class RX_T {
		static getVoidVar(object, option, valuetype = "") {
			if (object === undefined) return undefined;
			if (option === 0) {
				const value = valuetype === "int" ? parseInt(object.meta[rx_lessVoidDmgWord]) : object.meta[rx_lessVoidDmgWord];
				return value;
			}
			if (option === 1) {
				const value = valuetype === "int" ? parseInt(object.meta[rx_moreVoidDmgWord]) : object.meta[rx_moreVoidDmgWord];
				return value;
			}
		}
		static voidDamageCalc(target, option){
			let rx_target = target.isActor() ? target.actor() : target.enemy();
			let rx_maxMinValue = [];
			let rx_totalValue = 0;
			let rx_eqItem = 0;
			const rx_equipSize = target.isActor() ? target.equips().length : 0;
			const rx_equips = target.isActor() ? target.equips() : [];
			if (rx_voidRule !== "total" && this.getVoidVar(rx_target, option) !== undefined) rx_maxMinValue.push(this.getVoidVar(rx_target, option));
			if (rx_voidRule === "total" && this.getVoidVar(rx_target, option) !== undefined) rx_totalValue += this.getVoidVar(rx_target, option, "int");
		    target.states().forEach(function(state) {
		    	if(rx_voidRule !== "total" && RX_T.getVoidVar(state, option) !== undefined) rx_maxMinValue.push(RX_T.getVoidVar(state, option));
		    	if(rx_voidRule === "total" && RX_T.getVoidVar(state, option) !== undefined) rx_totalValue += RX_T.getVoidVar(state, option, "int");
		    }, target);
		    for (let i = 0; i < rx_equipSize; i++){
		    	if (!target.isActor()) continue;
		    	if (rx_equips[i] === null) continue;
		    	rx_eqItem = i === 0 ? RX_T.getVoidVar($dataWeapons[rx_equips[i].id], option) : RX_T.getVoidVar($dataArmors[rx_equips[i].id], option);
		    	if(rx_voidRule !== "total" && rx_eqItem !== undefined) rx_maxMinValue.push(rx_eqItem);
		    	if(rx_voidRule === "total" && rx_eqItem !== undefined) rx_totalValue += parseInt(rx_eqItem);
		    }
			if (rx_voidRule === "max") return rx_maxMinValue.length < 1 ? -1 : Math.max.apply(null, rx_maxMinValue);
			if (rx_voidRule === "min") return rx_maxMinValue.length < 1 ? -1 : Math.min.apply(null, rx_maxMinValue);
			return rx_totalValue === 0 ? -1 : rx_totalValue;
		}
		static getVoidCalc(target, value, or_less, or_more) {
			target._rx_hpVoid = 0;
			if (or_less || or_more) {
				if (target.isActor() && rx_voidMsgTypeActor === "plugin") target._rx_hpVoid = value;
				if (!target.isActor() && rx_voidMsgTypeEnemy === "plugin") target._rx_hpVoid = value;
				if (target._rx_voidDmgPierce){
					target._rx_hpVoid = 0;
					target._rx_voidDmgPierce = false
				}else{
					value *= 0;
				}
			}
			return $gameTemp._rx_byPotionVd ? -value : value;
		}
		static voidLastValue(target, value){
			const lessVoidDamage = this.voidDamageCalc(target, 0);
			const moreVoidDamage = this.voidDamageCalc(target, 1);
			const or_lessDamageVd = (value > 0 && lessVoidDamage > 0 && value <= lessVoidDamage);
			const or_moreDamageVd = (value > 0 && moreVoidDamage > 0 && value >= moreVoidDamage);
			return this.getVoidCalc(target, value, or_lessDamageVd, or_moreDamageVd);
		}
		static performRXVoidDamage() {
			SoundManager.playRXVoidDamage();
		}
		static makeHpVoidText(target) {
			const result = target.result();
		    const damage = result.hpDamage;
		    const isActor = target.isActor();
		    let fmt;
	    	this.performRXVoidDamage();
	        fmt = isActor ? rx_voidMsgActor : rx_voidMsgEnemy;
	        target._rx_hpVoid = 0;
	        return fmt.format(target.name());
		}
	}

	//SoundManager

	SoundManager.playRXVoidDamage = function() {
	    if (rx_dmgVoidSound.name !== "") AudioManager.playStaticSe(rx_dmgVoidSound);
	};

	//Game_Action

	const rx_t_gae200823_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
	    target._rx_voidDmgPierce = this.item().meta[rx_dmgVoidPierceWord] ? true : false;
	    rx_t_gae200823_apply.call(this, target);
	};

	const rx_t_gae200823_executeDamage = Game_Action.prototype.executeDamage;
	Game_Action.prototype.executeDamage = function(target, value) {
		value = RX_T.voidLastValue(target, value);
		rx_t_gae200823_executeDamage.call(this, target, value);
	};

	const rx_t_gaierh201001_itemEffectRecoverHp = Game_Action.prototype.itemEffectRecoverHp;
	Game_Action.prototype.itemEffectRecoverHp = function(target, effect) {
	    $gameTemp._rx_byPotionVd = true;
	    rx_t_gaierh201001_itemEffectRecoverHp.call(this, target, effect);
	};

	//Game_Battler

	const rx_t_gbgh200930_gainHp = Game_Battler.prototype.gainHp;
	Game_Battler.prototype.gainHp = function(value) {
		if (!this._rx_voidDmgPierce && value < 0 && $gameTemp._rx_byPotionVd) value = RX_T.voidLastValue(this, -value);
		if ($gameTemp._rx_byPotionVd) $gameTemp._rx_byPotionVd = false;
		rx_t_gbgh200930_gainHp.call(this, value);
	};

	//Scene_Title

	const rx_t_stc200930_create = Scene_Title.prototype.create;
	Scene_Title.prototype.create = function() {
	    rx_t_stc200930_create.call(this);
	    $gameTemp._rx_byPotionVd = false;
	};

	//Scene_Battle

	const rx_t_sbc200930_create = Scene_Battle.prototype.create;
	Scene_Battle.prototype.create = function() {
	    rx_t_sbc200930_create.call(this);
	    $gameTemp._rx_byPotionVd = false;
	};

	//Window_BattleLog

	const rx_t_gae200823_makeHpDamageText = Window_BattleLog.prototype.makeHpDamageText;
	Window_BattleLog.prototype.makeHpDamageText = function(target) {
	    if (target._rx_hpVoid > 0) return RX_T.makeHpVoidText(target);
	    return rx_t_gae200823_makeHpDamageText.call(this, target);
	};

})();