/*:
 * @target MZ
 * @plugindesc 戦闘メッセージ拡張プラグイン
 * @author さすらいのトム
 *
 * @help
 * 戦闘メッセージを従来の2行から更に10行まで追加することが
 * 出来るようになるプラグインです。
 * スキルのメモ欄に
 * <ExtendBattleMessage1:3行目に表示されるメッセージ>
 * <ExtendBattleMessage2:4行目に表示されるメッセージ>
 * 
 * …みたいな感じで記入していってください。
 * また、userという文字が使用者の名前に
 * skillNameという文字がスキル名に自動で置換されます。
 * 
 * <ExtendBattleMessage1:userはskillNameを放った！>
 * 
 * …みたいな感じのノリでお使いいただけます。
 * 
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 *
 */
(function() {
    'use strict';

    const Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function(subject, item) {
        Window_BattleLog_displayAction.call(this, subject, item);    
        if (!item || !subject) {
            return;
        }
        let BattleMsg;
        for (let i = 1; i < 9; i++) {
            let metaTag = 'ExtendBattleMessage' + i;
            if (item.meta[metaTag]) {
                BattleMsg = item.meta[metaTag];
                let a = BattleMsg.replace('user',subject.name());
                let b = a.replace('skillName',item.name);
                this.push('addText',b);
            }
        }

    };

})();