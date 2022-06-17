//
//  マジックスクロール ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['MagicScroll'] = 1.00;
/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/MagicScroll.js
 * @plugindesc ver1.00/所持しているだけでスキルが使用可能になるアイテム、スクロールを製作できるようにします。
 * @author Yana
 * 
 * @help ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * アイテムのメモ欄に
 * <スクロール:x>
 * または、
 * <Scroll:x>
 * と記述すると、IDx番のスキルを使用可能になるスクロールとして機能します。
 * 
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、
 * または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('MagicScroll');

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.isScroll = function(item) {
        if (!item) { return false }
        return !!item.meta['スクロール'] || !!item.meta['Scroll'];
    };

    DataManager.scrollSkills = function(item) {
        if (!item) { return [] }
        if (item._scrollSkills === undefined) {
            item._scrollSkills = [];
            var texts = item.note.split('\n');
            for (var i = 0, max = texts.length; i < max; i++) {
                var text = texts[i];
                if (text.match(/<(?:スクロール|Scroll):(\d+)>/)) {
                    item._scrollSkills.push(Number(RegExp.$1));
                }
            }
        }
        return item._scrollSkills;
    };

    var __DManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId) {
        var result = __DManager_loadGame.call(this, savefileId);
        if (result) { $gameParty.refreshScroll() }
        return result;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __GActor_addedSkills = Game_Actor.prototype.addedSkills;
    Game_Actor.prototype.addedSkills = function() {
        var result = __GActor_addedSkills.call(this);
        return result.concat($gameParty.choiceScrolls());
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.chItems = function() {
        if (this._chItems === undefined) { this.refreshScroll() }
        return this._chItems;
    };

    Game_Party.prototype.choiceScrolls = function() {
        return this.chItems();
    };

    var __GParty_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
        __GParty_gainItem.call(this, item, amount, includeEquip);
        if (item && DataManager.isScroll(item)) { this.refreshScroll() }
    };

    Game_Party.prototype.refreshScroll = function() {
        var scrolls = this.allItems().filter(function(item) {
            return DataManager.isScroll(item);
        });
        this._chItems = scrolls.reduce(function(r, s) {
            return r.concat(DataManager.scrollSkills(s));
        }, []);
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());