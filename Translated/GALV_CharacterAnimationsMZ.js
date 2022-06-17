//-----------------------------------------------------------------------------
//  Galv's Character Animations MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_CharacterAnimations.js
//-----------------------------------------------------------------------------
//  2021-05-25 - Version 1.3 - fixed a bug when changing pages on event with
//                             <charanims> note tag.
//  2020-10-27 - Version 1.2 - added option to disable vehicle animation charactersets
//  2020-09-10 - Version 1.1 - fixed issue with idle common event activation
//                             timing. Made it reset when events start. - Thought this was fixed but idletime still counts during events so can happen after event!
//  2020-09-01 - Version 1.0 - release
//-----------------------------------------------------------------------------
//  Terms can be found at:
//  galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_CharacterAnimations = true;

var Galv = Galv || {};        // Galv's main object
Galv.CA = Galv.CA || {};      // This plugin object
Galv.CA.pluginName = "GALV_CharacterAnimationsMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.3) Make the player and follower characters use different
 * graphics for idle, walk and run. View HELP for more info.
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param useJumpGraphic
 * @text Use Jump Graphic
 * @type boolean
 * @default true
 * @desc true or false. If true, when jumping, characters will use 4th character slot in their character sheet
 *
 * @param vehicles
 * @text Vehicle Charactersets
 * @type boolean
 * @default false
 * @desc true or false. If true, vehicles will need their own characterset with idle/walk/run. false they use default.
 *
 * @param commonEventId
 * @text Common Event ID
 * @type number
 * @default 0
 * @desc The common event ID that runs when the idle time expires
 *
 * @param commonEventTime
 * @text Common Event Time
 * @type number
 * @default 0
 * @desc Amount of frames the player is idle until above common event is activated
 * 
 * @param repeatCommonEvent
 * @text Repeat Common Event
 * @type boolean
 * @default true
 * @desc true or false. If true, the common event timer and event id above are repeated if player stays idle
 *
 *
 * @command animOn
 * @text Player Animation On
 * @desc Turns the player animation movement on.
 *
 * @command animOff
 * @text Player Animation Off
 * @desc Turns the player animation movement off (needed if you want to change your player graphic manually).
 *
 * @help
 *   Galv's Character Animations
 * ----------------------------------------------------------------------------
 * To use this script, you will need a character spritesheet for each of your
 * actors that will be in the party (the full 8 character sheet). While on
 * the map, the characters will change their appearance within their sheets.
 * While not moving (idle) they will use the first character. While walking,
 * they will use the second character. And while running, they will use the
 * third character.
 * If you have "Use Jump Graphic" set to true, they will use the forth
 * character as the jump graphic. The jumping graphic will use each frame in
 * a different way.
 * Left = start of jump, mid = middle of jump, right = end of jump
 * So the longer your jump, the longer each frame plays until landing.
 *
 * While this is happening, the player's step animation is active (meaning
 * while stopped, the idle pose will be stepping). This is so you can make
 * movement in your idle poses.
 *
 * The settings in the plugin allow you to run a common event after the player
 * has been idle for a certain amount of frames. (60 frames per second).
 *
 * The plugin command below can be used to turn functionality on and off.
 * (For Actors Only)
 *
 * ----------------------------------------------------------------------------
 *    PLUGIN COMMANDS
 * ----------------------------------------------------------------------------
 * 
 *    Player Animation On     // Enable the character animations for the player
 *    Player Animation OF     // Disable player animations if needed
 *
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *    EVENTS
 * ----------------------------------------------------------------------------
 *
 * Event functionality is now also possible for any event with the note tag:
 * 
 *     <charAnims>
 *
 * Events will use idle, walk and jump automatically but as they do not have
 * a way to dash/run by default, you need to use in a move route the script:
 *
 *     this._isDashing = status;   // status can be true or false
 *
 * This will make it when they move they will use the dashing pose or walking
 * id turned on or off respectively;
 *
 * You can temporarily disable an event's character animation functionality
 * in a script or move route using:
 *
 *     this.disableCharAnims = status; // true to disable, false to re-enable
 *
 * NOTE: When exiting/re-entering the map or changing scenes, this will
 * revert to it's original state. Only use for special event motions for
 * example in cutscenes for events that have charAnims on.
 *
 *
 * For events, you can set which poses are used for idle, walk, dash, jump by
 * using another note tag (the first is still required):
 *
 *     <charAnimSetup:i,w,d,j>    // i = idle index (0 for first character)
 *                                // w = walk index
 *                                // d = dash index
 *                                // j = jump index
 *
 * ----------------------------------------------------------------------------
 * TIP: Make sure your actors are set to the first character (idle) position
 * in the database as they will revert to the position you choose whenever you
 * transfer to a new map.
 * ----------------------------------------------------------------------------
 */


