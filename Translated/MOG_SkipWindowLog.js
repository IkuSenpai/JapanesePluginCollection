//=============================================================================
// MOG_SkipWindowLog.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Desativa a janela de Log.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Lag Time
 * @desc Definição do tempo de espera após a ação.
 * @default 10
 * @type number
 *
 * @param Display Start Message
 * @desc Apresentar a menssagem inicial com os nomes dos inimigos.
 * @default false
 * @type boolean 
 *
 * @param Display Preemptive Message
 * @desc Apresentar a menssagem de ataque preventivo.
 * @default true
 * @type boolean 
 *
 * @help  
 * =============================================================================
 * +++ MOG - Skip Window Log (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Desativa a janela de Log.
 *
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) 戦闘ログウィンドウを非表示にします。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_SkipWindowLog.js
 *
 * @param Lag Time
 * @text 行動後のタイムアウト時間
 * @type number
 * @max 9007
 * @default 10
 *
 * @param Display Start Message
 * @text 戦闘開始メッセージの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 *
 * @param Display Preemptive Message
 * @text 先制攻撃メッセージの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * +++ MOG - Skip Window Log (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * 戦闘ログウィンドウを非表示にします。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_SkipWindowLog = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_SkipWindowLog');
Moghunter.winLogSpeed = Number(Moghunter.parameters['Lag Time'] || 10);
Moghunter.battleStartMessage = String(Moghunter.parameters['Display Start Message'] || "false");
Moghunter.battlePreemptiveMessage = String(Moghunter.parameters['Display Preemptive Message'] || "true");

//=============================================================================
// ■■■ Window BattleLog ■■■
//=============================================================================

//==============================
// ♦ OVERWRITE ♦ Refresh 
//==============================
Window_BattleLog.prototype.refresh = function () {
	this.visible = false;
};

//==============================
// ♦ OVERWRITE ♦ Message Speed
//==============================
Window_BattleLog.prototype.messageSpeed = function () {
	if (Imported.MOG_FlashDamage) { if ($gameTemp._flashDamage) { return 0 } };
	return Moghunter.winLogSpeed;
};


//=============================================================================
// ■■■ Battle Manager ■■■
//=============================================================================

//==============================
// ♦ OVERWRITE ♦ Refresh 
//==============================
BattleManager.displayStartMessages = function () {
	if (String(Moghunter.battleStartMessage) === "true") {
		for (const name of $gameTroop.enemyNames()) {
			$gameMessage.add(TextManager.emerge.format(name));
		}
	};
	if (String(Moghunter.battlePreemptiveMessage) === "true") {
		if (this._preemptive) {
			$gameMessage.add(TextManager.preemptive.format($gameParty.name()));
		} else if (this._surprise) {
			$gameMessage.add(TextManager.surprise.format($gameParty.name()));
		}
	};
};
