/*:
* @target MZ
* @plugindesc ＨＰやＭＰの最大値見たくなった時に使うアレ
* Ver 1.0.5
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help LookAtMHPMMP.js
*
* 基本的にはデフォルトのシステム用に作られています。
*
* ＜アレ＞
* ＭＺで無くなってしまった「最大ＨＰ最大ＭＰ表示」を無理やり詰め込みました。
* 全シーンに適用されます。
* それぞれ表示最大桁数を１～４桁で調整できます。
* あくまで「常識的な潰れてないサイズ」で表示保証できる桁数です。
* 設定桁数より桁数が多くなると表示が潰れます。
*
* 最大値のフォントサイズや縦位置も調整可能です。
*
* ＜他＞
* プラグインコマンドはありません。
*
* 設定変更して戦闘テストする場合、
* 戦闘テスト前にセーブしないと反映されませんのでご注意ください。
*
* 無保証。改造自由。
* 利用も商用・無償・年齢区分にかかわらず自由。
* ライセンスはＭＩＴでたのんます。
* 改造する時このヘルプの下部にあるＭＩＴに関する文章をいじくらなければＯＫ。
*
* ＜履歴＞
* Ver 1.0.5(22/05/15)
* ・位置調整のミスを修正。
*
* Ver 1.0.4(20/09/25)
* ・表示判定方法を変更。
*
* Ver 1.0.3(20/09/08)
* ・「最大値のフォントサイズの小ささっプリ」の最大設定値を２４に、
* 　最低値を０に変更。
*
* Ver 1.0.2(20/09/05)
* ・ＴＰが表示されなくなっていたのを修正。
* ・ついでにＴＰの最大値表示に対応（デフォルトは０）。
* ・０設定を新設。０で最大値を非表示にできます（ＨＰ・ＭＰ・ＴＰ３つとも）。
* ・説明などをちょっと修正。
*
* Ver 1.0.1(20/08/28)
* ・とりあえずＭＩＴライセンス化。
*
* Ver 1.0.0(20/08/26)
* ・完成。
*
* ＜ＭＩＴライセンス条文＞
* MIT License
* 
* Copyright (c) 2020-2022 木下英一
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.

* @param digit_HP
* @text ＨＰの最大桁数
* @desc １～４までを指定してください。０で非表示です。指定桁数を超えてしまうと細くなってかっこ悪くなります。
* @default 4
* @type number
* @max 4
* @min 0

* @param digit_MP
* @text ＭＰの最大桁数
* @desc １～４までを指定してください。０で非表示です。指定桁数を超えてしまうと細くなってかっこ悪くなります。
* @default 3
* @type number
* @max 4
* @min 0

* @param digit_TP
* @text ＴＰの最大桁数
* @desc １～４までを指定してください。０で非表示です。指定桁数を超えてしまうと細くなってかっこ悪くなります。
* @default 0
* @type number
* @max 4
* @min 0

* @param digit_fontsize_sub
* @text 最大値のフォントサイズの小ささっプリ
* @desc 値を大きくすると小さくなります。６にすると通常値と同じ大きさになります。大きくしすぎると豆粒です。
* @default 12
* @type number
* @max 24
* @min 0

* @param maxvalue_y_offset
* @text 最大値のフォントの縦位置
* @desc フォントサイズをいじっちゃった場合に設定してください。
* @default 2
* @type number
* @max 20
* @min -20

* @param battle
* @text 戦闘中に表示するかどうか
* @desc これを有効にすると、戦闘中に表示します。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！
*/
(() => {
	'use strict';
	//-----------------------------------------------------------------------------
	//
	//
	// パラメータをほじくるときに使います

	let plugin_params = PluginManager.parameters("LookAtMHPMMP");
	if(!plugin_params["digit_HP"]){plugin_params["digit_HP"] = "4";}
	if(!plugin_params["digit_MP"]){plugin_params["digit_MP"] = "3";}
	if(!plugin_params["digit_TP"]){plugin_params["digit_TP"] = "0";}
	if(!plugin_params["digit_fontsize_sub"]){plugin_params["digit_fontsize_sub"] == "12";}
	if(!plugin_params["maxvalue_y_offset"]){plugin_params["maxvalue_y_offset"] == "2";}
	if(!plugin_params["battle"]){plugin_params["battle"] == "true";}

	//-----------------------------------------------------------------------------
	// Sprite_Gauge
	//
	// ステータスゲージを表示するためのスプライトです。

	const old_sprite_gauge_init_members = Sprite_Gauge.prototype.initMembers;
	Sprite_Gauge.prototype.initMembers = function() {
		old_sprite_gauge_init_members.apply(this, arguments);
		this._digitHP = parseInt(plugin_params["digit_HP"], 10);
		this._digitMP = parseInt(plugin_params["digit_MP"], 10);
		this._digitTP = parseInt(plugin_params["digit_TP"], 10);
		this._maxValueFontSub = parseInt(plugin_params["digit_fontsize_sub"], 10);
		this._maxValueYOffset = parseInt(plugin_params["maxvalue_y_offset"], 10);
	};

	Sprite_Gauge.prototype.drawValue = function() {
		let digit = 4;
		let isShow = parseInt(plugin_params["digit_" + this._statusType.toUpperCase()]) > 0;
		if(SceneManager._scene.constructor === Scene_Battle){
			isShow = plugin_params["battle"] === "true" && isShow;
		}
		switch(this._statusType){
			case "hp":
				digit = this._digitHP;
				break;
			case "mp":
				digit = this._digitMP;
				break;
			case "tp":
				digit = this._digitTP;
				break;
			default:
				//HPでもMPでもTPでもないならもうなんもしない
				return;
		}

		const currentValue = this.currentValue();
		const width = this.bitmapWidth();
		const height = this.bitmapHeight();
		if(isShow === true){
			//表示する
			const currentMaxValue = this.currentMaxValue();
			this.setupValueFont();
			const valueText_width = this.bitmap.measureTextWidth("0".repeat(digit));
			this.setupMaxValueFont();
			const slash_char_width = this.bitmap.measureTextWidth("/");
			const maxValueText_width = this.bitmap.measureTextWidth("0".repeat(digit));
			const valueTextArea_x_start = width - valueText_width - slash_char_width - maxValueText_width;
			const maxValueTextArea_y_start = this._maxValueYOffset;

			this.setupValueFont();
			this.bitmap.drawText(currentValue, valueTextArea_x_start, maxValueTextArea_y_start, valueText_width, height, "right");
			this.setupMaxValueFont();
			this.bitmap.drawText("/", valueTextArea_x_start + valueText_width, maxValueTextArea_y_start, slash_char_width, height, "right");
			this.bitmap.drawText(currentMaxValue.toString(10), valueTextArea_x_start + valueText_width + slash_char_width, maxValueTextArea_y_start, maxValueText_width, height, "right");
		}else{
			//表示はいらない（いつもの）
			let maxValueTextArea_y_start = 0;
			if(this._statusType === "tp"){
				maxValueTextArea_y_start = this._maxValueYOffset;
			}
			this.setupValueFont();
			this.bitmap.drawText(currentValue, 0, maxValueTextArea_y_start, width, height, "right");
		}
	};

	Sprite_Gauge.prototype.maxValueFontSize = function() {
		return $gameSystem.mainFontSize() - this._maxValueFontSub;
	};

	Sprite_Gauge.prototype.setupMaxValueFont = function() {
		this.bitmap.fontFace = this.valueFontFace();
		this.bitmap.fontSize = this.maxValueFontSize();
		this.bitmap.textColor = this.valueColor();
		this.bitmap.outlineColor = this.valueOutlineColor();
		this.bitmap.outlineWidth = this.valueOutlineWidth();
	};
})();