/*:
* @target MZ
* @plugindesc ＭＺをＱＶＧＡ沼に引きずり込もうとするアレ
* Ver 0.2.8
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help CrazyQvgaMZ.js
*
* ＜注意＞
* 使う画像素材のファイル名に全角文字は決して使わないでください。
* ブラウザデプロイでは404喰らいます。それがインターネットの理なのだ…。
* ＲＰＧツクール２０００、２００３から素材を持ってきた時は特に要確認！
*
* ＜アレ＞
* ＭＺをＱＶＧＡ仕様にしてみました。自称「あたまおかしい魔改造プラグイン」です。
* 仕様が変わる事があります。割とグダグダ。
* 全体的に大幅に動作を変えるプラグインですので設置順にはご注意ください。
* コアスクリプト1.5.0でもなんか大丈夫そうです。
*
* 主にＲＰＧツクール２０００とか２００３とかに骨抜きにされちゃった人向けです。
* または「低解像度がどちらかというと好き」な人向けです。
* 粗々の画面は好きかい？
*
* 解像度が低い事で素材準備の難易度が下がる可能性も…。（人によっては逆に上がる）
*
* 基本的に素材用意してプラグインぶち込んじゃえば一気に全体がそれっぽい雰囲気に変化します。
*
* 当方作プラグイン「FeelPixelperfect.js」と一緒に使うのが効果的です。
*
* 当方作プラグイン「LookAtMHPMMP.js」も使えます。ＨＰ・ＭＰの最大値表示が欲しい場合にどうぞ。
* おススメの設定は「digit_fontsize_sub = 2 / maxvalue_y_offset = 0 / battle = false」です。
*
* 「BattleendShowExpAndMoney.js」も使えるようになりました。
*
* 他のプラグインとは多分相性悪いです。
* 
* ＜正しく動かすのに最低限必要な設定＞
* タイルサイズを「16x16」（RPGツクールMZ1.5.0以降）
* 「システム２」の「高度な設定」内の
* ・「メインフォントのファイル名」を PixelMplus12-Regular.woff
* ・「数字フォントのファイル名」を PixelMplus10-Regular.woff
* ・「フォントサイズ」を 12
* に設定してください。
* 「～フォントのファイル名」は代わりのものがありましたら別なものでも構いません。
* 
* ＜正しく動かすのに最低限必要なもの＞
* ・フォント
* 　　・添付のフォントファイルをfontフォルダに入れてください。
* 　　　中身はPixelMplus（ピクセル・エムプラス）をウェブフォント化したものです。
* 　　　http://itouhiro.hatenablog.com/entry/20130602/font
* 　　　ライセンス：M+ FONT LICENSE
* 　　・もう一つはこれ専用に作ったビットマップフォントです。（Kinoei*.woff）
* 　　　ご自由にお使いください。
* ・顔グラフィック
* 　単位サイズは48x48です。
* ・トップビュー用エネミーグラフィック、サイドビュー用グラフィック（アクター、エネミー両方）
* 　エディットしやすくするには素材のサイズを３倍にし
* 　「トップ（またはサイド）ビューエネミーを縮小するかどうか」をtrueにしてください。
* ・マップタイル
* 　　単位サイズは16x16ドットです。
* 　　・ＭＺの通常の仕様のもの。
* 　　　　・RPGツクールMZ Ver1.5.0以降の場合
* 　　　　　　データベースで「システム２」の「タイルサイズ」を「16x16」に設定してください。
* 　　　　　　画像は拡大させずにそのままお使いください。
* 　　　　・RPGツクールMZ Ver1.5.0未満の場合
* 　　　　　　ゲーム中ではフィルタなしの1/3倍にされて使用されます。
* 　　　　　　ＲＰＧツクール２０００、２００３用のものを使うにはフィルタなしで３倍の大きさにしてください。
* 　　　　各ツクールのＲＴＰ画像を使用する場合はそれぞれユーザー登録を済ませている必要があります。
* 　　　　ただし最近になって一部登録不要になったものもあります、必ず規約をご確認ください。
* 
* ・キャラクター
* 　　・ＭＺ仕様そのまま
* 　　　　ＲＰＧツクール２０００のキャラクター画像を拡大加工なしにそのまま使えます。
* 　　　　ただし、向き位置をＭＺの仕様に合わせて修正する必要があります。（上右下左　から 下左右上　の順へ）
*
* ＜他＞
* 敵の位置が微妙に狂ってる感じがするのは仕様みたいなものです。
* かなり大変ですがテストしながら少しずつ調整しましょう。
*
* プラグインコマンドはありません。
*
* 設定変更して戦闘テストする場合、
* 戦闘テスト前にセーブしないと反映されませんのでご注意ください。
*
* このプラグイン自体は無保証。改造自由です。
* 利用も商用・無償・年齢区分にかかわらず自由。
* このプラグインのライセンスはＭＩＴでたのんます。
* 改造する時このヘルプの下部にあるＭＩＴに関する文章をいじくらなければＯＫ。
* 他のアセット（フォント）はそれぞれのライセンスに従ってください。
* 
* ＜履歴＞
* Ver 0.2.8(22/06/03)
* ・「タイルセットを縮小する」設定の追加。
* ・タイルマップの処理を修正。
* 
* Ver 0.2.7(22/06/02)
* ・コアスクリプト1.3.3の仕様追加の影響でゲージ位置が狂ってしまっていたのを修正。
* ・今更ながらやっとヘルプ（これ）に「＜正しく動かすのに最低限必要な設定＞」の案内を追加。
* ・「システム２」の「高度な設定」内の
* 　「画面の幅」「画面の高さ」「UIエリアの幅」「UIエリアの高さ」を動作時に上書きするように変更。
* 　これにより変更不要化。
* ・設定「戦闘画面の敵位置の調整方法」を追加。敵のＹ位置計算方法に関する設定です。
* 　位置の正確さよりも設置のしやすさを少し優先しています。
* 
* Ver 0.2.6(22/05/14)
* ・アイテム一覧、スキル一覧の両端余白を詰めた。
* 　（アイテム名、スキル名で全角９文字以内であればぼやけなくなります。１文字増えた！）
* ・戦闘コマンドウィンドウの幅を増やした。
* 　（コマンド名で全角５文字以内であればぼやけなくなります。こちらも１文字増えた！）
* ・オリジナルフォント同梱。（「ＨＰやＭＰの最大値見たくなった時に使うアレ」プラグインの都合）
* ・「ＨＰやＭＰの最大値見たくなった時に使うアレ」用の設定を３つ追加。
* ・戦闘時のゲージ幅が狭かったので修正。
* 
* Ver 0.2.5(20/10/30)
* ・コアスクリプト1.1.0対応。
* 　　＊アニメーション「下揃え」設定対応。
* 　　＊ゲージ名称長さ可変対応。
* ・戦闘アニメが下に寄ってたのを修正。
* ・戦闘アニメのオフセット設定に対応。
*
* Ver 0.2.4(20/10/18)
* ・アイテム名が８文字からぼやけ始めていたのを修正。
* 　（と言いつつも、保証は８文字まで。それ以降はスペースに無理が出てきてぼやけ始めます。）
*
* Ver 0.2.3(20/10/08)
* ・マップ名表示のぼやけを修正。
* ・Sprite_BattleNameをグローバル化。
* ・Sprite_BattleGaugeをグローバル化。
* ・装備画面のウィンドウ、装備スロット名幅を決め打ちに変更。
* 　（装備スロット名をぼやけ無し５文字、アイテム名をぼやけ無し８文字を保証するため）
* ・parseIntをMath.truncに変更。
* ・Ｆ９で開けるデバッグウィンドウに対応。
*
* Ver 0.2.2(20/09/17)
* ・ダメージ数値のぼやけを修正。
* ・フキダシアイコンの表示不備を修正。
* ・影チップレイヤー表示を有効にするかの設定を追加。
*
* Ver 0.2.1(20/09/15)
* ・サイドビューの戦闘背景位置を誤っていたので修正。
* ・ムービー再生サイズを変更。
*
* Ver 0.2.0(20/09/13)
* ・画像を「１倍から０．３３４倍」にする方式から「３倍サイズからフィルタなしで動的に1/3倍」にする方式に変更。
* 　これによりサフィックス「_game」の付いたゲーム用画像ファイルを別途用意する必要が無くなりました。
* ・通常時の名前幅の計算方法を変更。
* ・オプションウィンドウの内部項目の幅を修正。
* ・ぼやけ表示、それに関する表示不都合を修正。
* ・オプション名の１つをtypoしていたので修正（「サイドビュー武器を縮小するかどうか」の項目）。
* ・サイドビューステート画像のチップサイズを自動算出する方式に変更。
* ・サイドビュー武器画像のチップサイズを自動算出する方式に変更。
* ・戦闘アニメの位置を調整。
* ・ピクチャを自動縮小してしまっていたので修正。
* ・ショップ画面のコマンドがぼやけてたので修正。
* ・装備画面のサイズを全体的に微調整。
* ・ステータス画面のサイズを全体的に微調整。
*
* Ver 0.1.2(20/09/09)
* ・実際にゲームで使用する画像ファイルのサフィックス（後ろに付ける文字）を「_game」に統一。
* ・マップ名表示対応。
* ・ダメージ数字をちょっとだけ調整。
* ・初期拡縮モードを有効にするようにした。（主にブラウザデプロイ向け、Ｆ３キーのアレです。もちろん切り替え可能。）
*
* Ver 0.1.1(20/09/05)
* ・サイドビューキャラクターの縮小設定が通っていなかったのを修正。
* 　（正常に処理されていますが、微妙に縮小がかかる場合があるようです…）
*
* Ver 0.1.0(20/09/05)
* ・とりあえず動けばもうけもん版。
*
* ＜PixelMplus（ピクセル・エムプラス）のライセンス条文＞
* These fonts are free software.
* Unlimited permission is granted to use, copy, and distribute it, with or without modification, either commercially and noncommercially.
* THESE FONTS ARE PROVIDED "AS IS" WITHOUT WARRANTY.
*
* これらのフォントはフリー（自由な）ソフトウエアです。
* あらゆる改変の有無に関わらず、また商業的な利用であっても、自由にご利用、複製、再配布することができますが、全て無保証とさせていただきます。
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

* @param no_reduction_front_enemies
* @text フロントビューエネミーを縮小するかどうか
* @desc フロントビューエネミー画像を自動縮小します。フィルタなしで縮小します。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param no_reduction_sv_actors
* @text サイドビューアクターを縮小するかどうか
* @desc サイドビューアクター画像を自動縮小します。フィルタなしで縮小します。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param no_reduction_sv_enemies
* @text サイドビューエネミーを縮小するかどうか
* @desc サイドビューエネミー画像を自動縮小します。フィルタなしで縮小します。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param no_reduction_sv_weapons
* @text サイドビュー武器を縮小するかどうか
* @desc サイドビュー武器画像を自動縮小します。しかしぼやけまくります。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param enable_map_auto_shadow
* @text 影チップレイヤー表示を有効にするかどうか
* @desc 有効の場合はＭＺデフォルト通りの動作になります。無効にすると影チップが全部無効になります。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param enable_minifont_for_lookathmpmmpjs
* @text LookAtMHPMMPプラグインのフォントを変えるかどうか
* @desc LookAtMHPMMPプラグインを使っている場合は有効にする事をおすすめします。設定固定にされます。戦闘用。
* @default false
* @type boolean
* @on うむッ！
* @off いかんッ！

* @param enable_fonttype_for_lookathmpmmpjs_norm
* @text LookAtMHPMMPプラグインのフォントを何に変えるか
* @desc LookAtMHPMMPプラグインを使っていて最大値４桁の場合は小さくする事をおすすめします。戦闘用。
* @default 0
* @type select
* @option QVGAプラグインのデフォルト
* @value 0
* @option ちっさい
* @value 1

* @param enemy_position_adjust
* @text 戦闘画面の敵位置の調整方法
* @desc 戦闘画面での敵位置の調整方法を選択します。場合によっては画面外に行ったりUIに被ったりします。
* @default 1
* @type select
* @option 古いやつ
* @value 0
* @option 0.2.7からのやつ
* @value 1

* @param zoom_tilesets
* @text タイルセットを縮小する
* @desc 主にRPGツクール1.5.0未満の設定です。３倍にしたタイルセットを本来のサイズに縮小します。
* @default false
* @type boolean
* @on うむッ！
* @off いかんッ！

*/
//memo : 816 * 624

