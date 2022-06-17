//=============================================================================
// MOG_BossHP.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta um medidor de HP para os chefes.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Shake Effect
 * @desc Ativar o efeito tremer.
 * @default true
 * @type boolean
 *
 * @param HP Number Visible
 * @desc Apresentar o HP em numeros.
 * @default true
 * @type boolean
 *
 * @param Show Face
 * @desc Apresentar a face do inimigo.
 * @default true
 * @type boolean
 *
 * @param Slant Animation
 * @desc Ativar a animação de Flow no medidor de HP.
 * @default true
 * @type boolean
 *
 * @param Flow Speed
 * @desc Definição da velocidade da animação.
 * @default 4
 * @type number
 *  
 * @param Name Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @type number
 * 
 * @param Layout X-Axis
 * @desc Posição X-Axis do layout.
 * @default 150
 *
 * @param Layout Y-Axis
 * @desc Posição Y-Axis do layout.
 * @default 10
 *
 * @param Name X-Axis
 * @desc Posição X-Axis do numero.
 * @default 36
 *
 * @param Name Y-Axis
 * @desc Posição Y-Axis do numero.
 * @default 23   
 *
 * @param Face X-Axis
 * @desc Posição X-Axis da face.
 * @default -50
 *
 * @param Face Y-Axis
 * @desc Posição Y-Axis da face.
 * @default 10   
 * 
 * @param Meter X-Axis
 * @desc Posição X-Axis do medidor.
 * @default 22
 *
 * @param Meter Y-Axis
 * @desc Posição Y-Axis do medidor.
 * @default 28 
 * 
 * @param Number X-Axis
 * @desc Posição X-Axis do número.
 * @default 460
 *
 * @param Number Y-Axis
 * @desc Posição Y-Axis do número.
 * @default 32  
 *
 * @param Number Percentage
 * @desc Apresentar o número em porcentagem.
 * @default false
 * @type boolean
 *
 * @param Show States
 * @desc Apresentar o ícones das codições.
 * @default true
 * @type boolean
 *
 * @param States Max
 * @desc Número maximo dos ícones visiveis.
 * @default 8
 * @type number
 * 
 * @param States X-axis
 * @desc Posição X-Axis das codições.
 * @default 50
 * 
 * @param States Y-axis
 * @desc Posição Y-Axis das codições.
 * @default -8
 * 
 * @command BossHP_Setup
 * @desc Definição básica do medidor.
 * @text Setup
 *
 * @arg x_axis
 * @desc Define a posição X-Axis do medidor.
 * @text X-Axis
 * @default 150
 *
 * @arg y_axis
 * @desc Define a posição Y-Axis do medidor.
 * @text Y-Axis
 * @default 150
 *
 * @arg visible
 * @desc Apresentar o número de HP.
 * @text Number Visible
 * @default true
 * @type boolean
 *
 * @help  
 * =============================================================================
 * +++ MOG - Boss HP Meter (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta um medidor de HP para os chefes.
 *
 * =============================================================================
 * - IMAGES
 * =============================================================================  
 * Serão necessários os arquivos. (img/bosshp/)
 *
 * Boss_HP_A.png
 * Boss_HP_A.png
 * Boss_HP_C.png
 * Boss_HP_D.png 
 *
 * =============================================================================
 * - ENEMIES NOTETAGS
 * ============================================================================= 
 * Use a Tag abaixo na caixa de notas para definir quais os inimigos terão o
 * medidor de chefe.
 *
 * Boss HP
 *
 * =============================================================================
 * - FACE NAME
 * =============================================================================
 * Nomeie as faces dos inimigos da seguinte maneira.
 *
 * Face_ + ID.png
 *
 * EG
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ....
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) ボス用HPメーターを表示します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_BossHP.js
 *
 * @param Shake Effect
 * @text シェイクエフェクト有効化
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param HP Number Visible
 * @text HP値を表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 *
 * @param Show Face
 * @text 顔画像を表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 *
 * @param Slant Animation
 * @text HPメーターのフローアニメ有効化
 * @type boolean
 * @on 有効
 * @off 無効
 * @default true
 *
 * @param Flow Speed
 * @text アニメ速度
 * @type number
 * @default 4
 *
 * @param Name Font Size
 * @text フォントサイズ
 * @type number
 * @default 18
 *
 * @param Layout X-Axis
 * @text レイアウトのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 150
 *
 * @param Layout Y-Axis
 * @text レイアウトのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 10
 *
 * @param Name X-Axis
 * @text 名前のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 36
 *
 * @param Name Y-Axis
 * @text 名前のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 23
 *
 * @param Face X-Axis
 * @text 顔画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default -50
 *
 * @param Face Y-Axis
 * @text 顔画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 10
 *
 * @param Meter X-Axis
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 22
 *
 * @param Meter Y-Axis
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 28
 *
 * @param Number X-Axis
 * @text 数値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 460
 *
 * @param Number Y-Axis
 * @text 数値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 32
 *
 * @param Number Percentage
 * @text 数値をパーセント表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 *
 * @param Show States
 * @text ステートアイコン表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 *
 * @param States Max
 * @text 表示可能なアイコンの最大数
 * @type number
 * @max 9007
 * @default 8
 *
 * @param States X-axis
 * @text ステートのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 50
 *
 * @param States Y-axis
 * @text ステートのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default -8
 * 
 * @command BossHP_Setup
 * @desc メーターの基本的な設定
 * @text 設定
 *
 * @arg x_axis
 * @desc メーターX軸位置を指定
 * @text X軸位置
 * @default 150
 *
 * @arg y_axis
 * @desc メーターY軸位置を指定
 * @text Y軸位置
 * @default 150
 *
 * @arg visible
 * @desc HP値を表示
 * @text HP値表示
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
 * +++ MOG - Boss HP Meter (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * ボス用HPメーターを表示します。
 *
 * ===========================================================================
 * - 画像ファイル
 * ===========================================================================
 * 画像ファイルが必要です。
 * 下記フォルダ内に保存してください。
 * (img/bosshp/)
 *
 * Boss_HP_A.png
 * Boss_HP_B.png
 * Boss_HP_C.png
 * Boss_HP_D.png
 *
 * ===========================================================================
 * - 敵のメモタグ
 * ===========================================================================
 * ボス用HPメーターを表示したい敵のメモ欄に下記タグを記入してください。
 *
 * Boss HP
 *
 * ===========================================================================
 * - 顔画像
 * ===========================================================================
 * 下記のように敵の顔画像にファイル名を付けます。
 * 下記フォルダ内に保存してください。
 * (img/bosshp/)
 *
 * Face_ + EnemyID.png
 *
 * 例
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ....
 *
 * ===========================================================================
 * - プラグインコマンド
 * ===========================================================================
 * 以下のプラグインコマンドがあります。
 * 
 * - HPメーターの位置を指定
 * - HP値を表示/非表示を指定
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_BossHP = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_BossHP');
Moghunter.bosshp_flowAnimation = String(Moghunter.parameters['Slant Animation'] || "true");
Moghunter.bosshp_flowAnimationSpeed = Number(Moghunter.parameters['Flow Speed'] || 4);
Moghunter.bosshp_face = String(Moghunter.parameters['Show Face'] || "true");
Moghunter.bosshp_faceX = Number(Moghunter.parameters['Face X-Axis'] || -50);
Moghunter.bosshp_faceY = Number(Moghunter.parameters['Face Y-Axis'] || 10);
Moghunter.bosshp_layout_x = Number(Moghunter.parameters['Layout X-Axis'] || 150);
Moghunter.bosshp_layout_y = Number(Moghunter.parameters['Layout Y-Axis'] || 10)
Moghunter.bosshp_meter_x = Number(Moghunter.parameters['Meter X-Axis'] || 22);
Moghunter.bosshp_meter_y = Number(Moghunter.parameters['Meter Y-Axis'] || 28);
Moghunter.bosshp_number_perMode = String(Moghunter.parameters['Number Percentage'] || "false");
Moghunter.bosshp_number_x = Number(Moghunter.parameters['Number X-Axis'] || 460);
Moghunter.bosshp_number_y = Number(Moghunter.parameters['Number Y-Axis'] || 32);
Moghunter.bosshp_name_x = Number(Moghunter.parameters['Name X-Axis'] || 36);
Moghunter.bosshp_name_y = Number(Moghunter.parameters['Name Y-Axis'] || 23);
Moghunter.bosshp_font_size = Number(Moghunter.parameters['Name Font Size'] || 18);
Moghunter.bosshp_shake_effect = String(Moghunter.parameters['Shake Effect'] || "true");
Moghunter.bosshp_hp_number_visible = String(Moghunter.parameters['HP Number Visible'] || "true");
Moghunter.bosshp_states = String(Moghunter.parameters['Show States'] || "true");
Moghunter.bosshp_statesN = Number(Moghunter.parameters['States Max'] || 8);
Moghunter.bosshp_statesX = Number(Moghunter.parameters['States X-axis'] || 50);
Moghunter.bosshp_statesY = Number(Moghunter.parameters['States Y-axis'] || -8);


//=============================================================================
// ■■■  PluginManager ■■■ 
//=============================================================================		
PluginManager.registerCommand('MOG_BossHP', "BossHP_Setup", data => {
	var vis = String(data.visible) == "true" ? true : false;
	var x = Number(data.x_axis);
	var y = Number(data.y_axis);
	$gameSystem._bosshp_data[0] = x;
	$gameSystem._bosshp_data[1] = y;
	$gameSystem._bosshp_data[2] = vis;
	$gameSystem._battler_bhp_refresh3 = true;
});

//=============================================================================
// ■■■ ImageManager ■■■
//=============================================================================

//==============================
// * Boss Hp
//==============================
ImageManager.loadBossHp = function (filename) {
	return this.loadBitmap('img/bosshp/', filename, 0, true);
};

//=============================================================================
// ■■■ Game_Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_bosshp_temp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function () {
	_mog_bosshp_temp_initialize.call(this);
	this._battler_bhp_temp = [null, 0, false, 0];
	this._battler_bhp_refresh = false;
	this._battler_bhp_refresh2 = false;
	this._battler_bhp_refresh3 = true;
	this._battler_bhp_remove = false;
	this._forceCreateBossHud = false;
	this._forceRemoveBossHud = false;
};

