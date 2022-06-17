//=============================================================================
//Av_TMStatusMenuEx.js
//---------------------------------------------------------------------------
//改変: アーヴェル(https://twitter.com/LF71_S)
//This software is released under the MIT License.
//http://opensource.org/licenses/mit-license.php
//---------------------------------------------------------------------------
// Version
// 1.0.0 2020/12/31 初版 元プラグイン作成者のtomoaky氏には感謝申し上げます
// 1.0.1 2021/1/1   ステータス画面でゲームパッドの決定キーが反応しない不具合を修正
// 1.0.2 2021/1/1   ヘッダー部分の記述法の混在を修正（特に影響は無いと思われます）
//---------------------------------------------------------------------------
//[Blog]   : URL
//[Twitter]: https://twitter.com/LF71_S
//=============================================================================
// TMVplugin - ステータス表示拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp)
// Version: 1.0
// 最終更新日: 2016/02/26
//=============================================================================
/*:
 * @target MZ
 * @plugindesc ステータスシーンに表示するパラメータを追加します。
 *
 * @author tomoaky (改変 アーヴェル)
 *
 * @param descriptionKeyCode
 * @desc 表示切替ボタンとして使うキー
 * 初期値: 65（ 65 = A, 66 = B, 67 = C, ... ）
 * @default 65
 *
 * @param useOkKey
 * @desc 表示切替ボタンとして決定キー（Enter, Z など）を使う
 * 初期値: 1（ 0 で使わない）
 * @default 1
 *
 * @param horzLineHeight
 * @desc 横線の余白も含めた高さ
 * 初期値: 28
 * @default 28
 *
 * @param xparamText
 * @desc 追加能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,…
 * @default 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,ＨＰ再生,ＭＰ再生,ＴＰ再生
 *
 * @param sparamText
 * @desc 特殊能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,…
 * @default 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,ＴＰチャージ,,,床ダメージ,経験値獲得
 *
 * @param paramNameX
 * @desc 通常能力値名の表示Ｘ座標
 * 初期値: 6
 * @default 6
 *
 * @param paramNameWidth
 * @desc 通常能力値名の表示幅
 * 初期値: 96
 * @default 96
 *
 * @param paramX
 * @desc 通常能力値の表示Ｘ座標
 * 初期値: 112
 * @default 112
 *
 * @param paramWidth
 * @desc 通常能力値の表示幅
 * 初期値: 60
 * @default 60
 *
 * @param xparamNameX
 * @desc 追加能力値名の表示Ｘ座標
 * 初期値: 204
 * @default 204
 *
 * @param xparamNameWidth
 * @desc 追加能力値名の表示幅
 * 初期値: 120
 * @default 120
 *
 * @param xparamX
 * @desc 追加能力値の表示Ｘ座標
 * 初期値: 330
 * @default 330
 *
 * @param xparamWidth
 * @desc 追加能力値の表示幅
 * 初期値: 60
 * @default 60
 *
 * @param xparamFixed
 * @desc 追加能力値の小数点以下桁数
 * 初期値: 0
 * @default 0
 *
 * @param sparamNameX
 * @desc 特殊能力値名の表示Ｘ座標
 * 初期値: 442
 * @default 442
 *
 * @param sparamNameWidth
 * @desc 特殊能力値名の表示幅
 * 初期値: 172
 * @default 172
 *
 * @param sparamX
 * @desc 特殊能力値の表示Ｘ座標
 * 初期値: 610
 * @default 610
 *
 * @param sparamWidth
 * @desc 特殊能力値の表示幅
 * 初期値: 80
 * @default 80
 *
 * @param sparamFixed
 * @desc 特殊能力値の小数点以下桁数
 * 初期値: 0
 * @default 0
 *
 * @param elementResistX
 * @desc 属性有効度の表示Ｘ座標
 * 初期値: 6
 * @default 6
 *
 * @param elementResistWidth
 * @desc 属性有効度の表示幅
 * 初期値: 200
 * @default 200
 *
 * @param elementResistIds
 * @desc 表示する属性有効度
 * 初期値: 2,3,4,5,6,7,8,9
 * @default 2,3,4,5,6,7,8,9
 *
 * @param elementResistIconIds
 * @desc 表示する属性有効度のアイコン番号
 * 初期値: 64,65,66,67,68,69,70,71
 * @default 64,65,66,67,68,69,70,71
 *
 * @param pdrIconId
 * @desc 物理ダメージ率のアイコン番号（ 0 で非表示）
 * 初期値: 77
 * @default 77
 *
 * @param mdrIconId
 * @desc 魔法ダメージ率のアイコン番号（ 0 で非表示）
 * 初期値: 79
 * @default 79
 *
 * @param pdrname
 * @type string
 * @desc 物理ダメージ率の略称
 * 初期値: 物理
 * @default 物理
 *
 * @param mdrname
 * @type string
 * @desc 魔法ダメージ率の略称
 * 初期値: 魔法
 * @default 魔法
 *
 * @param stateResistX
 * @desc ステート有効度の表示Ｘ座標
 * 初期値: 224
 * @default 224
 *
 * @param stateResistWidth
 * @desc ステート有効度の表示幅
 * 初期値: 200
 * @default 200
 *
 * @param stateResistIds
 * @desc 表示するステート有効度
 * 初期値: 4,5,6,7,8,9,10
 * @default 4,5,6,7,8,9,10
 *
 * @param resistFixed
 * @desc 有効度の小数点以下桁数
 * 初期値: 1
 * @default 1
 *
 * @param paramBackGround
 * @desc パラメータの背景を暗くするかどうか
 * 初期値: 1 ( 0 で無効)
 * @default 1
 *
 * @param paramBackGroundOpacity
 * @desc パラメータの背景の暗さ（ 1 ～ 255 ）
 * 初期値: 160
 * @default 160
 *
 * @param useNicknameEx
 * @desc 二つ名と職業をまとめて表示する
 * 初期値: 0（ 1 で有効）
 * @default 0
 *
 * @param useMaxLevel
 * @desc 最大レベルを表示するかどうか
 * 初期値: 1（ 0 で無効）
 * @default 1
 *
 * @param maxLevelColor
 * @desc レベルが最大の場合の文字色番号
 * 初期値: 5
 * @default 5
 *
 * @param drColor
 * @desc 物理・魔法カット率の文字色
 * 初期値: 6
 * @default 6
 *
 * @param elColor
 * @desc 属性耐性の文字色番号
 * 初期値: 6
 * @default 6
 *
 * @param stColor
 * @desc ステート耐性の文字色番号
 * 初期値: 7
 * @default 7
 *
 * @param elementName
 * @text 属性・ステート名称表示
 * @type boolean
 * @desc 属性やステートのアイコン右に名称を表示する
 * @default true
 *
 * @param elementIcon
 * @text 属性・ステートアイコン表示
 * @type boolean
 * @desc 属性やステートのアイコンを表示する
 * @default true
 *
 * @param profileLines
 * @text プロフィール欄の高さ
 * @desc +にすることで画面下に動く。デフォルトなら+100などで画面外へ。(デフォルト:-50)
 * @default -50
 *
 * @param profileFontSize
 * @text プロフィール欄の文字の大きさ
 * @desc デフォルトの縦画面サイズである６２４を基準に調整済(デフォルト:16)
 * @default 16
 *
 * @param profileYCoordinate
 * @text プロフィール欄の文字のY座標
 * @desc デフォルトの縦画面サイズである６２４を基準に調整済(デフォルト:-12)
 * @default -12
 *
 * @param profileLineSpacing
 * @text プロフィール欄の行間
 * @desc デフォルトの縦画面サイズである６２４を基準に調整済(デフォルト:6)
 * @default 6
 *
 * @help
 * 使い方:
 *   ステータスシーンでＡキーを押す、あるいは左クリック（シングルタップ）で
 *   表示するパラメータを切り替えることができます。
 *
 *   useNicknameEx を 1 に設定することで二つ名と職業をセットで表示できます。
 *   二つ名を '髪殺しの' とか '邪竜屠りの' とかにすることで、同じ職業でも
 *   キャラごとの違いを際立たせることができるかもしれません。
 *
 * プラグインコマンドはありません。
 *
 *---------------------------------------------------------------------
 *このプラグインについて （アーヴェル）
 *---------------------------------------------------------------------
 *
 *   tomoaky氏がRPGツクールMV用に作成されたものを、
 *   アーヴェルがRPGツクールMZ用に移植したものです。
 *   よって、tomoaky氏への問い合わせはしないようお願いいたします。
 *
 * 　なお、当プラグイン単体によるバグ対応はある程度するつもりですが、
 *   技術不足の観点から完璧な対応を保証するものではありません。
 *   同様の理由、そして自身の創作活動の時間は極力削りたくないという理由で、
 *   競合解消や機能追加の要望には、大変申し訳有りませんがお答えしません。
 *
 *   どうかご了承ください。
 *
 *---------------------------------------------------------------------
 *元プラグインとの差異
 *---------------------------------------------------------------------
 *   useNicknameEx機能は技術不足によりオミットしました。
 *   具体的にはページ切り替えの際にゲージを消すことが出来なかっため、
 *   レイアウトを変更しました。レイアウト変更により
 *   称号とクラスをつなげて表示するだけの幅が無くなったためオミットしました。
 *
 *   属性名・及びステート名はエディタの属性名称を自動取得します。
 *   属性の上に表示されている物理カット率と魔法カット率は、
 *   表示名をプラグインパラメータから変更可能です。（デフォルト:物理/魔法）
 *   名称・アイコンのどちらもプラグインパラメータから
 *   非表示・表示の切り替えが可能です。
 *
 *   ＭＺでタッチアイコンが追加されたことでプロフィール欄が圧迫されました。
 *   そのため、プロフィール欄の文字サイズを変更して対応してあります。
 *   文字サイズ・行間等、プラグインコマンドから設定可能です。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *　最終更新日: 20/12/31
 */

