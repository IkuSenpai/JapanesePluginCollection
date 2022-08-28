// =============================================================================
// ABMZ_EnemyHate.js
// Version: 1.18
// -----------------------------------------------------------------------------
// Copyright (c) 2015 Evi
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: Ebi's Notebook
// http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @target MZ.
 * @plugindesc v1.18 The enemy will target the actor with the most hate.
 * Hate changes with actions in battle.
 * @author evi.
 * @translator NamiBoops
 * @url http://www.zf.em-net.ne.jp/~ebi-games/
 *
 * @requiredAssets img/system/hateline
 *
 * @param DisplayHateLine
 * @text display hate line
 * @type boolean
 * @on display
 * @off hide
 * @desc Decide if you want to display the hate line or not.
 * @default false
 *
 * @param DebugMode
 * @text debug mode
 * @type boolean
 * @on display
 * @off hide
 * @desc If on, output to console how many points hate increased.
 * @default false
 *
 * @param DamageHateFormula
 * @text DamageHateFormula.
 * @desc This is the formula for the amount of hate that is increased when damage is dealt.
 * @default damage
 * @default damage
 *
 * @param MPDamageHateFormula.
 * @text MPDamageHateFormula.
 * @desc The formula for the amount of hate that is increased when MP damage is dealt.
 * @default MPDamage * 5
 * @default MPDamage * 5
 *
 * @param HealHateFormula.
 * @text HealHateFormula.
 
 * @default healPoint * 2
 * @default healPoint * 2
 *
 * @param BuffHateFormula.
 * @text BuffHateFormula.
 * @desc The formula of the hate that is increased when a buff is added to an ally.
 * @default: enemy.atk * 4
 * @default enemy.atk * 4
 *
 * @param DebuffHateFormula.
 * @text Debuff hate formula.
 * @desc The hate formula that is increased when debuffing an enemy.
 * @default: enemy.atk * 4
 * @default enemy.atk * 4
 *
 * @param StateToEnemyHateFormula
 * @text Enemy state-added hate formula.
 * @desc The hate formula that is increased when adding state to the enemy.
 * @default: enemy.atk * 4
 * @default enemy.atk * 4
 *
 * @param StateToActorHateFormula.
 * @text ally state-added hate formula.
 * @desc Hate formula that is increased when state is added to an ally.
 * @default: enemy.atk * 4
 * @default enemy.atk * 4
 *
 * @param RemoveStateHateFormula.
 * @text Hate formula for removing state from an ally.
 * @desc The hate formula that is increased when removing state from an ally.
 * @default: enemy.atk * 4
 * @default enemy.atk * 4
 *
 * @param ReduceOthersHate
 * @text hate reduction mode.
 * @type boolean
 * @on reduce
 * @off Do not reduce.
 * @desc Reduce the hate of allies when they act in a way that increases hate?
 * @default false
 *
 * @param OthersHateRateFormula
 * @text allyHateRateFormula.
 * @type string
 * @desc The formula for the percentage of hate reduction for allies.
 * @default: (100 - (point / enemy.atk)) / 100
 * @default (100 - (point / enemy.atk)) / 100
 *
 * @param ---EnemyList---
 * @text ---EnemyList---
 *
 * @param ShowEnemyList
 * @text Show Enemy List
 * @parent ---EnemyList---
 * @type boolean
 * @on yes
 * @off No
 * @desc Display enemy list?
 * @default false
 *
 * @param EnemyListX
 * @text Enemy list position X
 * @parent ---EnemyList---
 * @type number
 * @desc X coordinate of the enemy list.
 * @default 0
 *
 * @param EnemyListY
 * @text Enemy list position Y.
 * @parent ---EnemyList---
 * @type number
 * @desc Y coordinate of the enemy list.
 * @default 0
 *
 * @param HateIconList
 * @text Hate icon list.
 * @parent ---EnemyList---
 * @type string
 * @desc Icon list of hate rank. The higher the left, the higher the rank. Please separate the icons with a space. Default: 64 5 4 16
 * @default 64 5 4 16
 *
 * @param EnemyListFontSize
 * @text Enemy list font size
 * @parent ---EnemyList---
 * @type number
 * @desc Font size of the enemy list.
 * @default 24
 *
 * @param EnemyListLineHeight
 * @text Enemy list line height.
 * @parent ---EnemyList---
 * @type number
 * @desc Enemy list line height.
 * @default 32
 *
 * @param EnemyListWidth
 * @text Enemy list width.
 * @parent ---EnemyList---
 * @type number
 * @desc Width of the enemy list.
 * @default 240
 *
 *
 *
 * @param HateGaugeColor1
 * @text HateGaugeColor1
 * @parent ---EnemyList---
 * @type number
 * @desc The first color of the hate gauge.
 * @default 2
 *
 * @param HateGaugeColor2
 * @text Hate gauge color 2
 * @parent ---EnemyList---
 * @type number
 * @desc The second color of the hate gauge.
 * @default 10
 *
 *
 *
 * @param ---HateGauge---
 * @text Hate Gauge
 *
 * * @param ShowHateGauge
 * @text Show Hate Gauge
 * @parent ---HateGauge---
 * @type boolean
 * @on yes
 * @off No
 * @desc Display party list?
 * @default false
 *
 * @param HateGaugeWidth
 * @text Hate gauge width
 * @parent ---HateGauge---
 * @type number
 * @desc Width of the hate gauge.
 * @default 180
 *
 * @param HateGaugeX
 * @text X position of the hate gauge.
 * @parent ---HateGauge---
 * @type text
 * @desc X coordinate position of each member of the hate gauge.
 * index:member number, length:number of members
 * @default Graphics.boxWidth /6 * (index +1)
 *
 * @param HateGaugeY
 * @text Y position of the hate gauge.
 * @parent ---HateGauge---
 * @type text
 * @desc Y coordinate position of each member of the hate gauge.
 * index:member number, length:number of members
 * @default 320
 *
 * @param ShowEnemyNameOnHateGauge
 * @text Show enemy character name (hate gauge).
 * @parent ---HateGauge---
 * @type boolean
 * @on yes
 * @off No
 * @desc Do you want to display the enemy character name on the hate gauge?
 * @default true
 *
 * @help
 * ============================================================================
 * What plugin?
 * ============================================================================
 *
 * Enemies will have hate against actors and will go after the actor with the highest hate.
 * Hate changes based on your actions in battle.
 *
 * ============================================================================
 * Plugin Commands.
 * ============================================================================
 * - v1.10
 * ShowHateLine.
 * ShowHateLine.
 * HideHateLine
 * hideHateLine * hideHateLine.
 * - v1.13
 * ShowEnemyHateList
 * Show EnemyHateList * HideEnemyHateList.
 * HideEnemyHateList
 * Hide the enemy list.
 * ShowHateGauge
 * Show Hate Gauge * Hide Hate Gauge
 * HideHateGauge
 * HideHateGauge * Hides the hate gauge.
 *
 * ============================================================================
 * Hate that automatically accumulates.
 * ============================================================================
 *
 * When an Actor uses a skill or item that targets an enemy, the Hate from the target to the user
 * Increases.
 * Actions that target enemies that increase hate:.
 * HP and MP damage, debuffs added, buffs removed, stat added.
 *
 * When an Actor uses a skill or item that targets an ally, the enemy targeting that ally
 * Hate is increased from enemies targeting that ally to the user.
 * Actions that target an ally and increase hate: * HP recovery, stat-add, stat-add * * HP regeneration, stat-add, stat-add
 * heals HP, adds stat, removes stat, adds buffs.
 *
 * A plugin parameter allows you to set a formula for how much hate is increased.
 * In the formula, you can set the
 * ----------------------------------------------------------------------------
 * HP damage (only if the target is an enemy): damage
 * MP Damage (only if the target is an enemy): MPDamage
 * Recovery points (only if the target is friendly): healPoint
 * skill's user: a, user
 * Target of the skill: b, target
 * Enemies whose hate is increased: enemy
 * variable: v
 * ----------------------------------------------------------------------------
 * can use.
 *
 * The user, target, enemy, and variables of a skill can be treated in the same way as the skill's damage formula.
 * * You can treat them in the same way as in the skill's damage formula.
 * Example 1: user's max HP
 * user.mhp
 * Example 2: 12th variable.
 * v[12]
 *
 * HP and MP absorption attacks double the hate that increases with damage.
 *
 * ============================================================================
 * "Targeted rate" nature changes.
 * ============================================================================
 *
 * The "Targetability" is now the ease of increasing hate, and is multiplied by the amount of hate that is increased.
 * This will increase the amount of hate on you. This allows you to create equipment or * states that increase hate on you more easily.
 * This allows you to create equipment or states that increase hate on you more easily.
 *
 * ============================================================================
 * Hate Lines.
 * ============================================================================
 *
 * If you set the plugin parameter DisplayHateLine to 1 in the side view, the hate line will be
 * DisplayHateLine * * If you set the plugin parameter DisplayHateLine to 1 in side view, you can display the hate line. If you want to display it, put
 * "hateline.png" in the img/system folder. This image will be stretched vertically and displayed.
 *
 * ============================================================================
 * Hate increase formula per state.
 * ============================================================================
 *
 * State notes: *
 * <HATE_formula: expression>
 * You can use this tag to set the hate increase formula when you add or remove a state from an ally or enemy.
 * <HATE_formula: expression> * You can set.
 *
 * For example, by default, you can add a plugin parameter * to your defender's state to prevent enemies from * targeting you.
 For example, by default, enemies will hate you by the amount you set in the * plugin parameters, but you can add a note to the defense state that says
 * <HATE_formula:0>
 * in the defense state memo to prevent the hate from increasing.
 *
 * <HATE_remove_formula: expression>
 * This tag allows you to set the formula for increasing hate when this state is removed from an ally.
 * Use this if you want to change the hate increase formula between added and removed.
 *
 * <HATE_property: property>.
 * By default, hate is increased when you cast a good state on an enemy or a bad state on an ally.
 * but by setting the nature of the state with this tag, you can set it so that it * doesn't increase depending on the target of the skill.
 * by default, it also increases when you cast good state on an enemy or * bad state on an ally.
 *
 * ========================================================================
 * What you can replace the nature part with: *
 * ------------------------------------------------------------------------
 * good : Hate is increased only when this stat is added to an ally.
 * neutral : Hate is not increased.
 * bad : Hate is increased only when you add this state to an enemy and when you remove this state from an ally.
 * bad : Hate is increased only when you add this state to an enemy and when you remove this state from an ally.
 * ========================================================================
 *
 * ============================================================================
 * Skills and items that control hate.
 * ============================================================================
 *
 * Skills and items that increase or decrease hate can be created.
 *
 * Skill or item notes:.
 * <HATE_control: who, who, expression>
 * ========================================================================
 * String you can set for the "who" part:
 * ------------------------------------------------------------------------
 * user : If the user of the skill is an enemy, the user will hate.
 * target : If the target of the skill is an enemy, the target will hate.
 * whoHateUser : If the user of the skill is an actor, the enemy
 * whoHateTarget : If the target of the skill is an enemy, the target will hate.
 * whoHateTarget : If the target of the skill is an actor, enemies that * target the actor will hate.
 * all : all enemies will hate the user.
 * all : All enemies will hate.
 * whoHateTarget : If the skill targets an actor, the enemies that * target the actor will hate the actor.
 * all : all enemies will hate the skill.
 * exceptUser : If the user of the skill is an enemy, all except the user will be hated.
 * exceptTarget : If the target of the skill is an enemy, then the target is not the target of the skill.
 * ========================================================================
 *
 * ========================================================================
 * String that can be set for "who" part.
 * ------------------------------------------------------------------------
 * user : If the user of the skill is an actor, the user will be hated.
 * target : If the target of the skill is an actor, the target will be hated.
 * exceptUser : If the user of the skill is an actor, the non-user will be
 * exceptUser : If the user of the skill is an actor, the non-user will be hated.
 * targetsTarget : If the target of the skill is an enemy, the actor
 * targetsTarget : If the target of the skill is an enemy, the actor that the enemy is targeting will be * * targeted.
 * ========================================================================
 *
 * In the formula, in addition to what can be used in the plugin parameters above, you can also use
 * ------------------------------------------------------------------------
 * Actor to be hated: actor
 * ------------------------------------------------------------------------
 * * The calculation formula can use the following parameters in addition to the above plugin parameters.
 * A negative number in the calculation results in less hate.
 * You can have multiple tags for the same skill.
 * Note that if the first tag changes the actor the enemy is targeting, the second whoHateUser, whoHateTarget
 * Be careful, as the result of the second tag will change.
 *
 * --- Example ---.
 * "Provoke".
 * A skill whose range is a single enemy, increasing the hate from the target to you by the enemy's attack power x 12.
 * <HATE_control:target, user, enemy.atk * 12>
 *
 * "Hide."
 * Reduces all enemies' hate to you by your agility x 4, with a range of the user's skill.
 * <HATE_control:all, user, actor.agi * -4>
 *
 * "Cover".
 * A skill that has a range of a single ally.
 * Increases hate from enemies targeting allies to the user by half the user's maximum HP.
 * Reduces hate from all enemies to allies by a quarter of the user's maximum HP.
 * <HATE_control:whoHateTarget, user, user.mhp / 2>
 * <HATE_control:all, target, -user.mhp / 4>
 *
 * "Concentrated Attack Issue" (enemy only)
 * A skill with a range of a single enemy, increasing all enemies' hate on the target by 50.
 * <HATE_control: all, target, 50>
 *
 * "Whistle of Attention" (Item)
 * An allied-only item with range that increases all enemies' hate on all allies by the user's magic attack power x 8
 * Increases.
 * <HATE_control: all, target, user.mat * 8>
 *
 * ============================================================================
 * Skills and items that do not build up hate.
 * ============================================================================
 *
 * Notes on skills and items:.
 * <HATE_no>
 * This tag allows you to create skills that do not increase hate due to damage, etc.
 * It does not disable the aforementioned tags that increase or decrease hate.
 *
 * ============================================================================
 * Enemy states that do not increase hate - v1.03.
 * ============================================================================
 *
 * For example, if you are in a state that makes you lose track of what's going on, such as "Sleep", it seems strange that you would be
 * * It seems strange that you would get hate when you are supposed to be unaware of the situation, for example "sleep".
 *
 * State notes:.
 * <HATE_cantHate>
 * This tag will prevent the hate of an enemy with this state from * fluctuating.
 * * <HATE_cantHate> * This tag prevents the hate of the enemy on this state from fluctuating.
 *
 * ============================================================================
 * How to check hate.
 * ============================================================================
 *
 * Turn on the plugin parameter DebugMode to see how much the hate has increased.
 * * The plugin parameter "DebugMode" will output to the Developer Tools Console which is launched by pressing the F8 key.
 *
 * Also, when DebugMode is turned on, it will output to the Console * if there is an error in the plugin parameter's hate increase expression.
 * * Also, if DebugMode is turned on, any errors in the plugin parameter hate increase formula * * will be output to the Console.
 *
 * You can check the increased hate with this, but to check the accumulated hate, you * need to do a little bit more difficult operation.
 * * * You can check the increased hate with this, but to check the accumulated * * hate, you need to do something a bit more complicated.
 *
 * The accumulated hate is in Game_Enemy's _hates array, subscripted by * the actor's ID.
 * Actor ID.
 *
 * To see how much hate is currently accumulated.
 * Open the Sources tab in Developer Tools, press + on Watch Expressions in the upper right corner, and then press
 * Type $gameTroop.
 * Press the right-facing triangle to the left of $gameTroop to see the contents, and look for _enemies.
 * (probably at the top of the list)
 * When you open the contents of _enemies, you'll see a number for each enemy, and this is the enemy object
 * Open it and look for _hates. Open it, find _hates, and open it. The purple number on the left is the ID of the actor
 The purple number on the left is the ID of the actor *, and the blue text on the right is the hate that is currently being accumulated.
 *
 * ============================================================================
 * Hate reduction for non-actors - v1.06
 * ============================================================================
 *
 * In longer fights, the hate gap can open up and become something you can't keep up with.
 * * In a long game, the hate gap can open up and become too big to keep up with. So we've added a feature that reduces hate on other actors when an * actor gains hate.
 * functionality has been added. The following plugin parameters can be used to set this.
 *
 * ReduceOthersHate.
 * Sets whether or not to use this feature. Default is OFF.
 *
 * OthersHateRateFormula.
 * The result of this formula is multiplied by the current hate.
 * In the formula, the result of the calculation is multiplied by the
 * --------------------------------------------------------------------------
 * Increased Hate: point
 * Enemy character: enemy
 * Actor whose hate is reduced: actor
 * --------------------------------------------------------------------------
 * can be used.
 *
 * ---example ---.
 * Default case
 * (100 - (point / enemy.atk)) / 100
 *
 * If an attacker gains 4 times the hate of an enemy character's attacker.
 * (100 - 4) / 100 = 0.96
 * The current value of hate to non-attackers is multiplied by 0.96.
 *
 * When an attacker gains 15 times the hate of an enemy character's attack power.
 * (100 - 15) / 100 = 0.85
 * The current value of Hate on non-attackers is 0.85 times the attacker's Hate.
 *
 * If DebugMode is ON, the current value of Hate on non-attackers will be displayed.
 *
 * ============================================================================
 * Attacks on characters with second or lower hate - v1.09
 * ============================================================================
 *
 * Skill notes field:.
 * <HATE_target: x>
 * Attacks the xth character with hate.
 * Example.
 * <HATE_target: 3>
 * Attacks the character with the third highest hate.
 If there are only two characters, the second * character will be attacked.
 *
 *
 * ============================================================================
 * Enemy and party lists - v1.13.
 * ============================================================================
 *
 * * Enemy List.
 * A window where you can see the hate of all enemies against the currently selected actor.
 *
 * * What is displayed.
 * * * Name of the currently selected actor.
 * * ・Names of all enemies
 * ・Name
 * ・Hate rank of the currently selected actor (hate icon)
 * ・Gauge of the currently selected actor
 *
 * * Hate gauge.
 * A window that allows you to see the hate on all of the Actors of the currently selected and acting enemy characters.
 *
 * * What is displayed.
 * * * Name of the currently selected enemy character.
 * * ・All of the actors'
 * ・Names
 * ・Hate rank of the actor (hate icon)
 * - The actor's gauge
 *
 * Various settings can be configured with plugin parameters.
 * You can turn it on and off with the plugin commands.
 * (See Plugin commands above.)
 *
 * ============================================================================
 * Extension of YEP_BattleAICore.js
 * ============================================================================
 *
 * YEP_BattleAICore.js is a plugin created by Yanfly that allows you to set smart behavior patterns for your enemies.
 * AB_EnemyHate.js adds hate-related features.
 AB_EnemyHate.js adds hate-related functionality: * To use this functionality, go to the plugin manager, under YEP_BattleAICore.js, and add the following line
 * AB_EnemyHate.js must be placed under YEP_BattleAICore.js in the plugin manager to use this feature.
 *
 * Added Condition:
 * HATE ELEMENT X case
 * HATE stat PARAM eval
 * HATE STATE === state name
 * HATE STATE ! == state name
 *
 * I just added "HATE" to the beginning of what was originally in YEP_BattleAICore.js.
 * If you add "HATE" at the beginning, you will see the state of the actor with the highest hate.
 * These Conditions are not target specific.
 *
 * Added Targeting:
 * HATE.
 *
 * Targeting the actor with the highest hate among actors narrowed down by Condition.
 *
 * --- Example.
 * If the actor with the highest hate is Poisoned, then Attack on that actor, and
 * If the actor with the highest Hate is Poisoned, Attack on that actor, * otherwise Poison on that actor.
 * <AI Priority>
 * HATE State === Poison: Attack, HATE
 * Always: Poison, HATE
 * <AI Priority>
 *
 * If the actor with the most hate is at 70% HP or less, make a Dual Attack, otherwise make an Attack on that actor.
 * If the Actor with the highest Hate is at 70% HP or less, it makes a Dual Attack, otherwise it makes an Attack on that Actor.
 * <AI Priority>
 * HATE HP% param <= 70%: Dual Attack, HATE
 * Always: Attack, HATE
 * <AI Priority>
 *
 * ============================================================================
 * Update History
 * ============================================================================
 *
 * Version 1.18.
 * Fixed a bug that the game stops with an error when the enemy list is not displayed and the hate becomes negative.
 * Fixed a bug that the game stops when the enemy list is not displayed and hate becomes negative.
 * * Version 1.17 * Fixed a bug that caused the enemy list to not be displayed.
 * Version 1.17
 * Fixed a bug that the hate gauge and enemy list can be turned on and off during battle.
 * Changed so that the hate gauge is hidden even when defeated or fleeing.
 *
 * Version 1.16
 * Added support for TSUCOOL MZ.
 * Version 1.15
 * Version 1.15
 * Fixed a bug that an error message appeared and the game stopped when attacking.
 * Version 1.14
 * Version 1.14
 * Fixed a bug where hate lines were not displayed when hate lines were turned on.
 * Fixed a bug where the hate gauge of the targeted enemy character would be displayed when you targeted an enemy character in combat.
 * Fixed a bug that prevented hate lines from being displayed when a character was targeted in combat.
 * The hate gauge will now be hidden when the battle ends.
 * Enemy character names on the hate gauge can now be hidden.
 * Enemy character names are now hidden except when you select them.
 * Added the ability to hide the enemy character name on the hate gauge.
 * Version 1.13
 * Added party list and enemy list.
 *
 * Version 1.12
 * Version 1.12
 * Fixed a bug that the game sometimes stopped when hate was negative.
 * * Version 1.12 * Fixed a bug that sometimes caused the game to stop when hate was a negative value.
 *
 * Version 1.11
 * Fixed a bug that caused the game to stop when hate was a negative value.
 * * Version 1.11 * When using YEP_BattleStatusWindow in front view, the line is now extended towards the status screen.
 * * Version 1.10
 * Version 1.10
 * Plugin commands to show/hide hate lines are implemented.
 * * Version 1.10 * Added a plugin command to show/hide hate lines.
 * Version 1.09
 * Added <HATE_target: x> tag for skills that target the Xth highest hate actor.
 * Version 1.09 * Added <HATE_target: x> tag for skills that target the Xth highest actor.
 * * Version 1.08
 * Version 1.08
 * Added <HATE_target: x> tag for skills that target the actor with the Xth highest hate.
 * Added "exceptUser" and "exceptTarget" to "who" and "exceptUser" and "exceptTarget" to "whom" in the hate control.
 * Added "exceptUser" and "targetsTarget" to "who".
 *
 * Version 1.07.
 * Fixed a display problem of hate lines.
 * DisplayHateline is now shown in the front view if it is ON.
 * Added a new "targetsTargetsTarget".
 * Version 1.06
 * Version 1.06
 * Added a feature to reduce hate on non-attackers.
 * Improved the error display to be easier to read.
 * Version 1.05
 * Version 1.05
 * Added "do not include unused files" feature added in RPG Tskool MV version 1.1.0.
 * Changed so that hateline.png is included when deployed with * * Version 1.05 * Changed so that hateline.png is included when deployed with.
 *
 * Version 1.04.
 * Changed to also show the hate lines of revived Enemies.
 * * Version 1.03
 * Version 1.03
 * Added state memo tag <HATE_cantHate>.
 *
 * Version 1.02
 * Hate line flickers when running with YEP_BattleEnginCore.js.
 * Fixed issues.
 * Fixed an issue where the hate line would flicker when running with
 * Version 1.01
 * Fixed a bug where adding a non-party member after the fact didn't work.
 * Fixed a bug where adding a member who is not in the party would not work correctly when the member was added later.
 * After this fix, you still need to add the member to $gameActors by recovering all of the members in your party.
 * Fixed a bug that caused the game to not work when adding a new member to the party.
 * Version 1.00
 * Published.
 * * Release
 * ============================================================================
 * Terms of Use.
 * ============================================================================
 *
 * * No credit is required.
 * * * Can be used for commercial purposes.
 * ・Modification is allowed.
 * However, please leave the license notice in the header of the source code.
 * * Redistribution of only the material is permitted.
 * ・Use in adult games or cruel games is allowed.
 *
 *
 * @command ShowHateLine
 * @text Show hate line.
 * @desc Show hate line during combat.
 *
 * @command HideHateLine
 * @text hide hate line
 * @desc Hide hate lines during combat.
 *
 * @command ShowEnemyHateList
 * @text show enemy list
 * @desc Shows which enemies are targeting the selected actor during combat.
 *
 * @command HideEnemyHateList
 * @text hideEnemyList * @text hideEnemyList * @text hideEnemyList
 * @desc Hides which enemies are targeting the selected actor during combat.
 *
 * @command ShowHateGauge
 * @text Show the hate gauge.
 * @desc Shows how much hate the selected Actor has on the selected enemy character during combat.
 *
 * @command HideHateGauge
 * @text hide hate gauge
 * @desc Hides how much hate the selected enemy character has on which Actor during combat.
 *
 */

