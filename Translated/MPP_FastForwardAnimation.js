//=============================================================================
// MPP_FastForwardAnimation.js
//=============================================================================
// Copyright (c) 2020 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows you to accelerate animations in battle.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 1.1.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Fast Forward Type
 *  〇 long press
 *   - Press and hold the Ok or Shift button, or press and hold the screen to
 *     accelerate.
 *   - The button is the same as accelerating the battle log.
 *   - With this setting, the button will not be displayed on the screen.
 *  〇 toggle
 *   - Press the corresponding button or the button displayed on the screen to
 *     enable / disable acceleration.
 *   - When enabled, battle log acceleration will also be enabled.
 *   - If you want to use the button image, put it in the img / system folder.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Fast Forward Type
 *      @desc 
 *      @type select
 *          @option long press
 *          @option toggle
 *      @default long press
 *
 *  @param Toggle Button
 *      @desc 
 *      @type select
 *          @option shift
 *          @option pageup
 *          @option pagedown
 *      @default shift
 *
 *  @param Button File Name
 *      @desc If it is not set, it will be automatically generated.
 *      @type file
 *          @require 1
 *          @dir img/system/
 *      @default 
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘中のアニメーションを加速出来るようにします。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 1.1.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ 加速タイプ
 *  〇 長押し
 *   - 決定またはシフトボタンの長押し、もしくは画面を長押しタッチで加速します。
 *   - ボタンは戦闘ログの加速と同じです。
 *   - こちらの設定ではボタンは画面に表示されません。
 *  〇 切り替え
 *   - 対応するボタンを押すか、画面に表示されるボタンを押すと加速の有効無効が
 *     切り替わります。
 *   - 有効にすると戦闘ログの加速も有効となります。
 *   - ボタンの画像を使用する場合は、img/system フォルダに入れてください。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Fast Forward Type
 *      @text 加速タイプ
 *      @desc 
 *      @type select
 *          @option 長押し
 *              @value long press
 *          @option 切り替え
 *              @value toggle
 *      @default long press
 *
 *  @param Toggle Button
 *      @text 切り替えボタン
 *      @desc 
 *      @type select
 *          @option shift
 *          @option pageup
 *          @option pagedown
 *      @default shift
 *
 *  @param Button File Name
 *      @text ボタン画像ファイル名
 *      @desc 未設定の場合は自動生成されます。
 *      @type file
 *          @require 1
 *          @dir img/system/
 *      @default 
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_FastForwardAnimation';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_FastForwardType = parameters['Fast Forward Type'];
    const param_ToggleButton = parameters['Toggle Button'];
    const param_ButtonFileName = parameters['Button File Name'];
    
    let battleFastForward = false;

    //-------------------------------------------------------------------------
    // Sprite_Animation

    const _Sprite_Animation_updateEffectGeometry = Sprite_Animation.prototype.updateEffectGeometry;
    Sprite_Animation.prototype.updateEffectGeometry = function() {
        _Sprite_Animation_updateEffectGeometry.apply(this, arguments);
        if (this._handle && this.isFastForward()) {
            this._handle.setSpeed(this._animation.speed / 100 * 2);
        }
    };

    const _Sprite_Animation_updateMain = Sprite_Animation.prototype.updateMain;
    Sprite_Animation.prototype.updateMain = function() {
        _Sprite_Animation_updateMain.apply(this, arguments);
        if (this._playing && this.isFastForward()) {
            _Sprite_Animation_updateMain.apply(this, arguments);
        }
    };

    Sprite_Animation.prototype.isFastForward = function() {
        return $gameParty.inBattle() && battleFastForward;
    };

    //-------------------------------------------------------------------------
    // Sprite_FastForwardButton

    class Sprite_FastForwardButton extends Sprite_Button {
        constructor(bottomY) {
            super();
            this._bottomY = bottomY;
            this._bitmapLoaded = false;
            this.loadButtonImage();
            this.checkBitmap();
        }

        setupFrames() {
            if (this.bitmap) {
                const width = this.bitmap.width;
                const height = this.bitmap.height / 2;
                this.setColdFrame(0, 0, width, height);
                this.setHotFrame(0, height, width, height);
                this.updateFrame();
                this.updateOpacity();
                this.updatePosition();
            }
        }
    
        loadButtonImage() {
            if (param_ButtonFileName) {
                this.bitmap = ImageManager.loadSystem(param_ButtonFileName);
            } else {
                this.bitmap = this.createBitmap();
            }
        }
    
        createBitmap() {
            const bitmap = new Bitmap(96, 96);
            bitmap.paintOpacity = 160;
            this.drawBack(bitmap, 0,0,96,48, 'rgb(52,52,52)','rgb(0,0,0)');
            bitmap.paintOpacity = 204;
            this.drawTriangle(bitmap, 38, 24);
            this.resetFontSettings(bitmap);
            bitmap.paintOpacity = 245;
            this.drawBack(bitmap, 0,48,96,48, 'rgb(66,156,149)','rgb(14,104,96)');
            bitmap.paintOpacity = 255;
            this.drawTriangle(bitmap, 28, 72);
            this.drawTriangle(bitmap, 48, 72);
            return bitmap;
        }
    
        drawBack(bitmap, x, y, width, height, color1, color2) {
            const context = bitmap.context;
            context.save();

            context.beginPath();
            context.moveTo(x + 8, y);
            context.arcTo(x + width, y, x + width, y + height, 8);
            context.arcTo(x + width, y + height, x, y + height, 8);
            context.arcTo(x, y + height, x, y, 8);
            context.arcTo(x, y, x + width, y, 8);
            context.closePath();

            const gradient = context.createLinearGradient(x, y, x, y + height);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            context.fillStyle = gradient;
            context.fill();

            context.restore();
        }
    
        drawTriangle(bitmap, x, y) {
            const height = 24;
            const context = bitmap.context;
            context.save();

            context.beginPath();
            context.moveTo(x, y - height / 2);
            context.lineTo(x, y + height / 2);
            context.lineTo(x + 20, y);
            context.closePath();
            context.fillStyle = 'white';
            context.fill();

            context.restore();
        }
    
        resetFontSettings(bitmap) {
            bitmap.fontFace = $gameSystem.mainFontFace();
            bitmap.fontSize = 16;
            bitmap.textColor = ColorManager.normalColor();
            bitmap.outlineColor = ColorManager.outlineColor();
        }
    
        drawText(bitmap, text, y) {
            const width = bitmap.width;
            const height = 20;
            bitmap.drawText(text, 0, y, width, height, 'center');
        }
    
        checkBitmap() {
            if (!this._bitmapLoaded && this.bitmap.isReady()) {
                this._bitmapLoaded = true;
                this.setupFrames();
            }
        }
    
        isPressed() {
            return battleFastForward;
        }
    
        isClickEnabled() {
            return this.visible;
        }
    
        updatePosition() {
            this.x = Graphics.boxWidth - this.width - 4;
            this.y = this._bottomY - this.height - 4;
        }
    
        onClick() {
            battleFastForward = !battleFastForward;
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_BattleLog

    const _Window_BattleLog_isFastForward = Window_BattleLog.prototype.isFastForward;
    Window_BattleLog.prototype.isFastForward = function() {
        return (
            _Window_BattleLog_isFastForward.apply(this, arguments) ||
            battleFastForward
        );
    };

    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_createButtons = Scene_Battle.prototype.createButtons;
    Scene_Battle.prototype.createButtons = function() {
        _Scene_Battle_createButtons.apply(this, arguments);
        battleFastForward = false;
        if (param_FastForwardType === 'toggle') {
            this.createFastForwardButton();
        }
    };

    Scene_Battle.prototype.createFastForwardButton = function() {
        this._fastForwardButton = new Sprite_FastForwardButton(this.buttonY());
        this.addWindow(this._fastForwardButton);
    };
    
    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.apply(this, arguments);
        this.updateFastForward();
    };

    Scene_Battle.prototype.updateFastForward = function() {
        if (this._fastForwardButton) {
            if (
                this._fastForwardButton.visible &&
                Input.isTriggered(param_ToggleButton)
            ) {
                battleFastForward = !battleFastForward;
            }
        } else {
            battleFastForward = this.isFastForward();
        }
    };
    
    Scene_Battle.prototype.isFastForward = function() {
        return (
            Input.isLongPressed('ok') ||
            Input.isPressed('shift') ||
            TouchInput.isLongPressed()
        );
    };
    
    const _Scene_Battle_updateVisibility = Scene_Battle.prototype.updateVisibility;
    Scene_Battle.prototype.updateVisibility = function() {
        _Scene_Battle_updateVisibility.apply(this, arguments);
        this.updateFastForwardVisibility();
    };

    Scene_Battle.prototype.updateFastForwardVisibility = function() {
        if (this._fastForwardButton) {
            this._fastForwardButton.visible = (
                !this._helpWindow.visible &&
                this._messageWindow.isClosed() &&
                BattleManager._phase !== ''
            );
        }
    };

})();
