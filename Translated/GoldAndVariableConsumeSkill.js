/*:
 * @target MV MZ
 * @plugindesc make the skill that consumes Gold, not only MP and/or TP
 * @author RYBA
 *
 * @param Consume Gold Color
 * @desc the text color ID of display consume Gold
 * @type number
 * @default 17
 * 
 * @param Consume Variable Color
 * @desc the text color ID of display consume Variable
 * @type number
 * @default 17
 * 
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MV and MZ.
 *
 * This plugin enables to make Gold consume skill.
 *
 * [Usage]
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/*:ja
 * @target MV MZ
 * @plugindesc Gold消費技
 * @author RYBA(熱帯魚)
 *
 * @param Consume Gold Color
 * @text 表示色(ゴールド)
 * @desc 表示色のシステムID
 * @type number
 * @default 17
 * 
 * @param Consume Variable Color
 * @text 表示色(変数)
 * @desc 表示色のシステムID
 * @type number
 * @default 20
 * 
 * @help GoldAndVariableConsumeSkill.js
 *
 * このプラグインはGold消費技(銭投げ)の作成を可能にします。
 * また変数もコストとして扱う事が可能になっています
 *
 * ■仕様
 * スキルのメモ欄に
 * <GoldCost:30>
 * と記述します。
 * この場合、Goldを30消費します。
 * 
 * 変数を使いたい場合は、
 * <VirtualCostArray:[{ID:1,Cost:20},{ID:5,Cost:10}]>
 * と記述します。
 * この場合、変数ID1を20、変数ID5を10消費しないと使えません
 * 
 * ゴールドと変数を両方設定することも可能です。
 * （ゴールドはID0の扱いとしているのでVirtualCostArrayだけでも設定できます）
 * ただし、VirtualCostArrayでID0を登録しつつ、GoldCostも記述すると予期せぬ動作となります（不具合）
 *
 * 仕様1
 * 消費Gold（変数）より低い場合でも実行は可能となっています。、
 * この場合使用後のGoldは0になります。（一度選択した場合、不発にならない）
 * 具体的には250ゴールドで同一ターン内に100ゴールドを消費する技を4人で選択しても全員使用します。
 * 
 * 仕様2
 * ゴールド消費スキルは敵が使用してもゴールドが減りません（敵にとっては意味のない設定となります）
 * 変数消費は敵側にも有効になります。
 * 行動パターンを制御するのに活用できるかもしれません。
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。

 */

(function() {
    const parameters = PluginManager.parameters('GoldAndVariableConsumeSkill');
    const goldConsumeColor = Number(parameters['Consume Gold Color'] || 17);
    const variableConsumeColor = Number(parameters['Consume Variable Color'] || 20);
  
    const Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
      Scene_Boot_start.call(this);
      DataManager.processGoldCost();
    };
  
    DataManager.processGoldCost = function() {
      for (let i = 1; i < $dataSkills.length; i++) {
        let skill = $dataSkills[i];
        let result = skill.meta.GoldCost;
        let arr = eval(skill.meta.VirtualCostArray);
        arr = Array.isArray(arr) ? arr : [];
        
        if (result){
          arr.unshift({ID:0,Cost:Number(result)});
        }

        skill.virtualCostArray = arr;
      }
    };

    DataManager.getVirtualCost = function(ary,id){
      if(!ary){
        return 0;
      }
      let len = ary.length;
      for(let i = 0; i < len; ++i){
        let data = ary[i];
        if(data){
          if(data.ID === id){
            return data.Cost;
          }
        }
      }
      return 0;
    }

    DataManager.getVirtualCostMost = function(ary){
      if(!ary){
        return 0;
      }
      let len = ary.length;
      for(let i = 0; i < len; ++i){
        let data = ary[i];
        if(data){
          if(data.ID === 0){
            continue;
          }
          return data.Cost;
        }
      }
      return 0;
    }

    Game_Party._virtualCostArray = [];
    const Game_Party_initialize = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function() {
      this._virtualCostArray = [];
      Game_Party_initialize.call(this);
    };

    Game_Party.prototype.getVirtualCostTotal = function(id){
      let vir = DataManager.getVirtualCost(this._virtualCostArray,id);
      if(id === 0){
        return $gameParty.gold() - vir;
      }else{
        return $gameVariables.value(id) - vir;
      }
    };

    Game_Party.prototype.spendVirtualCostTotal = function(data){
      if(!data){
        return;
      }
      let id = data.ID;
      let cost = data.Cost;
      let mao = this.getVirtualCostTotal(id);
      if(mao < cost){
        cost = mao;
      }
      if(id === 0){
        $gameParty.loseGold(cost);
      }else{
        let oldValue = $gameVariables.value(id);
        $gameVariables.setValue(id, oldValue - cost);
      }
      
    };


  const Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;

    Game_BattlerBase.prototype.canPaySkillCost = function(skill) {

      let ary = skill.virtualCostArray;
      let len = ary.length;
      for(let i = 0; i < len; ++i){
        let data = ary[i];
        if(this.checkPayCost(data)){
          let mao = Game_Party.prototype.getVirtualCostTotal(data.ID);
          if(mao < data.Cost){
            return false;
          }
        }
      }
      return (
        Game_BattlerBase_canPaySkillCost.call(this,skill) 
      );
    };
  
    Game_BattlerBase.prototype.skillGoldCost = function(skill) {
      return DataManager.getVirtualCost(skill.virtualCostArray,0);
    };

    Game_BattlerBase.prototype.checkPayCost = function(data){
      if(!data){
        return false;
      }

      if(data.ID === 0 && !this.isActor() ){
        return false;
      }

      return true;
    }
  
    const Game_BattlerBase_paySkillCost =
      Game_BattlerBase.prototype.paySkillCost;
    Game_BattlerBase.prototype.paySkillCost = function(skill) {
      Game_BattlerBase_paySkillCost.call(this, skill);
      let ary = skill.virtualCostArray;
      let len = ary.length;
      for(let i = 0; i < len; ++i){
        let data = ary[i];
        if(this.checkPayCost(data)){
          Game_Party.prototype.spendVirtualCostTotal(data);
        }
      }
    };
  
    const Window_SkillList_drawSkillCost = 
     Window_SkillList.prototype.drawSkillCost;
    Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
      if (this._actor.skillGoldCost(skill) > 0) {
        var c = 'ColorManager' in window ? ColorManager : this;
        this.changeTextColor(c.textColor(goldConsumeColor));
        this.drawText(this._actor.skillGoldCost(skill), x, y, width, 'right');
        return;
      }else if(DataManager.getVirtualCostMost(skill.virtualCostArray) > 0){
        var c = 'ColorManager' in window ? ColorManager : this;
        this.changeTextColor(c.textColor(variableConsumeColor));
        this.drawText(DataManager.getVirtualCostMost(skill.virtualCostArray), x, y, width, 'right');
        return;
      }
      Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
    };
  
  })();
  
