/*:
@target MZ
@plugindesc Skill replacement system v1.5.0
@author unagi ootoro
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AbilitySystem.js

@help
It is a plug-in that introduces a system that allows you to change skills.

By introducing this plug-in, you can give each actor skills
You can introduce a system that allows you to select and equip some of them.
It is also possible to add cost to the skill.

【How to use】
・ Give actors skills
In the memo field of the skill you want to be able to replace
<AbilitySkill>
Please describe. After that, by acquiring the skill with the event command
You can give the actor skills.

・Equip skills
By opening the skill equipment scene from the menu, you can equip the skill that the actor has.

・Set a maximum cost value for an actor or class
In the memo field of the actor or class
<MaxCost: Cost value>
You can set the maximum cost value for an actor or class by stating.
Set the cost value to an integer greater than or equal to 0.
* 1 To reflect the maximum cost set for each class, it is also necessary to set the plug-in parameter "Cost management by classes".
* 2 The maximum cost set for each class is managed for each class.

・Set a cost value for the skill
In the skill memo field
<AbilityCost: Cost value>
You can set the cost value for the skill by writing.
Set the cost value to an integer greater than or equal to 0.

・Temporarily increase costs with equipment
In the memo field of the weapon or armor
<AddCost: Cost value>
By stating, you can temporarily increase the cost while equipping the corresponding weapon / armor.
Set the cost value to an integer greater than or equal to 0.
If the maximum cost is reduced by removing the corresponding weapon / armor,
The skill for the cost over is automatically removed according to the maximum cost after the reduction.

・Skill automatic equipment when acquiring skills
When the switch specified in "Skill automatic equipment activation switch ID" is turned on
If there is an empty equipment slot when acquiring the skill, the skill will be automatically equipped.
* If you want to include the initial ability skill in the automatic equipment target,
you need to set "Skill automatic equipment activation switch initial value" to true.

【License】
This plugin is available under the terms of the MIT license.


@param EnabledAbilitySystemSwitchId
@text Ability menu activation switch ID
@type switch
@default 0
@desc
Specify the switch ID that determines whether the menu ability management screen is valid or invalid.

@param EnableAutoEquipSkillSwitchId
@text Skill automatic equipment activation switch ID
@type switch
@default 0
@desc
Specify the switch ID that enables automatic equipment when acquiring skills.

@param EnableUsableAllSkillsByMapSceneSwitchId
@text Map scene All skills available Activation switch ID
@type switch
@default 0
@desc
When enabled, specify a switch ID that will enable all available skills in the map scene.

@param EnableAutoEquipSkillSwitchInitValue
@text Skill automatic equipment activation switch initial value
@type boolean
@default true
@desc
Set the initial value of the skill automatic equipment activation switch.

@param MaxEquipAbilities
@text Maximum number of abilities that can be equipped
@type number
@default 4
@desc
Specifies the number of abilities that can be equipped.

@param EnableCost
@text Skill cost activation
@type boolean
@default true
@desc
Activate the cost of the skill.

@param CostManagementByClasses
@text Cost management by classes
@type boolean
@default false
@desc
Try to manage costs by classes by actor.

@param EquipAbilitySe
@text Ability Equipment SE
@type struct <SE>
@default {"FileName": "Skill1", "Volume": "90", "Pitch": "100", "Pan": "0"}
@desc
Specify the SE to play when the ability is equipped.

@param WindowSize
@text window size
@type struct <WindowSize>
@default {"StatusAbilityWindowWidth": "300", "StatusAbilityWindowHeight": "200"}
@desc
Set the size of various windows.

@param Text
@text Display text
@type struct <Text>
@default {"MenuAbilitySystemText": "Ability", "CostText": "Cost:", "EmptySlotText": "------"}
@desc
Sets the text used in the game.

@param BackgroundImage
@text Background image
@type struct<BackgroundImage>
@desc
Specify the background image of the quest scene in the menu.


@command StartAbilityScene
@text Ability scene start
@desc
Start the ability scene.


@command ChangeEquipAbilitySkill
@text Equipment ability skill change
@desc
Change the equipped ability skill.

@arg ActorId
@text Actor ID
@type actor
@desc
Specifies the actor whose ability skill is to be changed.

@arg SlotIndex
@text slot index
@type number
@desc
Specifies the index of the slot for which you want to change the ability skill. If -1 is specified, it will be set to an empty frame.

@arg SkillId
@text Skill ID
@type skill
@desc
Specify the skill to be changed. Please specify the skill that can be equipped. Specifying 0 removes the skill.


@command GetMaxCost
@text Get maximum cost
@desc
Gets the maximum cost of the specified actor and stores it in a variable.

@arg ActorId
@text Actor ID
@type actor
@desc
Specifies the actor to get the maximum cost.

@arg VariableId
@text variable ID
@type variable
@desc
Specify the variable ID that stores the maximum cost obtained.


@command SetMaxCost
@text Maximum cost setting
@desc
Sets the maximum cost for the specified actor.

@arg ActorId
@text Actor ID
@type actor
@desc
Specify the actor for which you want to set the maximum cost.

@arg VariableId
@text variable ID
@type variable
@desc
Specifies the variable ID that stores the value that sets the maximum cost.

@arg Value
@text Maximum cost value
@type number
@desc
Specifies the value that sets the maximum cost. If a variable ID is set, that will take precedence.
*/


/*~struct~SE:
@param FileName
@text SE filename
@type file
@dir audio / se
@ default Skill1
@desc
Specify the file name of the SE to play.

@param Volume
@text SE volume
@type number
@default 90
@desc
Specify the volume of SE to be played.

@param Pitch
@text SE pitch
@type number
@default 100
@desc
Specify the pitch of the SE to play.

@param Pan
@text SE phase
@type number
@default 0
@desc
Specify the pan of the SE to play.
*/


