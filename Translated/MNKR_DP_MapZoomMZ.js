/*
 * --------------------------------------------------
 * MNKR_DP_MapZoomMZ.js
 *   Ver.0.0.6
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

//=============================================================================
// ð¤drowsepost Plugins - Map Camera Controller
// DP_MapZoom.js
// Version: 0.87
// 
// Copyright (c) 2016 - 2019 canotun
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.DP_MapZoom = true;

var drowsepost = drowsepost || {};

//=============================================================================

/*:ja
 * @target MZ
 * @url https://raw.githubusercontent.com/munokura/MNKR-MZ-plugins/master/MNKR_DP_MapZoomMZ.js
 * @plugindesc ãããã®æ¡å¤§çãå¶å¾¡ãã¾ãã
 * @author drowsepost (æ¹å¤ munokura)
 *
 * @help
 * =========================================================================
 * About
 * =========================================================================
 * åç¨®åº§æ¨å¦çã«æ¡å¤§çã®è¨ç®ãåæ ã
 * ãããã·ã¼ã³ã®æ¡å¤§çãå¶å¾¡ãã¾ãã
 * ã¾ããæå®ããã¤ãã³ããã«ã¡ã©ãè¿½ãããã«æå®ãã¾ãã
 * æ¨æºã®ãã©ã¼ã«ã¹å¯¾è±¡ã¯åé ­ã®ãã¬ã¤ã¤ã¼ã¨ãªãã¾ãã
 * 
 * =========================================================================
 * Knowing issue
 * =========================================================================
 * å·¨å¤§ãªãããã«ããã¦æ¡å¤§çããã¾ãã«å°ããããã¨
 * canvasã¢ã¼ãã§å¦çè½ã¡ãwebglã¢ã¼ãã§ãããæ¬ ãã®åé¡ãçºçãã¾ãã
 * ããã¯PIXIã©ã¤ãã©ãªã®éçã§ãããè§£æ±ºæ¹æ³ã¯èª¿æ»ä¸­ã§ã
 * 
 * =========================================================================
 * How To Use
 * =========================================================================
 * â ãããã¡ã¢æ¬
 * 
 * <zoomScale:0.5>
 * ãªã©ã¨è¨è¿°ããã¨ãããããã¨ã«åºæºã«ãªãæ¡å¤§çãæå®ãããã¨ãåºæ¥ã¾ãã
 * 
 * <camTarget: 3>
 * ç­ã¨è¨è¿°ããã¨ãã¤ãã³ãID nçªã®ã¤ãã³ããç»é¢ä¸­å¤®ã«ãªã£ãç¶æã«ã§ãã¾ãã
 * ãã©ã¼ã«ã¹ã¯ã¤ãã³ãã®ç§»åã«ç»é¢ãè¿½å¾ãã¾ãã
 * 
 * â ãã©ã°ã¤ã³ã³ãã³ã
 * 
 * (1)ãºã¼ã æ©è½
 * dpZoom {åç} {å¤æ´ã«ããããã¬ã¼ã æ°} {å¯¾è±¡ã¤ãã³ãID / this / player}
 * æå®ããã¤ãã³ãã«ãã©ã¼ã«ã¹ãåããã¤ã¤ç»é¢ã®æ¡å¤§çãå¤æ´ã§ãã¾ãã
 * ç¬¬3å¼æ°ã«ä½ãæå®ããªãå ´åãç»é¢ä¸­å¤®ã«åãã£ã¦æ¡å¤§ãã¾ãã
 * 
 * ä¾:
 * ãã©ã°ã¤ã³ã³ãã³ãã«ããã¦å¯¾è±¡ã¤ãã³ãã®é¨åã«
 * ãthisããããã¯ããã®ã¤ãã³ããã¨æå®ããã¨ã
 * ã¤ãã³ãå®è¡ä¸­ã®ãªãã¸ã§ã¯ããæå®ãã¾ãã
 * dpZoom 2 360 this
 * ä¾ãã°ä¸è¨ã¯ãã®ã¤ãã³ããä¸­å¿ã«ãªãããã«6ç§ããã¦2åã®æ¡å¤§çã«å¤åãã¾ãã
 * <éæ¨å¥¨> mapSetZoom ã¯å©ç¨ã§ãã¾ãããéæ¨å¥¨ã¨ãã¾ãã
 * 
 * (2)ãã©ã¼ã«ã¹æ©è½
 * dpFocus {å¯¾è±¡ã¤ãã³ãID / this / player} {å¤æ´ã«ããããã¬ã¼ã æ°}
 * ç»é¢ã®æ¡å¤§çãå¤æ´ããã«æå®ããã¤ãã³ãã«ãã©ã¼ã«ã¹ãåããã¾ãã
 * 
 * =========================================================================
 * Settings
 * =========================================================================
 * Base Scale
 * ã²ã¼ã éå§æã®æ¡å¤§åçãæå®ãã¾ãã
 * åçã«ã¯0ä»¥ä¸ãæå®ãã¦ãã ããã
 * 
 * Encount Effect
 * ã¨ã³ã«ã¦ã³ãã¨ãã§ã¯ããç½®ãæãããã©ãããæå®ãã¾ãã
 * ãªãªã¸ãã«ã®ã¨ãã§ã¯ãã§ç½®ãæãã¦ããå ´åã¯ãã¡ããfalseã«ãã¦ãã ããã
 * ãã®å ´åãç»é¢ã®æ¡å¤§çãããããåæ ã§ããããã«èª¿æ´ããå¿è¦ãããã¾ãã
 * 
 * Camera Controll
 * falseã®å ´åã¯ã¤ãã³ããæå®ããæ¡å¤§ãå«ã
 * æ¡å¤§ä¸­ã®ã«ã¡ã©å¶å¾¡ã¯åä½ãã¾ããã
 * å¥ãã©ã°ã¤ã³ã§ã«ã¡ã©å¶å¾¡ãè¡ãå ´åã«ãå©ç¨ãã ããã
 * 
 * Weather Patch
 * trueã®å ´åãå¤©åã¹ãã©ã¤ãã®çæç¯å²ã«é¢ããä¿®æ­£ãè¡ãã
 * æ¡å¤§çå¤æ´å¾ãå¤©åã¹ãã©ã¤ããã¾ãã¹ããªãåå¸ããã¾ã
 * å¥ãã©ã°ã¤ã³ã§å¤©åæ¼åºã®å¶å¾¡ãè¡ã£ã¦ããå ´åç­ã¯falseã«ãã¦ãã ããã
 * 
 * Picture Size Fixation
 * trueã®å ´åããã¯ãã£ãæ¡å¤§å¦çããé¤å¤ãã¾ãã
 * 
 * Old Focus
 * trueã®å ´åãå¤ãDP_MapZoom.jsã¨åæ§ã®ãã©ã¼ã«ã¹å¦çãè¡ãã¾ãã
 * ãã®ãã©ã¼ã«ã¹å¦çã¯å¯¾è±¡ã¤ãã³ãã¾ã§ã®åº§æ¨ã®ãããåºæºã«ãã¦ããããã
 * ã¤ãã³ãã®ç§»åãè¿½å°¾ãã¾ããã
 *
 * Easing Function
 * ãºã¼ã æã®ã¤ã¼ã¸ã³ã°ãä¸»ã«0ãã1ã®éã§æ»ãå¼ãè¨­å®ã§ãã¾ãã
 * å¼æ° t ã«ãºã¼ã ã®é²æã0ãã1ã§å¥ãã¾ããJavaScriptã
 * 
 * =========================================================================
 * Technical information
 * =========================================================================
 * ç¾å¨ã®ç»é¢ã®æ¡å¤§çã¯$gameScreen.zoomScale()ã§åå¾ã§ãã¾ãã
 * ããã¯ãã©ã°ã¤ã³ã®å©ç¨ã«é¢ãããåããå­å¨ããé¢æ°ã§ãã
 * ä»ã®ãã©ã°ã¤ã³ã§å©ç¨ãããscreenXãããscreenYãããããå ´åã¯ã
 * ãscreenXãããscreenYãã«ãããã$gameScreen.zoomScale()ãæãã¦ä¸ããã
 * 
 * ãã®ãã©ã°ã¤ã³ã¯$gameScreenãå¶å¾¡ãã¾ãã
 * 
 * æå®ãããæ¡å¤§çè¨­å®ã¯$gameMap._dp_scaleãä¿æãã¾ãã
 * ã·ã¼ã³é¢è±æã®ã¹ã¯ã­ã¼ã«éã¯$gameMap._dp_panãä¿æãã¾ãã
 * ãããã®ãã©ã¼ã«ã¹ã¤ãã³ãã¯$gameMap._dp_targetãä¿æãã¾ãã
 * 
 * 
 * ãã®ãã©ã°ã¤ã³ã«ã¤ãã¦
 *   RPGãã¯ã¼ã«MVç¨ã«ä½æããããã©ã°ã¤ã³ãMZç¨ã«ç§»æ¤ãããã®ã§ãã
 *   ãåãåããã¯æ¹å¤èã¸ãé¡ããããã¾ãã
 *
 * 
 * å©ç¨è¦ç´:
 *   MITã©ã¤ã»ã³ã¹ã§ãã
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   ä½èã«ç¡æ­ã§æ¹å¤ãåéå¸ãå¯è½ã§ã
 *   å©ç¨å½¢æï¼åç¨ã18ç¦å©ç¨ç­ï¼ã«ã¤ãã¦ãå¶éã¯ããã¾ããã
 * 
 * 
 * @param Base Scale
 * @text åºæ¬æ¡å¤§ç
 * @desc åºæ¬ã®æ¡å¤§çãè¨­å®ãã¾ãã(0ä»¥ä¸)
 * Default: 1
 * @default 1
 * 
 * @param Encount Effect
 * @text ã¨ã³ã«ã¦ã³ãã¨ãã§ã¯ãåæ 
 * @desc ã¨ã³ã«ã¦ã³ãã¨ãã§ã¯ãã«æ¡å¤§çãåæ 
 * Default: true (ON: true / OFF: false)
 * @default true
 * @type boolean
 * 
 * @param Camera Controll
 * @text æ¡å¤§å¦çä¸­ã»ã³ã¿ãªã³ã°å¶å¾¡
 * @desc æ¡å¤§å¦çä¸­ã®ã»ã³ã¿ãªã³ã°å¶å¾¡ããã®ãã©ã°ã¤ã³ãè¡ã
 * Default: true (ON: true / OFF: false / æå°: minimum)
 * @default true
 * @type select
 * @option ON
 * @value true
 * @option OFF
 * @value false
 * @option Minimum
 * @value minimum
 * 
 * @param Weather Patch
 * @text å¤©åã¹ãã©ã¤ãçæç¯å²
 * @desc å¤©åã¹ãã©ã¤ãã®çæç¯å²ãåºããä¿®æ­£ãé©ç¨ãã¾ãã
 * Default: true (ON: true / OFF: false)
 * @default true
 * @type boolean
 * 
 * @param Picture Size Fixation
 * @text ãã¯ãã£é¤å¤
 * @desc ãã¯ãã£ããããã®æ¡å¤§å¦çããé¤å¤ãã¾ã
 * Default: ALL (ALL: true / OFF: false / $ / screen_ / fix_)
 * @default true
 * @type select
 * @option OFF
 * @value false
 * @option ALL
 * @value true
 * @option $
 * @value $
 * @option screen_
 * @value screen_
 * @option fix_
 * @value fix_
 * 
 * @param Old Focus
 * @text è¿½è·¡ãªããã©ã¼ã«ã¹ä½¿ç¨
 * @desc å¤ããã¼ã¸ã§ã³ã®è¿½è·¡ãªãã®ãã©ã¼ã«ã¹ãä½¿ç¨ãã¾ãã
 * Default: false (ON: true / OFF: false)
 * @default false
 * @type boolean
 * 
 * @param Easing Function
 * @text ã¢ãã¡ã¼ã·ã§ã³ã®ã¤ã¼ã¸ã³ã°å¼
 * @desc ã¢ãã¡ã¼ã·ã§ã³ã®ã¤ã¼ã¸ã³ã°å¼ã
 * å¼æ° t (0.00ï½1.00) æ»ãå¤ æ°å¤(0.00ï½1.00) Default: t
 * @default t
 * @type string
 * 
 * 
 * @command dpZoom
 * @text ç»é¢ã®æ¡å¤§çãå¤æ´
 * @desc æå®ããã¤ãã³ãã«ãã©ã¼ã«ã¹ãåããã¤ã¤ç»é¢ã®æ¡å¤§çãå¤æ´ã§ãã¾ãã
 *
 * @arg focusScale
 * @text åç
 * @desc ç»é¢ã®æ¡å¤§ç
 * @default 1
 *
 * @arg focusFlame
 * @text ãã¬ã¼ã æ°
 * @desc å¤æ´ã«ããããã¬ã¼ã æ°
 * @default 1
 *
 * @arg focusTarget
 * @text å¯¾è±¡
 * @desc ãºã¼ã å¯¾è±¡
 * (æ°å­:ã¤ãã³ãID / this:å®è¡ã¤ãã³ã / player:ãã¬ã¤ã¤ã¼)
 * @type combo
 * @option this
 * @option player
 * @default this
 * 
 * 
 * @command dpFocus
 * @text å¯¾è±¡ã«ãã©ã¼ã«ã¹
 * @desc ç»é¢ã®æ¡å¤§çãå¤æ´ããã«æå®ããã¤ãã³ãç­ã«ãã©ã¼ã«ã¹ãåããã¾ãã
 *
 * @arg focusTarget
 * @text å¯¾è±¡
 * @desc ãã©ã¼ã«ã¹å¯¾è±¡
 * (æ°å­:ã¤ãã³ãID / this:å®è¡ã¤ãã³ã / player:ãã¬ã¤ã¤ã¼)
 * @type combo
 * @option this
 * @option player
 * @default this
 *
 * @arg focusFlame
 * @text ãã¬ã¼ã æ°
 * @desc å¤æ´ã«ããããã¬ã¼ã æ°
 * @default 1
 */

