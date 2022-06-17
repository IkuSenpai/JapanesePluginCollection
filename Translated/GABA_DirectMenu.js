//=============================================================================
// RPG Maker MZ - Direct Menu
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Open the item in the menu directly from the plugin command.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_DirectMenu.js(ver1.0.2)
 *
 * Open the item in the menu directly from the plugin command.
 * You can open it with the category or actor selected.
 *
 * -Plugin parameters
 * -- Normal menu call
 *    When turned off, the normal menu cannot be called by right-clicking,
 *    and the menu button on the screen disappears.
 *
 * -Plugin command
 * -- Open the item menu
 * -- Open the skill menu
 * -- Open the equipment menu
 * -- Open the status menu
 * -- Open the formation menu
 * -- Open the options menu
 * -- Open the save menu
 * -- Open the end game menu
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param isUseNormalMenu
 * @text Normal menu call
 * @type boolean
 * @desc ON:Enable OFF:Disable
 * @on ON
 * @off OFF
 * @default true
 *
 * @command openItem
 * @text Open the item menu
 * @desc Open a window with Menu->Item selected. You can also select a category with an argument.
 *
 * @arg choiceCategory
 * @text Category selection
 * @type select
 * @desc Specify this when you want to select a category in the item menu.
 * @default none
 *
 * @option None
 * @value none
 *
 * @option Item
 * @value item
 *
 * @option Weapon
 * @value weapon
 *
 * @option Armor
 * @value armor
 *
 * @option Key item
 * @value keyItem
 *
 * @command openSkill
 * @text Open the skill menu
 * @desc Open a window with Menu->Skill selected. If an actor is specified as an argument, the menu screen will not be created.
 *
 * @arg choiceCharacter
 * @text Actor selection
 * @type actor
 * @desc Please select an actor. If you select an actor that is not in the party, the first actor will be selected.
 *
 * @command openEquip
 * @text Open the equipment menu
 * @desc Open the window with Menu->Equipment selected. If an actor is specified as an argument, the menu screen will not be created.
 *
 * @arg choiceCharacter
 * @text Actor selection
 * @type actor
 * @desc Please select an actor. If you select an actor that is not in the party, the first actor will be selected.
 *
 * @command openStatus
 * @text Open the status menu
 * @desc Open a window with Menu->Status selected. If an actor is specified as an argument, the menu screen will not be created.
 *
 * @arg choiceCharacter
 * @text Actor selection
 * @type actor
 * @desc Please select an actor. If you select an actor that is not in the party, the first actor will be selected.
 *
 *
 * @command openSort
 * @text Open the formation menu
 * @desc Open the formation menu.
 *
 *
 * @command openOption
 * @text Open the options menu
 * @desc Open the options menu.
 *
 *
 * @command openSave
 * @text Open the save menu
 * @desc Open the save menu.
 *
 * @command openGameEnd
 * @text Open the end game menu
 * @desc Open the end game menu.
 *
 *
 */

