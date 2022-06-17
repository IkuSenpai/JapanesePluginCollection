//=============================================================================
// RPGツクールMZ - LL_MenuScreenCustom.js v1.4.4
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc メニュー画面レイアウトをカスタマイズします。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-menuscreencustom/
 * @base LL_MenuScreenBase
 * @orderAfter LL_MenuScreenBase
 *
 * @help LL_MenuScreenCustom.js
 *
 * メニュー画面レイアウトをカスタマイズします。
 * 顔グラフィックの代わりに立ち絵を表示することもできます。
 * ※表示する立ち絵リストは「LL_MenuScreenBase」で設定してください。
 *
 * 立ち絵が上手く表示されない場合:
 *   何も表示されない場合は、X・Y座標始点のマイナス値を大きくしてみるか、
 *   拡大率を小さくしてみてください。
 *   顔グラフィックが表示されている時は、立ち絵リストが紐づけできていません。
 *   立ち絵リストが正しく設定されているか確認してみてください。
 *
 * ヘルプウィンドウ:
 *   ヘルプウィンドウの左上と右上、左下と右下に任意の情報を表示できます。
 *   表示する内容（値）はスクリプトで記述してください。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/6/7
 *
 * @param menuSettings
 * @text メニュー画面の設定
 * @desc ※この項目は使用しません
 *
 * @param leftInputMode
 * @text メニューを左に配置
 * @desc メニューを左に配置し、タッチUI配置も左向けに調整します。
 * 戻るボタンが左上、ページ切替ボタンが右上に配置されます。
 * @default false
 * @type boolean
 * @parent menuSettings
 *
 * @param numVisibleRows
 * @text アクター行数
 * @desc アクター一覧画面の行数です。 (推奨値: 1～2)
 * @default 2
 * @min 1
 * @max 10
 * @type number
 * @parent menuSettings
 *
 * @param maxCols
 * @text アクター列数
 * @desc アクター一覧画面の列数です。 (推奨値: 1～2)
 * @default 2
 * @min 1
 * @max 10
 * @type number
 * @parent menuSettings
 *
 * @param currencyWindowPosition
 * @text 所持金の表示位置
 * @desc ヘルプウィンドウの右下に独自の項目を表示するときは、
 * 「メニュー下に別ウィンドウで表示」に設定してください。
 * @default helpWindowRightBottom
 * @type select
 * @option 表示しない
 * @value hidden
 * @option ヘルプウィンドウの右下
 * @value helpWindowRightBottom
 * @option メニュー下に別ウィンドウで表示
 * @value menuCommandBottom
 * @parent menuSettings
 *
 * @param backgroundImages
 * @text 背景画像の設定
 * @desc メニュー画面の背景画像を変更します。
 * @default []
 * @type struct<backgroundImages>[]
 * @parent menuSettings
 *
 * @param layoutSettings
 * @text 表示位置の設定
 * @desc ※この項目は使用しません
 *
 * @param actorNameLH
 * @text アクター名表示位置
 * @desc アクター名を上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 0)
 * @default 0
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorNameX
 * @text アクター名表示位置(X)
 * @desc アクター名の横位置を調整します。(初期値: 0)
 * プラスにすると右へ、マイナスにすると左へ移動します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent layoutSettings
 *
 * @param actorLevelLH
 * @text レベル表示位置
 * @desc レベルを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 1)
 * @default 1
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorLevelX
 * @text レベル表示位置(X)
 * @desc レベルの横位置を調整します。(初期値: 0)
 * プラスにすると右へ、マイナスにすると左へ移動します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent layoutSettings
 *
 * @param actorIconLH
 * @text ステート表示位置
 * @desc ステートアイコンを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 2)
 * @default 2
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorIconX
 * @text ステート表示位置(X)
 * @desc ステートアイコンの横位置を調整します。(初期値: 0)
 * プラスにすると右へ、マイナスにすると左へ移動します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent layoutSettings
 *
 * @param actorClassLH
 * @text 職業名表示位置
 * @desc 職業名を上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 3)
 * @default 3
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorClassX
 * @text 職業名表示位置(X)
 * @desc 職業名の横位置を調整します。(初期値: 0)
 * プラスにすると右へ、マイナスにすると左へ移動します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent layoutSettings
 *
 * @param actorGaugeLH
 * @text ゲージ表示位置
 * @desc HP・MP・TPゲージを上から何行目に表示するか設定します。
 * -1にすると非表示になります。 (初期値: 4)
 * @default 4
 * @min -1
 * @max 100
 * @type number
 * @parent layoutSettings
 *
 * @param actorGaugeX
 * @text ゲージ表示位置(X)
 * @desc ゲージの横位置を調整します。(初期値: 0)
 * プラスにすると右へ、マイナスにすると左へ移動します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent layoutSettings
 *
 * @param lvPadding
 * @text Lvの余白調整値
 * @desc Lv表記の余白調整値です。
 * 数値を小さくすると余白が狭くなります。 (初期値: 84)
 * @default 84
 * @min 0
 * @max 2000
 * @type number
 * @parent layoutSettings
 *
 * @param gaugeWidth
 * @text ゲージの幅
 * @desc ゲージの幅(長さ)です。  (初期値: 128)
 * この設定はメニュー画面トップのみ適用されます。
 * @default 128
 * @min 0
 * @max 2000
 * @type number
 * @parent layoutSettings
 *
 * @param pictureSettings
 * @text 立ち絵表示の設定
 * @desc ※この項目は使用しません
 *
 * @param showStandingPicture
 * @text 立ち絵を表示
 * @desc 顔グラフィックの代わりに立ち絵を表示します。
 * @default true
 * @type boolean
 * @parent pictureSettings
 *
 * @param menuWindowPictureX
 * @text X座標始点
 * @desc 顔グラフィックの代わりに表示する立ち絵の表示位置(X)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuWindowPictureY
 * @text Y座標始点
 * @desc 顔グラフィックの代わりに表示する立ち絵の表示位置(Y)です。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuWindowPictureScale
 * @text 拡大率
 * @desc 立ち絵の拡大率です。 (初期値: 100)
 * @default 100
 * @min -2000
 * @max 2000
 * @type number
 * @parent pictureSettings
 *
 * @param menuHelpSettings
 * @text ヘルプウィンドウの設定
 * @desc ※この項目は使用しません
 *
 * @param menuHelpWindowEnable
 * @text ヘルプウィンドウを表示
 * @desc メニュー画面上部にヘルプウィンドウを表示します。
 * @default true
 * @type boolean
 * @parent menuHelpSettings
 *
 * @param menuHelpTexts
 * @text メニュー説明文
 * @desc メニュー説明文のリストを定義します。
 * @default ["{\"symbol\":\"アイテム\",\"helpText\":\"入手したアイテムを使用します。\"}","{\"symbol\":\"スキル\",\"helpText\":\"習得したスキルを使用します。\"}","{\"symbol\":\"装備\",\"helpText\":\"装備を変更します。\"}","{\"symbol\":\"ステータス\",\"helpText\":\"ステータスを確認します。\"}","{\"symbol\":\"並び替え\",\"helpText\":\"パーティの並び順を変更します。\"}","{\"symbol\":\"オプション\",\"helpText\":\"オプション画面を開きます。\"}","{\"symbol\":\"セーブ\",\"helpText\":\"セーブ画面を開きます。\"}","{\"symbol\":\"ゲーム終了\",\"helpText\":\"ゲームを終了します。\"}"]
 * @type struct<menuHelpTexts>[]
 * @parent menuHelpSettings
 *
 * @param leftBlockLabel
 * @text 左上の項目名
 * @desc 左上に表示する項目名です。
 * 空白にすると非表示になります。
 * @default 現在地：
 * @type string
 * @parent menuHelpSettings
 *
 * @param leftBlockValue
 * @text 左上の値
 * @desc 左上に表示する値をスクリプトで記述します。
 * @default $gameMap.displayName()
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param leftBlockAlign
 * @text 左上の文字揃え
 * @desc 左上に表示する値の文字配置を選択します。
 * @default left
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 *
 * @param rightBlockLabel
 * @text 右上の項目名
 * @desc 右上に表示する項目名です。
 * 空白にすると非表示になります。
 * @default プレイ時間：
 * @type string
 * @parent menuHelpSettings
 *
 * @param rightBlockValue
 * @text 右上の値
 * @desc 右上に表示する値をスクリプトで記述します。
 * @default $gameSystem.playtimeText()
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param rightBlockAlign
 * @text 右上の文字揃え
 * @desc 右上に表示する値の文字配置を選択します。
 * @default right
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 *
 * @param rightBottomBlockLabel
 * @text 右下の項目名
 * @desc 右下に表示する項目名です。
 * ※所持金の表示位置が「ヘルプウィンドウの右下」時は無効
 * @default
 * @type string
 * @parent menuHelpSettings
 *
 * @param rightBottomBlockValue
 * @text 右下の値
 * @desc 右下に表示する値をスクリプトで記述します。
 * ※所持金の表示位置が「ヘルプウィンドウの右下」時は無効
 * @default
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param rightBottomBlockAlign
 * @text 右下の文字揃え
 * @desc 右下に表示する値の文字配置を選択します。
 * ※所持金の表示位置が「ヘルプウィンドウの右下」時は無効
 * @default left
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 *
 * @param leftBottomBlockLabel
 * @text 左下の項目名
 * @desc 左下に表示する項目名です。
 * ※設定するとメニュー説明文が表示されなくなります
 * @default
 * @type string
 * @parent menuHelpSettings
 *
 * @param leftBottomBlockValue
 * @text 左下の値
 * @desc 左下に表示する値をスクリプトで記述します。
 * ※設定するとメニュー説明文が表示されなくなります
 * @default
 * @type combo
 * @option $gameVariables.value(1)   // 変数ID:1の値
 * @option $gameSwitches.value(1) ? "有効" : "無効"  // スイッチID:1の状態
 * @option $gameMap.displayName()  // マップ名
 * @option $gameParty.size()  // パーティー人数
 * @option $gameParty.steps()  // 現在の歩数
 * @option $gameParty.gold()  // 所持金
 * @option $gameParty.numItems($dataItems[1])  // アイテムID:1の所持数
 * @option $gameParty.numItems($dataWeapons[1])  // 武器ID:1の所持数
 * @option $gameParty.numItems($dataArmors[1])  // 防具ID:1の所持数
 * @option $gameSystem.playtimeText()   // プレイ時間
 * @option $gameSystem.saveCount()  // セーブ回数
 * @option $gameSystem.battleCount()  // 戦闘回数
 * @parent menuHelpSettings
 *
 * @param leftBottomBlockAlign
 * @text 左下の文字揃え
 * @desc 左下に表示する値の文字配置を選択します。
 * @default left
 * @type select
 * @option 左揃え
 * @value left
 * @option 中央揃え
 * @value center
 * @option 右揃え
 * @value right
 * @parent menuHelpSettings
 */