var Imported = Imported || {};
Imported.Av_TMStatusMenuEx = true;

(function() {

  var parameters = PluginManager.parameters('Av_TMStatusMenuEx');
  Input.keyMapper[+parameters['descriptionKeyCode']] = 'description';
  var useOkKey = parameters['useOkKey'] === '1' ? true : false;
  var horzLineHeight = +parameters['horzLineHeight'];
  var xparamText = parameters['xparamText'].split(',');
  var sparamText = parameters['sparamText'].split(',');
  var paramNameX = +parameters['paramNameX'];
  var paramNameWidth = +parameters['paramNameWidth'];
  var paramX = +parameters['paramX'];
  var paramWidth = +parameters['paramWidth'];
  var xparamNameX = +parameters['xparamNameX'];
  var xparamNameWidth = +parameters['xparamNameWidth'];
  var xparamX = +parameters['xparamX'];
  var xparamWidth = +parameters['xparamWidth'];
  var xparamFixed = +parameters['xparamFixed'];
  var sparamNameX = +parameters['sparamNameX'];
  var sparamNameWidth = +parameters['sparamNameWidth'];
  var sparamX = +parameters['sparamX'];
  var sparamWidth = +parameters['sparamWidth'];
  var sparamFixed = +parameters['sparamFixed'];
  var elementResistX = +parameters['elementResistX'];
  var elementResistWidth = +parameters['elementResistWidth'];
  var elementResistIds = parameters['elementResistIds'].split(',');
  var elementResistIconIds = parameters['elementResistIconIds'].split(',');
  var pdrIconId = +parameters['pdrIconId'];
  var mdrIconId = +parameters['mdrIconId'];
  var stateResistX = +parameters['stateResistX'];
  var stateResistWidth = +parameters['stateResistWidth'];
  var stateResistIds = parameters['stateResistIds'].split(',');
  var resistFixed = +parameters['resistFixed'];
  var paramBackGround = parameters['paramBackGround'] === '1' ? true : false;
  var paramBackGroundOpacity = +parameters['paramBackGroundOpacity'];
  var useNicknameEx = parameters['useNicknameEx'] === '1' ? true : false;
  var useMaxLevel = parameters['useMaxLevel'] === '1' ? true : false;
  var maxLevelColor = +parameters['maxLevelColor'];

  var pdrname = String(parameters['pdrname']);
  var mdrname = String(parameters['mdrname']);
  var drColor = +parameters['drColor'];
  var elColor = +parameters['elColor'];
  var stColor = +parameters['stColor'];
  var profileLines = +parameters['profileLines'];
  var profileFontSize = +parameters['profileFontSize'];
  var profileYCoordinate = +parameters['profileYCoordinate'];
  var profileLineSpacing = +parameters['profileLineSpacing'];
  var elementName = String(parameters['elementName']);
  var elementIcon = String(parameters['elementIcon']);
  //-----------------------------------------------------------------------------
  // Window_Base
  //

  Window_Base.prototype.levelWidth = function() {
    return 160;
  };

  var _Window_Base_drawActorLevel = Window_Base.prototype.drawActorLevel;
  Window_Base.prototype.drawActorLevel = function(actor, x, y) {
    if (useMaxLevel) {
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.levelA, x, y, 48);
      var level = actor.level;
      var maxLevel = actor.maxLevel();
      var color1 = level === maxLevel ? this.textColor(maxLevelColor) : this.normalColor();
      this.drawCurrentAndMax(level, maxLevel, x, y, this.levelWidth(),
        color1, this.normalColor());
    } else {
      _Window_Base_drawActorLevel.call(this, actor, x, y);
    }
  };

  var _Window_Base_drawActorSimpleStatus = Window_Base.prototype.drawActorSimpleStatus;
  Window_Base.prototype.drawActorSimpleStatus = function(actor, x, y, width) {
    if (useNicknameEx) {
      var lineHeight = this.lineHeight();
      y -= lineHeight * 0.5 - 8;
      this.contents.fontSize = 20;
      var text = actor.nickname() + actor.currentClass().name;
      this.contents.drawText(text, x, y, width, 20, 'left');
      this.resetFontSettings();
      var x2 = x + 180;
      y += 20;
      var width2 = Math.min(200, width - 180 - this.textPadding());
      this.drawActorName(actor, x + 20, y);
      this.drawActorLevel(actor, x, y + lineHeight * 1);
      this.drawActorIcons(actor, x, y + lineHeight * 2);
      this.drawActorHp(actor, x2, y + lineHeight * 1, width2);
      this.drawActorMp(actor, x2, y + lineHeight * 2, width2);
    } else {
      _Window_Base_drawActorSimpleStatus.call(this, actor, x, y, width);
    }
  };



  //-----------------------------------------------------------------------------
  // Window_Status
  //

  Scene_Status.prototype.statusWindowRect = function() {
    const wx = 0;
    var wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight(); // - this.mainAreaTop() - 10;
    return new Rectangle(wx, wy, ww, wh);
  };


  Window_Status.prototype.levelWidth = function() {
    return 186;
  };

  Window_Status.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
    this.refresh();
    this.activate();
    this._parameterMode = 0;
  };


  Scene_Status.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createProfileWindow();
    this.createStatusWindow();
    this.createStatusParamsWindow();
    this.createStatusEquipWindow();
    this._statusParamsWindow.hide();
    this._statusEquipWindow.hide();
    this._profileWindow.hide();
  };

  Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
      var lineHeight = this.lineHeight();
      var y = 0;
      //y = this.drawBlock1(y); //名前と二つ名
      this.drawText(this._actor._name, 10, 0);
      y += 20;
      y = this.drawHorzLine(y);
      console.log(this)
      if (this._parameterMode === 0) {
        this.drawText(this._actor.currentClass().name, 204, y + 45);
        this.drawText(this._actor._nickname, 204, y + 90);
        y = this.drawBlock2a(y); //各種ステータス
        y = this.drawHorzLine(y);
        this.drawBlock3(y);
      } else {
        this.drawBlock5(y);
      }
      y = this.contents.height - lineHeight + profileLines - horzLineHeight;
      y = this.drawHorzLine(y);
      this.drawBlock4(y);
    }
  };

  Window_Status.prototype.drawBasicInfo = function(x, y) {
    const lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.placeBasicGauges(this._actor, x, y + lineHeight * 2);
  };

  Window_Status.prototype.drawBlock3 = function(y) {
    this.drawParameters(48, y);
    this.drawEquipments(432, y);
  };

  Window_Status.prototype.drawBlock2a = function() {
    const y = this.block2Y();
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo2(204, y);
    this.drawExpInfo(456, y);
  };

  Window_Status.prototype.drawBasicInfo2 = function(x, y) {
    const lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.placeBasicGauges2(this._actor, Graphics.boxWidth * 0.47, 0, Graphics.boxWidth * 0.5, 'right');
  };

  Window_StatusBase.prototype.placeBasicGauges2 = function(actor, x, y) {
    this.placeGauge(actor, "hp", x, y);
    this.placeGauge(actor, "mp", x + Graphics.boxWidth * 0.166, y);
    if ($dataSystem.optDisplayTp) {
      this.placeGauge(actor, "tp", x + Graphics.boxWidth * 0.333, y);
    }
  };

  Window_Status.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    for (var i = 0; i < count; i++) {
      this.drawItemName(equips[i], x, y + this.lineHeight() * i);
    }
  };
  Window_Status.prototype.maxEquipmentLines = function() {
    return 6;
  };

  Window_Status.prototype.drawBlock4 = function(y) {
    this.drawProfile(6, y);
  };

  Window_Status.prototype.drawProfile = function(x, y) {
    var one = this._actor.profile();
    let regexp = RegExp('\n');
    let result = one.split(regexp);
    for (i = 0; i < result.length; i++) {
      this.drawTextEx('\x1bFS[' + profileFontSize + ']' + result[i], x, y + profileYCoordinate + (i * (profileFontSize + profileLineSpacing)));
    }
    this.resetFontSettings();
  };

  var _Window_Status_drawBlock1 = Window_Status.prototype.drawBlock1;
  Window_Status.prototype.drawBlock1 = function(y) {
    if (useNicknameEx) {
      this.drawActorName(this._actor, 6, y);
      this.resetTextColor();
      var x = this.textWidth(this._actor.name()) + 6;
      var text = this._actor.nickname() + this._actor.currentClass().name;
      this.drawText(text, x, y, this.contents.width - x - this.textPadding(), 'right');
    } else {
      _Window_Status_drawBlock1.call(this, y);
    }
    return y + this.lineHeight() * 1;
  };

  var _Window_Status_drawBlock2a = Window_Status.prototype.drawBlock2a;
  Window_Status.prototype.drawBlock2a = function(y) {
    _Window_Status_drawBlock2a.call(this, y);
    return y + this.lineHeight() * 4;
  };

  Window_Status.prototype.drawBlock5 = function(y) {
    this.drawElementResists(y);
    this.drawStateResists(y);
    this.drawSparams(y);
  };

  Window_Status.prototype.drawHorzLine = function(y) {
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, y + horzLineHeight / 2 - 1,
      this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
    return y + horzLineHeight;
  };

  Window_Status.prototype.lineColor = function() {
    return this.changeTextColor(ColorManager.textColor(0));
  };

  Window_Status.prototype.lineColor = function() {
    return this.normalColor();
  };

  Window_Base.prototype.normalColor = function() {
    return this.textColor(0);
  };

  Window_Base.prototype.textColor = function(n) {
    var px = 96 + (n % 8) * 12 + 6;
    var py = 144 + Math.floor(n / 8) * 12 + 6;
    return this.windowskin.getPixel(px, py);
  };

  Window_Status.prototype.drawParamBackGround = function(x, y, width) {
    this.contents.paintOpacity = paramBackGroundOpacity;
    this.contents.fillRect(x, y + this.lineHeight() / 2, width,
      this.lineHeight() / 2, ColorManager.gaugeBackColor());
    this.contents.paintOpacity = 255;
  };

  Window_Status.prototype.drawParameters = function(x, y) {
    this.drawParams(y);
    this.drawXparams(y);
  };

  Window_Status.prototype.drawParams = function(y) {
    var x = paramNameX;
    var w = paramNameWidth;
    var x2 = paramX;
    var w2 = paramWidth;
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 6; i++) {
      var paramId = i + 2;
      if (TextManager.param(paramId)) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(paramId), x, y, w);
        this.resetTextColor();
        this.drawText(this._actor.param(paramId), x2, y, w2, 'right');
        y += lineHeight;
      }
    }
  };

  Window_Status.prototype.drawXparams = function(y) {
    var x = xparamNameX;
    var w = xparamNameWidth;
    var x2 = xparamX;
    var w2 = xparamWidth;
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 7; i++) {
      if (xparamText[i]) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(xparamText[i], x, y, w);
        this.resetTextColor();
        var value = this._actor.xparam(i) * 100;
        this.drawText(value.toFixed(xparamFixed), x2, y, w2, 'right');
        y += lineHeight;
      }
    }
  };

  Window_Status.prototype.drawSparams = function(y) {
    var x = sparamNameX;
    var w = sparamNameWidth;
    var x2 = sparamX;
    var w2 = sparamWidth;
    var lineHeight = this.lineHeight();
    for (var i = 7; i < 10; i++) {
      if (xparamText[i]) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(xparamText[i], x, y, w);
        this.resetTextColor();
        var value = this._actor.xparam(i) * 100;
        this.drawText(value.toFixed(xparamFixed) + '%', x2, y, w2, 'right');
        y += lineHeight;
      }
    }
    for (var i = 0; i < 10; i++) {
      if (sparamText[i]) {
        if (paramBackGround) this.drawParamBackGround(x, y, x2 + w2 - x);
        this.changeTextColor(this.systemColor());
        this.drawText(sparamText[i], x, y, w);
        this.resetTextColor();
        var value = this._actor.sparam(i) * 100;
        this.drawText(value.toFixed(sparamFixed) + '%', x2, y, w2, 'right');
        y += lineHeight;
      }
    }
  };

  Window_Status.prototype.drawElementResists = function(y) {
    var x = elementResistX;
    var w = elementResistWidth;
    var lineHeight = this.lineHeight();
    var iconWidth = 0;
    if (elementIcon == 'true') {
      iconWidth = ImageManager.iconWidth;
    }
    this.changeTextColor(ColorManager.normalColor());
    if (pdrIconId > 0) {
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      if (elementIcon == 'true') this.drawIcon(pdrIconId, x, y);
      var n = this._actor.pdr * 100;
      this.drawText(n.toFixed(resistFixed) + '%', x + iconWidth, y, w - iconWidth, 'right');
      if (elementName == 'true') {
        this.changeTextColor(ColorManager.textColor(drColor));
        this.drawText(pdrname, x + iconWidth, y, 90);
      }
      y += lineHeight;
    }
    if (mdrIconId > 0) {
      this.changeTextColor(ColorManager.normalColor());
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      if (elementIcon == 'true') this.drawIcon(mdrIconId, x, y);
      var n = this._actor.mdr * 100;
      this.drawText(n.toFixed(resistFixed) + '%', x + iconWidth, y, w - iconWidth, 'right');
      if (elementName == 'true') {
        this.changeTextColor(ColorManager.textColor(drColor));
        this.drawText(mdrname, x + iconWidth, y, 90);
      }
      y += lineHeight;
    }
    for (var i = 0; i < elementResistIds.length; i++) {
      this.changeTextColor(ColorManager.normalColor());
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      var elementId = +elementResistIds[i];
      if (elementIcon == 'true') this.drawIcon(elementResistIconIds[i], x, y);
      var n = this._actor.elementRate(elementId) * 100;
      //console.log(this._actor.elementRate(elementId) * 100);
      this.drawText(n.toFixed(resistFixed) + '%', x + iconWidth, y, w - iconWidth, 'right');
      if (elementName == 'true') {
        this.changeTextColor(ColorManager.textColor(elColor));
        this.drawText($dataSystem.elements[elementId], x + iconWidth, y, 90);
      }

      //            this.changeTextColor(this.systemColor());
      y += lineHeight;
    }
  };

  Window_Status.prototype.drawStateResists = function(y) {

    var x = stateResistX;
    var w = stateResistWidth;
    var lineHeight = this.lineHeight();
    var iconWidth = 0;
    if (elementIcon == 'true') {
      iconWidth = ImageManager.iconWidth;
    }
    for (var i = 0; i < stateResistIds.length; i++) {
      if (paramBackGround) this.drawParamBackGround(x, y, w);
      var stateId = +stateResistIds[i];
      if (elementIcon == 'true') this.drawIcon($dataStates[stateId].iconIndex, x, y);
      var n = this._actor.stateRate(stateId) * 100;
      if (this._actor.isStateResist(stateId)) n = 0;
      this.changeTextColor(ColorManager.normalColor());
      this.drawText(n.toFixed(resistFixed) + '%', x + iconWidth, y, w - iconWidth, 'right');
      if (elementName == 'true') {
        this.changeTextColor(ColorManager.textColor(stColor));
        this.drawText($dataStates[stateId].name, x + iconWidth, y, 90);
      }
      y += lineHeight;
    }
  };

  Window_Status.prototype.changeParameterMode = function() {
    this._parameterMode = (this._parameterMode + 1) % 2;

    this.refresh();
  };

  //-----------------------------------------------------------------------------
  // Scene_Status
  //

  var _Scene_Status_update = Scene_Status.prototype.update;
  Scene_Status.prototype.update = function() {
    _Scene_Status_update.call(this);
    if (Input.isTriggered('description') || TouchInput.isTriggered() || (useOkKey && Input.isTriggered('ok'))) {
      SoundManager.playOk();
      this._statusWindow.changeParameterMode();
      this._statusWindow.activate();
    }
  };

})();
