/*:
@plugindesc
オートセーブオプション Ver1.0.3(2022/4/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/Option/AutoSave.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- 他のオプションコマンドを追加したときの競合対策を実施
- コピーライト更新

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
オプションにオートセーブを追加します。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_isPlugin(plugin_name) {
        return PluginManager._scripts.includes(plugin_name);
    }

    // 初期値
    ConfigManager.autoSave = false;

    // 他プラグイン連携(プラグインの導入有無)
    const Peaceful = Potadra_isPlugin('Peaceful');
    const Snow     = Potadra_isPlugin('Snow');

    /**
     * オプションデータを生成して返す
     *
     * @returns {} オプションデータ
     */
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.apply(this, arguments);
        config.autoSave = this.autoSave;
        return config;
    };

    /**
     * 指定オプションを適用
     *
     * @param {} config - オプションデータ
     */
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        this.autoSave = this.readFlag(config, "autoSave", $dataSystem.optAutosave);
    };

    /**
     * オプションの項目数
     * ここで指定した値より項目が多い場合、スクロールして表示されます。
     *
     * @returns {number} オプションの項目数
     */
    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        const max_commands = _Scene_Options_maxCommands.apply(this, arguments);
        let auto_save_max_commands = 8;
        if (Peaceful) auto_save_max_commands++;
        if (Snow) auto_save_max_commands++;
        // Increase this value when adding option items.
        return Math.max(auto_save_max_commands, max_commands);
    };

    /**
     * オートセーブの有効状態
     *
     * @returns {} 
     */
    Game_System.prototype.isAutosaveEnabled = function() {
        return ConfigManager.autoSave;
    };

    /**
     * 
     */
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.apply(this, arguments);
        this.addCommand(TextManager.autosave, "autoSave");
    };

    // オートセーブ判定
    function autoSave(mode, autosave) {
        const autoSavefileId = 0;
        let save_count = autosave ? autoSavefileId : 1;

        // ロード画面でオートセーブが有効でなくてもオートセーブがあるとき、ロード出来るようにする
        if (mode === 'load' && !autosave && DataManager.savefileExists(autoSavefileId)) {
            save_count = 0;
        }

        return save_count;
    }

    /**
     * 項目数の取得
     *
     * @returns {} 
     */
    Window_SavefileList.prototype.maxItems = function() {
        return DataManager.maxSavefiles() - autoSave(this._mode, this._autosave);
    };

    /**
     * 
     *
     * @param {} index - 
     * @returns {} 
     */
    Window_SavefileList.prototype.indexToSavefileId = function(index) {
        return index + autoSave(this._mode, this._autosave);
    };

    /**
     * 
     *
     * @param {} savefileId - 
     * @returns {} 
     */
    Window_SavefileList.prototype.savefileIdToIndex = function(savefileId) {
        return savefileId - autoSave(this._mode, this._autosave);
    };
})();
