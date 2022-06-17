/*:
* @target MZ
* @plugindesc 戦闘終了時にパーティの状態を表示するアレと経験値バー
* Ver 1.0.8
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help BattleendShowExpAndMoney.js
*
* 基本的にはデフォルトのシステム用に作られています。
* ターン制・タイムプログレス制両対応。
* （簡単な確認しかしてないけど）
*
* ＜注意＞
* プラグイン「全滅してもゲームオーバーにならない。」と併用するには
* プラグインリストでこのプラグインより後列に登録する必要があります。
* 順番が逆の場合、動作不良の原因になります。
* 軽くではありますが、併用動作確認済みです。
*
* 他、戦闘終了動作を変更するプラグインとの相性は悪いです。
* 順番を変えても駄目な場合は改造するなりしてくださいな。
* または「アレを有効にするかどうか」の設定を「いかんッ！」にしてください。
* その場合は経験値バー機能のみの使用になります。
*
* ＜アレ＞
* 戦闘終了時（勝利の場合）、
* 戦闘メンバーの経験値の状態とパーティの所持金を表示します。
* 表示タイミングは勝利メッセージを閉じた直後です。
* そのため、戦闘画面閉じるまでの決定操作が１回増えます。
*
* ＜メニューの簡易ステータスに経験値＞
* このほかに、メニュー画面の簡易ステータスに経験値を追加できます。
* スペースの都合上、メニュー画面にＴＰは表示できなくなります。
* 詳細ステータスや戦闘中では影響ありません。
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
* 全体的に力業でやってるので、改造はちょっと難しいかもしれません。
* 他プラグインとぶつかったりするかもしれません。
* その時は、その…。何とかがんばって。
*
* ＜履歴＞
* Ver 1.0.8
* ・ロンチプラグイン「全滅してもゲームオーバーにならない。」との併用に対応。
* （ついでに他の BattleManager.updateBattleEnd をいじくってる系プラグインに対応できたかも）
*
* Ver 1.0.7
* ・アレのＥＸＰ数値のぼやけを修正。
* ・アレのＥＸＰラベル文字のフォント指定の誤りを修正。
*
* Ver 1.0.6
* ・アレが出ているときの経験値ラベルの文字サイズが小さかったのを修正。
* ・レベルが最大なら１００％固定にして「ＭＡＸ」を表示するようにした。
*
* Ver 1.0.5
* ・メニュー画面での経験値表示を変更。（略称は半角２文字固定）
* ・ぼやけ表示を修正。
* ・このプラグインのメイン機能を無効にできるようになった。
* 　メニュー画面のＥＸＰ表示だけを使いたいときにどうぞ。
*
* Ver 1.0.4
* ・enable_endstatus設定がおかしかったので修正。
* ・当方作プラグイン「CrazyQvgaMZ.js（ＭＺをＱＶＧＡ沼に引きずり込もうとするアレ）」に対応。
* ・ステータス表示を有効にしている際、アレのＹ位置が自動的に変わるようにした。
*
* Ver 1.0.3
* ・とりあえずＭＩＴライセンス化。
* ・ＥＸＰ略称文字設定が２文字以下ならゲージサイズがいつものサイズになるようになった。
* 　（不格好ではなくなった）
*
* Ver 1.0.2
* ・「バトルの中断」と全滅に対応し忘れてたので対応。
* ・メソッド呼び出しミスでタイムプログレス系でいきなりエラー落ちしていたのを修正。
*
* Ver 1.0.1
* ・一部ローカル変数を初期化していなかった為、
* 　２回目以降の戦闘で処理が空ループになってしまい進まなくなっていたのを修正。
*
* Ver 1.0.0
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


* @param enable_battleend_show_exp_and_money
* @text アレを有効にするかどうか
* @desc 有効にすると、このプラグインのメイン機能を有効にします。メニュー画面のＥＸＰ表示だけ使いたいときは無効にします。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param enable_endstatus
* @text 下部のステータス画面を表示するかどうか
* @desc 有効にすると、アレを表示する際に下部パラメーターも一緒に表示します。
* @default false
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param enable_exp_for_mainmenu
* @text いつものあの画面に経験値表示するかどうか
* @desc 有効にすると、ＴＰ表示の代わりにメニュー画面の簡易ステータスに経験値欄が追加されます。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！
*/
(() => {
	'use strict';
	//-----------------------------------------------------------------------------
	//
	//
	// パラメータをほじくるときに使います

	let plugin_params = PluginManager.parameters("BattleendShowExpAndMoney");
	//設定が無効になっているときはデフォルト値
	if(plugin_params["enable_battleend_show_exp_and_money"] == undefined){plugin_params["enable_battleend_show_exp_and_money"] == "true";}
	if(plugin_params["enable_exp_for_mainmenu"] == undefined){plugin_params["enable_exp_for_mainmenu"] == "true";}
	if(plugin_params["enable_endstatus"] === undefined){plugin_params["enable_endstatus"] = "false";}

	//-----------------------------------------------------------------------------
	// BattleManager
	//
	// バトルの進行状況を管理する静的クラスです。

	const old_battle_manager_init_members = BattleManager.initMembers;
	BattleManager.initMembers = function() {
		old_battle_manager_init_members.apply(this, arguments);
		this._showResult = 0;
	};
	
	BattleManager.setNowExpAndMoneyWindow = function(window){
		this._nowExpAndMoneyWindow = window;
	};

	BattleManager.setStatusWindow = function(window){
		this._statusWindow = window;
	};

	const old_battle_manager_update = BattleManager.update;
	BattleManager.update = function(timeActive) {
		if(plugin_params["enable_battleend_show_exp_and_money"] === "false"){
			//いつもの動作
			old_battle_manager_update.apply(this, arguments);
		}else{
			//アレを出すための動作
			if (!this.isBusy() && (this._nowExpAndMoneyWindow.openness < 255) && !this.updateEvent()) {
				this.updatePhase(timeActive);
			}
			if (this.isTpb()) {
				this.updateTpbInput();
			}
			if(this._showResult){
				if (!this.isBusy()){
					this.updateShowNowExpAndMoney();
				}
			}
		}
	};

	//だいぶ力業
	const old_battle_manager_update_battle_end = BattleManager.updateBattleEnd;
	BattleManager.updateBattleEnd = function() {
		if(plugin_params["enable_battleend_show_exp_and_money"] === "false"){
			//こちらは完全にいつもの動作
			old_battle_manager_update_battle_end.apply(this, arguments);
		}else{
			//アレを出すための動作
			if (this.isBattleTest()) {
				//戦闘テスト
				if(this._showResult == 3){
					old_battle_manager_update_battle_end.apply(this, arguments);
				}
			} else if (!this._escaped && $gameParty.isAllDead()) {
				//撤退成功　か　敗退　こちらも完全にいつもの動作
				old_battle_manager_update_battle_end.apply(this, arguments);
			} else {
				// 勝った
				if(this._showResult == 3){
					old_battle_manager_update_battle_end.apply(this, arguments);
				}
			}
			this._phase = "";
		}
	};

	BattleManager.updateShowNowExpAndMoney = function() {
		if(this._showResult === 1){
			this._nowExpAndMoneyWindow.refresh();
			this._nowExpAndMoneyWindow.open();
			this._nowExpAndMoneyWindow.show();
			this._nowExpAndMoneyWindow.activate();
			if(plugin_params["enable_endstatus"] == "true"){
				this._statusWindow.deselect();
				this._statusWindow.show();
				this._statusWindow.open();
			}else{
				this._statusWindow.hide();
			}
			if(this._nowExpAndMoneyWindow.isOpenAndActive()){
				if(Input.isTriggered("ok") || TouchInput.isTriggered()){
					this._nowExpAndMoneyWindow.openness--;	//力業
					this._showResult = 2;
				}
			}
		}else if(this._showResult === 2){
			//これで戦闘シーンの終了
			this._showResult = 3;
			this.endBattle(0);
		}
	}

	BattleManager.processVictory = function() {
		$gameParty.removeBattleStates();
		$gameParty.performVictory();
		this.playVictoryMe();
		this.replayBgmAndBgs();
		this.makeRewards();
		this.displayVictoryMessage();
		this.displayRewards();
		this.gainRewards();
		this._showResult = 1;
		this._phase = "battleEnd";
	};

	const old_battle_manager_process_abort = BattleManager.processAbort;
	BattleManager.processAbort = function() {
		old_battle_manager_process_abort.apply(this, arguments);
		if(plugin_params["enable_battleend_show_exp_and_money"] === "true"){
			this._showResult = 3;
		}
	};

	const old_battle_manager_process_defeat = BattleManager.processDefeat;
	BattleManager.processDefeat = function() {
		old_battle_manager_process_defeat.apply(this, arguments);
		if(plugin_params["enable_battleend_show_exp_and_money"] === "true"){
			this._showResult = 3;
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Battle
	//
	// バトル画面のシーンクラスです。

	const old_scene_battle_initialize = Scene_Battle.prototype.initialize;
	Scene_Battle.prototype.initialize = function() {
		old_scene_battle_initialize.apply(this, arguments);
	};

	Scene_Battle.prototype.stop = function() {
		Scene_Message.prototype.stop.call(this);
		if (this.needsSlowFadeOut()) {
			this.startFadeOut(this.slowFadeSpeed(), false);
		} else {
			this.startFadeOut(this.fadeSpeed(), false);
		}
		this._nowExpAndMoneyWindow.close();
		this._statusWindow.close();
		this._partyCommandWindow.close();
		this._actorCommandWindow.close();
	};

	const old_scene_battle_create_all_windows = Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		old_scene_battle_create_all_windows.apply(this, arguments);
		BattleManager.setStatusWindow(this._statusWindow);
		this.createExpAndMoneyWindow();
	};

	const old_scene_battle_create_display_objects = Scene_Battle.prototype.createDisplayObjects;
	Scene_Battle.prototype.createDisplayObjects = function() {
		old_scene_battle_create_display_objects.apply(this, arguments);
		BattleManager.setNowExpAndMoneyWindow(this._nowExpAndMoneyWindow);
	};

	Scene_Battle.prototype.createExpAndMoneyWindow = function() {
		const rect = this.nowExpAndMoneyWindowRect.apply(this, arguments);
		this._nowExpAndMoneyWindow = new Window_NowExpAndMoney(rect);
		this._nowExpAndMoneyWindow.hide();
		this.addWindow(this._nowExpAndMoneyWindow);
	};

	Scene_Battle.prototype.updateInputWindowVisibility = function() {
		if ($gameMessage.isBusy() || (BattleManager._showResult)) {
			this.closeCommandWindows();
			this.hideSubInputWindows();
		} else if (this.needsInputWindowChange()) {
			this.changeInputWindow();
		}
	};

	Scene_Battle.prototype.nowExpAndMoneyWindowRect = function() {
		const ww = parseInt(Graphics.boxWidth * 0.55, 10);
		const wh = this.calcWindowHeight($gameParty.members().length + 1, false);
		const wx = (Graphics.boxWidth >> 1) - (ww >> 1);
		let wy = (Graphics.boxHeight >> 1) - (wh >> 1);
		if(plugin_params["enable_endstatus"] === "true"){
			wy -= (Graphics.height / 5);
		}
		return new Rectangle(wx, wy, ww, wh);
	};

	//-----------------------------------------------------------------------------
	// Window_StatusBase
	//
	// アクターの状態を表示するためのウィンドウのスーパークラスです。

	Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {
		this.placeGauge(actor, "hp", x, y);
		this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight());

		//経験値
		if(SceneManager._scene.constructor === Scene_Menu){
			//メニューではＴＰと経験値どっちか一つを表示（経験値優先）
			if(plugin_params["enable_exp_for_mainmenu"] == "true"){
				//ここしか使わないので直
				const key = "actor%1-gauge-%2".format(actor.actorId(), "exp");
				const sprite = this.createInnerSprite(key, Sprite_Gauge_Exp);
				sprite.setup(actor, "exp");
				sprite.move(x, y + this.gaugeLineHeight() * 2);
				sprite.show();
			}else{
				//TP
				if ($dataSystem.optDisplayTp) {
					this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight() * 2);
				}
			}
		}else{
			//TP
			if ($dataSystem.optDisplayTp) {
				this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight() * 2);
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Window_NowExpAndMoney
	//
	// 戦闘参加中メンバーの経験値とパーティ所持金の状態を表示します。
	
	function Window_NowExpAndMoney() {
		this.initialize(...arguments);
	}
	
	Window_NowExpAndMoney.prototype = Object.create(Window_StatusBase.prototype);
	Window_NowExpAndMoney.prototype.constructor = Window_NowExpAndMoney;
	
	Window_NowExpAndMoney.prototype.initialize = function(rect) {
		Window_StatusBase.prototype.initialize.call(this, rect);
		this.openness = 0;
		this.refresh();
	};

	/*Window_NowExpAndMoney.prototype.update = function() {
		Window_StatusBase.prototype.update.call(this);
	}*/
	
	Window_NowExpAndMoney.prototype.isBusy = function() {
		return this.openness > 0;
	}

	Window_NowExpAndMoney.prototype.colSpacing = function() {
		return 0;
	};
	
	Window_NowExpAndMoney.prototype.refresh = function() {
		const rate_x = Graphics.width / 816;
		const rate_y = Graphics.height / 624;
		const rect = this.itemLineRect(0);
		const x = parseInt(8 * rate_x);
		const y = parseInt(8 * rate_y);
		const width = rect.width;
		let members = $gameParty.members();
		this.contents.clear();
		let i = 0;
		let actor = null;
		let ox = x;
		let oy = y;
		for(i = 0; i < members.length; i++){
			actor = members[i];
			ox = x;
			oy = i * this.lineHeight();
			this.placeActorName(actor, ox, oy);
			ox += parseInt(144 * rate_x);
			this.drawActorLevel(actor, ox, oy - Math.floor(4.5 * rate_y));	//オフセットズレてるので（何故かは知らぬ…）
			ox += parseInt(102 * rate_x);
			this.placeGauge(actor, "exp", ox, oy);
		}
		oy = i * this.lineHeight();
		this.drawCurrencyValue(this.goldValue(), this.currencyUnit(), x, oy, width);
	};

	Window_NowExpAndMoney.prototype.placeGauge = function(actor, type, x, y) {
		const key = "actor%1-gauge-%2".format(actor.actorId(), type);
		const sprite = this.createInnerSprite(key, Sprite_Gauge_Exp_Long);
		sprite.setup(actor, type);
		sprite.move(x, y);
		sprite.show();
	};
	
	Window_NowExpAndMoney.prototype.goldValue = function() {
		return $gameParty.gold();
	};
	
	Window_NowExpAndMoney.prototype.currencyUnit = function() {
		return TextManager.currencyUnit;
	};
	
	Window_NowExpAndMoney.prototype.open = function() {
		this.refresh();
		Window_Selectable.prototype.open.call(this);
	};

	Window_NowExpAndMoney.prototype.drawActorLevel = function(actor, x, y) {
		const rate_x = Graphics.width / 816;
		//元よりちょっと小さい
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(TextManager.levelA, x, y, parseInt(40 * rate_x));
		this.resetTextColor();
		this.drawText(actor.level, x + parseInt(52 * rate_x), y, parseInt(36 * rate_x), "right");
	};

	//-----------------------------------------------------------------------------
	// Sprite_Gauge_Exp
	//
	// ステータスゲージを表示するためのスプライトです。
	function Sprite_Gauge_Exp() {
		this.initialize(...arguments);
	}

	Sprite_Gauge_Exp.prototype = Object.create(Sprite_Gauge.prototype);
	Sprite_Gauge_Exp.prototype.constructor = Sprite_Gauge_Exp;

	Sprite_Gauge_Exp.prototype.initialize = function() {
		Sprite.prototype.initialize.call(this);
		this.initMembers();
		this.createBitmap();
	};

	const old_sprite_init_members = Sprite_Gauge_Exp.prototype.initMembers;
	Sprite_Gauge.prototype.initMembers = function(width) {
		old_sprite_init_members;
		this._width = width;
	};

	const old_sprite_gauge_setup = Sprite_Gauge_Exp.prototype.setup;
	Sprite_Gauge_Exp.prototype.setup = function(battler, statusType) {
		old_sprite_gauge_setup.apply(this, arguments);
	};

	/*Sprite_Gauge_Exp.prototype.gaugeX = function() {
		const rate_x = Graphics.width / 816;
		console.log(this.bitmap.measureTextWidth(this.label()));
		return (this.bitmap.measureTextWidth(this.label()) < 38 ? 30 : 42) * rate_x;	//文字幅が３８ドット（全角１文字分・半角２文字分）以下ならいつもの位置
	};*/

	/*Sprite_Gauge_Exp.prototype.bitmapWidth = function() {
		const rate_x = Graphics.width / 816;
		return 128 * rate_x;
	};*/

	Sprite_Gauge_Exp.prototype.currentValue = function(flortmode = false) {
		if (this._battler) {
			//const now_exp = this._battler.currentExp() - this._battler.currentLevelExp();	//現在ＬＶの経験値閾値を０としてそこから貯まった経験値
			let sourceValue = parseFloat(((this._battler.currentExp() - this._battler.currentLevelExp()) /
							 (this._battler.nextLevelExp() - this._battler.currentLevelExp())) * 100).toFixed(2);	//貯まった割合
			if(this._battler.isMaxLevel()){
				sourceValue = 100.0;	//もう上がらないなら満タンにする
			}
			if(flortmode){
				return sourceValue;
			}else{
				return parseInt(sourceValue, 10);
			}
		}
		return NaN;
	};

	Sprite_Gauge_Exp.prototype.currentMaxValue = function() {
		if (this._battler) {
			//const now_exp = this._battler.nextLevelExp() - this._battler.currentLevelExp();	//次までに必要な経験値
			return 100.00;	//割合の場合はこれ
		}
		return NaN;
	};

	Sprite_Gauge_Exp.prototype.label = function() {
		return TextManager.expA;
	};

	Sprite_Gauge_Exp.prototype.gaugeColor1 = function() {
		return ColorManager.expGaugeColor1();
	};
	
	Sprite_Gauge_Exp.prototype.gaugeColor2 = function() {
		return ColorManager.expGaugeColor2();
	};

	Sprite_Gauge_Exp.prototype.drawValue = function() {
		const currentValue = this.currentValue(true);
		const width = this.bitmapWidth();
		const height = this.bitmapHeight();
		this.setupValueFont();
		if(this._battler.isMaxLevel()){
			this.bitmap.drawText("MAX", 0, 0, width, height, "right");
		}else{
			this.bitmap.drawText(currentValue + "%", 0, 0, width, height, "right");
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_Gauge_Exp_Long
	//
	// 長いステータスゲージを表示するためのスプライトです。
	function Sprite_Gauge_Exp_Long() {
		this.initialize(...arguments);
	}

	Sprite_Gauge_Exp_Long.prototype = Object.create(Sprite_Gauge_Exp.prototype);
	Sprite_Gauge_Exp_Long.prototype.constructor = Sprite_Gauge_Exp_Long;
	
	Sprite_Gauge_Exp_Long.prototype.setup = function(battler, statusType) {
		this._battler = battler;
		this._statusType = statusType;
		this._value = this.currentValue();
		this._maxValue = this.currentMaxValue();
		this.updateBitmap();
	};

	Sprite_Gauge_Exp_Long.prototype.bitmapWidth = function() {
		const rate_x = (Graphics.width / 816);
		return parseInt(160 * rate_x);
	};

	Sprite_Gauge_Exp_Long.prototype.labelFontFace = function() {
		return $gameSystem.mainFontFace();
	};

	Sprite_Gauge_Exp_Long.prototype.labelFontSize = function() {
		return $gameSystem.mainFontSize();
	};
	
	//-----------------------------------------------------------------------------
	// ColorManager
	//
	// ウィンドウの色を扱う静的クラスです。

	ColorManager.expGaugeColor1 = function() {
		return this.textColor(6);
	};
	
	ColorManager.expGaugeColor2 = function() {
		return this.textColor(14);
	};
})();
