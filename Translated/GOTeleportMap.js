/*:
 * @plugindesc teleport Plugin between mapping
 * @author GrayOgre
 * @help
 * It has the teleport distitation chosen from a list and makes a player character teleport.
 * It is possible to have more than one list of the telepot front as a group.
 *
 * This plugin is composed of six plugin commands.
 * + Tereport execution
 * + A teleport distitation registration
 * + It registers present location as a teleport distitation.
 * + Establishment of a sound effect of the time of a teleport 
 * + A teleport distitation deletion
 * + A teleport distitation by player's choice
 *
 * By a Ctrl Key / button 4 of gamepadl / ong-tap,
 * It is posnsible to change the display sequence of an item in teleport front list.
 * ( registration order / name order / coordinates order )
 *
 * To use this plugin
 * It is necessary to use official plugin PluginCommonBase.js
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 * Version 1.3.2
 *
 * @orderafter PluginCommonBase
 *
 * @param maxLocationGroupId
 *   @text  Number of teleport front groups
 *   @desc Number of teleport front groups to manage
 *   @Type number
 *   @Default 1
 *   @min 1
 * @param orderNameByEntry
 *   @text Displayname of registration order
 *   @desc the displayname that shows registration order by the order menu.
 *   @Type string
 *   @default Registration order
 * @param orderNameByName
 *   @text Displayname of name order
 *   @desc the displayname that shows name order by an order menu.
 *   @type string
 *   @default Name order
 * @param orderNameByCoordinate
 *   @text Displayname of coordinates order
 *   @desc the displayname that shows coordinates order by an order menu
 *   @type string
 *   @default Coordinates order
 *
 * @command teleport
 *   @text Teleport
 *   @desc It makes a teleport destination chosen from a list and makes player character teleport.
 *   @arg groupId
 *     @text Group ID
 *     @desc ID of a targetting teleport distitation group ( 1 - count of teleport distitation group )
 *     @type number
 *     @default 1
 *   @arg guideText
 *     @text Guidance message
 *     @desc Guidance message of a teleport distitation list ( " Where does it go? " and so on )
 *     @type string
 *   @arg hideCurrentMap
 *     @text Hide destination in the current map
 *     @desc It excludes from a list the destination in the map which the player is at present in.
 *     @type boolean
 *     @default false
 *   @arg noDestinationMsg
 *     @text No distitation message.
 *     @desc Message when there isn't one destitation ( it displays an empty list in case of a empty string )
 *     @type string
 *     @default
 *   @arg inhibitOrderChange
 *     @text Inhibit of change destination list order
 *     @desc Reorder the destination list by the player is prohibited.
 *     @type boolean
 *     @default false
 *   @arg initialOrder
 *     @text Initial Order of the destination list
 *     @desc The Distination list order at display beginning.
 *     @type select
 *     @option Without the specification
 *       @value
 *     @option Registration order
 *       @value entry
 *     @option Name order
 *       @value name
 *     @option Coordinates order
 *       @value coordinate
 *     @default
 *
 * @command addLocation
 *   @text teleport distitation addition
 *   @desc It adds the teleport distitation to a specification group. A teleport distitation is overwritten when additional in the same name.
 *   @arg groupId
 *     @text Group ID
 *     @desc ID of a targetting teleport distitation group ( 1 - count of teleport distitation group )
 *     @type number
 *     @default 1
 *   @arg Name
 *     @text Name of the distitation
 *     @desc Name of the teleport distitation to register for
 *     @type string
 *   @arg mapid
 *     @text Map ID
 *     @desc Map ID of the teleport distitation to register for
 *     @type number
 *   @arg x
 *     @Text X coordinates
 *     @desc X-coordinate of the teleport distitation to register for
 *     @type number
 *   @arg y
 *     @Text Y coordinates
 *     @desc Y-coordinate of the teleport distitation to register for
 *     @type number
 *   @arg direction
 *     @text Direction
 *     @desc Character direction after it teleported
 *     @type select
 *     @option Just as it is.
 *       @value 0
 *     @option Down
 *       @value 2
 *     @option Left
 *       @value 4
 *     @option Right
 *       @value 6
 *     @option Up
 *       @value 8
 *     @default 0
 *   @arg fadeout
 *     @text Fadeout
 *     @desc Type of a fadeout
 *     @type select
 *     @option Black
 *       @value 0
 *     @option White
 *       @value 1
 *     @option No fadeout
 *       @value 2
 *     @default 0
 *   @arg isDeletable
 *     @text Possible to delete.
 *     @desc Establishment about whether or not it is possible to delete
 *     @type boolean
 *     @default false
 *
 * @Command addCurrentLocation
 *   @text Add current location to destinastion list 
 *   @desc It registers the name of the teleport distitation on a specification group, doing an auto-generation, from the present location ( it uses the displayname of map )
 *   @arg groupId
 *     @text Group ID
 *     @desc ID of a targetting teleport distitation group ( 1 - count of teleport distitation group )
 *     @type number
 *     @default 1
 *   @arg isDeletable
 *    @text Possible to delete.
 *    @desc Establishment about whether or not it is possible to delete
 *    @type boolean
 *    @default false
 *
 * @Command setSE
 *   @text Set a sound effect
 *   @desc It registered a sound effect at a teleport.
 *   @arg groupId
 *     @text Group ID
 *     @desc ID of a targetting teleport distitation group ( 1 - count of teleport distitation group )
 *     @type number
 *     @default 1
 *   @arg name
 *     @text SE name
 *     @desc Name of SE at a time of teleport.
 *     @type file
 *     @dir audio/se
 *   @arg volume
 *     @text Volume
 *     @desc Volume of SE
 *     @type number
 *     @default 90
 *   @arg pitch
 *     @text Pitch
 *     @desc Pitch of SE
 *     @type number
 *     @default 100
 *   @arg pan
 *     @text Pan
 *     @desc Pan of SE
 *     @type number
 *     @default 0
 *
 * @command deleteLocation
 *   @text Teleport distitation deletion
 *   @desc It deletes the teleport distitation of a specified name.
 *   @arg groupId
 *     @text Group ID
 *     @desc ID of a targetting teleport distitation group ( 1 - count of teleport distitation group )
 *     @type number
 *     @default 1
 *   @arg Name
 *     @text Name of the distitation
 *     @desc Name of the teleport distitation to delete
 *     @type string
 *   @arg forceDelete
 *     @text Compulsion deletion
 *     @desc It delete the teleport distination where deletion is prohibited.
 *     @type boolean
 *     @default false
 *
 * @command deleteLocationBySelect
 *   @text Distitation deletion by a choice of the player
 *   @desc It deletes the teleport distitation chosen from a list by the player.
*    @arg groupId
 *     @text Group ID
 *     @desc ID of a targetting teleport distitation group ( 1 - count of teleport distitation group )
 *     @type number
 *     @default 1
 *   @arg guideText
 *     @text Guidance message
 *     @desc Guidance message of a teleport distitation list ( " Which does it delete " and so on )
 *     @type string
 *   @arg inhibitOrderChange
 *     @text Inhibit of change destination list order
 *     @desc Reorder the destination list by the player is prohibited.
 *     @type boolean
 *     @default false
 *   @arg initialOrder
 *     @text Initial Order of the destination list
 *     @desc The Distination list order at display beginning.
 *     @type select
 *     @option Without the specification
 *       @value
 *     @option Registration order
 *       @value entry
 *     @option Name order
 *       @value name
 *     @option Coordinates order
 *       @value coordinate
 *     @default
 */

