/*:
 * @plugindesc Change the formula for chanting time based on launch speed (useful in progress time combat)
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help CustomCastTime.js
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 発動速度による詠唱時間の式を変更するプラグイン（プログレスタイム戦闘で有効）
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @param castSpeedRate
 * @text 発動速度-1辺りの必要ゲージ量
 * @desc 1辺りゲージ何本必要かを設定します。例えば0.001の設定で発動速度-500なら0.5本分が詠唱時間になります
 * @type number
 * @default 0.001
 *
 * @help CustomCastTime.js
 * 
 * このプラグインはタイムプログレス戦闘でのみ意味を成します。
 * 
 * デフォルトでは
 * 詠唱速度を0未満にすると詠唱が発生し、
 * [発動速度の絶対値の平方根] / [敏捷性の平方根+1]
 * が必要ゲージ量となります。（1で通常のターンが回ってくる速度と同一）

 * 
 * それを
 * [発動速度の絶対値] * [castSpeedRate]
 * に変更します
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {

    const parameters = PluginManager.parameters('CustomCastTime');
    const castSpeedRate = Number(parameters['castSpeedRate'] || 0.001);
    Game_Battler.prototype.updateTpbCastTime = function() {
        if (this._tpbState === "casting") {
            this._tpbCastTime += this.tpbAccelerationCast();
            if (this._tpbCastTime >= this.tpbRequiredCastTime()) {
                this._tpbCastTime = this.tpbRequiredCastTime();
                this._tpbState = "ready";
            }
        }
    };
    Game_Battler.prototype.tpbRequiredCastTime = function() {
        return 1;
    };

    Game_Battler.prototype.tpbAccelerationCast = function(){
        const actions = this._actions.filter(action => action.isValid());
        const items = actions.map(action => action.item());
        const delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);
        return this.tpbAcceleration() / (delay * castSpeedRate);
    }

})();
