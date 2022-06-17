//=============================================================================
// RPG Maker MZ - Skill Data Ex
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Add original skill data for each actor.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_SkillDataEx.js(ver1.0.0)
 *
 * Add original skill data for each actor.
 *
 * set/get with a plug-in command.
 * embedded in messages using tags.
 * used for damage calculation formulas.
 *
 * There are occasions when you manually enter the skill id and data name.
 * It is recommended to work after the skill database and data names are fixed.
 *
 * - Plugin command
 * -- Set
 * -- Get
 * -- Set(use param variables)
 * -- Get(use param variables)
 * -- Set all skills to all actors
 * -- Set specific skill to  all actors
 * -- Check data
 *
 * - Embed in text display
 *    You can use the tag to replace it with data.
 *    \tag[actorID, skillID, dataName]
 *
 * - Refer to the damage calculation formula
 *  a.sk(skillID, "DataName")
 *  -- The data name must be enclosed in quotes.
 *  -- User skill data will be used.
 *  -- If the enemy uses the skill, it will be replaced with "1".
 *
 * - Script
 *  $gameActors.actor(actorId)._skillDataEx[skillId]["dataName"]
 *
 *  If you write as follows, it works the same as a plug-in command.
 *
 *  get: this.getSkillDataEx(actorId, skillId, "dataName", varNo)
 *       this.getSkillDataExParamV("dataName", varNo)
 *  set: this.setSkillDataEx(actorId, skillID, "dataName", value, operation)
 *       this.setSkillDataExParamV("dataName", varNo)
 *   -- String must be enclosed in quotations.
 *   -- If you want to set the variable value, specify "\\v[X]".
 *   -- "operation" is a number.
 *      0:substitute 1:Addition 2:Subtraction 3:Multiply 4:division
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param sdeTag
 * @text Skill data tag
 * @desc The \tag[actorID, skillID, dataName] in the conversation will be replaced with the data.
 * @default sk
 *
 * @param varActorId
 * @text Variable to store actor id
 * @type variable
 * @desc Save the skill user"s actor id in a variable.
 * @default 0
 *
 * @param varSkillId
 * @text Variable to store skill id
 * @type variable
 * @desc Saves the skill id in a variable when using the skill.
 * @default 0
 *
 * @param commonEventId
 * @text Common event when using skills during battle
 * @type common_event
 * @desc During the battle, a common event will be executed when the skill is used.
 * @default 0
 *
 * @param errorMessage
 * @text Display an error message
 * @type boolean
 * @desc ON: An error is displayed on the console when trying to get non-existent data.
 * @on ON
 * @off OFF
 * @default true
 *
 * @command setData
 * @text Set
 * @desc Set the data of the specified skill.
 *
 * @arg actor
 * @type actor
 * @text Actor
 * @desc Choose an Actor.
 * @default 0
 *
 * @arg skill
 * @type skill
 * @text Skill
 * @desc Choose a skill.
 * @default 0
 *
 * @arg dataName
 * @text Data name
 * @desc Input a data name.
 *
 * @arg operation
 * @type select
 * @text operation
 * @desc If the value is a string, only substitute or addition (concatenation) is valid.
 * @default 0
 *
 * @option substitute
 * @value 0
 * @option Addition
 * @value 1
 * @option Subtraction
 * @value 2
 * @option Multiply
 * @value 3
 * @option division
 * @value 4
 *
 * @arg value
 * @text Value
 * @desc Input a value.
 *
  *
 * @command setDataCommon
 * @text Set(Use parameter variables)
 * @desc Set the data. Actor ID and skill ID use parameter variables.
 *
 * @arg dataName
 * @text Data name
 * @desc Input a data name.
 *
 * @arg operation
 * @type select
 * @text operation
 * @desc If the value is a string, only substitute or addition (concatenation) is valid.
 * @default 0
 *
 * @option substitute
 * @value 0
 * @option Addition
 * @value 1
 * @option Subtraction
 * @value 2
 * @option Multiply
 * @value 3
 * @option division
 * @value 4
 *
 * @arg value
 * @text Value
 * @desc Input a value.
 *
 * @command getData
 * @text Get
 * @desc Acquires the data of the specified skill and saves it in a variable.
 *
 * @arg actor
 * @type actor
 * @text Actor
 * @desc Choose an Actor.
 * @default 0
 *
 * @arg skill
 * @type skill
 * @text Skill
 * @desc Choose a skill.
 * @default 0
 *
 * @arg dataName
 * @text Data name
 * @desc Input a data name.
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @desc Specifies the variable that stores the value.
 * @default 0
 *
 * @command getDataCommon
 * @text Get(Use parameter variables)
 * @desc Get the data. Actor ID and skill ID use parameter variables.
 *
 * @arg dataName
 * @text Data name
 * @desc Input a data name.
 *
 * @arg variable
 * @text Variable
 * @type variable
 * @desc Specifies the variable that stores the value.
 * @default 0
 *
 * @command setAllAcotrOneSkill
 * @text Set specific skill to  all actors
 * @desc Set specific skill data for all actors.
 *
 * @arg skill
 * @type skill
 * @text Skill
 * @desc Choose a skill.
 * @default 0
 *
 * @arg dataName
 * @text Data name
 * @desc Input a data name.
 *
 * @arg operation
 * @type select
 * @text operation
 * @desc If the value is a string, only substitute or addition (concatenation) is valid.
 * @default 0
 *
 * @option substitute
 * @value 0
 * @option Addition
 * @value 1
 * @option Subtraction
 * @value 2
 * @option Multiply
 * @value 3
 * @option division
 * @value 4
 *
 * @arg value
 * @text Value
 * @type multiline_string
 * @desc Input a value.
 *
 * @command setAllActorAllSkill
 * @text Set all skills to all actors
 * @desc Set data for all skills for all actors.
 *
 * @arg dataName
 * @text Data name
 * @desc Input a data name.
 *
 * @arg operation
 * @type select
 * @text operation
 * @desc If the value is a string, only substitute or addition (concatenation) is valid.
 * @default 0
 *
 * @option substitute
 * @value 0
 * @option Addition
 * @value 1
 * @option Subtraction
 * @value 2
 * @option Multiply
 * @value 3
 * @option division
 * @value 4
 *
 * @arg value
 * @text Value
 * @type multiline_string
 * @desc Input a value.
 *
 * @command checkSkill
 * @text Check data
 * @desc Check the data registration status. If no parameter is specified, all data will be displayed.
 *
 * @arg actor
 * @type actor
 * @text Actor
 * @desc Choose an Actor.
 * @default 0
 *
 * @arg skill
 * @type skill
 * @text Skill
 * @desc Choose a skill.
 * @default 0
 *
 * @arg dataName
 * @text Data name
 * @desc Input a data name.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc スキルごとの独自データをアクターに追加します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_SkillDataEx.js(ver0.0.1)
 *
 * スキルごとの独自データをアクターに追加します。
 *
 * ・データ名を自由に決められます。
 * ・値はプラグインコマンドまたはスクリプトで設定・取得します。
 * ・値はタグを使用してメッセージに埋め込めます。
 * ・値はダメージ計算式に利用できます。
 *
 * スキルIDやデータ名を手入力する場面があります。
 * スキルのデータベースとデータ名を固めてから作業するのがおすすめです。
 *
 * ■プラグインコマンド
 * ・設定
 * ・取得
 * ・設定（パラメータの変数を使用）
 * ・取得（パラメータの変数を使用）
 * ・全アクター全スキル設定
 * ・全アクター特定スキル設定
 * ・データ確認
 *
 * ■文章の表示で埋め込む
 *  タグを使うとデータに置換できます。
 *  \tag[アクターID, スキルID,データ名]
 *
 * ■ダメージ計算式で参照する
 *  a.sk(スキルID, "データ名")
 * ・データ名はクォーテーションで囲んでください
 * ・使用者のスキルデータが使用されます
 * ・敵がスキルを使った場合、「1」に置き換わります
 *
 * ■スクリプト
 *  次の記述でデータにアクセスできます。
 *  $gameActors.actor(アクターID)._skillDataEx[スキルID]["データ名"]
 *
 *  また、次の記述でプラグインコマンドと同じ動作になります。
 *  取得：this.getSkillDataEx(アクターID, スキルID, "データ名", 変数番号)
 *      ：this.getSkillDataExParamV("データ名", 変数番号)
 *  設定：this.setSkillDataEx(アクターID, スキルID, "データ名", 操作番号, 値)
 *      ：this.setSkillDataExParamV("データ名", 操作番号, 値)
 *   ・値も含め、文字列はクォーテーションで囲んでください。
 *   ・操作番号は0から4までの数値を指定します。
 *      0:代入、 1:加算、 2:減算、 3:乗算、 4:除算
 *   ・アクターID/スキルID/データ名は、"\\v[X]"とすることで変数の値を使えます。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param sdeTag
 * @text スキルデータのタグ
 * @desc 会話文中に\tag[アクターID, スキルID, データ名]があると、データに置換します。※ダメージ計算式は「a.sk」固定です。
 * @default sk
 *
 * @param varActorId
 * @text アクターIDを保存する変数
 * @type variable
 * @desc スキル使用者のアクターIDを変数に保存します。
 * @default 0
 *
 * @param varSkillId
 * @text スキルIDを保存する変数
 * @type variable
 * @desc スキルを使用した場合、スキルIDを変数に保存します。
 * @default 0
 *
 * @param commonEventId
 * @text バトル中スキル使用時コモンイベント
 * @type common_event
 * @desc バトル中、スキル使用時にコモンイベントを実行します。スキルの使用効果から呼び出すのと同じことです。
 * @default 0
 *
 * @param errorMessage
 * @text エラーメッセージを表示する
 * @type boolean
 * @desc ON:不正なデータ操作をした場合、コンソールにエラー表示。
 * @on ON
 * @off OFF
 * @default true
 *
 * @command setData
 * @text データを設定
 * @desc 指定スキルのデータを設定します。
 *
 * @arg actor
 * @type actor
 * @text アクター
 * @desc アクターを選択します。
 * @default 0
 *
 * @arg skill
 * @type skill
 * @text スキル
 * @desc スキルを選択します。
 * @default 0
 *
 * @arg dataName
 * @text データ名
 * @desc データ名を入力します。
 *
 * @arg operation
 * @type select
 * @text 操作
 * @desc 値をどうするか指定します。値が文字列の場合、代入か加算（連結）のみ有効です。
 * @default 0
 *
 * @option 代入
 * @value 0
 * @option 加算
 * @value 1
 * @option 減算
 * @value 2
 * @option 乗算
 * @value 3
 * @option 除算
 * @value 4
 *
 * @arg value
 * @text 値
 * @type multiline_string
 * @desc 値を入力します。
 *
 * @command getData
 * @text データを取得
 * @desc 指定スキルのデータを取得し、変数に保存します。
 *
 * @arg actor
 * @type actor
 * @text アクター
 * @desc アクターを選択します。
 * @default 0
 *
 * @arg skill
 * @type skill
 * @text スキル
 * @desc スキルを選択します。
 * @default 0
 *
 * @arg dataName
 * @text データ名
 * @desc データ名を入力します。
 *
 * @arg variable
 * @text 変数
 * @type variable
 * @desc 値を保存する変数を指定します。
 * @default 0
 *
 * @command setDataCommon
 * @text データを設定（パラメータ変数を使用）
 * @desc データを設定します。アクターID、スキルIDはパラメータの変数を使用します。
 *
 * @arg dataName
 * @text データ名
 * @desc データ名を入力します。
 *
 * @arg operation
 * @type select
 * @text 操作
 * @desc 値をどうするか指定します。値が文字列の場合、代入か加算（連結）のみ有効です。
 * @default 0
 *
 * @option 代入
 * @value 0
 * @option 加算
 * @value 1
 * @option 減算
 * @value 2
 * @option 乗算
 * @value 3
 * @option 除算
 * @value 4
 *
 * @arg value
 * @text 値
 * @type multiline_string
 * @desc 値を入力します。
 *
 * @command getDataCommon
 * @text データを取得（パラメータ変数を使用）
 * @desc データを取得します。アクターID、スキルIDはパラメータの変数を使用します。
 *
 * @arg dataName
 * @text データ名
 * @desc データ名を入力します。
 *
 * @arg variable
 * @text 変数
 * @type variable
 * @desc 値を保存する変数を指定します。
 * @default 0
 *
 * @command setAllAcotrOneSkill
 * @text 全アクター特定スキル設定
 * @desc 全アクターの特定スキルを設定します。
 *
 * @arg skill
 * @type skill
 * @text スキル
 * @desc スキルを指定します。
 * @default 0
 *
 * @arg dataName
 * @text データ名
 * @desc データ名を入力します。
 *
 * @arg operation
 * @type select
 * @text operation
 * @desc 値の操作方法を指定します。値が文字列の場合、代入か加算（連結）のみ有効です。
 * @default 0
 *
 * @option 代入
 * @value 0
 * @option 加算
 * @value 1
 * @option 減算
 * @value 2
 * @option 乗算
 * @value 3
 * @option 除算
 * @value 4
 *
 * @arg value
 * @text 値
 * @type multiline_string
 * @desc 値を入力します。
 *
 * @command setAllActorAllSkill
 * @text 全アクター全スキル設定
 * @desc 全アクターに全スキル分のデータを設定します。
 *
 * @arg dataName
 * @text データ名
 * @desc データ名を入力します。
 *
 * @arg operation
 * @type select
 * @text 操作
 * @desc 値の操作方法を指定します。値が文字列の場合、代入か加算（連結）のみ有効です。
 * @default 0
 *
 * @option 代入
 * @value 0
 * @option 加算
 * @value 1
 * @option 減算
 * @value 2
 * @option 乗算
 * @value 3
 * @option 除算
 * @value 4
 *
 * @arg value
 * @text 値
 * @type multiline_string
 * @desc 値を入力します。
 *
 * @command checkSkill
 * @text データ確認
 * @desc データの登録状況を確認します。パラメータの指定がなければ全データを表示します。
 *
 * @arg actor
 * @text アクター
 * @type actor
 * @desc アクターを指定します。指定なければ全アクターです。
 * @default 0
 *
 * @arg skill
 * @text スキル
 * @type skill
 * @desc スキルを指定します。指定なければ全スキルです。
 * @default 0
 *
 * @arg dataName
 * @text データ名
 * @desc データ名を入力します。指定なければ全データです。
 *
 */

