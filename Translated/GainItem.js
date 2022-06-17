/*:
 * @plugindesc Increases or decreases the number of items, weapons and armor of the specified variable ID
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 * 
 * @command item
 * @text Increases or decreases the item
 * @desc Increases or decreases the item
 *
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type variable
 * 
 * @arg Operation
 * @text operation
 * @desc operation
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text Value
 * @desc Value
 * @type number
 *
 * @command weapon
 * @text Increases or decreases the weapon
 * @desc Increases or decreases the weapon
 * 
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type variable
 * 
 * @arg Operation
 * @text operation
 * @desc operation
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text Value
 * @desc Value
 * @type number
 * 
 * @arg IsEquipment
 * @text IsEquipment
 * @desc IsEquipment
 * @type boolean
 * @default false
 * 
 * @command armor
 * @text Increases or decreases the armor
 * @desc Increases or decreases the armor
 * 
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type variable
 * 
 * @arg Operation
 * @text operation
 * @desc operation
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text Value
 * @desc Value
 * @type number
 * 
 * @arg IsEquipment
 * @text IsEquipment
 * @desc IsEquipment
 * @type boolean
 * @default false
 * 
 * @command itemVariable
 * @text Increases or decreases the item
 * @desc Increases or decreases the item
 * 
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type variable
 * 
 * @arg Operation
 * @text operation
 * @desc operation
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text Value
 * @desc Value
 * @type number
 *
 * @command weaponVariable
 * @text Increases or decreases the weapon
 * @desc Increases or decreases the weapon
 * 
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type variable
 * 
 * @arg Operation
 * @text operation
 * @desc operation
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text Value
 * @desc Value
 * @type number
 * 
 * @arg IsEquipment
 * @text IsEquipment
 * @desc IsEquipment
 * @type boolean
 * @default false
 * 
 * @command armorVariable
 * @text Increases or decreases the armor
 * @desc Increases or decreases the armor
 * 
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type variable
 * 
 * @arg Operation
 * @text operation
 * @desc operation
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text Value
 * @desc Value
 * @type number
 * 
 * @arg IsEquipment
 * @text IsEquipment
 * @desc IsEquipment
 * @type boolean
 * @default false
 * 
 * @help GainItem.js
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 指定した変数のＩＤのアイテム・武器・防具を増減します
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @command item
 * @text 指定変数のIDのアイテムを増減します
 * @desc 指定変数のIDのアイテムを増減します
 *
 * @arg ItemId
 * @text アイテムID
 * @desc アイテムID
 * @type variable
 * 
 * @arg Operation
 * @text 増減設定
 * @desc true=増加,false減少
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text 数値
 * @desc 数値
 * @type number
 * @default 1
 *
 * @command weapon
 * @text 指定変数のIDの武器を増減します
 * @desc 指定変数のIDの武器を増減します
 * 
 * @arg ItemId
 * @text アイテムID
 * @desc アイテムID
 * @type variable
 * 
 * @arg Operation
 * @text 増減設定
 * @desc true=増加,false減少
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text 数値
 * @desc 数値
 * @type number
 * @default 1
 * 
 * @arg IsEquipment
 * @text trueで装備品含める
 * @desc trueで装備品含める
 * @type boolean
 * @default false
 * 
 * @command armor
 * @text 指定変数のIDの防具を増減します
 * @desc 指定変数のIDの防具を増減します
 * 
 * @arg ItemId
 * @text アイテムID
 * @desc アイテムID
 * @type variable
 * 
 * @arg Operation
 * @text 増減設定
 * @desc true=増加,false減少
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text 数値
 * @desc 数値
 * @type number
 * @default 1
 * 
 * @arg IsEquipment
 * @text trueで装備品含める
 * @desc trueで装備品含める
 * @type boolean
 * @default true
 * 
 * @command itemVariable
 * @text [数量変数]指定変数のIDのアイテムを増減します
 * @desc [数量変数]指定変数のIDのアイテムを増減します
 *
 * @arg ItemId
 * @text アイテムID
 * @desc アイテムID
 * @type variable
 * 
 * @arg Operation
 * @text 増減設定
 * @desc true=増加,false減少
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text 数値[変数]
 * @desc 数値[変数]
 * @type variable
 *
 * @command weaponVariable
 * @text [数量変数]指定変数のIDの武器を増減します
 * @desc [数量変数]指定変数のIDの武器を増減します
 * 
 * @arg ItemId
 * @text アイテムID
 * @desc アイテムID
 * @type variable
 * 
 * @arg Operation
 * @text 増減設定
 * @desc true=増加,false減少
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text 数値[変数]
 * @desc 数値[変数]
 * @type variable
 * 
 * @arg IsEquipment
 * @text trueで装備品含める
 * @desc trueで装備品含める
 * @type boolean
 * @default false
 * 
 * @command armorVariable
 * @text [数量変数]指定変数のIDの防具を増減します
 * @desc [数量変数]指定変数のIDの防具を増減します
 * 
 * @arg ItemId
 * @text アイテムID
 * @desc アイテムID
 * @type variable
 * 
 * @arg Operation
 * @text 増減設定
 * @desc true=増加,false減少
 * @type boolean
 * @default true
 * 
 * @arg Value
 * @text 数値[変数]
 * @desc 数値[変数]
 * @type variable
 * 
 * @arg IsEquipment
 * @text trueで装備品含める
 * @desc trueで装備品含める
 * @type boolean
 * @default true
 * 
 * @help GainItem.js
 * 
 * 指定した変数のＩＤのアイテム・武器・防具を増減します
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {

    const pluginName = 'GainItem';

    function RYBA_ItemGain(param,operandType,dataList){
        const itemIdVariable = Number(param.ItemId);
        const itemId = $gameVariables.value(itemIdVariable);
        const operation = eval(param.Operation);
        const operationValue = operation ? 0 : 1;
        const value = Game_Interpreter.prototype.operateValue(operationValue, operandType,Number(param.Value));
        let isEquipment = false;
        if(param.IsEquipment){
            isEquipment = eval(param.IsEquipment);
        }
        $gameParty.gainItem(dataList[itemId], value, isEquipment);
    }

    PluginManager.registerCommand(pluginName, 'item', args => {
        RYBA_ItemGain(args,0,$dataItems);
    });

    PluginManager.registerCommand(pluginName, 'weapon', args => {
        RYBA_ItemGain(args,0,$dataWeapons);
    });

    PluginManager.registerCommand(pluginName, 'armor', args => {
        RYBA_ItemGain(args,0,$dataArmors);
    });

    PluginManager.registerCommand(pluginName, 'itemVariable', args => {
        RYBA_ItemGain(args,1,$dataItems);
    });

    PluginManager.registerCommand(pluginName, 'weaponVariable', args => {
        RYBA_ItemGain(args,1,$dataWeapons);
    });

    PluginManager.registerCommand(pluginName, 'armorVariable', args => {
        RYBA_ItemGain(args,1,$dataArmors);
    });

})();