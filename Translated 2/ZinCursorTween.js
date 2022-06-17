//=============================================================================
// RPG Maker MZ - CursorTween
//
// Copyright 2021 Huuzin
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//
// ver 1.5.0	Release data: 2021/10/31
//				カーソルの出現時の色や拡大率、ホバーを設定可能にした
// ver 1.1.0	Release data: 2021/01/31
//				WindowTweenでセーブリストをトゥイーンさせない場合、エラーが発生する不具合を修正
//				オプション画面で音量や設定変更した際にボタンを押すトゥイーンが発生するようにした
// ver 1.0.0	Release data: 2021/01/23
//				初版公開(First release)
// 
// https://huuzin.net
// 
//=============================================================================

/*:
* @target MZ
* @plugindesc ver 1.5.0 Decorate the appearance and movement of the cursor
* @author Huuzin
* @url https://huuzin.net/2021/1/23/cursortween/
* @base ZinTween
* @orderAfter ZinTween
* @base PluginCommonBase
* @orderAfter PluginCommonBase
*
* @help
* This plusing decorates the appearance and movement of the cursor.
*
* ---How to use---
* 1. Turn on the plugin.
* 2. Adjust the plugin parameters according to your preference.
*
* ---Operating conditions---
* RPG MZ version：v1.3.3
* PluginCommonBase and ZinTween ver 1.5.0 or higher are required for this plugin to work.
* PluginCommonBase: https://triacontane.blogspot.com/2020/08/rpgmz.html
* ZinTween: https://huuzin.net/2020/09/06/zintween/

* @param cursorMoveTween
* @text Cursor movement
* @desc Set tweening when moving the cursor.
* @type struct<TweenSettingMoving>
* @default {"easing":"OutQuad","duration":"0.200","delay":"0.000"}

* @param cursorNormalTween
* @text Cursor normal
* @desc Set cursor normal state tweening (persistent loop).
* @type struct<TweenSettingLoop>
* @default {"alpha":"200","toneR":"0","toneG":"0","toneB":"200","toneGray":"0","hue":"0","easing":"InOutSine","duration":"1.000","delay":"0","wrapMode":"Pingpong"}

* @param cursorPressTween
* @text Cursor click
* @desc Set the tween when the cursor is clicked.
* @type struct<TweenSettingLoop>
* @default {"alpha":"255","toneR":"200","toneG":"200","toneB":"0","toneGray":"0","hue":"0","easing":"Slope","duration":"0.060","delay":"0","wrapMode":"Clamp"}

* @param cursorHover
* @text Cursor Hover
* @desc Set related to cursor hover state.
* @type struct<TweenSettingHover>

* @param cursorViewTween
* @text Cursor view
* @desc Set tweening of character fields for numeric and name input (persistent loop).
* @type struct<TweenSettingLoop>
* @default {"alpha":"200","toneR":"200","toneG":"-50","toneB":"-50","toneGray":"0","hue":"0","easing":"InOutSine","duration":"2.000","delay":"0","wrapMode":"Pingpong"}

*/

/*~struct~TweenSettingLoop:
 * 
 * @param alpha
 * @text Alpha
 * @desc Set the cursor's alpha.
 * @default 0
 * @type string
 * 
 * @param toneR
 * @text Tone color (red)
 * @desc Specifies the tone color (red) before/after easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneG
 * @text Tone color (green)
 * @desc Specifies the tone color (green) before/after easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneB
 * @text Tone color (blue)
 * @desc Specifies the tone color (blue) before/after easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneGray
 * @text Tone color (grey)
 * @desc Specifies the tone color (grey) before/after easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param hue
 * @text Hue ring
 * @desc Specifies the hue ring before/after easing.[-360～360]
 * @default 0
 * @type number
 * @min -360
 * @max 360
 * @decimals 0
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
 *
 * @param duration
 * @text Easing duration
 * @desc Sets the time (in seconds) required to complete easing.
 * @default 0.3
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
 * @text Wrap mode
 * @desc Specifies the tween repeat mode.
 * @type select
 * @default Pingpong
 * @option One and done.[Clamp]
 * @value Clamp
 * @option Loop (return to the beginning after completion and repeat)[Loop]
 * @value Loop
 * @option Ping pong (repetitive motion)[Pingpong]
 * @value Pingpong
 * @option Finish once and return to the starting position.[Once]
 * @value Once
*/

