//=============================================================================
// Keke_ParamByLevel - レベル成長パラメータ
// バージョン: 1.4.0
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 追加能力値をレベル成長させる
 * @author ケケー
 * @url http://kekeelabo.com
 *
 *
 *
 * @help
 * 【ver.1.4.0】
 * 追加能力値を通常の能力値と同じように、レベル成長させることができる
 * 追加能力値とは、命中率・回避率・会心率・会心回避率・魔法回避率・魔法反射率
 * 反撃率・HP再生率・MP再生率・TP再生率のこと
 * ツクールMZ/MV両対応 
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * ■レベル成長パラメータの設定
 *
 * アクター、職業、装備、スキル、アイテム、ステートのメモ欄に
 *
 * ■命中率なら
 * <レベル命中:補正値,最小値,最大値>
 *
 * ■回避率なら
 * <レベル回避:補正値,最小値,最大値>
 *
 * ■会心率なら
 * <レベル会心:補正値,最小値,最大値>
 *
 * ■会心回避率なら
 * <レベル会心回避:補正値,最小値,最大値>
 *
 * ■魔法回避率なら
 * <レベル魔法回避:補正値,最小値,最大値>
 *
 * ■魔法反射率なら
 * <レベル魔法反射:補正値,最小値,最大値>
 *
 * ■反撃率なら
 * <レベル反撃:補正値,最小値,最大値>
 *
 * ■HP再生率なら
 * <レベルHP再生:補正値,最小値,最大値>
 * もしくは
 * <levelHrg:補正値,最小値,最大値>
 *
 * ■MP再生率なら
 * <レベルMP再生:補正値,最小値,最大値>
 *
 * ■TP再生率なら
 * <レベルTP再生:補正値,最小値,最大値>
 *
 * ◎レベル × 補正値 ぶん能力値が増加する
 * レベル 20 で補正値が 0.5 なら、20 × 0.5 で能力が 10 増加する
 *
 * ◎補正値を | | で囲むことでjavaScript式を使うこともできる
 * 式の中で \lv と書くと現在のレベルになる
 * 補正値を |\lv * \lv * 0.01| とすると、レベル 20 のとき、
 * 20 * 20 * 0.01 能力が 4 増加する
 *
 * ◎最小値と最大値はそれ以上(以下)の能力増加量にならないようにする
 * 最小値が 2 、最大値が 30 なら、増加量は 2〜30 の範囲に収まる
 * 最小値と最大値は省略できる
 *
 * ◎レベル補正値は合算となる
 * アクターの会心率のレベル補正値が 0.5 で、
 * さらに補正値 0.25 の装備をしていた場合、補正値は計 0.75 となる
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 */
 
 
 
 
 
