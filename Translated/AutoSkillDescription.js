
/*:
 * @plugindesc Automatically generates a description of the skill (for debugging to see if it's working)
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help AutoSkillDescription.js
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc スキルの説明文を自動的に生成します（効果があってるかのデバッグ用）
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 *
 * @help AutoSkillDescription.js
 * 
 * 特殊効果の「逃げる」などは未対応です。
 * 2行目にダメージ式を代入してあります
 * 
 * <AutoDescriptionOff>
 * メモ欄に記載することで自動生成せずにスキルの説明がそのまま表示されます。
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */

function RYBA_SkillCheck(){
    this.initialize(...arguments);
};

RYBA_SkillCheck.prototype.initialize = function(object) {
    this._item = new Game_Item();
    this._item.setObject(object);
    this._effectDic = [];
    
    for (const effect of this.item().effects) {
        this.createItemEffect(this._effectDic, effect);
    }

    this._gainHpValue = this.effectHpCal();
    this._gainMpValue = this.effectMpCal();
    this._gainTpValue = this.effectTpCal();

    this.effectStatesCal();

    this.effectParamCal();
    
};

RYBA_SkillCheck.prototype.effectDir = function(){
    return this._effectDic;
};

RYBA_SkillCheck.prototype.isGainHp = function() {
    return this._gainHpValue > 0;
};

RYBA_SkillCheck.prototype.isGainMp = function() {
    return this._gainMpValue > 0;
};

RYBA_SkillCheck.prototype.isGainTp = function() {
    return this._gainTpValue > 0;
};

RYBA_SkillCheck.prototype.isLossHp = function() {
    return this._gainHpValue < 0;
};

RYBA_SkillCheck.prototype.isLossMp = function() {
    return this._gainMpValue < 0;
};

RYBA_SkillCheck.prototype.isLossTp = function() {
    return this._gainTpValue < 0;
};

RYBA_SkillCheck.prototype.isHpText = function() {
    if(this.isHpEffect()){
        return true;
    }
    if(!this.isRecover()){
       return false;
    }
    return this.isGainHp();
};

RYBA_SkillCheck.prototype.createItemEffect = function (array,effect){
    const code = effect.code;
    const len = array.length;
    for(let i = 0; i < len; ++i ){
        let data = array[i];
        if( !data ){
            continue;
        }
        if( data.code === code ){
            data.effects.push(effect);
            return;
        }
    }
    array.push( {code:code,effects:[effect]} );
};

RYBA_SkillCheck.prototype.effectFindIndex = function (code){
    const len = this._effectDic.length;
    for(let i = 0; i < len; ++i ){
        let data = this._effectDic[i];
        if( !data ){
            continue;
        }
        if( data.code === code ){
            return i;
        }
    }
    return -1;
};

RYBA_SkillCheck.prototype.effectRemoveCode = function (code){
    const index = this.effectFindIndex(code);
    if(index < 0){
        return null;
    }
    const data = this._effectDic[index];
    this._effectDic.splice(index,1);
    return data;
};
RYBA_SkillCheck.prototype.baseEffectPointCal = function (code){
    let result = 0;
    var data = this.effectRemoveCode(code);
    if(!data){
        return result;
    }
    const len = data.effects.length;
    for(let i = 0; i < len; ++i ){
        let effect = data.effects[i];
        if( !effect ){
            continue;
        }
        if(effect.value1 ){
            result += effect.value1;
        }
        if(effect.value2){
            result += effect.value2;
        }
    }
    return result;
};


RYBA_SkillCheck.prototype.effectHpCal = function (){
    return this.baseEffectPointCal(Game_Action.EFFECT_RECOVER_HP);
};

RYBA_SkillCheck.prototype.effectMpCal = function (){
    return this.baseEffectPointCal(Game_Action.EFFECT_RECOVER_MP);
};

RYBA_SkillCheck.prototype.effectTpCal = function (){
    return this.baseEffectPointCal(Game_Action.EFFECT_GAIN_TP);
};

