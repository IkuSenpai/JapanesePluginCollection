//=============================================================================
// RPG Maker MZ - Save Event Location
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Save the position of the event.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_SaveEventLocation.js(ver1.0.0)
 *
 * Save the position of the event as you leave the map.
 * Whether to use saved data when entering the map
 * Specify ON/OFF with the plug-in command.
 * The initial value of ON/OFF can be set by a parameter.
 *
 *
 * The plugin command is:
 *
 * ■ Enable features on this map
 * When revisiting this map, decide whether to use the saved event location.
 * When turned on, it follows "Set for each event".
 * When turned off, the saved location information will not be used.
 *
 * ■ Set for each event
 * For the input event id
 * Decide whether to use the saved event location when revisiting the map.
 *
 * ■ Set for all event
 * Decide whether to use the saved event location when revisiting the map.
 * 
 * ■ Delete all
 *  Delete location information on all maps.
 * 
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param defaultMapEnabled
 * @text Default value for each map 
 * @type boolean
 * @desc ON:Enabled OFF:Disabled
 * @on ON
 * @off OFF
 * @default true
 *
 * @param defaultEventEnabled
 * @text Default value for each event 
 * @type boolean
 * @desc ON:Enabled OFF:Disabled
 * @on ON
 * @off OFF
 * @default true
 *
 *
 * @param saveDirectionEnabled
 * @text Save the direction. 
 * @type boolean
 * @desc ON:Enabled OFF:Disabled
 * @on ON
 * @off OFF
 * @default true
 *
 *
 * @command setMap
 * @text Enable features on this map 
 * @desc Specifies whether to use the location information stored in this map.
 *
 * @arg mapEnabled
 * @type boolean
 * @text Enabled/Disabled
 * @desc ON:Enabled OFF:Disabled
 * @on ON
 * @off OFF
 * @default true
 *
 * @command setEvent
 * @text Set for each event 
 * @desc Set whether to use the saved event location.
 *
 * @arg eventId
 * @type text
 * @text Event id
 * @desc Input the event id. ex.1 or 1,2,3
 *
 * @arg eventEnabled
 * @type boolean
 * @text Enabled/Disabled
 * @desc ON:Enabled OFF:Disabled
 * @on ON
 * @off OFF
 * @default true
 *
 * @command setEventAll
 * @text Set for all events on this map
 * @desc Set whether to use the saved event location.
 *
 * @arg eventEnabled
 * @type boolean
 * @text Enabled/Disabled
 * @desc ON:Enabled for all events on this map  OFF:Disabled for all events on this map 
 * @on ON
 * @off OFF
 * @default true
 *
 * @command deleteAll
 * @text Delete all
 * @desc Delete location information on all maps.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc イベントの位置を保存します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_SaveEventLocation.js(ver1.0.0)
 *
 * マップを出る時にイベントの位置を保存します。
 * マップに入った時にイベントを保存データの位置に再配置するかどうかは、
 * プラグインコマンドでON/OFFを指定して制御します。
 * プラグインコマンドで指定されていない場合、パラメーターの値に従います。
 *
 * プラグインコマンドは次のとおりです。
 *
 * ■このマップで機能を有効化
 * 再配置するかどうかを、マップ単位で決めます。
 * ONにするとイベントごとの設定値に従います。
 * OFFにすると再配置は実行されません。
 * 
 * ■イベントごとに設定
 * 指定したイベントIDについて、
 * マップに入った時、保存されている位置に再配置するか決めます。
 *  
 * ■全イベントを設定
 * 今いるマップの全イベントについて、
 * マップに入った時、保存されている位置に再配置するか決めます。
 *  
 * ■全マップの位置情報を削除
 * 全マップの位置情報を削除します。
 * 容量が気になる場合に実行してください。
 *
 * ■メモ
 * 簡単イベント作成「扉」の最後の向きの画像は透明です。
 * 向きを保存すると扉が見えなくなってしまいます。
 * ・開けたら閉めるようにする
 * ・扉イベントだけ個別に機能OFFにする
 * ・パラメーターで向きを保存しない設定にする
 * などで対応してください。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param defaultMapEnabled
 * @text マップごとの初期値
 * @type boolean
 * @desc ON:有効 OFF:無効
 * @on ON
 * @off OFF
 * @default true
 *
 * @param defaultEventEnabled
 * @text イベントごとの初期値
 * @type boolean
 * @desc ON:有効 OFF:無効
 * @on ON
 * @off OFF
 * @default true
 *
 * @param saveDirectionEnabled
 * @text 向きを保存する
 * @type boolean
 * @desc ON:向きを保存する OFF:向きは保存しない
 * @on ON
 * @off OFF
 * @default true
 *
 * @command setMap
 * @text このマップで機能を有効化
 * @desc 保存されている位置情報を使うか指定します
 *
 * @arg mapEnabled
 * @type boolean
 * @text 有効/無効
 * @desc ON:有効 OFF:無効
 * @on ON
 * @off OFF
 * @default true
 *
 * @command setEvent
 * @text イベントごとに設定
 * @desc 保存されている位置情報を使うか指定します。マップがOFFだと無視されます。
 *
 * @arg eventId
 * @type text
 * @text イベントID
 * @desc イベントIDを指定します。例)1 または 1,2,3
 *
 * @arg eventEnabled
 * @type boolean
 * @text 有効/無効
 * @desc ON:指定イベントで有効 OFF:指定イベントで無効
 * @on ON
 * @off OFF
 * @default true
 *
 * @command setEventAll
 * @text 全イベントを設定
 * @desc 保存されている位置情報を使うか指定します。マップがOFFだと無視されます。
 *
 * @arg eventEnabled
 * @type boolean
 * @text 有効/無効
 * @desc ON:このマップの全イベントで有効 OFF:このマップの全イベントで無効
 * @on ON
 * @off OFF
 * @default true
 *
 * @command deleteAll
 * @text 全マップの位置情報を削除
 * @desc 全マップの位置情報を削除します。容量が気になる場合に実行してください。
 *
 */


