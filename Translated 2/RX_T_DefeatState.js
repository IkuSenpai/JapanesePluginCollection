//=============================================================================
// Plugin_Name : RX_T_DefeatState
// File_Name   : RX_T_DefeatState.js
// Version     : 1.00
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc If everyone receives a state that cannot be moved (no automatic removal), you lose!
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 * @help Defeat State
 *
 * @param SystemWord in Notes
 * @text System word
 * @desc System word to fill in the notes field
 * @default DefeatState
 * @help Defeat State
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * If everyone suffers a state that prevents them from
 * moving (no automatic removal) during combat, they are defeated.
 *
 * You will be able to use this to create "petrified" and other states.
 *
 * By default, if the situation described above occurs, you will
 * continue to be attacked unilaterally by enemies until your party
 * is wiped out, or in some cases, the game will stop progressing.
 *
 * And, as another feature, you can set it up to be defeated if the entire
 * party is subjected to a certain state, regardless of restrictions or
 * removal conditions.
 *
 * ◆Usage
 * [State Settings]
 * Create a state that meets the following conditions.
 * 1.The restriction is "cannot move".
 * 2.Auto-removal timing is set to "None".
 * 3."Remove by Damage" is not checked.
 *
 * ★If you want to pretend that you have been defeated under a special state
 * condition regardless of the restriction or removal conditions
 * Fill in the notes section of the statw.
 *
 * <DefeatState>
 *
 * [Spec]
 * All of these features apply to allies only.
 *
 * [Notes]
 * You don't need to worry about the plugin parameters.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 行動できない（自動除去なし）ステートを全員が受けると敗北扱いになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 * @help 敗北ステート
 *
 * @param SystemWord in Notes
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 敗北ステート
 * @help 敗北ステート
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 戦闘中行動できない（自動除去なし）ステートをパーティ全員が受けると
 * 直ちに全滅、敗北扱いになります。
 *
 * これを利用して「石化」等のステートを作ることができるようになります。
 *
 * デフォルトでは上記の状態になった場合パーティが全滅するまで敵から一方的に
 * 攻撃を受け続けたり、場合によってはゲームが進まなくなることがあります。
 *
 * それと、別の機能として、行動制約や解除条件に関わらず、特定のステートを
 * パーティ全員が受けると敗北する設定にもできます。
 *
 * ◆使い方
 * ★基本的なステートの設定
 * 下記の条件を満たしたステートを作成します。
 * １．行動制約を「行動できない」
 * ２．自動回復のタイミングの設定が「なし」
 * ３．「ダメージで解除」にチェックが入っていない
 *
 * ★行動制約や解除条件に関わらず特殊なステート条件で敗北させたい場合
 * ステートのメモ欄に記入します。
 *
 * <敗北ステート>
 *
 * 【仕様】
 * この機能はすべて味方のみ適用されます。
 *
 * 【備考】
 * プラグインのパラメータを気にする必要はありません。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

	//RX-T plugin parameters
	const parameters = PluginManager.parameters('RX_T_DefeatState');
	const rx_defeatState = parameters['SystemWord in Notes'];
	//Game_Battler

	//自然回復しない行動不能ステートがあるか
	Game_Battler.prototype.rxLockState = function() {
	    let flag = false;
	    this.states().forEach(function(state) {
	        if (state.restriction === 4 && state.autoRemovalTiming === 0 && !state.removeByDamage) {
	            flag = true;
	        }
	        //敗北条件となるステートがあるか
	        if (state.meta[rx_defeatState]) flag = true;
	    }, this);
	    if (flag) return 1;
	    return 0;
	};

	//Game_Party
	const rx_t_gppiA200826_isAllDead = Game_Party.prototype.isAllDead;
	Game_Party.prototype.isAllDead = function() {
	    let rxDcount = 0, rxDeadCount = 0;
	    this.members().forEach(function(rx_member) {
	        rxDeadCount += rx_member.rxLockState();
	        rxDcount += 1
	    }, this);
	    if (rxDeadCount === rxDcount) return true;
	    rx_t_gppiA200826_isAllDead.call(this);
	};

})();