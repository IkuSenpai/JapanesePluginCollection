//=============================================================================
// MPP_SelfVariable.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Add a self variable to each event.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Overview
 *  - The variable with the number set in the plug-in parameter will refer to
 *    the self variable for each event.
 *  - If you operate the variable with the number set from [Control Variables]
 *    of the event command, the self-variable of the running event will be
 *    changed.
 *  - The self variable is referenced in the [Condition] of the event.
 *  - When [Common Event] is performed from an event, the self-variable of
 *    each event is referenced.
 *  - When the trigger of the common event is "autorun" or "parallel",
 *    the self-variable for each common event is referenced.
 *  - Self variables do not apply to Troop battle events.
 *  - Even for normal events, the following commands cannot be used for
 *    parallel processing.
 *      >Show Text (control characters)
 *      >Show Choices (control characters)
 *      >Input Number
 *      >Select Item
 *      >Show Scrolling Text (control characters)
 * 
 * ▼ Plugin command details
 *  - In MV, the variable N is referred to by writing v [N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v [N] to refer to the variable N.
 *  
 *  〇 MV / MZ
 *  
 *  〇 DeleteSelfVariable mapIds indexes  / delete
 *      mapIds  : Range can be specified
 *      indexes : Self variable number / Range can be specified
 *   - Set all the specified self variables of the specified map ID to 0.
 *   - When specifying the range, do not put a space between them. (MV only)
 *       Example： DeleteSelfVariable 1 3
 *                   => Change self variable No. 3 of map ID No. 1 to 0
 *                 DeleteSelfVariable v[13] 1-5
 *                   => Change the self-variables 1 to 5 of the map ID of
 *                      variable 13 to 0
 *                 DeleteSelfVariable 1-5,8 1,2
 *                   => Change self variables 1 and 2 of map IDs 1-5 and 8 to 0
 * 
 *  〇 SetSelfVariable mapIds evIds indexes n  / set
 *      mapIds  : Range can be specified
 *      evIds   : Event ID / Range can be specified
 *      indexes : Self variable number / Range can be specified
 *      n       : Value
 *   - Set the value n by specifying the map ID, event ID,
 *     and self-variable number.
 *   - When specifying the range, do not put a space between them. (MV only)
 *       Example： SetSelfVariable 1 2 3 5
 *                   => Change the self variable No. 3 of the event ID No. 2
 *                      of the map ID No. 1 to 5.
 *                 SetSelfVariable 1-3 1,3,5 2-5 v[5]
 *                   => Change the self variables 2 to 5 of map IDs 1 to 3 and
 *                      event IDs 1 and 3 to the value of variable 5
 *       
 * ▼ About range specification
 *  - When setting numbers in an array, you can specify numbers from n to m by
 *    writing n-m.
 *      Example: 1-4,8,10-12
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @command delete
 * @desc 
 *
 * @arg mapIds
 * @desc 0:Current map / Range can be specified
 * @default 0
 * 
 * @arg indexes
 * @desc Range can be specified
 * @default 0
 * 
 * @--------------------------------
 * 
 * @command set
 * @desc 
 *
 * @arg mapIds
 * @desc 0:Current map / Range can be specified
 * @default 0
 * 
 * @arg eventIds
 * @desc Range can be specified
 * @default 0
 * 
 * @arg indexes
 * @desc Range can be specified
 * @default 0
 * 
 * @arg value
 * @desc 
 * @type number
 * @min -99999999
 * @max 99999999
 * @default 0
 * 
 * @--------------------------------
 * 
 * @param Variables
 * @desc Number of variable to be self-variable
 * (Range can be specified)
 * @default 
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 各イベントにセルフ変数を追加します。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ 概要
 *  - プラグインパラメータにて設定した番号の変数が、イベントごとのセルフ変数を
 *    参照するようになります。
 *  - イベントコマンドの[変数の操作]から設定した番号の変数の操作を行うと、
 *    実行中のイベントのセルフ変数が変更されます。
 *  - イベントの[出現条件]ではセルフ変数が参照されます。
 *  - イベントから[コモンイベントの呼び出し]を行った場合、
 *    各イベントのセルフ変数が参照されます。
 *  - コモンイベントを自動実行or並列実行した場合、コモンイベントごとのセルフ変数が
 *    参照されます。
 *  - トループのバトルイベントにはセルフ変数が適用されません。
 *  - 通常のイベントでも、並列処理の場合は以下のコマンドでは使用できません。
 *      >文章の表示（制御文字）
 *      >選択肢の表示（制御文字）
 *      >数値入力の処理
 *      >アイテム選択の処理
 *      >文章のスクロール表示（制御文字）
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 MV / MZ
 *  
 *  〇 DeleteSelfVariable mapIds indexes  / セルフ変数削除
 *      mapIds  : マップID (範囲指定可)
 *      indexes : セルフ変数の番号 (範囲指定可)
 *   - 指定したマップIDの指定したセルフ変数を全て0にします。
 *   - 範囲指定する場合は間にスペースを入れないでください。(MVのみ)
 *       例： DeleteSelfVariable 1 3
 *             => マップID 1 番のセルフ変数 3 番を0に変更
 *           DeleteSelfVariable v[13] 1-5
 *             => 変数 13 番のマップIDのセルフ変数 1～5 番を0に変更
 *           DeleteSelfVariable 1-5,8 1,2
 *             => マップID 1～5と8 のセルフ変数 1と2 番を0に変更
 * 
 *  〇 SetSelfVariable mapIds evIds indexes n  / セルフ変数変更
 *      mapIds  : マップID (範囲指定可)
 *      evIds   : イベントID (範囲指定可)
 *      indexes : セルフ変数の番号 (範囲指定可)
 *      n       : 設定する値
 *   - マップID、イベントID、セルフ変数番号を指定して、値 n を設定します。
 *   - 範囲指定する場合は間にスペースを入れないでください。(MVのみ)
 *       例： SetSelfVariable 1 2 3 5
 *             => マップID 1 番のイベントID 2 番のセルフ変数 3 番を5に変更
 *           SetSelfVariable 1-3 1,3,5 2-5 v[5]
 *             => マップID 1～3 番のイベントID 1と3と5 番のセルフ変数 2～5 番を
 *                変数 5 番の値に変更
 *       
 * ▼ 範囲指定について
 *  - 数値を配列で設定する際、n-m と表記することでnからmまでの数値を指定できます。
 *      例: 1-4,8,10-12
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @command delete
 * @text セルフ変数削除
 * @desc 
 *
 * @arg mapIds
 * @text マップID
 * @desc 0:現在のマップ / 範囲指定可
 * @default 0
 * 
 * @arg indexes
 * @text 変数番号
 * @desc 範囲指定可
 * @default 0
 * 
 * @--------------------------------
 * 
 * @command set
 * @text セルフ変数変更
 * @desc 
 *
 * @arg mapIds
 * @text マップID
 * @desc 0:現在のマップ / 範囲指定可
 * @default 0
 * 
 * @arg eventIds
 * @text イベントID
 * @desc 範囲指定可
 * @default 0
 * 
 * @arg indexes
 * @text 変数番号
 * @desc 範囲指定可
 * @default 0
 * 
 * @arg value
 * @text 値
 * @desc 
 * @type number
 * @min -99999999
 * @max 99999999
 * @default 0
 * 
 * @--------------------------------
 * 
 * @param Variables
 * @desc セルフ変数にする変数の番号
 * (範囲指定可)
 * @default 
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_SelfVariable';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const convertToArray = (param) => {
        return param.split(',').reduce((r, item) => {
            const match = /(\d+)-(\d+)/.exec(item);
            if (match) {
                const start = Number(match[1]);
                const end = Number(match[2]);
                return r.concat([...Array(end + 1).keys()].slice(start));
            } else {
                return item ? r.concat(Number(item)) : r;
            }
        }, []);
    };
    const params_Variables = convertToArray(parameters['Variables']);

    //-------------------------------------------------------------------------
    // Game_Temp

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._reservedCommonEventId = 0;
    };

    Game_Temp.prototype.reservedCommonEventId = function() {
        return this._reservedCommonEventId;
    };

    // MV
    const _Game_Temp_reservedCommonEvent = Game_Temp.prototype.reservedCommonEvent;
    Game_Temp.prototype.reservedCommonEvent = function() {
        this._reservedCommonEventId = this._commonEventId;
        return _Game_Temp_reservedCommonEvent.apply(this, arguments);
    };

    // MZ
    const _Game_Temp_retrieveCommonEvent = Game_Temp.prototype.retrieveCommonEvent;
    Game_Temp.prototype.retrieveCommonEvent = function() {
        this._reservedCommonEventId = this._commonEventQueue[0] || 0;
        return _Game_Temp_retrieveCommonEvent.apply(this, arguments);
    };

    //-------------------------------------------------------------------------
    // Game_Variables

    const _Game_Variables_clear = Game_Variables.prototype.clear;
    Game_Variables.prototype.clear = function() {
        _Game_Variables_clear.apply(this, arguments);
        this._selfVariables = {};
        this._mapId = 0;
        this._eventId = 0;
    };

    const _Game_Variables_value = Game_Variables.prototype.value;
    Game_Variables.prototype.value = function(variableId) {
        if (this._eventId > 0 && params_Variables.includes(variableId)) {
            const key = [this._mapId, this._eventId, variableId];
            return this._selfVariables[key] || 0;
        } else {
            return _Game_Variables_value.apply(this, arguments);
        }
    };

    const _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function(variableId, value) {
        if (this._eventId > 0 && params_Variables.includes(variableId)) {
            const key = [this._mapId, this._eventId, variableId];
            this.setSelfValue(key, value);
        } else {
            _Game_Variables_setValue.apply(this, arguments);
        }
    };

    Game_Variables.prototype.setSelfValue = function(key, value) {
        if (typeof value === 'number') {
            value = Math.floor(value);
        }
        this._selfVariables[key] = value;
        this.onChange();
    };

    Game_Variables.prototype.deleteSelfValues = function(mapId, evIds, indexes) {
        const re = new RegExp('%1,(\\d+),(\\d+)'.format(mapId));
        for (const key in this._selfVariables) {
            const match = re.exec(key);
            if (match) {
                if (
                    (evIds.length === 0 || evIds.includes(Number(match[1]))) &&
                    (indexes.length === 0 || indexes.includes(Number(match[2])))
                ) {
                    delete this._selfVariables[key];
                }
            }
        }
        this.onChange();
    };

    Game_Variables.prototype.reserveEvent = function(mapId, eventId) {
        this._mapId = mapId;
        this._eventId = eventId;
    };

    //-------------------------------------------------------------------------
    // Game_Event

    const _Game_Event_findProperPageIndex = Game_Event.prototype.findProperPageIndex;
    Game_Event.prototype.findProperPageIndex = function() {
        $gameVariables.reserveEvent(this._mapId, this._eventId);
        return _Game_Event_findProperPageIndex.apply(this, arguments);
    };

    //-------------------------------------------------------------------------
    // Game_CommonEvent

    const _Game_CommonEvent_refresh = Game_CommonEvent.prototype.refresh;
    Game_CommonEvent.prototype.refresh = function() {
        _Game_CommonEvent_refresh.apply(this, arguments);
        if (this._interpreter) {
            this._interpreter._commonEventId = this._commonEventId;
        }
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.apply(this, arguments);
        this._commonEventId = 0;
    };

    const _Game_Interpreter_setupReservedCommonEvent = Game_Interpreter.prototype.setupReservedCommonEvent;
    Game_Interpreter.prototype.setupReservedCommonEvent = function() {
        const result = _Game_Interpreter_setupReservedCommonEvent.apply(this, arguments);
        if (result) {
            this._commonEventId = $gameTemp.reservedCommonEventId();
        }
        return result;
    };

    const _Game_Interpreter_update = Game_Interpreter.prototype.update;
    Game_Interpreter.prototype.update = function() {
        this.reserveSelfVar();
        _Game_Interpreter_update.apply(this, arguments);
    };

    const _Game_Interpreter_setupChild = Game_Interpreter.prototype.setupChild;
    Game_Interpreter.prototype.setupChild = function(list, eventId) {
        _Game_Interpreter_setupChild.apply(this, arguments);
        this._childInterpreter._commonEventId = this._commonEventId;
    };

    Game_Interpreter.prototype.reserveSelfVar = function() {
        if (this._commonEventId > 0) {
            $gameVariables.reserveEvent(-1, this._commonEventId);
        } else if (this._eventId > 0) {
            $gameVariables.reserveEvent(this._mapId, this._eventId);
        }
    };

    const _mzCommands = {
        DeleteSelfVariable: { name:'delete', keys:['mapIds', 'indexes'] },
        SetSelfVariable: {
            name:'set',
            keys:['mapIds', 'eventIds', 'indexes', 'value']
        }
    };
    Object.assign(_mzCommands, {
        'セルフ変数削除': _mzCommands.DeleteSelfVariable,
        'セルフ変数操作': _mzCommands.SetSelfVariable
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 =
                Object.assign( ...mzCommand.keys.map((k,i) => ({[k]:args[i]})) );
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
    
    PluginManager.registerCommand(pluginName, 'delete', args => {
        const indexes = PluginManager.mppConvertRange(args.indexes);
        for (let mapId of PluginManager.mppConvertRange(args.mapIds)) {
            mapId = mapId || $gameMap.mapId();
            $gameVariables.deleteSelfValues(mapId, [], indexes);
        }
    });

    PluginManager.registerCommand(pluginName, 'set', args => {
        const eventIds = PluginManager.mppConvertRange(args.eventIds);
        const indexes = PluginManager.mppConvertRange(args.indexes);
        const value = PluginManager.mppValue(args.value);
        for (let mapId of PluginManager.mppConvertRange(args.mapIds)) {
            mapId = mapId || $gameMap.mapId();
            for (const evId of eventIds) {
                for (const index of indexes) {
                    if (
                        mapId > 0 &&
                        evId > 0 &&
                        params_Variables.includes(index)
                    ) {
                        const key = [mapId, evId, index];
                        $gameVariables.setSelfValue(key, value);
                    }
                }
            }
        }
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    PluginManager.mppConvertRange = function(text) {
        return convertToArray(text.replace(/V\[(\d+)\]/gi, (_, p1) =>
            $gameVariables.value(parseInt(p1))
        ));
    };
    
})();
