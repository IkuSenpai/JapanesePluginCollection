//=============================================================================
// Plugin_Name : スキルコスト拡張
// File_Name   : RX_T_MpTpCostEX.js
// Version     : 1.01
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You will be able to set special skill costs.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param EnemyLevelSetuped
 * @text Enemy Lv reference method
 * @desc Enemy level reference system with
 * level-dependent skill cost
 * @type select
 * @default 0
 * @option Enemy's notes only
 * @value 0
 * @option Set a new param called "Lv" and see the notes field
 * @value 1
 * @option Lv is already set. See the notes field
 * @value 2
 * @option Set only the level
 * @value 3
 *
 * @param SystemWord in Notes1
 * @text System word
 * @desc System word to fill in the notes field
 * @default MpPctCost
 *
 * @param SystemWord in Notes2
 * @text System word
 * @desc System word to fill in the notes field
 * @default HpRestPctMpCost
 *
 * @param SystemWord in Notes3
 * @text System word
 * @desc System word to fill in the notes field
 * @default VarMpCost
 *
 * @param SystemWord in Notes4
 * @text System word
 * @desc System word to fill in the notes field
 * @default StepsMpCost
 *
 * @param SystemWord in Notes5
 * @text System word
 * @desc System word to fill in the notes field
 * @default LvPctMpCost
 *
 * @param SystemWord in Notes6
 * @text System word
 * @desc System word to fill in the notes field
 * @default TpRestPctMpCost
 *
 * @param SystemWord in Notes7
 * @text System word
 * @desc System word to fill in the notes field
 * @default VarTpCost
 *
 * @param SystemWord in Notes8
 * @text System word
 * @desc System word to fill in the notes field
 * @default StepsTpCost
 *
 * @param SystemWord in Notes9
 * @text System word
 * @desc System word to fill in the notes field
 * @default LvPctTpCost
 *
 * @param SystemWord in Notes10
 * @text System word
 * @desc System word to fill in the notes field
 * @default TPBGaugeCost
 *
 * @param SystemWord in Notes11
 * @text System word
 * @desc System word to fill in the notes field
 * @default Lv
 *
 * @help Skill Cost Type Expansion
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * You will be able to set special skill costs.
 *
 * ◆Usage
 * 【Configuring Plug-in Parameters】
 * ★Enemy Lv reference method
 * This is basically the only thing you need to set in the plugin parameters.
 * You don't need to care about the other parameters unless you are willing to
 * set them yourself.
 *
 * ・Enemy's notes only
 * If the level setting described below is in the notes field, the level only
 * refers to the notes field.
 * If you don't set the level parameters in another plugin or if you don't set
 * the level parameters by yourself, etc., please keep the settings as
 * they are, i.e., leave them in the default state.
 *
 * ・Set a new param called "Lv" and see the notes field
 * If the level setting described below is in a notes field, the level refers
 * to the notes field, but a new parameter called "level" is set for the enemy.
 * This means that you can also use ".level" in the damage calculation formula
 * for skills used only by enemy characters in the database.
 *
 * ・Lv is already set. See the Notes field
 * The function is almost the same as "Set a new param called "Lv" and see the
 * notes field" above, but this one is only for those who have already set the
 * level parameters by another plugin or their own work.
 * When you select this option, please place this plugin below the relevant
 * plugin.
 *
 * ・Set only the level
 * It allows you to set only the level without applying the original
 * functionality of this plugin.
 * This means that in the database, ".level" can be used in the damage
 * calculation formula for skills used only by enemies, that's all.
 *
 * 【Database Settings】
 * Describe everything in the notes section.
 *
 * <MpPctCost>
 * The set MP cost is a percentage of the user's maximum MP, and if it is set
 * to 100, the user consumes MP for the maximum MP value.
 *
 * <HpRestPctMpCost> or <TpRestPctMpCos>
 * The percentage of HP remaining is a percentage of the user's maximum MP/TP.
 * According to the specifications of this plugin, the less HP left, the less
 * the MP/TP cost will be, and when the HP is full, the MP/TP cost will be
 * equal to the maximum value of MP/TP.
 * 
 * <VarMpCost:n> or <VarTpCost:n>
 * The value you set for the n-th game variable is the MP/TP cost.
 * You can create skills that allow you to fluctuate your MP/TP cost in events.
 * However, the TP cost is limited to a maximum of 100.
 *
 * <StepsMpCost> or <StepsTpCost>
 * The MP/TP cost will be the "number of steps" divided by the "set MP/TP
 * cost".
 * However, if you want your enemies to use it, it will remain at the MP/TP
 * you set, as it has no concept of steps.
 * Also, due to the specifications calculated by the above formula, if you set
 * the MP/TP cost to 0, the cost of that skill will be zero.
 * This is to prevent the number of steps from being divided by 0.
 * However, the TP cost is limited to a maximum of 100.
 * 
 * <LvPctMpCost> or <LvPctTpCost>
 * The MP/TP cost is calculated by multiplying the User's Level by the
 * MP/TP cost you set.
 * If you do not have an enemy's level set, the MP/TP consumption of an enemy
 * will be 0 when used.
 * However, the TP cost is limited to a maximum of 100.
 *
 * <Lv:n>
 * Sets the level of the enemy.
 * If you don't have a level-dependent consumption-based skill set, you don't
 * need to set it.
 * 
 * <TPBGaugeCost:n>
 * This setting is for MZ's TPB mode only. It can also be applied to items.
 * The value of n is a percentage. This consumes a set percentage.
 * The less this value is, the less time it takes for the next turn to arrive.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 特殊なスキルコストの設定ができるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param EnemyLevelSetuped
 * @text 敵キャラのレベル参照
 * @desc レベル依存のスキルコストで
 * 敵キャラのレベルをどう参照するか
 * @type select
 * @default 0
 * @option 敵キャラのメモ欄のみ
 * @value 0
 * @option レベルを設定し、メモ欄参照
 * @value 1
 * @option 既にレベルを設定済み・メモ欄参照
 * @value 2
 * @option レベルだけを設定する。メモ欄は参照。
 * @value 3
 *
 * @param SystemWord in Notes1
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default MP割合消費
 *
 * @param SystemWord in Notes2
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default MPHP残量割合消費
 *
 * @param SystemWord in Notes3
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default MP変数消費
 *
 * @param SystemWord in Notes4
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default MP歩数消費
 *
 * @param SystemWord in Notes5
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default MPLV依存消費
 *
 * @param SystemWord in Notes6
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default TPHP残量割合消費
 *
 * @param SystemWord in Notes7
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default TP変数消費
 *
 * @param SystemWord in Notes8
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default TP歩数消費
 *
 * @param SystemWord in Notes9
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default TPLV依存消費
 *
 * @param SystemWord in Notes10
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 消費TPB
 *
 * @param SystemWord in Notes11
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default Lv
 *
 * @help スキルコスト拡張
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 特殊なスキルコストの設定ができるようになります。
 *
 * ◆使い方
 * 【プラグインパラメータの設定】
 * ★敵キャラのレベル参照
 * プラグインパラメータで設定する必要があるのは基本的にここだけです。
 * 他のパラメータは自分で設定したい場合以外気にする必要はありません。
 *
 * ・敵キャラのメモ欄のみ
 * 後述するレベル設定がメモ欄にされている場合
 * レベルはメモ欄を参照するだけです。
 * 別のプラグイン、もしくは自作等でレベルのパラメータを設定しない場合は
 * 設定はデフォルトである、この状態のままにしてください。
 *
 * ・レベルを設定し、メモ欄参照
 * 後述するレベル設定がメモ欄にされている場合、レベルはメモ欄を参照しますが
 * 敵キャラにパラメータとしてレベルが新たに設定されます。
 * つまり、データベースで敵キャラだけが使うスキルのダメージ計算式にも
 * 「.level」が使えるようになります。
 *
 * ・既にレベルを設定済み・メモ欄参照
 * 上記「レベルを設定し、メモ欄参照」と機能はほぼ同じですが
 * こちらは別のプラグイン、もしくは自作等でレベルのパラメータを
 * 既に設定済みの方専用の設定です。
 * 該当のプラグインより下に本プラグインを配置した上で
 * こちらを選択してください。
 *
 * ・レベル設定のみ
 * 本プラグイン本来の機能を適用せず、レベルだけを設定できるようにします。
 * つまり、データベースで敵キャラだけが使うスキルのダメージ計算式にも
 * 「.level」が使えるようになるだけの機能です。
 *
 * 【データベースでの設定】
 * すべてメモ欄に記述します。
 *
 * <MP割合消費>
 * 最大MPの設定した消費MP％分、MPを消費します。
 *
 * <MPHP残量割合消費>　もしくは　<MPHP残量割合消費>
 * HPの残量の割合に応じて消費MP/TPが決まります。
 * 本プラグインの仕様ですと、残りHPが少ないほど、消費MP/TPが少なくなります。
 * 
 * <MP変数消費:n>　もしくは　<TP変数消費:n>
 * 消費MP/TPがn番の変数に設定した数になります。
 * イベントで消費MP/TPを自由に変動させるスキルを作れます（※）。
 *
 * <MP歩数消費>　もしくは　<TP歩数消費>
 * 消費MP/TPが「歩数÷設定した消費MP/TP」になります（※）。
 * 敵キャラに使わせる場合は、歩数の概念がないため
 * 設定した消費MP/TPのままになります。
 * また、上記の計算式で算出される仕様上、消費TP/MPを0に設定すると
 * 0での割り算を阻止するため、そのスキルのコストは0になります。
 * 
 * <MPLV依存消費>　もしくは　<TPLV依存消費>
 * 消費MP/TPが「使用者のレベル×設定した消費MP/TP」になります（※）。
 * 敵キャラのレベル設定をしていない場合、敵キャラが使った場合の消費MP/TPは
 * 0になります。
 *
 * ※：消費TPは最大でも100までとなります。
 *
 * <Lv:n>
 * 敵キャラのレベルを設定します。
 * LV依存消費系のスキルを設定しない場合は設定不要です。
 * 
 * <消費TPB:n>
 * こちらはMZのTPBモード専用の設定です。また、アイテムにも適用可能です。
 * nの値はパーセンテージです。設定したパーセンテージだけ消費します。
 * 少ない数字ほど、次にターンが来るまでの時間が短くなります。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

    //RX-T original function

    const rx_MTC = PluginManager.parameters('RX_T_MpTpCostEX');
    const rx_parELSU = parseInt(rx_MTC['EnemyLevelSetuped']);
    const rx_MpPctCost = rx_MTC['SystemWord in Notes1']; //MpPctCost
    const rx_HpRestMPCost = rx_MTC['SystemWord in Notes2']; //HpRestPctMpCost
    const rx_VarMPCost = rx_MTC['SystemWord in Notes3']; //VarMpCost
    const rx_StepMPCost = rx_MTC['SystemWord in Notes4']; //StepsMpCost
    const rx_LvPctMPCost = rx_MTC['SystemWord in Notes5']; //LvPctMpCost
    const rx_HpRestTPCost = rx_MTC['SystemWord in Notes6']; //TpRestPctMpCost
    const rx_VarTPCost = rx_MTC['SystemWord in Notes7']; //VarTpCost
    const rx_StepTPCost = rx_MTC['SystemWord in Notes8']; //StepsTpCost
    const rx_LvPctTPCost = rx_MTC['SystemWord in Notes9']; //LvPctTpCost
    const rx_TPBGaugeCost = rx_MTC['SystemWord in Notes10']; //TPBGaugeCost
    const rx_lvForCost = rx_MTC['SystemWord in Notes11']; //Lv

    if (rx_parELSU !== 3){

	//Game_BattlerBase

    Game_BattlerBase.prototype.rx_mpCostLevelResult = function(skill) {
        if (rx_parELSU > 0) {
            return this.level * skill.mpCost;
        } else if (this.isActor()){
            return this.level * skill.mpCost;
        } else {
            let lv = this._enemies[i].enemy().meta[rx_lvForCost];
            if (lv === undefined) lv = 0;
            return lv * skill.mpCost;
        }
    };

    Game_BattlerBase.prototype.rx_tpCostLevelResult = function(skill) {
        let rx_tpCost = 0;
        if (rx_parELSU > 0) {
            rx_tpCost = this.level * skill.tpCost;
        } else if (this.isActor()){
            rx_tpCost = this.level * skill.tpCost;
        } else {
            let lv = this._enemies[i].enemy().meta[rx_lvForCost];
            if (lv === undefined) lv = 0;
            rx_tpCost = lv * skill.tpCost;
        }
        if (rx_tpCost > 100) rx_tpCost = 100;
        return rx_tpCost;
    };

    const rx_t_gbbpsmc151119_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
    Game_BattlerBase.prototype.skillMpCost = function(skill) {
        let rx_cost = 0, rx_varNo = 0;
        if (skill.meta[rx_MpPctCost]) {
            rx_cost = skill.mpCost * this.mmp / 100 | 0;
            return Math.floor(rx_cost * this.mcr);
        }
        if (skill.meta[rx_HpRestMPCost]) {
            rx_cost = this.hp / this.mhp;
            rx_cost = rx_cost * this.mmp;
            return Math.floor(rx_cost * this.mcr);
        }
        if (skill.meta[rx_VarMPCost]) {
            rx_varNo = skill.meta[rx_VarMPCost];
            rx_cost = $gameVariables.value(rx_varNo);
            return Math.floor(rx_cost * this.mcr);
        }
        if (skill.meta[rx_StepMPCost]) {
            if (this.isActor()) {
                rx_cost = skill.mpCost === 0 ? 0 : Math.floor($gameParty.steps() / skill.mpCost);
            } else {
                rx_cost = skill.mpCost;
            }
            return Math.floor(rx_cost * this.mcr);
        }
        if (skill.meta[rx_LvPctMPCost]) {
            rx_cost = this.rx_mpCostLevelResult(skill);
            return Math.floor(rx_cost * this.mcr);
        }
        return rx_t_gbbpsmc151119_skillMpCost.call(this, skill);
    };

    const rx_t_gbbpstc151119_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
    Game_BattlerBase.prototype.skillTpCost = function(skill) {
        let rx_cost = 0, rx_varNo = 0;
        if (skill.meta[rx_HpRestTPCost]) {
            rx_cost = this.hp / this.mhp;
            return Math.floor(rx_cost * 100);
        }
        if (skill.meta[rx_VarTPCost]) {
            rx_varNo = skill.meta[rx_VarTPCost];
            rx_cost = $gameVariables.value(rx_varNo);
            return rx_cost > 100 ? 100 : rx_cost;
        }
        if (skill.meta[rx_StepTPCost]) {
            if (this.isActor()) {
                rx_cost = skill.tpCost === 0 ? 0 : Math.floor($gameParty.steps() / skill.tpCost);
            } else {
                rx_cost = skill.tpCost;
            }
            return rx_cost > 100 ? 100 : rx_cost;
        }
        if (skill.metarx_LvPctTPCost) {
            rx_cost = this.rx_tpCostLevelResult(skill);
            return rx_cost > 100 ? 100 : rx_cost;
        }
        return rx_t_gbbpstc151119_skillTpCost.call(this, skill);
    };

    //Game_Troop　レベルを設定する場合

    const rx_t_gts2009101_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        rx_t_gts2009101_setup.call(this, troopId);
        if (rx_parELSU === 1) {
            for (let i = 0; i <this._enemies.length; i++){
                const lvll = parseInt(this._enemies[i].enemy().meta[rx_lvForCost]);
                this._enemies[i].level = lvll === undefined ? 0 : lvll;
            }
        }
    };

    //for MZ
    if (PluginManager._commands !== undefined) {

        //Game_Battler

        const rx_t_gbctct200910_clearTpbChargeTime = Game_Battler.prototype.clearTpbChargeTime;
        Game_Battler.prototype.clearTpbChargeTime = function() {
            rx_t_gbctct200910_clearTpbChargeTime.call(this);
            this._tpbChargeTime = $gameTemp.rx_restTPBCharge;
        };

        const rx_t_gbui200910_useItem = Game_Battler.prototype.useItem;
        Game_Battler.prototype.useItem = function(item) {
            rx_t_gbui200910_useItem.call(this, item);
            $gameTemp.rx_restTPBCharge = 0;
            if (item.meta[rx_TPBGaugeCost] !== undefined) $gameTemp.rx_restTPBCharge = (100 - item.meta[rx_TPBGaugeCost]) / 100;
        };

    }

    } else {
    
    //Game_Troop　レベルだけを設定する場合

    const rx_t_gts2009102_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        rx_t_gts2009102_setup.call(this, troopId);
        if (rx_parELSU === 3) {
            for (let i = 0; i <this._enemies.length; i++){
                const lvll = parseInt(this._enemies[i].enemy().meta[rx_lvForCost]);
                this._enemies[i].level = lvll === undefined ? 0 : lvll;
            }
        }
    };

    }

})();