// --------------------------------------------------------------------------
// 
// Reflection_Animation.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2020/08/23 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc 魔法反射時に戦闘アニメーションを表示させるプラグイン
 * @author kotonoha*
 * @url https://aokikotori.com/
 * @help 魔法を反射した時に戦闘アニメーションを表示させます。
 * バリア演出などに利用してください。
 * 
 * useSimpleMsgSideViewMZプラグインを利用している場合、
 * 魔法反射時に用語：魔法反射のメッセージを表示させることが出来ます。
 * 
 * ※競合注意
 * ・BattleManager.invokeActionの書き換えを行っているプラグイン
 * ・一発の魔法で敵味方全体反射など特殊な事を行っていると不具合が発生するかもです。
 *
 * 改変自由、商用利用可能です。
 * 作者名のクレジットや利用報告は不要です。ご自由にどうぞ！
 * 
 * @param useSimpleMsgSideViewMZ
 * @text SimpleMsgSideViewMZの使用（する：true / しない：false）
 * @desc MZ公式プラグイン「SimpleMsgSideViewMZ」の使用
 * @default false
 * @type false
 *
 * @param Enemy_ReflectionID
 * @text 敵の魔法反射エフェクトID
 * @desc 魔法反射エフェクトに使用するアニメーションIDを指定
 * @default 40
 * @type number
 *
 * @param Actor_ReflectionID
 * @text 味方の魔法反射エフェクトID
 * @desc 魔法反射エフェクトに使用するアニメーションIDを指定
 * @default 40
 * @type number
*/

(function() {

	const pluginName = 'Reflection_Animation';

    const parameters = PluginManager.parameters(pluginName);
    const useSimpleMsgSideViewMZ = eval(parameters['useSimpleMsgSideViewMZ'] || 'false');
    const Enemy_ReflectionID = Number(parameters['Enemy_ReflectionID'] || 0);
    const Actor_ReflectionID = Number(parameters['Actor_ReflectionID'] || 0);

	// SimpleMsgSideViewMZ使用時の追加メッセージ作成
	Window_BattleLog.prototype.addText_R = function(text) {
    	this._actionIconIndex = 0;
	    this._lines.push(text);
	    this.refresh();
	    this.wait();
	};

	BattleManager.invokeAction = function(subject, target) {
	    this._logWindow.push("pushBaseLine");
	    if (Math.random() < this._action.itemCnt(target)) {
	        this.invokeCounterAttack(subject, target);
	    } else if (Math.random() < this._action.itemMrf(target)) {
			const targets = [target];
	    	// SimpleMsgSideViewMZ使用時は1行バトルログ上に反射メッセージを続けて表示
			if (useSimpleMsgSideViewMZ === true) {
				this._logWindow.push("clear");
				this._logWindow.push("addText_R", TextManager.magicReflection.format(target.name()));
			}
			// 味方側：反射エフェクト
			if (target.isActor()){
		        $gameTemp.requestAnimation(targets, Actor_ReflectionID);
			// 敵側：反射エフェクト
			}else{
		        $gameTemp.requestAnimation(targets, Enemy_ReflectionID);
			}
	        this.invokeMagicReflection(subject, target);

	    } else {
	        this.invokeNormalAction(subject, target);
	    }
	    subject.setLastTarget(target);
	    this._logWindow.push("popBaseLine");

	};

})();