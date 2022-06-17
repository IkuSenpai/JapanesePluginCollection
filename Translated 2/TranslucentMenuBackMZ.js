//=============================================================================
// TranslucentMenuBackMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Implement a transparent menu background
 * @author Tamaki Awana
 * @help
 * Implement a function to depict a transparent background
 * overlaid on the menu screen.
 * In addition, adding a function that allows you to set
 * whether to blur the map displayed under the translucent picture, and
 * setting to darken the background of the menu screen and game end screen.
 * 
 * How to use:
 * Put image file want to using for background in img/system,
 * and select picture on plugin parameter "Background Image".
 * If you set an image smaller than the screen size,
 * it will be displayed side by side in tiles.
 * Even if you don't set a background image,
 * you can still set the blur and darken background functions.
 *
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 *
 * Update History:
 * ver.1.2 Change the call destination of the background image to the img/system
 * ver.1.1.2 Corrected help typographical errors
 * ver.1.1.1 Corrected help typographical errors
 * ver.1.1 Tiling background supported
 *         Added function changing blend mode of background
 *         Bug fix: That could not be set to a state where
 *                  there is no background image
 * ver.1.0.1 English and RMMZ 1.3.2 supported.
 * ver.1.0 Release
 *
 * ---
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 *
 * @param Background Image
 * @desc Background image that use in menu scene
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 *
 * @param Background Opacity
 * @desc Opacity of background image
 * @type number
 * @min 0
 * @default 224
 *
 * @param Background Blend Mode
 * @desc Blend mode of background image
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1
 * @option Multiply
 * @value 2
 * @option Screen
 * @value 3
 * @default 0
 * 
 * @param Background Blur
 * @desc Whether to blur the lower part of the background
 * @on Blur
 * @off Don't blur
 * @default true
 * @type boolean
 *
 * @param Dark Background On Menu
 * @desc Whether to more darken the background of the menu screen
 * @on More darken
 * @off Don't more darken
 * @default true
 * @type boolean
 * 
 * @param Dark Background on GameEnd
 * @desc Whether to darken the background of the game end screen
 * @on Darken
 * @off Don't darken
 * @default true
 * @type boolean
 */
/*:ja
 * @target MZ
 * @plugindesc 透けるメニュー背景を実装します。
 * @author 沫那環
 * @help
 * メニュー画面に、透ける背景を重ねて描写する機能を実装します。
 * 加えて、背景の下に表示されるマップ画面のぼかしの有無や、
 * メニュー画面やゲーム終了画面の背景を暗くするかどうかの設定もできるようにしました。
 * 
 * 【使い方】
 * img/pictureフォルダに、背景として使用したい画像を入れて、
 * プラグインパラメータのBackground Imageから背景画像を選択してください。
 * 画面サイズより小さいサイズの画像を設定した場合、タイル状に並べて表示します。
 * ぼかしの有無と、背景を暗くする機能の切り替えは、背景画像を設定しなくても設定可能です。
 *
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 *
 * 【更新履歴】
 * ver.1.2 背景画像をimg/systemから呼び出す形に変更
 * ver.1.1.2 ヘルプの誤植を訂正
 * ver.1.1.1 ヘルプの誤植を訂正
 * ver1.1 タイル状の背景表示に対応
 *        背景画像の合成方法を選べる機能を追加
 *        背景画像がない状態に設定できなかった不具合を修正
 * ver.1.0.1 英語表示と、MZの1.3.2へ対応
 * ver.1.0 公開
 *
 * ---
 * このプラグインは MIT License にもとづいて提供されます。
 * https://opensource.org/licenses/mit-license.php
 *
 *
 * @param Background Image
 * @desc メニュー画面の背景に使用する画像
 * @type file
 * @require 1
 * @dir img/system
 * @default 
 *
 * @param Background Opacity
 * @desc 背景画像の透明度
 * @type number
 * @min 0
 * @default 224
 *
 * @param Background Blend Mode
 * @desc 背景画像の合成方法
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @option スクリーン
 * @value 3
 * @default 0
 * 
 * @param Background Blur
 * @desc 背景の下層部分にぼかしをかけるか
 * @on ぼかす
 * @off ぼかさない
 * @default true
 * @type boolean
 *
 * @param Dark Background On Menu
 * @desc メニュー画面の背景を暗くするか
 * @on 暗くする
 * @off 暗くしない
 * @default true
 * @type boolean
 * 
 * @param Dark Background on GameEnd
 * @desc ゲーム終了画面の背景を暗くするか
 * @on 暗くする
 * @off 暗くしない
 * @default true
 * @type boolean
 */
(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);
  const BgImg = String(parameters["Background Image"] || "");
  const BgOpacity = Number(parameters["Background Opacity"] || 224);
  const BgBlendMode = Number(parameters["Background Blend Mode"] || 0);
  const BgBlur = String(parameters["Background Blur"] || "true");
  const MenuBgDark = String(parameters["Dark Background On Menu"] || "true");
  const GEBgDark = String(parameters["Dark Background on GameEnd"] || "true");

  Scene_MenuBase.prototype.createBackground = function () {
    this._backgroundFilter = new PIXI.filters.BlurFilter();
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
    if (String(BgBlur) == "true") {
      this._backgroundSprite.filters = [this._backgroundFilter];
    }
    this.addChild(this._backgroundSprite);
    if (String(MenuBgDark) == "true") {
      this.setBackgroundOpacity(192);
    }
    if (BgImg) {
      this._backgroundSprite2 = new TilingSprite(ImageManager.loadSystem(BgImg));
      this._backgroundSprite2.move(0, 0, Graphics.width, Graphics.height);
      this._backgroundSprite2.opacity = BgOpacity;
      this._backgroundSprite2.blendMode = BgBlendMode;
      this.addChild(this._backgroundSprite2);
    }
  };

  Scene_GameEnd.prototype.createBackground = function () {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (String(GEBgDark) == "true") {
      this.setBackgroundOpacity(128);
    }
  };
})();