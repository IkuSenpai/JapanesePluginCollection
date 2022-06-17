//=============================================================================
// RPG Maker MZ - AnimationInvokeChange
// 2021-2022 Huuzin
//
// ver 1.0.4	Release data: 2022/04/24
//				MV形式のアニメーションでダメージ表記タイミングを指定できない問題の修正
// ver 1.0.3	Release data: 2022/04/23
//				MV形式のアニメーションをしようとするとフリーズするバグを修正
// ver 1.0.2	Release data: 2021/01/01
//				Real Time Battleプラグインとの関係変更に伴う修正
// ver 1.0.1	Release data: 2020/10/18
//				味方全体を対象としたスキルを発動するとき、アニメーションが味方の動きによって移動することがなくなりました。
// ver 1.0.0	Release data: 2020/10/11
//				初版公開
// 
// https://huuzin.net
// 
//=============================================================================

/*:
* @target MZ
* @plugindesc アニメーションのダメージ適用タイミングを個別に調整します
* @author Huuzin
* @url https://huuzin.net/2020/10/11/animationinvokechange/
* @orderAfter ZinRealTimeBattle
*
* @help
* アニメーションのダメージ適用タイミングを個別に調整します。
* アニメーションが終了してからダメージ表示されていたのが、例えば斬撃があたる瞬
* 間にダメージ表示できるようになります。
*
*
* ---使用方法---
* 1. アニメーションに設定された最後のフラッシュタイミングでダメージが表示される
* ようになります。
* 2. アニメーション終了カラーと同じ色を指定すると(デフォルトでピンク[255,0,255])
* そのタイミングでダメージ表示させることもできます。


* @param invokeColorRed
* @text アニメーション終了色(R)
* @desc アニメーション終了を指定するフラッシュカラー(赤)
* @default 255
* @type number
* @max 255
* @min 0

* @param invokeColorGreen
* @text アニメーション終了色(G)
* @desc アニメーション終了を指定するフラッシュカラー(緑)
* @default 0
* @type number
* @max 255
* @min 0

* @param invokeColorBlue
* @text アニメーション終了色(B)
* @desc アニメーション終了を指定するフラッシュカラー(青)
* @default 255
* @type number
* @max 255
* @min 0

* @param textSkip
* @text ダメージテキストスキップ
* @desc ダメージやステート表記がスキップされます。ONにすると戦闘テンポが改善されますが競合が発生する可能性があります。
* @default false
* @type boolean

*
*/

