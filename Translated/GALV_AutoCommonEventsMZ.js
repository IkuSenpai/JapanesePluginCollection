//-----------------------------------------------------------------------------
//  Galv's Auto Common Events MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_AutoCommonEventsMZ.js
//-----------------------------------------------------------------------------
//  2022-03-20 - Version 1.4 - fixed a bug with script call not working
//  2021-01-05 - Version 1.3 - added when timer ends commen event
//  2020-10-29 - Version 1.2 - added game over common event
//  2020-10-27 - Version 1.1 - added enter/exit vehicle common events
//  2020-10-21 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_AutoCommonEvents = true;

var Galv = Galv || {};              // Galv's main object
Galv.ACE = Galv.ACE || {};          // Galv's object
Galv.ACE.pluginName = 'GALV_AutoCommonEventsMZ';

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.4) Run selected common events automatically during certain parts of the game process
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param loadFile
 * @text Load Common Event
 * @desc Common event id run after a saved game is loaded
 * @default 0
 *
 * @param saveFile
 * @text Save Common Event
 * @desc Common event id run after the player saves their game
 * @default 0
 *
 * @param mapStart
 * @text Map Start Common Event
 * @desc Common event id run after a new map is reached (eg. player transfers to new map)
 * @default 0
 *
 * @param mapLoad
 * @text Map Load Common Event
 * @desc Common event id run after the map scene is loaded (eg. viewing and leaving menu or scenes)
 * @default 0
 *
 * @param battleLoad
 * @text Battle Load Common Event
 * @desc Common event id run when the battle scene is loaded
 * @default 0
 *
 * @param enterVehicle
 * @text Get ON Vehicle
 * @desc Common event id run when you enter a vehicle
 * @default 0
 *
 * @param exitVehicle
 * @text Get OFF Vehicle
 * @desc Common event id run when you exit a vehicle
 * @default 0
 *
 * @param gameOver
 * @text Game Over
 * @desc Common event id run INSTEAD of the game over screen playing.
 * @default 0
 *
 * @param timerEnd
 * @text Timer End
 * @desc Common event id run when the timer ends.
 * @default 0
 *
 * @help
 *   Galv's Auto Common Events MZ
 * ----------------------------------------------------------------------------
 * This plugin injects common event calls at certain parts of the game process.
 * View the plugin settings to see where common events can be added and specify
 * a common event id for each.
 *
 * Use conditional branches in the common events to change them during game, or
 * alternatively use the script call available to specify a new common event id
 * for each of the process types.
 *
 * ----------------------------------------------------------------------------
 * NOTES:
 *
 * These common events run after a current event is finished its commands.
 * They also take turns in running if multiple common events are queued.
 * They can only run on the map scene or the battle scene (by default).
 *
 * ----------------------------------------------------------------------------
 * SPECIALS:
 *
 * Game Over: You will need to manually put the game over event command into
 * the common event to actually cause a gameover. If all actors in the party
 * are dead, the event will keep playing, so if you want the game to continue
 * you will need to revive at least one of them.
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT CALL
 * ----------------------------------------------------------------------------
 * You can change the common event id during the game by using script call:
 *
 *     Galv.ACE.id(x,'type');   // x being the new common event id to use.
 *                              // 'type' being which common event to change
 *
 * TYPES
 * ---------
 * 'loadFile'     // Load Common Event - runs only when a save file is loaded
 * 'saveFile'     // Save Common Event - runs only when a save file is created
 * 'mapStart'     // Map Start Common Event - runs when reaching a new map
 * 'mapLoad'      // Map Load Common Event - runs whenever loading the map
 *                // including opening and closing the menu.
 * 'battleLoad'   // Battle Load Common Event - runs whenever loading battle
 * 'enterVehicle' // Getting on a vehicle
 * 'exitVehicle'  // Getting off a vehicle
 * 'gameOver'     // When the game is over or defeated in battle
 * 'timerEnd'     // When the default timer reaches 0
 * 
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.ACE.preventMapStart = false;
Galv.ACE.preventSaveFile = false;
Galv.ACE.doGameOver = false;

Galv.ACE.params = PluginManager.parameters(Galv.ACE.pluginName);

Galv.ACE.id = function(id,type) {
	$gameSystem._autoCommonEventIds[type] = id;
};

Galv.ACE.exists = function(type) {
	if (!$gameSystem || !$gameSystem._autoCommonEventIds) return 0;
	return $gameSystem._autoCommonEventIds[type];
};

Galv.ACE.runId = function(type) {
	const id = Galv.ACE.exists(type);
	if (id) $gameTemp.reserveCommonEvent(id);
};


// GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.ACE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.ACE.Game_System_initialize.call(this);
	this.buildAutoCommonEvents();
};

