//=============================================================================
// MOG_TouchAnimation.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta uma animação de toque.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 * 
 * @param File Name
 * @text File Name
 * @desc Definição do nome de arquivo.
 * @type file
 * @dir img/system/
 * @default TouchParticles
 * 
 * @param Animation
 * @text Animation 
 * @desc Definição do tipo de animação.
 * @type select
 * @default Fireworks
 * @option Fireworks
 * @value Fireworks
 * @option Random
 * @value Random
 * @option Zoom Out
 * @value Zoom Out
 * @option Zoom In
 * @value Zoom In 
 * 
 * @param Number of Particles
 * @text Number of Particles
 * @desc Definição do numero de partículas. (1 - 999)
 * @type number
 * @default 10
 * @min 1
 * @max 999
 *
 * @param X-Axis Offset
 * @text X-Axis Offset
 * @desc Definição X-axis da animação. 
 * @default 0
 *
 * @param Y-Axis Offset
 * @text Y-Axis Offset
 * @desc Definição Y-axis da animação. 
 * @default 0
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
 * @param Duration
 * @text Duration
 * @desc Definição do tempo da animação. (1 - 999) 
 * @type number
 * @default 10
 * @min 1
 * @max 999
 *
 * @param Fade Speed
 * @text Fade Speed
 * @desc Definição da velocidade do fade. (2 - 125)
 * @type number
 * @default 20
 * @min 2
 * @max 125
 *
 * @param Random Tone
 * @text Random Tone
 * @desc Ativar cores aleatórias.
 * @type boolean
 * @default true
 *
 * @help
 * =============================================================================
 * ♦♦♦ MOG - Touch Animation ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta uma animação de toque.
 * Grave a imagem "TouchParticles.png" na pasta /img/system/
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) タッチにアニメーションを追加します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_TouchAnimation.js
 *
 * @param File Name
 * @text ファイル名
 * @desc ファイル名の指定
 * @type file
 * @dir img/system/
 * @default TouchParticles
 *
 * @param Animation
 * @text アニメーション
 * @desc アニメーションの種類の指定
 * @type select
 * @default Fireworks
 * @option 花火
 * @value Fireworks
 * @option ランダム
 * @value Random
 * @option ズームアウト
 * @value Zoom Out
 * @option ズームイン
 * @value Zoom In
 *
 * @param Number of Particles
 * @text 粒子数
 * @desc 粒子数の指定 (1-999)
 * @type number
 * @default 10
 * @min 1
 * @max 999
 *
 * @param X-Axis Offset
 * @text X軸オフセット
 * @desc アニメーションのX軸指定
 * @default 0
 *
 * @param Y-Axis Offset
 * @text Y軸オフセット
 * @desc アニメーションのY軸の指定
 * @default 0
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
 * @param Duration
 * @text 表示時間
 * @desc アニメーション時間の指定 (1-999)
 * @type number
 * @default 10
 * @min 1
 * @max 999
 *
 * @param Fade Speed
 * @text フェード速度
 * @desc フェード速度 (2-125)
 * @type number
 * @default 20
 * @min 2
 * @max 125
 *
 * @param Random Tone
 * @text ランダムトーン
 * @desc ランダムな色を有効にします。
 * @type boolean
 * @default true
 * @on 有効
 * @off 無効
 *
 * @help
 * ===========================================================================
 * ♦♦♦ MOG - Touch Animation ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * タッチにアニメーションを追加します。
 * 画像「TouchParticles.png」を下記に保存します。
 *
 * /img/system/
 *
 */

