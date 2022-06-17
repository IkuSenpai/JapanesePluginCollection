//=============================================================================
// MPP_MessageEX.js
//=============================================================================
// Copyright (c) 2016 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Extend the text display function and add display effects.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 4.2.2]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ [Display text] control characters
 *   \SP[n]        # Text speed(characters per second / 0:Instant display)
 *   \AT[n]        # Change animation type to n(※1)
 *   \SET[n]       # Convert to the set string set(※2)
 *   \CO[S]        # Display character string S as one character
 *   \RB[S,R]      # Display character string S with ruby R(※3)
 *   \MX[n]        # Shift the next letter X coordinate by n pixels
 *   \MY[n]        # Shift the next letter Y coordinate by n pixels
 *   \PX[n]        # Change the X coordinate of the next character to n
 *   \PY[n]        # Change the Y coordinate of the next character to n
 *   \SW[n]        # Turn on switch n
 *   \SN[n]        # Replace with the name of skill ID n
 *   \SIN[n]       # Replace with icon and name of skill ID n
 *   \IN[n]        # Replace with the name of item ID n
 *   \IIN[n]       # Replace with the icon and name of item ID n
 *   \WN[n]        # Replace with the name of weapon ID n
 *   \WIN[n]       # Replace with icon and name of weapon ID n
 *   \AN[n]        # Replace with the name of armor ID n
 *   \AIN[n]       # Replace with icon and name of armor ID n
 *   \WE           # Wait until the event production is over(※4)
 *   \C[r,g,b]     # Specify the font color in RGB
 *   \FS[n]        # Change font size to n / Default:MV=28,MZ=26
 *   \FB           # Invert font bold flag
 *   \FI           # Invert font italic flag
 *   \OP[n]        # Character opacity(0～255) / Default:255
 *   \OC[n]        # Change the color of the character edge to n / 0:Default
 *   \OC[r,g,b]    # Specify the border color of characters in RGB
 *   \OC[r,g,b,a]  # Specify the border color of characters with RGBA(※5)
 *   \OW[n]        # Change the thickness of the character edge / Default:4
 *   \RC[n]        # Changed ruby color to n / 0:Default
 *   \RC[r,g,b]    # Specify ruby color in RGB
 *   \RC[r,g,b,a]  # Specify ruby color with RGBA(※5)
 *   \DF           # Return the text display setting to the default value(※6)
 *   \SV           # Memorize the current text display settings(※6)
 *   \LD           # Calling the settings memorized by \SV(※6)
 *
 *  - The following applies if it is included in the text
 *   \A            # Prohibition of skipping with enter key or shift key
 *   \ES           # Temporarily enable skipping event production(※7)
 *  
 *  - All control characters can be in either case
 * 
 * ▼ Control character details
 *  ※1: \AT[n] (Change animation type to n)
 *   - The default animation type is as follows.
 *       0: Default
 *       1: Letters emerge while sliding to the right
 *       2: Characters are displayed while spreading horizontally
 *       3: Characters are displayed while expanding
 *       4: Display characters from the left side(Text speed 6 recommended)
 *  
 *  ※2: \SET[n] (Convert to the set string set)
 *   - Converts to the character string specified by the plug-in parameter
 *     [Text Set].
 *   - Control characters can also be set.
 *  
 *  ※3: \RB[S,R] (Display character string S with ruby R)
 *   - Character strings with ruby characters are displayed together,
 *     not individually.
 * 
 *  ※4: \WE (Wait until the event production is over)
 *   - Wait until the production of the event set in the plug-in parameter
 *     [Wait Effects] is completed.
 *   - Even if you skip sentences, weight will be applied.
 * 
 *  ※5: \OC[r,g,b,a] (Specify the border color of characters with RGBA)
 *   - Specify the alpha value (a) from 0.0 to 1.0.
 * 
 *  ※6: \DF, \SV, \LD (Initialize / save / recall text display settings)
 *   - The following information is applicable.
 *       - Text speed
 *       - Anime type
 *       - Font color
 *       - Font size
 *       - Font bold flag
 *       - Font italic flag
 *       - Text opacity
 *       - Text outline color
 *       - Text outline width
 *       - Ruby color
 * 
 * 
 *  ※7: \ES (Temporarily enable skipping event production)
 *   - See the plugin command SetEffectSkip for details.
 * 
 * ▼ Plugin command details
 *  - In MV, the variable N is referred to by writing v [N] in the item for
 *    inputting a numerical value.
 *  - In MZ, in the item to enter a numerical value, select the text and
 *    write v [N] to refer to the variable N.
 *    
 *  〇 MV / MZ
 *  
 *  〇 SetMesRow row  / messageRow
 *       row : Number of lines in the message window
 *   - Change the number of lines displayed in the message window.
 *    
 *  〇 SetMesFadeOut type  / messageFadeOut
 *       type : Fade out type
 *   - Change the fade-out type.
 *   - The types to specify are as follows.
 *       0: Default
 *       1: Gradually disappear
 *       2: Scroll up
 * 
 *  〇 SetEffectSkip bool  / effectSkip
 *       bool : Enabled with true, disabled with false
 *   - When you skip a sentence, you can change whether to skip the production.
 *   - The default setting is invalid.
 *   - The effect to skip can be set in the plug-in parameter [Skip Effects].
 *   - The control character \ES is temporary, but it is always applied after
 *     the command is executed.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command messageRow
 *      @desc 
 *      @arg row
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 99
 *          @default 4
 * 
 *  @command messageFadeOut
 *      @desc 
 *      @arg type
 *          @desc 
 *          @type select
 *              @option 0:Default
 *                  @value 0
 *              @option 1:Gradually disappear
 *                  @value 1
 *              @option 2:Scroll up
 *                  @value 2
 *          @default 0
 * 
 *  @command effectSkip
 *      @desc 
 *      @arg boolean
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 * 
 *  @param -----Basic
 * 
 *  @param Text Set
 *      @desc An array of sets of strings to call with \SET
 * (From the top, \SET[1], \SET[2] ...)
 *      @type string[]
 *      @default []
 *      @parent -----Basic
 *
 *  @param Wait Effects
 *      @desc \WE Directing to wait for the end when executing
 *      @type struct<WaitEffects>
 *      @default {"Scroll Map":"true","Set Movement Route":"true","Show Animation":"true","Show Balloon Icon":"true","Move Picture":"true","Tint Picture":"true","Tint Screen":"true","Flash Screen":"true","Shake Screen":"false","Set Weather Effect":"false","Fadeout BGM":"false","Fadeout BGS":"false","Play ME":"false"}
 *      @parent -----Basic
 *
 *  @param Skip Effects
 *      @desc A production that skips sentences at the same time when skipping sentences
 *      @type struct<SkipEffects>
 *      @default {"Scroll Map":"true","Set Movement Route":"true","Move Picture":"true","Tint Picture":"true","Tint Screen":"false","Flash Screen":"false","Shake Screen":"false","Set Weather Effect":"false"}
 *      @parent -----Basic
 *
 *  @param Skip Effects Timing
 *      @desc 
 *      @type select
 *          @option skip
 *          @option end of text
 *      @default skip
 *      @parent Skip Effects
 *
 *  @param Ruby Oy
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 0
 *      @parent -----Basic
 * 
 *  @param Always Leave Ruby Height
 *      @desc 
 *      @type boolean
 *      @default false
 *      @parent -----Basic
 *
 *  @param -----Default
 * 
 *  @param Default Anime Type
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 1
 *      @parent -----Default
 *
 *  @param Default Message Row
 *      @desc 
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 4
 *      @parent -----Default
 *
 *  @param Default FadeOut Type
 *      @desc 
 *      @type select
 *          @option 0:Default
 *              @value 0
 *          @option 1:Gradually disappear
 *              @value 1
 *          @option 2:Scroll up
 *              @value 2
 *      @default 0
 *      @parent -----Default
 *
 *  @param Default FadeOut Speed
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 5
 *      @parent -----Default
 *
 *  @param Default Text Speed
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 60
 *      @parent -----Default
 *
 *  @param Default Ruby Color
 *      @desc 
 *      @default 255,255,255
 *      @parent -----Default
 *
 *  @param Default Ruby Size
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 999
 *      @default 14
 *      @parent -----Default
 *
 *  @param Default Ruby Outline
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 99
 *      @default 2
 *      @parent -----Default
 *
 */

