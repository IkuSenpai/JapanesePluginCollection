//=============================================================================
// MPP_ResistMessage.js
//=============================================================================
// Copyright (c) 2018 - 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc You can set the message to be displayed when the state that the target of the skill or item tried to add is invalidated.
 * @author Mokusei Penguin
 * @url
 *
 * @help [version 1.1.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ State note
 *  〇 <ResMsg:text>
 *      text : Message to display when disabled
 *   - The displayed message will be [Target name + text].
 *   - This message is displayed when this state is invalidated,
 *     regardless of the success or failure of the other states.
 *
 * ▼ Plugin parameters
 *  〇 State Resist Message
 *   - This message is displayed when all the states you are trying
 *     to grant are invalidated.
 *   - If <ResMsg: text> invalidates the state in which the message was set,
 *     this message will not be displayed.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param State Resist Message
 *      @desc Message displayed when all the states you tried to grant are invalidated
 *      @default It didn't work for %1!
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc スキル・アイテムの対象が付加しようとしたステートを無効化した際に表示するメッセージを設定できます。
 * @author 木星ペンギン
 * @url
 *
 * @help [version 1.1.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ ステートのメモ欄
 *  〇 <ResMsg:text>
 *      text : 無効化された際に表示するメッセージ
 *   - 表示されるメッセージは [対象者の名前 + text] となります。
 *   - このメッセージは他のステートの成否にかかわらず、
 *     このステートが無効化された場合に表示されます。
 *
 * ▼ プラグインパラメータ
 *  〇 ステート無効化メッセージ
 *   - 付与しようとしたステートが全て無効化された場合に表示されるメッセージです。
 *   - <ResMsg:text>によってメッセージが設定されたステートが無効化された場合、
 *     このメッセージは表示されません。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param State Resist Message
 *      @text ステート無効化メッセージ
 *      @desc 付与しようとした全てのステートが無効化された場合に表示されるメッセージ
 *      @default %1には効かなかった！
 * 
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_ResistMessage';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_StateResistMessage = parameters['State Resist Message'];
        
    //-------------------------------------------------------------------------
    // Game_ActionResult

    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.apply(this, arguments);
        this.mppResistStates = [];
    };

    const _Game_ActionResult_isStatusAffected = Game_ActionResult.prototype.isStatusAffected;
    Game_ActionResult.prototype.isStatusAffected = function() {
        return (
            _Game_ActionResult_isStatusAffected.apply(this, arguments) ||
            this.mppResistStates.length > 0
        );
    };

    Game_ActionResult.prototype.mppResistStateObjects = function() {
        return this.mppResistStates.map(id => $dataStates[id]);
    };

    Game_ActionResult.prototype.pushMppResistState = function(stateId) {
        if (!this.mppResistStates.includes(stateId)) {
            this.mppResistStates.push(stateId);
        }
    };

    //-------------------------------------------------------------------------
    // Game_Battler

    const _Game_Battler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        if (this.isAlive() && !this.isStateAddable(stateId)) {
            this._result.pushMppResistState(stateId);
        }
        _Game_Battler_addState.apply(this, arguments);
    };

    //-------------------------------------------------------------------------
    // Window_BattleLog

    const _Window_BattleLog_displayChangedStates = Window_BattleLog.prototype.displayChangedStates;
    Window_BattleLog.prototype.displayChangedStates = function(target) {
        _Window_BattleLog_displayChangedStates.apply(this, arguments);
        this.displayMppResistStates(target);
    };

    Window_BattleLog.prototype.displayMppResistStates = function(target) {
        const result = target.result();
        const states = result.mppResistStateObjects();
        if (states.length > 0) {
            const messages = states.map(st => st.meta.ResMsg).filter(Boolean);
            for (const msg of messages) {
                this.push('popBaseLine');
                this.push('pushBaseLine');
                this.push('addText', target.name() + msg);
                this.push('waitForEffect');
            }
            if (
                messages.length === 0 &&
                !_Game_ActionResult_isStatusAffected.call(result)
            ) {
                const text = param_StateResistMessage.format(target.name());
                this.push('popBaseLine');
                this.push('pushBaseLine');
                this.push('addText', text);
                this.push('waitForEffect');
            }
        }
    };

})();
