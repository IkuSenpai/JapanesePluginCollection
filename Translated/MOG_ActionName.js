//=============================================================================
// MOG_ActionName.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Apresenta uma janela com nome da ação.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param X-Axis Offset
 * @desc Posição X-Axis do layout.
 * @default 0
 *
 * @param Y-Axis Offset
 * @desc Posição Y-Axis do layout.
 * @default 10
 *
 * @param Name X-Axis
 * @desc Posição X-Axis do Nome.
 * @default 0
 *
 * @param Name Y-Axis
 * @desc Posição Y-Axis do Nome.
 * @default 24 
 *
 * @param Icon X-Axis
 * @desc Posição X-Axis do Ícone.
 * @default 0 
 *
 * @param Icon Y-Axis
 * @desc Posição Y-Axis do Ícone.
 * @default -4
 *
 * @param Font Size
 * @desc Definição do tamanho da fonte.
 * @default 22
 *
 * @help  
 * =============================================================================
 * +++ MOG - Action Name (v1.0) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta uma janela com nome da ação.
 * Será necessário ter o arquivo. (img/system/)
 *
 * ActionName.png
 *      
 * =============================================================================
 * Desativar o Nome 
 * =============================================================================
 * Inicialmente todas as ações terão o nome ativado, no caso de querer desativar
 * algum nome, utilize o comentário abaixo na caixa de notas do Item/Habilidade.
 * 
 * Disable Name
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) 戦闘中にアクション名ウィンドウを表示します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_ActionName.js
 *
 * @param X-Axis Offset
 * @text レイアウトのX軸位置
 * @default 0
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Y-Axis Offset
 * @text レイアウトのY軸位置
 * @default 10
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Name X-Axis
 * @text 名前のX軸位置
 * @default 0
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Name Y-Axis
 * @text 名前のY軸位置
 * @default 24
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Icon X-Axis
 * @text アイコンのX軸位置
 * @default 0
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Icon Y-Axis
 * @text アイコンのY軸位置
 * @default -4
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 *
 * @param Font Size
 * @text フォントサイズ
 * @default 22
 * @type number
 * @max 9007
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * +++ MOG - Action Name (v1.0) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * 戦闘中にアクション名ウィンドウを表示します。
 * ウィンドウの画像が必要です。 (img/system/)
 *
 * ActionName.png
 * ActionNameA.png
 * ActionNameB.png
 *
 * ===========================================================================
 * 名前を非表示にする
 * ===========================================================================
 * 最初は全てのアクションの名前が表示されます。
 * アイテム/スキルのメモ欄に下記のメモタグを使用すると、非表示になります。
 *
 * Disable Name
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_ActionName = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_ActionName');
Moghunter.skillName_x = Number(Moghunter.parameters['X-Axis Offset'] || 0);
Moghunter.skillName_y = Number(Moghunter.parameters['Y-Axis Offset'] || 10);
Moghunter.skillName_name_x = Number(Moghunter.parameters['Name X-Axis'] || 0);
Moghunter.skillName_name_y = Number(Moghunter.parameters['Name Y-Axis'] || 24);
Moghunter.skillName_icon_x = Number(Moghunter.parameters['Icon X-Axis'] || 0);
Moghunter.skillName_icon_y = Number(Moghunter.parameters['Icon Y-Axis'] || -4);
Moghunter.skillName_FontSize = Number(Moghunter.parameters['Font Size'] || 22);
Moghunter.skillName_duration = Number(Moghunter.parameters['ABS Mode Duration'] || 120);

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_mog_skillname_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function () {
	_alias_mog_skillname_initialize.call(this);
	this._skillNameData = [false, null, false];
	this._skillNameDuration = [0, Number(Moghunter.skillName_duration), 0];
};

//=============================================================================
// ■■■ Battle Manager ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Start Action
//==============================
var _mog_skillName_bmngr_startAction = BattleManager.startAction;
BattleManager.startAction = function () {
	this.setSkillName();
	_mog_skillName_bmngr_startAction.call(this);
};

//==============================
// * set Skill Name
//==============================
BattleManager.setSkillName = function () {
	if (!this._subject.currentAction() || !this._subject.currentAction().item()) { return };
	var item = this._subject.currentAction().item();
	var notes = item.note.split(/[\r\n]+/);
	var enableName = true;
	notes.forEach(function (note) {
		if (note == "Disable Name") { enableName = false };
	}, this);
	if (enableName) { $gameTemp._skillNameData = [true, item, true] };
};

//==============================
// ♦ ALIAS ♦  End Turn
//==============================
var _mog_skillName_bmngr_endAction = BattleManager.endAction;
BattleManager.endAction = function () {
	_mog_skillName_bmngr_endAction.call(this);
	$gameTemp._skillNameData = [false, null, false];
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
// * create Action Name
//==============================
Scene_Base.prototype.createActionName = function () {
	this._spriteSkillName = new SpriteSkillName();
	this._spriteSkillName.z = 140;
	this._hudField.addChild(this._spriteSkillName);
};

//=============================================================================
// ■■■ Scene Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  create Spriteset
//==============================
var _mog_actionName_sbattle_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
	_mog_actionName_sbattle_createSpriteset.call(this);
	if (!this._hudField) { this.createHudField() };
	this.createActionName();
	this.sortMz();
};

//=============================================================================
// * Sprite Skill Name
//=============================================================================
function SpriteSkillName() {
	this.initialize.apply(this, arguments);
};

SpriteSkillName.prototype = Object.create(Sprite.prototype);
SpriteSkillName.prototype.constructor = SpriteSkillName;

