/*
 * --------------------------------------------------
 * ROR_GlobalDataCount.js
 *   ver.1.0.0
 * Copyright (c) 2022 R.Orio
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc セーブデータを跨いだ包括的なプレイデータを管理します
 * @author R.Orio
 * @version 1.0.0
 *
 * @help
 * 編集したデータをセーブデータに挿入して保持します。
 * 保持できる内容は以下の通りです。
 * ・プレイ時間
 * ・歩数
 * ・戦闘回数
 * ・勝利回数
 * ・逃走回数
 *
 * また、プラグインパラメーターでスイッチ／変数のIDを指定することで、
 * 指定されたスイッチ／変数の値を全セーブデータで共有することができます。
 * （ニューゲームも含む）
 * 設定例：共有するスイッチ／変数のIDが1と3の場合…[1,3]
 * ※IDとIDの間は半角のカンマ（,）で区切ってください。
 * ※かっこ（[]）は消さないでください。
 *
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 *
 * @param TargetSwitchIds
 * @text ゲーム全体で共有するスイッチID
 * @desc ゲーム全体で共有するスイッチのIDを指定します。
 * @default []
 *
 *
 *
 * @param TargetVariableIds
 * @text ゲーム全体で共有する変数ID
 * @desc ゲーム全体で共有する変数のIDを指定します。
 * @default []
 *
 *
 *
 * @command checkGlobalPlaytime
 * @text 通算プレイ時間を取得
 * @desc 現在の通算プレイ時間を取得します。
 *
 * @arg variable_id
 * @text 変数ID
 * @desc 通算プレイ時間を格納する変数のID
 * @type variable
 *
 *
 *
 * @command checkGlobalSteps
 * @text 通算歩数を取得
 * @desc 現在の通算歩数を取得します。
 *
 * @arg variable_id
 * @text 変数ID
 * @desc 通算歩数を格納する変数のID
 * @type variable
 *
 *
 *
 * @command checkGlobalBattleCount
 * @text 通算戦闘回数を取得
 * @desc 現在の通算戦闘回数を取得します。
 *
 * @arg variable_id
 * @text 変数ID
 * @desc 通算戦闘回数を格納する変数のID
 * @type variable
 *
 *
 *
 * @command checkGlobalWinCount
 * @text 通算勝利回数を取得
 * @desc 現在の通算勝利回数を取得します。
 *
 * @arg variable_id
 * @text 変数ID
 * @desc 通算勝利回数を格納する変数のID
 * @type variable
 *
 *
 *
 * @command checkGlobalEscapeCount
 * @text 通算逃走回数を取得
 * @desc 現在の通算逃走回数を取得します。
 *
 * @arg variable_id
 * @text 変数ID
 * @desc 通算逃走回数を格納する変数のID
 * @type variable
 *
 *
 *
 */

