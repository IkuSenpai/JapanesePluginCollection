//=============================================================================
// RPG Maker MZ - AutorunCommonEvent
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Automatically execute common events.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_AutorunCommonEvent.js(ver1.0.1)
 *
 * Automatically execute common events in some situations such as new games and battle tests.
 *
 * You can use it to temporarily set variables and switches for testing.
 * In this case, please check the contents of the common event carefully at the time of game release.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param newGameCommonEvent
 * @text New game
 * @type common_event
 * @desc Specifies the common event to be executed at the start of the new game.
 * @default 0
 *
 * @param continueCommonEvent
 * @text Continue
 * @type common_event
 * @desc Specifies the common event to be executed when continuing.
 * @default 0
 *
 * @param battleTestCommonEvent
 * @text BattleTest
 * @type common_event
 * @desc Execute immediately after the battle test start message.
 * @default 0
 *
 * @param mapStartCommonEvent
 * @text Map start
 * @type common_event
 * @desc Execute after the map starts. It will also be executed when you return from the menu or battle.
 * @default 0
 *
 * @param mapChangeCommonEvent
 * @text After moving the map
 * @type common_event
 * @desc After moving the map.
 * @default 0
 *
 * @param battleStartCommonEvent
 * @text Battle start
 * @type common_event
 * @desc Execute immediately after the battle start message.
 * @default 0
 *
 * @param battleVictoryCommonEvent
 * @text Battle victory
 * @type common_event
 * @desc Execute just before the battle victory message.
 * @default 0
 *
 * @param battleDefeatCommonEvent
 * @text Battle defeat
 * @type common_event
 * @desc Execute just before the battle defeat message.
 * @default 0
 *
 * @param battleEscapeSuccessCommonEvent
 * @text Battole Escape: Success
 * @type common_event
 * @desc Execute just after the battle escape message.
 * @default 0
 *
 * @param battleEscapeFailureCommonEvent
 * @text Battole Escape: Failure
 * @type common_event
 * @desc Execute just after the battle escape message.
 * @default 0
 *
 * @param battleEndMapCommonEvent
 * @text  Map display after the battle
 * @type common_event
 * @desc Register at the end of the battle, execute at the start of the map scene.
 * @default 0
 *
 */

/*:ja
 * @target MZ
 * @plugindesc コモンイベントを自動実行します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_AutorunCommonEvent.js(ver1.0.1)
 *
 * ニューゲームや戦闘テストなど、
 * いくつかの場面でコモンイベントを自動実行します。
 *
 * テスト用に変数やスイッチを仮設定する使い方ができます。
 * この場合、リリース時にコモンイベントの内容をよくチェックしてください。
 *
 *  ■「マップ開始」について
 * 「マップ開始」のコモンイベントは次のタイミングで実行されます。
 *  ・マップ移動後のマップ表示
 *  ・ニューゲーム後のマップ表示
 *  ・コンティニュー後のマップ表示
 *  ・メニューから戻ってきた時
 *  ・バトルから戻ってきた時
 *
 *  ■「戦闘逃走成功」について
 *  ・逃走時コモンイベントは戦闘終了前に実行されます。
 *  ・戦闘終了後のマップで逃走時の処理を作りたい時は次のようにします。
 *
 *  ○シンボルエンカウント：
 *    戦闘イベントで「逃走可」にすると、逃走時の処理を手動で作れます。
 *
 *  ○ランダムエンカウント：
 *  ・「戦闘開始」コモンイベントで逃走回数を変数Ａに保存します。
 *    （変数の操作 > 代入 > ゲームデータ > その他 > 逃走回数）
 *  ・「戦闘終了後のマップ表示」コモンイベントにて、
 *    逃走回数を変数Ｂに取得し、変数Ａと変数Ｂを条件分岐で比較します。
 *    値が異なる場合の処理が、逃走した場合の処理です。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param newGameCommonEvent
 * @text ニューゲーム用
 * @type common_event
 * @desc ニューゲーム時に実行するコモンイベントを設定します。
 * @default 0
 *
 * @param continueCommonEvent
 * @text コンティニュー用
 * @type common_event
 * @desc コンティニュー時に実行するコモンイベントを設定します。
 * @default 0
 *
 * @param battleTestCommonEvent
 * @text 戦闘テスト
 * @type common_event
 * @desc 戦闘テスト開始時に登録、戦闘開始メッセージ直後に実行します。
 * @default 0
 *
 * @param mapStartCommonEvent
 * @text マップ開始
 * @type common_event
 * @desc マップ開始後に登録・実行します。  ※メニューや戦闘から戻った時も実行されます。
 * @default 0
 *
 * @param mapChangeCommonEvent
 * @text マップ移動後
 * @type common_event
 * @desc マップ移動後に登録・実行します。
 * @default 0
 *
 * @param battleStartCommonEvent
 * @text 戦闘開始
 * @type common_event
 * @desc 戦闘開始時に登録、戦闘開始メッセージ直後に実行します。  ※戦闘テストでは無視されます。
 * @default 0
 *
 * @param battleVictoryCommonEvent
 * @text 戦闘勝利
 * @type common_event
 * @desc 戦闘勝利メッセージ直前に登録・実行します。
 * @default 0
 *
 * @param battleDefeatCommonEvent
 * @text 戦闘敗北
 * @type common_event
 * @desc 戦闘敗北メッセージ直前に登録・実行します。
 * @default 0
 *
 * @param battleEscapeSuccessCommonEvent
 * @text 戦闘逃走成功
 * @type common_event
 * @desc 戦闘逃走成功メッセージ直後に登録・実行します。
 * @default 0
 *
 * @param battleEscapeFailureCommonEvent
 * @text 戦闘逃走失敗
 * @type common_event
 * @desc 戦闘逃走失敗メッセージ直後に登録・実行します。
 * @default 0
 *
 * @param battleEndMapCommonEvent
 * @text 戦闘終了後のマップ表示
 * @type common_event
 * @desc 戦闘終了時に登録、マップシーン開始時に実行します。
 * @default 0
 *
 */

