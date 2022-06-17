//=============================================================================
// StartUpFullScreen.js
// ----------------------------------------------------------------------------
// (C)2015 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.2.0 2021/12/30 イベントテスト実行時は全画面化を無効にするよう仕様変更
// 1.1.0 2021/11/04 MZで動作するよう修正
// 1.0.3 2019/01/14 1.0.3でコアスクリプトv1.6.1以前で逆に動作しなくなっていた問題を修正
// 1.0.2 2019/01/14 コアスクリプトv1.6.1以降で正常に動作していなかった問題を修正
// 1.0.1 2018/06/30 タイトルコマンドウィンドウのY座標整数になっていなかった問題を修正
// 1.0.0 2016/03/06 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc フルスクリーンで起動プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/StartUpFullScreen.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @param Shutdown
 * @text シャットダウン
 * @desc タイトル画面に追加するシャットダウンの項目名です。
 * ローカル環境での実行時のみ表示されます。
 * @default シャットダウン
 *
 * @param StartUpFullScreen
 * @text フルスクリーンで起動
 * @desc オプション画面に追加する全画面で起動の項目名です。
 * ローカル環境での実行時のみ表示されます。
 * @default フルスクリーンで起動
 *
 * @help StartUpFullScreen.js
 *
 * オプション画面に「フルスクリーンで起動」を追加します。
 * 有効な場合、ゲームをフルスクリーンで起動します。
 * またタイトル画面にシャットダウンを追加します。
 *
 * このプラグインはローカル環境で実行した場合のみ有効です。
 * イベントテスト実行時はテンポを優先し全画面化は無効となります。
 *
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

function Scene_Terminate() {
    this.initialize.apply(this, arguments);
}

(()=> {
    'use strict';

    // Nw.js環境下以外では一切の機能を無効
    if (!Utils.isNwjs()) {
        return;
    }

    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    //=============================================================================
    // Graphics
    //  privateメソッド「_requestFullScreen」を呼び出します。
    //=============================================================================
    Graphics.requestFullScreen = function() {
        if (!this._isFullScreenForPrevVersion()) {
            this._requestFullScreen();
        }
    };

    /**
     * @static
     * @method _isFullScreenForPrevVersion
     * @return {Boolean}
     * @private
     */
    Graphics._isFullScreenForPrevVersion = function() {
        return document.fullscreenElement ||
            document.mozFullScreen ||
            document.webkitFullscreenElement ||
            document.msFullscreenElement;
    };

    //=============================================================================
    // Scene_Boot
    //  フルスクリーンで起動する処理を追加します。
    //=============================================================================
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.apply(this, arguments);
        if (ConfigManager.startUpFullScreen && !DataManager.isEventTest()) {
            Graphics.requestFullScreen();
        }
    };

    //=============================================================================
    // Scene_Title
    //  シャットダウンの処理を追加定義します。
    //=============================================================================
    const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.apply(this, arguments);
        if (param.Shutdown) {
            this._commandWindow.setHandler('shutdown',  this.commandShutdown.bind(this));
        }
    };

    Scene_Title.prototype.commandShutdown = function() {
        this._commandWindow.close();
        this.fadeOutAll();
        SceneManager.goto(Scene_Terminate);
    };

    //=============================================================================
    // Window_TitleCommand
    //  シャットダウンの選択肢を追加定義します。
    //=============================================================================
    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
        if (param.Shutdown) {
            this.addCommand(param.Shutdown, 'shutdown');
            this.height = this.fittingHeight(this._list.length);
            this.createContents();
        }
    };

    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_maxCommands.apply(this, arguments) + 1;
    };

    //=============================================================================
    // ConfigManager
    //  オプションに「フルスクリーンで起動」項目を追加します。
    //=============================================================================
    ConfigManager.startUpFullScreen = false;

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        this.startUpFullScreen = this.readFlag(config, 'startUpFullScreen');
    };

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.apply(this, arguments);
        config.startUpFullScreen = this.startUpFullScreen;
        return config;
    };

    //=============================================================================
    // Window_Options
    //  オプションに「フルスクリーンで起動」項目を追加します。
    //=============================================================================
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.apply(this, arguments);
        this.addCommand(param.StartUpFullScreen, 'startUpFullScreen');
    };

    //=============================================================================
    // Scene_Terminate
    //  ゲームを終了します。
    //=============================================================================
    Scene_Terminate.prototype = Object.create(Scene_Base.prototype);
    Scene_Terminate.prototype.constructor = Scene_Terminate;

    Scene_Terminate.prototype.start = function() {
        SceneManager.terminate();
    };
})();

