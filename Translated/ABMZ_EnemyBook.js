// =============================================================================
// ABMZ_EnemyBook.js
// Version: 1.42
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================



/*:
 * @target MZ
 * @plugindesc v1.42 Displays detailed statuses of enemies.
 * Includes element rates, state rates etc.
 * @author ヱビ
 * @url http://www.zf.em-net.ne.jp/~ebi-games/
 * 
 * @param ShowCommandInBattle
 * @text Show "Enemy Info" Command
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to show the "Enemy Info" command in the battle scenes?
 * You can change this in pluguin command. 0: show, 1:hide
 * @default 1
 * 
 * @param ShowAllBookCommandInBattle
 * @text Show "Enemybook" Command
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to show the "Enemybook" command in the battle scenes?
 * You can change this in pluguin command. 0: show, 1:hide
 * @default 1
 * 
 * @param ResisterTiming
 * @type select
 * @option never
 * @value 0
 * @option when the battle start
 * @value 1
 * @option when the battle end
 * @value 2
 * @desc This is the timing when the enemies resister to the enemy book.
 * 0:never, 1:when the battle start, 2:when the battle end
 * @default 2
 * 
 * @param ShowCurrentStatus
 * @text Show Current Status In The "Enemybook"
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to display "current status" like current HP in "Enemybook" and "Enemy Info"?
 * You can change this in pluguin command. 0: ON, 1:OFF
 * @default 0
 * 
 * @param HideUnknownStatusInSkill
 * @text Hide Unknown's Status On "Check Skill"
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to hide status on "Check Skill" if the enemy is unknown? 0:OFF、1:ON
 * @default 0
 * 
 * @param ShowGeneralStatusInSkill
 * @text Show General Status In "Check Skill"
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to display general status in "Check Skill" ? (general status <--> current status)
 * @default 0
 * 
 * @param HideItemUntilGet
 * @text Hide Item Until Get
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to hide items until get? 0:OFF、1:ON
 * @default 0
 * 
 * @param ShortCutButtonName
 * @text Shortcut Button Name
 * @type string
 * @desc Display "Enemy Info" when this key triggerd.
 * @default shift
 * 
 * @param BackgroundImage
 * @text Background Image
 * @type file
 * @dir img/parallaxes
 * @desc This is the Background image.
 * 
 * @param BackgroundImageOpacity
 * @text Background Image Opacity
 * @type number
 * @desc This is the Background image opacity.(0~255)
 * @default 120
 * 
 * @param SpreadBackgroundImage
 * @text Spread Background Image
 * @type boolean
 * @desc Do you wish to spread "Check Skill" window width to cover the all width?
 * @default false
 * 
 * @param EnemyOffsetY
 * @text Enemy Photo Offset Y
 * @type number
 * @min -9999
 * @desc This is the pixel number how much move to down from defaut position. If Minus number, move to up.
 * @default 0
 * 
 * 
 * @param ---Terms and Icons---
 * @default 
 * 
 * @param EnemyBookCommandName
 * @text "Enemy Info" Command Name
 * @desc This is the command name show the battle enemies status in the battle scene.
 * @default Enemy Info
 * 
 * @param EnemyBookAllCommandName
 * @text "Enemybook" Command Name
 * @desc This is the command name show the all enemies status in the battle scene.
 * @default Enemybook
 * 
 * @param Achievement
 * @desc This is the "Achivement" name write in the enemybook. The rate of enemies number registers in the book.
 * @default Achievement
 * 
 * @param UnknownEnemy
 * @text Unknown Enemy Name
 * @desc This is the index name of enemies that isn't resisterd in the book.
 * @default ??????
 * 
 * @param UnknownData
 * @text Data Name Of Unknown Enemy
 * @desc This is the content of unknown enemies' status.
 * @default ???
 * 
 * @param HitRateName
 * @text Hit Rate Name
 * @type string
 * @desc This is the name of Hit Rate.
 * @default Hit Rate
 * 
 * @param EvadeRateName
 * @text Evade Rate Name
 * @type string
 * @desc This is the name of Evade Rate.
 * @default Evade Rate
 * 
 * @param WeakElementName
 * @text Weak Element Name
 * @desc This is the name of weak element.
 * @default Weak Element
 * 
 * @param ResistElementName
 * @text Resist Element Name
 * @desc This is the name of resist element.
 * @default Resist Element
 * 
 * @param WeakStateName
 * @text Weak State Name
 * @desc This is the name of weak states.
 * @default Weak State
 * 
 * @param ResistStateName
 * @text Resist State Name
 * @desc This is the name of resister states. (includes invalid states).
 * @default Resist State
 * 
 * @param NoEffectStateName
 * @text Invalid States Name
 * @desc This is the name of invalid states.
 * @default Invalid State
 * 
 * @param DefeatNumberName
 * @text Defeat Number Name
 * @desc This is the name of defeat number.
 * @default Defeat
 * 
 * @param UnknownDropItemIcon
 * @text Unknown Drop Item Icon
 * @type number
 * @min 0
 * @desc This is the icon number of drop items unknown enemies have.
 * default：16
 * @default 16
 * 
 * @param AddEnemySkillMessage
 * @text Succeed Message to Resister Enemy Skill
 * @desc This is the message when players succeed in resister to the Enemybook. 
 * %1......Enemy Name
 * @default Resisterd %1 In the Enemybook!
 * 
 * @param FailToAddEnemySkillMessage
 * @text Unreasonable Message to Resister Enemy Skill
 * @desc This is the message when players use check skill for the enemy 
 * that can't be resisterd to the Enemybook. %1......Enemy Name
 * @default %1 Can't be resisterd to the Enemybook!

 * @param MissToAddEnemySkillMessage
 * @text Miss Message To Resister Enemy Skill
 * @desc This is the message when the "Resister Skill" was missed. %1......Enemy Name
 * @default Missed to resister %1 in the Enemybook!
 * 
 * @param FailToCheckEnemySkillMessage
 * @text Miss Massage To "Check Skill"
 * @desc This is the message when the "Check Skill" was missed.
 * %1......Enemy Name
 * @default Missed to Check %1's States!
 * 
 * @param ---Display Item---
 * @default 
 * 
 * @param DispNo
 * @text Display No
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display index number of enemy in Enemybook? 1:show, 0:hide
 * @default 1
 * 
 * @param DispLv
 * @text Display Level
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display level of enemy in Enemybook? 1: show, 0: hide
 * @default 1
 * 
 * @param DispDefeatNumber
 * @text Display Defeat Number
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display defeat number in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispHP
 * @text Display HP
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display HP in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispMP
 * @text Display MP
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display MP in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispTP
 * @text Display TP
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display TP in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispATK
 * @text Display ATK
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display ATK in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispDEF
 * @text Display DEF
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display DEF in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispMAT
 * @text Display MAT
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display MAT in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispMDF
 * @text Display MDF
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display MDF in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispAGI
 * @text Display AGI
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display AGI in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispLUK
 * @text Display LUK
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display LUK in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispHitRate
 * @text Display Hit Rate
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Hit Rate in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispEvadeRate
 * @text Display Evade Rate
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Evade Rate in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispSkillNumber
 * @text Display Skills Number
 * @type number
 * @desc How many skills Do you wish to display?
 * @default 0
 * 
 * @param DispDropItems
 * @text Display Drop Items
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Drop Items in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispWeakElement
 * @text Display Weak Element
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Weak Element in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispResistElement
 * @text Display Resist Element
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Resist Element in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispWeakState
 * @text Display Weak State
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Weak State in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispResistState
 * @text Display Resist State
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Resist State in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DispNoEffectState
 * @text Display Invalid State
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Invalid State in the Enemybook? 0: show, 1: hide
 * @default 0
 * 
 * @param DispDescribe
 * @text Display Describe
 * @type select
 * @option show
 * @value 1
 * @option hide
 * @value 0
 * @desc Do you wish to display Describe in the Enemybook? 0: show, 1: hide
 * @default 1
 * 
 * @param DescribeLineNumber
 * @text Describe Line Number
 * @type number
 * @desc How many the lines of describe?
 * （0～6)
 * @default 2
 * 
 * @param ---Icon of Elements---
 * @default 
 * 
 * @param UseElementIconInPluginParameter
 * @text Use Element Icon In Plugin Parameter
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc Do you wish to use the under parameter for element icon? (not icon tag in the element name)
 * 0:OFF、1:ON
 * @default 1
 * 
 * @param ElementIcons
 * @text Element Icons
 * @desc This is the Element Icons. Please type icon numbers split with space.
 * @default 76 64 65 66 67 68 69 70 71
 * 
 * @help
 * ============================================================================
 * Summary
 * ============================================================================
 * 
 * This plugin based on the "EnemyBook.js" made by Mr.Yoji Ojima.
 * 
 * 
 * 
 * This plugin allows
 * 
 * 1. Open the Enemybook Scene
 * 2. Displays more statuses that are not included in the "EnemyBook.js"
 * 3. Add command "Enemy Info" and "Enemybook" in the battle scene
 * 4. Create "Check Skill" and "Resister Skill"
 * 
 * You can display these statuses.
 * 
 * ・Enemy Name
 * ・Enemy Sprite
 * ★Enemy's Index Number
 * ★Enemy's Level
 * ★Defeat Number
 * ・HP, MP, ATK, DEF, MAT, MDF, AGI, LUK
 * ★Skills - v1.30
 * ・Drop Items
 * ★Weak Elements, Resister Elements
 * ★Weak States, Resister States
 * ・Description
 * ★Achievement of Enemybook
 * (★ sindicate new items.)
 * 
 * 
 * ============================================================================
 * 5 Ways For Players To Use
 * ============================================================================
 * 
 * 1. Enemybook
 * Display      : All Enemies Resisterd in The Enemybook
 * Player Action: Uses Item, Talks to people,
 *                "Enemybook" command in the Battle Scene
 * 
 * 2. Enemy Info in the Battle Scene
 * Display      : Battle Members List. Current Status Like Current HP.
 * Player Action: "Enemy Info" command in the Battle Scene
 * Settings     : Plugin Parameter 'Show Current Status In The "Enemy Info"' ON
 * 
 * 3. General Info of Battle Enemies
 * Display      : Battle Members List. General Status (not current status).
 * Player Action: "Enemy Info" command in the Battle Scene
 * Settings     : Plugin Parameter 'Show Current Status In The "Enemy Info"' OFF
 * 
 * 4. Check Skill
 * Display      : The target enemy's Current Status
 * Player Action: Use "Check Skill" For Enemy
 * 
 * 5. Check Skill (General Data) - v1.24
 * Display      : The target enemy's General Status
 * Player Action: Use "Check Skill" For Enemy
 * Settings     : Plugin Parameter 'Show General Status In "Check Skill"' ON
 * 
 * ============================================================================
 * How To Use
 * ============================================================================
 * 
 * Just set this plugin to Plugin Manager and
 * call Plugin Command "EnemyBook open"!
 * 
 * Enemies that have name is registerd when player encount on the battle.
 * (For the enemy you don't want to resister but has name, need setting.)
 * 
 * But by default, there are too many items to display and lack to space.
 * Please remove some items by set on Plugin Parameter.
 * 
 * ============================================================================
 * Other functions
 * ============================================================================
 * 
 * 〇2Ways to Display Element Icon
 * 
 * 1. Type Tag in the Element Name 
 *   example：\i[64]Fire
 * 
 * 2. Use Plugin Parameter - v1.04
 *   Please "Use Element Icon In Plugin Parameter" Plugin Parameter set to ON
 *   and type icon numbers split with space in "Element Icons".
 *   example：76 64 65 66 67 68 69 70 71
 * 
 * 〇Unknown Enemy "???"
 * 
 * If player open the Enemybook when the enemy isn't resistered yet,
 * Enemybook displays "???" on name and status.
 * You can change "???" word by setting Plugin Parameter.
 * 
 * 〇Current Status Setting And Enemy Info Command
 * 
 * When you use "Enemy Info" command, it displays general data by default.
 * When you set Plugin Parameter Show Current Status In The "Enemy Info" ON,
 * It displays Current Data.
 * Not only Current HP, But also ATK and Element Rate change.
 * You can change setting in game playing by Plugin Command.
 * 
 * ○Current States And Check Skill - v1.24
 * 
 * When you use "Check Skill", it displays current enemy's data by default.
 * you can change to display General Status by setting
 * Plugin Parameter  Show General Status In "Check Skill" ON.
 * 
 * 
 * 
 * 〇Resister Timing
 * 
 * You can set resister timing by setting Plugin Parameter "Resister Timing".
 * 
 * 0: Never
 * 1: When the battle start
 * 2: When the battle end
 * 
 * 〇Display Item "???" that player don't get yet  - v1.22
 * You can Display Item Name "???" that player don't get yet by
 * Plugin Parameter "Hide Item Until Get".
 * 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * 
 * 〇EnemyBook.js Commands
 * 
 * EnemyBook open 
 *   Open the Enemybook Scene.
 * EnemyBook add 3
 *   Register Enemy id 3.
 * EnemyBook remove 4
 *   Remove Enemy id 4 from the Enemybook.
 * EnemyBook complete
 *   Register all enemies.
 * EnemyBook clear
 *   Remove all enemies from the Enemybook.
 * 
 * 〇Oter plugin Command
 * 
 * EnemyBook showInBattle
 *   Show "Enemy Info" command in battle.
 * EnemyBook hideInBattle
 *   Hide "Enemy Info" command in battle.
 * EnemyBook showCurrentStatus
 *   Show Current Status when player uses "Enemy Info" Command.
 * EnemyBook showGeneralStatus
 *   Show General Status when player uses "Enemy Info" Command.
 * 
 * 〇v1.06
 * 
 * EnemyBook getAchievement per 12
 *   Substitute enemybook achievement(%) for variable id 12.
 * EnemyBook getAchievement num 14
 *   Substitute enemybook achievement(number) for variable id 14.
 * EnemyBook isRegistered 5 96
 *   Set Switch id 96 whether enemy id 5 is Resisterd or not.
 * EnemyBook getDefeatNumber 3 24
 *   Substitute Defeat Number of Enemy id 3 to variable 24.
 * 
 * 〇v1.16
 * EnemyBook openEnemy 16
 *   Open the enemy 16 page.
 * 
 * 〇v1.17
 * EnemyBook showAllInBattle
 *   Show "Enemybook" Command in the battle.
 * EnemyBook hideAllInBattle
 *   Hide "Enemybook" Command in the battle.
 * 
 * 〇v1.20
 * EnemyBook clearDefeatNumber
 *   Clear the defeat number of all Enemies.
 * 
 * 〇v1.22
 * EnemyBook clearEnemyDrop
 *   Clear the enemy drop of all Enemies.
 * 
 * ============================================================================
 * Enemy Note Tag
 * ============================================================================
 * 
 * 〇EnemyBook.js note Tag
 * 
 *  - By 1.27 version updating, describe line number increased.
 * Please set Plugin Parameter "Describe Line Number" the line number
 * you want to display. Max number is infinity.
 * 
 * <desc1:burabura>
 *   This is the description line 1.
 * <desc2:buraburaburabura>
 *   This is the description line 2.
 * <desc3:buraburabura>
 *   This is the description line 3.
 * 
 * 
 * <book:no>
 *   When you type this tag to enemy note, the enemy is not be able to
 *   registerd.
 * 
 * 〇Other tags
 * 
 * <bookLevel:3>
 *   Display the enemy level 3 to Enemybook.
 *   If you write nothing, level will not be displayed.
 * 
 * <bookCanCheck> - v1.04
 *   Player can see status by "Check Skill" if the enemy has <book:no> tag.
 * 
 * ============================================================================
 * Skill Note Tag
 * ============================================================================
 * 
 * <addToEnemyBook>
 *   This skill become to "Register Skill".
 *   This skill resister target to the Enemybook.
 *   If the enemy can be resisterd, Succeed Message will be displayed.
 *   If not, Missed Message will displayed.
 * 
 * <checkEnemyStatus>
 *   This skill become to "Check Skill".
 *   This skill displays target's status.
 *   If the enemy can be resisterd, status will be displayed.
 *   If not, Missed Message will displayed.
 * 
 *   〇v1.21
 *   You can displey unknown enemy's status "???" When you set
 *   Plugin Parameter 'Hide Unknown's Status On "Check Skill"' ON,
 * 
 * You can set message of these 2 skills by setting Plugin Parameters.
 * 
 * ============================================================================
 * State Note Tag
 * ============================================================================
 * 
 * <book:no>
 *   You can hide state in the Enemybook.
 * 
 * ============================================================================
 * TPB
 * ============================================================================
 * 
 * In the Time Progress Battle, battlers doesn't charge when the EnemyBook
 * opens. Players can think a lot when they open the EnemyBook.
 * 
 * ============================================================================
 * Update Log
 * ============================================================================
 * 
 * Version 1.42
 *   Fixed the bug that if you used the plugin command "EnemyBook openEnemy"
 *   in Battle Scene, start the Battle from turn 0.
 * 
 * Version 1.41
 *   Change to be able to use variables  in "openEnemy" command by using
 *   "v[id]" argument.
 * 
 * Version 1.40
 *   Fixed the bug when player scroll a page with cursor right or left, scroll
 *   hasn't worked.
 * 
 * Version 1.39
 *   Fixed the bug that display normal color even though set hue when it is 
 *   Side View.
 * 
 * Version 1.38
 *   Fixed the bug when plugin parameter "Display Hit Rate" turn on.
 *   Fixed the bug that "Display Skills Number" is counted double.
 *   Add new parameter "Evade Rate".
 * 
 * Version 1.37
 *   Fixed the bug that stop when player use the check skill.
 * 
 * Version 1.36
 *   Fixed the bug that it get error and stop the game when turn Touch UI on
 *   in option and open the enemy book.
 * 
 * Version 1.35
 *   Create for RPGMakerMZ.
 * 
 * Version 1.34
 *   Change to be able to change Enemy Photo Offset Y.
 * 
 * Version 1.33
 *   Change to be able to change background image opacity by setting plugin
 *   parameter.
 * 
 * Version 1.32
 *   Change to be able to display background image by setting plugin parameter.
 * 
 * Version 1.30
 *   Translate this help to English.
 * 
 * ============================================================================
 * Term of Use
 * ============================================================================
 * 
 * ・Credit - Unnecessary
 * ・Use in any game engine - not allowed
 *    You can use this plugin in RPGMakerMV only.
 *    
 * ・Commercial use - OK
 * ・Non-commercial use - OK
 * ・Edits for your project needs - OK
 * ・Redistribution - OK
 * 
 * This plugin is edited based in RPGMaker material.
 * Please see the RPGMaker Term of Use.
 *     https://tkool.jp/support/index.html
 * 
 * @command open
 * @text Open EnemyBook
 * @desc Open the EnemyBook Scene.
 * 
 * @command add
 * @text Add to EnemyBook
 * @desc Add the enemy to the EnemyBook.
 *
 * @arg enemyId
 * @type enemy
 * @text enemy ID
 * @desc Enemy's ID that you wish to be registerd to the EnemyBook.
 * 
 * @command remove
 * @text Remove From the EnemyBook
 * @desc Remove the enemy from the EnemyBook.
 *
 * @arg enemyId
 * @type enemy
 * @text enemy ID
 * @desc Enemy's ID that you wish to be removed from the EnemyBook.
 * 
 * @command complete
 * @text Complete the EnemyBook
 * @desc Add all enemies to the EnemyBook.
 * 
 * @command clear
 * @text Clear the EnemyBook
 * @desc Remove all enemies from the EnemyBook.
 * 
 * @command showInBattle
 * @text Show Enemy Info
 * @desc Change to show the command "Enemy Info".
 * 
 * @command hideInBattle
 * @text Hide Enemy Info
 * @desc Change to hide the command "Enemy Info".
 * 
 * @command showCurrentStatus
 * @text Show Current Status in "Enemy Info"
 * @desc When you see the enemy's status in "Enemy Info" command, you can see current status like Current HP.
 * 
 * @command showGeneralStatus
 * @text Show General Status in "Enemy Info"
 * @desc When you see the enemy's status in "Enemy Info" command, you can see general status like Max HP of the enemy.
 * 
 * @command getAchievement
 * @text Assign Achievement to the variable
 * @desc Assign How many number or How much rate enemy registerd to the variable.
 * 
 * @arg num
 * @type select
 * @text type
 * @desc This is the number or percent.
 * @option Number
 * @value num
 * @option Percent
 * @value per
 * 
 * @arg variableId
 * @type variable
 * @text Varieble Id
 * @desc This is the variable you wish to assign the returned value.
 * 
 * @command isRegistered
 * @text Confirm Registerd
 * @desc Assign whether the enemy is registerd in the EnemyBook or not to the switch.
 * 
 * 
 * @arg enemyId
 * @type enemy
 * @text Enemy ID
 * @desc This is the enemy ID you wish to confirm that is registerd or not
 * 
 * @arg switchId
 * @type switch
 * @text Switch ID
 * @desc This is the switch you wish to assign the returned value.
 * 
 * @command getDefeatNumber
 * @text get Defeat Number
 * @desc Assign defeat number to Variable.
 * 
 * 
 * @arg enemyId
 * @type enemy
 * @text Enemy ID
 * @desc This is the enemy you wish to confirm the defeat number.
 * 
 * @arg variableId
 * @type variable
 * @text Variable ID
 * @desc This is the variable you wish to assign the returned value.
 * 
 * 
 * @command openEnemy
 * @text Open Enemy Page
 * @desc Open the enemy page you design.
 * 
 * @arg enemyId
 * @type enemy
 * @text Enemy ID
 * @desc This is the enemy ID you want open.
 * 
 * @command showAllInBattle
 * @text Show "Enemybook" Command
 * @desc Show "Enemybook" Command allow to see the all enemies in the EnemyBook.
 * 
 * @command hideAllInBattle
 * @text Hide "Enemybook" Command
 * @desc Hide "Enemybook" Command allow to see the all enemies in the EnemyBook.
 * 
 * @command clearDefeatNumber
 * @text Clear Defeat Number
 * @desc Set all enemy's Defeat Number to 0.
 * 
 * @command clearEnemyDrop
 * @text Clear Enemy Drop
 * @desc Clear Enemy Drop get data.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.42 戦闘中も確認できるモンスター図鑑です。属性、ステートの耐性の確認もできます。
 * @author ヱビ
 * @url http://www.zf.em-net.ne.jp/~ebi-games/
 * 
 * @param ShowCommandInBattle
 * @text 戦闘中に「敵の情報」表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc バトル中に敵の情報コマンドを表示するかどうかを決めます。
 * プラグインコマンドで変更することもできます。0:非表示、1:表示
 * @default 1
 * 
 * @param ShowAllBookCommandInBattle
 * @text 戦闘中に「図鑑」表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc バトル中に図鑑コマンドを表示するかどうかを決めます。
 * プラグインコマンドで変更することもできます。0:非表示、1:表示
 * @default 1
 * 
 * @param ResisterTiming
 * @text 登録タイミング
 * @type select
 * @option 登録されない
 * @value 0
 * @option 戦闘開始時
 * @value 1
 * @option 戦闘終了時
 * @value 2
 * @desc 図鑑に登録されるタイミングです。
 * 0:登録されない、1:戦闘開始時、2:戦闘終了時
 * @default 2
 * 
 * @param ShowCurrentStatus
 * @text 「図鑑」で現在のステータスを表示
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ONにすると、「図鑑」「敵の情報」で敵の現在の情報（現在HPなど）が見られます。
 * プラグインコマンドで変更することもできます。0:OFF、1:ON
 * @default 0
 * 
 * @param HideUnknownStatusInSkill
 * @text 「チェック」で未登録の敵のステータスを隠す
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ONにすると、敵の情報をスキルで見た時も、登録されていない敵は「？？？」と表示されます。0:OFF、1:ON
 * @default 0
 * 
 * @param ShowGeneralStatusInSkill
 * @text 「チェック」で一般的なステータスを表示
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc ONにすると、敵の情報をスキルで見た時も、現在ＨＰではなく一般的なデータが表示されます。0:OFF、1:ON
 * @default 0
 * 
 * @param HideItemUntilGet
 * @text 手に入れるまでドロップアイテムを隠す
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc アイテムをゲットするまで表示しないようにします。0:OFF、1:ON
 * @default 0
 * 
 * @param ShortCutButtonName
 * @text ショートカットボタンの名前
 * @type string
 * @desc 戦闘中に敵の情報をこのショートカットキーで
 * 見られるようにします。
 * @default shift
 * 
 * @param BackgroundImage
 * @text 背景画像
 * @type file
 * @dir img/parallaxes
 * @desc 背景をウィンドウではなく画像にします。
 * 
 * @param SpreadBackgroundImage
 * @text 背景画像を広げる
 * @type boolean
 * @desc ＯＮにすると、チェックスキルのときウィンドウが画面いっぱいに広がります。
 * @default false
 * 
 * @param BackgroundImageOpacity
 * @text 背景画像不透明度
 * @type number
 * @desc 背景画像の不透明度です。（０～２５５）
 * @default 120
 * 
 * @param EnemyOffsetY
 * @text 敵キャラ画像オフセットY
 * @type number
 * @min -9999
 * @desc ここで指定したピクセル数分、敵キャラの画像が下方向にずれます。マイナスで上にずれます。
 * @default 0
 * 
 * 
 * 
 * @param ---用語、アイコン---
 * @default 
 * 
 * @param EnemyBookCommandName
 * @text 「敵の情報」の名前
 * @desc バトル中の敵の情報を見るコマンドの名前です。
 * @default 敵の情報
 * 
 * @param EnemyBookAllCommandName
 * @text 「図鑑」の名前
 * @desc バトル中、通常通り図鑑を開くコマンドの名前です。
 * @default 図鑑
 * 
 * @param Achievement
 * @text 達成率の名前
 * @desc 達成率の名前です。
 * @default 達成率
 * 
 * @param UnknownEnemy
 * @text 未登録の敵の索引名
 * @desc 未登録の敵キャラの索引名です。
 * @default ？？？？？？
 * 
 * @param UnknownData
 * @text 未登録の敵のデータ名
 * @desc まだ図鑑に登録されていない敵キャラの各データの内容です。
 * @default ？？？
 * 
 * @param HitRateName
 * @text 命中率名前
 * @type string
 * @desc 命中率を図鑑になんと表示しますか？
 * @default 命中率
 * 
 * @param EvadeRateName
 * @text 回避率名前
 * @type string
 * @desc 回避率を図鑑になんと表示しますか？
 * @default 回避率
 * 
 * @param WeakElementName
 * @text 弱点属性の名前
 * @desc 効きやすい属性の名前です。
 * @default 弱点属性
 * 
 * @param ResistElementName
 * @text 耐性属性の名前
 * @desc 効きにくい属性の名前です。
 * @default 耐性属性
 * 
 * @param WeakStateName
 * @text 弱点ステートの名前
 * @desc 効きやすいステートの名前です。
 * @default 弱点ステート
 * 
 * @param ResistStateName
 * @text 耐性ステートの名前
 * @desc 効きにくいステートの名前です。無効ステートも含みます。
 * @default 耐性ステート
 * 
 * @param NoEffectStateName
 * @text 無効ステートの名前
 * @desc 効かないステートの名前です。
 * @default 無効ステート
 * 
 * @param DefeatNumberName
 * @text 敵を倒した数の名前
 * @desc 敵を倒した数の名前です。
 * @default 倒した数
 * 
 * @param UnknownDropItemIcon
 * @text 未登録の敵のアイテムアイコン
 * @type number
 * @min 0
 * @desc 未知の敵キャラの落とすアイテムのアイコンの番号です。
 * デフォルト：16
 * @default 16
 * 
 * @param AddEnemySkillMessage
 * @text 図鑑登録スキル成功メッセージ
 * @desc スキルで敵キャラを図鑑に登録することに成功したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1を図鑑に登録した！
 * 
 * @param FailToAddEnemySkillMessage
 * @text 図鑑登録スキル不能メッセージ
 * @desc スキルで敵キャラが図鑑に載らない敵だった場合の
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1は図鑑には載せられない！

 * @param MissToAddEnemySkillMessage
 * @text 図鑑登録スキル失敗メッセージ
 * @desc スキルで敵キャラを図鑑に登録することに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1を図鑑に登録するのに失敗した！
 * 
 * @param FailToCheckEnemySkillMessage
 * @text チェックスキル失敗メッセージ
 * @desc スキルで敵キャラの情報を見ることに失敗したときの
 * メッセージです。%1が敵キャラの名前に置き換えられます。
 * @default %1の情報はわからなかった！
 * 
 * @param ---表示項目---
 * @default 
 * 
 * @param DispNo
 * @text 敵キャラの図鑑No表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に番号を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispLv
 * @text レベル表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にレベルを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispDefeatNumber
 * @text 倒した数表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にその敵を倒した数を表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispHP
 * @text ＨＰ表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にHPを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMP
 * @text ＭＰ表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にMPを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispTP
 * @text ＴＰ表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にTPを表示するか決めます。0:非表示、1:表示
 * @default 0
 * 
 * @param DispATK
 * @text 攻撃力表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に攻撃力を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispDEF
 * @text 防御力表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に防御力を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMAT
 * @text 魔法力表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に魔法力を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispMDF
 * @text 魔法防御表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に魔法防御を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispAGI
 * @text 敏捷性表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に敏捷性を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispLUK
 * @text 運表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に運を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * 
 * @param DispHitRate
 * @text 命中率表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に命中率を表示するか決めます。0:非表示、1:表示
 * @default 0
 * 
 * @param DispEvadeRate
 * @text 回避率表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に回避率を表示するか決めます。0:非表示、1:表示
 * @default 0
 * 
 * @param DispSkillNumber
 * @text スキル表示数
 * @type number
 * @desc スキルの表示数を決めます。
 * @default 0
 * 
 * @param DispDropItems
 * @text ドロップアイテム表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑にドロップアイテムを表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispWeakElement
 * @text 弱点属性表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きやすい属性を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispResistElement
 * @text 耐性属性表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きにくい属性を表示するか決めます。0:非表示、1:表示
 * @default 1
 * 
 * @param DispWeakState
 * @text 弱点ステート表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きやすいステートを表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispResistState
 * @text 耐性ステート表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効きにくいステートを表示するか決めます。（無効含む）
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DispNoEffectState
 * @text 無効ステート表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に効かないステートを表示するか決めます。
 * 0:非表示、1:表示
 * @default 0
 * 
 * @param DispDescribe
 * @text 説明表示
 * @type select
 * @option 表示
 * @value 1
 * @option 非表示
 * @value 0
 * @desc 図鑑に敵キャラの説明を表示するか決めます。
 * 0:非表示、1:表示
 * @default 1
 * 
 * @param DescribeLineNumber
 * @text 説明の行数
 * @type number
 * @desc 図鑑に敵キャラの説明を何行表示しますか？
 * （0～6行）
 * @default 2
 * 
 * @param ---属性アイコン---
 * @default 
 * 
 * @param UseElementIconInPluginParameter
 * @type select
 * @option ON
 * @value 1
 * @option OFF
 * @value 0
 * @desc 属性の中のアイコンではなく、下のパラメータを使いますか？
 * 0:OFF、1:ON
 * @default 1
 * 
 * @param ElementIcons
 * @desc 属性のアイコンです。1番から順番に半角スペースで区切って並
 * べてください。
 * @default 76 64 65 66 67 68 69 70 71
 * 
 * @help
 * ============================================================================
 * 概要
 * ============================================================================
 * 
 * RPGツクールデフォルトでついてくる、Yoji Ojima 様のプラグイン「EnemyBook.js」
 * の改変プラグイン
 * 
 * 〇できること
 * 
 * ・モンスター図鑑を開ける
 * ・EnemyBook.jsではなかった項目も見られる
 * ・戦闘中に図鑑を見られるコマンドを追加可能
 * ・敵の情報を見るチェックスキルを作れる
 * 
 * 〇表示できるもの（★はEnemyBook.jsにはなかった項目）
 * 
 * ・敵の名前
 * ・敵のイラスト
 * ★敵の番号
 * ★レベル（メモ欄で設定）
 * ★その敵を倒した数
 * ・HP、MP、攻撃力、防御力、魔法力、魔法防御、敏捷性、運
 * ★スキル -v1.30
 * ・ドロップアイテム
 * ★効きやすい属性、効きにくい属性
 * ★効きやすいステート、効きにくい（無効含む）ステート、効かないステート
 * ・説明文（メモ欄で設定、2行）
 * ★図鑑の達成率
 * 
 * ============================================================================
 * 4つの表示方法
 * ============================================================================
 * 
 * １．図鑑
 * 表示：図鑑に登録されているすべての敵のリスト
 * 操作：アイテムを使ったり、人に話しかけたり、戦闘中に「図鑑」コマンド
 * 
 * ２．バトル中の敵のステータス一覧
 * 表示：バトル中の敵のリスト。HPゲージなど、現在のステータス
 * 操作：戦闘中に「敵の情報」コマンド。
 * 設定：「「図鑑」で現在のステータスを表示」がONになっているとき
 * 
 * ３．バトル中の敵の図鑑の情報
 * 表示：バトル中の敵のリスト。現在のステータスではなく、図鑑の情報
 * 操作：戦闘中に「敵の情報」コマンド。
 * 設定：「「図鑑」で現在のステータスを表示」がOFFになっているとき
 * 
 * ４．チェック
 * 表示：チェックした敵の現在のステータス
 * 操作：チェックスキルを敵に対して使用
 * 
 * ５．チェック（一般データ） - v1.24
 * 表示：チェックした敵の一般データ
 * 操作：チェックスキルを敵に対して使用。
 * 設定：「「チェック」で一般的なステータスを表示」がＯＮになっているとき。
 * 
 * ============================================================================
 * とりあえずの導入方法
 * ============================================================================
 * 
 * このプラグインをプラグインマネージャーで読み込んで、
 * 図鑑を表示するイベントにプラグインコマンド「EnemyBook open」を加えるだけ！
 * 
 * データベースの敵キャラは、名前が空白でなければ図鑑に登録されていきます。
 * （名前があっても図鑑に登録したくない敵キャラには、設定が必要です）
 * 
 * ただ、そのままでは表示する項目が多すぎて表示しきれていないので、プラグイン
 * パラメータで表示する項目を削りましょう。
 * 
 * ============================================================================
 * その他
 * ============================================================================
 * 
 * 〇属性の表示方法、2通り
 * 
 * 1.属性の名前の中にアイコンを入れる
 *   例：\i[64]炎
 * 
 * 2.プラグインパラメータを使う - v1.04
 *   UseElementIconInPluginParameterをONにし、
 *   ElementIconsに属性アイコンの番号を半角スペースで区切って並べてください。
 *   例：76 64 65 66 67 68 69 70 71
 * 
 * 〇未確認の敵キャラ「？？？」
 * 
 * まだ図鑑に登録されていない敵との戦闘中に図鑑を開くと、データが「？？？」と
 * 表示されます。「？？？」の部分はプラグインパラメータの「未登録の敵の索引名」
 * で設定できます。 
 * 
 * 〇現在の情報を見る設定・敵の情報コマンド
 * 
 * デフォルトでは敵の情報コマンドでは、一般的な敵のデータが出るようになっていま
 * す。
 * プラグインパラメータ「「図鑑」で現在のステータスを表示」 を ON にすると、
 * 戦闘中に敵の情報を開いたとき、現在の敵キャラのパラメータが表示されます。
 * 現在HPだけでなく、攻撃力や属性有効度の変化も表示されます。
 * 現在の情報を見る設定は、プラグインコマンドで変更できます。
 * 
 * 〇現在の情報を見る設定・チェックスキル - v1.24
 * 
 * デフォルトではチェックスキルでは現在の敵のデータが出るようになっています。
 * プラグインパラメータ「「チェック」で一般的なステータスを表示」をＯＮにすると、
 * スキルでチェックしたときも、一般的な敵のデータを表示するようにできます。
 * 
 * 〇図鑑に登録されるタイミング
 * 
 * プラグインパラメータ「登録タイミング」で、図鑑に登録されるタイミングを設定でき
 * ます。
 * 
 * 0: 登録されない
 * 1: 戦闘開始時
 * 2: 戦闘終了時
 * 
 * 〇ゲットしていないアイテムを？？？にする - v1.22
 * プラグインパラメータ「手に入れるまでドロップアイテムを隠す」をONにすると、
 * ゲットしていないアイテムを？？？と表示します。
 * 
 * ============================================================================
 * プラグインコマンド
 * ============================================================================
 * 
 * 〇EnemyBook.jsと同じコマンド
 * 
 * EnemyBook open 
 *   図鑑画面を開きます。
 * EnemyBook add 3
 *   敵キャラ３番を図鑑に追加します。
 * EnemyBook remove 4
 *   敵キャラ４番を図鑑から削除します。
 * EnemyBook complete
 *   図鑑を完成させます。
 * EnemyBook clear
 *   図鑑をクリアします。
 * 
 * 〇その他のプラグインコマンド
 * 
 * EnemyBook showInBattle
 *   戦闘中に「敵の情報」を開くことができるようにします。
 * EnemyBook hideInBattle
 *   戦闘中に「敵の情報」を開くことができないようにします。
 * EnemyBook showCurrentStatus
 *   戦闘中に「敵の情報」を開くと、現在の敵のパラメータを見られるようにします。
 * EnemyBook showGeneralStatus
 *   戦闘中に「敵の情報」を開くと、その敵の一般的な情報を見られるようにします。
 * 
 * 〇v1.06
 * 
 * EnemyBook getAchievement per 12
 *   図鑑の達成率（％）を変数12番に入れます。
 * EnemyBook getAchievement num 14
 *   図鑑の登録数を変数14番に入れます。
 * EnemyBook isRegistered 5 96
 *   敵キャラ5番が図鑑に登録されているかどうかをスイッチ96番に入れます。
 * EnemyBook getDefeatNumber 3 24
 *   敵キャラ3番を倒した数を変数24に入れます。
 * 
 * 〇v1.16
 * EnemyBook openEnemy 16
 *   ID16の敵キャラの画面を開きます。
 * 
 * 〇v1.17
 * EnemyBook showAllInBattle
 *   戦闘中に「図鑑」を開くことができるようにします。
 * EnemyBook hideAllInBattle
 *   戦闘中に「図鑑」を開くことができないようにします。
 * 
 * 〇v1.20
 * EnemyBook clearDefeatNumber
 *   倒した数をリセットします。
 * 
 * 〇v1.22
 * EnemyBook clearEnemyDrop
 *   エネミードロップを入手したかどうかをリセットします。
 * 
 * ============================================================================
 * 敵キャラのメモ欄
 * ============================================================================
 * 
 * 〇EnemyBook.jsと同じタグ
 * 
 *  - v1.27より、表示できる行が増えました。
 * ウィンドウの高さを計算するため、プラグインパラメータ「説明の行数」で、
 * 表示する行の数を設定してください。何行までも表示できます。
 * 
 * <desc1:なんとか>
 *   説明１行目です。
 * <desc2:かんとか>
 *   説明２行目です。
 * <desc3:ブラブラ>
 *   説明３行目です。
 * <desc4:ああああ>
 *   説明４行目です。
 * <desc5:いいいい>
 *   説明５行目です。
 * <desc6:うううう>
 *   説明６行目です。
 * 
 * 
 * <book:no>
 *   これを設定した敵キャラは図鑑に載りません。
 * 
 * 〇その他のタグ
 * 
 * <bookLevel:3>
 *   図鑑に強さの目安となるレベルを記載します。
 *   何も書かなければ、何も表示されません。
 * 
 * <bookCanCheck>
 *   Version 1.04で追加しました。
 *   <book:no>を書いた敵でもこのタグを付ければ<checkEnemyStatus>のスキルで
 *   チェックできます。
 * 
 * ============================================================================
 * スキルのメモ欄
 * ============================================================================
 * 
 * <addToEnemyBook>
 *   対象を図鑑に登録します。
 *   対象が図鑑に載る敵キャラだった場合は成功メッセージが、
 *   そうでなかった場合失敗メッセージが表示されます。
 * 
 * <checkEnemyStatus>
 *   対象の情報を見ます。
 *   対象が図鑑に載る敵キャラだった場合図鑑が表示され、
 *   そうでなかった場合失敗メッセージが表示されます。
 *   このスキルでは、対象の現在のパラメータ（現在HPなど）が表示されます。
 *   〇v1.21
 *   プラグインパラメータHideUnknownStatusInSkillで「？？？」と表示することも
 *   できるようになりました。
 * 
 * この2つのスキルのメッセージはプラグインパラメータで設定できます。
 * 
 * ============================================================================
 * ステートのメモ欄
 * ============================================================================
 * 
 * <book:no>
 *   このステートを図鑑に表示しないようにできます。
 * 
 * ============================================================================
 * タイムプログレス戦闘
 * ============================================================================
 * 
 * タイムプログレス戦闘のとき、図鑑を開いていると、チャージが止まります。
 * プレイヤーは図鑑を開いている間はじっくり考えることができます。
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.42
 *   戦闘中に「EnemyBook openEnemy」で図鑑を開いたときも戦闘用のウィンドウが開
 *   くようにしました。
 * 
 * Version 1.41
 *   プラグインコマンド「EnemyBook openEnemy」で、
 *   v[id]の形で、その変数のIDの敵キャラのページを開けるようになりました。
 * 
 * Version 1.40
 *   左右キーで1ページカーソル移動した時、スクロールが行われていなかった不具合
 *   を修正しました。
 * 
 * Version 1.39
 *   サイドビューで色相変更が反映されていなかった不具合を修正しました。
 * 
 * Version 1.38
 *   「命中率表示」をONにして図鑑を開いたとき、エラーが出て止まる不具合と、
 *   「スキル表示数」が2倍計算されていた不具合を修正しました。
 *   「回避率表示」を追加しました。
 * 
 * 
 * Version 1.37
 *   チェックスキルを使うと操作が利かなくなる不具合を修正しました。
 *   ※BattleManagerのphaseに「check」を追加しています。
 * 
 * Version 1.36
 *   タッチUIをOFFにしてモンスター図鑑を開いたとき、エラーが出て止まってしまう
 *   不具合を修正しました。
 * 
 * Version 1.35
 *   RPGツクールMZに対応しました。
 * 
 * Version 1.34
 *   敵キャラのY軸の位置を設定できるようにしました。
 * 
 * Version 1.33
 *   プラグインパラメータで背景画像の不透明度を設定できるようにしました。
 * 
 * Version 1.32
 *   プラグインパラメータで背景画像を指定できるようにしました。
 * 
 * Version 1.31
 *   未登録の敵キャラの画像が表示されていた問題を修正しました。
 * 
 * Version 1.30
 *   英訳しました。
 *   敵の情報コマンド使用後にチェックスキルを使用した時、チェックした後戦闘が
 *   進行しなくなる不具合を直しました。
 *   プラグインパラメータ「スキル表示数」でスキルを表示できるようにしました。
 *   
 * 
 * Version 1.29
 *   図鑑一覧で左キーで上に、右キーで下に表示個数分移動するようにしました。
 * 
 * Version 1.28
 *   戦闘中、ショートカットキーを登録すると敵の情報を呼び出せるようにしまし
 *   た。（このアイデアをくださった方、そのときに実現できず申し訳ありません。）
 * 
 * Version 1.27
 *   プラグインパラメータを日本語にしました。
 *   ドロップアイテムの個数によってその下の情報の表示位置が異なる問題を修正しま
 *   した。
 *   敵キャラの説明の行数を増やせるようにしました。
 * 
 * Version 1.26
 *   TPと命中率を表示した時、ウィンドウサイズが反映されない不具合を修正しまし
 *   た。
 * 
 * Version 1.25
 *   TPと命中率を表示できるようにしました。
 * 
 * Version 1.24
 *   HideUnknownStatusInSkillをＯＮにしていても、図鑑に登録されていない敵をスキ
 *   ルでチェックした時に属性とステートは表示されていましたが、？？？と表示する
 *   ように修正しました。
 *   スキルでチェックした時も、現在のパラメータではなく一般的なパラメータを表示
 *   できるプラグインパラメータShowGeneralStatusInSkillを追加しました。
 * 
 * Version 1.23
 *   未登録のモンスターをチェックしようとするとエラーが発生してしまう不具合を修
 *   正しました。
 * 
 * Version 1.22
 *   ドロップしていないアイテムを？？？と表示する機能を追加しました。
 *   ドロップアイテムを入手したかどうかをリセットするプラグインコマンドを追加し
 *   ました。
 * 
 * Version 1.21
 *   スキルで図鑑に登録するとき、スキルの成功率を参照するようにしました。
 *   スキルで図鑑を見るときも、初めて会った敵は？？？と表示されるように設定でき
 *   るようにしました。
 * 
 * Version 1.20
 *   倒した数をリセットするプラグインコマンドを追加しました。
 * 
 * Version 1.19
 *   YEPのプラグインを使わずに図鑑を開いたとき、変数Importedが見つからないとい
 *   うエラーが出る不具合を直しました。
 * 
 * Version 1.18
 *   戦闘中に「図鑑」コマンドで開いたとき、まだ図鑑に登録されておらず、索引名が
 *   ？？？？？になるはずの敵キャラの名前が表示されてしまっていた不具合を直しま
 *   した。
 * 
 * Version 1.17
 *   ヘルプを見やすくしました。
 *   戦闘中に図鑑のすべての敵キャラの情報を見られるコマンド「図鑑」を追加しまし
 *   た。そのため、プラグインパラメータ２つとプラグインコマンド２つを追加しまし
 *   た。
 *   戦闘中にアイテムなどで図鑑を開いたとき、戦闘中の敵ではなく、図鑑全体を開く
 *   ようにしました。そのとき、シーンを挿入するのではなくバトルシーン上のウィン
 *   ドウを使うようにしました。これにより戦闘中に図鑑を開いてもターンがリセット
 *   されるバグを回避できます。
 * 
 * Version 1.16
 *   プラグインコマンドで、指定したIDの敵キャラの画面を開けるようにしました。
 * 
 * Version 1.15
 *   YEP_X_AnimatedSVEnemiesを入れていないときエラーが発生してプレイが中断され
 *   てしまう不具合を直しました。
 * 
 * Version 1.14
 *   YEP_X_AnimatedSVEnemiesを入れてもアニメーションしていなかった不具合を直し
 *   ました。残っていたコンソールログを削除しました。
 * 
 * Version 1.13
 *   YEP_X_AnimatedSVEnemiesを使っている場合、アニメーションするようにしまし
 *   た。また、YEP_X_AnimatedSVEnemiesを使っている場合でも、1回目でも表示される
 *   ようにしました。
 * 
 * Version 1.12
 *   図鑑を開いたとき、1回目だけ敵キャラのスプライトがはみ出してしまう不具合を
 *   修正しました。
 * 
 * Version 1.11
 *   図鑑を開いたとき、1回目は敵キャラのスプライトが表示されず、2回目にカーソル
 *   を合わせたときに初めて表示される不具合を修正しました。
 *   （YEP_X_AnimatedSVEnemiesを使っている場合、SVエネミーを表示するためにこの
 *   　不具合は修正していません）
 * 
 * Version 1.10
 *   ツクールのデータベースの用語で、HPやMPに「体力」などの日本語を使ったとき、
 *   文字が重なってしまうバグを修正しました。
 * 
 * Version 1.09
 *   プラグインパラメータShowCurrentStatusの設定が反映されないバグを修正しまし
 *   た。
 * 
 * Version 1.08
 *   YEP_X_AnimatedSVEnemies.jsを使っているとき、アクターが表示されるようにしま
 *   した。
 * 
 * Version 1.07
 *   プラグインパラメータDispLvでレベルを表示するかどうか選べるようにし、倒した
 *   数をレベルの次に表示するようにしました。
 * 
 * Version 1.06
 *   プラグインコマンドを4種追加しました。図鑑の達成率、登録数、敵キャラが登録さ
 *   れているかどうか、敵キャラを何体倒したかの4種を取得できます。
 * 
 * Version 1.05
 *   図鑑に敵を倒した数を表示できるようにしました。
 * 
 * Version 1.04
 *   属性の中にアイコンを書けない時のため、プラグインパラメータで属性のアイコン
 *   を設定できるようにしました。
 *   <book:no>が設定されている敵キャラでも、<bookCanCheck>が設定されていれば
 *   スキルでならチェックできるようにしました。
 * 
 * Version 1.03
 *   モンスターの番号を表示できるようにしました。
 *   達成率を表示するようにしました。
 *   無効化ステートの項目をONにしているとき、耐性ステートには無効化ステートは
 *   表示されないようにしました。
 *  
 * Version 1.02
 *   無効ステートの項目を追加しました。
 *   耐性の項目が奇数のとき、図鑑説明がかぶってしまう不具合を修正しました。
 * 
 * Version 1.01
 *   表示項目によって余白を削り、ウィンドウの高さを小さくするようにしました。
 *   高さを計算するために、説明を表示するかどうかを設定するプラグインパラメータ
 *   DispDescribe を追加しました。
 *   また、対象の情報を見るスキルを使ったとき、敵を選択するウィンドウを
 *   非表示にするようにしました。
 * 
 * Version 1.00
 *   初版
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・クレジット表記は不要
 * ・営利目的で使用可
 *     ただし、素材そのものの販売は禁止です。
 * ・改変可
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * ・ツクール素材の改変素材です
 *     ツクール公式の利用規約をご覧ください。
 *     https://tkool.jp/support/index.html
 * 
 * @command open
 * @text モンスター図鑑を開く
 * @desc モンスター図鑑を開きます。
 * 
 * @command add
 * @text モンスター図鑑に登録する
 * @desc 指定したIDの敵キャラをモンスター図鑑に登録します。
 *
 * @arg enemyId
 * @type enemy
 * @text 敵キャラのID
 * @desc 登録する敵キャラのIDです。
 * 
 * @command remove
 * @text モンスター図鑑から削除する
 * @desc 指定したIDの敵キャラをモンスター図鑑から削除します。
 *
 * @arg enemyId
 * @type enemy
 * @text 敵キャラのID
 * @desc 削除する敵キャラのIDです。
 * 
 * @command complete
 * @text モンスター図鑑を完成させる
 * @desc モンスター図鑑にすべての敵キャラを登録します。
 * 
 * @command clear
 * @text モンスター図鑑をクリアする
 * @desc モンスター図鑑からすべての敵キャラを削除します。
 * 
 * @command showInBattle
 * @text 「敵の情報」を表示
 * @desc 戦闘中に現在戦っている敵キャラの情報を見られるようにします。
 * 
 * @command hideInBattle
 * @text 「敵の情報」を非表示
 * @desc 戦闘中、現在戦っている敵キャラの情報を見られるコマンドを非表示にします。
 * 
 * @command showCurrentStatus
 * @text 「敵の情報」で現在の情報を表示
 * @desc 戦闘中、「敵の情報」で敵の情報を見た時、「現在のHP」など、現在の情報を見られるようにします。
 * 
 * @command showGeneralStatus
 * @text 「敵の情報」で一般的な情報を表示
 * @desc 戦闘中、「敵の情報」で敵の情報を見た時、一般的な最大HPなど、一般的な情報を見られるようにします。
 * 
 * @command getAchievement
 * @text 図鑑達成率を変数に代入
 * @desc 図鑑に登録した敵キャラの数、または登録率（％）を変数に代入します。
 * 
 * @arg num
 * @type select
 * @text 形式
 * @desc 戻り値の形式です。
 * @option 登録した数
 * @value num
 * @option 登録した割合（％）
 * @value per
 * 
 * @arg variableId
 * @type variable
 * @text 戻り値の変数のID
 * @desc 戻り値を代入する変数のIDです。
 *
 * @command isRegistered
 * @text 指定した敵が登録されているか
 * @desc 指定したIDの敵キャラがモンスター図鑑に登録されているかどうかをスイッチに代入します。
 * 
 * 
 * @arg enemyId
 * @type enemy
 * @text 敵キャラのID
 * @desc 登録されているかどうかを確認する敵キャラのIDです。
 * 
 * @arg switchId
 * @type switch
 * @text 戻り値のスイッチのID
 * @desc 戻り値を代入するスイッチのIDです。
 * 
 * @command getDefeatNumber
 * @text 指定した敵を何体倒したか
 * @desc 指定したIDの敵キャラを何体倒したかを変数に代入します。
 * 
 * 
 * @arg enemyId
 * @type enemy
 * @text 敵キャラのID
 * @desc 何体倒したかを確認する敵キャラのIDです。
 * 
 * @arg variableId
 * @type variable
 * @text 戻り値の変数のID
 * @desc 戻り値を代入する変数のIDです。
 * 
 * 
 * @command openEnemy
 * @text 指定した敵キャラのページを開く
 * @desc 指定したIDの敵キャラのページを開きます。
 * 
 * @arg enemyId
 * @type enemy
 * @text 敵キャラのID
 * @desc ページを開く敵キャラのIDです。
 * 
 * @command showAllInBattle
 * @text 「図鑑」コマンドを戦闘中に表示
 * @desc 戦闘中に、すべての敵キャラの情報が見られる図鑑コマンドを追加します。
 * 
 * @command hideAllInBattle
 * @text 「図鑑」コマンドを戦闘中に非表示
 * @desc 戦闘中に、すべての敵キャラの情報が見られる図鑑コマンドを非表示にします。
 * 
 * @command clearDefeatNumber
 * @text 倒した数をリセット
 * @desc すべての敵キャラの倒した数を0に戻します。
 * 
 * @command clearEnemyDrop
 * @text ドロップアイテムをリセット
 * @desc ドロップアイテムの記録をリセットします。
 * 
 * 
 */

