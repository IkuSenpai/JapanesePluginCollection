//=============================================================================
// YKP_SkillEpuipsType.js
//
// Copyright (c) 2021 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_SkillEpuipsType = true;

var YukiKP = YukiKP || {};

/*:
 * @plugindesc スキル必要装備の拡張プラグイン。
 * @target MZ
 * @author YukiKamijo
 *
 * @help YKP_SkillEpuipsType.js
 *
 * スキルの必要装備を拡張するプラグインです。
 *
 * スキルのメモ欄に以下のようなメタデータを追加することで使用できます。
 *
 * 必要武器の種類を追加する場合
 * <WeaponType:id,id...> id には武器タイプの番号を入力
 *
 * 必要防具の種類を追加する場合
 * <ArmorType:id,id...> id には防具タイプの番号を入力
 *
 * 複数のタイプを追加する場合は、「,」で区切ることで可能になります。
 * 武器と防具を両方とも必要とすることも可能です。
 *  ※剣と盾で連続技にするようなスキルの作成が出来る。
 * 武器同士はいずれかひとつ、防具同士はいずれかひとつでも装備していると使用可能としています。
 *
 * plugin version 1.0.0
 */

(() => {
    'use strict';
    const pluginName = "YKP_SkillEpuipsType";

    // スキルのメタデータから装備タイプとIDを取得し、スキルの使用条件とする。
    // =============================================================================================
    YukiKP.Game_Actor_isSkillWtypeOk = Game_Actor.prototype.isSkillWtypeOk;
    Game_Actor.prototype.isSkillWtypeOk = function(skill) {
        var w_check  = false;
        var w_result = false;
        var a_check  = false;
        var a_result = false;

        const wtypeId1 = skill.requiredWtypeId1;
        const wtypeId2 = skill.requiredWtypeId2;
        var wtypeAddId = [];
        var atypeAddId = [];

        if (skill.meta.WeaponType) {
            wtypeAddId = skill.meta.WeaponType.split(',');
        }
        if (skill.meta.ArmorType) {
            atypeAddId = skill.meta.ArmorType.split(',');
        }

        // 配列に必要武器タイプを追加
        wtypeAddId.push(wtypeId1);
        wtypeAddId.push(wtypeId2);

        // データチェック
        // wtype all 0 & atype nodata -> true
        // wtype 1 > 0 & atype nodata -> check w
        // wtype all 0 & atype 1 > 0  -> check a
        // wtype 1 > 0 & atype 1 > 0  -> check w & a
        if (wtypeAddId.every(val => Number(val) === 0)) {
            w_result = true;
        } else {
            w_check = true;
        }

        if (atypeAddId.length) {
            a_check  = true;
        } else {
            a_result = true;
        }

        if (w_check) {
            var length = wtypeAddId.length;
            for (var i = 0; i < length; i++) {
                w_result = wtypeAddId[i] > 0 && this.isWtypeEquipped(Number(wtypeAddId[i]));
                if (w_result) {
                    break;
                }
            }
        }

        if (a_check) {
            var length = atypeAddId.length;
            for (var i = 0; i < length; i++) {
                a_result = atypeAddId[i] > 0 && this.isAtypeEquipped(Number(atypeAddId[i]));
                if (a_result) {
                    break;
                }
            }
        }

        return w_result && a_result;
    };

    // 防具タイプをチェックするメソッドの追加
    Game_Actor.prototype.isAtypeEquipped = function(atypeId) {
        return this.armors().some(armor => armor.atypeId === atypeId);
    };
    // =============================================================================================
})();
