
/*:
 * @plugindesc This plugin allows you to create skills that consume in the ratio of current MP, max MP and current TP
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help Madante.js
 * 
 * <SpendRateMp:1>
 * <SpendRateMaxMp:1>
 * <spendRateTp:0.5>
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 現在MP,最大MP,現在TPの割合で消費するスキルを作成できます
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 *
 * @help Madante.js
 * 
 * このプラグインは現在MP,最大MP,現在TPの割合で消費するスキルを作成できます
 * 
 * <SpendRateMp:1>
 * この記述は現在MPの1倍（残っているMP全て）となります
 * 
 * <SpendRateMaxMp:0.3>
 * この記述は最大MPの30%を消費する意味となります
 * 
 * <SpendRateTp:0.5>
 * この記述は現在TPの50%を消費する意味となります
 * 
 * <UpperMp:999>
 * <LowerMp:1>
 * 消費MPの上限と下限を設定します
 * この設定は最終値に有効です
 * 
 * <UpperTp:100>
 * <LowerTp:1>
 * 消費TPの上限と下限を設定します
 * この設定は最終値に有効です
 * 
 * これらの記述は併用できます。
 * スキル設定欄のMP消費を30にして<SpendRateMp:0.2>と<SpendRateMaxMp:0.1>にした場合
 * 30+現在MPの20%の数値+最大MPの10%の数値の合計が消費するMPとなります。
 * 発動できない値のMP量となる場合もあるので設定には要注意
 * 
 * また、上記の記述を行った場合、MP・TPは必ず1は消費するようになります。
 * 
 * またダメージ計算式で以下の式が扱えるようになります
 * 
 * a.costMp : 最後に消費したMPの量
 * a.costTp : 最後に消費したTPの量
 * 
 * これで消費量に応じたダメージ式を記載できます
 * （a.mpやa.tpだと消費後の値を参照するのでうまくいきません）
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 * 
 * 要するに割と自由です。
 */
(function() {
    //const parameters = PluginManager.parameters('Madante');
  
    const Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
      Scene_Boot_start.call(this);
      DataManager.processMadante();
    };

    DataManager.biludLimitData = function(lower, upper){
        let result = {};
        if(lower){
            result.lower = Number(lower);
        }
        if(upper){
            result.upper = Number(upper);
        }
        return result;
    };

    DataManager.limitNormalize = function(value,limitData){
        if(!limitData){
            return value;
        }
        if(limitData.lower){
            if(limitData.lower > value){
                return limitData.lower;
            }
        }
        if(limitData.upper){
            if(limitData.upper < value){
                return limitData.upper;
            }
        }
        return value;
    };
  
    DataManager.processMadante = function() {
      for (let i = 1; i < $dataSkills.length; i++) {
        let skill = $dataSkills[i];
        let spendRateMp = skill.meta.SpendRateMp;
        let spendRateMaxMp = skill.meta.SpendRateMaxMp;
        let spendRateTp = skill.meta.SpendRateTp;
        if (spendRateMp){
            skill.spendRateMp = Number(spendRateMp);
        }
        if(spendRateMaxMp){
            skill.spendRateMaxMp = Number(spendRateMaxMp);
        }
        if(spendRateTp){
            skill.spendRateTp = Number(spendRateTp);
        }
        skill.limitDataMp = this.biludLimitData(skill.meta.LowerMp, skill.meta.UpperMp);
        skill.limitDataTp = this.biludLimitData(skill.meta.LowerTp, skill.meta.UpperTp);
      }
    };

    const Game_BattlerBase_initialize = Game_BattlerBase.prototype.initialize;
    Game_BattlerBase.prototype.initialize = function() {
        Game_BattlerBase_initialize.call(this);
        this.costMp = 0;
        this.costTp = 0;
    };

    Game_BattlerBase.prototype.paySkillCost = function(skill) {
        this.costMp = this.skillMpCost(skill);
        this._mp -= this.costMp;
        this.costTp = this.skillTpCost(skill);
        this._tp -= this.costTp;
    };

    const Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
    Game_BattlerBase.prototype.skillMpCost = function(skill) {
        let totalCost = 0;
        let zeroCheck = false;
        if(skill.spendRateMp){
            zeroCheck = true;
            totalCost += Math.floor(this.mp * skill.spendRateMp);
        }
        if(skill.spendRateMaxMp){
            zeroCheck = true;
            totalCost += Math.floor(this.mmp * skill.spendRateMaxMp);
        }
        totalCost += Game_BattlerBase_skillMpCost.call(this,skill);
        if(zeroCheck){
            if(totalCost < 1){
                totalCost = 1;
            }
        }
        return DataManager.limitNormalize(totalCost, skill.limitDataMp); 
    };
    
    const Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
    Game_BattlerBase.prototype.skillTpCost = function(skill) {
        let totalCost = 0;
        let zeroCheck = false;
        if(skill.spendRateTp){
            zeroCheck = true;
            totalCost += Math.floor(this.tp * skill.spendRateTp);
        }
        
        totalCost += Game_BattlerBase_skillTpCost.call(this,skill);

        if(zeroCheck){
            if(totalCost < 1){
                totalCost = 1;
            }
        }

        return DataManager.limitNormalize(totalCost, skill.limitDataTp); 
    };
})();
