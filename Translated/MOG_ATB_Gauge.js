//=============================================================================
// MOG_ATB_Gauge.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta uma Hud apresentando a ordem das ações.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Hud Angle
 * @desc Definição do ângulo da hud.
 * @default 0
 * 
 * @param Hud X-Axis
 * @desc Definição X-Axis da hud.
 * @default 740
 *
 * @param Hud Y-Axis
 * @desc Definição Y-Axis da hud.
 * @default 100
 *
 * @param Enemy X-Axis Offset
 * @desc Definição X-Axis offset do ícone dos inimigos.
 * @default 16
 *
 * @param Actor X-Axis Offset
 * @desc Definição X-Axis offset do ícone dos aliados.
 * @default -16
 *
 * @param Active X-Axis
 * @desc Definição X-Axis quando o battler está em turno.
 * @default -3
 *
 * @param Active Y-Axis
 * @desc Definição Y-Axis quando o battler está em turno.
 * @default 30
 *
 * @param Gauge Size
 * @desc Definição do tamanho do medidor.
 * @default 160
 *
 * @param Skill Visible
 * @desc Apresentar o Ícone de habilidade.
 * @default true
 * @type boolean
 * 
 * @param Skill Zoom
 * @desc Definição do zoom do ícone de habilidade.
 * @default 0.6
 *
 * @param Skill X-Axis
 * @desc Definição X-Axis do ícone de habilidade.
 * @default 0
 *
 * @param Skill Y-Axis
 * @desc Definição Y-Axis do ícone de habilidade.
 * @default 0
 *
 * @help  
 * =============================================================================
 * +++ MOG - ATB Gauge (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta uma Hud apresentando a ordem das ações.
 *
 * =============================================================================
 * IMAGES
 * =============================================================================
 * As imagens deverão ser gravadas na pasta (img/atb/)   
 * Para nomear o ícones dos battlers, nomeie da seguinte forma.
 *
 * Actor_ + ACTOR_ID.png
 * Enemy_ + ACTOR_ID.png
 *
 * Ex
 *
 * Actor_1.png
 * Actor_2.png
 * ...
 * Enemy_1.png
 * Enemy_2.png
 * ...
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) 戦闘行動順をHUDで表示します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_ATB_Gauge.js
 * 
 * @param Hud Angle
 * @text HUDの角度
 * @desc 正:時計回り / 負:反時計回り
 * @default 0
 * @type number
 * @min -360
 * @max 360
 *
 * @param Hud X-Axis
 * @text HUDのX軸位置
 * @default 740
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Hud Y-Axis
 * @text HUDのY軸位置
 * @default 100
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Enemy X-Axis Offset
 * @text 敵アイコンのX軸位置
 * @default 16
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Actor X-Axis Offset
 * @text アクターアイコンのX軸位置
 * @default -16
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Active X-Axis
 * @text バトラーの順番表示のX軸位置
 * @default -3
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Active Y-Axis
 * @text バトラーの順番表示のY軸位置
 * @default 30
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Gauge Size
 * @text メーターサイズ
 * @default 160
 * @type number
 * @max 9007
 *
 * @param Skill Visible
 * @text スキルアイコン有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 *
 * @param Skill Zoom
 * @text スキルアイコンの拡大率
 * @default 0.6
 * @type number
 * @max 9007
 * @decimals 1
 *
 * @param Skill X-Axis
 * @text スキルアイコンのX軸位置
 * @default 0
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Skill Y-Axis
 * @text スキルアイコンのY軸位置
 * @default 0
 * @type number
 * @min -9007
 * @max 9007
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * +++ MOG - ATB Gauge (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * 戦闘行動順をHUDで表示します。
 * ※戦闘システムがタイムプログレスで動作します。
 * ターン制では動作しません。
 *
 * ===========================================================================
 * 必要画像ファイル
 * ===========================================================================
 * 必要な画像ファイルを下記フォルダに保存してください。
 * (img/atb/)
 * 下記のようにバトラーアイコンのファイル名を付けます。
 *
 * Actor_ + ACTOR_ID.png
 * Enemy_ + ACTOR_ID.png
 *
 * 例
 *
 * Actor_1.png
 * Actor_2.png
 * ...
 * Enemy_1.png
 * Enemy_2.png
 * ...
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_ATB_Gauge = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_ATB_Gauge');
Moghunter.atbIconAngle = Number(Moghunter.parameters['Hud Angle'] || 0);
Moghunter.atbIcon_GaugeX = Number(Moghunter.parameters['Hud X-Axis'] || 740);
Moghunter.atbIcon_GaugeY = Number(Moghunter.parameters['Hud Y-Axis'] || 45);
Moghunter.atbIcon_enemyX = Number(Moghunter.parameters['Enemy X-Axis Offset'] || 16);
Moghunter.atbIcon_actorX = Number(Moghunter.parameters['Actor X-Axis Offset'] || -16);
Moghunter.atbIcon_inTurnX = Number(Moghunter.parameters['Active X-Axis'] || -3);
Moghunter.atbIcon_inTurnY = Number(Moghunter.parameters['Active Y-Axis'] || 30);
Moghunter.atbIcon_GaugeSize = Number(Moghunter.parameters['Gauge Size'] || 160);
Moghunter.atbIcon_SkillVisible = String(Moghunter.parameters['Skill Visible'] || 'true');
Moghunter.atbIcon_SkillScale = Number(Moghunter.parameters['Skill Zoom'] || 0.6);
Moghunter.atbIcon_SkillX = Number(Moghunter.parameters['Skill X-Axis'] || 0);
Moghunter.atbIcon_SkillY = Number(Moghunter.parameters['Skill Y-Axis'] || 0);


//=============================================================================
// ■■■ ImageManager ■■■
//=============================================================================

//==============================
// * load ATB Icon
//==============================
ImageManager.loadATBIcon = function (filename) {
	return this.loadBitmap('img/atb/', filename, 0, true);
};

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_atb_gTemp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function () {
	_mog_atb_gTemp_initialize.call(this);
	this._refreshATBGauge = false;;
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
var _mog_atbGauge_sbattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
	_mog_atbGauge_sbattle_createSpriteset.call(this);
	if (!this._hudField) { this.createHudField() };
	if (BattleManager.isTpb()) { this.createATBGauge() };
	this.sortMz();
};

//==============================
// ** create ATB Gauge
//==============================
Scene_Battle.prototype.createATBGauge = function () {
	this._atbGauge = new ATB_Gauge()
	this._atbGauge.z = 125;
	this._hudField.addChild(this._atbGauge);
};

//==============================
// ** remove ATB Gauge
//==============================
Scene_Battle.prototype.removeATBGauge = function () {
	if (!this._atbGauge) { return };
	this._hudField.removeChild(this._atbGauge);
};

//==============================
// ** refresh ATB Gauge
//==============================
Scene_Battle.prototype.refreshATBGauge = function () {
	$gameTemp._refreshATBGauge = false;
	this.removeATBGauge();
	this.createATBGauge();
};

//==============================
// ♦ ALIAS ♦  Update
//==============================
var _mog_atbGauge_Sbat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function () {
	_mog_atbGauge_Sbat_update.call(this);
	if (this._atbGauge && $gameTemp._refreshATBGauge) { this.refreshATBGauge() };
};

//=============================================================================
// ■■■ ATB Gauge ■■■
//=============================================================================

function ATB_Gauge() {
	this.initialize.apply(this, arguments);
};

ATB_Gauge.prototype = Object.create(Sprite.prototype);
ATB_Gauge.prototype.constructor = ATB_Gauge;

//==============================
// ♦ Initialize
//==============================
ATB_Gauge.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this._angle = Moghunter.atbIconAngle * Math.PI / 180;
	this.rotation = this._angle;
	this._iconImg = ImageManager.loadSystem("IconSet");
	this._skillIcon = String(Moghunter.atbIcon_SkillVisible) == "true" ? true : false;
	this.refreshBattlers();
	this.createLayout();
	this.createIcons();
	this.opacity = 0;
};

