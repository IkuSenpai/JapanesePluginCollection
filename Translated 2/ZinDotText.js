//=============================================================================
// RPG Maker MZ - Dot Text
//
// Copyright 2021 Huuzin
// Released under Free license
//
// ver 1.0.1	Release data: 2021/08/09
//				透過判定閾値を設定できるように変更 / Changed to allow setting of the transparency judgment threshold.
//				English support
// ver 1.0.0	Release data: 2021/07/04
//				初版公開(First release)
// 
// https://huuzin.net
// 
//=============================================================================


/*
* @target MZ
* @plugindesc ver 1.0.1 Makes bitmap text appear clearer.
* @author Huuzin
* @url https://huuzin.net/2021/07/04/dottext/
* @base PluginCommonBase
* @orderAfter PluginCommonBase

* @help
* Removes outlines and makes bitmap text appear clearer.
* You can also change the size of each font to specify the exact bitmap size.
* For use with ZinPixelFilter.
*
* This plugin is based on the following website.
* https://qiita.com/Nanashia/items/779e2f52637d7adefe4a
* https://forums.rpgmakerweb.com/index.php?threads/removing-font-blur.75294/#post-708149
* Huuzin's plug-ins are basically under the MIT license, but this plug-in is under a free license because it was created based on the above pages.
*
* ---For Use---
* 1. Turn on the plugi-n.
*
* ---Verification---
* Core-Script: v1.3.2
* PluginCommonBase is required for this plugin to work.
* PluginCommonBase: https://triacontane.blogspot.com/2020/08/rpgmz.html
*
*
 * @param ***Font Size***
 * @param damegeFontSize
 * @text Damage display
 * @desc Specifies how much the font size of the damage display will be the font size of the setting screen + how much.
 * @default 4
 * @type number
 * @min -100
 * 
 * @param labelFontSize
 * @text Label display
 * @desc Specifies how much the font size of the label display will be the font size of the setting screen + how much.
 * @default -2
 * @type number
 * @min -100
 * 
 * @param valueFontSize
 * @text Gauge display
 * @desc Specifies how much the font size of the guage display will be the font size of the setting screen + how much.
 * @default -6
 * @type number
 * @min -100
 * 
 * @param timerFontSize
 * @text Timer display
 * @desc Specifies how much the font size of the timer display will be the font size of the setting screen + how much.
 * @default 8
 * @type number
 * @min -100
 * 
 * @param bsFontSize
 * @text font size display
 * @desc Specifies how much + the font size will be when the font size in the message is changed.
 * @default 12
 * @type number
 * @min -100
 * 
 * 
 * @param ***Special***
 * @param alphaThreshold
 * @text Through Threshold
 * @desc Specifies how much opacity should not be drawn if the opacity is less than the specified value. The value is multiplied by the overall opacity of the target character.
 * @default 0.4
 * @type number
 * @decimals 3
 * @min 0
*/

/*:ja
* @target MZ
* @plugindesc ver 1.0.1 ビットマップテキストをくっきり表示させます。
* @author Huuzin
* @url https://huuzin.net/2021/07/04/dottext/
* @base PluginCommonBase
* @orderAfter PluginCommonBase

* @help
* アウトラインを除去し、ビットマップテキストをくっきり表示させます。
* また、ビットマップサイズを正確に指定するために、各フォントサイズを変更できます。
* ZinPixelFilterとの併用を想定しています。
*
* 本プラグインは以下のサイトを参考にしました。
* https://qiita.com/Nanashia/items/779e2f52637d7adefe4a
* https://forums.rpgmakerweb.com/index.php?threads/removing-font-blur.75294/#post-708149
* Huuzinのプラグインは基本MITライセンスですが、本プラグインは上記サイトを元に作成されたためフリーライセンスとします。
*
* ---使用方法---
* 1. プラグインをONにします。
*
* ---動作確認---
* コアスクリプト：v1.3.2
* 本プラグインの動作にはPluginCommonBaseが必要です。
* PluginCommonBase: https://triacontane.blogspot.com/2020/08/rpgmz.html
*
*
 * @param ***フォントサイズ***
 * @param damegeFontSize
 * @text ダメージ表示
 * @desc ダメージ表示のフォントサイズが設定画面のフォントサイズ＋いくらになるかを指定します。
 * @default 4
 * @type number
 * @min -100
 * 
 * @param labelFontSize
 * @text ラベル表示
 * @desc ラベル表示のフォントサイズが設定画面のフォントサイズ＋いくらになるかを指定します。
 * @default -2
 * @type number
 * @min -100
 * 
 * @param valueFontSize
 * @text ゲージ数値表示
 * @desc ゲージ数値表示のフォントサイズが設定画面のフォントサイズ＋いくらになるかを指定します。
 * @default -6
 * @type number
 * @min -100
 * 
 * @param timerFontSize
 * @text タイマー表示
 * @desc タイマー表示のフォントサイズが設定画面のフォントサイズ＋いくらになるかを指定します。
 * @default 8
 * @type number
 * @min -100
 * 
 * @param bsFontSize
 * @text フォント大小表示
 * @desc メッセージ中のフォントサイズを変更したときのフォントサイズがいくら＋になるかを指定します。
 * @default 12
 * @type number
 * @min -100
 * 
 * 
 * @param ***特殊***
 * @param alphaThreshold
 * @text 透過閾値
 * @desc 不透明度がいくら以下なら描画しないかを設定します。対象文字の全体の不透明度に掛け算して指定されます。
 * @default 0.4
 * @type number
 * @decimals 3
 * @min 0
*/