(function() {
	"use strict";
	var parameters = PluginManager.parameters('ABMZ_EnemyBook');
	var EnemyBookCommandName = (parameters['EnemyBookCommandName'] || "敵の情報");
	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var EnemyBookAllCommandName = (parameters['EnemyBookAllCommandName'] || "図鑑");
	var ShowAllBookCommandInBattle = (parameters['ShowAllBookCommandInBattle'] == 1) ? true : false;
	var ResisterTiming = Number(parameters['ResisterTiming']);
	var Achievement = String(parameters['Achievement'] || "");
	var UnknownEnemy = String(parameters['UnknownEnemy'] || "");
	var UnknownData = String(parameters['UnknownData'] || "");
	var HideUnknownStatusInSkill = (parameters['HideUnknownStatusInSkill'] == 1) ? true : false;
	var HideItemUntilGet = (parameters['HideItemUntilGet'] == 1) ? true : false;

	// v1.32
	var BackgroundImage = String(parameters['BackgroundImage']);
	var BackgroundImageOpacity = Number(parameters['BackgroundImageOpacity']);
	var SpreadBackgroundImage = eval(parameters['SpreadBackgroundImage']);


	var EnemyOffsetY = Number(parameters['EnemyOffsetY']);

	// v1.28
	var ShortCutButtonName = String(parameters['ShortCutButtonName']);


	var ShowCommandInBattle = (parameters['ShowCommandInBattle'] == 1) ? true : false;
	var ShowGeneralStatusInSkill = (parameters['ShowGeneralStatusInSkill'] == 1) ? true : false;
	var AddEnemySkillMessage = String(parameters['AddEnemySkillMessage'] || "");
	var FailToAddEnemySkillMessage = String(parameters['FailToAddEnemySkillMessage'] || "");
	var MissToAddEnemySkillMessage = String(parameters['MissToAddEnemySkillMessage'] || "");
	var FailToCheckEnemySkillMessage = String(parameters['FailToCheckEnemySkillMessage'] || "");
	var DispNo = (parameters['DispNo'] == 1) ? true : false;
	var DispLv = (parameters['DispLv'] == 1) ? true : false;
	var ShowCurrentStatus = (parameters['ShowCurrentStatus'] == 1) ? true : false;
	var DispDescribe = (parameters['DispDescribe'] == 1) ? true : false;

	var DescribeLineNumber = Number(parameters['DescribeLineNumber']);

	var UseElementIconInPluginParameter = (parameters['UseElementIconInPluginParameter'] == 1) ? true : false;
	
	var DispDefeatNumber = Number(parameters['DispDefeatNumber']) == 1 ? true : false;
	var dispParameters = [];
	dispParameters[0] = (parameters['DispHP'] == 1) ? true : false;
	dispParameters[1] = (parameters['DispMP'] == 1) ? true : false;
	dispParameters[2] = (parameters['DispATK'] == 1) ? true : false;
	dispParameters[3] = (parameters['DispDEF'] == 1) ? true : false;
	dispParameters[4] = (parameters['DispMAT'] == 1) ? true : false;
	dispParameters[5] = (parameters['DispMDF'] == 1) ? true : false;
	dispParameters[6] = (parameters['DispAGI'] == 1) ? true : false;
	dispParameters[7] = (parameters['DispLUK'] == 1) ? true : false;
	var dispTP = (parameters['DispTP'] == 1) ? true : false;
	var dispHitRate = (parameters['DispHitRate'] == 1) ? true : false;
	var DispEvadeRate = (parameters['DispEvadeRate'] == 1) ? true : false;



	var DispSkillNumber = Number(parameters['DispSkillNumber']);

	var DispDropItems = (parameters['DispDropItems'] == 1) ? true : false;
	var dispRates = [];
	dispRates[1] = (parameters['DispResistElement'] == 1) ? true : false;
	var ResistElementName = String(parameters['ResistElementName'] || "耐性属性");
	dispRates[0] = (parameters['DispWeakElement'] == 1) ? true : false;
	var WeakElementName = String(parameters['WeakElementName'] || "弱点属性");
	dispRates[3] = (parameters['DispResistState'] == 1) ? true : false;
	var ResistStateName = String(parameters['ResistStateName'] || "耐性ステート");
	dispRates[2] = (parameters['DispWeakState'] == 1) ? true : false;
	var WeakStateName = String(parameters['WeakStateName'] || "弱点ステート");
	dispRates[4] = (parameters['DispNoEffectState'] == 1) ? true : false;
	var NoEffectStateName = String(parameters['NoEffectStateName'] || "無効ステート");
	var UnknownDropItemIcon = Number(parameters['UnknownDropItemIcon']);
	if (UnknownDropItemIcon === Number.NaN) UnknownDropItemIcon = 0;
	var DefeatNumberName = String(parameters['DefeatNumberName'] || "倒した数");
	var ElementIcons = (parameters['ElementIcons']).split(" ");
	var a = [0];
	ElementIcons = a.concat(ElementIcons);
	var HitRateName = String(parameters['HitRateName'] || "命中率");
	var EvadeRateName = String(parameters['EvadeRateName'] || "回避率");

	if (!Imported) var Imported = {};
//=============================================================================
// MVからの雑な移行
//=============================================================================
	
	Window_Base.prototype.textPadding = function() {
		return 6;
	}
	Window_Base.prototype.standardPadding = function() {
	    return 18;
	};
	Window_Selectable.prototype.itemRectForText = function(index) {
	    var rect = this.itemRect(index);
	    rect.x += this.textPadding();
	    rect.width -= this.textPadding() * 2;
	    return rect;
	};
Window_Selectable.prototype.spacing = function() {
    return 12;
};
Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 6, ColorManager.textColor(19));
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = ColorManager.hpGaugeColor1();
    var color2 = ColorManager.hpGaugeColor2();
    this.drawGauge(x, y, width, actor.hpRate(), color1, color2);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentAndMax(actor.hp, actor.mhp, x, y, width,
                           ColorManager.hpColor(actor), ColorManager.normalColor());
};

Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    width = width || 186;
    var color1 = ColorManager.mpGaugeColor1();
    var color2 = ColorManager.mpGaugeColor2();
    this.drawGauge(x, y, width, actor.mpRate(), color1, color2);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentAndMax(actor.mp, actor.mmp, x, y, width,
                           ColorManager.mpColor(actor), ColorManager.normalColor());
};

Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    width = width || 96;
    var color1 = ColorManager.tpGaugeColor1();
    var color2 = ColorManager.tpGaugeColor2();
    this.drawGauge(x, y, width, actor.tpRate(), color1, color2);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.tpA, x, y, 44);
    this.changeTextColor(ColorManager.tpColor(actor));
    this.drawText(actor.tp, x + width - 64, y, 64, 'right');
};


