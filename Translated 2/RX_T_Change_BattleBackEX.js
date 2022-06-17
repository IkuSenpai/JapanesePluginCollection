//=============================================================================
// Plugin_Name : RX_T_Change_BattleBackEX(MV/MZ)
// File_Name   : RX_T_Change_BattleBackEX.js
// Version     : 1.00
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc The event command "Change Battle Back" will be available during battle.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @command RememberBattleBack
 * @text Battle Back Memory and Restoration
 * @desc You can remember or restore the current battle background state.
 * @arg Mode
 * @text Battle Back Processing
 * @desc Choose whether you want the current battle background state to be remembered or restored.
 * @default remember
 * @type select
 * @option 1.Remember
 * @value remember
 * @option 2.Recovery
 * @value recovery
 *
 * @help Change Battle Back EX（MV/MZ）
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * The event command "Change Battle Back" will be available during battle.
 * It is possible to also memorize the currently set battle background or
 * restore a memorized battle background.
 *
 * ◆How to use "Battle Back Memory and Restoration"
 * The settings are different between the MV and MZ versions.
 *
 * ★Usage in the MZ version
 * Plugin file: RX_T_Change_BattleBackEX
 *
 * 【Battle Back Processing】
 * It is possible to choose to have it remember or restore.
 *
 * ★Usage in the MV version
 * Use the plugin command to configure it as follows.
 *
 * battleback 0
 *
 * Here's what process you'll find below in which settings.
 * For example, if it is marked "Remember:0, remember"
 *
 * motion 0
 * motion remember
 *
 * All of these commands will have the same meaning, so enter the one
 * you feel comfortable typing. 
 *
 * 【List of Plug-in Commands for MV】
 * Remember:0, remember
 * Recovery:1, recovery
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc イベントコマンド「戦闘背景の変更」を戦闘中でも行えるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command RememberBattleBack
 * @text 戦闘背景の記憶と復帰
 * @desc 現在の戦闘背景の状態を
 * 記憶させたり復帰させたりできます。
 * @arg Mode
 * @text 戦闘背景の処理
 * @desc 現在の戦闘背景の状態を
 * 記憶させるか復帰させるかを選択してください。
 * @default remember
 * @type select
 * @option 1.記憶させる
 * @value remember
 * @option 2.復帰させる
 * @value recovery
 *
 * @help 戦闘背景の変更EX（MV/MZ）
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * イベントコマンド「戦闘背景の変更」を戦闘中でも行えるようになります。
 * また、設定されている戦闘背景を記憶させたり、記憶させていた戦闘背景を
 * 復帰させることもできます。
 *
 * ◆使い方
 * MV版とMZ版で設定方法が異なります。
 *
 * ★MZ版
 * プラグインファイル：RX_T_Change_BattleBackEX
 *
 * 【戦闘背景の処理】
 * 記憶させるか復帰させるか選択してください。
 *
 * ★MV版
 * プラグインコマンドで以下の要領で設定します。
 *
 * battleback 0
 *
 * どの設定でどんな処理をするのかを下記に紹介します。
 * 例えば「記憶：0, remember, 記憶」と表記されている場合
 *
 * motion 0
 * motion remember
 * motion 記憶
 *
 * これらはどれも同じ意味のコマンドになるので、入力しやすいと思ったものを
 * 入力してください。
 *
 * 【MV版プラグインコマンド一覧】
 * 記憶：0, remember, 記憶
 * 復帰：1, recovery, 復帰
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

	//Game_Temp

	const rx_t_gtp151026_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
	    rx_t_gtp151026_initialize.call(this);
	    this._rx_changeBatBack_in_battle = false;
	};

	//Game_Map

	const rx_t_gmpp151026_changeBattleback = Game_Map.prototype.changeBattleback;
	Game_Map.prototype.changeBattleback = function(battleback1Name, battleback2Name) {
	    rx_t_gmpp151026_changeBattleback.call(this, battleback1Name, battleback2Name);
	    if (BattleManager.isBattleTest()) {
	    	$dataSystem.battleback1Name = battleback1Name;
	    	$dataSystem.battleback2Name = battleback2Name;
	    }
	    if ($gameParty.inBattle() && !$gameTemp._rx_changeBatBack_in_battle) {
	        $gameTemp._rx_changeBatBack_in_battle = true;
	    }
	};

	//Spriteset_battle

	const rx_t_spbp151026_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
	Spriteset_Battle.prototype.updateBattleback = function() {
	    rx_t_spbp151026_updateBattleback.call(this);
	    if ($gameParty.inBattle() && $gameTemp._rx_changeBatBack_in_battle){
	        $gameTemp._rx_changeBatBack_in_battle = false;
	    	this._back1Sprite.bitmap = this.battleback1Bitmap();
	    	this._back2Sprite.bitmap = this.battleback2Bitmap();
	    }
	};

	//for MZ
	if (PluginManager._commands !== undefined) {
        //PluginManager
        PluginManager.registerCommand("RX_T_Change_BattleBackEX", "RememberBattleBack", args => {
            const rx_recBatBakCmd = args.Mode === "remember" ? 0 : 1;
            if (rx_recBatBakCmd === 0){
				$gamePlayer._rx_remBattleBack1Name = $gameMap.battleback1Name();
				$gamePlayer._rx_remBattleBack2Name = $gameMap.battleback2Name();
			    if (BattleManager.isBattleTest()) {
			    	$gamePlayer._rx_remBattleBack1Name = $dataSystem.battleback1Name;
			    	$gamePlayer._rx_remBattleBack2Name = $dataSystem.battleback2Name;
			    }
            }
            if (rx_recBatBakCmd === 1){
				$gameMap._battleback1Name = $gamePlayer._rx_remBattleBack1Name;
				$gameMap._battleback2Name = $gamePlayer._rx_remBattleBack2Name;
			    if (BattleManager.isBattleTest()) {
			    	$dataSystem.battleback1Name = $gamePlayer._rx_remBattleBack1Name;
			    	$dataSystem.battleback2Name = $gamePlayer._rx_remBattleBack2Name;
			    }
			    if ($gameParty.inBattle() && !$gameTemp._rx_changeBatBack_in_battle) {
			        $gameTemp._rx_changeBatBack_in_battle = true;
			    }
            }
        });

        //Speiteset_Battle
		Spriteset_Battle.prototype.battleback1Bitmap = function(){
		    return this._back1Sprite.battleback1Bitmap();
		};

		Spriteset_Battle.prototype.battleback2Bitmap = function(){
		    return this._back1Sprite.battleback2Bitmap();
		};
	} else {
        //Game_Interpreter
        const rx_t_gipc200911_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            rx_t_gipc200911_pluginCommand.call(this, command, args);
            if (command === 'battleback') {
                switch (args[0]) {
                case '0': case 'remember': case '記憶':
					$gamePlayer._rx_remBattleBack1Name = $gameMap.battleback1Name();
					$gamePlayer._rx_remBattleBack2Name = $gameMap.battleback2Name();
				    if (BattleManager.isBattleTest()) {
				    	$gamePlayer._rx_remBattleBack1Name = $dataSystem.battleback1Name;
				    	$gamePlayer._rx_remBattleBack2Name = $dataSystem.battleback2Name;
				    }
                    break;
                case '1': case 'recovery': case '復帰':
					$gameMap._battleback1Name = $gamePlayer._rx_remBattleBack1Name;
					$gameMap._battleback2Name = $gamePlayer._rx_remBattleBack2Name;
				    if (BattleManager.isBattleTest()) {
				    	$dataSystem.battleback1Name = $gamePlayer._rx_remBattleBack1Name;
				    	$dataSystem.battleback2Name = $gamePlayer._rx_remBattleBack2Name;
				    }
				    if ($gameParty.inBattle() && !$gameTemp._rx_changeBatBack_in_battle) {
				        $gameTemp._rx_changeBatBack_in_battle = true;
				    }
                    break;
                }
            }
        };
	}
})();