(function() {
'use strict';
const pluginName = "ABMZ_EnemyHate";
var parameters = PluginManager.parameters('ABMZ_EnemyHate');
var displayHateLine = eval(parameters['DisplayHateLine']);
var HateDebugMode = eval(parameters['DebugMode']);
var DamageHateFormula = (parameters['DamageHateFormula'] || 0);
var MPDamageHateFormula = (parameters['MPDamageHateFormula'] || 0);
var HealHateFormula = (parameters['HealHateFormula'] || 0);
var BuffHateFormula = (parameters['BuffHateFormula'] || 0);
var DebuffHateFormula = (parameters['DebuffHateFormula'] || 0);
var StateToEnemyHateFormula = (parameters['StateToEnemyHateFormula'] || 0);
var StateToActorHateFormula = (parameters['StateToActorHateFormula'] || 0);
var RemoveStateHateFormula = (parameters['RemoveStateHateFormula'] || 0);
var ReduceOthersHate = eval(parameters['ReduceOthersHate'] == 1);
var OthersHateRateFormula = (parameters['OthersHateRateFormula'] || 0);
var ShowEnemyList = eval(parameters['ShowEnemyList']);
var EnemyListX = Number(parameters['EnemyListX']);
var EnemyListY = Number(parameters['EnemyListY']);
var HateIconList =parameters['HateIconList'].split(' ');
var EnemyListFontSize = Number(parameters['EnemyListFontSize']);
var EnemyListLineHeight = Number(parameters['EnemyListLineHeight']);
var EnemyListWidth = Number(parameters['EnemyListWidth']);
var HateGaugeColor1 = Number(parameters['HateGaugeColor1']);
var HateGaugeColor2 = Number(parameters['HateGaugeColor2']);
var ShowHateGauge = eval(parameters['ShowHateGauge']);
var HateGaugeWidth = Number(parameters['HateGaugeWidth']);
var HateGaugeX = String(parameters['HateGaugeX']);
var HateGaugeY = String(parameters['HateGaugeY']);
var ShowEnemyNameOnHateGauge = eval(parameters['ShowEnemyNameOnHateGauge']);

//=============================================================================
// Game_Interpreter
//=============================================================================

// const pluginName = "ABMZ_EnemyHate";

PluginManager.registerCommand(pluginName, "ShowHateLine", args => {
$gameSystem.setDispHateLine(true);
});

PluginManager.registerCommand(pluginName, "HideHateLine", args => {
$gameSystem.setDispHateLine(false);
});

PluginManager.registerCommand(pluginName, "ShowEnemyHateList", args => {
$gameSystem.setDispEnemyHateList(true);
if ($gameParty.inBattle()) {


				
SceneManager._scene._ABEnemyListWindow.show();
}
});

PluginManager.registerCommand(pluginName, "HideEnemyHateList", args => {
$gameSystem.setDispEnemyHateList(false);
if ($gameParty.inBattle()) {
SceneManager._scene._ABEnemyListWindow.hide();
}
});

PluginManager.registerCommand(pluginName, "ShowHateGauge", args => {
$gameSystem.setDispHateGauge(true);
});

PluginManager.registerCommand(pluginName, "HideHateGauge", args => {
$gameSystem.setDispHateGauge(false);
if ($gameParty.inBattle()) {
SceneManager._scene.hideHateWindow();
}
});


var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
_Game_Interpreter_pluginCommand.call(this, command, args);
if (command === 'ShowHateLine') {
$gameSystem.setDispHateLine(true);
} else if (command === 'HideHateLine') {
$gameSystem.setDispHateLine(false); }
} else if (command === 'ShowEnemyHateList') {
$gameSystem.setDispEnemyHateList(true);
if ($gameParty.inBattle()) {
SceneManager._scene._ABEnemyListWindow.show();
}
} else if (command === 'HideEnemyHateList') {
$gameSystem.setDispEnemyHateList(false);
if ($gameParty.inBattle()) {
SceneManager._scene._ABEnemyListWindow.hide();
}
} else if (command === 'ShowHateGauge') {
$gameSystem.setDispHateGauge(true);
} else if (command === 'HideHateGauge') {
$gameSystem.setDispHateGauge(false);
if ($gameParty.inBattle()) {
SceneManager._scene.hideHateWindow();
}
}
};