Window_Base.prototype.drawCurrentAndMax = function(current, max, x, y,
                                                   width, color1, color2) {
    var labelWidth = this.textWidth('HP');
    var valueWidth = this.textWidth('0000');
    var slashWidth = this.textWidth('/');
    var x1 = x + width - valueWidth;
    var x2 = x1 - slashWidth;
    var x3 = x2 - valueWidth;
    if (x3 >= x + labelWidth) {
        this.changeTextColor(color1);
        this.drawText(current, x3, y, valueWidth, 'right');
        this.changeTextColor(color2);
        this.drawText('/', x2, y, slashWidth, 'right');
        this.drawText(max, x1, y, valueWidth, 'right');
    } else {
        this.changeTextColor(color1);
        this.drawText(current, x1, y, valueWidth, 'right');
    }
};
//=============================================================================
// PluginManager
//=============================================================================

    const pluginName = "ABMZ_EnemyBook";

    PluginManager.registerCommand(pluginName, "open", args => {
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
    });

    PluginManager.registerCommand(pluginName, "add", args => {
				$gameSystem.addToEnemyBook(Number(args.enemyId));
    });

    PluginManager.registerCommand(pluginName, "remove", args => {
				$gameSystem.removeFromEnemyBook(Number(args.enemyId));
    });

    PluginManager.registerCommand(pluginName, "complete", args => {
				$gameSystem.completeEnemyBook();
    });

    PluginManager.registerCommand(pluginName, "clear", args => {
				$gameSystem.clearEnemyBook();
    });

    PluginManager.registerCommand(pluginName, "showInBattle", args => {
				$gameSystem.setShowBattleEnemyBook(true);
    });

    PluginManager.registerCommand(pluginName, "hideInBattle", args => {
				$gameSystem.setShowBattleEnemyBook(false);
    });

    PluginManager.registerCommand(pluginName, "showCurrentStatus", args => {
				$gameSystem.setShowCurrentEnemysStatus(true);
    });


    PluginManager.registerCommand(pluginName, "showGeneralStatus", args => {
				$gameSystem.setShowCurrentEnemysStatus(false);
    });


    PluginManager.registerCommand(pluginName, "getAchievement", args => {
				$gameSystem.getAchievement(args.num, Number(args.variableId));
    });

    PluginManager.registerCommand(pluginName, "isRegistered", args => {
				$gameSystem.isRegistered(Number(args.enemyId), Number(args.switchId));
    });

    PluginManager.registerCommand(pluginName, "getDefeatNumber", args => {
				$gameSystem.getDefeatNumber(Number(args.enemyId), Number(args.variableId));
    });

    PluginManager.registerCommand(pluginName, "openEnemy", args => {
				var v = $gameVariables._data;
				args.enemyId = Number(eval(args.enemyId));
				$gameTemp.ABEnemyBookId = Number(args.enemyId);
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
    });

    PluginManager.registerCommand(pluginName, "showAllInBattle", args => {
				$gameSystem.setShowBattleAllEnemyBook(true);
    });

    PluginManager.registerCommand(pluginName, "hideAllInBattle", args => {
				$gameSystem.setShowBattleAllEnemyBook(false);
    });

    PluginManager.registerCommand(pluginName, "clearDefeatNumber", args => {
				$gameSystem.clearDefeatNumber();
    });

    PluginManager.registerCommand(pluginName, "clearEnemyDrop", args => {
				$gameSystem.clearEnemyDropGot();
    });

	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'EnemyBook') {
			switch(args[0]) {
			case 'open':
				// v1.17
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
				break;
			case 'add':
				$gameSystem.addToEnemyBook(Number(args[1]));
				break;
			case 'remove':
				$gameSystem.removeFromEnemyBook(Number(args[1]));
				break;
			case 'complete':
				$gameSystem.completeEnemyBook();
				break;
			case 'clear':
				$gameSystem.clearEnemyBook();
				break;
			case 'showInBattle':
				$gameSystem.setShowBattleEnemyBook(true);
				break;
			case 'hideInBattle':
				$gameSystem.setShowBattleEnemyBook(false);
				break;
			case 'showCurrentStatus':
				$gameSystem.setShowCurrentEnemysStatus(true);
				break;
			case 'showGeneralStatus':
				$gameSystem.setShowCurrentEnemysStatus(false);
				break;
			case 'getAchievement':
				$gameSystem.getAchievement(args[1], Number(args[2]));
				break;
			case 'isRegistered':
				$gameSystem.isRegistered(Number(args[1]), Number(args[2]));
				break;
			case 'getDefeatNumber':
				$gameSystem.getDefeatNumber(Number(args[1]), Number(args[2]));
				break;
			// v1.16
			case 'openEnemy':
				var v = $gameVariables._data;
				$gameTemp.ABEnemyBookId = Number(eval(args[1]));
				if ($gameParty.inBattle()) {
					SceneManager._scene.allBattleEnemyBook();
				} else {
					SceneManager.push(Scene_EnemyBook);
				}
				break;
			//v1.17
			case 'showAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(true);
				break;
			case 'hideAllInBattle':
				$gameSystem.setShowBattleAllEnemyBook(false);
				break;
			case 'clearDefeatNumber':
				$gameSystem.clearDefeatNumber();
				break;
			// 1.22
			case 'clearEnemyDrop':
				$gameSystem.clearEnemyDropGot();
				break;
			}
		}
	};
	
	var Game_System_prototype_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		Game_System_prototype_initialize.call(this);
		this.initEnemyBookSettings();
	};

	Game_System.prototype.initEnemyBookSettings = function() {
		this._showBattleEnemyBook = ShowCommandInBattle;
		this._showAllBookCommandInBattle = ShowAllBookCommandInBattle;
		this._showCurrentEnemyStatus = ShowCurrentStatus;
	};

	Game_System.prototype.setShowBattleEnemyBook = function(value) {
		this._showBattleEnemyBook = value;
	};
	Game_System.prototype.isShowBattleEnemyBook = function() {
		if (this._showBattleEnemyBook === undefined) this.initEnemyBookSettings();
		return this._showBattleEnemyBook;
	};

	Game_System.prototype.setShowBattleAllEnemyBook = function(value) {
		this._showAllBookCommandInBattle = value;
	};
	Game_System.prototype.isShowBattleAllEnemyBook = function() {
		if (this._showAllBookCommandInBattle === undefined) this.initEnemyBookSettings();
		return this._showAllBookCommandInBattle;
	};

	Game_System.prototype.setShowCurrentEnemysStatus = function(value) {
		this._showCurrentEnemyStatus = value;
	};
	Game_System.prototype.isShowCurrentEnemysStatus = function() {
		if (this._showCurrentEnemyStatus === undefined) this.initEnemyBookSettings();
		return this._showCurrentEnemyStatus;
	};

	Game_System.prototype.clearEnemyBook = function() {
		this._enemyBookFlags = [];
	};

	Game_System.prototype.addToEnemyBook = function(enemyId) {
		if (!this._enemyBookFlags) {
			this.clearEnemyBook();
		}
		this._enemyBookFlags[enemyId] = true;
	};

	
	Game_System.prototype.removeFromEnemyBook = function(enemyId) {
		if (this._enemyBookFlags) {
			this._enemyBookFlags[enemyId] = false;
		}
	};

	Game_System.prototype.completeEnemyBook = function() {
		this.clearEnemyBook();
		for (var i = 1; i < $dataEnemies.length; i++) {
			this._enemyBookFlags[i] = true;
		}
	};
	
	
	Game_System.prototype.isInEnemyBook = function(enemy) {
		if (this._enemyBookFlags && enemy) {
				return !!this._enemyBookFlags[enemy.id];
		} else {
			return false;
		}
	};

	Game_System.prototype.clearDefeatNumber = function() {
		this._defeatNumbers = [];
	};

	Game_System.prototype.incrementDefeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		this._defeatNumbers[id]++;
	};

	Game_System.prototype.defeatNumber = function(id) {
		if (!this._defeatNumbers) {
			this.clearDefeatNumber();
		}
		if (!this._defeatNumbers[id]) {
			this._defeatNumbers[id] = 0;
		}
		return this._defeatNumbers[id];
	};

	Game_System.prototype.getRegisterNumber = function() {
		var a=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
			}
		}
		return a;
	};

	Game_System.prototype.getRegisterPercent = function() {
		var a=0;
		var b=0;
		for (var i=1; i<$dataEnemies.length; i++) {
			var enemy = $dataEnemies[i];
			if (enemy.name && enemy.meta.book !== 'no') {
				if (this.isInEnemyBook(enemy)) a++;
				b++;
			}
		}
		return Math.floor(a*100/b);
	};

	Game_System.prototype.getAchievement = function(type, vId) {
		if (type == 'per' || type == 'percent') {
			var num = this.getRegisterPercent();
			$gameVariables.setValue(vId, num);
		} else if (type == 'num' || type == 'number') {
			var num = this.getRegisterNumber();
			$gameVariables.setValue(vId, num);
		}
	};

	Game_System.prototype.isRegistered = function(eId, sId) {
		var enemy = $dataEnemies[eId];
		if (this.isInEnemyBook(enemy)) {
			$gameSwitches.setValue(sId, true);
		} else {
			$gameSwitches.setValue(sId, false);
		}
	};

	Game_System.prototype.getDefeatNumber = function(eId, vId) {
		var num = this.defeatNumber(eId);
		$gameVariables.setValue(vId, num);
	};

	Game_System.prototype.clearEnemyDropGot = function() {
		this._enemyDropGot = [];
	};

	Game_System.prototype.setEnemyDropGot = function(eId, iId, value) {
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
		}
		if (!this._enemyDropGot[eId]) {
			this._enemyDropGot[eId] = [];
		}
		this._enemyDropGot[eId][iId] = value;
	};

	Game_System.prototype.getEnemyDropGot = function(eId, iId) {
		if (!HideItemUntilGet) return true;
		if (!this._enemyDropGot) {
			this._enemyDropGot = [];
			return false;
		}
		if (!this._enemyDropGot[eId]) {
			return false;
		}
		if (!this._enemyDropGot[eId][iId]) {
			return false;
		}
		return true;
	};


