//-----------------------------------------------------------------------------
//  Galv's Map Travel
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  Galv_MapTravelMZ.js
//-----------------------------------------------------------------------------
//  2020-09-07 - Version 1.1 - code tweaks, added ability to prevent player
//                             from cancelling out of the scene
//  2020-09-05 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MapTravel = true;

var Galv = Galv || {};        // Galv's main object
Galv.MAPT = Galv.MAPT || {};  // Plugin object
Galv.MAPT.pluginName = "GALV_MapTravelMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.1) A new scene allowing you to fast travel by selecting locations on a map
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param varMap
 * @text Transfer Map Variable
 * @type number
 * @desc The in game variable used to store map ID player will transfer to
 * @default 1
 *
 * @param xVar
 * @text Transfer X Variable
 * @type number
 * @desc The in game variable used to store the x coordinate the player will transfer to
 * @default 2
 *
 * @param yVar
 * @text Transfer Y Variable
 * @desc The in game variable used to store the y coordinate the player will transfer to
 * @default 3
 *
 * @param textConfirm
 * @text Confirm Text
 * @desc Text displayed in the confirm window for executing the travel
 * @default Travel
 *
 * @param textCancel
 * @text Cancel Text
 * @desc Text displayed in the confirm window for cancelling.
 * @default Cancel
 *
 * @param windowWidth
 * @text Confirm Window Width
 * @desc The width of the confirm window
 * @default 180
 *
 * @param spriteFrames
 * @text Default Location Frames
 * @type number
 * @desc The width of the confirm window
 * @default 3
 *
 * @param frameSpeed
 * @text Frame Speed
 * @type number
 * @desc The speed of the frame animation (smaller is faster)
 * @default 10
 *
 *
 * @command createMap
 * @text Create a Map
 * @desc Creates a map to call during game.
 *
 * @arg mapId
 * @text Map ID
 * @type number
 * @default 0
 * @desc The Identifying number of the map (doesn't have to be id of editor map)
 *
 * @arg mapImage
 * @text Map Image
 * @desc The name of the map graphic to use from /img/maptravel/
 *
 * @arg bgImages
 * @text Background Images
 * @type string[]
 * @defalt imagename,0,0,255
 * @desc List of background settings. Each should be: imagename,xmove,ymove,opacity
 *
 * @arg fgImages
 * @text Foreground Images
 * @type string[]
 * @defalt imagename,0,0,255
 * @desc List of foreground settings. Each should be: imagename,xmove,ymove,opacity
 *
 *
 * @command setLocation
 * @text Set a Location
 * @desc Create a location on a travel map you've created.
 *
 * @arg mapId
 * @text Map ID
 * @type number
 * @default 0
 * @desc The Identifying number of a map you created
 *
 * @arg name
 * @text Location Name
 * @desc The name of the location (also used to reference it)
 *
 * @arg image
 * @text Image Name
 * @desc The name of the location graphic to use from /img/maptravel/
 *
 * @arg mx
 * @text X Position
 * @type number
 * @default 0
 * @desc The x postion on your map graphic for the location
 *
 * @arg my
 * @text Y Position
 * @type number
 * @default 0
 * @desc The y postion on your map graphic for the location
 *
 * @arg tmid
 * @text Transfer Map Id
 * @type number
 * @default 0
 * @desc Transfer map id - the in-game map id to transfer to
 *
 * @arg tx
 * @text Transfer Map X
 * @type number
 * @default 0
 * @desc The in-game map x co-ordinate to transfer to
 *
 * @arg ty
 * @text Transfer Map Y
 * @type number
 * @default 0
 * @desc The in-game map y co-ordinate to transfer to
 *
 * @arg desc
 * @text Location Description
 * @desc Description displayed when location is selected. Use | symbol to specify a new line
 *
 * @arg f
 * @text Animation Frames
 * @type number
 * @default 3
 * @desc Frames of animation in your location image. Leave blank to use the plugin default
 *
 *
 * @command openMap
 * @text Open Map
 * @desc Opens the map travel scene choosing an id you've created
 *
 * @arg mapId
 * @text Map ID
 * @type number
 * @default 0
 * @desc The Identifying number of a map you created
 *
 * @arg preventCancel
 * @text Prevent Cancel
 * @type boolean
 * @default false
 * @desc If the player can cancel out of the map travel scene, true or false.
 *
 * @help
 *   Galv's
 * ----------------------------------------------------------------------------
 * This plugin creates a new scene the player can fast travel to a selected
 * location on a map image using mouse or keyboard.
 *
 * This plugin is not plug-and-play, users will require skills that allow them
 * to create their own map graphics and understand basic javascript (such as
 * arrays and string).
 *
 * ----------------------------------------------------------------------------
 *   GRAPHICS
 * ----------------------------------------------------------------------------
 *
 * Graphics in this map travel scene are located in a new folder (you will
 * need to add to your project):
 * YourProject/img/maptravel/
 *
 * The map graphic can be any size you wish and controls the size you scroll
 * around in the map travel scene.
 *
 * The location graphics can be any size also, but require 3 x the location
 * image's height to hold 3 frames. Each frame shows at different times:
 * Top: Default on the map
 * Middle: When location is selected
 * Bottom: When location is disabled
 * View the plugin demo for example location graphics
 *
 * Make sure you set your 3 location variables in the plugin settings and do
 * not use those variables for anything else in your game. These will hold the
 * mapid, x, y values to use in a "Transfer" event command.
 *
 *
 * ----------------------------------------------------------------------------
 *   PLUGIN COMMANDS
 * ----------------------------------------------------------------------------
 * Step 1. Create a map
 * ---------------------
 * To create a new map to use in the map travel scene, use the plugin command:
 *
 *        Create a Map
 *
 * This gives commands to allow you to specify the map image, background
 * images and foreground images for your map to use. Specify an id to refer to
 * this travel map that you created.
 *
 *
 * Step 2. Setting locations and objects
 * -------------------------------------
 * You can add as many locations to a map as required using the below script
 * call for each location added.
 *
 *        Set a Location
 *
 *
 * Step 3. Calling the scene
 * --------------------------
 * To open up the map travel scene for the player to fast travel to a location
 * that has been added to their map:
 *
 *        Open Map
 *
 *
 * All of this can be done via script calls as well.
 * Additional functionality can be done through script calls as well, read
 * further down to learn more.
 *
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALLS
 * ----------------------------------------------------------------------------
 * Step 1. Create a map
 * ---------------------
 * To create a new map to use in the map travel scene, use this script call:
 *
 *        Galv.MAPT.createMap(id,"mapImage",[[bg],[bg]],[[fg],[fg]]);
 *
 * INFO:
 * id          = a unique number to identify the map you created
 * "mapImage"  = the name of the map graphic to use from /img/maptravel/
 *               this image will determine the size of your map in the scene
 * [bg]        = an array to set up a background graphic behind the map image
 *               You can have as many bg arrays as desired each should have:
 *               ["bgimage",xmove,ymove,opacity]
 * [fg]        = works the same as bg arrays but instead for foreground images
 *               ["fgimage",xmove,ymove,opacity]
 *
 *
 *
 * Step 2. Setting locations and objects
 * -------------------------------------
 * You can add as many locations to a map as required using the below script
 * call for each location added.
 *
 *        Galv.MAPT.setLocation(id,"name","image",mx,my,tmid,tx,ty,"desc",f);
 *
 * INFO:
 * id          = the unique number identifying the map you created above
 * "name"      = the name of the location (also used to reference it)
 * "image"     = the name of the location graphic to use from /img/maptravel/
 *               this graphic requires 3 rows in the spritesheet for:
 *               top = normal, middle = active, bottom = disabled
 * mx          = the x postion on your map graphic for the location
 * my          = the y postion on your map graphic for the location
 * tmid        = transfer map id - the in-game map id to transfer to
 * tx          = the in-game map x co-ordinate to transfer to
 * ty          = the in-game map y co-ordinate to transfer to
 * "desc"      = a short description displayed when location is selected.
 *               Use the | symbol to specify a new line.
 * f           = frames of animation in your location image. Don't include
 *               this attribute to use the plugin setting default frames
 *
 * Note that you can use this setLocation to overwrite a previously set one
 * using the same name if you want to change it to something else.
 *
 * In addition to locations, you can add 'objects' that work in a similar
 * way but only have one row of graphics in the spritesheet and will not
 * appear in the location list.
 *
 *       Galv.MAPT.setObject(id,"name","image",mx,my,f);
 *       Galv.MAPT.removeObject(id,"name");
 *
 *
 * Step 3. Calling the scene
 * --------------------------
 * To open up the map travel scene for the player to fast travel to a location
 * that has been added to their map:
 *
 *         Galv.MAPT.openMap(id,p);    // unique id set above for map to open
 *                                     // if map isn't created nothing happens
 *                                     // p is true or false. if true, prevent
 *                                     // the player from cancelling out of
 *                                     // the map travel scene.
 *
 *
 *
 * Other Script Calls
 * -------------------
 *
 *   Galv.MAPT.hasMap(id)    // use in conditional branch 'script' to check if
 *                           // map has been created in the player's game yet
 *
 *   Galv.MAPT.mapSelected   // use in conditional branch after scene is run
 *                           // to check if player selected a location or not
 *
 *
 *   Galv.MAPT.initLocation(id,"name");  // set starting location of map scene to
 *                                       // this location on a particular map id
 *
 *   Galv.MAPT.enableLocation(id,"name",s);  // s can be true or false to
 *                                           // set the location "name" in the
 *                                           // map id to enabled or disabled
 *
 *   Galv.MAPT.removeLocation(id,"name");  // remove location from mapid list
 *
 *   Galv.MAPT.editLocation(id,"name","attribute",value);  // edit location
 *
 *   // id = the map id you are editing
 *   // "name" = the location name you are editing
 *   // "attribute" = the attribute you would like to edit. This can be:
 *   //               "image"         value = "imageName"
 *   //               "mapXY"         value = [x,y]
 *   //               "transfer"      value = [mapid,x,y]
 *   //               "desc"          value = "description here"
 *   // value = the value to change to. values for each attribute are above.
 *
 * EXAMPLE
 * Galv.MAPT.editLocation(0,"Your Mansion","desc","A new description!");
 *
 * Alternatively you could just overwrite the entire location by using
 * Galv.MAPT.setLocation(id,"name","image",mx,my,tmid,tx,ty,"desc");
 * and inputting the same name as you are overwriting.
 *
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.MAPT.plugin = PluginManager.parameters(Galv.MAPT.pluginName);
Galv.MAPT.mapVar = Number(Galv.MAPT.plugin["varMap"]);
Galv.MAPT.xVar = Number(Galv.MAPT.plugin["xVar"]);
Galv.MAPT.yVar = Number(Galv.MAPT.plugin["yVar"]);
Galv.MAPT.txtConfirm = Galv.MAPT.plugin["textConfirm"];
Galv.MAPT.txtCancel = Galv.MAPT.plugin["textCancel"];
Galv.MAPT.cWinWidth = Number(Galv.MAPT.plugin["windowWidth"]);
Galv.MAPT.defaultFrames = Number(Galv.MAPT.plugin["spriteFrames"]);
Galv.MAPT.fSpeed = Number(Galv.MAPT.plugin["frameSpeed"]);
Galv.MAPT.cancelled = false;
Galv.MAPT.active = 0;


// PLUGIN COMMANDS
//-----------------------------------------------------------------------------

PluginManager.registerCommand(Galv.MAPT.pluginName, "createMap", args => {
    const id = Number(args.mapId);
	const mapImage = args.mapImage;
	const backgrounds = Galv.MAPT.bgfgArray(args.bgImages);
	const foregrounds = Galv.MAPT.bgfgArray(args.fgImages);
	Galv.MAPT.createMap(id,mapImage,backgrounds,foregrounds);
});

PluginManager.registerCommand(Galv.MAPT.pluginName, "setLocation", args => {
	const mapid = Number(args.mapId);
	const mx = Number(args.mx);
	const my = Number(args.my);
	const tmid = Number(args.tmid);
	const tx = Number(args.tx);
	const ty = Number(args.ty);
	const frames = Number(args.f);
	Galv.MAPT.setLocation(mapid,args.name,args.image,mx,my,tmid,tx,ty,args.desc,frames);
});

PluginManager.registerCommand(Galv.MAPT.pluginName, "openMap", args => {
	const preventCancel = args.preventCancel == "false" ? false : true;
    Galv.MAPT.openMap(Number(args.mapId),preventCancel);
});

Galv.MAPT.bgfgArray = function(arrays) {
	arrays = arrays.split('",');
	for (let i = 0; i < arrays.length; i++) {
		let s = arrays[i];
		s = s.replace(/\[/g, '').replace(/\]/g, '').replace(/"/g, '');
		s = s.split(',');
		for (let i2 = 1; i2 < s.length; i2++) {
			s[i2] = Number(s[i2]);
		}
		arrays[i] = s;
	}
	return arrays;
};


Galv.MAPT.createMap = function(id,mapImage,backgrounds,foregrounds) {
	backgrounds = backgrounds || [];  // array of arrays with image details ["img",xm,ym,opac]
	foregrounds = foregrounds || [];  // array of arrays with image details ["img",xm,ym,opac]
	$gameSystem._travelMaps.maps[id] = {image:mapImage, backgrounds: backgrounds, foregrounds: foregrounds, locations: {}, objects: {}};
};

Galv.MAPT.setLocation = function(mapid,name,image,mx,my,tmid,tx,ty,desc,frames) {
	if (!Galv.MAPT.hasMap(mapid)) return;
	$gameSystem._travelMaps.maps[mapid].locations[name] = {name:name, image:image, mapXY:[mx,my], transfer:[tmid,tx,ty], enabled:true, desc: desc,frames:frames || Galv.MAPT.defaultFrames};
};

Galv.MAPT.setObject = function(mapid,name,image,mx,my,frames) {
	if (!Galv.MAPT.hasMap(mapid)) return;
	$gameSystem._travelMaps.maps[mapid].objects[name] = {name:name, image:image, mapXY:[mx,my],frames:frames || Galv.MAPT.defaultFrames};
};

Galv.MAPT.hasMap = function(id) {
	return $gameSystem._travelMaps.maps[id];
};

Galv.MAPT.openMap = function(id,preventCancel) {
	if (Galv.MAPT.hasMap(id)) {
		Galv.MAPT.cancelled = false;
		$gameSystem._TravelMapPreventCancel = preventCancel;
		$gameSystem._travelMapsId = id;
		SceneManager.push(Scene_MapTravel);
	}
};

Galv.MAPT.enableLocation = function(mapid,name,status) {
	if (Galv.MAPT.hasMap(mapid)) {
		$gameSystem._travelMaps.maps[mapid].locations[name].enabled = status;
	}
};

Galv.MAPT.removeLocation = function(mapid,name) {
	if (Galv.MAPT.hasMap(mapid)) {
		delete($gameSystem._travelMaps.maps[mapid].locations[name]);
	}
};

Galv.MAPT.removeObject = function(mapid,name) {
	if (Galv.MAPT.hasMap(mapid)) {
		delete($gameSystem._travelMaps.maps[mapid].objects[name]);
	}
};

Galv.MAPT.initLocation = function(mapid,name) {
	if ($gameSystem._travelMaps.maps[mapid]) {
		$gameSystem._travelMaps.maps[mapid].current = name;
		$gameSystem._travelMaps.current = null;
	} else {
		$gameSystem._travelMaps.current = name;
	}
};

Galv.MAPT.editLocation = function(mapid,name,attribute,value) {
	if (Galv.MAPT.hasMap(mapid)) {
		const loc = $gameSystem._travelMaps.maps[mapid].locations[name];
		if (loc) loc[attribute] = value;
	}
};


//-----------------------------------------------------------------------------
//  IMAGEMANAGER
//-----------------------------------------------------------------------------
ImageManager.loadMapTravelGraphic = function(filename, hue) {
    return this.loadBitmap('img/maptravel/', filename, hue, true);
};


//-----------------------------------------------------------------------------
//  SCENE SYSTEM
//-----------------------------------------------------------------------------
Galv.MAPT.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.MAPT.Game_System_initialize.call(this);
	this._travelMaps = {maps:{},current:null};  // to store and reference all travel map details
	this._travelMapsId = 0; // set to map id to use in travelmap scene
};




//-----------------------------------------------------------------------------
//  SCENE MAP TRAVEL
//-----------------------------------------------------------------------------

function Scene_MapTravel() {
    this.initialize(...arguments);
}

Scene_MapTravel.prototype = Object.create(Scene_MenuBase.prototype);
Scene_MapTravel.prototype.constructor = Scene_MapTravel;

Scene_MapTravel.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_MapTravel.prototype.createVars = function() {
	this._currentMousePos = {x:TouchInput.x,y:TouchInput.y};
	const current = this.data().current || $gameSystem._travelMaps.current || null;
	if (current && this.data().locations[current]) {
		Galv.MAPT.active = current;
	} else {
		Galv.MAPT.active = 0;
	}
	Galv.MAPT.scrollTarget = null;
	this._prepRelease = false;
	this._drag = {x:0,y:0,sx:0,sy:0};
};

Scene_MapTravel.prototype.start = function() {
	this.createVars();
    Scene_MenuBase.prototype.start.call(this);
	this._menuActive = true;
};

Scene_MapTravel.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
	this._needRefresh = true; // need refresh to refresh sizes once map image loads
	this.createBackgrounds();
	this.createMap();
	this.createLocations();
	this.createObjects();
	this.createForegrounds();
	this.createLocWindow();
	this.createLocListWindow();
	this.createConfirmWindow();
};