(() => {
	"use strict";
    const pluginName = "GABA_SkillDataEx";

    // プラグインパラメータ
    const parameters = PluginManager.parameters(pluginName);
	const dispErrorMessage = parameters["errorMessage"]  === "true";
    const varActorId = Number(parameters["varActorId"]) || 0;
    const varSkillId = Number(parameters["varSkillId"]) || 0;
    const commonEventId = Number(parameters["commonEventId"]) || 0;
    const sdeTag = (parameters["sdeTag"] || "").toUpperCase();
    const strSdeRegExp = `/\x1b${sdeTag}\\[(.*?)\\]/gi`;

    // データのモード
    const STR_MODE_SET = "set";
    const STR_MODE_GET = "get";

    // ブラウザの言語
    const isJP = getLanguage() === "ja";

    // エラーパターン
    const STR_ERR_ACTOR_ZERO = isJP ? "(アクター0番)" : "(ACTORID IS ZERO)";
    const STR_ERR_SKILL_ZERO = isJP ? "(スキル0番)" : "(SKILLID IS ZERO)";
    const STR_ERR_DATANAME_EMPTY = isJP ? "(データ名なし)" : "(DATANAME IS EMPTY)";
    const STR_ERR_SKILL_UNDEF = isJP ? "(存在しないスキル)" : "(SKILL UNDEF)";
    const STR_ERR_DATANAME_UNDEF = isJP ? "(存在しないデータ名)" : "(DATANAME UNDEF)";
    const STR_ERR_ZERO_DIVIDE = isJP ? "(0で除算)" : "(ZERO DIVIDE)";
    const STR_ERR_CALC_STRING = isJP ? "(文字列の演算)" : "(CALC STRING)";
    const STR_ERR_CALC_FAILED = isJP ? "(計算失敗)" : "(CALC FAILED)";
    const STR_ERR_WRONG_OPERATION = isJP ? "(操作の値が不正)" : "(WRONG OPERATION)";

    // 敵スキルのフラグ
    let isEnemySkill = false;

    //-------------------------
    // 追加スキルデータ（パラメータの保持用）
    //-------------------------

    function SkillDataEx(mode, args) {
        this._mode = mode;
        this._actor = convertInputData(args.actor) || 0;
        this._skill = convertInputData(args.skill) || 0;
        this._dataName = dataNameAdjustment(args.dataName);
        if (mode === STR_MODE_GET) {
            this._variable = Number(args.variable);
            this._operation = 0;
            this._value = "-";
        } else {
            this._variable = 0;
            this._operation = Number(args.operation || 0);
            this._value = convertInputData(args.value);
        }
        this._inputOperation = args.operation;
    }

    //-------------------------
    // プラグインコマンド
    //-------------------------

    // 設定
    PluginManager.registerCommand(pluginName, "setData", args => {
        const data = new SkillDataEx(STR_MODE_SET, args);
        setData(data);
    });

    // 取得
    PluginManager.registerCommand(pluginName, "getData", args => {
        const data = new SkillDataEx(STR_MODE_GET, args);
        getData(data);
    });

    // 設定（パラメータ変数を利用）
    PluginManager.registerCommand(pluginName, "setDataCommon", args => {
        const data = new SkillDataEx(STR_MODE_SET, args);
        setDataParamV(data);
    });

    // 取得（パラメータ変数を利用）
    PluginManager.registerCommand(pluginName, "getDataCommon", args => {
        const data = new SkillDataEx(STR_MODE_GET, args);
        getDataCommon(data);
    });


    // 全アクター全スキル
    PluginManager.registerCommand(pluginName, "setAllActorAllSkill", args => {
        const data = new SkillDataEx(STR_MODE_SET, args);
        setAllActorAllSkill(data);
    });

    // 全アクター特定スキル
    PluginManager.registerCommand(pluginName, "setAllAcotrOneSkill", args => {
        const data = new SkillDataEx(STR_MODE_SET, args);
        setAllActorOneSkill(data);
    });

    // 登録確認
    PluginManager.registerCommand(pluginName, "checkSkill", args => {
        const data = new SkillDataEx(STR_MODE_GET, args);
        checkSkill(data);
    });

    //-------------------------
    // ダメージ計算から呼び出し
    //-------------------------

    Game_Actor.prototype.sk = function(skill = 0, dataName = "") {
        const obj = createParamObject(this._actorId, skill, dataName, 0, 0, 0);
        const data = new SkillDataEx(STR_MODE_GET, obj);

        return (Number(getDataMain(data)) || 0);
    };

    // 敵の場合1を返す
    Game_Enemy.prototype.sk = function(dataName, skill) {
        return 1;
    };

    //-------------------------
    // スクリプトから呼び出し
    //-------------------------
    Game_Interpreter.prototype.getSkillDataEx = function(actor, skill, dataName = "", variable = 0) {
        const obj = createParamObject(actor, skill, dataName, variable, 0, 0);
        const data = new SkillDataEx(STR_MODE_GET, obj);
        getData(data);
    };
    Game_Interpreter.prototype.getSkillDataExParamV = function(dataName = "", variable = 0) {
        const obj = createParamObject(0, 0, dataName, variable, 0, 0);
        const data = new SkillDataEx(STR_MODE_GET, obj);
        getDataCommon(data);
    };
    Game_Interpreter.prototype.setSkillDataEx = function(actor, skill, dataName = "", operation = 0, value = 0) {
        const obj = createParamObject(actor, skill, dataName, 0, operation, value);
        const data = new SkillDataEx(STR_MODE_SET, obj);
        setData(data);
    };
    Game_Interpreter.prototype.setSkillDataExParamV = function(dataName = "", operation = 0, value = 0) {
        const obj = createParamObject(0, 0, dataName, 0, operation, value);
        const data = new SkillDataEx(STR_MODE_SET, obj);
        setDataParamV(data);
    };

    // プラグインコマンドのargsと同等のオブジェクトを作成
    function createParamObject(actor, skill, dataName, variable, operation, value) {
        const obj = {
            actor : actor,
            skill : skill,
            dataName : dataName,
            variable : variable,
            operation : operation,
            value : value
        }
        return obj;
    };

    //-------------------------
    // 既存の関数を拡張
    //-------------------------

    // スキル使用時、パラメータのコモンイベントを追加
    const _Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
    Game_Action.prototype.applyGlobal = function() {
        if (varActorId !== 0) {
            $gameVariables._data[varActorId] = this._subjectActorId;
        }

        if (varSkillId !== 0) {
            $gameVariables._data[varSkillId] = this._item._itemId;
        }

        //バトルシーンに限定
        if (SceneManager._scene.constructor != Scene_Battle) {
            return;
        }

        if (commonEventId !== 0) {
            $gameTemp.reserveCommonEvent(commonEventId);
        }

        _Game_Action_applyGlobal.apply(this, arguments);
    };

    // アクターにスキルデータを追加
    const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
    Game_Actor.prototype.initMembers = function() {
        _Game_Actor_initMembers.apply(this, arguments);

        this._skillDataEx = new Array($dataSkills.length);
        for(let data of $dataSkills) {
            if(data) {
                this._skillDataEx[data.id] = {name: data.name};
            }
        }
    };

    // 戦闘アクションスタート時、敵かどうか判定
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        _BattleManager_startAction.apply(this, arguments);
        if (BattleManager._subject != null && BattleManager._subject.constructor === Game_Enemy) {
            isEnemySkill = true;
        } else {
            isEnemySkill = false;
        }
    };

    // 戦闘終了時、判定をリセット
    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.apply(this, arguments);

        isEnemySkill = false;
    };

    //-------------------------
    //  データ設定
    //-------------------------

	// 全アクターに全スキルデータを設定
	function setAllActorAllSkill(data) {
        for(const aData of $dataActors) {
            if (!aData) {
                continue;
            }
            data._actor = aData.id;
            for(const sData of $dataSkills) {
                if (!sData) {
                    continue;
                }
                data._skill = sData.id;
                setDataMain(data);
            }
        }
    }

    // 全アクターの特定スキルを設定
	function setAllActorOneSkill(data) {
        for(let aData of $dataActors) {
            if (!aData) {
                continue;
            }
            data._actor = aData.id;
            setDataMain(data);
        }
    }

    // スキルデータを設定
	function setData(data) {
        setDataMain(data);
    }

    // スキルデータを設定（スキル変数利用）
    function setDataParamV(data) {
        data._actor = $gameVariables.value(varActorId);
        data._skill = $gameVariables.value(varSkillId);

        setData(data);
    }

    // データ設定メイン
    function setDataMain (data) {
        if (isString(data._operation)) {
            displayError(STR_ERR_WRONG_OPERATION, data);
            return;
        }

        if (isActorZero(data)){
            return;
        }

        if (isInputError(data)) {
            return;
        }

        const target = $gameActors.actor(data._actor)._skillDataEx[data._skill];
        let currentValue =target[data._dataName];
        if (currentValue == null) {
            // 指定のデータ名が登録されていない
            if (data._operation === 0) {
                target[data._dataName] = data._value;
                return;
            } else {
                isInputError(data);
                displayError(STR_ERR_CALC_FAILED, data);
                return;
            }
        }

        if (isString(currentValue) || isString(data._value)) {
            if (data._operation >= 2) {
                displayError(STR_ERR_CALC_STRING, data);
                return;
            }
        }

        switch (data._operation) {
            case 0:// 代入
                target[data._dataName] = checkSafeInteger(data._value);
                break;
            case 1:// 加算・連結
                target[data._dataName] = checkSafeInteger(currentValue + data._value);
                break;
            case 2:// 減算
                target[data._dataName] = checkSafeInteger(currentValue - data._value);
                break;
            case 3:// 乗算
                target[data._dataName] = checkSafeInteger(currentValue * data._value);
                break;
            case 4:// 除算
                if (data._value === 0) {
                    target[data._dataName] = 0;
                    displayError(STR_ERR_ZERO_DIVIDE, data);
                } else {
                    target[data._dataName] = checkSafeInteger(currentValue / data._value);
                }
                break;
        }
    }

    //-------------------------
    //  データ取得
    //-------------------------

    // スキルデータを取得し、変数に設定
    function getData(data) {
        const result = getDataMain(data);
        $gameVariables.setValue(data._variable, result);
    }

    // スキルデータを取得し、変数に設定（スキル変数利用）
    function getDataCommon(data) {
        data._actor = $gameVariables.value(varActorId);
        data._skill = $gameVariables.value(varSkillId);
        const result = getDataMain(data);
        $gameVariables.setValue(data._variable, result);
    }

    // 取得メイン
    function getDataMain(data) {
        if (isActorZero(data)){
            return;
        }

        if (!isInputError(data)) {
            return $gameActors.actor(data._actor)._skillDataEx[data._skill][data._dataName];
        } else {
            return 0;
        }
    }

    //-------------------------
    //  共通処理
    //-------------------------

    // 変数指定、文字列、数値を型変換
    function convertInputData(value) {
        const variableRegExp = new RegExp(/(?<=v\[).*?(?=\])/, "i");
        const arr = variableRegExp.exec(value);

        if (arr != null) {
            // 変数指定
            return $gameVariables.value(arr[0]);
        } else {
            // 直接指定
            if (isString(value)) {
                return value;
            } else {
                return Number(value);
            }
        }
    }

    // データ名のクォーテーション有無を吸収
    function dataNameAdjustment(dataName = "") {
        if (dataName === "") {
            return dataName;
        }

        // 誤入力でデータ名に数値が入るかも
        if (!isString(dataName)) {
            return "";
        }

        // クォーテーション除去
        if (dataName.indexOf("\"") === 0
            && dataName.lastIndexOf("\"") === dataName.length - 1) {
                dataName = dataName.replace(/^"/, "");
                dataName = dataName.replace(/"$/, "");
        } else if (dataName.indexOf("\'") === 0
            && dataName.lastIndexOf("\'") === dataName.length - 1) {
                dataName = dataName.replace(/^'/, "");
                dataName = dataName.replace(/'$/, "");
        } else if (dataName.indexOf("\`") === 0
            && dataName.lastIndexOf("\`") === dataName.length - 1) {
                dataName = dataName.replace(/^`/, "");
                dataName = dataName.replace(/`$/, "");
        }
        dataName = `${dataName}`;
        // 変数指定に対応
        dataName = convertInputData(dataName);

        return dataName;
    }

    // アクターIDがゼロかチェック。敵の行動時は無視
    function isActorZero(data) {
        if (!isEnemySkill && data._actor === 0) {
            displayError(STR_ERR_ACTOR_ZERO, data);
        }
        return data._actor === 0 ? true : false;
    }

    // 有効な指定かチェック。エラーならtrue
    function isInputError(data) {
        // 引数のチェック
        if (data._actor === 0) {
            displayError(STR_ERR_ACTOR_ZERO, data);
            return true;
        }
        if (data._skill === 0) {
            displayError(STR_ERR_SKILL_ZERO, data);
            return true;
        }
        if (data._dataName === "") {
            displayError(STR_ERR_DATANAME_EMPTY, data);
            return true;
        }

        // データの存在チェック（代入なら登録するので無視）
        if (!(data._mode === STR_MODE_SET && data._operation === 0)) {
            if ($gameActors.actor(data._actor)._skillDataEx[data._skill] == null) {
                displayError(STR_ERR_SKILL_UNDEF, data);
                return true;
            } else if ($gameActors.actor(data._actor)._skillDataEx[data._skill][data._dataName] == null) {
                displayError(STR_ERR_DATANAME_UNDEF, data);
                return true;
            }
        }
        return false;
    }

    // エラーメッセージ表示
    function displayError(type, data) {
        if (dispErrorMessage) {
            const op = getOperationString(data);
            console.error(`SkillDataEx${type}：mode(${data._mode}) actor(${data._actor}) skill(${data._skill}) dataname(${data._dataName}) value(${data._value}) operation(${op})`);
        }
    }

    // エラーメッセージ用の操作の文字列
    function getOperationString(data) {
        if (data._mode === STR_MODE_SET) {
            if (data._operation === "" || isNaN(data._operation)) {
                return data._inputOperation;
            } else {
                switch (data._operation) {
                    case 0:
                        return "=";
                    case 1:
                        return "+";
                    case 2:
                        return "-";
                    case 3:
                        return "*";
                    case 4:
                        return "/";
                    default:
                        break;
                }
            }
        }
        return " ";
    }

    //------------------------
    //タグ処理
    //------------------------

    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        if (sdeTag === "") {
            return _Window_Base_convertEscapeCharacters.apply(this, arguments);
        }

        // バックスラッシュ表示指定を置換
        const STR_GABA_SDE_REPLACE = "GABA_SDE_BS_Replace";
        arguments[0] = arguments[0].replaceAll("\\\\", STR_GABA_SDE_REPLACE);

        let myText = _Window_Base_convertEscapeCharacters.apply(this, arguments);

        // 独自タグを処理
        myText = myText.replace(getSdeRegExp(), (_, p1) =>
            getSdeValue(p1)
        );

        // 独自タグの処理結果、\i[X]などが発生する可能性あり。再度置換。
        myText = myText.replaceAll("\\", "\x1b");

        // バックスラッシュ表示指定を反映させる。
        myText = myText.replaceAll(STR_GABA_SDE_REPLACE, "\\");

        return myText;
    };

    // タグによるデータ取得
    function getSdeValue(p1) {
        const arr = p1.replaceAll(" ", "").split(",");

        if (arr.length !== 3) {
            return "";
        }

        arr[2] = dataNameAdjustment(arr[2]);
        const obj = createParamObject(arr[0], arr[1], arr[2], 0, 0, 0);
        const data = new SkillDataEx(STR_MODE_GET, obj);

        return getDataMain(data);
    }

    // evalの代替
    function getSdeRegExp() {
        return Function(`"use strict";return (${strSdeRegExp})`)();
    }

    //------------------------
    // データ確認（コンソールに表示）
    //------------------------

    function checkSkill(data) {
        const isAllDataName = data._dataName.trim() === "";

        if (data._actor === 0 && data._skill === 0 && isAllDataName) {
            checkSkillAll();
            return;
        }

        for(const aData of filterActors(data._actor)) {
            if (aData) {
                dispHeader(aData, data);
                const skillList = filterSkillList($gameActors.actor(aData.id)._skillDataEx, data);
                console.log(skillList);
            }
        }
    }

    // アクターの絞り込み
    function filterActors(actor) {
        if (actor === 0) {
            return $dataActors;
        } else {
            return $dataActors.filter(element => element != null && element.id === actor);
        }
    }

    // スキルのしぼり込み。データ名もチェック
    function filterSkillList(list, data) {
        const skillList = data._skill === 0 ? list : [list[data._skill]];
        if (data._dataName.trim() !== "") {
            const workArr = [];
            for (const sData of skillList) {
                if (sData == null) {
                    continue;
                }
                const obj = {};
                obj["name"] = sData["name"];
                obj[data._dataName] = sData[data._dataName];
                workArr.push(obj);
            }
            return workArr.length === 1 ? workArr[0] : workArr;
        } else {
            return skillList.length === 1 ? skillList[0] : skillList;
        }
    }

    // コンソールに全データ表示
    function checkSkillAll() {
        for(const data of $dataActors) {
            if (data) {
                console.log(`${data.id}_${data.name}`);
                console.log($gameActors.actor(data.id)._skillDataEx);
            }
        }
    }

    // コンソールにヘッダー表示
    function dispHeader(actor, data) {
        const skillId = data._skill != 0 ? `  skill:${data._skill}` : "";
        console.log(`${actor.id}:${actor.name}${skillId}`);
    }

    //--------------------------------------------
    // その他

    // 文字列判定。
    function isString(value) {
        if (value == null) return false;
        if (value.toString().trim() === "") return true;
        return isNaN(value);
    }

    // 数値の最大最小チェック。
    function checkSafeInteger(value) {
        if (isString(value)) {
            return value;
        }
        if (Number.isSafeInteger(value)) {
            return value;
        }
        if (value > 0) {
            return Number.MAX_SAFE_INTEGER;
        } else {
            return Number.MIN_SAFE_INTEGER;
        }
    }

    // 言語取得
    function getLanguage() {
        return (window.navigator.languages && window.navigator.languages[0]) ||
        window.navigator.language ||
        window.navigator.userLanguage ||
        window.navigator.browserLanguage;
    }

})();
