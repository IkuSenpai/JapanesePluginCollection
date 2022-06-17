//=============================================================================
//  Keke_AutoReloadItem - アイテム自動補充
// バージョン: 1.1.1
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc アイテムを自動補充する
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.1.1】
 * アイテムを一定数まで自動補充する
 * ◎補充数が 3個 で現在の所持数が 1個なら、2つ 補充して 3個 にする
 * ◎補充されるタイミングを設定できる
 * ◎補充される条件を設定できる
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * ■アイテム自動補充の設定
 * => プラグインコマンド → 自動補充の設定
 * ◎アイテム
 * 自動補充するアイテム
 * ◎補充数
 * この個数になるまで補充する。0 にすると自動補充解除
 * ◎条件分だけ増加
 * 条件に合致した分だけ補充数が増加する
 * たとえば、スキル『爆弾生成』の所持が条件で、所持者が 3人 いる場合、
 * 補充数が 3倍 になる
 * ◎タイミング
 * いつ補充するか
 * ・全回復時
 * ・戦闘開始時
 * ・戦闘終了時
 * ・戦闘開始時と終了時
 * ・戦闘中のみ
 * ・なし
 * ※戦闘中のみの場合は、戦闘中のみ登場するアイテムになる
 * ※なしの場合は後述のプラグインコマンドによる手動実行でのみ補充できる
 * ◎条件
 * 補充が実行される条件。以下詳しく説明
 *
 * ★条件
 * ◎アクター
 * 必要なアクター。このアクターがパーティにいるか
 * ◎職業
 * 必要な職業。この職業のアクターがパーティにいるか
 * ◎スキル
 * 必要なスキル。このスキルを覚えたアクターがパーティにいるか
 * ◎アイテム
 * 必要なアイテム。このアイテムを持っているか
 * ◎武器
 * 必要な武器。この武器を装備したアクターがパーティにいるか
 * ◎防具
 * 必要な防具。この防具を装備したアクターがパーティにいるか
 * ◎ステート
 * 必要なステート。このステートのかかったアクターがパーティにいるか
 * ◎スイッチ
 * 必要なスイッチ。このスイッチがオンになっているか
 * ◎変数
 * 必要な変数。この変数が指定の値以上になっているか
 *
 *
 * ■アイテム自動補充の手動実行
 * => プラグインコマンド → 自動補充の実行
 * 自動補充を強制的に実行する
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
 * @command 自動補充の設定
 * @desc 自動補充アイテムを設定する
 *
 * @arg タグ
 * @desc 何を書いてもいい欄
 * @default 
 *
 * @arg アイテム
 * @desc 自動補充するアイテム
 * @type item
 * @default 
 *
 * @arg 補充数
 * @desc 補充する個数。この個数を足すのではなく、常にこの個数になる。0 にすると自動補充解除
 * @default 1
 *
 * @arg 条件分だけ増加
 * @desc 条件に合致した分だけ補充数が増加する。条件合致アクター 3人 いれば補充数も 3倍 など
 * @type boolean
 * @default true
 *
 * @arg タイミング
 * @desc いつ補充するか
 * @type select
 * @option 全回復時
 * @option 戦闘開始時
 * @option 戦闘終了時
 * @option 戦闘開始時と終了時
 * @option 戦闘中のみ
 * @default 全回復時
 *
 * @arg 条件
 * @desc 補充が実行される条件
 * @type struct<condition>
 * @default 
 *
 *
 *
 *
 *
 * @command 自動補充の実行
 * @desc 自動補充を手動実行する
 */
 
 
 
 
 
/*~struct~condition:
 * @param アクター
 * @desc このアクターがパーティにいるか
 * @type actor
 *
 * @param 職業
 * @desc この職業のアクターがパーティにいるか
 * @type class
 *
 * @param スキル
 * @desc このスキルを覚えたアクターがパーティにいるか
 * @type skill
 *
 * @param アイテム
 * @desc このアイテムを持っているか
 * @type item
 *
 * @param 武器
 * @desc この武器を装備したアクターがパーティにいるか
 * @type weapon
 *
 * @param 防具
 * @desc この防具を装備したアクターがパーティにいるか
 * @type armor
 *
 * @param ステート
 * @desc このステートのかかったアクターがパーティにいるか
 * @type state
 *
 * @param スイッチ
 * @desc 必要なスイッチ。このスイッチがオンになっているか
 * @type switch
 *
 * @param 変数
 * @desc
 * @type struct<variable>
 */
 
 
 
 
 