RYBA_SkillCheck.prototype.baseEffectStatesCal = function (array,code){
    this.baseEffectParamCal(array,code);
    // let result = 0;
    // var data = this.effectRemoveCode(code);
    // if(!data){
    //     return;
    // }
    // const len = data.effects.length;
    // for(let i = 0; i < len; ++i ){
    //     let effect = data.effects[i];
    //     if( !effect ){
    //         continue;
    //     }
    //     array.push($dataStates[effect.dataId]);
    // }
};

RYBA_SkillCheck.prototype.effectStatesCal = function() {
    this._addStates = [];
    this._removeStates = [];
    this.baseEffectStatesCal(this._addStates,Game_Action.EFFECT_ADD_STATE);
    this.baseEffectStatesCal(this._removeStates,Game_Action.EFFECT_REMOVE_STATE);
};

RYBA_SkillCheck.prototype.addStatesArray = function(){
    return this._addStates;
};

RYBA_SkillCheck.prototype.removeStatesArray = function(){
    return this._removeStates;
};

RYBA_SkillCheck.prototype.baseEffectParamCal = function (array,code){
    let result = 0;
    var data = this.effectRemoveCode(code);
    if(!data){
        return;
    }
    const len = data.effects.length;
    for(let i = 0; i < len; ++i ){
        let effect = data.effects[i];
        if( !effect ){
            continue;
        }
        let find = false;
        let aryLen = array.length;
        for(let j = 0; j < aryLen; ++j){
            let data = array[j];
            if(data.dataId === effect.dataId){
                find = true;
                data.value += 1;
                break;
            }
        }
        if(!find){
            array.push({dataId:effect.dataId, value:1});
        }
    }
};

RYBA_SkillCheck.prototype.effectParamCal = function() {
    this._addBuff = [];
    this._addDebuff = [];
    this._removeBuff = [];
    this._removeDebuff = [];
    this.baseEffectParamCal(this._addBuff,Game_Action.EFFECT_ADD_BUFF);
    this.baseEffectParamCal(this._addDebuff,Game_Action.EFFECT_ADD_DEBUFF);
    this.baseEffectParamCal(this._removeBuff,Game_Action.EFFECT_REMOVE_BUFF);
    this.baseEffectParamCal(this._removeDebuff,Game_Action.EFFECT_REMOVE_DEBUFF);
};

RYBA_SkillCheck.prototype.addBuffArray = function(){
    return this._addBuff;
};

RYBA_SkillCheck.prototype.addDebuffArray = function(){
    return this._addDebuff;
};

RYBA_SkillCheck.prototype.removeBuffArray = function(){
    return this._removeBuff;
};

RYBA_SkillCheck.prototype.removeDebuffArray = function(){
    return this._removeDebuff;
};


RYBA_SkillCheck.prototype.item = function(){
    return this._item.object();
};

RYBA_SkillCheck.prototype.checkItemScope = function(list) {
    return list.includes(this.item().scope);
};

RYBA_SkillCheck.prototype.isForOpponent = function() {
    return this.checkItemScope([1, 2, 3, 4, 5, 6, 14]);
};

RYBA_SkillCheck.prototype.isForFriend = function() {
    return this.checkItemScope([7, 8, 9, 10, 12, 13, 14]);
};

RYBA_SkillCheck.prototype.isForUser = function() {
    return this.checkItemScope([11]);
};

RYBA_SkillCheck.prototype.isForAliveFriend = function() {
    return this.checkItemScope([7, 8, 11, 14]);
};

RYBA_SkillCheck.prototype.isForDeadFriend = function() {
    return this.checkItemScope([9, 10]);
};

RYBA_SkillCheck.prototype.isForOne = function() {
    return this.checkItemScope([1, 7, 9, 11, 12]);
};

RYBA_SkillCheck.prototype.isForRandom = function() {
    return this.checkItemScope([3, 4, 5, 6]);
};

RYBA_SkillCheck.prototype.isForAll = function() {
    return this.checkItemScope([2, 8, 10, 13, 14]);
};

RYBA_SkillCheck.prototype.numTargets = function() {
    return this.isForRandom() ? this.item().scope - 2 : 0;
};