Scene_MapTravel.prototype.createBackground = function() {
	Scene_MenuBase.prototype.createBackground.call(this);
};

Scene_MapTravel.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId];
};

Scene_MapTravel.prototype.createBackgrounds = function() {
	this._bgSprites = [];
	const bgs = this.data().backgrounds;
	
	for (let i = 0; i < bgs.length; i++) {
		this._bgSprites[i] = new TilingSprite();
		this._bgSprites[i].width = Graphics.width;
		this._bgSprites[i].height = Graphics.height;
		this._bgSprites[i].bitmap = ImageManager.loadMapTravelGraphic(bgs[i][0],null,'images/');
		this._bgSprites[i].opacity = bgs[i][3];
		this.addChild(this._bgSprites[i]);
	};
};

Scene_MapTravel.prototype.createMap = function() {
	this.mapSprite = new Sprite();
	const filename = this.data().image;
	this.mapSprite.bitmap = ImageManager.loadMapTravelGraphic(filename,null,'images/');
	this.addChild(this.mapSprite);
};

Scene_MapTravel.prototype.createLocations = function() {
	this._locations = [];
	const locs = this.data().locations;
	for (let l in locs) {
		this._locations.push(new Sprite_MapTravelIcon(locs[l].name));
	};
	for (let i = 0; i < this._locations.length; i++) {
		this.mapSprite.addChild(this._locations[i]);
	};
};

