//=============================================================================
// Keke_MotionBySkill - スキル毎モーション
// バージョン: 1.3.0
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc スキルごとにモーション設定する 
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.3.0】
 * スキル(アイテム)ごとにモーションと武器画像を設定できる
 * 個別設定がない場合の基本モーションも設定可能
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * ■スキル(アイテム)のモーション設定
 * スキル、アイテム、武器のメモ欄に
 *
 * <モーション: (モーション名), (武器画像名)>
 *
 * ★(モーション名)
 * 以下のモーション名のいずれか
 * ◎なし => モーションなし
 * ◎装備 => 装備中の武器の武器タイプのモーション
 * ◎突き
 * ◎振り
 * ◎飛び道具
 * ◎防御
 * ◎魔法
 * ◎スキル
 * ◎アイテム
 * ◎待機
 * ◎詠唱
 * ◎回避
 * ◎勝利
 * ◎ダメージ
 * ◎異常
 * ◎倒れ
 *
 * ★(武器画像名)
 * 以下の武器画像名のいずれか
 * ◎なし => 武器画像なし
 * ◎装備 => 装備中の武器の武器タイプの画像
 * ◎短剣
 * ◎剣
 * ◎フレイル
 * ◎斧
 * ◎ムチ
 * ◎杖
 * ◎弓
 * ◎クロスボウ
 * ◎銃
 * ◎爪
 * ◎グローブ
 * ◎槍
 * ◎メイス
 * ◎ロッド
 * ◎棍棒
 * ◎鎖分銅
 * ◎近未来ソード
 * ◎鉄パイプ
 * ◎スリングショット
 * ◎ショットガン
 * ◎ライフル
 * ◎チェーンソー
 * ◎レールガン
 * ◎スタンロッド
 * ※武器画像名と武器画像IDとの関係は下の『武器画像リスト』で変更できる
 *
 * ⚫︎具体例
 * モーションが「突き」で武器画像を「剣」にするなら
 * <モーション: 突き, 剣>
 *
 * モーションが「倒れ」で武器画像を「ライフル」にするなら
 * <モーション: 倒れ, ライフル>
 *
 * モーションが「魔法」で武器画像を装備依存にするなら
 * <モーション: 魔法, 装備>
 *
 * モーションも武器画像も装備依存にするなら
 * <モーション: 装備, 装備>
 *
 *
 * ■モーションの優先順序
 * スキルのメモ欄設定 > 武器のメモ欄設定 > 基本モーション
 * 基本モーションはプラグインパラメータで変更できる
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * @param スキル基本モーション
 * @desc スキルの基本モーション。個別設定がない場合これが適用される
 * @default 装備, 装備
 *
 * @param 魔法基本モーション
 * @desc 魔法の基本モーション。個別設定がない場合これが適用される
 * @default 魔法, 装備
 *
 * @param アイテム基本モーション
 * @desc アイテムの基本モーション。個別設定がない場合これが適用される
 * @default アイテム, なし
 */

