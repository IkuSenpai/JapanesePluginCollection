//=============================================================================
// YKP_ShopManager.js
//
// Copyright (c) 2019 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_ShopManager = true;

var YukiKP = YukiKP || {};
YukiKP.ShopManager = YukiKP.ShopManager || {};

/*:
 * @plugindesc アイテムや変数を使ったショップを作れるプラグイン。
 * @target MZ
 * @base YKP_Core
 * @orderAfter YKP_Core
 * @author YukiKamijo
 *
 * @param UsingPluginSystem
 * @desc trueでプラグインによるショップシステム変更します。
 * default true
 * @default true
 *
 * @param ItemCurrency
 * @desc 通常のアイテム単位を設定します。
 * default 個
 * @default 個
 *
 * @command ShopManager_Enable
 * @text プラグインを有効化
 * @desc プラグインによるをショップ改変を有効にします。
 *
 * @command ShopManager_Disable
 * @text プラグインを無効化
 * @desc プラグインによるをショップ改変を無効にします。
 *
 * @command ShopManager_SetUp
 * @text ショップの改変設定
 * @desc 次の「ショップの処理」を改変して実行する宣言です。
 *
 * @arg type
 * @text 通貨アイテム設定
 * @desc 通貨とするアイテムや変数を指定します。i(アイテム), w(武器), a(防具), v(変数)
 *
 * @arg id
 * @text 通貨アイテムID
 * @desc 通貨とするアイテムや変数のIDを指定します。
 *
 * @arg currency
 * @text 通貨の単位
 * @desc 通貨としたアイテムの単位を設定します。
 *
 * @arg price
 * @text 売却価格
 * @desc 「売る」場合に、通貨としたアイテムが増える数量を指定できます。
 *
 * @command ShopManager_AddVirtualItem
 * @text 仮想アイテムを追加
 * @desc 指定したアイテムが仮想アイテムとしてショップに追加できます。使用時は先に「ショップの改変設定」を実行してください。
 *
 * @arg itemId
 * @text 仮想アイテムID
 * @desc 仮想アイテムとするIDを指定します。
 *
 * @arg type
 * @text 増加対象
 * @desc 仮想アイテムを購入した場合に、増加する値をお金と変数で選択します。gold / variableのどちらか選択。
 *
 * @arg num
 * @text 増加数量
 * @desc 仮想アイテムを購入した場合に、実際に増加する数量を指定します。
 *
 * @arg id
 * @text 変数ID
 * @desc typeに変数(variable)を指定した場合に、使う変数のIDを指定します。
 *
 * @arg currency
 * @text 変数の単位
 * @desc typeに変数(variable)を指定した場合に、使う変数の単位を設定します。
 *
 * @help
 * アイテムや変数を使ったショップを作れるプラグインです。
 *
 * このプラグインを使用するには、YKP_Core.jsが必要です。
 *
 * プラグインコマンドを使用し、ショップの設定をします。
 * 設定直後に行われた「ショップの処理」で反映します。
 * 「ショップの処理」終了後は、再度プラグインコマンドを実行するまで
 * デフォルトのショップが開かれるようになります。
 *
 * パラメータ設定の説明。
 * UsingPluginSystem : ショップシステムの変更可否。
 * ItemCurrency      : アイテムの単位。
 *
 *
 * プラグインコマンドは以下になります。
 *
 * プラグインを有効化  : プラグインによる変更を有効にします。
 * プラグインを無効化  : プラグインによる変更を無効にします。
 *
 * 初期はパラメータのUsingPluginSystemに従っています。
 *
 *
 * ショップの改変設定  : 次に実行する「ショップの処理」を改変します。
 *   通貨アイテム設定  : 通貨にするアイテム
 *                     :  i アイテム
 *                     :  w 武器
 *                     :  a 防具
 *                     :  v 変数
 *   通貨アイテムID    :  使用するID
 *    通貨の単位       : 通貨の単位 (個や枚など)
 *     売却価格        : アイテム売却時のitem取得設定 (省略可)
 *                     :  10 と設定すれば、全アイテムが1個売るごとに10の通貨アイテム取得
 *                     :  10% と設定すれば、各アイテムの価格の10%で通貨アイテム取得
 *
 * 売却価格を設定する場合は、十分に注意してください。
 * ゲームバランスを崩す可能性があります。
 * 売却価格設定は「アイテムを売ってポイントを貯める」といった使い方を想定しています。
 * 売却価格を省略した場合は、購入のみのショップが作られます。
 *
 *
 * 仮想アイテムを追加  : 改変した「ショップの処理」に仮想アイテムを追加します。
 *                     : 仮想アイテムを購入すると、指定した値でGoldや変数を増やすことが出来ます。
 *                     : 使う場合は、先に「ショップの改変設定」を実行してください。
 *   仮想アイテムID    : 仮想アイテムのID
 *     増加対象        : 購入したときに増加させる対象
 *     増加数量        : 仮想アイテムを1個購入した時に増加する数
 *      変数ID         : 変数のID
 *    変数の単位       : 変数の単位
 *
 * ショップの販売リストにお金や変数を設定できます。
 * 換金する、アイテムをポイントに交換するといった使い方を想定しています。
 * 追加には仮想のアイテムをデータベースに用意する必要があります。
 * 用意した仮想アイテムを「ショップの処理」で入れておけば、
 * 自動的に直接お金や変数が増えるようになっています。
 * 仮想アイテムは複数の追加が可能となっています。
 *
 * 例:
 *  アイテムID[10]に価格1の仮想アイテムをデータベースに用意
 *  アイテムID[11]に価格9の仮想アイテムをデータベースに用意
 *  アイテムID[12]に価格10の仮想アイテムをデータベースに用意
 *  プラグインコマンドの値を、仮想アイテムID:10、増加対象:gold、増加数量:100
 *  プラグインコマンドの値を、仮想アイテムID:11、増加対象:gold、増加数量:100
 *  プラグインコマンドの値を、仮想アイテムID:12、増加対象:variable、増加数量:100、変数ID:10、変数の単位:枚
 *
 * 解説:
 *  アイテムID[10][11][12]を仮想アイテムとして用意しておきます。
 *  アイテムID[10]は消費1で100のお金に換金されますが、
 *  アイテムID[11]は消費9で1000のお金に換金されます。
 *  まとめて換金すると少しお得になる。という演出ができます。
 *  同じショップでアイテムID[12]を使って、
 *  変数[10]を消費10で100枚増やすことも出来ます。
 *
 * plugin version 1.0.0
 */

