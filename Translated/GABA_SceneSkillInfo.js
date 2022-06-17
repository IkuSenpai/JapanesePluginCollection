//=============================================================================
// RPG Maker MZ - Scene Skill Info
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Add skill information scene.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_SceneSkillInfo.js(ver1.0.0)
 *
 * Add a skill information screen to the menu.
 * Display database "skill" information and GABA_SkillDataEx.js data.
 *
 * - Fixed text
 * If you enter a specific character in the text, it will be converted and displayed.
 * - DrawSkillName => Display icon and skill name
 *
 * - Skill information tags
 * If you write a tag in the text, it will be replaced with data and displayed.
 * First search the data in GABA_SkillDataEx.js, then search the skill data in the database.
 * Check "Game folder> data> Skills.json" for the data name.
 *
 * \tag[dataName]
 * Display the data corresponding to the data name.
 *
 * \tag[dataName, number of digits, characters to fill]
 * Display by embedding characters before the data.
 * ex) \tag[dataName, 5, 0]
 * If the data is 9, "00009" is displayed.
 * ex) \tag[dataName, 5,]
 * If there is no character to fill, fill a space.
 * If the data is 9, "9" is displayed.
 * -- Even if you enter multiple spaces in the characters to be filled, they will be processed as one space.
 *
 * - Skill information tags (special patterns)
 *  If you want to display the item in the "Damage" of the skill database
 * \tag[damage|data name]
 *
 * - "<dataName: data>" is written in the "Note" of the skill database.
 * If you want to display only data
 * \tag[note|dataName]
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param menuName
 * @text Menu name
 * @desc Specify the name to be displayed in the menu.
 * @default Skill Infomation
 *
 * @param menuNo
 * @text Menu no
 * @desc Specify the order of the menu. If it is a large value, it will be displayed at the end.
 * @type number
 * @default 5
 * @min 1
 *
 * @param menuSwitch
 * @text Menu display switch
 * @desc ON: Display the item in the menu. Display the item in the menu. If it is zero, it will always be displayed.
 * @type switch
 * @default 0
 *
 * @param ssiTag
 * @text Skill infomation tag
 * @desc If there is \tag[dataName] in the text, it will be replaced with the data.
 * @default skInfo
 *
 * @param useStatusWindow
 * @text Show status
 * @desc ON:Display a status window on the screen.
 * @type boolean
 * @default true
 *
 * @param windowList
 * @text Window list
 * @type struct<Window>[]
 * @desc Specify the window you want to add.
 * @default ["{\"text\":\"drawSkillName\",\"posX\":\"0\",\"posY\":\"208\",\"width\":\"808\",\"height\":\"60\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"0\",\"textY\":\"0\"}","{\"text\":\"\\\\skInfo[description]\",\"posX\":\"0\",\"posY\":\"268\",\"width\":\"808\",\"height\":\"96\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\c[16]MP(-)\\\\c[0] \\\\skInfo[mpCost,7,]\\n\\\\c[16]TP(-)\\\\c[0] \\\\skInfo[tpCost,7,]\\n\\\\c[16]TP(+)\\\\c[0] \\\\skInfo[tpGain,7,]\",\"posX\":\"568\",\"posY\":\"52\",\"width\":\"240\",\"height\":\"156\",\"lineHeight\":\"44\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\c[16]Target  \\\\c[0] \\\\skInfo[scope]\\n\\\\c[16]Scene   \\\\c[0] \\\\skInfo[occasion]\\n\\\\c[16]Effect  \\\\c[0] \\\\skInfo[damage|type]\\n\\\\c[16]Element \\\\c[0] \\\\skInfo[damage|elementId]\\n\",\"posX\":\"0\",\"posY\":\"364\",\"width\":\"404\",\"height\":\"168\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\skInfo[note|comment]\",\"posX\":\"404\",\"posY\":\"364\",\"width\":\"404\",\"height\":\"168\",\"lineHeight\":\"0\",\"fontSize\":\"22\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\i[80] Any Text\",\"posX\":\"0\",\"posY\":\"532\",\"width\":\"808\",\"height\":\"68\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}"]
 *
 */