//==============================
// * Initialize
//==============================
SpriteSkillName.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.loadImages();
	this.createLayout();
	this.createName();
	this.createIcon();
	this.visible = false;
	var xf = Graphics.width / 2;
	var yf = 0;
	this.x = xf + Number(Moghunter.skillName_x);
	this.y = yf + Number(Moghunter.skillName_y);
	this._wait = 0;
	if ($gameTemp._skillNameDuration[0] > 0 && $gameTemp._skillNameDuration[1]) {
		$gameTemp._skillNameData[0] = true;
	};
};

//==============================
// * Load Images
//==============================
SpriteSkillName.prototype.loadImages = function () {
	this._iconImg = ImageManager.loadSystem("IconSet");
	this._layoutImg = ImageManager.loadSystem("ActionNameA");
};

//==============================
// * Item
//==============================
SpriteSkillName.prototype.item = function () {
	return $gameTemp._skillNameData[1];
};

//==============================
// * is Visible
//==============================
SpriteSkillName.prototype.isVisible = function () {
	if (this._wait > 0) { return false };
	return $gameTemp._skillNameData[2];
};

//==============================
// * get Name Data
//==============================
SpriteSkillName.prototype.getNameData = function () {
	this._nameData = [0, 0, 0, 0];
	this._nameData[0] = this._layoutImg.width;
	this._nameData[1] = Math.floor(this._layoutImg.height / 3);
	this._name.bitmap = new Bitmap(160, 32);
	this._name.bitmap.fontSize = Moghunter.skillName_FontSize;
	this._name.y = Moghunter.skillName_name_y;
	this._icon.x = Moghunter.skillName_icon_x;
	this._icon.y = Moghunter.skillName_icon_y;
};

//==============================
// * refresh Skill Name
//==============================
SpriteSkillName.prototype.refreshSkillName = function () {
	$gameTemp._skillNameData[0] = false;
	this._name.bitmap.clear();
	this._layout.opacity = 0;
	if (!this.item()) { return };
	var text = this.item().name;
	var textsize = ((text.length * 7) + this._nameData[0]);
	var wsize = (Math.min(Math.max(textsize, 48), 160));
	var wposX = ((wsize / 2) + Math.floor(this._nameData[0] / 2));
	for (var i = 0; i < this._layout.length; i++) {
		this._layout[i].x = 1;
		this._layout[i].y = 1;
		if (i === 0) {
			this._layout[i].setFrame(0, 0, this._nameData[0], this._nameData[1]);
			this._layout[i].x -= wposX;
		} else if (i === 1) {
			this._layout[i].setFrame(0, this._nameData[1], this._nameData[0], this._nameData[1]);
			this._layout[i].x += wposX;
		} else {
			this._layout[i].setFrame(0, this._nameData[1] * 2, this._nameData[0], this._nameData[1]);
			this._layout[i].scale.x = wsize / this._nameData[0];
		};
	};
	this._name.bitmap.drawText(this.item().name, 0, 0, 160, 32, "center")
	this._name.x = Moghunter.skillName_name_x;
	this._wait = 4;
	var w = ImageManager.iconWidth;
	var h = ImageManager.iconHeight;
	var sx = this.item().iconIndex % 16 * w;
	var sy = Math.floor(this.item().iconIndex / 16) * h;
	this._icon.setFrame(sx, sy, w, h);
};

//==============================
// * create Layout
//==============================
SpriteSkillName.prototype.createLayout = function () {
	this._layout = [];
	for (var i = 0; i < 3; i++) {
		this._layout[i] = new Sprite(this._layoutImg);
		this._layout[i].anchor.x = 0.5;
		this._layout[i].opacity = 0;
		this._layout[i].z = 20;
		this.addChild(this._layout[i]);
	};
};

//==============================
// * create Name
//==============================
SpriteSkillName.prototype.createName = function () {
	this._name = new Sprite();
	this._name.x = this._layout[0].x + Moghunter.skillName_name_x;
	this._name.y = this._layout[0].y + Moghunter.skillName_name_y;
	this._name.anchor.x = 0.5;
	this._name.z = 21;
	this._name.opacity = 0;
	this.addChild(this._name);

};

//==============================
// * create Icon
//==============================
SpriteSkillName.prototype.createIcon = function () {
	this._icon = new Sprite(this._iconImg);
	this._icon.x = this._layout[0].x + Moghunter.skillName_icon_x;
	this._icon.y = this._layout[0].y + Moghunter.skillName_icon_y;
	this._icon.anchor.x = 0.5;
	this._icon.z = 21;
	this._icon.opacity = 0;
	this.addChild(this._icon);
};

//==============================
// * Update
//==============================
SpriteSkillName.prototype.updateVisible = function () {
	if (this._wait > 0) { this._wait-- };
	if (this.isVisible()) {
		this._layout[0].opacity += 20;
	} else {
		this._layout[0].opacity -= 20;
	};
	for (var i = 1; i < this._layout.length; i++) {
		this._layout[i].opacity = this._layout[0].opacity;
	};
	this._name.opacity = this._layout[0].opacity;
	this._icon.opacity = this._layout[0].opacity;
};

//==============================
// * Update
//==============================
SpriteSkillName.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (!this._nameData) {
		if (this._layoutImg.isReady()) { this.getNameData() };
		return;
	};
	if ($gameTemp._skillNameData[0]) { this.refreshSkillName() };
	if ($gameTemp._skillNameDuration[0] > 0) { $gameTemp._skillNameDuration[0]-- };
	this.updateVisible();
	this.visible = true;
	this.visible = this._layout[0].y === 0 ? false : true;
};
