//=============================================================================
// WindowSkinSwitcher.js
//=============================================================================
// ----------------------------------------------------------------------------
// (C)2021 maguros
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.3 2021/03/21 軽微な修正
// 1.0.2 2021/03/16 URLの間違いを修正
// 1.0.1 2021/03/15 ヘルプ文言の修正およびリファクタリング
// 1.0.0 2021/03/14 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/maguros3/
// [GitHub] : https://github.com/maguros/
//=============================================================================

/*:
 * @plugindesc ウィンドウスキン切り替えプラグイン
 * @target MZ
 * @url https://github.com/maguros/RPGMakerMZ_Plugins/blob/master/SampleProject/js/plugins/WindowSkinSwitcher.js
 * @author maguros
 * @base PluginCommonBase
 *
 * @param SkinInfoList
 * @text ウィンドウスキン一覧
 * @desc 切り替えるウィンドウスキンを登録します。何も登録されていない場合はデフォルトのウィンドウが表示されます。
 * @type struct<SkinInfo>[]
 * 
 * @command SWITCH_SKIN
 * @text ウィンドウスキン切り替え
 * @desc ウィンドウスキンを指定したスキンIDに対応するスキンに切り替えます。
 * 
 * @arg skin_id
 * @text スキンID
 * @desc 切り替えるウィンドウのスキンIDです。該当IDがない場合はデフォルトのウィンドウが表示されます。
 * @default 0
 * @type number
 * 
 * @command RESET_SKIN
 * @text ウィンドウスキン初期化
 * @desc ウィンドウスキンをデフォルトに戻します。
 * 
 * @help プラグインコマンドからウィンドウスキンの切り替えを行うプラグインです。
 * 使用するにはあらかじめ「ウィンドウスキン一覧」にウィンドウスキンを
 * 登録しておく必要があります。
 * 「ウィンドウスキン一覧」が未設定の場合はデフォルトのウィンドウスキン
 * （img/system/Window.png）が設定されます。
 * なお、登録するウィンドウスキンはRPGツクールMZの素材規格を満たしている
 * 必要があります。
 * 
 * ■プラグインコマンド
 * 　ウィンドウスキン切り替え：スキンIDに対応するウィンドウスキンに切り替えます。
 * 　ウィンドウスキン初期化：ウィンドウスキンをデフォルトに戻します。
 * 
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 * 
 * 利用規約：
 * 　作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * 　についても制限はありません。
 */

/*~struct~SkinInfo:
 * 
 * @param SkinID
 * @text スキンID
 * @desc ウィンドウスキンの呼び出しに使用する識別IDです。
 * それ以外のときはデフォルトのウィンドウが表示されます。default：0
 * @default 0
 * @type number
 * 
 * @param SkinFileName
 * @text ウィンドウスキン画像
 * @desc ウィンドウスキンとして使用する画像をシステム画像から指定します。
 * @default
 * @dir img/system
 * @type file
 * 
 * @param BackOpacity
 * @desc ウィンドウ背景の透明度を設定します。0〜255の間で設定可能で、数値が小さいほど透明に近くなります。
 * @default 192
 * @type number
 * @min 0
 * @max 255
 * 
 */

(() => {
    'use strict';
    const _script = document.currentScript;
    const _param = PluginManagerEx.createParameter(_script);

    let _window_skin = null;
    let _back_opacity = null;

    function setDefault() {
        _window_skin = ImageManager.loadSystem('Window');
        _back_opacity = 192;
    }

    PluginManagerEx.registerCommand(_script, 'SWITCH_SKIN', function(args) {
        if (_param.SkinInfoList.length === 0) return;

        const skin_info = _param.SkinInfoList.find((x) => x.SkinID === args.skin_id);
        if (skin_info) {
            _window_skin = ImageManager.loadSystem(skin_info.SkinFileName);
            _back_opacity = skin_info.BackOpacity;
        }
        else {
            setDefault();
        }
    });

    PluginManagerEx.registerCommand(_script, 'RESET_SKIN', function(args) {
        setDefault();
    });

    const _Window_Base_update = Window_Base.prototype.update;
    Window_Base.prototype.update = function() {
        _Window_Base_update.apply(this, arguments);

        if (!_window_skin || !_back_opacity) setDefault();
        this.windowskin = _window_skin;
        this.backOpacity = _back_opacity;
    };
})();