/*:ja
 * @target MZ
 * @plugindesc マップ間転移プラグイン
 * @author GrayOgre
 * @help
 * 転移先を一覧から選ばせて、プレイヤーキャラを転移させます。
 * 転移先の一覧はグループとして複数持つことが出来ます。
 * 
 * このプラグインは６つのプラグインコマンドで構成されています。
 * ・転移実行
 * ・転移位置登録
 * ・現在位置を転移位置として登録
 * ・転移時効果音の設定
 * ・転移先削除
 * ・選択による転移先削除
 * 
 * 転移先一覧では、Ctrlキー/ゲームコントローラーのボタン４/ロングタップにより、
 * 項目の表示順を変更できます。
 * （登録順/名前順/座標順）
 * 
 * このプラグインを使用するためには、
 * あらかじめ公式プラグイン PluginCommonBase.js を組み込んでおく必要があります。
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 * Version 1.3.2
 * 
 * @orderAfter PluginCommonBase
 * 
 * @param maxLocationGroupId
 *   @text 転移先グループ数
 *   @desc 管理する転移先グループの数
 *   @type number
 *   @default 1
 *   @min 1
 * @param orderNameByEntry
 *   @text 順序名（登録順）
 *   @desc 順序メニューでの登録順を表す表示名
 *   @type string
 *   @default 登録順
 * @param orderNameByName
 *   @text 順序名（名前順）
 *   @desc 順序メニューでの名前順を表す表示名
 *   @type string
 *   @default 名前順
 * @param orderNameByCoordinate
 *   @text 順序名（座標順）
 *   @desc 順序メニューでの座標順を表す表示名
 *   @type string
 *   @default 座標順
 *
 * @command teleport
 *   @text 転移
 *   @desc 転移位置を一覧から選択させて転移させます。
 *   @arg groupId
 *     @text 転移先グループID
 *     @desc 対象とする転移先グループのID(1～転移先グループ数)
 *     @type number
 *     @default 1
 *   @arg guideText
 *     @text ガイドメッセージ
 *     @desc 転移先一覧のガイドメッセージ（「どこへ行きますか？」など）
 *     @type string
 *   @arg hideCurrentMap
 *     @text 現在のマップを非表示
 *     @desc 現在いるマップの飛び先を一覧から除外する
 *     @type boolean
 *     @default false
 *   @arg noDestinationMsg
 *     @text 転移先なしのメッセージ
 *     @desc 転移先が1つもない場合のメッセージ(空文字列の場合、空の一覧を表示)
 *     @type string
 *     @default
 *   @arg inhibitOrderChange
 *     @text 並び替え禁止
 *     @desc プレイヤーによる一覧の並び替えを禁止する
 *     @type boolean
 *     @default false
 *   @arg initialOrder
 *     @text 初期並び替え順
 *     @desc 表示開始時の並び替え順
 *     @type select
 *     @option 指定なし
 *       @value 
 *     @option 登録順
 *       @value entry
 *     @option 名前順
 *       @value name
 *     @option 座標順
 *       @value coordinate
 *     @default
 * 
 * @command addLocation
 *   @text 転移先追加
 *   @desc 転移先を指定グループに追加します。同じ名前で追加すると転移先位置が上書きされます。
 *   @arg groupId
 *     @text 転移先グループID
 *     @desc 対象とする転移先グループのID(1～転移先グループ数)
 *     @type number
 *     @default 1
 *   @arg name
 *     @text 転移先の名前
 *     @desc 登録する転移先の名前
 *     @type string
 *   @arg mapid
 *     @text マップID
 *     @desc 登録する転移先のマップID
 *     @type number
 *   @arg x
 *     @text X座標
 *     @desc 登録する転移先のX座標
 *     @type number
 *   @arg y
 *     @text Y座標
 *     @desc 登録する転移先のY座標
 *     @type number
 *   @arg direction
 *     @text 向き
 *     @desc 転移したあとの向き
 *     @type select
 *     @option そのまま
 *       @value 0
 *     @option 下
 *       @value 2
 *     @option 左
 *       @value 4
 *     @option 右
 *       @value 6
 *     @option 上
 *       @value 8
 *     @default 0
 *   @arg fadeout
 *     @text フェードアウト
 *     @desc フェードアウトのタイプ
 *     @type select
 *     @option 黒
 *       @value 0
 *     @option 白
 *       @value 1
 *     @option なし
 *       @value 2
 *     @default 0
 *   @arg isDeletable
 *     @text 削除可能
 *     @desc 削除ができるかの設定
 *     @type boolean
 *     @default false
 * 
 * @command addCurrentLocation
 *   @text 現在位置を転移先に追加
 *   @desc 転移先の名前を現在位置から自動生成して指定グループに登録します（マップの表示名を使用します）
 *   @arg groupId
 *     @text 転移先グループID
 *     @desc 対象とする転移先グループのID(1～転移先グループ数)
 *     @type number
 *     @default 1
 *   @arg isDeletable
 *     @text 削除可能
 *     @desc 削除ができるかの設定
 *     @type boolean
 *     @default false
 * 
 * @command setSE
 *   @text 効果音の設定
 *   @desc 転移時の効果音を設定する
 *   @arg groupId
 *     @text 転移先グループID
 *     @desc 対象とする転移先グループのID(1～転移先グループ数)
 *     @type number
 *     @default 1
 *   @arg name
 *     @text SE名
 *     @desc SEの名称
 *     @type file
 *     @dir audio/se
 *   @arg volume
 *     @text 音量
 *     @desc SEの音量
 *     @type number
 *     @default 90
 *   @arg pitch
 *     @text ピッチ
 *     @desc SEのピッチ
 *     @type number
 *     @default 100
 *   @arg pan
 *     @text 位相
 *     @desc SEの位相
 *     @type number
 *     @default 0
 *
 * @command deleteLocation
 *   @text 転移先削除
 *   @desc 指定された名前の転移先を削除します
 *   @arg groupId
 *     @text 転移先グループID
 *     @desc 対象とする転移先グループのID(1～転移先グループ数)
 *     @type number
 *     @default 1
 *   @arg name
 *     @text 転移先の名前
 *     @desc 削除する転移先の名前
 *     @type string
 *   @arg forceDelete
 *     @text 強制削除
 *     @desc 削除が禁止されている転移先の削除を許可するかどうか？
 *     @type boolean
 *     @default false
 *
 * @command deleteLocationBySelect
 *   @text 選択による転移先削除
 *   @desc 一覧から選択された転移先を削除します。
 *   @arg groupId
 *     @text 転移先グループID
 *     @desc 対象とする転移先グループのID(1～転移先グループ数)
 *     @type number
 *     @default 1
 *   @arg guideText
 *     @text ガイドメッセージ
 *     @desc 転移先一覧のガイドメッセージ（「どれを削除しますか」など）
 *     @type string
 *   @arg inhibitOrderChange
 *     @text 並び替え禁止
 *     @desc プレイヤーによる一覧の並び替えを禁止する
 *     @type boolean
 *     @default false
 *   @arg initialOrder
 *     @text 初期並び替え順
 *     @desc 表示開始時の並び替え順
 *     @type select
 *     @option 指定なし
 *       @value 
 *     @option 登録順
 *       @value entry
 *     @option 名前順
 *       @value name
 *     @option 座標順
 *       @value coordinate
 *     @default
 */

