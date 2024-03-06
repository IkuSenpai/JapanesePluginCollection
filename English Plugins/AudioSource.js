//=============================================================================
// AudioSource.js
// PUBLIC DOMAIN
// ----------------------------------------------------------------------------
// 2016/10/18 BGM and BGS audio sourcing, auto-adjustment once specified
// 2016/10/21 Changed distance measurement unit for volume and pan adjustment from tiles to dots
// 2016/12/04 Added save/load support, compatibility with ParallelBgs.js
// 2017/01/07 Added audio sourcing for animations, ensured normal operation even between battles
// 2017/01/09 Enabled turning off SE audio sourcing in route settings
// 2017/03/25 Fixed bug where 0 couldn't be specified in plugin parameters
// 2017/06/04 Fixed noise issues on rapid BGM/BGS playback, and disabled volume adjustment momentarily after changing optional volume
// 2017/10/05 Integration with FootstepSound.js
// 2018/06/27 Fixed bug where noise occurred when pan crossed between 0 and non-zero values (environmental)
// 2018/07/31 Fixed bug where audio processing wasn't reflected immediately after loading
// 2018/09/16 Cancelled the significance of 2018/06/27; if noise occurs, upgrade to version 1.6.1 or higher
// 2020/08/22 Added compatibility with RPG Maker MZ
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Automatically adjusts volume and pan based on the position of the audio source and listener.
 * @author くらむぼん
 *
 * @param listener
 * @type select
 * @text Listener
 * @option Screen Center
 * @value screen
 * @option Player
 * @value player
 * @default screen
 *
 * @param decay
 * @type number
 * @text Decay Rate
 * @desc Rate of volume change when the distance between the source and the listener increases by one step (%). Smaller values result in more drastic volume reduction per step.
 * @default 85
 *
 * @param pan
 * @type number
 * @text Stereo Pan
 * @desc Change in phase when the source is one step to the right of the listener. Larger values result in more extreme left-right panning per step.
 * @default 10
 *
 * @param cutoff
 * @type number
 * @text Minimum Volume
 * @desc Minimum allowed volume for sound playback (%).
 * @default 1
 *
 * @help
 * This plugin allows for the creation of effects like "sound coming from a specific location." 
 * You can designate specific map events as sound sources, and the volume and other attributes change 
 * based on the distance from the listener (initially set to the center of the screen).
 * As the source and listener get closer, the volume increases, and if the source is to the right 
 * of the listener, the sound will appear to come from the right.
 * 
 * ---Usage in RPG Maker MZ---
 * Use the "Play Sound from Source" plugin command to play audio as if it originates from a specific location. 
 * For BGM and BGS, when transitioning to another map, the source may be lost, so adjust it again using the plugin command after moving.
 * 
 * Other commands include changing the listener to a specific map event, and automatically making SEs in "Set Move Route" or animations audible from the specified event.
 * 
 * 
 * Plugin Parameters:
 * listener: Set the "listener" for the emitted sound.
 *   screen: The center of the screen becomes the "listener."
 *   player: The "player" becomes the "listener."
 * decay: Each step that the distance between the source and the listener widens results in the volume changing by the decay%.
 *   Values between 0 and 100 are typical. Using values above 100 can create a peculiar effect where the sound gets louder as the source moves away.
 * pan: When the source moves one step to the right, the phase changes by pan.
 *   Conversely, if the source moves one step to the left, the phase changes by -pan.
 * cutoff: The minimum allowed volume for sound playback (%).
 *   If the calculated volume falls below this value, it is forcefully set to 0%.
 * 
 * Plugin Commands:
 * audiosource listener 1
 * Set the map event with the specified ID (in this case, 1) as the "listener."
 * (Setting 0 makes "this event" the "listener.")
 * Since there can only be one listener, the screen or player is no longer the listener.
 * 
 * audiosource listener reset
 * Unset the listener from the map event and return it to the screen or player.
 * 
 * audiosource bgm 1
 * audiosource bgs 1
 * Adjust the volume and phase of the currently playing BGM/BGS to make it seem like it is playing from the specified event.
 * (Setting 0 makes "this event" the source.)
 * Useful for creating effects like music playing from a radio.
 * 
 * If you are using the BGS Parallel Play plugin, changing the BGS line first and then using audiosource allows you to set the source for each BGS.
 * Example:
 * ◆Plugin Command: PB_BGS Change Line 2
 * ◆Plugin Command: audiosource bgs 1
 * 
 * audiosource bgm reset
 * audiosource bgs reset
 * Unset the source for BGM/BGS and return to regular playback.
 * 
 * audiosource se on
 * audiosource se off
 * SEs in "Set Move Route" or "Show Animation" are automatically adjusted to seem like they are coming from the position of the target character.
 * Use this plugin command to turn off automatic adjustment when you don't want it. The default is on.
 * 
 * 
 * License:
 * There are no restrictions on the usage of this plugin. Feel free to use it as you like.
 * 
 * @command play
 * @text Play Sound from Source
 * @desc Calculates the position relationship between the sound source and the listener, playing the sound as if it originates from the source.
 *
 * @arg path
 * @type file
 * @dir audio
 * @text Sound File
 * 
 * @arg volume
 * @type number
 * @default 90
 * @text Volume (%)
 * 
 * @arg pitch
 * @type number
 * @default 100
 * @text Pitch (%)
 * 
 * @arg source
 * @type number
 * @default 0
 * @text Source Event
 * @desc Specifies the map event to use as the sound source. Set to 0 for "This Event."
 * 
 * @command listener
 * @text Change Listener
 * @desc Sets a map event (specified by ID) as the listener. Use 0 to remove (return to screen/ player as the listener).
 * 
 * @arg listener
 * @type number
 * @default 0
 * @text Listener Event
 * 
 * @command adjustRouteSe
 * @text Adjust Route SE as Source
 * @desc Automatically adjusts the SE in the "Set Move Route" command to be audible from the specified event.
 * 
 * @arg value
 * @type boolean
 * 
 * @command adjustAnimationSe
 * @text Adjust Animation SE as Source
 * @desc Automatically adjusts SEs in "Show Animation" to be audible from the specified event.
 * 
 * @arg value
 * @type boolean
 */

