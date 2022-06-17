//-----------------------------------------------------------------------------
//  Galv's Event Spawner MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_EventSpawnerMZ.js
//-----------------------------------------------------------------------------
//  2020-10-27 - Version 1.2 - added compatibility code with Step Effects plugin
//  2020-10-24 - Version 1.1 - fixed crashingbug with animations when unspawning
//  2020-09-26 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_EventSpawner = true;

var Galv = Galv || {};              // Galv's main object
Galv.SPAWN = Galv.SPAWN || {};      // Plugin object
Galv.SPAWN.pluginName = "GALV_EventSpawnerMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.2) Spawn events from a specified spawn map to a desired location.
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param mId
 * @text Spawn Map Id
 * @desc The map ID of the map you are using to store spawnable events
 * @default 0
 *
 *
 * @command spawnEvent
 * @text Spawn Event
 * @desc Spawn an event on the current map with certain settings
 *
 * @arg eventId
 * @default 0
 * @text Event ID
 * @desc The ID of the event you want to spawn from the spawn map.
 *
 * @arg locationType
 * @text Spawn Location Type
 * @type select
 * @desc Select how you want to spawn this event.
 * @default xy
 * @option XY Location
 * @value xy
 * @option Region List
 * @value regions
 *
 * @arg locationData
 * @text Location Data
 * @desc If Location Type is XY, use x,y values. If Regions, list region id's separated by commas.
 * @default 0,0
 *
 * @arg overlapType
 * @text Spawn Overlap Type
 * @type select
 * @desc If the spawn location is blocked, specify what you want the event to spawn on and overlap.
 * @default none
 * @option Overlap None
 * @value none
 * @option Overlap All
 * @value all
 * @option Overlap Terrain
 * @value terrain
 * @option Overlap Characters
 * @value chars
 *
 * @arg saveEvent
 * @text Save Event
 * @desc true makes event permanent, false means event will disappear when player leaves the map.
 * @type boolean
 * @default false
 *
 *
 * @command clearEvents
 * @text Clear Events
 * @desc Clear spawned events on specified map.
 *
 * @arg mapId
 * @text MapId
 * @desc Select the map id you'd like to clear spawned events. 0 for current map.
 * @default 0
 *
 * @arg clearType
 * @text Clear Type
 * @type select
 * @desc Which events do you want to clear?
 * @default normal
 * @option Only Non-Saved Events
 * @value normal
 * @option All Spawned Events
 * @value all
 *
 *
 * @help
 *   Galv's Event Spawner
 * ----------------------------------------------------------------------------
 * This plugin allows you to copy events from a specified 'spawn' map and
 * duplicate them onto the current map. This spawn map is designated with the
 * "Spawn Map Id" plugin setting.
 * You can spawn to an x,y location or a random region ID.
 *
 * When spawning an event via x,y location, if the location is blocked and
 * the specified Overlap Type does not allow it to spawn on top of whatever is
 * blocking it, the event won't spawn at all.
 *
 * When spawning an event to a random region, it will not select any region
 * tiles that are blocked that the specified Overlap Type does not allow.
 *
 * 'Saved' events work like normal events. They only save their starting
 * location (where they were spawned). When the player leaves the map and then
 * comes back, they will be at their originally spawned location.
 *
 * Don't go crazy spawning events. Slower devices will struggle with too many
 * events on a map.
 *
 * ----------------------------------------------------------------------------
 *  PLUGIN Commands
 * ----------------------------------------------------------------------------
 * Plugin commands are available for spawning and clearing events.
 * For more experienced users, the script calls are also available below.
 *
 * In order to unspawn a single event, you need to use the script call from
 * the SCRIPT Commands section below.
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT Commands
 * ----------------------------------------------------------------------------
 *
 *    Galv.SPAWN.event(eventId,'type',[data],'overlap',save); 
 *
 *      // Spawn event to x,y coords
 *      // eventId = id of the event from the spawn map that you want to spawn
 *      // type    = 'xy' or 'regions' depending where you want to spawn event
 *                   'xy' spawns on a specific x,y location
 *                   'regions' spawns on a rangom region in the data specified
 *      // data    = [x,y] if using 'xy' type above
 *                   [id,id,id,id,id] if using 'regions' above
 *      // overlap = 'all', 'chars' or 'terrain'.
 *                   'all' event will spawn on top of anything
 *                   'terrain' event will spawn blocking terrain but not chars
 *                   'chars' event will spawn on events/player but not terrain
 *      // save    = true or false. true means events will be saved and stay
 *                   on the map if the player leaves. false means the event
 *                   will disappear when player leaves the map.
 *
 *    
 *
 *    Galv.SPAWN.clear(mapId);         // Remove normal spawned events from map
 *    Galv.SPAWN.clear(mapId,true);    // Remove ALL spawned events inc. saved
 *                                     // Make MapID = 0 to clear current map
 *
 *    Galv.SPAWN.unspawn(this);        // Unspawns event code is executed in.
 *
 * ----------------------------------------------------------------------------
 * EXAMPLES
 * Galv.SPAWN.event(3,'xy',[5,20],'all'); // event 3 at x5 y20 on top of all
 * Galv.SPAWN.event(5,'regions',[1],'all'); // event 5 at rand region 1 on all
 * Galv.SPAWN.clear(0); // Remove normal events on current map
 * Galv.SPAWN.clear(9,true); // Remove normal and saved events on map 9
 * ----------------------------------------------------------------------------
 *   SCRIPT for CONTROL VARIABLES
 * ----------------------------------------------------------------------------
 * As soon as you spawn an event, you can use the following script inside a
 * Control Variables event command to store the event ID of the last spawned
 * event.
 *
 *      $gameMap._lastSpawnEventId
 *
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

