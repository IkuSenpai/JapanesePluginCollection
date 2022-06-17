//=============================================================================
// RPGツクールMZ - LL_InfoPopupWIndow.js v1.1.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ポップアップでインフォメッセージを表示します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-infowindow/
 *
 * @help LL_InfoPopupWIndow.js
 *
 * ポップアップでインフォメッセージを表示します。
 * アイテム入手メッセージや、各種イベントメッセージなどに使えます。
 * ウィンドウを表示するにはプラグインコマンドを実行してください。
 *
 * プラグインコマンド:
 *   メッセージを表示: インフォメッセージを表示します。
 *
 * フォントサイズを変更する場合:
 *   \FS["サイズ"] の制御文字を使用してください。 【例】\FS[16]
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
 * 作成日: 2022/3/6
 *
 * @command showMessage
 * @text メッセージを表示
 * @desc ポップアップでインフォメッセージを表示します。
 *
 * @arg messageText
 * @text メッセージ内容
 * @desc 表示するメッセージ内容を入力します。
 * 各種制御文字が使用可能です。複数行表示はできません。
 * @type string
 *
 * @arg showCount
 * @text 表示時間
 * @desc ウィンドウの表示時間です。 (1/60秒)
 * -1と入力するとシーンが切り替わるまで表示し続けます。
 * @default 180
 * @max 999
 * @min -1
 * @type number
 *
 * @arg windowX
 * @text X座標
 * @desc ウィンドウの表示位置(X)です。(autoと入力すると中央表示)
 * 横幅は文字数に合わせて自動調整されます。
 * @default 0
 * @type string
 *
 * @arg windowY
 * @text Y座標
 * @desc ウィンドウの表示位置(Y)です。(autoと入力すると中央表示)
 * @default 60
 * @type string
 *
 * @arg seName
 * @text 効果音
 * @desc ウィンドウを表示した時の効果音です。
 * @dir audio/se
 * @type file
 * @require 1
 *
 * @arg seVolume
 * @text 効果音の音量
 * @desc 効果音の音量(0～100%)です。 (初期値: 90%)
 * @default 90
 * @max 100
 * @min 0
 * @type number
 *
 * @arg sePitch
 * @text 効果音のピッチ
 * @desc 効果音のピッチ(50～150%)です。 (初期値: 100%)
 * @default 100
 * @max 150
 * @min 50
 * @type number
 *
 * @arg sePan
 * @text 効果音の位相
 * @desc 効果音の位相(-100～100)です。 (初期値: 0)
 * @default 0
 * @max 100
 * @min -100
 * @type number
 *
 * @arg windowBackground
 * @text ウィンドウ背景
 * @desc ウィンドウの背景を指定してください。
 * @type select
 * @default 0
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 *
 * @command hideMessage
 * @text メッセージを消去
 * @desc 表示中のインフォメッセージを消去します。
 */

