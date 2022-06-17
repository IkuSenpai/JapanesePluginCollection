//=============================================================================
// MOG_ActorPictureCM.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta a imagem do personagem durante a seleção de comandos.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param Slide Speed
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição da velocidade de deslize.
 * @default 10
 * 
 * @param
 * 
 * @param -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Bust Visible
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @text Visible
 * @type boolean 
 * @desc Ativar a imagem do personagem.
 * @default true
 *
 * @param Bust X-Axis
 * @text X-Axis
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição da posição X-axis da imagem.
 * @default 608
 *
 * @param Bust Y-Axis
 * @text Y-Axis
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição da posição Y-axis da imagem.
 * @default 624
 *
 * @param Bust Slide X
 * @text Slide Animation X
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição de deslize X-Axis.
 * @default -150
 *
 * @param Bust Slide Y
 * @text Slide Animation Y
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @desc Definição de deslize Y-Axis.
 * @default 0  
 *
 * @param Breath Effect
 * @text Breath Animation
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @type boolean 
 * @desc Ativar respiração de respiração.
 * @default false
 *
 * @param
 * 
 * @param -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Face Visible
 * @text Visible
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @type boolean
 * @desc Ativar a imagem da Face.
 * @default true
 *
 * @param Face X-Axis
 * @text X-Axis
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<< 
 * @desc Definição da posição X-axis da imagem.
 * @default 570
 *
 * @param Face Y-Axis
 * @text Y-Axis
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<  
 * @desc Definição da posição Y-axis da imagem.
 * @default 0 
 *
 * @param Face Slide X
 * @text Slide Animation X
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<  
 * @desc Definição de deslize X-Axis.
 * @default 150
 *
 * @param Face Slide Y
 * @text Slide Animation Y
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<   
 * @desc Definição de deslize Y-Axis.
 * @default 0 
 *
 * @command ActorPicture_setFileName
 * @desc Mudar o gráfico do personagem.
 * @text FileName (Bust)
 *
 * @arg id
 * @desc Definição da ID do personagem
 * @text Id
 * @default 1
 * @type number
 * @min 1
 *
 * @arg filename
 * @desc Definição do arquivo de imagem.
 * @text File Name
 * @default Bust_Test
 * @type file
 * @dir img/actor_picture_cm/
 *
 * @arg breath
 * @desc Ativar o efeito de respirar.
 * @text Breath Effect
 * @default false
 * @type boolean
 * 
 * @arg visible
 * @desc Apresentar ou ocultar a imagem.
 * @text Visible
 * @default true
 * @type boolean 
 *
 * @command ActorPicture_setFileName2
 * @desc Mudar o gráfico do personagem Suport.
 * @text FileName (Sup)
 *
 * @arg id
 * @desc Definição da ID do personagem
 * @text Id
 * @default 1
 * @type number
 * @min 1
 *
 * @arg filename
 * @desc Definição do arquivo de imagem.
 * @text File Name
 * @default Bust_Test2
 * @type file
 * @dir img/actor_picture_cm/ 
 *
 * @arg visible
 * @desc Apresentar ou ocultar a imagem.
 * @text Visible
 * @default true
 * @type boolean
 *  
 * @help  
 * =============================================================================
 * +++ MOG - Actor Picture CM (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta a imagem do personagem durante a seleção de comandos.
 *
 * =============================================================================
 * - REQUIRED FILES - 
 * =============================================================================
 * As imagens dos personagens devem ser gravadas na pasta. /img/actor_picture_cm/
 * A nomeação dos arquivos devem ser feitas da seguinte forma.
 * 
 * Actor_ + ID + _bust.png
 *
 * Exemplo
 *
 * -> Actor_1_bust.png
 * -> Actor_2_bust.png
 * -> Actor_3_bust.png
 *
 * ----------------------------------------------------------------------------
 *
 * Para definir a imagem secundária do personagem nomeie o arquivo da seguinte
 * forma.
 *
 * -> Actor_ ID + _sub.png
 *
 * Exemplo
 *
 * -> Actor_1_sub.png
 * -> Actpr_2_sub.png
 * -> ...
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) 戦闘コマンド選択中にアクターの立ち絵を表示します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_ActorPictureCM.js
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 一般 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Slide Speed
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @text スライド速度
 * @default 10
 *
 * @param
 *
 * @param -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 立ち絵 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Bust Visible
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @text 有効化
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 *
 * @param Bust X-Axis
 * @text X軸位置
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @default 608
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Bust Y-Axis
 * @text Y軸位置
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @default 624
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Bust Slide X
 * @text X軸スライド量
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @default -150
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Bust Slide Y
 * @text Y軸スライド量
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @default 0
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Breath Effect
 * @text 呼吸アニメ有効化
 * @parent -> BUST <<<<<<<<<<<<<<<<<<<<<<<
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 *
 * @param
 *
 * @param -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> サブ画像 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Visible
 * @text 有効化
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 *
 * @param Face X-Axis
 * @text X軸位置
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @default 570
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Face Y-Axis
 * @text Y軸位置
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @default 0
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Face Slide X
 * @text Slide Animation X
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @text X軸スライド量
 * @default 150
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Face Slide Y
 * @text Y軸スライド量
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @default 0
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 *
 * @command ActorPicture_setFileName
 * @desc キャラ画像を変更
 * @text ファイル名 (立ち絵)
 *
 * @arg id
 * @desc キャラIDの指定
 * @text Id
 * @default 1
 * @type number
 * @min 1
 *
 * @arg filename
 * @desc 画像ファイルの指定
 * @text ファイル名
 * @default Bust_Test
 * @type file
 * @dir img/actor_picture_cm/
 *
 * @arg breath
 * @desc 呼吸エフェクトを有効化
 * @text 呼吸エフェクト
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * 
 * @arg visible
 * @desc 画像の表示/非表示を切り替え
 * @text Visible
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 *
 * @command ActorPicture_setFileName2
 * @desc キャラのサブ画像を変更
 * @text ファイル名 (サブ)
 *
 * @arg id
 * @desc キャラIDの指定
 * @text Id
 * @default 1
 * @type number
 * @min 1
 *
 * @arg filename
 * @desc 画像ファイルの指定
 * @text ファイル名
 * @default Bust_Test2
 * @type file
 * @dir img/actor_picture_cm/ 
 *
 * @arg visible
 * @desc 画像の表示/非表示を切り替え
 * @text Visible
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 *  
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * +++ MOG - Actor Picture CM (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * 戦闘コマンド選択中にアクターの立ち絵を表示します。
 *
 * ===========================================================================
 * - 必要ファイル -
 * ===========================================================================
 * 戦闘コマンド選択中にアクターの立ち絵を表示します。
 * /img/actor_picture_cm/
 * ファイル名は下記のようにしてください。
 *
 * Actor_ + ID + _bust.png
 *
 * 例
 *
 * -> Actor_1_bust.png
 * -> Actor_2_bust.png
 * -> Actor_3_bust.png
 *
 * ---------------------------------------------------------------------------
 *
 * アクターのサブ画像ファイル名は下記のようにしてください。
 *
 * -> Actor_ ID + _sup.png  <- ファイル名注意！（元ヘルプのミスです）
 *
 * 例
 *
 * -> Actor_1_sup.png
 * -> Actpr_2_sup.png
 * -> ...
 *
 * ===========================================================================
 * - プラグインコマンド -
 * ===========================================================================
 * 呼吸エフェクトとサブ画像についてのプラグインコマンドがあります。
 *
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_ActorPictureCM = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_ActorPictureCM');
Moghunter.actor_slideSpeed = Number(Moghunter.parameters['Slide Speed'] || 10);
Moghunter.actor_fileName = String(Moghunter.parameters['File Name'] || "Actor_");
Moghunter.actor_cm1_visible = String(Moghunter.parameters['Face Visible'] || "true");
Moghunter.actor_cm1_slideX = Number(Moghunter.parameters['Face Slide X'] || 150);
Moghunter.actor_cm1_slideY = Number(Moghunter.parameters['Face Slide Y'] || 0);
Moghunter.actor_cm1_x = Number(Moghunter.parameters['Face X-Axis'] || 570);
Moghunter.actor_cm1_y = Number(Moghunter.parameters['Face Y-Axis'] || 0);
Moghunter.actor_cm2_visible = String(Moghunter.parameters['Bust Visible'] || "true");
Moghunter.actor_cm2_slideX = Number(Moghunter.parameters['Bust Slide X'] || -150);
Moghunter.actor_cm2_slideY = Number(Moghunter.parameters['Bust Slide Y'] || 0);
Moghunter.actor_cm2_x = Number(Moghunter.parameters['Bust X-Axis'] || 408);
Moghunter.actor_cm2_y = Number(Moghunter.parameters['Bust Y-Axis'] || 624);
Moghunter.actor_cm2_breathEffect = String(Moghunter.parameters['Breath Effect'] || "true");

//=============================================================================
// ■■■  PluginManager ■■■ 
//=============================================================================	
PluginManager.registerCommand('MOG_ActorPictureCM', "ActorPicture_setFileName", data => {
	var id = Number(data.id);
	var fileName = data.filename;
	var visible = String(data.visible) == "true" ? true : false;
	var breath = String(data.breath) == "true" ? true : false;
	for (var i = 0; i < $gameParty.members().length; i++) {
		var actor = $gameParty.members()[i];
		if (actor._actorId === id) {
			if (actor) {
				actor.setBattleBust_1(fileName);
				actor.visbattleBust_1(visible);
				actor.setActorCMbreathEffect(breath)
			};
		};
	};
});

PluginManager.registerCommand('MOG_ActorPictureCM', "ActorPicture_setFileName2", data => {
	var id = Number(data.id);
	var fileName = data.filename;
	var visible = String(data.visible) == "true" ? true : false;
	for (var i = 0; i < $gameParty.members().length; i++) {
		var actor = $gameParty.members()[i];
		if (actor._actorId === id) {
			if (actor) {
				actor.setBattleBust_2(fileName);
				actor.visbattleBust_2(visible);
			};
		};
	};
});

//=============================================================================
// ■■■ ImageManager ■■■
//=============================================================================

//==============================
// * Load Actor Pic CM
//==============================
ImageManager.loadActorpicCM = function (filename) {
	return this.loadBitmap('img/actor_picture_cm/', filename, 0, true);
};

//=============================================================================
// ■■■ Game_Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_mog_actorcm_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
	_alias_mog_actorcm_temp_initialize.call(this);
	this._actorCmData = [false, false, true];
};

