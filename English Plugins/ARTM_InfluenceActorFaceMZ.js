// ===================================================
// ARTM_InfluenceActorFaceMZ
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 Initial Release
// =================================================================
/*:en
 * @target MZ
 * @plugindesc MZ exclusive plugin that changes face images during battle based on actor conditions.
 * @author Artemis
 * @translator IkuSenpai
 *
 * @help ARTM_InfluenceActorFaceMZ.js
 * During battle, this plugin changes the face image of actors based on their conditions.
 * There are three available triggers:
 *       HP: When the actor's current HP falls below a specified value
 *       MP: When the actor's current MP falls below a specified value
 * State: When the actor is in a specified state condition
 *
 *-------------------------------------------------
 * Memo tags are as follows:
 *-------------------------------------------------
 * ★HP Trigger
 * <IAF_HP:(HP threshold),(Face image name),(Face image index)>
 *  ☆For example, if HP is below 50%, set the face image to "Actor4" with index 1:
 *    <IAF_HP:50,Actor4,1>
 *
 * ★MP Trigger
 * <IAF_MP:(MP threshold),(Face image name),(Face image index)>
 *  ☆For example, if MP is below 10%, set the face image to "Actor4" with index 2:
 *    <IAF_MP:10,Actor4,2>
 *
 * ★State Trigger
 * <IAF_ST:(State ID),(Face image name),(Face image index)>
 *  ☆For example, if in state with ID 4, set the face image to "Actor5" with index 7:
 *    <IAF_ST:4,Actor5,7>
 *
 *-------------------------------------------------
 * Usage Notes
 *-------------------------------------------------
 * ★Priority of triggers in case of overlap
 *   The closer the trigger is to the top line in the note field, the higher the priority.
 *   <IAF_HP:0,Monster,2>
 *   <IAF_ST:4,Monster,1>
 *   <IAF_HP:15,Monster,7>
 *   For example, if written in the above order, the priority will be as follows:
 *   ・State 4 is ON + HP 15% or less → Display Monster's 1st index
 *   ・State 4 is ON + HP 0       → Display Monster's 2nd index
 *
 * ★Notes for use with DynamicActorGraphic.js
 *   If using with DynamicActorGraphic.js, make sure to place this plugin below it in the plugin management screen.
 *   <Placement Example>
 *     :
 *   DynamicActorGraphic
 *   ARTM_InfluenceActorFaceMZ
 *     :
 *
 * There are no plugin commands.
 *
 */
 
