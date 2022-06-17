//-----------------------------------------------------------------------------
//  Galv's Message Background MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_MessageBackgroundMZ.js
//-----------------------------------------------------------------------------
//  2020-10-18 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageBackground = true;

var Galv = Galv || {};        // Galv's main object
Galv.MBG = Galv.MBG || {};    // Galv's Message Background stuff
Galv.Mstyle = Galv.Mstyle || {};  // Compatibility
//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Displays an image behind messages in place of the windowskin
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param defaultStatus
 * @text Default On or Off
 * @desc true to default the plugin to on, false to to off. If off, use script call to activate during game.
 * @type boolean
 * @default true
 *
 * @help
 *   Galv's Message Background MZ
 * ----------------------------------------------------------------------------
 * This plugin uses images from the /img/system/ folder to display behind the
 * default message box instead of using the windowskin.
 *
 * The message background images need to be named in a particular way:
 * /img/system/msgimg_X.png - where X is a number you can change during game.
 * This graphic is split up into 3 sections:
 *
 *      ----------------------------
 *     |                            |
 *     |     Above message box      |      // visible when middle or bottom
 *     |                            |
 *      ----------------------------
 *     |                            |
 *     |        Message box         |      // visible any position
 *     |                            |
 *      ----------------------------
 *     |                            |
 *     |     Below message box      |      // visible when middle or top
 *     |                            |
 *      ----------------------------
 *
 * The middle 'Message Box' part of the graphic is what will show underneath
 * the message text. The other two sections will show depending on the position
 * of the message window. The 'Above message box' goes off-screen if the
 * message window is at the top. The 'Below message box' window goes off-screen
 * if the message window is at the bottom. Both show is message is middle.
 *
 * The 'Show Message' settings of "window", "Dim" and "Tranparent" have an
 * effect on the message background image. Window shows image normally, Dim
 * shows the image partially transparent and Transparent makes it invisible.
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT CALLS
 * ----------------------------------------------------------------------------
 * 
 *     Galv.MBG.status(x);      // x can be true or false.
 *                              // true displays the message background
 *                              // false hides it and shows messages normally
 *
 *     Galv.MBG.id(X);          // X is the id used to determine graphic from
 *                              // /img/system/msgimg_X.png
 *
 * ----------------------------------------------------------------------------
 * EXAMPLES:
 * Galv.MBG.status(false);   // turns message backgrounds OFF
 * Galv.MBG.id(2);           // uses the graphic: /img/system/msgimg_2.png
 * ----------------------------------------------------------------------------
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.MBG.defaultOnOff = PluginManager.parameters("GALV_MessageBackgroundMZ")["defaultStatus"] == "true";
Galv.MBG.disable = false;

Galv.MBG.status = function(status) {
	$gameSystem._msgBackground.status = status;
};

Galv.MBG.id = function(id) {
	$gameSystem._msgBackground.id = id;
};
	

// GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.MBG.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.MBG.Game_System_initialize.call(this);
	this._msgBackground = {
		id: 0,
		status: Galv.MBG.defaultOnOff
	};
};


// SCENE BASE
//-----------------------------------------------------------------------------
Scene_Base.prototype.createMsgBackground = function() {
	Galv.MBG.disable = false;
	this._msgBgSprite = new Sprite_GalvMsgBg();
	this._msgBgSprite.z = -1000;
	this.addChild(this._msgBgSprite);
	Galv.MBG.Scene_Battle_createWindowLayer.call(this);
};


// SCENE MAP
//-----------------------------------------------------------------------------

Galv.MBG.Scene_Map_createWindowLayer = Scene_Map.prototype.createWindowLayer;
Scene_Map.prototype.createWindowLayer = function() {
	this.createMsgBackground();
	Galv.MBG.Scene_Map_createWindowLayer.call(this);
};


// SCENE BATTLE
//-----------------------------------------------------------------------------

Galv.MBG.Scene_Battle_createWindowLayer = Scene_Battle.prototype.createWindowLayer;
Scene_Battle.prototype.createWindowLayer = function() {
	this.createMsgBackground();
	Galv.MBG.Scene_Battle_createWindowLayer.call(this);
};


