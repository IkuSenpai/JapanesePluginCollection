//=============================================================================
// BattleResultsPopupMZ.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Displays a battle results window instead of text messages.
 * @author Yoji Ojima(Ported for RMMZ by Tamaki Awana)
 *
 * @param ShowLevelUp
 * @text Showing messages when leveling up
 * @desc Whether to show messages when leveling up
 * @type boolean
 * @on Show
 * @off Don't show
 * @default false
 *
 * @help This plugin is a port to RPG Maker MZ
 * that RPG Maker MV plugin "Battle Results Popup" (made by Yoji Ojima).
 * This plugin displays a battle results window instead of text messages.
 * And, I have added a function to switch whether to show the message
 * when leveling up.
 *
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.0.2 Code optimize
 *           Fix window positions
 * ver.1.0.1 RMMZ 1.3.2 supported
 * ver.1.0 Release
 *
 * ---
 * This work is provided under the TKCM Blue License
 * - https://rpgmaker.materialcommons.org/tkcm-b-summary/
 * Require RPG Maker: RPG Maker MV
 * Credits display:
 *  Original plugin: Yoji Ojima
 *  Ported for RPG Maker MZ: Tamaki Awana(https://razor-edge.work/)
 */
/*:ja
 * @target MZ
 * @plugindesc 戦闘結果の表示をポップアップ形式に変更します。
 * @author Yoji Ojima（MZ移植：沫那環）
 *
 * @param ShowLevelUp
 * @text レベルアップ時のメッセージの表示
 * @desc レベルアップした時に、メッセージを表示するかどうか
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default false
 *
 * @help Yoji Ojima様作のRPGツクールMV用プラグイン「BattleResultsPopup」を、
 * RPGツクールMZ用に移植したものです。
 * このプラグインを導入すると、戦闘結果の表示をポップアップ形式に変更します。
 * さらに、レベルアップ時のメッセージを表示するかどうかを
 * 切り替える機能を追加しました。
 *
 * このプラグインには、プラグインコマンドはありません。
 *
 * 【更新履歴】
 * ver.1.0.2 コードを最適化
 *           ウィンドウの表示位置を調節
 * ver.1.0.1 MZの1.3.2へ対応
 * ver.1.0 公開
 * 
 * ---
 * この作品は ツクラー・コモンズ・ブルー・ライセンスの下に提供されています。
 *  https://tkler.materialcommons.org/tkcm-b-summary/
 * ・必要ツクールシリーズ：RPGツクールMV
 * ・クレジット：原版制作：Yoji Ojima
 * 　　　　　　　MZ移植：沫那環（https://razor-edge.work/）
 */

(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);
  const showlvup = String(parameters["ShowLevelUp"] || false);

  let resultDisplaying = 0;

  const _BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function () {
    _BattleManager_initMembers.call(this);
    resultDisplaying = 0;
  };

  const _BattleManager_update = BattleManager.update;
  BattleManager.update = function (timeActive) {
    _BattleManager_update.call(this, timeActive);
    if (resultDisplaying > 0) {
      if (++resultDisplaying >= 60) {
        if (Input.isTriggered("ok") || TouchInput.isTriggered()) {
          resultDisplaying = 0;
        }
      }
    }
  };

  const _BattleManager_isBusy = BattleManager.isBusy;
  BattleManager.isBusy = function () {
    return _BattleManager_isBusy.call(this) || resultDisplaying > 0;
  };

  BattleManager.displayVictoryMessage = function () {};

  BattleManager.displayRewards = function () {
    resultDisplaying = 1;
  };

  Game_Actor.prototype.shouldDisplayLevelUp = function () {
    if (showlvup == "true") {
      return true;
    } else {
      return false;
    }
  };

  const _Scene_Battle_update = Scene_Battle.prototype.update;
  Scene_Battle.prototype.update = function () {
    _Scene_Battle_update.call(this);
    if (resultDisplaying > 30 && !this._resultWindow) {
      this._resultWindow = new Window_BattleResults();
      this.addWindow(this._resultWindow);
    }
  };

  const _Scene_Battle_stop = Scene_Battle.prototype.stop;
  Scene_Battle.prototype.stop = function () {
    _Scene_Battle_stop.call(this);
    if (this._resultWindow) {
      this._resultWindow.close();
    }
  };

  function Window_BattleResults() {
    this.initialize(...arguments);
  }

  Window_BattleResults.prototype = Object.create(Window_Base.prototype);
  Window_BattleResults.prototype.constructor = Window_BattleResults;

  Window_BattleResults.prototype.initialize = function () {
    const rewards = BattleManager._rewards;
    const ww = 400;
    let wh = this.fittingHeight(Math.min(9, rewards.items.length + 1));
    const statusHeight = this.fittingHeight(4);
    const wx = (Graphics.boxWidth - ww) / 2;
    let wy = (Graphics.boxHeight - statusHeight - wh) / 2;
    Window_Base.prototype.initialize.call(this, new Rectangle(wx, wy, ww, wh));
    this.refresh();
    this.openness = 0;
    this.open();
  };

  Window_BattleResults.prototype.refresh = function () {
    let x = this.itemPadding();
    let y = 0;
    let width = this.contents.width;
    const lineHeight = this.lineHeight();
    const rewards = BattleManager._rewards;
    const items = rewards.items;
    this.contents.clear();

    this.resetTextColor();
    this.drawText(rewards.exp, x, y);
    x += this.textWidth(rewards.exp) + 6;
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.expA, x, y);
    x += this.textWidth(TextManager.expA + "  ");

    this.resetTextColor();
    this.drawText(rewards.gold, x, y);
    x += this.textWidth(rewards.gold) + 6;
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.currencyUnit, x, y);

    x = 0;
    y += lineHeight;

    items.forEach(function (item) {
      this.drawItemName(item, x, y, width);
      y += lineHeight;
    }, this);
  };
})();