//=============================================================================
// 戦闘開始時に登録
//=============================================================================
	if (ResisterTiming === 1) {
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					$gameSystem.addToEnemyBook(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			$gameSystem.addToEnemyBook(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			$gameSystem.addToEnemyBook(enemyId);
		};
//=============================================================================
// 戦闘終了時に登録
//=============================================================================
	} else if (ResisterTiming === 2) {
		
		var _Game_Troop_setup = Game_Troop.prototype.setup;
		Game_Troop.prototype.setup = function(troopId) {
			_Game_Troop_setup.call(this, troopId);
			this._appearedMembers = [];
			this.members().forEach(function(enemy) {
				if (enemy.isAppeared()) {
					this._appearedMembers.push(enemy.enemyId());
				}
			}, this);
		};
		
		var _Game_Enemy_appear = Game_Enemy.prototype.appear;
		Game_Enemy.prototype.appear = function() {
			_Game_Enemy_appear.call(this);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};
		
		var _Game_Enemy_transform = Game_Enemy.prototype.transform;
			Game_Enemy.prototype.transform = function(enemyId) {
			_Game_Enemy_transform.call(this, enemyId);
			this.friendsUnit()._appearedMembers.push(this._enemyId);
		};

		var Game_Troop_prototype_onBattleEnd = 
			(Game_Troop.prototype.onBattleEnd || Game_Unit.prototype.onBattleEnd);
		Game_Troop.prototype.onBattleEnd = function() {
			Game_Troop_prototype_onBattleEnd.call(this);
			for (var i=0,l=this._appearedMembers.length; i<l; i++) {
				$gameSystem.addToEnemyBook(this._appearedMembers[i]);
			}
		};
	}

//=============================================================================
// Window_PartyCommand
//=============================================================================

	var Window_PartyCommand_prototype_makeCommandList = 
		Window_PartyCommand.prototype.makeCommandList;
	Window_PartyCommand.prototype.makeCommandList = function() {
		Window_PartyCommand_prototype_makeCommandList.call(this);
		this.addEnemyBookCommand();
		this.addAllEnemyBookCommand();
	}

	Window_PartyCommand.prototype.addEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookCommandName, symbol:'enemybook', enabled:true};
		//this.addCommandAt(index, EnemyBookCommandName, 'enemybook', true);
		this._list.splice(index, 0, obj);
		
	};
	// v1.17
	Window_PartyCommand.prototype.addAllEnemyBookCommand = function() {
		if (!$gameSystem.isShowBattleAllEnemyBook()) return;
		var index = this.findSymbol('escape');
		var obj = {name:EnemyBookAllCommandName, symbol:'allenemybook', enabled:true};
		this._list.splice(index, 0, obj);
	};


