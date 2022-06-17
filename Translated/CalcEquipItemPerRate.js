
/*:
 * @target MZ
 * @plugindesc 最強装備仕様変更プラグイン
 * @author さすらいのトム
 *
 * @help
 * ツクールMZ従来の仕様として、「最強装備はアクターが装備できる装備のうち、
 * 最もパラメータ上昇率が高い装備が選択されるが、
 * 攻撃が10％上昇する装備などの割合でステータスを増減させるものは
 * パラメータ上昇率としてカウントされない」という仕様がありますが、
 * これを割合でステータスを増減させるものにも対応させます。
 * 
 * また、能力増減値の総和がマイナスになるものは、
 * 最強装備の対象外になります。
 * 能力増減値の総和がマイナスになる装備しかもっていない場合、
 * 対象の部位は「装備なし」の状態になります。
 * 
 * このプラグインには、プラグインコマンドはありません。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 */

(() => {
    'use strict';
    //最強装備に割合装備を適用させるプラグイン
    //割合装備を適用するためアクターのステータスを変数に記憶させる
    const Game_Actor_prototype_optimizeEquipments = Game_Actor.prototype.optimizeEquipments;
    Game_Actor.prototype.optimizeEquipments = function() {
        this.clearEquipments();
        this.calcOriginaiStatus();
        Game_Actor_prototype_optimizeEquipments.call(this);
    }

    //アクターの元ステータス取得
    Game_Actor.prototype.calcOriginaiStatus = function() {
        $gameTemp._actorOriginaiStatus = [];
        for (let i = 0; i < 8; i++) {
            $gameTemp._actorOriginaiStatus[i] = this.getParams(i);
        }
    }

    const Game_Actor_prototype_calcEquipItemPerformance = Game_Actor.prototype.calcEquipItemPerformance;
    Game_Actor.prototype.calcEquipItemPerformance = function(item) {
        let result = Game_Actor_prototype_calcEquipItemPerformance.call(this,item);
        result += this.calcEquipItemPerRate(item);
        if (result < 0) {
            return -1001;
        }
        return result;
    };

    Game_Actor.prototype.calcEquipItemPerRate = function(item) {
    let result = 0;
        if (item.traits) {
            for (let i = 0;i <item.traits.length;i++){
                if (item.traits[i].code == 21){
                    result = $gameTemp._actorOriginaiStatus[item.traits[i].dataId] * item.traits[i].value - $gameTemp._actorOriginaiStatus[item.traits[i].dataId];
                }
            }
        }
        return result;
    }

    Game_Battler.prototype.getParams = function(id) {
        var result = "";
        switch(id) {
            case 0:
                result = this.mhp;
                break;
            case 1:
                result = this.mmp;
                break;
            case 2:
                result =  this.atk;
                break;
            case 3:
                result =  this.def;
                break;
            case 4:
                result =  this.mat;
                break;
            case 5:
                result =  this.mdf;
                break;
            case 6:
                result =  this.agi;
                break;
            case 7:
                result =  this.luk; 
                break;
            }
            return result;
    }

})();
