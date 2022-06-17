/*
 * --------------------------------------------------
 * MNKR_YEP_X_AnimatedSVEnemies_Patch_EnemyStateIconOffset.js
 *   Ver.0.0.1
 * Copyright (c) 2021 Munokura
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MV
 * @url https://raw.githubusercontent.com/munokura/MNKR-MV-plugins/master/MNKR_YEP_X_AnimatedSVEnemies_Patch_EnemyStateIconOffset.js
 * @plugindesc YEP_X_AnimatedSVEnemies使用時にMNKR_EnemyStateIconOffsetを動作させるパッチ
 * @author munokura
 *
 * @help
 * MNKR_EnemyStateIconOffset と YEP_X_AnimatedSVEnemies とを同時に使用する時、
 * YEP_X_AnimatedSVEnemies の影響で MNKR_EnemyStateIconOffset が動作しません。
 * これを解決するパッチプラグインです。
 * 
 * プラグイン管理リストでYEP_X_AnimatedSVEnemiesの下側に配置してください。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 */

(() => {
  "use strict";

  Sprite_Enemy.prototype.updateStateIconHeight = function () {
  };

})();