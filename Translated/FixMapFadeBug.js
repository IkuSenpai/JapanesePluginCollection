/*:
@plugindesc
場所移動フェードなしバグ修正 Ver1.0.0(2022/3/11)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/Patch/FixMapFadeBug.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- 公開

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
RPGツクールMZ1.4.4 で場所移動でフェードなしを選択すると
キャラクター画像がちらつくバグを修正します。

1.4.3 では問題なかったので、その時の記述に戻したものです。

## 使い方
初期設定は必要ありません。  
プラグイン導入だけで動作します。
*/
(() => {
    'use strict';

    Sprite_Character.prototype.updateFrame = function() {
        if (this._tileId > 0) {
            this.updateTileFrame();
        } else {
            this.updateCharacterFrame();
        }
    };
})();
