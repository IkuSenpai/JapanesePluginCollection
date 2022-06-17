// ===================================================
// ARTM_InfluenceEnemyImageMZ
// Copyright (c) 2021 Artemis
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php
// ===================================================
// [Version]
// 1.0.0 初版
// =================================================================
/*:ja
 * @target MZ
 * @plugindesc バトル中の敵画像をステート状態により変更するMZ専用プラグイン
 * @author Artemis
 *
 * @help ARTM_InfluenceEnemyImageMZ
 *
 * バトル中の敵画像をステート状態により変更するMZ専用プラグインです。
 *
 *-------------------------------------------------
 * 敵キャラのメモ欄タグは以下の通りです。
 *-------------------------------------------------
 * <IEI_STID:(ステートID),(敵画像名)>
 *
 * ～使用例～
 *  ステートID0004で"Harpy"画像を指定、
 *  ステートID0006で"Medusa"画像を指定、
 *    <IEI_STID:4,Harpy>
 *    <IEI_STID:6,Medusa>
 *
 * ステートが複数重なった場合、記述順に優先されます。
 * 上記の例でステート4,6の状態になった場合はID0004の画像が優先して表示され、
 * ステート4が解除されるとステート6の画像に変わります。
 * （すべて解除されると元の画像に戻ります。）
 *
 * プラグインコマンドはありません。
 *
 */
 
(() => {

    const PREF = "IEI_STID";

    function makeParams(prior, args) {
        const value = Number(args[0] || "0");
        const name = args[1];
        const id = args[2];
        return ({
            "key"  :id + value,
            "value":value,
            "name" :name,
            "prior":prior
        }); 
    }

    const _DataManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function(data) {
        let idx = 0;
        let targets = "(" + PREF + ")";
        const regexp = new RegExp(targets, "g");
        data.note = data.note.replace(regexp, (v => {
            return v + ("00" + idx++).slice(-2);
        }));
        _DataManager_extractMetadata.call(this, data);
    };

    Game_Enemy.prototype.getParamsWrapIEI = function() {
        const params = this.enemy().meta;
        const paramss = [];
        const id = [this.enemyId() + ""];
        let prior = 0;
        for (const key in params) {
            const args = params[key].split(",").concat(id);
            const ress = makeParams(prior, args);
            if (ress) paramss.push(ress);
            prior++;
        }
        return (
            paramss.length > 0 ?
            paramss : [{"value":null}]
        );
    };

    Game_Enemy.prototype.getIndexOnPriorIEI = function() {
        const nameInfIEI = this._nameInfIEI;
        let priorO = Number.MAX_SAFE_INTEGER;
        let indexO = 0;
        let indexT = 0;
        for (const fi of nameInfIEI) {
           const priorI = fi.prior;
           indexO = priorI < priorO ? indexT : indexO;
           priorO = Math.min(priorI, priorO);
           indexT++;
        }
        return indexO;
    };

    Game_Enemy.prototype.existKeysIEI = function() {
        const isInBattle = $gameParty.inBattle();
        const nameInfIEI = this._nameInfIEI;
        return  isInBattle ? nameInfIEI.length > 0 : false;
    };

    const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _Game_Enemy_initMembers.call(this);
        this._needsFaceChanging = false;
        this._nameInfIEI = [];
    };

    const _Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
    Game_Enemy.prototype.battlerName = function() {
        if (this.existKeysIEI()) {
            const index = this.getIndexOnPriorIEI();
            return this._nameInfIEI[index].name;
        } else {
            return _Game_Enemy_battlerName.call(this);
        }
    };

    Game_Enemy.prototype.checkThresholdProcIEI = function(params, match) {
        const inf = this._nameInfIEI;
        const dsp = inf.some(v => v.key === params.key);
        if (match && !dsp) {
            this._nameInfIEI.push({
                "key"  :params.key,
                "name" :params.name,
                "prior":params.prior
            });
        } else if (!match && dsp) {
            this._nameInfIEI = inf.filter(v => {
                return v.key !== params.key;
            });
        } else {
            return false;
        }
        return true;
    };

    Game_Enemy.prototype.checkFaceChangeIEI = function() {
        const paramsWrap = this.getParamsWrapIEI();
        let match, result;
        for (const params of paramsWrap) {
            match = this.checkThresholdIEI(params);
            result = this.checkThresholdProcIEI(params, match);
            if (!this._needsFaceChanging && result) {
                this._needsFaceChanging = true;
            }
        }
    };

    Game_Enemy.prototype.checkThresholdIEI = function(params) {
        return this.isStateAffected(params.value);
    };

    Game_Enemy.prototype.changeEnemyImageIEI = function() {
        this._battlerName = this.battlerName();
    };

    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        const members = $gameTroop.members();
        members.forEach(member => member._nameInfIEI = []);
        _Scene_Battle_terminate.call(this);
    };

    const _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function(name) {
        const enemy = this._enemy;
        if (!enemy.existKeysIEI() ||
            enemy._needsFaceChanging) {
             _Sprite_Enemy_loadBitmap.call(this, name);
        }
    };

    const _Sprite_Enemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
    Sprite_Enemy.prototype.initVisibility = function() {
        const enemy = this._enemy;
        if (enemy._needsFaceChanging) {
            enemy._needsFaceChanging = false;
        } else {
            _Sprite_Enemy_initVisibility.call(this);
        }
    };

    const _Sprite_StateIcon_updateIcon = Sprite_StateIcon.prototype.updateIcon;
    Sprite_StateIcon.prototype.updateIcon = function() {
        const battler = this._battler;
        _Sprite_StateIcon_updateIcon.call(this);
        if ($gameParty.inBattle() &&
            battler.isEnemy() &&
            battler.isAlive()) {
             battler.checkFaceChangeIEI();
             if (battler._needsFaceChanging) {
                 battler.changeEnemyImageIEI();
             }
        }
    };

})();