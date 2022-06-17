//=============================================================================
//  Keke_HpOverReduce - HP超過回復 & 削減攻撃
// バージョン: 1.5.1
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc HP超過回復 + 最大HP削減攻撃
 * @author ケケー
 * @url http://kekeelabo.com
 *
 *
 *
 * @help
 * 【ver.1.5.1】
 * HPの最大値を超えて回復できる + 攻撃で最大HPを削れる
 * ツクールMZ/MV両対応
 *
 *
 *
 * ◉ 特徴 ◉
 *
 * ■融通のきく設定
 * HP超過/削減の効果割合や限界、
 * 戦闘終了で解除するか、全回復で解除するかなど、
 * 細かな設定ができて使い勝手がよい
 *
 *
 *
 * ◉ 使い方 ◉
 * 
 * ■HP超過/最大HP削減を付与
 * やり方は二通り
 * 【方法1】コモンで設定 + メモ欄で呼び出し
 * 【方法2】メモ欄で直接設定
 *
 *
 * ▼【方法1】コモンで設定 + メモ欄で呼び出し
 * (1)プラグインパラメータでコモンを作成する
 * => プラグインパラメータ → HP超過コモン/最大HP削減コモン
 *
 * (2)メモ欄で呼び出す
 * アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 *
 * <HP超過: 呼び出し名>
 * <最大HP削減: 呼び出し名>
 *
 * 例)
 * <HP超過: 並1>
 * 呼び出し名が『並1』のコモンを呼び出す
 * 
 *
 * ▼【方法2】メモ欄で直接設定
 * アクター、職業、スキル、アイテム、装備、敵キャラ、ステート のメモ欄に
 *
 * <HP超過: 最大値, 算入率, 重複回数, 無視フラグ, 解除フラグ>
 * <最大HP削減: 削減率, 解除フラグ>
 *
 * ◎最大値 => 最大HPの何倍まで超過できるか
 * 1.5 なら 1.5倍。-1 で無制限。省略すると 1
 * ◎算入率 => 超過した分の何倍をHPに算入できるか
 * 0.5 なら 0.5倍。省略すると 1
 * ◎重複回数 => 何回まで重複して超過できるか
 * 1 なら超過状態からさらにもう 1回。-1 で無制限。省略すると 0
 * ◎無視フラグ => 最大HPの削減分を無視し、常にフルで超過させるか
 * 1 で無視。0 で無視しない。省略すると 0
 * ◎解除フラグ => 戦闘終了時に解除するか
 * 1 で解除。0 で解除しない。省略すると動作設定に従う
 * ◎削減率 => 与ダメージの何倍分の最大HPを削れるか
 * 0.5 なら 0.5倍。省略すると 1
 *
 * 例)
 * <HP超過: 2.5, 0.5, 1>
 * 最大HPの 2.5倍 まで、超過したぶんの 0.5倍 がHPに算入され、
 * さらに もう1回 超過できる
 *
 * ※超過設定が複数ある場合
 * 最も高い設定が適用される
 *
 *
 *
 * ■HP超過/最大HP削減状態を解除
 * ★【1】戦闘終了で解除
 * => プラグインパラメータ → HP超過-戦闘終了で解除/最大HP削減-戦闘終了で解除
 * を true にする
 *
 * ★【2】全回復で解除
 * => プラグインパラメータ → HP超過-全回復で解除/最大HP削減-全回復で解除
 * を true にする
 *
 * ★【3】手動で解除
 * => プラグインコマンド → HP超過を解除/最大HP削減を解除
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
 * @param ◉コモン
 *
 * @param HP超過コモン
 * @parent ◉コモン
 * @desc HP超過設定のリスト。メモ欄から <HP超過:呼び出し名> で呼び出せる。何個でも追加できる
 * @type struct<hpOverData>[]
 * @default ["{\"呼び出し名\":\"弱-1\",\"最大値\":\"1.5\",\"算入率\":\"1\",\"重複回数\":\"0\",\"最大HP削減無視\":\"false\",\"戦闘終了で解除\":\"\"}","{\"呼び出し名\":\"中-1\",\"最大値\":\"2\",\"算入率\":\"1\",\"重複回数\":\"0\",\"最大HP削減無視\":\"false\",\"戦闘終了で解除\":\"\"}","{\"呼び出し名\":\"強-1\",\"最大値\":\"3\",\"算入率\":\"1\",\"重複回数\":\"0\",\"最大HP削減無視\":\"false\",\"戦闘終了で解除\":\"\"}"]
 *
 * @param 最大HP削減コモン
 * @parent ◉コモン
 * @desc 最大HP削減設定のリスト。メモ欄から <最大HP削減:呼び出し名> で呼び出せる。何個でも追加できる
 * @type struct<mHpReduceData>[]
 * @default ["{\"呼び出し名\":\"弱-1\",\"削減率\":\"0.25\",\"戦闘終了で解除\":\"\"}","{\"呼び出し名\":\"中-1\",\"削減率\":\"0.5\",\"戦闘終了で解除\":\"\"}","{\"呼び出し名\":\"強-1\",\"削減率\":\"1\",\"戦闘終了で解除\":\"\"}"]
 *
 * @param ◉文字色
 *
 * @param HP超過-文字色
 * @parent ◉文字色
 * @desc HP超過時の文字色。0〜31。初期値 24
 * @type number
 * @min 0
 * @max 31
 * @default 24
 *
 * @param 最大HP削減-文字色
 * @parent ◉文字色
 * @desc HP削減時の文字色。0〜31。初期値 24
 * @type number
 * @min 0
 * @max 31
 * @default 14
 *
 * @param ◉動作-HP超過
 *
 * @param HP超過-非戦闘時も
 * @parent ◉動作-HP超過
 * @desc 戦闘中以外でもHP超過できる
 * @type boolean
 * @default false
 *
 * @param HP超過-戦闘終了で解除
 * @parent ◉動作-HP超過
 * @desc 戦闘終了時にHP超過を解除する
 * @type boolean
 * @default false
 *
 * @param HP超過-全回復で解除
 * @parent ◉動作-HP超過
 * @desc コマンド『全回復』でHP超過を解除する
 * @type boolean
 * @default true
 *
 * @param ◉動作-最大HP削減
 *
 * @param 最大HP削減-戦闘終了で解除
 * @parent ◉動作-最大HP削減
 * @desc 戦闘終了時にHP削減を解除する
 * @type boolean
 * @default false
 *
 * @param 最大HP削減-全回復で解除
 * @parent ◉動作-最大HP削減
 * @desc コマンド『全回復』でHP削減を解除する
 * @type boolean
 * @default true
 *
 *
 *
 *
 *
 * @command 状態解除
 * @desc HP超過/最大HP削減をクリアする
 *
 * @arg HP超過を解除
 * @desc パーティのHP超過を全て解除する
 * @type boolean
 * @default true
 *
 * @arg 最大HP削減を解除
 * @desc パーティの最大HP削減を全て解除する
 * @type boolean
 * @default true
 */
 
 
 
 
