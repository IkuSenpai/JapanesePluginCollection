//=============================================================================
// RPG Maker MZ - ZinTween
//
// Copyright 2020 Huuzin
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//
// ver 1.5.0	Release data: 2021/10/31
//				エンジンを改良してデータサイズを削減
// ver 1.3.3	Release data: 2021/03/14
//				ウィンドウ背景画像を指定するプラグインとの競合対策
// ver 1.3.2	Release data: 2021/02/13
//				ピクチャを画像なしで表示するとクラッシュする不具合を修正
// ver 1.3.1	Release data: 2021/01/31
//				階段状変化１の動作不具合の修正
//				新規イージングの追加
// ver 1.3.0	Release data: 2021/01/23
//				エンジンの強化
// ver 1.2.3	Release data: 2021/01/11
//				エンジンの強化
//				デフォルトイージングの設定機能はオミット
// ver 1.2.2	Release data: 2020/12/28
//				ピクチャの表示を行う前に「ピクチャにトゥイーン設定」コマンドを呼び出すとエラーが発生する不具合を修正
//				ピクチャ更新関数に関する不具合を修正
// ver 1.2.1	Release data: 2020/10/3
//				ピクチャのトゥイーンにピクチャの回転を追加
// ver 1.2.0	Release data: 2020/9/27
//				プラグインコマンド「ピクチャにトゥイーン設定」を追加
//				プラグインコマンド「ピクチャのトゥイーン削除」を追加
//				各クラスに現在設定しているトゥイーンの削除機能を追加
//				ピクチャのトゥイーンに対応
//				いくつかのイージングが正しく機能しなかったバグを修正
// ver 1.1.0	Release data: 2020/9/13
//				イージング指定関数とパラメータ解析関数追加(今後のバージョンアップで使用)
//				各トゥイーン設定数値内の「-」と「.」が無視される不具合を修正
//				シーケンスの一時停止機能追加
//				終了時呼び出し関数や一時停止関数をthis.～で呼べるように機能追加
//				各オブジェクト配下のシーケンスクラスの変数名を変更
//				その他最適化
// ver 1.0.0	Release data: 2020/9/6
//				初版公開
// 
// https://huuzin.net
// 
//=============================================================================

/*:
* @target MZ
* @plugindesc ver 1.5.0 Provides tween
* @author Huuzin
* @url https://huuzin.net/2020/09/06/zintween/
* @base PluginCommonBase
* @orderAfter PluginCommonBase
*
* @help
* This plugin provides an easy way to implement tweening (moving objects smoothly).
* This plugin is for developers or as a base plugin for other Huuzin provided plugins.

* @command set
* @text Set Picutre's Tween
* @desc Set tweening for the picture.
*
* @arg pictureId
* @type number
* @text Picture ID
* @desc Specify the picture ID.
* @min 1
*
* @arg pictureTween
* @text Tween
* @desc Specify a list of tweens.
* @default []
* @type struct<SpriteTween>[]

* @command deletePict
* @text Deletes Picture's tween
* @desc Deletes the tween set for the picture.
*
* @arg pictureId
* @type number
* @text Picture ID
* @desc Specify the picture ID.
* @min 1
*
*/

/*~struct~SpriteTween:
 * @param tweenType
 * @text Tween
 * @desc Specifies the type of tween. Some tweening cannot be applied to some objects.
 * @type select
 * @default MoveTo
 * @option MoveTo(2)
 * @value MoveTo
 * @option XMoveTo(1)
 * @value XMoveTo
 * @option YMoveTo(1)
 * @value YMoveTo
 * @option MoveFrom(2)
 * @value MoveFrom
 * @option XMoveFrom(1)
 * @value XMoveFrom
 * @option YMoveFrom(1)
 * @value YMoveFrom
 * @option MoveBy(2)
 * @value MoveBy
 * @option XMoveBy(1)
 * @value XMoveBy
 * @option YMoveBy(1)
 * @value YMoveBy
 * @option AlphaTo(1)
 * @value AlphaTo
 * @option AlphaFrom(1)
 * @value AlphaFrom
 * @option ScaleTo(2)
 * @value ScaleTo
 * @option ScaleFrom(2)
 * @value ScaleFrom
 * @option RotationTo(1)
 * @value RotationTo
 * 
 * @param values
 * @text Value
 * @desc Specify the values, separated by commas (e.g., "x, y" for MoveTo and (2), or just "a" for (1)).
 * @default 100
 * @type string
 * 
 * @param next
 * @text Serialization
 * @desc Normally, it will run concurrently with the previous tween, but if true, it will not start until the previous tween is finished.
 * @default false
 * @type boolean
 * 
 * @param easing
 * @text Easing
 * @desc Specifies the type of easing.
 * @type select
 * @default InOutSine
 * @option Slope
 * @value Slope
 * @option InSine
 * @value InSine
 * @option OutSine
 * @value OutSine
 * @option InOutSine
 * @value InOutSine
 * @option InQuad
 * @value InQuad
 * @option OutQuad
 * @value OutQuad
 * @option InOutQuad
 * @value InOutQuad
 * @option InCubic
 * @value InCubic
 * @option OutCubic
 * @value OutCubic
 * @option InOutCubic
 * @value InOutCubic
 * @option InQuart
 * @value InQuart
 * @option OutQuart
 * @value OutQuart
 * @option InOutQuart
 * @value InOutQuart
 * @option InExpo
 * @value InExpo
 * @option OutExpo
 * @value OutExpo
 * @option InOutExpo
 * @value InOutExpo
 * @option InBack
 * @value InBack
 * @option OutBack
 * @value OutBack
 * @option InOutBack
 * @value InOutBack
 * @option InElastic
 * @value InElastic
 * @option OutElastic
 * @value OutElastic
 * @option InOutElastic
 * @value InOutElastic
 * @option InBounce
 * @value InBounce
 * @option OutBounce
 * @value OutBounce
 * @option InOutBounce
 * @value InOutBounce
 * @option Step
 * @value Step
 * @option Stairs1
 * @value Stairs1
 * @option Stairs2(For pingpong movement)
 * @value Stairs2
 * @option Blink
 * @value Blink
 * @option Instant
 * @value Instant
 *
 * @param duration
 * @text Easing duration
 * @desc Sets the time (in seconds) required to complete easing.
 * @default 1
 * @type number
 * @decimals 3
 * 
 * @param delay
 * @text Delay
 * @desc Sets the delay time (in seconds) to start easing.
 * @default 0
 * @type number
 * @decimals 3
 * 
 * @param wrapMode
 * @text Repeat mode
 * @desc Specifies the type of repetition mode: "Loop" for repeated execution, "Pingpong" for repeated execution, and "Once" for execution only once and then return to the initial state.
 * @type select
 * @default Clamp
 * @option Clamp
 * @value Clamp
 * @option Loop
 * @value Loop
 * @option Pingpong
 * @value Pingpong
 * @option Once
 * @value Once
 *
 * @param cycleNum
 * @text Number of repetitions
 * @desc Number of times to repeat when "Loop" or "Pingpong" is selected in repeat mode. -If 1 is specified, it is a permanent loop.
 * @default 0
 * @type number
 * @min -1

*/

/*:ja
* @target MZ
* @plugindesc ver 1.5.0 トゥイーン機能を提供します
* @author Huuzin
* @url https://huuzin.net/2020/09/06/zintween/
* @base PluginCommonBase
* @orderAfter PluginCommonBase
*
* @help
* 本プラグインはトゥイーン(オブジェクトを滑らかに移動させる)を簡単に実装できる機能を提供します。
* 本プラグインは開発者向けもしくは他のHuuzin提供プラグインのベースプラグインとして使用します。

* @command set
* @text ピクチャにトゥイーン設定
* @desc ピクチャにトゥイーンを設定します
*
* @arg pictureId
* @type number
* @text ピクチャID
* @desc 指定するピクチャIDです。
* @min 1
*
* @arg pictureTween
* @text トゥイーン
* @desc トゥイーンのリストを作成します。
* @default []
* @type struct<SpriteTween>[]


* @command deletePict
* @text ピクチャのトゥイーン削除
* @desc ピクチャに設定したトゥイーンを削除します
*
* @arg pictureId
* @type number
* @text ピクチャID
* @desc 指定するピクチャIDです。
* @min 1
*
*/

/*~struct~SpriteTween:ja
 * @param tweenType
 * @text トゥイーン
 * @desc トゥイーンの種類を指定します。対象によっては適用できないトゥイーンもあります。
 * @type select
 * @default MoveTo
 * @option MoveTo(2)
 * @value MoveTo
 * @option XMoveTo(1)
 * @value XMoveTo
 * @option YMoveTo(1)
 * @value YMoveTo
 * @option MoveFrom(2)
 * @value MoveFrom
 * @option XMoveFrom(1)
 * @value XMoveFrom
 * @option YMoveFrom(1)
 * @value YMoveFrom
 * @option MoveBy(2)
 * @value MoveBy
 * @option XMoveBy(1)
 * @value XMoveBy
 * @option YMoveBy(1)
 * @value YMoveBy
 * @option AlphaTo(1)
 * @value AlphaTo
 * @option AlphaFrom(1)
 * @value AlphaFrom
 * @option ScaleTo(2)
 * @value ScaleTo
 * @option ScaleFrom(2)
 * @value ScaleFrom
 * @option RotationTo(1)
 * @value RotationTo
 * 
 * @param values
 * @text 設定値
 * @desc 設定値を入力します。MoveTo等(2)とあるものは「x, y」のようにカンマ区切り、(1)は「a」と値だけ指定してください。
 * @default 100
 * @type string
 * 
 * @param next
 * @text 直列実行
 * @desc 通常は前のトゥイーンと同時実行されますが、trueを指定すると前のトゥイーンが終わるまで開始しません。
 * @default false
 * @type boolean
 * 
 * @param easing
 * @text イージング
 * @desc イージングの種類を指定します。
 * @type select
 * @default Slope
 * @option 線形変化[Slope]
 * @value Slope
 * @option サインカーブ(入り)[InSine]
 * @value InSine
 * @option サインカーブ(抜き)[OutSine]
 * @value OutSine
 * @option サインカーブ(入り抜き)[InOutSine]
 * @value InOutSine
 * @option 2乗変化(入り)[InQuad]
 * @value InQuad
 * @option 2乗変化(抜き)[OutQuad]
 * @value OutQuad
 * @option 2乗変化(入り抜き)[InOutQuad]
 * @value InOutQuad
 * @option 3乗変化(入り)[InCubic]
 * @value InCubic
 * @option 3乗変化(抜き)[OutCubic]
 * @value OutCubic
 * @option 3乗変化(入り抜き)[InOutCubic]
 * @value InOutCubic
 * @option 4乗変化(入り)[InQuart]
 * @value InQuart
 * @option 4乗変化(抜き)[OutQuart]
 * @value OutQuart
 * @option 4乗変化(入り抜き)[InOutQuart]
 * @value InOutQuart
 * @option 指数変化(入り)[InExpo]
 * @value InExpo
 * @option 指数変化(抜き)[OutExpo]
 * @value OutExpo
 * @option 指数変化(入り抜き)[InOutExpo]
 * @value InOutExpo
 * @option 反動(入り)[InBack]
 * @value InBack
 * @option 反動(抜き)[OutBack]
 * @value OutBack
 * @option 反動(入り抜き)[InOutBack]
 * @value InOutBack
 * @option 弾性(入り)[InElastic]
 * @value InElastic
 * @option 弾性(抜き)[OutElastic]
 * @value OutElastic
 * @option 弾性(入り抜き)[InOutElastic]
 * @value InOutElastic
 * @option バウンス(入り)[InBounce]
 * @value InBounce
 * @option バウンス(抜き)[OutBounce]
 * @value OutBounce
 * @option バウンス(入り抜き)[InOutBounce]
 * @value InOutBounce
 * @option ステップ変化[Step]
 * @value Step
 * @option 階段状変化１[Stairs1]
 * @value Stairs1
 * @option 階段状変化２(ピンポン動作向け)[Stairs2]
 * @value Stairs2
 * @option 点滅[Blink]
 * @value Blink
 * @option 即時変化[Instant]
 * @value Instant
 *
 * @param duration
 * @text イージング時間
 * @desc イージング完了までにかかる時間[秒]
 * @default 1.0
 * @type number
 * @decimals 3
 * 
 * @param delay
 * @text ディレイ
 * @desc イージング開始までのディレイ時間[秒]
 * @default 0
 * @type number
 * @decimals 3
 * 
 * @param wrapMode
 * @text 繰り返しモード
 * @desc 繰り返しモードの種類。Loopは繰り返し実行、Pingpongは反復実行、Onceは一度だけ実行した後最初の状態に戻ります。
 * @type select
 * @default Clamp
 * @option Clamp
 * @value Clamp
 * @option Loop
 * @value Loop
 * @option Pingpong
 * @value Pingpong
 * @option Once
 * @value Once
 *
 * @param cycleNum
 * @text 繰り返し回数
 * @desc 繰り返しモードでLoop,Pingpongを選んだ場合の繰り返し回数。-1を指定すると永久ループ。
 * @default 0
 * @type number
 * @min -1

*/