(() => {

	//=============================================================================
	// ** PLUGIN PARAMETERS
	//=============================================================================
	var Imported = Imported || {};
	Imported.MOG_TouchAnimation = true;
	var Moghunter = Moghunter || {};

	Moghunter.parameters = PluginManager.parameters('MOG_TouchAnimation');
	Moghunter.touchAnime_mode = String(Moghunter.parameters['Animation'] || "Fireworks");
	Moghunter.touchAnime_fileName = String(Moghunter.parameters['File Name'] || "TouchParticles");
	Moghunter.touchAnime_power = Number(Moghunter.parameters['Number of Particles'] || 10);
	Moghunter.touchAnime_x = Number(Moghunter.parameters['X-Axis Offset'] || 0);
	Moghunter.touchAnime_y = Number(Moghunter.parameters['Y-Axis Offset'] || 0);
	Moghunter.touchAnime_fadeSpeed = Number(Moghunter.parameters['Fade Speed'] || 20);
	Moghunter.touchAnime_duration = Number(Moghunter.parameters['Duration'] || 10);
	Moghunter.touchAnime_blendMode = String(Moghunter.parameters['Blend Mode'] || "Normal");
	Moghunter.touchAnime_toneRandom = String(Moghunter.parameters['Random Tone'] || true);

	DataManager._touchPart = {};
	DataManager._touchPart.x = 0;
	DataManager._touchPart.y = 0;
	DataManager._touchPart.needRefresh = false;
	DataManager._touchPart.skip = false;
	DataManager._touchPart.wait = 0;
	DataManager._touchPart.wait2 = 0;

	//=============================================================================
	// ■■■ Scene Base ■■■
	//=============================================================================

	//==============================
	// * create Sprite Field
	//==============================
	Scene_Base.prototype.createSpriteField3 = function () {
		this._spriteField3 = new Sprite();
		this._spriteField3.z = 100;
		this.addChild(this._spriteField3);
	};

	//==============================
	// * sort Sprite Field
	//==============================
	Scene_Base.prototype.sortSpriteField = function () {
		if (this._spriteField1) { this._spriteField1.children.sort((a, b) => a.z - b.z) };
		if (this._spriteField2) { this._spriteField2.children.sort((a, b) => a.z - b.z) };
		if (this._spriteField3) { this._spriteField3.children.sort((a, b) => a.z - b.z) };
	};

	//==============================
	// * createTouchParticles
	//==============================
	Scene_Base.prototype.createTouchParticles = function () {
		DataManager._touchPart.wait = 0;
		DataManager._touchPart.wait2 = 5;
		DataManager._touchPart.x = 0;
		DataManager._touchPart.y = 0;
		DataManager._touchPart.needRefresh = false;
		DataManager._touchPart.skip = false;
		DataManager._touchPart.map = false;
		this._touchPar = new TouchParticles();
		this._touchPar.z = 450;
		this._spriteField3.addChild(this._touchPar);
	};

	//==============================
	// * update Touch Animation Base
	//==============================
	Scene_Base.prototype.updateTouchAnimationBase = function () {
		if (!this._spriteField3) { this.createSpriteField3() };
		if (!this._touchPar) { this.createTouchParticles() };
		if (DataManager._touchPart.wait2 > 0) { DataManager._touchPart.wait2-- };
		if (DataManager._touchPart.wait2 == 0) { this.updateTouchAnimation() };
	};

	//==============================
	// * update Touch Particles
	//==============================
	Scene_Base.prototype.updateTouchAnimation = function () {
		if (TouchInput.isTriggered()) {
			if (DataManager._touchPart.wait == 0) {
				DataManager._touchPart.wait = 2
			};
			this.setTouchAnimePos();
		};
		if (DataManager._touchPart.wait > 0) {
			DataManager._touchPart.wait--;
			if (DataManager._touchPart.wait == 0 && this.isTouchAnimeEnabled()) {
				DataManager._touchPart.needRefresh = true;
			};
			;
		}
	};

	//==============================
	// * setTouchAnimePos
	//==============================
	Scene_Base.prototype.setTouchAnimePos = function () {
		DataManager._touchPart.map = false;
		DataManager._touchPart.x = TouchInput.x;
		DataManager._touchPart.y = TouchInput.y;
	};

	//==============================
	// * isTouchAnimeEnabled
	//==============================
	Scene_Base.prototype.isTouchAnimeEnabled = function () {
		if (DataManager._touchPart.skip) { return false };
		return true;
	};

	//==============================
	// ♦ ALIAS ♦  Initialize
	//==============================
	const _mog_ScnBase_touchPar_update = Scene_Base.prototype.update;
	Scene_Base.prototype.update = function () {
		_mog_ScnBase_touchPar_update.call(this);
		this.updateTouchAnimationBase();
	};

	//=============================================================================
	// ■■■ Scene Map ■■■
	//=============================================================================

	//==============================
	// * setTouchAnimePos
	//==============================
	Scene_Map.prototype.setTouchAnimePos = function () {
		DataManager._touchPart.map = true;
		const mx = $gameMap.displayX() * $gameMap.tileWidth();
		const my = $gameMap.displayY() * $gameMap.tileHeight();
		DataManager._touchPart.x = TouchInput.x + mx;
		DataManager._touchPart.y = TouchInput.y + my;
	};

	//=============================================================================
	// ■■■ Sprite Button ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  on Click
	//==============================
	const _mog_touchAnime_sprtButton_onClick = Sprite_Button.prototype.onClick;
	Sprite_Button.prototype.onClick = function () {
		_mog_touchAnime_sprtButton_onClick.call(this);
		DataManager._touchPart.wait = 10;
	};

	//=============================================================================
	// ■■■ TouchParticles ■■■
	//=============================================================================
	function TouchParticles() {
		this.initialize.apply(this, arguments);
	};

	TouchParticles.prototype = Object.create(Sprite.prototype);
	TouchParticles.prototype.constructor = TouchParticles;

	//==============================
	// ♦♦ Initialize
	//==============================
	TouchParticles.prototype.initialize = function () {
		Sprite.prototype.initialize.call(this);
		this._mode = this.getMode(String(Moghunter.touchAnime_mode));
		this._power = Math.min(Math.max(Moghunter.touchAnime_power, 1), 999);
		this._blendType = this.getBlend(String(Moghunter.touchAnime_blendMode));
		this.createParticles();
	};

	//==============================
	// * get Mode
	//==============================
	TouchParticles.prototype.getMode = function (mode) {
		if (mode == "Random") {
			return 1;
		} else if (mode == "Zoom Out") {
			return 2;
		} else if (mode == "Zoom In") { return 3 };
		return 0;
	};

	//==============================
	// * weather get Blend
	//==============================
	TouchParticles.prototype.getBlend = function (blend) {
		if (blend == "Additive") {
			return 1;
		} else if (blend == "Multiply") { return 2 };
		return 0;
	};


	//==============================
	// * file Name
	//==============================
	TouchParticles.prototype.fileNAme = function () {
		return String(Moghunter.touchAnime_fileName);
	};

	//==============================
	// * create Particles
	//==============================
	TouchParticles.prototype.createParticles = function () {
		this._particlesSprites = [];
		for (var i = 0; i < this.power(); i++) {
			this._particlesSprites[i] = new Sprite(ImageManager.loadSystem(this.fileNAme()));
			this.setBaseData(this._particlesSprites[i], i);
			this.addChild(this._particlesSprites[i]);
		};
	};

	//==============================
	// * mode
	//==============================
	TouchParticles.prototype.mode = function () {
		return this._mode;
	};

	//==============================
	// * x Pos
	//==============================
	TouchParticles.prototype.xPos = function () {
		return DataManager._touchPart.x;
	};

	//==============================
	// * y Pos
	//==============================
	TouchParticles.prototype.yPos = function () {
		return DataManager._touchPart.y;
	};

	//==============================
	// * x Offset
	//==============================
	TouchParticles.prototype.xOffset = function () {
		return Moghunter.touchAnime_x;
	};

	//==============================
	// * y Offset
	//==============================
	TouchParticles.prototype.yOffset = function () {
		return Moghunter.touchAnime_y;
	};

	//==============================
	// * power
	//==============================
	TouchParticles.prototype.power = function () {
		if (this.mode() == 2) { return 1 };
		if (this.mode() == 3) { return 1 };
		return this._power;
	};

	//==============================
	// * force Hide
	//==============================
	TouchParticles.prototype.forcedHide = function (sprite) {
		if (DataManager._touchPart.skip) { return true };
		if (DataManager._touchPart.wait > 0) { return true };
		return false;
	};

	//==============================
	// * set Base Data
	//==============================
	TouchParticles.prototype.setBaseData = function (sprite, index) {
		sprite.index = index;
		sprite.opacity = 0;
		sprite.anchor.x = 0.5;
		sprite.anchor.y = 0.5;
		sprite.sx = [0, 1];
		sprite.sy = [0, 1];
		sprite.rt = [0, 0.08];
		sprite.sc = 0;
		sprite.wait = 0;
		sprite.blendType = this._blendType;
		sprite.fadeSpeed = Math.min(Math.max(Moghunter.touchAnime_fadeSpeed, 2), 125);
		sprite.duration = 0;
		sprite.duration2 = Math.min(Math.max(Moghunter.touchAnime_duration, 1), 999);
		if (String(Moghunter.touchAnime_toneRandom) == "true") { this.setToneRandom(sprite, index) };
	};

	//==============================
	// * set Tone Random
	//==============================
	TouchParticles.prototype.setToneRandom = function (sprite, index) {
		const r = Math.randomInt(255);
		const g = Math.randomInt(255);
		const b = Math.randomInt(255);
		const colorTone = [r, g, b, 255]
		sprite.setColorTone(colorTone);
	};

	//==============================
	// * refresh particles
	//==============================
	TouchParticles.prototype.refreshParticles = function (sprite, index) {
		sprite.x = this.xPos();
		sprite.y = this.yPos();
		if (this.mode() == 0) {
			this.setAnimation1(sprite, index);
		} else if (this.mode() == 1) {
			this.setAnimation2(sprite, index);
		} else if (this.mode() == 2) {
			this.setAnimation3(sprite, index);
		} else if (this.mode() == 3) {
			this.setAnimation4(sprite, index);
		};
	};

	//==============================
	// * set Animation 1
	//==============================
	TouchParticles.prototype.setAnimation1 = function (sprite, index) {
		sprite.duration = sprite.duration2 + Math.randomInt(20);
		sprite.wait = 0;
		var r = 0.7 + Math.abs(Math.random() * sprite.sx[1]);
		var d = Math.randomInt(100);
		sprite.sx[0] = d > 40 ? r : -r;
		sprite.sx[0] = d > 90 ? 0 : sprite.sx[0];
		var r = 0.7 + Math.abs(Math.random() * sprite.sy[1]);
		var d = Math.randomInt(100);
		sprite.sy[0] = d > 40 ? r : -r;
		sprite.sy[0] = d > 90 ? 0 : sprite.sy[0];
		var r = 0.01 + Math.abs(Math.random() * sprite.rt[1]);
		sprite.rt[0] = sprite.rt[1] > 0 ? r : -r;
		var pz = ((Math.random() * 0.5) * 1);
		sprite.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	};

	//==============================
	// * set Animation 2
	//==============================
	TouchParticles.prototype.setAnimation2 = function (sprite, index) {
		sprite.duration = sprite.duration2 + Math.randomInt(20);
		sprite.wait = Math.randomInt(20);
		sprite.x += -30 + Math.randomInt(60);
		sprite.y += -30 + Math.randomInt(60);
		sprite.sc = 0.02;
		var pz = ((Math.random() * 0.5) * 1);
		sprite.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	};

	//==============================
	// * set Animation 3
	//==============================
	TouchParticles.prototype.setAnimation3 = function (sprite, index) {
		sprite.duration = sprite.duration2 + 10;
		sprite.wait = 0;
		sprite.sc = 0.04;
		var pz = 0.1;
		sprite.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	};

	//==============================
	// * set Animation 4
	//==============================
	TouchParticles.prototype.setAnimation4 = function (sprite, index) {
		sprite.duration = sprite.duration2 + 10;
		sprite.wait = 0;
		sprite.sc = -0.1;
		var pz = 0.1;
		sprite.scale = new PIXI.Point(3.0, 3.0);
	};

	//==============================
	// * update particles
	//==============================
	TouchParticles.prototype.updateParticles = function (sprite, index) {
		if (this.forcedHide(sprite, index)) {
			this.updateHide(sprite, index);
		} else {
			if (sprite.wait > 0) {
				sprite.wait--;
			} else {
				this.updateParticlesData(sprite, index);
			};
		};
	};

	//==============================
	// * updateParticlesData
	//==============================
	TouchParticles.prototype.updateParticlesData = function (sprite, index) {
		sprite.visible = true;
		sprite.x += sprite.sx[0];
		sprite.y += sprite.sy[0];
		sprite.rotation += sprite.rt[0];
		if (sprite.scale.x < 4.00) { sprite.scale.x += sprite.sc };
		if (sprite.scale.x < 0.00) { sprite.scale.x = 0.00 };
		sprite.scale.y = sprite.scale.x;
		this.updateFade(sprite, index)
	};

	//==============================
	// * update Hide
	//==============================
	TouchParticles.prototype.updateHide = function (sprite, index) {
		sprite.visible = false;
		sprite.duration = 0;
		sprite.opacity = 0;
	};

	//==============================
	// * update Fade
	//==============================
	TouchParticles.prototype.updateFade = function (sprite, index) {
		if (sprite.duration > 0) {
			sprite.duration--;
			sprite.opacity += 20;
		} else {
			sprite.opacity -= sprite.fadeSpeed;
		};
	};

	//==============================
	// * refresh Base
	//==============================
	TouchParticles.prototype.refreshBase = function () {
		DataManager._touchPart.needRefresh = false;
		for (var i = 0; i < this._particlesSprites.length; i++) {
			this.refreshParticles(this._particlesSprites[i], i);
		};
	};

	//==============================
	// * need Refresh
	//==============================
	TouchParticles.prototype.needRefresh = function () {
		return DataManager._touchPart.needRefresh;
	};

	//==============================
	// * update Position Real
	//==============================
	TouchParticles.prototype.updatePositionReal = function () {
		if (DataManager._touchPart.map) {
			this.updatePositionMap()
		} else {
			this.updatePositionNormal()
		};
	};

	//==============================
	// * update Position Map
	//==============================
	TouchParticles.prototype.updatePositionMap = function () {
		const mx = $gameMap.displayX() * $gameMap.tileWidth();
		const my = $gameMap.displayY() * $gameMap.tileHeight();
		this.x = this.xOffset() - mx;
		this.y = this.yOffset() - my;
	};

	//==============================
	// * update Position Normal
	//==============================
	TouchParticles.prototype.updatePositionNormal = function () {
		this.x = this.xOffset();
		this.y = this.yOffset();
	};

	//==============================
	// ♦♦ Update
	//==============================
	TouchParticles.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (this.needRefresh()) { this.refreshBase() };
		for (var i = 0; i < this._particlesSprites.length; i++) {
			this.updateParticles(this._particlesSprites[i], i);
		};
		this.updatePositionReal();
	};

})();
