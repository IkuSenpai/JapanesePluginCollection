//=============================================================================
// MOG_BattleCamera.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Adiciona o efeito de câmera de batalha.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Cam Speed
 * @desc Velocidade da câmera.
 * @type number
 * @default 30 
 * @min 0
 * @max 500
 *
 * @param Cam Focus Delay
 * @desc Definição do tempo para ativar o foco no alvo.
 * @type number
 * @default 20  
 * @min 0
 * @max 100
 *
 * @param Cam X-Axis
 * @desc Definição X-axis da câmera.
 * @default 0
 *
 * @param Cam Y-Axis
 * @desc Definição Y-axis da câmera.
 * @default 0
 * 
 * @command set_bCamWave
 * @desc Configurar o efeito Wave.
 * @text Wave Effect
 *
 * @arg waveX
 * @desc Ativar o efeito wave na horizontal.
 * @text Horizontal Wave
 * @type boolean
 * @default true
 * 
 * @arg waveSpeedX
 * @desc Definição da velocidade do wave.
 * @text Wave Speed
 * @type number
 * @default 100
 * @min 50
 * @max 300
 *
 * @arg waveY
 * @desc Ativar o efeito wave na vertical
 * @text Vertical Wave
 * @type boolean
 * @default true
 * 
 * @arg waveSpeedY
 * @desc Definição da velocidade do wave.
 * @text Wave Speed
 * @type number
 * @default 100
 * @min 50
 * @max 300
 *
 * @help  
 * =============================================================================
 * ♦♦♦ MOG - Battle Camera ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/16
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona o efeito de câmera de batalha.
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) バトルカメラ効果を追加します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_BattleCamera.js
 *
 * @param Cam Speed
 * @text カメラ速度
 * @type number
 * @default 30
 * @min 0
 * @max 500
 *
 * @param Cam Focus Delay
 * @text 焦点を合わせる時間
 * @type number
 * @default 20
 * @min 0
 * @max 100
 *
 * @param Cam X-Axis
 * @text カメラのX軸
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 *
 * @param Cam Y-Axis
 * @text カメラのY軸
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 *
 * @command set_bCamWave
 * @desc 波エフェクトを指定
 * @text 波エフェクト
 *
 * @arg waveX
 * @desc X軸波エフェクト有効化
 * @text X軸の波エフェクト
 * @type boolean
 * @default true
 * 
 * @arg waveSpeedX
 * @desc X軸波速度を指定
 * @text X軸の波速度
 * @type number
 * @default 100
 * @min 50
 * @max 300
 *
 * @arg waveY
 * @desc Y軸波エフェクト有効化
 * @text Y軸の波エフェクト
 * @type boolean
 * @default true
 * 
 * @arg waveSpeedY
 * @desc Y軸波速度を指定
 * @text Y軸の波速度
 * @type number
 * @default 100
 * @min 50
 * @max 300
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * ♦♦♦ MOG - Battle Camera ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/16
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * バトルカメラ効果を追加します。
 * プラグインコマンドがあります。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_BattleCamera = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_BattleCamera');
Moghunter.bcam_x = Number(Moghunter.parameters['Cam X-Axis'] || 0);
Moghunter.bcam_y = Number(Moghunter.parameters['Cam Y-Axis'] || 0);
Moghunter.bcam_range = Number(Moghunter.parameters['Cam Rate'] || 50);
Moghunter.bcam_speed = Number(Moghunter.parameters['Cam Speed'] || 30);
Moghunter.bcam_ftime = Number(Moghunter.parameters['Cam Focus Delay'] || 20);

//=============================================================================
// ■■■  PluginManager ■■■ 
//=============================================================================	

PluginManager.registerCommand('MOG_BattleCamera', "set_bCamWave", data => {
	$gameSystem.setBcamWave(data);
});

//=============================================================================
// ■■■ Game_Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦   Initialize
//==============================
var _alias_mog_bcam_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
	_alias_mog_bcam_temp_initialize.call(this);
	this.clearBattleCamera();
};