/*~struct~hpOverData:
 *
 * @param 呼び出し名
 * @desc メモ欄から呼び出すための名前
 * @default
 *
 * @param 最大値
 * @desc 最大HPの何倍まで超過できるか。1.5 なら 1.5倍。-1 で無制限
 * @default 2
 *
 * @param 算入率
 * @desc 超過した分の何倍をHPに算入できるか。0.5 なら 0.5倍
 * @default 1
 *
 * @param 重複回数
 * @desc  何回まで重複して超過できるか。1 なら超過状態からさらにもう 1回。-1 で無制限
 * @default 0
 *
 * @param 最大HP削減無視
 * @desc 最大HPの削減分を無視し、常にフルにHP超過できるようにする
 * @type boolean
 * @default false
 *
 * @param 戦闘終了で解除
 * @desc 戦闘終了時にHP超過を解除させるか。省略すると動作設定に従う
 * @type boolean
 * @default
 */
 
 
 
 
 /*~struct~mHpReduceData:
 *
 * @param 呼び出し名
 * @desc メモ欄から呼び出すための名前
 * @default
 *
 * @param 削減率
 * @desc 与ダメージの何倍分の最大HPを削れるか。0.5 なら 0.5倍
 * @default 1
 *
 * @param 戦闘終了で解除
 * @desc 戦闘終了時に最大HP削減を解除させる。省略すると動作設定に従う
 * @type boolean
 * @default
 */
 
 
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    
    
    //--  文字列オート変換 /ベーシック  --//
    
    
    //- 文字列のハッシュ化
    function strToHash(str) {
        if (!str || !str.length) { return {}; }
        let hash = {};
        const strs = JSON.parse(str);
        let val = null;
        let val2 = null;
        for (let key in strs) {
            val = strs[key];
            if (!key || !val) { continue; }
            val2 = strToAuto(val, key);
            hash[key] = val2;
        }
        return hash;
    };
    
    
    //- 文字列のリスト化
    function strToList(str) {
        if (!str || !str.length) { return []; }
        let array = JSON.parse(str);
        return array.map((val, i) => {
            return strToAuto(val);
        }, this);
    };
    
    
    //- 文字列の自動処理
    function strToAuto(val, key = "") {
        let val2 = null;
        let match = null;
        let end = false;
        if (!end) {
            if (val[0] == "{") {
                val2 = strToHash(val);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "[") {
                val2 = strToList(val);
                end = true;
            }
        }
        if (!end) { val = val + ","; }
        if (!end) {
            match = val.match(/^\s*(-?\d+,\s*-?\d+,\s*-?\d+,?\s*-?\d*\.?\d*)\s*,$/);
            if (match && !val.match(/[a-z]/)) {
                if (key.match(/(カラー|色)/) && !key.includes("トーン") && !key.includes("ブレンド") && !key.includes("配色") && !key.includes("着色") &&  !key.includes("フラッシュ") && !key.includes("チェンジ") &&  !key.includes("選択")) {
                    val2 =  "rgba(" +  match[1] + ")";
                } else {
                    val2 =  eval("[" +  match[1] + "]");
                }
                end = true;
            }
        }
        if (!end) {
            match = val.match(/(-?\d+\.?\d*),\s*/g);
            if (match && match.length >= 2 && !val.match(/[a-z]/) && !val.match(/~/)) {
                val2 =  eval("[" + match.reduce((r, s) => r + s) + "]");
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(true|false)\s*,/);
            if (match) {
                val2 =  match[1] == "true" ? true : false;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(-?\d+\.?\d*)\s*,/);
            if (match && !val.match(/[a-z]/)) {
                val2 = Number(match[1]); end = true;
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "\"") { val = val.slice(1); }
            val2 = val.slice(0, -1);
        }
        return val2;
    };
    
    
    
    
    
    //--  パラメータ受け取り  --//
    
    
    const parameters = PluginManager.parameters(pluginName);
    
    //- コモン
    const keke_hpOverCommon = strToList(parameters["HP超過コモン"]);
    const keke_hpReduceCommon = strToList(parameters["最大HP削減コモン"]);
    
    //- 文字色
    const keke_hpOverTextColor = Number(parameters["HP超過-文字色"]);
    const keke_mhpReduceTextColor = Number(parameters["最大HP削減-文字色"]);
    
    //動作-HP超過
    const keke_hpOverNoInBattle = eval(parameters["HP超過-非戦闘時も"]);
    const keke_delHpOverAtBattleEnd = eval(parameters["HP超過-戦闘終了で解除"]);
    const keke_delHpOverAtAllHeal = eval(parameters["HP超過-全回復で解除"]);
    
    //- 動作-最大HP削減
    const keke_delMhpReduceAtBattleEnd = eval(parameters["最大HP削減-戦闘終了で解除"]);
    const keke_delMhpReduceAtAllHeal = eval(parameters["最大HP削減-全回復で解除"]);
    
    
    
    
    
    //--  プラグインコマンド  --//
    
    
    //- 状態解除
    if (typeof(ColorManager) != "undefined") {
    PluginManager.registerCommand(pluginName, "状態解除", args => {
        // HP超過を解除
        if (args["HP超過を解除"]) {
            $gameParty.allMembers().forEach(actor => {
                // HP超過の消去
                delHpOver(actor)
            }, this);
        }
        // 最大HP削減を解除
        if (args["最大HP削減を解除"]) {
            $gameParty.allMembers().forEach(actor => {
                // 最大HP削減の消去
                delMhpReduce(actor)
            }, this);
        }
    });
    }
    
    
    
    
    
    //--  共通処理  --//
    
    
    //- HP超過/最大HP削減データの取得 呼び出し
    const _Game_Action_testApply = Game_Action.prototype.testApply;
    Game_Action.prototype.testApply = function(target) {
        // HP超過データの取得
        const over = getHpOverData(target, this);
        // 最大HP削減データの取得
        const reduce = getMhpReduceData(this.subject(), target, this);
        // 条件が合えば非戦闘時HP満タンでも使用可能に
        let result =  _Game_Action_testApply.call(this, target);
        if (!$gameParty.inBattle() && testLifeAndDeath(this, target)) {
            if (this.isHpRecover() && over) { result = true; }
        }
        return result;
    };
    
    
    //- 戦闘終了でHP超過/最大HP削減を解除
    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.call(this);
        $gameParty.allMembers().forEach(actor => {
            // HP超過の消去
            let delOver = actor._delHpOverKe != null ? actor._delHpOverKe : keke_delHpOverAtBattleEnd
            if (delOver) {
                delHpOver(actor);
            }
            // 最大HP削減の消去
            let delReduce = actor._delMhpReduceKe != null ? actor._delMhpReduceKe : keke_delMhpReduceAtBattleEnd;
            if (delReduce) {
                delMhpReduce(actor);
            }
            // リフレッシュ
            actor.refresh();
        }, this);
    };
    
    
    //- 全回復でHP超過/最大HP削減を解除
    const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
    Game_BattlerBase.prototype.recoverAll = function() {
        const preHp = this._hp;
        // 最大HP削減の消去
        if (keke_delMhpReduceAtAllHeal) {
            delMhpReduce(this);
        }
        _Game_BattlerBase_recoverAll.call(this);
        // HP超過の消去
        if (keke_delHpOverAtAllHeal) {
            delHpOver(this);
        } else {
            // 超過HPの保持
            if (preHp > this.mhp) { this._hp = preHp; }
        }
    };
    
    
    //- HP超過/最大HP削減時のHPカラー(MZ)
    if (typeof(ColorManager) != "undefined") {
    const _ColorManager_hpColor = ColorManager.hpColor;
    ColorManager.hpColor = function(actor) {
        let color = _ColorManager_hpColor.call(this, actor);
        // HP超過カラー
        if (actor._hp > actor.mhp) {
            color = this.textColor(keke_hpOverTextColor);
        } else if (actor._reduceMhpKe != null && actor.hp >= actor.mhp / 4) {
            color = this.textColor(keke_mhpReduceTextColor);
        }
        return color;
    };
    }
    
    
    //- HP超過/最大HP削減時のHPカラー(MV)
    const _Window_Base_hpColor = Window_Base.prototype.hpColor;
    Window_Base.prototype.hpColor = function(actor) {
        let color = _Window_Base_hpColor.call(this, actor);
        // HP超過カラー
        if (actor._hp > actor.mhp) {
            color = this.textColor(keke_hpOverTextColor);
        } else if (actor._reduceMhpKe != null && actor.hp >= actor.mhp / 4) {
            color = this.textColor(keke_mhpReduceTextColor);
        }
        return color;
    };
    
    
    
    
    
    //--  HP超過回復  --//
    
    
    //- 生死テスト(独自)
    function testLifeAndDeath(action, target) {
        if (action.isForOpponent() || action.checkItemScope([7, 8, 11, 14])) {
            return target.isAlive();
        } else if (action.isForDeadFriend()) {
            return target.isDead();
        } else {
            return true;
        }
    };
    
    
    //- HP超過データの取得
    function getHpOverData(target, action, wait = false) {
        // バトル時のみ&非バトル時はリターン
        if (!keke_hpOverNoInBattle && !$gameParty.inBattle()) { return null; }
        // イニット
        const d = target._hpOverDataKe;
        let max = 0;
        let rate = 0;
        let pile = 0;
        let ignore = false;
        let del = null;
        // ウェイト中はリターン
        if (d && d.wait) { return d; }
        // 初期化
        target._hpOverDataKe = null;
        // メモ欄からHP超過のメタ配列を取得
        const overNotes = totalAllMetaArray(target, ["HP超過", "hpOver"], action);
        if (!overNotes.length) { return; }
        // メタ配列からデータを取得
        overNotes.forEach(note => {
            let maxD = null;
            let rateD = null;
            let pileD = null;
            let ignoreD = null;
            let delD = null;
            // コモンを検索
            let geted = false;
            for (let cmn of keke_hpOverCommon) {
                if (note == cmn["呼び出し名"]) {
                    maxD = cmn["最大値"];
                    rateD = cmn["算入率"];
                    pileD = cmn["重複回数"];
                    ignore = cmn["最大HP削減無視"];
                    delD = cmn["戦闘終了で解除"];
                    geted = true;
                    break;
                }
            }
            // コモンがなかったら直接取得
            if (!geted) {
                const p = note.split(",");
                maxD = Number(p[0]);
                rateD = Number(p[1]);
                pileD = Number(p[2]);
                ignoreD = Number(p[3]);
                delD = Number(p[4]);
            }
            // 合算
            max = (max < 0 || maxD < 0) ? -1 : Math.max(max, maxD);
            rate = Math.max(rate, rateD);
            pile = (pile < 0 || pileD < 0) ? -1 : Math.max(pile, pileD);
            ignore = ignore || ignoreD;
            del = del || delD;
        }, target);
        // 最大値が最大HP以下にならないようにする
        if (max >= 0) { max = Math.max(max, 1); }
        // 変数にセット
        target._hpOverDataKe = { max:max || 2, rate:rate || 1, pile:pile || 0, ignore:ignore, wait:wait };
        // 消去フラグ
        if (del != null) { target._delHpOverKe = del; }
        return target._hpOverDataKe;
    };
    
    
    //- 変更前のHPを保存
    const _Game_Battler_setHp = Game_Battler.prototype.setHp;
    Game_Battler.prototype.setHp = function(hp) {
        this._preHpKeHpof = this._hp;
        _Game_Battler_setHp.call(this, hp);
    };
    
    
    //- HP超過の適用 呼び出し
    const _Game_Battler_refresh = Game_Battler.prototype.refresh;
    Game_Battler.prototype.refresh = function() {
        const newHp = this._hp;
        _Game_Battler_refresh.call(this);
        // HP超過の適用
        applyHpOver(this, newHp);
    };
    
    
    //- HP超過の適用
    function applyHpOver(subject, newHp) {
        // バトル時のみ&非バトル時はリターン
        if (!keke_hpOverNoInBattle && !$gameParty.inBattle()) {
            delHpOver(subject, true);
            return;
        }
        // イニット
        if (!subject._hpOverNowKe) { subject._hpOverNowKe = { num:0 } }
        const d = subject._hpOverDataKe;
        const n = subject._hpOverNowKe;
        // データも現超過もないならリターン
        if (!d && !n.num) { return; }
        // データがあればウェイト解除
        if (d) { d.wait = false; }
        // 変更前のHPを取得
        const preHp = subject._preHpKeHpof;
        subject._preHpKeHpof = null;
        // 超過量と回復量を取得
        const over = newHp - subject.mhp;
        const heal = newHp - preHp;
        // 超過してない場合は、現超過を初期化してリターン
        if (over <= 0) {
            n.num = 0;
            n.pile = 0;
            return;
        }
        // 回復でない場合は、新HPを適用しリターン
        if (preHp == null || heal <= 0) {
            subject._hp = newHp;
            return;
        }
        // 超過・回復時、超過データがないなら旧HPを適用しリターン
        if (!d) {
            subject._hp = Math.max(preHp, subject.mhp);
            return;
        }
        // 超過・回復・データ時、重複数を超えたら旧HPを適用しリターン
        if (!canPileHpOver(subject)) {
            subject._hp = preHp;
            return;
        }
        // 超過・回復・データ・重複可能時は超過計算
        let plus = 0;
        if (preHp < subject.mhp) {
            plus = (heal - over) + over * d.rate; 
        } else {
            plus = heal * d.rate;
        }
        // 最大HP削減無視の処理
        const reduceMhp = subject._reduceMhpKe;
        if (d.ignore || n.ignore) { subject._reduceMhpKe = null; }
        // HPを最大値内で加算
        subject._hp = Math.round(preHp + plus);
        const max = (n.max < 0 || d.max < 0) ? -1 : Math.max(n.max || 0, d.max || 0);
        if (max >= 0) { subject._hp = Math.min(subject._hp, Math.round(subject.mhp * max)); }
        if (d.ignore) { subject._reduceMhpKe = reduceMhp; }
        // 超過数を加算
        n.num++;
        // 超過データ数を保存
        n.max = d.max;
        n.pile = d.pile;
        n.ignore = d.ignore;
    };
    
    
    //- HP超過重複可能か
    function canPileHpOver(battler) {
        const d = battler._hpOverDataKe;
        const n = battler._hpOverNowKe;
        const pile = d ? d.pile : n.pile || 0;
        return !(pile >= 0 && n.num > pile)
    };
    
    
    //- HP超過の消去
    function delHpOver(subject, delOnly = false) {
        subject._hpOverDataKe = null;
        subject._hpOverNowKe = null;
        subject._delHpOverKe = null;
        if (!delOnly) { subject.refresh(); }
    };
    
    
    //- ターン終了時に超過データを削除
    const _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        this._hpOverDataKe = null;
        _Game_Battler_onTurnEnd.call(this);
    };
    
    
    
    
    
    //--  最大HP削減  --//
    
    
    //- 最大HP削減データの取得
    function getMhpReduceData(subject, target, action, wait = false) {
        // 非バトル時はリターン
        if (!$gameParty.inBattle()) { return null; }
        // イニット
        const d = subject._mhpReduceDataKe;
        let min = 0;
        let rate = 0;
        let pile = 0;
        let del = null;
        // ウェイト中はリターン
        if (d && d.wait) { return d; }
        // 初期化
        subject._mhpReduceDataKe = null;
        // メモ欄から最大HP削減のメタ配列を取得
        const reduceNotes = totalAllMetaArray(subject, ["最大HP削減", "mhpReduce"], action);
        if (!reduceNotes.length) { return; }
        // メタ配列からデータを取得
        reduceNotes.forEach(note => {
            let minD = null;
            let rateD = null;
            let pileD = null;
            let delD = null;
            // コモンを検索
            let geted = false;
            for (let cmn of keke_hpReduceCommon) {
                if (note == cmn["呼び出し名"]) {
                    rateD = cmn["削減率"];
                    delD = cmn["戦闘終了で解除"];
                    geted = true;
                    break;
                }
            }
            // コモンがなかったら直接取得
            if (!geted) {
                const p = note.split(",");
                rateD = Number(p[0]);
                delD = Number(p[1]);
            }
            // 合算
            rate = Math.max(rate, rateD);
            del = del || delD;
        }, subject);
        // 変数にセット
        subject._mhpReduceDataKe = { rate:rate || 1, wait:wait };
        // 消去フラグ
        if (del != null) { target._delMhpReduceKe = del; }
        return subject._mhpReduceDataKe;
    };
    
    
    //- 最大HP削減の適用 呼び出し
    const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
    Game_Action.prototype.executeHpDamage = function(target, value) {
        _Game_Action_executeHpDamage.call(this, target, value);
        applyMhpReduce(this.subject(), target, value);
    };


    //- 最大HP削減の適用
    function applyMhpReduce(subject, target, value) {
        if (value <= 0) { return; }
        if (!subject._mhpReduceDataKe) { return; }
        // 削減量を取得
        const data = subject._mhpReduceDataKe;
        const reduce = value * data.rate;
        if (!reduce) { return; }
        // 削減セット
        if (target._reduceMhpKe == null) { target._reduceMhpKe = target.mhp; }
        target._reduceMhpKe = Math.max(Math.round(target._reduceMhpKe - reduce), 1);
    };
    
    
    //- 削減最大HP
    const _Game_BattlerBase_param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function(paramId) {
        let val = _Game_BattlerBase_param.call(this, paramId);
        if (paramId == 0) { val = this._reduceMhpKe != null ? this._reduceMhpKe : val; }
        return val;
    };
    
    
    //- 最大HP削減の消去
    function delMhpReduce(subject, delOnly = false) {
        subject._mhpReduceDataKe = null;
        subject._reduceMhpKe = null;
        subject._delMhpReduceKe = null;
        if (!delOnly) { subject.refresh(); }
    };
    
    
    
    
    
    //--  メタ配列 /ベーシック  --//
     
     
    //--  メタ配列 /ベーシック  --//
    
    
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