Scene_MapTravel.prototype.createObjects = function() {
	this._objects = [];
	const objs = this.data().objects;
	for (let o in objs) {
		this._objects.push(new Sprite_MapTravelIconObj(objs[o].name));
	};
	for (let i = 0; i < this._objects.length; i++) {
		this.mapSprite.addChild(this._objects[i]);
	};
};
	
Scene_MapTravel.prototype.createForegrounds = function() {		
	this._fgSprites = [];
	const fgs = this.data().foregrounds;
	
	for (let i = 0; i < fgs.length; i++) {
		this._fgSprites[i] = new TilingSprite();
		this._fgSprites[i].width = Graphics.width;
		this._fgSprites[i].height = Graphics.height;
		this._fgSprites[i].bitmap = ImageManager.loadMapTravelGraphic(fgs[i][0],null,'images/');
		this._fgSprites[i].opacity = fgs[i][3];
		this.addChild(this._fgSprites[i]);
	};
};

Scene_MapTravel.prototype.createLocWindow = function() {	
	this._locationWindow = new Window_MapTravelLocation();
    this.addChild(this._locationWindow);
};

Scene_MapTravel.prototype.createLocListWindow = function() {	
	this._locationListWindow = new Window_MapTravelList(0,0,Graphics.width / 3,Graphics.height - this._locationWindow.height);
	this._locationListWindow.activate();
    this.addChild(this._locationListWindow);
};