/*~struct~TweenSettingMoving:
 * 
 * @param textEnabled
 * @text Enable text tween
 * @desc Enable text tweening?
 * @default true
 * @type boolean
 * 
 * @param textColor
 * @text Text Color
 * @desc Specifies the text tone color of the selection command.
 * @type struct<TweenColor>
 * @default {"r":"255","g":"255","b":"255"}
 * 
 * @param textOutlineColor
 * @text Outline Color
 * @desc Specifies the text outline tone color for the selection command.
 * @type struct<TweenColor>
 * @default {"r":"0","g":"0","b":"0"}
 * 
 * @param ***Movement***
 * @param moveEnabled
 * @text Enable moving tween
 * @desc Enable movement tweening when the command cursor changes location?
 * @default false
 * @type boolean
 * 
 * @param scaleEnabled
 * @text Enable scaling tween
 * @desc Enable expansion and contraction tweening when the command cursor changes location?
 * @default true
 * @type boolean
 * 
 * @param commandW
 * @text horizontal expansion start command
 * @desc Specifies the command horizontal expansion command at the start of tweening [blank: none, S: expand from left, C: from center, E: from right].
 * @default ""
 * @type string
 * 
 * @param commandH
 * @text vertical expansion start command
 * @desc Specifies the command vertical expansion command at the start of tweening [blank: none, S: expand from top, C: from center, E: from bottom].
 * @default ""
 * @type string
 * 
 * @param ***Easing***
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
 * 
 * @param duration
 * @text Easing duration
 * @desc Sets the time (in seconds) required to complete easing.
 * @default 0.3
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
 * @param ***Tone Color***
 * 
 * @param toneR
 * @text Tone Color(Red)
 * @desc Specifies the tone color (red) before easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneG
 * @text Tone Color(Green)
 * @desc Specifies the tone color (green) before easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneB
 * @text Tone Color(Blue)
 * @desc Specifies the tone color (blue) before easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneGray
 * @text Tone Color(Grey)
 * @desc Specifies the tone color (grey) before easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param hue
 * @text Hue
 * @desc Specifies the hue (hue ring) before easing.[-360～360]
 * @default 0
 * @type number
 * @min -360
 * @max 360
 * @decimals 0
 * 
 * 
*/

/*~struct~TweenSettingHover:
 * 
 * @param enabled
 * @text Enable
 * @desc Enable or disable the hover effect
 * @default false
 * @type boolean
 * 
 * @param x
 * @text Command move x coordinate
 * @desc Specifies the command move x coordinate before/after easing [pixels].
 * @default -2
 * @type number
 * @decimals 0

 * @param y
 * @text Command move y coordinate
 * @desc Specifies the command move y coordinate before/after easing [pixels].
 * @default -2
 * @type number
 * @decimals 0

 */

/*~struct~TweenColor:
 * @param r
 * @text Color (Red)
 * @desc Specifies the tone color (red) before/after easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param g
 * @text Color (Green)
 * @desc Specifies the tone color (green) before/after easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param b
 * @text Color (Blue)
 * @desc Specifies the tone color (blue) before/after easing.[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
*/

/*:ja
* @target MZ
* @plugindesc ver 1.5.0 カーソルの出現や移動を装飾します
* @author Huuzin
* @url https://huuzin.net/2021/1/23/cursortween/
* @base ZinTween
* @orderAfter ZinTween
* @base PluginCommonBase
* @orderAfter PluginCommonBase
*
* @help
* カーソルの出現や移動を装飾します。
*
* ---使用方法---
* 1. プラグインをONにします。
* 2. 好みに合わせてプラグインパラメータを調整してください。
*
* ---動作確認---
* コアスクリプト：v1.3.3
* 本プラグインの動作にはPluginCommonBaseとZinTween ver 1.5.0以上が必要です。
* PluginCommonBase: https://triacontane.blogspot.com/2020/08/rpgmz.html
* ZinTween: https://huuzin.net/2020/09/06/zintween/

* @param cursorMoveTween
* @text カーソル移動
* @desc カーソルを移動するときのトゥイーンの設定
* @type struct<TweenSettingMoving>
* @default {"textEnabled":"true","textColor":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"0\"}","textOutlineColor":"{\"r\":\"0\",\"g\":\"0\",\"b\":\"255\"}","***移動関連***":"","moveEnabled":"false","scaleEnabled":"true","commandW":"","commandH":"C","***イージング***":"","easing":"OutQuad","duration":"0.200","delay":"0.000","***トーンカラー***":"","toneR":"255","toneG":"255","toneB":"255","toneGray":"0","hue":"0"}

* @param cursorNormalTween
* @text カーソル通常
* @desc カーソル通常状態のトゥイーン設定(永続ループ)
* @type struct<TweenSettingLoop>
* @default {"alpha":"200","toneR":"0","toneG":"0","toneB":"200","toneGray":"0","hue":"0","easing":"InOutSine","duration":"1.000","delay":"0","wrapMode":"Pingpong"}

* @param cursorPressTween
* @text カーソルクリック
* @desc カーソルをクリックしたときのトゥイーン設定
* @type struct<TweenSettingLoop>
* @default {"alpha":"255","toneR":"200","toneG":"200","toneB":"0","toneGray":"0","hue":"0","easing":"Slope","duration":"0.060","delay":"0","wrapMode":"Clamp"}

* @param cursorHover
* @text カーソルホバー
* @desc カーソルのホバー状態に関する設定
* @type struct<TweenSettingHover>
* @default {"enabled":"true","x":"-2","y":"-2"}

* @param cursorViewTween
* @text カーソルビュー
* @desc 数字入力と名前入力の文字欄のトゥイーン設定(永続ループ)
* @type struct<TweenSettingLoop>
* @default {"alpha":"200","toneR":"200","toneG":"-50","toneB":"-50","toneGray":"0","hue":"0","easing":"InOutSine","duration":"2.000","delay":"0","wrapMode":"Pingpong"}

* @param 
* @default
* @param debugMode
* @text デバッグモード
* @desc プレイ中にコンソールログを出力します。バグ報告や他のプラグイン開発に使用します。
* @type boolean
* @default false

*/