(function() {
	'use strict';
	var pluginName = 'AudioSource';
	var parameters = PluginManager.parameters(pluginName);
	var listener = parameters['listener'];
	var decay = toNumber(parameters['decay'], 85).clamp(0, Infinity);
	var pan = toNumber(parameters['pan'], 10);
	var cutoff = toNumber(parameters['cutoff'], 1).clamp(0, 100);

	// Volume control for sound effects (only when sounded from map event route settings)
	var _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
	Game_Character.prototype.processMoveCommand = function(command) {
		var adjust = typeof $gameSystem._adjustRouteSe === "boolean" ? $gameSystem._adjustRouteSe : !PluginManager.registerCommand;
		if (adjust && command.code === Game_Character.ROUTE_PLAY_SE) playAdjustSe(command.parameters[0], this);
		else _Game_Character_processMoveCommand.apply(this, arguments);
	};

	// Volume control for sound effects during animation
	Sprite_Animation.prototype.processTimingData = function(timing) {
		var duration = timing.flashDuration * this._rate;
		switch (timing.flashScope) {
			case 1:
			this.startFlash(timing.flashColor, duration);
			break;
			case 2:
			this.startScreenFlash(timing.flashColor, duration);
			break;
			case 3:
			this.startHiding(duration);
			break;
		}
		if (!this._duplicated && timing.se) {
			var adjust = typeof $gameSystem._adjustAnimationSe === "boolean" ? $gameSystem._adjustAnimationSe : !PluginManager.registerCommand;
			playAdjustSe(timing.se, adjust && this._target && this._target._character);
		}
	};

	// Immediately after the battle, the volume of BGM and BGS is set back to the default value, so set it again.
	// It looks like fadeIn will be canceled, but actually it works because fadeIn processing is delayed more.
	var _BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
	BattleManager.replayBgmAndBgs = function() {
		_BattleManager_replayBgmAndBgs.apply(this, arguments);
		AudioManager.updateAudioSource();
	};

	// BGM and BGS volume control (every frame)
	AudioManager.updateAudioSource = function() {
		updateParameters(this._currentBgm, $gameMap.event($gameSystem._bgmSource), true);
		if ($gameSystem._bgsSources) {
			if (!this.iterateAllBgs) return delete $gameSystem._bgsSources;
			this.iterateAllBgs(function() {
				updateParameters(this._currentBgs, $gameMap.event($gameSystem._bgsSources[this.getBgsLineIndex()]));
			}.bind(this));
		}
		else updateParameters(this._currentBgs, $gameMap.event($gameSystem._bgsSource));
	};

	// Disable AudioBuffer adjustment from event commands if BGM and BGS volume is automatically adjusted
	// (because noise is generated when multiple volume changes are included in the same frame)
	var _AudioManager_updateBgmParameters = AudioManager.updateBgmParameters;
	AudioManager.updateBgmParameters = function(bgm) {
		if ($gameMap && $gameMap.event($gameSystem._bgmSource)) return;
		_AudioManager_updateBgmParameters.apply(this, arguments);
	};

	var _AudioManager_updateBgsParameters = AudioManager.updateBgsParameters;
	AudioManager.updateBgsParameters = function(bgs) {
		if ($gameMap && $gameSystem) {
			if ($gameSystem._bgsSources && this.getBgsLineIndex) {
				if ($gameMap.event($gameSystem._bgsSources[this.getBgsLineIndex()])) return;
			} else {
				if ($gameMap.event($gameSystem._bgsSource)) return;
			}
		}
		_AudioManager_updateBgsParameters.apply(this, arguments);
	};

	// Ensure that the volume is properly adjusted when changing the volume on the options side of BGM and BGS.
	var _AudioManager_bgmVolume = Object.getOwnPropertyDescriptor(AudioManager, 'bgmVolume');
	Object.defineProperty(AudioManager, 'bgmVolume', {
		get: function() {
			return _AudioManager_bgmVolume.get.call(this);
		},
		set: function(value) {
			_AudioManager_bgmVolume.set.call(this, value);
			if ($gameMap && $gameSystem) this.updateAudioSource();
		},
		configurable: true
	});

	var _AudioManager_bgsVolume = Object.getOwnPropertyDescriptor(AudioManager, 'bgsVolume');
	Object.defineProperty(AudioManager, 'bgsVolume', {
		get: function() {
			return _AudioManager_bgsVolume.get.call(this);
		},
		set: function(value) {
			_AudioManager_bgsVolume.set.call(this, value);
			if ($gameMap && $gameSystem) this.updateAudioSource();
		},
		configurable: true
	});

	var bgmOnSave = null;
	var bgsOnSave = null;

	var _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
	Scene_Map.prototype.onMapLoaded = function() {
		_Scene_Map_onMapLoaded.apply(this, arguments);
		if (bgmOnSave) {
			AudioManager.playBgm(bgmOnSave);
			bgmOnSave = null;
		}
		if (bgsOnSave) {
			AudioManager.playBgs(bgsOnSave);
			bgsOnSave = null;
		}
		AudioManager.updateAudioSource();
	};

	var _Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
	Game_System.prototype.onAfterLoad = function() {
		bgmOnSave = this._bgmOnSave;
		bgsOnSave = this._bgsOnSave;
		this._bgmOnSave = this._bgsOnSave = {};
		_Game_System_onAfterLoad.apply(this, arguments);
		this._bgmOnSave = bgmOnSave;
		this._bgsOnSave = bgsOnSave;
	};

	var _Game_Map_update = Game_Map.prototype.update;
	Game_Map.prototype.update = function(sceneActive) {
		_Game_Map_update.apply(this, arguments);
		AudioManager.updateAudioSource();
	};

	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);
		if (command.toLowerCase() === 'audiosource') {
			var eventId = +args[1] === 0 ? this._eventId : +args[1];
			switch (args[0].toLowerCase()) {
				case 'listener':
					$gameSystem._listenerEvent = eventId;
					break;
				case 'bgm':
					$gameSystem._bgmSource = eventId;
					break;
				case 'bgs':
					if ($gameSystem.getBgsLine) {
						$gameSystem._bgsSources = $gameSystem._bgsSources || [];
						$gameSystem._bgsSources[$gameSystem.getBgsLine()] = eventId;
					}
					else $gameSystem._bgsSource = eventId;
					break;
				case 'se':
					$gameSystem._adjustRouteSe = $gameSystem._adjustAnimationSe = args[1].toLowerCase() !== 'off';
					break;
				default:
					break;
			}
		}
	};

	if (PluginManager.registerCommand) {
        PluginManager.registerCommand(pluginName, "play", function(args) {
			var { path, volume, pitch, source } = args;
			var [ dir, name ] = path.split("/");
			var eventId = +source || this._eventId;
			var pan = 0;
            switch (dir) {
				case "bgm": {
					$gameSystem._bgmSource = eventId;
					AudioManager.playBgm({ name, volume, pitch, pan });
					break;
				}
				case "bgs": {
					if ($gameSystem.getBgsLine) {
						$gameSystem._bgsSources = $gameSystem._bgsSources || [];
						$gameSystem._bgsSources[$gameSystem.getBgsLine()] = eventId;
					}
					else $gameSystem._bgsSource = eventId;
					AudioManager.playBgs({ name, volume, pitch, pan });
					break;
				}
				case "me": {
					playAdjustMe({ name, volume, pitch, pan }, $gameMap.event(eventId));
					break;
				}
				case "se": {
					playAdjustSe({ name, volume, pitch, pan }, $gameMap.event(eventId));
					break;
				}
			}
		});

		PluginManager.registerCommand(pluginName, "listener", function(args) {
			$gameSystem._listenerEvent = args.listener;
		});

		PluginManager.registerCommand(pluginName, "adjustRouteSe", function(args) {
			$gameSystem._adjustRouteSe = args.value === "true";
		});

		PluginManager.registerCommand(pluginName, "adjustAnimationSe", function(args) {
			$gameSystem._adjustAnimationSe = args.value === "true";
		});

		var _Game_Intepreter_command241 = Game_Interpreter.prototype.command241;
		Game_Interpreter.prototype.command241 = function(params) {
			$gameSystem._bgmSource = NaN;
			return _Game_Intepreter_command241.apply(this, arguments);
		};

		var _Game_Intepreter_command245 = Game_Interpreter.prototype.command245;
		Game_Interpreter.prototype.command245 = function(params) {
			if ($gameSystem.getBgsLine) {
				$gameSystem._bgsSources = $gameSystem._bgsSources || [];
				$gameSystem._bgsSources[$gameSystem.getBgsLine()] = NaN;
			}
			else $gameSystem._bgsSource = NaN;
			return _Game_Intepreter_command245.apply(this, arguments);
		};
    }

	function toNumber(str, def) {
		return isNaN(str) ? def : +(str || def);
	}

	// Adjust volume and phase of BGM and BGS
	function updateParameters(audio, source, isBgm) {
		if (audio && source) {
			var lastVolume = audio.volume;
			var lastPan = audio.pan;
			adjust(audio, source);
			if (audio.volume < cutoff) audio.volume = 0;
			var buffer = AudioManager[isBgm ? '_bgmBuffer' : '_bgsBuffer'];
			if (buffer && buffer._gainNode) buffer._gainNode.gain.cancelScheduledValues(0);
			AudioManager.updateBufferParameters(buffer, AudioManager[isBgm ? '_bgmVolume' : '_bgsVolume'], audio);
			audio.volume = lastVolume;
			audio.pan = lastPan;
		}
	}

	// Adjust the volume and phase of ME for playback
	function playAdjustMe(me, source) {
		if (source) {
			var lastVolume = me.volume;
			var lastPan = me.pan;
			adjust(me, source);
			if (me.volume >= cutoff) AudioManager.playMe(me);
			me.volume = lastVolume;
			me.pan = lastPan;
		}
		else AudioManager.playMe(me);
	}

	// Playback with adjustable SE volume and phase
	function playAdjustSe(se, source) {
		if (source) {
			var lastVolume = se.volume;
			var lastPan = se.pan;
			adjust(se, source);
			if (se.volume >= cutoff) AudioManager.playSe(se);
			se.volume = lastVolume;
			se.pan = lastPan;
		}
		else AudioManager.playSe(se);
	}

	// Function actually in charge of volume control. Specify audio data as the first argument and the sound character as the second argument.
	function adjust(audio, source) {
		if (!source) throw new Error('audiosourceエラー：音源となるイベントが存在しません');
		var listenerX, listenerY, listenerEvent = $gameMap.event($gameSystem._listenerEvent);
		if (listenerEvent) {
			listenerX = listenerEvent._realX;
			listenerY = listenerEvent._realY;
		} else {
			switch (listener.toLowerCase()) {
				case 'screen':
					listenerX = $gameMap.displayX() + $gamePlayer.centerX();
					listenerY = $gameMap.displayY() + $gamePlayer.centerY();
					break;
				case 'player':
					listenerX = $gamePlayer._realX;
					listenerY = $gamePlayer._realY;
					break;
				default:
					throw new Error('audiosourceエラー：listenerパラメータはscreenかplayerにしてください');
			}
		}
		var dx = $gameMap.deltaX(source._realX, listenerX);
		var dy = $gameMap.deltaY(source._realY, listenerY);
		var d = Math.sqrt(dx * dx + dy * dy);
		if (d > 1) audio.volume *= Math.pow(decay / 100, d - 1);
		audio.pan = (dx * pan).clamp(-100, 100);
	}

	// Interface/Connection Port
	AudioManager.playAdjustSe = playAdjustSe;
})();