//=============================================================================
// PANDA_RubyText.js
//=============================================================================
// [Update History]
// 2020-09-20 Ver.1.0.0 First Release for MZ.
// 2020-09-26 Ver.1.0.1 Fixed getting parameters.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MZ
 * @plugindesc テキストにルビを振ることができます。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200920202955.html
 * 
 * @help 以下の記述でテキストにルビを振ることができます。
 * {漢字|ルビ}
 * 
 * 例：この{記述|きじゅつ}でルビが{振|ふ}れます。{超|ちょう}{凄|すご}い！
 * 
 * 「文章の表示」だけでなく、アイテム名や説明欄、敵キャラ名等にも対応しています。
 * タイトル画面やメニュー画面、オプション画面等のコマンド選択欄は非対応です。
 * フォントサイズがデフォルトの26、1行の高さが標準の36に対して、
 * ルビのフォントサイズ10を前提としており、
 * 各ウィンドウの高さ調整などはしていません。
 * フォントサイズ等をデフォルトから変更している場合は、
 * ルビに合わせてウィンドウの高さを調整する必要があるかもしれません。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param RubyFontSize
 * @text ルビのフォントサイズ
 * @desc ルビのフォントサイズを指定します。
 * @type number
 * @default 10
 * @max 32
 * @min 0
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const RubyFontSize = parseInt(parameters['RubyFontSize']) || 10;
	const RubyFontHeight = RubyFontSize;
	
	
	//--------------------------------------------------
	// Window_Base.isRuby
	//  [New Definition]
	//--------------------------------------------------
	Window_Base.prototype.isRuby = function() {
		// set in each Window object
		return false;
	};
	
	
	//--------------------------------------------------
	// Window_Base.drawTextRuby
	//  [New Definition]
	//--------------------------------------------------
	Window_Base.prototype.drawTextRuby = function(text, x, y, maxWidth, align, isRuby = true) {
		
		// convert string
		text = text + '';
		
		// const
		const rtl = Utils.containsArabic(text);
		const RubyHeight = isRuby ? Window_Base.prototype.lineHeight() - $gameSystem.mainFontSize() : 0;
		
		// alignment
		if (align === 'center') {
			// center
			const width = this.textWidth(this.deleteRuby(text));
			x = x + (maxWidth - width) / 2;
		} else if (align === 'right') {
			// right
			const width = this.textWidth(this.deleteRuby(text));
			x = x + (maxWidth - width);
		}
		
		// text loop
		while (text !== '') {
			
			// get the next character and slice the text
			let c = text.charAt(0);
			text = text.substring(1);
			
			// switch by the next character
			if (c === '{') {
				
				// ruby start
				let b = '';
				let r = '';
				// parse kanji and ruby
				text = text.replace(/(.+?)\|(.+?)\}/, function() {
					b = arguments[1];
					r = arguments[2];
					return '';
				}.bind(this));
				// draw kanji
				const fs = this.contents.fontSize;
				const bw = this.textWidth(b);
				x = rtl ? x - bw : x;
				this.contents.drawText(b, x, y + RubyHeight, bw, fs);
				// change font for ruby
				this.contents.fontSize = RubyFontSize;
				// get the width of ruby
				let rw = this.textWidth(r);
				let ro = 0;
				if (rw > bw) {
					rw = bw;
				} else {
					ro = (bw - rw) / 2
				}
				// draw ruby
				this.contents.drawText(r, x + ro, y, rw, RubyFontHeight, 'center');
				// change to font original
				this.contents.fontSize = fs;
				// next position
				x += rtl ? -bw : bw;
				
			} else {
				
				// normal characters
				const fs = this.contents.fontSize;
				const w = this.textWidth(c);
				x = rtl ? x - w : x;
				this.contents.drawText(c, x, y + RubyHeight, w, fs);
				x += rtl ? -w : w;
				
			}
			
		}
		
	};
	
	
	//--------------------------------------------------
	// Window_Base.deleteRuby
	//  [New Definition]
	//--------------------------------------------------
	Window_Base.prototype.deleteRuby = function(text) {
		// delete ruby from text with ruby
		text = text + '';
		text = text.replace(/\{([^\{]+?)\|(.+?)\}/g, "$1");
		return text;
	};
	
	
	//--------------------------------------------------
	// Window_Base.drawText
	//  [Modified Definition]
	//--------------------------------------------------
	const _Window_Base_drawText = Window_Base.prototype.drawText;
	Window_Base.prototype.drawText = function(text, x, y, maxWidth, align, isRuby = true) {
		if (this.isRuby()) {
			// draw text with ruby
			this.drawTextRuby(text, x, y, maxWidth, align, isRuby);
		} else {
			// Original Processing
			text = this.deleteRuby(text);
			_Window_Base_drawText.call(this, text, x, y, maxWidth, align);
		}
	};
	
	
	//--------------------------------------------------
	// Window_Base.flushTextState
	//  [Modified Definition]
	//--------------------------------------------------
	const _Window_Base_flushTextState = Window_Base.prototype.flushTextState;
	Window_Base.prototype.flushTextState = function(textState) {
		if (this.isRuby()) {
			const text = textState.buffer;
			const rtl = textState.rtl;
	    const width = this.textWidth(this.deleteRuby(text));
	    const height = textState.height;
	    const x = rtl ? textState.x - width : textState.x;
	    const y = textState.y;
			if (textState.drawing) {
				// draw text with ruby
				this.drawTextRuby(text, x, y, width);
			}
			textState.x += rtl ? -width : width;
			textState.buffer = this.createTextBuffer(rtl);
			const outputWidth = Math.abs(textState.x - textState.startX);
			if (textState.outputWidth < outputWidth) {
				textState.outputWidth = outputWidth;
			}
			textState.outputHeight = y - textState.startY + height;
		} else {
			// Original Processing
			textState.buffer = this.deleteRuby(textState.buffer);
			_Window_Base_flushTextState.call(this, textState);
		}
	};
	
	
	//--------------------------------------------------
	// Window_Base.convertEscapeCharacters
	//  [Additional Definition]
	//--------------------------------------------------
	const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text) {
		
		// Original Processing
		text = _Window_Base_convertEscapeCharacters.call(this, text);
		
		// convert ruby text
		text = text.replace(/\{([^\{]+?)\|(.+?)\}/g, "\x1e{$1|$2}");
		
		return text;
		
	};
	
	
	//--------------------------------------------------
	// Window_Base.processControlCharacter
	//  [Additional Definition]
	//--------------------------------------------------
	const _Window_Base_processControlCharacter = Window_Base.prototype.processControlCharacter;
	Window_Base.prototype.processControlCharacter = function(textState, c) {
		
		// Original Processing
		_Window_Base_processControlCharacter.call(this, textState, c);
		
		// convert ruby text
		if (c === "\x1e") {
			const regExp = /^\{(.+?)\|(.+?)\}/;
			const result = regExp.exec(textState.text.slice(textState.index));
			if (result) {
				textState.index += result[0].length;
				textState.buffer += result[0];
			}
		}
		
	};
	
	
	//--------------------------------------------------
	// Window_*.isRuby
	//  [New Definition]
	//--------------------------------------------------
	// set in each window whether to display ruby
	
	// Window_StatusBase
	Window_StatusBase.prototype.isRuby = function() {
		return true;
	};
	
	// Window_ItemList
	Window_ItemList.prototype.isRuby = function() {
		return true;
	};
	
	// Window_SkillList
	Window_SkillList.prototype.isRuby = function() {
		return true;
	};
	
	// Window_EquipSlot
	Window_EquipSlot.prototype.isRuby = function() {
		return true;
	};
	
	// Window_ShopBuy
	Window_ShopBuy.prototype.isRuby = function() {
		return true;
	};
	
	// Window_ShopNumber
	Window_ShopNumber.prototype.isRuby = function() {
		return true;
	};
	
	// Window_NameEdit (false under Window_StatusBase)
	Window_NameEdit.prototype.isRuby = function() {
		return false;
	};
	
	// Window_NameBox
	Window_NameBox.prototype.isRuby = function() {
		return true;
	};
	
	// Window_ChoiceList
	Window_ChoiceList.prototype.isRuby = function() {
		return true;
	};
	
	// Window_Help
	Window_Help.prototype.isRuby = function() {
		return true;
	};
	
	// Window_Message
	Window_Message.prototype.isRuby = function() {
		return true;
	};
	
	// Window_ScrollText
	Window_ScrollText.prototype.isRuby = function() {
		return true;
	};
	
	// Window_MapName
	Window_MapName.prototype.isRuby = function() {
		return true;
	};
	
	// Window_BattleLog
	Window_BattleLog.prototype.isRuby = function() {
		return true;
	};
	
	// Window_BattleEnemy
	Window_BattleEnemy.prototype.isRuby = function() {
		return true;
	};
	
	
	//--------------------------------------------------
	// Window_ShopNumber.drawMultiplicationSign
	//  [Additional Definition]
	//--------------------------------------------------
	const _Window_ShopNumber_drawMultiplicationSign = Window_ShopNumber.prototype.drawMultiplicationSign;
	Window_ShopNumber.prototype.drawMultiplicationSign = function() {
		// adjust y-position in MultiplicationSign
		Window_ShopNumber.prototype.isRuby = function() { return false; };
		_Window_ShopNumber_drawMultiplicationSign.call(this);
		Window_ShopNumber.prototype.isRuby = function() { return true; };
	};
	
	//--------------------------------------------------
	// Window_ShopNumber.drawNumber
	//  [Additional Definition]
	//--------------------------------------------------
	const _Window_ShopNumber_drawNumber = Window_ShopNumber.prototype.drawNumber;
	Window_ShopNumber.prototype.drawNumber = function() {
		// adjust y-position in Number
		Window_ShopNumber.prototype.isRuby = function() { return false; };
		_Window_ShopNumber_drawNumber.call(this);
		Window_ShopNumber.prototype.isRuby = function() { return true; };
	};
	
})();

