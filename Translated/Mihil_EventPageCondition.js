//=============================================================================
// Mihil_EventPageCondition.js
//=============================================================================
// Copyright (c) 2018- Mihiraghi
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc イベントページの出現条件をスクリプトで制御します
 * @author Mihiraghi
 * @Thanks elleonard => findPageCondition()
 * @target MZ
 * 
 * @help 注釈コマンドを作り、1行目にpage_condition
 * 2行目以降にイベントページの出現条件をスクリプトで書きます。
 * 
 * 例えば
 * 
 * 注釈: page_condition
 *     : $gameVariables.value(1) <= $gameVariables.value(2) &&
 *     : $gameParty.gold() >= 1000
 * 
 * なら変数1番が変数2番以下 かつ 所持金が1000以上ならイベント出現。
 * となります。
 * スイッチ、セルフスイッチなど、通常の出現条件との併用も可能です。
 * 
 * 
 * 類似プラグインとしては
 * HIME_CustomPageConditions.js
 * SAN_ExtendedEventPage.js
 * などがあります。
 * 
 * イベントコマンドの条件分岐を使いたい場合は
 * HIME_CustomPageConditions.jsを
 * イベントページの条件を満たした時に特殊な処理を行いたい場合は
 * SAN_ExtendedEventPage.jsを
 * それぞれ使い分けるとよさそうです。
 * 
 * Ver1.1.0 MZでも動くはず
 * Ver1.0.0 配布
 * 
 */


(function() {
    'use strict';

const _Game_Event_meetsConditions = Game_Event.prototype.meetsConditions
Game_Event.prototype.meetsConditions = function(page) {
    return !_Game_Event_meetsConditions.call(this, page) ? false :
            this.matchConditionNote(page);
}

Game_Event.prototype.matchConditionNote = function(page){
        const findPageCondition = (list) => {
            const firstIndex = list.findIndex(command => command.code === 108 && 
                  command.parameters[0].match(/page_condition/gi))+1;
            if (firstIndex === 0) {
                return "";
            }
            const lastIndex = list.slice(firstIndex).findIndex(command => command.code !== 408);
            return list.slice(firstIndex, lastIndex).map(command => command.parameters[0]).join("\n");
        };
    const list = page.list;
    const str = findPageCondition(list);

    if(str){
        try {
            return eval(str);
        } catch (error) {
            console.error(error, {str:`Could not interpret: ${str}`, page:page, error:error})
        }
    }
    return true// defaultはtrue(すべての条件に外れなかったらtrue。ややこしい)
}

})();