//=============================================================================
// Scene_Battle
//=============================================================================
	var _Scene_Battle_prototype_initialize = Scene_Battle.prototype.initialize;
	Scene_Battle.prototype.initialize = function() {
		_Scene_Battle_prototype_initialize.call(this);
		this._enemyBookOpen = false;
	};
	var _Scene_Battle_prototype_isTimeActive = Scene_Battle.prototype.isTimeActive;
	Scene_Battle.prototype.isTimeActive = function() {
		if (this._enemyBookOpen) return false;
		return _Scene_Battle_prototype_isTimeActive.call(this);
	};
	var Scene_Battle_prototype_createAllWindows = 
		Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		Scene_Battle_prototype_createAllWindows.call(this);
		this.createEnemyBookWindows();
	};

	Scene_Battle.prototype.createEnemyBookWindows = function() {
		this._enemyBookIndexWindow = new Window_EnemyBookIndex(0,0);
		this._enemyBookIndexWindow.setHandler('cancel', this.endBattleEnemyBook.bind(this));
		this._enemyBookIndexWindow.deselect();

		var wx = this._enemyBookIndexWindow.width;
		var ww = Graphics.boxWidth - wx;
		var wh = Scene_EnemyBook.prototype.calcStatusWindowHeight();
		this._enemyBookStatusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);

		this._enemyBookIndexWindow.hide();
		this._enemyBookStatusWindow.hide();

		this.addWindow(this._enemyBookIndexWindow);
		this.addWindow(this._enemyBookStatusWindow);

		this._enemyBookIndexWindow.setStatusWindow(this._enemyBookStatusWindow);
	};
	
	var Scene_Battle_prototype_isAnyInputWindowActive = 
		Scene_Battle.prototype.isAnyInputWindowActive;
	Scene_Battle.prototype.isAnyInputWindowActive = function() {
		if (Scene_Battle_prototype_isAnyInputWindowActive.call(this)) return true;
		return this._enemyBookIndexWindow.active;
	};

	var Scene_Battle_prototype_createPartyCommandWindow = 
		Scene_Battle.prototype.createPartyCommandWindow;
	Scene_Battle.prototype.createPartyCommandWindow = function() {
		Scene_Battle_prototype_createPartyCommandWindow.call(this);
		var win = this._partyCommandWindow;
		win.setHandler('enemybook', this.battleEnemyBookByCommand.bind(this));
		win.setHandler('allenemybook', this.allBattleEnemyBook.bind(this));
	};

	Scene_Battle.prototype.battleEnemyBook = function() {
		// v1.17
		this._enemyBookOpen = true;
		this._enemyBookStatusWindow.isAllEnemies = false;
		this._enemyBookIndexWindow.isAllEnemies = false;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};
	Scene_Battle.prototype.battleEnemyBookByCommand = function() {
		// v1.17
		AB_EnemyBook.backWindow = 'party_command';
		this.battleEnemyBook();
	};