/*~struct~WindowSize:
@param StatusAbilityWindowWidth
@text Status window width
@type number
@default 300
@desc
Specifies the width of the status window.

@param StatusAbilityWindowHeight
@text Status window height
@type number
@default 200
@desc
Specifies the height of the status window.
*/


/*~struct~Text:
@param MenuAbilitySystemText
@text Menu display text
@type string
@default ability
@desc
Specify the name of the ability management screen to be added to the menu.

@param CostText
@text cost text
@type string
@default cost:
@desc
Specify the cost wording to be displayed on the ability management screen.

@param EmptySlotText
@text Ability release text
@type string
@default ------
@desc Specify a blank text.
*/


/*~struct~BackgroundImage:
@param FileName
@type file
@default {"FileName": "", "BackgroundImage2": "[]", "BackgroundImage2XOfs": "240", "BackgroundImage2YOfs": "300"}
@dir img
@desc
Specify the file name of the background image of the scene.

@param BackgroundImage2
@type struct <BackgroundImage2> []
@default []
@dir img
@desc
Specify the file name of the image to be added to the background image of the scene.

@param BackgroundImage2XOfs
@type number
@ default 240
@desc
Specifies the X coordinate offset of the image to add to the background image of the scene.

@param BackgroundImage2YOfs
@type number
@default 300
@desc
Specifies the Y coordinate offset of the image to add to the background image of the scene.
*/

/*~struct~BackgroundImage2:
@param FileName
@type file
@dir img
@desc
Specify the file name of the background image of the scene.

@param ActorId
@type actor
@desc
Specify the actor ID.
*/



/*:ja
@target MZ
@plugindesc スキル付け替えシステム v1.5.0
@author うなぎおおとろ
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AbilitySystem.js

@help
スキルを付け替えられるシステムを導入するプラグインです。

このプラグインを導入することで、アクターごとにスキルを持たせておいて、
その中からいくつか選んで装備するというようなシステムを導入することができます。
また、スキルにコストを持たせることも可能です。

【使用方法】
・アクターにスキルを持たせる
付け替えられるようにしたいスキルのメモ欄に
<AbilitySkill>
と記載してください。その上でイベントコマンドで当該スキルを取得することで
アクターにスキルを持たせることができます。

・スキルを装備する
スキル装備シーンをメニューから開くことによって、アクターが持っているスキルを装備することができます。

・アクターまたは職業に最大コスト値を設定する
アクターまたは職業のメモ欄に
<MaxCost: コスト値>
と記載することで、アクターまたは職業に最大コスト値を設定することができます。
コスト値には0以上の整数を設定してください。
※1 職業に設定した最大コストを反映するにはプラグインパラメータ「職業別コスト管理」の設定も合わせて必要になります。
※2 職業に設定した最大コストはアクターごとの職業ごとに管理されます。

・スキルにコスト値を設定する
スキルのメモ欄に
<AbilityCost: コスト値>
と記載することで、スキルにコスト値を設定することができます。
コスト値には0以上の整数を設定してください。

・装備で一時的にコストを増やす
武器または防具のメモ欄に
<AddCost: コスト値>
と記載することで、該当の武器/防具を装備中は一時的にコストを増やすことができます。
コスト値には0以上の整数を設定してください。
なお、該当の武器/防具を外したことによって最大コストが減った場合、
減った後の最大コストに合わせて自動的にコストオーバー分のスキルを外します。

・スキル取得時のスキル自動装備
「スキル自動装備有効化スイッチID」で指定したスイッチをONにすると
スキル取得時に空いている装備スロットがあればスキルを自動で装備するようになります。
※初期アビリティスキルを自動装備対象に含める場合は「スキル自動装備有効化スイッチ初期値」をtrueに設定する必要があります。

【ライセンス】
このプラグインは、MITライセンスの条件の下で利用可能です。


@param EnabledAbilitySystemSwitchId
@text アビリティメニュー有効化スイッチID
@type switch
@default 0
@desc
メニューのアビリティ管理画面の有効/無効を判定するスイッチIDを指定します。0の場合は常に有効となります。

@param EnableAutoEquipSkillSwitchId
@text スキル自動装備有効化スイッチID
@type switch
@default 0
@desc
スキル取得時の自動装備を有効化するスイッチIDを指定します。0の場合は常に無効となります。

@param EnableUsableAllSkillsByMapSceneSwitchId
@text マップシーン全スキル使用可能有効化スイッチID
@type switch
@default 0
@desc
有効にするとマップシーンでは装備可能な全スキルが使用可能になるスイッチIDを指定します。0の場合は常に有効となります。

@param EnableAutoEquipSkillSwitchInitValue
@text スキル自動装備有効化スイッチ初期値
@type boolean
@default true
@desc
スキル自動装備有効化スイッチの初期値を設定します。

@param MaxEquipAbilities
@text 最大装備可能アビリティ数
@type number
@default 4
@desc
装備可能なアビリティの数を指定します。

@param EnableCost
@text スキルコスト有効化
@type boolean
@default true
@desc
スキルのコストを有効化します。

@param CostManagementByClasses
@text 職業別コスト管理
@type boolean
@default false
@desc
コストをアクターごとの職業ごとに管理するようにします。

@param EquipAbilitySe
@text アビリティ装備SE
@type struct<SE>
@default {"FileName":"Skill1","Volume":"90","Pitch":"100","Pan":"0"}
@desc
アビリティ装備時に再生するSEを指定します。

@param WindowSize
@text ウィンドウサイズ
@type struct<WindowSize>
@default {"StatusAbilityWindowWidth":"300","StatusAbilityWindowHeight":"200"}
@desc
各種ウィンドウのサイズを設定します。

@param Text
@text 表示テキスト
@type struct<Text>
@default {"MenuAbilitySystemText":"アビリティ","CostText":"コスト：","EmptySlotText":"------"}
@desc
ゲーム中で使用されるテキストを設定します。

@param BackgroundImage
@text メニュー背景画像
@type struct<BackgroundImage>
@desc
シーンの背景画像を指定します。


@command StartAbilityScene
@text アビリティシーン開始
@desc
アビリティシーンを開始します。


@command ChangeEquipAbilitySkill
@text 装備アビリティスキル変更
@desc
装備しているアビリティスキルを変更します。

@arg ActorId
@text アクターID
@type actor
@desc
アビリティスキルを変更するアクターを指定します。

@arg SlotIndex
@text スロットインデックス
@type number
@min -1
@desc
アビリティスキルを変更するスロットのインデックスを指定します。-1を指定すると空いている枠に設定します。

@arg SkillId
@text スキルID
@type skill
@desc
変更対象のスキルを指定します。スキルは装備可能なものを指定してください。0を指定するとスキルを外します。


@command GetMaxCost
@text 最大コスト取得
@desc
指定したアクターの最大コストを取得し、変数に格納します。

@arg ActorId
@text アクターID
@type actor
@desc
最大コストを取得するアクターを指定します。

@arg ClassId
@text 職業ID
@type class
@desc
最大コスト取得対象の職業IDを指定します。アクター単位でコストを管理する場合は0を指定してください。

@arg VariableId
@text 変数ID
@type variable
@desc
取得した最大コストを格納する変数IDを指定します。


@command SetMaxCost
@text 最大コスト設定
@desc
指定したアクターの最大コストを設定します。

@arg ActorId
@text アクターID
@type actor
@desc
最大コストを設定するアクターを指定します。

@arg ClassId
@text 職業ID
@type class
@desc
最大コスト設定対象の職業IDを指定します。アクター単位でコストを管理する場合は0を指定してください。

@arg VariableId
@text 変数ID
@type variable
@desc
最大コストを設定する値が格納された変数IDを指定します。

@arg Value
@text 最大コスト値
@type number
@desc
最大コストを設定する値を指定します。変数IDが設定されている場合はそちらが優先されます。
*/