PluginManager.registerCommand(Galv.SPAWN.pluginName, "spawnEvent", args => {
	const id = Number(args.eventId);
	const locType = args.locationType;
	const locData = args.locationData.split(",").map(function(item) { return Number(item); });
	const overlapType = args.overlapType;
	const save = args.saveEvent == "true";

	Galv.SPAWN.event(id,locType,locData,overlapType,save);
});

PluginManager.registerCommand(Galv.SPAWN.pluginName, "clearEvents", args => {
	const id = Number(args.mapId);
	const clearSaved = args.clearType == 'all';
	Galv.SPAWN.clear(id,clearSaved);
});

Galv.SPAWN.spawnMapId = Number(PluginManager.parameters(Galv.SPAWN.pluginName)["mId"]);
Galv.SPAWN.sSwitches = ["A","B","C","D"];
Galv.SPAWN.scenes = ['Scene_Map'];

Galv.SPAWN.onScene = function() {
	if (Galv.SPAWN.scenes.indexOf(SceneManager._scene.constructor.name) > -1) return true; 
	return false;
};

Galv.SPAWN.event = function(eventId,type,data,overlap,save,targetId = 0) {
	if (!Galv.SPAWN.onScene()) return; // only run on the scene specified (Scene_Map)
	$gameMap._spawnOverlapType = overlap;
	if (type == "regions") {
		// Spawn on random region
		const coords = Galv.SPAWN.randomRegion(data);
		if (coords) $gameMap.spawnEvent(eventId,coords[0],coords[1],save);
	} else if (type == "xy") {
		// Spawn X,Y position
		const x = data[0];
		const y = data[1];
		if (Galv.SPAWN.canSpawnOn(x,y)) $gameMap.spawnEvent(eventId,x,y,save,targetId);
	};
};

Galv.SPAWN.randomRegion = function(regions) {
	let possible = [];
	const width = $gameMap.width();
	const height = $gameMap.height();
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			if (Galv.SPAWN.canSpawnOn(x,y,regions)) possible.push([x,y]);
		};
	};
	// Randomize between possible spawning coordinates
	return possible[Math.floor(Math.random() * possible.length)];
};

Galv.SPAWN.canSpawnOn = function(x,y,regions) {
	const region = $gameMap.regionId(x,y);
	if (regions && !regions.contains(region)) return false;                              // Incorrect region
	if ($gameMap._spawnOverlapType != 'all') {
		if ($gameMap._spawnOverlapType != 'chars') {
			if ($gameMap.eventsXy(x, y).length > 0) return false;                        // No spawning on other events
			if ($gamePlayer.x == x && $gamePlayer.y == y) return false;                  // No spawning on player
			if (Game_CharacterBase.prototype.isCollidedWithVehicles(x,y)) return false;  // No colliding with vehicles
		};
		if ($gameMap._spawnOverlapType != 'terrain') {
			if (!$gameMap.isPassable(x,y)) return false;
		};
	};
	return true;
};

