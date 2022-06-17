//-----------------------------------------------------------------------------
//  Galv's Step Effects MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_StepEffectsMZ.js
//-----------------------------------------------------------------------------
//  Future idea: Map specific overrides
//  2020-12-10 - Version 1.1 - added ability to prevent vehicle types from
//                             activating step effect
//  2020-11-06 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_StepEffects = true;

var Galv = Galv || {};        // Galv's main object
Galv.SE = Galv.SE || {};      // Galv's plugin object
Galv.SE.pluginName = "GALV_StepEffectsMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.1) Spawn events, run common event or other effect when player or event steps on a tile
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param terrains
 * @text Player Terrain Steps
 * @desc Build the step settings for each terrain id.
 * @type struct<Terrains>[]
 *
 * @param regions
 * @text Player Region Steps
 * @desc Build the step settings for each region id. NOTE: region settings take priority over terrain settings.
 * @type struct<Regions>[]
 *
 * @param eTerrains
 * @text Event Terrain Steps
 * @desc Build the step settings for each terrain id.
 * @type struct<Terrains>[]
 *
 * @param eRegions
 * @text Event Region Steps
 * @desc Build the step settings for each region id. NOTE: region settings take priority over terrain settings.
 * @type struct<Regions>[]
 *
 * @help
 *   Galv's Step Effects MZ
 * ----------------------------------------------------------------------------
 * This plugin allows you to do certain actions when the player moves to a new
 * tile of a certain terrain tag or region. These actions include:
 *
 * - spawn an event at the player's position (requires Galv's Event Spawner)
 * - run a common event
 * - play a sound effect
 * - run script code
 *
 * There are separate settings for if player steps on terrain or regions and
 * also separate settings for events stepping on terrain or regions.
 * These are set up so that region settings take priority over the terrain
 * settings. If there are settings for both, only the region settings apply
 * for any particular type (eg. spawn, common event, sound effect, etc.)
 *
 * NOTE: There is currently no way to get the event that stood on a tile into
 * into a common event via this plugin. Advanced users can use script for that
 * functionality.
 *
 * ----------------------------------------------------------------------------
 *  Event NOTE tag
 * ----------------------------------------------------------------------------
 * Events will not trigger the step effect unless you add the below tag to the
 * 'Note:' field at the top of the event edit window.
 *
 *    <stepEffects>
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT calls
 * ----------------------------------------------------------------------------
 * Below can be used in SCRIPT commands.
 *
 *    Galv.SE.enabled(x);    // x can be true to enable, false to disable.
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT calls in MOVE ROUTES (Advanced Users)
 * ----------------------------------------------------------------------------
 * Below can be used in SCRIPT command in a MOVE ROUTE (or if you are referring
 * to an event/character directly).
 *
 *    this.stepChar()  // Use in a spawned event (Galv's Spawn Events plugin).
 *                     // This will return an event or the player if either of
 *                     // those were the character that spawned the event via
 *                     // the step setting. If neither, returns this (itself).
 *
 * ----------------------------------------------------------------------------
 *  Other SCRIPT (Advanced Users)
 * ----------------------------------------------------------------------------
 *
 *    $gamePlayer.getPreviousStep(type);   // returns tile data of the previous
 *                                         // step the player took.
 *                                         // 'r'  = region id
 *                                         // 't'  = terrain tag
 *                                         // 'xy' = [x,y] location (array)
 *
 *    $gameMap.event(id).getPreviousStep(type);  // as above but with event
 *
 * ----------------------------------------------------------------------------
 * 
 */
 
 /*~struct~Terrains:
 *
 * @param id
 * @text Terrain Id
 * @desc The terrain id of the tile (as seen in the database tileset settings). You can use 1-7.
 *
 * @param seid
 * @text Spawn Event Id
 * @desc (Requires Galv's Event Spawner Plugin). Spawn that event at the player's position.
 *
 * @param ceid
 * @text Common Event Id
 * @desc Run that common event on step. Note: It will run AFTER a current event has finished.
 *
 * @param se
 * @text Sound Effect
 * @desc SE_Name,volume,pitch,variance
 *
 * @param script
 * @text Script code
 * @desc Use javascript code with variables: this, x, y, t, r, c. (t = terrain tag, r = region id, c = character id).
 *
 * @param prevent
 * @text Prevent Vehicle Types
 * @desc separate by commas, you can prevent walk, boat, ship airship here from playing the step effect. (Player Only)
 *
 * @param notes
 * @text Notes
 * @desc Does nothing but you can leave a note to remind what this step is for.
 *
 */
 /*~struct~Regions:
 *
 * @param id
 * @text Region Id
 * @desc The region id of the tile. You can use 1-255.
 *
 * @param seid
 * @text Spawn Event Id
 * @desc (Requires Galv's Event Spawner Plugin). Spawn that event at the player's position.
 *
 * @param ceid
 * @text Common Event Id
 * @desc Run that common event on step. Note: It will run AFTER a current event has finished.
 *
 * @param se
 * @text Sound Effect
 * @desc SE_Name,volume,pitch,variance
 *
 * @param script
 * @text Script code
 * @desc Use javascript code with variables: this, x, y, t, r, c. (t = terrain tag, r = region id, c = character id).
 *
 * @param prevent
 * @text Prevent Vehicle Types
 * @desc separate by commas, you can prevent walk, boat, ship airship here from playing the step effect. (Player Only)
 *
 * @param notes
 * @text Notes
 * @desc Does nothing but you can leave a note to remind what this step is for.
 *
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.SE.storeMax = 3;  			// maximum previous step data stored
Galv.SE.terrainEffects = {};	// object containing effects for player terrains.
Galv.SE.regionEffects = {};		// object containing effects for player regions.
Galv.SE.eTerrainEffects = {};	// object containing effects for event terrains.
Galv.SE.eRegionEffects = {};	// object containing effects for event regions.

Galv.SE.BuildSoundEffect = function(string) {
	if (!string) return false;
	let v = string.split(",");
	return {name:v[0],volume:Number(v[1]),pitch:Number(v[2]),pan:0};
};

Galv.SE.buildSettings = function(obj,type) {
	const string = PluginManager.parameters(Galv.SE.pluginName)[type];
	if (string) {
		let t = JSON.parse(string);
		for (let i = 0; i < t.length; i++) {
			const settings = JSON.parse(t[i]);
			settings.se = Galv.SE.BuildSoundEffect(settings.se); // convert sound effect to object
			settings.prevent = settings.prevent.split(",");
			Galv.SE[obj][settings.id] = settings; // store settings into specified step effect object, using region or terrain id as identifier
		};
	};
};

Galv.SE.enabled = function(status) {
	$gameSystem._disableStepEffects = !status;
};

// Build all settings
Galv.SE.buildSettings('terrainEffects','terrains');   // player terrain effects
Galv.SE.buildSettings('regionEffects','regions');     // player region effects
Galv.SE.buildSettings('eTerrainEffects','eTerrains'); // event terrain effects
Galv.SE.buildSettings('eRegionEffects','eRegions');   // event region effects


// GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.SE.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.SE.Game_System_initialize.call(this);
	this._disableStepEffects = false;
	this._stepEffects = {}; // object containing override effects that differ from plugin settings setup. MapId as identifier.
};


// GAME CHARACTER
//-----------------------------------------------------------------------------
// create previous region and previous terrain variables

Galv.SE.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
	Galv.SE.Game_CharacterBase_initMembers.call(this);
	this._stepEffectPrevious = []; // array of position data objects
};

Game_CharacterBase.prototype.storeStepPos = function(t,r,x,y) {
	// store previous positional data to compare with current step.
	let data = {region:r,terrain:t,xy:[x,y]};
	this._stepEffectPrevious.unshift(data); // put data at front of array
	if (this._stepEffectPrevious.length > Galv.SE.storeMax) this._stepEffectPrevious.pop(); // remove last element
};

Game_CharacterBase.prototype.getPreviousStep = function(type,steps = 0) {
	let value = 0;
	let index = Math.min(1 + steps,Galv.SE.storeMax - 1);
	return this._stepEffectPrevious[index] ? this._stepEffectPrevious[index][type] : 0;
};

Game_CharacterBase.prototype.doStepEffect = function() {
	if ($gameSystem._disableStepEffects) return;
	const x = this.x;
	const y = this.y;
	const t = $gameMap.terrainTag(x,y);
	const r = $gameMap.regionId(x,y);
	const c = this.stepCharacterId(); // The id of the character doing the step.
	
	// store previous data
	this.storeStepPos(t,r,x,y); // to used to do things based on travelling from one terrain to another or one region to another

	// declare effects
	let spawnEventId = this.stepEffectVal('seid',t,r);   // 0
	let commonEventId = this.stepEffectVal('ceid',t,r);  // 1
	let soundEffect = this.stepEffectVal('se',t,r);      // 2
	let script = this.stepEffectVal('script',t,r);       // 3
	

	// do effects if they exist
	if (spawnEventId && Galv.SPAWN) Galv.SPAWN.event(spawnEventId,'xy',[x,y],'all',false,c);   // Add reference to character here?
	if (commonEventId) $gameTemp.reserveCommonEvent(commonEventId);
	if (soundEffect) AudioManager.playSe(soundEffect);
	if (script) eval(script);
};

Game_CharacterBase.prototype.stepEffectVal = function(name,tid,rid) {
	return null;
};

Game_CharacterBase.prototype.stepCharacterId = function() {
	return 0;
};

Game_Event.prototype.stepChar = function() {
	if (!this._spawnCharId) return this;
	// Used with GALV_EventSpawnerMZ to get the target of a spawned event
	if (this._spawnCharId < 0) {
		return $gamePlayer;
	} else {
		return $gameMap.event(this._spawnCharId);
	}
};


// GAME EVENT
//-----------------------------------------------------------------------------

Galv.SE.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
	Galv.SE.Game_Event_initialize.call(this,mapId,eventId);
	this.setupStepEffects();
};

Game_Event.prototype.setupStepEffects = function() {
	this.useStepEffects = this.event().meta.stepEffects || false;
};

Galv.SE.Game_Event_updateStop = Game_Event.prototype.updateStop;
Game_Event.prototype.updateStop = function() {
	if (this.useStepEffects) this.updateStepEffect();
	Galv.SE.Game_Event_updateStop.call(this);
};

Game_Event.prototype.updateStepEffect = function() {
	if (this._stopCount == 0) this.doStepEffect();
};

Game_Event.prototype.stepEffectVal = function(name,tid,rid) {
	let effect = Galv.SE.eRegionEffects[rid] || Galv.SE.eTerrainEffects[tid]; // region takes priority over terrain
	return effect ? effect[name] : null;
};

Game_Event.prototype.stepCharacterId = function() {
	return this.eventId();
};


// GAME PLAYER
//-----------------------------------------------------------------------------

Galv.SE.Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving;
Game_Player.prototype.updateNonmoving = function(wasMoving, sceneActive) {
	if (wasMoving) {
 		this.doStepEffect();
    }
	Galv.SE.Game_Player_updateNonmoving.call(this, wasMoving, sceneActive);
};

Game_Player.prototype.stepEffectVal = function(name,tid,rid) {
	let effect = this.checkStepEffect(Galv.SE.regionEffects[rid]) || this.checkStepEffect(Galv.SE.terrainEffects[tid]); // region takes priority over terrain
	return effect ? effect[name] : null;
};

Game_Player.prototype.checkStepEffect = function(obj) {
	if (obj && obj.prevent.includes(this._vehicleType)) return null;
	return obj;
};

Game_Player.prototype.stepCharacterId = function() {
	return -1;
};