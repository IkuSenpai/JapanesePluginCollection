//=============================================================================
//  Keke_orderEscapeFix - 行動順・逃走率固定
// バージョン: 1.0.0
//=============================================================================
// Copyright (c) 2022 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 行動順と逃走率を固定する
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.0.0】
 * 行動順と逃走率を固定する
 * 
 *
 *
 * ◉ 使い方 ◉
 *
 * 【機能】敵ごとに逃走率を設定
 * 　敵キャラのメモ欄に
 * <逃走率: ***>
 * <escapeRate: ***>
 * 例)
 * <逃走率: 50>
 * 　50%の確率で逃走可能
 * ※逃走率は“最も確率が低い”敵のものが採用される
 * 　逃走率50%の敵と30%の敵がいるなら30%
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * @param 行動順固定
 * @desc 行動順のランダム要素をなくす。敏捷性 1 でも高いなら必ず先に行動するようなる
 * @type boolean
 * @default true
 *
 * @param 逃走率固定
 * @desc 逃走率を固定にする
 * @type boolean
 * @default true
 *
 * @param 基本逃走率
 * @desc 固定時の基本逃走率。100 なら 100% の確率で逃走
 * @default 100
 *
 * @param 逃走率上昇
 * @desc 逃走失敗時の逃走率上昇量。25 なら 25% 上昇
 * @default 25
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //--  パラメータ受け取り  --//
    //==================================================
    
    const parameters = PluginManager.parameters(pluginName);
    
    const keke_orderix = eval(parameters["行動順固定"]);
    const keke_escapeFix = eval(parameters["逃走率固定"]);
    const keke_escapeRateBasic = Number(parameters["基本逃走率"]) / 100;
    const keke_escapeRateUp = Number(parameters["逃走率上昇"]) / 100;
    
    
    
    //==================================================
    //--  行動順固定  --//
    //==================================================
    
    //- 行動順固定
    const _Game_Action_speed = Game_Action.prototype.speed;
    Game_Action.prototype.speed = function() {
        if (keke_orderix) {
            const agi = this.subject().agi;
            let speed = agi;
            if (this.item()) {
                speed += this.item().speed;
            }
            if (this.isAttack()) {
                speed += this.subject().attackSpeed();
            }
            return speed;
        }
        return _Game_Action_speed.apply(this);
    };
    
    
    //- 逃走率固定
    const _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
    BattleManager.makeEscapeRatio = function() {
        if (keke_escapeFix) {
            this._escapeRatio = getEscapeRatio();
            return;
        }
        _BattleManager_makeEscapeRatio.apply(this);
    };
    
    
    //- 逃走率の取得
    function getEscapeRatio() {
        let rate = null;
        $gameTroop.members().forEach(enemy => {
            const data = enemy.enemy();
            const meta = data.meta["逃走率"] || data.meta["escapeRate"];
            if (!meta) { return; }
            rate = rate == null ? Number(meta) / 100 :  Math.min(rate, Number(meta) / 100)
        });
        if (rate == null) { rate = keke_escapeRateBasic; }
        return rate;
    };
    
    
    //- 逃走率上昇
    const _BattleManager_onEscapeFailure = BattleManager.onEscapeFailure;
    BattleManager.onEscapeFailure = function() {
        _BattleManager_onEscapeFailure.apply(this);
        if (keke_escapeFix) {
            this._escapeRatio += -0.1 + keke_escapeRateUp;
        }  
    };
    
})();