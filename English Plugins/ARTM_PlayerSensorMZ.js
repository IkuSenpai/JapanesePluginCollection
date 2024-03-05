// ===================================================
// ARTM_PlayerSensorMZ.js
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// -------------
// [Version]
// 1.0.0 Initial release
// ---------------------------------------------------
//  Source Port: MKR_PlayerSensor.js [ver.3.0.0]
// ---------------------------------------------------
//  Copyright (c) 2016 mankind
//  This software is released under the MIT License.
//  http://opensource.org/licenses/mit-license.php
// ====================================================
/*:
 *
 * @plugindesc Player Detection Plugin (MZ Port)
 * @target MZ
 * @author Artemis
 * @translator IkuSenpai
 *
 * @help ARTM_PlayerSensorMZ
 *
 * This is an MZ port of the Player Detection Plugin created by mankind.
 * The basic functionality remains unchanged.
 *
 * - Usage -
 * Draw the visibility range of the target event (hereafter referred to as the searcher),
 * and if the player is within that range, the searcher enters the detection state
 * and turns on the specified switch. (While the switch is ON, the searcher won't turn towards the direction they were spoken to)
 *
 * If the player moves outside the visibility range, the searcher enters the lost state,
 * and the previously turned-on switch is turned off. (The time for the state transition can be adjusted based on settings)
 *
 * ※ If the event is running due to the [Auto Run] trigger, the search process will be paused
 *    to consider the game operation load.
 *    (Settings can be changed in the event note)
 *
 *
 * Simple Usage Explanation:
 *   Set the memo field of the event you want to be a searcher, and
 *   when the "Search Start" plugin command is executed on the map where the searchers are,
 *   all searchers on that map will start searching.
 *   (Except for searchers in the temporary search disabled state)
 *
 *   When the "Force Search Start" plugin command is executed on the map where the searchers are,
 *   all searchers on that map will start searching.
 *   (Even searchers in the temporary search disabled state will start searching)
 *
 *   When the "Target Searcher's Search Start" plugin command is executed in the event of the searcher,
 *   that searcher will start searching.
 *   (It will start searching even for searchers in the temporary search disabled state)
 *
 *   When the "Target Searcher's Search Stop" plugin command is executed in the event of the searcher,
 *   that searcher will stop searching.
 *   (The state will be updated as the player is not detected.)
 *
 *   When the "Search Stop" plugin command is executed on the map where the searchers are,
 *   all searchers on that map will stop searching.
 *   (The state will be updated as the player is not detected.)
 *
 *
 * Basic Setting in the Memo Field (X is a positive integer):
 *   <PsensorL:X>
 *     ・Search in front of the searcher for X tiles.
 *
 *   <PsensorF:X>
 *     ・Search within the triangular area formed by connecting points
 *       X tiles in front of and to the left and right of the searcher's vertex.
 *
 *   <PsensorD:X>
 *     ・Search within the diamond-shaped area formed by connecting points
 *       X tiles above, below, to the left, and to the right of the searcher.
 *
 *     ・In this shape, ignore the passability status of the terrain.
 *       (Always in the state where the Td option is 1.)
 *
 *   <PsensorS:X>
 *     ・Search within the rectangular area formed by connecting points
 *       X tiles above, below, to the left, and to the right of the searcher.
 *
 *     ・In this shape, ignore the passability status of the terrain.
 *       (Always in the state where the Td option is 1.)
 *
 *   <PsensorL:\V[n]>
 *     ・For the part specifying the number of visibility range tiles,
 *       the control character \V[n], which represents a variable, can be used.
 *       Use the value stored in variable number N as the range value.
 *       (Changes to the variable are reflected in real-time)
 *
 *   <!PsensorL:X>
 *     ・The front X tiles of the searcher are in range, but
 *       if you prefix it with !, it will be in a temporary search-disabled state.
 *
 *     ・In this state, the search will not start at the time of the "Search Start" plugin command,
 *       and you need to start the search individually using either
 *         the "Target Searcher's Search Start" plugin command or
 *         the script command $gameSystem.onSensor(eventId).
 *
 *
 * Option Settings in the Memo Field (Each option is separated by a space):
 *     ・Each option should be separated by a space.
 *     ・If not specified, the default settings will be applied.
 *
 *   Sw[Number or A~D]
 *     ・Specify the switch number or self-switch to turn on when the searcher detects the player.
 *
 *     ・The switch that turns on when the player is lost will automatically turn off when the player is detected.
 *
 *     Examples:
 *       Sw10 : Turns on switch number 10.
 *       SwC  : Turns on the searcher's self-switch C.
 *
 *   Bo[0~1 or \S[n]]
 *     ・Do not consider (0) or consider (1) the searcher's adjacent tiles as the search range.
 *       If 1, the left and right tiles of the searcher become the search range.
 *
 *     ・\S[n] is the control character to get the state of the switch.
 *       N can be a number or an alphabet A~D (A~D are self-switches).
 *       The state of switch N being ON is equivalent to specifying 1.
 *
 *   Rv[0~1 or \S[n]]
 *     ・Do not draw (0) or draw (1) the visibility range of the searcher.
 *       If 0, the visibility range of the searcher is not drawn on the screen.
 *       (It just visually disappears, but the search is still performed)
 *
 *     ・\S[n] is the control character to get the state of the switch.
 *       N can be a number or an alphabet A~D (A~D are self-switches).
 *       The state of switch N being ON is equivalent to specifying 1.
 *
 *   Td[0 or 1 or \S[n]]
 *     ・Do not consider (0) or consider (1) the passability status of the terrain/events
 *       within the visibility range for the calculation of the visibility range.
 *       If 1, the visibility range will change if there is an impassable tile within the visibility range.
 *
 *     ・If considering the passability status of the terrain,
 *       impassable tiles will not be the target of the visibility range,
 *       and the tiles that become blind spots due to the presence of impassable tiles
 *       when viewed from the searcher will also not be targets of the visual range.
 *
 *     ・\S[n] is the control character to get the state of the switch.
 *       N can be a number or an alphabet A~D (A~D are self-switches).
 *       The state of switch N being ON is equivalent to specifying 1.
 *
 *   Di[U,R,L,D (any one character)]
 *     ・Ignore the direction of the searcher and fix the search direction.
 *       U for up, R for right, L for left, and D for down.
 *
 *   Ev[0 or 1 or \S[n]]
 *     ・Whether the searcher's visibility range is affected by impassable events
 *       (with the same priority as "Same as Characters") on the map (1) or not (0).
 *       If 1, the visibility range will change if there is an impassable map event within the visibility range.
 *
 *     ・If specifying an image for the event from [Tileset B] onward
 *       and the priority of the event is set to "Below characters", the passability settings of the tileset
 *       will affect the visibility range, and if the tileset is set as impassable, it will be outside the visibility range.
 *
 *     ・This setting is ignored if the setting is for not considering the passability status within the visibility range.
 *
 *   Rg[Region number or \V[n]]
 *     ・If specified, the visibility range of the searcher is affected by region tiles on the map.
 *       For example, specifying 1 will treat tiles with region number 1 as walls,
 *       and they will be outside the visibility range.
 *
 *     ・This setting is ignored if the setting is for not considering the passability status within the visibility range.
 *
 *   Fb[Balloon number or \V[n]]
 *     ・If specified, when the searcher detects the player,
 *       a balloon will be displayed above the searcher with the specified balloon number.
 *
 *   Fc[Common event number or \V[n]]
 *     ・If specified, when the searcher detects the player,
 *       the specified common event will be executed.
 *
 *   Fd[Delay frames or \V[n]]
 *     ・If specified, the time it takes for the searcher to detect the player
 *       will be delayed by the specified number of frames.
 *
 *   Lb[Balloon number or \V[n]]
 *     ・If specified, when the searcher loses the player,
 *       a balloon will be displayed above the searcher with the specified balloon number.
 *
 *   Lc[Common event number or \V[n]]
 *     ・If specified, when the searcher loses the player,
 *       the specified common event will be executed.
 *
 *   Ld[Delay frames or \V[n]]
 *     ・If specified, the time it takes for the searcher to lose the player
 *       will be delayed by the specified number of frames.
 *
 *   Am[0 or 1 or \S[n]]
 *     ・Whether to continue (1) or not continue (0) the search process of the searcher
 *       with this option set, while an event running with auto-execution is in progress.
 *       The default is 0.
 *
 *     ・If continuing the search, the determination of whether the player is in the visibility range
 *       will be made even when an auto-execution event is in progress.
 *       (Only if the target searcher is in the search start state)
 *
 *     ・Searchers with this option set to 1 will continue searching constantly,
 *       so be careful as it may increase the game operation load.
 *       Please set it carefully.
 *
 *   Lsw[Number or A~D]
 *     ・Specify the switch number or self-switch to turn on when the searcher loses the player.
 *
 *     ・The switch that turns on when the player is detected will automatically turn off when the player is lost.
 *
 *     Examples:
 *       Lsw11 : Turns on switch number 11.
 *       LswB  : Turns on the searcher's self-switch B.
 *
 *
 * Memo Field Setting Examples:
 *   <PsensorL:7>
 *     ・Search in front of the searcher for a range of 7 tiles.
 *
 *   <PsensorF:3>
 *     ・Search within the triangular area formed by connecting points
 *       3 tiles in front of and 3 tiles to the left and right of the searcher's vertex.
 *
 *   <PsensorL:\V[100]>
 *     ・Search in front of the searcher for a range specified by [Variable number 100].
 *
 *   <PsensorL:4 SwC>
 *     ・Search in front of the searcher for a range of 4 tiles.
 *       Turn on the searcher's self-switch C when the player is detected.
 *
 *   <PsensorF:5 Bo1>
 *     ・Search within the triangular area formed by connecting points
 *       3 tiles in front and 3 tiles to the left and right of the searcher.
 *
 *     ・Additionally, consider the searcher's adjacent tiles as the search range.
 *
 *   <PsensorL:10 Rv0>
 *     ・Search in front of the searcher for a range of 10 tiles,
 *       but do not draw the visibility range.
 *
 *   <PsensorL:10 Rv\s[20]>
 *     ・Search in front of the searcher for a range of 10 tiles.
 *
 *     ・Do not draw the visibility range if the state of switch number 20 is OFF.
 *
 *   <PsensorL:10 Td0>
 *     ・Search in front of the searcher for a range of 10 tiles,
 *       but do not consider the passability status within the visibility range.
 *
 *   <PsensorL:10 Td\s[A]>
 *     ・Search in front of the searcher for a range of 10 tiles.
 *
 *     ・Do not consider the passability status within the visibility range
 *       if the state of self-switch A is OFF.
 *
 *   <PsensorF:&2 Bo0 Sw1>
 *     ・Search within the triangular area formed by connecting points
 *       3 tiles in front and 3 tiles to the left and right of the searcher's vertex.
 *
 *     ・Additionally, do not consider the searcher's adjacent tiles as the search range.
 *
 *     ・Turn on switch number 1 when the player is detected.
 *
 *   <PsensorL:7 DiR>
 *     ・Search in front of the right side of the searcher for a range of 7 tiles.
 *
 *   <PsensorF:7 DiU>
 *     ・Search within the triangular area formed by connecting points
 *       3 tiles above and 3 tiles to the left and right of the searcher's vertex.
 *
 *   <PsensorL:10 Ev1 Rg10>
 *     ・Search in front of the searcher for a range of 10 tiles.
 *
 *     ・Consider the presence of impassable map events within the visibility range.
 *       Additionally, recognize tiles with region number 10 as walls.
 *
 *
/* Plugin Commands:
 *   Search Start
 *     ・All searchers on the map where the command is executed will enter the search start process.
 *       (Searchers in a temporarily disabled state are excluded)
 *
 *   Force Search Start
 *     ・All searchers on the map where the command is executed will enter the search start process.
 *       (Searchers in a temporarily disabled state are also included)
 *
 *   Search Stop
 *     ・All searchers on the map where the command is executed will enter the search stop process.
 *       (The state will be updated as the player not found.)
 *
 *   Initialize Switches of All Searchers
 *     ・Targets all searchers on the map where the command is executed.
 *       Turns off the (self) switch specified in the plugin parameter [After Discovery Control Switch],
 *       or the (self) switch specified in the Sw option.
 *       (Settings in the Sw option take precedence)
 *
 *     ・Also, turns off the (self) switch specified after the reset.
 *       (X, Y are self-switch/switch numbers.
 *        Specify them with space separation)
 *
 *   Initialize Switches of Target Searcher
 *     ・Targets the searcher that executed this command.
 *       Turns off the (self) switch specified in the plugin parameter [After Discovery Control Switch],
 *       or the (self) switch specified in the Sw option in the memo field.
 *       (Settings in the memo field take precedence)
 *
 *     ・"X", "Y" represent (self) switches, and the specified (self) switches here
 *       are also turned off. Specify if you want to turn off multiple switches at once.
 *       (Self-switch/switch numbers are separated by commas)
 *
 *   Force Lose for All Searchers
 *     ・Forces all searchers on the map in the player-detected state to transition to the lost state.
 *
 *   Force Lose for Target Searcher
 *     ・Forces the searcher that executed this command in the player-detected state to transition to the lost state.
 *
 *   Start Search for Target Searcher
 *     ・Puts the searcher that executed this command in the search start state.
 *
 *     ・To actually perform the search, the execution of the "Search Start" command
 *       (or "Force Search Start") is required beforehand.
 *
 *   Stop Search for Target Searcher
 *     ・Puts the searcher that executed this command in the search stop state.
 *       (The state will be updated as the player not found.)
 *
 *   Move Target Searcher
 *     ・Moves the event that executed this command to a position adjacent to the player's position at the time of execution.
 *
 *     ・X is the movement speed. It corresponds to 1-6,
 *       and if not specified, it uses the speed set for the event.
 *
 *     ・If the plugin parameter [Consider Impassable Tiles] is OFF or
 *       the Td option in the memo field is 0,
 *       it may not move correctly. (Enabling event through is necessary for movement)
 *
 *
 * Script Commands:
 *   $gameSystem.getEventSensorStatus(eventId)
 *     ・Gets the search status for the searcher with the specified event ID.
 *       [Return Value] | [Meaning]
 *          -1    | Search temporarily disabled state
 *           0    | Search stop state
 *           1    | Search execution state
 *
 *   $gameSystem.onSensor(eventId)
 *     ・Puts the searcher with the specified event ID in the search start state.
 *       Used to resume searching for searchers in the search stop/temporarily disabled state.
 *
 *     ・To start the search, the execution of the "Search Start" ("Force Search Start") command
 *       is required beforehand.
 *
 *   $gameSystem.offSensor(eventId)
 *     ・Puts the searcher with the specified event ID in the search stop state.
 *       (The state will be updated as the player not found.)
 *
 *   $gameSystem.neutralSensor(eventId, ["X", "Y", ...])
 *     ・For searchers with the specified event ID currently on the map,
 *       turns off either the (self) switch specified in the plugin parameter [After Discovery Control Switch]
 *       or the (self) switch specified in the Sw option in the memo field. (Settings in the memo field take precedence)
 *
 *     ・"X", "Y" represent (self) switches, and the specified (self) switches here
 *       are also turned off. Specify if you want to turn off multiple switches at once.
 *       (Specify with comma separation)
 *
 *   $gameSystem.isFoundPlayer()
 *     ・Returns true if the player is detected by searchers on the current map.
 *       (Otherwise, returns false)
 *
 *   $gameSystem.allForceLost()
 *     ・Forces all searchers on the current map in the player-detected state to transition to the lost state.
 *
 *   $gameSystem.forceLost(eventId)
 *     ・If the searcher with the specified event ID is in the player-detected state,
 *       forces it to transition to the lost state.
 *
 *
 * Notes:
 *   ・Settings in the memo field, plugin commands, and script commands related to this plugin
 *     do not distinguish between uppercase and lowercase letters.
 *
 *   ・For plugin parameters marked with [Default], individual settings are possible in the memo field.
 *     If set, the memo field settings take precedence over [Default], so please be careful.
 *
 *   ・For plugin parameters marked with [Variable], you can use the control character \V[n]
 *     representing a variable in the setting value. If you set a variable, its value is
 *     referenced when using that parameter, allowing you to change the parameter setting during the game.
 *
 *   ・For plugin parameters marked with [Switch], you can use the control character \S[n]
 *     representing a switch with a numerical value N. If you set a switch, its value is
 *     referenced when using that parameter, allowing you to change the parameter setting during the game.
 *
 *
 * @param Search Settings
 * @default ====================================
 *
 * @param Sensor_Switch
 * @text Switch after Discovery
 * @desc [Default] Specify the switch number or self-switch to turn ON when the player is discovered.
 * (Switch after loss will be turned OFF)
 * @type combo
 * @option A
 * @option B
 * @option C
 * @option D
 * @default D
 * @parent Search Settings
 *
 * @param Lost_Sensor_Switch
 * @text Switch after Loss
 * @desc [Default] Specify the switch number or self-switch to turn ON when the player is lost.
 * (Switch after discovery will be turned OFF)
 * @type combo
 * @option A
 * @option B
 * @option C
 * @option D
 * @default
 * @parent Search Settings
 *
 * @param Both_Sensor
 * @text Range Both Sides
 * @desc Setting to include both sides of the explorer in the search range.
 * (Default: Do not include in the search range)
 * @type boolean
 * @on Include in the search range
 * @off Do not include in the search range
 * @default false
 * @parent Search Settings
 *
 * @param Terrain_Decision
 * @text Consideration of Impassable Tiles
 * @desc Setting to consider the presence of impassable tiles in the line of sight range.
 * (Default: Consider)
 * @type boolean
 * @on Consider
 * @off Do not consider
 * @default true
 * @parent Search Settings
 *
 * @param Auto_Sensor
 * @text Automatic Search Start
 * @desc Setting to automatically start the search process when the map is drawn.
 * (Default: Do not start)
 * @type boolean
 * @on Start
 * @off Do not start
 * @default false
 * @parent Search Settings
 *
 * @param Event_Decision
 * @text Consideration of Other Events
 * @desc Setting to consider the presence of map events in the line of sight range.
 * (Default: Do not consider)
 * @type boolean
 * @on Consider
 * @off Do not consider
 * @default false
 * @parent Search Settings
 *
 * @param Region_Decision
 * @text Region Setting
 * @desc [Default: Variable] Specify the region number to treat as out of sight range (treated as a wall).
 * @type string[]
 * @default []
 * @parent Search Settings
 *
 * @param Real_Range_X
 * @text Search Range X Extension
 * @desc Extends the search range horizontally by the specified value (visual range is in tile units).
 * Effective when the player moves in pixel units. (Default: 0)
 * @type number
 * @decimals 3
 * @max 0.999
 * @min 0.000
 * @default 0.000
 * @parent Search Settings
 *
 * @param Real_Range_Y
 * @text Search Range Y Extension
 * @desc Extends the search range vertically by the specified value (visual range is in tile units).
 * Effective when the player moves in pixel units. (Default: 0)
 * @type number
 * @decimals 3
 * @max 0.999
 * @min 0.000
 * @default 0.000
 * @parent Search Settings
 *
 * @param Sight Settings
 * @default ====================================
 *
 * @param Range_Visible
 * @text Display Sight Range
 * @desc Setting to display the explorer's sight range.
 * (Default: Display)
 * @type boolean
 * @on Display
 * @off Do not display
 * @default true
 * @parent Sight Settings
 *
 * @param Range_Color
 * @text Sight Range Color
 * @desc Select the color to use when displaying the sight range.
 * (Default: White)
 * @type select
 * @option White
 * @value white
 * @option Red
 * @value red
 * @option Blue
 * @value blue
 * @option Yellow
 * @value yellow
 * @default white
 * @parent Sight Settings
 *
 * @param Range_Opacity
 * @text Sight Range Opacity
 * @desc Specify the opacity when displaying the sight range as a number (0-255).
 * Default: 80
 * @type number
 * @min 0
 * @max 255
 * @default 80
 * @parent Sight Settings
 *
 * @param Range_Position
 * @text Sight Range Position
 * @desc Select where to display the explorer's sight range.
 * Default: 1 (Display above the event)
 * @type select
 * @option Display above the event
 * @value 1
 * @option Display below the event
 * @value 2
 * @default 1
 * @parent Sight Settings
 *
 * @param Player_Found
 * @text Player Detection Settings
 * @desc Settings when the explorer detects the player.
 * @type struct<Alert>
 * @default {"Ballon":"0","Se":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Common_Event":"0","Delay":"0"}
 *
 * @param Player_Lost
 * @text Player Loss Settings
 * @desc Settings when the explorer loses track of the player.
 * @type struct<Alert>
 * @default {"Ballon":"0","Se":"{\"Name\":\"\",\"Volume\":\"90\",\"Pitch\":\"100\",\"Pan\":\"0\"}","Common_Event":"0","Delay":"0"}
 *
 * @param Map Settings
 * @default ====================================
 *
 * @param Tracking_Priority
 * @text Tracking Priority
 * @desc Sets whether the event in a player-detected state can pass over or under other events.
 * (Default: Cannot pass)
 * @type boolean
 * @on Can pass
 * @off Cannot pass
 * @default false
 * @parent Map Settings
 *
 * @param Follower_Through
 * @text Ignore Followers
 * @desc Sets whether the event in a player-detected state can pass through the player's followers (party members).
 * (Default: Cannot pass through)
 * @type boolean
 * @on Can pass through
 * @off Cannot pass through
 * @default false
 * @parent Map Settings
 *
 * @param Location_Reset
 * @text Reset on Map Move
 * @desc Sets whether to reset the tracking state of explorers placed on the original map when using the "Transfer Player" command.
 * (Default: Do not reset)
 * @type boolean
 * @on Reset
 * @off Do not reset
 * @default false
 * @parent Map Settings
 *
 * @command start
 * @text Start Search
 * @desc Starts the search.
 *
 * @command force_start
 * @text Force Start Search
 * @desc Forcibly starts the search.
 *
 * @command stop
 * @text Stop Search
 * @desc Stops the search.
 *
 * @command reset
 * @text Reset Switches for All Explorers
 * @desc Initializes the (self) switches for all explorers.
 *
 * @arg sw_ids
 * @type switch[]
 * @text Switch IDs
 * @desc Set switch IDs.
 * @parent Database
 *
 * @arg slfsw_ids
 * @type select[]
 * @text Self-Switch IDs
 * @desc Set self-switch IDs.
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 *
 * @command t_reset
 * @text Reset Switches for Target Explorer
 * @desc Initializes the (self) switches for the target explorer.
 *
 * @arg sw_ids
 * @type switch[]
 * @text Switch IDs
 * @desc Set switch IDs.
 * @parent Database
 *
 * @arg slfsw_ids
 * @type select[]
 * @text Self-Switch IDs
 * @desc Set self-switch IDs.
 * @option A
 * @value A
 * @option B
 * @value B
 * @option C
 * @value C
 * @option D
 * @value D
 *
 * @command lost
 * @text Force Lost for All Explorers
 * @desc Forces all explorers in a player-detected state into a forced lost state.
 *
 * @command t_lost
 * @text Force Lost for Target Explorer
 * @desc Forces the target explorer in a player-detected state into a forced lost state.
 *
 * @command t_start
 * @text Start Search for Target Explorer
 * @desc Sets the target explorer to the search start state.
 *
 * @command t_stop
 * @text Stop Search for Target Explorer
 * @desc Sets the target explorer to the search stop state.
 *
 * @command t_move
 * @text Move Target Explorer
 * @desc Moves the target explorer to a position near the player.
 *
 * @arg speed
 * @type number
 * @text Movement Speed
 * @desc Set the movement speed.
 * @min 1
 * @max 6
 * @default 1
 *
 */
