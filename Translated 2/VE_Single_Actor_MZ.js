//=============================================================================
// One-Actor Menu Version 1.09
//=============================================================================
/*:
 * @target MZ
 * @plugindesc One-Actor's menu. This plugin is made for one playable actor only.
 * @author Ventiqu - 2017 (transplanted for RMMZ with GrayOgre 2021)
 *
 * @param Level_Number_x_Distance
 * @text Level-Number-x Distance
 * @desc Set 'level' -number x distance from the text.
 * default: 50
 * @type number
 * @default 50
 *
 * @param Class_text_x_Distance
 * @text Class text x Distance
 * @desc Set 'Class' -text's x distance.
 * default: 160
 * @type number
 * @default 160
 *
 * @param Main_Menu_EXP_Display
 * @text Main Menu EXP Display
 * @desc Set the EXP displayed in Main menu. See help for detail.
 * default: Total
 * @default 0
 * @type select
 * @option Total
 * @value 0
 * @option Current
 * @value 1
 * @option Percent
 * @value 2
 * @option None
 * @value 3
 *
 * @param ExptoLvl_text_x_Distance
 * @text ExptoLvl text x Distance
 * @desc Set 'ExpToLvl' -numbers x distance.
 * default: 160
 * @type number
 * @default 160
 *
 * @param Status_Window_Width
 * @text Status Window Width
 * @desc Set Status window's width. You might need to change other
 * parameters as well. Default: 325
 * @type number
 * @default 325
 *
 * @help
 * -Update #9 30.4.2021-
 *
 * Remember to turn off Formation! Go to Database - System - Menu Commands and turn off Formation.
 * This changes menu to look like its meant for one actor only.
 *
 * --Using ACTOR NOTES--
 * Go to Database (f9) and to Actors. Then there you can set a note to that actor.
 *
 * <avatar:filename> set actor's different picture.
 * put file at img/pictures and use same file name as parameter.
 *
 * example: <avatar:Bust_test>
 * Case sensetive.
 *
 * Main Menu EXP Display:
 *    -Total  : Show total EXP gained/needed
 *    -Current: Show EXP gained/needed this level
 *    -Percent: Show how many EXP gained this level in percentage
 *    -None   : Hide EXP.
 *  At Max Level, EXP displayed in main menu will change to "MAX" text.
 *
 * -------------
 * --Changelog--
 * -------------
 * 1.09 - 30.4.2021 - transplanted for the RPG Maker MZ with GrayOgre
 * 1.08+- 19.9.2020 - EXP can be hidden or displayed in "gain/need" for this level
 * 1.07+- 18.9.2020 - EXP can be displayed in number or percentage
 * 1.05+- 20.1.2020 - Added params for "x" and "y" coordinates and command row visibility
 * 1.05 - 25.1.2017 - Actor note added so you can add a bust picture of the actor. Plugin commands added.
 * 1.04 - 20.11.2016 - Modified script.
 * 1.03 - 25.6.2016 - Minor fixes.
 * 1.02 - 11.6.2016 - Fixed black screen bug.
 * 1.01 - 1.12.2015 - Skill-, Equip- and Status menu will open for actor 1 only so no more need to press OK before you can jump to new window.
 */

 (function() {
    'use strict';

   function Scene_Base() {
     this.initialize.apply(this, arguments);
   }

   const parameters  = PluginManager.parameters('VE_Single_Actor_MZ');
   const xdistance   = Number(parameters['Level_Number_x_Distance'] || 50);
   const xclass      = Number(parameters['Class_text_x_Distance'] || 160);
   const dispExp     = Number(parameters['Main_Menu_EXP_Display'] || 0);
   const xexptolvl   = Number(parameters['ExptoLvl_text_x_Distance'] || 160);
   const windowwidth = Number(parameters['Status_Window_Width'] || 325)

// this will create menus like status- and gold window
     const _Scene_Menu_create = Scene_Menu.prototype.create;
     Scene_Menu.prototype.create = function() {
         _Scene_Menu_create.call(this);
         this._goldWindow.x = this._commandWindow.x;
         this._goldWindow.y = this._commandWindow.y + this._commandWindow.height;
     };
// this will create commandwindow
    Scene_Menu.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_MenuCommand(rect); //Position for menu x and y
        this._commandWindow.setHandler('item',      this.commandItem.bind(this));
        this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
        this._commandWindow.setHandler('status',    this.commandPersonal.bind(this));
        this._commandWindow.setHandler('formation', this.commandFormation.bind(this));
        this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
        this._commandWindow.setHandler('save',      this.commandSave.bind(this));
        this._commandWindow.setHandler('gameEnd',   this.commandGameEnd.bind(this));
        this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };


// Commnad Window Rectangle
    Scene_Menu.prototype.commandWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(8, true);
        const wx = Math.floor((Graphics.boxWidth - ww - windowwidth) / 2); 
        const wy = Math.floor((Graphics.boxHeight - wh - this.calcWindowHeight(1, true)) / 2);
        return new Rectangle(wx, wy, ww, wh);
    };
    