//=============================================================================
// ■■■ Game_System ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_bosshp_sys_initialize = Game_System.prototype.initialize
Game_System.prototype.initialize = function () {
	_mog_bosshp_sys_initialize.call(this);
	this._bosshp_data = [Moghunter.bosshp_layout_x, Moghunter.bosshp_layout_y, Moghunter.bosshp_hp_number_visible];
	this._battler_bhp_oldNumber = [0, 0];
};

//==============================
// * Check Boss HP Enemies
//==============================
Game_System.prototype.checkBossHpEnemies = function () {
	var boss = null;
	$gameTroop.members().forEach(function (enemy) {
		if (enemy._bosshp_meter) { boss = enemy };
	}, this);
	return boss;
};

//=============================================================================
// ■■■ BattleManager ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  processVictory
//==============================
var _mog_bosshp_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function () {
	$gameTemp._battler_bhp_temp[2] = true
	_mog_bosshp_processVictory.call(this);
};

//==============================
// ♦ ALIAS ♦  processAbort
//==============================
var _mog_bosshp_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function () {
	$gameTemp._battler_bhp_temp[2] = true
	_mog_bosshp_processAbort.call(this);
};

//==============================
// ♦ ALIAS ♦  processDefeat
//==============================
var _mog_bosshp_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function () {
	$gameTemp._battler_bhp_temp[2] = true
	_mog_bosshp_processDefeat.call(this);
};

