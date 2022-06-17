//=============================================================================
// Keke_VariableActorCommand - 可変アクターコマンド
// バージョン: 1.1.1
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc アクターコマンドを自在に組み替える
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.1.1】
 * アクターコマンドを自在に組み替えることができる
 *
 *
 *
 * ◉ 特徴 ◉
 * ■キャラごとにコマンド自由構成
 * ■コマンド数に応じたウインドウ自動伸縮
 * ■コマンドの動的変更
 *
 *
 *
 * ◉ 使い方 ◉
 * 設定はデータベースのメモ欄で行う
 *
 * ■コマンドを追加(削除)
 * アクター、職業、装備、スキル、アイテム、ステートのメモ欄に
 *
 * <コマンド: (-)(コマンド)(/)(タイプ/ID), (表示順), (表示名), (アイコンID)>
 *
 * ★(-)(コマンド)
 * 追加するコマンド。6種類から選ぶ
 * ◎攻撃
 * 通常攻撃。スキルID 1 のスキル
 * ◎防御
 * 防御。スキルID 2 のスキル
 * ◎スキル
 * スキルコマンド。
 * ◎アイテム
 * アイテムコマンド
 * ◎逃げる
 * 戦闘から逃げる。パーティコマンド版と同じ
 * ◎オート
 * 自動戦闘。パーティ全員が自動で戦う
 * ※頭に - を付けた場合
 * コマンド削除になる
 *
 * ★(/)(スキルタイプ/ID)
 * この部分はスキル/アイテムのときのみ書く。スキルタイプかIDのどちらか
 * ◎スキルタイプ
 * スキルのときのみ
 * スキルタイプ名を書くと、そのスキルタイプがコマンドとして追加される
 * ◎ID
 * スキルIDを書くと、そのスキル個別がコマンドとして追加される
 * アイテムIDならそのアイテム個別
 *
 * ★(表示順)
 * コマンドの表示される順番。数値が小さいほど上に表示される
 *
 * ★(表示名)
 * コマンドの実際に表示される名前。省略可能
 * 省略した場合、コマンド本来の名前がそのまま表示される
 *
 * ★(アイコンID)
 * 表示するアイコンのID。省略可能
 * 省略すると基本的にはアイコンを表示しないが、
 * スキル個別のときのみ、そのスキル本来のアイコンを表示する
 *
 * ※コマンド追加がひとつでもある時点で、デフォのコマンドは無効化される
 *
 * ⚫︎具体例
 * ◎このようなコマンド構成にする場合
 * ブラッドスティア(スキルID162)
 * 魔剣技(スキルタイプ『攻撃特技』, アイコンID 76)
 * 破壊魔法(スキルタイプ『攻撃魔法』, アイコンID 79)
 * 聖魔法(スキルタイプ『回復魔法』, アイコンID 72)
 * ハイガード(防御コマンド)
 * アイテム(アイテムコマンド, アイコンID 165)
 * 逃げる(逃げるコマンド, アイコンID 82)
 * オート(自動コマンド, アイコンID 83)
 *
 * <コマンド:スキル/162,10>
 * <コマンド:スキル/攻撃特技,20,魔剣技,76>
 * <コマンド:スキル/攻撃魔法,30,破壊魔法,79>
 * <コマンド:スキル/回復魔法,40,聖魔法,72>
 * <コマンド:防御,50,ハイガード>
 * <コマンド:アイテム,60, ,165>
 * <コマンド:逃げる,70, ,82>
 * <コマンド:オート,80, ,83>
 *
 * ◎スキルタイプ『攻撃魔法』『回復魔法』をコマンドから消す場合
 * <コマンド:-スキル/攻撃魔法>
 * <コマンド:-スキル/回復魔法>
 *
 * ◎スキル『ファイナルスティア』(スキルID164)をコマンドの一番上に追加する場合
 * <コマンド:スキル/164,1>
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * @param ウインドウ
 *
 * @param ウインドウ自動伸縮
 * @parent ウインドウ
 * @desc ウインドウをコマンド数に応じて自動伸縮させるか
 * @type boolean
 * @default true
 *
 * @param ウインドウ伸縮下端
 * @parent ウインドウ
 * @desc この座標より下には伸びず上に伸びていく
 * @default 616
 *
 * @param ウインドウ不透明度
 * @parent ウインドウ
 * @desc ウインドウの不透明度(0〜255)
 * @default 255
 *
 * @param アイコン
 *
 * @param アイコン表示
 * @parent アイコン
 * @desc アイコンを表示するか
 * @type boolean
 * @default true
 *
 * @param アイコンサイズ
 * @parent アイコン
 * @desc アイコンの大きさ(ピクセル)
 * @default 32
 *
 * @param アイコンX位置
 * @parent アイコン
 * @desc アイコンのX位置(ピクセル)
 * @default -4
 *
 * @param アイコンY位置
 * @parent アイコン
 * @desc アイコンのY位置(ピクセル)
 * @default 0
 *
 * @param アイコン配置
 * @parent アイコン
 * @desc アイコンをウインドウ左に配置するか右に配置するか
 * @type select
 * @option 左
 * @option 右
 * @default 左
 *
 *
 * @param タッチボタン
 *
 * @param キャンセルボタン自動移動
 * @parent タッチボタン
 * @desc 自動的にキャンセルボタンをコマンド上方に移動するか
 * @type boolean
 * @default true
 *
 * @param その他
 *
 * @param パーティコマンド無効
 * @parent その他
 * @desc パーティコマンドを表示しなくする
 * @type boolean
 * @default false
 *
 * @param 用語・自動戦闘
 * @parent その他
 * @desc 自動戦闘の呼び方
 * @default オート
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = "Keke_VariableActorCommand";
    
    
    
    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    const parameters = PluginManager.parameters(pluginName);
    
    //- ウインドウ
    const keke_windowAutoResize = eval(parameters["ウインドウ自動伸縮"]);
    const keke_windowResizeMax = Number(parameters["ウインドウ伸縮下端"]);
    const keke_windowOpacity = Number(parameters["ウインドウ不透明度"]);
    
    //- アイコン
    const keke_iconShow = eval(parameters["アイコン表示"]);
    const keke_iconSize = Number(parameters["アイコンサイズ"]);
    const keke_iconPosX = Number(parameters["アイコンX位置"]);
    const keke_iconPosY = Number(parameters["アイコンY位置"]);
    const keke_iconRel = parameters["アイコン配置"];
    
    //- タッチボタン
    const keke_cancelAutoRepos = eval(parameters["キャンセルボタン自動移動"]);
    
    //- その他
    const keke_noPartyCommand = eval(parameters["パーティコマンド無効"]);
    const keke_autoBattleWord = parameters["用語・自動戦闘"];
    
    
    
    //==================================================
    //--  プラグインコマンド
    //==================================================
    
    PluginManager.registerCommand(pluginName, "set", args => {
        const tester = Number(args.tester);
    });
    
    
    
    //==================================================
    //--  共通開始
    //==================================================
    
    const _Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
    Window_ActorCommand.prototype.initialize = function(rect) {
        _Window_ActorCommand_initialize.call(this, rect);
        // 変数イニット
        this._iconSpritesKe = [];
    };
    
    
    
    //==================================================
    //--  共通更新
    //==================================================
    
    //- シーンバトル
    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.call(this);
        // 自動戦闘の更新
        this.updateAutoBattleKe();
    };
    
    
    //==================================================
    //--  共通処理
    //==================================================
    
    //- コマンドリストの作成
    const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        // 独自コマンドリストの作成
        if (!this.makeCommandListFreeKe()) {
            _Window_ActorCommand_makeCommandList.call(this);
        }
        // 不透明度
        this.opacity = keke_windowOpacity;
        // リサイズ
        this.resizeKe();
        // キャンセルボタンの自動移動
        SceneManager._scene.reposCancelButtonKe(this);
    };
    
    
    
    //==================================================
    //--  アクターコマンド自由構成
    //==================================================
    
    //- 自由コマンドリストの作成
    Window_ActorCommand.prototype.makeCommandListFreeKe = function() {
        if (!this._actor) { return 0; }
        // イニット
        let addData = [];
        let delData = [];
        let match = null;
        // コマンドリストのクリア
        this.clearCommandList();
        // アイコンの消去
        this.deleteIconKe();
        // メモ欄からコマンドノート取得
        const cmdNotes = this._actor.totalAllMetaArrayKeVac(["コマンド", "cmd"]);
        // コマンドデータにセット
        cmdNotes.forEach(note => {
            // イニット
            const data = note.split(",");
            const type = data[0];
            const order = data[1] || 0;
            const name = data[2] || "";
            const iconIndex = data[3] || 0;
            let del = false;
            // シンボル取得
            let symbol = "";
            if (type.includes("攻撃") || type.includes("attack")) { symbol = "attack"; }
            if (type.includes("防御") || type.includes("guard")) { symbol = "guard"; }
            if (type.includes("スキル") ||type.includes("skill")) { symbol = "skill"; }
            if (type.includes("アイテム") || type.includes("item")) { symbol = "item"; }
            if (type.includes("逃げる") || type.includes("escape")) { symbol = "escape"; }
            if (type.includes("オート") || type.includes("auto")) { symbol = "auto"; }
            // シンボルがなければリターン
            if (!symbol) { return }
            // スキルタイプ/スキル個別取得
            let id = 1;
            if (symbol == "skill") {
                const tps = type.split("/");
                if (tps[1]) {
                    // 数字ならスキル個別
                    if (tps[1].match(/\d+/)) {
                        symbol = "skillOne";
                        id = Number(tps[1]);
                    // 単語ならスキルタイプ
                    } else {
                        id = $dataSystem.skillTypes.indexOf(tps[1]) || 1;
                    }
                }
            }
            // アイテム個別取得
            if (symbol == "item") {
                const tps = type.split("/");
                if (tps[1]) {
                    symbol = "itemOne";
                    id = Number(tps[1]);
                }
            }
            // 消去かどうか
            del = type.startsWith("-") ? true : false;
            // 消去セット
            if (del) {
                delData.push({ symbol:symbol, id:id });
            // 追加セット
            } else {
                addData.push({ symbol:symbol, id:id, name:name, order:order, iconIndex:iconIndex });
            }
        }, this);
        // 追加データを順番に応じてソート
        addData.sort((a, b) => a.order - b.order);
        // 消去データの分を消去
        addData = addData.filter(add => {
            const dels = delData.filter(del => del.symbol == add.symbol && del.id == add.id);
            return !dels.length;
        }, this);
        // 重複を削除
        addData = [...new Set(addData)];
        // 追加データからコマンド内容生成
        addData.forEach(data => {
            $gameSystem._acCmdExtKe = data.iconIndex;
            switch (data.symbol) {
                case "attack":
                    this.addCommand(data.name || TextManager.attack, "attack", this._actor.canAttack());
                    break;
                case "guard":
                    this.addCommand(data.name || TextManager.guard, "guard", this._actor.canGuard());
                    break;
                case "skill":
                    this.addCommand(data.name || $dataSystem.skillTypes[data.id], "skill", true, data.id);
                    break;
                case "skillOne":
                    this.addCommand(data.name || $dataSkills[data.id].name, "skillOne", this._actor.canUse($dataSkills[data.id]), data.id);
                    break;
                case "item":
                    this.addCommand(data.name || TextManager.item, "item");
                    break;
                case "itemOne":
                    this.addCommand(data.name || $dataItems[data.id].name, "itemOne", this._actor.canUse($dataItems[data.id]), data.id);
                    break;
                case "escape":
                    this.addCommand(data.name || TextManager.escape, "escape", BattleManager.canEscape());
                    break;
                case "auto":
                    this.addCommand(data.name || keke_autoBattleWord, "auto");
                    break;
            }
            $gameSystem._acCmdExtKe = null;
        }, this);
        return addData.length;
    };
    
    
    //- 独自コマンドExtの追加
    const _Window_ActorCommand_addCommand = Window_ActorCommand.prototype.addCommand;
    Window_ActorCommand.prototype.addCommand = function(name, symbol, enabled = true, ext = null) {
        _Window_ActorCommand_addCommand.call(this, name, symbol, enabled, ext);
        if ($gameSystem._acCmdExtKe) {
            const last = this._list[this._list.length - 1];
            last.extKe = $gameSystem._acCmdExtKe;
        }
    };


    //- 独自コマンドの追加
    const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.call(this);
        const acWindow = this._actorCommandWindow;
        // 個別スキル
        acWindow.setHandler("skillOne", this.commandSkillOneKe.bind(this));
        // 個別アイテム
        acWindow.setHandler("itemOne", this.commandItemOneKe.bind(this));
        // 逃げる
        acWindow.setHandler("escape", this.commandEscape.bind(this));
        // 自動戦闘
        acWindow.setHandler("auto", this.commandAutoBattleKe.bind(this));
    };
    
    
    //- コマンド・個別スキル
    Scene_Battle.prototype.commandSkillOneKe = function() {
        const action = BattleManager.inputtingAction();
        if (!action || !action._item) { return; };
        const skillId = this._actorCommandWindow.currentExt();
        action.setSkill(skillId);
        this.onSelectAction();
    };
    
    
    //- コマンド・個別アイテム
    Scene_Battle.prototype.commandItemOneKe = function() {
        const action = BattleManager.inputtingAction();
        if (!action || !action._item) { return; };
        const itemId = this._actorCommandWindow.currentExt();
        action.setItem(itemId);
        this.onSelectAction();
    };
    
    
    //- アイコン描画呼び出し
    const _Window_ActorCommand_drawItem = Window_ActorCommand.prototype.drawItem;
    Window_ActorCommand.prototype.drawItem = function(index) {
        this._index = index;
        this.drawIconKe();
        _Window_ActorCommand_drawItem.call(this, index);
    };
    
    
    //- アイコン描画
    Window_ActorCommand.prototype.drawIconKe = function() {
        if (!keke_iconShow) { return; }
        // イニット
        const symbol = this.currentSymbol();
        const id = this.currentExt();
        let iconIndex = this.currentData() ? this.currentData().extKe : null;
        const rect = this.itemLineRect(this._index);
        const scene = SceneManager._scene;
        const wPad = $gameSystem.windowPadding();
        const attackId = this._actor.attackSkillId();
        const guardId = this._actor.guardSkillId();
        const iconW = ImageManager.iconWidth;
        const iconH = ImageManager.iconHeight;
        const isRight = keke_iconRel == "右";
        // スキルアイコンがあったら取得
        if (symbol == "attack" && !iconIndex) { iconIndex = $dataSkills[attackId] ? $dataSkills[attackId].iconIndex : 0; }
        if (symbol == "guard" && !iconIndex) { iconIndex =  iconIndex = $dataSkills[guardId] ? $dataSkills[guardId].iconIndex : 0;; }
        if (symbol == "skillOne" && !iconIndex) { iconIndex = $dataSkills[id] ? $dataSkills[id].iconIndex : 0; }
        if (symbol == "itemOne" && !iconIndex) { iconIndex = $dataItems[id] ? $dataItems[id].iconIndex : 0; }
        // アイコン描画
        if (iconIndex) {
            // スプライト形成
            const iconSprite = $gameSystem.makeIconSpriteKeVac(iconIndex);
            scene.addChild(iconSprite);
            this._iconSpritesKe.push(iconSprite);
            // 拡大
            const iconTw = keke_iconSize; 
            const scale = iconTw / iconW;
            iconSprite.scale.x = scale;
            iconSprite.scale.y = scale
            // 位置
            iconSprite.x = this.x + wPad + rect.x + (isRight ? rect.width + iconTw / 2 - keke_iconPosX :  - iconTw / 2 + keke_iconPosX);
            iconSprite.y = this.y + wPad + rect.y + iconTw / 2 + (rect.height - iconTw * 0.75) / 2 + keke_iconPosY;
        }
    };
    
    
    //- アイコンの消去
    Window_ActorCommand.prototype.deleteIconKe = function() {
        if (!this._iconSpritesKe.length) { return; }
        const scene = SceneManager._scene;
        this._iconSpritesKe.forEach(sprite => scene.removeChild(sprite));
        this._iconSpritesKe = []; 
    };
    
    
    //- ウインドウ閉じるときアイコンも消す
    const _Window_ActorCommand_close = Window_ActorCommand.prototype.close;
    Window_ActorCommand.prototype.close = function() {
        _Window_ActorCommand_close.call(this);
        this.deleteIconKe();
    };
    
    
    //- ウインドウを出すときアイコンも出す
    const _Window_ActorCommand_show = Window_ActorCommand.prototype.show;
    Window_ActorCommand.prototype.show = function() {
        _Window_ActorCommand_show.call(this);
        this._iconSpritesKe.forEach(sprite => sprite.visible = true);
    };
    
    
    //- ウインドウを消すときアイコンも消す
    const _Window_ActorCommand_hide = Window_ActorCommand.prototype.hide;
    Window_ActorCommand.prototype.hide = function() {
        _Window_ActorCommand_hide.call(this);
        this._iconSpritesKe.forEach(sprite => sprite.visible = false);
    };
    
    
    
    //================================================== 
    //--  アクターコマンド自動伸縮
    //==================================================
    
    //- リサイズ
    Window_ActorCommand.prototype.resizeKe = function() {
        // 自動伸縮でなければリターン
        if (!keke_windowAutoResize) { return; }
        // 基本のY位置を保存
        if (this._oriYKe == null) { this._oriYKe = this.y; }
        // コマンド数取得
        let cmdNum = this._list.length;
        // ハイト変更
        this.height = this.fittingHeight(cmdNum) * 1;
        // ウインドウ下端
        const downMax = this._oriYKe + this.fittingHeight(cmdNum);
        // 画面外に出ないようにする
        this.y = this._oriYKe;
        if (downMax > keke_windowResizeMax) { this.y -= downMax - keke_windowResizeMax; }
    };
    
    
    //- ハイト拡大
    const _Scene_Battle_actorCommandWindowRect = Scene_Battle.prototype.actorCommandWindowRect;
    Scene_Battle.prototype.actorCommandWindowRect = function() {
        let result = _Scene_Battle_actorCommandWindowRect.call(this);
        // 自動伸縮時のみ
        if (keke_windowAutoResize) { result.height = Graphics.height; }
        return result;
    };
    
    
    //- キャンセルボタンのリポズ
    Scene_Battle.prototype.reposCancelButtonKe = function(window) {
        if (!keke_cancelAutoRepos) { return; }
        if (!this._cancelButton) { return; }
        const isLeft = !SceneManager._scene.isRightInputMode();
        this._cancelButton.x = isLeft ? 0 : this._cancelButton.x;
        this._cancelButton.y = window.y - this._cancelButton.height - 4;
    };
    
    
    
    //==================================================
    //--  自動戦闘
    //==================================================
    
    //- 自動戦闘フラグ
    const _Game_BattlerBase_isAutoBattle = Game_BattlerBase.prototype.isAutoBattle;
    Game_BattlerBase.prototype.isAutoBattle = function() {
        let result = _Game_BattlerBase_isAutoBattle.call(this);
        if (this._autoBattleKe) { result = true; }
        return result;
    };
    
    
    //- コマンド・自動戦闘
    Scene_Battle.prototype.commandAutoBattleKe = function() {
        // 個別フラグオン
        $gameParty.battleMembers().forEach(actor => {
            actor._autoBattleKe = true;
            actor.makeAutoBattleActions();
        }, this);
        // 全体フラグオン
        this._inAutoBattleKe = true;
        // ウインドウ閉じる
        this.closeCommandWindows();
        this.selectNextCommand();
    };
    
    
    //- コマンド・自動戦闘(個別)
    Scene_Battle.prototype.commandAutoBattleOneKe = function() {
        // 個別フラグオン
        const actor = BattleManager.actor();
        // アクターがいないならリターン
        if (!actor) { return; }
        actor._autoBattleKe = true;
        // 全体フラグオン
        this._inAutoBattleKe = true;
        // アクション作成
        actor.makeAutoBattleActions();
        // ウインドウ閉じる
        this.closeCommandWindows();
        this.selectNextCommand();
    };
    
    
    //- 自動戦闘の解除
    Scene_Battle.prototype.endAutoBattleKe = function() {
        // 個別フラグオフ
        $gameParty.battleMembers().forEach(actor => {
            actor._autoBattleKe = false;
        }, this);
        // 全体フラグオフ
        this._inAutoBattleKe = false;
    };
    
    
     // 自動戦闘の解除(ボタン)
    Scene_Battle.prototype.endAutoBattleBtnKe = function() {
        // 自動戦闘の解除
        this.endAutoBattleKe();
        // サウンド
        SoundManager.playCancel();
    };
    
    
    //- 自動戦闘の更新
    Scene_Battle.prototype.updateAutoBattleKe = function() {
        // 自動戦闘中、キャンセルボタンか画面タッチで
        if (this._inAutoBattleKe && (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isTriggered())) {
            // 自動戦闘終了
            this.endAutoBattleBtnKe();
        }
    };
    
    
    //- 戦闘終了時に自動戦闘解除
    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.call(this);
        this.endAutoBattleKe();
    };
    
    
    
    //==================================================
    //--  パーティコマンド無効
    //==================================================
    
    const _Scene_Battle_changeInputWindow = Scene_Battle.prototype.changeInputWindow;
    Scene_Battle.prototype.changeInputWindow = function() {
        // パーティコマンド無効なら
        if (keke_noPartyCommand) {
            // カレントアクターが空になったら
            if (BattleManager.isInputting() && !BattleManager.actor()) {
                // 次のインプット可アクターをセット
                for (const actor of $gameParty.battleMembers()) {
                    if (actor.canInput()) {
                        BattleManager._currentActor = actor;
                        break;
                    }
                }
                // インプット可アクターがいないならコマンド終了
                if (!BattleManager._currentActor) {
                    this.endCommandSelection();
                    return;
                }
            }
        }
        _Scene_Battle_changeInputWindow.call(this);
    };
    
    
    
    //==================================================
    //--  メタ配列 /ベーシック
     //==================================================
     
    //- 全てのメタ配列を合算
    Game_Battler.prototype.totalAllMetaArrayKeVac = function(words) {
        // イニット
        let data = null
        let array = [];
        // バトラー値
        data = this.actorId ? this.actor() : this.enemy();
        if (data) { this.getMetaArrayKeVac(data.note, words).forEach(e => array.push(e)); }
        if (this._actorId) {
            // 職業値
            data = this.currentClass();
            if (data) { this.getMetaArrayKeVac(data.note, words).forEach(e => array.push(e)); }
            // 装備値
            this._equips.forEach(equip => {
                data = equip.object();
                if (data) { this.getMetaArrayKeVac(data.note, words).forEach(e => array.push(e)); }
            }, this);
        }
        // ステート値
        this._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { this.getMetaArrayKeVac(data.note, words).forEach(e => array.push(e)); }
        }, this);
        // アクション値
        const actions = [BattleManager._action];
        const chainRun = BattleManager._chainRunActionKe;
        if (chainRun && chainRun != BattleManager._action) { actions.push(BattleManager._chainRunActionKe); }
        for (const action of actions) {
            if (!action) { continue; }
            data = action.item();
            if (data) { this.getMetaArrayKeVac(data.note, words).forEach(e => array.push(e)); }
        }
        // スペース削除
        array = array.map(e => e.replace(/\s/g, ""));
        // 空の要素は削除
        array = array.filter(e => e);
        return array;
    };
    
    //- メタ配列を取得
    Game_Battler.prototype.getMetaArrayKeVac= function(note, words) {
        return $gameSystem.metaAllKeVac(note, words);
    };
    
    
    //-- 全取得メタ
    Game_System.prototype.metaAllKeVac = function(note, words) {
        var result = [];
        words.forEach(word => {
            var regText = '\<' + word + ':([^\>]*)\>';
            var regExp_g = new RegExp(regText, 'g');
            var regExp = new RegExp(regText);
            var matches = note.match(regExp_g);
            var match = null;
            if (matches) {
                matches.forEach(function(line) {
                    result.push(line.match(regExp)[1]);
                }, this);
            }
        }, this);
        return result;
    };
    
    
    
    //==================================================
    //--  アイコンスプライト /ベーシック
    //==================================================
    
    //- アイコンスプライト作成
    Game_System.prototype.makeIconSpriteKeVac = function(iconIndex) {
        const sprite = new Sprite();
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        const bitmap = ImageManager.loadSystem("IconSet");
        sprite.bitmap = bitmap;
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        sprite.setFrame(sx, sy, pw, ph);
        return sprite;
    };
    
})();