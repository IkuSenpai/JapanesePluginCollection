//=============================================================================
// RPG Maker MZ - Event start by airship
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Allows you to start an event while on board an airship.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_EventStartByAirship.js(ver1.0.1)
 *
 * Allows you to start an event while on board an airship.
 * Condition: Event priority is "above normal characters"
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
 * @plugindesc 飛行船乗車中にイベントを実行できるようにします。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_EventStartByAirship.js(ver1.0.1)
 *
 * 飛行船乗車中にイベントを実行できるようにします。
 * 条件：プライオリティ「通常キャラの上」
 *
 * プラグインコマンドはありません。
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

    // 追加関数：プライオリティ「通常キャラの上」ならtrueを返す
    Game_CharacterBase.prototype.isHighPriority_GABA = function() {
        return this._priorityType === 2;
    };

    // 変更前：飛行船乗車中はfalseを返す
    // 変更後：いつでもtrueを返す
    Game_Player.prototype.canStartLocalEvents = function() {
        // return !this.isInAirship();
        return true;
    };

    // 飛行船乗車中は、接触しているイベントのプライオリティが「通常キャラの上」なら実行できるようにします
    const _Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
    Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {

        if ($gamePlayer.isInAirship()) {
            if (!$gameMap.isEventRunning()) {
                for (const event of $gameMap.eventsXy(x, y)) {
                    if (
                        event.isTriggerIn(triggers) &&
                        event.isHighPriority_GABA()
                    ) {
                        event.start();
                    }
                }
            }
        } else {
            _Game_Player_startMapEvent.apply(this, arguments);
        }
    };

})();
