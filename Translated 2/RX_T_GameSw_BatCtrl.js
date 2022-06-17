//=============================================================================
// Plugin_Name : ゲームスイッチの一括操作(Batch operation of game-switch)
// File_Name   : RX_T_GameSw_BatCtrl.js
// Version     : 1.01
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You will be able to operate the self-switch in batches.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @command switches
 * @text Game-Switches
 * @desc You can operate the Game-Switch in batches.
 *
 * @arg switch_arc
 * @text Game-Switches ID
 * @desc Where you want to operate the game-switch in batches
 * Individual ON/OFF operation is possible for any ID.
 * @default []
 * @type struct<RXSwitch>[]
 *
 * @command switchesEX
 * @text Game-SwitchesEX
 * @desc Batch operate of the same type of game-switch(mostly manual input)Warning:Be careful not to let the configuration fail!
 *
 * @arg switchIDEX
 * @text [Ex]Game-Switch ID
 * @desc Eligible switch IDs. Multiple selections are possible.
 * For example:1, 7, 13-24, 30
 * @type string
 *
 * @arg statusEX
 * @text Switch Status
 * @desc This is a game-switching state (ON/OFF).
 * @default false
 * @type boolean
 *
 * @help Batch operation of game-switch
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * You need the official Plugin "CommonBase.js" plugin to use this plugin.
 * Stote:C:\Program Files\KADOKAWA\RPGMZ\dlc\BasicResources\plugins\official
 * Steam:C:\Program Files (x86)\Steam\steamapps\common\RPG Maker MZ\dlc\BasicResources\plugins\official
 * 
 * ◆Summary
 * You will be able to operate the game-switch in batches.
 * The difference between this function and the default function is that you
 * can set the ON/OFF setting to any individual switch ID and there is a wide
 * range of selections for the range.
 *
 * [Note]
 * Only the MZ version allows you to set individual ON/OFF settings for
 * favorite switch IDs.
 * A wide range of range selection is a feature common to both the MZ and
 * MV versions.
 * For example, you can select such a range as "1 to 3, 5, 9 to 16".
 *
 * ◆Plugin Command(MZ)
 * Plugin File：RX_T_GameSw_BatCtrl
 * 
 * ★Game-Switches
 * Click "Game Switch ID" under "Arguments".
 * When a new window appears, double-click on the blank space next to
 * the numbered field.
 * The "GameSwitchID" and "SwitchStatus" are specified respectively.
 * Do this operation as many times as you need.
 *
 * Sorry, but this parameter setting is only available in Japanese
 * due to programmatic reasons...
 *
 * ★Game-SwitchesEX
 * It's a little different from the way the above is set up.
 * The game-switch ID is easier to specify, but the switch state cannot be set
 * individually.
 * If you want to initialize a game-switch with a wide range but detailed
 * designation, this may be easier.
 * However, be very careful not to make a mistake in setting up the 
 * game-switch, because it is mainly based on keyboard input.
 *
 * ◆Plugin Command(MV)
 * For example, if you want to turn ON game-switches 1-3, 5, and 9-16.
 *
 * rx_sw 1-3 5 9-16 ON
 *
 * Instead of separating them with commas, open a space.
 * The ON and OFF settings must be written at the end.
 *
 * ◆Spec for MV version
 * When specifying ON or OFF, any string other than "ON" is considered "OFF".
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc ゲームスイッチを一括操作できるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command switches
 * @text ゲームスイッチ
 * @desc ゲームスイッチを一括操作できます。
 *
 * @arg switch_arc
 * @text ゲームスイッチID
 * @desc 一括操作したいゲームスイッチID
 * IDごとにON/OFFの個別操作が可能です。
 * @default []
 * @type struct<RXSwitch>[]
 *
 * @command switchesEX
 * @text ゲームスイッチEX
 * @desc ゲームスイッチの一括操作（ほぼ手入力）
 * 【設定ミスにご注意ください。】
 *
 * @arg switchIDEX
 * @text [EX]ゲームスイッチID
 * @desc 対象となるスイッチIDです。こちらは複数選択可能です。
 * 例：2, 4-8, 11, 21-25, 37, 56, 48
 * @type string
 *
 * @arg statusEX
 * @text スイッチ状態
 * @desc ゲームスイッチの状態です（ON/OFF）。
 * @default false
 * @type boolean
 *
 * @help ゲームスイッチの一括操作
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ご利用には公式プラグインの「PluginCommonBase.js」が必要です。
 * Stote:C:\Program Files\KADOKAWA\RPGMZ\dlc\BasicResources\plugins\official
 * Steam:C:\Program Files (x86)\Steam\steamapps\common\RPG Maker MZ\dlc\BasicResources\plugins\official
 * 
 * ◆概要
 * ゲームスイッチの一括操作できるようになります。
 * デフォルトの機能との違いは、個別に好きなスイッチIDにON/OFFの
 * 設定ができる点と、範囲指定の選択の幅が広い点です（※）。
 * ※：好きなスイッチIDにON/OFFの個別設定ができるのはMZ版のみです。
 * 　　範囲指定の選択の幅が広いのはMZ版、MV版共通の機能です。
 * 　　例えば「1～3、5、9～16」といった選択ができます。
 *
 * ◆プラグインコマンド（MZ）
 * プラグインファイル：RX_T_GameSw_BatCtrl
 * 
 * ★ゲームスイッチ
 * 「引数」の「ゲームスイッチID」をクリックします。
 * 新しいウィンドウが現れたら、番号が振られた欄の横にある空白を
 * ダブルクリックします。
 * GameSwitchID、SwitchStatusを
 * それぞれ指定します。
 * この操作を必要な数だけ行います。
 *
 * ★ゲームスイッチEX
 * 上記の設定方法とは少し異なります。
 * ゲームスイッチIDが指定しやすくなりますが
 * スイッチの状態は個別設定できません。
 * 広い範囲で細かくゲームスイッチを初期化する場合は
 * こちらの方が手軽かもしれません。
 * ただし、キーボード入力が主体になりますので
 * 設定ミスには充分に注意してください。
 *
 * ◆プラグインコマンド（MV）
 * 例えばゲームスイッチの1～3番、5番、9～16番をONにしたい場合は
 * 以下のように設定します。
 *
 * rx_sw 1-3 5 9-16 ON
 *
 * カンマで区切らずスペースを開けてください。
 * ONとOFFの設定は最後に記述します。
 *
 * ◆MV版の仕様
 * ONかOFFの指定をする時、「ON」以外の文字列はすべて「OFF」とみなされます。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
