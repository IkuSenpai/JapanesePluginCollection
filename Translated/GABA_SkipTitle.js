//=============================================================================
// RPG Maker MZ - Skip Title
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Skip Title.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_SkipTitle.js(ver1.0.0)
 *
 * Skip title scene. The new game will start automatically.
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 */

/*:ja
 * @target MZ
 * @plugindesc タイトル画面をスキップします。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_SkipTitle.js(ver1.0.0)
 *
 * タイトル画面をスキップします。（自動的にニューゲームが選ばれた状態になります）
 *
 * プラグインコマンドはありません。
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 */

(() => {

    Scene_Boot.prototype.startNormalGame = function() {
        this.checkPlayerLocation();
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
    };
    
})();