// v1.10
//=============================================================================
// Game_System
//=============================================================================

Game_System.prototype.initDispHateLine = function() {
this._dispHateLine = displayHateLine;
}

Game_System.prototype.setDispHateLine = function(value) {
this._dispHateLine = value;
}

Game_System.prototype.isDispHateLine = function() {
if (this._dispHateLine === undefined) this.initDispHateLine();
return this._dispHateLine;
};



Game_System.prototype.initDispEnemyHateList = function() {
this._dispEnemyHateList = ShowEnemyList;
};

Game_System.prototype.setDispEnemyHateList = function(value) {
this._dispEnemyHateList = value;
}

Game_System.prototype.isDispEnemyHateList = function() {
if (this._dispEnemyHateList === undefined) this.initDispEnemyHateList();
return this._dispEnemyHateList;
};



Game_System.prototype.initDispHateGauge = function() {
this._dispHateGauge = ShowHateGauge;
}

Game_System.prototype.setDispHateGauge = function(value) {
this._dispHateGauge = value;
}

Game_System.prototype.isDispHateGauge = function() {
if (this._dispHateGauge === undefined) this.initDispHateGauge();
return this._dispHateGauge;
};


//=============================================================================
// Game_Enemy
//=============================================================================
var Game_Enemy_prototype_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
Game_Enemy_prototype_setup.call(this, enemyId, x, y);
this._hates = [];
var allActors = $gameActors._data;
var enemy = this;
allActors.forEach(function(actor) {
if (!actor) return;
enemy._hates[actor.actorId()] = Math.randomInt(10);
});
}

