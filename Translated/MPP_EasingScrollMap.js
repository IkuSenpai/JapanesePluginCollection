//=============================================================================
// MPP_EasingScrollMap.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Scrolls the map linearly toward the specified coordinates.
 * @author Mokusei Penguin
 * @url 
 * 
 * @help [version 1.1.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command scrollPos
 *      @desc 
 *      @arg type
 *          @desc 
 *          @type select
 *              @option Straight
 *                  @value Straight
 *              @option Slow start
 *                  @value Slow start
 *              @option Slow end
 *                  @value Slow end
 *              @option Slow start and end
 *                  @value Slow start and end
 *          @default Straight
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 256
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 256
 *          @default 0
 *      @arg direction
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 60
 *      @arg wait
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 *  @command scrollChar
 *      @desc 
 *      @arg type
 *          @desc 
 *          @type select
 *              @option Straight
 *                  @value Straight
 *              @option Slow start
 *                  @value Slow start
 *              @option Slow end
 *                  @value Slow end
 *              @option Slow start and end
 *                  @value Slow start and end
 *          @default Straight
 *      @arg character
 *          @desc -1:Player, 0:This event, 1...:Event with specified ID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg direction
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 60
 *      @arg wait
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 指定した座標に向けて直線的にマップのスクロールを行います。
 * @author 木星ペンギン
 * @url 
 * 
 * @help [version 1.1.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command scrollPos
 *      @text 座標にスクロール
 *      @desc 
 *      @arg type
 *          @text スクロールタイプ
 *          @desc 
 *          @type select
 *              @option 一定速度
 *                  @value Straight
 *              @option ゆっくり始まる
 *                  @value Slow start
 *              @option ゆっくり終わる
 *                  @value Slow end
 *              @option ゆっくり始まってゆっくり終わる
 *                  @value Slow start and end
 *          @default Straight
 *      @arg x
 *          @text X座標
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 256
 *          @default 0
 *      @arg y
 *          @text Y座標
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 256
 *          @default 0
 *      @arg direction
 *          @text 時間
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 60
 *      @arg wait
 *          @text 完了までウェイト
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 *  @command scrollChar
 *      @text キャラにスクロール
 *      @desc 
 *      @arg type
 *          @text スクロールタイプ
 *          @desc 
 *          @type select
 *              @option 一定速度
 *                  @value Straight
 *              @option ゆっくり始まる
 *                  @value Slow start
 *              @option ゆっくり終わる
 *                  @value Slow end
 *              @option ゆっくり始まってゆっくり終わる
 *                  @value Slow start and end
 *          @default Straight
 *      @arg character
 *          @text キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1...:指定したIDのイベント
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *      @arg direction
 *          @text 時間
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 60
 *      @arg wait
 *          @text 完了までウェイト
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_EasingScrollMap';
    
    /**
     * JsExtensions の代替。指定された範囲に値が制限されている数値を返します。
     * Number.prototype.clamp と違い、下限優先。
     * 
     * @param {number} x - 値。
     * @param {number} min - 下限。
     * @param {number} max - 上限。
     * @returns {number} 範囲内の数値。
     */
    const number_clamp = (x, min, max) => Math.max(Math.min(x, max), min);

    /**
     * JsExtensions の代替。常に正のモジュロ値を返します。
     * 
     * @param {number} x - 値。
     * @param {number} n - 除数。
     * @returns {number} モジュロ値。
     */
    const number_mod = (x, n) => ((x % n) + n) % n;

    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager.registerCommand(pluginName, 'scrollPos', function(args) {
        const type = args.type;
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        const direction = PluginManager.mppValue(args.direction);
        $gameMap.startEasingScroll(type, direction, x, y);
        if (args.wait === 'true') {
            this.setWaitMode('easingScroll');
        }
    });

    PluginManager.registerCommand(pluginName, 'scrollChar', function(args) {
        const character = this.character(PluginManager.mppValue(args.character));
        if (character) {
            const type = args.type;
            const direction = PluginManager.mppValue(args.direction);
            $gameMap.startEasingScroll(type, direction, character.x, character.y);
            if (args.wait === 'true') {
                this.setWaitMode('easingScroll');
            }
        }
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
        
    //-------------------------------------------------------------------------
    // Easing

    class Easing {
        constructor(type = '', duration = 0) {
            this.start(type, duration);
        }

        start(type, duration) {
            this.setType(type);
            this.setDuration(duration);
        }

        setType(type) {
            this._type = type || 'Slow end';
        }

        setDuration(duration) {
            this._duration = duration;
            this._wholeDuration = duration;
        }

        clear() {
            this._duration = 0;
        }

        isMoving() {
            return this._duration > 0;
        }

        update() {
            if (this._duration > 0) {
                this._duration--;
            }
        }

        apply(current, target) {
            const d = this._duration;
            const wd = this._wholeDuration;
            const lt = this._calc((wd - d) / wd);
            const t = this._calc((wd - d + 1) / wd);
            const start = (current - target * lt) / (1 - lt);
            return start + (target - start) * t;
        }

        _calc(t) {
            switch (this._type) {
                case 'Slow start':
                    return this._easeIn(t);
                case 'Slow end':
                    return this._easeOut(t);
                case 'Slow start and end':
                    return this._easeInOut(t);
                default:
                    return t;
            }
        }

        _easeIn(t) {
            return Math.pow(t, 2);
        }

        _easeOut(t) {
            return 1 - Math.pow(1 - t, 2);
        }

        _easeInOut(t) {
            if (t < 0.5) {
                return this._easeIn(t * 2) / 2;
            } else {
                return this._easeOut(t * 2 - 1) / 2 + 0.5;
            }
        }

    }

    //-------------------------------------------------------------------------
    // Game_Map

    // Easing をセーブデータに含まないための処置
    const gameMapScrollEasing = new Easing();
    
    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.apply(this, arguments);
        this.setupEasingScroll();
    };
    
    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.apply(this, arguments);
        this.setupEasingScroll();
    };
    
    Game_Map.prototype.setupEasingScroll = function() {
        gameMapScrollEasing.clear();
        this._scrollTargetX = 0;
        this._scrollTargetY = 0;
    };
    
    Game_Map.prototype.startEasingScroll = function(type, direction, x, y) {
        gameMapScrollEasing.start(type, direction);
        const targetX = x - $gamePlayer.centerX();
        const targetY = y - $gamePlayer.centerY();
        if (this.isLoopHorizontal()) {
            this._scrollTargetX = number_mod(targetX, this.width());
        } else {
            const endX = this.width() - this.screenTileX();
            this._scrollTargetX = number_clamp(targetX, 0, endX);
        }
        if (this.isLoopVertical()) {
            this._scrollTargetY = number_mod(targetY, this.height());
        } else {
            const endY = this.height() - this.screenTileY();
            this._scrollTargetY = number_clamp(targetY, 0, endY);
        }
    };
    
    Game_Map.prototype.isEasingScrolling = function() {
        return gameMapScrollEasing.isMoving();
    };
    
    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        _Game_Map_update.apply(this, arguments);
        this.updateEasingScroll();
    };
    
    Game_Map.prototype.updateEasingScroll = function() {
        if (this.isEasingScrolling()) {
            const easing = gameMapScrollEasing;
            const deltaX = this.deltaX(this._scrollTargetX, this._displayX);
            const deltaY = this.deltaY(this._scrollTargetY, this._displayY);
            this._displayX += easing.apply(0, deltaX);
            this._displayY += easing.apply(0, deltaY);
            easing.update();
        }
    };
            
    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'easingScroll') {
            if ($gameMap.isEasingScrolling()) {
                return true;
            } else {
                this._waitMode = '';
                return false;
            }
        }
        return _Game_Interpreter_updateWaitMode.apply(this, arguments);
    };
    
})();