/*~struct~WaitEffects:
 *  @param Scroll Map
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Set Movement Route
 *      @desc Excludes [Repeat operation]
 *      @type boolean
 *      @default true
 *
 *  @param Show Animation
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Show Balloon Icon
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Move Picture
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Picture
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Screen
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Flash Screen
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Shake Screen
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Set Weather Effect
 *      @desc 
 *      @type boolean
 *      @default false
 * 
 *  @param Fadeout BGM
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Fadeout BGS
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Play ME
 *      @desc 
 *      @type boolean
 *      @default false
 *
 */

/*~struct~SkipEffects:
 *  @param Scroll Map
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Set Movement Route
 *      @desc Excludes [Repeat operation]
 *      @type boolean
 *      @default true
 *
 *  @param Move Picture
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Picture
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Screen
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Flash Screen
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Shake Screen
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Set Weather Effect
 *      @desc 
 *      @type boolean
 *      @default false
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 文章表示の機能を拡張したり表示の演出を追加します。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 4.2.2]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ [文章の表示]の制御文字
 *   \SP[n]        # 文章の表示速度(秒間描写文字数n / 0:瞬間表示)
 *   \AT[n]        # アニメーションタイプをn番に変更(※1)
 *   \SET[n]       # 設定した文字列に変換(※2)
 *   \CO[S]        # 文字列Sを１文字として表示
 *   \RB[S,R]      # 文字列SにルビRを付けて表示(※3)
 *   \MX[n]        # 次に表示する文字のX座標をnピクセルずらす
 *   \MY[n]        # 次に表示する文字のY座標をnピクセルずらす
 *   \PX[n]        # 次に表示する文字のX座標をnに変更
 *   \PY[n]        # 次に表示する文字のY座標をnに変更
 *   \SW[n]        # スイッチn番をONにする
 *   \SN[n]        # スキルID n 番の名前に置き換える
 *   \SIN[n]       # スキルID n 番のアイコンと名前に置き換える
 *   \IN[n]        # アイテムID n 番の名前に置き換える
 *   \IIN[n]       # アイテムID n 番のアイコンと名前に置き換える
 *   \WN[n]        # 武器ID n 番の名前に置き換える
 *   \WIN[n]       # 武器ID n 番のアイコンと名前に置き換える
 *   \AN[n]        # 防具ID n 番の名前に置き換える
 *   \AIN[n]       # 防具ID n 番のアイコンと名前に置き換える
 *   \WE           # イベントの演出が終了するまでウェイト(※4)
 *   \C[r,g,b]     # 文字色をRGBで指定
 *   \FS[n]        # 文字サイズをnに変更 / デフォルト値:MV=28,MZ=26
 *   \FB           # 文字の太字フラグを反転
 *   \FI           # 文字の斜体フラグを反転
 *   \OP[n]        # 文字の不透明度(0～255) / デフォルト値:255
 *   \OC[n]        # 文字の縁の色をn番に変更 / 0:デフォルト(黒)
 *   \OC[r,g,b]    # 文字の縁の色をRGBで指定
 *   \OC[r,g,b,a]  # 文字の縁の色をRGBAで指定(※5)
 *   \OW[n]        # 文字の縁の太さを変更 / デフォルト値:4
 *   \RC[n]        # ルビの色をn番に変更 / 0:デフォルト
 *   \RC[r,g,b]    # ルビの色をRGBで指定
 *   \RC[r,g,b,a]  # ルビの色をRGBAで指定(※5)
 *   \DF           # 文章表示の設定をデフォルト値に戻す(※6)
 *   \SV           # 現在の文章表示の設定を記憶(※6)
 *   \LD           # \SVで記憶した設定の呼び出し(※6)
 *
 *  - 以下は文章内に含まれていた場合に適用
 *   \A            # 決定キーやシフトキーによるスキップの禁止
 *   \ES           # イベントの演出のスキップを一時的に有効にする(※7)
 *  
 *  - すべての制御文字は大文字小文字どちらでも可能
 * 
 * ▼ 制御文字詳細
 *  ※1: \AT[n] (アニメーションタイプをn番に変更)
 *   - アニメーションタイプのデフォルトは以下のようになります。
 *       0: デフォルト
 *       1: 文字が右にスライドしながら浮かび上がる
 *       2: 文字が横に広がりながら表示される
 *       3: 文字が拡大しながら表示される
 *       4: 文字を左側から表示する(表示速度6推奨)
 *  
 *  ※2: \SET[n] (設定した文字列に変換)
 *   - プラグインパラメータ[Text Set]で指定した文字列に変換します。
 *   - 制御文字も設定可能です。
 *  
 *  ※3: \RB[S,R] (文字列SにルビRを付けて表示)
 *   - ルビを振った文字列は一文字ずつではなくまとめて表示されます。
 * 
 *  ※4: \WE (演出が終了するまでウェイト)
 *   - プラグインパラメータ[Wait Effects]で設定したイベントの演出が終了するまで
 *     ウェイトを行います。
 *   - 文章のスキップを行ってもウェイトがかかります。
 * 
 *  ※5: \OC[r,g,b,a] (文字の縁の色をRGBAで指定)
 *   - アルファ値(a)は0.0～1.0で指定してください。
 * 
 *  ※6: \DF, \SV, \LD (文章表示の設定を初期化/保存/呼び出し)
 *   - 以下の情報が対象となります。
 *       - 文章の表示速度
 *       - アニメーションタイプ
 *       - 文字色
 *       - 文字サイズ
 *       - 文字の太字フラグ
 *       - 文字の斜体フラグ
 *       - 文字の不透明度
 *       - 文字の縁の色
 *       - 文字の縁の太さ
 *       - ルビの色
 * 
 *  ※7: \ES (イベントの演出のスキップを一時的に有効にする)
 *   - 詳細はプラグインコマンドの SetEffectSkip を参照。
 * 
 * ▼ プラグインコマンド詳細
 *  - MVでは数値を入力する項目で v[N] と記述することで変数N番を参照します。
 *  - MZでは数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *    
 *  〇 MV / MZ
 *  
 *  〇 SetMesRow row  / メッセージ行数設定
 *       row : メッセージウィンドウの行数
 *   - メッセージウィンドウの表示行数をn行に変更します。
 *    
 *  〇 SetMesFadeOut type  / メッセージフェードアウト
 *       type : フェードアウトのタイプ
 *   - フェードアウトのタイプを変更します。
 *   - 指定するタイプは以下の通りです。
 *       0: デフォルト
 *       1: 徐々に消える
 *       2: 上にスクロール
 * 
 *  〇 SetEffectSkip bool  / 演出スキップ
 *       bool : trueで有効, falseで無効
 *   - 文章のスキップを行った際、演出のスキップをするかどうかを変更できます。
 *   - 初期設定は無効です。
 *   - スキップする演出はプラグインパラメータ[Skip Effects]にて設定できます。
 *   - 制御文字 \ES は一時的なものですが、こちらはコマンド実行後、常に適用されます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command messageRow
 *      @text メッセージ行数設定
 *      @desc 
 *      @arg row
 *          @desc 
 *          @type number
 *              @min 1
 *              @max 99
 *          @default 4
 * 
 *  @command messageFadeOut
 *      @text メッセージフェードアウト
 *      @desc 
 *      @arg type
 *          @desc 
 *          @type select
 *              @option 0:なし(瞬時に消える)
 *                  @value 0
 *              @option 1:徐々に消える
 *                  @value 1
 *              @option 2:上にスクロール
 *                  @value 2
 *          @default 0
 * 
 *  @command effectSkip
 *      @text 演出スキップ
 *      @desc 
 *      @arg boolean
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 * 
 *  @param -----Basic
 * 
 *  @param Text Set
 *      @text 文字列セット
 *      @desc \SETにて呼び出す文字列のセットの配列
 * (上から \SET[1],\SET[2]... となります)
 *      @type string[]
 *      @default []
 *      @parent -----Basic
 *
 *  @param Wait Effects
 *      @text 終了待ちする演出
 *      @desc \WE実行時に終了待ちをする演出
 *      @type struct<WaitEffects>
 *      @default {"Scroll Map":"true","Set Movement Route":"true","Show Animation":"true","Show Balloon Icon":"true","Move Picture":"true","Tint Picture":"true","Tint Screen":"true","Flash Screen":"true","Shake Screen":"false","Set Weather Effect":"false","Fadeout BGM":"false","Fadeout BGS":"false","Play ME":"false"}
 *      @parent -----Basic
 *
 *  @param Skip Effects
 *      @text スキップする演出
 *      @desc 文章のスキップをした際、同時にスキップを行う演出
 *      @type struct<SkipEffects>
 *      @default {"Scroll Map":"true","Set Movement Route":"true","Move Picture":"true","Tint Picture":"true","Tint Screen":"false","Flash Screen":"false","Shake Screen":"false","Set Weather Effect":"false"}
 *      @parent -----Basic
 *
 *  @param Skip Effects Timing
 *      @text 演出スキップのタイミング
 *      @desc 
 *      @type select
 *          @option スキップ時
 *              @value skip
 *          @option 文章の表示終了時
 *              @value end of text
 *      @default skip
 *      @parent Skip Effects
 *
 *  @param Ruby Oy
 *      @text ルビY軸補正値
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 0
 *      @parent -----Basic
 * 
 *  @param Always Leave Ruby Height
 *      @text 常にルビの高さを空ける
 *      @desc 
 *      @type boolean
 *      @default false
 *      @parent -----Basic
 *
 *  @param -----Default
 * 
 *  @param Default Anime Type
 *      @text アニメーションタイプ
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 1
 *      @parent -----Default
 *
 *  @param Default Message Row
 *      @text メッセージ行数
 *      @desc [メッセージウィンドウの表示行数]のデフォルト値
 *      @type number
 *          @min 1
 *          @max 99
 *      @default 4
 *      @parent -----Default
 *
 *  @param Default FadeOut Type
 *      @text フェードアウトタイプ
 *      @desc 
 *      @type select
 *          @option 0:なし(瞬時に消える)
 *              @value 0
 *          @option 1:徐々に消える
 *              @value 1
 *          @option 2:上にスクロール
 *              @value 2
 *      @default 0
 *      @parent -----Default
 *
 *  @param Default FadeOut Speed
 *      @text フェードアウト速度
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 5
 *      @parent -----Default
 *
 *  @param Default Text Speed
 *      @text 文章の表示速度
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 999
 *      @default 60
 *      @parent -----Default
 *
 *  @param Default Ruby Color
 *      @text ルビの色
 *      @desc 
 *      @default 255,255,255
 *      @parent -----Default
 *
 *  @param Default Ruby Size
 *      @text ルビの文字サイズ
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 99
 *      @default 14
 *      @parent -----Default
 *
 *  @param Default Ruby Outline
 *      @text ルビの縁の太さ
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 99
 *      @default 2
 *      @parent -----Default
 *
 */