/*:ja
 * @target MZ
 * @plugindesc プラグインコマンドを使用してメニュー内の項目を開きます。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_DirectMenu.js(ver1.0.2)
 *
 * プラグインコマンドを使用して
 * メニュー内の項目（アイテムや装備など）を開きます。
 * カテゴリやアクターが選ばれた状態で開けます。
 *
 * ■プラグインパラメーター
 * ・通常メニュー呼び出し
 *   OFFにすると右クリックで通常メニューを呼び出せなくなり、
 *   画面上のメニューボタンも消えます。
 *
 * ■プラグインコマンド
 * ・アイテムを開く
 * ・スキルを開く
 * ・装備を開く
 * ・並び替えを開く
 * ・オプションを開く
 * ・セーブを開く
 * ・ゲーム終了を開く
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param isUseNormalMenu
 * @text 通常メニュー呼び出し
 * @type boolean
 * @desc ON:使用する OFF:使用しない
 * @on ON
 * @off OFF
 * @default true
 *
 * @command openItem
 * @text アイテムを開く
 * @desc メニュー＞アイテムを選択した状態でウィンドウを開きます。引数でカテゴリーも選択状態にできます。
 *
 * @arg choiceCategory
 * @text カテゴリー選択
 * @type select
 * @desc アイテムメニューのカテゴリーを選択したい場合に指定してください。
 * @default none
 *
 * @option なし
 * @value none
 *
 * @option アイテム
 * @value item
 *
 * @option 武器
 * @value weapon
 *
 * @option 防具
 * @value armor
 *
 * @option 大事なもの
 * @value keyItem
 *
 * @command openSkill
 * @text スキルを開く
 * @desc メニュー＞スキルを選択した状態でウィンドウを開きます。引数でアクターを指定した場合、メニュー画面を作成しません。
 *
 * @arg choiceCharacter
 * @text アクター選択
 * @type actor
 * @desc アクターを選択してください。パーティにいないアクターを選択した場合、先頭が選択されます。
 *
 * @command openEquip
 * @text 装備を開く
 * @desc メニュー＞装備を選択した状態でウィンドウを開きます。引数でアクターを指定した場合、メニュー画面を作成しません。
 *
 * @arg choiceCharacter
 * @text アクター選択
 * @type actor
 * @desc アクターを選択してください。パーティにいないアクターを選択した場合、先頭が選択されます。
 *
 * @command openStatus
 * @text ステータスを開く
 * @desc メニュー＞ステータスを選択した状態でウィンドウを開きます。引数でアクターを指定した場合、メニュー画面を作成しません。
 *
 * @arg choiceCharacter
 * @text アクター選択
 * @type actor
 * @desc アクターを選択してください。パーティにいないアクターを選択した場合、先頭が選択されます。
 *
 * @command openSort
 * @text 並び替えを開く
 * @desc 並び替え画面を開きます。
 *
 * @command openOption
 * @text オプションを開く
 * @desc オプション画面を開きます。
 *
 * @command openSave
 * @text セーブを開く
 * @desc セーブ画面を開きます。
 *
 * @command openGameEnd
 * @text ゲーム終了を開く
 * @desc ゲーム終了画面を開きます。
 *
 */

