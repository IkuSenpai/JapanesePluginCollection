//=============================================================================
// MPP_StatePopup.js
//=============================================================================
// Copyright (c) 2019 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc 【ver.1.1】ダメージをポップアップする際、頭上に解除or付加されたステートを表示します。
 * @author 木星ペンギン
 *
 * @help ●【アクティブタイムバトル　ATステート(MPP_ActiveTimeBattle_OP1.js)】と
 * 　併用する場合、こちらのプラグインが下になるように導入してください。
 * 
 * ●ツクール側の仕様対策で、モバイル端末では若干エフェクトが変化します。
 * 
 * ================================
 * 制作 : 木星ペンギン
 * URL : http://woodpenguin.blog.fc2.com/
 * 
 * @param Popup Time
 * @type number
 * @desc エフェクトを除くポップアップの時間
 * @default 30
 *
 * @param Popup Delay
 * @type number
 * @desc 複数のステートを表示する際の表示間隔
 * @default 30
 *
 * @param Popup Actor?
 * @type boolean
 * @desc アクターのステート表示を行うかどうか？
 * @default true
 *
 * @param Popup Enemy?
 * @type boolean
 * @desc エネミーのステート表示を行うかどうか？
 * @default false
 * 
 */

(function() {
    
var parameters = PluginManager.parameters('MPP_StatePopup');
var MPPlugin = {
    ATBOP1_Plugin:$plugins.some(function(plugin) {
        return (plugin.name === 'MPP_ATB_OP1' && plugin.status);
    }),
    
    popupTime:Math.max(Number(parameters['Popup Time'] || 30), 1),
    popupDelay:Math.max(Number(parameters['Popup Delay'] || 30), 1),
    popupActor:eval(parameters['Popup Actor?']) === true,
    popupEnemy:eval(parameters['Popup Enemy?']) === true
};

var Alias = {};

//-----------------------------------------------------------------------------
// Sprite_Battler

//19
Alias.SpBa_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Alias.SpBa_initMembers.call(this);
    this._states = [];
};

//99
Alias.SpBa_updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
Sprite_Battler.prototype.updateDamagePopup = function() {
    Alias.SpBa_updateDamagePopup.call(this);
    if (this._states.length > 0) {
        if (!this._states[0].isPlaying()) {
            this.parent.removeChild(this._states[0]);
            this._states.shift();
        }
    }
};

//141
Alias.SpBa_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
Sprite_Battler.prototype.setupDamagePopup = function() {
    if (this.isPopupState()) {
        if (this._battler.isDamagePopupRequested()) {
            this.setupStatePopup(this._battler.result());
        }
        if (MPPlugin.ATBOP1_Plugin && this._battler._atbDamagePopup) {
            this.setupStatePopup(this._battler._atbResult);
        }
    }
    Alias.SpBa_setupDamagePopup.call(this);
};

Sprite_Battler.prototype.setupStatePopup = function(result) {
    var delay = 8;
    var nextDelay = MPPlugin.popupDelay;
    var addedStates = result.addedStateObjects();
    for (var i = 0; i < addedStates.length; i++) {
        var iconIndex = addedStates[i].iconIndex;
        this.startStatePopup(iconIndex, 0, delay);
        delay += nextDelay;
    }
    for (var i = 0; i < 8; i++) {
        if (result.isBuffAdded(i)) {
            var iconIndex = this._battler.buffIconIndex(1, i);
            this.startStatePopup(iconIndex, 0, delay);
            delay += nextDelay;
        }
    }
    for (var i = 0; i < 8; i++) {
        if (result.isDebuffAdded(i)) {
            var iconIndex = this._battler.buffIconIndex(-1, i);
            this.startStatePopup(iconIndex, 0, delay);
            delay += nextDelay;
        }
    }
    var removedStates = result.removedStateObjects();
    for (var i = 0; i < removedStates.length; i++) {
        var iconIndex = removedStates[i].iconIndex;
        this.startStatePopup(iconIndex, 1, delay);
        delay += nextDelay;
    }
};

Sprite_Battler.prototype.startStatePopup = function(iconIndex, type, delay) {
    var sprite = new Sprite_StatePopup();
    sprite.x = this.x;
    sprite.y = this.y - this.stateOffsetY();
    if (sprite.y < 20) sprite.y = 20;
    sprite.setup(iconIndex, type, delay);
    this._states.push(sprite);
    this.parent.addChild(sprite);
};

Sprite_Battler.prototype.stateOffsetY = function() {
    return this._effectTarget.height;
};

//-----------------------------------------------------------------------------
// Sprite_Actor

Sprite_Actor.prototype.isPopupState = function() {
    return this._actor.isSpriteVisible() && MPPlugin.popupActor;
};

//-----------------------------------------------------------------------------
// Sprite_Enemy

Sprite_Enemy.prototype.isPopupState = function() {
    return MPPlugin.popupEnemy;
};

Sprite_Enemy.prototype.stateOffsetY = function() {
    return Math.round((this.bitmap.height + 40) * 0.9);
};

//-----------------------------------------------------------------------------
// Sprite_StatePopup

function Sprite_StatePopup() {
    this.initialize.apply(this, arguments);
}

Sprite_StatePopup.prototype = Object.create(Sprite.prototype);
Sprite_StatePopup.prototype.constructor = Sprite_StatePopup;

Sprite_StatePopup.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.bitmap = ImageManager.loadSystem('IconSet');
    this.setFrame(0, 0, 0, 0);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._duration = 15 + MPPlugin.popupTime;
    this._popupType = 0;
    this._delay = 0;
    this._flashColor = [255, 255, 255, 255];
};

Sprite_StatePopup.prototype.setup = function(iconIndex, type, delay) {
    var pw = Sprite_StateIcon._iconWidth;
    var ph = Sprite_StateIcon._iconHeight;
    var sx = iconIndex % 16 * pw;
    var sy = Math.floor(iconIndex / 16) * ph;
    this.setFrame(sx, sy, pw, ph);
    this._popupType = type;
    this._delay = delay;
    this.visible = false;
};

Sprite_StatePopup.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._delay > 0) {
        this._delay--;
    } else if (this._duration > 0) {
        var d = this._duration--;
        if (this._popupType === 0) {
            var base = MPPlugin.popupTime;
            if (d > base) {
                var radian = (d - base) * Math.PI / 30;
                this.scale.x = Math.cos(radian);
                this.anchor.y = Math.cos(radian) / 2;
            } else {
                this.scale.x = 1;
                this.anchor.y = 0.5;
            }
            if (!Utils.isMobileDevice()) {
                this._flashColor[3] = Math.max(this._flashColor[3] - 10, 0);
                this.setBlendColor(this._flashColor);
            }
        } else {
            if (d <= 30) {
                this.blendMode = 1;
                this.opacity = d * 9;
                var radian = (30 - d) * Math.PI / 60;
                this.anchor.y = Math.cos(radian) / 2;
            }
        }
        this.visible = true;
    }
};

Sprite_StatePopup.prototype.isPlaying = function() {
    return this._duration > 0;
};


})();
