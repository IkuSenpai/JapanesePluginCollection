// ===================================================
// ARTM_InsertOpeningMapMZ
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 初版
// =================================================================
/*:ja
 * @target MZ
 * @plugindesc タイトル前にOPを挿入するMZ専用プラグイン
 * @author Artemis
 *
 * @help ARTM_InsertOpeningMapMZ
 *
 * タイトル前にOPを挿入するMZ専用プラグインです。
 *
 *【使い方】
 * １．OP用マップを新規作成し、パラメータ「mapId」にマップIDをセットする
 * ２．OP用イベントを作成する。（並列イベント時の動作は保証致しません。）
 * ３．プラグインコマンド「OP終了」にてOPを終了して下さい。
 *
 * プラグインコマンド
 * “OP終了”: OPシーンを終了します。
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
 * @command onQuit
 * @text OP終了
 * @desc OPを終了します。
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

    const _targetPluginName = "ARTM_InsertOpeningMapMZ";
    const _param = PluginManager.parameters(_targetPluginName);
    const _mapId = Number(_param["mapId"] || "1");
    const _canSkip = (_param["canSkip"] || "false").toLowerCase() === "true";
    const _isTrans = (_param["isTrans"] || "false").toLowerCase() === "true";
    const _isValidOp = (_param["isValidOp"] || "false").toLowerCase() === "true";
    const _isShowFlw = (_param["isShowFlw"] || "false").toLowerCase() === "true";
    let _isRun = true;
    let _isStart = false;
    let _isQuit = false;
    let _duration = 0;
    let _durationMax = 0;
    let _ppos;
    try {_ppos = JSON.parse(_param["playerPos"]);} catch {_ppos = {"X":"0", "Y":"0"};}
    
    PluginManager.registerCommand(_targetPluginName, "onQuit", args => {
        _isQuit = true;
        if ($gameMap.events().length > 0) {
            $gameMap.eraseEvent($gameMap._interpreter._eventId);
        }
    });

    Scene_Map.prototype.startFadeOut = function(duration, white) {
        Scene_Base.prototype.startFadeOut.call(this,duration, white);
        if (!_isRun) return;
        this._fadeDuration = _isQuit ? 70 : 15;
    };

    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        _SceneManager_updateMain.call(this);
        this.updateVideoOP();
    };

    SceneManager.updateVideoOP = function() {
        if (!_isRun) return;
        if (_duration > 0) {
            const durationMax = _durationMax;
            const duration = _duration;
            let volume = 0;
            if (Video && duration > 1) {
               volume = (duration / durationMax)
            }
            Video._element.volume = volume;
            _duration--;
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
        $gamePlayer._newX = Number(_ppos.X);
        $gamePlayer._newY = Number(_ppos.Y);
        $gamePlayer.setTransparent(_isTrans);
        SceneManager.goto(Scene_Map);
    };

    const _Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function() {
        _Scene_Title_start.call(this);
        _isRun = false;
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
    };

    const _Game_Map_updateInterpreter = Game_Map.prototype.updateInterpreter;
    Game_Map.prototype.updateInterpreter = function() {
        if (!_isRun) {
            _Game_Map_updateInterpreter.call(this);
            return;
        }
        const waitMode = this._interpreter._waitMode;
        if (waitMode !== "") {
            const inputState = TouchInput.isPressed() || Input._latestButton;
            _isStart = true;
            if (_canSkip && inputState) {
                _isQuit = true;
                if (Video.isPlaying()) {
                    Video._onEnd();
                    AudioManager.stopBgm();
                    _durationMax = 15;
                    _duration = _durationMax;
                }
                if ($gameMap.events().length > 0) {
                    $gameMap.eraseEvent($gameMap._interpreter._eventId);
                }
                fncGameMapUpdateInterpreter();
            }
        } else if (_isQuit) {
            SceneManager._scene._menuEnabled = false;
            SceneManager._scene._menuButton = false;
            fncGameMapUpdateInterpreter();
        }
        _Game_Map_updateInterpreter.call(this);
    };

    const _Game_Followers_initialize = Game_Followers.prototype.initialize;
    Game_Followers.prototype.initialize = function() {
        const optFollowersTemp = $dataSystem.optFollowers;
        $dataSystem.optFollowers = _isShowFlw;
        _Game_Followers_initialize.call(this);
        $dataSystem.optFollowers = optFollowersTemp;
    };

})();
