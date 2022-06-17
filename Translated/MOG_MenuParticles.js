//=============================================================================
// MOG_MenuParticles.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Adiciona partículas nas cenas menu.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 * 
 * @param File Name
 * @text File Name
 * @desc Definição do nome de arquivo.
 * @type file
 * @dir img/menus/
 * @default Particles
 * 
 * @param Number of Particles
 * @text Number of Particles
 * @desc Definição do numero de partículas. 
 * @type number
 * @default 15
 * @min 5
 * @max 1000
 *
 * @param Disable Scenes
 * @text Disable Scenes
 * @desc Definição das cenas que terão o efeito desativado.
 * Scene_Name1 , Scene_Name2 , Scene_Name3 ...
 * @default Scene_Test1,Scene_Test2,Scene_Test3
 *
 * @param Unique Particles
 * @text Unique Particles
 * @desc Cada cena terá uma imagem de partícula diferente. 
 * @type boolean 
 * @default false
 *
 * @param X-Axis Speed
 * @text X-axis Speed 
 * @desc Definição da velocidade das partículas na horizontal. 
 * @default 0
 *
 * @param Y-Axis Speed
 * @text Y-axis Speed 
 * @desc Definição da velocidade das partículas na vertical. 
 * @default -1
 *
 * @param Rotation Speed
 * @text Rotation Speed 
 * @desc Definição da velocidade da rotação. 
 * @default 1
 *
 * @param Blend Mode
 * @desc Definição do blend.
 * @text Blend Mode
 * @type select
 * @default Normal
 * @option Additive
 * @value Additive
 * @option Normal
 * @value Normal
 * @option Multiply
 * @value Multiply 
 *
 * @command MenuParticles_Setup
 * @desc Configuração do fundo do menu.
 * @text Setup
 * 
 * @arg fileName
 * @text File Name
 * @desc Definição do nome de arquivo.
 * @type file
 * @dir img/menus/
 * @default Particles
 *
 * @arg power
 * @text Number of Particles
 * @desc Definição do numero de partículas. 
 * @type number
 * @default 15
 * @min 5
 * @max 1000
 * 
 * @arg sx
 * @text X-axis Speed
 * @desc Definição da velocidade das partículas na horizontal. 
 * @default 0
 *
 * @arg sy
 * @text Y-axis Speed 
 * @desc Definição da velocidade das partículas na vertical. 
 * @default -1
 *
 * @arg rt
 * @text Rotation Speed 
 * @desc Definição da velocidade da rotação. 
 * @default 1
 *
 * @arg blendMode
 * @text Blend Mode
 * @desc Definição do blend.
 * @text Blend Mode
 * @type select
 * @default Normal
 * @option Additive
 * @value Additive
 * @option Normal
 * @value Normal
 * @option Multiply
 * @value Multiply 
 
 * @help
 * =============================================================================
 * ♦♦♦ MOG - Menu Particles ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona partículas nas cenas menu
 * É possivel ativar uma partícula diferente para cada cena ou desativar a 
 * partícula em cenas especificas.
 * =============================================================================
 * As imagens das patículas deverão ficar na paste /img/menus/
 * =============================================================================
 * No caso da opção Unique Particles estiver ativada cada partícula deverá 
 * seguir essa nomeação.
 *
 * SCENE_NAME + _par.png
 *
 * Exemplo.
 *
 * Scene_Menu_par.png
 * Scene_Item_par.png
 * Scene_Skill_par.png
 * etc...
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) メニューにパーティクルを追加します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_MenuParticles.js
 *
 * @param File Name
 * @text ファイル名
 * @desc ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default Particles
 *
 * @param Number of Particles
 * @text 粒子数
 * @desc 粒子数の指定
 * @type number
 * @default 15
 * @min 5
 * @max 1000
 *
 * @param Disable Scenes
 * @text 無効にするシーン
 * @desc エフェクトを無効にするシーンの指定
 * Scene_Name1 , Scene_Name2 , Scene_Name3 ...
 * @default Scene_Test1,Scene_Test2,Scene_Test3
 *
 * @param Unique Particles
 * @text ユニークな粒子
 * @desc シーン毎に異なるパーティクル画像を使う
 * @type boolean
 * @default false
 *
 * @param X-Axis Speed
 * @text X軸速度
 * @desc 水平方向の粒子速度の指定
 * @default 0
 *
 * @param Y-Axis Speed
 * @text Y軸速度
 * @desc 垂直粒子速度の指定
 * @default -1
 *
 * @param Rotation Speed
 * @text 回転速度
 * @desc 回転速度の指定
 * @default 1
 *
 * @param Blend Mode
 * @desc 合成の指定
 * @text 合成方法
 * @type select
 * @default Normal
 * @option 加算
 * @value Additive
 * @option 通常
 * @value Normal
 * @option 乗算
 * @value Multiply
 *
 * @command MenuParticles_Setup
 * @desc メニューの背景設定
 * @text 設定
 *
 * @arg fileName
 * @text ファイル名
 * @desc ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default Particles
 *
 * @arg power
 * @text 粒子数
 * @desc 粒子数の指定
 * @type number
 * @default 15
 * @min 5
 * @max 1000
 *
 * @arg sx
 * @text X軸速度
 * @desc 水平方向の粒子速度の指定
 * @default 0
 *
 * @arg sy
 * @text Y軸速度
 * @desc 垂直粒子速度の指定
 * @default -1
 *
 * @arg rt
 * @text 回転速度
 * @desc 回転速度の指定
 * @default 1
 *
 * @arg blendMode
 * @text 合成方法
 * @desc 合成の指定
 * @type select
 * @default Normal
 * @option 加算
 * @value Additive
 * @option 通常
 * @value Normal
 * @option 乗算
 * @value Multiply
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * ♦♦♦ MOG - Menu Particles ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * メニューにパーティクルを追加します。
 * シーン別に異なるパーティクルを有効/無効にできます。
 * ===========================================================================
 * 必要な画像ファイルを下記に保存して下さい。
 * /img/menus/
 *
 * デフォルトのパーティクル画像ファイルが必要です。
 * Particles.png
 *
 * ===========================================================================
 * シーン別パーティクルが有効の場合、
 * 各パーティクル画像ファイル名は下記の法則に従って下さい。
 *
 * Scene_Name + _par.png
 *
 * 例
 *
 * Scene_Menu_par.png
 * Scene_Item_par.png
 * Scene_Skill_par.png
 * Scene_Equip_par.png
 * Scene_Status_par.png
 * Scene_Options_par.png
 * Scene_Save_par.png
 * Scene_GameEnd_par.png
 * 等...
 *
 */

