//=============================================================================
// RPG Maker MZ - Event Display Name
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Show name above the event.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_EventDisplayName.js(ver1.1.1)
 *
 * Show name above the event.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param nameFontSize
 * @text Name font size
 * @type number
 * @desc Enter the font size of the name.(Default:16)
 * @default 16
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
 * @desc Enter the outline color of the name. (Default:19) The same as the method for specifying the message font color.
 * @default 19
 *
 * @param nameDisplayWidth
 * @text Max name display width
 * @type number
 * @desc Enter the display width of the name. (Default:80) If it does not fit, the font is reduced.
 * @default 80
 *
 * @param nameDisplayWidthFix
 * @text Fix display width
 * @type boolean
 * @desc Specify whether to fix the display width. When ON, even if the name is short, it is displayed in the maximum display width.
 * @default false
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
 * @default {"red":"0","green":"0","blue":"255", "opacity":"0.8"}
 *
 * @param gradationColor
 * @parent par
 * @text Gradient color
 * @type struct<Color>
 * @desc Background gradient color
 * @default {"red":"0","green":"0","blue":"0", "opacity":"0.8"}
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
 * @plugindesc イベントの上部にテキストを表示します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_EventDisplayName.js(ver1.1.1)
 *
 * イベントの上部に任意のテキストを表示します。
 * イベントのメモ欄に<dn:なまえ>と入力してください。
 *
 * イベントの画像が（なし）だと表示されません。
 * 移動イベントなど画像不要で名前を表示したい場合は、
 * 透明な画像を選択してください。
 *
 * メッセージの制御文字を使用できます。
 *
 * 表示名はマップを読み込んだ時に更新されます。
 * 見えている表示名を変更したい場合、マップを読み込み直してください。
 *
 * フォントを小さくする制御文字は、ツクールの仕様で
 * その時点のフォントサイズが24以上の時のみ適用されます。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param nameFontSize
 * @text フォントサイズ
 * @type number
 * @desc フォントサイズを指定します。（初期値：16）
 * @default 16
 *
 * @param nameFontColor
 * @text フォントカラー
 * @type number
 * @desc フォントカラーを指定します。（初期値：0）メッセージのフォントカラーの指定方法と同じです。
 * @default 0
 *
 * @param nameOutlineColor
 * @text アウトラインカラー
 * @type number
 * @desc アウトラインカラーを指定します。（初期値：19）メッセージのフォントカラーの指定方法と同じです。
 * @default 19
 *
 * @param nameDisplayWidth
 * @text 最大表示幅
 * @type number
 * @desc 最大表示幅を指定します。（初期値：80）収まらない場合はフォントが小さくなります。
 * @default 80
 *
 * @param nameDisplayWidthFix
 * @text 表示幅を固定する
 * @type boolean
 * @desc 表示幅を固定するか指定します。ONだと名前が短くても、最大表示幅で表示します。
 * @default false
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
 * @default {"red":"0","green":"0","blue":"255", "opacity":"0.8"}
 *
 * @param gradationColor
 * @parent par
 * @text グラデーションカラー
 * @type struct<Color>
 * @desc 背景のグラデーション用の色
 * @default {"red":"255","green":"255","blue":"255", "opacity":"0.8"}
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

