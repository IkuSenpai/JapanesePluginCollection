/*:
* @target MZ
* @plugindesc ちょこまかさせたいときに使うアレ
* Ver 1.0.1
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help MoveAnimationSppedUp.js
*
* 歩く時、アニメ速度を上げてちょこまか脚を動かします。
* そんな感じの小物プラグイン。
*
* ＜アレ＞
* デフォルトの歩行アニメだと
* 移動速度とアニメがかみ合ってなくて
* なんとなく滑って移動してる感じがあるのでちょっといじってみました。
*
* ＜他＞
* 設定もプラグインコマンドもありません。
*
* 無保証。改造自由。
* 利用も商用・無償・年齢区分にかかわらず自由。
* ライセンスはＭＩＴでたのんます。
* 改造する時このヘルプの下部にあるＭＩＴに関する文章をいじくらなければＯＫ。
*
* ＜履歴＞
* Ver 1.0.1
* ・とりあえずＭＩＴライセンス化。
* ・ついでにファイル名で脱字してたので修正（要取り換え）。
*
* Ver 1.0.0
* ・一応完成。
*
* ＜ＭＩＴライセンス条文＞
* MIT License
* 
* Copyright (c) 2020 木下英一
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
*/

(() => {
	'use strict';

	//-----------------------------------------------------------------------------
	// Game_CharacterBase
	//
	// Game_Characterのスーパークラスです。
	// 全キャラクターで共有される座標や画像などの基本情報を扱います。

	Game_CharacterBase.prototype.animationWait = function() {
		if(this.isMoving()){
			return (9 - this.realMoveSpeed()) * 1;	//ここをいじるとよろし。デフォルトは(9 - this.realMoveSpeed()) * 3。
		}else{
			return (9 - this.realMoveSpeed()) * 3;
		}
	};

	Game_CharacterBase.prototype.updateAnimationCount = function() {
		if (this.isMoving() && this.hasWalkAnime()) {
			this._animationCount += 1;	//ここをいじるとよろし。デフォルトは1.5。
		} else if (this.hasStepAnime() || !this.isOriginalPattern()) {
			this._animationCount++;
		}
	};
})();