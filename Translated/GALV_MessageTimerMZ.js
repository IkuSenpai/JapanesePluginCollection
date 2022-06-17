//-----------------------------------------------------------------------------
//  Galv's Message Timer MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MessageStylesMZ.js
//-----------------------------------------------------------------------------
//  2020-11-23 - Version 1.2 - fixed bug with timed choice without message
//  2020-11-07 - Version 1.1 - added plugin order fix
//  2020-10-11 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MessageTimer = true;

var Galv = Galv || {};                  // Galv's main object
Galv.mTimer = Galv.mTimer || {};        // Galv's stuff
Galv.mTimer.pluginName = "GALV_MessageTimerMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.2) Visual timer for messages and choices.
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 * @orderBefore GALV_MessageStylesMZ
 *
 *
 * @param globalTimer
 * @text Global Message Timer
 * @desc A timer that will display for ALL messages/choices in your game (in seconds)
 * @default 0
 *
 * @param timerHeight
 * @text Timer Height
 * @desc The height of the timer bar
 * @default 10
 *
 * @param timerMaxWidth
 * @text Timer Max Width
 * @desc The timer is the same size as the message or choice window but not larger than this value. Leave blank to not use.
 * @default 
 *
 * @param timerPadding
 * @text Timer Padding
 * @desc The timer graphic will be the width of the message or choice window minus this amount both sides.
 * @default 10
 *
 * @param timerPos
 * @text Timer Position
 * @type select
 * @desc The position of the timer - top or bottom
 * @default top
 * @option Bottom
 * @value bottom
 * @option Top
 * @value top
 *
 * @param timerOffset
 * @text Timer Offset
 * @desc The timer graphic will be offset x,y pixels.
 * @default 0,0
 *
 * @param timerColor1
 * @text Timer Color Back
 * @desc The color of the back timer image. R,G,B,opacity (eg. 255,255,255,0.5)
 * @default 0,0,0,0.5
 *
 * @param timerColor2
 * @text Timer Color Front
 * @desc The color of the front timer image. R,G,B,opacity (eg. 255,255,255,0.5)
 * @default 255,255,255,1
 *
 *
 * @help
 *   Galv's Message Timer
 * ----------------------------------------------------------------------------
 * This plugin allows you to start a message timer that will automatically
 * close the message or cancel the choices window when it expires. This can be
 * used when you want the user to only have limited time to make a selection.
 *
 * ----------------------------------------------------------------------------
 *   SHOW MESSAGE or SHOW CHOICES - Text code
 * ----------------------------------------------------------------------------
 *
 *   \MT[x]     // used to set a timer for the message box (if in a message) or
 *              // a choice window (if it appears in any choice text)
 *              // x is the number of seconds to set the timer to.
 *
 * ----------------------------------------------------------------------------
 *   NOTES
 * ----------------------------------------------------------------------------
 * When using a 'Show Choices' event command with a timer, when the timer
 * expires it will select whatever option you chose for 'Cancel'. If you
 * choose 'disallow', the timer will still cancel the choice and you can use a
 * conditional branch with 'script' (see below) to add event commands if that
 * happens.
 *
 * Make sure this plugin comes BEFORE my Message Styles plugin in the plugin
 * list.
 *
 * The timer will NOT cancel a message if it is paused using text commands
 * such as /. or /| when the timer expires.
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALLS
 * ----------------------------------------------------------------------------
 *
 *   Galv.mTimer.visible(status);   // status can be true or false
 *                                  // true for visible, false for invisible
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT for CONDITIONAL BRANCH
 * ----------------------------------------------------------------------------
 * Use this script in a conditional branch below a 'Show Choices' event command
 * for if the timer ran out and the choice/message was auto-closed.
 *
 *  Galv.mTimer.autoCancelled
 *
 *
 */
//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

// PLUGIN STUFF
//-----------------------------------------------------------------------------

