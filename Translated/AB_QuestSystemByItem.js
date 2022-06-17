/*=============================================================================
AB_QuestSystemByItem.js
----------------------------------------------------------------------------
 (C)2021 misty
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/05/03
 1.0.1 2021/07/27 他スクリプトと100%競合するので修正
 1.1.0 2021/11/14 クエストワープ禁止時、画面で閲覧だけできるか、メニュー時点で禁止にするかをパラメータで指定できるように修正
                  クエストワープ後の向きを場所毎に指定できるように修正
                  クエストワープ確認で「はい」選んだ時の効果音を、場所毎に設定できるよう修正
                  クエストコマンドのメニュー上の位置をパラメータである程度選べるように修正
                  クエストワープスイッチが機能していなかったので修正
----------------------------------------------------------------------------
 [HP]   : http://kilisamenosekai.web.fc2.com/
 [Twitter]: https://twitter.com/mistyrain_on_tw/
 =============================================================================*/

/*:
 * @target MZ
 * @plugindesc アイテムによるクエストシステム
 * @author ミスティ
 * @url http://kilisamenosekai.web.fc2.com/
 *
 * @param QuestCommandName
 * @text クエストコマンド名
 * @desc メニューで表示する「クエスト」コマンド名
 * @default クエスト
 * @type string
 *
 * @param QuestCommandPosition
 * @text クエストコマンド位置
 * @desc 0:先頭,1:ステータスの下,2:並び替えの下,3:オプションの下,4:セーブの下,5:ゲーム終了の下
 * @default 0
 * @type number
 *
 * @param QuestCategoryName
 * @text クエストカテゴリ名
 * @desc クエストを分類する分類名
 * @default ["メインストーリー","サブイベント","その他"]
 * @type string[]
 *
 * @param QuestCategory
 * @text クエストカテゴリ
 * @desc アイテムのメモのquestCategoryにこれを指定して分類を設定
 * @default ["main_story","sub_event","other"]
 * @type string[]
 *
 * @param QuestPhaseText
 * @text クエスト段階表示テキスト
 * @desc クエストの段階を画面に表示する時、なんと表示するか 発生以降を指定
 * @default ["未受注","受注","成功","失敗","消滅"]
 * @type string[]
 *
 * @param QuestPhaseTextColor
 * @text クエスト段階表示テキスト色
 * @desc クエスト段階表示テキストの色を文章の表示の\C[n]と同じ　nを指定
 * @default ["1","2","4","3","7"]
 * @type number[]
 *
 * @param QuestPhaseIconIndex
 * @text クエスト段階アイコンインデックス
 * @desc クエスト段階を画面上のアイコンでどう表示するか
 * @default ["12","13","29","30","31"]
 * @type number[]
 *
 * @param QuestPhaseSort
 * @text クエスト段階別並び替え
 * @desc クエスト画面で表示するとき、段階で並び替える　どの段階を先頭に表示するかを数字で指定
 * @default ["2,"1","3","4","5"]
 * @type number[]
 *
 * @param QuestWarpSwitch
 * @text クエストワープスイッチ
 * @desc クエスト画面でクエストを選択すると、ワープできます　それを許可をするスイッチ
 * @default 2
 * @type number
 *
 * @param QuestWarpDisableMode
 * @text クエストワープ許可SWOFF時挙動
 * @desc 許可スイッチOFFの時、0の場合、クエストの画面は閲覧だけできる。1の場合、メニュー上で無効になる。
 * @default 0
 * @type number
 *
 * @param QuestWarpOccurrenceConfirmMessage
 * @text 発生クエストワープ確認メッセージ
 * @desc ワープ先を設定したクエストが発生の時、クエスト画面で選択->決定すると、ワープできます　その確認
 * @default 受注地点の近くにワープしますか？
 * @type string
 *
 * @param QuestWarpOccurrenceConfirmYesNo
 * @text 発生クエストワープ確認選択肢
 * @desc ワープ先を設定したクエストが発生の時、クエスト画面で選択->決定すると、ワープできます　その確認で選ぶ選択肢
 * @default ["ワープする","ワープしない"]
 * @type string[]
 *
 * @param QuestWarpReceiveConfirmMessage
 * @text 受注済クエストワープ確認メッセージ
 * @desc ワープ先を設定したクエストが受注済みの時、クエスト画面で選択->決定すると、ワープできます　その確認
 * @default 目標地点の近くにワープしますか？
 * @type string
 *
 * @param QuestWarpReceiveConfirmYesNo
 * @text 受注済クエストワープ確認選択肢
 * @desc ワープ先を設定したクエストが受注済みの時、クエスト画面で選択->決定すると、ワープできます　その確認で選ぶ選択肢
 * @default ["ワープする","ワープしない"]
 * @type string[]
 *
 * @help QuestSystemByItem.js[アイテムによるクエストシステム]
 *
 * アイテムでクエストの情報を作り、ゲーム中メニュー画面でクエストの進行状況を閲覧できます。
 * 管理できるだけです。受注した！とかこんなクエスト受注しますか？とかそういう表示はできません。
 *
 * 現状、クエストは以下の段階が設定できます。
 * どう使うかは自由です。
 * 0:無：プレイヤーからはクエストが見えない段階(初期段階)
 * 1:発生：クエストの受注条件を満たしている段階
 * 2:受注：話を聞くなどしてクエストの受注した段階
 * 3:成功：受注したクエストを無事に達成した
 * 4:失敗：受注したクエストを達成できなかった
 * 5:消滅：話を聞く前にクエストが受注できなくなった
 *
 * アイテムで隠しアイテムAかBなどを作り、メモに下記内容を登録しましょう
 * ==============================================
 * <questCategory:main_story>
 * <questImage:Actor1_6>
 * <questNote:依頼者：ぴょんきち
 * 場所：ナントカの塔
 * 達成条件：ぴょんきちの救出
 * 
 * 助けてぴょん
 * >
 * <questOccurrenceWarp:2,15,31,4>
 * <questReceiveWarp:2,24,49,6>
 * <questWarpSe:Collapse1,50,150,-100>
 * ==============================================
 * questCategory メインストーリーとかサブイベントとか、クエストの分類です
 * questImage クエスト詳細に表示する画像を指定 img\picturesの画像ファイル、拡張子なし
 * questNote クエスト詳細に表示する文章を設定
 * questOccurrenceWarp クエスト発生状態でのワープ先を指定　マップID,X座標,Y座標,向き(2,4,6,8で指定,0で今の向きのまま)
 * questReceiveWarp クエスト受注状態でのワープ先を指定　マップID,X座標,Y座標,向き(2,4,6,8で指定,0で今の向きのまま)
 * questWarpSe クエストワープ確認で「はい」選んだ時に鳴る効果音を指定。名前,ボリューム,ピッチ,位相。指定しないと普通のOK音。
 * ==============================================
 * @command Quest_None
 * @text クエスト無
 * @desc 指定クエストの段階を無に設定する
 *
 * @arg itemId
 * @text アイテムID
 * @desc 無段階にするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Occurrence
 * @text クエスト発生
 * @desc 指定クエストの段階を発生に設定する
 *
 * @arg itemId
 * @text アイテムID
 * @desc 発生段階にするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Receive
 * @text クエスト受注
 * @desc 指定クエストの段階を受注に設定する
 *
 * @arg itemId
 * @text アイテムID
 * @desc 受注段階にするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Success
 * @text クエスト成功
 * @desc 指定クエストの段階を成功に設定する
 *
 * @arg itemId
 * @text アイテムID
 * @desc 成功段階にするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Failure
 * @text クエスト失敗
 * @desc 指定クエストの段階を失敗に設定する
 *
 * @arg itemId
 * @text アイテムID
 * @desc 失敗段階にするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command Quest_Disappear
 * @text クエスト消滅
 * @desc 指定クエストの段階を消滅に設定する
 *
 * @arg itemId
 * @text アイテムID
 * @desc 失敗段階にするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command GetQuestPhase
 * @text クエスト段階取得
 * @desc 指定クエストの段階を指定変数に取得する。0:無,1:発生,2:受注,3:成功:4,失敗:5,消滅:6
 *
 * @arg itemId
 * @text アイテムID
 * @desc 段階を取得するクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * @arg variableId
 * @text ゲーム変数ID
 * @desc クエストの段階をこの変数に取得する
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command IsQuestNone
 * @text クエスト段階は無か？をスイッチに取得
 * @desc 指定クエストの段階が無なら指定スイッチON
 *
 * @arg itemId
 * @text アイテムID
 * @desc 段階をチェックするするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text スイッチID
 * @desc クエストの段階が無ならこのスイッチON それ以外はOFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestOccurrence
 * @text クエスト段階は発生か？をスイッチに取得
 * @desc 指定クエストの段階が発生なら指定スイッチON
 *
 * @arg itemId
 * @text アイテムID
 * @desc 段階をチェックするするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text スイッチID
 * @desc クエストの段階が発生ならこのスイッチON それ以外はOFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestReceive
 * @text クエスト段階は受注か？をスイッチに取得
 * @desc 指定クエストの段階が無なら指定スイッチON
 *
 * @arg itemId
 * @text アイテムID
 * @desc 段階をチェックするするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text スイッチID
 * @desc クエストの段階が受注ならこのスイッチON それ以外はOFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestSuccess
 * @text クエスト段階は成功か？をスイッチに取得
 * @desc 指定クエストの段階が成功なら指定スイッチON
 *
 * @arg itemId
 * @text アイテムID
 * @desc 段階をチェックするするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text スイッチID
 * @desc クエストの段階が成功ならこのスイッチON それ以外はOFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestFailure
 * @text クエスト段階は失敗か？をスイッチに取得
 * @desc 指定クエストの段階が失敗なら指定スイッチON
 *
 * @arg itemId
 * @text アイテムID
 * @desc 段階をチェックするするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text スイッチID
 * @desc クエストの段階が失敗ならこのスイッチON それ以外はOFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 * @command isQuestDisappear
 * @text クエスト段階は無か？をスイッチに取得
 * @desc 指定クエストの段階が消滅なら指定スイッチON
 *
 * @arg itemId
 * @text アイテムID
 * @desc 段階をチェックするするクエストのアイテムのIDを設定
 * @default 0
 * @type number
 *
 * @arg switchId
 * @text スイッチID
 * @desc クエストの段階が消滅ならこのスイッチON それ以外はOFF
 * @default 0
 * @type number
 *
 * ==============================================
 *
 */

