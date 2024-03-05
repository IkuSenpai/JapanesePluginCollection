// ===================================================
// ARTM_ActorMultiVictoryMZ
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 Initial Release
// 1.1.0 Fixed issue where defeated actors also played victory motions
//       Conducted extensive refactoring
// 1.1.1 Fixed delay immediately after starting victory motion
// 1.1.2 Conducted refactoring for reduced load
// 1.1.3 Fixed issue where default motion image resume was delayed
// =================================================================
/*:en
 * @target MZ
 * @plugindesc MZ exclusive plugin to enable multiple victory motions for actors.
 * @author Artemis
 * @translator IkuSenpai
 *
 * @help ARTM_ActorMultiVictoryMZ.js
 *
 * MZ exclusive plugin to enable multiple victory motions for actors.
 *
 *-------------------------------------------------
 * Memo tag for each actor is as follows:
 *-------------------------------------------------
 * ■ Basic Settings
 * <AMV_MTYPE:Motion1, Motion2, ...>
 * Motion settings use the following format:
 *
 *  MotionName^Option1#Option2, LoopCount
 *
 *  MotionName: Existing 'walk'～'dead' or group settings 'group1'～'group5'
 *  Option1: Optional (see next section for options)
 *  Option2: Optional (see next section for options)
 *  LoopCount: Number of times to repeat a single motion
 *
 * ～Usage Example 1～
 * ・After winning twice, swinging once, and then repeating the sleep pose:
 *   <AMV_MTYPE:victory,2,swing,1,sleep,0>
 *
 * ～Usage Example 2～
 * ・After winning twice, repeat group setting 1:
 *   <AMV_MTYPE:victory,2,group1,0>
 *
 * 【Note】
 *   Refer to the included "Help_Motions.PNG" for existing motion names.
 *
 * ■ Options
 * ・Option1 uses the following format:
 *  ^Size  ※Integer between 2 and 6
 *
 * ・Option2 uses the following format:
 *  #ImageName
 *
 * ～Usage Example 3～
 * ・Switch to image "SF_Actor1_1" and loop victory indefinitely:
 *   <AMV_MTYPE:victory#SF_Actor1_1,0>
 *
 * ～Usage Example 4～
 * ・Switch to image "SF_Actor1_1" and perform a 3x3 walk~chant with 
 *   1 motion (no reverse), and then loop existing victory indefinitely:
 *   <AMV_MTYPE:walk^3#SF_Actor1_1,1>
 *
 *-------------------------------------------------
 * Plugin parameters are as follows:
 *-------------------------------------------------
 * ■ About Group Settings
 * Used to set multiple motions in one set. 
 * The setting inside <AMV_MTYPE:○○> of the memo tag can be directly written.
 * ※Group setting names cannot be set within the group settings.
 * ※Infinite loops within group settings are not allowed.
 *
 * There are no plugin commands.
 *
 * @param group1
 * @type string
 * @text Group Setting 1
 * @desc First group setting.
 * Same as memo tag settings. (See Help for details.)
 *
 * @param group2
 * @type string
 * @text Group Setting 2
 * @desc Second group setting.
 * Same as memo tag settings. (See Help for details.)
 *
 * @param group3
 * @type string
 * @text Group Setting 3
 * @desc Third group setting.
 * Same as memo tag settings. (See Help for details.)
 *
 * @param group4
 * @type string
 * @text Group Setting 4
 * @desc Fourth group setting.
 * Same as memo tag settings. (See Help for details.)
 *
 * @param group5
 * @type string
 * @text Group Setting 5
 * @desc Fifth group setting.
 * Same as memo tag settings. (See Help for details.)
 *
 */
 