(() => {
    //- プラグイン名
    const pluginName = "Keke_ParamByLevel";
    
    
    
    
    
    //--  レベル成長パラメータ  --//
    
    
    //- レベル成長パラメータの取得
    Game_Actor.prototype.getParamByLevelKe = function(type) {
        // イニット
        const actor = this.actor();
        const times1 = [this._level, 0.01];
        const times2 = [0.01];
        let meta = null;
        let val = 0;
        // タイプごとの処理
        switch (type) {
            case "hit":
                val = this.totalAllMetaValKePbl(["レベル命中", "levelHit"], times1, times2);
                break;
            case "eva":
                val = this.totalAllMetaValKePbl([ "レベル回避", "levelEva"], times1, times2);
                break;
            case "cri":
                val = this.totalAllMetaValKePbl(["レベル会心", "levelCri"], times1, times2);
                break;
            case "cev":
                val = this.totalAllMetaValKePbl(["レベル会心回避", "levelCev"], times1, times2);
                break;
            case "mev":
                val = this.totalAllMetaValKePbl([ "レベル魔法回避", "levelMev"], times1, times2);
                break;
            case "mrf":
                val = this.totalAllMetaValKePbl([ "レベル魔法反射", "levelMrf"], times1, times2);
                break;
            case "cnt":
                val = this.totalAllMetaValKePbl(["レベル反撃", "levelCnt"], times1, times2);
                break;
            case "hrg":
                val = this.totalAllMetaValKePbl(["レベルHP再生", "levelHrg"], times1, times2);
                break;
            case "mrg":
                val = this.totalAllMetaValKePbl(["レベルMP再生", "levelMrg"], times1, times2);
                break;
            case "trg":
                val = this.totalAllMetaValKePbl(["レベルTP再生", "levelTrg"], times1, times2);
                break;
        }
        return val;
    };
        
    
    //- 命中率適用
    const _Game_Action_itemHit = Game_Action.prototype.itemHit;
    Game_Action.prototype.itemHit = function(target) {
        let result = _Game_Action_itemHit.call(this);
        if (this.subject()._actorId && this.isPhysical()) {
            result += this.subject().getParamByLevelKe("hit");
        }
        return result;
    };
    
    
    //- 回避率適用
    const _Game_Action_itemEva = Game_Action.prototype.itemEva;
    Game_Action.prototype.itemEva = function(target) {
        let result = _Game_Action_itemEva.call(this, target);
        if (target._actorId && this.isPhysical()) {
            result += target.getParamByLevelKe("eva");
        }
        if (target._actorId && this.isMagical()) {
            result += target.getParamByLevelKe("mev");
        }
        return result;
    };
    
    
    //- 会心率適用
    const _Game_Action_itemCri = Game_Action.prototype.itemCri;
    Game_Action.prototype.itemCri = function(target) {
        let result = _Game_Action_itemCri.call(this, target);
        if (this.subject()._actorId && this.item().damage.critical) {
            result += this.subject().getParamByLevelKe("cri");
        }
        if (target._actorId && this.item().damage.critical) {
            result -= target.getParamByLevelKe("cev");
        }
        return result;
    };
    
    
    //- 魔法反射率適用
    const _Game_Action_itemMrf = Game_Action.prototype.itemMrf;
    Game_Action.prototype.itemMrf = function(target) {
        let result = _Game_Action_itemMrf.call(this, target);
        if (target._actorId && this.isMagical()) {
            result += target.getParamByLevelKe("mrf");
        }
        return result;
    };
    
    
    //- 反撃率適用
    const _Game_Action_itemCnt = Game_Action.prototype.itemCnt;
    Game_Action.prototype.itemCnt = function(target) {
        let result = _Game_Action_itemCnt.call(this, target);
        if (target._actorId && this.isPhysical() && target.canMove()) {
            result += target.getParamByLevelKe("cnt");
        }
        return result;
    };
    
    
    //- HP再生率適用(半再定義)
    const _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
    Game_Battler.prototype.regenerateHp = function() {
        if (this._actorId) {
            const levVal = this.getParamByLevelKe("hrg");
            if (levVal) {
                const minRecover = -this.maxSlipDamage();
                const value = Math.max(Math.floor(this.mhp * (this.hrg + levVal)), minRecover);
                if (value !== 0) {
                    this.gainHp(value);
                }
                return;
            }
        }
        _Game_Battler_regenerateHp.call(this);
    };
    
    
    //- MP再生率適用(半再定義)
    const _Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
    Game_Battler.prototype.regenerateMp = function() {
        if (this._actorId) {
            const levVal = this.getParamByLevelKe("mrg");
            if (levVal) {
                const value = Math.floor(this.mmp * (this.mrg + levVal));
                if (value !== 0) {
                    this.gainMp(value);
                }
                return;
            }
        }
        _Game_Battler_regenerateMp.call(this);
    };
    
    
    //- TP再生率適用(半再定義)
    const _Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
    Game_Battler.prototype.regenerateTp = function() {
        if (this._actorId) {
            const levVal = this.getParamByLevelKe("trg");
            if (levVal) {
                const value = Math.floor(100 * (this.trg + levVal));
                this.gainSilentTp(value);
                return;
            }
        }
        _Game_Battler_regenerateTp.call(this);
    };
    
    
    
    
    
    //--  メタ数値 /ベーシック  --//
    
    
    //- 全てのメタ値を合算
    Game_Battler.prototype.totalAllMetaValKePbl = function(words, times1 = null, times2 = null) {
        // イニット
        let data = null
        let val = 0;
        // バトラー値
        data = this.actorId ? this.actor() : this.enemy();
        if (data) { val += this.getMetaValKePbl(data.note, words, times1, times2); }
        if (this._actorId) {
            // 職業値
            data = this.currentClass();
            if (data) { val += this.getMetaValKePbl(data.note, words, times1, times2); }
            // 装備値
            this._equips.forEach(equip => {
                data = equip.object();
                if (data) { val += this.getMetaValKePbl(data.note, words, times1, times2); }
            }, this);
        }
        // ステート値
        this._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { val += this.getMetaValKePbl(data.note, words, times1, times2); }
        }, this);
        // アクション値
        const actions = [BattleManager._action];
        const chainRun = BattleManager._chainRunActionKe;
        if (chainRun && chainRun != BattleManager._action) { actions.push(BattleManager._chainRunActionKe); }
        for (const action of actions) {
            if (!action) { continue; }
            data = action.item();
            if (data) { val += this.getMetaValKePbl(data.note, words, times1, times2); }
        }
        return val;
    };
    
    //- メタ数値を取得
    Game_Battler.prototype.getMetaValKePbl= function(note, words, times1 = null, times2 = null) {
        // イニット
        let val = 0;
        times1 = times1 ? times1.reduce((t, v) => t * v) : 1;
        times2 = times2 ? times2.reduce((t, v) => t * v) : 1;
        let eva = null;
        // 取得計算
        metas = $gameSystem.metaAllKePbl(note, words);
        metas.forEach(meta => {
            let v = 0;
            meta = meta.split(",");
            // eval処理
            const match = meta[0].match(/\|(.+)\|/);
            if (match) {
                eva = match[1];
                eva = eva.replace(/\\lv/g, "this._level");
            }
            if (meta[0]) { v = eva ? eval(eva) * times2 : Number(meta[0]) * times1; }
            if (meta[1]) { v = Math.max(v, Number(meta[1]) * times2); }
            if (meta[2]) { v = Math.min(v, Number(meta[2]) * times2); }
            val += v;
        }, this);
        return val;
    };
    
    
    
    
    
    //--  全取得メタ  --//
    
    
    Game_System.prototype.metaAllKePbl = function(note, words) {
        var result = [];
        words.forEach(word => {
            var regText = '\<' + word + ':([^\>]*)\>';
            var regExp_g = new RegExp(regText, 'g');
            var regExp = new RegExp(regText);
            var matches = note.match(regExp_g);
            var match = null;
            if (matches) {
                matches.forEach(function(line) {
                    result.push(line.match(regExp)[1]);
                }, this);
            }
        }, this);
        return result;
    };

})();