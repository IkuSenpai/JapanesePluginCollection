/*:
@plugindesc
トグルスイッチ Ver1.2.4(2022/4/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/Command/ToggleSwitch.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- コピーライト更新
- リファクタ

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
指定したスイッチのON・OFFを交互に切り替える  
プラグインコマンドを提供します。

## 使い方
1. プラグインコマンドを呼び出します
2. プラグインコマンドからON・OFFを交互に切り替えたいスイッチを指定します。
3. プラグインコマンドを指定したイベントが呼び出されると、指定したスイッチのON・OFFが切り替わります。

@command toggle_switch
@text トグルスイッチ
@desc 指定したスイッチのON・OFFを交互に切り替えます

    @arg ToggleSwitch
    @type switch
    @text トグルスイッチ
    @desc ON・OFFを交互に切り替えるスイッチ
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();

    // プラグインコマンド(トグルスイッチ)
    PluginManager.registerCommand(plugin_name, "toggle_switch", args => {
        const ToggleSwitch = Number(args.ToggleSwitch);
        $gameSwitches.setValue(ToggleSwitch, !$gameSwitches.value(ToggleSwitch));
    });
})();
