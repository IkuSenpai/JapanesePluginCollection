
/*:
 * @plugindesc Change the lower limit of the Enemy's action rating.
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 * 
 * @param buffRateValue
 * @text Percentage of increase in capacity
 * @desc The default is 25%.
 * @type number
 * @min 1
 * @default 25
 * 
 * @param debuffRateValue
 * @text Percentage of decline in capacity
 * @desc The default is 25%.
 * @type number
 * @min 1
 * @default 25
 * 
 * @param minStatusValue
 * @text The lower limit of the rate at which a person suffers a reduction in capacity
 * @desc The default is 50%.
 * @type number
 * @min 1
 * @default 50
 * 
 * @param maxBuffAffected
 * @text Upward Ability Steps
 * @desc The default is 2.
 * @type number
 * @min 2
 * @default 2
 * 
 * @param maxDebuffAffected
 * @text Lower Ability Level
 * @desc The default is 2.
 * @type number
 * @min 2
 * @default 2
 *
 * @help BuffRate.js
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 能力の上昇・低下の段階や割合を変更します
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @param buffRateValue
 * @text 能力上昇の割合(%)
 * @desc デフォルトは25%です
 * @type number
 * @min 1
 * @default 25
 * 
 * @param debuffRateValue
 * @text 能力低下の割合(%)
 * @desc デフォルトは25%です
 * @type number
 * @min 1
 * @default 25
 * 
 * @param minStatusValue
 * @text 能力低下の下限(%)
 * @desc デフォルトは通常の値の50%です。能力低下を受けてもこれ以上能力は下がりません
 * @type number
 * @min 1
 * @default 50
 * 
 * @param maxBuffAffected
 * @text 能力上昇の段階
 * @desc デフォルトは2です
 * @type number
 * @min 2
 * @default 2
 * 
 * @param maxDebuffAffected
 * @text 能力低下の段階
 * @desc デフォルトは2です
 * @type number
 * @min 2
 * @default 2
 *
 * @help BuffRate.js
 * 
 * このプラグインは能力上昇・能力低下の段階や割合を変更します
 * 
 * アイコンは最大になったら大アイコン、
 * それ以外は小アイコンを使うようにしています
 * アイコン参照インデクスを元の式に直したい場合は
 * buffIconCheckMaxのコメントアウトしている部分を適用してください
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連する
 * ドキュメントファイル（以下「ソフトウェア」）のコピーを取得する
 * すべての人に対して、使用、コピー、変更、マージの権利を含むが
 * これに限定されない制限なしで
 * ソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、
 * サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 * 
 * 要するに割と自由です
 */
(() => {
    const parameters = PluginManager.parameters('BuffSetting');
    const buffRateValue = Number(parameters['buffRateValue'] || 25) * 0.01;
    const debuffRateValue = Number(parameters['debuffRateValue'] || 25) * 0.01;
    const minStatusValue = Number(parameters['minStatusValue'] || 50) * 0.01;
    const maxBuffAffected = Number(parameters['maxBuffAffected'] || 2);
    const maxDebuffAffected = Number(parameters['maxDebuffAffected'] || 2);

    Game_BattlerBase.prototype.paramBuffRate = function(paramId) {
        let result = 1.0;
        let buffValue = this._buffs[paramId];
        if(buffValue > 0){
            result += buffValue * buffRateValue;
        }else if(buffValue < 0){
            result += buffValue * debuffRateValue;
        }
        if(result < minStatusValue){
            result = minStatusValue;
        }
        return result;
    };

    Game_BattlerBase.prototype.isMaxBuffAffected = function(paramId) {
        return this._buffs[paramId] === maxBuffAffected;
    };

    Game_BattlerBase.prototype.isMaxDebuffAffected = function(paramId) {
        return this._buffs[paramId] === -maxDebuffAffected;
    };

    Game_BattlerBase.prototype.buffIconIndex = function(buffLevel, paramId) {
        if (buffLevel > 0) {
            return Game_BattlerBase.ICON_BUFF_START + this.buffIconCheckMax(buffLevel) * 8 + paramId;
        } else if (buffLevel < 0) {
            return (
                Game_BattlerBase.ICON_DEBUFF_START + this.buffIconCheckMax(buffLevel) * 8 + paramId
            );
        } else {
            return 0;
        }
    };

    Game_BattlerBase.prototype.buffIconCheckMax = function(buffLevel) {
        if (buffLevel > 0) {
            //return (buffLevel - 1)
            return buffLevel === maxBuffAffected ? 1 : 0;

        } else if (buffLevel < 0) {
            //return (-buffLevel - 1);
            return buffLevel === -maxDebuffAffected ? 1 : 0;
        } else {
            return 0;
        }
    };

})();