/*~struct~TweenSettingLoop:ja
 * 
 * @param alpha
 * @text 透明度
 * @desc イージング前／後の透明度を指定します[0(透明)～255(不透明)]
 * @default 128
 * @type number
 * @min 0
 * @max 255
 * @decimals 0
 * 
 * @param toneR
 * @text トーンカラー(赤)
 * @desc イージング前／後のトーンカラー(赤)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneG
 * @text トーンカラー(緑)
 * @desc イージング前／後のトーンカラー(緑)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneB
 * @text トーンカラー(青)
 * @desc イージング前／後のトーンカラー(青)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneGray
 * @text トーンカラー(グレー)
 * @desc イージング前／後のトーンカラー(グレー)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param hue
 * @text ヒュー(色相環)
 * @desc イージング前／後のヒュー(色相環)を指定します[-360～360]
 * @default 0
 * @type number
 * @min -360
 * @max 360
 * @decimals 0
 * 
 * @param easing
 * @text イージング
 * @desc イージングの種類を指定します。
 * @type select
 * @default InOutSine
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
 * @text イージング時間[秒]
 * @desc イージング完了までにかかる時間[秒]
 * @default 0.3
 * @type number
 * @decimals 3
 * 
 * @param delay
 * @text ディレイ[秒]
 * @desc イージング開始までのディレイ時間[秒]
 * @default 0
 * @type number
 * @decimals 3
 * 
 * @param wrapMode
 * @text 繰り返しモード
 * @desc トゥイーンの繰り返しモードを指定します。
 * @type select
 * @default Pingpong
 * @option １回で終了[Clamp]
 * @value Clamp
 * @option ループ(終了後始めに戻って繰り返す)[Loop]
 * @value Loop
 * @option ピンポン(反復運動)[Pingpong]
 * @value Pingpong
 * @option １回で終了し始めの位置に戻る[Once]
 * @value Once
*/

/*~struct~TweenSettingMoving:ja
 * 
 * @param textEnabled
 * @text テキストトゥイーン有効化
 * @desc テキストトゥイーンを有効にするか
 * @default true
 * @type boolean
 * 
 * @param textColor
 * @text テキストカラー
 * @desc 選択コマンドのテキストトーンカラーを指定します。
 * @type struct<TweenColor>
 * @default {"r":"255","g":"255","b":"255"}
 * 
 * @param textOutlineColor
 * @text アウトラインカラー
 * @desc 選択コマンドのテキストアウトライントーンカラーを指定します。
 * @type struct<TweenColor>
 * @default {"r":"0","g":"0","b":"0"}
 * 
 * @param ***移動関連***
 * @param moveEnabled
 * @text 移動トゥイーン有効化
 * @desc コマンドカーソルの場所が変わった時の移動トゥイーンを有効にするか
 * @default false
 * @type boolean
 * 
 * @param scaleEnabled
 * @text 拡縮トゥイーン有効化
 * @desc コマンドカーソルの場所が変わった時の拡縮トゥイーンを有効にするか
 * @default true
 * @type boolean
 * 
 * @param commandW
 * @text 横拡大開始コマンド
 * @desc トゥイーン開始時のコマンド横拡大コマンドを指定します[空白:なし、S:左から拡大、C:中央から、E:右から]
 * @default ""
 * @type string
 * 
 * @param commandH
 * @text 縦拡大開始コマンド
 * @desc トゥイーン開始時のコマンド縦拡大コマンドを指定します[空白:なし、S:上から拡大、C:中央から、E:下から]
 * @default ""
 * @type string
 * 
 * @param ***イージング***
 * 
 * @param easing
 * @text イージング
 * @desc イージングの種類を指定します。
 * @type select
 * @default InOutSine
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
 * @default 0.3
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
 * @param ***トーンカラー***
 * 
 * @param toneR
 * @text トーンカラー(赤)
 * @desc イージング前のトーンカラー(赤)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneG
 * @text トーンカラー(緑)
 * @desc イージング前のトーンカラー(緑)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneB
 * @text トーンカラー(青)
 * @desc イージング前のトーンカラー(青)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param toneGray
 * @text トーンカラー(グレー)
 * @desc イージング前のトーンカラー(グレー)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param hue
 * @text ヒュー(色相環)
 * @desc イージング前のヒュー(色相環)を指定します[-360～360]
 * @default 0
 * @type number
 * @min -360
 * @max 360
 * @decimals 0
 * 
*/

