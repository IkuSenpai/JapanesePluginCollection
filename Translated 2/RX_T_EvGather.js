//=============================================================================
// Plugin_Name : Gathering the Events
// File_Name   : RX_T_EvGather.js
// Version     : 1.01
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc 指定のイベントをプレイヤーがいる位置に集合させます。
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @command gatheringEvents
 * @text Gathering the Events
 * @desc Gathering the specified events to the
 * player's location.
 *
 * @arg EventID
 * @text Event ID
 * @desc The event ID of the target you want to gather.
 * Example:1-4, 5, 14, 59-63
 * @default 1
 * @type string
 *
 * @arg moveToX
 * @text Move to X
 * @desc Position to gather events (X)
 * X, Y, both -1: Same position as the player.
 * @default -1
 * @min -1
 * @type number
 *
 * @arg moveToY
 * @text Move to Y
 * @desc Position to gather events (Y)
 * X, Y, both -1: Same position as the player.
 * @default -1
 * @min -1
 * @type number
 *
 * @help Gathering the Events
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * Gathering the specified events to the player's location.
 * And, You can also gathering events by specifying the coordinates.
 *
 * ◆Usage
 * 【Event command "Script"】
 * （This is the only way to set it up in RPG Maker MV.）
 * To gather Event ID 1, Event ID 3, and Event ID 5 at the player's location
 *
 * this.ev_gather([1, 3, 5]);
 *
 * If you want to gather events in a specific coordinate, you can use
 * Set up additional X and Y as shown below.
 *
 * this.ev_gather([eventID1, eventID2], x, y);
 *
 * 【Plugin Command】
 *（This method is exclusive to RPG Maker MZ.）
 * ★Event ID
 * The event ID of the target you want to gather.
 * Multiple selections are possible.
 * Example:1-4, 5, 14, 59-63
 *
 * ★Move to X(or Y)
 * Position to gather events.
 * If both X and Y are set to -1, they will gather at the same position
 * as the player.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 指定のイベントをプレイヤーがいる位置に集合させます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command gatheringEvents
 * @text イベントの集合
 * @desc 指定のイベントをプレイヤーがいる位置に集合させます。
 * また、座標を指定してイベントを集合させることもできます。
 *
 * @arg EventID
 * @text イベントID
 * @desc 集合させる対象となるイベントIDです。
 * 例：1-4, 5, 14, 59-63
 * @default 1
 * @type string
 *
 * @arg moveToX
 * @text 移動先座標X
 * @desc イベントの集合先の座標Xです。
 * X、Yともに-1でプレイヤーと同じ位置に集合します。
 * @default -1
 * @min -1
 * @type number
 *
 * @arg moveToY
 * @text 移動先座標Y
 * @desc イベントの集合先の座標Yです。
 * X、Yともに-1でプレイヤーと同じ位置に集合します。
 * @default -1
 * @min -1
 * @type number
 *
 * @help イベントの集合（MV＆MZ）
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 指定のイベントをプレイヤーがいる位置に集合させます。
 * また、座標を指定してイベントを集合させることもできます。
 *
 * ◆使い方
 * 【イベントコマンド「スクリプト」】
 * （RPGツクールMVではこの方法のみとなります。）
 * イベントID1、イベントID3、イベントID5をプレイヤーのいる位置に集合させる場合
 *
 * this.ev_gather([1, 3, 5]);
 *
 * 座標を指定してイベントを集合させたい場合
 * 以下のようにXとYを追加設定します。
 *
 * this.ev_gather([eventID1, eventID2], x, y);
 *
 * 【プラグインコマンド】
 * （この方法はRPGツクールMZ専用です。）
 * ★イベントID
 * 集合させる対象となるイベントIDです。こちらは複数選択可能です。
 * 例：1-4, 5, 14, 59-63
 *
 * ★移動先座標X(or Y)
 * イベントの集合先の座標です。
 * X、Yともに-1に設定するとプレイヤーと同じ位置に集合します。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
 */ 
(() => {
    'use strict';

	//RX-T plugin parameters
	//if (PluginManager._commands !== undefined) => ツクールのバージョン判定 undefined:MV, object:MZ
	if (PluginManager._commands !== undefined){
	    PluginManager.registerCommand("RX_T_EvGather", "gatheringEvents", args => {
	    	let rx_moveGtX = parseInt(args.moveToX);
	    	let rx_moveGtY = parseInt(args.moveToY);
	    	let rx_gathEv = args.EventID.split(',');
	    	let rx_gathers = [];
	    	for (let i = 0; i < rx_gathEv.length; i++){
	    		if (rx_gathEv[i].indexOf('-') > -1){
	    			let k = rx_gathEv[i].split('-');
	    			for(let j = parseInt(k[0]); j <= parseInt(k[1]); j++){
	    				rx_gathers.push(j);
	    			}
	    		}else{
	    			rx_gathers.push(parseInt(rx_gathEv[i]));
	    		}    		
	    	}
	    	$gameMap._interpreter.ev_gather(rx_gathers, rx_moveGtX, rx_moveGtY);
	    });
	}

	//Game_Interpreter

	Game_Interpreter.prototype.ev_gather = function(ev, x, y) {
		let rx_gaX = x === undefined ? -1 : x;
		let rx_gaY = y === undefined ? -1 : y;
		this.x = rx_gaX < 0 ? $gamePlayer.x : rx_gaX;
		this.y = rx_gaY < 0 ? $gamePlayer.y : rx_gaY;
	    let character = this.character(0);
	    let siz = Object.keys(ev).length;
	    if(siz <= 0){ return true; }
	    for (let i = 0; i < siz ; i++){
	         character = this.character(ev[i]);
	         character.locate(this.x, this.y);
	    }
	    return true;
	}

})();