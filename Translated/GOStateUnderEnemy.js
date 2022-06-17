/*:
 * @target MZ
 * @plugindesc 敵ステータスアイコンの足元表示
 * @author GrayOgre
 * @help
 *
 * このプラグインは以下の機能を提供します。
 *  + 敵キャラのステータスアイコンの上下位置を調整する機能。
 *  + 敵キャラのステータスアイコンを指定数だけ横に並べる機能。
 * 
 * プラグインコマンドはありません。
 *
 * var 1.1.0
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 * @param showUnderEnemy
 *   @text 敵ステート下表示
 *   @desc 敵のステートアイコンを下に表示する場合：true
 *   @type boolean
 *   @default true
 * @param offsetY
 *   @text Y方向表示位置オフセット
 *   @desc 上下方向の位置を数値分下にずらす。
 *   @type number
 *   @default 0
 * @param lineMax
 *   @text ステートアイコン最大列数
 *   @desc ステートアイコンを並べる数の最大。
 *   @type number
 *   @default 1
 *   @min 1
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
        return arguments[1];
    });
    const parameters = PluginManager.parameters(pluginName);
    
    const showUnder = (parameters.showUnderEnemy === 'true');
    const offset = parseInt(parameters.offsetY);
    const lineMax = parseInt(parameters.lineMax);
    const stateIconSpritesStartX = [];

    const _spriteEnemyCreateStateSprite = Sprite_Enemy.prototype.createStateIconSprite;
    Sprite_Enemy.prototype.createStateIconSprite = function() {
        this._stateIconSprites = [];
        for (let i = 0; i < lineMax; i++) {
            _spriteEnemyCreateStateSprite.call(this);
            this._stateIconSprite._lineId = i;
            this._stateIconSprites.push(this._stateIconSprite);
            stateIconSpritesStartX.push(-Math.round(ImageManager.iconWidth * 0.5 * i));
        }
    };

    const _spriteEnemyUpdateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
    Sprite_Enemy.prototype.updateStateSprite = function() {
        for (let i = 0; i < this._stateIconSprites.length; i++) {
            const iconSprite = this._stateIconSprites[i];
            this._stateIconSprite = iconSprite;
            if (showUnder) {
                this._stateIconSprite.y = Math.round(-this._stateIconSprite.height + 15) + offset;
            } else {
                _spriteEnemyUpdateStateSprite.call(this) + offset;
            }
        }
    };

    const _spriteEnemysetBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function(battler) {
        Sprite_Battler.prototype.setBattler.call(this, battler);
        this._enemy = battler;
        this.setHome(battler.screenX(), battler.screenY());
        this._stateIconSprites.map(icon => { return icon.setup(battler);});
    };

    const _spriteStateIconUpdateIcon = Sprite_StateIcon.prototype.updateIcon;
    Sprite_StateIcon.prototype.updateIcon = function() {
        let icons = [];
        if (this.shouldDisplay()) {
            icons.push(...this._battler.allIcons());
        }
        if (this._battler.isEnemy()) {
            const iconNum = (icons.length > lineMax) ? lineMax : icons.length;
            const lineId = this._lineId;
            icons = icons.filter((v, i) => ((i % lineMax) === lineId));
            this.x = stateIconSpritesStartX[iconNum - 1] + (lineId * ImageManager.iconWidth);
        }
        if (icons.length > 0) {
            this._animationIndex++;
            if (this._animationIndex >= icons.length) {
                this._animationIndex = 0;
            }
            this._iconIndex = icons[this._animationIndex];
        } else {
            this._animationIndex = 0;
            this._iconIndex = 0;
        }
    };
})();
