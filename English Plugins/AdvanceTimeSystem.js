/*:
@target MV MZ
@plugindesc Time Lapse System ver1.3.3
@author Eel Otoro
@translator NamiBoops
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AdvanceTimeSystem.js

@command ChangeTimezone
@text ChangeTimezone
@desc Change the timezone.

@arg Timezone
@type number
@default 0
@desc Specify the timezone value to change.

@arg FadeFrame
@type number
@default 0
@desc Specifies the number of frames to change the screen tint. 0 means use the default number of frames.

@command DisableTimeEffect
@text DisableTimeEffect
@desc Disable time zone tint change.

@command EnableTimeEffect
@text EnableTimeEffect
@desc Enable time zone color effect change.


@param TimezoneVariableID
@type number
@default 1
@desc
ID of a variable that manages time zones.
The value of the variable means (0:morning, 1:noon, 2:evening, 3:night, 4:midnight, 5:dawn).

@param EnableAdvanceTimeSwitchID
@type number
@default 0
@desc
Switch ID to enable/disable time passage

@param MorningSteps
@type number
@default 90
@desc Length of morning time (in steps)

@param NoonSteps
@type number
@default 180
@desc Length of daytime (in steps)

@param EveningSteps
@type number
@default 90
@desc Length of evening time (in steps)

@param NightSteps
@type number
@default 120
@desc Length of night time (in steps)

@param LateNightSteps
@type number
@default 120
@desc Length of late night time (in steps)

@param DawnSteps
@type number
@default 120
@desc Length of dawn time (in steps)

@param MorningTint
@type string
@default [-34, -34, 0, 34].
@desc Specify the morning screen tint in [Red, Green, Blue, Gray] format.

@param NoonTint
@type string
@default [0, 0, 0, 0].
@desc Specify the color tone of the daytime screen in the format [Red, Green, Blue, Gray].

@param EveningTint
@type string
@default [68, -34, -34, 0].
@desc Specify the color tone of the evening screen in [Red, Green, Blue, Gray] format.

@param NightTint
@type string
@default [-68, -68, 0, 68].
@desc Specify the color tone of the screen at night in the format [Red, Green, Blue, Gray].

@param LateNightTint
@type string
@default [-136, -136, 0, 136].
@desc Specify the color tone of late night screen in [Red, Green, Blue, Gray] format.

@param DawnTint
@type string
@default [-68, -68, 0, 68].
@desc Specify the color tone of the screen at dawn in the format [Red, Green, Blue, Gray

@param FadeFrame
@type number
@default 60
@desc Specify the frame to change the screen color tone.


@help
This plugin introduces a classic time elapsing system where time passes as you walk.
You can use Morning, Noon, Evening, Night, LateNight and Dawn as time zones.

[Instructions for use]
In the notes field of the map where you want to allow time to pass, add an
<AdvanceTimeMap>.
in the memo field of the map that allows time to elapse.

On maps where you want to play night-only background music, you can use the
<NightBgm: ["BGM file name", Pitch, Volume, Pan]>.
to play the BGM at night.
For example, if you want to set the imported "night-bgm" BGM for night, you can use
<NightBgm: ["night-bgm", 90, 100, 0]>
This will be the same as the following.
Note that the volume, pitch, and pan can be omitted.
If you omit them, they will be set to the same values as the normal BGM.

You can also create maps where you don't want to apply time-based screen tinting.
For example, if you don't want the screen tint to be applied inside buildings, you can create a map where you don't want to apply the time-based screen tint.
in the notes field of the map.
<NoEffectMap>.
in the memo field of the map.

If you want to set the enemy groups that appear at different times of the day
If you want to set the enemy group name to
<time zone>enemy group name
in the enemy group name. The time of day must be specified in English.

For example, if you want two bats to appear only at midnight
The enemy group name will be
<LateNight>bats*2
and the name of the enemy group will be


[Plugin Command]
If you want to change the time zone from an event, execute the plugin command "ChangeTimezone".
In the case of Tscool MV, you can execute the plugin command in the following format.
ChangeTimezone
AdvanceTimeSystem ChangeTimezone Value of the time zone to be changed Number of frames to change the color tone
The number of frames for color tone change can be omitted.
If the number of frames for color tone change is omitted, the number of frames for color tone change specified by the plugin parameter is specified.

For example, if you want to change the time zone to night, you can use the
AdvanceTimeSystem ChangeTimezone 3
would be

If you want to change the time zone to morning in one frame, use the
AdvanceTimeSystem ChangeTimezone 0 1
If you want to change the timezone to morning in one frame, you would use

To prohibit the time zone color tone change, execute the plugin command "DisableTimeEffect".
Conversely, if you want to allow time zone color tone changes, execute the "EnableTimeEffect" plugin command.
In the case of Tscool MV, the plug-in command can be executed in the following format.
Disable the color tone change of time zone
AdvanceTimeSystem DisableTimeEffect
Allow time zone color tone change.
AdvanceTimeSystem EnableTimeEffect

[License]
This plugin is available under the terms of the MIT License.
*/

