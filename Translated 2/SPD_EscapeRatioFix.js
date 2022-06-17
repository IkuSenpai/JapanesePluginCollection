//=============================================================================
// RPGツクールMZ - SPD_EscapeRatioFix.js v1.0.1
//-----------------------------------------------------------------------------
// サードギア (Third Gear)
// https://twitter.com/ThirdGear_Games
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 逃走成功率設定 &amp; 逃走成功率表示プラグイン
 * @author スピード(サードギア)
 *
 * @help
 * SPD_EscapeRatioFix.js
 * 
 * 逃走成功率設定と、逃走成功率のパーティコマンドへの表示を実装するプラグインです。
 * 
 * 
 * ■逃走成功率設定機能
 * 逃走成功"率"のため、0.00～1.00の間で設定をお願いします。
 * (計算式を使用することも可能です。)
 * 
 * ↓MZデフォルトの逃走成功率決定式
 * (0.5 * $gameParty.agility()) / $gameTroop.agility()
 * ※逃走失敗する度に、+0.10（=+10%）
 * 
 * $gameParty.agility()：パーティの敏捷性平均
 * $gameTroop.agility()：敵グループの敏捷性平均
 * 
 * ■逃走成功率表示機能
 * 現在の逃走成功率を、パーティコマンドで「逃走 」と表示させる機能です。
 * 逃走成功率を記録する変数が必要になるため、変数枠を1つ必要とします。
 * なお、逃走成功率の表示は、小数点以下四捨五入します。(例：84.7% → 85%)
 * 
 * スイッチIDを指定することによる、逃走成功率表示の切り替えも可能です。
 * (ボス戦等の逃走不可戦闘で、逃走成功率を非表示にする等)
 * 
 * ※注意
 * TPBで正しく動作するかは検証していないためわかりません。
 * 
 * 
 * 
 * 作成者：スピード（サードギア）
 * 作成日：2022/03/24
 * 
 * 利用規約:
 *   ・著作権表記：不要
 *   ・利用報告：不要
 *   ・商用・非商用：どちらでも可
 *   ・R-18作品：使用可
 *   ・改変：可
 *   ・プラグイン素材の再配布：禁止
 *   ・本プラグインベースの改変プラグイン配布：禁止
 * 
 *
 * ■更新履歴
 * v1.0.1 (22/03/26) 逃走成功率非表示機能の追加
 * 
 * @param escRatio
 * @text 逃走成功率
 * @desc 逃走成功率を入力してください。(数式利用可) 数式を変更したくなければデフォルトのままで
 * @default (0.5 * $gameParty.agility()) / $gameTroop.agility()
 * @type string
 * @param escCommandName
 * @text 逃走パーティコマンドの名称
 * @desc MZデフォルトのウィンドウ横幅で逃走成功率を出す場合、「逃走」のような2文字程度が望ましいです。
 * @default 逃走
 * @param escRatioAdd
 * @text 逃走失敗時の逃走成功率加算
 * @desc 逃走失敗時に、次回以降の逃走率に加算する値を入力してください。
 * @default 0.1
 * @type string
 * @param escRatioBracket
 * @text 表示する逃走成功率の括弧の種別
 * @desc XX%の括弧表記設定です。 0:非表示 1:XX% 2:(XX%) 3: 4:[XX%] 5:{XX%} 6:|XX%| 7:/XX%/
 * @default 0
 * @type number
 * @param escRatioID
 * @text 逃走成功率を格納する変数ID
 * @desc 逃走成功率を格納する変数IDを入力ください
 * @default 0
 * @type number
 * @param escNoDisplayID
 * @text <XX%>を表示させないスイッチID
 * @desc そのスイッチIDがtrueの時、「<XX%>」の表記を削除します。0:無効
 * @default 0
 * @type number
 */

