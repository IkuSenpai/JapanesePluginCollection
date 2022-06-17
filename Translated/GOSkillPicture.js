/*:
 * @target MZ
 * @plugindesc ヘルプピクチャ表示
 * @author GrayOgre
 * @help
 *
 * このプラグインは以下の機能を提供します。
 * + スキル/アイテムの説明にピクチャを表示する。
 * 
 * ピクチャを表示したいスキル/アイテムのメモ欄に
 * <GOPicture:ピクチャ名(拡張子なし)>
 * という記述をしてください。
 * (例)　<GOPicture:Actor1_1>
 * 
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
 * @param pictureDir
 *   @text ピクチャ格納ディレクトリ
 *   @desc 表示するピクチャが格納されているディレクトリ
 *   @type string
 *   @default img/pictures/
*/

(() => {

    const pictureTag = "GOPicture";
    const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
        return arguments[1];
    });

    const parameters = PluginManager.parameters(pluginName);
    const pictureDir = parameters.pictureDir;



    const _window_help_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function(rect) {
        _window_help_initialize.call(this, rect);
        this._imageName = null;
    };

    const _window_help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function(item) {
        if (item) {
            this._imageName = item.meta[pictureTag];
        } else {
            this._imageName = null;
        }
        _window_help_setItem.call(this, item);
    };
    
    const _window_help_refresh = Window_Help.prototype.refresh;
    Window_Help.prototype.refresh = function() {
        if (this._imageName) {
            const bitmap = ImageManager.loadBitmap(pictureDir, this._imageName);
            if (bitmap) {
                const rect = this.baseTextRect();
                this.contents.clear();
                const image_w = rect.height;
                const waiter = setInterval(() => {
                    if (ImageManager.isReady()) {
                        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y, image_w, rect.height);
                        clearInterval(waiter);
                    }
                  }, 100);
                this.drawTextEx(this._text, rect.x + image_w, rect.y, rect.width - image_w);
            }
        } else {
            _window_help_refresh.call(this);
        }
    };

})();