(() => {

    const pluginName = 'GABA_SaveEventLocation';
    
    // セーブデータに追加
    $gameGabaEventLocation = null;
    $gameGabaEventLocationMap = null;
    
    // プラグインパラメーター
    const parameters = PluginManager.parameters(pluginName);
	const defaultMapEnabled = Boolean(parameters['defaultMapEnabled']  === 'true' || false);
	const defaultEventEnabled = Boolean(parameters['defaultEventEnabled']  === 'true' || false);
	const directionEnabled = Boolean(parameters['saveDirectionEnabled']  === 'true' || false);

    //プラグインコマンド：マップの設定
    PluginManager.registerCommand(pluginName, "setMap", args => {
        GABA_SetEventLocationMapEnabled(Boolean(args.mapEnabled === 'true' || false));
    });
    
    //プラグインコマンド：イベントごとに設定
    PluginManager.registerCommand(pluginName, "setEvent", args => {
        
        if (args.eventId === 'this'){
            // 使用方法誤り
            return;
        }
        
        GABA_SetEventLocationEnabled(args.eventId.split(','), Boolean(args.eventEnabled === 'true' || false));
    });
    
    //プラグインコマンド：全イベント設定
    PluginManager.registerCommand(pluginName, "setEventAll", args => {
        GABA_SetEventLocationEnabledAll(Boolean(args.eventEnabled === 'true' || false));
    });
    
    //プラグインコマンド：全マップの位置情報削除
    PluginManager.registerCommand(pluginName, "deleteAll", args => {
        $gameGabaEventLocation = {};
        $gameGabaEventLocationMap = {};
    });
    

    // セーブデータの拡張1
    const _DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects.apply(this, arguments);
        $gameGabaEventLocation = {};
        $gameGabaEventLocationMap = {};
    };

    // セーブデータの拡張2
    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        let customContents = {};
        customContents = _DataManager_makeSaveContents.apply(this, arguments);
        customContents.gabaEventLocation = $gameGabaEventLocation;
        customContents.gabaEventLocationMap = $gameGabaEventLocationMap;
        return customContents;
    };
    
    // セーブデータの拡張3
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.apply(this, arguments);
        $gameGabaEventLocation = contents.gabaEventLocation;
        $gameGabaEventLocationMap = contents.gabaEventLocationMap;
    };

    
    // マップから出る時
    const _Game_Player_reserveTransfer = Game_Player.prototype.reserveTransfer;
    Game_Player.prototype.reserveTransfer = function(mapId, x, y, d, fadeType) {
        // マップのON・OFFチェック
        const oldMapEnabled = $gameGabaEventLocationMap[$gameMap._mapId];
        let mapEnabled = false;
        if (oldMapEnabled == null){
            // データがないならここで初保存
            // データがあるということはプラグインコマンドで保存されている
            $gameGabaEventLocationMap[$gameMap._mapId] = defaultMapEnabled;
            mapEnabled = defaultMapEnabled;
        } else {
            mapEnabled = oldMapEnabled;
        }
        
        if (mapEnabled) {
            // 次回のために全イベント位置を保存
            for (const event of $gameMap.events()) {
                const oldEventLocation = $gameGabaEventLocation[GABA_GetEventLocationKeyString(event)];
                if (oldEventLocation == null){
                    const wEventLocation = {x: event._x, y: event._y, direction : event._direction, eventEnabled: defaultEventEnabled};
                    $gameGabaEventLocation[GABA_GetEventLocationKeyString(event)] = wEventLocation;
                } else {
                    const wEventLocation = {x: event._x, y: event._y, direction : event._direction, eventEnabled: oldEventLocation.eventEnabled};
                    $gameGabaEventLocation[GABA_GetEventLocationKeyString(event)] = wEventLocation;
                }
            }
        } else {
            // 次回はデータを使わないため削除
            delete $gameGabaEventLocationMap[$gameMap._mapId];
            for (const event of $gameMap.events()) {
                delete $gameGabaEventLocation[GABA_GetEventLocationKeyString(event)];
            }
        }
            
        _Game_Player_reserveTransfer.apply(this, arguments);
    };
    
    
    // マップに入る時
    const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function() {
        _Game_Player_performTransfer.apply(this, arguments);

        //イベント位置を更新
        const mapEnabled = $gameGabaEventLocationMap[$gameMap._mapId];
        if (mapEnabled != null && mapEnabled){
            for (const event of $gameMap.events()) {
                const wEventLocation = $gameGabaEventLocation[GABA_GetEventLocationKeyString(event)];
                if (wEventLocation == null){
                    continue;
                } else if (!wEventLocation.eventEnabled){
                    continue;
               } else {
                    event.locate(wEventLocation.x, wEventLocation.y);
                   if (directionEnabled) {
                       // 向きは「向きを保存」パラメーターに関係なく保存されている。それを適用するかどうかを切り替え。
                       event.setDirection(wEventLocation.direction);
                   }
                }
            }
        }
    };
    
    //-----------------------------------------------------------------------------
    // Method
    //

    // マップごとの有効無効設定
    GABA_SetEventLocationMapEnabled = function(mapEnabled){
        $gameGabaEventLocationMap[$gameMap._mapId] = mapEnabled;
    }
    
    // イベントごとの有効無効設定（なんとなくスクリプトからthisで実行できるようにしてあります）
    GABA_SetEventLocationEnabled = function(event, eventEnabled){
        
        if (Array.isArray(event)) {
            // 配列指定
            event.forEach(function(value){
               const wEvent = $gameMap.event(value);
                if (wEvent != null){
                   const wEventLocation = {x: wEvent._x, y: wEvent._y, direction : wEvent._direction, eventEnabled: eventEnabled};
                   $gameGabaEventLocation[GABA_GetEventLocationKeyString(wEvent)] = wEventLocation;
                }
            });
       } else if (typeof event === "object"){
            // スクリプトからのthis指定と仮定
           const wEventLocation = {x: event._x, y: event._y, direction : event._direction, eventEnabled: eventEnabled};
           $gameGabaEventLocation[GABA_GetEventLocationKeyString(event)] = wEventLocation;
        } else {
           //引数間違い
           return;
       }
    }

    // このマップの全イベントに有効無効を設定
    GABA_SetEventLocationEnabledAll = function(eventEnabled){
        for (const event of $gameMap.events()) {
            const wEventLocation = {x: event._x, y: event._y, direction : event._direction, eventEnabled: eventEnabled};
            $gameGabaEventLocation[GABA_GetEventLocationKeyString(event)] = wEventLocation;
        }
    }
    
    
    // イベントのキーストリングを取得
    GABA_GetEventLocationKeyString = function(event) {
        return "map" + event._mapId + 'event' + event._eventId;
    }
    
})();
