//-----------------------------------------------------------------------------
//  Galv's Message Busts
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MessageBustsMZ.js
//-----------------------------------------------------------------------------
//  2020-10-10 - Version 1.2 - added bust X and Y offsets to plugin settings
//                             fixed error in text command
//  2020-09-27 - Version 1.1 - fixed error in code when busts disabled and only
//                             on certain priority setting
//  2020-09-22 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageBusts = true;

var Galv = Galv || {};        // Galv's main object
Galv.MB = Galv.MB || {};      // Plugin object
Galv.MB.pluginName = "GALV_MessageBustsMZ";

Galv.Mstyle = Galv.Mstyle || {};  // compatibility

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.2) Displays a bust image instead of selected face image
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 * @orderAfter MessageStylesMZ
 *
 * @param bPriority
 * @text Bust Priority
 * @desc Can be 0 or 1. 0 = bust appears behind message window. 1 = bust appear in front of it
 * @default 0
 *
 * @param bPosition
 * @text Bust Position
 * @desc Can be 0 or 1. 0 = bust appears above window messages. 1 = bust appears at bottom of screen
 * @default 0
 *
 * @param bX
 * @text Bust X Offset
 * @desc Offset the bust horizontally this many pixels
 * @default 0
 *
 * @param bY
 * @text Bust Y Offset
 * @desc Offset the bust vertically this many pixels
 * @default 0
 *
 * @param xOffset
 * @text Text X Offset
 * @desc Amount of pixels that text is pushed to the right when a bust is displayed on the left.
 * @default 390
 *
 * @param fileAppend
 * @text Filename Append
 * @desc Text to append to the normal file path the plugin looks for.
 * @default
 *
 * @param mStyleBusts
 * @text Pop Window Busts
 * @desc If using Message Styles plugin, show busts in the pop windows? true or false
 * @type boolean
 * @default false
 *
 *
 * @command bustPosition
 * @text The alignment of the bust
 * @desc 
 *
 * @arg align
 * @text Bust Alignment
 * @type select
 * @desc The position of the bust, left or right.
 * @default left
 * @option Left Aligned
 * @value left
 * @option Right Aligned
 * @value right
 *
 * @arg mirror
 * @text Bust Mirror
 * @type boolean
 * @default false
 * @desc If the bust is mirrored from the default image (true or false)
 *
 *
 * @command bustStatus
 * @text Bust Status
 * @desc Enable or disable the bust feature. true is enabled, false is disabled.
 *
 * @arg status
 * @text Busts Enabled
 * @type boolean
 * @default true
 * @desc true is busts enabled, false is busts disabled
 *
 * @help
 *   Galv's Message Busts
 * ----------------------------------------------------------------------------
 * This plugin displays a bust image from /img/pictures/ folder based on the
 * face chosen in the 'Show Text' event command.  For example:
 * If your 'Show Text' uses the 2nd face from the "Actor1" faces file, then
 * the plugin will use /img/pictures/Actor1_2.png for the bust image.
 *
 * The plugin setting called "Filename Append"
 * --------------------------------------------
 * Whatever you put in this setting will be added to the end of the filename.
 * Using the above example, if the Filename Append setting is "_bust", then the
 * plugin will use /img/pictures/Actor1_2_bust.png instead.
 *
 * Use 'wait' between messages with different character's busts
 * for better looking transitions.
 * Use the 'Plugin' event command to change bust settings. These settings will
 * be in effect until changed again, so they can be used for multiple messages.
 *
 * NOTES
 * ------
 * You will need to find your own bust images to use. I can not help you with
 * that. The images in the demo are for demo purposes only.
 *
 * All filenames are case sensitive, so make sure to use the correct
 * capitalization/case for your faces and busts.
 *
 
 *
 * ----------------------------------------------------------------------------
 *   PLUGIN COMMANDS (To change bust position/visibility)
 * ----------------------------------------------------------------------------
 *
 *   Bust Alignment     // right or left to display on the right or left
 *
 *   Bust Mirror        // to mirror the bust or not (true or false)
 *
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   TEXT ESCAPE CODES (During 'Show Tesxt')
 * ----------------------------------------------------------------------------
 * NOTE: These do not work correctly in a \pop message using Galv's Message
 * Styles plugin. Only use them in normal show message boxes.
 *
 * \BST[x]            // Change the bust in the middle of a message. X is the
 *                    // number of the face without changing the face name
 *
 * \BST[x,face]       // Change the bust image to a different file name
 *
 * ----------------------------------------------------------------------------
 * Examples:
 * If a "Show Text" event command uses face number 3 from "Actor1"...
 * \BST[7]  will keep using "Actor1" face file but change the 3 to 7
 * \BST[7,Actor2]    will change the face file to "Actor2" and use face 7
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

	Galv.MB.prio = Number(PluginManager.parameters(Galv.MB.pluginName)["bPriority"]);
	Galv.MB.pos = Number(PluginManager.parameters(Galv.MB.pluginName)["bPosition"]);
	Galv.MB.bX = Number(PluginManager.parameters(Galv.MB.pluginName)["bX"]);
	Galv.MB.bY = Number(PluginManager.parameters(Galv.MB.pluginName)["bY"]);
	Galv.MB.w = Number(PluginManager.parameters(Galv.MB.pluginName)["xOffset"]);
	Galv.MB.f = PluginManager.parameters(Galv.MB.pluginName)["fileAppend"];
	Galv.MB.popWindow = PluginManager.parameters(Galv.MB.pluginName)["mStyleBusts"] == "true" && Imported.Galv_MessageStyles;
	Galv.MB.msgWindow = null;
	Galv.MB.bustHeight = 0;
	
