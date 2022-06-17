//=============================================================================
// MOG_EmergeMotion.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (v1.0) Adiciona a animação dos inimigos emergindo.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param Initial Wait
 * @desc Tempo inicial para ativar o movimento.
 * @type number
 * @default 30
 * @min 5
 *
 * @param Wait for the Next
 * @desc Tempo para ativar o movimento entre um battler e outro.
 * @type number
 * @default 20
 * @min 5
 *
 * @help  
 * =============================================================================
 * ♦♦♦ MOG - Emerge Motion ♦♦♦ +++
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/11
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona a animação dos inimigos emergindo.
 *
 * =============================================================================
 * NOTETAGS
 * =============================================================================
 * Coloque o comentário abaixo para ativar os movimentos de aparição.
 *
 * Emerge Motion: X
 *
 * 0 - Slide (Right)
 * 1 - Slide (Left)
 * 2 - Slide (Down)
 * 3 - Slide (Up)
 * 4 - Zoom  
 * 5 - Teleport
 * 6 - Emerge (Ground)
 * 7 - Dancing (Left/Right/Jump)
 * 8 - Bouncing
 * 9 - Dramatic (from Sky)
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) 敵の出現演出をアレンジします。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_EmergeMotion.js
 *
 * @param Initial Wait
 * @text 戦闘開始までの時間
 * @type number
 * @default 30
 * @min 5
 * @max 9007
 *
 * @param Wait for the Next
 * @text バトラー間の待ち時間
 * @type number
 * @default 20
 * @min 5
 * @max 9007
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * ♦♦♦ MOG - Emerge Motion ♦♦♦ +++
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/04/11
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * 敵の出現演出をアレンジします。
 *
 * ===========================================================================
 * メモタグ
 * ===========================================================================
 * 敵の出現演出を下記のメモタグで指定してください。
 * 敵キャラのメモ欄に入れてください。
 *
 * Emerge Motion : X
 * ※「:」前後の半角スペース必須
 *
 * X:モーションID
 *
 * 0 - スライド(右)
 * 1 - スライド(左)
 * 2 - スライド(下)
 * 3 - スライド(上)
 * 4 - ズーム
 * 5 - テレポート
 * 6 - 湧き出す(地面)
 * 7 - ダンス(左/右/ジャンプ)
 * 8 - バウンド
 * 9 - ドラマティック(空から)
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_EmergeMotion = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_EmergeMotion');
Moghunter.emot_initialWait = Number(Moghunter.parameters['Initial Wait'] || 30);
Moghunter.emot_next = Number(Moghunter.parameters['Wait for the Next'] || 20);

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦ Initialize
//==============================
var _mog_eMot_gTemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
	_mog_eMot_gTemp_initialize.call(this);
	this._emerging = [false, 30, false];
	this._emergingInt = 0;
};

//==============================
// * need skip Battle Process
//==============================
Game_Temp.prototype.needSkipBattleProcessEM = function () {
	if ($gameTemp._emerging[0]) { return true };
	if ($gameTemp._emerging[1] > 0) { return true };
	if ($gameTemp._emergingInt > 0) { return true };
	return false;
};


