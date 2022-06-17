//=============================================================================
// RPGツクールMZ / MV - LL_ShutdownAlert.js v1.0.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ MV
 * @plugindesc 閉じるボタンアラート
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-shutdownalert/
 *
 * @help LL_ShutdownAlert.js
 *
 * ウィンドウの×ボタンを押した時にアラートを表示します。
 *
 * プラグインコマンドはありません。
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
 * 作成日: 2022/3/14
 *
 * @param dialogMsg
 * @text メッセージ
 * @desc アラート表示時のメッセージです。
 * @default ゲームを終了しますか？
 * @type string
 */

(function() {
    "use strict";
    var pluginName = "LL_ShutdownAlert";

    var parameters = PluginManager.parameters(pluginName);
    var dialogMsg = String(parameters["dialogMsg"] || "");

    // NW.js環境下でのみ実行
    if (Utils.isNwjs() && !Utils.isOptionValid("btest") && !Utils.isOptionValid("etest")) {
        var gui = require("nw.gui");
        if (typeof gui !== "undefined") {
            var win = gui.Window.get();

            // for MZ ver.1.4.4
            if (Utils.RPGMAKER_NAME === "MZ") {
                win.removeAllListeners("close");
            }

            setTimeout(function() {
                win.on("close", function() {
                    if (confirm(dialogMsg)) {
                        // [Note] When closing the window, the NW.js process sometimes does
                        //   not terminate properly. This code is a workaround for that.
                        if (typeof nw === "object") {
                            nw.App.quit();
                        } else {
                            this.close(true);
                        }
                    }
                });
            }.bind(this), 3000);
        }
    }
})();
