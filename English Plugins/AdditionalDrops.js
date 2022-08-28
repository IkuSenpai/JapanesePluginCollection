/*:
 * @target MZ
 * @plugindesc additional item drop plugin
 * @author Tom the Wanderer.
 * @help By letting you set the enemy's drop items in the notes field.
 * This plugin allows you to increase the number of drop items to four or more.
 *
 * Database Please put the following in the memo field of the enemy character.
 *
 * For items:.
 * <AdditionalItem:ItemID,DropProbability(% is not necessary)>
 * Example: <AdditionalItem:1,100>
 *
 * For weapons: *
 * <AdditionalWeapon:WeaponID,DropProbability(% is not necessary)>
 * Example: <AdditionalWeapon:2,100>
 *
 * For Armor.
 * <AdditionalArmor:Armor ID,Drop Probability(% is not necessary)>
 * Example: <AdditionalArmor:1,100>
 *
 * There are no plugin commands for this plugin.
 *
 * Terms of Use.
 * No credits are required.
 * * * The author will be pleased if you do so.
 * There are no restrictions on secondary distribution or unauthorized reproduction.
 * We are not responsible for any problems that may occur after installing this plugin.
 * We are not responsible for any problems that may occur by installing this plugin.
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
        } return drops;
    }

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
        } return null;
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
        } return null;
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