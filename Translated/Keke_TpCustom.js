//=============================================================================
//  Keke_TpCustom - TPカスタム
// バージョン: 1.2.1
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc TPを拡張する
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.2.1】
 * TPを拡張する
 * ◎最大TP
 * ◎初期TP
 * ◎ダメージTPチャージ量
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * ■最大TP
 * 標準は 100
 * 好きな値にできる
 *
 * ⚫︎キャラ個別に最大TPを設定
 * アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 * <最大TP: 値>
 * 例: 
 * <最大TP: 200>
 * 　最大TPを 200 にする
 * ※設定が複数ある場合、最大値が適用される
 *
 *
 * ■初期TP
 * 標準は 0〜25
 * 好きな値にできる
 * 25~50 のように書くと、25〜50 のランダム値になる
 *
 * ⚫︎キャラ個別に初期TPを設定
 * アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 * <初期TP: 値>
 * 例: 
 * <初期TP: 50>
 * 　初期TPが 50 になる
 * <初期TP: 25~50>
 * 　初期TPが 25〜50 のランダム値になる
 * ※設定が複数ある場合、最大値が適用される
 *
 *
 * ■ダメージTPチャージ量
 * 標準は ダメージ / 最大HP(小数点切り捨て)
 *
 * ⚫︎ダメージTPカスタム
 * js式でTPチャージ量を記述
 * 25 * d / php* tcr  など
 *
 * ⚫︎ダメージTP固定値
 * 固定値分だけTPチャージするようにする
 * 5 なら 5 上昇
 * 
 * ⚫︎ダメージTP最低値
 * TPチャージ量の最低値を設定する
 * 5 なら 上昇量が 5 未満でも 5 は上昇
 *
 * ※優先度は カスタム > 固定値 > 最低値
 *
 * ⚫︎キャラ個別にダメージTPチャージ量を設定
 * アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 * <ダメージTPカスタム: 式>
 * <ダメージTP固定: 値>
 * <ダメージTP最低: 値>
 * 例: 
  * <ダメージTPカスタム: 25 * d / php* tcr>
 * 　ダメージTPの式が 25 * d / php* tcrになる
 *　この式はHPが少ないほどTPが多く溜まる仕様
 * <ダメージTP固定: 5>
 * 　ダメージTPが固定値で 5 になる
 * <ダメージTP最低: 5>
 * 　ダメージTP量の最低値が 5 になる
 * ※設定が複数ある場合、最大値が適用される
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * @param 最大TP
 * @desc TP最大値
 * @default 
 *
 * @param 初期TP
 * @desc TP初期値。5~10 で 5〜10 のランダムになる
 * @default 
 *
 * @param ダメージTPカスタム
 * @desc ダメージTPチャージ量をjs式で記述。a:行動者 b:被弾者 v:変数 d:ダメージ量 php:ダメージ前の被弾者HP tcr:TPチャージ率
 * @default 
 *
 * @param ダメージTP固定値
 * @desc ダメージTPチャージ量の固定値
 * @default 
 *
 * @param ダメージTP最低値
 * @desc ダメージTPチャージ量の最低値
 * @default 
 */
 
 
 
