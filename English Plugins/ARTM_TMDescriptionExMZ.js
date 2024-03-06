// ===================================================
// ARTM_TMDescriptionExMZ
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 Initial release
// 1.1.0 Added specialized parameters
// 1.1.1 Bug fixes when UI option is OFF
//=============================================================================
// TMVplugin - Detailed Description Window
// Version: 2.0.3
// Last Update: 2017/02/21
// Distribution: http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2016 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:en
 * @target MZ
 * @plugindesc Adds functionality to display detailed information about items and skills.
 * @author Artemis
 *
 * @param descriptionKeyCode
 * @desc Key to use as the description button
 * Default: 65
 * @default 65
 *
 * @param leftPaneWidth
 * @desc Width of the left parameter pane
 * Default: 300
 * @default 300
 *
 * @param rightPaneWidth
 * @desc Width of the right parameter pane
 * Default: 400
 * @default 400
 *
 * @param horzLineHeight
 * @desc Height including the margin of horizontal lines
 * Default: 28
 * @default 28
 *
 * @param secretItemA
 * @desc Type name of secret item A
 * Default: Secret Item A
 * @default Secret Item A
 *
 * @param secretItemB
 * @desc Type name of secret item B
 * Default: Secret Item B
 * @default Secret Item B
 *
 * @param consumableText
 * @desc Item consumption label
 * Default: Consumption
 * @default Consumption
 *
 * @param occasionText
 * @desc Label for usable occasions
 * Default: Limit
 * @default Limit
 *
 * @param scopeText
 * @desc Label for scope
 * Default: Scope
 * @default Scope
 *
 * @param speedText
 * @desc Label for speed adjustment
 * Default: Speed
 * @default Speed
 *
 * @param successRateText
 * @desc Label for success rate
 * Default: Success Rate
 * @default Success Rate
 *
 * @param repeatsText
 * @desc Label for repeat count
 * Default: Repeat Count
 * @default Repeat Count
 *
 * @param tpGainText
 * @desc Label for TP gain
 * Default: TP Gain
 * @default TP Gain
 *
 * @param hitTypeText
 * @desc Label for hit type
 * Default: Hit Type
 * @default Hit Type
 *
 * @param priceText
 * @desc Label for price
 * Default: Sale Price
 * @default Sale Price
 *
 * @param priceRate
 * @desc Price display multiplier
 * Default: 0.5
 * @default 0.5
 *
 * @param mpCostText
 * @desc Label for MP cost
 * Default: MP Cost
 * @default MP Cost
 *
 * @param tpCostText
 * @desc Label for TP cost
 * Default: TP Cost
 * @default TP Cost
 *
 * @param requiredWtypeText
 * @desc Label for required weapon type
 * Default: Required Weapon
 * @default Required Weapon
 *
 * @param effectText
 * @desc Label for usage effect
 * Default: Effect
 * @default Effect
 *
 * @param traitText
 * @desc Label for traits
 * Default: Traits
 * @default Traits
 *
 * @param plainText
 * @desc Label for details
 * Default: Details
 * @default Details
 *
 * @param effectTextRecoverHp
 * @desc HP recovery format
 * Default: Recovers %1 HP
 * @default Recovers %1 HP
 *
 * @param effectTextRecoverMp
 * @desc MP recovery format
 * Default: Recovers %1 MP
 * @default Recovers %1 MP
 *
 * @param effectTextGainTp
 * @desc TP increase format
 * Default: Increases TP by %1
 * @default Increases TP by %1
 *
 * @param effectTextAddState
 * @desc Add state format
 * Default: Adds %1 with %2% chance
 * @default Adds %1 with %2% chance
 *
 * @param effectTextRemoveState
 * @desc Remove state format
 * Default: Removes %1 with %2% chance
 * @default Removes %1 with %2% chance
 *
 * @param effectTextAddBuff
 * @desc Buff format
 * Default: %1 Up for %2 turns
 * @default %1 Up for %2 turns
 *
 * @param effectTextAddDebuff
 * @desc Debuff format
 * Default: %1 Down for %2 turns
 * @default %1 Down for %2 turns
 *
 * @param effectTextRemoveBuff
 * @desc Buff removal format
 * Default: Removes %1 Up effect
 * @default Removes %1 Up effect
 *
 * @param effectTextRemoveDebuff
 * @desc Debuff removal format
 * Default: Removes %1 Down effect
 * @default Removes %1 Down effect
 *
 * @param effectTextSpecial
 * @desc Special effect format
 * Default: Retreats from battle
 * @default Retreats from battle
 *
 * @param effectTextGrow
 * @desc Growth format
 * Default: %1 permanently increases by %2
 * @default %1 permanently increases by %2
 *
 * @param effectTextLearnSkill
 * @desc Learn skill format
 * Default: Learns %1
 * @default Learns %1
 *
 * @param damageTextDamageHp
 * @desc Format for damage type 'HP Damage'
 * Default: Deals %1 damage to HP
 * @default Deals %1 damage to HP
 *
 * @param damageTextDamageMp
 * @desc Format for damage type 'MP Damage'
 * Default: Deals %1 damage to MP
 * @default Deals %1 damage to MP
 *
 * @param damageTextRecoverHp
 * @desc Format for damage type 'HP Recovery'
 * Default: Recovers HP
 * @default Recovers HP
 *
 * @param damageTextRecoverMp
 * @desc Format for damage type 'MP Recovery'
 * Default: Recovers MP
 * @default Recovers MP
 *
 * @param damageTextDrainHp
 * @desc Format for damage type 'HP Absorption'
 * Default: Absorbs dealt damage as HP
 * @default Absorbs dealt damage as HP
 *
 * @param damageTextDrainMp
 * @desc Format for damage type 'MP Absorption'
 * Default: Absorbs dealt damage as MP
 * @default Absorbs dealt damage as MP
 *
 * @param traitTextElementRate
 * @desc Format for element effectiveness
 * Default: %1 resistance %2%
 * @default %1 resistance %2%
 *
 * @param traitTextDebuffRate
 * @desc Format for debuff effectiveness
 * Default: %1 debuff resistance %2%
 * @default %1 debuff resistance %2%
 *
 * @param traitTextStateRate
 * @desc Format for state effectiveness
 * Default: %1 resistance %2%
 * @default %1 resistance %2%
 *
 * @param traitTextStateResist
 * @desc Format for state nullification
 * Default: %1 invalid
 * @default %1 invalid
 *
 * @param traitTextParam
 * @desc Format for basic parameters
 * Default: %1 %2%
 * @default %1 %2%
 *
 * @param traitTextXparam
 * @desc Format for additional parameters
 * Default: %1 %2
 * @default %1 %2
 *
 * @param traitTextSparam
 * @desc Format for special parameters
 * Default: %1 %2%
 * @default %1 %2%
 *
 * @param traitTextAttackElement
 * @desc Format for attack element
 * Default: Adds %1 to attack
 * @default Adds %1 to attack
 *
 * @param traitTextAttackState
 * @desc Format for attack state
 * Default: Adds %1 with %2% chance during attack
 * @default Adds %1 with %2% chance during attack
 *
 * @param traitTextAttackSpeed
 * @desc Format for attack speed adjustment
 * Default: Attack speed %1
 * @default Attack speed %1
 *
 * @param traitTextAttackTimes
 * @desc Format for additional attack times
 * Default: Attack times %1
 * @default Attack times %1
 *
 * @param traitTextStypeAdd
 * @desc Format for added skill type
 * Default: %1 usable
 * @default %1 usable
 *
 * @param traitTextStypeSeal
 * @desc Format for sealed skill type
 * Default: %1 unusable
 * @default %1 unusable
 *
 * @param traitTextSkillAdd
 * @desc Format for added skill
 * Default: %1 usable
 * @default %1 usable
 *
 * @param traitTextSkillSeal
 * @desc Format for sealed skill
 * Default: %1 unusable
 * @default %1 unusable
 *
 * @param traitTextEquipWtype
 * @desc Format for equipped weapon type
 * Default: %1 can be equipped
 * @default %1 can be equipped
 *
 * @param traitTextEquipAtype
 * @desc Format for equipped armor type
 * Default: %1 can be equipped
 * @default %1 can be equipped
 *
 * @param traitTextEquipLock
 * @desc Format for locked equipment
 * Default: 
 * @default 
 *
 * @param traitTextEquipSeal
 * @desc Format for sealed equipment
 * Default: %1 cannot be equipped
 * @default %1 cannot be equipped
 *
 * @param traitTextActionPlus
 * @desc Format for additional action times
 * Default: %1% chance of consecutive actions
 * @default %1% chance of consecutive actions
 *
 * @param xparamText
 * @desc Names of additional parameter items (comma-separated, 10 items)
 * Default: Hit, Evasion, Critical, Critical Evasion, Magic Evasion, Magic Reflection, Counter, HP Regen, MP Regen, TP Regen
 * @default Hit, Evasion, Critical, Critical Evasion, Magic Evasion, Magic Reflection, Counter, HP Regen, MP Regen, TP Regen
 *
 * @param sparamText
 * @desc Names of special parameter items (comma-separated, 10 items)
 * Default: Target Rate, Guard Effect, Recovery Effect, Item Knowledge, MP Cost, TP Charge, Physical Damage, Magical Damage, Floor Damage, Experience Gain
 * @default Target Rate, Guard Effect, Recovery Effect, Item Knowledge, MP Cost, TP Charge, Physical Damage, Magical Damage, Floor Damage, Experience Gain
 *
 * @param consumableValue
 * @desc Values for consumable (comma-separated)
 * Default: Yes, No
 * @default Yes, No
 *
 * @param occasionValue
 * @desc Values for usable occasions
 * Default: None, Battle Only, Menu Only, Not Usable
 * @default None, Battle Only, Menu Only, Not Usable
 *
 * @param scopeValue
 * @desc Values for skill scope (comma-separated, 12 items)
 * Default: None, Enemy Single, Enemy All, Enemy 1, Enemy 2, Enemy 3, Enemy 4, Ally Single, Ally All, Ally Single, Ally All, User
 * @default None, Enemy Single, Enemy All, Enemy 1, Enemy 2, Enemy 3, Enemy 4, Ally Single, Ally All, Ally Single, Ally All, User
 *
 * @param hitTypeValue
 * @desc Values for hit type
 * Default: Sure Hit, Physical, Magic
 * @default Sure Hit, Physical, Magic
 *
 * @param slotTypeValue
 * @desc Values for special ability type
 * Default: Dual Wield Not Allowed, Dual Wield Allowed
 * @default Dual Wield Not Allowed, Dual Wield Allowed
 *
 * @param specialFlagValue
 * @desc Values for special flags
 * Default: Auto Battle, Guard, Substitute, Retain TP
 * @default Auto Battle, Guard, Substitute, Retain TP
 *
 * @param partyAbilityValue
 * @desc Values for party abilities (comma-separated, 6 items)
 * Default: Encounter Half, Encounter None, Surprise None, Preemptive Attack Up, Double Money, Double Item Drop
 * @default Encounter Half, Encounter None, Surprise None, Preemptive Attack Up, Double Money, Double Item Drop
 *
 * @param elementFooter
 * @desc Element suffix
 * Default: Element
 * @default Element
 *
 * @param costExTextHp
 * @desc Format for HP cost (requires TMSkillCostEx.js)
 * Default: Consumes %1 HP
 * @default Consumes %1 HP
 *
 * @param costExTextItem
 * @desc Format for item cost (requires TMSkillCostEx.js)
 * Default: Consumes %2 %1
 * @default Consumes %2 %1
 *
 * @param costExTextExp
 * @desc Format for experience cost (requires TMSkillCostEx.js)
 * Default: Consumes %1 experience
 * @default Consumes %1 experience
 *
 * @param costExTextGold
 * @desc Format for gold cost (requires TMSkillCostEx.js)
 * Default: Consumes %1 gold
 * @default Consumes %1 gold
 *
 * @param passiveAlwaysText
 * @desc Format for always active (requires TMPassiveSkill.js)
 * Default: Effect is always applied
 * @default Effect is always applied
 *
 * @param passiveTpText
 * @desc Format for activation at TP ○○ or more (requires TMPassiveSkill.js)
 * Default: Activates when TP is %1 or more
 * @default Activates when TP is %1 or more
 *
 * @param passiveTpText2
 * @desc Format for activation at TP ○○ or less (requires TMPassiveSkill.js)
 * Default: Activates when TP is %1 or less
 * @default Activates when TP is %1 or less
 *
 * @param passiveStateText
 * @desc Format for activation in ○○ state (requires TMPassiveSkill.js)
 * Default: Activates when in %1 state
 * @default Activates when in %1 state
 *
 * @help ARTM_TMDescriptionExMZ
 *
 * This is an MZ port of the "Detailed Description Window" plugin by tomoaky.
 * The basic functionality remains unchanged.
 * 
 * How to use:
 *
 *   With this plugin, pressing the A key during item or skill selection opens the detailed description window.
 *   You can also open it by clicking (tapping) the help window.
 *
 *   The key to use can be set by changing the value of descriptionKeyCode.
 *   Set it to a key not assigned to other functions, such as X or Z.
 *
 *   There are no plugin commands for this plugin.
 * 
 *   This plugin has been tested with RPG Maker MZ version 1.3.4.
 *
 * Note tags (Skills, Items, Weapons, Armors):
 *
 *   <dType:Material>       # Sets the type name (displayed in the top right) to Material
 *   <dText:Text>           # Adds text to the bottom of the right parameter window (supports line breaks)
 *   <dPlnText:Detailed Text>  # Displays only the detailed text in the center of the screen (supports line breaks)
 */