//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

Galv.CA.ceventId = Number(PluginManager.parameters(Galv.CA.pluginName)["commonEventId"]);
Galv.CA.ceventTime = Number(PluginManager.parameters(Galv.CA.pluginName)["commonEventTime"]);
Galv.CA.ceventRepeat = PluginManager.parameters(Galv.CA.pluginName)["repeatCommonEvent"] == 'true';
Galv.CA.useJump = PluginManager.parameters(Galv.CA.pluginName)["useJumpGraphic"] == 'true';
Galv.CA.vehicles = PluginManager.parameters(Galv.CA.pluginName)["vehicles"] == 'true';

	

// PLUGIN FUNCTIONS
//-----------------------------------------------------------------------------

PluginManager.registerCommand(Galv.CA.pluginName, "animOn", args => {
    Galv.CA.animStatus(true);
});

PluginManager.registerCommand(Galv.CA.pluginName, "animOff", args => {
    Galv.CA.animStatus(false);
});

Galv.CA.animStatus = function(status) {
	$gamePlayer.disableCharAnims = !status;
	$gamePlayer._stepAnime = status;
	$gamePlayer.followers()._data.forEach(function(actor) {
			actor.disableCharAnims = !status;
			actor._stepAnime = status;
		}
	);
}


// GAME_CHARACTER
//-----------------------------------------------------------------------------

Galv.CA.Game_Character_initMembers = Game_Character.prototype.initMembers;
Game_Character.prototype.initMembers = function() {
	Galv.CA.Game_Character_initMembers.call(this);
	this.idleTime = 0;
	this._currentAnimIndex = 0;
	this._charAnimIndex = [0,1,2,3];  // [idle, walk, run, jump
};

Galv.CA.Game_Character_update = Game_Character.prototype.update;
Game_Character.prototype.update = function(sceneActive) {
	Galv.CA.Game_Character_update.call(this,sceneActive);
	if (!this.disableCharAnims) this.updateCharAnims();
};

if (Galv.CA.useJump) {
	Galv.CA.Game_Character_jump = Game_Character.prototype.jump;
	Game_Character.prototype.jump = function(xPlus, yPlus) {
		Galv.CA.Game_Character_jump.call(this, xPlus, yPlus);
		this._jumpValues = [this._jumpCount * 0.3, this._jumpCount * 0.7];
		this._stopCount = 0;
		this._pattern = 0;
	};
	
	// update with jump
	Game_Character.prototype.updateCharAnims = function() {
		if (this.isJumping()) {
			this.charAnimJump();
		} else if (this.isMoving()) {
			this.charAnimMove();
		} else {
			this.charAnimCheckIdle();
		};
	};
} else {
	// update without jump
	Game_Character.prototype.updateCharAnims = function() {
		if (this.isMoving()) {
			this.charAnimMove();
		} else {
			this.charAnimCheckIdle();
		};
	};
}; // end if Galv.CA.useJump

