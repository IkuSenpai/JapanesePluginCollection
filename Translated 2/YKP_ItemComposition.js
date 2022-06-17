//=============================================================================
// YKP_ItemComposition.js
//
// Copyright (c) 2022 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_ItemComposition = true;

var YukiKP = YukiKP || {};
YukiKP.ItemComposition = YukiKP.ItemComposition || {};

/*:
 * @plugindesc アイテム合成・強化システム追加プラグイン。
 * @target MZ
 * @author YukiKamijo
 * 
 * @help YKP_ItemComposition.js
 *
 * アイテム合成・強化システムを追加するプラグインです。
 * 
 * メニュー画面に追加、プラグインコマンドによる実行で
 * 合成・強化が行えるようになります。
 *
 * 合成・強化で作れるものは、アイテム・武器・防具の3種類です。
 * 合成・強化の素材に出来るものは、アイテム・武器・防具・変数・お金の5種類です。
 * 素材に登録するアイテムの種類は合計6種類程度まで正常に表示できます。
 *
 * i[n] ... アイテムID n番 を参照します。
 * w[n] ... 武器ID n番 を参照します。
 * a[n] ... 防具ID n番 を参照します。
 * v[n] ... 変数ID n番 を参照します。
 * g    ... お金 を参照します。
 *
 * 合成と強化では表示される条件設定が異なっています。
 * 合成はスイッチ管理でリスト表示します。
 * 強化は所持アイテムでリスト表示します。
 * 合成と強化の両方を導入したゲームの作成も可能です。
 * 
 * 装備中のアイテムはリスト表示に反映されません。
 * 臨時メンバーになる等のアクターで、装備を強化させたくない場合は
 * 「強化システムの除外アクターID」を設定することで強化対象から除外できます。
 * 
 * 以下のスイッチIDを設定し、該当のスイッチをONにすると表示されます。
 * 「メニュー表示の利用スイッチID」...メニュー画面に「合成・強化」を表示させる
 * 「合成システムの利用スイッチID」...「合成する」を表示させる
 * 「強化システムの利用スイッチID」...「強化する」を表示させる
 * 
 * 以下のスイッチIDを設定し、該当のスイッチで有効/無効が切り替えできます。
 * 「メニュー表示の有効スイッチID」...メニュー画面の「合成・強化」の選択可否
 * 「合成システムの有効スイッチID」...「合成する」の選択可否
 * 「強化システムの有効スイッチID」...「強化する」の選択可否
 * 
 * 
 * アイテムのメモ欄に<composition:n,x a,y b,z c>の形式を記載をすることで、合成で作れるようになります。
 *    n ... 合成リストに出現する条件で、スイッチn番がONの時にリストに表示されます。
 *          最初からリストに表示する場合は、0を指定します。
 *    a,b,c ... 必要数を指定します。
 *
 *  例：アイテム「ポーション」の合成
 *      「ポーション」のメモ欄に<composition:1,i[1] 2,v[1] 10,g 100>と記載
 *       ・アイテムID[1] が 2個
 *       ・変数ID[1] が 10
 *       ・お金 が 100
 *       以上を持っていると、スイッチ 1番がONの時に合成可能になり「ポーション」が作れる。
 *       「ポーション」を作ると、素材にしたアイテム等は指定された数量分なくなる。
 *
 *
 * アイテムのメモ欄に<upgrade:n,x a,y b,z c>形式を記載することで、強化が出来るようになります。
 *    n ... 強化したあとのアイテムや武器IDを指定します。
 *    a,b,c ... 必要数を指定します。
 *
 *  例:武器「ロングソード」の強化
 *      「ロングソード」のメモ欄に<upgrade:w[2],i[1] 2>
 *       ・「ロングソード」を 1個以上
 *       ・アイテムID[1] が 2個
 *       以上を持っていると、武器ID[2]を作れる。
 *       武器ID[2]を作ると、「ロングソード」1個と素材にしたアイテムID[1]が2個がなくなる。
 * 
 * 強化したときにステータス値を表示するには、<states:x:a,y:b...>と追加する必要があります。
 *    「,」区切りでタグ設定ができ、「:」区切りでタグごとのパラメータを設定します。
 *    アイテムの特徴に合わせて、強化で表示したい情報をタグ設定してください。
 *    5項目程度までが正常に表示できるタグ数になります。
 * 
 *  プラグインパラメータ「強化システムの表示パラメータ」で設定されたタグを読み取って表示させます。
 *  タグや名称は自由に変更しても問題ありませんが、他の設定を変更すると不具合の原因になります。
 *  ％表示するパラメータは100を基本値として増減を設定します。
 *  タグ種類とパラメータ設定例:
 *      hph:100     HP回復 100 % にする
 *      hlh:100     HP回復 100 にする
 *      hpm:100     MP回復 100 % にする
 *      hlm:100     MP回復 100 にする
 *      hlt:100     TP回復 100 にする
 *      elr:1:70    タイプID:1 の属性有効度 を 70 % にする
 *      dwr:1:70    最大HP 弱体有効度 を 70 % にする
 *      str:1:70    ステートID:1 の有効度 を 70 % にする
 *      sti:1       ステートID:1 を無効化する
 *      ate:1       タイプID:1 を攻撃時属性にする
 *      ats:1:70    ステートID:1 を 70 % で発生する攻撃時ステートにする
 *      mhp:100     最大HP を 100 増加
 *      mmp:100     最大MP を 100 増加
 *      atk:10      攻撃力 を 10 増加
 *      def:10      防御力 を 10 増加
 *      mat:10      魔法力 を 10 増加
 *      mdf:10      魔法防御 を 10 増加
 *      spd:-10     敏捷性 を 10 減少
 *      luk:-10     運 を 10 減少
 *      hpp:110     最大HP を 110 % にする
 *      mpp:110     最大MP を 110 % にする
 *      atp:110     攻撃力 を 110 % にする
 *      dfp:110     防御力 を 110 % にする
 *      mtp:110     魔法力 を 110 % にする
 *      mdp:110     魔法防御 を 110 % にする
 *      spp:110     敏捷性 を 110 % にする
 *      lkp:110     運 を 110 % にする
 *      dex:105     命中率 を 105 % にする
 *      agi:105     回避率 を 105 % にする
 *      cri:105     会心率 を 105 % にする
 *      cag:105     会心回避率 を 105 % にする
 *      mag:105     魔法回避率 を 105 % にする
 *      mre:105     魔法反射率 を 105 % にする
 *      cnt:105     反撃率 を 105 % にする
 *      hpr:105     HP再生率 を 105 % にする
 *      mpr:105     MP再生率 を 105 % にする
 *      tpr:105     TP再生率 を 105 % にする
 *      trg:200     狙われ率 を 200 % にする
 *      dfr:200     防御効果率 を 200 % にする
 *      rer:200     回復効果率 を 200 % にする
 *      itr:200     薬の知識 を 200 % にする
 *      mpc:200     MP消費率 を 200 % にする
 *      tpc:200     TPチャージ率 を 200 % にする
 *      phr:50      物理ダメージ率 を 50 % にする
 *      mgr:50      魔法ダメージ率 を 50 % にする
 *      fdr:50      床ダメージ率 を 50 % にする
 *      exr:200     経験獲得率 を 200 % にする
 *      asp:100     攻撃速度補正 を 100 にする
 *      apl:1       攻撃追加回数 を 1 にする
 *      amv:1       行動回数追加 を 1 にする
 *      nsk:1       スキルID:1 のスキルを追加する
 *      dul         二刀流 にする
 *      ech         エンカウント半減 にする
 *      ecn         エンカウント無効 にする
 *      bkn         不意打ち無効 にする
 *      bku         先制攻撃率アップ にする
 *      mr2         獲得金額2倍 にする
 *      ir2         アイテム入手率2倍 にする
 * 
 *
 * パーティーが通貨・素材の表示上限桁数を超えた値を所持している場合、
 * 上限桁数分の「9」を表示して、末尾に「+」が追加されます。 
 * 
 * 素材に変数を設定する場合、該当する変数の名前を表示します。
 *
 *
 * plugin version 1.0.3
 * 
 * ver 1.0.3 : アクターが装備しているアイテムを強化時に
 *             装備しているアイテムが所持品にもあった場合
 *             アクターの装備と所持品の計２個が減少する問題を修正。
 * 
 * ver 1.0.2 : アクターが装備しているアイテムを強化時に
 *             正しくパラメータが反映されていなかった問題を修正。
 *             アクターが装備しているアイテムを強化した場合に
 *             素材アイテムが消費されなかった問題を修正。
 * 
 * ver 1.0.1 : 除外アクターの検索が正常にできていなかった問題を修正。
 * 
 * 
 * 
 * @command CompositionStart
 * @text 「合成・強化」の表示
 * @desc 「合成・強化」のシーンを表示します。
 * 
 * @param settingMenu
 * @text メニュー設定
 * @default ------------------------------
 * 
 * @param addMenuList
 * @text 合成・強化をメニュー画面に追加
 * @desc 合成・強化をメニュー画面の一覧に追加します。
 * @type boolean
 * @default true
 * @parent settingMenu
 *
 * @param menuListName
 * @text メニュー画面の表示名
 * @desc 合成・強化をメニュー画面に表示する名称を設定します。
 * @type string
 * @default 合成・強化
 * @parent settingMenu
 *
 * @param useMenuSwitchId
 * @text 表示の利用スイッチID
 * @desc 合成・強化の表示/非表示を切り替えるスイッチIDを設定します。0:常に表示 -1:常に非表示
 * @type switch
 * @default 0
 * @parent settingMenu
 *
 * @param enabledMenuSwitchId
 * @text 表示の有効スイッチID
 * @desc 合成・強化の有効/無効を切り替えるスイッチIDを設定します。0:常に有効
 * @type switch
 * @default 0
 * @parent settingMenu
 * 
 * @param settingSe
 * @text SE設定
 * @default ------------------------------
 * @parent setting
 * 
 * @param successSeName
 * @text 成功時のSEファイル名
 * @desc 合成・強化成功時に再生するSEファイル名を設定します。
 * @type file
 * @dir audio/se
 * @default Item3
 * @parent settingSe
 *
 * @param successSeVolume
 * @text 成功時のSE再生音量
 * @desc 合成・強化成功時に再生するSEの音量を設定します。
 * @type number
 * @default 90
 * @parent settingSe
 *
 * @param successSePitch
 * @text 成功時のSE再生ピッチ
 * @desc 合成・強化成功時に再生するSEのピッチを設定します。
 * @type number
 * @default 100
 * @parent settingSe
 *
 * @param successSePan
 * @text 成功時のSE再生位相
 * @desc 合成・強化成功時に再生するSEの位相を設定します。
 * @type number
 * @default 0
 * @parent settingSe
 *
 * @param settingView
 * @text 表示設定
 * @default ------------------------------
 *
 * @param maxViewNum
 * @text 通貨・素材の表示上限桁数
 * @desc 通貨・素材で表示可能な桁数を設定します。
 * @type number
 * @default 6
 * @parent settingMoney
 *
 * @param settingMoney
 * @text 表示通貨設定
 * @default ------------------------------
 * @parent settingView
 *
 * @param useMoneyWindow
 * @text 画面に通貨表示を追加
 * @desc 合成・強化画面に基本通貨の表示ウィンドウを追加します。
 * @type boolean
 * @default true
 * @parent settingMoney
 *
 * @param moneyType
 * @text 通貨を所持金と変数から選択
 * @desc 基本通貨を所持金と変数で選択します。
 * @default 0
 * @type select
 * @option 所持金
 * @value 0
 * @option 変数
 * @value 1
 * @parent settingMoney
 *
 * @param moneyVariableId
 * @text 変数通貨に使用する変数IDを設定
 * @desc 基本通貨が変数の場合に、変数IDを設定します。
 * @type variable
 * @default 1
 * @parent settingMoney
 *
 * @param moneyUnit
 * @text 変数通貨の単位を設定
 * @desc 基本通貨が変数の場合に、単位を設定します。
 * @type string
 * @default P
 * @parent settingMoney
 *
 * @param settingComposition
 * @text 合成システム設定
 * @default ------------------------------
 *
 * @param useCompositionSwitchId
 * @text 利用スイッチID
 * @desc 表示/非表示を切り替えるスイッチIDを設定します。0:常に表示 -1:常に非表示
 * @type switch
 * @default 0
 * @parent settingComposition
 *
 * @param enabledCompositionSwitchId
 * @text 有効スイッチID
 * @desc 有効/無効を切り替えるスイッチIDを設定します。0:常に有効
 * @type switch
 * @default 0
 * @parent settingComposition
 * 
 * @param compositionCategory
 * @text カテゴリー設定
 * @desc 表示されるカテゴリーを設定します。
 * @type struct<ViewCategoryParamList>[]
 * @default ["{\"categoryName\":\"アイテム\",\"categoryType\":\"item\",\"typeId\":\"1\"}","{\"categoryName\":\"武器\",\"categoryType\":\"weapon\",\"typeId\":\"0\"}","{\"categoryName\":\"防具\",\"categoryType\":\"armor\",\"typeId\":\"0\"}","{\"categoryName\":\"大事なもの\",\"categoryType\":\"item\",\"typeId\":\"2\"}"]
 * @parent settingComposition
 * 
 * @param compositionHelpType
 * @text ヘルプ表示タイプ
 * @desc ヘルプ表示のタイプを設定します。
 * @type select
 * @default SUBandITEM
 * @option アイテム説明のみ
 * @value ITEM
 * @option サブテキスト + アイテム説明
 * @value SUBandITEM
 * @option サブテキストのみ
 * @value SUB
 * @parent settingComposition
 * 
 * @param compositionHelpSubText
 * @text サブテキスト
 * @desc ヘルプウィンドウに表示させるサブテキストを設定します。
 * @type string
 * @default 【合成結果】
 * @parent settingComposition
 * 
 * @param compositionViewGoldName
 * @text お金の表示名称
 * @desc 素材に表示されるお金の名称を設定します。
 * @type string
 * @default 費用
 * @parent settingComposition
 * 
 * @param compositionViewGoldIconId
 * @text お金の表示アイコン
 * @desc 素材に表示されるお金のアイコンIDを設定します。
 * @type number
 * @default 314
 * @parent settingComposition
 *
 * @param compositionVariableIconList
 * @text 変数アイコン番号
 * @desc 変数ID:アイコンIDを「,」区切りで列挙することで表示するアイコンが設定されます。0:アイコンなし
 * @type struct<VariableIconData>[]
 * @default ["{\"variableId\":\"1\",\"iconId\":\"166\"}","{\"variableId\":\"2\",\"iconId\":\"167\"}","{\"variableId\":\"3\",\"iconId\":\"168\"}"]
 * @parent settingComposition
 *
 * @param compositionSuccessText
 * @text 確認テキスト
 * @desc 合成する時に作成個数の確認テキストを設定します。
 * @type string
 * @default いくつ合成しますか？
 * @parent settingComposition
 *
 * @param settingUpgrade
 * @text 強化システム設定
 * @default ------------------------------
 *
 * @param useUpgradeSwitchId
 * @text 利用スイッチID
 * @desc 表示/非表示を切り替えるスイッチIDを設定します。0:常に表示 -1:常に非表示
 * @type switch
 * @default 0
 * @parent settingUpgrade
 *
 * @param enabledUpgradeSwitchId
 * @text 有効スイッチID
 * @desc 有効/無効を切り替えるスイッチIDを設定します。0:常に有効
 * @type switch
 * @default 0
 * @parent settingUpgrade
 * 
 * @param maxVisibleActors
 * @text 最大表示アクター数
 * @desc 一度に表示可能な最大アクター数を設定します。
 * @type number
 * @default 4
 * @parent settingUpgrade
 * 
 * @param exclusionActorId
 * @text 除外アクターID
 * @desc 装備中のアイテムを強化しないアクターIDを設定します。
 * @type actor[]
 * @default []
 * @parent settingUpgrade
 * 
 * @param upgradeHelpType
 * @text ヘルプ表示タイプ
 * @desc ヘルプ表示のタイプを設定します。
 * @type select
 * @default SUBandITEM
 * @option 強化前のアイテム説明のみ
 * @value OLD
 * @option 強化後のアイテム説明のみ
 * @value ITEM
 * @option サブテキスト + 強化後のアイテム説明
 * @value SUBandITEM
 * @option サブテキストのみ
 * @value SUB
 * @parent settingUpgrade
 * 
 * @param upgradeHelpSubText
 * @text サブテキスト
 * @desc ヘルプウィンドウに表示させるサブテキストを設定します。
 * @type string
 * @default 【強化結果】
 * @parent settingUpgrade
 * 
 * @param upgradeSelectText
 * @text 選択時テキスト
 * @desc アクター選択時に表示させるサブウィンドウテキストを設定します。
 * @type string
 * @default どれを強化しますか？
 * @parent settingUpgrade
 * 
 * @param upgradeSelectItemName
 * @text 所持アイテムの表示名
 * @desc アクター選択時のパーティー所持の表示名称を設定します。
 * @type string
 * @default 所持アイテム
 * 
 * @param upgradeSelectItemIconId
 * @text 所持アイテムのアイコン番号
 * @desc アクター選択時のパーティー所持に表示するアイコン番号を設定します。0:アイコンなし
 * @type number
 * @default 208
 * 
 * @param upgradeCategory
 * @text カテゴリー設定
 * @desc 表示されるカテゴリーの設定
 * @type struct<ViewCategoryParamList>[]
 * @default ["{\"categoryName\":\"アイテム\",\"categoryType\":\"item\",\"typeId\":\"1\"}","{\"categoryName\":\"武器\",\"categoryType\":\"weapon\",\"typeId\":\"0\"}","{\"categoryName\":\"防具\",\"categoryType\":\"armor\",\"typeId\":\"0\"}","{\"categoryName\":\"大事なもの\",\"categoryType\":\"item\",\"typeId\":\"2\"}"]
 * @parent settingUpgrade
 * 
 * @param upgradeViewGoldName
 * @text お金の表示名称
 * @desc 素材に表示されるお金の名称を設定します。
 * @type string
 * @default 費用
 * @parent settingUpgrade
 * 
 * @param upgradeViewGoldIconId
 * @text お金の表示アイコン
 * @desc 素材に表示されるお金のアイコンIDを設定します。
 * @type number
 * @default 314
 * @parent settingUpgrade
 *
 * @param upgradeVariableIconList
 * @text 変数アイコン番号
 * @desc 変数ID:アイコンIDを「,」区切りで列挙することで表示するアイコンが設定されます。0:アイコンなし
 * @type struct<VariableIconData>[]
 * @default ["{\"variableId\":\"1\",\"iconId\":\"166\"}","{\"variableId\":\"2\",\"iconId\":\"167\"}","{\"variableId\":\"3\",\"iconId\":\"168\"}"]
 * @parent settingUpgrade
 *
 * @param upgradeSuccessText
 * @text 確認テキスト
 * @desc 強化する時の確認テキストを設定します。
 * @type string
 * @default 強化しますか？
 * @parent settingUpgrade
 *
 * @param upgradeParamData
 * @text 表示パラメータ
 * @desc 強化する時の確認画面で表示されるパラメータを設定します。
 * @type struct<ParamData>[]
 * @parent settingUpgrade
 * @default ["{\"tag\":\"hpp\",\"name\":\"最大ＨＰ\",\"type\":\"param\",\"typeid\":\"0\",\"viewType\":\"parcent\"}","{\"tag\":\"mhp\",\"name\":\"最大ＨＰ\",\"type\":\"param\",\"typeid\":\"0\",\"viewType\":\"base\"}","{\"tag\":\"mpp\",\"name\":\"最大ＭＰ\",\"type\":\"param\",\"typeid\":\"1\",\"viewType\":\"parcent\"}","{\"tag\":\"mmp\",\"name\":\"最大ＭＰ\",\"type\":\"param\",\"typeid\":\"1\",\"viewType\":\"base\"}","{\"tag\":\"atp\",\"name\":\"攻撃力\",\"type\":\"param\",\"typeid\":\"2\",\"viewType\":\"parcent\"}","{\"tag\":\"atk\",\"name\":\"攻撃力\",\"type\":\"param\",\"typeid\":\"2\",\"viewType\":\"base\"}","{\"tag\":\"dfp\",\"name\":\"防御力\",\"type\":\"param\",\"typeid\":\"3\",\"viewType\":\"parcent\"}","{\"tag\":\"def\",\"name\":\"防御力\",\"type\":\"param\",\"typeid\":\"3\",\"viewType\":\"base\"}","{\"tag\":\"mtp\",\"name\":\"魔法力\",\"type\":\"param\",\"typeid\":\"4\",\"viewType\":\"parcent\"}","{\"tag\":\"mat\",\"name\":\"魔法力\",\"type\":\"param\",\"typeid\":\"4\",\"viewType\":\"base\"}","{\"tag\":\"mdp\",\"name\":\"魔法防御\",\"type\":\"param\",\"typeid\":\"5\",\"viewType\":\"parcent\"}","{\"tag\":\"mdf\",\"name\":\"魔法防御\",\"type\":\"param\",\"typeid\":\"5\",\"viewType\":\"base\"}","{\"tag\":\"spp\",\"name\":\"敏捷性\",\"type\":\"param\",\"typeid\":\"6\",\"viewType\":\"parcent\"}","{\"tag\":\"spd\",\"name\":\"敏捷性\",\"type\":\"param\",\"typeid\":\"6\",\"viewType\":\"base\"}","{\"tag\":\"lkp\",\"name\":\"運\",\"type\":\"param\",\"typeid\":\"7\",\"viewType\":\"parcent\"}","{\"tag\":\"luk\",\"name\":\"運\",\"type\":\"param\",\"typeid\":\"7\",\"viewType\":\"base\"}","{\"tag\":\"dex\",\"name\":\"命中率\",\"type\":\"xparam\",\"typeid\":\"0\",\"viewType\":\"parcent\"}","{\"tag\":\"agi\",\"name\":\"回避率\",\"type\":\"xparam\",\"typeid\":\"1\",\"viewType\":\"parcent\"}","{\"tag\":\"cri\",\"name\":\"会心率\",\"type\":\"xparam\",\"typeid\":\"2\",\"viewType\":\"parcent\"}","{\"tag\":\"cag\",\"name\":\"会心回避率\",\"type\":\"xparam\",\"typeid\":\"3\",\"viewType\":\"parcent\"}","{\"tag\":\"mag\",\"name\":\"魔法回避率\",\"type\":\"xparam\",\"typeid\":\"4\",\"viewType\":\"parcent\"}","{\"tag\":\"mre\",\"name\":\"魔法反射率\",\"type\":\"xparam\",\"typeid\":\"5\",\"viewType\":\"parcent\"}","{\"tag\":\"cnt\",\"name\":\"反撃率\",\"type\":\"xparam\",\"typeid\":\"6\",\"viewType\":\"parcent\"}","{\"tag\":\"hpr\",\"name\":\"ＨＰ再生率\",\"type\":\"xparam\",\"typeid\":\"7\",\"viewType\":\"parcent\"}","{\"tag\":\"mpr\",\"name\":\"ＭＰ再生率\",\"type\":\"xparam\",\"typeid\":\"8\",\"viewType\":\"parcent\"}","{\"tag\":\"tpr\",\"name\":\"ＴＰ再生率\",\"type\":\"xparam\",\"typeid\":\"9\",\"viewType\":\"parcent\"}","{\"tag\":\"trg\",\"name\":\"狙われ率\",\"type\":\"sparam\",\"typeid\":\"0\",\"viewType\":\"parcent\"}","{\"tag\":\"dfr\",\"name\":\"防御効果率\",\"type\":\"sparam\",\"typeid\":\"1\",\"viewType\":\"parcent\"}","{\"tag\":\"rer\",\"name\":\"回復効果率\",\"type\":\"sparam\",\"typeid\":\"2\",\"viewType\":\"parcent\"}","{\"tag\":\"itr\",\"name\":\"薬の知識\",\"type\":\"sparam\",\"typeid\":\"3\",\"viewType\":\"parcent\"}","{\"tag\":\"mpc\",\"name\":\"ＭＰ消費率\",\"type\":\"sparam\",\"typeid\":\"4\",\"viewType\":\"parcent\"}","{\"tag\":\"tpc\",\"name\":\"ＴＰチャージ率\",\"type\":\"sparam\",\"typeid\":\"5\",\"viewType\":\"parcent\"}","{\"tag\":\"phr\",\"name\":\"物理ダメージ率\",\"type\":\"sparam\",\"typeid\":\"6\",\"viewType\":\"parcent\"}","{\"tag\":\"mgr\",\"name\":\"魔法ダメージ率\",\"type\":\"sparam\",\"typeid\":\"7\",\"viewType\":\"parcent\"}","{\"tag\":\"fdr\",\"name\":\"床ダメージ率\",\"type\":\"sparam\",\"typeid\":\"8\",\"viewType\":\"parcent\"}","{\"tag\":\"exr\",\"name\":\"経験獲得率\",\"type\":\"sparam\",\"typeid\":\"9\",\"viewType\":\"parcent\"}","{\"tag\":\"elr\",\"name\":\"有効度\",\"type\":\"elementRate\",\"typeid\":\"-1\",\"viewType\":\"validity\"}","{\"tag\":\"dwr\",\"name\":\"弱体\",\"type\":\"debuffRate\",\"typeid\":\"-1\",\"viewType\":\"validity\"}","{\"tag\":\"str\",\"name\":\"有効度\",\"type\":\"stateRate\",\"typeid\":\"-1\",\"viewType\":\"validity\"}","{\"tag\":\"sti\",\"name\":\"無効化\",\"type\":\"stateResist\",\"typeid\":\"-1\",\"viewType\":\"invalid\"}","{\"tag\":\"ate\",\"name\":\"攻撃属性\",\"type\":\"attackElement\",\"typeid\":\"-1\",\"viewType\":\"attack\"}","{\"tag\":\"ats\",\"name\":\"追加\",\"type\":\"attackState\",\"typeid\":\"-1\",\"viewType\":\"validity\"}","{\"tag\":\"nsk\",\"name\":\"スキル\",\"type\":\"skill\",\"typeid\":\"-1\",\"viewType\":\"invalid\"}","{\"tag\":\"dul\",\"name\":\"二刀流\",\"type\":\"equipSlot\",\"typeid\":\"-1\",\"viewType\":\"only\"}","{\"tag\":\"ech\",\"name\":\"エンカウント半減\",\"type\":\"party\",\"typeid\":\"-1\",\"viewType\":\"only\"}","{\"tag\":\"ecn\",\"name\":\"エンカウント無効\",\"type\":\"party\",\"typeid\":\"-1\",\"viewType\":\"only\"}","{\"tag\":\"bkn\",\"name\":\"不意打ち無効\",\"type\":\"party\",\"typeid\":\"-1\",\"viewType\":\"only\"}","{\"tag\":\"bku\",\"name\":\"先制攻撃率アップ\",\"type\":\"party\",\"typeid\":\"-1\",\"viewType\":\"only\"}","{\"tag\":\"mr2\",\"name\":\"獲得金額２倍\",\"type\":\"party\",\"typeid\":\"-1\",\"viewType\":\"only\"}","{\"tag\":\"ir2\",\"name\":\"アイテム入手率２倍\",\"type\":\"party\",\"typeid\":\"-1\",\"viewType\":\"only\"}"]
 *
 * @param elementsTextColor
 * @text 属性のテキストカラー
 * @desc 強化する時の確認画面で属性表示する時のテキストカラーを設定します。
 * @type struct<TypeIdTextColor>[]
 * @default ["{\"typeid\":\"1\",\"colorCode\":\"ffffff\"}","{\"typeid\":\"2\",\"colorCode\":\"ff8080\"}","{\"typeid\":\"3\",\"colorCode\":\"8080ff\"}","{\"typeid\":\"4\",\"colorCode\":\"dddd80\"}","{\"typeid\":\"5\",\"colorCode\":\"80aaff\"}","{\"typeid\":\"6\",\"colorCode\":\"aa8040\"}","{\"typeid\":\"7\",\"colorCode\":\"80ffaa\"}","{\"typeid\":\"8\",\"colorCode\":\"ffffaa\"}","{\"typeid\":\"9\",\"colorCode\":\"808080\"}"]
 * @parent settingUpgrade
 *
 * @param stateTextColor
 * @text ステートのテキストカラー
 * @desc 強化する時の確認画面でステート表示する時のテキストカラーを設定します。
 * @type struct<TypeIdTextColor>[]
 * @default ["{\"typeid\":\"4\",\"colorCode\":\"77ffaa\"}","{\"typeid\":\"5\",\"colorCode\":\"808080\"}","{\"typeid\":\"6\",\"colorCode\":\"aaaaaa\"}","{\"typeid\":\"7\",\"colorCode\":\"ff8080\"}","{\"typeid\":\"8\",\"colorCode\":\"aaaa80\"}","{\"typeid\":\"9\",\"colorCode\":\"ffddaa\"}","{\"typeid\":\"10\",\"colorCode\":\"dd80dd\"}","{\"typeid\":\"12\",\"colorCode\":\"dddd80\"}","{\"typeid\":\"13\",\"colorCode\":\"ffffaa\"}"]
 * @parent settingUpgrade
 *
 */