(() => {
	'use strict';
	//-----------------------------------------------------------------------------
	//
	//
	// パラメータをほじくるときに使います

	let plugin_params = PluginManager.parameters("CrazyQvgaMZ");
	if(plugin_params["no_reduction_front_enemies"] === undefined)plugin_params["no_reduction_front_enemies"] = "true";
	if(plugin_params["no_reduction_sv_actors"] === undefined)plugin_params["no_reduction_sv_actors"] = "true";
	if(plugin_params["no_reduction_sv_enemies"] === undefined)plugin_params["no_reduction_sv_enemies"] = "true";
	if(plugin_params["no_reduction_sv_weapons"] === undefined)plugin_params["no_reduction_sv_weapons"] = "true";
	if(plugin_params["enable_map_auto_shadow"] === undefined)plugin_params["enable_map_auto_shadow"] = "true";
	if(plugin_params["enable_minifont_for_lookathmpmmpjs"] === undefined)plugin_params["enable_minifont_for_lookathmpmmpjs"] = "false";
	if(plugin_params["enable_fonttype_for_lookathmpmmpjs_norm"] === undefined)plugin_params["enable_fonttype_for_lookathmpmmpjs_norm"] = "0";
	if(plugin_params["enemy_position_adjust"] === undefined)plugin_params["enemy_position_adjust"] = "1";
	if(plugin_params["zoom_tilesets"] === undefined)plugin_params["zoom_tilesets"] = "false";

	//-----------------------------------------------------------------------------
	//
	//
	// メイン部分

	ImageManager.iconWidth = 16;
	ImageManager.iconHeight = 16;
	ImageManager.faceWidth = 48;
	ImageManager.faceHeight = 48;

	const old_graphics_update_all_elements = Graphics._updateAllElements;
	Graphics._updateAllElements = function() {
		//「画面の幅」「画面の高さ」設定をQVGAに上書きする（おそらく禁じ手）
		this._width = 320;
		this._height = 240;
		//ここで画面レートを初期化する
		this.rate_x = this._width / 816;
		this.rate_y = this._height / 624;

		old_graphics_update_all_elements.apply(this, arguments);
	};

	// 意地でも初期拡大モードを有効にする
	Graphics._defaultStretchMode = function() {
		return true;
	};

	Graphics._updateVideo = function() {
		const width = this._width * this._realScale * this.rate_x;
		const height = this._height * this._realScale * this.rate_y;
		Video.resize(width, height);
	};

	/*// 将来オプションで使うかも使わないかも
	Graphics.SetStretchMode = function(stretch_enabled) {
		this._stretchEnabled = stretch_enabled;
		this._updateAllElements();
	};*/

	const old_bitmap_initialize = Bitmap.prototype.initialize;
	Bitmap.prototype.initialize = function(width, height) {
		this._isReduction = false;
		this._rate = 1.0;
		old_bitmap_initialize.apply(this, arguments);
		this._padding = 6;
		this._margin = 2;
		this.fontSize = 12;
		this.outlineWidth = 2;
	};

	/**
	 * Performs a block transfer.
	 *
	 * @param {Bitmap} source - The bitmap to draw.
	 * @param {number} sx - The x coordinate in the source.
	 * @param {number} sy - The y coordinate in the source.
	 * @param {number} sw - The width of the source image.
	 * @param {number} sh - The height of the source image.
	 * @param {number} dx - The x coordinate in the destination.
	 * @param {number} dy - The y coordinate in the destination.
	 * @param {number} [dw=sw] The width to draw the image in the destination.
	 * @param {number} [dh=sh] The height to draw the image in the destination.
	 */
	Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
		dw = dw || sw;
		dh = dh || sh;
		try {
			const image = source._canvas || source._image;
			this.context.globalCompositeOperation = "source-over";
			this.context.imageSmoothingEnabled = this._smoothingEnable;
			this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
			this.context.imageSmoothingEnabled = true;	//設定を通常に戻す
			this._baseTexture.update();
		} catch (e) {
			//
		}
	};

	/**
	 * Loads a image file.
	 *
	 * @param {string} url - The image url of the texture.
	 * @param {boolean} isReduction - 縮小するつもりかどうか
	 * @param {number} rate - 縮小するならどのくらい縮めるのか　０以下で倍率方式から割り算方式に変更（正数化して割り算に使う）
	 * @param {boolean} [smoothingEnable = true] - スムージング設定を有効にするかどうか
	 * @returns {Bitmap} The new bitmap object.
	 */
	Bitmap.load = function(url, isReduction = false, rate = 1.0, smoothingEnable = true) {
		if(rate === 0){
			return null;	//０なら無を取得
		}
		const bitmap = Object.create(Bitmap.prototype);
		bitmap.initialize();
		bitmap._url = url;
		bitmap._isReduction = isReduction;
		bitmap._startLoading();
		bitmap._rate = rate;
		bitmap._smoothingEnable = smoothingEnable;
		return bitmap;
	};

	Bitmap.prototype.isReady = function() {
		return ((this._loadingState === "loaded" || this._loadingState === "none") && (this._loadingState !== "reductioning") );
	};

	Bitmap.prototype._startLoading = function() {
		this._image = new Image();
		this._image.onload = this._onLoad.bind(this);
		this._image.onerror = this._onError.bind(this);
		this._destroyCanvas();
		this._loadingState = "loading";
		if (Utils.hasEncryptedImages()) {
			this._startDecrypting();
		} else {
			this._image.src = this._url;
		}
		this.addLoadListener(this._reduction.bind(this));
	};

	Bitmap.prototype._onLoad = function() {
		if (Utils.hasEncryptedImages()) {
			URL.revokeObjectURL(this._image.src);
		}
		this._createBaseTexture(this._image);
		this._callLoadListeners();
	};

	Bitmap.prototype._reduction = function(){
		if(this._isReduction){
			this._loadingState = "reductioning";
			let base = new Bitmap(1, 1);
			Object.assign(base, this);
			if(this._rate < 0){
				//割り算
				this.resize(Math.trunc(base._baseTexture.width / (-Math.trunc(this._rate))), Math.trunc(base._baseTexture.height / (-Math.trunc(this._rate))));
			}else{
				//倍率
				this.resize(Math.trunc(base._baseTexture.width * this._rate), Math.trunc(base._baseTexture.height * this._rate));
			}
			this.clear();
			this.blt(base, 0, 0, base.width, base.height, 0, 0, this._baseTexture.width, this._baseTexture.height);
		}
		this._loadingState = "loaded";
	};

	Window.prototype._refreshBack = function() {
		const m = this._margin;
		const w = Math.max(0, this._width - m * 1);
		const h = Math.max(0, this._height - m * 1);
		const sprite = this._backSprite;
		const tilingSprite = sprite.children[0];
		sprite.bitmap = this._windowskin;
		sprite.setFrame(0, 0, 48, 48);
		sprite.move(m - 2, m - 2);
		sprite.scale.x = w / 48;
		sprite.scale.y = h / 48;
		tilingSprite.bitmap = this._windowskin;
		tilingSprite.setFrame(0, 48, 48, 48);
		tilingSprite.move(0, 0, w, h);
		tilingSprite.updateTransform();
		tilingSprite.scale.x = 48 / w;
		tilingSprite.scale.y = 48 / h;
		sprite.setColorTone(this._colorTone);
	};

	Window.prototype._refreshFrame = function() {
		const drect = { x: 0, y: 0, width: this._width, height: this._height };
		const srect = { x: 48, y: 0, width: 48, height: 48 };
		const m = 12;
		for (const child of this._frameSprite.children) {
			child.bitmap = this._windowskin;
		}
		this._setRectPartsGeometry(this._frameSprite, srect, drect, m);
	};

	Window.prototype._refreshCursor = function() {
		const drect = this._cursorRect.clone();
		const srect = { x: 48, y: 48, width: 24, height: 24 };
		const m = 4;
		for (const child of this._cursorSprite.children) {
			child.bitmap = this._windowskin;
		}
		this._setRectPartsGeometry(this._cursorSprite, srect, drect, m);
	};

	Window.prototype._refreshArrows = function() {
		const w = this._width;
		const h = this._height;
		const p = 12;
		const q = p / 2;
		const sx = 48 + p;
		const sy = 0 + p;
		this._downArrowSprite.bitmap = this._windowskin;
		this._downArrowSprite.anchor.x = 0.5;
		this._downArrowSprite.anchor.y = 0.5;
		this._downArrowSprite.setFrame(sx + q, sy + q + p, p, q);
		this._downArrowSprite.move(w / 2, h - q);
		this._upArrowSprite.bitmap = this._windowskin;
		this._upArrowSprite.anchor.x = 0.5;
		this._upArrowSprite.anchor.y = 0.5;
		this._upArrowSprite.setFrame(sx + q, sy, p, q);
		this._upArrowSprite.move(w / 2, q);
	};

	Window.prototype._refreshPauseSign = function() {
		const sx = 72;
		const sy = 48;
		const p = 12;
		this._pauseSignSprite.bitmap = this._windowskin;
		this._pauseSignSprite.anchor.x = 0.5;
		this._pauseSignSprite.anchor.y = 1;
		this._pauseSignSprite.move(this._width / 2, this._height);
		this._pauseSignSprite.setFrame(sx, sy, p, p);
		this._pauseSignSprite.alpha = 0;
	};

	Window.prototype._updatePauseSign = function() {
		const sprite = this._pauseSignSprite;
		const x = Math.floor(this._animationCount / 16) % 2;
		const y = Math.floor(this._animationCount / 16 / 2) % 2;
		const sx = 72;
		const sy = 48;
		const p = 12;
		if (!this.pause) {
			sprite.alpha = 0;
		} else if (sprite.alpha < 1) {
			sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
		}
		sprite.setFrame(sx + x * p, sy + y * p, p, p);
		sprite.visible = this.isOpen();
	};

	const old_tilemap_initialize = Tilemap.prototype.initialize;
	Tilemap.prototype.initialize = function() {
		old_tilemap_initialize.apply(this, arguments);
		this._margin = 6;
		this._tileWidth = 16;
		this._tileHeight = 16;
	};

	Tilemap.Layer.prototype.setBitmaps = function(bitmaps) {
		this._images = bitmaps.map(bitmap => /*bitmap.image ||*/ bitmap.canvas);	//マップチップは縮小されているcanvas側のみ持ってく（そうしないと縮小されたチップが表示されない）
		this._needsTexturesUpdate = true;
	};

	Tilemap.prototype._addSpot = function(startX, startY, x, y) {
		const mx = startX + x;
		const my = startY + y;
		const dx = x * this._tileWidth;
		const dy = y * this._tileHeight;
		const tileId0 = this._readMapData(mx, my, 0);
		const tileId1 = this._readMapData(mx, my, 1);
		const tileId2 = this._readMapData(mx, my, 2);
		const tileId3 = this._readMapData(mx, my, 3);
		const shadowBits = this._readMapData(mx, my, 4);
		const upperTileId1 = this._readMapData(mx, my - 1, 1);
	
		this._addSpotTile(tileId0, dx, dy);
		this._addSpotTile(tileId1, dx, dy);
		if(plugin_params["enable_map_auto_shadow"] === "true"){
			this._addShadow(this._lowerLayer, shadowBits, dx, dy);
		}
		if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
			if (!Tilemap.isShadowingTile(tileId0)) {
				this._addTableEdge(this._lowerLayer, upperTileId1, dx, dy);
			}
		}
		if (this._isOverpassPosition(mx, my)) {
			this._addTile(this._upperLayer, tileId2, dx, dy);
			this._addTile(this._upperLayer, tileId3, dx, dy);
		} else {
			this._addSpotTile(tileId2, dx, dy);
			this._addSpotTile(tileId3, dx, dy);
		}
	};

	ImageManager.loadBitmapFromUrl = function(url) {
		//画像ファイル名について
		//Ver0.1.1まで　＞＞　rateを変えると用意するファイル名も変更する必要があります。（例：0.5なら *_05.png。　0.141421356なら *_0141421356.png）
		//Ver0.1.2から　＞＞　マップタイルや顔画像もしくは縮小無効時の戦闘用画像などにゲーム用に使う画像はrateにかかわらず「*_game」になります。（例：abcd.png なら abcd_game.png。　efgh.jpg なら efgh_game.jpg）
		//Ver0.2.0から　＞＞　なんと一部素材のデフォルトが３倍倍率になってしまいました。その代わり別途ゲーム用に画像を用意する必要が無くなりました。
		//Ver0.2.7から　＞＞　拡大がいらなくなりました
		const cache = url.includes("/system/") ? this._system : this._cache;
		const rate = -3;
		//ifのかたまり
		if (!cache[url]) {
			if((!url.includes("/characters/") && !url.includes("/system/") && !url.includes("/pictures/"))){
				if(((url.includes("/sv_actors/")) && (plugin_params["no_reduction_sv_actors"] !== "true")) ||
					(((url.includes("/sv_enemies/")) && (plugin_params["no_reduction_sv_enemies"] !== "true"))) ||
					(((url.includes("/enemies/")) && (plugin_params["no_reduction_front_enemies"] !== "true")))){
					//サイドビューアクターを設定により縮めない
					//サイドビュー敵キャラを設定により縮めない
					//フロントビュー敵キャラを設定により縮めない
					cache[url] = Bitmap.load(url, true);
				}else if(url.includes("battlebacks") || url.includes("titles")){
					//タイトルと戦闘背景は画面幅(320)に合わせる
					cache[url] = Bitmap.load(url, true, Graphics.rate_x);
				}else if(url.includes("tilesets")){
					//タイルセットは設定により縮める
					if(plugin_params["zoom_tilesets"] === "true"){
						cache[url] = Bitmap.load(url, true, rate, false);
					}else{
						cache[url] = Bitmap.load(url, true);
					}
				}else{
					//他は指定レートで縮める
					cache[url] = Bitmap.load(url, true, rate, false);
				}
			}else if(url.includes("/system/")){
				if(url.includes("Weapons")){
					if(plugin_params["no_reduction_sv_weapons"] == "false"){
						//サイドビュー武器を縮めない
						cache[url] = Bitmap.load(url);
					}else{
						//指定レートで縮める
						cache[url] = Bitmap.load(url, true, rate, false);
					}
				}else if(url.includes("States")){
					//アクター設定に合わせる
					if(plugin_params["no_reduction_sv_actors"] !== "true"){
						//縮めない
						cache[url] = Bitmap.load(url);
					}else{
						//指定レートで縮める
						cache[url] = Bitmap.load(url, true, rate, false);
					}
				}else if((url.includes("Balloon")) || (url.includes("ButtonSet"))){
					cache[url] = Bitmap.load(url, true, 0.334);
				}else{
					//他は半分のサイズにする
					cache[url] = Bitmap.load(url, true, 0.5);
				}
			}else{
				cache[url] = Bitmap.load(url);
			}
		}
		return cache[url];
	};

	ColorManager.textColor = function(n) {
		const px = 48 + (n % 8) * 6 + 3;
		const py = 72 + Math.floor(n / 8) * 6 + 3;
		return this._windowskin.getPixel(px, py);
	};

	//-----------------------------------------------------------------------------
	// Game_System
	//
	// The game object class for the system data.

	const old_game_system_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function() {
		old_game_system_initialize.apply(this, arguments);
		ConfigManager.touchUI = false;	//とにかく無効にする
	};

	Game_System.prototype.windowPadding = function() {
		return 4;
	};

	Game_System.prototype.lahmPluginNormFontFace = function() {
		return "Kinoei3x7";
	};

	//-----------------------------------------------------------------------------
	// Game_Map
	//
	// The game object class for a map. It contains scrolling and passage
	// determination functions.

	Game_Map.prototype.tileWidth = function() {
		return 16;
	};
	
	Game_Map.prototype.tileHeight = function() {
		return 16;
	};

	//-----------------------------------------------------------------------------
	// Game_CharacterBase
	//
	// The superclass of Game_Character. It handles basic information, such as
	// coordinates and images, shared by all characters.
	Game_CharacterBase.prototype.shiftY = function() {
		return this.isObjectCharacter() ? 0 : 2;
	};

	//-----------------------------------------------------------------------------
	// Window_Base
	//
	// The superclass of all windows within the game.

	Window_Base.prototype.lineHeight = function() {
		return 14;
	};

	Window_Base.prototype.itemPadding = function() {
		return 2;
	};

	Window_Base.prototype.drawItemName = function(item, x, y, width) {
		if (item) {
			const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
			const textMargin = ImageManager.iconWidth + 2;
			const itemWidth = Math.max(0, width - textMargin);
			this.resetTextColor();
			this.drawIcon(item.iconIndex, x, iconY);
			this.drawText(item.name, x + textMargin, y, itemWidth);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_Selectable
	//
	// The window class with cursor movement functions.

	Window_Selectable.prototype.colSpacing = function() {
		return 2;
	};
	
	Window_Selectable.prototype.rowSpacing = function() {
		return 2;
	};

	//-----------------------------------------------------------------------------
	// Window_StatusBase
	//
	// The superclass of windows for displaying actor status.

	Window_StatusBase.prototype.gaugeLineHeight = function() {
		return 10;
	};

	Window_StatusBase.prototype.drawActorName = function(actor, x, y, width) {
		width = width || 52;
		this.changeTextColor(ColorManager.hpColor(actor));
		this.drawText(actor.name(), x, y, width);
	};

	Window_StatusBase.prototype.drawActorLevel = function(actor, x, y) {
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(TextManager.levelA, x, y, 24);
		this.resetTextColor();
		this.drawText(actor.level, x + 36, y, 18, "right");
	};

	Window_StatusBase.prototype.drawActorSimpleStatus = function(actor, x, y) {
		const lineHeight = this.lineHeight();
		const x2 = x + 64;
		this.drawActorName(actor, x, y);
		this.drawActorLevel(actor, x, y + lineHeight * 1);
		this.drawActorIcons(actor, x, y + lineHeight * 2);
		this.drawActorClass(actor, x2, y);
		this.placeBasicGauges(actor, x2, y + lineHeight);
	};

	Window_StatusBase.prototype.drawActorIcons = function(actor, x, y, width) {
		width = width || 64;
		const iconWidth = ImageManager.iconWidth;
		const icons = actor.allIcons().slice(0, Math.floor(width / iconWidth));
		let iconX = x;
		for (const icon of icons) {
			this.drawIcon(icon, iconX, y + 2);
			iconX += iconWidth;
		}
	};

	//-----------------------------------------------------------------------------
	// Window_MenuStatus
	//
	// The window for displaying party member status on the menu screen.

	Window_MenuStatus.prototype.drawItemStatus = function(index) {
		const actor = this.actor(index);
		const rect = this.itemRect(index);
		const x = rect.x + 64;
		const y = rect.y + rect.height / 2 - this.lineHeight() * 1.5 - 2;
		this.drawActorSimpleStatus(actor, x, y);
	};

	//-----------------------------------------------------------------------------
	// Window_ItemList
	//
	// The window for selecting an item on the item screen.
	Window_ItemList.prototype.colSpacing = function() {
		return 2;
	};

	//-----------------------------------------------------------------------------
	// Window_SkillStatus
	//
	// The window for displaying the skill user's status on the skill screen.
	
	Window_SkillStatus.prototype.refresh = function() {
		Window_StatusBase.prototype.refresh.call(this);
		if (this._actor) {
			const x = this.colSpacing() / 2;
			const h = this.innerHeight;
			const y = h / 2 - this.lineHeight() * 1.5;
			this.drawActorFace(this._actor, x + 1, 0, 48, h);
			this.drawActorSimpleStatus(this._actor, x + 52, y);
		}
	};

	//-----------------------------------------------------------------------------
	// Window_SkillList
	//
	// The window for selecting a skill on the skill screen.

	Window_SkillList.prototype.colSpacing = function() {
		return 2;
	};

	//-----------------------------------------------------------------------------
	// Window_ShopNumber
	//
	// The window for inputting quantity of items to buy or sell on the shop
	// screen.

	Window_ShopNumber.prototype.createButtons = function() {
		this._buttons = [];
		//さすがにこれは必要そうなので
		for (const type of ["down2", "down", "up", "up2", "ok"]) {
			const button = new Sprite_Button(type);
			this._buttons.push(button);
			this.addInnerChild(button);
		}
		this._buttons[0].setClickHandler(this.onButtonDown2.bind(this));
		this._buttons[1].setClickHandler(this.onButtonDown.bind(this));
		this._buttons[2].setClickHandler(this.onButtonUp.bind(this));
		this._buttons[3].setClickHandler(this.onButtonUp2.bind(this));
		this._buttons[4].setClickHandler(this.onButtonOk.bind(this));
	};

	//-----------------------------------------------------------------------------
	// Window_EquipStatus
	//
	// The window for displaying parameter changes on the equipment screen.

	Window_EquipStatus.prototype.rightArrowWidth = function() {
		return Math.trunc(32 * Graphics.rate_x);
	};

	Window_EquipStatus.prototype.paramWidth = function() {
		return Math.trunc(48 * Graphics.rate_x);
	};

	//-----------------------------------------------------------------------------
	// Window_EquipSlot
	//
	// The window for selecting an equipment slot on the equipment screen.

	Window_EquipSlot.prototype.slotNameWidth = function() {
		return 60;	//５文字は保証したいので決め打ち
		//return Math.trunc(138 * Graphics.rate_x);
	};

	//-----------------------------------------------------------------------------
	// Window_Status
	//
	// The window for displaying full status on the status screen.

	Window_Status.prototype.drawBlock1 = function() {
		const y = this.block1Y() + 2;
		this.drawActorName(this._actor, Math.trunc(6 * Graphics.rate_x), y, 168);
		this.drawActorClass(this._actor, Math.trunc(192 * Graphics.rate_x), y, 168);
		this.drawActorNickname(this._actor, Math.trunc(432 * Graphics.rate_x), y, 270);
	};

	Window_Status.prototype.drawBlock2 = function() {
		const y = this.block2Y() + 10;
		this.drawActorFace(this._actor, 12, y);
		this.drawBasicInfo(Math.trunc(204 * Graphics.rate_x), y);
		this.drawExpInfo(Math.trunc(456 * Graphics.rate_x), y);
	};

	Window_Status.prototype.drawExpInfo = function(x, y) {
		const lineHeight = this.lineHeight();
		const expTotal = TextManager.expTotal.format(TextManager.exp);
		const expNext = TextManager.expNext.format(TextManager.level);
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(expTotal, x, y + lineHeight * 0, 136);
		this.drawText(expNext, x, y + lineHeight * 2, 136);
		this.resetTextColor();
		this.drawText(this.expTotalValue(), x, y + lineHeight * 1, Math.trunc(270 * Graphics.rate_x), "right");
		this.drawText(this.expNextValue(), x, y + lineHeight * 3, Math.trunc(270 * Graphics.rate_x), "right");
	};

	//-----------------------------------------------------------------------------
	// Window_StatusParams
	//
	// The window for displaying parameters on the status screen.

	Window_StatusParams.prototype.drawItem = function(index) {
		const rect = this.itemLineRect(index);
		const paramId = index + 2;
		const name = TextManager.param(paramId);
		const value = this._actor.param(paramId);
		const nameWidth = Math.trunc(160 * Graphics.rate_x);
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(name, rect.x, rect.y, nameWidth);
		this.resetTextColor();
		this.drawText(value, rect.x + nameWidth, rect.y, Math.trunc(60 * Graphics.rate_x), "right");
	};

	//-----------------------------------------------------------------------------
	// Window_StatusEquip
	//
	// The window for displaying equipment items on the status screen.

	Window_StatusEquip.prototype.drawItem = function(index) {
		const rect = this.itemLineRect(index);
		const equips = this._actor.equips();
		const item = equips[index];
		const slotName = this.actorSlotName(this._actor, index);
		const sw = 60;	//５文字は保証したいので決め打ち
		//const sw = Math.trunc(138 * Graphics.rate_x);
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(slotName, rect.x, rect.y, sw, rect.height);
		this.drawItemName(item, rect.x + sw, rect.y, rect.width - sw);
	};

	//-----------------------------------------------------------------------------
	// Window_Options
	//
	// The window for changing various settings on the options screen.

	Window_Options.prototype.addGeneralOptions = function() {
		this.addCommand(TextManager.alwaysDash, "alwaysDash");
		this.addCommand(TextManager.commandRemember, "commandRemember");
		//this.addCommand(TextManager.touchUI, "touchUI");
	};

	Window_Options.prototype.statusWidth = function() {
		return Math.trunc(120 * Graphics.rate_x);
	};

	//-----------------------------------------------------------------------------
	// Window_NameEdit
	//
	// The window for editing an actor's name on the name input screen.

	Window_NameEdit.prototype.faceWidth = function() {
		return 48;
	};
	
	Window_NameEdit.prototype.itemRect = function(index) {
		const x = this.left() + index * this.charWidth();
		const y = 18;
		const width = this.charWidth();
		const height = this.lineHeight();
		return new Rectangle(x, y, width, height);
	};

	//-----------------------------------------------------------------------------
	// Window_NameInput
	//
	// The window for selecting text characters on the name input screen.

	const old_window_nameinput_initialize = Window_NameInput.prototype.initialize;
	Window_NameInput.prototype.initialize = function(rect) {
		old_window_nameinput_initialize.apply(this, arguments);
		this.contents.fontSize = $gameSystem.mainFontSize() - 3;
	};

	Window_NameInput.prototype.colSpacing = function() {
		return 4;
	};

	Window_NameInput.prototype.rowSpacing = function() {
		return 4;
	};

	Window_NameInput.prototype.lineHeight = function() {
		return 8;
	};

	Window_NameInput.prototype.itemHeight = function() {
		return Window_Scrollable.prototype.itemHeight.call(this) + 8;
	};

	Window_NameInput.prototype.calcWindowHeight = function(numLines) {
		return numLines * this.itemHeight() + $gameSystem.windowPadding() * 2;
	};

	//-----------------------------------------------------------------------------
	// Window_ShopBuy
	//
	// The window for selecting an item to buy on the shop screen.

	Window_ShopBuy.prototype.priceWidth = function() {
		return 38;
	};

	//-----------------------------------------------------------------------------
	// Window_NumberInput
	//
	// The window used for the event command [Input Number].

	Window_NumberInput.prototype.itemWidth = function() {
		return 24;
	};

	Window_NumberInput.prototype.buttonSpacing = function() {
		return 4;
	};

	Window_NumberInput.prototype.windowHeight = function() {
		//最低限必要なので設定にかかわらず設置
		return this.fittingHeight(1) + this.buttonSpacing() + 24;
	};

	Window_NumberInput.prototype.createButtons = function() {
		//最低限必要なので設定にかかわらず設置
		this._buttons = [];
		for (const type of ["down", "up", "ok"]) {
			const button = new Sprite_Button(type);
			this._buttons.push(button);
			this.addInnerChild(button);
		}
		this._buttons[0].setClickHandler(this.onButtonDown.bind(this));
		this._buttons[1].setClickHandler(this.onButtonUp.bind(this));
		this._buttons[2].setClickHandler(this.onButtonOk.bind(this));
	};

	//-----------------------------------------------------------------------------
	// Window_MapName
	//
	// The window for displaying the map name on the map screen.
	
	const old_window_mapname_initialize = Window_MapName.prototype.initialize;
	Window_MapName.prototype.initialize = function(rect) {
		old_window_mapname_initialize.apply(this, arguments);
		this.contents.outlineWidth = 2;
	};

	//-----------------------------------------------------------------------------
	// Window_Message
	//
	// The window for displaying text messages.

	Window_Message.prototype.newLineX = function(textState) {
		const faceExists = $gameMessage.faceName() !== "";
		const faceWidth = ImageManager.faceWidth;
		const spacing = 12;//Math.trunc(20 * Graphics.rate_x);	//目見当
		const margin = faceExists ? faceWidth + spacing : 4;
		return textState.rtl ? this.innerWidth - margin : margin;
	};

	//-----------------------------------------------------------------------------
	// Window_BattleStatus
	//
	// The window for displaying the status of party members on the battle screen.
		
	Window_BattleStatus.prototype.initialize = function(rect) {
		Window_StatusBase.prototype.initialize.call(this, rect);
		this.frameVisible = false;
		this.openness = 0;
		this._bitmapsReady = 0;
		this.preparePartyRefresh();
	};

	Window_BattleStatus.prototype.extraHeight = function() {
		return 4;
	};

	Window_BattleStatus.prototype.updatePadding = function() {
		this.padding = 4;
	};

	Window_BattleStatus.prototype.placeActorName = function(actor, x, y) {
		const key = "actor%1-name".format(actor.actorId());
		const sprite = this.createInnerSprite(key, Sprite_BattleName);
		sprite.setup(actor);
		sprite.move(x, y);
		sprite.show();
	};

	Window_BattleStatus.prototype.placeGauge = function(actor, type, x, y) {
		const key = "actor%1-gauge-%2".format(actor.actorId(), type);
		const sprite = this.createInnerSprite(key, Sprite_BattleGauge);
		sprite.setup(actor, type);
		sprite.move(x, y);
		sprite.show();
	};

	Window_BattleStatus.prototype.stateIconX = function(rect) {
		return rect.x + rect.width - ImageManager.iconWidth / 2 + 1;
	};
	
	Window_BattleStatus.prototype.stateIconY = function(rect) {
		return rect.y + ImageManager.iconHeight / 2 + 1;
	};

	//-----------------------------------------------------------------------------
	// Window_SavefileList
	//
	// The window for selecting a save file on the save and load screens.

	Window_SavefileList.prototype.drawTitle = function(savefileId, x, y) {
		if (savefileId === 0) {
			this.drawText(TextManager.autosave, x, y, 64);
		} else {
			this.drawText(TextManager.file + " " + savefileId, x, y, 64);
		}
	};

	Window_SavefileList.prototype.drawItem = function(index) {
		const savefileId = this.indexToSavefileId(index);
		const info = DataManager.savefileInfo(savefileId);
		const rect = this.itemRectWithPadding(index);
		this.resetTextColor();
		this.changePaintOpacity(this.isEnabled(savefileId));
		this.drawTitle(savefileId, rect.x, rect.y + 4);
		if (info) {
			this.drawContents(info, rect);
		}
	};

	Window_SavefileList.prototype.drawContents = function(info, rect) {
		const bottom = rect.y + rect.height;
		if (rect.width >= 240) {
			this.drawPartyCharacters(info, rect.x + 96, bottom - 4);
		}
		const lineHeight = this.lineHeight();
		const y2 = bottom - lineHeight - 4;
		if (y2 >= lineHeight) {
			this.drawPlaytime(info, rect.x, y2, rect.width);
		}
	};

	Window_SavefileList.prototype.drawPartyCharacters = function(info, x, y) {
		if (info.characters) {
			let characterX = x;
			for (const data of info.characters) {
				this.drawCharacter(data[0], data[1], characterX, y);
				characterX += 32;
			}
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Base
	//
	// The superclass of all scenes within the game.

	Scene_Base.prototype.mainCommandWidth = function() {
		return Math.trunc(240 * Graphics.rate_x);
	};

	Scene_Base.prototype.buttonAreaHeight = function() {
		return 0;
	};

	Scene_Base.prototype.buttonY = function() {
		const offsetY = Math.floor((this.buttonAreaHeight() - 14) / 2);
		return this.buttonAreaTop() + offsetY;
	};

	//-----------------------------------------------------------------------------
	// Scene_Boot
	//
	// The scene class for initializing the entire game.

	const old_scene_boot_start = Scene_Boot.prototype.start;
	Scene_Boot.prototype.start = function() {
		//「UIエリアの幅」「UIエリアの高さ」設定をQVGAに上書きする（おそらく禁じ手）
		$dataSystem.advanced.uiAreaWidth = 320;
		$dataSystem.advanced.uiAreaHeight = 240;

		old_scene_boot_start.apply(this, arguments);
	};

	//-----------------------------------------------------------------------------
	// Scene_Map
	//
	// The scene class of the map screen.

	Scene_Map.prototype.mapNameWindowRect = function() {
		const wx = 0;
		const wy = 0;
		const ww = 140;//Math.trunc(360 * Graphics.rate_x);
		const wh = this.calcWindowHeight(1, false);
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Map.prototype.createButtons = function() {
		//
	};
	
	//-----------------------------------------------------------------------------
	// Scene_Title
	//
	// The scene class of the title screen.

	Scene_Title.prototype.drawGameTitle = function() {
		const x = 20;
		const y = Graphics.height / 6;
		const maxWidth = Graphics.width - x * 2;
		const text = $dataSystem.gameTitle;
		const bitmap = this._gameTitleSprite.bitmap;
		bitmap.fontFace = $gameSystem.mainFontFace();
		bitmap.outlineColor = "black";
		bitmap.outlineWidth = 6;
		bitmap.fontSize = 24;
		bitmap.drawText(text, x, y, maxWidth, 48, "center");
	};

	Scene_Title.prototype.commandWindowRect = function() {
		const offsetX = $dataSystem.titleCommandWindow.offsetX;
		const offsetY = $dataSystem.titleCommandWindow.offsetY;
		const ww = this.mainCommandWidth();
		const wh = this.calcWindowHeight(3, true);
		const wx = (Graphics.boxWidth - ww) / 2 + offsetX;
		const wy = Graphics.boxHeight - wh - Math.ceil(Graphics.boxHeight * 0.153) + offsetY;
		return new Rectangle(wx, wy, ww, wh);
	};

	//-----------------------------------------------------------------------------
	// Scene_MenuBase
	//
	// The superclass of all the menu-type scenes.

	Scene_MenuBase.prototype.mainAreaTop = function() {
		if (!this.isBottomHelpMode()) {
			return this.helpAreaBottom();
		}
		return 0;
	};

	//-----------------------------------------------------------------------------
	// Scene_Equip
	//
	// The scene class of the equipment screen.

	Scene_Equip.prototype.statusWidth = function() {
		return 118;	//装備選択ウィンドウ側の装備名を８文字保証したいので決め打ち
		//return Math.trunc(312 * Graphics.rate_x);
	};

	//-----------------------------------------------------------------------------
	// Scene_Status
	//
	// The scene class of the status screen.

	Scene_Status.prototype.statusParamsWidth = function() {
		return 120;	//そこまで狭くなくてもいいので決め打ち
		//return Math.trunc(300 * Graphics.rate_y);
	};

	//-----------------------------------------------------------------------------
	// Scene_Options
	//
	// The scene class of the options screen.

	Scene_Options.prototype.optionsWindowRect = function() {
		const n = Math.min(this.maxCommands(), this.maxVisibleCommands());
		const ww = Math.trunc(400 * (Graphics.rate_x));
		const wh = this.calcWindowHeight(n, true);
		const wx = (Graphics.boxWidth - ww) / 2;
		const wy = (Graphics.boxHeight - wh) / 2;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Options.prototype.maxCommands = function() {
		// Increase this value when adding option items.
		return 6;
	};

	//-----------------------------------------------------------------------------
	// Scene_Name
	//
	// The scene class of the name input screen.

	Scene_Name.prototype.editWindowRect = function() {
		const inputWindowHeight = Window_NameInput.prototype.calcWindowHeight(9);
		const padding = $gameSystem.windowPadding();
		const ww = 300;
		const wh = ImageManager.faceHeight + padding * 2;
		const wx = (Graphics.boxWidth - ww) / 2;
		const wy = (Graphics.boxHeight - (wh + inputWindowHeight + 8)) / 2;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Name.prototype.inputWindowRect = function() {
		const wx = this._editWindow.x;
		const wy = this._editWindow.y + this._editWindow.height + 8;
		const ww = this._editWindow.width;
		const wh = Window_NameInput.prototype.calcWindowHeight(9);
		return new Rectangle(wx, wy, ww, wh);
	};

	//-----------------------------------------------------------------------------
	// Scene_Shop
	//
	// The scene class of the shop screen.

	Scene_Shop.prototype.goldWindowRect = function() {
		const ww = this.mainCommandWidth();
		const wh = this.calcWindowHeight(1, true);
		const wx = Graphics.boxWidth - ww;
		const wy = this.mainAreaTop();
		return new Rectangle(wx, wy, ww, wh);
	};

	/*Scene_Shop.prototype.commandWindowRect = function() {
		const wx = 0;
		const wy = this.mainAreaTop();
		const ww = this._goldWindow.x + 32;
		const wh = this.calcWindowHeight(1, true);
		return new Rectangle(wx, wy, ww, wh);
	};*/

	Scene_Shop.prototype.statusWidth = function() {
		return Math.trunc(352 * Graphics.rate_x);
	};

	//-----------------------------------------------------------------------------
	// Scene_Debug
	//
	// The scene class of the debug screen.
	
	Scene_Debug.prototype.rangeWindowRect = function() {
		const wx = 0;
		const wy = 0;
		const ww = Math.trunc(246 * Graphics.rate_x);
		const wh = this.calcWindowHeight(6, true);
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Debug.prototype.editWindowRect = function() {
		const wx = this._rangeWindow.width;
		const wy = 0;
		const ww = Graphics.boxWidth - wx;
		const wh = Graphics.boxHeight	//this.calcWindowHeight(10, true);	//機能的に問題ないけどちょっと寸足らずでかっこ悪いような気がしないでもないような…なので画面高を代入。
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Debug.prototype.debugHelpWindowRect = function() {
		const wx = 0;
		const wy = this._rangeWindow.height;
		const ww = this._rangeWindow.width;
		const wh = Graphics.boxHeight - wy;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Debug.prototype.helpText = function() {
		if (this._rangeWindow.mode(this._rangeWindow.index()) === "switch") {	//デフォルトのバグ修正
			return "Enter : ON/OFF";
		} else {
			return (
				"Left     :  -1\n" +
				"Pageup   : -10\n" +
				"Right    :  +1\n" +
				"Pagedown : +10"
			);
		}
	};
	
	//-----------------------------------------------------------------------------
	// Scene_Battle
	//
	// The scene class of the battle screen.
	
	Scene_Battle.prototype.partyCommandWindowRect = function() {
		const ww = 80;
		const wh = this.windowAreaHeight();
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = Graphics.boxHeight - wh;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Battle.prototype.actorCommandWindowRect = function() {
		const ww = 80;
		const wh = this.windowAreaHeight();
		const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
		const wy = Graphics.boxHeight - wh;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Battle.prototype.statusWindowRect = function() {
		const extra = 2;
		const ww = Graphics.boxWidth - 76;
		const wh = this.windowAreaHeight() + extra;
		const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
		const wy = Graphics.boxHeight - wh + extra;
		return new Rectangle(wx, wy, ww, wh);
	};
	
	//-----------------------------------------------------------------------------
	// Sprite_Actor
	//
	// The sprite for displaying an actor.

	Sprite_Actor.prototype.moveToStartPosition = function() {
		this.startMove(Math.trunc(300 * Graphics.rate_x), 0, 0);
	};

	Sprite_Actor.prototype.setActorHome = function(index) {
		this.setHome(Math.trunc(600 * Graphics.rate_x) + index * Math.trunc(32 * Graphics.rate_x), Math.trunc(280 * Graphics.rate_y) + index * Math.trunc(48 * Graphics.rate_y));
	};

	Sprite_Actor.prototype.stepForward = function() {
		this.startMove(Math.trunc(-48 * Graphics.rate_x), 0, 12);
	};
	
	Sprite_Actor.prototype.retreat = function() {
		this.startMove(Math.trunc(300 * Graphics.rate_x), 0, 30);
	};

	//-----------------------------------------------------------------------------
	// Sprite_Enemy
	//
	// The sprite for displaying an enemy.

	Sprite_Enemy.prototype.setBattler = function(battler) {
		Sprite_Battler.prototype.setBattler.call(this, battler);
		this._enemy = battler;
		console.log(battler.screenX());
		console.log(battler.screenY());
		console.log(Graphics.rate_x);
		console.log(Graphics.rate_y);
		if(plugin_params["enemy_position_adjust"] === "0"){
			this.setHome(Math.trunc(battler.screenX() * Graphics.rate_x), Math.trunc(battler.screenY() * Graphics.rate_y));
		}else if(plugin_params["enemy_position_adjust"] === "1"){
			this.setHome(Math.trunc(battler.screenX() * Graphics.rate_x), Math.trunc(battler.screenY() * 0.435));
		}
		this._stateIconSprite.setup(battler);
	};
	
	//-----------------------------------------------------------------------------
	// Sprite_Animation
	//
	// The sprite for displaying an animation.

	/*Sprite_Animation.prototype.updateEffectGeometry = function() {
		const scale = (this._animation.scale / 100) * Graphics.rate_x;
		const r = Math.PI / 180;
		const rx = this._animation.rotation.x * r;
		const ry = this._animation.rotation.y * r;
		const rz = this._animation.rotation.z * r;
		if (this._handle) {
			this._handle.setLocation(0, 0, 0);
			this._handle.setRotation(rx, ry, rz);
			this._handle.setScale(scale, scale, scale);
			this._handle.setSpeed(this._animation.speed / 100);
		}
	};*/

	Sprite_Animation.prototype.setViewport = function(renderer) {
		const vw = this._viewportSize;
		const vh = this._viewportSize;
		const vx = Math.trunc(this._animation.offsetX * (1.0 - Graphics.rate_x)) - vw / 2;
		const vy = Math.trunc(this._animation.offsetY * (1.0 - Graphics.rate_y)) - vh / 2;
		const pos = this.targetPosition(renderer);
		renderer.gl.viewport(vx + pos.x, vy + pos.y, vw, vh);
	};

	Sprite_Animation.prototype.targetSpritePosition = function(sprite) {
		const point = new Point(0, (-sprite.height / 2));
		if (this._animation.alignBottom) {	//Core 1.1.0対応
			point.y = 0;
		}									//ここまで
		sprite.updateTransform();
		return sprite.worldTransform.apply(point);
	};

	//-----------------------------------------------------------------------------
	// Sprite_Button
	//
	// The sprite for displaying a button.

	Sprite_Button.prototype.blockWidth = function() {
		return 16;
	};

	Sprite_Button.prototype.blockHeight = function() {
		return 16;
	};

	Sprite_Button.prototype.checkBitmap = function() {
		if (this.bitmap.isReady() && this.bitmap.width < this.blockWidth() * 11) {
			// Probably MV image is used
			throw new Error("ButtonSet image is too small");
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_Name
	//
	// The sprite for displaying a status gauge.

	Sprite_Name.prototype.bitmapWidth = function() {
		return Math.trunc(128 * Graphics.rate_x);
	};

	Sprite_Name.prototype.bitmapHeight = function() {
		return 14;
	};

	Sprite_Name.prototype.outlineWidth = function() {
		return 2;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Battleback
	//
	// The sprite for displaying a background image in battle.

	Spriteset_Battle.prototype.battleFieldOffsetY = function() {
		return 24 * Graphics.rate_y;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Gauge
	//
	// The sprite for displaying a status gauge.

	Sprite_Gauge.prototype.bitmapWidth = function() {
		return 64;
	};

	Sprite_Gauge.prototype.bitmapHeight = function() {
		return 12;
	};

	Sprite_Gauge.prototype.textHeight = function() {
		return 12;
	};

	Sprite_Gauge.prototype.gaugeHeight = function() {
		return 6;
	};

	Sprite_Gauge.prototype.gaugeX = function() {
		return this._statusType === "time" ? 0 : this.measureLabelWidth() + 2;
	};
	
	Sprite_Gauge.prototype.labelY = function() {
		return 1;
	};

	Sprite_Gauge.prototype.labelOutlineWidth = function() {
		return 2;
	};
	
	Sprite_Gauge.prototype.labelFontFace = function() {
		return $gameSystem.numberFontFace();
	};
	
	Sprite_Gauge.prototype.labelFontSize = function() {
		return $gameSystem.mainFontSize() - 2;
	};
	
	Sprite_Gauge.prototype.valueFontFace = function() {
		return $gameSystem.numberFontFace();
	};
	
	Sprite_Gauge.prototype.valueFontSize = function() {
		return $gameSystem.mainFontSize() - 2;
	};

	Sprite_Gauge.prototype.lahmPluginNormFontFace = function() {
		return $gameSystem.lahmPluginNormFontFace();
	};

	// 「ＨＰやＭＰの最大値見たくなった時に使うアレ」のパラメータがある場合は動作変更可能にさせる。
	if(PluginManager.parameters("LookAtMHPMMP")){
		const old_sprite_gauge_init_members = Sprite_Gauge.prototype.initMembers;
		const lahm_params = PluginManager.parameters("LookAtMHPMMP");
		Sprite_Gauge.prototype.initMembers = function() {
			old_sprite_gauge_init_members.apply(this, arguments);
			this._digitHP = parseInt(lahm_params["digit_HP"], 10);
			this._digitMP = parseInt(lahm_params["digit_MP"], 10);
			this._digitTP = parseInt(lahm_params["digit_TP"], 10);
			this._maxValueFontSub = parseInt(lahm_params["digit_fontsize_sub"], 10);
			if((plugin_params["enable_minifont_for_lookathmpmmpjs"] === "true") && (plugin_params["enable_fonttype_for_lookathmpmmpjs_norm"] === "1") && (SceneManager._scene?.constructor === Scene_Battle)){
					this._maxValueYOffset = 4;
			}else{
					this._maxValueYOffset = parseInt(lahm_params["maxvalue_y_offset"], 10);
			}
		};

		Sprite_Gauge.prototype.setupValueFont = function() {
			if((plugin_params["enable_minifont_for_lookathmpmmpjs"] === "true") && (SceneManager._scene?.constructor === Scene_Battle)){
				switch(plugin_params["enable_fonttype_for_lookathmpmmpjs_norm"]){
					case "0":
						this.bitmap.fontFace = this.valueFontFace();
						this.bitmap.fontSize = this.valueFontSize();
						break;
					case "1":
						this.bitmap.fontFace = this.lahmPluginNormFontFace();
						this.bitmap.fontSize = 7;
						break;
				}
			}else{
				this.bitmap.fontFace = this.valueFontFace();
				this.bitmap.fontSize = this.valueFontSize();
			}
			this.bitmap.textColor = this.valueColor();
			this.bitmap.outlineColor = this.valueOutlineColor();
			this.bitmap.outlineWidth = this.valueOutlineWidth();
		};

		Sprite_Gauge.prototype.setupMaxValueFont = function() {
			if((plugin_params["enable_minifont_for_lookathmpmmpjs"] === "true") &&  (SceneManager._scene?.constructor === Scene_Battle)){
				switch(plugin_params["enable_fonttype_for_lookathmpmmpjs_norm"]){
					case "0":
						this.bitmap.fontFace = this.valueFontFace();
						this.bitmap.fontSize = this.valueFontSize();
						break;
					case "1":
						this.bitmap.fontFace = this.lahmPluginNormFontFace();
						this.bitmap.fontSize = 7;
						break;
				}
			}else{
				this.bitmap.fontFace = this.valueFontFace();
				this.bitmap.fontSize = this.maxValueFontSize();
			}
			this.bitmap.textColor = this.valueColor();
			this.bitmap.outlineColor = this.valueOutlineColor();
			this.bitmap.outlineWidth = this.valueOutlineWidth();
		};
	}

	//-----------------------------------------------------------------------------
	// Sprite_StateIcon
	//
	// The sprite for displaying state icons.

	Sprite_StateIcon.prototype.loadBitmap = function() {
		this.bitmap = ImageManager.loadSystem("IconSet");
		//this.bitmap.resize(this.bitmap.width >> 1, this.bitmap.height >> 1);
		this.setFrame(0, 0, 0, 0);
	};

	//-----------------------------------------------------------------------------
	// Sprite_StateOverlay
	//
	// The sprite for displaying an overlay image for a state.

	Sprite_StateOverlay.prototype.updateFrame = function() {
		if (this._overlayIndex > 0) {
			//const rate = plugin_params["no_reduction_sv_actors"] === "true" ? 0.334 : 1;
			const w = Math.trunc(this.bitmap.width / 8);
			const h = Math.trunc(this.bitmap.height / 10);
			const sx = this._pattern * w;
			const sy = (this._overlayIndex - 1) * h;
			this.setFrame(sx, sy, w, h);
		} else {
			this.setFrame(0, 0, 0, 0);
		}
	};

	//-----------------------------------------------------------------------------
	// Sprite_Weapon
	//
	// The sprite for displaying a weapon image for attacking.
		
	Sprite_Weapon.prototype.initMembers = function() {
		this._rate = plugin_params["no_reduction_sv_actors"] === "true" ? 0.334 : 1;
		this._weaponImageId = 0;
		this._animationCount = 0;
		this._pattern = 0;
		this.anchor.x = 0.5;
		this.anchor.y = 1;
		this.x = Math.trunc(-16 * this._rate);
	};

	Sprite_Weapon.prototype.loadBitmap = function() {
		this._pageId = Math.floor((this._weaponImageId - 1) / 12) + 1;
		if (this._pageId >= 1) {
			this.bitmap = ImageManager.loadSystem("Weapons" + this._pageId);
		} else {
			this.bitmap = ImageManager.loadSystem("");
		}
	};
	
	Sprite_Weapon.prototype.updateFrame = function() {
		if (this._weaponImageId > 0) {
			const index = (this._weaponImageId - 1) % 12;
			let w = 0;
			let h = 0;
			if(this._pageId !== 3){
				w = Math.trunc(this.bitmap.width / 6);
			}else{
				w = Math.trunc(this.bitmap.width / 3);
			}
			h = Math.trunc(this.bitmap.height / 6);
			const sx = (Math.floor(index / 6) * 3 + this._pattern) * w;
			const sy = Math.floor(index % 6) * h;
			this.setFrame(sx, sy, w, h);
		} else {
			this.setFrame(0, 0, 0, 0);
		}
	};
	
	Sprite_Weapon.prototype.isPlaying = function() {
		return this._weaponImageId > 0;
	};

	//-----------------------------------------------------------------------------
	// Sprite_Damage
	//
	// The sprite for displaying a popup damage.

	Sprite_Damage.prototype.outlineColor = function() {
		return "rgba(0, 0, 0, 1)";
	};

	Sprite_Damage.prototype.outlineWidth = function() {
		return 2;
	};

	Sprite_Damage.prototype.createDigits = function(value) {
		const string = Math.abs(value).toString();
		const h = this.fontSize();
		const w = Math.floor(h * 1.0);
		for (let i = 0; i < string.length; i++) {
			const sprite = this.createChildSprite(w, h);
			sprite.bitmap.drawText(string[i], 0, 0, w, h, "center");
			sprite.x = Math.trunc((i - (string.length - 1) / 2) * (w * 0.75));
			sprite.dy = -i;
		}
	};

	Sprite_Damage.prototype.fontFace = function() {
		return $gameSystem.mainFontFace();
	};

	Sprite_Damage.prototype.fontSize = function() {
		return $gameSystem.mainFontSize();
	};

	//-----------------------------------------------------------------------------
	// Sprite_Balloon
	//
	// The sprite for displaying a balloon icon.

	Sprite_Balloon.prototype.updatePosition = function() {
		this.x = this._target.x;
		this.y = this._target.y - Math.trunc(this._target.height * 0.8);
	};

	Sprite_Balloon.prototype.updateFrame = function() {
		const w = this.bitmap.width / 8;
		const h = this.bitmap.height / 15;
		const sx = this.frameIndex() * w;
		const sy = (this._balloonId - 1) * h;
		this.setFrame(sx, sy, w, h);
	};

	//-----------------------------------------------------------------------------
	// Spriteset_Battle
	//
	// The set of sprites on the battle screen.

	Spriteset_Battle.prototype.battleFieldOffsetY = function() {
		return 32;
	};
})();

//-----------------------------------------------------------------------------
// Sprite_BattleName
//
// Sprite_Nameの幅違いです。きつきつです。

function Sprite_BattleName() {
	this.initialize(...arguments);
}

Sprite_BattleName.prototype = Object.create(Sprite_Name.prototype);

Sprite_BattleName.prototype.bitmapWidth = function() {
	return 46;
};

Sprite_BattleName.prototype.bitmapHeight = function() {
	return 14;
};

Sprite_BattleName.prototype.valueFontFace = function() {
	return $gameSystem.numberFontFace();
};

Sprite_BattleName.prototype.valueFontSize = function() {
	return $gameSystem.mainFontSize() - 2;
};

Sprite_BattleName.prototype.setupFont = function() {
	this.bitmap.fontFace = this.valueFontFace();
	this.bitmap.fontSize = this.valueFontSize();
	this.bitmap.textColor = this.textColor();
	this.bitmap.outlineColor = this.outlineColor();
	this.bitmap.outlineWidth = this.outlineWidth();
};

//-----------------------------------------------------------------------------
// Sprite_BattleGauge
//
// Sprite_Gaugeの幅違いです。ちっさいです。

function Sprite_BattleGauge() {
	this.initialize(...arguments);
}

Sprite_BattleGauge.prototype = Object.create(Sprite_Gauge.prototype);

Sprite_BattleGauge.prototype.bitmapWidth = function() {
	return 52;
};