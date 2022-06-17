//=============================================================================
// MOG_AuraEffect.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Adiciona a animação de aura e partículas nos inimigos.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 + 
 * @help  
 * =============================================================================
 * ♦♦♦ MOG - Aura Effect ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/04
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona a animação de aura e partículas nos inimigos.
 * As imagens da aura e partículas devem ser gravadas na
 * mesma pasta que ficam os battlers /img/sv_enemies/ ou img/enemies/
 *
 * =============================================================================
 * Para ativar a aura use a Tag abaixo na caixa de notas.
 *
 * aura effect: Z_INDEX : TYPE : FILE_NAME : OPACITY : BLENDMODE : ROTATION
 *
 * Z_INDEX - Define o valor Z da imagem. (0 a 1) 
 *           0 - Abaixo da imagem do battler
 *           1 - Acima da imagem do battler.
 * TYPE - Tipo de animação (0 a 2)
 *        0 - No Animation.
 *        1 - Pulse
 *        2 - Zoom
 * FILE_NAME = Nome do arquivo. (Defina como "battler" se deseja usar a imagem do
 *             battler) 
 * BLENDMODE = Modo Blend
 * ROTATION = Girar a imagem.
 *
 * Exemplo
 * 
 * Aura Effect : 0 : 1 : Battler : 255 : 1 : 0
 *
 * =============================================================================
 * Para ativar as partículas use a Tag abaixo na caixa de notas.
 *
 * particle effect : Z_INDEX : POWER : FILE_NAME : BLEND_MODE : SPEED_X : SPEED_Y
 *
 * Z_INDEX - Define o valor Z da imagem. (0 a 1) 
 *           0 - Abaixo da imagem do baltter
 *           1 - Acima da imagem do battler.
 * POWER - Quantidade de partículas.
 * FILE_NAME - Nome do arquivo.
 * BLEND_MODE - Tipo de Blend.
 * SPEED_X - Velocidade de movimento X-Axis.
 * SPEED_Y - Velocidade de movimento Y-Axis.
 *
 * Exemplo
 * 
 * Particle Effect : 1 : 20 : Particles2 : 0 : 0 : 1
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) オーラとパーティクルアニメーションを敵に追加します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_AuraEffect.js
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * ♦♦♦ MOG - Aura Effect ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/04
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * オーラとパーティクルアニメーションを敵に追加します。
 * オーラとパーティクルの画像は、敵と同じフォルダに保存する必要があります。
 *
 * /img/sv_enemies/
 * または
 * /img/enemies/
 *
 * サンプルプロジェクトの例
 *
 * Magic.png
 * Particles.png
 * Particles2.png
 * Particles3.png
 *
 * ===========================================================================
 * 敵キャラのメモ欄に下記のタグを記入すると、オーラが有効になります。
 *
 * aura effect: Z_INDEX:TYPE:FILE_NAME:OPACITY:BLENDMODE:ROTATION
 *
 * Z_INDEX - オーラのZ値(0:敵画像の下 / 1:敵画像の上)
 *
 * TYPE - アニメーションタイプ(0:なし / 1:パルス / 2:ズーム)
 *
 * FILE_NAME =ファイル名(敵の画像を使用する場合、"battler"とします)
 * OPACITY =
 * BLENDMODE = 合成方法(0:通常 / 1:加算 / 2:乗算)
 * ROTATION  = 画像を回転させる速度
 *               (正:時計回り / 負:反時計回り。絶対値が大きいほど高速。)
 *
 * 例
 *
 * Aura Effect : 0 : 1 : Battler : 255 : 1 : 0
 *
 * ===========================================================================
 * 敵キャラのメモ欄に下記のタグを記入すると、パーティクルが有効になります。
 *
 * particle effect: Z_INDEX:POWER:FILE_NAME:BLEND_MODE:SPEED_X:SPEED_Y
 *
 * Z_INDEX - パーティクルのZ値(0:敵画像の下 / 1:敵画像の上)
 *
 * POWER - パーティクル数
 * FILE_NAME - ファイル名
 * BLENDMODE = 合成方法(0:通常 / 1:加算 / 2:乗算)
 * SPEED_X - X軸の移動速度
 * SPEED_Y - Y軸の移動速度
 *
 * 例
 *
 * Particle Effect : 1 : 20 : Particles2 : 0 : 0 : 1
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_AuraEffect = true;
var Moghunter = Moghunter || {};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// ** iniMembers
//==============================
var _mog_aura_gbattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function () {
	_mog_aura_gbattler_initMembers.call(this);
	this.setupAuraEffect();
};

