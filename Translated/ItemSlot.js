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
})({"bYsW":[function(require,module,exports) {
'use strict';
/* global Input  */

/* global PIXI   */

/* global Bitmap */

/* global PluginManager  */

/* global ImageManager   */

/* global SceneManager   */

/* global Scene_Item     */

/* global $gameParty     */

/* global $gameSystem    */

/* global Graphics       */

/* global Scene_Map      */

/* global Sprite         */

/* global TouchInput     */

/* global Window_Base    */

/* global Window_Message */

/* global Game_System    */
//=============================================================================
// ItemSlot.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Itemslot plugin.
 * @author BananaPepperTK
 *
 * @help Displays item slots on the map.
 *
 * For more information
 *   https://github.com/sevenspice/ItemSlot
 *
 * @param BackgroundColor
 * @desc Slot Background Color.
 * @default 0x000000
 *
 * @param SlotCount
 * @desc Number of slots. min:1 max:9
 * @default 5
 *
 * @param SlotMarginLeft
 * @desc Left margin between slots.
 * @default 10
 *
 * @param SlotMarginRight
 * @desc Right margin between slots.
 * @default 10
 *
 * @param SlotMarginTop
 * @desc Top margin on the slot.
 * @default 10
 *
 * @param SlotMarginBottom
 * @desc Bottom margin of the slot.
 * @default 10
 *
 * @param VerticalAlign
 * @desc Item slot placemen. BOTTOM or TOP
 * @default BOTTOM
 *
 * @param SlotFontSize
 * @desc The font size of the numbers to be drawn in the slot.
 * @default 10
 *
 * @param ItemSlotFontSize
 * @desc Font size of the numbers to be drawn in the item list.
 * @default 15
 *
 * @param LineWeight
 * @desc Selection Box Line Thickness.
 * @default 2
 *
 * @param LineColor
 * @desc Selection Box Color.
 * @default 0xF0E68C
 *
 * @param LineMargin
 * @desc The top, bottom, left and right margins of the selection frame.
 * @default 8
 *
 * @command create
 * @text create
 * @desc Generates an item slot.
 *
 * @command show
 * @text show
 * @desc Displays the item slot.
 *
 * @command update
 * @text update
 * @desc Updates the item slot with the items you currently own.
 *
 * @command hide
 * @text hide
 * @desc Hide the item slot.
 */

/*:ja
 * @target MZ
 * @plugindesc アイテムスロットプラグイン。
 * @author BananaPepperTK
 *
 * @help マップ上にアイテムスロットを表示します。
 *
 * 詳細
 *   https://github.com/sevenspice/ItemSlot
 *
 * @param BackgroundColor
 * @desc スロットの背景色。
 * @default 0x000000
 *
 * @param SlotCount
 * @desc スロットの数。最小:1 最大:9
 * @default 5
 *
 * @param SlotMarginLeft
 * @desc スロット間の左マージン。
 * @default 10
 *
 * @param SlotMarginRight
 * @desc スロット間の右マージン。
 * @default 10
 *
 * @param SlotMarginTop
 * @desc スロットの上マージン。
 * @default 10
 *
 * @param SlotMarginBottom
 * @desc スロットの下マージン。
 * @default 10
 *
 * @param VerticalAlign
 * @desc アイテムスロットの配置位置。BOTTOM or TOP
 * @default BOTTOM
 *
 * @param SlotFontSize
 * @desc スロットに描画される数字のフォントサイズ。
 * @default 10
 *
 * @param ItemSlotFontSize
 * @desc アイテム一覧に描画される数字のフォントサイズ。
 * @default 15
 *
 * @param LineWeight
 * @desc 選択枠の線の太さ。
 * @default 2
 *
 * @param LineColor
 * @desc 選択枠の色。
 * @default 0xF0E68C
 *
 * @param LineMargin
 * @desc 選択枠の上下左右マージン。
 * @default 8
 *
 * @command create
 * @text 生成
 * @desc アイテムスロットを生成します。
 *
 * @command show
 * @text 表示
 * @desc アイテムスロットを表示します。
 *
 * @command update
 * @text 更新
 * @desc アイテムスロットを現在所有しているアイテムで更新します。
 *
 * @command hide
 * @text 非表示
 * @desc アイテムスロットを非表示にします。
 * 
 */
// グローバル変数を追加する
// このプラグインを有効化すると追加されるため競合に注意すること

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

window.$gameItemSlot = null;

(function () {
  var pluginName = 'ItemSlot';
  var iconSet = ImageManager.loadSystem('IconSet');
  var itemSlotEnable = false;
  Input.keyMapper['49'] = '1';
  Input.keyMapper['50'] = '2';
  Input.keyMapper['51'] = '3';
  Input.keyMapper['52'] = '4';
  Input.keyMapper['53'] = '5';
  Input.keyMapper['54'] = '6';
  Input.keyMapper['55'] = '7';
  Input.keyMapper['56'] = '8';
  Input.keyMapper['57'] = '9'; // アイテムスロットの配置位置定義

  var SLOT_VERTICAL_ALIGN = {
    TOP: Symbol(),
    BOTTOM: Symbol()
  }; // 枠の背景色

  var backgroundColor = 0x000000; // 枠の透明度

  var backgroundAlpha = 0.3; // 枠の角丸の半径

  var radius = 10; // 配置するアイテムスロット枠数

  var slotCount = 9; // 枠のマージン

  var slotMarginLeft = 10;
  var slotMarginRight = 10;
  var slotMarginTop = 10;
  var slotMarginBottom = 10; // アイテムスロットの配置位置

  var verticalAlign = SLOT_VERTICAL_ALIGN.BOTTOM; // 選択枠

  var lineWeight = 2;
  var lineColor = 0xF0E68C;
  var lineMargin = 8; // スロットに描画するフォントのサイズ

  var slotFontSize = 10; // アイテム一覧に描画するスロットIDのフォントサイズ

  var itemSlotFontSize = 15; // プラグイン初期化
  // コマンドパラメーターの取得

  var parameters = PluginManager.parameters(pluginName);
  backgroundColor = parseInt(parameters['BackgroundColor'], 16);
  slotCount = parseInt(parameters['SlotCount']);
  if (slotCount <= 0) slotCount = 1;
  if (slotCount > 9) slotCount = 9;
  slotMarginLeft = parseInt(parameters['SlotMarginLeft']);
  slotMarginRight = parseInt(parameters['SlotMarginRight']);
  slotMarginTop = parseInt(parameters['SlotMarginTop']);
  slotMarginBottom = parseInt(parameters['SlotMarginBottom']);
  if (parameters['VerticalAlign'] == 'TOP') verticalAlign = SLOT_VERTICAL_ALIGN.TOP;else if (parameters['VerticalAlign'] == 'BOTTOM') verticalAlign = SLOT_VERTICAL_ALIGN.BOTTOM;else verticalAlign = SLOT_VERTICAL_ALIGN.BOTTOM;
  slotFontSize = parseInt(parameters['SlotFontSize']);
  itemSlotFontSize = parseInt(parameters['ItemSlotFontSize']);
  lineWeight = parseInt(parameters['LineWeight']);
  lineColor = parseInt(parameters['LineColor'], 16);
  lineMargin = parseInt(parameters['LineMargin']); // スロットに使用する文字のスタイル

  var slotFontStyle = new PIXI.TextStyle({
    fill: 'white',
    fontWeight: 'bold',
    strokeThickness: 4,
    miterLimit: 15,
    align: 'center',
    fontSize: slotFontSize
  }); // プラグインで使用する関数群

  /**
   * アイテムのアイコン画像を取得する関数。
   * @param {Bitmap}  iconset  アイコン一覧のスプライト
   * @param {integer} iconIdex アイコン番号
   * @return {Bitmap} アイコンのビットマップを返却。
   */

  var getIcon = function getIcon(iconset, iconIdex) {
    var iconX = iconIdex % 16 * ImageManager.iconWidth;
    var iconY = Math.floor(iconIdex / 16) * ImageManager.iconHeight;
    var bitmap = new Bitmap(ImageManager.iconWidth, ImageManager.iconHeight);
    bitmap.blt(iconset, iconX, iconY, ImageManager.iconWidth, ImageManager.iconHeight, 0, 0, ImageManager.iconWidth, ImageManager.iconHeight);
    return bitmap;
  };
  /**
   * オブジェクトがMZでのアイテムであるかどうかを判定する関数。
   * @param  {object} item アイテムオブジェクト
   * @return {boolean} アイテムオブジェクトならばtrueを返却。
   */


  var isItem = function isItem(item) {
    if (item) {
      return 'itypeId' in item;
    }

    return false;
  };
  /**
   * アイテムウィンドウからスロットにアイテムをセットする関数。
   * @param  {integer} inputKey キー番号
   * @return {boolean} スロットへのセットに失敗したらfalseを返却。
   */


  var slotSet = function slotSet(inputKey) {
    if (SceneManager._scene instanceof Scene_Item) {
      // アイテムを取得する
      var item = SceneManager._scene._itemWindow.itemAt(SceneManager._scene._itemWindow.index());

      if (!isItem(item)) return false; // プレイヤーの所有しているアイテムに選択されキーを設定する

      if (_typeof($gameSystem._gameItemSlotData) != 'object') return false;

      if ($gameSystem._gameItemSlotData[inputKey]) {
        // 対象スロットから取り消し
        if ($gameSystem._gameItemSlotData[inputKey].id == item.id) $gameSystem._gameItemSlotData[inputKey] = null;
      } else {
        // 既にスロットにセットされているアイテムの場合は処理を終了する
        var keys = Object.keys($gameSystem._gameItemSlotData);

        for (var i = 0; i < keys.length; i++) {
          if ($gameSystem._gameItemSlotData[keys[i]]) {
            var id = $gameSystem._gameItemSlotData[keys[i]].id;
            if (item.id == id) return false;
          }
        } // 対象スロットへセット


        $gameSystem._gameItemSlotData[inputKey] = item;
      }

      SceneManager._scene._itemWindow.refresh();

      return true;
    }
  };
  /**
   * アイテムスロットクラス。
   */


  var ItemSlot = /*#__PURE__*/function () {
    function ItemSlot(_slotCount, _slotMarginLeft, _slotMarginRight, _slotMarginTop, _slotMarginBottom, _verticalAlign, _radius, _backgroundColor, _backgroundAlpha, _slotFontStyle, _iconSet, _lineWeight, _lineColor, _lineMargin) {
      _classCallCheck(this, ItemSlot);

      this.slotCount = _slotCount;
      this.slotMarginLeft = _slotMarginLeft;
      this.slotMarginRight = _slotMarginRight;
      this.slotMarginTop = _slotMarginTop;
      this.slotMarginBottom = _slotMarginBottom;
      this.verticalAlign = _verticalAlign;
      this.radius = _radius;
      this.backgroundColor = _backgroundColor;
      this.backgroundAlpha = _backgroundAlpha;
      this.slotFontStyle = _slotFontStyle;
      this.iconSet = _iconSet;
      this.lineWeight = _lineWeight;
      this.lineColor = _lineColor;
      this.lineMargin = _lineMargin; // スロット

      this.slots = []; // スロット枠のサイズ

      this.slotWidth = SceneManager._scene._spriteset._tilemap._tileWidth;
      this.slotHeight = SceneManager._scene._spriteset._tilemap._tileHeight; // アイテムスロット全体の幅と高さを算出する

      this.boxWidth = Math.floor((this.slotWidth + this.slotMarginLeft + this.slotMarginRight) * this.slotCount);
      this.boxHeight = Math.floor(this.slotHeight + this.slotMarginTop + this.slotMarginBottom); // アイテムスロットの配置開始位置を算出する

      this.startX = Math.floor((Graphics.width - this.boxWidth) / 2 + this.slotMarginLeft);
      if (this.verticalAlign == SLOT_VERTICAL_ALIGN.BOTTOM) this.startY = Math.floor(Graphics.height - this.boxHeight);else if (this.verticalAlign == SLOT_VERTICAL_ALIGN.TOP) this.startY = this.slotMarginTop;else this.startY = Math.floor(Graphics.height - this.boxHeight);

      for (var i = 0; i < this.slotCount; i++) {
        // スロットの表示位置の算出
        var x = this.startX + i * (this.slotMarginLeft + this.slotWidth + this.slotMarginRight);
        var y = this.startY;
        var slot = new Slot(i + 1, x, y, this.slotWidth, this.slotHeight, this.radius, this.backgroundColor, this.backgroundAlpha, this.slotFontStyle, this.iconSet, this.lineWeight, this.lineColor, this.lineMargin);
        this.slots.push(slot);
      }

      return ItemSlot.instance;
    }
    /**
     * アイテムスロットを描画する。
     * @return {undefined}
     */


    _createClass(ItemSlot, [{
      key: "show",
      value: function show() {
        for (var i = 0; i < this.slotCount; i++) {
          this.slots[i].show();
        }
      }
      /**
       * アイテムスロットにセットされたアイテム情報とスロットの描画を更新する。
       * @return {undefined}
       */

    }, {
      key: "update",
      value: function update() {
        // パーティーが所有しているアイテムと個数の一覧
        var partyItems = $gameParty._items;

        if (_typeof($gameSystem._gameItemSlotData) != 'object' || Object.keys($gameSystem._gameItemSlotData).length <= 0) {
          // スロットの情報がない場合
          $gameSystem._gameItemSlotData = {};

          for (var i = 0; i < this.slotCount; i++) {
            $gameSystem._gameItemSlotData[i + 1] = null;
          } // 描画


          for (var _i = 0; _i < this.slotCount; _i++) {
            this.slots[_i].isClick = false;

            this.slots[_i].update(null);
          }
        } else {
          // スロット情報がある場合
          var slotItems = $gameSystem._gameItemSlotData;
          var keys = [];
          keys = Object.keys(slotItems); // まず所有しているアイテムがなくなっている場合を確認する

          for (var _i2 = 0; _i2 < keys.length; _i2++) {
            if (slotItems[keys[_i2]]) {
              if (!$gameParty._items[slotItems[keys[_i2]].id]) {
                // アイテムをすでに所有していない場合はスロットから外す
                $gameSystem._gameItemSlotData[keys[_i2]] = null;
              }
            }
          } // 更新


          slotItems = $gameSystem._gameItemSlotData;
          keys = Object.keys(slotItems); // スロットにアイテムを渡して描画

          for (var _i3 = 0; _i3 < this.slotCount; _i3++) {
            if (slotItems[keys[_i3]]) {
              slotItems[keys[_i3]].haveCount = partyItems[slotItems[keys[_i3]].id]; // アイテムに所持数情報を追加・更新する

              this.slots[keys[_i3] - 1].update(slotItems[keys[_i3]]);
            } else {
              this.slots[keys[_i3] - 1].update(null);
            }
          }
        }
      }
      /**
       * アイテムスロットを消す。
       * @return {undefined}
       */

    }, {
      key: "hide",
      value: function hide() {
        for (var i = 0; i < this.slotCount; i++) {
          this.slots[i].hide();
        }
      }
    }]);

    return ItemSlot;
  }();
  /**
   * スロットクラス
   */


  var Slot = /*#__PURE__*/function () {
    function Slot(id, x, y, width, height, radius, color, alpha, fontStyle, iconSet, lineWeight, lineColor, lineMargin) {
      _classCallCheck(this, Slot);

      this.id = id;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.radius = radius;
      this.color = color;
      this.alpha = alpha;
      this.fontStyle = fontStyle;
      this.iconSet = iconSet;
      this.lineWeight = lineWeight;
      this.lineColor = lineColor;
      this.lineMargin = lineMargin;
      this.item = null;
      this.isClick = false;
      this.current = null;
      this.number = null;
      this.slot = null;
      this.icon = null;
      this.count = null;
    }
    /**
     * スロットを描画する。
     * @return {undefined}
     */


    _createClass(Slot, [{
      key: "show",
      value: function show() {
        if (this.number != null) SceneManager._scene.removeChild(this.number);
        if (this.slot != null) SceneManager._scene.removeChild(this.slot);
        if (this.icon != null) SceneManager._scene.removeChild(this.icon);
        if (this.current != null) SceneManager._scene.removeChild(this.current);
        if (this.count != null) SceneManager._scene.removeChild(this.count);

        if (SceneManager._scene instanceof Scene_Map) {
          var slot = null;
          var icon = null;
          var count = null;
          var number = null;
          var current = null; // 枠生成

          slot = new PIXI.Graphics();
          slot.lineStyle(0);
          slot.beginFill(this.color);
          slot.drawRoundedRect(this.x, this.y, this.width, this.height, this.radius);
          slot.endFill();
          slot.alpha = this.alpha; // 選択状態生成

          if (this.isClick) {
            current = new PIXI.Graphics();
            current.lineStyle(this.lineWeight, this.lineColor);
            current.drawRoundedRect(Math.floor(this.x - this.lineMargin), Math.floor(this.y - this.lineMargin), Math.floor(this.width + this.lineMargin * 2), Math.floor(this.height + this.lineMargin * 2), this.radius);
          } // キー番号生成


          number = new PIXI.Text(this.id, this.fontStyle);
          number.x = Math.floor(this.x + (this.width - number.width) / 2);
          number.y = Math.floor(this.y - number.height / 2);

          if (this.item) {
            var iconIndex = this.item.iconIndex;
            var haveCount = this.item.haveCount;

            if (haveCount > 99) {
              haveCount = 99;
            } // 表示するアイコン生成


            icon = new Sprite();
            icon.bitmap = getIcon(this.iconSet, iconIndex);
            var iconX = this.x + Math.floor((this.width - ImageManager.iconWidth) / 2);
            var iconY = this.y + Math.floor((this.height - ImageManager.iconHeight) / 2);
            icon.x = iconX;
            icon.y = iconY;
            icon.alpha = 1.0; // 所持数

            count = new PIXI.Text(haveCount, this.fontStyle);
            count.x = Math.floor(this.x + this.width - count.width - 5);
            count.y = Math.floor(this.y + this.height - count.height - 5);
          }

          if (slot != null) this.slot = SceneManager._scene.addChild(slot);
          if (icon != null) this.icon = SceneManager._scene.addChild(icon);
          if (count != null) this.count = SceneManager._scene.addChild(count);
          if (number != null) this.number = SceneManager._scene.addChild(number);
          if (current != null) this.current = SceneManager._scene.addChild(current);
        }
      }
      /**
       * スロットを更新する。
       * @param {object} item 表示するアイテム
       * @return {undefined}
       */

    }, {
      key: "update",
      value: function update(item) {
        this.item = item;
        this.show();
      }
      /**
       * スロットを非表示にする。
       * @return {undefined}
       */

    }, {
      key: "hide",
      value: function hide() {
        if (this.number != null) SceneManager._scene.removeChild(this.number);
        if (this.slot != null) SceneManager._scene.removeChild(this.slot);
        if (this.icon != null) SceneManager._scene.removeChild(this.icon);
        if (this.current != null) SceneManager._scene.removeChild(this.current);
        if (this.count != null) SceneManager._scene.removeChild(this.count);
      }
    }]);

    return Slot;
  }();
  /**
   * アイテムセット用ボタンクラス。
   */


  var SetButton = /*#__PURE__*/function () {
    function SetButton(_slotCount) {
      _classCallCheck(this, SetButton);

      this.width = ImageManager.iconWidth;
      this.height = ImageManager.iconHeight;
      this.slotCount = _slotCount;
      this.numButtoms = [];
      this.buttonsX = [];
      this.buttonsY = [];
      this.colors = [];
      this.buttonsX[0] = 10;
      this.buttonsY[0] = 10;
      this.colors[0] = 0x000000;

      for (var i = 1; i < this.slotCount; i++) {
        this.numButtoms.push(null);
        this.buttonsX[i] = this.buttonsX[i - 1] + Math.floor(this.width * 1.5);
        this.buttonsY[i] = this.buttonsY[i - 1];
        this.colors[i] = 0x000000;
      }

      this.fontStyle = new PIXI.TextStyle({
        fill: 'white',
        fontWeight: 'bold',
        strokeThickness: 4,
        miterLimit: 15,
        align: 'center',
        fontSize: 24
      });
      this.numbers = [];
      this.numbersX = [];
    }
    /**
     * 数値ボタンを表示する。
     * @return {undefined}
     */


    _createClass(SetButton, [{
      key: "show",
      value: function show() {
        for (var i = 0; i < this.slotCount; i++) {
          if (this.numbers[i] != null) SceneManager._scene.removeChild(this.numbers[i]);
          if (this.numButtoms[i] != null) SceneManager._scene.removeChild(this.numButtoms[i]);
        } // アイテム画面でのみ描画


        if (SceneManager._scene instanceof Scene_Item) {
          var numbers = [];
          var numButton = [];

          for (var _i4 = 0; _i4 < this.slotCount; _i4++) {
            // 枠生成
            numButton[_i4] = new PIXI.Graphics();

            numButton[_i4].lineStyle(0);

            numButton[_i4].beginFill(this.colors[_i4]);

            numButton[_i4].drawRoundedRect(this.buttonsX[_i4], this.buttonsY[_i4], this.width, this.height, 10);

            numButton[_i4].endFill();

            numButton[_i4].alpha = 0.5;
            if (numButton[_i4] != null) this.numButtoms[_i4] = SceneManager._scene.addChild(numButton[_i4]);
          }

          for (var _i5 = 0; _i5 < this.slotCount; _i5++) {
            numbers[_i5] = new PIXI.Text(_i5 + 1, this.fontStyle);
            numbers[_i5].x = Math.floor(this.buttonsX[_i5] + (this.width - numbers[_i5].width) / 2);
            numbers[_i5].y = Math.floor(this.buttonsY[_i5] + (this.height - numbers[_i5].height) / 2);
            if (numbers[_i5] != null) this.numbers[_i5] = SceneManager._scene.addChild(numbers[_i5]);
          }
        }
      }
      /**
       * 数値ボタンを更新する。
       * @param {integer} index 対象の数値ボタン
       * @param {integer} color 変更する色
       * @return {undefined}
       */

    }, {
      key: "update",
      value: function update(index, color) {
        var tempColor = this.color;
        this.colors[index] = color; // 描画

        this.show();
        this.colors[index] = tempColor;
      }
    }]);

    return SetButton;
  }(); // ------------------------------------
  // 以下はプラグインコマンド実行処理群
  // ------------------------------------

  /**
   * アイテムスロットの呼び出し。
   * ※ アイテムスロットを使用する場合は最低1回は呼び出しが必要。
   */


  var itemslot = null;
  var setButton = null;
  PluginManager.registerCommand(pluginName, 'create', function () {
    // 競合対策
    // スロットのデータ保存先を変えるマイグレーション処理
    if (_typeof($gameParty._items.slots) == 'object') {
      $gameSystem._gameItemSlotData = _objectSpread({}, $gameParty._items.slots);
      delete $gameParty._items['slots'];
    } // スロット生成


    if (!itemslot) {
      itemslot = new ItemSlot(slotCount, slotMarginLeft, slotMarginRight, slotMarginTop, slotMarginBottom, verticalAlign, radius, backgroundColor, backgroundAlpha, slotFontStyle, iconSet, lineWeight, lineColor, lineMargin); // グローバル変数に追加

      window.$gameItemSlot = itemslot; // -------------------------------------------
      // 以下はツクールMZから呼び出すためのAPIの定義
      // -------------------------------------------

      /**
       * 選択されているスロットにセットされているアイテムを返却する。
       * @param {string} key アイテムから取得したい情報のキー名
       * @return {object} 指定されたキーのアイテム情報。
       */

      window.$gameItemSlot.currentItem = function (key) {
        var slots = window.$gameItemSlot.slots;
        var item = null;

        for (var i = 0; i < slots.length; i++) {
          if (slots[i].isClick) item = slots[i].item;
        }

        if (!itemSlotEnable) return '';
        if (!item) return '';
        return item[key];
      };

      if (_typeof($gameSystem._gameItemSlotData) == 'object') {
        // セーブデータ対策
        // 過去のセーブデータよりスロット数を少ない仕様になった場合に既にセットされているアイテムを切り捨てる
        var keys = Object.keys($gameSystem._gameItemSlotData);

        if (itemslot.slotCount < keys.length) {
          var slots = {};

          for (var i = 0; i < slotCount; i++) {
            slots[i + 1] = $gameSystem._gameItemSlotData[i + 1];
          } // 入れ替え


          $gameSystem._gameItemSlotData = slots;
        } else if (itemslot.slotCount > keys.length) {
          // 多い場合は入れ物を追加しておく
          for (var _i6 = keys.length; _i6 < itemslot.slotCount; _i6++) {
            $gameSystem._gameItemSlotData[_i6 + 1] = null;
          }
        }
      }
    }
  });
  /**
   * アイテムスロット表示。
   */

  PluginManager.registerCommand(pluginName, 'show', function () {
    if (itemslot) itemslot.show();
    itemSlotEnable = true;
  });
  /**
   * アイテムスロット更新。
   */

  PluginManager.registerCommand(pluginName, 'update', function () {
    if (itemslot) itemslot.update();
    itemSlotEnable = true;
  });
  /**
   * アイテムスロット非表示。
   */

  PluginManager.registerCommand(pluginName, 'hide', function () {
    if (itemslot) itemslot.hide();
    itemSlotEnable = false;
  }); // -------------------------------------------
  // 以下はツクールMZにある機能を改造する処理群
  // -------------------------------------------

  /**
   * Game_Systemにスロットのデータの保存先を作成する
   */

  var _Game_System_initialize = Game_System.prototype.initialize;

  Game_System.prototype.initialize = function () {
    _Game_System_initialize.apply(this, arguments);

    this._gameItemSlotData = {};
  };
  /**
   * シーン更新時の挙動を改造する。
   * 入力判定系の処理を追加する。
   */


  var _SceneManager_updateMain = SceneManager.updateMain;

  SceneManager.updateMain = function () {
    _SceneManager_updateMain.apply(this, arguments); // アイテム画面からスロットセット処理


    for (var i = 0; i < slotCount; i++) {
      var inputKey = "".concat(i + 1);

      if (Input.isTriggered(inputKey)) {
        slotSet(inputKey);
      }
    } // マップ上のアイテムスロットマウス左クリック


    if (itemslot && SceneManager._scene instanceof Scene_Map && TouchInput.isTriggered()) {
      var clickX = TouchInput.x;
      var clickY = TouchInput.y; // スロットをクリックされたかどうかを判定する

      for (var _i7 = 0; _i7 < slotCount; _i7++) {
        if (clickX >= itemslot.slots[_i7].x && clickX <= itemslot.slots[_i7].x + itemslot.slots[_i7].width && clickY >= itemslot.slots[_i7].y && clickY <= itemslot.slots[_i7].y + itemslot.slots[_i7].height && itemSlotEnable) {
          itemslot.slots[_i7].isClick = true; // 選択されたスロット以外は false にする

          for (var j = 0; j < slotCount; j++) {
            if (_i7 != j) itemslot.slots[j].isClick = false;
          }
        }
      } // アイテムスロットを更新


      if (itemSlotEnable) itemslot.update();
    } // アイテム画面上の数字ボタンマウス左クリック


    if (setButton && SceneManager._scene instanceof Scene_Item && TouchInput.isTriggered()) {
      var _clickX = TouchInput.x;
      var _clickY = TouchInput.y; // 数字ボタンをクリックされたか判定する

      for (var _i8 = 0; _i8 < slotCount; _i8++) {
        if (_clickX >= setButton.buttonsX[_i8] && _clickX <= setButton.buttonsX[_i8] + setButton.width && _clickY >= setButton.buttonsY[_i8] && _clickY <= setButton.buttonsY[_i8] + setButton.height && itemSlotEnable) {
          slotSet(_i8 + 1);
          setButton.update(_i8, 0xFFFFFF);
        }
      }
    } else if (setButton && SceneManager._scene instanceof Scene_Item && TouchInput.isReleased()) {
      for (var _i9 = 0; _i9 < slotCount; _i9++) {
        setButton.update(_i9, setButton.colors[_i9]);
      }
    }
  };
  /**
   * マップをタッチされた際の挙動を改造する。
   * スロットをクリックされた場合は移動させない。
   */


  var _Scene_Map_prototype_onMapTouch = Scene_Map.prototype.onMapTouch;

  Scene_Map.prototype.onMapTouch = function () {
    if (itemslot) {
      var clickX = TouchInput.x;
      var clickY = TouchInput.y;
      var canMove = true;

      for (var i = 0; i < slotCount; i++) {
        if (clickX >= itemslot.slots[i].x && clickX <= itemslot.slots[i].x + itemslot.slots[i].width && clickY >= itemslot.slots[i].y && clickY <= itemslot.slots[i].y + itemslot.slots[i].height && itemSlotEnable) {
          canMove = false;
        }
      }

      if (canMove) return _Scene_Map_prototype_onMapTouch.apply(this, arguments);
      return;
    } else {
      return _Scene_Map_prototype_onMapTouch.apply(this, arguments);
    }
  };
  /**
   * アイテムリストのアイテム描画を改造する。
   * セットしているスロットIDをアイテム名描画部分に追記する。
   */


  var _Window_Base_prototype_drawItemName = Window_Base.prototype.drawItemName;

  Window_Base.prototype.drawItemName = function (item, x, y, width) {
    _Window_Base_prototype_drawItemName.apply(this, arguments);

    if (!isItem(item)) return;
    var keys = Object.keys($gameSystem._gameItemSlotData);

    for (var i = 0; i < keys.length; i++) {
      if ($gameSystem._gameItemSlotData[keys[i]] && $gameSystem._gameItemSlotData[keys[i]].id == item.id) {
        this.contents.fontSize = itemSlotFontSize;
        this.contents.drawText(keys[i], x, Math.floor(y + this.contents.fontSize / 3), width, 0, 'left');
        this.resetFontSettings();
      }
    }
  };
  /**
   * マップシーン開始時の挙動を改造する。
   * マップシーン開始時にアイテムスロットも更新する。
   */


  var _Scene_Map_prototype_start = Scene_Map.prototype.start;

  Scene_Map.prototype.start = function () {
    _Scene_Map_prototype_start.apply(this, arguments);

    if (itemSlotEnable && itemslot) itemslot.update();
  };
  /**
   * アイテム画面表示時の挙動を改造する。
   * スロットセット用の数値ボタンを描画する。
   */


  var _Scene_Item_prototype_createItemWindow = Scene_Item.prototype.createItemWindow;

  Scene_Item.prototype.createItemWindow = function () {
    _Scene_Item_prototype_createItemWindow.apply(this, arguments);

    if (!setButton) setButton = new SetButton(slotCount);
    setButton.show();
  };
  /**
   * メッセージウィンドウ表示時の挙動を改造する。
   * メッセージウィンドウ表示時はアイテムスロットは表示しない。
   */


  var _Window_Message_prototype_startMessage = Window_Message.prototype.startMessage;

  Window_Message.prototype.startMessage = function () {
    _Window_Message_prototype_startMessage.apply(this, arguments);

    if (SceneManager._scene instanceof Scene_Map && itemSlotEnable) {
      if (itemslot) itemslot.hide();
    }
  };
  /**
   * メッセージウィンドウ終了時の挙動を改造する。
   * メッセージウィンドウ終了時はアイテムスロットは表示する。
   */


  var _Window_Message_prototype_terminateMessage = Window_Message.prototype.terminateMessage;

  Window_Message.prototype.terminateMessage = function () {
    _Window_Message_prototype_terminateMessage.apply(this, arguments);

    if (SceneManager._scene instanceof Scene_Map && itemSlotEnable) {
      if (itemslot) itemslot.update();
    }
  };
})();
},{}]},{},["bYsW"], null)