//-----------------------------------------------------------------------------
//  Galv's Visual Novel Choices MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_VisualNovelChoicesMZ.js
//-----------------------------------------------------------------------------
//  2020-11-17 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_VisualNovelChoices = true;

var Galv = Galv || {};            // Galv's main object
Galv.VNC = Galv.VNC || {};        // Plugin object
Galv.VNC.pluginName = "GALV_VisualNovelChoicesMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.0) Changes how the "Choice" message boxes display to appear more like visual novels.
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 * @orderAfter GALV_MessageStylesMZ
 *
 * @param Command Width
 * @desc Width of the choice commands. This must be equal to or less than the VNButtons.png width.
 * @default 700
 *
 * @param Command Height
 * @desc Height of the choice commands
 * @default 48
 *
 * @param Always Middle
 * @desc Display Choices in the middle regardless of the "Show Choices" window position. true or false
 * @default true
 *
 * @param Message Gap
 * @desc Distance the choices are displayed away from the message window
 * @default 0
 *
 * @param Disabled Button
 * @desc The row number used to display button for a disabled choice (if using a plugin that can disable choices)
 * @default 3
 *
 * @requiredAssets img/system/VNButtons
 *
 * @help
 *   Galv's Visual Novel Choices
 * ----------------------------------------------------------------------------
 * Displays choices in a more visual novel style. The image for the choice
 * buttons should be put in /img/system/ folder and should be named:
 * "VNButtons.png". It is a single file that contains each button one on top
 * of the other.
 * The Command Width and Command Height settings control the size of the 
 * buttons while Command Gap controls the space between them. Make sure the
 * "Command Width" plugin setting is equal to the graphic's pixel width.
 *
 * The first button image in the VNButtons file is button 0. This is the
 * cursor image that displays over the buttons. The default button used if
 * none are specified in the choice option text will be button 1 (below the
 * cursor image).
 *
 * Using \b[x] in the choice option text, you can specify a different button
 * graphic that choice (x being the row number) and the button.
 *
 * The "Disabled Button" option in the plugin setting is for if you are using
 * a different plugin that disables choice commands such as:
 * "Disabled Choice Conditions" by Hime.
 *
 * ----------------------------------------------------------------------------
 *  SCRIPT CALL:
 * ----------------------------------------------------------------------------
 *
 *        $gameSystem.vnChoices = status;      // status can be true or false
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.VNC.width = Number(PluginManager.parameters(Galv.VNC.pluginName)["Command Width"]);
Galv.VNC.height = Number(PluginManager.parameters(Galv.VNC.pluginName)["Command Height"]);
Galv.VNC.alwaysMid = PluginManager.parameters(Galv.VNC.pluginName)["Always Middle"].toLowerCase() == 'true';
Galv.VNC.msgGap = Number(PluginManager.parameters(Galv.VNC.pluginName)["Message Gap"]);
Galv.VNC.disableBtn = Number(PluginManager.parameters(Galv.VNC.pluginName)["Disabled Button"]);

// Cache
Galv.VNC.Scene_Boot_loadSystemImages = Scene_Boot.prototype.loadSystemImages;
Scene_Boot.prototype.loadSystemImages = function() {
    ImageManager.loadSystem('VNButtons');
	Galv.VNC.Scene_Boot_loadSystemImages.call(this);
};

// Choice stuff
Galv.VNC.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.VNC.Game_System_initialize.call(this);
	this.vnChoices = true;
};

// Overwrite
Window_ChoiceList.prototype.textHeight = Window_ChoiceList.prototype.lineHeight;
Galv.VNC.Window_ChoiceList_lineHeight = Window_ChoiceList.prototype.lineHeight;
Window_ChoiceList.prototype.lineHeight = function() {return $gameSystem.vnChoices ? Galv.VNC.height : Galv.VNC.Window_ChoiceList_lineHeight.call(this);};
Galv.VNC.Window_ChoiceList_itemHeight = Window_ChoiceList.prototype.itemHeight;
Window_ChoiceList.prototype.itemHeight = function() {return $gameSystem.vnChoices ? Galv.VNC.height : Galv.VNC.Window_ChoiceList_itemHeight.call(this);};

Galv.VNC.Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
Window_ChoiceList.prototype.drawItem = function(index) {
	if ($gameSystem.vnChoices) {
		const rect = this.itemRectForText(index);
		this.drawButton(index,rect.y);
		if (index === this._index) this.drawButton(index,rect.y,true);
		const offset = 0;//(this.lineHeight() - this.textHeight()) * 0.5;
		this.drawTextEx(this.commandName(index), rect.x, rect.y + offset);
	} else {
		Galv.VNC.Window_ChoiceList_drawItem.call(this,index);
	};
};

Galv.VNC.Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
Window_ChoiceList.prototype.updatePlacement = function() {
	Galv.VNC.Window_ChoiceList_updatePlacement.call(this);
	if ($gameSystem.vnChoices && Galv.VNC.alwaysMid) {
		this.x = (Graphics.boxWidth - this.width) / 2;
	};
	if (this._messageWindow.y >= Graphics.boxHeight / 2) {
		this.y -= Galv.VNC.msgGap;
    } else {
        this.y += Galv.VNC.msgGap;
    };
};

