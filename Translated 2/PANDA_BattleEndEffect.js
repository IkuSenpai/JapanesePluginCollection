//=============================================================================
// PANDA_BattleEndEffect.js
//=============================================================================
// [Update History]
// 2020-11-28 Ver.1.0.0 First Release for MZ.
// 2021-01-17 Ver.1.0.1 Revised BattleManager.resetFadeOut and Scene_Map.start.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MZ
 * @plugindesc special processing at the end of battle.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201128023506.html
 * 
 * @help [How to Use]
 * Add a Plugin Command to do special processing when the battle finished.
 * 
 * # Battle End Effect
 * This should be placed in the battle event of the troop.
 * It would be placed on the 0th turn (at the beginning of the battle).
 * - Switch Victory : Specify the switch number to turn on when you win the battle.
 * - Switch Escape  : Specify the switch number to turn on when you escape from the battle.
 * - Switch Abort   : Specify the switch number to turn on when you abort the battle.
 * - Switch Lose    : Specify the switch number to turn on when you lose the battle.
 * - When Victory : Specify whether to do the following effects when you win the battle.
 * - When Escape  : Specify whether to do the following effects when you escape from the battle.
 * - When Lose    : Specify whether to do the following effects when you lose the battle.
 * - Fade Out : At the end of the battle, fade out the screen before returing to the map.
 * - Stop BGM : At the end of the battle, stop the previous BGM without continuing.
 * - Stop BGS : At the end of the battle, stop the previous BGS without continuing.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @command BATTLE_END_EFFECT
 * @text Battle End Effect
 * @desc Place this in a battle event, and activate the specified effects when this battle is over.
 * 
 * @arg switchVictory
 * @text Switch Victory
 * @desc Specify the switch number to turn on when you win the battle.
 * @type switch
 * @default 0
 * 
 * @arg switchEscape
 * @text Switch Escape
 * @desc Specify the switch number to turn on when you escape from the battle.
 * @type switch
 * @default 0
 * 
 * @arg switchAbort
 * @text Switch Abort
 * @desc Specify the switch number to turn on when you abort the battle.
 * @type switch
 * @default 0
 * 
 * @arg switchLose
 * @text Switch Lose
 * @desc Specify the switch number to turn on when you lose the battle.
 * @type switch
 * @default 0
 * 
 * @arg whenVictory
 * @text When Victory
 * @desc Specify whether to do the following effects when you win the battle.
 * @type boolean
 * @default true
 * 
 * @arg whenEscape
 * @text When Escape
 * @desc Specify whether to do the following effects when you escape from the battle.
 * @type boolean
 * @default false
 * 
 * @arg whenLose
 * @text When Lose
 * @desc Specify whether to do the following effects when you lose the battle.
 * @type boolean
 * @default false
 * 
 * @arg fadeOut
 * @text Fade Out
 * @desc At the end of the battle, fade out the screen before returing to the map.
 * @type boolean
 * @default false
 * 
 * @arg stopBgm
 * @text Stop BGM
 * @desc At the end of the battle, stop the previous BGM without continuing.
 * @type boolean
 * @default false
 * 
 * @arg stopBgs
 * @text Stop BGS
 * @desc At the end of the battle, stop the previous BGS without continuing.
 * @type boolean
 * @default false
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘終了時に特殊処理を行うプラグインです。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201128023506.html
 * 
 * @help ■ 使い方
 * 敵グループのバトルイベントに設置し、
 * その戦闘が終了した際に特殊処理を行うプラグインコマンドを追加します。
 * 
 * ◆ 戦闘終了時処理
 * 敵グループのバトルイベントに設置します。
 * 0ターン目（戦闘開始時）に設置するのがよいでしょう。
 * - 勝利時ONスイッチ：戦闘勝利時、ONにするスイッチ番号を指定します。
 * - 逃亡時ONスイッチ：戦闘逃亡時、ONにするスイッチ番号を指定します。
 * - 中断時ONスイッチ：戦闘中断時、ONにするスイッチ番号を指定します。
 * - 敗北時ONスイッチ：戦闘敗北時、ONにするスイッチ番号を指定します。
 * - 勝利時発動：以下の効果を戦闘勝利時に発動させるかどうかを指定します。
 * - 逃亡時発動：以下の効果を戦闘逃亡・中断時に発動させるかどうかを指定します。
 * - 敗北時発動：以下の効果を戦闘敗北時に発動させるかどうかを指定します。
 * - 戦闘終了時フェードアウト：マップに戻る前に画面をフェードアウトさせます。
 * - 戦闘終了時BGM停止：戦闘終了時、以前のBGMを継続せずに停止させます。
 * - 戦闘終了時BGS停止：戦闘終了時、以前のBGSを継続せずに停止させます。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @command BATTLE_END_EFFECT
 * @text 戦闘終了時処理
 * @desc バトルイベントに設置し、この戦闘が終了した際に指定した効果を発動させます。
 * 
 * @arg switchVictory
 * @text 勝利時ONスイッチ
 * @desc 戦闘勝利時、ONにするスイッチ番号を指定します。
 * @type switch
 * @default 0
 * 
 * @arg switchEscape
 * @text 逃亡時ONスイッチ
 * @desc 戦闘逃亡時、ONにするスイッチ番号を指定します。
 * @type switch
 * @default 0
 * 
 * @arg switchAbort
 * @text 中断時ONスイッチ
 * @desc 戦闘中断時、ONにするスイッチ番号を指定します。
 * @type switch
 * @default 0
 * 
 * @arg switchLose
 * @text 敗北時ONスイッチ
 * @desc 戦闘敗北時、ONにするスイッチ番号を指定します。
 * @type switch
 * @default 0
 * 
 * @arg whenVictory
 * @text 勝利時発動
 * @desc 以下の効果を戦闘勝利時に発動させるかどうかを指定します。
 * @type boolean
 * @default true
 * 
 * @arg whenEscape
 * @text 逃亡時発動
 * @desc 以下の効果を戦闘逃亡・中断時に発動させるかどうかを指定します。
 * @type boolean
 * @default false
 * 
 * @arg whenLose
 * @text 敗北時発動
 * @desc 以下の効果を戦闘敗北時に発動させるかどうかを指定します。
 * @type boolean
 * @default false
 * 
 * @arg fadeOut
 * @text 戦闘終了時フェードアウト
 * @desc 戦闘終了時、マップに戻る前に画面をフェードアウトさせます。
 * @type boolean
 * @default false
 * 
 * @arg stopBgm
 * @text 戦闘終了時BGM停止
 * @desc 戦闘終了時、以前のBGMを継続せずに停止させます。
 * @type boolean
 * @default false
 * 
 * @arg stopBgs
 * @text 戦闘終了時BGS停止
 * @desc 戦闘終了時、以前のBGSを継続せずに停止させます。
 * @type boolean
 * @default false
 * 
 */

