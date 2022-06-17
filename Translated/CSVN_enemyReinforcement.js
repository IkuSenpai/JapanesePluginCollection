/*=============================================================================
 CSVN_enemyReinforcement.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/28 初版
 1.0.1 2021/07/30 画面の横幅が816とハードコーディングされていた問題を修正
 1.0.2 2021/08/07 変数とスイッチの指定方法を変更
 1.0.3 2021/08/10 BattleManager.getGaps の bugfix
 1.0.4 2021/08/13 BattleManager.determineXYOfAddedEnemy の bugfix
 1.1.0 2021/10/12 バトラー画像名と敵キャラ名が同じ前提であったのを修正
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Enemy calling reinforcement
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/nb22a144083fd
 *
 * @help CSVN_enemyReinforcement.js
 *
 * Implement the enemy action that calls the set enemy as a
 * reinforcement by writing a meta tag in the memo field.
 * If you write <Summon: a, b, c ...> (a, b, c are enemy character IDs)
 * in the memo field of the enemy character, the enemy character to be
 * called will be randomly selected from them.
 *
 * Create a common event that turns on the switchId of the plugin
 * setting value, and put it in the action of the enemy character
 * who calls the reinforcement.
 *
 * This plug-in is intended for use in front view.
 * Someone please make one for thw side view.
 *
 * Known bugs:
 * The processing of the next battler's action may be interrupted before
 * the execution timing of the processing of summoning, in which case
 * reinforcement will be delayed.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param successed
 * @text successed
 * @type text
 * @default %1 summoned newly!
 * @desc message for success.
 *
 * @param failed
 * @text failed
 * @type text
 * @default but no one has come!
 * @desc message for failure.
 *
 * @param enemyId
 * @text temporary var ID
 * @desc var ID to store enemyID temporarily.
 * @type variable
 *
 * @param switchId
 * @text switch ID
 * @desc ID of the switch to be turned on at the Summoning common event.
 * @type switch
 */

/*:ja
 * @target MZ
 * @plugindesc 仲間を呼ぶ敵
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/nb22a144083fd
 *
 * @help CSVN_enemyReinforcement.js
 *
 * メモ欄にメタタグを書いて設定した敵を増援で呼ぶ敵行動を実装します。
 * 敵キャラのメモ欄に<Summon:a,b,c...>(a,b,cは敵キャラID)と記載すると、
 * 呼ばれる敵キャラがその中からランダムで選択されます。
 *
 * 設定値のswitchIdをONにするコモンイベントを作成し、増援を呼ぶ側の
 * 敵キャラの行動にそれを入れてください。
 *
 * なお、本プラグインはフロントビューでの利用を想定しています。
 * サイドビュー用はだれかつくってください。
 *
 * 既知の不具合：
 *  なかまよびの処理の実行タイミングよりも先に次のバトラーの行動の
 *  処理が割り込んでしまうことがあり、その場合はひといき遅れて
 *  増援がきます。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param successed
 * @text 成功時
 * @type text
 * @default %1が あらたにあらわれた！
 * @desc なかまよびが成功したときのメッセージ。
 *
 * @param failed
 * @text 失敗時
 * @type text
 * @default しかし だれもこなかった！
 * @desc なかまよびが失敗したときのメッセージ。
 *
 * @param enemyId
 * @text 敵ID格納先
 * @desc 呼ばれる敵キャラIDを一時的に書き込む変数のID
 * @type variable
 *
 * @param switchId
 * @text 処理開始判別スイッチID
 * @desc なかまよびコモンイベントでONにするスイッチID
 * @type switch
 */
