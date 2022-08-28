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
 * @arg
 * @arg SlotId
 * @text SlotId
 * @desc SlotId
 * @type number
 * @default 0
 * @arg WeaponId * @arg WeaponId * @text
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
 * @arg
 * @arg SlotId
 * @text SlotId
 * @desc SlotId
 * @type number
 * @default 0
 * @arg
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
 * @text [variable-specified version] Equips a weapon to the specified slot of the specified Actor.
 * @desc [variable-specified version] Equips a weapon to the specified slot of the specified Actor.
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
 * @arg
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
 * @text [variable-specified version] Equips armor to the specified slot of the specified actor.
 * @desc [variable specified] Equips armor to the specified slot of the specified actor.
 *
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * @arg
 * @arg SlotId
 * @text SlotId
 * @desc SlotId
 * @type variable
 * @default 1
 * @arg
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
 * @false
 * MIT License Copyright (c) 2020 RYBA
 * * @desc * @type boolean * @default false * * MIT License
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, and distribute the Software. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, The above copyright notice and this permission notice shall be governed by and construed in accordance with the laws of the State of California, U.S.A. without regard to its conflict of interest laws:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. in no event shall the authors or copyright holders be liable for any claim, damages or other LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. SOFTWARE.
 */
/*:en
 * @plugindesc Equips a weapon or armor to the specified slot of the specified actor.
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA (tropical fish)
 *
 * @command set
 * @text equip a weapon to the specified slot of the specified actor.
 * @desc Equips the specified actor with a weapon in the specified slot.
 *
 * @arg Actor
 * @text Actor
 * @desc actor
 * @type actor
 * * @arg
 * @arg SlotId
 * @text Slot ID
 * @desc Slot ID
 * @type number
 * @default 0
 *
 * @arg Weapon
 * @text weapon
 * @desc weapon list
 * @type weapon
 *
 * @arg Insert
 * @text Whether to overwrite or not.
 * @desc whether to overwrite (if true, previously equipped items will disappear)
 * @type boolean
 * @default false
 *
 * @command reset
 * @text equip armor to the specified slot of the specified actor.
 * @desc equips the specified actor with armor in the specified slot.
 *
 * @arg Actor
 * @text actor
 * @desc actor
 * @type actor
 * * @arg
 * @arg SlotId
 * @text Slot ID
 * @desc Slot ID
 * @type number
 * @default 0
 *
 * @arg Armor
 * @text armor
 * @desc armor list
 * @type armor
 *
 * @arg Insert
 * @text whether to overwrite or not
 * @desc whether to overwrite (if true, previously equipped items will disappear)
 * @type boolean
 * @default false
 *
 * @command weaponSet
 * @text [variable specified] Equips a weapon to the specified slot of the specified actor.
 * @desc [variable-specified version] Equips a weapon to the specified slot of the specified Actor.
 *
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * @arg
 * @arg SlotId
 * @text Slot ID
 * @desc Slot ID
 * @type variable
 * @default 0
 *
 * @arg ItemId
 * @text Weapon ID
 * @desc Weapon ID
 * @type variable
 * @default 1
 *
 * @arg Insert
 * @text whether to overwrite or not
 * @desc Whether to overwrite or not (if true, previously equipped items will disappear).
 * @type boolean
 * @default false
 *
 * @command armorSet
 * @text [variable specified] Equips armor to the specified slot of the specified actor.
 * @desc [variable specified] Equips armor to the specified slot of the specified actor.
 *
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * @arg
 * @arg SlotId
 * @text Slot ID
 * @desc Slot ID
 * @type variable
 * @default 0
 *
 * @arg ItemId
 * @text Armor ID
 * @desc Armor ID
 * @type variable
 * @default 1
 *
 * @arg Insert
 * @text whether to overwrite or not.
 * @desc Whether to overwrite or not (if true, previously equipped items will disappear).
 * @type boolean
 * @default false
 *
 * @help ActorForceEquip.js
 *
 * Add a plugin command to equip a weapon or armor to the specified slot of the specified actor.
 * Basically, you can use the variable version.
 *
 * If the Insert option is set to false, the behavior is almost the same as the normal tool's "Change Equip".
 *
 * Terms of Use:.
 * This gives all persons who obtain copies of this software and associated documentation files (the "Software") the right to.
 * Permission is hereby granted to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge and distribute the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions.
 * Publish, distribute, sublicense and/or sell copies of the Software, subject to the following conditions
 * Permission is hereby granted to any person to whom the Software is furnished to do so.
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
            actor.changeEquip(param.slotId, param.item); }
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


 