Game_Enemy.prototype.hates = function() {
return this._hates;
};

Game_Enemy.prototype.hate = function(index, point) {
this._hates[index] += point;
if (this._hates[index] < 0) this._hates[index] = 0;
if (HateDebugMode) {
console.log(this.name() + "of" + $gameActors.actor(index).name() + "hate to" + point + "point increase");
}
if (point > 0) this.reduceOthersHates(index, point);
}

Game_Enemy.prototype.reduceOthersHates = function(index, point) {
if (!ReduceOthersHate) return;
var enemy = this;
var actors = $gameParty.battleMembers();
actors.forEach(function(actor) {
if (actor.actorId() == index) return;
var rate = 1;
try {
rate = eval(OthersHateRateFormula);
if (isNaN(rate)) {
throw new Error(" " + OthersHateRateFormula + "") calculation result is not numeric.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
rate = 1;
}
enemy.multiplyHate(actor.actorId(), rate);
});
}

Game_Enemy.prototype.hateOrder = function(actorId) {
var hatesArray = [];


		
if (typeof this._hates === "undefined") {
return false;
}
var hates = this._hates;
var max = -9999999999999999999999;


	
$gameParty.aliveMembers().forEach(function(member) {
if (!member.isBattleMember()) return;
var i = member.actorId();


			
var hateObj = {};
hateObj.i = i;
hateObj.hate = hates[i];
hatesArray.push(hateObj);
});

// sort in descending order
hatesArray.sort(function(a,b){
if (a.hate > b.hate) return -1;
if (a.hate < b.hate) return 1;
return 0;
});
var hateOrder = null;
hatesArray.forEach(function(hateObj, i) {
if (hateObj.i == actorId) {
hateOrder = i;
return;
}
});
return hateOrder;


		
};

Game_Enemy.prototype.multiplyHate = function(index, rate) {
if (rate < 0) return;
var hate = this._hates[index] * rate;
hate = Math.round(hate);
this._hates[index] = hate;
if (HateDebugMode) {
console.log(this.name() + "of" + $gameActors.actor(index).name() + "hate to" + hate + "hate to");
}
};

Game_Enemy.prototype.hateTarget = function() {
return $gameParty.hateTarget(this._hates);
}

Game_Enemy.prototype.hateTargetNumber = function(no) {
return $gameParty.hateTargetNumber(this._hates, no);
}

Game_Enemy.prototype.hateTargetOf = function(group) {
if (typeof this._hates === "undefined") {
return false;
}
var hates = this._hates;
var max = -9999999999999999999999;
var mainTarget;
group.forEach(function(member) {
if (!member.isActor()) return false;
if (!member.isBattleMember()) return false;
var i = member.actorId();
if (max < hates[i]) {
max = hates[i];
mainTarget = member;
}
});
return mainTarget;
}

Game_Enemy.prototype.canHate = function() {
return !this._states.some(function(stateId){
var state = $dataStates[stateId];
if (!state) return false;
if (state.meta.HATE_cantHate) return true;
return false;
});
};

//=============================================================================
// Game_Party
//=============================================================================


	
Game_Party.prototype.hateTarget = function(hates) {
//
var max = -1;
var mainTarget;
this.aliveMembers().forEach(function(member) {
if (!member.isBattleMember()) return;
var i = member.actorId();
if (max < hates[i]) {
max = hates[i];
mainTarget = member;
}
});
return mainTarget;
}
Game_Party.prototype.hateTargetNumber = function(hates, no) {
var hatesArray = [];
var targetIndex = 0;

var mainTarget;
this.aliveMembers().forEach(function(member) {
if (!member.isBattleMember()) return;
var i = member.actorId();


			
var hateObj = {};
hateObj.i = i;
hateObj.hate = hates[i];
hatesArray.push(hateObj);
});

// sort in descending order
hatesArray.sort(function(a,b){
if (a.hate > b.hate) return -1;
if (a.hate < b.hate) return 1;
return 0;
});


		
// Select the (no-1)th i in hatesArray.
// If there is no (no-1)th index, select the last index.
if ((no-1) < hatesArray.length) {
targetIndex = hatesArray[no - 1].i;
} else {
targetIndex = hatesArray[hatesArray.length - 1].i;
}
mainTarget = $gameActors.actor(targetIndex);
return mainTarget;


		
};
var _Game_Party_prototype_refresh = Game_Party.prototype.refresh;
Game_Party.prototype.refresh = function() {
//
_Game_Party_prototype_refresh.call(this);
if (this.inBattle()) {
SceneManager._scene.initHateGaugeWindows();
}
}
var _Game_Party_prototype_addActor = Game_Party.prototype.addActor;
Game_Party.prototype.addActor = function(actorId) {
_Game_Party_prototype_addActor.call(this, actorId);
if (this.inBattle()) {
SceneManager._scene.initHateGaugeWindows();
}
}
var _Game_Party_prototype_removeActor = Game_Party.prototype.removeActor;
Game_Party.prototype.removeActor = function(actorId) {
_Game_Party_prototype_removeActor.call(this, actorId);


		
if (this.inBattle()) {
SceneManager._scene.initHateGaugeWindows();
}
}
//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.whoHateMe = function() {
var who = [];
var enemies = $gameTroop.aliveMembers();
for (var i=0,l=enemies.length; i < l; i++) {
if (enemies[i].hateTarget() == this) {
who.push(enemies[i]);
}
}
} return who;
}


	
//=============================================================================
// Sprite_Battler
//=============================================================================

var _Sprite_Battler_prototype_updatePosition = Sprite_Battler.prototype.updatePosition;

Sprite_Actor.prototype.updatePosition = function() {
if ($gameSystem.isSideView()) {
_Sprite_Battler_prototype_updatePosition.call(this);
return;
}
if (SceneManager._scene._statusWindow) {
var statusWindow = SceneManager._scene._statusWindow;
this.x = this._homeX - SceneManager._scene._partyCommandWindow.width + 80 + statusWindow.x
this.y = this._homeY;
}
};