/*~struct~ViewCategoryParamList:
 *
 * @param categoryName
 * @text カテゴリーの表示名
 * @desc 表示するカテゴリーの名称を設定します。この名称は一意である必要があります。
 * @type string
 * @default アイテム
 * 
 * @param categoryType
 * @text カテゴリーの種類
 * @desc 表示するカテゴリーの種類を設定します。
 * @type select
 * @default item
 * @option アイテム
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @option 装備全般
 * @value equips
 * @option 全て（タイプID指定有効）
 * @value semiall
 * @option 全て（タイプID指定無効）
 * @value all
 * 
 * @param typeId
 * @text アイテムのタイプID設定
 * @desc カテゴリーで表示するタイプIDを「,」区切りで設定します。1:通常アイテム 2:大事なもの 0:全て表示
 * @type string
 * @default "1,2"
 * 
 */
/*~struct~VariableIconData:
 *
 * @param variableId
 * @text 変数ID
 * @desc 変数を素材とする時に、アイテム名の代わりに表示する名称をIDから設定します。
 * @type number
 * @default 1
 * 
 * @param iconId
 * @text 変数のアイコン番号
 * @desc 表示するアイコンのIDを設定します。0:アイコンなし
 * @type number
 * @default 0
 * 
 */
/*~struct~TypeIdTextColor:
 *
 * @param typeid
 * @text タイプID
 * @desc 属性やステートのIDを設定します。
 * @type number
 * @default 1
 * 
 * @param colorCode
 * @text カラーコード
 * @desc テキスト表示する時のカラーコードを設定します。
 * @type string
 * @default ffffff
 * 
 */
/*~struct~ParamData:
 * 
 * @param tag
 * @text タグ
 * @desc タグを設定します。このタグは一意である必要があります。
 * @type string
 * 
 * @param name
 * @text パラメータ名称
 * @desc パラメータの名称を設定します。
 * @type string
 * 
 * @param type
 * @text 参照タイプ
 * @desc 参照するパラメータのタイプを設定します。
 * @type select
 * @default param
 * @option 通常能力値
 * @value param
 * @option 追加能力値
 * @value xparam
 * @option 特殊能力値
 * @value sparam
 * @option 属性有効度
 * @value elementRate
 * @option 弱体有効度
 * @value debuffRate
 * @option ステート有効度
 * @value stateRate
 * @option ステート無効化
 * @value stateResist
 * @option 攻撃時属性
 * @value attackElement
 * @option 攻撃時ステート
 * @value attackState
 * @option スキルタイプ
 * @value skill
 * @option パーティー能力
 * @value party
 * 
 * @param typeid
 * @text 参照タイプID
 * @desc 参照するパラメータのIDを設定します。属性・ステート・弱体・スキルはメタデータのため、直接ID指定にする。
 * @type select
 * @default -1
 * @option 直接ID指定
 * @value -1
 * @option 最大HP,命中率,狙われ率
 * @value 0
 * @option 最大MP,回避率,防御効果率
 * @value 1
 * @option 攻撃力,会心率,回復効果率
 * @value 2
 * @option 防御力,会心回避率,薬の知識
 * @value 3
 * @option 魔法力,魔法回避率,MP消費率
 * @value 4
 * @option 魔法防御,魔法反射率,TPチャージ率
 * @value 5
 * @option 敏捷性,反撃率,物理ダメージ率
 * @value 6
 * @option 運,HP再生率,魔法ダメージ率
 * @value 7
 * @option MP再生率,床ダメージ率
 * @value 8
 * @option TP再生率,経験獲得率
 * @value 9
 * 
 * @param viewType
 * @text 表示タイプ
 * @desc パラメータの表示タイプを設定します。属性にはステート・弱体ステータスも含まれます。
 * @type select
 * @default base
 * @option 名称 999
 * @value base
 * @option 名称 999 ％
 * @value parcent
 * @option 属性 名称 99 ％
 * @value validity
 * @option 名称 属性
 * @value attack
 * @option 属性 名称
 * @value invalid
 * @option 名称
 * @value only
 * 
 */