(() => {
    "use strict";
    const pluginName = "LL_InfoPopupWIndow";
    const parameters = PluginManager.parameters(pluginName);

    // インフォメッセージ表示
    PluginManager.registerCommand(pluginName, "showMessage", args => {
        const x = args.windowX === "auto" ? "auto" : Number(args.windowX || 0);
        const y = args.windowY === "auto" ? "auto" : Number(args.windowY || 60);

        exInfoWindowText = String(args.messageText || "");
        exInfoWindowShowCount = Number(args.showCount || 180);
        exInfoWindowPosition = {"x": x, "y": y};
        exInfoWindowSe = {
            "name": String(args.seName || ""),
            "volume": Number(args.seVolume || 90),
            "pitch": Number(args.sePitch || 100),
            "pan": Number(args.sePan || 0)
        };
        exInfoWindowBackground = Number(args.windowBackground || 0);
        exInfoWindowShow = true;
	});

    // インフォメッセージ消去
    PluginManager.registerCommand(pluginName, "hideMessage", args => {
        exInfoWindowHide = true;
	});

    // ウィンドウの表示状態保持用
    let exInfoWindowText = "";
    let exInfoWindowShowCount = 180;
    let exInfoWindowPosition = {};
    let exInfoWindowSe = {};
    let exInfoWindowBackground = 0;
    let exInfoWindowShow = false;
    let exInfoWindowHide = false;

    //-----------------------------------------------------------------------------
    // Scene_Map
    //

    const _Scene_Map_stop = Scene_Map.prototype.stop;
    Scene_Map.prototype.stop = function() {
        this._exInfoWindow.close();
        _Scene_Map_stop.apply(this, arguments);
    };

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        _Scene_Map_terminate.apply(this, arguments);
        if (!SceneManager.isNextScene(Scene_Battle)) {
            this._exInfoWindow.hide();
        }
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.apply(this, arguments);
        this.createExInfoWindow();
    };

    Scene_Map.prototype.createExInfoWindow = function() {
        this._exInfoWindow = new Window_ExInfoWindow();
        this.addWindow(this._exInfoWindow);
    };

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        _Scene_Map_callMenu.apply(this, arguments);
        this._exInfoWindow.hide();
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle
    //

    const _Scene_Battle_stop = Scene_Battle.prototype.stop;
    Scene_Battle.prototype.stop = function() {
        this._exInfoWindow.close();
        _Scene_Battle_stop.apply(this, arguments);
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.apply(this, arguments);
        this._exInfoWindow.hide();
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.apply(this, arguments);
        this.createExInfoWindow();
    };

    Scene_Battle.prototype.createExInfoWindow = function() {
        this._exInfoWindow = new Window_ExInfoWindow();
        this.addWindow(this._exInfoWindow);
    };

    //-----------------------------------------------------------------------------
    // Window_ExInfoWindow
    //
    // インフォメッセージを表示するウィンドウです。

    function Window_ExInfoWindow() {
        this.initialize(...arguments);
    }

    Window_ExInfoWindow.prototype = Object.create(Window_Base.prototype);
    Window_ExInfoWindow.prototype.constructor = Window_ExInfoWindow;

    Window_ExInfoWindow.prototype.initialize = function() {
        Window_Base.prototype.initialize.call(this, new Rectangle());
        this.openness = 0;
        this._showCount = 0;
    };

    Window_ExInfoWindow.prototype.start = function() {
        this._showCount = exInfoWindowShowCount;
        this.playSe();
        this.updatePlacement();
        this.updateBackground();
        this.createContents();
        this.refresh();
    };

    Window_ExInfoWindow.prototype.playSe = function() {
        if (exInfoWindowSe.name) AudioManager.playSe(exInfoWindowSe);
    };

    Window_ExInfoWindow.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        // ウィンドウ表示判定
        if (exInfoWindowShow) {
            this.start();
            exInfoWindowShow = false;
        }
        // ウィンドウ消去判定
        if (exInfoWindowHide) {
            this.close();
            exInfoWindowHide = false;
        }
        if (this._showCount !== 0) {
            this.updateFadeIn();
            if (this._showCount > 0) {
                this._showCount--;
            }
        } else {
            this.updateFadeOut();
        }
    };

    Window_ExInfoWindow.prototype.updateFadeIn = function() {
        this.openness += 32;
    };

    Window_ExInfoWindow.prototype.updateFadeOut = function() {
        this.openness -= 32;
    };

    Window_ExInfoWindow.prototype.close = function() {
        this._showCount = 0;
    };

    Window_ExInfoWindow.prototype.updatePlacement = function() {
        this.width = this.windowWidth();
        this.height = this.windowHeight();

        if (exInfoWindowPosition.x === "auto") {
            this.x = (Graphics.boxWidth - this.windowWidth()) / 2;
        } else {
            this.x = exInfoWindowPosition.x;
        }
        if (exInfoWindowPosition.y === "auto") {
            this.y = (Graphics.boxHeight - this.windowHeight()) / 2;
        } else {
            this.y = exInfoWindowPosition.y;
        }
    };

    Window_ExInfoWindow.prototype.updateBackground = function() {
        this.setBackgroundType(exInfoWindowBackground);
    };

    Window_ExInfoWindow.prototype.windowWidth = function() {
        if (exInfoWindowText) {
            const textWidth = this.textSizeEx(exInfoWindowText).width;
            const padding = this.padding + this.itemPadding();
            const width = Math.ceil(textWidth) + padding * 2;
            return Math.min(width, Graphics.boxWidth);
        } else {
            return 0;
        }
    };

    Window_ExInfoWindow.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_ExInfoWindow.prototype.refresh = function() {
        const rect = this.baseTextRect();
        this.contents.clear();
        this.drawTextEx(exInfoWindowText, rect.x, rect.y, rect.width);
    };
})();
