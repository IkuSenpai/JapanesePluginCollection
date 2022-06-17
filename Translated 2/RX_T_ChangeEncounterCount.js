//=============================================================================
// Plugin_Name : Change Encounter Count
// File_Name   : RX_T_ChangeEncounterCount.js
// Version     : 1.01
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc Encounter steps can be changed through event settings.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @command enCount
 * @text Change in the number of steps to the encounter
 * @desc You can change the number of steps to the encounter
 * in the event settings.
 *
 * @arg encStep
 * @text Basic Step Count to Encounter
 * @desc The basic value of steps it takes to encounter
 * EncounterCount = BasicStepCount + 0 to (RandomValue - 1)
 * @default 15
 * @min 0
 * @type number
 *
 * @arg encRand
 * @text Random Value
 * @desc A random value to add to the basic step count
 * -1: Default formula 0: Fixed to the basic step count
 * @default 15
 * @min -1
 * @type number
 * 
 * @help Change in the number of steps to the encounter
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * You will be able to change the number of steps to the encounter
 * (enemy appearance rate) at will, depending on the settings of the event.
 *
 * ◆Usage
 * 【Event command "Script"】
 * （This is the only way to set it up in RPG Maker MV.）
 * Example 1: If you want to fix the number of steps to the encounter at 20 
 *
 * this.rx_changeSteps(20, 0);
 *
 * Example 2: If you want to add 0 to 9 to the number of steps to the
 * encounter (15) you have set
 *
 * this.rx_changeSteps(15, 10);
 *
 * Example 3: If you want to use the same calculation method as usual and
 * set the number of steps to the encounter to 15
 *
 * this.rx_changeSteps(15, -1);
 *
 * 【Plugin Command】
 *（This method is exclusive to RPG Maker MZ.）
 * ★Basic Step Count to Encounter
 * The setting basic value of steps it takes to encounter.
 * It is finally determined by "Basic step count to Encounter + 0 to
 * (Random Value - 1)".
 *
 * ★Random Value
 * A random value to add to the "Basic Step Count to Encounter".
 * Normally, the value is "0 to setpoint - 1".
 * If it is set to 0, the number of steps to the encounter is fixed to the
 * Basic Step Count to Encounter.
 * If it is set to -1, the number of encountered steps is set using the
 * same calculation method as usual based on the Basic Step Count to
 * Encounter.
 *
 * 【Spec】
 * If you use the "Transfer Player" event command, the settings will be
 * initialized.
 * If you want the effect to continue, set it again after the use
 * "Transfer Player" command.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc エンカウント歩数（敵との遭遇率）をイベントによって自在に変えることができます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command enCount
 * @text エンカウント歩数の変更
 * @desc エンカウント歩数をイベントで変更します。
 *
 * @arg encStep
 * @text 歩数基本値
 * @desc エンカウント歩数の設定基本値
 * 最終歩数 = 歩数基本値 + 0～（ランダム値 - 1）
 * @default 15
 * @min 0
 * @type number
 *
 * @arg encRand
 * @text ランダム値
 * @desc 歩数基本値にプラスするランダム値
 * -1:デフォルト計算式 0:歩数基本値に固定
 * @default 15
 * @min -1
 * @type number
 * 
 * @help エンカウント歩数の変更
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * エンカウント歩数（敵との遭遇率）をイベントによって
 * 自在に変えることができるようになります。
 *
 * ◆使い方
 * 【イベントコマンド「スクリプト」】
 * （RPGツクールMVではこの方法のみとなります。）
 * 例１：エンカウント歩数を20に固定する場合 
 *
 * this.rx_changeSteps(20, 0);
 *
 * 例２：設定したエンカウント歩数15に0～9を加える場合
 *
 * this.rx_changeSteps(15, 10);
 *
 * 例３：通常と同じ計算方法でエンカウント歩数を15に設定する場合
 *
 * this.rx_changeSteps(15, -1);
 *
 * 【プラグインコマンド】
 * （この方法はRPGツクールMZ専用です。）
 * ★歩数基本値
 * エンカウント歩数の設定基本値です。
 * 「歩数基本値 + 0～（ランダム値 - 1）」で最終決定されます。
 *
 * ★ランダム値
 * 歩数基本値にプラスするランダムな値です。
 * 通常は「0～設定値 - 1」になります。
 * 0に設定するとエンカウント歩数が歩数基本値に固定されます。
 * -1に設定すると歩数基本値を基に通常と同じ計算方法で
 * エンカウント歩数が設定されます。
 *
 * 【仕様】
 * イベントコマンド「場所移動」を使用すると設定が初期化されます。
 * 効果を継続させたい場合は場所移動後、再度設定し直してください。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

	//RX-T plugin parameters
	//if (PluginManager._commands !== undefined) => Checking RPG Maker's Version. undefined:MV, object:MZ
	if (PluginManager._commands !== undefined){
	    PluginManager.registerCommand("RX_T_ChangeEncounterCount", "enCount", args => {
	    	let rx_encSteps = parseInt(args.encStep);
	    	let rx_encRand = parseInt(args.encRand);
	    	$gameMap._interpreter.rx_changeSteps(rx_encSteps, rx_encRand);
	    });
	}

	//Game Player
	
	const rx_t_gppi151102_initMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
	    rx_t_gppi151102_initMembers.call(this);
	    this._rx_maxEncounterCount = 0;
	    this._rx_EncounterRandom = -1;
	};

	const rx_t_gppm151102_makeEncounterCount = Game_Player.prototype.makeEncounterCount;
	Game_Player.prototype.makeEncounterCount = function() {
    	let n = $gameMap.encounterStep();
    	rx_t_gppm151102_makeEncounterCount.call(this);
	    if (this._rx_EncounterRandom > 0) this._encounterCount = n + Math.randomInt(this._rx_EncounterRandom);
	    if (this._rx_EncounterRandom === 0) this._encounterCount = n;
	};

	const rx_t_gppr151102_reserveTransfer = Game_Player.prototype.reserveTransfer;
	Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
	    rx_t_gppr151102_reserveTransfer.call(this, mapId, x, y, d, fadeType);
	    this._rx_maxEncounterCount = 0;
	    this._rx_EncounterRandom = -1;
	};

	//Game Map

	const rx_t_gmpe151102_encounterStep = Game_Map.prototype.encounterStep;
	Game_Map.prototype.encounterStep = function() {
	    if ($gamePlayer._rx_maxEncounterCount > 0) {
	    	return $gamePlayer._rx_maxEncounterCount;
	    }
	    return rx_t_gmpe151102_encounterStep.call(this);
	};

	//Game_Interpreter::rx_changeSteps *Change Encounter Steps*

	Game_Interpreter.prototype.rx_changeSteps = function(steps, rx_random) {
	    $gamePlayer._rx_maxEncounterCount = steps;
	    $gamePlayer._rx_EncounterRandom = rx_random;
	    $gamePlayer._encounterCount = steps;
	    $gamePlayer.makeEncounterCount();
	};

})();