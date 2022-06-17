/*:
 * @target MZ
 * @plugindesc 敵全体ランダム攻撃プラグイン
 * @author さすらいのトム
 * @url https://drive.google.com/drive/u/0/folders/19ZSazImRgTMIgg_ZEDaYDxl48xoW0vRi
 *
 * @help RandomPlus.js
 * 敵全体をランダムでN回攻撃する技を実装するプラグインです。
 * スキルの技範囲を「敵1体　ランダム」に設定したうえ、スキルのメモに下記の通り記述してください
 * <randomPlus:〇〇>　敵全体ランダムに〇〇回ヒットします
 * <randomValue:〇〇>　敵全体ランダムに変数ID〇〇の値分ヒットします
 * <randomPlusrandomPlusExtra:××>　<randomPlus:〇〇>と併用で使ってください
 * 敵全体ランダムに〇〇～〇〇+××回ヒットします
 * 
 * 例）
 * <randomPlus:10>
 * <randomPlusrandomPlusExtra:5>
 * 敵全体ランダムに10～15回ヒットします
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

    var BattleManager_startAction = BattleManager.startAction; 
    BattleManager.startAction = function() {
        $gameTemp._randomPlusExtra = false;
        $gameTemp._randomPlusExtraVal = 0;
        BattleManager_startAction.call(this)
    };
    	
    //敵〇体ランダム技関連　加算でなく代入なので注意
    var Game_Action_prototype_numTargets = Game_Action.prototype.numTargets;
    Game_Action.prototype.numTargets = function() {
        var result = Game_Action_prototype_numTargets.call(this);
            //撃ったスキルのID
            var skillid = this._item._itemId;
            if ($dataSkills[skillid].meta['randomPlus'] && result) {
            result = Number($dataSkills[skillid].meta['randomPlus']) || 0;
            }
            if ($dataSkills[skillid].meta['randomValue'] && result) {
            result = Number($gameVariables.value($dataSkills[skillid].meta['randomValue'])) || 0;
            }
            if ($dataSkills[skillid].meta['randomPlusExtra'] && result && !$gameTemp._randomPlusExtra) {
                //console.log(result)
                result += Number(Math.floor(Math.random() * (Number($dataSkills[skillid].meta['randomPlusExtra']) + Number(1)))) || 0;
                $gameTemp._randomPlusExtra = true;
                $gameTemp._randomPlusExtraVal = result;
            }
        if ($gameTemp._randomPlusExtraVal && $gameTemp._randomPlusExtraVal > 0) {
            return $gameTemp._randomPlusExtraVal;
        }
        return result;
    };

})();