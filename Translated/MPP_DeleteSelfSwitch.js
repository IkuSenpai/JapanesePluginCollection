//=============================================================================
// MPP_DeleteSelfSwitch.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc When you move to another place, turn off the specified self-switch.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command details
 *  - In MV, the variable N is referred to by writing v [N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v [N] to refer to the variable N.
 *  
 *  〇 MV / MZ
 *  
 *  〇 DeleteSelfSwitch mapIds sw  / delete
 *      mapIds : Range can be specified
 *      sw     : Self switch to turn off
 *   - Turns off all self-switches on the specified map.
 *   - When specifying the range, do not put a space between them. (MV only)
 *   - Do not put a space between the self-switch specifications.
 *       Example： DeleteSelfSwitch 1 A
 *                   => Change self-switch A of map ID 1 to OFF
 *                 DeleteSelfSwitch v[13] BCD
 *                   => Change the self-switch B, C, D of the map ID of
 *                      variable 13 to OFF
 *                 DeleteSelfSwitch 1-5,8 BC
 *                   => Change the self-switches B and C of map IDs 1 to 5 and
 *                      8 to OFF
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
 * @desc Range can be specified
 * @default 0
 * 
 * @arg switchs
 * @desc 
 * @default ABCD
 * 
 * @--------------------------------
 * 
 * @param Map IDs
 * @desc Map ID that turns off the self-switch when moving to another location
 * (All maps if empty / Range can be specified)
 * @default 
 * 
 * @param Self Switches
 * @desc Self switch to turn off
 * @default ABCD
 *
 * @param Self Variables
 * @desc Self variable to be 0
 * (Only when MPP_SelfVariable is installed / Range can be specified)
 * @default 
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc 場所移動した際に、指定したセルフスイッチをOFFにします。
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
 *  〇 DeleteSelfSwitch mapIds sw  / セルフスイッチ削除
 *      mapIds : マップID (範囲指定可)
 *      sw     : OFFにするセルフスイッチ
 *   - 指定したマップのセルフスイッチを全てOFFにします。
 *   - 範囲指定する場合は間にスペースを入れないでください。(MVのみ)
 *   - セルフスイッチの指定は間にスペースを入れないでください。
 *       例： DeleteSelfSwitch 1 A
 *             => マップID 1 番のセルフスイッチ A をOFFに変更
 *           DeleteSelfSwitch v[13] BCD
 *             => 変数13番のマップIDのセルフスイッチ B,C,D をOFFに変更
 *           DeleteSelfSwitch 1-5,8 BC
 *             => マップID 1～5と8 のセルフスイッチ B,C をOFFに変更
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
 * @text 削除
 * @desc 
 *
 * @arg mapIds
 * @text マップID
 * @desc 範囲指定可
 * @default 0
 * 
 * @arg switchs
 * @text スイッチ
 * @desc 
 * @default ABCD
 * 
 * @--------------------------------
 * 
 * @param Map IDs
 * @text マップID
 * @desc 場所移動でセルフスイッチをOFFにするマップIDの配列
 * (空の場合はすべてのマップ / 範囲指定可)
 * @default 
 * 
 * @param Self Switches
 * @text セルフスイッチ
 * @desc OFFにするセルフスイッチ
 * @default ABCD
 *
 * @param Self Variables
 * @text セルフ変数
 * @desc 0にするセルフ変数
 * (MPP_SelfVariable導入時のみ / 範囲指定可)
 * @default 
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_DeleteSelfSwitch';
    
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
    const params_MapIDs = convertToArray(parameters['Map IDs']);
    const params_SelfSwitches = parameters['Self Switches'];
    const params_SelfVariables = convertToArray(parameters['Self Variables']);
    
    // Dealing with other plugins
    const _importedPlugin = (...names) => {
        return names.some(name => PluginManager._scripts.includes(name));
    };
    
    //-------------------------------------------------------------------------
    // Game_SelfSwitches

    Game_SelfSwitches.prototype.delete = function(mapId, switchs) {
        const re = new RegExp('%1,\\d+,[%2]'.format(mapId, switchs));
        for (const key in this._data) {
            if (re.test(key)) {
                delete this._data[key];
            }
        }
        this.onChange();
    };

    //-------------------------------------------------------------------------
    // Game_Map

    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        if (
            this._mapId !== mapId &&
            (params_MapIDs.length === 0 || params_MapIDs.includes(this._mapId))
        ) {
            $gameSelfSwitches.delete(this._mapId, params_SelfSwitches);
            if (_importedPlugin('MPP_SelfVariable')) {
                $gameVariables.deleteSelfValues(this._mapId, [], params_SelfVariables);
            }
        }
        _Game_Map_setup.apply(this, arguments);
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        DeleteSelfSwitch: { name:'delete', keys:['mapIds', 'switchs'] }
    };
    Object.assign(_mzCommands, {
        'セルフスイッチ削除': _mzCommands.DeleteSelfSwitch
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
    
    PluginManager.registerCommand(pluginName, 'delete', args => {
        const switchs = args.switchs.toUpperCase();
        for (const mapId of PluginManager.mppConvertRange(args.mapIds)) {
            $gameSelfSwitches.delete(mapId, switchs);
        }
    });

    PluginManager.mppConvertRange = function(text) {
        return convertToArray(text.replace(/V\[(\d+)\]/gi, (_, p1) =>
            $gameVariables.value(parseInt(p1))
        ));
    };

})();
