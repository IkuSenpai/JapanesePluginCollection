//=============================================================================
// MPP_ObjectFreePlacement.js
//=============================================================================
// Copyright (c) 2018 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc We will add a function that allows you to set up events freely.
 * @author Mokusei Penguin
 * @url
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing v[N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v[N] to refer to the variable N.
 *  
 *  〇 MV / MZ
 *  
 *  〇 AddPlacementObj objId objTag  / addObj
 *       objId  : ID of the object to be installed(Event ID)
 *       objTag : Tag of the object to be installed(Arbitrary value / Not set:0)
 *   - Place the object in the direction facing the player's position.
 *   - The detailed installation position and conditions set on the event
 *     side will be applied.
 *   - Tags are used when deleting individually.
 *    
 *  〇 AddPlacementObjPos objId x y objTag  / addObjPos
 *       objId  : ID of the object to be installed(Event ID)
 *       x      : X coordinate
 *       y      : Y coordinate
 *       objTag : Tag of the object to be installed(Arbitrary value / Not set:0)
 *   - Places the object at the specified coordinates.
 *   - The installation distance of the installation conditions is ignored.
 *   - Tags are used when deleting individually.
 * 
 *  〇 ErasePlacementObj objTag  / eraseObj
 *       objTag : Object tag
 *   - Deletes all objects with the specified tag.
 * 
 *  〇 ClearAllPlacementObj mapId  / clearAllObj
 *       mapId : Map ID(-1:All maps, 0:Current map / Not set:0)
 *   - Deletes all objects on the specified map.
 * 
 * ▼ Event notes
 *  〇 <PlcCdt:n>
 *   - Set [Placement conditions] to n for the object to be installed.
 *   - [Placement conditions] specify the ones set in the plugin parameters.
 * 
 * ▼ Script general
 *  〇 $gamePlayer.canPlcObj(objId)
 *       objId : Object ID (Event ID)
 *   - Returns whether the player can place an object with the specified ID
 *     from the current position.
 * 
 *  〇 $gamePlayer.canPlcObjPos(objId, x, y)
 *       objId : Object ID (Event ID)
 *       x     : X coordinate
 *       y     : Y coordinate
 *   - Returns whether an object with the specified ID can be placed at
 *     the specified coordinates (x, y).
 * 
 * ▼ Plugin parameter
 *  〇 Objects Map Id
 *   - The event of the specified map becomes a free placement object.
 *   - The event ID becomes the object ID as it is.
 * 
 *  〇 Conditions - Passable
 *   - If you can pass from the player's position to the placement position,
 *     you will be able to install it.
 * 
 *  〇 Conditions - Collide
 *   - If there are other events at the placement location, you will not be
 *     able to install.
 * 
 *  〇 Conditions - Tags/Regions
 *   - It can be installed only when the installation position is the
 *     specified terrain tag or region ID.
 *   - When setting numbers in an array, you can specify numbers from
 *     n to m by writing n-m.
 *       Example: 1-4,8 => 1 to 4 and 8
 * 
 * ▼ Other
 *  - If the placed object executes [Erase Event], the object will be
 *    deleted.
 *  - If you use a tile image for the event image, the tile image of the
 *    installed map will be applied.
 *  - Other plugins support features that use event notes and annotations.
 *  - However, it may not be compatible with plugins from other sites.
 * 
 * ================================================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command addObj
 *      @desc 
 *      @arg objId
 *          @desc ID of the event to be set up
 *          @type number
 *              @min 1
 *              @max 999999
 *          @default 1
 *      @arg objTag
 *          @desc Arbitrary value
 *          Used when deleting.
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command addObjPos
 *      @desc 
 *      @arg objId
 *          @desc ID of the event to be set up
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 1
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999999
 *          @default 0
 *      @arg objTag
 *          @desc Arbitrary value
 *          Used when deleting.
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command eraseObj
 *      @desc 
 *      @arg objTag
 *          @desc 
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command clearAllObj
 *      @desc Delete all objects placed on the specified map
 *      @arg mapId
 *          @desc -1:All maps, 0:Current map
 *          @type number
 *              @min -1
 *              @max 999999
 *          @default 0
 * 
 * 
 *  @param Objects Map Id
 *      @desc ID of the map to read as an object
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 1
 * 
 *  @param Conditions
 *      @type struct<Condition>[]
 *      @desc Arrangement of placement conditions
 *      (The numbers are 1,2,3 ... in order from the top)
 *      @default ["{\"Distance\":\"1\",\"Passable\":\"true\",\"Collide\":\"true\",\"Tags\":\"\",\"Regions\":\"\"}"]
 * 
 *  @param Clear By Transfer
 *      @desc When was the line the map movement, Delete all the objects
 *      @type boolean
 *      @default true
 * 
 */

/*~struct~Condition:
 *  @param Distance
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999999
 *      @default 1
 * 
 *  @param Passable
 *      @desc
 *      @type boolean
 *      @default true
 * 
 *  @param Collide
 *      @desc Whether it can be installed in combination with other events (including placement objects)
 *      @type boolean
 *      @default true
 * 
 *  @param Tags
 *      @desc Range can be specified / Not set:Not specified
 *      @default 
 * 
 *  @param Regions
 *      @desc Range can be specified / Not set:Not specified
 *      @default 
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc イベントを自由に設置できる機能を追加します。
 * @author 木星ペンギン
 * @url
 *
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 MV / MZ
 *  
 *  〇 AddPlacementObj objId objTag  / オブジェクト設置
 *       objId  : 設置するオブジェクトのID(イベントID)
 *       objTag : 設置するオブジェクトのタグ(任意の値 / 未設定:0)
 *   - プレイヤーの位置から向いている方向にオブジェクトを設置します。
 *   - 細かな設置位置や条件はイベント側に設定したものが適用されます。
 *   - タグは個別に削除を行う際に使用します。
 *    
 *  〇 AddPlacementObjPos objId x y objTag  / オブジェクト座標設置
 *       objId  : 設置するオブジェクトのID(イベントID)
 *       x      : X座標
 *       y      : Y座標
 *       objTag : 設置するオブジェクトのタグ(任意の値 / 未設定:0)
 *   - 指定した座標にオブジェクト設置します。
 *   - 設置条件の設置距離は無視されます。
 *   - タグは個別に削除を行う際に使用します。
 * 
 *  〇 ErasePlacementObj objTag  / オブジェクト削除
 *       objTag : オブジェクトのタグ
 *   - 指定したタグのオブジェクトを全て削除します。
 * 
 *  〇 ClearAllPlacementObj mapId  / オブジェクト全消去
 *       mapId : マップID(-1:全マップ, 0:現マップ / 未設定:0)
 *   - 指定したマップの全オブジェクトを削除します。
 * 
 * ▼ イベントのメモ
 *  〇 <PlcCdt:n>
 *   - 設置するオブジェクトに[設置条件]をn番に設定します。
 *   - [設置条件]はプラグインパラメータで設定したものを指定します。
 * 
 * ▼ スクリプト全般
 *  〇 $gamePlayer.canPlcObj(objId)
 *       objId : オブジェクトID(イベントID)
 *   - プレイヤーが現在の位置から指定したIDのオブジェクトを設置できるかどうかを
 *     返します。
 * 
 *  〇 $gamePlayer.canPlcObjPos(objId, x, y)
 *       objId : オブジェクトID(イベントID)
 *       x     : X座標
 *       y     : Y座標
 *   - 指定した座標(x,y)に指定したIDのオブジェクトが設置できるかどうかを
 *     返します。
 * 
 * ▼ プラグインパラメータ
 *  〇 オブジェクトマップID [Objects Map Id]
 *   - 指定したマップのイベントが自由設置のオブジェクトとなります。
 *   - イベントIDがそのままオブジェクトIDとなります。
 * 
 *  〇 設置条件 - 通行判定
 *   - プレイヤーの位置から設置位置まで通行できる場合、設置できるように
 *     なります。
 * 
 *  〇 設置条件 - 衝突判定
 *   - 設置位置に他のイベントが存在する場合、設置できなくなります。
 * 
 *  〇 設置条件 - 地形タグ/リージョン
 *   - 設置位置が指定した地形タグもしくはリージョンIDのときのみ、
 *     設置できるようになります。
 *   - 数値を配列で設定する際、n-m と表記することでnからmまでの数値を
 *     指定できます。
 *       例: 1-4,8 => 1から4と8
 * 
 * ▼ その他
 *  - 設置したオブジェクトが[イベントの一時消去]を実行した場合、
 *    そのオブジェクトは削除されます。
 *  - イベントの画像にタイル画像を使う場合、設置したマップのタイル画像が
 *    適用されます。
 *  - 他のプラグインで、イベントのメモや注釈を使った機能には対応しています。
 *  - ただし、他サイトさんのプラグインには対応できない可能性があります。
 * 
 * ================================================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command addObj
 *      @text オブジェクト設置
 *      @desc 
 *      @arg objId
 *          @text オブジェクトID
 *          @desc 設置するイベントのID
 *          @type number
 *              @min 1
 *              @max 999999
 *          @default 1
 *      @arg objTag
 *          @text タグ
 *          @desc 任意の値
 *          削除する際に使用します。
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command addObjPos
 *      @text オブジェクト座標設置
 *      @desc 
 *      @arg objId
 *          @text オブジェクトID
 *          @desc 設置するイベントのID
 *          @type number
 *              @min 1
 *              @max 999
 *          @default 1
 *      @arg x
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999999
 *          @default 0
 *      @arg y
 *          @desc 
 *          @type number
 *              @min 0
 *              @max 999999
 *          @default 0
 *      @arg objTag
 *          @text タグ
 *          @desc 任意の値
 *          削除する際に使用します。
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command eraseObj
 *      @text オブジェクト削除
 *      @desc 
 *      @arg objTag
 *          @text タグ
 *          @desc 
 *          @type number
 *              @min -999999
 *              @max 999999
 *          @default 0
 * 
 *  @command clearAllObj
 *      @text オブジェクト全消去
 *      @desc 指定したマップに配置してあるオブジェクトを全て削除
 *      @arg mapId
 *          @text マップID
 *          @desc -1:全てのマップ, 0:現在のマップ
 *          @type number
 *              @min -1
 *              @max 999999
 *          @default 0
 * 
 * 
 *  @param Objects Map Id
 *      @text オブジェクトマップID
 *      @desc オブジェクトとして読み込むマップのID
 *      @type number
 *          @min 1
 *          @max 999999
 *      @default 1
 * 
 *  @param Conditions
 *      @text 設置条件
 *      @type struct<Condition>[]
 *      @desc 設置条件の配列
 *      (上から順に番号 1,2,3... となります)
 *      @default ["{\"Distance\":\"1\",\"Passable\":\"true\",\"Collide\":\"true\",\"Tags\":\"\",\"Regions\":\"\"}"]
 * 
 *  @param Clear By Transfer
 *      @text マップ移動で削除
 *      @desc マップ移動を行た際、オブジェクトを全削除
 *      @type boolean
 *      @default true
 * 
 */

/*~struct~Condition:ja
 *  @param Distance
 *      @text 設置距離
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999999
 *      @default 1
 * 
 *  @param Passable
 *      @text 通行判定
 *      @desc
 *      @type boolean
 *      @default true
 * 
 *  @param Collide
 *      @text 衝突判定
 *      @desc 他のイベント(設置オブジェクト含む)と重ねて設置できるかどうか
 *      @type boolean
 *      @default true
 * 
 *  @param Tags
 *      @text 地形タグ
 *      @desc 設置可能な地形タグ
 *      (範囲指定可 / 未設定で指定なし)
 *      @default 
 * 
 *  @param Regions
 *      @text リージョン
 *      @desc 設置可能なリージョンID
 *      (範囲指定可 / 未設定で指定なし)
 *      @default 
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_ObjectFreePlacement';

    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const convertToArray = (param) => {
        return param.split(',').reduce((r, item) => {
            if (!item) return r;
            const match = /(\d+)-(\d+)/.exec(item);
            if (match) {
                const start = Number(match[1]);
                const end = Number(match[2]);
                return [...r, ...[...Array(end + 1).keys()].slice(start)];
            } else {
                return [...r, Number(item)];
            }
        }, []);
    };
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    const param_ObjectsMapId = Number(parameters['Objects Map Id']);
    const param_Conditions = [
        null,
        ...JSON.parse(parameters['Conditions'] || '[]', paramReplace).map(c => ( 
            {
                Distance: Number(c['Distance']),
                Passable: c['Passable'] === 'true',
                Collide:  c['Collide'] === 'true',
                Tags:     convertToArray(c['Tags'] || ''),
                Regions:  convertToArray(c['Regions'] || '')
            }
        ))
    ];
    const param_ClearByTransfer = parameters['Clear By Transfer'] === 'true';

    //-------------------------------------------------------------------------
    // PlacementObj

    function PlacementObj() {
        throw new Error('This is a static class');
    }

    PlacementObj._baseEvents = null;
    
    PlacementObj.isReady = function() {
        return !!this._baseEvents;
    };

    PlacementObj.getBase = function(eventId) {
        return this._baseEvents[eventId];
    };

    PlacementObj.hasBase = function(eventId) {
        return !!this._baseEvents[eventId];
    };

    PlacementObj.getCondition = function(eventId) {
        const event = this._baseEvents[eventId];
        const index = event ? Number(event.meta.PlcCdt || 0) : 0;
        return param_Conditions[index];
    };

    PlacementObj.setupBaseEvents = function(baseEvents) {
        this._baseEvents = baseEvents;
    };

    //-------------------------------------------------------------------------
    // Scene_Boot

    const _Scene_Boot_create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function() {
        _Scene_Boot_create.apply(this, arguments);
        DataManager.loadMapData(param_ObjectsMapId);
    };

    const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function() {
        if (!PlacementObj.isReady() && DataManager.isMapLoaded()) {
            this.onObjMapLoaded();
        }
        return (
            PlacementObj.isReady() &&
            _Scene_Boot_isReady.apply(this, arguments)
        );
    };

    Scene_Boot.prototype.onObjMapLoaded = function() {
        PlacementObj.setupBaseEvents($dataMap.events);
    };

    //-------------------------------------------------------------------------
    // Game_Map

    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.apply(this, arguments);
        this._freePlacementEvents = [];
    };

    const _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
    Game_Map.prototype.setupEvents = function() {
        _Game_Map_setupEvents.apply(this, arguments);
        if (param_ClearByTransfer) {
            this.clearPlacementObjs(-1);
        }
        this.freePlacementEvents().forEach(event => event.reload());
    };

    const _Game_Map_events = Game_Map.prototype.events;
    Game_Map.prototype.events = function() {
        return [
            ..._Game_Map_events.apply(this, arguments),
            ...this.freePlacementEvents()
        ];
    };

    Game_Map.prototype.freePlacementEvents = function() {
        const mapId = this._mapId;
        return this._freePlacementEvents.filter(
            event => event && event.mapId() === mapId
        );
    };

    const _Game_Map_event = Game_Map.prototype.event;
    Game_Map.prototype.event = function(eventId) {
        return eventId < 1000
            ? _Game_Map_event.apply(this, arguments)
            : this._freePlacementEvents[eventId - 1000];
    };

    Game_Map.prototype.getVacantEventId = function() {
        const events = this._freePlacementEvents;
        const index = events.findIndex(event => !event);
        return (index < 0 ? events.length : index) + 1000;
    };

    Game_Map.prototype.addPlacementObj = function(objId, x, y, objTag) {
        if (PlacementObj.hasBase(objId)) {
            const mapId = this._mapId;
            const eventId = this.getVacantEventId();
            const plaEvent = new Game_FreePlacementEvent(mapId, eventId, objId);
            plaEvent.setObjTag(objTag);
            plaEvent.setPosition(x, y);
            this._freePlacementEvents[eventId - 1000] = plaEvent;
        }
    };

    Game_Map.prototype.removePlacementObj = function(eventId) {
        if (this._freePlacementEvents[eventId - 1000]) {
            this._freePlacementEvents[eventId - 1000] = null;
        }
    };

    const _Game_Map_eraseEvent = Game_Map.prototype.eraseEvent;
    Game_Map.prototype.eraseEvent = function(eventId) {
        if (eventId < 1000) {
            _Game_Map_eraseEvent.apply(this, arguments);
        } else {
            this._freePlacementEvents[eventId - 1000].erase();
        }
    };

    Game_Map.prototype.erasePlacementObj = function(objTag) {
        this._freePlacementEvents.forEach(event => {
            if (event && event.objTag() === objTag) {
                event.erase();
            }
        });
    };

    Game_Map.prototype.clearPlacementObjs = function(mapId) {
        mapId = mapId || this._mapId;
        if (mapId > 0) {
            this._freePlacementEvents.forEach(event => {
                if (event && event.mapId() === mapId) {
                    event.erase();
                }
            });
        } else {
            this._freePlacementEvents.forEach(event => event.erase());
            this._freePlacementEvents.length = 0;
        }
    };

    Game_Map.prototype.checkObjPlacement = function(x, y) {
        const flags = this.tilesetFlags();
        const tiles = this.allTiles(x, y);
        for (const tile of tiles) {
            const flag = flags[tile];
            if ((flag & 0x10) !== 0) {
                // [*] No effect on passage
                continue;
            }
            return (flag & 0x0f) !== 0x0f;
        }
        return false;
    };

    const _Game_Map_unlockEvent = Game_Map.prototype.unlockEvent;
    Game_Map.prototype.unlockEvent = function(eventId) {
        _Game_Map_unlockEvent.apply(this, arguments);
        const plaEvent = this._freePlacementEvents[eventId - 1000];
        if (plaEvent) {
            plaEvent.unlock();
        }
    };

    //-------------------------------------------------------------------------
    // Game_Player

    Game_Player.prototype.canPlcObj = function(objId) {
        return this.placementObj(objId, 0, true);
    };

    Game_Player.prototype.canPlcObjPos = function(objId, x, y) {
        return this.placementObjPos(objId, x, y, 0, true);
    };

    Game_Player.prototype.placementObj = function(objId, objTag, test) {
        const c = PlacementObj.getCondition(objId);
        const distance = c ? c.Distance || 0 : 0;
        const [px, py] = this.getPlacementPos(distance);
        if (c) {
            if (c.Passable && !this.isPlacementDistancePassable(distance)) {
                return false;
            }
            if (!this.canPlcObjPos(objId, px, py, true)) {
                return false;
            }
        }
        if (!test) {
            $gameMap.addPlacementObj(objId, px, py, objTag);
        }
        return true;
    };

    Game_Player.prototype.getPlacementPos = function(distance) {
        const d = this.direction();
        let { x, y } = this;
        for (let i = 0; i < distance; i++) {
            x = $gameMap.roundXWithDirection(x, d);
            y = $gameMap.roundYWithDirection(y, d);
        }
        return [x, y];
    };

    Game_Player.prototype.isPlacementDistancePassable = function(distance) {
        const d = this.direction();
        let { x, y } = this;
        for (let i = 0; i < distance; i++) {
            if (!this.isMapPassable(x, y, d)) {
                return false;
            }
            x = $gameMap.roundXWithDirection(x, d);
            y = $gameMap.roundYWithDirection(y, d);
        }
        return true;
    };

    Game_Player.prototype.placementObjPos = function(objId, x, y, objTag, test) {
        if (!$gameMap.isValid(x, y)) {
            return false;
        }
        const c = PlacementObj.getCondition(objId);
        if (c) {
            if (c.Passable && !$gameMap.checkObjPlacement(x, y)) {
                return false;
            }
            if (c.Collide && this.isCollidedWithCharacters(x, y)) {
                return false;
            }
            if (
                c.Tags.length > 0 &&
                !c.Tags.includes($gameMap.terrainTag(x, y))
            ) {
                return false;
            }
            if (
                c.Regions.length > 0 &&
                !c.Regions.includes($gameMap.regionId(x, y))
            ) {
                return false;
            }
        }
        if (!test) {
            $gameMap.addPlacementObj(objId, x, y, objTag);
        }
        return true;
    };

    //-----------------------------------------------------------------------------
    // Game_FreePlacementEvent

    function Game_FreePlacementEvent() {
        this.initialize.apply(this, arguments);
    }

    window.Game_FreePlacementEvent = Game_FreePlacementEvent;

    Game_FreePlacementEvent.prototype = Object.create(Game_Event.prototype);
    Game_FreePlacementEvent.prototype.constructor = Game_FreePlacementEvent;

    Game_FreePlacementEvent.prototype.initialize = function(mapId, eventId, objId) {
        this._placementObjId = objId;
        Game_Event.prototype.initialize.call(this, mapId, eventId);
        this._objTag = 0;
    };

    Game_FreePlacementEvent.prototype.mapId = function() {
        return this._mapId;
    };

    Game_FreePlacementEvent.prototype.setObjTag = function(objTag) {
        this._objTag = objTag;
    };

    Game_FreePlacementEvent.prototype.objTag = function() {
        return this._objTag;
    };

    Game_FreePlacementEvent.prototype.event = function() {
        return PlacementObj.getBase(this._placementObjId);
    };

    Game_FreePlacementEvent.prototype.erase = function() {
        Game_Event.prototype.erase.call(this);
        $gameMap.removePlacementObj(this._eventId);
    };

    Game_FreePlacementEvent.prototype.reload = function() {
        this._pageIndex = -2;
        this.refresh();
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        AddPlacementObj: { name:'addObj', keys:['objId', 'objTag'] },
        AddPlacementObjPos: {
            name:'addObjPos',
            keys:['objId', 'x', 'y', 'objTag']
        },
        ErasePlacementObj: { name:'eraseObj', keys:['objTag'] },
        ClearAllPlacementObj: { name:'clearAllObj', keys:['mapId'] }
    };
    Object.assign(_mzCommands, {
        'オブジェクト設置': _mzCommands.AddPlacementObj,
        'オブジェクト座標設置': _mzCommands.AddPlacementObjPos,
        'オブジェクト削除': _mzCommands.ErasePlacementObj,
        'オブジェクト全消去': _mzCommands.ClearAllPlacementObj
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(...mzCommand.keys.map((k,i) => ({[k]:args[i]})));
            PluginManager.callCommand(this, pluginName, mzCommand.name, args2);
        }
    };

    //-------------------------------------------------------------------------
    // PluginManager

    PluginManager._commands = PluginManager._commands || {};

    if (!PluginManager.registerCommand) {
        PluginManager.registerCommand = function(pluginName, commandName, func) {
            const key = pluginName + ":" + commandName;
            this._commands[key] = func;
        };
    }

    if (!PluginManager.callCommand) {
        PluginManager.callCommand = function(self, pluginName, commandName, args) {
            const key = pluginName + ":" + commandName;
            const func = this._commands[key];
            if (typeof func === "function") {
                func.bind(self)(args);
            }
        };
    }

    PluginManager.registerCommand(pluginName, 'addObj', args => {
        const objId = PluginManager.mppValue(args.objId);
        const objTag = PluginManager.mppValue(args.objTag || '0');
        $gamePlayer.placementObj(objId, objTag);
    });

    PluginManager.registerCommand(pluginName, 'addObjPos', args => {
        const objId = PluginManager.mppValue(args.objId);
        const x = PluginManager.mppValue(args.x);
        const y = PluginManager.mppValue(args.y);
        const objTag = PluginManager.mppValue(args.objTag || '0');
        $gamePlayer.placementObjPos(objId, x, y, objTag);
    });

    PluginManager.registerCommand(pluginName, 'eraseObj', args => {
        const objTag = PluginManager.mppValue(args.objTag);
        $gameMap.erasePlacementObj(objTag);
    });

    PluginManager.registerCommand(pluginName, 'clearAllObj', args => {
        const mapId = PluginManager.mppValue(args.mapId);
        $gameMap.clearPlacementObjs(mapId);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };

    //-------------------------------------------------------------------------
    // Spriteset_Map

    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.apply(this, arguments);
        this.updatePlacementEvents();
    };

    const _Spriteset_Map_hideCharacters = Spriteset_Map.prototype.hideCharacters;
    Spriteset_Map.prototype.hideCharacters = function() {
        _Spriteset_Map_hideCharacters.apply(this, arguments);
        for (const sprite of this._placementEventsSprites.values()) {
            if (!sprite.isTile()) {
                sprite.hide();
            }
        }
    };

    const _Spriteset_Map_createCharacters = Spriteset_Map.prototype.createCharacters;
    Spriteset_Map.prototype.createCharacters = function() {
        _Spriteset_Map_createCharacters.apply(this, arguments);
        this._placementEventsSprites = new Map();
    };

    Spriteset_Map.prototype.updatePlacementEvents = function() {
        const spriteMap = this._placementEventsSprites;
        const allEvents = $gameMap.freePlacementEvents();
        for (const event of allEvents) {
            if (!spriteMap.has(event)) {
                const sprite = new Sprite_Character(event);
                spriteMap.set(event, sprite);
                this._tilemap.addChildAt(sprite, 0);
            }
        }
        for (const [event, sprite] of spriteMap.entries()) {
            if (!allEvents.includes(event)) {
                sprite.destroy();
                spriteMap.delete(event);
                this._tilemap.removeChild(sprite);
            }
        }
    };

})();