/*~struct~SE:ja
@param FileName
@text SEファイル名
@type file
@dir audio/se
@default Skill1
@desc
再生するSEのファイル名を指定します。

@param Volume
@text SE音量
@type number
@default 90
@desc
再生するSEのvolumeを指定します。

@param Pitch
@text SEピッチ
@type number
@default 100
@desc
再生するSEのpitchを指定します。

@param Pan
@text SE位相
@type number
@default 0
@desc
再生するSEのpanを指定します。
*/


/*~struct~WindowSize:ja
@param StatusAbilityWindowWidth
@text ステータスウィンドウ横幅
@type number
@default 300
@desc
ステータスウィンドウの横幅を指定します。

@param StatusAbilityWindowHeight
@text ステータスウィンドウ縦幅
@type number
@default 200
@desc
ステータスウィンドウの縦幅を指定します。
*/


/*~struct~Text:ja
@param MenuAbilitySystemText
@text メニュー表示テキスト
@type string
@default アビリティ
@desc
メニューに追加するアビリティ管理画面の名称を指定します。

@param CostText
@text コストテキスト
@type string
@default コスト：
@desc
アビリティ管理画面で表示するコストの文言を指定します。

@param EmptySlotText
@text アビリティ解除テキスト
@type string
@default ------
@desc 空欄のテキストを指定します。
*/


/*~struct~BackgroundImage:
@param FileName
@type file
@default {"FileName":"","BackgroundImage2":"[]","BackgroundImage2XOfs":"240","BackgroundImage2YOfs":"300"}
@dir img
@desc
シーンの背景画像のファイル名を指定します。

@param BackgroundImage2
@type struct<BackgroundImage2>[]
@default []
@dir img
@desc
シーンの背景画像に追加する画像のファイル名を指定します。

@param BackgroundImage2XOfs
@type number
@default 240
@desc
シーンの背景画像に追加する画像のX座標オフセットを指定します。

@param BackgroundImage2YOfs
@type number
@default 300
@desc
シーンの背景画像に追加する画像のY座標オフセットを指定します。
*/

/*~struct~BackgroundImage2:
@param FileName
@type file
@dir img
@desc
シーンの背景画像のファイル名を指定します。

@param ActorId
@type actor
@desc
アクターIDを指定します。
*/

const AbilitySystemPluginName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];

