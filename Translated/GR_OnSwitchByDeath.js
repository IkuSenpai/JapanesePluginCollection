//=============================================================================
// Plugin for RPG Maker MV/MZ
// GR_OnSwitchByDeath.js
// ----------------------------------------------------------------------------
// Released under the MIT License.
// https://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 1.0.2
// （更新履歴）
// ・MVでも動作可能であることを確認、それに伴いアノテーションを修正。他、コード体裁の微細な修正
// ・strictモードの記述に誤りがあったので修正
//=============================================================================
/*:ja
 * @target MV MZ
 * @plugindesc 戦闘中にアクターのＨＰが０になった際に指定スイッチをオンにする
 * @author げれげれ
 * @url https://twitter.com/geregeregere
 *
 * @param switchId
 * @text スイッチID
 * @desc 死亡（戦闘不能）によって操作されるスイッチのID
 * @default 1
 * @type number
 * @min 1
 *
 * @param variableId
 * @text 変数ID
 * @desc 死亡（戦闘不能）になったアクターのアクターIDを格納するゲーム変数ID
 * @default 1
 * @type number
 * @min 1
 *
 * @help
 * バトル中にアクターのHPが０になった際、指定したスイッチをオンにします。
 * また、その際に該当アクターのアクターIDをゲーム変数に格納します。
 * （※全体攻撃などで複数のアクターが同時に倒れた場合は
 * 一番最後に倒れたアクターのアクターIDのみを格納します）
 *
 * なお、この機能は戦闘中のみ有効です。
 * マップシーンでのスリップダメージや床ダメージ、イベントコマンドによるHP増減などで
 * HP０となっても反応しません。
 *
 */

"use strict";
{
  const PLUGIN_NAME = "GR_OnSwitchByDeath";

  //プラグインパラメータ=================================================
  const PARAMETERS = PluginManager.parameters(PLUGIN_NAME);
  const SWITCH_ID = Number(PARAMETERS["switchId"]);
  const VARIABLE_ID = Number(PARAMETERS["variableId"]);

  //実処理==============================================================
  const Game_Battler_gainHp = Game_Battler.prototype.gainHp;
  Game_Actor.prototype.gainHp = function (value) {
    Game_Battler_gainHp.call(this, value);
    if (this.hp <= 0 && $gameParty.inBattle()) {
      $gameSwitches.setValue(SWITCH_ID, true);
      $gameVariables.setValue(VARIABLE_ID, this.actorId());
    }
  };
}