//==============================
// * clear Battle Camera
//==============================
Game_Temp.prototype.clearBattleCamera = function () {
	this._bcamPos = [0, 0];
	this._bcam_actor = [null, [0, 0]];
	this._bcam_target = [null, [0, 0]];
	this._bcam_target_turn = [null, [0, 0]];
	this._bcam_user = [null, [0, 0], 0];
	this._bcam_allTargets = false;
	this._bcam_allTargets_turn = false;
	this._bcam_phase = [0, 0, 0, 0, 0];
	this._bcam_moving = false;
	this._battleEnd = false;
	this._bcam_wait = [0, 0];
	this._battleCamera = {};
	this._battleCamera.centerX = 0;
	this._battleCamera.centerY = 0;
	this._battleCamera.waveX = 0;
	this._battleCamera.waveY = 0;
	this._battleCamera.needRefreshData = false;
};

//=============================================================================
// ■■■ Game_System ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_mog_bcam_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	_alias_mog_bcam_sys_initialize.call(this);
	var nr = Math.min(Math.max(Moghunter.bcam_range, 0), 100);
	var ns = Math.min(Math.max(Moghunter.bcam_speed, 0), 500);
	var nw = Math.min(Math.max(Moghunter.bcam_ftime, 0), 100);
	this._cam_data = [true, nr, ns, nw];
	this._battleCameraData = {};
	this._battleCameraData.waveX = false;
	this._battleCameraData.waveY = false;
	this._battleCameraData.waveSpeedX = 100;
	this._battleCameraData.waveSpeedY = 100;
};

//==============================
// ♦ set BCam Wave
//==============================
Game_System.prototype.setBcamWave = function (data) {
	this._battleCameraData.waveX = String(data.waveX) == "true" ? true : false;
	this._battleCameraData.waveY = String(data.waveY) == "true" ? true : false;
	this._battleCameraData.waveSpeedX = Math.min(Math.max(Number(data.waveSpeedX), 50), 300);
	this._battleCameraData.waveSpeedY = Math.min(Math.max(Number(data.waveSpeedY), 50), 300);
	$gameTemp._battleCamera.needRefreshData = true;
};

//=============================================================================
// ■■■ Scene Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ onSelectAction
//==============================
var _alias_mog_bcam_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function () {
	var action = BattleManager.inputtingAction();
	$gameTemp._bcam_allTargets = action.isForAll();
	_alias_mog_bcam_onSelectAction.call(this);
};

//=============================================================================
// ■■■ Window BattleActor ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ Hide
//==============================
var _alias_mog_bcam_wba_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function () {
	_alias_mog_bcam_wba_hide.call(this);
	$gameTemp._bcam_allTargets = false;
	$gameTemp._bcam_target = null;
};

//==============================
// ♦ ALIAS ♦ Select
//==============================
var _mog_alias_bcam_wba_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function (index) {
	_mog_alias_bcam_wba_select.call(this, index);
	$gameTemp._bcam_target = [null, [0, 0]];
	if (this.actor(index)) { $gameTemp._bcam_target[0] = this.actor(index); };
};

//=============================================================================
// ■■■ Window BattleEnemy ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ Hide
//==============================
var _alias_mog_bcam_wbe_hide = Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function () {
	_alias_mog_bcam_wbe_hide.call(this);
	$gameTemp._bcam_allTargets = false;
	$gameTemp._bcam_target = null;
};

//==============================
// ♦ ALIAS ♦ Select
//==============================
var _mog_alias_batcam_wbe_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function (index) {
	_mog_alias_batcam_wbe_select.call(this, index)
	$gameTemp._bcam_target = [null, [0, 0]];
	if (this.enemy()) { $gameTemp._bcam_target[0] = this.enemy(); };
};

//=============================================================================
// ■■■ Battle Manager ■■■
//=============================================================================

//==============================
// * Camera Clear
//==============================
BattleManager.camera_clear = function () {
	$gameTemp._bcam_user = [null, [0, 0], 0];
	$gameTemp._bcam_target_turn = [null, [0, 0]];
	$gameTemp._bcam_allTargets_turn = false;
	$gameTemp._bcam_moving = false;
};