const AbilitySystemClassAlias = (() => {
"use strict";


class PluginParamsParser {
    static parse(params, typeData, predictEnable = true) {
        return new PluginParamsParser(predictEnable).parse(params, typeData);
    }

    constructor(predictEnable = true) {
        this._predictEnable = predictEnable;
    }

    parse(params, typeData, loopCount = 0) {
        if (++loopCount > 255) throw new Error("endless loop error");
        const result = {};
        for (const name in typeData) {
            if (params[name] === "" || params[name] === undefined) {
                result[name] = null;
            } else {
                result[name] = this.convertParam(params[name], typeData[name], loopCount);
            }
        }
        if (!this._predictEnable) return result;
        if (typeof params === "object" && !(params instanceof Array)) {
            for (const name in params) {
                if (result[name]) continue;
                const param = params[name];
                const type = this.predict(param);
                result[name] = this.convertParam(param, type, loopCount);
            }
        }
        return result;
    }

    convertParam(param, type, loopCount) {
        if (typeof type === "string") {
            return this.cast(param, type);
        } else if (typeof type === "object" && type instanceof Array) {
            const aryParam = JSON.parse(param);
            if (type[0] === "string") {
                return aryParam.map(strParam => this.cast(strParam, type[0]));
            } else {
                return aryParam.map(strParam => this.parse(JSON.parse(strParam), type[0]), loopCount);
            }
        } else if (typeof type === "object") {
            return this.parse(JSON.parse(param), type, loopCount);
        } else {
            throw new Error(`${type} is not string or object`);
        }
    }

    cast(param, type) {
        switch(type) {
        case "any":
            if (!this._predictEnable) throw new Error("Predict mode is disable");
            return this.cast(param, this.predict(param));
        case "string":
            return param;
        case "number":
            if (param.match(/^\-?\d+\.\d+$/)) return parseFloat(param);
            return parseInt(param);
        case "boolean":
            return param === "true";
        default:
            throw new Error(`Unknow type: ${type}`);
        }
    }

    predict(param) {
        if (param.match(/^\-?\d+$/) || param.match(/^\-?\d+\.\d+$/)) {
            return "number";
        } else if (param === "true" || param === "false") {
            return "boolean";
        } else {
            return "string";
        }
    }
}

// Parse plugin parameters.
const typeDefine = {
    EquipAbilitySe: {},
    WindowSize: {},
    Text: {},
    BackgroundImage: {
        BackgroundImage2: [{}]
    },
};

const params = PluginParamsParser.parse(PluginManager.parameters(AbilitySystemPluginName), typeDefine);

const EnabledAbilitySystemSwitchId = params.EnabledAbilitySystemSwitchId;
const EnableAutoEquipSkillSwitchId = params.EnableAutoEquipSkillSwitchId;
const EnableUsableAllSkillsByMapSceneSwitchId = params.EnableUsableAllSkillsByMapSceneSwitchId;
const EnableAutoEquipSkillSwitchInitValue = params.EnableAutoEquipSkillSwitchInitValue;
const MaxEquipAbilities = params.MaxEquipAbilities;
const EnableCost = params.EnableCost;
const CostManagementByClasses = params.CostManagementByClasses;
const EquipAbilitySe = params.EquipAbilitySe;
const WindowSize = params.WindowSize;
const Text = params.Text;
const BackgroundImage = params.BackgroundImage;

const FACE_HEIGHT_WHEN_ENABLE_CONST = 80;
const FACE_HEIGHT_WHEN_DISABLE_CONST = 120;

class AbilitySystemUtils {
    static isAbilitySkill(skillData) {
        return skillData.meta.AbilitySkill;
    }

    static getSkillCost(skillId) {
        const skill = $dataSkills[skillId];
        if (!skill) throw new Error(`Unknow skill id ${skillId}`);
        if (skill.meta.AbilityCost) {
            return parseInt(skill.meta.AbilityCost);
        }
        return 0;
    }

    static getMaxCostByActorId(actorId) {
        const actorData = $dataActors[actorId];
        if (!actorData) throw new Error(`Unknow actor id ${actorId}`);
        if (actorData.meta.MaxCost) {
            return parseInt(actorData.meta.MaxCost);
        }
        return 0;
    }

    static getMaxCostByClassId(classId) {
        const classData = $dataClasses[classId];
        if (!classData) throw new Error(`Unknow class id ${classId}`);
        if (classData.meta.MaxCost) {
            return parseInt(classData.meta.MaxCost);
        }
        return 0;
    }

    static getAddCost(actor) {
        const equipAddCosts = actor.equips().map(equip => {
            if (!equip) return 0;
            return equip.meta.AddCost ? parseInt(equip.meta.AddCost) : 0;
        });
        return equipAddCosts.reduce((total, cost) => total + cost, 0);
    }

    static isAutoEquipSkill() {
        if (EnableAutoEquipSkillSwitchId > 0) return $gameSwitches.value(EnableAutoEquipSkillSwitchId);
        return false;
    }

    static isEnableUsableAllSkillsByMapScene() {
        if (EnableUsableAllSkillsByMapSceneSwitchId > 0 && $gameSwitches.value(EnableUsableAllSkillsByMapSceneSwitchId)) {
            if (!(SceneManager._scene instanceof Scene_Battle)) {
                return true;
            }
        }
        return false;
    }
}

class Scene_Ability extends Scene_MenuBase {
    create() {
        super.create();
        this.createHelpWindow();
        this.createEquipAbilitiesWindow();
        this.createHasAbilitiesWindow();
        this.createStatusAbilityWindow();
    }

    isReady() {
        const result = super.isReady();
        if (!result) return false;
        if (BackgroundImage) {
            if (BackgroundImage.FileName) {
                const backgroundImage1 = ImageManager.loadBitmap("img/", BackgroundImage.FileName);
                if (!backgroundImage1.isReady()) return false;
            }
            if (BackgroundImage.BackgroundImage2) {
                for (const img2 of BackgroundImage.BackgroundImage2) {
                    if (img2.FileName) {
                        const backgroundImage2 = ImageManager.loadBitmap("img/", img2.FileName);
                        if (!backgroundImage2.isReady()) return false;
                    }
                }
            }
        }
        return true;
    }

    start() {
        super.start();
        this.updateActor();
        this.restart();
    }

    restart() {
        this._windowEquipAbilities.setActor(this.actor());
        this._windowHasAbilities.setActor(this.actor());
        this._windowStatusAbility.setActor(this.actor());
        this._windowEquipAbilities.refresh();
        this._windowHasAbilities.refresh();
        this._windowStatusAbility.refresh();
        this._windowEquipAbilities.show();
        this._windowHasAbilities.show();
        this._windowStatusAbility.show();
        this._windowEquipAbilities.activate();
        this._windowEquipAbilities.select(0);
        this._windowHasAbilities.deactivate();
        this._windowHasAbilities.deselect();
    }

    createBackground() {
        this._backgroundSprite = new Sprite();
        if (BackgroundImage && BackgroundImage.FileName) {
            const bitmap1 = ImageManager.loadBitmap("img/", BackgroundImage.FileName);
            this._backgroundSprite.bitmap = bitmap1;
            const sprite = new Sprite();
            sprite.x = BackgroundImage.BackgroundImage2XOfs;
            sprite.y = BackgroundImage.BackgroundImage2YOfs;
            this._backgroundSprite.addChild(sprite);
            this._backgroundSprite2 = sprite;
            this.addChild(this._backgroundSprite);
        } else {
            this._backgroundFilter = new PIXI.filters.BlurFilter();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this._backgroundSprite.filters = [this._backgroundFilter];
            this.addChild(this._backgroundSprite);
            this.setBackgroundOpacity(192);
        }
    }

    getBackgroundImage2(actorId) {
        if (BackgroundImage.BackgroundImage2) {
            const img2 = BackgroundImage.BackgroundImage2.find(img2 => img2.ActorId === actorId);
            if (img2) return ImageManager.loadBitmap("img/", img2.FileName);
        }
        return null;
    }

    updateActor() {
        super.updateActor();
        this.updateBackgroundImage2();
    }

    updateBackgroundImage2() {
        if (!this._backgroundSprite2) return;
        const backgroundImage2 = this.getBackgroundImage2($gameParty.menuActor().actorId());
        if (backgroundImage2) {
            this._backgroundSprite2.bitmap = backgroundImage2;
        } else {
            this._backgroundSprite2.bitmap = null;
        }
    }

    createEquipAbilitiesWindow() {
        const rect = this.equipAbilitiesWindowRect();
        this._windowEquipAbilities = new Window_EquipAbilities(rect);
        this._windowEquipAbilities.setHelpWindow(this._helpWindow);
        this._windowEquipAbilities.setHandler("ok", this.onEquipAbilitiesOk.bind(this));
        this._windowEquipAbilities.setHandler("cancel", this.onEquipAbilitiesCancel.bind(this));
        this._windowEquipAbilities.setHandler("select", this.onEquipAbilitiesSelect.bind(this));
        this._windowEquipAbilities.setHandler("pagedown", this.nextActor.bind(this));
        this._windowEquipAbilities.setHandler("pageup", this.previousActor.bind(this));
        this.addWindow(this._windowEquipAbilities);
    }

    createHasAbilitiesWindow() {
        const rect = this.hasAbilitiesWindowRect();
        this._windowHasAbilities = new Window_HasAbilities(rect);
        this._windowHasAbilities.setHelpWindow(this._helpWindow);
        this._windowHasAbilities.setHandler("ok", this.onHasAbilitiesOk.bind(this));
        this._windowHasAbilities.setHandler("cancel", this.onHasAbilitiesCancel.bind(this));
        this.addWindow(this._windowHasAbilities);
    }

    createStatusAbilityWindow() {
        const rect = this.statusAbilityWindowRect();
        this._windowStatusAbility = new Window_StatusAbility(rect);
        this.addWindow(this._windowStatusAbility);
    }

    statusAbilityWindowRect() {
        const x = 0;
        const y = this.mainAreaTop();
        const w = WindowSize.StatusAbilityWindowWidth;
        const h = WindowSize.StatusAbilityWindowHeight;
        return new Rectangle(x, y, w, h);
    }

    equipAbilitiesWindowRect() {
        const statusAbilityWindowRect = this.statusAbilityWindowRect();
        const x = statusAbilityWindowRect.width;
        const y = statusAbilityWindowRect.y;
        const w = Graphics.boxWidth - x;
        const h = statusAbilityWindowRect.height;
        return new Rectangle(x, y, w, h);
    }

    hasAbilitiesWindowRect() {
        const equipAbilitiesWindowRect = this.equipAbilitiesWindowRect();
        const x = 0;
        const y = equipAbilitiesWindowRect.y + equipAbilitiesWindowRect.height;
        const w = Graphics.boxWidth;
        const h = this.mainAreaBottom() - equipAbilitiesWindowRect.y - equipAbilitiesWindowRect.height;
        return new Rectangle(x, y, w, h);
    }

    needsPageButtons() {
        return true;
    }

    onActorChange() {
        super.onActorChange();
        this.restart();
    }

    // Define window handlers
    onEquipAbilitiesOk() {
        this._windowHasAbilities.select(0);
        this.change_EquipAbilitiesWindow_To_HasAbilitiesWindow();
    }

    onEquipAbilitiesCancel() {
        this.popScene();
    }

    onEquipAbilitiesSelect() {
        this._windowHasAbilities.setEquipSlot(this._windowEquipAbilities.index());
        this._windowHasAbilities.refresh();
    }

    onHasAbilitiesOk() {
        const targetSkill = this.actor().hasAbilitySkill(this._windowHasAbilities.index());
        const targetSkillId = (targetSkill ? targetSkill.id : null);
        const changed = this.actor().changeEquipAbilitySkill(this._windowEquipAbilities.index(), targetSkillId);
        if (changed) {
            this._windowHasAbilities.select(-1);
            this._windowStatusAbility.refresh();
            this.change_HasAbilitiesWindow_To_EquipAbilitiesWindow();
        } else {
            this._windowHasAbilities.activate();
        }
    }

    onHasAbilitiesCancel() {
        this.change_HasAbilitiesWindow_To_EquipAbilitiesWindow();
    }

    // Change window activate
    change_EquipAbilitiesWindow_To_HasAbilitiesWindow() {
        this._windowEquipAbilities.deactivate();
        this._windowHasAbilities.activate();
        this._windowEquipAbilities.refresh();
        this._windowHasAbilities.refresh();
    }

    change_HasAbilitiesWindow_To_EquipAbilitiesWindow() {
        this._windowHasAbilities.deactivate();
        this._windowHasAbilities.deselect();
        this._windowEquipAbilities.activate();
        this._windowEquipAbilities.refresh();
        this._windowHasAbilities.refresh();
    }
}

class Window_AbilitiesBase extends Window_Selectable {
    initialize(rect) {
        super.initialize(rect);
        this._actor = null;
        this.hide();
    }

    setActor(actor) {
        this._actor = actor;
        this._actor.safeInit();
    }

    select(index) {
        super.select(index);
        this.callHandler("select");
    }

    drawSkill(index) {
        const rect = this.itemLineRect(index);
        this.drawItemName(this.itemAt(index), rect.x, rect.y, rect.width - this.costWidth());
        if (EnableCost) this.drawCost(index, AbilitySystemUtils.getSkillCost(this.itemAt(index).id));
    }

    drawCost(index, cost) {
        const rect = this.itemLineRect(index);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(cost, rect.x, rect.y, rect.width, "right");
        this.resetTextColor();
    }

    costWidth() {
        if (EnableCost) return this.textWidth("000");
        return 0;
    }

    drawNone(index) {
        const rect = this.itemLineRect(index);
        this.drawText(Text.EmptySlotText, rect.x, rect.y, rect.width);
    }

    updateHelp() {
        super.updateHelp();
        this.setHelpWindowItem(this.item());
    }

    item() {
        return this.itemAt(this.index());
    }

    itemAt(index) {
        throw new Error("itemAt must be implemented");
    }
}

class Window_EquipAbilities extends Window_AbilitiesBase {
    maxItems() {
        return MaxEquipAbilities;
    }

    itemAt(index) {
        return this._actor.equipAbilitySkill(index);
    }

    drawItem(index) {
        if (this.itemAt(index)) {
            this.drawSkill(index);
        } else {
            this.drawNone(index);
        }
    }
}

class Window_HasAbilities extends Window_AbilitiesBase {
    setEquipSlot(slotIndex) {
        this._slotIndex = slotIndex;
    }

    maxItems() {
        if (!this._actor) return 0;
        return this._actor.hasAbilitySkillIds().length + 1;
    }

    maxCols() {
        return 2;
    }

    itemAt(index) {
        return this._actor.hasAbilitySkill(index);
    }

    drawItem(index) {
        if (this.itemAt(index)) {
            this.changePaintOpacity(this.isItemEnabled(index));
            this.drawSkill(index);
            this.changePaintOpacity(true);
        } else {
            this.drawNone(index);
        }
    }

    isCurrentItemEnabled() {
        return this.isItemEnabled(this.index());
    }

    isItemEnabled(index) {
        if (this._slotIndex === -1) return true;
        const skill = this.itemAt(index);
        if (!skill) return true;
        return this._actor.canChangeEquipAbilitySkill(this._slotIndex, this.itemAt(index).id);
    }

    playOkSound() {
        this.playEquipAbilitySe();
    }

    playEquipAbilitySe() {
        if (EquipAbilitySe.FileName === "") return;
        const se = {
            name: EquipAbilitySe.FileName,
            pan: EquipAbilitySe.Pan,
            pitch: EquipAbilitySe.Pitch,
            volume: EquipAbilitySe.Volume,
        }
        AudioManager.playSe(se);
    }
}

class Window_StatusAbility extends Window_StatusBase {
    initialize(rect) {
        super.initialize(rect);
        this.hide();
        this._actor = null;
    }

    setActor(actor) {
        this._actor = actor;
    }

    drawAllItems() {
        this.drawActorFace();
        this.drawActorName();
        this.drawActorLevel();
        if (EnableCost) this.drawActorTotalCost();
    }

    drawActorFace() {
        const nameRect = this.itemLineRect(0);
        nameRect.width = this.width - ImageManager.faceWidth - this.padding * 2;
        this.drawActorName(this._actor, ImageManager.faceWidth, 0, nameRect.width);
        let faceHeight;
        if (EnableCost) {
            faceHeight = FACE_HEIGHT_WHEN_ENABLE_CONST;
        } else {
            faceHeight = FACE_HEIGHT_WHEN_DISABLE_CONST;
        }
        let faceY = nameRect.y;
        super.drawActorFace(this._actor, nameRect.x, faceY, ImageManager.faceWidth, faceHeight);
    }

    drawActorName() {
        const nameRect = this.itemLineRect(0);
        nameRect.width = this.width - ImageManager.faceWidth - this.padding * 2;
        super.drawActorName(this._actor, ImageManager.faceWidth + 8, 16, nameRect.width);
    }

    drawActorLevel() {
        const x = this.padding;
        const y = (EnableCost ? this.textHeight(-1) : this.textHeight(0));
        super.drawActorLevel(this._actor, x, y);
    }

    drawActorTotalCost() {
        const x = this.padding;
        const y = this.textHeight(0);
        const width = this.width - this.padding * 2;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(Text.CostText, x, y, width);
        this.resetTextColor();
        const costText = `${this._actor.totalCost()}/${this._actor.maxCost()}`;
        this.drawText(costText, x, y, width, "center");
    }

    textHeight(line) {
        return this.height - this.padding + this.itemHeight() * (line - 1) - 10;
    }
}


// Add ability skill functuon.
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.call(this);
    this._hasAbilitySkills = [];
    this._equipAbilitySkills = [];
    // This skills is added when equip change.
    this._addedAbilitySkills = [];
    this._maxCost = null;
    this._classesMaxCost = {};
    // This flag is used to display all acquired ability skills as you level up.
    this._addedSkillsReturnAllFlag = false;
};

// セーブデータにアビリティスキルの情報が含まれていない場合を考慮した初期化を行う。
Game_Actor.prototype.safeInit = function() {
    if (this._hasAbilitySkills == null) this._hasAbilitySkills = [];
    if (this._equipAbilitySkills == null) this._equipAbilitySkills = [];
    if (this._addedAbilitySkills == null) this._addedAbilitySkills = [];
    if (this._maxCost == null || this._classesMaxCost == null) this.initMaxCost();
};

Game_Actor.prototype.initMaxCost = function() {
    for (let classId = 1; classId < $dataClasses.length; classId++) {
        this._classesMaxCost[classId] = AbilitySystemUtils.getMaxCostByClassId(classId);
    }
    this._maxCost = AbilitySystemUtils.getMaxCostByActorId(this.actorId());
};

const _Game_Actor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
    _Game_Actor_setup.call(this, actorId);
    if (this._maxCost == null || this._classesMaxCost == null) this.initMaxCost();
};

