//=============================================================================
// 行動失敗時にスキル変更
// RIT_ActionFailedSkill.js
//=============================================================================

/*:
 * @target MZ MV
 * @plugindesc 行動失敗時にスキル変更　(Ver 1.0.2)
 * @author ライト
 * 
 *
 * @param FailedSkillId
 * @text スキル行動失敗時のスキルId
 * @desc スキルの行動に失敗したときに置き換わるスキルIdです。
 * @type skill
 * @default 3
 * 
 * @param FailedItemId
 * @text アイテム行動失敗時のスキルId
 * @desc アイテムの行動に失敗したときに置き換わるスキルIdです。
 * @type skill
 * @default 4
 * 
 * @param FailedNameVariable
 * @text 失敗した行動の名前を保存する変数
 * @desc 失敗した行動の名前を変数に保存します。
 * 失敗スキルのメッセージに使うことを想定しています。
 * @type variable
 * @default 1
 * 
 * @help
 * 
 * ■概要
 * デフォルトの仕様では、MP不足や封印ステート等でスキルが使えない場合でも
 * 何もメッセージが出ないためプレイヤーに分かりにくくなっています。
 * このプラグインを導入すると、行動失敗時に失敗用の別のスキルを使います。
 * 失敗メッセージを表示してプレイヤーに伝わりやすくできます。
 *
 * ■使い方
 * まず、失敗用のスキルを作成してください。
 * 
 * 失敗用スキルの発動メッセージに失敗時のテキストを入力します。
 * このとき、制御文字\V[1]等を使って
 * プラグインパラメータで指定した変数を参照して
 * 失敗したスキル・アイテム名を表示できます。
 * 
 * 範囲を「使用者」にしたとき、「効果が無かった！」等のメッセージを
 * 表示したくない場合は空白ステートを付与するなどして対処してください。
 * 
 * その後、プラグインパラメータに失敗用のスキルIDを指定すれば完了です。
 * また、スキル・アイテムのメモ欄に<FailedId:5>と記述すると、
 * 失敗スキルをID5に変更できます。
 * 
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
    'use strict';

    const pluginName = 'RIT_ActionFailedSkill';
    const parameters = PluginManager.parameters(pluginName);
    const FailedSkillId = Number(parameters['FailedSkillId'] || 3);
    const FailedItemId = Number(parameters['FailedItemId'] || 4);
    const FailedNameVariable = Number(parameters['FailedNameVariable'] || 1);

    //追加定義(行動失敗の判定)
    const _BattleManager_processTurn = BattleManager.processTurn;
    BattleManager.processTurn = function () {
        const subject = this._subject;
        const action = subject.currentAction();
        if (action && !action.isValid() && !subject.isConfused()) {
            this.actionFailed(subject, action);
        }
        _BattleManager_processTurn.apply(this, arguments);
    };

    //新規定義(行動失敗時に行動を置き換える)
    BattleManager.actionFailed = function (subject, action) {
        if (action) {
            const item = action._item.object();
            if (item) {
                const failedAction = new Game_Action(subject);
                if (item.meta.FailedId) {
                    failedAction.setSkill(Number(item.meta.FailedId));
                } else if (action._item.isSkill()) {
                    failedAction.setSkill(FailedSkillId);
                } else if (action._item.isItem()) {
                    failedAction.setSkill(FailedItemId);
                } else {
                    return;
                }
                $gameVariables.setValue(FailedNameVariable, item.name);
                subject.setAction(0, failedAction);
            }
        }
    };

})();