const AdvanceTimeSystemPluginName = document.currentScript.src.match(/^. *\/(. +)\.js$/)[1];

(() => {
"use strict";

const params = PluginManager.parameters(AdvanceTimeSystemPluginName);
const TimezoneVariableID = parseInt(params["TimezoneVariableID"]);
const EnableAdvanceTimeSwitchID = parseInt(params["EnableAdvanceTimeSwitchID"]);

const MorningSteps = parseInt(params["MorningSteps"]);
const NoonSteps = parseInt(params["NoonSteps"]);
const EveningSteps = parseInt(params["EveningSteps"]);
const NightSteps = parseInt(params["NightSteps"]);
const LateNightSteps = parseInt(params["LateNightSteps"]);
const DawnSteps = parseInt(params["DawnSteps"]);

const MorningTint = JSON.parse(params["MorningTint"]);
const NoonTint = JSON.parse(params["NoonTint"]);
const EveningTint = JSON.parse(params["EveningTint"]);
const NightTint = JSON.parse(params["NightTint"]);
const LateNightTint = JSON.parse(params["LateNightTint"]);
const DawnTint = JSON.parse(params["DawnTint"]);

const FadeFrame = parseInt(params["FadeFrame"]);

const Morning = 0;
const Noon = 1;
const Evening = 2;
const Night = 3;
const LateNight = 4;
const Dawn = 5;

let $timezoneDatas = null;

class Timezone {
    constructor(steps, tint) {
        this._steps = steps;
        this._tint = tint;
    }

    get steps() { return this._steps }
    get tint() { return this._tint }
}

//class Game_Map
Game_Map.prototype.getNextTimezoneSteps = function() {
    return $timezoneDatas[this.nowTimezone()].steps;
};

const _Game_Map_initialize = Game_Map.prototype.initialize
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.call(this);
    this._nightBgm = undefined;
    this._isAdvanceTimeMap = undefined;
    this._noEffectMap = false;
    this._enableTimeEffect = true;
    this.createTimezoneDatas();
    this._lastTimezone = this.nowTimezone() - 1;
    this._nextTimezoneSteps = this.getNextTimezoneSteps();
};

Game_Map.prototype.createTimezoneDatas = function() {
    $timezoneDatas = {};
    $timezoneDatas[Morning] = new Timezone(MorningSteps, MorningTint);
    $timezoneDatas[Noon] = new Timezone(NoonSteps, NoonTint);
    $timezoneDatas[Evening] = new Timezone(EveningSteps, EveningTint);
    $timezoneDatas[Night] = new Timezone(NightSteps, NightTint);
    $timezoneDatas[LateNight] = new Timezone(LateNightSteps, LateNightTint);
    $timezoneDatas[Dawn] = new Timezone(DawnSteps, DawnTint);
}

Game_Map.prototype.getTimezoneValue = function(timezoneName) {
    switch (timezoneName) {
    case "Morning":
        return Morning;
    case "Noon":
        return Noon;
    case "Evening":
        return Evening;
    case "Night":
        return Night;
    case "LateNight":
        return LateNight;
    case "Dawn":
        return Dawn;
    }
    } return null;
}

const _Game_Map_setup = Game_Map.prototype.setup
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this._nightBgm = undefined;
    this._isAdvanceTimeMap = undefined;
    if (this._enableTimeEffect) {
        if ($dataMap.meta.NoEffectMap) {
            this._noEffectMap = true;
            this.clearTimeEffect();
        } else {
            this._noEffectMap = false;
            this.applyTimeEffect(1); }
        }
    }
};

Game_Map.prototype.applyTimeEffect = function(fadeFrame) {
    $gameScreen.startTint($timezoneDatas[this.nowTimezone()].tint, fadeFrame);
};

Game_Map.prototype.clearTimeEffect = function() {
    $gameScreen.startTint([0, 0, 0, 0], 1);
};

Game_Map.prototype.enableTimeEffect = function() {
    this._noEffectMap = false;
    this._enableTimeEffect = true;
    this.applyTimeEffect(1);
};

Game_Map.prototype.disableTimeEffect = function() {
    this._noEffectMap = true;
    this._enableTimeEffect = false;
    this.clearTimeEffect();
};

Game_Map.prototype.nowTimezone = function() {
    return $gameVariables.value(TimezoneVariableID);
};

Game_Map.prototype.changeTimezone = function(timezone, fadeFrame = FadeFrame) {
    $gameVariables.setValue(TimezoneVariableID, timezone);
    if (!this._noEffectMap) this.applyTimeEffect(fadeFrame);
    this._nextTimezoneSteps = this.getNextTimezoneSteps();
};

