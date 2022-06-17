//=============================================================================
// Plugin_Name : Change BattleBack in Battle Animation
// File_Name   : RX_T_Change_BattleBack_in_Battle_Animation.js
// Version     : 1.00
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc It is possible to create "battle animations" that change the battleback.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @help Change BattleBack in Battle Animation
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * To use this plugin, you need the following plugins.
 * "Change Battle Back EX"
 * Please apply this one first.
 *
 * ◆Summary
 * It is possible to create "battle animations" that change the battleback.
 * It will be effective with summoning skills and terrain manipulation skills,
 * among other situations.
 *
 * [Notes]
 * This effect is only available in combat.
 * 
 * ◆About the files included in the package
 * The zip file of this plugin contains a "SystemOgg" folder.
 * Here is an explanation of the files in it.
 * 0m$.ogg:It is used to remember the state of the battle background at
 * the moment.
 * 0r$.ogg:It is used to restore the battle background memorized by "0m$.ogg".
 * 01$.ogg:It is used to call the battleback 1.
 * 02$.ogg:It is used to call the battleback 2.
 * 
 * These are all silent files.
 * 
 * Rename "01$.ogg" and "02$.ogg" to the name of the battle background you
 * want to use.
 *
 * Example: If you want to set battle background 1 to 'Space' and battle
 * background 2 to 'DarkSpace'
 *
 * 01$Space.ogg
 * 02$DarkSpace.ogg
 * Fill "01$"/"02$" at the beginning of the file and name of battle background
 * you want to call up.
 *
 * Set this setting according to the number of battle backgrounds you need.
 * Please rename a copy of the supplied ogg file for safety.
 * 
 * ◆Preparation
 * Copy the necessary files into the ""Project folder"\audio\se".
 *
 * ◆Setup Method
 * Edit the sound effect section of the animation.
 * For animations where you want the battle background to change, set it to
 * sound "0m$.ogg" at the first of the 1 frame.
 * After that, set the one marked with "01$" or "02$" to ring on the frame you
 * want to change the battle background.
 * Finally, set the SE setting of "0r$.ogg" to the frame you want to return
 * to the original battle background, and you're done.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 戦闘背景が変わる「戦闘アニメーション」を作ることができます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @help 戦闘背景が変わる戦闘アニメーション
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * このプラグインを使用するには、以下のプラグインが必要です。
 * 「戦闘背景の変更EX（MV&MZ）」
 * こちらを先に導入してください。
 *
 * ◆概要
 * 戦闘背景が変わる「戦闘アニメーション」を作ることができます。
 * 召喚スキル、地形を操るスキルで効果を発揮するでしょう。
 *
 * ※：ただし、この演出は戦闘中のみ有効です。
 *
 * ◆同梱のファイルについて
 * このプラグインのzipファイルには「SystemOgg」フォルダが同梱されています。
 * その中のファイルについて説明いたします。
 * 0m$.ogg：現時点での戦闘背景を記憶させるのに使います。
 * 0r$.ogg：0m$.oggで記憶した戦闘背景を復帰させるのに使います。
 * 01$.ogg：戦闘背景1を呼び出すのに使います。
 * 02$.ogg：戦闘背景2を呼び出すのに使います。
 *
 * ※全て無音のファイルです。
 *
 * 01$.oggと02$.oggについては使いたい戦闘背景の名前に
 * リネームして使います。
 *
 * 例：戦闘背景1を「Space」に、戦闘背景2を「DarkSpace」に
 * それぞれ設定したい場合
 *
 * 01$Space.ogg
 * 02$DarkSpace.ogg
 * ファイルの頭に01$/02$を付け、呼び出したい戦闘背景の名前を
 * 記述してください。
 *
 * この設定を必要な戦闘背景の数だけ設定します。
 * 安全のために同梱のoggファイルをコピーしたものをリネームしてください。
 *
 * ◆準備
 * 「プロジェクトフォルダ\audio\se」に必要なファイルをコピーします。
 *
 * ◆設定方法
 * アニメーションの効果音の部分を編集します。
 * 戦闘背景を変更させたいアニメーションには、1フレーム目に最優先で
 * 「0m$.ogg」を鳴らす設定にしてください。
 * その後、戦闘背景を変更させたいフレームに「01$」または「02$」が付いたものを
 * 鳴らす設定にしてください。
 * 最後に元の戦闘背景に戻したいフレームに「0r$.ogg」を鳴らす設定にして
 * 完成です。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

	//RX-T Original Process
    class RX_T {
        static seCheckBattleBack(se){
            const name = se.name;
            if (name === undefined) return "";
            if (name.indexOf("01$") !== -1){
                return ["#2", name.replace(/01\$/g, "")];
            }
            if (name.indexOf("02$") !== -1){
                return ["#3", name.replace(/02\$/g, "")];
            }
            if (name === "0m$") return ["#0", ""];
            if (name === "0r$") return ["#1", ""];
            return "";
        }
        static anmChangeBatleBack(se){
            const name = se.name;
            const proc = RX_T.seCheckBattleBack(se);
            if (proc[0] === "#0") {
                $gameTemp._rx_remBattleBack1Name = $gameMap.battleback1Name();
                $gameTemp._rx_remBattleBack2Name = $gameMap.battleback2Name();
                if (BattleManager.isBattleTest()) {
                    $gameTemp._rx_remBattleBack1Name = $dataSystem.battleback1Name;
                    $gameTemp._rx_remBattleBack2Name = $dataSystem.battleback2Name;
                }
            }
            if (proc[0] === "#1") {
                $gameMap._battleback1Name = $gameTemp._rx_remBattleBack1Name;
                $gameMap._battleback2Name = $gameTemp._rx_remBattleBack2Name;
                if (BattleManager.isBattleTest()) {
                    $dataSystem.battleback1Name = $gameTemp._rx_remBattleBack1Name;
                    $dataSystem.battleback2Name = $gameTemp._rx_remBattleBack2Name;
                }
                if ($gameParty.inBattle() && !$gameTemp._rx_changeBatBack_in_battle) {
                    $gameTemp._rx_changeBatBack_in_battle = true;
                }
            }
            if (proc[0] === "#2") {
                if (BattleManager.isBattleTest()) {
                    $dataSystem.battleback1Name = proc[1];
                } else {
                    if ($gameParty.inBattle()) $gameMap._battleback1Name = proc[1];
                }
                if ($gameParty.inBattle() && !$gameTemp._rx_changeBatBack_in_battle) {
                    $gameTemp._rx_changeBatBack_in_battle = true;
                }
            }
            if (proc[0] === "#3") {
                if (BattleManager.isBattleTest()) {
                    $dataSystem.battleback2Name = proc[1];
                } else {
                    if ($gameParty.inBattle()) $gameMap._battleback2Name = proc[1];
                }
                if ($gameParty.inBattle() && !$gameTemp._rx_changeBatBack_in_battle) {
                    $gameTemp._rx_changeBatBack_in_battle = true;
                }
            }
            return 0;
        }
    }

	//AudioManager

	const rx_t_amps200913_playSe = AudioManager.playSe;
    AudioManager.playSe = function(se) {
        if (se.name && RX_T.seCheckBattleBack(se) !== "") return RX_T.anmChangeBatleBack(se);
        rx_t_amps200913_playSe.call(this, se);
    };

})();