(() => {
	'use strict';

	//-------------------------------------------------------------------------------------------------
	//	Plugin command
	//-------------------------------------------------------------------------------------------------


	//-------------------------------------------------------------------------------------------------
    // Static class
    //-------------------------------------------------------------------------------------------------
	function ZinAnimInvokeChange() {
		throw new Error('This is a static class');
	}

	ZinAnimInvokeChange.initialize = function() {
		this._invokeColor = [0,0,0];
		this._invokeColor[0] = Number(PluginManager.parameters('ZinAnimationInvokeChange')['invokeColorRed']);
		this._invokeColor[1] = Number(PluginManager.parameters('ZinAnimationInvokeChange')['invokeColorGreen']);
		this._invokeColor[2] = Number(PluginManager.parameters('ZinAnimationInvokeChange')['invokeColorBlue']);

		if(PluginManager.parameters('ZinAnimationInvokeChange')['textSkip'] == 'true'){
			this._textSkip = true;
		}else{
			this._textSkip = false;
		}
	}

	const Scene_Boot_prototype_initialize = Scene_Boot.prototype.initialize;
	Scene_Boot.prototype.initialize = function() {
		Scene_Boot_prototype_initialize.apply(this,arguments);
		ZinAnimInvokeChange.initialize();
	};

	//-------------------------------------------------------------------------------------------------
    // Sprite_Animation
	//-------------------------------------------------------------------------------------------------
	const Sprite_Animation_prototype_initMembers = Sprite_Animation.prototype.initMembers;
	Sprite_Animation.prototype.initMembers = function() {
		Sprite_Animation_prototype_initMembers.apply(this,arguments);
		this._zinInvokeTiming = 100000;
		this._zinInitPos = null;
	}

	const Sprite_Animation_prototype_setup = Sprite_Animation.prototype.setup;
	Sprite_Animation.prototype.setup = function(
		targets, animation, mirror, delay, previous
	) {
		Sprite_Animation_prototype_setup.apply(this,arguments);
		if (this._animation.displayType !== 2 && this._targets.length > 1) {
			this._zinInitPos = new Point();
			for (const target of this._targets) {
				const tpos = this.targetSpritePosition(target);
				this._zinInitPos.x += tpos.x;
				this._zinInitPos.y += tpos.y;
			}
			this._zinInitPos.x /= this._targets.length;
			this._zinInitPos.y /= this._targets.length;
		}

		let maximumFlame = 0;
		for(const timing of this._animation.flashTimings){
			if(timing.color[0] == ZinAnimInvokeChange._invokeColor[0] && timing.color[1] == ZinAnimInvokeChange._invokeColor[1] && timing.color[2] == ZinAnimInvokeChange._invokeColor[2]){
				this._zinInvokeTiming = timing.frame;
				return;
			}else{
				if(maximumFlame < timing.frame) maximumFlame = timing.frame;
			}
		}
		this._zinInvokeTiming = maximumFlame;
	}

	Sprite_Animation.prototype.isAnimationPlaying = function() {
		return this._frameIndex < this._zinInvokeTiming;
	}

	const Sprite_Animation_prototype_targetPosition = Sprite_Animation.prototype.targetPosition;
	Sprite_Animation.prototype.targetPosition = function(renderer) {
		let pos = Sprite_Animation_prototype_targetPosition.apply(this,arguments);

		if (this._animation.displayType !== 2 && this._targets.length > 1) {
			return this._zinInitPos;
		}
		return pos;
	};
	
	//-------------------------------------------------------------------------------------------------
    // Sprite_Animation MV
	//-------------------------------------------------------------------------------------------------
	const Sprite_AnimationMV_prototype_initMembers = Sprite_AnimationMV.prototype.initMembers;
	Sprite_AnimationMV.prototype.initMembers = function() {
		Sprite_AnimationMV_prototype_initMembers.apply(this,arguments);
		this._zinInvokeTiming = 100000;
		this._zinInitPos = null;
	}
	
	const _Sprite_AnimationMV_prototype_setup = Sprite_AnimationMV.prototype.setup;
	Sprite_AnimationMV.prototype.setup = function(
    targets, animation, mirror, delay
	) {
		_Sprite_AnimationMV_prototype_setup.apply(this,arguments);
		
		let maximumFlame = 0;
		for(const timing of this._animation.timings){
			if(timing.flashColor[0] == ZinAnimInvokeChange._invokeColor[0] && timing.flashColor[1] == ZinAnimInvokeChange._invokeColor[1] && timing.flashColor[2] == ZinAnimInvokeChange._invokeColor[2]){
				this._zinInvokeTiming = timing.frame;
				return;
			}else{
				if(maximumFlame < timing.frame) maximumFlame = timing.frame;
			}
		}
		this._zinInvokeTiming = maximumFlame;
		
		
	};
	
	Sprite_AnimationMV.prototype.isAnimationPlaying = function() {
		return this.currentFrameIndex() < this._zinInvokeTiming;
	};

	//-------------------------------------------------------------------------------------------------
    // Spriteset_Base
	//-------------------------------------------------------------------------------------------------
	const Spriteset_Base_prototype_isAnimationPlaying = Spriteset_Base.prototype.isAnimationPlaying;
	Spriteset_Base.prototype.isAnimationPlaying = function() {
		let result = Spriteset_Base_prototype_isAnimationPlaying.apply(this,arguments);
		if(!result) return false;
		for(const sp of this._animationSprites){
			if(sp.isAnimationPlaying()) return true;
		}
		return false;
	};

	const Window_BattleLog_prototype_displayAction = Window_BattleLog.prototype.displayAction;
	Window_BattleLog.prototype.displayAction = function(subject, item) {
		Window_BattleLog_prototype_displayAction.apply(this,arguments);
		if(ZinAnimInvokeChange._textSkip && this._methods.length > 0 && this._methods[this._methods.length-1].name == 'wait'){
			this._methods.pop();
		}
	};

	const Window_BattleLog_prototype_displayActionResults = Window_BattleLog.prototype.displayActionResults;
	Window_BattleLog.prototype.displayActionResults = function(subject, target) {
		if(ZinAnimInvokeChange._textSkip){
			if (target.result().used) {
				//this.push("pushBaseLine");
				this.displayCritical(target);
				this.push("popupDamage", target);
				this.push("popupDamage", subject);
				this.displayDamage(target);
				this.displayAffectedStatus(target);
				this.displayFailure(target);
				//this.push("waitForNewLine");
				//this.push("popBaseLine");
			}
		}else{
			Window_BattleLog_prototype_displayActionResults.apply(this,arguments);
		}		
	};

	const Window_BattleLog_prototype_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
	Window_BattleLog.prototype.displayHpDamage = function(target) {
		Window_BattleLog_prototype_displayHpDamage.apply(this,arguments);
		if (ZinAnimInvokeChange._textSkip && target.result().hpAffected && this._methods.length > 0 && this._methods[this._methods.length-1].name == "addText") {
			this._methods.pop();
		}
	};

	const Window_BattleLog_prototype_displayMpDamage = Window_BattleLog.prototype.displayMpDamage;
	Window_BattleLog.prototype.displayMpDamage = function(target) {
		Window_BattleLog_prototype_displayMpDamage.apply(this,arguments);
		if (ZinAnimInvokeChange._textSkip && target.isAlive() && target.result().mpDamage !== 0 && this._methods.length > 0 && this._methods[this._methods.length-1].name == "addText") {
			this._methods.pop();
		}
	};
	
	const Window_BattleLog_prototype_displayTpDamage = Window_BattleLog.prototype.displayTpDamage;
	Window_BattleLog.prototype.displayTpDamage = function(target) {
		Window_BattleLog_prototype_displayTpDamage.apply(this,arguments);
		if (ZinAnimInvokeChange._textSkip && target.isAlive() && target.result().tpDamage !== 0 && this._methods.length > 0 && this._methods[this._methods.length-1].name == "addText") {
			this._methods.pop();
		}
	};

	const Window_BattleLog_prototype_displayMiss = Window_BattleLog.prototype.displayMiss;
	Window_BattleLog.prototype.displayMiss = function(target) {
		Window_BattleLog_prototype_displayMiss.apply(this,arguments);
		if (ZinAnimInvokeChange._textSkip && this._methods.length > 0 && this._methods[this._methods.length-1].name == "addText") {
			this._methods.pop();
		}
	};
	
	const Window_BattleLog_prototype_displayEvasion = Window_BattleLog.prototype.displayEvasion;
	Window_BattleLog.prototype.displayEvasion = function(target) {
		Window_BattleLog_prototype_displayEvasion.apply(this,arguments);
		if (ZinAnimInvokeChange._textSkip && this._methods.length > 0 && this._methods[this._methods.length-1].name == "addText") {
			this._methods.pop();
		}
	};

	const Window_BattleLog_prototype_displayCritical = Window_BattleLog.prototype.displayCritical;
	Window_BattleLog.prototype.displayCritical = function(target) {
		Window_BattleLog_prototype_displayCritical.apply(this,arguments);
		if (ZinAnimInvokeChange._textSkip && this._methods.length > 0 && this._methods[this._methods.length-1].name == "addText") {
			this._methods.pop();
		}
	};

	const Window_BattleLog_prototype_displayAddedStates = Window_BattleLog.prototype.displayAddedStates;
	Window_BattleLog.prototype.displayAddedStates = function(target) {
		if(ZinAnimInvokeChange._textSkip){
			const result = target.result();
			const states = result.addedStateObjects();
			for (const state of states) {
				const stateText = target.isActor() ? state.message1 : state.message2;
				if (state.id === target.deathStateId()) {
					this.push("performCollapse", target);
				}
				if (stateText) {
					//this.push("popBaseLine");
					//this.push("pushBaseLine");
					//this.push("addText", stateText.format(target.name()));
					//this.push("waitForEffect");
				}
			}
		}else{
			Window_BattleLog_prototype_displayAddedStates.apply(this,arguments);
		}
	};
	
	const Window_BattleLog_prototype_displayRemovedStates = Window_BattleLog.prototype.displayRemovedStates;
	Window_BattleLog.prototype.displayRemovedStates = function(target) {
		if(ZinAnimInvokeChange._textSkip){
			const result = target.result();
			const states = result.removedStateObjects();
			for (const state of states) {
				if (state.message4) {
					//this.push("popBaseLine");
					//this.push("pushBaseLine");
					//this.push("addText", state.message4.format(target.name()));
				}
			}
		}else{
			Window_BattleLog_prototype_displayRemovedStates.apply(this,arguments);
		}
	};

	const Window_BattleLog_prototype_displayBuffs = Window_BattleLog.prototype.displayBuffs;
	Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
		if(ZinAnimInvokeChange._textSkip){
			for (const paramId of buffs) {
				const text = fmt.format(target.name(), TextManager.param(paramId));
				//this.push("popBaseLine");
				//this.push("pushBaseLine");
				//this.push("addText", text);
			}
		}else{
			Window_BattleLog_prototype_displayBuffs.apply(this,arguments);
		}
	};

	

})();