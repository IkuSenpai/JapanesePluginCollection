//=============================================================================
// MOG_BattlebackEX.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0.1) Adiciona multiplos battlebacks no campo de batalha.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 * 
 * @command set_bbex1
 * @desc Ativar o battleback EX (Back).
 * @text Setup (Below)
 *
 * @arg id
 * @desc Definição da Index (0..20)
 * @text ID
 * @default 0 
 * @type number
 * @min 0
 * @max 20 
 * 
 * @arg filename
 * @desc Definição do nome do battleback.
 * @text File Name
 * @default GrassMaze
 * @type file
 * @dir img/battlebacks1
 * 
 * @arg sx
 * @desc Deslizar o battleback.
 * @text Horizontal scrolling
 * @default 0
 * 
 * @arg sy
 * @desc Deslizar o battleback.
 * @text Vertical scrolling
 * @default 0
 * 
 * @arg opacity
 * @desc Transparência do battleback.
 * @text Opacity
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @arg blendtype
 * @desc Definição do blend.
 * @text Blend Type
 * @type select
 * @default Normal
 * @option Additive
 * @value Additive
 * @option Normal
 * @value Normal
 * @option Multiply
 * @value Multiply
 * 
 * @arg trSpeed
 * @desc Velocidade de transição.
 * @text Transition Speed
 * @type number
 * @default 3
 * @min 1
 * @max 25
 *
 * @arg camRate
 * @desc Efeito de profundidade da câmera. 
 * (Requer Mog_BattleCamera)
 * @text Camera Rate
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @arg camWaveX
 * @desc Permitir Wave Effect na horizontal.
 * (Requer Mog_BattleCamera)
 * @text Allow Horizontal Wave
 * @type boolean
 * @default true
 *
 * @arg camWaveY
 * @desc Permitir Wave Effect na horizontal.
 * (Requer Mog_BattleCamera)
 * @text Allow Vertical Wave
 * @type boolean
 * @default true
 *
 * @command set_bbex2
 * @desc Ativar o battleback EX (Front).
 * @text Setup (Above)
 *
 * @arg id
 * @desc Definição da Index (0..20)
 * @text ID
 * @default 0 
 * @type number
 * @min 0
 * @max 20 
 * 
 * @arg filename
 * @desc Definição do nome do battleback.
 * @text File Name
 * @default GrassMaze
 * @type file
 * @dir img/battlebacks2
 * 
 * @arg sx
 * @desc Deslizar o battleback.
 * @text Horizontal scrolling
 * @default 0
 * 
 * @arg sy
 * @desc Deslizar o battleback.
 * @text Vertical scrolling
 * @default 0
 * 
 * @arg opacity
 * @desc Transparência do battleback.
 * @text Opacity
 * @type number
 * @default 255
 * @min 0
 * @max 255
 * 
 * @arg blendtype
 * @desc Definição do blend.
 * @text Blend Type
 * @type select
 * @default Normal
 * @option Additive
 * @value Additive
 * @option Normal
 * @value Normal
 * @option Multiply
 * @value Multiply
 *
 * @arg id
 * @desc Definição da Index (0..20)
 * @text ID
 * @default 0 
 * @type number
 * @min 0
 * @max 20  
 *
 * @arg trSpeed
 * @desc Velocidade de transição.
 * @text Transition Speed
 * @type number
 * @default 3
 * @min 1
 * @max 25
 *
 * @arg camRate
 * @desc Efeito de profundidade da câmera. 
 * (Requer Mog_BattleCamera)
 * @text Camera Rate
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @arg camWaveX
 * @desc Permitir Wave Effect na horizontal.
 * (Requer Mog_BattleCamera)
 * @text Allow Horizontal Wave
 * @type boolean
 * @default true
 *
 * @arg camWaveY
 * @desc Permitir Wave Effect na horizontal.
 * (Requer Mog_BattleCamera)
 * @text Allow Vertical Wave
 * @type boolean
 * @default true
 *
 * @command remove_bbex
 * @desc Remove o battleback.
 * @text Remove
 *
 * @command remove_bbex_all
 * @desc Remove todos battlebacks (EX).
 * @text Clear All
 *
 * @help  
 * =============================================================================
 * ♦♦♦ MOG - Battleback EX  ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/16
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona multiplos battlebacks no campo de batalha.
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0.1) 複数の戦闘背景を追加レイヤー化します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_BattlebackEX.js
 *
 * @command set_bbex1
 * @desc 戦闘背景EX(背面)を有効にします。
 * @text 設定(背面)
 *
 * @arg id
 * @desc インデックスを指定(0..20)
 * @text ID
 * @default 0
 * @type number
 * @min 0
 * @max 20
 *
 * @arg filename
 * @desc ファイル名の指定
 * @text ファイル名
 * @default GrassMaze
 * @type file
 * @dir img/battlebacks1
 *
 * @arg sx
 * @desc Xスライドの指定
 * @text 水平スクロール
 * @default 0
 *
 * @arg sy
 * @desc Yスライドの指定
 * @text 垂直スクロール
 * @default 0
 *
 * @arg opacity
 * @desc 不透明度の指定
 * @text 不透明度
 * @type number
 * @default 255
 * @min 0
 * @max 255
 *
 * @arg blendtype
 * @desc 合成方法の指定
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
 * @arg trSpeed
 * @desc 移動速度の指定
 * @text 移動速度
 * @type number
 * @default 3
 * @min 1
 * @max 25
 *
 * @arg camRate
 * @desc カメラ遠近効果
 *(要Mog_BattleCamera)
 * @text カメラレート
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @arg camWaveX
 * @desc 水平移動に波効果を有効化
 *(要Mog_BattleCamera)
 * @text 水平波を許可
 * @type boolean
 * @default true
 *
 * @arg camWaveY
 * @desc 垂直移動に波効果を有効化
 *(要Mog_BattleCamera)
 * @text 垂直波を許可
 * @type boolean
 * @default true
 *
 * @command set_bbex2
 * @desc 戦闘背景EX(前面)を有効化
 * @text 設定(前面)
 *
 * @arg id
 * @desc インデックスの指定(0..20)
 * @text ID
 * @default 0
 * @type number
 * @min 0
 * @max 20
 *
 * @arg filename
 * @desc ファイル名の指定
 * @text ファイル名
 * @default GrassMaze
 * @type file
 * @dir img/battlebacks2
 *
 * @arg sx
 * @desc Xスライドの指定
 * @text 水平スクロール
 * @default 0
 *
 * @arg sy
 * @desc Yスライドの指定
 * @text 垂直スクロール
 * @default 0
 *
 * @arg opacity
 * @desc 不透明度の指定
 * @text 不透明度
 * @type number
 * @default 255
 * @min 0
 * @max 255
 *
 * @arg blendtype
 * @desc 合成方法の指定
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
 * @arg id
 * @desc インデックスの指定(0..20)
 * @text ID
 * @default 0
 * @type number
 * @min 0
 * @max 20
 *
 * @arg trSpeed
 * @desc 変化速度の指定
 * @text 変化速度
 * @type number
 * @default 3
 * @min 1
 * @max 25
 *
 * @arg camRate
 * @desc カメラ遠近効果
 *(要Mog_BattleCamera)
 * @text カメラレート
 * @type number
 * @default 100
 * @min 50
 * @max 150
 *
 * @arg camWaveX
 * @desc 水平移動に波効果を有効化
 *(要Mog_BattleCamera)
 * @text 水平波を許可
 * @type boolean
 * @default true
 *
 * @arg camWaveY
 * @desc 垂直移動に波効果を有効化
 *(要Mog_BattleCamera)
 * @text 垂直波を許可
 * @type boolean
 * @default true
 *
 * @command remove_bbex
 * @desc 戦闘背景を消去
 * @text 消去
 *
 * @command remove_bbex_all
 * @desc 全戦闘背景(EX)を消去
 * @text 全消去
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 * ============================================================================
 * ♦♦♦ MOG - Battleback EX  ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/16
 * https://mogplugins.wordpress.com
 * ============================================================================
 * 複数の戦闘背景を追加レイヤー化します。
 *
 * プラグインコマンドで動作します。
 * 
 * 本家で配布されているv1.0はエラーが出て動作しません。
 * これを動作するように修正しました。
 * Version  -   1.0.1
 * Updated  -   2021/09/09
 * 
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

