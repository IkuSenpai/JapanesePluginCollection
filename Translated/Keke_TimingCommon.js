//=============================================================================
//  Keke_TimingCommon - タイミングコモン
// バージョン: 1.1.8
//=============================================================================
// Copyright (c) 2022 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 特定のタイミングでコモンを差し込む
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.1.8】
 * 特定のタイミングでコモンイベントを自動で差し込む
 * ◎ニューゲーム
 * ◎データロード
 * ◎場所移動
 * ◎メニュー
 * ◎バトル開始
 * ◎バトル勝利
 * ◎バトル逃走
 * ◎バトル敗北
 * ◎ゲームオーバー
 * ◎味方アクション
 * ◎敵アクション
 *
 *
 *
 * ◉ 使い方 ◉
 * プラグインパラメータで、各タイミングごとの実行コモンを設定する
 * ゲーム中に無効化/有効化したり、
 * 実行コモンを変更したい場合はプラグインコマンドで
 *
 * 【注釈】アクションコモン変数
 * アクションコモンは戦闘中、バトラーのアクション前後に実行するコモン
 * その際、特定の変数に行動者ID、スキルID、アイテムIDを自動で入れられる
 * 行動者IDには味方の場合はアクターIDが、敵の場合はエネミーIDが入る
 * 行動がスキルの場合はスキルIDが、アイテムの場合はアイテムIDが入る
 * 
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * @param コモン-ニューゲーム
 * @desc ニューゲーム時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-データロード
 * @desc データロード時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-場所移動-前
 * @desc 場所移動前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-場所移動-後
 * @desc 場所移動後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-メニュー開く
 * @desc メニューを開く時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-メニュー閉じ
 * @desc メニューを閉じる時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル開始-前
 * @desc バトル開始前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル開始-後
 * @desc バトル開始後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル勝利-前
 * @desc バトル勝利時の遷移前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル勝利-後
 * @desc バトル勝利時の遷移後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル逃走-前
 * @desc バトル逃走時の遷移前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル逃走-後
 * @desc バトル逃走時の遷移後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル敗北-前
 * @desc バトル敗北時の遷移前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-バトル敗北-後
 * @desc バトル敗北時の遷移後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @param コモン-ゲームオーバー
 * @desc ゲームオーバー時に実行するコモンイベント。全滅してゲームオーバーになった場合、回復しないとコモンを繰り返すので注意
 * @type common_event
 * @default 
 *
 * @param コモン-味方アクション-前
 * @desc 戦闘中、味方がスキル/アイテムを使う直前に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 * @param コモン-味方アクション-後
 * @desc 戦闘中、味方がスキル/アイテムを使った直後に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 * @param コモン-敵アクション-前
 * @desc 戦闘中、敵がスキル/アイテムを使う直前に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 * @param コモン-敵アクション-後
 * @desc 戦闘中、敵がスキル/アイテムを使った直後に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 * @param アクションコモン変数
 *
 * @param 変数-行動者ID
 * @parent アクションコモン変数
 * @desc アクションコモン時の行動者のIDを入れる変数。アクターならアクターID、エネミーならエネミーID
 * @type variable
 * @default 
 *
 * @param 変数-スキルID
 * @parent アクションコモン変数
 * @desc アクションコモン時の使用スキルのIDを入れる変数
 * @type variable
 * @default 
 *
 * @param 変数-アイテムID
 * @parent アクションコモン変数
 * @desc アクションコモン時の使用アイテムのIDを入れる変数
 * @type variable
 * @default
 *
 * @param 変数-対象が敵か味方か
 * @parent アクションコモン変数
 * @desc アクションコモン時の行動対象が敵か味方かを入れる変数。敵なら 0、味方なら 1
 * @type variable
 * @default 
 *
 * @param 変数-対象ID
 * @parent アクションコモン変数
 * @desc アクションコモン時の行動対象のID。アクターならアクターID、エネミーならエネミーID
 * @type variable
 * @default 
 *
  * @param 変数-対象全て
 * @parent アクションコモン変数
 * @desc アクションコモン時の行動対象全てのIDを配列として入れる変数
 * @type variable
 * @default 
 *
 *
 *
 * @command タイミングコモン有効/無効
 * @desc 各タイミングコモンを有効/無効を切り替える
 *
 * @arg コモン-ニューゲーム
 * @desc ニューゲーム時に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-データロード
 * @desc データロード時に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-場所移動-前
 * @desc 場所移動前に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-場所移動-後
 * @desc 場所移動後に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-メニュー開く
 * @desc メニューを開く時に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-メニュー閉じ
 * @desc メニューを閉じる時に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル開始-前
 * @desc バトル開始前に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル開始-後
 * @desc バトル開始後に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル勝利-前
 * @desc バトル勝利時の遷移前に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル勝利-後
 * @desc バトル勝利時の遷移後に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル逃走-前
 * @desc バトル逃走時の遷移前に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル逃走-後
 * @desc バトル逃走時の遷移後に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル敗北-前
 * @desc バトル敗北時の遷移前に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-バトル敗北-後
 * @desc バトル敗北時の遷移後に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-ゲームオーバー
 * @desc ゲームオーバー時に実行するコモンイベントの有効/無効
 * @type boolean
 * @default 
 *
 * @arg コモン-味方アクション-前
 * @desc 戦闘中、味方がスキル/アイテムを使う直前に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 * @arg コモン-味方アクション-後
 * @desc 戦闘中、味方がスキル/アイテムを使った直後に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 * @arg コモン-敵アクション-前
 * @desc 戦闘中、敵がスキル/アイテムを使う直前に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 * @arg コモン-敵アクション-後
 * @desc 戦闘中、敵がスキル/アイテムを使った直後に実行するコモンイベントの有効/無効
 * @type common_event
 * @default 
 *
 *
 *
 * @command タイミングコモン全無効
 * @desc タイミングコモンを全て無効にする。個別の有効/無効より優先される
 *
 *
 *
 * @command タイミングコモン全無効解除
 * @desc タイミングコモンの全無効を解除する
 *
 *
 *
 * @command タイミングコモン変更
 * @desc 各タイミングコモンの使用コモンイベントを変更する
 *
 * @arg コモン-ニューゲーム
 * @desc ニューゲーム時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-データロード
 * @desc データロード時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-場所移動-前
 * @desc 場所移動前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-場所移動-後
 * @desc 場所移動後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-メニュー開く
 * @desc メニューを開く時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-メニュー閉じ
 * @desc メニューを閉じる時に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル開始-前
 * @desc バトル開始前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル開始-後
 * @desc バトル開始後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル勝利-前
 * @desc バトル勝利時の遷移前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル勝利-後
 * @desc バトル勝利時の遷移後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル逃走-前
 * @desc バトル逃走時の遷移前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル逃走-後
 * @desc バトル逃走時の遷移後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル敗北-前
 * @desc バトル敗北時の遷移前に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-バトル敗北-後
 * @desc バトル敗北時の遷移後に実行するコモンイベント
 * @type common_event
 * @default 
 *
 * @arg コモン-ゲームオーバー
 * @desc ゲームオーバー時に実行するコモンイベント。全滅した場合、回復しないとコモンを繰り返すので注意
 * @type common_event
 * @default 
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //-- ワードコンバート
    //==================================================
    
    
    const words = ["NewGame", "DataLoad", "TransfarPre", "TransfarAfter", "MenuOpen", "MenuClose", "BattleStartPre", "BattleStartAfter", "BattleVictoryPre",  "BattleVictoryAfter", "BattleEscapePre", "BattleEscapeAfter", "BattleLosePre", "BattleLoseAfter", "GameOver", "actorActionPre", "actorActionAfter", "enemyActionPre", "enemyActionAfter"];
    
    const jpns = ["ニューゲーム", "データロード", "場所移動-前", "場所移動-後", "メニュー開く", "メニュー閉じ", "バトル開始-前", "バトル開始-後", "バトル勝利-前",  "バトル勝利-後", "バトル逃走-前", "バトル逃走-後", "バトル敗北-前", "バトル敗北-後", "ゲームオーバー", "味方アクション-前", "味方アクション-後", "敵アクション-前", "敵アクション-後"];
    
    function toWord(jpn) {
        const index = jpns.indexOf(jpn);
        if (index < 0) { return; }
        return words[index];
    };
    
    function toJpn(word) {
        const index = words.indexOf(word);
        if (index < 0) { return; }
        return jpns[index];
    };
    
    
    
    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    const parameters = PluginManager.parameters(pluginName);
    
    keke_varSubjectId = Number(parameters["変数-行動者ID"]);
    keke_varSkillId = Number(parameters["変数-スキルID"]);
    keke_varItemId = Number(parameters["変数-アイテムID"]);
    keke_varTargetIs = Number(parameters["変数-対象が敵か味方か"]);
    keke_varTargetId = Number(parameters["変数-対象ID"]);
    keke_varTargetAll = Number(parameters["変数-対象全て"]);
    
    
    //==================================================
    //--  プラグインコマンド
    //==================================================
    
    //- タイミングコモン有効/無効
    PluginManager.registerCommand(pluginName, "タイミングコモン有効/無効", args => {
        jpns.forEach(jpn => {
            const param = args["コモン-" + jpn];
            if (param) { $gameMap._timingCommonInvalidsKe[toWord(jpn)] = !eval(param); }
        });
    });
    
    
    //- タイミングコモン全無効
    PluginManager.registerCommand(pluginName, "タイミングコモン全無効", args => {
        $gameMap._noTimingCommonKe = true;
    });
    
    
    //- タイミングコモン全無効解除
    PluginManager.registerCommand(pluginName, "タイミングコモン全無効解除", args => {
        $gameMap._noTimingCommonKe = false;
    });
    
    
    //- タイミングコモン変更
    PluginManager.registerCommand(pluginName, "タイミングコモン変更", args => {
        jpns.forEach(jpn => {
            const param = args["コモン-" + jpn];
            if (param) { $gameMap._timingCommonsKe[toWord(jpn)] = Number(param); }
        });
    });
    
    
    
    //==================================================
    //--  共通開始
    //==================================================
    
    //- スプライトセット・マップ開始(コア追加)
    const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
    Spriteset_Map.prototype.initialize = function() {
        // タイミングコモンの初期化
        initTimingCommon();
        // マップ開始時コモン
        commonMapStart();
        _Spriteset_Map_initialize.apply(this);
    };
    
    
    //- スプライトセット・バトル開始(コア追加)
    const _Spriteset_Battle_initialize = Spriteset_Battle.prototype.initialize;
    Spriteset_Battle.prototype.initialize = function() {
        // タイミングコモンの初期化
        initTimingCommon();
        _Spriteset_Battle_initialize.apply(this);
    };
    
    
    //- シーン開始(コア追加)
    const _Scene_Map_start = Scene_Map.prototype.start;
   Scene_Map.prototype.start = function() {
       // マップ開始時コモン_2
        commonMapStart_2();
        _Scene_Map_start.apply(this);
    };
    
    
    
    //==================================================
    //--  共通更新 
    //==================================================
    
    //- シーンベース更新(コア追加)
    const _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function() {
        _Scene_Base_update.apply(this);
        // コモンプリターの更新
        updateCommonPreter($gameMap);
        // コモンハンドラの更新
        updateCommonHandler($gameMap);
    };
    
    
    
    //==================================================
    //--  コモンの実行
    //==================================================
    
    //- タイミングコモンの初期化
    function initTimingCommon() {
        if ($gameMap._timingCommonsKe) { return; }
        const commons = {};
        words.forEach(word => {
            commons[word] = Number(parameters["コモン-"+toJpn(word)]);
        });
        $gameMap._timingCommonsKe = commons;
        $gameMap._timingCommonInvalidsKe = {};
    };
    
    
    //- コモンイベントの呼び出し
    function callCommonEvent(word) {
        const id = getTimingCommon(word);
        if (!id) { return; }
        return doCommonEvent(id, $gameMap, word);
    };
    
    
    //- タイミングコモンの取得
    function getTimingCommon(word) {
        if ($gameMap._noTimingCommonKe) { return; }
        if (!$gameMap._timingCommonInvalidsKe || $gameMap._timingCommonInvalidsKe[word]) { return; }
        return $gameMap._timingCommonsKe[word];
    };
    
    
    //- コモンイベントの実行
    function doCommonEvent(id,  body, word) {
        // コモンイベントを取得
        const commonEvent = $dataCommonEvents[id];
        if (!commonEvent) { return; }
        // 通常プリターの停止
        stopNormalPreter();
        // インタープリターを作成
        const preter = new Game_Interpreter(0);
        preter.tCommonType = word;
        if (!body._tCommonPretersKe) { body._tCommonPretersKe = []; }
        body._tCommonPretersKe.push(preter);
        // セットアップ
        preter.setup(commonEvent.list);
        // コモンプリターの更新
        updateCommonPreter(body);
        return true;
    };
    
    
    //- コモンプリターの更新
    function updateCommonPreter(body) {
        // ウェイトを更新
        if (body._tCommonPreterWaitKe) { body._tCommonPreterWaitKe--; }
        if (!body._tCommonPretersKe || !body._tCommonPretersKe.length) { return; }
        // プリターを更新
        let del = false;
        const preter = body._tCommonPretersKe[0];
        preter.update();
        if (!preter.isRunning()) {
            body._tCommonPretersKe.shift();
        }
        // 終了
        if (!body._tCommonPretersKe.length) {
            // 通常プリターの再開
            runNormalPreter();
            // ドット移動の停止を解除
            $gamePlayer._noDotMoveKe = false;
        }
    };
    
    
    //- コモンハンドラの更新
    function updateCommonHandler(body) {
        if (!body._tCommonHandlerKe) { return; }
        if (body._tCommonPretersKe && body._tCommonPretersKe.length) { return; }
        ignoreCommon = true;
        body._tCommonHandlerKe();
        body._tCommonHandlerKe = null;
        ignoreCommon = false;
    };
    
    
    //- タイミングコモン中か(公開)
    Game_Map.prototype.inTimmingCommonKe = function() {
        if (!this._tCommonPretersKe) { return false; }
        return this._tCommonPretersKe.some(preter => preter.isRunning());
    };
    
    
    //- ゲームオーバコモン中か
    function inGameOverCommon() {
        const gm = $gameMap;
        if (!gm._tCommonPretersKe) { return false; }
        return gm._tCommonPretersKe.some(preter => preter.tCommonType == "GameOver");
    };
    
    
    //- イベント中条件にタイミングコモンを追加
    const _Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
    Game_Map.prototype.isEventRunning = function() {
        let result = _Game_Map_isEventRunning.apply(this);
        result = result || this.inTimmingCommonKe();
        return result;
    };
    
    
    //- 通常プリターの停止
    function stopNormalPreter() {
        if (!$gameMap) { return; }
        $gameMap._interpreter._stopByTimingCommonKe = true;
        $gameTroop._interpreter._stopByTimingCommonKe = true;
    };
    
    
    //- 通常プリターの再開
    function runNormalPreter() {
        if (!$gameMap) { return; }
        $gameMap._interpreter._stopByTimingCommonKe = false;
        $gameTroop._interpreter._stopByTimingCommonKe = false;
    };
    
    
    //- 通常プリターの停止差し込み
    const _Game_Interpreter_updateChild = Game_Interpreter.prototype.updateChild;
    Game_Interpreter.prototype.updateChild = function() {
        if (this._stopByTimingCommonKe) { return true; }
        return _Game_Interpreter_updateChild.apply(this);
    };
    
    
    
    //==================================================
    //--  各タイミングでのコモン呼び出し
    //==================================================
    
    
    let ignoreCommon = false;
    let newGameAfter = false;
    let loadAfter = false;
    let gameOverAfter = false;
    let inGameOver = false;
    
    
    //- ニューゲーム後フラグ
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.apply(this);
        newGameAfter = true;
    };
    
    
    //- ロード後フラグ
    
    const _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        _Scene_Load_onLoadSuccess.call(this);
        // ロード後フラグをオン
        loadAfter = true;
    };
    
    
    //- 場所移動-前(コア追加)
    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function(params) {
        if (!ignoreCommon) {
            const gm = $gameMap;
            if (gm._tCommonHandlerKe) { return false; }
            const run = callCommonEvent("TransfarPre");
            if (run) { gm._tCommonHandlerKe = this.executeCommand.bind(this);  return false; }
        }
        return _Game_Interpreter_command201.apply(this, arguments);
    };
    
    
    //- メニュー開く(コア追加)
    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if (!ignoreCommon) {
            const gm = $gameMap;
            if (gm._tCommonHandlerKe) { return; }
            const run = callCommonEvent("MenuOpen");
            if (run) { gm._tCommonHandlerKe = this.callMenu.bind(this);  return; }
        }
        _Scene_Map_callMenu.apply(this);
    };
    
    
    //- バトル開始-前(コア追加)
    const _Game_Interpreter_command301 = Game_Interpreter.prototype.command301;
    Game_Interpreter.prototype.command301 = function(params) {
        if (!ignoreCommon) {
            const gm = $gameMap;
            if (gm._tCommonHandlerKe) { return false; }
            const run = callCommonEvent("BattleStartPre");
            if (run) { gm._tCommonHandlerKe = this.executeCommand.bind(this);  return false; }
        }
        return _Game_Interpreter_command301.apply(this, arguments);
    };
    
    
    //- バトル開始-後(コア追加)
    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.apply(this);
        setTimeout(callCommonEvent, 0, "BattleStartAfter");
    };
    
    
    //- 戦闘結果を保存
    let battleResult = "";
    
    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        _BattleManager_processVictory.apply(this);
        battleResult = "Victory";
    };
    
    const _BattleManager_processAbort = BattleManager.processAbort;
    BattleManager.processAbort = function() {
        _BattleManager_processAbort.apply(this);
        battleResult = "Escape";
    };
    
    const _BattleManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function() {
        _BattleManager_processDefeat.apply(this);
        battleResult = "Lose";
    };
    
    
    //- バトル終了-前(コア追加)
    const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function() {
         if (!ignoreCommon) {
            const gm = $gameMap;
            if (gm._tCommonHandlerKe) { return true; }
            const run = callCommonEvent("Battle" + battleResult + "Pre");
            if (run) { gm._tCommonHandlerKe = BattleManager.updateBattleEnd.bind(this);  return true; }
        }
        _BattleManager_updateBattleEnd.apply(this);
    };
    
    
    //- ゲームオーバー
    const _SceneManager_goto = SceneManager.goto;
    SceneManager.goto = function(sceneClass) {
        if (sceneClass == Scene_Gameover) {
            if (getTimingCommon("GameOver")) {
                if (gameOverAfter || inGameOverCommon()) { return; }
                // マップ以外ならマップ移行後コモン
                if (this._scene.constructor.name != "Scene_Map") {
                    sceneClass = Scene_Map;
                    gameOverAfter = true;
                // マップならすぐにコモン
                } else {
                    callCommonEvent("GameOver");
                    return;
                }
            }
        }
        _SceneManager_goto.apply(this, arguments);
    };
    
    
    //- マップ開始時コモン
    function commonMapStart() {
        // ニューゲーム
        if (newGameAfter) { callCommonEvent("NewGame");  newGameAfter = false; }
        // データロード
        if (loadAfter) { callCommonEvent("DataLoad");  loadAfter = false; }
        // メニュー閉じ
        if (SceneManager.isPreviousScene(Scene_Menu)) { callCommonEvent("MenuClose"); }
        // バトル終了-後
        if (SceneManager.isPreviousScene(Scene_Battle)) { callCommonEvent("Battle" + battleResult + "After"); }
        // ゲームオーバー
        if (gameOverAfter) { callCommonEvent("GameOver");  gameOverAfter = false; }
    };
    
    
    //- マップ開始時コモン_2
    function commonMapStart_2() {
        // 場所移動-後
        if (SceneManager.isPreviousScene(Scene_Map)) { callCommonEvent("TransfarAfter"); }
    };
    
    
    //- アクションコモン-前
    let didPreActionCommon = false;
    let inPreActionCommon = false;
    
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        const gm = $gameMap;
        if (didPreActionCommon && gm._tCommonHandlerKe) { return; }
        if (!didPreActionCommon) {
            didPreActionCommon = true;
            if (gm._tCommonHandlerKe) { return; }
             // アクションデータの保存
            const isEnemy = saveActionData(this);
            const subject = isEnemy ? "enemy" : "actor";
            const run = callCommonEvent(subject + "ActionPre");
            if (run) { gm._tCommonHandlerKe = this.startAction.bind(this);  inPreActionCommon = true;  return; }
        }
        //console.log(this._subject);
        _BattleManager_startAction.apply(this);
        if (inPreActionCommon) {
            inPreActionCommon = false;
            setTimeout(removeCurrentAction, 0, this._subject);
        }
    };
    
    
    // アクションコモン-後
    const _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        // アクションデータの保存
        const isEnemy = saveActionData(this, true);
        const subject = isEnemy ? "enemy" : "actor";
        callCommonEvent(subject + "ActionAfter"); 
        _BattleManager_endAction.apply(this);
        // 前アクションコモンフラグをオフ
        didPreActionCommon = false;
    };
    
    
    //- アクションデータの保存
    function saveActionData(bm, isEnd) {
        // 行動者ID
        const subject = bm._subject;
        const actIsEnemy = subject._enemyId;
        const subjectId = actIsEnemy ? subject._enemyId : subject._actorId;
        // スキルID/アイテムID
        const action = subject.currentAction();
        if (!action) { return actIsEnemy; }
        const item = action._item;
        const obje = action.item();
        const isItem = item.isItem();
        const skillId = isItem ? 0 : obje.id;
        const itemId = isItem ? obje.id : 0;
        // ターゲットID
        const targets = isEnd ? bm._targets : action.makeTargets();
        const target = targets[0];
        const tageIsActor = target && target._actorId ? 1 : 0;
        const targetId = target ? (tageIsActor ? target._actorId : target._enemyId) : 0;
        const targetIds = targets.map(t => t._enemyId ? t._enemyId : t._actorId);
        if (keke_varSubjectId) { $gameVariables.setValue(keke_varSubjectId, subjectId); }
        if (keke_varSkillId) { $gameVariables.setValue(keke_varSkillId, skillId); }
        if (keke_varItemId) { $gameVariables.setValue(keke_varItemId, itemId); }
        if (keke_varTargetIs) { $gameVariables.setValue(keke_varTargetIs, tageIsActor); }
        if (keke_varTargetId) { $gameVariables.setValue(keke_varTargetId, targetId); }
        if (keke_varTargetAll) { $gameVariables.setValue(keke_varTargetAll, targetIds); }
        return actIsEnemy;
    };
    
    
    // カレントアクション削除の遅延
    const _Game_Battler_removeCurrentAction = Game_Battler.prototype.removeCurrentAction;
    Game_Battler.prototype.removeCurrentAction = function() {
        if (inPreActionCommon) { return; }
        _Game_Battler_removeCurrentAction.apply(this);
    };
    
    function removeCurrentAction(subject) {
        if (subject._actions) { subject.removeCurrentAction(); }
    };
    
})();