//=============================================================================
// ■■■ Game Battler ■■■
//=============================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function () {
	if (this.isEnemy()) { return this.enemy().note.split(/[\r\n]+/) };
	if (this.isActor()) { return this.actor().note.split(/[\r\n]+/) };
};

//==============================
// ♦ ALIAS ♦  Appear
//==============================
var _mog_bhp_gbat_appear = Game_BattlerBase.prototype.appear;
Game_BattlerBase.prototype.appear = function () {
	_mog_bhp_gbat_appear.call(this);
	$gameTemp._battler_bhp_refresh = true;
};

//=============================================================================
// ■■■ Game BattlerBase ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_bossHP_gbat_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function () {
	_mog_bossHP_gbat_initMembers.call(this);
	this.need_refresh_bhud_states = false;
	this._nrsBoss = false;
};

//==============================
// * addNewState
//==============================
var _mog_bossHP_addNewState = Game_BattlerBase.prototype.addNewState
Game_BattlerBase.prototype.addNewState = function (stateId) {
	_mog_bossHP_addNewState.call(this, stateId);
	this._nrsBoss = true;
};

//==============================
// * eraseState
//==============================
var _mog_bossHP_eraseState = Game_BattlerBase.prototype.eraseState
Game_BattlerBase.prototype.eraseState = function (stateId) {
	_mog_bossHP_eraseState.call(this, stateId);
	this._nrsBoss = true;
};

