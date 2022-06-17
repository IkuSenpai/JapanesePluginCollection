//=============================================================================
// PANDA_ResetSelfSwitches.js
//=============================================================================
// [Update History]
// 2020-09-29 Ver.1.0.0 First Release for MV/MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc reset certain self-switches when the map is initialized.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200929011112.html
 * 
 * @help When entering the map, turn off the self-switches of the events
 * with the event name which matches the specified regular expression.
 * 
 * It can be useful in cases which the state of doors or buttons is reset
 * when entering and exiting the map.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param EventName
 * @text Event Name
 * @desc Specify the target Event Name with a regular expression.
 * @type string
 * @default 
 * 
 * @param SwitchList
 * @text Self Switch List
 * @desc Specify the target Self Switches from A-D.
 * @type select[]
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc マップの初期化時に特定のセルフスイッチをOFFにします。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200929011112.html
 * 
 * @help マップに入った際、指定した正規表現にマッチするイベント名を持つイベントの
 * セルフスイッチをOFFにします。
 * 
 * マップを出入りすると扉やボタンの状態がリセットされるケースなどに利用できます。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param EventName
 * @text 対象イベント名
 * @desc 対象となるイベント名を正規表現で指定します。
 * @type string
 * @default 
 * 
 * @param SwitchList
 * @text セルフスイッチリスト
 * @desc 対象のセルフスイッチをA～Dで指定します。
 * @type select[]
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 맵 초기화시에 특정 셀프스위치를 OFF로 합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200929011112.html
 * 
 * @help 맵에 들어갈 때, 지정된 정규 표현식에 일치하는 이벤트명을 가진 이벤트의
 * 셀프스위치를 OFF로 합니다.
 * 
 * 맵을 출입하면 문이나 버튼의 상태가 리셋될 경우 등에 이용할 수 있습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param EventName
 * @text 대상 이벤트명
 * @desc 대상이 될 이벤트명을 정규 표현식으로 지정합니다.
 * @type string
 * @default 
 * 
 * @param SwitchList
 * @text 셀프스위치 리스트
 * @desc 대상이 될 셀프스위치를 A-D로 지정합니다.
 * @type select[]
 * @option 
 * @option A
 * @option B
 * @option C
 * @option D
 * @default []
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const EventName = parameters['EventName'];
	const SwitchList = JSON.parse(parameters['SwitchList']) || [];
	
	// RegExp
	const re = new RegExp(EventName);
	
	// Switch ID
	const sslist = SwitchList.filter(value => value);
	
	
	//--------------------------------------------------
	// Game_Map.setupEvents
	//  [Added Definition]
	//--------------------------------------------------
	const _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
	Game_Map.prototype.setupEvents = function() {
		
		// search all events in this map
		for (const event of $dataMap.events.filter(event => !!event)) {
			
			// matching test
			if (re.test(event.name)) {
				
				// all target self switches
				for (const ss of sslist) {
					
					// delete self switch key
					const key = [this.mapId(), event.id, ss];
					delete $gameSelfSwitches._data[key];
					
				}
				
			}
			
		}
		
		// Original Processing
		_Game_Map_setupEvents.call(this);
		
	};
	
})();