Game_Map.prototype.firstTimezone = function() {
    return Morning;
}

Game_Map.prototype.lastTimezone = function() {
    return Dawn;
}

Game_Map.prototype.advanceTimezone = function() {
    if (this.nowTimezone() < this.lastTimezone()) {
        this.changeTimezone(this.nowTimezone() + 1);
    } else {
        this.changeTimezone(this.firstTimezone());
    }
};

Game_Map.prototype.advanceTime = function() {
    this._nextTimezoneSteps--;
    if (this._nextTimezoneSteps === 0) this.advanceTimezone();
};

Game_Map.prototype.encounterList = function() {
    return $dataMap.encounterList.filter((encounter) => {
        const encounterTimezone = this.getEncounterTimezone(encounter);
        if (encounterTimezone ! = null) {
            if (encounterTimezone === this.nowTimezone()) return true;
            return false;
        }
        return true;
    });
};

Game_Map.prototype.getEncounterTimezone = function(encounter) {
    const troop = $dataTroops[encounter.troopId];
    const matchData = troop.name.match(/^<(. +)>/);
    if (matchData) return this.getTimezoneValue(matchData[1]);
    return null;
};

Game_Map.prototype.autoplay = function() {
    if ($dataMap.autoplayBgm) {
        if ($gamePlayer.isInVehicle()) {
            $gameSystem.saveWalkingBgm2();
        } else {
            if (this.nowTimezone() >= Night && this.nightBgm()) {
                AudioManager.playBgm(this.nightBgm());
            } else {
                AudioManager.playBgm($dataMap.bgm);
            }
        }
    }
    if ($dataMap.autoplayBgs) AudioManager.playBgs($dataMap.bgs);
}

Game_Map.prototype.nightBgm = function() {
    if (this._nightBgm === undefined) {
        if ($dataMap.meta.NightBgm) {
            const bgmData = JSON.parse($dataMap.meta.NightBgm);
            const name = bgmData[0];
            const pitch = (bgmData[1] ? bgmData[1] : $dataMap.bgm.pitch);
            const volume = (bgmData[2] ? bgmData[2] : $dataMap.bgm.volume);
            const pan = (bgmData[3] ? bgmData[3] : $dataMap.bgm.pan);
            const bgm = {
                name: name,
                pitch: pitch,
                volume: volume,
                pan: pan
            };
            this._nightBgm = bgm;
        } else {
            this._nightBgm = null;
        }
    }
    } return this._nightBgm;
}

Game_Map.prototype.isAdvanceTimeMap = function() {
    if (this._isAdvanceTimeMap === undefined) {
        if ($dataMap.meta.AdvanceTimeMap) {
            this._isAdvanceTimeMap = true;
        } else {
            this._isAdvanceTimeMap = false;
        }
    }
    } return this._isAdvanceTimeMap;
};

Game_Map.prototype.isEnableAdvanceTime = function() {
    if (this._noEffectMap) return false;
    if (EnableAdvanceTimeSwitchID === 0) return true;
    return $gameSwitches.value(EnableAdvanceTimeSwitchID);
};

// class Game_Player
const _Game_Player_increaseSteps = Game_Player.prototype.increaseSteps
Game_Player.prototype.increaseSteps = function() {
    _Game_Player_increaseSteps.call(this);
    if ($gameMap.isAdvanceTimeMap() && $gameMap.isEnableAdvanceTime()) $gameMap.advanceTime();
};


// Register plugin command.
if (Utils.RPGMAKER_NAME === "MZ") {
    PluginManager.registerCommand(AdvanceTimeSystemPluginName, "ChangeTimezone", (args) => {
        const timezone = parseInt(args["Timezone"]);
        const fadeFrame = !args["FadeFrame"] || args["FadeFrame"] === "0" ? FadeFrame : parseInt(args["FadeFrame"]);
        $gameMap.changeTimezone(timezone, fadeFrame);
    });

    PluginManager.registerCommand(AdvanceTimeSystemPluginName, "EnableTimeEffect", () => {
        $gameMap.enableTimeEffect();
    });

    PluginManager.registerCommand(AdvanceTimeSystemPluginName, "DisableTimeEffect", () => {
        $gameMap.disableTimeEffect();
    });
}
const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command ! == "AdvanceTimeSystem") return;
    switch (args[0]) {
    case "ChangeTimezone":
        const timezone = parseInt(args[1]);
        const fadeFrame = !args[2] || args[2] === "0" ? FadeFrame : parseInt(args[2]);
        $gameMap.changeTimezone(timezone, fadeFrame);
        break;
    case "EnableTimeEffect":
        $gameMap.enableTimeEffect();
        break;
    case "DisableTimeEffect":
        $gameMap.disableTimeEffect();
        break;
    }
};

})();
