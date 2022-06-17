//=============================================================================
// Plugin for RPG Maker MZ
// BattleSystemSelectable.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Enables player to select battle system(TPB Active/Wait) by option
 * @author Sasuke KANNAZUKI
 *
 * @param isTurnBaseAvailable
 * @text Turn Base Selectable?
 * @desc Can Player Select Turn Base?
 * @type boolean
 * @on Yes.
 * @off No. TPB only.
 * @default false
 *
 * @param dummy4text
 * @text [Text]
 * @desc child parameters set text to display
 * @type string
 * @default 
 *
 * @param textBattleSystem
 * @parent dummy4text
 * @text Battle System Text
 * @desc Title of the option
 * @type string
 * @default Battle System
 *
 * @param textTpbActive
 * @parent dummy4text
 * @text TPB Active Text
 * @desc Text that means Time Progressive(Active).
 * @type string
 * @default TPB(Active)
 *
 * @param textTpbWait
 * @parent dummy4text
 * @text TPB Wait Text
 * @desc Text that means Time Progressive(Wait).
 * @type string
 * @default TPB(Wait)
 *
 * @param textTurnBased
 * @parent dummy4text
 * @text Turn-Based
 * @desc Text that means Turn-Based.
 * @type string
 * @default Turn-Based
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 * This plugin enables players to select battle system.
 * Player can select TPB(Time Progress Battle) Active or Wait.
 * As option, player enables to also select Turn-Based Battle.
 *
 * [Note]
 * This change affects all over the project.
 * For example, you change the option at save data 1's system,
 * another system also changes.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc TPBアクティブとウェイトをオプションで変更可能にします
 * @author 神無月サスケ
 *
 * @param isTurnBaseAvailable
 * @text ターン制も加える？
 * @desc 選択肢にターン制も選択可能にする？
 * @type boolean
 * @on する
 * @off しない
 * @default false
 *
 * @param dummy4text
 * @text [文字列]
 * @desc 以下で画面に表示するテキストを設定します。
 * @type string
 * @default 
 *
 * @param textBattleSystem
 * @parent dummy4text
 * @text 戦闘システム
 * @desc 「戦闘システム」を意味する文字列です。
 * @type string
 * @default 戦闘システム
 *
 * @param textTpbActive
 * @parent dummy4text
 * @text TPBアクティブ
 * @desc 「タイムプログレス戦闘(アクティブ)」を意味する文字列です。
 * @type string
 * @default TPBアクティブ
 *
 * @param textTpbWait
 * @parent dummy4text
 * @text TPBウェイト
 * @desc 「タイムプログレス戦闘(ウェイト)」を意味する文字列です。
 * @type string
 * @default TPBウェイト
 *
 * @param textTurnBased
 * @parent dummy4text
 * @text ターン制
 * @desc 「ターン制」を意味する文字列です。
 * @type string
 * @default ターン制
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 * このプラグインは、オプション画面から戦闘システムの変更(TPBアクティブ、
 * ウェイト、ターン制(オプション))をプレイヤーに許可します。
 *
 * ■注意
 * この変更はゲームを通して有効になります。すなわち、
 * 全てのセーブデータが影響を受けます。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = 'BattleSystemSelectable';
  //
  // process parameters
  //
  const parameters = PluginManager.parameters(pluginName);
  const useTurnBased = eval(parameters['isTurnBaseAvailable'] || 'false');
  const textBattleSystem = parameters['textBattleSystem'] || 'Battle System';
  const textTpbActive = parameters['textTpbActive'] || 'TPB(Active)';
  const textTpbWait = parameters['textTpbWait'] || 'TPB(Wait)';
  const textTurnBased = parameters['textTurnBased'] || 'Turn-Based';

  //
  // Add new option to config
  //
  ConfigManager.battleSystem = null;

  const _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    let config = _ConfigManager_makeData.call(this);
    config.battleSystem = this.battleSystem;
    return config;
  };

  const _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    this.battleSystem = this.readMagicNumber(config, 'battleSystem');
  };

  ConfigManager.readMagicNumber = function(config, name) {
    return (name in config) ? config[name] : null;
  };

  //
  // Functions to get current battle system
  //
  const currentbattleSystem = () => {
    const type = ConfigManager.battleSystem;
    return type != null ? type : $dataSystem.battleSystem;
  };

  BattleManager.isTpb = function() {
    return currentbattleSystem() >= 1;
  };

  BattleManager.isActiveTpb = function() {
    return currentbattleSystem() === 1;
  };

  //
  // Add new handler 'battleSystem' to option window
  //
  Window_Options.prototype.isBattleSystemSymbol = function(symbol) {
    return symbol === 'battleSystem';
  };

  const _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isBattleSystemSymbol(symbol)) {
      this.changebattleSystem(true);
      return;
    }
    _Window_Options_processOk.call(this);
  };

  const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
  Window_Options.prototype.cursorRight = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isBattleSystemSymbol(symbol)) {
      this.changebattleSystem(true);
      return;
    }
    _Window_Options_cursorRight.call(this);
  };

  const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
  Window_Options.prototype.cursorLeft = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    if (this.isBattleSystemSymbol(symbol)) {
      this.changebattleSystem(false);
      return;
    }
    _Window_Options_cursorLeft.call(this);
  };

  //
  // Set new value from option window
  //
  Window_Options.prototype.changebattleSystem = function(value) {
    let battleSystem = currentbattleSystem();
    if (useTurnBased) {
      battleSystem = value ? ++battleSystem : --battleSystem;
      battleSystem = battleSystem.mod(3);
    } else {
      battleSystem = battleSystem === 1 ? 2 : 1;
    }
    this.changeValue('battleSystem', battleSystem);
  };

  Window_Options.prototype.battleSystemText = function(value) {
    return [textTurnBased, textTpbActive, textTpbWait][currentbattleSystem()];
  };

  const _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    if (this.isBattleSystemSymbol(symbol)) {
      const value = currentbattleSystem();
      return this.battleSystemText(value);
    }
    return _Window_Options_statusText.call(this, index);
  };

  const _Window_Options_makeCommandList =
    Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    _Window_Options_makeCommandList.call(this);
    this.addCommand(textBattleSystem, 'battleSystem');
  };

  //
  // Fit option window
  //
  const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
  Scene_Options.prototype.maxCommands = function() {
    return _Scene_Options_maxCommands.call(this) + 1;
  };

})();