//=============================================================================
// ■■■ Game_Enemy ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  initMembers
//==============================
var _alias_mog_bosshp_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function () {
	_alias_mog_bosshp_initMembers.call(this);
	this._bosshp_meter = false;
};

//==============================
// ♦ ALIAS ♦  Setup
//==============================
var _alias_mog_bosshp_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
	_alias_mog_bosshp_setup.call(this, enemyId, x, y);
	this.checkBossHPnoteTag();
};

//==============================
// * Setup
//==============================
Game_Enemy.prototype.checkBossHPnoteTag = function () {
	for (var i = 0; i < this.notetags().length; i++) {
		if (this.notetags()[i] == "Boss HP") { this._bosshp_meter = true };
	};
};

//==============================
// ♦ ALIAS ♦  transform
//==============================
var _mog_bosshp_enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function (enemyId) {
	_mog_bosshp_enemy_transform.call(this, enemyId);
	$gameTemp._battler_bhp_refresh = true;
	this.checkBossHPnoteTag();
};

//=============================================================================
// ■■■ Game Action ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Apply
//==============================
var _alias_mog_bosshp_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
	if (target.isEnemy() && target._bosshp_meter) {
		$gameTemp._battler_bhp_temp[1] = target.hp;
		var old_hp = target.hp; $gameTemp._battler_bhp_temp[3] = 0;
	};
	_alias_mog_bosshp_apply.call(this, target);
	if (target.isEnemy() && target._bosshp_meter) {
		$gameTemp._battler_bhp_temp[0] = target;
		if (old_hp > target.hp) { $gameTemp._battler_bhp_temp[3] = 60 };
	};
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

//==============================
// * Create Boss HP Sprites
//==============================
Scene_Base.prototype.createBossHPGauge = function () {
	$gameTemp._battler_bhp_refresh = false;
	var init_battler = $gameSystem.checkBossHpEnemies();
	this.removeBossHPGauge();
	if (init_battler) {
		if (!this._bosshp_sprites) {
			this.removeBossHPGauge();
			this._bosshp_sprites = new Sprite_BossHP(init_battler);
			this._bosshp_sprites.z = 130;
			this._hudField.addChild(this._bosshp_sprites);
		};
	};
	this.sortMz();
};

//==============================
// ** remove Boss HP Gauge
//==============================
Scene_Base.prototype.removeBossHPGauge = function () {
	$gameTemp._battler_bhp_remove = false;
	if (!this._bosshp_sprites) { return };
	this._hudField.removeChild(this._bosshp_sprites);
	this._bosshp_sprites = null;
};

//=============================================================================
// ■■■ Scene Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  create Spriteset
//==============================
var _mog_bossHP_sbattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
	_mog_bossHP_sbattle_createSpriteset.call(this);
	if (!this._hudField) { this.createHudField() };
	this.createBossHPGauge();
	this.sortMz();
};

//==============================
// ♦ ALIAS ♦  update
//==============================
var _mog_bossHP_sbattle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
	_mog_bossHP_sbattle_update.call(this);
	if ($gameTemp._forceCreateBossHud) { this.recreateBossHP() };
};

//==============================
// ** recreate Boss HP
//==============================
Scene_Battle.prototype.recreateBossHP = function () {
	$gameTemp._forceCreateBossHud = false;
	this.createBossHPGauge();
};