// v1.17
	Scene_Battle.prototype.allBattleEnemyBook = function() {
		AB_EnemyBook.backWindow = 'party_command';
		this._enemyBookOpen = true;
		this._enemyBookStatusWindow.isAllEnemies = true;
		this._enemyBookIndexWindow.isAllEnemies = true;
		this._enemyBookStatusWindow.setup();
		this._enemyBookIndexWindow.setup();
	};

	// v1.17deselectをcloseの後に移動
	// これが呼ばれた後に
	// Window_EnemyBookIndex.processCancelが呼ばれる？
	Scene_Battle.prototype.endBattleEnemyBook = function() {
		this._enemyBookIndexWindow.close();
		this._enemyBookStatusWindow.close();
		this._enemyBookIndexWindow.deselect();
		this._enemyBookOpen = false;
		//
		if (SceneManager._scene._cancelButton) {
			SceneManager._scene._cancelButton.y = SceneManager._scene.buttonY();
		}
		// v1.28
		if (AB_EnemyBook.backWindow == 'actor_command') {
			this._actorCommandWindow.activate();
			//this._skillWindow.activate();
		}
		if (AB_EnemyBook.backWindow == 'party_command') {
			this._partyCommandWindow.activate();
			//this._skillWindow.activate();
		}
		if (AB_EnemyBook.backWindow == 'skill') {
			this._actorCommandWindow.deactivate();
			this._skillWindow.activate();
		}
		if (AB_EnemyBook.backWindow == 'item') {
			this._actorCommandWindow.deactivate();
			this._itemWindow.activate();
		}
		if (AB_EnemyBook.backWindow == 'check') {
/*
			this._actorCommandWindow.deactivate();
			this._itemWindow.activate();*/
			BattleManager._phase = "turn";
			this._enemyBookIndexWindow.x = 0;
			this._enemyBookIndexWindow.y = 0;
			this._enemyBookIndexWindow.height = Graphics.boxHeight;
			
		}
		//this.startPartyCommandSelection();
		// v1.37
		AB_EnemyBook.backWindow = null;
	};

//=============================================================================
// Scene_EnemyBook
//=============================================================================

	var Scene_EnemyBook = function() {
		this.initialize.apply(this, arguments);
	}
	Scene_EnemyBook.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_EnemyBook.prototype.constructor = Scene_EnemyBook;
	
	Scene_EnemyBook.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
	};

	Scene_EnemyBook.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this._percentWindow = new Window_EnemyBookPercent(0, 0);
		var wy = this._percentWindow.height;
		this._indexWindow = new Window_EnemyBookIndex(0, wy);
		this._indexWindow.setHandler('cancel', this.popScene.bind(this));
		var wx = this._indexWindow.width;
		var ww = Graphics.boxWidth - wx;
		var wh = this.calcStatusWindowHeight();
		this._statusWindow = new Window_EnemyBookStatus(wx, 0, ww, wh);
		this.addWindow(this._percentWindow);
		this.addWindow(this._indexWindow);
		this.addWindow(this._statusWindow);
		// Xv1.16 （セットアップって自動で呼ばれたような？）
		this._indexWindow.isAllEnemies = true;
		this._statusWindow.isAllEnemies = true;
		this._indexWindow.setup();
		this._indexWindow.setStatusWindow(this._statusWindow);
		this._indexWindow.setPercentWindow(this._percentWindow);
	};

	Scene_EnemyBook.prototype.calcStatusWindowHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var paramHeight = Scene_EnemyBook.prototype.calcParameterHeight();
		var height = paramHeight + standardPadding * 2;
		var linePlus = 0;
		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				linePlus += 0.5;
			}
		}
		// v1.30
		//linePlus += DispSkillNumber;

		linePlus = Math.ceil(linePlus) * 2;

		if (DispDescribe) {
			linePlus += DescribeLineNumber;
		}
		height += linePlus * lineHeight + textPadding * Math.ceil(linePlus / 2);
		return height;
	};

	Scene_EnemyBook.prototype.calcParameterHeight = function() {
		var lineHeight = Window_Base.prototype.lineHeight();
		var textPadding = Window_Base.prototype.textPadding();
		var standardPadding = Window_Base.prototype.standardPadding();
		var height = 0;
		var linePlus = 0;
		for (var i = 0; i < 8; i++) {
			if (dispParameters[i]) {
				linePlus++;
			}
		}
		// v1.30
		linePlus += DispSkillNumber;
		
		if (DispDefeatNumber) linePlus++;
		if (DispLv) linePlus++;
		if (dispTP) linePlus++;
		if (dispHitRate) linePlus++;
		if (DispEvadeRate) linePlus++;
		linePlus = Math.max(linePlus, DispDropItems ? 9 : 6);
		height = lineHeight * linePlus + textPadding * 2;

		return height;
	};


//=============================================================================
// Window_EnemyBookPercent
//=============================================================================

	var Window_EnemyBookPercent = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookPercent.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookPercent.prototype.constructor = Window_EnemyBookPercent;

	Window_EnemyBookPercent.prototype.initialize = function(x, y, width, height) {
		var width = Math.floor(Graphics.boxWidth / 3);
		var height = this.fittingHeight(1);
		let rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
		this.max = 0;
		this.achievement = 0;
	};

	Window_EnemyBookPercent.prototype.setup = function() {
		this.show();
		this.open();
	};

	Window_EnemyBookPercent.prototype.setAchievement = function(max, achievement) {
		this.max = max;
		this.achievement = achievement;
		this.refresh();
	}

	Window_EnemyBookPercent.prototype.refresh = function() {
		if (this.max === 0) return;
		var w1 = this.contentsWidth()/2;
		this.drawText(Achievement, 0, 0, w1);
		this.drawText(Math.floor(this.achievement / this.max * 100) + "%", w1, 0, w1, 'right');
	}

//=============================================================================
// Window_EnemyBookIndex
//=============================================================================
	var Window_EnemyBookIndex = function() {
		this.initialize.apply(this, arguments);
	}
	Window_EnemyBookIndex.prototype = Object.create(Window_Selectable.prototype);
	Window_EnemyBookIndex.prototype.constructor = Window_EnemyBookIndex;

	Window_EnemyBookIndex.lastIndex  = 0;

	Window_EnemyBookIndex.prototype.initialize = function(x, y) {
		const width = Math.floor(Graphics.boxWidth / 3);
		const height = Graphics.boxHeight - y;
		let rect = new Rectangle(x, y, width, height);
		Window_Selectable.prototype.initialize.call(this, rect);
		//this.refresh();
		// v1.17
		this.isAllEnemies = false;
		this.enemy = null;
	}
	//
	Window_EnemyBookIndex.prototype.buttonY = function() {
	    return 0;
	};

	Window_EnemyBookIndex.prototype.setup = function() {
		this.refresh();
				// v1.17
		// setupがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		if (!this.isAllEnemies) {
			this.select(0);
		// ver1.16
		} else if ($gameTemp.ABEnemyBookId){
			var no = 0;
			var id = $gameTemp.ABEnemyBookId;
			$gameTemp.ABEnemyBookId = null;
			this._list.some(function(enemy, i){
				if (id === enemy.enemyId()) {
					no = i;
					return true;
				}
				return false;
			});
			this.select(no);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.show();
		this.activate();
		this.open();
	};

	Window_EnemyBookIndex.prototype.setupWhenCheck = function() {
		this.refresh();
		// 1.30
		this._statusWindow.isCheck = true;
		AB_EnemyBook.backWindow = 'check';
				// v1.17
		// setupWhenCheckがいつ呼ばれるかによっては図鑑を開いたときでも
		// 初期カーソルが0になってしまう恐れ
		// ただsetupWhenCheckはチェックスキルのときだけ使われるので平気だった
		if (!this.isAllEnemies) {
			this.select(0);
		} else {
			this.select(Window_EnemyBookIndex.lastIndex);
		}
		this.openness = 255;
		this.hide();
		this.activate();
	};

	Window_EnemyBookIndex.prototype.maxCols = function() {
		return 1;
	};

	Window_EnemyBookIndex.prototype.maxItems = function() {
		return this._list ? this._list.length : 0;
	};

	Window_EnemyBookIndex.prototype.setPercentWindow = function(percentWindow) {
		this._percentWindow = percentWindow;
		this.updatePercent();
	};

	Window_EnemyBookIndex.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		this.updateStatus();
	};

	Window_EnemyBookIndex.prototype.updatePercent = function() {
		if (this._percentWindow && this._list) {
			var a = $gameSystem.getRegisterNumber();
			this._percentWindow.setAchievement(this._list.length, a);
		}
	}

	Window_EnemyBookIndex.prototype.updateStatus = function() {
		if (this._statusWindow && this._list) {
			var enemy = this._list[this.index()];
			this._statusWindow.setEnemy(enemy);
		}
	};

	Window_EnemyBookIndex.prototype.refresh = function() {
		//
		if (SceneManager._scene._cancelButton) {
			SceneManager._scene._cancelButton.y = 0;
		}
		this._list = [];
		if (this.enemy) {
			this._list.push(this.enemy);
				// v1.17
		} else if (!this.isAllEnemies && $gameSystem.isShowCurrentEnemysStatus()) {
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				if (enemies[i].enemy().meta.book !== 'no') {
					this._list.push(enemies[i]);
				}
			}
				// v1.17
		} else if (!this.isAllEnemies) {
			var enemyIds = [];
			var enemies = $gameTroop.aliveMembers();
			for (var i=0,l=enemies.length; i<l; i++) {
				var id = enemies[i].enemyId();
				var flag = enemyIds.some(function(id2) {
					return id === id2;
				});
				if (enemies[i].enemy().meta.book !== 'no' && !flag) {
					enemyIds.push(id);
					var gameEnemy = new Game_Enemy(id,0,0);
					this._list.push(gameEnemy);
				}
			}
		} else {
			for (var i = 1; i < $dataEnemies.length; i++) {
				var enemy = $dataEnemies[i];
				if (enemy.name && enemy.meta.book !== 'no') {
					var gameEnemy = new Game_Enemy(i,0,0);
					this._list.push(gameEnemy);
				}
			}
		}
		this.createContents();
		this.drawAllItems();
	};

	Window_EnemyBookIndex.prototype.drawItem = function(index) {
		var enemy = this._list[index];
		var rect = this.itemLineRect(index);
		var name;
		// ここは、名前を？にするか判定しているだけなので変えない
		// v1.18　（↑は間違ってた）
		if (!this.isAllEnemies || $gameSystem.isInEnemyBook(enemy.enemy())) {
			name = enemy.name();
		} else {
			name = UnknownEnemy;
		}
				// v1.17
		if (this.isAllEnemies && DispNo) {
			this.drawText(index+1, rect.x, rect.y, 40);
			this.drawText(name, rect.x + 40, rect.y, rect.width - 40);
		} else {
			this.drawText(name, rect.x, rect.y, rect.width);
		}
	};
