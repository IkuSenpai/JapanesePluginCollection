/*:
 * @target MZ
 * @plugindesc 戦闘中にいらない技を非表示にしたりしなかったりするプラグイン
 * @author さすらいのトム
 * 
 * @help
 * 戦闘中の技の表示非表示を設定するための設定画面を追加します。
 * ただし表示非表示の判定はスキルID単位で行われます。
 * 例えばAというキャラのスキル「ファイア」を非表示にした場合、
 * 他のキャラの「ファイア」も非表示になります。
 * 
 * 戦闘中の技の表示非表示を設定する画面呼び出しのためのスクリプト
 * SceneManager.push(Scene_HideSkill);
 * 
 * 利用規約
 * クレジットの表記等は特に必要ありません
 * 二次配布や無断転載等、商用や18禁利用制限等につきましても特に規制は設けません
 * 
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */

//-----------------------------------------------------------------------------
// Window_HideSkillList
//
// Window_SkillListのそっくりさんを定義

function Window_HideSkillList() {
    this.initialize(...arguments);
}

Window_HideSkillList.prototype = Object.create(Window_SkillList.prototype);
Window_HideSkillList.prototype.constructor = Window_HideSkillList;

// Window_HideSkillList.prototype.initialize = function(rect) {
//     Window_Selectable.prototype.initialize.call(rect);
//     this._actor = null;
//     this._stypeId = 0;
//     this._data = [];
// };

//技のアクティブ非アクティブ切替　今回の場合全部trueでおｋ
Window_HideSkillList.prototype.isEnabled = function(item) {
    //return this._actor && this._actor.canUse(item);
    return true;
};

//スキルコストの代わりに表示非表示を描画
Window_HideSkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if ($gameSystem._test == undefined) {
        $gameSystem._test = [];
    }
    if ($gameSystem.getSkillNum(skill.id) == false || $gameSystem.getSkillNum(skill.id) == undefined) {
        this.changeTextColor(ColorManager.tpCostColor());
        this.drawText('表示', x, y, width, 'right');
    } else if ($gameSystem.getSkillNum(skill.id) == true) {
        this.changeTextColor(ColorManager.mpCostColor());
        this.drawText('非表示', x, y, width, 'right');
    }
};

//-----------------------------------------------------------------------------
// Scene_HideSkill
//
// Scene_HideSkillのそっくりさんを定義

function Scene_HideSkill() {
    this.initialize.apply(this, arguments);
}

Scene_HideSkill.prototype = Object.create(Scene_Skill.prototype);
Scene_HideSkill.prototype.constructor = Scene_HideSkill;

Scene_HideSkill.prototype.initialize = function() {
    Scene_ItemBase.prototype.initialize.call(this);
};

//独自で造ったWindow_SkillListを呼びだす
Scene_HideSkill.prototype.createItemWindow = function() {
    let wx = 0;
    let wy = this._statusWindow.y + this._statusWindow.height;
    let ww = Graphics.boxWidth;
    let wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_HideSkillList(new Rectangle(wx, wy, ww, wh));
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this._skillTypeWindow.setSkillWindow(this._itemWindow);
    this.addWindow(this._itemWindow);
};

//技欄で決定キーを押した際の挙動　表示と非表示の切り替え
Scene_HideSkill.prototype.onItemOk = function() {
    if ($gameSystem.getSkillNum(this.item().id) == false || $gameSystem.getSkillNum(this.item().id) == undefined) {
        //表示→非表示
        $gameSystem.setSkillNum(this.item().id,true);
    } else {
        //非表示→表示
        $gameSystem.setSkillNum(this.item().id,false);
    }
    this._itemWindow.activate();
    this._itemWindow.refresh();
};

Game_System.prototype.setSkillNum = function(skillid,value) {
    if(this._test == undefined) {
        this._test = [];
    }
    this._test[skillid] = value;
};

Game_System.prototype.getSkillNum = function(skillid) {
    if(this._test == undefined) {
        this._test = [];
    }
    return this._test[skillid] ;
};

(function(){
    'use strict'; 

    // var Game_Interpreterr_pluginCommand =　Game_Interpreter.prototype.pluginCommand;
    // Game_Interpreter.prototype.pluginCommand = function (command, args) {
    //     Game_Interpreterr_pluginCommand.call(this,command, args);
    //     if (command == 'SCENE_HIDESKILL') {
    //         SceneManager.push(Scene_HideSkill);
    //     }
    // }

    //実際に戦闘画面で表示されるスキル一覧
    const Window_SkillList_includes = Window_BattleSkill.prototype.includes;
    Window_BattleSkill.prototype.includes = function (item) {
        return Window_SkillList_includes.apply(this, arguments) && !$gameSystem.getSkillNum(item.id);
    }

    const _Game_System_initialize      = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.apply(this, arguments);
        this._test = [];
    };

}());