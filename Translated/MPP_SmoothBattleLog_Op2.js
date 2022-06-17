//=============================================================================
// MPP_SmoothBattleLog_Op2.js
//=============================================================================
// Copyright (c) 2021 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Display the log only with the item name or skill name.
 * @author Mokusei Penguin
 * @url 
 * 
 * @base MPP_SmoothBattleLog
 * @orderAfter MPP_SmoothBattleLog
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Supplement
 *  - When using an item or skill, the log display is only the name,
 *    but the battle log confirmation command displays the normal log.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Not Display Skils
 *      @desc 
 *      @type skill[]
 *      @default ["1","2"]
 * 
 *  @param Show Icon?
 *      @desc 
 *      @type boolean
 *      @default false
 * 
 *  @param Background Type
 *      @desc 
 *      @type select
 *          @option 0:Window
 *              @value 0
 *          @option 1:Dim
 *              @value 1
 *          @option 2:Transparent
 *              @value 2
 *      @default 0
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ログ表示をアイテム名またはスキル名のみにします。
 * @author 木星ペンギン
 * @url 
 * 
 * @base MPP_SmoothBattleLog
 * @orderAfter MPP_SmoothBattleLog
 *
 *
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ 補足
 *  - アイテムやスキルを使用した際のログ表示は名前のみとなりますが、
 *    戦闘ログの確認コマンドでは通常のログが表示されます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Not Display Skils
 *      @text 表示しないスキルID
 *      @desc 
 *      @type skill[]
 *      @default ["1","2"]
 * 
 *  @param Show Icon?
 *      @text アイコン表示
 *      @desc 
 *      @type boolean
 *      @default false
 * 
 *  @param Background Type
 *      @text ウィンドウ背景
 *      @desc 
 *      @type select
 *          @option 0:ウィンドウ
 *              @value 0
 *          @option 1:暗くする
 *              @value 1
 *          @option 2:透明
 *              @value 2
 *      @default 0
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_SmoothBattleLog_Op2';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    const param_NotDisplaySkils = JSON.parse(parameters['Not Display Skils'] || '[]', paramReplace);
    const param_ShowIcon = parameters['Show Icon?'] === 'true';
    const param_BackgroundType = Number(parameters['Background Type'] || 0);

    //-------------------------------------------------------------------------
    // Window_BattleLog

    Window_BattleLog.prototype.setItemNameWindow = function(itemNameWindow) {
        this._itemNameWindow = itemNameWindow;
    };

    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        _Window_BattleLog_clear.apply(this, arguments);
        if (this._itemNameWindow) {
            this._itemNameWindow.clear();
        }
    };
    
    Window_BattleLog.prototype.refresh = function() {
    };
    
    const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        _Window_BattleLog_displayAction.apply(this, arguments);
        if (
            DataManager.isSkill(item) &&
            !param_NotDisplaySkils.includes(item.id)
        ) {
            this.push('addItemText', item);
        }
    };

    Window_BattleLog.prototype.addItemText = function(item) {
        if (this._itemNameWindow) {
            this._itemNameWindow.setItem(item);
        }
    };

    //-------------------------------------------------------------------------
    // Window_ItemName

    class Window_ItemName extends Window_Base {
        constructor(rect) {
            super(rect);
            this._fontSize = $gameSystem.mainFontSize();
            this._item = null;
            this._text = '';
            this.setBackgroundType(param_BackgroundType);
        }

        updatePadding() {
            this.padding = 8;
        }
        
        setFontSize(fontSize) {
            this._fontSize = fontSize;
        }
    
        fontSize() {
            return this._fontSize;
        }
    
        lineHeight() {
            const lineHeight = super.lineHeight();
            return lineHeight - $gameSystem.mainFontSize() + this.fontSize();
        }

        calcTextHeight() {
            return this.lineHeight();
        }

        resetFontSettings() {
            super.resetFontSettings();
            console.log(this.fontSize());
            this.contents.fontSize = this.fontSize();
        }
    
        setItem(item) {
            if (this._item !== item) {
                this._item = item;
                this._text = item ? this.centerName(item) : '';
                this.refresh();
            }
        }
    
        clear() {
            this.setItem(null);
        }
    
        refresh() {
            this.updatePlacement();
            this.createContents();
            this.refreshDimmerBitmap();
            if (this._text) {
                this.drawTextEx(this._text, 8, 0, this.innerWidth);
            }
        }
        
        updatePlacement() {
            if (this._item) {
                this.width = this.windowWidth();
                this.height = this.itemHeight() + this.padding * 2;
            } else {
                this.width = 0;
                this.height = 0;
            }
            this.x = (Graphics.boxWidth - this.width) / 2;
        }
        
        windowWidth() {
            const textWidth = this.textSizeEx(this._text).width;
            const width = textWidth + 16 + this.padding * 2;
            return Math.min(width, Graphics.boxWidth);
        }
        
        centerName(item) {
            const iconText = param_ShowIcon ? `\\i[${item.iconIndex}]` : '';
            return '  ' + iconText + item.name + '  ';
        }

    }

    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        this.createItemNameWindow();
        _Scene_Battle_createAllWindows.apply(this, arguments);
    };
    
    Scene_Battle.prototype.createItemNameWindow = function() {
        const rect = this.itemNameWindowRect();
        this._itemNameWindow = new Window_ItemName(rect);
        this.addWindow(this._itemNameWindow);
    };
    
    Scene_Battle.prototype.itemNameWindowRect = function() {
        const logWindowRect = this.logWindowRect();
        const ww = 0;
        const wh = 0;
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = logWindowRect.y;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    const _Scene_Battle_createLogWindow = Scene_Battle.prototype.createLogWindow;
    Scene_Battle.prototype.createLogWindow = function() {
        _Scene_Battle_createLogWindow.apply(this, arguments);
        this._logWindow.setItemNameWindow(this._itemNameWindow);
        console.log(this._logWindow.fontSize());
        this._itemNameWindow.setFontSize(this._logWindow.fontSize());
    };
    
    Scene_Battle.prototype.updateLogWindowVisibility = function() {
        this._logWindow.visible = false;
        this._itemNameWindow.visible = !this._helpWindow.visible;
    };
    
})();