var Imported = Imported || {};
Imported.TMDescriptionEx = true;

var TMPlugin = TMPlugin || {};
TMPlugin.DescriptionEx = {};
TMPlugin.DescriptionEx.Parameters = PluginManager.parameters("ARTM_TMDescriptionExMZ");
TMPlugin.DescriptionEx.LeftPaneWidth = +TMPlugin.DescriptionEx.Parameters["leftPaneWidth"];
TMPlugin.DescriptionEx.RightPaneWidth = +TMPlugin.DescriptionEx.Parameters["rightPaneWidth"];
TMPlugin.DescriptionEx.HorzLineHeight = +TMPlugin.DescriptionEx.Parameters["horzLineHeight"];
TMPlugin.DescriptionEx.SecretItemA = TMPlugin.DescriptionEx.Parameters["secretItemA"];
TMPlugin.DescriptionEx.SecretItemB = TMPlugin.DescriptionEx.Parameters["secretItemB"];
TMPlugin.DescriptionEx.ConsumableText = TMPlugin.DescriptionEx.Parameters["consumableText"];
TMPlugin.DescriptionEx.OccasionText = TMPlugin.DescriptionEx.Parameters["occasionText"];
TMPlugin.DescriptionEx.ScopeText = TMPlugin.DescriptionEx.Parameters["scopeText"];
TMPlugin.DescriptionEx.SpeedText = TMPlugin.DescriptionEx.Parameters["speedText"];
TMPlugin.DescriptionEx.SuccessRateText = TMPlugin.DescriptionEx.Parameters["successRateText"];
TMPlugin.DescriptionEx.RepeatsText = TMPlugin.DescriptionEx.Parameters["repeatsText"];
TMPlugin.DescriptionEx.TpGainText = TMPlugin.DescriptionEx.Parameters["tpGainText"];
TMPlugin.DescriptionEx.HitTypeText = TMPlugin.DescriptionEx.Parameters["hitTypeText"];
TMPlugin.DescriptionEx.PriceText = TMPlugin.DescriptionEx.Parameters["priceText"];
TMPlugin.DescriptionEx.PriceRate = +TMPlugin.DescriptionEx.Parameters["priceRate"];
TMPlugin.DescriptionEx.MpCostText = TMPlugin.DescriptionEx.Parameters["mpCostText"];
TMPlugin.DescriptionEx.TpCostText = TMPlugin.DescriptionEx.Parameters["tpCostText"];
TMPlugin.DescriptionEx.RequiredWtypeText = TMPlugin.DescriptionEx.Parameters["requiredWtypeText"];
TMPlugin.DescriptionEx.EffectText = TMPlugin.DescriptionEx.Parameters["effectText"];
TMPlugin.DescriptionEx.TraitText = TMPlugin.DescriptionEx.Parameters["traitText"];
TMPlugin.DescriptionEx.PlainText = TMPlugin.DescriptionEx.Parameters["plainText"];
TMPlugin.DescriptionEx.EffectTextRecoverHp = TMPlugin.DescriptionEx.Parameters["effectTextRecoverHp"];
TMPlugin.DescriptionEx.EffectTextRecoverMp = TMPlugin.DescriptionEx.Parameters["effectTextRecoverMp"];
TMPlugin.DescriptionEx.EffectTextGainTp = TMPlugin.DescriptionEx.Parameters["effectTextGainTp"];
TMPlugin.DescriptionEx.EffectTextAddState = TMPlugin.DescriptionEx.Parameters["effectTextAddState"];
TMPlugin.DescriptionEx.EffectTextRemoveState = TMPlugin.DescriptionEx.Parameters["effectTextRemoveState"];
TMPlugin.DescriptionEx.EffectTextAddBuff = TMPlugin.DescriptionEx.Parameters["effectTextAddBuff"];
TMPlugin.DescriptionEx.EffectTextAddDebuff = TMPlugin.DescriptionEx.Parameters["effectTextAddDebuff"];
TMPlugin.DescriptionEx.EffectTextRemoveBuff = TMPlugin.DescriptionEx.Parameters["effectTextRemoveBuff"];
TMPlugin.DescriptionEx.EffectTextRemoveDebuff = TMPlugin.DescriptionEx.Parameters["effectTextRemoveDebuff"];
TMPlugin.DescriptionEx.EffectTextSpecial = TMPlugin.DescriptionEx.Parameters["effectTextSpecial"];
TMPlugin.DescriptionEx.EffectTextGrow = TMPlugin.DescriptionEx.Parameters["effectTextGrow"];
TMPlugin.DescriptionEx.EffectTextLearnSkill = TMPlugin.DescriptionEx.Parameters["effectTextLearnSkill"];
TMPlugin.DescriptionEx.DamageTextDamageHp  = TMPlugin.DescriptionEx.Parameters["damageTextDamageHp"];
TMPlugin.DescriptionEx.DamageTextDamageMp  = TMPlugin.DescriptionEx.Parameters["damageTextDamageMp"];
TMPlugin.DescriptionEx.DamageTextRecoverHp = TMPlugin.DescriptionEx.Parameters["damageTextRecoverHp"];
TMPlugin.DescriptionEx.DamageTextRecoverMp = TMPlugin.DescriptionEx.Parameters["damageTextRecoverMp"];
TMPlugin.DescriptionEx.DamageTextDrainHp   = TMPlugin.DescriptionEx.Parameters["damageTextDrainHp"];
TMPlugin.DescriptionEx.DamageTextDrainMp   = TMPlugin.DescriptionEx.Parameters["damageTextDrainMp"];
TMPlugin.DescriptionEx.TraitTextElementRate = TMPlugin.DescriptionEx.Parameters["traitTextElementRate"];
TMPlugin.DescriptionEx.TraitTextDebuffRate = TMPlugin.DescriptionEx.Parameters["traitTextDebuffRate"];
TMPlugin.DescriptionEx.TraitTextStateRate = TMPlugin.DescriptionEx.Parameters["traitTextStateRate"];
TMPlugin.DescriptionEx.TraitTextStateResist = TMPlugin.DescriptionEx.Parameters["traitTextStateResist"];
TMPlugin.DescriptionEx.TraitTextParam = TMPlugin.DescriptionEx.Parameters["traitTextParam"];
TMPlugin.DescriptionEx.TraitTextXparam = TMPlugin.DescriptionEx.Parameters["traitTextXparam"];
TMPlugin.DescriptionEx.TraitTextSparam = TMPlugin.DescriptionEx.Parameters["traitTextSparam"];
TMPlugin.DescriptionEx.TraitTextAttackElement = TMPlugin.DescriptionEx.Parameters["traitTextAttackElement"];
TMPlugin.DescriptionEx.TraitTextAttackState = TMPlugin.DescriptionEx.Parameters["traitTextAttackState"];
TMPlugin.DescriptionEx.TraitTextAttackSpeed = TMPlugin.DescriptionEx.Parameters["traitTextAttackSpeed"];
TMPlugin.DescriptionEx.TraitTextAttackTimes = TMPlugin.DescriptionEx.Parameters["traitTextAttackTimes"];
TMPlugin.DescriptionEx.TraitTextStypeAdd = TMPlugin.DescriptionEx.Parameters["traitTextStypeAdd"];
TMPlugin.DescriptionEx.TraitTextStypeSeal = TMPlugin.DescriptionEx.Parameters["traitTextStypeSeal"];
TMPlugin.DescriptionEx.TraitTextSkillAdd = TMPlugin.DescriptionEx.Parameters["traitTextSkillAdd"];
TMPlugin.DescriptionEx.TraitTextSkillSeal = TMPlugin.DescriptionEx.Parameters["traitTextSkillSeal"];
TMPlugin.DescriptionEx.TraitTextEquipWtype = TMPlugin.DescriptionEx.Parameters["traitTextEquipWtype"];
TMPlugin.DescriptionEx.TraitTextEquipAtype = TMPlugin.DescriptionEx.Parameters["traitTextEquipAtype"];
TMPlugin.DescriptionEx.TraitTextEquipLock = TMPlugin.DescriptionEx.Parameters["traitTextEquipLock"];
TMPlugin.DescriptionEx.TraitTextEquipSeal = TMPlugin.DescriptionEx.Parameters["traitTextEquipSeal"];
TMPlugin.DescriptionEx.TraitTextActionPlus = TMPlugin.DescriptionEx.Parameters["traitTextActionPlus"];
TMPlugin.DescriptionEx.XparamText = TMPlugin.DescriptionEx.Parameters["xparamText"].split(",");
TMPlugin.DescriptionEx.SparamText = TMPlugin.DescriptionEx.Parameters["sparamText"].split(",");
TMPlugin.DescriptionEx.ConsumableValue = TMPlugin.DescriptionEx.Parameters["consumableValue"].split(",");
TMPlugin.DescriptionEx.OccasionValue = TMPlugin.DescriptionEx.Parameters["occasionValue"].split(",");
TMPlugin.DescriptionEx.ScopeValue = TMPlugin.DescriptionEx.Parameters["scopeValue"].split(",");
TMPlugin.DescriptionEx.HitTypeValue = TMPlugin.DescriptionEx.Parameters["hitTypeValue"].split(",");
TMPlugin.DescriptionEx.SlotTypeValue = TMPlugin.DescriptionEx.Parameters["slotTypeValue"].split(",");
TMPlugin.DescriptionEx.SpecialFlagValue = TMPlugin.DescriptionEx.Parameters["specialFlagValue"].split(",");
TMPlugin.DescriptionEx.PartyAbilityValue = TMPlugin.DescriptionEx.Parameters["partyAbilityValue"].split(",");
TMPlugin.DescriptionEx.ElementFooter = TMPlugin.DescriptionEx.Parameters["elementFooter"];
TMPlugin.DescriptionEx.CostExTextHp   = TMPlugin.DescriptionEx.Parameters["costExTextHp"];
TMPlugin.DescriptionEx.CostExTextItem = TMPlugin.DescriptionEx.Parameters["costExTextItem"];
TMPlugin.DescriptionEx.CostExTextExp  = TMPlugin.DescriptionEx.Parameters["costExTextExp"];
TMPlugin.DescriptionEx.CostExTextGold = TMPlugin.DescriptionEx.Parameters["costExTextGold"];
TMPlugin.DescriptionEx.PassiveAlwaysText = TMPlugin.DescriptionEx.Parameters["passiveAlwaysText"];
TMPlugin.DescriptionEx.PassiveTpText = TMPlugin.DescriptionEx.Parameters["passiveTpText"];
TMPlugin.DescriptionEx.PassiveTpText2 = TMPlugin.DescriptionEx.Parameters["passiveTpText2"];
TMPlugin.DescriptionEx.PassiveStateText = TMPlugin.DescriptionEx.Parameters["passiveStateText"];

