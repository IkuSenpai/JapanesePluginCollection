/*
 * --------------------------------------------------
 * ROR_StrictDeath.js
 *   ver.1.0.2
 * Copyright (c) 2021 R.Orio
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc 戦闘不能になったらパーティーから強制離脱します
 * @author R.Orio
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @version 1.0.2
 *
 *
 *
 * @param mainActorId
 * @text 必須アクター
 * @desc 設定したアクターが戦闘不能になると即ゲームオーバーになります。機能を使用しない場合は「なし」を選択してください。
 * @default 0
 * @type actor
 *
 *
 *
 * @help
 * 戦闘不能になったらパーティーから強制離脱します。
 * 戦闘不能を回復するまでに離脱してしまうので難易度が上がります。
 *
 * また、必須アクターを設定することで、そのアクターが
 * 戦闘不能になったら即ゲームオーバーになります。
 *
 * 尚、動作にはDLCのPluginCommonBase.jsを有効化し、
 * PluginCommonBase.jsよりも下に配置する必要がありますのでご注意ください。
 *
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 */

(function () {
	'use strict';

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

	const script = document.currentScript;
	const param = PluginManagerEx.createParameter(script);

	const _BattleManager_endAction = BattleManager.endAction;
	BattleManager.endAction = function(){
		_BattleManager_endAction.apply(this, arguments);
		const deadMembers = $gameParty.deadMembers();
		for(const deadMember of deadMembers){
			const main_actor_id = parseInt(param.mainActorId);
			if(main_actor_id > 0){
				if(deadMember.actorId() == main_actor_id){
					SceneManager.goto(Scene_Gameover);
				}
			}
			$gameParty.removeActor(deadMember.actorId());
		}
	}

})();