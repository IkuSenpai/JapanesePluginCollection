//=============================================================================
// RPGツクールMZ - LL_EncounterAdjust.js v1.0.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc エンカウント発生歩数の調整をおこないます。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin
 *
 * @help LL_EncounterAdjust.js
 *
 * 通常のエンカウント歩数計算式では、
 * 理論上1歩～エンカウントが発生する可能性があります。
 *
 * このプラグインを有効にすると、
 * エンカウント発生歩数が分散率に応じてランダムに設定されるようになります。
 * 例えば、分散率50%でエンカウント歩数が30歩に設定されたマップでは、
 * 15～45歩の間でエンカウントが発生するように調整します。
 * (1～14歩の間エンカウントが発生しなくなります)
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * ライセンスについての詳細は下記をご確認ください。
 * https://nine-yusha.com/plugin/
 *
 * 作者: ルルの教会
 * 作成日: 2020/10/13
 *
 * @param encountRate
 * @text 分散率
 * @desc エンカウント発生歩数の分散率(0～100%)を設定します。
 * @default 50
 * @type number
 * @min 0
 * @max 100
 */

(() => {
	"use strict";
	const pluginName = "LL_EncounterAdjust";

	const parameters = PluginManager.parameters(pluginName);
	const encountRate = Number(parameters['encountRate'] || 50);

	Game_Player.prototype.makeEncounterCount = function() {
		let n = $gameMap.encounterStep();
		let r = Math.randomInt(n * (encountRate / 100) + 1) - Math.randomInt(n * (encountRate / 100) + 1);
		n += r;
		this._encounterCount = n > 0 ? n : 1;
	};
})();