(() => {
	"use strict";
    const pluginName = "GABA_AutorunCommonEvent";

	const parameters = PluginManager.parameters(pluginName);
	const newGameCommonEvent = Number(parameters["newGameCommonEvent"]) || 0;
	const mapStartCommonEvent = Number(parameters["mapStartCommonEvent"]) || 0;
	const mapChangeCommonEvent = Number(parameters["mapChangeCommonEvent"]) || 0;
	const battleTestCommonEvent = Number(parameters["battleTestCommonEvent"]) || 0;
	const battleStartCommonEvent = Number(parameters["battleStartCommonEvent"]) || 0;
	const battleVictoryCommonEvent = Number(parameters["battleVictoryCommonEvent"]) || 0;
	const battleDefeatCommonEvent = Number(parameters["battleDefeatCommonEvent"]) || 0;
	const battleEscapeSuccessCommonEvent = Number(parameters["battleEscapeSuccessCommonEvent"]) || 0;
	const battleEscapeFailureCommonEvent = Number(parameters["battleEscapeFailureCommonEvent"]) || 0;
	const battleEndMapCommonEvent = Number(parameters["battleEndMapCommonEvent"]) || 0;
	const continueCommonEvent = Number(parameters["continueCommonEvent"]) || 0;
	let isNewGame_Continue = false;

	// ニューゲーム
	const _DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function() {
		_DataManager_setupNewGame.apply(this, arguments);
		SCE_ReserveCommonEvent(newGameCommonEvent);
		isNewGame_Continue = true;
	};

	// マップスタート
	const _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function() {
		_Scene_Map_start.apply(this, arguments);
		SCE_ReserveCommonEvent(mapStartCommonEvent);
	};

	// 移動直後
	// コンティニューでも通るが、セーブ後タイトルに戻りロードした場合は通らない。
	// 混乱しそうなのでニューゲーム・コンティニューでは実行しない。
	const _Scene_Map_onTransferEnd = Scene_Map.prototype.onTransferEnd;
	Scene_Map.prototype.onTransferEnd = function() {
		if (!isNewGame_Continue) {
			SCE_ReserveCommonEvent(mapChangeCommonEvent);
		}
		isNewGame_Continue = false;

		_Scene_Map_onTransferEnd.apply(this, arguments);
	};

	// 戦闘関連の調整
	const _BattleManager_initMembers = BattleManager.initMembers;
	BattleManager.initMembers = function() {
		_BattleManager_initMembers.apply(this, arguments);
		this._gabaBattleEndCommonExecuted = false;
		this._gabaBattleEscapeCommonExecuted = false;
	}

	// 戦闘開始
	const _BattleManager_startBattle = BattleManager.startBattle;
	BattleManager.startBattle = function() {
		this._gabaBattleEndCommonExecuted = false;
		this._gabaBattleEscapeCommonExecuted = false;
		if (DataManager.isBattleTest()) {
			SCE_ReserveCommonEvent(battleTestCommonEvent);
		} else {
			SCE_ReserveCommonEvent(battleStartCommonEvent);
		}
		_BattleManager_startBattle.apply(this, arguments);
	};

	// 戦闘終了
	const _BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
	BattleManager.checkBattleEnd = function() {
		if (SCE_ReserveCommonEventBattleEnd()) {
			return false;
		}

		return _BattleManager_checkBattleEnd.apply(this, arguments);
	};

	// 戦闘終了後のマップ
	const _BattleManager_endBattle = BattleManager.endBattle;
	BattleManager.endBattle = function(result) {
		SCE_ReserveCommonEvent(battleEndMapCommonEvent);
		_BattleManager_endBattle.apply(this, arguments);
	};

	// コンティニュー
	const _Scene_Load_onLoadSuccess  = Scene_Load.prototype.onLoadSuccess;
	Scene_Load.prototype.onLoadSuccess = function() {
		SCE_ReserveCommonEvent(continueCommonEvent);
		isNewGame_Continue = true;
		_Scene_Load_onLoadSuccess.apply(this, arguments);
	};

	// コモンイベントの実行
	function SCE_ReserveCommonEvent(eventId) {
		if (eventId === 0) {
			return;
		}
		$gameTemp.reserveCommonEvent(eventId);
	}
	// コモンイベントの実行：戦闘終了時など、コモンイベントのキュー先頭に割り込ませて一件処理させる
	// メモ：コアスクリプトv1.3.2時点：戦闘終了時にコモンイベントが残っていると、マップに戻ってから処理されます。
	//       マップに戻る前にコモンイベントをすべて処理させたければGABA_BattleEndCEFinisher.jsを導入してください。
	function SCE_ReserveCommonEventFirst(eventId) {
		$gameTemp._commonEventQueue.unshift(eventId);
	}

	// 戦闘終了イベントの実行。実行する場合はtrueを返す。
	function SCE_ReserveCommonEventBattleEnd() {
		//逃走成功時
		if (BattleManager._escaped) {
			if (!BattleManager._gabaBattleEscapeCommonExecuted) {
				SCE_ReserveCommonEvent(battleEscapeSuccessCommonEvent);
				BattleManager._gabaBattleEscapeCommonExecuted = true;
			} else {
				BattleManager._phase = "aborting";
			}
		}

		if (BattleManager._gabaBattleEndCommonExecuted) {
			return false;
		}

		if (BattleManager._phase) {

			if ($gameParty.isAllDead()) {
				if (battleDefeatCommonEvent !== 0) {
					SCE_ReserveCommonEventFirst(battleDefeatCommonEvent);
					BattleManager._gabaBattleEndCommonExecuted = true;
					return true;
				}
			} else if ($gameTroop.isAllDead()) {
				if (battleVictoryCommonEvent !== 0) {
					SCE_ReserveCommonEventFirst(battleVictoryCommonEvent);
					BattleManager._gabaBattleEndCommonExecuted = true;
					return true;
				}
			}
		}

		return false;
	}

	// 戦闘逃走成功
	const _BattleManager_onEscapeSuccess = BattleManager.onEscapeSuccess;
	BattleManager.onEscapeSuccess = function() {
		if (battleEscapeSuccessCommonEvent !== 0){
			this.displayEscapeSuccessMessage();
			this._escaped = true;
			if (!this.isTpb()) {
				this.startTurn();
			}
			return;
		}

		_BattleManager_onEscapeSuccess.apply(this, arguments);
	};

	// 戦闘逃走失敗
	const _BattleManager_onEscapeFailure = BattleManager.onEscapeFailure;
	BattleManager.onEscapeFailure = function() {
		SCE_ReserveCommonEvent(battleEscapeFailureCommonEvent);
		_BattleManager_onEscapeFailure.apply(this, arguments);
	};

})();