(() => {
    //- プラグイン名
    const pluginName = "Keke_MotionBySkill";
    
    
    
    //--  武器画像リスト  --//
    
    const WeaponImageListKe = [
    "なし",    // 0
    "短剣",    // 1
    "剣",    // 2
    "フレイル",    // 3
    "斧",    // 4
    "ムチ",    // 5
    "杖",    // 6
    "弓",    // 7
    "クロスボウ",    // 8
    "銃",    // 9
    "爪",    // 10
    "グローブ",    // 11
    "槍",    // 12
    "メイス",    // 13
    "ロッド",    // 14
    "棍棒",    // 15
    "鎖分銅",    // 16
    "近未来ソード",    // 17
    "鉄パイプ",    // 18
    "スリングショット",    // 19
    "ショットガン",    // 20
    "ライフル",    // 21
    "チェーンソー",    // 22
    "レールガン",    // 23
    "スタンロッド"    // 24
    ];
    
    
    
    //--  パラメータ受け取り  --//
    
    const parameters = PluginManager.parameters(pluginName);
    
    const keke_skillBasicMotion = parameters["スキル基本モーション"];
    const keke_spellBasicMotion = parameters["魔法基本モーション"];
    const keke_itemBasicMotion = parameters["アイテム基本モーション"];
    
    
    
    
    
    //--  スキル毎モーション  --//
    
    //- スキルモーションのセット呼び出し
    const _Game_Actor_performAction = Game_Actor.prototype.performAction;
    Game_Actor.prototype.performAction = function(action) {
        _Game_Actor_performAction.call(this, action);
        // スキルモーションのセット
        this.setSkillMotionKe(action, this);
    };
    
    
    //- スキルモーションのセット
    Game_Actor.prototype.setSkillMotionKe = function(action, subject) {
        if (!action.isSkill() && !action.isItem()) { return; }
        // アクションのメモ欄からモーションデータ取得
        const item = action.item();
        let data = item.meta["モーション"] || item.meta["motion"];
        // 取得できなければ武器のメモ欄から取得
        if (!data && action.isSkill()) {
            const weapons = subject.weapons();
            for (let weapon of weapons) {
                const d = weapon.meta["モーション"] || weapon.meta["motion"];
                if (d) { data = d;  break; }
            };
        }
        // 取得できなければ基本設定を適用
        if (!data) {
            if (action.isSkill()) {
                data = action.isMagicSkill() ? keke_spellBasicMotion : keke_skillBasicMotion;
            } else {
                data = keke_itemBasicMotion;
            }
        }
        // 装備タイプ取得
        const weapons = this.weapons();
        const wTypeId = weapons[0] ? weapons[0].wtypeId : 0;
        const wType = $dataSystem.weaponTypes[wTypeId];
        // データ分割
        data = data.replace(/\s/g, "");
        const datas = data.split(",");
        // モーション名取得
        let motion = datas[0];
        // 装備なら装備中の武器のモーションを適用
        if (motion == "装備") {
            const aMotion = $dataSystem.attackMotions[wTypeId];
            motion = aMotion.type == 0 ? "thrust" : aMotion.type == 1 ? "swing" : "missile";
        }
        // モーションセット
        if (motion == "突き" || motion == "thrust") {
            this.requestMotion("thrust");
        } else if (motion == "振り" || motion == "swing") {
            this.requestMotion("swing");
        } else if (motion == "飛び道具" || motion == "missile") {
            this.requestMotion("missile");
        } else if (motion == "防御" || motion == "guard") {
            this.requestMotion("guard");
        } else if (motion == "魔法" || motion == "spell") {
            this.requestMotion("spell");
        } else if (motion == "スキル" || motion == "spell") {
            this.requestMotion("skill");
        } else if (motion == "アイテム" || motion == "item") {
            this.requestMotion("item");
        } else if (motion == "なし" || motion == "none") {
            this.requestMotion("walk");
        } else if (motion == "待機" || motion == "wait") {
            this.requestMotion("wait");
        } else if (motion == "詠唱" || motion == "chant") {
            this.requestMotion("chant");
        } else if (motion == "回避" || motion == "evade") {
            this.requestMotion("evade");
        } else if (motion == "勝利" || motion == "victory") {
            this.requestMotion("victory");
        } else if (motion == "ダメージ" || motion == "damage") {
            this.requestMotion("damage");
        } else if (motion == "異常" || motion == "abnormal") {
            this.requestMotion("abnormal");
        } else if (motion == "倒れ" || motion == "dead") {
            this.requestMotion("dead");
        }
        // 武器名取得
        let weapon = datas[1];
        // 名前が「装備」なら装備中の武器を適用
        if (weapon == "装備") {  weapon = wType; }
        // 武器画像をセット
        if (weapon && weapon != "なし" && weapon != "none") {
            const wpImgId = WeaponImageListKe.indexOf(weapon);
            if (wpImgId >= 0) { this.startWeaponAnimation(wpImgId); }
        }
    };
    
})();