//=============================================================================
// PANDA_ChangeBuffRate.js
//=============================================================================
// [Update History]
// 2020-11-22 Ver.1.0.0 First Release for MV/MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc Change individually the buff / debuff rates of the parameters.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201122225821.html
 * 
 * @help Change individually the buff / debuff rates of the parameters.
 * 
 * The buff / debuff rate is 0.25 per level by default,
 * but you can change this rate for each parameter and for buff / debuff.
 * Please change the rates for each parameter and for buff / debuff,
 * in the plug-in parameters.
 * For example, if you set the buff rate to 0.5,
 * it will be 1.5 times for 1-level buff, and 2 times for 2-level buff.
 * And if you set the debuff rate to 0.2,
 * it will be 0.8 times for 1-level debuff, and 0.6 times for 2-level debuff.
 * The number of levels remains the default value 2.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param mhpBuffRate
 * @text Buff Rate of MaxHP(mhp)
 * @desc Specify the buff rate per level as a decimal for MaxHP(mhp).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mhpDebuffRate
 * @text Debuff Rate of MaxHP(mhp)
 * @desc Specify the debuff rate per level as a decimal for MaxHP(mhp).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mmpBuffRate
 * @text Buff Rate of MaxMP(mmp)
 * @desc Specify the buff rate per level as a decimal for MaxMP(mmp).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mmpDebuffRate
 * @text Debuff Rate of MaxMP(mmp)
 * @desc Specify the debuff rate per level as a decimal for MaxMP(mmp).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param atkBuffRate
 * @text Buff Rate of Attack Power(atk)
 * @desc Specify the buff rate per level as a decimal for Attack Power(atk).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param atkDebuffRate
 * @text Debuff Rate of Attack Power(atk)
 * @desc Specify the debuff rate per level as a decimal for Attack Power(atk).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param defBuffRate
 * @text Buff Rate of Defense Power(def)
 * @desc Specify the buff rate per level as a decimal for Defense Power(def).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param defDebuffRate
 * @text Debuff Rate of Defense Power(def)
 * @desc Specify the debuff rate per level as a decimal for Defense Power(def).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param matBuffRate
 * @text Buff Rate of Magic Attack Power(mat)
 * @desc Specify the buff rate per level as a decimal for Magic Attack Power(mat).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param matDebuffRate
 * @text Debuff Rate of Magic Attack Power(mat)
 * @desc Specify the debuff rate per level as a decimal for Magic Attack Power(mat).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mdfBuffRate
 * @text Buff Rate of Magic Defense Power(mdf)
 * @desc Specify the buff rate per level as a decimal for Magic Defense Power(mdf).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mdfDebuffRate
 * @text Debuff Rate of Magic Defense Power(mdf)
 * @desc Specify the debuff rate per level as a decimal for Magic Defense Power(mdf).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param agiBuffRate
 * @text Buff Rate of Agility(agi)
 * @desc Specify the buff rate per level as a decimal for Agility(agi).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param agiDebuffRate
 * @text Debuff Rate of Agility(agi)
 * @desc Specify the debuff rate per level as a decimal for Agility(agi).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param lukBuffRate
 * @text Buff Rate of Luck(luk)
 * @desc Specify the buff rate per level as a decimal for Luck(luk).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param lukDebuffRate
 * @text Debuff Rate of Luck(luk)
 * @desc Specify the debuff rate per level as a decimal for Luck(luk).
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 能力値の強化・弱体の倍率を個別に変更します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201122225821.html
 * 
 * @help 能力値の強化・弱体（バフ・デバフ）の倍率を個別に変更するプラグインです。
 * 
 * バフ・デバフの倍率はデフォルトで1段階あたり0.25ですが、
 * この倍率を能力値ごと、および強化・弱体ごとに変更することができます。
 * プラグインパラメータで、能力値と強弱ごとに倍率を変更してください。
 * 
 * 例えば、強化の倍率を0.5にすると、1段階強化で1.5倍、2段階強化で2倍となります。
 * また、弱体の倍率を0.2にすると、1段階弱体で0.8倍、2段階弱体で0.6倍となります。
 * 
 * 段階の数はデフォルトのまま2段階で変更しません。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param mhpBuffRate
 * @text 最大HP(mhp)の強化倍率
 * @desc 最大HP(mhp)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mhpDebuffRate
 * @text 最大HP(mhp)の弱体倍率
 * @desc 最大HP(mhp)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mmpBuffRate
 * @text 最大MP(mmp)の強化倍率
 * @desc 最大MP(mmp)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mmpDebuffRate
 * @text 最大MP(mmp)の弱体倍率
 * @desc 最大MP(mmp)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param atkBuffRate
 * @text 攻撃力(atk)の強化倍率
 * @desc 攻撃力(atk)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param atkDebuffRate
 * @text 攻撃力(atk)の弱体倍率
 * @desc 攻撃力(atk)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param defBuffRate
 * @text 防御力(def)の強化倍率
 * @desc 防御力(def)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param defDebuffRate
 * @text 防御力(def)の弱体倍率
 * @desc 防御力(def)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param matBuffRate
 * @text 魔法力(mat)の強化倍率
 * @desc 魔法力(mat)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param matDebuffRate
 * @text 魔法力(mat)の弱体倍率
 * @desc 魔法力(mat)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mdfBuffRate
 * @text 魔法防御(mdf)の強化倍率
 * @desc 魔法防御(mdf)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mdfDebuffRate
 * @text 魔法防御(mdf)の弱体倍率
 * @desc 魔法防御(mdf)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param agiBuffRate
 * @text 敏捷性(agi)の強化倍率
 * @desc 敏捷性(agi)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param agiDebuffRate
 * @text 敏捷性(agi)の弱体倍率
 * @desc 敏捷性(agi)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param lukBuffRate
 * @text 運(luk)の強化倍率
 * @desc 運(luk)の強化1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param lukDebuffRate
 * @text 運(luk)の弱体倍率
 * @desc 運(luk)の弱体1段階あたりの倍率を小数で指定します。
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 능력치 강화/약체의 배율을 개별적으로 변경합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201122225821.html
 * 
 * @help 능력치 강화/약체의 배율을 개별적으로 변경할 수 있는 플러그인입니다.
 * 
 * 강화/약체의 배율은 기본값으로 1단계 당 0.25이지만,
 * 이 배율을 능력치마다 및 강화/약체마다 변경할 수 있게 됩니다.
 * 플러그인 매개 변수로 능력치와 강약별로 배율을 변경하십시오.
 * 
 * 예를 들면, 강화의 배율을 0.5로 하면,
 * 1단계 강화로 1.5배, 2단계 강화로 2배가 됩니다.
 * 또한, 약체의 배율을 0.2로 하면,
 * 1단계 약체로 0.8배, 2단계 약체로 0.6배가 됩니다.
 * 
 * 단계 수는 기본값인 2단계로 변경되지 않습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param mhpBuffRate
 * @text 최대HP(mhp)의 강화 배율
 * @desc 최대HP(mhp)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mhpDebuffRate
 * @text 최대HP(mhp)의 약체 배율
 * @desc 최대HP(mhp)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mmpBuffRate
 * @text 최대MP(mmp)의 강화 배율
 * @desc 최대MP(mmp)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mmpDebuffRate
 * @text 최대MP(mmp)의 약체 배율
 * @desc 최대MP(mmp)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param atkBuffRate
 * @text 공격력(atk)의 강화 배율
 * @desc 공격력(atk)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param atkDebuffRate
 * @text 공격력(atk)의 약체 배율
 * @desc 공격력(atk)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param defBuffRate
 * @text 방어력(def)의 강화 배율
 * @desc 방어력(def)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param defDebuffRate
 * @text 방어력(def)의 약체 배율
 * @desc 방어력(def)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param matBuffRate
 * @text 마법력(mat)의 강화 배율
 * @desc 마법력(mat)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param matDebuffRate
 * @text 마법력(mat)의 약체 배율
 * @desc 마법력(mat)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mdfBuffRate
 * @text 마법방어(mdf)의 강화 배율
 * @desc 마법방어(mdf)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param mdfDebuffRate
 * @text 마법방어(mdf)의 약체 배율
 * @desc 마법방어(mdf)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param agiBuffRate
 * @text 민첩성(agi)의 강화 배율
 * @desc 민첩성(agi)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param agiDebuffRate
 * @text 민첩성(agi)의 약체 배율
 * @desc 민첩성(agi)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param lukBuffRate
 * @text 운수(luk)의 강화 배율
 * @desc 운수(luk)의 강화 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 * @param lukDebuffRate
 * @text 운수(luk)의 약체 배율
 * @desc 운수(luk)의 약체 1단계 당 배율을 소수로 지정합니다.
 * @default 0.25
 * @type number
 * @decimals 4
 * @min 0
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const mhpBuffRate = Number(parameters['mhpBuffRate']) || 0;
	const mhpDebuffRate = Number(parameters['mhpDebuffRate']) || 0;
	const mmpBuffRate = Number(parameters['mmpBuffRate']) || 0;
	const mmpDebuffRate = Number(parameters['mmpDebuffRate']) || 0;
	const atkBuffRate = Number(parameters['atkBuffRate']) || 0;
	const atkDebuffRate = Number(parameters['atkDebuffRate']) || 0;
	const defBuffRate = Number(parameters['defBuffRate']) || 0;
	const defDebuffRate = Number(parameters['defDebuffRate']) || 0;
	const matBuffRate = Number(parameters['matBuffRate']) || 0;
	const matDebuffRate = Number(parameters['matDebuffRate']) || 0;
	const mdfBuffRate = Number(parameters['mdfBuffRate']) || 0;
	const mdfDebuffRate = Number(parameters['mdfDebuffRate']) || 0;
	const agiBuffRate = Number(parameters['agiBuffRate']) || 0;
	const agiDebuffRate = Number(parameters['agiDebuffRate']) || 0;
	const lukBuffRate = Number(parameters['lukBuffRate']) || 0;
	const lukDebuffRate = Number(parameters['lukDebuffRate']) || 0;
	
	// Make Tables
	const buffRates = [mhpBuffRate, mmpBuffRate, atkBuffRate, defBuffRate, matBuffRate, mdfBuffRate, agiBuffRate, lukBuffRate];
	const debuffRates = [mhpDebuffRate, mmpDebuffRate, atkDebuffRate, defDebuffRate, matDebuffRate, mdfDebuffRate, agiDebuffRate, lukDebuffRate];
	
	
	//--------------------------------------------------
	// Game_BattlerBase.paramBuffRate
	//  [Modified Definition]
	//--------------------------------------------------
	Game_BattlerBase.prototype.paramBuffRate = function(paramId) {
		const b = this._buffs[paramId];
		if (b >= 0) {
			return b * buffRates[paramId] + 1.0;
		} else {
			return b * debuffRates[paramId] + 1.0;
		}
	};
	
})();