RYBA_SkillCheck.prototype.numRepeatsTotal = function() {
    let baseCount = this.numTargets() > 0 ? this.numTargets() : 1;
    let repeats = this.item().repeats;
    return repeats * baseCount;
};

RYBA_SkillCheck.prototype.checkDamageType = function(list) {
    return list.includes(this.item().damage.type);
};

RYBA_SkillCheck.prototype.isHpEffect = function() {
    return this.checkDamageType([1, 3, 5]);
};

RYBA_SkillCheck.prototype.isMpEffect = function() {
    return this.checkDamageType([2, 4, 6]);
};

RYBA_SkillCheck.prototype.isDamage = function() {
    return this.checkDamageType([1, 2]);
};

RYBA_SkillCheck.prototype.isRecover = function() {
    return this.checkDamageType([3, 4]);
};

RYBA_SkillCheck.prototype.isDrain = function() {
    return this.checkDamageType([5, 6]);
};

RYBA_SkillCheck.prototype.isHpRecover = function() {
    return this.checkDamageType([3]);
};

RYBA_SkillCheck.prototype.isMpRecover = function() {
    return this.checkDamageType([4]);
};

RYBA_SkillCheck.prototype.isCertainHit = function() {
    return this.item().hitType === Game_Action.HITTYPE_CERTAIN;
};

RYBA_SkillCheck.prototype.isPhysical = function() {
    return this.item().hitType === Game_Action.HITTYPE_PHYSICAL;
};

RYBA_SkillCheck.prototype.isMagical = function() {
    return this.item().hitType === Game_Action.HITTYPE_MAGICAL;
};

RYBA_SkillCheck.prototype.isMagicSkill = function() {
    if (this.isSkill()) {
        return $dataSystem.magicSkills.includes(this.item().stypeId);
    } else {
        return false;
    }
};

//---------------------------------------------------------------------------


function RYBA_SkillEffectText(){
    this.initialize(...arguments);
};

RYBA_SkillEffectText.prototype.initialize = function(act, isNoFomat) {
    const isRecover = act.isRecover();
    this._isNoFomat = isNoFomat;
    this._effectText = '';
    this._effectText += this.addStatesText(act);
    this._effectText += this.removeStatesText(act);
    this._effectText += this.effectLossText(act);
    if(!isRecover){
        this._effectText += this.effectGainText(act);
    }

    this._effectText += this.addBuffText(act) + this.addDebuffText(act) + this.removeBuffText(act) + this.removeDebuffText(act);
};

RYBA_SkillEffectText.prototype.getEffectText = function(){
    return this._effectText;
};

RYBA_SkillEffectText.prototype.baseEffectPointText = function(isHp,isMp,isTp){
    let flag = false;
    let result = '';
    if(isHp){
        flag = true;
        result += 'HP';
    }
    if(isMp){
        if(flag){
            result += RYBA_AndText;
        }else{
            flag = true;
        }
        result += 'MP';
    }
    if(isTp){
        if(flag){
            result += RYBA_AndText;
        }else{
            flag = true;
        }
        result += 'TP';
    }
    if(result !== ''){
        if(this._isNoFomat){
            result = 'の' + result;
            this._isNoFomat = false;
        }else{
            result = '+' + result;
        }
    }
    return result;
};

RYBA_SkillEffectText.prototype.effectLossText = function(act){
    var beforeNoFomat = this._isNoFomat;
    let result = this.baseEffectPointText(act.isLossHp(),act.isLossMp(),act.isLossTp());
    if(result === ''){
        return '';
    }
    result += '減';
    if(beforeNoFomat){
        result += '少';
    }
    return result;
};

RYBA_SkillEffectText.prototype.effectGainText = function(act){
    var beforeNoFomat = this._isNoFomat;
    let result = this.baseEffectPointText(act.isGainHp(),act.isGainMp(),act.isGainTp());
    if(result === ''){
        return '';
    }
    result += '増';
    if(beforeNoFomat){
        result += '加';
    }
    return result;
};
RYBA_SkillEffectText.prototype.baseEffectStatesText = function(array){
    let flag = false;
    let result = '';

    const len = array.length;
    let conCount = 0;
    for(let i = 0; i < len; ++i ){
        const data = array[i];
        if (data.dataId === 0) {
            continue;
        }
        if( conCount > 0 ){
            result += RYBA_AndText;
        }
        result += $dataStates[data.dataId].name;
        ++conCount;
    }

    if(result !== ''){
        if(this._isNoFomat){
            result = 'を' + result;
            this._isNoFomat = false;
        }else{
            result = '+' + result;
        }
    }
    return result;
};

