//
// ステートターン操作効果 ver1.01
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['ControlStateTurnEffect'] = 1.01;
/*:
 * @target MZ MV
 * @plugindesc ver1.01/ステートや強化弱体の効果ターンを操作する効果を設定できるようにします。
 * @author Yana
 *
 * @param StateTurnMax
 * @text ステートターン最大値
 * @desc ステートの加算されるターン数の最大値です。
 * このプラグインで追加されたターンはこの数値以上にはなりません。
 * @default 10
 *
 * @param BuffTurnMax
 * @text 強化ターン最大値
 * @desc 強化の加算されるターン数の最大値です。
 * このプラグインで追加されたターンはこの数値以上にはなりません。
 * @default 10
 *
 * @param DebuffTurnMax
 * @text 弱体ターン最大値
 * @desc 弱体の加算されるターン数の最大値です。
 * このプラグインで追加されたターンはこの数値以上にはなりません。
 * @default 10
 *
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * アイテムやスキルのメモ欄に、
 * <ステートターン追加:x,yターン>
 * または、
 * <AddStateTurn:x,yTurn>
 * と記述すると、そのスキルの使用効果に、IDx番のステートの効果ターンが
 * yターン増加(減少)する効果が追加されます。yには-も指定できます。
 * xに0を指定すると、付与されているすべてステートの効果ターンが操作されます。
 *
 * アイテムやスキルのメモ欄に、
 * <強化ターン追加:x,yターン>
 * または、
 * <AddBuffTurn:x,yTurn>
 * と記述すると、そのスキルの使用効果に、IDx番の強化の効果ターンが
 * yターン増加(減少)する効果が追加されます。yには-も指定できます。
 * xに-1を指定すると、付与されているすべて強化の効果ターンが操作されます。
 *
 * アイテムやスキルのメモ欄に、
 * <弱体ターン追加:x,yターン>
 * または、
 * <AddDebuffTurn:x,yTurn>
 * と記述すると、そのスキルの使用効果に、IDx番の弱体の効果ターンが
 * yターン増加(減少)する効果が追加されます。yには-も指定できます。
 * xに-1を指定すると、付与されているすべて弱体の効果ターンが操作されます。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.01:
 * 解除タイミングが設定されていないステートが解除されることのあるバグを修正。
 * ver1.00:
 * 公開
 */
