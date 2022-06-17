//=============================================================================
// OptionItemEraser.js
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
 * @plugindesc オプション項目非表示化プラグイン
 * @target MZ
 * @url https://github.com/maguros/RPGMakerMZ_Plugins/blob/master/SampleProject/js/plugins/OptionItemEraser.js
 * @author maguros
 * @base PluginCommonBase
 *
 * @param AlwaysDashShown
 * @text 常時ダッシュ表示
 * @desc OFFに設定すると「常時ダッシュ」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @param CommandRememberShown
 * @text コマンド記憶表示
 * @desc OFFに設定すると「コマンド記憶」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @param TouchUIShown
 * @text タッチUI表示
 * @desc OFFに設定すると「タッチUI」を非表示にします。
 * @default true
 * @type boolean
 * 
 * @param BgmVolumeShown
 * @text BGM 音量表示
 * @desc OFFに設定すると「BGM 音量」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @param BgsVolumeShown
 * @text BGS 音量表示
 * @desc OFFに設定すると「BGS 音量」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @param MeVolumeShown
 * @text ME 音量表示
 * @desc OFFに設定すると「ME 音量」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @param SeVolumeShown
 * @text SE 音量表示
 * @desc OFFに設定すると「SE 音量」が非表示になります。
 * @default true
 * @type boolean
 * 
 * @help オプションの任意項目を非表示にするプラグインです。
 * このプラグインにプラグインコマンドはありません。
 * 
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 * 
 * なお、オプション画面に項目を追加するタイプのプラグインと併用すると
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

    Scene_Options.prototype.optionsWindowRect = function() {
        let item_count = 0;
        if (_param.AlwaysDashShown) item_count++;
        if (_param.CommandRememberShown) item_count++;
        if (_param.TouchUIShown) item_count++;
        if (_param.BgmVolumeShown) item_count++;
        if (_param.BgsVolumeShown) item_count++;
        if (_param.MeVolumeShown) item_count++;
        if (_param.SeVolumeShown) item_count++;

        const n = Math.min(item_count, this.maxVisibleCommands());
        const ww = 400;
        const wh = this.calcWindowHeight(n, true);
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Window_Options.prototype.addGeneralOptions = function() {
        if (_param.AlwaysDashShown) this.addCommand(TextManager.alwaysDash, "alwaysDash");
        if (_param.CommandRememberShown) this.addCommand(TextManager.commandRemember, "commandRemember");
        if (_param.TouchUIShown) this.addCommand(TextManager.touchUI, "touchUI");
    };
    
    Window_Options.prototype.addVolumeOptions = function() {
        if (_param.BgmVolumeShown) this.addCommand(TextManager.bgmVolume, "bgmVolume");
        if (_param.BgsVolumeShown) this.addCommand(TextManager.bgsVolume, "bgsVolume");
        if (_param.MeVolumeShown) this.addCommand(TextManager.meVolume, "meVolume");
        if (_param.SeVolumeShown) this.addCommand(TextManager.seVolume, "seVolume");
    };
})();