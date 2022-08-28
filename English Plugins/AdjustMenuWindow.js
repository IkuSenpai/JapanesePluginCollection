/*:
 * @plugindesc Plugin to make the menu screen top-aligned.
 * @target MZ
 * @url
 * @author Tom the Wanderer
 *
 *
 * @help AdjustMenuWindow.js
 *
 * This is a plugin to adjust the menu screen to the top when the touch UI is turned off.
 *
 * This plugin has no plugin command.
 *
 * Terms of use
 * You don't need to put any credits.
 * * * The author will be pleased if you do so.
 * There are no restrictions on secondary distribution or unauthorized reproduction.
 * We are not responsible for any problems that may occur after installing this plugin.
 * We are not responsible for any problems that may occur by installing this plugin.
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