//=============================================================================
// ■■■ Sprite_BossHP ■■■
//=============================================================================	
function Sprite_BossHP() {
	this.initialize.apply(this, arguments);
}

Sprite_BossHP.prototype = Object.create(Sprite.prototype);
Sprite_BossHP.prototype.constructor = Sprite_BossHP;

//==============================
// * Initialize
//==============================
Sprite_BossHP.prototype.initialize = function (init_battler) {
	Sprite.prototype.initialize.call(this);
	this._init = true;
	this.opacity = 0;
	$gameTemp._battler_bhp_temp = [init_battler, init_battler.hp, false, 0];
	this._flowAnimation = String(Moghunter.bosshp_flowAnimation) === "true" ? true : false;
	this._battler = init_battler;
	this._hp_data = [-1, -1, 0, 0, 0, 0, 0, 0, 0, Number($gameSystem._bosshp_data[0]), Number($gameSystem._bosshp_data[1]), false, true];
	this._hp_perMode = String(Moghunter.bosshp_number_perMode) === "true" ? true : false;
	this._xf = -(816 - Graphics.width);
	this._yf = 0;
	this.createSprites();
	if (String(Moghunter.bosshp_shake_effect) === "true") { this._hp_data[11] = true };
	if (String($gameSystem._bosshp_data[2]) != "true") { this._hp_data[12] = false };
};

//==============================
// * create Sprites
//==============================
Sprite_BossHP.prototype.createSprites = function () {
	this.x = this._hp_data[9] + this._xf;
	this.y = this._hp_data[10] + this._yf;
	this.createLayout();
	this.createHPMeter();
	if (String(Moghunter.bosshp_face) === "true") { this.createFace() };
	this.createHPNumber();
	if (String(Moghunter.bosshp_states) === "true") { this.createStates() };
	this.createName();
};

//==============================
// * createLayout
//==============================
Sprite_BossHP.prototype.createLayout = function () {
	this._layout = new Sprite(ImageManager.loadBossHp("Boss_HP_A"));
	this.addChild(this._layout);
};

//==============================
// * create States
//==============================
Sprite_BossHP.prototype.createStates = function () {
	this._states_data = [0, 0, 0];
	this._stateIcons = [];
	this._stateImg = ImageManager.loadSystem("IconSet");
	this._state_icon = new Sprite();
	this._state_icon.x = Number(Moghunter.bosshp_statesX);
	this._state_icon.y = Number(Moghunter.bosshp_statesY);
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refreshStates();
};

//==============================
// * refresh States
//==============================
Sprite_BossHP.prototype.refreshStates = function () {
	this._state_icon.visible = false;
	this._battler._nrsBoss = false;
	for (i = 0; i < this._stateIcons.length; i++) {
		this._state_icon.removeChild(this._stateIcons[i]);
	};
	this._stateIcons = [];
	if (this._battler.allIcons().length == 0 || this._battler.isDead()) { return };
	this._state_icon.visible = true;
	var w = Window_Base._iconWidth;
	var icons = this._battler.allIcons().slice(0, w);
	var m = Math.min(Math.max(this._battler.allIcons().length, 0), Moghunter.bosshp_statesN);
	for (i = 0; i < m; i++) {
		this._stateIcons[i] = new Sprite(this._stateImg);
		var sx = icons[i] % 16 * w;
		var sy = Math.floor(icons[i] / 16) * w;
		this._stateIcons[i].setFrame(sx, sy, w, w);
		this._stateIcons[i].x = ((w + 4) * i);
		this._state_icon.addChild(this._stateIcons[i]);
	};
};

//==============================
// * Update States
//==============================
Sprite_BossHP.prototype.updateStates = function () {
	if (this._battler._nrsBoss) { this.refreshStates() };
};

//==============================
// * create Face
//==============================
Sprite_BossHP.prototype.createFace = function () {
	this._face = new Sprite();
	this.addChild(this._face);
	this.refreshFace();
	this.updateFace();
};

//==============================
// * update Face
//==============================
Sprite_BossHP.prototype.updateFace = function () {
	this._face.x = Moghunter.bosshp_faceX;
	this._face.y = Moghunter.bosshp_faceY;
	this._face.visible = this._layout.visible;
};

