/*:
 * @target MZ
 * @plugindesc バトル状況メッセージの非表示
 * @author GrayOgre
 * @url https://grayogre.info/rmmz/plugin/index.html
 * @help
 *
 * このプラグインは、戦闘時の状況メッセージを表示
 * しないようにします。
 * 
 * プラグインコマンドはありません。
 * 
 * var 1.0.0
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 */
(() => {
    'use strict';

    Window_BattleLog.prototype.callNextMethod = function() {
        if (this._methods.length > 0) {
            const method = this._methods.shift();
            if (method.name === "addText") {
                return;
            }
            if (method.name && this[method.name]) {
                this[method.name].apply(this, method.params);
            } else {
                throw new Error("Method not found: " + method.name);
            }
        }
    };
        
})();