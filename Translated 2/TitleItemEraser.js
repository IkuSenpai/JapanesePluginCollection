//=============================================================================
// TitleItemEraser.js
//=============================================================================
// ----------------------------------------------------------------------------
// (C)2021 maguros
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2021/03/21 軽微な修正
// 1.0.1 2021/03/16 URLの間違いを修正
// 1.0.0 2021/03/15 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/maguros3/
// [GitHub] : https://github.com/maguros/
//=============================================================================

/*:
 * @plugindesc タイトル画面項目非表示化プラグイン
 * @target MZ
 * @url https://github.com/maguros/RPGMakerMZ_Plugins/blob/master/SampleProject/js/plugins/TitleItemEraser.js
 * @author maguros
 * @base PluginCommonBase
 *
 * @param NewGameShown
 * @text ニューゲーム表示
 * @desc OFFに設定すると「ニューゲーム」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @param ContinueShown
 * @text コンティニュー表示
 * @desc OFFに設定すると「コンティニュー」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @param OptionsShown
 * @text オプション表示
 * @desc OFFに設定すると「オプション」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @help タイトル画面の任意項目を非表示にするプラグインです。
 * このプラグインにプラグインコマンドはありません。
 * 
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 * 
 * なお、タイトル画面に項目を追加するタイプのプラグインと併用すると
 * 競合を起こしますのでご注意ください。
 * 
 * 利用規約：
 * 　作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * 　についても制限はありません。
 */

(() => {
    'use strict';
    const _script = document.currentScript;
    const _param = PluginManagerEx.createParameter(_script);

    Scene_Title.prototype.commandWindowRect = function() {
        let item_count = 0;
        if (_param.NewGameShown) item_count++;
        if (_param.ContinueShown) item_count++;
        if (_param.OptionsShown) item_count++;

        const offsetX = $dataSystem.titleCommandWindow.offsetX;
        const offsetY = $dataSystem.titleCommandWindow.offsetY;
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(item_count, true);
        const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
        const wy = Graphics.boxHeight - wh - 96 + offsetY;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Window_TitleCommand.prototype.makeCommandList = function() {
        const continueEnabled = this.isContinueEnabled();
        if (_param.NewGameShown) this.addCommand(TextManager.newGame, "newGame");
        if (_param.ContinueShown) this.addCommand(TextManager.continue_, "continue", continueEnabled);
        if (_param.OptionsShown) this.addCommand(TextManager.options, "options");
    };
})();