(() => {

    //-----------------------------------------------------------------------------
    // Input
    //

    Input.keyMapper[+TMPlugin.DescriptionEx.Parameters["descriptionKeyCode"]] = "description";

    //-----------------------------------------------------------------------------
    // Window_Selectable
    //

    const _Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
    Window_Selectable.prototype.processHandling = function() {
        if (this.isOpenAndActive() &&
            this.isDescriptionEnabled() &&
            this.isDescriptionTriggered()) {
             this.processDescription();
        } else {
            _Window_Selectable_processHandling.call(this);
        }
    };

    Window_Selectable.prototype.isDescriptionEnabled = function() {
        return this.isHandled("description");
    };

    Window_Selectable.prototype.isDescriptionTriggered = function() {
        if (this._helpWindow && TouchInput.isTriggered()) {
            const wx = (Graphics.width - Graphics.boxWidth) / 2 + this._helpWindow.x;
            const wy = (Graphics.height - Graphics.boxHeight) / 2 + this._helpWindow.y;
            return (
                TouchInput.x >= wx && 
                TouchInput.x < wx + this._helpWindow.width &&
                TouchInput.y >= wy &&
                TouchInput.y < wy + this._helpWindow.height
            );
        }
        return Input.isRepeated("description");
    };

    Window_Selectable.prototype.processDescription = function() {
        if (this.isCurrentItemDescriptionEnabled()) {
            SoundManager.playOk();
            this.updateInputData();
            this.deactivate();
            this.callDescriptionHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    Window_Selectable.prototype.isCurrentItemDescriptionEnabled = function() {
        return true;
    };
    
    Window_Selectable.prototype.callDescriptionHandler = function() {
        if (this.isHandled("description")) {
            this._handlers["description"](this);
        }
    };
    
    //-----------------------------------------------------------------------------
    // Window_ItemList
    //

    Window_ItemList.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_SkillList
    //

    Window_SkillList.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_EquipSlot
    //

    Window_EquipSlot.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_ShopBuy
    //

    Window_ShopBuy.prototype.isCurrentItemDescriptionEnabled = function() {
        return this.item();
    };
    
    //-----------------------------------------------------------------------------
    // Window_Message
    //
    
    Window_Message.prototype.setDescriptionExWindow = function(descriptionExWindow) {
        this._descriptionExWindow = descriptionExWindow;
    };

    const _Window_Message_isAnySubWindowActive = Window_Message.prototype.isAnySubWindowActive;
    Window_Message.prototype.isAnySubWindowActive = function() {
        return (
            _Window_Message_isAnySubWindowActive.call(this) ||
            this._descriptionExWindow.active
        );
    };

    //-----------------------------------------------------------------------------
    // Window_DescriptionEx
    //

    function Window_DescriptionEx() {
        this.initialize.apply(this, arguments);
    }

    Window_DescriptionEx.prototype = Object.create(Window_Selectable.prototype);
    Window_DescriptionEx.prototype.constructor = Window_DescriptionEx;

    Window_DescriptionEx.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.openness = 0;
    };

    Window_DescriptionEx.prototype.setItem = function(item) {
        if (this._item !== item) {
            this._item = item;
            this.refresh();
        }
    };

    Window_DescriptionEx.prototype.refresh = function() {
        this.contents.clear();
        if (this._item) {
            if (DataManager.isItem(this._item)) {
                this.refreshItem();
            } else if (DataManager.isWeapon(this._item)) {
                this.refreshWeapon();
            } else if (DataManager.isArmor(this._item)) {
                this.refreshArmor();
            } else if (DataManager.isSkill(this._item)) {
                this.refreshSkill();
            }
        }
    };

    Window_DescriptionEx.prototype.refreshItem = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawItemType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
            this.drawItemParameters(x, y);
            this.drawEffects(
                this.contents.width - x - descEx.RightPaneWidth, y
            );
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };

    Window_DescriptionEx.prototype.refreshWeapon = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawWeaponType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
           this.drawEquipParameters(x, y);
           this.drawTraits(
               this.contents.width - x - descEx.RightPaneWidth, y
           );
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };

    Window_DescriptionEx.prototype.refreshArmor = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawArmorType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
            this.drawEquipParameters(x, y);
            this.drawTraits(
                this.contents.width - x - descEx.RightPaneWidth, y
            );
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };
    
    Window_DescriptionEx.prototype.refreshSkill = function() {
        const descEx = TMPlugin.DescriptionEx;
        const profileY = this.profileY();
        const x = this.itemPadding();
        let y = 0;
        this.drawItemName(this._item, 0, y);
        this.drawSkillType();
        y = this.drawHorzLineUpper(y);
        if (this._item.meta.dPlnText) {
            this.drawPlainText(x, y);
        } else {
            if (Imported.TMPassiveSkill && this._item.meta.passive) {
              this.drawPassiveSkillParameters(x, y);
            } else {
              this.drawSkillParameters(x, y);
              this.drawEffects(
                  this.contents.width - x - descEx.RightPaneWidth, y
              );
            }
        }
        y = this.drawHorzLineLower(profileY);
        this.drawProfile(0, y);
    };

    Window_DescriptionEx.prototype.drawItemType = function() {
        const descEx = TMPlugin.DescriptionEx;
        let text;
        if (this._item.meta.dType) {
          text = this._item.meta.dType;
        } else if (this._item.itypeId === 1) {
          text = TextManager.item;
        } else if (this._item.itypeId === 2) {
          text = TextManager.keyItem;
        } else if (this._item.itypeId === 3) {
          text = descEx.SecretItemA;
        } else if (this._item.itypeId === 4) {
          text = descEx.SecretItemB;
        }
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawWeaponType = function() {
        const text = 
            this._item.meta.dType ? 
            this._item.meta.dType :
            $dataSystem.weaponTypes[this._item.wtypeId];
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawArmorType = function() {
        const text =
            this._item.meta.dType ?
            this._item.meta.dType :
            $dataSystem.armorTypes[this._item.atypeId];
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawSkillType = function() {
        const text =
            this._item.meta.dType ?
            this._item.meta.dType :
            $dataSystem.skillTypes[this._item.stypeId];
        this.drawText(text, 0, 0, this.contents.width - this.itemPadding(), "right");
    };
    
    Window_DescriptionEx.prototype.drawItemParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const lineHeight = this.lineHeight();
        let yy = y;
        yy = this.drawLeftParameter(
            x, yy, descEx.ConsumableText,
            descEx.ConsumableValue[this._item.consumable ? 0 : 1]
        );
        yy = this.drawLeftParameter(
            x, yy, descEx.OccasionText,
            descEx.OccasionValue[this._item.occasion]
        );
        yy = this.drawBattleItemParameters(x, yy + lineHeight);
        this.drawPrice(x, yy + lineHeight);
    };
    
    Window_DescriptionEx.prototype.drawEquipParameters = function(x, y, item) {
        const descEx = TMPlugin.DescriptionEx;
        const lineHeight = this.lineHeight();
        const itemT = item || this._item;
        const leftPaneWidth = descEx.LeftPaneWidth;
        for (let i = 0; i < 8; i++) {
            if (TextManager.param(i)) {
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.param(i), x, y, leftPaneWidth);
                this.resetTextColor();;
                this.drawText(itemT.params[i], x, y, leftPaneWidth, "right");
                y += lineHeight;
            }
        }
        this.drawPrice(x, y + lineHeight);
    };
    
    Window_DescriptionEx.prototype.drawSkillParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const leftPaneWidth = descEx.LeftPaneWidth;
        const lineHeight = this.lineHeight();
        let text;
        this.changeTextColor(this.systemColor());
        this.drawText(descEx.MpCostText, x, y + lineHeight * 0, leftPaneWidth);
        this.drawText(descEx.TpCostText, x, y + lineHeight * 1, leftPaneWidth);
        this.drawText(descEx.OccasionText, x, y + lineHeight * 2, leftPaneWidth);
        this.resetTextColor();
        text = this._item.mpCost;
        if (Imported.TMSkillCostEx && this._item.meta.mpRateCost) {
            text = this._item.meta.mpRateCost + "%";
        }
        this.drawText(text, x, y + lineHeight * 0, leftPaneWidth, "right");
        this.drawText(this._item.tpCost, x, y + lineHeight * 1, leftPaneWidth, "right");
        text = descEx.OccasionValue[this._item.occasion];
        this.drawText(text, x, y + lineHeight * 2, leftPaneWidth, "right");
        this.drawLeftParameter(
            x, y + lineHeight * 3, descEx.RequiredWtypeText,
            this.requiredWtypeValue()
        );
        this.drawBattleItemParameters(x, y + lineHeight * 5);
    };
    
    Window_DescriptionEx.prototype.elementText = function(elementId) {
        const elementFooter = TMPlugin.DescriptionEx.ElementFooter;
        if (elementId > 0) {
            return $dataSystem.elements[elementId] +elementFooter;
        } else if (elementId === 0) {
            return "無" + elementFooter;
        } else {
            return "";
        }
    };
    
    Window_DescriptionEx.prototype.requiredWtypeValue = function() {
        let text;
        if (this._item.requiredWtypeId1 > 0) {
            text = $dataSystem.weaponTypes[this._item.requiredWtypeId1];
            if (this._item.requiredWtypeId2 > 0) {
                text += " " + $dataSystem.weaponTypes[this._item.requiredWtypeId2];
            }
        } else if (this._item.requiredWtypeId2 > 0) {
            text = $dataSystem.weaponTypes[this._item.requiredWtypeId2];
        } else {
            text = "なし";
        }
        return text;
    };
    
    Window_DescriptionEx.prototype.valueToText = function(value) {
        return (value >= 0 ? "+" : "") + value;
    };
    
    Window_DescriptionEx.prototype.rateToText = function(rate, useSign) {
        return (
            (((useSign === undefined ? true : useSign) && rate > 1) ? "+" : "") +
            (rate * 1000000 - 1000000) / 10000
        );
    };
    
    Window_DescriptionEx.prototype.drawBattleItemParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        y = this.drawLeftParameter(
            x, y, descEx.ScopeText,
            descEx.ScopeValue[this._item.scope]
        );
        y = this.drawLeftParameter(
            x, y, descEx.SpeedText, this._item.speed
        );
        y = this.drawLeftParameter(
            x, y, descEx.SuccessRateText,
            this._item.successRate + "%"
        );
        y = this.drawLeftParameter(
            x, y, descEx.RepeatsText,
            this._item.repeats
        );
        y = this.drawLeftParameter(
            x, y, descEx.TpGainText,
            this._item.tpGain
        );
        y = this.drawLeftParameter(
            x, y, descEx.HitTypeText,
            descEx.HitTypeValue[this._item.hitType]
        );
        return y;
    };
    
    Window_DescriptionEx.prototype.drawLeftParameter = function(x, y, text, value) {
        if (text === "") return y;
        const descEx = TMPlugin.DescriptionEx;
        const leftPaneWidth = descEx.LeftPaneWidth;
        this.changeTextColor(this.systemColor());
        this.drawText(text, x, y, leftPaneWidth);
        this.resetTextColor();;
        this.drawText(value, x, y, leftPaneWidth, "right");
        return y + this.lineHeight();
    };
    
    Window_DescriptionEx.prototype.drawRightParameter = function(x, y, text) {
        if (text === "") return y;
        const descEx = TMPlugin.DescriptionEx;
        const rightPaneWidth = descEx.RightPaneWidth;
        const lineHeight = this.lineHeight();
        y += lineHeight;
        if (y <= this.profileY() - lineHeight) {
            this.resetTextColor();
            this.drawText(text, x, y, rightPaneWidth);
        }
        return y;
    };
    
    Window_DescriptionEx.prototype.drawPrice = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        if (descEx.PriceText === "" ||
            this._item.price === undefined) {return y};
        const leftPaneWidth = descEx.LeftPaneWidth;
        const priceText = descEx.PriceText;
        const priceRate = descEx.PriceRate;
        this.changeTextColor(this.systemColor());
        this.drawText(priceText, x, y, leftPaneWidth);
        this.drawCurrencyValue(
            (this._item.price * priceRate).toFixed(0),
            TextManager.currencyUnit, x, y, leftPaneWidth
        );
        return y + this.lineHeight();
    };
    
    Window_DescriptionEx.prototype.drawEffects = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        this.changeTextColor(this.systemColor());
        this.drawText(descEx.EffectText, x, y, descEx.RightPaneWidth);
        this.resetTextColor();;
        if (Imported.TMSkillCostEx) y = this.drawCostEx(x, y);
        y = this.drawDamage(x, y);
        for (let i = 0; i < this._item.effects.length; i++) {
            const effect = this._item.effects[i];
            let text = "";
            if (effect.code === Game_Action.EFFECT_RECOVER_HP) {
                if (effect.value1 !== 0) {
                    text = descEx.EffectTextRecoverHp.format(effect.value1 * 1000000 / 10000 + "%");
                } else {
                    text = descEx.EffectTextRecoverHp.format(effect.value2);
                }
            } else if (effect.code === Game_Action.EFFECT_RECOVER_MP) {
                if (effect.value1 !== 0) {
                    text = descEx.EffectTextRecoverMp.format(effect.value1 * 1000000 / 10000 + "%");
                } else {
                    text = descEx.EffectTextRecoverMp.format(effect.value2);
                }
            } else if (effect.code === Game_Action.EFFECT_GAIN_TP) {
                text = descEx.EffectTextGainTp.format(effect.value1);
            } else if (effect.code === Game_Action.EFFECT_ADD_STATE) {
                if (effect.dataId > 0) {
                    text = descEx.EffectTextAddState.format($dataStates[effect.dataId].name,
                       Math.floor(effect.value1 * 1000000 / 10000));
                }
            } else if (effect.code === Game_Action.EFFECT_REMOVE_STATE) {
                text = descEx.EffectTextRemoveState.format($dataStates[effect.dataId].name,
                     Math.floor(effect.value1 * 1000000 / 10000));
            } else if (effect.code === Game_Action.EFFECT_ADD_BUFF) {
                text = descEx.EffectTextAddBuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_ADD_DEBUFF) {
                text = descEx.EffectTextAddDebuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_REMOVE_BUFF) {
                text = descEx.EffectTextRemoveBuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_REMOVE_DEBUFF) {
                text = descEx.EffectTextRemoveDebuff.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_SPECIAL) {
                text = descEx.EffectTextSpecial;
            } else if (effect.code === Game_Action.EFFECT_GROW) {
                text = descEx.EffectTextGrow.format(TextManager.param(effect.dataId), effect.value1);
            } else if (effect.code === Game_Action.EFFECT_LEARN_SKILL) {
                text = descEx.EffectTextLearnSkill.format($dataSkills[effect.dataId].name);
            }
            y = this.drawRightParameter(x, y, text);
        }
        this.drawOptionText(x, y);
    };
    
    Window_DescriptionEx.prototype.profileY = function() {
        return (
            this.contents.height - this.lineHeight() * 2 -
            TMPlugin.DescriptionEx.HorzLineHeight
        );
    };
    
    Window_DescriptionEx.prototype.drawDamage = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        let text = "";
        if (this._item.damage.type === 1 || this._item.damage.type === 5) {
            text = descEx.DamageTextDamageHp.format(this.elementText(this._item.damage.elementId));
        } else if (this._item.damage.type === 2 || this._item.damage.type === 6) {
            text = descEx.DamageTextDamageMp.format(this.elementText(this._item.damage.elementId));
        } else if (this._item.damage.type === 3) {
            text = descEx.DamageTextRecoverHp;
        } else if (this._item.damage.type === 4) {
            text = descEx.DamageTextRecoverMp;
        }
        y = this.drawRightParameter(x, y, text);
        if (this._item.damage.type >= 5) {
            text =
                this._item.damage.type === 5 ? descEx.DamageTextDrainHp :
                descEx.DamageTextDrainMp;
            y = this.drawRightParameter(x, y, text);
        }
        return y;
    };
    
    Window_DescriptionEx.prototype.drawTraits = function(x, y, item) {
        const descEx = TMPlugin.DescriptionEx;
        itemT = item || this._item
        this.changeTextColor(this.systemColor());
        this.drawText(descEx.TraitText, x, y, descEx.RightPaneWidth);
        this.resetTextColor();;
        if (Imported.TMPassiveSkill && this._item.meta.passive) {
            y = this.drawPassiveSkillOccasion(x, y);
        }
        for (let i = 0; i < itemT.traits.length; i++) {
            const trait = itemT.traits[i];
            let text = "";
            if (trait.code === Game_BattlerBase.TRAIT_ELEMENT_RATE) {
                text = descEx.TraitTextElementRate.format(this.elementText(trait.dataId),
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_DEBUFF_RATE) {
                text = descEx.TraitTextDebuffRate.format(TextManager.param(trait.dataId),
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_STATE_RATE) {
                text = descEx.TraitTextStateRate.format($dataStates[trait.dataId].name,
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_STATE_RESIST) {
                text = descEx.TraitTextStateResist.format($dataStates[trait.dataId].name);
            } else if (trait.code === Game_BattlerBase.TRAIT_PARAM) {
                text = descEx.TraitTextParam.format(TextManager.param(trait.dataId),
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_XPARAM) {
                text = descEx.TraitTextXparam.format(descEx.XparamText[trait.dataId],
                     this.valueToText(trait.value * 1000000 / 10000));
            } else if (trait.code === Game_BattlerBase.TRAIT_SPARAM) {
                text = descEx.TraitTextSparam.format(descEx.SparamText[trait.dataId],
                     this.rateToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_ELEMENT) {
                text = descEx.TraitTextAttackElement.format(this.elementText(trait.dataId));
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_STATE) {
                text = descEx.TraitTextAttackState.format($dataStates[trait.dataId].name,
                     trait.value * 1000000 / 10000);
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_SPEED) {
                text = descEx.TraitTextAttackSpeed.format(this.valueToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_TIMES) {
                text = descEx.TraitTextAttackTimes.format(this.valueToText(trait.value));
            } else if (trait.code === Game_BattlerBase.TRAIT_STYPE_ADD) {
                text = descEx.TraitTextStypeAdd.format($dataSystem.skillTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_STYPE_SEAL) {
                text = descEx.TraitTextStypeSeal.format($dataSystem.skillTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_SKILL_ADD) {
                text = descEx.TraitTextSkillAdd.format($dataSkills[trait.dataId].name);
            } else if (trait.code === Game_BattlerBase.TRAIT_SKILL_SEAL) {
                text = descEx.TraitTextSkillSeal.format($dataSkills[trait.dataId].name);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE) {
                text = descEx.TraitTextEquipWtype.format($dataSystem.weaponTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_ATYPE) {
                text = descEx.TraitTextEquipAtype.format($dataSystem.armorTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_LOCK) {
                text = descEx.TraitTextEquipLock.format($dataSystem.equipTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_SEAL) {
                text = descEx.TraitTextEquipSeal.format($dataSystem.equipTypes[trait.dataId]);
            } else if (trait.code === Game_BattlerBase.TRAIT_SLOT_TYPE) {
                text = descEx.SlotTypeValue[trait.value];
            } else if (trait.code === Game_BattlerBase.TRAIT_ACTION_PLUS) {
                text = descEx.TraitTextActionPlus.format(trait.value * 1000000 / 10000);
            } else if (trait.code === Game_BattlerBase.TRAIT_SPECIAL_FLAG) {
                text = descEx.SpecialFlagValue[trait.dataId];
            } else if (trait.code === Game_BattlerBase.TRAIT_PARTY_ABILITY) {
                text = descEx.PartyAbilityValue[trait.dataId];
            }
            y = this.drawRightParameter(x, y, text);
        }
        this.drawOptionText(x, y);
    };
    
    Window_DescriptionEx.prototype.drawOptionText = function(x, y) {
        if (this._item.meta.dText) {
            const textArray = this._item.meta.dText.split(/\r\n|\r|\n/);
            let yy = y;
            for (let i = 0; i < textArray.length; i++) {
                yy = this.drawRightParameter(x, yy, textArray[i]);
            }
        }
    };

    Window_DescriptionEx.prototype.drawPlainText = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const textArray = this._item.meta.dPlnText.split(/\r\n|\r|\n/);
        this.changeTextColor(this.systemColor());
        let yy = y;
        this.drawText(descEx.PlainText, x, yy, descEx.RightPaneWidth);
        this.resetTextColor();
        for (let i = 0; i < textArray.length; i++) {
            yy = this.drawRightParameter(x, yy, textArray[i]);
        }
    };

    Window_DescriptionEx.prototype.drawHorzLineUpper = function(y) {
        const horzLineHeight = TMPlugin.DescriptionEx.HorzLineHeight;
        const yy = y + this.lineHeight();
        const lineY = yy + horzLineHeight / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
        return yy + horzLineHeight;
    };

    Window_DescriptionEx.prototype.drawHorzLineLower = function(y) {
        const horzLineHeight = TMPlugin.DescriptionEx.HorzLineHeight;
        const yy =  y - this.lineHeight() - this.itemPadding() * 2;
        const lineY = yy + horzLineHeight / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
        return yy + horzLineHeight;
    };

    Window_DescriptionEx.prototype.lineColor = function() {
        return ColorManager.normalColor();
    };

    Window_DescriptionEx.prototype.drawProfile = function(x, y) {
        this.drawTextEx(this._item.description, x + this.itemPadding(), y);
    };

    Window_DescriptionEx.prototype.drawCostEx = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const dummyActor = new Game_Actor(1);
        let text = "";
        if (this._item.meta.hpRateCost) {
            text = descEx.CostExTextHp.format(this._item.meta.hpRateCost + "%");
        } else if (this._item.meta.hpCost) {
            text = descEx.CostExTextHp.format(this._item.meta.hpCost);
        }
        y = this.drawRightParameter(x, y, text);
        const cost = dummyActor.skillItemCost(this._item);
        if (cost) {
            text = descEx.CostExTextItem.format(cost.item.name, cost.num);
            y = this.drawRightParameter(x, y, text);
        }
        if (this._item.meta.expCost) {
            text = descEx.CostExTextExp.format(this._item.meta.expCost);
            y = this.drawRightParameter(x, y, text);
        }
        if (this._item.meta.goldCost) {
            text = descEx.CostExTextGold.format(
                this._item.meta.goldCost + TextManager.currencyUnit
            );
            y = this.drawRightParameter(x, y, text);
        }
        return y;
    };
    
    Window_DescriptionEx.prototype.drawPassiveSkillParameters = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const item = $dataWeapons[+this._item.meta.passive];
        this.drawTraits(
            this.contents.width - this.itemPadding() -
            descEx.RightPaneWidth, y, item
        );
        this.drawLeftParameter(x, y, descEx.RequiredWtypeText, this.requiredWtypeValue());
        y += this.lineHeight() * 2;
        this.drawEquipParameters(this.itemPadding(), y, item);
    };
    
    Window_DescriptionEx.prototype.drawPassiveSkillOccasion = function(x, y) {
        const descEx = TMPlugin.DescriptionEx;
        const lastY = y;
        if (this._item.meta.passiveTp) {
            if (+this._item.meta.passiveTp > 0) {
                text = descEx.PassiveTpText.format(this._item.meta.passiveTp);
            } else {
                text = descEx.PassiveTpText2.format(-this._item.meta.passiveTp);
            }
            y = this.drawRightParameter(x, y, text);
        }
        if (this._item.meta.passiveState) {
            text = descEx.PassiveStateText.format($dataStates[+this._item.meta.passiveState].name);
            y = this.drawRightParameter(x, y, text);
        }
        if (lastY === y) {
            y = this.drawRightParameter(x, y, descEx.PassiveAlwaysText);
        }
        return y;
    };
    
    //-----------------------------------------------------------------------------
    // Scene_Base
    //
    Scene_Base.prototype.createDescriptionExWindow = function() {
        const rect = new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._descriptionExWindow = new Window_DescriptionEx(rect);
        this._descriptionExWindow.setHandler("description", this.descriptionClose.bind(this));
        this._descriptionExWindow.setHandler("cancel", this.descriptionClose.bind(this));
        this.addWindow(this._descriptionExWindow);
    };

    Scene_Base.prototype.descriptionOpen = function(mainWindow) {
        this._descriptionMainWindow = mainWindow;
        this._descriptionExWindow.setItem(this._descriptionMainWindow.item());
        this._descriptionExWindow.open();
        this._descriptionExWindow.activate();
    };
    
    Scene_Base.prototype.descriptionClose = function() {
        this._descriptionExWindow.close();
        this._descriptionMainWindow.activate();
    };

    //-----------------------------------------------------------------------------
    // Scene_Message
    //
    const _Scene_Message_createEventItemWindow = Scene_Message.prototype.createEventItemWindow;
    Scene_Message.prototype.createEventItemWindow = function() {
        _Scene_Message_createEventItemWindow.call(this);
        this._eventItemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
        this._messageWindow.setDescriptionExWindow(this._descriptionExWindow);
    };

    Scene_Message.prototype.descriptionOpen = function(mainWindow) {
        Scene_Base.prototype.descriptionOpen.call(this, mainWindow);
        this.moveMenuButton(true);
    };
    
    Scene_Message.prototype.descriptionClose = function() {
        Scene_Base.prototype.descriptionClose.call(this);
        this.moveMenuButton(false);
    };

    Scene_Message.prototype.moveMenuButton = function(flag) {
        const descriptionExWindow = this._descriptionExWindow;
        const h1 = descriptionExWindow.lineHeight();
        const h2 = TMPlugin.DescriptionEx.HorzLineHeight;
        if (flag) {
            this._saveButtonY = this._cancelButton.y;
            this._cancelButton.y = h1 + h2 - 1 ;
        } else {
            this._cancelButton.y = this._saveButtonY;
            this._saveButtonY = undefined;
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_MenuBase
    //
    Scene_MenuBase.prototype.descriptionOpen = function(mainWindow) {
        Scene_Base.prototype.descriptionOpen.call(this, mainWindow);
        if (this._cancelButton) {
            this.moveMenuButton(true);
        }
    };
    
    Scene_MenuBase.prototype.descriptionClose = function() {
        Scene_Base.prototype.descriptionClose.call(this);
        if (this._cancelButton) {
            this.moveMenuButton(false);
        }
    };

    Scene_MenuBase.prototype.moveMenuButton = function(flag) {
        const descriptionExWindow = this._descriptionExWindow;
        const h1 = descriptionExWindow.lineHeight();
        const h2 = TMPlugin.DescriptionEx.HorzLineHeight;
        if (flag) {
            this._saveButtonY = this._cancelButton.y;
            this._cancelButton.y = h1 + h2 - 1 ;
        } else {
            this._cancelButton.y = this._saveButtonY;
            this._saveButtonY = undefined;
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Item
    //

    const _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function() {
        _Scene_Item_createItemWindow.call(this);
        this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    //-----------------------------------------------------------------------------
    // Scene_Skill
    //

    const _Scene_Skill_createItemWindow = Scene_Skill.prototype.createItemWindow;
    Scene_Skill.prototype.createItemWindow = function() {
        _Scene_Skill_createItemWindow.call(this);
        this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    const _Scene_Skill_arePageButtonsEnabled = Scene_Skill.prototype.arePageButtonsEnabled;
    Scene_Skill.prototype.arePageButtonsEnabled = function() {
        return (
            this._descriptionExWindow.active ? false :
            _Scene_Skill_arePageButtonsEnabled.call(this)
        );
    };

    //-----------------------------------------------------------------------------
    // Scene_Equip
    //

    const _Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
    Scene_Equip.prototype.createItemWindow = function() {
        _Scene_Equip_createItemWindow.call(this);
        this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
    Scene_Equip.prototype.createSlotWindow = function() {
        _Scene_Equip_createSlotWindow.call(this);
        this._slotWindow.setHandler("description", this.descriptionOpen.bind(this));
    };

    const _Scene_Equip_arePageButtonsEnabled = Scene_Equip.prototype.arePageButtonsEnabled;
    Scene_Equip.prototype.arePageButtonsEnabled = function() {
        return (
            this._descriptionExWindow.active ? false :
            _Scene_Equip_arePageButtonsEnabled.call(this)
        );
    };

    //-----------------------------------------------------------------------------
    // Scene_Shop
    //

    const _Scene_Shop_createBuyWindow = Scene_Shop.prototype.createBuyWindow;
    Scene_Shop.prototype.createBuyWindow = function() {
        _Scene_Shop_createBuyWindow.call(this);
        this._buyWindow.setHandler("description", this.descriptionOpen.bind(this));
    };

    const _Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
    Scene_Shop.prototype.createSellWindow = function() {
        _Scene_Shop_createSellWindow.call(this);
        this._sellWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
    };

    const _Scene_Shop_descriptionOpen = Scene_Shop.prototype.descriptionOpen;
    Scene_Shop.prototype.descriptionOpen = function(mainWindow) {
        _Scene_Shop_descriptionOpen.call(this, mainWindow);
        if (Imported.TMGreedShop) {
            if (this._materialWindow) {
                this._materialWindow.hide();
            }
        }
    };
    
    const _Scene_Shop_descriptionClose = Scene_Shop.prototype.descriptionClose;
    Scene_Shop.prototype.descriptionClose = function() {
        _Scene_Shop_descriptionClose.call(this);
        if (Imported.TMGreedShop) {
            if (this._materialWindow) {
                this._materialWindow.show();
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle
    //
    const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        return (
            _Scene_Battle_isAnyInputWindowActive.call(this) ||
            this._descriptionExWindow.active
        );
    };

    const _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
    Scene_Battle.prototype.createSkillWindow = function() {
        _Scene_Battle_createSkillWindow.call(this);
        this._skillWindow.setHandler("description", this.descriptionOpen.bind(this));
    };

    const _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
    Scene_Battle.prototype.createItemWindow = function() {
        _Scene_Battle_createItemWindow.call(this);
        this._itemWindow.setHandler("description", this.descriptionOpen.bind(this));
    };

    Scene_Battle.prototype.createEventItemWindow = function() {
        Scene_Message.prototype.createEventItemWindow.call(this);
        this._eventItemWindow.setHandler("description", this.descriptionOpen.bind(this));
        this.createDescriptionExWindow();
        this._messageWindow.setDescriptionExWindow(this._descriptionExWindow);
    };

})();
