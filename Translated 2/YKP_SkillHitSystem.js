//=============================================================================
// YKP_SkillHitSystem.js
//
// Copyright (c) 2022 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_SkillHitSystem = true;

var YukiKP = YukiKP || {};
YukiKP.SkillHitSystem = YukiKP.SkillHitSystem || {};

/*:
 * @plugindesc スキル命中率のシステムを変更するプラグイン。
 * @target MZ
 * @author YukiKamijo
 *
 * @help YKP_SkillHitSystem.js
 *
 * スキル命中率のシステムを変更するプラグインです。
 * 
 * 命中タイプが物理攻撃のスキルの命中判定が
 * コアシステムでは以下のようになっています。
 * 
 * ・１回目：スキルの成功率 × 使用者の命中率 < 乱数
 * ・２回目：対象の回避率 <= 乱数
 * ・両方の判定で成功した場合に、スキルが命中する
 *
 * この命中判定を以下のように変更します。
 * 
 * ・スキルの成功率 × 使用者の命中率 - 対象の回避率 >= 乱数
 * 
 * この変更で、命中率を上昇させるアイテムやスキルによって
 * スキルの成功率が低いものや、回避率の高い対象に対して
 * スキルが命中しやすくすることができるようになります。
 * 
 * 命中タイプが魔法攻撃・必中のスキルはコアシステムと同一です。
 * 
 * ・１回目：スキルの成功率 < 乱数
 * ・２回目：対象の魔法回避率 <= 乱数
 *
 * plugin version 1.0.0
 */

(() => {
    'use strict';
    const pluginName = 'YKP_SkillHitSystem';

    // スキルの命中率計算を変更
    // =============================================================================================

    Game_Action.prototype.physicalHit = function(target, result) {
        const successRate = this.item().successRate;
        const skillHitRate = successRate * 0.01 * this.subject().hit - target.eva;
        if (result.used && Math.random() < skillHitRate) {
            result.missed = false;
            result.evaded = false;
        } else if (Math.random() < this.subject().hit - target.eva) {
            if (successRate * 0.01 < 1.0) {
                result.missed = true;
                result.evaded = false;
            } else {
                result.missed = false;
                result.evaded = true;
            }
        } else {
            if (0 < target.eva) {
                result.missed = false;
                result.evaded = true;
            } else {
                result.missed = true;
                result.evaded = false;
            }
        }
    };

    Game_Action.prototype.apply = function(target) {
        const result = target.result();
        this.subject().clearResult();
        result.clear();
        result.used = this.testApply(target);
        if(this.isPhysical()) {
            this.physicalHit(target, result);
        } else {
            result.missed = result.used && Math.random() >= this.itemHit(target);
            result.evaded = !result.missed && Math.random() < this.itemEva(target);
        }
        result.physical = this.isPhysical();
        result.drain = this.isDrain();
        if (result.isHit()) {
            if (this.item().damage.type > 0) {
                result.critical = Math.random() < this.itemCri(target);
                const value = this.makeDamageValue(target, result.critical);
                this.executeDamage(target, value);
            }
            for (const effect of this.item().effects) {
                this.applyItemEffect(target, effect);
            }
            this.applyItemUserEffect(target);
        }
        this.updateLastTarget(target);
    };
    // =============================================================================================
})();
