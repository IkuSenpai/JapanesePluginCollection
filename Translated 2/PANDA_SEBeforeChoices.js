//=============================================================================
// PANDA_SEBeforeChoices.js
//=============================================================================
// [Update History]
// 2020-09-27 Ver.1.0.0 First Release for MV/MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc play SE when a choices list is displayed.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200927221414.html
 * 
 * @help When the choices list is displayed by the event command "Show Choices",
 * play the SE specified by the plugin parameters.
 * Playing SE makes it easier to recognize that you have a choice.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param SEFileName
 * @text SE File Name
 * @desc Specify the File Name of the SE to play.
 * @type file
 * @dir audio/se/
 * 
 * @param SEVolume
 * @text SE Volume
 * @desc Specify the Volume value of the SE to play.
 * @type number
 * @decimal 0
 * @max 100
 * @min 0
 * @default 90
 * 
 * @param SEPitch
 * @text SE Pitch
 * @desc Specify the Pitch value of the SE to play.
 * @type number
 * @decimal 0
 * @max 150
 * @min 50
 * @default 100
 * 
 * @param SEPan
 * @text SE Pan
 * @desc Specify the Pan value of the SE to play.
 * @type number
 * @decimal 0
 * @max 100
 * @min -100
 * @default 0
 */

/*:ja
 * @target MV MZ
 * @plugindesc 選択肢の表示時にSEを演奏します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200927221414.html
 * 
 * @help イベントコマンド「選択肢の表示」で選択肢が表示される際に、
 * プラグインパラメータで指定したSEを鳴らします。
 * SEを鳴らすことで、選択肢があることが認識しやすくなります。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param SEFileName
 * @text SEファイル名
 * @desc 演奏するSEのファイル名を指定します。
 * @type file
 * @dir audio/se/
 * 
 * @param SEVolume
 * @text SE音量
 * @desc 演奏するSEの音量を指定します。
 * @type number
 * @decimal 0
 * @max 100
 * @min 0
 * @default 90
 * 
 * @param SEPitch
 * @text SEピッチ
 * @desc 演奏するSEのピッチを指定します。
 * @type number
 * @decimal 0
 * @max 150
 * @min 50
 * @default 100
 * 
 * @param SEPan
 * @text SE位相
 * @desc 演奏するSEの位相を指定します。
 * @type number
 * @decimal 0
 * @max 100
 * @min -100
 * @default 0
 */

/*:ko
 * @target MV MZ
 * @plugindesc 선택지가 표시될 때에 SE를 재생합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200927221414.html
 * 
 * @help 이벤트 명령 "선택지 표시"로 선택지가 표시될 때
 * 매개 변수에서 지정한 SE를 울립니다.
 * SE를 연주함으로써 선택지가 있는 것을 쉽게 인식할 수 있습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * 
 * @param SEFileName
 * @text SE 파일명
 * @desc 재생할 SE의 파일명을 지정합니다.
 * @type file
 * @dir audio/se/
 * 
 * @param SEVolume
 * @text SE 볼륨
 * @desc 재생할 SE의 볼륨 값을 지정합니다.
 * @type number
 * @decimal 0
 * @max 100
 * @min 0
 * @default 90
 * 
 * @param SEPitch
 * @text SE 빠르기
 * @desc 재생할 SE의 빠르기 값을 지정합니다.
 * @type number
 * @decimal 0
 * @max 150
 * @min 50
 * @default 100
 * 
 * @param SEPan
 * @text SE 좌우
 * @desc 재생할 SE의 좌우 값을 지정합니다.
 * @type number
 * @decimal 0
 * @max 100
 * @min -100
 * @default 0
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const SEFileName = parameters['SEFileName'];
	const SEVolume = Number(parameters['SEVolume']);
	const SEPitch = Number(parameters['SEPitch']);
	const SEPan = Number(parameters['SEPan']);
	
	// SE
	const se = {name: SEFileName, volume: SEVolume, pitch: SEPitch, pan: SEPan};
	
	
	//--------------------------------------------------
	// Window_ChoiceList.start
	//  [Added Definition]
	//--------------------------------------------------
	const _Window_ChoiceList_start = Window_ChoiceList.prototype.start;
	Window_ChoiceList.prototype.start = function() {
		AudioManager.playSe(se);
		_Window_ChoiceList_start.call(this);
	};
	
})();

