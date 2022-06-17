//=============================================================================
// RPG Maker MZ - Item Keeper
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Save items, weapons, and armor in variables.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_ItemKeeper.js(ver1.0.0)
 *
 * Save the number of items, weapons, and armor in a variable.
 * The saved data can be restored (added to the current number) at any time.
 *
 * Save/restore is executed by the plug-in command.
 * There are also plugin commands to empty items, weapons and armor.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @command saveItem
 * @text Save the item
 * @desc Save the number of items in a variable.
 *
 * @arg v
 * @type variable
 * @text Variable
 * @desc Specify the variable.
 * @default 0
 *
 * @arg itemType
 * @type select
 * @desc Select an item type.
 * @option All
 * @value 0
 * @option Normal
 * @value 1
 * @option Important
 * @value 2
 * @option Secret A
 * @value 3
 * @option Secret B
 * @value 4
 * @default 0
 *
 * @command loadItem
 * @text Restore the item
 * @desc Add the saved item to the current inventory.
 *
 * @arg v
 * @text Variable
 * @type variable
 * @desc Specify the variable.
 * @default 0
 *
 * @command deleteItem
 * @text Delete the item
 * @desc Delete the item.
 *
 * @arg itemType
 * @type select
 * @desc Select an item type.
 * @option All
 * @value 0
 * @option Normal
 * @value 1
 * @option Important
 * @value 2
 * @option Secret A
 * @value 3
 * @option Secret B
 * @value 4
 * @default 0
 *
 * @command saveWeapon
 * @text Save the weapon
 * @desc Save the number of weapon in a variable.
 *
 * @arg v
 * @text Variable
 * @type variable
 * @desc Specify the variable.
 * @default 0
 *
 * @command loadWeapon
 * @text Restore the weapon
 * @desc Add the saved weapon to the current inventory.
 *
 * @arg v
 * @text Variable
 * @type variable
 * @desc Specify the variable.
 * @default 0
 *
 * @command deleteWeapon
 * @text Delete the weapon
 * @desc Delete the weapon.
 *
 * @command saveArmor
 * @text Save the armor
 * @desc Save the number of aomor in a variable.
 *
 * @arg v
 * @text Variable
 * @type variable
 * @desc Specify the variable.
 * @default 0
 *
 * @command loadArmor
 * @text Restore the armor
 * @desc Add the saved armor to the current inventory.
 *
 * @arg v
 * @text Variable
 * @type variable
 * @desc Specify the variable.
 * @default 0
 *
 * @command deleteArmor
 * @text Delete the armor
 * @desc Delete the armor.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc アイテム・武器・防具を変数に保存・復元します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_ItemKeeper.js(ver1.0.0)
 *
 * パーティが所持しているアイテム・武器・防具の個数を変数に保存します。
 * 保存したデータは、任意のタイミングで復元(現在の所持品に追加)できます。
 *
 * 保存・復元はプラグインコマントで実行します。
 * アイテム・武器・防具を空にするプラグインコマンドもあります。
 *
 * ■メモ
 * ・変数に数値以外のデータが保存されます。
 *   この変数を計算に使わないように注意してください。
 *
 * ・保存される所持数は「アイテム」で表示される数です。
 *   装備品も含めて処理したい場合は、まずエディタで装備を外してください。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @command saveItem
 * @text アイテムを保存する
 * @desc アイテムの所持数を指定の変数に保存します。
 *
 * @arg v
 * @text 変数
 * @type variable
 * @desc 保存先の変数を指定します。
 * @default 0
 *
 * @arg itemType
 * @type select
 * @desc アイテムタイプを選択します。
 * @option すべて
 * @value 0
 * @option 通常アイテム
 * @value 1
 * @option 大事なもの
 * @value 2
 * @option 隠しアイテムA
 * @value 3
 * @option 隠しアイテムB
 * @value 4
 * @default 0
 *
 * @command loadItem
 * @text アイテムを復元する
 * @desc 変数に保存したアイテムを現在の所持品に追加します。
 *
 * @arg v
 * @text 変数
 * @type variable
 * @desc アイテムが保存されている変数を指定します。
 * @default 0
 *
 * @command deleteItem
 * @text アイテムを消去する
 * @desc アイテムを消去します。
 *
 * @arg itemType
 * @type select
 * @desc アイテムタイプを選択します。
 * @option すべて
 * @value 0
 * @option 通常アイテム
 * @value 1
 * @option 大事なもの
 * @value 2
 * @option 隠しアイテムA
 * @value 3
 * @option 隠しアイテムB
 * @value 4
 * @default 0
 *
 * @command saveWeapon
 * @text 武器を保存する
 * @desc 武器の所持数を指定の変数に保存します。
 *
 * @arg v
 * @text 変数
 * @type variable
 * @desc 保存先の変数を指定します。
 * @default 0
 *
 * @command loadWeapon
 * @text 武器を復元する
 * @desc 変数に保存した武器を現在の所持品に追加します。
 *
 * @arg v
 * @text 変数
 * @type variable
 * @desc 武器が保存されている変数を指定します。
 * @default 0
 *
 * @command deleteWeapon
 * @text 武器を消去する
 * @desc 武器を消去します。
 *
 * @command saveArmor
 * @text 防具を保存する
 * @desc 防具の所持数を指定の変数に保存します。
 *
 * @arg v
 * @text 変数
 * @type variable
 * @desc 保存先の変数を指定します。
 * @default 0
 *
 * @command loadArmor
 * @text 防具を復元する
 * @desc 変数に保存した防具を現在の所持品に追加します。
 *
 * @arg v
 * @text 変数
 * @type variable
 * @desc 防具が保存されている変数を指定します。
 * @default 0
 *
 * @command deleteArmor
 * @text 防具を消去する
 * @desc 防具を消去します。
 *
 */