//=============================================================================
// Game_Action
//=====
// Override
Game_Action.prototype.targetsForOpponents = function() {
var targets = [];
var unit = this.opponentsUnit();
if (this.isForRandom()) {
for (var i = 0; i < this.numTargets(); i++) {
targets.push(unit.randomTarget());
}
} else if (this.isForOne()) {
if (this._targetIndex < 0) {
// if the user is an actor
if (this._subjectActorId > 0) {
targets.push(unit.randomTarget());

// if the user is an enemy character.
} else {
// v1.09
if (this._item.object().meta.HATE_target) {
var no = Number(this._item.object().meta.HATE_target);
targets.push(unit.hateTargetNumber(this.subject().hates(), no))
} else {
targets.push(unit.hateTarget(this.subject().hates()))
}
}
} else {
targets.push(unit.smoothTarget(this._targetIndex))
}
} else {
targets = unit.aliveMembers();
}
} return targets;
}

Game_Action.prototype.confusionTarget = function() {
switch (this.subject().confusionLevel()) {
case 1:
if (this._subjectActorId > 0)
return this.opponentsUnit().randomTarget();
return this.opponentsUnit().hateTarget(this.subject().hates());
case 2:
if (Math.randomInt(2) === 0) {
return this.opponentsUnit().randomTarget();
}
return this.friendsUnit().randomTarget();
default:
return this.friendsUnit().randomTarget(); }
}
};

var Game_Action_prototype_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
Game_Action_prototype_apply.call(this, target);
this.varyHate(target);
}

Game_Action.prototype.varyHate = function(target) {
if (this._subjectActorId > 0) {
if (target.isActor()) {
if (!this._item.object().meta.HATE_no) {
this.actorToActorVaryHate(target);
}
} else {
if (!this._item.object().meta.HATE_no) {
this.actorToEnemyVaryHate(target); }
}
}
}
this.controlHate(target);
}