(function () {
    "use strict";
    var user_map_marginright = 0;
    var user_map_marginbottom = 0;

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const parameters = PluginManager.parameters(pluginName);
    var user_scale = Number(parameters['Base Scale'] || 1);
    var user_fix_encount = Boolean(parameters['Encount Effect'] === 'true' || false);
    var user_use_camera = Boolean(parameters['Camera Controll'] === 'true' || false);
    var user_use_camera_transfer = Boolean(parameters['Camera Controll'] === 'minimum' || false);
    var user_fix_weather = Boolean(parameters['Weather Patch'] === 'true' || false);
    var user_fix_picture = parameters['Picture Size Fixation'];
    var user_use_oldfocus = Boolean(parameters['Old Focus'] === 'true' || false);
    var user_easing_function = parameters['Easing Function'];

    /*
    Main Functions
    =============================================================================
    å®éã®æ¡å¤§å¦ç
    */
    var camera = {};

    /*
    dp_renderSize
    ã¿ã¤ã«æ¡å¤§çãä¿æããã³ä»®æ³çãªã¬ã³ããªã³ã°ç¯å²ãç®åºãã¾ãã
    */
    var dp_renderSize = {
        _scale: undefined,
        width: undefined,
        height: undefined,

        /**
         * æ¡å¤§çããã¬ã³ããªã³ã°ããã¹ããªãã¸ã§ã¯ãã®ãµã¤ãºãè¨­å®ãã¾ãã
         * @param {number} scale 
         */
        onChange: (function (_scale) {
            if (!('_scene' in SceneManager)) return;
            if (!('_spriteset' in SceneManager._scene)) return;
            var scale = _scale || this._scale;
            var spriteset = SceneManager._scene._spriteset;

            //ããããµã¤ãºå¤æ´
            spriteset._tilemap.width = Math.ceil(Graphics.width / scale) + spriteset._tilemap._margin * 2;
            spriteset._tilemap.height = Math.ceil(Graphics.height / scale) + spriteset._tilemap._margin * 2;

            //ãã©ã©ãã¯ã¹ãµã¤ãºå¤æ´
            spriteset._parallax.move(0, 0, Math.round(Graphics.width / scale), Math.round(Graphics.height / scale));

            // Foreground.jså¯¾å¿
            if (spriteset._foreground && spriteset._foreground instanceof TilingSprite) {
                spriteset._foreground.move(0, 0, Math.round(Graphics.width / scale), Math.round(Graphics.height / scale));
            }

            spriteset._tilemap.refresh();
            spriteset._tilemap._needsRepaint = true;
            spriteset._tilemap.updateTransform();
        }),

        /**
         * scaleããªã»ãããã¾ã
         */
        reset: (function () {
            this.scale = 1;
        })
    };

    Object.defineProperty(dp_renderSize, 'scale', {
        get: function () {
            return this._scale;
        },
        set: function (val) {
            if (val != this._scale) {
                this._scale = Number(val);
                // this.width = Math.ceil(Graphics.boxWidth / this._scale);
                // this.height = Math.ceil(Graphics.boxHeight / this._scale);
                // å¤©åã®è¡¨ç¤ºç¯å²ãç»é¢ãµã¤ãºã«
                this.width = Math.ceil(Graphics.width / this._scale);
                this.height = Math.ceil(Graphics.height / this._scale);
                this.onChange();
            }
        }
    });

    /**
     * ãºã¼ã ãã¹ãåº§æ¨ãç®åº
     * @return {object} Point
     */
    var dp_getZoomPos = function () {
        return new Point(
            camera.target.screenX(),
            camera.target.screenY() - ($gameMap.tileHeight() / 2)
        );
    };

    /**
     * ãããã®ã¬ã³ããªã³ã°åç¹ã¨è¡¨ç¤ºä½ç½®ã®ãããåå¾ãã¾ãã
     * @return {object} Point
     */
    var dp_getVisiblePos = function () {
        var scale = $gameScreen.zoomScale();
        return new Point(
            Math.round($gameScreen.zoomX() * (scale - dp_renderSize.scale)),
            Math.round($gameScreen.zoomY() * (scale - dp_renderSize.scale))
        );
    };

    /**
     * ãã©ã¼ã«ã¹ããã¦ããã­ã£ã©ã¯ã¿ã¼ããç»é¢ã®ä¸­å¿ãã©ãã ãããã¦ãããåå¾ãã¾ã
     * @return {object} Point
     */
    var dp_getpan = function () {
        var centerPosX = (($gameMap.screenTileX() - 1) / 2);
        var centerPosY = (($gameMap.screenTileY() - 1) / 2);

        var pan_x = ($gameMap.displayX() + centerPosX) - camera.target._realX;
        var pan_y = ($gameMap.displayY() + centerPosY) - camera.target._realY;

        return new Point(
            ($gameMap.screenTileX() >= $dataMap.width) ? 0 : pan_x,
            ($gameMap.screenTileY() >= $dataMap.height) ? 0 : pan_y
        );
    };

    /**
     * ç»é¢ã®æ¡å¤§çãè¨­å®ãã¾ãã
     * @param {number} scale 
     */
    var dp_setZoom = function (scale) {
        dp_renderSize.scale = scale;
        $gameMap._dp_scale = scale;

        $gameScreen.setZoom(0, 0, scale);
        camera.center();
    };

    /**
     * æå®ãããã¤ãã³ãIDãã¤ãã³ãã¤ã³ã¹ã¿ã³ã¹ã«ãã¦è¿å´
     * @param {any} event ã¤ãã³ãIDãããã¯ã¤ãã³ããªãã¸ã§ã¯ããããã¯ãã¬ã¤ã¤ã¼
     * @return {object} Game_CharacterBase
     */
    var dp_getEvent = function (event) {
        var _target;
        if (typeof event === 'object') {
            if ('_eventId' in event) _target = $gameMap.event(event._eventId);
        }

        if (typeof event === 'number') {
            _target = $gameMap.event(event);
        }

        if (!(_target instanceof Game_CharacterBase)) {
            _target = $gamePlayer;
        }

        return _target;
    };

    /**
     * ã«ã¡ã©ã¿ã¼ã²ããããç®æ¨ã¤ãã³ãã¾ã§ã®ãããä¸ã®ãºã¬(x,y)ãåå¾
     * @param {any} event ã¤ãã³ãIDãããã¯ã¤ãã³ããªãã¸ã§ã¯ããããã¯ãã¬ã¤ã¤ã¼
     * @return {object} Point
     */
    var dp_targetPan = function (event) {
        var _target = dp_getEvent(event);

        return new Point(
            _target._realX - camera.target._realX,
            _target._realY - camera.target._realY
        );
    };

    /**
     * æå­åãã¤ã¼ã¸ã³ã°ç¨é¢æ°ã¨ãã¦è©ä¾¡ããé¢æ°ãè¿ãã¾ã
     * @param {String|Function} txt_func
     * @return {Function} ã¤ã¼ã¸ã³ã°ç¨é¢æ°ãå¼æ°ã¯ float t
     */
    var dp_txtToEasing = (function (txt_func) {
        var basic_func = (function (t) { return t; });
        if (typeof txt_func === 'function') return txt_func;
        if (typeof txt_func !== 'string') return basic_func;
        if (txt_func == '') return basic_func;

        try {
            return new Function('t', 'return ' + txt_func + ';');
        } catch (e) {
            console.error('DP_MapZoom: Easing Function', e, txt_func);
        }
        return basic_func;
    });

    /**
     * ç·å½¢è£å®
     * @param {Number} p å¥åé²æç
     * @param {Number} from éå§æ°å¤
     * @param {Number} to ç®æ¨æ°å¤
     * @return {Number} çµæé²æç
     */
    var dp_lerp = (function (p, from, to) {
        return from + (to - from) * p;
    });

    /*
    Camera Object
    ===================================================================================
    */

    /**
     * ã«ã¡ã©ã®ã¢ãã¡ã¼ã·ã§ã³ãå¶å¾¡ãããªãã¸ã§ã¯ã
     */
    camera.animation = (function () {
        //private
        var _active = false;
        var _count, _duration, _easing;
        var _start_pan, _start_scale, _end_pan, _end_scale;

        //public
        var r = {
            /**
             * ã¢ãã¡ã¼ã·ã§ã³ã®ã¹ã¿ã¼ã
             * @param {Number} scale ç®æ¨ã¨ããæ¡å¤§ç
             * @param {Point} pos ç®æ¨ã¨ããåº§æ¨ã®ãºã¬
             * @param {Number} dulation å¤åã«ããããã¬ã¼ã 
             */
            start: (function (scale, pos, duration) {
                var is_zoomout = ($gameScreen.zoomScale() > scale) ? true : false;

                _count = 0;
                _duration = duration || 0;
                _end_scale = scale || $gameScreen.zoomScale();
                _end_pan = pos || new Point();

                _start_pan = dp_getpan();
                _start_scale = $gameScreen.zoomScale();

                if (is_zoomout) {
                    dp_renderSize.scale = scale;
                    camera.center(_start_pan.x, _start_pan.y);
                }

                _active = true;
            }),
            /**
             * ã¢ãã¡ã¼ã·ã§ã³ã®ã¢ãããã¼ã
             * camera.animation.update
             */
            update: (function () {
                if (!_active) return;

                var p = _count / _duration;
                _count++;

                if (p > 1) {
                    r.end();
                    return;
                }

                if (_count % 2 === 0) return;

                var ease = _easing(p);
                var x = dp_lerp(ease, _start_pan.x, _end_pan.x);
                var y = dp_lerp(ease, _start_pan.y, _end_pan.y);
                var z = dp_lerp(ease, _start_scale, _end_scale);

                $gameScreen.setZoom(0, 0, z);
                camera.center(x, y);
            }),
            /**
             * ã¢ãã¡ã¼ã·ã§ã³ã®çµäº
             */
            end: (function () {
                if (!_active) return;
                _active = false;

                $gameMap._dp_pan = _end_pan;
                dp_setZoom(_end_scale);
            })
        };

        Object.defineProperty(r, 'easing', {
            get: function () {
                return _easing;
            },
            set: function (val) {
                _easing = dp_txtToEasing(val);
            }
        });

        r.easing = user_easing_function;

        return r;
    }());

    /**
     * ã«ã¡ã©ã®ãºã¼ã ãéå§ããé¢æ°
     * @param {number} ratio æ¡å¤§ç
     * @param {number} duration å¤åã«ããããã¬ã¼ã 
     * @param {any} target ãã©ã¼ã«ã¹ããã¤ãã³ãIDãããã¯ã²ã¼ã ã¤ãã³ããªãã¸ã§ã¯ã
     */
    camera.zoom = function (ratio, duration, target) {
        if ((typeof ratio !== 'number') || (ratio < 0)) {
            ratio = dp_renderSize.scale;
        }

        var target_pan = dp_getpan();
        if (typeof target !== 'undefined') {
            if (user_use_oldfocus) {
                target_pan = dp_targetPan(target);
            } else {
                camera.target = target;
                target_pan = new Point();
            }
        }

        if (duration > 0) {
            camera.animation.start(ratio, target_pan, duration);
        } else {
            $gameMap._dp_pan = target_pan;
            dp_setZoom(ratio);
        }
    };

    /**
     * ãã©ã¼ã«ã¹ããã¿ã¼ã²ãããã«ã¡ã©ä¸­å¤®ã«éç½®
     * @param {number} panX ç»é¢ãããããã¹ã®æ°ãæ¨ªã
     * @param {number} panY ç»é¢ãããããã¹ã®æ°ãç¸¦ã
     * @param {boolean} force_center ã«ã¡ã©å¶å¾¡ç¡å¹ã§ãå®è¡
     */
    camera.center = function (panX, panY, force_center) {
        if ((!user_use_camera) && (!force_center)) return;
        var px = Number(panX || $gameMap._dp_pan.x);
        var py = Number(panY || $gameMap._dp_pan.y);
        camera.target.center(camera.target._realX + px, camera.target._realY + py);
    };

    /**
     * ã«ã¡ã©ããã©ã¼ã«ã¹ããå¯¾è±¡
     * @param {any} event ã¤ãã³ãIDãããã¯ã²ã¼ã ã¤ãã³ããããã¯ãã¬ã¤ã¤ã¼
     * @return {object} ã²ã¼ã ã¤ãã³ããããã¯ãã¬ã¤ã¤ã¼
     */
    Object.defineProperty(camera, 'target', {
        get: function () {
            if ($gameMap._dp_target === 0) return $gamePlayer;
            return $gameMap.event($gameMap._dp_target);
        },
        set: function (event) {
            var _target = dp_getEvent(event);

            $gameMap._dp_target = 0;
            if (typeof _target === 'object') {
                if ('_eventId' in _target) $gameMap._dp_target = _target._eventId;
            }
        }
    });

    //å¬é
    drowsepost.camera = camera;
    drowsepost.rendersize = dp_renderSize;

    /*
    Command Entry
    ===================================================================================
    @param {array} args ã¹ãã¼ã¹åºåãã§æå®ãããã©ã°ã¤ã³ã³ãã³ãã®å¼æ°(array<string>)
    */
    drowsepost.fn = drowsepost.fn || {};

    /**
     * æ¡å¤§çãå¤æ´ããã«ãã©ã¼ã«ã¹å¤æ´
     * {target} {frame}
     */
    var _p_dpfocus = ('dpFocus' in drowsepost.fn) ? drowsepost.fn.dpFocus : (function () { });
    drowsepost.fn.dpFocus = (function (_a) {
        _p_dpfocus.call(this, _a);

        var _s = this;
        var _target;

        if (_a.length < 1) _a.push('player');

        // if ((_a[0] === 'this') || (_a[0] === 'ãã®ã¤ãã³ã')) _target = _s;
        // else if ((_a[0] === 'player') || (_a[0] === 'ãã¬ã¤ã¤ã¼')) _target = $gamePlayer;
        // else _target = parseInt(_a[0]);

        // munokura
        if ((_a[0] === 'this') || (_a[0] === 'ãã®ã¤ãã³ã')) {
            _target = _s;
        } else if ((_a[0] === 'player') || (_a[0] === 'ãã¬ã¤ã¤ã¼')) {
            _target = $gamePlayer;
        } else {
            _target = parseInt(_a[0]);
        }

        camera.zoom(dp_renderSize.scale, parseInt(_a[1]), _target);
    });

    /**
     * ç»é¢æ¡å¤§çãå¤æ´
     * ç¬¬ä¸å¼æ°ã«ã¿ã¼ã²ããæå®ã§ãã©ã¼ã«ã¹ãå¤æ´
     * {zoom} {frame} {target}
     */
    var _p_dpzoom = ('dpZoom' in drowsepost.fn) ? drowsepost.fn.dpZoom : (function () { });
    drowsepost.fn.mapSetZoom = drowsepost.fn.dpZoom = (function (_a) {
        _p_dpzoom.call(this, _a);

        var _s = this;
        var _target;

        // if (_a.length > 2) {
        //     if ((_a[2] === 'this') || (_a[2] === 'ãã®ã¤ãã³ã')) _target = _s;
        //     else if ((_a[2] === 'player') || (_a[2] === 'ãã¬ã¤ã¤ã¼')) _target = $gamePlayer;
        //     else _target = parseInt(_a[2]);
        // }
        // munokura

        if (_a.length > 2) {
            if ((_a[2] === 'this') || (_a[2] === 'ãã®ã¤ãã³ã')) {
                _target = _s;
            } else if ((_a[2] === 'player') || (_a[2] === 'ãã¬ã¤ã¤ã¼')) {
                _target = $gamePlayer;
            } else {
                _target = parseInt(_a[2]);
            }
        }

        camera.zoom(parseFloat(_a[0]), parseInt(_a[1]), _target);
    });

    /*
    Game_Interpreter
    ===================================================================================
    ã³ãã³ããã¼ãµã¼ã®è¿½å 
    */
    // (function () {
    //     //@override
    //     var _parent_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    //     Game_Interpreter.prototype.pluginCommand = function (command, args) {
    //         _parent_pluginCommand.call(this, command, args);
    //         if ('DP_Basics' in Imported) return;
    //         if (!(command in drowsepost.fn)) return;
    //         if (typeof drowsepost.fn[command] === 'function') {
    //             drowsepost.fn[command].call(this, args);
    //         }
    //     };
    // }());

    /*
    RPGãã¯ã¼ã«MZç¨ã®ãã©ã°ã¤ã³ã³ãã³ããè¿½å 
    */
    PluginManager.registerCommand(pluginName, "dpZoom", function (arr) {
        const command = 'dpZoom';
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        if ('DP_Basics' in Imported) return;
        if (!(command in drowsepost.fn)) return;
        if (typeof drowsepost.fn[command] === 'function') {
            drowsepost.fn[command].call(this, args);
        }
    });

    PluginManager.registerCommand(pluginName, "dpFocus", function (arr) {
        const command = 'dpFocus';
        const args = Object.entries(arr).map(([key, value]) => `${value}`);
        if ('DP_Basics' in Imported) return;
        if (!(command in drowsepost.fn)) return;
        if (typeof drowsepost.fn[command] === 'function') {
            drowsepost.fn[command].call(this, args);
        }
    });

    /*
    Game Map
    =============================================================================
    æ¡å¤§ç($gameScreen.zoomScale())ã®åæ 
    */
    (function () {
        //@override
        var _parent_initialize = Game_Map.prototype.initialize;
        Game_Map.prototype.initialize = function () {
            _parent_initialize.call(this);

            //ä¿å­ç¨å¤æ°ã¨ã³ããªã¼
            this._dp_scale = user_scale;
            this._dp_pan = new Point();
            this._dp_target = 0;
        };

        //@override
        Game_Map.prototype.screenTileX = function () {
            return (Graphics.width - user_map_marginright) / (this.tileWidth() * $gameScreen.zoomScale());
        };

        //@override
        Game_Map.prototype.screenTileY = function () {
            return (Graphics.height - user_map_marginbottom) / (this.tileHeight() * $gameScreen.zoomScale());
        };

        //@override
        Game_Map.prototype.canvasToMapX = function (x) {
            var tileWidth = this.tileWidth() * $gameScreen.zoomScale();
            var originX = this._displayX * tileWidth;
            var mapX = Math.floor((originX + x) / tileWidth);
            return this.roundX(mapX);
        };

        //@override
        Game_Map.prototype.canvasToMapY = function (y) {
            var tileHeight = this.tileHeight() * $gameScreen.zoomScale();
            var originY = this._displayY * tileHeight;
            var mapY = Math.floor((originY + y) / tileHeight);
            return this.roundY(mapY);
        };

    }());

    /*
    Game Character
    =============================================================================
    Game Characterã«æ³¨è¦ããå ´åã®å¦çãè¿½å 
    */
    (function () {
        Game_Character.prototype.centerX = function () {
            return ($gameMap.screenTileX() - 1) / 2.0;
        };

        Game_Character.prototype.centerY = function () {
            return ($gameMap.screenTileY() - 1) / 2.0;
        };

        Game_Character.prototype.center = function (x, y) {
            return $gameMap.setDisplayPos(x - this.centerX(), y - this.centerY());
        };

        Game_Character.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
            var x1 = lastScrolledX;
            var y1 = lastScrolledY;
            var x2 = this.scrolledX();
            var y2 = this.scrolledY();
            if (y2 > y1 && y2 > this.centerY()) {
                $gameMap.scrollDown(y2 - y1);
            }
            if (x2 < x1 && x2 < this.centerX()) {
                $gameMap.scrollLeft(x1 - x2);
            }
            if (x2 > x1 && x2 > this.centerX()) {
                $gameMap.scrollRight(x2 - x1);
            }
            if (y2 < y1 && y2 < this.centerY()) {
                $gameMap.scrollUp(y1 - y2);
            }
        };

    }());

    /*
    Game Player
    =============================================================================
    æ¡å¤§çã®åæ 
    */
    (function () {
        //@override
        Game_Player.prototype.centerX = function () {
            return ($gameMap.screenTileX() - 1) / 2.0;
        };

        //@override
        Game_Player.prototype.centerY = function () {
            return ($gameMap.screenTileY() - 1) / 2.0;
        };

        //@override
        var _parent_updateScroll = Game_Player.prototype.updateScroll;
        Game_Player.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
            if (typeof $gameMap !== 'object') return;
            if ($gameMap._dp_target !== 0) return;
            _parent_updateScroll.call(this, lastScrolledX, lastScrolledY);
        };

    }());

    /*
    Game Event
    =============================================================================
    Game Eventã«æ³¨è¦ããå ´åã®å¦çãè¿½å 
    */
    (function () {
        //@override
        var _parent_update = Game_Event.prototype.update;
        Game_Event.prototype.update = function () {
            var lastScrolledX = this.scrolledX();
            var lastScrolledY = this.scrolledY();

            _parent_update.call(this);

            this.updateScroll(lastScrolledX, lastScrolledY);
        };

        Game_Event.prototype.updateScroll = function (lastScrolledX, lastScrolledY) {
            if (typeof $gameMap !== 'object') return;
            if ($gameMap._dp_target !== this._eventId) return;
            Game_Character.prototype.updateScroll.call(this, lastScrolledX, lastScrolledY);
        };

    }());

    /*
    Weather
    =============================================================================
    æç»åæ å¤æ´æ©è½ã®è¿½å 
    */
    (function () {
        //å¤©åã¹ãã©ã¤ãã®çæç¯å²ãGraphicåºæºã§ã¯ãªãå®éã®æç»ç¯å²ã«åããã
        if (!user_fix_weather) return;
        //@override
        var _parent_rebornSprite = Weather.prototype._rebornSprite;
        Weather.prototype._rebornSprite = function (sprite) {
            _parent_rebornSprite.call(this, sprite);
            sprite.ax = Math.randomInt(dp_renderSize.width + 100) - 50 + this.origin.x;
            sprite.ay = Math.randomInt(dp_renderSize.height + 200) - 100 + this.origin.y;
            sprite.opacity = 160 + Math.randomInt(60);
        };

    }());

    /*
    Sprite_Picture
    =============================================================================
    ãã¯ãã£dot by dotéç½®æ©è½ã®è¿½å 
    */
    (function () {
        //ãã¯ãã£ã®éç½®ã¨æ¡å¤§çããã¹ã¯ãªã¼ã³ã®æ¡å¤§çã§æã¡æ¶ã
        if (!user_fix_picture) return;
        if (user_fix_picture === 'false') return;

        //@override
        var _parent_loadBitmap = Sprite_Picture.prototype.loadBitmap;
        Sprite_Picture.prototype.loadBitmap = function () {
            _parent_loadBitmap.call(this);

            if (user_fix_picture === 'true') {
                this._dp_fix = true;
            } else if (!this._pictureName.indexOf(user_fix_picture)) {
                this._dp_fix = true;
            } else {
                this._dp_fix = false;
            }
        };

        //@override
        var _parent_updateScale = Sprite_Picture.prototype.updateScale;
        Sprite_Picture.prototype.updateScale = function () {
            _parent_updateScale.call(this);
            if (!this._dp_fix) return;

            var picture = this.picture();
            this.scale.x = (1 / $gameScreen.zoomScale()) * (picture.scaleX() / 100);
            this.scale.y = (1 / $gameScreen.zoomScale()) * (picture.scaleY() / 100);
        };

        //@override
        var _parent_updatePosition = Sprite_Picture.prototype.updatePosition;
        Sprite_Picture.prototype.updatePosition = function () {
            _parent_updatePosition.call(this);
            if (!this._dp_fix) return;

            var picture = this.picture();
            var map_s = dp_getVisiblePos();
            this.x = (picture.x() + map_s.x) * (1 / $gameScreen.zoomScale());
            this.y = (picture.y() + map_s.y) * (1 / $gameScreen.zoomScale());
        };
    }());

    /*
    Sprite_Timer
    =============================================================================
    ã¿ã¤ãã¼ã®éç½®ã¨ãµã¤ãºãèª¿æ´
    */
    (function () {
        //@override
        var _parent_updatePosition = Sprite_Timer.prototype.updatePosition;
        Sprite_Timer.prototype.updatePosition = function () {
            _parent_updatePosition.call(this);

            var _zoom = (1 / $gameScreen.zoomScale());

            this.x = this.x * _zoom;
            this.y = this.y * _zoom;
            this.scale.x = _zoom;
            this.scale.y = _zoom;
        };
    }());

    /*
    Spriteset_Base
    =============================================================================
    æ¡å¤§åº§æ¨ã®èª¿æ´
    */
    (function () {
        //@override
        var _parent_updatePosition = Spriteset_Base.prototype.updatePosition;
        Spriteset_Base.prototype.updatePosition = function () {
            _parent_updatePosition.call(this);

            var map_s = dp_getVisiblePos();
            this.x = map_s.x * -1;
            this.y = map_s.y * -1;

            this.x += Math.round($gameScreen.shake());
        };
    }());

    /*
    Scene_Map
    =============================================================================
    æ¡å¤§çã®å¼ç¶ã
    */
    (function () {
        /*
        ãããã·ã¼ã³ã®éå§
        */
        //@override
        var _parent_start = Scene_Map.prototype.start;
        Scene_Map.prototype.start = function () {
            _parent_start.call(this);

            //ç§»åå¾å¦ç
            if (this._transfer) {
                //ãããè¨­å®æå ±ã§æ¡å¤§çå¤æ´
                //ã¤ãã³ãã¨ãã£ã¿ããã®ãã¹ãå®è¡ã§ã¯$gameMap.metaãå®ç¾©ãããªãã
                $gameMap._dp_scale = ('meta' in $dataMap) ?
                    Number($dataMap.meta.zoomScale || $gameMap._dp_scale)
                    : $gameMap._dp_scale;

                //ã«ã¡ã©ã¿ã¼ã²ãã
                //ã¤ãã³ãã¨ãã£ã¿ããã®ãã¹ãå®è¡ã§ã¯$gameMap.metaãå®ç¾©ãããªãã
                $gameMap._dp_target = ('meta' in $dataMap) ?
                    Number($dataMap.meta.camTarget || 0)
                    : 0;

                //ãã³
                $gameMap._dp_pan = new Point();
            }

            //æ¨æºã¬ã³ããªã³ã°ãµã¤ãºã«ãªã»ãã
            dp_renderSize.reset();

            //ã«ã¡ã©ã¿ã¼ã²ããè¨­å®
            camera.target = $gameMap._dp_target;

            //ãããã·ã¼ã³éå§æã«æ¡å¤§çå¤æ´ãããã¯ã
            dp_setZoom($gameMap._dp_scale);

            //ç»é¢ä¸­å¿ãå¼·å¶è¨­å®ãã
            if ((!user_use_camera) && user_use_camera_transfer) camera.center(null, null, true);
        };

        /*
        ãããã·ã¼ã³ã®çµäº
        */
        //@override
        var _parent_terminate = Scene_Map.prototype.terminate;
        Scene_Map.prototype.terminate = function () {
            //ãããã·ã¼ã³çµäºæã«æ¡å¤§çæå ±ãä¿å­ã
            camera.animation.end();

            var zoomPos = dp_getZoomPos();
            $gameScreen.setZoom(zoomPos.x, zoomPos.y, dp_renderSize.scale);
            $gameMap._dp_pan = dp_getpan();

            _parent_terminate.call(this);
        };

        /*
        ã¨ã³ã«ã¦ã³ãã¨ãã§ã¯ã
        */
        if (!user_fix_encount) return;
        //@override
        Scene_Map.prototype.updateEncounterEffect = function () {
            if (this._encounterEffectDuration > 0) {
                this._encounterEffectDuration--;
                var speed = this.encounterEffectSpeed();
                var n = speed - this._encounterEffectDuration;
                var p = n / speed;
                var q = ((p - 1) * 20 * p + 5) * p + 1;
                var zoomPos = dp_getZoomPos();

                if (n === 2) {
                    $gameScreen.setZoom(zoomPos.x, zoomPos.y, dp_renderSize.scale);
                    this.snapForBattleBackground();
                    this.startFlashForEncounter(speed / 2);
                }

                $gameScreen.setZoom(zoomPos.x, zoomPos.y, (q * dp_renderSize.scale));
                if (n === Math.floor(speed / 6)) {
                    this.startFlashForEncounter(speed / 2);
                }
                if (n === Math.floor(speed / 2)) {
                    BattleManager.playBattleBgm();
                    this.startFadeOut(this.fadeSpeed());
                }
            }
        };
        //ã¨ã³ã«ã¦ã³ãã¨ãã§ã¯ãããã¾ã§

    }());

    /*
    Tilemap
    =============================================================================
    Canvasã¢ã¼ãæã®è»½éåãæ¡å¤§çã®åæ 
    */
    (function () {
        //@override
        var _Tilemap_createLayers = Tilemap.prototype._createLayers;
        Tilemap.prototype._createLayers = function () {
            if (this._lowerLayer instanceof Sprite) {
                this._lowerLayer.destroy();
            }
            if (this._upperLayer instanceof Sprite) {
                this._upperLayer.destroy();
            }

            _Tilemap_createLayers.call(this);
        };
    }());

    /*
    Game_Screen
    =============================================================================
    ã¢ãã¡ã¼ã·ã§ã³å¦çã®ããã¯
    */
    (function () {
        //@override
        var _parent_update = Game_Screen.prototype.update;
        Game_Screen.prototype.update = function () {
            _parent_update.call(this);
            camera.animation.update();
        };

        //@override
        // MZ æ¦éãã¹ãå¯¾ç­ munokura
        var _parent_initialize = Game_Screen.prototype.initialize;
        Game_Screen.prototype.initialize = function () {
            _parent_initialize.call(this);
            if (DataManager.isBattleTest()) {
                dp_renderSize.reset();
            }
        };

    }());

}());