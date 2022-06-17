/*=============================================================================
 CSVN_madangun.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/09/20 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc skills that reserves a skill over one turn and executes it in the next or after
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n5206c66a0db7
 *
 * @help CSVN_madangun.js
 *
 * Skill Type A: Includes skills that "reserve only"
 *               the corresponding skill execution.
 * Skill type B: Includes skills that are executed only after
 *               booking from skill type A.
 *
 * Skills included in skill type A:
 * Range "None" When available "Battle screen",
 * Hit type "Necessary" Set a common event for the effect.
 * In the memo field, enter the ID of the skill to be reserved
 * in the form of <ReserveSkill: 999>.
 *
 * Common events when using skills included in skill type A:
 * Give the skill user a dedicated state and assign the ID of
 * the skill used to the dedicated variable.
 *
 * Dedicated state:
 * Not subject to behavioral restrictions.
 * Skill type addition / skill type B is added to the feature.
 *
 * Skill type B:
 * Without moving to the selection of skills included in skill type B,
 * activate the reserved skill on the spot and cancel the dedicated state.
 *
 * With the above flow, the operation of
 * "activating a certain skill after making a reservation" is realized.
 *
 * @param skillTypeB
 * @text Skill type B (reserved side)
 * @desc
 * @default
 * @type number
 *
 * @param reservedStateId
 * @text State indicating that a skill is reserved
 * @desc
 * @default
 * @type state
 *
 * @param varIdReserveSkillId
 * @text State indicating that a skill is reserved
 * @desc
 * @default
 * @type variable
 */

/*:ja
 * @target MZ
 * @plugindesc １ターンかけてスキルを予約しそれを次ターン以降で実行するスキル
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n5206c66a0db7
 *
 * @help CSVN_madangun.js
 *
 * スキルタイプＡ: 対応するスキル実行の「予約のみ」を行うスキルを含む
 * スキルタイプＢ: スキルタイプＡから予約後にのみ実行されるスキルを含む
 *
 * スキルタイプＡに含まれるスキル:
 * 範囲「なし」使用可能時「バトル画面」命中タイプ「必中」
 * 使用効果にはコモンイベントを設定する。
 * メモ欄には <ReserveSkill:999> という形で予約するスキルのIDを記載する。
 *
 * スキルタイプＡに含まれるスキル使用時のコモンイベント:
 * スキル使用者に専用ステートを付与して、使用したスキルのIDを専用変数に
 * 代入する。
 *
 * 専用ステート:
 * 行動制約を受けない。特徴にスキルタイプ追加／スキルタイプＢが追加される。
 *
 * スキルタイプＢ:
 * スキルタイプＢに含まれるスキルの選択には移らずに、その場で予約中のスキルを
 * 発動し、専用ステートを解除する。
 *
 * 以上の流れで「あるスキルを予約を経て発動する」という動作を実現します。
 *
 * @param skillTypeB
 * @text スキルタイプＢ(予約される側)
 * @desc
 * @default
 * @type number
 *
 * @param reservedStateId
 * @text 予約中ステート
 * @desc
 * @default
 * @type state
 *
 * @param varIdReserveSkillId
 * @text 予約するスキルIDを入れる変数
 * @desc
 * @default
 * @type variable
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
    Scene_Battle.prototype.commandSkill = function() {
        const stypeId = this._actorCommandWindow.currentExt();
        //console.log(`stypeId: ${stypeId} | skillTypeB: ${params.skillTypeB}`);

        // スキルタイプＢに合致する場合はスキル選択に移らず
        // 予約済みのスキルをそのまま実行
        if (stypeId == params.skillTypeB) {
            console.log(`--------> performing reserved skill`);
            const reservedSkill = getReservedSkill();
            if (reservedSkill) {
                this.performReservedSkill(reservedSkill);
            }
        } else {
             // それ以外の場合は通常通りのスキルタイプ選択動作
            //console.log(`--------> performing normal skill`);
            _Scene_Battle_commandSkill.apply(this);
        }
    };

    Scene_Battle.prototype.performReservedSkill = function(reservedSkill) {
        // 予約中ステートの解除
        console.log(`removing state: ${params.reservedStateId}`);
        BattleManager.actor().removeState(params.reservedStateId);

        // 予約される側のスキルをそのまま実行
        console.log('perform reserved skill.');
        const action = BattleManager.inputtingAction();
        action.setSkill(reservedSkill.id);
        BattleManager.actor().setLastBattleSkill(reservedSkill);
        this.onSelectAction();
    };

    function getReservedSkill() {
        let reservedSkill;

        // 予約する側のスキルの情報を取得
        console.log(`params.varIdReserveSkillId: ${params.varIdReserveSkillId}`);
        console.log(`reserveSkillId: ${$gameVariables.value(params.varIdReserveSkillId)}`);

        const reserveSkill = $dataSkills[$gameVariables.value(params.varIdReserveSkillId)];
        console.log('reserveSkill --');
        console.log(reserveSkill);

        // スキル情報が無事取得できた
        if (reserveSkill) {
            // メモ欄から予約される側のスキルIDを取得
            const reservedSkillId = reserveSkill.meta.ReserveSkill;

            // 予約される側のスキルIDを無事取得できた
            if (reservedSkillId) {
                // 予約される側のスキル情報取得
                reservedSkill = $dataSkills[reservedSkillId];
                console.log('reservedSkill --');
                console.log(reservedSkill);

                if (reservedSkill) {
                    // OK
                    console.log('OK');
                } else {
                    // スキル情報が取得できなかった場合はそのまま終了
                    console.log('reserved skill info not found.');
                }
            } else {
                // スキルIDが入っていなかった
                console.log('reservedSkillId not found.');
            }
        } else {
            // スキル情報が取得できなかった場合はそのまま終了
            console.log('reserve skill info not found.');
        }
        console.log('--------> get reserved skill end.');

        return reservedSkill;
    }
})();