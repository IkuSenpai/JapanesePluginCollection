//=============================================================================
// MPP_SmoothBattleLog.js
//=============================================================================
// Copyright (c) 2018-2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Change the display method and behavior of the battle log to speed up the progress of the battle.
 * @author Mokusei Penguin
 * @url
 *
 * @help [version 2.3.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Overview
 *  - By making the battle log display method cumulative, sentences will not
 *    disappear immediately even if the log progresses quickly.
 *  - You can check the battle past log from the party command.
 * 
 * ▼ Log Type
 *  〇 all
 *   - The battle log window disappears after a certain amount of time has
 *     passed since the last log was displayed.
 *  〇 1-line
 *   - The logs are deleted in order from the log that has passed a certain
 *     period of time since it was displayed.
 *
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Log Type
 *      @desc 
 *      @type select
 *          @option all
 *          @option 1-line
 *      @default 1-line
 * 
 *  @param Battle Log Window Params
 *      @desc 
 *      @type struct<BattleLogWindow>
 *      @default {"X":"0","Y":"0","Width":"0","Lines":"6","Font Size":"26"}
 * 
 *  @param Message Speed
 *      @desc Battle log display speed
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 8
 * 
 *  @param View Duration
 *      @desc Battle log display time
 * (0:Always displayed)
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 150
 * 
 *  @param Wait New Line?
 *      @desc Whether or not there is a weight when a new log is added.
 * If it behaves strangely, enable it.
 *      @type boolean
 *      @default false
 * 
 *  @param Start Messages On Log?
 *      @desc Whether to display the battle start message in the log
 *      @type boolean
 *      @default false
 * 
 *  @param Log Command
 *      @desc Command name to display battle past log
 * (Hide when empty)
 *      @default Battle Log
 * 
 *  @param Past Log Window Params
 *      @desc 
 *      @type struct<PastLogWindow>
 *      @default {"X":"0","Y":"0","Width":"0","height":"0","Font Size":"26"}
 * 
 */

/*~struct~BattleLogWindow:
 *  @param X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Width
 *      @desc 0:Default
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Lines
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *  @param Font Size
 *      @desc 
 *      @type number
 *          @min 6
 *          @max 99
 *      @default 26
 * 
 */

/*~struct~PastLogWindow:
 *  @param X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Width
 *      @desc 0:Default
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Height
 *      @desc 0:Default
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Font Size
 *      @desc 
 *      @type number
 *          @min 6
 *          @max 99
 *      @default 26
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘ログの表示方法や動作を変更し、戦闘の進行を早くします。
 * @author 木星ペンギン
 * @url
 *
 * @help [version 2.3.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ 概要
 *  - 戦闘ログの表示方法を蓄積型にすることで、ログ進行が早くても文章がすぐに
 *    消えることがなくなります。
 *  - パーティコマンドから戦闘過去ログを確認することができます。
 * 
 * ▼ ログタイプ
 *  〇 まとめて消去
 *   - 最後のログが表示されてから一定時間がたつと戦闘ログウィンドウが
 *     非表示となります。
 *  〇 一行ずつ消去
 *   - 表示されてから一定時間経過したログから順に消去されます。
 *
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Log Type
 *      @text ログタイプ
 *      @desc 戦闘ログの消去タイプ
 *      @type select
 *          @option まとめて消去
 *          @value all
 *          @option 一行ずつ消去
 *          @value 1-line
 *      @default 1-line
 * 
 *  @param Battle Log Window Params
 *      @text 戦闘ログウィンドウ設定
 *      @desc 
 *      @type struct<BattleLogWindow>
 *      @default {"X":"0","Y":"0","Width":"0","Lines":"6","Font Size":"26"}
 * 
 *  @param Message Speed
 *      @text メッセージ速度
 *      @desc 戦闘ログの表示速度
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 8
 * 
 *  @param View Duration
 *      @text 表示時間
 *      @desc 戦闘ログの表示時間
 * (0:常時表示)
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 150
 * 
 *  @param Wait New Line?
 *      @text ログ追加時のウェイト
 *      @desc 新しいログが追加された際のウェイトの有無。
 * 挙動がおかしくなる場合は有効化してください。
 *      @type boolean
 *      @default false
 * 
 *  @param Start Messages On Log?
 *      @text 戦闘開始メッセージ
 *      @desc 戦闘開始メッセージをログに表示するかどうか
 *      @type boolean
 *      @default false
 * 
 *  @param Log Command
 *      @text ログコマンド名
 *      @desc 戦闘過去ログを表示するコマンド名
 * (空で非表示)
 *      @default 戦闘ログ
 * 
 *  @param Past Log Window Params
 *      @text 過去ログウィンドウ設定
 *      @desc 
 *      @type struct<PastLogWindow>
 *      @default {"X":"0","Y":"0","Width":"0","height":"0","Font Size":"26"}
 * 
 */

/*~struct~BattleLogWindow:ja
 *  @param X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Width
 *      @text 幅
 *      @desc 0:デフォルト
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Lines
 *      @text 最大行数
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 6
 * 
 *  @param Font Size
 *      @text 文字の大きさ
 *      @desc 
 *      @type number
 *          @min 6
 *          @max 99
 *      @default 26
 * 
 */

/*~struct~PastLogWindow:ja
 *  @param X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Width
 *      @text 幅
 *      @desc 0:デフォルト
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Height
 *      @text 高さ
 *      @desc 0:デフォルト
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Font Size
 *      @text 文字の大きさ
 *      @desc 
 *      @type number
 *          @min 6
 *          @max 99
 *      @default 26
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_SmoothBattleLog';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    const param_LogType = parameters['Log Type'] || '1-line';
    const param_BattleLogWindowParams = JSON.parse(parameters['Battle Log Window Params'] || '{}', paramReplace);
    const param_MessageSpeed = Number(parameters['Message Speed'] || 8);
    const param_ViewDuration = Number(parameters['View Duration'] || 150);
    const param_WaitNewLine = parameters['Wait New Line?'] === 'true';
    const param_StartMessagesOnLog = parameters['Start Messages On Log?'] === 'true';
    const param_LogCommand = parameters['Log Command'] || '';
    const param_PastLogWindowParams = JSON.parse(parameters['Past Log Window Params'] || '{}', paramReplace);
    
    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };
    
    // Math extend
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        const mod = (x, n) => ((x % n) + n) % n;
        const tri = (n) => n * (n + 1) / 2;
        return { clamp, mod, tri };
    })();

    //-------------------------------------------------------------------------
    // BattleManager

    const _BattleManager_displayStartMessages = BattleManager.displayStartMessages;
    BattleManager.displayStartMessages = function() {
        if (!param_StartMessagesOnLog) {
            _BattleManager_displayStartMessages.apply(this, arguments);
        }
    };

    BattleManager.displayStartMessagesOnLog = function() {
        for (const name of $gameTroop.enemyNames()) {
            this._logWindow.push('addText', TextManager.emerge.format(name));
        }
        const message = this.initiativeMessage();
        if (message) {
            this._logWindow.push('wait');
            this._logWindow.push('addText', message);
        }
        this._logWindow.push('clear');
    };

    BattleManager.initiativeMessage = function() {
        if (this._preemptive) {
            return TextManager.preemptive.format($gameParty.name());
        } else if (this._surprise) {
            return TextManager.surprise.format($gameParty.name());
        }
        return null;
    };

    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.apply(this, arguments);
        this._logWindow.clearSmoothBattleLog();
    };

    //-------------------------------------------------------------------------
    // Window_BattleLog

    const _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function(rect) {
        _Window_BattleLog_initialize.apply(this, arguments);
        this._lines.push('');
        this._clearDuration = 0;
        this._logScrollYDuration = 0;
        this._logScrollY = this.itemHeight();
        this.contentsOpacity = 0;
        this.createLogSprites();
    };

    Window_BattleLog.prototype.windowHeight = function() {
        return this.fittingHeight(this.maxLines());
    };
    
    Window_BattleLog.prototype.contentsHeight = function() {
        return this.innerHeight + this.itemHeight();
    };
    
    // overwrite
    Window_BattleLog.prototype.maxLines = function() {
        return param_BattleLogWindowParams.Lines || 6;
    };

    Window_BattleLog.prototype.createLogSprites = function() {
        this._logSprites = [];
        this._logSpriteParams = [];
        for (let i = 0; i <= this.maxLines(); i++) {
            const rect = this.lineRect(i);
            const sprite = new Sprite(this.contents);
            sprite._homeX = rect.x;
            sprite._homeY = rect.y;
            sprite.move(rect.x, rect.y);
            sprite.setFrame(rect.x, rect.y, rect.width, rect.height);
            this._logSprites[i] = sprite;
            this._logSpriteParams[i] = { popupDuration: 0, viewDuration: -1 };
            this.addInnerChild(sprite);
        }
    };

    Window_BattleLog.prototype.fontSize = function() {
        return (
            param_BattleLogWindowParams['Font Size'] ||
            $gameSystem.mainFontSize()
        );
    };
    
    const _Window_BattleLog_lineHeight = __base(Window_BattleLog.prototype, 'lineHeight');
    Window_BattleLog.prototype.lineHeight = function() {
        const lineHeight = _Window_BattleLog_lineHeight.apply(this, arguments);
        return lineHeight - $gameSystem.mainFontSize() + this.fontSize();
    };

    Window_BattleLog.prototype.calcTextHeight = function() {
        return this.lineHeight();
    };

    const _Window_BattleLog_resetFontSettings = __base(Window_BattleLog.prototype, 'resetFontSettings');
    Window_BattleLog.prototype.resetFontSettings = function() {
        _Window_BattleLog_resetFontSettings.apply(this, arguments);
        this.contents.fontSize = this.fontSize();
    };

    // overwrite
    Window_BattleLog.prototype.messageSpeed = function() {
        return param_MessageSpeed;
    };

    const _Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        _Window_BattleLog_update.apply(this, arguments);
        this.updateLogType();
        this.updateLogScroll();
        this.updateLogSprites();
    };
    
    Window_BattleLog.prototype.updateLogType = function() {
        if (this._clearDuration > 0) {
            const d = this._clearDuration--;
            const max = Math.min(16, param_ViewDuration);
            if (d <= max) this._clientArea.opacity = 255 * (d - 1) / max;
            if (this._clearDuration === 0) {
                this.clearSmoothBattleLog();
            }
        } else if (
            this.numLines() > 1 &&
            this._logSpriteParams[1].viewDuration === 0
        ) {
            this.shiftLine();
        }
    };

    Window_BattleLog.prototype.updateLogScroll = function() {
        if (this._logScrollYDuration > 0) {
            const d = this._logScrollYDuration--;
            const sy = this.itemHeight() - this._logScrollY;
            this._logScrollY += sy * d / MathExt.tri(d);
        }
        this.origin.y = this._logScrollY;
    };
    
    Window_BattleLog.prototype.updateLogSprites = function() {
        const bottomY = this._logScrollY + this.innerHeight - this.itemHeight();
        for (const [i, sprite] of this._logSprites.entries()) {
            const param = this._logSpriteParams[i];
            if (param.popupDuration > 0) param.popupDuration--;
            if (param.viewDuration > 0) param.viewDuration--;
            sprite.x = sprite._homeX + MathExt.tri(param.popupDuration) / 2;
            sprite.y = Math.min(sprite._homeY, bottomY);
            sprite.opacity = 255 - param.popupDuration * 20;
        }
    };

    Window_BattleLog.prototype.shiftLine = function() {
        this._lines.shift();
        this._logSpriteParams.push(this._logSpriteParams.shift());
        this._logScrollY -= this.itemHeight();
        this._logScrollYDuration = 16;
        this.refresh();
    };

    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        this._baseLineStack = [];
        if (param_LogType === 'all') {
            this._clearDuration = param_ViewDuration;
        }
    };
    
    Window_BattleLog.prototype.clearSmoothBattleLog = function() {
        _Window_BattleLog_clear.call(this);
        this._lines.push('');
        this._logScrollYDuration = 0;
        this._logScrollY = this.itemHeight();
    };

    const _Window_BattleLog_waitForEffect = Window_BattleLog.prototype.waitForEffect;
    Window_BattleLog.prototype.waitForEffect = function() {
        if ($gameParty.isAllDead() || $gameTroop.isAllDead()) {
            _Window_BattleLog_waitForEffect.apply(this, arguments);
        }
    };

    const _Window_BattleLog_addText = Window_BattleLog.prototype.addText;
    Window_BattleLog.prototype.addText = function(text) {
        const indentText = this.indentText(text);
        if (this.numLines() === this.maxLines() + 1) {
            this.shiftLine();
        }
        _Window_BattleLog_addText.call(this, indentText);
        Window_PastBattleLog.addLog(indentText);
        this.newLinePopup();
        this._clearDuration = 0;
        this._clientArea.opacity = 255;
    };

    Window_BattleLog.prototype.newLinePopup = function() {
        const param = this._logSpriteParams[this.numLines() - 1];
        param.popupDuration = 12;
        if (param_LogType === '1-line') {
            param.viewDuration = param_ViewDuration || -1;
        }
    };

    Window_BattleLog.prototype.indentText = function(text) {
        const padding = this.itemPadding();
        const indent = this._baseLineStack.length;
        return `\\PX[${padding + indent * 16}]${text}`;
    };

    // overwrite
    Window_BattleLog.prototype.popBaseLine = function() {
        this._baseLineStack.pop();
    };

    const _Window_BattleLog_waitForNewLine = Window_BattleLog.prototype.waitForNewLine;
    Window_BattleLog.prototype.waitForNewLine = function() {
        if (param_WaitNewLine) {
            _Window_BattleLog_waitForNewLine.apply(this, arguments);
        }
    };

    // overwrite
    Window_BattleLog.prototype.startTurn = function() {};

    //-------------------------------------------------------------------------
    // Window_PastBattleLog

    class Window_PastBattleLog extends Window_Selectable {
        constructor(rect) {
            super(rect);
            this.openness = 0;
            this._data = [];
        }

        static _battleLog = [];

        static clearLog() {
            this._battleLog = [];
        }

        static addLog(text) {
            this._battleLog.push(text);
            if (this._battleLog.length > 100) this._battleLog.shift();
        }

        maxItems() {
            return this._data.length;
        }
    
        fontSize() {
            return (
                param_PastLogWindowParams['Font Size'] ||
                $gameSystem.mainFontSize()
            );
        }
        
        lineHeight() {
            const lineHeight = super.lineHeight();
            return lineHeight - $gameSystem.mainFontSize() + this.fontSize();
        }

        calcTextHeight() {
            return this.lineHeight();
        }

        resetFontSettings() {
            super.resetFontSettings();
            this.contents.fontSize = this.fontSize();
        }
    
        drawItem(index) {
            const rect = this.itemLineRect(index);
            this.drawTextEx(this._data[index], rect.x, rect.y, rect.width);
        }
    
        refresh() {
            this._data = Window_PastBattleLog._battleLog;
            super.refresh();
        }
    
        selectBottom() {
            this.forceSelect(Math.max(this.maxItems() - 1, 0));
        }
    
    }

    //-------------------------------------------------------------------------
    // Window_PartyCommand

    const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
    Window_PartyCommand.prototype.makeCommandList = function() {
        _Window_PartyCommand_makeCommandList.apply(this, arguments);
        if (param_LogCommand) {
            this.addCommand(param_LogCommand, 'pastLog');
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        return (
            _Scene_Battle_isAnyInputWindowActive.apply(this, arguments) ||
            this._pastLogWindow.active
        );
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.apply(this, arguments);
        Window_PastBattleLog.clearLog();
    };

    const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.apply(this, arguments);
        if (param_StartMessagesOnLog) {
            BattleManager.displayStartMessagesOnLog();
        }
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.apply(this, arguments);
        this.createPastLogWindow();
    };

    // overwrite
    Scene_Battle.prototype.logWindowRect = function() {
        const wx = param_BattleLogWindowParams.X || 0;
        const wy = param_BattleLogWindowParams.Y || 0;
        const ww = param_BattleLogWindowParams.Width || Graphics.boxWidth;
        const wh = Window_BattleLog.prototype.windowHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Battle.prototype.createPastLogWindow = function() {
        const rect = this.pastLogWindowRect();
        const pastLogWindow = new Window_PastBattleLog(rect);
        pastLogWindow.setHandler('cancel', this.onPastLogCancel.bind(this));
        this.addWindow(pastLogWindow);
        this._pastLogWindow = pastLogWindow;
    };

    Scene_Battle.prototype.pastLogWindowRect = function() {
        const wx = param_PastLogWindowParams.X || 0;
        const wy = param_PastLogWindowParams.Y || 0;
        const ww = param_PastLogWindowParams.Width || Graphics.boxWidth;
        const wh = param_PastLogWindowParams.Height || this._statusWindow.y;
        return new Rectangle(wx, wy, ww, wh);
    };
    
    const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.apply(this, arguments);
        this._partyCommandWindow.setHandler('pastLog', this.commandPastLog.bind(this));
    };

    Scene_Battle.prototype.commandPastLog = function() {
        this._pastLogWindow.refresh();
        this._pastLogWindow.open();
        this._pastLogWindow.selectBottom();
        this._pastLogWindow.activate();
    };

    Scene_Battle.prototype.onPastLogCancel = function() {
        this._pastLogWindow.close();
        this._pastLogWindow.deactivate();
        this._partyCommandWindow.activate();
    };

    const _Scene_Battle_closeCommandWindows = Scene_Battle.prototype.closeCommandWindows;
    Scene_Battle.prototype.closeCommandWindows = function() {
        _Scene_Battle_closeCommandWindows.apply(this, arguments);
        this._pastLogWindow.close();
        this._pastLogWindow.deactivate();
    };
    
})();
