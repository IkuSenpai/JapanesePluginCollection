/*:
 * @target MZ
 * @plugindesc キー入力禁止
 * @author GrayOgre
 * @url https://grayogre.info/rmmz/plugin/index.html
 * @help
 *
 * このプラグインは以下の機能を提供します。
 * + 指定されたスイッチがONの場合、キー入力を禁止し
 *   マウス操作のみとする
 * 
 * プラグインコマンドはありません。
 *
 * var 1.0.0
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param switchId
 *   @text スイッチ番号
 *   @desc 判定に使用するスイッチ番号
 *   @type number
 *   @min 1
 */

(() => {

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    const parameters = PluginManager.parameters(pluginName);

    const switchId = Number(parameters.switchId || 0);

    const _input_update = Input.update;
    Input.update = function() {
        if (switchId > 0 && $gameSwitches && $gameSwitches.value(switchId)) {
            if (this._currentState[this._latestButton]) {
                this._pressedTime++;
            } else {
                this._latestButton = null;
            }
            if (this._virtualButton) {
                this._latestButton = this._virtualButton;
                this._pressedTime = 0;
                this._virtualButton = null;
            }
        } else {
            _input_update.call(this);
        }
    }
    
})();