(() => {
    "use strict";
    const pluginName = "GABA_DirectMenu";

    // プラグインパラメータ
    const parameters = PluginManager.parameters(pluginName);
	const isUseNormalMenu = parameters["isUseNormalMenu"]  === "true";

    // ----------------
    //プラグインコマンド
    // ----------------

    //アイテムを開く
    PluginManager.registerCommand(pluginName, "openItem", args => {
        openItemMenu(args.choiceCategory);
    });

    //スキルを開く
    PluginManager.registerCommand(pluginName, "openSkill", args => {
        openSkillMenu(args.choiceCharacter);
    });

    //装備を開く
    PluginManager.registerCommand(pluginName, "openEquip", args => {
        openEquipMenu(args.choiceCharacter);
    });

    //ステータスを開く
    PluginManager.registerCommand(pluginName, "openStatus", args => {
        openStatusMenu(args.choiceCharacter);
    });

    //並び替えを開く
    PluginManager.registerCommand(pluginName, "openSort", args => {
        openSortMenu();
    });

    //オプションを開く
    PluginManager.registerCommand(pluginName, "openOption", args => {
        openOptionMenu();
    });

    //セーブを開く
    PluginManager.registerCommand(pluginName, "openSave", args => {
        openSaveMenu();
    });

    //ゲーム終了を開く
    PluginManager.registerCommand(pluginName, "openGameEnd", args => {
        openGameEndMenu();
    });

    // ----------------
    // 関数追加
    // ----------------

    //アイテムメニューを開く
    function openItemMenu(keyword){
        SceneManager.push(Scene_Item);
        SceneManager.update(1);

        if (keyword === "none"){
            return;
        }

        SceneManager._scene._categoryWindow.selectSymbol(keyword);
        SceneManager._scene.onCategoryOk();
        SceneManager._scene._categoryWindow.deactivate();
    }

    // スキルメニューを開く
    function openSkillMenu(actorId){
        if (actorId === 0){
            SceneManager.push(Scene_Menu);
            SceneManager.update(1);
            SceneManager._scene._commandWindow.selectSymbol("skill");
            SceneManager._scene.commandPersonal();
            SceneManager._scene._commandWindow.deactivate();
            return;
        }

        $gameParty.setMenuActor($gameActors.actor(actorId));
        SceneManager.push(Scene_Skill);
        SceneManager.update(1);
    }

    // 装備メニューを開く
    function openEquipMenu (actorId){
        if (actorId === 0){
            SceneManager.push(Scene_Menu);
            SceneManager.update(1);
            SceneManager._scene._commandWindow.selectSymbol("equip");
            SceneManager._scene.commandPersonal();
            SceneManager._scene._commandWindow.deactivate();
            return;
        }

        $gameParty.setMenuActor($gameActors.actor(actorId));
        SceneManager.push(Scene_Equip);
        SceneManager.update(1);
    }

    // ステータスメニューを開く
    function openStatusMenu(actorId){
        if (actorId === 0){
            SceneManager.push(Scene_Menu);
            SceneManager.update(1);
            SceneManager._scene._commandWindow.selectSymbol("status");
            SceneManager._scene.commandPersonal();
            SceneManager._scene._commandWindow.deactivate();
            return;
        }

        $gameParty.setMenuActor($gameActors.actor(actorId));
        SceneManager.push(Scene_Status);
        SceneManager.update(1);
    }

    // 並び替えメニューを開く
    function openSortMenu(){
        SceneManager.push(Scene_Menu);
        SceneManager.update(1);
        SceneManager._scene._commandWindow.selectSymbol("formation");
        SceneManager._scene.commandFormation();
        SceneManager._scene._commandWindow.deactivate();
    }

    // オプションメニューを開く
    function openOptionMenu(){
        SceneManager.push(Scene_Options);
        SceneManager.update(1);
    }

    // セーブメニューを開く
    function openSaveMenu(){
        SceneManager.push(Scene_Save);
        SceneManager.update(1);
    }

    // ゲーム終了画面を開く
    function openGameEndMenu(){
        SceneManager.push(Scene_GameEnd);
        SceneManager.update(1);
    }

    // マップから通常メニューを呼び出せなくします
    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if (!isUseNormalMenu) {
            return;
        }

        _Scene_Map_callMenu.apply(this, arguments);
    };

    // マップ上のメニューボタンを非表示にします
    const _Scene_Map_updateMenuButton = Scene_Map.prototype.updateMenuButton;
    Scene_Map.prototype.updateMenuButton = function() {
        if (!isUseNormalMenu) {
            return;
        }

        _Scene_Map_updateMenuButton.apply(this, arguments);
    };

    //-----------------------------------------------------------------
    // Scene_Equipの変更
    // リフレッシュのタイミングを修正しています。
    // この修正がないとアクター指定で装備画面を表示した場合、初回のみ顔グラフィックが表示されません。

    const _Scene_Equip_start = Scene_Equip.prototype.start;
    Scene_Equip.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this.refreshActor();
        // 他のプラグインの処理を潰さないため(このせいでエラーになる場合はコメントアウトしてみてください)
        _Scene_Equip_start.apply(this, arguments);
    };

    // Scene_Equip.prototype.create()の最後のrefreshActor()を実行させない。
    const _Scene_Equip_refreshActor = Scene_Equip.prototype.refreshActor;
    Scene_Equip.prototype.refreshActor = function() {
        if (!this.isActive()) {
            return;
        }
        _Scene_Equip_refreshActor.apply(this, arguments);
    };

})();