(() => {
	"use strict";
	const pluginName = "GABA_EventDisplayName";

	const parameters = PluginManager.parameters(pluginName);
	const nameFontSize = Number(parameters["nameFontSize"]) || 0;
    const nameIconSize = nameFontSize + 4;
	const nameFontColor = Number(parameters["nameFontColor"]) || 0;
	const nameOutlineColor = Number(parameters["nameOutlineColor"]) || 15;
	const nameDisplayWidth = Number(parameters["nameDisplayWidth"]) || 80;
	const nameDisplayWidthFix = parameters["nameDisplayWidthFix"]  === "true";
	const paddingX = Number(parameters["paddingX"]) || 0;
	const paddingY = Number(parameters["paddingY"]) || 0;
	const isVerticalMode = parameters["verticalMode"]  === "true";
	const color1 = paramConvertArray(parameters["baseColor"]);
	const color2 = paramConvertArray(parameters["gradationColor"]);
    const c1 = createColor(color1);
	const c2 = createColor(color2);

	function createEventDisplayNameBitmap (dispName) {

        // 制御文字を処理した結果の横幅と最大文字サイズを知りたいので、一回draw処理を走らせる。
		const tempWindow1 = new Window_Base(new Rectangle());
		tempWindow1.padding = 0;
		tempWindow1.move(0, 0, nameDisplayWidth + paddingX * 2, nameFontSize + paddingY * 2);
		tempWindow1.createContents();
		tempWindow1.contents.fontSize = nameFontSize;

        const wText = tempWindow1.convertEscapeCharacters(dispName);
        let textState = tempWindow1.createTextState(wText, 0, 0, 0);
        tempWindow1.GABA_DN_ProcessAllText (textState);
        let outputWidth = textState.outputWidth;
        const outputHeight = textState.outputHeight;

		// 表示幅固定の調整
		let startX = 0;
		if (nameDisplayWidthFix) {
			if (outputWidth < nameDisplayWidth) {
				startX = (nameDisplayWidth - outputWidth) / 2;
				outputWidth = nameDisplayWidth;
			}
		}

        // ここから表示用のdraw処理
		const tempWindow2 = new Window_Base(new Rectangle());
		tempWindow2.padding = 0;
		tempWindow2.move(0, 0, outputWidth + paddingX * 2, maxFontSize + paddingY * 2);
		tempWindow2.createContents();
		tempWindow2.contents.textColor = ColorManager.textColor(nameFontColor);
		tempWindow2.contents.outlineColor = ColorManager.textColor(nameOutlineColor);
		tempWindow2.contents.fontSize = nameFontSize;
		tempWindow2.contents.gradientFillRect(0,0, outputWidth + paddingX * 2, maxFontSize + paddingY * 2, c1, c2, isVerticalMode);

        // 最大文字サイズに合わせて縦位置を調整
        let adjustY = paddingY;
        if (nameFontSize < maxFontSize){
            adjustY += (maxFontSize - nameFontSize) / 2;
        }

		// 文字列打ち出し
        textState = tempWindow2.createTextState(wText, paddingX, adjustY, 0);
		textState.x = startX + paddingX;
        tempWindow2.GABA_DN_ProcessAllText (textState);

        // 表示幅に縮小してからbitmap取得
		if (outputWidth > nameDisplayWidth) {
			tempWindow2.contents._baseTexture.width = nameDisplayWidth;
		}
        const bitmap = tempWindow2.contents;

		bitmap.gaba_isEventDisplayName = true;
		tempWindow1.contents = null;
		tempWindow1.destroy();
        tempWindow2.contents = null;
		tempWindow2.destroy();

		return bitmap;
	};

	// Sprite_EventDisplayNameの定義
	// Sprite_Balloonをベースにします
	function Sprite_EventDisplayName() {
		this.initialize(...arguments);
	}

	Sprite_EventDisplayName.prototype = Object.create(Sprite_Balloon.prototype);
	Sprite_EventDisplayName.prototype.constructor = Sprite_EventDisplayName;

	Sprite_EventDisplayName.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		this.initMembers();
	};

	Sprite_EventDisplayName.prototype.initMembers = function() {
		this._target = null;
		this._balloonId = 0;
		this._duration = 0;
		this.anchor.x = 0.5;
		this.anchor.y = 1;
		this.z = 9;
	};

	Sprite_EventDisplayName.prototype.setup = function(targetSprite, balloonId) {
		this._target = targetSprite;
		this._balloonId = balloonId;
		this._duration = 1;
	};

	Sprite_EventDisplayName.prototype.update = function() {
		Sprite.prototype.update.call(this);
		if (this._duration > 0) {
			this.updateDisplay();
			this.updatePosition();
		}
	};

	Sprite_EventDisplayName.prototype.updatePosition = function() {
		this.x = this._target.x;
		this.y = this._target.y - this._target.height;
	};

	Sprite_EventDisplayName.prototype.updateDisplay = function() {
		if (this._target._character._characterName === "") {
			this.bitmap.clear();
			return;
		}

		if (this.characterName === this._target._character._characterName) {
			return;
		} else {
			this.characterName = this._target._character._characterName
		}

		const dispName = this._target._character.event().meta.dn;
		this.bitmap = createEventDisplayNameBitmap(dispName);
	};

	// Spriteset_Map
	const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
	Spriteset_Map.prototype.initialize = function() {
		_Spriteset_Map_initialize.apply(this, arguments);
		this._eventDisplayNameSprites = [];
		this.processEventDisplayNameRequests();
	};

	const _Spriteset_Map_destroy = Spriteset_Map.prototype.destroy;
	Spriteset_Map.prototype.destroy = function(options) {
		this.removeAllEventDisplayName();
		_Spriteset_Map_destroy.apply(this, arguments);
	};

	Spriteset_Map.prototype.processEventDisplayNameRequests = function() {
		for (let ev of $gameMap._events){
			if (ev != null){
				if (ev.event().meta.dn != null){
					this.createEventDisplayName(ev);
				}
			}
		}
	};

	Spriteset_Map.prototype.createEventDisplayName = function(request) {
		const targetSprite = this.findTargetSprite(request);
		if (targetSprite) {
			const dispName = request.event().meta.dn;

			let eventDisplayNameSprite = new Sprite_EventDisplayName();
			eventDisplayNameSprite.bitmap = createEventDisplayNameBitmap(dispName);
			eventDisplayNameSprite.targetObject = request;

			eventDisplayNameSprite.setup(targetSprite, 0);
			eventDisplayNameSprite.characterName = request._characterName;
			this._effectsContainer.addChild(eventDisplayNameSprite);
			this._eventDisplayNameSprites.push(eventDisplayNameSprite);
		}
	};

	Spriteset_Map.prototype.removeAllEventDisplayName = function() {
		for (const sprite of this._eventDisplayNameSprites) {
			this.removeEventDisplayName(sprite);
		}
	};

	Spriteset_Map.prototype.removeEventDisplayName = function(sprite) {
		this._eventDisplayNameSprites.remove(sprite);
		this._effectsContainer.removeChild(sprite);
		sprite.destroy();
	};

    // ---------------------------------------------------
    // 制御文字に対応するためdraw関連関数をコピペで追加。普通のメッセージからは呼び出されない
    // アイコンはパラメーターのfontSizeに合うように微妙にサイズ調整。
    Window_Base.prototype.GABA_DN_ProcessAllText = function(textState) {
        while (textState.index < textState.text.length) {
            this.GABA_DN_ProcessCharacter(textState);
        }
        this.GABA_DN_FlushTextState(textState);
    };

    Window_Base.prototype.GABA_DN_ProcessCharacter = function(textState) {
        const c = textState.text[textState.index++];
        if (c.charCodeAt(0) < 0x20) {
            this.GABA_DN_FlushTextState(textState);
            this.GABA_DN_ProcessControlCharacter(textState, c);
        } else {
            textState.buffer += c;
        }
    };

    Window_Base.prototype.GABA_DN_FlushTextState = function(textState) {
        const text = textState.buffer;
        const rtl = textState.rtl;
        const width = this.textWidth(text);
        const height =  nameFontSize;
        const x = rtl ? textState.x - width : textState.x;
        const y = textState.y;
        if (textState.drawing) {
            this.contents.drawText(text, x, y, width, nameFontSize, "center");
        }
        textState.x += rtl ? -width : width;
        textState.buffer = this.createTextBuffer(rtl);
        const outputWidth = Math.abs(textState.x - textState.startX);
        if (textState.outputWidth < outputWidth) {
            textState.outputWidth = outputWidth;
        }
        textState.outputHeight = y - textState.startY + height;
    };


    Window_Base.prototype.GABA_DN_ProcessControlCharacter = function(textState, c) {
        if (c === "\n") {
            this.processNewLine(textState);
        }
        if (c === "\x1b") {
            const code = this.obtainEscapeCode(textState);
            this.GABA_DN_ProcessEscapeCharacter(code, textState);
        }
    };

    let maxFontSize = nameFontSize;
    Window_Base.prototype.GABA_DN_ProcessEscapeCharacter = function(code, textState) {
        switch (code) {
            case "C":
                this.processColorChange(this.obtainEscapeParam(textState));
                break;
            case "I":
                this.GABA_DN_ProcessDrawIcon(this.obtainEscapeParam(textState), textState);
                break;
            case "PX":
                textState.x = this.obtainEscapeParam(textState);
                break;
            case "PY":
                textState.y = this.obtainEscapeParam(textState);
                break;
            case "FS":
                this.contents.fontSize = this.obtainEscapeParam(textState);
                if (maxFontSize < this.contents.fontSize) {
                    maxFontSize = this.contents.fontSize;
                }
                break;
            case "{":
                this.makeFontBigger();
                if (maxFontSize < this.contents.fontSize) {
                    maxFontSize = this.contents.fontSize;
                }
                break;
            case "}":
                this.makeFontSmaller();
                break;
        }
    };

    Window_Base.prototype.GABA_DN_ProcessDrawIcon = function(iconIndex, textState) {
        if (textState.drawing) {
            this.GABA_DN_DrawIcon(iconIndex, textState.x + 2, textState.y + 2);
        }
        textState.x += nameIconSize + 4;
    };

    Window_Base.prototype.GABA_DN_DrawIcon = function(iconIndex, x, y) {
        const bitmap = ImageManager.loadSystem("IconSet");
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        this.contents.GABA_DN_Blt(bitmap, sx, sy, pw, ph, x, y);
    };

    Bitmap.prototype.GABA_DN_Blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
        dw = dw || sw;
        dh = dh || sh;
        try {
            const image = source._canvas || source._image;
            this.context.globalCompositeOperation = "source-over";
            this.context.drawImage(image, sx, sy, sw, sh, dx, dy-4, nameIconSize, nameIconSize);
            this._baseTexture.update();
        } catch (e) {
            //
        }
    };

	// -------------------------
    // その他
    // -------------------------

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

            return JSON.parse(param, (_, value) => {
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
