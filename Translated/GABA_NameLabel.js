//=============================================================================
// RPG Maker MZ - Name Label
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Display the name label in the message window.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_NameLabel.js(ver1.0.3)
 *
 * Display the name label in the message window. The name window is hidden.
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param nameFontFace
 * @text Name font
 * @desc Specify the font. If blank, use the main font.
 *
 * @param nameFontSize
 * @text Name font size
 * @type number
 * @desc Enter the font size of the name.(Default:26)
 * @default 26
 *
 * @param nameFontColor
 * @text Name font color
 * @type number
 * @desc Enter the font color of the name. (Default:0) The same as the method for specifying the message font color.
 * @default 0
 *
 * @param nameOutlineColor
 * @text Name outline color
 * @type number
 * @desc Enter the outline color of the name. (Default:15) The same as the method for specifying the message font color.
 * @default 15
 *
 * @param upNamePosition
 * @text Position adjustment (in the upper window)
 * @type struct<Position>
 * @desc The name position of the message window "UP". Let 0 be in the upper left corner of the window.
 * @default {"posX":"16","posY":"128"}
 *
 * @param midNamePosition
 * @text Position adjustment (in the middle window)
 * @type struct<Position>
 * @desc The name position of the message window "Medium". Let 0 be in the upper left corner of the window.
 * @default {"posX":"16","posY":"128"}
 *
 * @param lowNamePosition
 * @text Position adjustment (in the lower window)
 * @type struct<Position>
 * @desc The display position of the message window "bottom". Let 0 be in the upper left corner of the window.
 * @default {"posX":"16","posY":"128"}
 *
 * @param nameDisplayWidth
 * @text Name display width
 * @type number
 * @desc Enter the display width of the name. (Default:144) If it does not fit, the font is reduced.
 * @default 144
 *
 * @param alignment
 * @text Character alignment
 * @type select
 * @desc Character alignment
 * @default center
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 *
 * @param par
 * @text Background setting
 *
 * @param paddingX
 * @parent par
 * @text Padding of background (left and right)
 * @type number
 * @desc Enter the left and right padding of the background in pixels. (Default: 4)
 * @default 4
 *
 * @param paddingY
 * @parent par
 * @text Padding of background (top and bottom)
 * @type number
 * @desc Enter the top and bottom padding of the background in pixels. (Default: 4)
 * @default 4
 *
 * @param baseColor
 * @parent par
 * @text Bace color
 * @type struct<Color>
 * @desc Background base color
 * @default {"red":"240","green":"248","blue":"255", "opacity":"0.8"}
 *
 * @param gradationColor
 * @parent par
 * @text Gradient color
 * @type struct<Color>
 * @desc Background gradient color
 * @default {"red":"0","green":"0","blue":"0", "opacity":"0.5"}
 *
 * @param verticalMode
 * @parent par
 * @text Gradation in the vertical direction
 * @type boolean
 * @desc ON:Vertical OFF:Horizontal
 * @on ON
 * @off OFF
 * @default true
 *
 */