(function () {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('ControlStateTurnEffect');
    var stateTurnMax = Number(parameters['StateTurnMax']);
    var buffTurnMax = Number(parameters['BuffTurnMax']);
    var debuffTurnMax = Number(parameters['DebuffTurnMax']);

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.controlStateTurnEffect = function (item) {
        if (item._ctrlStateTurnEffect) { return item._ctrlStateTurnEffect }
        var texts = item.note.split('\n');
        item._ctrlStateTurnEffect = {};
        for (var i = 0, max = texts.length; i < max; i++) {
            if (texts[i].match(/<(?:ステートターン追加|AddStateTurn):(\d+),([+-]?\d+)(?:ターン|Turn)?>/i)) {
                item._ctrlStateTurnEffect[Number(RegExp.$1)] = Number(RegExp.$2);
            }
        }
        return item._ctrlStateTurnEffect;
    };

    DataManager.controlBuffTurnEffect = function (item) {
        if (item._ctrlBuffTurnEffect) { return item._ctrlBuffTurnEffect }
        var texts = item.note.split('\n');
        item._ctrlBuffTurnEffect = {};
        for (var i = 0, max = texts.length; i < max; i++) {
            if (texts[i].match(/<(?:強化ターン追加|AddBuffTurn):(-?\d+),([+-]?\d+)(?:ターン|Turn)?>/i)) {
                item._ctrlBuffTurnEffect[Number(RegExp.$1)] = Number(RegExp.$2);
            }
        }
        return item._ctrlBuffTurnEffect;
    };

    DataManager.controlDebuffTurnEffect = function (item) {
        if (item._ctrlDebuffTurnEffect) { return item._ctrlDebuffTurnEffect }
        var texts = item.note.split('\n');
        item._ctrlDebuffTurnEffect = {};
        for (var i = 0, max = texts.length; i < max; i++) {
            if (texts[i].match(/<(?:弱体ターン追加|AddDebuffTurn):(-?\d+),([+-]?\d+)(?:ターン|Turn)?>/i)) {
                item._ctrlDebuffTurnEffect[Number(RegExp.$1)] = Number(RegExp.$2);
            }
        }
        return item._ctrlDebuffTurnEffect;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GAction_hasItemAnyValidEffects = Game_Action.prototype.hasItemAnyValidEffects;
    Game_Action.prototype.hasItemAnyValidEffects = function (target) {
        if (__GAction_hasItemAnyValidEffects.call(this, target)) { return true }
        if (this.checkStateTurnEffectValid(target)) { return true }
        if (this.checkBuffTurnEffectValid(target)) { return true }
        if (this.checkDebuffTurnEffectValid(target)) { return true }
        return false;
    };

    Game_Action.prototype.checkStateTurnEffectValid = function (target) {
        var ctrlStateTurnEffect = DataManager.controlStateTurnEffect(this.item());
        for (var key in ctrlStateTurnEffect) {
            var id = Number(key);
            if (id === 0 && target._stateTurns !== {}) {
                return true;
            } else if (target.isStateAffected(id)) {
                return true;
            }
        }
        return false;
    };

    Game_Action.prototype.checkBuffTurnEffectValid = function (target) {
        var ctrlBuffTurnEffect = DataManager.controlBuffTurnEffect(this.item());
        for (var key in ctrlBuffTurnEffect) {
            var id = Number(key);
            if (id === -1) {
                for (var i = 0; i < 8; i++) {
                    if (target._buffs[i] > 0) { return true }
                }
            } else if (target.isBuffAffected(id)) {
                return true;
            }
        }
        return false;
    };

    Game_Action.prototype.checkDebuffTurnEffectValid = function (target) {
        var ctrlDebuffTurnEffect = DataManager.controlDebuffTurnEffect(this.item());
        for (var key in ctrlDebuffTurnEffect) {
            var id = Number(key);
            if (id === -1) {
                for (var i = 0; i < 8; i++) {
                    if (target._buffs[i] < 0) { return true }
                }
            } else if (target.isDebuffAffected(id)) {
                return true;
            }
        }
        return false;
    };

    var __GAction_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        __GAction_apply.call(this, target);
        var result = target.result();
        if (result.isHit()) {
            this.applyStateTurnEffect(target);
            this.applyBuffTurnEffect(target);
            this.applyDebuffTurnEffect(target);
        }
    };

    Game_Action.prototype.applyStateTurnEffect = function (target) {
        var ctrlStateTurnEffect = DataManager.controlStateTurnEffect(this.item());
        for (var key in ctrlStateTurnEffect) {
            var id = Number(key);
            if (id === 0) {
                for (var key2 in target._stateTurns) {
                    target._stateTurns[key2] += ctrlStateTurnEffect[key];
                    target._stateTurns[key2] = Math.min(target._stateTurns[key2], stateTurnMax);
                    this.makeSuccess(target);
                }
            } else {
                if (target.isStateAffected(id) && target._stateTurns[id]) {
                    target._stateTurns[id] += ctrlStateTurnEffect[id];
                    target._stateTurns[id] = Math.min(target._stateTurns[id], stateTurnMax);
                    this.makeSuccess(target);
                }
            }
        }
        for (var key in target._stateTurns) {
            var id = Number(key);
            var state = $dataStates[id];
            if (target._stateTurns[key] <= 0 && state.autoRemovalTiming !== 0) { target.removeState(id) }
        }
    };


    Game_Action.prototype.applyBuffTurnEffect = function (target) {
        var ctrlBuffTurnEffect = DataManager.controlBuffTurnEffect(this.item());
        for (var key in ctrlBuffTurnEffect) {
            var id = Number(key);
            if (id === -1) {
                for (var i = 0; i < 8; i++) {
                    if (target.isBuffAffected(i)) {
                        target._buffTurns[i] += ctrlBuffTurnEffect[id];
                        target._buffTurns[i] = Math.min(target._buffTurns[i], buffTurnMax);
                        this.makeSuccess(target);
                    }
                }
            } else {
                if (target.isBuffAffected(id)) {
                    target._buffTurns[id] += ctrlBuffTurnEffect[id];
                    target._buffTurns[id] = Math.min(target._buffTurns[id], buffTurnMax);
                    this.makeSuccess(target);
                }
            }
        }
        for (var i = 0; i < 8; i++) {
            if (target._buffTurns[i] <= 0) { target.removeBuff(i) }
        }
    };

    Game_Action.prototype.applyDebuffTurnEffect = function (target) {
        var ctrlDebuffTurnEffect = DataManager.controlDebuffTurnEffect(this.item());
        for (var key in ctrlDebuffTurnEffect) {
            var id = Number(key);
            if (id === -1) {
                for (var i = 0; i < 8; i++) {
                    if (target.isDebuffAffected(i)) {
                        target._buffTurns[i] += ctrlDebuffTurnEffect[id];
                        target._buffTurns[i] = Math.min(target._buffTurns[i], debuffTurnMax);
                        this.makeSuccess(target);
                    }
                }
            } else {
                if (target.isDebuffAffected(id)) {
                    target._buffTurns[id] += ctrlDebuffTurnEffect[id];
                    target._buffTurns[id] = Math.min(target._buffTurns[id], debuffTurnMax);
                    this.makeSuccess(target);
                }
            }
        }
        for (var i = 0; i < 8; i++) {
            if (target._buffTurns[i] <= 0) { target.removeBuff(i) }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());