Scene_MapTravel.prototype.createConfirmWindow = function() {	
	this._confirmWindow = new Window_MapTravelConfirm(this.calcWindowHeight(2, true));
	this._confirmWindow.setHandler('confirm', this.confirmOk.bind(this));
	this._confirmWindow.setHandler('cancel', this.confirmCancel.bind(this));
	this._confirmWindow.deactivate();
    this.addChild(this._confirmWindow);
};

Scene_MapTravel.prototype.openConfirm = function() {
	if (Galv.MAPT.active && this.data().locations[Galv.MAPT.active].enabled) {	
		this._confirmWindow.activate();
		this._confirmWindow.open();
		this._confirmWindow.select(0);
		this._locationListWindow.deactivate();
	} else {
		SoundManager.playBuzzer();
	}
};

Scene_MapTravel.prototype.closeConfirm = function() {
	this._confirmWindow.deactivate();
	this._confirmWindow.close();
	this._confirmWindow.select(-1);
	this._locationListWindow.activate();
};

Scene_MapTravel.prototype.confirmOk = function() {
	this.setTransfer();
};

Scene_MapTravel.prototype.confirmCancel = function() {
	this.closeConfirm();
};

Scene_MapTravel.prototype.setTransfer = function() {
	if (Galv.MAPT.active) {	
		if (this.data().locations[Galv.MAPT.active].enabled) {
			this.doTransfer();
			SoundManager.playOk();
		} else {
			SoundManager.playBuzzer();
		}
	}
};

