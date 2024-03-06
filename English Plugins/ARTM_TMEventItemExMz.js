// ===================================================
// ARTM_TMEventItemExMz
// Copyright (c) 2021 Artemis
// Translated: IkuSenpai
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 Initial release
// 1.0.1 Adjusted the cancel button position during item selection extension
//=============================================================================
// TMPlugin - Item Selection Extension
// Version: 1.1.0
// Last Update: 2017/01/24
// Distributor: http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds a help window to the item selection process and allows setting whether to display the quantity and the number of rows for each item type.
 * @author Artemis
 *
 * @help ARTM_TMEventItemExMz
 * This is an MZ port of tomoaky's "Item Selection Extension ver1.1.0" plugin.
 * The basic functionality remains unchanged.
 *
 * [Usage]
 *   You can change the following settings for each item type:
 *   ・Whether to display the help window
 *   ・Whether to display the quantity
 *   ・The number of rows for the item selection window
 *
 *   Using memo tags and plugin commands, you can further classify the items to be displayed as candidates.
 *
 * [Plugin Commands]
 * Command Name: Set Event Item Subcategory
 *   Execute this command just before the event command 'Item Selection Process' to display only items specified in the subcategory.
 *
 * Arguments: Subcategory Name
 *   Specify the subcategory name.
 *   <Example> If you specify "card" for the subcategory name
 *   For example, when the event command selects Important Item, it displays only items with the subcategory set to card among the owned Important Items.
 * 
 *   The effect of this command is reset when the item selection is completed (or canceled).
 *
 * [Note Tags (Items)]
 *   <subCategory:xxxx>
 *   Specify the subcategory name in xxxx.
 *
 *   ≪Example≫
 *   <subCategory:card>
 *   Sets the subcategory for items with this tag to card.
 * 
 * @param helpWindowEnabledItem
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the help window during item selection.
 * Default: true (do not display if false)
 *
 * @param helpWindowEnabledKey
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the help window during Important Item selection.
 * Default: true (do not display if false)
 *
 * @param helpWindowEnabledA
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the help window during Hidden Item A selection.
 * Default: true (do not display if false)
 *
 * @param helpWindowEnabledB
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the help window during Hidden Item B selection.
 * Default: true (do not display if false)
 *
 * @param showItemNumberItem
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the quantity of items.
 * Default: true (do not display if false)
 *
 * @param showItemNumberKey
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the quantity of Important Items.
 * Default: true (do not display if false)
 *
 * @param showItemNumberA
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the quantity of Hidden Item A.
 * Default: true (do not display if false)
 *
 * @param showItemNumberB
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @default true
 * @desc Whether to display the quantity of Hidden Item B.
 * Default: true (do not display if false)
 *
 * @param numVisibleRowsItem
 * @type number
 * @default 4
 * @desc Number of rows displayed for item selection.
 * Default: 4
 *
 * @param numVisibleRowsKey
 * @type number
 * @default 4
 * @desc Number of rows displayed for Important Item selection.
 * Default: 4
 *
 * @param numVisibleRowsA
 * @type number
 * @default 4
 * @desc Number of rows displayed for Hidden Item A selection.
 * Default: 4
 *
 * @param numVisibleRowsB
 * @type number
 * @default 4
 * @desc Number of rows displayed for Hidden Item B selection.
 * Default: 4
 *
 * @param fixPlacement
 * @type select
 * @option top
 * @value top
 * @option bottom
 * @value bottom
 * @default top
 * @desc Window position when there is no message window.
 * Default: top [top / bottom / (default for others)]
 * 
 * @command setEventItemSubCategory
 * @text Set Event Item Subcategory
 * @desc Set event item subcategory.
 *
 * @arg name
 * @type string
 * @default ""
 * @text Subcategory Name
 * @desc Specify the subcategory name.
 *
 */

var Imported = Imported || {};
Imported.TMEventItemEx = true;

