//=============================================================================
// RPGツクールMZ - LL_VariableWindow.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 変数を画面にウィンドウで表示します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-variablewindow/
 *
 * @help LL_VariableWindow.js
 *
 * 変数を画面にウィンドウで表示します。
 * ウィンドウは同時に4つまで表示することができます。
 *
 * プラグインコマンド:
 *    ウィンドウを表示: 変数をウィンドウで表示します。
 *    ウィンドウを消去: 表示しているウィンドウを消去します。
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
 * 作成日: 2022/5/14
 *
 * @command showWindow
 * @text ウィンドウを表示
 * @desc 変数の値をウィンドウで表示します。
 *
 * @arg windowId
 * @text ウィンドウ番号
 * @desc どのウィンドウ番号に表示するか選択します。
 * 同時に4つまで表示することが可能です。
 * @type select
 * @default 1
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 * @option 4
 * @value 4
 *
 * @arg variableId
 * @text 変数
 * @desc ウィンドウに表示する変数です。
 * @type variable
 *
 * @arg windowX
 * @text X座標
 * @desc ウィンドウの表示位置(X)です。(autoと入力すると中央表示)
 * @default 408
 * @type string
 *
 * @arg windowY
 * @text Y座標
 * @desc ウィンドウの表示位置(Y)です。(autoと入力すると中央表示)
 * @default 60
 * @type string
 *
 * @arg windowWidth
 * @text 横幅
 * @desc ウィンドウの横幅です。
 * @default 400
 * @type number
 *
 * @command hideWindow
 * @text ウィンドウを消去
 * @desc 表示したウィンドウを消去します。
 *
 * @arg windowId
 * @text ウィンドウ番号
 * @desc どのウィンドウ番号を消去するか選択します。
 * @type select
 * @default 1
 * @option 1
 * @value 1
 * @option 2
 * @value 2
 * @option 3
 * @value 3
 * @option 4
 * @value 4
 */

