// ===================================================
// ARTM_TMGreedShopMZ
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 初版
// 1.0.1 素材ウインドウの表示位置を調整
// 1.0.2 マウススクロール時の素材ウインドウ調整
//=============================================================================
// TMPlugin - 欲張りショップ
// バージョン: 2.2.0
// 最終更新日: 2018/07/17
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc お金以外にアイテムも要求されるショップ機能を追加します。
 * @author Artemis
 *
 * @help ARTM_TMGreedShopMZ
 * tomoaky様作「欲張りショップ」プラグインのMZ移植版です。
 * 基本的な動作は変わっておりません。
 *
 * @command greedShop
 * @text 欲張りショップ
 * @desc 欲張りショップを開きます。
 *
 * @param materialWindowPosition
 * @type select
 * @option 商品名の下
 * @value 0
 * @option 商品名の右
 * @value 1
 * @option 購入ウィンドウの下
 * @value 2
 * @desc 素材ウィンドウの表示位置
 * @default 0
 *
 * @param materialWindowWidth
 * @type number
 * @desc 素材ウィンドウの幅
 * 初期値: 408
 * @default 408
 * 
 * @param buyWindowWidth
 * @type number
 * @desc 購入ウィンドウの幅
 * 初期値: 456
 * @default 456
 *
 * @param buyWindowHeight
 * @type number
 * @desc 購入ウィンドウの高さ
 * 0なら自動で決定
 * @default 0
 *
 * @param materialMax
 * @type number
 * @desc 設定できる素材の最大数。
 * 初期値: 5
 * @default 5
 * 
 * @param fontRate
 * @type number
 * @decimals 2
 * @desc 素材情報のフォント倍率
 * @default 0.8
 *
 * @param greedCommand
 * @desc 欲張りショップの購入コマンド名。
 * 初期値: 購入する
 * @default 購入する
 * 
 * @param needText
 * @desc 素材一覧のトップに表示するテキスト
 * ( 何も設定しなければ省略 )
 * @default 必要なもの
 * 
 * @param showSellCommand
 * @type boolean
 * @desc 購入のみの場合にも売却コマンドを表示する。
 * @default true
 * 
 * @param showMaterialWindow
 * @type boolean
 * @desc 素材ウィンドウを表示する。
 * @default true
 * 
 * @param overlaid
 * @type boolean
 * @desc 素材ウィンドウを他のウィンドウと違うレイヤーに表示する。
 * 四隅が欠ける問題は解決しますが、可読性は低下します。
 * @default true
 * 
 * @param backOpacity
 * @type number
 * @desc 素材ウィンドウの背景の不透明度
 * @default 192
 * 
 * @param showMaterialFromNumberWindow
 * @type boolean
 * @desc 個数選択ウィンドウに素材情報を表示する。
 * @default true
 * 
 * @param showPrice
 * @type boolean
 * @desc 商品ウィンドウに価格を表示する。
 * @default true
 * 
 * @param seGreedBuy
 * @type struct<SoundEffect>
 * @desc 欲張りショップで購入時に鳴らす効果音
 * @default {"name":"Shop1","volume":"90","pitch":"100","pan":"0"}
 *
 * @help
 * TMPlugin - 欲張りショップ ver2.2.0
 * 
 * 使い方:
 * 
 *   アイテム、武器、防具にメモ欄タグ（後述）を使って素材を設定します。
 * 
 *   イベントコマンド『プラグインコマンド』で greedShop を実行し、
 *   直後にイベントコマンド『ショップの処理』で、素材を設定したアイテムを
 *   商品として販売してください。
 * 
 *   このプラグインは RPGツクールMV Version 1.6.1 で動作確認をしています。
 *
 *  
 * プラグインコマンド:
 * 
 *   greedShop
 *     このコマンドが実行された直後にショップの処理を
 *     実行することで欲張りショップになります。
 * 
 *   greedCommand 買っちゃう
 *     欲張りショップの購入コマンド名を『買っちゃう』に変更します。
 *     この変更はセーブデータには保存されません。
 *
 * 
 * メモ欄タグ（アイテム、武器、防具）:
 * 
 *   <mat1:I1*3>
 *     お金以外にアイテム１番が３個必要になります。
 *     mat2, mat3... と素材を追加していくことができます。
 *     I の部分が W なら武器、A なら防具になります。
 * 
 *   <matKey:1>
 *     mat1 タグに設定されている素材をキー素材として扱います。
 *     キー素材を所持していない場合、商品リストから除外されます。
 *     <matKey:1 2> というように半角スペースで区切り、複数のキー素材を
 *     設定することもできます。（この場合、mat1 と mat2 がキー素材になる）
 *     このタグを使うことで、レシピを所持していないと
 *     ショップに並ばない商品などを表現することができます。
 * 
 *   <matG:50>
 *     価格を50に設定します、この設定は欲張りショップが
 *     有効になっている場合にのみ購入価格として反映されます。
 *
 * 
 * メモ欄タグ（武器、防具）:
 * 
 *   <noConsume>
 *     このタグを指定した武器、防具は素材として設定しても
 *     消費されなくなります。
 *
 *     消耗設定が『しない』になっているアイテムを素材にした場合、
 *     消耗しないが必要なものとして機能します。
 */
/*~struct~SoundEffect:
 *
 * @param name
 * @type file
 * @dir audio/se/
 * @desc 効果音のファイル名
 * @default 
 * @require 1
 *
 * @param volume
 * @type number
 * @max 100
 * @desc 効果音の音量
 * 初期値: 90
 * @default 90
 *
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @desc 効果音のピッチ
 * 初期値: 100
 * @default 100
 *
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @desc 効果音の位相
 * 初期値: 0
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
