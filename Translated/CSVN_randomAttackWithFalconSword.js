/*=============================================================================
 CSVN_randomAttackWithFalconSword.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/10/04 初版
 1.0.1 2021/10/04 連続回数を上書きではなく乗算に変更
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Random attack skills will also reflect the number of additional weapon attacks.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n7a98088a059d
 *
 * @help CSVN_randomAttackWithFalconSword.js
 *
 * If you activate the skill of 2 random enemies with a weapon
 * that has 1 additional attack count (= 2 attacks), the additional attack count of the weapon
 * will be ignored and it will be 2 attacks, but it will be 4 times To be.
 * In other words, even if you activate the skill of random enemy
 * targets (count: b) with weapon(attack count: a), the number of attacks is
 * b times, but it becomes axb times.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 */

/*:ja
 * @target MZ
 * @plugindesc ランダム攻撃スキルにも武器の攻撃追加回数が反映されるようにする
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n7a98088a059d
 *
 * @help CSVN_randomAttackWithFalconSword.js
 *
 * 攻撃追加回数1が入っている(=2回攻撃)の武器で敵ランダム2体のスキルを発動した
 * 場合、武器の攻撃追加回数は無視されて2回攻撃になりますが、それが4回になるように
 * します。
 * つまり、攻撃回数a回の武器で敵ランダムb体のスキルを発動しても攻撃回数がb回
 * だったのが、axb回になります。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 */

(() => {
    'use strict';

    const _BattleManager_startAction = BattleManager.startAction;
    const additionalAttackTraitCode = 34;
    BattleManager.startAction = function() {
        if (this._subject.isActor()) {
            const weapons = this._subject.weapons();
            const action = this._subject.currentAction();
            const item = action.item();
            let addCount = 0;
            for (const weapon of weapons) {
                // 装備中の武器の特徴を検査
                const traits = weapon.traits;
                for (const trait of traits) {
                    // 攻撃追加回数に1以上が入っている場合
                    if (trait.code == additionalAttackTraitCode
                     && trait.value > 0) {
                        // かつスキルが敵ランダム複数体の場合
                        if (action.isForRandom()) {
                            addCount += trait.value;
                        }
                    }
                }
            }
            if (addCount > 0) {
                // 武器に攻撃追加があった場合、そのぶんをスキルの連続回数に追加する
                if (item.originalRepeats) {
                    // 以前追加したことがある場合はいちど元に戻す
                    item.repeats = item.originalRepeats;
                } else {
                    // 初回追加の場合は初期値を保存しておく
                    item.originalRepeats = item.repeats;
                }
                addCount++;
                item.repeats *= addCount;
                //console.log(`repeats: ${item.repeats}`);
            }
        }

        _BattleManager_startAction.apply(this);
    };
})();