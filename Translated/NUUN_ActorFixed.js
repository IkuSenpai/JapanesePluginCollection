/*:-----------------------------------------------------------------------------------
 * NUUN_ActorFixed.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc アクター並び替え固定
 * @author NUUN
 * @version 1.2.0
 * 
 * @help
 * アクターの並び替えを固定します。
 * アクターの固定はアクターのメモ欄またはプラグインコマンドから設定します。
 * 
 * プラグインコマンドの並び替え固定のパーティメンバー移動先インデックスIDは固定したアクターがパーティメンバー内にいれば
 * 強制的に指定先のメンバー位置に移動させることができます。0を指定することで無効になります。
 * メンバーインデックスは1から始まります。一番最初のアクターのインデックスは1になります。
 * アクターIDを0に指定している場合は指定できません。
 * 
 * アクターのメモ欄
 * <FixedActor> アクターを固定します。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2022/2/23 Ver.1.2.0
 * 固定アクター設定時に指定先のメンバーインデックスに移動させる機能を追加。
 * メンバー変更画面処理変更により定義修正。
 * 2021/9/22 Ver.1.1.4
 * 固定アクターの移動が正常に行えていなかった問題を修正。
 * 2021/9/21 Ver.1.1.3
 * メンバー変更画面の固定アクター戦闘メンバーへの移動可対応による処理の追加。
 * 2021/9/18 Ver.1.1.2
 * 一部処理を変更。
 * 2021/9/8 Ver.1.1.1
 * 固定アクターを戦闘メンバー内でも入れ替えできるように修正。
 * 2021/8/25 Ver.1.1.0
 * 固定したメンバーを控えメンバーに移動させない機能を追加。
 * 2021/8/17 Ver.1.0.0
 * 初版
 * 
 * @command ActorFixed
 * @desc 並び替えを固定します。
 * @text 並び替え固定
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * @arg memberIndex
 * @type number
 * @default 0
 * @text パーティメンバー移動先インデックスID
 * @desc パーティメンバーに移動させるインデックスIDを指定します。アクターIDを指定している時のみ有効です。　0で指定なし
 * 
 * @command ActorFixedRelease
 * @desc 並び替え固定を解除します。
 * @text 並び替え固定解除
 * 
 * @arg ActorId
 * @type actor
 * @default 0
 * @text アクターID
 * @desc アクターIDを指定します。0で全アクター
 * 
 * 
 * @param ActorFixedMovable
 * @text 固定アクター戦闘メンバーへの移動可
 * @desc 固定アクターの戦闘メンバーへの移動を許可します。また移動したアクターは戦闘メンバー内であれば移動可能です。
 * @type boolean
 * @default false
 * @parent ActorFixedSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_ActorFixed = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ActorFixed');
const ActorFixedMovable = eval(parameters['ActorFixedMovable'] || 'false');
let cursorMode = null;
let pendingMode = null;
let onFixedMovable = false;

const pluginName = "NUUN_ActorFixed";

PluginManager.registerCommand(pluginName, 'ActorFixed', args => {
  const actorId = Number(args.ActorId);console.log(actorId)
  if (actorId > 0) {
    const actor = $gameActors.actor(actorId)
    actor.setFixed();
    const index = Number(args.memberIndex);
    if (index > 0) {
      const memberIndex = $gameParty.allMembers().indexOf(actor);
      if (memberIndex >= 0) {
        $gameParty._actors.splice(memberIndex, 1);
        $gameParty._actors.splice(index - 1, 0, actorId);
        $gamePlayer.refresh();
      }
    }
  } else {
    $gameParty.allMembers().forEach(actor => actor.setFixed());
  }
});

PluginManager.registerCommand(pluginName, 'ActorFixedRelease', args => {
  const actorId = Number(args.ActorId);
  if (actorId > 0) {
    $gameActors.actor(actorId).setFixedRelease();
  } else {
    $gameParty.allMembers().forEach(actor => actor.setFixedRelease());
  }
});

Game_Actor.prototype.setFixed = function() {
  this._fixed = true;
};

Game_Actor.prototype.setFixedRelease = function() {
  this._fixed = false;
};

Game_Actor.prototype.isFixed = function() {
  return this._fixed || this.actor().meta.FixedActor;
};

const _Game_Actor_isFormationChangeOk = Game_Actor.prototype.isFormationChangeOk;
Game_Actor.prototype.isFormationChangeOk = function() {
  return _Game_Actor_isFormationChangeOk.call(this) && (!this.isFixed() || onFixedMovable);
};


const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
Scene_Menu.prototype.initialize = function() {
  _Scene_Menu_initialize.call(this);
  cursorMode = 'battle'
  pendingMode = null;
};

const _Window_MenuStatus_setPendingIndex = Window_MenuStatus.prototype.setPendingIndex;
Window_MenuStatus.prototype.setPendingIndex = function(index) {
  _Window_MenuStatus_setPendingIndex.call(this, index);
  pendingMode = index >= $gameParty.maxBattleMembers() ? 'member' : 'battle';
};

const _Window_MenuStatus_update = Window_MenuStatus.prototype.update;
Window_MenuStatus.prototype.update = function() {
  _Window_MenuStatus_update.call(this);
  if (this._formationMode) {
    const index = this.index();
    cursorMode = index >= $gameParty.maxBattleMembers() ? 'member' : 'battle';
  }
};

const _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
  if (this._formationMode) {
    onFixedMovable = ActorFixedMovable;
    const result = _Window_MenuStatus_isCurrentItemEnabled.call(this);
    onFixedMovable = false;
    return result && this.isCurrentActorFixedEnabled(cursorMode, pendingMode);
  } else {
    return _Window_MenuStatus_isCurrentItemEnabled.call(this);
  }
};

Window_StatusBase.prototype.isCurrentActorFixedEnabled = function(cursor, pending) {
  if (ActorFixedMovable) {
    const actor = this.getFormationActor(cursor);
    const pendingActor = this.getPendingActor(pending);
    if (pendingActor) {
      if (!pending && !actor) {
        return true;
      } else if (cursor === 'battle' && cursor === pending) {
        return true;
      } else if (cursor === 'battle' && cursor !== pending) {
        return !actor.isFixed();
      } else {
        return pendingActor ? !pendingActor.isFixed() : true;
      }
    } else {
      return true;
    }
  } else {
    return true;
  }
};

const _Window_FormationBattleMember_isCurrentItemEnabled = Window_FormationBattleMember.prototype.isCurrentItemEnabled;
Window_FormationBattleMember.prototype.isCurrentItemEnabled = function() {
  if (this._formationMode) {
    onFixedMovable = ActorFixedMovable;
    const result = _Window_FormationBattleMember_isCurrentItemEnabled.call(this);
    onFixedMovable = false;
    return result && this.isCurrentActorFixedEnabled(this.getCursorMode(), this.getPendingMode());
  } else {
    return _Window_FormationBattleMember_isCurrentItemEnabled.call(this);
  }
};

const _Window_FormationMember_isCurrentItemEnabled =Window_FormationMember.prototype.isCurrentItemEnabled;
Window_FormationMember.prototype.isCurrentItemEnabled = function() {
  if (this._formationMode) {
    onFixedMovable = ActorFixedMovable;
    const result = _Window_FormationMember_isCurrentItemEnabled.call(this);
    onFixedMovable = false;
    return result && this.isCurrentActorFixedEnabled(this.getCursorMode(), this.getPendingMode());
  } else {
    return _Window_FormationMember_isCurrentItemEnabled.call(this);
  }
};

Window_MenuStatus.prototype.getFormationActor = function() {
  return this.actor(this.index());
};

Window_FormationBattleMember.prototype.getFormationActor = function(cursor) {
  const index = (cursor === 'member' ? $gameParty.maxBattleMembers() : 0) + this.index();
  return $gameParty.allMembers()[index];
};

Window_FormationMember.prototype.getFormationActor = function(cursor) {
  const index = (cursor === 'member' ? $gameParty.maxBattleMembers() : 0) + this.index();
  return $gameParty.allMembers()[index];
};

Window_MenuStatus.prototype.getPendingActor = function() {
  return this.actor(this._pendingIndex);
};

Window_FormationBattleMember.prototype.getPendingActor = function(pending) {
  const index = (pending === 'member' ? $gameParty.maxBattleMembers() : 0) + this.formationPendingIndex();
  return $gameParty.allMembers()[index];
};

Window_FormationMember.prototype.getPendingActor = function(pending) {
  const index = (pending === 'member' ? $gameParty.maxBattleMembers() : 0) + this.formationPendingIndex();
  return $gameParty.allMembers()[index];
};

})();