//==============================
// * refresh Face
//==============================
Sprite_BossHP.prototype.refreshFace = function () {
	this._face.bitmap = ImageManager.loadBossHp("Face_" + String(this._battler._enemyId));
};

//==============================
// * create HP Meter
//==============================
Sprite_BossHP.prototype.createHPMeter = function () {
	this._hp_meter_red = new Sprite(ImageManager.loadBossHp("Boss_HP_B"));
	this._hp_meter_red.x = Moghunter.bosshp_meter_x;
	this._hp_meter_red.y = Moghunter.bosshp_meter_y;
	this._hp_meter_redFlow = [-1, 0, 0, 0];
	this._hp_meter_red.setFrame(0, 0, 1, 1);
	this.addChild(this._hp_meter_red);
	this._hp_meter_blue = new Sprite(ImageManager.loadBossHp("Boss_HP_B"));
	this._hp_meter_blue.x = this._hp_meter_red.x;
	this._hp_meter_blue.y = this._hp_meter_red.y;
	this._hp_meter_blueFlow = [-1, 0, 0, 0];
	this._hp_meter_blue.setFrame(0, 0, 1, 1);
	this.addChild(this._hp_meter_blue);
};

//==============================
// * create HP Number
//==============================
Sprite_BossHP.prototype.createHPNumber = function () {
	this._hp_number = [];
	this._hp_number_data = []
	this._hp_number_img = ImageManager.loadBossHp("Boss_HP_C");
	for (var i = 0; i < 6; i++) {
		this._hp_number[i] = new Sprite(this._hp_number_img);
		this._hp_number[i].visible = false;
		this._hp_number[i].x = Moghunter.bosshp_number_x;
		this._hp_number[i].y = Moghunter.bosshp_number_y;
		this._hp_number_data[i] = 0;
		this.addChild(this._hp_number[i]);
	};
	if (this._hp_perMode) { this.createPerc() };
};

//==============================
// * create Per
//==============================
Sprite_BossHP.prototype.createPerc = function () {
	this._perSprite = new Sprite(ImageManager.loadBossHp("Boss_HP_D"));
	this.addChild(this._perSprite);
};

//==============================
// * create Name
//==============================
Sprite_BossHP.prototype.createName = function () {
	this._name = new Sprite(new Bitmap(300, 48));
	this.addChild(this._name);
	this._name.bitmap.fontSize = Moghunter.bosshp_font_size;
	this.refresh_name();
	this._name.x = Moghunter.bosshp_name_x;
	this._name.y = Moghunter.bosshp_name_y;
};

//==============================
// * get Sprite Data
//==============================
Sprite_BossHP.prototype.getSpriteData = function () {
	this._hp_meter_blueFlow[0] = this._flowAnimation ? (this._hp_meter_blue.bitmap.width / 3) : this._hp_meter_blue.bitmap.width;
	this._hp_meter_blueFlow[1] = this._hp_meter_blue.bitmap.height;
	this._hp_meter_blueFlow[2] = this._hp_meter_blueFlow[0] * 2;
	this._hp_meter_blueFlow[3] = 0;
	this._hp_meter_redFlow[0] = this._flowAnimation ? (this._hp_meter_red.bitmap.width / 3) : this._hp_meter_red.bitmap.width;
	this._hp_meter_redFlow[1] = this._hp_meter_red.bitmap.height;
	this._hp_meter_redFlow[2] = this._hp_meter_redFlow[0] * 2;
	this._hp_meter_redFlow[3] = 0;
};

