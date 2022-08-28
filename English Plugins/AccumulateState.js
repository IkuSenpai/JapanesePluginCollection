//=============================================================================
// AccumulateState.js
// ----------------------------------------------------------------------------
// (C)2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version.
// 2.4.1 2022/05/25 Fixed a problem in 2.4.0 that could cause unwanted gauges to appear.
// 2.4.0 2022/03/18 Fixed to be able to display accumulation gauges on map and status screens.
// 2.3.0 2021/07/23 Added the ability to display the accumulation gauge against enemy characters
// 2.2.1 2021/07/16 Added the ability to increase resistance each time an accumulate state is activated
// 2.2.0 2021/07/15 Fixed all the bugs to work in MZ
// 2.1.0 2021/07/15 Added the ability to switch with and without the accumulation gauge display
// 2.0.0 2017/05/29 Changed specs so that you can specify your own accumulation rate calculation formula. Added the ability to set whether or not the luck and must-hit corrections are available.
// 1.1.1 2017/05/28 Fixed an issue where the accumulation rate was being subtracted when the result of the subtraction was negative
// 1.1.0 2017/05/28 Added two resistance calculation formulas: divide and subtract.
// 1.0.1 2016/05/31 Fixed an issue where entering combat outside of a combat test could cause an error.
// 1.0.0 2016/05/28 First version.
// ----------------------------------------------------------------------------
// [Blog]: https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc accumulate state plugin.
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AccumulateState.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author Triacontan
 *
 * @param GaugeImage
 * @text Gauge image file
 * @desc Image file (img/pictures) used to display the gauge. Please make one image with the empty gauge and the full gauge vertically side by side.
 * @default
 * @dir img/pictures/
 * @type file
 *
 * @param GaugeSwitchId
 * @text Gauge display switch
 * @desc If enabled, the gauge will be displayed only when the specified switch is ON.
 * @default 0
 * @type switch
 *
 * @param AccumulateFormula
 * @text AccumulateFormula
 * @desc Create your own formula to calculate the accumulation rate from the effect's "state add" and the target's "state validity".
 * @default
 * @param
 * @param LuckAdjust
 * @text LuckAdjust
 * @desc If ON, Luck Adjustment is applied to the accumulation rate. (Conforms to default spec.) * @default true * * @param LuckAdjust * @text
 * @default true
 * @type boolean
 * @param CertainHit
 * @param CertainHit
 * @text Ignore effectiveness of must-hit.
 * @desc If ON, the value of "State Add" will be applied to the accumulation rate for must-hit skills.
 * @default true
 * @type boolean
 * @param
 * @param ImmunityRate
 * @text ImmunityRate
 * @desc The immunity value that is added each time a state is activated; once it reaches 100, it will not be raised at all.
 * @default 0
 * @type number
 *
 * @command ACCUMULATE
 * @text Accumulate
 * @desc Increase or decrease the amount of state accumulation for the specified actor.
 *
 * @arg actorId
 * @text Actor ID.
 * @desc The target actor ID. If you want to target an enemy character, you can leave it as 0.
 * @default 0
 * @type actor
 * * @arg
 * @arg enemyIndex
 * @text Enemy character index.
 * @desc Target enemy character index. If you want to target an actor, you can leave it at -1.
 * @default -1
 * @type number
 * @min -1
 *
 * @arg stateId
 * @text State ID
 * @desc State ID of the target. Specify the stored type state.
 * @default 1
 * @type state
 *
 * @arg rate
 * @text accumulation rate
 * @desc accumulation rate (-100% to 100%).
 * @default 0
 * @type number
 * @min -100
 * @max 100
 *
 * @help Change a specific state to accumulate type.
 * If you want to make a state accumulative, set the following in the memo field.
 * <Accumulate>
 * <Accumulate>
 *
 * Accumulate type state accumulates values by the use effect "Accumulate State".
 * Accumulate type state will be activated when the accumulation rate exceeds 100% (=1.0).
 * The calculation formula is as follows.
 * The following formula is used to calculate the value.
 * The value of the "Add State" effect * The target's "State Validity" = Accumulation Rate.
 * Example: If the effect "State Add" is 80% (0.8) and the target's State Validity is 50% (0.5)
 * 0.8 * 0.5 = 0.4 # Accumulation rate is 40% (0.4)
 *
 * You can also specify a separate accumulation rate calculation formula as a function for advanced users.
 * The following variables can be used in the calculation formula.
 * a : a : "state-added" of the effect
 * a : the effect's "state-added" setting
 * b : the set value of the target's "state validity" * * b : the set value of the target's "state validity
 *
 * Example of specifying an accumulation rate calculation formula
 * a - (1.0 - b)
 *
 * Example: If the effect's State Add is 80% (0.8) and the target's State Enable is 50% (0.5)
 * 0.8 - (1.0 - 0.5) = 0.3 # Accumulation rate is 30% (0.3).
 *
 * If the accumulation rate is negative, it is calculated as "0". If a buzzer sounds at runtime, you should check
 * There is a problem in the script description.
 * * Press F8 to open the developer tool and check the contents.
 *
 * Also, "Unstate" resets the accumulation rate.
 *
 * You can specify a single state to be displayed as a gauge on the combat screen.
 * To use this feature, set the following in the actor's notes field.
 * <Storage Gauge State:3> // Displays the accumulation type state ID "3" as a gauge.
 * <Storage Gauge X:600> // X coordinate of the gauge.
 * <storage gauge Y:400> // Y coordinate of the gauge.
 *
 * If you want to display the gauge on the map screen or the status screen, specify the coordinate.
 * <stored map gauge X:600> // X coordinate of the gauge on the map screen.
 * <stored map gauge Y:400> // Y coordinate of the gauge on the map screen.
 * <Stored Status Gauge X:600> // X coordinate of the gauge on the status screen.
 * <Stored Status Gauge Y:400> // Y coordinate of the gauge of the status screen.
 *
 * The gauge image is specified by the parameter.
 *
 * Terms of use: *
 * * You can modify and redistribute it without permission of the author, and there is no restriction on the form of use (commercial, 18 prohibited use, etc.).
 * * There are no restrictions on the type of use (commercial, 18 prohibited use, etc.).
 * This plugin is now yours.
 */