/*:ja
 * @target MZ
 * @plugindesc メッセージウィンドウ内に名前ラベルを表示します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 * @help GABA_NameLabel.js(ver1.0.3)
 *
 * 名前ウィンドウの代わりに名前ラベルを表示します。
 * デフォルト設定は顔グラフィックの上に表示するイメージです。
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param nameFontFace
 * @text 名前のフォント
 * @desc 名前のフォントを指定します。空欄ならメインフォントを使用します。
 *
 * @param nameFontSize
 * @text 名前のフォントサイズ
 * @type number
 * @desc 名前のフォントサイズを指定します。（初期値：26）
 * @default 26
 *
 * @param nameFontColor
 * @text 名前のフォントカラー
 * @type number
 * @desc 名前のフォントカラーを指定します。（初期値：0）メッセージのフォントカラーの指定方法と同じです。
 * @default 0
 *
 * @param nameOutlineColor
 * @text 名前のアウトラインカラー
 * @type number
 * @desc 名前のアウトラインカラーを指定します。（初期値：15）メッセージのフォントカラーの指定方法と同じです。
 * @default 15
 *
 * @param upNamePosition
 * @text 位置調整（上ウィンドウの時）
 * @type struct<Position>
 * @desc メッセージウィンドウ「上」の名前表示位置。ウィンドウの左上を0とします。
 * @default {"posX":"16","posY":"128"}
 *
 * @param midNamePosition
 * @text 位置調整（中ウィンドウの時）
 * @type struct<Position>
 * @desc メッセージウィンドウ「中」の名前表示位置。ウィンドウの左上を0とします。
 * @default {"posX":"16","posY":"128"}
 *
 * @param lowNamePosition
 * @text 位置調整（下ウィンドウの時）
 * @type struct<Position>
 * @desc メッセージウィンドウ「下」の名前表示位置。ウィンドウの左上を0とします。
 * @default {"posX":"16","posY":"128"}
 *
 * @param nameDisplayWidth
 * @text 名前の表示幅
 * @type number
 * @desc 名前の表示幅を指定します。（初期値：144）収まらない場合はフォントが小さくなります。
 * @default 144
 *
 * @param alignment
 * @text 文字寄せ
 * @type select
 * @desc 文字寄せ
 * @default center
 * @option Left
 * @value left
 * @option Center
 * @value center
 * @option Right
 * @value right
 *
 * @param par
 * @text 背景の設定
 *
 * @param paddingX
 * @parent par
 * @text 背景の内側余白（左右）
 * @type number
 * @desc 背景の左右内側余白をピクセル数で指定します。（初期値：4）
 * @default 4
 *
 * @param paddingY
 * @parent par
 * @text 背景の内側余白（上下）
 * @type number
 * @desc 背景の上下内側余白をピクセル数で指定します。（初期値：4）
 * @default 4
 *
 * @param baseColor
 * @parent par
 * @text ベースカラー
 * @type struct<Color>
 * @desc 背景の色
 * @default {"red":"240","green":"248","blue":"255", "opacity":"0.8"}
 *
 * @param gradationColor
 * @parent par
 * @text グラデーションカラー
 * @type struct<Color>
 * @desc 背景のグラデーション用の色
 * @default {"red":"0","green":"0","blue":"0", "opacity":"0.5"}
 *
 * @param verticalMode
 * @parent par
 * @text 縦方向にグラデーションする
 * @type boolean
 * @desc ON:縦にグラデーションします。 OFF:横にグラデーションします。
 * @on ON
 * @off OFF
 * @default true
 *
 */
/*~struct~Color:
 *
 * @param red
 * @type number
 * @max 255
 * @desc Red. Specify from 0 to 255.
 * @default 0
 * @decimals 0
 *
 * @param green
 * @type number
 * @max 255
 * @desc Green. Specify from 0 to 255.
 * @default 0
 * @decimals 0
 *
 * @param blue
 * @type number
 * @max 255
 * @desc Blue. Specify from 0 to 255.
 * @default 0
 * @decimals 0
 *
 * @param opacity
 * @type number
 * @max 1
 * @desc Specify the opacity from 0 to 1. 0 is transparent.
 * @default 1
 * @decimals 1
 *
 */
/*~struct~Position:
*
* @param posX
* @text Horizontal position adjustment
* @type number
* @desc Enter the value to adjust the display position of the name in pixels. (Default:4) Plus is right, minus is left.
* @default 16
* @min -800
*
* @param posY
* @text Vertical position adjustment
* @type number
* @desc Enter the value to adjust the display position of the name in pixels. (Default:132) Plus is down, minus is up.
* @default 128
* @min -800
*
*/
/*~struct~Color:ja
 *
 * @param red
 * @type number
 * @max 255
 * @desc 赤(R)。0～255で指定してください。
 * @default 0
 * @decimals 0
 *
 * @param green
 * @type number
 * @max 255
 * @desc 緑(G)。0～255で指定してください。
 * @default 0
 * @decimals 0
 *
 * @param blue
 * @type number
 * @max 255
 * @desc 青(B)。0～255で指定してください。
 * @default 0
 * @decimals 0
 *
 * @param opacity
 * @type number
 * @max 1
 * @desc 不透明度を0～1で指定してください。0で透明です。
 * @default 1
 * @decimals 1
 *
 */
/*~struct~Position:ja
*
* @param posX
* @text 左右調整
* @type number
* @desc 名前表示位置を調整する値をピクセル数で指定します。（初期値：4）プラスで右、マイナスで左。
* @default 16
* @min -800
*
* @param posY
* @text 上下調整
* @type number
* @desc 名前表示位置を調整する値をピクセル数で指定します。（初期値：116）プラスで下、マイナスで上。
* @default 128
* @min -800
*
*/

