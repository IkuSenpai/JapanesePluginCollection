//=============================================================================
// PANDA_EventSkip.js
//=============================================================================
// [Update History]
// 2020-11-02 Ver.1.0.0 First Release for MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MZ
 * @plugindesc skips running event by plugin commands.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201102210818.html
 * 
 * @help [How to Use]
 * Add Plugin Commands to skip running event.
 * 
 * # Skip Running Event
 * Call from parallel processing
 * to skip the currently running event to the specified label position.
 * If the label is not specified, it will be skipped to the end of the event.
 * If the message is being displayed, the message window is closed immediately.
 * Parallel processing events are not skipped.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @command EventSkip
 * @text Skip Running Event
 * @desc Skips the currently running event to the specified label position.
 * 
 * @arg labelName
 * @text Label Name
 * @desc Specify the label name of the skip destination. If blank, it will be skipped to the end of the event.
 * @type string
 * @default 
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc プラグインコマンドで実行中のイベントをスキップします。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201102210818.html
 * 
 * @help ■ 使い方
 * 実行中のイベントをスキップするプラグインコマンドを追加します。
 * 
 * ◆ 実行中イベントのスキップ
 * 並列処理から呼び出して、
 * 現在実行中のイベントを指定したラベルの位置までスキップさせます。
 * ラベルを指定しなかった場合はイベントの最後までスキップされます。
 * 文章の表示中であればメッセージウィンドウを即座に閉じてスキップします。
 * 並列処理のイベントはスキップされません。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @command EventSkip
 * @text 実行中イベントのスキップ
 * @desc 現在実行中のイベントを指定したラベルの位置までスキップさせます。
 * 
 * @arg labelName
 * @text ラベル名
 * @desc スキップ先のラベル名を指定します。空欄にするとイベントの最後までスキップします。
 * @type string
 * @default 
 * 
 */

/*:ko
 * @target MZ
 * @plugindesc 플러그인 명령으로 실행중인 이벤트를 스킵합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20201102210818.html
 * 
 * @help [사용법]
 * 실행중인 이벤트를 스킵할 수 있는 플러그인 명령이 추가됩니다.
 * 
 * * 실행중 이벤트의 스킵
 * 병렬 처리에서 호출하여 현재 실행중인 이벤트를 지정된 라벨 위치까지 스킵합니다.
 * 라벨을 지정하지 않은 경우 이벤트의 마지막까지 스킵됩니다.
 * 텍스트 표시중이면 메세지 윈도우를 즉시 닫아 스킵합니다.
 * 병렬 처리인 이벤트는 스킵되지 않습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @command EventSkip
 * @text 실행중 이벤트의 스킵
 * @desc 현재 실행중인 이벤트를 지정한 라벨 위치까지 스킵시킵니다.
 * 
 * @arg labelName
 * @text 라벨명
 * @desc 스킵처인 라벨명을 지정합니다. 비워두면 이벤트의 마지막까지 스킵합니다.
 * @type string
 * @default 
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	
	//--------------------------------------------------
	// Plugin Command "Skip Running Event"
	//--------------------------------------------------
	PluginManager.registerCommand(pluginName, 'EventSkip', function(args) {
		
		// get arguments
		let labelName = args['labelName'] || '';
		
		// close message
		const mw = SceneManager._scene._messageWindow;
		if (mw) {
			if (mw.pause) {
				mw.pause = false;
				mw.terminateMessage();
			} else {
				mw._showFast = true;
				mw._pauseSkip = true;
			}
		}
		
		// jump to label or exit the event
		if ($gameMap._interpreter) {
			if ($gameMap._interpreter.isRunning()) {
				if (labelName === '') {
					$gameMap._interpreter.command115();
				} else {
					$gameMap._interpreter.command119([labelName]);
				}
			}
		}
		
	});
	
})();