(() => {
    // プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    const parameters = PluginManager.parameters(pluginName);
    
    const keke_maxTp = parameters["最大TP"];
    const keke_initTp = parameters["初期TP"];
    const keke_damageTpCustom = parameters["ダメージTPカスタム"];
    const keke_damageTpFix = parameters["ダメージTP固定値"];
    const keke_damageTpMin = parameters["ダメージTP最低値"];
    
    
    
    //==================================================
    //-- TPカスタム
    //==================================================
    
    // 最大TP
    const _Game_BattlerBase_maxTp = Game_BattlerBase.prototype.maxTp;
    Game_BattlerBase.prototype.maxTp = function() {
         // 取得
        let val = keke_maxTp;
        const metas = totalAllMetaArray(this, ["最大TP", "maxTp"]);
        val = metas.length ? arrayMax(metas) : val;
        if (val) {
            return Number(val);
        }
        return _Game_BattlerBase_maxTp.apply(this);
    };
    
    
    // 初期TP
    const _Game_Battler_initTp = Game_Battler.prototype.initTp;
    Game_Battler.prototype.initTp = function() {
        // 取得
        let val = keke_initTp;
        const metas = totalAllMetaArray(this, ["初期TP", "initTp"]);
        val = metas.length ? arrayMax(metas) : val;
        if (val) {
            // 二点間ランダム
            val = betweenRandom(val);
            this.setTp(Number(val));
            return;
        }
        _Game_Battler_initTp.apply(this);
    };
    
    
    // ダメージTPチャージ量
    let d = null;
    let php = null;
    
    const _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
    Game_Battler.prototype.onDamage = function(value) {
        d = value;
        _Game_Battler_onDamage.apply(this, arguments);
        d = null;
    };
    
    
    const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        php = target.hp || 1;
        _Game_Action_executeHpDamage.apply(this, arguments);
        php = null;
    };
    
    
    const _Game_Battler_chargeTpByDamage = Game_Battler.prototype.chargeTpByDamage;
    Game_Battler.prototype.chargeTpByDamage = function(dr) {
        // カスタム
        if (keke_damageTpCustom) {
            let metas = totalAllMetaArray(this, ["ダメージTPカスタム", "damageTpCustom"]);
            const text = metas.length ? metas[metas.length - 1] : keke_damageTpCustom;
            const a = BattleManager._subject;
            const b = this;
            const v = $gameVariables._data;
            const tcr = b.tcr;
            const result = Math.round(eval(text));
            this.gainSilentTp(result);
            return result;
        }
        // 固定値
        let metas = totalAllMetaArray(this, ["ダメージTP固定", "damageTpFix"]);
        const fix = metas.length ? arrayMax(metas) : keke_damageTpFix;
        if (fix) {
            this.gainSilentTp(Number(fix) * this.tcr);
            return;
        }
        // 最低値
        metas = totalAllMetaArray(this, ["ダメージTP最低", "damageTpMin"]);
        const min = metas.length ? arrayMax(metas) : keke_damageTpMin;
        if (min) {
            const result = Math.floor(50 * dr * this.tcr);
            this.gainSilentTp(Math.max(result, Number(min)));
            return;
        }
        _Game_Battler_chargeTpByDamage.apply(this, arguments);
    };
    
    
    
    //==================================================
    //--  計算基本 /ベーシック
    //==================================================
    
    // 二点間ランダム
    function betweenRandom(val) {
        val = val.toString();
        let vals = val.split("~");
        if (vals.length >= 2) {
            vals = vals.map(v => Number(v));
            vals.sort((a, b) => a - b);
            val = vals[0];
            val += Math.randomInt(vals[1] - vals[0]) + 1;
        }
        return val;
    };
    
    
    // 配列最大値
    function arrayMax(array) {
        let max = null;
        let maxIndex = null;
        array.forEach((v, i) => {
            const vs = v.split("~");
            if (vs.length >= 2) {
                v = (Number(vs[0]) + Number(vs[1])) / 2;
            }
            v = Number(v);
            if (!max || v > max) {
                max = v;
                maxIndex = i;
            }
        });
        return array[maxIndex];
    };
    
    
    
    //==================================================
    //--  メタ配列 /ベーシック
    //==================================================
     
    // 全てのメタ配列を合算
    function totalAllMetaArray(battler, words, action) {
        // イニット
        let data = null
        let array = [];
        // バトラー値
        data = battler.actorId ? battler.actor() : battler.enemy();
        if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        if (battler._actorId) {
            // 職業値
            data = battler.currentClass();
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            // 装備値
            battler._equips.forEach(equip => {
                data = equip.object();
                if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            });
        }
        // ステート値
        battler._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        }, battler);
        // アクション値
        if (action) {
            data = action.item();
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        }
        // スペース削除
        array = array.map(e => e.replace(/\s/g, ""));
        // 空の要素は削除
        array = array.filter(e => e);
        return array;
    };
    
    
    
    //==================================================
    //--  全取得メタ /ベーシック
    //==================================================
    
   function metaAll(note, words) {
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
                });
            }
        });
        return result;
    };
      
})();