//==============================
// * refresh Battlers
//==============================
ATB_Gauge.prototype.refreshBattlers = function () {
	this._battlers = [];
	for (var i = 0; i < $gameParty.battleMembers().length; i++) {
		var battler = $gameParty.battleMembers()[i];
		this._battlers.push(battler);
	};
	for (var i = 0; i < $gameTroop.members().length; i++) {
		var battler = $gameTroop.members()[i];
		this._battlers.push(battler);
	};
};

//==============================
// * battlers
//==============================
ATB_Gauge.prototype.battlers = function () {
	if (this._battlers) { return this._battlers };
	return [];
};

//==============================
// * At
//==============================
ATB_Gauge.prototype.atb = function (battler) {
	return battler._tpbChargeTime;
};

//==============================
// * Maxatb
//==============================
ATB_Gauge.prototype.maxatb = function (battler) {
	return 1;
};

//==============================
// * Cast AT
//==============================
ATB_Gauge.prototype.cast_at = function (battler) {
	return battler._tpbCastTime;
};

//==============================
// * Cast Max AT
//==============================
ATB_Gauge.prototype.cast_max_at = function (battler) {
	return battler.tpbRequiredCastTime();
};

//==============================
// * Is Casting
//==============================
ATB_Gauge.prototype.is_casting = function (battler) {
	return battler._tpbState === "casting";
};

