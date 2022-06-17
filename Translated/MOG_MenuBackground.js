//=============================================================================
// MOG_MenuBackground.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (v1.0) O plugin permite mudar a imagem de fundo do menu.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Default FileName
 * @text File Name
 * @desc Definição do nome de arquivo.
 * @type file
 * @dir img/menus/
 * @default Background_01
 * 
 * @param Window Opacity
 * @desc Definição da transparência da janela.
 * @type number 
 * @default 0
 * @min 0
 * @max 255
 *
 * @param Scroll X-Axis
 * @desc Definição da velocidade de deslize na horizontal. 
 * @default 0
 *
 * @param Scroll Y-Axis
 * @desc Definição da velocidade de deslize na vertical. 
 * @default 0
 *
 * @param Disable Scenes
 * @desc Definição das cenas que terão o efeito desativado.
 * Scene_Name1 , Scene_Name2 , Scene_Name3 ...
 * @default Scene_Test1,Scene_Test2,Scene_Test3 
 *
 * @command MenuBackground_Setup
 * @desc Configuração do fundo do menu.
 * @text Setup
 * 
 * @arg fileName
 * @text File Name
 * @desc Definição do nome de arquivo.
 * @type file
 * @dir img/menus/
 * @default Background_01
 * 
 * @arg sx
 * @text Horizontal Scroll
 * @desc Definição da velocidade de deslize na horizontal.
 * @default 0
 * 
 * @arg sy
 * @text Vertical Scroll
 * @desc Definição da velocidade do deslize na vertical.
 * @default 0
 *
 * @help
 * =============================================================================
 * ♦♦♦ MOG - Menu Background ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * =============================================================================
 * O plugin permite mudar a imagem de fundo do menu.
 *
 * =============================================================================
 * As imagens do background deverão ficar na pasta /img/menus/
 * =============================================================================
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) メニューの背景画像を変更できます。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_MenuBackground.js
 * 
 * @param Default FileName
 * @text メニュー共通背景画像
 * @desc  シーン別背景画像を指定しない場合、共通に使用するファイル名。(大文字小文字を区別、拡張子なし)
 * @type file
 * @dir img/menus/
 * @default Background_01
 * 
 * @param Window Opacity
 * @text ウィンドウの透明度
 * @type number 
 * @default 0
 * @min 0
 * @max 255
 * 
 * @param Scroll X-Axis
 * @text X方向移動速度
 * @desc 正:左 / 負:右
 * @default 0
 * 
 * @param Scroll Y-Axis
 * @text Y方向移動速度
 * @desc 正:上 / 負:下
 * @default 0
 * 
 * @param Disable Scenes
 * @desc エフェクトを無効にするシーン
 * Scene_Name1 , Scene_Name2 , Scene_Name3 ...
 * @default Scene_Test1,Scene_Test2,Scene_Test3 
 * 
 * @command MenuBackground_Setup
 * @desc メニューの背景を指定
 * @text 設定
 * 
 * @arg fileName
 * @text ファイル名
 * @desc ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default Background_01
 * 
 * @arg sx
 * @text X軸スクロール
 * @desc X軸スクロール速度の指定
 * @default 0
 * 
 * @arg sy
 * @text Y軸スクロール
 * @desc Y軸スクロール速度の指定
 * @default 0
 * 
 * @help
 * 翻訳:
 * https://fungamemake.com/
 * =============================================================================
 * ♦♦♦ MOG - Menu Background ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * =============================================================================
 * メニューの背景画像を変更できます。
 * 
 * =============================================================================
 * 背景画像は下記フォルダに保存して下さい。
 * /img/menus/
 * 
 * =============================================================================
 * プラグインコマンド
 * =============================================================================
 * プラグインコマンドでメニューの背景を変更できます。
 * 
 */

