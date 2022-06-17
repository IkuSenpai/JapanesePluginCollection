/*:
 * @target MZ
 * @plugindesc 全体化特徴プラグイン
 * @author さすらいのトム
 * @url https://drive.google.com/drive/u/0/folders/19ZSazImRgTMIgg_ZEDaYDxl48xoW0vRi
 *
 * @help ChgForAllTrait.js
 * 特定の装備を装備している時、又はステートにかかっている時、
 * 特定の技を全体化させるプラグインです。
 * 
 * 味方への技を全体化させる場合
 * 全体化させたい技のメモ欄
 * <ChgForAllFriends:xxx>
 * 
 * 全体化の条件となる装備やステートのメモ欄
 * <ChgForAllFriends:xxx>
 * ※スキルと装備（ステート）で、xxxの部分が一致すれば技が全体化します。
 * また、xxxの部分を切り替えることで、全体化させる技のグループを複数作成することが出来ます。
 * 
 * 敵への技を全体化させる場合
 * 全体化させたい技のメモ欄
 * <ChgForAllOpponents:xxx>
 * 
 * 全体化の条件となる装備やステートのメモ欄
 * <ChgForAllOpponents:xxx>
 * ※スキルと装備（ステート）で、xxxの部分が一致すれば技が全体化します。
 * また、xxxの部分を切り替えることで、全体化させる技のグループを複数作成することが出来ます。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 */

(function() {
    'use strict';
    	
	var _Game_Action_targetsForOpponents_Change_All_Switch = Game_Action.prototype.targetsForOpponents;
	Game_Action.prototype.targetsForOpponents = function() {
        var flag = false
        if(this._item) {
            var skillid = this._item._itemId;
            if ($dataSkills[skillid].meta['ChgForAllOpponents']) {
                var tag = $dataSkills[skillid].meta['ChgForAllOpponents'];
                flag = this.subject().ChgForAllOpponentsTag(tag);
            }
        }

		if (flag && DataManager.isSkill(this.item()) && !this.isGuard() && !this.isAttack()) {
			var targets = [];
			var unit = this.opponentsUnit();
			targets = unit.aliveMembers();
			return targets;
		} else {
			return _Game_Action_targetsForOpponents_Change_All_Switch.call(this);
		}
	};

	var _Game_Action_targetsForFriends_Change_All_Switch = Game_Action.prototype.targetsForFriends;
	Game_Action.prototype.targetsForFriends = function() {
        var flag = false
        if(this._item) {
            var skillid = this._item._itemId;
            if ($dataSkills[skillid].meta['ChgForAllFriends']) {
                var tag = $dataSkills[skillid].meta['ChgForAllFriends'];
                flag = this.subject().ChgForAllFriendsTag(tag);
            }
        }

		if (flag && DataManager.isSkill(this.item()) && !this.isGuard() && !this.isAttack()) {
			var targets = [];
			var unit = this.friendsUnit();
			if (this.isForDeadFriend()) {
				targets = unit.deadMembers();
			} else {
				targets = unit.aliveMembers();
			}
			return targets;
		} else {
			return _Game_Action_targetsForFriends_Change_All_Switch.call(this);
		}
    };
    


    Game_Battler.prototype.ChgForAllOpponentsTag = function(tag) {
        var result = false;
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta['ChgForAllOpponents'] === tag) {
                result = true;
                }
            }
        );
        return result;
    }

    Game_Battler.prototype.ChgForAllFriendsTag = function(tag) {
        var result = false;
        this.traitObjects().forEach(function(traitObject) {
            if (traitObject.meta['ChgForAllFriends'] === tag) {
                result = true;
                }
            }
        );
        return result;
    }

    var game_Action_prototype_needsSelection = Game_Action.prototype.needsSelection
    Game_Action.prototype.needsSelection = function() {
        var flag = false
        if(this._item) {
            var skillid = this._item._itemId;
            if ($dataSkills[skillid].meta['ChgForAllOpponents']) {
                var tag = $dataSkills[skillid].meta['ChgForAllOpponents'];
                flag = this.subject().ChgForAllOpponentsTag(tag);
            }
            var skillid = this._item._itemId;
            if ($dataSkills[skillid].meta['ChgForAllFriends']) {
                var tag = $dataSkills[skillid].meta['ChgForAllFriends'];
                flag = this.subject().ChgForAllFriendsTag(tag);
            }
        }
        if (flag && DataManager.isSkill(this.item()) && !this.isGuard() && !this.isAttack()) {
            return false;
        } 
        return game_Action_prototype_needsSelection.call(this);
    };

})();