//==============================
// * Update
//==============================
Sprite_BossHP.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._hp_meter_blueFlow[0] === -1) {
		if (this._layout.bitmap.isReady()) {
			this.getSpriteData();
		} else {
			return
		};
	};
	if (this._flowAnimation) { this.updateFlowAnimation() };
	if ($gameTemp._battler_bhp_temp[3] != 0) { this.refreshShake() };
	if (this.need_fadeSprites()) { this.updateFade(5) } else { this.updateFade(-5) };
	if ($gameTemp._battler_bhp_temp[0] != this._battler) { this.refresh_all(); };
	if (this._flowAnimation) {
		this.refresh_blue_meter();
	} else if (this._hp_data[0] != this._battler.hp || this._hp_data[1] != this._battler.mhp) {
		this.refresh_blue_meter();
	};
	if (this._hp_data[2] != this._battler.hp) { this.refresh_red_meter(); };
	if (this._hp_data[6] != this._battler.hp) { this.update_hp_number(); };
	if (this._hp_data[11]) { this.update_shake_effect(); };
	if (this._face) { this.updateFace() };

	if (this._state_icon) { this.updateStates() };
	if ($gameSystem._battler_bhp_refresh3) { this.refreshPluginCommand() };
	$gameSystem._battler_bhp_refresh3 = false;
	this._init = false;
};

//==============================
// * refreshPluginCommand
//==============================
Sprite_BossHP.prototype.refreshPluginCommand = function () {
	this._hp_data[9] = Number($gameSystem._bosshp_data[0]);
	this._hp_data[10] = Number($gameSystem._bosshp_data[1]);
	this._hp_data[12] = Number($gameSystem._bosshp_data[2]);
	this.x = this._hp_data[9] + this._xf;
	this.y = this._hp_data[10] + this._yf;
	if (!this._hp_data[12]) {
		for (var i = 0; i < this._hp_number.length; i++) {
			this._hp_number[i].visible = false;
		};
	} else {
		this.refresh_hp_number();
	};

};

//==============================
// * refresh Shake
//==============================
Sprite_BossHP.prototype.refreshShake = function () {
	this._hp_data[7] = $gameTemp._battler_bhp_temp[3];
	$gameTemp._battler_bhp_temp[3] = 0;
};

//==============================
// * Update Flow Animation
//==============================
Sprite_BossHP.prototype.updateFlowAnimation = function () {
	this._hp_meter_blueFlow[3] += Moghunter.bosshp_flowAnimationSpeed;
	if (this._hp_meter_blueFlow[3] > this._hp_meter_blueFlow[2]) {
		this._hp_meter_blueFlow[3] = 0;
	};
	this._hp_meter_redFlow[3] += Moghunter.bosshp_flowAnimationSpeed;
	if (this._hp_meter_redFlow[3] > this._hp_meter_redFlow[2]) {
		this._hp_meter_redFlow[3] = 0;
	};
};

//==============================
// * Update Shake Effect
//==============================
Sprite_BossHP.prototype.update_shake_effect = function () {
	if (this._hp_data[7] <= 0) { return; };
	this._hp_data[7] -= 1;
	this.y = -3 + this._hp_data[10] + Math.floor(Math.random() * 6) + this._yf;
	if (this._hp_data[7] <= 0) { this.y = this._hp_data[10] + this._yf };
};

//==============================
// * Update HP Number
//==============================
Sprite_BossHP.prototype.update_hp_number = function () {
	if (!this._hp_data[12]) { return };
	if (this._init && $gameSystem._battler_bhp_oldNumber[1] != 0) {
		this._hp_data[6] = $gameSystem._battler_bhp_oldNumber[1];
		$gameSystem._battler_bhp_oldNumber[1] = 0;
	};
	var nspd = 1 + Math.floor((Math.abs(this._hp_data[6] - this._battler.hp) / 30))
	if (this._hp_data[6] < this._battler.hp) {
		this._hp_data[6] += nspd;
		if (this._hp_data[6] > this._battler.hp) { this._hp_data[6] = this._battler.hp };
	}
	else if (this._hp_data[6] > this._battler.hp) {
		this._hp_data[6] -= nspd;
		if (this._hp_data[6] < this._battler.hp) { this._hp_data[6] = this._battler.hp };
	};
	this.refresh_hp_number();
};

