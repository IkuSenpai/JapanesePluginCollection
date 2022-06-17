//=============================================================================
// Keke_ElementFullCustom - 属性フルカスタム
// バージョン: 1.3.0
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 属性をいろいろと拡張する
 * @author ケケー
 * @url http://kekeelabo.com
 *
 *
 *
 * @help
 * 【1.3.0】
 * 属性をいろいろと拡張する
 *
 *
 *
 * ◉ 特徴 ◉
 *
 * ■属性ダメージの固定値増減(もちろん割合でも)
 * ■攻撃側からの属性ダメージ増減
 * ■属性によるダメージ反転(ダメージ<==>回復)
 * ■複数属性。計算法も設定できる(合算・最大値・平均)
 * ■技ごとに属性計算法を詳細設定
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * ■属性を設定する
 *
 * アクター、職業、装備、スキル、アイテム、ステートのメモ欄に
 *
 * 属性威力(属性による与ダメージ)を変えるなら
 * <属性威力: (計算記号)(効果値)(r), (!)(属性名), (属性名)>
 *
 * 属性耐性(属性による被ダメージ)を変えるなら
 * <属性耐性: (計算記号)(効果値)(r), (!)(属性名), (属性名)>
 *
 * 属性を追加するなら
 * <属性追加: (属性名),(属性名)>
 *
 * ※属性名は , で区切って何個でも追加できる。もちろん1個でもよい
 * 以下ふたつはスキル・アイテムのメモ欄だけ
 *
 * 属性ダメージの計算順を変えるなら
 * <属性計算: (乗算先/加算先)>
 
 * 複数属性時の計算法を変えるなら
 * <複数属性: (合算/最大値/平均)>
 *
 *
 * ★(計算記号)(効果値)(r)
 * ダメージの変動量
 * ◎ 計算記号が +  
 * 固定値加算。100 なら、ダメージが 100 増加。計算記号を省くとこれになる
 * ◎ 計算記号が - 
 * 固定値減算。-100 なら、ダメージが100減少
 * ◎ 計算記号が * 
 * 乗算。*2 なら、ダメージが 2倍 になる
 * ◎ 計算記号が / 
 * 除算。/2 なら、ダメージが 1/2倍 になる
 * ◎ 計算記号が +*  
 * 割合加算(乗算)。+*1 なら、元ダメージの 1倍分 ダメージを増加
 * ◎ 計算記号が -*  
 * 割合減算(乗算)。-*1 なら、元ダメージの 1倍分 ダメージを減少
 * ◎ 計算記号が +/  
 * 割合加算(除算)。+/2 なら、元ダメージの 1/2倍分 ダメージを増加
 * ◎ 計算記号が -/ 
 * 割合減算(除算)。-/2 なら、元ダメージの 1/2倍分 ダメージを減少
 * ◎ r 
 * ダメージ反転(reverseの略)。ダメージなら回復し、回復ならダメージを受けるようになる
 * ※割合加算とは
 * 元ダメージに割合をかけて足す計算法
 * 元ダメージが 100 、割合加算 0.1 と 0.2 がある場合、
 * 100 + 100 * 0.1 + 100 * 0.2 = 130
 *
 *
 * ★(属性名)
 * 適用する属性
 * データベースで設定した属性名を書く。IDではない
 * 以下特殊な書式
 * ◎ 全/all 
 * 全ての属性に適用する
 * ◎(!) 
 * 属性名の頭に i をつけると、書いた属性以外の属性全てに適用する
 * !炎, 氷 , 雷 なら、炎、氷、雷以外の全ての属性に適用
 *
 *
 * ★属性計算順
 * 属性ダメージを乗算と加算どちらを先に計算するか
 ※省略可能。省略した場合、プラグインパラメータでの設定が適用される
 * ◎乗算先 
 * 乗算を先に計算する
 * ◎加算先 
 * 加算と減算を先に計算する
 * ※計算順が変わると何が変わるか
 * 最終ダメージが変わる
 * 元ダメージが 100 、加算が +50 、乗算が *1.5 の場合、
 * ◎乗算先 => 100 * 1.5 + 50 = 200
 * ◎加算先 => (100 + 50) * 1.5 = 225
 *
 *
 * ★複数属性計算
 * 属性が複数あるとき、どのように効果を算出するか
 * 3つから選べる
 * ※省略可能。省略した場合、プラグインパラメータでの設定が適用される
 * ◎合算 => 全ての属性の効果を合算する
 * ◎最大値 => 最も有効な属性の効果のみ適用する
 * ◎平均 => 全ての属性の効果を平均する
 *
 *
 * ⚫︎具体例 
 * 炎属性の与ダメージ 100 増加
 * <属性威力: +100, 炎>
 *
 * 全属性の与ダメージ 2倍
 * <属性威力: *2, 全>
 *
 * 炎属性以外の与ダメージ 1倍分 増加
 * <属性威力: +*1, !炎>
 *
 * 氷属性と雷属性の被ダメージ 100 減少
 * <属性耐性: -100, 氷, 雷>
 *
 * 全属性の被ダメージ 1/2
 * <属性耐性: /2, 全>
 *
 * 氷属性と雷属性以外の被ダメージ 1/2倍分 減少
 * <属性耐性: -/2, !氷, 雷>
 *
 * 炎属性の攻撃を受けたとき回復
 * <属性耐性: r, 炎>
 *
 * 光属性と闇属性を追加する
 * <属性追加: 光, 闇>
 *
 * 属性計算を乗算先にする
 * <属性計算: 乗算先>
 *
 * 複数属性の効果を合算にする
 * <複数属性: 合算>
 * 
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 *
 *
 * @param 属性計算順
 * @desc 乗算と加算のどちらを先に計算するか
 * @type select
 * @option 乗算先
 * @option 加算先
 * @default 乗算先
 *
 * @param 複数属性計算
 * @desc 属性が複数あるとき、どのように効果を算出するか。技ごとにも設定できる
 * @type select
 * @option 合算
 * @option 最高値
 * @option 平均
 * @default 合算
 */
 
 
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    
    
    
    //--  パラメータ受け取り  --//
    
    
    const parameters = PluginManager.parameters(pluginName);
    
    const keke_elementCalcOrder = parameters["属性計算順"];
    const keke_manyElementCalc = parameters["複数属性計算"];
    
    
    
    
    
    
    //--  属性フルカスタム  --//
    
    
    //- 属性IDを送る
    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        this._elementIdEddKe = this.item().damage.elementId;
        return _Game_Action_makeDamageValue.call(this, target, critical);
    };
    
    
    //- 基本ダメージ値に属性ダメージを加算
    const _Game_Action_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
    Game_Action.prototype.evalDamageFormula = function(target) {
        let result = _Game_Action_evalDamageFormula.call(this, target);
        const oriDamage = result;
        // 属性取得
        const  elementId = this._elementIdEddKe;
        let elements = elementId < 0 ? this.subject().attackElements() : elementId > 0 ? [elementId] : [];
        // 追加属性取得
        let addElems = this.subject().totalAllMetaStringKeEmc(["属性追加", "elemAdd"]);
        addElems = addElems.map(elem => $dataSystem.elements.indexOf(elem));
        addElems = addElems.filter(elem => elem);
        if (addElems) { elements = elements.concat(addElems); }
        // 属性の重複を削除
        elements = elements.filter((e, i, self) => self.indexOf(e) == i);
        // 属性メタ取得
        let atks = this.subject().totalAllMetaArrayKeEmc(["属性威力", "elemAtk"]);
        let defs = target.totalAllMetaArrayKeEmc(["属性耐性", "elemDef"]);    
        // 乗算加算タイプ取得
        let tpType = keke_elementCalcOrder;
        meta = this.subject().getMetaStrKe(this.item().note, ["属性計算", "elemCalc"]);
        if (meta) { tpType = meta; }
        // メタ順ソート(威力)
        atks = atks.sortByCalcSymbolKeEmc(tpType);
        // メタ順ソート(耐性)
        defs = defs.sortByCalcSymbolKeEmc(tpType);
        // 属性展開
        const metaSet = [atks, defs];
        const pluss = [];
        const times = [];
        let reverse = false;
        elements.forEach((elemId, i) => {
            pluss[i] = 0;
            times[i] = 1;
            // メタ展開
            metaSet.forEach((metas, type) => {
                if (!metas.length) { return; }
                const isAtk = type == 0;
                const isDef = type == 1;
                let isRev = 1;
                isRev *= oriDamage < 0 ? -1 : 1;
                metas.forEach(meta => {
                    if (!meta) { return; }
                    const strs = meta.split(",");
                    const targets = strs.slice(1);
                    const anti = targets[0].includes("!");
                    // 属性一致してるか
                    let ok = anti ? true : false;
                    let id = null;
                    for (const target of targets) {
                        if (target == "全") { ok = true;  break; }
                        id = $dataSystem.elements.indexOf(target);
                        if (elemId == id) { ok = anti ? false : true; break; }
                    }
                    if (!ok) { return; }
                    // 一致してたら記号計算
                    const calcs = strs[0].calcBySymbolKeEmc(isRev < 0, result);
                    pluss[i] += calcs[0] ? calcs[0] : 0;
                    times[i] *= calcs[1] ? calcs[1] : 1;
                    // リバース判定
                    reverse = reverse || (strs[0].includes("r") ? true : false);
                }, this);
            }, this); 
        }, this);
        // 特徴の属性耐性を反映
        elements.forEach((elemId, i) => {
            times[i] *= target.elementRate(elemId);
        }, this);
        // 複数属性タイプ取得
        let manyType = keke_manyElementCalc;
        meta = this.subject().getMetaStrKe(this.item().note, ["複数属性", "manyElem"]);
        if (meta) { manyType = meta; }
        // 複数属性効果(加算)
        result += pluss.totalByTypeKeEmc(manyType, "加算");
        // 複数属性効果(乗算)
        result *= times.totalByTypeKeEmc(manyType, "乗算");
        // ダメージが0を越えたら0にする
        if (result * oriDamage < 0) { result = 0; }
        // リバース
        result *= reverse ? -1 : 1;
        return result;
    };
    
    
    
    
    
    
    //--  メタ文字列 /ベーシック  --//
     
     
    //- 全てのメタ文字列を合算
    Game_Battler.prototype.totalAllMetaStringKeEmc = function(words) {
        // イニット
        let data = null
        let str = "";
        // バトラー値
        data = this.actorId ? this.actor() : this.enemy();
        if (data) { str += this.getMetaStrKe(data.note, words, true); }
        if (this._actorId) {
            // 職業値
            data = this.currentClass();
            if (data) { str += this.getMetaStrKe(data.note, words, true); }
            // 装備値
            this._equips.forEach(equip => {
                data = equip.object();
                if (data) { str += this.getMetaStrKe(data.note, words, true); }
            }, this);
        }
        // ステート値
        this._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { str += this.getMetaStrKe(data.note, words, true); }
        }, this);
        // アクション値
        const actions = [BattleManager._action];
        const chainRun = BattleManager._chainRunActionKe;
        if (chainRun && chainRun != BattleManager._action) { actions.push(BattleManager._chainRunActionKe); }
        for (const action of actions) {
            if (!action) { continue; }
            data = action.item();
            if (data) { str += this.getMetaStrKe(data.note, words, true); }
        }
        // スペース削除
        str = str.replace(/\s/g, "");
        // 最後の , を削除
        if (str.match(/,+$/)) { str = str.replace(/,+$/, ""); }
        return str.split(",");
    };
    
    //- メタ文字列を取得
    Game_Battler.prototype.getMetaStrKe= function(note, words, total = false) {
        // イニット
        let str = "";
        // 取得計算
        metas = $gameSystem.metaAllKeEmc(note, words);
        for (const meta of metas) {
            str += meta;
            if (total) { str += meta ? "," : ""; }
        }
        return str;
    };
    
    
    
    
    
    
    //--  メタ配列 /ベーシック  --//
    
    
    //- 全てのメタ配列を合算
    Game_Battler.prototype.totalAllMetaArrayKeEmc = function(words) {
        // イニット
        let data = null
        let array = [];
        // バトラー値
        data = this.actorId ? this.actor() : this.enemy();
        if (data) { this.getMetaArrayKeEmc(data.note, words).forEach(e => array.push(e)); }
        if (this._actorId) {
            // 職業値
            data = this.currentClass();
            if (data) { this.getMetaArrayKeEmc(data.note, words).forEach(e => array.push(e)); }
            // 装備値
            this._equips.forEach(equip => {
                data = equip.object();
                if (data) { this.getMetaArrayKeEmc(data.note, words).forEach(e => array.push(e)); }
            }, this);
        }
        // ステート値
        this._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { this.getMetaArrayKeEmc(data.note, words).forEach(e => array.push(e)); }
        }, this);
        // アクション値
        const actions = [BattleManager._action];
        const chainRun = BattleManager._chainRunActionKe;
        if (chainRun && chainRun != BattleManager._action) { actions.push(BattleManager._chainRunActionKe); }
        for (const action of actions) {
            if (!action) { continue; }
            data = action.item();
            if (data) { this.getMetaArrayKeEmc(data.note, words).forEach(e => array.push(e)); }
        }
        // スペース削除
        array = array.map(e => e.replace(/\s/g, ""));
        // 空の要素は削除
        array = array.filter(e => e);
        return array;
    };
    
    //- メタ配列を取得
    Game_Battler.prototype.getMetaArrayKeEmc= function(note, words) {
        return $gameSystem.metaAllKeEmc(note, words);
    };
    
    
    
    
    
    
    //--  全取得メタ /ベーシック  --//
     
     
    Game_System.prototype.metaAllKeEmc = function(note, words) {
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
    
    
    
    
    
    
    //--  計算コモン /ベーシック  --//
    
    
    //- 配列の計算記号によるソート
    Array.prototype.sortByCalcSymbolKeEmc = function(type = "乗算先") {
        array = this;
        array = array.map(a => !a.startsWith("+") && !a.startsWith("-") && !a.startsWith("*") && !a.startsWith("/") ? "+" + a : a);
        const plus = array.filter(a => a.startsWith("+") || a.startsWith("*+") || a.startsWith("/+") || a.startsWith("-") || a.startsWith("*-") || a.startsWith("/*"));
        const times = array.filter(a => (a.startsWith("*") && !a.startsWith("*+") && !a.startsWith("*-")) || (a.startsWith("/") && !a.startsWith("/+") && !a.startsWith("/-")));
        array = type == "加算先" || type == "plus" ? plus.concat(times) : times.concat(plus);
        return array;
    }
    
    
    //- 文字列の記号による計算
    String.prototype.calcBySymbolKeEmc = function(rev = false, oriVal = 0) {
        const nums = this.match(/^([\+\-\*\/]+)(\d*.?\d*)/);
        const symbol = nums[1];
        let num = Number(nums[2]) || 0;
        let plus = null;
        let times = null;
        if (symbol == "+" || symbol == "-") {
            num *= rev ? -1 : 1;
            num *= symbol == "-" ? -1 : 1;
            plus = num;
        } else if ((symbol.includes("+") || symbol.includes("-")) && (symbol.includes("*") || symbol.includes("/"))) {
            num =  symbol.includes("/") ? oriVal / num : oriVal * num;
            num *= rev ? -1 : 1;
            num *=  symbol.includes("-") ? -1 : 1;
            plus = num;
        } else {
            times = symbol == "/" ? 1 / num : num;
        }
        return [plus, times]
    };
    
    
    //- 配列のタイプ別合算
    Array.prototype.totalByTypeKeEmc = function(type = "合算", calc = "加算") {
        let total = calc == "乗算" ? 1 : 0;
        const array = this;
        for (const val of array) {
            if (type == "最高値" || type == "total") {
                if (val > 0) { total = Math.max(val, total); }
                if (val < 0) { total = Math.min(val, total); }
            } else if (type == "平均" || type == "average") {
                total += val;
            } else {
                if (calc == "加算") { total += val;} else { total *= val; }
            }
        }
        if (type == "平均" || type == "average") { total /= array.length; }
        return total;
    };
        
})();