(() => {
	'use strict';

	//-------------------------------------------------------------------------------------------------
	//	Plugin command -> Picture Tween
	//-------------------------------------------------------------------------------------------------
	PluginManagerEx.registerCommand(document.currentScript, "set", args => {
		const pictureId = Number(args.pictureId);
		const picture = $gameScreen.picture(pictureId);
		args._parameter.pictureTween.forEach(zt => ZinTween.AnalyzeTweenParam(zt, picture));
	});

	PluginManagerEx.registerCommand(document.currentScript, "deletePict", args => {
		const picture = $gameScreen.picture(Number(args.pictureId));
		picture.ztDelete();
	});
	
	//-------------------------------------------------------------------------------------------------
	//	Constant value
	//-------------------------------------------------------------------------------------------------
	const uiBoxMargin = 4;
	const Deg2Rad = 0.0174533;
	const Rad2Deg = 57.29580406904963;

	//-------------------------------------------------------------------------------------------------
	//	Constant function
	//-------------------------------------------------------------------------------------------------
	function Rotate(x,y,d){
		let dCos = Math.cos(d * Deg2Rad);
		let dSin = Math.sin(d * Deg2Rad);
		let x2 = dCos * x - dSin * y;
		let y2 = dSin * x + dCos * y;
		return [x2,y2];
	};

	//-------------------------------------------------------------------------------------------------
    // Static Class ZinTween
    //-------------------------------------------------------------------------------------------------
	function ZinTween() {
		throw new Error('This is a static class');
	}

	ZinTween.initialize = function() {
		ZinTween.default();
	};

	//文字列からイージングの種類を返す
	ZinTween.getEasing = function(easeStr) {
		switch(easeStr){
			case "Slope":
				return EaseType.EaseSlope;
			case "InSine":
				return EaseType.EaseInSine;
			case "OutSine":
				return EaseType.EaseOutSine;
			case "InOutSine":
				return EaseType.EaseInOutSine;
			case "InQuad":
				return EaseType.EaseInQuad;
			case "OutQuad":
				return EaseType.EaseOutQuad;
			case "InOutQuad":
				return EaseType.EaseInOutQuad;
			case "InCubic":
				return EaseType.EaseInCubic;
			case "OutCubic":
				return EaseType.EaseOutCubic;
			case "InOutCubic":
				return EaseType.EaseInOutCubic;
			case "InQuart":
				return EaseType.EaseInQuart;
			case "OutQuart":
				return EaseType.EaseOutQuart;
			case "InOutQuart":
				return EaseType.EaseInOutQuart;
			case "InExpo":
				return EaseType.EaseInExpo;
			case "OutExpo":
				return EaseType.EaseOutExpo;
			case "InOutExpo":
				return EaseType.EaseInOutExpo;
			case "InBack":
				return EaseType.EaseInBack;
			case "OutBack":
				return EaseType.EaseOutBack;
			case "InOutBack":
				return EaseType.EaseInOutBack;
			case "InElastic":
				return EaseType.EaseInElastic;
			case "OutElastic":
				return EaseType.EaseOutElastic;
			case "InOutElastic":
				return EaseType.EaseInOutElastic;
			case "InBounce":
				return EaseType.EaseInBounce;
			case "OutBounce":
				return EaseType.EaseOutBounce;
			case "InOutBounce":
				return EaseType.EaseInOutBounce;
			case "Step":
				return EaseType.EaseStep;
			case "Stairs1":
				return EaseType.EaseStairs1;
			case "Stairs2":
				return EaseType.EaseStairs2;
			case "Blink":
				return EaseType.EaseBlink;
			case "Instant":
				return EaseType.EaseInstant;
		}
		return EaseType.EaseSlope;
	};

	//文字列からイージングの種類を返す(反転)
	ZinTween.getReverseEasing = function(easeStr) {
		switch(easeStr){
			case "Slope":
				return EaseType.EaseSlope;
			case "InSine":
				return EaseType.EaseOutSine;
			case "OutSine":
				return EaseType.EaseInSine;
			case "InOutSine":
				return EaseType.EaseInOutSine;
			case "InQuad":
				return EaseType.EaseOutQuad;
			case "OutQuad":
				return EaseType.EaseInQuad;
			case "InOutQuad":
				return EaseType.EaseInOutQuad;
			case "InCubic":
				return EaseType.EaseOutCubic;
			case "OutCubic":
				return EaseType.EaseInCubic;
			case "InOutCubic":
				return EaseType.EaseInOutCubic;
			case "InQuart":
				return EaseType.EaseOutQuart;
			case "OutQuart":
				return EaseType.EaseInQuart;
			case "InOutQuart":
				return EaseType.EaseInOutQuart;
			case "InExpo":
				return EaseType.EaseOutExpo;
			case "OutExpo":
				return EaseType.EaseInExpo;
			case "InOutExpo":
				return EaseType.EaseInOutExpo;
			case "InBack":
				return EaseType.EaseOutBack;
			case "OutBack":
				return EaseType.EaseInBack;
			case "InOutBack":
				return EaseType.EaseInOutBack;
			case "InElastic":
				return EaseType.EaseOutElastic;
			case "OutElastic":
				return EaseType.EaseInElastic;
			case "InOutElastic":
				return EaseType.EaseInOutElastic;
			case "InBounce":
				return EaseType.EaseOutBounce;
			case "OutBounce":
				return EaseType.EaseInBounce;
			case "InOutBounce":
				return EaseType.EaseInOutBounce;
			case "Step":
				return EaseType.EaseStep;
			case "Stairs1":
				return EaseType.EaseStairs1;
			case "Stairs2":
				return EaseType.EaseStairs2;
			case "Blink":
				return EaseType.EaseBlink;
			case "Instant":
				return EaseType.EaseInstant;
		}
		return EaseType.EaseSlope;
	};

	//文字列から繰り返しモードの種類を返す
	ZinTween.getWrapMode = function(wrapMode) {
		if(wrapMode.indexOf("Clamp") >= 0) return WrapMode.Clamp;
		if(wrapMode.indexOf("Pingpong") >= 0) return WrapMode.Pingpong;
		if(wrapMode.indexOf("Loop") >= 0) return WrapMode.Loop;
		return WrapMode.Once;
	}

	//Tweenパラメータ解析
	ZinTween.AnalyzeTweenParam = function(ztParam, target) {
		var v = String(ztParam.values).split(',');
		var t;

		if(!target) return;
		
		if(ztParam.next) target.ztNext();
		
		switch(ztParam.tweenType){
			case "MoveTo":
				if(v.length <= 1) v.push(0);
				if(target.ztMoveTo !== undefined) t = target.ztMoveTo(v[0],v[1],ztParam.duration);
				break;
			case "XMoveTo":
				if(target.ztXMoveTo !== undefined) t = target.ztXMoveTo(v[0],ztParam.duration);
				break;
			case "YMoveTo":
				if(target.ztYMoveTo !== undefined) t = target.ztYMoveTo(v[0],ztParam.duration);
				break;
			case "MoveFrom":
				if(v.length <= 1) v.push(0);
				if(target.ztMoveFrom !== undefined) t = target.ztMoveFrom(v[0],v[1],ztParam.duration);
				break;
			case "XMoveFrom":
				if(target.ztXMoveFrom !== undefined) t = target.ztXMoveFrom(v[0],ztParam.duration);
				break;
			case "YMoveFrom":
				if(target.ztYMoveFrom !== undefined) t = target.ztYMoveFrom(v[0],ztParam.duration);
				break;
			case "MoveBy":
				if(v.length <= 1) v.push(0);
				if(target.ztMoveBy !== undefined) t = target.ztMoveBy(v[0],v[1],ztParam.duration);
				break;
			case "XMoveBy":
				if(target.ztXMoveBy !== undefined) t = target.ztXMoveBy(v[0],ztParam.duration);
				break;
			case "YMoveBy":
				if(target.ztYMoveBy !== undefined) t = target.ztYMoveBy(v[0],ztParam.duration);
				break;

			case "AlphaTo":
				if(target.ztAlphaTo !== undefined) t = target.ztAlphaTo(v[0],ztParam.duration);
				break;
			case "AlphaFrom":
				if(target.ztAlphaFrom !== undefined) t = target.ztAlphaFrom(v[0],ztParam.duration);
				break;

			case "ScaleTo":
				if(v.length <= 1) v.push(1);
				if(target.ztScaleTo !== undefined) t = target.ztScaleTo(v[0],v[1],ztParam.duration);
				break;
			case "ScaleFrom":
				if(v.length <= 1) v.push(1);
				if(target.ztScaleFrom !== undefined) t = target.ztScaleFrom(v[0],v[1],ztParam.duration);
				break;

			case "RotationTo":
				if(target.ztRotationTo !== undefined) t = target.ztRotationTo(v[0],ztParam.duration);
				break;
			case "RotationFrom":
				if(target.ztRotationFrom !== undefined) t = target.ztRotationFrom(v[0],ztParam.duration);
				break;
		}

		if(t !== undefined)
		{
			if(ztParam.delay > 0) t.setDelay(ztParam.delay);
			t.setEase(ZinTween.getEasing(ztParam.easing));
			switch(ztParam.wrapMode){
				case "Clamp":
					t.setWrapMode(WrapMode.Clamp);
					break;
				case "Once":
					t.setWrapMode(WrapMode.Once);
					break;
				case "Loop":
					t.setWrapMode(WrapMode.Loop);
					t.setCycleNum(ztParam.cycleNum);
					break;
				case "Pingpong":
					t.setWrapMode(WrapMode.Pingpong);
					t.setCycleNum(ztParam.cycleNum);
					break;
			}
		}
	}

	//Ease In Sine
	ZinTween.easeInSine = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return 1 - Math.cos((t * Math.PI)*0.5);
	};

	//Ease Out Sine
	ZinTween.easeOutSine = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return Math.sin((t * Math.PI)*0.5);
	};

	//Ease In Out Sine
	ZinTween.easeInOutSine = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return -(Math.cos(Math.PI * t) - 1)*0.5;
	};

	//Ease In Quad
	ZinTween.easeInQuad = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t*t;
	};

	//Ease Out Quad
	ZinTween.easeOutQuad = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return 1 - (1-t)*(1-t);
	};

	//Ease In Out Quad
	ZinTween.easeInOutQuad = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) * (-2 * t + 2) *0.5;
	};

	//Ease In Cubic
	ZinTween.easeInCubic = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t*t*t;
	};

	//Ease Out Cubic
	ZinTween.easeOutCubic = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return 1 - (1-t)*(1-t)*(1-t);
	};

	//Ease In Out Cubic
	ZinTween.easeInOutCubic = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2)*(-2 * t + 2)*(-2 * t + 2) * 0.5;
	};

	//Ease In Quart
	ZinTween.easeInQuart = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t*t*t*t;
	};

	//Ease Out Quart
	ZinTween.easeOutQuart = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return 1 - (1-t)*(1-t)*(1-t)*(1-t);
	};

	//Ease In Out Quart
	ZinTween.easeInOutQuart = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t < 0.5 ? 8 * t*t*t*t : 1 - (-2*t+2)*(-2*t+2)*(-2*t+2)*(-2*t+2) * 0.5;
	};

	//Ease In Expo
	ZinTween.easeInExpo = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return Math.pow(2, 10 * t - 10);
	};

	//Ease Out Expo
	ZinTween.easeOutExpo = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return 1 - Math.pow(2, -10 * t);
	};

	//Ease In Out Expo
	ZinTween.easeInOutExpo = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t < 0.5 ? Math.pow(2, 20 * t - 10)*0.5 : (2 - Math.pow(2, -20 * t + 10))*0.5;
	}

	//Ease In Back
	ZinTween.easeInBack = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return 2.70158 * t * t * t - 1.70158 * t * t;
	};

	//Ease Out Back
	ZinTween.easeOutBack = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
	};

	//Ease In Out Back
	ZinTween.easeInOutBack = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t < 0.5
		? (Math.pow(2 * t, 2) * ((2.59491 + 1) * 2 * t - 2.59491))*0.5
		: (Math.pow(2 * t - 2, 2) * ((2.59491 + 1) * (t * 2 - 2) + 2.59491) + 2)*0.5;
	};

	//Ease In Elastic
	ZinTween.easeInElastic = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return -Math.pow(2, 10 * t- 10) * Math.sin((t * 10 - 10.75) * (2 * Math.PI)*0.333);
	};

	//Ease Out Elastic
	ZinTween.easeOutElastic = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI)*0.333) + 1;
	};

	//Ease In Out Elastic
	ZinTween.easeInOutElastic = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t < 0.5
		? -(Math.pow(2, 20 * t - 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5))*0.5
		: (Math.pow(2, -20 * t + 10) * Math.sin((20 * t - 11.125) * (2 * Math.PI) / 4.5))*0.5 + 1;
	};

	//Ease In Bounce
	ZinTween.easeInBounce = function(t) {
		return 1 - ZinTween.easeOutBounce(1 - t);
	};

	//Ease Out Bounce
	ZinTween.easeOutBounce = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		if (t < 1 / 2.75) {
			return 7.5625 * t * t;
		} else if (t < 2 / 2.75) {
			return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
		} else if (t < 2.5 / 2.75) {
			return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
		} else {
			return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
		}
	};

	//Ease In Out Bounce
	ZinTween.easeInOutBounce = function(t) {
		return t < 0.5
 			? (1 - ZinTween.easeOutBounce(1 - 2 * t))*0.5
  			: (1 + ZinTween.easeOutBounce(2 * t - 1))*0.5;
	};

	//Ease Slope
	ZinTween.easeSlope = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t;
	};

	//Ease Step
	ZinTween.easeStep = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return t < 0.5 ? 0 : 1;
	};

	//Ease Stairs 1
	ZinTween.easeStairs1 = function(t, step = 4) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return Math.floor(t * step + 1) / step;
	};

	//Ease Stairs 2
	ZinTween.easeStairs2 = function(t, step = 4) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return Math.round(t * step) / step;
	};

	// Ease Blink
	ZinTween.easeBlink = function(t) {
		if(t <= 0){return 0;}else if(t >= 1){return 1;}
		return Math.floor(t * 9) % 2;
	};

	// Ease Instant
	ZinTween.easeInstant = function(t) {
		if(t <= 0){return 0;}else {return 1;}
	};

	//Ease function
	ZinTween.ease = function(t, easeType) {
		switch(easeType)
		{
			case EaseType.None:
			case EaseType.EaseSlope:
				return ZinTween.easeSlope(t);
			case EaseType.EaseInSine:
				return ZinTween.easeInSine(t);
			case EaseType.EaseOutSine:
				return ZinTween.easeOutSine(t);
			case EaseType.EaseInOutSine:
				return ZinTween.easeInOutSine(t);
			case EaseType.EaseInQuad:
				return ZinTween.easeInQuad(t);
			case EaseType.EaseOutQuad:
				return ZinTween.easeOutQuad(t);
			case EaseType.EaseInOutQuad:
				return ZinTween.easeInOutQuad(t);
			case EaseType.EaseInCubic:
				return ZinTween.easeInCubic(t);
			case EaseType.EaseOutCubic:
				return ZinTween.easeOutCubic(t);
			case EaseType.EaseInOutCubic:
				return ZinTween.easeInOutCubic(t);
			case EaseType.EaseInQuart:
				return ZinTween.easeInQuart(t);
			case EaseType.EaseOutQuart:
				return ZinTween.easeOutQuart(t);
			case EaseType.EaseInOutQuart:
				return ZinTween.easeInOutQuart(t);
			case EaseType.EaseInExpo:
				return ZinTween.easeInExpo(t);
			case EaseType.EaseOutExpo:
				return ZinTween.easeOutExpo(t);
			case EaseType.EaseInOutExpo:
				return ZinTween.easeInOutExpo(t);
			case EaseType.EaseInBack:
				return ZinTween.easeInBack(t);
			case EaseType.EaseOutBack:
				return ZinTween.easeOutBack(t);
			case EaseType.EaseInOutBack:
				return ZinTween.easeInOutBack(t);
			case EaseType.EaseInElastic:
				return ZinTween.easeInElastic(t);
			case EaseType.EaseOutElastic:
				return ZinTween.easeOutElastic(t);
			case EaseType.EaseInOutElastic:
				return ZinTween.easeInOutElastic(t);
			case EaseType.EaseInBounce:
				return ZinTween.easeInBounce(t);
			case EaseType.EaseOutBounce:
				return ZinTween.easeOutBounce(t);
			case EaseType.EaseInOutBounce:
				return ZinTween.easeInOutBounce(t);
			case EaseType.EaseStep:
				return ZinTween.easeStep(t);
			case EaseType.EaseStairs1:
				return ZinTween.easeStairs1(t);
			case EaseType.EaseStairs2:
				return ZinTween.easeStairs2(t);
			case EaseType.EaseBlink:
				return ZinTween.easeBlink(t);
			case EaseType.EaseInstant:
				return ZinTween.easeInstant(t);
		}
		return 0;
	};

	//Default settings
	ZinTween.setEase = function(easeType) {
		this._easeType = easeType;
	};
	ZinTween.defaultEaseType = function() {
		return this._easeType;
	};
	ZinTween.setDelay = function(delay) {
		this._delay = delay;
	};
	ZinTween.defaultDelay = function() {
		return this._delay;
	};
	ZinTween.setWrapMode = function(wrapMode) {
		this._wrapMode = wrapMode;
	};
	ZinTween.defaultWrapMode = function() {
		return this._wrapMode;
	};
	ZinTween.default = function() {
		this._easeType = EaseType.EaseSlope;
		this._delay = 0;
		this._wrapMode = WrapMode.Clamp;
	};

	//%表示や変数指定を解析する
	ZinTween.analyzeNumber = function(val) {
		var results = [0, false, 0];	//結果リスト(S,C,E/%計算か/数字)
		if(!Number.isFinite(val))
		{
			var num = Number(val.replace(/[^0-9|^\.|^-]/g, ''));

			if(val.indexOf('%') >= 0) results[1] = true;
			if(val.indexOf('C') >= 0) results[0] = 1;
			if(val.indexOf('E') >= 0 || val.indexOf('R') >= 0 || val.indexOf('B') >= 0) results[0] = 2;
			results[2] = num;
		}
		else
		{
			results[2] = val;
		}
		
		return results;
	};

	//パラメータに合わせた座標値を得る
	ZinTween.getPosition = function(val, pos, isCalculatingPercent, percent) {
		if(!Number.isFinite(val) && val.indexOf('M') > -1)
		{
			if(isCalculatingPercent){
				return pos * 0.01 * (percent + uiBoxMargin * 2) - uiBoxMargin;
			}else{
				return pos - uiBoxMargin;
			}
		}else{
			if(isCalculatingPercent){
				return pos * 0.01 * percent;
			}else{
				return pos;
			}       
		}
	};

	//パーセントパラメータに対応して値を得る
	ZinTween.getValueOnParam = function(value, isCalculatingPercent, percent) {
		if(isCalculatingPercent){
			return value * 0.01 * percent;
		}else{
			return value;
		}
	};


	//%色を変更する
	ZinTween.changeColorCode = function(colorCode, target) {
		//カラーコードなら
		if(colorCode.includes('#'))
		{
			if(target !== undefined && target.tweenOpacity !== undefined){
				return colorCode + ('00' + target.tweenOpacity.toString(16)).slice(-2);	//最後の２桁が透明度
			}
			return colorCode;
		}
		//rgba表記なら
		if(colorCode.includes('rgba'))
		{
			if(target !== undefined && target.tweenOpacity !== undefined){
				var rgba = colorCode.substring(colorCode.indexOf('(')+1, colorCode.indexOf(')')).split(',').map(Number);
				rgba[3] = rgba[3]*target.tweenOpacity/255;
				return "rgba(" + String(rgba[0]) + "," + String(rgba[1]) + "," + String(rgba[2]) + "," + String(rgba[3]) + ")";
			}
			return colorCode;
		}

		return colorCode;
	};

	//カラーコードから各色の成分を取り出す
	ZinTween.GetColorStruct = function(colorCode) {
		let colors = {r:0,g:0,b:0,a:255};

		//カラーコードなら
		if(colorCode.includes('#'))
		{
			colors.r = parseInt(colorCode.substring(1,3), 16);
			colors.g = parseInt(colorCode.substring(3,5), 16);
			colors.b = parseInt(colorCode.substring(5,7), 16);
		}
		//rgba表記なら
		if(colorCode.includes('rgba'))
		{
			var rgba = colorCode.substring(colorCode.indexOf('(')+1, colorCode.indexOf(')')).split(',').map(Number);
			colors.r = rgba[0];
			colors.g = rgba[1];
			colors.b = rgba[2];
		}
		return colors;
	};

	//各色の成分からカラーコードを取り出す
	ZinTween.GetColorCode = function(colorStruct, includingAlpha = true) {
		if(includingAlpha){
			return "rgba(" + String(colorStruct.r) + "," + String(colorStruct.g) + "," + String(colorStruct.b) + "," + String(colorStruct.a) + ")";
		}else{
			return "rgb(" + String(colorStruct.r) + "," + String(colorStruct.g) + "," + String(colorStruct.b) + ")";
		}
		
	};

	//対象オブジェクトにトゥイーンを登録する
	ZinTween.Join = function(target, zto) {
		if(target._ztSeq === undefined) target._ztSeq = new ZinTween_Sequence();
		target._ztSeq.join(zto,target);
		return zto;
	}

	window.ZinTween = ZinTween;
	// --- End ---


	//-------------------------------------------------------------------------------------------------
	//	ZinTween Ease type
	//	イージングの種類を定義します
	//-------------------------------------------------------------------------------------------------
	var EaseType = {
		None : 1,
		EaseInSine : 2,
		EaseOutSine : 3,
		EaseInOutSine : 4,
		EaseInQuad : 5,
		EaseOutQuad : 6,
		EaseInOutQuad : 7,
		EaseInCubic : 8,
		EaseOutCubic : 9,
		EaseInOutCubic : 10,
		EaseInQuart : 11,
		EaseOutQuart : 12,
		EaseInOutQuart : 13,
		EaseInExpo : 14,
		EaseOutExpo : 15,
		EaseInOutExpo : 16,
		EaseInBack : 17,
		EaseOutBack : 18,
		EaseInOutBack : 19,
		EaseInElastic : 20,
		EaseOutElastic : 21,
		EaseInOutElastic : 22,
		EaseInBounce : 23,
		EaseOutBounce : 24,
		EaseInOutBounce : 25,
		EaseSlope : 26,
		EaseStep : 27,
		EaseStairs1 : 28,
		EaseStairs2 : 29,
		EaseBlink : 30,
		EaseInstant : 31
	}
	window.EaseType = EaseType;

	//-------------------------------------------------------------------------------------------------
	//	ZinTween Wrap mode
	//	トゥイーンの繰り返し方法を指定します
	//-------------------------------------------------------------------------------------------------
	var WrapMode = {
		Clamp : 1,
		Loop : 2,
		Pingpong : 3,
		Once : 4
	}
	window.WrapMode = WrapMode;

	//-------------------------------------------------------------------------------------------------
	//	ZinTween Execution mode
	//	トゥイーンの実行モードを指定します
	//-------------------------------------------------------------------------------------------------
	var ExecutionMode = {
		None : 0,
		To : 1,
		From : 2,
		By : 3,
		ByFrom : 4
	}
	window.ExecutionMode = ExecutionMode;

	//-------------------------------------------------------------------------------------------------
	//	Scene_Boot.prototype.initialize
	//	ゲーム開始時にZinTweenを初期化します
	//-------------------------------------------------------------------------------------------------
	const Scene_Boot_prototype_initialize = Scene_Boot.prototype.initialize;
	Scene_Boot.prototype.initialize = function() {
		Scene_Boot_prototype_initialize.apply(this,arguments);
		ZinTween.initialize();
	};

	//-------------------------------------------------------------------------------------------------
	//	ZinTween Object
	//	トゥイーンを更新するためのベースオブジェクトです
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Object() {
		this.initialize.apply(this, arguments);
	}
	
	ZinTween_Object.prototype.initialize = function() {
		this._frameCount = 0;
		this._endTime = 1.0;
		this._easeType = ZinTween.defaultEaseType();
		this._delay = ZinTween.defaultDelay();
		this._wrapMode = ZinTween.defaultWrapMode();
		this._cycleNum = 0;
		this._cycleCount = 0;
		this._isStarted = false;
		this._isEnd = false;
	};

	ZinTween_Object.prototype.start = function(target) {
		this._isStarted = true;
	};

	ZinTween_Object.prototype.update = function(target) {
		//isEndならアップデートしない
		if(this._isEnd) return;

		//Frame countの演算
		if(this._cycleNum == -1 || this._cycleCount <= this._cycleNum){
			this._frameCount += 1;
		}else{
			return;
		}

		//指定期間Delayするまで待機
		if(!this._isStarted) this.start(target);

		//Wrap Modeに合わせて処理
		switch(this._wrapMode)
		{
			case WrapMode.Clamp:
				if(this._frameCount >= (this._endTime + this._delay) * 60){
					this._frameCount = (this._endTime + this._delay) * 60;
					this._cycleCount = 1;
					this._cycleNum = 0;
				}
				this.refresh((this._frameCount - this._delay*60) / (this._endTime*60), target);
				break;

			case WrapMode.Once:
				if(this._frameCount >= (this._endTime + this._delay) * 60){
					this._frameCount = this._delay * 60;
					this._cycleCount = 1;
					this._cycleNum = 0;
				}
				this.refresh((this._frameCount - this._delay*60) / (this._endTime*60), target);
				break;

			case WrapMode.Loop:
				if(this._frameCount >= (this._endTime + this._delay) * 60){
					this._cycleCount += 1;
					if(this._cycleNum != -1 && this._cycleCount >= this._cycleNum){
						this._frameCount = (this._endTime + this._delay) * 60;
					}else{
						this._frameCount -= this._endTime * 60;
					}
				}
				this.refresh((this._frameCount - this._delay*60) / (this._endTime*60), target);
				break;

			case WrapMode.Pingpong:
				if(this._frameCount >= (this._endTime * 2 + this._delay) * 60){
					this._cycleCount += 1;
					if(this._cycleNum != -1 && this._cycleCount >= this._cycleNum){
						this._frameCount = (this._endTime * 2 + this._delay) * 60;
					}else{
						this._frameCount -= this._endTime * 120;
					}
				}
				if(this._frameCount >= (this._endTime + this._delay) * 60){
					this.refresh((this._endTime * 120 - this._frameCount + this._delay*60) / (this._endTime*60), target);
				}else{
					this.refresh((this._frameCount - this._delay*60) / (this._endTime*60), target);
				}
				break;
		}
	};

	ZinTween_Object.prototype.refresh = function(t,target) {
	};

	ZinTween_Object.prototype.isPlaying = function() {
		if(this._isEnd) return false;
		if(this._cycleNum == -1) return true;
		return this._cycleCount <= this._cycleNum;
	};

	ZinTween_Object.prototype.isCompleted = function() {
		return !this.isPlaying();
	};

	// 処理を強制終了する
	ZinTween_Object.prototype.forceEnd = function() {
		this._isEnd = true;
	};

	// 処理を強制完了する
	ZinTween_Object.prototype.forceComplete = function(target) {
		this._isEnd = true;
		//Wrap Modeに合わせて処理
		switch(this._wrapMode)
		{
			case WrapMode.Clamp:
			case WrapMode.Loop:
				this.refresh(1.0, target);
				break;

			case WrapMode.Pingpong:
				//ループ回数が奇数と偶数で処理内容を変更
				if(this._cycleNum == -1 || (this._cycleNum % 2) == 0){
					this.refresh(0.0, target);
				}else{
					this.refresh(1.0, target);
				}
				break;

			case WrapMode.Once:
				this.refresh(0.0, target);
				break;
		}
	};

	// イージングを指定する
	ZinTween_Object.prototype.setEase = function(easeType) {
		this._easeType = easeType;
		return this;
	};

	// 開始ディレイ時間を指定する
	ZinTween_Object.prototype.setDelay = function(delay) {
		this._delay = delay;
		return this;
	};

	// 繰り返しモードを指定する
	ZinTween_Object.prototype.setWrapMode = function(wrapMode) {
		this._wrapMode = wrapMode;
		return this;
	};

	// 繰り返し回数を指定する
	ZinTween_Object.prototype.setCycleNum = function(cycleNum) {
		this._cycleNum = cycleNum;
		return this;
	};

	window.ZinTween_Object = ZinTween_Object;

	//-------------------------------------------------------------------------------------------------
	//	ZinTween Sequence
	//	各オブジェクトクラスで保有し、ループ処理を行います
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Sequence() {
		this.initialize.apply(this, arguments);
	}
	
	ZinTween_Sequence.prototype.initialize = function() {
		this._tweenList = [];		//トゥイーンリスト
		this._freeze = false;		//一時停止フラグ
	};

	ZinTween_Sequence.prototype.append = function(zinTween,target) {
		this._tweenList.push([zinTween]);
		if(this._tweenList.length == 1) zinTween.start(target);
	};

	ZinTween_Sequence.prototype.join = function(zinTween,target) {
		if(this._tweenList.length == 0){
			this.append(zinTween,target);
		}else{
			this._tweenList[this._tweenList.length - 1].push(zinTween);
			if(this._tweenList.length == 1) zinTween.start(target);
		}
	};

	ZinTween_Sequence.prototype.next = function() {
		if(this._tweenList.length > 0 && this._tweenList[this._tweenList.length - 1].length > 0){
			this._tweenList.push([]);
		}
	};

	ZinTween_Sequence.prototype.update = function(target) {
		var i = 0;
		var ip = false;

		if(this._freeze) return;
		if(this.checkEnd()) return;	

		//処理
		for(i = 0; i < this._tweenList[0].length; i++){
			this._tweenList[0][i].update(target);
			if(this._tweenList[0][i].isPlaying()){
				ip = true;
			}
		}

		//次のシーケンスへの移行チェック、移行なら1番目のTweenを削除
		if(!ip){
			this._tweenList.shift();
			if(this.checkEnd()) return;
		}
	};

	//終了時完了関数を呼び出す
	ZinTween_Sequence.prototype.checkEnd = function() {
		if(this._tweenList.length == 0){
			if(this._handle){
				this._handle();
				this._handle = undefined;
			}
			return true;
		}
		return false;
	};

	//現在シーケンス実行中か
	ZinTween_Sequence.prototype.isPlaying = function() {
		if(this._tweenList.length == 0) return false; else return true;
	};

	//シーケンス終了時呼び出し関数を登録
	ZinTween_Sequence.prototype.setHandler = function(bindFunc) {
		this._handle = bindFunc;
	};

	//シーケンスを一時停止する
	ZinTween_Sequence.prototype.freeze = function() {
		this._freeze = true;
	};

	//シーケンスの一時停止を解除する
	ZinTween_Sequence.prototype.unfreeze = function() {
		this._freeze = false;
	};

	//シーケンスのトゥイーンを全削除する
	ZinTween_Sequence.prototype.deleteTween = function() {
		this._tweenList = [];
	};

	//現在のトゥイーンを完了する
	ZinTween_Sequence.prototype.completeCurrentTweens = function(target) {
		if(this._tweenList.length > 0){
			for(let i = 0; i < this._tweenList[0].length; i++){
				this._tweenList[0][i].forceComplete(target);
			}
	
			//次のシーケンスへの移行チェック、移行なら1番目のTweenを削除
			this._tweenList.shift();
			if(this.checkEnd()) return;
		}
	};

	//すべてのトゥイーンを完了する
	ZinTween_Sequence.prototype.completeAllTweens = function(target) {
		while(this._tweenList.length > 0){
			this.completeCurrentTweens(target);
		}
	};

	window.ZinTween_Sequence = ZinTween_Sequence;

	//-------------------------------------------------------------------------------------------------
	//	Wrapper
	//-------------------------------------------------------------------------------------------------
	PIXI.Container.prototype.ztNext = function() {
		if(this._ztSeq !== undefined) this._ztSeq.next();
	};
	PIXI.Container.prototype.ztIsPlaying = function() {
		if(this._ztSeq !== undefined) return this._ztSeq.isPlaying();
		return false;
	};
	PIXI.Container.prototype.ztSetHandler = function(bindFunc) {
		if(this._ztSeq !== undefined) this._ztSeq.setHandler(bindFunc);
	};
	PIXI.Container.prototype.ztFreeze = function() {
		if(this._ztSeq !== undefined) this._ztSeq.freeze();
	};
	PIXI.Container.prototype.ztUnfreeze = function() {
		if(this._ztSeq !== undefined) this._ztSeq.unfreeze();
	};
	PIXI.Container.prototype.ztDelete = function() {
		if(this._ztSeq !== undefined) this._ztSeq.deleteTween();
	};
	
	Game_Picture.prototype.ztNext = function() {
		if(this._ztSeq !== undefined) this._ztSeq.next();
	};
	Game_Picture.prototype.ztIsPlaying = function() {
		if(this._ztSeq !== undefined) return this._ztSeq.isPlaying();
		return false;
	};
	Game_Picture.prototype.ztSetHandler = function(bindFunc) {
		if(this._ztSeq !== undefined) this._ztSeq.setHandler(bindFunc);
	};
	Game_Picture.prototype.ztFreeze = function() {
		if(this._ztSeq !== undefined) this._ztSeq.freeze();
	};
	Game_Picture.prototype.ztUnfreeze = function() {
		if(this._ztSeq !== undefined) this._ztSeq.unfreeze();
	};
	Game_Picture.prototype.ztDelete = function() {
		if(this._ztSeq !== undefined) this._ztSeq.deleteTween();
	};


	//---------------------------*********************************************************************************---------------------------
	//	
	//	B a s e  T w e e n : N u m b e r
	//
	//---------------------------*********************************************************************************---------------------------
	function ZinTween_Number() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Number.prototype = Object.create(ZinTween_Object.prototype);
	ZinTween_Number.prototype.constructor = ZinTween_Number;

	ZinTween_Number.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._start = 0;
		this._end = 0;
		this._current;
		this._refName = '';
		this._tweenMode = ExecutionMode.None;		//実行モード
	};

	//対象の数値
	ZinTween_Number.prototype.number = function(target) {
		return target[this._refName];
	};

	//対象の数値にセット
	ZinTween_Number.prototype.setNumber = function(target,a) {
		target[this._refName] = a;
	};

	ZinTween_Number.prototype.start = function(target) {
		switch(this._tweenMode){
			case ExecutionMode.None:
			case ExecutionMode.To:
				this._start = target[this._refName];
				break;
			case ExecutionMode.From:
				this._end = target[this._refName];
				break;
			case ExecutionMode.By:
				this._start = target[this._refName];
				this._end += this._start;
				break;
			case ExecutionMode.ByFrom:
				this._end = target[this._refName];
				this._start += this._end;
				break;
		}

		ZinTween_Object.prototype.start.apply(this, arguments);
		this._current = this._start;
		this.setNumber(target, this._current);
	};

	ZinTween_Number.prototype.refresh = function(t,target) {
		ZinTween_Object.prototype.refresh.apply(this, arguments);
		this._current = this._start + ZinTween.ease(t, this._easeType) * (this._end - this._start);
		this.setNumber(target, this._current);
	};

	//-------------------------------------------------------------------------------------------------
	//	Number To
	//-------------------------------------------------------------------------------------------------
	ZinTween.setNumberTo = function(zto,duration,a,percent,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.To;
		
		//引数解析
		let result = ZinTween.analyzeNumber(a);

		//アルファ値のセット
		if(result[1]){
			zto._end = result[2] * 0.01 * percent;
		}else{
			zto._end = result[2];
		}
		
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setNumberFrom = function(zto,duration,a,percent,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.From;
		
		//引数解析
		let result = ZinTween.analyzeNumber(a);

		//アルファ値のセット
		if(result[1]){
			zto._start = result[2] * 0.01 * percent;
		}else{
			zto._start = result[2];
		}
		
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};
	

	//---------------------------*********************************************************************************---------------------------
	//	
	//	B a s e  T w e e n : M o v e
	//
	//---------------------------*********************************************************************************---------------------------
	function ZinTween_Move() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Move.prototype = Object.create(ZinTween_Object.prototype);
	ZinTween_Move.prototype.constructor = ZinTween_Move;

	ZinTween_Move.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._startX = 0;			//開始X
		this._startY = 0;			//開始Y
		this._endX = 0;				//終了Z
		this._endY = 0;				//終了Y
		this._alignX = 0;			//X方向の整列
		this._alignY = 0;			//Y方向の整列
		this._xTweenFlag = false;	//X方向トゥイーンフラグ
		this._yTweenFlag = false;	//Y方向トゥイーンフラグ
		this._tweenMode = ExecutionMode.None;		//実行モード
	};

	//対象トゥイーンのx座標
	ZinTween_Move.prototype.x = function(target){
		return target._x;
	};

	//対象トゥイーンのy座標
	ZinTween_Move.prototype.y = function(target){
		return target._y;
	};

	//対象トゥイーンの横幅
	ZinTween_Move.prototype.width = function(target){
		return target.width;
	};

	//対象トゥイーンの縦幅
	ZinTween_Move.prototype.height = function(target){
		return target.height;
	};

	//x座標をセット
	ZinTween_Move.prototype.setX = function(target,x){
		target._x = x;
	};

	//y座標をセット
	ZinTween_Move.prototype.setY = function(target,y){
		target._y = y;
	};

	//トゥイーン開始時に呼ばれる関数
	ZinTween_Move.prototype.start = function(target) {
		switch(this._tweenMode){
			case ExecutionMode.None:
			case ExecutionMode.To:
				this.start_To(target);
				break;
			case ExecutionMode.From:
				this.start_From(target);
				break;
			case ExecutionMode.By:
				this.start_By(target);
				break;
			case ExecutionMode.ByFrom:
				this.start_ByFrom(target);
				break;
		}
		
		ZinTween_Object.prototype.start.apply(this, arguments);
		if(this._xTweenFlag) this.setX(target, this._startX - this.width(target) * 0.5 * this._alignX);
		if(this._yTweenFlag) this.setY(target, this._startY - this.height(target) * 0.5 * this._alignY);
	};

	ZinTween_Move.prototype.start_To = function(target) {
		if(this._xTweenFlag) this._startX = this.x(target) + this.width(target) * 0.5 * this._alignX;
		if(this._yTweenFlag) this._startY = this.y(target) + this.height(target) * 0.5 * this._alignY;
	};

	ZinTween_Move.prototype.start_From = function(target) {
		if(this._xTweenFlag) this._endX = this.x(target) + this.width(target) * 0.5 * this._alignX;
		if(this._yTweenFlag) this._endY = this.y(target) + this.height(target) * 0.5 * this._alignY;
	};

	ZinTween_Move.prototype.start_By = function(target) {
		if(this._xTweenFlag){
			this._startX = this.x(target) + this.width(target) * 0.5 * this._alignX;
			this._endX += this._startX;
		}
		if(this._yTweenFlag){
			this._startY = this.y(target) + this.height(target) * 0.5 * this._alignY;
			this._endY += this._startY;
		}
	};

	ZinTween_Move.prototype.start_ByFrom = function(target) {	
		if(this._xTweenFlag){
			this._endX = target.x + target.width * 0.5 * this._alignX;
			this._startX += this._endX;
		}
		if(this._yTweenFlag){
			this._endY = target.y + target.height * 0.5 * this._alignY;
			this._startY += this._endY;
		}
	};

	//トゥイーン実行中に呼ばれる関数
	ZinTween_Move.prototype.refresh = function(t,target) {
		ZinTween_Object.prototype.refresh.apply(this, arguments);

		if(this._xTweenFlag){
			const x = this._startX + ZinTween.ease(t, this._easeType) * (this._endX - this._startX);	
			this.setX(target, x - this.width(target) * 0.5 * this._alignX);
		}

		if(this._yTweenFlag){
			const y = this._startY + ZinTween.ease(t, this._easeType) * (this._endY - this._startY);	
			this.setY(target, y - this.height(target) * 0.5 * this._alignY);
		}
	};

	window.ZinTween_Move = ZinTween_Move;

	//-------------------------------------------------------------------------------------------------
	//	Move To
	//-------------------------------------------------------------------------------------------------
	function ZinTween_MoveTo() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_MoveTo.prototype = Object.create(ZinTween_Move.prototype);
	ZinTween_MoveTo.prototype.constructor = ZinTween_MoveTo;

	ZinTween_MoveTo.prototype.start = function(target) {
		if(this._xTweenFlag) this._startX = this.x(target) + this.width(target) * 0.5 * this._alignX;
		if(this._yTweenFlag) this._startY = this.y(target) + this.height(target) * 0.5 * this._alignY;
		ZinTween_Move.prototype.start.apply(this, arguments);
	};

	ZinTween.setMoveTo = function(zto,duration,x,y,percentX,percentY,xFlag,yFlag,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.To;

		//引数解析
		let resultX = ZinTween.analyzeNumber(x);
		let resultY = ZinTween.analyzeNumber(y);
		zto._isCalculatingPercentX = resultX[1];
		zto._isCalculatingPercentY = resultY[1];
		zto._alignX = resultX[0];
		zto._alignY = resultY[0];

		//座標セット
		if(xFlag){
			zto._xTweenFlag = true;
			zto._endX = ZinTween.getPosition(x, resultX[2], zto._isCalculatingPercentX, percentX);
		}
		if(yFlag){
			zto._yTweenFlag = true;
			zto._endY = ZinTween.getPosition(y, resultY[2], zto._isCalculatingPercentY, percentY);
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setMoveFrom = function(zto,duration,x,y,percentX,percentY,xFlag,yFlag,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.From;

		//引数解析
		let resultX = ZinTween.analyzeNumber(x);
		let resultY = ZinTween.analyzeNumber(y);
		zto._isCalculatingPercentX = resultX[1];
		zto._isCalculatingPercentY = resultY[1];
		zto._alignX = resultX[0];
		zto._alignY = resultY[0];

		//座標セット
		if(xFlag){
			zto._xTweenFlag = true;
			zto._startX = ZinTween.getPosition(x, resultX[2], zto._isCalculatingPercentX, percentX);
		}
		
		if(yFlag){
			zto._yTweenFlag = true;
			zto._startY = ZinTween.getPosition(y, resultY[2], zto._isCalculatingPercentY, percentY);
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setMoveBy = function(zto,duration,x,y,percentX,percentY,xFlag,yFlag,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.By;

		//引数解析
		let resultX = ZinTween.analyzeNumber(x);
		let resultY = ZinTween.analyzeNumber(y);
		zto._isCalculatingPercentX = resultX[1];
		zto._isCalculatingPercentY = resultY[1];
		zto._alignX = resultX[0];
		zto._alignY = resultY[0];

		//座標セット
		if(xFlag){
			zto._xTweenFlag = true;
			zto._endX = ZinTween.getPosition(x, resultX[2], zto._isCalculatingPercentX, percentX);
		}
		
		if(yFlag){
			zto._yTweenFlag = true;
			zto._endY = ZinTween.getPosition(y, resultY[2], zto._isCalculatingPercentY, percentY);
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setMoveByFrom = function(zto,duration,x,y,percentX,percentY,xFlag,yFlag,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.ByFrom;

		//引数解析
		let resultX = ZinTween.analyzeNumber(x);
		let resultY = ZinTween.analyzeNumber(y);
		zto._isCalculatingPercentX = resultX[1];
		zto._isCalculatingPercentY = resultY[1];
		zto._alignX = resultX[0];
		zto._alignY = resultY[0];

		//座標セット
		if(xFlag){
			zto._xTweenFlag = true;
			zto._startX = ZinTween.getPosition(x, resultX[2], zto._isCalculatingPercentX, percentX);
		}
		
		if(yFlag){
			zto._yTweenFlag = true;
			zto._startY = ZinTween.getPosition(y, resultY[2], zto._isCalculatingPercentY, percentY);
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};


	//---------------------------*********************************************************************************---------------------------
	//	
	//	B a s e  T w e e n : A l p h a
	//
	//---------------------------*********************************************************************************---------------------------
	function ZinTween_Alpha() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Alpha.prototype = Object.create(ZinTween_Object.prototype);
	ZinTween_Alpha.prototype.constructor = ZinTween_Alpha;

	ZinTween_Alpha.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._startA = 0;			//開始A
		this._endA = 0;				//開始A
		this._tweenMode = ExecutionMode.None;		//実行モード
	};

	//対象の透明度
	ZinTween_Alpha.prototype.opacity = function(target) {
		return target.opacity();
	};

	//対象の透明度にセット
	ZinTween_Alpha.prototype.setOpacity = function(target,a) {
		return target._opacity = a;
	};

	ZinTween_Alpha.prototype.start = function(target) {
		switch(this._tweenMode){
			case ExecutionMode.None:
			case ExecutionMode.To:
				this._startA = this.opacity(target);
				break;
			case ExecutionMode.From:
				this._endA = this.opacity(target);
				break;
			case ExecutionMode.By:
				this._startX = this.opacity(target);
				this._endA += this._startA;
				break;
			case ExecutionMode.ByFrom:
				this._endA = this.opacity(target);
				this._startA += this._endA;
				break;
		}

		ZinTween_Object.prototype.start.apply(this, arguments);
		target.tweenOpacity = this._startA;
		this.setOpacity(target, target.tweenOpacity);
	};

	ZinTween_Alpha.prototype.refresh = function(t,target) {
		ZinTween_Object.prototype.refresh.apply(this, arguments);
		target.tweenOpacity = Math.round(this._startA + ZinTween.ease(t, this._easeType) * (this._endA - this._startA));
		this.setOpacity(target, target.tweenOpacity);
	};

	ZinTween.setAlphaTo = function(zto,duration,a,percentA,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.To;
		
		//引数解析
		let result = ZinTween.analyzeNumber(a);

		//アルファ値のセット
		if(result[1]){
			zto._endA = result[2] * 0.01 * percentA;
		}else{
			zto._endA = result[2];
		}
		
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setAlphaFrom = function(zto,duration,a,percentA,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.From;
		
		//引数解析
		let result = ZinTween.analyzeNumber(a);

		//アルファ値のセット
		if(result[1]){
			zto._startA = result[2] * 0.01 * percentA;
		}else{
			zto._startA = result[2];
		}
		
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};


	//---------------------------*********************************************************************************---------------------------
	//	
	//	B a s e  T w e e n : C o l o r
	//
	//---------------------------*********************************************************************************---------------------------
	function ZinTween_Color() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Color.prototype = Object.create(ZinTween_Object.prototype);
	ZinTween_Color.prototype.constructor = ZinTween_Color;

	ZinTween_Color.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._startV = [0,0,0,0];
		this._endV = [0,0,0,0];
		this._tweenMode = ExecutionMode.None;		//実行モード
	};

	//対象の透明度
	ZinTween_Color.prototype.color = function(target) {
		return target.getColorTone();
	};

	//対象の透明度にセット
	ZinTween_Color.prototype.setColor = function(target,c) {
		return target.setColorTone(c.clone());
	};

	ZinTween_Color.prototype.start = function(target) {
		switch(this._tweenMode){
			case ExecutionMode.None:
			case ExecutionMode.To:
				this._startV = this.color(target);
				break;
			case ExecutionMode.From:
				this._endV = this.color(target);
				break;
		}

		ZinTween_Object.prototype.start.apply(this, arguments);
		target.tweenColor = this._startV.clone();
		this.setColor(target, target.tweenColor);
		
	};

	ZinTween_Color.prototype.refresh = function(t,target) {
		ZinTween_Object.prototype.refresh.apply(this, arguments);
		for(let i = 0; i < 4; i++){
			target.tweenColor[i] = Math.round(this._startV[i] + ZinTween.ease(t, this._easeType) * (this._endV[i] - this._startV[i]));
		}
		this.setColor(target, target.tweenColor);
	};

	ZinTween.setColorTo = function(zto,duration,c,percent,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.To;
		
		//引数解析
		for(let i = 0; i < 4; i++){
			const result = ZinTween.analyzeNumber(c[i]);
			zto._endV[i] = ZinTween.getValueOnParam(result[2], result[1], percent);
		}
	
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setColorFrom = function(zto,duration,c,percent,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.From;
		
		//引数解析
		for(let i = 0; i < 4; i++){
			const result = ZinTween.analyzeNumber(c[i]);
			zto._startV[i] = ZinTween.getValueOnParam(result[2], result[1], percent);
		}
	
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	//---------------------------*********************************************************************************---------------------------
	//	
	//	B a s e  T w e e n : H u e
	//
	//---------------------------*********************************************************************************---------------------------
	function ZinTween_Hue() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Hue.prototype = Object.create(ZinTween_Object.prototype);
	ZinTween_Hue.prototype.constructor = ZinTween_Hue;

	ZinTween_Hue.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._startV = 0;
		this._endV = 0;
		this._tweenMode = ExecutionMode.None;		//実行モード
	};

	//対象の透明度
	ZinTween_Hue.prototype.hue = function(target) {
		return target._hue;
	};

	//対象の透明度にセット
	ZinTween_Hue.prototype.setHue = function(target,v) {
		return target.setHue(v);
	};

	ZinTween_Hue.prototype.start = function(target) {
		switch(this._tweenMode){
			case ExecutionMode.None:
			case ExecutionMode.To:
				this._startV = this.hue(target);
				break;
			case ExecutionMode.From:
				this._endV = this.hue(target);
				break;
		}

		ZinTween_Object.prototype.start.apply(this, arguments);
		this.setHue(target, this._startV);
	};

	ZinTween_Hue.prototype.refresh = function(t,target) {
		ZinTween_Object.prototype.refresh.apply(this, arguments);
		const h = this._startV + ZinTween.ease(t, this._easeType) * (this._endV - this._startV);	
		this.setHue(target, h);
	};

	ZinTween.setHueTo = function(zto,duration,v,percent,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.To;
		
		//引数解析
		const result = ZinTween.analyzeNumber(v);
		zto._endV = ZinTween.getValueOnParam(result[2], result[1], percent);
	
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setHueFrom = function(zto,duration,v,percent,target){
		//基本値のセット
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.From;
		
		//引数解析
		const result = ZinTween.analyzeNumber(v);
		zto._startV = ZinTween.getValueOnParam(result[2], result[1], percent);
	
		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	//---------------------------*********************************************************************************---------------------------
	//	
	//	B a s e  T w e e n : S c a l e
	//
	//---------------------------*********************************************************************************---------------------------
	function ZinTween_Scale() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Scale.prototype = Object.create(ZinTween_Object.prototype);
	ZinTween_Scale.prototype.constructor = ZinTween_Scale;

	ZinTween_Scale.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._startX = 0;			//開始X
		this._startY = 0;			//開始Y
		this._endX = 0;				//終了Z
		this._endY = 0;				//終了Y
		this._alignX = 0;			//X方向の整列
		this._alignY = 0;			//Y方向の整列
		this._xTweenFlag = false;	//X方向トゥイーンフラグ
		this._yTweenFlag = false;	//Y方向トゥイーンフラグ
		this._tweenMode = ExecutionMode.None;		//実行モード
	};

	//対象トゥイーンのx座標
	ZinTween_Scale.prototype.x = function(target){
		return target._x;
	};

	//対象トゥイーンのy座標
	ZinTween_Scale.prototype.y = function(target){
		return target._y;
	};

	//対象トゥイーンの横幅
	ZinTween_Scale.prototype.width = function(target){
		return target.width;
	};

	//対象トゥイーンの縦幅
	ZinTween_Scale.prototype.height = function(target){
		return target.height;
	};

	//対象トゥイーンのxスケール
	ZinTween_Scale.prototype.xScale = function(target){
		return target.scale.x;
	};

	//対象トゥイーンのyスケール
	ZinTween_Scale.prototype.yScale = function(target){
		return target.scale.y;
	};

	//x座標をセット
	ZinTween_Scale.prototype.setX = function(target,x){
		target._x = x;
	};

	//y座標をセット
	ZinTween_Scale.prototype.setY = function(target,y){
		target._y = y;
	};

	//xスケールをセット
	ZinTween_Scale.prototype.setXScale = function(target,x){
		target.scale.x = x;
	};

	//yスケールをセット
	ZinTween_Scale.prototype.setYScale = function(target,y){
		target.scale.y = y;
	};

	//トゥイーン開始時に呼ばれる関数
	ZinTween_Scale.prototype.start = function(target) {
		switch(this._tweenMode){
			case ExecutionMode.None:
			case ExecutionMode.To:
				if(this._xTweenFlag) this._startX = this.xScale(target);
				if(this._yTweenFlag) this._startY = this.yScale(target);
				break;
			case ExecutionMode.From:
				if(this._xTweenFlag) this._endX = this.xScale(target);
				if(this._yTweenFlag) this._endY = this.yScale(target);
				break;
		}

		ZinTween_Object.prototype.start.apply(this, arguments);
		if(this._xTweenFlag){
			const oldScaleX = this.xScale(target);
			this.setXScale(target, this._startX);
			this.setX(target, this.x(target) - (this.xScale(target) - oldScaleX) * this.width(target) * 0.5 * this._alignX);
		}
		if(this._yTweenFlag){
			const oldScaleY = this.yScale(target);
			this.setYScale(target, this._startY);
			this.setY(target, this.y(target) - (this.yScale(target) - oldScaleY) * this.height(target) * 0.5 * this._alignY);
		}
	};

	//トゥイーン実行中に呼ばれる関数
	ZinTween_Scale.prototype.refresh = function(t,target) {
		ZinTween_Object.prototype.refresh.apply(this, arguments);

		if(this._xTweenFlag)
		{
			const oldScaleX = this.xScale(target);
			var w = this._startX + ZinTween.ease(t, this._easeType) * (this._endX - this._startX);	
			this.setXScale(target, w);
			this.setX(target, this.x(target) - (this.xScale(target) - oldScaleX) * this.width(target) * 0.5 * this._alignX);
		}
		
		if(this._yTweenFlag)
		{
			const oldScaleY = this.yScale(target);
			var h = this._startY + ZinTween.ease(t, this._easeType) * (this._endY - this._startY);	
			this.setYScale(target, h);
			this.setY(target, this.y(target) - (this.yScale(target) - oldScaleY) * this.height(target) * 0.5 * this._alignY);
		}
	};

	window.ZinTween_Scale = ZinTween_Scale;

	ZinTween.setScaleTo = function(zto,duration,w,h,percentX,percentY,xFlag,yFlag,target){
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.To;

		//引数解析
		var resultW = ZinTween.analyzeNumber(w);
		var resultH = ZinTween.analyzeNumber(h);
		zto._alignX = resultW[0];
		zto._alignY = resultH[0];

		//セット
		if(xFlag){
			zto._xTweenFlag = true;
			zto._endX = ZinTween.getValueOnParam(resultW[2], resultW[1], percentX); 
		}
		if(yFlag){
			zto._yTweenFlag = true;
			zto._endY = ZinTween.getValueOnParam(resultH[2], resultH[1], percentY);
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.setScaleFrom = function(zto,duration,w,h,percentX,percentY,xFlag,yFlag,target){
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.From;

		//引数解析
		var resultW = ZinTween.analyzeNumber(w);
		var resultH = ZinTween.analyzeNumber(h);
		zto._alignX = resultW[0];
		zto._alignY = resultH[0];

		//セット
		if(xFlag){
			zto._xTweenFlag = true;
			zto._startX = ZinTween.getValueOnParam(resultW[2], resultW[1], percentX); 
		}

		if(yFlag){
			zto._yTweenFlag = true;
			zto._startY = ZinTween.getValueOnParam(resultH[2], resultH[1], percentY);
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};


	//---------------------------*********************************************************************************---------------------------
	//	
	//	B a s e  T w e e n : R o t a t i o n
	//
	//---------------------------*********************************************************************************---------------------------
	function ZinTween_Rotation() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Rotation.prototype = Object.create(ZinTween_Object.prototype);
	ZinTween_Rotation.prototype.constructor = ZinTween_Rotation;

	ZinTween_Rotation.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._startDeg = 0;			//開始角度
		this._endDeg = 0;			//終了角度
		this._direction = 1;		//回転方向
		this._alignX = 0;			//X方向の整列
		this._alignY = 0;			//Y方向の整列
		this._tweenMode = ExecutionMode.None;		//実行モード
	};

	ZinTween_Rotation.prototype.angle = function(target){
		return target.angle();
	};

	ZinTween_Rotation.prototype.setAngle = function(target,a){
		return target._angle = a;
	};

	//対象トゥイーンのx座標
	ZinTween_Rotation.prototype.x = function(target){
		return target._x;
	};

	//対象トゥイーンのy座標
	ZinTween_Rotation.prototype.y = function(target){
		return target._y;
	};

	ZinTween_Rotation.prototype.width = function(target){
		if(target.ztWidth === undefined) return 100; else return target.ztWidth;
	};

	ZinTween_Rotation.prototype.height = function(target){
		if(target.ztHeight === undefined) return 100; else return target.ztHeight;
	};

	//x座標をセット
	ZinTween_Rotation.prototype.setX = function(target,x){
		target._x = x;
	};

	//y座標をセット
	ZinTween_Rotation.prototype.setY = function(target,y){
		target._y = y;
	};

	ZinTween_Rotation.prototype.start = function(target) {
		switch(this._tweenMode){
			case ExecutionMode.None:
			case ExecutionMode.To:
				this._startDeg = this.angle(target);
				while(this._direction > 0 && this._endDeg < this._startDeg){
					this._endDeg += 360;
				}
				while(this._direction < 0 && this._endDeg > this._startDeg){
					this._endDeg -= 360;
				}
				break;
			case ExecutionMode.From:
				this._endDeg = this.angle(target);
				while(this._direction > 0 && this._startDeg < this._endDeg){
					this._startDeg += 360;
				}
				while(this._direction < 0 && this._startDeg > this._endDeg){
					this._startDeg -= 360;
				}
				break;
		}

		ZinTween_Object.prototype.start.apply(this, arguments);
		this.setAngle(target, this._startDeg);
	};

	ZinTween_Rotation.prototype.refresh = function(t,target) {
		ZinTween_Object.prototype.refresh.apply(this, arguments);
		var rot = this._startDeg + ZinTween.ease(t, this._easeType) * (this._endDeg - this._startDeg);	
		this.setAngle(target, rot);
	};

	ZinTween.ztRotationTo = function(zto,duration,d,target) {
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.To;

		//引数解析
		var resultD = ZinTween.analyzeNumber(d);

		//セット
		zto._endDeg = resultD[2];

		if(!Number.isFinite(d)){
			if(d.indexOf('REV') >= 0){
				zto._direction = -1; 
			}
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};

	ZinTween.ztRotationFrom = function(zto,duration,d,target) {
		zto._endTime = duration;
		zto._tweenMode = ExecutionMode.From;

		//引数解析
		var resultD = ZinTween.analyzeNumber(d);

		//セット
		zto._endDeg = resultD[2];

		if(!Number.isFinite(d)){
			if(d.indexOf('REV') >= 0){
				zto._direction = -1; 
			}
		}

		//Tweenを登録
		return ZinTween.Join(target, zto);
	};


	//-------------------------------------------------------------------------------------------------
	//	*********************************************************************************
	//	Sequence => PIXI.Container
	//	*********************************************************************************
	//-------------------------------------------------------------------------------------------------
	PIXI.Container.prototype.ztNumberTo = function(name,a,duration) {
		let zto = new ZinTween_Number();
		zto._refName = name;
		return ZinTween.setNumberTo(zto,duration,a,100,this);
	};

	PIXI.Container.prototype.ztNumberFrom = function(name,a,duration) {
		let zto = new ZinTween_Number();
		zto._refName = name;
		return ZinTween.setNumberFrom(zto,duration,a,100,this);
	};


	//-------------------------------------------------------------------------------------------------
	//	*********************************************************************************
	//	SequenceUpdate => Window
	//	*********************************************************************************
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	//	Window Move Base Class
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Window_Move() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Window_Move.prototype = Object.create(ZinTween_Move.prototype);
	ZinTween_Window_Move.prototype.constructor = ZinTween_Window_Move;

	//対象トゥイーンのx座標
	ZinTween_Window_Move.prototype.x = function(target){
		return target.x;
	};

	//対象トゥイーンのy座標
	ZinTween_Window_Move.prototype.y = function(target){
		return target.y;
	};

	//x座標をセット
	ZinTween_Window_Move.prototype.setX = function(target,x){
		target.x = x;
	};

	//y座標をセット
	ZinTween_Window_Move.prototype.setY = function(target,y){
		target.y = y;
	};

	Window.prototype.ztMoveTo = function(x,y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveTo(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Window.prototype.ztXMoveTo = function(x,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveTo(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Window.prototype.ztYMoveTo = function(y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveTo(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Window.prototype.ztMoveFrom = function(x,y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveFrom(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Window.prototype.ztXMoveFrom = function(x,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveFrom(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Window.prototype.ztYMoveFrom = function(y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveFrom(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Window.prototype.ztMoveBy = function(x,y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveBy(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Window.prototype.ztXMoveBy = function(x,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveBy(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Window.prototype.ztYMoveBy = function(y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveBy(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Window.prototype.ztMoveByFrom = function(x,y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveByFrom(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Window.prototype.ztXMoveByFrom = function(x,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveByFrom(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Window.prototype.ztYMoveByFrom = function(y,duration) {
		let zto = new ZinTween_Window_Move();
		return ZinTween.setMoveByFrom(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	//-------------------------------------------------------------------------------------------------
	//	Window Alpha
	//-------------------------------------------------------------------------------------------------
	function ZinTween_WindowAlpha() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_WindowAlpha.prototype = Object.create(ZinTween_Alpha.prototype);
	ZinTween_WindowAlpha.prototype.constructor = ZinTween_WindowAlpha;

	//対象の透明度
	ZinTween_WindowAlpha.prototype.opacity = function(target) {
		return target.opacity;
	};

	//対象の透明度にセット
	ZinTween_WindowAlpha.prototype.setOpacity = function(target,a) {
		target.contentsOpacity = a
		target.opacity = a;
		target.refresh();
	};

	Window.prototype.ztAlphaTo = function(a,duration) {
		let zto = new ZinTween_WindowAlpha();
		return ZinTween.setAlphaTo(zto,duration,a,255,this);
	};

	Window.prototype.ztAlphaFrom = function(a,duration) {
		let zto = new ZinTween_WindowAlpha();
		return ZinTween.setAlphaFrom(zto,duration,a,255,this);
	};

	
	//-------------------------------------------------------------------------------------------------
	//	Window_Selectable itemBackColor
	//	Window_Selectable用にitemBackColorの色を変更する
	//-------------------------------------------------------------------------------------------------
	ColorManager.zinTween_itemBackColor1 = [1,1,1,1];
	ColorManager.zinTween_itemBackColor2 = [1,1,1,1];

	const _ColorManager_itemBackColor1 = ColorManager.itemBackColor1;
	ColorManager.itemBackColor1 = function() {
		var c = _ColorManager_itemBackColor1.apply(this,arguments);
		if(JSON.stringify(ColorManager.zinTween_itemBackColor1) == JSON.stringify([1,1,1,1])){
			return c;
		}else{
			var rgba = c.substring(c.indexOf('(')+1, c.indexOf(')')).split(',').map(Number);
			for(let i = 0; i < 4; ++i)
			{
				if(rgba.length - 1 < i){
					rgba.append(0);
				}else{
					rgba[i] = rgba[i] * ColorManager.zinTween_itemBackColor1[i];
				}
			}
			ColorManager.zinTween_itemBackColor1 = [1,1,1,1];
			return "rgba(" + String(rgba[0]) + "," + String(rgba[1]) + "," + String(rgba[2]) + "," + String(rgba[3]) + ")";
		}	
	};

	const _ColorManager_itemBackColor2 = ColorManager.itemBackColor2;
	ColorManager.itemBackColor2 = function() {
		var c = _ColorManager_itemBackColor2.apply(this,arguments);
		if(JSON.stringify(ColorManager.zinTween_itemBackColor2) == JSON.stringify([1,1,1,1])){
			return c;
		}else{
			var rgba = c.substring(c.indexOf('(')+1, c.indexOf(')')).split(',').map(Number);
			for(let i = 0; i < 4; ++i)
			{
				if(rgba.length - 1 < i){
					rgba.append(0);
				}else{
					rgba[i] = rgba[i] * ColorManager.zinTween_itemBackColor2[i];
				}
			}
			ColorManager.zinTween_itemBackColor2 = [1,1,1,1];
			return "rgba(" + String(rgba[0]) + "," + String(rgba[1]) + "," + String(rgba[2]) + "," + String(rgba[3]) + ")";
		}	
	};

	const _Window_Selectable_drawBackgroundRect = Window_Selectable.prototype.drawBackgroundRect;
	Window_Selectable.prototype.drawBackgroundRect = function(rect) {
		if(this.tweenOpacity !== undefined)
		{
			ColorManager.zinTween_itemBackColor1 = [1,1,1,this.tweenOpacity/255];		
			ColorManager.zinTween_itemBackColor2 = [1,1,1,this.tweenOpacity/255];	
		}
		_Window_Selectable_drawBackgroundRect.apply(this,arguments);
	}

	//-------------------------------------------------------------------------------------------------
	//	Window_StatusBase
	//	ゲージカラーの透明度を変更できるようにする
	//-------------------------------------------------------------------------------------------------
	const Window_StatusBase_prototype_refresh = Window_StatusBase.prototype.refresh;
	Window_StatusBase.prototype.refresh = function() {
		Window_StatusBase_prototype_refresh.apply(this,arguments);
		for (const sprite of Object.values(this._additionalSprites)) {
			sprite._ztWindow = this;
			if(sprite.redraw !== undefined) sprite.redraw();
		}
	};

	const _Window_StatusParams_prototype_drawItem = Window_StatusParams.prototype.drawItem;
	Window_StatusParams.prototype.drawItem = function(index) {
		// アクターを選択していない状態を回避する
		if(this._actor){
			_Window_StatusParams_prototype_drawItem.apply(this,arguments);
		}
	};

	const _Sprite_Gauge_prototype_gaugeBackColor = Sprite_Gauge.prototype.gaugeBackColor;
	Sprite_Gauge.prototype.gaugeBackColor = function() {
		var rgba = _Sprite_Gauge_prototype_gaugeBackColor.apply(this,arguments);
		if(this._ztWindow !== undefined && this._ztWindow.tweenOpacity !== undefined){
			return rgba + ('00' + this._ztWindow.tweenOpacity.toString(16)).slice(-2);	//最後の２桁が透明度
		}
		return rgba;
	};

	const _Sprite_Gauge_prototype_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
	Sprite_Gauge.prototype.gaugeColor1 = function() {
		var rgba = _Sprite_Gauge_prototype_gaugeColor1.apply(this,arguments);
		return ZinTween.changeColorCode(rgba, this._ztWindow);
	};

	const _Sprite_Gauge_prototype_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
	Sprite_Gauge.prototype.gaugeColor2 = function() {
		var rgba = _Sprite_Gauge_prototype_gaugeColor2.apply(this,arguments);
		return ZinTween.changeColorCode(rgba, this._ztWindow);
	};

	const _Sprite_Gauge_prototype_labelOutlineColor = Sprite_Gauge.prototype.labelOutlineColor;
	Sprite_Gauge.prototype.labelOutlineColor = function() {
		var rgba = _Sprite_Gauge_prototype_labelOutlineColor.apply(this,arguments);
		return ZinTween.changeColorCode(rgba, this._ztWindow);
	};

	const _Sprite_Gauge_prototype_valueColor = Sprite_Gauge.prototype.valueColor;
	Sprite_Gauge.prototype.valueColor = function() {
		var rgba = _Sprite_Gauge_prototype_valueColor.apply(this,arguments);
		return ZinTween.changeColorCode(rgba, this._ztWindow);
	};

	const _Sprite_Gauge_prototype_valueOutlineColor = Sprite_Gauge.prototype.valueOutlineColor;
	Sprite_Gauge.prototype.valueOutlineColor = function() {
		var rgba = _Sprite_Gauge_prototype_valueOutlineColor.apply(this,arguments);
		return ZinTween.changeColorCode(rgba, this._ztWindow);
	};

	const _Sprite_Gauge_prototype_labelOpacity = Sprite_Gauge.prototype.labelOpacity;
	Sprite_Gauge.prototype.labelOpacity = function() {
		var opacity = _Sprite_Gauge_prototype_labelOpacity.apply(this, arguments);
		if(this._ztWindow !== undefined && this._ztWindow.tweenOpacity !== undefined){
			return Math.round(opacity * this._ztWindow.tweenOpacity / 255);
		}
		return opacity;
	};

	//-------------------------------------------------------------------------------------------------
	//	*********************************************************************************
	//	SequenceUpdate => Sprite
	//	*********************************************************************************
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	//	Sprite Move Base Class
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Sprite_Move() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Sprite_Move.prototype = Object.create(ZinTween_Move.prototype);
	ZinTween_Sprite_Move.prototype.constructor = ZinTween_Sprite_Move;

	//対象トゥイーンのx座標
	ZinTween_Sprite_Move.prototype.x = function(target){
		return target.x;
	};

	//対象トゥイーンのy座標
	ZinTween_Sprite_Move.prototype.y = function(target){
		return target.y;
	};

	//対象トゥイーンの横幅
	ZinTween_Sprite_Move.prototype.width = function(target){
		return target.width * target.scale.x;
	};

	//対象トゥイーンの縦幅
	ZinTween_Sprite_Move.prototype.height = function(target){
		return target.height * target.scale.y;
	};

	//x座標をセット
	ZinTween_Sprite_Move.prototype.setX = function(target,x){
		target.x = x;
	};

	//y座標をセット
	ZinTween_Sprite_Move.prototype.setY = function(target,y){
		target.y = y;
	};

	Sprite.prototype.ztMoveTo = function(x,y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveTo(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Sprite.prototype.ztXMoveTo = function(x,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveTo(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Sprite.prototype.ztYMoveTo = function(y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveTo(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Sprite.prototype.ztMoveFrom = function(x,y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveFrom(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Sprite.prototype.ztXMoveFrom = function(x,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveFrom(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Sprite.prototype.ztYMoveFrom = function(y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveFrom(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Sprite.prototype.ztMoveBy = function(x,y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveBy(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Sprite.prototype.ztXMoveBy = function(x,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveBy(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Sprite.prototype.ztYMoveBy = function(y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveBy(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Sprite.prototype.ztMoveByFrom = function(x,y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveByFrom(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Sprite.prototype.ztXMoveByFrom = function(x,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveByFrom(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Sprite.prototype.ztYMoveByFrom = function(y,duration) {
		let zto = new ZinTween_Sprite_Move();
		return ZinTween.setMoveByFrom(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};


	//-------------------------------------------------------------------------------------------------
	//	Sprite Alpha
	//	スプライトの透明度を変更する
	//-------------------------------------------------------------------------------------------------
	function ZinTween_SpriteAlpha() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_SpriteAlpha.prototype = Object.create(ZinTween_Alpha.prototype);
	ZinTween_SpriteAlpha.prototype.constructor = ZinTween_SpriteAlpha;

	//対象の透明度
	ZinTween_SpriteAlpha.prototype.opacity = function(target) {
		return target.opacity;
	};

	//対象の透明度にセット
	ZinTween_SpriteAlpha.prototype.setOpacity = function(target,a) {
		target.tweenOpacity = a;
		target.opacity = target.tweenOpacity;
		target._refresh();
	};

	Sprite.prototype.ztAlphaTo = function(a,duration) {
		let zto = new ZinTween_SpriteAlpha();
		return ZinTween.setAlphaTo(zto,duration,a,255,this);
	};

	Sprite.prototype.ztAlphaFrom = function(a,duration) {
		let zto = new ZinTween_SpriteAlpha();
		return ZinTween.setAlphaFrom(zto,duration,a,255,this);
	};

	//色を指定トーンカラーへ変化させる
	Sprite.prototype.ztColorTo = function(c,duration) {
		let zto = new ZinTween_Color();
		return ZinTween.setColorTo(zto,duration,c,255,this);
	};

	//色を指定トーンカラーから変化させる
	Sprite.prototype.ztColorFrom = function(c,duration) {
		let zto = new ZinTween_Color();
		return ZinTween.setColorFrom(zto,duration,c,255,this);
	};

	//指定Hueへ変化させる
	Sprite.prototype.ztHueTo = function(c,duration) {
		let zto = new ZinTween_Hue();
		return ZinTween.setHueTo(zto,duration,c,360,this);
	};

	//指定Hueから変化させる
	Sprite.prototype.ztHueFrom = function(c,duration) {
		let zto = new ZinTween_Hue();
		return ZinTween.setHueFrom(zto,duration,c,360,this);
	};


	//-------------------------------------------------------------------------------------------------
	//	Sprite Scale Base Class
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Sprite_Scale() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Sprite_Scale.prototype = Object.create(ZinTween_Scale.prototype);
	ZinTween_Sprite_Scale.prototype.constructor = ZinTween_Sprite_Scale;

	//対象トゥイーンのx座標
	ZinTween_Sprite_Scale.prototype.x = function(target){
		return target.x;
	};

	//対象トゥイーンのy座標
	ZinTween_Sprite_Scale.prototype.y = function(target){
		return target.y;
	};

	//x座標をセット
	ZinTween_Sprite_Scale.prototype.setX = function(target,x){
		target.x = x;
	};

	//y座標をセット
	ZinTween_Sprite_Scale.prototype.setY = function(target,y){
		target.y = y;
	};

	Sprite.prototype.ztScaleTo = function(x,y,duration) {
		let zto = new ZinTween_Sprite_Scale();
		return ZinTween.setScaleTo(zto,duration,x,y,1.0,1.0,true,true,this);
	};

	Sprite.prototype.ztScaleFrom = function(x,y,duration) {
		let zto = new ZinTween_Sprite_Scale();
		return ZinTween.setScaleFrom(zto,duration,x,y,1.0,1.0,true,true,this);
	};


	//-------------------------------------------------------------------------------------------------
	//	Sprite Rotation Base Class
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Sprite_Rotation() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Sprite_Rotation.prototype = Object.create(ZinTween_Rotation.prototype);
	ZinTween_Sprite_Rotation.prototype.constructor = ZinTween_Sprite_Rotation;

	ZinTween_Sprite_Rotation.prototype.initialize = function() {
		ZinTween_Object.prototype.initialize.apply(this, arguments);
		this._startDeg = 0;			//開始角度
		this._endDeg = 0;			//終了角度
	};

	ZinTween_Sprite_Rotation.prototype.angle = function(target){
		return target.rotation * Rad2Deg;
	};

	ZinTween_Sprite_Rotation.prototype.setAngle = function(target,a){
		return target.rotation = a * Deg2Rad;
	};

	//対象トゥイーンのx座標
	ZinTween_Sprite_Rotation.prototype.x = function(target){
		return target.x;
	};

	//対象トゥイーンのy座標
	ZinTween_Sprite_Rotation.prototype.y = function(target){
		return target.y;
	};

	ZinTween_Sprite_Rotation.prototype.width = function(target){
		if(target.ztWidth === undefined) return 100; else return target.ztWidth;
	};

	ZinTween_Sprite_Rotation.prototype.height = function(target){
		if(target.ztHeight === undefined) return 100; else return target.ztHeight;
	};

	//x座標をセット
	ZinTween_Sprite_Rotation.prototype.setX = function(target,x){
		target.x = x;
	};

	//y座標をセット
	ZinTween_Sprite_Rotation.prototype.setY = function(target,y){
		target.y = y;
	};

	Sprite.prototype.ztRotationTo = function(d,duration) {
		let zto = new ZinTween_Rotation();
		return ZinTween.ztRotationTo(zto,duration,d,this);
	};

	Sprite.prototype.ztRotationTo = function(d,duration) {
		let zto = new ZinTween_Rotation();
		return ZinTween.ztRotationFrom(zto,duration,d,this);
	};

	//-------------------------------------------------------------------------------------------------
	//	Sprite Rotation By
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Sprite_RotationBy() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Sprite_RotationBy.prototype = Object.create(ZinTween_Sprite_Rotation.prototype);
	ZinTween_Sprite_RotationBy.prototype.constructor = ZinTween_Sprite_RotationBy;

	ZinTween_Sprite_RotationBy.prototype.start = function(target) {
		this._startDeg = target.rotation * Rad2Deg;
		this._endDeg += this._startDeg;
		ZinTween_Sprite_Rotation.prototype.start.apply(this, arguments);
	};

	/*
	スプライトをd°だけ回転する
	*/
	Sprite.prototype.ztRotationBy = function(d,duration) {
		var zto = new ZinTween_Sprite_RotationBy();
		zto._endTime = duration;

		//引数解析
		var resultD = ZinTween.analyzeNumber(d);

		//セット
		zto._endDeg = resultD[2];      

		//Tweenを登録
		if(this._ztSeq === undefined) this._ztSeq = new ZinTween_Sequence();
		this._ztSeq.join(zto,this);
		return zto;
	};


	//-------------------------------------------------------------------------------------------------
	//	Game_Picuture
	//-------------------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------------------
	//	Game_Picture Move
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Picture_Move() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Picture_Move.prototype = Object.create(ZinTween_Move.prototype);
	ZinTween_Picture_Move.prototype.constructor = ZinTween_Picture_Move;

	ZinTween_Picture_Move.prototype.width = function(target){
		if(target.ztWidth) return target.ztWidth * target._scaleX * 0.01; else return 100;
	};

	ZinTween_Picture_Move.prototype.height = function(target){
		if(target.ztHeight) return target.ztHeight * target._scaleY * 0.01; else return 100;
	};

	Game_Picture.prototype.ztMoveTo = function(x,y,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveTo(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Game_Picture.prototype.ztXMoveTo = function(x,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveTo(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Game_Picture.prototype.ztYMoveTo = function(y,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveTo(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Game_Picture.prototype.ztMoveFrom = function(x,y,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveFrom(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Game_Picture.prototype.ztXMoveFrom = function(x,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveFrom(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Game_Picture.prototype.ztYMoveFrom = function(y,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveFrom(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Game_Picture.prototype.ztMoveBy = function(x,y,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveBy(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Game_Picture.prototype.ztXMoveBy = function(x,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveBy(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Game_Picture.prototype.ztYMoveBy = function(y,duration) {
		let zto = new ZinTween_Picture_Move();
		return ZinTween.setMoveBy(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};


	//-------------------------------------------------------------------------------------------------
	//	Game_Picture Alpha
	//-------------------------------------------------------------------------------------------------
	Game_Picture.prototype.ztAlphaTo = function(a,duration) {
		let zto = new ZinTween_Alpha();
		return ZinTween.setAlphaTo(zto,duration,a,255,this);
	};

	Game_Picture.prototype.ztAlphaFrom = function(a,duration) {
		let zto = new ZinTween_Alpha();
		return ZinTween.setAlphaFrom(zto,duration,a,255,this);
	};


	//-------------------------------------------------------------------------------------------------
	//	Sprite_Picture: ピクチャの縦幅・横幅をピクチャクラスに記憶
	//-------------------------------------------------------------------------------------------------
	const Sprite_Picture_prototype_updateBitmap = Sprite_Picture.prototype.updateBitmap;
	Sprite_Picture.prototype.updateBitmap = function() {
		Sprite_Picture_prototype_updateBitmap.apply(this,arguments);
		let picture = this.picture();

		if (picture && this.bitmap) {
			if(!picture.ztWidth || picture.ztWidth != this.bitmap.width){
				picture.ztWidth = this.bitmap.width;
			}
			if(!picture.ztHeight || picture.ztHeight != this.bitmap.height){
				picture.ztHeight = this.bitmap.height;
			}
		}
	};


	//-------------------------------------------------------------------------------------------------
	//	Game_Picuture Scale
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Picture_Scale() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Picture_Scale.prototype = Object.create(ZinTween_Scale.prototype);
	ZinTween_Picture_Scale.prototype.constructor = ZinTween_Picture_Scale;

	ZinTween_Picture_Scale.prototype.width = function(target){
		if(target.ztWidth === undefined) return 100; else return target.ztWidth;// * target._scaleX * 0.01;
	}

	ZinTween_Picture_Scale.prototype.height = function(target){
		if(target.ztHeight === undefined) return 100; else return target.ztHeight;// * target._scaleY * 0.01;
	}

	ZinTween_Picture_Scale.prototype.xScale = function(target){
		return target._scaleX * 0.01;
	}

	ZinTween_Picture_Scale.prototype.yScale = function(target){
		return target._scaleY * 0.01;
	}

	ZinTween_Picture_Scale.prototype.setXScale = function(target,x){
		target._scaleX = x * 100;
	}

	ZinTween_Picture_Scale.prototype.setYScale = function(target,y){
		target._scaleY = y * 100;
	}

	Game_Picture.prototype.ztScaleTo = function(x,y,duration) {
		let zto = new ZinTween_Picture_Scale();
		return ZinTween.setScaleTo(zto,duration,x,y,1.0,1.0,true,true,this);
	};

	Game_Picture.prototype.ztScaleFrom = function(x,y,duration) {
		let zto = new ZinTween_Picture_Scale();
		return ZinTween.setScaleFrom(zto,duration,x,y,1.0,1.0,true,true,this);
	};

	//-------------------------------------------------------------------------------------------------
	//	Picture Rotation To
	//-------------------------------------------------------------------------------------------------
	Game_Picture.prototype.ztRotationTo = function(d,duration) {
		let zto = new ZinTween_Rotation();
		return ZinTween.ztRotationTo(zto,duration,d,this);
	};




	//-------------------------------------------------------------------------------------------------
	//	Bitmap Class
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Bitmap_Move() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Bitmap_Move.prototype = Object.create(ZinTween_Move.prototype);
	ZinTween_Bitmap_Move.prototype.constructor = ZinTween_Picture_Move;

	//対象トゥイーンのx座標
	ZinTween_Move.prototype.x = function(target){
		return target._x;
	};

	//対象トゥイーンのy座標
	ZinTween_Move.prototype.y = function(target){
		return target._y;
	};

	//x座標をセット
	ZinTween_Move.prototype.setX = function(target,x){
		target._x = x;
	};

	//y座標をセット
	ZinTween_Move.prototype.setY = function(target,y){
		target._y = y;
	};

	Bitmap.prototype.ztMoveTo = function(x,y,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveTo(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Bitmap.prototype.ztXMoveTo = function(x,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveTo(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Bitmap.prototype.ztYMoveTo = function(y,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveTo(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Bitmap.prototype.ztMoveFrom = function(x,y,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveFrom(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Bitmap.prototype.ztXMoveFrom = function(x,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveFrom(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Bitmap.prototype.ztYMoveFrom = function(y,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveFrom(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	Bitmap.prototype.ztMoveBy = function(x,y,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveBy(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Bitmap.prototype.ztXMoveBy = function(x,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveBy(zto,duration,x,0,Graphics.boxWidth,Graphics.boxHeight,true,false,this);
	};

	Bitmap.prototype.ztYMoveBy = function(y,duration) {
		let zto = new ZinTween_Bitmap_Move();
		return ZinTween.setMoveBy(zto,duration,0,y,Graphics.boxWidth,Graphics.boxHeight,false,true,this);
	};

	
	//-------------------------------------------------------------------------------------------------
	//	Tween Update Wrapper
	//-------------------------------------------------------------------------------------------------
	const _Window_prototype_update = Window.prototype.update;
	Window.prototype.update = function() {
		_Window_prototype_update.apply(this,arguments);
		if(this._ztSeq !== undefined) this._ztSeq.update(this);
	};

	const _Sprite_prototype_update = Sprite.prototype.update;
	Sprite.prototype.update = function() {
		_Sprite_prototype_update.apply(this,arguments);
		if(this._ztSeq !== undefined) this._ztSeq.update(this);
	};

	const _Game_Picture_prototype_update = Game_Picture.prototype.update;
	Game_Picture.prototype.update = function() {
		_Game_Picture_prototype_update.apply(this,arguments);
		if(this._ztSeq !== undefined) this._ztSeq.update(this);
	};
	

})();