(() => {
	"use strict";
	const pluginName = "SPD_EscapeRatioFix";
	const parameters = PluginManager.parameters(pluginName);

	const escRatio = parameters['escRatio'];
	const escRatioAdd = parameters['escRatioAdd'];
	const escCommandName = parameters['escCommandName'];
	const escRatioID = parameters['escRatioID'];
	const escRatioBracket = parameters['escRatioBracket'];
	const escNoDisplayID = Number(parameters['escNoDisplayID'] || 0);

	BattleManager.makeEscapeRatio = function() {
		//逃走成功率を記録
	    this._escapeRatio = eval(escRatio);
		//100%を超えないための処理
	    this._escapeRatio = Math.min(this._escapeRatio,1.00);
		//逃走成功率を変数に格納  %表示なので100倍にして四捨五入する。
		if(Number(escRatioBracket) > 0){
		    $gameVariables.setValue(escRatioID,Math.round(this._escapeRatio*100));
		}
		else{
		}
	};

	BattleManager.onEscapeFailure = function() {
	    $gameParty.onEscapeFailure();
	    this.displayEscapeFailureMessage();
        //逃走失敗時の逃走成功率加算(100%を超えないよう修正)
		//加算後の逃走成功率を再計算
	    this._escapeRatio += eval(escRatioAdd);
	    if (this._escapeRatio >=1.0) {
	       	this._escapeRatio = 1.0;
	    }
	    else {
	    }
		if(Number(escRatioBracket) > 0){
		    $gameVariables.setValue(escRatioID,Math.round(this._escapeRatio*100));
		}
		else{
		}
    	if (!this.isTpb()) {
        	this.startTurn();
    	}
	};

	Window_PartyCommand.prototype.makeCommandList = function() {
		//「戦う」コマンドの表示
	    this.addCommand(TextManager.fight, "fight");
		//「逃走」コマンドの表示
		if(Number(escNoDisplayID) != 0 && $gameSwitches.value(escNoDisplayID)){
			this.addCommand(escCommandName, "escape", BattleManager.canEscape());
		}
		else if(Number(escNoDisplayID) != 0 && !$gameSwitches.value(escNoDisplayID)){
			switch(Number(escRatioBracket)){
				case 0:
					this.addCommand(escCommandName, "escape", BattleManager.canEscape());					
					break;
				case 1:
	    			this.addCommand(escCommandName+" "+$gameVariables.value(escRatioID)+"%", "escape", BattleManager.canEscape());
					break;
				case 2:
	    			this.addCommand(escCommandName+" ("+$gameVariables.value(escRatioID)+"%)", "escape", BattleManager.canEscape());
					break;
				case 3:
		   			this.addCommand(escCommandName+" <"+$gameVariables.value(escRatioID)+"%>", "escape", BattleManager.canEscape());
					break;
				case 4:
		    		this.addCommand(escCommandName+" ["+$gameVariables.value(escRatioID)+"%]", "escape", BattleManager.canEscape());
					break;
				case 5:
	    			this.addCommand(escCommandName+" {"+$gameVariables.value(escRatioID)+"%}", "escape", BattleManager.canEscape());
					break;
				case 6:
	    			this.addCommand(escCommandName+" |"+$gameVariables.value(escRatioID)+"%|", "escape", BattleManager.canEscape());
					break;
				case 7:
	    			this.addCommand(escCommandName+" /"+$gameVariables.value(escRatioID)+"%/", "escape", BattleManager.canEscape());
					break;
				default:
			    	this.addCommand(escCommandName, "escape", BattleManager.canEscape());
					break;
			}
		}
		else{
			switch(Number(escRatioBracket)){
				case 0:
					this.addCommand(escCommandName, "escape", BattleManager.canEscape());					
					break;
				case 1:
	    			this.addCommand(escCommandName+" "+$gameVariables.value(escRatioID)+"%", "escape", BattleManager.canEscape());
					break;
				case 2:
	    			this.addCommand(escCommandName+" ("+$gameVariables.value(escRatioID)+"%)", "escape", BattleManager.canEscape());
					break;
				case 3:
		   			this.addCommand(escCommandName+" <"+$gameVariables.value(escRatioID)+"%>", "escape", BattleManager.canEscape());
					break;
				case 4:
		    		this.addCommand(escCommandName+" ["+$gameVariables.value(escRatioID)+"%]", "escape", BattleManager.canEscape());
					break;
				case 5:
	    			this.addCommand(escCommandName+" {"+$gameVariables.value(escRatioID)+"%}", "escape", BattleManager.canEscape());
					break;
				case 6:
	    			this.addCommand(escCommandName+" |"+$gameVariables.value(escRatioID)+"%|", "escape", BattleManager.canEscape());
					break;
				case 7:
	    			this.addCommand(escCommandName+" /"+$gameVariables.value(escRatioID)+"%/", "escape", BattleManager.canEscape());
					break;
				default:
			    	this.addCommand(escCommandName, "escape", BattleManager.canEscape());
					break;
			}
		}
	};

})();