/*~struct~menuHelpTexts:
 *
 * @param symbol
 * @text メニュー名
 * @desc メニュー名を入力します。
 * @type string
 *
 * @param helpText
 * @text メニュー説明文
 * @desc メニューの説明文を入力します。
 * @type string
 */

/*~struct~backgroundImages:
 *
 * @param sceneName
 * @text シーン名
 * @desc 背景画像を設定するシーン名です。
 * 独自で追加したシーン名を直接入力することもできます。
 * @default Scene_Menu
 * @type combo
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_GameEnd
 *
 * @param imageName
 * @text 背景画像
 * @desc 背景画像として表示する画像を選択してください。
 * @dir img/system
 * @type file
 * @require 1
 */

(() => {
	"use strict";
	const pluginName = "LL_MenuScreenCustom";

	const parameters = PluginManager.parameters(pluginName);
	const leftInputMode = eval(parameters["leftInputMode"] || "true");
	const numVisibleRows = Number(parameters["numVisibleRows"] || 2);
	const maxCols = Number(parameters["maxCols"] || 2);
	const currencyWindowPosition = String(parameters["currencyWindowPosition"] || "helpWindowRightBottom");
	// 表示位置の設定
	const actorNameLH = Number(parameters["actorNameLH"] || 0);
	const actorLevelLH = Number(parameters["actorLevelLH"] || 1);
	const actorIconLH = Number(parameters["actorIconLH"] || 2);
	const actorClassLH = Number(parameters["actorClassLH"] || 3);
	const actorGaugeLH = Number(parameters["actorGaugeLH"] || 4);
	const lvPadding = Number(parameters["lvPadding"] || 84);
	const gaugeWidth = Number(parameters["gaugeWidth"] || 128);
	// 表示位置の設定(X)
	const actorNameX = Number(parameters["actorNameX"] || 0);
	const actorLevelX = Number(parameters["actorLevelX"] || 0);
	const actorIconX = Number(parameters["actorIconX"] || 0);
	const actorClassX = Number(parameters["actorClassX"] || 0);
	const actorGaugeX = Number(parameters["actorGaugeX"] || 0);
	// 立ち絵表示の設定
	const showStandingPicture = eval(parameters["showStandingPicture"] || "true");
	const menuWindowPictureX = Number(parameters["menuWindowPictureX"] || 0);
	const menuWindowPictureY = Number(parameters["menuWindowPictureY"] || 0);
	const menuWindowPictureScale = Number(parameters["menuWindowPictureScale"] || 100);
	// ヘルプウィンドウの設定
	const menuHelpWindowEnable = eval(parameters["menuHelpWindowEnable"] || "true");
	const menuHelpTexts = JSON.parse(parameters["menuHelpTexts"] || "null");
	const leftBlockLabel = String(parameters["leftBlockLabel"] || "");
	const leftBlockValue = String(parameters["leftBlockValue"] || "");
	const leftBlockAlign = String(parameters["leftBlockAlign"] || "left");
	const rightBlockLabel = String(parameters["rightBlockLabel"] || "");
	const rightBlockValue = String(parameters["rightBlockValue"] || "");
	const rightBlockAlign = String(parameters["rightBlockAlign"] || "right");
	const rightBottomBlockLabel = String(parameters["rightBottomBlockLabel"] || "");
	const rightBottomBlockValue = String(parameters["rightBottomBlockValue"] || "");
	const rightBottomBlockAlign = String(parameters["rightBottomBlockAlign"] || "left");
	const leftBottomBlockLabel = String(parameters["leftBottomBlockLabel"] || "");
	const leftBottomBlockValue = String(parameters["leftBottomBlockValue"] || "");
	const leftBottomBlockAlign = String(parameters["leftBottomBlockAlign"] || "left");
	// 背景画像の設定
	const backgroundImages = JSON.parse(parameters["backgroundImages"] || "null");

	let menuHelpLists = [];
	if (menuHelpTexts) {
		menuHelpTexts.forEach((elm) => {
			menuHelpLists[String(JSON.parse(elm).symbol)] = String(JSON.parse(elm).helpText);
		});
	}

	let backgroundImageLists = [];
	if (backgroundImages) {
		backgroundImages.forEach((elm) => {
			backgroundImageLists.push(JSON.parse(elm));
		});
	}

	// メニュー画面ヘルプウィンドウの標準高さ (lineHeight)
	let menuHelpWindowLH = 1.5;

	// ヘルプウィンドウフォントサイズ
	const menuHelpWindowFontSize = 22;

	const _Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
	Scene_MenuBase.prototype.createBackground = function() {
		let sceneName = SceneManager._scene.constructor.name;
		// 背景画像を検索
		let originalBackgroundImage = backgroundImageLists.find(function(item) {
			if (String(item.sceneName) == sceneName) return true;
		});
		if (originalBackgroundImage) {
			// 独自の背景画像を表示
			this._backgroundSprite = new Sprite();
			this._backgroundSprite.bitmap = ImageManager.loadSystem(originalBackgroundImage.imageName);
			this.addChild(this._backgroundSprite);
			return;
		}
		_Scene_MenuBase_createBackground.apply(this, arguments);
	};

	// ヘルプウィンドウの高さを定義
	Scene_MenuBase.prototype.calcMenuHelpWindowHeight = function() {
		let height = this.calcWindowHeight(menuHelpWindowLH, false);
		if (!leftBlockLabel && !rightBlockLabel) height = this.calcWindowHeight(1, false);
		if (!menuHelpWindowEnable) height = 0;
		return height;
	};

	Scene_Menu.prototype.isRightInputMode = function() {
        return !leftInputMode;
	};

	Scene_MenuBase.prototype.createCancelButton = function() {
        this._cancelButton = new Sprite_Button("cancel");
        this._cancelButton.x = leftInputMode ? 4 : Graphics.boxWidth - this._cancelButton.width - 4;
        this._cancelButton.y = this.buttonY();
        this.addWindow(this._cancelButton);
    };

    Scene_MenuBase.prototype.createPageButtons = function() {
        this._pageupButton = new Sprite_Button("pageup");
        this._pagedownButton = new Sprite_Button("pagedown");
        if (leftInputMode) {
            this._pageupButton.x = Graphics.boxWidth - this._pageupButton.width -  this._pagedownButton.width - 8;
        } else {
            this._pageupButton.x = 4;
        }
        this._pageupButton.y = this.buttonY();
        const pageupRight = this._pageupButton.x + this._pageupButton.width;
        this._pagedownButton.x = pageupRight + 4;
        this._pagedownButton.y = this.buttonY();
        this.addWindow(this._pageupButton);
        this.addWindow(this._pagedownButton);
        this._pageupButton.setClickHandler(this.previousActor.bind(this));
        this._pagedownButton.setClickHandler(this.nextActor.bind(this));
	};

	const _Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
		_Scene_Menu_create.apply(this, arguments);
		this.createMenuHelpWindow();
		if (currencyWindowPosition != "menuCommandBottom") {
			this._goldWindow.visible = false;
		}
	};

	Scene_Menu.prototype.commandWindowRect = function() {
		const ww = this.mainCommandWidth();
		let wh = this.mainAreaHeight() - this.menuHelpWindowRect().height - this.goldWindowRect().height;
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = this.mainAreaTop() + this.menuHelpWindowRect().height;
		if (currencyWindowPosition != "menuCommandBottom") {
			wh += this.goldWindowRect().height
		}
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Menu.prototype.goldWindowRect = function() {
		const ww = this.mainCommandWidth();
		const wh = this.calcWindowHeight(1, true);
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = this.mainAreaBottom() - wh;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Menu.prototype.statusWindowRect = function() {
		const ww = Graphics.boxWidth - this.mainCommandWidth();
		const wh = this.mainAreaHeight() - this.menuHelpWindowRect().height;
		const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
		const wy = this.mainAreaTop() + this.menuHelpWindowRect().height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Menu.prototype.createMenuHelpWindow = function() {
		const rect = this.menuHelpWindowRect();
		this._menuHelpWindow = new Window_MenuHelp(rect);
		this.addWindow(this._menuHelpWindow);
	};

	Scene_Menu.prototype.menuHelpWindowRect = function() {
		const wx = 0;
		const wy = this.mainAreaTop();
		const ww = Graphics.boxWidth;
		const wh = this.calcMenuHelpWindowHeight();
		return new Rectangle(wx, wy, ww, wh);
	};

	const _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
		_Scene_Menu_update.apply(this, arguments);
		// インフォメーションウィンドウの更新
		const helpText = menuHelpLists[this._commandWindow.currentName()] ? menuHelpLists[this._commandWindow.currentName()] : "";
		this._menuHelpWindow.setText(helpText);
	};

	Scene_ItemBase.prototype.actorWindowRect = function() {
		const wx = 0;
		const wy = Math.min(this.mainAreaTop(), this.helpAreaTop());
		const ww = Graphics.boxWidth - this.mainCommandWidth();
		const wh = Graphics.boxHeight - this.buttonAreaHeight() - this.calcMenuHelpWindowHeight();
		return new Rectangle(wx, wy, ww, wh);
	};

	// Get Current Name
	Window_Command.prototype.currentName = function() {
		return this.currentData() ? this.currentData().name : null;
	};

	// ウィンドウ内に立ち絵を描画
	Window_StatusBase.prototype.drawStandingPicture = function(
		pictureName, x, y, width, height, sx, sy, scaleX, scaleY
	) {
		width = width || 200;
		height = height || 200;
		sx = sx || 0;
		sy = sy || 0;
		const bitmap = ImageManager.loadPicture(pictureName);
		const pw = width;
		const ph = height;
		let sw = Math.min(width, pw);
		let sh = Math.min(height, ph);
		let dx = Math.floor(x + Math.max(width - pw, 0) / 2);
		let dy = Math.floor(y + Math.max(height - ph, 0) / 2);
		let dw = Math.min(width, pw);
		let dh = Math.min(height, ph);

		// for iOS Safari
		if (sx < 0) {
			dx += sx * -1 * scaleX;
			sw -= sx * -1 * scaleX;
			dw -= sx * -1 * scaleX;
			sx = 0;
		}
		if (sy < 0) {
			dy += sy * -1 * scaleY;
			sh -= sy * -1 * scaleY;
			dh -= sy * -1 * scaleY;
			sy = 0;
		}

		bitmap.addLoadListener(function() {
	        this.contents.blt(bitmap, sx, sy, sw / scaleX, sh / scaleY, dx, dy, dw, dh);
        }.bind(this));
	};

	Window_StatusBase.prototype.exDrawActorSimpleStatus = function(actor, x, y, width) {
		const lineHeight = this.lineHeight();
		if (actorNameLH > -1) this.drawActorName(actor, x + actorNameX, y + lineHeight * actorNameLH, width - actorNameX);
		if (actorLevelLH > -1) this.drawActorLevel(actor, x + actorLevelX, y + lineHeight * actorLevelLH);
		if (actorIconLH > -1) this.drawActorIcons(actor, x + actorIconX, y + lineHeight * actorIconLH, width - actorIconX);
		if (actorClassLH > -1) this.drawActorClass(actor, x + actorClassX, y + lineHeight * actorClassLH, width - actorClassX);
		if (actorGaugeLH > -1) this.placeBasicGauges(actor, x + actorGaugeX, y + lineHeight * actorGaugeLH);
	};

	Window_MenuStatus.prototype.drawItemImage = function(index) {
		const actor = this.actor(index);
		const rect = this.itemRect(index);

		this.changePaintOpacity(actor.isBattleMember());
		// 立ち絵 or 顔グラフィック描画
		let mPicture = ExMenuScreenBase.getImageName(actor.actorId());
		if (mPicture && showStandingPicture) {
			const width = rect.width - 2;
			const height = rect.height - 2;
			const x = rect.x + 1;
			const y = rect.y + 1;
			const sx = (Number(mPicture.x) + menuWindowPictureX) * -1;
			const sy = (Number(mPicture.y) + menuWindowPictureY) * -1;
			let scaleX = Number(mPicture.scaleX) / 100;
			let scaleY = Number(mPicture.scaleY) / 100;
			// 拡大率を適用
			scaleX *= menuWindowPictureScale / 100;
			scaleY *= menuWindowPictureScale / 100;
			// ピンチ判定
			if (ExMenuScreenBase.getHpRate(actor.actorId()) > Number(mPicture.pinchPercentage) || !mPicture.pinchImageName) {
				// 通常
				this.drawStandingPicture(String(mPicture.imageName), x, y, width, height, sx, sy, scaleX, scaleY);
			} else {
				// ピンチ
				this.drawStandingPicture(String(mPicture.pinchImageName), x, y, width, height, sx, sy, scaleX, scaleY);
			}
		} else {
			let width = ImageManager.faceWidth;
			// 横幅が小さい場合、横幅に合わせてトリミング
			if (rect.width - 2 < width) {
				width = rect.width - 2;
			}
			const height = rect.height - 2;
			const x = rect.x + rect.width - width - 1;
			const y = rect.y + 1;
			this.drawActorFace(actor, x, y, width, height);
		}
		this.changePaintOpacity(true);
	};

	Window_MenuStatus.prototype.drawItemStatus = function(index) {
		const actor = this.actor(index);
		const rect = this.itemRect(index);
		const x = rect.x + 2;
		const y = rect.y + 2;
		const width = rect.width - 4;

		// 画像キャッシュ判定
		const mPicture = ExMenuScreenBase.getImageName(actor.actorId());
		if (mPicture && showStandingPicture) {
			let pictureName = null;
			// ピンチ判定 (旧Ver.互換用)
			if (ExMenuScreenBase.getHpRate(actor.actorId()) > Number(mPicture.pinchPercentage) || !mPicture.pinchImageName) {
				pictureName = String(mPicture.imageName);
			} else {
				pictureName = String(mPicture.pinchImageName);
			}
			const bitmap = ImageManager.loadPicture(pictureName);
			bitmap.addLoadListener(function() {
				this.exDrawActorSimpleStatus(actor, x, y, width);
			}.bind(this));
		} else {
			this.exDrawActorSimpleStatus(actor, x, y, width);
		}
	};

	Window_MenuStatus.prototype.numVisibleRows = function() {
		return numVisibleRows;
	};

	Window_MenuStatus.prototype.maxCols = function() {
		return maxCols;
	};

	Window_MenuStatus.prototype.drawActorLevel = function(actor, x, y) {
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(TextManager.levelA, x, y, 48);
		this.resetTextColor();
		this.drawText(actor.level, x + lvPadding, y, 36, "right");
	};

	Window_MenuStatus.prototype.refreshCursorForAll = function() {
		const maxItems = this.maxItems();
		if (maxItems > 0) {
			const rect = this.itemRect(0);

			// 独自に最大数を計算
			let maxRectCnt = maxItems;
			if (maxRectCnt > maxCols) {
				maxRectCnt = Math.ceil(maxRectCnt / maxCols) * maxCols;
			}
			rect.enlarge(this.itemRect(maxRectCnt - 1));

			this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
		} else {
			this.setCursorRect(0, 0, 0, 0);
		}
	};


	//-----------------------------------------------------------------------------
	// Window_MenuHelp
	//

	function Window_MenuHelp() {
	    this.initialize(...arguments);
    }

    Window_MenuHelp.prototype = Object.create(Window_Base.prototype);
    Window_MenuHelp.prototype.constructor = Window_MenuHelp;

    Window_MenuHelp.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
		this.refresh();
    };

    Window_MenuHelp.prototype.setText = function(text) {
	    this._text = text;
	    this.refresh();
    };

    Window_MenuHelp.prototype.clear = function() {
	    this.setText("");
    };

    Window_MenuHelp.prototype.refresh = function() {
		this.contents.clear();
		this.contents.fontSize = this.getFontSize();
		// マップ名
		this.drawLeftBlock();
		// プレイ時間
		this.drawRightBlock();
		// 所持金
		this.drawCurrency();
		// メニューヘルプ
		this.drawMenuHelp();
		this.contents.fontSize = $gameSystem.mainFontSize();
	};

	Window_MenuHelp.prototype.getFontSize = function() {
	    return !leftBlockLabel && !rightBlockLabel ? $gameSystem.mainFontSize() : menuHelpWindowFontSize;
    };

	Window_MenuHelp.prototype.drawLeftBlock = function() {
		if (!leftBlockLabel) return;
		const y = -6;
		const oneThirdWidth = Math.floor(this.innerWidth / 3);
	    this.changeTextColor(this.systemColor());
		this.drawText(leftBlockLabel, 0, y, this.contents.measureTextWidth(leftBlockLabel), leftBlockAlign);
		this.resetTextColor();
		this.drawText(eval(leftBlockValue), this.contents.measureTextWidth(leftBlockLabel), y, oneThirdWidth * 1.5 - this.contents.measureTextWidth(leftBlockLabel), leftBlockAlign);
	};

	Window_MenuHelp.prototype.drawRightBlock = function() {
		if (!rightBlockLabel) return;
		const y = -6;
		const oneThirdWidth = Math.floor(this.innerWidth / 3);
		this.changeTextColor(this.systemColor());
		this.drawText(rightBlockLabel, oneThirdWidth * 1.5, y, this.contents.measureTextWidth(rightBlockLabel), rightBlockAlign);
		this.resetTextColor();
		this.drawText(eval(rightBlockValue), this.contents.measureTextWidth(rightBlockLabel) + oneThirdWidth * 1.5, y, oneThirdWidth * 1.5 - this.contents.measureTextWidth(rightBlockLabel), rightBlockAlign);
	};

	Window_MenuHelp.prototype.drawCurrency = function() {
		const y = !leftBlockLabel && !rightBlockLabel ? 0 : 24;
		const oneThirdWidth = Math.floor(this.innerWidth / 3);

		if (currencyWindowPosition == "helpWindowRightBottom") {
			// 所持金の表示位置が「ヘルプウィンドウの右下」の場合、所持金を描画
			const currencyUnit = TextManager.currencyUnit;
			this.drawCurrencyValue($gameParty.gold(), currencyUnit, oneThirdWidth * 1.5, y, oneThirdWidth * 1.5);
		} else {
			// それ以外の場合、独自の項目を描画
			if (!rightBottomBlockLabel) return;
			this.changeTextColor(this.systemColor());
			this.drawText(rightBottomBlockLabel, oneThirdWidth * 1.5, y, this.contents.measureTextWidth(rightBottomBlockLabel), rightBottomBlockAlign);
			this.resetTextColor();
			this.drawText(eval(rightBottomBlockValue), this.contents.measureTextWidth(rightBottomBlockLabel) + oneThirdWidth * 1.5, y, oneThirdWidth * 1.5 - this.contents.measureTextWidth(rightBottomBlockLabel), rightBottomBlockAlign);
		}
	};

	Window_MenuHelp.prototype.drawMenuHelp = function() {
		const y = !leftBlockLabel && !rightBlockLabel ? 0 : 24;
		const oneThirdWidth = Math.floor(this.innerWidth / 3);

		if (leftBottomBlockLabel != "") {
			// 左下に独自の項目を表示する場合 (v1.4.0)
			this.changeTextColor(this.systemColor());
			this.drawText(leftBottomBlockLabel, 0, y, this.contents.measureTextWidth(leftBottomBlockLabel), leftBottomBlockAlign);
			this.resetTextColor();
			this.drawText(eval(leftBottomBlockValue), this.contents.measureTextWidth(leftBottomBlockLabel), y, oneThirdWidth * 1.5 - this.contents.measureTextWidth(leftBottomBlockLabel), leftBottomBlockAlign);
		} else {
			// メニューヘルプを表示
			this.resetTextColor();
			this.drawText(this._text ? this._text : "", 0, y, this.innerWidth - oneThirdWidth * 1.5, leftBottomBlockAlign);
		}
	};


	// ゲージ幅調整機能 (v1.3.0)
	const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
	Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
		// メニュー画面トップおよび対象アクター選択画面のみ適用
		if (this.constructor.name === "Window_MenuStatus" || this.constructor.name === "Window_MenuActor") {
			const key = "actor%1-gauge-%2".format(actor.actorId(), type);
			const sprite = this.createInnerSprite(key, Sprite_GaugeExMenuBase);
			sprite.setup(actor, type);
			sprite.move(x, y);
			sprite.show();
		} else {
			_Window_StatusBase_placeGauge.apply(this, arguments);
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_GaugeExMenuBase
	//
	// ゲージ幅調整用のゲージスプライトを新規定義します。

	function Sprite_GaugeExMenuBase() {
		this.initialize(...arguments);
	}

	Sprite_GaugeExMenuBase.prototype = Object.create(Sprite_Gauge.prototype);
	Sprite_GaugeExMenuBase.prototype.constructor = Sprite_GaugeExMenuBase;

	Sprite_GaugeExMenuBase.prototype.bitmapWidth = function() {
		return gaugeWidth;
	};
})();