Galv.SPAWN.clear = function(mapId,clearSaved) {
	mapId = mapId || $gameMap._mapId; // 0 is to target current map
	if (mapId == $gameMap._mapId) {
		// same map clear
		if (Galv.SPAWN.onScene()) SceneManager._scene._spriteset.clearSpawnedEvents(clearSaved);
		$gameMap.clearSpawnedEvents(mapId,clearSaved);
	} else if (clearSaved) {
		// clear save on another map
		const sEvents = $gameMap._savedSpawnedEvents[mapId]
		for (let eId in sEvents) {
			Galv.SPAWN.clearSSwitches(mapId,eId);
		}
		$gameMap._savedSpawnedEvents[mapId] = {};
	}
};

Galv.SPAWN.clearSSwitches = function(mapId,eventId) {
	for (let s = 0; s < Galv.SPAWN.sSwitches.length; s++) {
		let key = mapId + "," + eventId + "," + Galv.SPAWN.sSwitches[s];
		$gameSelfSwitches.setValue(key,false);
	};
};

Galv.SPAWN.unspawn = function(obj) {
	const eId = Number(obj.eventId());
	if ($gameMap._events[eId].isSpawnEvent) {
		$gameMap.unspawnEvent(eId);
		if (Galv.SPAWN.onScene()) SceneManager._scene._spriteset.unspawnEvent(eId); // eId undefined?
	};
};


// DATA MANAGER
//-----------------------------------------------------------------------------

DataManager.loadSpawnMapData = function() {
	const mapId = Galv.SPAWN.spawnMapId;
    if (mapId > 0) {
        const filename = 'Map' + mapId.padZero(3) + '.json';
        this.loadDataFile('$dataSpawnMap', filename);
    } else {
        window.alert("ERROR: You didn't set a spawn map ID. Choose a map from your map list to use for the spawn map.")
    }
};

Galv.SPAWN.DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
	if (object === $dataSpawnMap) {
        this.extractMetadata(object);
        array = object.events;
	
		if (Array.isArray(array)) {
			for (let i = 0; i < array.length; i++) {
				let data = array[i];
				if (data && data.note !== undefined) {
					this.extractMetadata(data);
            	}
			}
		}
	}
	Galv.SPAWN.DataManager_onLoad.call(this,object);	
};

DataManager.loadSpawnMapData();


// GAME MAP
//-----------------------------------------------------------------------------

Galv.SPAWN.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	this._spawnOverlapType = 'none';
	this._savedSpawnedEvents = {};
	Galv.SPAWN.Game_Map_initialize.call(this);
};

Galv.SPAWN.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	this._savedSpawnedEvents[mapId] = this._savedSpawnedEvents[mapId] || {};
	Galv.SPAWN.Game_Map_setup.call(this,mapId);
};

Galv.SPAWN.Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
	Galv.SPAWN.Game_Map_setupEvents.call(this);
	$gameMap.setupSpawnEvents();
};

Game_Map.prototype.setupSpawnEvents = function() {
	// Adds saved spawn events to event list
	for (let eId in this._savedSpawnedEvents[this._mapId]) {
		const event = this._savedSpawnedEvents[this._mapId][eId];
		const x = event.x;
		const y = event.y;
		const id = event.id;
		this._events[eId] = new Game_SpawnEvent(this._mapId,eId,x,y,id,true);
	};
};

Game_Map.prototype.spawnEvent = function(id,x,y,save,targetId) {
	// Get highest event id available
    const eId = this._events.length;
	// Add to most recent spawn event variable
	this._lastSpawnEventId = Number(eId);
	// Add event to event list
    this._events[eId] = new Game_SpawnEvent(this._mapId,eId,x,y,id,save,targetId);
	
	// Add save data if save
	if (save) this._savedSpawnedEvents[this._mapId][eId] = {id: id, x:x, y:y, eId: eId};
	if (Galv.SPAWN.onScene()) SceneManager._scene._spriteset.createSpawnEvent(eId);
};

Game_Map.prototype.spawnedEvents = function(includeSaved) {
	let array = [];
	for (let i = 0; i < this._events.length; i++) {
		if (this._events[i] && this._events[i].isSpawnEvent) {
			if (!this._events[i].isSavedEvent || (this._events[i].isSavedEvent && includeSaved)) {
				array.push(i);
			};
		};
	};
	return array;
};

