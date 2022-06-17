//=============================================================================
// PicturePriorityCustomize.js
// ----------------------------------------------------------------------------
// (C) 2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.7 2022/02/09 戦闘画面において下層ピクチャの表示位置が実際と比べてズレて表示される問題を修正
// 1.2.6 2021/08/05 上層ピクチャが画面シェイクに連動しない問題を修正
// 1.2.5 2020/11/02 NRP_DynamicMotionMZ.jsと併用したとき戦闘画面のピクチャを敵キャラの下に表示できなくなる競合を修正
// 1.2.4 2020/11/05 戦闘画面で使用するとエラーになる問題を修正
// 1.2.3 2020/09/06 座標の基準をUI幅ではなく画面幅に変更
// 1.2.2 2020/08/29 MZ向けにコード修正
// 1.2.1 2019/05/08 1.2.0の機能がYEP_BattleEngineCore.jsと併用すると無効になる競合を解消
// 1.2.0 2019/05/02 戦闘画面における下層ピクチャの表示優先度を微調整する機能を追加
// 1.1.3 2019/01/20 MenuCommonEvent.jsとの競合によるエラーを解消
// 1.1.2 2018/06/27 1.1.1の対応により発生したYEP_BattleEngineCore.jsとの競合を解消
// 1.1.1 2017/12/24 GALV_LayerGraphics.jsと併用したときに画像がちらつく競合を解消
// 1.1.0 2017/10/01 パラメータの型指定機能に対応
// 1.0.0 2017/03/20 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc PicturePriorityCustomizePlugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/PicturePriorityCustomize.js
 * @author triacontane
 *
 * @param UpperPictureId
 * @desc Pictures above the specified number will be displayed above the window.
 * @default 101
 * @type number
 *
 * @param LowerPictureId
 * @desc Pictures below the specified number will be displayed below the character and the butler.
 * @default 0
 * @type number
 *
 * @param LowerPictureZ
 * @desc The Z coordinate of the lower picture. You can adjust the display priority more finely by changing it.
 * @default 1
 * @type select
 * @option Lower Tile
 * @value 0
 * @option Lower Character
 * @value 1
 * @option Same Character
 * @value 3
 * @option Upper Tile
 * @value 4
 * @option Upper Character
 * @value 5
 * @option Shadow
 * @value 6
 * @option Balloon
 * @value 7
 * @option Destination
 * @value 9
 *
 * @param LowerPictureBattleZ
 * @desc Z coordinate of the lower picture of the battle screen.
 * @default 0
 * @type select
 * @option enemy
 * @value 0
 * @option animation
 * @value 1
 *
 * @help You can divide the picture into upper, middle and lower layers.
 * Upper: above the window
 * Mid: default priority
 * Lower: below the character
 *
 * This plugin is released under the MIT License.
 */
