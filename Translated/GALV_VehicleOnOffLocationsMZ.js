//-----------------------------------------------------------------------------
//  Galv's Vehicle On/Off Locations MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_VehicleOnOffLocationsMZ.js
//-----------------------------------------------------------------------------
//  Version 1.0
//  2020-12-05 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_VehicleOnOffLocations = true;

var Galv = Galv || {};          // Galv's main object
Galv.VOOL = Galv.VOOL || {};    // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Restrict the player from getting on or off boats, ships and
 * airships by using region ID's and/or terrain tag ID's 
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @name Boat Regions
 * @param BoatR
 * @desc Region ID's separated by commas
 * Where player can get on/off the "Boat" vehicle
 * @default
 *
 * @name Boat Terrains
 * @param BoatT
 * @desc Terrain ID's separated by commas
 * Where player can get on/off the "Boat" vehicle
 * @default
 *
 * @name Ship Regions
 * @param ShipR
 * @desc Region ID's separated by commas
 * Where player can get on/off the "Ship" vehicle
 * @default
 *
 * @name Ship Terrains
 * @param ShipT
 * @desc Terrain ID's separated by commas
 * Where player can get on/off the "Ship" vehicle
 * @default
 *
 * @name Airship Regions
 * @param AirshipR
 * @desc Region ID's separated by commas
 * Where player can get on/off the "Airship" vehicle
 * @default
 *
 * @name Airship Terrains
 * @param AirshipT
 * @desc Terrain ID's separated by commas
 * Where player can get on/off the "Airship" vehicle
 * @default
*
 * @help
 *   Galv's Vehicle On/Off Locations MZ
 * ----------------------------------------------------------------------------
 * Use the settings to specify which regions/terrain tags you want to use for
 * each default vehicle (boat, ship, airship).
 * Regions are made by going to the "R" tab found on the left when selecting
 * tiles to place on the map.
 * Terrain tags are set in the database "Tilesets" tab by pressing the
 * "Terrain Tag" button on the right and clicking on tiles to change the id.
 *
 * A player can only get on each vehicle if they are standing ON a region or
 * terrain tag specified for them in the settings. They can only get off that
 * vehicle if they will disembark ONTO that region or terrain tag.
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {
	const gpar = PluginManager.parameters('Galv_VehicleOnOffLocationsMZ');
 	for(let propertyName in gpar) {
		Galv.VOOL[propertyName] = function() {
			array = gpar[propertyName].split(",");
			if (array[0] === "") return [];
			return array.map(Number);
		}();
	};
}());


//  GAME PLAYER
//-----------------------------------------------------------------------------

// GAME PLAYER GET OFF VEHICLE 
Galv.VOOL.Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
Game_Player.prototype.getOffVehicle = function() {
	allowed = this.checkOnOffLocation(false);
	if (!allowed) return;
    Galv.VOOL.Game_Player_getOffVehicle.call(this);
};
 
Galv.VOOL.Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function() {
	allowed = this.checkOnOffLocation(true);
	if (!allowed) return;
    Galv.VOOL.Game_Player_getOnVehicle.call(this);
};

Game_Player.prototype.checkOnOffLocation = function(on) {
	const direction = this.direction();
    const x1 = this.x;
    const y1 = this.y;
	const x2 = $gameMap.roundXWithDirection(x1, direction);
	const y2 = $gameMap.roundYWithDirection(y1, direction); 
	
	if (on) {
		// When getting on
		if ($gameMap.airship().pos(x1, y1)) {
			if (!this.onOffAllowed("Airship",x1,y1)) return false;
		} else if ($gameMap.ship().pos(x2, y2)) {
			if (!this.onOffAllowed("Ship",x1,y1)) return false;
		} else if ($gameMap.boat().pos(x2, y2)) {
			if (!this.onOffAllowed("Boat",x1,y1)) return false;
		};
		return true;
	} else {
		// When getting off
		if (this.isInAirship()) {
			if (!this.onOffAllowed("Airship",x1,y1)) return false;
		} else if (this.isInShip()) {
			if (!this.onOffAllowed("Ship",x2,y2)) return false;
		} else if (this.isInBoat()) {
			if (!this.onOffAllowed("Boat",x2,y2)) return false;
		};
	};
	return true;
};
 
Game_Player.prototype.onOffAllowed = function(vname,x,y) {
	 let success = false;
	 // Check Regions
	 
	 for (i = 0; i < Galv.VOOL[vname + "R"].length; i++) {
		let rid = $gameMap.regionId(x,y);
		if (Galv.VOOL[vname + "R"].indexOf(rid) > -1) success = true;
	 }
	 // Check Terrain Tags
	 for (i = 0; i < Galv.VOOL[vname + "T"].length; i++) {
		let tid = $gameMap.terrainTag(x,y);
		if (Galv.VOOL[vname + "T"].indexOf(tid) > -1) success = true;
	}
	return success;
};