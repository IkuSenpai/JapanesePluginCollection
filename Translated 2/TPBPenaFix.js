/*:
 * @target MZ
 * @plugindesc TPB penalty rate fix
 * @author Tamaki Awana
 *
 * @param TPB Default Penalty Rate
 * @desc 
 * @type number
 * @max 100
 * @min 0
 * @default 0
 * 
 * @help
 * The penalty for failing to escape in TPB will be reset to pre-set rate value in the charge time.
 * You install this plugin prevents the icon from getting out of place,
 *  when you are installed time line type TPB plugins and escape fails.
 * 
 * And, you can customize TPB penalty rate by writing the notetag 
 * on actor, class, weapon, armor, state.
 * <TPBPenaltyRate:(value of 0 to 100)>
 * Ex.<TPBPenaltyRate:20>: changeing the TPB penalty rate to 20%.
 * It is possible to set 101% or more, but it is not recommended positively 
 * because it may upset the game balance.
 *
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.1.1 Fixed an omission in the English version help
 * ver.1.1 Added the function to change the value of the penalty rate
 * ver.1.0 Release
 * 
 * ---
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc TPBペナルティ改良
 * @author 沫那環
 *
 * @param TPB Default Penalty Rate
 * @desc 
 * @type number
 * @max 100
 * @min 0
 * @default 0
 * 
 * @help
 * TPBで逃走失敗時に受けるペナルティを、あらかじめ設定しておいた値にリセットする仕様にします。
 * このプラグインを導入すると、タイムライン型のTPBプラグインで逃走失敗した時、
 * アイコンの位置がはみ出てしまうことを防ぎます。
 * 
 * また、アクター・職業・武器・防具・ステートのメモ欄に、
 * <TPBPenaltyRate:(0から100までの値)>と記載することで、
 * ペナルティの値を指定したパーセンテージに設定できます。
 * ※101％以上を設定することも可能ですが、ゲームバランスが崩れる可能性があるため、
 * 　積極的にはおすすめしません。
 * 例：<TPBPenaltyRate:20>　ペナルティを20％に設定する
 * 
 *
 * プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * ver.1.1.1 英語版のヘルプに表記漏れがあったところを修正
 * ver.1.1 ペナルティの値を変更できる機能を追加
 * ver.1.0 公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 */

(() => {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);
  const tpbpr = Number((parameters['TPB Default Penalty Rate']) || 0);

  const _Game_Battler_applyTpbPenalty = Game_Battler.prototype.applyTpbPenalty;
  Game_Battler.prototype.applyTpbPenalty = function () {
    _Game_Battler_applyTpbPenalty.call(this);
    if (traitObject.meta.TPBPenaltyRate) {
      rate = Number(traitObject.meta.TPBPenaltyRate)
    } else {
      if (tpbpr == 0) {
        rate = 0;
      } else {
        rate = tpbpr / 100;
      };
    }
    this._tpbChargeTime = rate;
  };
})();
