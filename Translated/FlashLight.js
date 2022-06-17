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
})({"H7Fc":[function(require,module,exports) {
/*!
 * @pixi/filter-adjustment - v4.1.3
 * Compiled Thu, 17 Jun 2021 19:33:56 UTC
 *
 * @pixi/filter-adjustment is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(t,r){"use strict";var n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])})(t,r)};Object.create;Object.create;var e=function(t){function r(r){var n=t.call(this,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}","varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n")||this;return n.gamma=1,n.saturation=1,n.contrast=1,n.brightness=1,n.red=1,n.green=1,n.blue=1,n.alpha=1,Object.assign(n,r),n}return function(t,r){function e(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(e.prototype=r.prototype,new e)}(r,t),r.prototype.apply=function(t,r,n,e){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,t.applyFilter(this,r,n,e)},r}(r.Filter);return t.AdjustmentFilter=e,Object.defineProperty(t,"__esModule",{value:!0}),t}({},PIXI);Object.assign(PIXI.filters,__filters);
//# sourceMappingURL=filter-adjustment.js.map

},{}],"Rw7K":[function(require,module,exports) {
"use strict";

require("./node_modules/@pixi/filter-adjustment/dist/filter-adjustment.js");

/* global PluginManager */

/* global SceneManager  */

/* global $gamePlayer   */

/* global PIXI          */

/* global Graphics      */

/* global $gameScreen   */

/* global $gameMap      */

/* global $gameSelfSwitches */

/* global Game_Player */
//=============================================================================
// FlashLight.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc FlashLight plugin.
 * @author BananaPepperTK
 *
 * @help This is a plugin to draw a circular light.
 * 
 * For more information
 *   https://github.com/sevenspice/FlashLight
 *
 * @param BlurBoundaries
 * @desc Blur the boundaries of light or not. true:Yes false:No
 * @default false
 *
 * @command draw
 * @text light
 * @desc Draws a light representation.
 *
 * @arg drawType
 * @type string
 * @default LIGHT
 * @text Light shining
 * @desc LIGHT: Lighting in the direction of forward movement TORCH: Light it up around you
 *
 * @arg radius
 * @type number
 * @min 80
 * @max 240
 * @default 80
 * @text Radius of Light
 * @desc Specifies the radius of a circle of light to be drawn.
 * 
 * @arg selfSwitch
 * @type string
 * @default A
 * @text Self-switch to turn on
 * @desc Specify the self-switch to be turned on when the light hits it.
 *
 * @arg ignoreEvents
 * @type number[]
 * @default []
 * @text Event ID that ignores the hit decision
 * @desc Specify an array of event IDs to ignore the hit detection with light.
 *
 * @command clear
 * @text End of drawing
 * @desc Turn off the circular light.
 */

/*:ja
 * @target MZ
 * @plugindesc 懐中電灯プラグイン。
 * @author BananaPepperTK
 *
 * @help 円形の光を描画するプラグインです。
 *
 * 詳細
 *   https://github.com/sevenspice/FlashLight
 *
 * @param BlurBoundaries
 * @desc 光の境界線をぼやかすかどうか。 true:ぼやかす false:ぼやかさない
 * @default false
 *
 * @command draw
 * @text 描画開始
 * @desc 円形の光を描画します。
 *
 * @arg drawType
 * @type string
 * @default LIGHT
 * @text 光の当て方
 * @desc LIGHT: 前方移動方向に照らす TORCH: 自分を中心に照らす
 *
 * @arg radius
 * @type number
 * @min 80
 * @max 240
 * @default 80
 * @text 光の半径
 * @desc 描画される円形の光の半径を指定する。
 * 
 * @arg selfSwitch
 * @type string
 * @default A
 * @text ONにするセルフスイッチ
 * @desc 光が当たった時にONにするセルフスイッチを指定する。
 *
 * @arg ignoreEvents
 * @type number[]
 * @default []
 * @text 当たり判定を無視するイベントID
 * @desc 光との当たり判定を無視するイベントIDを配列で指定する。
 *
 * @command clear
 * @text 描画終了
 * @desc 円形の光を消します。
 */
(function () {
  var pluginName = 'FlashLight'; // プレイヤーの方向定義
  // テンキーの配置と同様

  var DIRECTION_TOP = 8;
  var DIRECTION_LEFT = 4;
  var DIRECTION_RIGHT = 6;
  var DIRECTION_BOTTOM = 2; // ライトのタイプ

  var DRAW_TYPE = {
    TORCH: Symbol(),
    LIGHT: Symbol()
  }; // 接触時にONにするスイッチ

  var SELF_SWITCH = {
    A: 'A',
    B: 'B',
    C: 'C',
    D: 'D'
  }; // ライトがONになっているか？

  var lightOn = false; // ライトは懐中電灯タイプ or 松明タイプ?

  var drawType = DRAW_TYPE.LIGHT; // ONにするセルフスイッチ

  var selfSwitch = SELF_SWITCH.A; // 光源の半径

  var lightRadius = 80; // 衝突判定を無視するイベント一覧

  var ignoreEvents = []; // 描画された光源を保存する変数

  var graphicLight = null;
  var spriteLight = null;
  var lightTexture = null; // プラグイン初期化
  // コマンドパラメーターの取得

  var parameters = PluginManager.parameters(pluginName);
  var blurBoundaries = parameters['BlurBoundaries'];
  if (blurBoundaries == 'true') blurBoundaries = true;else blurBoundaries = false; // ------------------------------------------
  // プラグインで使用する関数
  // ------------------------------------------

  /**
   * 矩形と円の衝突を判定する。
   * @param {double} x1 矩形左上x座標
   * @param {double} y1 矩形左上y座標
   * @param {double} x2 矩形右下x座標
   * @param {double} y2 矩形右下y座標
   * @param {double} xc 円の中心x座標
   * @param {double} yc 円の中心y座標
   * @param {double} r  円の半径
   * @return {boolean} 矩形と円が衝突していると判定できればtrueを返却。
   */

  var collisionDetection = function collisionDetection(x1, y1, x2, y2, xc, yc, r) {
    var regionTopBottom = function regionTopBottom(_x1, _y1, _x2, _y2, _xc, _yc, _r) {
      return _xc > _x1 && _xc < _x2 && _yc > _y1 - _r && _yc < _y2 + r;
    };

    var regionLeftRight = function regionLeftRight(_x1, _y1, _x2, _y2, _xc, _yc, _r) {
      return _xc > _x1 - _r && _xc < _x2 + r && _yc > _y1 && _yc < _y2;
    };

    var regionTopLeft = function regionTopLeft(_x1, _y1, _x2, _y2, _xc, _yc, _r) {
      return Math.pow(_x1 - _xc, 2) + Math.pow(_y1 - _yc, 2) < Math.pow(_r, 2);
    };

    var regionTopRight = function regionTopRight(_x1, _y1, _x2, _y2, _xc, _yc, _r) {
      return Math.pow(_x2 - _xc, 2) + Math.pow(_y1 - _yc, 2) < Math.pow(_r, 2);
    };

    var regionBottomLeft = function regionBottomLeft(_x1, _y1, _x2, _y2, _xc, _yc, _r) {
      return Math.pow(_x2 - _xc, 2) + Math.pow(_y2 - _yc, 2) < Math.pow(_r, 2);
    };

    var regionBottomRight = function regionBottomRight(_x1, _y1, _x2, _y2, _xc, _yc, _r) {
      return Math.pow(_x1 - _xc, 2) + Math.pow(_y2 - _yc, 2) < Math.pow(_r, 2);
    };

    return regionTopBottom(x1, y1, x2, y2, xc, yc, r) || regionLeftRight(x1, y1, x2, y2, xc, yc, r) || regionTopLeft(x1, y1, x2, y2, xc, yc, r) || regionTopRight(x1, y1, x2, y2, xc, yc, r) || regionBottomLeft(x1, y1, x2, y2, xc, yc, r) || regionBottomRight(x1, y1, x2, y2, xc, yc, r);
  };
  /**
   * RGBA値を16進数文字列へ変換する。
   * @param {string} colors RGBA値
   * @return {string} 16進数へ変換した文字列。
   */


  var rgbTo16 = function rgbTo16(colors) {
    return '#' + colors.match(/\d+/g).map(function (a) {
      return ('0' + parseInt(a).toString(16)).slice(-2);
    }).join('');
  };
  /**
   * プレイヤーの向きに応じた光源を描画する。
   * 光源の作り方は以下のクラスを参考にしている。
   *   - 移動時に拡大＆フェードアウトするの白い四角
   *         Sprite_Destination
   * @param {integer} _lightRadius     光の半径
   * @param {symbol}  _drawType        光のタイプ
   * @param {string}  _selfSwitch      光接触時にONにするスイッチ
   * @param {array}   _ignoreEvents    接触判定を無視するイベント
   * @param {boolean} _blurBoundaries  境界線にグラデーションを入れる
   * @return {undefined}
   */


  var lightDraw = function lightDraw(_lightRadius, _drawType, _selfSwitch, _ignoreEvents, _blurBoundaries) {
    // 追加された光源を削除する
    if (graphicLight != null) SceneManager._scene._spriteset._tilemap.removeChild(graphicLight);
    if (spriteLight != null) SceneManager._scene._spriteset._tilemap.removeChild(spriteLight);
    if (lightTexture != null) lightTexture.destroy(true); // キャラクターチップのサイズ

    var tilemapWidth = SceneManager._scene._spriteset._tilemap._tileWidth;
    var tilemapHeight = SceneManager._scene._spriteset._tilemap._tileHeight; // ゲームプレイヤーの描画位置を取得する

    var pixelX = $gamePlayer.screenX();
    var pixelY = $gamePlayer.screenY(); // ライト表示位置.

    var lightX = 0;
    var lightY = 0;

    if (_drawType == DRAW_TYPE.LIGHT) {
      if ($gamePlayer.direction() == DIRECTION_TOP) {
        lightX = pixelX;
        lightY = pixelY - (tilemapHeight + _lightRadius);
      } else if ($gamePlayer.direction() == DIRECTION_BOTTOM) {
        lightX = pixelX;
        lightY = pixelY + _lightRadius + Math.floor(tilemapHeight / 2);
      } else if ($gamePlayer.direction() == DIRECTION_RIGHT) {
        lightX = pixelX + _lightRadius + Math.floor(tilemapWidth / 2);
        lightY = pixelY - Math.floor(tilemapHeight / 2);
      } else if ($gamePlayer.direction() == DIRECTION_LEFT) {
        lightX = pixelX - _lightRadius - Math.floor(tilemapWidth / 2);
        lightY = pixelY - Math.floor(tilemapHeight / 2);
      }
    } else {
      lightX = pixelX;
      lightY = pixelY - Math.floor(tilemapHeight / 2);
    } // フィルター処理
    // 光の表現


    var adjustmentFilter = new PIXI.filters.AdjustmentFilter();
    adjustmentFilter.red = 5;
    adjustmentFilter.blue = 5;
    adjustmentFilter.green = 5;
    adjustmentFilter.contrast = 5;
    adjustmentFilter.brightness = 5;
    adjustmentFilter.saturation = 0.1;
    adjustmentFilter.alpha = 0.1;
    adjustmentFilter.blendMode = 2;
    var _graphicLight = null;
    var _spriteLight = null;

    if (_blurBoundaries) {
      // グラデーション表現あり
      // 光源の生成
      var canvas = document.createElement('canvas');
      canvas.width = Graphics.boxWidth;
      canvas.height = Graphics.boxHeight;
      var context = canvas.getContext('2d'); // グラデーションの生成

      var gradient = context.createRadialGradient(lightX, lightY, Math.floor(_lightRadius / 1.2), lightX, lightY, _lightRadius);
      gradient.addColorStop(0.0, '#ffffffff');
      gradient.addColorStop(1.0, rgbTo16("rgb(".concat($gameScreen._tone.join(','), ")"))); // 描画

      context.beginPath();
      context.arc(lightX, lightY, _lightRadius, 0, 2 * Math.PI);
      context.fillStyle = gradient;
      context.fill();
      lightTexture = PIXI.Texture.from(canvas);
      _spriteLight = new PIXI.Sprite(lightTexture); // フィルターの適用と表示レイヤーの指定

      _spriteLight.z = 9;
      _spriteLight.filters = [adjustmentFilter];
    } else {
      // グラデーション表現なし
      _graphicLight = new PIXI.Graphics(); // 描画設定

      _graphicLight.lineStyle(0); // 線なし


      _graphicLight.beginFill(0xFFFFFF, 1); // 白色, 透明度 0.1
      // 円形の描画


      _graphicLight.drawCircle(lightX, lightY, _lightRadius);

      _graphicLight.endFill(); // フィルターの適用と表示レイヤーの指定


      _graphicLight.z = 9;
      _graphicLight.filters = [adjustmentFilter];
    } // タイルマップにグラフィックを追加 (描画)
    // タイルマップに追加することで画面の色調変更の影響を抑えることができる
    // (シーンに追加すると最上レイヤーに追加されるため透過下が色調変更されている状態になり明かりが当たっている様に見えない)


    if (_graphicLight != null) graphicLight = SceneManager._scene._spriteset._tilemap.addChild(_graphicLight);
    if (_spriteLight != null) spriteLight = SceneManager._scene._spriteset._tilemap.addChild(_spriteLight); // イベントとの衝突判定

    for (var i = 0; i < $gameMap._events.length; i++) {
      var event = $gameMap._events[i];

      if (event) {
        var mapId = event._mapId;
        var eventId = event._eventId; // 接触判定無視リストに含まれているイベントならば処理を飛ばす

        if (_ignoreEvents.includes(eventId)) continue; // イベントが描画されている位置

        var eventX = event.screenX();
        var eventY = event.screenY(); // イベントの矩形座標を算出

        var x1 = eventX - Math.floor(tilemapWidth / 2);
        var y1 = eventY - tilemapHeight;
        var x2 = eventX + Math.floor(tilemapWidth / 2);
        var y2 = eventY; // ここで光源とのイベントの接触を判定する

        var result = collisionDetection(x1, y1, x2, y2, lightX, lightY, _lightRadius);
        if (result) $gameSelfSwitches.setValue([mapId, eventId, _selfSwitch], true);else $gameSelfSwitches.setValue([mapId, eventId, _selfSwitch], false);
      }
    }
  }; // ------------------------------------
  // 以下はプラグインコマンド実行処理群
  // ------------------------------------


  PluginManager.registerCommand(pluginName, 'draw', function (args) {
    lightOn = true;
    lightRadius = Number(args.radius);
    if (isNaN(lightRadius)) lightRadius = 80;
    drawType = DRAW_TYPE[args.drawType];
    selfSwitch = SELF_SWITCH[args.selfSwitch];
    ignoreEvents = args.ignoreEvents; // 光源描画

    lightDraw(lightRadius, drawType, selfSwitch, ignoreEvents, blurBoundaries);
  });
  PluginManager.registerCommand(pluginName, 'clear', function () {
    lightOn = false; // 追加された光源を削除する

    if (graphicLight != null) SceneManager._scene._spriteset._tilemap.removeChild(graphicLight);
    if (spriteLight != null) SceneManager._scene._spriteset._tilemap.removeChild(spriteLight);
    if (lightTexture != null) lightTexture.destroy(true); // セルフスイッチをすべてOFFにする

    for (var i = 0; i < $gameMap._events.length; i++) {
      var event = $gameMap._events[i];

      if (event) {
        var mapId = event._mapId;
        var eventId = event._eventId; // 接触判定無視リストに含まれているイベントならば処理を飛ばす

        if (ignoreEvents.includes(eventId)) continue;
        $gameSelfSwitches.setValue([mapId, eventId, selfSwitch], false);
      }
    }
  }); // -------------------------------------------
  // 以下はツクールMVにある機能を改造する処理群
  // -------------------------------------------

  /**
   * プレイヤーが動く際の挙動を改造する。
   * プレイヤーを操作された際に、光源の移動と描画を行う。
   */

  var _Game_Player_prototype_moveByInput = Game_Player.prototype.moveByInput;

  Game_Player.prototype.moveByInput = function () {
    _Game_Player_prototype_moveByInput.apply(this, arguments);

    if (lightOn) lightDraw(lightRadius, drawType, selfSwitch, ignoreEvents, blurBoundaries);
  };
})();
},{"./node_modules/@pixi/filter-adjustment/dist/filter-adjustment.js":"H7Fc"}]},{},["Rw7K"], null)