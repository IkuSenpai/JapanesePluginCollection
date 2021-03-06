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
 * @plugindesc ??????????????????????????????????????????????????????????????????????????????
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210125012307.html
 * 
 * @help ????????????????????????????????????????????????????????????????????????????????????
 * ?????????????????????????????????????????????????????????????????????????????????????????????????????????
 * ????????????????????????????????????????????????????????????????????????????????????????????????
 * 
 * ?????????????????????XY??????????????????????????????????????????????????????????????????????????????
 * ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * MZ??????????????????????????????????????????????????????????????????????????????
 * MV?????????????????????????????????????????????????????????????????????????????????????????????
 * 
 * ??? ????????????
 * ????????????????????????MIT???????????????????????????????????????
 * ????????????????????????????????????
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ProgressVariable
 * @text ???????????????
 * @desc ???????????????????????????????????????????????????????????????????????????????????????
 * @type variable
 * @default 0
 * 
 * @param ProgressText
 * @text ?????????????????????
 * @desc ??????????????????????????????????????????????????????????????????????????????????????????????????????1????????????????????????"\n"???????????????????????????
 * @type string[]
 * @default 
 * 
 * @param TextWidthAutoAdjust
 * @text ???????????????????????????
 * @desc ON?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * @type boolean
 * @default false
 * 
 * @param WindowLayout
 * @text ??????????????????????????????
 * @desc ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * @type struct<rect>
 * 
 */
/*~struct~rect:ja:
 * 
 * @param IsDefault
 * @text ??????????????????????????????
 * @desc ON?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
 * @type boolean
 * @default true
 * 
 * @param Left
 * @text ?????????????????????X??????
 * @desc ???????????????????????????X??????????????????????????????????????????
 * @type number
 * @default 0
 * 
 * @param Top
 * @text ?????????????????????Y??????
 * @desc ???????????????????????????Y??????????????????????????????????????????
 * @type number
 * @default 0
 * 
 * @param Width
 * @text ??????????????????
 * @desc ?????????????????????????????????????????????????????????
 * @type number
 * @default 808
 * 
 * @param Height
 * @text ?????????????????????
 * @desc ????????????????????????????????????????????????????????????
 * @type number
 * @default 52
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc ?????? ????????? ???????????? ????????? ???????????? ???????????? ???????????????.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210125012307.html
 * 
 * @help ?????? ????????? ???????????? ???????????? ???????????? ???????????????.
 * ???????????? ?????? ????????? ????????? ?????? ?????? ?????? ???????????? ???????????????.
 * ????????? ???????????? ?????? ?????? ????????? ?????? ??????????????? ????????? ?????????.
 * 
 * ???????????? XY????????? ???/????????? ???????????? ????????? ????????? ????????? ??? ????????????.
 * ?????? ??????????????? ?????? ?????? ????????? ??? ????????? ???????????????.
 * MZ????????? ?????? ?????? ??????, ?????? ?????? ?????????,
 * MV????????? ?????? ????????? ????????? ????????? ????????? ???????????????.
 * 
 * [?????? ??????]
 * ??? ??????????????? MIT ??????????????? ???????????????.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param ProgressVariable
 * @text ????????? ??????
 * @desc ???????????? ???????????? ???????????? ????????? ???????????? ????????? ???????????????.
 * @type variable
 * @default 0
 * 
 * @param ProgressText
 * @text ????????? ?????????
 * @desc ????????? ?????? ?????? ?????? ????????? ???????????? ???????????? ???????????????. ???????????? 1?????? ???????????????. "\n"?????? ???????????? ??? ????????????.
 * @type string[]
 * @default 
 * 
 * @param TextWidthAutoAdjust
 * @text ????????? ??? ?????? ??????
 * @desc ON?????? ?????? ??? ??????????????? ???????????? ????????? ?????? ?????? ?????? ???????????????. ???, ???????????? ?????? ????????? ????????? ??? ????????????.
 * @type boolean
 * @default false
 * 
 * @param WindowLayout
 * @text ????????? ????????????
 * @desc ???????????? ????????? ????????? ???????????????. ??????????????? ?????? ?????? ?????? ?????? ??? ????????? ???????????????.
 * @type struct<rect>
 * 
 */
/*~struct~rect:ko:
 * 
 * @param IsDefault
 * @text ?????? ????????????
 * @desc ON?????? ?????? ???????????? ?????? ?????? ????????? ??? ????????? ????????????, ????????? ???????????? ????????? ???????????????.
 * @type boolean
 * @default true
 * 
 * @param Left
 * @text ????????? X??????
 * @desc ????????? ?????? ????????? X????????? ????????? ???????????????.
 * @type number
 * @default 0
 * 
 * @param Top
 * @text ????????? Y??????
 * @desc ????????? ?????? ????????? Y????????? ????????? ???????????????.
 * @type number
 * @default 0
 * 
 * @param Width
 * @text ????????? ???
 * @desc ????????? ?????? ????????? ???????????????.
 * @type number
 * @default 808
 * 
 * @param Height
 * @text ????????? ??????
 * @desc ????????? ????????? ????????? ???????????????.
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

