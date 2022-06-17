/*:
 * @plugindesc Gives you more customization over a Skill's or Item's "Repeat" functionality.
 * @author SumRndmDde
 *
 * @param Minimum Repeat
 * @desc The lowest repeat count that is allowed in the game. 
 * Any count lower than this will be set to this.
 * @default 1
 *
 * @param Maximum Repeat
 * @desc The highest repeat count that is allowed in the game. 
 * Any count highest than this will be set to this.
 * @default 99
 *
 * @help
 *
 * Repeat Upgrade
 * Version 1.00
 * SumRndmDde
 *
 * 
 * Normally, RPG Maker MV allows you to set a constant number between 
 * 1 and 9 as a Skill's or Item's repeat count. 
 *
 * Using this Plugin, you can surpass that limit and even create custom
 * formulas for a Skill's or Item's repeat count.
 *
 * ==========================================================================
 * Skill and Item Notetags
 * ==========================================================================
 *
 *  <Repeat: x>
 *
 * This simply allows you to input any repeat count.
 * For example, if you wanted a Skill/Item to repeat 20 times, you would do:
 *
 *  <Repeat: 20>
 *
 *
 * ==========================================================================
 * Repeat Formula
 * ==========================================================================
 *
 * You can also create a formula.
 * Within the formula, you can use:
 *  a = The User
 *  v = Game Variables
 *  s = Game Switches
 *  item = The Item
 *
 * So, for example, you could do:
 * 
 *  <Repeat: a.level>
 *  (Sets the repeat count to the level of the user)
 *
 *  <Repeat: (a.atk / 10) + 1>
 *  (Adds 1 repeat for every 10 ATK the user has)
 *
 *  <Repeat: Math.randomInt(4) + 2>
 *  (Sets the repeat to a number between 2 and 5 inclusive)
 *
 * Take note of the fact that the resulting number will always round down
 * to the closest integer value.
 *  
 *
 * ==========================================================================
 * Long Repeat Formula
 * ==========================================================================
 *
 *  <Repeat>
 *  </Repeat>
 *
 * This is an expansion on the notetag above.
 * Within the two notetags, you can use JavaScript code to create an 
 * expanded formula for your Skill's or Item's repeat count.
 * 
 * To set the final repeat count, set the value you wish to use to the
 * variable "result".
 *
 * For example:
 *
 *  <Repeat>
 *  result = 10;
 *  </Repeat>
 *
 * This would set the repeat count to 10.
 *
 * Here are some more examples:
 *
 *  <Repeat>
 *  var temp = Math.random(3);
 *  temp = temp + 10;
 *  result = temp;
 *  </Repeat>
 *  (Sets the repeat to a random number between 10 and 12)
 *
 *  <Repeat>
 *  var temp = v[2];
 *  temp += a.level;
 *  result = temp;
 *  </Repeat>
 *  (Sets the repeat to the value of Game Variable 2 plus the user's level)
 *  
 *
 * ==========================================================================
 *  End of Help File
 * ==========================================================================
 * 
 * Welcome to the bottom of the Help file.
 *
 *
 * Thanks for reading!
 * If you have questions, or if you enjoyed this Plugin, please check
 * out my YouTube channel!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * Until next time,
 *   ~ SumRndmDde
 */
