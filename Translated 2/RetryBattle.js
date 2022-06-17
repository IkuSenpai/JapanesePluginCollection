//=============================================================================
// RetryBattle.js
// ----------------------------------------------------------------------------
// (C)2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.4.0 2021/12/26 リトライコストに任意の変数、アイテムを設定できる機能を追加
// 1.3.0 2021/12/16 リトライにコスト（お金）を設定できる機能を追加
//                  戦闘中に戦闘背景を変更したとにリトライすると変更後の背景で再戦してしまう不具合を修正
//                  マップイベントからゲームオーバーになったときもリトライコマンドが表示される場合がある不具合を修正
// 1.2.0 2021/07/20 MZで動作するよう全面的に修正
// 1.1.3 2020/09/10 強制リトライで戦闘開始に戻ったとき、HPなどの状態が復元されない問題を修正
//                  ReviceBattleItemNumber.jsと併用したとき、リトライ後にアイテム画面を開くとエラーになる競合を修正
// 1.1.2 2018/12/25 リトライを経て勝った、もしくは逃げた場合、それぞれの分岐を正常に通らない場合がある問題を修正
// 1.1.1 2017/03/20 本体v1.3.4以降で、リトライ後のメニュー画面でコモンイベントアイテムが実行できていた問題を修正
// 1.1.0 2016/07/26 リトライ後のメニュー画面でコモンイベントを実行するアイテム・スキルを実行すると正常に動作しない問題を修正
//                  リトライ後のメニュー画面でゲーム終了を選択できないように修正
//                  リトライ回数をカウントして、スクリプトから取得できる機能を追加
// 1.0.0 2016/07/26 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 戦闘リトライプラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/RetryBattle.js
 * @author トリアコンタン
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 *
 * @param RetryNormalEnemy
 * @text 雑魚敵でリトライ可能
 * @desc 雑魚敵でゲームオーバーになったあとにリトライできます。
 * @default true
 * @type boolean
 *
 * @param RetryBossEnemy
 * @text ボス敵でリトライ可能
 * @desc ボス敵でゲームオーバーになったあとにリトライできます。
 * @default true
 * @type boolean
 *
 * @param CommandRetry
 * @text コマンドリトライ
 * @desc ゲームオーバー画面で表示する「リトライする」ためのコマンド文字列です。
 * @default リトライ
 *
 * @param CommandLoad
 * @text コマンドロード
 * @desc ゲームオーバー画面で表示する「ロード画面に移行する」ためのコマンド文字列です。
 * @default ロード
 *
 * @param CommandTitle
 * @text コマンドタイトル
 * @desc ゲームオーバー画面で表示する「タイトル画面に移行する」ためのコマンド文字列です。
 * @default タイトルへ
 *
 * @param WindowY
 * @text ウィンドウY座標
 * @desc リトライウィンドウの表示Y座標です。
 * @default 448
 * @type number
 *
 * @param ShowMenu
 * @text メニュー画面を表示
 * @desc リトライ選択後、戦闘開始前にメニュー画面を表示します。
 * @default true
 * @type boolean
 *
 * @param Message
 * @text メッセージ
 * @desc ウィンドウの上部にメッセージを表示します。
 * @default \i[1]\c[2]あなたは死にました\c[0]\i[1]
 *
 * @param MessageY
 * @text メッセージY座標
 * @desc メッセージの表示Y座標です。
 * @default 360
 * @type number
 *
 * @param FontSize
 * @text フォントサイズ
 * @desc メッセージのフォントサイズです。
 * @default 32
 * @type number
 *
 * @param DisableSwitch
 * @text リトライ禁止スイッチ
 * @desc 指定したスイッチがONのときリトライが禁止されます。
 * @default 0
 * @type switch
 *
 * @param RetryCostGold
 * @text リトライコスト(お金)
 * @desc リトライする際に必要になるお金です。足りないとリトライできません。
 * @default 0
 * @type number
 *
 * @param RetryCostVariable
 * @text リトライコスト(変数)
 * @desc リトライする際に必要になる変数の番号です。
 * @default 0
 * @type variable
 *
 * @param RetryCostValue
 * @text リトライコスト(変数の値)
 * @desc リトライする際に必要になる変数の値です。足りないとリトライできません。
 * @default 0
 * @type number
 * @parent RetryCostVariable
 *
 * @param RetryCostItem
 * @text リトライコスト(アイテム)
 * @desc リトライする際に必要になるアイテムです。ひとつも所持していないとリトライできません。
 * @default 0
 * @type item
 *
 * @param CostItemVariable
 * @text コストアイテム所持変数
 * @desc リトライコストアイテムの所持数が格納される変数です。メッセージに所持数を出力する場合などに使います。
 * @default 0
 * @type variable
 * @parent RetryCostItem
 *
 * @command FORCE_RETRY
 * @text 強制リトライ
 * @desc 全滅していなくても強制的にリトライを発生させます。
 *
 * @help RetryBattle.js
 *
 * 戦闘でゲームオーバーになった後ゲームオーバー画面でリトライ可能になります。
 * 雑魚敵とボス敵とでリトライ可能かどうかを分けることができます。
 * リトライを選択すると一度だけメニュー画面を開いた後で、再戦できます。
 * メニュー画面ではセーブ及びコモンイベントを実行する
 * アイテム、スキルの使用ができません。
 *
 * 雑魚敵かボス敵かは以下の通り判定されます。
 *
 * ・雑魚敵
 * ランダムエンカウントか「戦闘の処理」で「ランダムエンカウントと同じ」を選択
 *
 * ・ボス敵
 * 上記以外
 *
 * さらにオマケ機能として、戦闘中に実行すると強制的に戦闘を最初からやり直す
 * プラグインコマンドを提供します。
 *
 * スクリプト詳細
 *  イベントコマンド「変数の操作」から実行
 * $gameSystem.getRetryCount(); # リトライ回数を取得して変数に保持します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(()=> {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    PluginManagerEx.registerCommand(script, 'FORCE_RETRY', args => {
        if ($gameParty.inBattle()) {
            SceneManager.push(Scene_BattleReturn);
        }
    });

    const _Game_Interpreter_command353      = Game_Interpreter.prototype.command353;
    Game_Interpreter.prototype.command353 = function() {
        const result = _Game_Interpreter_command353.apply(this, arguments);
        BattleManager.goToGameover();
        return result;
    };

    const _Game_Interpreter_command301      = Game_Interpreter.prototype.command301;
    Game_Interpreter.prototype.command301 = function(param) {
        const result = _Game_Interpreter_command301.apply(this, arguments);
        if (!$gameParty.inBattle()) {
            BattleManager.setBossBattle(param[0] <= 1);
        }
        return result;
    };

    //=============================================================================
    // Game_Player
    //  雑魚敵の設定処理をします。
    //=============================================================================
    const _Game_Player_executeEncounter      = Game_Player.prototype.executeEncounter;
    Game_Player.prototype.executeEncounter = function() {
        const result = _Game_Player_executeEncounter.apply(this, arguments);
        if (result) {
            BattleManager.setBossBattle(false);
        }
        return result;
    };

    //=============================================================================
    // Game_System
    //  リトライ禁止フラグを管理します。
    //=============================================================================
    const _Game_System_initialize      = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.apply(this, arguments);
        this._retryCount   = 0;
    };

    Game_System.prototype.isRetryDisable = function() {
        return $gameSwitches.value(param.DisableSwitch)
    };

    Game_System.prototype.addRetryCount = function() {
        this._retryCount = this.getRetryCount() + 1;
    };

    Game_System.prototype.getRetryCount = function() {
        return this._retryCount || 0;
    };

    //=============================================================================
    // Game_BattlerBase
    //  リトライ時はコモンイベント使用を含むアイテムを使用禁止にします。
    //=============================================================================
    const _Game_BattlerBase_meetsUsableItemConditions        = Game_BattlerBase.prototype.meetsUsableItemConditions;
    Game_BattlerBase.prototype.meetsUsableItemConditions = function(item) {
        return _Game_BattlerBase_meetsUsableItemConditions.apply(this, arguments) &&
            this.meetsUsableItemConditionsForRetry(item);
    };

    Game_BattlerBase.prototype.meetsUsableItemConditionsForRetry = function(item) {
        return !(SceneManager.isSceneRetry() && this.isCommonEventItemOf(item));
    };

    Game_BattlerBase.prototype.isCommonEventItemOf = function(item) {
        return item.effects.some(function(effect) {
            return effect.code === Game_Action.EFFECT_COMMON_EVENT;
        });
    };

    //=============================================================================
    // Game_Actor
    //  リトライ時はコモンイベント使用を含むアイテムを使用禁止にします。
    //=============================================================================
    const _Game_Actor_meetsUsableItemConditions = Game_Actor.prototype.meetsUsableItemConditions;
    Game_Actor.prototype.meetsUsableItemConditions = function(item) {
        return _Game_Actor_meetsUsableItemConditions.apply(this, arguments) &&
            this.meetsUsableItemConditionsForRetry(item);
    };

    Game_Temp.prototype.clearCommonEvent = function() {
        this._commonEventQueue = [];
    };

    //=============================================================================
    // Game_Map
    //  リトライ時に再戦前の状態を復帰します。
    //=============================================================================
    Game_Map.prototype.restoreForBattleRetry = function(oldMap) {
        this._battleback1Name = oldMap.battleback1Name();
        this._battleback2Name = oldMap.battleback2Name();
    };

    //=============================================================================
    // BattleManager
    //  リトライ関連処理を追加定義します。
    //=============================================================================
    BattleManager.setupRetry = function() {
        SoundManager.playBattleStart();
        $gameTemp.clearCommonEvent();
        $gameTroop.setup($gameTroop.troop().id);
        $gameSystem.addRetryCount();
        this.payRetryCost();
        // for ReviceBattleItemNumber.js
        if (this.reservedItem === null) {
            this.reservedItem = new Array($dataItems.length);
        }
    };

    BattleManager.payRetryCost = function() {
        if (param.RetryCostGold > 0) {
            $gameParty.gainGold(-param.RetryCostGold);
        }
        if (param.RetryCostVariable > 0) {
            var prevValue = $gameVariables.value(param.RetryCostVariable);
            $gameVariables.setValue(param.RetryCostVariable, prevValue - param.RetryCostValue);
        }
        if (param.RetryCostItem > 0) {
            $gameParty.loseItem($dataItems[param.RetryCostItem], 1, false);
        }
    };

    BattleManager.setBossBattle = function(value) {
        this._bossBattle = !!value;
    };

    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle      = function() {
        DataManager.saveGameForRetry();
        _BattleManager_startBattle.apply(this, arguments);
    };

    const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd      = function() {
        _BattleManager_updateBattleEnd.apply(this, arguments);
        this.goToGameover();
    };

    BattleManager.goToGameover = function() {
        if (SceneManager.isNextScene(Scene_Gameover)) {
            Scene_Gameover.firstShow = true;
            SceneManager.push(Scene_Gameover);
        }
    };

    BattleManager.canRetry = function() {
        return !$gameSystem.isRetryDisable() && this.checkBattleType() && param.CommandRetry && DataManager.hasRetryData();
    };

    BattleManager.checkBattleType = function() {
        return (param.RetryNormalEnemy && !this._bossBattle) || (param.RetryBossEnemy && this._bossBattle);
    };

    //=============================================================================
    // DataManager
    //  リトライ用データのセーブとロードを行います。
    //=============================================================================
    DataManager.saveGameForRetry = function() {
        const json = JsonEx.stringify(this.makeSaveContents());
        if (json.length >= 200000) {
            console.warn('Save data too big!');
        }
        this._retryData = json;
    };

    DataManager.hasRetryData = function() {
        return !!this._retryData;
    };

    DataManager.loadGameForRetry = function() {
        if (this._retryData) {
            // without $gameMap because of 'victory or defeat'
            const prevGameMap = $gameMap;
            this.extractSaveContents(JsonEx.parse(this._retryData));
            prevGameMap.restoreForBattleRetry($gameMap);
            $gameMap = prevGameMap;
        }
    };

    //=============================================================================
    // SceneManager
    //  リトライ中かどうかの判定を行います。
    //=============================================================================
    SceneManager.isSceneRetry = function() {
        return this._stack.some(function(scene) {
            return scene === Scene_Gameover;
        });
    };

    //=============================================================================
    // Window_MenuCommand
    //  リトライ用のメニューでセーブを禁止します。
    //=============================================================================
    const _Window_MenuCommand_isSaveEnabled      = Window_MenuCommand.prototype.isSaveEnabled;
    Window_MenuCommand.prototype.isSaveEnabled = function() {
        return _Window_MenuCommand_isSaveEnabled.apply(this, arguments) && !SceneManager.isSceneRetry();
    };

    const _Window_MenuCommand_isGameEndEnabled      = Window_MenuCommand.prototype.isGameEndEnabled;
    Window_MenuCommand.prototype.isGameEndEnabled = function() {
        return _Window_MenuCommand_isGameEndEnabled.apply(this, arguments) && !SceneManager.isSceneRetry();
    };

    //=============================================================================
    // Scene_Gameover
    //  リトライ用データのセーブとロードを行います。
    //=============================================================================
    Scene_Gameover.firstShow = false;

    const _Scene_Gameover_create      = Scene_Gameover.prototype.create;
    Scene_Gameover.prototype.create = function() {
        _Scene_Gameover_create.apply(this, arguments);
        this.createWindowLayer();
        this.createForeground();
        this.createRetryWindow();
        if (param.RetryCostGold > 0) {
            this.createGoldWindow();
        }
    };

    Scene_Gameover.prototype.createGoldWindow = function() {
        this._goldWindow = new Window_Gold(this.goldWindowRect());
        this._goldWindow.x = Graphics.boxWidth - this._goldWindow.width;
        this.addWindow(this._goldWindow);
    };

    Scene_Gameover.prototype.goldWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = Graphics.boxWidth - ww;
        const wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };

    const _Scene_Gameover_start      = Scene_Gameover.prototype.start;
    Scene_Gameover.prototype.start = function() {
        _Scene_Gameover_start.apply(this, arguments);
        if (!Scene_Gameover.firstShow) {
            if (SceneManager.isPreviousScene(Scene_Menu)) {
                this.executeRetry(1);
            }
            if (SceneManager.isPreviousScene(Scene_Load)) {
                this.startFadeIn(this.fadeSpeed(), false);
            }
        }
        if (param.RetryCostGold > 0) {
            this._goldWindow.open();
        }
        Scene_Gameover.firstShow = false;
    };

    const _Scene_Gameover_stop      = Scene_Gameover.prototype.stop;
    Scene_Gameover.prototype.stop = function() {
        if (!SceneManager.isNextScene(Scene_Load) && !SceneManager.isNextScene(Scene_Menu)) {
            _Scene_Gameover_stop.apply(this, arguments);
        } else {
            Scene_Base.prototype.stop.call(this);
        }
    };

    const _Scene_Gameover_terminate      = Scene_Gameover.prototype.terminate;
    Scene_Gameover.prototype.terminate = function() {
        if (!SceneManager.isNextScene(Scene_Load) && !SceneManager.isNextScene(Scene_Menu)) {
            _Scene_Gameover_terminate.apply(this, arguments);
        } else {
            Scene_Base.prototype.terminate.call(this);
        }
    };

    const _Scene_Gameover_playGameoverMusic      = Scene_Gameover.prototype.playGameoverMusic;
    Scene_Gameover.prototype.playGameoverMusic = function() {
        if (!SceneManager.isPreviousScene(Scene_Load)) {
            _Scene_Gameover_playGameoverMusic.apply(this, arguments);
        }
    };

    Scene_Gameover.prototype.createRetryWindow = function() {
        this._retryWindow = new Window_RetryCommand(this.rectRetryWindow());
        this._retryWindow.setHandler('retry', this.commandRetry.bind(this));
        this._retryWindow.setHandler('load', this.commandLoad.bind(this));
        this._retryWindow.setHandler('title', this.commandTitle.bind(this));
        if (BattleManager.canRetry()) {
            this.addWindow(this._retryWindow);
        } else {
            this._noRetry = true;
        }
    };

    Scene_Gameover.prototype.rectRetryWindow = function() {
        const w = 180;
        const h = this.calcWindowHeight(BattleManager.canRetry() ? 3 : 2, true);
        const x = (Graphics.boxWidth - w) / 2;
        const y = param.WindowY;
        return new Rectangle(x, y, w, h);
    };

    Scene_Gameover.prototype.createForeground = function() {
        this._messageWindow                   = new Window_Base(new Rectangle());
        this._messageWindow.opacity           = 0;
        this._messageWindow.contents.fontSize = param.FontSize;
        this.addWindow(this._messageWindow);
        if (param.Message) {
            this.drawMessage();
        }
    };

    Scene_Gameover.prototype.drawMessage = function() {
        const padding = this._messageWindow.padding;
        const width   = this._messageWindow.drawTextEx(param.Message, 0, 0) + padding * 2;
        const height  = param.FontSize + 8 + padding * 2;
        const x       = Graphics.boxWidth / 2 - width / 2;
        this._messageWindow.move(x, param.MessageY, width, height);
        this._messageWindow.createContents();
        if (param.CostItemVariable > 0 && param.RetryCostItem > 0) {
            $gameVariables.setValue(param.CostItemVariable, $gameParty.numItems($dataItems[param.RetryCostItem]));
        }
        this._messageWindow.drawTextEx(param.Message, 0, 0);
    };

    Scene_Gameover.prototype.commandRetry = function() {
        DataManager.loadGameForRetry();
        if (param.ShowMenu) {
            SceneManager.push(Scene_Menu);
        } else {
            this._retryWindow.close();
            this.executeRetry(this.fadeSpeed());
        }
    };

    Scene_Gameover.prototype.commandLoad = function() {
        this._retryWindow.close();
        SceneManager.push(Scene_Load);
    };

    Scene_Gameover.prototype.commandTitle = function() {
        this._retryWindow.close();
        this.gotoTitle();
    };

    Scene_Gameover.prototype.executeRetry = function(fade) {
        BattleManager.setupRetry();
        this.popScene();
        this.startFadeOut(fade, true);
    };

    const _Scene_Gameover_update = Scene_Gameover.prototype.update;
    Scene_Gameover.prototype.update = function() {
        if (this._noRetry) {
            _Scene_Gameover_update.apply(this, arguments);
            return;
        }
        if (!this.isBusy()) {
            this._retryWindow.open();
        }
        Scene_Base.prototype.update.call(this);
    };

    Scene_Gameover.prototype.isBusy = function() {
        return this._retryWindow.isClosing() || Scene_Base.prototype.isBusy.call(this);
    };

    //=============================================================================
    // Scene_Base
    //  リトライ状態からの再ゲームオーバーを禁止します。
    //=============================================================================
    const _Scene_Base_checkGameover      = Scene_Base.prototype.checkGameover;
    Scene_Base.prototype.checkGameover = function() {
        return !SceneManager.isSceneRetry() && _Scene_Base_checkGameover.apply(this, arguments);
    };

    //=============================================================================
    // Scene_Load
    //  ロード時にゲームオーバーMEを止めます。
    //=============================================================================
    const _Scene_Load_onLoadSuccess      = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function() {
        if (SceneManager.isSceneRetry()) {
            AudioManager.stopAll();
        }
        _Scene_Load_onLoadSuccess.apply(this, arguments);
    };

    //=============================================================================
    // Scene_BattleReturn
    //  そのまま戦闘画面に戻ります。
    //=============================================================================
    function Scene_BattleReturn() {
        this.initialize.apply(this, arguments);
    }

    Scene_BattleReturn.prototype             = Object.create(Scene_Gameover.prototype);
    Scene_BattleReturn.prototype.constructor = Scene_BattleReturn;

    Scene_BattleReturn.prototype.create = function() {
    };

    Scene_BattleReturn.prototype.start = function() {
        DataManager.loadGameForRetry();
        this.executeRetry(this.fadeSpeed());
        Scene_Base.prototype.start.call(this);
    };

    Scene_BattleReturn.prototype.isBusy = function() {
        return Scene_Base.prototype.isBusy.call(this);
    };

    //=============================================================================
    // Window_RetryCommand
    //  リトライ用コマンドウィンドウです。
    //=============================================================================
    function Window_RetryCommand() {
        this.initialize.apply(this, arguments);
    }

    Window_RetryCommand.prototype             = Object.create(Window_Command.prototype);
    Window_RetryCommand.prototype.constructor = Window_RetryCommand;

    Window_RetryCommand.prototype.initialize = function(rectangle) {
        Window_Command.prototype.initialize.apply(this, arguments);
        this.openness = 0;
    };

    Window_RetryCommand.prototype.makeCommandList = function() {
        if (BattleManager.canRetry()) {
            this.addCommand(param.CommandRetry, 'retry', this.canPayRetryCost());
        }
        if (param.CommandLoad) {
            this.addCommand(param.CommandLoad, 'load');
        }
        this.addCommand(param.CommandTitle, 'title');
    };

    Window_RetryCommand.prototype.canPayRetryCost = function() {
        if (param.RetryCostGold > 0 && $gameParty.gold() < param.RetryCostGold) {
            return false;
        }
        if (param.RetryCostVariable > 0 && $gameVariables.value(param.RetryCostVariable) < param.RetryCostValue) {
            return false;
        }
        if (param.RetryCostItem > 0 && !$gameParty.hasItem($dataItems[param.RetryCostItem])) {
            return false;
        }
        return true;
    };
})();