//==============================
// ♦ ALIAS ♦ Start Action
//==============================
var _alias_mog_bcam_bmger_startAction = BattleManager.startAction;
BattleManager.startAction = function () {
	_alias_mog_bcam_bmger_startAction.call(this);
	this.camera_clear();
	$gameTemp._bcam_user = [this._subject, [0, 0], $gameSystem._cam_data[3]];
	$gameTemp._bcam_target_turn[0] = this._targets[0];
	const subject = this._subject;
	const action = subject.currentAction();
	if (action) {
		if (this.needFocusUserFrontal(action)) { $gameTemp._bcam_target_turn[0] = this._subject };
		if (this.needCenterCam(action)) { $gameTemp._bcam_allTargets_turn = true };
	};
};

//==============================
// * needFocusUserFrontal
//==============================
BattleManager.needFocusUserFrontal = function (action) {
	if ($gameSystem.isSideView()) { return false };
	if (!this._subject.isEnemy()) { return false };
	return true
};

//==============================
// * need Center Cam
//==============================
BattleManager.needCenterCam = function (action) {
	if (!$gameSystem.isSideView()) { return false };
	if (action.isForAll()) { return true };
	if (action.isForRandom()) { return false };
	if (this._targets.length <= 1) { return false };
	if (action.numRepeats() > 1) { return false }
	return true
};

//==============================
// ♦ ALIAS ♦ endTurn
//==============================
const _mog_bCam_battle_manager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function () {
	_mog_bCam_battle_manager_endTurn.call(this);
	this.camera_clear();
};

//==============================
// ♦ ALIAS ♦ endAction
//==============================
const _mog_bCam_battle_manager_endAction = BattleManager.endAction;
BattleManager.endAction = function () {
	_mog_bCam_battle_manager_endAction.call(this);
	this.camera_clear();
	$gameTemp._bcam_wait[0] = 20;
};

//==============================
// ♦ ALIAS ♦ processVictory
//==============================
var _alias_mog_bcam_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function () {
	$gameTemp._battleEnd = true;
	_alias_mog_bcam_processVictory.call(this);
};

//==============================
// ♦ ALIAS ♦ processAbort
//==============================
var _alias_mog_bcam_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function () {
	$gameTemp._battleEnd = true;
	_alias_mog_bcam_processAbort.call(this);
};

//==============================
// ♦ ALIAS ♦ processDefeat
//==============================
var _alias_mog_bcam_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function () {
	$gameTemp._battleEnd = true;
	_alias_mog_bcam_processDefeat.call(this);
};

//=============================================================================
// ■■■ Spriteset Battler ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ Update Position
//==============================
var _alias_mog_bcam_sprbat_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function () {
	_alias_mog_bcam_sprbat_updatePosition.call(this);
	this.updateBattleCameraPosition();
};

//==============================
// * Update Battle Camera Pos
//==============================
Sprite_Battler.prototype.updateBattleCameraPosition = function () {
	$gameTemp._bcam_actor[0] = BattleManager.actor();
	if ($gameTemp._bcam_target && $gameTemp._bcam_target[0] === this._battler) { this.update_focus_target() };
	if ($gameTemp._bcam_target_turn && $gameTemp._bcam_target_turn[0] === this._battler) { this.update_focus_target_turn() };
	if ($gameTemp._bcam_user && $gameTemp._bcam_user[0] === this._battler) { this.update_focus_user() };
	if ($gameTemp._bcam_actor && $gameTemp._bcam_actor[0] === this._battler) { this.update_focus_actor() };
};

//==============================
// * Cam Y
//==============================
Sprite_Battler.prototype.cam_th = function () {
	if (this._mainSprite) {
		return this.y - (this._mainSprite.height / 2);
	} else {
		return this.y - (this.bitmap.height / 2);
	};
};

//==============================
// * Update Focus Actor
//==============================
Sprite_Battler.prototype.update_focus_actor = function () {
	$gameTemp._bcam_actor[1][0] = this.x;
	$gameTemp._bcam_actor[1][1] = this.cam_th();
};

//==============================
// * Update Focus Target
//==============================
Sprite_Battler.prototype.update_focus_target = function () {
	$gameTemp._bcam_target[1][0] = this.x;
	$gameTemp._bcam_target[1][1] = this.cam_th();
};

//==============================
// * Update Focus Target Turn
//==============================
Sprite_Battler.prototype.update_focus_target_turn = function () {
	$gameTemp._bcam_target_turn[1][0] = this.x;
	$gameTemp._bcam_target_turn[1][1] = this.cam_th();
};

