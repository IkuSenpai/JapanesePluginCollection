// ===================================================
// ARTM_TMGreedShopMZ
// Copyright (c) 2021 Artemis
// Translated: IkuSenpai
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 Initial release
// 1.0.1 Adjusted the display position of the material window
// 1.0.2 Adjusted the material window during mouse scrolling
//=============================================================================
// TMPlugin - Greedy Shop
// Version: 2.2.0
// Last Update: 2018/07/17
// Distributor: http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adds a shop feature where items are requested in addition to money.
 * @author Artemis
 *
 * @help ARTM_TMGreedShopMZ
 * This is an MZ port of tomoaky's "Greed Shop" plugin.
 * The basic functionality remains unchanged.
 *
 * @command greedShop
 * @text Greedy Shop
 * @desc Opens the Greedy Shop.
 *
 * @param materialWindowPosition
 * @type select
 * @option Below the item name
 * @value 0
 * @option To the right of the item name
 * @value 1
 * @option Below the purchase window
 * @value 2
 * @desc Material window display position
 * @default 0
 *
 * @param materialWindowWidth
 * @type number
 * @desc Material window width
 * Default: 408
 * @default 408
 * 
 * @param buyWindowWidth
 * @type number
 * @desc Purchase window width
 * Default: 456
 * @default 456
 *
 * @param buyWindowHeight
 * @type number
 * @desc Purchase window height
 * Set to 0 for automatic determination
 * @default 0
 *
 * @param materialMax
 * @type number
 * @desc Maximum number of materials that can be set.
 * Default: 5
 * @default 5
 * 
 * @param fontRate
 * @type number
 * @decimals 2
 * @desc Material information font multiplier
 * @default 0.8
 *
 * @param greedCommand
 * @desc Greedy Shop's purchase command name.
 * Default: Buy
 * @default Buy
 * 
 * @param needText
 * @desc Text to display at the top of the material list
 * (Omitted if not set)
 * @default Required Items
 * 
 * @param showSellCommand
 * @type boolean
 * @desc Display the sell command even if only buying.
 * @default true
 * 
 * @param showMaterialWindow
 * @type boolean
 * @desc Display the material window.
 * @default true
 * 
 * @param overlaid
 * @type boolean
 * @desc Display the material window in a different layer than other windows.
 * Solves the problem of corners being cut, but readability decreases.
 * @default true
 * 
 * @param backOpacity
 * @type number
 * @desc Background opacity of the material window
 * @default 192
 * 
 * @param showMaterialFromNumberWindow
 * @type boolean
 * @desc Display material information in the quantity selection window.
 * @default true
 * 
 * @param showPrice
 * @type boolean
 * @desc Display the price in the item window.
 * @default true
 * 
 * @param seGreedBuy
 * @type struct<SoundEffect>
 * @desc Sound effect played when buying at the Greedy Shop
 * @default {"name":"Shop1","volume":"90","pitch":"100","pan":"0"}
 *
 * @help
 * TMPlugin - Greedy Shop ver2.2.0
 * 
 * Usage:
 * 
 *   Set materials for items, weapons, and armor using memo tags (explained below).
 * 
 *   Execute the plugin command 'greedShop', followed by the event command 'Shop Processing',
 *   and set the items with materials as products for sale.
 * 
 *   This plugin has been confirmed to work with RPG Maker MZ Version 1.6.1.
 *
 *  
 * Plugin Commands:
 * 
 *   greedShop
 *     By executing this command, the subsequent Shop Processing command
 *     turns the shop into a Greedy Shop.
 * 
 *   greedCommand BuyIt
 *     Changes the purchase command name of the Greedy Shop to 'BuyIt'.
 *     This change is not saved in the save data.
 *
 * 
 * Memo Tags (Items, Weapons, Armor):
 * 
 *   <mat1:I1*3>
 *     Requires 3 of item 1 as a material, in addition to money.
 *     You can add more materials with mat2, mat3, and so on.
 *     If 'I' is used, it refers to items; 'W' for weapons; 'A' for armor.
 * 
 *   <matKey:1>
 *     Treats the material set in mat1 as a key material.
 *     If the key material is not possessed, the item is excluded from the shop list.
 *     You can set multiple key materials by separating with a space (e.g., <matKey:1 2>).
 *     This tag allows you to express items that won't appear in the shop unless you have the recipe.
 * 
 *   <matG:50>
 *     Sets the price to 50. This setting is reflected as the purchase price
 *     only when the Greedy Shop is active.
 *
 * 
 * Memo Tags (Weapons, Armor):
 * 
 *   <noConsume>
 *     Weapons or armor with this tag set will not be consumed even if set as a material.
 *
 *     If an item with consumption set to 'Do Not' is used as a material,
 *     it won't be consumed but will function as a required item.
 */
