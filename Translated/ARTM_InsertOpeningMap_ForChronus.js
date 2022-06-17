// ===================================================
// ARTM_InsertOpeningMap_ForChronus
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 初版
// =================================================================
/*:ja
 * @target MZ
 * @plugindesc タイトル前にOPを挿入するプラグイン
 * @author Artemis
 *
 * @help ARTM_InsertOpeningMap_ForChronus
 *
 * タイトル前にOPを挿入するプラグインのChronus.js共存版です。
 * 本プラグインはChronus.jsを有効にしていることが必須です。
 * プラグイン管理画面にて、“Chronus.js”を本プラグインより“上”に配置して下さい。
 *
 *【使い方】
 * １．OP用マップを新規作成し、1つだけイベントを追加する
 * ２．上記イベントに自動実行でOPイベント作成。
 *     ※必ず末尾に「イベントの一時消去」を入れて下さい。
 *
 * プラグインコマンドはありません。
 *
 * @command setting
 *
 * @param mapId
 * @text OPに使用するマップID
 * @type number
 * @min 1
 * @default 1
 * @desc OPに使用するマップIDを指定します。
 *
 * @param canSkip
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @text イベントスキップ
 * @desc イベントスキップを[有効or無効]にします。
 *
 * @param playerPos
 * @type struct<ppos>
 * @default {"X":"0","Y":"0"}
 * @text プレイヤーの初期位置
 * @desc プレイヤーの初期位置です。
 *
 * @param isTrans
 * @type boolean
 * @on 有効
 * @off 無効
 * @default false
 * @text 透明状態で開始
 * @desc 透明状態で開始を[有効or無効]にします。
 *
 * @param isValidOp
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @text セーブ存在時のOPシーン
 * @desc セーブ存在時のOPシーンを[有効or無効]にします。
 *
 * @param isShowFlw
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @text パーティの隊列歩行
 * @desc パーティの隊列歩行を[有効or無効]にします。
 *
 */

/*~struct~ppos:
 * @param X
 * @type number
 * @min 0
 * @max 500
 * @default 0
 * @text プレイヤーのX座標
 * @desc プレイヤーのX座標を指定します。
 *
 * @param Y
 * @type number
 * @min 0
 * @max 500
 * @default 0
 * @text プレイヤーのY座標
 * @desc プレイヤーのY座標を指定します。
 *
 */

(() => {
    const _param = PluginManager.parameters("ARTM_InsertOpeningMap_ForChronus");
    const _mapId = Number(_param["mapId"] || "1");
    const _canSkip = (_param["canSkip"] || "false").toLowerCase() === "true";
    const _isTrans = (_param["isTrans"] || "false").toLowerCase() === "true";
    const _isValidOp = (_param["isValidOp"] || "false").toLowerCase() === "true";
    const _isShowFlw = (_param["isShowFlw"] || "false").toLowerCase() === "true";
    let _InsertOpeningMap_isRun = true;
    let _InsertOpeningMap_isStart = false;
    let _InsertOpeningMap_duration = 0;
    let _InsertOpeningMap_durationMax = 0;
    let _ppos;
    try {_ppos = JSON.parse(_param["playerPos"]);} catch {_ppos = {"X":"0", "Y":"0"};}
    

    Scene_Map.prototype.startFadeOut = function(duration, white) {
        Scene_Base.prototype.startFadeOut.call(this,duration, white);
        if (!_InsertOpeningMap_isRun) return;
        this._fadeDuration = 15;
    };

    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        _SceneManager_updateMain.call(this);
        this.updateVideoOP();
    };

    SceneManager.updateVideoOP = function() {
        if (!_InsertOpeningMap_isRun) return;
        if (_InsertOpeningMap_duration > 0) {
            const durationMax = _InsertOpeningMap_durationMax;
            const duration = _InsertOpeningMap_duration;
            let volume = 0;
            if (duration > 1) {
               volume = (duration / durationMax)
            }
            Video._element.volume = volume;
            _InsertOpeningMap_duration--;
        }
    };

    const _Scene_Boot_startNormalGame = Scene_Boot.prototype.startNormalGame;
    Scene_Boot.prototype.startNormalGame = function() {
        if (DataManager.isAnySavefileExists() && !_isValidOp) {
            _Scene_Boot_startNormalGame.call(this);
            return;
        }
        DataManager.setupNewGame();
        $gamePlayer._transferring = true;
        $gamePlayer._newMapId = _mapId;
        $gamePlayer.setTransparent(true);
        SceneManager.goto(Scene_Map);
    };

    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        _InsertOpeningMap_isRun = false;
    };

    const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
        if (!_InsertOpeningMap_isRun) {
            $gameSystem.chronus().onMapLoaded();
        }
        _Scene_Map_onMapLoaded.apply(this, arguments);
    };

    const _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function() {
        _Scene_Map_updateMain.apply(this, arguments);
        if (!_InsertOpeningMap_isRun) {
            $gameSystem.chronus().update();
        }
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        if (!_InsertOpeningMap_isRun) {
            this.createChronusWindow();
        }
        _Scene_Map_createAllWindows.apply(this, arguments);
    };

    // overrides
    Scene_Title.prototype.commandNewGame = function() {
        DataManager.setupNewGame();
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Map);
    };

    function fncGameMapUpdateInterpreter() {
        SceneManager.goto(Scene_Title);
        $gameScreen.clear();
    };

    const _Game_Map_updateInterpreter = Game_Map.prototype.updateInterpreter;
    Game_Map.prototype.updateInterpreter = function() {
        if (!_InsertOpeningMap_isRun) {
            _Game_Map_updateInterpreter.call(this);
            return;
        }
        const waitMode = this._interpreter._waitMode;
        if (waitMode !== "") {
            $gameSystem.chronus()._isShowingCalendar = false;
            _InsertOpeningMap_isStart = true;
            if (_canSkip && (TouchInput.isPressed() || Input._latestButton)) {
                if (Video.isPlaying()) {
                    Video._onEnd();
                    AudioManager.stopBgm();
                }
                this.eraseEvent(this._interpreter._eventId);
                fncGameMapUpdateInterpreter();
                _InsertOpeningMap_durationMax = 15;
                _InsertOpeningMap_duration = _InsertOpeningMap_durationMax;
            }
        } else if (_InsertOpeningMap_isStart && waitMode === "") {
            $gameSystem.chronus()._isShowingCalendar = false;
            SceneManager._scene._menuEnabled = false;
            SceneManager._scene._menuButton = false;
            fncGameMapUpdateInterpreter();
        }
        _Game_Map_updateInterpreter.call(this);
    };

    const _Game_Player_setupForNewGame = Game_Player.prototype.setupForNewGame;
    Game_Player.prototype.setupForNewGame = function() {
        _Game_Player_setupForNewGame.call(this);
        this._newX = Number(_ppos.X);
        this._newY = Number(_ppos.Y);
        this.setTransparent(_isTrans);
    };

    const _Game_Followers_initialize = Game_Followers.prototype.initialize;
    Game_Followers.prototype.initialize = function() {
        const optFollowersTemp = $dataSystem.optFollowers;
        $dataSystem.optFollowers = _isShowFlw;
        _Game_Followers_initialize.call(this);
        $dataSystem.optFollowers = optFollowersTemp;
    };

    const _Game_Chronus_isShowingCalendar = Game_Chronus.prototype.isShowingCalendar;
    Game_Chronus.prototype.isShowingCalendar = function() {
        if (_InsertOpeningMap_isRun) return false;
        return _Game_Chronus_isShowingCalendar.call(this);
    };

})();
