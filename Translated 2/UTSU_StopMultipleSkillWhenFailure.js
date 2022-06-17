//=============================================================================
// UTSU_StopMultipleSkillWhenFailure.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Utsuda Shinou
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2020/08/27 Fix conflicts with other plugins
// 1.0.0 2020/02/17 Release
// ----------------------------------------------------------------------------
// [GitHub] : https://github.com/utsudashinou
// [Twitter]: https://twitter.com/virtualUtsuda
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc 連続するスキルの発動が失敗した時、発動を中止します。
 * @author Utsuda Shinou
 *
 * @help 以下のノートタグを対象のスキルのメモに追加してください。
 *
 * * ノートタグ
 * <StopMultipleSkillWhenFailure>
 *   そのスキルの連続回数以下で失敗した際、
 *   スキルの発動を中止します。
 *
 * <DamageRateAfter2nd: num>
 *   2回目以降のダメージ割合(num)を指定します。numの単位は%です。
 *   例: <DamageRateAfter2nd: 80> // ダメージ割合80%
 *
 */

(() => {
  "use strict";

  var _Game_Action_initialize = Game_Action.prototype.initialize;
  Game_Action.prototype.initialize = function (subject, forcing) {
    _Game_Action_initialize.call(this, subject, forcing);
    this.__success = true;
    this.__count = 0;
  };

  var _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    var result = target.result();
    this.subject().clearResult();
    result.clear();
    result.used = this.testApply(target);
    result.missed = result.used && Math.random() >= this.itemHit(target);
    result.evaded = !result.missed && Math.random() < this.itemEva(target);
    result.physical = this.isPhysical();
    result.drain = this.isDrain();
    if (result.isHit()) {
      var damageRate = 100;
      if (this.isSkill()) {
        var skill = this.item();
        if (skill.meta["DamageRateAfter2nd"]) {
          damageRate = Number(skill.meta["DamageRateAfter2nd"].trim());
          this.__count++;
        }
      }
      if (this.item().damage.type > 0) {
        result.critical = Math.random() < this.itemCri(target);
        var value = this.makeDamageValue(target, result.critical);
        if (this.__count > 1) {
          value = Math.floor((value * damageRate) / 100.0);
        }
        this.executeDamage(target, value);
      }
      this.item().effects.forEach(function (effect) {
        this.applyItemEffect(target, effect);
      }, this);
      this.applyItemUserEffect(target);
    }
    if (this.isSkill()) {
      var skill = this.item();
      if (skill.meta["StopMultipleSkillWhenFailure"]) {
        this.__success = target.result().success;
      }
    }
  };

  BattleManager.updateAction = function () {
    var target = this._targets.shift();
    var action = this._action;
    if (target && action.__success) {
      this.invokeAction(this._subject, target);
    } else {
      this.endAction();
    }
  };
})();