Galv.mTimer.globalTimer = Number(PluginManager.parameters(Galv.mTimer.pluginName)['globalTimer']);
Galv.mTimer.timerHeight = Number(PluginManager.parameters(Galv.mTimer.pluginName)['timerHeight']);
Galv.mTimer.timerMaxWidth = Number(PluginManager.parameters(Galv.mTimer.pluginName)['timerMaxWidth']);
Galv.mTimer.pad = Number(PluginManager.parameters(Galv.mTimer.pluginName)['timerPadding']);
Galv.mTimer.position = PluginManager.parameters(Galv.mTimer.pluginName)['timerPos'];
Galv.mTimer.offset = PluginManager.parameters(Galv.mTimer.pluginName)['timerOffset'].split(",");
Galv.mTimer.timerColor1 = "rgba(" + PluginManager.parameters(Galv.mTimer.pluginName)['timerColor1'] + ")";
Galv.mTimer.timerColor2 = "rgba(" + PluginManager.parameters(Galv.mTimer.pluginName)['timerColor2'] + ")";
Galv.mTimer.autoCancelled = false;

Galv.mTimer.visible = function(status) {
	$gameSystem._messageTimer.visible = status;
};

// GAME SYSTEM
//-----------------------------------------------------------------------------

Galv.mTimer.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	this._messageTimer = {
		height: Galv.mTimer.timerHeight,
		width: Galv.mTimer.timerMaxWidth,
		position: Galv.mTimer.position,
		global: Galv.mTimer.globalTimer,
		visible: true,
		remaining: 0,
		pad: Galv.mTimer.pad,
		ox: Number(Galv.mTimer.offset[0]),
		oy: Number(Galv.mTimer.offset[1]),
		color1: Galv.mTimer.timerColor1,
		color2: Galv.mTimer.timerColor2
	};
	Galv.mTimer.Game_System_initialize.call(this);
};


// GAME MESSAGE
//-----------------------------------------------------------------------------

Galv.mTimer.Game_Message_clear = Game_Message.prototype.clear;
Game_Message.prototype.clear = function() {
	this._messageTimer = -2;
	Galv.mTimer.Game_Message_clear.call(this);
};

Game_Message.prototype.startMessageTimer = function(seconds) {
	Galv.mTimer.autoCancelled = false;
	const frames = seconds ? Math.round(seconds * 60) : -2;
	this._messageTimerMax = frames;
	this._messageTimer = frames;
};


// WINDOW BASE
//-----------------------------------------------------------------------------

Galv.mTimer.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
	text = Galv.mTimer.Window_Base_convertEscapeCharacters.call(this,text);
	text = text.replace(/\x1bMT\[(\d+)\]/gi, (_, p1) =>
		{	
			this.startMessageTimer(Number(p1));
			return "";
		}
    );
	if ($gameSystem._messageTimer.global && $gameMessage._messageTimer == -2) $gameMessage.startMessageTimer($gameSystem._messageTimer.global); // start global timer if text code doesn't exist
	return text;
};

Window_Base.prototype.startMessageTimer = function(time) {
	$gameMessage.startMessageTimer(time);
};


// WINDOW MESSAGE
//-----------------------------------------------------------------------------

Galv.mTimer.Window_Message_updateInput = Window_Message.prototype.updateInput;
Window_Message.prototype.updateInput = function() {
	if ($gameMessage._messageTimer == -1) {
		Input.update();
		this.pause = false;
		if (this._choiceListWindow && this._choiceListWindow.isOpen()) this._choiceListWindow.autoCancel();
		if (!this._textState) {
			this.terminateMessage();
		}
		$gameMessage._messageTimer = -2;
		return true;
	}
	return Galv.mTimer.Window_Message_updateInput.call(this);
};

Window_ChoiceList.prototype.autoCancel = function() {
	this.active = false;
	Galv.mTimer.autoCancelled = true; // for use in Conditional Branch if cancel is disallowed but timer does the cancel
	$gameMessage.onChoice($gameMessage.choiceCancelType());
	this._messageWindow.terminateMessage();
	this.close();
};


// WINDOW CHOICELIST
//-----------------------------------------------------------------------------

Galv.mTimer.Window_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
	Galv.mTimer.Window_ChoiceList_start.call(this);
	// start global default message timer (if not already running)
	if ($gameMessage._messageTimer == -2 && $gameSystem._messageTimer.global) $gameMessage.startMessageTimer($gameSystem._messageTimer.global);
};

Window_Base.prototype.startMessageTimer = function(time) {
	if ($gameMessage._messageTimer == -2) $gameMessage.startMessageTimer(time);
};