(() => {

	var Imported = Imported || {};
	Imported.MOG_BattlebackEX = true;
	var Moghunter = Moghunter || {};

	Moghunter.parameters = PluginManager.parameters('MOG_BattlebackEX');


	//=============================================================================
	// ■■■  PluginManager ■■■ 
	//=============================================================================	

	PluginManager.registerCommand('MOG_BattlebackEX', "set_bbex1", data => {
		$gameSystem.setBBEX(data, 0);
	});

	PluginManager.registerCommand('MOG_BattlebackEX', "set_bbex2", data => {
		$gameSystem.setBBEX(data, 1);
	});

	PluginManager.registerCommand('MOG_BattlebackEX', "remove_bbex", data => {
		$gameSystem.removeBBEX(data);
	});

	PluginManager.registerCommand('MOG_BattlebackEX', "remove_bbex_all", data => {
		$gameSystem.clearBBEX();
	});

	//=============================================================================
	// ■■■ Game_System ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  Initialize
	//==============================
	const _mog_bbex_sys_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function () {
		_mog_bbex_sys_initialize.call(this);
		this._bbex = [];
		this._bbexData = {};
		this._bbexData.needRefresh = false;
		this._bbexData.initial = false;
	};

	//==============================
	// * set bbex 1
	//==============================
	Game_System.prototype.setBBEX = function (data, z) {
		const Id = Number(data.id);
		const enabled = $gameSystem._bbex[Id] ? true : false;
		const created = enabled && $gameSystem._bbex[Id].created ? true : false
		this._bbex[Id] = {};
		this._bbex[Id].fileName = String(data.filename);
		this._bbex[Id].z = z;
		this._bbex[Id].sx = Number(data.sx);
		this._bbex[Id].sy = Number(data.sy);
		this._bbex[Id].opacity = Number(data.opacity);
		this._bbex[Id].blendType = this.bbexGetBlend(String(data.blendtype));
		this._bbex[Id].trSpeed = Number(data.trSpeed);
		this._bbex[Id].needRefresh = true;
		this._bbex[Id].enabled = created ? enabled : false;
		this._bbex[Id].created = created;
		this._bbex[Id].remove = false;
		this._bbex[Id].camRate = data.camRate ? Number(data.camRate) : 100;
		this._bbex[Id].camWaveX = String(data.camWaveX) == "true" ? true : false;
		this._bbex[Id].camWaveY = String(data.camWaveY) == "true" ? true : false;
		this._bbexData.needRefresh = true;
	};

	//==============================
	// * bbex get ZIndex
	//==============================
	Game_System.prototype.bbexGetZIndex = function (zindex) {
		if (zindex == "Front") { return 1 };
		return 0;
	};

	//==============================
	// * bbex get Blend
	//==============================
	Game_System.prototype.bbexGetBlend = function (blend) {
		if (blend == "Additive") {
			return 1;
		} else if (blend == "Multiply") { return 2 };
		return 0;
	};

	//==============================
	// * remove bbex
	//==============================
	Game_System.prototype.removeBBEX = function (data) {
		const Id = Number(data.id);
		this._bbex[Id] = null;
	};

	//==============================
	// * clear bbex
	//==============================
	Game_System.prototype.clearBBEX = function (data) {
		this._bbex = [];
	};

	//=============================================================================
	// ■■■ Spriteset Battle ■■■
	//=============================================================================

	//==============================
	// *  create BBEX Field 1
	//==============================
	Spriteset_Battle.prototype.createBBEXField1 = function () {
		this._bbEX_field_1 = new Sprite();
		this._bbEX_field_1.z = 1;
		this._baseSprite.addChild(this._bbEX_field_1);
	};

	//==============================
	// *  create BBEX Field 2
	//==============================
	Spriteset_Battle.prototype.createBBEXField2 = function () {
		this._bbEX_field_2 = new Sprite();
		this._bbEX_field_2.z = 3;
		this._baseSprite.addChild(this._bbEX_field_2);
	};

	//==============================
	// ♦ ALIAS ♦  Create BattleBack
	//==============================
	const _mog_bbex_spriteset_battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
	Spriteset_Battle.prototype.createBattleback = function () {
		_mog_bbex_spriteset_battle_createBattleback.call(this);
		this._bbEx_Sprite = [];
		$gameSystem._bbexData.initial = true;
		this.createBBEXField1();
	};

	//==============================
	// ♦ ALIAS ♦  Create Lower Layer
	//==============================
	const _mog_spriteset_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
	Spriteset_Battle.prototype.createLowerLayer = function () {
		_mog_spriteset_battle_createLowerLayer.call(this);
		this.createBBEXField2();
		this.refreshBBEX();
		$gameSystem._bbexData.initial = false;
	};

	//==============================
	// *  refreshBBEX
	//==============================
	Spriteset_Battle.prototype.refreshBBEX = function () {
		$gameSystem._bbexRefresh = false;
		for (var i = 0; i < $gameSystem._bbex.length; i++) {
			if ($gameSystem._bbex[i] && !$gameSystem._bbex[i].enabled) { this.createBattleBack(i) };
		};
	};

	//==============================
	// * createBattleBack
	//==============================
	Spriteset_Battle.prototype.createBattleBack = function (index) {
		$gameSystem._bbex[index].enabled = true;
		var i = 0;	//BugFix Harizumi
		this._bbEx_Sprite[i] = new BattleBackEX(index);
		this._bbEx_Sprite[i].z = index;
		if ($gameSystem._bbex[index].z == 0) {
			this._bbEX_field_1.addChild(this._bbEx_Sprite[i]);
		} else {
			this._bbEX_field_2.addChild(this._bbEx_Sprite[i]);
		};
		this._bbEX_field_1.children.sort((a, b) => a.z - b.z);
		this._bbEX_field_2.children.sort((a, b) => a.z - b.z);
	};

	//==============================
	// * updateBattleBack EX
	//==============================
	Spriteset_Battle.prototype.updateBattlebackEX = function () {
		if ($gameSystem._bbexData.needRefresh) { this.refreshBBEX() };
	};

	//==============================
	// ♦ ALIAS ♦  Update
	//==============================
	const _mog_bbex_spriteset_battle_update = Spriteset_Battle.prototype.update;
	Spriteset_Battle.prototype.update = function () {
		_mog_bbex_spriteset_battle_update.call(this);
		if (this._bbEX_field_2) { this.updateBattlebackEX() };
	};

	//=============================================================================
	// ■■■ BattleBackEX ■■■
	//=============================================================================
	function BattleBackEX() {
		this.initialize(...arguments);
	};

	BattleBackEX.prototype = Object.create(TilingSprite.prototype);
	BattleBackEX.prototype.constructor = BattleBackEX;

	//==============================
	// * Initialize
	//==============================
	BattleBackEX.prototype.initialize = function (index) {
		TilingSprite.prototype.initialize.call(this);
		this._index = index;
		this._loaded = false;
		this._initial = $gameSystem._bbexData.initial;
		this._sx = 0;
		this._sy = 0;
		this._baseX = 0;
		this._baseY = 0;
		this._fadeAni = {};
		this._fadeAni.enabled = this._initial ? false : true;
		this._fadeAni.phase = 0;
		$gameSystem._bbex[this._index].needRefresh = false;
		$gameSystem._bbex[this._index].created = true;
		this.refreshBitmap();
	};

	//==============================
	// ♦♦  from Default RM JS Core ♦♦ 
	// adjustPosition
	//==============================
	BattleBackEX.prototype.adjustPosition = function () {
		this.width = Math.floor((1000 * Graphics.width) / 816);
		this.height = Math.floor((740 * Graphics.height) / 624);
		this._baseX = (Graphics.width - this.width) / 2;
		if ($gameSystem.isSideView()) {
			this._baseY = Graphics.height - this.height;
		} else {
			this._baseY = 0;
		}
		const ratioX = this.width / this.bitmap.width;
		const ratioY = this.height / this.bitmap.height;
		const scale = Math.max(ratioX, ratioY, 1.0);
		this.scale.x = scale;
		this.scale.y = scale;
	};

	//==============================
	// * adjustPositionBattleCamera
	//==============================
	BattleBackEX.prototype.adjustPositionBattleCamera = function () {
		const cRangeX = $gameSystem._cam_data[1] / 80;
		const cRangeY = $gameSystem._cam_data[1] / 135;
		const marginX = 64
		const marginY = 64
		const gwidth = Graphics.width + marginX;
		const gheight = Graphics.height + marginY;
		this.width = this.bitmap.width < gwidth ? gwidth : this.bitmap.width;
		this.height = this.bitmap.height < gheight ? gheight : this.bitmap.height;
		this._baseX = -(gwidth / 4);
		this._baseY = -(gheight / 4);
		if (this.data().camRate < 100) {
			var bx = gwidth - (gwidth * (this.data().camRate / 100))
			var by = gheight - (gheight * (this.data().camRate / 100))
			var camWidth = this.width + (this.width * cRangeX) + bx;
			var camHeight = this.height + (this.height * cRangeY) + by;
			this._baseX -= bx
			this._baseY -= by
		} else {
			var camWidth = this.width + (this.width * cRangeX);
			var camHeight = this.height + (this.height * cRangeY);
		};
		const ratioX = camWidth / this.bitmap.width;
		const ratioY = camHeight / this.bitmap.height;
		this.scale.x = ratioX;
		this.scale.y = ratioY;
	};

	//==============================
	// * refreshBitmap
	//==============================
	BattleBackEX.prototype.refreshBitmap = function () {
		if (this.data().z == 0) {
			this.bitmap = ImageManager.loadBattleback1(this.fileName());
		} else {
			this.bitmap = ImageManager.loadBattleback2(this.fileName());
		};
		this._loaded = false;
	};

	//==============================
	// * Data
	//==============================
	BattleBackEX.prototype.data = function () {
		return $gameSystem._bbex[this._index];
	};

	//==============================
	// * fileName
	//==============================
	BattleBackEX.prototype.fileName = function () {
		return String(this.data().fileName);
	};

	//==============================
	// * fadeSpeed
	//==============================
	BattleBackEX.prototype.fadeSpeed = function () {
		return this.data().trSpeed;
	};

	//==============================
	// * refresh Battleback
	//==============================
	BattleBackEX.prototype.refreshBattleback = function () {
		this._loaded = true;
		this.opacity = this._fadeAni.enabled ? 0 : this.data().opacity;
		this.blendMode = this.data().blendType;
		this._sx = this.data().sx;
		this._sy = this.data().sy;
		this.origin.x = 0;
		this.origin.y = 0;
		if ($gameTemp._bcamPos) {
			this.adjustPositionBattleCamera();
		} else {
			this.adjustPosition();
		};
	};

	//==============================
	// * update Fade
	//==============================
	BattleBackEX.prototype.updateFade = function () {
		if (this._fadeAni.phase == 0) {
			this.opacity -= this.fadeSpeed();
			if (this.opacity <= 0) {
				this._fadeAni.phase = 1;
				this.refreshBitmap();
			};
		} else {
			if (this.opacity < this.data().opacity) {
				this.opacity += this.fadeSpeed();
				if (this.opacity >= this.data().opacity) {
					this.opacity = this.data().opacity;
					this._fadeAni.enabled = false;
					this._fadeAni.phase = 0
				};
			};
		};
	};

	//==============================
	// * change Battle Back
	//==============================
	BattleBackEX.prototype.changeBattleBack = function () {
		$gameSystem._bbex[this._index].needRefresh = false;
		this._fadeAni.enabled = true;
		this._fadeAni.phase = 0;
	};

	//==============================
	// * Update BattleBack
	//==============================
	BattleBackEX.prototype.updateBattleBack = function () {
		this.origin.x += this._sx;
		this.origin.y += this._sy;
		this.x = this._baseX + this.camRateX();
		this.y = this._baseY + this.camRateY();
		if (Imported.MOG_BattleCamera) {
			if (!this.data().camWaveX) { this.x -= $gameTemp._battleCamera.waveX };
			if (!this.data().camWaveY) { this.y -= $gameTemp._battleCamera.waveY };
		};
		if ($gameSystem._bbex[this._index].needRefresh) { this.changeBattleBack() };
		if (this.data().remove) {
			this.opacity -= this.fadeSpeed();
		} else if (this._fadeAni.enabled) {
			this.updateFade();
		};
	};

	//==============================
	// * cam Rate X
	//==============================
	BattleBackEX.prototype.camRateX = function () {
		if ($gameTemp._bcamPos) { return $gameTemp._bcamPos[0] - ($gameTemp._bcamPos[0] * (this.data().camRate / 100)) };
		return 0;
	};

	//==============================
	// * cam Rate Y
	//==============================
	BattleBackEX.prototype.camRateY = function () {
		if ($gameTemp._bcamPos) { return $gameTemp._bcamPos[1] - ($gameTemp._bcamPos[1] * (this.data().camRate / 100)) };
		return 0;
	};

	//==============================
	// * Update
	//==============================
	BattleBackEX.prototype.update = function () {
		TilingSprite.prototype.update.call(this);
		if (!this.data()) { this.opacity -= 10; return };
		if (!this._loaded && this.bitmap.isReady()) { this.refreshBattleback() };
		if (this._loaded) { this.updateBattleBack() };
	};

})();
