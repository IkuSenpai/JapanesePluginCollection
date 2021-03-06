// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"uJpF":[function(require,module,exports) {
'use strict';
/* global PIXI   */

/* global Bitmap */

/* global PluginManager  */

/* global ImageManager   */

/* global SceneManager   */

/* global Graphics       */

/* global Scene_Map      */

/* global Sprite         */

/* global TouchInput     */

/* global $gameTemp      */

/* global Window_Message */

/* global $dataSystem    */

/* global FontManager    */

/* global Game_System    */
//=============================================================================
// IconButton.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc IconButton plugin.
 * @author BananaPepperTK
 *
 * @help Turn the system icon into a button.
 * 
 * For more information
 *   https://github.com/sevenspice/IconButton
 *
 * @param FreeCoordinates
 * @desc How to specify the position of icons. If it is true, specify the display position directly by command.
 * @default false
 *
 * @param IconSet
 * @desc The name of the sprite sheet for the icon set to be used. If nothing is specified, the default icon set will be used.
 *
 * @param IconSize
 * @desc The number of pixels per side of the icon in the spritesheet.
 * @default 32
 *
 * @param IconCount
 * @desc The maximum number of horizontal rows of icons in the spritesheet.
 * @default 16
 *
 * @param IconMarginLeft
 * @desc Left margin of the icon.
 * @default 10
 *
 * @param IconMarginRight
 * @desc Right margin of the icon.???
 * @default 10
 *
 * @param IconMarginTop
 * @desc Top margin of the icon.
 * @default 10
 *
 * @param IconMarginBottom
 * @desc Bottom margin of the icon.
 * @default 10
 *
 * @command create
 * @text create
 * @desc Generate icon.
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 *
 * @arg eventId
 * @type common_event
 * @text CommonEventID
 * @desc The common event ID to be executed.
 *
 * @arg iconId
 * @type number
 * @text IconID
 * @desc The ID of the icon to be displayed.
 *
 * @arg location
 * @type string
 * @default rightBottom
 * @text location
 * @desc Place it somewhere in the four corners of the screen. leftTop or leftBottom or rightTop or rightBottom
 *
 * @arg x
 * @type number
 * @default 0
 * @text x-coordinate
 * @desc Direct designation.
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y-coordinate
 * @desc Direct designation.
 * 
 * @arg scale
 * @type number
 * @default 1.0
 * @text Rate of expansion and contraction
 * @desc Zoom in/out ratio of the displayed icon.
 *
 * @arg text
 * @type string
 * @text text
 * @desc The text to be displayed at the bottom of the icon.
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text fontsize
 * @desc Font size of the text to be displayed at the bottom of the icon.
 *
 * @command show
 * @text show
 * @desc Show icon.
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 *
 * @command update
 * @text update
 * @desc Update icon.
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 *
 * @arg x
 * @type number
 * @default 0
 * @text x-coordinate
 * @desc Direct designation.
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y-coordinate
 * @desc Direct designation.
 *
 * @arg scale
 * @type number
 * @default 1.0
 * @text Rate of expansion and contraction
 * @desc Zoom in/out ratio of the displayed icon.
 *
 * @arg text
 * @type string
 * @text text
 * @desc The text to be displayed at the bottom of the icon.
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text fontsize
 * @desc Font size of the text to be displayed at the bottom of the icon.
 *
 * @command hide
 * @text hide
 * @desc Hide icon???
 *
 * @arg id
 * @type number
 * @text ButtonID
 * @desc ID value that identifies the button.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc ???????????????????????????????????????
 * @author BananaPepperTK
 *
 * @help ???????????????????????????????????????????????????
 *
 * ??????
 *   https://github.com/sevenspice/IconButton
 *
 * @param FreeCoordinates
 * @desc ???????????????????????????????????? true ?????????????????????????????????????????????????????????
 * @default false
 *
 * @param IconSet
 * @desc ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 *
 * @param IconSize
 * @desc ????????????????????????????????????????????????1????????????????????????
 * @default 32
 *
 * @param IconCount
 * @desc ????????????????????????????????????????????????????????????????????????
 * @default 16
 *
 * @param IconMarginLeft
 * @desc ?????????????????????????????????
 * @default 10
 *
 * @param IconMarginRight
 * @desc ?????????????????????????????????
 * @default 10
 *
 * @param IconMarginTop
 * @desc ??????????????????????????????
 * @default 10
 *
 * @param IconMarginBottom
 * @desc ??????????????????????????????
 * @default 10
 *
 * @command create
 * @text ??????
 * @desc ?????????????????????????????????
 *
 * @arg id
 * @type number
 * @text ?????????ID
 * @desc ????????????????????????ID??????
 *
 * @arg eventId
 * @type common_event
 * @text ?????????????????????ID
 * @desc ?????????????????????????????????ID???
 *
 * @arg iconId
 * @type number
 * @text ????????????ID
 * @desc ???????????????????????????ID???
 *
 * @arg location
 * @type string
 * @default rightBottom
 * @text ????????????
 * @desc ????????????????????????????????????????????? leftTop or leftBottom or rightTop or rightBottom
 *
 * @arg x
 * @type number
 * @default 0
 * @text x??????
 * @desc ???????????????
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y??????
 * @desc ???????????????
 * 
 * @arg scale
 * @type number
 * @default 1.0
 * @text ??????????????????
 * @desc ????????????????????????????????????????????????
 *
 * @arg text
 * @type string
 * @text ????????????
 * @desc ???????????????????????????????????????????????????
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text ?????????????????????
 * @desc ???????????????????????????????????????????????????????????????????????????
 *
 * @command show
 * @text ??????
 * @desc ?????????????????????????????????
 *
 * @arg id
 * @type number
 * @text ?????????ID
 * @desc ????????????????????????ID??????
 *
 * @command update
 * @text ??????
 * @desc ?????????????????????????????????
 *
 * @arg id
 * @type number
 * @text ?????????ID
 * @desc ????????????????????????ID??????
 *
 * @arg x
 * @type number
 * @default 0
 * @text x??????
 * @desc ???????????????
 * 
 * @arg y
 * @type number
 * @default 0
 * @text y??????
 * @desc ???????????????
 *
 * @arg scale
 * @type number
 * @default 1.0
 * @text ??????????????????
 * @desc ????????????????????????????????????????????????
 *
 * @arg text
 * @type string
 * @text ????????????
 * @desc ???????????????????????????????????????????????????
 *
 * @arg fontSize
 * @type number
 * @default 14
 * @text ?????????????????????
 * @desc ???????????????????????????????????????????????????????????????????????????
 *
 * @command hide
 * @text ?????????
 * @desc ???????????????????????????????????????
 *
 * @arg id
 * @type number
 * @text ?????????ID
 * @desc ????????????????????????ID??????
 * 
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function () {
  var pluginName = 'IconButton';
  var iconSet = null; // ????????????????????????
  // ???????????????????????????????????????

  var parameters = PluginManager.parameters(pluginName);
  var freeCoordinates = parameters['FreeCoordinates'];
  if (freeCoordinates == 'true') freeCoordinates = true;else freeCoordinates = false;
  var _iconSet = parameters['IconSet'];
  if (_iconSet) iconSet = ImageManager.loadSystem(_iconSet);else iconSet = ImageManager.loadSystem('IconSet');
  var iconSize = parseInt(parameters['IconSize']);
  var baseIconWidth = iconSize;
  var baseIconHeight = iconSize;
  var iconCount = parseInt(parameters['IconCount']);
  var iconMarginLeft = parseInt(parameters['IconMarginLeft']);
  var iconMarginRight = parseInt(parameters['IconMarginRight']);
  var iconMarginTop = parseInt(parameters['IconMarginTop']);
  var iconMarginBottom = parseInt(parameters['IconMarginBottom']);
  var iconButtons = {};
  var iconButtonEnables = {}; // ???????????????????????????????????????

  /**
   * ??????????????????????????????????????????????????????
   * @param {Bitmap}  iconset    ????????????????????????????????????
   * @param {integer} iconIdex   ??????????????????
   * @param {integer} iconWidth  ???????????????
   * @param {integer} iconHeight ??????????????????
   * @param {integer} iconCount  ?????????????????????????????????????????????????????????
   * @return {Bitmap} ??????????????????????????????????????????
   */

  var getIcon = function getIcon(iconset, iconIdex, iconWidth, iconHeight, iconCount) {
    var iconX = iconIdex % iconCount * iconWidth;
    var iconY = Math.floor(iconIdex / iconCount) * iconHeight;
    var bitmap = new Bitmap(iconWidth, iconHeight);
    bitmap.blt(iconset, iconX, iconY, iconWidth, iconHeight, 0, 0, iconWidth, iconHeight);
    return bitmap;
  };
  /**
   * ?????????????????????????????????
   */


  var IconButton = /*#__PURE__*/function () {
    function IconButton(_eventId, _iconSet, _iconIndex, _x, _y, _baseIconWidth, _baseIconHeight, _iconCount, _scale, _text, _fontSize, _location, _iconMarginLeft, _iconMarginRight, _iconMarginTop, _iconMarginBottom, _freeCoordinates) {
      _classCallCheck(this, IconButton);

      this.eventId = _eventId;
      this.iconSet = _iconSet;
      this.iconIndex = _iconIndex;
      this.x = _x;
      this.y = _y;
      this.baseIconWidth = _baseIconWidth;
      this.baseIconHeight = _baseIconHeight;
      this.iconCount = _iconCount;
      this.scale = _scale;
      this.originScale = _scale;
      this.width = Math.floor(this.baseIconWidth * this.scale);
      this.height = Math.floor(this.baseIconHeight * this.scale);
      this.iconMarginLeft = _iconMarginLeft;
      this.iconMarginRight = _iconMarginRight;
      this.iconMarginTop = _iconMarginTop;
      this.iconMarginBottom = _iconMarginBottom;
      this.location = _location;
      this.freeCoordinates = _freeCoordinates;
      this.text = _text;
      this.fontSize = _fontSize;
      this.fontStyle = null;
      this.icon = null;
      this.underText = null;
    }
    /**
     * ?????????????????????????????????????????????
     * @param {integer} _x ?????????????????????x??????
     * @param {integer} _y ?????????????????????y??????
     * @param {string}  location   ???????????????????????????
     * @param {integer} iconWidth  ???????????????
     * @param {integer} iconHeight ??????????????????
     * @param {integer} iconMarginLeft   ??????????????????????????????
     * @param {integer} iconMarginRight  ??????????????????????????????
     * @param {integer} iconMarginTop    ??????????????????????????????
     * @param {integer} iconMarginBottom ??????????????????????????????
     * @param {boolean} freeCoordinates  ???????????????????????????
     * @return {object} ???????????????????????????????????????
     */


    _createClass(IconButton, [{
      key: "show",
      value:
      /**
       * ??????????????????????????????
       * @return {undefined}
       */
      function show() {
        if (this.icon != null) SceneManager._scene.removeChild(this.icon);
        if (this.underText != null) SceneManager._scene.removeChild(this.underText); // ??????????????????????????????

        if (SceneManager._scene instanceof Scene_Map) {
          var icon = null;
          var text = null; // ??????????????????????????????

          icon = new Sprite();
          icon.bitmap = getIcon(this.iconSet, this.iconIndex, this.baseIconWidth, this.baseIconHeight, this.iconCount);
          var iconX = this.x;
          var iconY = this.y;
          icon.x = iconX;
          icon.y = iconY;
          icon.scale = new PIXI.Point(this.scale, this.scale); // ??????????????????????????????????????????

          if (this.text) {
            this.fontStyle = new PIXI.TextStyle({
              fill: 'white',
              fontWeight: 'bold',
              strokeThickness: 4,
              miterLimit: 15,
              align: 'center',
              fontFamily: $dataSystem.advanced.mainFontFilename,
              fontSize: parseInt(this.fontSize)
            });
            text = new PIXI.Text(this.text, this.fontStyle); // ???????????????????????????

            text.x = iconX + Math.floor(Math.abs(this.width - text.width) / 2);
            text.y = iconY + this.height - (this.iconMarginBottom + this.iconMarginTop);
          }

          if (icon != null) this.icon = SceneManager._scene.addChild(icon);
          if (text != null) this.underText = SceneManager._scene.addChild(text);
        }
      }
      /**
       * ???????????????????????????????????????
       * @param {double}  scale ??????????????????
       * @param {integer} _x ??????????????????x??????
       * @param {integer} _y ??????????????????y??????
       * @param {string}  text     ??????????????????????????????
       * @param {integer} fontSize ??????????????????????????????
       * @return {undefined}
       */

    }, {
      key: "update",
      value: function update(scale, _x, _y, text, fontSize) {
        this.scale = scale;
        this.text = text;
        this.fontSize = fontSize;
        this.width = Math.floor(this.baseIconWidth * this.scale);
        this.height = Math.floor(this.baseIconHeight * this.scale); // ?????????????????????

        var _IconButton$coordinat = IconButton.coordinates(_x, _y, this.location, this.width, this.height, this.iconMarginLeft, this.iconMarginRight, this.iconMarginTop, this.iconMarginBottom, this.freeCoordinates),
            x = _IconButton$coordinat.x,
            y = _IconButton$coordinat.y; // ?????????????????????


        this.x = x;
        this.y = y; // ??????

        this.show();
      }
      /**
       * ????????????????????????
       * @return {undefined}
       */

    }, {
      key: "hide",
      value: function hide() {
        if (this.icon != null) SceneManager._scene.removeChild(this.icon);
        if (this.underText != null) SceneManager._scene.removeChild(this.underText);
      }
    }], [{
      key: "coordinates",
      value: function coordinates(_x, _y, location, iconWidth, iconHeight, iconMarginLeft, iconMarginRight, iconMarginTop, iconMarginBottom, freeCoordinates) {
        if (!freeCoordinates) {
          var x = 0;
          var y = 0;

          switch (location) {
            case 'rightBottom':
              x = Graphics.width - (iconWidth + iconMarginLeft + iconMarginRight);
              y = Graphics.height - (iconHeight + iconMarginTop + iconMarginBottom);
              break;

            case 'leftBottom':
              x = iconMarginLeft + iconMarginRight;
              y = Graphics.height - (iconHeight + iconMarginTop + iconMarginBottom);
              break;

            case 'rightTop':
              x = iconMarginLeft + iconMarginRight;
              y = iconMarginTop + iconMarginBottom;
              break;

            case 'leftTop':
              x = Graphics.width - (iconWidth + iconMarginLeft + iconMarginRight);
              y = iconMarginTop + iconMarginBottom;
              break;

            default:
              break;
          }

          return {
            x: x,
            y: y
          };
        } else {
          return {
            x: _x,
            y: _y
          };
        }
      }
    }]);

    return IconButton;
  }(); // ------------------------------------
  // ???????????????????????????????????????????????????
  // ------------------------------------

  /**
   * ??????????????????????????????
   */


  PluginManager.registerCommand(pluginName, 'create', function (args) {
    var id = args.id;

    if (!iconButtons[id]) {
      var eventId = args.eventId;
      var iconId = args.iconId;
      var location = args.location;
      var text = args.text;
      var fontSize = args.fontSize;
      var scale = args.scale;
      var iconWidth = Math.floor(baseIconWidth * scale);
      var iconHeight = Math.floor(baseIconHeight * scale);

      var _IconButton$coordinat2 = IconButton.coordinates(args.x, args.y, location, iconWidth, iconHeight, iconMarginLeft, iconMarginRight, iconMarginTop, iconMarginBottom),
          x = _IconButton$coordinat2.x,
          y = _IconButton$coordinat2.y;

      iconButtons[id] = {
        button: new IconButton(eventId, iconSet, iconId, x, y, baseIconWidth, baseIconHeight, iconCount, scale, text, fontSize, location, iconMarginLeft, iconMarginRight, iconMarginTop, iconMarginBottom, freeCoordinates)
      };
    }
  });
  /**
   * ???????????????????????????
   */

  PluginManager.registerCommand(pluginName, 'show', function (args) {
    var id = args.id;
    var button = iconButtons[id].button;

    if (button) {
      button.show();
      iconButtonEnables[id] = true;
    }
  });
  /**
   * ???????????????????????????
   */

  PluginManager.registerCommand(pluginName, 'update', function (args) {
    var id = args.id;
    var x = args.x;
    var y = args.y;
    var scale = args.scale;
    var text = args.text;
    var fontSize = args.fontSize;
    var button = iconButtons[id].button;

    if (button) {
      button.update(scale, x, y, text, fontSize);
      iconButtonEnables[id] = true;
    }
  });
  /**
   * ??????????????????????????????
   */

  PluginManager.registerCommand(pluginName, 'hide', function (args) {
    var id = args.id;
    var button = iconButtons[id].button;

    if (button) {
      button.hide();
      iconButtonEnables[id] = false;
    }
  }); // -------------------------------------------
  // ?????????????????????MZ???????????????????????????????????????
  // -------------------------------------------

  /**
   * ???????????????????????????????????????????????????
   * ?????????????????????????????????????????????????????????????????????????????????????????????
   */

  var _Game_System_initialize = Game_System.prototype.initialize;

  Game_System.prototype.initialize = function () {
    _Game_System_initialize.apply(this, arguments);

    FontManager.startLoading($dataSystem.advanced.mainFontFilename, FontManager._urls['rmmz-mainfont']); // PixiJS?????????????????????????????????????????????????????????
    // https://github.com/pixijs/pixijs/issues/4228

    PIXI.TextMetrics.BASELINE_SYMBOL = '??????';
  };
  /**
   * ??????????????????????????????????????????
   * ???????????????????????????????????????
   */


  var _SceneManager_updateMain = SceneManager.updateMain;

  SceneManager.updateMain = function () {
    _SceneManager_updateMain.apply(this, arguments);

    var keys = Object.keys(iconButtons);
    var clickX = TouchInput.x;
    var clickY = TouchInput.y;

    if (SceneManager._scene instanceof Scene_Map && TouchInput.isTriggered()) {
      for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var button = iconButtons[id].button;

        if (button && iconButtonEnables[id] && clickX >= button.x && clickX <= button.x + button.width && clickY >= button.y && clickY <= button.y + button.height) {
          // ??????????????????????????????
          button.originScale = button.scale;
          var scale = button.scale * 0.90;
          button.update(scale, button.x, button.y, button.text, button.fontSize); // ?????????????????????????????????

          $gameTemp.reserveCommonEvent(button.eventId);
        }
      }
    } else if (SceneManager._scene instanceof Scene_Map && TouchInput.isReleased()) {
      for (var _i = 0; _i < keys.length; _i++) {
        var _id = keys[_i];
        var _button = iconButtons[_id].button;

        if (_button && iconButtonEnables[_id] && clickX >= _button.x && clickX <= _button.x + _button.width && clickY >= _button.y && clickY <= _button.y + _button.height) {
          // ??????????????????????????????
          var _scale2 = _button.originScale;

          _button.update(_scale2, _button.x, _button.y, _button.text, _button.fontSize);
        }
      }
    }
  };
  /**
   * ?????????????????????????????????????????????????????????
   * ???????????????????????????????????????????????????????????????
   */


  var _Scene_Map_prototype_onMapTouch = Scene_Map.prototype.onMapTouch;

  Scene_Map.prototype.onMapTouch = function () {
    var keys = Object.keys(iconButtons);
    var canMove = true;

    if (SceneManager._scene instanceof Scene_Map) {
      var clickX = TouchInput.x;
      var clickY = TouchInput.y;

      for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var button = iconButtons[id].button;

        if (button && iconButtonEnables[id] && clickX >= button.x && clickX <= button.x + button.width && clickY >= button.y && clickY <= button.y + button.height) {
          canMove = false;
        }
      }
    }

    if (canMove) return _Scene_Map_prototype_onMapTouch.apply(this, arguments);
  };
  /**
   * ??????????????????????????????????????????????????????
   * ????????????????????????????????????????????????????????????????????????
   */


  var _Scene_Map_prototype_start = Scene_Map.prototype.start;

  Scene_Map.prototype.start = function () {
    _Scene_Map_prototype_start.apply(this, arguments);

    var keys = Object.keys(iconButtons);

    if (SceneManager._scene instanceof Scene_Map) {
      for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var button = iconButtons[id].button;

        if (button && iconButtonEnables[id]) {
          button.update(button.scale, button.x, button.y, button.text, button.fontSize);
        }
      }
    }
  };
  /**
   * ??????????????????????????????????????????????????????????????????
   * ???????????????????????????????????????????????????????????????????????????????????????
   */


  var _Window_Message_prototype_startMessage = Window_Message.prototype.startMessage;

  Window_Message.prototype.startMessage = function () {
    _Window_Message_prototype_startMessage.apply(this, arguments);

    var keys = Object.keys(iconButtons);

    if (SceneManager._scene instanceof Scene_Map) {
      for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var button = iconButtons[id].button;

        if (button && iconButtonEnables[id]) {
          button.hide();
        }
      }
    }
  };
  /**
   * ??????????????????????????????????????????????????????????????????
   * ????????????????????????????????????????????????????????????????????????????????????
   */


  var _Window_Message_prototype_terminateMessage = Window_Message.prototype.terminateMessage;

  Window_Message.prototype.terminateMessage = function () {
    _Window_Message_prototype_terminateMessage.apply(this, arguments);

    var keys = Object.keys(iconButtons);

    if (SceneManager._scene instanceof Scene_Map) {
      for (var i = 0; i < keys.length; i++) {
        var id = keys[i];
        var button = iconButtons[id].button;

        if (button && iconButtonEnables[id]) {
          button.update(button.scale, button.x, button.y, button.text, button.fontSize);
        }
      }
    }
  };
})();
},{}]},{},["uJpF"], null)