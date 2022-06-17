//=============================================================================
// RPG Maker MZ - ExtendedSkillTarget
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 敵のスキルを使う条件を拡張します。
 * @author 雪あすか
 * @url https://twitter.com/askyq
 * 
 * 
 * @help 敵のスキルを使う条件を拡張します。
 * 
 * 【使い方】
 * このプラグインの設定内に、スキルの設定を書き入れます。
 * 
 * 
 * 【利用規約】
 * WTFPL
 * 
 * 【更新履歴】
 * 1.0 初版公開
 * 
 * 
 * @param skillSet
 * @text スキル情報
 * @desc 条件を拡張するスキルの情報を指定します。
 * @default []
 * @type struct<skillset>[]
 * 
 */

/*~struct~skillset:
 *
 * @param skillId
 * @text スキル
 * @desc 設定対象のスキルを指定します。
 * @type skill
 * @default 0
 * 
 * @param targets
 * @text 設定対象となる敵
 * @desc 設定されている場合、この敵に対して設定を適用します。
 * @type enemy[]
 * @default []
 * 
 * @param stateId
 * @text ステート
 * @desc 設定されている場合、このステートが付与されているアクターをスキルの対象にします。
 * @type state
 * @default 0
 * 
 * @param exceptStateId
 * @text 除外するステート
 * @desc 設定されている場合、このステートが付与されているアクターはスキルの対象にしません。
 * @type state
 * @default 0
 * 
 * @param actorIds
 * @text アクター
 * @desc 設定されている場合、ここで設定したアクターのみをスキルの対象にします。
 * @type actor[]
 * @default []
 * 
 */

(() => {
  const PLUGIN_NAME = 'ExtendedSkillTarget';
  const params = PluginManager.parameters(PLUGIN_NAME);

  const toNumberArray = (arr) => {
    const targets = [];
    if (arr) {
      arr = JSON.parse(arr);
      for (const target of arr) {
        targets.push(parseInt(target));
      }
    }
    return targets;
  };

  const skillSet = [];
  const skillSetArray = JSON.parse(params.skillSet);
  for (const skillSetJson of skillSetArray) {
    const obj = JSON.parse(skillSetJson);
    obj.skillId = parseInt(obj.skillId);
    obj.stateId = parseInt(obj.stateId);
    obj.exceptStateId = parseInt(obj.exceptStateId);
    obj.actorIds = toNumberArray(obj.actorIds);
    obj.targets = toNumberArray(obj.targets);

    skillSet.push(obj);
  }


  function Game_FilteredUnit() {
    this.initialize(...arguments);
  }

  Game_FilteredUnit.prototype = Object.create(Game_Unit.prototype);
  Game_FilteredUnit.prototype.constructor = Game_FilteredUnit;

  Game_FilteredUnit.prototype.initialize = function(members) {
    Game_Unit.prototype.initialize.call(this);
    this._stateId = 0;
    this._exceptStateId = 0;
    this._allMembers = members;
  };

  Game_FilteredUnit.prototype.setStateId = function(id) {
    this._stateId = id;
  }

  Game_FilteredUnit.prototype.setExceptStateId = function(id) {
    this._exceptStateId = id;
  }

  Game_FilteredUnit.prototype.allMembers = function() {
    return this._allMembers;
  }

  Game_FilteredUnit.prototype.members = function() {
    let members = this.allMembers();
    if (this._stateId) {
      members = members.filter((m) => m.isStateAffected(this._stateId));
    }
    if (this._exceptStateId) {
      members = members.filter((m) => !m.isStateAffected(this._exceptStateId));
    }
    return members;
  };


  // 攻撃対象を選定する
  const Game_Action_makeTargets = Game_Action.prototype.makeTargets;
  Game_Action.prototype.makeTargets = function() {
    if (this.isSkill()) {
      const skillId = this.item().id;
      const enemyId = this.subject().id;
      const setArr = skillSet.filter((s) => s.skillId === skillId && (!s.targets || s.targets.length === 0 || s.targets.some((st) => st === enemyId)));
      if (setArr.length >= 1) {
        // 複数のスキルIDに重複して設定しちゃった時は、すべての条件に当てはまったものを使用する
        let members;
        if (!this._forcing && this.subject().isConfused()) {
          members = this.confusionTarget();
        } else if (this.isForEveryone()) {
          members = this.targetsForEveryone();
        } else if (this.isForOpponent()) {
          members = this.opponentsUnit().members();
        } else if (this.isForFriend()) {
          members = this.friendsUnit().members();
        }

        for (const set of setArr) {
          if (members && members.length > 0) {
            if (set.actorIds && set.actorIds.length > 0) {
              members = members.filter((m) => set.actorIds.indexOf(m.id));
            }

            const filter = new Game_FilteredUnit(members);
            if (set.stateId) {
              filter.setStateId(set.stateId);
            }
            if (set.exceptStateId) {
              filter.setExceptStateId(set.exceptStateId);
            }

            members = filter.members();
          }
        }

        const f = new Game_FilteredUnit(members);
        if (this.isForRandom()) {
          members = this.randomTargets(f);
        } else {
          members = this.targetsForAlive(f);
        }

        return this.repeatTargets(members);
      }
    }

    return Game_Action_makeTargets.call(this);
  };

  // 攻撃対象のいないスキルを除外する
  const Game_Enemy_meetsCondition = Game_Enemy.prototype.meetsCondition;
  Game_Enemy.prototype.meetsCondition = function(action) {
    const superResult = Game_Enemy_meetsCondition.call(this, action);

    if (superResult) {
      const act = new Game_Action(this);
      act.setEnemyAction(action);
      if (act.item().scope > 0) {
        console.log(act.item().name + ' : ' + act.makeTargets().length);
        return act.makeTargets().length > 0;
      } else {
        console.log(act.item().name + ' : ok');
      }
    }

    return superResult;
  };
})();
