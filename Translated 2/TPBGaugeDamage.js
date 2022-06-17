/*:
 * @plugindesc Skill to increase or decrease your time gauge (useful in progress time combat)
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help TBPGaugeDamage.js
 * 
 * <TpbDamageCharging:1.0>
 * <TpbDamageRateCharging:0.3>
 * <TpbDamageCasting:1.0>
 * <TpbDamageRateCasting:0.5>
 * <CastingBreak>
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc タイムゲージを増減させるスキル（プログレスタイム戦闘で有効）
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 *
 * @help TBPGaugeDamage.js
 * 
 * このプラグインはタイムプログレス戦闘でのみ意味を成します。
 * 
 * <TpbDamageCharging:1.0>
 * タイムゲージを指定数値減らします
 * 1.0でゲージ1本分です。
 * （マイナスになると内部的には処理されるものの、見た目的には空のままとなります）
 * 
 * <TpbDamageRateCharging:0.3>
 * 現在のタイムゲージの割合で減らします
 * 0.3の場合、現在のたまっている量の30%を減らします
 * 1.0にすると、0になるように減らします
 * 
 * <TpbDamageCasting:1.0>
 * タイムゲージを指定数値減らします
 * これは詠唱中のユニットにのみ適用されます
 * 1.0でゲージ1本分です。
 * （マイナスになると内部的には処理されるものの、見た目的には空のままとなります）
 * 
 * <TpbDamageRateCasting:0.5>
 * タイムゲージを指定数値減らします
 * これは詠唱中のユニットにのみ適用されます
 * 0.5の場合、現在のたまっている量の50%を減らします
 * 1.0にすると、0になるように減らします
 * 
 * <CastingBreak>
 * ターゲットの詠唱を解除する効果となります
 * 詠唱破棄させる効果を付けたい時に使用します。
 * この設定を行うと<TpbDamageCasting>と<TpbDamageRateCasting>は無効となります
 * 
 * 上記の設定値はマイナスでも有効です
 * <TpbDamageCasting:-1.0>とすると効果を受けた対象は瞬時に詠唱完了となるので
 * 詠唱支援スキル的なものを作成できます
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {


    const Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
      Scene_Boot_start.call(this);
      DataManager.processTBPGaugeDamage();
    };

    DataManager.biludTpbDamageData = function(direct, rate){
        let result = {};
        if(direct){
            result.direct = Number(direct);
        }
        if(rate){
            result.rate = Number(rate);
        }
        return result;
    };

    DataManager.tpbDamageNormalize = function(value,data){
        if(!data){
            return value;
        }
        let rate = data.rate;
        if(rate){
            value -= value * rate;
        }
        let direct = data.direct;
        if(direct){
            value -= direct;
        }
        
        return value;
    };
  
    DataManager.processTBPGaugeDamage = function() {
        for (let i = 1; i < $dataSkills.length; i++) {
            let skill = $dataSkills[i];
            let castingBreak = skill.meta.CastingBreak;
            if(castingBreak){
                skill.castingBreak = true;//Boolean(castingBreak);
            }else{
                skill.tpbDamageDataCasting = this.biludTpbDamageData(skill.meta.TpbDamageCasting, skill.meta.TpbDamageRateCasting);
            }
            skill.tpbDamageDataCharging = this.biludTpbDamageData(skill.meta.TpbDamageCharging, skill.meta.TpbDamageRateCharging);
            
        }
    };

    const Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        Game_Action_apply.call(this,target);
        const result = target.result();
        if (result.isHit()) {
            const item = this.item();
            target.tpbChargeTimeDamage(item);
            target.tpbCastTimeDamage(item);
        }
    };

    Game_Battler.prototype.tpbChargeTimeDamage = function(item) {
        if(BattleManager.isTpb() && this._tpbState === "charging"){
            this._tpbChargeTime = DataManager.tpbDamageNormalize(this._tpbChargeTime, item.tpbDamageDataCharging);
            this.refresh();
        }
    };

    Game_Battler.prototype.tpbCastTimeDamage = function(item) {
        if(BattleManager.isTpb() && this._tpbState === "casting") {
            if(item.castingBreak){
                this._tpbCastTime = 0;
                this.setActionState(BattleManager.isTpb() ? "undecided" : "done");
                this.clearTpbChargeTime();
            }else{
                this._tpbCastTime = DataManager.tpbDamageNormalize(this._tpbCastTime, item.tpbDamageDataCasting);
            }
            
            this.refresh();
        }
    };

})();