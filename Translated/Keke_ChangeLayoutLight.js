//=============================================================================
// Keke_ChangeLayoutLight - お手軽レイアウト変更
// バージョン: 1.8.0
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 各種レイアウトを手軽に変更する
 * @author ケケー
 * @url http://kekeelabo.com
 *
 *
 *
 * @help
 * 【ver.1.8.0】
 * 各種レイアウト(コマンドやタッチUIの位置)を手軽に変更する
 * オプションでプレイヤーにレイアウトを変更させることも可能
 * 
 *
 *
 * ◉ 使い方 ◉
 *
 * ■レイアウトを変更する
 * => プラグインパラメータ → ◉レイアウト変更
 *
 * ⚫︎メニューコマンド位置
 * メニューコマンド(アイテムとか)を左に置くか右に置くか
 *
 * ⚫︎バトルコマンド位置
 * バトルコマンド(攻撃とか)を左に置くか右に置くか
 *
 * ⚫︎メニューヘルプ位置
 * メニューヘルプ(アイテムとかの説明)を上に置くか下に置くか
 *
 * ⚫︎タッチUI位置
 * タッチUI(戻るボタンとか)を上に置くか下に置くか
 *
 *
 * ■連動設定
 * => プラグインパラメータ → ◉連動設定
 * レイアウト変更の際の連動関係を調整する
 *
 * ⚫︎装備コマンド連動
 * メニューコマンド位置を左にした時、装備コマンドの位置も左にする(標準は右固定)
 *
 * ⚫︎プロフィール連動
 * メニューヘルプ位置を上にしたとき、ステータス画面のプロフィール欄の位置も上にする(標準は下固定)
 *
 *
 * ■オプションでのレイアウト変更
 * => プラグインパラメータ → ◉オプション
 * オプションからもレイアウトを変更できるようにする
 *
 * ⚫︎項目の表示順を変えたい場合
 * オプションリストの順番を変える
 *
 * ⚫︎項目を消したい場合
 * オプションリストから消す
 *
 * ⚫︎項目名を変えたい場合
 * オプションリストの名前を変える
 * ただし頭の a- や b- の部分は変えないこと
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 *
 *
 * @param ◉レイアウト変更
 *
 * @param メニューコマンド位置
 * @parent ◉レイアウト変更
 * @desc メニューコマンドの位置(左か右か)
 * @type select
 * @option 左
 * @option 右
 * @default 右
 *
 * @param バトルコマンド位置
 * @parent ◉レイアウト変更
 * @desc バトルコマンドの位置(左か右か)
 * @type select
 * @option 左
 * @option 右
 * @default 右
 *
 * @param メニューヘルプ位置
 * @parent ◉レイアウト変更
 * @desc メニューヘルプ(スキルとか説明するの)の位置(上か下か)
 * @type select
 * @option 上
 * @option 下
 * @default 下
 *
 * @param タッチUI位置
 * @parent ◉レイアウト変更
 * @desc タッチUI(戻るとかのボタン)の位置(上か下か)
 * @type select
 * @option 上
 * @option 下
 * @default 上
 *
 * @param ◉連動設定
 *
 * @param 装備コマンド連動
 * @parent ◉連動設定
 * @desc 装備画面のコマンドをメニューコマンド位置に連動させる(デフォは右固定)
 * @type boolean
 * @default true
 *
 * @param プロフィール連動
 * @parent ◉連動設定
 * @desc ステータス画面のプロフィールウインドウをヘルプ位置に連動させる(デフォは下固定)
 * @type boolean
 * @default true
 *
 * @param ◉オプション
 *
 * @param オプションリスト
 * @parent ◉オプション
 * @desc 並び変えると表示順が変わる。リストから消すと表示しなくなる。名前を変えてもいいが、a- の部分は変えないこと
 * @type string[]
 * @default ["a-メニューコマンド位置","b-バトルコマンド位置","c-メニューヘルプ位置","d-タッチUI位置"]
 */
 
 
 
 
 