const _Game_Actor_refresh = Game_Actor.prototype.refresh;
Game_Actor.prototype.refresh = function() {
    _Game_Actor_refresh.call(this);
    this.refreshAddedAbilitySkills();
};

Game_Actor.prototype.refreshAddedAbilitySkills = function() {
    const lastAddedAbilitySkills = this._addedAbilitySkills.concat();
    this._addedAbilitySkills = [];
    for (const skillId of this.addedSkills()) {
        const skill = $dataSkills[skillId];
        if (AbilitySystemUtils.isAbilitySkill(skill)) {
            if (!this._addedAbilitySkills.includes(skillId)) {
                this._addedAbilitySkills.push(skillId);
                if (!this.learnedAbilitySkillIds().includes(skillId)) {
                    this.addAbilitySkill(skillId);
                    if (AbilitySystemUtils.isAutoEquipSkill()) {
                        this.bestSetEquipAbilitySkill(skillId);
                    }
                }
            }
        }
    }
    for (const skillId of lastAddedAbilitySkills) {
        if (!this._addedAbilitySkills.includes(skillId)) {
            this.removeAbilitySkill(skillId);
        }
    }
};

const _Game_Actor_skills = Game_Actor.prototype.skills;
Game_Actor.prototype.skills = function(opt = { includeHasAbilitySkills: false }) {
    const list = _Game_Actor_skills.call(this);
    if (AbilitySystemUtils.isEnableUsableAllSkillsByMapScene() || opt.includeHasAbilitySkills) {
        for (const skillId of this._hasAbilitySkills) {
            list.push($dataSkills[skillId]);
        }
    }
    return list;
};