// this will push skill, equip or status depends on which you selected.
    Scene_Menu.prototype.commandPersonal = function() {
        this._statusWindow.setFormationMode(false);
        switch (this._commandWindow.currentSymbol()) {
        case 'skill':
            SceneManager.push(Scene_Skill);
            break;
        case 'equip':
            SceneManager.push(Scene_Equip);
            break;
        case 'status':
            SceneManager.push(Scene_Status);
            break;
          }
    };
// removed text from this so this wont mess around
    Scene_Menu.prototype.onPersonalOk = function() {
    };

    Scene_Menu.prototype.statusWindowRect = function() {
        const rect1 = this.commandWindowRect();
        const rect2 = this.goldWindowRect();
        const ww = windowwidth;
        const wh = rect1.height + rect2.height;
        const wx = rect1.x + rect1.width;
        const wy = rect1.y;
        return new Rectangle(wx, wy, ww, wh);
    };

// Rows for menucommands
    Window_MenuCommand.prototype.numVisibleRows = function() {
        return comwinrow; //7;
    };
// maxCols is for max party members shown. This is set to 1, because this is single-player menu.
// do not change this unless you know what you are doing.
    Window_MenuStatus.prototype.maxCols = function() {
        return 1;
    };
// just like maxCols, but this is rows. This is set to 1, because this is single-player menu.
// do not change this unless you know what you are doing.
    Window_MenuStatus.prototype.numVisibleRows = function() {
        return 1;
    };
// draws actor face.
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        const actor = $gameParty.members()[index];
        const rect = this.itemRectForText(index);
        // load stand_picture
        const bitmapName = $dataActors[actor.actorId()].meta.avatar;
        const bitmap = bitmapName ? ImageManager.loadPicture(bitmapName) : null; // ? on ternary operator.
        const w = Math.min(rect.width, (bitmapName ? bitmap.width : 144));
        const h = Math.min(rect.height, (bitmapName ? bitmap.height : 144));
        const lineHeight = this.lineHeight();
        this.changePaintOpacity(actor.isBattleMember());
        // if actor has note <actor: filename> then do this.
        if ( bitmap ) {
            const sx = (bitmap.width > w) ? (bitmap.width - w) / 2 : 0;
            const sy = (bitmap.height > h) ? (bitmap.height - h) / 2 : 0;
            const dx = (bitmap.width > rect.width) ? rect.x :
                rect.x + (rect.width - bitmap.width) / 2;
            const dy = (bitmap.height > rect.height) ? rect.y :
                rect.y + (rect.height - bitmap.height) / 2;
            this.contents.blt(bitmap, sx, sy, w, h, dx, dy);
        } else { // if there is not a note or its invalid, do the normal setting.
            this.drawActorFace(actor, rect.x + 60, rect.y + lineHeight * 2.0, w, h);
        }
        this.changePaintOpacity(true);
    };
