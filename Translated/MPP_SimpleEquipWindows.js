//=============================================================================
// MPP_SimpleEquipWindows.js
//=============================================================================
// Copyright (c) 2017 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Delete [Equip] from the equipment command and change it so that it can be moved with the up and down keys.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * - Delete [Equip] from the equipment command and change it so that it can be
 *   moved with the up and down keys.
 * - For mouse or touch operation, both equipment command and equipment slot
 *   can be selected.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc 装備コマンドから[装備]を削除し、上下キーで移動できるように変更します。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * - 装備コマンドから[装備]を削除し、上下キーで移動できるように変更します。
 * - マウスorタッチ操作の場合、装備コマンドと装備スロットどちらも選択できます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 */

(() => {
    'use strict';

    //-------------------------------------------------------------------------
    // module_CursorLink

    const module_CursorLink = (obj) => {
        
        const _base_initialize = obj.initialize;
        obj.initialize = function(rect) {
            this._cursorLinkWindows = [];
            _base_initialize.apply(this, arguments);
        };

        const _base_select = obj.select;
        obj.select = function(index) {
            _base_select.apply(this, arguments);
            if (index >= 0) {
                this._cursorLinkWindows.forEach(window => window.deselect());
            }
        };

        obj.addCursorLinkWindow = function(window) {
            if (
                !this._cursorLinkWindows.includes(window) &&
                window._cursorLinkWindows
            ) {
                this._cursorLinkWindows.push(window);
                window._cursorLinkWindows.push(this);
            }
        };

        obj.isCursorLinkMain = function() {
            return this._cursorLinkWindows.length === 0 || this.index() >= 0;
        };

        const _base_cursorDown = obj.cursorDown;
        obj.cursorDown = function(wrap) {
            const bottom = this.maxItems() - this.maxCols();
            if (!this.isHandled('down') || this.index() < bottom) {
                _base_cursorDown.apply(this, arguments);
            } else if (wrap) {
                this.callHandler('down');
                this.updateInputData();
            }
        };

        const _base_cursorUp = obj.cursorUp;
        obj.cursorUp = function(wrap) {
            if (!this.isHandled('up') || this.index() >= this.maxCols()) {
                _base_cursorUp.apply(this, arguments);
            } else if (wrap) {
                this.callHandler('up');
                this.updateInputData();
            }
        };

        const _base_processCursorMove = obj.processCursorMove;
        obj.processCursorMove = function() {
            if (this.isCursorLinkMain()) {
                _base_processCursorMove.apply(this, arguments);
            }
        };

        const _base_processHandling = obj.processHandling;
        obj.processHandling = function() {
            if (this.isCursorLinkMain()) {
                _base_processHandling.apply(this, arguments);
            }
        };

        const _base_processWheel = obj.processWheel;
        obj.processWheel = function() {
            if (this.isCursorLinkMain()) {
                _base_processWheel.apply(this, arguments);
            }
        };

        const _base_isCancelEnabled = obj.isCancelEnabled;
        obj.isCancelEnabled = function() {
            return (
                _base_isCancelEnabled.apply(this, arguments) &&
                this.index() >= 0
            );
        };

        const _base_callUpdateHelp = obj.callUpdateHelp;
        obj.callUpdateHelp = function() {
            if (this.isCursorLinkMain()) {
                _base_callUpdateHelp.apply(this, arguments);
            }
        };

    };

    //-------------------------------------------------------------------------
    // Window_EquipCommand

    module_CursorLink(Window_EquipCommand.prototype);

    // overwrite
    Window_EquipCommand.prototype.maxCols = function() {
        return 2;
    };

    // overwrite
    Window_EquipCommand.prototype.makeCommandList = function() {
        //this.addCommand(TextManager.equip2,   'equip');
        this.addCommand(TextManager.optimize, 'optimize');
        this.addCommand(TextManager.clear,    'clear');
    };

    Window_EquipCommand.prototype.playOkSound = function() {};
    
    //-------------------------------------------------------------------------
    // Window_EquipSlot
    
    module_CursorLink(Window_EquipSlot.prototype);

    const _Window_EquipSlot_setActor = Window_EquipSlot.prototype.setActor;
    Window_EquipSlot.prototype.setActor = function(actor) {
        const changed = this._actor !== actor;
        _Window_EquipSlot_setActor.apply(this, arguments);
        if (changed) this.reselect();
    };

    //-------------------------------------------------------------------------
    // Scene_Equip

    const _Scene_Equip_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
    Scene_Equip.prototype.createCommandWindow = function() {
        _Scene_Equip_createCommandWindow.apply(this, arguments);
        this._commandWindow.setHandler('down', this.commandDown.bind(this));
        this._commandWindow.setHandler('up',   this.commandUp.bind(this));
        this._commandWindow.deselect();
    };

    const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        _Scene_Equip_createSlotWindow.apply(this, arguments);
        this._slotWindow.setHandler('cancel',   this.popScene.bind(this));
        this._slotWindow.setHandler('pagedown', this.nextActor.bind(this));
        this._slotWindow.setHandler('pageup',   this.previousActor.bind(this));
        this._slotWindow.setHandler('down',     this.slotDown.bind(this));
        this._slotWindow.setHandler('up',       this.slotUp.bind(this));
        this._slotWindow.addCursorLinkWindow(this._commandWindow);
        this._slotWindow.activate();
        this._slotWindow.select(0);
    };

    Scene_Equip.prototype.commandDown = function() {
        this._slotWindow.select(0);
    };

    Scene_Equip.prototype.commandUp = function() {
        this._slotWindow.select(this._slotWindow.maxItems() - 1);
    };

    Scene_Equip.prototype.slotDown = function() {
        this._commandWindow.select(0);
    };

    Scene_Equip.prototype.slotUp = function() {
        this._commandWindow.select(0);
    };

    const _Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
    Scene_Equip.prototype.onSlotOk = function() {
        _Scene_Equip_onSlotOk.apply(this, arguments);
        this._commandWindow.deactivate();
    };

    const _Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
    Scene_Equip.prototype.onItemOk = function() {
        _Scene_Equip_onItemOk.apply(this, arguments);
        this._commandWindow.activate();
    };

    const _Scene_Equip_onItemCancel = Scene_Equip.prototype.onItemCancel;
    Scene_Equip.prototype.onItemCancel = function() {
        _Scene_Equip_onItemCancel.apply(this, arguments);
        this._commandWindow.activate();
    };

    const _Scene_Equip_onActorChange = Scene_Equip.prototype.onActorChange;
    Scene_Equip.prototype.onActorChange = function() {
        _Scene_Equip_onActorChange.apply(this, arguments);
        this._slotWindow.activate();
        this._slotWindow.select(0);
    };

})();