/*~struct~SoundEffect:
 *
 * @param name
 * @type file
 * @dir audio/se/
 * @desc Sound effect file name
 * @default 
 * @require 1
 *
 * @param volume
 * @type number
 * @max 100
 * @desc Sound effect volume
 * Default: 90
 * @default 90
 *
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @desc Sound effect pitch
 * Default: 100
 * @default 100
 *
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @desc Sound effect pan
 * Default: 0
 * @default 0
 *
 */

var Imported = Imported || {};
Imported.TMGreedShop = true;

(() => {

    const PLUGIN_NAME = "ARTM_TMGreedShopMZ";
    const parameters = PluginManager.parameters(PLUGIN_NAME);
    const materialWindowPosition = +(parameters['materialWindowPosition'] || 0);
    const materialWindowWidth = +(parameters['materialWindowWidth'] || 408);
    const buyWindowWidth = +(parameters['buyWindowWidth'] || 456);
    const buyWindowHeight = +(parameters['buyWindowHeight'] || 0);
    const materialMax = +(parameters['materialMax'] || 5);
    const fontRate = +(parameters['fontRate'] || 0.8);
    const greedCommand = parameters['greedCommand'] || '購入する';
    const needText = parameters['needText'] || '';
    const showSellCommand = JSON.parse(parameters['showSellCommand'] || 'true');
    const showMaterialWindow = JSON.parse(parameters['showMaterialWindow'] || 'true');
    const overlaid = JSON.parse(parameters['overlaid'] || 'true');
    const backOpacity = +(parameters['backOpacity'] || 192);
    const showMaterialFromNumberWindow = JSON.parse(parameters['showMaterialFromNumberWindow'] || 'true');
    const showPrice = JSON.parse(parameters['showPrice'] || 'true');
    const seGreedBuy = JSON.parse(parameters['seGreedBuy'] || '{}');

    //-----------------------------------------------------------------------------
    // PluginManager
    //
    PluginManager.registerCommand(PLUGIN_NAME, "greedShop", args => {
        $gameTemp.setGreedShop(true);
    });

    //-----------------------------------------------------------------------------
    // DataManager
    //
    DataManager.getGreedShopMaterials = function(item) {
        let result = [];
        if (item) {
            const re = /(i|w|a)(\d+)\*(\d+)/i;
            for (let i = 1; i <= materialMax; i++) {
                const mat = this.getGreedShopMaterial(item, re, i);
                if (mat) {result.push(mat); }
            }
        }
        return result;
    };

    DataManager.getGreedShopMaterial = function(item, re, i) {
        const key = 'mat' + i;
        let material = null;
        if (item.meta[key]) {
            const match = re.exec(item.meta[key]);
            if (match) {
                material = {};
                material.type = match[1];
                material.id   = +match[2];
                material.need = +match[3];
            }
        }
        return material;
    };

    DataManager.materialToItem = function(material) {
        const type = material.type.toUpperCase();
        if (type === 'I') {
            return $dataItems[material.id];
        } else if (type === 'W') {
            return $dataWeapons[material.id];
        } else if (type === 'A') {
            return $dataArmors[material.id];
        }
        return null;
    };

    DataManager.isConsumableMaterial = function(item) {
        return item.consumable || (!this.isItem(item) && !item.meta.noConsume);
    };

    //-----------------------------------------------------------------------------
    // Game_Temp
    //
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._greedShop = false;
        this._greedShopScrolling = false;
    };

    Game_Temp.prototype.setGreedShop = function(flag) {
        this._greedShop = flag;
    };

    Game_Temp.prototype.isGreedShop = function() {
        return this._greedShop;
    };

    Game_Temp.prototype.startGreedShopScroll = function() {
        this._greedShopScrolling = true;
    };

    Game_Temp.prototype.isGreedShopScrolling = function() {
        return this._greedShopScrolling;
    };

    //-----------------------------------------------------------------------------
    // Window_Base
    //
    Window_Base.prototype.drawGreedMaterials = function(x, y, item, amount, rate) {
        const materials = DataManager.getGreedShopMaterials(item);
        this.resetFontSettings();
        this.contents.fontSize = Math.floor(this.contents.fontSize * rate);
        if (needText) {
            y = this.drawGreedNeedText(y, rate);
        }
        for (let i = 0; i < materials.length; i++) {
            y = this.drawGreedMaterial(x, y, materials[i], amount, rate);
        }
        if (this._price) {
            this.drawGreedPrice(y, amount, rate);
        }
        this.resetFontSettings();
    };

    Window_Base.prototype.drawGreedNeedText = function(y, rate) {
        const lh = Math.floor(this.lineHeight() * rate);
        this.changeTextColor(this.systemColor());
        this.contents.drawText(needText, 0, y, this.contents.width, lh, 'center');
        return y + lh;
    };

    Window_Base.prototype.drawGreedMaterial = function(x, y, material, amount, rate) {
        const x2 = x + Math.floor((ImageManager.iconWidth + 4) * rate);
        const lh = Math.floor(this.lineHeight() * rate);
        const materialItem = DataManager.materialToItem(material);
        const need = material.need * amount;
        const n = $gameParty.numItems(materialItem);
        let text = DataManager.isConsumableMaterial(materialItem) ? '' + n + '/' : '--/';
        text += ('   ' + need).substr(-3);
        this.drawStretchIcon(x, y, materialItem.iconIndex, rate);
        this.changeTextColor(ColorManager.normalColor());
        this.contents.drawText(materialItem.name, x2, y, 312, lh);
        this.contents.drawText(text, x, y, this.contents.width - this.itemPadding(), lh, 'right');
        return y + lh;
    };

    Window_Base.prototype.drawStretchIcon = function(x, y, index, rate) {
        const bitmap = ImageManager.loadSystem('IconSet');
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = index % 16 * pw;
        const sy = Math.floor(index / 16) * ph;
        const dw = Math.floor(pw * rate);
        const dh = Math.floor(ph * rate);
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, dw, dh);
    };

    Window_Base.prototype.drawGreedPrice = function(y, amount, rate) {
        const x = this.itemPadding();
        const lh = Math.floor(this.lineHeight() * rate);
        const width = this.contents.width - x * 2;
        const unitWidth = Math.min(80, this.textWidth(TextManager.currencyUnit));
        this.resetTextColor();
        this.contents.drawText(this._price * amount, x, y, width - unitWidth - 6, lh, 'right');
        this.changeTextColor(this.systemColor());
        this.contents.drawText(TextManager.currencyUnit, x + width - unitWidth, y, unitWidth, lh, 'right');
    };

    //-----------------------------------------------------------------------------
    // Window_ShopCommand
    //
    const _Window_ShopCommand_maxCols = Window_ShopCommand.prototype.maxCols;
    Window_ShopCommand.prototype.maxCols = function() {
        return (showSellCommand || !this._purchaseOnly) ? _Window_ShopCommand_maxCols.call(this) : 2;
    };

    const _Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
    Window_ShopCommand.prototype.makeCommandList = function() {
        if ($gameTemp.isGreedShop()) {
            this.addCommand(greedCommand, 'buy');
            if (showSellCommand || !this._purchaseOnly) {
                this.addCommand(TextManager.sell, 'sell', !this._purchaseOnly);
            }
            this.addCommand(TextManager.cancel, 'cancel');
        } else {
            _Window_ShopCommand_makeCommandList.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Window_ShopBuy
    //
    const _Window_ShopBuy_initialize = Window_ShopBuy.prototype.initialize;
    Window_ShopBuy.prototype.initialize = function(x, y, height, shopGoods) {
        if ($gameTemp.isGreedShop() && +buyWindowHeight > 0) {
            height = +buyWindowHeight;
        }
        _Window_ShopBuy_initialize.call(this, x, y, height, shopGoods);
    };

    const _Window_ShopBuy_windowWidth = Window_ShopBuy.prototype.windowWidth;
    Window_ShopBuy.prototype.windowWidth = function() {
        if ($gameTemp.isGreedShop()) {
            return buyWindowWidth;
        }
        return _Window_ShopBuy_windowWidth.call(this);
    };

    const _Window_ShopBuy_price = Window_ShopBuy.prototype.price;
    Window_ShopBuy.prototype.price = function(item) {
        if ($gameTemp.isGreedShop() && (item && item.meta.matG)) {
            return +item.meta.matG;
        }
        return _Window_ShopBuy_price.call(this, item);
    };

    const _Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
    Window_ShopBuy.prototype.isEnabled = function(item) {
        const result = _Window_ShopBuy_isEnabled.call(this, item);
        if (result && $gameTemp.isGreedShop()) {
            const materials = DataManager.getGreedShopMaterials(item);
            for (let i = 0; i < materials.length; i++) {
                const material = materials[i];
                const matItem = DataManager.materialToItem(material);
                if ($gameParty.numItems(matItem) < material.need) {
                    return false;
                }
            }
        }
        return result;
    };

    const _Window_ShopBuy_update = Window_ShopBuy.prototype.update;
    Window_ShopBuy.prototype.update = function() {
        _Window_ShopBuy_update.call(this);
        if (this.active && this._materialWindow) {
            this._materialWindow.setShopItem(this.item(), this.price(this.item()));
            this.setMaterialWindowPosition();
        }
    };

   Window_ShopBuy.prototype.updateSmoothScroll = function() {
       Window_Scrollable.prototype.updateSmoothScroll.call(this);
       if ($gameTemp.isGreedShop()) {
           const bottom = this.y + this.height;
           const materialWindow = this._materialWindow;
           if (materialWindow.y + materialWindow.windowHeight() > bottom ||
               materialWindow.y < this.y) {
                materialWindow.hide();
                $gameTemp.startGreedShopScroll();
           } else if (!SceneManager._scene._numberWindow.visible){
               materialWindow.show();
           }
       }
   };

    Window_ShopBuy.prototype.calcMaterialWindowPositionY = function(rect) {
        const testHeight = this.lineHeight() + this.itemPadding();
        const index = this.index() - this.topRow();
        return(
            this.y + this.padding + this.rowSpacing() / 2 +
            (index + 1) * rect.height + 
            ((index + 1) * this.rowSpacing()) - 
            this._scrollY % testHeight
        );
    };

    Window_ShopBuy.prototype.setMaterialWindowPosition = function() {
        const rect = this.itemRectWithPadding(this.index());
        const y = this.calcMaterialWindowPositionY(rect);
        const h_helpWindowNoinc = Graphics.boxHeight - this._helpWindow.height;
        let x = 0;
        switch (materialWindowPosition) {
            case 0:  // item bottom
                x = this.x + this.width / 2;
                this._materialWindow.x = x - this._materialWindow.width / 2;
                this._materialWindow.y = y;
                if (this._materialWindow.y + this._materialWindow.height > h_helpWindowNoinc) {
                    this._materialWindow.y -= this._materialWindow.height + rect.height;
                }
                break;
            case 1:  // item right
                x = this.x + this.width - this.padding;
                this._materialWindow.x = x;
                this._materialWindow.y = y;
                if (this._materialWindow.x + this._materialWindow.width > Graphics.boxWidth) {
                    this._materialWindow.x = Graphics.boxWidth - this._materialWindow.width;
                }
                if (this._materialWindow.y + this._materialWindow.height > h_helpWindowNoinc) {
                    this._materialWindow.y -= this._materialWindow.height + rect.height;
                }
                break;
            case 2:  // container bottom
                this._materialWindow.x = this.x;
                this._materialWindow.y = this.y + this.height;
                if (this._materialWindow.y + this._materialWindow.height > h_helpWindowNoinc) {
                    this._materialWindow.y = h_helpWindowNoinc - this._materialWindow.height;
                }
                break;
        }
    };

    const _Window_ShopBuy_makeItemList = Window_ShopBuy.prototype.makeItemList;
    Window_ShopBuy.prototype.makeItemList = function() {
        _Window_ShopBuy_makeItemList.call(this);
        for (let i = this._data.length - 1; i >= 0; i--) {
            const item = this._data[i];
            if (item && item.meta.matKey) {
                this.makeItemListForMat(item, i);
            }
        }
    };

    Window_ShopBuy.prototype.makeItemListForMat = function(item, i) {
        const materials = DataManager.getGreedShopMaterials(item);
        const keys = item.meta.matKey.split(" ").map(Number);
        for (let j = 0; j < keys.length; j++) {
            const material = materials[keys[j] - 1];
            const matItem = DataManager.materialToItem(material);
            if (!$gameParty.hasItem(matItem, false)) {
                this._data.splice(i, 1);
                this._price.splice(i, 1);
                break;
            }
        }
    };

    const _Window_ShopBuy_drawItem = Window_ShopBuy.prototype.drawItem;
    Window_ShopBuy.prototype.drawItem = function(index) {
        if ($gameTemp.isGreedShop() && !showPrice) {
            const item = this._data[index];
            const rect = this.itemRect(index);
            rect.width -= this.itemPadding();
            this.changePaintOpacity(this.isEnabled(item));
            this.drawItemName(item, rect.x, rect.y, rect.width);
            this.changePaintOpacity(true);
        } else {
            _Window_ShopBuy_drawItem.call(this, index);
        }
    };

    Window_ShopBuy.prototype.setMaterialWindow = function(materialWindow) {
        this._materialWindow = materialWindow;
    };

    Window_ShopBuy.prototype.select = function(index) {
        Window_Selectable.prototype.select.call(this, index);
        if (this._materialWindow) {
            this._materialWindow.show();
        }
    };

    //-----------------------------------------------------------------------------
    // Window_ShopStatus
    //
    const _Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
    Window_ShopStatus.prototype.initialize = function(rect) {
        _Window_ShopStatus_initialize.call(this, rect);
        this._toggleButtons = [];
    };

    Window_ShopStatus.prototype.onButtonClick = function(partyId) {
        const member = $gameParty.members[partyId];
        if (member) {
            alert(member.name());
        }
    };

    Window_ShopStatus.prototype.clearToggleButtons = function() {
        this._toggleButtons.forEach(b => b._pressedTgl = false);
        dubugNum = 0;
    };

    //-----------------------------------------------------------------------------
    // Window_ShopNumber
    //
    const _Window_ShopNumber_windowWidth = Window_ShopNumber.prototype.windowWidth;
    Window_ShopNumber.prototype.windowWidth = function() {
        if ($gameTemp.isGreedShop()) {
            return buyWindowWidth;
        }
        return _Window_ShopNumber_windowWidth.call(this);
    };

    const _Window_ShopNumber_refresh = Window_ShopNumber.prototype.refresh;
    Window_ShopNumber.prototype.refresh = function() {
        _Window_ShopNumber_refresh.call(this);
        if ($gameTemp.isGreedShop() && showMaterialFromNumberWindow) {
            this.drawGreedMaterials(0, this.lineHeight() * 2, this._item, this._number, fontRate);
        }
        const scene = SceneManager._scene;
        scene._statusWindow.clearToggleButtons();
    };

    const _Window_ShopNumber_drawTotalPrice = Window_ShopNumber.prototype.drawTotalPrice;
    Window_ShopNumber.prototype.drawTotalPrice = function() {
        if (!$gameTemp.isGreedShop()) {
            _Window_ShopNumber_drawTotalPrice.call(this);
        }
    };

    const _Window_ShopNumber_itemNameY = Window_ShopNumber.prototype.itemNameY;
    Window_ShopNumber.prototype.itemNameY = function() {
        if ($gameTemp.isGreedShop() && showMaterialFromNumberWindow) {
            return 0;
        }
        return _Window_ShopNumber_itemNameY.call(this);
    };

    const _Window_ShopNumber_priceY = Window_ShopNumber.prototype.priceY;
    Window_ShopNumber.prototype.priceY = function() {
        if ($gameTemp.isGreedShop() && showMaterialFromNumberWindow) {
            return this.lineHeight() * 1.5;
        }
        return _Window_ShopNumber_priceY.call(this);
    };

    const _Window_ShopNumber_buttonY = Window_ShopNumber.prototype.buttonY;
    Window_ShopNumber.prototype.buttonY = function() {
        if ($gameTemp.isGreedShop() && showMaterialFromNumberWindow) {
            return  this.contents.height - this.lineHeight() * 2.6;
        }
        return _Window_ShopNumber_buttonY.call(this);
    };

    function Window_Material(buyWindow) {
        this.initialize.apply(this, arguments);
    }

    //-----------------------------------------------------------------------------
    // Window_Material
    //
    Window_Material.prototype = Object.create(Window_Base.prototype);
    Window_Material.prototype.constructor = Window_Material;

    Window_Material.prototype.initialize = function() {
        this._materials = [];
        const width = this.windowWidth();
        const height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, width, height));
        this.hide();
    };

    Window_Material.prototype.windowWidth = function() {
        return materialWindowWidth;
    };

    Window_Material.prototype.windowHeight = function() {
        let n = this._materials.length;
        if (needText) {
            n += 1;
        }
        if (this._price) {
            n += 1;
        }
        return Math.floor(this.fittingHeight(n) * fontRate);
    };

    Window_Material.prototype.standardBackOpacity = function() {
        return backOpacity;
    };

    const _Window_Material_show = Window_Material.prototype.show;
    Window_Material.prototype.show = function() {
        _Window_Material_show.call(this);
        if (this._materials.length === 0) {
            this.hide();
        }
    };
    
    Window_Material.prototype.materials = function() {
        return this._materials;
    };
    
    Window_Material.prototype.setShopItem = function(item, price) {
      if (this._shopItem !== item) {
          this._shopItem = item;
          this._price = price;
          this._materials = DataManager.getGreedShopMaterials(item);
          if (this._materials.length > 0) {
              this.refresh();
          }
          if (showMaterialWindow) {
              this.show();
          }
        }
    };
    
    Window_Material.prototype.refresh = function() {
        this.move(this.x, this.y, this.width, this.windowHeight());
        this.createContents();
        this.drawGreedMaterials(0, 0, this._shopItem, 1, fontRate);
    };

    //-----------------------------------------------------------------------------
    // Scene_Shop
    //
    const _Scene_Shop_terminate = Scene_Shop.prototype.terminate;
    Scene_Shop.prototype.terminate = function() {
        _Scene_Shop_terminate.call(this);
        $gameTemp.setGreedShop(false);
    };

    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.call(this);
        if ($gameTemp.isGreedShop()) {
            this.createMaterialWindow();
        }
    };

    Scene_Shop.prototype.createMaterialWindow = function() {
        this._materialWindow = new Window_Material(this._buyWindow);
        this._buyWindow.setMaterialWindow(this._materialWindow);
        if (overlaid) {
            this.addChild(this._materialWindow);
        } else {
            this.addWindow(this._materialWindow);
        }
    };

    const _Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
    Scene_Shop.prototype.onBuyOk = function() {
        _Scene_Shop_onBuyOk.call(this);
        if (this._materialWindow) {
            this._materialWindow.hide();
        }
    };
    
    const _Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
    Scene_Shop.prototype.onBuyCancel = function() {
        _Scene_Shop_onBuyCancel.call(this);
        if (this._materialWindow) {
            this._materialWindow.setShopItem(null);
        }
    };

    const _Scene_Shop_onNumberOk = Scene_Shop.prototype.onNumberOk;
    Scene_Shop.prototype.onNumberOk = function() {
        if ($gameTemp.isGreedShop() && this._commandWindow.currentSymbol() === 'buy') {
            const buttons = this._statusWindow._toggleButtons;
            AudioManager.playSe(seGreedBuy);
            this.doBuy(this._numberWindow.number());
            this.endNumberInput();
            this._goldWindow.refresh();
            this._statusWindow.refresh();
        } else {
            _Scene_Shop_onNumberOk.call(this);
        }
    };

    const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        _Scene_Shop_doBuy.call(this, number);
        if (this._materialWindow) {
            const materials = this._materialWindow.materials();
            for (let i = 0; i < materials.length; i++) {
                const material = materials[i];
                const item = DataManager.materialToItem(material);
                if (DataManager.isConsumableMaterial(item)) {
                    $gameParty.loseItem(item, material.need * number);
                }
            }
            this._materialWindow.refresh();
        }
    };

    const _Scene_Shop_maxBuy = Scene_Shop.prototype.maxBuy;
    Scene_Shop.prototype.maxBuy = function() {
        let result = _Scene_Shop_maxBuy.call(this);
        if (this._materialWindow) {
            const materials = this._materialWindow.materials();
            for (let i = 0; i < materials.length; i++) {
                const material = materials[i];
                const item = DataManager.materialToItem(material);
                if (DataManager.isConsumableMaterial(item)) {
                  const n = $gameParty.numItems(item);
                  result = Math.min(result, Math.floor(n / material.need));
                }
            }
        }
        return result;
    };

    const _Scene_Shop_endNumberInput = Scene_Shop.prototype.endNumberInput;
    Scene_Shop.prototype.endNumberInput = function() {
        _Scene_Shop_endNumberInput.call(this);
        if (this._materialWindow && showMaterialWindow) {
            this._materialWindow.show(); 
        }
    };

})();