/*~struct~variable:
 * @param 変数
 * @desc 対象の変数
 * @type variable
 *
 * @param 値
 * @desc 変数がこの値以上になっているか
 */
 
 
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    
    
    //--  文字列オート変換 /ベーシック  --//
    
    
    //- 文字列のハッシュ化
    function strToHash(str) {
        let hash = {};
        if (!str.length) { return; }
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
    
    
    
    

    //--  プラグインコマンド  --//
    
    
    //- 自動補充の設定
    PluginManager.registerCommand(pluginName, "自動補充の設定", args => {
        const itemId = Number(args["アイテム"]);
        const num = Number(args["補充数"]);
        const gainByCondi = eval(args["条件分だけ増加"]);
        const timing = args["タイミング"];
        const conditions = strToHash(args["条件"]);
        // セット
        if (!$gameParty._autoReloadItemsKe) { $gameParty._autoReloadItemsKe = []; }
        $gameParty._autoReloadItemsKe.push({ itemId:itemId, num:num, gainByCondi:gainByCondi, timing:timing, conditions:conditions });
    });
    
    
    //- 自動補充の実行
    PluginManager.registerCommand(pluginName, "自動補充の実行", args => {
        $gameParty.doAutoReloadItemKe(["全て"]);
    });
    
    
    
    
    
    //--  自動補充アイテム  --//
    
    
    //- 自動補充の実行
    Game_Party.prototype.doAutoReloadItemKe = function(timings) {
        if (!this._autoReloadItemsKe) { return; }
        if (!this._autoReloadItemsKe.length) { return; }
        // イニット
        const reloads = this._autoReloadItemsKe;
        // ひとつずつ処理
        reloads.forEach((r, i) => {
            // イニット
            const item = $dataItems[r.itemId];
            let num = r.num;
            const nowNum = this.numItems(item);
            // 戦闘中のみで、バトル終了時はアイテム0
            if (r.timing == "戦闘中のみ" && timings.includes("終了")) {
                this.gainItem(item, -99);
                return;
            }
            // タイミング判定
            if (timings[0] != "全て" && !timings.some(t => r.timing.includes(t))) { return; }
            // アイテム自動補充の条件判定
            const okNum = this.judgeAutoReloadItemsKe(r.conditions)
            if (!okNum) { return; }
            // 条件分だけ増加
            if (r.gainByCondi) { num *= okNum; }
            // 個数判定
            if (num <= nowNum) { return; }
            // アイテム補充
            this.gainItem(item, num - nowNum);
        }, this);
    };
    
    
    //- アイテム自動補充の条件判定
    Game_Party.prototype.judgeAutoReloadItemsKe = function(conditions) {
        if (!conditions) { return 1; }
        // イニット
        const members = this.allMembers();
        let ok = true;
        let okNums = [];
        // ひとつずつ処理
        Object.keys(conditions).forEach((k, i) => {
            if (!conditions[k]) { return; }
            if (!ok) { return; }
            const v = conditions[k];
            let oks = 0;
            switch(k) {
                case "アクター":
                    oks = members.reduce((a, b) => a + (b._actorId == v ? 1 : 0), 0);
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "職業":
                    oks = members.reduce((a, b) => a + (b._classId == v ? 1 : 0), 0);
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "スキル":
                    oks = members.reduce((a, b) => a + (b._skills.includes(v) ? 1 : 0), 0);
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "アイテム":
                    oks = this.items().reduce((a, i) => a + (i.id == v ? this.numItems(i) : 0), 0);
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "武器":
                    oks = members.reduce((a, b) => a + (b.weapons().reduce((a2, w) => a2 + (w.id == v ? 1 : 0), 0)), 0);
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "防具":
                    oks = members.reduce((a, b) => a + (b.armors().reduce((a2, w) => a2 + (w.id == v ? 1 : 0), 0)), 0);
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "ステート":
                    oks = members.reduce((a, b) => a + (b._states.includes(v) ? 1 : 0), 0);
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "スイッチ":
                    oks = $gameSwitches.value(v) ? 1 : 0;
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
                case "変数":
                    const id = v["変数"];
                    if (!id) { return; }
                    const value = v["値"];
                    oks = $gameVariables.value(id) >= value ? 1 : 0;
                    if (!oks) { ok = false; }
                    okNums.push(oks);
                    break;
            }
        }, this);
        // OKなら最大OK数を代入
        if (ok) {
            okNums.sort((a, b) => b - a);
            ok = okNums[0];
        }
        return ok;
    };
    
    
    //- 戦闘開始時に自動補充の呼び出し
    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);
        // 自動補充の実行
        $gameParty.doAutoReloadItemKe(["開始", "戦闘中のみ"]);
    };
    
    
    //- 戦闘終了時に自動補充の呼び出し
    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.call(this, result);
        // 自動補充の実行
        $gameParty.doAutoReloadItemKe(["終了", "戦闘中のみ"]);
    };
    
    
    //- 全回復時に自動補充の呼び出し
    const _Game_Interpreter_command314 = Game_Interpreter.prototype.command314;
    Game_Interpreter.prototype.command314 = function(params) {
        // 自動補充の実行
        $gameParty.doAutoReloadItemKe(["全回復"]);
        return _Game_Interpreter_command314.call(this, params);
    };
    
})();