Game_Character.prototype.charAnimJump = function() {
	this._stopCount = 0;
	if (this._jumpCount > this._jumpValues[1]) { // start of jump
		this._pattern = 0;	
	} else if (!this._jumpCount || this._jumpCount < this._jumpValues[0]) { // end of jump
		this._pattern = 2;
	} else {
		this._pattern = 1;	
	};

	this.setAnimIndex(3);
	this.idleTime = 0;
};

Game_Character.prototype.charAnimMove = function() {
	if (this.isDashing()) {
		this.setAnimIndex(2);
	} else {
		this.setAnimIndex(1);
	};
	this.idleTime = 0;
};

Game_Character.prototype.charAnimCheckIdle = function() {
	this.idleTime += 1;
	if (this.idleTime === 5) this.charAnimIdle();
};

Game_Character.prototype.charAnimIdle = function() {
	this._stepAnime = true;
	this.setAnimIndex(0);
};

Game_Character.prototype.setAnimIndex = function(ind) {
	ind = this._charAnimIndex[ind];
	if (this._currentAnimIndex != ind) {
		this._pattern = 0;
		this._animationCount = 0;
		this._currentAnimIndex = ind;
	};
	this._characterIndex = ind;
};

if (!Galv.CA.vehicles) {
	Game_Vehicle.prototype.updateCharAnims = function() {};
}; // end if Galv.CA.vehicles


// GAME_PLAYER
//-----------------------------------------------------------------------------

Game_Player.prototype.charAnimCheckIdle = function() {
	Game_Character.prototype.charAnimCheckIdle.call(this);
	if (this.idleTime === Galv.CA.ceventTime) this.charAnimCevent();
};

Game_Player.prototype.charAnimCevent = function() {
	if ($gameMap._interpreter.isRunning()) return this.idleTime = 0;
	$gameTemp.reserveCommonEvent(Galv.CA.ceventId);
	if (Galv.CA.ceventRepeat) return this.idleTime = 0;
};

Game_Player.prototype.setAnimIndex = function(ind) {
	ind = this._charAnimIndex[ind];	
	if (this._currentAnimIndex != ind) {
		this._pattern = 0;
		this._animationCount = 0;
		this.followers()._data.forEach(function(actor) {
				actor._pattern = 0;
				actor._animationCount = 0;
			}
		);
		this._currentAnimIndex = ind;
	};
	
	this._characterIndex = ind;
	this.followers()._data.forEach(function(actor) {
			actor._characterIndex = ind;
		}
	);
};


// GAME_FOLLOWER
//-----------------------------------------------------------------------------

Game_Follower.prototype.charAnimMove = function() {
	if ($gamePlayer.isDashing()) {
		this.setAnimIndex(2);
	} else {
		this.setAnimIndex(1);
	};
	this.idleTime = 0;
};


// GAME_EVENT
//-----------------------------------------------------------------------------

Galv.CA.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
	this._isDashing = false;
	Galv.CA.Game_Event_initialize.call(this, mapId, eventId);
	this.disableCharAnims = !this.event().meta.charAnims;
	this.charAnimSetup();
};

Game_Event.prototype.charAnimSetup = function(mapId, eventId) {
	// setup new indexes for character animations based on tag <charAnimSetup:i,w,d,j>
	const tag = this.event().meta.charAnimSetup;
	if (tag) {
		var array = tag.split(',');
		for (var i = 0; i < array.length; i++) {
			this._charAnimIndex[i] = Number(array[i]);
		}
	}
};

Galv.CA.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
	Galv.CA.Game_Event_setupPage.call(this);
	
	// If changing page on event with <charanims> tag
	if (this.disableCharAnims === false) {
		this._stepAnime = true;
		this.idleTime = 0;
	};
};

Game_Event.prototype.isDashing = function() {
	return this._isDashing;
};

Galv.CA.Game_Event_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
	$gamePlayer.idleTime = 0; // reset idle time when activating event
	Galv.CA.Game_Event_start.call(this);
};