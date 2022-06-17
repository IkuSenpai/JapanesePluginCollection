//=============================================================================
// - OmitTarget
// OmitTarget.js
//=============================================================================

//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc 戦闘画面でターゲット選択時、対象が一つの場合は省略します。
 * @author 名無し蛙 (著作権は放棄。クレジット表記は不要です)
 * @url https://tm.lucky-duet.com/viewtopic.php?f=5&t=3131
 *
 * @help
 * 戦闘画面でターゲット選択時、対象が一つの場合は省略します。
 *
 * ↓以下、merusaiaが追記、Utsuda Shinouも追記
 *
 * ■更新履歴
 * 20160704: Version 0.:  名無し蛙さんの初版。
 * 20160704: Version 1.0: merusaiaがコメントと説明文のみ追加。
 * 20200906: Version 2.0: Utsuda ShinouがMZ対応を追加。
 *
 * 【使い方】
 * プラグインをONにすると、戦闘画面でターゲット選択時、対象が一つの場合は省略します。
 * ドラ◯エのように、敵が一人の時、わざわざターゲットを選ぶムダな処理がなくなるので、ムダな操作を削減できます。
 * 対象が味方一人の場合も省略しています。
 *
 * ボタンやキー押しっぱなし操作ができるキーボードやゲームパッド操作ではそこまで体感はないかもしれませんが、
 * 特にタップ／クリック数をかなり削減できて、スマホユーザにも優しい設計に出来ます。
 * スマホユーザ向けのRPGには、必須のプラグインかもです。
 *
 * 【プラグインコマンド】
 * このプラグインは、プラグインコマンドを含みません。
 *
 * 【競合について】
 *   以下のメソッドを追記（一度元のメソッドを別の名前にして、call(this)で呼び出し、その後に上書き）しています。
 *    → 上記メソッドを丸ごと上書きしているプラグインとの競合に注意してください。
 *　　　 競合をチェックするには、以下を「js」フォルダ内検索をして、丸ごと上書きしているメソッドがないか調べられます。
 *      (MVの場合)
 *　　　・Scene_Battle.prototype.selectActorSelection = function()
 *　　　・Scene_Battle.prototype.selectEnemySelection = function()
 *      (MZの場合)
 *　　　・Scene_Battle.prototype.startActorSelection = function()
 *　　　・Scene_Battle.prototype.startEnemySelection = function()
 *
 * 【著作権フリーについて】
 * このプラグインは「地球の共有物（パブリックドメイン）」です。
 * 　　・無償・有償問わず、あらゆる作品に使用でき、また自由に改変・改良・二次配布できます。
 * 　　・著作表示のわずらわしさを回避するため、著作権は放棄します。事後報告、クレジット記載も不要です。
 * 　　・もちろんクローズドに使っていただいてもOKです。是非、自分好みに改造してお使いください。
 *
 */
//=============================================================================

(() => {
  "use strict";
  const skipOneActorSelection = function () {
    if (this._actorWindow.maxItems() === 1) {
      this._actorWindow.deactivate();
      this.onActorOk();
    }
  };
  const skipOneEmemySelection = function () {
    if (this._enemyWindow.maxItems() === 1) {
      this._enemyWindow.deactivate();
      this.onEnemyOk();
    }
  };
  //
  // For MZ
  //
  if (Utils.RPGMAKER_NAME === "MZ") {
    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function () {
      _Scene_Battle_startActorSelection.call(this);
      skipOneActorSelection.call(this);
    };
    const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection = function () {
      _Scene_Battle_startEnemySelection.call(this);
      skipOneEmemySelection.call(this);
    };
  }
  //
  // For MV
  //
  if (Utils.RPGMAKER_NAME === "MV") {
    const _Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
    Scene_Battle.prototype.selectActorSelection = function () {
      _Scene_Battle_selectActorSelection.call(this);
      skipOneActorSelection.call(this);
    };
    const _Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function () {
      _Scene_Battle_selectEnemySelection.call(this);
      skipOneEmemySelection.call(this);
    };
  }
})();
//=============================================================================
// End of File
//=============================================================================