(() => {
    'use strict';
    const pluginName = 'YKP_ItemComposition';

    // string => boolean
    YukiKP.ItemComposition.strBoolean = function(str) {
        return Function('return ' + str + ' === true')();
    };

    // number => "999...."
    YukiKP.ItemComposition.numberToNineText = function(num) {
        let text = '';
        for (let i = 0; i < num; i++) {
            text = text + '9';
        }
        return text;
    };

    // string "1:a,2:b,...." => array<map>
    YukiKP.ItemComposition.convertArrayMap = function(str) {
        const arrayList = str.split(',');
        let arrayMap = new Map();
        for (const item of arrayList) {
            const data = item.split(':');
            arrayMap.set(Number(data[0]), Number(data[1]));
        }
        return Object.assign(arrayMap);
    };
    // string "["1","2","3"....]" => array
    YukiKP.ItemComposition.convertArrayList = function(str) {
        return str ? str.replace(/[\"\[\]]/g, '').split(',') : [];

    };

    // struct<> => JSON.Object
    function structureData(params) {
      return JSON.parse(JSON.stringify(params, function(key, value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            try {
                return eval(value);
            } catch (e) {
                return value;
            }
        }
      }));
    }

    YukiKP.ItemComposition.structData = function(params) {
        return params ? structureData(params) : [];
    };

    // text width align
    YukiKP.ItemComposition.alignTextWidth = function(window, align, width, text, icon) {
        let textWidth = 0;
        if (align === 'center') {
            textWidth += width / 2 - window.textWidth(text) / 2;
            if (icon) {
                textWidth -= ImageManager.iconWidth / 2;
            }
        }
        if (align === 'rigth') {
            textWidth = width - window.textWidth(text);
            if (icon) {
                textWidth -= ImageManager.iconWidth / 2;
            }
        }
        return Math.floor(textWidth);
    }

    // 初期パラメータ設定
    const parameters                  = PluginManager.parameters(pluginName);
    const addMenuList                 = YukiKP.ItemComposition.strBoolean(parameters['addMenuList']);
    const menuListName                = parameters['menuListName'];
    const useMenuSwitchId             = Number(parameters['useMenuSwitchId']);
    const enabledMenuSwitchId         = Number(parameters['enabledMenuSwitchId']);
    const successSeName               = parameters['successSeName'];
    const successSeVolume             = Number(parameters['successSeVolume']);
    const successSePitch              = Number(parameters['successSePitch']);
    const successSePan                = Number(parameters['successSePan']);
    const maxViewNum                  = Number(parameters['maxViewNum']);
    const useMoneyWindow              = YukiKP.ItemComposition.strBoolean(parameters['useMoneyWindow']);
    const moneyType                   = Number(parameters['moneyType']);
    const moneyVariableId             = Number(parameters['moneyVariableId']);
    const moneyUnit                   = parameters['moneyUnit'];
    const useCompositionSwitchId      = Number(parameters['useCompositionSwitchId']);
    const enabledCompositionSwitchId  = Number(parameters['enabledCompositionSwitchId']);
    const compositionCategory         = YukiKP.ItemComposition.structData(parameters['compositionCategory']);
    const compositionHelpType         = YukiKP.ItemComposition.structData(parameters['compositionHelpType']);
    const compositionHelpSubText      = YukiKP.ItemComposition.structData(parameters['compositionHelpSubText']);
    const compositionViewGoldName     = YukiKP.ItemComposition.structData(parameters['compositionViewGoldName']);
    const compositionViewGoldIconId   = YukiKP.ItemComposition.structData(parameters['compositionViewGoldIconId']);
    const compositionVariableIconList = YukiKP.ItemComposition.structData(parameters['compositionVariableIconList']);
    const compositionSuccessText      = parameters['compositionSuccessText'];
    const useUpgradeSwitchId          = Number(parameters['useUpgradeSwitchId']);
    const enabledUpgradeSwitchId      = Number(parameters['enabledUpgradeSwitchId']);
    const exclusionActorId            = YukiKP.ItemComposition.convertArrayList(parameters['exclusionActorId']);
    const maxVisibleActors            = Number(parameters['maxVisibleActors']);
    const upgradeCategory             = YukiKP.ItemComposition.structData(parameters['upgradeCategory']);
    const upgradeHelpType             = YukiKP.ItemComposition.structData(parameters['upgradeHelpType']);
    const upgradeHelpSubText          = YukiKP.ItemComposition.structData(parameters['upgradeHelpSubText']);
    const upgradeSelectText           = YukiKP.ItemComposition.structData(parameters['upgradeSelectText']);
    const upgradeViewGoldName         = YukiKP.ItemComposition.structData(parameters['upgradeViewGoldName']);
    const upgradeViewGoldIconId       = YukiKP.ItemComposition.structData(parameters['upgradeViewGoldIconId']);
    const upgradeSelectItemName       = YukiKP.ItemComposition.structData(parameters['upgradeSelectItemName']);
    const upgradeSelectItemIconId     = YukiKP.ItemComposition.structData(parameters['upgradeSelectItemIconId']);
    const upgradeVariableIconList     = YukiKP.ItemComposition.structData(parameters['upgradeVariableIconList']);
    const upgradeSuccessText          = parameters['upgradeSuccessText'];
    const upgradeParamData            = YukiKP.ItemComposition.structData(parameters['upgradeParamData']);
    const elementsTextColor           = YukiKP.ItemComposition.structData(parameters['elementsTextColor']);
    const stateTextColor              = YukiKP.ItemComposition.structData(parameters['stateTextColor']);

    // 定数
    const modeComposition  = 'composition';
    const modeUpgrade      = 'upgrade';
    const modeCancel       = 'cancel';
    const categoryNone     = 'none';
    const categoryItem     = 'item';
    const categoryWeapon   = 'weapon';
    const categoryArmor    = 'armor';
    const categoryEquips   = 'equips';
    const categorySemiAll  = 'semiall';
    const categoryAll      = 'all';
    

    // 合成・強化をプラグインコマンドで実行させる
    // =============================================================================================
    PluginManager.registerCommand(pluginName, 'CompositionStart', args => {
        SceneManager.push(Scene_ItemComposition);
    });

    // メニュー画面に合成・強化を追加する
    // =============================================================================================

    YukiKP.ItemComposition.addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        YukiKP.ItemComposition.addOriginalCommands.call(this);
        // 追加するメニューコマンド
        if (this.isViewMenu()) {
            if (addMenuList && menuListName !== "") this.addCommand(menuListName, "itemComposition", this.isEnabledComposition());
        }
    };

    Window_MenuCommand.prototype.isViewMenu = function() {
        if (useMenuSwitchId === -1) return false;
        if (useMenuSwitchId === 0) return true;
        return $gameSwitches.value(useMenuSwitchId);
    };

    Window_MenuCommand.prototype.isEnabledComposition = function() {
        if (enabledMenuSwitchId === 0) return true;
        return $gameSwitches.value(enabledMenuSwitchId);
    };

    YukiKP.ItemComposition.createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        YukiKP.ItemComposition.createCommandWindow.call(this);
        this._commandWindow.setHandler("itemComposition", this.itemComposition.bind(this));
    };

    Scene_Menu.prototype.itemComposition = function() {
        SceneManager.push(Scene_ItemComposition);
    };

    // =============================================================================================

    // 合成・強化システムを追加する
    // =============================================================================================

    // =====================================
    // function struct
    // =====================================

    function CategoryData(mode, name, type, typeid) {
        this._mode = mode || '';
        this._name = name || '';
        this._type = type || '';
        this._typeid = typeid || '';
    }

    function ItemData(item , key, need, actor, enabled) {
        this._item = item  || null;
        this._key = key || null;
        this._need = need || null;
        this._actor = actor || null;
        this._enabled = enabled || false;
    }

    function ItemListData(mode, category, item) {
        this._mode = mode || '';
        this._category = category || '';
        this._item = item || null;
    }

    function CarrentData(mode, category, item) {
        this._mode = mode || '';
        this._category = category || '';
        this._item = item || null;
    }

    // =====================================
    // DataBase
    // =====================================

    // 初期化
    YukiKP.ItemComposition.initialize = function() {
        this.initProperty();
        this.refresh();
    };

    // 表示リストの更新
    YukiKP.ItemComposition.refresh = function() {
        this.initItemList();
    };

    // 選択モード設定
    YukiKP.ItemComposition.setMode = function(mode) {
        if (this._current._mode !== mode) {
            this._current._mode = mode;
        }
    };
    
    // ウィンドウからのモード取得
    YukiKP.ItemComposition.mode = function() {
        return this._current._mode;
    };

    // 選択カテゴリー設定
    YukiKP.ItemComposition.setCategory = function(category) {
        if (this._current._mode === modeCancel) return;
        if (this._current._category !== category) {
            this._current._category = category;
        }
    };

    // ウィンドウからのカテゴリー取得
    YukiKP.ItemComposition.category = function() {
        return this._current._category;
    };

    // 変数初期化
    YukiKP.ItemComposition.initProperty = function() {
        // カテゴリーリストを初期化
        this._categoryList = [];
        this.addCategoryList(modeComposition);
        this.addCategoryList(modeUpgrade);

        // 選択中のアイテムを初期化
        this._current = new CarrentData(modeCancel, categoryNone, null);
    };

    // カテゴリー追加
    YukiKP.ItemComposition.addCategoryList = function(mode) {
        let categoryList = [];
        if (mode === modeComposition) {
            categoryList = compositionCategory;
        } else if (mode === modeUpgrade) {
            categoryList = upgradeCategory;
        }

        for (const category of categoryList) {
            // カテゴリーデータ
            const name = category.categoryName;
            const type = category.categoryType;
            const id   = category.typeId;
            this._categoryList.push(new CategoryData(mode, name, type, id));
        }
    };

    // リスト初期化
    YukiKP.ItemComposition.initItemList = function() {
        this._itemLists = [];
        for (const category of this._categoryList) {
            this.addItemList(category);
        }
    };

    // 合成画面の表示
    YukiKP.ItemComposition.isViewComposition = function() {
        if (useCompositionSwitchId === -1) return false;
        if (useCompositionSwitchId === 0) return true;
        return $gameSwitches.value(useCompositionSwitchId);
    };

    // 強化画面の表示
    YukiKP.ItemComposition.isViewUpgrade = function() {
        if (useUpgradeSwitchId === -1) return false;
        if (useUpgradeSwitchId === 0) return true;
        return $gameSwitches.value(useUpgradeSwitchId);
    };

    // アイテムリストの追加
    YukiKP.ItemComposition.addItemList = function(category) {
        // カテゴリーデータ
        const mode = category._mode;
        const name = category._name;
        if (mode === modeCancel || name === categoryNone) return;

        const type = category._type;
        const strTypeId  = ''+ category._typeid;
        const typeidList = strTypeId ? strTypeId.split(',') : ['0'];

        // データベース
        const databaseList = this.DatabaseList(type);

        // データベースからアイテムデータを取得
        for (const database of databaseList) {
            for (const item of database) {
                if (!item) continue;

                // モード一致チェック
                if (mode ===  modeComposition && !item.meta.composition) continue;
                if (mode ===  modeUpgrade && !item.meta.upgrade) continue;

                // type 'all' 以外、タイプチェック
                if (type !== categoryAll) {
                    const itemType = this.itemContainer(item);
                    let typeCheck = null;
                    switch (itemType) {
                        case categoryItem:
                            typeCheck = ''+item.itypeId;
                            break;
                        case categoryWeapon:
                            typeCheck = ''+item.wtypeId;
                            break;
                        case categoryArmor:
                            typeCheck = ''+item.atypeId;
                            break;
                    }
                    if (!typeidList.includes('0') && !typeidList.includes(typeCheck)) continue;
                }

                const itemData = this.newItemData(mode, item);
                if (!itemData) continue;

                // 重複チェック
                if (this.itemDoubleCheck(item)) continue;

                // キーアイテムチェック
                if (!itemData._key) continue;
        
                this._itemLists.push(new ItemListData(mode, name, itemData));
            }
        }
    };

    // 重複チェック
    YukiKP.ItemComposition.itemDoubleCheck = function(item) {
        return this._itemLists.includes(item);
    };

    // カテゴリータイプからデータベースのリスト取得
    YukiKP.ItemComposition.DatabaseList = function(type) {
        let databaseList = [];
        switch (type) {
            case categoryItem:
                databaseList.push($dataItems);
                break;
            case categoryWeapon:
                databaseList.push($dataWeapons);
                break;
            case categoryArmor:
                databaseList.push($dataArmors);
                break;
            case categoryEquips:
                databaseList.push($dataWeapons);
                databaseList.push($dataArmors);
                break;
            case categorySemiAll:
            case categoryAll:
                databaseList.push($dataItems);
                databaseList.push($dataWeapons);
                databaseList.push($dataArmors);
                break;
        }
        return Object.assign(databaseList);
    };

    // アイテムデータを生成
    YukiKP.ItemComposition.newItemData = function(mode, item) {
        // アイテムデータ
        const mainItem = this.item(mode, item);
        if (!mainItem) return null;
        const keyItem = this.keyItem(mode, item);
        const needItems = this.needItems(mode, item);
        const actorEquip = this.actorEquip(mode, needItems);
        const itemEnabled = this.itemEnabled(mode, item, needItems);

        return new ItemData(mainItem, keyItem, needItems, actorEquip, itemEnabled);
    };
    
    // メインアイテム取得
    YukiKP.ItemComposition.item = function(mode, item) {
        if (mode === modeComposition) {
            // 合成モード...データベースのアイテム
            return item;
        } else if (mode === modeUpgrade) {
            // 強化モード...メタデータ:1番目のデータ
            const metaDataList = item.meta.upgrade.split(',');
            if (metaDataList.length < 2) return null;

            const metaData = metaDataList[0];
            if (metaData === '0') return null;

            return Object.assign(this.convertDatabase(metaData));
        }
    };

    // キーアイテム有無
    YukiKP.ItemComposition.keyItem = function(mode, item) {
        if (mode === modeComposition) {
            // 合成モード...メタデータ:1番目のデータ（スイッチ番号）
            const metaDataList = item.meta.composition.split(',');
            if (metaDataList.length < 2) return null;

            const metaData = metaDataList[0];
            if (metaData !== '0') {
                return this.convertDatabase('s['+ metaData +']');
            } else {
                return true;
            }
        } else if (mode === modeUpgrade) {
            // 強化モード...パーティー所持にデータベースのアイテム
            return this.upgradeKeyItemEnabled(item);
        }
    };

    YukiKP.ItemComposition.exclusionInculudes = function(id) {
        return exclusionActorId.find(el => Number(el) === id) ? true : false;
    };

    // 強化システムのキーアイテム有効チェック
    YukiKP.ItemComposition.upgradeKeyItemEnabled = function(item) {
        let result = false;

        if ($gameParty.hasItem(item, false)) {
            // パーティー所持にアイテムがある
            result = true;
        } else if ($gameParty.hasItem(item, true)) {
            // 所持品にはないが、誰かが装備している
            // キーアイテムを装備しているアクターを検索
            for (const member of $gameParty.members()) {
                // 除外アクターの場合は無効
                if (this.exclusionInculudes(member.actorId())) continue;
    
                // キーアイテムと一致するアイテムを装備している場合は有効
                if (member.isEquipped(item)) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    };

    // 素材アイテム取得
    YukiKP.ItemComposition.needItems = function(mode, item) {
        let needList = [];
        let metaDataList = {};
        if (mode === modeComposition) {
            metaDataList = item.meta.composition.split(',');
        } else if (mode === modeUpgrade) {
            metaDataList = item.meta.upgrade.split(',');
        }
        if (metaDataList.length < 2) return needItems;

        // メタデータ 1 ... スイッチ番号、強化後アイテムIDは素材から除外
        metaDataList.shift();

        if (mode === modeUpgrade) {
            // 強化前のアイテムを素材データに登録
            const needItem = [item, 1];
            needList.push(Object.assign(needItem));
        }
    
        // メタデータ 2 以降を素材データとして登録
        for (const data of metaDataList) {
            let needItem = [];
            const needData = data.split(' ');     // 0...x[n] 1...num
            needItem = [this.convertDatabase(needData[0]), Number(needData[1])];
            needList.push(Object.assign(needItem));
        }

        return Object.assign(needList);
    };

    // 強化キーアイテムの装備中アクター
    YukiKP.ItemComposition.actorEquip = function(mode, needs) {
        let actorIdList = [];
        if (mode === modeComposition) {
            // 合成モード...装備中アイテムを参照しない
        } else if (mode === modeUpgrade) {
            // 強化モード...キーアイテムを装備中のアクターIDを参照
            // キーアイテム情報を取得 needリスト:1番目
            const keyItem = needs[0][0];

            // キーアイテムを装備しているアクターを検索
            for (const member of $gameParty.members()) {
                // 除外アクターの場合はスキップ
                if (this.exclusionInculudes(member.actorId())) continue;

                // キーアイテムと一致するアイテムを装備している場合は actorId を登録
                if (member.isEquipped(keyItem)) actorIdList.push(member.actorId());
            }
        }
        return Object.assign(actorIdList);
    };

    // アイテム選択可否取得
    YukiKP.ItemComposition.itemEnabled = function(mode, item, needs) {
        // 作成アイテムの所持上限数チェック
        const partyItemNum = $gameParty.numItems(item);
        const itemMaxNum = $gameParty.maxItems(item);

        if (partyItemNum === itemMaxNum) return false;

        // 素材アイテムの必要数チェック
        const includeEquip = mode === modeUpgrade ? true : false;
        let enabled = true;
        for (const need of needs) {
            if (this.hasNeedItems(includeEquip, need[0], need[1])) continue;
            enabled = false;
            break;
        }
        return enabled;
    };

    // 素材アイテムのパーティー所持確認 true...規定数あり,false...なし
    YukiKP.ItemComposition.hasNeedItems = function(mode, item, num) {
        const type = this.itemContainer(item);
        let result = false;
        switch (type) {
            case 'item':
                if ($gameParty.numItems(item) >= num) result = true;
                break;
            case 'weapon':
            case 'armor':
                if ($gameParty.hasItem(item, mode)) {
                    let partyNum = $gameParty.numItems(item);
                    // キーアイテムを装備しているアクターを検索
                    for (const member of $gameParty.members()) {
                        // 除外アクターの場合はスキップ
                        if (this.exclusionInculudes(member.actorId())) continue;
        
                        // アイテムと一致するアイテムを装備している場合は所持数を加算
                        if (member.isEquipped(item)) partyNum++;
                    }
                    if (partyNum >= num) result = true;
                }
                break;
            case 'variable':
                if ($gameVariables.value(item) >= num) result = true;
                break;
            case 'gold':
                if ($gameParty.gold() >= num) result = true;
                break;
        }
        return result;
    };

    // 合成可能なアイテム上限数
    YukiKP.ItemComposition.createMaxNumber = function(needs) {
        let maxNumber = 99;
        for (const cost of needs) {
            const type = this.itemContainer(cost[0]);
            let checkNumber = 99;
            switch (type) {
                case 'item':
                case 'weapon':
                case 'armor':
                    checkNumber = Math.floor($gameParty.numItems(cost[0]) / cost[1]);
                    break;
                case 'variable':
                    checkNumber = Math.floor($gameVariables.value(cost[0]) / cost[1]);
                    break;
                case 'gold':
                    checkNumber = Math.floor($gameParty.gold() / cost[1]);
                    break;
            }
            if (maxNumber > checkNumber) maxNumber = checkNumber;
        }
        return maxNumber;
    };

    // 合成・強化完了
    YukiKP.ItemComposition.successAction = function(item, needs, actorIndex, num) {
        let equipSlot = -1;
        // アクターを選択している場合はキーアイテムの装備を外す
        if (0 <= actorIndex && actorIndex < $gameParty.members().length) {
            // 強化後アイテムが装備可能であれば、装備スロットを保存
            const member = $gameParty.members()[actorIndex];
            const canEquip = member.canEquip(item);
            const equips = member.equips();
            if (canEquip) equipSlot = equips.indexOf(needs[0][0]);
            member.discardEquip(needs[0][0]);

            // パーティー所持に強化前アイテムを一時的に追加する
            $gameParty.gainItem(needs[0][0], needs[0][1]);
        }
        // パーティー所持から素材アイテムの減少
        for (const cost of needs) {
            const type = this.itemContainer(cost[0]);
            switch (type) {
                case 'item':
                case 'weapon':
                case 'armor':
                    $gameParty.loseItem(cost[0], cost[1] * num, false);
                    break;
                case 'variable':
                    let newNum = $gameVariables.value(cost[0]) - cost[1] * num;
                    $gameVariables.setValue(cost[0], newNum);
                    break;
                case 'gold':
                    $gameParty.loseGold(cost[1] * num);
                    break;
            }
        }

        if (0 <= actorIndex && 0 <= equipSlot) {
            // 装備可能なアクターを選択している場合は装備させる
            $gameParty.members()[actorIndex].forceChangeEquip(equipSlot, item);
        } else {
            // パーティー所持に合成アイテムの増加
            $gameParty.gainItem(item, num);
        }
    };

    // アイテムのカテゴリー識別
    YukiKP.ItemComposition.itemContainer = function(item) {
        if (!item) {
            return null;
        } else if (item === 'gold') {
            return 'gold';
        } else if (DataManager.isItem(item)) {
            return 'item';
        } else if (DataManager.isWeapon(item)) {
            return 'weapon';
        } else if (DataManager.isArmor(item)) {
            return 'armor';
        } else if ($gameVariables.value(item)){
            return 'variable';
        } else {
            return null;
        }
    };

    // i[n],w[n],a[n],s[n],v[n],g をオブジェクトに変換
    YukiKP.ItemComposition.convertDatabase = function(item) {
        const type = item.substr(0, 1);
        let itemId = 0;
        if (item.match(/\[\d{1,}\]/)) {
            itemId = Number(item.substr(2, item.length-3));
        }
        return this.getDatabase(type, itemId);
    };
    
    // オブジェクト変換
    YukiKP.ItemComposition.getDatabase = function(type, itemId) {
        let database = null;
        if (!Number.isInteger(itemId)) return database;
        switch (type) {
            case 'i':
            case 'item':
                database = $dataItems[itemId];
                break;
            case 'w':
            case 'weapon':
                database = $dataWeapons[itemId];
                break;
            case 'a':
            case 'armor':
                database = $dataArmors[itemId];
                break;
            case 's':
            case 'switche':
                database = $gameSwitches.value(itemId);
                break;
            case 'v':
            case 'variable':
                database = itemId;
                break;
            case 'g':
            case 'gold':
                database = 'gold';
                break;
        }
        return database;
    };

    // 選択カテゴリーのアイテムリストに登録されているデータを取得
    YukiKP.ItemComposition.currentItemList = function() {
        if (this._current._mode === modeCancel)  return null;
        if (this._current._category === categoryNone)  return null;

        const currentItemList = this._itemLists.filter((item) => item._mode === this._current._mode && item._category === this._current._category);
        return currentItemList;
    };

    // 選択カテゴリーのアイテムリストに登録されている個数を取得
    YukiKP.ItemComposition.currentItemListNum = function() {
        const currentItemList = this.currentItemList();
        return currentItemList ? currentItemList.length : 0;
    };

    // アイテムのアイコン・名称を表示
    YukiKP.ItemComposition.drawItemName = function(window, item, x, y, width) {
        const iconY = y + (window.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, width - textMargin);
        if (item === 'gold') {
            let viewGold = null;
            if (YukiKP.ItemComposition._current._mode === modeComposition) {
                viewGold = [compositionViewGoldName, compositionViewGoldIconId];
            } else if (YukiKP.ItemComposition._current._mode === modeUpgrade) {
                viewGold = [upgradeViewGoldName, upgradeViewGoldIconId];
            }
            if (viewGold) {
                // お金アイコン・名称表示
                if (viewGold[1] !== '0') {
                    window.drawIcon(Number(viewGold[1]), x, iconY);
                }
                window.drawText(viewGold[0], x + textMargin, y, itemWidth);
            } else {
                window.drawText('お金', x + textMargin, y, itemWidth);
            }
        } else if (Number.isInteger(item)) {
            // 変数アイコン・名称表示
            let viewVariableList = null;
            if (YukiKP.ItemComposition._current._mode === modeComposition) {
                viewVariableList = compositionVariableIconList;
            } else if (YukiKP.ItemComposition._current._mode === modeUpgrade) {
                viewVariableList = upgradeVariableIconList;
            }
            if (viewVariableList) {
                const viewVariable = viewVariableList.find((data) => data.variableId === item)
                if (viewVariable) {
                    if (viewVariable.iconId !== 0) {
                        window.drawIcon(Number(viewVariable.iconId), x, iconY);
                    }
                }
            }
            window.drawText($dataSystem.variables[item], x + textMargin, y, itemWidth);
        } else {
            // アイテムアイコン・名称表示
            window.drawIcon(item.iconIndex, x, iconY);
            window.drawText(item.name, x + textMargin, y, itemWidth);
        }
    };

    // アイテムの指定数・所持数を表示
    YukiKP.ItemComposition.drawItemNumber = function(window, item, x, y, width, num) {
        // 書式 :+999999(+999999)
        let viewText = '';
        let signWidth = 0;
        let textWidth = 0;

        if (item[0] === 'gold') {
            // お金素材
            viewText = '' + $gameParty.gold();
            let maxTextWidth = this.numberWidth(window, maxViewNum * 2 + 5);
            const textNum = window.textWidth(viewText);
            if (this.numberWidth(window, maxViewNum) < textNum) {
                // 桁数超過処理
                viewText = YukiKP.ItemComposition.numberToNineText(maxViewNum) + '+';
            }
            signWidth = width - maxTextWidth + this.numberWidth(window, 1);
            textWidth = width - maxTextWidth + this.numberWidth(window, maxViewNum + 2);
        } else if (Number.isInteger(item[0])) {
            // 変数素材
            viewText = '' + $gameVariables.value(item[0]);
            let maxTextWidth = this.numberWidth(window, maxViewNum * 2 + 5);
            const textNum = window.textWidth(viewText);
            if (this.numberWidth(window, maxViewNum) < textNum) {
                // 桁数超過処理
                viewText = YukiKP.ItemComposition.numberToNineText(maxViewNum) + '+';
            }
            signWidth = width - maxTextWidth + this.numberWidth(window, 1);
            textWidth = width - maxTextWidth + this.numberWidth(window, maxViewNum + 2);
        } else {
            // アイテム・武器・防具素材
            viewText = $gameParty.numItems(item[0]);
            signWidth = width - window.textWidth("99(99)");
            textWidth = width - window.textWidth("(99)");
        }
        // 区切り
        window.drawText(":", x, y, signWidth, "right");
        
        // 必要数
        if (!num || 1 > num) num = 1;
        window.drawText(item[1] * num, x, y, textWidth, "right");

        // 所持数
        window.drawText("(", x, y, textWidth + window.textWidth("("), "right");
        window.drawText(viewText, x, y, width - window.textWidth(")"), "right");
        window.drawText(")", x, y, width, "right");
    };
    
    YukiKP.ItemComposition.numberWidth = function(window, num) {
        return window.textWidth(this.numberToNineText(num));
    };

    YukiKP.ItemComposition.getElementName = function(type, id) {
        let result = "";
        switch (type) {
            case 'debuffRate':
                // TODO パラメータ名称の取得方法
                result = TextManager.param(id);
                break;
            case 'elementRate':
            case 'attackElement':
                result = $dataSystem.elements[id];
                break;
            case 'stateRate':
            case 'stateResist':
            case 'attackState':
                result = $dataStates[id].name;
                break;
            case 'skill':
                result = $dataSkills[id].name;
                break;
            case 'param':
            case 'xparam':
            case 'sparam':
            case 'party':
                break;
        }
        return result;
    };
    
    // 合成・強化成功時のSE
    YukiKP.ItemComposition.playSuccessSe = function() {
        if (successSeName === "") return;
        const se = {
            name: successSeName,
            volume: successSeVolume,
            pitch: successSePitch,
            pan: successSePan,
        }
        AudioManager.playSe(se);
    };

    // =====================================
    // Sprite Upgrade
    // =====================================

    // Sprite_ItemUpgradeActorCharacter
    function Sprite_ItemUpgradeActorCharacter() {
        this.initialize(...arguments);
    }

    Sprite_ItemUpgradeActorCharacter.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_ItemUpgradeActorCharacter.prototype.constructor = Sprite_ItemUpgradeActorCharacter;

    Sprite_ItemUpgradeActorCharacter.prototype.initialize = function(actor, clickHandler) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._actor = actor;
        this._clickHandler = clickHandler;
        this._opacityBitmap = null;
        this._holdState = null;
        this._holdPSize = { pw: 0, ph: 0 };
    };

    Sprite_ItemUpgradeActorCharacter.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        if (this._holdState != null) {
            const { enabled, equipState } = this._holdState;
            const updated = this.updateBitmap(enabled, equipState);
            if (updated) this._holdState = null;
        }
    };

    Sprite_ItemUpgradeActorCharacter.prototype.changeEquipState = function(enabled, equipState) {
        this._holdState = { enabled, equipState };
    };

    Sprite_ItemUpgradeActorCharacter.prototype.updateBitmap = function(enabled, equipState) {
        const opacity = enabled ? 255 : 128;

        const characterBitmap = ImageManager.loadCharacter(this._actor.characterName());
        if (!characterBitmap.isReady()) return false;
        const big = ImageManager.isBigCharacter(this._actor.characterName());
        const pw = characterBitmap.width / (big ? 3 : 12);
        const ph = characterBitmap.height / (big ? 4 : 8);

        let holdPSizeChanged = false;
        if (this._holdPSize.pw != pw || this._holdPSize.ph != ph) {
            holdPSizeChanged = true;
            this._holdPSize.pw = pw;
            this._holdPSize.ph = ph;
        }

        const n = big ? 0: this._actor.characterIndex();
        const sx = ((n % 4) * 3 + 1) * pw;
        const sy = Math.floor(n / 4) * 4 * ph;

        if (!this._opacityBitmap || holdPSizeChanged) this._opacityBitmap = new Bitmap(pw, ph);
        this._opacityBitmap.clear();
        this._opacityBitmap.paintOpacity = opacity;
        this._opacityBitmap.blt(characterBitmap, sx, sy, pw, ph, 0, 0);

        if (!this.bitmap || holdPSizeChanged) this.bitmap = new Bitmap(pw, ph);
        this.bitmap.clear();
        this.bitmap.blt(this._opacityBitmap, 0, 0, pw, ph, 0, 0);

        this.bitmap.fontFace = $gameSystem.mainFontFace();
        switch (equipState) {
            case 'cannot':
                this.bitmap.fontSize = 24;
                this.bitmap.textColor = "#ff0000";
                this.bitmap.drawText("×", 32, 32, 16, 16);
                break;
            case 'equipped':
                this.bitmap.fontSize = 20;
                this.bitmap.textColor = "#ffffff";
                this.bitmap.drawText("Ｅ", 32, 32, 16, 16);
                break;
            case 'releace':
                this.bitmap.fontSize = 20;
                this.bitmap.textColor = "#ff6666";
                this.bitmap.drawText("Ｅ", 32, 32, 16, 16);
                break;
        }
        return true;
    };

    Sprite_ItemUpgradeActorCharacter.prototype.onMouseEnter = function() {
        this._clickHandler(this._actor);
    };

    Sprite_ItemUpgradeActorCharacter.prototype.onClick = function() {
        this._clickHandler(this._actor);
    };

    // Sprite_ItemUpgradeItemIcon
    function Sprite_ItemUpgradeItemIcon() {
        this.initialize(...arguments);
    }

    Sprite_ItemUpgradeItemIcon.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_ItemUpgradeItemIcon.prototype.constructor = Sprite_ItemUpgradeItemIcon;

    Sprite_ItemUpgradeItemIcon.prototype.initialize = function(clickHandler) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._clickHandler = clickHandler;
        this._opacityBitmap = null;
        this._holdState = null;
        this._holdPSize = { pw: 0, ph: 0 };
    };

    Sprite_ItemUpgradeItemIcon.prototype.update = function() {
        Sprite_Clickable.prototype.update.call(this);
        if (this._holdState != null) {
            const { enabled, equipState } = this._holdState;
            const updated = this.updateBitmap(enabled, equipState);
            if (updated) this._holdState = null;
        }
    };

    Sprite_ItemUpgradeItemIcon.prototype.changeEquipState = function(enabled, equipState) {
        this._holdState = { enabled, equipState };
    };

    Sprite_ItemUpgradeItemIcon.prototype.updateBitmap = function(enabled, equipState) {
        const opacity = enabled ? 255 : 128;

        const itemIconBitmap = ImageManager.loadSystem("IconSet");
        if (!itemIconBitmap.isReady()) return false;
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (upgradeSelectItemIconId % 16) * pw;
        const sy = Math.floor(upgradeSelectItemIconId / 16) * ph;

        let holdPSizeChanged = false;
        if (this._holdPSize.pw != pw || this._holdPSize.ph != ph) {
            holdPSizeChanged = true;
            this._holdPSize.pw = pw;
            this._holdPSize.ph = ph;
        }

        if (!this._opacityBitmap || holdPSizeChanged) this._opacityBitmap = new Bitmap(pw, ph);
        this._opacityBitmap.clear();
        this._opacityBitmap.paintOpacity = opacity;
        this._opacityBitmap.blt(itemIconBitmap, sx, sy, pw, ph, 0, 0);

        if (!this.bitmap || holdPSizeChanged) this.bitmap = new Bitmap(pw, ph);
        this.bitmap.clear();
        this.bitmap.blt(this._opacityBitmap, 0, 0, pw, ph, 0, 0);

        this.bitmap.fontFace = $gameSystem.mainFontFace();
        switch (equipState) {
            case 'cannot':
                this.bitmap.fontSize = 24;
                this.bitmap.textColor = "#ff0000";
                this.bitmap.drawText("×", 16, 16, 16, 16);
                break;
            case 'ok':
                this.bitmap.fontSize = 20;
                this.bitmap.textColor = "#ffffff";
                this.bitmap.drawText("○", 16, 16, 16, 16);
                break;
        }
        return true;
    };

    Sprite_ItemUpgradeItemIcon.prototype.onMouseEnter = function() {
        this._clickHandler(this._actor);
    };

    Sprite_ItemUpgradeItemIcon.prototype.onClick = function() {
        this._clickHandler(this._actor);
    };

    // Sprite_ItemUpgradeTriangleDrawer
    function Sprite_ItemUpgradeTriangleDrawer() {
        this.initialize(...arguments);
    }

    Sprite_ItemUpgradeTriangleDrawer.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_ItemUpgradeTriangleDrawer.prototype.constructor = Sprite_ItemUpgradeTriangleDrawer;

    Sprite_ItemUpgradeTriangleDrawer.prototype.initialize = function(bitmap) {
        this._bitmap = bitmap;
    };

    Sprite_ItemUpgradeTriangleDrawer.prototype.drawTriangle = function(x1, y1, x2, y2, x3, y3, strokeColor, fillColor) {
        const ctx = this._bitmap._context;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = fillColor;
        ctx.fill();
    };

    // Sprite_ItemUpgradeArrow
    function Sprite_ItemUpgradeArrow() {
        this.initialize(...arguments);
    }

    Sprite_ItemUpgradeArrow.prototype = Object.create(Sprite_Clickable.prototype);
    Sprite_ItemUpgradeArrow.prototype.constructor = Sprite_ItemUpgradeArrow;

    Sprite_ItemUpgradeArrow.prototype.initialize = function(clickHandler) {
        Sprite_Clickable.prototype.initialize.call(this);
        this._clickHandler = clickHandler;
        this.createBitmap();
    };

    Sprite_ItemUpgradeArrow.prototype.onClick = function() {
        this._clickHandler(this._actor);
    };

    Sprite_ItemUpgradeArrow.prototype.createBitmap = function() {
    };

    Sprite_ItemUpgradeArrow.prototype.drawTriangle = function(x1, y1, x2, y2, x3, y3, strokeColor, fillColor) {
        new Sprite_ItemUpgradeTriangleDrawer(this.bitmap).drawTriangle(x1, y1, x2, y2, x3, y3, strokeColor, fillColor);
    };

    // Sprite_ItemUpgradeLeftArrow
    function Sprite_ItemUpgradeLeftArrow() {
        this.initialize(...arguments);
    }

    Sprite_ItemUpgradeLeftArrow.prototype = Object.create(Sprite_ItemUpgradeArrow.prototype);
    Sprite_ItemUpgradeLeftArrow.prototype.constructor = Sprite_ItemUpgradeLeftArrow;

    Sprite_ItemUpgradeLeftArrow.prototype.initialize = function(clickHandler) {
        Sprite_ItemUpgradeArrow.prototype.initialize.call(this, clickHandler);
    };
    
    Sprite_ItemUpgradeLeftArrow.prototype.createBitmap = function() {
        this.bitmap = new Bitmap(24, 24);
        const w = 12;
        const h = 12;
        const x1 = 8;
        const y1 = 8 + h / 2;
        const x2 = x1 + w;
        const y2 = 8;
        const x3 = x2;
        const y3 = 8 + h;
        this.drawTriangle(x1, y1, x2, y2, x3, y3, "#000000", "#ffffff");
    };

    // Sprite_ItemUpgradeRightArrow
    function Sprite_ItemUpgradeRightArrow() {
        this.initialize(...arguments);
    }

    Sprite_ItemUpgradeRightArrow.prototype = Object.create(Sprite_ItemUpgradeArrow.prototype);
    Sprite_ItemUpgradeRightArrow.prototype.constructor = Sprite_ItemUpgradeRightArrow;

    Sprite_ItemUpgradeRightArrow.prototype.initialize = function(clickHandler) {
        Sprite_ItemUpgradeArrow.prototype.initialize.call(this, clickHandler);
    };

    Sprite_ItemUpgradeRightArrow.prototype.createBitmap = function() {
        this.bitmap = new Bitmap(24, 24);
        const w = 12;
        const h = 12;
        const x1 = 8 + w;
        const y1 = 8 + h / 2;
        const x2 = 8;
        const y2 = 8;
        const x3 = x2;
        const y3 = 8 + h;
        this.drawTriangle(x1, y1, x2, y2, x3, y3, "#000000", "#ffffff");
    };

    // =====================================
    // Window Base
    // =====================================

    // Window_ItemCompositionCategoryBase
    function Window_ItemCompositionCategoryBase() {
        this.initialize(...arguments);
    }

    Window_ItemCompositionCategoryBase.prototype = Object.create(Window_HorzCommand.prototype);
    Window_ItemCompositionCategoryBase.prototype.constructor = Window_ItemCompositionCategoryBase;
    
    Window_ItemCompositionCategoryBase.prototype.initialize = function(rect, mode) {
        this._mode = mode;
        // 設定されたモードと一致するカテゴリーアイテムを取得
        this._categorys = YukiKP.ItemComposition._categoryList.filter((category) => category._mode === this._mode);
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };
    
    Window_ItemCompositionCategoryBase.prototype.maxCols = function() {
        return this._categorys.length;
    };
    
    Window_ItemCompositionCategoryBase.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        if (YukiKP.ItemComposition.mode() === this._mode) {
            YukiKP.ItemComposition.setCategory(this.currentSymbol());
            this.setItemNum(YukiKP.ItemComposition.currentItemListNum());
            if (this._itemWindow) {
                this._itemWindow.setCategory(this.currentSymbol());
            }
        }
    };

    Window_ItemCompositionCategoryBase.prototype.setItemNum = function(itemNum) {
        this._itemNum = itemNum;
    };

    Window_ItemCompositionCategoryBase.prototype.isCurrentItemEnabled = function() {
        return this._itemNum > 0;
    };
    
    Window_ItemCompositionCategoryBase.prototype.makeCommandList = function() {
        for (const category of this._categorys) {
            this.addCommand(category._name, category._name);
        }
    };
    
    Window_ItemCompositionCategoryBase.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
    };
    
    Window_ItemCompositionCategoryBase.prototype.needsSelection = function() {
        return this.maxItems() >= 2;
    };

    // Window_ItemCompositionMainBase
    function Window_ItemCompositionMainBase() {
        this.initialize(...arguments);
    }

    Window_ItemCompositionMainBase.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemCompositionMainBase.prototype.constructor = Window_ItemCompositionMainBase;

    Window_ItemCompositionMainBase.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_ItemCompositionMainBase.prototype.setCategory = function(category) {
        if (this._category !== category) {
            this._category = category;
            this.refresh();
            this.scrollTo(0, 0);
        }
    };

    Window_ItemCompositionMainBase.prototype.maxItems = function() {
        return this._data ? this._data.length : 0;
    };

    Window_ItemCompositionMainBase.prototype.item = function() {
        return this._data[this.index()];
    };

    Window_ItemCompositionMainBase.prototype.cost = function() {
        return this._cost[this.index()];
    };

    Window_ItemCompositionMainBase.prototype.isCurrentItemEnabled = function() {
        return this.isEnabled(this.index());
    };

    Window_ItemCompositionMainBase.prototype.actorEquip = function(index) {
        return this._epuipActor && index >= 0 ? this._epuipActor[index] : [];
    };

    Window_ItemCompositionMainBase.prototype.isEnabled = function(index) {
        return this._enabled && index >= 0 ? this._enabled[index] : false;
    };

    Window_ItemCompositionMainBase.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_ItemCompositionMainBase.prototype.refresh = function() {
        this.clearItem();
        this.makeItemList();
        this.createContents();
        this.drawAllItems();
    };

    Window_ItemCompositionMainBase.prototype.clearItem = function() {
        this._data = [];
        this._cost = [];
        this._epuipActor = [];
        this._enabled = [];
    };

    Window_ItemCompositionMainBase.prototype.makeItemList = function() {
        const itemList = YukiKP.ItemComposition.currentItemList();
        if (!itemList) return;

        // ウィンドウにリスト登録
        for (const item of itemList) {
            const itemData = item._item;
            this._data.push(itemData._item);
            this._cost.push(itemData._need);
            this._epuipActor.push(itemData._actor)
            this._enabled.push(itemData._enabled);
        }
    };

    Window_ItemCompositionMainBase.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        if (item) {
            const rect = this.itemLineRect(index);
            this.changePaintOpacity(this.isEnabled(index));
            const nameWidth = rect.width - this.textWidth("99");
            this.drawItemName(item, rect.x, rect.y, nameWidth);
            const numberX = rect.x + nameWidth;
            this.drawText(":", numberX - this.textWidth("9"), rect.y, this.textWidth("9"), "right");
            const actors = this.actorEquip(index);
            if (0 < actors.length) {
                this.drawText("Ｅ", numberX, rect.y, this.textWidth("99"), "right");
            } else {
                this.drawText($gameParty.numItems(item), numberX, rect.y, this.textWidth("99"), "right");
            }
            this.changePaintOpacity(true);
        }
    };

    Window_ItemCompositionMainBase.prototype.updateHelp = function() {
        this.setHelpWindowItem();
        if (this._needsWindow) {
            this._needsWindow.setItem(this.cost());
        }
    };

    Window_ItemCompositionMainBase.prototype.setNeedsWindow = function(needsWindow) {
        this._needsWindow = needsWindow;
        this.callUpdateHelp();
    };

    Window_ItemCompositionMainBase.prototype.checkIndex = function() {
        let index = this.index();
        //アイテムリストがない場合
        if (this._data.length === 0) index = -1;
        // アイテムリストが選択位置より少ない場合
        if (this._data.length <= index) index = index - 1;
        // それ以外
        return index;
    };

    // Window_ItemCompositionNeedBase
    function Window_ItemCompositionNeedBase() {
        this.initialize(...arguments);
    }

    Window_ItemCompositionNeedBase.prototype = Object.create(Window_Base.prototype);
    Window_ItemCompositionNeedBase.prototype.constructor = Window_ItemCompositionNeedBase;

    Window_ItemCompositionNeedBase.prototype.initialize = function(rect) {
        this._windowRact = Object.assign(rect);
        Window_Base.prototype.initialize.call(this, rect);
        this.clearItem();
    };

    Window_ItemCompositionNeedBase.prototype.startIndex = function() {
        return 0;
    };

    Window_ItemCompositionNeedBase.prototype.setItem = function(cost) {
        if (!cost) return;
        this._cost = Object.assign(cost);
        this.refresh();
    };

    Window_ItemCompositionNeedBase.prototype.clearItem = function() {
        this._cost = [];
        this.refresh();
    };

    Window_ItemCompositionNeedBase.prototype.maxCols = function() {
        return 1;
    };

    Window_ItemCompositionNeedBase.prototype.colSpacing = function() {
        return 1;
    };
    
    Window_ItemCompositionNeedBase.prototype.rowSpacing = function() {
        return 6;
    };

    Window_ItemCompositionNeedBase.prototype.itemWidth = function() {
        return Math.floor(this.innerWidth / this.maxCols());
    };
    
    Window_ItemCompositionNeedBase.prototype.itemHeight = function() {
        return Window_Scrollable.prototype.itemHeight.call(this) + 8;
    };

    Window_ItemCompositionNeedBase.prototype.refresh = function() {
        this.contents.clear();
        if (this._cost) {
            const numberWidth = YukiKP.ItemComposition.numberWidth(this, 6);
            const start = this.startIndex();
            for (let i = start; i < this._cost.length; i++) {
                const rect = this.itemRect(i - start);
                this.drawItem(this._cost[i], rect, numberWidth);
            }
        }
    };

    Window_ItemCompositionNeedBase.prototype.drawItem = function(cost, rect, numberWidth) {
        if (cost) {
            this.changePaintOpacity(this.isEnabled(cost));
            this.drawItemName(cost[0], rect.x, rect.y, rect.width - numberWidth);
            this.drawItemNumber(cost, rect.x, rect.y, rect.width);
            this.changePaintOpacity(true);
        }
    };

    Window_ItemCompositionNeedBase.prototype.drawItemName = function(item, x, y, width) {
        if (item) YukiKP.ItemComposition.drawItemName(this, item, x, y, width);
    };

    Window_ItemCompositionNeedBase.prototype.drawItemNumber = function(item, x, y, width) {
        if (item) YukiKP.ItemComposition.drawItemNumber(this, item, x, y, width);
    };

    Window_ItemCompositionNeedBase.prototype.itemRect = function(index) {
        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const x = col * itemWidth + colSpacing / 2;
        const y = row * itemHeight + rowSpacing / 2;
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    }

    Window_ItemCompositionNeedBase.prototype.isEnabled = function(cost) {
        return YukiKP.ItemComposition.hasNeedItems(YukiKP.ItemComposition.mode(), cost[0], cost[1]);
    }

    // =====================================
    // Window Intarface
    // =====================================

    // Window_ItemCompositionCommand
    function Window_ItemCompositionCommand() {
        this.initialize(...arguments);
    }

    Window_ItemCompositionCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_ItemCompositionCommand.prototype.constructor = Window_ItemCompositionCommand;

    Window_ItemCompositionCommand.prototype.initialize = function(rect) {
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };

    Window_ItemCompositionCommand.prototype.maxCols = function() {
        return 3;
    };

    Window_ItemCompositionCommand.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
        YukiKP.ItemComposition.setMode(this.currentSymbol());
    };

    Window_ItemCompositionCommand.prototype.makeCommandList = function() {
        if (YukiKP.ItemComposition.isViewComposition()) {
            this.addCommand("合成する", "composition", this.isEnabledComposition());
        }
        if (YukiKP.ItemComposition.isViewUpgrade()) {
            this.addCommand("強化する", "upgrade", this.isEnabledUpgrade());
        }
        this.addCommand(TextManager.cancel, "cancel");
    };

    Window_ItemCompositionCommand.prototype.isEnabledComposition = function() {
        if (enabledCompositionSwitchId === 0) return true;
        return $gameSwitches.value(enabledCompositionSwitchId);
    };

    Window_ItemCompositionCommand.prototype.isEnabledUpgrade = function() {
        if (enabledUpgradeSwitchId === 0) return true;
        return $gameSwitches.value(enabledUpgradeSwitchId);
    };

    // Window_ItemCompositionGold
    function Window_ItemCompositionGold() {
        this.initialize(...arguments);
    }
    
    Window_ItemCompositionGold.prototype = Object.create(Window_Gold.prototype);
    Window_ItemCompositionGold.prototype.constructor = Window_ItemCompositionGold;
    
    Window_ItemCompositionGold.prototype.initialize = function(rect) {
        Window_Gold.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_ItemCompositionGold.prototype.refresh = function() {
        const rect = this.itemLineRect(0);
        const x = rect.x;
        const y = rect.y;
        const width = rect.width;
        const value = '' + this.value();
        const maxViewText = YukiKP.ItemComposition.numberToNineText(maxViewNum);
        this.contents.clear();
        
        let viewText = '';
        if (this.textWidth(maxViewText) < this.textWidth(value)) {
            // 上限桁数処理
            viewText = YukiKP.ItemComposition.numberToNineText(value.length - 1) + '+';
        } else {
            viewText = value;
        }
        this.drawCurrencyValue(viewText, this.currencyUnit(), x, y, width);
    };
    
    Window_ItemCompositionGold.prototype.value = function() {
        if (moneyType === 1) {
                return $gameVariables.value(moneyVariableId);
        }
        return $gameParty.gold();
    };
    
    Window_ItemCompositionGold.prototype.currencyUnit = function() {
        if (moneyType === 1) return moneyUnit;
        return TextManager.currencyUnit;
    };

    function Window_ItemCompositionHelp() {
        this.initialize(...arguments);
    }

    // Window_ItemCompositionHelp
    Window_ItemCompositionHelp.prototype = Object.create(Window_Help.prototype);
    Window_ItemCompositionHelp.prototype.constructor = Window_ItemCompositionHelp;
    
    Window_ItemCompositionHelp.prototype.initialize = function(rect) {
        Window_Help.prototype.initialize.call(this, rect);
        this._textType = "";
        this._text = "";
        this._subText = "";
    };

    Window_ItemCompositionHelp.prototype.setTextType = function(textType) {
        if (this._textType !== textType) {
            this._textType = textType;
            this.refresh();
        }
    };

    Window_ItemCompositionHelp.prototype.setSubText = function(subText) {
        if (this._subText !== subText) {
            this._subText = subText;
            this.refresh();
        }
    };

    Window_ItemCompositionHelp.prototype.setItem = function(item, keyItem) {
        switch (this._textType) {
            case "OLD":
                this.setText(keyItem ? keyItem.description : "");
                break;
            case "ITEM":
                this.setText(item ? item.description : "");
                break;
            case "SUBandITEM":
                this.setText(item ? this._subText + item.description : "");
                break;
            case "SUB":
                this.setText(this._subText);
                break;
        }
    };

    // =====================================
    // Window Composition
    // =====================================

    // Window_ItemComposition
    function Window_ItemComposition() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemComposition.prototype = Object.create(Window_ItemCompositionMainBase.prototype);
    Window_ItemComposition.prototype.constructor = Window_ItemComposition;

    Window_ItemComposition.prototype.initialize = function(rect) {
        Window_ItemCompositionMainBase.prototype.initialize.call(this, rect);
    };

    Window_ItemComposition.prototype.setHelpWindowItem = function() {
        if (this._helpWindow) this._helpWindow.setItem(this.item(), null);
    };

    // Window_ItemCompositionCategory
    function Window_ItemCompositionCategory() {
        this.initialize(...arguments);
    }
    
    Window_ItemCompositionCategory.prototype = Object.create(Window_ItemCompositionCategoryBase.prototype);
    Window_ItemCompositionCategory.prototype.constructor = Window_ItemCompositionCategory;
    
    Window_ItemCompositionCategory.prototype.initialize = function(rect) {
        Window_ItemCompositionCategoryBase.prototype.initialize.call(this, rect, modeComposition);
    };

    // Window_ItemCompositionNeeds
    function Window_ItemCompositionNeeds() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemCompositionNeeds.prototype = Object.create(Window_ItemCompositionNeedBase.prototype);
    Window_ItemCompositionNeeds.prototype.constructor = Window_ItemCompositionNeeds;

    Window_ItemCompositionNeeds.prototype.initialize = function(rect) {
        Window_ItemCompositionNeedBase.prototype.initialize.call(this, rect);
    };

    // Window_ItemCompositionSuccess
    function Window_ItemCompositionSuccess() {
        this.initialize(...arguments);
    }

    Window_ItemCompositionSuccess.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemCompositionSuccess.prototype.constructor = Window_ItemCompositionSuccess;

    Window_ItemCompositionSuccess.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.resetNumber();
        this.createButtons();
        this.select(0);
    };

    Window_ItemCompositionSuccess.prototype.resetNumber = function() {
        this._max = 1;
        this._number = 1;
    };

    Window_ItemCompositionSuccess.prototype.isScrollEnabled = function() {
        return false;
    };

    Window_ItemCompositionSuccess.prototype.number = function() {
        return this._number;
    };

    Window_ItemCompositionSuccess.prototype.actorIndex = function() {
        return -1;
    };
    
    Window_ItemCompositionSuccess.prototype.maxCols = function() {
        return 4;
    };
    
    Window_ItemCompositionSuccess.prototype.itemHeight = function() {
        return Window_Scrollable.prototype.itemHeight.call(this) + 8;
    };

    Window_ItemCompositionSuccess.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
    };

    Window_ItemCompositionSuccess.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
        if (YukiKP.ItemComposition.mode() === modeComposition) {
            this.processNumberChange();
        }
    };

    Window_ItemCompositionSuccess.prototype.refresh = function() {
        this.contents.clear();
        Window_Selectable.prototype.refresh.call(this);
        this.drawAllItems();
    };

    Window_ItemCompositionSuccess.prototype.setMax = function(item, cost) {
        const num = $gameParty.numItems(item);
        const max = $gameParty.maxItems(item) - num;
        let checkNum = YukiKP.ItemComposition.createMaxNumber(cost);
        this._max = checkNum < max ? checkNum : max;
    };

    Window_ItemCompositionSuccess.prototype.drawAllItems = function() {
        // 確認テキスト表示
        this.drawText(compositionSuccessText, 0, 0, this.innerWidth, "center");

        this.contentsBack.clear();
        this.drawItemBackground(0);
        if (this._itemWindow) {
            // 合成アイテム表示
            const item = this._itemWindow.item();
            this.drawCurrentItemName(item);

            // 「×」表示
            this.drawMultiplicationSign();

            // 個数表示
            this.drawNumber(item);

            // 罫線表示
            this.drawHorzLine();

            // 素材アイテム表示
            this.drawNeedItem(this._itemWindow.cost(), this._number);
        }

        // ボタン表示
        this.drawButtons();
    };

    Window_ItemCompositionSuccess.prototype.createButtons = function() {
        this._buttons = [];
        if (ConfigManager.touchUI) {
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
        }
    };

    Window_ItemCompositionSuccess.prototype.drawButtons = function() {
        const sp = this.buttonSpacing();
        const totalWidth = this.totalButtonWidth();
        let x = (this.innerWidth - totalWidth) / 2;
        for (const button of this._buttons) {
            button.x = x;
            button.y = this.buttonY(button.height);
            x += button.width + sp;
        }
    };
    
    Window_ItemCompositionSuccess.prototype.totalButtonWidth = function() {
        const sp = this.buttonSpacing();
        return this._buttons.reduce((r, button) => r + button.width + sp, -sp);
    };
    
    Window_ItemCompositionSuccess.prototype.buttonSpacing = function() {
        return 8;
    };
    
    Window_ItemCompositionSuccess.prototype.drawCurrentItemName = function(item) {
        const x = Math.floor(this.innerWidth / 6);
        const y = this.itemNameY();
        const width = this.multiplicationSignX() - this.itemPadding() * 3;
        this.drawItemName(item, x, y, width);
    };
    
    Window_ItemCompositionSuccess.prototype.drawMultiplicationSign = function() {
        const sign = this.multiplicationSign();
        const width = this.textWidth(sign);
        const x = this.multiplicationSignX();
        const y = this.itemNameY();
        this.resetTextColor();
        this.drawText(sign, x, y, width);
    };
    
    Window_ItemCompositionSuccess.prototype.multiplicationSign = function() {
        return "\u00d7";
    };
    
    Window_ItemCompositionSuccess.prototype.multiplicationSignX = function() {
        const sign = this.multiplicationSign();
        const width = this.textWidth(sign);
        return this.cursorX() - width * 2;
    };
    
    Window_ItemCompositionSuccess.prototype.drawNumber = function(item) {
        const x = this.cursorX();
        const y = this.itemNameY();
        const width = this.cursorWidth() - this.itemPadding() + this.textWidth(" (所持:99)");
        this.resetTextColor();
        this.drawText(this._number, x, y, width - this.textWidth(" (所持:99)"), "right");
        this.drawText("(所持:", x, y, width - this.textWidth("99)"), "right");
        this.drawText($gameParty.numItems(item), x, y, width - this.textWidth(")"), "right");
        this.drawText(")", x, y, width, "right");
    };
    
    Window_ItemCompositionSuccess.prototype.drawHorzLine = function() {
        const padding = this.itemPadding();
        const lineHeight = this.lineHeight();
        const itemY = this.itemNameY();
        const totalY = this.totalPriceY();
        const x = padding;
        const y = Math.floor((itemY + totalY + lineHeight) / 2);
        const width = this.innerWidth - padding * 2;
        this.drawRect(x, y, width, 5);
    };
    
    Window_ItemCompositionSuccess.prototype.itemNameY = function() {
        return Math.floor(this.itemHeight() * 1.5);
    };
    
    Window_ItemCompositionSuccess.prototype.totalPriceY = function() {
        return Math.floor(this.itemNameY() + this.lineHeight() * 2);
    };
    
    Window_ItemCompositionSuccess.prototype.buttonY = function(buttonHeight) {
        return Math.floor(this.height - buttonHeight * 2);
    };
    
    Window_ItemCompositionSuccess.prototype.cursorWidth = function() {
        const padding = this.itemPadding();
        const digitWidth = this.textWidth("0");
        return this.maxDigits() * digitWidth + padding * 2;
    };
    
    Window_ItemCompositionSuccess.prototype.cursorX = function() {
        return this.innerWidth - this.cursorWidth() - Math.floor(this.innerWidth / 4);
    };
    
    Window_ItemCompositionSuccess.prototype.maxDigits = function() {
        return 2;
    };

    Window_ItemCompositionSuccess.prototype.processNumberChange = function() {
        if (this.isOpenAndActive()) {
            if (Input.isRepeated("right")) {
                this.changeNumber(1);
            }
            if (Input.isRepeated("left")) {
                this.changeNumber(-1);
            }
            if (Input.isRepeated("up")) {
                this.changeNumber(10);
            }
            if (Input.isRepeated("down")) {
                this.changeNumber(-10);
            }
        }
    };
    
    Window_ItemCompositionSuccess.prototype.changeNumber = function(amount) {
        const lastNumber = this._number;
        this._number = (this._number + amount).clamp(1, this._max);
        if (this._number !== lastNumber) {
            this.playCursorSound();
            this.refresh();
        }
    };

    Window_ItemCompositionSuccess.prototype.itemRect = function() {
        const rect = new Rectangle();
        rect.x = this.cursorX();
        rect.y = this.itemNameY();
        rect.width = this.cursorWidth();
        rect.height = this.lineHeight();
        return rect;
    };

    Window_ItemCompositionSuccess.prototype.drawNeedItem = function(cost, num) {
        if (cost) {
            for (let i = 0; i < cost.length; i++) {
                const rect = this.needItemRect(i);
                this.changePaintOpacity(this.isEnabled(cost[i], num));
                this.drawItemName(cost[i][0], rect.x, rect.y, rect.width);
                this.drawItemNumber(cost[i], rect.width, rect.y, rect.width, num);
                this.changePaintOpacity(true);
            }
        }
    };

    Window_ItemCompositionSuccess.prototype.drawItemName = function(item, x, y, width) {
        if (item) YukiKP.ItemComposition.drawItemName(this, item, x, y, width);
    };

    Window_ItemCompositionSuccess.prototype.drawItemNumber = function(item, x, y, width, num) {
        if (item) YukiKP.ItemComposition.drawItemNumber(this, item, x, y, width, num);
    };

    Window_ItemCompositionSuccess.prototype.needItemWidth = function() {
        return Math.floor(this.innerWidth / 2 - this.colSpacing());
    };

    Window_ItemCompositionSuccess.prototype.needItemRect = function(index) {
        const itemWidth = this.needItemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const x = colSpacing * 10;
        const y = index * itemHeight + rowSpacing + Math.floor(this.height / 4);
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    };

    Window_ItemCompositionSuccess.prototype.isEnabled = function(cost, num) {
        return YukiKP.ItemComposition.hasNeedItems(YukiKP.ItemComposition.mode(), cost[0], cost[1] * num);
    };

    Window_ItemCompositionSuccess.prototype.isTouchOkEnabled = function() {
        return false;
    };
    
    Window_ItemCompositionSuccess.prototype.onButtonUp = function() {
        this.changeNumber(1);
    };
    
    Window_ItemCompositionSuccess.prototype.onButtonUp2 = function() {
        this.changeNumber(10);
    };
    
    Window_ItemCompositionSuccess.prototype.onButtonDown = function() {
        this.changeNumber(-1);
    };
    
    Window_ItemCompositionSuccess.prototype.onButtonDown2 = function() {
        this.changeNumber(-10);
    };
    
    Window_ItemCompositionSuccess.prototype.onButtonOk = function() {
        this.processOk();
    };

    Window_ItemCompositionSuccess.prototype.processOk = function() {
        if (this.isCurrentItemEnabled()) {
            YukiKP.ItemComposition.playSuccessSe();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    // =====================================
    // Window Upgrade
    // =====================================
    
    // Window_ItemUpgrade
    function Window_ItemUpgrade() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemUpgrade.prototype = Object.create(Window_ItemCompositionMainBase.prototype);
    Window_ItemUpgrade.prototype.constructor = Window_ItemUpgrade;

    Window_ItemUpgrade.prototype.initialize = function(rect) {
        Window_ItemCompositionMainBase.prototype.initialize.call(this, rect);
    };

    Window_ItemUpgrade.prototype.setHelpWindowItem = function() {
        if (this._helpWindow) this._helpWindow.setItem(this.item(), this.itemAt(this.index()));
    };

    Window_ItemUpgrade.prototype.itemAt = function(index) {
        if (this._cost && index >= 0) {
            return index < this._cost.length ? this._cost[index][0][0] : null;
        }
        return null;
    };

    // Window_ItemUpgradeCategory
    function Window_ItemUpgradeCategory() {
        this.initialize(...arguments);
    }
    
    Window_ItemUpgradeCategory.prototype = Object.create(Window_ItemCompositionCategoryBase.prototype);
    Window_ItemUpgradeCategory.prototype.constructor = Window_ItemUpgradeCategory;
    
    Window_ItemUpgradeCategory.prototype.initialize = function(rect) {
        Window_ItemCompositionCategoryBase.prototype.initialize.call(this, rect, modeUpgrade);
    };

    // Window_ItemUpgradeNeeds
    function Window_ItemUpgradeNeeds() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemUpgradeNeeds.prototype = Object.create(Window_ItemCompositionNeedBase.prototype);
    Window_ItemUpgradeNeeds.prototype.constructor = Window_ItemUpgradeNeeds;

    Window_ItemUpgradeNeeds.prototype.initialize = function(rect) {
        Window_ItemCompositionNeedBase.prototype.initialize.call(this, rect);
    };

    Window_ItemUpgradeNeeds.prototype.startIndex = function() {
        return 1;
    };

    // Window_ItemUpgradeSuccess
    function Window_ItemUpgradeSuccess() {
        this.initialize.apply(this, arguments);
    }

    Window_ItemUpgradeSuccess.prototype = Object.create(Window_HorzCommand.prototype);
    Window_ItemUpgradeSuccess.prototype.constructor = Window_ItemUpgradeSuccess;
    
    Window_ItemUpgradeSuccess.prototype.initialize = function(rect) {
        Window_HorzCommand.prototype.initialize.call(this, rect);
    };

    Window_ItemUpgradeSuccess.prototype.actorIndex = function() {
        return -1;
    };

    Window_ItemUpgradeSuccess.prototype.number = function() {
        return 1;
    };

    Window_ItemUpgradeSuccess.prototype.isScrollEnabled = function() {
        return false;
    };
    
    Window_ItemUpgradeSuccess.prototype.maxCols = function() {
        return 4;
    };
    
    Window_ItemUpgradeSuccess.prototype.itemCols = function() {
        return 2;
    };
    
    Window_ItemUpgradeSuccess.prototype.itemHeight = function() {
        return Window_Scrollable.prototype.itemHeight.call(this) + 8;
    };

    Window_ItemUpgradeSuccess.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
    };

    Window_ItemUpgradeSuccess.prototype.update = function() {
        Window_HorzCommand.prototype.update.call(this);
    };

    Window_ItemUpgradeSuccess.prototype.refresh = function() {
        this.contents.clear();
        Window_HorzCommand.prototype.refresh.call(this);
        this.drawAllItems();
    };
    
    Window_ItemUpgradeSuccess.prototype.makeCommandList = function() {
        this.addCommand("強化する", "ok");
        this.addCommand(TextManager.cancel, "cancel");
    };

    Window_ItemUpgradeSuccess.prototype.beforeItem = function() {
        return this._itemWindow.cost()[0][0];
    };

    Window_ItemUpgradeSuccess.prototype.afterItem = function() {
        return this._itemWindow.item();
    };

    Window_ItemUpgradeSuccess.prototype.beforeStates = function() {
        return this.statesDataMap(this.getStates(this.beforeItem()));
    };

    Window_ItemUpgradeSuccess.prototype.afterStates = function() {
        return this.statesDataMap(this.getStates(this.afterItem()));
    };

    Window_ItemUpgradeSuccess.prototype.getStates = function(data) {
        return data.meta.states ? data.meta.states.split(',') : [];
    };

    Window_ItemUpgradeSuccess.prototype.drawAllItems = function() {
        // 確認テキスト表示
        this.drawText(upgradeSuccessText, 0, 0, this.innerWidth, "center");

        if (this._itemWindow) {
            // 強化前アイテム表示
            this.drawBaseItem();

            // 「=>」表示
            this.drawArrowSign();

            // 強化後アイテム表示
            this.drawUpgradeItem();

            // 強化ステータス表示
            this.drawUpgradeStates();

            // 罫線表示
            this.drawHorzLine();
            this.drawCenterLine();

            // 素材アイテム表示
            this.drawNeedItem();

            // コマンド表示
            this.contentsBack.clear();
            Window_HorzCommand.prototype.drawAllItems.call(this);
        }
    };

    Window_ItemUpgradeSuccess.prototype.drawItemName = function(item, x, y, width) {
        if (item) YukiKP.ItemComposition.drawItemName(this, item, x, y, width);
    };

    Window_ItemUpgradeSuccess.prototype.drawItemNumber = function(item, x, y, width) {
        if (item) YukiKP.ItemComposition.drawItemNumber(this, item, x, y, width);
    };

    Window_ItemUpgradeSuccess.prototype.itemRect = function(index) {
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index + 1;
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        const x = col * itemWidth + colSpacing / 2;
        const y = this.innerHeight - height;
        return new Rectangle(x, y, width, height);
    };
    
    Window_ItemUpgradeSuccess.prototype.drawBaseItem = function() {
        const item = this.beforeItem();
        const width = this.innerWidth / 2 - this.colSpacing();
        const centerX = YukiKP.ItemComposition.alignTextWidth(this, 'center', width, item.name, true);
        const x = centerX;
        const y = this.itemNameY();
        this.drawItemName(item, x, y, width);
    };
    
    Window_ItemUpgradeSuccess.prototype.drawUpgradeItem = function() {
        const item = this.afterItem();
        const width = this.innerWidth / 2 - this.colSpacing();
        const centerX = YukiKP.ItemComposition.alignTextWidth(this, 'center', width, item.name, true);
        const x = this.innerWidth / 2 + centerX;
        const y = this.itemNameY();
        this.drawItemName(item, x, y, width);
    };
    
    Window_ItemUpgradeSuccess.prototype.drawArrowSign = function() {
        const width = this.textWidth("⇒");
        const x = this.innerWidth / 2 - this.colSpacing() - width / 2;
        const y = this.itemNameY();
        this.drawText("⇒", x, y, width);
    };
    
    Window_ItemUpgradeSuccess.prototype.drawUpgradeStates = function() {
        const beforeStates = this.beforeStates();
        const afterStates  = this.afterStates();
        
        // ステータス変化量表示
        this.statesFontSize();
        this.drawStates(beforeStates, afterStates, "Lost", "#80aaff", false);
        this.drawStates(afterStates, beforeStates, "New", "#ffaa80", true);
        this.resetFontSettings();
    };
    
    Window_ItemUpgradeSuccess.prototype.statesDataMap = function(statesList) {
        if (!statesList) return;

        let dataList = [];
        for (const states of statesList) {
            const statesData = states.split(':');
            const tag = statesData[0];
            const tagId = this.getTextId(tag);tagId
            const textId = -1 < tagId ? tagId : Number(statesData[1]);
            const number = -1 < tagId ? Number(statesData[1]) : Number(statesData[2]);

            dataList.push({tag:tag, id:textId, num:number});
        }
        return Object.assign(dataList);
    };

    Window_ItemUpgradeSuccess.prototype.getTextId = function(tag) {
        const paramData = upgradeParamData.find(el => el.tag === tag);
        return paramData.typeid;
    };

    Window_ItemUpgradeSuccess.prototype.drawStates = function(beforeData, afterData, text, color, numberEnable) {
        const col = numberEnable ? 1 : 0;
        let index = 0;
        for (const before of beforeData) {
            const includeData = this.statesIncludes(before, afterData);
            const itemRect = this.statesItemRect(index, col);
            if (includeData) {
                // 項目表示
                this.drawStatesText(before, itemRect, true);           
                
                // 一致タグの変化表示
                if (numberEnable) this.drawChangeNumberText(itemRect, includeData.num, before.num);
            } else {
                // 一致タグ以外はテキスト表示
                const width = this.textWidth("AAAAA");
                const x= itemRect.x - width;
                const y = itemRect.y;
                this.changeTextColor(color);
                this.drawText(text, x, y, width);
                this.changeTextColor("#ffffff");

                // 項目表示
                this.drawStatesText(before, itemRect, numberEnable);
            }
            index++;
        }
    };

    Window_ItemUpgradeSuccess.prototype.drawStatesText = function(data, rect, enabled) {
        const paramData = upgradeParamData.find(el => el.tag === data.tag);
        const viewType = paramData.viewType;
        const viewText = this.setText(viewType, paramData, data.id, data.num);
        const textColor = this.setTextColor(viewType, paramData.type, data.id, enabled);

        if (viewText[0] !== '') {
            // 項目名
            this.changeTextColor(textColor[0]);
            this.drawText(viewText[0], rect.x, rect.y, rect.width / 2, 'center');
            this.changeTextColor("#ffffff");
        }
        if (viewText[1] !== '') {
            // 項目値
            this.changeTextColor(textColor[1]);
            this.drawText(viewText[1], rect.x + rect.width / 2, rect.y, rect.width / 2, 'center');
            this.changeTextColor("#ffffff");
        }
        if (viewText[2] !== '') {
            // 値なし項目
            this.changeTextColor(textColor[0]);
            this.drawText(viewText[2], rect.x, rect.y, rect.width, 'center');
            this.changeTextColor("#ffffff");
        }
    };

    Window_ItemUpgradeSuccess.prototype.setText = function(type, paramData, id, number) {
        let text = ["", "", ""];
        switch (type) {
            case 'base':
                // 名称 999
                text[0] = paramData.name;
                text[1] = number;
                break;
            case 'parcent':
                // 名称 999 ％
                text[0] = paramData.name;
                text[1] = number + " ％";
                break;
            case 'validity':
                // 属性 名称 99 ％
                text[0] = YukiKP.ItemComposition.getElementName(paramData.type, id) + " " + paramData.name;
                text[1] = number + " ％";
                break;
            case 'attack':
                // 名称 属性
                text[0] = paramData.name;
                text[1] = YukiKP.ItemComposition.getElementName(paramData.type, id);
                break;
            case 'invalid':
                // 属性 名称
                text[0] = YukiKP.ItemComposition.getElementName(paramData.type, id);
                text[1] = paramData.name;
                break;
            case 'only':
                // 名称
                text[2] = paramData.name;
                break;
        }
        return text;
    };

    Window_ItemUpgradeSuccess.prototype.setTextColor = function(viewType, paramType, id, enabled) {
        let textColor = ["#ffffff", "#ffffff"];
        if (!enabled) {
            textColor[0] = "#aaaaaa";
            textColor[1] = "#aaaaaa";
            return textColor;
        }
        switch (viewType) {
            case 'validity':
                // 属性 名称 99 ％
                textColor[0] = this.getElementColor(paramType, id);
                break;
            case 'attack':
                // 名称 属性
                textColor[1] = this.getElementColor(paramType, id);
                break;
            case 'invalid':
                // 属性 名称
                textColor[0] = this.getElementColor(paramType, id);
                break;
            case 'base':
                // 名称 999
            case 'parcent':
                // 名称 999 ％
            case 'only':
                // 名称
                break;
        }
        return textColor;
    };

    Window_ItemUpgradeSuccess.prototype.getElementColor = function(type, id) {
        let result = "#ffffff";
        switch (type) {
            case 'elementRate':
            case 'attackElement':
                result = this.elementsColor(id);
                break;
            case 'stateRate':
            case 'stateResist':
            case 'attackState':
                result = this.stateColor(id);
                break;
            case 'param':
            case 'xparam':
            case 'sparam':
            case 'debuffRate':
            case 'skill':
            case 'party':
                break;
        }
        return result;
    };
    
    Window_ItemUpgradeSuccess.prototype.elementsColor = function(id) {
        // 属性IDごとのテキストカラー設定
        const textColor = elementsTextColor.find(el => el.typeid === id);
        if (textColor) return "#"+ textColor.colorCode;
        return "#ffffff";
    };
    
    Window_ItemUpgradeSuccess.prototype.stateColor = function(id) {
        // ステートIDごとのテキストカラー設定
        const textColor = stateTextColor.find(el => el.typeid === id);
        if (textColor) return "#"+ textColor.colorCode;
        return "#ffffff";
    };
    
    Window_ItemUpgradeSuccess.prototype.drawChangeNumberText = function(rect, before, after) {
        const width = this.textWidth("(9999)");
        const x = rect.x + rect.width;
        const y = rect.y;

        const changeNumber = after - before;
        // TODO 属性・ステートの有効度の場合、増減数値のテキストカラーを逆にする
        if (changeNumber < 0) {
            this.changeTextColor("#ffaa80");
            this.drawText("(-", x, y, width - this.textWidth("999)"), 'right');
            this.drawText(-1*changeNumber, x, y, width - this.textWidth(")"), 'right');
            this.drawText(")", x, y, width, 'right');
            this.changeTextColor("#ffffff");
        } else if (changeNumber > 0) {
            this.changeTextColor("#80aaff");
            this.drawText("(+", x, y, width - this.textWidth("999)"), 'right');
            this.drawText(changeNumber, x, y, width - this.textWidth(")"), 'right');
            this.drawText(")", x, y, width, 'right');
            this.changeTextColor("#ffffff");
        }
    }

    Window_ItemUpgradeSuccess.prototype.statesIncludes = function(before, after) {
        const paramData = upgradeParamData.find(el => el.tag === before.tag);
        let data = null;
        switch (paramData.type) {
            case 'param':
            case 'xparam':
            case 'sparam':
                data = after.find(ad => ad.tag === before.tag);
                break;
            case 'debuffRate':
            case 'elementRate':
            case 'attackElement':
            case 'stateRate':
            case 'stateResist':
            case 'attackState':
            case 'skill':
                data = after.find(ad => ad.tag === before.tag && ad.id === before.id);
                break;
            case 'party':
                break;
        }
        return data;
    };
    
    Window_ItemUpgradeSuccess.prototype.statesFontSize = function() {
        this.contents.fontSize -= 2;
    };

    Window_ItemUpgradeSuccess.prototype.statesItemRect = function(index, col) {
        const itemWidth = Math.floor(this.itemWidth() * 1.5);
        const itemHeight = Math.floor(this.itemHeight() * 0.8);
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const x = this.statesNameX(col);
        const y = this.itemNameY() + (index + 1) * itemHeight + rowSpacing;
        const width = itemWidth - colSpacing - this.textWidth("(+999)");
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    };

    Window_ItemUpgradeSuccess.prototype.statesNameX = function(col) {
        return Math.floor((col + 1) % 2 * this.textWidth("9999") + this.itemWidth() / 3 + col * (this.innerWidth / this.itemCols()));
    };

    
    Window_ItemUpgradeSuccess.prototype.drawHorzLine = function() {
        const padding = this.itemPadding();
        const x = padding;
        const y = this.horzLineY();
        const width = this.innerWidth - padding * 2;
        this.drawRect(x, y, width, 5);
    };

    Window_ItemUpgradeSuccess.prototype.horzLineY = function() {
        return Math.floor(this.innerHeight / 2 + this.lineHeight());
    };
    
    Window_ItemUpgradeSuccess.prototype.itemNameY = function() {
        return Math.floor(this.itemHeight() * 1.5);
    };

    Window_ItemUpgradeSuccess.prototype.drawNeedItem = function() {
        const cost = this._itemWindow.cost();
        if (cost) {
            for (let i = 1; i < cost.length; i++) {
                const rect = this.needItemRect(i-1);
                const costTextWidth = this.textWidth(''+cost[i]) * 2;
                this.changePaintOpacity(this.isEnabled(cost[i]));
                this.drawItemName(cost[i][0], rect.x, rect.y, rect.width - costTextWidth);
                this.drawItemNumber(cost[i], rect.x, rect.y, rect.width);
                this.changePaintOpacity(true);
            }
        }
    };

    Window_ItemUpgradeSuccess.prototype.needItemWidth = function() {
        return Math.floor(this.innerWidth / this.itemCols() - this.colSpacing());
    };

    Window_ItemUpgradeSuccess.prototype.needItemRect = function(index) {
        const maxCols = this.itemCols();
        const itemWidth = this.needItemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(index / maxCols);
        const padding = col * this.itemPadding();
        const x = col * itemWidth + colSpacing / 2 + padding;
        const y = this.horzLineY() + row * itemHeight + rowSpacing * 2;
        const width = itemWidth - colSpacing + padding;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    };
    
    Window_ItemUpgradeSuccess.prototype.drawCenterLine = function() {
        const itemHeight = this.itemHeight();
        const x = this.innerWidth / this.itemCols() - this.colSpacing() / 2;
        const y = this.horzLineY() + 10;
        const height = this.innerHeight - y - itemHeight;
        this.drawRect(x, y, 3, height);
    };

    Window_ItemUpgradeSuccess.prototype.isEnabled = function(cost) {
        return YukiKP.ItemComposition.hasNeedItems(YukiKP.ItemComposition.mode(), cost[0], cost[1]);
    };

    Window_ItemUpgradeSuccess.prototype.processOk = function() {
        if (this.index() === 1) {
            SoundManager.playCancel();
            this.updateInputData();
            this.deactivate();
            this.callCancelHandler();
        } else if (this.isCurrentItemEnabled()) {
            const actors = this._itemWindow.actorEquip(this._itemWindow.index());
            if (0 === actors.length) {
                YukiKP.ItemComposition.playSuccessSe();
            } else {
                this.playOkSound();
            }
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    // Window_ItemUpgradeSelectActor
    function Window_ItemUpgradeSelectActor() {
        this.initialize(...arguments);
    }

    Window_ItemUpgradeSelectActor.prototype = Object.create(Window_Selectable.prototype);
    Window_ItemUpgradeSelectActor.prototype.constructor = Window_ItemUpgradeSelectActor;

    Window_ItemUpgradeSelectActor.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._partyMembers = $gameParty.members();
        this.createItemIconSprites();
        this.createActorSprites();
        this.createActorArrowSprites();
        this.resetIndex();
    };

    Window_ItemUpgradeSelectActor.prototype.resetIndex = function() {
        this.select(0);
        this._actorIndex = 0;
        this._lastIndex = -1;
        this._actorBegin = 0;
        this._actorEnd = this._partyMembers.length < maxVisibleActors ? this._partyMembers.length - 1 : maxVisibleActors - 1;
        this._actor = this._partyMembers[0];
        this._currentActorState = 'none';
        this._enableChangeActor = false;
        this._currentItem = null;
        this._newItem = null;
        this._beforeStates = [];
        this._afterStates = [];
    };

    Window_ItemUpgradeSelectActor.prototype.setNewItem = function(item) {
        this._newItem = item;
    };

    Window_ItemUpgradeSelectActor.prototype.setCurrentItem = function(item) {
        this._currentItem = item;
    };

    Window_ItemUpgradeSelectActor.prototype.setBeforeStates = function(states) {
        this._beforeStates = states;
    };

    Window_ItemUpgradeSelectActor.prototype.setAfterStates = function(states) {
        this._afterStates = states;
    };

    Window_ItemUpgradeSelectActor.prototype.actorIndex = function() {
        return this._actorIndex;
    };

    Window_ItemUpgradeSelectActor.prototype.number = function() {
        return 1;
    };

    Window_ItemUpgradeSelectActor.prototype.maxCols = function() {
        return 1;
    };

    Window_ItemUpgradeSelectActor.prototype.maxItems = function() {
        return 2;
    };

    Window_ItemUpgradeSelectActor.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);
    };

    Window_ItemUpgradeSelectActor.prototype.refresh = function() {
        this.contents.clear();
        Window_Selectable.prototype.refresh.call(this);
        this.hideItemIcon();
        this.hideActorCharacters();
        this.hideActorCursors();
        this.drawAllItems();
    };

    Window_ItemUpgradeSelectActor.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
    };

    Window_ItemUpgradeSelectActor.prototype.drawAllItems = function() {
        if (this._itemWindow) {
            this.contentsBack.clear();
            // 三角矢印の表示
            this.drawActorCursors();

            // 空コマンド表示
            this.drawCommandActorSelect();

            // 全アクター・所持品アイコン表示
            this.drawAllActor();

            // 所持品アイテムを強化するためのアイコン
            this.drawPartyItem();

            // 選択中アイテムの名称表示
            this.drawSelectName();

            // アクター装備の変化表示
            this.drawAllParams();

            // キャンセル表示
            this.drawCommandCancel();

            this.resetTextColor();
            this.changePaintOpacity(true);
        }
    };

    Window_ItemUpgradeSelectActor.prototype.drawActorCursors = function() {
        const x = this.padding;
        const y = this.rowSpacing() * 1.5;
        const width = this.width - this._rightActorArrowSprite.width - this.padding;
        this._leftActorArrowSprite.show();
        this._leftActorArrowSprite.x = x;
        this._leftActorArrowSprite.y = y + 24;
        this._rightActorArrowSprite.show();
        this._rightActorArrowSprite.x = width;
        this._rightActorArrowSprite.y = y + 24;
    };

    Window_ItemUpgradeSelectActor.prototype.drawAllActor = function() {
        const item = this._itemWindow.item();
        const keyItem = this._itemWindow.itemAt(this._itemWindow.index());
        // アクターキャラチップ表示
        for (let index = this._actorBegin; index <= this._actorEnd; index++) {
            // アクター表示
            const member = this._partyMembers[index];
            let actorState = 'cannot';
            // 除外アクターの場合 'cannot'
            if (YukiKP.ItemComposition.exclusionInculudes(member.actorId())) {
                actorState = 'cannot';
            } else if (member.isEquipped(keyItem)) {
                // 除外アクター以外で装備中のアイテムが強化可能
                if (member.canEquip(item)) {
                    // 強化したアイテムが装備可能な場合 'equipped'
                    actorState = 'equipped';
                } else {
                    // 強化したアイテムが装備不可の場合  'releace'
                    actorState = 'releace';
                }
            }
            this.drawActor(index - this._actorBegin, index, actorState);
        }
    };

    Window_ItemUpgradeSelectActor.prototype.refreshCursor = function() {
        if (this._cursorAll) {
            this.refreshCursorForAll();
        } else if (this.index() === 0) {
            const rect = this.commandActorSelectRect();
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else if (this.index() === 1) {
            const rect = this.commandCancelRect();
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };

    Window_ItemUpgradeSelectActor.prototype.drawCommandActorSelect = function() {
        const rect = this.commandActorSelectRect();
        this.resetTextColor();
        this.changePaintOpacity(true);
        this.drawItemBackground(rect);
        this.contents.drawText(" ", rect.x, rect.y, rect.width, rect.height, 'center');
    };

    Window_ItemUpgradeSelectActor.prototype.drawCommandCancel = function() {
        const rect = this.commandCancelRect();
        this.resetTextColor();
        this.changePaintOpacity(true);
        this.drawItemBackground(rect);
        this.contents.drawText(TextManager.cancel, rect.x, rect.y, rect.width, rect.height, 'center');
    };

    Window_ItemUpgradeSelectActor.prototype.drawItemBackground = function(rect) {
        this.drawBackgroundRect(rect);
    };

    Window_ItemUpgradeSelectActor.prototype.commandActorSelectRect = function() {
        if (!this._leftActorArrowSprite) return new Rectangle(0, 0, 0, 0);
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const itemWidth = this.itemWidth() - this._leftActorArrowSprite.width - this._rightActorArrowSprite.width;
        const itemHeight = this.itemHeight() * 1.5;
        const width = itemWidth - colSpacing / 2;
        const height = itemHeight - rowSpacing;
        const x = this._leftActorArrowSprite.width + colSpacing / 2;
        const y = rowSpacing;
        return new Rectangle(x, y, width, height);
    };

    Window_ItemUpgradeSelectActor.prototype.commandCancelRect = function() {
        const itemWidth = this.innerWidth / 4;
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        const x = this.innerWidth / 2 - itemWidth / 2;
        const y = this.innerHeight - height;
        return new Rectangle(x, y, width, height);
    };

    Window_ItemUpgradeSelectActor.prototype.drawActor = function(index, member, state) {
        const width = 64;
        const maxWidth = maxVisibleActors * width;
        const x = this.innerWidth / 2 - maxWidth / 2 + index * width - this.colSpacing() / 2;
        const y = this.itemHeight() / 2 + this.rowSpacing() / 2;
        // アクターの歩行キャラチップを表示
        const actorSprite = this._actorSprites[member];
        actorSprite.x = x;
        actorSprite.y = y;
        actorSprite.show();
        if (member !== this._actorIndex) {
            actorSprite.changeEquipState(false, state);
        } else {
            actorSprite.changeEquipState(true, state);
            this._currentActorState = state;
        }
    };

    Window_ItemUpgradeSelectActor.prototype.drawPartyItem = function() {
        const keyItem = this._itemWindow.itemAt(this._itemWindow.index());
        const state = $gameParty.hasItem(keyItem, false) ? 'ok' : 'cannot';
        const width = 64;
        const maxWidth = maxVisibleActors * width;
        const x = this.innerWidth / 2 + maxWidth / 2;
        const y = this.itemHeight() / 2 + this.rowSpacing() * 2.5;
        this._itemIconSprite.x = x;
        this._itemIconSprite.y = y;
        this._itemIconSprite.show();
        if (this._actorIndex < this._partyMembers.length) {
            this._itemIconSprite.changeEquipState(false, state);
        } else {
            this._itemIconSprite.changeEquipState(true, state);
            this._currentActorState = state;
        }
    };

    Window_ItemUpgradeSelectActor.prototype.drawSelectName = function() {
        const actorHeight = this.itemHeight() * 1.5
        const width = this.itemWidth();
        const x = this.innerWidth / 2 - width / 2;
        const y = this.rowSpacing() + actorHeight;

        // アクター名称
        if (this._actorIndex < this._partyMembers.length) {
            const currentActor = this._partyMembers[this._actorIndex];
            this.drawText(currentActor.name(), x, y, width, 'center')
        } else {
        // 所持アイテム名称
            this.drawText(upgradeSelectItemName, x, y, width, 'center')
        }
    };

    Window_ItemUpgradeSelectActor.prototype.drawAllParams = function() {
        if (!this._actor) return;
        // 選択中アクターが装備しているか
        if (!this._actor.isEquipped(this._currentItem)) return;

        const x = this.innerWidth / 2 - this.paramWidth() * 1.5 - this.rightArrowWidth();
        const y = this.itemHeight() * 2.5 + this.rowSpacing();
        const paramX = this.paramX(x);
        const paramWidth = this.paramWidth();

        // 差分表示パラメータのタグリスト
        const allTagList = this.allTagList();

        // 差分表示の名称リスト（重複パラメータなし）
        const tagNameList = this.tagNameList(allTagList);

        // 現在のアクターステータス
        const actorParam = this.actorParam(tagNameList);

        // 強化後のアクターステータス
        const newParam = this.newParam(actorParam, allTagList, tagNameList);

        for (let index = 0; index < tagNameList.length; index++) {
            const paramY = y + index * this.lineHeight();
            // パラメータ名
            this.drawParamName(tagNameList[index], x, paramY);
            // 強化前アクターステータス表示
            this.drawCurrentParam(actorParam[index], paramX, paramY, paramWidth)
            // 「=>」表示
            this.drawRightArrow(paramX + paramWidth, paramY);
            // 強化後アクターステータス表示
            this.drawNewParam(actorParam[index], newParam[index], paramX + paramWidth, paramY, paramWidth);
        }
    };

    Window_ItemUpgradeSelectActor.prototype.allTagList = function() {
        let tagList = [];
        for (const paramData of upgradeParamData) {
            switch (paramData.type) {
                case 'param':
                case 'xparam':
                case 'sparam':
                case 'elementRate':
                case 'debuffRate':
                case 'stateRate':
                case 'stateResist':
                    break;
                case 'attackElement':
                case 'attackState':
                case 'skill':
                case 'party':
                    continue;
            }
            // 強化後のタグリスト生成
            let after = this._afterStates.filter(el => el.tag === paramData.tag);
            if (after) {
                after.sort((a, b) => a.id - b.id);
                for (const data of after) {
                    tagList.push({data:'after', tag:data.tag, name:paramData.name, ptype:paramData.type, id:data.id, num:data.num, vtype:paramData.viewType});
                }
            }
            // 強化前のタグリスト生成
            let before = this._beforeStates.filter(el => el.tag === paramData.tag);
            if (before) {
                before.sort((a, b) => a.id - b.id);
                for (const data of before) {
                    tagList.push({data:'before', tag:data.tag, name:paramData.name, ptype:paramData.type, id:data.id, num:data.num, vtype:paramData.viewType});
                }
            }
        }
        return Object.assign(tagList);
    };

    Window_ItemUpgradeSelectActor.prototype.tagNameList = function(allTagList) {
        let nameList = [];
        for (const tagData of allTagList) {
            const enabled = nameList.find(el => el.type === tagData.ptype && el.id === tagData.id);
            if (!enabled) nameList.push({type:tagData.ptype, id:tagData.id, name:tagData.name});
        }
        return Object.assign(nameList);
    };

    Window_ItemUpgradeSelectActor.prototype.actorParam = function(nameList) {
        let actorParam = [];
        for (const data of nameList) {
            let param = 0;
            switch (data.type) {
                case 'param':
                    param = this._actor.param(data.id);
                    break;
                case 'xparam':
                    param = this._actor.xparam(data.id);
                    break;
                case 'sparam':
                    param = this._actor.sparam(data.id);
                    break;
                case 'elementRate':
                    param = this._actor.elementRate(data.id);
                    break;
                case 'debuffRate':
                    param = this._actor.debuffRate(data.id);
                    break;
                case 'stateRate':
                    param = this._actor.stateRate(data.id);
                    break;
                case 'stateResist':
                    param = this._actor.isStateResist(data.id) ? 0 : this._actor.stateRate(data.id);
                    break;
                case 'attackElement':
                case 'attackState':
                case 'skill':
                case 'party':
                    break;
            }
            actorParam.push({type:data.type, id:data.id, num:param});
        }
        return Object.assign(actorParam);
    };

    Window_ItemUpgradeSelectActor.prototype.newParam = function(actorParam, tagList, nameList) {
        let newParam = [];
        for (const data of nameList) {
            // アクターのパラメータ
            let actorNum = actorParam.find(el => el.type === data.type && el.id === data.id).num;

            // 装備中アイテムのパラメータ（複数データ）
            const beforeItem = tagList.filter(el => el.data === 'before' && el.ptype === data.type && el.id === data.id);

            // 強化後アイテムのパラメータ（複数データ）
            const afterItem = tagList.filter(el => el.data === 'after' && el.ptype === data.type && el.id === data.id);
            
            // アクターから装備中アイテムのパラメータを除外する
            actorNum = this.calculator(actorNum, beforeItem, false);

            // 装備解除したアクターから強化後アイテムのパラメータを追加する
            actorNum = this.calculator(actorNum, afterItem, true);

            newParam.push({type:data.type, id:data.id, num:actorNum});
        }
        return Object.assign(newParam);
    };

    Window_ItemUpgradeSelectActor.prototype.calculator = function(param, itemList, type) {
        let newParam = param;
        for (const item of itemList) {
            switch (param.type) {
                case 'param':
                    if (item.vtype === 'base') {
                        // 増減
                        if (type) {
                            newParam = newParam + item.num;
                        } else {
                            newParam = newParam - item.num;
                        }
                    } else if (item.vtype === 'parcent') {
                        // 乗除
                        if (type) {
                            newParam = newParam * (item.num / 100);
                        } else {
                            newParam = newParam / (item.num / 100);
                        }
                    }
                    break;
                case 'xparam':
                    // 増減
                    if (type) {
                        newParam = newParam + item.num;
                    } else {
                        newParam = newParam - item.num;
                    }
                    break;
                case 'sparam':
                case 'elementRate':
                case 'debuffRate':
                case 'stateRate':
                case 'stateResist':
                    // 乗除
                    if (type) {
                        newParam = newParam * (item.num / 100);
                    } else {
                        newParam = newParam / (item.num / 100);
                    }
                    break;
                case 'attackElement':
                case 'attackState':
                case 'skill':
                case 'party':
                    // 計算不要
                    break;
            }
        }
        return newParam;
    };

    Window_ItemUpgradeSelectActor.prototype.drawParamName = function(param, x, y) {
        const width = this.paramX(x) - this.itemPadding() * 2;
        this.changeTextColor(ColorManager.systemColor());
        // TODO 属性パラメータの名称
        const elementName = YukiKP.ItemComposition.getElementName(param.type, param.id);
        this.drawText(elementName + param.name, x, y, width);
    };

    Window_ItemUpgradeSelectActor.prototype.drawCurrentParam = function(param, x, y, width) {
        this.resetTextColor();
        this.drawParam(param, x, y, width);
    };

    Window_ItemUpgradeSelectActor.prototype.drawRightArrow = function(x, y) {
        const rightArrowWidth = this.rightArrowWidth();
        this.changeTextColor(ColorManager.systemColor());
        this.drawText("\u2192", x, y, rightArrowWidth, "center");
    };

    Window_ItemUpgradeSelectActor.prototype.drawNewParam = function(actorParam, newParam, x, y, width) {
        const rightArrowWidth = this.rightArrowWidth();
        if (this._actor.canEquip(this._newItem)) {
            const diffvalue = newParam.num - actorParam.num;
            switch (newParam.type) {
                case 'param':
                case 'xparam':
                case 'sparam':
                    this.changeTextColor(ColorManager.paramchangeTextColor(diffvalue));
                    break;
                case 'elementRate':
                case 'debuffRate':
                case 'stateRate':
                case 'stateResist':
                    this.changeTextColor(ColorManager.paramchangeTextColor(-1 * diffvalue));
                    break;
                case 'attackElement':
                case 'attackState':
                case 'skill':
                case 'party':
                    break;
            }
            this.drawParam(newParam, x + rightArrowWidth, y, width);
        } else {
            this.resetTextColor();
            this.changePaintOpacity(false);
            this.drawText("--", x + rightArrowWidth, y, width, "center");
            this.changePaintOpacity(true);
        }
    };

    Window_ItemUpgradeSelectActor.prototype.drawParam = function(param, x, y, width) {
        let viewText = "";
        switch (param.type) {
            case 'param':
                // 値
                viewText = Math.floor(param.num) + "   ";
                break;
            case 'xparam':
            case 'sparam':
            case 'elementRate':
            case 'debuffRate':
            case 'stateRate':
            case 'stateResist':
                // ％表示
                viewText = Math.floor(param.num * 100) + " ％";
                break;
            case 'attackElement':
            case 'attackState':
            case 'skill':
            case 'party':
                break;
        }
        this.drawText(viewText, x, y, width, "right");
    };

    Window_ItemUpgradeSelectActor.prototype.rightArrowWidth = function() {
        return 32;
    };
    
    Window_ItemUpgradeSelectActor.prototype.paramWidth = function() {
        return this.textWidth("99999999");
    };

    Window_ItemUpgradeSelectActor.prototype.paramX = function(x) {
        return x + this.paramWidth() + this.itemPadding();
    };

    Window_ItemUpgradeSelectActor.prototype.createItemIconSprites = function() {
        this._itemIconSprite = new Sprite_ItemUpgradeItemIcon(this.clickItem.bind(this));
        this.addChild(this._itemIconSprite);
    };

    Window_ItemUpgradeSelectActor.prototype.createActorSprites = function() {
        this._actorSprites = [];
        for (const actor of this._partyMembers) {
            const sprite = new Sprite_ItemUpgradeActorCharacter(actor, this.clickActor.bind(this));
            this._actorSprites.push(sprite);
            this.addChild(sprite);
        }
    };

    Window_ItemUpgradeSelectActor.prototype.createActorArrowSprites = function() {
        this._leftActorArrowSprite = new Sprite_ItemUpgradeLeftArrow(this.cursorLeft.bind(this, true));
        this.addChild(this._leftActorArrowSprite);
        this._rightActorArrowSprite = new Sprite_ItemUpgradeRightArrow(this.cursorRight.bind(this, true));
        this.addChild(this._rightActorArrowSprite);
    };

    Window_ItemUpgradeSelectActor.prototype.hideItemIcon = function() {
        this._itemIconSprite.hide();
    };

    Window_ItemUpgradeSelectActor.prototype.hideActorCharacters = function() {
        for (let i = 0; i < this._partyMembers.length; i++) {
            const actorSprite = this._actorSprites[i];
            actorSprite.hide();
        }
    };

    Window_ItemUpgradeSelectActor.prototype.hideActorCursors = function() {
        this._leftActorArrowSprite.hide();
        this._rightActorArrowSprite.hide();
    };

    Window_ItemUpgradeSelectActor.prototype.setEnableChangeActor = function(enableChangeActor) {
        this._enableChangeActor = enableChangeActor;
    };

    Window_ItemUpgradeSelectActor.prototype.updateActorIndex = function(index) {
        this._lastIndex = this._actorIndex;
        this._actorIndex = index;
        if (this._actorIndex < this._partyMembers.length) {
            this._actor = this._partyMembers[this._actorIndex];
        } else {
            this._actor = null;
        }
        if (this._actorIndex !== this._lastIndex) {
            this.playCursorSound();
            this.refresh();
        }
    };

    Window_ItemUpgradeSelectActor.prototype.isCursorMovable = function() {
        return (
            this.isOpenAndActive() &&
            this._enableChangeActor && 
            !this._cursorFixed &&
            !this._cursorAll &&
            this.maxItems() > 0
        );
    };

    Window_ItemUpgradeSelectActor.prototype.hitTest = function(x, y) {
        if (this.innerRect.contains(x, y)) {
            const cx = this.origin.x + x - this.padding;
            const cy = this.origin.y + y - this.padding;
            const actorRect = this.commandActorSelectRect();
            if (actorRect.contains(cx, cy)) return 0;
            const cancelRect = this.commandCancelRect();
            if (cancelRect.contains(cx, cy)) return 1;
        }
        return -1;
    };

    Window_ItemUpgradeSelectActor.prototype.clickActor = function(actor) {
        if (!this._enableChangeActor) return;
        const index = this._partyMembers.map(a => a.actorId()).indexOf(actor.actorId());
        if (index === -1) throw new Error(`actorId: ${actor.actorId()} is not found`);
        this.updateActorIndex(index);
    };

    Window_ItemUpgradeSelectActor.prototype.clickItem = function() {
        if (!this._enableChangeActor) return;
        const index = this._partyMembers.length;
        this.updateActorIndex(index);
    };

    Window_ItemUpgradeSelectActor.prototype.processCursorMove = function() {
        if (this.isCursorMovable()) {
            if (Input.isRepeated("down")) {
                this.cursorDown(Input.isTriggered("down"));
                this.playCursorSound();
            }
            if (Input.isRepeated("up")) {
                this.cursorUp(Input.isTriggered("up"));
                this.playCursorSound();
            }
            // キャラチップ選択のカーソル位置の場合のみ
            if (this.index() === 0) {
                if (Input.isRepeated("right")) {
                    this.cursorRight(Input.isTriggered("right"));
                }
                if (Input.isRepeated("left")) {
                    this.cursorLeft(Input.isTriggered("left"));
                }
            }
        }
    };

    Window_ItemUpgradeSelectActor.prototype.cursorRight = function(triggered) {
        let index = this._actorIndex + 1;
        if (index > this._partyMembers.length) {
            index = triggered ? 0 : this._actorIndex;
        }
        if (triggered) this.updateActorView(index);
        this.updateActorIndex(index);
    };

    Window_ItemUpgradeSelectActor.prototype.cursorLeft = function(triggered) {
        let index = this._actorIndex - 1;
        if (index < 0) {
            index = triggered ? this._partyMembers.length : 0;
        }
        if (triggered) this.updateActorView(index);
        this.updateActorIndex(index);
    };

    Window_ItemUpgradeSelectActor.prototype.updateActorView = function(index) {
        if (this._partyMembers.length > maxVisibleActors) {
            if (index < this._actorBegin) {
                this._actorBegin = index;
                this._actorEnd = index + maxVisibleActors - 1;
            } else if (index < this._partyMembers.length && index > this._actorEnd) {
                this._actorBegin = index - maxVisibleActors + 1;
                this._actorEnd = index;
            }
        }
    };

    Window_ItemUpgradeSelectActor.prototype.isCurrentItemEnabled = function() {
        let result = false;
        switch (this._currentActorState) {
            case 'cannot':
                break;
            case 'ok':
            case 'equipped':
            case 'releace':
                result = true;
                break;
        }
        return result;
    };

    Window_ItemUpgradeSelectActor.prototype.onTouchOk = function() {
        if (this.isTouchOkEnabled()) {
            const hitIndex = this.hitIndex();
            if (hitIndex === 0 && this._lastIndex === this._actorIndex) {
                this.processOk();
            } else if (hitIndex === 1) {
                this.processOk();
            }
        }
    };

    Window_ItemUpgradeSelectActor.prototype.processOk = function() {
        if (this.index() === 1) {
            SoundManager.playCancel();
            this.updateInputData();
            this.deactivate();
            this.callCancelHandler();
        } else if (this.isCurrentItemEnabled()) {
            YukiKP.ItemComposition.playSuccessSe();
            this.updateInputData();
            this.deactivate();
            this.callOkHandler();
        } else {
            this.playBuzzerSound();
        }
    };

    // SubWindow_ItemUpgradeSelectActor
    function SubWindow_ItemUpgradeSelectActor() {
        this.initialize(...arguments);
    }
    
    SubWindow_ItemUpgradeSelectActor.prototype = Object.create(Window_Base.prototype);
    SubWindow_ItemUpgradeSelectActor.prototype.constructor = SubWindow_ItemUpgradeSelectActor;
    
    SubWindow_ItemUpgradeSelectActor.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this._text = "";
    };

    SubWindow_ItemUpgradeSelectActor.prototype.setText = function(text) {
        if (this._text !== text) {
            this._text = text;
            this.refresh();
        }
    };

    SubWindow_ItemUpgradeSelectActor.prototype.clear = function() {
        this.setText("");
    };

    SubWindow_ItemUpgradeSelectActor.prototype.refresh = function() {
        const rect = this.baseTextRect();
        this.contents.clear();
        this.drawText(this._text, rect.x, rect.y, rect.width, 'center');
    };

    // =====================================
    // Scene Base
    // =====================================

    // Scene_ItemComposition
    function Scene_ItemComposition() {
      this.initialize(...arguments);
    }

    Scene_ItemComposition.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_ItemComposition.prototype.constructor = Scene_ItemComposition;

    Scene_ItemComposition.prototype.initialize = function() {
      Scene_MenuBase.prototype.initialize.call(this);
      YukiKP.ItemComposition.initialize();
    };

    Scene_ItemComposition.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);
        this.createHelpWindow();
        if (useMoneyWindow) this.createGoldWindow();
        this.createCommandWindow();
        this.createDummyWindow();
        if (YukiKP.ItemComposition.isViewComposition()) {
            this.createCompositionCategoryWindow();
            this.createCompositionNeedsWindow();
            this.createCompositionMainWindow();
            this.createCompositionSuccessWindow();
        }
        if (YukiKP.ItemComposition.isViewUpgrade()) {
            this.createUpgradeCategoryWindow();
            this.createUpgradeNeedsWindow();
            this.createUpgradeMainWindow();
            this.createUpgradeSuccessWindow();
            this.createUpgradeSelectActorWindow();
        }
    };

    Scene_ItemComposition.prototype.update = function() {
        Scene_MenuBase.prototype.update.call(this);
        this.updatePageButtons();
    };

    // helpWindow
    Scene_ItemComposition.prototype.createHelpWindow = function() {
        const rect = this.helpWindowRect();
        this._helpWindow = new Window_ItemCompositionHelp(rect);
        this.addWindow(this._helpWindow);
    };

    // goldWindow
    Scene_ItemComposition.prototype.createGoldWindow = function() {
        const rect = this.goldWindowRect();
        this._goldWindow = new Window_ItemCompositionGold(rect);
        this.addWindow(this._goldWindow);
    };
    
    Scene_ItemComposition.prototype.goldWindowRect = function() {
        const ww = this.mainCommandWidth();
        const wh = this.calcWindowHeight(1, true);
        const wx = Graphics.boxWidth - ww;
        const wy = this.mainAreaTop();
        return new Rectangle(wx, wy, ww, wh);
    };

    // commandWindow
    Scene_ItemComposition.prototype.activateCommandWindow = function() {
        this._dummyWindow.show();
        this._commandWindow.activate();
    };

    Scene_ItemComposition.prototype.createCommandWindow = function() {
        const rect = this.commandWindowRect();
        this._commandWindow = new Window_ItemCompositionCommand(rect);
        this._commandWindow.y = this.mainAreaTop();
        this._commandWindow.setHandler("composition", this.commandComposition.bind(this));
        this._commandWindow.setHandler("upgrade", this.commandUpgrade.bind(this));
        this._commandWindow.setHandler("cancel", this.popScene.bind(this));
        this.addWindow(this._commandWindow);
    };

    Scene_ItemComposition.prototype.commandWindowRect = function() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = useMoneyWindow ? this._goldWindow.x : Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.commandComposition = function() {
        this._dummyWindow.hide();
        this.activateCompositionCategoryWindow();
        this._helpWindow.setTextType(compositionHelpType);
        this._helpWindow.setSubText(compositionHelpSubText);
        YukiKP.ItemComposition.setMode('composition');
    };

    Scene_ItemComposition.prototype.commandUpgrade = function() {
        this._dummyWindow.hide();
        this.activateUpgradeCategoryWindow();
        this._helpWindow.setTextType(upgradeHelpType);
        this._helpWindow.setSubText(upgradeHelpSubText);
        YukiKP.ItemComposition.setMode('upgrade');
    };

    // dummyWindow
    Scene_ItemComposition.prototype.createDummyWindow = function() {
        const rect = this.dummyWindowRect();
        this._dummyWindow = new Window_Base(rect);
        this.addWindow(this._dummyWindow);
    };

    Scene_ItemComposition.prototype.dummyWindowRect = function() {
        const wx = 0;
        const wy = this._commandWindow.y + this._commandWindow.height;
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaHeight() - this._commandWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.successAction = function(activeWindow, mainWindow, needWindow, activateCategory, activateMain) {
        const item = mainWindow.item();
        const cost = mainWindow.cost();
        const actorIndex = activeWindow.actorIndex();
        const num = activeWindow.number();

        YukiKP.ItemComposition.successAction(item, cost, actorIndex, num);

        YukiKP.ItemComposition.refresh();
        this._goldWindow.refresh();
        mainWindow.refresh();

        const index = mainWindow.checkIndex();
        if (index < 0) {
            this._helpWindow.clear();
            needWindow.clearItem();
            mainWindow.deselect();
            activateCategory.call(this);
        } else {
            activateMain.call(this);
            mainWindow.select(index);
        }

        activeWindow.hide();
    };

    // =====================================
    // Scene Composition
    // =====================================

    Scene_ItemComposition.prototype.activateCompositionCategoryWindow = function() {
        this._compositionCategoryWindow.show();
        this._compositionCategoryWindow.activate();
        this._compositionMainWindow.show();
        this._compositionNeedsWindow.show();
        this._compositionMainWindow.refresh();
    };

    Scene_ItemComposition.prototype.createCompositionCategoryWindow = function() {
        const rect = this.compositionCategoryWindowRect();
        this._compositionCategoryWindow = new Window_ItemCompositionCategory(rect);
        this._compositionCategoryWindow.hide();
        this._compositionCategoryWindow.deactivate();
        this._compositionCategoryWindow.setHandler("ok", this.onCompositionCategoryOk.bind(this));
        this._compositionCategoryWindow.setHandler("cancel", this.onCompositionCategoryCancel.bind(this));
        this.addWindow(this._compositionCategoryWindow);
    };

    Scene_ItemComposition.prototype.compositionCategoryWindowRect = function() {
        const wx = 0;
        const wy = this._dummyWindow.y;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.onCompositionCategoryOk = function() {
        this.activateCompositionMainWindow();
        this._compositionMainWindow.select(0);
    };

    Scene_ItemComposition.prototype.onCompositionCategoryCancel = function() {
        this._compositionCategoryWindow.hide();
        this._compositionMainWindow.hide();
        this._compositionNeedsWindow.hide();
        this.activateCommandWindow();
    };

    Scene_ItemComposition.prototype.activateCompositionMainWindow = function() {
        this._compositionMainWindow.activate();
    };

    Scene_ItemComposition.prototype.createCompositionMainWindow = function() {
        const rect = this.compositionMainWindowRect();
        this._compositionMainWindow = new Window_ItemComposition(rect);
        this._compositionMainWindow.setHelpWindow(this._helpWindow);
        this._compositionMainWindow.setNeedsWindow(this._compositionNeedsWindow);
        this._compositionMainWindow.hide();
        this._compositionMainWindow.setHandler("ok", this.onCompositionMainOk.bind(this));
        this._compositionMainWindow.setHandler("cancel", this.onCompositionMainCancel.bind(this));
        this.addWindow(this._compositionMainWindow);
        this._compositionCategoryWindow.setItemWindow(this._compositionMainWindow);
        if (!this._compositionCategoryWindow.needsSelection()) {
            this._compositionMainWindow.y -= this._compositionCategoryWindow.height;
            this._compositionMainWindow.height += this._compositionCategoryWindow.height;
            this._compositionCategoryWindow.update();
            this._compositionCategoryWindow.hide();
            this._compositionCategoryWindow.deactivate();
            this.onCategoryOk();
        }
    };
    
    Scene_ItemComposition.prototype.compositionMainWindowRect = function() {
        const wx = 0;
        const wy = this._dummyWindow.y + this._compositionCategoryWindow.height;
        const ww = Graphics.boxWidth / 2;
        const wh = this._dummyWindow.height - this._compositionCategoryWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.onCompositionMainOk = function() {
        this._compositionSuccessWindow.show();
        this.activateCompositionSuccessWindow();
    };

    Scene_ItemComposition.prototype.onCompositionMainCancel = function() {
        this._helpWindow.clear();
        this._compositionNeedsWindow.clearItem();
        this._compositionMainWindow.deselect();
        this.activateCompositionCategoryWindow();
    };

    Scene_ItemComposition.prototype.createCompositionNeedsWindow = function() {
        const rect = this.compositionNeedsWindowRect();
        this._compositionNeedsWindow = new Window_ItemCompositionNeeds(rect);
        this._compositionNeedsWindow.hide();
        this.addWindow(this._compositionNeedsWindow);
    };

    Scene_ItemComposition.prototype.compositionNeedsWindowRect = function() {
        const wx = Graphics.boxWidth / 2;
        const wy = this._dummyWindow.y + this._compositionCategoryWindow.height;
        const ww = Graphics.boxWidth - wx;
        const wh = this._dummyWindow.height - this._compositionCategoryWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.activateCompositionSuccessWindow = function() {
        const item = this._compositionMainWindow.item();
        const cost = this._compositionMainWindow.cost();
        
        this._compositionSuccessWindow.resetNumber();
        this._compositionSuccessWindow.setMax(item, cost);
        this._compositionSuccessWindow.refresh();
        this._compositionSuccessWindow.activate();
        this._compositionSuccessWindow.select(0);
    };

    Scene_ItemComposition.prototype.createCompositionSuccessWindow = function() {
        const rect = this.compositionSuccessWindowRect();
        this._compositionSuccessWindow = new Window_ItemCompositionSuccess(rect);
        this._compositionSuccessWindow.setItemWindow(this._compositionMainWindow);
        this._compositionSuccessWindow.hide();
        this._compositionSuccessWindow.deactivate();
        this._compositionSuccessWindow.setHandler("ok", this.onCompositionSuccessOk.bind(this));
        this._compositionSuccessWindow.setHandler("cancel", this.onCompositionSuccessCancel.bind(this));
        this.addWindow(this._compositionSuccessWindow);
    };

    Scene_ItemComposition.prototype.compositionSuccessWindowRect = function() {
        const wx = Graphics.boxWidth / 8;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth - wx * 2;
        const wh = this._helpWindow.y;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.onCompositionSuccessOk = function() {
        this.successAction(
            this._compositionSuccessWindow,
            this._compositionMainWindow,
            this._compositionNeedsWindow,
            this.activateCompositionCategoryWindow,
            this.activateCompositionMainWindow
        );
    };

    Scene_ItemComposition.prototype.onCompositionSuccessCancel = function() {
        this._compositionSuccessWindow.hide();
        this.activateCompositionMainWindow();
    };

    // =====================================
    // Scene Upgrade
    // =====================================

    Scene_ItemComposition.prototype.activateUpgradeCategoryWindow = function() {
        this._upgradeCategoryWindow.show();
        this._upgradeCategoryWindow.activate();
        this._upgradeMainWindow.show();
        this._upgradeNeedsWindow.show();
        this._upgradeMainWindow.refresh();
    };

    Scene_ItemComposition.prototype.createUpgradeCategoryWindow = function() {
        const rect = this.upgradeCategoryWindowRect();
        this._upgradeCategoryWindow = new Window_ItemUpgradeCategory(rect);
        this._upgradeCategoryWindow.hide();
        this._upgradeCategoryWindow.deactivate();
        this._upgradeCategoryWindow.setHandler("ok", this.onUpgradeCategoryOk.bind(this));
        this._upgradeCategoryWindow.setHandler("cancel", this.onUpgradeCategoryCancel.bind(this));
        this.addWindow(this._upgradeCategoryWindow);
    };

    Scene_ItemComposition.prototype.upgradeCategoryWindowRect = function() {
        const wx = 0;
        const wy = this._dummyWindow.y;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.onUpgradeCategoryOk = function() {
        this.activateUpgradeMainWindow();
        this._upgradeMainWindow.select(0);
    };

    Scene_ItemComposition.prototype.onUpgradeCategoryCancel = function() {
        this._upgradeCategoryWindow.hide();
        this._upgradeMainWindow.hide();
        this._upgradeNeedsWindow.hide();
        this.activateCommandWindow();
    };

    Scene_ItemComposition.prototype.activateUpgradeMainWindow = function() {
        this._upgradeMainWindow.activate();
    };

    Scene_ItemComposition.prototype.createUpgradeMainWindow = function() {
        const rect = this.upgradeMainWindowRect();
        this._upgradeMainWindow = new Window_ItemUpgrade(rect);
        this._upgradeMainWindow.setHelpWindow(this._helpWindow);
        this._upgradeMainWindow.setNeedsWindow(this._upgradeNeedsWindow);
        this._upgradeMainWindow.hide();
        this._upgradeMainWindow.setHandler("ok", this.onUpgradeMainOk.bind(this));
        this._upgradeMainWindow.setHandler("cancel", this.onUpgradeMainCancel.bind(this));
        this.addWindow(this._upgradeMainWindow);
        this._upgradeCategoryWindow.setItemWindow(this._upgradeMainWindow);
        if (!this._upgradeCategoryWindow.needsSelection()) {
            this._upgradeMainWindow.y -= this._upgradeCategoryWindow.height;
            this._upgradeMainWindow.height += this._upgradeCategoryWindow.height;
            this._upgradeCategoryWindow.update();
            this._upgradeCategoryWindow.hide();
            this._upgradeCategoryWindow.deactivate();
            this.onCategoryOk();
        }
    };
    
    Scene_ItemComposition.prototype.upgradeMainWindowRect = function() {
        const wx = 0;
        const wy = this._dummyWindow.y + this._upgradeCategoryWindow.height;
        const ww = Graphics.boxWidth / 2;
        const wh = this._dummyWindow.height - this._upgradeCategoryWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.onUpgradeMainOk = function() {
        this._upgradeSuccessWindow.show();
        this.activateUpgradeSuccessWindow();
    };

    Scene_ItemComposition.prototype.onUpgradeMainCancel = function() {
        this._helpWindow.clear();
        this._upgradeNeedsWindow.clearItem();
        this._upgradeMainWindow.deselect();
        this.activateUpgradeCategoryWindow();
    };

    Scene_ItemComposition.prototype.createUpgradeNeedsWindow = function() {
        const rect = this.upgradeNeedsWindowRect();
        this._upgradeNeedsWindow = new Window_ItemUpgradeNeeds(rect);
        this._upgradeNeedsWindow.hide();
        this.addWindow(this._upgradeNeedsWindow);
    };

    Scene_ItemComposition.prototype.upgradeNeedsWindowRect = function() {
        const wx = Graphics.boxWidth / 2;
        const wy = this._dummyWindow.y + this._upgradeCategoryWindow.height;
        const ww = Graphics.boxWidth - wx;
        const wh = this._dummyWindow.height - this._upgradeCategoryWindow.height;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.activateUpgradeSuccessWindow = function() {
        this._upgradeSuccessWindow.refresh();
        this._upgradeSuccessWindow.activate();
        this._upgradeSuccessWindow.select(0);
    };

    Scene_ItemComposition.prototype.createUpgradeSuccessWindow = function() {
        const rect = this.upgradeSuccessWindowRect();
        this._upgradeSuccessWindow = new Window_ItemUpgradeSuccess(rect);
        this._upgradeSuccessWindow.setItemWindow(this._upgradeMainWindow);
        this._upgradeSuccessWindow.hide();
        this._upgradeSuccessWindow.deactivate();
        this._upgradeSuccessWindow.setHandler("ok", this.onUpgradeSuccessOk.bind(this));
        this._upgradeSuccessWindow.setHandler("cancel", this.onUpgradeSuccessCancel.bind(this));
        this.addWindow(this._upgradeSuccessWindow);
    };

    Scene_ItemComposition.prototype.upgradeSuccessWindowRect = function() {
        const wx = Graphics.boxWidth / 100;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth - wx * 2;
        const wh = this._helpWindow.y;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.onUpgradeSuccessOk = function() {
        const actors = this._upgradeMainWindow.actorEquip(this._upgradeMainWindow.index());
        if (0 < actors.length) {
            this._upgradeSelectActorWindow.show();
            this._upgradeSelectActorWindowSub.show();
            this.activateUpgradeSelectActorWindow();
        } else {
            this.successAction(
                this._upgradeSuccessWindow,
                this._upgradeMainWindow,
                this._upgradeNeedsWindow,
                this.activateUpgradeCategoryWindow,
                this.activateUpgradeMainWindow
            );
        }
    };

    Scene_ItemComposition.prototype.onUpgradeSuccessCancel = function() {
        this._upgradeSuccessWindow.hide();
        this.activateUpgradeMainWindow();
    };

    Scene_ItemComposition.prototype.activateUpgradeSelectActorWindow = function() {
        this._upgradeSelectActorWindow.resetIndex();
        if (this._upgradeSuccessWindow) {
            const beforeStates = this._upgradeSuccessWindow.beforeStates();
            const afterStates = this._upgradeSuccessWindow.afterStates();
            const currentItem = this._upgradeSuccessWindow.beforeItem();
            const newItem = this._upgradeSuccessWindow.afterItem();
            this._upgradeSelectActorWindow.setCurrentItem(currentItem);
            this._upgradeSelectActorWindow.setNewItem(newItem);
            this._upgradeSelectActorWindow.setBeforeStates(beforeStates);
            this._upgradeSelectActorWindow.setAfterStates(afterStates);
        }
        this._upgradeSelectActorWindow.refresh();
        this._upgradeSelectActorWindow.activate();
        this._upgradeSelectActorWindow.setEnableChangeActor(true);
    };

    Scene_ItemComposition.prototype.createUpgradeSelectActorWindow = function() {
        const itemHeight = this._dummyWindow.itemHeight() * 1.5;
        const rect = this.upgradeSelectActorWindowRect(itemHeight);
        this._upgradeSelectActorWindow = new Window_ItemUpgradeSelectActor(rect);
        this._upgradeSelectActorWindow.setItemWindow(this._upgradeMainWindow);
        this._upgradeSelectActorWindow.hide();
        this._upgradeSelectActorWindow.deactivate();
        this._upgradeSelectActorWindow.setHandler("ok", this.onUpgradeSelectActorOk.bind(this));
        this._upgradeSelectActorWindow.setHandler("cancel", this.onUpgradeSelectActorCancel.bind(this));
        this.addWindow(this._upgradeSelectActorWindow);

        // サブウィンドウ
        const subRect = this.upgradeSelectActorWindowSubRect(rect, itemHeight);
        this._upgradeSelectActorWindowSub = new SubWindow_ItemUpgradeSelectActor(subRect);
        this._upgradeSelectActorWindowSub.setText(upgradeSelectText);
        this._upgradeSelectActorWindowSub.hide();
        this._upgradeSelectActorWindowSub.deactivate();;
        this.addWindow(this._upgradeSelectActorWindowSub);
    };

    Scene_ItemComposition.prototype.upgradeSelectActorWindowRect = function(itemHeight) {
        const wx = Graphics.boxWidth / 5;
        const wy = this.mainAreaTop() + itemHeight;
        const ww = Graphics.boxWidth - wx * 2;
        const wh = this._helpWindow.y - itemHeight;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.upgradeSelectActorWindowSubRect = function(rect, itemHeight) {
        const wy = this.mainAreaTop();
        const ww = this._dummyWindow.textWidth(upgradeSelectText) + this._dummyWindow.textWidth("AAAA");
        const wh = itemHeight;
        const wx = rect.x + rect.width / 2 - ww / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_ItemComposition.prototype.onUpgradeSelectActorOk = function() {
        this.successAction(
            this._upgradeSelectActorWindow,
            this._upgradeMainWindow,
            this._upgradeNeedsWindow,
            this.activateUpgradeCategoryWindow,
            this.activateUpgradeMainWindow
        );
        this._upgradeSuccessWindow.hide();
        this._upgradeSelectActorWindowSub.hide();
        this._upgradeSelectActorWindow.setEnableChangeActor(false);
    };

    Scene_ItemComposition.prototype.onUpgradeSelectActorCancel = function() {
        this._upgradeSuccessWindow.hide();
        this._upgradeSelectActorWindow.hide();
        this._upgradeSelectActorWindowSub.hide();
        this._upgradeSelectActorWindow.setEnableChangeActor(false);
        this.activateUpgradeMainWindow();
    };

    // =============================================================================================
})();
