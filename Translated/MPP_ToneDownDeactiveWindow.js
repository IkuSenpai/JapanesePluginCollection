//=============================================================================
// MPP_ToneDownDeactiveWindow.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Makes the inactive window where the cursor is displayed less noticeable.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 1.0.1]
 * This plugin is for RPG Maker MZ.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param Excluded Window Classes
 * @desc 
 * @type string[]
 * @default ["Window_BattleStatus","Window_NameEdit"]
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc カーソルが表示された非アクティブなウィンドウを目立たなくさせます。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 1.0.1]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param Excluded Window Classes
 * @text 対象外のウィンドウクラス
 * @desc 
 * @type string[]
 * @default ["Window_BattleStatus","Window_NameEdit"]
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_ToneDownDeactiveWindow';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    
    const param_ExcludedWindowClasses = JSON.parse(parameters['Excluded Window Classes'] || '[]');

    //-----------------------------------------------------------------------------
    // Window_Selectable

    const _Window_Selectable_update = Window_Selectable.prototype.update;
    Window_Selectable.prototype.update = function() {
        _Window_Selectable_update.apply(this, arguments);
        this.updateToneDown();
    };

    Window_Selectable.prototype.updateToneDown = function() {
        if (this.isToneDown()) {
            if (this.active || this.index() < 0) {
                if (this._deactiveColorFilter) {
                    this.removeDeactiveColorFilter();
                }
            } else {
                if (!this._deactiveColorFilter) {
                    this.createDeactiveColorFilter();
                    this._deactiveColorFilter.setBlendColor([0, 0, 0, 128]);
                }
            }
        }
    };

    Window_Selectable.prototype.isToneDown = function() {
        return !param_ExcludedWindowClasses.includes(this.constructor.name);
    };

    Window_Selectable.prototype.createDeactiveColorFilter = function() {
        this._deactiveColorFilter = new ColorFilter();
        if (!this.filters) {
            this.filters = [];
        }
        this.filters.push(this._deactiveColorFilter);
    };

    Window_Selectable.prototype.removeDeactiveColorFilter = function() {
        this.filters.remove(this._deactiveColorFilter);
        this._deactiveColorFilter = null;
    };

})();
