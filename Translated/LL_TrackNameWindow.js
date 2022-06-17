//=============================================================================
// RPGツクールMZ - LL_TrackNameWindow.js v1.1.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc BGM切替時に曲名を表示します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-trackname-window/
 *
 * @help LL_TrackNameWindow.js
 *
 * BGM切替時に曲名を表示します。
 * アドベンチャーゲームなどでよくある演出を実装できます。
 * なお、戦闘中は曲名ウィンドウは表示されません。
 * プラグインコマンドを使用して、曲名の表示・非表示状態を切替可能です。
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
 * 作成日: 2022/1/10
 *
 * @command setEnabled
 * @text 曲名表示ON・OFF
 * @desc 曲名の表示・非表示を切替します。
 *
 * @arg enabled
 * @text 曲名表示
 * @desc OFFにすると曲名が表示されなくなります。
 * @default true
 * @type boolean
 *
 * @param trackLists
 * @text 曲名リスト
 * @desc 曲名を定義します。曲名リストに含まれないBGMは表示されません。
 * @default []
 * @type struct<trackLists>[]
 *
 * @param twX
 * @text X座標
 * @desc ウィンドウの表示位置(X)です。
 * @default 576
 * @max 9999
 * @min -9999
 * @type number
 *
 * @param twY
 * @text Y座標
 * @desc ウィンドウの表示位置(Y)です。マップ名ウィンドウの位置には表示できないため、50以上推奨です。
 * @default 50
 * @max 9999
 * @min -9999
 * @type number
 *
 * @param twWidth
 * @text 横幅
 * @desc ウィンドウのサイズ(横幅)です。
 * @default 240
 * @type number
 *
 * @param twTransition
 * @text アニメーション
 * @desc ウィンドウが表示されるときのアニメーションを選択してください。
 * @type select
 * @default 3
 * @option フェード
 * @value 1
 * @option フロート左
 * @value 2
 * @option フロート右
 * @value 3
 * @option フロート下
 * @value 4
 * @option フロート上
 * @value 5
 *
 * @param twShowCount
 * @text 表示時間
 * @desc ウィンドウが表示される時間(1/60秒)です。
 * @default 150
 * @type number
 *
 * @param twOriginalBg
 * @text 背景画像ファイル名
 * @desc 背景画像を使用する場合はファイルを選択してください。
 * @dir img/system
 * @type file
 *
 * @param twTextColor
 * @text 文字色
 * @desc 文字色をCSSカラーコードで入力します。
 * @default #ffffff
 * @type string
 *
 * @param twTextBorder
 * @text 文字の縁取り
 * @desc 文字の縁取りを選択してください。
 * @default rgba(0, 0, 0, 0.6)
 * @type select
 * @option 黒 (通常)
 * @value rgba(0, 0, 0, 0.6)
 * @option 白
 * @value rgba(255, 255, 255, 0.6)
 * @option なし
 * @value rgba(0, 0, 0, 0)
 *
 * @param optionCommandName
 * @text オプション名
 * @desc オプションに表示する項目名です。
 * 空白にするとオプションに追加しません。
 * @default 曲名表示
 * @type string
 */

/*~struct~trackLists:
 *
 * @param trackFile
 * @text 音楽ファイル名
 * @desc 曲名を付けるファイルを選択してください。
 * @dir audio/bgm
 * @type file
 *
 * @param trackName
 * @text 曲名
 * @desc 曲名を入力してください。
 * @default
 * @type string
 */