//=============================================================================
// ■■■ Game_System ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_mog_actorcm_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	_alias_mog_actorcm_sys_initialize.call(this);
	this._actorCmOffSet = [true, 0, 0];
};

//=============================================================================
// ■■■ Game Interpreter ■■■
//=============================================================================

//==============================
// * PluginCommand
//==============================
var _mog_actorCM_gint_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function (command, args) {
	_mog_actorCM_gint_pluginCommand.call(this, command, args)
	if (command === "actorCM_fileName") { this.setActorCM(args) };
	if (command === "actorCM_breathEffect") { this.setActorBreathEffect(args) };
	return true;
};

//==============================
// * Set Actor CM
//==============================
Game_Interpreter.prototype.setActorCM = function (args) {
	var id = Number(args[1]);
	var fileName = String(args[3]);
	for (var i = 0; i < $gameParty.members().length; i++) {
		var actor = $gameParty.members()[i];
		if (actor._actorId === id) {
			if (actor) { actor.setActorCMNAme(fileName) };
		};
	};
};

//==============================
// * Set Actor Breath Effect
//==============================
Game_Interpreter.prototype.setActorBreathEffect = function (args) {
	var id = Number(args[1]);
	var enable = String(args[3]) == "true" ? true : false;
	for (var i = 0; i < $gameParty.members().length; i++) {
		var actor = $gameParty.members()[i];
		if (actor._actorId === id) {
			if (actor) { actor.setActorCMbreathEffect(enable) };
		};
	};
};

