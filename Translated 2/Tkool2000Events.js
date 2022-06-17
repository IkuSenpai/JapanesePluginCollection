//=============================================================================
// Tkool2000Events（RPGツクールイベント命令）
// by フェルミウム湾
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc RPGツクール2000標準サポート命令追加_ver0.01
 * @author フェルミウム湾
 *
 * @help RPGツクール2000で標準サポートされている命令を追加登録します。
 * 重要度の高い命令を選定して実装しています。
 * まだ、全命令のサポートはされていません。
 * RPGツクール2000の命令との対応(実装)一覧は、以下を参照ください。
 * https://t.co/bXgcex8jPP?amp=1
 * 
 * ======================================================================
 * 文章の表示に表示スピード変更の特殊文字\S[n]を追加する
 * --------------------------------------------------------
 * パラメータ
 * ・文章の表示に\S[n]を追加
 * --------------------------------------------------------
 * パラメータをtrueにしておくと、文章の表示に特殊文字\S[n]が使用可能になります。
 * \S[n]を記述した直後からの表示スピードが、nに対応するスピードに変更されます。
 * \S[1]が標準スピードとなり、\S[2], \S[3], … になるにつれ遅くなります。
 * 
 * 例）
 * \S[5]あいうえお
 * … 「あいうえお」の表示が遅くなります。
 * 
 * ======================================================================
 * 画面のスクロール命令を同時に複数実行できるようにする
 * --------------------------------------------------------
 * パラメータ
 * ・同時画面スクロール可能
 * --------------------------------------------------------
 * パラメータをtrueにしておくと、複数の「画面のスクロール」命令を
 * 同時に実行できるようになります。
 * 
 * 例）
 * ◆マップのスクロール：下, 5, 4
 * ◆マップのスクロール：右, 10, 5 (ウェイト)
 * … 右下の方向へ、ななめに画面がスクロールします。
 * 
 * ======================================================================
 * スイッチや変数の操作にて 番号に変数を使えるよう命令追加
 * --------------------------------------------------------
 * プラグインコマンド
 * ・スイッチの操作（変数で指定）
 * ・変数の操作（変数で代入先を指定）
 * ・変数の操作（変数で代入元を指定）
 * ・アイテムの増減（対象を変数で指定）
 * ・アイテムの増減（対象とオペランドを変数で指定）
 * ・メンバーの入れ替え（対象を変数で指定）
 * ・スキルの増減（スキルを変数で指定）
 * ・スキルの増減（アクターとスキルを変数で指定）
 * --------------------------------------------------------
 * スイッチの操作や、変数の操作のイベント命令を実行するときに、
 * 操作対象の番号として変数を使用できる命令を追加しています。
 * 引数の名前に(V)が付いているものには、操作対象の番号が格納された
 * 変数を指定してください。
 * 
 * 例）
 * ◆プラグインコマンド：Tkool2000Events, スイッチの操作（変数で指定）
 * ：　　　　　　　　　：スイッチ(V) = 5
 * ：　　　　　　　　　：操作内容 = true
 * … 変数5番の内容が例えば100であった場合、スイッチ100番がONになります。
 * 
 * ======================================================================
 * スイッチのON/OFFを逆転
 * --------------------------------------------------------
 * プラグインコマンド
 * ・スイッチのON/OFFを逆転（単独指定）
 * ・スイッチのON/OFFを逆転（一括指定）
 * ・スイッチのON/OFFを逆転（変数で指定）
 * --------------------------------------------------------
 * スイッチのON/OFF状態を反転します。
 * 
 * ======================================================================
 * マップのスクロールの固定／固定解除命令
 * --------------------------------------------------------
 * プラグインコマンド
 * ・画面のスクロールを固定する
 * --------------------------------------------------------
 * キャラクターの移動に伴う画面スクロールを固定／固定解除する命令です。
 * 
 * ======================================================================
 * マップのスクロールの位置を元に戻す命令
 * --------------------------------------------------------
 * プラグインコマンド
 * ・画面のスクロール位置を元に戻す
 * --------------------------------------------------------
 * 画面のスクロール命令で位置がずれた状態から、もとのスクロール位置に戻します。
 * 
 * ======================================================================
 * キャラクターのフラッシュ命令
 * --------------------------------------------------------
 * プラグインコマンド
 * ・キャラクターのフラッシュ
 * --------------------------------------------------------
 * 指定したキャラクターをフラッシュさせます。
 * フラッシュ内容は、画面のフラッシュ命令と同様です。
 * 
 * ======================================================================
 * キー入力の処理命令
 * --------------------------------------------------------
 * プラグインコマンド
 * ・キー入力の処理
 * --------------------------------------------------------
 * この命令に到達した時点のキー入力状態を取得し、変数に格納します。
 * 「キーが押されるまで待つ」パラメータを有効にしておくと、
 * この命令に到達した時点でキー入力待ち状態になり、何かキーを入力すると
 * 押されたキーの内容が変数に格納され、キー入力待ち状態が解除されます。
 * 
 * キー入力状態を取得できるキーは、以下のとおりです。
 * 方向キーの下(1)
 * 方向キーの左(2)
 * 方向キーの右(3)
 * 方向キーの上(4)
 * 決定キー(5)
 * キャンセルキー(6)
 * シフトキー(7)
 * ページアップキー(8)
 * ページダウンキー(9)
 * 
 * それぞれ、入力を許可するキーとして選択したキーの状態のみ取得します。
 * また、キー入力待ち状態のときは、許可するキーいずれかが押されないと
 * キー入力待ち状態が解除されません。
 * 
 * 例）
 * 方向キーの左(2), 方向キーの右(3) のみを許可した場合、
 * 左キーを押していると、変数には2が格納されます。
 * 
 * ======================================================================
 * マップイベントの呼び出し命令
 * --------------------------------------------------------
 * プラグインコマンド
 * ・マップイベント呼び出し（直接指定）
 * ・マップイベント呼び出し（変数で指定）
 * --------------------------------------------------------
 * 現在のマップにある、他のイベントの命令を実行します。
 * 実行するイベントID及びページ番号を指定してください。
 * 内容は、コモンイベントの呼び出し命令と同様です。
 * 
 * ======================================================================
 * 
 * 【利用規約】
 * 本プラグインは、著作権フリーです。
 * 改変・再配布・アダルト利用等、自由に行うことができます。
 * 使用連絡は特に不要です。
 * 
 * ご質問等がありましたら、下記メールアドレスまでご連絡お願いします。
 * fermiumbay2＠yahoo.co.jp  (← アットマークを全角にしています)
 * 
 * ======================================================================
 * 
 * 【バージョンアップ履歴】
 * ver 0.01 重要度の高い11命令を対応。
 *
 * @param text_speed_flg
 * @text 文章の表示に\S[n]を追加
 * @type boolean
 * @desc 文章の表示に、テキストの表示スピードを変更する特殊文字\S[n]を追加します。
 * @default true
 *
 * @param pallarel_scroll_screen_flg
 * @text 画面同時スクロール可能
 * @type boolean
 * @desc 画面のスクロール命令を同時に複数実行できるようにします。
 * @default true
 * 
 * @command SwitchVariable
 * @text スイッチの操作（変数で指定）
 * @desc スイッチを操作します。
 *
 * @arg switchIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text スイッチ(V)
 * @desc 操作するスイッチ番号を格納した変数を指定します。
 *
 * @arg switchValue
 * @type boolean
 * @default true
 * @text 操作内容
 * @desc スイッチの操作を指定します。（ON=true, OFF=false）
 * 
 * @command SwitchReverse
 * @text スイッチのON/OFFを逆転（単独指定）
 * @desc スイッチのON/OFFを逆転します。
 *
 * @arg switchId
 * @type switch
 * @min 1
 * @default 1
 * @text スイッチ
 * @desc ON/OFFを逆転するスイッチを指定します。
 * 
 * @command SwitchReverseRange
 * @text スイッチのON/OFFを逆転（一括指定）
 * @desc スイッチのON/OFFを逆転します。複数のスイッチを一括で操作します。
 *
 * @arg switchIdBegin
 * @type number
 * @min 1
 * @default 1
 * @text スイッチ番号(開始)
 * @desc ON/OFFを逆転するスイッチの開始番号を指定します。
 *
 * @arg switchIdEnd
 * @type number
 * @min 1
 * @default 1
 * @text スイッチ番号(終了)
 * @desc ON/OFFを逆転するスイッチの終了番号を指定します。
 * 
 * @command SwitchReverseVariable
 * @text スイッチのON/OFFを逆転（変数で指定）
 * @desc スイッチのON/OFFを逆転します。
 *
 * @arg switchIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text スイッチ(V)
 * @desc ON/OFFを逆転するスイッチ番号を格納した変数を指定します。
 * 
 * @command VariableDstVariable
 * @text 変数の操作（変数で代入先を指定）
 * @desc 変数番目の変数に、変数を代入します。
 *
 * @arg dstIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text 代入先変数(V)
 * @desc 値を代入する先の変数番号を格納した変数を指定します。
 * 
 * @arg srcId
 * @type variable
 * @min 1
 * @default 1
 * @text 代入元変数
 * @desc 値を代入する元の変数を指定します。
 * 
 * @command VariableSrcVariable
 * @text 変数の操作（変数で代入元を指定）
 * @desc 変数に、変数番目の変数を代入します。
 *
 * @arg dstId
 * @type variable
 * @min 1
 * @default 1
 * @text 代入先変数
 * @desc 値を代入する先の変数を指定します。
 * 
 * @arg srcIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text 代入元変数(V)
 * @desc 値を代入する元の変数番号を格納した変数を指定します。
 * 
 * @command ItemVariable
 * @text アイテムの増減（対象を変数で指定）
 * @desc アイテムを増減します。
 *
 * @arg itemIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text アイテム(V)
 * @desc 増減するアイテム番号を格納した変数を指定します。
 *
 * @arg operation
 * @type select
 * @option 増やす
 * @value 増やす
 * @option 減らす
 * @value 減らす
 * @default 増やす
 * @text 操作
 * @desc アイテムの操作内容を指定します。
 *
 * @arg operand
 * @type number
 * @min 1
 * @default 1
 * @text オペランド
 * @desc アイテムの増減数を指定します。
 * 
 * @command ItemVariableVariable
 * @text アイテムの増減（対象とオペランドを変数で指定）
 * @desc アイテムを増減します。
 *
 * @arg itemIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text アイテム(V)
 * @desc 増減するアイテム番号を格納した変数を指定します。
 *
 * @arg operation
 * @type select
 * @option 増やす
 * @value 増やす
 * @option 減らす
 * @value 減らす
 * @default 増やす
 * @text 操作
 * @desc アイテムの操作内容を指定します。
 *
 * @arg operandVariable
 * @type variable
 * @min 1
 * @default 1
 * @text オペランド(V)
 * @desc アイテムの増減数を格納した変数を指定します。
 * 
 * @command MemberVariable
 * @text メンバーの入れ替え（対象を変数で指定）
 * @desc メンバーを入れ替えます。
 *
 * @arg actorIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text アクター(V)
 * @desc 入れ替える対象のアクター番号を格納した変数を指定します。
 *
 * @arg operation
 * @type select
 * @option 加える
 * @value 加える
 * @option 外す
 * @value 外す
 * @default 加える
 * @text 操作
 * @desc アクターの操作内容を指定します。
 *
 * @arg initFlg
 * @type boolean
 * @default false
 * @text 初期化(※)
 * @desc アクターを初期化します。（※「加える」を指定した場合のみ有効）
 * 
 * @command SkillVariable
 * @text スキルの増減（スキルを変数で指定）
 * @desc スキルを増減します。
 * 
 * @arg partyKind
 * @type select
 * @option パーティ全体
 * @value パーティ全体
 * @option 個別アクター(任意)
 * @value 個別アクター(任意)
 * @default パーティ全体
 * @text 対象種類
 * @desc スキルの増減をする対象の種類を選択します。
 *
 * @arg actorId
 * @type actor
 * @default 0
 * @text アクター(※)
 * @desc スキルを増減するアクターを指定します。（※個別アクター(任意)を指定した場合のみ有効）
 *
 * @arg operation
 * @type select
 * @option 覚える
 * @value 覚える
 * @option 忘れる
 * @value 忘れる
 * @default 覚える
 * @text 操作
 * @desc スキルの操作内容を指定します。
 *
 * @arg skillIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text スキル(V)
 * @desc 増減するスキル番号を格納した変数を指定します。
 * 
 * @command SkillVariableVariable
 * @text スキルの増減（アクターとスキルを変数で指定）
 * @desc スキルを増減します。
 * 
 * @arg partyKind
 * @type select
 * @option パーティ全体
 * @value パーティ全体
 * @option 個別アクター(任意)
 * @value 個別アクター(任意)
 * @default パーティ全体
 * @text 対象種類
 * @desc スキルの増減をする対象の種類を選択します。
 *
 * @arg actorIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text アクター(V)(※)
 * @desc スキルを増減するアクター番号を格納した変数を指定します。（※個別アクター(任意)を指定した場合のみ有効）
 *
 * @arg operation
 * @type select
 * @option 覚える
 * @value 覚える
 * @option 忘れる
 * @value 忘れる
 * @default 覚える
 * @text 操作
 * @desc スキルの操作内容を指定します。
 *
 * @arg skillIdVariable
 * @type variable
 * @min 1
 * @default 1
 * @text スキル(V)
 * @desc 増減するスキル番号を格納した変数を指定します。
 *
 * @command FixScrollScreen
 * @text 画面のスクロールを固定する
 * @desc 画面のスクロールを固定します。
 *
 * @arg fixScreenFlg
 * @type boolean
 * @default true
 * @text スクリーン固定フラグ
 * @desc スクリーンを固定します。（true=固定する, false=固定を解除する）
 * 
 * @command ReturnScrollScreen
 * @text 画面のスクロール位置を元に戻す
 * @desc 画面のスクロール位置をプレイヤーの位置に戻します。
 *
 * @arg scrollSpeed
 * @type select
 * @option 1: 1/8倍速
 * @value 1: 1/8倍速
 * @option 2: 1/4倍速
 * @value 2: 1/4倍速
 * @option 3: 1/2倍速
 * @value 3: 1/2倍速
 * @option 4: 標準速
 * @value 4: 標準速
 * @option 5: 2倍速
 * @value 5: 2倍速
 * @option 6: 4倍速
 * @value 6: 4倍速
 * @default 4: 標準速
 * @text スクロール速度
 * @desc スクロール速度を指定します。
 *
 * @arg waitFlg
 * @type boolean
 * @default true
 * @text 完了するまでウェイト
 * @desc スクロールが完了するまでウェイトするフラグを指定します。
 * 
 * @command FlashCharacter
 * @text キャラクターのフラッシュ
 * @desc プレイヤーをフラッシュさせます。
 * 
 * @arg target
 * @type select
 * @option プレイヤー
 * @value プレイヤー
 * @option 小型船
 * @value 小型船
 * @option 大型船
 * @value 大型船
 * @option 飛行船
 * @value 飛行船
 * @option このイベント
 * @value このイベント
 * @option マップイベント(任意)
 * @value マップイベント(任意)
 * @default プレイヤー
 * @text キャラクター
 * @desc フラッシュさせるキャラクターを指定します。
 * 
 * @arg mapEventId
 * @type number
 * @min 0
 * @default 0
 * @text マップイベント番号(※)
 * @desc 対象となるマップイベントのイベント番号を指定します。（※「マップイベント(任意)」を指定した場合のみ有効）
 * 
 * @arg colorR
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text 赤
 * @desc フラッシュの色（赤）を指定します。
 *
 * @arg colorG
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text 緑
 * @desc フラッシュの色（緑）を指定します。
 *
 * @arg colorB
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text 青
 * @desc フラッシュの色（青）を指定します。
 *
 * @arg colorV
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text 強さ
 * @desc フラッシュの強さを指定します。
 *
 * @arg duration
 * @type number
 * @min 0
 * @default 60
 * @text フラッシュにかける時間
 * @desc フラッシュにかける時間[フレーム]を指定します。
 *
 * @arg waitFlg
 * @type boolean
 * @default true
 * @text 完了するまでウェイト
 * @desc フラッシュが完了するまでウェイトするフラグを指定します。
 * 
 * @command KeyInput
 * @text キー入力の処理
 * @desc キー入力の処理を行います。
 *
 * @arg retVariableId
 * @type variable
 * @min 1
 * @default 1
 * @text キーコードを受け取る変数
 * @desc キーコードを受け取る変数を指定します。
 * 
 * @arg waitFlg
 * @type boolean
 * @default true
 * @text キーが押されるまで待つ
 * @desc キーが押されるまで待つフラグを指定します。
 * 
 * @arg validKeyList
 * @type invalid
 * @text 入力を許可するキー
 * @default -
 * @desc (この項目への値入力は無効です)
 * 
 * @arg validKey1
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text 方向キーの下 (1)
 * @desc 方向キーの下が入力された場合、変数に1を代入します。
 * 
 * @arg validKey2
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text 方向キーの左 (2)
 * @desc 方向キーの左が入力された場合、変数に2を代入します。
 * 
 * @arg validKey3
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text 方向キーの右 (3)
 * @desc 方向キーの右が入力された場合、変数に3を代入します。
 * 
 * @arg validKey4
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text 方向キーの上 (4)
 * @desc 方向キーの上が入力された場合、変数に4を代入します。
 * 
 * @arg validKey5
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text 決定キー (5)
 * @desc 決定キーが入力された場合、変数に5を代入します。
 * 
 * @arg validKey6
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text キャンセルキー (6)
 * @desc キャンセルキーが入力された場合、変数に6を代入します。
 * 
 * @arg validKey7
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text シフトキー (7)
 * @desc シフトキーが入力された場合、変数に7を代入します。
 * 
 * @arg validKey8
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text ページアップキー (8)
 * @desc ページアップキーが入力された場合、変数に8を代入します。
 * 
 * @arg validKey9
 * @parent validKeyList
 * @type boolean
 * @default true
 * @text ページダウンキー (9)
 * @desc ページダウンキーが入力された場合、変数に9を代入します。
 *
 * @command CallMapEventDirect
 * @text マップイベント呼び出し（直接指定）
 * @desc マップイベントを呼び出します。
 *
 * @arg eventId
 * @type number
 * @min 1
 * @default 1
 * @text イベント番号
 * @desc 呼び出すマップイベントのイベント番号を指定します。
 *
 * @arg pageId
 * @type number
 * @min 1
 * @default 1
 * @text ページ番号
 * @desc 呼び出すマップイベントのページ番号を指定します。
 *
 * @command CallMapEventVariable
 * @text マップイベント呼び出し（変数で指定）
 * @desc マップイベントを呼び出します。
 *
 * @arg eventIdVariable
 * @type number
 * @min 1
 * @default 1
 * @text イベント番号(V)
 * @desc 呼び出すマップイベントのイベント番号を格納した変数の番号を指定します。
 *
 * @arg pageIdVariable
 * @type number
 * @min 1
 * @default 1
 * @text ページ番号(V)
 * @desc 呼び出すマップイベントのページ番号を格納した変数の番号を指定します。
 */