(() => {
    'use strict';
	const script = document.currentScript;
	const param  = PluginManagerEx.createParameter(script);

	const _Bitmap_prototype__drawTextBody = Bitmap.prototype._drawTextBody;
	Bitmap.prototype._drawTextBody = function(text, tx, ty, maxWidth) {
		if(this.width <= 0){
			_Bitmap_prototype__drawTextBody.apply(this,arguments);
		}else{
			var context = this._context;
			context.imageSmoothingEnabled = false;
			context.fillStyle = this.textColor;
			context.fillText(text, tx, ty);

			var imageData = context.getImageData(0, 0, this.width, this.height);
			var data = imageData.data;
			const targetAlpha = 255 * context.globalAlpha * param.alphaThreshold;
			for (var i = 0; i < data.length; i += 4) {
			    if(data[i + 3] < targetAlpha) data[i + 3] = 0;
			}
			context.putImageData(imageData, 0, 0);
		}
	};

	//-------------------------------------------------------------------------------------------------
	//	Change fontsize
    //-------------------------------------------------------------------------------------------------
	const _Sprite_Damage_prototype_fontSize = Sprite_Damage.prototype.fontSize;
	Sprite_Damage.prototype.fontSize = function() {
		_Sprite_Damage_prototype_fontSize.apply(this,arguments);
		return $gameSystem.mainFontSize() + param.damegeFontSize;
	};

	const _Sprite_Gauge_prototype_labelFontSize = Sprite_Gauge.prototype.labelFontSize;
	Sprite_Gauge.prototype.labelFontSize = function() {
		_Sprite_Gauge_prototype_labelFontSize.apply(this,arguments);
		return $gameSystem.mainFontSize() + param.labelFontSize;
	};

	const _Sprite_Gauge_prototype_valueFontSize = Sprite_Gauge.prototype.valueFontSize;
	Sprite_Gauge.prototype.valueFontSize = function() {
		_Sprite_Gauge_prototype_valueFontSize.apply(this,arguments);
		return $gameSystem.mainFontSize() + param.valueFontSize;
	};

	const _Sprite_Timer_prototype_fontSize = Sprite_Timer.prototype.fontSize;
	Sprite_Timer.prototype.fontSize = function() {
		_Sprite_Timer_prototype_fontSize.apply(this,arguments);
		return $gameSystem.mainFontSize() + param.timerFontSize;
	};

	Window_Base.prototype.makeFontBigger = function() {
		this.contents.fontSize += param.bsFontSize;
	};
	
	Window_Base.prototype.makeFontSmaller = function() {
		this.contents.fontSize -= param.bsFontSize;
	};

	//-------------------------------------------------------------------------------------------------
	//	Remove outlines
    //-------------------------------------------------------------------------------------------------
	const _Sprite_Damage_prototype_outlineWidth = Sprite_Damage.prototype.outlineWidth;
	Sprite_Damage.prototype.outlineWidth = function() {
		_Sprite_Damage_prototype_outlineWidth.apply(this,arguments);
		return 0;
	};

	const _Sprite_Gauge_prototype_labelOutlineWidth = Sprite_Gauge.prototype.labelOutlineWidth;
	Sprite_Gauge.prototype.labelOutlineWidth = function() {
		_Sprite_Gauge_prototype_labelOutlineWidth.apply(this,arguments);
		return 0;
	};

	const _Sprite_Gauge_prototype_valueOutlineWidth = Sprite_Gauge.prototype.valueOutlineWidth;
	Sprite_Gauge.prototype.valueOutlineWidth = function() {
		_Sprite_Gauge_prototype_valueOutlineWidth.apply(this,arguments);
		return 0;
	};

	const _Sprite_Name_prototype_outlineWidth = Sprite_Name.prototype.outlineWidth;
	Sprite_Name.prototype.outlineWidth = function() {
		_Sprite_Name_prototype_outlineWidth.apply(this,arguments);
		return 0;
	};

	const _Bitmap_prototype__drawTextOutline = Bitmap.prototype._drawTextOutline;
	Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
		this.context.globalAlpha = 0;
		_Bitmap_prototype__drawTextOutline.apply(this,arguments);
	};

})();