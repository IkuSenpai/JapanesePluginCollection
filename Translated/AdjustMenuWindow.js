
/*:
 * @plugindesc メニュー画面を上寄せにするプラグイン
 * @target MZ
 * @url 
 * @author さすらいのトム
 *
 *
 * @help AdjustMenuWindow.js
 *
 * タッチUIをオフにした時、メニュー画面を上寄せにするプラグインです。
 * 
 * このプラグインには、プラグインコマンドはありません。
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 * 
 */

(() => {
    'use strict';

    const Scene_MenuBase_prototype_mainAreaTop = Scene_MenuBase.prototype.mainAreaTop;
    Scene_MenuBase.prototype.mainAreaTop = function() {
        if (!ConfigManager.touchUI) {
            return 0;
        }
        return Scene_MenuBase_prototype_mainAreaTop.apply(this, arguments);

    };
})();