/*:ja
 * @target MZ
 * @plugindesc スキル情報画面を追加します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_SceneSkillInfo.js(ver1.0.0)
 *
 * メニューにスキル情報画面を追加します。
 * データベース「スキル」の情報の他、
 * GABA_SkillDataEx.jsのデータも表示できます。
 *
 * ■固定テキスト
 *  テキストに特定の文字を入力すると変換されて表示されます。
 * ・drawSkillName => アイコンとスキル名を表示
 *
 * ■スキル情報のタグ
 *   テキスト中にタグを書くと、データに置き換えて表示します。
 *    GABA_SkillDataEx.jsのデータを検索した後に、
 *    データベースのスキルデータを検索します。
 *    データ名は「ゲームフォルダ>data>Skills.json」を確認してください。
 *
 * \tag[データ名]
 *   データ名に該当するデータを表示します。
 *
 * \tag[データ名, 桁数, 埋める文字]
 *   データの前に文字を埋めて表示します。
 *   例） \tag[データ名, 5, 0]
 *    データが9の場合、「00009」と表示します。
 *   例） \tag[データ名, 5,]
 *     埋める文字がなければ半角スペースを埋めます。
 *    データが9の場合、「    9」と表示します。
 *    ※埋める文字に複数半角スペースを入力しても、1文字分として処理します。
 *
 * ■スキル情報のタグ（特殊なパターン）
 * ・スキルデータベースの「ダメージ欄」の項目を表示したい場合
 * \tag[damage|データ名]
 *
 * ・スキルデータベースの「メモ欄」に、「<データ名:data>」と書かれていて、
 *   dataだけ表示したい場合
 * \tag[note|データ名]
 *
 * ■表示を変えたい場合
 * 一部のデータは本プラグインで独自に文字に置き換えて表示しています。
 * 表現を変更したい場合、本プラグイン最下部の
 * skillDataReplace()以降を直接書き換えてください。
 * ※バックアップを取って作業してください。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param menuName
 * @text メニュー名
 * @desc メニューに表示する名称を指定します。
 * @default スキル情報
 *
 * @param menuNo
 * @text メニュー番号
 * @desc メニューの何番目に表示するか指定します。メニュー数より大きい値なら末尾に表示します。
 * @type number
 * @default 5
 * @min 1
 *
 * @param menuSwitch
 * @text メニュー表示スイッチ
 * @desc このスイッチがONの場合、メニューに項目を表示します。「なし」なら常に表示します。
 * @type switch
 * @default 0
 *
 * @param ssiTag
 * @text スキル情報のタグ
 * @desc テキスト中に\tag[データ名]があると、データに置換します。
 * @default skInfo
 *
 * @param useStatusWindow
 * @text ステータスを表示する
 * @desc ONにすると画面にステータスウィンドウを表示します。
 * @type boolean
 * @default true
 *
 * @param windowList
 * @text 追加ウィンドウリスト
 * @type struct<Window>[]
 * @desc 追加したいウィンドウを指定します
 * @default ["{\"text\":\"drawSkillName\",\"posX\":\"0\",\"posY\":\"208\",\"width\":\"808\",\"height\":\"60\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"0\",\"textY\":\"0\"}","{\"text\":\"\\\\skInfo[description]\",\"posX\":\"0\",\"posY\":\"268\",\"width\":\"808\",\"height\":\"96\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\c[16]MP消費\\\\c[0] \\\\skInfo[mpCost,7,]\\n\\\\c[16]TP消費\\\\c[0] \\\\skInfo[tpCost,7,]\\n\\\\c[16]TP増加\\\\c[0] \\\\skInfo[tpGain,7,]\",\"posX\":\"568\",\"posY\":\"52\",\"width\":\"240\",\"height\":\"156\",\"lineHeight\":\"44\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\c[16]効果対象　\\\\c[0] \\\\skInfo[scope]\\n\\\\c[16]使用場面　\\\\c[0] \\\\skInfo[occasion]\\n\\\\c[16]効果　　　\\\\c[0] \\\\skInfo[damage|type]\\n\\\\c[16]属性　　　\\\\c[0] \\\\skInfo[damage|elementId]\\n\",\"posX\":\"0\",\"posY\":\"364\",\"width\":\"404\",\"height\":\"168\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\skInfo[note|comment]\",\"posX\":\"404\",\"posY\":\"364\",\"width\":\"404\",\"height\":\"168\",\"lineHeight\":\"0\",\"fontSize\":\"22\",\"textX\":\"4\",\"textY\":\"4\"}","{\"text\":\"\\\\i[80]任意のテキスト\",\"posX\":\"0\",\"posY\":\"532\",\"width\":\"808\",\"height\":\"68\",\"lineHeight\":\"0\",\"fontSize\":\"26\",\"textX\":\"4\",\"textY\":\"4\"}"]
 *
 */
