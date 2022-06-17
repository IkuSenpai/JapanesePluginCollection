//=============================================================================
// Plugin_Name : RX_T_Effect_Uncertain_Skills
// File_Name   : RX_T_Effect_Uncertain_Skills.js
// Version     : 1.02
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You will be able to create skills whose effects are always indeterminate.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes
 * @text System word
 * @desc System word to fill in the notes field
 * @default EffectUncertain
 * @help effect uncertain skills
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * You can create a skill whose effectiveness is always uncertain.
 *
 * ◆Usage
 * Fill in the notes section of the skill.
 *
 * For example:If you want to have a random selection of
 *             skill IDs 4, 6, and 10 skills
 * <EffectUncertain:4, 6, 10>
 *
 * [Notes]
 * You don't need to worry about the plugin parameters.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * Also, starting with this version, the target of the effect also changes
 * depending on a randomly selected skill.
 *
 * [Spec]
 * 1.The basic settings, activation, message, weapons required,
 *   and cost required will be for skills set to indeterminate effect skills,
 *   not for randomly selected skills.
 * 2.Running away, or setting up a skill that has the same effect as this, 
 *   may not work well.
 * 3.Setting this to a skill you don't use in combat has no effect.
 * 
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 効果が常に不確定なスキルを作れるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 効果不確定
 * @help 効果不確定スキル
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 効果が常に不確定なスキルを作れるようになります。
 *
 * ◆使い方
 * スキルのメモ欄に記入します。
 *
 * 例：スキルID4番、6番、10番のスキルの中からランダムで選ぶようにしたい場合
 * <効果不確定:4, 6, 10>
 *
 * 【備考】
 * プラグインのパラメータを気にする必要はありません。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * また、今回のバージョンから、効果対象もランダムに選ばれたスキルのものが
 * 適用されるようになりました。
 *
 * 【仕様】
 * １．基本設定、発動、メッセージ、必要武器、必要コストの設定は
 * 　　ランダムで選ばれたスキルのものではなく
 * 　　効果不確定スキルに設定したスキルのものになります。
 * ２．逃走、またはこれと同様の効果を持ったスキルを設定した場合
 * 　　正常に動作しない場合があります。
 * ３．戦闘で使わないスキルに設定しても効果はありません。
 * 
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

    //RX-T plugin parameters
    const rx_EffUncSkl = PluginManager.parameters('RX_T_Effect_Uncertain_Skills');
    const rx_EUCSysWord = rx_EffUncSkl['SystemWord in Notes'];

    //BattleManager
    const rx_t_bmst2008202_startAction = BattleManager.startAction
    BattleManager.startAction = function() {
        rx_t_bmst2008202_startAction.call(this);
        const rx_2subject = this._subject;
        const rx_2action = rx_2subject.currentAction();
        if (this._action.item().meta[rx_EUCSysWord] !== undefined){
            let rx_2stringSkl = this._action.item().meta[rx_EUCSysWord];
            let rx_2sskResult = rx_2stringSkl.split(",");
            let rx_2selectedSkillId = Number(rx_2sskResult[Math.randomInt(rx_2sskResult.length)]);
            this._targets = [];
            this._action.setSkill(rx_2selectedSkillId);
            const rx_2targets = rx_2action.makeTargets();
            this._targets = rx_2targets;
        }
    };

})();