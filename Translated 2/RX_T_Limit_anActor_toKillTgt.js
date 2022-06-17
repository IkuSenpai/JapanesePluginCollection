//=============================================================================
// Plugin_Name : Limiting the actors that can take down a target
// File_Name   : RX_T_Limit_anActor_toKillTgt.js
// Version     : 1.00
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You can limit the actors who can give the finishing blow to the enemy.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes
 * @text System word
 * @desc System word to fill in the notes field
 * @default FinishBlowActorID
 *
 * @help Limiting the actors that can take down a enemy
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * You can limit the actors who can give the finishing blow to the enemy.
 * For example, you can make it so that only the main character can give the
 * finishing blow, or only the character who should be avenged in the
 * revenge event can give the finishing blow.
 *
 * ◆Usage
 * Fill in the notes section of the enemies.
 * Example:If you want to make sure that only actors with an Actor ID of
 * 1, 3 or 7 can give the finish blow
 *
 * <FinishBlowActorID:1, 3, 7>
 * 
 * The way it works is that when you damage an enemy character with the
 * above settings, if the target's HP left is less than or equal to the
 * damage value, HP will always remain at 1 point for attacks other than
 * the corresponding actor ID.
 * (On the surface, it looks like giving the damage.)
 * You can use this to obscure the exact HP, but due to these specifications,
 * you can't use it for games that show the enemy's HP gauge.
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
 * @plugindesc 敵キャラに最後の一撃を与えられるアクターを限定させます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 撃破可能なアクターID
 *
 * @help 敵キャラを倒せるアクターの限定
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 敵キャラに最後の一撃を与えられるアクターを限定させます。
 * 例えば主人公でしか止めを刺せない設定にしたり、仇討ちイベントで
 * 仇を討つべきキャラクターでしか止めを刺せなくすることができます。
 *
 * ◆使い方
 * 敵キャラのメモ欄に記入します。
 * 例：アクターIDが1、4、9のアクターでしか止めを刺せなくしたい場合
 *
 * <撃破可能なアクターID:1, 4, 9>
 *
 * 仕組みとしては、上記のような設定がされた敵キャラにダメージを与える時
 * 対象のHPがダメージ値以下の場合、該当するアクターID以外の攻撃では
 * HPが必ず1残るようになっています。
 * （表面上はダメージを与えているように見えています。）
 * これを利用して正確なHPが分かりづらくできますが
 * こうした仕様上、敵のHPゲージが表示されるゲームには使えません。
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
	const parameters = PluginManager.parameters('RX_T_Limit_anActor_toKillTgt');
	const rx_lastKiller = parameters['SystemWord in Notes'];

	//Game_Action

	Game_Action.prototype.rx_getsPermissionToKill = function(target, value){
		if (target.isActor()) return true;
		if (target.hp > value) return true;
		const rx_target = target.isActor() ? target.actor() : target.enemy();
		const killOKList = rx_target.meta[rx_lastKiller];
		const attacker_id = this._subjectActorId;
		if (killOKList === undefined) return true;
		if (killOKList.length === 0) return true;
		if (killOKList.indexOf(attacker_id) > -1 && value >= target.hp) return true;
		return false;
	}

	const rx_t_gaehd200830_executeHpDamage = Game_Action.prototype.executeHpDamage;
	Game_Action.prototype.executeHpDamage = function(target, value) {
		target._rx_killOK = this.rx_getsPermissionToKill(target, value);
		rx_t_gaehd200830_executeHpDamage.call(this, target, value);
	};

	//Game_BattlerBase

	const rx_t_gbbsh200830_setHp = Game_BattlerBase.prototype.setHp;
	Game_BattlerBase.prototype.setHp = function(hp) {
		if (!this._rx_killOK && hp <= 0) hp = 1;
		rx_t_gbbsh200830_setHp.call(this, hp);
	};

})();