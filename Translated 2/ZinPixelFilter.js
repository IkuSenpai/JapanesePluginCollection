//=============================================================================
// RPG Maker MZ - Pixel Filter
//
// Copyright 2021 Huuzin
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//
// ver 1.1.0	Release data: 2021/07/19
//				ピクセルサイズを1が選択できるよう修正、指定色モードの色数の変更に対応しディザ機能を追加
// ver 1.0.0	Release data: 2021/07/04
//				初版公開(First release)
// 
// https://huuzin.net
// 
//=============================================================================


/*:ja
* @target MZ
* @plugindesc ver 1.0.0 ピクセルブロック化と減色処理を行います
* @author Huuzin
* @url https://huuzin.net/2021/07/04/pixelfilter/
* @base PluginCommonBase
* @orderAfter PluginCommonBase
*
* @help
* ピクセルを数ドット分まとめたり色数を減らします。
*
* ---使用方法---
* 1. プラグインをONにします。
* 2. 好みに合わせてプラグインパラメータを調整してください。
*
* ---動作確認---
* コアスクリプト：v1.3.0
* 本プラグインの動作にはPluginCommonBaseが必要です。
* PluginCommonBase: https://triacontane.blogspot.com/2020/08/rpgmz.html


 * @param pixelSize
 * @text ピクセルサイズ
 * @desc 1ピクセル当たり何ドットになるかを指定します。
 * @default 3
 * @type number
 * @min 1
 * 
 * @param colorMode
 * @text カラーモード
 * @desc 適用するカラーモードを選択します。
 * @type select
 * @default SpecificColor
 * @option カラーモードなし
 * @value None
 * @option 等間隔モード
 * @value EquallySpaced
 * @option 特定色モード
 * @value SpecificColor
 * 
 *
 * @param ***等間隔モード***
 * @param isMonochrome
 * @text モノクロ化
 * @desc モノクロにするかどうかを指定します。
 * @default false
 * @type boolean
 * 
 * @param sampleScale
 * @text 分解能
 * @desc 各色成分を何色に分解するか指定します。
 * @default 5
 * @type number
 * @min 2
 * 
 * 
 * @param ***特定色モード***
 * @param toneAdjustment
 * @text トーン調整
 * @desc 暗色と明色に基づいたトーン補正を行うかどうかを指定します。
 * @default true
 * @type boolean
 * 
 * @param colorNum
 * @text 色数
 * @desc 色数を２～４で設定します。
 * @type number
 * @default 4
 * @min 2
 * @max 4
 *
 * @param darkestColor
 * @text 最暗色
 * @desc 最も暗い色を指定します
 * @type struct<ColorMatrix>
 * @default {"red":"50","green":"84","blue":"79"}
 * 
 * @param secondColor
 * @text 第２色
 * @desc 第２色を指定します
 * @type struct<ColorMatrix>
 * @default {"red":"88","green":"117","blue":"79"}
 * 
 * @param thirdColor
 * @text 第３色
 * @desc 第３色を指定します
 * @type struct<ColorMatrix>
 * @default {"red":"111","green":"137","blue":"79"}
 * 
 * @param lightestColor
 * @text 第４色
 * @desc 第４色を指定します
 * @type struct<ColorMatrix>
 * @default {"red":"134","green":"163","blue":"90"}
 *
 * @param ditherMode
 * @text ディザモード
 * @desc ディザをかけるかどうかを指定します。
 * @type boolean
 * @default true
 * 
 * @param ditherPattern
 * @text ディザパターン
 * @desc ディザのパターンを示す画像を指定します。
 * @type file
 * @dir img/system
 * 
 * @param ditherLevel
 * @text ディザレベル(%)
 * @desc ディザのかけ具合を%で指定します。0%だと全くかけません。
 * @type number
 * @default 30
 * @min 0
 * @max 100


*
*/

/*~struct~ColorMatrix:
 * @param red
 * @text 赤
 * @desc 
 * @default 128
 * @type number
 * @min 0
 * @max 255
 * 
 * @param green
 * @text 緑
 * @desc 
 * @default 128
 * @type number
 * @min 0
 * @max 255
 * 
 * @param blue
 * @text 青
 * @desc 
 * @default 128
 * @type number
 * @min 0
 * @max 255
*/