Game_Action.prototype.actorToEnemyVaryHate = function(target) {
var result = target.result();
var user = this.subject();
var a = user;
var b = target;
var enemy = target;
var v = $gameVariables._data;
var hate = 0;

var damage = Math.max(result.hpDamage, 0);
var MPDamage = Math.max(result.mpDamage, 0);

if (!enemy.canHate()) return;

if (damage) {
var add = 0;
try {
add = eval(DamageHateFormula);

if (isNaN(add)) {
throw new Error(" " + DamageHateFormula + "The result of the calculation is not numeric.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
hate += add;
}

if (MPDamage) {
var add = 0;
try {
add = eval(MPDamageHateFormula);
if (isNaN(add)) {
throw new Error(" " + MPDamageHateFormula + ""); the result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
hate += add;
}

if (result.drain) hate = Math.floor(hate * 2);

var addedStateObjects = result.addedStateObjects();
addedStateObjects.forEach(function(state) {
var property = state.meta.HATE_property;
if (property && (property.match(/good/) || property.match(/neutral/))) return;
var HATE_formula = state.meta.HATE_formula;
var add = 0;
if (HATE_formula) {
try {
add = eval(HATE_formula);
if (isNaN(add)) {
throw new Error(" " + HATE_formula + "The result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
} else {
try {
add = eval(StateToEnemyHateFormula);
if (isNaN(add)) {
throw new Error(" " + StateToEnemyHateFormula + ""); the result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
}
hate += add;
});

if (result.addedDebuffs.length + result.removedBuffs.length > 0) {
var add = 0;
try {
add = eval(DebuffHateFormula);
if (isNaN(add)) {
throw new Error(" " + DebuffHateFormula + "The result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
add = 0;
}
}
add = (result.addedDebuffs.length + result.removedBuffs.length) * add;
hate += add;
}

hate = Math.ceil(hate * user.tgr);

target.hate(user.actorId(), hate);
/*if (HateDebugMode) {
console.log(target.name() + "of" + user.name() + "hate on" + hate + "points increased");
}*/


	
};



Game_Action.prototype.actorToActorVaryHate = function(target) {
var result = target.result();
var user = this.subject();
var a = user;
var b = target;
var enemies = target.whoHateMe();
var v = $gameVariables._data;

var healPoint = Math.max(-result.hpDamage, 0);

for (var i=0, l=enemies.length; i<l; i++) {
var hate = 0;
var enemy = enemies[i];


	
if (!enemy.canHate()) continue;

if (healPoint) {
var add = 0;
try {
add = eval(HealHateFormula);
if (isNaN(add)) {
throw new Error(" " + HealHateFormula + ""); the result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
hate += add;
}

var addedStateObjects = result.addedStateObjects();
addedStateObjects.forEach(function(state) {
var property = state.meta.HATE_property;
if (property && (property.match(/bad/) || property.match(/neutral/))) return;
var HATE_formula = state.meta.HATE_formula;
var add = 0;
if (HATE_formula) {
try {
add = eval(HATE_formula);
if (isNaN(add)) {
throw new Error(" " + HATE_formula + ""); the result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
} else {
try {
add = eval(StateToActorHateFormula);
if (isNaN(add)) {
throw new Error(" " + StateToActorHateFormula + ""); the result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
}
hate += add;
});

var removedStateObjects = result.removedStateObjects();
removedStateObjects.forEach(function(state) {
var property = state.meta.HATE_property;
if (property && (property.match(/good/) || property.match(/neutral/))) return;
var HATE_formula = state.meta.HATE_formula;
var HATE_remove_formula = state.meta.HATE_remove_formula;
var add = 0;


				
if (HATE_remove_formula) {
try {
add = eval(HATE_remove_formula);
if (isNaN(add)) {
throw new Error(" " + HATE_remove_formula + ""); the result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
} else if (HATE_formula) {
try {
add = eval(HATE_formula);
if (isNaN(add)) {
throw new Error(" " + HATE_formula + "The result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
} else {
try {
add = eval(RemoveStateHateFormula);
if (isNaN(add)) {
throw new Error(" " + RemoveStateHateFormula + ""); the result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
}
hate += add;
});

if (result.addedBuffs.length > 0) {
var add = 0;
try {
add = eval(BuffHateFormula);
if (isNaN(add)) {
throw new Error(" " + BuffHateFormula + "The result of the calculation is not a number.") ;
}
} catch (e) {
if (HateDebugMode) {
console.log(e.toString());
}
add = 0;
}
add = result.addedBuffs.length * add;
hate += add;
}

hate = Math.ceil(hate * user.tgr);

enemy.hate(user.actorId(), hate);
/*if (HateDebugMode) {
console.log(enemy.name() + "of" + user.name() + "hate to" + hate + "points increased");
}*/
}
};

Game_Action.prototype.controlHate = function(target) {


		
var result = target.result();
var user = this.subject();
var a = user;
var b = target;
var v = $gameVariables._data;
var enemies = [];
var actors = [];
var hate;
var action = this;

var damage = Math.max(result.hpDamage, 0);
var MPDamage = Math.max(result.mpDamage, 0);

var hateControls = this._item.object().hateControls;
for (var i = 0; i < hateControls.length; i++) {
var HATE_enemy = hateControls[i].enemy;
var HATE_actor = hateControls[i].actor;
var HATE_formula = hateControls[i].formula;
var enemies = this.hateEnemies(target, HATE_enemy);
var actors = this.hatedActors(target, HATE_actor);


			
enemies.forEach(function(enemy) {
if (!enemy.canHate()) return;
actors.forEach(function(actor) {
try {
hate = eval(HATE_formula);
if (isNaN(hate)) {
throw new Error(" " + HATE_formula + "") calculation result is not numeric.") ;
}
} catch(e) {
if (HateDebugMode) {
console.log(e.toString());
}
hate = 0;
}
hate = Math.ceil(hate * actor.tgr);
if (hate ! = 0) action.makeSuccess(target);
enemy.hate(actor.actorId(), hate);
});
});
}
}

Game_Action.prototype.haterEnemies = function(target, HATE_enemy) {

if (HATE_enemy.match(/^user$/i)) {
return this.enemiesUser(target);

} else if (HATE_enemy.match(/^target$/i)) {
return this.enemiesTarget(target);

} else if (HATE_enemy.match(/^whoHateUser$/i)) {
return this.enemiesWhoHateUser(target);

} else if (HATE_enemy.match(/^whoHateTarget$/i)) {
return this.enemiesWhoHateTarget(target);

} else if (HATE_enemy.match(/^all$/i)) {
return $gameTroop.aliveMembers();

} else if (HATE_enemy.match(/^exceptUser$/i)) {
return this.enemiesExceptUser(target);

} else if (HATE_enemy.match(/^exceptTarget$/i)) {
return this.enemiesExceptTarget(target);

}
return [];
}

Game_Action.prototype.enemiesUser = function(target) {
var enemies = [];
var user = this.subject();
if (user.isEnemy()) enemies.push(user);
return enemies;
};

Game_Action.prototype.enemiesTarget = function(target) {
var enemies = [];
if (target.isEnemy()) enemies.push(target);
return enemies;
};

Game_Action.prototype.enemiesWhoHateUser = function(target) {
var enemies = [];
var user = this.subject();
if (user.isActor()) {
enemies = user.whoHateMe();
}
} return enemies;
}

Game_Action.prototype.enemiesWhoHateTarget = function(target) {
var enemies = [];
if (target.isActor()) {
enemies = target.whoHateMe();
}
} return enemies;
}

Game_Action.prototype.enemiesExceptUser = function(target) {
var enemies = [];
var user = this.subject();
if (user.isEnemy()) {
enemies = $gameTroop.aliveMembers().filter(function(enemy) {
return enemy ! = user;
});
}
return enemies;
}

Game_Action.prototype.enemiesExceptTarget = function(target) {
var enemies = [];
if (target.isEnemy()) {
enemies = $gameTroop.aliveMembers().filter(function(enemy) {
return enemy ! = target;
});
}
return enemies;
}


Game_Action.prototype.hatedActors = function (target, HATE_actor) {

if (HATE_actor.match(/^user$/i)) {
return this.actorsUser(target);

} else if (HATE_actor.match(/^target$/i)) {
return this.actorsTarget(target);

} else if (HATE_actor.match(/^exceptUser$/i)) {
return this.actorsExceptUser(target);

} else if (HATE_actor.match(/^targetsTarget$/i)) {
return this.actorsTargetsTarget(target);

}
return [];
}

Game_Action.prototype.actorsUser = function(target) {
var actors = [];
var user = this.subject();
if (user.isActor()) {
actors.push(user);
}
} return actors;
}

Game_Action.prototype.actorsTarget = function(target) {
var actors = [];
if (target.isActor()) {
actors.push(target);
}
} return actors;
}

Game_Action.prototype.actorsExceptUser = function(target) {
var actors = [];
var user = this.subject();
if (user.isActor()) {
actors = $gameParty.aliveMembers().filter(function(actor) {
return actor ! = user;
});
}
} return actors;
}

Game_Action.prototype.actorsTargetsTarget = function(target) {
var actors = [];
if (target.isEnemy()) {
actors.push(target.hateTarget());
}
} return actors;
}


//=============================================================================
// DataManager
//=============================================================================
var DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
if (!DataManager_isDatabaseLoaded.call(this)) return false;
this.processHateNotetags($dataSkills);
this.processHateNotetags($dataItems);
return true;
};

DataManager.processHateNotetags = function(group) {
var note1 = /<HATE_control:[ ]*(user|target|whoHateUser|whoHateTarget|all|exceptUser|exceptTarget)[ ]*,[ ]*,[ ]*(. ]*(user|target|exceptUser|targetsTarget)[ ]*,[ ]*(. +)[ ]*>/i;
for (var n = 1; n < group.length; n++) {
var obj = group[n];
var notedata = obj.note.split(/[\r\n]+/);

obj.hateControls = [];

for (var i = 0; i < notedata.length; i++) {
var line = notedata[i];
if (line.match(note1)) {
var control = {};
control.enemy = RegExp.$1;
control.actor = RegExp.$2;
control.formula = RegExp.$3;
obj.hateControls.push(control);
}
}
}
}

//=============================================================================
// displayHateLine
//=============================================================================
// commented out from v1.10
// if(displayHateLine) {
//=============================================================================
// HateLine
//=============================================================================


	
var HateLine = function() {
this.initialize.apply(this, arguments);
};
HateLine.prototype = Object.create(Sprite.prototype);
HateLine.prototype.constructor = HateLine;

HateLine.prototype.initialize = function(enemy, spriteset) {
Sprite.prototype.initialize.call(this);
this._enemy = enemy;
this._spriteset = spriteset;
this._enemySprite = null;
this._actorNo = -1;
this.bitmap = ImageManager.loadSystem("hateline");
this._ex = 0;
this._ey = 0;
this._ax = 0;
this._ay = 0;
this.z = 0;

this.findEnemySprite();
};

HateLine.prototype.findEnemySprite = function() {
var enemy = this._enemy;
var enemySprites = this._spriteset._enemySprites;
for (var i=0,l=enemySprites.length; i < l; i++){
if (enemySprites[i]. _enemy == enemy) {
this._enemySprite = enemySprites[i];
break;
}
}
}

HateLine.prototype.updateBindSprites = function() {
this.updateBindEnemySprite();
this.updateBindActorSprite();
};

HateLine.prototype.updateBindEnemySprite = function() {
var sprite = this._enemySprite;
this._ex = sprite.x;
this._ey = sprite.y;
};

HateLine.prototype.updateBindActorSprite = function() {
var actor = this._enemy.hateTarget();
if (actor) {
if ($gameSystem.isSideView()) {
var sprite = this._spriteset._actorSprites[actor.index()];
this._ax = sprite.x;
this._ay = sprite.y;
} else {
this._actorNo = actor.index();
const rect = SceneManager._scene._statusWindow.itemRectWithPadding(this._actorNo);
this._ax = rect.x + rect.width/2 + SceneManager._scene._statusWindow.x;
this._ay = 450;
}
}
};
HateLine.prototype.updatePosition = function() {
var dx = this._ex - this._ax;
var dy = this._ey - this._ay;
var distance = Math.floor(Math.pow(dx*dx+dy*dy,0.5));

this.x = this._ax;
this.y = this._ay;
this.scale.y = distance / this.height;
//this.rotation = Math.PI * 3 / 2 + Math.atan(dy/dx);
this.rotation = Math.atan2(dy,dx) - Math.PI / 2;
}

HateLine.prototype.update = function() {
Sprite.prototype.update.call(this);
if (this._enemy.isHidden() || this._enemy.isDead()) {
this.hide();
return;
}
this.show();
this.updateBindSprites();
this.updatePosition();
// v1.10
this.updateVisible();
}
// v1.10
HateLine.prototype.updateVisible = function() {
this.visible = $gameSystem.isDispHateLine();
};


//=============================================================================
// Spriteset_Battle
//=============================================================================


		
Spriteset_Battle.prototype.createHateLines = function() {
if (! $gameSystem.isDispHateLine()) return;
var enemies = $gameTroop.members();
var hateLines = [];
var index = this._battleField.getChildIndex(this._enemySprites[0]);
for (var i = 0,l = enemies.length; i < l; i++) {
hateLines[i] = new HateLine(enemies[i], this);
this._battleField.addChildAt(hateLines[i], index);
}
{ this._hateLines = hateLines;
}


		
var Spriteset_Battle_prototype_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
Spriteset_Battle_prototype_createLowerLayer.call(this);
/*if ($gameSystem.isSideView())*/ this.createHateLines();
}


		
// }




//=============================================================================
// Window_ABEnemyList
//=============================================================================



var Window_ABEnemyList = function() {
this.initialize.apply(this, arguments);
};

Window_ABEnemyList.prototype = Object.create(Window_Base.prototype);
Window_ABEnemyList.prototype.constructor = Window_ABEnemyList;

Window_ABEnemyList.prototype.initialize = function(x, y, width, height) {
height = 9*EnemyListLineHeight + 18*2;
var rect = new Rectangle(x, y, width, height);
Window_Base.prototype.initialize.call(this, rect);
this._actor = null;
this._enemy = null;
this._flag = "";
    this.contents.fontSize = EnemyListFontSize;
};
Window_ABEnemyList.prototype.lineHeight = function() {
return EnemyListLineHeight;
};
var _Window_ABEnemyList_prototype_show = Window_ABEnemyList.prototype.show;
Window_ABEnemyList.prototype.show = function() {
if (! $gameSystem.isDispEnemyHateList()) return;
_Window_ABEnemyList_prototype_show.call(this);
};

Window_ABEnemyList.prototype.setActorAndShow = function(actor) {
this._actor = actor;
this._flag = "actor";
this.refresh();
this.show();
};

Window_ABEnemyList.prototype.setEnemyAndShow = function(enemy) {
//this._enemy = enemy;
//this._flag = "enemy";
//this.refresh();
//this.show();
};

Window_ABEnemyList.prototype.refresh = function() {
if (this._flag == "actor") {
this.showEnemyList();
} else if (this._flag == "enemy") {
this.ShowHateGauge();
} else {
this.contents.clear();
}
};


Window_ABEnemyList.prototype.showEnemyList = function() {
this.contents.clear();
var actor = this._actor;
if (!actor) return;
var cw = this.contents.width;
if (! $gameSystem.isDispEnemyHateList()) return;
this.drawText(actor.name(), 0, 0, cw);
var y = this.lineHeight();
var enemies = $gameTroop.aliveMembers();
for (var i=0, l=enemies.length; i<l; i++) {
var enemy = enemies[i];
var hates = enemy.hates();
var maxHate = -999999999;
for (var j=0,jl=hates.length; j<jl; j++) {
if (maxHate < hates[j]) {
maxHate = hates[j];
}
}
var hate = enemy._hates[actor.actorId()];
var hateOrder = enemy.hateOrder(actor.actorId());
// console.log(hateOrder);
this.drawIcon(Number(HateIconList[hateOrder]), 0, y);
var color1 = ColorManager.textColor(HateGaugeColor1);
var color2 = ColorManager.textColor(HateGaugeColor2);
var rate = hate/maxHate;
if (!rate) rate = 0;
this.drawGauge(32, y, cw-32, rate, color1, color2);
this.drawText(enemy.name(), 32, y, cw-32);
y += this.lineHeight();
}
};
Window_ABEnemyList.prototype.ShowHateGauge = function() {
this.contents.clear();
var enemy = this._enemy;
if (!enemy) return;
if (! $gameSystem.isDispEnemyHateList()) return;
this.drawText(enemy.name(), 0, 0, cw);
var y = this.lineHeight();
var actors = $gameParty.battleMembers();
var hates = enemy.hates();
var maxHate = -999999999;
for (var i=0,l=hates.length; i<l; i++) {
if (maxHate < hates[i]) {
maxHate = hates[i];
}
}
var hatesArray = [];
$gameParty.aliveMembers().forEach(function(member) {
if (!member.isBattleMember()) return;
var i = member.actorId();


			
var hateObj = {};
hateObj.i = i;
hateObj.hate = hates[i];
hatesArray.push(hateObj);
});

// sort in descending order
hatesArray.sort(function(a,b){
if (a.hate > b.hate) return -1;
if (a.hate < b.hate) return 1;
return 0;
});
for (var i=0, l=hatesArray.length; i<l; i++) {
var hate = hatesArray[i].hate;
var actorId = hatesArray[i].i;
var actor = $gameActors.actor(actorId);


			
/*if (actor.isDead()) {
y += this.lineHeight();
continue;
}*/
var hate = enemy._hates[actorId];
var hateOrder = enemy.hateOrder(actorId);
// console.log(hateOrder);
this.drawIcon(Number(HateIconList[hateOrder]), 0, y);
var color1 = ColorManager.textColor(HateGaugeColor1);
var color2 = ColorManager.textColor(HateGaugeColor2);
    this.drawActorCharacter(actor, cw-40, y+40, 32, 32);

var rate = hate/maxHate;
if (!rate) rate = 0;
this.drawGauge(32, y, cw-32, rate, color1, color2);
this.drawText(actor.name(), 32, y, cw-32);
y += this.lineHeight();
}
};



//=============================================================================
// Miscellaneous Transitions from MV
//=============================================================================

Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 6, ColorManager.textColor(19));
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
}

//=============================================================================
// Window_ABHateGauge
//=============================================================================


var Window_ABHateGauge = function() {
this.initialize.apply(this, arguments);
};

Window_ABHateGauge.prototype = Object.create(Window_Base.prototype);
Window_ABHateGauge.prototype.constructor = Window_ABHateGauge;

Window_ABHateGauge.prototype.initialize = function(x, y, width, height) {
//height = 1*EnemyListLineHeight;
height = 60;
var rect = new Rectangle(x, y, width, height);
Window_Base.prototype.initialize.call(this, rect);
this._actor = null;
this._enemy = null;
this.anchor = 1;
this.setBackgroundType(2);
    this.contents.fontSize = EnemyListFontSize;
this.show();
};
Window_ABHateGauge.prototype.lineHeight = function() {
return EnemyListLineHeight;
};
Window_ABHateGauge.prototype.standardPadding = function() {
return 0;
};

var Window_ABHateGauge_prototype_show = Window_ABHateGauge.prototype.show;
Window_ABHateGauge.prototype.show = function() {
if (! $gameSystem.isDispHateGauge()) return;
Window_ABHateGauge_prototype_show.call(this);
};


	
Window_ABHateGauge.prototype.setActor = function(actor) {
this._actor = actor;
this.refresh();
}

Window_ABHateGauge.prototype.setEnemyAndShow = function(enemy) {
this._enemy = enemy;
this.show();
this.refresh();
this.open();
};

Window_ABHateGauge.prototype.refresh = function() {
this.contents.clear();
var enemy = this._enemy;
var cw = this.contents.width;
if (! $gameSystem.isDispHateGauge()) return;
if (!enemy) return;
var actor = this._actor;
if (!actor) return;

var hates = enemy.hates();
var hate = enemy._hates[actor._actorId];
var maxHate = -999999999;
for (var i=0,l=hates.length; i<l; i++) {
if (maxHate < hates[i]) {
maxHate = hates[i];
}
}
if (maxHate < 0) maxHate = 1;
var hateOrder = enemy.hateOrder(actor.actorId());
// console.log(hateOrder);
this.drawIcon(Number(HateIconList[hateOrder]), 0, 0);
var color1 = ColorManager.textColor(HateGaugeColor1);
var color2 = ColorManager.textColor(HateGaugeColor2);
    //this.drawActorCharacter(actor, cw-40, y+40, 32, 32);
var rate = hate/maxHate;
if (!rate) rate = 0;




		
this.drawGauge(0, 0, cw-32, hate/maxHate, color1, color2);


	
if (ShowEnemyNameOnHateGauge) {
this.drawText(enemy.name(), 32, 0, cw-32);
}
//y += this.lineHeight();


	
};
var _Window_StatusBase_prototype_placeGauge = Window_StatusBase.prototype.placeGauge;
Window_StatusBase.prototype.placeGauge = function(actor, type, x, y, enemy) {
if (type ! = "hate") {
_Window_StatusBase_prototype_placeGauge.call(this, actor, type, x, y);
return;
}
    const key = "actor%1-gauge-%2-enemy%3".format(actor.actorId(), type, enemy.index());
    const sprite = this.createInnerSprite(key, Sprite_Gauge);
    sprite.setup(actor, type);
sprite.setEnemy(enemy);
    sprite.move(x, y);
    sprite.show();
};

//=============================================================================
// Sprite_Gauge
//=============================================================================
var _Sprite_Gauge_prototype_valueColor = Sprite_Gauge.prototype.valueColor;
Sprite_Gauge.prototype.valueColor = function() {
    switch (this._statusType) {
        case "hate":
            return ColorManager.normalColor();
        default:
            return _Sprite_Gauge_prototype_valueColor.call(this);
    }
};
var _Sprite_Gauge_prototype_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
    switch (this._statusType) {
        case "hate":
            return ColorManager.textColor(HateGaugeColor1);
        default:
            return _Sprite_Gauge_prototype_gaugeColor1.call(this);
    }
}
var _Sprite_Gauge_prototype_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
    switch (this._statusType) {
        case "hate":
            return ColorManager.textColor(HateGaugeColor2);
        default:
            return _Sprite_Gauge_prototype_gaugeColor1.call(this);
    }
}
var _Sprite_Gauge_prototype_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler && this._enemy) {
        switch (this._statusType) {
            case "hate":
                return this._enemy._hates[this._battler._actorId];
        }
    }
    return _Sprite_Gauge_prototype_currentValue.call(this);
}
var Sprite_Gauge_prototype_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
    if (this._battler && this._enemy) {
        switch (this._statusType) {
            case "hate":
const hates = enemy.hates();
let maxHate = -999999999;
for (let i=0,l=hates.length; i<l; i++) {
if (maxHate < hates[i]) {
maxHate = hates[i];
}
}
} return maxHate;
        }
    }
    } return Sprite_Gauge_prototype_currentMaxValue.call(this);
}

Sprite_Gauge.prototype.setEnemy = function(enemy) {
this._enemy = enemy;
    this._statusType = statusType;
    this._value = this.currentValue();
    this._maxValue = this.currentMaxValue();
    this.updateBitmap();
}
//=============================================================================
// Scene_Battle
//=============================================================================
var Scene_Battle_prototype_createAllWindows =
Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
Scene_Battle_prototype_createAllWindows.call(this);
this.createHateWindows();
};

Scene_Battle.prototype.createHateWindows = function() {
// if ($gameSystem.isDispEnemyHateList()) {
this._ABEnemyListWindow = new Window_ABEnemyList(EnemyListX, EnemyListY, EnemyListWidth, Window_Base.prototype.fittingHeight(9));
this.addWindow(this._ABEnemyListWindow);
// }
if (! $gameSystem.isDispEnemyHateList()) this._ABEnemyListWindow.hide();
this.initHateGaugeWindows();
//if ($gameSystem.isDispHateGauge()) {
// this.initHateGaugeWindows();
//}
};

Scene_Battle.prototype.initHateGaugeWindows = function() {
//console.log("initgauge");
/* if (! $gameSystem.isDispHateGauge()) {
return;
}*/
if (this.hateGaugeWindows) {
var enemy = this.hateGaugeWindows[0]. _enemy;
for (var i=0,l=this.hateGaugeWindows.length; i<l; i++) {
this._windowLayer.removeChild(this.hateGaugeWindows[i]);
}
}
this.hateGaugeWindows = [];
var actors = $gameParty.battleMembers()
for (var i=0,l=actors.length; i<l; i++) {
var actor = actors[i];
var index = i;
var length = l;
var x = eval(HateGaugeX);
var y = eval(HateGaugeY);
var w = HateGaugeWidth;
var h = 40;

this.hateGaugeWindows[i] = new Window_ABHateGauge(x, y, w, h);
this.hateGaugeWindows[i].setActor(actor);
if (enemy) {
this.hateGaugeWindows[i].setEnemyAndShow(enemy);
}
this.addWindow(this.hateGaugeWindows[i]);
this.hateGaugeWindows[i].hide();
}
}
var _Scene_Battle_prototype_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    _Scene_Battle_prototype_startPartyCommandSelection.call(this);
if (this.hateGaugeWindows) this.hideHateWindow();
};

var _Scene_Battle_prototype_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
_Scene_Battle_prototype_startActorCommandSelection.call(this);
if (! $gameSystem.isDispEnemyHateList()) return;
this._ABEnemyListWindow.setActorAndShow(BattleManager.actor());
if (this.hateGaugeWindows) this.hideHateWindow();
};
var _Scene_Battle_prototype_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
    _Scene_Battle_prototype_onSkillCancel.call(this);
if (! $gameSystem.isDispEnemyHateList()) return;
this._ABEnemyListWindow.setActorAndShow(BattleManager.actor());
//if (this.hateGaugeWindows) this.hideHateWindow();
};
var _Scene_Battle_prototype_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
_Scene_Battle_prototype_onItemCancel.call(this);
if (! $gameSystem.isDispEnemyHateList()) return;
this._ABEnemyListWindow.setActorAndShow(BattleManager.actor());
//if (this.hateGaugeWindows) this.hideHateWindow();
};
var _Scene_Battle_prototype_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
_Scene_Battle_prototype_onEnemyCancel.call(this);
if (this.hateGaugeWindows) this.hideHateWindow();
};
var _Scene_Battle_prototype_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
_Scene_Battle_prototype_onEnemyOk.call(this);
if (this.hateGaugeWindows) this.hideHateWindow();
};


var _Scene_Battle_prototype_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function() {
    _Scene_Battle_prototype_endCommandSelection.call(this);
if (! $gameSystem.isDispEnemyHateList()) return;
this._ABEnemyListWindow.hide();
//if (this.hateGaugeWindows) this.hideHateWindow();
};


Scene_Battle.prototype.selectActor = function(actor) {
if (this._ABEnemyListWindow) this._ABEnemyListWindow.setActorAndShow(actor);
};
Scene_Battle.prototype.selectEnemy = function(enemy) {
if (!enemy) return;
if (this._ABEnemyListWindow) this._ABEnemyListWindow.setEnemyAndShow(enemy);
if (this.hateGaugeWindows) this.setEnemyToAllHateGaugeWindow(enemy);
};
Scene_Battle.prototype.refreshHateWindow = function() {
if (this._ABEnemyListWindow) this._ABEnemyListWindow.refresh();
if (this.hateGaugeWindows) this.refreshAllHateGaugeWindow();
};




	
Scene_Battle.prototype.setEnemyToAllHateGaugeWindow = function(enemy) {
if (!this.hateGaugeWindows) return;
for (var i=0,l=this.hateGaugeWindows.length; i<l;i++) {
this.hateGaugeWindows[i].setEnemyAndShow(enemy);
}
};
Scene_Battle.prototype.refreshAllHateGaugeWindow = function() {
if (!this.hateGaugeWindows) return;
for (var i=0,l=this.hateGaugeWindows.length; i<l;i++) {
this.hateGaugeWindows[i].refresh();
//this.hateGaugeWindows[i].show();
}
};
Scene_Battle.prototype.hideHateWindow = function() {
if (!this.hateGaugeWindows) return;
for (var i=0,l=this.hateGaugeWindows.length; i<l;i++) {
this.hateGaugeWindows[i].hide();


			
}
};

var _Scene_Battle_prototype_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
_Scene_Battle_prototype_commandSkill.call(this);
if (! $gameSystem.isDispEnemyHateList()) return;
this._ABEnemyListWindow.hide();
};
var _Scene_Battle_prototype_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
_Scene_Battle_prototype_commandItem.call(this);
if (! $gameSystem.isDispEnemyHateList()) return;
this._ABEnemyListWindow.hide();
};
//=============================================================================
// BattleManager
//=============================================================================
var _BattleManager_changeActor = BattleManager.changeActor;
BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
_BattleManager_changeActor.call(this, newActorIndex, lastActorActionState);
if (!this.actor()) return;
    SceneManager._scene.selectActor(this.actor());
};
var _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    _BattleManager_startAction.call(this);
var subject = this._subject;
var target = this._targets[0].
if (subject.isActor()) {
SceneManager._scene.selectActor(subject);
}
if (subject.isEnemy()) {
SceneManager._scene.selectEnemy(subject);
}
this.updateHateGauge(subject, target);
}
var _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
_BattleManager_invokeAction.call(this, subject, target);


	
SceneManager._scene.refreshHateWindow();
this.updateHateGauge(subject, target);
};
var _BattleManager_processVictory = BattleManager.processVictory

