/*:
 * @target MZ
 * @plugindesc 追加アイテムドロッププラグイン
 * @author さすらいのトム
 * @help 敵のドロップアイテムをメモ欄で設定させることで
 * ドロップアイテムを4つ以上に増やすことが出来るプラグインです。
 * 
 * データベース 敵キャラのメモ欄に下記のように記載してください
 * 
 * アイテムの場合：
 * <AdditionalItem:アイテムID,ドロップ確率(%は不要)>
 * 例：<AdditionalItem:1,100>
 * 
 * 武器の場合：
 * <AdditionalWeapon:武器ID,ドロップ確率(%は不要)>
 * 例：<AdditionalWeapon:2,100>
 * 
 * 防具の場合：
 * <AdditionalArmor:防具ID,ドロップ確率(%は不要)>
 * 例：<AdditionalArmor:1,100>
 * 
 * このプラグインには、プラグインコマンドはありません。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 * 
 */

(function() {
    'use strict';

    const Game_Enemy_prototype_makeDropItems = Game_Enemy.prototype.makeDropItems;
    Game_Enemy.prototype.makeDropItems = function() {
        var drops = Game_Enemy_prototype_makeDropItems.call(this);
        drops = drops.concat(this.makeAdditionalDrops(drops));
        return drops;
    };

    Game_Enemy.prototype.makeAdditionalDrops = function(drops) {
        var enemy = $dataEnemies[this._enemyId]; 
        var note = enemy.note;
        var notes = note.split('\n');
        var list = [];
        for (var i = 0; i < notes.length; i++) {
            list = [];
            if (notes[i].match(/<AdditionalItem:(\d+),(\d+)>/)){
                list = list.concat(notes[i].match(/<AdditionalItem:(\d+),(\d+)>/)[1]);
                list = list.concat(notes[i].match(/<AdditionalItem:(\d+),(\d+)>/)[2]);
                if ($dataItems[RegExp.$1]) {
                    drops = drops.concat(this.makeAdditionalItems(list));
                }
            }
            if (notes[i].match(/<AdditionalWeapon:(\d+),(\d+)>/)){
                list = list.concat(notes[i].match(/<AdditionalWeapon:(\d+),(\d+)>/)[1]);
                list = list.concat(notes[i].match(/<AdditionalWeapon:(\d+),(\d+)>/)[2]);
                if ($dataWeapons[RegExp.$1]) {
                    drops = drops.concat(this.makeAdditionalWeapons(list));
                }
            }
            if (notes[i].match(/<AdditionalArmor:(\d+),(\d+)>/)){
                list = list.concat(notes[i].match(/<AdditionalArmor:(\d+),(\d+)>/)[1]);
                list = list.concat(notes[i].match(/<AdditionalArmor:(\d+),(\d+)>/)[2]);
                if ($dataArmors[RegExp.$1]) {
                    drops = drops.concat(this.makeAdditionalArmors(list));
                }

            }
        }
        return drops;
    };

    Game_Enemy.prototype.makeAdditionalItems = function(AdditionalItem) {

        if(!AdditionalItem) {
            return null;
        }
        const item = AdditionalItem;
        if (!item[0] || !item[1]) {
            return null;
        }
        if (Math.random() * 100 < Number(item[1]) && $dataItems[Number(item[0])]) {

            return $dataItems[Number(item[0])];
        }
        return null;
    }

    Game_Enemy.prototype.makeAdditionalWeapons = function(AdditionalItem) {
        if(!AdditionalItem) {
            return null;
        }
        const item = AdditionalItem;
        if (!item[0] || !item[1]) {
            return null;
        }
        if (Math.random() * 100 < Number(item[1]) && $dataWeapons[Number(item[0])]) {
            return $dataWeapons[Number(item[0])];
        }
        return null;
    }


    Game_Enemy.prototype.makeAdditionalArmors = function(AdditionalItem) {
        if(!AdditionalItem) {
            return null;
        }
        const item = AdditionalItem;
        if (!item[0] || !item[1]) {
            return null;
        }
        if (Math.random() * 100 < Number(item[1]) && $dataArmors[Number(item[0])]) {
            return $dataArmors[Number(item[0])];
        }
        return null;
    }

})();