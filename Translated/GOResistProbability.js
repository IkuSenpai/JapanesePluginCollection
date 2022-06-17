/*:
 * @target MZ
 * @plugindesc プラグイン：確率的属性防御
 * @author GrayOgre
 * @help
 * 属性ダメージを指定の確率で、指定の割合減少させます。
 * 
 * 特徴に属性有効度を設定したオブジェクトのメモに
 * <resistProbability:属性,確率(%),抵抗率(%)> と記載することで
 * 指定された属性のダメージが指定された確率で抵抗率の割合だけ減少します。
 * この抵抗率は、特徴の属性有効度と累積して作用します。
 * 
 * 例：炎属性のダメージを30%の確率で40%減少させる。
 * <resistProbability:炎,30,40>
 * このとき炎属性の属性有効度が80%の場合
 * ダメージは、(0.8 * (1 - 0.4)) つまり 0.48倍になります。
 * 
 * 制約：
 * この能力を付与するオブジェクトには、
 * 必ず特徴にその属性の属性有効度をつけてください。(100%で構いません)
 * ＃属性有効度のデータに追加情報を保持しているため
 * 
 * 
 * 〈確率発動の無効化〉
 * メモに <cancelProbability> と記載ししたスキルは、
 * 上記の確率発動する属性抵抗率を無視してダメージを与えます。
 * 属性有効度は、このスキルにおいても効果を与えます。
 * 
 * プラグインコマンドはありません。
 *
 * var 1.0.4
 * 
 * Copyright (c) 2021-2022 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 */

(() => {
    'use strict';

    const probRegExpHead = "<resistProbability:";
    const probRegExpTeil = ",(\\d+),(\\d+)>";
    const cancelResistProbabilityKey = "cancelProbability";

    function calcElementRateWithProbability(trait, elementId, invalid) {
        if (trait._elementProbabilityGORP === undefined) {
            const obj = {probability:1 , resistance:0};
            if (trait.noteGORP) {
                const re = new RegExp(probRegExpHead + $dataSystem.elements[elementId] + probRegExpTeil);
                const match = re.exec(trait.noteGORP);
                if (match) {
                    obj.probability = parseInt(match[1]) / 100;
                    obj.resistance = parseInt(match[2]) / 100;
                }
            }
            trait._elementProbabilityGORP = obj;
        }
        const prob = trait._elementProbabilityGORP.probability;
        const resist = trait._elementProbabilityGORP.resistance;
        const result = trait.value * ((!invalid && prob > Math.random()) ? (1 - resist) : 1);
        return result;
    }   

    const _Game_BattleBase_alltraits = Game_BattlerBase.prototype.allTraits
    Game_BattlerBase.prototype.allTraits = function() {
        for (const obj of this.traitObjects()) {
            for (const trait of obj.traits) {
                if (trait.code === Game_BattlerBase.TRAIT_ELEMENT_RATE && obj.note) {
                    trait.noteGORP = obj.note;
                }
            }
        }
        return _Game_BattleBase_alltraits.call(this);
    }

    Game_BattlerBase.prototype.elementRate = function(elementId) {
        let r = 1;
        for (const trait of this.traitsWithId(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId)) {
            r *= calcElementRateWithProbability(trait, elementId, this.invalidProbabilityGORP);
        }
        return r;
    };

    const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function(target, critical) {
        const item = this.item();
        if (item.invalidProbabilityGORP === undefined) {
            item.invalidProbabilityGORP = this.isSkill() && item.meta[cancelResistProbabilityKey] !== undefined;
        }
        target.invalidProbabilityGORP = item.invalidProbabilityGORP;
        return _Game_Action_makeDamageValue.call(this, target, critical);
    }
})();