Galv.VNC.Window_ChoiceList__refreshCursor = Window_ChoiceList.prototype._refreshCursor;
Window_ChoiceList.prototype._refreshCursor = function() {
	if ($gameSystem.vnChoices) {
		this._cursorSprite.opacity = 0;
	} else {
		Galv.VNC.Window_ChoiceList__refreshCursor.call(this);
	};
};

Galv.VNC.Window_ChoiceList_drawItemBackground = Window_ChoiceList.prototype.drawItemBackground;
Window_ChoiceList.prototype.drawItemBackground = function(index) {
	if ($gameSystem.vnChoices) return;
	Galv.VNC.Window_ChoiceList_drawItemBackground.call(this,index);
};

Window_ChoiceList.prototype.drawButton = function(index,y,cursor) {
    const bitmap = ImageManager.loadSystem('VNButtons');
    const pw = Galv.VNC.width;
    const ph = Galv.VNC.height;
	let bgId = 0;

    const sx = 0;
	if (cursor) {
		bgId = 0;
	} else {
		if (this._list[index].enabled === false || !this.choice_background) {
			bgId = Galv.VNC.disableBtn;
		} else {
			bgId = this.choice_background[index] ? this.choice_background[index] : 1;
		};
	};
    const sy = bgId * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, 0, y);
};

Galv.VNC.Window_ChoiceList_start = Window_ChoiceList.prototype.start;
Window_ChoiceList.prototype.start = function() {
	this.setupVNChoices();
	Galv.VNC.Window_ChoiceList_start.call(this);
};

Window_ChoiceList.prototype.setupVNChoices = function() {
	this.ChoiceSprites = [];
	this.choice_background = [];
	this._vnIndex = this._index;
    if ($gameSystem.vnChoices) {
      this.opacity = 0;
	} else {
      this.opacity = 255;
	};
};

Galv.VNC.Window_ChoiceList_update = Window_ChoiceList.prototype.update;
Window_ChoiceList.prototype.update = function() {
	Galv.VNC.Window_ChoiceList_update.call(this);
	if (this._vnIndex != this._index) {
		this.refresh();
		this._vnIndex = this._index;
	}
};

Galv.VNC.Window_ChoiceList_updateBackground = Window_ChoiceList.prototype.updateBackground;
Window_ChoiceList.prototype.updateBackground = function() {
	if ($gameSystem.vnChoices) {
		this._background = 2;
   	 	this.setBackgroundType(this._background);
	} else {
		Galv.VNC.Window_ChoiceList_updateBackground.call(this);
	};
    
};

Galv.VNC.Window_ChoiceList_convertEscapeCharacters = Window_ChoiceList.prototype.convertEscapeCharacters;
Window_ChoiceList.prototype.convertEscapeCharacters = function(text,index) {
	text = text.replace(/\\/g, '\x1b');
	text = text.replace(/\x1b\x1b/g, '\\');
	text = text.replace(/\x1bB\[(\d+)\]/gi, function() {
		this.choice_background[index] = parseInt(arguments[1]);
        return "";
    }.bind(this));
	
	return Galv.VNC.Window_ChoiceList_convertEscapeCharacters.call(this,text);
};

Window_ChoiceList.prototype.itemRectForText = function(index) {
    let rect = this.itemRect(index);
	if ($gameSystem.vnChoices) {

		let txt = $gameMessage._choices[index];
		
		// count icon code
		let icons = txt.match(/\\i\[/g) || txt.match(/\\I\[/g);
		icons = icons ? icons.length * 36 : 0;
		
		txt = this.convertEscapeCharacters(txt,index);
		txt = txt.replace(/i\[\d*\]/g,"");
		txt = txt.replace(/I\[\d*\]/g,"");
		
		txt = txt.replace(/c\[\d*\]/g,"");
		txt = txt.replace(/C\[\d*\]/g,"");
		const txtSize = this.textWidth(txt) + icons;

		rect.x = (Galv.VNC.width - txtSize) / 2;
	} else {
		rect.x += $gameSystem.windowPadding();
	};
	rect.width -= $gameSystem.windowPadding() * 2;
	return rect;
};

Window_ChoiceList.prototype.windowWidth = function() {
    const width = this.maxChoiceWidth() + this.padding * 2;
    return Math.min(width, Graphics.boxWidth);
};

Galv.VNC.Window_ChoiceList_maxChoiceWidth = Window_ChoiceList.prototype.maxChoiceWidth;
Window_ChoiceList.prototype.maxChoiceWidth = function() {
	if ($gameSystem.vnChoices) {
		return Galv.VNC.width;
	} else {
		return Galv.VNC.Window_ChoiceList_maxChoiceWidth.call(this);
	};
};

Galv.VNC.Window_Message_updateFloatChoiceWindow = Window_Message.prototype.updateFloatChoiceWindow;
Window_Message.prototype.updateFloatChoiceWindow = function() {
	if ($gameSystem.vnChoices) {
		let targetY = Graphics.height - this._choiceListWindow.height;
		if (this.y + this.height > targetY) targetY = 0;
			this._choiceListWindow.y = targetY;
		return;
	};
	Galv.VNC.Window_Message_updateFloatChoiceWindow.call(this);
};