//==============================
// * Is Max Atb
//==============================
ATB_Gauge.prototype.inTurn = function (battler) {
	if (!this.is_max_at(battler)) { return false };
	return battler == BattleManager._subject;
};

//==============================
// * Is Max Atb
//==============================
ATB_Gauge.prototype.is_max_at = function (battler) {
	return this.atb(battler) >= this.maxatb(battler);
};

//==============================
// * Is Max Cast
//==============================
ATB_Gauge.prototype.is_max_cast = function (battler) {
	return this.cast_at(battler) >= this.cast_max_at(battler);
};

//==============================
// * Item
//==============================
ATB_Gauge.prototype.item = function (battler) {
	return battler.currentAction();
};

//==============================
// * Create Layout
//==============================
ATB_Gauge.prototype.createLayout = function () {
	this.x = -(816 - Graphics.width) + Moghunter.atbIcon_GaugeX;
	this.y = Moghunter.atbIcon_GaugeY;
	this._layout = new Sprite(ImageManager.loadATBIcon("ATB_Gauge"));
	this._layout.anchor.x = 0.5;
	this.addChild(this._layout);
};

//==============================
// * Create Icons
//==============================
ATB_Gauge.prototype.createIcons = function () {
	this._iconField = new Sprite();
	this.addChild(this._iconField);
	this._icons = [];
	this._skillIcons = [];
	for (var i = 0; i < this.battlers().length; i++) {
		var battler = this.battlers()[i];
		if (battler.isActor()) {
			var name = "Actor_" + String(battler._actorId);
		} else {
			var name = "Enemy_" + String(battler._enemyId);
		};
		this._icons[i] = new Sprite(ImageManager.loadATBIcon(name));
		this._icons[i].battler = battler;
		this._icons[i].anchor.x = 0.5;
		this._icons[i].anchor.y = 0.5;
		this._icons[i].opacity = 0
		this._icons[i].nx = 0;
		this._icons[i].ny = 0;
		this._icons[i].rotation = -this._angle
		this._iconField.addChild(this._icons[i]);
		if (this._skillIcon) { this.createSkillIcon(i, this._icons[i]) };
	};
};

//==============================
// * Index
//==============================
ATB_Gauge.prototype.createSkillIcon = function (i, sprite) {
	this._skillIcons[i] = new Sprite();
	this._skillIcons[i].item = null;
	this._skillIcons[i].org = [Moghunter.atbIcon_SkillX, Moghunter.atbIcon_SkillY];
	this._skillIcons[i].scale.x = Moghunter.atbIcon_SkillScale;
	this._skillIcons[i].scale.y = Moghunter.atbIcon_SkillScale;
	this._skillIcons[i].rotation = this._icons[i].rotation;
	sprite.addChild(this._skillIcons[i]);
};

//==============================
// * Height EX
//==============================
ATB_Gauge.prototype.heightEX = function (battler, type) {
	return 1;
};

