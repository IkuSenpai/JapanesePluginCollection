/*:
@plugindesc
Exp固定 Ver1.0.0(2022/4/17)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/System/FixedExp.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- 公開

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
レベルを上げるのに必要な経験値を固定にします。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。

@param FixedExp
@type number
@text 固定経験値
@desc 固定する経験値の値です。初期値は 100 です
@default 100
@min 1
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }

    // パラメータ用定数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const FixedExp = Number(params.FixedExp) || 100;

    /**
     * 指定レベルに上がるのに必要な累計経験値の取得
     *
     * @param {number} level - レベル
     */
    Game_Actor.prototype.expForLevel = function(level) {
        return FixedExp * level;
    };
})();
