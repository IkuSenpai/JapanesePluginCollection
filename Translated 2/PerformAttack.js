
/*:
 * @plugindesc The motion for using a skill is a normal attack motion with the specified weapon.
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help PerformAttack.js
 * 
 * <PerformAttackId:1>
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc スキル使用時に指定した武器で通常攻撃モーションさせます。
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 *
 * @help PerformAttack.js
 * 
 * スキル使用時に指定した武器で通常攻撃モーションさせます。
 * 
 * <PerformAttackId:1>
 * 攻撃モーションIDを指定します
 * 0を指定すると素手になります。
 * 
 * <PerformAttackId:-1>
 * -1を指定すると現在装備している武器のモーションとなります。
 * 
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(function() {


    const Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
      Scene_Boot_start.call(this);
      DataManager.processPerformAttack();
    };
  
    DataManager.processPerformAttack = function() {
      for (let i = 1; i < $dataSkills.length; i++) {
        let skill = $dataSkills[i];
        let performAttackId = skill.meta.PerformAttackId;
        if (performAttackId){
            skill.performAttackId = Number(performAttackId);
        }
      }
    };

    const Game_Actor_performAction = Game_Actor.prototype.performAction;
    Game_Actor.prototype.performAction = function(action) {
        let item = action.item();
        if (!action.isSkill() || !item.performAttackId) {
            Game_Actor_performAction.call(this,action);
        }else{
            Game_Battler.prototype.performAction.call(this, action);
            this.performAttackToItem(item);
        }
    };

    Game_Actor.prototype.performAttackToItem = function(item) {
        let wtypeId = 0;
        if(item.performAttackId < 0){
            const weapons = this.weapons();
            wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
        }else{
            wtypeId = item.performAttackId;
        }
        const attackMotion = $dataSystem.attackMotions[wtypeId];
        if (attackMotion) {
            if (attackMotion.type === 0) {
                this.requestMotion("thrust");
            } else if (attackMotion.type === 1) {
                this.requestMotion("swing");
            } else if (attackMotion.type === 2) {
                this.requestMotion("missile");
            }
            this.startWeaponAnimation(attackMotion.weaponImageId);
        }
    };
})();