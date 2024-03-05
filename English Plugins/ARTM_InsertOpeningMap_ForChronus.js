// ===================================================
// ARTM_InsertOpeningMap_ForChronus
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 Initial Release
// =================================================================
/*:en
 * @target MZ
 * @plugindesc Plugin to insert an opening scene before the title screen, designed for compatibility with Chronus.js.
 * Author: Artemis
 * @translator IkuSenpai
 *
 * @help ARTM_InsertOpeningMap_ForChronus
 *
 * This plugin is designed to insert an opening scene before the title screen, and it is compatible with Chronus.js.
 * It is essential to have Chronus.js enabled, and make sure to place "Chronus.js" above this plugin in the plugin manager.
 *
 * [Usage]
 * 1. Create a new map for the opening scene and add only one event.
 * 2. In the above event, create the opening scene using the auto-run event.
 *    * Be sure to include "Erase Event" at the end.
 *
 * There are no plugin commands.
 *
 * @command setting
 *
 * @param mapId
 * @text Map ID for Opening Scene
 * @type number
 * @min 1
 * @default 1
 * @desc Specify the Map ID used for the opening scene.
 *
 * @param canSkip
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @text Event Skip
 * @desc Enable or disable event skipping.
 *
 * @param playerPos
 * @type struct<ppos>
 * @default {"X":"0","Y":"0"}
 * @text Initial Player Position
 * @desc Set the initial position for the player.
 *
 * @param isTrans
 * @type boolean
 * @on Enable
 * @off Disable
 * @default false
 * @text Start in Transparent State
 * @desc Enable or disable starting in a transparent state.
 *
 * @param isValidOp
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @text Opening Scene on Save Existence
 * @desc Enable or disable the opening scene when a save file exists.
 *
 * @param isShowFlw
 * @type boolean
 * @on Enable
 * @off Disable
 * @default true
 * @text Party Follow Movement
 * @desc Enable or disable party follow movement.
 *
 */

/*~struct~ppos:
 * @param X
 * @type number
 * @min 0
 * @max 500
 * @default 0
 * @text Player's X Coordinate
 * @desc Specify the player's X coordinate.
 *
 * @param Y
 * @type number
 * @min 0
 * @max 500
 * @default 0
 * @text Player's Y Coordinate
 * @desc Specify the player's Y coordinate.
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
