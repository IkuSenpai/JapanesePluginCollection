/*=============================================================================
 AB_FastTravelByItem.js
----------------------------------------------------------------------------
 (C)2021 misty
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/05/03
 1.0.1 2021/07/27 他スクリプトと100%競合するので修正
 1.1.0 2021/11/14 ファストトラベル禁止時、画面で閲覧だけできるか、メニュー時点で禁止にするかをパラメータで指定できるように修正
                  ファストトラベル後の向きを場所毎に指定できるように修正
                  ファストトラベル確認で「はい」選んだ時の効果音を、場所毎に設定できるよう修正
                  ファストトラベルコマンドのメニュー上の位置をパラメータである程度選べるように修正
----------------------------------------------------------------------------
 [HP]   : http://kilisamenosekai.web.fc2.com/
 [Twitter]: https://twitter.com/mistyrain_on_tw/
 =============================================================================*/

/*:
 * @target MZ
 * @plugindesc アイテムによるファストトラベルシステム
 * @author ミスティ
 * @url http://kilisamenosekai.web.fc2.com/
 *
 * @param FastTravelCommandName
 * @text ファストトラベルコマンド名
 * @desc メニューで表示する「ファストトラベル」コマンド名
 * @default ファストトラベル
 * @type string
 *
 * @param FastTravelCommandPosition
 * @text ファストトラベルコマンド位置
 * @desc 0:先頭,1:ステータスの下,2:並び替えの下,3:オプションの下,4:セーブの下,5:ゲーム終了の下
 * @default 0
 * @type number
 *
 * @param FastTravelCategoryName
 * @text ファストトラベルカテゴリ名
 * @desc ファストトラベルを分類する分類名
 * @default ["街","ダンジョン","その他"]
 * @type string[]
 *
 * @param FastTravelCategory
 * @text ファストトラベルカテゴリ
 * @desc アイテムのメモのfastTravelCategoryにこれを指定して分類を設定
 * @default ["town","dungeon","other"]
 * @type string[]
 *
 * @param FastTravelEnableSwitch
 * @text ファストトラベル許可スイッチ
 * @desc ファストトラベルからの移動を許可するスイッチ ONで許可する。
 * @default 2
 * @type number
 *
 * @param FastTravelDisableMode
 * @text ファストラ許可SWOFF時挙動
 * @desc 許可スイッチOFFの時、0の場合、ファストトラベルの画面は閲覧だけできる。1の場合、メニュー上で無効になる。
 * @default 0
 * @type number
 *
 * @param FastTravelConfirmMessage
 * @text ファストトラベル確認メッセージ
 * @desc ファストトラベルする際の確認メッセージ
 * @default この場所へ飛びますか？
 * @type string
 *
 * @param FastTravelConfirmYesNo
 * @text ファストトラベル確認選択肢
 * @desc ファストトラベルするか？の確認で選ぶ選択肢
 * @default ["する","しない"]
 * @type string[]
 *
 * @help AB_FastTravelByItem.js[アイテムによるファストトラベルシステム]
 *
 * アイテムでファストトラベルの情報を作り、選んでワープします
 *
 * アイテムで隠しアイテムAかBなどを作り、メモに下記内容を登録しましょう
 * ==============================================
 * <fastTravelCategory:town>
 * <fastTravelImage:Actor2_1>
 * <fastTravelNote:ニャホヒリペの生まれる場所
 * 適度に伐採しないと異常繁殖してしまうらしい。
 * >
 * <fastTravelLocation:2,24,49,4>
 * <fastTravelSe:Collapse1,50,150,-100>
 * ==============================================
 * fastTravelCategory 街とかダンジョンとか、ファストトラベルの分類です
 * fastTravelImage ファストトラベル詳細に表示する画像を指定 img\picturesの画像ファイル、拡張子なし
 * fastTravelNote ファストトラベル詳細に表示する文章を設定
 * fastTravelLocation ファストトラベルでの移動先を指定　マップID,X座標,Y座標,向き(2,4,6,8で指定,0で今の向きのまま)
 * fastTravelSe ファストトラベル確認で「はい」選んだ時に鳴る効果音を指定。名前,ボリューム,ピッチ,位相。指定しないと普通のOK音。
 * ==============================================
 */