(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const minGap = 24;
    const successed = params.successed;
    const failed = params.failed;
    let isFailed = false;
    let yBottom = 0;
    const eidVarId = params.enemyId;
    const switchId = params.switchId;

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        if ($gameSwitches.value(switchId)) {
            yBottom = Graphics.boxHeight - this.windowAreaHeight() + 20;

            const battler = this.addEnemy();

            if (battler) {
                BattleManager.onCallHelpSuccessed(battler);
            } else {
                if (isFailed) {
                    BattleManager.onCallHelpFailed();
                }
            }
        }

        _Scene_Battle_update.call(this);
    };

    Scene_Battle.prototype.addEnemy = function() {
        const battler = BattleManager.callHelp();
        if (!battler) {
            return null;
        }

        this._spriteset.addEnemy(battler);

        return battler;
    };

    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        _BattleManager_startAction.apply(this);
        if (this._subject) {
            $gameVariables.setValue(eidVarId, this._subject._enemyId);
        }
    };

    BattleManager.callHelp = function() {
        if (!$gameVariables.value(eidVarId) || $gameVariables.value(eidVarId) == 0) {
            return null;
        }
        const enemy = $dataEnemies[$gameVariables.value(eidVarId)];
        const enemyId = this.determineEnemyId(enemy);
        const xy = this.determineXYOfAddedEnemy(enemyId);
        if (xy == null) {
            isFailed = true;
            return null;
        }

        let battler = null;
        battler = $gameTroop.add(enemyId, xy.x, xy.y);

        return battler;
    };

    BattleManager.determineEnemyId = function(enemy) {
        if (!enemy) {
            return null;
        }

        if (!enemy.meta.Summon) {
            return null;
        }
        const pool = JsonEx.parse(`[${enemy.meta.Summon}]`);
        return Number(pool[Math.randomInt(pool.length)]);
    };

    BattleManager.determineXYOfAddedEnemy = function(enemyId) {
        const addingEnemy = $dataEnemies[enemyId];
        if (addingEnemy == null) {
            return null;
        }

        const addingWidth = this.enemyWidth(addingEnemy);
        const troop = this.sortTroop($gameTroop.aliveMembers());
        const gaps = this.getGaps(troop);

        let result = null;
        let prevRight = 0;
        let enemy = null;
        for (let i = 0; i < gaps.length; i++) {
            if (gaps[i] > addingWidth + minGap * 2) {
                if (i > 0) {
                    enemy = $dataEnemies[troop[i - 1].enemyId()];
                    prevRight = troop[i - 1].screenX() + this.enemyWidth(enemy) / 2;
                }
                const x = prevRight + minGap + addingWidth / 2;
                const y = yBottom;

                if (x + addingWidth / 2 > Graphics.boxWidth) {
                    return null;
                }

                result = {
                    x: x,
                    y: y
                };
            }
            if (result) {
                break;
            }
        }

        return result;
    };

    BattleManager.sortTroop = function(troop) {
        let xs = [];
        let sortedTroop = [];

        for (let i = 0; i < troop.length; i++) {
            xs.push(troop[i].screenX());
            sortedTroop.push(null);
        }

        xs.sort(function(p, q){
            if (p < q) {
                return -1;
            }
            if (p > q) {
                return 1;
            }
            return 0;
        });

        for(let i = 0; i < xs.length; i++) {
            for (let j = 0; j < troop.length; j++) {
                if (xs[i] == troop[j].screenX()) {
                    sortedTroop[i] = troop[j];
                }
            }
        }

        return sortedTroop;
    };

    BattleManager.getGaps = function(troop) {
        let prevRight = 0;
        let currLeft = 0;
        let gaps = [];
        let enemy = null;
        for (let i = 0; i < troop.length; i++) {
            if (i == 0) {
                prevRight = 0;
            } else {
                enemy = $dataEnemies[troop[i - 1].enemyId()];
                prevRight = troop[i - 1].screenX() + this.enemyWidth(enemy) / 2;
            }
            enemy = $dataEnemies[troop[i].enemyId()];
            currLeft = troop[i].screenX() - this.enemyWidth(enemy) / 2;
            gaps.push(currLeft - prevRight);
        }
        const rightEndGameEnemy = troop[troop.length - 1];
        const rightEndEnemy = $dataEnemies[rightEndGameEnemy.enemyId()];
        gaps.push(Graphics.boxWidth - rightEndGameEnemy.screenX() + this.enemyWidth(rightEndEnemy) / 2);

        return gaps;
    };

    BattleManager.enemyWidth = function(enemy) {
        if (!enemy) {
            return 0;
        }

        return ImageManager.loadEnemy(enemy.meta.battlerImage).width;
    };

    BattleManager.onCallHelpSuccessed = function(enemy) {
        this._logWindow.push('addText', successed.format(enemy.name()));
        this._logWindow.push('wait');
        this._logWindow.push('clear');
        $gameSwitches.setValue(switchId, false);
        $gameVariables.setValue(eidVarId, 0);
    };

    BattleManager.onCallHelpFailed = function() {
        this._logWindow.push('addText', failed);
        this._logWindow.push('wait');
        this._logWindow.push('clear');
        $gameSwitches.setValue(switchId, false);
        $gameVariables.setValue(eidVarId, 0);
        isFailed = false;
    }

    Game_Troop.prototype.add = function(enemyId, x, y) {
        let enemy = null;
        if ($dataEnemies[enemyId]) {
            enemy = new Game_Enemy(enemyId, x, y);
            enemy.onBattleStart(false);
            this._enemies.push(enemy);
            this.makeUniqueNames();
        }

        return enemy;
    };

    Spriteset_Battle.prototype.addEnemy = function(enemy) {
        const sprite = new Sprite_Enemy(enemy);
        this._battleField.addChild(sprite);
        this._enemySprites.push(sprite);
    };
})();