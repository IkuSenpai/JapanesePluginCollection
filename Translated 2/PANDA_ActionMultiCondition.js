//=============================================================================
// PANDA_ActionMultiCondition.js
//=============================================================================
// [Update History]
// 2022-02-11 Ver.1.0.0 First Release for MV/MZ.

/*:
 * @target MV MZ
 * @plugindesc allows multiple conditions for the action pattern of enemies.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220211145411.html
 * 
 * @help This is a plug-in that allows you to specify multiple conditions
 * for the action pattern of enemies.
 * 
 * At first, create a skill for specifying multiple conditions.
 * The skill name should be "Additional Condition".
 * Then, set this skill in the "Additional Condition Skill"
 * of the plug-in parameter.
 * 
 * If you specify the Additional Condition Skill in the action pattern,
 * the condition will be added to the condition of the next action pattern.
 * Two or more additional conditions can be stacked,
 * and it will be activated only when all the conditions are met.
 * The Ratings of the additional conditions are ignored.
 * 
 * [Example]
 * Attack                Always
 * Additional Condition  HP 0% - 50%
 * Heal                  Turn 3+3*X
 * Additional Condition  Party Level >= 30
 * Additional Condition  HP 50% - 70%
 * Flame                 Turn 2+3*X
 * 
 * When the action patterns are set as above,
 * the actual action pattern and conditions are as follows:
 * 1: Attack   Always
 * 2: Heal     HP 0% - 50% and Turn 3+3X
 * 3: Flame    Party Level >= 30 and HP 50% - 70% and Turn 2+3*X
 * 
 * When used in combination with Multiple Action Plug-in(PANDA_MultiAction.js),
 * the action pattern of the additional conditions is not counted as the index.
 * In the above example, specify Attack as #1, Heal as #2, Flame as #3
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param AdditionalConditionSkillID
 * @text Additional Condition Skill
 * @desc Specify the skill to be set for the action pattern to be used as additional conditions.
 * @type skill
 * @default 
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc ??????????????????????????????????????????????????????????????????????????????
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220211145411.html
 * 
 * @help ????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * 
 * ????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * 
 * ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????
 * ???????????????2????????????????????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????
 * 
 * ??? ???
 * ???????????????????????????
 * ?????????????????????HP 0%???50%
 * ?????????????????????????????? 3+3*X
 * ????????????????????????????????????LV>=30
 * ?????????????????????HP 50%???70%
 * ?????????????????????????????? 2+3*X
 * 
 * ?????????????????????????????????????????????????????????????????????
 * ??????????????????????????????????????????????????????????????????????????????
 * 1??? ?????????????????????
 * 2??? ???????????????HP 0%???50% ?????? ????????? 3+3X
 * 3??? ??????????????????????????????LV>=30 ?????? HP 50%???70% ?????? ????????? 2+3*X
 * 
 * ??????????????????????????????????????????(PANDA_MultiAction.js)????????????????????????
 * ???????????????????????????????????????????????????????????????????????????????????????????????????
 * ??????????????????????????????1??????????????????2?????????????????????3???????????????????????????????????????
 * 
 * ??? ????????????
 * ????????????????????????MIT???????????????????????????????????????
 * ????????????????????????????????????
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param AdditionalConditionSkillID
 * @text ????????????????????????
 * @desc ????????????????????????????????????????????????????????????????????????????????????????????????
 * @type skill
 * @default 
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc ??? ???????????? ?????? ????????? ?????? ????????? ?????? ???????????? ?????????.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20220211145411.html
 * 
 * @help ??? ???????????? ?????? ????????? ?????? ????????? ?????? ???????????? ?????? ?????????????????????.
 * 
 * ??????, ?????? ?????? ????????? ????????? ????????????.
 * ???????????? "?????? ??????"????????? ??? ?????? ?????? ????????????.
 * ????????? ???????????? ?????? ????????? [?????? ????????? ??????]??? ??? ????????? ???????????????.
 * 
 * ?????? ?????? ???????????? ????????? ????????? ?????? ????????? ????????? ????????? ????????????
 * ??? ????????? ????????? ?????? ????????? ????????? ???????????????.
 * ?????? ????????? 2??? ?????? ?????? ?????? ?????????, ?????? ????????? ?????? ???????????? ???????????????.
 * ?????? ????????? ???????????? ???????????????.
 * 
 * [???]
 * ??????          ??????
 * ?????? ??????     HP 0% - 50%
 * ?????? ??????     ?????? 3+3*X
 * ?????? ??????     ?????? ?????? >= 30
 * ?????? ??????     HP 50% - 70%
 * ?????? ??????     ?????? 2+3*X
 * 
 * ?????? ????????? ?????? ?????????, ?????? ?????? ????????? ?????? ????????? ????????? ????????????.
 * 1: ??????       ??????
 * 2: ?????? ??????  HP 0% - 50% ??? ?????? 3+3X
 * 3: ?????? ??????  ?????? ?????? >= 30 ??? HP 50% - 70% ??? ?????? 2+3*X
 * 
 * ?????? ??? ?????? ?????? ?????? ????????????(PANDA_MultiAction.js)??? ?????? ???????????? ??????,
 * ?????? ????????? ?????? ????????? ?????? ?????? ????????? ??????????????? ????????????.
 * ?????? ?????????, ????????? 1???, ?????? ????????? 2???, ?????? ????????? 3????????? ??????????????????.
 * 
 * [?????? ??????]
 * ??? ??????????????? MIT ??????????????? ???????????????.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param AdditionalConditionSkillID
 * @text ?????? ????????? ??????
 * @desc ?????? ???????????? ????????? ?????? ????????? ????????? ????????? ???????????????.
 * @type skill
 * @default 
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const AdditionalConditionSkillID = Number(parameters['AdditionalConditionSkillID']) || 0;
	
	
	//--------------------------------------------------
	// DataManager.onLoad
	//  [Added Definition]
	//--------------------------------------------------
	const _DataManager_onLoad = DataManager.onLoad;
	DataManager.onLoad = function(object) {
		_DataManager_onLoad.call(this, object);
		if (this.isEnemiesObject(object)) {
			this.convertEnemiesActions(object);
		}
	};
	
	//--------------------------------------------------
	// DataManager.isEnemiesObject
	//  [New Definition]
	//--------------------------------------------------
	DataManager.isEnemiesObject = function(object) {
		if (Array.isArray(object)) {
			if (object[1]) {
				return !!(object[1].actions);
			}
		}
		return false;
	};
	
	//--------------------------------------------------
	// DataManager.convertEnemiesActions
	//  [New Definition]
	//--------------------------------------------------
	DataManager.convertEnemiesActions = function(array) {
		if (Array.isArray(array)) {
			for (const data of array) {
				if (data && 'actions' in data) {
					this.convertActions(data);
				}
			}
		}
	};
	
	//--------------------------------------------------
	// DataManager.convertActions
	//  [New Definition]
	//--------------------------------------------------
	DataManager.convertActions = function(data) {
		const actions = [];
		let conditions = [];
		for (let i in data.actions) {
			const action = data.actions[i];
			conditions.push({'conditionType': action.conditionType,
			                 'conditionParam1': action.conditionParam1,
			                 'conditionParam2': action.conditionParam2
			                });
			if (action.skillId !== AdditionalConditionSkillID) {
				action['conditions'] = conditions;
				actions.push(action);
				conditions = [];
			}
		}
		data.actions = actions;
	};
	
	
	//--------------------------------------------------
	// Game_Enemy.meetsCondition
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Enemy_meetsCondition = Game_Enemy.prototype.meetsCondition;
	Game_Enemy.prototype.meetsCondition = function(action) {
		if (action.conditions) {
			return action.conditions.every(value => _Game_Enemy_meetsCondition.call(this, value));
		} else {
			return _Game_Enemy_meetsCondition.call(this, action);
		}
	}
	
	
})();