/*~struct~Alert:
 *
 * @param Ballon
 * @text [Default] Balloon Display
 * @desc Specify the icon number to display the balloon for the explorer. Default: Do not display
 * @type select
 * @option Do not display
 * @value 0
 * @option Surprise
 * @value 1
 * @option Question Mark
 * @value 2
 * @option Music Note
 * @value 3
 * @option Heart
 * @value 4
 * @option Anger
 * @value 5
 * @option Sweat
 * @value 6
 * @option Crumple
 * @value 7
 * @option Silence
 * @value 8
 * @option Light Bulb
 * @value 9
 * @option Zzz
 * @value 10
 * @option User-defined 1
 * @value 11
 * @option User-defined 2
 * @value 12
 * @option User-defined 3
 * @value 13
 * @option User-defined 4
 * @value 14
 * @option User-defined 5
 * @value 15
 * @default 0
 *
 * @param Se
 * @text SE Settings
 * @desc Settings related to SE.
 * @type struct<Se>
 *
 * @param Common_Event
 * @text [Default] Common Execution
 * @desc Specify the common event to execute. Default: 0 (None)
 * @type common_event
 * @default 0
 *
 * @param Delay
 * @text [Default] State Transition Delay
 * @desc Delays the timing of transitioning to the player detection/loss state by the specified number of frames (60 frames = 1 second). Default: 0
 * @type number
 * @min 0
 * @default 0
 *
 */
/*~struct~Se:
 *
 * @param Name
 * @text File Name
 * @desc Specify the file to play. Default: Empty (do not play)
 * @type file
 * @require 1
 * @dir audio/se
 *
 * @param Volume
 * @text Volume during Playback
 * @desc Specify the volume when playing the file (numeric value from 0 to 100). Default: 90
 * @type number
 * @max 100
 * @min 0
 * @default 90
 *
 * @param Pitch
 * @text Playback Pitch
 * @desc Specify the pitch when playing the file (numeric value from 50 to 150). Default: 100
 * @type number
 * @max 150
 * @min 50
 * @default 100
 *
 * @param Pan
 * @text Playback Pan
 * @desc Specify the pan when playing the file (numeric value from -100 to 100). Default: 0
 * @type number
 * @max 100
 * @min -100
 * @default 0
 *
 */

