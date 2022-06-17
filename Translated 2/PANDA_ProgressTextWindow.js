//=============================================================================
// PANDA_ProgressTextWindow.js
//=============================================================================
// [Update History]
// 2020-12-08 Ver.1.0.0 First Release for MZ.
// 2021-01-24 Ver.1.1.0 First Release for MV.
// 2021-01-25 Ver.1.1.1 Release for MV/MZ.
// 2021-06-23 Ver.1.2.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.2.1 revert fix for subfolder (MZ 1.3.2).
// 2022-04-14 Ver.1.3.0 Add Text Width Auto Adjust Option.

/*:
 * @target MV MZ
 * @plugindesc display the text of the story progress on the menu screen.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210125012307.html
 * 
 * @help Add the window to display a text on the menu screen.
 * Displays the text according to the value of the variable
 * specified in the plug-in parameter.
 * It is useful for showing the next object etc. according to
 * the progress of the story.
 * 
 * The window can be placed in any position
 * by specifying the XY coordinates and width / height.
 * By default, the window is placed in the empty space of the standard menu screen.
 * In MZ, at the top of the menu screen to the left of the cancel button.
 * In MV, between the menu command and the gold window.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ProgressVariable
 * @text Progress Variable
 * @desc Specifies the variable of the number of text to display in the window.
 * @type variable
 * @default 0
 * 
 * @param ProgressText
 * @text Progress Text
 * @desc Input texts to display according to the value of Progress Variable. Progress number starts from 1. A new line by "\n".
 * @type string[]
 * @default 
 * 
 * @param TextWidthAutoAdjust
 * @text text width auto adjustment
 * @desc If ON, the text width is automatically adjusted to fit in the window. But \n or control characters can't be used.
 * @type boolean
 * @default false
 * 
 * @param WindowLayout
 * @text Window Layout
 * @desc Specify the position and size of the window. If default, it will be placed in the empty space of the menu screen.
 * @type struct<rect>
 * 
 */
/*~struct~rect:
 * 
 * @param IsDefault
 * @text Default Layout
 * @desc If ON, the window is placed in the empty space of the menu screen, and the following settings are ignored.
 * @type boolean
 * @default true
 * 
 * @param Left
 * @text Window Left
 * @desc Specify the left X position of the window in pixels.
 * @type number
 * @default 0
 * 
 * @param Top
 * @text Window Top
 * @desc Specify the top Y position of the window in pixels.
 * @type number
 * @default 0
 * 
 * @param Width
 * @text Window Width
 * @desc Specify the width of the window in pixels.
 * @type number
 * @default 808
 * 
 * @param Height
 * @text Window Height
 * @desc Specify the height of the window in pixels.
 * @type number
 * @default 52
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc メニュー画面に物語の進行を表すテキストを表示します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210125012307.html
 * 
 * @help メニュー画面にテキストを表示するウィンドウを追加します。
 * プラグインのパラメータで指定した変数の値に応じたテキストを表示します。
 * 物語の進行度に合わせて、次の目的地などを表示するのに役立ちます。
 * 
 * ウィンドウは、XY座標と幅・高さを指定して、自由な位置に配置できます。
 * デフォルト状態では、デフォルトのメニュー画面の空きスペースに表示されます。
 * MZでは、メニュー画面の上部、キャンセルボタンの左側に、
 * MVでは、メニューコマンドと所持金ウィンドウの間に、表示されます。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ProgressVariable
 * @text 進行度変数
 * @desc ウィンドウに表示するテキストの番号を表す変数を指定します。
 * @type variable
 * @default 0
 * 
 * @param ProgressText
 * @text 進行度テキスト
 * @desc 進行度変数の値に応じて表示するテキストをリストで入力します。進行度は1から開始します。"\n"で改行ができます。
 * @type string[]
 * @default 
 * 
 * @param TextWidthAutoAdjust
 * @text テキスト幅自動調整
 * @desc ONにすると長いテキストでもウィンドウに収まるように文字幅を自動調整します。ただし改行や制御文字は使用できません。
 * @type boolean
 * @default false
 * 
 * @param WindowLayout
 * @text ウィンドウレイアウト
 * @desc ウィンドウの位置とサイズを指定します。デフォルトにするとメニュー画面の空きスペースに配置されます。
 * @type struct<rect>
 * 
 */
