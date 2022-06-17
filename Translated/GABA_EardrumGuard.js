//=============================================================================
// RPG Maker MZ - Eardrum Guard
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Turn down the volume overall.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_EardrumGuard.js(ver1.0.1)
 *
 * Turn down the volume overall.
 * It"s like a master volume that players can"t change.
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param coefficient
 * @text volume
 * @type number
 * @desc Set the volume in %. (default: 50)
 * @max 100
 * @min 0
 * @default 50
 * @decimals 0
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 音量を全体的に下げます。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_EardrumGuard.js(ver1.0.1)
 *
 * 音量を全体的に下げます。
 * プレイヤーが変更できないマスターボリュームみたいなものです。
 *
 * プラグインコマンドはありません。
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param coefficient
 * @text 係数
 * @type number
 * @desc 音量を%で設定します。（初期値：50）
 * @max 100
 * @min 0
 * @default 50
 * @decimals 0
 *
 */

(() => {
	"use strict";
	const pluginName = "GABA_EardrumGuard";

	const parameters = PluginManager.parameters(pluginName);
	const coefficient = (Number(parameters["coefficient"]) || 50) / 100;

	const _AudioManager_updateBufferParameters = AudioManager.updateBufferParameters;
	AudioManager.updateBufferParameters = function(buffer, configVolume, audio) {
		_AudioManager_updateBufferParameters.apply(this, arguments);
		buffer.volume *= coefficient;
	};
})();