(()=>{
    'use strict';

    const params = PluginManagerEx.createParameter(document.currentScript);

    let $teleportLocations = [];
    let $sortedLocations = [];
    let $guideText = '';
    let $gameLocationGroups = null;
    let $teleportSE = null;
    const $locationGroupCount = params.maxLocationGroupId;
    let $isDeleteMode = false;
    let $currentGroupIndex = 0;
    let $inhibitOrderChange = false;

    const $orderSymbols = { entry: "entry", name: "name", coordinate: "coordinate" };

    class LocationInfo {
        constructor(name, mapid, x, y, direction, fadeout, isDeletable) {
            this.name = name;
            this.mapid = mapid;
            this.x = x;
            this.y = y;
            this.iconIndex = 0;
            this.direction = direction;
            this.fadeout = fadeout;
            this.isDeletable = isDeletable
        }
    }
    
    class TeleportSE {
        constructor(name, volume, pitch, pan) {
            this.name = name;
            this.volume = volume;
            this.pitch = pitch;
            this.pan = pan;
        }
    }

    class Game_LocationGroups {
        constructor(groupNum) {
            this._groupNum = groupNum;
            this._groups = [];
            this._soundEffects = [];
            this._orderTypes = [];
            for (let i = 0; i < this._groupNum; i++) {
                this._groups.push([]);
                this._soundEffects.push(new TeleportSE("", 90, 100, 0));
                this._orderTypes.push($orderSymbols.entry);
            }
        } 
    }

    function getLocationGroup(locationGroups, groupId) {
        const index = groupId - 1;
        if (index < 0 || locationGroups._groupNum <= index) {
            throw new Error('GOTereportMap : groupId is out of range');
        }
        return locationGroups._groups[index];
    }
 
    function deleteLocationFromGroups(locationGroups, groupIndex, deleteLocName) {
        if (groupIndex < 0 || locationGroups._groupNum <= groupIndex) {
            throw new Error('GOTereportMap : groupId is out of range');
        }
        const deletedGroup = locationGroups._groups[groupIndex].filter((value) => {
            return (value.name !== deleteLocName);
        });
        locationGroups._groups[groupIndex] = deletedGroup;
    }

    function sortLocationGroup(index) {
        const loc = $sortedLocations[index];
        switch ($gameLocationGroups._orderTypes[$currentGroupIndex]) {
            case $orderSymbols.entry:
                $sortedLocations = Array.from($teleportLocations);
                break;
            case $orderSymbols.name:
                $sortedLocations = Array.from($teleportLocations);
                $sortedLocations.sort((l,r) => {
                    if (l.name < r.name) {
                        return -1;
                    }
                    if (l.name > r.name) {
                        return 1
                    }
                    return 0;
                });
                break;
            case $orderSymbols.coordinate:
                $sortedLocations = Array.from($teleportLocations);
                $sortedLocations.sort((l,r) => {
                    if (l.mapid < r.mapid) {
                        return -1;
                    }
                    if (l.mapid > r.mapid) {
                        return 1
                    }
                    if (l.x < r.x) {
                        return -1;
                    }
                    if (l.x > r.x) {
                        return 1;
                    }
                    return 0;
                    if (l.y < r.y) {
                        return -1;
                    }
                    if (l.y > r.y) {
                        return 1;
                    }
                });
                break;
            default:
                throw new Error('GOTereportMap : invalid order type');
        }
        if (loc) {
            let index = $sortedLocations.findIndex((value, index, obj) => {
                return (value.name === loc.name);
            });
            if  (index < 0) {
                index = 0;
            }
            return index;
        }
        return 0;
    }

    const createDataObjects_func = DataManager.createGameObjects;
    DataManager.createGameObjects = (() => {
        createDataObjects_func.call(this);
        $gameLocationGroups = new Game_LocationGroups($locationGroupCount);
    });

    const makeSaveContents_func = DataManager.makeSaveContents;
    DataManager.makeSaveContents = (() => {
        const contents =makeSaveContents_func.call(this);
        contents.locationGroups = $gameLocationGroups;
        return contents;
    });

    const extractSaveContents_func = DataManager.extractSaveContents;
    DataManager.extractSaveContents = ((contents) => {
        extractSaveContents_func.call(this, contents);
        $gameLocationGroups = contents.locationGroups;
    });

    class Scene_Teleport extends Scene_MenuBase {

        create() {
            super.create();
            this.createGuideWindow();
            this._guideWindow.refresh();
            this.createLocationWindow();
            this._locationWindow.refresh();
            this._orderWindow = null;
        }

        start() {
            super.start();
            this._guideWindow.open();
            this._locationWindow.open();
            this._locationWindow.activate();
        }

        createGuideWindow() {
            const rect = this.getGuideWindowRect();
            this._guideWindow = new Window_Guide(rect);
            this.addWindow(this._guideWindow);
        }

        createLocationWindow() {
            const rect = this.getLocationWindowRect();
            this._locationWindow = new Window_Location(rect);
            if ($isDeleteMode) {
                this._locationWindow.setHandler("ok", this.deleteLocation.bind(this));
            } else {
                this._locationWindow.setHandler("ok", this.doTeleport.bind(this));
            }
            this._locationWindow.setHandler("cancel", this.popScene.bind(this));
            this._locationWindow.setHandler("menu", this.showOrderWindow.bind(this));
            this.addWindow(this._locationWindow);
        }

        createOrderWindow() {
            const rect = this.getOrderWindowRect();
            this._orderWindow = new Window_Order(rect);
            this._orderWindow.selectSymbol($gameLocationGroups._orderTypes[$currentGroupIndex]);
            this._orderWindow.setHandler($orderSymbols.entry, this.sortByEntry.bind(this));
            this._orderWindow.setHandler($orderSymbols.name, this.sortByName.bind(this));
            this._orderWindow.setHandler($orderSymbols.coordinate, this.sortByCoordinate.bind(this));
            this._orderWindow.setHandler("cancel", this.closeOrderWindow.bind(this));
            this.addWindow(this._orderWindow);
        }

        getGuideWindowRect() {
            const winX = 0;
            const winY = this.mainAreaTop();
            const winW = Graphics.boxWidth;
            const winH = this.calcWindowHeight(1, true);
            return new Rectangle(winX, winY, winW, winH);
        }

        getLocationWindowRect() {
            const guideRect = this.getGuideWindowRect();
            const winX = guideRect.x;
            const winY = guideRect.y + guideRect.height;
            const winW = guideRect.width;
            const winH = this.mainAreaBottom() - winY;
            return new Rectangle(winX, winY, winW, winH);
        }
        
        getOrderWindowRect() {
            const locRect = this.getLocationWindowRect();
            const winW = this.mainCommandWidth();
            const winH = this.calcWindowHeight(3, true);
            const winX = (locRect.width - winW) / 2 + locRect.x;
            const winY = (locRect.height - winH) / 2 + locRect.y;
            return new Rectangle(winX, winY, winW, winH);
        }

        doTeleport() {
            AudioManager.playSe($teleportSE);
            const loc = $sortedLocations[this._locationWindow.index()];
            $gamePlayer.reserveTransfer(loc.mapid, loc.x, loc.y, loc.direction, loc.fadeout);
            this.popScene();
        }

        deleteLocation() {
            SoundManager.playOk();
            const loc = $sortedLocations[this._locationWindow.index()];
            const deleteLocName = loc.name;
            deleteLocationFromGroups($gameLocationGroups, $currentGroupIndex, deleteLocName);
            this.popScene();
        }

        showOrderWindow() {
            this._locationWindow.deactivate();
            if (!this._orderWindow) {
                this.createOrderWindow();
                this._orderWindow.refresh();
            }
        }

        sortByEntry() {
            $gameLocationGroups._orderTypes[$currentGroupIndex] = $orderSymbols.entry;
            const newIndex = sortLocationGroup(this._locationWindow.index());
            this._locationWindow.refresh();
            this._locationWindow.select(newIndex);
            this.closeOrderWindow();
        }

        sortByName() {
            $gameLocationGroups._orderTypes[$currentGroupIndex] = $orderSymbols.name;
            const newIndex = sortLocationGroup(this._locationWindow.index());
            this._locationWindow.refresh();
            this._locationWindow.select(newIndex);
            this.closeOrderWindow();
        }

        sortByCoordinate() {
            $gameLocationGroups._orderTypes[$currentGroupIndex] = $orderSymbols.coordinate;
            const newIndex = sortLocationGroup(this._locationWindow.index());
            this._locationWindow.refresh();
            this._locationWindow.select(newIndex);
            this.closeOrderWindow();
        }

        closeOrderWindow() {
            this._orderWindow.close();
            this._orderWindow = null;
            this._locationWindow.activate();
        }
    }

    class Window_Guide extends Window_Base {

        initialise(rect) {
            super.initialise(rect);
        }

        refresh() {
            if (this.contents) {
                this.contents.clear();
                this.draw();
            }
        }

        draw() {
            const x = this.itemPadding();
            const y = this.itemPadding();
            const width = this.innerWidth - this.itemPadding() - x;
            this.changeTextColor(this.systemColor());
            this.drawText($guideText, x, y, width);
            this.resetTextColor();
        }

    }

    class Window_Location extends Window_Selectable {
   
        initailse(rect) {
            sortLocationGroup(0);
            super.initialize(rect);
            this.select(0);
        }

        maxCols() {
            return 2;
        }

        maxItems() {
            return $sortedLocations.length;
        }

        location() {
            if ($sortedLocations.length === 0) return null;
            return $sortedLocations[this.index()];
        }
    
        drawItem(index) {
            const loc = $sortedLocations[index];
            const rect = this.itemLineRect(index);
            this.drawItemName(loc, rect.x, rect.y, rect.width);
        }
    
        refresh() {
            sortLocationGroup(0);
            Window_Selectable.prototype.refresh.call(this);
            this.createContents();
            this.drawAllItems();
            this.select(0);
        }
    
        isCurrentItemEnabled() {
            const idx = this.index();
            return (idx >= 0 && idx < this.maxItems());
        }

        update() {
            if (this.isOpenAndActive()) {
                if (!$inhibitOrderChange && this.isHandled("menu")) {
                    if ((Input.isTriggered("menu") && !Input.isTriggered("escape")) || Input.isTriggered("control") || TouchInput.isLongPressed()) {
                        return this.callHandler("menu");
                    }
                }
            }
            Window_Selectable.prototype.update.call(this);
        }

    }

    class Window_Order extends Window_Command {

        initailse(rect) {
            super.initialize(rect);
        }
    
        makeCommandList() {
           this.addCommand(params.orderNameByEntry,  $orderSymbols.entry);
            this.addCommand(params.orderNameByName, $orderSymbols.name);
            this.addCommand(params.orderNameByCoordinate, $orderSymbols.coordinate);
            this.selectSymbol($gameLocationGroups._orderTypes[$currentGroupIndex]);
        }
    }

    function addTeleportLocation(args) {
        const locGroup = getLocationGroup($gameLocationGroups, args.groupId);
        let loc = locGroup.find((value, index, obj) => {
            return (value.name === args.name);
        });
        if (!loc) {
            loc = new LocationInfo(args.name, 1, 1, 1, 0 ,0, false);
            locGroup.push(loc);
        }
        loc.mapid = args.mapid;
        loc.x = args.x;
        loc.y = args.y;
        loc.direction = args.direction;
        loc.fadeout = args.fadeout;
        loc.isDeletable = args.isDeletable;
    }

    PluginManagerEx.registerCommand(document.currentScript, 'teleport', (args) => {
        $isDeleteMode = false;
        $currentGroupIndex = args.groupId - 1;
        const locGroup = getLocationGroup($gameLocationGroups, args.groupId);
        if (args.hideCurrentMap) {
            const currentMapid = $gameMap.mapId();
            $teleportLocations = locGroup.filter((value)=>{
                return (value.mapid !== currentMapid);
            });
        } else {
            $teleportLocations = locGroup;
        }
        if ($teleportLocations.length > 0 || args.noDestinationMsg === '') {
            $guideText = args.guideText;
            $teleportSE = $gameLocationGroups._soundEffects[args.groupId-1];
            $inhibitOrderChange = args.inhibitOrderChange;
            if (!!args.initialOrder) {
                $gameLocationGroups._orderTypes[$currentGroupIndex] = args.initialOrder;
            }
            SceneManager.push(Scene_Teleport);
        } else {
            $gameMessage.setFaceImage('', 0);
            $gameMessage.setBackground(0);
            $gameMessage.setPositionType(2);
            $gameMessage.setSpeakerName('');
            $gameMessage.add(args.noDestinationMsg);
        }
    });

    PluginManagerEx.registerCommand(document.currentScript, 'addLocation', addTeleportLocation);

    PluginManagerEx.registerCommand(document.currentScript, 'addCurrentLocation', (args) => {
        args.name = $dataMap.displayName + '(' + $gamePlayer._x.toString() + ',' + $gamePlayer._y.toString() + ')';
        args.mapid = $gameMap.mapId();
        args.x = $gamePlayer._x;
        args.y = $gamePlayer._y;
        args.direction = 0;
        args.fadeout = 0;
        addTeleportLocation(args); 
    });

    PluginManagerEx.registerCommand(document.currentScript, 'setSE', (args) => {
        const se = $gameLocationGroups._soundEffects[args.groupId-1];
        se.name = args.name;
        se.volume = args.volume;
        se.pitch = args.pitch;
        se.pan = args.pan;
    });

    PluginManagerEx.registerCommand(document.currentScript, 'deleteLocation', (args) => {
        if (!args.forceDelete) {
            const locGroup = getLocationGroup($gameLocationGroups, args.groupId);
            const loc = locGroup.find((value, index, obj) => {
                return (value.name === args.name);
            });
            if (loc && !loc.isDeletable) {
                return;
            }
        }
        deleteLocationFromGroups($gameLocationGroups, args.groupId - 1, args.name);
    });

    PluginManagerEx.registerCommand(document.currentScript, 'deleteLocationBySelect', (args) => {
        $isDeleteMode = true;
        const locGroup = getLocationGroup($gameLocationGroups, args.groupId);
        $teleportLocations = locGroup.filter((value) => {
            return !!value.isDeletable;
        });
        if ($teleportLocations.length > 0) {
            $currentGroupIndex = args.groupId - 1;
            $guideText = args.guideText;
            $teleportSE = $gameLocationGroups._soundEffects[args.groupId-1];
            $inhibitOrderChange = args.inhibitOrderChange;
            if (!!args.initialOrder) {
                $gameLocationGroups._orderTypes[$currentGroupIndex] = args.initialOrder;
            }
            SceneManager.push(Scene_Teleport);
        }
    });

})();