function Window_FastTravelList() {
    this.initialize(...arguments);
}
 (() => {

var parameters = PluginManager.parameters('AB_FastTravelByItem');

var FASTTRAVEL_COMMAND_NAME = parameters['FastTravelCommandName'] ;
var FASTTRAVEL_COMMAND_POSITION = Number(parameters['FastTravelCommandPosition']);
var FASTTRAVEL_CATEGORY_NAME = parameters['FastTravelCategoryName'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;
var FASTTRAVEL_CATEGORY = parameters['FastTravelCategory'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;
var FASTTRAVEL_ENABLE_SWITCH = Number(parameters['FastTravelEnableSwitch']);
var FASTTRAVEL_DISABLE_MODE = Number(parameters['FastTravelDisableMode']);
var FASTTRAVEL_CONFIRM_MESSAGE = parameters['FastTravelConfirmMessage'];
var FASTTRAVEL_CONFIRM_YES_NO = parameters['FastTravelConfirmYesNo'].replace("[","").replace("]","").replace(/"/g,"").split(',') ;


var AB_FSTRVLBYITEM_Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
    if(FASTTRAVEL_COMMAND_POSITION == 0){
      this.addFastTravelCommand();
    }
    AB_FSTRVLBYITEM_Window_MenuCommand_addMainCommands.call(this);
    if(FASTTRAVEL_COMMAND_POSITION == 1){
      this.addFastTravelCommand();
    }
};

var AB_FSTRVLBYITEM_Window_MenuCommand_addFormationCommand = Window_MenuCommand.prototype.addFormationCommand;
Window_MenuCommand.prototype.addFormationCommand = function() {
    AB_FSTRVLBYITEM_Window_MenuCommand_addFormationCommand.call(this);
    if(FASTTRAVEL_COMMAND_POSITION == 2){
      this.addFastTravelCommand();
    }
};

var AB_FSTRVLBYITEM_Window_MenuCommand_addOptionsCommand = Window_MenuCommand.prototype.addOptionsCommand;
Window_MenuCommand.prototype.addOptionsCommand = function() {
    AB_FSTRVLBYITEM_Window_MenuCommand_addOptionsCommand.call(this);
    if(FASTTRAVEL_COMMAND_POSITION == 3){
      this.addFastTravelCommand();
    }
};

var AB_FSTRVLBYITEM_Window_MenuCommand_addSaveCommand = Window_MenuCommand.prototype.addSaveCommand;
Window_MenuCommand.prototype.addSaveCommand = function() {
    AB_FSTRVLBYITEM_Window_MenuCommand_addSaveCommand.call(this);
    if(FASTTRAVEL_COMMAND_POSITION == 4){
      this.addFastTravelCommand();
    }
};

var AB_FSTRVLBYITEM_Window_MenuCommand_addGameEndCommand = Window_MenuCommand.prototype.addGameEndCommand;
Window_MenuCommand.prototype.addGameEndCommand = function() {
    AB_FSTRVLBYITEM_Window_MenuCommand_addGameEndCommand.call(this);
    if(FASTTRAVEL_COMMAND_POSITION == 5){
      this.addFastTravelCommand();
    }
};

Window_MenuCommand.prototype.addFastTravelCommand = function(){
    enabled = this.areMainCommandsEnabled();
    if(FASTTRAVEL_DISABLE_MODE == 1){
        if(!$gameSwitches.value(FASTTRAVEL_ENABLE_SWITCH)){
            enabled = false;
        }
    }
    this.addCommand(FASTTRAVEL_COMMAND_NAME, "fastTravel", enabled);
};

var AB_FSTRVLBYITEM_Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    AB_FSTRVLBYITEM_Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("fastTravel", this.commandFastTravel.bind(this));
};

Scene_Menu.prototype.commandFastTravel = function() {
    SceneManager.push(Scene_FastTravel);
};

//-----------------------------------------------------------------------------
// Scene_FastTravel
//
// The scene class of the item screen.

function Scene_FastTravel() {
    this.initialize(...arguments);
}

Scene_FastTravel.prototype = Object.create(Scene_ItemBase.prototype);
Scene_FastTravel.prototype.constructor = Scene_FastTravel;

Scene_FastTravel.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

Scene_FastTravel.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createCategoryWindow();
    this.createItemWindow();
    this.createDetailWindow();
    this.createConfirmWindow();
    this._saveIndex = -1;
};

Scene_FastTravel.prototype.createCategoryWindow = function() {
    const rect = this.categoryWindowRect();
    this._categoryWindow = new Window_FastTravelCategory(rect);
    this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler("cancel", this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};

Scene_FastTravel.prototype.categoryWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.calcWindowHeight(1, true);
    return new Rectangle(wx, wy, ww, wh);
};

Scene_FastTravel.prototype.createItemWindow = function() {
    const rect = this.itemWindowRect();
    this._itemWindow = new Window_FastTravelList(rect);
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

Scene_FastTravel.prototype.itemWindowRect = function() {
    const wx = 0;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaBottom() - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_FastTravel.prototype.createConfirmWindow = function() {
    const rect = this.conformWindowRect();
    this._confirmWindow = new Window_FastTravelConfirm(rect);
    this._confirmWindow.setHandler("ok", this.onConfirmOk.bind(this));
    this._confirmWindow.setHandler("cancel", this.onConfirmCancel.bind(this));
    this.addWindow(this._confirmWindow);
    this._confirmWindow.visible = false;
};

Scene_FastTravel.prototype.conformWindowRect = function() {
    const wx = 0;
    const wh = 160;
    const wy = Graphics.boxHeight / 2 - wh / 2;
    const ww = Graphics.boxWidth;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_FastTravel.prototype.createDetailWindow = function() {
    const rect = this.detailWindowRect();
    this._detailWindow = new Window_FastTravelDetail(rect);
    this._detailWindow.setHandler("cancel", this.onItemCancel.bind(this));
    this.addWindow(this._detailWindow);
};

Scene_FastTravel.prototype.detailWindowRect = function() {
    const wx = Graphics.boxWidth / 2;
    const wy = this._categoryWindow.y + this._categoryWindow.height;
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaBottom() - wy;
    return new Rectangle(wx, wy, ww, wh);
};

Scene_FastTravel.prototype.onCategoryOk = function() {
    this._saveIndex = -1;
    this._itemWindow.activate();
    this._itemWindow.selectLast();
};
Scene_FastTravel.prototype.onItemOk = function() {
    var selected = this.item();
    if(selected){
        if(selected.meta.fastTravelLocation && $gameSwitches.value(FASTTRAVEL_ENABLE_SWITCH)){
            this._confirmWindow.refresh();
            this._confirmWindow.visible = true;
            this._confirmWindow.select(0);
            this._confirmWindow.activate();
            return ;
        }
    }
    this._itemWindow.activate();
};
Scene_FastTravel.prototype.onItemCancel = function() {
    if (this._categoryWindow.needsSelection()) {
        this._detailWindow.setItem(null);
        this._itemWindow.deselect();
        this._categoryWindow.activate();
    } else {
        this.popScene();
    }
};
Scene_FastTravel.prototype.onConfirmOk = function() {
    if(this._confirmWindow.index() == 0)
    {
        var selected = this.item();
        if( selected.meta.fastTravelLocation ){
            var fastTravelWarp = selected.meta.fastTravelLocation.split(",");
            if( selected.meta.fastTravelSe){
                var fastTravelSe = selected.meta.fastTravelSe.split(",");
                var seObj = AudioManager.makeEmptyAudioObject();
                seObj.name = fastTravelSe[0];
                seObj.volume = Number(fastTravelSe[1]);
                seObj.pitch = Number(fastTravelSe[2]);
                seObj.pan = Number(fastTravelSe[3]);
                AudioManager.playSe(seObj);
            }else{
                SoundManager.playOk();
            }
            $gamePlayer.reserveTransfer(
                Number(fastTravelWarp[0])
                , Number(fastTravelWarp[1])
                , Number(fastTravelWarp[2])
                , Number(fastTravelWarp[3]), 0);
            SceneManager.goto(Scene_Map);    
        }
    }else{
        this.onConfirmCancel();
    }
};
Scene_FastTravel.prototype.onConfirmCancel = function() {
    this._confirmWindow.deselect();
    this._confirmWindow.visible = false;
    this._itemWindow.activate();
};

Scene_FastTravel.prototype.playSeForItem = function() {
    SoundManager.playUseItem();
};

var AB_FSTRVLBYITEM_Scene_FastTravel_update = Scene_FastTravel.prototype.update;
Scene_FastTravel.prototype.update = function(){
    AB_FSTRVLBYITEM_Scene_FastTravel_update.call(this);
    if(this._itemWindow.active){
        if(this._itemWindow.index() != this._saveIndex){
            this._saveIndex = this._itemWindow.index();
            this._detailWindow.setItem(this._itemWindow.item())
        }
    }
    
}
Scene_FastTravel.prototype.helpAreaHeight = function() {
    return 0;
};

//-----------------------------------------------------------------------------
// Window_FastTravelCategory
//
// The window for selecting a category of fastTravel on the fastTravel screens.

function Window_FastTravelCategory() {
    this.initialize(...arguments);
}

Window_FastTravelCategory.prototype = Object.create(Window_HorzCommand.prototype);
Window_FastTravelCategory.prototype.constructor = Window_FastTravelCategory;

Window_FastTravelCategory.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_FastTravelCategory.prototype.maxCols = function() {
    return FASTTRAVEL_CATEGORY_NAME.length;
};

Window_FastTravelCategory.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
    if (this._itemWindow) {
        this._itemWindow.setCategory(this.currentSymbol());
    }
};

Window_FastTravelCategory.prototype.makeCommandList = function() {
    for(var i = 0 ; i< FASTTRAVEL_CATEGORY_NAME.length ; i++){
        this.addCommand(FASTTRAVEL_CATEGORY_NAME[i], FASTTRAVEL_CATEGORY[i]);
    }
};

Window_FastTravelCategory.prototype.needsCommand = function(name) {
    return true;
};

Window_FastTravelCategory.prototype.setItemWindow = function(itemWindow) {
    this._itemWindow = itemWindow;
};

Window_FastTravelCategory.prototype.needsSelection = function() {
    return this.maxItems() >= 2;
};

//-----------------------------------------------------------------------------
// Window_FastTravelList
//
// The window for selecting an fastTravel on the fastTravel screen.

Window_FastTravelList.prototype = Object.create(Window_Selectable.prototype);
Window_FastTravelList.prototype.constructor = Window_FastTravelList;

Window_FastTravelList.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._category = "none";
    this._data = [];
};

Window_FastTravelList.prototype.setCategory = function(category) {
    if (this._category !== category) {
        this._category = category;
        this.refresh();
        this.scrollTo(0, 0);
    }
};

Window_FastTravelList.prototype.maxCols = function() {
    return 1;
};

Window_FastTravelList.prototype.colSpacing = function() {
    return 16;
};

Window_FastTravelList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

Window_FastTravelList.prototype.item = function() {
    return this.itemAt(this.index());
};

Window_FastTravelList.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

Window_FastTravelList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

Window_FastTravelList.prototype.includes = function(item) {
    if(item === null){
        return false;
    }
    if(item.meta.fastTravelCategory === this._category){
        return true;
    }
    return false;
};

Window_FastTravelList.prototype.needsNumber = function() {
    return false;
};

Window_FastTravelList.prototype.isEnabled = function(item) {
    return true;
};

Window_FastTravelList.prototype.makeItemList = function() {
    this._data = $gameParty.allItems().filter(item => this.includes(item));
};

Window_FastTravelList.prototype.selectLast = function() {
    const index = this._data.indexOf($gameParty.lastItem());
    this.forceSelect(index >= 0 ? index : 0);
};
Window_FastTravelList.prototype.drawFastTravelName = function(item, x, y, width) {
    if (item) {
        const textMargin = 4;
        const itemWidth = Math.max(0, width - textMargin);
        this.resetTextColor();
        this.drawItemName(item, x , y, itemWidth);
    }
};
Window_FastTravelList.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    if (item) {
        const rect = this.itemLineRect(index);
        this.changePaintOpacity(this.isEnabled(item));
        this.drawFastTravelName(item, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

Window_FastTravelList.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};

//-----------------------------------------------------------------------------
// Window_FastTravelDetail
//
// The window for displaying fastTravel detail.

function Window_FastTravelDetail() {
    this.initialize(...arguments);
}

Window_FastTravelDetail.prototype = Object.create(Window_Selectable.prototype);
Window_FastTravelDetail.prototype.constructor = Window_FastTravelDetail;

Window_FastTravelDetail.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    this._item = null;
    this.pictureName = null;
    this._sprite = new Sprite(null);
    this._container.addChild(this._sprite);
    this.refresh();
};

Window_FastTravelDetail.prototype.colSpacing = function() {
    return 0;
};

Window_FastTravelDetail.prototype.refresh = function() {
    this.contents.clear();
    if(this._item){
        if(this._item.meta.fastTravelImage){
            const rect = this.itemLineRect(1);
            var bitmap = ImageManager.loadPicture(this._item.meta.fastTravelImage);
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
        if(this._item.meta.fastTravelNote){
            const notes = this._item.meta.fastTravelNote.split('\n');
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
Window_FastTravelDetail.prototype.itemTextAlign = function() {
    return "left";
};

Window_FastTravelDetail.prototype.open = function() {
    this.refresh();
    Window_Selectable.prototype.open.call(this);
};
Window_FastTravelDetail.prototype.setItem = function(item){
    this._item = item;
    this.refresh();
}

//-----------------------------------------------------------------------------
// Window_FastTravelConfirm
//
// The window for selecting a category of fastTravel on the fastTravel screens.

function Window_FastTravelConfirm() {
    this.initialize(...arguments);
}

Window_FastTravelConfirm.prototype = Object.create(Window_Command.prototype);
Window_FastTravelConfirm.prototype.constructor = Window_FastTravelConfirm;

Window_FastTravelConfirm.prototype.initialize = function(rect) {
    Window_HorzCommand.prototype.initialize.call(this, rect);
};

Window_FastTravelConfirm.prototype.update = function() {
    Window_HorzCommand.prototype.update.call(this);
};
var AB_FSTRVLBYITEM_Window_FastTravelConfirm_drawAllItems = Window_FastTravelConfirm.prototype.drawAllItems;
Window_FastTravelConfirm.prototype.drawAllItems = function() {
    var rect = this.itemRect(-1);
    this.drawTextEx(FASTTRAVEL_CONFIRM_MESSAGE, rect.x,rect.y,rect.width);    
    AB_FSTRVLBYITEM_Window_FastTravelConfirm_drawAllItems.call(this);
};
Window_FastTravelConfirm.prototype.makeCommandList = function() {
    for(var i = 0 ; i< FASTTRAVEL_CONFIRM_YES_NO.length ; i++){
        this.addCommand(FASTTRAVEL_CONFIRM_YES_NO[i], i);
    }
};
var AB_FSTRVLBYITEM_Window_FastTravelConfirm_itemRect = Window_FastTravelConfirm.prototype.itemRect;
Window_FastTravelConfirm.prototype.itemRect = function(index) {
    return AB_FSTRVLBYITEM_Window_FastTravelConfirm_itemRect.call(this,index+1);
};

Window_FastTravelConfirm.prototype.needsCommand = function(name) {
    return true;
};

Window_FastTravelConfirm.prototype.needsSelection = function() {
    return this.maxItems() >= 2;
};

Window_FastTravelConfirm.prototype.playOkSound = function() {
    // ここでは音を鳴らさない 楽そうなのでonConfirmOkで鳴らす。
};


})();