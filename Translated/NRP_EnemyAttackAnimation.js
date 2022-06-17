//=============================================================================
// NRP_EnemyAttackAnimation.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.03 Set the battle animation of the enemy's normal attack.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/473282816.html
 *
 * @help Set the enemy's normal attack animation based
 * on the weapon type equipment.
 * Set the weapon type equipment in the enemy database features.
 * It allows you to set the animation of a normal attack.
 * 
 * The order of the list in the plugin parameters must match the weapon type.
 * 
 * You can also set up individualized settings
 * by filling in the enemy's note with the following tags.
 * <AttackAnimation:[Animation ID]>
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param weapons
 * @type struct<Weapon>[]
 * @default ["{\"name\":\"None\",\"animationId\":\"1\"}","{\"name\":\"Dagger\",\"animationId\":\"6\"}","{\"name\":\"Sword\",\"animationId\":\"6\"}","{\"name\":\"Flail\",\"animationId\":\"1\"}","{\"name\":\"Axe\",\"animationId\":\"6\"}","{\"name\":\"Whip\",\"animationId\":\"1\"}","{\"name\":\"Wand\",\"animationId\":\"1\"}","{\"name\":\"Bow\",\"animationId\":\"11\"}","{\"name\":\"Crossbow\",\"animationId\":\"11\"}","{\"name\":\"Gun\",\"animationId\":\"111\"}","{\"name\":\"Claw\",\"animationId\":\"16\"}","{\"name\":\"Glove\",\"animationId\":\"1\"}","{\"name\":\"Spear\",\"animationId\":\"11\"}"]
 * @desc Set up animations and reversals for each weapon type equipment.
 * If the weapon type equipment is not set, the first animation will be played.
 */
/*~struct~Weapon:
 * @param name
 * @type string
 * @desc Weapon Type Name.
 * Please name them for clarity as they are just notes.
 * 
 * @param animationId
 * @type animation
 * @desc This animation corresponds to the weapon equipment type.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.03 敵キャラの通常攻撃の戦闘アニメを設定します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/473282816.html
 *
 * @help 武器タイプ装備を元に敵キャラの通常攻撃の戦闘アニメを設定します。
 * 敵キャラデータベースの特徴に、武器タイプ装備を設定してください。
 * それによって、通常攻撃のアニメを設定できます。
 * 
 * プラグインパラメータにあるリストの順番は、必ず武器タイプと一致させてください。
 * 
 * 一応、以下のタグを敵キャラのメモ欄に記入すれば、個別設定も可能です。
 * ・<AttackAnimation:[アニメーションID]>
 * 
 * 【利用規約】
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param weapons
 * @text 各武器タイプ装備の設定
 * @type struct<Weapon>[]
 * @default ["{\"name\":\"なし\",\"animationId\":\"1\"}","{\"name\":\"短剣\",\"animationId\":\"6\"}","{\"name\":\"剣\",\"animationId\":\"6\"}","{\"name\":\"フレイル\",\"animationId\":\"1\"}","{\"name\":\"斧\",\"animationId\":\"6\"}","{\"name\":\"ムチ\",\"animationId\":\"1\"}","{\"name\":\"杖\",\"animationId\":\"1\"}","{\"name\":\"弓\",\"animationId\":\"11\"}","{\"name\":\"クロスボウ\",\"animationId\":\"11\"}","{\"name\":\"銃\",\"animationId\":\"111\"}","{\"name\":\"爪\",\"animationId\":\"16\"}","{\"name\":\"グローブ\",\"animationId\":\"1\"}","{\"name\":\"槍\",\"animationId\":\"11\"}"]
 * @desc 各武器タイプ装備ごとにアニメーションや反転設定を行います。
 * 武器タイプ装備が未設定なら、先頭のアニメを再生します。
 */
/*~struct~Weapon:ja
 * @param name
 * @text 武器タイプ名
 * @type string
 * @desc 武器タイプ名です。
 * ただのメモなので分かりやすいように名前をつけてください。
 * 
 * @param animationId
 * @text アニメーションID
 * @type animation
 * @desc 武器装備タイプに対応するアニメーションです。
 */
(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(JSON.parse(str));
    });

    return ret;
}

var parameters = PluginManager.parameters("NRP_EnemyAttackAnimation");
var pWeapons = parseStruct(parameters["weapons"]);

/**
 * ●敵の通常攻撃
 */
var _Window_BattleLog_showEnemyAttackAnimation = Window_BattleLog.prototype.showEnemyAttackAnimation;
Window_BattleLog.prototype.showEnemyAttackAnimation = function(subject, targets) {
    // 元処理実行（通常は効果音のみ）
    _Window_BattleLog_showEnemyAttackAnimation.apply(this, arguments);

    this.showNormalAnimation(targets, subject.attackAnimationId1(), false);
};

/**
 * 【独自実装】敵の通常攻撃アニメーションＩＤの取得
 */
Game_Enemy.prototype.attackAnimationId1 = function() {
    // 敵キャラにアニメーションの個別設定があるならばそちらを参照する。
    // ※<AttackAnimation:[アニメーションID]>
    var metaAninmationId = this.enemy().meta.AttackAnimation;
    if (metaAninmationId) {
        return metaAninmationId;
    }
    
    // 特徴から武器装備タイプのリストを取得する。
    let wtypes = this.traits(Game_BattlerBase.TRAIT_EQUIP_WTYPE);

    // 取得できない場合。『なし』の場合のアニメーションを設定
    if (wtypes.length == 0) {
        let weapon = pWeapons[0];
        // 対象、アニメーションID、反転フラグ
        return weapon.animationId;
    }

    // 取得された武器装備タイプを元にアニメーションを実行
    for (let i = 0; i < wtypes.length; i++) {
        let wtype = wtypes[i];
        let weapon = pWeapons[wtype.dataId];
        return weapon.animationId;
    }
};

})();
