//=============================================================================
// PANDA_KeywordColor.js
//=============================================================================
// [Update History]
// 2020-08-30 Ver.1.0.0 First Release for MV/MZ.
// 2020-09-06 Ver.1.0.1 Added the Korean Description.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc simplify changing the color of keywords in messages.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200830005445.html
 * 
 * @help In messages, replace the following descriptions as follows.
 * You can change the text color of keywords etc. with a simple description.
 *  <Xsome text> → \C[n]some text\C[0]
 * "X" is one alphabet character that means the kind of word.
 * You can specify the color according to the kind of word,
 * such as blue for the person name and red for the item name etc.
 * 
 * The word kinds and colors can be defined by parameters,
 * and the default is as follows:
 *  N:4 (person Name : blue)
 *  E:4 (Enemy name : blue)
 *  P:6 (Place name : yellow)
 *  I:2 (Item name : red)
 *  S:2 (Skill name : red)
 *  K:27 (other Keyword : pink)
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param KeyList
 * @text Word Kind List
 * @desc The list of an alphabet character that means a kind of the word, "N" as the person name, "I" as the item name etc.
 * @type string[]
 * @default ["N","E","P","I","S","K"]
 * 
 * @param ColorList
 * @text Color Number List
 * @desc The list of a color number for a kind of the word. The Color Number List should correspond to the Word Kind List.
 * @type number[]
 * @default ["4","4","6","2","2","27"]
 * @max 31
 * @min 0
 */

/*:ja
 * @target MV MZ
 * @plugindesc 文章中で重要語句の文字色変更を簡略化できます。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200830005445.html
 * 
 * @help 文章の表示や説明文等において、以下の記述を次のように置き換えます。
 * 簡単な記述で、重要語句等の文字色を変更することができます。
 *  <X文章> → \C[n]文章\C[0]
 * "X"の部分には語句の種類を表すアルファベット1文字が入ります。
 * 人名は青、アイテム名は赤など、語句の種類に応じて色の指定が可能です。
 * 
 * 語句の種類と色はパラメータで定義が可能で、デフォルトは以下となっています。
 *  N:4（人名：青）
 *  E:4（敵キャラ名：青）
 *  P:6（地名：黄）
 *  I:2（アイテム名：赤）
 *  S:2（スキル名：赤）
 *  K:27（その他の重要語句：ピンク）
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param KeyList
 * @text 語句種リスト
 * @desc 人名に"N"、アイテム名に"I"など、語句の種類を表す英字1文字のリスト。
 * @type string[]
 * @default ["N","E","P","I","S","K"]
 * 
 * @param ColorList
 * @text 色番号リスト
 * @desc 語句種リストに対応する色番号のリスト。語句種リストと対応させる必要があります。
 * @type number[]
 * @default ["4","4","6","2","2","27"]
 * @max 31
 * @min 0
 */

/*:ko
 * @target MV MZ
 * @plugindesc 텍스트중에서 중요 단어의 글자 색 변경이 간단해집니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200830005445.html
 * 
 * @help 텍스트 표시나 설명등에서 이하의 기술을 다음과 같이 바꿉니다.
 * 쉬운 기술로 중요 단어의 글자 색깔을 변경할 수 있습니다.
 *  <X텍스트> → \C[n]텍스트\C[0]
 * "X" 부분에는 단어의 종류를 나타내는 알파벳 1글자가 들어갑니다.
 * 인명은 파란색, 아이템명은 빨간색등, 단어의 종류에 따라 색깔 지정이 가능합니다.
 * 
 * 단어의 종류와 색깔은 매개변수애서 정의가 되며 기본값은 다음과 같습니다.
 *  N:4 (인명 : 파랑)
 *  E:4 (적 캐릭터명 : 파랑)
 *  P:6 (지명 : 노랑)
 *  I:2 (아이템명 : 빨강)
 *  S:2 (스킬명 : 빨강)
 *  K:27 (기타 중요단어 : 핑크)
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param KeyList
 * @text 종류 리스트
 * @desc 인명에 "N", 아이템명에 "I"등, 단어의 종류를 나타내는 알파벳 1글자 리스트.
 * @type string[]
 * @default ["N","E","P","I","S","K"]
 * 
 * @param ColorList
 * @text 색 번호 리스트
 * @desc 종류 리스트에 대응되는 색 번호 리스트. 종류 리스트와 대응시켜야 합니다.
 * @type number[]
 * @default ["4","4","6","2","2","27"]
 * @max 31
 * @min 0
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const KeyList = JSON.parse(parameters['KeyList']) || [];
	const ColorList = JSON.parse(parameters['ColorList']) || [];
	
	// Key String for RegExp and [Key => Color] Map
	let keyString = '';
	let keyMap = new Map();
	for (let i in KeyList) {
		let k = KeyList[i];
		if (k) {
			k = k.charAt(0).toUpperCase();
			let c = parseInt(ColorList[i]) || 0;
			keyString += k;
			keyMap.set(k, c);
		}
	}
	
	// RegExp Object
	const keyRegExp = new RegExp("<([" + keyString + "])(.+?)>", "ig");
	
	
	//--------------------------------------------------
	// Window_Base.convertEscapeCharacters
	//  [Additional Definition]
	//--------------------------------------------------
	const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
	Window_Base.prototype.convertEscapeCharacters = function(text) {
		
		// Convert Keyword String to Color
		text = text.replace(keyRegExp, function() {
			let k = arguments[1].toUpperCase();
			let c = keyMap.get(k) || 0;
			return "\\C[" + c + "]" + arguments[2] + "\\C[0]";
		}.bind(this));
		
		// Original Processing
		text = _Window_Base_convertEscapeCharacters.call(this, text);
		
		return text;
		
	};
	
})();

