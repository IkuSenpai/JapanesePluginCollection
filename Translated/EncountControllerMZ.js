//=============================================================================
// EncountControllerMZ.js
//=============================================================================
 /*:
 * @target MZ
 * @plugindesc Tuning encount rate
 * @author Tamaki Awana
 * @help Depending on the value assigned to the set variable,
 * and adjust the encounter rate automatically.
 * The standard formula has a lower encounter frequency
 * than the RPG Maker default,
 * -- 0 to Maximum value of random number
 *     + Appearance number of steps of the enemy on the map.
 * 
 * How to use:
 * Input these values into variable setted at EncountVariable,
 * change a formula for encount rate soon.
 * 0：default
 *   (0 to Maximum value of random number
 *     + Appearance number of steps of the enemy on the map)
 * 1：Few
 *   ((0 to Maximum value of random number)*2
 *      + Appearance number of steps of the enemy on the map)
 * 2：Many(RPG Maker default）
 * If you want to fine-tune the calculation formula or 
 * increase the setting items, modify the source code of this plugin.
 * 
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.2.1 English and RMMZ 1.3.2 supported.
 * ver.1.2 Bug fix : Encounter endlessly if no EncountVariable is set
 * ver.1.1 Bug fix : Moving to a map with an encounter setting,
 *                   the battle starts immediately.
 * ver.1.0.1 Paramater Settings optimize
 * ver.1.0 Release
 * 
 * ---
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * This plugin is based on a "RPGツクールMVで感動ものを作る。" 
 * that kotonoha*'s blog article 
 * "ストレスフリーなランダムエンカウントを目指す"
 * (http://ktnhmv.jugem.jp/?eid=8).
 * Thanks to kotonoha*.
 * 
 * 
 * @param EncountVariable
 * @desc Setting variable for encount rate judging.
 * @type variable
 * @default 0
 * 
 * @param EncountRate
 * @desc Maximum value of random number for tuning encount rate.
 * @type number
 * @min 0
 * @default 5
 */
 /*:ja
 * @target MZ
 * @plugindesc エンカウント率調整
 * @author 沫那環
 * @help  設定した変数に代入された値に応じて、自動でエンカウント率を調整します。
 * 標準の計算式は、ツクール標準のものよりエンカウントの頻度が抑えられた、
 * 0～乱数の最大値 + マップに設定された敵出現歩数
 * となります。
 * 
 * 【使い方】
 * EncountVariableで設定した変数に、以下の値を代入すると、
 * エンカウント率を算出する式をその場で変更することができます。
 * 0：標準（0～乱数の最大値 + マップに設定された敵出現歩数）
 * 1：少な目（0～乱数の最大値*2 + マップに設定された敵出現歩数）
 * 2：多め（ツクール標準）
 * 計算式をもっと細かく調節したい場合や、
 * もっと設定項目を増やしたい場合は、このプラグインのソースコードを
 * 改変してください。
 * 
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * ver.1.2.1 英語表示と、MZの1.3.2へ対応
 * ver.1.2 EncountVariableが設定されていないと勝手にエンカウントするバグを修正
 * ver.1.1 エンカウント設定がされたマップに移動すると、
 *         すぐに戦闘開始してしまうバグを修正
 * ver.1.0.1 パラメータの設定を最適化
 * ver.1.0 公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されます。
 * https://opensource.org/licenses/mit-license.php
 * 
 * このプラグインを制作するにあたり、kotonoha*さんのブログ
 * 「RPGツクールMVで感動ものを作る。」の記事
 * 「ストレスフリーなランダムエンカウントを目指す」を参考にしました。
 * （http://ktnhmv.jugem.jp/?eid=8）
 * この場を借りて、御礼を申し上げます。
 * 
 * @param EncountVariable
 * @desc エンカウント率の調整を判定する変数を設定します。
 * @type variable
 * @default 0
 * 
 * @param EncountRate
 * @desc エンカウント率を調整する乱数の最大値
 * @type number
 * @min 0
 * @default 5
 */

(() => {

   const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
   const parameters = PluginManager.parameters(pluginName);
   const EncountVariable = Number(parameters['EncountVariable'] || 0);
   const EncountRate = Number(parameters['EncountRate'] || 5);

   if (EncountVariable) {
      Game_Player.prototype.makeEncounterCount = function() {
         const n = $gameMap.encounterStep();
            if ($gameVariables.value(EncountVariable) === 0) {
               this._encounterCount = Math.randomInt(EncountRate) + n;
            } else if ($gameVariables.value(EncountVariable) === 1) {
               this._encounterCount = (Math.randomInt(EncountRate) * 2) + n;
            } else if ($gameVariables.value(EncountVariable) === 2) {
               this._encounterCount = Math.randomInt(EncountRate) + Math.randomInt(EncountRate) + 1;
            }
      };
   };
   
})();