(() => {

    const PLG_NAME = "ARTM_ActorMultiVictoryMZ";
    const TAG_NAME = "AMV_MTYPE";
    const PARAMS = PluginManager.parameters(PLG_NAME);
    const MOTIONS = [];
    for (key in Sprite_Actor.MOTIONS) { MOTIONS.push(key); }

    //-----------------------------------------------------------------------------
    // function
    //
    function makeParams(params) {
        const paramsO = [];
        const args = params.split(",");
        for (let i = 0; i < args.length; i++) {
            if (i % 2 !== 0) continue;
            const type = args[i];
            const loop = Number(args[i + 1] || "0");
            paramsO.push({
                "type":type,
                "loop":loop
            });
        }
        return paramsO;
    }

    function getTagParams(object) {
        const params = object.actor().meta;
        return (
            params[TAG_NAME] ? 
            makeParams(params[TAG_NAME]) :
            undefined
        );
    }

    function getMultiVictMode(actor) {
        return (
            actor._motionCInfoAMV ? 1 :
            actor._motionInfoAMV ? 0 : -1
        );
    }

    function getMotion(actor) {
        return MOTIONS[actor._resizeIdxAMV];
    }

    function getMotionObj(actor) {
        return Sprite_Actor.MOTIONS[getMotion(actor)];
    }

    function getMotionLMC(actor) {
        return actor._motionCInfoAMV[actor._motionCIndexAMV];
    }

    function getCountLM(actor) {
        return actor._loopCountAMV;
    }

    function getCountLMC(actor) {
        return actor._loopCCountAMV;
    }

    function checkMSW(actor, state, sign) {
        if (sign < 0) {
            return actor._mainswAMV <= state;
        } else if (sign >0) {
            return actor._mainswAMV >= state;
        } else {
            return actor._mainswAMV === state;
        }
    }

    function checkPatternLim(sprite) {
        return sprite._pattern < sprite._actor._patternPreAMV;
    }

    function updateMSW(actor, state) {
        actor._mainswAMV = state;
    }

    function checkSwing(actor) {
        return getMotion(actor) === "swing" ? 1 : 0;
    }

    function checkSignLM(actor, sign) {
        return Math.sign(actor._loopCountAMV) === sign;
    }

    function checkSignLMC(actor, sign) {
        return Math.sign(actor._loopCCountAMV) === sign;
    }

    function clearClsMembers(actor) {
        actor._motionInfoAMV = undefined;
        actor._motionCInfoAMV = undefined;
        actor._motionCIndexAMV = undefined;
        actor._loopCountAMV = undefined;
        actor._loopCCountAMV = undefined;
        actor._patternPreAMV = undefined;
        actor._battlerNameAMV = undefined;
        actor._battlerName = actor._battlerNameDefAMV;
        actor._battlerNameDefAMV = undefined;
        actor._sizeInfMaxAMV = undefined;
        actor._sizeInfAMV = undefined;
        actor._resizeIdxAMV = undefined;
        actor._mainswAMV = undefined;
    }

    //-----------------------------------------------------------------------------
    // Game_Actor
    //
    const _Game_Actor_performVictory = Game_Actor.prototype.performVictory;
    Game_Actor.prototype.performVictory = function() {
        _Game_Actor_performVictory.call(this);
        const paramss = getTagParams(this);
        if (!this.canMove() || !paramss) return;
        this._motionInfoAMV = paramss;
        const paramsTmp = PARAMS[paramss.type] || paramss[0];
        this.requestMotion(paramsTmp.type);
        this._loopCountAMV = 0;
        this._loopCCountAMV = 0;
        this._patternPreAMV = 4;
        this._mainswAMV = 1;
    };

    //-----------------------------------------------------------------------------
    // Game_Party
    //
    const _Game_Party_performVictory = Game_Party.prototype.performVictory;
    Game_Party.prototype.performVictory = function() {
        _Game_Party_performVictory.call(this);
        const motions = Sprite_Actor.MOTIONS;
        const scene = SceneManager._scene;
        for (key in motions) {
            if (!motions[key].loop) {
                motions[key].loop = true;
                scene._stackTypAMV.push(key);
            }
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_Actor
    //
    Sprite_Actor.prototype.changeMotionAMV = function(typeI) {
        const typeT = this.changeMotionResizeAMV(typeI);
        const typeO = this.changeMotionImageAMV(typeT);
        const motion = Sprite_Actor.MOTIONS[typeO];
        if (motion) {
            this._actor._resizeIdxAMV = motion.index;
        } else {
            this._actor._resizeIdxAMV = undefined;
        }
        return typeO;
    };

    Sprite_Actor.prototype.changeMotionResizeAMV = function(type) {
        const actor = this._actor;
        const sizeInf1 = type.split("^");
        if (sizeInf1.length === 2) {
            const sizeInf2 = sizeInf1[1].split("#");
            const size = Number(sizeInf2[0]);
            if (size > 1 && size <= 6) {
                actor._sizeInfMaxAMV = size;
                actor._sizeInfAMV = size;
                updateMSW(actor, 3);
            }
            if (sizeInf2.length !== 2) return sizeInf1[0];
            return sizeInf1[0] + "#" + sizeInf2[1];
        }
        return type;
    };

    Sprite_Actor.prototype.changeMotionImageAMV = function(type) {
        const actor = this._actor;
        const nameDef = actor._battlerNameDefAMV;
        const imageInf = type.split("#");
        if (imageInf.length === 2) {
            actor._battlerNameAMV = imageInf[1];
            return imageInf[0];
        }
        if (actor._battlerName !== nameDef) {
            actor._battlerName = nameDef;
        }
        return type;
    };

    Sprite_Actor.prototype.selectMotionTypeAMV = function(type, loop) {
        const actor = this._actor;
        const group = PARAMS[type];
        if (group) {
            actor._motionCInfoAMV = makeParams(group);
            actor._motionCIndexAMV = 0;
            actor._loopCCountAMV = 0;
            actor._loopCountAMV = loop > 0 ? loop : -1;
        } else {
            const sldType = this.changeMotionAMV(type);
            actor.requestMotion(sldType)
            actor._loopCountAMV = loop > 0 ? loop : -1;
        }
    };

    Sprite_Actor.prototype.selectCMotionTypeAMV = function(type, loop) {
        const actor = this._actor;
        const sldType = this.changeMotionAMV(type);
        actor.requestMotion(sldType)
        actor._loopCCountAMV = loop > 0 ? loop : -1;
    };

    Sprite_Actor.prototype.selectActorImageAMV = function() {
        const actor = this._actor;
        if (actor._battlerNameAMV) {
            actor._battlerName = actor._battlerNameAMV;
            actor._battlerNameAMV = undefined;
        }
    };

    Sprite_Actor.prototype.isResizeImageAMV = function() {
        return (
            getMultiVictMode(this._actor) !== -1 &&
            this._actor._sizeInfAMV > 0
        );
    };

    const _Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
    Sprite_Actor.prototype.updateFrame = function() {
        const actor = this._actor;
        if (checkMSW(actor, 2, 1)) {
            this.updateFrameEntrAMV();
        } else if (checkMSW(actor, 1, 0)) {
            this._pattern = 0;
            updateMSW(actor, 2) ;
        }
        _Sprite_Actor_updateFrame.call(this);
    };

    Sprite_Actor.prototype.updateFrameEntrAMV = function() {
        const actor = this._actor;
        const pattern = this._pattern;
        const mode = getMultiVictMode(actor);
        if (mode === 1) {
            this.updateFrameGroupAMV();
        } else if (mode === 0) {
            this.updateFrameNormalAMV();
        }
    };

    Sprite_Actor.prototype.updateFrameNormalAMV = function() {
        const actor = this._actor;
        const motionInfo = actor._motionInfoAMV;
        if (checkMSW(actor, 2, 0) && checkPatternLim(this)) {
             if (motionInfo[0] !== "") {
                 this.updateFrameNormalProcAMV();
             } else if (checkSignLM(actor, 1)) {
                 this.refreshWeaponAMV(getCountLM(actor));
                 actor._loopCountAMV--;
             } else if (checkSignLM(actor, -1)) {
                 this.refreshWeaponAMV(1);
             } else {
                 this.updateMotionDefAMV();
             }
        }
        actor._patternPreAMV = this._pattern;
    };

    Sprite_Actor.prototype.updateFrameNormalProcAMV = function() {
        const actor = this._actor;
        const motionInfo = actor._motionInfoAMV;
        if (checkSignLM(actor, 0)) { 
            const motion = motionInfo.shift();
            this.selectMotionTypeAMV(motion.type, motion.loop);
            this.selectActorImageAMV();
            if (motionInfo.length === 0) {
                actor._motionInfoAMV = [""];
            }
            this.refreshWeaponAMV(checkSwing(actor));
            if (!actor._motionCInfoAMV) {
                actor._loopCountAMV--;
            }
        } else {
            actor._loopCountAMV--;
            this.refreshWeaponAMV(getCountLM(actor) + 1);
        }
    };

    Sprite_Actor.prototype.updateFrameGroupAMV = function() {
        const actor = this._actor;
        if (!checkSignLM(actor, 0) && checkMSW(actor, 2, 0)) {
             const motionCInfo = actor._motionCInfoAMV;
             if (checkSignLMC(actor, 1) &&
                 !this.updateFrameGroupProc1AMV()) {
                  this.updateFrameGroupResetAMV(0);
             } else {
                 const motion = getMotionLMC(actor);
                 this.selectCMotionTypeAMV(motion.type, motion.loop);
                 this.selectActorImageAMV();
                 this.refreshWeaponAMV(checkSwing(actor));
                 this.updateFrameGroupResetAMV(-1);
             }
        }
        if (checkSignLM(actor, 0)) {
            actor._motionCInfoAMV = undefined;
            actor._patternPreAMV = 4;
        } else {
            actor._patternPreAMV = this._pattern;
        }
    };

    Sprite_Actor.prototype.updateFrameGroupProc1AMV = function() {
        const actor = this._actor;
        const motionCInfo = actor._motionCInfoAMV;
        let index = actor._motionCIndexAMV;
        if (checkPatternLim(this)) {
             this.updateFrameGroupProc2AMV();
        }
        if (checkSignLMC(actor, 1)) return false;
        if (++index >= motionCInfo.length) {
            actor._motionCIndexAMV = 0;
            if (checkSignLM(actor, 1)) actor._loopCountAMV--;
            return false;
        }
        actor._motionCIndexAMV = index;
        return true;
    };

    Sprite_Actor.prototype.updateFrameGroupProc2AMV = function() {
        const actor = this._actor;
        if (actor._sizeInfAMV < 0) {
            actor._sizeInfAMV = undefined;
            this.refreshWeaponAMV(1);
        } else if (actor._motionInfoAMV) {
            actor._loopCCountAMV--;
            this.refreshWeaponAMV(getCountLMC(actor));
        } else {
            this.updateMotionDefAMV();
        }
    };

    Sprite_Actor.prototype.updateFrameGroupResetAMV = function(base) {
        const actor = this._actor;
        if (actor._motionInfoAMV[0] === "" && getCountLM(actor) === base) {
            if (base === 0) {
                actor._motionInfoAMV = undefined;
                this.updateMotionDefAMV();
                actor._motionCInfoAMV = undefined;
            } else if (getCountLMC(actor) === base) {
                actor._motionCInfoAMV = undefined;
            }
        } else {
            if (base === -1 && getCountLMC(actor) === base) {
                actor._motionCInfoAMV = undefined;
            }
        }
    };

    Sprite_Actor.prototype.refreshWeaponAMV = function(count) {
        const actor = this._actor;
        if (getMotion(actor) === "swing" && count > 0) {
            actor.performAttack();
        }
    };

    const _Sprite_Actor_updateMotionCount = Sprite_Actor.prototype.updateMotionCount;
    Sprite_Actor.prototype.updateMotionCount = function() {
        const actor = this._actor;
        if (this.isResizeImageAMV()) {
            this.updateMotionCountEntr();
        } else {
            _Sprite_Actor_updateMotionCount.call(this);
        }
    };

    Sprite_Actor.prototype.updateMotionCountEntr = function() {
        const actor = this._actor;
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            this.updateMotionCountAMV(2);
            this._pattern = (this._pattern + 1) % 3
            this._motionCount = 0;
        }
    };

    Sprite_Actor.prototype.updateMotionCountAMV = function(base) {
        const actor = this._actor;
        if (this._pattern === base) {
            const index = actor._resizeIdxAMV;
            const next = --actor._sizeInfAMV === 0;
            if (!next) {
                actor._resizeIdxAMV = Math.min(index + 1, 17);
                this._motion = getMotionObj(actor);
            } else {
                this.updateMotionCountProcAMV();
                this._motion = getMotionObj(actor);
            }
        }
    };

    Sprite_Actor.prototype.updateMotionCountProcAMV = function() {
        const actor = this._actor;
        if (getMultiVictMode(actor) === 0) {
            this.updateMotionCountNProcAMV();
        } else {
            this.updateMotionCountGProcAMV();
        }
    };

    Sprite_Actor.prototype.updateMotionCountGProcAMV = function() {
        const actor = this._actor;
        actor._loopCCountAMV--;
        if (checkSignLMC(actor, 0) && getCountLM(actor) === 1) {
             actor._motionCInfoAMV = undefined;
             this.updateMotionDefAMV();
             updateMSW(actor, 2);
        } else {
            const motion = getMotionLMC(actor);
            actor._loopCountAMV--;
            actor._loopCCountAMV = motion.loop;
            actor._patternPreAMV = 4;
            this._pattern = -1;
            actor._resizeIdxAMV = Math.max(index - 2, 0);
            actor._sizeInfAMV = actor._sizeInfMaxAMV;
            this._motion = getMotionObj(actor);
        }
    };

    Sprite_Actor.prototype.updateMotionCountNProcAMV = function() {
        const actor = this._actor;
        const index = actor._motionCIndexAMV;
        actor._loopCountAMV--;
        if (checkSignLM(actor, -1)) {
            if (actor._motionInfoAMV.length === 0) {
                this.updateMotionDefAMV();
            }
            actor._patternPreAMV = 4;
            actor._loopCountAMV = 0;
            updateMSW(actor, 2);
        } else {
            actor._patternPreAMV = 4;
            actor._resizeIdxAMV = Math.max(index - 2, 0);
            actor._sizeInfAMV = actor._sizeInfMaxAMV;
            this._motion = getMotionObj(actor);
        }
    };

    Sprite_Actor.prototype.updateMotionDefAMV = function() {
        const actor = this._actor;
        const typeI = "victory";
        const typeO = this.changeMotionAMV(typeI);
        actor.requestMotion(typeO);
        actor._motionInfoAMV = undefined;
        actor._sizeInfAMV = undefined;
        this.updateBitmap();
        this.setupMotion();
    };

    //-----------------------------------------------------------------------------
    // Scene_Battle
    //
    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);
        const members = $gameParty.battleMembers();
        const motions = Sprite_Actor.MOTIONS;
        this._stackTypAMV = [];
        for (const member of members) {
            member._battlerNameDefAMV = member._battlerName;
            updateMSW(member, 0);
        }
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        const members = $gameParty.battleMembers();
        const motions = Sprite_Actor.MOTIONS;
        if (this._stackTypAMV) {
            this._stackTypAMV.forEach(v => motions[v].loop = false);
            this._stackTypAMV = undefined;
        }
        for (const member of members) {
            clearClsMembers(member);
        }
        _Scene_Battle_terminate.call(this);
    };

})();