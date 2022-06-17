//=============================================================================
// MPP_SimpleItemWindows.js
//=============================================================================
// Copyright (c) 2018 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Simplify the category change operation on the item screen and shop sale screen.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * - You can switch categories with the page switch button.
 * - In the case of touch operation, it is changed by touching the category
 *   window.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc アイテム画面とショップ売却画面のカテゴリー変更操作を簡略化します。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * - ページ切り替えボタンでカテゴリーが切り替わります。
 * - タッチ操作の場合、カテゴリーウィンドウをタッチすることで変更されます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 */

(() => {
    'use strict';

    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };
    
    //-------------------------------------------------------------------------
    // Window_Selectable

    Window_Selectable.prototype.deleteHandler = function(symbol) {
        delete this._handlers[symbol];
    };

    //-------------------------------------------------------------------------
    // Window_ItemCategory

    Window_ItemCategory.prototype.processCursorMove = function() {
        if (this.visible && this.isCursorMovable()) {
            const lastIndex = this.index();
            if (Input.isRepeated('pagedown')) {
                this.cursorRight(Input.isTriggered('pagedown'));
            }
            if (Input.isRepeated('pageup')) {
                this.cursorLeft(Input.isTriggered('pageup'));
            }
            if (this.index() !== lastIndex) {
                SoundManager.playCursor();
            }
        }
    };

    Window_ItemCategory.prototype.processHandling = function() {};

    Window_ItemCategory.prototype.processWheel = function() {};

    Window_ItemCategory.prototype.isScrollEnabled = function() {
        return false;
    };

    Window_ItemCategory.prototype.isHoverEnabled = function() {
        return false;
    };

    const _Window_ItemCategory_onTouch = __base(Window_ItemCategory.prototype, 'onTouch');
    Window_ItemCategory.prototype.onTouch = function(triggered) {
        if (this.visible && TouchInput.isTriggered()) {
            _Window_ItemCategory_onTouch.call(this, false);
        }
    };

    Window_ItemCategory.prototype.playOkSound = function() {};

    //-------------------------------------------------------------------------
    // Window_ItemList

    const _Window_ItemList_setCategory = Window_ItemList.prototype.setCategory;
    Window_ItemList.prototype.setCategory = function(category) {
        const changed = this._category !== category;
        _Window_ItemList_setCategory.apply(this, arguments);
        if (changed) {
            this.select(Math.max(Math.min(this.index(), this.maxItems() - 1), 0));
        }
    };

    Window_ItemList.prototype.setCategoryWindow = function(categoryWindow) {
        this._categoryWindow = categoryWindow;
    };

    Window_ItemList.prototype.cursorPagedown = function() {};

    Window_ItemList.prototype.cursorPageup = function() {};

    const _Window_ItemList_isTouchedInsideFrame = __base(Window_ItemList.prototype, 'isTouchedInsideFrame');
    Window_ItemList.prototype.isTouchedInsideFrame = function() {
        if (this._categoryWindow && this._categoryWindow.isTouchedInsideFrame()) {
            return true;
        }
        return _Window_ItemList_isTouchedInsideFrame.apply(this, arguments);
    };

    //-------------------------------------------------------------------------
    // Scene_Item

    const _Scene_Item_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
    Scene_Item.prototype.createCategoryWindow = function() {
        _Scene_Item_createCategoryWindow.apply(this, arguments);
        this._categoryWindow.setHelpWindow(null);
        this._categoryWindow.deleteHandler('ok');
        this._categoryWindow.deleteHandler('cancel');
    };

    const _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _Scene_Item_createItemWindow.apply(this, arguments);
        this._itemWindow.setHandler('cancel', this.popScene.bind(this));
        this._itemWindow.activate();
        this._itemWindow.selectLast();
        this._itemWindow.setCategoryWindow(this._categoryWindow);
    };

    const _Scene_Item_onItemOk = Scene_Item.prototype.onItemOk
    Scene_Item.prototype.onItemOk = function() {
        _Scene_Item_onItemOk.apply(this, arguments);
        this._categoryWindow.deactivate();
    };

    const _Scene_Item_activateItemWindow = Scene_Item.prototype.activateItemWindow;
    Scene_Item.prototype.activateItemWindow = function() {
        _Scene_Item_activateItemWindow.apply(this, arguments);
        this._categoryWindow.activate();
    };

    //-------------------------------------------------------------------------
    // Scene_Shop

    const _Scene_Shop_createCategoryWindow = Scene_Shop.prototype.createCategoryWindow;
    Scene_Shop.prototype.createCategoryWindow = function() {
        _Scene_Shop_createCategoryWindow.apply(this, arguments);
        this._categoryWindow.setHelpWindow(null);
        this._categoryWindow.deleteHandler('ok');
        this._categoryWindow.deleteHandler('cancel');
    };

    const _Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
    Scene_Shop.prototype.createSellWindow = function() {
        _Scene_Shop_createSellWindow.apply(this, arguments);
        this._sellWindow.setCategoryWindow(this._categoryWindow);
    };

    const _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
    Scene_Shop.prototype.commandSell = function() {
        _Scene_Shop_commandSell.apply(this, arguments);
        this.onCategoryOk();
    };

    const _Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
    Scene_Shop.prototype.onSellCancel = function() {
        _Scene_Shop_onSellCancel.apply(this, arguments);
        this.onCategoryCancel();
    };

})();