//==============================
// * Update Focus user
//==============================
Sprite_Battler.prototype.update_focus_user = function () {
	$gameTemp._bcam_user[1][0] = this.x;
	$gameTemp._bcam_user[1][1] = this.cam_th();
};

//=============================================================================
// ■■■ Spriteset Battleback ■■■
//=============================================================================

//==============================
// ♦ OVERWRITE ♦ adjustPosition
//==============================
Sprite_Battleback.prototype.adjustPosition = function () {
	const cRangeX = $gameSystem._cam_data[1] / 80;
	const cRangeY = $gameSystem._cam_data[1] / 135;
	const marginX = 64
	const marginY = 64
	const gwidth = Graphics.width + marginX;
	const gheight = Graphics.height + marginY;
	this.width = this.bitmap.width < gwidth ? gwidth : this.bitmap.width;
	this.height = this.bitmap.height < gheight ? gheight : this.bitmap.height;
	const camWidth = this.width + (this.width * cRangeX)
	const camHeight = this.height + (this.height * cRangeY)
	this.x = -(gwidth / 4);
	this.y = -(gheight / 4);
	const ratioX = camWidth / this.bitmap.width;
	const ratioY = camHeight / this.bitmap.height;
	this.scale.x = ratioX;
	this.scale.y = ratioY;
};

//=============================================================================
// ■■■ Spriteset Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ Initialize
//==============================
var _alias_mog_bcam_sprt_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function () {
	this.battleCamSetup();
	_alias_mog_bcam_sprt_initialize.call(this);
};

//==============================
// * Battle Cam Setup
//==============================
Spriteset_Battle.prototype.battleCamSetup = function () {
	$gameTemp.clearBattleCamera();
	this._center = [(Graphics.width / 2), (Graphics.height / 2)];
	this._resCenter = [(Graphics.width - 816) / 2, (Graphics.height - 624) / 2];
	this._camera_range = $gameSystem._cam_data[1];
	this._camera_speed = $gameSystem._cam_data[2];
	lm_x = this._center[0] * this.cam_range();
	lm_y = this._center[1] * this.cam_range();
	this._cam_limit = [-lm_x, lm_x, -lm_y, lm_y];
	this._cam_XF = Moghunter.bcam_x - this._resCenter[0];
	this._cam_YF = Moghunter.bcam_y - this._resCenter[1] - 24;
	this.refreshCamWaveData();
	this.cam_center();
	this._scale_background = false;
};

//==============================
// * refreshCamWaveData
//==============================
Spriteset_Battle.prototype.refreshCamWaveData = function () {
	$gameTemp._battleCamera.needRefreshData = false;
	this._cWave = {};
	this._cWave.enabledX = $gameSystem._battleCameraData.waveX;
	this._cWave.x = 0;
	this._cWave.speedX = 0.004 * $gameSystem._battleCameraData.waveSpeedX / 100;
	this._cWave.maxRangeX = 0.4;
	this._cWave.rangeX = this._cWave.maxRangeX;
	this._cWave.maxRangeLimitX = this._cWave.maxRangeX * 100;
	this._cWave.phaseX = 0;
	this._cWave.enabledY = $gameSystem._battleCameraData.waveY;
	this._cWave.y = 0;
	this._cWave.speedY = 0.004 * $gameSystem._battleCameraData.waveSpeedY / 100;
	this._cWave.maxRangeY = 0.4;
	this._cWave.rangeY = this._cWave.maxRangeY;
	this._cWave.maxRangeLimitY = this._cWave.maxRangeY * 100;
	this._cWave.phaseY = 0;
};

//==============================
// * Cam Speed
//==============================
Spriteset_Battle.prototype.cam_speed = function () {
	return this._camera_speed;
};

//==============================
// * Cam Range
//==============================
Spriteset_Battle.prototype.cam_range = function () {
	return this._camera_range / 100;
};

//==============================
// * Cam Center
//==============================
Spriteset_Battle.prototype.cam_center = function () {
	this._cam_X = this._center[0] - this._resCenter[0];
	this._cam_Y = this._center[1] - this._resCenter[1];
};

