/*:
@plugindesc
ダッシューズ Ver1.0.0(2022/4/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/Equip/SprintersShoes.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- MITライセンスに変更
- 1.5.0 用にパラメータの一部上限解除

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
FF6のダッシューズと同様の機能を追加します。

## 使い方
1. ダッシューズとする防具を作成
2. パラメータの『ダッシューズ防具ID』に作成したダッシューズを指定

上記設定をするとダッシューズ装備時のみ、移動速度が上昇します。

@param ArmorId
@type armor
@text ダッシューズ防具ID
@desc ダッシューズとして利用する防具ID
@default 0
@min 0

@param Speed
@type number
@text ダッシューズ速度倍率
@desc ダッシューズ装備時の歩行とダッシュ速度倍率
@default 1.5
@decimals 2
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
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用定数
    const ArmorId = Number(params.ArmorId) || 0;
    const Speed = Number(params.Speed) || 2.0;

    /**
     * 1 フレームあたりの移動距離を計算
     *
     * @returns {} 
     */
    Game_CharacterBase.prototype.distancePerFrame = function() {
        let rate = 1;
        for (const actor of $gameParty.allMembers()) {
            if (actor.hasArmor($dataArmors[ArmorId])) {
                rate = Speed;
                break;
            }
        }
        return (Math.pow(2, this.realMoveSpeed()) / 256) * rate;
    };
})();
