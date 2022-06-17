//=============================================================================
// RPGツクールMZ - LL_EquipQuickChange.js v1.1.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 「今すぐ装備」コマンドを実装します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-quickequip/
 *
 * @help LL_EquipQuickChange.js
 *
 * 対象の装備品を誰に装備するか選択するウィンドウを表示します。
 * 装備品入手時に、いわゆる「今すぐ装備する」コマンドを実装できます。
 * プラグインコマンドで実行してください。
 *
 * プラグインコマンド:
 *   武器装備選択: 対象の武器を選択し、装備切替画面を表示します。
 *   防具装備選択: 対象の防具を選択し、装備切替画面を表示します。
 *   ※対象の装備品を所持していない場合、プラグインコマンドは無視されます。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2021/11/25
 *
 * @param shopSettings
 * @text ショップ連動設定
 * @desc ※この項目は使用しません
 *
 * @param shopEnabled
 * @text 装備品購入時に自動表示
 * @desc ショップで装備品を購入した時に装備切替画面を表示します。
 * @default true
 * @type boolean
 * @parent shopSettings
 *
 * @param shopMultipleEquip
 * @text 複数購入時に連続選択
 * @desc ショップで装備品を複数購入した場合に、
 * 購入数分選択画面を繰り返し表示します。
 * @default false
 * @type boolean
 * @parent shopSettings
 *
 * @param iniInfoText
 * @text 質問メッセージ
 * @desc 「質問メッセージ」の文言設定です。
 * @default 装備しますか？
 * @type string
 *
 * @param iniEquipNgText
 * @text 装備不可メッセージ
 * @desc 「装備不可」の文言設定です。
 * @default 装備できません。
 * @type string
 *
 * @param iniCancelText
 * @text キャンセルコマンド名
 * @desc 「キャンセル」コマンドの文言設定です。
 * @default 装備しない
 * @type string
 *
 * @command changeWeapon
 * @text 武器装備選択
 * @desc 対象の武器を選択し、装備切替画面を表示します。
 * 対象の装備品を所持していない場合、このコマンドは無視されます。
 *
 * @arg weaponId
 * @text 武器ID
 * @desc 変更対象の武器を選択します。
 * @type weapon
 *
 * @arg infoText
 * @text 質問メッセージ
 * @desc 「質問文」の文言設定です。
 * @default 装備しますか？
 * @type string
 *
 * @arg gainCount
 * @text 獲得数
 * @desc この回数分選択画面を繰り返し表示します。
 * パーティ人数を上回った場合、パーティ人数が上限となります。
 * @default 1
 * @min 1
 * @max 99
 * @type number
 *
 * @command changeArmor
 * @text 防具装備選択
 * @desc 対象の防具を選択し、装備切替画面を表示します。
 * 対象の装備品を所持していない場合、このコマンドは無視されます。
 *
 * @arg armorId
 * @text 防具ID
 * @desc 変更対象の防具を選択します。
 * @type armor
 *
 * @arg infoText
 * @text 質問メッセージ
 * @desc 「質問文」の文言設定です。
 * @default 装備しますか？
 * @type string
 *
 * @arg gainCount
 * @text 獲得数
 * @desc この回数分選択画面を繰り返し表示します。
 * パーティ人数を上回った場合、パーティ人数が上限となります。
 * @default 1
 * @min 1
 * @max 99
 * @type number
 */