//=============================================================================
// ■■■ Game_Battler ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦ Init Members
//==============================
var _mog_eMot_gbat_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function () {
	_mog_eMot_gbat_initMembers.call(this);
	this._emergeMotion = {};
	this._emergeMotion.enabled = false;
	this._emergeMotion.mode = 0;
	this._emergeMotion.needGetData = false;
	this._emergeMotion.initWait = 0;
	this._emergeMotion.aniID = 0;
	this._emergeMotion.frameCount = 0;
	this._emergeMotion.anime1 = 0;
	this._emergeMotion.anime2 = 0;
	this._emergeMotion.anime3 = 0;
	this._emergeMotion.anime4 = 0;
	this._emergeMotion.anime5 = 0;
	this._emergeMotion.x = 0;
	this._emergeMotion.y = 0;
	this._emergeMotion.scaleX = 0;
	this._emergeMotion.scaleY = 0;
	this._emergeMotion.rotation = 0;
	this._emergeMotion.opacity = 0;
	this._emergeMotion.width = 0;
	this._emergeMotion.height = 0;
	this._emerge = [false, 0, 0, 0, -1, 0, 30, 0, 0, 0, 0, 0, 0, false, 0, 0, 0, 0, 0, 0];
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function () {
	if (this.isEnemy()) { return this.enemy().note.split(/[\r\n]+/) };
	if (this.isActor()) { return this.actor().note.split(/[\r\n]+/) };
};

//=============================================================================
// ■■■ Game_Enemy ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦ Setup
//==============================
var _mog_eMot_gEnmy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function (enemyId, x, y) {
	_mog_eMot_gEnmy_setup.call(this, enemyId, x, y);
	this.emotSetup();
};

//==============================
// * emot Setup
//==============================
Game_Enemy.prototype.emotSetup = function () {
	this.notetags().forEach(function (note) {
		var note_data = note.split(' : ')
		if (note_data[0].toLowerCase() == "emerge motion") {
			this._emergeMotion.enabled = true;
			this._emergeMotion.mode = Math.min(Math.max(Number(note_data[1]), 0), 9);
		};
	}, this);
};

//=============================================================================
// ♦ ALIAS ♦ Scene Battle
//=============================================================================	
var _mog_em_sBat_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function () {
	$gameTemp._emerging = [true, 30];
	$gameTemp._emergingInt = 10;
	_mog_em_sBat_initialize.call(this);
};

//==============================
// ♦ ALIAS ♦ update Battle Process
//==============================
var _mog_eMot_sBat_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function () {
	if ($gameTemp.needSkipBattleProcessEM()) {
		$gameTemp._emerging[1]--;
		if ($gameTemp._emergingInt > 0) { $gameTemp._emergingInt-- };
		return;
	};
	_mog_eMot_sBat_updateBattleProcess.call(this);
};

//=============================================================================
// ■■■ Spriteset Battle ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦ create Enemies
//==============================
var _mog_eMot_sprEnemy_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function () {
	_mog_eMot_sprEnemy_createEnemies.call(this);
	for (var i = 0; i < this._enemySprites.length; i++) {
		var sprtEnemy = this._enemySprites[i];
		sprtEnemy.setIndexEm(i);
	};
};

//=============================================================================
// ■■■ Sprite Enemy ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦ init Members
//==============================
var _mog_eMot_sprtEnemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function () {
	_mog_eMot_sprtEnemy_initMembers.call(this);
	this._indexEM = 0;
};

//==============================
// * init Members
//==============================
Sprite_Enemy.prototype.setIndexEm = function (index) {
	this._indexEM = index;
	this._battler._emergeMotion.initWait = Number(Moghunter.emot_initialWait) + this._indexEM * Number(Moghunter.emot_next);
};

//==============================
// * set Battler
//==============================
var _mog_eMot_gbar_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function (battler) {
	_mog_eMot_gbar_setBattler.call(this, battler);
	$gameTemp._emerging = [false, false, false];
	if (this._battler && this._battler._emergeMotion.enabled) { this.setupEMot() };
};

//==============================
// * set Mot
//==============================
Sprite_Enemy.prototype.setupEMot = function () {
	this._battler._emergeMotion.x = this._battler.screenX() + this._offsetX // X org;
	this._battler._emergeMotion.y = this._battler.screenY() + this._offsetY // Y org;
	this._battler._emergeMotion.initWait = Imported.MOG_BattleTransitions ? 2 + Math.randomInt(20) : 30 + Math.randomInt(20); // Initial Wait
	this._battler._emergeMotion.needGetData = false; //Data Check
	this._battler._emergeMotion.scaleX = 1 // Scale X
	this._battler._emergeMotion.scaleY = 1 // Scale Y
	this._battler._emerge[9] = 1.00 / this._battler._emerge[6] // Speed
	this._battler._emergeMotion.width = 0; // cw
	this._battler._emergeMotion.height = 0; // ch
	this._battler._emergeMotion.frameCount = 0; // frame Count

	this._battler._emergeMotion.anime1 = 0; // Animation Speed
	this._battler._emergeMotion.anime2 = 0; // Animation Phase 1
	this._battler._emergeMotion.anime3 = 0; // Animation Phase 2
	this._battler._emergeMotion.anime4 = 0; // Animation Phase 3
	this._battler._emergeMotion.opacity = 255; // Opacity
	this.x = this._battler._emergeMotion.x;
	this.y = this._battler._emergeMotion.y;
};

//==============================
// * set Battler Motion Em
//==============================
Sprite_Enemy.prototype.setBattlerMotionEm = function () {
	this._battler._emergeMotion.x = this._battler.screenX() + this._offsetX + this._battler.motion_Xaxis();
	this._battler._emergeMotion.y = this._battler.screenY() + this._offsetY + this._battler.motion_Yaxis();
};


//==============================
// * emgMotion
//==============================
Sprite_Enemy.prototype.emgMotion = function () {
	return this._battler._emergeMotion.mode
};

//==============================
// * set Mot
//==============================
Sprite_Enemy.prototype.setupEmotType = function () {
	var cw = this.bitmap ? this.bitmap.width : 600;
	var ch = this.bitmap ? this.bitmap.height : 600;
	this._battler._emergeMotion.scaleX = this.scale.x;
	this._battler._emergeMotion.scaleY = this.scale.y;
	this._battler._emergeMotion.width = cw;
	this._battler._emergeMotion.height = ch;
	this._battler._emergeMotion.frameCount = 0;
	this._battler._emergeMotion.opacity = this.opacity;
	this._battler._emerge[6] = 15;
	if (this._battler._emergeMotion.mode === 0) {
		this.x = -cw;
		this.y = this._battler._emergeMotion.y;
	} else if (this.emgMotion() == 1) {
		this.x = Graphics.boxWidth + cw;
		this.y = this._battler._emergeMotion.y;
	} else if (this.emgMotion() == 2) {
		this._battler._emerge[6] = 20;
		this.x = this._battler._emergeMotion.x;
		this.y = -ch;
	} else if (this.emgMotion() == 3) {
		this._battler._emerge[6] = 20;
		this.x = this._battler._emergeMotion.x;
		this.y = Graphics.boxHeight + ch;
	} else if (this.emgMotion() == 4) {
		this._battler._emerge[6] = 25;
		this.x = this._battler._emergeMotion.x;
		this.y = this._battler._emergeMotion.y;
		this.scale.x = 0;
		this.scale.y = 0;
	} else if (this.emgMotion() == 5) {
		this._battler._emerge[6] = 30;
		this.x = this._battler._emergeMotion.x;
		this.y = this._battler._emergeMotion.y;
		this.scale.x = 0;
		this.scale.y = 2;
	} else if (this.emgMotion() == 6) {
		this._battler._emerge[6] = 50;
		this.x = this._battler._emergeMotion.x;
		this.y = this._battler._emergeMotion.y;
		this._battler._emergeMotion.frameCount = ch;
		this.setFrame(0, 0, 0, ch)
		this._battler._emerge[9] = ch / this._battler._emerge[6];
	} else if (this.emgMotion() == 7) {
		this.x = this._battler._emergeMotion.x;
		this.y = this._battler._emergeMotion.y;
		this._battler._emerge[13] = 90;
		this._battler._emergeMotion.anime1 = 20;
		this._battler._emergeMotion.anime4 = this._battler._emergeMotion.y;
		this.opacity = 0;
	} else if (this.emgMotion() == 8) {
		this.x = this._battler._emergeMotion.x;
		this.y = -ch;
		this._battler._emerge[13] = true;
		this._battler._emerge[6] = 6;
	} else if (this.emgMotion() == 9) {
		this.x = this._battler._emergeMotion.x;
		this.y = -ch;
		this._battler._emerge[6] = 700;
	} else if (this.emgMotion() == 10) {
		this.prepareEmgMotionAnimation();
	};
	if (this._battler._emergeMotion.mode != 6) {
		this._battler._emerge[9] = 1.00 / this._battler._emerge[6];
	};
	this._battler._emergeMotion.needGetData = this.bitmap ? true : false;
	$gameTemp._emerging[0] = [true, 10];
	this.visible = false;
};

//==============================
// * update Bouncing Emot
//==============================
Sprite_Enemy.prototype.prepareEmgMotionAnimation = function () {
	this.x = this._battler._emergeMotion.x;
	this.y = this._battler._emergeMotion.y;
	var aniId = this._battler._emerge[19];
	var animation = $dataAnimations[aniId];
	if (animation) {
		this._battler._emergeMotion.anime1 = 0
		const timings = animation.soundTimings.concat(animation.flashTimings);
		for (const timing of timings) {
			if (timing.frame > this._battler._emergeMotion.anime1) {
				this._battler._emergeMotion.anime1 = timing.frame;
			}
		}
		this._battler._emerge[13] = true;
		this._battler._emergeMotion.anime1 *= 3;
		this.setFrame(0, 0, 0, 0);
	} else {
		this._battler._emerge[13] = false;
	};
};

//==============================
// * update Bouncing Emot
//==============================
Sprite_Enemy.prototype.updateBouncingEmot = function () {
	if (this.y < this._battler._emergeMotion.y) {
		this.y += 25;
		if (this.y >= this._battler._emergeMotion.y) {
			this.y = this._battler._emergeMotion.y;
		};
	};
	if (this._battler._emergeMotion.anime1 === 0) {
		if (this.y === this._battler._emergeMotion.y) {
			this._battler._emergeMotion.anime1 = 1;
		};
	} else if (this._battler._emergeMotion.anime1 === 1) {
		if (this._battler._emergeMotion.anime2 === 0) {
			if (this.scale.x < this._battler._emergeMotion.scaleX + 0.30) {
				this.scale.x += 0.03;
				this.scale.y -= 0.03;
				if (this.scale.x >= this._battler._emergeMotion.scaleX + 0.30) {
					this.scale.x = this._battler._emergeMotion.scaleX + 0.30;
					this.scale.y = this._battler._emergeMotion.scaleX - 0.30;
					this._battler._emergeMotion.anime2 = 1;
				};
			};
		} else {
			if (this.scale.x > this._battler._emergeMotion.scaleX) {
				this.scale.x -= 0.03;
				this.scale.y += 0.03;
				if (this.scale.x <= this._battler._emergeMotion.scaleX) {
					this.scale.x = this._battler._emergeMotion.scaleX;
					this.scale.y = this._battler._emergeMotion.scaleY;
					this._battler._emerge[13] = false;
				};
			};
		};
	};
};

//==============================
// * need To Get Data
//==============================
Sprite_Enemy.prototype.needToGetData = function () {
	if (this._battler._emergeMotion.needGetData) { return false };
	if (!this.bitmap) { return false };
	if (!this.bitmap.isReady()) { return false };
	return true;
};

//==============================
// * update Position Emot
//==============================
Sprite_Enemy.prototype.updatePositionEmot = function () {
	this.x = this.moveEmot(this.x, this._battler._emergeMotion.x);
	this.y = this.moveEmot(this.y, this._battler._emergeMotion.y);
};

//==============================
// * update Scale Emot
//==============================
Sprite_Enemy.prototype.updateScaleEmot = function () {
	if (this._battler._emergeMotion.mode === 8) { return };
	var zs = this._battler._emerge[9];
	if (!zs) { return }
	if (this.scale.x != this._battler._emergeMotion.scaleX) {
		if (this.scale.x < this._battler._emergeMotion.scaleX) {
			this.scale.x += zs
			if (this.scale.x >= this._battler._emergeMotion.scaleX) {
				this.scale.x = this._battler._emergeMotion.scaleX;
			};
		} else if (this.scale.x > this._battler._emergeMotion.scaleX) {
			this.scale.x -= zs
			if (this.scale.x <= this._battler._emergeMotion.scaleX) {
				this.scale.x = this._battler._emergeMotion.scaleX;
			};
		};
	};
	if (this.scale.y != this._battler._emergeMotion.scaleY) {
		if (this.scale.y < this._battler._emergeMotion.scaleY) {
			this.scale.y += zs
			if (this.scale.y >= this._battler._emergeMotion.scaleY) {
				this.scale.y = this._battler._emergeMotion.scaleY;
			};
		} else if (this.scale.y > this._battler._emergeMotion.scaleY) {
			this.scale.y -= zs
			if (this.scale.y <= this._battler._emergeMotion.scaleY) {
				this.scale.y = this._battler._emergeMotion.scaleY;
			};
		};
	};
};

//==============================
// * update Frame EM
//==============================
Sprite_Enemy.prototype.updateFrameEm = function () {
	var cw = this._battler._emergeMotion.width;
	var ch = this._battler._emergeMotion.height;
	var ch2 = this._battler._emergeMotion.height - this._battler._emergeMotion.frameCount;
	this.setFrame(0, 0, cw, ch2)
	if (this._battler._emergeMotion.frameCount > 0) {
		this._battler._emergeMotion.frameCount -= this._battler._emerge[9];
		if (this._battler._emergeMotion.frameCount <= 0) {
			this.setFrame(0, 0, cw, ch)
		};
	};
};

//==============================
// * update Swing EM
//==============================
Sprite_Enemy.prototype.updateSwingEm = function () {
	if (this._battler._emergeMotion.anime2 === 0) {
		this._battler._emergeMotion.anime1++;
		if (this._battler._emergeMotion.anime1 < 6) { return };
		this._battler._emergeMotion.anime1 = 0;
		this.scale.x = this.scale.x > 0 ? -this._battler._emergeMotion.scaleX : this._battler._emergeMotion.scaleX;
		this._battler._emergeMotion.anime3++;
		if (this._battler._emergeMotion.anime3 > 5) {
			this._battler._emergeMotion.anime3 = 0;
			this._battler._emergeMotion.anime2 = 1;
			this._battler._emergeMotion.y -= 100;
		};
	} else if (this._battler._emergeMotion.anime2 === 1) {
		this._battler._emergeMotion.anime1++;
		if (this._battler._emergeMotion.anime1 < 20) { return };
		this._battler._emergeMotion.anime1 = 0;
		if (this._battler._emergeMotion.anime3 === 0) {
			this._battler._emergeMotion.y += 100;
			this._battler._emergeMotion.anime3 = 1;
		} else if (this._battler._emergeMotion.anime3 === 1) {
			this._battler._emergeMotion.y = this._battler._emergeMotion.anime4;
			this._battler._emergeMotion.anime3 = 2;
			this._battler._emerge[13] = false;
			this.y = this._battler._emergeMotion.y;
		};
	};
};

//==============================
// * update Animation Emot
//==============================
Sprite_Enemy.prototype.updateAnimationEmot = function () {
	this._battler._emergeMotion.anime1--;
	if (this._battler._emergeMotion.anime1 < 20) {
		this.setFrame(0, 0, this._battler._emergeMotion.width, this._battler._emergeMotion.height);
	};
	if (this._battler._emergeMotion.anime1 > 0) { return };
	this._battler._emerge[13] = false;
};

//==============================
// * update Em Motion
//==============================
Sprite_Enemy.prototype.updateEmMotion = function () {
	$gameTemp._emerging[0] = false;
	if (this.needToGetData()) { this.setupEmotType() };
	if (Imported.MOG_BattleTransitions && $gameSystem._trefctData[0]) {
		this.visible = false;
		return
	}
	if (this._battler._emergeMotion.initWait > 0) {
		this._battler._emergeMotion.initWait--;
		if (this._battler._emergeMotion.initWait === 0 && this._battler._emergeMotion.mode === 10 && this._battler._emerge[13]) {
			$gameTemp.requestAnimation([this], this._battler._emerge[19], true)
		}
		this.visible = false;
		return;
	}
	this.visible = true;
	if (this._battler._emergeMotion.mode === 8) {
		this.updateBouncingEmot();
	} else {
		this.updatePositionEmot()
	};
	this.updateOpacityEmot();
	if (this._battler._emergeMotion.mode === 10) { this.updateAnimationEmot() };
	if (this._battler._emergeMotion.mode === 6) { this.updateFrameEm() };
	if (this._battler._emergeMotion.mode === 7) {
		this.updateSwingEm()
	} else {
		this.updateScaleEmot();
	};
	if (this.isEmotEmerging()) {
		$gameTemp._emerging[0] = true
	} else {
		this._battler._emergeMotion.enabled = false;
		this.opacity = this._battler._emergeMotion.opacity;
		this.revertToNormal();
	};
	if (this._battler._emerge[6] <= 70) { $gameTemp._emerging[0] = false };
	$gameTemp._emerging[1] = 5;
};


//==============================
// * update Opacity Emot
//==============================
Sprite_Enemy.prototype.updateOpacityEmot = function () {
	if (this.opacity < this._battler._emergeMotion.opacity) {
		this.opacity += 5;
		if (this.opacity >= this._battler._emergeMotion.opacity) {
			this.opacity = this._battler._emergeMotion.opacity;
		};
	};
};

//==============================
// * is Emot Done
//==============================
Sprite_Enemy.prototype.isEmotEmerging = function () {
	if (this.x != this._battler._emergeMotion.x) { return true };
	if (this.y != this._battler._emergeMotion.y) { return true };
	if (this.scale.x != this._battler._emergeMotion.scaleX) { return true };
	if (this.scale.y != this._battler._emergeMotion.scaleY) { return true };
	if (this._battler._emergeMotion.frameCount > 0) { return true };
	if (this._battler._emerge[13]) { return true };
	return false;
};

//==============================
// * Move Emot
//==============================
Sprite_Enemy.prototype.moveEmot = function (value, real_value) {
	if (value == real_value) { return value };
	var dnspeed = 1 + (Math.abs(value - real_value) / this._battler._emerge[6]);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value }
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	return Math.floor(value);
};

//==============================
// * update Frame
//==============================
Sprite_Enemy.prototype.needSkipFrameEM = function () {
	if (!this._battler) { return false };
	if (!this._battler._emergeMotion.enabled) { return false };
	if (this._battler._emergeMotion.mode === 6) { return true };
	if (this._battler._emergeMotion.mode === 10) { return true };
	return false;
};

//==============================
// ♦ ALIAS ♦ update Frame
//==============================
var _mog_eMot_sprtEnemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
Sprite_Enemy.prototype.updateFrame = function () {
	if (this.needSkipFrameEM()) { return }
	_mog_eMot_sprtEnemy_updateFrame.call(this);
};

//==============================
// * need Update Em
//==============================
Sprite_Enemy.prototype.needUpdateEm = function () {
	if (!this._battler) { return false };
	if (!this._battler._emergeMotion.enabled) { return false };
	if (this._battler.isHidden()) { return false };
	return true;
};

//==============================
// ♦ ALIAS ♦ update Position
//==============================
var _mog_eMot_sprtEnemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
Sprite_Enemy.prototype.updatePosition = function () {
	if (this.needUpdateEm()) {
		this.updateEmMotion();
		return;
	};
	_mog_eMot_sprtEnemy_updatePosition.call(this);
};