Scene_MapTravel.prototype.doTransfer = function() {
	const vars = this.data().locations[Galv.MAPT.active].transfer;
	$gameVariables.setValue(Galv.MAPT.mapVar,vars[0]);
	$gameVariables.setValue(Galv.MAPT.xVar,vars[1]);
	$gameVariables.setValue(Galv.MAPT.yVar,vars[2]);
	Galv.MAPT.mapSelected = true;
	SceneManager.goto(Scene_Map);
	Galv.MAPT.active = false;
};

Scene_MapTravel.prototype.doExitScene = function() {
	if ($gameSystem._TravelMapPreventCancel) return;
	SceneManager.pop();
};

Scene_MapTravel.prototype.update = function() {
	this.updateControls();
	this.updateLayers();
	Scene_MenuBase.prototype.update.call(this);
	this.updateRefresh();
	this.updateScroll();
};

Scene_MapTravel.prototype.updateScroll = function() {
	if (Galv.MAPT.scrollTarget) {
		const tx = Galv.MAPT.scrollTarget[0];
		const ty = Galv.MAPT.scrollTarget[1];
		const cx = Math.floor(this.mapSprite.x - Graphics.width / 1.5);
		const cy = Math.floor(this.mapSprite.y - (Graphics.height / 2) + (this._locationWindow.height / 2));
		
		let dist = Math.max(Math.round(Math.abs(tx + cx) * 0.1),1);
		let speed = Math.min(dist,15);
		if (-tx > cx) this.scrollLeft(speed);
		if (-tx < cx) this.scrollRight(speed);
		
		dist = Math.max(Math.round(Math.abs(ty + cy) * 0.1),1);
		speed = Math.min(dist,15);
		if (-ty > cy) this.scrollUp(speed);
		if (-ty < cy) this.scrollDown(speed);
	}
};

Scene_MapTravel.prototype.scrollLeft = function(speed) {
	this.mapSprite.x = Math.min(this.mapSprite.x + speed,0);
};

Scene_MapTravel.prototype.scrollRight = function(speed) {
	const m = this.mapSprite.bitmap.width;
	this.mapSprite.x = Math.max(this.mapSprite.x - speed,Graphics.width - m);
};

Scene_MapTravel.prototype.scrollUp = function(speed) {
	this.mapSprite.y = Math.min(this.mapSprite.y + speed,0);
};

Scene_MapTravel.prototype.scrollDown = function(speed) {
	const m = this.mapSprite.bitmap.height;
	this.mapSprite.y = Math.max(this.mapSprite.y - speed,Graphics.height - m);
};

Scene_MapTravel.prototype.updateControls = function() {
	if (this._needRefresh) return;
	this.updateKeyboardControls();
	this.updateMouseControls();
};