(() => {

    const PLUGIN_NAME = "ARTM_TMEventItemExMz";
    const PARAMS = PluginManager.parameters(PLUGIN_NAME);
    var TMPlugin = TMPlugin || {};
    TMPlugin.EventItemEx = {};
    TMPlugin.EventItemEx.Parameters = PARAMS;
    TMPlugin.EventItemEx.HelpWindowEnabledItem = PARAMS["helpWindowEnabledItem"].toLowerCase() === "true";
    TMPlugin.EventItemEx.HelpWindowEnabledKey = PARAMS["helpWindowEnabledKey"].toLowerCase() === "true";
    TMPlugin.EventItemEx.HelpWindowEnabledA = PARAMS["helpWindowEnabledA"].toLowerCase() === "true";
    TMPlugin.EventItemEx.HelpWindowEnabledB = PARAMS["helpWindowEnabledB"].toLowerCase() === "true";
    TMPlugin.EventItemEx.ShowItemNumberItem = PARAMS["showItemNumberItem"].toLowerCase() === "true";
    TMPlugin.EventItemEx.ShowItemNumberKey  = PARAMS["showItemNumberKey"].toLowerCase() === "true";
    TMPlugin.EventItemEx.ShowItemNumberA    = PARAMS["showItemNumberA"].toLowerCase() === "true";
    TMPlugin.EventItemEx.ShowItemNumberB    = PARAMS["showItemNumberB"].toLowerCase() === "true";
    TMPlugin.EventItemEx.NumVisibleRowsItem = +Number(PARAMS["numVisibleRowsItem"] || "4");
    TMPlugin.EventItemEx.NumVisibleRowsKey  = +Number(PARAMS["numVisibleRowsKey"] || "4");
    TMPlugin.EventItemEx.NumVisibleRowsA    = +Number(PARAMS["numVisibleRowsA"] || "4");
    TMPlugin.EventItemEx.NumVisibleRowsB    = +Number(PARAMS["numVisibleRowsB"] || "4");
    TMPlugin.EventItemEx.FixPlacement       = PARAMS["fixPlacement"];

    PluginManager.registerCommand(PLUGIN_NAME, "setEventItemSubCategory", args => {
        $gameTemp.setEventItemSubCategory(args.name);
    });

    //-----------------------------------------------------------------------------
    // Game_Temp
    //

    Game_Temp.prototype.setEventItemSubCategory = function(category) {
        this._eventItemSubCategory = category;
    };

    Game_Temp.prototype.eventItemSubCategory = function() {
        return this._eventItemSubCategory;
    };

    //-----------------------------------------------------------------------------
    // Window_EventItem
    //

    Window_EventItem.prototype.isHelpWindowEnabled = function() {
        const itypeId = $gameMessage.itemChoiceItypeId();
        if (itypeId === 1) {
            return TMPlugin.EventItemEx.HelpWindowEnabledItem;
        } else if (itypeId === 2) {
            return TMPlugin.EventItemEx.HelpWindowEnabledKey;
        } else if (itypeId === 3) {
            return TMPlugin.EventItemEx.HelpWindowEnabledA;
        } else if (itypeId === 4) {
            return TMPlugin.EventItemEx.HelpWindowEnabledB;
        }
        return false;
    };

    const _Window_EventItem_start = Window_EventItem.prototype.start;
    Window_EventItem.prototype.start = function() {
        this.height = this.fittingHeight(this.numVisibleRows());
        _Window_EventItem_start.call(this);
        if (this.isHelpWindowEnabled()) {
            this._helpWindow.open();
        }
    };
    
    Window_EventItem.prototype.close = function() {
        SceneManager._scene.removeChild(this._cancelButtonGbl);
        Window_Base.prototype.close.call(this);
    };

    const _Window_EventItem_numVisibleRows = Window_EventItem.prototype.numVisibleRows;
    Window_EventItem.prototype.numVisibleRows = function() {
        const itypeId = $gameMessage.itemChoiceItypeId();
        if (itypeId === 1) {
            return TMPlugin.EventItemEx.NumVisibleRowsItem;
        } else if (itypeId === 2) {
            return TMPlugin.EventItemEx.NumVisibleRowsKey;
        } else if (itypeId === 3) {
            return TMPlugin.EventItemEx.NumVisibleRowsA;
        } else if (itypeId === 4) {
            return TMPlugin.EventItemEx.NumVisibleRowsB;
        }
        return _Window_EventItem_numVisibleRows.call(this);
    };

    const _Window_EventItem_updatePlacement = Window_EventItem.prototype.updatePlacement;
    Window_EventItem.prototype.updatePlacement = function() {
        const enabled = this.isHelpWindowEnabled();
        const helpWindow = this._helpWindow;
        let completed = this.updatePlacementSel();
        if (enabled && !completed) {
            if (this._messageWindow.y >= Graphics.boxHeight / 2) {
                this.y = helpWindow.height;
                completed = true;
            } else {
                this.y = Graphics.boxHeight - this.height;
                completed = true;
            }
        } else if (!completed) {
            _Window_EventItem_updatePlacement.call(this);
            completed = true;
        }
        if (enabled) {
            helpWindow.y = this.y - helpWindow.height;
        }
    };

    Window_EventItem.prototype.updatePlacementSel = function() {
        const enabled = this.isHelpWindowEnabled();
        let completed = false;
        if (!$gameMessage.hasText()) {
            switch (TMPlugin.EventItemEx.FixPlacement) {
                case "top":
                    this.y = enabled ? this._helpWindow.height : 0;
                    completed = true;
                    break;
                case "bottom":
                    this.y = Graphics.boxHeight - this.height;
                    completed = true;
            }
        }
        return completed;
    };

    const _Window_EventItem_createCancelButton = Window_EventItem.prototype.createCancelButton;
    Window_EventItem.prototype.createCancelButton = function() {
        _Window_EventItem_createCancelButton.call(this);
        if (ConfigManager.touchUI) {
            this._cancelButtonGbl = new Sprite_Button("cancel");
            this._cancelButtonGbl.visible = false;
            this.removeChild(this._cancelButton);
        }
    };

    const _Window_EventItem_placeCancelButton = Window_EventItem.prototype.placeCancelButton;
    Window_EventItem.prototype.placeCancelButton = function() {
        _Window_EventItem_placeCancelButton.call(this);
        const spacing = 8;
        switch (TMPlugin.EventItemEx.FixPlacement) {
            case "top":
                this.copyCancelButton();
                this._cancelButtonGbl.y = this.y + this.height;
                this._cancelButtonGbl.y += spacing;
                SceneManager._scene.addChild(this._cancelButtonGbl);
                break;
            case "bottom":
                const height = this._cancelButtonGbl.height;
                this.copyCancelButton();
                if (this.isHelpWindowEnabled()) 
                {
                    this._cancelButtonGbl.y = this._helpWindow.y - height;
                } else {
                    this._cancelButtonGbl.y = this.y - height;
                }
                this._cancelButtonGbl.y -= spacing;
                SceneManager._scene.addChild(this._cancelButtonGbl);
        }
    };

    Window_EventItem.prototype.copyCancelButton = function() {
        this._cancelButtonGbl.x = this._cancelButton.x;
        this._cancelButtonGbl.width = this._cancelButton.width;
        this._cancelButtonGbl.height = this._cancelButton.height;
        this._cancelButtonGbl.visible = true;
    };

    const _Window_EventItem_includes = Window_EventItem.prototype.includes;
    Window_EventItem.prototype.includes = function(item) {
        if (!_Window_EventItem_includes.call(this, item)) return false;
        const subCategory = $gameTemp.eventItemSubCategory();
        return !subCategory || item.meta.subCategory === subCategory;
    };

    const _Window_EventItem_onOk = Window_EventItem.prototype.onOk;
    Window_EventItem.prototype.onOk = function() {
        _Window_EventItem_onOk.call(this);
        this._helpWindow.close();
        $gameTemp.setEventItemSubCategory(null);
    };

    const _Window_EventItem_onCancel = Window_EventItem.prototype.onCancel;
    Window_EventItem.prototype.onCancel = function() {
        _Window_EventItem_onCancel.call(this);
        this._helpWindow.close();
        $gameTemp.setEventItemSubCategory(null);
    };

    Window_EventItem.prototype.needsNumber = function() {
        const itypeId = $gameMessage.itemChoiceItypeId();
        return (itypeId === 1 && TMPlugin.EventItemEx.ShowItemNumberItem) ||
               (itypeId === 2 && TMPlugin.EventItemEx.ShowItemNumberKey) ||
               (itypeId === 3 && TMPlugin.EventItemEx.ShowItemNumberA) ||
               (itypeId === 4 && TMPlugin.EventItemEx.ShowItemNumberB);
    };

    //-----------------------------------------------------------------------------
    // Scene_Message
    //

    const _Scene_Message_createEventItemWindow = Scene_Message.prototype.createEventItemWindow;
    Scene_Message.prototype.createEventItemWindow = function() {
        const wx = 0;
        const wy = 0;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(2, false);
        const rect = new Rectangle(wx, wy, ww, wh);
        _Scene_Message_createEventItemWindow.call(this);
        this._messageWindow._helpWindow = new Window_Help(rect);
        this._messageWindow._helpWindow.openness = 0;
        this._eventItemWindow.setHelpWindow(this._messageWindow._helpWindow);
        this.addWindow(this._messageWindow._helpWindow);
    };

})();