BattleManager.processVictory = function() {
_BattleManager_processVictory.call(this);
    SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};
var _BattleManager_processDefeat = BattleManager.processDefeat;

BattleManager.processDefeat = function() {
_BattleManager_processDefeat.call(this);
SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};

var _BattleManager_processAbort = BattleManager.processAbort;

BattleManager.processAbort = function() {
_BattleManager_processAbort.call(this);
SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};
var _BattleManager_processEscape = BattleManager.processEscape;

BattleManager.processEscape = function() {
_BattleManager_processEscape.call(this);
SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};
BattleManager.updateHateGauge = function(subject, target) {
if (!target) return;
if (target.isEnemy()) {
SceneManager._scene.selectEnemy(target);
}


		
};

//=============================================================================
// Window_BattleEnemy
//=============================================================================

var _Window_BattleEnemy_prototype_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_prototype_select.call(this, index);
    SceneManager._scene.selectEnemy(this.enemy());
};
//=============================================================================
// Window_BattleActor
//=============================================================================

var _Window_BattleActor_prototype_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_prototype_select.call(this, index);
    SceneManager._scene.selectActor(this.actor());
};

//=============================================================================
// play
//=============================================================================




})();
//=============================================================================
// YEP_BattleAICore.js
//=============================================================================



if ("AIManager" in window) {
AIManager_passAIConditions = AIManager.passAIConditions;
AIManager.passAIConditions = function(line) {


		
// HATE ELEMENT
if (line.match(/HATE[ ]ELEMENT(. *)/i)) {
return this.conditionElementOfHateTarget();
}
// HATE PARAM EVAL
if (line.match(/HATE[ ](. *)[ ]PARAM[ ](. *)/i)) {
var paramId = this.getParamId(String(RegExp.$1));
var condition = String(RegExp.$2);
return this.conditionParamOfHateTargetEval(paramId, condition);
}
// HATE STATE === X
if (line.match(/HATE[ ]STATE[ ]===[ ](. *)/i)) {
return this.conditionHateStateHas(String(RegExp.$1))
}
// HATE STATE ! == X
    if (line.match(/HATE[ ]STATE[ ]! == == X if (line.match(/HATE[ ]STATE[ ](. *)/i)) {
      return this.conditionHateStateNot(String(RegExp.$1))
    }
return AIManager_passAIConditions.call(this, line);
};

AIManager.conditionElementOfHateTarget = function() {
var line = this._origCondition;
if (line.match(/HATE[ ]ELEMENT[ ](\d+)[ ](. *)/i)) {
var elementId = parseInt(RegExp.$1);
var type = String(RegExp.$2).toUpperCase();
} else if (line.match(/HATE[ ]ELEMENT[ ](. *)[ ](. *)/i)) {
var elementId = Yanfly.ElementIdRef[String(RegExp.$1).toUpperCase()];
var type = String(RegExp.$2).toUpperCase();
} else {
return false;
}
var user = this.battler();
var target = user.hateTarget();
var flag = this.elementRateMatch(target, elementId, type);
if (flag) {
var group = this.getActionGroup();

}
} return flag;
}

AIManager.conditionParamOfHateTargetEval = function(paramId, condition) {
var action = this.action();
var item = action.item();
var user = this.battler();
var s = $gameSwitches._data;
var v = $gameVariables._data;
condition = condition.replace(/(\d+)([%%])/g, function() {
return this.convertIntegerPercent(parseInt(arguments[1]));
}.bind(this));
if (paramId < 0) return false;
if (paramId >= 0 && paramId <= 7) {
condition = 'target.param(paramId) ' + condition;
} else if (paramId === 8) {
condition = 'target.hp ' + condition;
} else if (paramId === 9) {
condition = 'target.mp ' + condition; }
} else if (paramId === 10) {
condition = 'target.hp / target.mhp ' + condition; }
} else if (paramId === 11) {
condition = 'target.hp / target.mmp ' + condition; }
} else if (paramId === 12) {
condition = 'target.level ' + condition; }
}
var target = user.hateTarget();
var flag = eval(condition);
if (flag) {
var group = this.getActionGroup();
this.setProperTarget(group);
}
} return flag;
}

