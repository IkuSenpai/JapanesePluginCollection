//
//  アイテムにスキルタイプ付与 ver1.00
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
Imported['ItemSkillType'] = 1.00;
/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/ItemSkillType.js
 * @plugindesc ver1.00/アイテムにスキルタイプを関連付けることで、アイテムコマンドの封印などを可能にします。
 * @author Yana
 * 
 * @param ItemSkillType
 * @text アイテムのスキルタイプID
 * @desc アイテムのスキルタイプとして設定するIDです。
 * @type number
 * @default 4
 * 
 * @help
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * プラグインパラメータを設定すれば、動作します。
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

    var parameters = PluginManager.parameters('ItemSkillType');
    var itemSkillType = Number(parameters['ItemSkillType']);

    ////////////////////////////////////////////////////////////////////////////////////

    // 再定義
    Window_ActorCommand.prototype.addItemCommand = function() {
        this.addCommand(TextManager.item, 'item', !this._actor.isSkillTypeSealed(itemSkillType));
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());