//=============================================================================
// ■■■ Game_Actor ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_actorcm_gactor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function () {
	_mog_actorcm_gactor_initMembers.call(this);
	var breathEffect = String(Moghunter.actor_cm2_breathEffect) == "true" ? true : false;
	this._actorCMData = ["", 0, 0, breathEffect, "", true, true];
};

//==============================
// ♦ ALIAS ♦  Setup
//==============================
var _mog_actorcm_gactor_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function (actorId) {
	_mog_actorcm_gactor_setup.call(this, actorId);
	this._actorCMData[0] = "Actor_" + this._actorId + "_bust";
	this._actorCMData[4] = "Actor_" + this._actorId + "_sup";
};


//==============================
// * battle Bust 1
//==============================
Game_Actor.prototype.battleBust_1 = function () {
	return String(this._actorCMData[0]);
};

//==============================
// * battle Bust 2
//==============================
Game_Actor.prototype.battleBust_2 = function () {
	return String(this._actorCMData[4]);
};

//==============================
// * set Battle bust 1
//==============================
Game_Actor.prototype.setBattleBust_1 = function (filename) {
	this._actorCMData[0] = filename;
};

//==============================
// * vis Battle bust 1
//==============================
Game_Actor.prototype.visbattleBust_1 = function (visible) {
	this._actorCMData[5] = visible;
};