/*~struct~TweenSettingHover:ja
 * 
 * @param enabled
 * @text 有効化
 * @desc ホバーエフェクトを有効にするか
 * @default false
 * @type boolean
 * 
 * @param x
 * @text コマンド移動x座標
 * @desc イージング前／後のコマンド移動x座標を指定します[ピクセル]
 * @default -2
 * @type number
 * @decimals 0

 * @param y
 * @text コマンド移動y座標
 * @desc イージング前／後のコマンド移動y座標を指定します[ピクセル]
 * @default -2
 * @type number
 * @decimals 0

 */

/*~struct~TweenColor:ja
 * @param r
 * @text カラー(赤)
 * @desc イージング前／後のトーンカラー(赤)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param g
 * @text カラー(緑)
 * @desc イージング前／後のトーンカラー(緑)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
 * 
 * @param b
 * @text カラー(青)
 * @desc イージング前／後のトーンカラー(青)を指定します[-255～255]
 * @default 0
 * @type number
 * @min -255
 * @max 255
 * @decimals 0
*/

(() => {
    'use strict';
    const script = document.currentScript;
	const param  = PluginManagerEx.createParameter(script);

	//-------------------------------------------------------------------------------------------------
	//	Plugin command
    //-------------------------------------------------------------------------------------------------
    
    //-------------------------------------------------------------------------------------------------
    // Static Class
	//-------------------------------------------------------------------------------------------------

	//-------------------------------------------------------------------------------------------------
    // Changing Initialize
	//-------------------------------------------------------------------------------------------------
	const _Window_Selectable_prototype_initialize = Window_Selectable.prototype.initialize;
	Window_Selectable.prototype.initialize = function(rect) {
		_Window_Selectable_prototype_initialize.apply(this,arguments);

		// Hover Index
		this._indexOld = -1;
		this._currentIndex = 0;

		// Hover Text Effect
		let cc = ZinTween.GetColorStruct(ColorManager.normalColor());
		this._hoverTweenColorR = cc.r;
		this._hoverTweenColorG = cc.g;
		this._hoverTweenColorB = cc.b;
		cc = ColorManager.outlineColor();
		this._outlineHoverTweenColorR = cc.r;
		this._outlineHoverTweenColorG = cc.g;
		this._outlineHoverTweenColorB = cc.b;
	};

	//-------------------------------------------------------------------------------------------------
    // Window
	//-------------------------------------------------------------------------------------------------
	// 透明度の上書き防止
	const _Window_prototype__updateCursor = Window.prototype._updateCursor;
	Window.prototype._updateCursor = function() {
		const a = this._cursorSprite.alpha;
		_Window_prototype__updateCursor.apply(this,arguments);
		this._cursorSprite.alpha = a;
		this._cursorSprite.opacity *= this.contentsOpacity / 255;
	};


	//-------------------------------------------------------------------------------------------------
    // Window Base
	//-------------------------------------------------------------------------------------------------
	//ループ用Tweenのセット
	Window_Base.prototype.doLoopCursorTween = function() {
		const easing = ZinTween.getEasing(param.cursorNormalTween.easing);
		const wrapMode = ZinTween.getWrapMode(param.cursorNormalTween.wrapMode);
		let loopNum = -1;
		if(wrapMode == WrapMode.Clamp) loopNum = 0;
		this._cursorSprite.opacity = 255;
		
		this._cursorSprite.ztAlphaTo(param.cursorNormalTween.alpha, param.cursorNormalTween.duration).setDelay(param.cursorNormalTween.delay).setEase(easing).setWrapMode(wrapMode).setCycleNum(loopNum);
		if(param.cursorNormalTween.toneR != 0 || param.cursorNormalTween.toneG != 0 || param.cursorNormalTween.toneB != 0 || param.cursorNormalTween.toneGray != 0){
			this._cursorSprite.setColorTone([0,0,0,0]);
			this._cursorSprite.ztColorTo([param.cursorNormalTween.toneR,param.cursorNormalTween.toneG,param.cursorNormalTween.toneB,param.cursorNormalTween.toneGray], param.cursorNormalTween.duration).setDelay(param.cursorNormalTween.delay).setEase(easing).setWrapMode(wrapMode).setCycleNum(loopNum);
		}
		if(param.cursorNormalTween.hue != 0){
			this._cursorSprite.setHue(0);
			this._cursorSprite.ztHueTo(param.cursorNormalTween.hue, param.cursorNormalTween.duration).setDelay(param.cursorNormalTween.delay).setEase(easing).setWrapMode(wrapMode).setCycleNum(loopNum);
		}

		if(param.debugMode) console.log("CursorTween >> doLoopCursorTween:");
	};

	//ボタンを押したときのTweenのセット
	Window_Base.prototype.doPressCursorTween = function() {
		const easing = ZinTween.getEasing(param.cursorPressTween.easing);
		this._cursorSprite.ztAlphaTo(param.cursorPressTween.alpha, param.cursorPressTween.duration).setDelay(param.cursorPressTween.delay).setEase(easing).setWrapMode(WrapMode.Pingpong);
		if(param.cursorPressTween.toneR != 0 || param.cursorPressTween.toneG != 0 || param.cursorPressTween.toneB != 0 || param.cursorPressTween.toneGray != 0){
			this._cursorSprite.ztColorTo([param.cursorPressTween.toneR,param.cursorPressTween.toneG,param.cursorPressTween.toneB,param.cursorPressTween.toneGray], param.cursorPressTween.duration).setDelay(param.cursorPressTween.delay).setEase(easing).setWrapMode(WrapMode.Pingpong);
		}
		if(param.cursorPressTween.hue != 0){
			this._cursorSprite.ztHueTo(param.cursorPressTween.hue, param.cursorPressTween.duration).setDelay(param.cursorPressTween.delay).setEase(easing).setWrapMode(WrapMode.Pingpong);	
		}
		if(param.debugMode) console.log("CursorTween >> doPressCursorTween:");
	};

	//ビュー用Tweenのセット
	Window_Base.prototype.doViewCursorTween = function() {
		const easing = ZinTween.getEasing(param.cursorViewTween.easing);
		const wrapMode = ZinTween.getWrapMode(param.cursorViewTween.wrapMode);
		let loopNum = -1;
		if(wrapMode == WrapMode.Clamp) loopNum = 0;
		this._cursorSprite.ztAlphaTo(param.cursorViewTween.alpha, param.cursorViewTween.duration).setDelay(param.cursorViewTween.delay).setEase(easing).setWrapMode(wrapMode).setCycleNum(loopNum);
		if(param.cursorViewTween.toneR != 0 || param.cursorViewTween.toneG != 0 || param.cursorViewTween.toneB != 0 || param.cursorViewTween.toneGray != 0){
			this._cursorSprite.ztColorTo([param.cursorViewTween.toneR,param.cursorViewTween.toneG,param.cursorViewTween.toneB,param.cursorViewTween.toneGray], param.cursorViewTween.duration).setDelay(param.cursorViewTween.delay).setEase(easing).setWrapMode(wrapMode).setCycleNum(loopNum);
		}
		if(param.cursorViewTween.hue != 0){
			this._cursorSprite.ztHueTo(param.cursorViewTween.hue, param.cursorViewTween.duration).setDelay(param.cursorViewTween.delay).setEase(easing).setWrapMode(wrapMode).setCycleNum(loopNum);
		}
		if(param.debugMode) console.log("CursorTween >> doViewCursorTween:");
	};

	//ボタンが出現するときのtweenのセット
	Window_Base.prototype.doOpenCursorTween = function() {
		this.doMoveCursorTween();
	};

	//ボタンが移動するときのtweenのセット
	Window_Base.prototype.doMoveCursorTween = function() {
		const easing = ZinTween.getEasing(param.cursorMoveTween.easing);

		if(param.cursorMoveTween.textEnabled)
		{
			let a = ZinTween.GetColorStruct("#000000");
			let b = ZinTween.GetColorStruct("#000000");

			this._hoverTweenColorR = a.r;
			this._hoverTweenColorG = a.g;
			this._hoverTweenColorB = a.b;
			this.ztNumberTo("_hoverTweenColorR", param.cursorMoveTween.textColor.r, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_hoverTweenColorG", param.cursorMoveTween.textColor.g, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_hoverTweenColorB", param.cursorMoveTween.textColor.b, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);

			this._outlineHoverTweenColorR = b.r;
			this._outlineHoverTweenColorG = b.g;
			this._outlineHoverTweenColorB = b.b;
			this.ztNumberTo("_outlineHoverTweenColorR", param.cursorMoveTween.textOutlineColor.r, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_outlineHoverTweenColorG", param.cursorMoveTween.textOutlineColor.g, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_outlineHoverTweenColorB", param.cursorMoveTween.textOutlineColor.b, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);

		}

		if(param.cursorMoveTween.toneR != 0 || param.cursorMoveTween.toneG != 0 || param.cursorMoveTween.toneB != 0 || param.cursorMoveTween.toneGray != 0){
			this._cursorSprite.setColorTone([0,0,0,0]);
			this._cursorSprite.ztColorFrom([param.cursorMoveTween.toneR,param.cursorMoveTween.toneG,param.cursorMoveTween.toneB,param.cursorMoveTween.toneGray], param.cursorMoveTween.duration).setDelay(param.cursorMoveTween.delay).setEase(easing);
		}
		if(param.cursorMoveTween.hue != 0){
			this._cursorSprite.ztHueFrom(param.cursorMoveTween.hue, param.cursorMoveTween.duration).setDelay(param.cursorMoveTween.delay).setEase(easing);	
		}
		
	};

	//カーソルをクローズするときのtweenのセット
	Window_Base.prototype.doCloseCursorTween = function() {
		const easing = ZinTween.getEasing(param.cursorMoveTween.easing);

		if(param.cursorMoveTween.textEnabled)
		{
			this.ztNumberTo("_hoverTweenColorR", 0, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_hoverTweenColorG", 0, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_hoverTweenColorB", 0, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);

			this.ztNumberTo("_outlineHoverTweenColorR", 0, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_outlineHoverTweenColorG", 0, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			this.ztNumberTo("_outlineHoverTweenColorB", 0, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
		}
	};

	// カーソルトゥイーンのリセット
	Window_Base.prototype.resetCursorTween = function() {
		if(this._cursorSprite._ztSeq) this._cursorSprite._ztSeq.completeAllTweens(this._cursorSprite);
	};


	//-------------------------------------------------------------------------------------------------
    // Window Scrollable
	//-------------------------------------------------------------------------------------------------
	// 画面スクロールに合わせてトゥイーンを調整する
	const _Window_Scrollable_prototype_updateScrollBase = Window_Scrollable.prototype.updateScrollBase;
	Window_Scrollable.prototype.updateScrollBase = function(baseX, baseY) {
		if(this._cursorMoveTween && this._cursorMoveTween.isPlaying()){
			const deltaX = baseX - this._scrollBaseX;
			const deltaY = baseY - this._scrollBaseY;
			this._cursorMoveTween._startX -= deltaX;
			this._cursorMoveTween._endX -= deltaX;
			this._cursorMoveTween._startY -= deltaY;
			this._cursorMoveTween._endY -= deltaY;
		}

		_Window_Scrollable_prototype_updateScrollBase.apply(this,arguments);
	};


	//アクティブ条件の変更
	const _Window_prototype_isOpen = Window_Selectable.prototype.isOpenAndActive;
	Window_Selectable.prototype.isOpenAndActive = function() {
		const v = _Window_prototype_isOpen.apply(this,arguments);
		if(this._isAvtivateCursor){
			return v & (this._isAvtivateCursor == 2);
		}else{
			return v;
		}
	};

	const _Window_Selectable_prototype_deactivate = Window_Selectable.prototype.deactivate;
	Window_Selectable.prototype.deactivate = function() {
		_Window_Selectable_prototype_deactivate.apply(this,arguments);
		this.resetCursorTween();
	};

	// Activateに合わせてカーソルの出現トゥイーン開始
	const _Window_Base_prototype_activate = Window_Selectable.prototype.activate;
	Window_Selectable.prototype.activate = function() {
		_Window_Base_prototype_activate.apply(this,arguments);
		if(this instanceof Window_NumberInput || this instanceof  Window_ShopNumber){
			this._cursorSprite.opacity = 255;
			this.doViewCursorTween();
			this._isAvtivateCursor = 2;
		}else{
			this._isAvtivateCursor = 1;
			this.resetCursorTween();
			this.doOpenCursorTween();
			this.setActivate();
			this.refreshCursor();

			this._ctShowCursor = true;
		}
	};

	// 通常時のループトゥイーンを設定する
	Window_Selectable.prototype.setActivate = function() {
		this._isAvtivateCursor = 2;
		this.doLoopCursorTween();
	};

	
	// カーソル移動をトリガーにしてトゥイーンさせる
	Window_Selectable.prototype.setCursorRect = function(x, y, width, height) {
		let oldX = this._cursorSprite.x;
		let oldY = this._cursorSprite.y;
		Window.prototype.setCursorRect.apply(this,arguments);
		
		if(this._isAvtivateCursor  && this._index != this._indexOld && this._index != -1){
			this._cursorSprite.x = this._cursorRect.x;
			this._cursorSprite.y = this._cursorRect.y;

            const easing = ZinTween.getEasing(param.cursorMoveTween.easing);
			if(param.cursorMoveTween.moveEnabled)
			{
				this._cursorMoveTween = this.ztCursorMoveFrom(oldX, oldY, param.cursorMoveTween.duration).setEase(easing).setDelay(param.cursorMoveTween.delay);
			}
						
			this._indexOld = this._index;

			if(param.cursorMoveTween.scaleEnabled){
				let l = String(this._cursorRect.width);
				let h = String(this._cursorRect.height);
				if(param.cursorMoveTween.commandW != ""){
					l = "0" + param.cursorMoveTween.commandW;
				}
				if(param.cursorMoveTween.commandH != ""){
					h =  "0" + param.cursorMoveTween.commandH;
				}
				this.ztCursorScaleFrom(l, h, param.cursorMoveTween.duration).setDelay(param.cursorMoveTween.delay).setEase(easing);
			}

			if(param.debugMode) console.log("CursorTween >> setCursorRect: カーソル移動トゥイーン index = " + this._index);
		
			this.doMoveCursorTween();
		}	
	};

	// 移動トゥイーンの呼び出し
	Window_Selectable.prototype.callMoveTween = function(){

	};

	// ボタンクリックに応じてクリックトゥイーンさせる
	const _Window_Selectable_prototype_processOk = Window_Selectable.prototype.processOk;
	Window_Selectable.prototype.processOk = function() {
		_Window_Selectable_prototype_processOk.apply(this,arguments);
		this.resetCursorTween();
		this.doPressCursorTween();
	};


	//-------------------------------------------------------------------------------------------------
    // Window Options
	//-------------------------------------------------------------------------------------------------
	const _Window_Options_prototype_changeVolume = Window_Options.prototype.changeVolume;
	Window_Options.prototype.changeVolume = function(symbol, forward, wrap) {
		_Window_Options_prototype_changeVolume.apply(this, arguments);
		this.resetCursorTween();
		this.doPressCursorTween();
		this._cursorSprite.ztSetHandler(this.doLoopCursorTween.bind(this));
	};

	const _Window_Options_prototype_changeValue = Window_Options.prototype.changeValue;
	Window_Options.prototype.changeValue = function(symbol, value) {
		_Window_Options_prototype_changeValue.apply(this,arguments);
		this.resetCursorTween();
		this.doPressCursorTween();
		this._cursorSprite.ztSetHandler(this.doLoopCursorTween.bind(this));
	};


	//-------------------------------------------------------------------------------------------------
    // Window NameEdit
	//-------------------------------------------------------------------------------------------------
	const _Window_NameEdit_prototype_setup = Window_NameEdit.prototype.setup;
	Window_NameEdit.prototype.setup = function(actor, maxLength) {
		_Window_NameEdit_prototype_setup.apply(this,arguments);
		this.doViewCursorTween();
	};


	//-------------------------------------------------------------------------------------------------
    // Window MenuStatus
	//-------------------------------------------------------------------------------------------------
	const _Window_MenuStatus_prototype_processOk = Window_MenuStatus.prototype.processOk;
	Window_MenuStatus.prototype.processOk = function() {
		_Window_MenuStatus_prototype_processOk.apply(this,arguments);
		this._cursorSprite.ztSetHandler(this.doLoopCursorTween.bind(this));
	};


	//-------------------------------------------------------------------------------------------------
    // Window NameInput
	//-------------------------------------------------------------------------------------------------
	const _Window_NameInput_prototype_processOk = Window_NameInput.prototype.processOk;
	Window_NameInput.prototype.processOk = function() {
		_Window_NameInput_prototype_processOk.apply(this,arguments);
		this.resetCursorTween();
		this.doPressCursorTween();
		this._cursorSprite.ztSetHandler(this.doLoopCursorTween.bind(this));
	};

	
	//-------------------------------------------------------------------------------------------------
	//	Cursor Move
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Cursor_Move() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Cursor_Move.prototype = Object.create(ZinTween_Move.prototype);
	ZinTween_Cursor_Move.prototype.constructor = ZinTween_Cursor_Move;

	//対象トゥイーンのx座標
	ZinTween_Cursor_Move.prototype.x = function(target){
		return target._cursorRect.x;
	};

	//対象トゥイーンのy座標
	ZinTween_Cursor_Move.prototype.y = function(target){
		return target._cursorRect.y;
	};

	//対象トゥイーンの横幅
	ZinTween_Cursor_Move.prototype.width = function(target){
		return target._cursorRect.width;
	};

	//対象トゥイーンの縦幅
	ZinTween_Cursor_Move.prototype.height = function(target){
		return target._cursorRect.height;
	};

	//x座標をセット
	ZinTween_Cursor_Move.prototype.setX = function(target,x){
		target._cursorRect.x = x;
	};

	//y座標をセット
	ZinTween_Cursor_Move.prototype.setY = function(target,y){
		target._cursorRect.y = y;
	};

	Window.prototype.ztCursorMoveTo = function(x,y,duration) {
		let zto = new ZinTween_Cursor_Move();
		return ZinTween.setMoveTo(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	Window.prototype.ztCursorMoveFrom = function(x,y,duration) {
		let zto = new ZinTween_Cursor_Move();
		return ZinTween.setMoveFrom(zto,duration,x,y,Graphics.boxWidth,Graphics.boxHeight,true,true,this);
	};

	//-------------------------------------------------------------------------------------------------
	//	Cursor Scale
	//-------------------------------------------------------------------------------------------------
	function ZinTween_Cursor_Scale() {
		this.initialize.apply(this, arguments);
	}

	ZinTween_Cursor_Scale.prototype = Object.create(ZinTween_Scale.prototype);
	ZinTween_Cursor_Scale.prototype.constructor = ZinTween_Cursor_Scale;

	//対象トゥイーンのx座標
	ZinTween_Cursor_Scale.prototype.x = function(target){
		return target._cursorRect.x;
	};

	//対象トゥイーンのy座標
	ZinTween_Cursor_Scale.prototype.y = function(target){
		return target._cursorRect.y;
	};

	//x座標をセット
	ZinTween_Cursor_Scale.prototype.setX = function(target,x){
		target._cursorRect.x = x;
	};

	//y座標をセット
	ZinTween_Cursor_Scale.prototype.setY = function(target,y){
		target._cursorRect.y = y;
	};

	//対象トゥイーンの横幅
	ZinTween_Cursor_Scale.prototype.width = function(target){
		return 1.0;
	};

	//対象トゥイーンの縦幅
	ZinTween_Cursor_Scale.prototype.height = function(target){
		return 1.0;
	};

	//対象トゥイーンのxスケール
	ZinTween_Cursor_Scale.prototype.xScale = function(target){
		return target._cursorRect.width;
	};

	//対象トゥイーンのyスケール
	ZinTween_Cursor_Scale.prototype.yScale = function(target){
		return target._cursorRect.height;
	};

	//xスケールをセット
	ZinTween_Cursor_Scale.prototype.setXScale = function(target,x){
		target._cursorRect.width = x;
	};

	//yスケールをセット
	ZinTween_Cursor_Scale.prototype.setYScale = function(target,y){
		target._cursorRect.height = y;
		target._refreshCursor();
	};

	Window.prototype.ztCursorScaleTo = function(x,y,duration) {
		let zto = new ZinTween_Cursor_Scale();
		return ZinTween.setScaleTo(zto,duration,x,y,1.0,1.0,true,true,this);
	};

	Window.prototype.ztCursorScaleFrom = function(x,y,duration) {
		let zto = new ZinTween_Cursor_Scale();
		return ZinTween.setScaleFrom(zto,duration,x,y,1.0,1.0,true,true,this);
	};


	//-------------------------------------------------------------------------------------------------
    // コマンド用ホバートゥイーン
	//-------------------------------------------------------------------------------------------------
	const _Window_Selectable_prototype_select = Window_Selectable.prototype.select;
	Window_Selectable.prototype.select = function(index) {
		this._currentIndex = index;
		_Window_Selectable_prototype_select.apply(this,arguments);
	};


	const _Window_Selectable_prototype_itemRect = Window_Selectable.prototype.itemRect;
	Window_Selectable.prototype.itemRect = function(index) {
		let r = _Window_Selectable_prototype_itemRect.apply(this,arguments);
		if(param.cursorHover.enabled && this._currentIndex == index && !(this instanceof Window_MenuStatus)){
			r.x += param.cursorHover.x;
			r.y += param.cursorHover.y;
		}
		return r;
	};


	//-------------------------------------------------------------------------------------------------
    // Text Hover Effect
	//-------------------------------------------------------------------------------------------------
	Window_Selectable.prototype.drawAllItems = function() {
		const topIndex = this.topIndex();
		for (let i = 0; i < this.maxVisibleItems(); i++) {
			const index = topIndex + i;
			if (index < this.maxItems()) {
				this.drawItemBackground(index);

				// Text Hover
				if(this._currentIndex == index && param.cursorMoveTween.textEnabled){
					this._hoverColor = ZinTween.GetColorCode({r:this._hoverTweenColorR, g:this._hoverTweenColorG, b:this._hoverTweenColorB, a:255});
					this._outlineHoverColor = ZinTween.GetColorCode({r:this._outlineHoverTweenColorR, g:this._outlineHoverTweenColorG, b:this._outlineHoverTweenColorB, a:255});
				}else{
					this._hoverColor = null;
					this._outlineHoverColor = null;
				}

				this.drawItem(index);
			}
		}
	};

	const _Window_Base_prototype_changeTextColor = Window_Base.prototype.changeTextColor;
	Window_Base.prototype.changeTextColor = function(color) {
		_Window_Base_prototype_changeTextColor.apply(this,arguments);
		if(this._hoverColor != null && param.cursorMoveTween.textEnabled){
			let a = ZinTween.GetColorStruct(this.contents.textColor);
			let b = ZinTween.GetColorStruct(this._hoverColor);
			a.r += b.r;
			a.g += b.g;
			a.b += b.b;
			a.a = this.contents.paintOpacity;
			this.contents.textColor = ZinTween.GetColorCode(a);
		}
		this.changeOutlineColor(ColorManager.outlineColor());
	};
	
	const _Window_Base_prototype_changeOutlineColor = Window_Base.prototype.changeOutlineColor;
	Window_Base.prototype.changeOutlineColor = function(color) {
		_Window_Base_prototype_changeOutlineColor.apply(this,arguments);
		if(this._outlineHoverColor != null && param.cursorMoveTween.textEnabled){
			let a = ZinTween.GetColorStruct(this.contents.outlineColor);
			let b = ZinTween.GetColorStruct(this._outlineHoverColor);
			a.r += b.r;
			a.g += b.g;
			a.b += b.b;
			a.a = this.contents.paintOpacity;
			this.contents.outlineColor = ZinTween.GetColorCode(a);
		}
	};

	const _Window_prototype_updateTransform = Window.prototype.updateTransform;
	Window.prototype.updateTransform = function() {
		_Window_prototype_updateTransform.apply(this,arguments);

		if(this instanceof Window_Selectable &&
			 !(this instanceof Window_ShopNumber) &&
			  !(this instanceof Window_NameEdit) && this._index != -1){
			this.paint();
		}
		if(this._isDeselected){
			this.paint();
			this._isDeselected = false;
		}
	};

	// キャンセルで元に戻るとき、テキストカラー等を初期化する
	const _Window_Selectable_prototype_deselect = Window_Selectable.prototype.deselect;
	Window_Selectable.prototype.deselect = function() {
		_Window_Selectable_prototype_deselect.apply(this,arguments);
		this._isDeselected = true;
	};
	
})();