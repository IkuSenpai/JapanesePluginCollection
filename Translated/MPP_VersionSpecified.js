//=============================================================================
// MPP_VersionSpecified.js
//=============================================================================
// Copyright (c) 2015 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Specify the version on the title screen.
 * @author Mokusei Penguin
 * @url
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * - Since it only displays a character string, it can be used even
 *   if it is not a version.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Text
 *      @desc 
 *      @default Version 1.0.0
 *
 *  @param Font Size
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 99
 *      @default 20
 *
 *  @param Font Color
 *      @desc RGB
 *      @default 255,255,255
 *
 *  @param Window X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 540
 *
 *  @param Window Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 560
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc タイトル画面にバージョンを明記します。
 * @author 木星ペンギン
 * @url
 *
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * - 文字列を表記するだけなので、バージョンでなくても使えます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Text
 *      @text 文字列
 *      @desc 
 *      @default Version 1.0.0
 *
 *  @param Font Size
 *      @text 文字サイズ
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 99
 *      @default 20
 *
 *  @param Font Color
 *      @text 文字色
 *      @desc RGB
 *      @default 255,255,255
 *
 *  @param Window X
 *      @text 表示位置 X 座標
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 540
 *
 *  @param Window Y
 *      @text 表示位置 Y 座標
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 560
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_VersionSpecified';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_Text = parameters['Text'];
    const param_FontSize = Number(parameters['Font Size'] || 4);
    const param_FontColor = `rgb(${parameters['Font Color'] || '255,255,255'})`;
    const param_WindowX = Number(parameters['Window X']);
    const param_WindowY = Number(parameters['Window Y']);
    
    //-----------------------------------------------------------------------------
    // Window_Version
    
    function Window_Version() {
        this.initialize.apply(this, arguments);
    }

    Window_Version.prototype = Object.create(Window_Base.prototype);
    Window_Version.prototype.constructor = Window_Version;

    Window_Version.prototype.initialize = function() {
        if (Utils.RPGMAKER_NAME === 'MV') {
            Window_Base.prototype.initialize.call(this, 0, 0, 0, 0);
        } else {
            Window_Base.prototype.initialize.call(this, new Rectangle);
        }
        this.opacity = 0;
        this.updatePlacement();
        this.createContents();
        this.refresh();
    };

    Window_Version.prototype.windowWidth = function() {
        const padding = (this.padding + 36) * 2;
        if (this.textSizeEx) {
            return this.textSizeEx(param_Text).width + padding;
        } else {
            return this.drawTextEx(param_Text, 0, param_FontSize + 4) + padding;
        }
    };

    Window_Version.prototype.windowHeight = function() {
        return this.fittingHeight(1);
    };

    Window_Version.prototype.lineHeight = function() {
        return param_FontSize + 4;
    };

    Window_Version.prototype.updatePlacement = function() {
        this.x = param_WindowX;
        this.y = param_WindowY;
        this.width = this.windowWidth();
        this.height = this.windowHeight();
    };
    
    Window_Version.prototype.resetFontSettings = function() {
        Window_Base.prototype.resetFontSettings.call(this);
        this.contents.fontSize = param_FontSize;
        this.contents.textColor = param_FontColor;
    };
    
    Window_Version.prototype.refresh = function() {
        this.contents.clear();
        if (param_Text) {
            const width = this.contentsWidth();
            this.resetFontSettings();
            this.drawBackground(0, 0, width, this.lineHeight());
            this.drawText(param_Text, 0, 0, width, 'center');
        }
    };

    Window_Version.prototype.drawBackground = function(x, y, width, height) {
        const c1 = this.dimColor1 ? this.dimColor1() : ColorManager.dimColor1();
        const c2 = this.dimColor2 ? this.dimColor2() : ColorManager.dimColor2();
        const hw = width / 2;
        this.contents.gradientFillRect(x, y, hw, height, c2, c1);
        this.contents.gradientFillRect(x + hw, y, hw, height, c1, c2);
    };
    
    //-------------------------------------------------------------------------
    // Scene_Title
    
    const _Scene_Title_create = Scene_Title.prototype.create;
    Scene_Title.prototype.create = function() {
        _Scene_Title_create.apply(this, arguments);
        this.createVersionWindow();
    };

    Scene_Title.prototype.createVersionWindow = function() {
        this._versionWindow = new Window_Version();
        this.addWindow(this._versionWindow);
    };
    
})();
