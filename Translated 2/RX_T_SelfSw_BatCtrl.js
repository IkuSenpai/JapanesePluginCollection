//=============================================================================
// Plugin_Name : セルフスイッチの一括操作MV＆MZ
// File_Name   : RX_T_SelfSw_BatCtrl.js
// Version     : 1.01
// Copylight   : 2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MZ
 * @plugindesc You will be able to operate the self-switch in batches.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @command selfSwitches
 * @text Self-Switches
 * @desc You can operate the Self-Switch in batches.
 *
 * @arg events
 * @text Events
 * @desc Events where you want to operate the self-switch in batches
 * @default []
 * @type struct<RXSelfSwitch>[]
 *
 * @command selfSwitchesEX
 * @text Self-SwitchesEX
 * @desc Batch operate of the same type of self-switch(mostly manual input)Warning:Be careful not to let the configuration fail!
 *
 * @arg eventIDEX
 * @text [EX]Event ID
 * @desc Eligible event IDs. Multiple selections are possible.
 * For example:6, 4-33, 40, 64-72, 80
 * @type string
 *
 * @arg switchTypeEX
 * @text [EX]Self-Switch Type
 * @desc The type of self-switch.
 * You can also set other settings than A to D.
 * @type string
 *
 * @arg statusEX
 * @text Switch Status
 * @desc This is a self-switching state (ON/OFF).
 * @default false
 * @type boolean
 *
 * @arg mapIDEX
 * @text [Ex]MAP ID
 * @desc Eligible map IDs. Multiple selections are possible.
 * For example:1, 7, 13-24, 30
 * @type string
 *
 * @command getSelfSwitches
 * @text Get the Self-Switch infos
 * @desc Get the state of any self-switch as a game-variables.
 *
 * @arg getEventID
 * @text Event ID
 * @desc Eligible Event IDs.
 * @default 1
 * @min 1
 * @type number
 *
 * @arg getSwitchType
 * @text Self-Switch Type
 * @desc The type of self-switch.
 * You can also set other settings than A to D.
 * @type string
 *
 * @arg getMapID
 * @text Map ID
 * @desc Eligible Map IDs.
 * @default 1
 * @min 1
 * @type number
 *
 * @arg putSwitchID
 * @text Game Switches ID
 * @desc A switch ID to obtain the target self-switch information.
 * @default 1
 * @min 1
 * @type switch
 *
 * @help Batch operation of self-switch
 * 
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * To use by MZ version, you need the official Plugin "CommonBase.js" plugin to use this plugin.
 * You need the official Plugin "CommonBase.js" plugin to use this plugin.
 * Stote:C:\Program Files\KADOKAWA\RPGMZ\dlc\BasicResources\plugins\official
 * Steam:C:\Program Files (x86)\Steam\steamapps\common\RPG Maker MZ\dlc\BasicResources\plugins\official
 * 
 * ◆Summary
 * You will be able to operate the self-switch in batches.
 * You can also use the game-switch to get information on self-switch.
 *
 * ◆Plugin Command for MZ
 * Plugin File：RX_T_SelfSw_BatCtrl
 * 
 * ★Self-Switches
 * Click "Events" under "Arguments".
 * When a new window appears, double-click on the blank space next to
 * the numbered field.
 * The event ID, self-switch type, switch state, and map ID are
 * specified respectively.
 * Do this operation as many times as you need.
 *
 * Sorry, but this parameter setting is only available in Japanese
 * due to programmatic reasons...
 *
 * ★Self-SwitchesEX
 * It's a little different from the way the above is set up.
 * Map IDs and event IDs are easier to specify, and self-switch types
 * other than A to D cann be specified (strings of two or more bytes
 * are also possible).
 * However, the self-switch type and switch state cannot be set
 * individually.
 * If you want to initialize the self-switch to a large extent, this
 * may be easier.
 * However, be very careful not to make a mistake in setting up the 
 * self-switch, because it is mainly based on keyboard input.
 *
 * ★Get the Self-Switch infos
 * You can store the specified map ID, event ID, and self-switch
 * type status in the specified game switch.
 * It would be useful in a conditional branching event.
 *
 * ◆Plugin Command for MV
 * Example: If you want to turn on the self-switch B of events with a map ID of
 * 3, ID 3 to 5, and 7, set up as follows.
 *
 * rx_selfsw 3 3-5 7 B ON
 *
 * Open a space and don't separate them with a comma.
 * The first number is the map ID, the second from the end is the self-switch
 * type, the last is the switch state, and all others are recognized as event
 * IDs.
 * If you set the map ID to 0, it will automatically specify the map ID for the
 * event being edited.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MZ
 * @plugindesc セルフスイッチを一括操作できるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command selfSwitches
 * @text セルフスイッチ
 * @desc セルフスイッチを一括操作できます。
 *
 * @arg events
 * @text イベント
 * @desc セルフスイッチを一括操作したいイベント
 * @default []
 * @type struct<RXSelfSwitch>[]
 *
 * @command selfSwitchesEX
 * @text セルフスイッチEX
 * @desc 同種セルフスイッチの一括操作（ほぼ手入力）
 * 【設定ミスにご注意ください。】
 *
 * @arg eventIDEX
 * @text [EX]イベントID
 * @desc 対象となるイベントIDです。こちらは複数選択可能です。
 * 例：2, 4-8, 11, 21-25, 37, 56, 48
 * @type string
 *
 * @arg switchTypeEX
 * @text [EX]セルフスイッチタイプ
 * @desc セルフスイッチの種類です。
 * こちらはA～D以外も設定可能です。
 * @type string
 *
 * @arg statusEX
 * @text スイッチ状態
 * @desc セルフスイッチの状態です（ON/OFF）。
 * @default false
 * @type boolean
 *
 * @arg mapIDEX
 * @text [Ex]マップID
 * @desc 対象となるマップIDです。こちらは複数選択可能です。
 * 例：1-4, 5, 14, 59-63
 * @type string
 *
 * @command getSelfSwitches
 * @text セルフスイッチ情報取得
 * @desc 任意のセルフスイッチの状態を
 * 変数で取得します。
 *
 * @arg getEventID
 * @text イベントID
 * @desc 対象となるイベントIDです。
 * @default 1
 * @min 1
 * @type number
 *
 * @arg getSwitchType
 * @text セルフスイッチタイプ
 * @desc セルフスイッチの種類です。
 * こちらはA～D以外も設定可能です。
 * @type string
 *
 * @arg getMapID
 * @text マップID
 * @desc 対象となるマップIDです。
 * @default 1
 * @min 1
 * @type number
 *
 * @arg putSwitchID
 * @text ゲームスイッチID
 * @desc 対象のセルフスイッチ情報を取得するための
 * スイッチIDです。
 * @default 1
 * @min 1
 * @type switch
 *
 * @help セルフスイッチの一括操作MV＆MZ
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * MZ版でのご利用には公式プラグインの「PluginCommonBase.js」が必要です。
 * Stote:C:\Program Files\KADOKAWA\RPGMZ\dlc\BasicResources\plugins\official
 * Steam:C:\Program Files (x86)\Steam\steamapps\common\RPG Maker MZ\dlc\BasicResources\plugins\official
 * 
 * ◆概要
 * セルフスイッチの一括操作できるようになります。
 * また、セルフスイッチの情報をゲームスイッチで取得することもできます。
 *
 * ◆プラグインコマンド（MZ）
 * プラグインファイル：RX_T_SelfSw_BatCtrl
 * 
 * ★セルフスイッチ
 * 「引数」の「イベント」をクリックします。
 * 新しいウィンドウが現れたら、番号が振られた欄の横にある空白を
 * ダブルクリックします。
 * イベントID、セルフスイッチタイプ、スイッチ状態、マップIDを
 * それぞれ指定します。
 * この操作を必要な数だけ行います。
 *
 * ★セルフスイッチEX
 * 上記の設定方法とは少し異なります。
 * マップID、イベントIDは指定しやすくなり、セルフスイッチタイプも
 * A～D以外（文字列でも可能）のものになりますが
 * セルフスイッチタイプとスイッチ状態は個別設定できません。
 * 大幅な範囲でセルフスイッチを初期化する場合は
 * こちらの方が手軽かもしれません。
 * ただし、キーボード入力が主体になりますので
 * 設定ミスには充分に注意してください。
 *
 * ★セルフスイッチ情報取得
 * こちらは指定したマップID、イベントID、セルフスイッチタイプの
 * 状態を指定したゲームスイッチに格納することができます。
 * 条件分岐イベントにお役立てください。
 *
 * ◆プラグインコマンド（MV）
 * 例：マップIDが3で、イベントID3～5番、そして7番のセルフスイッチBを
 * ONにしたい場合は以下のように設定します。
 *
 * rx_selfsw 3 3-5 7 B ON
 *
 * カンマで区切らずスペースを開けて設定します。
 * 数値の先頭がマップID、末尾から二番目はセルフスイッチのタイプ
 * 末尾はスイッチの状態、その他はすべてイベントIDとして認識します。
 * マップIDを0に設定すると、自動的にイベント編集中のマップIDを指定します。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
