//=============================================================================
// RPG Maker MZ - Name Window Adjustment
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adjust the name window.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_NameAdjustment.js(ver1.0.5)
 *
 * Adjust the name window.
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param nameFontSize
 * @text Name font size
 * @type number
 * @desc Enter the font size of the name. (default:26)
 * @default 26
 *
 * @param nameFontColor
 * @text Name font color
 * @type number
 * @desc Enter the font color of the name. (default: 0) The same as the method for specifying the message font color.
 * @default 0
 *
 * @param nameOutlineColor
 * @text Name outline color
 * @type number
 * @desc Enter the outline color of the name. (default: 15) The same as the method for specifying the font color of the message.
 * @default 15
 *
 * @param heightAdjustment
 * @text Window height adjustment
 * @type number
 * @desc Enter the value to adjust the height of the name window. The plus is wide and the minus is narrow.
 * @default 0
 * @min -800
 *
 * @param namePositionY
 * @text Vertical adjustment of name
 * @type number
 * @desc Enter the value for adjusting the name display position. Plus is below, minus is above.
 * @default 0
 * @min -800
 *
 * @param padding
 * @text Padding
 * @type number
 * @desc Enter the padding of the window in pixels. (Default: 12)
 * @default 12
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 名前ウィンドウを調整します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_NameWindowAdjustment.js(ver1.0.5)
 *
 * 名前ウィンドウを調整します。
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
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
 * @param heightAdjustment
 * @text ウィンドウの高さ調整
 * @type number
 * @desc 名前ウィンドウの高さを調整する値をピクセル数で指定します。プラスで広く、マイナスでせまくします。
 * @default 0
 * @min -400
 *
 * @param namePositionY
 * @text 名前の上下位置
 * @type number
 * @desc ウィンドウ内の名前位置を調整する値をピクセル数で指定します。プラスで下、マイナスで上。
 * @default 0
 * @min -800
 *
 * @param padding
 * @text 内側余白
 * @type number
 * @desc ウィンドウの内側余白をピクセル数で指定します。（初期値：12）
 * @default 12
 *
 */

(() => {
	"use strict";

    const pluginName = "GABA_NameWindowAdjustment";

    const parameters = PluginManager.parameters(pluginName);
    const heightAdjustment = (parseInt(parameters["heightAdjustment"]) || 0);
    const nameFontSize = (parseInt(parameters["nameFontSize"]) || 0);
    const nameFontColor = (parseInt(parameters["nameFontColor"]) || 0);
    const nameOutlineColor = (parseInt(parameters["nameOutlineColor"]) || 15);
    const namePositionY = (parseInt(parameters["namePositionY"]) || 0);
	const namePadding = (parseInt(parameters["padding"]) || 12);

    const _Window_NameBox_windowHeight = Window_NameBox.prototype.windowHeight;
    Window_NameBox.prototype.windowHeight = function() {
        let myHeight = _Window_NameBox_windowHeight.apply(this, arguments);
        myHeight = myHeight + heightAdjustment;
        return myHeight;
    };

    Window_NameBox.prototype.refresh = function() {
        const rect = this.baseTextRect();
        this.contents.clear();
        this.drawTextEx(this._name, rect.x, rect.y + heightAdjustment / 2 + namePositionY, rect.width);
    };

    Window_NameBox.prototype.drawTextEx = function(text, x, y, width) {
        this.resetFontSettings();
        this.contents.fontSize = nameFontSize;
        this.contents.textColor = ColorManager.textColor(nameFontColor);
        this.contents.outlineColor = ColorManager.textColor(nameOutlineColor);
        const textState = this.createTextState(text, x, y, width);
		this.processAllText(textState);

        return textState.outputWidth;
    };

	Window_NameBox.prototype.updatePadding = function() {
		this.padding = namePadding;
	};

    const _Window_Base_baseTextRect = Window_Base.prototype.baseTextRect;
    Window_NameBox.prototype.baseTextRect = function() {
        let myRect = _Window_Base_baseTextRect.apply(this, arguments);
        myRect.height += heightAdjustment;
		return myRect;
    };

    Window_NameBox.prototype.textSizeEx = function(text) {
        this.resetFontSettings();
        this.contents.fontSize = nameFontSize;
        const textState = this.createTextState(text, 0, 0, 0);
        textState.drawing = false;
        this.processAllText(textState);
        return { width: textState.outputWidth, height: textState.outputHeight };
    };

})();