/*~struct~Window:
 *
 * @param text
 * @text Text
 * @desc Specifies the text to display.
 * @default
 * @type multiline_string
 *
 * @param posX
 * @text Position X
 * @desc The horizontal position of the window. Adjust to the right with a plus and to the left with a minus.
 * @default 0
 * @type number
 * @min -9999
 *
 * @param posY
 * @text Position Y
 * @desc The vertical position of the window. Adjust with a plus to adjust down and with a minus to adjust up.
 * @default 0
 * @type number
 * @min -9999
 *
 * @param width
 * @text Width
 * @desc Window width.
 * @default 400
 * @type number
 *
 * @param height
 * @text height
 * @desc Window height.
 * @default 60
 * @type number
 *
 * @param lineHeight
 * @text Line height
 * @desc Specify the Line height. 0 is the system default.
 * @default 0
 *
 * @type number
 * @param fontSize
 * @text Font size
 * @desc Specify the font size.
 * @default 26
 * @type number
 *
 * @param textX
 * @text Text start X
 * @desc The starting position of the text. Adjust to the right with a plus and to the left with a minus.
 * @type number
 * @min -9999
 * @default 4
 *
 * @param textY
 * @text Text start Y
 * @desc The starting position of the text. Adjust with a plus to adjust down and with a minus to adjust up.
 * @type number
 * @min -9999
 * @default 4
 *
 */
/*~struct~Window:ja
 *
 * @param text
 * @text テキスト
 * @desc 表示するテキストを指定します。
 * @default
 * @type multiline_string
 *
 * @param posX
 * @text 横位置
 * @desc ウィンドウの横位置です。プラスで右、マイナスで左に調整します。
 * @default 0
 * @type number
 * @min -9999
 *
 * @param posY
 * @text 縦位置
 * @desc ウィンドウの縦位置です。プラスで下、マイナスで上に調整します。
 * @default 0
 * @type number
 * @min -9999
 *
 * @param width
 * @text 横幅
 * @desc ウィンドウの横幅です。
 * @default 400
 * @type number
 *
 * @param height
 * @text 高さ
 * @desc ウィンドウの高さです。
 * @default 60
 * @type number
 *
 * @param lineHeight
 * @text １行の高さ
 * @desc １行の高さを指定します。0だとシステムデフォルトです。
 * @default 0
 *
 * @type number
 * @param fontSize
 * @text フォントサイズ
 * @desc フォントサイズを指定します。
 * @default 26
 * @type number
 *
 * @param textX
 * @text テキストの開始位置X
 * @desc テキストの開始位置です。プラスで右、マイナスで左に調整します。
 * @type number
 * @min -9999
 * @default 4
 *
 * @param textY
 * @text テキストの開始位置Y
 * @desc テキストの開始位置です。プラスで下、マイナスで上に調整します。
 * @type number
 * @min -9999
 * @default 4
 *
 */

