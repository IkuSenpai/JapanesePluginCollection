//
//  自動戦闘除外スキル ver1.01
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
Imported['AutomaticCombatExclusionSkill'] = 1.01;
/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Battle/AutomaticCombatExclusionSkill.js
 * @plugindesc ver1.01/自動戦闘で選択されないスキルを設定できるようにします。
 * @author Yana
 * 
 * @help
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * 自動戦闘で選択してほしくないスキルのメモ欄に
 * <自動戦闘時除外>
 * または
 * <AutomaticCombatExclusion>
 * と記述すると、そのスキルは自動戦闘時に評価が0になります。
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
 * ver1.01:
 * エラーが発生していたのを修正。
 * ver1.00:
 * 公開
 */
(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('AutomaticCombatExclusionSkill');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GAction_evaluate = Game_Action.prototype.evaluate;
    Game_Action.prototype.evaluate = function() {
        if (this.isExclusionSkill()) { return 0 }
        return __GAction_evaluate.call(this);
    }

    Game_Action.prototype.isExclusionSkill = function() {
        return this.item() && !!this.item().note.match(/<(?:自動戦闘時除外|AutomaticCombatExclusion)>/);
    };

    ////////////////////////////////////////////////////////////////////////////////////

}());