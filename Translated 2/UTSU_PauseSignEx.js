//=============================================================================
// UTSU_PauseSignEx.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utsuda Shinou
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.0 2020/08/28 Add support RPG Maker MZ
// 1.1.4 2020/08/28 Refactoring compatibility code
// 1.1.3 2020/08/25 Fix compatibility issue of NobleMushroom.js
// 1.1.2 2020/08/25 Refactoring
// 1.1.1 2020/08/25 Fix compatibility issue of PauseSignToTextEnd.js
// 1.1.0 2020/08/23 Add X/Y offset option
// 1.0.0 2020/08/21 Release
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
// [Twitter]: https://twitter.com/virtualUtsuda
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc ポーズサイン拡張
 * @author Utsuda Shinou
 * @url https://github.com/utsudashinou/RPGMakerMV
 *
 * @help ポーズサインの表示を調節します。
 *
 * 「ポーズサイン」
 * ポーズサイン用のスプライトシート画像を img/system に配置してください。
 * そのスプライトシート画像の仕様は 横5枚、縦N枚 です。
 * 1スプライトは正方形であり、大きさは 画像の横のピクセル数 / 5 の数値を採用します。
 *
 * 「使用するスプライト数」
 * 指定すると使用するスプライト数を変更できます。
 * 0以下を指定するとスプライトシート全体（5*N枚）となります。
 * このオプションは使用したいスプライト数が5の倍数でないときに使用してください。
 *
 * 「フレームレート」
 * ポーズサインのフレームレートを変更します。単位はframes per secondです。
 * RPGツクールMVは基本60fpsです。元のポーズサインはその1/16なので、
 * 初期値は3.75fpsです。
 *
 * 「X軸方向のオフセット」
 * 「Y軸方向のオフセット」
 * ポーズサインの表示位置にオフセットを加えます。
 * 位置をずらす時に設定してください。
 *
 * @param pauseSignImage
 * @text ポーズサイン
 * @desc ポーズサインのスプライトシート
 * 初期値: pauseSign
 * @type file
 * @dir img/system
 * @default pauseSign
 * @require 1
 *
 * @param pauseSignNum
 * @text 使用するスプライト数
 * @desc 使用するスプライト数（0以下の時は自動計算）
 * 初期値: 0
 * @type number
 * @default 0
 * @require 1
 *
 * @param pauseSignFrameRate
 * @text フレームレート
 * @desc フレームレート（単位はfps）
 * 初期値: 3.75
 * @type number
 * @decimals 2
 * @default 3.75
 * @require 1
 *
 * @param pauseSignOffsetX
 * @text X軸方向のオフセット
 * @desc X軸方向のオフセット
 * 初期値: 0
 * @type number
 * @min -9007199254740991
 * @max 9007199254740991
 * @default 0
 * @require 1
 *
 * @param pauseSignOffsetY
 * @text Y軸方向のオフセット
 * @desc Y軸方向のオフセット
 * 初期値: 0
 * @type number
 * @min -9007199254740991
 * @max 9007199254740991
 * @default 0
 * @require 1
 *
 */

(() => {
  const parameters = PluginManager.parameters("UTSU_PauseSignEx");
  const params = {};
  params.pauseSignImage = parameters["pauseSignImage"] || "pauseSign";
  params.pauseSignNum = Number(parameters["pauseSignNum"] || 0);
  params.pauseSignFrameRate = Number(parameters["pauseSignFrameRate"] || 3.75);
  params.pauseSignOffsetX = Number(parameters["pauseSignOffsetX"] || 0);
  params.pauseSignOffsetY = Number(parameters["pauseSignOffsetY"] || 0);
  params._pauseSignBitmap = null;
  params._pauseSignSize = 24;
  params._pauseSignSpriteCol = 5;

  const _Window_Base_loadWindowskin = Window_Base.prototype.loadWindowskin;
  Window_Base.prototype.loadWindowskin = function () {
    _Window_Base_loadWindowskin.call(this);
    params._pauseSignBitmap = ImageManager.loadSystem(params.pauseSignImage);
    params._pauseSignBitmap.addLoadListener((bitmap) => {
      // auto calculate params
      params._pauseSignSize = Math.floor(bitmap.width / params._pauseSignSpriteCol);
      if (params.pauseSignNum <= 0) {
        const pauseSignSpriteRow = Math.ceil(bitmap.height / params._pauseSignSize);
        params.pauseSignNum = pauseSignSpriteRow * params._pauseSignSpriteCol;
      }
    });
  };

  const _Window__refreshPauseSign = Window.prototype._refreshPauseSign;
  Window.prototype._refreshPauseSign = function () {
    _Window__refreshPauseSign.call(this);
    const sx = 0;
    const sy = 0;
    const p = params._pauseSignSize;
    const sprite = this._pauseSignSprite || this._windowPauseSignSprite;
    sprite.bitmap = params._pauseSignBitmap;
    sprite.setFrame(sx, sy, p, p);
    this._setPauseSignSpriteOffset(sprite);
  };

  Window.prototype.__updatePauseSignEx = function () {
    const sprite = this._pauseSignSprite || this._windowPauseSignSprite;
    const count = Math.floor((this._animationCount * params.pauseSignFrameRate) / 60);
    const x = (count % params.pauseSignNum) % params._pauseSignSpriteCol;
    const y = Math.floor((count % params.pauseSignNum) / params._pauseSignSpriteCol);
    const sx = 0;
    const sy = 0;
    const p = params._pauseSignSize;
    sprite.setFrame(sx + x * p, sy + y * p, p, p);
  };

  const _Window_Message__updatePauseSign = Window.prototype._updatePauseSign;
  Window.prototype._updatePauseSign = function () {
    _Window_Message__updatePauseSign.call(this);
    this.__updatePauseSignEx();
  };

  Window.prototype._setPauseSignSpriteOffset = function (position) {
    const sprite = this._pauseSignSprite || this._windowPauseSignSprite;
    sprite.x = position.x + params.pauseSignOffsetX;
    sprite.y = position.y + params.pauseSignOffsetY;
  };

  // PauseSignToTextEnd.js Compatible
  if (PluginManager._scripts.contains("PauseSignToTextEnd")) {
    const _Window_Message_setPauseSignToTextEnd = Window_Message.prototype.setPauseSignToTextEnd;
    Window_Message.prototype.setPauseSignToTextEnd = function () {
      _Window_Message_setPauseSignToTextEnd.call(this);
      const sprite = this._pauseSignSprite || this._windowPauseSignSprite;
      this._setPauseSignSpriteOffset(sprite);
    };
  }

  // NobleMushroom.js Compatible
  if (PluginManager._scripts.contains("NobleMushroom")) {
    // bad part...
    const _Window_Message_startPause = Window_Message.prototype.startPause;
    Window_Message.prototype.startPause = function () {
      if ("setPauseSignSpritePosition" in this && !this.__injected_NobleMushroom) {
        this.__injected_NobleMushroom = true;
        const _Window_NovelMessage_setPauseSignSpritePosition = this.setPauseSignSpritePosition;
        this.setPauseSignSpritePosition = function (position) {
          _Window_NovelMessage_setPauseSignSpritePosition.call(this, position);
          this._setPauseSignSpriteOffset(position);
        };
      }
      _Window_Message_startPause.call(this);
    };
  }
})();