RYBA_SkillEffectText.prototype.addStatesText = function(act){
    var beforeNoFomat = this._isNoFomat;
    let result = this.baseEffectStatesText(act.addStatesArray());
    if(result === ''){
        return '';
    }
    if(beforeNoFomat){
        result += 'にする';
    }
    return result;
};

RYBA_SkillEffectText.prototype.removeStatesText = function(act){
    let result = this.baseEffectStatesText(act.removeStatesArray());
    if(result === ''){
        return '';
    }
    result += '治療';
    return result;
};

RYBA_SkillEffectText.prototype.baseEffectParamText = function(array){
    let flag = false;
    let result = '';

    const len = array.length;
    for(let i = 0; i < len; ++i ){
        const data = array[i];
        result += TextManager.param(data.dataId);
    }

    if(result !== ''){
        if(this._isNoFomat){
            result = 'の' + result;
            this._isNoFomat = false;
        }else{
            result = '+' + result;
        }
    }
    return result;
};
RYBA_SkillEffectText.prototype.addBuffText = function(act){
    let result = this.baseEffectParamText(act.addBuffArray());
    if(result === ''){
        return '';
    }
    result += '上昇';
    return result;
};
RYBA_SkillEffectText.prototype.addDebuffText = function(act){
    let result = this.baseEffectParamText(act.addDebuffArray());
    if(result === ''){
        return '';
    }
    result += '低下';
    return result;
};

RYBA_SkillEffectText.prototype.removeBuffText = function(act){
    let result = this.baseEffectParamText(act.removeBuffArray());
    if(result === ''){
        return '';
    }
    result += '強化解除';
    return result;
};

RYBA_SkillEffectText.prototype.removeDebuffText = function(act){
    let result = this.baseEffectParamText(act.removeDebuffArray());
    if(result === ''){
        return '';
    }
    result += '弱体解除';
    return result;
};

//---------------------------------------------------------------------------

const RYBA_AndText = '･';
function RYBA_GetItemDescription(skill){
    if(!skill){
        return '';
    }
    return skill.autoItemDescriptionText ? skill.autoItemDescriptionText : skill.description;
};
function RYBA_GetItemName(item){
    if(!item){
        return '';
    }
    return item.autoItemName ? item.autoItemName : item.name;
};
Window_Help.prototype.setItem = function(item) {
    this.setText(RYBA_GetItemDescription(item));
};

function RYBA_GetItemIconIndex(item){
    if(!item){
        return '';
    }
    return item.autoItemIconIndex ? item.autoItemIconIndex : item.iconIndex;
}
 //説明文を作る関数
function RYBA_CreateSkillDescription(skill){
    if(!skill){
        return '';
    }
    
    const action = new RYBA_SkillCheck(skill);
    let result = '';
    //ランダム
    if(action.isForRandom()){
        result += 'ランダムな';
    }
   
    //まず陣営
    if(action.isForUser()){
        result += '使用者';
    }else{
        if(action.isForOpponent()){
            result += '敵';
        }else if(action.isForFriend()){
            result += '味方';
        } 
        //数
        if(action.isForOne()){
            result += '単体';
        }else if(action.isForAll()){
            result += '全体';
        }    
    }
    
    //負傷者のみなので復活スキルに違いない
    const deadOnly = (action.isForDeadFriend() && !action.isForAliveFriend());
    if(deadOnly){
        return result + 'を蘇生';
    }

    const isDamage = action.isDamage();
    const isRecover = action.isRecover();
    const isDrain = action.isDrain();
    let isPointText = false;
    let isNoFomat = false;
    
    if(isDamage){
        result += 'に';
    }else if(isRecover || isDrain){
        result += 'の';
        if(action.isHpText()){
            isPointText = true;
            result += 'HP';
        }
    }else{
        isNoFomat = true;
    }
    
    if(action.isMpEffect() || (isRecover && action.isGainMp())){
        if(isPointText){
            result += RYBA_AndText;
        }
        result += 'MP';
        isPointText = true;
    }

    if(isRecover && action.isGainTp()){
        result += RYBA_AndText + 'TP';
    }
    
    if(isDrain){
        result += 'を吸収';
    }else if(isRecover){
        result += 'を回復';
    }else if(isDamage){
        result += 'ダメージ';
    }

    const skillEffectData = new RYBA_SkillEffectText(action,isNoFomat);
    if(skillEffectData.getEffectText() !== ''){
        result += skillEffectData.getEffectText();
    }else{
        if(isNoFomat){
            return '？？？';
        }
    }

    const numRepeatsTotal = action.numRepeatsTotal();
    if( numRepeatsTotal > 1){
        result += '(x' + numRepeatsTotal + ')'
    }

    return result;
};

