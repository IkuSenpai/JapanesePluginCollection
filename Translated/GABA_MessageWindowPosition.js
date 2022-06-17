//=============================================================================
// RPG Maker MZ - Message Window Position
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Adjust the position of the message window.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_MessageWindowPosition.js(ver1.0.3)
 *
 * Adjust the position of the message window.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param upX
 * @text Upper window adjustment X
 * @type number
 * @desc Specify the value to adjust the horizontal position of the message window in pixels. Affects when the window position is "up".
 * @default 0
 * @min -999
 *
 * @param upY
 * @text Upper window adjustment Y
 * @type number
 * @desc Specify the value to adjust the vertical position of the message window in pixels. Affects when the window position is "up".
 * @default 0
 * @min -999
 *
 * @param midX
 * @text Middle window adjustment X
 * @type number
 * @desc Specify the value to adjust the horizontal position of the message window in pixels. Affects when the window position is "middle".
 * @default 0
 * @min -999
 *
 * @param midY
 * @text Middle window adjustment Y
 * @type number
 * @desc Specify the value to adjust the vertical position of the message window in pixels. Affects when the window position is "middle".
 * @default 0
 * @min -999
 *
 * @param downX
 * @text Low window adjustment X
 * @type number
 * @desc Specify the value to adjust the horizontal position of the message window in pixels. Affects when the window position is "low".
 * @default 0
 * @min -999
 *
 * @param downY
 * @text Low window adjustment Y
 * @type number
 * @desc Specify the value to adjust the vertical position of the message window in pixels. Affects when the window position is "low".
 * @default 0
 * @min -999
 *
 * @param onlyMapScene
 * @text Limited to the map scene.
 * @type boolean
 * @desc Limit position adjustments to the map scene.
 * @default false
 *
 */

/*:ja
 * @target MZ
 * @plugindesc メッセージウィンドウの位置を調整します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_MessageWindowPosition.js(ver1.0.3)
 *
 * 「文章の表示」のメッセージウィンドウの位置を調整します。
 *
 * プラグインコマンドはありません。
 *
 * プラグインパラメーターで位置を調整してください。
 * ※戦闘開始時のメッセージは「下ウィンドウ」の値が使用されます。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param upX
 * @text 上ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「上」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param upY
 * @text 上ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「上」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param midX
 * @text 中ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「中」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param midY
 * @text 中ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「中」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param downX
 * @text 下ウィンドウ調整X
 * @type number
 * @desc メッセージウィンドウの横位置を調整する値をピクセル数で指定。ウィンドウ位置が「下」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param downY
 * @text 下ウィンドウ調整Y
 * @type number
 * @desc メッセージウィンドウの縦位置を調整する値をピクセル数で指定。ウィンドウ位置が「下」の時に影響します。（初期値：0）
 * @default 0
 * @min -999
 *
 * @param onlyMapScene
 * @text マップシーンに限定する
 * @type boolean
 * @desc 位置調整をマップシーンに限定します。
 * @default false
 *
 */

(() => {
    "use strict";
    const pluginName = "GABA_MessageWindowPosition";

    const parameters = PluginManager.parameters(pluginName);
    const uX = Number(parameters["upX"]) || 0;
    const uY = Number(parameters["upY"]) || 0;
    const mX = Number(parameters["midX"]) || 0;
    const mY = Number(parameters["midY"]) || 0;
    const dX = Number(parameters["downX"]) || 0;
    const dY = Number(parameters["downY"]) || 0;
    const isOnlyMap = parameters["onlyMapScene"] === "true";

    // メッセージウィンドウのポジション
    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.apply(this, arguments);
        this.gabaMWPAdjust(this);
    };

    // パラメータの値を使って調整
    Window_Message.prototype.gabaMWPAdjust = function() {
        if (isOnlyMap) {
            if (SceneManager._scene.constructor != Scene_Map) {
                return;
            }
        }

        this.x = 0;
        switch (this._positionType) {
            case 0:
                this.x += uX;
                this.y += uY;
                break;
            case 1:
                this.x += mX;
                this.y += mY;
                break;
            case 2:
                this.x += dX;
                this.y += dY;
                break;
            default:
                break;
        }
    }
})();
