// --------------------------------------------------------------------------
// 
// FaceToCharacterGraphic.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2020/08/23 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc 各画面の顔グラフィックを歩行グラフィックに変更するプラグイン
 * @author kotonoha*
 * @url https://aokikotori.com/
 * @help メニュー画面や戦闘画面などに表示されている顔グラフィックを
 * 歩行グラフィックに変更します。
 *
 * 改変自由、商用利用可能です。
 * 作者名のクレジットや利用報告は不要です。ご自由にどうぞ！
 * 
 * @param ShiftX
 * @text 表示位置（X）
 * @desc 左上を視点とした時の横方向（X）の座標
 * @default 72
 * @type number
 *
 * @param ShiftY
 * @text 表示位置（Y）
 * @desc 左上を視点とした時の縦方向（Y）の座標
 * @default 72
 * @type number
*/

(function() {

	const pluginName = 'FaceToCharacterGraphic';

    const parameters = PluginManager.parameters(pluginName);
    const ShiftX = Number(parameters['ShiftX'] || 72);
    const ShiftY = Number(parameters['ShiftY'] || 72);

	Window_StatusBase.prototype.drawActorFace = function(
	    actor, x, y, width, height
	) {
		this.drawCharacter(actor.characterName(), actor.characterIndex(), x + ShiftX, y + ShiftY);
	};

})();