// SCENE MESSAGE
//-----------------------------------------------------------------------------

Galv.MBG.Scene_Message_createMessageWindow = Scene_Message.prototype.createMessageWindow;
Scene_Message.prototype.createMessageWindow = function() {
	Galv.MBG.Scene_Message_createMessageWindow.call(this);
	if (this._msgBgSprite) this._msgBgSprite.setWindow(this._messageWindow);
};


// WINDOW MESSAGE
//-----------------------------------------------------------------------------

// WINDOW MESSAGE START MESSAGE - MOD
Galv.MBG.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	// Create graphic when window is displayed
	if (Galv.Mstyle.target) {
		Galv.MBG.disable = true;
	} else {
		Galv.MBG.disable = false;
	};
	Galv.MBG.Window_Message_startMessage.call(this);
};

// WINDOW MESSAGE SET BACKGROUND TYPE
Galv.MBG.Window_Message_setBackgroundType = Window_Message.prototype.setBackgroundType;
Window_Message.prototype.setBackgroundType = function(type) {
	// Compatibility with Message Styles plugin
	if (Galv.Mstyle.target) {
		this.opacity = 255;
	} else if ($gameSystem._msgBackground.status) {
		this.opacity = 0;
		this.hideBackgroundDimmer();
		return;
	};
	Galv.MBG.Window_Message_setBackgroundType.call(this,type);
};


// WINDOW NAMEBOX
//-----------------------------------------------------------------------------

Galv.MBG.Window_NameBox_setBackgroundType = Window_NameBox.prototype.setBackgroundType;
Window_NameBox.prototype.setBackgroundType = function(type) {
	// Compatibility with Message Styles plugin
	if (Galv.Mstyle.target) {
		this.opacity = 255;
	} else if ($gameSystem._msgBackground.status) {
		this.opacity = 0;
		this.hideBackgroundDimmer();
		return;
	};
	Galv.MBG.Window_NameBox_setBackgroundType.call(this,type);
};


// SPRITE GALVMSGBG
//-----------------------------------------------------------------------------

function Sprite_GalvMsgBg() {
    this.initialize.apply(this, arguments);
}

Sprite_GalvMsgBg.prototype = Object.create(Sprite.prototype);
Sprite_GalvMsgBg.prototype.constructor = Sprite_GalvMsgBg;

Sprite_GalvMsgBg.prototype.initialize = function() {
	Sprite.prototype.initialize.call(this);
	this.opacity = 0;
	this.loadBitmap();
	this.update();
};

Sprite_GalvMsgBg.prototype.setWindow = function(messageWindow) {
	this._messageWindow = messageWindow;
};

Sprite_GalvMsgBg.prototype.update = function() {
	Sprite.prototype.update.call(this);
	if (this._messageWindow) {
		this.controlBitmap();
		this.repositionSprite();
	};
};

Sprite_GalvMsgBg.prototype.loadBitmap = function() {
	this.imageID = $gameSystem._msgBackground.id;
    this.bitmap = ImageManager.loadSystem('msgimg_' + this.imageID);
	this.x = 0
	this.z = 10;
	this.maxopac = 255;
};

Sprite_GalvMsgBg.prototype.controlBitmap = function() {
	if (this.imageID != $gameSystem._msgBackground.id && !this._messageWindow.isClosing()) this.loadBitmap();  // If image changed, reload bitmap
	if (!$gameSystem._msgBackground.status || this._messageWindow.openness <= 0 || Galv.MBG.disable) {
		this.opacity = 0;
		this.maxopac = 255;
		return;
	};

	// Control image opacity
	switch ($gameMessage.background()) {
	case 0:
	// Window
		this.opacity = Math.min(this._messageWindow._openness,this.maxopac);
		break;
	case 1:
	// Dim
		this.opacity = this._messageWindow._openness * 0.5;
		this.maxopac = this.opacity;
		break;
	case 2:
	// Transparent
		this.opacity = 0;
		this.maxopac = 0;
		break;
	};
};

Sprite_GalvMsgBg.prototype.repositionSprite = function() {
	// center on message window vertically (image is in 3 equal sections)
	this.y = this._messageWindow.y - this.height / 3;
};