/*~struct~rect:ja:
 * 
 * @param IsDefault
 * @text デフォルトレイアウト
 * @desc ONにするとウィンドウをデフォルトのメニュー画面の空きスペースに配置し、以下のレイアウト設定は無視します。
 * @type boolean
 * @default true
 * 
 * @param Left
 * @text ウィンドウ左上X座標
 * @desc ウィンドウの左上のX座標をピクセルで指定します。
 * @type number
 * @default 0
 * 
 * @param Top
 * @text ウィンドウ左上Y座標
 * @desc ウィンドウの左上のY座標をピクセルで指定します。
 * @type number
 * @default 0
 * 
 * @param Width
 * @text ウィンドウ幅
 * @desc ウィンドウの幅をピクセルで指定します。
 * @type number
 * @default 808
 * 
 * @param Height
 * @text ウィンドウ高さ
 * @desc ウィンドウの高さをピクセルで指定します。
 * @type number
 * @default 52
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 메뉴 화면에 스토리의 진행을 나타내는 텍스트를 표시합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210125012307.html
 * 
 * @help 메뉴 화면에 텍스트를 표시하는 윈도우를 추가합니다.
 * 플러그인 매개 변수로 지정된 변수 값에 따라 텍스트를 표시합니다.
 * 스토리 진행도에 따라 다음 목적지 등을 표시하는데 도움이 됩니다.
 * 
 * 윈도우는 XY좌표와 폭/높이를 지정하여 원하는 위치에 배치할 수 있습니다.
 * 기본 상태에서는 표준 메뉴 화면의 빈 부분에 표시됩니다.
 * MZ에서는 메뉴 화면 상단, 취소 버튼 왼쪽에,
 * MV에서는 메뉴 명령과 소지금 윈도우 사이에 표시됩니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ProgressVariable
 * @text 진행도 변수
 * @desc 윈도우에 표시하는 텍스트의 번호를 나타내는 변수를 지정합니다.
 * @type variable
 * @default 0
 * 
 * @param ProgressText
 * @text 진행도 텍스트
 * @desc 진행도 변수 값에 따라 표시할 텍스트를 리스트로 입력합니다. 진행도는 1부터 시작됩니다. "\n"으로 줄바꿈할 수 있습니다.
 * @type string[]
 * @default 
 * 
 * @param TextWidthAutoAdjust
 * @text 텍스트 폭 자동 조정
 * @desc ON으로 하면 긴 텍스트라도 윈도우에 맞도록 문자 폭을 자동 조정합니다. 단, 개행이나 제어 문자는 사용할 수 없습니다.
 * @type boolean
 * @default false
 * 
 * @param WindowLayout
 * @text 윈도우 레이아웃
 * @desc 윈도우의 위치와 크기를 지정합니다. 기본값으로 하면 표준 메뉴 화면 빈 부분에 배치됩니다.
 * @type struct<rect>
 * 
 */