//==============================
// ** setup Aura
//==============================
Game_Battler.prototype.setupAuraEffect = function () {
	this._auraEffect = {};
	this._auraEffect.needRefresh = [true, true];;
	this._auraEffect.mode = -1;
	this._auraEffect.fileName = "";
	this._auraEffect.z = 0;
	this._auraEffect.opacity = 255;
	this._auraEffect.blendMode = 0;
	this._auraEffect.rotation = 0;

	this._particlesEffect = {};
	this._particlesEffect.mode = -1;
	this._particlesEffect.z = 0
	this._particlesEffect.power = 0;
	this._particlesEffect.fileName = "";
	this._particlesEffect.blendMode = 0;
	this._particlesEffect.sx = 0;
	this._particlesEffect.sy = 0;
};

//==============================
// ** get Aura Data
//==============================
Game_Battler.prototype.getAuraData = function () {
	this.notetags().forEach(function (note) {
		var note_data = note.split(' : ')
		if (note_data[0].toLowerCase() == "aura effect") {
			this._auraEffect.z = Math.min(Math.max(Number(note_data[1]), 0), 1);
			this._auraEffect.mode = Math.min(Math.max(Number(note_data[2]), 0), 2);
			this._auraEffect.fileName = String(note_data[3]);
			this._auraEffect.opacity = Math.min(Math.max(Number(note_data[4]), 0), 255);
			this._auraEffect.blendMode = Math.min(Math.max(Number(note_data[5]), 0), 2);
			this._auraEffect.rotation = Number(note_data[6]);
		};
		if (note_data[0].toLowerCase() == "particle effect") {
			this._particlesEffect.mode = 0;
			this._particlesEffect.z = Math.min(Math.max(Number(note_data[1]), 0), 1);
			this._particlesEffect.power = Number(note_data[2]);
			this._particlesEffect.fileName = String(note_data[3]);
			this._particlesEffect.blendMode = Math.min(Math.max(Number(note_data[4]), 0), 2);
			this._particlesEffect.sx = Number(note_data[5]);
			this._particlesEffect.sy = Number(note_data[6]);
		};
	}, this);
};


//=============================================================================
// ** Game Enemy
//=============================================================================