Game_Map.prototype.unspawnEvent = function(eId) {
	this._events[eId] = null;
	Galv.SPAWN.clearSSwitches(this._mapId,eId);
	delete(this._savedSpawnedEvents[this._mapId][eId]);
};

Game_Map.prototype.clearSpawnedEvents = function(mapId,clearSaved) {
	// clear normal
	const sList = this.spawnedEvents(clearSaved);
	for (let i = 0; i < sList.length; i++) {
		const eId = this._events[sList[i]]._eventId;
		// clear self switches
		Galv.SPAWN.clearSSwitches(mapId,eId);
		// remove event
		this._events[sList[i]] = null;
		// remove from saved list
		delete(this._savedSpawnedEvents[this._mapId][eId]);
	};
	// remove all null events from end of event to prevent array bloat
	this.removeNullEvents();
};

Game_Map.prototype.removeNullEvents = function() {
	for (let i = this._events.length - 1; i > 0; i--) {
		if (this._events[i] === null) {
			this._events.splice(i, 1);
		} else {
			break;
		};
	};
};


// SPRITESET MAP
//-----------------------------------------------------------------------------

Galv.SPAWN.Sprite_Animation_targetSpritePosition = Sprite_Animation.prototype.targetSpritePosition;
Sprite_Animation.prototype.targetSpritePosition = function(sprite) {
	// if sprite was unspawned... make it play in last position it was at instead of crashing.
	if (sprite.unspawned) return new Point(this._targets[0].x, this._targets[0].y);
    return Galv.SPAWN.Sprite_Animation_targetSpritePosition.call(this,sprite);
};

Spriteset_Map.prototype.unspawnEvent = function(eId) {
	for (let i = 0; i < this._characterSprites.length; i++) {
		const event = this._characterSprites[i]._character;
		if (event.isSpawnEvent && eId == event._eventId) {
			this._characterSprites[i].unspawned = true;
			this._tilemap.removeChild(this._characterSprites[i]);
		};
	};
};

Spriteset_Map.prototype.clearSpawnedEvents = function(clearSaved) {
	for (let i = 0; i < this._characterSprites.length; i++) {
		const event = this._characterSprites[i]._character;
		if (event.isSpawnEvent) {
			if (!event.isSavedEvent || (event.isSavedEvent && clearSaved)) {
				if (Imported.Galv_BasicEventShadows) this.destroyBShadow(event._eventId,event);
				this._tilemap.removeChild(this._characterSprites[i]);
			};
		};
	};
};

Spriteset_Map.prototype.createSpawnEvent = function(id) {
	const event = $gameMap._events[id];
	const sId = this._characterSprites.length;
	this._characterSprites[sId] = new Sprite_Character(event);
	this._characterSprites[sId].update(); // To remove occsaional full-spriteset visible issue
	this._tilemap.addChild(this._characterSprites[sId]);
	this.createSpawnExtras(id,event);
};

Spriteset_Map.prototype.createSpawnExtras = function(id,character) {
	if (Imported.Galv_BasicEventShadows) this.createBShadow(id,character); // works except if shadows are turned off when creating? Look into this.
};


// GAME SPAWN EVENT
//-----------------------------------------------------------------------------

function Game_SpawnEvent() {
    this.initialize.apply(this, arguments);
}

Game_SpawnEvent.prototype = Object.create(Game_Event.prototype);
Game_SpawnEvent.prototype.constructor = Game_SpawnEvent;

Game_SpawnEvent.prototype.initialize = function(mapId,eventId,x,y,spawnEventId,saveEvent,targetId) {
	this._spawnX = x;
	this._spawnY = y;
	this._spawnEventId = spawnEventId;
	this.isSpawnEvent = true;
	this.isSavedEvent = saveEvent;
	Game_Event.prototype.initialize.call(this,mapId,eventId);
	this._spawnCharId = targetId;
	DataManager.extractMetadata(this.event());
};

Game_SpawnEvent.prototype.event = function() {
    return $dataSpawnMap.events[this._spawnEventId];
};

Game_SpawnEvent.prototype.locate = function() {
    Game_Event.prototype.locate.call(this, this._spawnX, this._spawnY);
};