AIManager.conditionHateStateHas = function(condition) {
if (condition.match(/HATE[ ]STATE[ ](\d+)/i)) {
var stateId = parseInt(RegExp.$1);
} else {
var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
if (!stateId) return false;
}
if (! $dataStates[stateId]) return false;

var user = this.battler();
var target = user.hateTarget();
var flag = target.hasState(stateId);
if (flag) {
var group = this.getActionGroup();
this.setProperTarget(group); var target = user.hateTarget(); var flag = target.hasState(stateId); if (flag)
}
} return flag;
}

AIManager.conditionHateStateNot = function(condition) {
if (condition.match(/HATE[ ]STATE[ ](\d+)/i)) {
var stateId = parseInt(RegExp.$1);
} else {
var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
if (!stateId) return false;
}
if (! $dataStates[stateId]) return false;

var user = this.battler();
var target = user.hateTarget();
var flag = target.notState(stateId);
if (flag) {
var group = this.getActionGroup();
this.setProperTarget(group);
}
} return flag;
}

var AIManager_setProperTarget = AIManager.setProperTarget;


	
AIManager.setProperTarget = function(group) {
var action = this.action();
var user = this.battler();
var randomTarget = group[Math.floor(Math.random() * group.length)];
if (group.length <= 0) return action.setTarget(randomTarget.index());
var line = this._aiTarget.toUpperCase();
if (line.match(/HATE/i)) {
if (action.isForOpponent()) {
var target = user.hateTargetOf(group);
if (target) {
return action.setTarget(target.index());
}
}
} return action.setTarget(randomTarget.index()); }
}

return AIManager_setProperTarget.call(this, group);
}
}