(() => {
	//=============================================================================
	// ** PLUGIN PARAMETERS
	//=============================================================================
	var Imported = Imported || {};
	Imported.MOG_MenuParticles = true;
	var Moghunter = Moghunter || {};

	Moghunter.parameters = PluginManager.parameters('MOG_MenuParticles');
	Moghunter.mpart_fileName = String(Moghunter.parameters['File Name'] || "Particles");
	Moghunter.mpart_selfpart = String(Moghunter.parameters['Unique Particles'] || "false");
	Moghunter.mpart_skipscenes = Object(Moghunter.parameters['Disable Scenes'] || []);
	Moghunter.mpart_ox = Number(Moghunter.parameters['X-Axis Speed'] || 0);
	Moghunter.mpart_oy = Number(Moghunter.parameters['Y-Axis Speed'] || -1);
	Moghunter.mpart_a = Number(Moghunter.parameters['Rotation Speed'] || 1);
	Moghunter.mpart_number = Number(Moghunter.parameters['Number of Particles'] || 15);
	Moghunter.mpart_blendMode = String(Moghunter.parameters['Blend Mode'] || "Normal");
	SceneManager._mpart = false;

	//==============================
	// * Setup Command
	//==============================
	PluginManager.registerCommand('MOG_MenuParticles', "MenuParticles_Setup", data => {
		const fileName = String(data.fileName);
		const sx = Number(data.sx);
		const sy = Number(data.sy);
		const rt = Number(data.rt);
		const power = Number(data.power);
		const blendMode = $gameSystem.parameterCommandGetBlend(String(data.blendMode));
		$gameSystem._menuParticlesData.fileName = fileName;
		$gameSystem._menuParticlesData.sx = sx;
		$gameSystem._menuParticlesData.sy = sy;
		$gameSystem._menuParticlesData.rt = rt;
		$gameSystem._menuParticlesData.power = (Math.min(Math.max(power, 5), 1000));
		$gameSystem._menuParticlesData.blensMode = blendMode;
		$gameSystem._menuParticlesData.needRefresh = true;
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
	const _mog_menuParticles_gSystem_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function () {
		_mog_menuParticles_gSystem_initialize.call(this);
		this.setupMenuParticles();
	};

	//==============================
	// * Setup Menu Particles
	//==============================
	Game_System.prototype.setupMenuParticles = function () {
		this._menuParticlesData = {};
		this._menuParticlesData.fileName = String(Moghunter.mpart_fileName);
		this._menuParticlesData.sx = Number(Moghunter.mpart_ox);
		this._menuParticlesData.sy = Number(Moghunter.mpart_oy);
		this._menuParticlesData.rt = Number(Moghunter.mpart_a);
		this._menuParticlesData.power = (Math.min(Math.max(Number(Moghunter.mpart_number), 5), 1000));
		this._menuParticlesData.blendMode = this.parameterCommandGetBlend(String(Moghunter.mpart_blendMode));
		this._menuParticlesData.needRefresh = false;
	};

	//==============================
	// * parameterCommandGetBlend
	//==============================
	Game_System.prototype.parameterCommandGetBlend = function (blend) {
		if (blend == "Additive") {
			return 1;
		} else if (blend == "Multiply") { return 2 };
		return 0;
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
	// ■■■ Scene MenuBase ■■■
	//=============================================================================

	//==============================
	// ** create Menu Field 1
	//==============================
	Scene_MenuBase.prototype.createMenuField1 = function () {
		this._menuField1 = new Sprite();
		this._menuField1.z = 10;
		this.addChild(this._menuField1);
	};

	//==============================
	// ** sort MZ
	//==============================
	Scene_MenuBase.prototype.sortMenuMz = function () {
		if (this._menuField1) { this._menuField1.children.sort((a, b) => a.z - b.z) };
		if (this._menuField2) { this._menuField2.children.sort((a, b) => a.z - b.z) };
		if (this._menuField3) { this._menuField3.children.sort((a, b) => a.z - b.z) };
	};

	//==============================
	// * Skip Particles
	//==============================
	Scene_MenuBase.prototype.skip_particles = function () {
		if (!SceneManager._scene) { return false };
		this._mb_skip_scenes = [];
		$gameSystem.get_par_array(this._mb_skip_scenes, Moghunter.mpart_skipscenes, 0);
		for (var i = 0; i < this._mb_skip_scenes.length; i++) {
			if (this._mb_skip_scenes[i] === SceneManager._scene.constructor.name) { return true };
		};
		return false;
	};

	//==============================
	// ♦ ALIAS ♦  Create
	//==============================
	const _mog_mpart_scbase_createBackground = Scene_MenuBase.prototype.createBackground;
	Scene_MenuBase.prototype.createBackground = function () {
		SceneManager._mpart = false;
		_mog_mpart_scbase_createBackground.call(this);
		if (!this._menuField1) { this.createMenuField1() };
		if (!this.skip_particles()) { this.createMenuParticles() };
		this.sortMenuMz();
	};

	//==============================
	// ♦ ALIAS ♦  Terminate
	//==============================
	const _mog_mpart_scmb_terminate = Scene_MenuBase.prototype.terminate;
	Scene_MenuBase.prototype.terminate = function () {
		_mog_mpart_scmb_terminate.call(this);
		SceneManager._mpart = false;
	};

	//==============================
	// * Create Menu Particles
	//==============================
	Scene_MenuBase.prototype.createMenuParticles = function () {
		this._menuParticles = new MenuParticles()
		this._menuParticles.z = 30;
		this._menuField1.addChild(this._menuParticles);
		SceneManager._mpart = true;
	};

	//=============================================================================
	// ■■■ MenuParticles ■■■
	//=============================================================================
	function MenuParticles() {
		this.initialize.apply(this, arguments);
	};

	MenuParticles.prototype = Object.create(Sprite.prototype);
	MenuParticles.prototype.constructor = MenuParticles;

	//==============================
	// ♦♦ Initialize
	//==============================
	MenuParticles.prototype.initialize = function () {
		Sprite.prototype.initialize.call(this);
		this.createParticles();
	};

	//==============================
	// * File Name
	//==============================
	MenuParticles.prototype.fileName = function () {
		if (this._self_par && SceneManager._scene) { return SceneManager._scene.constructor.name + "_par" }
		return String($gameSystem._menuParticlesData.fileName);
	};

	//==============================
	// * max Particles
	//==============================
	MenuParticles.prototype.maxParticles = function () {
		return $gameSystem._menuParticlesData.power
	};

	//==============================
	// * Create Mbackground
	//==============================
	MenuParticles.prototype.createParticles = function () {
		this._self_par = false;
		if (String(Moghunter.mpart_selfpart) === "true") { this._self_par = true };
		this._sprite_particles = [];
		this._sprite_particles_data = [];
		this._nw = [0, 0];
		if (Moghunter.mpart_ox > 0) { this._nw[0] = -(Graphics.width / 3) };
		if (Moghunter.mpart_ox < 0) { this._nw[0] = (Graphics.width / 3) };
		this._nw[1] = Math.abs(this._nw[0]);
		for (i = 0; i < this.maxParticles(); i++) {
			this._sprite_particles.push(new Sprite(ImageManager.loadMenus(this.fileName())));
			this.addChild(this._sprite_particles[i]);
			this._sprite_particles_data[i] = []
			this.reset_particles(i);
			this._sprite_particles[i].x = Math.randomInt(Graphics.width);
			this._sprite_particles[i].y = Math.randomInt(Graphics.height);
			this._sprite_particles[i].opacity = 0;
			this._sprite_particles[i].blendMode = $gameSystem._menuParticlesData.blendMode;
			this._sprite_particles[i].z = 30 + i;
		};
	};

	//==============================
	// * Reset Particles
	//==============================	
	MenuParticles.prototype.reset_particles = function (i) {
		this._sprite_particles_data[i][0] = ((Math.random() * 2) + 0.4) * $gameSystem._menuParticlesData.sx;
		this._sprite_particles_data[i][1] = ((Math.random() * 2) + 0.4) * $gameSystem._menuParticlesData.sy;
		this._sprite_particles_data[i][2] = ((Math.random() * $gameSystem._menuParticlesData.rt)) * 0.01;
		this._sprite_particles[i].opacity = 0;
		this._sprite_particles[i].x = this._nw[0] + Math.randomInt(Graphics.width);
		var pz = ((Math.random() * 0.5) * 1);
		this._sprite_particles[i].scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
		if (Moghunter.mpart_oy < 0) {
			this._sprite_particles[i].y = Graphics.boxHeight + this._sprite_particles[i].height * 3;
		} else if (Moghunter.mpart_oy > 0) {
			this._sprite_particles[i].y = -this._sprite_particles[i].height * 3;
		} else {
			this._sprite_particles[i].y = Math.randomInt(Graphics.height);
		};
		if (this._sprite_particles_data[i][0] == 0 && this._sprite_particles_data[i][1] == 0) {
			this._sprite_particles[i].x = -Graphics.width
		};
	};

	//==============================
	// * Update Particles
	//==============================
	MenuParticles.prototype.updateParticles = function () {
		for (var i = 0; i < this._sprite_particles.length; i++) {
			this._sprite_particles[i].x += this._sprite_particles_data[i][0];
			this._sprite_particles[i].y += this._sprite_particles_data[i][1];
			this._sprite_particles[i].opacity += 4;
			this._sprite_particles[i].rotation += this._sprite_particles_data[i][2];
			if (this.need_reset_particles(i)) { this.reset_particles(i); };
		};
	};

	//==============================
	// * Need Reset Particles
	//==============================	
	MenuParticles.prototype.need_reset_particles = function (i) {
		if (this._sprite_particles[i].x < -this._nw[1] - this._sprite_particles[i].width * 3) { return true };
		if (this._sprite_particles[i].x > this._nw[1] + Graphics.width + this._sprite_particles[i].width * 3) { return true };
		if (this._sprite_particles[i].y < - this._sprite_particles[i].height * 3) { return true };
		if (this._sprite_particles[i].y > Graphics.height + this._sprite_particles[i].height * 3) { return true };
		return false;
	};

	//==============================
	// ♦♦ Update
	//==============================
	MenuParticles.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (this._sprite_particles) { this.updateParticles() };
	};

})();