//==============================
// * set Battle bust 2
//==============================
Game_Actor.prototype.setBattleBust_2 = function (filename) {
	this._actorCMData[4] = filename;
};

//==============================
// * vis Battle bust 2
//==============================
Game_Actor.prototype.visbattleBust_2 = function (visible) {
	this._actorCMData[6] = visible;
};

//==============================
// * set Actor CM Breath Effect
//==============================
Game_Actor.prototype.setActorCMbreathEffect = function (enable) {
	this._actorCMData[3] = enable;
};

//=============================================================================
// ■■■ Scene Base ■■■
//=============================================================================

//==============================
// ** create Hud Field
//==============================
Scene_Base.prototype.createHudField = function () {
	this._hudField = new Sprite();
	this._hudField.z = 10;
	this.addChild(this._hudField);
};

//==============================
// ** sort MZ
//==============================
Scene_Base.prototype.sortMz = function () {
	this._hudField.children.sort((a, b) => a.z - b.z);
};

//=============================================================================
// ■■■ Scene Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  create Spriteset
//==============================
var _mog_actorPicCM_sbattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
	_mog_actorPicCM_sbattle_createSpriteset.call(this);
	if (!this._hudField) { this.createHudField() };
	this.createActorCM();
	this.sortMz();
};

//==============================
// * Create Actor CM
//==============================
Scene_Battle.prototype.createActorCM = function () {
	this.actorPictureCM = new Actor_CMPicture();
	this.actorPictureCM.z = 3;
	this._hudField.addChild(this.actorPictureCM);
};

//==============================
// ♦ ALIAS ♦  Update
//==============================
var _alias_mog_actorcm_scbat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
	_alias_mog_actorcm_scbat_update.call(this);
	$gameTemp._actorCmData[0] = this.sprite_actor_cm_visible();
};

//==============================
// * Sprite Actor CM Visible
//==============================
Scene_Battle.prototype.sprite_actor_cm_visible = function () {
	if (!BattleManager.actor()) { return false };
	if (this._actorWindow.active) { return false };
	if (this._enemyWindow.active) { return false };
	if (this._partyCommandWindow.active) { return false };
	if ($gameMessage.isBusy()) { return false };
	if (!BattleManager.isInputting()) { return false };
	return true;
};

//=============================================================================
// ■■■ Actor_CMPicture ■■■
//=============================================================================
function Actor_CMPicture() {
	this.initialize.apply(this, arguments);
};

Actor_CMPicture.prototype = Object.create(Sprite.prototype);
Actor_CMPicture.prototype.constructor = Actor_CMPicture;

//==============================
// * Initialize
//==============================
Actor_CMPicture.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this._actor = null;
	this._CmName = null;
	this._breahEffect = false;
	$gameTemp._actorCmData = [false, false, true];
	this._cm1 = String(Moghunter.actor_cm1_visible) === "true" ? true : false;
	this._cm2 = String(Moghunter.actor_cm2_visible) === "true" ? true : false;
	this._xf = 816 - Graphics.width;
	this._yf = 624 - Graphics.height;
	this._sldSpd = Math.min(Math.max(Moghunter.actor_slideSpeed, 1), 999);
	if (this._cm1) { this.createCM1() };
	if (this._cm2) { this.createCM2() };
};

//==============================
// * is Visible
//==============================
Actor_CMPicture.prototype.isVisible = function () {
	if (!$gameSystem._actorCmOffSet[0]) { return false };
	if (!$gameTemp._actorCmData[2]) { return false };
	return $gameTemp._actorCmData[0];
};

