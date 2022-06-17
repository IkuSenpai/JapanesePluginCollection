/*=============================================================================
 CSVN_preventWeakEnemies.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/07 初版
 1.1.0 2021/08/18 メタタグがない場合の挙動を設定可能に
 1.1.1 2021/08/18 メタタグがない場合の設定が空欄の場合落ちる問題の修正
 1.1.2 2021/08/18 あわててconsole.logを消し忘れてたので削除
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Prevent the appearance of weak enemies
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/nad70c5354179
 *
 * @help CSVN_preventWeakEnemies.js
 *
 * Encounters with enemy groups below the average party level minus
 * the set value will be skipped while the specified switch is on.
 *
 * The level of the enemy character can be set by writing the following
 * meta tag in the memo field.
 * ex. <Lv:25>
 *
 * If you do not write a meta tag, it depends on the plugin settings.
 * In addition, since the encounter is judged by the average level of
 * the entire enemy group, even if the enemy character is sufficiently
 * lower than the party level, if there is an enemy character with
 * a higher level in the same group, it will appear together.
 *
 * v1.1.0 Thanks to: Mr. Sasuke Kannaduki
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param switchId
 * @text switch ID
 * @desc Attempts to skip while this switch is ON.
 * @type switch
 *
 * @param lvDiff
 * @text Setting level difference
 * @desc Encounters with enemy groups below the average party level minus this value will be skipped while the specified switch is on.
 *
 * @param woMetatag
 * @text Treatment of enemy characters without meta tags.
 * @desc Select whether it is equivalent to Lv:1 or equivalent to Lv:99.
 * @type select
 * @option 1
 * @option 99
 */

/*:ja
 * @target MZ
 * @plugindesc 弱い敵の出現を防ぐ。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/nad70c5354179
 *
 * @help CSVN_preventWeakEnemies.js
 *
 * 指定したスイッチが入っている間、パーティーのレベルの平均を
 * 設定値以上下回る敵グループとのエンカウントはスキップされます。
 *
 * 敵キャラのレベルは、メモ欄に以下のようなメタタグを書くことで
 * 設定できます。
 * ex. <Lv:25>
 *
 * メタタグを書いていない場合の挙動はプラグイン設定に依存します。
 * なお、敵グループ全体のレベルの平均でエンカウント要否を判断しますので、
 * パーティーのレベルより十分にレベルが低い敵キャラでも、同グループに
 * レベルの高い敵キャラがいる場合はいっしょに出てくることがあります。
 *
 * v1.1.0 Thanks to: 神無月サスケ=サン
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param switchId
 * @text 有効判定スイッチID
 * @desc このスイッチがONの間スキップ試行します。
 * @type switch
 *
 * @param lvDiff
 * @text 設定レベル差
 * @desc 敵グループのLv平均がパーティのLv平均をこの設定値以上下回るとエンカウントがスキップされます。
 *
 * @param woMetatag
 * @text メタタグがない敵キャラの扱い
 * @desc Lv:1 相当か Lv:99 相当かを選択します。
 * @type select
 * @option 1
 * @option 99
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);
    const woMetatag = params.woMetatag ? params.woMetatag : 99;

    const _Game_Player_executeEnounter = Game_Player.prototype.executeEncounter;
    Game_Player.prototype.executeEncounter = function() {
        if (!$gameMap.isEventRunning() && this._encounterCount <= 0) {
            if ($gameSwitches.value(params.switchId)) {
                const result = determineLvDiff(this.makeEncounterTroopId());

                this.makeEncounterCount();
                if (!result) {
                    return false;
                } else {
                    BattleManager.onEncounter();
                    return true;
                }
            }
            return _Game_Player_executeEnounter.call(this);
        }
    };

    function determineLvDiff(troopId) {
        let partyLvAve = 0;
        let troopLvAve = 0;

        const dataTroop = $dataTroops[troopId];
        if (dataTroop) {
            BattleManager.setup(troopId, true, false);

            const enemies = $gameTroop.aliveMembers();
            let lvs = 0;
            let dataEnemy;
            for (const enemy of enemies) {
                if ($dataEnemies[enemy._enemyId]) {
                    dataEnemy = $dataEnemies[enemy._enemyId];
                    lvs += Number(dataEnemy.meta.Lv ? dataEnemy.meta.Lv : woMetatag);
                }
            }
            troopLvAve = Math.floor(lvs / enemies.length);

            const members = $gameParty.aliveMembers();
            lvs = 0;
            for (const member of members) {
                lvs += Number(member._level);
            }
            partyLvAve = Math.floor(lvs / members.length);

            return partyLvAve - troopLvAve < params.lvDiff;
        } else {
            return false;
        }
    }
})();