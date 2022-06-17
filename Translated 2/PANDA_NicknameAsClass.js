//=============================================================================
// PANDA_NicknameAsClass.js
//=============================================================================
// [Update History]
// 2020-09-25 Ver.1.0.0 First Release for MV/MZ.
// 2020-09-26 Ver.1.0.1 Fixed getting parameters.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc display the nickname instead of the class name on status.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200925200021.html
 * 
 * @help On the status window, display the Nickname instead of the Class name.
 * Also display the Class name instead of the Nickname. (can be hidden)
 * 
 * In a long RPG, when you want to change the position of the actors
 * according to the progress of the story,
 * you can do "Change Nickname" with the event command.
 * You need not to make the same classes with different names.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param NicknameVisible
 * @text Display Nickname
 * @desc Whether to display the class name as nickname on the status screen. If Off, Nickname is not displayed.
 * @type boolean
 * @default true
 */

/*:ja
 * @target MV MZ
 * @plugindesc ステータス画面等で職業名の代わりに二つ名を表示します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200925200021.html
 * 
 * @help ステータス画面等において、職業名の代わりに二つ名を表示します。
 * また、二つ名の代わりに職業名を表示します（非表示も可）。
 * 
 * 長編RPGなどでストーリーの進行に応じてアクターの立場を変更したい場合、
 * イベントコマンドで「二つ名の変更」をすればよくなります。
 * 名前だけが異なる職業を複数用意する必要がなくなります。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param NicknameVisible
 * @text 二つ名の表示
 * @desc ステータス画面で職業名を二つ名として表示するかどうか。OFFにすると二つ名を表示しません。
 * @type boolean
 * @default true
 */

/*:ko
 * @target MV MZ
 * @plugindesc 정보 화면 등에서 클래스명 대신 닉네임을 표시합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200925200021.html
 * 
 * @help 정보 화면 등에서 클래스명 대신 닉네임을 표시합니다.
 * 또 닉네임 대신 클래스명을 표시합니다. (비표시도 가능)
 * 
 * 장편 RPG등에서 스토리의 진행에 따라 액터의 입장을 바꾸고 싶을 때,
 * 이벤트 명령에서 "닉네임 변경"을 하면 됩니다.
 * 명칭만 다른 클래스를 여러 준비할 필요가 없습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param NicknameVisible
 * @text 닉네임 표시
 * @desc 정보 화면에서 클래스명을 닉네임으로 표시하는지. OFF로 하면 닉네임을 표시하지 않습니다.
 * @type boolean
 * @default true
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const NicknameVisible = (parameters['NicknameVisible'] !== 'false');
	
	
	//--------------------------------------------------
	// Game_Actor.nickname
	//  [Modified Definition]
	//--------------------------------------------------
	Game_Actor.prototype.nickname = function() {
		if (NicknameVisible && $dataClasses[this._classId]) {
			return $dataClasses[this._classId].name;
		} else {
			return '';
		}
	};
	
	
	//--------------------------------------------------
	// Window_Base.drawActorClass
	//  [Modified Definition for MV]
	//--------------------------------------------------
	Window_Base.prototype.drawActorClass = function(actor, x, y, width) {
		width = width || 168;
		this.resetTextColor();
		this.drawText(actor._nickname, x, y, width);
	};
	
	
	//--------------------------------------------------
	// Window_StatusBase.drawActorClass
	//  [Modified Definition for MZ]
	//--------------------------------------------------
	Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width) {
		width = width || 168;
		this.resetTextColor();
		this.drawText(actor._nickname, x, y, width);
	};
	
})();