//==============================
// * Need Center Cam
//==============================
Spriteset_Battle.prototype.needCenterCam = function () {
	if ($gameTemp._bcam_allTargets) { return true };
	if ($gameTemp._bcam_allTargets_turn) { return true };
	if ($gameTemp._battleEnd) { return true };
	return false
};

//==============================
// * Update Cam Position
//==============================
Spriteset_Battle.prototype.update_cam_position = function () {
	if (this._cWave.enabledX) { this.updateCameraWaveX() };
	if (this._cWave.enabledY) { this.updateCameraWaveY() };
	if ($gameTemp._bcam_wait[0] > 0) { $gameTemp._bcam_wait[0]-- };
	if ($gameTemp._bcam_wait[1] > 0) { $gameTemp._bcam_wait[1]-- };
	if (this.needCenterCam()) { this.cam_center(); return };
	if ($gameTemp._bcam_wait[0] == 0) { this.updateFocus() };
};

//==============================
// * Update Focus
//==============================
Spriteset_Battle.prototype.updateFocus = function () {
	this._sd = false
	if ($gameTemp._bcam_user[2] > 0) { $gameTemp._bcam_user[2] -= 1 };
	if ($gameTemp._bcam_target && $gameTemp._bcam_target[0]) {
		if (!$gameSystem.isSideView() && $gameTemp._bcam_target[0].isActor()) {
			this._cam_X = this._center[0] + this._baseSprite.x;
			this._cam_Y = this._center[1] - this._baseSprite.y;
		} else {
			this._cam_X = $gameTemp._bcam_target[1][0];
			this._cam_Y = $gameTemp._bcam_target[1][1];
		};
	} else if (this.isCamUser()) {
		if (!$gameSystem.isSideView() && $gameTemp._bcam_user[0].isActor()) {
			this.cam_center();
		} else {
			this._cam_X = $gameTemp._bcam_user[1][0];
			this._cam_Y = $gameTemp._bcam_user[1][1];
		};
	} else if (this.isCamTarget()) {
		this._cam_X = $gameTemp._bcam_target_turn[1][0];
		this._cam_Y = $gameTemp._bcam_target_turn[1][1];
	} else if (this.isCamActor()) {
		this._cam_X = $gameTemp._bcam_actor[1][0];
		this._cam_Y = $gameTemp._bcam_actor[1][1];
	} else {
		this.cam_center();
	};
};

//==============================
// * Is Cam User
//==============================
Spriteset_Battle.prototype.isCamUser = function () {
	if (!$gameTemp._bcam_user) { return false };
	if (!$gameTemp._bcam_user[0]) { return false };
	if ($gameTemp._bcam_user[2] === 0) { return false };
	return true;
};

//==============================
// * Is Cam Target
//==============================
Spriteset_Battle.prototype.isCamTarget = function () {
	if (!$gameTemp._bcam_target_turn) { return false };
	if (!$gameTemp._bcam_target_turn[0]) { return false };
	if (!$gameSystem.isSideView() && $gameTemp._bcam_target_turn[0].isActor()) { return false };
	return true;
};

//==============================
// * Is Cam Actor
//==============================
Spriteset_Battle.prototype.isCamActor = function () {
	if (!$gameSystem.isSideView()) { return false };
	if (!$gameTemp._bcam_actor) { return false };
	if (!$gameTemp._bcam_actor[0]) { return false };
	return true;
};

//==============================
// * Update Battle Camera
//==============================
Spriteset_Battle.prototype.update_battle_camera = function () {
	this.update_cam_position();
	var nx = this._center[0] - this._cam_X + this._cam_XF + this._cWave.x;
	var ny = this._center[1] - this._cam_Y + this._cam_YF + this._cWave.y;
	if (this._cWave.enabledX) {
		if (nx >= this._cam_limit[1] - this._cWave.maxRangeLimitX + this._cWave.x) {
			nx = this._cam_limit[1] - this._cWave.maxRangeLimitX + this._cWave.x
		} else if (nx <= this._cam_limit[0] + this._cWave.maxRangeLimitX + this._cWave.x) {
			nx = this._cam_limit[0] + this._cWave.maxRangeLimitX + this._cWave.x
		};
	};
	if (this._cWave.enabledY) {
		if (ny >= this._cam_limit[3] - this._cWave.maxRangeLimitY + this._cWave.y) {
			ny = this._cam_limit[3] - this._cWave.maxRangeLimitY + this._cWave.y;
		} else if (ny <= this._cam_limit[2] + this._cWave.maxRangeLimitY + this._cWave.y) {
			ny = this._cam_limit[2] + this._cWave.maxRangeLimitY + this._cWave.y
		};
	};
	this._baseSprite.x = Math.floor(this.cam_move_to(this._baseSprite.x, nx, this.cam_speed(), 0));
	this._baseSprite.y = Math.floor(this.cam_move_to(this._baseSprite.y, ny, this.cam_speed(), 1));
	$gameTemp._bcamPos = [this._baseSprite.x, this._baseSprite.y];
	$gameTemp._battleCamera.waveX = this._cWave.x;
	$gameTemp._battleCamera.waveY = this._cWave.y;
};

