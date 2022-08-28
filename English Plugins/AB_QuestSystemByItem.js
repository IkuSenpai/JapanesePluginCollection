/*=============================================================================
AB_QuestSystemByItem.js
----------------------------------------------------------------------------
 (C)2021 misty
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/05/03
 1.0.1 07/27/2021 Fixed 100% conflict with other scripts.
 1.1.0 11/14/2021 Fixed a parameter to specify if quest warp is disabled and only viewable on screen or if it is disabled at the menu.
                  Modified so that the direction after a quest warp can be specified for each location.
                  The sound effect when selecting "Yes" on quest warp confirmation has been modified so that it can be set for each location.
                  Fixed so that you can choose the position of quest commands on the menu to some extent with parameters.
                  Fixed the quest warp switch not working.
----------------------------------------------------------------------------
 [HP] : http://kilisamenosekai.web.fc2.com/
 [Twitter]: https://twitter.com/mistyrain_on_tw/
 =============================================================================*/

/*:
 * @target MZ
 * @plugindesc Quest system with items.
 * @author Misty.
 * @url http://kilisamenosekai.web.fc2.com/
 *
 * @param QuestCommandName
 * @text Quest command name
 * @desc Name of the "Quest" command to display in the menu
 * @default quest
 * @type string
 *
 * @param QuestCommandPosition
 * @text Quest command position
 * @desc 0:at the beginning,1:under status,2:under sort,3:under options,4:under save,5:under exit game
 * @default 0
 * @type number
 *
 * @param QuestCategoryName
 * @text Quest category name.
 * @desc Category name to classify the quest.
 * @default ["Main Story", "Sub-Event", "Other"].
 * @type string[].
 *
 * @param QuestCategory
 * @text Quest category
 * @desc Set the category by specifying this for questCategory in the item's memo.
 * @default ["main_story", "sub_event", "other"].
 * @type string[].
 *
 * @param QuestPhaseText
 * @text Quest phase display text.
 * @desc Specify what to display when displaying the quest phase on the screen after it occurs.
 * @default ["Unordered", "Ordered", "Success", "Failed", "Gone"].
 * @type string[].
 *
 * @param QuestPhaseTextColor
 * @text QuestPhaseTextColor
 * @desc Specify n, the same as C[n] of the text display for the color of the quest phase text.
 * @default ["1", "2", "4", "3", "7"].
 * @type number[].
 *
 * @param QuestPhaseIconIndex
 * @text QuestPhaseIconIndex
 * @desc How the quest phase is displayed as an icon on the screen.
 * @default ["12", "13", "29", "30", "31"].
 * @type number[].
 *
 * @param QuestPhaseSort
 * @text Sort by quest phase.
 * @desc Sort by phase when displayed on quest screen Specify which phase is displayed first by number.
 * @default ["2, "1", "3", "4", "5"].
 * @type number[].
 *
 * @param QuestWarpSwitch
 * @text Quest warp switch.
 * @desc A switch that allows you to warp when you select a quest on the quest screen.
 * @default 2
 * @type number
 *
 * @param QuestWarpDisableMode
 * @text Behavior when quest warp disable switch is OFF.
 * @desc When the permission switch is OFF, 0 means that the quest screen can only be viewed. 1 means that it is disabled on the menu.
 * @default 0
 * @type number
 *
 * @param QuestWarpOccurrenceConfirmMessage
 * @text QuestWarpOccurrenceConfirmMessage
 * @desc When a quest with a set warp destination occurs, you can warp by selecting->deciding on the quest screen.
 * @default Do you want to warp near the order point?
 * @type string
 * @param
 * @param QuestWarpOccurrenceConfirmYesNo
 * @text Quest Warp Occurrence Confirmation Options.
 * @desc When a quest with a warp destination set is triggered, you can warp to it by selecting it on the quest screen and then deciding.
 * @default ["Warp", "Do not warp"].
 * @type string[].
 *
 * @param QuestWarpReceiveConfirmMessage
 * @text QuestWarpReceiveConfirmMessage
 * @desc When a quest with a warp destination set has been ordered, you can warp by selecting->deciding it on the quest screen.
 * @default Do you want to warp near the target location?
 * @type string
 *
 * @param QuestWarpReceiveConfirmYesNo
 * @text Quest Warp Receive Confirmation option.
 * @desc If you have already received a quest with a warp destination set, you can warp to it by selecting it on the quest screen and confirming your decision.
 * @default ["Warp", "Do not warp"].
 * @type string[].
 *
 * @help QuestSystemByItem.js[Quest system by item] *
 *
 * You can create quest information by items, and view quest progress on the in-game menu screen.
 * You can only manage them. Did you receive an order! or "Do you want to accept this quest? or "Do you want to accept this kind of quest?
 * You can only manage quests.
 * Currently, the following levels of quests can be set.
 * * Currently, quests can be set to any of the following levels, and you are free to use them however you like.
 * 0: Nothing: Quests are invisible to the player (initial stage).
 * 1: Occurred: The quest meets the conditions for receiving an order for the quest.
 * 2:Received: You received the quest by listening to the story, etc.
 * 3:Success: You have successfully completed the quest you received.
 * 4:Failure: You failed to complete the quest you received.
 * 5:Disappear: You can no longer receive quests before you hear about them
 *
 * Create a hidden item A or B, etc. with an item and register the following information in the memo!
 * ==============================================
 * <questCategory:main_story>
 * <questImage:Actor1_6>
 * <questNote:Client:Pyonkichi
 * Location: Nantoka's Tower
 * Condition of Achievement: Rescue Pyonkichi
 *
 * Save Pyonkichi.
 * >
 * <questOccurrenceWarp:2,15,31,4>
 * <questReceiveWarp:2,24,49,6>
 * <questWarpSe:Collapse1,50,150,-100>
 * ==============================================
 * questCategory The category of the quest, like main story, sub-event, etc.
 * questImage Specify the image to be displayed in quest details.
 * questNote text to be displayed in quest details
 * questOccurrenceWarp Specify the warp destination when a quest occurs. mapID, X coordinate, Y coordinate, direction (2,4,6,8 to specify, 0 to keep the current direction).
 * questReceiveWarp Specifies the warp destination in quest receive state. mapID,X-coordinate,Y-coordinate,orientation(2,4,6,8,0 to keep the current orientation)
 * questWarpSe The sound effect played when the quest warp is confirmed and "yes" is selected. Name, volume, pitch, phase. If you don't specify it, it's the normal OK sound.
 * ==============================================
 * @command Quest_None
 * @text Quest_None
 * @desc Set the phase of the specified quest to none.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest to be set to no stage.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Occurrence
 * @text Quest_Occurrence
 * @desc Set the specified quest stage to occur.
 *
 * @arg itemId
 * @text item ID
 * @desc Set the ID of the item of the quest to be the stage of the quest to be triggered.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Receive
 * @text receive quest order
 * @desc Set the specified quest stage to receive orders.
 *
 * @arg itemId
 * @text item ID
 * @desc Set the ID of the item of the quest to be the order stage.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Success
 * @text Quest_Success
 * @desc Set the specified quest stage to success.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item in the quest to set the specified quest stage to success.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Failure
 * @text quest_failure
 * @desc Set the specified quest stage to failure.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest to fail stage.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Disappear
 * @text Quest_Disappear
 * @desc Set the specified quest stage to disappear.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest to be set to the failure stage.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command GetQuestPhase
 * @text Get quest phase.
 * @desc Get the specified quest phase in the specified variable. 0:None,1:Occurred,2:Received,3:Succeeded,4:Failed,5:Gone,6
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest to get the stage.
 * @default 0
 * @type number
 *
 * @arg variableId
 * @text game variable ID
 * @desc Get the quest stage into this variable.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command IsQuestNone
 * @text Is the quest stage none? get the switch.
 * @desc If the specified quest has no quest stage, then the specified switch is ON.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest whose stage is to be checked.
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text switch ID
 * @desc If there is no quest stage, this switch is ON, otherwise it is OFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestOccurrence
 * @text Is the quest phase occurring? Get the switch.
 * @desc If the specified quest stage occurred, turn on the specified switch.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the quest item whose stage is to be checked.
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text switch ID
 * @desc If a quest stage occurs, this switch is ON, otherwise it's OFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestReceive
 * @text Is the quest stage an order? get switch.
 * @desc If there is no quest stage for the specified quest, then the specified switch is turned on.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest whose stage is to be checked.
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text switch ID
 * @desc If the quest stage is order, this switch is ON, otherwise it's OFF.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestSuccess
 * @text Is the quest stage successful? Get the switch.
 * @desc If the specified quest stage is a success, turn on the specified switch.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest whose stage is to be checked.
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text switch ID
 * @desc If the quest stage is successful, this switch is ON, otherwise it's OFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestFailure
 * @text Is the quest phase failed? Get the switch.
 * @desc If the specified quest stage is a failure, turn on the specified switch.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest whose stage is to be checked.
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text switch ID
 * @desc If the quest stage is a failure, this switch is on, otherwise it's off.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestDisappear
 * @text Is there no quest stage? getQuestStageDisappear switch.
 * @desc If the specified quest stage disappears, turn on the specified switch.
 *
 * @arg itemId
 * @text itemId
 * @desc Set the ID of the item of the quest whose stage is to be checked.
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text switch ID
 * @desc If the quest stage is annihilation, this switch is ON, otherwise it's OFF.
 * @default 0
 * @type number
 *
 * ==============================================
 *
 */