function Scene_Quest() {
    this.initialize(...arguments);
}

function Window_QuestList() {
    this.initialize(...arguments);
}
 (() => {

var parameters = PluginManager.parameters('AB_QuestSystemByItem');

var QUEST_COMMAND_NAME = parameters['QuestCommandName'] ;
var QUEST_COMMAND_POSITION = Number(parameters['QuestCommandPosition']);
var QUEST_CATEGORY_NAME = parameters['QuestCategoryName'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;
var QUEST_CATEGORY = parameters['QuestCategory'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;
var QUEST_PHASE_TEXT = parameters['QuestPhaseText'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;
var QUEST_PHASE_TEXT_COLOR = parameters['QuestPhaseTextColor'].replace("[","").replace("]","").split(",");
var QUEST_PHASE_ICON_INDEX = parameters['QuestPhaseIconIndex'].replace("[","").replace("]","").split(",");
var QUEST_PHASE_SORT = parameters['QuestPhaseSort'].replace("[","").replace("]","").split(",");
var QUEST_WARP_SWITCH = Number(parameters['QuestWarpSwitch']);
var QUEST_WARP_DISABLE_MODE = Number(parameters['QuestWarpDisableMode']);
var QUEST_WARP_RECEIVE_CONFIRM_MESSAGE = parameters['QuestWarpReceiveConfirmMessage'];
var QUEST_WARP_RECEIVE_CONFIRM_YES_NO = parameters['QuestWarpReceiveConfirmYesNo'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;
var QUEST_WARP_OCCURRENCE_CONFIRM_MESSAGE = parameters['QuestWarpOccurrenceConfirmMessage'];
var QUEST_WARP_OCCURRENCE_CONFIRM_YES_NO = parameters['QuestWarpOccurrenceConfirmYesNo'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;

var QUEST_PHASE = {"none":0,"occurrence":1,"receive":2,"success":3,"failure":4,"disappear":5};

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
    return false;
};
var QUEST_PHASE = {"none":0,"occurrence":1,"receive":2,"success":3,"failure":4,"disappear":5};
Game_Party.prototype.isQuestNone = function(itemId)
{
    return this.checkQuestPhase(itemId,"none");
}
Game_Party.prototype.isQuestOccurrence = function(itemId)
{
    return this.checkQuestPhase(itemId,"occurrence");
}
Game_Party.prototype.isQuestReceive = function(itemId)
{
    return this.checkQuestPhase(itemId,"receive");
}
Game_Party.prototype.isQuestSuccess = function(itemId)
{
    return this.checkQuestPhase(itemId,"success");
}
Game_Party.prototype.isQuestFailure = function(itemId)
{
    return this.checkQuestPhase(itemId,"failure");
}
Game_Party.prototype.isQuestDisappear = function(itemId)
{
    return this.checkQuestPhase(itemId,"disappear");
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
        if(!$gameSwitches.value(QUEST_WARP_SWITCH)){
            enabled = false;
        }
    }
    this.addCommand(QUEST_COMMAND_NAME, "quest", enabled);
};


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
//
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
    this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
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
    this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
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
};
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
                , Number(questWarp[1])
                , Number(questWarp[2])
                , Number(questWarp[3]), 0);
            SceneManager.goto(Scene_Map);    
        }else if($gameParty.isQuestReceive(selected.id) && selected.meta.questReceiveWarp){
            this.playQuestWarpSe(selected);
            var questWarp = selected.meta.questReceiveWarp.split(",");
            $gamePlayer.reserveTransfer(
                Number(questWarp[0])
                , Number(questWarp[1])
                , Number(questWarp[2])
                , Number(questWarp[3]), 0);
            SceneManager.goto(Scene_Map);    
        }
    }else{
        this.onConfirmCancel();
    }
};

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
        if(this._itemWindow.index() != this._saveIndex){
            this._saveIndex = this._itemWindow.index();
            this._detailWindow.setItem(this._itemWindow.item())
        }
    }
    
}
Scene_Quest.prototype.helpAreaHeight = function() {
    return 0;
};