//==============================
// * updateBCamMode
//==============================
Spriteset_Battle.prototype.updateBbCamMode = function (sprite, index) {
	if (this._bbData[index] && this._bbData[index][5]) {
		var rate = this._bbData[index][5];
	} else {
		var rate = 0;
	};
	sprite.x = -(this._baseSprite.x * (rate / 100)) + this._center[0];
	sprite.y = -(this._baseSprite.y * (rate / 100)) + this._center[1];
};

//==============================
// * Cam Move To
//==============================
Spriteset_Battle.prototype.cam_move_to = function (value, real_value, speed, type) {
	if (value == real_value) { return value };
	var dnspeed = 5 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value };
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	if (type === 0) {
		return Math.min(Math.max(value, this._cam_limit[0]), this._cam_limit[1]);
	} else { return Math.min(Math.max(value, this._cam_limit[2]), this._cam_limit[3]) };
};

//==============================
// * update Camera Wave X
//==============================
Spriteset_Battle.prototype.updateCameraWaveX = function () {
	if (this._cWave.phaseX == 0) {
		this._cWave.rangeX -= this._cWave.speedX;
		if (this._cWave.rangeX <= -this._cWave.maxRangeX) {
			this._cWave.rangeX = -this._cWave.maxRangeX
			this._cWave.phaseX = 1
		};
	} else {
		this._cWave.rangeX += this._cWave.speedX;
		if (this._cWave.rangeX >= this._cWave.maxRangeX) {
			this._cWave.rangeX = this._cWave.maxRangeX;
			this._cWave.phaseX = 0
		};
	};
	this._cWave.x -= this._cWave.rangeX;
};

//==============================
// * update Camera Wave Y
//==============================
Spriteset_Battle.prototype.updateCameraWaveY = function () {
	if (this._cWave.phaseY == 0) {
		this._cWave.rangeY -= this._cWave.speedY;
		if (this._cWave.rangeY <= -this._cWave.maxRangeY) {
			this._cWave.rangeY = -this._cWave.maxRangeY
			this._cWave.phaseY = 1
		};
	} else {
		this._cWave.rangeY += this._cWave.speedY;
		if (this._cWave.rangeY >= this._cWave.maxRangeY) {
			this._cWave.rangeY = this._cWave.maxRangeY;
			this._cWave.phaseY = 0;
		};
	};
	this._cWave.y -= this._cWave.rangeY;
};

//==============================
// * Update Bcam Misc
//==============================
Spriteset_Battle.prototype.updateBcamMisc = function () {
	const cx = $gameTemp._bcamPos[0];
	const cy = $gameTemp._bcamPos[1];
	if (this._sprtField1) {
		this._sprtField1.x = cx;
		this._sprtField1.y = cy;
	};
	if (this._sprtField2) {
		this._sprtField2.x = cx;
		this._sprtField2.y = cy;
	};
	if (Imported.MOG_HPGauge) {
		this._hpField.x = cx;
		this._hpField.y = cy;
	};
	if ($gameTemp._battleCamera.needRefreshData) { this.refreshCamWaveData() };
};

//==============================
// ♦ ALIAS ♦ Update
//==============================
var _alias_mog_bcam_sprt_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function () {
	_alias_mog_bcam_sprt_update.call(this);
	if ($gameSystem._cam_data[0] && this._cam_limit) { this.update_battle_camera() };
	this.updateBcamMisc();
};