if (Galv.MB.prio == 1 && Galv.MB.pos == 0) {
	Galv.MB.prio = 0; // Change prio if settings are this
};

PluginManager.registerCommand(Galv.MB.pluginName, "bustPosition", args => {
	Galv.MB.bustPos(args.align,args.mirror == "true");
});

PluginManager.registerCommand(Galv.MB.pluginName, "bustStatus", args => {
	Galv.MB.bustStatus(args.status == "true");
});

Galv.MB.bustPos = function(pos,mirror) {
	if (pos == "left") {
		$gameSystem.bustPos = 0;
	} else if (pos == "right") {
		$gameSystem.bustPos = 1;
	};
	$gameSystem.bustMirror = mirror;
};

Galv.MB.bustStatus = function(status) {
	$gameSystem.bustDisable = !status;
};


// GAME SYSTEM
//-----------------------------------------------------------------------------

Game_System.prototype.isBustDisabled = function() {
	// More options for disabling busts here
	if (Galv.Mstyle.target && !Galv.MB.popWindow) return true;
	return this.bustDisable;
};


// WINDOW MESSAGE
//-----------------------------------------------------------------------------

Galv.MB.Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
	Galv.MB.msgWindow = this;
	$gameSystem.bustPos = $gameSystem.bustPos || 0;
	$gameMessage.bustOffset = $gameMessage.bustOffset || Galv.MB.w;
	Galv.MB.Window_Message_startMessage.call(this);
	Galv.MB.msgWindow.tempPosType = this._positionType;
};

Galv.MB.Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case 'BST':
        this.obtainBustParam(textState);
        break;
    }
	Galv.MB.Window_Message_processEscapeCharacter.call(this, code, textState);
};

Window_Message.prototype.obtainBustParam = function(textState) {
    const arr = /^\[[^\]]*\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        const txt = arr[0].slice(1).slice(0, - 1);
		const array = txt.split(",");
		$gameMessage.setFaceImage(array[1] || $gameMessage._faceName,Number(array[0] - 1));
    } else {
        return '';
    }
};

Galv.MB.Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
Window_Message.prototype.drawMessageFace = function() {
	if (!$gameSystem.isBustDisabled()) return;
	Galv.MB.Window_Message_drawMessageFace.call(this);
};


// CONDITIONAL FUNCTIONS BASED ON SETTINGS
//-----------------------------------------------------------------------------