(() => {
    "use strict";
    const pluginName = "LL_TrackNameWindow";

    const parameters = PluginManager.parameters(pluginName);
    const twX = Number(parameters.twX || 576);
    const twY = Number(parameters.twY || 50);
    const twWidth = Number(parameters.twWidth || 240);
    const twHeight = 60;
    const twTransition = Number(parameters.twTransition || 3);
    const twShowCount = Number(parameters.twShowCount || 150);
    const twOriginalBg = String(parameters.twOriginalBg || null);
    const twTextColor = String(parameters.twTextColor || "#ffffff");
    const twTextBorder = String(parameters.twTextBorder || "rgba(0, 0, 0, 255)");
    const optionCommandName = String(parameters["optionCommandName"] || "");
    const trackLists = JSON.parse(parameters.trackLists || []);
    let trackListParams = [];
	trackLists.forEach((elm) => {
		trackListParams.push(JSON.parse(elm));
    });

    PluginManager.registerCommand(pluginName, "setEnabled", args => {
		const enabled = eval(args.enabled || "true");
        $gameSystem._TrackNameWindowDisabled = !enabled;
	});

    // 曲名ウィンドウの表示状態保持用
    let trackInfo = null;
    let trackNameWindowShow = false;

    const _AudioManager_playBgm = AudioManager.playBgm;
    AudioManager.playBgm = function(bgm, pos) {
        if (!this.isCurrentBgm(bgm) && bgm.name && !this._meBuffer) {
            // 表示する曲名を取得
            trackInfo = null;
            trackInfo = trackListParams.find(function(item, index) {
                if (String(item.trackFile) == bgm.name) return true;
            });
            if (trackInfo) {
                if (trackInfo.trackName != "") {
                    trackNameWindowShow = true;
                }
            }
        }
        _AudioManager_playBgm.apply(this, arguments);
    };

    const _Scene_Map_onTransferEnd = Scene_Map.prototype.onTransferEnd;
    Scene_Map.prototype.onTransferEnd = function() {
        this._trackNameWindow.open();
        _Scene_Map_onTransferEnd.apply(this, arguments);
    };

    const _Scene_Map_stop = Scene_Map.prototype.stop;
    Scene_Map.prototype.stop = function() {
        this._trackNameWindow.close();
        _Scene_Map_stop.apply(this, arguments);
    };

    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        _Scene_Map_terminate.apply(this, arguments);
        if (!SceneManager.isNextScene(Scene_Battle)) {
            this._trackNameWindow.hide();
        }
    };

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        this.createTrackNameWindow();
        _Scene_Map_createAllWindows.apply(this, arguments);
    };

    Scene_Map.prototype.createTrackNameWindow = function() {
        const rect = this.trackNameWindowRect();
        this._trackNameWindow = new Window_TrackName(rect);
        this.addWindow(this._trackNameWindow);
    };

    Scene_Map.prototype.trackNameWindowRect = function() {
        return new Rectangle(twX, twY, twWidth, twHeight);
    };

    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        _Scene_Map_callMenu.apply(this, arguments);
        this._trackNameWindow.hide();
    };

    //-----------------------------------------------------------------------------
    // Window_TrackName
    //
    // 曲名を表示するウィンドウです。

    function Window_TrackName() {
        this.initialize(...arguments);
    }

    Window_TrackName.prototype = Object.create(Window_Base.prototype);
    Window_TrackName.prototype.constructor = Window_TrackName;

    Window_TrackName.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.opacity = 0;
        this.contentsOpacity = 0;
        this._showCount = 0;
        // 背景画像
        this.createBackground();
        this.refresh();
    };

    Window_TrackName.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if ($gameParty.inBattle()) {
            this._showCount = 0;
        }
        // 曲名ウィンドウ表示判定
        if (this.shouldDisplay()) {
            this.show();
            this.refresh();
            trackNameWindowShow = false;
        }
        if (this._showCount > 0) {
            this.updateFadeIn();
            this._showCount--;
        } else {
            this.updateFadeOut();
        }
    };

    Window_TrackName.prototype.shouldDisplay = function() {
        if (optionCommandName !== "") {
            return (
                trackNameWindowShow &&
                !$gameSystem._TrackNameWindowDisabled &&
                ConfigManager.showTrackName
            );
        } else {
            return (
                trackNameWindowShow &&
                !$gameSystem._TrackNameWindowDisabled
            );
        }
    };

    Window_TrackName.prototype.updateFadeIn = function() {
        this.contentsOpacity += 16;
        // アニメーション
        if (this.x > twX) this.x -= 2;
        if (this.x < twX) this.x += 2;
        if (this.y > twY) this.y -= 2;
        if (this.y < twY) this.y += 2;
        // 背景画像
        if (this._bgSprite) this._bgSprite.opacity = this.contentsOpacity;
    };

    Window_TrackName.prototype.updateFadeOut = function() {
        this.contentsOpacity -= 16;
        // 背景画像
        if (this._bgSprite) this._bgSprite.opacity = this.contentsOpacity;
    };

    Window_TrackName.prototype.open = function() {
        this.refresh();
        this._showCount = 0;
    };

    Window_TrackName.prototype.close = function() {
        this._showCount = 0;
    };

    Window_TrackName.prototype.show = function() {
        // 曲名ウィンドウを非表示にしている場合、処理を中断
        if ($gameSystem._TrackNameWindowDisabled || SceneManager.isNextScene(Scene_Battle)) return;
        this._showCount = twShowCount;
        // アニメーション
        if (twTransition == 2) this.x -= 32;
        if (twTransition == 3) this.x += 32;
        if (twTransition == 4) this.y += 32;
        if (twTransition == 5) this.y -= 32;
        // 背景画像
        if (this._bgSprite) this._bgSprite.opacity = 0;
    };

    Window_TrackName.prototype.refresh = function() {
        this.contents.clear();
        if (trackInfo) {
            const width = this.innerWidth;
            this.contents.fontSize = 16;
            this.changeTextColor(twTextColor);
            this.changeOutlineColor(twTextBorder);
            // オリジナル背景画像を使用しない場合、トーンを描画
            if (twOriginalBg == "null") {
                if (this._bgSprite) this._bgSprite.opacity = 255;
                this.drawBackground(0, 0, width, 624);
                this.drawText('♪', 2, 0, 24, "left");
            }
            this.drawText(trackInfo.trackName, 24, 0, width - 36, "center");
        }
    };

    Window_TrackName.prototype.drawBackground = function(x, y, width, height) {
        const color1 = ColorManager.dimColor1();
        const color2 = ColorManager.dimColor2();
        const half = width / 2;
        this.contents.gradientFillRect(x, y, half, height, color2, color1);
        this.contents.gradientFillRect(x + half, y, half, height, color1, color2);
    };

    Window_TrackName.prototype.createBackground = function() {
        if (twOriginalBg == "null") return;
        this._bgSprite = new Sprite();
        this._bgSprite.bitmap = ImageManager.loadSystem(twOriginalBg);
        this._bgSprite.bitmap.addLoadListener(function() {
            this._bgSprite.x = twWidth / 2 - this._bgSprite.width / 2;
            this._bgSprite.y = twHeight / 2 - this._bgSprite.height / 2;
        }.bind(this));
        this._bgSprite.opacity = 0;
        this.addChildToBack(this._bgSprite);
    };


    //-----------------------------------------------------------------------------
	// Scene_Options
	//

	const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
	Scene_Options.prototype.maxCommands = function() {
		// Increase this value when adding option items.
		let value = _Scene_Options_maxCommands.call(this);
		return value += optionCommandName !== "" ? 1 : 0;
	};

    //-----------------------------------------------------------------------------
	// Window_Options
	//

	const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
	Window_Options.prototype.addGeneralOptions = function() {
        if (optionCommandName !== "") {
            this.addCommand(optionCommandName, "showTrackName");
        }
		_Window_Options_addGeneralOptions.apply(this, arguments);
	};

    //-----------------------------------------------------------------------------
	// ConfigManager
	//
	ConfigManager.showTrackName = true;

	const _ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		const config = _ConfigManager_makeData.apply(this, arguments);
        config.showTrackName = this.showTrackName;
        return config;
	};

	const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        this.showTrackName = this.readFlag(config, 'showTrackName');
    };
})();