//==============================
// * create CM1
//==============================
Actor_CMPicture.prototype.createCM1 = function () {
	this._supSprite = new Sprite();
	this._supSprite.visible = false;
	this._supSpriteData = null;
	this.addChild(this._supSprite);
};

//==============================
// * create CM2
//==============================
Actor_CMPicture.prototype.createCM2 = function () {
	this._bust = new Sprite();
	this._bust.anchor.x = 0.5;
	this._bust.anchor.y = 1.0;
	this._bust.visible = false;
	this._bustData = null;
	this.addChild(this._bust);
};

//==============================
// * Hide Sprites
//==============================
Actor_CMPicture.prototype.hideSprites = function () {
	if (this._supSprite) { this._supSprite.visible = false };
	if (this._bust) { this._bust.visible = false };
};

//==============================
// * move To
//==============================
Actor_CMPicture.prototype.moveto = function (value, real_value) {
	if (value == real_value) { return value };
	var dnspeed = 2 + (Math.abs(value - real_value) / this._sldSpd);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value };
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	return Math.floor(value);
};

//==============================
// * Need Refresh Actor
//==============================
Actor_CMPicture.prototype.refreshActor = function () {
	this._actor = BattleManager.actor();
	if (this._actor) { this.refreshSprites() };
};

//==============================
// * refresh Bitmap CM1
//==============================
Actor_CMPicture.prototype.refreshBitmapCM1 = function () {
	var fileName = !this._actor._actorCMData[6] ? "" : this._actor.battleBust_2();
	this._supSprite.bitmap = ImageManager.loadActorpicCM(fileName);
	this._supSprite.visible = false;
	this._supSpriteData = null;
};

//==============================
// * refresh Bitmap CM2
//==============================
Actor_CMPicture.prototype.refreshBitmapCM2 = function () {
	var fileName = !this._actor._actorCMData[5] ? "" : this._actor.battleBust_1();
	this._bust.bitmap = ImageManager.loadActorpicCM(fileName);
	this._bust.visible = false;
	this._bust.zoom = {}
	this._bust.zoom.speed = 0.0004;
	this._bust.zoom.maxScale = 0.008;
	this._bust.zoom.phase = 0;
	this._bust.zoom.y = 0;
	this._breahEffect = false;
	this._bustData = null;
};

//==============================
// * refresh Sprites
//==============================
Actor_CMPicture.prototype.refreshSprites = function () {
	this._CmName = this._actor ? this._actor.battleBust_1() : null;
	if (this._supSprite) { this.refreshBitmapCM1() };
	if (this._bust) { this.refreshBitmapCM2() };
};

//==============================
// * Need Refresh Actor
//==============================
Actor_CMPicture.prototype.needRefreshActor = function () {
	if ($gameTemp._actorCmData[1]) { return true };
	if (BattleManager.actor() != this._actor) { return true };
	if (this._actor && this._CmName != this._actor.battleBust_1())
		return false;
};

//==============================
// * get Data CM1
//==============================
Actor_CMPicture.prototype.getDataCM1 = function () {
	this._supSpriteData = [this._supSprite.bitmap.width, this._supSprite.bitmap.height,
	Moghunter.actor_cm1_x, Moghunter.actor_cm1_y, 0, 0, true,
	Moghunter.actor_cm1_slideX, Moghunter.actor_cm1_slideY
	];
	this._supSprite.visible = this._actor._actorCMData[6];
	this._supSprite.opacity = 0;
	this._supSprite.x = this._supSpriteData[6] ? this._supSpriteData[2] + this._supSpriteData[7] : this._supSpriteData[2];
	this._supSprite.y = this._supSpriteData[6] ? this._supSpriteData[3] + this._supSpriteData[8] : this._supSpriteData[3];
};

//==============================
// * Update CM1
//==============================
Actor_CMPicture.prototype.updateCM1 = function () {
	if (!this.isVisible()) {
		this._supSpriteData[4] = this._supSpriteData[2] + this._supSpriteData[7];
		this._supSpriteData[5] = this._supSpriteData[3] + this._supSpriteData[8];
		this._supSprite.opacity -= 15;
	} else {
		this._supSpriteData[4] = this._supSpriteData[2];
		this._supSpriteData[5] = this._supSpriteData[3];
		this._supSprite.opacity += 15;
	};
	this._supSprite.x = this.moveto(this._supSprite.x, this._supSpriteData[4]);
	this._supSprite.y = this.moveto(this._supSprite.y, this._supSpriteData[5]);
};