(() => {

    const PNAME = "ARTM_PlayerSensorMZ";
    const CheckParam = function(type, name, value, def, min, max, options) {
        if (min === undefined || min === null) {
            min = -Infinity;
        }
        if (max === undefined || max === null) {
            max = Infinity;
        }
        if (value === null) {
            value = "";
        } else {
            value = String(value);
        }
        const regExp = /^\x1bV\[\d+\]|\x1bS\[\d+\]$/i;
        value = value.replace(/\\/g, '\x1b');
        value = value.replace(/\x1b\x1b/g, '\\');
        if (!regExp.test(value)) {
            switch (type) {
                case "bool":
                    if (value === "") {
                        value = def ? true : false;
                    } else {
                        value =
                            value.toUpperCase() === "ON" ||
                            value.toUpperCase() === "TRUE" ||
                            value.toUpperCase() === "1";
                    }
                    break;
                case "num":
                    if (value === "") {
                        value = isFinite(def) ? parseInt(def, 10) : 0;
                    } else {
                        value =
                            isFinite(value) ?
                            parseInt(value, 10) :
                            isFinite(def) ? parseInt(def, 10) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                case "float":
                    if (value === "") {
                        value = isFinite(def) ? parseFloat(def) : 0;
                    } else {
                        value =
                            isFinite(value) ?
                            parseFloat(value) :
                            isFinite(def) ? parseFloat(def) : 0;
                        value = value.clamp(min, max);
                    }
                    break;
                case "string":
                    if (value === "") {
                        value = def !== "" ? def : value;
                    }
                    break;
                case "switch":
                    if (value === "") {
                        value = def !== "" ? def : value;
                    }
                    if (name === "Lost_Sensor_Switch" && (
                        value === null || value === undefined)) {
                         value = "";
                    }
                    if (name !== "Lost_Sensor_Switch" &&
                        !value.match(/^([A-D]|\d+)$/i)) {
                         const msbErr = "Plugin parameter value is not switch : "
                         throw new Error(msbErr + name + " : "+value);
                    }
                    break;
                default:
                    const msbErrs = ["[CheckParam] ", "The type is invalid: "];
                    throw new Error(msbErrs[0] + name + msbErrs[1]  + type);
            }
        }
        return [value, type, def, min, max];
    };

    const CEC = function(params) {
        const text = (param => {
            let t = String(param);
            t = t.replace(/\\/g, '\x1b');
            t = t.replace(/\x1b\x1b/g, '\\');
            return convertEscapeCharacters(t);
        })(params[0]);
        const type = params[1];
        const def = params[2];
        const min = params[3];
        const max = params[4];
        let value;
        switch (type) {
            case "bool":
                value = CEC_bool(text, def, min, max);
                break;
            case "num":
                value = CEC_num(text, def, min, max);
                break;
            case "float":
                value = CEC_float(text, def, min, max);
                break;
            case "string":
                value = CEC_string(text, def, min, max);
                break;
            case "switch":
                value = CEC_switch(text, def, min, max);
                break;
            default:
                const msbErr = "[CEC] Plugin parameter type is illegal: ";
                throw new Error(msbErr + type);
        }
        return value;
    };

    function CEC_bool(text, def, min, max) {
       if (text === "") {
           return def ? true : false;
        } else {
            return (
                text === true ||
                text.toUpperCase() === "ON" ||
                text.toUpperCase() === "TRUE" ||
                text.toUpperCase() === "1"
            );
        }
    }

    function CEC_num(text, def, min, max) {
        return (
            (isFinite(text) ? parseInt(text, 10) :
             isFinite(def) ? parseInt(def, 10) : 0
            ).clamp(min, max)
        );
    }

    function CEC_float(text, def, min, max) {
        return (
            (isFinite(text) ? parseFloat(text) :
            isFinite(def) ? parseFloat(def) : 0
            ).clamp(min, max)
        );
    }

    function CEC_string(text, def, min, max) {
        if (text === "") {
            return def !== "" ? def : value;
        } else {
            return text;
        }
    }

    function CEC_switch(text, def, min, max) {
        if (value === "") {
            return def !== "" ? def : value;
        }
        if (!value.match(/^([A-D]|\d+)$/)) {
            const msbErr = "Plugin parameter value is not switch : ";
            throw new Error(msbErr + value);
        }
    }

    const convertEscapeCharacters = function(text) {
        if (typeof text !== "string") {
            return text;
        }
        const scene = SceneManager._scene;
        if (scene && scene._windowLayer) {
             const windowChild = scene._windowLayer.children[0];
             return (
                 windowChild ?
                 windowChild.convertEscapeCharacters(text) :
                 text
             );
        } else {
            return ConvVb(text);
        }
    };

    const ConvVb = function(text) {
        const regExp = /^\x1bV\[(\d+)\]$/i;
        if (typeof text === "string") {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1b\x1b/g, '\\');
            text = text.replace(regExp, function() {
                const num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            });
            text = text.replace(regExp, function() {
                const num = parseInt(arguments[1]);
                return $gameVariables.value(num);
            });
        }
        return text;
    };

    const ConvSw = function(text, target) {
        const regExp = /^\x1bV\[\d+\]$|^\x1bS\[\d+\]$/i;
        if (typeof text === "string") {
            text = text.replace(/\\/g, '\x1b');
            text = text.replace(/\x1b\x1b/g, '\\');
            text = text.replace(/\x1bS\[(\d+)\]/i, function() {
                const num = parseInt(arguments[1]);
                return $gameSwitches.value(num);
            });
            text = text.replace(/\x1bS\[([A-D])\]/i, function() {
                if (target) {
                    const key = [target._mapId, target._eventId,
                                 arguments[1].toUpperCase()];
                    return $gameSelfSwitches.value(key);
                }
                return false;
            });
            if (text === true ||
               text.toLowerCase() === "true" ||
               text === "1") {
                text = 1;
            } else {
                text = 0;
            }
        }
        return text;
    };

    const paramParse = function(obj) {
        return JSON.parse(JSON.stringify(obj, paramReplace));
    };

    const paramReplace = function(key, value) {
        try {
            return JSON.parse(value || null);
        } catch (e) {
            return value;
        }
    };

    const Parameters = paramParse(PluginManager.parameters(PNAME));
    let DIR_UP, DIR_DOWN, DIR_RIGHT, DIR_LEFT,
        DefSensorSwitch, DefBothSensor, DefRangeVisible,
        DefTerrainDecision, DefRangeColor, DefRangeOpacity,
        DefAutoSensor, DefEventDecision, DefRegionDecisions,
        DefRealRangeX, DefRealRangeY, DefLostSensorSwitch,
        DefFoundBallon, DefFoundCommon, DefFoundDelay, DefFoundSe,
        DefLostBallon, DefLostCommon, DefLostDelay, DefLostSe,
        DefRangePosition, DefTrackingPriority, DefFollowerThrough, DefLocationReset;
    DefSensorSwitch = CheckParam("switch", "Sensor_Switch", Parameters["Sensor_Switch"], "D");
    DefLostSensorSwitch = CheckParam("switch", "Lost_Sensor_Switch", Parameters["Lost_Sensor_Switch"]);
    DefBothSensor = CheckParam("bool", "Both_Sensor", Parameters["Both_Sensor"], false);
    DefRangeVisible = CheckParam("bool", "Range_Visible", Parameters["Range_Visible"], true);
    DefTerrainDecision = CheckParam("bool", "Terrain_Decision", Parameters["Terrain_Decision"], false);
    DefRangeColor = CheckParam("string", "Range_Color", Parameters["Range_Color"], "white");
    DefRangeOpacity = CheckParam("num", "Range_Opacity", Parameters["Range_Opacity"], 80, 0, 255);
    DefRangePosition = CheckParam("num", "Range_Position", Parameters["Range_Position"], 1);
    DefAutoSensor = CheckParam("bool", "Auto_Sensor", Parameters["Auto_Sensor"], false);
    DefEventDecision = CheckParam("bool", "Event_Decision", Parameters["Event_Decision"], false);
    DefRegionDecisions = [];
    Parameters["Region_Decision"].forEach(function(region) {
        DefRegionDecisions.push(CheckParam("string", "Region_Decision", region, 0));
    });
    DefRealRangeX = CheckParam("float", "Real_Range_X", Parameters["Real_Range_X"], 0.000, 0.000, 0.999);
    DefRealRangeY = CheckParam("float", "Real_Range_Y", Parameters["Real_Range_Y"], 0.000, 0.000, 0.999);
    DefFoundBallon = CheckParam("num", "Player_Found.Ballon", Parameters["Player_Found"]["Ballon"], 0, 0);
    DefFoundCommon = CheckParam("num", "Player_Found.Common_Event", Parameters["Player_Found"]["Common_Event"], 0, 0);
    DefFoundDelay = CheckParam("num", "Player_Found.Delay", Parameters["Player_Found"]["Delay"], 0, 0);
    DefFoundSe = {
        "name" : CheckParam("string", "Player_Found.Se.Name", Parameters["Player_Found"]["Se"]["Name"], "")[0],
        "volume" : CheckParam("num", "Player_Found.Se.Volume", Parameters["Player_Found"]["Se"]["Volume"], 90, 0, 100)[0],
        "pitch" : CheckParam("num", "Player_Found.Se.Pitch", Parameters["Player_Found"]["Se"]["Pitch"], 100, 50, 150)[0],
        "pan" : CheckParam("num", "Player_Found.Se.Pan", Parameters["Player_Found"]["Se"]["Pan"], 0, -100, 100)[0],
    }
    DefLostBallon = CheckParam("num", "Player_Lost.Ballon", Parameters["Player_Lost"]["Ballon"], 0, 0);
    DefLostCommon = CheckParam("num", "Player_Lost.Common_Event", Parameters["Player_Lost"]["Common_Event"], 0, 0);
    DefLostDelay = CheckParam("num", "Player_Lost.Delay", Parameters["Player_Lost"]["Delay"], 0, 0);
    DefLostSe = {
        "name" : CheckParam("string", "Player_Lost.Se.Name", Parameters["Player_Lost"]["Se"]["Name"], "")[0],
        "volume" : CheckParam("num", "Player_Lost.Se.Volume", Parameters["Player_Lost"]["Se"]["Volume"], 90, 0, 100)[0],
        "pitch" : CheckParam("num", "Player_Lost.Se.Pitch", Parameters["Player_Lost"]["Se"]["Pitch"], 100, 50, 150)[0],
        "pan" : CheckParam("num", "Player_Lost.Se.Pan", Parameters["Player_Lost"]["Se"]["Pan"], 0, -100, 100)[0],
    }
    DefTrackingPriority = CheckParam("bool", "Tracking_Priority", Parameters["Tracking_Priority"], false);
    DefFollowerThrough = CheckParam("bool", "Follower_Through", Parameters["Follower_Through"], false);
    DefLocationReset = CheckParam("bool", "Location_Reset", Parameters["Location_Reset"], false);

    DIR_UP = 8;
    DIR_DOWN = 2;
    DIR_RIGHT = 6;
    DIR_LEFT = 4;

    //=========================================================================
    //  Define the player search control plugin command.
    //=========================================================================
    function _eventId() {
        return $gameTemp.getEventId_MKR() || 0;
    }

    function toAryArgs(args) {
        return args.replace(/(\[|\"|\])/g, "").split(",");
    }

    // Start search.
    PluginManager.registerCommand(PNAME, "start", args => {
        $gameSystem.startSensor();
    });

    // Force start search.
    PluginManager.registerCommand(PNAME, "force_start", args => {
        $gameSystem.startSensor(1);
    });

    // Stop search.
    PluginManager.registerCommand(PNAME, "stop", args => {
        $gameSystem.stopSensor();
    });

    // Initialize switches for all searchers.
    PluginManager.registerCommand(PNAME, "reset", args => {
        const sw_ids = toAryArgs(args.sw_ids);
        const slfsw_ids = toAryArgs(args.slfsw_ids);
        $gameSystem.resetSensor([...sw_ids, ...slfsw_ids]);
    });

    // Initialize switches for the target searcher.
    PluginManager.registerCommand(PNAME, "t_reset", args => {
        const sw_ids = toAryArgs(args.sw_ids);
        const slfsw_ids = toAryArgs(args.slfsw_ids);
        $gameSystem.neutralSensor(_eventId(), [...sw_ids, ...slfsw_ids]);
    });

    // Force all searchers into a lost state.
    PluginManager.registerCommand(PNAME, "lost", args => {
        $gameSystem.allForceLost();
    });

    // Force the targeted searcher into a lost state.
    PluginManager.registerCommand(PNAME, "t_lost", args => {
        $gameSystem.forceLost(_eventId());
    });

    // Initiate the search for the targeted searcher.
    PluginManager.registerCommand(PNAME, "t_start", args => {
        $gameSystem.onSensor(_eventId());
    });

    // Halt the search for the targeted searcher.
    PluginManager.registerCommand(PNAME, "t_stop", args => {
        $gameSystem.offSensor(_eventId());
    });

    // Move the targeted searcher to the vicinity of the player's position.
    PluginManager.registerCommand(PNAME, "t_move", args => {
        $gameMap._interpreter.moveNearPlayer(args[0]);
    });

    //=========================================================================
    // Game_Temp
    //  Define exclusive processing for RPG Maker MZ.
    //=========================================================================
    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);
        this._eventId_MKR = 0;
    };

    Game_Temp.prototype.getEventId_MKR = function() {
        return this._eventId_MKR;
    };

    Game_Temp.prototype.setEventId_MKR = function(eventId) {
        if (this.getEventId_MKR() !== eventId) {
            this._eventId_MKR = eventId;
        }
    };

    //=========================================================================
    // Game_Interpreter
    //  Define a command to move the event near the player.
    //=========================================================================
    Game_Interpreter.prototype.moveNearPlayer = function(speed) {
        const event = $gameMap.event(this._eventId);
        const oldSpeed = event.moveSpeed();
        const sx = Math.abs(event.deltaXFrom($gamePlayer.x));
        const sy = Math.abs(event.deltaYFrom($gamePlayer.y));
        const list = [];
        let newSpeed = oldSpeed;
        if (event) {
            // Movement speed setting
            if (speed && isFinite(speed) && speed > 0) {
                newSpeed = parseInt(speed, 10);
            }
            // Movement route setting
            list.push({"code":29,"parameters":[newSpeed]}, {"code":25})
            for (let i = 1; i < sx + sy; i++) {
                list.push({"code":10});
            }
            list.push({"code":25}, {"code":29,"parameters":[oldSpeed]}, {"code":0});
            // Start movement
            this.setWaitMode('route');
            event.forceMoveRoute({
                "list":list,
                "repeat":false,
                "skippable":true,
                "wait":true
            });
        }
    };

    Game_Interpreter.prototype.setupReservedCommonEventEx = function(eventId) {
        if ($gameTemp.isCommonEventReserved()) {
            this.setup($gameTemp.reservedCommonEvent().list, eventId);
            $gameTemp.clearCommonEvent();
            return true;
        } else {
            return false;
        }
    };

    const _Game_Interpreter_setup = Game_Interpreter.prototype.setup;
    Game_Interpreter.prototype.setup = function(list, eventId) {
        _Game_Interpreter_setup.call(this, list, eventId);
        $gameTemp.setEventId_MKR(eventId);
    };

    const _Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
    Game_Interpreter.prototype.executeCommand = function() {
        $gameTemp.setEventId_MKR(this.eventId());
        return _Game_Interpreter_executeCommand.call(this);
    };

    //=========================================================================
    // Game_System
    //  Define player search control plugin command.
    //=========================================================================
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function(){
        _Game_System_initialize.call(this);
        this._sensorStart = false
        this._switchStatuses  = {};
    };

    Game_System.prototype.startSensor = function(type) {
        this.setSensorStart(true);
        this.setSensorStatusAll(1, type || 0);
        this.setViewRangeStatusAll(2);
    };

    Game_System.prototype.stopSensor = function() {
        this.setSensorStart(false);
        this.setSensorStatusAll(0);
        this.setViewRangeStatusAll(0);
    };

    Game_System.prototype.resetSensor = function(args) {
        $gameMap.events().forEach(function(event) {
            if (event.getSensorType() !== null) {
                $gameSystem.neutralSensor(event.eventId(), args)
            }
        }, this);
    };

    Game_System.prototype.onSensor = function(eventId) {
        const event = $gameMap.event(eventId);
        if (event && event.getSensorType() !== null) {
            event.setSensorStatus(1);
        }
    };

    Game_System.prototype.offSensor = function(eventId) {
        const event = $gameMap.event(eventId);
        if (event && event.getSensorType() !== null) {
            event.setSensorStatus(0);
            event.setFoundStatus(0);
        }
    };

    Game_System.prototype.neutralSensor = function(eventId, args) {
        const mapId = $gameMap.mapId();
        const event = $gameMap.event(eventId);
        const switches = args && args.length >= 2 ? args.slice(1) : [];
        sensorSwitch = DefSensorSwitch[0];
        if (!event) return;
        if (event.getSensorType() !== null) {
            const sw =
                event.getSensorSwitch() !== null ?
                event.getSensorSwitch() : sensorSwitch;
            switches.push(sw);
            switches.forEach(function(sw) {
                if (isFinite(sw)) {
                    $gameSwitches.setValue(sw, false);
                } else if (sw.match(/[a-dA-D]/)) {
                    $gameSelfSwitches.setValue([
                        mapId, eventId, sw.toUpperCase()
                    ], false);
                }
            }, this)
        }
    };

    Game_System.prototype.isSensorStart = function() {
        return this._sensorStart;
    };

    Game_System.prototype.setSensorStart = function(sensorStart) {
        this._sensorStart = sensorStart || false;
    };

    Game_System.prototype.getSensorStart = function() {
        return this._sensorStart;
    };

    Game_System.prototype.setSensorStatusAll = function(status, type) {
        if (!type) type = 0;
        if (type) {
            $gameMap.events().forEach(function(event) {
                if (event.getSensorType() !== null) {
                    event.setSensorStatus(status);
                    event.setFoundStatus(0);
                }
            }, this);
            return;
        }
        $gameMap.events().forEach(function(event) {
            if (event.getSensorType() !== null &&
                event.getSensorStatus() !== -1) {
                 event.setSensorStatus(status);
                 event.setFoundStatus(0);
            }
        }, this);
    }

    Game_System.prototype.setViewRangeStatusAll = function(status) {
        $gameMap.events().forEach(function(event) {
            if (event.getSensorType() !== null) event.setViewRangeStatus(status);
        }, this);
    }

    Game_System.prototype.getEventSensorStatus = function(eventId) {
        let event;
        if (eventId && isFinite(eventId) && $gameMap.event(eventId)) {
            event = $gameMap.event(eventId);
            return event.getSensorStatus();
        } else {
            return null;
        }
    };

    Game_System.prototype.getSwitchStatuses = function() {
        return this._switchStatuses;
    };

    Game_System.prototype.setSwitchStatuses = function(sw, eventId) {
        if (this._switchStatuses[sw]) {
            if (this._switchStatuses[sw] instanceof Array &&
                this._switchStatuses[sw].length > 0 &&
                !this._switchStatuses[sw].contains(eventId)) {
                 this._switchStatuses[sw].push(eventId);
            } else {
                this._switchStatuses[sw] = [eventId];
            }
        } else {
            this._switchStatuses[sw] = [eventId];
        }
    };

    Game_System.prototype.isSwitchStatuses = function(sw, eventId) {
        if (!sw || !isFinite(sw)) {
            return false;
        }
        if (this._switchStatuses[sw]) {
            if (eventId === null) {
                return true;
            } else {
                if (this._switchStatuses[sw] instanceof Array &&
                    this._switchStatuses[sw].length > 0 &&
                    this._switchStatuses[sw].contains(eventId)) {
                     return true;
                }
            }
        }
        return false;
    };

    Game_System.prototype.removeSwitchStatuses = function(sw, eventId) {
        if (!this._switchStatuses[sw]) return;
        if (!eventId) {
            delete this._switchStatuses[sw];
            return;
        }
        if (this._switchStatuses[sw] instanceof Array &&
            this._switchStatuses[sw].length > 0 &&
            this._switchStatuses[sw].contains(eventId)) {
             this._switchStatuses[sw].some((v, i) => {
                 if (v === eventId) {
                     this._switchStatuses[sw].splice(i, 1);
                 }
             }, this);
        }
        if (this._switchStatuses[sw].length === 0) {
            delete this._switchStatuses[sw];
        }
    };

    Game_System.prototype.isFoundPlayer = function() {
        if (!this.isSensorStart()) return false;
        return $gameMap.events().some(e => e.isSensorFound());
    };

    Game_System.prototype.allForceLost = function() {
        if (!this.isSensorStart()) return false;
        $gameMap.events().filter(e => {
            return e.getFoundStatus() === 1;
        }).forEach(e => e.setForceLost(1));
    };

    Game_System.prototype.forceLost = function(eventId) {
        if (!this.isSensorStart() ||
            !eventId ||
            !isFinite(eventId) ||
            !$gameMap.event(eventId)) {
             return ;
        }
        const event = $gameMap.event(eventId);
        if (event.getFoundStatus() === 1) {
            event.setForceLost(1);
        }
    };

    //=========================================================================
    // Game_Player
    //  I will define the process to reset the tracking state when moving to a different location.
    //
    //=========================================================================
    const _Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
    Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
        if (DefLocationReset[0] &&
            !$gameParty.inBattle() &&
            !$gameMessage.isBusy()) {
             $gameSystem.resetSensor();
        }
        _Game_Player_reserveTransfer.apply(this, arguments);
    };

	//=========================================================================
	// Game_CharacterBase
	//  Defines additional members for player search control and
	//  redefines the process for changing the sensor state.
	//
	//  Sensor States:
	//   -2 = Before sensor initialization
	//   -1 = Temporary search pause
	//    0 = Search stopped
	//    1 = Searching
	//  Line of Sight Drawing States:
	//    0 = Drawing paused
	//    1 = Drawing updated
	//    2 = New drawing
	//  Discovery States:
	//    0 = Not discovered
	//    1 = Already discovered
	//  Forced Loss:
	//    0 = Disabled
	//    1 = Reflecting configured loss
	//    2 = Immediate loss
	//=========================================================================
    const _Game_CharacterBaseInitMembers = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBaseInitMembers.call(this);
        const foundBallon = DefFoundBallon[0];
        const foundCommon = DefFoundCommon[0];
        const foundSe = DefFoundSe;
        const foundDelay = DefFoundDelay[0];
        const lostBallon = DefLostBallon[0];
        const lostCommon = DefLostCommon[0];
        const lostSe = DefLostSe;
        const lostDelay = DefLostDelay[0];
        this._foundStatus = 0;
        this._sensorStatus = -2;
        this._sensorType = null;
        this._sensorRange = 0;
        this._sensorRangeC = 0;
        this._bothSensorR = false;
        this._bothSensorL = false;
        this._viewRangeStatus = 0;
        this._coordinate = [];
        this._sensorSwitch = null;
        this._lostSensorSwitch = null;
        this._sideSensor = -1;
        this._rangeVisible = -1;
        this._terrainDecision = -1;
        this._directionFixed = -1;
        this._eventDecision = -1;
        this._regionDecision = "";
        this._createRange = false;
        this._foundBallon = foundBallon;
        this._foundCommon = foundCommon;
        this._foundSe = foundSe;
        this._foundMaxDelay = foundDelay;
        this._foundDelay = this._foundMaxDelay;
        this._lostBallon = lostBallon;
        this._lostCommon = lostCommon;
        this._lostSe = lostSe;
        this._lostMaxDelay = lostDelay;
        this._lostDelay = this._lostMaxDelay;
        this._activeMode = 0;
        this._forceLost = 0;
    };

    const _Game_CharacterBaseMoveStraight = Game_CharacterBase.prototype.moveStraight;
    Game_CharacterBase.prototype.moveStraight = function(d) {
        const status = this.direction() === d ? 1 : 2;
        _Game_CharacterBaseMoveStraight.call(this,d);
        if (this.isMovementSucceeded() && d &&
            this.getSensorStatus() === 1) {
             this.setViewRangeStatus(status);
        }
    };

    const _Game_CharacterBaseMoveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
    Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
        _Game_CharacterBaseMoveDiagonally.call(this,horz, vert);
        if (this.isMovementSucceeded() &&
            this.getSensorStatus() === 1) {
             this.setViewRangeStatus(2);
        }
    };

    const _Game_CharacterBaseSetDirection = Game_CharacterBase.prototype.setDirection;
    Game_CharacterBase.prototype.setDirection = function(d) {
        const status = (this.direction() === d) ? 1 : 2;
        if (!this.isDirectionFixed() && d &&
            this.getSensorStatus() === 1) {
             this.setViewRangeStatus(status);
        }
        _Game_CharacterBaseSetDirection.call(this,d);
    }
    Game_CharacterBase.prototype.startViewRange = function() {
        this.setViewRangeStatus(1);
    };

    Game_CharacterBase.prototype.setSensorStatus = function(sensorStatus) {
        this._sensorStatus = sensorStatus;
    };

    Game_CharacterBase.prototype.getSensorStatus = function() {
        return this._sensorStatus;
    };

    Game_CharacterBase.prototype.setFoundStatus = function(foundStatus) {
        this._foundStatus = foundStatus;
    };

    Game_CharacterBase.prototype.getFoundStatus = function() {
        return this._foundStatus;
    };

    Game_CharacterBase.prototype.setSensorType = function(sensorType) {
        this._sensorType = sensorType;
    };

    Game_CharacterBase.prototype.getSensorType = function() {
        return this._sensorType;
    };

    Game_CharacterBase.prototype.setSensorRange = function(sensorRange) {
        this._sensorRange = sensorRange;
    };

    Game_CharacterBase.prototype.getSensorRange = function() {
        const value1 = parseInt(ConvVb(this._sensorRange), 10);
        const value2 = value1 % 2 ? 2 : value1;
        return this.getSensorType() === "df" ?  value2 : value1;
    };

    Game_CharacterBase.prototype.setSensorRangeC = function(sensorRangeC) {
        this._sensorRangeC = sensorRangeC;
    };

    Game_CharacterBase.prototype.getSensorRangeC = function() {
        const value1 = parseInt(ConvVb(this._sensorRangeC), 10);
        const value2 = value1 % 2 ? 2 : value1
        return this.getSensorType() === "df" ? value2 : value1;
    };

    Game_CharacterBase.prototype.setViewRangeStatus = function(viewRangeStatus) {
        this._viewRangeStatus = viewRangeStatus;
    };

    Game_CharacterBase.prototype.getViewRangeStatus = function() {
        return this._viewRangeStatus;
    };

    Game_CharacterBase.prototype.setCoordinate = function(x, y, status) {
        this._coordinate.push([x, y, status, -1]);
    };

    Game_CharacterBase.prototype.getCoordinate = function() {
        return this._coordinate;
    };

    Game_CharacterBase.prototype.clearCoordinate = function() {
        this._coordinate = [];
    };

    Game_CharacterBase.prototype.setBothSensorRight = function(bothSensor) {
        this._bothSensorR = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensorRight = function() {
        return this._bothSensorR;
    };

    Game_CharacterBase.prototype.setBothSensorLeft = function(bothSensor) {
        this._bothSensorL = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensorLeft = function() {
        return this._bothSensorL;
    };

    Game_CharacterBase.prototype.setBothSensor = function(bothSensor) {
        this._sideSensor = bothSensor;
    };

    Game_CharacterBase.prototype.getBothSensor = function() {
        return parseInt(ConvSw(this._sideSensor, this), 10);
    };

    Game_CharacterBase.prototype.setSensorSwitch = function(sensorSwitch) {
        if (isFinite(sensorSwitch)) {
            this._sensorSwitch = parseInt(sensorSwitch, 10);
        } else if (sensorSwitch.toLowerCase().match(/[a-d]/)) {
            this._sensorSwitch = sensorSwitch.toUpperCase();
        }
    };

    Game_CharacterBase.prototype.getSensorSwitch = function() {
        return this._sensorSwitch;
    };

    Game_CharacterBase.prototype.setLostSensorSwitch = function(sensorSwitch) {
        if (isFinite(sensorSwitch)) {
            this._lostSensorSwitch = parseInt(sensorSwitch, 10);
        } else if (sensorSwitch.toLowerCase().match(/[a-d]/)) {
            this._lostSensorSwitch = sensorSwitch.toUpperCase();
        }
    };

    Game_CharacterBase.prototype.getLostSensorSwitch = function() {
        return this._lostSensorSwitch;
    };

    Game_CharacterBase.prototype.setRangeVisible = function(rangeVisible) {
        this._rangeVisible = rangeVisible;
    };

    Game_CharacterBase.prototype.getRangeVisible = function() {
        return parseInt(ConvSw(this._rangeVisible, this), 10);
    };

    Game_CharacterBase.prototype.setTerrainDecision = function(terrainDecision) {
        this._terrainDecision = terrainDecision;
    };

    Game_CharacterBase.prototype.getTerrainDecision = function() {
        return parseInt(ConvSw(this._terrainDecision, this), 10);
    };

    Game_CharacterBase.prototype.setEventDecision = function(eventDecision) {
        this._eventDecision = eventDecision;
    };

    Game_CharacterBase.prototype.getEventDecision = function() {
        return parseInt(ConvSw(this._eventDecision, this), 10);
    };

    Game_CharacterBase.prototype.setRegionDecision = function(regionDecision) {
        this._regionDecision = String(regionDecision);
    };

    Game_CharacterBase.prototype.getRegionDecision = function() {
        return parseInt(ConvVb(this._regionDecision), 10);
    };

    Game_CharacterBase.prototype.setDirectionFixed = function(directionFixed) {
        let direction;
        switch(directionFixed) {
            case "u":
                direction = DIR_UP;
                break;
            case "r":
                direction = DIR_RIGHT;
                break;
            case "l":
                direction = DIR_LEFT;
                break;
            case "d":
                direction = DIR_DOWN;
                break;
            default:
                direction = -1;
        }
        this._directionFixed = parseInt(direction, 10);
    };

    Game_CharacterBase.prototype.getDirectionFixed = function() {
        return this._directionFixed;
    };

    Game_CharacterBase.prototype.isMapPassableEx = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        const d2 = this.reverseDir(d);
        const eventDecision = CEC(DefEventDecision);
        const regDec = getRegionIds(DefRegionDecisions, this.getRegionDecision());
        let passableFlag = true;
        if ($gameMap.isPassable(x, y, d) && $gameMap.isPassable(x2, y2, d2)) {
            if (this.getEventDecision() === 1 ||
                (this.getEventDecision() === -1 && eventDecision)) {
                 const events = $gameMap.eventsXyNt(x2, y2);
                 passableFlag = !events.some(function(event) {
                     return event.isNormalPriority();
                 });
            }
            if (regDec.length > 0 && !!passableFlag) {
                const id = $gameMap.regionId(x2, y2);
                passableFlag = !regDec.contains(id);
            }
        } else {
            passableFlag = false;
        }
        return passableFlag;
    };

    Game_CharacterBase.prototype.isCreateRange = function() {
        return this._createRange;
    };

    Game_CharacterBase.prototype.enableCreateRange = function() {
        this._createRange = true;
    };

    Game_CharacterBase.prototype.setFoundBallon = function(ballon) {
        this._foundBallon = ballon;
    };

    Game_CharacterBase.prototype.getFoundBallon = function() {
        return parseInt(ConvVb(this._foundBallon), 10);
    };

    Game_CharacterBase.prototype.setFoundCommon = function(common) {
        this._foundCommon = common;
    };

    Game_CharacterBase.prototype.getFoundCommon = function() {
        return parseInt(ConvVb(this._foundCommon), 10);
    };

    Game_CharacterBase.prototype.setFoundDelay = function(delay) {
        this._foundDelay = parseInt(ConvVb(delay), 10);
    };

    Game_CharacterBase.prototype.getFoundDelay = function() {
        return this._foundDelay;
    };

    Game_CharacterBase.prototype.resetFoundDelay = function() {
        this._foundDelay = this.getFoundMaxDelay();
    };

    Game_CharacterBase.prototype.setFoundMaxDelay = function(delay) {
        this._foundMaxDelay = delay;
    };

    Game_CharacterBase.prototype.getFoundMaxDelay = function() {
        return parseInt(ConvVb(this._foundMaxDelay), 10);
    };

    Game_CharacterBase.prototype.setLostBallon = function(ballon) {
        this._lostBallon = ballon;
    };

    Game_CharacterBase.prototype.getLostBallon = function() {
        return parseInt(ConvVb(this._lostBallon), 10);
    };

    Game_CharacterBase.prototype.setLostCommon = function(common) {
        this._lostCommon = common;
    };

    Game_CharacterBase.prototype.getLostCommon = function() {
        return parseInt(ConvVb(this._lostCommon), 10);
    };

    Game_CharacterBase.prototype.setLostDelay = function(delay) {
        this._lostDelay = parseInt(ConvVb(delay), 10);
    };

    Game_CharacterBase.prototype.getLostDelay = function() {
        return this._lostDelay;
    };

    Game_CharacterBase.prototype.resetLostDelay = function() {
        this._lostDelay = this.getLostMaxDelay();
    };

    Game_CharacterBase.prototype.setLostMaxDelay = function(delay) {
        this._lostMaxDelay = delay;
    };

    Game_CharacterBase.prototype.getLostMaxDelay = function() {
        return parseInt(ConvVb(this._lostMaxDelay), 10);
    };

    Game_CharacterBase.prototype.setActiveMode = function(mode) {
        this._activeMode = mode;
    };

    Game_CharacterBase.prototype.getActiveMode = function() {
        return parseInt(ConvSw(this._activeMode, this), 10);;
    };

    Game_CharacterBase.prototype.setForceLost = function(forceLost) {
        this._forceLost = forceLost;
    };

    Game_CharacterBase.prototype.getForceLost = function() {
        return this._forceLost;
    };

    Game_CharacterBase.prototype.isSensorFound = function() {
        return this.getSensorStatus() === 1 && this.getFoundStatus() === 1;
    };

    //=========================================================================
    // Game_Map
    //  Defines automatic execution of the search start process.
    //=========================================================================
    const _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        _Game_Map_setupEvents.call(this);
        if (DefAutoSensor[0]) {
            $gameSystem.startSensor();
        }
    };

    //=========================================================================
    // Game_Event
    //  Measures the distance to the player and turns on the specified switch
    //  if the player is within the specified range.
    //=========================================================================
    const _Game_EventSetupPageSettings = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        _Game_EventSetupPageSettings.call(this);
        if (this.getSensorStatus() === -2) {
            this.setupSensor();
        }
    };

    Game_Event.prototype.setupSensor = function() {
        const pattern = /<(.?)(?:psensor)(l|f|s|d)?(?:\:)(\\v\[\d+\]|\d+)([ 0-9a-z\[\]\\]*)?>/i
        const event = this.event();
        if (!event.note) return;
        note = event.note.toLowerCase();
        note = note.split(/ (?=<)/);
        cnt = note.length;
        for (let i = 0;i < cnt;i++) {
            const n = note[i].trim();
            if (n.match(pattern)) {
                match = n.match(pattern);
                if (match[1] && match[1] === "!") { // Temporary disable search
                    this.setSensorStatus(-1);
                }
                switch(match[2]) { // Search type
                    case "l":
                    case "f":
                    case "s":
                    case "d":
                        this.setSensorType(match[2]);
                        break;
                    default:
                        continue;
                        break;
                }
                if (match[3]) { // Number of search target squares
                    value = String(match[3]);
                    value = value.replace(/\\/g, '\x1b');
                    value = value.replace(/\x1b\x1b/g, '\\');
                    if (this.getSensorType() === "df" &&
                        isFinite(value) &&
                        (value <= 1 || (value % 2))) {
                         value = 2;
                    }
                    this.setSensorRange(value);
                    this.setSensorRangeC(value);
                }
                if (match[4]) { // Options
                    options = match[4].trim().split(" ");
                    setupSensor_option(this, options);
                }
            }
        }
    };

    function setupSensor_option(obj, options) {
        options.forEach(function(op){
            op = op.replace(/\\/g, '\x1b');
            op = op.replace(/\x1b\x1b/g, '\\');
            if (op.match(/^sw([a-d]|\d+)$/)) { // Switch specification
                const m = op.match(/^sw([a-d]|\d+)$/);
                obj.setSensorSwitch(m[1]);
            } else if (op.match(/^lsw([a-d]|\d+)$/)) { // Lost switch specification
                const m = op.match(/^lsw([a-d]|\d+)$/);
                obj.setLostSensorSwitch(m[1]);
            } else if (op.match(/^bo([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // Both sides search specification
                const m = op.match(/^bo([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setBothSensor(m[1]);
            } else if (op.match(/^rv([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // Drawing specification
                const m = op.match(/^rv([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setRangeVisible(m[1]);
            } else if (op.match(/^td([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // Terrain consideration specification
                const m = op.match(/^td([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setTerrainDecision(m[1]);
            } else if (op.match(/^di([urld])$/)) { // Search direction fixed specification
                const m = op.match(/^di([urld])$/);
                obj.setDirectionFixed(m[1]);
            } else if (op.match(/^ev([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // Event consideration specification
                const m = op.match(/^ev([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setEventDecision(m[1]);
            } else if (op.match(/^rg(\d+|\x1bv\[(\d+)\])$/)) { // Region consideration specification
                const m = op.match(/^rg(\d+|\x1bv\[(\d+)\])$/);
                obj.setRegionDecision(m[1]);
            } else if (op.match(/^fb(\d+|\x1bv\[(\d+)\])$/)) { // Found balloon specification
                const m = op.match(/^fb(\d+|\x1bv\[(\d+)\])$/);
                obj.setFoundBallon(m[1]);
            } else if (op.match(/^fc(\d+|\x1bv\[(\d+)\])$/)) { // Found common specification
                const m = op.match(/^fc(\d+|\x1bv\[(\d+)\])$/);
                obj.setFoundCommon(m[1]);
            } else if (op.match(/^fd(\d+|\x1bv\[(\d+)\])$/)) { // Found delay specification
                const m = op.match(/^fd(\d+|\x1bv\[(\d+)\])$/);
                obj.setFoundMaxDelay(m[1]);
                obj.setFoundDelay(m[1]);
            } else if (op.match(/^lb(\d+|\x1bv\[(\d+)\])$/)) { // Lost balloon specification
                const m = op.match(/^lb(\d+|\x1bv\[(\d+)\])$/);
                obj.setLostBallon(m[1]);
            } else if (op.match(/^lc(\d+|\x1bv\[(\d+)\])$/)) { // Lost common specification
                const m = op.match(/^lc(\d+|\x1bv\[(\d+)\])$/);
                obj.setLostCommon(m[1]);
            } else if (op.match(/^ld(\d+|\x1bv\[(\d+)\])$/)) { // Lost delay specification
                const m = op.match(/^ld(\d+|\x1bv\[(\d+)\])$/);
                obj.setLostMaxDelay(m[1]);
                obj.setLostDelay(m[1]);
            } else if (op.match(/^am([0-1]|\x1bs\[(\d+|[a-d])\])$/)) { // Search continuation specification
                const m = op.match(/^am([0-1]|\x1bs\[(\d+|[a-d])\])$/);
                obj.setActiveMode(m[1]);
            }
        });
    }

    const _Game_EventUpdate = Game_Event.prototype.update;
    Game_Event.prototype.update = function() {
        _Game_EventUpdate.call(this);
        if (!this.isInvisible() && $gameSystem.isSensorStart()) {
            this.sensorUpdate();
        }
    };

    Game_Event.prototype.sensorUpdate = function() {
        // To be a searching event
        // Not executing map event or having the search continuation option
        if (this.getSensorStatus() === 1 &&
            (!this.isStarting() || this.getActiveMode() === 1)){
             // If player is found and force lost is disabled
             if (this.isFoundPlayer() && this.getForceLost() === 0) {
                 if (this.getFoundStatus() === 0) {
                     this.foundPlayer();
                 }
                 if (this.getLostDelay() < this.getLostMaxDelay()) this.resetLostDelay();
             // If force lost is enabled
             } else if(this.getForceLost() > 0) {
                 this.lostPlayer(true);
             // Player found state
             } else if(this.getFoundStatus() == 1) {
                 this.lostPlayer();
                 if (this.getFoundDelay() < this.getFoundMaxDelay()) {
                     this.resetFoundDelay();
                     this.setForceLost(0);
                 }
             } else {
                 if (this.getFoundDelay() < this.getFoundMaxDelay()) {
                     this.resetFoundDelay();
                     this.setForceLost(0);
                 }
             }
        }
    };

    Game_Event.prototype.foundPlayer = function() {
        const delay = this.getFoundDelay();
        if (delay <= 0) {
            const sensorSwitch = DefSensorSwitch[0];
            const lostSensorSwitch = DefLostSensorSwitch[0];
            const mapId = $gameMap.mapId();
            const eventId = this.eventId();
            this.setFoundStatus(1);
            this.resetFoundDelay();
            this.resetLostDelay();
            // Switch ON after detection
            const sw_on = 
                this.getSensorSwitch() !== null ?
                this.getSensorSwitch() : sensorSwitch;
            foundPlayer_swon(sw_on, mapId, eventId);
            // Switch OFF after loss
            const sw_off = 
                this.getLostSensorSwitch() !== null ?
                this.getLostSensorSwitch() : lostSensorSwitch;
            if (sw_off !== "") {
                foundPlayer_swoff(sw_off, mapId, eventId);
            }
            if (this._foundSe.name !== "") {
                AudioManager.playSe(this._foundSe);
            }
            if (this._foundBallon > 0) {
                $gameTemp.requestBalloon(this, this._foundBallon);
            }
            if (this._foundCommon > 0) {
                $gameTemp.reserveCommonEvent(this._foundCommon);
                if ($gameMap._interpreter) {
                    $gameMap._interpreter.setupReservedCommonEventEx(this.eventId());
                }
            }
        } else {
            this.setFoundDelay(delay - 1);
        }
    };

    Game_Event.prototype.lostPlayer = function(forceLost = false) {
        const delay = this.getLostDelay();
        if (delay <= 0 || forceLost) {
            const sensorSwitch = DefSensorSwitch[0];
            const lostSensorSwitch = DefLostSensorSwitch[0];
            const mapId = $gameMap.mapId();
            const eventId = this.eventId();
            this.setForceLost(0);
            this.setFoundStatus(0);
            this.resetLostDelay();
            this.resetFoundDelay();
            // Switch OFF after detection
            const sw_off = 
                this.getSensorSwitch() !== null ?
                this.getSensorSwitch() : sensorSwitch;
            foundPlayer_swoff(sw_off, mapId, eventId);
            // Switch ON after loss
            const sw_on = 
                this.getLostSensorSwitch() !== null ?
                this.getLostSensorSwitch() : lostSensorSwitch;
            if (sw_on !== "") {
                foundPlayer_swon(sw_on, mapId, eventId);
            }
            if (this._lostSe.name !== "") {
                AudioManager.playSe(this._lostSe);
            }
            if (this._lostBallon > 0) {
                $gameTemp.requestBalloon(this, this._lostBallon);
            }
            if (this._lostCommon > 0) {
                $gameTemp.reserveCommonEvent(this._lostCommon);
                if ($gameMap._interpreter) {
                    $gameMap._interpreter.setupReservedCommonEventEx(this.eventId());
                }
            }
        } else {
            this.setLostDelay(delay - 1);
        }
    };

    function foundPlayer_swon(...arg) {
        const sw = arg[0];
        const mapId = arg[1];
        const eventId = arg[2];
        if (isFinite(sw)) {
            if (!$gameSwitches.value(sw)) {
                $gameSwitches.setValue(sw, true);
            }
        } else if (sw.match(/[a-dA-D]/)) {
            key = [mapId, eventId, sw.toUpperCase()];
            if (!$gameSelfSwitches.value(key)) {
                $gameSelfSwitches.setValue(key, true);
            }
        }
    }

    function foundPlayer_swoff(...arg) {
        const sw = arg[0];
        const mapId = arg[1];
        const eventId = arg[2];
        if (sw === "") return;
        if (isFinite(sw)) {
            if ($gameSwitches.value(sw)) {
                $gameSwitches.setValue(sw, false);
            }
        } else if (sw.match(/[a-dA-D]/)) {
            key = [mapId, eventId, sw.toUpperCase()];
            if ($gameSelfSwitches.value(key)) {
                $gameSelfSwitches.setValue(key, false);
            }
        }
    }

    Game_Event.prototype.isFoundPlayer = function() {
        switch (this.getSensorType()) {
            case "l": // Linear search
                return this.sensorLine();
            case "f": // Fan-shaped search
                return this.sensorFan();
            case "s": // Square-shaped search
                return this.sensorSquare();
            case "d": // Diamond-shaped search
                return this.sensorDiamond();
        }
        return false;
    };

    // Linear search
    Game_Event.prototype.sensorLine = function() {
        const sensorRange = this.getSensorRange();
        const dirFixed = this.getDirectionFixed();
        const dir = dirFixed === -1 ? this.direction() : dirFixed;
        const px = $gamePlayer._realX;
        const py = $gamePlayer._realY;
        const ex = this._realX;
        const ey = this._realY;
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        // Initialize currentRange
        const sensorRangeC = sensorRange;
        let strDir, diagoDir, coordinates, cnt;
        // Initialize coordinates
        this.clearCoordinate();
        switch (dir) {
            case 8:// Upward (y<0)
                strDir = DIR_UP;
                diagoDir = DIR_RIGHT;
                // Confirm front range
                this.rangeSearch(strDir, 0, 0, 0, -1, sensorRange);
                // Adjacent cell search
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), -1, 0)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (px >= ex + coordinates[i][0] - realX && 
                            px <= ex + coordinates[i][0] + realX &&
                            py >= ey - Math.abs(coordinates[i][1]) - realY &&
                            py <= ey + Math.abs(coordinates[i][0])) {
                             return true;
                        }
                    }
                }
                break;
            case 6:// Rightward (x>0)
                strDir = DIR_RIGHT;
                diagoDir = DIR_DOWN;
                // Confirm front range
                this.rangeSearch(strDir, 0, 0, 1, 0, sensorRange);
                // Adjacent cell search
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 0, -1)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (py >= ey + coordinates[i][1] - realY &&
                            py <= ey + coordinates[i][1] + realY &&
                            px >= ex + Math.abs(coordinates[i][1]) - realX &&
                            px <= ex + coordinates[i][0] + realX) {
                             return true;
                        }
                    }
                }
                break;
            case 4:// Leftward (x<0)
                strDir = DIR_LEFT;
                diagoDir = DIR_UP;
                // Confirm front range
                this.rangeSearch(strDir, 0, 0, -1, 0, sensorRange);
                // Adjacent cell search
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 0, 1)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (py <= ey + coordinates[i][1] + realY &&
                            py >= ey + coordinates[i][1] - realY &&
                            px <= ex + Math.abs(coordinates[i][1]) + realX &&
                            px >= ex + coordinates[i][0] - realX) {
                             return true;
                        }
                    }
                }
                break;
            case 2:// Downward (y>0)
                strDir = DIR_DOWN;
                diagoDir = DIR_LEFT;
                // Confirm front range
                this.rangeSearch(strDir, 0, 0, 0, 1, sensorRange);
                // Adjacent cell search
                if (this.isSideSearch(diagoDir, this.reverseDir(diagoDir), 1, 0)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                if (cnt === 1) {
                    i = 0;
                    if (coordinates[i][0] !== 0 || coordinates[i][1] !== 0) {
                        if (px >= ex + coordinates[i][0] - realX &&
                            px <= ex + coordinates[i][0] + realX &&
                            py >= ey + Math.abs(coordinates[i][0]) &&
                            py <= ey + coordinates[i][1] + realY) {
                             return true;
                        }
                    }
                }
        }
        return false;
    };

    // Fan-shaped search
    Game_Event.prototype.sensorFan = function() {
        const sensorRange = this.getSensorRange();
        const dirFixed = this.getDirectionFixed();
        const dir = dirFixed === -1 ? this.direction() : dirFixed;
        const px = $gamePlayer._realX;
        const py = $gamePlayer._realY;
        const sx = this.deltaXFrom($gamePlayer.x);
        const sy = this.deltaYFrom($gamePlayer.y);
        const ex = this.x;
        const ey = this.y;
        const rex = this._realX;
        const rey = this._realY;
        const terrainDecision = CEC(DefTerrainDecision);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        let sign, strDir, diagoDir, noPass, noPassTemp, coordinates, cnt;
        noPass = 0;
        // Initialize currentRange
        this.setSensorRangeC(sensorRange);
        // Initialize coordinate
        this.clearCoordinate();
        switch (dir) {
            case DIR_UP:// Upward (y<0)
                sign = 1;
                strDir = DIR_UP;
                diagoDir = DIR_RIGHT;
                // Confirm front range
                noPass = this.rangeSearch(strDir, 0, 0, 0, -1, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // Switch for switching
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // Confirm range on diagonal straight line
                for (let i = 1; i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j * sign, -j, 0, -1, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 ||
                           (this.getTerrainDecision() === -1 && terrainDecision) && (
                            !this.isMapPassableEx(ex + j * sign, ey - j, diagoDir) ||
                            !this.isMapPassableEx(ex + j * sign, ey - j, strDir) ||
                            !this.isMapPassableEx(ex + j * sign, ey - j - 1, diagoDir) ||
                            !this.isMapPassableEx(ex + (j + 1) * sign, ey - j, strDir))) {
                             break;
                        }
                    }
                    // Adjust the number of elements in the array
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // Switch for switching
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // Adjacent cell search
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, -1, 0)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (px <= rex + coordinates[i][0] + realX &&
                        px >= rex + coordinates[i][0] - realX &&
                        py <= rey - Math.abs(coordinates[i][0]) + realY &&
                        py >= rey + coordinates[i][1] - realY) {
                        return true;
                    }
                }
                break;
            case DIR_RIGHT:// Rightward (x>0)
                sign = 1;
                strDir = DIR_RIGHT;
                diagoDir = DIR_DOWN;
                // Confirm front range
                noPass = this.rangeSearch(strDir, 0, 0, 1, 0, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // Switch for switching
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // Confirm range on diagonal straight line
                for (let i = 1; i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j, j * sign, 1, 0, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 || 
                           (this.getTerrainDecision() === -1 && terrainDecision)) {
                           if (!this.isMapPassableEx(ex + j, ey + j * sign, diagoDir) ||
                               !this.isMapPassableEx(ex + j, ey + j * sign, strDir) ||
                               !this.isMapPassableEx(ex + j + 1, ey + j * sign, diagoDir) ||
                               !this.isMapPassableEx(ex + j, ey + (j + 1) * sign, strDir)) {
                                break;
                           }
                       }
                    }
                    // Adjust the number of elements in the array
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // Switch for switching
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // Adjacent cell search
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 0, -1)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (py >= rey + coordinates[i][1] - realY &&
                        py <= rey + coordinates[i][1] + realY &&
                        px >= rex + Math.abs(coordinates[i][1]) - realX &&
                        px <= rex + coordinates[i][0] + realX) {
                         return true;
                    }
                }
                break;
            case DIR_LEFT:// Leftward (x<0)
                sign = -1;
                strDir = DIR_LEFT;
                diagoDir = DIR_UP;
                // Confirm front range
                noPass = this.rangeSearch(strDir, 0, 0, -1, 0, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // Switch for switching
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // Confirm range on diagonal straight line
                for (let i = 1;i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, -j, j * sign, -1, 0, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 ||
                           (this.getTerrainDecision() === -1 && terrainDecision)) {
                            if (!this.isMapPassableEx(ex - j, ey + j * sign, diagoDir) ||
                                !this.isMapPassableEx(ex - j, ey + j * sign, strDir) ||
                                !this.isMapPassableEx(ex - j - 1, ey + j * sign, diagoDir) ||
                                !this.isMapPassableEx(ex - j, ey + (j + 1) * sign, strDir)) {
                                 break;
                            }
                        }
                    }
                    // Adjust the number of elements in the array
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // Switch for switching
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // Adjacent cell search
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 0, 1)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (py <= rey + coordinates[i][1] + realY &&
                        py >= rey + coordinates[i][1] - realY &&
                        px <= rex - Math.abs(coordinates[i][1]) + realX &&
                        px >= rex + coordinates[i][0] - realX) {
                        return true;
                    }
                }
                break;
            case DIR_DOWN:// Downward (y>0)
                sign = -1;
                strDir = DIR_DOWN;
                diagoDir = DIR_LEFT;
                // Confirm front range
                noPass = this.rangeSearch(strDir, 0, 0, 0, 1, sensorRange);
                if (noPass !== sensorRange) noPass++;
                // Switch for switching
                this.setCoordinate(0, 0, "C");
                noPassTemp = noPass;
                // Confirm range on diagonal straight line
                for (let i = 1;i < 3; i++) {
                    for (let j = 0; j <= sensorRange; j++) {
                        if (j > 0) {
                            noPassTemp = this.rangeSearch(strDir, j * sign, j, 0, 1, noPassTemp);
                            if (j !== noPassTemp) {
                                noPassTemp++;
                            } else {
                                noPassTemp = noPassTemp + j;
                            }
                        }
                        if (this.getTerrainDecision() === 1 ||
                           (this.getTerrainDecision() === -1 && terrainDecision)) {
                            if (!this.isMapPassableEx(ex + j * sign, ey + j, diagoDir) ||
                                !this.isMapPassableEx(ex + j * sign, ey + j, strDir) ||
                                !this.isMapPassableEx(ex + j * sign, ey + j + 1, diagoDir) ||
                                !this.isMapPassableEx(ex + (j + 1) * sign, ey + j, strDir)) {
                                 break;
                            }
                        }
                    }
                    // Adjust the number of elements in the array
                    this.addCoordinate(sensorRange * i + 1 + i);
                    if (i === 1) {
                        // Switch for switching
                        this.setCoordinate(0, 0, "C");
                        noPassTemp = noPass;
                        sign = signChange(sign);
                        diagoDir = this.reverseDir(diagoDir);
                    }
                }
                // Adjacent cell search
                if (this.isSideSearch(this.reverseDir(diagoDir), diagoDir, 1, 0)) {
                    return true;
                }
                // Player range search
                coordinates = this.getCoordinate();
                cnt = coordinates.length;
                for (let i = 0; i < cnt; i++) {
                    if (coordinates[i][2] === "Add") {
                        continue;
                    } else if (coordinates[i][2] === "C") {
                        continue;
                    } else if (coordinates[i][0] === 0 && coordinates[i][1] === 0) {
                        continue;
                    }
                    if (px >= rex + coordinates[i][0] - realX &&
                        px <= rex + coordinates[i][0] + realX &&
                        py >= rey + Math.abs(coordinates[i][0]) - realY &&
                        py <= rey + coordinates[i][1] + realY) {
                         return true;
                    }
                }
        }
        return false;
    };

    // Diamond range search (completely ignoring terrain)
    Game_Event.prototype.sensorDiamond = function() {
        const sensorRange = this.getSensorRange();
        const sx = this.deltaXFrom($gamePlayer._realX);
        const sy = this.deltaYFrom($gamePlayer._realY);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        // Initialize currentRange
        this.setSensorRangeC(sensorRange);
        // Initialize coordinates
        this.clearCoordinate();
        // Set coordinates
        this.setCoordinate(0, -sensorRange, DIR_RIGHT);
        this.setCoordinate(sensorRange, 0, DIR_DOWN);
        this.setCoordinate(0, sensorRange, DIR_LEFT);
        this.setCoordinate(-sensorRange, 0, DIR_UP);
        // Player range search
        if (Math.abs(sx) + Math.abs(sy) <= sensorRange + Math.max(realX, realY)) {
            return true;
        }
    }

    // Square range search (completely ignoring terrain)
    Game_Event.prototype.sensorSquare = function() {
        const sensorRange = this.getSensorRange();
        const sx = this.deltaXFrom($gamePlayer._realX);
        const sy = this.deltaYFrom($gamePlayer._realY);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        // Initialize currentRange
        this.setSensorRangeC(sensorRange);
        // Initialize coordinates
        this.clearCoordinate();
        // Player range search
        if (Math.abs(sx) <= sensorRange + realX && Math.abs(sy) <= sensorRange + realY) {
            return true;
        }
    }

    Game_Event.prototype.isSideSearch = function(directionR, directionL, vx, vy) {
        const bothSensor = CEC(DefBothSensor);
        const terrainDecision = CEC(DefTerrainDecision);
        const realX = DefRealRangeX[0];
        const realY = DefRealRangeY[0];
        const sx = this.deltaXFrom($gamePlayer._realX);
        const sy = this.deltaYFrom($gamePlayer._realY);
        const ex = this.x;
        const ey = this.y;
        if (this.getBothSensor() === -1 && bothSensor) {
            if (this.getTerrainDecision() === 1
                    || (this.getTerrainDecision() === -1 && terrainDecision)) {
                this.setBothSensorRight(this.isMapPassableEx(ex, ey, directionR));
                this.setBothSensorLeft(this.isMapPassableEx(ex, ey, directionL));
            } else {
                this.setBothSensorRight(true);
                this.setBothSensorLeft(true);
            }
        } else if (this.getBothSensor() === 1) {
            if (this.getTerrainDecision() === 1
                    || (this.getTerrainDecision() === -1 && terrainDecision)) {
                this.setBothSensorRight(this.isMapPassableEx(ex, ey, directionR));
                this.setBothSensorLeft(this.isMapPassableEx(ex, ey, directionL));
            } else {
                this.setBothSensorRight(true);
                this.setBothSensorLeft(true);
            }
        } else {
            this.setBothSensorRight(false);
            this.setBothSensorLeft(false);
        }
        if (this.getBothSensorRight() &&
           sx >= vx - realX && sx <= vx + realX &&
           sy >= vy - realY && sy <= vy + realY) {
            return true;
        }
        vx = vx === 0 ? vx : -vx;
        vy = vy === 0 ? vy : -vy;
        if (this.getBothSensorLeft() &&
           sx >= vx - realX && sx <= vx + realX &&
           sy >= vy - realY && sy <= vy + realY) {
            return true;
        }
        return false;
    };

    Game_Event.prototype.rangeSearch = function(strDir, rx, ry, signX, signY, noPass) {
        const sensorRange = this.getSensorRange();
        const cnt = sensorRange - Math.abs(rx);
        const noPassDir = signX !== 0 ? ry : rx;
        const terrainDecision = CEC(DefTerrainDecision);
        const ex = this.x;
        const ey = this.y;
        let obstacle, status;
        obstacle = -1;
        status = "Last";
        // Frontal range search
        for (j = 0; j <= cnt; j++) {
            cx = rx + j * signX;
            cy = ry + j * signY;
            if (this.getTerrainDecision() === 1
                    || (this.getTerrainDecision() === -1 && terrainDecision)) {
                if (!this.isMapPassableEx(ex + cx, ey + cy, strDir) && j < sensorRange) {
                    obstacle = j + Math.abs(rx);
                    status = "Line";
                    break;
                }
                if (j + Math.abs(noPassDir) >= noPass && noPass < sensorRange) {
                    status = "Nopass";
                    break;
                }
            }
        }
        // Set coordinates
        sx = this.deltaXFrom(ex + cx);
        if (sx !== 0) sx *= -1;
        sy = this.deltaYFrom(ey + cy);
        if (sy !== 0) sy *= -1;
        this.setCoordinate(sx, sy, status);
        return obstacle < 0 ? noPass : obstacle;
    };

    const _GameEvent_lock = Game_Event.prototype.lock;
    Game_Event.prototype.lock = function() {
        if (this.getSensorStatus() !== 1) {
            _GameEvent_lock.call(this);
        } else {
            // Do not turn when spoken to (limited to when the searcher is searching)
            if (!this._locked) {
                this._prelockDirection = this.direction();
                this._locked = true;
            }
        }
    };

    Game_Event.prototype.addCoordinate = function(length) {
        // Adjust the number of array elements on the left and right to the specified number
        const coordinates = this.getCoordinate();
        const cnt = coordinates.length;
        for (let j = cnt; j < length; j++) {
            this.setCoordinate(0, 0, "Add");
        }
    };

    const _Game_Event_erase = Game_Event.prototype.erase;
    Game_Event.prototype.erase = function() {
        this.setSensorStatus(0);
        this.setFoundStatus(0);
        this.setViewRangeStatus(0);
        _Game_Event_erase.call(this);
    };

    const _Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
    Game_Event.prototype.isCollidedWithEvents = function(x, y) {
        if (this.isSensorFound() && DefTrackingPriority[0]) {
            return Game_CharacterBase.prototype.isCollidedWithEvents.apply(this, arguments);
        } else {
            return _Game_Event_isCollidedWithEvents.apply(this, arguments);
        }
    };

    Game_Event.prototype.isInvisible = function() {
        return this._erased || this.characterName() === "";
    }

    const _Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        if (!this.isSensorFound() || !DefFollowerThrough[0]) {
            return _Game_Event_isCollidedWithPlayerCharacters.call(this, x, y);
        }
        return (
            this.isNormalPriority() &&
            !$gamePlayer.isThrough() &&
            $gamePlayer.pos(x, y)
        );
    };

    //=========================================================================
    // Spriteset_Map
    //  Defines additional processing to draw shapes representing the searcher's field of view.
    //=========================================================================
    const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        _Spriteset_Map_createLowerLayer.call(this);
        this.createViewRange();
    }

    Spriteset_Map.prototype.createViewRange = function() {
        this._viewRangeSprites = [];
        $gameMap.events().forEach(event => {
            if (event._sensorType) {
                this._viewRangeSprites.push(new Sprite_ViewRange(event));
                addSideSprite(this, event);
                event.enableCreateRange();
            }
        }, this);
        for (let i = 0; i < this._viewRangeSprites.length; i++) {
            this._tilemap.addChild(this._viewRangeSprites[i]);
        }
    };

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        if (this._viewRangeSprites && ConvSw(DefRangeVisible[0])) {
            this.updateViewRange();
        }
    };

    Spriteset_Map.prototype.updateViewRange = function() {
        const _cnt = this._viewRangeSprites.length - 1
        cnt = _cnt >= 0 ? _cnt : 0;
        $gameMap.events().filter(event => {
            return !event.isCreateRange();
        }).forEach(event => {
            if (event._sensorType) {
                this._viewRangeSprites.push(new Sprite_ViewRange(event));
                addSideSprite(this, event);
                event.enableCreateRange();
            }
        }, this);
        for (; cnt < this._viewRangeSprites.length; cnt++) {
            this._tilemap.addChild(this._viewRangeSprites[cnt]);
        }
    };

    function addSideSprite(spriteset, event) {
        const viewRangeSprites = spriteset._viewRangeSprites;
        const bsprite = viewRangeSprites[viewRangeSprites.length - 1];
        const sprite = new Sprite();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const opacity = DefRangeOpacity[0];
        sprite.opacity = opacity;
        sprite.blendMode = PIXI.BLEND_MODES.ADD;
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;      
        sprite.visible = true;
        bsprite._spriteSD = sprite;
        spriteset._tilemap.addChild(sprite);
    }
    //=========================================================================
    // Sprite_ViewRange
    //  Defines the processing to draw shapes representing the field of view of a searcher.
    //=========================================================================
    function Sprite_ViewRange() {
        this.initialize.apply(this, arguments);
    }

    Sprite_ViewRange.prototype = Object.create(Sprite.prototype);
    Sprite_ViewRange.prototype.constructor = Sprite_ViewRange;

    Sprite_ViewRange.prototype.initialize = function(character) {
        Sprite.prototype.initialize.call(this);
        this.initMembers();
        this.setCharacter(character);
        this._frameCount = 0;
        this.z = DefRangePosition[0] === 1 ? 6 : 2;
    };

    Sprite_ViewRange.prototype.initMembers = function() {
        this._character = null;
        this._coordinates = null;
    };

    Sprite_ViewRange.prototype.setCharacter = function(character) {
        this._character = character;
    };

    Sprite_ViewRange.prototype.update = function() {
        Sprite.prototype.update.call(this);
        const sensorStatus = this._character.getSensorStatus();
        const rangeStatus = this._character.getViewRangeStatus();
        const rangeVisible = this._character.getRangeVisible();
        const defVisible = ConvSw(DefRangeVisible[0]);
        if (this._character && this._character._erased) {
            this.parent.removeChild(this._spriteSD);
            this.parent.removeChild(this);
        }
        if (this._character &&
            !this._character._erased &&
            sensorStatus === 1 && (rangeVisible === 1 ||
            (rangeVisible === -1 && defVisible))) {
             this.updatePosition();
             if (this.bitmap) {
                 if (rangeStatus === 1) {
                     // Update drawing
                     if (this._coordinate.length === 0) {
                         this._coordinate = this._character.getCoordinate();
                     }
                     this.updateBitmap();
                 } else if (rangeStatus === 2) {
                     // New drawing
                     this._coordinate = this._character.getCoordinate();
                     this.createBitmap();
                 }
             } else {
                 // New drawing
                 this._coordinate = this._character.getCoordinate();
                 this.createBitmap();
             }
            this.visible = true;
            this._spriteSD.visible = true;
        } else {
            this.visible = false;
            this._spriteSD.visible = false;
        }
    };

    Sprite_ViewRange.prototype.createBitmap = function() {
        const _direction = this._character.direction();
        const dirFixed = this._character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const bothSensor = CEC(DefBothSensor);
        const coordinates = this._coordinate;
        const sensorType = this._character.getSensorType();
        const sensorRange = this._character.getSensorRange();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const sideSensorR = this._character.getBothSensorRight();
        const sideSensorL = this._character.getBothSensorLeft();
        const color = DefRangeColor[0];
        const opacity = DefRangeOpacity[0];
        const bias =
            bothSensor ? 3 : 
            this._character.getBothSensor() > 0 ? 3 : 1;
        let width, height;
        switch(sensorType) {
            case "l":
                if (direction === DIR_UP) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                this.bitmap = new Bitmap(width, height);
                this._spriteSD.bitmap = new Bitmap(tileWidth * 3, tileHeight * 3);
                this.bitmap.fillViewRangeLine(color, this._character, this._spriteSD);
                break;
            case "f":
                if (direction === DIR_UP) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;

                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                this.bitmap = new Bitmap(width, height);
                if (sensorType === "f") {
                    this._spriteSD.bitmap = new Bitmap(tileWidth * 3, tileHeight * 3);
                    this.bitmap.fillViewRangeFan(color, this._character, this._spriteSD);
                } else {
                    this.bitmap.fillViewRangeFrontDiamond(color, this._character);
                }
                break;
            case "d":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                this.bitmap = new Bitmap(width, height);
                this.bitmap.fillViewRangeDiamond(color, this._character);
                break;
            case "s":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                this.bitmap = new Bitmap(width, height);
                this.bitmap.fillRect(0, 0, width, height - tileHeight, color);
                break;
        }
        this.opacity = opacity;
        this.blendMode = PIXI.BLEND_MODES.ADD;
        this.visible = true;
        this._character.setViewRangeStatus(1);
    };

    Sprite_ViewRange.prototype.updateBitmap = function() {
        const _direction = this._character.direction();
        const dirFixed = this._character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const bothSensor = CEC(DefBothSensor);
        const sensorType = this._character.getSensorType();
        const sensorRange = this._character.getSensorRange();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const tmpCoordinate =  this._coordinate;
        const coordinate = this._character.getCoordinate();
        const cnt = tmpCoordinate.length < coordinate.length ? tmpCoordinate.length : coordinate.length;
        color = DefRangeColor[0];
        opacity = DefRangeOpacity[0];
        bias =
            bothSensor ? 3 :
            this._character.getBothSensor() > 0 ? 3 : 1;
        for (let i = 0; i < cnt; i++) {
            if (coordinate[i][0] !==tmpCoordinate[i][0] || coordinate[i][1] !== tmpCoordinate[i][1]) {
                if (tmpCoordinate[i][3] === -1) {
                    tmpCoordinate[i][3] = $gameMap.tileWidth();
                } else if (tmpCoordinate[i][3] !== 0) {
                    tmpCoordinate[i][3]--;
                }
            } else {
                coordinate[i][3] = 0;
            }
        }
        switch(sensorType) {
            case "l":
                if (direction === DIR_UP) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * bias;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * bias;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this._spriteSD.bitmap.clear();
                this.bitmap.fillViewRangeLine(color, this._character, this._spriteSD);
                break;
            case "f":
                if (direction === DIR_UP) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 1;
                } else if (direction === DIR_RIGHT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;
                    this.anchor.x = 0;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_LEFT) {
                    width = tileWidth * sensorRange + tileWidth;
                    height = tileHeight * sensorRange * 2 + tileHeight * 2;
                    this.anchor.x = 1;
                    this.anchor.y = 0.5;
                } else if (direction === DIR_DOWN) {
                    width = tileWidth * sensorRange * 2 + tileWidth;
                    height = tileHeight * sensorRange + tileHeight;
                    this.anchor.x = 0.5;
                    this.anchor.y = 0;
                }
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                if (sensorType === "f") {
                    this._spriteSD.bitmap.clear();
                    this.bitmap.fillViewRangeFan(color, this._character, this._spriteSD);
                } else {
                    this.bitmap.fillViewRangeFrontDiamond(color, this._character);
                }
                break;
            case "d":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this.bitmap.fillViewRangeDiamond(color, this._character);
                break;
            case "s":
                width = tileWidth * sensorRange * 2 + tileWidth;
                height = tileHeight * sensorRange * 2 + tileHeight * 2;
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
                if(this.bitmap.width != width || this.bitmap.height != height) {
                    this.bitmap.clear();
                    this.bitmap = new Bitmap(width, height);
                }
                this.bitmap.fillRect(0, 0, width, height - tileHeight, color);
                break;
        }
        this.opacity = opacity;
        this.blendMode = PIXI.BLEND_MODES.ADD;
        this.visible = true;
    };

    Sprite_ViewRange.prototype.updatePosition = function() {
        const _direction = this._character.direction();
        const dirFixed = this._character.getDirectionFixed();
        const direction = _direction === -1 ? _direction : dirFixed;
        const sensorType = this._character.getSensorType();
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const cx = this._character.screenX();
        const cy = this._character.screenY();
        const posSD = calcPositionSD(this);
        const bias = 6; // Position adjustment
        this.x = cx;
        this.y = cy;
        this._spriteSD.x = posSD.x;
        this._spriteSD.y = posSD.y;
        switch(sensorType) {
            case "l":
                if (direction === DIR_UP) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_RIGHT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_LEFT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_DOWN) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                }
                break;
            case "f":
                if (direction === DIR_UP) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_RIGHT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_LEFT) {
                    this.x = cx;
                    this.y = cy + bias;
                    this._spriteSD.x = posSD.x;
                    this._spriteSD.y = posSD.y + bias;
                } else if (direction === DIR_DOWN) {
                    this.y = cy + bias;
                    this._spriteSD.y = posSD.y + bias;
                }
                break;
            case "df":
                if (direction === DIR_UP) {
                    this.y = cy + bias;
                } else if (direction === DIR_RIGHT) {
                    this.x = cx + tileWidth / 2 - tileWidth;
                    this.y = cy - tileHeight / 2 + bias;
                } else if (direction === DIR_LEFT) {
                    this.x = cx + tileWidth / 2;
                    this.y = cy - tileHeight / 2 + bias;
                } else if (direction === DIR_DOWN) {
                    this.y = cy - tileHeight + bias;
                }
                break;
        }
    };

    function calcPositionSD(bsprite) {
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const event = bsprite._character;
        const _cx = event._x;
        const _cy = event._y;
        const _sx = event.screenX();
        const _sy = event.screenY();
        const offsetY = tileHeight - _sy / (_cy + 1);
        const sx = _sx - tileWidth * 1.5;
        const sy = _sy - tileHeight * 2;
        return {"x":sx, "y":sy};
    }

    //=========================================================================
    // Bitmap
    //  Defines additional processing to draw shapes representing the field of view of the searcher.
    //=========================================================================
    Bitmap.prototype.fillViewRangeLine = function(color, character, spriteSD) {
        const _direction = character.direction();
        const context = this._context;
        const contextSD = spriteSD.bitmap._context;
        const dirFixed = character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const coordinates = character.getCoordinate();
        const cnt = coordinates.length;
        const sideSensorR = character.getBothSensorRight();
        const sideSensorL = character.getBothSensorLeft();
        let cx, cy, num, distanceX, distanceY;
        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (direction === DIR_UP) {
            if (coordinates && cnt === 1) {
                num = 1;
                cx = width / 2 + tileWidth / 2;
                cy = height - tileHeight;
                distanceX = cx - tileWidth;
                distanceY = cy - Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 8]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if (direction === DIR_RIGHT) {
            if (coordinates && cnt === 1) {
                num = 0;
                cx = tileWidth / 2;
                cy = height / 2;
                distanceX = cx + Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy - tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 6]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if (direction === DIR_LEFT) {
            if (coordinates && cnt === 1) {
                num = 0;
                cx = width - tileWidth / 2;
                cy = height / 2 - tileHeight;
                distanceX = cx - Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy + tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 4]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        } else if (direction === DIR_DOWN) {
            if (coordinates && cnt === 1) {
                num = 1;
                cx = width / 2 - tileWidth / 2;
                cy = 0;
                distanceX = cx + tileWidth;
                distanceY = cy + Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 2]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
            }
        }
        context.fill();
        context.restore();
    };

    Bitmap.prototype.fillViewRangeFan = function(color, character, spriteSD) {
        const _direction = character.direction();
        const context = this._context;
        const contextSD = spriteSD.bitmap._context;
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const coordinates = character.getCoordinate();
        const cnt = coordinates.length;
        const dirFixed = character.getDirectionFixed();
        const direction = dirFixed === -1 ? _direction : dirFixed;
        const sideSensorR = character.getBothSensorRight();
        const sideSensorL = character.getBothSensorLeft();
        let cx, cy, num, distanceX, distanceY, sign;
        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (direction === DIR_UP) {
            if (coordinates && cnt > 0) {
                sign = 1;
                num = 1;
                cx = width / 2 + tileWidth / 2;
                cy = height - tileHeight;
                distanceX = cx - tileWidth;
                distanceY = height - tileHeight - Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 8]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = width / 2 + tileWidth / 2 * sign + tileWidth * i * sign;
                    cy = height - tileHeight * i;
                    distanceX = cx + tileWidth * signChange(sign);
                    distanceY = height - tileHeight - Math.abs(coordinates[j][num]) * tileHeight;
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if (direction === DIR_RIGHT) {
            if (coordinates && cnt > 0) {
                sign = 1;
                num = 0;
                cx = tileWidth / 2;
                cy = height / 2;
                distanceX = tileWidth / 2 + Math.abs(coordinates[0][num]) * tileWidth;
                distanceY = cy - tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 6]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = tileWidth * i - tileWidth / 2;
                    cy = height / 2 + tileHeight / 2 * sign + tileHeight * i * sign;
                    cy -= tileHeight / 2;
                    distanceX = tileWidth / 2 + Math.abs(coordinates[j][num]) * tileWidth ;
                    distanceY = cy + tileHeight * signChange(sign);
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if (direction === DIR_LEFT) {
            if (coordinates && cnt > 0) {
                sign = -1;
                num = 0;
                cx = width - tileWidth / 2;
                cy = height / 2;
                distanceX = width - Math.abs(coordinates[0][num]) * tileWidth;
                distanceX -= tileWidth/ 2;
                distanceY = cy - tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 4]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = width - tileWidth * i + tileWidth / 2;
                    cy = height / 2 + tileHeight / 2 * sign + tileHeight * i * sign;
                    cy -= tileHeight / 2;
                    distanceX = width - tileWidth / 2 - Math.abs(coordinates[j][num]) * tileWidth;
                    distanceY = cy + tileHeight * signChange(sign);
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        } else if (direction === DIR_DOWN) {
            if (coordinates && cnt > 0) {
                sign = -1;
                num = 1;
                cx = width / 2 - tileWidth / 2;
                cy = 0;
                distanceX = cx + tileWidth;
                distanceY = Math.abs(coordinates[0][num]) * tileHeight;
                this.mkrSideDrawLine(contextSD, [sideSensorL, sideSensorR, 2]);
                this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                for (let i = 1, j = 2; j < cnt; i++, j++) {
                    if (coordinates[j][2] === "Add") {
                        continue;
                    } else if (coordinates[j][2] === "C") {
                        sign = signChange(sign);
                        i = 1;
                        j++;
                    } else if (coordinates[j][0] === 0 && coordinates[j][1] === 0) {
                        continue;
                    }
                    cx = width / 2 + tileWidth / 2 * sign + tileWidth * i * sign;
                    cy = tileHeight * i - tileHeight;
                    distanceX = cx + tileWidth * signChange(sign);
                    distanceY = Math.abs(coordinates[j][num]) * tileHeight;
                    this.mkrDrawLine(context, cx, cy, distanceX, distanceY);
                }
            }
        }
        context.fill();
        context.restore();
    };

    Bitmap.prototype.fillViewRangeDiamond = function(color, character) {
        const context = this._context;
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        coordinates = character.getCoordinate();
        const cnt = coordinates.length;
        let rx, ry, dx, dy, ndx, ndy, sign;
        this.clear();
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (coordinates && cnt > 0) {
            cx = width / 2 - tileWidth / 2;
            cy = 0;
            rx = cx;
            ry = cy;
            context.moveTo(cx, cy);
            for (let i = 0; i < cnt; i++) {
                dx = coordinates[i][0];
                dy = coordinates[i][1];
                ndx = (i < cnt - 1)? coordinates[i+1][0] : coordinates[0][0];
                ndy = (i < cnt - 1)? coordinates[i+1][1] : coordinates[0][1];
                dir = coordinates[i][2];
                switch(dir) {
                    case DIR_UP:
                        ry -= tileHeight;
                        break;
                    case DIR_RIGHT:
                        rx += tileWidth;
                        break;
                    case DIR_DOWN:
                        ry += tileHeight;
                        break;
                    case DIR_LEFT:
                        rx -= tileWidth;
                        break;
                }
                context.lineTo(rx, ry);
                while(dx !== ndx || dy !== ndy) {
                    switch(dir) {
                        case DIR_UP:
                        case DIR_DOWN:
                            if (dx < ndx) {
                                rx += tileWidth;
                                dx++;
                            } else if (dx > ndx) {
                                rx -= tileWidth;
                                dx--;
                            }
                            context.lineTo(rx, ry);
                            if (dy < ndy) {
                                ry += tileHeight;
                                dy++;
                            } else if (dy > ndy) {
                                ry -= tileHeight;
                                dy--;
                            }
                            context.lineTo(rx, ry);
                            break;
                        case DIR_RIGHT:
                        case DIR_LEFT:
                            if (dy < ndy) {
                                ry += tileHeight;
                                dy++;
                            } else if (dy > ndy) {
                                ry -= tileHeight;
                                dy--;
                            }
                            context.lineTo(rx, ry);
                            if (dx < ndx) {
                                rx += tileWidth;
                                dx++;
                            } else if (dx > ndx) {
                                rx -= tileWidth;
                                dx--;
                            }
                            context.lineTo(rx, ry);
                            break;
                    }
                }
            }
        }
        context.fill();
        context.restore();
    };

    Bitmap.prototype.mkrDrawLine = function(context, cx, cy, distanceX, distanceY) {
        const width = this.width;
        const height = this.height;
        const tileWidth = $gameMap.tileWidth();
        const tileHeight = $gameMap.tileHeight();
        const lx = distanceX;
        const ly = distanceY;
        context.moveTo(cx, cy);
        context.lineTo(lx, cy);
        context.lineTo(lx, ly);
        context.lineTo(cx, ly);
    };

    Bitmap.prototype.mkrSideDrawLine = function(context, sideSensors) {
        const color = DefRangeColor[0];
        const width = this.width;
        const height = this.height;
        const tw = $gameMap.tileWidth();
        const th = $gameMap.tileHeight();
        const d = sideSensors[2];
        if (!sideSensors[0] && !sideSensors[1]) return;
        context.save();
        context.fillStyle = color;
        context.beginPath();
        if (sideSensors[0]) {
            mkrSideDrawLineProc(context, d, tw, th)
        }
        if (sideSensors[1]) {
            mkrSideDrawLineProc(context, 10 - d, tw, th)
        }
        context.fill();
        context.restore();
    };
    
    function mkrSideDrawLineProc(context, d, tw, th) {
        const dirTable = {8:[0, th], 6:[tw, 0], 4:[tw, th * 2], 2:[tw * 2, th]};
        if (dirTable[d]) {
            const x1 = dirTable[d][0];
            const y1 = dirTable[d][1];
            const x2 = x1 + tw;
            const y2 = y1 + th;
            context.moveTo(x1, y1);
            context.lineTo(x2, y1);
            context.lineTo(x2, y2);
            context.lineTo(x1, y2);
            context.lineTo(x1, y1);
        }
    }

    //=========================================================================
    // Utility
    //  Defines generic processing.
    //=========================================================================
    function signChange(sign) {
        return sign * -1;
    }

    function getRegionIds() {
        const ArrayRegionId = [];
        if (arguments && arguments.length > 0) {
            const argCount = arguments.length;
            for (let i = 0; i < argCount; i++) {
                if (Array.isArray(arguments[i]) && arguments[i].length > 0) {
                    ArrayRegionId.push(CEC(arguments[i][0]));
                } else if (typeof arguments[i] === "string") {
                    const ary = arguments[i].split("_").filter(function(val){
                        return val !== "" && val !== "0";
                    }).map(function(val) {
                        return parseInt(ConvVb(val), 10);
                    });
                    Array.prototype.push.apply(ArrayRegionId, ary);
                } else if (isFinite(arguments[i])) {
                    ArrayRegionId.push(parseInt(arguments[i], 10));
                }
            }
        }

        return ArrayRegionId.filter(function(val, i, self) {
            return self.indexOf(val) === i && val > 0;
        });
    }

})();