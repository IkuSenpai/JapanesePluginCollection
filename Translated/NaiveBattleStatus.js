//=============================================================================
// Plugin for RPG Maker MZ
// NaiveBattleStatus.js
//=============================================================================
// [Update History]
// 2022.May.25 Ver1.0.0 First Release
// 2022.May.29 Ver1.1.0 Add several options

/*:
 * @target MZ
 * @plugindesc Make battle status view very simple
 * @author Sasuke KANNAZUKI
 *
 * @param isZenkaku
 * @text Is Number Zenkaku?
 * @desc Does display number Zenkaku letters inJapanese?
 * @on Yes. Zenkaku.
 * @off No. normal
 * @type boolean
 * @default false
 *
 * @param useSystemColor
 * @text Draw Param Name Color
 * @desc Does it draw parameter name(ex.HP) by System Color or Normal Color?
 * @type boolean
 * @on Yes. System Color
 * @off No. Noramal Color
 * @default true
 *
 * @help This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MZ.
 * This plugin makes battle status view very simple.
 *
 * [Summary]
 * - Don't display actor's face
 * - Draw HP/MP/TP/Lv (It can be Japanese Zenkaku Style)
 * - Don't display gauges except TPB gauge.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc 非常にシンプルな戦闘ステータス表示
 * @author 神無月サスケ
 *
 * @param isZenkaku
 * @text 数値は全角？
 * @desc HPなどの値を全角表示？　通常の半角表示？
 * @on はい。全角で
 * @off いいえ。半角で
 * @type boolean
 * @default true
 *
 * @param useSystemColor
 * @text パラメータ名描画色
 * @desc 通常のシステムカラーにするか(true)、ノーマルカラーにするか(false)
 * @type boolean
 * @on システムカラー
 * @off ノーマルカラー
 * @default true
 *
 * @help このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMZに対応しています。
 * このプラグインは、戦闘時のアクターのステータス表示を、
 * 非常にシンプルにします。
 *
 * ■概要
 * - 顔グラフィックを表示しません
 * - HP/MP/TP/Lvのみ表示します(数値は全角にもできます。)
 * - TPBゲージ以外のゲージを表示しません。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'NaiveBattleStatus';

  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const isZenkaku = eval(parameters['isZenkaku']);
  const isSystemColor = eval(parameters['useSystemColor']);

  //
  // use zenkaku letter in Japanese
  //
  const toZenkaku = str => {
    return String(str).replace(/[A-Za-z0-9]/g, s => {
      return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
    });
  };

  //
  // do not display actor's face.
  //
  Window_BattleStatus.prototype.drawActorFace = function(actor, x, y, width,
   height) {
    //
  };

  //
  // At battle scene, it needs to keep refreshing
  //

  //!!overwrite!!
  Window_BattleStatus.prototype.preparePartyRefresh = function() {
    this.refresh();
  };

  //!!overwrite!!
  Window_BattleStatus.prototype.update = function() {
    Window_StatusBase.prototype.update.call(this);
    this.preparePartyRefresh();
  };

  //
  // draw various informations
  //

  //!!overwrite!!
  Window_BattleStatus.prototype.drawItemStatus = function(index) {
    const actor = this.actor(index);
    const rect = this.itemRectWithPadding(index);
    this.drawFirstLine(index, actor, rect);
    this.drawParameters(index, actor, rect);
  };

  Window_BattleStatus.prototype.drawFirstLine = function(index, actor, rect) {
    const nameX = rect.x + 4;
    const nameY = rect.y + 12;
    this.placeTimeGauge(actor, nameX, nameY + 16);
    this.placeActorName(actor, nameX, nameY);
  };

  const needsDisplayIcon = actor => !!actor.allIcons().length;

  Window_BattleStatus.prototype.drawParameters = function(index, actor, rect) {
    const lineHeight = this.lineHeight();
    const originX = rect.x;
    const width = rect.width;
    const originY = rect.y + 12;
    this.drawActorHpMV(actor, originX , originY + lineHeight * 1, width);
    this.drawActorMpMV(actor, originX , originY + lineHeight * 2, width);
    if (needsDisplayIcon(actor)) {
      if ($dataSystem.optDisplayTp) {
        this.drawActorTpMV(actor, originX , originY + lineHeight * 3, width);
        this.drawActorIcons(actor, originX, originY + lineHeight * 4);
      } else {
        this.drawActorIcons(actor, originX, originY + lineHeight * 3);
        this.drawActorLvlMV(actor, originX, originY + lineHeight * 4, width);
      }
    } else {
      if ($dataSystem.optDisplayTp) {
        this.drawActorTpMV(actor, originX , originY + lineHeight * 3, width);
      }
      this.drawActorLvlMV(actor, originX, originY + lineHeight * 4, width);
    }
  };

  //
  // functions to draw parameters
  //
  Window_BattleStatus.prototype.paramNameColor = function(actor) {
    return isSystemColor ? this.systemColor() : ColorManager.hpColor(actor);
  };

  Window_BattleStatus.prototype.drawActorHpMV = function(actor, x, y, width) {
    this.changeTextColor(this.paramNameColor(actor));
    this.drawText(TextManager.hpA, x, y, 44);
    this.drawCurrentMV(actor, actor.hp, x, y, width);
  };

  Window_BattleStatus.prototype.drawActorMpMV = function(actor, x, y, width) {
    this.changeTextColor(this.paramNameColor(actor));
    this.drawText(TextManager.mpA, x, y, 44);
    this.drawCurrentMV(actor, actor.mp, x, y, width);
  };

  Window_BattleStatus.prototype.drawActorTpMV = function(actor, x, y, width) {
    this.changeTextColor(this.paramNameColor(actor));
    this.drawText(TextManager.tpA, x, y, 44);
    this.drawCurrentMV(actor, actor.tp, x, y, width);
  };

  Window_BattleStatus.prototype.drawCurrentMV = function(actor, current, x, y,
   width) {
    const valueWidth = this.textWidth(isZenkaku ? '００００' : '0000');
    const x1 = x + width - valueWidth;
    this.changeTextColor(ColorManager.hpColor(actor));
    const dispValue = isZenkaku ? toZenkaku(current) : current;
    this.drawText(dispValue, x1, y, valueWidth, 'right');
  };

  Window_BattleStatus.prototype.drawActorLvlMV = function(actor, x, y, width) {
    this.changeTextColor(this.paramNameColor(actor));
    this.drawText(TextManager.levelA, x, y, 48);
    this.changeTextColor(ColorManager.hpColor(actor));
    this.drawText(toZenkaku(actor.level), x, y, width, 'right');
  };

})();