/* ツクールMV rpg_windows.jsより
Window_Selectable.processCancelでハンドラが呼ばれている。
Window_Selectable.prototype.processCancel = function() {
    SoundManager.playCancel();
    this.updateInputData();
    this.deactivate();
    this.callCancelHandler();
};
*/
// TODO: 戦闘中に図鑑（全体）を開いた後、チェックスキルを使うと何も表示されない
	Window_EnemyBookIndex.prototype.processCancel = function() {
		// v1.17
		if (this.isAllEnemies) {
			Window_EnemyBookIndex.lastIndex = this.index();
		}
		this.enemy = null;
		this._statusWindow.isCheck = false;
		// v1.17 後ろに移動
		Window_Selectable.prototype.processCancel.call(this);
		this.refreshCursor();
	};

	// v1.29 
	Window_EnemyBookIndex.prototype.cursorRight = function(wrap) {
    var index = this.index();
		var maxItems = this.maxItems();
		var maxPageRows = this.maxPageRows();
		index = Math.min(index+maxPageRows, maxItems-1);
		this.select(index);
		this.scrollBy(0,maxPageRows * this.scrollBlockHeight());
	};
	Window_EnemyBookIndex.prototype.cursorLeft = function(wrap) {
    var index = this.index();
		var maxPageRows = this.maxPageRows();
		index = Math.max(index-maxPageRows, 0);
		this.select(index);
		this.refreshCursor();
		this.scrollBy(0,-maxPageRows * this.scrollBlockHeight());
	};