(() => {

	//=============================================================================
	// ** PLUGIN PARAMETERS
	//=============================================================================
	var Imported = Imported || {};
	Imported.MOG_MenuBackground = true;
	var Moghunter = Moghunter || {};

	Moghunter.parameters = PluginManager.parameters('MOG_MenuBackground');
	Moghunter.mback_fileName = String(Moghunter.parameters['Default FileName'] || "Background_01");
	Moghunter.mback_sufixName = String(Moghunter.parameters['Suffix FileName'] || "_back");
	Moghunter.mback_selfback = String(Moghunter.parameters['Unique Backgrounds'] || "false");
	Moghunter.mback_skipscenes = Object(Moghunter.parameters['Disable Scenes'] || []);
	Moghunter.mback_ox = Number(Moghunter.parameters['Scroll X-Axis'] || 0);
	Moghunter.mback_oy = Number(Moghunter.parameters['Scroll Y-Axis'] || 0);
	Moghunter.mback_opacity = Number(Moghunter.parameters['Window Opacity'] || 0);
	SceneManager._mback = false;

	//==============================
	// * Setup Command
	//==============================
	PluginManager.registerCommand('MOG_MenuBackground', "MenuBackground_Setup", data => {
		const fileName = String(data.fileName);
		const sx = Number(data.sx);
		const sy = Number(data.sy);
		$gameSystem._menuBackgroundData.fileName = fileName;
		$gameSystem._menuBackgroundData.sx = sx;
		$gameSystem._menuBackgroundData.sy = sy;
		SceneManager.setMenuBackgroundBitmap(true);
	});

	//=============================================================================
	// ■■■ ImageManager ■■■
	//=============================================================================

	//==============================
	// * Menus
	//==============================
	ImageManager.loadMenus = function (filename) {
		return this.loadBitmap('img/menus/', filename);
	};

	//=============================================================================
	// ■■■ Game System ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  Initialize
	//==============================
	const _mog_menuBackground_gSystem_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function () {
		_mog_menuBackground_gSystem_initialize.call(this);
		this.setupMenuBackground();
	};

	//==============================
	// * setup Menu Background
	//==============================
	Game_System.prototype.setupMenuBackground = function () {
		this._menuBackgroundData = {};
		this._menuBackgroundData.fileName = String(Moghunter.mback_fileName);
		this._menuBackgroundData.sx = Moghunter.mback_ox;
		this._menuBackgroundData.sy = Moghunter.mback_oy;
		this._menuBackgroundData.needRefresh = false;
	};

	//==============================
	// * Get Par Array
	//==============================
	Game_System.prototype.get_par_array = function (object, value, type) {
		if (value.length === 0) { return };
		var s = value.split(',');
		if (type === 0) {
			for (var i = 0; i < s.length; i++) { object.push(String(s[i])); };
		} else {
			for (var i = 0; i < s.length; i++) { object.push(Number(s[i])); };
		};
	};

	//=============================================================================
	// ■■■ Window Base ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  Initialize
	//==============================
	const _mog_menuBack_wbase_initialize = Window_Base.prototype.initialize;
	Window_Base.prototype.initialize = function (rect) {
		_mog_menuBack_wbase_initialize.call(this, rect);
		if (this.needUpdateBackOpacity()) { this.updateBackgroundOpacity() };
	};

	//==============================
	// ♦ ALIAS ♦  Update
	//==============================
	const _alias_mog_mback_wbase_update = Window_Base.prototype.update;
	Window_Base.prototype.update = function () {
		_alias_mog_mback_wbase_update.call(this);
		if (this.needUpdateBackOpacity()) { this.updateBackgroundOpacity() };
	};

	//==============================
	// * Need Update Back Opacity
	//==============================
	Window_Base.prototype.needUpdateBackOpacity = function () {
		if (!SceneManager._mback) { return false };
		return true;
	};

	//==============================
	// * Update Background Opacity
	//==============================
	Window_Base.prototype.updateBackgroundOpacity = function () {
		this.opacity = Moghunter.mback_opacity;
	};

	//=============================================================================
	// ■■■ Scene MenuBase ■■■
	//=============================================================================

	//==============================
	// * Skip Mbackground
	//==============================
	Scene_MenuBase.prototype.needSkipBackgroundScene = function () {
		if (!SceneManager._scene) { return false };
		this._mb_skip_scenes = [];
		$gameSystem.get_par_array(this._mb_skip_scenes, Moghunter.mback_skipscenes, 0);
		for (var i = 0; i < this._mb_skip_scenes.length; i++) {
			if (this._mb_skip_scenes[i] === SceneManager._scene.constructor.name) { return true };
		};
		return false;
	};

	//==============================
	// ♦ ALIAS ♦  Terminate
	//==============================
	const _alias_mog_mback_scmb_terminate = Scene_MenuBase.prototype.terminate;
	Scene_MenuBase.prototype.terminate = function () {
		_alias_mog_mback_scmb_terminate.call(this);
		SceneManager._mback = false;
	};

	//==============================
	// ♦♦♦ ALIAS ♦♦♦  createBackground
	//==============================
	const _mog_menuBack_scnMenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
	Scene_MenuBase.prototype.createBackground = function () {
		SceneManager._mback = false;
		if (!this.needSkipBackgroundScene()) { this.createBackground2(); return };
		_mog_menuBack_scnMenuBase_createBackground.call(this);
	};

	//==============================
	// ♦♦♦ ALIAS ♦♦♦  createBackground
	//==============================
	Scene_MenuBase.prototype.createBackground2 = function () {
		SceneManager._mback = true;
		this._backgroundSprite = new TilingSprite();
		this._backgroundSprite.move(0, 0, Graphics.width, Graphics.height);
		this.refreshBackgroundBitmap();
		this.addChild(this._backgroundSprite);
		if (this.needResizeBackground()) { this.resizeBackground(true) };
	};

	//==============================
	// * refresh Background Bitmap
	//==============================
	Scene_MenuBase.prototype.refreshBackgroundBitmap = function () {
		this._backgroundSpriteName = $gameSystem ? $gameSystem._menuBackgroundData.fileName : "";
		this._backgroundSprite.bitmap = SceneManager.backgroundMenuBitmap();
		this._backgroundSprite.visible = false;
		this._backgroundSpriteResize = true;
	};

	//==============================
	// * need Resize Background
	//==============================
	Scene_MenuBase.prototype.needResizeBackground = function () {
		if (!this._backgroundSprite) { return false };
		if (!this._backgroundSpriteResize) { return false }
		if (!this._backgroundSprite.bitmap.isReady()) { return false };
		return true;
	};

	//==============================
	// * resize Background
	//==============================
	Scene_MenuBase.prototype.resizeBackground = function () {
		this._backgroundSpriteResize = false
		this._backgroundSprite.visible = true;
		this._backgroundSprite.scale.x = Graphics.width / this._backgroundSprite.bitmap.width;
		this._backgroundSprite.scale.y = Graphics.height / this._backgroundSprite.bitmap.height;
		this._backgroundSprite.move(0, 0, this._backgroundSprite.bitmap.width, this._backgroundSprite.bitmap.height);
	};

	//==============================
	// * update Menu Background
	//==============================
	Scene_MenuBase.prototype.updateMenuBackground = function () {
		this._backgroundSprite.origin.x += $gameSystem._menuBackgroundData.sx;
		this._backgroundSprite.origin.y += $gameSystem._menuBackgroundData.sy;
		if (this.needResizeBackground()) { this.resizeBackground() };
		if (this.needRefreshBackground()) {
			SceneManager.setMenuBackgroundBitmap(false);
			this.refreshBackgroundBitmap();
		};
	};

	//==============================
	// * needRefreshBackground
	//==============================
	Scene_MenuBase.prototype.needRefreshBackground = function () {
		if (!$gameSystem) { return false }
		if (this._backgroundSpriteName != $gameSystem._menuBackgroundData.fileName) { return true };
		return false;
	};

	//==============================
	// ♦ ALIAS ♦  Update
	//==============================
	const _mog_mback_scbase_update = Scene_MenuBase.prototype.update;
	Scene_MenuBase.prototype.update = function () {
		_mog_mback_scbase_update.call(this);
		if (this._backgroundSprite) { this.updateMenuBackground() };
	};

	//=============================================================================
	// ■■■ Scene Map ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  Terminate
	//==============================
	const _mog_menuBack_scnMap_terminate = Scene_Map.prototype.terminate;
	Scene_Map.prototype.terminate = function () {
		_mog_menuBack_scnMap_terminate.call(this);
		SceneManager.setMenuBackgroundBitmap(false);
	};

	//==============================
	// ♦ ALIAS ♦  call Menu
	//==============================
	const _mog_menuBack_scnMap_callMenu = Scene_Map.prototype.callMenu;
	Scene_Map.prototype.callMenu = function () {
		_mog_menuBack_scnMap_callMenu.call(this);
		SceneManager.setMenuBackgroundBitmap(false);
	};

	//=============================================================================
	// ■■■ Scene Manager ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  initialize
	//==============================
	const _mog_menuBack_scnMngr_initialize = SceneManager.initialize;
	SceneManager.initialize = function () {
		_mog_menuBack_scnMngr_initialize.call(this);
		this.setMenuBackgroundBitmap(false);
	};

	//==============================
	// * backgroundName
	//==============================  
	SceneManager.backgroundName = function () {
		if ($gameSystem) { return String($gameSystem._menuBackgroundData.fileName) };
		return String(Moghunter.mback_fileName);
	};

	//==============================
	// * setMenuBackgroundBitmap
	//==============================
	SceneManager.setMenuBackgroundBitmap = function (name, destroy) {
		if (this._backgroundMenuBitmap && destroy) {
			this._backgroundMenuBitmap.destroy();
		}
		this._backgroundMenuBitmap = ImageManager.loadMenus(this.backgroundName());
	};

	//==============================
	// * backgroundMenuBitmap
	//==============================
	SceneManager.backgroundMenuBitmap = function () {
		return this._backgroundMenuBitmap;
	};

})();