//-----------------------------------------------------------------------------
// Window_QuestCategory
//
// The window for selecting a category of quest on the quest screens.

function Window_QuestCategory() {
    this.initialize(...arguments);
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
};

//-----------------------------------------------------------------------------
// Window_QuestList
//
// The window for selecting an quest on the quest screen.


Window_QuestList.prototype = Object.create(Window_Selectable.prototype);
Window_QuestList.prototype.constructor = Window_QuestList;

Window_QuestList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._category = "none";
    this._data = [];
};

Window_QuestList.prototype.setCategory = function(category) {
    if (this._category !== category) {
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
    return false;
};

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
};

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
//
// The window for displaying quest detail.

function Window_QuestDetail() {
    this.initialize(...arguments);
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
};
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
//
// The window for selecting a category of quest on the quest screens.

function Window_QuestWarpConfirm() {
    this.initialize(...arguments);
}

Window_QuestWarpConfirm.prototype = Object.create(Window_Command.prototype);
Window_QuestWarpConfirm.prototype.constructor = Window_QuestWarpConfirm;

Window_QuestWarpConfirm.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
    this._mode = QUEST_PHASE["none"];
};

// Window_QuestWarpConfirm.prototype.maxCols = function() {
//     return 2;
// };

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
};
Window_QuestWarpConfirm.prototype.makeCommandList = function() {
    if(this._mode == QUEST_PHASE["occurrence"]){
        for(var i = 0 ; i< QUEST_WARP_OCCURRENCE_CONFIRM_YES_NO.length ; i++){
            this.addCommand(QUEST_WARP_OCCURRENCE_CONFIRM_YES_NO[i], i);
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
};

Window_QuestWarpConfirm.prototype.playOkSound = function() {
    // ここでは音を鳴らさない 楽そうなのでonConfirmOkで鳴らす。
};

})();