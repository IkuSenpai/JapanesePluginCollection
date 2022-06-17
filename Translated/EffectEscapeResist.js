/*:
 * @plugindesc Change the formula for chanting time based on launch speed (useful in progress time combat)
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help EffectEscapeResist.js
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc スキルの特殊効果「逃げる」の成功率・耐性を作成します。
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 *
 * @help EffectEscapeResist.js
 * 
 * 「逃げる」効果の耐性を作成します。
 * 設定しないと成功率、耐性ともに1の扱いとなります
 * 敵を逃がすのと即死させるのでは微妙にニュアンスが異なります
 * （逃がした敵の経験値もらえない・ニフラム的なスキルとなります）
 * 
 * 1で通常の確率になります
 * 0.3だと30%の確率となります。
 * 
 * アクターかエネミーのメモに記載します
 * こちらは耐性になります。
 * <EscapeResist:1.0>
 * <EscapeResist:0.3>
 * 
 * スキルかアイテムのメモに書きます
 * こちらは成功率になります
 * <EscapeRate:0.3>
 * 
 * 計算式
 * [発生率 = EscapeResist * EscapeRate]
 * 
 * 注意点
 * 逃げるが行えない戦闘だと該当スキルは使用不可になります。（デフォルトの仕様）
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
      _Scene_Boot_start.call(this);
      processEscapeResist();
    };
    
    function escapeResist(list){
        for (const data of list) {
            if (!data) {
                continue;
            }
            if (data.meta.EscapeResist) {
                data.escapeResist = Number(data.meta.EscapeResist);
            } else {
                data.escapeResist = 1.0;
            }
        }
    }

    function escapeRate(list){
        for (const data of list) {
            if (!data) {
                continue;
            }
            if (data.meta.EscapeRate) {
                data.escapeRate = Number(data.meta.EscapeRate);
            } else {
                data.escapeRate = 1.0;
            }
        }
    }
    
    const processEscapeResist = () => {
        escapeResist( $dataEnemies );
        escapeResist( $dataActors );
        escapeRate( $dataSkills );
        escapeRate( $dataItems );
    };

    Game_Action.prototype.itemEffectSpecial = function(target, effect) {
        const battler = target.isActor() ? target.actor() : target.enemy();
        let chance = 1.0;
        if( this.item().escapeRate ){
            chance = this.item().escapeRate;
        }
        if(battler.escapeResist){
            chance *= battler.escapeResist;
        }
        if (Math.random() < chance) {
            if (effect.dataId === Game_Action.SPECIAL_EFFECT_ESCAPE) {
                target.escape();
                this.makeSuccess(target);
            }
        }
    };

})();