Scene_MapTravel.prototype.updateKeyboardControls = function() {
	if (!Galv.MAPT.active) {
		// If no location is selected, keyboard keys scroll around
		const speed = Input.isPressed('shift') ? 20 : 8;
		if (Input.isPressed('right') && !Input.isPressed('left')) {
			this.scrollRight(speed);
		} else if (Input.isPressed('left') && !Input.isPressed('right')) {
			this.scrollLeft(speed);
		}
		if (Input.isPressed('up') && !Input.isPressed('down')) {
			this.scrollUp(speed);
		} else if (Input.isPressed('down') && !Input.isPressed('up')) {
			this.scrollDown(speed);
		}
		
		if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
			Galv.MAPT.mapSelected = false;
			this.doExitScene();
		} else if (Input.isTriggered('ok')) {
			let selectClosest = null;
			let dist = 999999;
			for (let i = 0; i < this._locations.length; i++) {
				let a = this._locations[i].x + this.mapSprite.x - Graphics.width / 1.5;
				let b = this._locations[i].y + this.mapSprite.y - (Graphics.height / 2) + (this._locationWindow.height / 2);
				let dist2 = Math.sqrt( a * a + b * b );
				if (dist2 < dist) {
					selectCloset = this._locations[i];
					dist = dist2;
				}
			};	
			Galv.MAPT.active = selectCloset._name || this._locations[0]._name;
			this.refreshLocations();
		}
	} else {
		// If location is selected, cancel unselects location and no scrolling.
		if (!this._confirmWindow.active) {
			if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
				Galv.MAPT.active = null;
				Galv.MAPT.scrollTarget = null;
				this.refreshLocations();
			} else if (Input.isTriggered('ok')) {
				this.openConfirm();
			}
		}
	}
};

Scene_MapTravel.prototype.updateMouseControls = function() {
	if (!this._confirmWindow.active) {
		if (TouchInput.isPressed()) {
			if (TouchInput.isTriggered()) {
				if(this._locationListWindow.isTouchedInsideFrame()) {
					// Touch/click the list window
					if (this._locationListWindow.index() == this._locationListWindow.hitIndex()) this.openConfirm();
				} else {
					// Touch/click the map
					Galv.MAPT.scrollTarget = null;
					this._drag = {x:Number(TouchInput.x),y:Number(TouchInput.y),sx:Number(this.mapSprite.x),sy:Number(this.mapSprite.y)};
					this._triggeredIn = true;
				}
			}
			if (this._triggeredIn) {
				// Touched the map, not the list
				this.mapSprite.x = Math.max(Math.min(0,this._drag.sx - this._drag.x + TouchInput.x), Graphics.width - this.mapSprite.bitmap.width);
				this.mapSprite.y = Math.max(Math.min(0,this._drag.sy - this._drag.y + TouchInput.y), Graphics.height - this.mapSprite.bitmap.height);
				this._prepRelease = true;
			}
		} else if (this._prepRelease && this._triggeredIn) {
			for (let i = 0; i < this._locations.length; i++) {
				if (this._locations[i].isButtonTouched()) {
					if (Galv.MAPT.active === this._locations[i]._name) {
						this.openConfirm();
					} else {
						Galv.MAPT.active = this._locations[i]._name;
						break;
					}
				}
			}
			this.refreshLocations();
			this._prepRelease = false;
			this._triggeredIn = false;
	
		} else {
			this._triggeredIn = false;
		}
	}
};

Scene_MapTravel.prototype.refreshLocations = function() {
	for (let i = 0; i < this._locations.length; i++) {
		this._locations[i].refresh();
	}
};

Scene_MapTravel.prototype.updateRefresh = function() {
	if (this._needRefresh) {
		for (let i = 0; i < this._bgSprites.length; i++) {
			this._bgSprites[i].width = this.mapSprite.bitmap.width;
			this._bgSprites[i].height = this.mapSprite.bitmap.height;
			this._bgSprites[i].x = this.mapSprite.x;
			this._bgSprites[i].y = this.mapSprite.y;
		};
		for (let i = 0; i < this._fgSprites.length; i++) {
			this._fgSprites[i].width = this.mapSprite.bitmap.width;
			this._fgSprites[i].height = this.mapSprite.bitmap.height;
			this._fgSprites[i].x = this.mapSprite.x;
			this._fgSprites[i].y = this.mapSprite.y;
		};
		this._needRefresh = false;
	};
};

Scene_MapTravel.prototype.updateLayers = function() {
	const bgs = this.data().backgrounds;
	for (let i = 0; i < this._bgSprites.length; i++) {
		this._bgSprites[i].x = this.mapSprite.x;
		this._bgSprites[i].y = this.mapSprite.y;
		this._bgSprites[i].origin.x += bgs[i][1];
		this._bgSprites[i].origin.y += bgs[i][2];
	};	
	const fgs = this.data().foregrounds;
	for (let i = 0; i < this._fgSprites.length; i++) {
		this._fgSprites[i].x = this.mapSprite.x;
		this._fgSprites[i].y = this.mapSprite.y;
		this._fgSprites[i].origin.x += fgs[i][1];
		this._fgSprites[i].origin.y += fgs[i][2];
	};
};


//-----------------------------------------------------------------------------
// Sprite_MapTravelIcon
//-----------------------------------------------------------------------------

function Sprite_MapTravelIcon() {
    this.initialize(...arguments);
}