(() => {
	"use strict";
    const pluginName = "GABA_ItemKeeper";

    //-------------------------
    // プラグインコマンド
    //-------------------------

    // アイテムの保存
    PluginManager.registerCommand(pluginName, "saveItem", args => {
        saveItem(Number(args.v) ,Number(args.itemType));
    });
    // アイテムの復元
    PluginManager.registerCommand(pluginName, "loadItem", args => {
        loadItem(Number(args.v));
    });
    // アイテムの消去
    PluginManager.registerCommand(pluginName, "deleteItem", args => {
        deleteItem(Number(args.itemType));
    });
    // 武器の保存
    PluginManager.registerCommand(pluginName, "saveWeapon", args => {
        saveWeapon(Number(args.v));
    });
    // 武器の復元
    PluginManager.registerCommand(pluginName, "loadWeapon", args => {
        loadWeapon(Number(args.v));
    });
    // 武器の消去
    PluginManager.registerCommand(pluginName, "deleteWeapon", args => {
        deleteWeapon();
    });
    // 防具の保存
    PluginManager.registerCommand(pluginName, "saveArmor", args => {
        saveArmor(Number(args.v));
    });
    // 防具の復元
    PluginManager.registerCommand(pluginName, "loadArmor", args => {
        loadArmor(Number(args.v));
    });
    // 防具の消去
    PluginManager.registerCommand(pluginName, "deleteArmor", args => {
        deleteArmor();
    });

    // Game_Party.prototype.gainItem()から不要な処理を除去したもの
    function gainItem(item, amount) {
        const container = $gameParty.itemContainer(item);
        if (container) {
            const lastNumber = $gameParty.numItems(item);
            const newNumber = lastNumber + amount;
            container[item.id] = newNumber.clamp(0, $gameParty.maxItems(item));
            if (container[item.id] === 0) {
                delete container[item.id];
            }
        }
    };

    // 対象アイテムのキー配列を取得
    function getItemKeyArr(itemType) {
        return Object.keys($gameParty._items).filter(el => {
            if (itemType === 0) {
                return true;
            } else {
                return $dataItems[el].itypeId === itemType
            }
        });
    }

    // アイテム消去
    function deleteItem(itemType){
        const arr = getItemKeyArr(itemType);
        arr.forEach(el => {
            gainItem($dataItems[el], $gameParty.maxItems($dataItems[el]) * -1);
        });
        $gameMap.requestRefresh();
    }

    // アイテム復元
    function loadItem(v){
        for (const key in $gameVariables.value(v)) {
            gainItem($dataItems[key], $gameVariables.value(v)[key]);
        }
    }

    // アイテム保存
    function saveItem(v, itemType) {
        if (v === 0) return;

        const arr = getItemKeyArr(itemType);
        const objCopy = {};
        arr.forEach(el => objCopy[el] = $gameParty._items[el]);
        $gameVariables.setValue(v, objCopy);
    }

    // 武器保存
    function saveWeapon(v) {
        if (v === 0) return;

        const arr = Object.keys($gameParty._weapons);
        const objCopy = {};
        arr.forEach(el => objCopy[el] = $gameParty._weapons[el]);
        $gameVariables.setValue(v, objCopy);
    }

    // 武器復元
    function loadWeapon(v){
        if (v === 0) return;
        for (const key in $gameVariables.value(v)) {
            gainItem($dataWeapons[key], $gameVariables.value(v)[key]);
        }
    }

    // 武器消去
    function deleteWeapon(){
        const arr = Object.keys($gameParty._weapons);
        arr.forEach(el => {
            gainItem($dataWeapons[el], ($gameParty.maxItems($dataWeapons[el]) + $gameParty._actors.length) * -1);
        });
        $gameMap.requestRefresh();
    }

    // 防具保存
    function saveArmor(v) {
        if (v === 0) return;
        const arr = Object.keys($gameParty._armors);
        const objCopy = {};
        arr.forEach(el => objCopy[el] = $gameParty._armors[el]);
        $gameVariables.setValue(v, objCopy);
    }

    // 防具復元
    function loadArmor(v){
        if (v === 0) return;
        for (const key in $gameVariables.value(v)) {
            gainItem($dataArmors[key], $gameVariables.value(v)[key]);
        }
    }

    // 防具消去
    function deleteArmor(){
        const arr = Object.keys($gameParty._armors);
        arr.forEach(el => {
            gainItem($dataArmors[el], ($gameParty.maxItems($dataArmors[el]) + $gameParty._actors.length) * -1);
        });
        $gameMap.requestRefresh();
    }

})();