//==============================
// * Transform
//==============================
var _mog_aura_transform = Game_Enemy.prototype.transform
Game_Enemy.prototype.transform = function (enemyId) {
	_mog_aura_transform.call(this, enemyId)
	this._auraEffect.needRefresh = [true, true];
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function () {
	if (this.isEnemy()) { return this.enemy().note.split(/[\r\n]+/) };
	if (this.isActor()) { return this.actor().note.split(/[\r\n]+/) };
};

//=============================================================================
// ** Spriteset_Battle
//=============================================================================

//==============================
// * create Enemies
//==============================
var _mog_auraEffect_sprtBat_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function () {
	this._auraSprite = [];
	this.createAuraSprite(0);
	_mog_auraEffect_sprtBat_createEnemies.call(this);
	this.createAuraSprite(1);
	this.addSpriteDataAura();
};

//==============================
// * create Aura Sprite
//==============================
Spriteset_Battle.prototype.createAuraSprite = function (index) {
	this._auraSprite[index] = [];
	for (var i = 0; i < $gameTroop.members().length; i++) {
		this._auraSprite[index][i] = new SpriteAura(index);
		this._auraSprite[index][i].z = index;
		this._battleField.addChild(this._auraSprite[index][i]);
	};
};

//==============================
// * add Sprite Data Aura
//==============================
Spriteset_Battle.prototype.addSpriteDataAura = function () {
	for (var i = 0; i < this._enemySprites.length; i++) {
		var sprite = this._enemySprites[i];
		this._auraSprite[0][i].addSprite(sprite);
		this._auraSprite[1][i].addSprite(sprite);
	};
};

//=============================================================================
// * Sprite Aura
//=============================================================================
function SpriteAura() {
	this.initialize.apply(this, arguments);
};

SpriteAura.prototype = Object.create(Sprite.prototype);
SpriteAura.prototype.constructor = SpriteAura;

//==============================
// * Initialize
//==============================
SpriteAura.prototype.initialize = function (zindex) {
	Sprite.prototype.initialize.call(this);
	this._zIndex = zindex;
	this.z = this._zIndex;
	this._initial = true;
	this._sprite = null;
};

//==============================
// * add Sprite
//==============================
SpriteAura.prototype.addSprite = function (sprite) {
	this._sprite = sprite;
};

//==============================
// * battler
//==============================
SpriteAura.prototype.battler = function () {
	return this._sprite._battler;
};

//==============================
// * can Update Aura
//==============================
SpriteAura.prototype.canUpdateAura = function () {
	if (!this._sprite) { return false };
	if (!this._sprite.bitmap) { return false };
	if (!this.battler()) { return false };
	if (Imported.MOG_EmergeMotion) {
		if (this.battler()._emergeMotion.enabled) { return false };
	};
	return true;
};

//==============================
// * removeSprites
//==============================
SpriteAura.prototype.removeSprites = function () {
	if (this._auraSprite) {
		this.removeChild(this._auraSprite)
	};
	if (this._particles) {
		for (var i = 0; i < this._particles.length; i++) {
			this.removeChild(this._particles[i]);
			this._particles[i] = null;
		};
	};
	this._auraSprite = null;
	this._particles = null;
};

//==============================
// * can Update Aura
//==============================
SpriteAura.prototype.getData = function () {
	this._sprite._battler._auraEffect.needRefresh[this._zIndex] = false;
	this.removeSprites();
	this.battler().getAuraData();
	this.refreshAuraSprites();
};

//==============================
// * need Get Data
//==============================
SpriteAura.prototype.needGetData = function () {
	return this.battler()._auraEffect.needRefresh[this._zIndex]
};

//==============================
// * refresh Aura Sprites
//==============================
SpriteAura.prototype.refreshAuraSprites = function () {
	if (this.battler()._auraEffect.mode >= 0 && this._zIndex == this.battler()._auraEffect.z) {
		this.createAuraSprite();
	};
	if (this.battler()._particlesEffect.power > 0 && this._zIndex == this.battler()._particlesEffect.z) {
		this.createParticles();
	};
};

//==============================
// * create Aura Sprite
//==============================
SpriteAura.prototype.createAuraSprite = function () {
	this._auraSprite = new Sprite();
	this._auraSprite.anchor.x = 0.5;
	this._auraSprite.anchor.y = 0.5;
	this._auraSprite.z = this._zIndex;
	this._auraSprite.blendMode = this.battler()._auraEffect.blendMode
	this._auraSprite.org = [-1, -1];
	this._auraSprite.animation = [0, 0, 0, 0, 0, 0, 0];
	if (this.battler()._auraEffect.fileName.toLowerCase() == "battler") {
		this._auraSprite.bitmap = this._sprite.bitmap;
		if (this.isEnemyPose()) {
			var w = this._sprite.bitmap.width / 4;
			var h = this._sprite.bitmap.height;
			this._auraSprite.setFrame(0, 0, w, h)
		};
	} else {
		var fileName = (this.battler()._auraEffect.fileName);
		if ($gameSystem.isSideView()) {
			var img = ImageManager.loadSvEnemy(fileName);
		} else {
			var img = ImageManager.loadEnemy(fileName);
		};
		this._auraSprite.bitmap = img;
	};
	this.addChild(this._auraSprite);
	if (this.battler()._auraEffect.mode == 1) {
		var s = Math.randomInt(30) * 0.01;
		this._auraSprite.scale.x += s;
	} else if (this.battler()._auraEffect.mode == 2) {
		this._auraSprite.scale.x = Math.randomInt(80) * 0.01;
		this._auraSprite.opacity = 0;
	};
};

//==============================
// * update Aura Sprite
//==============================
SpriteAura.prototype.getDataAuraSprite = function () {
	this._auraSprite.org[0] = 0;
	var h = (this._auraSprite.height / 2)
	this._auraSprite.org[1] = -h;
};

//==============================
// * update Aura Animation
//==============================
SpriteAura.prototype.updateAuraAnimation = function () {
	if (this.battler()._auraEffect.mode == 1) {
		this.updateAuraAnimation1();
	} else if (this.battler()._auraEffect.mode == 2) {
		this.updateAuraAnimation2();
	};
};

//==============================
// * update Aura Animation1
//==============================
SpriteAura.prototype.updateAuraAnimation1 = function () {
	if (this._auraSprite.animation[0] == 0) {
		this._auraSprite.scale.x += 0.005;
		if (this._auraSprite.scale.x >= 1.30) { this._auraSprite.scale.x = 1.30; this._auraSprite.animation[0] = 1 };
	} else {
		this._auraSprite.scale.x -= 0.005;
		if (this._auraSprite.scale.x <= 1.00) { this._auraSprite.scale.x = 1.00; this._auraSprite.animation[0] = 0 };
	};
};

//==============================
// * update Aura Animation2
//==============================
SpriteAura.prototype.updateAuraAnimation2 = function () {
	this._auraSprite.scale.x += 0.01;
	if (this._auraSprite.scale.x < 1.20) {
		this._auraSprite.opacity += 2;
	} else {
		this._auraSprite.opacity -= 3;
		if (this._auraSprite.opacity <= 0) {
			this._auraSprite.scale.x = 0.50;
			this._auraSprite.scale.opacity = 0;
		};
	};
};

//==============================
// * update Aura Sprite
//==============================
SpriteAura.prototype.updateAuraSprite = function () {
	if (this._auraSprite.org[0] == -1 && this._auraSprite.bitmap && this._auraSprite.bitmap.isReady()) {
		this.getDataAuraSprite();
	};
	this.updateAuraAnimation();
	this._auraSprite.x = this._auraSprite.org[0];
	this._auraSprite.y = this._auraSprite.org[1];
	this._auraSprite.rotation += this.battler()._auraEffect.rotation;
	this._auraSprite.scale.y = this._auraSprite.scale.x;
};

//==============================
// * createParticles
//==============================
SpriteAura.prototype.createParticles = function () {
	this._particles = [];
	for (var i = 0; i < this.battler()._particlesEffect.power; i++) {
		this._particles[i] = new Sprite();
		var fileName = this.battler()._particlesEffect.fileName;
		if ($gameSystem.isSideView()) {
			var img = ImageManager.loadSvEnemy(fileName, 0);
		} else {
			var img = ImageManager.loadEnemy(fileName, 0);;
		};
		this._particles[i].bitmap = img;
		this._particles[i].z = this._zIndex + i;
		this._particles[i].anchor.x = 0.5;
		this._particles[i].anchor.y = 0.5;
		this._particles[i].blendMode = this.battler()._particlesEffect.blendMode;
		this._particles[i].sx = (this.battler()._particlesEffect.sx) * (Math.randomInt(100) * 0.01);
		this._particles[i].sy = (this.battler()._particlesEffect.sy) * (Math.randomInt(100) * 0.01);
		this._particles[i].limitX = (this._sprite.bitmap.width / 2);
		this._particles[i].limitY = (this._sprite.bitmap.height);
		this._particles[i].needGetData = true;
		this.addChild(this._particles[i]);
		this.refreshParticles(this._particles[i], true)
	};
};

//==============================
// * is Enemy Pose
//==============================
SpriteAura.prototype.isEnemyPose = function () {
	if (!Imported.MOG_EnemyPoses) { return false }
	if (!this._sprite._battler.isBPose()) { return false };
	return true
};

//==============================
// * refresh Particles
//==============================
SpriteAura.prototype.refreshParticles = function (sprite, initial) {
	var w = this.isEnemyPose() ? this._sprite.bitmap.width / 4 : this._sprite.bitmap.width;
	sprite.x = Math.randomInt(w) - (w / 2);
	sprite.y = Math.randomInt(this._sprite.bitmap.height) - (this._sprite.bitmap.height);
	sprite.opacity = initial ? Math.randomInt(255) : 1;
};

//==============================
// * need Refresh Particles
//==============================
SpriteAura.prototype.needRefreshParticles = function (sprite) {
	if (sprite.opacity <= 0) { return true };
	return false;
};

//==============================
// * need Fade Particles
//==============================
SpriteAura.prototype.needFadeParticles = function (sprite) {
	if (sprite.x < -sprite.limitX) { return true };
	if (sprite.x > sprite.limitX) { return true };
	if (sprite.y < -sprite.limitY) { return true };
	if (sprite.y > 10) { return true };
	return false;
};

//==============================
// * get Data Particles
//==============================
SpriteAura.prototype.getDataParticles = function (sprite) {
	sprite.limitX = (this._sprite.bitmap.width / 2);
	sprite.limitY = (this._sprite.bitmap.height);
	sprite.needGetData = false;
	this.refreshParticles(sprite, true);
};

//==============================
// * update Particles
//==============================
SpriteAura.prototype.updateParticles = function (sprite) {
	if (sprite.needGetData && this._sprite.bitmap.isReady()) { this.getDataParticles(sprite) };
	sprite.x -= sprite.sx;
	sprite.y -= sprite.sy;
	if (this.needFadeParticles(sprite)) {
		sprite.opacity -= 5
	} else {
		sprite.opacity += 15
	};
	if (this.needRefreshParticles(sprite)) { this.refreshParticles(sprite, false) };
};

//==============================
// * update Base Data
//==============================
SpriteAura.prototype.updateBaseData = function () {
	this.x = this._sprite.x;
	this.y = this._sprite.y;
	this.scale.x = 1.00;
	this.scale.y = 1.00;
	if (this.battler().isDead()) {
		this.opacity -= 10;;
	} else {
		this.opacity = this._sprite.opacity;
	};
	this.visible = this._sprite.visible;
	if (Imported.MOG_BattleCameraFrontal) {
		this.scale.x += this.battler().camScaleX();
		this.scale.y += this.battler().camScaleY();
	};
};

//==============================
// * update Aura
//==============================
SpriteAura.prototype.updateAura = function () {
	if (this.needGetData()) { this.getData() };
	if (this._auraSprite) { this.updateAuraSprite() };
	if (this._particles) {
		for (var i = 0; i < this._particles.length; i++) {
			this.updateParticles(this._particles[i])
		};
	};
	this.updateBaseData();
};

//==============================
// * update
//==============================
SpriteAura.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.canUpdateAura()) { this.updateAura() };
};