/*:ja
 * @target MV MZ
 * @plugindesc ツクールの制限を超えて、スキルやアイテムの連続回数を数値や式で決定できます。
 * @author SumRndmDde
 *
 * @param Minimum Repeat
 * @text 連続回数の最低値
 * @desc ゲーム内で許可されている最低の連続回数。
 * これより低い回数はこれに設定されます。
 * @default 1
 *
 * @param Maximum Repeat
 * @text 連続回数の最大値
 * @desc ゲーム内で許可されている最高の連続回数。
 * これよりも高い回数はこれに設定されます。
 * @default 99
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン: http://sumrndm.site/repeat-upgrade/
 *
 *
 * Repeat Upgrade
 * Version 1.00
 * SumRndmDde
 *
 *
 * 通常、RPGメーカーMVでは、
 * スキルやアイテムの連続回数を1～9の間の定数で設定することができます。
 * 本プラグインを使用することで、その制限を超えて、
 * スキルやアイテムの連続回数を数値や式で決定できます。
 *
 *
 * ==========================================================================
 *  スキルとアイテムのメモタグ
 * ==========================================================================
 *
 *  <Repeat: x>
 * これは単純に任意の連続回数を入力することができます。
 * 例えば、あるスキル/アイテムを20回連続回数させたい場合、次のようにします。
 *
 *  <Repeat: 20>
 *
 *
 * ==========================================================================
 *  連続回数式
 * ==========================================================================
 *
 * 式を作成することもできます。
 * 式の中では
 *  a = 使用者
 *  v = 変数
 *  s = スイッチ
 *  item = アイテム
 *
 * 例:
 *
 *  <Repeat: a.level>
 *  (連続回数を使用者のレベルに合わせて設定)
 *
 *  <Repeat: (a.atk / 10) + 1>
 *  (使用者のATKが10回上がる毎に1回の連続回数を追加)
 *
 *  <Repeat: Math.randomInt(4) + 2>
 *  連続回数を 2～5の間の数値に設定します。
 *
 * 結果として得られる数値は、
 * 常に最も近い整数値に切り捨てられる点に注意してください。
 *
 *
 * ==========================================================================
 *  ロング連続回数式
 * ==========================================================================
 *
 *  <Repeat>
 *  </Repeat>
 *
 * 上記のメモタグを拡張したものです。
 * 2つのメモタグの中で、
 * JavaScriptコードを使用して、
 * スキルやアイテムの連続回数の拡張式を作成することができます。
 * 最終的な連続回数を設定するには、
 * 変数'result'に使用したい値を設定してください。
 *
 * 例:
 *
 *  <Repeat>
 *  result = 10;
 *  </Repeat>
 *
 * これにより、繰り返し回数を10に設定することができます。
 *
 * 他にもいくつかの例があります。
 *
 *  <Repeat>
 *  var temp = Math.random(3);
 *  temp = temp + 10;
 *  result = temp;
 *  </Repeat>
 *  連続回数を10～12の間の乱数に設定します。
 *
 *  <Repeat>
 *  var temp = v[2];
 *  temp += a.level;
 *  result = temp;
 *  </Repeat>
 *  連続回数を変数2の値にユーザのレベルを加えた値に設定します。
 *
 *
 * ==========================================================================
 *  ヘルプファイルの終わり
 * ==========================================================================
 *
 * ヘルプファイルの終わりへようこそ。
 *
 * 読んでくれてありがとう!
 * 質問があったり、このプラグインを楽しめたら、
 * 私のYouTubeチャンネルを登録してください!!
 *
 * https://www.youtube.com/c/SumRndmDde
 *
 *
 * 次の機会まで
 *   ~ SumRndmDde
 */

var SRD = SRD || {};
SRD.RepeatUpgrade = SRD.RepeatUpgrade || {};

var Imported = Imported || {};
Imported["SumRndmDde Repeat Upgrade"] = true;

(function (_) {

	_.loadNotetags = function (data) {
		var repeat = /<\s*Repeat\s*:\s*(.*)>/im;
		var repeatMore = /<\s*Repeat\s*>([\d\D\n\r]*)<\/\s*Repeat\s*>/im;
		for (var i = 1; i < data.length; i++) {
			if (data[i].note.match(repeat)) data[i].ru_repeatCount = RegExp.$1;
			if (data[i].note.match(repeatMore)) data[i].ru_repeatCountMore = RegExp.$1;
		}
	};

	var notetagsLoaded = false;
	var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function () {
		if (!_DataManager_isDatabaseLoaded.call(this)) return false;
		if (!notetagsLoaded) {
			_.loadNotetags($dataSkills);
			_.loadNotetags($dataItems);
			notetagsLoaded = true;
		}
		return true;
	};

	var _Game_Action_initialize = Game_Action.prototype.initialize;
	Game_Action.prototype.initialize = function (subject, forcing) {
		_Game_Action_initialize.call(this, subject, forcing);
		this._numberOfRepeats = null;
	};

	var _Game_Action_numRepeats = Game_Action.prototype.numRepeats;
	Game_Action.prototype.initializeRepeats = function () {
		var a = this.subject();
		var v = $gameVariables._data;
		var s = $gameSwitches._data;
		var item = this.item();
		if (item.ru_repeatCountMore) {
			var result = _Game_Action_numRepeats.call(this);
			eval(item.ru_repeatCountMore);
			return Math.floor(result);
		} else if (item.ru_repeatCount) {
			return Math.floor(eval(item.ru_repeatCount));
		}
		return _Game_Action_numRepeats.call(this);
	};

	Game_Action.prototype.numRepeats = function () {
		if (this._numberOfRepeats === null) {
			this._numberOfRepeats = this.initializeRepeats();
		}
		return this._numberOfRepeats;
	};

})(SRD.RepeatUpgrade);