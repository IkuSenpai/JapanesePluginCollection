// ===================================================
// ARTM_TMEventItemExMz
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 初版
// 1.0.1 アイテム選択拡張時のキャンセルボタン位置を調整
//=============================================================================
// TMPlugin - アイテム選択拡張
// バージョン: 1.1.0
// 最終更新日: 2017/01/24
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc アイテム選択の処理にヘルプウィンドウを追加し、
 * 個数表示の有無と表示行数をアイテムタイプごとに設定できます。
 * @author Artemis
 *
 * @help ARTM_TMEventItemExMz
 * tomoaky様作「アイテム選択拡張 ver1.1.0」プラグインのMZ移植版です。
 * 基本的な動作は変わっておりません。
 *
 * 【使い方】
 *   アイテムタイプごとに以下の設定を変更できます。
 *   ・ヘルプウィンドウを表示するかどうか
 *   ・個数を表示するかどうか
 *   ・アイテム選択ウィンドウの表示行数
 
 *   メモ欄タグとプラグインコマンドを使い、候補として表示するアイテムを
 *   さらに細かく分類することもできます。
 *
 * 【プラグインコマンド】
 *  コマンド名： イベントアイテム設定
 *    イベントコマンド『アイテム選択の処理』の直前に実行することで、
 *    指定したサブカテゴリーのアイテムのみを表示することができます。
 *
 *  引数：サブカテゴリー名
 *    サブカテゴリー名を指定します。
 *    <使用例> サブカテゴリー名 に "card" を指定した場合
 *      たとえば、イベントコマンド側で 大事なもの が選択されている場合、
 *      所持している大事なものの中からサブカテゴリーに card が設定されている
 *      アイテムのみを表示します。
 * 
 *     このコマンドの効果はアイテム選択完了（またはキャンセル）時に
 *     リセットされます。
 *
 * 【メモ欄タグ（アイテム）】
 *   <subCategory:xxxx>
 *     xxxxにはサブカテゴリ名を指定。
 *
 *   ≪使用例≫
 *   <subCategory:card>
 *     このタグがついているアイテムにサブカテゴリーとして card を設定します。 
 * 
 * @param helpWindowEnabledItem
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc アイテム選択でヘルプウィンドウを表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param helpWindowEnabledKey
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc 大事なもの選択でヘルプウィンドウを表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param helpWindowEnabledA
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc 隠しアイテムＡ選択でヘルプウィンドウを表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param helpWindowEnabledB
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc 隠しアイテムＢ選択でヘルプウィンドウを表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param showItemNumberItem
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc アイテムの個数を表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param showItemNumberKey
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc 大事なものの個数を表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param showItemNumberA
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc 隠しアイテムＡの個数を表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param showItemNumberB
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 * @desc 隠しアイテムＡの個数を表示するかどうか
 * 初期値: true（ false で表示しない）
 *
 * @param numVisibleRowsItem
 * @type number
 * @default 4
 * @desc アイテム選択の表示行数
 * 初期値: 4
 *
 * @param numVisibleRowsKey
 * @type number
 * @default 4
 * @desc 大事なもの選択の表示行数
 * 初期値: 4
 *
 * @param numVisibleRowsA
 * @type number
 * @default 4
 * @desc 隠しアイテムＡ選択の表示行数
 * 初期値: 4
 *
 * @param numVisibleRowsB
 * @type number
 * @default 4
 * @desc 隠しアイテムＢ選択の表示行数
 * 初期値: 4
 *
 * @param fixPlacement
 * @type select
 * @option top
 * @value top
 * @option bottom
 * @value bottom
 * @default top
 * @desc メッセージウィンドウがない場合のウィンドウ位置
 * 初期値: top [top / bottom / (他はデフォルト)]
 
 * @command setEventItemSubCategory
 * @text イベントアイテム設定
 * @desc イベントアイテム設定を行います。
 *
 * @arg name
 * @type string
 * @default ""
 * @text サブカテゴリー名
 * @desc サブカテゴリー名を指定します。
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