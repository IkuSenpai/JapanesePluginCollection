/*
 * --------------------------------------------------
 * ROR_DynamicPriceUpdate.js
 *   ver.1.0.0
 * Copyright (c) 2021 R.Orio
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc アイテムの価格を動的に更新できるようにします。
 * @author R.Orio
 * @base ROR_BaseInsertDataToSave
 * @version 1.0.0
 *
 * @help
 * アイテムの価格を動的に更新できるようにします。
 *
 * 使い方:
 * 価格更新を実行したいタイミングでプラグインコマンドを設定してください。
 * プラグインコマンド設定時に価格を更新するアイテムと、
 * 基準価格、標準偏差を設定してください。
 * 入力した基準価格を中心に価格を上書きします。
 * 価格の散らばり度合も設定可能です。
 * 値を大きくすると散らばり度合が大きくなります。
 *
 * 【ご注意ください】
 * ROR_BaseInsertDataToSave.jsを併せて有効化してください。
 * 無くても動作はしますが、セーブしても更新された価格が保存されません。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 *
 * @command executeUpdate
 * @text 価格更新の実行
 * @desc 価格の更新を実行します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 * @arg base_price
 * @text 基準価格
 * @desc ベースになる価格です。この価格を中心に変動させます。
 * @type number
 * @min 1
 *
 * @arg specification_type
 * @text 変化率の指定方法
 * @desc 変化率の数値指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg change_rate
 * @text 変化率
 * @desc 価格の散らばり度合を設定します。大きい数値を設定すると散らばり度合が大きくなります。
 * @type number
 * @default 10
 * @min 0
 *
 * @arg change_rate_variable
 * @text 変化率の値を変数で指定する場合の変数ID
 * @desc 適用する変化率の値を変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addVariableNumber
 * @text 変数の値を価格に加算
 * @desc 価格に変数の値を加算します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 * @arg variable_id
 * @text 変数ID
 * @desc 参照する変数のID
 * @type variable
 *
 * @arg base_price
 * @text 基準価格
 * @desc ゲーム開始時点の価格です。
 * @type number
 * @min 1
 *
 * @arg proportional_constant
 * @text 比例定数
 * @desc 価格に加算する額の倍率を指定します。プレイ時間（時間）×この値が加算されます。
 * @type number
 * @default 3600
 * @min 0
 *
 *
 *
 * @command addPlayTime
 * @text プレイ時間を価格に加算
 * @desc 価格にプレイ時間を加算します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 * @arg base_price
 * @text 基準価格
 * @desc ゲーム開始時点の価格です。
 * @type number
 * @min 1
 *
 * @arg proportional_constant
 * @text 比例定数
 * @desc 価格に加算する額の倍率を指定します。プレイ時間（時間）×この値が加算されます。
 * @type number
 * @default 3600
 * @min 0
 *
 *
 *
 * @command addStepCount
 * @text 歩数を価格に加算
 * @desc 価格に歩数を加算します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 * @arg base_price
 * @text 基準価格
 * @desc ゲーム開始時点の価格です。
 * @type number
 * @min 1
 *
 * @arg proportional_constant
 * @text 比例定数
 * @desc 価格に加算する額の倍率を指定します。歩数×この値が加算されます。
 * @type number
 * @default 1
 * @min 0
 *
 *
 *
 * @command addBattleCount
 * @text 戦闘回数を価格に加算
 * @desc 価格に戦闘回数を加算します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 * @arg base_price
 * @text 基準価格
 * @desc ゲーム開始時点の価格です。
 * @type number
 * @min 1
 *
 * @arg proportional_constant
 * @text 比例定数
 * @desc 価格に加算する額の倍率を指定します。戦闘回数×この値が加算されます。
 * @type number
 * @default 1
 * @min 0
 *
 *
 *
 * @command addWinCount
 * @text 勝利回数を価格に加算
 * @desc 価格に勝利回数を加算します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 * @arg base_price
 * @text 基準価格
 * @desc ゲーム開始時点の価格です。
 * @type number
 * @min 1
 *
 * @arg proportional_constant
 * @text 比例定数
 * @desc 価格に加算する額の倍率を指定します。勝利回数×この値が加算されます。
 * @type number
 * @default 1
 * @min 0
 *
 *
 *
 * @command addEscapeCount
 * @text 逃走回数を価格に加算
 * @desc 価格に逃走回数を加算します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 * @arg base_price
 * @text 基準価格
 * @desc ゲーム開始時点の価格です。
 * @type number
 * @min 1
 *
 * @arg proportional_constant
 * @text 比例定数
 * @desc 価格に加算する額の倍率を指定します。逃走回数×この値が加算されます。
 * @type number
 * @default 1
 * @min 0
 *
 *
 *
 * @command doublePrice
 * @text 価格を2倍に
 * @desc 売価を購入価と同じにするために一時的に2倍にします。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 *
 *
 * @command halfPrice
 * @text 価格を半額に
 * @desc 売価を購入価と同じにするために一時的に2倍にしたものを戻します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムのID
 * @type item
 *
 *
 *
 * @command exceedPrice
 * @text 価格を限界以上に設定
 * @desc アイテムの価格をツクールデフォルトの最大値（999999G）を超えた額に設定します。
 *
 * @arg target_item_id
 * @text アイテムID
 * @desc 価格を変化させるアイテムID
 * @type item
 *
 * @arg exceed_price
 * @text 新価格
 * @desc 反映させる価格
 * @type number
 * @default 1000000
 * @min 1000000
 *
 *
 *
 */