/*~struct~rect:ko:
 * 
 * @param IsDefault
 * @text 기본 레이아웃
 * @desc ON으로 하면 윈도우가 표준 메뉴 화면의 빈 부분에 배치되고, 이하의 레이아웃 설정은 무시됩니다.
 * @type boolean
 * @default true
 * 
 * @param Left
 * @text 윈도우 X좌표
 * @desc 윈도우 왼쪽 상단의 X좌표를 픽셀로 지정합니다.
 * @type number
 * @default 0
 * 
 * @param Top
 * @text 윈도우 Y좌표
 * @desc 윈도우 왼쪽 상단의 Y좌표를 픽셀로 지정합니다.
 * @type number
 * @default 0
 * 
 * @param Width
 * @text 윈도우 폭
 * @desc 윈도우 폭을 픽셀로 지정합니다.
 * @type number
 * @default 808
 * 
 * @param Height
 * @text 윈도우 높이
 * @desc 윈도우 높이를 픽셀로 지정합니다.
 * @type number
 * @default 52
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const ProgressVariable = parseInt(parameters['ProgressVariable']) || 0;
	const pt = parameters['ProgressText'] || '';
	const ProgressText = JSON.parse(pt.replace(/\\\\n/g, "\\n")) || [];
	ProgressText.unshift('');
	const TextWidthAutoAdjust = (parameters['TextWidthAutoAdjust'] !== 'false');
	
	// Window Layout
	const WindowLayout = JSON.parse(parameters['WindowLayout'] || '{"IsDefault": "true"}');
	const LayoutDefault = (WindowLayout.IsDefault == 'true');
	const WindowLeft   = parseInt(WindowLayout.Left);
	const WindowTop    = parseInt(WindowLayout.Top);
	const WindowWidth  = parseInt(WindowLayout.Width);
	const WindowHeight = parseInt(WindowLayout.Height);
	
	
	//--------------------------------------------------
	// Scene_Menu.create
	//  [Modified Definition]
	//--------------------------------------------------
	const _Scene_Menu_create = Scene_Menu.prototype.create;
	Scene_Menu.prototype.create = function() {
		_Scene_Menu_create.call(this);
		this.createProgressWindow();
	};
	
	
	//--------------------------------------------------
	// Scene_Menu.createProgressWindow
	//  [New Definition]
	//--------------------------------------------------
	Scene_Menu.prototype.createProgressWindow = function() {
		const rect = this.progressWindowRect();
		this._progressWindow = new Window_Progress(rect);
		this.addWindow(this._progressWindow);
	};
	
	
	//--------------------------------------------------
	// Scene_Menu.progressWindowRect
	//  [New Definition]
	//--------------------------------------------------
	Scene_Menu.prototype.progressWindowRect = function() {
		if (LayoutDefault) {
			if (Utils.RPGMAKER_NAME === 'MZ') {
				// for MZ
				const ww = this._cancelButton ? this._cancelButton.x : Graphics.boxWidth;
				const wh = this.buttonAreaHeight() - this.buttonAreaTop();
				const wx = 0;
				const wy = this.buttonAreaTop();
				return new Rectangle(wx, wy, ww, wh);
			} else if (Utils.RPGMAKER_NAME === 'MV') {
				// for MV
				const wx = this._commandWindow.x;
				const wy = this._commandWindow.y + this._commandWindow.height;
				const ww = this._commandWindow.width;
				const wh = this._goldWindow.y - wy;
				return new Rectangle(wx, wy, ww, wh);
			}
		} else {
			return new Rectangle(WindowLeft, WindowTop, WindowWidth, WindowHeight);
		}
	};
	
	
	//--------------------------------------------------
	// Window_Progress
	//  [New Definition]
	//--------------------------------------------------
	function Window_Progress() {
		this.initialize(...arguments);
	}
	
	Window_Progress.prototype = Object.create(Window_Help.prototype);
	Window_Progress.prototype.constructor = Window_Progress;
	
	Window_Progress.prototype.initialize = function(rect) {
		if (Utils.RPGMAKER_NAME === 'MZ') {
			// for MZ
			Window_Help.prototype.initialize.call(this, rect);
		} else if (Utils.RPGMAKER_NAME === 'MV') {
			// for MV
			Window_Base.prototype.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
		}
		this.setProgressText();
	};
	
	Window_Progress.prototype.updatePadding = function() {
		if (this.padding * 2 + this.lineHeight() > this._height) {
			this.padding = (this._height - this.lineHeight()) / 2;
		}
	}
	
	Window_Progress.prototype.setProgressText = function() {
		const p = $gameVariables.value(ProgressVariable) || 0;
		const text = ProgressText[p] || '';
		this.setText(text);
	};
	
	Window_Help.prototype.refresh = function() {
		if (Utils.RPGMAKER_NAME === 'MZ') {
			// for MZ
			const rect = this.baseTextRect();
			this.contents.clear();
			if (TextWidthAutoAdjust) {
				this.drawText(this._text, rect.x, rect.y, rect.width);
			} else {
				this.drawTextEx(this._text, rect.x, rect.y, rect.width);
			}
		} else if (Utils.RPGMAKER_NAME === 'MV') {
			// for MV
			this.contents.clear();
			if (TextWidthAutoAdjust) {
				this.drawText(this._text, this.textPadding(), 0, this.contentsWidth());
			} else {
				this.drawTextEx(this._text, this.textPadding(), 0);
			}
		}
	};
	
})();