(function() {
    "use strict";
    const pluginName = "YKP_ShopManager";

    var parameters         = PluginManager.parameters('YKP_ShopManager');
    var _usingPluginSystem = YukiKP.Core.strBoolean(parameters['UsingPluginSystem']);
    var _itemCurrency      = String(parameters['ItemCurrency']);

    let _pluginShopUsing  = false;
    let _canSell          = false;
    let _walletData       = {};
    let _sellingPrice     = '0';
    let _virtualData      = {};

    /** プラグインコマンド */
    PluginManager.registerCommand(pluginName, "ShopManager_Enable", args => {
        _usingPluginSystem = YukiKP.Core.checkEnable('enable');
    });

    PluginManager.registerCommand(pluginName, "ShopManager_Disable", args => {
        _usingPluginSystem = YukiKP.Core.checkEnable('disable');
    });

    PluginManager.registerCommand(pluginName, "ShopManager_SetUp", args => {
        YukiKP.ShopManager.initialize();
        YukiKP.ShopManager.setup(args);
    });

    PluginManager.registerCommand(pluginName, "ShopManager_AddVirtualItem", args => {
        YukiKP.ShopManager.addItem(args);
    });

    /** 実行処理 */
    YukiKP.ShopManager.initialize = function() {
        _pluginShopUsing  = false;
        _canSell          = false;

        _walletData.type     = '';
        _walletData.id       = 0;
        _walletData.currency = '';

        _sellingPrice = '0';

        _virtualData.gItemId   = [];
        _virtualData.gNum      = [];
        _virtualData.vItemId   = [];
        _virtualData.vId       = [];
        _virtualData.vNum      = [];
        _virtualData.vCurrency = [];
    };

    YukiKP.ShopManager.setup = function(args) {
        _pluginShopUsing = true;
        _walletData.type     = args.type;
        _walletData.id       = args.id;
        _walletData.currency = args.currency;
        if (Number(args.price)) {
            _sellingPrice = args.price;
            _canSell = true;
        } else {
            _canSell = false;
        }
    };

    YukiKP.ShopManager.addItem = function(args) {
        var itemId = Number(args.itemId);
        if (!itemId) {
            return;
        }
        var chengeType = args.type;
        if (chengeType === 'gold') {
            _virtualData.gItemId.push(itemId);
            _virtualData.gNum.push(Number(args.num));
        } else if (chengeType === 'variable') {
            _virtualData.vItemId.push(itemId);
            _virtualData.vId.push(Number(args.id));
            _virtualData.vNum.push(Number(args.num));
            _virtualData.vCurrency.push(args.currency);
        }
    };

    YukiKP.ShopManager.Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
    Window_ShopCommand.prototype.makeCommandList = function() {
        if (_usingPluginSystem) {
            if (_pluginShopUsing) {
                if ($gameSystem.isJapanese()) {
                    this.addCommand('交換する', 'buy');
                } else {
                    this.addCommand('exchenge', 'buy');
                }
            } else {
                this.addCommand(TextManager.buy, 'buy');
            }
            if (!this._purchaseOnly) {
                this.addCommand(TextManager.sell, 'sell');
            }
            this.addCommand(TextManager.cancel, 'cancel');
        } else {
            YukiKP.ShopManager.Window_ShopCommand_makeCommandList.call(this);
        }
    };

    YukiKP.ShopManager.Window_Gold_refresh = Window_Gold.prototype.refresh;
    Window_Gold.prototype.refresh = function() {
        if (_usingPluginSystem && _pluginShopUsing) {
            const rect = this.itemLineRect(0);
            const x = rect.x;
            const y = rect.y;
            const width = rect.width;
            this.contents.clear();
            this.drawCurrencyValue(this.value(), _walletData.currency, x, y, width);
        } else {
            YukiKP.ShopManager.Window_Gold_refresh.call(this);
        }
    };

    YukiKP.ShopManager.Window_Gold_value = Window_Gold.prototype.value;
    Window_Gold.prototype.value = function() {
        if (_usingPluginSystem && _pluginShopUsing) {
            switch (_walletData.type) {
            case 'i':
            case 'w':
            case 'a':
                return $gameParty.numItems(YukiKP.Core.convertDatabase(_walletData.type)[_walletData.id]);
            case 'v':
                return $gameVariables.value(_walletData.id);
            default:
                return YukiKP.ShopManager.Window_Gold_value.call(this);
            }
        } else {
            return YukiKP.ShopManager.Window_Gold_value.call(this);
        }
    };

    YukiKP.ShopManager.Window_ShopNumber_drawTotalPrice = Window_ShopNumber.prototype.drawTotalPrice;
    Window_ShopNumber.prototype.drawTotalPrice = function() {
        if (_usingPluginSystem && _pluginShopUsing) {
            const padding = this.itemPadding();
            const total = _sellingPrice * this._number;
            const width = this.innerWidth - padding * 2;
            const y = this.totalPriceY();
            this.drawCurrencyValue(total, _walletData.currency, 0, y, width);
        } else {
            YukiKP.ShopManager.Window_ShopNumber_drawTotalPrice.call(this);
        }
    };

    YukiKP.ShopManager.Window_ShopStatus_drawPossession = Window_ShopStatus.prototype.drawPossession;
    Window_ShopStatus.prototype.drawPossession = function(x, y) {
        if (_usingPluginSystem) {
            const width = this.innerWidth - this.itemPadding() - x;
            var possessionWidth = this.textWidth('0000');
            this.changeTextColor(this.systemColor());
            var possesionText = '';
            if (_pluginShopUsing) {
                if (_virtualData.gItemId.indexOf(this._item.id) >= 0) {
                    if ($gameSystem.isJapanese()) {
                        possesionText = '所持金';
                    } else {
                        possesionText = 'gold';
                    }
                } else {
                    possesionText = TextManager.possession;
                }
            } else {
                possesionText = TextManager.possession;
            }
            this.drawText(possesionText, x, y, width - possessionWidth);
            this.resetTextColor();
            var numText = '';
            if (_pluginShopUsing) {
                if (_virtualData.gItemId.indexOf(this._item.id) >= 0) {
                    numText = $gameParty.gold() + ' ' + TextManager.currencyUnit;
                } else if (_virtualData.vItemId.indexOf(this._item.id) >= 0) {
                    var itemIndex = _virtualData.vItemId.indexOf(this._item.id);
                    numText = $gameVariables.value(_virtualData.vId[itemIndex]) + ' ' + _virtualData.vCurrency[itemIndex];
                } else {
                    numText = $gameParty.numItems(this._item) + ' ' + _itemCurrency;
                }
            } else {
                numText = $gameParty.numItems(this._item) + ' ' + _itemCurrency;
            }
            this.drawText(numText, x, y, width, 'right');
        } else {
            YukiKP.ShopManager.Window_ShopStatus_drawPossession.call(this, x, y);
        }
    };

    YukiKP.ShopManager.Scene_Shop_popScene = Scene_Shop.prototype.popScene;
    Scene_Shop.prototype.popScene = function() {
        if (_usingPluginSystem) {
            YukiKP.ShopManager.initialize();
            SceneManager.pop();
        } else {
            YukiKP.ShopManager.Scene_Shop_popScene.call(this);
        }
    };

    YukiKP.ShopManager.Scene_Shop_createCommandWindow = Scene_Shop.prototype.createCommandWindow;
    Scene_Shop.prototype.createCommandWindow = function() {
        if (_usingPluginSystem) {
            const rect = this.commandWindowRect();
            this._commandWindow = new Window_ShopCommand(rect);
            this._commandWindow.setPurchaseOnly(this._purchaseOnly);
            this._commandWindow.y = this.mainAreaTop();
            this._commandWindow.setHandler('buy',    this.commandBuy.bind(this));
            this._commandWindow.setHandler('sell',   this.commandSell.bind(this));
            this._commandWindow.setHandler('cancel', this.popScene.bind(this));
            this.addWindow(this._commandWindow);
        } else {
            YukiKP.ShopManager.Scene_Shop_createCommandWindow.call(this);
        }
    };

    YukiKP.ShopManager.Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
    Scene_Shop.prototype.onBuyOk = function() {
        if (_usingPluginSystem) {
            this._item = this._buyWindow.item();
            this._buyWindow.hide();
            this._numberWindow.setup(this._item, this.maxBuy(), this.buyingPrice());
            if (_pluginShopUsing) {
                this._numberWindow.setCurrencyUnit(_walletData.currency);
            } else {
                this._numberWindow.setCurrencyUnit(this.currencyUnit());
            }
            this._numberWindow.show();
            this._numberWindow.activate();
        } else {
            YukiKP.ShopManager.Scene_Shop_onBuyOk.call(this);
        }
    };

    YukiKP.ShopManager.Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
    Scene_Shop.prototype.onSellOk = function() {
        if (_usingPluginSystem) {
            this._item = this._sellWindow.item();
            this._categoryWindow.hide();
            this._sellWindow.hide();
            this._numberWindow.setup(this._item, this.maxSell(), this.sellingPrice());
            if (_pluginShopUsing) {
                this._numberWindow.setCurrencyUnit(_walletData.currency);
            } else {
                this._numberWindow.setCurrencyUnit(this.currencyUnit());
            }
            this._numberWindow.show();
            this._numberWindow.activate();
            this._statusWindow.setItem(this._item);
            this._statusWindow.show();
        } else {
            YukiKP.ShopManager.Scene_Shop_onSellOk.call(this);
        }
    };

    YukiKP.ShopManager.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
    Scene_Shop.prototype.doBuy = function(number) {
        if (_usingPluginSystem) {
            var loseNum = number * this.buyingPrice();
            if (_pluginShopUsing) {
                switch (_walletData.type) {
                case 'i':
                case 'w':
                case 'a':
                    $gameParty.loseItem(YukiKP.Core.convertDatabase(_walletData.type)[_walletData.id], loseNum);
                    break;
                case 'v':
                    var num = $gameVariables.value(_walletData.id) - loseNum;
                    $gameVariables.setValue(_walletData.id, num);
                    break;
                }
            } else {
                $gameParty.loseGold(loseNum);
            }
            if (_virtualData.gItemId.indexOf(this._item.id) >= 0) {
                var itemIndex = _virtualData.gItemId.indexOf(this._item.id);
                $gameParty.gainGold(number * _virtualData.gNum[itemIndex]);
            } else if (_virtualData.vItemId.indexOf(this._item.id) >= 0) {
                var itemIndex = _virtualData.vItemId.indexOf(this._item.id);
                var num = $gameVariables.value(_virtualData.vId[itemIndex]) + number * _virtualData.vNum[itemIndex];
                $gameVariables.setValue(_virtualData.vId[itemIndex], num);
            } else {
                $gameParty.gainItem(this._item, number);
            }
        } else {
            YukiKP.ShopManager.Scene_Shop_doBuy.call(this, number);
        }
    };

    YukiKP.ShopManager.Scene_Shop_doSell = Scene_Shop.prototype.doSell;
    Scene_Shop.prototype.doSell = function(number) {
        if (_usingPluginSystem) {
            var geinNum = number * this.sellingPrice();
            if (_pluginShopUsing) {
                switch (_walletData.type) {
                case 'i':
                case 'w':
                case 'a':
                    $gameParty.gainItem(YukiKP.Core.convertDatabase(_walletData.type)[_walletData.id], geinNum);
                    break;
                case 'v':
                    var num = $gameVariables.value(_walletData.id) + geinNum;
                    $gameVariables.setValue(_walletData.id, num);
                    break;
                }
            } else {
                $gameParty.gainGold(geinNum);
            }
            $gameParty.loseItem(this._item, number);
        } else {
            YukiKP.ShopManager.Scene_Shop_doSell.call(this, number);
        }
    };

    YukiKP.ShopManager.Scene_Shop_sellingPrice = Scene_Shop.prototype.sellingPrice;
    Scene_Shop.prototype.sellingPrice = function() {
        if (_usingPluginSystem) {
            if (_canSell) {
                if (_sellingPrice.slice(-1) === '%') {
                    var pricePercentage = Number(_sellingPrice.slice(0, -1)) / 100;
                    return Math.floor(this._item.price * pricePercentage);
                }
                return Number(_sellingPrice);
            } else {
                return Math.floor(this._item.price / 2);
            }
        } else {
            return YukiKP.ShopManager.Scene_Shop_sellingPrice.call(this);
        }
    };

    YukiKP.ShopManager.Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
    Game_Interpreter.prototype.command302 = function(params) {
        if (_usingPluginSystem) {
            if (!$gameParty.inBattle()) {
                var goods = [params];
                while (this.nextEventCode() === 605) {
                    this._index++;
                    goods.push(this.currentCommand().parameters);
                }
                SceneManager.push(Scene_Shop);
                if (_pluginShopUsing) {
                    SceneManager.prepareNextScene(goods, !_canSell);
                } else {
                    YukiKP.ShopManager.initialize();
                    SceneManager.prepareNextScene(goods, params[4]);
                }
            }
            return true;
        } else {
            return YukiKP.ShopManager.Game_Interpreter_command302.call(this);
        }
    };
})();