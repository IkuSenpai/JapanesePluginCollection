/*:
@plugindesc
敵グループランダム決定 Ver1.3.7(2022/6/15)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/Battle/RandomTroop.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- 複数のプラグインで競合する可能性があったため対策を実施

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
任意の敵グループにて、ランダムに敵キャラを決定できる機能を追加します。

## 使い方
1. 任意の敵グループを選択します。

2. ランダム出現させたい敵キャラを追加します。  
   同じ敵キャラを追加した場合は、出現率が上がります。

3. 敵グループ名にタグを記載します。  
   タグの記載方法は、下記手順を参考にしてください。

4. マップやイベントの設定で敵グループを呼び出すと、  
   ランダムに敵キャラが出現します。

### タグ
敵グループ名に下記タグを指定することで、  
敵グループをランダムに決定します。

タグを指定しない場合は、 通常の敵グループとして扱われます。

・<MIN:1>  
敵キャラの最低出現数を1～8で指定します。

・<MAX:1>  
敵キャラの最大出現数を1～8で指定します。

・<FIX:1>  
固定する敵キャラを1～8で指定します。  
1～8の順番は敵グループに追加した順番です。  
最初に追加したものが、1番になります。
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_isPlugin(plugin_name) {
        return PluginManager._scripts.includes(plugin_name);
    }
    function Potadra_getPluginParams(plugin_name) {
        let params = false;
        if (Potadra_isPlugin(plugin_name)) {
            params = PluginManager.parameters(plugin_name);
        }
        return params;
    }
    function Potadra_convertBool(bool) {
        if (bool === "false" || bool === '') {
            return false;
        } else {
            return true;
        }
    }

    // 他プラグイン連携(パラメータ取得)
    const debug_params     = Potadra_getPluginParams('Debug');
    const EnableResolution = Potadra_convertBool(debug_params.EnableResolution);
    const ResolutionWidth  = debug_params ? Number(debug_params.ResolutionWidth || 816) : 816;
    const ResolutionHeight = debug_params ? Number(debug_params.ResolutionHeight || 624) : 624;

    /**
     * セットアップ
     *
     * @param {} troopId - 
     */
    const _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        // 通常処理呼び出し
        _Game_Troop_setup.apply(this, arguments);

        const max_pattern = /<max:\s*(\d+)>/i;
        const min_pattern = /<min:\s*(\d+)>/i;
        const fix_pattern = /<fix:(\s*.+?)>/i;
        const name        = this.troop().name;
        let max_match = name.match(max_pattern);
        let min_match = name.match(min_pattern);
        let fix_match = name.match(fix_pattern);

        if (max_match || min_match) {
            this.clear();
            this._troopId = troopId;
            this._enemies = [];

            const members = this.troop().members;
            let max = members.length;
            let min = 1;
            if (max_match) {
                max = max_match[1];
            }
            if (min_match) {
                min = min_match[1];
            }

            // 敵キャラの出現数を算出
            max = Math.randomInt(max) + 1;
            if (max < min) {
                max = min;
            }

            // 抽選する敵キャラのIDを配列に格納
            let ary = [];
            for (const member of members) {
                if ($dataEnemies[member.enemyId]) {
                    ary.push(member.enemyId);
                }
            }

            // 固定敵キャラの設定
            let fix = [];
            if (fix_match) {
                fix = fix_match[1].split(',');
            }

            // 敵キャラを抽選
            let y, first;
            if (debug_params && EnableResolution) {
                y = (Graphics.height || ResolutionHeight) - 180 - 8; // 180 はメニューサイズ、 8 は余白
                first = ((Graphics.width || ResolutionWidth) / max) / 2;
            } else {
                y = (Graphics.height || $dataSystem.advanced.screenHeight) - 180 - 8; // 180 はメニューサイズ、 8 は余白
                first = ((Graphics.width || $dataSystem.advanced.screenWidth) / max) / 2;
            }

            for (let i = 0; i < max; i++) {
                let enemyId;
                let index = fix[i];
                if (index) {
                    index -= 1;
                    enemyId = ary[index];
                } else {
                    enemyId = ary[Math.floor(Math.random() * ary.length)];
                }
                let x = first + (first * i) * 2;

                const enemy = new Game_Enemy(enemyId, x, y);
                this._enemies.push(enemy);
            }

            // 同名の敵キャラに ABC などの文字を付加
            this.makeUniqueNames();
        }
    };
})();