(() => {
    'use strict';
    const script = document.currentScript;
	const param  = PluginManagerEx.createParameter(script);

	//-------------------------------------------------------------------------------------------------
	// Global members
    //-------------------------------------------------------------------------------------------------
	let ditherTex;
    

    //-------------------------------------------------------------------------------------------------
    // Static Class
    //-------------------------------------------------------------------------------------------------
	function ZinPixelFilter() {
		throw new Error('This is a static class');
	}

	ZinPixelFilter.convertGray = function(color) {
		if(!color || color.length < 3) return 0;
		return color[0] * 0.298912 + color[1] * 0.586611 + color[2] * 0.114478;
	};

	ZinPixelFilter.loadDitherTex = function() {
		if(!ditherTex){
			ditherTex = ImageManager.loadBitmap("img/system/", param.ditherPattern);
		}
	};


	//-------------------------------------------------------------------------------------------------
    // Scene_Base
    //-------------------------------------------------------------------------------------------------
	const _Scene_Base_prototype_start = Scene_Base.prototype.start;
	Scene_Base.prototype.start = function() {
		_Scene_Base_prototype_start.apply(this,arguments);

		// カラーフィルタ
		if(param.colorMode == "EquallySpaced"){
			if(param.isMonochrome){
				this._pixelColorFilter = new PIXI.filters.EquallySpacedFilter();
			}else{
				this._pixelColorFilter = new PIXI.filters.EquallySpacedColorFilter();
			}
			this.filters.push(this._pixelColorFilter);
		}else if(param.colorMode == "SpecificColor"){
			if(param.ditherMode == true){
				this._pixelColorFilter = new PIXI.filters.SpecificColorFilterDither();
			}else{
				this._pixelColorFilter = new PIXI.filters.SpecificColorFilter();
			}
			this.filters.push(this._pixelColorFilter);
		}

		// モザイクフィルタ
		if(param.pixelSize >= 2){
			this._pixelMosaicFilter = new PIXI.filters.MosaicFilter();
			this.filters.push(this._pixelMosaicFilter);
		}
	};


	//-------------------------------------------------------------------------------------------------
	// SpecificColor Filter
	//-------------------------------------------------------------------------------------------------
	PIXI.filters.SpecificColorFilter = function () {
		let darkestCol = [param.darkestColor.red/255, param.darkestColor.green/255, param.darkestColor.blue/255];
		let secondCol = [param.secondColor.red/255, param.secondColor.green/255, param.secondColor.blue/255];
		let thirdCol = [param.thirdColor.red/255, param.thirdColor.green/255, param.thirdColor.blue/255];
		let lightestCol = [param.lightestColor.red/255, param.lightestColor.green/255, param.lightestColor.blue/255];
		let darkestMono = ZinPixelFilter.convertGray(darkestCol);
		let secondMono = ZinPixelFilter.convertGray(secondCol);
		let thirdMono = ZinPixelFilter.convertGray(thirdCol);
		let lightestMono = ZinPixelFilter.convertGray(lightestCol);
		if(param.toneAdjustment){
			switch(param.colorNum){
				case 2:
					darkestMono = 0;
					secondMono = 1.0;
					break;
				case 3:
					secondMono = (secondMono - darkestMono) / (thirdMono - darkestMono);
					darkestMono = 0;
					thirdMono = 1.0;
					break;
				default:
					const length = lightestMono - darkestMono;
					secondMono = (secondMono - darkestMono) / length;
					thirdMono = (thirdMono - darkestMono) / length;
					darkestMono = 0;
					lightestMono = 1.0;
					break;
			}		
		}


		var uniforms = {
			darkestColor: darkestCol,
			darkestMono: darkestMono,
			secondColor: secondCol,
			secondMono: secondMono,
			thirdColor: thirdCol,
			thirdMono: thirdMono,
			dsMono: (darkestMono + secondMono)*0.5,
			halfMono: (secondMono + thirdMono)*0.5,
			tlMono: (thirdMono + lightestMono)*0.5,
			lightestColor: lightestCol,
			lightestMono: lightestMono
		};

		var fragmentSrc;

		if(param.colorNum == 2){
			fragmentSrc = [
				'precision mediump float;',
				'uniform sampler2D uSampler;',
				'const vec3 monochromeScale = vec3(0.298912, 0.586611, 0.114478);',
				'varying vec2 vTextureCoord;',
	
				'uniform vec3 darkestColor;',
				'uniform float darkestMono;',
				'uniform vec3 secondColor;',
				'uniform float secondMono;',
				'uniform vec3 thirdColor;',
				'uniform float thirdMono;',
				'uniform float halfMono;',
				'uniform vec3 lightestColor;',
				'uniform float lightestMono;',
				'uniform float dsMono;',
				'uniform float tlMono;',
	
				'void main (void) {',
				'vec4 color = texture2D(uSampler, vTextureCoord);',
				'float grayColor = dot(color.rgb, monochromeScale);',
	
				'vec3 step1 = darkestColor * step(1.0 - dsMono,1.0 - grayColor);',
				'vec3 step2 = secondColor * step(dsMono,grayColor);',
	
				'gl_FragColor = vec4(step1+step2, 1.0);',
				'}'
				];
			
		}else if(param.colorNum == 3){
			fragmentSrc = [
				'precision mediump float;',
				'uniform sampler2D uSampler;',
				'const vec3 monochromeScale = vec3(0.298912, 0.586611, 0.114478);',
				'varying vec2 vTextureCoord;',
	
				'uniform vec3 darkestColor;',
				'uniform float darkestMono;',
				'uniform vec3 secondColor;',
				'uniform float secondMono;',
				'uniform vec3 thirdColor;',
				'uniform float thirdMono;',
				'uniform float halfMono;',
				'uniform vec3 lightestColor;',
				'uniform float lightestMono;',
				'uniform float dsMono;',
				'uniform float tlMono;',
	
				'void main (void) {',
				'vec4 color = texture2D(uSampler, vTextureCoord);',
				'float grayColor = dot(color.rgb, monochromeScale);',
	
				'vec3 step1 = darkestColor * step(1.0 - dsMono,1.0 - grayColor);',
				'vec3 step2 = secondColor * step(dsMono,grayColor) * step(1.0 - halfMono,1.0 - grayColor);',
				'vec3 step3 = thirdColor * step(halfMono,grayColor);',
	
				'gl_FragColor = vec4(step1+step2+step3, 1.0);',
				'}'
				];
		}else{
			fragmentSrc = [
				'precision mediump float;',
				'uniform sampler2D uSampler;',
				'const vec3 monochromeScale = vec3(0.298912, 0.586611, 0.114478);',
				'varying vec2 vTextureCoord;',
	
				'uniform vec3 darkestColor;',
				'uniform float darkestMono;',
				'uniform vec3 secondColor;',
				'uniform float secondMono;',
				'uniform vec3 thirdColor;',
				'uniform float thirdMono;',
				'uniform float halfMono;',
				'uniform vec3 lightestColor;',
				'uniform float lightestMono;',
				'uniform float dsMono;',
				'uniform float tlMono;',
	
				'void main (void) {',
				'vec4 color = texture2D(uSampler, vTextureCoord);',
				'float grayColor = dot(color.rgb, monochromeScale);',
	
				'vec3 step1 = darkestColor * step(1.0 - dsMono,1.0 - grayColor);',
				'vec3 step2 = secondColor * step(dsMono,grayColor) * step(1.0 - halfMono,1.0 - grayColor);',
				'vec3 step3 = thirdColor * step(halfMono,grayColor) * step(1.0 - tlMono,1.0 - grayColor);',
				'vec3 step4 = lightestColor * step(tlMono,grayColor);',
	
				'gl_FragColor = vec4(step1+step2+step3+step4, 1.0);',
				'}'
				];
		}

		PIXI.Filter.call(this,
			null, // vertex shader
			fragmentSrc.join('\n'), // fragment shader
			uniforms // uniforms
		);
	};

	PIXI.filters.SpecificColorFilter.prototype = Object.create(PIXI.Filter.prototype);
	PIXI.filters.SpecificColorFilter.prototype.constructor = PIXI.filters.MySpecificColorFilter;


	//-------------------------------------------------------------------------------------------------
	// SpecificColor Filter (Dither)
	//-------------------------------------------------------------------------------------------------
	PIXI.filters.SpecificColorFilterDither = function () {
		let darkestCol = [param.darkestColor.red/255, param.darkestColor.green/255, param.darkestColor.blue/255];
		let secondCol = [param.secondColor.red/255, param.secondColor.green/255, param.secondColor.blue/255];
		let thirdCol = [param.thirdColor.red/255, param.thirdColor.green/255, param.thirdColor.blue/255];
		let lightestCol = [param.lightestColor.red/255, param.lightestColor.green/255, param.lightestColor.blue/255];
		let darkestMono = ZinPixelFilter.convertGray(darkestCol);
		let secondMono = ZinPixelFilter.convertGray(secondCol);
		let thirdMono = ZinPixelFilter.convertGray(thirdCol);
		let lightestMono = ZinPixelFilter.convertGray(lightestCol);
		if(param.toneAdjustment){
			switch(param.colorNum){
				case 2:
					darkestMono = 0;
					secondMono = 1.0;
					break;
				case 3:
					secondMono = (secondMono - darkestMono) / (thirdMono - darkestMono);
					darkestMono = 0;
					thirdMono = 1.0;
					break;
				default:
					const length = lightestMono - darkestMono;
					secondMono = (secondMono - darkestMono) / length;
					thirdMono = (thirdMono - darkestMono) / length;
					darkestMono = 0;
					lightestMono = 1.0;
					break;
			}		
		}

		ZinPixelFilter.loadDitherTex();
		this._ditherTexture = ditherTex;
		let tSamplerW = 1;
		if(ditherTex && this._ditherTexture.baseTexture) tSamplerW = this._ditherTexture.baseTexture.width;

		var uniforms = {
			darkestColor: darkestCol,
			darkestMono: darkestMono,
			secondColor: secondCol,
			secondMono: secondMono,
			thirdColor: thirdCol,
			thirdMono: thirdMono,
			lightestColor: lightestCol,
			lightestMono: lightestMono,

			pixelSize: param.pixelSize,
			tSampler: this._ditherTexture.baseTexture,
			tSamplerW: tSamplerW,
			ditherArea: 0.01 * param.ditherLevel
		};

		var fragmentSrc;
		if(param.colorNum == 2){
			fragmentSrc = [
				'precision mediump float;',
				'uniform sampler2D uSampler;',
				'const vec3 monochromeScale = vec3(0.298912, 0.586611, 0.114478);',
				'varying vec2 vTextureCoord;',

				'uniform vec3 darkestColor;',
				'uniform float darkestMono;',
				'uniform vec3 secondColor;',
				'uniform float secondMono;',
				'uniform vec3 thirdColor;',
				'uniform float thirdMono;',
				'uniform vec3 lightestColor;',
				'uniform float lightestMono;',

				'uniform float pixelSize;',
				'uniform sampler2D tSampler;',
				'uniform float tSamplerW;',
				'uniform float ditherArea;',

				'vec3 Dither(float target, vec2 fc, sampler2D dit, float minColor, float maxColor, vec3 firstColor, vec3 secondColor, float area){',
				'float target3 = (target - minColor) / (maxColor - minColor);',	// Min~Maxを0~1に拡大する
				'float ditColor = (texture2D(dit, fc).r - 0.5) * area + 0.5;',	// ディザ行列を得る
				'vec3 ditherStep = step(ditColor, target3) * secondColor + step(1.0 - ditColor, 1.0 - target3) * firstColor;',	// ディザとターゲットを掛け合わせる
				'return ditherStep * step(1.0 - maxColor, 1.0 - target) * step(minColor, target);',
				'}',

				'void main (void) {',
				'vec2 fc = floor(mod(vec2(gl_FragCoord.s, gl_FragCoord.t), pixelSize*tSamplerW) / pixelSize) / (tSamplerW - 1.0);',
				'vec4 color = texture2D(uSampler, vTextureCoord);',
				'float grayColor = dot(color.rgb, monochromeScale);',

				'vec3 step0 = (1.0 - step(darkestMono,grayColor)) * darkestColor;',
				'vec3 step1 = Dither(grayColor, fc, tSampler, darkestMono, secondMono, darkestColor, secondColor, ditherArea);',
				'vec3 step2 = step(secondMono,grayColor) * secondColor;',

				'gl_FragColor = vec4(step0 + step1 + step2, 1.0);',
				'gl_FragColor.a = 1.0;',
				'}'
				];
		}else if(param.colorNum == 3){
			fragmentSrc = [
				'precision mediump float;',
				'uniform sampler2D uSampler;',
				'const vec3 monochromeScale = vec3(0.298912, 0.586611, 0.114478);',
				'varying vec2 vTextureCoord;',

				'uniform vec3 darkestColor;',
				'uniform float darkestMono;',
				'uniform vec3 secondColor;',
				'uniform float secondMono;',
				'uniform vec3 thirdColor;',
				'uniform float thirdMono;',
				'uniform vec3 lightestColor;',
				'uniform float lightestMono;',

				'uniform float pixelSize;',
				'uniform sampler2D tSampler;',
				'uniform float tSamplerW;',
				'uniform float ditherArea;',

				'vec3 Dither(float target, vec2 fc, sampler2D dit, float minColor, float maxColor, vec3 firstColor, vec3 secondColor, float area){',
				'float target3 = (target - minColor) / (maxColor - minColor);',	// Min~Maxを0~1に拡大する
				'float ditColor = (texture2D(dit, fc).r - 0.5) * area + 0.5;',	// ディザ行列を得る
				'vec3 ditherStep = step(ditColor, target3) * secondColor + step(1.0 - ditColor, 1.0 - target3) * firstColor;',	// ディザとターゲットを掛け合わせる
				'return ditherStep * step(1.0 - maxColor, 1.0 - target) * step(minColor, target);',
				'}',

				'void main (void) {',
				'vec2 fc = floor(mod(vec2(gl_FragCoord.s, gl_FragCoord.t), pixelSize*tSamplerW) / pixelSize) / (tSamplerW - 1.0);',
				'vec4 color = texture2D(uSampler, vTextureCoord);',
				'float grayColor = dot(color.rgb, monochromeScale);',

				'vec3 step0 = (1.0 - step(darkestMono,grayColor)) * darkestColor;',
				'vec3 step1 = Dither(grayColor, fc, tSampler, darkestMono, secondMono, darkestColor, secondColor, ditherArea);',
				'vec3 step2 = Dither(grayColor, fc, tSampler, secondMono, thirdMono, secondColor, thirdColor, ditherArea);',
				'vec3 step3 = step(thirdMono,grayColor) * thirdColor;',

				'gl_FragColor = vec4(step0 + step1 + step2 + step3, 1.0);',
				'gl_FragColor.a = 1.0;',
				'}'
				];
		}else{
			fragmentSrc = [
				'precision mediump float;',
				'uniform sampler2D uSampler;',
				'const vec3 monochromeScale = vec3(0.298912, 0.586611, 0.114478);',
				'varying vec2 vTextureCoord;',

				'uniform vec3 darkestColor;',
				'uniform float darkestMono;',
				'uniform vec3 secondColor;',
				'uniform float secondMono;',
				'uniform vec3 thirdColor;',
				'uniform float thirdMono;',
				'uniform vec3 lightestColor;',
				'uniform float lightestMono;',

				'uniform float pixelSize;',
				'uniform sampler2D tSampler;',
				'uniform float tSamplerW;',
				'uniform float ditherArea;',

				'vec3 Dither(float target, vec2 fc, sampler2D dit, float minColor, float maxColor, vec3 firstColor, vec3 secondColor, float area){',
				'float target3 = (target - minColor) / (maxColor - minColor);',	// Min~Maxを0~1に拡大する
				'float ditColor = (texture2D(dit, fc).r - 0.5) * area + 0.5;',	// ディザ行列を得る
				'vec3 ditherStep = step(ditColor, target3) * secondColor + step(1.0 - ditColor, 1.0 - target3) * firstColor;',	// ディザとターゲットを掛け合わせる
				'return ditherStep * step(1.0 - maxColor, 1.0 - target) * step(minColor, target);',
				'}',

				'void main (void) {',
				'vec2 fc = floor(mod(vec2(gl_FragCoord.s, gl_FragCoord.t), pixelSize*tSamplerW) / pixelSize) / (tSamplerW - 1.0);',
				'vec4 color = texture2D(uSampler, vTextureCoord);',
				'float grayColor = dot(color.rgb, monochromeScale);',

				'vec3 step0 = (1.0 - step(darkestMono,grayColor)) * darkestColor;',
				'vec3 step1 = Dither(grayColor, fc, tSampler, darkestMono, secondMono, darkestColor, secondColor, ditherArea);',
				'vec3 step2 = Dither(grayColor, fc, tSampler, secondMono, thirdMono, secondColor, thirdColor, ditherArea);',
				'vec3 step3 = Dither(grayColor, fc, tSampler, thirdMono, lightestMono, thirdColor, lightestColor, ditherArea);',
				'vec3 step4 = step(lightestMono,grayColor) * lightestColor;',

				'gl_FragColor = vec4(step0 + step1 + step2 + step3 + step4, 1.0);',
				'gl_FragColor.a = 1.0;',
				'}'
				];
		}

		PIXI.Filter.call(this,
			null, // vertex shader
			fragmentSrc.join('\n'), // fragment shader
			uniforms // uniforms
		);
	};

	PIXI.filters.SpecificColorFilterDither.prototype = Object.create(PIXI.Filter.prototype);
	PIXI.filters.SpecificColorFilterDither.prototype.constructor = PIXI.filters.SpecificColorFilterDither;


	//-------------------------------------------------------------------------------------------------
	// EquallySpaced Filter
	//-------------------------------------------------------------------------------------------------
	PIXI.filters.EquallySpacedFilter = function () {
		var uniforms = {
			sampleScale : param.sampleScale
		};
		var fragmentSrc = [
		  'precision mediump float;',
		  'uniform sampler2D uSampler;',
		  'const vec3 monochromeScale = vec3(0.298912, 0.586611, 0.114478);',
		  'varying vec2 vTextureCoord;',
		  'uniform float sampleScale;',

		  'void main (void) {',
		  'vec4 color = texture2D(uSampler, vTextureCoord);',
		  'float grayColor = dot(color.rgb, monochromeScale);',
		  'color = vec4(vec3(grayColor), 1.0);',
		  'vec4 color2 = floor(color * sampleScale) / sampleScale;',
		  ' gl_FragColor = color2;',
		  '}'
		];

		PIXI.Filter.call(this,
			null, // vertex shader
			fragmentSrc.join('\n'), // fragment shader
			uniforms // uniforms
		);
	};

	PIXI.filters.EquallySpacedFilter.prototype = Object.create(PIXI.Filter.prototype);
	PIXI.filters.EquallySpacedFilter.prototype.constructor = PIXI.filters.EquallySpacedFilter;


	//-------------------------------------------------------------------------------------------------
	// EquallySpaced Filter (Color)
	//-------------------------------------------------------------------------------------------------
	PIXI.filters.EquallySpacedColorFilter = function () {
		var uniforms = {
			sampleScale : param.sampleScale
		};
		var fragmentSrc = [
		  'precision mediump float;',
		  'uniform sampler2D uSampler;',
		  'varying vec2 vTextureCoord;',
		  'uniform float sampleScale;',

		  'void main (void) {',
		  'vec4 color = texture2D(uSampler, vTextureCoord);',
		  'vec4 color2 = floor(color * sampleScale) / sampleScale;',
		  ' gl_FragColor = color2;',
		  '}'
		];

		PIXI.Filter.call(this,
			null, // vertex shader
			fragmentSrc.join('\n'), // fragment shader
			uniforms // uniforms
		);
	};

	PIXI.filters.EquallySpacedColorFilter.prototype = Object.create(PIXI.Filter.prototype);
	PIXI.filters.EquallySpacedColorFilter.prototype.constructor = PIXI.filters.EquallySpacedColorFilter;


	//-------------------------------------------------------------------------------------------------
	// Mosaic Filter
	//-------------------------------------------------------------------------------------------------
	PIXI.filters.MosaicFilter = function () {
		var uniforms = {
			widthN: 1.0 / (Graphics.boxWidth + 8.0),
			heightN: 1.0 / (Graphics.boxHeight + 8.0),
			pixelSize: param.pixelSize
		};

		var fragmentSrc = [
		  'precision mediump float;',
		  'uniform sampler2D uSampler;',
		  'uniform vec2 resolution;',
		  'varying vec2 vTextureCoord;',
		  'uniform float widthN;',
		  'uniform float heightN;',
		  'uniform float pixelSize;',
		  'void main (void) {',
		  'vec2 fc = vec2(gl_FragCoord.s, gl_FragCoord.t);',
		  'float halfPixel = floor(pixelSize * 0.5);',
		  'float offsetX = floor(mod(fc.s, pixelSize)) - halfPixel;',
		  'float offsetY = floor(mod(fc.t, pixelSize)) - halfPixel;',
		  'gl_FragColor = texture2D(uSampler, vTextureCoord + vec2(-offsetX*widthN,offsetY*heightN));',
		  '}'
		];

		PIXI.Filter.call(this,
			null, // vertex shader
			fragmentSrc.join('\n'), // fragment shader
			uniforms // uniforms
		);
	};

	PIXI.filters.MosaicFilter.prototype = Object.create(PIXI.Filter.prototype);
	PIXI.filters.MosaicFilter.prototype.constructor = PIXI.filters.MosaicFilter;

	
})();