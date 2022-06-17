//=============================================================================
// CommandWindow.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc コマンドヘルプウィンドウ表示プラグイン
 * @author さすらいのトム
 *
 * @help
 * 戦闘画面上部にそれっぽいコマンド説明欄を追加します。
 * 最大7個まで設定可能です。
 * プラグインパラメータにコマンド名とそれに対応した説明用テキストを
 * 半角カンマ区切りで入力してください。
 * 
 * このプラグインには、プラグインコマンドはありません。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 * 
 * @param CommandName
 * @type string
 * @desc カンマ(,)区切りでコマンド名を設定します。最大7個まで設定可能です。
 * @default 攻撃,魔法,必殺技,防御,アイテム, ,
 * 
 * @param CommandHelpText
 * @type string
 * @desc カンマ区切りでコマンド名に対応したヘルプテキストを設定します。
 * @default 敵を攻撃します。,魔法スキルを使用します。,強力な必殺技を放ちます。,防御して身を守ります。,アイテムを使用します。, ,
 * 
 * 
 */
(function(){
    'use strict'

    const pluginName = 'CommandWindow';
    const parameters = PluginManager.parameters(pluginName);
    const cmdnm = parameters['CommandName'];
    const cmdtxt = parameters['CommandHelpText'];
    const CommandName = cmdnm.split(',');
    const CommandHelpText = cmdtxt.split(',');
    
// ウィンドウを定義 
    function Window_CmdInfo() { 
        this.initialize(...arguments); 
    } 
    Window_CmdInfo.prototype = Object.create(Window_Base.prototype); 
    Window_CmdInfo.prototype.constructor = Window_CmdInfo;

    Window_CmdInfo.prototype.initialize = function(rect) { 
        Window_Base.prototype.initialize.call(this, rect);
        this.opacity = 0;
    };

    Window_CmdInfo.prototype.resetWindow = function() {
        let b1 = 'rgba(0,0,0,0)';
        let b2 = 'rgba(0,0,0,0.5)';
        this.contents.gradientFillRect(0,0,820,32,b2,b1);
        this.contents.fillRect(820,0,820,32,b2);
        this.contents.gradientFillRect(820,0,820,32,b1,b2); 
    };

    Window_ActorCommand.prototype.cmd_name = function() {
        if (!this._list || !this._list[this._index]) {return ""};
        return this._list[this._index].name;
    };

    const _Window_ActorCommand_prototype_setup = Window_ActorCommand.prototype.setup;
    Window_ActorCommand.prototype.setup = function(actor) {
        _Window_ActorCommand_prototype_setup.call(this,actor);
        if (this._actor) {this.setConnandName()};
    };

    Window_ActorCommand.prototype.setConnandName = function() {
        if (this.CmdInfo) {this.removeChild(this.CmdInfo)};
        let x = -632;
        let y = -400;
        let wx = 820;
        let wy = 64;
        this.CmdInfo = new Window_CmdInfo(new Rectangle(x,y,wx,wy));
        console.log(CommandHelpText);
        this.CmdInfo.contents.fontSize = 23;
        this.addChild(this.CmdInfo); 
    }

    const _Window_ActorCommand_prototype_update = Window_ActorCommand.prototype.update;
        Window_ActorCommand.prototype.update = function() {
        _Window_ActorCommand_prototype_update.call(this);
        var cmdname = this.cmd_name();
        if (!this.CmdInfo) {
            return;
        }
        switch(cmdname) {
            case CommandName[0]:
            this.CmdInfo.contents.clear();
            this.CmdInfo.resetWindow()
            this.CmdInfo.changeTextColor(ColorManager.textColor(16));
            this.CmdInfo.drawText("Help:",20, 1);
            this.CmdInfo.resetTextColor();
            this.CmdInfo.drawText(CommandHelpText[0],85, 1);
            break;
    
            case CommandName[1]:
            this.CmdInfo.contents.clear();
            this.CmdInfo.resetWindow();
            this.CmdInfo.changeTextColor(ColorManager.textColor(16));
            this.CmdInfo.drawText("Help:",20, 1);
            this.CmdInfo.resetTextColor();
            this.CmdInfo.drawText(CommandHelpText[1],85, 1);
            break;
    
            case CommandName[2]:
            this.CmdInfo.contents.clear();
            this.CmdInfo.resetWindow()
            this.CmdInfo.changeTextColor(ColorManager.textColor(16));
            this.CmdInfo.drawText("Help:",20, 1);
            this.CmdInfo.resetTextColor();
            this.CmdInfo.drawText(CommandHelpText[2],85, 1);
            break;
    
            case CommandName[3]:
            this.CmdInfo.contents.clear();
            this.CmdInfo.resetWindow();
            this.CmdInfo.changeTextColor(ColorManager.textColor(16));
            this.CmdInfo.drawText("Help:",20, 1);
            this.CmdInfo.resetTextColor();
            this.CmdInfo.drawText(CommandHelpText[3],85, 1);
            break;
    
            case CommandName[4]:
            this.CmdInfo.contents.clear();
            this.CmdInfo.resetWindow();
            this.CmdInfo.changeTextColor(ColorManager.textColor(16));
            this.CmdInfo.drawText("Help:",20, 1);
            this.CmdInfo.resetTextColor();
            this.CmdInfo.drawText(CommandHelpText[4],85, 1);
            break;

            case CommandName[5]:
            this.CmdInfo.contents.clear();
            this.CmdInfo.resetWindow();
            this.CmdInfo.changeTextColor(ColorManager.textColor(16));
            this.CmdInfo.drawText("Help:",20, 1);
            this.CmdInfo.resetTextColor();
            this.CmdInfo.drawText(CommandHelpText[5],85, 1);
            break;

            case CommandName[6]:
            this.CmdInfo.contents.clear();
            this.CmdInfo.resetWindow();
            this.CmdInfo.changeTextColor(ColorManager.textColor(16));
            this.CmdInfo.drawText("Help:",20, 1);
            this.CmdInfo.resetTextColor();
            this.CmdInfo.drawText(CommandHelpText[6],85, 1);
            break;
        }	
    };
}());