/*~struct~WaitEffects:ja
 *  @param Scroll Map
 *      @text マップのスクロール
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Set Movement Route
 *      @text 移動ルートの設定
 *      @desc [動作を繰り返す]は除く
 *      @type boolean
 *      @default true
 *
 *  @param Show Animation
 *      @text アニメーションの表示
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Show Balloon Icon
 *      @text フキダシアイコンの表示
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Move Picture
 *      @text ピクチャの移動
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Picture
 *      @text ピクチャの色調変更
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Screen
 *      @text 画面の色調変更
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Flash Screen
 *      @text 画面のフラッシュ
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Shake Screen
 *      @text 画面のシェイク
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Set Weather Effect
 *      @text 天候の設定
 *      @desc 
 *      @type boolean
 *      @default false
 * 
 *  @param Fadeout BGM
 *      @text BGMのフェードアウト
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Fadeout BGS
 *      @text BGSのフェードアウト
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Play ME
 *      @text MEの演奏
 *      @desc 
 *      @type boolean
 *      @default false
 *
 */

/*~struct~SkipEffects:ja
 *  @param Scroll Map
 *      @text マップのスクロール
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Set Movement Route
 *      @text 移動ルートの設定
 *      @desc [動作を繰り返す]は除く
 *      @type boolean
 *      @default true
 *
 *  @param Move Picture
 *      @text ピクチャの移動
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Picture
 *      @text ピクチャの色調変更
 *      @desc 
 *      @type boolean
 *      @default true
 *
 *  @param Tint Screen
 *      @text 画面の色調変更
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Flash Screen
 *      @text 画面のフラッシュ
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Shake Screen
 *      @text 画面のシェイク
 *      @desc 
 *      @type boolean
 *      @default false
 *
 *  @param Set Weather Effect
 *      @text 天候の設定
 *      @desc 
 *      @type boolean
 *      @default false
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_MessageEX';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    // -----Basic
    const param_TextSet = JSON.parse(parameters['Text Set'] || '[]');
    const param_WaitEffects = JSON.parse(parameters['Wait Effects'] || '{}', paramReplace);
    const param_SkipEffects = JSON.parse(parameters['Skip Effects'] || '{}', paramReplace);
    const param_SkipEffectsTiming = parameters['Skip Effects Timing'] || 'skip';
    const param_RubyOy = Number(parameters['Ruby Oy'] || 0);
    const param_AlwaysLeaveRubyHeight = parameters['Always Leave Ruby Height'] === 'true';
    // -----Default
    const param_DefaultMessageRow = Number(parameters['Default Message Row']);
    const param_DefaultFadeOutType = Number(parameters['Default FadeOut Type']);
    const param_DefaultFadeOutSpeed = Number(parameters['Default FadeOut Speed']);
    const param_DefaultTextSpeed = Number(parameters['Default Text Speed']);
    const param_DefaultAnimeType = Number(parameters['Default Anime Type']);
    const param_DefaultRubyColor = `rgb(${parameters['Default Ruby Color'] || '255,255,255'})`;
    const param_DefaultRubySize = Number(parameters['Default Ruby Size'] || 14);
    const param_DefaultRubyOutline = Number(parameters['Default Ruby Outline']);
    
    // Dealing with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };
    const _importedPlugin = (...names) => {
        return names.some(name => PluginManager._scripts.includes(name));
    };
    
    // MPP_Patch.js
    let param_Patch6 = false;
    if (_importedPlugin('MPP_Patch')) {
        const patchParameters = PluginManager.parameters('MPP_Patch');
        param_Patch6 = patchParameters['Patch6 enabled?'] === 'true';
    }
    
    // MathExt
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        return { clamp };
    })();

    // RPG Maker Param
    const _textColor = function(index) {
        return Utils.RPGMAKER_NAME === 'MV'
            ? this.textColor(index)
            : ColorManager.textColor(index);
    };
    
    //-----------------------------------------------------------------------------
    // Bitmap
    
    if (!Bitmap.prototype.destroy) {
        
        Bitmap.prototype.destroy = function() {
            if (this._baseTexture) {
                this._baseTexture.destroy();
                this.__baseTexture = null;
            }
            this._destroyCanvas();
        };
        
        Bitmap.prototype._destroyCanvas = function() {
            if (this._canvas) {
                this._canvas.width = 0;
                this._canvas.height = 0;
                this.__canvas = null;
            }
        };
        
    }

    //-------------------------------------------------------------------------
    // WebAudio

    WebAudio.prototype.realVolume = function() {
        return this._gainNode ? this._gainNode.gain.value : 0;
    };

    //-------------------------------------------------------------------------
    // Html5Audio

    if (Utils.RPGMAKER_NAME === 'MV') {
        
        Html5Audio.realVolume = function() {
            return this._audioElement ? this._audioElement.volume : 0;
        };
        
    }

    //-------------------------------------------------------------------------
    // AudioManager

    AudioManager.isBgmFadeOuting = function() {
        return (
            this._bgmBuffer &&
            !this._currentBgm &&
            this._bgmBuffer.realVolume() > 0
        );
    };

    AudioManager.isBgsFadeOuting = function() {
        return (
            this._bgsBuffer &&
            !this._currentBgs &&
            this._bgsBuffer.realVolume() > 0
        );
    };

    AudioManager.isMePlaying = function() {
        return this._meBuffer && this._meBuffer.isPlaying();
    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager._commands = PluginManager._commands || {};
    
    if (!PluginManager.registerCommand) {
        PluginManager.registerCommand = function(pluginName, commandName, func) {
            const key = pluginName + ":" + commandName;
            this._commands[key] = func;
        };
    }

    if (!PluginManager.callCommand) {
        PluginManager.callCommand = function(self, pluginName, commandName, args) {
            const key = pluginName + ":" + commandName;
            const func = this._commands[key];
            if (typeof func === "function") {
                func.bind(self)(args);
            }
        };
    }

    PluginManager.registerCommand(pluginName, 'messageRow', args => {
        $gameMessage.setMessageRow(PluginManager.mppValue(args.row));
    });

    PluginManager.registerCommand(pluginName, 'messageFadeOut', args => {
        $gameMessage.setFadeOutType(PluginManager.mppValue(args.type));
    });

    PluginManager.registerCommand(pluginName, 'effectSkip', args => {
        $gameMessage.setEffectSkip(args.boolean === 'true');
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    //-----------------------------------------------------------------------------
    // Game_Character

    Game_Character.prototype.isMoveRouteForcingNr = function() {
        return this.isMoveRouteForcing() && !this._moveRoute.repeat;
    };

    //-------------------------------------------------------------------------
    // Game_Map

    Game_Map.prototype.isAnyMoveRouteForcingNr = function() {
        return (
            this.events().some(e => e.isMoveRouteForcingNr()) ||
            $gamePlayer.isMoveRouteForcingNr()
        );
    };

    Game_Map.prototype.isAnyAnimationPlaying = function() {
        return (
            this.events().some(e => e.isAnimationPlaying()) ||
            $gamePlayer.isAnimationPlaying()
        );
    };

    Game_Map.prototype.isAnyBalloonPlaying = function() {
        return (
            this.events().some(e => e.isBalloonPlaying()) ||
            $gamePlayer.isBalloonPlaying()
        );
    };

    //-------------------------------------------------------------------------
    // Game_Screen

    Game_Screen.prototype.isAnyPictureMoving = function() {
        return this._pictures.some(p => p && p.isMoving());
    };

    Game_Screen.prototype.isAnyPictureTinting = function() {
        return this._pictures.some(p => p && p.isTinting());
    };

    Game_Screen.prototype.isTinting = function() {
        return this._toneDuration > 0;
    };

    Game_Screen.prototype.isFlashing = function() {
        return this._flashDuration > 0;
    };

    Game_Screen.prototype.isShaking = function() {
        return this._shakeDuration > 0;
    };

    Game_Screen.prototype.isWeatherChanging = function() {
        return this._weatherDuration > 0;
    };

    //-------------------------------------------------------------------------
    // Game_Picture

    Game_Picture.prototype.isMoving = function() {
        return this._duration > 0;
    };

    Game_Picture.prototype.isTinting = function() {
        return this._toneDuration > 0;
    };

    //-------------------------------------------------------------------------
    // Game_Message

    const _Game_Message_initialize = Game_Message.prototype.initialize;
    Game_Message.prototype.initialize = function() {
        _Game_Message_initialize.apply(this, arguments);
        this._messageRow = param_DefaultMessageRow;
        this._fadeOutType = param_DefaultFadeOutType;
        this._effectSkip = false;
    };

    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.apply(this, arguments);
        this._sceneEffectSkip = false;
    };

    Game_Message.prototype.clearSceneEffectSkip = function() {
        this._sceneEffectSkip = false;
    };

    Game_Message.prototype.requestSceneEffectSkip = function() {
        this._sceneEffectSkip = true;
    };

    Game_Message.prototype.messageRow = function() {
        return this._messageRow;
    };

    Game_Message.prototype.fadeOutType = function() {
        return this._fadeOutType;
    };

    Game_Message.prototype.effectSkip = function() {
        return this._effectSkip;
    };

    Game_Message.prototype.sceneEffectSkip = function() {
        return this._sceneEffectSkip;
    };

    Game_Message.prototype.setMessageRow = function(row) {
        this._messageRow = row;
    };

    Game_Message.prototype.setFadeOutType = function(type) {
        this._fadeOutType = type;
    };

    Game_Message.prototype.setEffectSkip = function(skip) {
        this._effectSkip = skip;
    };

    const _Game_Message_isBusy = Game_Message.prototype.isBusy;
    Game_Message.prototype.isBusy = function() {
        return (
            _Game_Message_isBusy.apply(this, arguments) ||
            this._sceneEffectSkip
        );
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter

    const _mzCommands = {
        SetMesRow: { name:'messageRow', keys:['row'] },
        SetMesFadeOut: { name:'messageFadeOut', keys:['type'] },
        SetEffectSkip: { name:'effectSkip', keys:['boolean'] }
    };
    Object.assign(_mzCommands, {
        'メッセージ行数設定': _mzCommands.SetMesRow,
        'メッセージフェードアウト': _mzCommands.SetMesFadeOut,
        '演出スキップ': _mzCommands.SetEffectSkip
    });

    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        const params = _mzCommands[command];
        if (params) {
            const args2 = Object.assign(...params.keys.map((k,i) => ({[k]:args[i]})));
            PluginManager.callCommand(this, pluginName, params.name, args2);
        }
    };
    
    //-------------------------------------------------------------------------
    // Sprite_TextCharacter

    function Sprite_TextCharacter() {
        this.initialize.apply(this, arguments);
    }

    Sprite_TextCharacter.prototype = Object.create(Sprite.prototype);
    Sprite_TextCharacter.prototype.constructor = Sprite_TextCharacter;

    Sprite_TextCharacter.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this._rect = null;
        this._list = null;
        this._index = -1;
        this._waitCount = 0;
    };

    Sprite_TextCharacter.prototype.setCallback = function(callback) {
        this._drawCallback = callback;
    };

    Sprite_TextCharacter.prototype.setup = function(bitmap, rect, list) {
        this.bitmap = bitmap;
        this._rect = rect;
        this._list = list;
        this._index = 0;
        this._waitCount = 0;
        this.initBasic();
        this.initMove();
        this.initScale();
        this.initOpacity();
        this.initTone();
        this.initRotation();
        this.initFrame();
        this.x = rect.x;
        this.y = rect.y;
        this.scale.x = 1.0;
        this.scale.y = 1.0;
        this.opacity = 255;
        this.anchor.x = 0;
        this.anchor.y = 0;
        this.setColorTone([0, 0, 0, 0]);
        this.rotation = 0;
        this.update();
    };

    Sprite_TextCharacter.prototype.initBasic = function() {
        this._origin = 0;
        this._offsetX = 0;
        this._offsetY = 0;
    };

    Sprite_TextCharacter.prototype.initMove = function() {
        this._targetX = 0;
        this._targetY = 0;
        this._moveDuration = 0;
    };

    Sprite_TextCharacter.prototype.initScale = function() {
        this._targetScaleX = 1;
        this._targetScaleY = 1;
        this._scaleDuration = 0;
    };

    Sprite_TextCharacter.prototype.initOpacity = function() {
        this._targetOpacity = 255;
        this._opacityDuration = 0;
    };

    Sprite_TextCharacter.prototype.initTone = function() {
        this._tone = null;
        this._toneTarget = null;
        this._toneDuration = 0;
    };

    Sprite_TextCharacter.prototype.initRotation = function() {
        this._angle = 0;
        this._targetAngle = 0;
        this._angleDuration = 0;
    };

    Sprite_TextCharacter.prototype.initFrame = function() {
        const bitmap = this._bitmap;
        if (bitmap) {
            this.setFrame(0, 0, bitmap.width, bitmap.height);
        } else {
            this.setFrame(0, 0, 0, 0);
        }
        this._frame2 = null;
        this._frame2Target = null;
        this._frame2Duration = 0;
    };

    Sprite_TextCharacter.prototype.isPlaying = function() {
        return !!this._list;
    };

    Sprite_TextCharacter.prototype.isEffecting = function() {
        return (
            this._moveDuration > 0 ||
            this._scaleDuration > 0 ||
            this._opacityDuration > 0 ||
            this._toneDuration > 0 ||
            this._angleDuration > 0 ||
            this._frame2Duration > 0
        );
    };

    Sprite_TextCharacter.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (this.isPlaying() && this.updateCommand()) {
            this.updateMove();
            this.updateScale();
            this.updateOpacity();
            this.updateTone();
            this.updateRotation();
            this.updateFrame2();
        }
    };

    Sprite_TextCharacter.prototype.updateCommand = function() {
        for (;;) {
            if (this.updateWaitCount()) {
                return true;
            }
            const code = this._list[this._index];
            if (code) {
                const [command, ...args] = code.split(' ');
                this.callMethod(command, args.map(Number));
            } else {
                this.draw();
                return false;
            }
            this._index++;
        }
    };

    Sprite_TextCharacter.prototype.updateWaitCount = function() {
        if (this._waitCount < 0) {
            if (this.isEffecting()) return true;
            this._waitCount = 0;
        } else if (this._waitCount > 0) {
            this._waitCount--;
            return true;
        }
        return false;
    };

    Sprite_TextCharacter.prototype.callMethod = function(command, args) {
        switch (command) {
            case 'show':
                this.commandShow(args);
                break;
            case 'move':
                this.commandMove(args);
                break;
            case 'scale':
                this.commandScale(args);
                break;
            case 'opacity':
                this.commandOpacity(args);
                break;
            case 'rotate':
                this.commandRotate(args);
                break;
            case 'tone':
                this.commandTone(args);
                break;
            case 'frame':
                this.commandFrame(args);
                break;
            case 'wait':
                this.commandWait(args);
                break;
            case 'finish':
                this.commandFinish(args);
                break;
        }
    };

    Sprite_TextCharacter.prototype.updateMove = function() {
        if (this._moveDuration > 0) {
            const d = this._moveDuration;
            this._offsetX = (this._offsetX * (d - 1) + this._targetX) / d;
            this._offsetY = (this._offsetY * (d - 1) + this._targetY) / d;
            this._moveDuration--;
        }
        this.x = this._rect.x + this._offsetX;
        this.y = this._rect.y + this._offsetY;
        if (this._origin === 1) {
            this.x += this._rect.width / 2;
            this.y += this._rect.height / 2;
        }
        this.refreshAnchor();
    };

    Sprite_TextCharacter.prototype.updateScale = function() {
        if (this._scaleDuration > 0) {
            const d = this._scaleDuration;
            this.scale.x = (this.scale.x * (d - 1) + this._targetScaleX) / d;
            this.scale.y = (this.scale.y * (d - 1) + this._targetScaleY) / d;
            this._scaleDuration--;
        }
    };

    Sprite_TextCharacter.prototype.updateOpacity = function() {
        if (this._opacityDuration > 0) {
            const d = this._opacityDuration;
            this.opacity = (this.opacity * (d - 1) + this._targetOpacity) / d;
            this._opacityDuration--;
        }
    };

    Sprite_TextCharacter.prototype.updateTone = function() {
        if (this._toneDuration > 0) {
            const d = this._toneDuration;
            for (const [i, target] of this._toneTarget.entries()) {
                this._tone[i] = (this._tone[i] * (d - 1) + target) / d;
            }
            this._toneDuration--;
        }
        if (this._tone) this.setColorTone(this._tone);
    };

    Sprite_TextCharacter.prototype.updateRotation = function() {
        if (this._angleDuration > 0) {
            const d = this._angleDuration;
            this._angle = (this._angle * (d - 1) + this._targetAngle) / d;
            this._angleDuration--;
        }
        this.rotation = this._angle * Math.PI / 180;
    };

    Sprite_TextCharacter.prototype.updateFrame2 = function() {
        if (this._frame2Duration > 0) {
            const d = this._frame2Duration;
            for (const [i, target] of this._frame2Target.entries()) {
                this._frame2[i] = (this._frame2[i] * (d - 1) + target) / d;
            }
            this._frame2Duration--;
            this.refreshFrame2();
            this.refreshAnchor();
        }
    };

    Sprite_TextCharacter.prototype.refreshFrame2 = function() {
        const { width, height } = this.bitmap;
        const frame = this._frame2;
        const fx = Math.round(width * frame[0] / 100);
        const fy = Math.round(height * frame[1] / 100);
        const fw = Math.max(Math.round(width * frame[2] / 100) - fx, 0);
        const fh = Math.max(Math.round(height * frame[3] / 100) - fy, 0);
        this.setFrame(fx, fy, fw, fh);
    };

    Sprite_TextCharacter.prototype.refreshAnchor = function() {
        const ox = (this._origin === 0 ? 0 : this._rect.width / 2) + 4;
        const oy = this._origin === 0 ? 0 : this._rect.height / 2;
        this.anchor.x = this.width > 0 ? ox / this.width : 0;
        this.anchor.y = this.height > 0 ? oy / this.height : 0;
    };

    Sprite_TextCharacter.prototype.draw = function() {
        if (this._drawCallback) {
            this._drawCallback(this.bitmap, this._rect);
        }
        this.delete();
    };

    Sprite_TextCharacter.prototype.delete = function() {
        this.parent.removeChild(this);
        this.bitmap.destroy();
        this.bitmap = null;
        this._list = null;
    };

    Sprite_TextCharacter.prototype.commandShow = function(args) {
        this._origin = MathExt.clamp(args[0] || 0, 0, 1);
        this._offsetX = args[1] || 0;
        this._offsetY = args[2] || 0;
        this.scale.x = args.length > 3 ? args[3] / 100 : 1;
        this.scale.y = args.length > 4 ? args[4] / 100 : 1;
        this.opacity = args.length > 5 ? args[5] : 255;
        this.initMove();
        this.initScale();
        this.initOpacity();
        this.initTone();
        this.initRotation();
        this.initFrame();
    };

    Sprite_TextCharacter.prototype.commandMove = function(args) {
        this._targetX = args[0] || 0;
        this._targetY = args[1] || 0;
        this._moveDuration = Math.max(args[2] || 0, 0);
        if (this._moveDuration === 0) {
            this._offsetX = this._targetX;
            this._offsetY = this._targetY;
        }
    };

    Sprite_TextCharacter.prototype.commandScale = function(args) {
        this._targetScaleX = args.length > 0 ? args[0] / 100 : 1;
        this._targetScaleY = args.length > 0 ? args[1] / 100 : 1;
        this._scaleDuration = Math.max(args[2] || 0, 0);
        if (this._scaleDuration === 0) {
            this.scale.x  = this._targetScaleX;
            this.scale.y  = this._targetScaleY;
        }
    };

    Sprite_TextCharacter.prototype.commandOpacity = function(args) {
        this._targetOpacity = args.length > 0 ? MathExt.clamp(args[0], 0, 255) : 255;
        this._opacityDuration = Math.max(args[1] || 0, 0);
        if (this._opacityDuration === 0) {
            this.opacity  = this._targetOpacity;
        }
    };

    Sprite_TextCharacter.prototype.commandRotate = function(args) {
        this._targetAngle = args[0] || 0;
        this._angleDuration = Math.max(args[1] || 0, 0);
        if (this._angleDuration === 0) {
            this._angle = this._targetAngle;
        }
    };

    Sprite_TextCharacter.prototype.commandTone = function(args) {
        if (!this._tone) this._tone = [0, 0, 0, 0];
        this._toneTarget = [];
        for (let i = 0; i < 4; i++) {
            this._toneTarget[i] = MathExt.clamp(args[i] || 0, -255, 255);
        }
        this._toneDuration = Math.max(args[4] || 0, 0);
        if (this._toneDuration === 0) {
            this._tone = this._toneTarget.clone();
            this.setColorTone(this._tone);
        }
    };

    Sprite_TextCharacter.prototype.commandFrame = function(args) {
        if (!this._frame2) this._frame2 = [0, 0, 100, 100];
        this._frame2Target = [];
        this._frame2Target[0] = args.length > 0 ? MathExt.clamp(args[0], 0, 100) : 0;
        this._frame2Target[1] = args.length > 1 ? MathExt.clamp(args[1], 0, 100) : 0;
        this._frame2Target[2] = args.length > 2 ? MathExt.clamp(args[2], 0, 100) : 100;
        this._frame2Target[3] = args.length > 3 ? MathExt.clamp(args[3], 0, 100) : 100;
        this._frame2Duration = Math.max(args[4] || 0, 0);
        if (this._frame2Duration === 0) {
            this._frame2 = this._frame2Target.clone();
            this.refreshFrame2();
        }
    };

    Sprite_TextCharacter.prototype.commandWait = function(args) {
        this._waitCount = args.length > 0 ? Math.max(args[0], 0) : -1;
    };

    Sprite_TextCharacter.prototype.commandFinish = function(args) {
        const count = Math.max(args[0] || 0, 0);
        this.commandMove([0, 0, count]);
        this.commandScale([100, 100, count]);
        this.commandOpacity([255, count]);
        this.commandRotate([0, count]);
        this.commandTone([0, 0, 0, 0, count]);
        this.commandFrame([0, 0, 100, 100, count]);
        this.commandWait([count]);
    };

    //-----------------------------------------------------------------------------
    // Window_Base

    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        return _Window_Base_convertEscapeCharacters.apply(this, arguments)
            .replace(/\x1bSET\[(\d+)\]/gi, (_, p1) => {
                const index = Number(p1 || 0);
                const setText = index > 0 ? param_TextSet[index - 1] : null;
                return setText ? this.convertEscapeCharacters(setText) : '';
            })
            .replace(/\x1b([SIWA])(I?)N\[(\d+)\]/gi, (_, p1, p2, p3) => {
                return this.mppConvertItemName(p1, p2 !== '', +p3);
            });
    };

    Window_Base.prototype.mppConvertItemName = function(type, icon, itemId) {
        let text = '';
        let item;
        switch (type.toUpperCase()) {
            case 'S':
                item = $dataSkills[itemId];
                break;
            case 'I':
                item = $dataItems[itemId];
                break;
            case 'W':
                item = $dataWeapons[itemId];
                break;
            case 'A':
                item = $dataArmors[itemId];
                break;
        }
        if (item) {
            if (icon) text += `\x1bI[${item.iconIndex}]`;
            text += item.name;
        }
        return text;
    };

    //-------------------------------------------------------------------------
    // Window_Message
    
    Window_Message.ANIMATIONS = [
        null,
        [ // type 1
            'show 0 -6 0 100 100 0',
            'finish 15'
        ],
        [ // type 2
            'show 0 0 0 0 100',
            'scale 75 100 6',
            'wait',
            'finish 6'
        ],
        [ // type 3
            'show 1 0 0 0 0',
            'scale 60 60 7',
            'wait',
            'scale 100 100 7',
            'wait',
            'scale 120 120 8',
            'wait',
            'finish 8'
        ],
        [ // type 4
            'show',
            'frame 0 0 0 100 0',
            'finish 10'
        ],
    ];
    
    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function() {
        this._messageRow = $gameMessage.messageRow();
        this._textInfo = [];
        this._rubyBitmap = new Bitmap();
        _Window_Message_initialize.apply(this, arguments);
        this.createCharacterContainer();
        this._characterSprites = [];
        this._waitEffect = false;
    };

    const _Window_Message_destroy = __base(Window_Message.prototype, 'destroy');
    Window_Message.prototype.destroy = function(options) {
        this._rubyBitmap.destroy();
        _Window_Message_destroy.apply(this, arguments);
    };

    Window_Message.prototype.createCharacterContainer = function() {
        if (Utils.RPGMAKER_NAME === 'MV') {
            this._characterContainer = new Sprite();
            this.addChild(this._characterContainer);
            this.updateCharacterContainer();
        }
    };

    const _Window_Message_fittingHeight = __base(Window_Message.prototype, 'fittingHeight');
    Window_Message.prototype.fittingHeight = function(numLines) {
        let height = _Window_Message_fittingHeight.apply(this, arguments);
        if (param_AlwaysLeaveRubyHeight) {
            height += numLines * (param_DefaultRubySize - param_RubyOy);
        }
        return height;
    };

    const _Window_Message_resetFontSettings = __base(Window_Message.prototype, 'resetFontSettings');
    Window_Message.prototype.resetFontSettings = function() {
        _Window_Message_resetFontSettings.apply(this, arguments);
        this.contents.fontBold = false;
        this.contents.fontItalic = false;
        this.contents.paintOpacity = 255;
        this._paintOpacity = 255;
        this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
        this.contents.outlineWidth = 4;
        this._rubyBitmap.textColor = param_DefaultRubyColor;
        this._rubyBitmap.fontSize = param_DefaultRubySize;
        this._rubyBitmap.outlineWidth = param_DefaultRubyOutline;
        this._rubyBitmap.outlineColor = 'rgba(0, 0, 0, 0.5)';
    };

    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.apply(this, arguments);
        this.clearFlagsMessageEx();
    };

    // overwrite mv
    Window_Message.prototype.windowHeight = function() {
        return this.fittingHeight(this.numVisibleRows());
    };

    const _Window_Message_clearFlags = Window_Message.prototype.clearFlags;
    Window_Message.prototype.clearFlags = function() {
        _Window_Message_clearFlags.apply(this, arguments);
        this._speed = param_DefaultTextSpeed;
        this._animeType = param_DefaultAnimeType;
        this._fadeOutType = 0;
        this._lastBottomY = 0;
        this._messageCount = 0;
    };

    Window_Message.prototype.clearFlagsMessageEx = function() {
        this._auto = false;
        this._effectSkip = $gameMessage.effectSkip();
    };

    Window_Message.prototype.numVisibleRows = function() {
        return this._messageRow;
    };

    Window_Message.prototype.getAnimationList = function() {
        return Window_Message.ANIMATIONS[this._animeType];
    };

    Window_Message.prototype.isCharacterAnimation = function() {
        return this.getAnimationList() && !this._showFast && !this._lineShowFast;
    };

    Window_Message.prototype.getTextCharacterSprite = function() {
        let sprite = this._characterSprites.find(sprite => !sprite.isPlaying());
        if (!sprite) {
            sprite = new Sprite_TextCharacter();
            sprite.setCallback(this.drawTextCharacter.bind(this));
            this._characterSprites.push(sprite);
        }
        if (this._characterContainer) {
            this._characterContainer.addChild(sprite);
        } else {
            this.addInnerChild(sprite);
        }
        return sprite;
    };

    Window_Message.prototype.drawTextCharacter = function(bitmap, rect) {
        const { x, y } = rect;
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x - 4, y);
    };

    const _Window_Message_flushTextState = __base(Window_Base.prototype, 'flushTextState');
    Window_Message.prototype.flushTextState = function(textState) {
        if (textState.drawing && this.isCharacterAnimation()) {
            this.flushTextStateForAnimation(textState);
        } else {
            this.contents.paintOpacity = this._paintOpacity;
            _Window_Message_flushTextState.apply(this, arguments);
            this.contents.paintOpacity = 255;
        }
    };
    
    Window_Message.prototype.flushTextStateForAnimation = function(textState) {
        const list = this.getAnimationList();
        const text = textState.buffer;
        const rtl = textState.rtl;
        const { y, height } = textState;
        const width = this.textWidth(text);
        const x = rtl ? textState.x - width : textState.x;
        const bitmap = this.createCharacterBitmap(width + 8, height);
        bitmap.drawText(text, 4, 0, width + 4, height);

        const sprite = this.getTextCharacterSprite();
        const rect = new Rectangle(x, y, width, height);
        sprite.setup(bitmap, rect, list);
        textState.x += rtl ? -width : width;
        textState.buffer = this.createTextBuffer(rtl);

        const outputWidth = Math.abs(textState.x - textState.startX);
        if (textState.outputWidth < outputWidth) {
            textState.outputWidth = outputWidth;
        }
        textState.outputHeight = y - textState.startY + height;
    };
    
    const _Window_Message_convertEscapeCharacters = __base(Window_Message.prototype, 'convertEscapeCharacters');
    Window_Message.prototype.convertEscapeCharacters = function(text) {
        return _Window_Message_convertEscapeCharacters.apply(this, arguments)
            .replace(/\x1bA(?![NIT])/gi, () => {
                this._auto = true;
                return '';
            })
            .replace(/\x1bES/gi, () => {
                this._effectSkip = true;
                return '';
            });
    };

    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        _Window_Message_update.apply(this, arguments);
        this.updateCharacterContainer();
    };

    Window_Message.prototype.updateCharacterContainer = function() {
        if (this._characterContainer) {
            const pad = this._padding;
            this._characterContainer.move(pad, pad);
        }
    };

    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        this.clearFlagsMessageEx();
        _Window_Message_startMessage.apply(this, arguments);
        if (this.contents.height !== this.contentsHeight()) {
            this.createContents();
        }
    };

    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        this._messageRow = $gameMessage.messageRow();
        this.height = this.windowHeight();
        _Window_Message_updatePlacement.apply(this, arguments);
    };
    
        const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        if (!this.isOpen() || $gameMessage.fadeOutType() === 0) {
            this.terminateMessageEx();
        } else {
            this._fadeOutType = $gameMessage.fadeOutType();
        }
    };
    
    Window_Message.prototype.terminateMessageEx = function() {
        _Window_Message_terminateMessage.call(this);
        if (this._effectSkip && param_SkipEffectsTiming === 'end of text') {
            $gameMessage.requestSceneEffectSkip();
        }
    };

    const _Window_Message_updateWait = Window_Message.prototype.updateWait;
    Window_Message.prototype.updateWait = function() {
        if (
            _Window_Message_updateWait.apply(this, arguments) ||
            this.updateFadeOut()
        ) {
            return true;
        } else if (this._waitEffect) {
            if (param_Patch6) this.updateShowFast();
            this._waitEffect = this.isEffectingEx(param_WaitEffects);
            return this._waitEffect;
        }
        return false;
    };

    const _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
    Window_Message.prototype.updateMessage = function() {
        if (this._textState) {
            this.updateShowFast();
            this._messageCount += this._speed;
            while (this.isContinueMessage()) {
                if (_Window_Message_updateMessage.apply(this, arguments)) {
                    this._messageCount = Math.max(this._messageCount - 60, 0);
                } else {
                    break;
                }
            }
            return true;
        }
        return this._characterSprites.some(sprite => sprite.isPlaying());
    };

    Window_Message.prototype.isContinueMessage = function() {
        return (
            (this._messageCount >= 60 || this._speed === 0) &&
            !this.pause &&
            this._waitCount === 0
        );
    };

    Window_Message.prototype.updateFadeOut = function() {
        if (this._fadeOutType > 0) {
            if (this.updateFadeOutMove()) {
                this._fadeOutType = 0;
                this.terminateMessageEx();
            }
            return true;
        }
        return false;
    };

    Window_Message.prototype.updateFadeOutMove = function() {
        switch (this._fadeOutType) {
            case 1:
                this.contentsOpacity -= param_DefaultFadeOutSpeed;
                return (this.contentsOpacity === 0);
            case 2:
                this.origin.y += param_DefaultFadeOutSpeed;
                return (this.origin.y >= this._lastBottomY);
        }
        return true;
    };

    const _Window_Message_areSettingsChanged = Window_Message.prototype.areSettingsChanged;
    Window_Message.prototype.areSettingsChanged = function() {
        return (
            _Window_Message_areSettingsChanged.apply(this, arguments) ||
            this._messageRow !== $gameMessage.messageRow()
        );
    };

    const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function() {
        const lastShowFast = this._showFast;
        if (!this._auto) {
            _Window_Message_updateShowFast.apply(this, arguments);
        }
        if (!lastShowFast && this._showFast) {
            if (this._effectSkip && param_SkipEffectsTiming === 'skip') {
                $gameMessage.requestSceneEffectSkip();
            }
            for (const item of this._characterSprites) {
                if (item.isPlaying()) item.draw();
            }
        }
    };

    const _Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function(textState) {
        for (const item of this._characterSprites) {
            if (item.isPlaying()) item.delete();
        }
        _Window_Message_newPage.apply(this, arguments);
        this.contentsOpacity = 255;
        this.origin.y = 0;
        textState.rubyHeight = this.realRubyHeight(textState);
        textState.y += textState.rubyHeight;
        this._lastBottomY = textState.y + textState.height;
    };

    Window_Message.prototype.realRubyHeight = function(textState) {
        const line = textState.text.slice(textState.index).split('\n')[0];
        if (param_AlwaysLeaveRubyHeight || /\x1bRB\[.+?\]/i.test(line)) {
            return this.baseRubyHeight();
        }
        return 0;
    };

    Window_Message.prototype.baseRubyHeight = function() {
        return Math.max(param_DefaultRubySize - param_RubyOy, 4);
    };
    
    const _Window_Message_processCharacter = __base(Window_Message.prototype, 'processCharacter');
    Window_Message.prototype.processCharacter = function(textState) {
        _Window_Message_processCharacter.apply(this, arguments);
        this._lastBottomY = textState.y + textState.height;
    };

    const _Window_Message_processNewLine = Window_Message.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function(textState) {
        if (this.isEndOfText(textState) && textState.x === textState.left) {
            return;
        }
        _Window_Message_processNewLine.apply(this, arguments);
        textState.rubyHeight = this.realRubyHeight(textState);
        textState.y += textState.rubyHeight;
        if (this.needsNewPage(textState)) {
            this.startPause();
        }
    };

    const _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
            case 'SP':
                this._speed = this.obtainEscapeParam(textState);
                break;
            case 'AT':
                this._animeType = this.obtainEscapeParam(textState);
                break;
            case 'CO':
                this.processGroupCharacter(textState, this.obtainEscapeTexts(textState));
                break;
            case 'RB':
                this.processRubyCharacter(textState, this.obtainEscapeTexts(textState));
                break;
            case 'MX':
                textState.x += this.obtainEscapeParam2(textState);
                break;
            case 'MY':
                textState.y += this.obtainEscapeParam2(textState);
                break;
            case 'PX':
                textState.x = this.obtainEscapeParam(textState);
                break;
            case 'PY':
                textState.y = this.obtainEscapeParam(textState);
                break;
            case 'SW':
                $gameSwitches.setValue(this.obtainEscapeParam(textState), true);
                break;
            case 'WE':
                this.waitForEffect();
                break;
            case 'C':
                this.contents.textColor = this.obtainEscapeColor(textState);
                break;
            case 'FS':
                this.contents.fontSize = this.obtainEscapeParam(textState);
                break;
            case 'FB':
                this.contents.fontBold = !this.contents.fontBold;
                break;
            case 'FI':
                this.contents.fontItalic = !this.contents.fontItalic;
                break;
            case 'OP':
                this._paintOpacity = this.obtainEscapeParam(textState);
                break;
            case 'OC': {
                const color = this.obtainEscapeColor(textState, 'rgba(0,0,0,0.5)');
                this.contents.outlineColor = color;
                this._rubyBitmap.outlineColor = color;
                break;
            }
            case 'OW':
                this.contents.outlineWidth = this.obtainEscapeParam(textState);
                break;
            case 'RC':
                this._rubyBitmap.textColor = this.obtainEscapeColor(textState, param_DefaultRubyColor);
                break;
            case 'DF':
                this.defaultTextInfo();
                break;
            case 'SV':
                this.saveTextInfo();
                break;
            case 'LD':
                this.loadTextInfo();
                break;
            default:
                _Window_Message_processEscapeCharacter.apply(this, arguments);
                break;
        }
    };

    Window_Message.prototype.waitForEffect = function() {
        if (this.isEffectingEx(param_WaitEffects)) {
            this._waitEffect = true;
            this._waitCount = 1;
        }
    };

    Window_Message.prototype.obtainEscapeParam2 = function(textState) {
        const arr = /^\[-?\d+\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return parseInt(arr[0].slice(1));
        }
        return '';
    };

    Window_Message.prototype.obtainEscapeTexts = function(textState) {
        const arr = /^\[(.+?)\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return arr[1].split(',');
        }
        return [];
    };

    Window_Message.prototype.obtainEscapeColor = function(textState, defaultColor) {
        const arr = /^\[([\d\s,\.]+)\]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            switch (arr[1].split(',').length) {
                case 1:
                    const index = Number(arr[1]);
                    return index === 0
                            ? defaultColor || _textColor.call(this, 0)
                            : _textColor.call(this, index);
                case 3:
                    return `rgb(${arr[1]})`;
                case 4:
                    return `rgba(${arr[1]})`;
            }
        }
        return '';
    };

    Window_Message.prototype.defaultTextInfo = function() {
        this._speed = param_DefaultTextSpeed;
        this._animeType = param_DefaultAnimeType;
        this.resetFontSettings();
    };

    Window_Message.prototype.saveTextInfo = function() {
        this._textInfo[0] = this._speed;
        this._textInfo[1] = this._animeType;
        this._textInfo[2] = this.contents.textColor;
        this._textInfo[3] = this.contents.fontSize;
        this._textInfo[4] = this.contents.fontBold;
        this._textInfo[5] = this.contents.fontItalic;
        this._textInfo[6] = this._paintOpacity;
        this._textInfo[7] = this.contents.outlineColor;
        this._textInfo[8] = this.contents.outlineWidth;
        this._textInfo[9] = this._rubyBitmap.textColor;
        this._textInfo[10] = this._rubyBitmap.outlineColor;
    };

    Window_Message.prototype.loadTextInfo = function() {
        if (this._textInfo.length > 0) {
            this._speed = this._textInfo[0];
            this._animeType = this._textInfo[1];
            this.contents.textColor = this._textInfo[2];
            this.contents.fontSize = this._textInfo[3];
            this.contents.fontBold = this._textInfo[4];
            this.contents.fontItalic = this._textInfo[5];
            this._paintOpacity = this._textInfo[6];
            this.contents.outlineColor = this._textInfo[7];
            this.contents.outlineWidth = this._textInfo[8];
            this._rubyBitmap.textColor = this._textInfo[9];
            this._rubyBitmap.outlineColor = this._textInfo[10];
        }
    };

    Window_Message.prototype.isEffectingEx = function(info) {
        return  (
            (info['Scroll Map']         && $gameMap.isScrolling()) ||
            (info['Set Movement Route'] && $gameMap.isAnyMoveRouteForcingNr()) ||
            (info['Show Animation']     && $gameMap.isAnyAnimationPlaying()) ||
            (info['Show Balloon Icon']  && $gameMap.isAnyBalloonPlaying()) ||
            (info['Move Picture']       && $gameScreen.isAnyPictureMoving()) ||
            (info['Tint Picture']       && $gameScreen.isAnyPictureTinting()) ||
            (info['Tint Screen']        && $gameScreen.isTinting()) ||
            (info['Flash Screen']       && $gameScreen.isFlashing()) ||
            (info['Shake Screen']       && $gameScreen.isShaking()) ||
            (info['Set Weather Effect'] && $gameScreen.isWeatherChanging()) ||
            (info['Fadeout BGM']        && AudioManager.isBgmFadeOuting()) ||
            (info['Fadeout BGS']        && AudioManager.isBgsFadeOuting()) ||
            (info['Play ME']            && AudioManager.isMePlaying())
        );
    };

    const _Window_Message_processNormalCharacter = __base(Window_Message.prototype, 'processNormalCharacter');
    Window_Message.prototype.processNormalCharacter = function(textState) {
        if (this.isCharacterAnimation()) {
            this.processNormalCharacterForAnimation(textState);
        } else {
            this.contents.paintOpacity = this._paintOpacity;
            _Window_Message_processNormalCharacter.apply(this, arguments);
            this.contents.paintOpacity = 255;
        }
    };

    Window_Message.prototype.processNormalCharacterForAnimation = function(textState) {
        const list = this.getAnimationList();
        const c = textState.text[textState.index++];
        const { x, y, height } = textState;
        const width = this.textWidth(c);
        const bitmap = this.createCharacterBitmap(width + 8, height);
        bitmap.drawText(c, 4, 0, width + 4, height);

        const sprite = this.getTextCharacterSprite();
        const rect = new Rectangle(x, y, width, height);
        sprite.setup(bitmap, rect, list);
        textState.x += width;
    };

    // overwrite
    Window_Message.prototype.processDrawIcon = function(iconIndex, textState) {
        const pw = Window_Base._iconWidth || ImageManager.iconWidth;
        const ph = Window_Base._iconHeight || ImageManager.iconHeight;
        if (Utils.RPGMAKER_NAME === 'MV' || textState.drawing) {
            if (this.isCharacterAnimation()) {
                this.processDrawIconForAnimation(iconIndex, textState);
            } else {
                const offsetY = Math.floor(textState.height - ph) / 2;
                this.contents.paintOpacity = this._paintOpacity;
                this.drawIcon(iconIndex, textState.x + 2, textState.y + offsetY);
                this.contents.paintOpacity = 255;
            }
        }
        textState.x += pw + 4;
    };

    Window_Message.prototype.processDrawIconForAnimation = function(iconIndex, textState) {
        const pw = Window_Base._iconWidth || ImageManager.iconWidth;
        const ph = Window_Base._iconHeight || ImageManager.iconHeight;
        const { x, y, height } = textState;
        const offsetY = Math.floor(height - ph) / 2;
        const list = this.getAnimationList();
        const bitmap = this.createCharacterBitmap(pw + 12, height);
        const iconSet = ImageManager.loadSystem('IconSet');
        const sx = iconIndex % 16 * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        bitmap.blt(iconSet, sx, sy, pw, ph, 6, offsetY);

        const sprite = this.getTextCharacterSprite();
        const rect = new Rectangle(x, y, pw + 4, height);
        sprite.setup(bitmap, rect, list);
    };

    Window_Message.prototype.processGroupCharacter = function(textState, texts) {
        const c = texts[0];
        const width = this.textWidth(c);
        if (Utils.RPGMAKER_NAME === 'MV' || textState.drawing) {
            if (this.isCharacterAnimation()) {
                this.processGroupCharacterForAnimation(textState, texts);
            } else {
                this.contents.paintOpacity = this._paintOpacity;
                this.contents.drawText(c, textState.x, textState.y, w * 2, w);
                this.contents.paintOpacity = 255;
            }
        }
        textState.x += width;
    };

    Window_Message.prototype.processGroupCharacterForAnimation = function(textState, texts) {
        const c = texts[0];
        const width = this.textWidth(c);
        const { x, y, height } = textState;
        const list = this.getAnimationList();
        const bitmap = this.createCharacterBitmap(width + 8, height);
        bitmap.drawText(c, 4, 0, width + 4, height);

        const sprite = this.getTextCharacterSprite();
        const rect = new Rectangle(x, y, width, height);
        sprite.setup(bitmap, rect, list);
    };

    Window_Message.prototype.processRubyCharacter = function(textState, texts) {
        const [ c, r ] = texts;
        const { x, y, height } = textState;
        const cw = this.textWidth(c);
        const rubyBitmap = this._rubyBitmap;
        rubyBitmap.fontBold = this.contents.fontBold;
        rubyBitmap.fontItalic = this.contents.fontItalic;
        const rw = rubyBitmap.measureTextWidth(r);
        const rh = textState.rubyHeight;
        const width = Math.max(cw, rw);
        if (Utils.RPGMAKER_NAME === 'MV' || textState.drawing) {
            rubyBitmap.clear();
            rubyBitmap.resize(rw + 16, rh + 8);
            rubyBitmap.drawText(r, 4, 0, rw + 4, rh + 8);
            if (this.isCharacterAnimation()) {
                const list = this.getAnimationList();
                const bitmap = this.createCharacterBitmap(width + 8, height + rh);
                const cx = (width - cw) / 2;
                const rx = (width - rw) / 2 - 4;
                const ry = param_RubyOy - 4;
                bitmap.drawText(c, cx + 4, rh, width + 4, height);
                bitmap.blt(rubyBitmap, 0, 0, rw + 8, rh + 8, rx, ry);

                const sprite = this.getTextCharacterSprite();
                const rect = new Rectangle(x, y - rh, width, height);
                sprite.setup(bitmap, rect, list);
            } else {
                const cx = x + (width - cw) / 2;
                const rx = x + (width - rw) / 2 - 4;
                const ry = y - rh + param_RubyOy - 4;
                this.contents.paintOpacity = this._paintOpacity;
                this.contents.drawText(c, cx, y, cw + 4, height);
                this.contents.blt(rubyBitmap, 0, 0, rw + 8, rh + 8, rx, ry);
                this.contents.paintOpacity = 255;
            }
        }
        textState.x += width;
    };

    Window_Message.prototype.createCharacterBitmap = function(width, height) {
        const bitmap = new Bitmap(width, height);
        bitmap.fontFace = this.contents.fontFace;
        bitmap.fontSize = this.contents.fontSize;
        bitmap.fontBold = this.contents.fontBold;
        bitmap.fontItalic = this.contents.fontItalic;
        bitmap.textColor = this.contents.textColor;
        bitmap.paintOpacity = this._paintOpacity;
        bitmap.outlineColor = this.contents.outlineColor;
        bitmap.outlineWidth = this.contents.outlineWidth;
        return bitmap;
    };

    const _Window_Message_calcTextHeight = Window_Message.prototype.calcTextHeight;
    Window_Message.prototype.calcTextHeight = function(textState, all) {
        if (Utils.RPGMAKER_NAME === 'MZ') {
            return _Window_Message_calcTextHeight.apply(this, arguments);
        }
        const lines = textState.text.slice(textState.index).split('\n');
        const regExp = /\x1bFS\[(\d+)\]/gi;
        let maxFontSize = this.contents.fontSize;
        for (;;) {
            const arr = regExp.exec(lines[0]);
            if (arr) {
                maxFontSize = Math.max(maxFontSize, Number(arr[1]));
            } else {
                break;
            }
        }
        const height = _Window_Message_calcTextHeight.apply(this, arguments);
        return Math.max(height, maxFontSize + 8);
    };

    //-------------------------------------------------------------------------
    // Scene_Map

    const _Scene_Map_updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
    Scene_Map.prototype.updateMainMultiply = function() {
        _Scene_Map_updateMainMultiply.apply(this, arguments);
        if ($gameMessage.sceneEffectSkip()) {
            for (let i = 1; i < 99; i++) {
                if (this._messageWindow.isEffectingEx(param_SkipEffects)) {
                    this.updateMain();
                } else {
                    $gameMessage.clearSceneEffectSkip();
                    break;
                }
            }
        }
    };

})();
