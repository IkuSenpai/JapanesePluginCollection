/*:
 * @target MZ
 * @plugindesc 計算式による単価決定
 * @author GrayOgre
 * @help
 *
 * このプラグインは以下の機能を提供します。
 * ・アイテムの単価を計算する計算式によって決定する。
 *
 *   単価計算式を設定できる箇所は３つある
 * 
 *   (1) アイテムのメモ欄に<priceExpr:計算式>と記載する。
 *   (2) プラグインコマンド「計算式価格有効化」の引数に計算式を記載する。
 *   (3) プラグインパラメータに計算式を記載する。
 * 
 *   複数の箇所に計算式が記載された場合の優先度は(1) -> (3)の順になる。
 *
 * 　計算式の例
 *     P * (N + n)　単価をアイテムに設定した単価 × (持っている数＋購入する数)にする。
 * 
 *   計算式では次の３つの変数が使える。
 *     ・P : アイテムに設定した単価
 *     ・N : 現在持っているアイテム数
 *     ・n : 購入するアイテム数
 *     ・V[変数id]：ゲーム変数
 * 
 *   計算式は単調増加するものを想定している。
 *   あまり変な式だど正常動作は保証できない。（３次式など）
 * 
 *   計算式評価を有効にするには、プラグインコマンド「計算式価格有効化」を使用する。
 *   プラグインコマンド「計算式価格無効化」を使用するまでの間のショップが計算式評価を行う。
 *   想定しているのは下記のような使い方である。
 *   　「計算式価格有効化」
 *   　「ショップの処理」
 *   　「計算式価格無効化」
 *   （「ショップの処理」の前後に「計算式価格有効化」「計算式価格無効化」を置く）
 * 
 *   現状では、購入時のみ処理を有効にしている。
 * 
 * var 1.0.0
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param priceExprBuy
 *   @text 購入時単価計算式
 *   @desc アイテムの購入時の単価計算式
 *   @type string
 *   @default P
 * 
 * @command changeShop
 *   @text 計算式価格有効化
 *   @desc ショップ処理で計算式による価格を有効にする
 *   @arg priceExprBuy
 *     @text 購入時単価計算式
 *     @desc アイテムの購入時の単価計算式
 *     @type string
 *     @default
 * 
 * @command restoreShop
 *   @text 計算式価格無効化
 *   @desc ショップ処理で計算式による価格を無効化する
 * 
 */

let $useExpr = false;

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    const parameters = PluginManager.parameters(pluginName);

    const modulePriceExprBuy = parameters.priceExprBuy;
    let priceExprBuy = modulePriceExprBuy || "P";
    const metakey = "priceExpr";

    PluginManager.registerCommand(pluginName, "changeShop", args => {
        console.log("changeShop");
        priceExprBuy = args.priceExprBuy || modulePriceExprBuy || "P";
        $useExpr = true;
    });

    function gog_calculate_price(item, P, n, N, mode) {
        console.log(item, P, n, N, $useExpr);
        if (mode === "buy" && priceExprBuy) {
            let expr = item.meta[metakey] || priceExprBuy || "P";
            expr = expr.replace(/V\[(\d+)\]/g,(a,b) => $gameVariables.value(Number(b)));
            console.log("expr:", expr);
            const price = eval(expr);
            return isNaN(price) ? 0 : price;
        }
        return P;
    }
    
    const _window_shopbuy_price = Window_ShopBuy.prototype.price;
    Window_ShopBuy.prototype.price = function(item) {
        console.log('Window_ShopBuy.prototype.price', $useExpr);
        const mode = SceneManager._scene._commandWindow.currentSymbol();
        if ($useExpr && mode === "buy") {
            const base_price = this.basePrice(item);
            const n = 1;
            const N = $gameParty.numItems(item);
            return gog_calculate_price(item, base_price, n, N, mode);
        } else {
            return _window_shopbuy_price.call(this, item);
        }
    };

    const _window_shopbuy_makeItemList = Window_ShopBuy.prototype.makeItemList;
    Window_ShopBuy.prototype.makeItemList = function() {
        _window_shopbuy_makeItemList.call(this);
        if ($useExpr) {
            this._basePrice = Array.from(this._price);
        }
    };

    Window_ShopBuy.prototype.basePrice = function(item) {
        return this._basePrice[this._data.indexOf(item)] || 0;
    };

    Window_ShopNumber.prototype.basePrice = function(item) {
        return SceneManager._scene._buyWindow.basePrice(this._item);
    };

    const _window_shopnumber_drawTotalPrice = Window_ShopNumber.prototype.drawTotalPrice; 
    Window_ShopNumber.prototype.drawTotalPrice = function() {
        console.log('Window_ShopNumber.prototype.drawTotalPrice', $useExpr);
        const mode = SceneManager._scene._commandWindow.currentSymbol();
        if ($useExpr && mode === "buy") {
            const padding = this.itemPadding();
            const N = $gameParty.numItems(this._item);
            const basePrice = this.basePrice(this._item);
            const total = gog_calculate_price(this._item, basePrice, this._number, N, mode) * this._number;
            const width = this.innerWidth - padding * 2;
            const y = this.totalPriceY();
            this.drawCurrencyValue(total, this._currencyUnit, 0, y, width);
        } else {
            _window_shopnumber_drawTotalPrice.call(this);
        }
    };

    const _window_shopnumber_changeNumber = Window_ShopNumber.prototype.changeNumber;
    Window_ShopNumber.prototype.changeNumber = function(amount) {
        console.log('Window_ShopNumber.prototype.changeNumber', $useExpr);
        const mode = SceneManager._scene._commandWindow.currentSymbol();
        if ($useExpr && mode === "buy") {
            const lastNumber = this._number;
            const num = $gameParty.numItems(this._item);
            const max = $gameParty.maxItems(this._item) - num;
            const money = SceneManager._scene.money();
            const basePrice = this.basePrice(this._item);
            if (amount > 0) {
                let num0 = amount + this._number;
                for (let d = 1; d <= amount; d++) {
                    const dnum = d + this._number;
                    const price = gog_calculate_price(this._item, basePrice, dnum, num, mode);
                    const max2 = Math.min(Math.floor(money / price), max);
                    if (max2 <= 0) {
                        num0 = this.number;
                        break;
                    } else if (max2 < dnum) {
                        num0 = dnum - 1;
                        break;
                    }
                }
                this._number = num0;
            } else {
                this._number = (this._number + amount).clamp(1, this._max);
            }
            if (this._number !== lastNumber) {
                this.playCursorSound();
                this.refresh();
            }
        } else {
            _window_shopnumber_changeNumber.call(this, amount);
        }
    };
    
    const _scene_shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        console.log('Scene_Shop.prototype.doBuy', $useExpr);
        if ($useExpr) {
            const base_price = this._numberWindow.basePrice();
            const N = $gameParty.numItems(this._item);
            console.log(base_price);
            const total = gog_calculate_price(this._item, base_price, number, N, "buy") * number;
            $gameParty.loseGold(total);
            $gameParty.gainItem(this._item, number);
        } else {
            _scene_shop_doBuy.call(this, number);
        }
    };

    PluginManager.registerCommand(pluginName, "restoreShop", args => {
        console.log("restoreShop");
        $useExpr = false;
    });

})();