//=============================================================================
// Window_EnemyBookStatus
//=============================================================================

	var Window_EnemyBookStatus = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EnemyBookStatus.prototype = Object.create(Window_Base.prototype);
	Window_EnemyBookStatus.prototype.constructor = Window_EnemyBookStatus;

	Window_EnemyBookStatus.prototype.initialize = function(x, y, width, height) {
		let rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
		this._defaultX = x;
		this._windowWidth = width;
		this._enemy = null;
		this._enemySprite = new Sprite();
		this._enemySprite.anchor.x = 0.5;
		this._enemySprite.anchor.y = 0.5;
		this._enemySprite.x = width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight() + EnemyOffsetY;
		this.addChildToBack(this._enemySprite);
		/* ver 1.31*/
		if (this._backgroundSprite == undefined) {
				if (BackgroundImage) {
					this._backgroundSprite = new Sprite();
			    this._backgroundSprite.bitmap = ImageManager.loadParallax(BackgroundImage);
					this._backgroundSprite.opacity = BackgroundImageOpacity;
			    this.addChildToBack(this._backgroundSprite);
					
					var bsw = SpreadBackgroundImage ? Graphics.boxWidth : width;
					this._backgroundSprite.setFrame(0, 0, bsw, Graphics.boxWidth);
					
				}
		}
		this.isCheck = false;
		this.refresh();
		// v1.17
		this.isAllEnemies = false;
		// this._cw = 0;
		this._spriteFrameCountAB = 0;
	};

	Window_EnemyBookStatus.prototype.setup = function() {
		this.x = this._defaultX;
		this.setupbacksprite();
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setupWhenCheck = function() {
		this.x = Math.floor((Graphics.boxWidth - this.width) / 2);
		this.width = this.windowWidth();
		this.setupbacksprite();
		this.refresh();
		this.show();
		this.open();
	};

	Window_EnemyBookStatus.prototype.setEnemy = function(enemy) {
		if (this._enemy !== enemy) {
			this._enemy = enemy;
			this.refresh();
		}
	};

// refresh に移動
// Version 1.11で復活

	Window_EnemyBookStatus.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		// ver 1.11
		if (this._enemySprite.bitmap) {
			var dataEnemy = this._enemy.enemy();
			// version 1.15
			var bitmap = this._enemySprite.bitmap;
			// ver 1.13
			if (Imported.YEP_X_AnimatedSVEnemies) {
				if (this._spriteFrameCountAB % 12 === 0) {
					if (dataEnemy.sideviewBattler[0]) {
						var ary = [0,1,2,1];
						var motionIndex = 0; // 待機モーション
						var pattern = ary[Math.floor(this._spriteFrameCountAB / 12) % 4];
						var cw = bitmap.width / 9;
						var ch = bitmap.height / 6;
						var cx = Math.floor(motionIndex / 6) * 3 + pattern;
						var cy = motionIndex % 6;
						this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
						// YEP_X_AnimatedSVEnemiesにはここに Sprite_Enemy.adjustMainBitmapSettingsがある。
						// これはBitmapを新しく作っている。（？）
						// サイドビューバトラーの高さと幅を指定していた場合調整される。
						// this._enemySprite.bitmap = new Bitmap(cw, ch);
					// サイドビューバトラーじゃない場合
					} else {
						// 1回目に表示されるようになったけどはみ出す
						this._enemySprite.setFrame(0,0,bitmap.width, bitmap.height);
						// undefined
						// console.log(this._enemySprite.spriteScaleX);
					}
				}
			}
			//ver 1.12
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				var bitmapWidth = bitmap.width / 9;
			} else {
				var bitmapWidth = bitmap.width;
			}
			var contentsWidth = this.contents.width;
			var scale = 1;
			//
			//console.log(this._enemySprite.bitmap.width);
			//console.log(contentsWidth);
			if (bitmapWidth > contentsWidth / 2) {
				scale = contentsWidth / bitmapWidth / 2;
				//console.log("bitmapWidth(+"bitmapWidth"+) > contentsWidth / 2");
			}
/*
			// ver 1.30
			scale=this.contents.width / this._enemySprite.width;
			this._enemySprite.anchor.x = 0.5;
			this._enemySprite.anchor.y = 0.5;
			this._enemySprite.x = this.contents.width/2;
			this._enemySprite.y = this.contents.height/2;
*/
			this._enemySprite.scale.x = scale;
			this._enemySprite.scale.y = scale;
			this._spriteFrameCountAB++;
		}
	};

	Window_EnemyBookStatus.prototype.refresh = function() {
		var x = 0, y = 0, width = this.contentsWidth(), height = this.height;
		if (SpreadBackgroundImage && AB_EnemyBook.backWindow == 'check') {
			x = Graphics.boxWidth/2 - this._windowWidth / 2;
			width = this._windowWidth;
		}
		
		this._enemySprite.x = x+ width / 4;
		this._enemySprite.y = width / 4 + this.lineHeight() + EnemyOffsetY;

		this.drawAllContents(x,y,width,height);

	};

	

	Window_EnemyBookStatus.prototype.drawAllContents = function(x, y, width, height) {
		var enemy = this._enemy;
		var column1x = x;
		var column2x = width ? x+width / 2 + this.standardPadding()/2 : this.contentsWidth() / 2 + this.standardPadding() / 2;
		var columnWidth = width ? width / 2 - this.standardPadding() : this.contentsWidth() / 2 - this.standardPadding();
		var x = x || 0;
		var y = y || 0;
		var w = columnWidth / 2 - this.standardPadding();
		//var mY = 0;
		var lineHeight = this.lineHeight();


		this.contents.clear();


		var isHideStatus = this.isHideStatus(enemy);
		var isCurrentStatus = this.isCurrentStatus(enemy);

				// v1.17
		if (!enemy|| (this.isAllEnemies && !$gameSystem.isInEnemyBook(enemy.enemy()))) {
			this._enemySprite.bitmap = null;
			return;
		}

		var dataEnemy = enemy.enemy();

		var name = enemy.battlerName();
		var hue = enemy.battlerHue();

		var bitmap;
		
		this._enemySprite.scale.x = 1;
		this._enemySprite.scale.y = 1;
		if ($gameSystem.isSideView()) {
			// YEP_X_AnimatedSVEnemiesへの対応（v1.08）
			if (Imported.YEP_X_AnimatedSVEnemies && dataEnemy.sideviewBattler[0]) {
				name = Yanfly.Util.getRandomElement(dataEnemy.sideviewBattler);
				bitmap = ImageManager.loadSvActor(name);
				var motionIndex = 0;
				var pattern = 1;
				var cw = bitmap.width / 9;
				var ch = bitmap.height / 6;
				var cx = Math.floor(motionIndex / 6) * 3 + pattern;
				var cy = motionIndex % 6;
				this._enemySprite.bitmap = bitmap;
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
				this._enemySprite.setHue(hue);

			} else {
				bitmap = ImageManager.loadSvEnemy(name);
				var cw = bitmap.width;
				var ch = bitmap.height;
				var cx = 0;
				var cy = 0;
				this._enemySprite.bitmap = bitmap;
				this._enemySprite.setHue(hue);
				// Ver1.11 たぶんこれが原因で1回目に表示されないので、
				// YEP_X_AnimatedSVEnemiesを使っていないときは
				// 処理をしない
				if (Imported.YEP_X_AnimatedSVEnemies) {
					this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
				}
			}
			
		} else {
			bitmap = ImageManager.loadEnemy(name);
			var cw = bitmap.width;
			var ch = bitmap.height;
			var cx = 0;
			var cy = 0;
			this._enemySprite.bitmap = bitmap;
			this._enemySprite.setHue(hue);
			if (Imported.YEP_X_AnimatedSVEnemies) {
				this._enemySprite.setFrame(cx * cw, cy * ch, cw, ch);
			}
		}
		// Version 1.11
		// version 1.13で削除
		// this._cw = cw;

		// ver 1.12
/*
		var bitmapWidth = this._cw;
		var contentsWidth = this.contents.width;
		var scale = 1;
		if (bitmapWidth > contentsWidth / 2) {
			scale = contentsWidth / bitmapWidth / 2;
		}
		this._enemySprite.scale.x = scale;
		this._enemySprite.scale.y = scale;
		
*/
		this.resetTextColor();
		this.drawText(enemy.name(), x, y, columnWidth);

		x = column2x;

		if (dataEnemy.meta.bookLevel && DispLv) {
			this.resetTextColor();
			this.drawText(TextManager.levelA + " " + dataEnemy.meta.bookLevel, x, y);
		}


		if (DispLv) y += lineHeight;
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.drawText(DefeatNumberName, x, y, w);
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}

		if (y != 0) y += this.textPadding();

		for (var i = 0; i < 8; i++) {
			// v1.25 drawTP
			if (i == 2 && dispTP && isCurrentStatus) {
				if (!isHideStatus) {
					this.drawActorTp(enemy, x, y, 220);
				}	else {
					this.changeTextColor(this.systemColor());
					this.drawText(TextManager.tpA, x, y, 60);
					this.resetTextColor();
					this.drawText(UnknownData, x + w, y, w, 'right');
				}
				y += lineHeight;
			} else if (i == 2 && dispTP){
				this.changeTextColor(this.systemColor());
				this.drawText(TextManager.tpA, x, y, w);
				this.resetTextColor();
				if (!isUnknownEnemy) {
					this.drawText(/*enemy.xparam(0)*/ enemy.tp, x + w, y, w, 'right');
				} else {
					this.drawText(UnknownData, x + w, y, w, 'right');
				}
				y += lineHeight;
			
			}
			if (dispParameters[i]) {
				// v1.17
				if (i == 0 && !this.isAllEnemies && isCurrentStatus) {
					if (!isHideStatus) {
						this.drawActorHp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.hpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				// v1.17
				} else if (i == 1 && !this.isAllEnemies && (isCurrentStatus)) {
					if (!isHideStatus) {
						this.drawActorMp(enemy, x, y, 220);
					}	else {
						this.changeTextColor(this.systemColor());
						this.drawText(TextManager.mpA, x, y, 60);
						this.resetTextColor();
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				} else {
					this.changeTextColor(this.systemColor());
					this.drawText(TextManager.param(i), x, y, w);
					this.resetTextColor();
					if (!isHideStatus) {
						this.drawText(enemy.param(i), x + w, y, w, 'right');
					} else {
						this.drawText(UnknownData, x + w, y, w, 'right');
					}
				}
				y += lineHeight;
			}
		}


		if (dispHitRate) {
			this.changeTextColor(this.systemColor());
			this.drawText(HitRateName, x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((enemy.xparam(0)*100), x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			}
			y += lineHeight;
			
		}
		if (DispEvadeRate) {
			this.changeTextColor(this.systemColor());
			this.drawText(EvadeRateName, x, y, w);
			this.resetTextColor();
			if (!isHideStatus) {
				this.drawText((Math.floor(enemy.xparam(1)*100)), x + w, y, w, 'right');
			} else {
				this.drawText(UnknownData, x + w, y, w, 'right');
			}
			y += lineHeight;
			
		}

		// v1.30
		for (var i=0; i<DispSkillNumber; i++) {
			var action = dataEnemy.actions[i];
			if (action) {
				if (!isHideStatus) {
					this.drawItemName($dataSkills[action.skillId], x, y, columnWidth);
					y += lineHeight;
				} else {
					this.drawText(UnknownData, x, y, columnWidth);
					y += lineHeight;
				
				}
			}
		}
		var maxY = y;
	
/*
		if (DispDefeatNumber) {
			this.resetTextColor();
			this.changeTextColor(this.systemColor());
			this.drawText(DefeatNumberName, x, y, w);
			this.resetTextColor();
			this.drawText($gameSystem.defeatNumber(enemy.enemyId()), x + w, y, w , 'right');
			y += lineHeight;
		}
*/
		//mY = y;

		x = column1x;
		y = lineHeight * 6 + this.textPadding();

		if (DispDropItems) {
			for (var i = 0, l = dataEnemy.dropItems.length; i < l; i++) {
				var di = dataEnemy.dropItems[i];
				if (di.kind > 0) {
					if (!isHideStatus && $gameSystem.getEnemyDropGot(enemy._enemyId, i)) {
						var item = enemy.itemObject(di.kind, di.dataId);
						this.drawItemName(item, x, y, columnWidth);
					} else {
						this.drawIcon(16, x, y);
						this.drawText(UnknownData, x + 32, y);
					}
					y += lineHeight;
				}
			}
		}

		x = column1x;
		if (maxY > y) y = maxY;
		y += this.standardPadding();
		//y = Scene_EnemyBook.prototype.calcParameterHeight();
		//y = (mY > y) ? mY : y;
		var j = 0;
		y = Scene_EnemyBook.prototype.calcParameterHeight();

		for (var i = 0; i < 5; i++) {
			if (dispRates[i]) {
				switch(i) {
				case 0:
					this.drawWeakElement(x, y, columnWidth);
					break;
				case 1:
					this.drawResistElement(x, y, columnWidth);
					break;
				case 2:
					this.drawWeakStates(x, y, columnWidth);
					break;
				case 3:
					this.drawResistStates(x, y, columnWidth);
					break;
				case 4:
					this.drawNoEffectStates(x, y, columnWidth);
					break;
				}
				j++;
				if (j % 2 == 1) {
					x = column2x;
				} else {
					x = column1x;
					y += lineHeight * 2 + this.textPadding();
				}
			}
		}
		if (x == column2x) 
			y += lineHeight * 2 + this.textPadding();
		x = column1x;
		
		if (!isHideStatus && DispDescribe) {
			for (var i = 1; i <= DescribeLineNumber; i++) {
				if (!dataEnemy.meta["desc"+i]) return;
				this.drawTextEx(dataEnemy.meta["desc"+i], x, y + lineHeight * (i-1));
			}
		}
	};

	Window_EnemyBookStatus.prototype.findElementIcon = function(elementId) {
		if (UseElementIconInPluginParameter) {
			return ElementIcons[elementId];
		} else {
			var elementName = $dataSystem.elements[elementId];
			if (elementName.match(/\i\[(\d+)\]/i)) {
				return RegExp.$1;
			}
		}
		return 0;
	};

	Window_EnemyBookStatus.prototype.drawResistElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate < 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawWeakElement = function(x, y, w) {
		var enemy = this._enemy;
		var elements = $dataSystem.elements;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=elements.length; i < l; i++) {
			var rate = enemy.elementRate(i);
			if (rate > 1) {
				var icon = this.findElementIcon(i);
				if (icon) icons.push(icon);
			}
		}
		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakElementName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawResistStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate < 1 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				if (dispRates[4] && (rate <= 0 || enemy.isStateResist(i))) continue;
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(ResistStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.drawWeakStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if (rate > 1 && $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(WeakStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};

	Window_EnemyBookStatus.prototype.isHideStatus = function(enemy) {
		if (!enemy) return true;
		return !($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill));
	};

	Window_EnemyBookStatus.prototype.isCurrentStatus = function(enemy) {
		if (!enemy) return false;
		return !this.isAllEnemies && ($gameSystem.isShowCurrentEnemysStatus() || this.isCheck) && !ShowGeneralStatusInSkill;
	};

	Window_EnemyBookStatus.prototype.drawNoEffectStates = function(x, y, w) {
		var enemy = this._enemy;
		var icons = [];
		var iconWidth = 32;
		var dx = 32;
		for (var i=1,l=$dataStates.length; i<l; i++) {
			var rate = enemy.stateRate(i);
			if ((rate <= 0 || enemy.isStateResist(i))&& $dataStates[i].meta.book !== "no") {
				var icon = $dataStates[i].iconIndex;
				if (icon) icons.push(icon);
			}
		}

		
		this.changeTextColor(this.systemColor());
		this.drawText(NoEffectStateName, x, y, w);

		if (iconWidth * icons.length > w) {
			dx = Math.floor(w / icons.length);
		}
		y+= this.lineHeight();
		
		if ($gameSystem.isInEnemyBook(enemy.enemy()) || (this.isCheck && !HideUnknownStatusInSkill)) {
			for (var i=0,l=icons.length; i<l; i++) {
				this.drawIcon(icons[i], x, y);
				x += dx;
			}
		} else {
			this.resetTextColor();
			this.drawText(UnknownData, x, y);
		}
	};



//=============================================================================
// Game_Action
//=============================================================================

	var Game_Action_prototype_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		Game_Action_prototype_apply.call(this, target);
		this.applyEnemyBookEffect(target);
	};

	Game_Action.prototype.applyEnemyBookEffect = function(target) {
		if (target.isEnemy()) {
			if (this._item.object().meta.addToEnemyBook) {
				this.addToEnemyBook(target);
			}
			if (this._item.object().meta.checkEnemyStatus) {
				this.checkEnemyStatus(target);
			}
		}
	};

	Game_Action.prototype.addToEnemyBook = function(target) {
		var result = target.result();
		this.makeSuccess(target);
		if (result.isHit()) {
			if (target.enemy().meta.book !== "no") {
				$gameSystem.addToEnemyBook(target.enemyId());
				var message = AddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			} else {
				var message = FailToAddEnemySkillMessage.replace("%1", target.name());
				if (message) {
					BattleManager._logWindow.push('addText', message);
				}
			}
		} else {
			var message = MissToAddEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};

	Game_Action.prototype.checkEnemyStatus = function(target) {
		this.makeSuccess(target);
		if (!(target.enemy().meta.book == "no" && !target.enemy().meta.bookCanCheck)) {
			var indexWindow = SceneManager._scene._enemyBookIndexWindow;
			var statusWindow = SceneManager._scene._enemyBookStatusWindow;
			if (ShowGeneralStatusInSkill) {
				var id = target.enemyId();
				indexWindow.enemy = new Game_Enemy(id, 0, 0);
			} else {
				indexWindow.enemy = target;
			}
			statusWindow.isCheck = true;
			// v1.17
			indexWindow.isAllEnemies = false;
			statusWindow.isAllEnemies = false;
			// v1.37
			AB_EnemyBook.backWindow = "check";
			BattleManager._phase = "check";



			indexWindow.setupWhenCheck();
			statusWindow.setupWhenCheck();
			indexWindow.activate();
			indexWindow.show();
			//indexWindow.x = 200;
			indexWindow.y = -2000;
			//indexWindow.open();
		} else {
			var message = FailToCheckEnemySkillMessage.replace("%1", target.name());
			if (message) {
				BattleManager._logWindow.push('addText', message);
			}
		}
	};


//=============================================================================
// Game_Enemy
//=============================================================================

	var _Game_Enemy_die = Game_Enemy.prototype.die;
	Game_Enemy.prototype.die = function() {
		_Game_Enemy_die.call(this);
		$gameSystem.incrementDefeatNumber(this.enemyId());
	};

	var _Game_Enemy_prototype_makeDropItems = Game_Enemy.prototype.makeDropItems;
	Game_Enemy.prototype.makeDropItems = function() {
		var r = _Game_Enemy_prototype_makeDropItems.call(this);
		if (!HideItemUntilGet) return r;
		for (var i=0, l=r.length; i<l; i++) {
			var DI = this.enemy().dropItems;
			for (var j=0, jl=DI.length; j<jl; j++) {
				if (r[i].id === DI[j].dataId) {
					switch (DI[j].kind) {
					case 1:
						if (DataManager.isItem(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 2:
						if (DataManager.isWeapon(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					case 3:
						if (DataManager.isArmor(r[i])) {
							$gameSystem.setEnemyDropGot(this._enemyId, j, true);
						}
						break;
					}
				}
			}
		}
		return r;
	}
//=============================================================================
// BattleManager
//=============================================================================

/*
var _BattleManager_updateEvent = BattleManager.updateEvent;
BattleManager.updateEvent = function() {
	if (AB_EnemyBook.backWindow == "check") {
		return true;
	}
	return _BattleManager_updateEvent.call(this);
};*/
/*
	var _BattleManager_updateTurn = BattleManager.updateTurn;
	BattleManager.updateTurn = function(timeActive) {
		if (AB_EnemyBook.backWindow == "check") {
			return true;
		}
			_BattleManager_updateTurn.call(this, timeActive);
	};
*/

// 
//=============================================================================
// v1.28 ショートカットキー
//=============================================================================
// 参考プラグイン：Torigoya_OneButtonSkill.js
// http://torigoya.hatenadiary.jp/
// プラグイン制作者：ru_shalm様


		var AB_EnemyBook = {
			name: 'AB_EnemyBook',
			backWindow :null
		};
//-----------------------------------


    AB_EnemyBook.onCommand = function () {
		// v1.28
				SceneManager._scene.battleEnemyBook();
    };

// Window_ActorCommand-----------------------------------

    Window_ActorCommand.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'actor_command';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function () {
        _Scene_Battle_createActorCommandWindow.apply(this);
        this._actorCommandWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_ActorCommand_processHandling = Window_ActorCommand.prototype.processHandling;
    Window_ActorCommand.prototype.processHandling = function () {
        _Window_ActorCommand_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
            }
        }
    };


// Window_BattleSkill-----------------------------------

    Window_BattleSkill.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'skill';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
    Scene_Battle.prototype.createSkillWindow = function () {
        _Scene_Battle_createSkillWindow.apply(this);
        this._skillWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_BattleSkill_processHandling = Window_BattleSkill.prototype.processHandling;
    Window_BattleSkill.prototype.processHandling = function () {
        _Window_BattleSkill_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
            }
        }
    };
// Window_BattleItem-----------------------------------

    Window_BattleItem.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'item';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
    Scene_Battle.prototype.createItemWindow = function () {
        _Scene_Battle_createItemWindow.apply(this);
        this._itemWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_BattleItem_processHandling = Window_BattleItem.prototype.processHandling;
    Window_BattleItem.prototype.processHandling = function () {
        _Window_BattleItem_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
            }
        }
    };
// Window_PartyCommand-----------------------------------

    Window_PartyCommand.prototype.processAB_EnemyBook = function () {
        if (!$gameParty.inBattle()) return;
        this.playOkSound();
        this.updateInputData();
        this.deactivate();
				AB_EnemyBook.backWindow = 'party_command';
        this.callHandler('ab_enemybook');
    };
    
    var _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function () {
        _Scene_Battle_createPartyCommandWindow.apply(this);
        this._partyCommandWindow.setHandler('ab_enemybook', AB_EnemyBook.onCommand.bind(this));
    };

		var _Window_PartyCommand_processHandling = Window_PartyCommand.prototype.processHandling;
    Window_PartyCommand.prototype.processHandling = function () {
        _Window_PartyCommand_processHandling.apply(this);
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(ShortCutButtonName)) {
                this.processAB_EnemyBook();
            }
        }
    };

/**-----*/

Window_EnemyBookStatus.prototype.updateBackOpacity = function() {
		if (!BackgroundImage) {
			Window_Base.prototype.updateBackOpacity.call(this);
			return;
		} 
    this.backOpacity = 0;
		this.opacity = 0;
};
Window_EnemyBookStatus.prototype.windowWidth = function() {
		return this._windowWidth;
};
Window_EnemyBookStatus.prototype.setupbacksprite = function() {
		if (SpreadBackgroundImage) {
			if (AB_EnemyBook.backWindow == 'check') {
				//this._backgroundSprite.x = -(Graphics.boxWidth - this.width)/2;
				this.x = 0;
				this.width = Graphics.boxWidth;
				this.height = Graphics.boxHeight/* + this.standardPadding() * 2*/;
				if (BackgroundImage && BackgroundImage && this._backgroundSprite != null) {
					this._backgroundSprite.setFrame(0, 0, this.width, this.height);
		    }
				this.createContents();
				this.refresh();
				return;
			}
		
			this.x = this._defaultX;
			this.width = this._windowWidth;
			this.height = Scene_EnemyBook.prototype.calcStatusWindowHeight();
			if (BackgroundImage && BackgroundImage && this._backgroundSprite != null) {
				this._backgroundSprite.x = 0;
				this._backgroundSprite.setFrame(0, 0, this.width, this.height);
			}
	    this.createContents();
			this.refresh();
		}
};
Window_EnemyBookIndex.prototype.updateBackOpacity = function() {
		if (!BackgroundImage) {
			Window_Base.prototype.updateBackOpacity.call(this);
			return;
		} 
		if (this._backgroundSprite == undefined && BackgroundImage) {
		    this.backOpacity = 0;
				this.opacity = 0;
				this._backgroundSprite = new Sprite();
		    this._backgroundSprite.bitmap = ImageManager.loadParallax(BackgroundImage);
				this._backgroundSprite.opacity = BackgroundImageOpacity;
		    this.addChildToBack(this._backgroundSprite);
				
		}
};
Window_EnemyBookPercent.prototype.updateBackOpacity = function() {
/**/
		if (!BackgroundImage) {
			Window_Base.prototype.updateBackOpacity.call(this);
			return;
		} 
		if (this._backgroundSprite == undefined && BackgroundImage) {
		    this.backOpacity = 0;
				this.opacity = 0;
				this._backgroundSprite = new Sprite();
		    this._backgroundSprite.bitmap = ImageManager.loadParallax(BackgroundImage);
				this._backgroundSprite.opacity = BackgroundImageOpacity;
		    this.addChildToBack(this._backgroundSprite);
		}
};


/**-----*/

})();