//=============================================================================
// RPG Maker MZ - Text Color
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Customize the text color.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_TextColor.js(ver1.0.2)
 *
 * Customize the text color.
 *
 * By default, 33 colors are registered in the parameter "Color list".
 * These are used when \c[0] to \c[32] are
 * specified in the message display event.
 *
 * Please note that the row number and index of the parameter are shifted by the most.
 * The first line is \c[0], the second line is \c[1].
 *
 * --------------------------
 * FYI, Where to use color numbers
 *
 * 0: Normal (white text)
 * 16: System (Example: Item name on status screen)
 * 17: Pinch actor name, HP
 * 18: Death actor name, HP
 * 19: Gauge background
 * 20: HP gauge (zero side)
 * 21: HP gauge (max side)
 * 22: MP gauge (zmaxero side)
 * 23: MP gauge (max side)
 * 24: Equipment plus
 * 25: Equipment minus
 * 26: CT gauge (zero side)
 * 27: CT gauge (max side)
 * 28: TP gauge (zero side)
 * 29: TP gauge (max side)
 * 33: Text outline (original to this plug-in)
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param colorList
 * @text Color List
 * @type struct<Color>[]
 * @desc Enter the color corresponding to \c[X] in RGBA. The first is \c[0].
 * @default ["{\"red\":\"255\",\"green\":\"255\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"32\",\"green\":\"160\",\"blue\":\"214\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"120\",\"blue\":\"76\",\"opacity\":\"1\"}", "{\"red\":\"102\",\"green\":\"204\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"153\",\"green\":\"204\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"204\",\"green\":\"192\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"254\",\"green\":\"254\",\"blue\":\"159\",\"opacity\":\"1\"}", "{\"red\":\"128\",\"green\":\"128\",\"blue\":\"128\",\"opacity\":\"1\"}", "{\"red\":\"192\",\"green\":\"192\",\"blue\":\"192\",\"opacity\":\"1\"}", "{\"red\":\"29\",\"green\":\"129\",\"blue\":\"207\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"48\",\"blue\":\"16\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"160\",\"blue\":\"16\",\"opacity\":\"1\"}", "{\"red\":\"62\",\"green\":\"154\",\"blue\":\"222\",\"opacity\":\"1\"}", "{\"red\":\"160\",\"green\":\"152\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"204\",\"blue\":\"32\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"0\",\"blue\":\"0\",\"opacity\":\"1\"}", "{\"red\":\"132\",\"green\":\"170\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"255\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"32\",\"blue\":\"32\",\"opacity\":\"1\"}", "{\"red\":\"32\",\"green\":\"32\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"224\",\"green\":\"128\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"240\",\"green\":\"192\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"64\",\"green\":\"128\",\"blue\":\"192\",\"opacity\":\"1\"}", "{\"red\":\"64\",\"green\":\"192\",\"blue\":\"240\",\"opacity\":\"1\"}", "{\"red\":\"128\",\"green\":\"255\",\"blue\":\"128\",\"opacity\":\"1\"}", "{\"red\":\"192\",\"green\":\"128\",\"blue\":\"128\",\"opacity\":\"1\"}", "{\"red\":\"128\",\"green\":\"128\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"128\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"160\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"224\",\"blue\":\"96\",\"opacity\":\"1\"}", "{\"red\":\"160\",\"green\":\"96\",\"blue\":\"224\",\"opacity\":\"1\"}", "{\"red\":\"196\",\"green\":\"126\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"0\",\"blue\":\"0\",\"opacity\":\"0.6\"}"]
 *
 */
/*~struct~Color:
 *
 * @param red
 * @text Red
 * @type number
 * @max 255
 * @desc R. 0-255
 * @default 0
 * @decimals 0
 *
 * @param green
 * @text Green
 * @type number
 * @max 255
 * @desc G. 0-255.
 * @default 0
 * @decimals 0
 *
 * @param blue
 * @text Blue
 * @type number
 * @max 255
 * @desc B. 0-255.
 * @default 0
 * @decimals 0
 *
 * @param opacity
 * @text Opacity
 * @type number
 * @max 1
 * @desc 0-1. 0 is transparent.
 * @default 1
 * @decimals 1
 *
 */