function Scene_Quest() {
    this.initialize(... .arguments);
}

function Window_QuestList() {
    this.initialize(... .arguments);
}
 (() => {

var parameters = PluginManager.parameters('AB_QuestSystemByItem');

var QUEST_COMMAND_NAME = parameters['QuestCommandName'] ;
var QUEST_COMMAND_POSITION = Number(parameters['QuestCommandPosition']);
var QUEST_CATEGORY_NAME = parameters['QuestCategoryName'].replace("[","").replace("]","").replace(/"/g,"").split(',')) ;
var QUEST_CATEGORY = parameters['QuestCategory'].replace("[","").replace("]","").replace(/"/g,"").split(',')) ;
var QUEST_PHASE_TEXT = parameters['QuestPhaseText'].replace("[","").replace("]","").replace(/"/g,"").split(',')) ;
var QUEST_PHASE_TEXT_COLOR = parameters['QuestPhaseTextColor'].replace("[","").replace("]","").split(","");
var QUEST_PHASE_ICON_INDEX = parameters['QuestPhaseIconIndex'].replace("[","").replace("]","").split(","");
var QUEST_PHASE_SORT = parameters['QuestPhaseSort'].replace("[","").replace("]","").split(","");
var QUEST_WARP_SWITCH = Number(parameters['QuestWarpSwitch']);
var QUEST_WARP_DISABLE_MODE = Number(parameters['QuestWarpDisableMode']);
var QUEST_WARP_RECEIVE_CONFIRM_MESSAGE = parameters['QuestWarpReceiveConfirmMessage'];
var QUEST_WARP_RECEIVE_CONFIRM_YES_NO = parameters['QuestWarpReceiveConfirmYesNo'].replace("[","").replace("]","").replace(/"/g,"").split(',')) ;
var QUEST_WARP_OCCURRENCE_CONFIRM_MESSAGE = parameters['QuestWarpOccurrenceConfirmMessage'];
var QUEST_WARP_OCCURRENCE_CONFIRM_YES_NO = parameters['QuestWarpOccurrenceConfirmYesNo'].replace("[","").replace("]","").replace(/"/g,"").split(',')) ;

var QUEST_PHASE = {"none":0, "occurrence":1, "receive":2, "success":3, "failure":4, "disappear":5};

PluginManager.registerCommand("AB_QuestSystemByItem", "Quest_None", args => {
    $gameParty.setQuestPhase(args.itemId,QUEST_PHASE["none"]);
});
PluginManager.registerCommand("AB_QuestSystemByItem", "Quest_Occurrence", args => {
    $gameParty.setQuestPhase(args.itemId,QUEST_PHASE["occurrence"]);
});
PluginManager.registerCommand("AB_QuestSystemByItem", "Quest_Receive", args => {
    $gameParty.setQuestPhase(args.itemId,QUEST_PHASE["receive"]);
});
PluginManager.registerCommand("AB_QuestSystemByItem", "Quest_Success", args => {
    $gameParty.setQuestPhase(args.itemId,QUEST_PHASE["success"]);
});
PluginManager.registerCommand("AB_QuestSystemByItem", "Quest_Failure", args => {
    $gameParty.setQuestPhase(args.itemId,QUEST_PHASE["failure"]);
});
PluginManager.registerCommand("AB_QuestSystemByItem", "Quest_Disappear", args => {
    $gameParty.setQuestPhase(args.itemId,QUEST_PHASE["disappear"]);
});
PluginManager.registerCommand("AB_QuestSystemByItem", "GetQuestPhase", args => {
    $gameVariables.setValue(args.variableId, $gameParty.getQuestPhase(args.itemId));
});
PluginManager.registerCommand("AB_QuestSystemByItem", "IsQuestNone", args => {
    $gameSwitches.setValue(args.switchId, $gameParty.isQuestNone(args.itemId));
});
PluginManager.registerCommand("AB_QuestSystemByItem", "isQuestOccurrence", args => {
    $gameSwitches.setValue(args.switchId, $gameParty.isQuestOccurrence(args.itemId));
});
PluginManager.registerCommand("AB_QuestSystemByItem", "isQuestReceive", args => {
    $gameSwitches.setValue(args.switchId, $gameParty.isQuestReceive(args.itemId));
});
PluginManager.registerCommand("AB_QuestSystemByItem", "isQuestSuccess", args => {
    $gameSwitches.setValue(args.switchId, $gameParty.isQuestSuccess(args.itemId));
});
PluginManager.registerCommand("AB_QuestSystemByItem", "isQuestFailure", args => {
    $gameSwitches.setValue(args.switchId, $gameParty.isQuestFailure(args.itemId));
});
PluginManager.registerCommand("AB_QuestSystemByItem", "isQuestDisappear", args => {
    $gameSwitches.setValue(args.switchId, $gameParty.isQuestDisappear(args.itemId));
});

Game_Party.prototype.setQuestPhase = function(itemId, newPhase) {
    const item = $dataItems[itemId];
    const container = this.itemContainer(item);
    if (container) {
        container[item.id] = newPhase;
        if (container[item.id] === 0) {
            delete container[item.id];
        }
        $gameMap.requestRefresh();
    }
};
Game_Party.prototype.getQuestPhase = function(itemId) {
    const item = $dataItems[itemId];
    const container = this.itemContainer(item);
    return container ? container[item.id] || 0 : 0;
};
Game_Party.prototype.checkQuestPhase = function(itemId,checkPhase) {
    const getPhase = this.getQuestPhase(itemId);
    if(getPhase == QUEST_PHASE[checkPhase]){
        return true;
    }
    } return false;
};
var QUEST_PHASE = {"none":0, "occurrence":1, "receive":2, "success":3, "failure":4, "disappear":5};
Game_Party.prototype.isQuestNone = function(itemId)
{
    return this.checkQuestPhase(itemId, "none");
}
Game_Party.prototype.isQuestOccurrence = function(itemId)
{
    return this.checkQuestPhase(itemId, "occurrence");
}
Game_Party.prototype.isQuestReceive = function(itemId)
{
    return this.checkQuestPhase(itemId, "receive");
}
Game_Party.prototype.isQuestSuccess = function(itemId)
{
    return this.checkQuestPhase(itemId, "success");
}
Game_Party.prototype.isQuestFailure = function(itemId)
{
    return this.checkQuestPhase(itemId, "failure");
}
Game_Party.prototype.isQuestDisappear = function(itemId)
{
    return this.checkQuestPhase(itemId, "disappear");
}

var AB_QESTSSTMBYITM_Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
    if(QUEST_COMMAND_POSITION == 0){
      this.addQuestCommand();
    }
    AB_QESTSSTMBYITM_Window_MenuCommand_addMainCommands.call(this);
    if(QUEST_COMMAND_POSITION == 1){
      this.addQuestCommand();
    }
};

var AB_QESTSSTMBYITM_Window_MenuCommand_addFormationCommand = Window_MenuCommand.prototype.addFormationCommand;
Window_MenuCommand.prototype.addFormationCommand = function() {
    AB_QESTSSTMBYITM_Window_MenuCommand_addFormationCommand.call(this);
    if(QUEST_COMMAND_POSITION == 2){
      this.addQuestCommand();
    }
};

var AB_QESTSSTMBYITM_Window_MenuCommand_addOptionsCommand = Window_MenuCommand.prototype.addOptionsCommand;
Window_MenuCommand.prototype.addOptionsCommand = function() {
    AB_QESTSSTMBYITM_Window_MenuCommand_addOptionsCommand.call(this);
    if(QUEST_COMMAND_POSITION == 3){
      this.addQuestCommand();
    }
};

var AB_QESTSSTMBYITM_Window_MenuCommand_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
Window_MenuCommand.prototype.addSaveCommand = function() {
    AB_QESTSSTMBYITM_Window_MenuCommand_addSaveCommand.call(this);
    if(QUEST_COMMAND_POSITION == 4){
      this.addQuestCommand();
    }
};

var AB_QESTSSTMBYITM_Window_MenuCommand_addGameEndCommand = Window_MenuCommand.prototype.addGameEndCommand;
Window_MenuCommand.prototype.addGameEndCommand = function() {
    AB_QESTSSTMBYITM_Window_MenuCommand_addGameEndCommand.call(this);
    if(QUEST_COMMAND_POSITION == 5){
      this.addQuestCommand();
    }
};

Window_MenuCommand.prototype.addQuestCommand = function(){
    enabled = this.areMainCommandsEnabled();
    if(QUEST_WARP_DISABLE_MODE == 1){
        if(! $gameSwitches.value(QUEST_WARP_SWITCH)){
            enabled = false;
        }
    }
    this.addCommand(QUEST_COMMAND_NAME, "quest", enabled);
}


var AB_QESTSSTMBYITM_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    AB_QESTSSTMBYITM_Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("quest", this.commandQuest.bind(this));
};

Scene_Menu.prototype.commandQuest = function() {
    SceneManager.push(Scene_Quest);
};

//-----------------------------------------------------------------------------
// Scene_Quest
// Scene_Quest.
// The scene class of the item screen.

Scene_Quest.prototype = Object.create(Scene_ItemBase.prototype);
Scene_Quest.prototype.constructor = Scene_Quest;

Scene_Quest.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_Quest.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createCategoryWindow();
    this.createItemWindow();
    this.createDetailWindow();
    this.createConfirmWindow();
    this._saveIndex = -1;
};

Scene_Quest.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_QuestCategory(rect);
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_Quest.prototype.categoryWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.createItemWindow = function() {
    const rect = this.itemWindowRect();
    this._itemWindow = new Window_QuestList(rect);
    this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
    this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this)); this._itemWindow;
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
    if (!this._categoryWindow.needsSelection()) {
        this._itemWindow.y -= this._categoryWindow.height;
        this._itemWindow.height += this._categoryWindow.height;
        this._categoryWindow.hide();
        this._categoryWindow.deactivate();
        this.onCategoryOk();
    }
};

Scene_Quest.prototype.itemWindowRect = function() {
    const wx = 0;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaBottom() - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.createConfirmWindow = function() {
    const rect = this.conformWindowRect();
    this._confirmWindow = new Window_QuestWarpConfirm(rect);
    this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
    this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this)); this._confirmWindow;
    this.addWindow(this._confirmWindow);
    this._confirmWindow.visible = false;
};

Scene_Quest.prototype.conformWindowRect = function() {
    const wx = 0;
    const wh = 160;
    const wy = Graphics.boxHeight / 2 - wh / 2;
    const ww = Graphics.boxWidth;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.createDetailWindow = function() {
    const rect = this.detailWindowRect();
    this._detailWindow = new Window_QuestDetail(rect);
    this._detailWindow.setHandler("cancel", this.onItemCancel.bind(this));
    this.addWindow(this._detailWindow);
};

Scene_Quest.prototype.detailWindowRect = function() {
    const wx = Graphics.boxWidth / 2;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaBottom() - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_Quest.prototype.onCategoryOk = function() {
    this._saveIndex = -1;
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};
Scene_Quest.prototype.onItemOk = function() {
    var selected = this.item();
    if(selected){
        if(selected.meta.questReceiveWarp && $gameParty.isQuestReceive(selected.id) && $gameSwitches.value(QUEST_WARP_SWITCH)){
            this._confirmWindow.setMode(QUEST_PHASE["receive"]);
            this._confirmWindow.refresh();
            this._confirmWindow.visible = true;
            this._confirmWindow.select(0);
            this._confirmWindow.activate();
            return ;
        }else if(selected.meta.questOccurrenceWarp && $gameParty.isQuestOccurrence(selected.id) && $gameSwitches.value(QUEST_WARP_SWITCH)){
            this._confirmWindow.setMode(QUEST_PHASE["occurrence"]);
            this._confirmWindow.refresh();
            this._confirmWindow.visible = true;
            this._confirmWindow.select(0);
            this._confirmWindow.activate();
            return ;
        }
    }
    this._itemWindow.activate();
}
Scene_Quest.prototype.onItemCancel = function() {
    if (this._categoryWindow.needsSelection()) {
        this._detailWindow.setItem(null);
        this._itemWindow.deselect();
        this._categoryWindow.activate();
    } else {
        this.popScene();
    }
};
Scene_Quest.prototype.onConfirmOk = function() {
    if(this._confirmWindow.index() == 0)
    {
        var selected = this.item();
        if($gameParty.isQuestOccurrence(selected.id) && selected.meta.questOccurrenceWarp){
            this.playQuestWarpSe(selected);
            var questWarp = selected.meta.questOccurrenceWarp.split(",");
            $gamePlayer.reserveTransfer(
                Number(questWarp[0])
                Number(questWarp[1])
                Number(questWarp[1]) , Number(questWarp[2])
                Number(questWarp[3]), 0);
            SceneManager.goto(Scene_Map);
        }else if($gameParty.isQuestReceive(selected.id) && selected.meta.questReceiveWarp){
            this.playQuestWarpSe(selected);
            var questWarp = selected.meta.questReceiveWarp.split(",");
            $gamePlayer.reserveTransfer(
                Number(questWarp[0])
                Number(questWarp[1])
                Number(questWarp[1]) , Number(questWarp[2])
                Number(questWarp[3]), 0);
            SceneManager.goto(Scene_Map);
        }
    }else{
        this.onConfirmCancel();
    }
}

Scene_Quest.prototype.playQuestWarpSe = function(selected) {
    if( selected.meta.questWarpSe){
        var questWarpSe = selected.meta.questWarpSe.split(",");
        var seObj = AudioManager.makeEmptyAudioObject();
        seObj.name = questWarpSe[0];
        seObj.volume = Number(questWarpSe[1]);
        seObj.pitch = Number(questWarpSe[2]);
        seObj.pan = Number(questWarpSe[3]);
        AudioManager.playSe(seObj);
    }else{
        SoundManager.playOk();
    }
};

Scene_Quest.prototype.onConfirmCancel = function() {
    this._confirmWindow.deselect();
    this._confirmWindow.visible = false;
    this._itemWindow.activate();
};

Scene_Quest.prototype.playSeForItem = function() {
    SoundManager.playUseItem();
};

var AB_QESTSSTMBYITM_Scene_Quest_update = Scene_Quest.prototype.update;
Scene_Quest.prototype.update = function(){
    AB_QESTSSTMBYITM_Scene_Quest_update.call(this);
    if(this._itemWindow.active){
        if(this._itemWindow.index() ! = this._saveIndex){
            this._saveIndex = this._itemWindow.index();
            this._detailWindow.setItem(this._itemWindow.item())
        }
    }


    
}
Scene_Quest.prototype.helpAreaHeight = function() {
    return 0;
}

//-----------------------------------------------------------------------------
// Window_QuestCategory
// Window_QuestCategory
// The window for selecting a category of quest on the quest screens.

function Window_QuestCategory() {
    this.initialize(... .arguments);
}

Window_QuestCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_QuestCategory.prototype.constructor = Window_QuestCategory;

Window_QuestCategory.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_QuestCategory.prototype.maxCols = function() {
    return QUEST_CATEGORY_NAME.length;
};

Window_QuestCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_QuestCategory.prototype.makeCommandList = function() {
    for(var i = 0 ; i< QUEST_CATEGORY_NAME.length ; i++){
        this.addCommand(QUEST_CATEGORY_NAME[i], QUEST_CATEGORY[i]);
    }
};

Window_QuestCategory.prototype.needsCommand = function(name) {
    return true;
};

Window_QuestCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Window_QuestCategory.prototype.needsSelection = function() {
    return this.maxItems() >= 2;
}

//-----------------------------------------------------------------------------
// Window_QuestList
// Window_QuestList
// The window for selecting an quest on the quest screen.


Window_QuestList.prototype = Object.create(Window_Selectable.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;

Window_QuestList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._category = "none";
    this._data = [];
};

Window_QuestList.prototype.setCategory = function(category) {
    if (this._category ! == category) {
        this._category = category;
        this.refresh();
        this.scrollTo(0, 0);
    }
};

Window_QuestList.prototype.maxCols = function() {
    return 1;
};

Window_QuestList.prototype.colSpacing = function() {
    return 16;
};

Window_QuestList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_QuestList.prototype.item = function() {
    return this.itemAt(this.index());
};

Window_QuestList.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_QuestList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

Window_QuestList.prototype.includes = function(item) {
    if(item === null){
        return false;
    }
    if(item.meta.questCategory === this._category){
        return true;
    }
    } return false;
}

Window_QuestList.prototype.needsNumber = function() {
    return false;
};

Window_QuestList.prototype.isEnabled = function(item) {
    return true;
};

Window_QuestList.prototype.makeItemList = function() {
    this._data = [];
    for(var i = 0; i < QUEST_PHASE_SORT.length ;i++)
    {
        var data = $gameParty.allItems().filter(item => this.includes(item)
         && $gameParty.getQuestPhase(item.id) == Number(QUEST_PHASE_SORT[i].replace(/"/g, '')));
        for(var j = 0 ; j < data.length; j++){
            this._data.push(data[j]);
        }
    }
    if (this.includes(null)) {
        this._data.push(null);
    }
}

Window_QuestList.prototype.selectLast = function() {
    const index = this._data.indexOf($gameParty.lastItem());
    this.forceSelect(index >= 0 ? index : 0);
};
Window_QuestList.prototype.drawQuestName = function(item, x, y, width) {
    if (item) {
        const textMargin = 4;
        const itemWidth = Math.max(0, width - textMargin);
        this.resetTextColor();
        this.drawItemName(item, x , y, itemWidth);
        const phase = $gameParty.getQuestPhase(item.id)-1;
        if(QUEST_PHASE_ICON_INDEX[phase])
        {
            const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
            this.drawIcon(QUEST_PHASE_ICON_INDEX[phase].replace(/"/g, ''), x, iconY);
        }
    }
};
Window_QuestList.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    if (item) {
        const rect = this.itemLineRect(index);
        this.changePaintOpacity(this.isEnabled(item));
        this.drawQuestName(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

Window_QuestList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};

//-----------------------------------------------------------------------------
// Window_QuestDetail
// Window_QuestDetail
// The window for displaying quest detail.

function Window_QuestDetail() {
    this.initialize(... .arguments);
}

Window_QuestDetail.prototype = Object.create(Window_Selectable.prototype);
Window_QuestDetail.prototype.constructor = Window_QuestDetail;

Window_QuestDetail.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._item = null;
    this.pictureName = null;
    this._sprite = new Sprite(null);
    this._container.addChild(this._sprite);
    this.refresh();
};

Window_QuestDetail.prototype.colSpacing = function() {
    return 0;
};

Window_QuestDetail.prototype.refresh = function() {
    this.contents.clear();
    if(this._item){
        if(this._item.meta.questImage){
            const rect = this.itemLineRect(1);
            var bitmap = ImageManager.loadPicture(this._item.meta.questImage);
            this._sprite.bitmap = bitmap;
            this._sprite.opacity = 128;
            this._sprite.x = rect.x;
            this._sprite.y = rect.y;
        }else{
            this._sprite.bitmap = null;
        }
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(true);
        var lineNumber = 0;
        const phase = $gameParty.getQuestPhase(this._item.id)-1;
        if(QUEST_PHASE_TEXT[phase])
        {
            const rect = this.itemLineRect(lineNumber);
            if(QUEST_PHASE_TEXT_COLOR[phase])
            {
                this.drawTextEx("\\C["+(QUEST_PHASE_TEXT_COLOR[phase].replace(/"/g, ''))+"]"+QUEST_PHASE_TEXT[phase], rect.x, rect.y, rect.width, align);
            }else{
                this.drawTextEx(QUEST_PHASE_TEXT[phase], rect.x, rect.y, rect.width, align);
            }
            lineNumber+=1;
        }
        if(this._item.meta.questNote){
            const notes = this._item.meta.questNote.split('\n');
            for(var i = 0;i<notes.length;i++)
            {
                const rect = this.itemLineRect(lineNumber);
                this.drawTextEx(notes[i], rect.x, rect.y, rect.width, align);
                lineNumber+=1;
            }
        }
    }else{
            this._sprite.bitmap = null;
    }
}
Window_QuestDetail.prototype.itemTextAlign = function() {
    return "left";
};
Window_QuestDetail.prototype.value = function() {
    return $gameParty.gold();
};

Window_QuestDetail.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};
Window_QuestDetail.prototype.setItem = function(item){
    this._item = item;
    this.refresh();
}

//-----------------------------------------------------------------------------
// Window_QuestWarpConfirm
// Window_QuestWarpConfirm
// The window for selecting a category of quest on the quest screens.

function Window_QuestWarpConfirm() {
    this.initialize(... .arguments);
}

Window_QuestWarpConfirm.prototype = Object.create(Window_Command.prototype);
Window_QuestWarpConfirm.prototype.constructor = Window_QuestWarpConfirm;

Window_QuestWarpConfirm.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
    this._mode = QUEST_PHASE["none"];
};

// Window_QuestWarpConfirm.prototype.maxCols = function() {
// return 2;
// }

Window_QuestWarpConfirm.prototype.setMode = function(mode) {
    this._mode = mode;
};
Window_QuestWarpConfirm.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
};
var AB_QESTSSTMBYITM_Window_QuestWarpConfirm_drawAllItems = Window_QuestWarpConfirm.prototype.drawAllItems;
Window_QuestWarpConfirm.prototype.drawAllItems = function() {
    if(this._mode == QUEST_PHASE["occurrence"]){
        var rect = this.itemRect(-1);
        this.drawTextEx(QUEST_WARP_OCCURRENCE_CONFIRM_MESSAGE, rect.x,rect.y,rect.width);
    }else if(this._mode == QUEST_PHASE["receive"]){
        var rect = this.itemRect(-1);
        this.drawTextEx(QUEST_WARP_RECEIVE_CONFIRM_MESSAGE, rect.x,rect.y,rect.width);
    }
    AB_QESTSSTMBYITM_Window_QuestWarpConfirm_drawAllItems.call(this);
}
Window_QuestWarpConfirm.prototype.makeCommandList = function() {
    if(this._mode == QUEST_PHASE["occurrence"]){
        for(var i = 0 ; i< QUEST_WARP_OCCURRENCE_CONFIRM_YES_NO.length ; i++){
            this.addCommand(QUEST_WARP_OCCURRENCE_OCCURRENCE_CONFIRM_YES_NO[i], i);
        }
    }else if(this._mode == QUEST_PHASE["receive"]){
        for(var i = 0 ; i< QUEST_WARP_RECEIVE_CONFIRM_YES_NO.length ; i++){
            this.addCommand(QUEST_WARP_RECEIVE_CONFIRM_YES_NO[i], i);
        }
    }
};
var AB_QESTSSTMBYITM_Window_QuestWarpConfirm_itemRect = Window_QuestWarpConfirm.prototype.itemRect;
Window_QuestWarpConfirm.prototype.itemRect = function(index) {
    return AB_QESTSSTMBYITM_Window_QuestWarpConfirm_itemRect.call(this,index+1);
};

Window_QuestWarpConfirm.prototype.needsCommand = function(name) {
    return true;
};

Window_QuestWarpConfirm.prototype.needsSelection = function() {
    return this.maxItems() >= 2;
}

Window_QuestWarpConfirm.prototype.playOkSound = function() {
    // No sound here. It looks easy, so we'll play it onConfirmOk.
};

})();