(() => {
    //- プラグイン名
    const pluginName = "Keke_ChangeLayoutLight";
    
    
    
    
    
    //--  パラメータ受け取り  --//
    
    
    const parameters = PluginManager.parameters(pluginName);
    
    //- レイアウト設定
    const keke_menuCmdPos = parameters["メニューコマンド位置"];
    const keke_battleCmdPos = parameters["バトルコマンド位置"]; 
    const keke_menuHelpPos = parameters["メニューヘルプ位置"];
    const keke_touchUIPos = parameters["タッチUI位置"];
    
    //- 連動設定
    const keke_equipCmdAdapt = eval(parameters["装備コマンド連動"]);
    const keke_profileAdapt = eval(parameters["プロフィール連動"]);
    
    //- オプション
    const keke_optionList = eval(parameters["オプションリスト"]);
     
     
     
     
     
    //--  プラグインデータ  --//
    
    
    //- ゲームシステム
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        // メニューコマンド位置
        this._menuCmdPosKe = keke_menuCmdPos;
        // バトルコマンド位置
        this._battleCmdPosKe = keke_battleCmdPos;
        // メニューヘルプ位置
        this._menuHelpPosKe = keke_menuHelpPos;
        // タッチUI位置
        this._touchUIPosKe = keke_touchUIPos;
    };
    
    
    
    
    
    //--  レイアウト設定  --//
    
    
    //- メニューコマンド位置
    const _Scene_MenuBase_isRightInputMode = Scene_MenuBase.prototype.isRightInputMode;
    Scene_MenuBase.prototype.isRightInputMode = function() {
        let result = _Scene_MenuBase_isRightInputMode.call(this);
        switch ($gameSystem._menuCmdPosKe) {
            case "左":
                result = false;
                break;
            case "右":
                result = true;
        }
        return result;
    };
    
    
    //- バトルコマンド位置
    const _Scene_Battle_isRightInputMode = Scene_Battle.prototype.isRightInputMode;
    Scene_Battle.prototype.isRightInputMode = function() {
        let result = _Scene_Battle_isRightInputMode.call(this);
        switch ($gameSystem._battleCmdPosKe) {
            case "左":
                result = false;
                break;
            case "右":
                result = true;
        }
        return result;
    };
    
    
    //- メニューヘルプ位置
    const _Scene_Base_isBottomHelpMode = Scene_Base.prototype.isBottomHelpMode;
    Scene_Base.prototype.isBottomHelpMode = function() {
        let result = _Scene_Base_isBottomHelpMode.call(this);
        switch ($gameSystem._menuHelpPosKe) {
            case "上":
                result = false;
                break;
            case "下":
                result = true;
        }
        return result;
    };
    
    
    //- タッチUI位置
    const _Scene_Base_isBottomButtonMode = Scene_Base.prototype.isBottomButtonMode;
    Scene_Base.prototype.isBottomButtonMode = function() {
        let result = _Scene_Base_isBottomButtonMode.call(this);
        switch ($gameSystem._touchUIPosKe) {
            case "上":
                result = false;
                break;
            case "下":
                result = true;
        }
        return result;
    };
    
    
    
    
    
    //--  連動設定  --//
    
    
    //- 装備コマンド連動
    const _Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function() {
         _Scene_Equip_createItemWindow.call(this);
         if (keke_equipCmdAdapt && !this.isRightInputMode()) {
             this._commandWindow.x -= this._statusWindow.width;
             this._slotWindow.x -= this._statusWindow.width;
             this._itemWindow.x -= this._statusWindow.width;
             this._statusWindow.x += this._commandWindow.width;
          }
    };
    
    
    //- プロフィール連動
    const _Scene_Status_createStatusEquipWindow = Scene_Status.prototype.createStatusEquipWindow;
    Scene_Status.prototype.createStatusEquipWindow = function() {
        _Scene_Status_createStatusEquipWindow.call(this);
        if (keke_profileAdapt && !this.isBottomHelpMode()) {
            this._profileWindow.y = this.isBottomButtonMode() ? 0 : this.buttonAreaHeight();
            this._statusWindow.y += this._profileWindow.height;
            this._statusParamsWindow.y += this._profileWindow.height;
            this._statusEquipWindow.y += this._profileWindow.height;
        }
    };
    
    
    
    
    
    //--  オプション追加  --//
    
    //- メニューコマンド位置
    Object.defineProperty(ConfigManager, "menuCmdPos", {
        get: function() {
            return $gameSystem._menuCmdPosKe;
        },
        set: function(value) {
            $gameSystem._menuCmdPosKe = value;
        },
        configurable: true
    });
    
    
    //- バトルコマンド位置
    Object.defineProperty(ConfigManager, "battleCmdPos", {
        get: function() {
            return $gameSystem._battleCmdPosKe;
        },
        set: function(value) {
            $gameSystem._battleCmdPosKe = value;
        },
        configurable: true
    });
    
    
    //- メニューヘルプ位置
    Object.defineProperty(ConfigManager, "menuHelpPos", {
        get: function() {
            return $gameSystem._menuHelpPosKe;
        },
        set: function(value) {
            $gameSystem._menuHelpPosKe = value;
        },
        configurable: true
    });
    
    
    //- タッチUI位置
    Object.defineProperty(ConfigManager, "touchUIPos", {
        get: function() {
            return $gameSystem._touchUIPosKe;
        },
        set: function(value) {
            $gameSystem._touchUIPosKe = value;
        },
        configurable: true
    });
    
    
    //- オプションに項目追加
    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.call(this);
        // 追加したフラグ
        let added = false;
        let name = "";
        // 追加項目を展開
        for (let item of keke_optionList) {
            // 項目名設定
            if (item.startsWith("a-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "menuCmdPos");
            }
            if (item.startsWith("b-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "battleCmdPos");
            }
            if (item.startsWith("c-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "menuHelpPos");
            }
            if (item.startsWith("d-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "touchUIPos");
            }
            added = true;
        }
        // 追加したときは
        if (added) {
            // ストリングス追加
            this._posLRStrsKe = ["左", "右"];
            this._posUDStrsKe = ["上", "下"];
        }
        // リサイズ
        this.resizeKe();
    };
    
    
    //- オプションのリサイズ
    Window_Options.prototype.resizeKe = function(){
        // コマンド数取得
        let cmdNum = this._list.length;
        // ハイト変更(画面ハイトは超えない)
        let height = Math.min(Graphics.boxHeight, this.fittingHeight(cmdNum));
        this.height = height;
        // Y位置変更
        this.y = (Graphics.boxHeight - this.height) / 2;
    };
    
    
    //- オプションウインドウのハイト拡大
    const _Scene_Options_optionsWindowRect = Scene_Options.prototype.optionsWindowRect;
    Scene_Options.prototype.optionsWindowRect = function() {
        let result = _Scene_Options_optionsWindowRect.call(this);
        result.height = Graphics.height;
        return result;
    };
    
    
    //- ステータステキスト
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        let result = _Window_Options_statusText.call(this, index);
        // シンボルと値を取得
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        // 位置設定のとき
        if (symbol == "menuCmdPos" || symbol == "battleCmdPos" || symbol == "menuHelpPos" || symbol == "touchUIPos") {
            return this.stringStatusText(value);
        }
        return result;
    };
    
    
    //- 文字列テキストステータス
    Window_Options.prototype.stringStatusText = function(value) {
        return value;
    };
    
    
    //- 決定ボタン時の処理
    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const symbol = this.commandSymbol(this.index());
        // コマンド位置のとき
        if (symbol == "menuCmdPos" || symbol == "battleCmdPos") {
            this.changeStringKe(symbol, this._posLRStrsKe, true, true);
        // UI位置のとき
        } else if (symbol == "menuHelpPos" || symbol == "touchUIPos") {
            this.changeStringKe(symbol, this._posUDStrsKe, true, true);
        // それ以外のとき
        } else {
            _Window_Options_processOk.call(this);
        }
    };
    
    
    //- 右カーソルの処理
    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function() {
        const symbol = this.commandSymbol(this.index());
        // コマンド位置のとき
        if (symbol == "menuCmdPos" || symbol == "battleCmdPos") {
            this.changeStringKe(symbol, this._posLRStrsKe, true, true);
        // UI位置のとき
        } else if (symbol == "menuHelpPos" || symbol == "touchUIPos") {
            this.changeStringKe(symbol, this._posUDStrsKe, true, true);
        // それ以外のとき
        } else {
            _Window_Options_cursorRight.call(this);
        }
    };
    
    
    //- 左カーソルの処理
    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function() {
        const symbol = this.commandSymbol(this.index());
        // コマンド位置のとき
        if (symbol == "menuCmdPos" || symbol == "battleCmdPos") {
            this.changeStringKe(symbol, this._posLRStrsKe, false, true);
        // UI位置のとき
        } else if (symbol == "menuHelpPos" || symbol == "touchUIPos") {
            this.changeStringKe(symbol, this._posUDStrsKe, true, true);
        // それ以外のとき
        } else {
            _Window_Options_cursorLeft.call(this);
        }
    };
    
    
    //- 文字列の変更
    Window_Options.prototype.changeStringKe = function(symbol, strs, forward, wrap) {
        // ストルスがなかったらリターン
        if (!strs) { return; }
        // テキスト取得
        const text = this.getConfigValue(symbol);
        // インデックス取得
        let index = strs.indexOf(text);
        // インデックス最大数取得
        const iMax = strs.length - 1;
        // インデックスがなかったら 0 に
        if (index < 0) { index = 0; }
        // インデックスを変更
        index = index+ (forward ? 1 : -1);
        // ループさせる
        if (wrap) {
            if (index > iMax) { index = 0; }
            if (index < 0) { index = iMax; }
        }
        // 範囲内に収める
        index = index.clamp(0, iMax);
        // 新しい値を取得
        const value = strs[index];
        // セット
        this.setConfigValue(symbol, value);
        this.redrawItem(this.findSymbol(symbol));
        this.playCursorSound();
    };

    
    //- コンフィグデータ保存
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        let config = _ConfigManager_makeData.call(this);
        // ゲーム開始時用
        config._menuCmdPosKe = $gameSystem._menuCmdPosKe;
        config._battleCmdPosKe = $gameSystem._battleCmdPosKe;
        config._menuHelpPosKe = $gameSystem._menuHelpPosKe;
        config._touchUIPosKe = $gameSystem._touchUIPosKe;
        // ニューゲーム用
        this._menuCmdPosKe = $gameSystem._menuCmdPosKe;
        this._battleCmdPosKe = $gameSystem._battleCmdPosKe;
        this._menuHelpPosKe = $gameSystem._menuHelpPosKe;
        this._touchUIPosKe = $gameSystem._touchUIPosKe;
        return config;
    };
    
    
    //- ゲーム開始時に呼び出し
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.call(this, config);
        const items = keke_optionList;
        if (items.filter(item => item.startsWith("a-")).length) {
            this._menuCmdPosKe = config._menuCmdPosKe;
        }
        if (items.filter(item => item.startsWith("b-")).length) {
            this._battleCmdPosKe = config._battleCmdPosKe;
        }
        if (items.filter(item => item.startsWith("c-")).length) {
            this._menuHelpPosKe = config._menuHelpPosKe;
        }
        if (items.filter(item => item.startsWith("d-")).length) {
            this._touchUIPosKe = config._touchUIPosKe;
        }
    };
    
    
    //- ニューゲーム時に呼び出し
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        cm = ConfigManager;
        if (cm._menuCmdPosKe) {
            $gameSystem._menuCmdPosKe = cm._menuCmdPosKe;
        }
        if (cm._battleCmdPosKe) {
            $gameSystem._battleCmdPosKe = cm._battleCmdPosKe;
        }
        if (cm._menuHelpPosKe) {
            $gameSystem._menuHelpPosKe = cm._menuHelpPosKe;
        }
        if (cm._touchUIPosKe) {
            $gameSystem._touchUIPosKe = cm._touchUIPosKe;
        }
    };
    
})();