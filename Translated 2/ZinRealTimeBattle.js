//=============================================================================
// RPG Maker MZ - RealTimeBattle
//
// Copyright 2020-2021 Huuzin
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//
// ver 2.0.0	Release data: 2021/01/01
//				プラグインを刷新
//				複数の競合を無くすように処理を変更
//				防御や通常戦闘等のアニメーションの無い選択を行ったときに正常に動かなくなるバグを修正
//				スタン等が解除した後行動ゲージが溜まらなくなる不具合を解消
// ver 1.0.0	Release data: 2020/10/25
//				初版公開
// 
// https://huuzin.net
// 
//=============================================================================

/*:
* @target MZ
* @plugindesc ver 2.0.0 アクティブ制バトルで各プレイヤーが同時進行で攻撃を出せるようにします。
* @author Huuzin
* @url https://huuzin.net/2020/10/25/realtimebattle/
*
* @help
* 戦闘システムでタイムプログレス（アクティブ）を選択すると、他のプレイヤー
* や敵が行動している間、別のキャラクターも行動することができます。
* 自動戦闘を利用しての同時進行バトルに向いています。
*
* ---動作確認---
* コアスクリプト：v1.1.1
* RealTimeBattle ver 1.0.0に比べていくつかのプラグインとの競合は解消され
* ましたが、基幹システムを変更しているため意図通りの動作をしないプラグイン
* が多いと思われます。
*
* ---使用方法---
* 1. プラグインをONし、戦闘システムでタイムプログレス（アクティブ）を選択
* してください。
*
*
*/

