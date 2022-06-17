//=============================================================================
// MPP_MoveRouteEX.js
//=============================================================================
// Copyright (c) 2016 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc An assortment of commands related to Set Movement Route.
 * @author Mokusei Penguin
 * @url
 *
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ プラグインコマンド
 *  - In MV, the variable N is referred to by writing v[N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v[N] to refer to the variable N.
 * 
 *  〇 MV / MZ
 *  
 *  〇 WaitRoute evId  / waitRoute
 *      evId : -1:Player, 0:This event, 1...:Event ID
 *   - Wait until the character's movement is complete.
 * 
 * ▼ Set Movement Route Script
 *  〇 movePos(x, y) / movePos(x, y, skip)
 *   - Move towards the coordinates (x, y).
 *   - The movement method is the same as touch movement.
 *   - If skip is set to true, it will be interrupted when it cannot be moved.
 *   - When using this command, do not check [Skip If Cannot Move]
 *     in the [Set Movement Route] option.
 * 
 *  〇 x / y
 *   - Directly operate the X and Y coordinates.
 *       x = N    # Move to the X coordinate N.
 *       x += N   # Moves N squares to the right from the current X coordinate.
 *       x -= N   # Moves N squares to the left from the current X coordinate.
 *       y = N    # Move to the Y coordinate N.
 *       y += N   # Moves N squares down from the current Y coordinate.
 *       y -= N   # Moves N squares from the current Y coordinate.
 *   - x and y can be either uppercase or lowercase.
 *   - A value of N will work even if it is negative.
 *   - The value of N also works with numbers after the decimal point.
 *   - However, after using the decimal point, use roundX etc.
 *     to return it to an integer.
 *   - It works with or without spaces, but not with more than one space.
 *   - No collision detection is done. Moves straight to the specified
 *     coordinates.
 *   - Ladder, Bushes and Damaged Floors are also ignored.
 *   - It does not support loop movement of the map.
 *   - If you specify coordinates outside the map, the character will move off
 *     the screen.
 * 
 *  〇 roundX / roundY
 *   - Round off the decimal point of the X and Y coordinates to make
 *     an integer.
 *   - If the decimal point remains, collision detection will not be performed
 *     normally.
 *   - We do not change the direction of the character or do walking animation.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command waitRoute
 *      @desc 
 *      @arg character
 *          @desc -1:Player, 0:This event, 1...:Event ID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 */

/*:ja
 * @target MV MZ
 * @plugindesc 移動ルートに関するコマンド詰め合わせ。
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
 *  〇 WaitRoute evId  / 移動が完了するまでウェイト
 *      evId : イベントID(-1:プレイヤー, 0:このイベント)
 *   - キャラクターの移動が完了するまでウェイトをかけます。
 * 
 * ▼ 移動ルートのスクリプト
 *  〇 movePos(x, y) / movePos(x, y, skip)
 *   - 座標(x, y)に向かって移動します。
 *   - 移動方法はタッチ移動と同じ処理です。
 *   - skip を true にした場合、移動できなかった時点で中断します。
 *   - このコマンドを使用する場合、[移動ルートの設定]のオプションにある
 *     [移動できない場合は飛ばす]にはチェックを入れないでください。
 * 
 *  〇 x / y
 *   - X座標、Y座標を直接操作します。
 *       x = n    # X座標 n まで移動します。
 *       x += n   # 現在のX座標から n マス右に移動します。
 *       x -= n   # 現在のX座標から n マス左に移動します。
 *       y = n    # Y座標 n まで移動します。
 *       y += n   # 現在のY座標から n マス下に移動します。
 *       y -= n   # 現在のY座標から n マス上に移動します。
 *   - x および y は大文字小文字どちらでも可能です。
 *   - n の値はマイナスでも動作します。
 *   - n の値は小数点以下の数値でも動作します。
 *   - ただし、小数点以下を使用した後はroundX等を使って整数に戻してください。
 *   - スペースはあってもなくても動作しますが、2つ以上のスペースでは動作しません。
 *   - 衝突判定は一切しません。指定座標までまっすぐ移動します。
 *   - はしご、茂み、ダメージ床も無視されます。
 *   - マップのループ移動には対応していません。
 *   - マップの外の座標を指定した場合、キャラクターは画面の外まで移動します。
 * 
 *  〇 roundX / roundY
 *   - X座標、Y座標の小数点以下を四捨五入して整数にします。
 *   - 小数点以下が残ったままだと衝突判定等が正常に行われなくなります。
 *   - キャラクターの向き変更や歩行アニメは行いません。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command waitRoute
 *      @text 移動が完了するまでウェイト
 *      @desc 
 *      @arg character
 *          @text 対象キャラクター
 *          @desc -1:プレイヤー, 0:このイベント, 1...:イベントID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MoveRouteEX';
    
    //-------------------------------------------------------------------------
    // Game_Character

    const _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
    Game_Character.prototype.processMoveCommand = function(command) {
        if (command.code === Game_Character.ROUTE_SCRIPT) {
            const commandExt = {
                code: command.code,
                parameters: [this.convertMppScript(command.parameters[0])]
            };
            _Game_Character_processMoveCommand.call(this, commandExt);
        } else {
            _Game_Character_processMoveCommand.apply(this, arguments);
        }
    };

    Game_Character.prototype.convertMppScript = function(script) {
        return script
            .replace(
                /^movePos\((.+?)\)$/,
                (_, p1) => `this.moveCoordinates(${p1})`
            )
            .replace(
                /^x\s?=\s?(-?\d+\.?\d*)$/i,
                (_, p1) => `this.moveX(${p1})`
            )
            .replace(
                /^x\s?\+=\s?(-?\d+\.?\d*)$/i,
                (_, p1) => `this.moveX(${this._x + +p1})`
            )
            .replace(
                /^x\s?\-=\s?(-?\d+\.?\d*)$/i,
                (_, p1) => `this.moveX(${this._x - +p1})`
            )
            .replace(
                /^y\s?=\s?(-?\d+\.?\d*)$/i,
                (_, p1) => `this.moveY(${p1})`
            )
            .replace(
                /^y\s?\+=\s?(-?\d+\.?\d*)$/i,
                (_, p1) => `this.moveY(${this._y + +p1})`
            )
            .replace(
                /^y\s?\-=\s?(-?\d+\.?\d*)$/i,
                (_, p1) => `this.moveY(${this._y - +p1})`
            )
            .replace(/^roundX$/, 'this._x = Math.round(this._x)')
            .replace(/^roundY$/, 'this._y = Math.round(this._y)');
    };

    Game_Character.prototype.moveCoordinates = function(x, y, skippable = false) {
        const direction = this.findDirectionTo(x, y);
        if (direction > 0) {
            this.moveStraight(direction);
            this.setMovementSuccess(false);
        } else if (
            Math.abs(this._x - x) + Math.abs(this._y - y) < this.searchLimit()
        ) {
            this.setMovementSuccess(skippable || this.pos(x, y));
        }
    };

    Game_Character.prototype.moveX = function(x) {
        if (this._x > x) this.setDirection(4);
        if (this._x < x) this.setDirection(6);
        this._x = x;
        this.resetStopCount();
    };

    Game_Character.prototype.moveY = function(y) {
        if (this._y < y) this.setDirection(2);
        if (this._y > y) this.setDirection(8);
        this._y = y;
        this.resetStopCount();
    };

    //-------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        WaitRoute: { name:'waitRoute', keys:['character'] }
    };
    Object.assign(_mzCommands, {
        '移動が完了するまでウェイト': _mzCommands.WaitRoute
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const mzCommand = _mzCommands[command];
        if (mzCommand) {
            const args2 = Object.assign(
                ...mzCommand.keys.map((k,i) => ({ [k]: args[i] }))
            );
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
    
    PluginManager.registerCommand(pluginName, 'waitRoute', function(args) {
        const param = PluginManager.mppValue(args.character);
        this._waitMode = 'route';
        this._character = this.character(param);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
})();
