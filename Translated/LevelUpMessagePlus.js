/*:
* @target MZ
* @plugindesc レベルアップした時に表示するアレ
* Ver 1.0.1
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help LevelUpMessagePlus.js
* 
* １ポイントの影響力が強いほど気になるパラメータ。
* レベルアップした時にどのくらい成長したのか気になった時に使います。
*
* ＜アレ＞
* レベルアップした際にどのくらいパラメータが上がったか通知するプラグインです。
* 「力 が 1 上がった！」など。
* 一項目一行です。
*
* 表示文字列は一部設定変更できます。
*
* レベルダウン時も一応組み込んでますが、
* そもそもレベルアップ時にしか表示されないので意味はないです。
*
* 複数レベルアップにも対応しています。
* その場合は合算された値が表示されます。
*
* このプラグインの副作用で
* 文章中に「\LEVELUP」が入っていると音が鳴るようになっちゃいます。
*
* ＜他＞
* プラグインコマンドはありません。
*
* 設定変更して戦闘テストする場合、
* 戦闘テスト前にセーブしないと反映されませんのでご注意ください。
*
* 無保証。改造自由。
* 利用も商用・無償・年齢区分にかかわらず自由。
* ライセンスはＭＩＴでたのんます。
* 改造する時このヘルプの下部にあるＭＩＴに関する文章をいじくらなければＯＫ。
* 
* ＜履歴＞
* Ver 1.0.1(21/04/05)
* ・レベルアップＳＥ設定機能を追加。
* ・パラメータ名と変化値に色を付けることが出来るようになった。
*
* Ver 1.0.0(20/09/15)
* ・一応完成。
*
* ＜ＭＩＴライセンス条文＞
* MIT License
* 
* Copyright (c) 2020 木下英一
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.

* @param postposition_string
* @text 助詞文字列
* @desc 「力　が　ＸＸ上がった！」の「が」の部分です。
* @default が
* @type string

* @param up_string
* @text パラメータが上がったのを表す文字列
* @desc 「力　が　ＸＸ上がった！」の「上がった！」の部分です。
* @default 上がった！
* @type string

* @param down_string
* @text パラメータが下がったのを表す文字列
* @desc 「力　が　ＸＸ下がった！」の「下がった！」の部分です。
* @default 下がった！
* @type string

* @param show_comparison_value
* @text 比較数値を表示するかどうか
* @desc レベル前後の比較値を「(12 >> 15)」のような形で末尾に加えます。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param coloring_param_name
* @text パラメータ名につける色
* @desc パラメータ名に指定した色番号で色をつけます。「ＸＸ　が　ＹＹ　上がった！」のＸＸの部分です。値は0～31までです。
* @default 1
* @type number

* @param coloring_param_value_name
* @text 変化パラメータ数値につける色
* @desc 変化数パラメータ名に指定した色番号で色をつけます。「ＸＸ　が　ＹＹ　上がった！」のＹＹの部分です。値は0～31までです。
* @default 2
* @type number

* @param levelup_se
* @text レベルアップＳＥ
* @desc レベルアップする際に再生されるＳＥです。無指定で無効になります。
* @default audio/se
* @type file
*/
(() => {
	'use strict';
	//-----------------------------------------------------------------------------
	//
	//
	// パラメータをほじくるときに使います

	let plugin_params = PluginManager.parameters("LevelUpMessagePlus");
	if(plugin_params["postposition_string"] === undefined)plugin_params["postposition_string"] = "が";
	if(plugin_params["up_string"] === undefined)plugin_params["up_string"] = "上がった！";
	if(plugin_params["down_string"] === undefined)plugin_params["down_string"] = "下がってしまった！";
	if(plugin_params["show_comparison_value"] === undefined)plugin_params["show_comparison_value"] = "true";
	if((plugin_params["coloring_param_name"] === undefined) || (plugin_params["coloring_param_name"] === ""))
		plugin_params["coloring_param_name"] = "1";
	if(parseInt(plugin_params["coloring_param_name"], 10) < 0)
		plugin_params["coloring_param_name"] = "0";
	if(parseInt(plugin_params["coloring_param_name"], 10) > 31)
		plugin_params["coloring_param_name"] = "31";
	if((plugin_params["coloring_param_value_name"] === undefined) || (plugin_params["coloring_param_value_name"] === ""))
		plugin_params["coloring_param_value_name"] = "2";
	if(parseInt(plugin_params["coloring_param_value_name"], 10) < 0)
		plugin_params["coloring_param_value_name"] = "0";
	if(parseInt(plugin_params["coloring_param_value_name"], 10) > 31)
		plugin_params["coloring_param_value_name"] = "31";
	if(plugin_params["levelup_se"] === undefined)plugin_params["levelup_se"] = "";


	//-----------------------------------------------------------------------------
	// Window_Base
	//
	// The superclass of all windows within the game.

	const old_process_escape_character = Window_Base.prototype.processEscapeCharacter;
	Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		old_process_escape_character.apply(this, arguments);
		switch (code) {
			case "LEVELUP":
				this.processPlaySE();
				break;
		}
	};

	Window_Base.prototype.processPlaySE = function() {
		const params = {
			name: plugin_params["levelup_se"].split("/")[2],
			pan: 0,
			pitch: 100,
			volume: 90
		};
		if(plugin_params["levelup_se"] !== ""){
			AudioManager.playSe(params, 0);
		}
	};
	

	//-----------------------------------------------------------------------------
	// Game_Actor
	//
	// The game object class for an actor.

	Game_Actor.prototype.paramBase = function(paramId) {
		return this.currentClass().params[paramId][this._level];
	};

	//指定レベルのパラメータを得ます
	Game_Actor.prototype.ParamOfCurrentLevel = function(level, paramId) {
		return this.currentClass().params[paramId][level];
	};

	Game_Actor.prototype.changeExp = function(exp, show) {
		this._oldLV = this._level;
		this._prevParams = [];
		this._addedParams = [];
		for(let i = 0; i < this.currentClass().params.length; i++){
			this._prevParams.push(this.ParamOfCurrentLevel(this._level, i));
			this._addedParams.push(0);
		}

		this._exp[this._classId] = Math.max(exp, 0);
		const lastLevel = this._level;
		const lastSkills = this.skills();
		while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
			this.levelUp();
			this._nowParams = [];
			for(let i = 0; i < this.currentClass().params.length; i++){
				this._nowParams.push(this.ParamOfCurrentLevel(this._level, i));
				this._addedParams[i] += (this.ParamOfCurrentLevel(this._level, i) - this.ParamOfCurrentLevel(this._level - 1, i));
			}
		}
		while (this.currentExp() < this.currentLevelExp()) {
			this.levelDown();
			this._nowParams = [];
			for(let i = 0; i < this.currentClass().params.length; i++){
				this._nowParams.push(this.ParamOfCurrentLevel(this._level, i));
				this._addedParams[i] += (this.ParamOfCurrentLevel(this._level, i) - this.ParamOfCurrentLevel(this._level + 1, i));
			}
		}
		if (show && this._level > lastLevel) {
			this.displayLevelUp(this.findNewSkills(lastSkills));
		}
		this.refresh();
	};

	Game_Actor.prototype.levelUp = function() {
		this._level++;
		for (const learning of this.currentClass().learnings) {
			if (learning.level === this._level) {
				this.learnSkill(learning.skillId);
			}
		}
	};

	Game_Actor.prototype.displayLevelUp = function(newSkills) {
		const text = (plugin_params["levelup_se"] !== "" ? "\\LEVELUP" : "") + TextManager.levelUp.format(
			this._name,
			TextManager.level,
			this._level
		);
		$gameMessage.newPage();
		$gameMessage.add(text);
		let color_1 = "\\c[" + plugin_params["coloring_param_name"] + "]";
		let color_2 = "\\c[" + plugin_params["coloring_param_value_name"] +"]";
		for(let i = 0; i < this._addedParams.length; i++){
			if(this._addedParams[i] > 0){
				//やったぜ
				let upText = color_1 + TextManager.param(i) + "\\c[0] " + plugin_params["postposition_string"] + " " + color_2 + this._addedParams[i] + "\\c[0] " + plugin_params["up_string"];
				if(plugin_params["show_comparison_value"] === "true"){
					upText += "(" + this._prevParams[i] + " >> " + this._nowParams[i] + ")";
				}
				$gameMessage.add(upText);
			}else if(this._addedParams[i] < 0){
				//なんてこった
				let downText = color_1 + TextManager.param(i) + "\\c[0] " + plugin_params["postposition_string"] + " " + color_2 + Math.abs(this._addedParams[i]) + "\\c[0] " + plugin_params["down_string"];
				if(plugin_params["show_comparison_value"] === "true"){
					downText += "(" + this._prevParams[i] + " >> " + this._nowParams[i] + ")";
				}
				$gameMessage.add(downText);
			}
		}
		for (const skill of newSkills) {
			$gameMessage.add(TextManager.obtainSkill.format(skill.name));
		}
	};
})();