/*:ja
 * @target MZ
 * @plugindesc テキストカラーをカスタマイズします。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_TextColor.js(ver1.0.2)
 *
 * テキストカラーをカスタマイズします。
 *
 * パラメーター「カラーリスト」にはデフォルトで33件の色が登録されています。
 * これらは文章の表示イベントで\c[0]～\c[32]を指定して色設定できます。
 *
 * デフォルトの32件目までは
 * ゲームフォルダ\img\system\Window.pngの色を再現しています。
 * 33件目はテキストのアウトラインの色を再現しています。
 *
 * ゲーム内各所で使用されている番号もありますので、
 * 後述の「色番号の使用箇所」を参考に変更してください。
 *
 * パラメーターの行番号とインデックスが１番ずれるので注意してください。
 * 1行目が\c[0]、2行目が\c[1]、3行目が\c[2]、、、です。
 *
 * データ追加して\c[33]のように使うこともできます。
 *
 * プラグインコマンドはありません。
 * --------------------------
 * ■参考：色番号の使用箇所
 *
 * 0：ノーマル（白文字の部分）
 * 16：システム（例：ステータス画面の項目名）
 * 17：ピンチのアクター名、HP
 * 18：死亡のアクター名、HP
 * 19：ゲージ背景
 * 20：HPゲージ（0側）
 * 21：HPゲージ（MAX側）
 * 22：MPゲージ（0側）
 * 23：MPゲージ（MAX側）
 * 24：装備プラス
 * 25：装備マイナス
 * 26：CTゲージ（0側）
 * 27：CTゲージ（MAX側）
 * 28：TPゲージ（0側）
 * 29：TPゲージ（MAX側）
 * 32：テキストのアウトライン(本プラグイン独自)
 *
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param colorList
 * @text カラーリスト
 * @type struct<Color>[]
 * @desc \c[X]に対応する色をRGBで指定。１件目が\c[0]です。
 * @default ["{\"red\":\"255\",\"green\":\"255\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"32\",\"green\":\"160\",\"blue\":\"214\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"120\",\"blue\":\"76\",\"opacity\":\"1\"}", "{\"red\":\"102\",\"green\":\"204\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"153\",\"green\":\"204\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"204\",\"green\":\"192\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"254\",\"green\":\"254\",\"blue\":\"159\",\"opacity\":\"1\"}", "{\"red\":\"128\",\"green\":\"128\",\"blue\":\"128\",\"opacity\":\"1\"}", "{\"red\":\"192\",\"green\":\"192\",\"blue\":\"192\",\"opacity\":\"1\"}", "{\"red\":\"29\",\"green\":\"129\",\"blue\":\"207\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"48\",\"blue\":\"16\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"160\",\"blue\":\"16\",\"opacity\":\"1\"}", "{\"red\":\"62\",\"green\":\"154\",\"blue\":\"222\",\"opacity\":\"1\"}", "{\"red\":\"160\",\"green\":\"152\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"204\",\"blue\":\"32\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"0\",\"blue\":\"0\",\"opacity\":\"1\"}", "{\"red\":\"132\",\"green\":\"170\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"255\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"32\",\"blue\":\"32\",\"opacity\":\"1\"}", "{\"red\":\"32\",\"green\":\"32\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"224\",\"green\":\"128\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"240\",\"green\":\"192\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"64\",\"green\":\"128\",\"blue\":\"192\",\"opacity\":\"1\"}", "{\"red\":\"64\",\"green\":\"192\",\"blue\":\"240\",\"opacity\":\"1\"}", "{\"red\":\"128\",\"green\":\"255\",\"blue\":\"128\",\"opacity\":\"1\"}", "{\"red\":\"192\",\"green\":\"128\",\"blue\":\"128\",\"opacity\":\"1\"}", "{\"red\":\"128\",\"green\":\"128\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"255\",\"green\":\"128\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"160\",\"blue\":\"64\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"224\",\"blue\":\"96\",\"opacity\":\"1\"}", "{\"red\":\"160\",\"green\":\"96\",\"blue\":\"224\",\"opacity\":\"1\"}", "{\"red\":\"196\",\"green\":\"126\",\"blue\":\"255\",\"opacity\":\"1\"}", "{\"red\":\"0\",\"green\":\"0\",\"blue\":\"0\",\"opacity\":\"0.6\"}"]
 *
 */
/*~struct~Color:ja
 *
 * @param red
 * @text 赤
 * @type number
 * @max 255
 * @desc 赤(R)。0～255で指定してください。
 * @default 0
 * @decimals 0
 *
 * @param green
 * @text 緑
 * @type number
 * @max 255
 * @desc 緑(G)。0～255で指定してください。
 * @default 0
 * @decimals 0
 *
 * @param blue
 * @text 青
 * @type number
 * @max 255
 * @desc 青(B)。0～255で指定してください。
 * @default 0
 * @decimals 0
 *
 * @param opacity
 * @text 透明度
 * @type number
 * @max 1
 * @desc 透明度(A)。0～1で指定してください。0で透明です。
 * @default 1
 * @decimals 1
 *
 *
 */

(() => {
	"use strict";
    const pluginName = "GABA_TextColor";

	const parameters = PluginManager.parameters(pluginName);
	const colorList = paramConvertArray(parameters["colorList"]);
	const colorPalette = createColorPalette();

	// テキストカラーを再定義
	ColorManager.textColor = function(n) {
		return colorPalette[n];
	};

	// アウトラインカラーを再定義
	ColorManager.outlineColor = function() {
		return colorPalette[32];
	};

	// -------------------------
    // その他
    // -------------------------

	// rgbaのカラー配列を作成
	function createColorPalette() {
		let array = [];
		for (const wColor of colorList){
			const myColor = "rgba("
			+ wColor.red
			+ "," + wColor.green
			+ "," + wColor.blue
			+ "," + wColor.opacity + ")";
			array.push(myColor);
		}
		return array;
	}

    // パラメータの型変換
    function paramConvert(param) {
        if (param == null) return param;
        if (param.toString().trim() === "") return param;
        if (param === "true") return true;
        if (param === "false") return false;
        if (isNaN(param)) return param;
        return Number(param);
    }

    // 配列パラメータの型変換
    function paramConvertArray(param) {
        try {
            if (param == null || param === "") {
                return param;
            }

            return JSON.parse(param, (_, value) => {
                if (typeof(value) === "object") {
                    for (let i = 0; i < value.length; i++) {
                        value[i] = paramConvertArray(value[i]);
                    }
                    return value;
                } else {
                    return paramConvert(value);
                }
    		});
        } catch {
            console.log(pluginName + ":リストパラメータエラー");
            return param;
        }
    }
})();