Game_System.prototype.buildAutoCommonEvents = function() {
	this._autoCommonEventIds = {
		loadFile: Number(Galv.ACE.params["loadFile"]),
		saveFile: Number(Galv.ACE.params["saveFile"]),
		mapStart: Number(Galv.ACE.params["mapStart"]),
		mapLoad: Number(Galv.ACE.params["mapLoad"]),
		battleLoad: Number(Galv.ACE.params["battleLoad"]),
		enterVehicle: Number(Galv.ACE.params["enterVehicle"]),
		exitVehicle: Number(Galv.ACE.params["exitVehicle"]),
		gameOver: Number(Galv.ACE.params["gameOver"]),
		timerEnd: Number(Galv.ACE.params["timerEnd"]),
	};
};


// SCENE LOAD
//-----------------------------------------------------------------------------

Galv.ACE.Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
Scene_Load.prototype.onLoadSuccess = function() {
	Galv.ACE.preventMapStart = true;  // stop mapStart from running on file load
	Galv.ACE.Scene_Load_onLoadSuccess.call(this);
	Galv.ACE.runId('loadFile');
};


// SCENE SAVE
//-----------------------------------------------------------------------------

Galv.ACE.Scene_Save_onSaveSuccess = Scene_Save.prototype.onSaveSuccess;
Scene_Save.prototype.onSaveSuccess = function() {
    Galv.ACE.Scene_Save_onSaveSuccess.call(this);
	if (!Galv.ACE.preventSaveFile) Galv.ACE.runId('saveFile');
	Galv.ACE.preventSaveFile = true;
};


// GAME MAP
//-----------------------------------------------------------------------------

Galv.ACE.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	Galv.ACE.Game_Map_setup.call(this,mapId);
	if (!Galv.ACE.preventMapStart) Galv.ACE.runId('mapStart'); // whenever a new map is transferred to
};


// SCENE MAP
//-----------------------------------------------------------------------------

Galv.ACE.Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
	Galv.ACE.preventMapStart = false;  // allow mapStart from running again if it was prevented
	Galv.ACE.preventSaveFile = false;  // allow saveFile to run again.
	Galv.ACE.Scene_Map_start.call(this);
	Galv.ACE.runId('mapLoad'); // whenever the map scene is loaded
};


// SCENE BATTLE
//-----------------------------------------------------------------------------

Galv.ACE.Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
	Galv.ACE.Scene_Battle_start.call(this);
	Galv.ACE.runId('battleLoad'); // whenever the battle scene is loaded
};


// GAME VEHICLE
//-----------------------------------------------------------------------------

Galv.ACE.Game_Vehicle_getOn = Game_Vehicle.prototype.getOn;
Game_Vehicle.prototype.getOn = function() {
    Galv.ACE.Game_Vehicle_getOn.call(this);
	Galv.ACE.runId('enterVehicle'); // whenever you enters a vehicle
};

Galv.ACE.Game_Vehicle_getOff = Game_Vehicle.prototype.getOff;
Game_Vehicle.prototype.getOff = function() {
    Galv.ACE.Game_Vehicle_getOff.call(this);
	Galv.ACE.runId('exitVehicle'); // whenever player exists a vehicle
};


// GAME INTERPRETER
//-----------------------------------------------------------------------------

Galv.ACE.Game_Interpreter_command353 = Game_Interpreter.prototype.command353;
Game_Interpreter.prototype.command353 = function() {
	Galv.ACE.doGameOver = true;
    return Galv.ACE.Game_Interpreter_command353.call(this);
};


// SCENEMANAGER
//-----------------------------------------------------------------------------

Galv.ACE.SceneManager_goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
	if (Galv.ACE.exists('gameOver') && sceneClass && !Galv.ACE.doGameOver) {
		// if gameover scene tries to goto - Cancel and run common event instead - unless event command is used
		const sceneName = String(sceneClass).match(/Scene_(.*)\(/i);
        if (sceneName[1] == 'Gameover') {
			Galv.ACE.runId('gameOver'); // whenever game over happens when NOT using the event command
			return;
		};
    };
    Galv.ACE.SceneManager_goto.call(this,sceneClass);
};


// SCENE GAMEOVER
//-----------------------------------------------------------------------------

Galv.ACE.Scene_Gameover_start = Scene_Gameover.prototype.start;
Scene_Gameover.prototype.start = function() {
	Galv.ACE.doGameOver = false; // gotta turn it back off again.
	Galv.ACE.Scene_Gameover_start.call(this);
};

Galv.ACE.BattleManager_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function() {
	if (!this._canLose && Galv.ACE.exists('gameOver')) { // only run when player cannot continue if defeated
		$gameParty.members()[0].setHp(1); // have a member alive so the common event can run during battle.
		Galv.ACE.runId('gameOver'); // run game over battle event
		return;
	};
	Galv.ACE.BattleManager_processDefeat.call(this);
};


// GAME TIMER
//-----------------------------------------------------------------------------

Galv.ACE.Game_Timer_onExpire = Game_Timer.prototype.onExpire;
Game_Timer.prototype.onExpire = function() {
	if (Galv.ACE.exists('timerEnd')) { // If timer setting exists for end event
		Galv.ACE.runId('timerEnd');
		if ($gameParty.inBattle()) BattleManager.endTurn();
	} else {
		Galv.ACE.Game_Timer_onExpire.call(this);
	};
};