function RYBA_getHitTypeText(skill){
    if(skill.occasion === 3){
        return '[パッシブ]';
    }else if(skill.hitType === Game_Action.HITTYPE_PHYSICAL){
        return '[物理]';
    }else if(skill.hitType === Game_Action.HITTYPE_MAGICAL || $dataSystem.magicSkills.includes(skill.stypeId)){
        return '[魔法]';
    }else if(skill.hitType === Game_Action.HITTYPE_CERTAIN){
        return '[特殊]';
    }

    return '[なし]';
}

function RYBA_getSkillTypeText(skill){
    let result = '';
    result += RYBA_getHitTypeText(skill);
    if(skill.tpCost === 100){
        result += ' <必殺技>'
    }
    return result;
}

function Nakasa_skillCostText (skill) {
    let result = '';
    if (skill.tpCost > 0) {
        result = 'TP:'+skill.tpCost;
    } else if (skill.mpCost > 0) {
        result = 'MP:'+skill.mpCost;
    }else if (DataManager.getVirtualCost(skill.virtualCostArray,0) > 0) {
        result = 'Ｇ:'+DataManager.getVirtualCost(skill.virtualCostArray,0);
    }else if(DataManager.getVirtualCostMost(skill.virtualCostArray) > 0){
        result = 'VA:'+DataManager.getVirtualCostMost(skill.virtualCostArray);
    }
    return Nakasa_StringPaddingRight(''+result,' ',7);
};

function Nakasa_skillFormatText (skill) {
    const sign = [0].includes(skill.damage.type) ? false : true;
    if(!sign){
        return '';
    }
    let result = String(skill.damage.formula);
    result = result.replace(/ /g, '');
    result = result.replace(/a\./g, '自分の');
    result = result.replace(/b\./g, '相手の');
    result = result.replace(/mhp/g, TextManager.param(0));
    result = result.replace(/mmp/g, TextManager.param(1));
    result = result.replace(/atk/g, TextManager.param(2));
    result = result.replace(/def/g, TextManager.param(3));
    result = result.replace(/mat/g, TextManager.param(4));
    result = result.replace(/mdf/g, TextManager.param(5));
    result = result.replace(/spd/g, TextManager.param(6));
    result = result.replace(/luk/g, TextManager.param(7));
    result = result.replace(/hp/g, '残HP');
    result = result.replace(/mp/g, '残MP');
    result = result.replace(/tp/g, '残TP');
    return '<式:' + result + '>';
};


(() => {
    const Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
      Scene_Boot_start.call(this);
      DataManager.processAutoSkillDescription();
    };
    
    DataManager.processAutoSkillDescription = function() {
      for (let i = 1; i < $dataSkills.length; i++) {
        const skill = $dataSkills[i];
        const autoDescriptionOff = skill.meta.AutoDescriptionOff;
        if (autoDescriptionOff){
            skill.autoItemDescriptionText = skill.description;
        }else{
            skill.autoItemDescriptionText = RYBA_CreateSkillDescription(skill) + '\n' + Nakasa_skillFormatText(skill);
        }
        
      }
    };
    
})();
