//=============================================================================
// Plugin_Name : Call Map Event
// File_Name   : RX_T_CallEvent_in_Map.js
// Version     : 1.00
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc It is possible to call up events you've set up in your map from other events.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @command callev
 * @text Call Map Event
 * @desc Call an event in the map.
 * @arg eventID
 * @text Event ID
 * @desc The ID of the event you want to call.
 * @type number
 * @min 1
 * @default 1
 *
 * @help Call Map Event
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * It is possible to call up events you've set up in your map from
 * other events.
 * Basically, a "Call Common Event" is sufficient.
 * However, this may be more convenient in some cases.
 * 
 * ◆Plugin Command for MZ
 * Plugin File: RX_T_CallEvent_in_Map
 *
 * ★Event ID
 * Specify a number.
 * 
 * ◆Plugin Command for MV
 * Example: How to set up a call for events with an ID of 3
 *
 * call_ev 3
 * 
 * ◆Notes
 * Called events are affected by game switches, self-switches, items and other
 * conditions.
 *
 * For example, let's say the event with the above settings is "Event 1" and
 * the event to be called is "Event 2".
 * That "Event 2" is an event that usually says "Hello! I am a Japanese." but
 * when switch 1 is on, it says "What kind of animal do you like? I like
 * chocolate ice cream."
 *
 * If you activate the "Event 1" event, turn on Switch 1 and then call
 * "Event 2", "Event 2" will be in a state that satisfies that condition,
 * so "What kind of animal do you like? I like chocolate ice cream." it say.
 * 
 * Set it up with this in mind.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc マップ内に設定したイベントを他のイベントから呼び出すことができます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command callev
 * @text イベントの呼び出し
 * @desc マップ内のイベントを呼び出します。
 * @arg eventID
 * @text イベントID
 * @desc 呼び出したいイベントのIDです。
 * @type number
 * @min 1
 * @default 1
 *
 * @help マップ内イベントの呼び出し（MV＆MZ）
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * マップ内に設定したイベントを他のイベントから呼び出すことができます。
 * 基本的にはコモンイベントの呼び出しで事足りますが 
 * 場合によってはこちらの方が便利になる場合もあるかもしれません。
 *
 * ◆プラグインコマンド（MZ版）
 * プラグインファイル：RX_T_CallEvent_in_Map
 * 
 * ★イベントID
 * 数値を指定します。
 *
 * ◆プラグインコマンド（MV版）
 * 例：イベントID3番のイベントを呼び出したい場合は
 * 以下のように設定します。
 *
 * call_ev 3
 *
 * 【備考】
 * 呼び出されたイベントは、ゲームスイッチやセルフスイッチ、アイテム等の
 * 条件に影響されます。
 *
 * 例えば上記のような設定がされているイベントをイベント1として
 * 呼び出される側のイベントをイベント2とします。
 * そのイベント2は、通常「いらっしゃいませ」と言いますが、スイッチ1がONのときに
 * 「チッ！ 客が 当店に なんの ようだ！」と言うイベントです。
 *
 * イベント1のイベントを発動させ、スイッチ1をONにした後イベント2を呼び出すと
 * イベント2はその条件を満たす状態になっているため
 * 「チッ！ 客が 当店に なんの ようだ！」と言います。
 *
 * このことを踏まえて設定してください。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

    if (PluginManager._commands !== undefined) {
        //PluginManager
        PluginManager.registerCommand("RX_T_CallEvent_in_Map", "callev", args => {
            const rx_eventID = parseInt(args.eventID);
            $gameMap._interpreter.call_ev(rx_eventID);
        });
    } else {
        //Game_Interpreter
        const rx_t_gipc200915_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            rx_t_gipc200915_pluginCommand.call(this, command, args);
            const rx_eventId = parseInt(args);
            if (command === 'call_ev') $gameMap._interpreter.call_ev(rx_eventId);
        };
    }
	
	//Game_Interpreter
	
    Game_Interpreter.prototype.call_ev = function(eventId) {
        $gameMap.event(eventId).refresh();
        const rxEvent = $gameMap.event(eventId).page();
        if (rxEvent) {
            eventId = this.isOnCurrentMap() ? eventId : 0;
            this.setupChild(rxEvent.list, eventId);
        }
        return true;
    };

})();