(() => {
	"use strict";

    const pluginName = "GABA_SceneSkillInfo";

    // プラグインパラメータ
    const parameters = PluginManager.parameters(pluginName);

    const menuName = parameters["menuName"];
    const menuNo = Number(parameters["menuNo"]) || 0;
    const menuSwitch = Number(parameters["menuSwitch"]) || 0;
    const useStatusWindow = parameters["useStatusWindow"] === "true";
    const ssiTag = (parameters["ssiTag"] || "").toUpperCase();
    const strSsiRegExp = `/\\x1b${ssiTag}\\[(.*?)\\]/gi`;
    const windowList = paramConvertArray(parameters["windowList"]);

    //-----------------------------------------------------------------------------
    // メニューコマンドの設定

    function useSkillInfoMenu() {
        return menuSwitch === 0 || $gameSwitches.value(menuSwitch);
    }

    const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        _Scene_Menu_onPersonalOk.apply(this, arguments);
        switch (this._commandWindow.currentSymbol()) {
            case "skillInfo":
                SceneManager.push(Scene_SkillInfo);
                break;
        }
    };

    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.apply(this, arguments);
        this._commandWindow.setHandler("skillInfo", this.commandPersonal.bind(this));
    };

    const _Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
    Window_MenuCommand.prototype.makeCommandList = function() {
        _Window_MenuCommand_makeCommandList.apply(this, arguments);
        const enabled = this.areMainCommandsEnabled();

        if (useSkillInfoMenu()) {
            const index = menuNo - 1 >= 0 ? menuNo - 1 : 0;
            this._list.splice(index, 0, { name: menuName, symbol: "skillInfo", enabled: enabled, ext: null })
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_SkillInfo
    // スキルの選択部分
    //-----------------------------------------------------------------------------

    function Scene_SkillInfo() {
        this.initialize(...arguments);
    }

    Scene_SkillInfo.prototype = Object.create(Scene_ItemBase.prototype);
    Scene_SkillInfo.prototype.constructor = Scene_SkillInfo;

    Scene_SkillInfo.prototype.initialize = function() {
        Scene_ItemBase.prototype.initialize.call(this);
    };

    Scene_SkillInfo.prototype.create = function() {
        Scene_ItemBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createSkillTypeWindow();
        this.createStatusWindow();
        this.createItemWindow();
    };

    Scene_SkillInfo.prototype.start = function() {
        Scene_ItemBase.prototype.start.call(this);
        this.refreshActor();
        this.startPlace();
    };

    Scene_SkillInfo.prototype.startPlace = function() {
        if (this.actor()._lastMenuSkill._itemId === 0) {
            return;
        }
        this.selectSkillType();
        this._itemWindow.refresh();
        this.commandSkill();
    }

    Scene_SkillInfo.prototype.selectSkillType = function() {
        const skill = this._actor.lastMenuSkill();

        if (skill) {
            this._skillTypeWindow.selectExt(skill.stypeId);
            this._itemWindow._stypeId = skill.stypeId;
        } else {
            this._skillTypeWindow.forceSelect(0);
        }
    };

    Scene_SkillInfo.prototype.createSkillTypeWindow = function() {
        const rect = this.skillTypeWindowRect();
        this._skillTypeWindow = new Window_SkillType(rect);
        this._skillTypeWindow.setHelpWindow(this._helpWindow);
        this._skillTypeWindow.setHandler("skill", this.commandSkill.bind(this));
        this._skillTypeWindow.setHandler("cancel", this.popScene.bind(this));
        this._skillTypeWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._skillTypeWindow.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._skillTypeWindow);
    };

    Scene_SkillInfo.prototype.skillTypeWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(3, true);
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillInfo.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_SkillStatus(rect);
        this.addWindow(this._statusWindow);
        if (!useStatusWindow) {
            this._statusWindow.hide();
        }
    };

    Scene_SkillInfo.prototype.statusWindowRect = function() {
        const ww = Graphics.boxWidth - this.mainCommandWidth();
        const wh = this._skillTypeWindow.height;
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillInfo.prototype.createItemWindow = function() {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_SkillInfoList(rect);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler("ok", this.onItemOk.bind(this));
        this._itemWindow.setHandler("cancel", this.onItemCancel.bind(this));
        this._skillTypeWindow.setSkillWindow(this._itemWindow);
        this.addWindow(this._itemWindow);
    };

    Scene_SkillInfo.prototype.itemWindowRect = function() {
        const wx = 0;
        const wy = this._statusWindow.y + this._statusWindow.height;
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight() - this._statusWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillInfo.prototype.needsPageButtons = function() {
        return true;
    };

    Scene_SkillInfo.prototype.refreshActor = function() {
        const actor = this.actor();
        this._skillTypeWindow.setActor(actor);
        this._statusWindow.setActor(actor);
        this._itemWindow.setActor(actor);
    };

    Scene_SkillInfo.prototype.user = function() {
        return this.actor();
    };

    Scene_SkillInfo.prototype.commandSkill = function() {
        this._skillTypeWindow.deactivate();
        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    Scene_SkillInfo.prototype.onItemOk = function() {
        this.actor().setLastMenuSkill(this.item());
        this.determineItem();
        SceneManager.push(Scene_SkillInfoMain);
    };

    Scene_SkillInfo.prototype.onItemCancel = function() {
        this._itemWindow.deselect();
        this._skillTypeWindow.activate();
    };

    Scene_SkillInfo.prototype.playSeForItem = function() {
        SoundManager.playUseSkill();
    };

    Scene_SkillInfo.prototype.useItem = function() {
        Scene_ItemBase.prototype.useItem.call(this);
        this._statusWindow.refresh();
        this._itemWindow.refresh();
    };

    Scene_SkillInfo.prototype.onActorChange = function() {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
        this._itemWindow.deselect();
        this._skillTypeWindow.activate();
    };

    //Scene_ItemBaseに定義された処理を上書き
    Scene_SkillInfo.prototype.determineItem = function() {
        const action = new Game_Action(this.user());
        const item = this.item();
        action.setItemObject(item);
    };

    Scene_SkillInfo.prototype.popScene = function() {
        this.actor()._lastMenuSkill._itemId = 0;
        Scene_ItemBase.prototype.popScene.call(this);
    };

    //-----------------------------------------------------------------------------
    // Scene_SkillInfoMain
    // スキル詳細を表示する画面
    //-----------------------------------------------------------------------------

    function Scene_SkillInfoMain() {
        this.initialize(...arguments);
    }

    Scene_SkillInfoMain.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SkillInfoMain.prototype.constructor = Scene_SkillInfoMain;

    Scene_SkillInfoMain.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
        this._skillList = null;
        this._currentSkill = null;
    };

    Scene_SkillInfoMain.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createStatusWindow();
        this._windowSet = [];
        for (const wData of windowList) {
            const window = this.createSkillInfoWindow(wData);
            this._windowSet.push(window);
        }
    };

    Scene_SkillInfoMain.prototype.helpAreaHeight = function() {
        return 0;
    };

    Scene_SkillInfoMain.prototype.start = function() {
        Scene_MenuBase.prototype.start.call(this);
        this.refreshActor();
        for (const window of this._windowSet) {
            window._actor = this.actor();
            this.addWindow(window);
        }
        this._currentSkill = $dataSkills[this._actor._lastMenuSkill._itemId];
        this._skillList = this.actor().skills().filter(item => this.skillIncludes(item));
        this._pageupButton.setClickHandler(this.previousSkill.bind(this));
        this._pagedownButton.setClickHandler(this.nextSkill.bind(this));
        this._cancelButton.setClickHandler(this.processCancel.bind(this));
    };

    Scene_SkillInfoMain.prototype.index = function(item) {
        this._skillList.indexOf(item);
    }

    Scene_SkillInfoMain.prototype.skillIncludes = function(item) {
        if (this._currentSkill) {
            return item && item.stypeId === this._currentSkill.stypeId;
        }
        return false;
    };

    Scene_SkillInfoMain.prototype.needsPageButtons = function() {
        return true;
    };

    Scene_SkillInfoMain.prototype.refreshActor = function() {
        const actor = this.actor();
        if (actor) {
            for (const wData of this._windowSet) {
                wData.setActor(actor);
            }
        }

        this._statusWindow.setActor(actor);
    };

    Scene_SkillInfoMain.prototype.onActorChange = function() {
        Scene_MenuBase.prototype.onActorChange.call(this);
        this.refreshActor();
        this._statusWindow.setActor(actor);
        this._statusWindow.activate();
    };

    Scene_SkillInfoMain.prototype.createStatusWindow = function() {
        const rect = this.statusWindowRect();
        this._statusWindow = new Window_SkillStatus(rect);
        this.addWindow(this._statusWindow);
    };

    Scene_SkillInfoMain.prototype.statusWindowRect = function() {
        const ww = 568;
        const wh = 156;
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_SkillInfoMain.prototype.createSkillInfoWindow = function(data) {
        const rect = this.skillInfoWindowRect(data);
        const window = new Window_SkillInfo(rect);
        window._windowData = data;
        return window;
    };

    Scene_SkillInfoMain.prototype.skillInfoWindowRect = function(data) {
        return new Rectangle(data.posX, data.posY, data.width, data.height);
    };

    // 次のスキルインデックス
    Scene_SkillInfoMain.prototype.nextSkillIndex = function(step) {
        if (this._skillList) {
            const index = this._skillList.indexOf(this._currentSkill) + step;
            if (step === 1) {
                return (index > this._skillList.length - 1 || index < 0) ? 0 : index;
            } else {
                return index < 0 ? this._skillList.length - 1 : index;
            }
        }
        return 0;
    }

    Scene_SkillInfoMain.prototype.nextSkill = function() {
        this._currentSkill = this._skillList[this.nextSkillIndex(1)];
        this.onSkillChange();
    };

    Scene_SkillInfoMain.prototype.previousSkill = function() {
        this._currentSkill = this._skillList[this.nextSkillIndex(-1)];
        this.onSkillChange();
    };

    Scene_SkillInfoMain.prototype.onSkillChange = function() {
        this._actor._lastMenuSkill._itemId = this._currentSkill.id;
        for (const window of this._windowSet) {
            window.refresh();
        }
        SoundManager.playCursor();
    };

    Scene_SkillInfoMain.prototype.processCancel = function() {
        SoundManager.playCancel();
        this.popScene();
    };

    Scene_SkillInfoMain.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        this.processHandling();
    }

    Scene_SkillInfoMain.prototype.processHandling = function() {
        if (Input.isTriggered("cancel")) {
            return this.processCancel();
        }
        if (TouchInput.isCancelled()) {
            return this.processCancel();
        }
        if (Input.isTriggered("pagedown")) {
            return this.processPagedown();
        }
        if (Input.isTriggered("pageup")) {
            return this.processPageup();
        }
    };

    Scene_SkillInfoMain.prototype.popScene = function() {
        Scene_MenuBase.prototype.popScene.call(this);
    };

    //-----------------------------------------------------------------------------
    // Window_SkillInfoList
    // スキルを選択するウィンドウ
    //-----------------------------------------------------------------------------

    function Window_SkillInfoList() {
        this.initialize(...arguments);
    }

    Window_SkillInfoList.prototype = Object.create(Window_SkillList.prototype);
    Window_SkillInfoList.prototype.constructor = Window_SkillInfoList;

    Window_SkillInfoList.prototype.initialize = function(rect) {
        Window_SkillList.prototype.initialize.call(this, rect);
    };

    // 使用しないのでコストは非表示
    Window_SkillInfoList.prototype.drawSkillCost = function(skill, x, y, width) {
    };

    Window_SkillInfoList.prototype.isEnabled = function(item) {
        return this._actor;
    };


    //-----------------------------------------------------------------------------
    // Window_SKillInfo
    // スキル情報のメインウィンドウ
    //-----------------------------------------------------------------------------

    function Window_SkillInfo() {
        this.initialize(...arguments);
    }

    Window_SkillInfo.prototype = Object.create(Window_Base.prototype);
    Window_SkillInfo.prototype.constructor = Window_SkillInfo;

    Window_SkillInfo.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._windowData = null;
        this._actor = null;
        this._oldSkillId = null;
    };

    Window_SkillInfo.prototype.refresh = function() {
        this.drawAllText();
    };

    Window_SkillInfo.prototype.lineHeight = function() {
        return this._windowData.lineHeight || Window_Base.prototype.lineHeight();
    }

    Window_SkillInfo.prototype.resetFontSettings = function() {
        Window_Base.prototype.resetFontSettings.call(this);
        if (this._windowData) {
            this.contents.fontSize = this._windowData.fontSize;
        }
    };

    Window_SkillInfo.prototype.drawAllText = function() {
        const newSkillId = this._actor._lastMenuSkill._itemId;
        if (this._oldSkillId === newSkillId) {
            return;
        }

        this._oldSkillId = newSkillId;
        this.contents.clear();
        this.drawSkillText();
    }

    Window_SkillInfo.prototype.drawSkillText = function() {
        const newText = this._windowData.text;
        this.contents.fontSize = this._windowData.fontSize;
        if (newText === "drawSkillName") {
            const dataSkill = $dataSkills[this._actor._lastMenuSkill._itemId];
            this.drawItemName(dataSkill, this._windowData.textX, this._windowData.textY, this._windowData.width);
        } else {
            this.drawTextEx(newText, this._windowData.textX, this._windowData.textY, this._windowData.width);
        }
    }

    Window_SkillInfo.prototype.isShowOpen = function() {
        return true;
    }

    Window_SkillInfo.prototype.update = function() {
        this.open();
        Window_Base.prototype.update.call(this);
    }

    Window_SkillInfo.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            this.refresh();
        }
    };

    //-----------------------------------------------------------------------------
    // メッセージの整形
    //-----------------------------------------------------------------------------

    // タグの置換
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        if (ssiTag === "") {
            return _Window_Base_convertEscapeCharacters.apply(this, arguments);
        }

        // バックスラッシュ表示指定を置換
        const STR_GABA_SSI_REPLACE = "GABA_SSI_BS_Replace";
        arguments[0] = arguments[0].replaceAll("\\\\", STR_GABA_SSI_REPLACE);

        let myText = _Window_Base_convertEscapeCharacters.apply(this, arguments);

        // 独自タグを処理
        myText = myText.replace(getSsiRegExp(), (_, p1) =>
            getSsiValue(p1, this)
        );

        // 独自タグの処理結果、\i[X]などが発生する可能性あり。再度置換。
        myText = myText.replaceAll("\\", "\x1b");

        // バックスラッシュ表示指定を反映させる。
        myText = myText.replaceAll(STR_GABA_SSI_REPLACE, "\\");

        return myText;
    };

    // タグによるデータ取得
    function getSsiValue(p1, window) {
        const arr = p1.replaceAll(" ", "").split(",");
        let dataName = arr[0];
        let dataNameEx = "";
        if (arr[0].indexOf("|") >= 0) {
            dataName = arr[0].split("|")[0];
            dataNameEx = arr[0].split("|")[1];
        }

        const skillId = window._actor._lastMenuSkill._itemId;
        let value = null;
        if (existsDataEx(window, dataName)) {
                // 独自データの参照
                value = window._actor._skillDataEx[skillId][dataName];
        } else if (existsDataBase(window, dataName)) {
                // データベースの参照
                value = skillDataReplace(dataName, dataNameEx, $dataSkills[skillId][dataName]);
        }

        if (value == null) {
            return "";
        }

        if (arr.length === 3) {
            // 桁揃え
            const padLength = Number(arr[1]);
            if (isNaN(padLength)) {
                return `${value}`;
            }
            const padString = arr[2] !== "" ? arr[2] : " ";
            return `${value}`.padStart(padLength, padString);
        } else {
            return `${value}`;
        }
    }

    //--------------------------
    // その他
    //--------------------------

    // _skillDataExに存在するか
    function existsDataEx (window, dataName) {
        const lastSkill = window._actor._lastMenuSkill;
        const skillData = window._actor._skillDataEx;
        return skillData != null
            && skillData[lastSkill._itemId] != null
            && skillData[lastSkill._itemId][dataName] != null;
    }

    // データベースに存在するか
    function existsDataBase (window, dataName) {
        const lastSkill = window._actor._lastMenuSkill;
        return $dataSkills[lastSkill._itemId] != null
            && $dataSkills[lastSkill._itemId][dataName] != null;
    }

    // evalの代替
    function getSsiRegExp() {
        return Function(`"use strict";return (${strSsiRegExp})`)();
    }

    // パラメータの型変換
    function paramConvert(param) {
        if (param == null) return param;
        if (param.toString().trim() === "") return param;
        if (param === "true") return true;
        if (param === "false") return false;
        if (isNaN(param)) return param;
        return Number(param);
    }

    // 配列パラメータの型変換
    function paramConvertArray(param) {
        try {
            if (param == null || param === "") {
                return param;
            }

            return JSON.parse(param, (_, value) => {
                if (typeof(value) === "object") {
                    for (let i = 0; i < value.length; i++) {
                        value[i] = paramConvertArray(value[i]);
                    }
                    return value;
                } else {
                    return paramConvert(value);
                }
            });
        } catch {
            console.log(pluginName + ":リストパラメータエラー");
            return param;
        }
    }

    //-------------------------------------------
    // これ以降、必要に応じて書き換えてください
    //-------------------------------------------

    // スキルデータベースの値を文字列に置き換える
    function skillDataReplace(dataName, dataNameEx, value) {
        if (value == null) {
            return value;
        }

        // ダメージ欄の項目
        if (dataName === "damage") {
            return skillDataReplaceDamage(dataNameEx, value);
        }

        // メモ欄
        if (dataName === "note") {
            return skillDataReplaceNote(dataNameEx, value);
        }

        // それ以外の項目
        let arr = [];
        switch (dataName) {
            case "stypeId":
                // スキルタイプ
                // データベース「タイプ」の属性を書き換えてください。
                return $dataSystem.skillTypes[value];
            case "hitType":
                // ヒットタイプ
                // 下記の文字を変更してください。
                arr = ["必中", "物理", "魔法"];
                return arr[value];
            case "scope":
                // 効果範囲
                // 下記の文字を変更してください。
                arr = ["なし", "敵単体", "敵全体", "敵1体ランダム", "敵2体ランダム", "敵3体ランダム", "敵4体ランダム", "味方単体（生存）", "味方全体（生存）", "味方単体（戦闘不能）", "味方全体（戦闘不能）", "使用者", "味方単体", "味方全体", "敵味方全体"];
                return arr[value];
            case "occasion":
                // 使用可能時
                // 下記の文字を変更してください。
                arr = ["常時", "バトル", "メニュー", "使用不可"];
                return arr[value];
            case "requiredWtypeId1":
            case "requiredWtypeId2":
                // 必要武器タイプ
                // データベース「タイプ」の武器タイプを変更してください。
                if (value <= 0) {
                    // データベースで「なし」の場合の表現は、下記を変更してください。
                    return "なし";
                }
                return $dataSystem.weaponTypes[value];
            default:
                break;
        }

        // 上記以外はそのまま表示
        return value;
    }

    // ダメージ欄の対応
    function skillDataReplaceDamage(dataNameEx, value) {
        switch (dataNameEx) {
            case "type":
                // タイプ
                // データベース「用語」の略称を使用します。
                // 正式名称を使いたい場合、[3][5]を[2][4]に変更してください。
                const strHp = $dataSystem.terms["basic"][3];
                const strMp = $dataSystem.terms["basic"][5];
                // 上記「用語」に「ダメージ」「回復」などの文字をつなげて表示します。文字部分を変更してください。
                const arr = [`なし`,`${strHp}ダメージ`, `${strMp}ダメージ`,`${strHp}回復`,`${strMp}回復`,`${strHp}吸収`,`${strMp}吸収`];
                return arr[value[dataNameEx]];
            case "elementId":
                // 属性
                // データベース「タイプ」の属性を変更してください。
                if (value[dataNameEx] <= 0) {
                    // データベース上で「なし」の場合の表現は下記を変更してください。
                    return "なし";
                }
                return $dataSystem.elements[value[dataNameEx]];
            case "formula":
                // 計算式をそのまま表示します。
                // がんばって整形してください。
                // let strFormula = value[dataNameEx];
                return value[dataNameEx];
            case "variance":
                // 分散度をそのまま表示します。
                return value[dataNameEx];
            case "critical":
                // 会心。下記の文字を変更してください。
                if (value[dataNameEx]) {
                    return "あり";
                } else {
                    return "なし";
                }
            default:
                break;
        }
        return value;
    }

    // メモ欄の対応
    function skillDataReplaceNote(dataNameEx, value) {
        if (dataNameEx === "") {
            // メモ欄すべてほしいパターン
            return value;
        }

        // <データ名:データ>をオブジェクトに展開。
        const tagRegExp = new RegExp(/(?<=<).*?(?=>)/, "gi");
        const obj = {};
        let searchArr = [];
        while ((searchArr = tagRegExp.exec(value)) !== null) {
            const arr = searchArr[0].replaceAll(" ", "").split(":");
            if (arr.length > 0) {
                obj[arr[0]] = arr[1];
            }
        }

        // 有効なタグの記述がない場合、メモ欄がすべて返っても困るはずなので、空文字を返します。
        return obj[dataNameEx] || "";
    }
})();