// SCENE MESSAGE
//-----------------------------------------------------------------------------

Galv.mTimer.Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
Scene_Message.prototype.createAllWindows = function() {
	Galv.mTimer.Scene_Message_createAllWindows.call(this);
	this.createMessageTimer();
};

Scene_Message.prototype.createMessageTimer = function() {
	this._messageTimerSprite = new Sprite_MessageTimer(this._messageWindow,this._choiceListWindow);
    this.addChild(this._messageTimerSprite);
};


// SPRITE MESSAGETIMER
//-----------------------------------------------------------------------------

function Sprite_MessageTimer() {
    this.initialize(...arguments);
}

Sprite_MessageTimer.prototype = Object.create(Sprite.prototype);
Sprite_MessageTimer.prototype.constructor = Sprite_MessageTimer;

Sprite_MessageTimer.prototype.initialize = function(messageWindow,choiceWindow) {
    Sprite.prototype.initialize.call(this);
	this._messageWindow = messageWindow;
	this._choiceWindow = choiceWindow;
	this.anchor.x = 0.5;
	this.opacity = 0;
	this._target = this._messageWindow;
	this._xo = (Graphics.width - Graphics.boxWidth) / 2 + $gameSystem._messageTimer.ox;
	this._yo = (Graphics.height - Graphics.boxHeight) / 2 + $gameSystem._messageTimer.oy;
    this.createBitmap();
    this.update();
};

Sprite_MessageTimer.prototype.destroy = function(options) {
    this.bitmap.destroy();
    Sprite.prototype.destroy.call(this, options);
};

Sprite_MessageTimer.prototype.createBitmap = function() {
	if (this.bitmap) this.bitmap.destroy();
	let width = this._target.width;
	if ($gameSystem._messageTimer.width) width = Math.min(width,$gameSystem._messageTimer.width);
	const height = $gameSystem._messageTimer.height;
    this.bitmap = new Bitmap(width, height);
};

Sprite_MessageTimer.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
    this.updatePosition();
    this.updateVisibility();
};

Sprite_MessageTimer.prototype.updateBitmap = function() {
	// If message window width is differet, create bitmap again
	if (this._choiceWindow.active && !this._messageWindow.isOpen()) {
		// display on choice window
		if (this.width != this._choiceWindow.width) {
			this._target = this._choiceWindow;
			this.createBitmap();
		}
	} else {
		// display on message window
		if (this.width != this._messageWindow.width) {
			this._target = this._messageWindow;
			this.createBitmap();
		}
	}
	// redraw if timer is active
	if ($gameMessage._messageTimer >= 0) {
		this.redraw();
		$gameMessage._messageTimer -= 1;
	}
};

Sprite_MessageTimer.prototype.drawRect = function(x, y, width, height) {
    const mainColor = $gameSystem._messageTimer.color2;
    const backColor = $gameSystem._messageTimer.color1;

	const pad = $gameSystem._messageTimer.pad;
	x += pad;
	width -= pad * 2;

	// draw backdrop
    this.bitmap.fillRect(x, y, width, height, backColor);
	
	// draw remaining timer	
	const percent = $gameMessage._messageTimer / $gameMessage._messageTimerMax || 0;
	const currentWidth =  (width - 2) * percent;
	x = (x + 1) + width / 2 - currentWidth / 2;
    this.bitmap.fillRect(x, y + 1, currentWidth, height - 2, mainColor);
};

Sprite_MessageTimer.prototype.redraw = function() {
    const width = this.bitmap.width;
    const height = this.bitmap.height;
    this.bitmap.clear();
	this.drawRect(0,0,width,height);
};

Sprite_MessageTimer.prototype.updatePosition = function() {
    this.x = this._target.x + this._target.width / 2 + this._xo;
	const pos = $gameSystem._messageTimer.position == "top" ? 0 : this._target.height - this.bitmap.height; // top or bottom
    this.y = this._target.y + this._yo + pos;
};

Sprite_MessageTimer.prototype.updateVisibility = function() {
	this.visible = $gameSystem._messageTimer.visible;
	this.opacity += $gameMessage._messageTimer > 0 ? 30 : -30;
};