//=============================================================================
// Plugin_Name : Change enemy behavior in real time
// File_Name   : RX_T_ChgEnemyBehavior_in_RT.js
// Version     : 1.00
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You can change an enemy's behavior by damaging them or changing their state.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param SystemWord in Notes
 * @text System word
 * @desc System word to fill in the notes field
 * @default RealTimeThinking
 * @param Personal Setting
 * @desc Change the enemy's behavior in real time.
 * @type boolean
 * @default false
 * @help Change enemy behavior in real time
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * You can change an enemy's behavior by damaging them or
 * changing their state.
 * This ensures that the enemy will always act according
 * to the conditions when the order of action comes
 * around to you.
 *
 * However, it may not be as effective in the RMMZ TPB mode.
 *
 * By default, an enemy's action is determined at the
 * start of a turn.
 * So, for example, if an enemy action is set to change
 * when its HP drops below half, the conditional action
 * will be carried over to the next turn, even if the
 * enemy's HP drops below half during that turn. 
 *
 * ◆Usage
 * You can reflect the effects by simply installing
 * plug-ins, but you can also set them individually
 * for each enemy character.
 * 
 * [How to set it up individually]
 * 1.Configuring Plug-in Parameters
 * 　Set "Personal Setting" to "ON" and change this value to "true".
 * 　（The default is "OFF".）
 * 2.Enter "<RealTimeThinking>" in the memo field for the enemy character
 *   you want to set.
 * 
 * [Notes]
 * You don't need to worry about the "System word".
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
// @digress "usage" and "usagi" are a lot alike.
/*:ja
 * @target MV MZ
 * @plugindesc 敵にダメージを与えたり、ステートを変えることで敵の行動を変えることができます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param SystemWord in Notes
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default リアルタイム思考
 * @param Personal Setting
 * @text 個別設定
 * @desc リアルタイムで敵キャラの行動を変更
 * @type boolean
 * @default false
 * @help リアルタイムで敵キャラの行動を変更
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 戦闘中、敵にダメージを与えたり、状態を変えることで敵の行動を
 * 変えることができます。
 * これにより、敵は行動の順番が回ってきたときには必ず条件に応じて
 * 行動するようになります。
 *
 * ただ、RPGツクールMZのTPBモードでは効果が薄いかもしれません。 
 *
 * デフォルトでは、敵の行動はターン開始時に決定されます。
 * そのため、例えば敵の行動がHPが半分以下になったら変更されるように
 * 設定されている場合、そのターン中に敵のHPが半分以下になっても
 * 条件付きの行動は次のターンに持ち越されます。
 *
 * ◆使い方
 * プラグインを導入するだけで効果を反映させることもできますが
 * 敵キャラごとに個別に設定することも可能です。
 * 【個別に設定する方法】
 * 1.プラグインパラメータの設定
 * 　「個別設定」を「ON」に設定してこの値を「true」に変えます。
 * 　（デフォルトは「OFF」です。）
 * 2.設定したい敵キャラのメモ欄に「<リアルタイム思考>」と入力します。
 * 
 * 【備考】
 * 「システムワード」を気にする必要はありません。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/

(() => {
    'use strict';

    //RX-T plugin parameters
    const rx_PsnSet = PluginManager.parameters('RX_T_ChgEnemyBehavior_in_RT');
    const rx_ELPST = String(rx_PsnSet['Personal Setting']);
    const rx_ELPSYSWD = rx_PsnSet['SystemWord in Notes'];

    //BattleManager

    BattleManager.rx_subject_isEnemy = function(){
        return this._rx_4subject;
    }

    const rx_t_bmiNA2008204_invokeNormalAction = BattleManager.invokeNormalAction;
    BattleManager.invokeNormalAction = function(subject, target) {
        this._rx_4subject = subject.isEnemy();
        rx_t_bmiNA2008204_invokeNormalAction.call(this, subject, target);
    };

    //Game_Action

    const rx_t_gap2008204_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        var rx_elpst_matching = target.actor ? false : target.enemy().meta[rx_ELPSYSWD];
        var rx_modeTpb = $dataSystem.battleSystem === undefined ? 0 : $dataSystem.battleSystem;
        if (rx_ELPST === "false") rx_elpst_matching = true;
        if (BattleManager.rx_subject_isEnemy()) rx_elpst_matching = false;
        rx_t_gap2008204_apply.call(this, target);
        if (!target.actor && rx_elpst_matching) {
            var rx_resultTpb = rx_modeTpb > 0 ? target.makeTpbActions() : target.makeActions();
        };
    };
})();