(()=>{
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    PluginManagerEx.registerCommand(script, 'ACCUMULATE', args => {
        const actor = $gameActors.actor(args.actorId);
        if (actor) {
            actor.accumulateState(args.stateId, args.rate / 100);
        }
        const enemy = $gameTroop.members()[args.enemyIndex];
        if (enemy) {
            enemy.accumulateState(args.stateId, args.rate / 100);
        }
    });

    //=============================================================================
    // Game_BattlerBase
    // manages the amount of state accumulation.
    //=============================================================================
    Game_BattlerBase.prototype.clearStateAccumulationsIfNeed = function () {
        if (!this._stateAccumulations) {
            this._stateAccumulations = {}
        }
        if (!this._stateImmunity) {
            this._stateImmunity = {}
        }
    };

    const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
    Game_BattlerBase.prototype.clearStates = function () {
        _Game_BattlerBase_clearStates.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
    };

    const _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
    Game_BattlerBase.prototype.eraseState = function (stateId) {
        _Game_BattlerBase_eraseState.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
        delete this._stateAccumulations[stateId];
    };

    const _Game_Battler_removeState = Game_Battler.prototype.removeState;
    Game_Battler.prototype.removeState = function (stateId) {
        _Game_Battler_removeState.apply(this, arguments);
        this.clearStateAccumulationsIfNeed();
        delete this._stateAccumulations[stateId];
    };

    const _Game_BattlerBase_attackStates = Game_BattlerBase.prototype.attackStates;
    Game_BattlerBase.prototype.attackStates = function (accumulateFlg) {
        if (arguments.length === 0) accumulateFlg = false;
        const states = _Game_BattlerBase_attackStates.apply(this, arguments);
        return states.filter(function (stateId) {
            return BattleManager.isStateAccumulate(stateId) === accumulateFlg;
        }.bind(this));
    };

    Game_Battler.prototype.accumulateState = function (stateId, value) {
        this.clearStateAccumulationsIfNeed();
        if (BattleManager.isStateAccumulate(stateId)) {
            this._stateAccumulations[stateId] = (this._stateAccumulations[stateId] || 0) + value;
            if (!this.isStateAffected(stateId) && this._stateAccumulations[stateId] >= 1.0) {
                this.addState(stateId);
                this._stateImmunity[stateId] = (this._stateImmunity[stateId] || 0) + 1;
                return true;
            }
        }
        } return false;
    }

    Game_BattlerBase.prototype.getStateImmunity = function (stateId) {
        return (this._stateImmunity[stateId] * param.ImmunityRate / 100) || 0;
    };

    Game_BattlerBase.prototype.getStateAccumulation = function (stateId) {
        return this._stateAccumulations[stateId] || 0;
    };

    Game_BattlerBase.prototype.getGaugeStateAccumulation = function () {
        return this.getStateAccumulation(this.getGaugeStateId());
    };

    Game_BattlerBase.prototype.getGaugeX = function () {
        return this.getGaugeInfo(SceneManager.findAccumulateGaugeTagX());
    };

    Game_BattlerBase.prototype.getGaugeY = function () {
        return this.getGaugeInfo(SceneManager.findAccumulateGaugeTagY());
    };

    Game_BattlerBase.prototype.getGaugeStateId = function () {
        return this.getGaugeInfo(['AccumulateGaugeState', 'AccumulateGaugeState']);
    };

    Game_BattlerBase.prototype.getGaugeInfo = function (names) {
        return PluginManagerEx.findMetaValue(this.getData(), names);
    };

    Game_BattlerBase.prototype.getData = function () {
        return null;
    };

    Game_Actor.prototype.getData = function () {
        return this.actor();
    }

    Game_Enemy.prototype.getData = function () {
        return this.enemy();
    };

    SceneManager.findAccumulateGaugeTagX = function() {
        if (this._scene instanceof Scene_Map) {
            return ['Accumulate Map Gauge X', 'AccumulateMapGaugeX'];
        }
        if (this._scene instanceof Scene_Status) {
            return ['AccumulateStatusGaugeX', 'AccumulateStatusGaugeX']; }
        }
        return ['AccumulateGaugeX', 'AccumulateGaugeX']; }
    }

    SceneManager.findAccumulateGaugeTagY = function() {
        if (this._scene instanceof Scene_Map) {
            return ['AccumulateMapGaugeY', 'AccumulateMapGaugeY'];
        }
        if (this._scene instanceof Scene_Status) {
            return ['AccumulateStatusGaugeY', 'AccumulateStatusGaugeY']; }
        }
        return ['AccumulateGaugeY', 'AccumulateGaugeY']; }
    }

    //=============================================================================
    // Game_Action
    // Increase state accumulation by action.
    //=============================================================================
    const _Game_Action_itemEffectAddAttackState = Game_Action.prototype.itemEffectAddAttackState;
    Game_Action.prototype.itemEffectAddAttackState = function (target, effect) {
        _Game_Action_itemEffectAddAttackState.apply(this, arguments);
        this.subject().attackStates(true).forEach(stateId => {
            let accumulation = effect.value1 * this.subject().attackStatesRate(stateId);
            accumulation = this.applyResistanceForAccumulateState(accumulation, target, stateId);
            const result = target.accumulateState(stateId, accumulation);
            if (result) this.makeSuccess(target);
        });
    };

    const _Game_Action_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
    Game_Action.prototype.itemEffectAddNormalState = function (target, effect) {
        if (BattleManager.isStateAccumulate(effect.dataId)) {
            let accumulation = effect.value1;
            if (!this.isCertainHit() || !param.CertainHit) {
                accumulation = this.applyResistanceForAccumulateState(accumulation, target, effect.dataId);
            }
            const result = target.accumulateState(effect.dataId, accumulation);
            if (result) this.makeSuccess(target);
        } else {
            _Game_Action_itemEffectAddNormalState.apply(this, arguments);
        }
    };

    Game_Action.prototype.applyResistanceForAccumulateState = function (effectValue, target, stateId) {
        if (param.AccumulateFormula) {
            const a = effectValue;
            const b = target.stateRate(stateId);
            try {
                effectValue = eval(param.AccumulateFormula);
            } catch (e) {
                SoundManager.playBuzzer();
                console.warn('Script Error : ' + param.AccumulateFormula);
                console.warn(e.stack); console.warn('Script Error : ' + param;
            }
        } else {
            effectValue *= target.stateRate(stateId);
        }
        if (param.LuckAdjust) {
            effectValue *= this.lukEffectRate(target);
        }
        effectValue *= (1.0 - target.getStateImmunity(stateId));
        return effectValue.clamp(0.0, 1.0);
    }

    //=============================================================================
    // BattleManager.
    // Determines if it is a storable state.
    //=============================================================================
    BattleManager.isStateAccumulate = function (stateId) {
        return stateId > 0 && ! !PluginManagerEx.findMetaValue($dataStates[stateId], ['Accumulate', 'Accumulate']);
    };

    //=============================================================================
    // Scene_Base
    // Create a state gauge.
    //=============================================================================
    Scene_Battle.prototype.createAccumulateState = function (detailMenu) {
        Scene_Base.prototype.createAccumulateState.call(this, detailMenu);
        for (let i = 0, n = $gameTroop.members().length; i < n; i++) {
            const sprite = new Sprite_AccumulateState(i, $gameTroop, false);
            this.addChild(sprite);
        }
    }

    Scene_Base.prototype.createAccumulateState = function (detailMenu) {
        for (let i = 0, n = $gameParty.members().length; i < n; i++) {
            const sprite = new Sprite_AccumulateState(i, $gameParty, detailMenu);
            this.addChild(sprite);
        }
    }

    const _Scene_Battle_createSpriteset = Scene_Battle.prototype.createSpriteset;
    Scene_Battle.prototype.createSpriteset = function () {
        _Scene_Battle_createSpriteset.apply(this, arguments);
        this.createAccumulateState(false);
    };

    const _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function () {
        _Scene_Map_createSpriteset.apply(this, arguments);
        this.createAccumulateState(false);
    };

    const _Scene_Status_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _Scene_Status_create.apply(this, arguments);
        this.createAccumulateState(true);
    };

    //=============================================================================
    // Sprite_AccumulateState
    // Sprite for displaying state accumulation.
    //=============================================================================
    function Sprite_AccumulateState() {
        this.initialize.apply(this, arguments);
    }

    Sprite_AccumulateState.prototype = Object.create(Sprite.prototype);
    Sprite_AccumulateState.prototype.constructor = Sprite_AccumulateState;

    Sprite_AccumulateState.prototype.initialize = function (index, unit, detailMenu) {
        this._index = index;
        this._battler = null;
        this._unit = unit;
        this._rate = null;
        this._detailMenu = detailMenu;
        Sprite.prototype.initialize.call(this);
        this.create();
    };

    Sprite_AccumulateState.prototype.getBattler = function () {
        return this._unit.members()[this._index];
    }

    Sprite_AccumulateState.prototype.create = function () {
        this.bitmap = ImageManager.loadPicture(param.GaugeImage);
        this.createGaugeSprite();
        this.bitmap.addLoadListener(this.onLoadBitmap.bind(this));
        this.visible = false;
    };

    Sprite_AccumulateState.prototype.createGaugeSprite = function () {
        this._gaugeSprite = new Sprite();
        this._gaugeSprite.bitmap = this.bitmap;
        this.addChild(this._gaugeSprite);
    };

    Sprite_AccumulateState.prototype.onLoadBitmap = function () {
        const height = this.bitmap.height / 2;
        this.setFrame(0, height, this.bitmap.width, height);
        this._gaugeSprite.setFrame(0, 0, this.bitmap.width, height);
    };

    Sprite_AccumulateState.prototype.update = function () {
        const battler = this.getBattler();
        if (!battler) return;
        if (this._battler ! == battler) {
            this._battler = battler;
        }
        this.updateVisibility();
        if (this.visible) {
            this.updatePosition(); if (this.updatePosition())
            this.updateRate();
        }
    };

    Sprite_AccumulateState.prototype.updateVisibility = function () {
        this.visible = true;
        const stateId = this._battler.getGaugeStateId();
        if (!stateId) {
            this.visible = false;
        }
        if (param.GaugeSwitchId && ! $gameSwitches.value(param.GaugeSwitchId)) {
            this.visible = false;
        }
        if (this._detailMenu && $gameParty.menuActor() ! == this._battler) {
            this.visible = false;
        }
    };

    Sprite_AccumulateState.prototype.updateRate = function () {
        const rate = Math.min(this._battler.getGaugeStateAccumulation(), 1.0);
        if (rate ! == this._rate) {
            this._rate = rate;
            this.bitmap.addLoadListener(function () {
                this._gaugeSprite.setFrame(0, 0, this.bitmap.width * rate, this.bitmap.height / 2);
            }.bind(this))
        }
    };

    Sprite_AccumulateState.prototype.updatePosition = function () {
        this.x = this._battler.getGaugeX();
        this.y = this._battler.getGaugeY();
    };
})();