(() => {
	'use strict';

	const Parameters = PluginManager.parameters('ROR_GlobalDataCount');
	const Param = JSON.parse(JSON.stringify(Parameters, function(key, value){
		try{
			return JSON.parse(value);
		}catch(e){
			try{
				return eval(value);
			}catch(e){
				return value;
			}
		}
	}));

	/**
	 * ニューゲーム時の起算プレイ時間の初期化
	 * グローバル対象のスイッチ・変数の反映
	 */
	const _DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function(){
		_DataManager_setupNewGame.apply(this, arguments);

		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			//RORのGlobalDataから前回セーブした時点のデータを取得
			const target_num = getPluginNum();
			const Parameters = $plugins[target_num].parameters;

			//グローバル化対象のスイッチに前回セーブ時点の状況を反映
			const TargetSwitchIds = Param.TargetSwitchIds;
			const GlobalSwitches = RORGlobalData["switches"];//RORのGlobalData
			if(GlobalSwitches){
				for(const target_switch_id of TargetSwitchIds){
					if(GlobalSwitches[target_switch_id]){
						$gameSwitches.setValue(target_switch_id, GlobalSwitches[target_switch_id]);
					}
				}
			}

			//グローバル化対象の変数に前回セーブ時点の値を反映
			const TargetVariableIds = Param.TargetVariableIds;
			const GlobalVariables = RORGlobalData["variables"];//RORのGlobalData
			if(GlobalVariables){
				for(const target_variable_id of TargetVariableIds){
					if(GlobalVariables[target_variable_id]){
						$gameVariables.setValue(target_variable_id, GlobalVariables[target_variable_id]);
					}
				}
			}

			$plugins[target_num].parameters["initialPlaytime"] = 0;
			$plugins[target_num].parameters["initialSteps"] = 0;
			$plugins[target_num].parameters["initialBattleCount"] = 0;
			$plugins[target_num].parameters["initialWinCount"] = 0;
			$plugins[target_num].parameters["initialEscapeCount"] = 0;

		}).catch(function(){
			console.log('catch');
			const InitializeData = {
					playtime : 0,
					steps : 0,
					battleCount : 0,
					winCount : 0,
					escapeCount : 0,
			};
			StorageManager.saveObject("RORGlobalData", InitializeData);
		});
	};

	/**
	 * MZデフォルトのGlobalInfoセーブと共にRORのGlobalDataも保存
	 * 今回のプレイ開始からセーブ現在までのプレイ時間及び歩数を計算して保存
	 * セーブ時点のスイッチ・変数状態もRORのGlobalDataに保存
	 * RORのGlobalDataが見つからない場合は初期登録として現在のプレイ時間、歩数を保存
	 */
	const _DataManager_saveGlobalInfo = DataManager.saveGlobalInfo;
	DataManager.saveGlobalInfo = function(){
		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			const target_num = getPluginNum();
			const Parameters = $plugins[target_num].parameters;

			const initial_playtime = Parameters.initialPlaytime;
			const initial_steps = Parameters.initialSteps;
			const initial_battle_count = Parameters.initialBattleCount;
			const initial_win_count = Parameters.initialWinCount;
			const initial_escape_count = Parameters.initialEscapeCount;

			const current_playtime = $gameSystem.playtime();
			const current_steps = $gameParty.steps();
			const current_battle_count = $gameSystem.battleCount();
			const current_win_count = $gameSystem.winCount();
			const current_escape_count = $gameSystem.escapeCount();

			const calc_playtime = RORGlobalData.playtime + (current_playtime - initial_playtime);
			const calc_steps = RORGlobalData.steps + (current_steps - initial_steps);
			const calc_battle_count = RORGlobalData.battleCount + (current_battle_count - initial_battle_count);
			const calc_win_count = RORGlobalData.winCount + (current_win_count - initial_win_count);
			const calc_escape_count = RORGlobalData.escapeCount + (current_escape_count - initial_escape_count);

			const UpdateRORGlobalData = {
					playtime : calc_playtime,
					steps : calc_steps,
					battleCount : calc_battle_count,
					winCount : calc_win_count,
					escapeCount : calc_escape_count,
					switches : $gameSwitches._data,
					variables : $gameVariables._data,
			};

			//起算数値を更新
			$plugins[target_num].parameters["initialPlaytime"] = current_playtime;
			$plugins[target_num].parameters["initialSteps"] = current_steps;
			$plugins[target_num].parameters["initialBattleCount"] = current_battle_count;
			$plugins[target_num].parameters["initialWinCount"] = current_win_count;
			$plugins[target_num].parameters["initialEscapeCount"] = current_escape_count;

			StorageManager.saveObject("RORGlobalData", UpdateRORGlobalData);

		}).catch(function(){
			const InitializeData = {
					playtime : $gameSystem.playtime(),
					steps : $gameParty.steps(),
					battleCount : $gameSystem.battleCount(),
					winCount : $gameSystem.winCount(),
					escapeCount : $gameSystem.escapeCount(),
			};
			StorageManager.saveObject("RORGlobalData", InitializeData);
		});

		_DataManager_saveGlobalInfo.apply(this, arguments);
	};



	/**
	 * セーブデータのロード
	 */
	const _Scene_Load_executeLoad = Scene_Load.prototype.executeLoad;
	Scene_Load.prototype.executeLoad = function(){
		_Scene_Load_executeLoad.apply(this, arguments);

		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			const target_num = getPluginNum();
			const Parameters = $plugins[target_num].parameters;

			//MZデフォルトのGlobalInfoからロードしたセーブデータの前回セーブ時点でのプレイ時間を取得
			const globalInfo = DataManager._globalInfo[arguments[0]];//MZのGlobalInfo
			let playtime = globalInfo["playtime"];
			let sec = playtime.substr(-2);
			let min = playtime.substr(-5, 2);
			let len = playtime.length;
			let hour = playtime.substr(0, (len - 6));
			sec = parseInt(sec) + (parseInt(min) * 60) + (parseInt(hour) * 3600);
			$plugins[target_num].parameters["initialPlaytime"] = sec;

			//Global化対象のスイッチをゲームデータの変数に反映
			const TargetSwitchIds = Param.TargetSwitchIds;//Global化対象のスイッチを取得
			const GlobalSwitches = RORGlobalData["switches"];//RORのGlobalDataから前回セーブした時点のスイッチ情報を取得
			if(GlobalSwitches){
				for(const target_switch_id of TargetSwitchIds){
					if(GlobalSwitches[target_switch_id]){
						//プラグインパラメーターでGlobal化対象になっているスイッチの場合は前回セーブした時点のスイッチの値を反映
						$gameSwitches.setValue(target_switch_id, GlobalSwitches[target_switch_id]);
					}
				}
			}

			//Global化対象の変数をゲームデータの変数に反映
			const TargetVariableIds = Param.TargetVariableIds;//Global化対象の変数を取得
			const GlobalVariables = RORGlobalData["variables"];//RORのGlobalDataから前回セーブした時点の変数情報を取得
			if(GlobalVariables){
				for(const target_variable_id of TargetVariableIds){
					if(GlobalVariables[target_variable_id]){
						//プラグインパラメーターでGlobal化対象になっている変数の場合は前回セーブした時点の変数の値を反映
						$gameVariables.setValue(target_variable_id, GlobalVariables[target_variable_id]);
					}
				}
			}
		}).catch(function(){
			//ロードが正常にできなかった場合はプレイ時間0、歩数0スタートとして扱う
			const InitializeData = {
					playtime : 0,
					steps : 0,
					battleCount : 0,
					winCount : 0,
					escapeCount : 0,
			};
			StorageManager.saveObject("RORGlobalData", InitializeData);
		});
	}



	/**
	 * 上記Scene_Load.prototype.executeLoad時点ではセーブデータからゲームデータが反映されていなかったため
	 * MZデフォルトのGlobalInfoから取得しないデータ類（プレイ時間以外）はこちらで取得
	 */
	const _Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
	Scene_Load.prototype.onLoadSuccess = function(){
		_Scene_Load_onLoadSuccess.apply(this, arguments);

		let target_num = getPluginNum();
		$plugins[target_num].parameters["initialSteps"] = $gameParty.steps();
		$plugins[target_num].parameters["initialBattleCount"] = $gameSystem.battleCount();
		$plugins[target_num].parameters["initialWinCount"] = $gameSystem.winCount();
		$plugins[target_num].parameters["initialEscapeCount"] = $gameSystem.escapeCount();
	}



	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

	PluginManager.registerCommand(pluginName, "checkGlobalPlaytime", args => {

		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			const target_num = getPluginNum();

			const Parameters = $plugins[target_num].parameters;
			let initial_playtime = 0;
			if(Parameters.initialPlaytime){
				initial_playtime = Parameters.initialPlaytime;
			}

			const current_playtime = $gameSystem.playtime();

			$gameVariables.setValue(args.variable_id, RORGlobalData.playtime + (current_playtime - initial_playtime));

		}).catch(function(){
			console.log('an error occured');
		});

	});



	PluginManager.registerCommand(pluginName, "checkGlobalSteps", args => {

		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			const target_num = getPluginNum();

			const Parameters = $plugins[target_num].parameters;
			let initial_steps = 0;
			initial_steps = Parameters.initialSteps;

			const current_step = $gameParty.steps();

			$gameVariables.setValue(args.variable_id, RORGlobalData.steps + (current_step - initial_steps));

		}).catch(function(){
			console.log('an error occured');
		});
	});



	PluginManager.registerCommand(pluginName, "checkGlobalBattleCount", args => {

		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			const target_num = getPluginNum();
			const Parameters = $plugins[target_num].parameters;
			const initial_battle_count = Parameters.initialBattleCount;
			const current_battle_count = $gameSystem.battleCount();

			$gameVariables.setValue(args.variable_id, RORGlobalData.battleCount + (current_battle_count - initial_battle_count));

		}).catch(function(){
			console.log('an error occured');
		});
	});



	PluginManager.registerCommand(pluginName, "checkGlobalWinCount", args => {

		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			const target_num = getPluginNum();
			const Parameters = $plugins[target_num].parameters;
			const initial_win_count = Parameters.initialWinCount;
			const current_win_count = $gameSystem.winCount();

			$gameVariables.setValue(args.variable_id, RORGlobalData.winCount + (current_win_count - initial_win_count));

		}).catch(function(){
			console.log('an error occured');
		});
	});



	PluginManager.registerCommand(pluginName, "checkGlobalEscapeCount", args => {

		const RORGlobalData = StorageManager.loadObject("RORGlobalData").then(RORGlobalData => {

			const target_num = getPluginNum();
			const Parameters = $plugins[target_num].parameters;
			const initial_escape_count = Parameters.initialEscapeCount;
			const current_escape_count = $gameSystem.escapeCount();

			$gameVariables.setValue(args.variable_id, RORGlobalData.escapeCount + (current_escape_count - initial_escape_count));

		}).catch(function(){
			console.log('an error occured');
		});
	});



	function getPluginNum(){

		let num = 0;
		let target_num = 0;
		for(const plugin of $plugins){
			if(plugin.name === "ROR_GlobalDataCount"){
				target_num = num;
			}
			num++;
		}

		return target_num;
	}



})();