(() => {
	'use strict';

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  //-----------------------------------------------------------------------------
  // PluginManager
  //

	PluginManager.registerCommand(pluginName, "executeUpdate", args => {

		let base_price = parseInt(args.base_price);
		let specification_type = args.specification_type;
		let change_rate = 10;

		if(specification_type === 'direct'){
			change_rate = parseInt(args.change_rate);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.change_rate_variable);
			change_rate = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
		}

		const update_price = base_price + base_price * generateRandomNumber() * change_rate * 0.01;

		$dataItems[args.target_item_id].price = Math.round(update_price);

	});



	PluginManager.registerCommand(pluginName, 'addVariableNumber', args => {

		$dataItems[args.target_item_id].price = parseInt(args.base_price) + (parseInt($gameVariables.value(args.variable_id)) * parseInt(args.proportional_constant));
	});



	PluginManager.registerCommand(pluginName, 'addPlayTime', args => {

		$dataItems[args.target_item_id].price = parseInt(args.base_price) + Math.round((parseInt($gameSystem.playtime()) / 3600) * parseInt(args.proportional_constant));
	});



	PluginManager.registerCommand(pluginName, 'addStepCount', args => {

		$dataItems[args.target_item_id].price = parseInt(args.base_price) + parseInt($gameParty.steps()) * parseInt(args.proportional_constant);
	});



	PluginManager.registerCommand(pluginName, 'addBattleCount', args => {

		$dataItems[args.target_item_id].price = parseInt(args.base_price) + parseInt($gameParty.battleCount()) * parseInt(args.proportional_constant);
	});



	PluginManager.registerCommand(pluginName, 'addWinCount', args => {

		$dataItems[args.target_item_id].price = parseInt(args.base_price) + parseInt($gameParty.winCount()) * parseInt(args.proportional_constant);
	});



	PluginManager.registerCommand(pluginName, 'addEscapeCount', args => {

		$dataItems[args.target_item_id].price = parseInt(args.base_price) + parseInt($gameParty.escapeCount()) * parseInt(args.proportional_constant);
	});



	PluginManager.registerCommand(pluginName, "doublePrice", args => {

		$dataItems[args.target_item_id].price = $dataItems[args.target_item_id].price * 2;

	});



	PluginManager.registerCommand(pluginName, "halfPrice", args => {

		$dataItems[args.target_item_id].price = Math.round($dataItems[args.target_item_id].price / 2);

	});



	PluginManager.registerCommand(pluginName, "exceedPrice", args => {

		$dataItems[args.target_item_id].price = args.exceed_price;

	});



	// 正規乱数生成
	function generateRandomNumber(){
		return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
	}


})();