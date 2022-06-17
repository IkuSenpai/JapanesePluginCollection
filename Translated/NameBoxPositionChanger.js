//=============================================================================
// NameBoxPositionChanger.js
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
 * @plugindesc 名前ウィンドウの位置移動プラグイン
 * @target MZ
 * @url https://github.com/maguros/RPGMakerMZ_Plugins/blob/master/SampleProject/js/plugins/NameBoxPositionChanger.js
 * @author maguros
 * @base PluginCommonBase
 * 
 * @param Position
 * @text 表示位置
 * @desc 名前ウィンドウの位置を設定します。「プラグインコマンドを使う」がONの場合、この設定は無視されます。
 * @default Default
 * @type combo
 * @option Default
 * @option Left
 * @option Middle
 * @option Right
 * @option UpperLeft
 * @option UpperMiddle
 * @option UpperRight
 * @option LowerLeft
 * @option LowerMiddle
 * @option LowerRight
 * 
 * @param UsePluginCommand
 * @text プラグインコマンドを使う
 * @desc プラグインコマンドを使うかどうかの設定です。ONにするとプラグインコマンドから名前ウィンドウの位置が設定できるようになります。。
 * @default false
 * @type boolean
 * 
 * @command MOVE_NAMEBOX
 * @text 表示位置変更
 * @desc 名前ウィンドウの位置を動かします。
 * 
 * @arg Position
 * @text 表示位置
 * @desc 名前ウィンドウの位置を設定します。「プラグインコマンドを使う」がONの場合、この設定は無視されます。
 * @default Default
 * @type combo
 * @option Default
 * @option Left
 * @option Middle
 * @option Right
 * @option UpperLeft
 * @option UpperMiddle
 * @option UpperRight
 * @option LowerLeft
 * @option LowerMiddle
 * @option LowerRight
 * 
 * @command RESET_MOVE_NAMEBOX
 * @text 表示位置リセット
 * @desc 名前ウィンドウの位置をデフォルトに戻します。
 * 
 * @help メッセージウィンドウの名前ウィンドウの位置を動かすプラグインです。
 * 「表示位置」を設定することで以下のとおり、名前ウィンドウの位置を変更できます。
 * 
 * Default:     標準位置
 * Left:        左
 * Middle:      中央
 * Right:       右
 * UpperLeft:   上側左
 * UpperMiddle: 上側中央
 * UpperRight:  上側右
 * LowerLeft:   下側左
 * LowerMiddle: 下側中央
 * LowerRight:  下側右
 * 上記以外:     Defaultと同じ
 * 
 * 動くのは名前ウィンドウの位置のみで、メッセージウィンドウそのものは移動しません。
 * 下側ウィンドウメッセージ表示でLowerLeft, LowerMiddle, LowerRightを使いたい場合は
 * 別途ウィンドウ操作系のプラグインと併用してください。
 * プラグインコマンドもありますが、「プラグインコマンドを使う」がOFFの場合は機能しません。
 * 
 * ■プラグインコマンド
 * 　表示位置変更:     名前ウィンドウの位置を動かします。
 * 　表示位置リセット: 名前ウィンドウの位置をデフォルトに戻します。
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

(() => {
    'use strict';
    const _script = document.currentScript;
    const _param = PluginManagerEx.createParameter(_script);

    let _position = null;

    PluginManagerEx.registerCommand(_script, 'MOVE_NAMEBOX', function(args) {
        _position = args.Position;
    });

    PluginManagerEx.registerCommand(_script, 'RESET_MOVE_NAMEBOX', function(args) {
        _position = 'Default';
    });

    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function() {
        _Window_NameBox_updatePlacement.apply(this, arguments);

        let position = _position;
        if (!_param.UsePluginCommand) position = _param.Position;

        const messageWindow = this._messageWindow;
        const positionX = {
            width: null,
            get default() {
                if ($gameMessage.isRTL()) {
                    return messageWindow.x + messageWindow.width - this.width;
                } else {
                    return messageWindow.x;
                }
            },
            get left() {
                return messageWindow.x;
            },
            get middle() {
                return messageWindow.x + messageWindow.width / 2 - this.width / 2;
            },
            get right() {
                return messageWindow.x + messageWindow.width - this.width;
            }
        };

        const positionY = {
            height: null,
            get default() {
                if (messageWindow.y > 0) {
                    return messageWindow.y - this.height;
                } else {
                    return messageWindow.y + messageWindow.height;
                }
            },
            get upper() {
                return messageWindow.y - this.height;
            },
            get lower() {
                return messageWindow.y + messageWindow.height;
            }
        }
        
        positionX.width = this.width;
        positionY.height = this.height;

        switch (position) {
            case 'Default':
                this.x = positionX.default;
                this.y = positionY.default;
                break;
            case 'Left':
                this.x = positionX.left;
                this.y = positionY.default;
                break;
            case 'Middle':
                this.x = positionX.middle;
                this.y = positionY.default;
                break;
            case 'Right':
                this.x = positionX.right;
                this.y = positionY.default;
                break;
            case 'UpperLeft':
                this.x = positionX.left;
                this.y = positionY.upper;
                break;
            case 'UpperMiddle':
                this.x = positionX.middle;
                this.y = positionY.upper;
                break;
            case 'UpperRight':
                this.x = positionX.right;
                this.y = positionY.upper;
                break;
            case 'LowerLeft':
                this.x = positionX.left;
                this.y = positionY.lower;
                break;
            case 'LowerMiddle':
                this.x = positionX.middle;
                this.y = positionY.lower;
                break;
            case 'LowerRight':
                this.x = positionX.right;
                this.y = positionY.lower;
                break;
            default:
                this.x = positionX.default;
                this.y = positionY.default;
                break;
        }
    };
})();