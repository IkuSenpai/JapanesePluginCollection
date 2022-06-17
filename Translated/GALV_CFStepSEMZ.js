//-----------------------------------------------------------------------------
//  Galv's Character Frames Step SE MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_CFStepSeMZ.js
//-----------------------------------------------------------------------------
//  2021-03-27 - Version 1.2 - fixed a bug where terrain 8 didn't work.
//  2020-10-12 - Version 1.1 - stopped step SE working on vehicles (so airship
//                             doesn't have stepping sounds).
//  2020-09-06 - Version 1.0 - release
//-----------------------------------------------------------------------------
//  Terms can be found at:
//  galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.GALV_CFStepSe = true;

var Galv = Galv || {};           // Galv's main object
Galv.CFSTEP = Galv.CFSTEP || {}; // Plugin object
Galv.CFSTEP.pluginName = "GALV_CFStepSeMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.2) Adds step sound effects to Galv's Character Frames plugin
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param sFrames
 * @text Step Frames
 * @desc Which frames of a characterset will play step sounds separated by commas
 * @default 1,5
 *
 * @param events
 * @text Events
 * @desc Set if you want events to have steps or not.
 * true or false
 * @default true
 *
 * @param -- Terrain Step SE (Walking) --
 * @desc
 * @default
 *
 * @param Terrain 1
 * @desc se_name, volume, pitch
 * @default
 *
 * @param Terrain 2
 * @desc se_name, volume, pitch
 * @default
 *
 * @param Terrain 3
 * @desc se_name, volume, pitch
 * @default
 *
 * @param Terrain 4
 * @desc se_name, volume, pitch
 * @default
 *
 * @param Terrain 5
 * @desc se_name, volume, pitch
 * @default
 *
 * @param Terrain 6
 * @desc se_name, volume, pitch
 * @default
 *
 * @param Terrain 7
 * @desc se_name, volume, pitch
 * @default
 *
 * @help
 *   Galv's Character Frames Step SE
 * ----------------------------------------------------------------------------
 * REQUIRED: Galv's Character Frames plugin.
 *
 * This plugin allows you to setup stepping sound effects for terrain tags
 * for when the player and/or events walk on them. It is designed to use my
 * Character Frames plugin and the step sound effects happen on specified 
 * walking frames (set in plugin settings).
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *  EVENT NOTE
 * ----------------------------------------------------------------------------
 * If you include the following text inside an event's note field:
 *
 *     <step_se>
 *
 * Then the event will play step sound effects when walking no matter which 
 * event page it has active.
 *
 * ----------------------------------------------------------------------------
 *  EVENT COMMENTS
 * ----------------------------------------------------------------------------
 * Alternatively you can use the same comment inside an event on every page
 * you want the event to play step sound effects on.
 *
 *     <step_se>
 *
 * ----------------------------------------------------------------------------
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.CFSTEP.delay = 10;   // frames in which another step cannot be played after a step.
Galv.CFSTEP.frames = PluginManager.parameters(Galv.CFSTEP.pluginName)["sFrames"].split(',');
Galv.CFSTEP.events = PluginManager.parameters(Galv.CFSTEP.pluginName)["events"].toLowerCase() === 'true' ? true : false;


Galv.CFSTEP.makeSound = function(txt) {
	let arr;
	if (Array.isArray(txt)) {
		arr = txt;
	} else {
		arr = txt.split(",");
	};
	return {
		name: arr[0],
		pan: 0,
		pitch: Number(arr[2]),
		volume: Number(arr[1])
	};
};

// Make terrain SE's
Galv.CFSTEP.terrainSounds = [];
for (let i = 1; i < 8; i++) {
	let txt = PluginManager.parameters(Galv.CFSTEP.pluginName)["Terrain " + i];
	Galv.CFSTEP.terrainSounds[i] = Galv.CFSTEP.makeSound(txt);
};


//-----------------------------------------------------------------------------
//  GAME CHARACTERBASE
//-----------------------------------------------------------------------------