(function() {
    "use strict";
    var pluginName = "LL_VariableWindow";
    var parameters = PluginManager.parameters(pluginName);


    // 変数名の横幅割合
	const variableWindowLabelWidth = 0.6;

    // ウィンドウを表示
    PluginManager.registerCommand(pluginName, "showWindow", args => {
        const windowId = Number(args.windowId || 1);
        const variableId = Number(args.variableId || 0);
        const x = String(args.windowX || 0);
        const y = String(args.windowY || 0);
        const width = Number(args.windowWidth || 400);

        // 旧セーブデータ対策
        if (!$gameSystem._LL_VariableWindow) {
            $gameSystem._LL_VariableWindow = {};
            $gameSystem._LL_VariableWindow[1] = { variableId: null, x: 0, y: 0, width: 0 };
            $gameSystem._LL_VariableWindow[2] = { variableId: null, x: 0, y: 0, width: 0 };
            $gameSystem._LL_VariableWindow[3] = { variableId: null, x: 0, y: 0, width: 0 };
            $gameSystem._LL_VariableWindow[4] = { variableId: null, x: 0, y: 0, width: 0 };
        }

        $gameSystem._LL_VariableWindow[windowId] = { variableId: variableId, x: x, y: y, width: width };
    });

    // ウィンドウを消去
    PluginManager.registerCommand(pluginName, "hideWindow", args => {
        const windowId = Number(args.windowId || 1);

        // 旧セーブデータ対策
        if (!$gameSystem._LL_VariableWindow) {
            $gameSystem._LL_VariableWindow = {};
            $gameSystem._LL_VariableWindow[1] = { variableId: null, x: 0, y: 0, width: 0 };
            $gameSystem._LL_VariableWindow[2] = { variableId: null, x: 0, y: 0, width: 0 };
            $gameSystem._LL_VariableWindow[3] = { variableId: null, x: 0, y: 0, width: 0 };
            $gameSystem._LL_VariableWindow[4] = { variableId: null, x: 0, y: 0, width: 0 };
        }

        $gameSystem._LL_VariableWindow[windowId] = { variableId: null, x: 0, y: 0, width: 0 };
    });


    //-----------------------------------------------------------------------------
	// Game_System
	//
	// 変数ウィンドウ制御用の独自配列を追加定義します。

	const _Game_System_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		_Game_System_initialize.apply(this, arguments);

        this._LL_VariableWindow = {};
        this._LL_VariableWindow[1] = { variableId: null, x: 0, y: 0, width: 0 };
        this._LL_VariableWindow[2] = { variableId: null, x: 0, y: 0, width: 0 };
        this._LL_VariableWindow[3] = { variableId: null, x: 0, y: 0, width: 0 };
        this._LL_VariableWindow[4] = { variableId: null, x: 0, y: 0, width: 0 };
	};


    //-----------------------------------------------------------------------------
    // Scene_Map
    //

    const _Scene_Map_stop = Scene_Map.prototype.stop;
    Scene_Map.prototype.stop = function() {
        this._exVariableWindow1.hide();
        this._exVariableWindow2.hide();
        this._exVariableWindow3.hide();
        this._exVariableWindow4.hide();
        _Scene_Map_stop.apply(this, arguments);
    };

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        _Scene_Map_terminate.apply(this, arguments);
        if (!SceneManager.isNextScene(Scene_Battle)) {
            this._exVariableWindow1.hide();
            this._exVariableWindow2.hide();
            this._exVariableWindow3.hide();
            this._exVariableWindow4.hide();
        }
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _Scene_Map_createAllWindows.apply(this, arguments);
        this.createExVariableWindow();
    };

    Scene_Map.prototype.createExVariableWindow = function() {
        this._exVariableWindow1 = new Window_ExVariableWindow();
        this._exVariableWindow1.setWindowId(1);
        this.addWindow(this._exVariableWindow1);
        this._exVariableWindow2 = new Window_ExVariableWindow();
        this._exVariableWindow2.setWindowId(2);
        this.addWindow(this._exVariableWindow2);
        this._exVariableWindow3 = new Window_ExVariableWindow();
        this._exVariableWindow3.setWindowId(3);
        this.addWindow(this._exVariableWindow3);
        this._exVariableWindow4 = new Window_ExVariableWindow();
        this._exVariableWindow4.setWindowId(4);
        this.addWindow(this._exVariableWindow4);
    };

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        _Scene_Map_callMenu.apply(this, arguments);
        this._exVariableWindow1.hide();
        this._exVariableWindow2.hide();
        this._exVariableWindow3.hide();
        this._exVariableWindow4.hide();
    };

    //-----------------------------------------------------------------------------
    // Window_ExVariableWindow
    //
    // 変数を表示するウィンドウです。

    function Window_ExVariableWindow() {
        this.initialize(...arguments);
    }

    Window_ExVariableWindow.prototype = Object.create(Window_Base.prototype);
    Window_ExVariableWindow.prototype.constructor = Window_ExVariableWindow;

    Window_ExVariableWindow.prototype.initialize = function() {
        const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        Window_Base.prototype.initialize.call(this, rect);

        this.width = 0;
        this.height = 0;
        this._windowId = null;
    };

    Window_ExVariableWindow.prototype.setWindowId = function(id) {
        this._windowId = id;
    };

    Window_ExVariableWindow.prototype.update = function() {
        Window_Base.prototype.update.call(this);

        this.refresh();
    };

    Window_ExVariableWindow.prototype.windowWidth = function() {
        if ($gameSystem._LL_VariableWindow) {
            return $gameSystem._LL_VariableWindow[this._windowId].width;
        }
        return 400;
    };

    Window_ExVariableWindow.prototype.labelWidth = function() {
        return Math.floor(this.windowWidth() * variableWindowLabelWidth);
    };

    Window_ExVariableWindow.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_ExVariableWindow.prototype.getVariableId = function() {
        if ($gameSystem._LL_VariableWindow) {
            return $gameSystem._LL_VariableWindow[this._windowId].variableId;
        }
        return null;
    };

    Window_ExVariableWindow.prototype.getX = function() {
        if ($gameSystem._LL_VariableWindow) {
            return $gameSystem._LL_VariableWindow[this._windowId].x;
        }
        return 0;
    };

    Window_ExVariableWindow.prototype.getY = function() {
        if ($gameSystem._LL_VariableWindow) {
            return $gameSystem._LL_VariableWindow[this._windowId].y;
        }
        return 0;
    };

    Window_ExVariableWindow.prototype.refresh = function() {
        if (this.getVariableId()) {
            this.width = this.windowWidth();
            this.height = this.windowHeight();
            if (this.getX() === "auto") {
                this.x = (Graphics.boxWidth - this.windowWidth()) / 2;
            } else {
                this.x = Number(this.getX() || 0);
            }
            if (this.getY() === "auto") {
                this.y = (Graphics.boxHeight - this.windowHeight()) / 2;
            } else {
                this.y = Number(this.getY() || 0);
            }

            this.contents.clear();
            this.changeTextColor(this.systemColor());
            this.drawText($dataSystem.variables[this.getVariableId()], this.itemPadding(), 0, this.labelWidth());
            this.resetTextColor();
            this.drawText($gameVariables.value(this.getVariableId()), this.labelWidth() + this.itemPadding(), 0, (this.innerWidth - this.labelWidth() - (this.itemPadding() * 2)), "right");
        } else {
            this.width = 0;
            this.height = 0;
        }
    };
})();
