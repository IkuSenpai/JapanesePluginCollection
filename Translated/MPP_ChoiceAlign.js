//=============================================================================
// MPP_ChoiceAlign.js
//=============================================================================
// Copyright (c) 2020 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Adds the ability to align characters to the choices.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 2.0.1]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ Plugin command
 *  - In MV, the variable N is referred to by writing v [N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v [N] to refer to the variable N.
 *  
 *  〇 MV / MZ
 *  
 *  〇 SetChoiceAlign n  / choiceAlign
 *       n : Align(0:left, 1:center, 2:right)
 *   - Specifies the alignment position for the next choice.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 * @command choiceAlign
 * @desc 
 *
 * @arg align
 * @desc 
 * @type select
 * @option left
 * @value 0
 * @option center
 * @value 1
 * @option right
 * @value 2
 * @default 1
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 選択肢に文字揃えを行う機能を追加します。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 2.0.1]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ プラグインコマンド
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 MV / MZ
 *  
 *  〇 SetChoiceAlign n  / 選択肢文字揃え
 *       n : 揃えの位置(0:左揃え, 1:中央揃え, 2:右揃え)
 *   - 次に表示される選択肢の文字揃えの位置を指定します。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 * @command choiceAlign
 * @text 選択肢文字揃え
 * @desc 次に表示される選択肢の文字揃えの位置を指定します。
 *
 * @arg align
 * @text 揃え位置
 * @desc 
 * @type select
 * @option 左揃え
 * @value 0
 * @option 中央揃え
 * @value 1
 * @option 右揃え
 * @value 2
 * @default 1
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_ChoiceAlign';
    
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

    PluginManager.registerCommand(pluginName, 'choiceAlign', args => {
        const align = PluginManager.mppValue(args.align);
        $gameMessage.setChoiceAlign(align);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    //-----------------------------------------------------------------------------
    // Game_Message

    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.apply(this, arguments);
        this._choiceAlign = 0;
    };

    Game_Message.prototype.setChoiceAlign = function(align) {
        this._choiceAlign = align;
    };

    Game_Message.prototype.choiceAlign = function() {
        return this._choiceAlign;
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        SetChoiceAlign: { name:'choiceAlign', keys:['align'] }
    };
    Object.assign(_mzCommands, {
        '選択肢文字揃え': _mzCommands.SetChoiceAlign
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
    
    //-----------------------------------------------------------------------------
    // Window_ChoiceList

    // overwrite
    Window_ChoiceList.prototype.drawItem = function(index) {
        const rect = this.itemRectForText
                        ? this.itemRectForText(index)
                        : this.itemLineRect(index);
        const text = this.commandName(index);
        const textWidth = this.textWidthEx
                            ? this.textWidthEx(text)
                            : this.textSizeEx(text).width;
        switch ($gameMessage.choiceAlign()) {
            case 1:
                rect.x += (rect.width - textWidth) / 2;
                break;
            case 2:
                rect.x += rect.width - textWidth;
                break;
        }

        this.drawTextEx(text, rect.x, rect.y, rect.width);
    };

})();