const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    _Game_Actor_changeEquip.call(this, slotId, item);
    this.unequipAbilitySkillForCost();
};

const _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    _Game_Actor_forceChangeEquip.call(this, slotId, item);
    this.unequipAbilitySkillForCost();
};

Game_Actor.prototype.equipAbilitySkillIds = function() {
    const skillIds = new Array(MaxEquipAbilities);
    for (let i = 0; i < skillIds.length; i++) {
        skillIds[i] = this._equipAbilitySkills[i] == null ? null : this._equipAbilitySkills[i];
    }
    return skillIds;
};

Game_Actor.prototype.equipAbilitySkill = function(index) {
    const skillId = this.equipAbilitySkillIds()[index];
    if (skillId >= 1) return $dataSkills[skillId];
    return null;
};

Game_Actor.prototype.hasAbilitySkillIds = function() {
    return this._hasAbilitySkills.concat();
};

Game_Actor.prototype.hasAbilitySkill = function(index) {
    const skillId = this.hasAbilitySkillIds()[index];
    if (skillId >= 1) return $dataSkills[skillId];
    return null;
};

Game_Actor.prototype.learnedAbilitySkillIds = function() {
    const existEquipAbilitySkills = this._equipAbilitySkills.filter(id => id != null);
    return existEquipAbilitySkills.concat(this._hasAbilitySkills);
};

