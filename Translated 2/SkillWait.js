/*:
 * @plugindesc Sets post-use rigidity for skills.
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help SkillWait.js
 * 
 * <AFTER_ATB_CHARGE_SPEED:100> normal.
 * <AFTER_ATB_CHARGE_SPEED:20> x5
 * <AFTER_ATB_CHARGE_SPEED:200> x0.5
 * 
 * <FastTpbChargeTime:1.0>
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc スキルに使用後硬直WT(割合)を設定します
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 *
 * @help SkillWait.js
 * 
 * このプラグインはタイムプログレス戦闘でのみ意味を成します。
 * 
 * <AFTER_ATB_CHARGE_SPEED:100>
 * 100が標準速度です。何も書かないと100になります。
 * 20に設定すると次にターンが回ってくるのに5倍時間がかかります。
 * 200に設定すると次にターンが回ってくるのに1/2で済みます。
 * 
 * <FastTpbChargeTime:1.0>
 * アクターかエネミーのメモ欄に指定します
 * プログレスバーの初期値が固定した数値となります
 * 0.0~1.0の間で指定します
 * 
 * スキルだけでなくアイテムも行けます。
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 * 
 * 要するに割と自由です。
 */

(() => {
Game_Battler._atbSpeedTickRev = 1.0;
Game_Battler.prototype.tpbAcceleration = function() {
    const speed = this.tpbRelativeSpeed();
    const referenceTime = $gameParty.tpbReferenceTime();
    return speed / referenceTime * this.atbSpeedTickRev();
};
Game_Battler_prototype_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    Game_Battler_prototype_initMembers.call(this);
    this._atbSpeedTickRev = undefined;
};
Game_Battler.prototype.atbSpeedTickRev = function() {
    if(this._atbSpeedTickRev === undefined) return 1.0;
    return this._atbSpeedTickRev;
    };
Game_Battler.prototype.setAtbSpeedTickRev = function(value) {
    this._atbSpeedTickRev = value;
};
const  Game_Battler_initTpbChargeTime =  Game_Battler.prototype.initTpbChargeTime;
Game_Battler.prototype.initTpbChargeTime = function(advantageous) {
    Game_Battler_initTpbChargeTime.call(this,advantageous);
    let battler = this.isActor() ? this.actor() : this.enemy();
    if(battler){
        if(battler.meta.FastTpbChargeTime){
            this._tpbChargeTime = Number(battler.meta.FastTpbChargeTime);
        }
    }
    
    this._atbSpeedTickRev = undefined;
    
};
Game_Battler.prototype.finishTpbCharge = function() {
    this._atbSpeedTickRev = undefined;
    this._tpbState = "charged";
    this._tpbTurnEnd = true;
    this._tpbIdleTime = 0;
};
Game_Battler.prototype.checkSpd = function() {
    const actions = this._actions.filter(action => action.isValid());
    const items = actions.map(action => action.item());
    var rate = 1.0;

    if(this._lastActionItem){
        rate *=this._lastActionItem.afterChargeATBRate;
    }
    
    this.setAtbSpeedTickRev(rate);
};

Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    Game_Battler_useItem.call(this, item);
    this._lastActionItem = item;
};

Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    this.checkSpd();
    Game_Battler_onAllActionsEnd.call(this);
};

DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!DataManager_isDatabaseLoaded.call(this)) return false;
  this.processNoteCheck($dataSkills);
  this.processNoteCheck($dataItems);
  return true;
};

DataManager.processNoteCheck = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.afterChargeATBRate = 1.0;


    if(obj && obj.meta.AFTER_ATB_CHARGE_SPEED){
        rateValue = parseFloat(obj.meta.AFTER_ATB_CHARGE_SPEED);
        rateValue = rateValue * 0.01;
        obj.afterChargeATBRate = rateValue;
    }
    
  }
};
})();