//==============================
// * need Get Data 1
//==============================
Actor_CMPicture.prototype.needGetData1 = function () {
	if (!this._supSprite) { return false };
	if (this._supSpriteData) { return false };
	if (!this._supSprite.bitmap) { return false };
	if (!this._supSprite.bitmap.isReady()) { return false };
	return true;
};

//==============================
// * get Data CM2
//==============================
Actor_CMPicture.prototype.getDataCM2 = function () {
	this._bustData = [this._bust.bitmap.width, this._bust.bitmap.height,
	Moghunter.actor_cm2_x, Moghunter.actor_cm2_y, 0, 0, true,
	Moghunter.actor_cm2_slideX, Moghunter.actor_cm2_slideY,
		0, 0, 0];
	this._bust.visible = this._actor._actorCMData[5];
	this._bust.opacity = 0;
	this._bustData[2] = Moghunter.actor_cm2_x;
	this._bustData[3] = Moghunter.actor_cm2_y;
	this._bust.x = this._bustData[6] ? this._bustData[2] + this._bustData[7] : this._bustData[2];
	this._bust.y = this._bustData[6] ? this._bustData[3] + this._bustData[8] : this._bustData[3];
	this._breahEffect = this._actor._actorCMData[3];
};

//==============================
// * refresh Frame
//==============================
Actor_CMPicture.prototype.refreshFrame = function (sprite, index) {
	var cw = this._eyesData.cw;
	var ch = this._eyesData.ch;
	var fr = cw * index;
	sprite.setFrame(fr, 0, cw, ch)
};

//==============================
// * breathSpeed
//==============================
Actor_CMPicture.prototype.breathSpeed = function () {
	return 0.000225;
};

//==============================
// * Update CM2
//==============================
Actor_CMPicture.prototype.updateCM2 = function () {
	if (!this.isVisible()) {
		this._bustData[4] = this._bustData[2] + this._bustData[7];
		this._bustData[5] = this._bustData[3] + this._bustData[8];
		this._bust.opacity -= 15;
	} else {
		this._bustData[4] = this._bustData[2];
		this._bustData[5] = this._bustData[3];
		this._bust.opacity += 15;
	};
	this._bust.x = this.moveto(this._bust.x, this._bustData[4]);
	this._bust.y = this.moveto(this._bust.y, this._bustData[5]);
	if (this._breahEffect && this._bust.opacity > 0) { this.updateBreathEffect() };
};

//==============================
// * Update Breath Effect
//==============================
Actor_CMPicture.prototype.updateBreathEffect = function () {
	this._bust.zoom.speed = this.breathSpeed();
	if (this._bust.zoom.phase === 0) {
		this._bust.zoom.y += this._bust.zoom.speed
		if (this._bust.zoom.y >= this._bust.zoom.maxScale) {
			this._bust.zoom.y = this._bust.zoom.maxScale;
			this._bust.zoom.phase = 1;
		};
	} else {
		this._bust.zoom.y -= this._bust.zoom.speed
		if (this._bust.zoom.y <= 0) {
			this._bust.zoom.y = 0;
			this._bust.zoom.phase = 0;
		};
	};
	this._bust.scale.y = 1.00 + this._bust.zoom.y;
};

//==============================
// * update Other
//==============================
Actor_CMPicture.prototype.updateOther = function () {
	this.x = -this._xf;
	this.y = -this._yf;
};

//==============================
// * need Get Data 2
//==============================
Actor_CMPicture.prototype.needGetData2 = function () {
	if (!this._bust) { return false };
	if (this._bustData) { return false };
	if (!this._bust.bitmap) { return false };
	if (!this._bust.bitmap.isReady()) { return false };
	return true;
};

//==============================
// * Update
//==============================
Actor_CMPicture.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this.needRefreshActor()) { this.refreshActor() };
	if (this.needGetData1()) { this.getDataCM1() };
	if (this.needGetData2()) { this.getDataCM2() };
	if (this._supSpriteData) { this.updateCM1() };
	if (this._bustData) { this.updateCM2() };
	this.updateOther();
};