Game_Actor.prototype.addAbilitySkill = function(skillId) {
    if (this.learnedAbilitySkillIds().includes(skillId)) return;
    this._hasAbilitySkills.push(skillId);
};

Game_Actor.prototype.removeAbilitySkill = function(skillId) {
    this.originForgetSkill(skillId);
    this._equipAbilitySkills = this._equipAbilitySkills.map(id => id === skillId ? null : id);
    this._hasAbilitySkills = this._hasAbilitySkills.filter(id => id !== skillId);
};

Game_Actor.prototype.totalCost = function(equipAbilitySkills = this._equipAbilitySkills) {
    const costs = equipAbilitySkills.map(id => id ? AbilitySystemUtils.getSkillCost(id) : 0);
    return costs.reduce(((total, cost) => total + cost), 0);
};

Game_Actor.prototype.maxCost = function() {
    if (CostManagementByClasses) {
        return this.getMaxCost(this._classId);
    } else {
        return this.getMaxCost();
    }
};

Game_Actor.prototype.getMaxCost = function(classId = 0) {
    if (this._maxCost == null || this._classesMaxCost == null) this.initMaxCost();
    const addCost = AbilitySystemUtils.getAddCost(this);
    if (classId === 0) {
        return this._maxCost + addCost;
    } else {
        return this._classesMaxCost[classId] + addCost;
    }
};

Game_Actor.prototype.setMaxCost = function(value, classId = 0) {
    if (this._maxCost == null || this._classesMaxCost == null) this.initMaxCost();
    if (classId === 0) {
        this._maxCost = value;
    } else {
        this._classesMaxCost[classId] = value;
    }
};

Game_Actor.prototype.changeEquipAbilitySkill = function(index, targetSkillId) {
    if (this.canChangeEquipAbilitySkill(index, targetSkillId)) {
        this.doChangeEquipAbilitySkill(index, targetSkillId);
        return true;
    }
    return false;
};

Game_Actor.prototype.bestSetEquipAbilitySkill = function(targetSkillId) {
    const index = this.equipAbilitySkillIds().indexOf(null);
    if (index === -1) return false;
    return this.changeEquipAbilitySkill(index, targetSkillId);
};

Game_Actor.prototype.unequipAbilitySkillForCost = function() {
    if (this.totalCost() <= this.maxCost()) return;
    const skillIds = this._equipAbilitySkills.concat();
    for (let i = skillIds.length - 1; i >= 0; i--) {
        const skillId = skillIds[i];
        if (AbilitySystemUtils.getSkillCost(skillId) > 0) {
            this.changeEquipAbilitySkill(i, null);
        }
        if (this.totalCost() <= this.maxCost()) return;
    }
};

Game_Actor.prototype.canChangeEquipAbilitySkill = function(index, targetSkillId) {
    if (!targetSkillId) return true;
    if (!this._hasAbilitySkills.includes(targetSkillId)) return false;
    const equipAbilitySkills = this._equipAbilitySkills.concat();
    equipAbilitySkills[index] = targetSkillId;
    return this.totalCost(equipAbilitySkills) <= this.maxCost();
};