/*:ko
 * @target MZ
 * @plugindesc 배틀 종료시에 특별한 처리를 실시합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201128023506.html
 * 
 * @help [사용법]
 * 적 그룹의 배틀 이벤트에 설치하여,
 * 그 전투가 끝날 때 특별한 처리를 실시하는 플러그인 명령이 추가됩니다.
 * 
 * * 배틀 종료시 처리
 * 적 그룹의 배틀 이벤트에 설치합니다.
 * 0턴(배틀 개시시)에 설치해 주십시오.
 * - 승리시 ON 스위치 : 배틀 승리시, ON으로 할 스위치 번호를 지정합니다.
 * - 도망시 ON 스위치 : 배틀 도망시, ON으로 할 스위치 번호를 지정합니다.
 * - 중단시 ON 스위치 : 배틀 중단시, ON으로 할 스위치 번호를 지정합니다.
 * - 패배시 ON 스위치 : 배틀 패배시, ON으로 할 스위치 번호를 지정합니다.
 * - 승리시 발동 : 다음 효과를 배틀 승리시에 발동시킬지 지정합니다.
 * - 도망시 발동 : 다음 효과를 배틀 도망시에 발동시킬지 지정합니다.
 * - 패배시 발동 : 다음 효과를 배틀 패배시에 발동시킬지 지정합니다.
 * - 배틀 종료시 페이드 아웃 : 맵으로 돌아가기 전에 화면을 페이드 아웃시킵니다.
 * - 배틀 종료시 BGM 정지 : 배틀 종료시, 이전의 BGM을 계속 안하고 정지시킵니다.
 * - 배틀 종료시 BGS 정지 : 배틀 종료시, 이전의 BGS를 계속 안하고 정지시킵니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @command BATTLE_END_EFFECT
 * @text 배틀 종료시 처리
 * @desc 배틀 이벤트에 설치하여, 이 전투가 끝날 때 지정한 효과를 발동시킵니다.
 * 
 * @arg switchVictory
 * @text 승리시 ON 스위치
 * @desc 배틀 승리시, ON으로 할 스위치 번호를 지정합니다.
 * @type switch
 * @default 0
 * 
 * @arg switchEscape
 * @text 도망시 ON 스위치
 * @desc 배틀 도망시, ON으로 할 스위치 번호를 지정합니다.
 * @type switch
 * @default 0
 * 
 * @arg switchAbort
 * @text 중단시 ON 스위치
 * @desc 배틀 중단시, ON으로 할 스위치 번호를 지정합니다.
 * @type switch
 * @default 0
 * 
 * @arg switchLose
 * @text 패배시 ON 스위치
 * @desc 배틀 패배시, ON으로 할 스위치 번호를 지정합니다.
 * @type switch
 * @default 0
 * 
 * @arg whenVictory
 * @text 승리시 발동
 * @desc 다음 효과를 배틀 승리시에 발동시킬지 지정합니다.
 * @type boolean
 * @default true
 * 
 * @arg whenEscape
 * @text 도망시 발동
 * @desc 다음 효과를 배틀 도망시에 발동시킬지 지정합니다.
 * @type boolean
 * @default false
 * 
 * @arg whenLose
 * @text 패배시 발동
 * @desc 다음 효과를 배틀 패배시에 발동시킬지 지정합니다.
 * @type boolean
 * @default false
 * 
 * @arg fadeOut
 * @text 배틀 종료시 페이드 아웃
 * @desc 배틀 종료시, 맵으로 돌아가기 전에 화면을 페이드 아웃시킵니다.
 * @type boolean
 * @default false
 * 
 * @arg stopBgm
 * @text 배틀 종료시 BGM 정지
 * @desc 배틀 종료시, 이전의 BGM을 계속하지 말고 정지시킵니다.
 * @type boolean
 * @default false
 * 
 * @arg stopBgs
 * @text 배틀 종료시 BGS 정지
 * @desc 배틀 종료시, 이전의 BGS를 계속하지 말고 정지시킵니다.
 * @type boolean
 * @default false
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	
	//--------------------------------------------------
	// Plugin Command "Battle End Effect"
	//--------------------------------------------------
	PluginManager.registerCommand(pluginName, 'BATTLE_END_EFFECT', function(args) {
		
		// get arguments
		const switchVictory = parseInt(args['switchVictory']) || 0;
		const switchEscape  = parseInt(args['switchEscape'])  || 0;
		const switchAbort   = parseInt(args['switchAbort'])   || 0;
		const switchLose    = parseInt(args['switchLose'])    || 0;
		const whenVictory = (args['whenVictory'] !== 'false');
		const whenEscape  = (args['whenEscape']  !== 'false');
		const whenLose    = (args['whenLose']    !== 'false');
		const fadeOut = (args['fadeOut'] !== 'false');
		const stopBgm = (args['stopBgm'] !== 'false');
		const stopBgs = (args['stopBgs'] !== 'false');
		
		// set parameters
		BattleManager._switchOn = [switchVictory, switchAbort, switchLose, switchEscape];
		BattleManager._fadeOut = [fadeOut && whenVictory, fadeOut && whenEscape, fadeOut && whenLose];
		BattleManager._stopBgm = [stopBgm && whenVictory, stopBgm && whenEscape, stopBgm && whenLose];
		BattleManager._stopBgs = [stopBgs && whenVictory, stopBgs && whenEscape, stopBgs && whenLose];
		
	});
	
	
	//--------------------------------------------------
	// BattleManager.initMembers
	//  [Additional Definition]
	//--------------------------------------------------
	const _BattleManager_initMembers = BattleManager.initMembers;
	BattleManager.initMembers = function() {
		_BattleManager_initMembers.call(this);
		this._switchOn = [0, 0, 0, 0];
		this._fadeOut = [false, false, false];
		this._stopBgm = [false, false, false];
		this._stopBgs = [false, false, false];
		this._needsFadeOut = false;
	};
	
	
	//--------------------------------------------------
	// BattleManager.needsFadeOut
	//  [Additional Definition]
	//--------------------------------------------------
	BattleManager.needsFadeOut = function() {
		return this._needsFadeOut;
	};
	
	
	//--------------------------------------------------
	// BattleManager.resetFadeOut
	//  [Additional Definition]
	//--------------------------------------------------
	BattleManager.resetFadeOut = function() {
		this._needsFadeOut = false;
	};
	
	
	//--------------------------------------------------
	// BattleManager.processVictory
	//  [Additional Definition]
	//--------------------------------------------------
	const _BattleManager_processVictory = BattleManager.processVictory;
	BattleManager.processVictory = function() {
		if (this._switchOn[0]) {
			$gameSwitches.setValue(this._switchOn[0], true);
		}
		this._needsFadeOut = this._fadeOut[0];
		if (this._stopBgm[0]) {
			this._mapBgm = null;
		}
		if (this._stopBgs[0]) {
			this._mapBgs = null;
		}
		_BattleManager_processVictory.call(this);
	};
	
	
	//--------------------------------------------------
	// BattleManager.processAbort
	//  [Additional Definition]
	//--------------------------------------------------
	const _BattleManager_processAbort = BattleManager.processAbort;
	BattleManager.processAbort = function() {
		if (this._escaped) {
			if (this._switchOn[3]) {
				$gameSwitches.setValue(this._switchOn[3], true);
			}
		} else {
			if (this._switchOn[1]) {
				$gameSwitches.setValue(this._switchOn[1], true);
			}
		}
		this._needsFadeOut = this._fadeOut[1];
		if (this._stopBgm[1]) {
			this._mapBgm = null;
		}
		if (this._stopBgs[1]) {
			this._mapBgs = null;
		}
		_BattleManager_processAbort.call(this);
	};
	
	
	//--------------------------------------------------
	// BattleManager.processDefeat
	//  [Additional Definition]
	//--------------------------------------------------
	const _BattleManager_processDefeat = BattleManager.processDefeat;
	BattleManager.processDefeat = function() {
		if (this._switchOn[2]) {
			$gameSwitches.setValue(this._switchOn[2], true);
		}
		this._needsFadeOut = this._fadeOut[2];
		if (this._stopBgm[2]) {
			this._mapBgm = null;
		}
		if (this._stopBgs[2]) {
			this._mapBgs = null;
		}
		_BattleManager_processDefeat.call(this);
	};
	
	
	//--------------------------------------------------
	// Scene_Map.start
	//  [Additional Definition]
	//--------------------------------------------------
	const _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		if (BattleManager.needsFadeOut()) {
			BattleManager.resetFadeOut();
			$gameScreen.startFadeOut(1);
		}
		_Scene_Map_start.call(this);
	};
	
})();