if (Galv.MB.prio == 0) {
// UNDER MESSAGE
	Galv.MB.Spriteset_Map_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
	Spriteset_Base.prototype.createUpperLayer = function() {
		Galv.MB.Spriteset_Map_createUpperLayer.call(this);
		this.createBusts();
	};
	
	// SPRITESET MAP CREATE MSG BG
	Spriteset_Base.prototype.createBusts = function() {
		// Create bust image
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};
	
	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function(textState) {
		if ($gameSystem.isBustDisabled()) {
			return Galv.MB.Window_Message_newLineX.call(this,textState);
		} else {
			return Imported.Galv_MessageStyles ? Galv.Mstyle.padding[3] : 0;
		};
	};
	
} else {
// OVER MESSAGE
	
	// Add to window_message as child instead, so it displays above
	Galv.MB.Window_Message_initialize = Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function(rect) {
		Galv.MB.Window_Message_initialize.call(this,rect);
		if (this._msgBustSprite) return;
		this._msgBustSprite = new Sprite_GalvBust();
		this.addChild(this._msgBustSprite);
	};

	Galv.MB.Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function(textState) {
		if ($gameSystem.isBustDisabled()) {
			return Galv.MB.Window_Message_newLineX.call(this,textState);
		} else if ($gameMessage.faceName() && Galv.MB.prio == 1 && $gameMessage._positionType == 2 && $gameSystem.bustPos == 0) {
			return $gameMessage.bustOffset;
		} else {
			return Imported.Galv_MessageStyles ? Galv.Mstyle.padding[3] : 0;
		};
	};

	Galv.MB.Window_Message_galvExtraWidths = Window_Message.prototype.galvExtraWidths;
	Window_Message.prototype.galvExtraWidths = function() {
		let w = Galv.MB.Window_Message_galvExtraWidths.call(this);
		if (!$gameSystem.isBustDisabled() && $gameMessage.faceName()) w += Galv.MB.w / 2;
		return w;
	};
};


// SPRITE GALVBUST
//-----------------------------------------------------------------------------

function Sprite_GalvBust() {
    this.initialize.apply(this, arguments);
}

Sprite_GalvBust.prototype = Object.create(Sprite.prototype);
Sprite_GalvBust.prototype.constructor = Sprite_GalvBust;

Sprite_GalvBust.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this.name = "";
	this.opacity = 0;
    this.update();
};

Sprite_GalvBust.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (Galv.MB.msgWindow) {
		this.controlBitmap();
		Galv.MB.bustHeight = this.height;
	} else {
		Galv.MB.bustHeight = 0;
	}
};

Sprite_GalvBust.prototype.loadBitmap = function() {
	const name = $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1);
	let img;
	if ($gameSystem.isBustDisabled()) {
		img = ImageManager.loadPicture('');
	} else {
		img = ImageManager.loadPicture(name + Galv.MB.f);
	};
	if (img.isReady()) {
		if (this.bitmap) {
			//this._destroyCachedSprite();
			this.bitmap = null;
		};
		this.bitmap = img;
		this.name = name;
		this.hasBust = true;
	};
};

Sprite_GalvBust.prototype.controlBitmap = function() {
	if ($gameMessage.faceName() && this.name !== $gameMessage.faceName() + "_" + ($gameMessage.faceIndex() + 1)) {
    	this.loadBitmap();  // If image changed, reload bitmap
	};
	
	if (Galv.MB.msgWindow.openness <= 0 || !this.hasBust || $gameSystem.isBustDisabled()) {
		this.opacity = 0;
		this.name = "";
		this.hasBust = false;
		return;
	};
	
	

	this.opacity = $gameMessage.faceName() ? Galv.MB.msgWindow._openness : this.opacity - 32;
	
	// Y POSITION
	switch (Galv.MB.msgWindow.tempPosType) {
	case 0:
		this.y = this.baseY() + Galv.MB.bY;
		break;
	case 1:
	//top and middle
		this.y =  this.baseY() - Galv.MB.msgWindow.y + Galv.MB.bY;
		break;
	case 2:
	//bottom
		if (Galv.MB.prio == 1) {
			this.y = Galv.MB.msgWindow.height - this.bitmap.height;
		} else if (Galv.MB.pos === 1) {
			this.y = this.baseY();
		} else {
			this.y = this.baseY() - Galv.MB.msgWindow.height;
		};
		
		this.y += Galv.MB.bY; // modify by plugin setting offset Y
		break;
	};
	
	// X POSITION
	let offset = 0;
	if ($gameSystem.bustMirror) {
		this.scale.x = -1;
		offset = this.bitmap.width;
	} else {
		this.scale.x = 1;
		offset = 0;
	};
	
	if ($gameSystem.bustPos == 1) {
		// if on the right
		offset -= Galv.MB.bX; // modify by offset in plugin settings
		
		if (Galv.MB.prio == 1) {
			this.x = Galv.MB.msgWindow.width - this.bitmap.width + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + Galv.MB.msgWindow.width - this.bitmap.width + offset;
		};
	} else {
		// else on the left
		offset += Galv.MB.bX; // modify by offset in plugin settings
		
		if (Galv.MB.prio == 1) {
			this.x = 0 + offset;
		} else {
			this.x = Galv.MB.msgWindow.x + offset;
		};
	};
};

Sprite_GalvBust.prototype.baseY = function() {
	return Galv.MB.msgWindow.y + Galv.MB.msgWindow.height - this.bitmap.height;
};