(() => {
	// プラグイン名
	const pluginName = "Tkool2000Events";

	// バージョン番号
	const version = 0.01;

	// 特殊文字\S[n]追加フラグ
	var text_speed_flg = PluginManager.parameters(pluginName)["text_speed_flg"] === "true";

	// 画面同時スクロール有効フラグ
	var pallarel_scroll_screen_flg = PluginManager.parameters(pluginName)["pallarel_scroll_screen_flg"] === "true";

	// テキストスピードの初期化を追加
	var _Window_Base_prototype_initialize = Window_Base.prototype.initialize;
	Window_Base.prototype.initialize = function(rect) {
		_Window_Base_prototype_initialize.apply(this, arguments);
		this._textSpeed = 1;
	};

	// テキストスピードの初期化を追加
	var _Window_Base_prototype_createTextState = Window_Base.prototype.createTextState;
	Window_Base.prototype.createTextState = function(text, x, y, width) {
		const textState = _Window_Base_prototype_createTextState.apply(this, arguments);
		this._textSpeed = 1;
		return textState;
	};

	// メッセージ1文字処理にテキストスピードによる遅延処理を追加
	Window_Base.prototype.processCharacter = function(textState) {
		do {
			this._reloadProcessCharacterFlg = false;
			const c = textState.text[textState.index++];
			if (c.charCodeAt(0) < 0x20) {
				this.flushTextState(textState);
				this.processControlCharacter(textState, c);
			} else {
				textState.buffer += c;
				if (!this._lineShowFast && this._textSpeed > 1) {
					this.startWait(this._textSpeed);
				}
			}
		} while (this._reloadProcessCharacterFlg && textState.index < textState.text.length);
	};

	// 特殊文字に\S[n]を追加
	var _Window_Base_prototype_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
	Window_Base.prototype.processEscapeCharacter = function(code, textState) {
		_Window_Base_prototype_processEscapeCharacter.apply(this, arguments);
		if (text_speed_flg && code === "S") {
			this._textSpeed = this.obtainEscapeParam(textState);
			this._reloadProcessCharacterFlg = true;	// ウェイトなしで直後に次の1文字を読み取る
		}
	};

	// \<に掛かる時間として\<分を追加
	var _Window_Message_prototype_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
	Window_Message.prototype.processEscapeCharacter = function(code, textState) {
		_Window_Message_prototype_processEscapeCharacter.apply(this, arguments);
		if (code === "<" && this._textSpeed > 1) {
			this.startWait(this._textSpeed);
		}
	};

	// キャラクタースプライトの初期化にフラッシュ情報を追加
	var _Sprite_Character_prototype_initMembers = Sprite_Character.prototype.initMembers;
	Sprite_Character.prototype.initMembers = function() {
		_Sprite_Character_prototype_initMembers.apply(this);
		this._flashColor = [0, 0, 0, 0];
		this._flashDuration = 0;
	};

	// キャラクタースプライトの更新処理にフラッシュ情報の更新を追加
	var _Sprite_Character_prototype_update = Sprite_Character.prototype.update;
	Sprite_Character.prototype.update = function() {
		_Sprite_Character_prototype_update.apply(this);
		if (this._character._setFlashFlg) {
			this._flashColor = this._character._flashColor;
			this._flashDuration = this._character._flashDuration;
			this._character._setFlashFlg = false;
		}
		this.updateFlash();
	};

	// キャラクタースプライトにフラッシュの更新処理を追加
	Sprite_Character.prototype.updateFlash = function() {
		if (this._flashDuration > 0) {
			const d = this._flashDuration--;
			this._flashColor[3] *= (d - 1) / d;
			this.setBlendColor(this._flashColor);
		}
	};

	// キャラクターの初期化にフラッシュ情報を追加
	var _Game_CharacterBase_prototype_initMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_Game_CharacterBase_prototype_initMembers.apply(this);
		this._flashColor = [0, 0, 0, 0];
		this._flashDuration = 0;
		this._setFlashFlg = false;
	};

	// キャラクターのフラッシュ命令
	Game_CharacterBase.prototype.flash = function(flashColor, flashDuration) {
		this._flashColor = flashColor;
		this._flashDuration = flashDuration;
		this._setFlashFlg = true;
	};

	// マップスクロールの初期化処理を追加
	var _Game_Map_prototype_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function() {
		_Game_Map_prototype_initialize.apply(this);
		this._scrollDirectionX = 4;
		this._scrollRestX = 0;
		this._scrollSpeedX = 4;
		this._scrollDirectionY = 2;
		this._scrollRestY = 0;
		this._scrollSpeedY = 4;
		this._scrollReturnFlg = false;
		this._scrollReturnSpeed = 4;
	};

	// マップスクロールの初期化処理を追加
	var _Game_Map_prototype_setupScroll = Game_Map.prototype.setupScroll;
	Game_Map.prototype.setupScroll = function() {
		_Game_Map_prototype_setupScroll.apply(this);
		this._scrollDirectionX = 4;
		this._scrollRestX = 0;
		this._scrollSpeedX = 4;
		this._scrollDirectionY = 2;
		this._scrollRestY = 0;
		this._scrollSpeedY = 4;
		this._scrollReturnFlg = false;
		this._scrollReturnSpeed = 4;
	};

	// スクロール開始処理を変更（縦と横で区別する）
	var _Game_Map_prototype_startScroll = Game_Map.prototype.startScroll;
	Game_Map.prototype.startScroll = function(direction, distance, speed) {
		if (pallarel_scroll_screen_flg) {
			if (!this._scrollReturnFlg) {
				if (direction == 4 || direction == 6) {
					this._scrollDirectionX = direction;
					this._scrollRestX = distance;
					this._scrollSpeedX = speed;
				} else {
					this._scrollDirectionY = direction;
					this._scrollRestY = distance;
					this._scrollSpeedY = speed;
				}
			}
		} else {
			_Game_Map_prototype_startScroll.apply(this, arguments);
		}
	};

	// スクロール判定に追加分の変数の判定を追加
	var _Game_Map_prototype_isScrolling = Game_Map.prototype.isScrolling;
	Game_Map.prototype.isScrolling = function() {
		if (pallarel_scroll_screen_flg) {
			return _Game_Map_prototype_isScrolling.apply(this)
				|| this._scrollRestX > 0
				|| this._scrollRestY > 0
				|| this._scrollReturnFlg;
		} else {
			return _Game_Map_prototype_isScrolling.apply(this);
		}
	};

	// スクロール更新処理を変更
	var _Game_Map_prototype_updateScroll = Game_Map.prototype.updateScroll;
	Game_Map.prototype.updateScroll = function() {
		if (pallarel_scroll_screen_flg) {
			if (this._scrollRestX > 0) {
				const lastX = this._displayX;
				this.doScroll(this._scrollDirectionX, this.scrollDistanceX());
				if (this._displayX === lastX) {
					this._scrollRestX = 0;
				} else {
					this._scrollRestX -= this.scrollDistanceX();
				}
			}
			if (this._scrollRestY > 0) {
				const lastY = this._displayY;
				this.doScroll(this._scrollDirectionY, this.scrollDistanceY());
				if (this._displayY === lastY) {
					this._scrollRestY = 0;
				} else {
					this._scrollRestY -= this.scrollDistanceY();
				}
			}
		} else {
			_Game_Map_prototype_updateScroll.apply(this);
		}
		if (this._scrollReturnFlg) {
			const lastX = this._displayX;
			const lastY = this._displayY;
			this.doScrollToNearDirection($gameMap._displayX, $gamePlayer._realX - $gamePlayer.centerX(), $dataMap.width, [4, 6]);
			this.doScrollToNearDirection($gameMap._displayY, $gamePlayer._realY - $gamePlayer.centerY(), $dataMap.height, [8, 2]);
			if (this._displayX === lastX && this._displayY === lastY) {
				this._scrollReturnFlg = false;
			}
		}
	};

	// スクロール距離(X)の取得
	Game_Map.prototype.scrollDistanceX = function() {
		return Math.pow(2, this._scrollSpeedX) / 256;
	};

	// スクロール距離(Y)の取得
	Game_Map.prototype.scrollDistanceY = function() {
		return Math.pow(2, this._scrollSpeedY) / 256;
	};

	// スクロール距離(位置を元に戻す)の取得
	Game_Map.prototype.scrollDistanceReturn = function() {
		return Math.pow(2, this._scrollReturnSpeed) / 256;
	};

	// 座標srcPosからdstPosへループを考慮して近い方へスクロールする処理（一次元）
	Game_Map.prototype.doScrollToNearDirection = function(srcPos, dstPos, mapSize, directionAry) {
		srcPos = (srcPos + mapSize) % mapSize;
		dstPos = (dstPos + mapSize) % mapSize;
		if (srcPos < dstPos) {
			if (dstPos - srcPos > mapSize / 2) {
				this.doScroll(directionAry[0], this.scrollDistanceReturn());
			} else {
				this.doScroll(directionAry[1], this.scrollDistanceReturn());
			}
		} else if (srcPos > dstPos) {
			if (srcPos - dstPos < mapSize / 2) {
				this.doScroll(directionAry[0], this.scrollDistanceReturn());
			} else {
				this.doScroll(directionAry[1], this.scrollDistanceReturn());
			}
		}
	};

	// スクロール固定のフラグを初期化する処理を追加
	var _Game_Player_prototype_initMembers = Game_Player.prototype.initMembers;
	Game_Player.prototype.initMembers = function() {
		_Game_Player_prototype_initMembers.apply(this);
		this._scrollFixFlg = false;
	};

	// スクロール固定中はプレイヤーの移動に伴うスクロール更新を行わないよう処理追加
	var _Game_Player_prototype_updateScroll = Game_Player.prototype.updateScroll;
	Game_Player.prototype.updateScroll = function(lastScrolledX, lastScrolledY) {
		if (!this._scrollFixFlg || $gameMap._scrollReturnFlg) {
			_Game_Player_prototype_updateScroll.apply(this, arguments);
		}
	};

	// 画面のスクロール命令はスクロール中にもできるように変更
	var _Game_Interpreter_prototype_command204 = Game_Interpreter.prototype.command204;
	Game_Interpreter.prototype.command204 = function(params) {
		if (pallarel_scroll_screen_flg) {
			if (!$gameParty.inBattle()) {
				$gameMap.startScroll(params[0], params[1], params[2]);
				if (params[3]) {
					this.setWaitMode("scroll");
				}
			}
			return true;
		} else {
			return _Game_Interpreter_prototype_command204.apply(this, arguments);
		}
	};

	// キャラクター引数の取得
	tkool2000EventArg_Character = function(target, mapEventId) {
		var character = null;
		switch (target) {
		case "プレイヤー":
			character = $gamePlayer;
			break;
		case "小型船":
			character = $gameMap.boat();
			break;
		case "大型船":
			character = $gameMap.ship();
			break;
		case "飛行船":
			character = $gameMap.airship();
			break;
		case "このイベント":
			var nowEventId = $gameMap._interpreter._eventId;
			character = $gameMap._events[nowEventId];
			break;
		case "マップイベント(任意)":
			character = $gameMap._events[mapEventId];
			break;
		}
		return character;
	};

	// スピード引数の取得
	tkool2000EventArg_Speed = function(speed) {
		var ret = 0;
		switch (speed) {
		case "1: 1/8倍速":
			ret = 1;
			break;
		case "2: 1/4倍速":
			ret = 2;
			break;
		case "3: 1/2倍速":
			ret = 3;
			break;
		case "4: 標準速":
			ret = 4;
			break;
		case "5: 2倍速":
			ret = 5;
			break;
		case "6: 4倍速":
			ret = 6;
			break;
		}
		return ret;
	};

	// 増減引数の取得（増減の項目名を配列で指定）
	tkool2000EventArg_IncDec = function(incDec, incDecName) {
		// 増やす場合はtrue, 減らす場合はfalse
		var ret = true;
		switch (incDec) {
		case incDecName[0]:
			ret = true;
			break;
		case incDecName[1]:
			ret = false;
			break;
		}
		return ret;
	};

	// 変数の操作（変数で代入先を指定）を追加
	tkool2000EventFunc_VariableDstVariable = function(dstIdVariable, srcId) {
		var dstId = $gameVariables.value(dstIdVariable);
		var srcVariable = $gameVariables.value(srcId);
		$gameVariables.setValue(dstId, srcVariable);
	};
	PluginManager.registerCommand(pluginName, "VariableDstVariable", args => {
		var dstIdVariable = Number(args.dstIdVariable);
		var srcId = Number(args.srcId);
		tkool2000EventFunc_VariableDstVariable(dstIdVariable, srcId);
	});

	// 変数の操作（変数で代入元を指定）を追加
	tkool2000EventFunc_VariableSrcVariable = function(dstId, srcIdVariable) {
		var srcId = $gameVariables.value(srcIdVariable);
		var srcVariable = $gameVariables.value(srcId);
		$gameVariables.setValue(dstId, srcVariable);
	};
	PluginManager.registerCommand(pluginName, "VariableSrcVariable", args => {
		var dstId = Number(args.dstId);
		var srcIdVariable = Number(args.srcIdVariable);
		tkool2000EventFunc_VariableSrcVariable(dstId, srcIdVariable);
	});

	// スイッチの操作命令（変数で指定）を追加
	tkool2000EventFunc_SwitchVariable = function(switchIdVariable, value) {
		var switchId = $gameVariables.value(switchIdVariable);
		$gameSwitches.setValue(switchId, value);
	};
	PluginManager.registerCommand(pluginName, "SwitchVariable", args => {
		var switchIdVariable = Number(args.switchIdVariable);
		var value = (args.switchValue === "true");
		tkool2000EventFunc_SwitchVariable(switchId, value);
	});

	// スイッチのON/OFFを逆転命令（単独指定）を追加
	tkool2000EventFunc_SwitchReverse = function(switchId) {
		var value = !$gameSwitches.value(switchId);
		$gameSwitches.setValue(switchId, value);
	};
	PluginManager.registerCommand(pluginName, "SwitchReverse", args => {
		var switchId = Number(args.switchId);
		tkool2000EventFunc_SwitchReverse(switchId);
	});

	// スイッチのON/OFFを逆転命令（一括指定）を追加
	tkool2000EventFunc_SwitchReverseRange = function(switchIdBegin, switchIdEnd) {
		for (var switchId = switchIdBegin; switchId <= switchIdEnd; switchId++) {
			var value = !$gameSwitches.value(switchId);
			$gameSwitches.setValue(switchId, value);
		}
	};
	PluginManager.registerCommand(pluginName, "SwitchReverseRange", args => {
		var switchIdBegin = Number(args.switchIdBegin);
		var switchIdEnd = Number(args.switchIdEnd);
		tkool2000EventFunc_SwitchReverseRange(switchIdBegin, switchIdEnd);
	});

	// スイッチのON/OFFを逆転命令（変数で指定）を追加
	tkool2000EventFunc_SwitchReverseVariable = function(switchIdVariable) {
		var switchId = $gameVariables.value(switchIdVariable);
		var value = !$gameSwitches.value(switchId);
		$gameSwitches.setValue(switchId, value);
	};
	PluginManager.registerCommand(pluginName, "SwitchReverseVariable", args => {
		var switchIdVariable = Number(args.switchIdVariable);
		tkool2000EventFunc_SwitchReverseVariable(switchIdVariable);
	});

	// アイテムの増減命令（対象を変数で指定）を追加
	tkool2000EventFunc_ItemVariable = function(itemIdVariable, operation, operand) {
		var itemId = $gameVariables.value(itemIdVariable);
		$gameMap._interpreter.command126([itemId, operation ? 0 : 1, 0, operand]);
	};
	PluginManager.registerCommand(pluginName, "ItemVariable", args => {
		var itemIdVariable = Number(args.itemIdVariable);
		var operation = tkool2000EventArg_IncDec(args.operation, ["増やす", "減らす"]);
		var operand = Number(args.operand);
		tkool2000EventFunc_ItemVariable(itemIdVariable, operation, operand);
	});

	// アイテムの増減命令（対象とオペランドを変数で指定）を追加
	tkool2000EventFunc_ItemVariable = function(itemIdVariable, operation, operandVariable) {
		var itemId = $gameVariables.value(itemIdVariable);
		$gameMap._interpreter.command126([itemId, operation ? 0 : 1, 1, operandVariable]);
	};
	PluginManager.registerCommand(pluginName, "ItemVariableVariable", args => {
		var itemIdVariable = Number(args.itemIdVariable);
		var operation = tkool2000EventArg_IncDec(args.operation, ["増やす", "減らす"]);
		var operandVariable = Number(args.operandVariable);
		tkool2000EventFunc_ItemVariable(itemIdVariable, operation, operandVariable);
	});

	// メンバーの入れ替え命令（対象を変数で指定）を追加
	tkool2000EventFunc_MemberVariable = function(actorIdVariable, operation, initFlg) {
		var actorId = $gameVariables.value(actorIdVariable);
		$gameMap._interpreter.command129([actorId, operation ? 0 : 1, initFlg]);
	};
	PluginManager.registerCommand(pluginName, "MemberVariable", args => {
		var actorIdVariable = Number(args.actorIdVariable);
		var operation = tkool2000EventArg_IncDec(args.operation, ["加える", "外す"]);
		var initFlg = (args.initFlg === "true");
		tkool2000EventFunc_MemberVariable(actorIdVariable, operation, initFlg);
	});

	// スキルの増減命令（スキルを変数で指定）を追加
	tkool2000EventFunc_SkillVariable = function(actorId, operation, skillIdVariable) {
		var skillId = $gameVariables.value(skillIdVariable);
		$gameMap._interpreter.command318([0, actorId, operation ? 0 : 1, skillId]);
	};
	PluginManager.registerCommand(pluginName, "SkillVariable", args => {
		var actorId;
		if (args.partyKind === "パーティ全体") {
			actorId = 0;
		} else {
			actorId = Number(args.actorId);
		}
		var operation = tkool2000EventArg_IncDec(args.operation, ["覚える", "忘れる"]);
		var skillIdVariable = Number(args.skillIdVariable);
		tkool2000EventFunc_SkillVariable(actorId, operation, skillIdVariable);
	});

	// スキルの増減命令（アクターとスキルを変数で指定）を追加
	tkool2000EventFunc_SkillVariableVariable = function(actorIdVariable, operation, skillIdVariable) {
		var skillId = $gameVariables.value(skillIdVariable);
		$gameMap._interpreter.command318([1, actorIdVariable, operation ? 0 : 1, skillId]);
	};
	PluginManager.registerCommand(pluginName, "SkillVariableVariable", args => {
		var actorIdVariable;
		if (args.partyKind === "パーティ全体") {
			actorIdVariable = 0;
		} else {
			actorIdVariable = Number(args.actorIdVariable);
		}
		var operation = tkool2000EventArg_IncDec(args.operation, ["覚える", "忘れる"]);
		var skillIdVariable = Number(args.skillIdVariable);
		tkool2000EventFunc_SkillVariableVariable(actorIdVariable, operation, skillIdVariable);
	});

	// 画面のスクロールを固定する命令を追加
	tkool2000EventFunc_FixScrollScreen = function(fixScreenFlg) {
		if (!$gameParty.inBattle()) {
			$gamePlayer._scrollFixFlg = fixScreenFlg;
		}
	};
	PluginManager.registerCommand(pluginName, "FixScrollScreen", args => {
		var fixScreenFlg = (args.fixScreenFlg === "true");
		tkool2000EventFunc_FixScrollScreen(fixScreenFlg);
	});

	// 画面のスクロール位置を元に戻す命令を追加
	tkool2000EventFunc_ReturnScrollScreen = function(scrollSpeed, waitFlg) {
		if (!$gameParty.inBattle()) {
			$gameMap._scrollRest = 0;
			$gameMap._scrollRestX = 0;
			$gameMap._scrollRestY = 0;
			$gameMap._scrollReturnSpeed = scrollSpeed;
			$gameMap._scrollReturnFlg = true;
			if (waitFlg) {
				$gameMap._interpreter.setWaitMode("scroll");
			}
		}
	};
	PluginManager.registerCommand(pluginName, "ReturnScrollScreen", args => {
		var scrollSpeed = tkool2000EventArg_Speed(args.scrollSpeed);
		var waitFlg = (args.waitFlg === "true");
		tkool2000EventFunc_ReturnScrollScreen(scrollSpeed, waitFlg);
	});

	// キャラクターのフラッシュを追加
	tkool2000EventFunc_FlashCharacter = function(character, colorR, colorG, colorB, colorV, duration, waitFlg) {
		var color = [colorR, colorG, colorB, colorV];
		character.flash(color, duration);
		if (waitFlg) {
			$gameMap._interpreter.wait(duration);
		}
	};
	PluginManager.registerCommand(pluginName, "FlashCharacter", args => {
		var character = tkool2000EventArg_Character(args.target, Number(args.mapEventId));
		var colorR = Number(args.colorR);
		var colorG = Number(args.colorG);
		var colorB = Number(args.colorB);
		var colorV = Number(args.colorV);
		var duration = Number(args.duration);
		var waitFlg = (args.waitFlg === "true");
		if (character != null) {
			tkool2000EventFunc_FlashCharacter(character, colorR, colorG, colorB, colorV, duration, waitFlg);
		}
	});

	// キー入力待ち時のキーコード代入先変数番号と許可するキー配列を初期化
	var _Game_Interpreter_prototype_initialize = Game_Interpreter.prototype.initialize;
	Game_Interpreter.prototype.initialize = function(depth) {
		_Game_Interpreter_prototype_initialize.apply(this, arguments);
		this._keyInputDstVariableid = 0;
		this._keyInputValidKeyArray = [];
	}

	// ウェイトモードにキー入力待ちを追加
	var _Game_Interpreter_prototype_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	Game_Interpreter.prototype.updateWaitMode = function() {
		let waiting = false;
		if (this._waitMode === "keyinput") {
			var code = this.getInputKeyId(this._keyInputValidKeyArray);
			if (code > 0) {
				$gameVariables.setValue(this._keyInputDstVariableid, code);
				this._waitMode = "";
				return false;
			} else {
				return true;
			}
		} else {
			return _Game_Interpreter_prototype_updateWaitMode.apply(this);
		}
	}

	// キーコードとキーの名前の組
	Game_Interpreter.prototype.getInputKeyMap = function() {
		return {
			1: "down",	// 方向キーの下
			2: "left",	// 方向キーの左
			3: "right",	// 方向キーの右
			4: "up",	// 方向キーの上
			5: "ok",	// 決定
			6: "cancel",	// キャンセル
			7: "shift",	// シフト
			8: "pageup",	// ページアップ
			9: "pagedown"	// ページダウン
		};
	};

	// キー入力値を取得する関数を追加
	Game_Interpreter.prototype.getInputKeyId = function(validKeyArray) {
		var ret = 0;
		var inputKeyMap = this.getInputKeyMap();
		for (let code in inputKeyMap) {
			if (validKeyArray[code]
			 && Input.isPressed(inputKeyMap[code])) {
				ret = code;
			}
		}
		return ret;
	};

	// キー入力の処理命令を追加
	tkool2000EventFunc_KeyInput = function(retVariableId, validKeyArray, waitFlg) {
		if (this._waitMode !== "keyinput") {
			if (waitFlg) {
				$gameMap._interpreter._keyInputDstVariableid = retVariableId;
				$gameMap._interpreter._keyInputValidKeyArray = validKeyArray;
				$gameMap._interpreter.setWaitMode("keyinput");
			} else {
				var code = $gameMap._interpreter.getInputKeyId(validKeyArray);
				$gameVariables.setValue(retVariableId, code);
			}
		}
	};
	PluginManager.registerCommand(pluginName, "KeyInput", args => {
		var retVariableId = Number(args.retVariableId);
		var validKeyArray = [null,
				(args.validKey1 === "true"),
				(args.validKey2 === "true"),
				(args.validKey3 === "true"),
				(args.validKey4 === "true"),
				(args.validKey5 === "true"),
				(args.validKey6 === "true"),
				(args.validKey7 === "true"),
				(args.validKey8 === "true"),
				(args.validKey9 === "true")
			];
		var waitFlg = (args.waitFlg === "true");
		tkool2000EventFunc_KeyInput(retVariableId, validKeyArray, waitFlg);
	});

	// イベント命令実行中インタプリタ
	Game_Interpreter.prototype._commandInterpreter = null;

	// イベントコマンド各々の実行時に、実行中インタプリタをGame_Mapに伝える
	var _Game_Interpreter_prototype_executeCommand = Game_Interpreter.prototype.executeCommand;
	Game_Interpreter.prototype.executeCommand = function() {
		$gameMap._commandInterpreter = this;
		return _Game_Interpreter_prototype_executeCommand.apply(this);
	};

	// マップイベント呼び出し命令（直接指定）を追加
	tkool2000EventFunc_CallMapEventDirect = function(eventId, pageId) {
		var nowEventId = $gameMap._interpreter._eventId;
		var eventList = $dataMap.events[eventId].pages[pageId - 1].list;
		if ($gameMap._commandInterpreter != null) {
			var commandInterpreter = $gameMap._commandInterpreter;
		} else {
			var commandInterpreter = $gameMap._interpreter;
		}
		commandInterpreter.setupChild(eventList, nowEventId);
	};
	PluginManager.registerCommand(pluginName, "CallMapEventDirect", args => {
		var eventId = Number(args.eventId);
		var pageId = Number(args.pageId);
		tkool2000EventFunc_CallMapEventDirect(eventId, pageId);
	});

	// マップイベント呼び出し命令（変数で指定）を追加
	tkool2000EventFunc_CallMapEventVariable = function(eventIdVariable, pageIdVariable) {
		var eventId = $gameVariables.value(eventIdVariable);
		var pageId = $gameVariables.value(pageIdVariable);
		var nowEventId = $gameMap._interpreter._eventId;
		var eventList = $dataMap.events[eventId].pages[pageId - 1].list;
		if ($gameMap._commandInterpreter != null) {
			var commandInterpreter = $gameMap._commandInterpreter;
		} else {
			var commandInterpreter = $gameMap._interpreter;
		}
		commandInterpreter.setupChild(eventList, nowEventId);
	};
	PluginManager.registerCommand(pluginName, "CallMapEventVariable", args => {
		var eventIdVariable = Number(args.eventIdVariable);
		var pageIdVariable = Number(args.pageIdVariable);
		tkool2000EventFunc_CallMapEventVariable(eventIdVariable, pageIdVariable);
	});
})();