(() => {
    "use strict";
    const pluginName = "LL_EquipQuickChange";

    const parameters = PluginManager.parameters(pluginName);
    const shopEnabled = eval(parameters["shopEnabled"] || "true");
    const shopMultipleEquip = eval(parameters["shopMultipleEquip"] || "false");
    const iniInfoText = String(parameters["iniInfoText"] || "装備しますか？");
    const iniEquipNgText = String(parameters["iniEquipNgText"] || "装備できません。");
    const iniCancelText = String(parameters["iniCancelText"] || "装備しない");


    // 独自変数定義
	let infoText = "";
    let exGoods = null;
    let exPurchaseOnly = null;
    let exBuyWindowLastIndex = 0;
    let exBuyCount = 1;

    PluginManager.registerCommand(pluginName, "changeWeapon", args => {
        const weaponId = Number(args.weaponId || null);
        if (weaponId) {
            // 対象装備品を所持しているか？
            if ($gameParty.hasItem($dataWeapons[weaponId], true)) {
                // 武器情報を取得
                ExEquipTargetItem.set($dataWeapons[weaponId]);
                // 文言をセット
                infoText = String(args.infoText || "");
                // ショップ判定オフ
                exGoods = null;
                exPurchaseOnly = null;
                exBuyWindowLastIndex = 0;
                exBuyCount = Number(args.gainCount || 1);
                // 装備選択画面へ
                SceneManager.push(Scene_EquipQuickChange);
            } else {
                console.log(pluginName + ": 対象の装備品を所持していなかったため、コマンドがスキップされました");
            }
        }
    });

    PluginManager.registerCommand(pluginName, "changeArmor", args => {
        const armorId = Number(args.armorId || null);
        if (armorId) {
            // 対象装備品を所持しているか？
            if ($gameParty.hasItem($dataArmors[armorId], true)) {
                // 防具情報を取得
                ExEquipTargetItem.set($dataArmors[armorId]);
                // 文言をセット
                infoText = String(args.infoText || "");
                // ショップ判定オフ
                exGoods = null;
                exPurchaseOnly = null;
                exBuyWindowLastIndex = 0;
                exBuyCount = Number(args.gainCount || 1);
                // 装備選択画面へ
                SceneManager.push(Scene_EquipQuickChange);
            } else {
                console.log(pluginName + ": 対象の装備品を所持していなかったため、コマンドがスキップされました");
            }
        }
    });


    //-----------------------------------------------------------------------------
	// ExEquipTargetItem
	//

    class ExEquipTargetItem {

        constructor() {
            this.item = null;
        }

        static get() {
            return this.item;
        }

        static set(item) {
            this.item = item;
        }

        static getSlotId() {
            return this.item.etypeId - 1;
        }

        static getEtypeId() {
            return this.item.etypeId;
        }

    }

    //-----------------------------------------------------------------------------
    // Scene_EquipQuickChange
    //
    // 対象の装備品と変更する独自のシーンを追加定義します。

    function Scene_EquipQuickChange() {
        this.initialize(...arguments);
    }

    Scene_EquipQuickChange.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_EquipQuickChange.prototype.constructor = Scene_EquipQuickChange;

    Scene_EquipQuickChange.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._equipCount = $gameParty.size() < exBuyCount ? $gameParty.size() : exBuyCount;
    };

    Scene_EquipQuickChange.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this._statusWindow.refresh();
    };

    Scene_EquipQuickChange.prototype.helpAreaHeight = function() {
        return this.calcWindowHeight(2, false);
    };

    Scene_EquipQuickChange.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createInfoWindow();
        this.createStatusWindow();
        this.createCommandWindow();
        this._helpWindow.setText(this.helpWindowText());
        this.infoWindowSetText();
    };

    Scene_EquipQuickChange.prototype.createInfoWindow = function() {
        const rect = this.infoWindowRect();
        this._infoWindow = new Window_Help(rect);
        this.addWindow(this._infoWindow);
    };

    Scene_EquipQuickChange.prototype.infoWindowRect = function() {
        const wx = this.isRightInputMode() ? this.statusWindowRect().width : 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth - this.statusWindowRect().width;
        const wh = this.calcWindowHeight(2, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_EquipQuickChange.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_EquipStatusQuickChange(rect);
        this.addWindow(this._statusWindow);
    };

    Scene_EquipQuickChange.prototype.statusWindowRect = function() {
        const ww = this.statusWidth();
        const wh = this.mainAreaHeight();
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_EquipQuickChange.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        const commandWindow = new Window_EquipQuickActor(rect);
        commandWindow.setHandler("ok", this.checkPopScene.bind(this));
        commandWindow.setHandler("cancel", this.popScene.bind(this));
        commandWindow.setStatusWindow(this._statusWindow);
        this.addWindow(commandWindow);

        this._commandWindow = commandWindow;
    };

    Scene_EquipQuickChange.prototype.commandWindowRect = function() {
        const ww = Graphics.boxWidth - this.statusWindowRect().width;
        const wh = this.mainAreaHeight() - this._helpWindow.height;
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop() + this._helpWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_EquipQuickChange.prototype.helpWindowText = function() {
        const targetItem = ExEquipTargetItem.get();
        return targetItem.description;
    };

    Scene_EquipQuickChange.prototype.infoWindowSetText = function() {
        const targetItem = ExEquipTargetItem.get();
        const width = this._infoWindow.innerWidth;
        const y2 = this._infoWindow.lineHeight();

        const numberWidth = this._infoWindow.textWidth(":00");
        const equipCount = this._equipCount;

        this._infoWindow.drawItemName(targetItem, 0, 0, width - numberWidth);
        this._infoWindow.drawText(":", width - numberWidth, 0, this._infoWindow.textWidth(":"), "right");
        this._infoWindow.drawText(equipCount, width - numberWidth + this._infoWindow.textWidth(":"), 0, this._infoWindow.textWidth("00"), "right");
        this._infoWindow.drawText(infoText, 0, y2, width);
    };

    Scene_EquipQuickChange.prototype.statusWidth = function() {
        return 312;
    };

    Scene_EquipQuickChange.prototype.popScene = function() {
        SceneManager.pop();
        // ショップ判定
        if (exGoods !== null) {
            SceneManager.prepareNextScene(exGoods, exPurchaseOnly);
            SceneManager._nextScene.buyWindowFocusOn();
        }
    };

    Scene_EquipQuickChange.prototype.checkPopScene = function() {
        // 装備回数が0になったら終了
        this._equipCount -= 1;
        if (this._equipCount > 0) {
            this._commandWindow.activate();
            this._commandWindow.refresh();
            this._statusWindow.refresh();
            this._infoWindow.refresh();
            this.infoWindowSetText();
        } else {
            this.popScene();
        }
    };


    //-----------------------------------------------------------------------------
    // Window_EquipStatusQuickChange
    //
    // The window for displaying parameter changes on the equipment screen.

    function Window_EquipStatusQuickChange() {
        this.initialize(...arguments);
    }

    Window_EquipStatusQuickChange.prototype = Object.create(Window_EquipStatus.prototype);
    Window_EquipStatusQuickChange.prototype.constructor = Window_EquipStatusQuickChange;

    Window_EquipStatusQuickChange.prototype.initialize = function(rect) {
        Window_EquipStatus.prototype.initialize.call(this, rect);
    };

    Window_EquipStatusQuickChange.prototype.refreshDisabled = function() {
        this.contents.clear();
        if (this._actor) {
            const nameRect = this.itemLineRect(0);
            this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
            this.drawActorFace(this._actor, nameRect.x, nameRect.height);
            this.drawAllParamsDisabled();
        }
    };

    Window_EquipStatusQuickChange.prototype.drawAllParamsDisabled = function() {
        const x = this.itemPadding();
        const y = this.paramY(0);
        const width = this.innerWidth - this.itemPadding() * 2;
        this.changeTextColor(ColorManager.powerDownColor());
        // 装備不可
        this.drawText(iniEquipNgText, x, y, width);
    };


    //-----------------------------------------------------------------------------
    // Window_EquipQuickActor
    //
    // 装備を変更する対象アクターを選択するウィンドウです。

    function Window_EquipQuickActor() {
        this.initialize(...arguments);
    }

    Window_EquipQuickActor.prototype = Object.create(Window_Command.prototype);
    Window_EquipQuickActor.prototype.constructor = Window_EquipQuickActor;

    Window_EquipQuickActor.prototype.initialize = function(rect) {
        Window_Command.prototype.initialize.call(this, rect);
    };

    Window_EquipQuickActor.prototype.makeCommandList = function() {
        this.addPartyMembers();
    };

    Window_EquipQuickActor.prototype.addPartyMembers = function() {
        const _this = this;
        const targetItem = ExEquipTargetItem.get();
        const slotId = ExEquipTargetItem.getSlotId();
        this.addCommand(iniCancelText, "cancel");
        $gameParty.members().forEach(function(item) {
            if (item.canEquip(targetItem) && item.isEquipChangeOk(slotId)) {
                _this.addCommand(item._name, item._actorId, true);
            } else {
                _this.addCommand(item._name, item._actorId, false);
            }
        });
    };

    Window_EquipQuickActor.prototype.drawItem = function(index) {
        const actorName = this.commandName(index);
        const equippedName = this.equippedName(index);
        const rect = this.itemLineRect(index);
        const equippedWidth = this.equippedWidth();
        const actorNameWidth = rect.width - equippedWidth;
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(actorName, rect.x, rect.y, actorNameWidth, "left");
        this.drawItemName(equippedName, rect.x + actorNameWidth, rect.y, equippedWidth);
    };

    Window_EquipQuickActor.prototype.equippedWidth = function() {
        return 240;
    };

    Window_EquipQuickActor.prototype.equippedName = function(index) {
        const symbol = this.commandSymbol(index);
        const value = this.getEquippedItem(symbol);
        return value ? value : null;
    };

    Window_EquipQuickActor.prototype.getEquippedItem = function(symbol) {
        const actor = $gameActors.actor(symbol);
        const slotId = ExEquipTargetItem.getSlotId();
        return actor ? actor.equips()[slotId] : null;
    };

    Window_EquipQuickActor.prototype.setStatusWindow = function(statusWindow) {
        this._statusWindow = statusWindow;
        this.refreshActor();
    };

    Window_EquipQuickActor.prototype.cursorUp = function(wrap) {
        Window_Selectable.prototype.cursorUp.call(this, wrap);
        this.refreshActor();
    };

    Window_EquipQuickActor.prototype.cursorDown = function(wrap) {
        Window_Selectable.prototype.cursorDown.call(this, wrap);
        this.refreshActor();
    };

    Window_EquipQuickActor.prototype.onTouchSelect = function(trigger) {
        Window_Selectable.prototype.onTouchSelect.call(this, trigger);
        this.refreshActor();
    };

    Window_EquipQuickActor.prototype.refreshActor = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        if (this._statusWindow) {
            // キャンセルの場合
            if (symbol === "cancel") {
                this._statusWindow.contents.clear();
                return;
            }
            const actor = $gameActors.actor(symbol);
            const targetItem = ExEquipTargetItem.get();
            const slotId = ExEquipTargetItem.getSlotId();
            this._statusWindow.setActor(actor);
            // 装備後のパラメータを表示
            if (actor.canEquip(targetItem) && actor.isEquipChangeOk(slotId)) {
                const actorTmp = JsonEx.makeDeepCopy(actor);
                actorTmp.forceChangeEquip(slotId, targetItem);
                this._statusWindow.setTempActor(actorTmp);
            } else {
                this._statusWindow.refreshDisabled();
            }
        }
    };

    Window_EquipQuickActor.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            this.playOkSound();
            this.equipChange();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    Window_EquipQuickActor.prototype.equipChange = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        // キャンセルの場合
        if (symbol === "cancel") return;
        const targetItem = ExEquipTargetItem.get();
        const etypeId = ExEquipTargetItem.getEtypeId();
        $gameActors.actor(symbol).changeEquipById(etypeId, targetItem.id);
    };

    Window_EquipQuickActor.prototype.playOkSound = function() {
        const index = this.index();
        const symbol = this.commandSymbol(index);
        // 決定音 or 装備音
        symbol === "cancel" ? SoundManager.playOk() : SoundManager.playEquip();
    };


    //-----------------------------------------------------------------------------
    // Scene_Shop を拡張
    //

    const _Scene_Shop_initialize = Scene_Shop.prototype.initialize;
    Scene_Shop.prototype.initialize = function() {
        _Scene_Shop_initialize.apply(this, arguments);
        this._buyWindowFocus = false;
    };

    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.apply(this, arguments);
        this.buyWindowFocus();
    };

    Scene_Shop.prototype.buyWindowFocusOn = function() {
        this._buyWindowFocus = true;
    };

    Scene_Shop.prototype.buyWindowFocus = function() {
        if (!this._buyWindowFocus) return;
        this._commandWindow.deactivate();
        this._buyWindow.setMoney(this.money());
        this._buyWindow.show();
        this._buyWindow.activate();
        this._statusWindow.show();
        // カーソルを合わせる
        if (exBuyWindowLastIndex > 0) {
            this._buyWindow.forceSelect(exBuyWindowLastIndex);
        }
    };

    const _Scene_Shop_onNumberOk = Scene_Shop.prototype.onNumberOk;
    Scene_Shop.prototype.onNumberOk = function() {
        // 購入かつ装備品の場合
        if (this._commandWindow.currentSymbol() === "buy" && this._item.etypeId) {
            // ショップ連動設定が有効の場合
            if (shopEnabled) {
                this.gotoEquipQuickChange();
                return;
            }
        }
        _Scene_Shop_onNumberOk.apply(this, arguments);
    }

    Scene_Shop.prototype.gotoEquipQuickChange = function() {
        SoundManager.playShop();
        this.doBuy(this._numberWindow.number());
        // 装備情報を取得
        const targetItem = this._item;
        ExEquipTargetItem.set(targetItem);
        // 文言をセット
        infoText = iniInfoText;
        // ショップ情報を保持
        exGoods = this._goods;
        exPurchaseOnly = this._purchaseOnly;
        exBuyWindowLastIndex = this._buyWindow.index();
        exBuyCount = shopMultipleEquip ? this._numberWindow.number() : 1;
        // 装備選択画面へ
        SceneManager.push(Scene_EquipQuickChange);
    }
})();