Sprite_MapTravelIcon.prototype = Object.create(Sprite.prototype);
Sprite_MapTravelIcon.prototype.constructor = Sprite_MapTravelIcon;

Sprite_MapTravelIcon.prototype.initialize = function(name) {
	this._isReady = false;
	this._enabled = true;
	this._sy = -1;
	this._sx = 0;
	this._fIndex = 0;
	this._ticker = 0;
    Sprite.prototype.initialize.call(this);
	this._name = name;
	this.cacheBitmap();
	this.anchor.y = 0.5;
	this.anchor.x = 0.5;
	const data = this.data();
	this.x = data.mapXY[0];
	this.y = data.mapXY[1];
	this._frames = data.frames;
};

Sprite_MapTravelIcon.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId].locations[this._name];
};

Sprite_MapTravelIcon.prototype.cacheBitmap = function() {
	this._pw = 0;
	this._ph = 0;
	this.bitmap = ImageManager.loadMapTravelGraphic(this.data().image);
};

Sprite_MapTravelIcon.prototype.setBitmap = function() {
	this._pw = this.bitmap.width / this._frames;
	this._ph = this.bitmap.height / 3;
	
	if (!this.data().enabled) {
		this._enabled = false;
		this._sy = this._ph * 2;
	}
	this.updateBitmap();
};

Sprite_MapTravelIcon.prototype.updateBitmap = function() {
	if (this._enabled) this._sy = Galv.MAPT.active === this._name ? this._ph : 0;
	this.setFrame(this._sx, this._sy, this._pw, this._ph);
};

Sprite_MapTravelIcon.prototype.update = function() {
    Sprite.prototype.update.call(this);
	if (!this._isReady && ImageManager.isReady()) {
		this.setBitmap();
		this._isReady = true;
	}
	
	if (this._ticker >= Galv.MAPT.fSpeed) {
		this._fIndex += 1;
		if (this._fIndex >= this._frames) this._fIndex = 0;
		this._sx = this._fIndex * this._pw;
		this.setFrame(this._sx, this._sy, this._pw, this._ph);
		this._ticker = 0;
	} else {
		this._ticker += 1;
	}
};

Sprite_MapTravelIcon.prototype.refresh = function() {
	this.updateBitmap();
};

Sprite_MapTravelIcon.prototype.isButtonTouched = function() {
    const x = this.canvasToLocalX(TouchInput.x + this.width * 0.5);
    const y = this.canvasToLocalY(TouchInput.y + this.height * 0.5);
    return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

Sprite_MapTravelIcon.prototype.canvasToLocalX = function(x) {
    let node = this;
    while (node) {
        x -= node.x;
        node = node.parent;
    }
    return x;
};

Sprite_MapTravelIcon.prototype.canvasToLocalY = function(y) {
    let node = this;
    while (node) {
        y -= node.y;
        node = node.parent;
    }
    return y;
};


//-----------------------------------------------------------------------------
// Sprite_MapTravelIconObj
//-----------------------------------------------------------------------------

function Sprite_MapTravelIconObj() {
    this.initialize(...arguments);
}

Sprite_MapTravelIconObj.prototype = Object.create(Sprite_MapTravelIcon.prototype);
Sprite_MapTravelIconObj.prototype.constructor = Sprite_MapTravelIconObj;

Sprite_MapTravelIconObj.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId].objects[this._name];
};

Sprite_MapTravelIconObj.prototype.updateBitmap = function() {
	this.setFrame(this._sx, 0, this._pw, this._ph);
};

Sprite_MapTravelIconObj.prototype.setBitmap = function() {
	this._pw = this.bitmap.width / this._frames;
	this._ph = this.bitmap.height;
	this.updateBitmap();
};

Sprite_MapTravelIconObj.prototype.isButtonTouched = function() {
};


//-----------------------------------------------------------------------------
// Window_MapTravelLocation
//-----------------------------------------------------------------------------

function Window_MapTravelLocation() {
    this.initialize(...arguments);
}

Window_MapTravelLocation.prototype = Object.create(Window_Base.prototype);
Window_MapTravelLocation.prototype.constructor = Window_MapTravelLocation;

Window_MapTravelLocation.prototype.initialize = function() {
    const width = Graphics.width; // - 40;
    const height = this.fittingHeight(2);
    Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, width, height));
	this.y = Graphics.height;
	this._currentLocation = null;
};

Window_MapTravelLocation.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId].locations[Galv.MAPT.active];
};

Window_MapTravelLocation.prototype.refresh = function() {
    this.contents.clear();
	if (Galv.MAPT.active) {
		const desc = this.data().desc.split("|");
		for (let i = 0; i < desc.length; i++) {
			this.drawTextEx(desc[i], $gameSystem.windowPadding(), this.lineHeight() * i);
		}
		this._currentLocation = Galv.MAPT.active;
	}
};

Window_MapTravelLocation.prototype.update = function() {
	if (Galv.MAPT.active) {
		this.y = Math.max(this.y -= 12,Graphics.height - this.height);
	} else {
		this.y = Math.min(Graphics.height,this.y += 12);
	}
	if (this._currentLocation != Galv.MAPT.active) {
		this.refresh();
	}
};


