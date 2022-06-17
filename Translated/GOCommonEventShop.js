/*:
 * @target MZ
 * @plugindesc コモンイベントショッププラグイン
 * @author GrayOgre
 * @help
 * 
 * このプラグインは、お金でコモンイベントを購入して実行できる機能を提供します。
 * 
 * このプラグインは以下のプラグインコマンドを提供します。
 *   + ショップを開く
 *     コモンイベントを販売するショップを開く
 * 
 * デフォルトでは、ショップでアイテムの売却ができます。これを禁止することも可能です。
 * 他には、
 *     + 購入時の効果音を消す機能
 *     + 画面中央のエリアにピクチャを表示する機能
 * があります。
 * 
 * アイコンは番号入力欄で右クリックすると出るメニューの「アイコン番号の挿入」を使用して入力してください。
 * 
 * このプラグインを使用するためには、
 * あらかじめ公式プラグイン PluginCommonBase.js を組み込んでおく必要があります。
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 * Version 1.0.1
 * 
 * @orderAfter PluginCommonBase
 * @base PluginCommonBase
 *
 * @command openShop
 * @text ショップを開く
 * @desc コモンイベントを販売するショップを開きます。
 *   @arg goods
 *     @text 販売品目
 *     @desc 販売する商品の一覧
 *     @type struct<eventItem>[]
 *   @arg purchaseOnly
 *     @text 購入のみ
 *     @desc 売却を禁止する
 *     @type boolean
 *     @default false
 *   @arg noSoundBuy
 *     @text SE禁止
 *     @desc 購入時のSEを禁止する
 *     @type boolean
 *     @default false
 *   @arg pictureInfo
 *     @text 画像情報
 *     @desc 空き領域に表示する画像の情報
 *     @type struct<pictureInfo>
 */
/*~struct~eventItem:
 * @param id
 *   @text コモンイベントID
 *   @desc 販売するコモンイベントのID
 *   @type common_event
 * @param name
 *   @text 商品名
 *   @desc 表示する商品名
 *   @type string
 * @param price
 *   @text 価格
 *   @desc コモンイベントの販売価格（\V[n]とすると変数nの値が価格になります。）
 *   @type number
 * @param description
 *   @text 説明
 *   @desc 商品説明
 *   @type string
 * @param iconIndex
 *   @text アイコン
 *   @desc 表示するアイコン
 */
/*~struct~pictureInfo:
 * @param imageFile
 *   @text 画像ファイル名
 *   @desc 表示する画像ファイル名（フォルダ img/pictures にあるファイルが選択できます）
 *   @type file
 *   @dir img/pictures/
 * @param offsetX
 *   @text X座標補正
 *   @desc 表示座標の左右方向補正値です。
 *   @default 0
 *   @type number
 *   @min -2000
 *   @max 2000
 * @param offsetY
 *   @text Y座標補正
 *   @desc 表示座標の上下方向補正値です。
 *   @default 0
 *   @type number
 *   @min -2000
 *   @max 2000
 * @param scaleX
 *   @text X方向拡大率
 *   @desc X方向の拡大率(%指定)です。
 *   @default 100
 *   @type number
 *   @min -2000
 *   @max 2000
 * @param scaleY
 *   @text Y方向拡大率
 *   @desc Y方向の拡大率(%指定)です。
 *   @default 100
 *   @type number
 *   @min -2000
 *   @max 2000
 */