Galv.CFSTEP.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	this.stepSeInit();
	Galv.CFSTEP.Game_CharacterBase_initMembers.call(this);
};

Game_CharacterBase.prototype.stepSeInit = function() {
	this._patternSe = -2;
	this._stepSeDelay = 0;
	this._stepSeOn = true;
	this._stepSeFrames = [];
	this._stopSteps = true;
	for (let i = 0; i < Galv.CFSTEP.frames.length; i++) {
		this._stepSeFrames[i] = Number(Galv.CFSTEP.frames[i]);
	}
};

Game_CharacterBase.prototype.playStepSE = function(volMod) {
	if (this._stepSeDelay < Galv.CFSTEP.delay) return;
	let tSe = Galv.CFSTEP.terrainSounds[$gameMap.terrainTag(this._x,this._y)];
	if (tSe) {
		const tVol = Number(tSe.volume);
		if (volMod) tSe.volume = tSe.volume * volMod;
		tSe.volume = tSe.volume + (Math.random() * 16) - 8;
		
		const tPit = Number(tSe.pitch);
		tSe.pitch = tSe.pitch + (Math.random() * 16) - 8;
		
		AudioManager.playSe(tSe);
		tSe.volume = Number(tVol);
		tSe.pitch = Number(tPit);
		
		this._stepSeDelay = 0;
	};
};

Game_CharacterBase.prototype.isStep = function(pat) {
	return this._stepSeFrames.contains(pat)
};


//-----------------------------------------------------------------------------
//  GAME PLAYER
//-----------------------------------------------------------------------------

Galv.CFSTEP.Game_Player_update = Game_Player.prototype.update;
Game_Player.prototype.update = function(sceneActive) {
	Galv.CFSTEP.Game_Player_update.call(this,sceneActive);
	this.updateStepSe();
};

Game_Player.prototype.updateStepSe = function() {
	this._stepSeDelay++;

	if (!this._stepSeOn || this.idleTime || this._vehicleType != "walk") return;
	const pat = this.pattern();
	if (this.isStep(pat)) {
		if (this._patternSe != pat && this.isMoving() && this.hasWalkAnime()) {
			this.playStepSE();
			this._patternSe = pat;
			this._stopSteps = false;
		}
	} else {
		if (this._stopCount == 1 && this.hasWalkAnime() && !this._stopSteps) {
			this.playStepSE(0.5);
			this._stopSteps = true;
		};
		this._patternSe = -1;
	}
};


//-----------------------------------------------------------------------------
//  GAME EVENT
//-----------------------------------------------------------------------------

if (Galv.CFSTEP.events) {
	Galv.CFSTEP.Game_Event_refresh = Game_Event.prototype.refresh;
	Game_Event.prototype.refresh = function() {
		Galv.CFSTEP.Game_Event_refresh.call(this);
		this.setStepSe();
	};
	
	Game_Event.prototype.setStepSe = function() {
		if (this.event().note.contains("<step_se>") && this._characterName != "") {
			this._stepSeOn = true;
		} else {
			const page = this.page();
			let stepSe = false;
			if (page) {
				for (let i = 0; i < page.list.length; i++) {
					if (page.list[i].code == 108 && page.list[i].parameters[0].contains("<step_se>")) {
						stepSe = true;
					};
				};
			};
			this._stepSeOn = stepSe;
		};
	};
	
	Galv.CFSTEP.Game_Event_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function(sceneActive) {
		Galv.CFSTEP.Game_Event_update.call(this,sceneActive);
		this.updateStepSe();
	};
	
	Game_Event.prototype.updateStepSe = function() {
		if (!this._stepSeOn) return;
		var pat = this.pattern();
		if (this.isStep(pat)) {
			if (this._patternSe != pat && this.isMoving() && this.hasWalkAnime()) {
				this.playStepSE();
				this._patternSe = pat;
			}
		} else {
			this._patternSe = -1;
		}
		this._stepSeDelay++;
	};
}; // end if (Galv.CFSTEP.events)