/*:ja
 * @plugindesc ピクチャの表示優先度調整プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/PicturePriorityCustomize.js
 * @author トリアコンタン
 *
 * @param 上層ピクチャ番号
 * @desc 指定した番号以上のピクチャはウィンドウより上に表示されるようになります。
 * @default 101
 * @type number
 *
 * @param 下層ピクチャ番号
 * @desc 指定した番号以下のピクチャはキャラクター、バトラーより下に表示されるようになります。
 * @default 0
 * @type number
 *
 * @param 下層ピクチャZ座標
 * @desc 下層ピクチャのZ座標です。変更することでより細かい表示優先度の調整ができます。
 * @default 1
 * @type select
 * @option 下層タイル
 * @value 0
 * @option 通常キャラの下
 * @value 1
 * @option 通常キャラと同じ
 * @value 3
 * @option 上層タイル
 * @value 4
 * @option 通常キャラの上
 * @value 5
 * @option 飛行船の影
 * @value 6
 * @option フキダシ
 * @value 7
 * @option マップタッチの行き先
 * @value 9
 *
 * @param 戦闘下層ピクチャZ座標
 * @desc 戦闘画面の下層ピクチャのZ座標です。変更することでより細かい表示優先度の調整ができます。
 * @default 0
 * @type select
 * @option 敵キャラ
 * @value 0
 * @option アニメーション
 * @value 1
 *
 * @help ピクチャを上層、中層、下層に分けて表示できます。
 * 上層：ウィンドウより上
 * 中層：デフォルトの優先度
 * 下層：キャラクターより下
 *
 * 下層ピクチャに対しては、Z座標を設定することで
 * より細かい表示優先度の調整ができます。
 *
 * ※それぞれのプライオリティの値
 * 0 : 下層タイル
 * 1 : 通常キャラの下
 * 3 : 通常キャラと同じ
 * 4 : 上層タイル
 * 5 : 通常キャラの上
 * 6 : 飛行船の影
 * 7 : フキダシ
 * 8 : アニメーション
 * 9 : マップタッチの行き先（白く光るヤツ）
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';
    const pluginName = 'PicturePriorityCustomize';

    //=============================================================================
    // ローカル関数
    //  プラグインパラメータやプラグインコマンドパラメータの整形やチェックをします
    //=============================================================================
    const getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (let i = 0; i < paramNames.length; i++) {
            const name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return '';
    };

    const getParamNumber = function(paramNames, min, max) {
        const value = getParamString(paramNames);
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        return (parseInt(value) || 0).clamp(min, max);
    };

    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    const param               = {};
    param.upperPictureId      = getParamNumber(['UpperPictureId', '上層ピクチャ番号']);
    param.lowerPictureId      = getParamNumber(['LowerPictureId', '下層ピクチャ番号']);
    param.lowerPictureZ       = getParamNumber(['LowerPictureZ', '下層ピクチャZ座標']);
    param.lowerPictureBattleZ = getParamNumber(['LowerPictureBattleZ', '戦闘下層ピクチャZ座標'], 0);

    //=============================================================================
    // Scene_Base
    //  ウィンドウの上にピクチャを配置します。
    //=============================================================================
    var _Scene_Base_createWindowLayer      = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function() {
        _Scene_Base_createWindowLayer.apply(this, arguments);
        if (this._spriteset) {
            this._spriteset.setUpperPictureContainer(this);
        }
    };

    //=============================================================================
    // Spriteset_Base
    //  ピクチャを三層に分割します。
    //=============================================================================
    var _Spriteset_Base_createPictures      = Spriteset_Base.prototype.createPictures;
    Spriteset_Base.prototype.createPictures = function() {
        _Spriteset_Base_createPictures.apply(this, arguments);
        this.removeChild(this._pictureContainer);
        this.createPictureLayer();
    };

    Spriteset_Base.prototype.createPictureLayer = function() {
        var width                   = Graphics.width;
        var height                  = Graphics.height;
        var x                       = 0;
        var y                       = 0;
        this._pictureContainerLower = new Sprite();
        this._pictureContainerLower.setFrame(x, y, width, height);
        this._pictureContainerMiddle = new Sprite();
        this._pictureContainerMiddle.setFrame(x, y, width, height);
        this._pictureContainerUpper = new Sprite();
        this._pictureContainerUpper.setFrame(x, y, width, height);
        var pictureArray = this._pictureContainer.children.clone();
        pictureArray.forEach(function(picture) {
            var pictureId = picture.getPictureId();
            if (pictureId <= param.lowerPictureId) {
                this._pictureContainerLower.addChild(picture);
            } else if (pictureId >= param.upperPictureId) {
                this._pictureContainerUpper.addChild(picture);
            } else {
                this._pictureContainerMiddle.addChild(picture);
            }
        }, this);
        this._pictureContainer.children = pictureArray;
        this.setLowerPictureContainer();
        this.setMiddlePictureContainer();
    };

    Spriteset_Base.prototype.setUpperPictureContainer = function(parentScene) {
        parentScene.addChild(this._pictureContainerUpper);
    };

    Spriteset_Base.prototype.setMiddlePictureContainer = function() {
        this.addChild(this._pictureContainerMiddle);
    };

    Spriteset_Base.prototype.setLowerPictureContainer = function() {
        this.addChild(this._pictureContainerLower);
    };

    var _Spriteset_Base_updatePosition = Spriteset_Base.prototype.updatePosition;
    Spriteset_Base.prototype.updatePosition = function() {
        _Spriteset_Base_updatePosition.apply(this, arguments);
        this._pictureContainerUpper.x = this.x;
        this._pictureContainerUpper.y = this.y;
    };

    //=============================================================================
    // Spriteset_Map
    //  下層ピクチャの位置を設定します。
    //=============================================================================
    Spriteset_Map.prototype.setLowerPictureContainer = function() {
        this._pictureContainerLower.z = param.lowerPictureZ;
        this._tilemap.addChild(this._pictureContainerLower);
    };

    //=============================================================================
    // Spriteset_Battle
    //  下層ピクチャの位置を設定します。
    //=============================================================================
    Spriteset_Battle.prototype.setLowerPictureContainer = function() {
        this.updateLowerPictureContainerZ();
        // resolve conflict for GALV_LayerGraphics.js
        if (typeof Imported !== 'undefined' && Imported.Galv_LayerGraphics) {
            this._pictureContainerLower.z = 2;
        }
        // resolve conflict for NRP_DynamicMotionMZ.js
        if (PluginManagerEx.isExistPlugin('NRP_DynamicMotionMZ')) {
            this._pictureContainerLower.z = param.lowerPictureBattleZ > 0 ? 10 : 0;
        }
        this._pictureContainerLower.y = -this._battleField.y;
        this._pictureContainerLower.x = -this._battleField.x;
    };

    Spriteset_Battle.prototype.updateLowerPictureContainerZ = function() {
        if (param.lowerPictureBattleZ > 0) {
            this._battleField.addChild(this._pictureContainerLower);
        } else {
            this._battleField.addChildAt(this._pictureContainerLower,  0);
        }
    };

    if (typeof Yanfly !== 'undefined' && Yanfly.BEC) {
        var _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
        Spriteset_Battle.prototype.update = function() {
            _Spriteset_Battle_update.apply(this, arguments);
            this.updateLowerPictureContainerZ();
        };
    }

    //=============================================================================
    // Sprite_Picture
    //  ピクチャIDを取得可能にします。
    //=============================================================================
    Sprite_Picture.prototype.getPictureId = function() {
        return this._pictureId;
    };
})();

