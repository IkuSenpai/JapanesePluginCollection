/*:
* @target MZ
* @plugindesc デバッグ中に敵のパラメータを見たくなったら使うアレ
* Ver 1.0.1
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help LooAtEnemyStatusForDebug.js
*
* 基本的にはデフォルトのシステム用に作られています。
*
* ＜アレ＞
* デバッグプレイでの戦闘中、敵のＨＰ・ＭＰ・ＴＰの状態を表示します。
* ＬボタンとＲボタン押しながらＸボタンで切り替えできます。
* キーボードならＱキーとＷキー押しながらＳｈｉｆｔキーです。
* ＱとＷの代わりにページダウン・ページアップも使えます。
*
* このオンオフの状態はセーブデータに含まれません。
*
* フォントに関しての処理は「ずぼら」にできてます。
* 普段使う分にはフォントがヘンテコな状態になったりはしないと思います。
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
* Ver 1.0.1
* ・とりあえずＭＩＴライセンス化。
*
* Ver 1.0.0
* ・完成。
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

* @param enable_flag
* @text デバッグ時に有効にして開始するかどうか
* @desc これを有効にすると、デバッグプレイ開始時に敵データ表示を有効にした状態で開始するかどうかを指定します。
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

	//とくに無いです。
	let plugin_params = PluginManager.parameters("LooAtEnemyHPForDebug");

	//-----------------------------------------------------------------------------
	// Game_Temp
	//
	// セーブデータに含まれない一時データ用のゲームオブジェクトクラスです。
	
	const old_game_temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		old_game_temp_initialize.apply(this, arguments);
	};

	//-----------------------------------------------------------------------------
	// BattleManager
	//
	// バトルの進行状況を管理する静的クラスです。

	BattleManager.setup = function(troopId, canEscape, canLose) {
		this.initMembers();
		this._canEscape = canEscape;
		this._canLose = canLose;
		$gameTroop.setup(troopId);
		$gameScreen.onBattleStart();
		this.makeEscapeRatio();
		if($gameTemp.isPlaytest()){
			$gameTemp._showEnemyData = plugin_params["enable_flag"] == "true";
			if(plugin_params["enable_flag"] == undefined){
				$gameTemp._showEnemyData = true;
			}
		}
	};

	const old_battle_manager_update = BattleManager.update;
	BattleManager.update = function(timeActive) {
		old_battle_manager_update.apply(this, arguments);
		//ＬＲ押しながらＸボタン（Ｓｈｉｆｔ）で切り替え
		if($gameTemp.isPlaytest()){
			if(Input.isPressed("pageup") && Input.isPressed("pagedown") && Input.isTriggered("shift")){
				SoundManager.playOk();
				$gameTemp._showEnemyData = !$gameTemp._showEnemyData;
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_Enemy
	//
	// 敵を表示するためのスプライトです。

	const old_sprite_enemy_init_members = Sprite_Enemy.prototype.initMembers;
	Sprite_Enemy.prototype.initMembers = function() {
		old_sprite_enemy_init_members.apply(this, arguments);

		//めんどくさいのでここでやる
		this._debug_hp_sprite = new Sprite(new Bitmap(128, 80));
		this.addChild(this._debug_hp_sprite);
		this._debug_hp_sprite.move(this._debug_hp_sprite.x - 64, this._debug_hp_sprite.y - 80);
	};

	Sprite_Enemy.prototype.update = function() {
		Sprite_Battler.prototype.update.call(this);
		if (this._enemy) {
			this.updateEffect();
			this.updateStateSprite();
			if($gameTemp.isPlaytest()){
				this.updateDebugHPSprite();
			}
		}
	};

	Sprite_Enemy.prototype.updateDebugHPSprite = function() {
		const width = this._debug_hp_sprite.bitmap.width;
		const height = this._debug_hp_sprite.bitmap.height;
		this._debug_hp_sprite.bitmap.clear();
		if(!$gameTemp._showEnemyData){
			return;
		}
		this._debug_hp_sprite.bitmap.drawText("hp", 0, 0, width, height, "left");
		this._debug_hp_sprite.bitmap.drawText("mp", 0, 16, width, height, "left");
		this._debug_hp_sprite.bitmap.drawText("tp", 0, 32, width, height, "left");
		this._debug_hp_sprite.bitmap.drawText(this._battler.hp, 0, 0, width, height, "right");
		this._debug_hp_sprite.bitmap.drawText(this._battler.mp, 0, 16, width, height, "right");
		this._debug_hp_sprite.bitmap.drawText(this._battler.tp, 0, 32, width, height, "right");
	};
})();