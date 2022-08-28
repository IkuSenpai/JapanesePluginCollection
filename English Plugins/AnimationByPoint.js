/*=============================================================================
 AnimationByPoint.js
----------------------------------------------------------------------------
 (C)2020 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.1.0 2021/01/03 Added a command to display animations on map coordinates.
 1.0.0 2020/12/29 First version
----------------------------------------------------------------------------
 [Blog] : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @plugindesc AnimationByPointPlugin
 * @target MZ
 * @base PluginCommonBase
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AnimationByPoint.js
 * @author triacontane
 * @translator NamiBoops
 *
 * @command SHOW_ANIMATION
 * @desc Displays the animation at the specified coordinates (specified in pixels) on the screen.
 *
 * @arg id
 * @text Animation ID
 * @desc The animation ID to display.
 * @default 1
 * @type animation
 * @arg
 * @arg x
 * @text X
 * @desc The X to display the animation.
 * @default 0
 * @type number
 * @arg y
 * @arg y
 * @text Y
 * @desc The Y to display the animation.
 * @default 0
 * @type number
 * @arg wait
 * @arg wait
 * @text Wait to completion
 * @desc Wait for the event to progress until the animation display finishes.
 * @default false
 * @type boolean
 * @help
 * @help AnimationByPoint.js
 * @help
 * Provides a command to display an animation at a
 * Provides a command to display an animation at a specified coordinate (pixel specification) on the screen.
 * Since the target of the animation does not exist,
 * Since the target of the animation does not exist, * flashing to the target is invalid.
 * * The base plugin "Plugin" is the base plugin for * the base plugin.
 * The base plugin "PluginCommonBase.js" is required to use this plugin.
 * The "PluginCommonBase.js" is here.
 * (MZ install path)dlc/BasicResources/plugins/official/PluginCommonBase.js
 *
 * This plugin is released under the MIT License.
 */
/*:en
 * @plugindesc Plugin for displaying animations at specified coordinates.
 * @target MZ
 * @base PluginCommonBase
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AnimationByPoint.js
 * @author Triacontan
 *
 * @command SHOW_ANIMATION
 * @text show animation
 * @desc Show animation at the specified coordinates (specified in pixels) on the screen.
 *
 * @arg id
 * @text animation ID
 * @desc Animation ID to display.
 * @default 1
 * @type animation
 *
 * @arg x
 * @text X coordinate
 * @desc X coordinate to display the animation.
 * @default 0
 * @type number
 * * @arg y
 * @arg y
 * @text Y coordinate
 * @desc Y coordinate to display the animation.
 * @default 0
 * @type number
 * * @arg wait * * @text
 * @arg wait
 * @text wait until completion
 * @desc Wait for event progress until animation display is complete.
 * @default false
 * @type boolean
 *
 * @command SHOW_ANIMATION_BY_MAP_POINT
 * @text show animation by map coordinates.
 * @desc Show animation at the specified coordinates on the map (specified by squares).
 * @arg id
 * @arg id
 * @text animation ID
 * @desc Animation ID to display.
 * @default 1
 * @type animation
 *
 * @arg x
 * @text X coordinate
 * @desc The map X coordinate to display the animation.
 * @default 0
 * @type number
 * * @arg y
 * @arg y
 * @text Y coordinate
 * @desc The map Y-coordinate at which to display the animation.
 * @default 0
 * @type number
 * * @arg wait * * @text
 * @arg wait
 * @text wait until completion
 * @desc Wait for event progress until animation display is complete.
 * @default false
 * @type boolean
 *
 * @help AnimationByPoint.js
 *
 * Provides a command to display an animation at a specified coordinate (specified in pixels) on the screen.
 * Flash to the target is invalid because the target of the animation does not exist.
 * Also, due to the structure of the plugin, it is not possible to add a function to change priority.
 *
 * The base plugin "PluginCommonBase.js" is required to use this plugin.
 * PluginCommonBase.js" is stored in the following folder under the installation folder of RPG Tool MZ.
 * "PluginCommonBase.js" is stored in the following folder under the RPG Tool MZ installation folder.
 * dlc/BasicResources/plugins/official
 *
 * Terms of use
 * You can modify and redistribute them without permission of the author, and there is no restriction on the form of use (commercial, 18 prohibited use, etc.).
 * You can modify and redistribute this plugin without permission of the author.
 * You own this plugin now.
 */

(() => {
    'use strict';
    const script = document.currentScript;

    PluginManagerEx.registerCommand(script, 'SHOW_ANIMATION', function(args) {
        this.requestAnimationByPoint(args);
    });

    PluginManagerEx.registerCommand(script, 'SHOW_ANIMATION_BY_MAP_POINT', function(args) {
        args.x = $gameMap.convertToScreenX(args.x);
        args.y = $gameMap.convertToScreenY(args.y);
        this.requestAnimationByPoint(args);
    });

    Game_Map.prototype.convertToScreenX = function(mapX) {
        const tw = $gameMap.tileWidth();
        return Math.floor($gameMap.adjustX(mapX) * tw + tw / 2);
    };

    Game_Map.prototype.convertToScreenY = function(mapY) {
        const th = $gameMap.tileHeight();
        return Math.floor($gameMap.adjustY(mapY) * th + th / 2);
    };

    Game_Interpreter.prototype.requestAnimationByPoint = function(args) {
        const point = new Game_AnimationPoint(args);
        $gameTemp.requestAnimation([point], args.id);
        if (args.wait) {
            this.setWaitMode("pointAnimation");
        }
    }

    Spriteset_Base.prototype.findPointTargetSprite = function(point) {
        if (point instanceof Point) {
            const sprite = new Sprite_AnimationPoint(point);
            this.addChild(sprite);
            return sprite;
        } else {
            return null;
        }
    };

    const _Spriteset_Base_removeAnimation = Spriteset_Base.prototype.removeAnimation;
    Spriteset_Base.prototype.removeAnimation = function(sprite) {
        _Spriteset_Base_removeAnimation.apply(this, arguments);
        sprite._targets.forEach(targetSprite => {
            if (targetSprite instanceof Sprite_AnimationPoint) {
                this.removeChild(targetSprite);
            }
        })
    }

    const _Spriteset_Map_findTargetSprite = Spriteset_Map.prototype.findTargetSprite
    Spriteset_Map.prototype.findTargetSprite = function(target) {
        const sprite = _Spriteset_Map_findTargetSprite.apply(this, arguments);
        return sprite ? sprite : this.findPointTargetSprite(target);
    };

    const _Spriteset_Battle_findTargetSprite = Spriteset_Battle.prototype.findTargetSprite
    Spriteset_Battle.prototype.findTargetSprite = function(target) {
        const sprite = _Spriteset_Battle_findTargetSprite.apply(this, arguments);
        return sprite ? sprite : this.findPointTargetSprite(target);
    };

    let pointAnimationCount = 0;

    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        if (this._waitMode === 'pointAnimation') {
            if (pointAnimationCount === 0) {
                this._waitMode = '';
                return false;
            } else {
                return true;
            }
        } else {
            return _Game_Interpreter_updateWaitMode.apply(this, arguments);
        }
    };

    class Game_AnimationPoint extends Point {
        constructor(args) {
            super(args.x, args.y);
            this._wait = args.wait;
        }

        startAnimation() {
            if (this._wait) {
                pointAnimationCount++;
            }
        }

        endAnimation() {
            if (this._wait) {
                pointAnimationCount--;
            }
        }
    }

    class Sprite_AnimationPoint extends Sprite {
        constructor(point) {
            super();
            this.x = point.x;
            this.y = point.y;
        }
    }
})();