//==============================
// * Refresh HP Number
//==============================
Sprite_BossHP.prototype.refresh_hp_number = function () {
	var w = this._hp_number_img.width / 10;
	var h = this._hp_number_img.height;
	if (this._hp_perMode) {
		var value = Math.floor((this._hp_data[6] / this._battler.mhp) * 100);
	} else {
		var value = this._hp_data[6];
	};
	this._hp_data[4] = Math.abs(value).toString().split("");
	if (this._hp_data[4].length > this._hp_number.length) { return };
	if (this._hp_data[4].length != this._hp_data[5]) {
		for (var i = 0; i < 6; i++) { this._hp_number[i].visible = false }; this._hp_data[5] = this._hp_data[4].length
	};
	for (var i = 0; i < this._hp_data[4].length; i++) {
		var n = Number(this._hp_data[4][i]);
		this._hp_number[i].setFrame(n * w, 0, w, h);
		this._hp_number[i].visible = true;
		var nx = -(w * i) + (w * this._hp_data[4].length)
		this._hp_number[i].x = Moghunter.bosshp_number_x - nx;
	};
	if (this._perSprite) {
		this._perSprite.x = Moghunter.bosshp_number_x + 4;
		this._perSprite.y = Moghunter.bosshp_number_y;
	};
};

//==============================
// * Refresh Name
//==============================
Sprite_BossHP.prototype.refresh_name = function () {
	this._name.bitmap.clear();
	this._name.bitmap.drawText(this._battler.enemy().name, 0, 0, this._name.bitmap.width, this._name.bitmap.height, 0);
};

//==============================
// * Need Fade Sprites
//==============================
Sprite_BossHP.prototype.need_fadeSprites = function () {
	if ($gameMessage.isBusy()) { return true };
	if ($gameTemp._battler_bhp_temp[2]) { return true };
	if (!this._battler) { return true };
	if (this._battler.isDead()) { return true };
	if (this._battler.isHidden()) { return true };
	return false;
};

//==============================
// * Fade Sprites
//==============================
Sprite_BossHP.prototype.updateFade = function (value) {
	this.opacity -= value;
};

//==============================
// * Refresh All
//==============================
Sprite_BossHP.prototype.refresh_all = function () {
	this._battler = $gameTemp._battler_bhp_temp[0];
	this._hp_data[2] = $gameTemp._battler_bhp_temp[1];
	this._hp_data[6] = $gameTemp._battler_bhp_temp[1];
	this.refresh_hp_number();
	this.refresh_blue_meter();
	this.refresh_red_meter();
	this.refresh_name();
	if (this._face) { this.refreshFace() };
	if (this._state_icon) { this.refreshStates() };
};

//==============================
// * Refresh Blue Meter
//==============================
Sprite_BossHP.prototype.refresh_blue_meter = function () {
	this._hp_data[0] = this._battler.hp;
	this._hp_data[1] = this._battler.mhp;
	this.y = this._hp_data[10]
	var meter_rate = this._hp_meter_blueFlow[0] * this._battler.hp / this._battler.mhp;
	this._hp_meter_blue.setFrame(this._hp_meter_blueFlow[3], 0, meter_rate, this._hp_meter_blue.bitmap.height / 2);
};

//==============================
// * Refresh Red Meter
//==============================
Sprite_BossHP.prototype.refresh_red_meter = function () {
	if (this._init) {
		if ($gameSystem._battler_bhp_oldNumber[0] != 0) {
			this._hp_data[2] = $gameSystem._battler_bhp_oldNumber[0];
			$gameSystem._battler_bhp_oldNumber[0] = 0;
		} else {
			this._hp_data[2] = this._battler.mhp;
		};
	};
	var dnspeed = 1 + (Math.abs(this._hp_data[2] - this._battler.hp) / 160);
	if (this._hp_data[2] > this._battler.hp) {
		this._hp_data[2] -= dnspeed;
		if (this._hp_data[2] < this._battler.hp) { this._hp_data[2] = this._battler.hp };
	}
	else if (this._hp_data[2] < this._battler.hp) {
		this._hp_data[2] += dnspeed;
		if (this._hp_data[2] > this._battler.hp) { this._hp_data[2] = this._battler.hp };
	};
	var meter_rate = this._hp_meter_redFlow[0] * this._hp_data[2] / this._battler.mhp;
	this._hp_meter_red.setFrame(this._hp_meter_redFlow[3], this._hp_meter_red.bitmap.height / 2, meter_rate, this._hp_meter_red.bitmap.height / 2);
};