(() => {
	"use strict";
    const pluginName = "GABA_NameLabel";

    // パラメータ
    const parameters = PluginManager.parameters(pluginName);
    const nameFontFace = parameters["nameFontFace"].trim() || "";
    const nameFontSize = Number(parameters["nameFontSize"]) || 0;
    const nameFontColor = Number(parameters["nameFontColor"]) || 0;
    const nameOutlineColor = Number(parameters["nameOutlineColor"]) || 15;
    const namePosUp = paramConvertArray(parameters["upNamePosition"]);
    const namePosMid = paramConvertArray(parameters["midNamePosition"]);
    const namePosLow = paramConvertArray(parameters["lowNamePosition"]);
    const namePositionX = Number(parameters["namePositionX"]) || 0;
    const namePositionY = Number(parameters["namePositionY"]) || 0;
	const nameDisplayWidth = Number(parameters["nameDisplayWidth"]) || 400;
	const paddingX = Number(parameters["paddingX"]) || 0;
	const paddingY = Number(parameters["paddingY"]) || 0;
	const isVerticalMode = parameters["verticalMode"]  === "true";
	const nameAlignment = parameters["alignment"] || "center";
	const color1 = paramConvertArray(parameters["baseColor"]);
	const color2 = paramConvertArray(parameters["gradationColor"]);
	const c1 = createColor(color1);
	const c2 = createColor(color2);
    // 名前ラベルはwindowLayerに入れて表示します。
    // ウィンドウにはデフォルトではzIndexが設定されていません。
    // windowLayer内の他の画像との重なり順を変更したい時はこの値を変更してください。
    const ZINDEX = 10;
    // 内部フォント名
    const NAMELABEL_FONTNAME = "gaba-namefont";

	// このプラグインを使う場合、ネームウィンドウを開けなくします。
	Window_Message.prototype.synchronizeNameBox = function() {
		//this._nameBoxWindow.openness = this.openness;
	};

    // フォント読み込みの追加
    // 存在しないフォントファイルを指定していれば落ちます
    const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function() {
        _Scene_Boot_loadGameFonts.apply(this, arguments)
        if (isUseNameLabelFont()) {
            FontManager.load(NAMELABEL_FONTNAME, nameFontFace);
        }
    };

    //--------------------
    // Window_Messageの変更
    //--------------------

    // プロパティ追加
    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.apply(this, arguments);
        this._nameLabelSprite = null;
    };

    // スタート：名前ラベルを初期化
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        this.prepareNameLabel();
        this.setNameLabelVisible(true);
        _Window_Message_startMessage.apply(this, arguments);
    };

    // アップデート：名前ラベルを更新（チェック）
    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        this.updateNameLabel();
        _Window_Message_update.apply(this, arguments);
    }

    // 位置更新：名前ラベルも更新
    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.apply(this, arguments);
        this.setNameLabelPlacement();
    };

    // 終了：名前ラベルも終了
    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        this.setNameLabelVisible(false);
        _Window_Message_terminateMessage.apply(this, arguments);
        this.clearNameLabelSprite();
    };

    //--------------------
    // Window_Messageの関数追加
    //--------------------

    // 名前の取得
    // this._gabaTagNameはGABA_SpeakerNameByTagプラグインにて設定
    Window_Message.prototype.gabaGetName = function() {
        const gabaTagName = this._gabaTagName ? this._gabaTagName : "";
        if (gabaTagName !== "") {
            return gabaTagName;
        } else {
            return $gameMessage.speakerName();
        }
    }

    // 名前ラベルの準備処理
    Window_Message.prototype.prepareNameLabel = function() {
        if (this._nameLabelSprite) {
            this._nameLabelSprite.bitmapClear();
            this._nameLabelSprite.writeBitmap();
        } else {
            // 初回作成
            this._nameLabelSprite = new Sprite_NameLabel(this);
            SceneManager._scene._windowLayer.addChild(this._nameLabelSprite);
            SceneManager._scene._windowLayer.sortChildren();
        }
    }

    // 名前ラベルのアップデート処理
    Window_Message.prototype.updateNameLabel = function() {
        if (this._nameLabelSprite) {
            this.synchronizeNameLabel();
            this._nameLabelSprite.checkName();
        }
    }

    // 名前ラベルのクリア
    Window_Message.prototype.clearNameLabelSprite = function() {
        if (this._nameLabelSprite) {
            this._nameLabelSprite.bitmapClear();
        }
    }

    // 名前ラベルの位置設定
    Window_Message.prototype.setNameLabelPlacement = function() {
        if (!this._nameLabelSprite) {
            return;
        }
        switch (this.positionType()) {
            case 0:
                this._nameLabelSprite.x = this.x + namePosUp.posX;
                this._nameLabelSprite.y = this.y + namePosUp.posY;
                break;
            case 1:
                this._nameLabelSprite.x = this.x + namePosMid.posX;
                this._nameLabelSprite.y = this.y + namePosMid.posY;
                break;
            case 2:
                this._nameLabelSprite.x = this.x + namePosLow.posX;
                this._nameLabelSprite.y = this.y + namePosLow.posY;
                break;
            default:
                break;
        }
    }

    // 少しだけぼわっと表示
    Window_Message.prototype.synchronizeNameLabel = function() {
        this._nameLabelSprite._opacity = this.openness;
    };

    // 名前ラベルの表示・非表示：start/tarminateで実行。これがないと一瞬次の名前が見える。
    Window_Message.prototype.setNameLabelVisible = function(value) {
        if (this._nameLabelSprite) {
            this._nameLabelSprite.visible = value;
        }
    }

    //--------------------
    // ネームスプライト
    // drawFaceの上に直書きせず、スプライト表示する
    //--------------------

    function Sprite_NameLabel() {
        this.initialize(...arguments);
    }

    Sprite_NameLabel.prototype = Object.create(Sprite.prototype);
    Sprite_NameLabel.prototype.constructor = Sprite_NameLabel;

    Sprite_NameLabel.prototype.initialize = function(messageWindow) {
        Sprite.prototype.initialize.call(this);
        this._messageWindow = messageWindow;
        this._zIndex = ZINDEX;
        this.writeBitmap();
    };

    Sprite_NameLabel.prototype.checkWindow = function(window) {
        return this._messageWindow === window;
    };

    Sprite_NameLabel.prototype.update = function() {
        return;
    }

    Sprite_NameLabel.prototype.checkName = function() {
		if (this._messageWindow.gabaGetName() !== this._name) {
            this.writeBitmap();
        }
    }

    Sprite_NameLabel.prototype.bitmapClear = function() {
        this.name = "";
    }

    Sprite_NameLabel.prototype.writeBitmap = function() {
        const name = this._messageWindow.gabaGetName();
        this.bitmap = null;
        const bit = new Bitmap(600,600);
        if (isUseNameLabelFont) {
            bit.fontFace = NAMELABEL_FONTNAME + "," + $gameSystem.mainFontFace();
        } else {
            bit.fontFace = $gameSystem.mainFontFace();
        }
        this.bitmap = bit;
        this.drawNameLabel(name);
		this._name = name;
    };

	Sprite_NameLabel.prototype.drawNameLabel = function(nameText) {
		if (nameText === ""){
			return;
		}

        const bitmap = this.bitmap;

        bitmap.fontSize = nameFontSize;
        bitmap.textColor = ColorManager.textColor(nameFontColor);
        bitmap.outlineColor = ColorManager.textColor(nameOutlineColor);

		bitmap.gradientFillRect(namePositionX,namePositionY, nameDisplayWidth, nameFontSize + paddingY * 2, c1,c2, isVerticalMode);

		const wNameDisplayWidth = nameDisplayWidth - paddingX * 2;
        bitmap.drawText(nameText, namePositionX + paddingX, namePositionY + paddingY, wNameDisplayWidth, nameFontSize, nameAlignment);
    };

    // ポジションタイプ
    Window_Message.prototype.positionType = function() {
        return $gameMessage._positionType;
    }

	// -------------------------
    // その他
    // -------------------------

    function isUseNameLabelFont() {
        return nameFontFace !== "";
    }

	// rgbaのカラー配列を作成
	function createColor(color) {
        return `rgba(${color.red},${color.green},${color.blue},${color.opacity})`;
	}

    // パラメータの型変換
    function paramConvert(param) {
        if (param == null) return param;
        if (param.toString().trim() === "") return param;
        if (param === "true") return true;
        if (param === "false") return false;
        if (isNaN(param)) return param;
        return Number(param);
    }

    // 配列パラメータの型変換
    function paramConvertArray(param) {
        try {
            if (param == null || param === "") {
                return param;
            }

            return JSON.parse(param, (key, value) => {
                if (typeof(value) === "object") {
                    for (let i = 0; i < value.length; i++) {
                        value[i] = paramConvertArray(value[i]);
                    }
                    return value;
                } else {
                    return paramConvert(value);
                }
    		});
        } catch {
            console.log(pluginName + ":リストパラメータエラー");
            return param;
        }
    }
})();
