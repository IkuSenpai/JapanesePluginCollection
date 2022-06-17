/*:
 * @plugindesc Equip a weapon or armor in the designated slot of the designated actor (variable).
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help ActorForceEquip.js
 * 
 * @command set
 * @text Subscribing actors with designated IDs
 * @desc Subscribing actors with designated IDs
 *
 * @arg Actor
 * @text ActorId
 * @desc ActorId
 * @type actor
 * @default 0
 * 
 * @arg SlotId
 * @text SlotId
 * @desc SlotId
 * @type number
 * @default 0
 * 
 * @arg Weapon
 * @text w
 * @desc w
 * @type weapon
 * 
 * @arg Insert
 * @text Insert
 * @desc Insert
 * @type boolean
 * @default false
 * 
 * @command reset
 * @text Remove the actor with the specified ID.
 * @desc Remove the actor with the specified ID.
 * 
 * @arg Actor
 * @text ActorId
 * @desc ActorId
 * @type actor
 * @default 0
 * 
 * @arg SlotId
 * @text SlotId
 * @desc SlotId
 * @type number
 * @default 0
 * 
 * @arg Armor
 * @text a
 * @desc a
 * @type armor
 * 
 * @arg Insert
 * @text Insert
 * @desc Insert
 * @type boolean
 * @default false
 * 
 * @command weaponSet
 * @text [変数指定版]指定アクターの指定スロットに武器を装備させます
 * @desc [変数指定版]指定アクターの指定スロットに武器を装備させます
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 0
 * 
 * @arg SlotId
 * @text SlotId
 * @desc SlotId
 * @type variable
 * @default 0
 * 
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type ItemId
 * 
 * @arg Insert
 * @text Insert
 * @desc Insert
 * @type boolean
 * @default false
 * 
 * @command armorSet
 * @text [変数指定版]指定アクターの指定スロットに防具を装備させます
 * @desc [変数指定版]指定アクターの指定スロットに防具を装備させます
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg SlotId
 * @text SlotId
 * @desc SlotId
 * @type variable
 * @default 1
 * 
 * @arg ItemId
 * @text itemId
 * @desc itemId
 * @type variable
 * @default 1
 * 
 * @arg Insert
 * @text Insert
 * @desc Insert
 * @type boolean
 * @default false
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 指定アクターの指定スロットに武器or防具を装備させます(変数指定可能)
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @command set
 * @text 指定アクターの指定スロットに武器を装備させます
 * @desc 指定アクターの指定スロットに武器を装備させます
 *
 * @arg Actor
 * @text アクター
 * @desc アクター
 * @type actor
 * 
 * @arg SlotId
 * @text スロットID
 * @desc スロットID
 * @type number
 * @default 0
 * 
 * @arg Weapon
 * @text 武器
 * @desc 武器リスト
 * @type weapon
 * 
 * @arg Insert
 * @text 上書きするかどうか
 * @desc 上書きするかどうか(trueにすると前に装備していたものは消えます)
 * @type boolean
 * @default false
 *
 * @command reset
 * @text 指定アクターの指定スロットに防具を装備させます
 * @desc 指定アクターの指定スロットに防具を装備させます
 * 
 * @arg Actor
 * @text アクター
 * @desc アクター
 * @type actor
 * 
 * @arg SlotId
 * @text スロットID
 * @desc スロットID
 * @type number
 * @default 0
 * 
 * @arg Armor
 * @text 防具
 * @desc 防具リスト
 * @type armor
 * 
 * @arg Insert
 * @text 上書きするかどうか
 * @desc 上書きするかどうか(trueにすると前に装備していたものは消えます)
 * @type boolean
 * @default false
 * 
 * @command weaponSet
 * @text [変数指定版]指定アクターの指定スロットに武器を装備させます
 * @desc [変数指定版]指定アクターの指定スロットに武器を装備させます
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg SlotId
 * @text スロットID
 * @desc スロットID
 * @type variable
 * @default 0
 * 
 * @arg ItemId
 * @text 武器ID
 * @desc 武器ID
 * @type variable
 * @default 1
 * 
 * @arg Insert
 * @text 上書きするかどうか
 * @desc 上書きするかどうか(trueにすると前に装備していたものは消えます)
 * @type boolean
 * @default false
 * 
 * @command armorSet
 * @text [変数指定版]指定アクターの指定スロットに防具を装備させます
 * @desc [変数指定版]指定アクターの指定スロットに防具を装備させます
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg SlotId
 * @text スロットID
 * @desc スロットID
 * @type variable
 * @default 0
 * 
 * @arg ItemId
 * @text 防具ID
 * @desc 防具ID
 * @type variable
 * @default 1
 * 
 * @arg Insert
 * @text 上書きするかどうか
 * @desc 上書きするかどうか(trueにすると前に装備していたものは消えます)
 * @type boolean
 * @default false
 * 
 * @help ActorForceEquip.js
 * 
 * 指定アクターの指定スロットに武器or防具を装備させるプラグインコマンドを追加します。
 * 基本的に変数指定版を活用することになります。
 * 
 * オプションのInsertをfalseにすると通常のツールの「装備変更」とほぼ同じ挙動となります。
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {
    const pluginName = 'ActorForceEquip';

    function RYBA_ForceEquipParam(args){
        let result = {};
        result.actorId = Number(args.Actor || 1);
        result.slotId = Number(args.SlotId || 0);
        if(args.Weapon){
            result.itemId = Number(args.Weapon || 1);
            result.item = $dataWeapons[result.itemId];
        }else if(args.Armor){
            result.itemId = Number(args.Armor || 1);
            result.item = $dataArmors[result.itemId];
        }
        result.insert = eval(args.Insert);
        return result;
    };
    function RYBA_ForceEquip(param){
        let actor = null;
        
        for (const act of $gameParty.allMembers()) {
            if( act.actorId() === param.actorId ){
                actor = act;
                break;
            }
        }
        if(!actor){
            return;
        }

        if(param.insert){
            console.log('forceChangeEquip');
            actor.forceChangeEquip(param.slotId,param.item);
        }else{
            console.log('oldItem.name()');
            actor.changeEquip(param.slotId, param.item);
        }
    };

   PluginManager.registerCommand(pluginName, 'set', args => {
     RYBA_ForceEquip(RYBA_ForceEquipParam(args));
   });
 
   PluginManager.registerCommand(pluginName, 'reset', args => {
    RYBA_ForceEquip(RYBA_ForceEquipParam(args));
   });

   PluginManager.registerCommand(pluginName, 'weaponSet', args => {]
    let result = {};
    result.actorId = $gameVariables.value(Number(args.Actor || 1));
    result.slotId = $gameVariables.value(Number(args.SlotId || 0));
    result.itemId = $gameVariables.value(Number(args.ItemId || 0));
    result.item = $dataWeapons[result.itemId];
    result.insert = eval(args.Insert);
    RYBA_ForceEquip(result);
   });

   PluginManager.registerCommand(pluginName, 'armorSet', args => {
    let result = {};
    result.actorId = $gameVariables.value(Number(args.Actor || 1));
    result.slotId = $gameVariables.value(Number(args.SlotId || 0));
    result.itemId = $gameVariables.value(Number(args.ItemId || 0));
    result.item = $dataArmors[result.itemId];
    result.insert = eval(args.Insert);
    RYBA_ForceEquip(result);
   });

 })();
 