(() => {
    'use strict';

    class Scene_CommonEventShop extends Scene_Shop {
        prepare(goods, purchaseOnly, noSoundBuy, pictureInfo) {
            this._goods = goods;
            this._purchaseOnly = purchaseOnly;
            this._item = null;
            this._noSEBuy = noSoundBuy;
            this._pictInfo = pictureInfo;
        }

        create() {
            super.create();
            this.createCommitBuyWindow();
            this.createFreeImageWindow(this._pictInfo);
        }

        createBuyWindow() {
            const rect = this.buyWindowRect();
            this._buyWindow = new Window_EventBuy(rect);
            this._buyWindow.setupGoods(this._goods);
            this._buyWindow.setHelpWindow(this._helpWindow);
            this._buyWindow.hide();
            this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
            this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
            this.addWindow(this._buyWindow);
        
        }

        createFreeImageWindow(pictInfo) {
            const rect = this.statusWindowRect();
            this._freeImageWindow = new Window_FreeImage(rect);
            this._freeImageWindow.hide();
            this.addWindow(this._freeImageWindow);
            this._freeImageWindow.createSprite(pictInfo);
        }

        createCommitBuyWindow() {
            const rect = this.commitBuyWindowRect();
            this._commitBuyWindow = new Window_CommitBuy(rect);
            this._commitBuyWindow.hide();
            this._commitBuyWindow.setHandler("ok", this.onCommitBuyOK.bind(this));
            this._commitBuyWindow.setHandler("cancel", this.onCommitBuyCancel.bind(this));
            this.addWindow(this._commitBuyWindow);
        }

        commitBuyWindowRect() {
            return this.numberWindowRect();
        }
        
        activateBuyWindow() {
            this._buyWindow.setMoney(this.money());
            this._buyWindow.show();
            this._buyWindow.activate();
            this._freeImageWindow.show();
        };
        
        onBuyOk() {
            this._item = this._buyWindow.item();
            this._buyWindow.hide();
            this._commitBuyWindow.setup(this._item, this.buyingPrice());
            this._commitBuyWindow.setCurrencyUnit(this.currencyUnit());
            this._commitBuyWindow.show();
            this._commitBuyWindow.activate();
        }

        onBuyCancel() {
            this._commandWindow.activate();
            this._dummyWindow.show();
            this._buyWindow.hide();
            this._freeImageWindow.hide();
            this._helpWindow.clear();
        }

        onCommitBuyOK() {
            if (!this._noSEBuy) {
                SoundManager.playShop();
            }
            this.endCommitBuy();
            this.doBuy();
        }

        onCommitBuyCancel() {
            SoundManager.playCancel();
            this.endCommitBuy();
        }

        endCommitBuy() {
            this._commitBuyWindow.hide();
            this.activateBuyWindow();
        }

        doBuy() {
            $gameParty.loseGold(this.buyingPrice());
            SceneManager.pop();
            if (this._item) {
                $gameTemp.reserveCommonEvent(this._item.id);
            }
        };
        
    }

    class Window_EventBuy extends Window_ShopBuy {
        initialize(rect) {
            super.initialize(rect);
        }

        makeItemList() {
            this._data = [];
            this._price = [];
            for (const goods of this._shopGoods) {
                const item = this.goodsToItem(goods);
                if (item) {
                    this._data.push(item);
                    this._price.push(item.price);
                }
            }
        }

        goodsToItem(goods) {
            const it= {};
            it.id = parseInt(goods.id);
            it.name = goods.name;
            const match = /\\V\[(\d+)\]/.exec(goods.price);
            it.price = match ? $gameVariables.value(parseInt(match[1])) : parseInt(goods.price);
            it.description = goods.description;
            it.iconIndex = parseInt(goods.iconIndex);
            it.meta = {}; // suppress error of other plugin using meta 
            return it;
        }
        
        setStatusWindow() {
            // do Nothing
        }
        
        updateHelp() {
            this.setHelpWindowItem(this.item());
        }
        
        maxBuy() {
            return 1;
        }

        price(item) {
            return item.price;
        }    
    }

    class Window_CommitBuy extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this._item = null;
            this._price = 0;
            this._currencyUnit = TextManager.currencyUnit;
            this._handlers = {};
            this.createButton();
            this._canRepeat = false;
        }

        maxCols() {
            return 2;
        }

        isScrollEnabled() {
            return false;
        }

        setup(item, price) {
            this._item = item;
            this._price = price;
            this.placeButton();
            this.refresh();
        }

        setCurrencyUnit(currencyUnit) {
            this._currencyUnit = currencyUnit;
            this.refresh();
        }
        
        createButton() {
            if (ConfigManager.touchUI) {
                this._button = new Sprite_Button("ok");
                this.addInnerChild(this._button);
                this._button.setClickHandler(this.onButtonOk.bind(this));
            }
        }

        placeButton() {
            if (this._button) {
                this._button.x = (this.innerWidth - this._button.width) / 2;
                this._button.y = this.buttonY();
            }
        }

        refresh() {
            this.drawCurrentItemName();
            this.drawHorzLine();
            this.drawTotalPrice();
            
        }
        
        drawCurrentItemName() {
            const padding = this.itemPadding();
            const x = padding * 2;
            const y = this.itemNameY();
            const width = this.innerWidth - padding * 5;
            this.drawItemName(this._item, x, y, width);
        }
        
        drawHorzLine() {
            const padding = this.itemPadding();
            const lineHeight = this.lineHeight();
            const itemY = this.itemNameY();
            const totalY = this.totalPriceY();
            const x = padding;
            const y = Math.floor((itemY + totalY + lineHeight) / 2);
            const width = this.innerWidth - padding * 2;
            this.drawRect(x, y, width, 5);
        }

        drawTotalPrice() {
            const padding = this.itemPadding();
            const total = this._price;
            const width = this.innerWidth - padding * 2;
            const y = this.totalPriceY();
            this.drawCurrencyValue(total, this._currencyUnit, 0, y, width);
        }

        itemNameY() {
            return Math.floor(this.innerHeight / 2 - this.lineHeight() * 1.5);
        }
        
        totalPriceY() {
            return Math.floor(this.itemNameY() + this.lineHeight() * 2);
        }
        
        buttonY() {
            return Math.floor(this.totalPriceY() + this.lineHeight() * 2);
        }

        setHandler(symbol, method) {
            this._handlers[symbol] = method;
        }

        isHandled(symbol) {
            return !!this._handlers[symbol];
        }
        
        callHandler(symbol) {
            if (this.isHandled(symbol)) {
                this._handlers[symbol]();
            }
        };
        
        isOpenAndActive() {
            return this.isOpen() && this.visible && this.active;
        }
        
        update() {
            this.processHandling();
            this.processTouch();
            super.update();
        };
        
        updateInputData() {
            Input.update();
            TouchInput.update();
        }
        
        processHandling() {
            if (this.isOpenAndActive()) {
                if (this.isOkEnabled() && this.isOkTriggered()) {
                    return this.processOk();
                }
                if (this.isCancelEnabled() && this.isCancelTriggered()) {
                    return this.processCancel();
                }
            }
        }
        
        processTouch() {
            if (this.isOpenAndActive()) {
                if (TouchInput.isClicked()) {
                    this.onTouchOk();
                } else if (TouchInput.isCancelled()) {
                    this.onTouchCancel();
                }
            }
        }
        
        isOkEnabled() {
            return this.isHandled("ok");
        }
        
        isCancelEnabled() {
            return this.isHandled("cancel");
        }
        
        isOkTriggered() {
            return this._canRepeat ? Input.isRepeated("ok") : Input.isTriggered("ok");
        }

        isCancelTriggered() {
            return Input.isRepeated("cancel");
        }
        
        onTouchOk() {
            // Do Nothing
        }
        
        onTouchCancel() {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }

        onButtonOk() {
            this.processOk();
        }
        
        processOk() {
            this.playOkSound();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        }

        callOkHandler() {
            this.callHandler("ok");
        };
        
        processCancel() {
            SoundManager.playCancel();
            this.updateInputData();
            this.deactivate();
            this.callCancelHandler();
        }

        callCancelHandler() {
            this.callHandler("cancel");
        }
        
        playOKSound() {
            // Do Nothing
        }
    } 

    class Window_FreeImage extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
        }

        createSprite(pictInfo) {
            if (pictInfo && pictInfo.imageFile) {
                const bitmap = ImageManager.loadPicture(pictInfo.imageFile);
                const sprite = new Sprite(bitmap);
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.scale.x = (pictInfo.scaleX || 100) / 100;
                sprite.scale.y = (pictInfo.scaleY || 100) / 100;
                sprite.x = this.width / 2 + pictInfo.offsetX;
                sprite.y = this.height / 2 + pictInfo.offsetY;
                this._sprite = sprite;
                this.addChild(sprite);
            }
        }
    }

    PluginManagerEx.registerCommand(document.currentScript, 'openShop', (args) => {
        const goods = args.goods;
        SceneManager.push(Scene_CommonEventShop);
        SceneManager.prepareNextScene(goods, args.purchaseOnly, args.noSoundBuy, args.pictureInfo);
    });

})();