//-----------------------------------------------------------------------------
// Window_MapTravelList
//-----------------------------------------------------------------------------

function Window_MapTravelList() {
    this.initialize(...arguments);
}

Window_MapTravelList.prototype = Object.create(Window_Selectable.prototype);
Window_MapTravelList.prototype.constructor = Window_MapTravelList;

Window_MapTravelList.prototype.initialize = function(x, y, width, height) {
	Window_Selectable.prototype.initialize.call(this, new Rectangle(0, 0, width, height));
	this._data = [];
	this.refresh();
	this._currentActive = -1;
	this.x = -width;
};

Window_MapTravelList.prototype.maxCols = function() {
	return 1;
};

Window_MapTravelList.prototype.spacing = function() {
	return 48;
};

Window_MapTravelList.prototype.maxItems = function() {
	return this._data ? this._data.length : 1;
};

Window_MapTravelList.prototype.data = function() {
	return $gameSystem._travelMaps.maps[$gameSystem._travelMapsId];
};

Window_MapTravelList.prototype.item = function() {
	const index = this.index();
	return this._data && index >= 0 ? this._data[index] : null;
};

Window_MapTravelList.prototype.isCurrentItemEnabled = function() {
	return this.isEnabled(this.item());
};

Window_MapTravelList.prototype.isEnabled = function(item) {
	return item && item.enabled;
};

Window_MapTravelList.prototype.makeItemList = function() {
	this._data = [];
	const locs = this.data().locations;
	for (let l in locs) {
		this._data.push(locs[l]);
	};
};

Window_MapTravelList.prototype.drawItem = function(index) {
	const item = this._data[index];
	if (item) {
		const rect = this.itemRect(index);
		rect.width -= $gameSystem.windowPadding();
		this.changePaintOpacity(this.isEnabled(item));
		this.drawText(item.name,rect.x + 10,rect.y,rect.width - 10,"left");
		this.changePaintOpacity(1);
	}
};

Window_MapTravelList.prototype.refresh = function() {
    this.makeItemList();
    this.createContents();
    this.drawAllItems();
};

Window_MapTravelList.prototype.update = function() {
	if (Galv.MAPT.active) {	
		this.x = Math.min(this.x + 15,0);
	} else {
		this.x = Math.max(this.x - 15,-this.width);
		return;
	}
	
	Window_Selectable.prototype.update.call(this);
	if (Galv.MAPT.active != this._currentActive) {
		// select item
		let id = -1;
		for (let i = 0; i < this._data.length; i++) {
			if (this._data[i].name === Galv.MAPT.active) {
				this._currentActive = Galv.MAPT.active;
				Galv.MAPT.scrollTarget = this.data().locations[Galv.MAPT.active].mapXY;
				id = i;
				break;
			}
		}
		this.select(id);
	}
};

Window_MapTravelList.prototype.select = function(index) {
	Window_Selectable.prototype.select.call(this,index);
	const item = this.item();
	if (item) {
		Galv.MAPT.active = this.item().name;
		if (SceneManager._scene.refreshLocations) SceneManager._scene.refreshLocations();
	}
};

Window_MapTravelList.prototype.onTouch = function(triggered) {
	const lastIndex = this.index();
	const x = this.canvasToLocalX(TouchInput.x);
	const y = this.canvasToLocalY(TouchInput.y);
	const hitIndex = this.hitTest(x, y);
	if (hitIndex >= 0 && triggered) {
		if (hitIndex === this.index()) {
			if (triggered) {
				SceneManager._scene.openConfirm();
			}
		} else {
			this.select(hitIndex);
		}
	}
	if (this.index() !== lastIndex) {
		SoundManager.playCursor();		
	}
};


//-----------------------------------------------------------------------------
//  Window_MapTravelConfirm
//-----------------------------------------------------------------------------

function Window_MapTravelConfirm() {
    this.initialize(...arguments);
}

Window_MapTravelConfirm.prototype = Object.create(Window_Command.prototype);
Window_MapTravelConfirm.prototype.constructor = Window_MapTravelConfirm;

Window_MapTravelConfirm.prototype.initialize = function(height) {
    Window_Command.prototype.initialize.call(this, new Rectangle(0,0,Galv.MAPT.cWinWidth,height));
    this.updatePlacement();
    this.openness = 0;
};

Window_MapTravelConfirm.prototype.windowWidth = function() {
    return Galv.MAPT.cWinWidth;
};

Window_MapTravelConfirm.prototype.updatePlacement = function() {
	this.x = (Graphics.width - this.windowWidth()) *  0.7;
	this.y = (Graphics.height - this.height) / 2 - 54;
};

Window_MapTravelConfirm.prototype.makeCommandList = function() {
	this.addCommand(Galv.MAPT.txtConfirm,   'confirm');
	this.addCommand(Galv.MAPT.txtCancel,   'cancel');
};

Window_MapTravelConfirm.prototype.processOk = function() {
    Window_Command.prototype.processOk.call(this);
};