(() => {

    const _PREF = "IAF_";
    const TYPE = ["HP", "MP", "ST"].map(v => _PREF + v);
    const TGTYPE = {
        "HP":TYPE[0],
        "MP":TYPE[1],
        "ST":TYPE[2]
    };
    let Images = {};

    function makeParams(type, value, prior, args) {
        const name = args[1];
        const index = Number(args[2] || "0");
        const id = args[3];
        return ({
            "key"  :id + type + value,
            "type" :type,
            "value":value,
            "name" :name,
            "index":index,
            "prior":prior
        }); 
    }

    function getParamsByType(type, prior, args) {
        const tmval = Number(args[0] || "0");
        let value;
        if ([TGTYPE.HP, TGTYPE.MP].includes(type)) {
            value = tmval / 100;
        } else if ([TGTYPE.ST].includes(type)) {
            value = tmval;
        } else {
            return null;
        }
        return makeParams(type, value, prior, args)
    }

    const _DataManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function(data) {
        let idx = 0;
        let targets = "(";
        TYPE.forEach(v => targets += v + "|");
        targets = targets.substr(0, targets.length - 1) + ")";
        const regexp = new RegExp(targets, "g");
        data.note = data.note.replace(regexp, (v => {
            return v + ("00" + idx++).slice(-2);
        }));
        _DataManager_extractMetadata.call(this, data);
    };

    Game_Actor.prototype.getParamsWrapIAF = function() {
        const params = this.actor().meta;
        const paramss = [];
        const id = [this.actorId() + ""];
        let prior = 0;
        for (const key in params) {
            const type = key.slice(0, key.length - 2);
            const args = params[key].split(",").concat(id);
            const ress = getParamsByType(type, prior, args);
            if (ress) paramss.push(ress);
            prior++;
        }
        return (
            paramss.length > 0 ?
            paramss : [{"value":null}]
        );
    };

    Game_Actor.prototype.getIndexOnPriorIAF = function() {
        const faceInf = this._faceInf;
        let priorO = Number.MAX_SAFE_INTEGER;
        let indexO = 0;
        let indexT = 0;
        for (const fi of faceInf) {
           const priorI = fi.prior;
           indexO = priorI < priorO ? indexT : indexO;
           priorO = Math.min(priorI, priorO);
           indexT++;
        }
        return indexO;
    };

    Game_Actor.prototype.existFaceImagesIAF = function() {
        const isInBattle = $gameParty.inBattle();
        const faceInf = this._faceInf;
        return  isInBattle ? faceInf.length > 0 : false;
    };

    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.call(this);
        this._needsFaceChanging = false;
        this._faceInf = [];
        this._faceInfSave = [];
    };

    const _Game_Actor_faceName = Game_Actor.prototype.faceName;
    Game_Actor.prototype.faceName = function() {
        if (this.existFaceImagesIAF()) {
            const index = this.getIndexOnPriorIAF();
            return this._faceInf[index].name;
        } else {
            return _Game_Actor_faceName.call(this);
        }
    };

    const _Game_Actor_faceIndex = Game_Actor.prototype.faceIndex;
    Game_Actor.prototype.faceIndex = function() {
        if (this.existFaceImagesIAF()) {
            const index = this.getIndexOnPriorIAF();
            return this._faceInf[index].index - 1;
        } else {
            return _Game_Actor_faceIndex.call(this);
        }
    };

    function checkFaceChange(actor, params, match) {
        const inf = actor._faceInf;
        const dsp = inf.some(v => v.key === params.key);
        if (match && !dsp) {
            actor._faceInf.push({
                "key"  :params.key,
                "type" :params.type,
                "name" :params.name,
                "index":params.index,
                "prior":params.prior
            });
        } else if (!match && dsp) {
            actor._faceInf = inf.filter(v => {
                return v.type !== params.type;
            });
        } else {
            return false;
        }
        return true;
    }

    Game_Actor.prototype.checkFaceChangeIAF = function() {
        const paramsWrap = this.getParamsWrapIAF();
        let match, result;
        for (const params of paramsWrap) {
            match = this.checkThresholdIAF(params);
            result = checkFaceChange(this, params, match);
            if (!this._needsFaceChanging && result) {
                this._needsFaceChanging = true;
            }
        }
    };

    Game_Actor.prototype.checkThresholdIAF = function(params) {
        let match;
        if (params.type === TGTYPE.HP) {
            match = this.hp <= (this.mhp * params.value);
        } else if (params.type === TGTYPE.MP){
            match = this.mp <= (this.mmp * params.value);
        } else if (params.type === TGTYPE.ST){
            match = this.isStateAffected(params.value);
        } else {
            match = false;
        }
        return match;
    };

    Game_Actor.prototype.onTurnEnd = function() {
        Game_Battler.prototype.onTurnEnd.call(this);
        if ($gameParty.inBattle()) {
            this.checkFaceChangeIAF();
            if (this._needsFaceChanging) {
                preparePartyRefreshCustom(this);
            }
        }
    };

    const _BattleManager_invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        const actor = target.isActor() ? target : 
                      subject.isActor() ? subject : null;
        _BattleManager_invokeAction.call(this, subject, target);
        if (actor) {
            actor.checkFaceChangeIAF();
            if (actor._needsFaceChanging) {
                preparePartyRefreshCustom(actor);
            }
        }
    };

    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);
        const members = $gameParty.battleMembers();
        for (const member of members) {
            this.initFaceParames(member);
            member.checkFaceChangeIAF();
            preparePartyRefreshCustom(member);
        }
    };

    Scene_Battle.prototype.initFaceParames = function(actor) {
        const paramsWrap = actor.getParamsWrapIAF();
        const actorId = actor.actorId();
        const actorNm = actor.faceName();
        let key = actorNm;
        Images[key] = ImageManager.loadFace(actorNm);
        for (const params of paramsWrap) {
            if (!params.value) return;
            key = params.name;
            if (!(key in Images)) {
                const name = params.name;
                Images[key] = ImageManager.loadFace(name);
            }
        }
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        const members = $gameParty.battleMembers();
        members.forEach(member => member._faceInf = []);
        Images = {};
        _Scene_Battle_terminate.call(this);
    };

    function preparePartyRefreshCustom(actor) {
        if (!actor.result().isStatusAffected()) {
            preparePartyRefreshCustomProc(actor);
        }
    }

    function preparePartyRefreshCustomProc(actor) {
        const statusWindow = SceneManager._scene._statusWindow;
        const actorWindow = SceneManager._scene._actorWindow;
        const targets = [statusWindow, actorWindow];
        const key = actor.faceName()
        const bitmap = Images[key];
        const fnc = drawFaceCustom;
        bitmap.addLoadListener(fnc.bind(this, bitmap, actor, targets));
        actor._needsFaceChanging = false;
    }

    function drawFaceCustom(bitmap, actor, targets) {
        for (const target of targets) {
            drawFaceCustomProc(bitmap, actor, target);
        }
    }

    function drawFaceCustomProc(bitmap, actor, target) {
        const faceIndex = actor.faceIndex();
        const pw = ImageManager.faceWidth;
        const ph = ImageManager.faceHeight;
        const rect = target.faceRect(actor.index());
        const width = rect.width || ImageManager.faceWidth;
        const height = rect.height || ImageManager.faceHeight;
        const sw = Math.min(width, pw);
        const sh = Math.min(height, ph);
        const dx = Math.floor(rect.x + Math.max(width - pw, 0) / 2);
        const dy = Math.floor(rect.y + Math.max(height - ph, 0) / 2);
        const sx = (faceIndex % 4) * pw + (pw - sw) / 2;
        const sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        target.contents.clearRect(rect.x, rect.y, sw, sh);
        target.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    }

    const _Sprite_Gauge_updateTargetValue = Sprite_Gauge.prototype.updateTargetValue
    Sprite_Gauge.prototype.updateTargetValue = function(value, maxValue) {
        _Sprite_Gauge_updateTargetValue.call(this, value, maxValue);
        const battler = this._battler;
        if ($gameParty.inBattle() &&
            Object.keys(Images).length > 0 &&
            battler.isActor()) {
             battler.checkFaceChangeIAF();
             if (battler._needsFaceChanging) {
                 preparePartyRefreshCustom(battler);
             }
        }
    };

    const _Sprite_StateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
    Sprite_StateIcon.prototype.updateIcon = function() {
        const battler = this._battler;
        _Sprite_StateIcon_updateIcon.call(this);
        if ($gameParty.inBattle() && 
            battler.isActor() &&
            battler._needsFaceChanging) {
             preparePartyRefreshCustomProc(battler);
        }
    };

})();