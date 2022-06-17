//=============================================================================
// MPP_ConstantTPB.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Cuts the time until the TPB gauge accumulates.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 1.0.1]
 * This plugin is for RPG Maker MZ.
 * 
 * - This plugin is intended to be used in the battle system
 *   [Time Progress (Wait)].
 * - Operation with other combat systems is not guaranteed.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Tpb Gauge Show
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Status Window Move Type
 *      @desc 
 *      @type select
 *          @option default
 *          @option fixed
 *      @default default
 *
 */

/*:ja
 * @target MZ
 * @plugindesc TPBのゲージがたまるまでの時間をカットします。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 1.0.1]
 * このプラグインはRPGツクールMZ用です。
 * 
 * - 本プラグインは戦闘システム[タイムプログレス（ウェイト）]で使用することを想定しています。
 * - それ以外の戦闘システムでの動作は保証しません。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Tpb Gauge Show
 *      @text TPBゲージの表示
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Status Window Move Type
 *      @text ステータス移動タイプ
 *      @desc 
 *      @type select
 *          @option デフォルト
 *          @value default
 *          @option 固定
 *          @value fixed
 *      @default default
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_ConstantTPB';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_TpbGaugeShow = parameters['Tpb Gauge Show'] === 'true';
    const param_StatusWindowMoveType = parameters['Status Window Move Type'];
    
    //-----------------------------------------------------------------------------
    // BattleManager

    const _BattleManager_updateTpb = BattleManager.updateTpb;
    BattleManager.updateTpb = function() {
        // 行動とコマンド入力を同時に行わないようにする
        this.updateAllTpbBattlers();
        while (this.isContinueTurn()) {
            _BattleManager_updateTpb.apply(this, arguments);
        }
    };

    BattleManager.isContinueTurn  = function() {
        return (
            this._phase === 'turn' &&
            this._actionBattlers.length === 0 &&
            !this._logWindow.isBusy() &&
            !$gameParty.canInput()
        );
    };

    //-------------------------------------------------------------------------
    // Game_Battler

    const _Game_Battler_startTpbCasting = Game_Battler.prototype.startTpbCasting;
    Game_Battler.prototype.startTpbCasting = function() {
        _Game_Battler_startTpbCasting.apply(this, arguments);
        if (this.tpbRequiredCastTime() === 0) {
            this._tpbState = 'ready';
        }
    };

    //-------------------------------------------------------------------------
    // Window_BattleStatus

    const _Window_BattleStatus_placeTimeGauge = Window_BattleStatus.prototype.placeTimeGauge;
    Window_BattleStatus.prototype.placeTimeGauge = function() {
        if (param_TpbGaugeShow) {
            _Window_BattleStatus_placeTimeGauge.apply(this, arguments);
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_statusWindowX = Scene_Battle.prototype.statusWindowX;
    Scene_Battle.prototype.statusWindowX = function() {
        if (param_StatusWindowMoveType === 'fixed') {
            return this.statusWindowRect().x;
        } else {
            return _Scene_Battle_statusWindowX.apply(this, arguments);
        }
    };

})();