Game_Actor.prototype.doChangeEquipAbilitySkill = function(index, targetSkillId) {
    const currentSkillId = this._equipAbilitySkills[index];
    if (!currentSkillId && !targetSkillId) return;
    if (currentSkillId) this.originForgetSkill(currentSkillId);
    if (targetSkillId) {
        const hasIndex = this._hasAbilitySkills.indexOf(targetSkillId);
        this._equipAbilitySkills[index] = targetSkillId;
        this.originLearnSkill(targetSkillId);
        if (currentSkillId) {
            this._hasAbilitySkills[hasIndex] = currentSkillId;
        } else {
            this._hasAbilitySkills[hasIndex] = null;
            this._hasAbilitySkills = this._hasAbilitySkills.filter(id => !!id);
        }
    } else {
        this._equipAbilitySkills[index] = null;
        this._hasAbilitySkills.push(currentSkillId);
    }
};

Game_Actor.prototype.originLearnSkill = Game_Actor.prototype.learnSkill;

Game_Actor.prototype.originForgetSkill = Game_Actor.prototype.forgetSkill;

Game_Actor.prototype.learnSkill = function(skillId) {
    const skill = $dataSkills[skillId];
    if (AbilitySystemUtils.isAbilitySkill(skill)) {
        this.addAbilitySkill(skillId);
        if (AbilitySystemUtils.isAutoEquipSkill()) {
            this.bestSetEquipAbilitySkill(skillId);
        }
    } else {
        this.originLearnSkill(skillId);
    }
};

Game_Actor.prototype.forgetSkill = function(skillId) {
    const skill = $dataSkills[skillId];
    if (AbilitySystemUtils.isAbilitySkill(skill)) {
        this.removeAbilitySkill(skillId);
    } else {
        this.originForgetSkill(skillId);
    }
};

Game_Actor.prototype.changeExp = function(exp, show, opt = { isClassChange: false }) {
    this._exp[this._classId] = Math.max(exp, 0);
    const lastLevel = this._level;
    const lastSkills = this.skills({ includeHasAbilitySkills: true });
    if (opt.isClassChange) {
        // クラスチェンジによる経験値変更なら現在持っているスキルもlastSkillsに加える。
        lastSkills.push(...this._hasAbilitySkills);
    }
    while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
        this.levelUp();
    }
    while (this.currentExp() < this.currentLevelExp()) {
        this.levelDown();
    }
    if (show && this._level > lastLevel) {
        this.displayLevelUp(this.findNewSkills(lastSkills, { includeHasAbilitySkills: true }));
    }
    this.refresh();
};

Game_Actor.prototype.findNewSkills = function(lastSkills, opt = { includeHasAbilitySkills: false }) {
    const newSkills = this.skills({ includeHasAbilitySkills: opt.includeHasAbilitySkills });
    for (const lastSkill of lastSkills) {
        newSkills.remove(lastSkill);
    }
    return newSkills;
};


// Add equip abilities to menu command.
const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);
    if (Text.MenuAbilitySystemText !== "") this.addCommand(Text.MenuAbilitySystemText, "ability", this.isEnabledAbilityCommand());
};

Window_MenuCommand.prototype.isEnabledAbilityCommand = function() {
    if (EnabledAbilitySystemSwitchId === 0) return true;
    return $gameSwitches.value(EnabledAbilitySystemSwitchId);
};


const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);
    this._commandWindow.setHandler("ability", this.commandPersonal.bind(this));
};

const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
    _Scene_Menu_onPersonalOk.call(this);
    switch (this._commandWindow.currentSymbol()) {
    case "ability":
        SceneManager.push(Scene_Ability);
        break;
    }
};


const _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.call(this);
    if (EnableAutoEquipSkillSwitchId > 0) {
        $gameSwitches.setValue(EnableAutoEquipSkillSwitchId, EnableAutoEquipSkillSwitchInitValue);
    }
};


// Register plugin command.
PluginManager.registerCommand(AbilitySystemPluginName, "StartAbilityScene", () => {
    SceneManager.push(Scene_Ability);
});

PluginManager.registerCommand(AbilitySystemPluginName, "ChangeEquipAbilitySkill", args => {
    const params = PluginParamsParser.parse(args, { ActorId: "number", SlotIndex: "number", SkillId: "number" });
    const actor = $gameActors.actor(params.ActorId);
    const slotIndex = params.SlotIndex;
    const skillId = params.SkillId;
    if (slotIndex === -1) {
        if (skillId > 0) actor.bestSetEquipAbilitySkill(skillId);
    } else {
        if (skillId > 0) {
            actor.changeEquipAbilitySkill(slotIndex, skillId);
        } else {
            actor.changeEquipAbilitySkill(slotIndex, null);
        }
    }
});

PluginManager.registerCommand(AbilitySystemPluginName, "GetMaxCost", args => {
    const params = PluginParamsParser.parse(args, { ActorId: "number", ClassId: "number", VariableId: "number" });
    const actor = $gameActors.actor(params.ActorId);
    const classId = params.ClassId == null ? 0 : params.ClassId;
    const value = actor.getMaxCost(classId);
    $gameVariables.setValue(params.VariableId, value);
});

PluginManager.registerCommand(AbilitySystemPluginName, "SetMaxCost", args => {
    const params = PluginParamsParser.parse(args, { ActorId: "number", ClassId: "number", VariableId: "number", Value: "number" });
    const value = (params.VariableId > 0 ? $gameVariables.value(params.VariableId) : params.Value);
    const actor = $gameActors.actor(params.ActorId);
    const classId = params.ClassId == null ? 0 : params.ClassId;
    return actor.setMaxCost(value, classId);
});


return {
    AbilitySystemUtils,
    Scene_Ability,
    Window_AbilitiesBase,
    Window_EquipAbilities,
    Window_HasAbilities,
    Window_StatusAbility,
};

})();
