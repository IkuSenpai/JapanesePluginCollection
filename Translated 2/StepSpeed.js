//
//  足踏み速度変更 ver1.00
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
Imported['StepSpeed'] = 1.00;
/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/StepSpeed.js
 * @plugindesc ver1.00/イベントの足踏み速度を変更します。
 * @author Yana
 * 
 * @help
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * イベントのメモに
 * <足踏み速度:x>
 * または、
 * <StepSpeed:x>
 * と記述すると、足踏み速度を1/xに変更します。
 * xには小数が指定でき、1以下に設定すると、足踏み速度が速くなります。
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

    var parameters = PluginManager.parameters('StepSpeed');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GCBase_animationWait = Game_CharacterBase.prototype.animationWait;
    Game_CharacterBase.prototype.animationWait = function() {
        return __GCBase_animationWait.call(this) * this.stepSpeed();
    };

    Game_CharacterBase.prototype.stepSpeed = function() {
        return 1.0;
    }

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Event.prototype.stepSpeed = function() {
        var speed = 1.0;
        if (this.event().meta['足踏み速度']) { speed = Number(this.event().meta['足踏み速度']) }
        if (this.event().meta['StepSpeed']) { speed = Number(this.event().meta['StepSpeed']) }
        return speed;
    };
}());