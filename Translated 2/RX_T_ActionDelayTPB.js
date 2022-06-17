//=============================================================================
// Plugin_Name : Action delay skill for TPB
// File_Name   : RX_T_ActionDelayTPB.js
// Version     : 1.00
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MZ
 * @plugindesc You can create an action delay skill or item that increases your opponent's action waiting time.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes1
 * @text System word
 * @desc System word to fill in the notes field
 * @default TPBDamage
 *
 * @param SystemWord in Notes2
 * @text System word
 * @desc System word to fill in the notes field
 * @default TPBCastDamage
 *
 * @param dalayMsgActor
 * @text MSGatWaitTimeDelay:Actor
 * @desc Text to be displayed when the action time is delayed.
 * %1 is replaced to battler's name.
 * @type string
 * @default %1 has received a delay in action!
 *
 * @param gainMsgActor
 * @text MSGatWaitTimeShrink:Actor
 * @desc Text to be displayed when the action time is moved up.
 * %1 is replaced to battler's name.
 * @type string
 * @default %1's time for action has moved up!
 *
 * @param dalayMsgEnemy
 * @text MSGatWaitTimeDelay:Enemy
 * @desc Text to be displayed when the action time is delayed.
 * %1 is replaced to battler's name.
 * @type string
 * @default %1 has received a delay in action!
 *
 * @param gainMsgEnemy
 * @text MSGatWaitTimeShrink:Enemy
 * @desc Text to be displayed when the action time is moved up.
 * %1 is replaced to battler's name.
 * @type string
 * @default %1's time for action has moved up!
 *
 * @help Action delay skill for TPB
 *
 * This plugin is compatible with RPG Maker MZ's TPB mode.
 *
 * ◆Summary
 * You can create an action delay skill or item that increases your opponent's
 * action waiting time.
 * For example, if an ally is hit by this skill, it will be cancelled even
 * if they are ready to act, and their gauge will be reduced.
 * You can also make your opponent stop for a while by increasing the value.
 *
 * ◆Usage
 * Fill in the notes section(target of Effect: skills and items).
 * Example: If you want to reduce your TPB gauge from full to 0 at once
 * (For the sake of clarity, I'm using actors as an example, but the same image
 * applies to enemies.)
 *
 * <TPBDamage:500>
 *
 * This is an image of damage to TPB's waiting time.
 * 500 is equal to one turn (one gauge).
 * If you set it to a negative value, the gauge will build up in reverse.
 *
 * The same thing can be done for the chanting time after the action has been
 * determined*.
 * *:This is a concept that occurs in TPB mode for skills with a negative value
 * of speed in "invocation" section.
 *
 * Example: If you want to reduce the chanting time by 500
 *
 * <TPBCastDamage:500>
 *
 * The idea behind the settings is basically the same, but depending on the
 * skill's speed compensation settings, a skill that reduces chanting time by
 * one normal TPB gauge may be used on a chanting target and still have
 * chanting time remaining(One gauge:500).
 * (If the target is a character who is chanting a skill with a speed
 * correction of -15 or so, the chanting time will be eliminated with the skill
 * with the above setting.)
 * Set it up with this in mind.
 *
 * If you want to create a skill that is simply for these effect, set the
 * "Type" of Damage section to "None".
 *
 * [Caution]
 * When restoring the TPB gauge (waiting time) of a target in a chanting state,
 * the chanting state may be canceled depending on settings and circumstances.
 *
 * [About Plugin Parameters]
 * You don't need to worry about the system word.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * ★MSGatWaitTimeDelay:Actor(or Enemy)
 * You can set the text you want to appear in the Battle Log when there is a
 * delay before you can act.
 * Be sure to include "%1" in the text.
 *
 * ★MSGatWaitTimeShrink:Actor(or Enemy)
 * You can set the text you want to appear in the Battle Log when the time to
 * act has moved up.
 * Be sure to include "%1" in the text.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MZ
 * @plugindesc 行動待機時間を伸ばす、行動遅延スキルやアイテムを作成できます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes1
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default TPBダメージ
 *
 * @param SystemWord in Notes2
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 詠唱ダメージ
 *
 * @param dalayMsgActor
 * @text 行動時間遅延時表示文・味方
 * @desc 行動までの時間が遅延した時に表示する文章
 * %1がバトラー名に置き換えられます
 * @type string
 * @default %1は 行動遅延を受けた！
 *
 * @param gainMsgActor
 * @text 行動時間繰上時表示文・味方
 * @desc 行動までの時間が繰り上がった時に表示する文章
 * %1がバトラー名に置き換えられます
 * @type string
 * @default %1の行動時間が繰り上がった！
 *
 * @param dalayMsgEnemy
 * @text 行動時間遅延時表示文・敵
 * @desc 行動までの時間が遅延した時に表示する文章
 * %1がバトラー名に置き換えられます
 * @type string
 * @default %1は 行動遅延を受けた！
 *
 * @param gainMsgEnemy
 * @text 行動時間繰上時表示文・敵
 * @desc 行動までの時間が繰り上がった時に表示する文章
 * %1がバトラー名に置き換えられます
 * @type string
 * @default %1の行動時間が繰り上がった！
 *
 * @help 行動遅延スキル（TPB）
 *
 * このプラグインはRPGツクールMZのTPBモードに対応しています。
 *
 * ◆概要
 * 相手の行動待機時間を伸ばす、行動遅延スキルやアイテムを作成できます。
 * 例えばこのスキルを味方が受けると、行動可能状態であってもキャンセルされ、
 * 溜まっていたゲージが減少します。
 * 数値を大きくすることで相手をしばらく停止状態にもできます。
 *
 * ◆使い方
 * スキル、アイテムのメモ欄に記入します。
 * 例：TPBゲージを満タンから一気に0になるまで減らす設定の場合
 * （分かりやすくアクターを例にしていますが、敵キャラもイメージは同じです。）
 *
 * <TPBダメージ:500>
 *
 * TPBの待機時間にダメージを与えるイメージです。
 * 500で1ターン分の計算になります。
 * マイナス設定をすると逆にゲージが溜まるようになります｡
 *
 * また、行動決定後の詠唱時間（※）に対しても上記と同様のことができます。
 * ※：TPBモードでは速度補正がマイナス値のスキルに発生する概念です。
 *
 * 例：詠唱時間を500短縮させる設定の場合
 *
 * <詠唱ダメージ:-500>
 *
 * 設定の考え方も基本的には同じですが、スキルの速度補正設定によっては
 * 通常のTPBゲージ１本分の詠唱時間（500）を短縮させるスキルを詠唱中の
 * 対象に使っても、詠唱時間が残ることがあります。
 * （対象が速度補正-15程度のスキルを詠唱しているキャラであれば
 * 　上記設定のスキルで詠唱時間が無くなります。）
 * なので、そこを踏まえて設定してください。
 *
 * 単にこれらの効果だけのスキルを作る場合はダメージのタイプを「なし」に
 * 設定してください。
 *
 * 【ご注意】
 * 詠唱状態にある対象のTPBゲージ（待ち時間）を回復させる際
 * 設定や状況によっては詠唱状態が解除される場合があります。
 *
 * 【プラグインパラメータについて】
 * システムワードについては設定不要です。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * ★行動時間遅延時表示文：味方（or敵）
 * 行動までの時間が遅延した時、バトルログに表示させたい文章を設定できます。
 * 必ず「%1」が含まれた内容に設定してください。
 *
 * ★行動時間繰上時表示文：味方（or敵）
 * 行動までの時間が繰り上がった時、バトルログに表示させたい文章を設定できます。
 * 必ず「%1」が含まれた内容に設定してください。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

	//RX-T plugin parameters
	const parameters = PluginManager.parameters('RX_T_ActionDelayTPB');
	const rx_dalayActTime = parameters['SystemWord in Notes1'];
	const rx_dalayCastTime = parameters['SystemWord in Notes2'];
	const rx_actorLossTPB = parameters['dalayMsgActor'];
	const rx_enemyLossTPB = parameters['dalayMsgEnemy'];
	const rx_actorGainTPB = parameters['gainMsgActor'];
	const rx_enemyGainTPB = parameters['gainMsgEnemy'];

	//Game_Action

	Game_Action.prototype.rx_executeTPBDamage = function(target){
		const result = target.result();
		if (result.isHit()){
			this.makeSuccess(target);
			target.rxTPBDamage(this);
		}		
	}

	const rx_t_gault200829_updateLastTarget = Game_Action.prototype.updateLastTarget;
	Game_Action.prototype.updateLastTarget = function(target) {
		this.rx_executeTPBDamage(target);
		rx_t_gault200829_updateLastTarget.call(this, target);
	};

	//Game_Battler

	Game_Battler.prototype.rxTPBDamage = function(subject) {
		let rx_13target = this.isActor() ? this.actor() : this.enemy();
		let rx_initialTPBDmg = subject.item().meta[rx_dalayActTime];
		let rx_initialTPBCastDmg = subject.item().meta[rx_dalayCastTime];
		this._rx_TPBDamage = rx_initialTPBDmg === undefined ? 0 : rx_initialTPBDmg;
		this._rx_TPBCastDamage = rx_initialTPBCastDmg === undefined ? 0 : rx_initialTPBCastDmg;
		if (this._rx_TPBDamage !== 0) {
			this._tpbChargeTime -= (this._rx_TPBDamage / 1000.0);
		}
		if (this._rx_TPBDamage !== 0) {
			this._tpbChargeTime -= (this._rx_TPBDamage / 1000.0);
		}
		if (this._rx_TPBDamage > 0) this._tpbState = "charging";
		if (this._tpbChargeTime >= 1 && this._tpbState === "casting"){
			this._tpbCastTime -= (this._rx_TPBCastDamage / 1000.0);
			if (this._rx_TPBDamage === 0) this._rx_TPBDamage = this._rx_TPBCastDamage;
			return;
		}
		if (this._rx_TPBDamage < 0 && this._tpbChargeTime >= 1) this._tpbState = "charging";
		if (this._rx_TPBDamage === 0) this._rx_TPBDamage = this._rx_TPBCastDamage;
	};

	const rx_t_gbmta200829_makeTpbActions = Game_Battler.prototype.makeTpbActions;
	Game_Battler.prototype.makeTpbActions = function() {
		if (!this.isActor() && this._tpbState !== "charged") return;
		rx_t_gbmta200829_makeTpbActions.call(this);
	};

	//Window_BattleLog

	const rx_t_wbdf200829_displayFailure = Window_BattleLog.prototype.displayFailure;
	Window_BattleLog.prototype.displayFailure = function(target) {
	    if (!target.result().missed && !target.result().evaded && target._rx_TPBDamage !== 0) {
	        this.rx_displayTPBdamage(target);
	        return;
	    }
	    rx_t_wbdf200829_displayFailure.call(this, target);
	};

	Window_BattleLog.prototype.rx_displayTPBdamage = function(target) {
	    if (target.isAlive() && target._rx_TPBDamage !== 0) {
	        this.push("addText", this.rx_makeTPBDamageText(target));
	    }
	};

	Window_BattleLog.prototype.rx_makeTPBDamageText = function(target) {
	    const result = target.result();
	    const damage = target._rx_TPBDamage;
	    const isActor = target.isActor();
	    let fmt;
	    if (damage > 0) {
	        fmt = isActor ? rx_actorLossTPB : rx_enemyLossTPB;
	        return fmt.format(target.name());
	    } else if (damage < 0) {
	        fmt = isActor ? rx_actorGainTPB : rx_enemyGainTPB;
	        return fmt.format(target.name());
	    } else {
	    alert("damage undefined");
	        return "";
	    }
	};

})();