// draws actor name, level, class, hp, mp and status icons.
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        const actor = $gameParty.members()[index];
        const rect = this.itemRectForText(index);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        const bottom = y + rect.height;
        const lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y + lineHeight * 0, width);
        this.drawActorLevel(actor, x, y + lineHeight * 1, width);
        this.drawActorClass(actor, x + xclass, y + lineHeight * 0, width);
        this.drawActorHp(actor, x, bottom - lineHeight * 3.1, width);
        this.drawActorMp(actor, x, bottom - lineHeight * 2.1, width);
        this.drawActorIcons(actor, x, bottom - lineHeight * 1, width);
        if (actor.isMaxLevel()) {
            //if character reach max level, MAX will be displayed in main menu.
            this.changeTextColor(this.textColor(10));
            this.drawText("MAX", x + xexptolvl, y + lineHeight * 1, width);
            this.resetTextColor();
        } else {
            switch (dispExp) {
                //show Total EXP gain/need
                case 0:
                    // Thanks to thalesgal's friend who did this 'to Level' text!
                    const toLevel = actor.nextRequiredExp() +  actor.currentExp();
                    this.drawText(actor.currentExp() + "/ " + toLevel, x + xexptolvl, y + lineHeight * 1, width);
                    break;
                //show EXP gain/need for this level
                case 1:
                    // much thx to Lady_Blackpearl post about exp gauge
                    // maxExp is used to calculate the exact exp need for level up on the CURRENT characters level.
                    const maxExp1 = (actor.expForLevel(actor._level + 1) - actor.expForLevel(actor._level));;
                    // levelExp is used for know the exact exp obtained within the CURRENT LEVEL.
                    const levelExp1 = maxExp1 - actor.nextRequiredExp();
                    this.drawText(levelExp1 + "/" + maxExp1, x + xexptolvl, y +lineHeight * 1, width / 2);
                    break;
                //show EXP gained in this level in percentile
                case 2:
                    var maxExp2 = (actor.expForLevel(actor._level + 1) - actor.expForLevel(actor._level));;
                    var levelExp2 = maxExp2 - actor.nextRequiredExp();
                    var expPerc = Math.round((levelExp2 / maxExp2) * 100);
                    this.changeTextColor(this.systemColor());
                    this.drawText(TextManager.expA, x + xexptolvl, y + lineHeight *1, 60);
                    this.resetTextColor();
                    this.drawText(expPerc + "%", x + xexptolvl + 60, y +lineHeight * 1, width);
                    break;
                //don't show the EXP
                case 3:
                    break;
            }
        }
    };
// Draws actor's level number.
    Window_Base.prototype.drawActorLevel = function(actor, x, y) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        this.drawText(actor.level, x + xdistance, y, 36, 'left');
    };

    Window_Selectable.prototype.itemRectForText = function(index) {
        const rect = this.itemRect(index);
        rect.x += this.textPadding();
        rect.width -= this.textPadding() * 2;
        return rect;
    };

    Window_MenuStatus.prototype.textPadding = function() {
        return 6;
    };

    Window_MenuStatus.prototype.drawActorHp = function(actor, x, y, width) {
        width = width || 186;
        const color1 = ColorManager.hpGaugeColor1();
        const color2 = ColorManager.hpGaugeColor2();
        this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.hpA, x, y, 44);
        this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
            ColorManager.hpColor(actor), ColorManager.normalColor());
    };

    Window_MenuStatus.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
        const fillW = Math.floor(width * rate);
        const gaugeY = y + this.lineHeight() - 8;
        this.contents.fillRect(x, gaugeY, width, 6, ColorManager.gaugeBackColor());
        this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
    };

    Window_MenuStatus.prototype.drawCurrentAndMax = function(current, max, x, y, width, color1, color2) {
        const labelWidth = this.textWidth('HP');
        const valueWidth = this.textWidth('0000');
        const slashWidth = this.textWidth('/');
        const x1 = x + width - valueWidth;
        const x2 = x1 - slashWidth;
        const x3 = x2 - valueWidth;
        if (x3 >= x + labelWidth) {
            this.changeTextColor(color1);
            this.drawText(current, x3, y, valueWidth, 'right');
            this.changeTextColor(color2);
            this.drawText('/', x2, y, slashWidth, 'right');
            this.drawText(max, x1, y, valueWidth, 'right');
        } else {
        this.changeTextColor(color1);
        this.drawText(current, x1, y, valueWidth, 'right');
    };

    Window_MenuStatus.prototype.drawActorMp = function(actor, x, y, width) {
        width = width || 186;
        const color1 = ColorManager.mpGaugeColor1();
        const color2 = ColorManager.mpGaugeColor2();
        this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.mpA, x, y, 44);
        this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width, ColorManager.mpColor(actor), ColorManager.normalColor());
    };
    
};

Game_System.prototype.winCount = function() {
    return this._winCount;
};
})();