(() => {
	'use strict';
	//const script = document.currentScript;
	//const param  = PluginManagerEx.createParameter(script);

	//-------------------------------------------------------------------------------------------------
	//	Plugin command
	//-------------------------------------------------------------------------------------------------


	//-------------------------------------------------------------------------------------------------
    // Constant
    //-------------------------------------------------------------------------------------------------
	

	//-------------------------------------------------------------------------------------------------
    // BattleManager
    //-------------------------------------------------------------------------------------------------
	const BattleManager_initMembers = BattleManager.initMembers;
	BattleManager.initMembers = function() {
		BattleManager_initMembers.apply(this,arguments);
		this._actionAnimations = [];
		this._updatePhaseFlag = false;
	};

	const _BattleManager_update = BattleManager.update;
	BattleManager.update = function(timeActive) {
		this._updatePhaseFlag = false;
		_BattleManager_update.apply(this,arguments);

		//ビジー状態でもupdatePhaseを呼ぶ
		if (!this._updatePhaseFlag && this.isBusy() && 
			(this._phase == "turn" || this._phase == "action" || this._phase == "turnEnd") &&
			!this.updateEvent()) {
			this.updatePhase(timeActive);
		}
	};

	const BattleManager_updatePhase = BattleManager.updatePhase;
	BattleManager.updatePhase = function(timeActive) {
		this._updatePhaseFlag = true;

		//Action Update
		let i = 0;
		let flag = false;
		while(this._phase == "turn" && i < this._actionAnimations.length){
			//数フレームはアクション処理しない
			if(this._actionAnimations[i].delayCnt < 2){
				this._actionAnimations[i].delayCnt++;
				i++;
				continue;
			}

			//アニメーション再生中か
			flag = false;
			for(let j = 0; j < this._actionAnimations[i].animList.length; j++){
				if(this._actionAnimations[i].animList[j].isAnimationPlaying()){
					flag = true;
					break;
				}
			}
			if(flag){i++; continue;}

			//使用者が動いているか
			if(this._spriteset.isSubjectMoving(this._actionAnimations[i].subject)){
				i++;
				continue;
			}

			//アクションの効果適用へ
			if(this._actionAnimations[i].subject.canMove()){
				this._subject = this._actionAnimations[i].subject;
				this._targets = this._actionAnimations[i].targets;
				this._action = this._actionAnimations[i].action;
				this._actionAnimations.splice(i,1);
				this._phase = "action";
			}
			else{
				this._actionAnimations.splice(i,1);
				continue;
			}		
			break;
		}

		BattleManager_updatePhase.apply(this,arguments);
	};

	const _BattleManager_startAction = BattleManager.startAction;
	BattleManager.startAction = function() {
		_BattleManager_startAction.apply(this,arguments);
		this._phase = "turn";

		// アクションアニメーションを作成
		const actionAnimation = {
			subject: this._subject,
			targets: this._targets,
			action: this._action,
			animList: [],
			delayCnt: 0
		};
		this._actionAnimations.push(actionAnimation);
		$gameTemp._tempActionAnim = actionAnimation;

		this._logWindow.callNextMethod();			// リフレッシュ
		$gameTemp._tempActionAnim = null;			// Tempリセット
	};


	//-------------------------------------------------------------------------------------------------
    // Window_BattleLog
	//-------------------------------------------------------------------------------------------------
	Window_BattleLog.prototype.callNextMethod = function() {
		while(this._methods.length > 0) {
			const method = this._methods.shift();
			if (method.name && this[method.name]) {
				this[method.name].apply(this, method.params);
			} else {
				throw new Error("Method not found: " + method.name);
			}
		}
	};

	Window_BattleLog.prototype.displayActionResults = function(subject, target) {
		if (target.result().used) {
			this.displayCritical(target);
			this.popupDamage(target);
			this.popupDamage(subject);
			this.displayDamage(target);
			this.displayAffectedStatus(target);
			this.displayFailure(target);
		}
	};


	//-------------------------------------------------------------------------------------------------
	// Spriteset_Battle
	//-------------------------------------------------------------------------------------------------
	//対象のSubjectが移動中か確かめる
	Spriteset_Battle.prototype.isSubjectMoving = function(subject) {
		//subjectに該当するメンバーを探す
		const members = this.battlerSprites();
		let subjectSprite;
		let targetI = -1;
		for (let i = 0; i < members.length; i++) {
			if(members[i].checkBattler(subject)){
				targetI = i;
				subjectSprite = members[i];
				break;
			}
		}
		if(targetI == -1){
			throw new Error("Realtimebattle: isSubjectMoving");
		}

		//対象のスプライトが動いているかをチェック
		return subjectSprite.isMoving();
	};

	const _Spriteset_Base_prototype_createAnimation = Spriteset_Base.prototype.createAnimation;
	Spriteset_Base.prototype.createAnimation = function(request) {
		//現在のアニメーションスプライト数を記憶
		const currentAnimLength = this._animationSprites.length;

		_Spriteset_Base_prototype_createAnimation.apply(this,arguments);

		//増加した分だけ対象アクションに追加
		if(request.actionAnim){
			for(let i = currentAnimLength; i < this._animationSprites.length; i++){
				request.actionAnim.animList.push(this._animationSprites[i]);
			}
		}
	};


	//-------------------------------------------------------------------------------------------------
	// Sprite animation
	//-------------------------------------------------------------------------------------------------
	Sprite_Animation.prototype.isAnimationPlaying = function() {
		return this.isPlaying();
	};


	//-------------------------------------------------------------------------------------------------
	// Game temp
	//-------------------------------------------------------------------------------------------------
	const _Game_Temp_prototype_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_prototype_initialize.apply(this,arguments);
		this._tempActionAnim = null;
	};
	

	const _Game_Temp_prototype_requestAnimation = Game_Temp.prototype.requestAnimation;
	Game_Temp.prototype.requestAnimation = function(
		targets, animationId, mirror = false
	) {
		_Game_Temp_prototype_requestAnimation.apply(this,arguments);
		if ($dataAnimations[animationId]) {
			this._animationQueue[this._animationQueue.length - 1].actionAnim = this._tempActionAnim;		// 現在読み込み中のActionを追加
		}
	};



})();