//==============================
// * update Icon
//==============================
ATB_Gauge.prototype.updateIcon = function (sprite, index) {
	var battler = sprite.battler;
	if (!battler) { return };
	if (battler.isDead() || battler.isHidden()) {
		sprite.opacity -= 15;
	} else {
		sprite.opacity += 15;
		if (this.is_casting(battler)) {
			var h = Moghunter.atbIcon_GaugeSize * this.cast_at(battler) / this.cast_max_at(battler);
			var h2 = this.heightEX(battler, 1);
		} else {
			var h = Moghunter.atbIcon_GaugeSize * this.atb(battler) / this.maxatb(battler);
			var h2 = this.heightEX(battler, 0);
		};
		if (this.inTurn(battler)) {
			sprite.nx = Moghunter.atbIcon_inTurnX;
			sprite.ny = Moghunter.atbIcon_inTurnY;
		} else {
			sprite.nx = battler.isActor() ? Moghunter.atbIcon_actorX : Moghunter.atbIcon_enemyX;
			sprite.ny = this._layout.height - h + h2;
		};
	};
	sprite.x = this.mvto(sprite.x, sprite.nx);
	sprite.y = this.mvto(sprite.y, sprite.ny);
	if (this._skillIcon) { this.updateSkillIcon(this._skillIcons[index], sprite, battler) };
};

//==============================
// * updateSkillIcon
//==============================
ATB_Gauge.prototype.updateSkillIcon = function (spriteskill, spriteicon, battler) {
	spriteskill.x = spriteskill.org[0];
	spriteskill.y = spriteskill.org[1];
	if (spriteskill.wait > 0) { spriteskill.wait-- };
	spriteskill.opacity = spriteskill.wait > 0 ? 0 : spriteicon.opacity;
	spriteskill.visible = spriteicon.visible;
	if (spriteskill.item != this.item(battler)) { this.refreshIconSkill(spriteskill, battler) };
};

//==============================
// * refresh Icon Skill
//==============================
ATB_Gauge.prototype.refreshIconSkill = function (spriteskill, battler) {
	spriteskill.item = this.item(battler);
	spriteskill.wait = 0;
	if (this.needCreateSkillIcon(battler, spriteskill.item)) {
		var action = spriteskill.item.item()
		var iconIndex = action.iconIndex;
		var pw = ImageManager.iconWidth;
		var ph = ImageManager.iconHeight;
		var sx = iconIndex % 16 * pw;
		var sy = Math.floor(iconIndex / 16) * ph;
		spriteskill.bitmap = this._iconImg;
		spriteskill.setFrame(sx, sy, pw, ph);
		spriteskill.wait = 5;
	} else {
		spriteskill.bitmap = null;
	};
	spriteskill.visible = spriteskill.item != null ? true : false;
	spriteskill.opacity = 0;
};

//==============================
// * need Create Skill Icon
//==============================
ATB_Gauge.prototype.needCreateSkillIcon = function (battler, item) {
	if (!this.is_casting(battler)) { return false };
	if (!item) { return false };
	if (!item.item()) { return false };
	return true
};

//==============================
// * mv to
//==============================
ATB_Gauge.prototype.mvto = function (value, real_value) {
	if (value == real_value) { return value };
	var dnspeed = 5 + (Math.abs(value - real_value) / 10);
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
// * need Fade
//==============================
ATB_Gauge.prototype.needFade = function () {
	if ($gameMessage.isBusy()) { return true };
	if ($gameTemp._battleEnd) { return true };
	if ($gameTemp._atbBattleEnd) { return true };
	return false;
};

//==============================
// * Update Visible
//==============================
ATB_Gauge.prototype.updateVisible = function () {
	if (this.needFade()) {
		this.opacity -= 10;
	} else {
		this.opacity += 10;
	};
};

//==============================
// * update Sort Y
//==============================
ATB_Gauge.prototype.updateSortY = function () {
	this._iconField.children.sort(function (b, a) { return a.y - b.y })
};

//==============================
// ♦ update
//==============================
ATB_Gauge.prototype.update = function () {
	Sprite.prototype.update.call(this);
	this.updateVisible();
	this.updateSortY();
	for (var i = 0; i < this._icons.length; i++) {
		this.updateIcon(this._icons[i], i);
	};
};