/*~struct~RXSwitch:
 *
 * @param switchID
 * @text GameSwitchID
 * @desc 操作したいスイッチのIDです。
 * Target Game-Switch ID
 * @default 1
 * @min 1
 * @type switch
 *
 * @param status
 * @text SwitchStatus
 * @desc スイッチの状態です（ON/OFF）。
 * Switch Status(ON/OFF)
 * @default false
 * @type boolean
 */

(() => {
	'use strict';
    const script = document.currentScript;

    if (PluginManager._commands !== undefined) {
        //PluginManager
	    PluginManagerEx.registerCommand(script, "switches", args => {
	        const rx_switchArchives = args.switch_arc
	    	let imax = rx_switchArchives.length
	    	let rx_key = [];
	    	for (let i = 0; i < imax; i++){
	    		$gameSwitches.setValue(rx_switchArchives[i].switchID, rx_switchArchives[i].status === true);
	    	}
	    });
	    PluginManager.registerCommand("RX_T_GameSw_BatCtrl", "switchesEX", args => {
	    	let rx_switchID = [];
	    	let rx_swState = args.statusEX;
	    	let rx_getEX = args.switchIDEX.split(',');
	    	for (let i = 0; i < rx_getEX.length; i++){
	    		if (rx_getEX[i].indexOf('-') > -1){
	    			let k = rx_getEX[i].split('-');
	    			for(let j = parseInt(k[0]); j <= parseInt(k[1]); j++){
	    				rx_switchID.push(j);
	    			}
	    		} else {
	    			rx_switchID.push(parseInt(rx_getEX[i]));
	    		}    		
	    	}
	    	for (let i = 0; i < rx_switchID.length; i++){
	    		$gameSwitches.setValue(rx_switchID[i], rx_swState === "true");
	    	}

	    });
    } else {
        //Game_Interpreter
        const rx_t_gipc200906_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            rx_t_gipc200906_pluginCommand.call(this, command, args);
            if (command === 'rx_sw') {
            	const rx_swResult = args[args.length - 1] === "ON" ? true : false;
            	let rx_sRA; //switch Result Archives
            	for(let i = 0; i <= args.length - 2; i++){
            		if (args[i].indexOf('-') > -1){
            			rx_sRA = args[i].split('-');
            			for(let j = parseInt(rx_sRA[0]); j <= parseInt(rx_sRA[1]); j++){
            				$gameSwitches.setValue(j, rx_swResult === true);
            			}
            		} else {
            			$gameSwitches.setValue(parseInt(args[i]), rx_swResult === true);
            		}
            	}
            }
        };
	}

})();