//=============================================================================
// YKP_ActorCommandCustom.js
//
// Copyright (c) 2022 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_ActorCommandCustom = true;

var YukiKP = YukiKP || {};
YukiKP.ActorCommandCustom = YukiKP.ActorCommandCustom || {};

/*:
 * @plugindesc 戦闘中の各アクターコマンドを制御するプラグイン。
 * @target MZ
 * @author YukiKamijo
 * 
 * @command DisabledCommand
 * @text コマンドを選択不可にする
 * @desc 次の戦闘中、指定したコマンドを選択不可にする。
 *
 * @arg actorId
 * @text アクターID
 * @desc 制御するアクターのIDを指定する。
 *
 * @arg commandType
 * @text コマンド
 * @desc 制御するコマンドを指定する。
 * @type select
 * @default skill
 * @option 攻撃
 * @value attack
 * @option スキル
 * @value skill
 * @option 防御
 * @value guard
 * @option アイテム
 * @value item
 *
 * @arg skillTypeId
 * @text スキルタイプID
 * @desc 制御するスキルタイプのIDを指定する。
 *
 * @help
 * 戦闘中の各アクターコマンドを制御するプラグインです。
 * 
 * 戦闘時にアクターがスキルタイプを持っていても
 * 該当するスキルをひとつも取得していない場合に
 * 自動的にコマンドをグレーアウト、選択不可能とする。
 * 
 * また、プラグインコマンドで以下のものを指定することで
 * 直後の戦闘における該当コマンドを選択不可能とする。
 * 
 * ・アクターID ... コマンドを制限したいアクターIDを指定する
 * ・コマンドタイプ ... 「攻撃」「スキル」「防御」「アイテム」のコマンド種類を指定する
 * ・スキルタイプID ... コマンドタイプが「スキル」の場合、スキルタイプIDを指定する
 * 
 * プラグインコマンドで制限されたコマンドは、戦闘終了時に自動的に制限解除される。
 * これによって、イベント戦による一時的なコマンドの選択不可が出来る。
 *
 * plugin version 1.0.0
 */

(() => {
    'use strict';
    const pluginName = 'YKP_ActorCommandCustom';

    // 非活性リスト : 一時的リストのため、ゲーム起動時に初期化する
    let DisabledList = [];

    PluginManager.registerCommand(pluginName, 'DisabledCommand', args => {
        // コマンド表示を選択不可にする
        const actorId = Number(args.actorId) || 0;
        const commandType = args.commandType || "skill";
        const skillTypeId = Number(args.skillTypeId) || 0;

        // 非活性リストの追加
        DisabledList.push({ actorId: actorId, command: commandType, skillTypeId: skillTypeId })
    });

    YukiKP.ActorCommandCustom.BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        // 非活性リストの初期化
        DisabledList = [];

        YukiKP.ActorCommandCustom.BattleManager_endBattle.call(this, result);
    };

    Window_ActorCommand.prototype.addAttackCommand = function() {
        const data = DisabledList.find(({actorId, command}) => actorId === this._actor.actorId() && command === "attack");
        const canAttack = !data;
        this.addCommand(TextManager.attack, "attack", this._actor.canAttack() && canAttack);
    };

    Window_ActorCommand.prototype.addSkillCommands = function() {
        const skillTypes = this._actor.skillTypes();
        for (const stypeId of skillTypes) {
            const data = DisabledList.find(({actorId, command, skillTypeId}) => actorId === this._actor.actorId() && command === "skill" && skillTypeId === stypeId);
            let canSkill = true;
            if (!data && !this._actor.isSkillTypeSealed(stypeId)) {
                // コマンドと同じスキルタイプの取得済みスキルがあるか？
                const actorSkill = this._actor.skills().find(skill => skill.stypeId === stypeId);
                canSkill = actorSkill != null;
            } else {
                canSkill = false;
            }
            const name = $dataSystem.skillTypes[stypeId];
            this.addCommand(name, "skill", canSkill, stypeId);
        }
    };

    Window_ActorCommand.prototype.addGuardCommand = function() {
        const data = DisabledList.find(({actorId, command}) => actorId === this._actor.actorId() && command === "guard");
        const canGuard = !data;
        this.addCommand(TextManager.guard, "guard", this._actor.canGuard() && canGuard);
    };

    Window_ActorCommand.prototype.addItemCommand = function() {
        const data = DisabledList.find(({actorId, command}) => actorId === this._actor.actorId() && command === "item");
        const canItem = !data;
        this.addCommand(TextManager.item, "item", canItem);
    };

    // TPBシステムの場合、アクターコマンドを常に更新するようにする
    YukiKP.ActorCommandCustom.SceneBattle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        if (BattleManager.isTpb() || BattleManager.isActiveTpb()) {
            this._actorCommandWindow.refresh();
        }
        YukiKP.ActorCommandCustom.SceneBattle_update.call(this);
    };
})();