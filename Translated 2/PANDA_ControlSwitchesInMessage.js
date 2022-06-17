//=============================================================================
// PANDA_ControlSwitchesInMessage.js
//=============================================================================
// [Update History]
// 2020-10-08 Ver.1.0.0 First Release for MZ.
// 2021-06-23 Ver.1.1.0 delete pluginName (for MZ 1.3.0).

/*:
 * @target MZ
 * @plugindesc turn ON/OFF the switches by the escape character.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201008213922.html
 * 
 * @help You can use the following escape characters in the message.
 *  \+switch[n]  : turn ON the switch No. n.
 *  \-switch[n]  : turn OFF the switch No. n.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 制御文字でスイッチのON/OFF操作が行えるようにします。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201008213922.html
 * 
 * @help 文章の表示で、以下の制御文字が使えるようになります。
 *  \+switch[n]  : n番のスイッチをONにする
 *  \-switch[n]  : n番のスイッチをOFFにする
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 */

/*:ko
 * @target MZ
 * @plugindesc 제어문자로 스위치의 ON/OFF를 조작할 수 있습니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201008213922.html
 * 
 * @help 텍스트 표시에서 이하의 제어문자를 사용할 수 있습니다.
 *  \+switch[n]  : n번 스위치를 ON으로 한다.
 *  \-switch[n]  : n번 스위치를 OFF로 한다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 */

(() => {
	'use strict';
	
	// Reg Exp
	const re = /^([\+\-])switch\[(\d+)\]/i;
	
	
	//--------------------------------------------------
	// Window_Base.processControlCharacter
	//  [Added Definition]
	//--------------------------------------------------
	const _Window_Base_processControlCharacter = Window_Base.prototype.processControlCharacter;
	Window_Base.prototype.processControlCharacter = function(textState, c) {
		
		// Original Processing
		_Window_Base_processControlCharacter.call(this, textState, c);
		
		// Control Switches
		if (c === "\x1b") {
			const arr = re.exec(textState.text.slice(textState.index));
			if (arr) {
				textState.index += arr[0].length;
				const f = (arr[1] === '+');
				const n = parseInt(arr[2]);
				$gameSwitches.setValue(n, f);
			}
		}
		
	};
	
})();

