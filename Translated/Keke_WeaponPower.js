//=============================================================================
//  Keke_WeaponPower - 武器威力
// バージョン: 1.0.1
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc パラメータ『武器威力』を増設する
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.0.1】
 * パラメータ『武器威力』を増設する
 * ◎武器威力が独立して存在し、ダメージ計算の幅を広げられる
 * ◎武器タイプ別に武器威力を設定できる
 * 　剣の威力、弓の威力など
 * 
 *
 *
 * ◉使い方 ◉
 * 
 *
 * ■【1】武器威力を設定する
 * => 装備、アクター、職業、スキル、アイテム、敵キャラ、ステート のメモ欄に
 * 　<武器威力: 威力, 武器タイプ名>
 * 例)
 * <武器威力: 10>
 * 　武器タイプ『なし』の武器威力を 10 加算
 * <武器威力: 10, 剣>
 * 　武器タイプ『剣』の武器威力を 10 加算
 *　 ※あらかじめ武器タイプ『剣』を作っておくこと
 * <武器威力: 10, 剣, 弓>
 * 　武器タイプ『剣』『弓』の武器威力を 10 加算
 * <武器威力: 10, 全>
 * 　全ての武器タイプの武器威力を 10 加算
 * <武器威力: -10>
 * 　武器威力を 10 減算
 * <武器威力: *1.2>
 * 　武器威力を 1.2 倍
 * <武器威力: /2>
 * 　武器威力を 1/2 倍
 * ◎武器威力というが、武器以外にもあらゆる項目に設定できる
 * ◎武器タイプを設定しない場合、武器タイプ『なし』となり、
 * 　使用武器『なし』スキルに武器威力を反映する
 * ◎武器タイプが『剣』の場合、
 * 　使用武器に『剣』があるスキルに武器威力を反映する
 * ◎武器タイプが『全』の場合、全てのスキルに対応する
 *
 *
 * ■【2】スキルから武器威力を参照する
 * => スキル/アイテム → ダメージ → 計算式
 * 　a.wpn
 * 防御側の場合は
 * 　b.wpn
 * 例)
 * a.atk * a.wpn - b.def
 * 　使い手の攻撃力と武器威力を掛ける計算式
 *
 *
 * ■【3】スキルの使用武器を設定する
 * スキル/アイテムのメモ欄に
 * 　<使用武器: 武器タイプ名>
 * 例)
 * <使用武器: 剣>
 * 　武器タイプ『剣』の武器威力を反映する
 * <使用武器: 剣, 弓>
 * 　武器タイプ『剣』『弓』の武器威力を反映する
 * <使用武器: 全>
 * 　全ての武器威力を反映する
 * ◎使用武器を設定しない場合、使用武器『なし』となり、
 * 　武器タイプ『なし』の武器威力を反映する
 * 
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //--  武器威力 
    //==================================================
    
    //- プロパティ定義
    Object.defineProperties(Game_BattlerBase.prototype, {
        wpn: {
            get() { return getWeaponPower(this); },
            configurable: true
        }
    });
    
    
    // 使用アイテムを保存
    let action = null;
    const _Game_Action_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
    Game_Action.prototype.evalDamageFormula = function(target) {
        action = this;
        return _Game_Action_evalDamageFormula.call(this, target);
    };
    
    
    // 武器威力の取得
    function getWeaponPower(battler) {
        // 使用武器を取得
        const item = action.item();
        const uses = [];
        metaAll(item.note, ["使用武器", "useWeapon"]).forEach(e => uses.push(e));
        // メモ欄から武器威力のメタ配列を取得
        const array = totalAllMetaArray(battler, ["武器威力", "weaponAtk"], action);
        // メタ配列を合算
        let pow = 0;
        let rate = 1;
        array.forEach(e => {
            if (!e) { return; }
            const es = e.replace(/\s/g, "").split(",");
            let val = es[0];
            const types = es.splice(1);
            // 武器タイプ判定
            let ok = false;
            if (types.some(t => t.match(/^(全|all)$/)) || uses.some(r => r.match(/^(全|all)$/))) {
                ok = true;
            } else if (types.length) {
                ok = uses.some(r => types.some(t => t == r));
            } else {
                ok = !uses.length;
            }
            if (!ok) { return; }
            // 計算
            if (val.includes("+")) {
                val = val.replace("+", "");
                pow += Number(val);
            } else if (val.includes("-")) {
                val = val.replace("-", "");
                pow -= Number(val);
            } else if (val.includes("*")) {
                val = val.replace("*", "");
                rate *= Number(val);
            } else if (val.includes("/")) {
                val = val.replace("/", "");
                rate /= Number(val);
            } else {
                pow += Number(val);
            }
        });
        pow = Math.max(0, pow * rate) || 1;
        return pow;
    };
    
    
    
    //==================================================
    //--  メタ配列 /ベーシック
    //==================================================
    
    //- 全てのメタ配列を合算
    function totalAllMetaArray(battler, words, action) {
        // イニット
        let array = [];
        let data = null;
        // バトラー値
        data = battler.actorId ? battler.actor() : battler.enemy();
        if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
        if (battler._actorId) {
            // 職業値
            data = battler.currentClass();
            if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            // 装備値
            battler.equips().forEach(data => {
                if (data) { metaAll(data.note, words).forEach(e => array.push(e)); }
            }, battler);
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
        // 空の要素は削除
        array = array.filter(e => e);
        return array;
    };
    
    
    //- 全取得メタ
    function metaAll(note, words) {
        let result = [];
        words.forEach(word => {
            const regText = '\<' + word + ':([^\>]*)\>';
            const regExp_g = new RegExp(regText, 'g');
            const regExp = new RegExp(regText);
            const matches = note.match(regExp_g);
            if (matches) {
                matches.forEach(function(line) {
                    result.push(line.match(regExp)[1].replace(/\s/g, ""));
                });
            }
        });
        return result;
    };
    
})();