/*~struct~RXSelfSwitch:
 *
 * @param eventID
 * @text Event ID
 * @desc Target Event ID
 * @default 1
 * @min 1
 * @type number
 *
 * @param switchType
 * @text Self-Switch Type
 * @desc Self-Switch Type; A～D
 * @default A
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 *
 * @param status
 * @text SwitchState
 * @desc Self-Switch Status; ON/OFF
 * Self-Switch Status
 * @default false
 * @type boolean
 *
 * @param mapID
 * @text Map ID
 * @desc Target Map ID
 * @default 1
 * @min 1
 * @type number
 */
/*~struct~RXSelfSwitch:ja
 *
 * @param eventID
 * @text イベントID
 * @desc 対象となるイベントIDです。
 * @default 1
 * @min 1
 * @type number
 *
 * @param switchType
 * @text セルフスイッチタイプ
 * @desc セルフスイッチの種類です（A～D）。
 * @default A
 * @type select
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 *
 * @param status
 * @text スイッチ状態
 * @desc セルフスイッチの状態です（ON/OFF）。
 * @default false
 * @type boolean
 *
 * @param mapID
 * @text マップID
 * @desc 対象となるマップIDです。
 * @default 1
 * @min 1
 * @type number
 */

(() => {
	'use strict';
    const script = document.currentScript;

    if (PluginManager._commands !== undefined) {
        //PluginManager
        PluginManagerEx.registerCommand(script, "selfSwitches", args => {
            const rx_selfSwParams = args.events
            let imax = rx_selfSwParams.length
            let rx_key = [];
            for (let i = 0; i < imax; i++){
                rx_key = [rx_selfSwParams[i].mapID, rx_selfSwParams[i].eventID, rx_selfSwParams[i].switchType];
                $gameSelfSwitches.setValue(rx_key, rx_selfSwParams[i].status === true);
            }
        });
        PluginManager.registerCommand("RX_T_SelfSw_BatCtrl", "selfSwitchesEX", args => {
            let rx_key = [];
            let rx_mapID = [];
            let rx_evID = [];
            let rx_sswType = args.switchTypeEX;
            let rx_sswState = args.statusEX;
            let rx_getEX = args.mapIDEX.split(',');
            for (let i = 0; i < rx_getEX.length; i++){
                if (rx_getEX[i].indexOf('-') > -1){
                    let k = rx_getEX[i].split('-');
                    for(let j = parseInt(k[0]); j <= parseInt(k[1]); j++){
                        rx_mapID.push(j);
                    }
                }else{
                    rx_mapID.push(parseInt(rx_getEX[i]));
                }           
            }
            rx_getEX = args.eventIDEX.split(',');
            for (let i = 0; i < rx_getEX.length; i++){
                if (rx_getEX[i].indexOf('-') > -1){
                    let k = rx_getEX[i].split('-');
                    for(let j = parseInt(k[0]); j <= parseInt(k[1]); j++){
                        rx_evID.push(j);
                    }
                }else{
                    rx_evID.push(parseInt(rx_getEX[i]));
                }           
            }
            for (let i = 0; i < rx_mapID.length; i++){
                for (let j = 0; j < rx_evID.length; j++){
                    rx_key = [rx_mapID[i], rx_evID[j], rx_sswType];
                    $gameSelfSwitches.setValue(rx_key, rx_sswState === "true");
                }
            }
        });
        PluginManager.registerCommand("RX_T_SelfSw_BatCtrl", "getSelfSwitches", args => {
            let rx_key = [];
            let rx_mapID = args.getMapID;
            let rx_evID = args.getEventID;
            let rx_sswType = args.getSwitchType;
            let rx_putSwitchID = args.putSwitchID;
            rx_key = [rx_mapID, rx_evID, rx_sswType];
            $gameSwitches.setValue(rx_putSwitchID, $gameSelfSwitches.value(rx_key));
        });
    } else {
        //Game_Interpreter
        const rx_t_gipc200916_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            rx_t_gipc200916_pluginCommand.call(this, command, args);
            if (command === 'rx_selfsw') {
                console.log(args);
                const rx_sswType = args[args.length - 2];
                const rx_sswState = args[args.length - 1] === "ON" ? true : false;
                const rx_mapID = parseInt(args[0]) < 1 ? $gameMap._mapId : parseInt(args[0]);
                let rx_evID = [];
                let rx_key = [];
                for (let i = 1; i <= args.length - 3; i++){
                    if (args[i].indexOf('-') > -1){
                        let k = args[i].split('-');
                        for(let j = parseInt(k[0]); j <= parseInt(k[1]); j++){
                            rx_evID.push(parseInt(j));
                        }
                    }else{
                        rx_evID.push(parseInt(args[i]));
                    }
                }
                for (let i = 0; i < rx_evID.length; i++){
                    rx_key = [rx_mapID, rx_evID[i], rx_sswType];
                    $gameSelfSwitches.setValue(rx_key, rx_sswState === true);
                }
            }
        };
    }
})();