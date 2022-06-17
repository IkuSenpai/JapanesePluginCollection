//=============================================================================
// RPG Maker MZ - Battle end Common event finisher
//=============================================================================

/*:
 * @target MZ
 * @plugindesc After executing the common event, the battle ends.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_BattleEndCEFinisher.js(ver1.0.0)
 *
 * Normally, if there are common events remaining at the end of the battle, they will be executed after returning to the map scene.
 *
 * If you enable this plugin, common events will be executed before the end of the battle.
 * The execution timing is just before the victory/defeat message is displayed.
 *
 * It does not affect the "Battle Interruption" process.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘勝利・敗北時にコモンイベントを実行してから戦闘終了します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_BattleEndCEFinisher.js(ver1.0.0)
 *
 * 通常、戦闘終了時にコモンイベントが残っている場合、
 * マップに戻ってから実行されます。
 *
 * プラグインを有効にすると戦闘終了前にコモンイベントが実行されるようになります。
 * 実行タイミングは、勝利/敗北のメッセージが表示される直前です。
 *
 * 「バトルの中断」処理には影響しません。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 */

(() => {
	"use strict";
    const pluginName = "GABA_BattleEndCEFinisher";

	// 戦闘終了チェック
	const _BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
	BattleManager.checkBattleEnd = function() {
		if (needsCommonEventFinish()) {
			return false;
		}

		return _BattleManager_checkBattleEnd.apply(this, arguments);
	};

	// コモンイベントが残っているか判定。
	function needsCommonEventFinish() {
		if (BattleManager._phase) {
			if ($gameParty.isAllDead()) {
				return $gameTemp.isCommonEventReserved();
			} else if ($gameTroop.isAllDead()) {
				return $gameTemp.isCommonEventReserved();
			}
		}
		return false;
	}

})();
