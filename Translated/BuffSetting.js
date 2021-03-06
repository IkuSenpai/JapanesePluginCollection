
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
 * @plugindesc ????????????????????????????????????????????????????????????
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(?????????)
 * 
 * @param buffRateValue
 * @text ?????????????????????(%)
 * @desc ??????????????????25%??????
 * @type number
 * @min 1
 * @default 25
 * 
 * @param debuffRateValue
 * @text ?????????????????????(%)
 * @desc ??????????????????25%??????
 * @type number
 * @min 1
 * @default 25
 * 
 * @param minStatusValue
 * @text ?????????????????????(%)
 * @desc ?????????????????????????????????50%???????????????????????????????????????????????????????????????????????????
 * @type number
 * @min 1
 * @default 50
 * 
 * @param maxBuffAffected
 * @text ?????????????????????
 * @desc ??????????????????2??????
 * @type number
 * @min 2
 * @default 2
 * 
 * @param maxDebuffAffected
 * @text ?????????????????????
 * @desc ??????????????????2??????
 * @type number
 * @min 2
 * @default 2
 *
 * @help BuffRate.js
 * 
 * ???????????????????????????????????????????????????????????????????????????????????????
 * 
 * ??????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????
 * buffIconCheckMax?????????????????????????????????????????????????????????????????????
 *
 * ???????????????
 *  ???????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????
 * ?????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????/?????????????????????
 * ????????????????????????????????????????????????????????????????????????????????????
 * 
 * ??????????????????????????????
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