/*:
* @target MZ
* @plugindesc ピクセルパーフェクトっぽい気分になりたい時に使うアレ
* Ver 1.0.1
* @author 木下英一
* @url https://kinoei.sakura.ne.jp
* @help FeelPixelperfect.js
*
* 感じろ。
* 主にレトロライクな画面を作りたい時に使うプラグインです。
*
* ＜アレ＞
* 拡大してもぼやけないように整数倍率で拡大します。
* 縮小の場合（拡大倍率が１を切る場合）は整数倍率は適用されません。
* その場合は小数倍率になりスムージングがかかります（ＭＺデフォルトの状態）。
*
* 拡大は整数倍なのでウィンドウを拡大すると黒帯が発生します。
* 気になる方にはお勧めできません。
* （ＨＴＭＬいじくって黒帯になるところに画像など表示するっていうやり方も…。）
*
* 主にスタンドアロン向け。
* ブラウザデプロイは想定してません。Ｆ３で拡縮モードが変更できます。
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
* ＜おまけ＞
* QVGA : 320 x 240(RPGツクール200X系はこれ)
* WQVGA: 400 x 240
* あれ : 544 × 416(RPGツクールVX系はこれ)
* PC98 : 640 x 400
* VGA  : 640 x 480(RPGツクールXPはこれ)
* あれ : 160 x 144（ドットマトリックスのあれとか電池６本のあれ）
* あれ : 240 x 160（アドバンスなあれ）
* あれ : 256 x 192（２画面のあれ）
* あれ : 480 x 272（立体視のあれの上のやつ）
* あれ : 256 x 240または224（家族電算機）
* あれ : 256 x 192（三）
* 
* ＜履歴＞
* Ver 1.0.1
* ・タイトル画面で拡縮操作に関するアナウンスを追加。（表示設定変更可能）
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

* @param functionkey3_announce
* @text タイトル画面でＦ３キーアナウンスするかどうか
* @desc これを有効にすると、タイトル画面に「F3 ... 拡縮モード変更」を表示します。
* @default true
* @type boolean
* @on うむッ！
* @off いかんッ！
*/
(() => {
	//-----------------------------------------------------------------------------
	//
	//
	// パラメータをほじくるときに使います

	let plugin_params = PluginManager.parameters("FeelPixelperfect");
	if(plugin_params["functionkey3_announce"] === undefined)plugin_params["functionkey3_announce"] = "true";

	//
	const old_graphics_create_all_elements = Graphics._createAllElements;
	Graphics._createAllElements = function() {
		old_graphics_create_all_elements.apply(this, arguments);
	};

	Graphics._updateErrorPrinter = function() {
		const width = this._width * this._realScale;
		const height = (this._width < 640) ? ((this._height * 0.16) * this._realScale) : (100 * this._realScale);
		this._errorPrinter.style.width = width + "px";
		this._errorPrinter.style.height = height + "px";
	};

	Graphics._updateRealScale = function() {
		if (this._stretchEnabled && this._width > 0 && this._height > 0) {
			let h = this._stretchWidth() / this._width;
			let v = this._stretchHeight() / this._height;
			if((h >= 1.0) && (v >= 1.0)){
				h = Math.floor(h);
				v = Math.floor(v);
				document.getElementById("gameCanvas").style.imageRendering = "pixelated";
			}else{
				document.getElementById("gameCanvas").style.imageRendering = "auto";
			}
			this._realScale = Math.min(h, v);
			window.scrollTo(0, 0);
		} else {
			this._realScale = this._defaultScale;
		}
	};

	//-----------------------------------------------------------------------------
	// Scene_Title
	//
	// タイトル画面のシーンクラスです。

	Scene_Title.prototype._createFunctionkeyAnnounce = function() {
		this._FunctionkeyAnnounceSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
		this._FunctionkeyAnnounceSprite.bitmap.fontSize = $gameSystem.mainFontSize();
		this._FunctionkeyAnnounceSprite.bitmap.drawText("F3 ... 拡縮モード変更", 0, 0, Graphics.width, 16, "right");
		this.addChild(this._FunctionkeyAnnounceSprite);
	}

	const old_scene_title_create_foreground = Scene_Title.prototype.createForeground;
	Scene_Title.prototype.createForeground = function() {
		old_scene_title_create_foreground.apply(this, arguments);
		if(plugin_params["functionkey3_announce"] === "true"){
			this._createFunctionkeyAnnounce();
		}
	};
})();