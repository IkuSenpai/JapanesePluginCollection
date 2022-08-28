/*=============================================================================
 AlwaysGameActive.js
----------------------------------------------------------------------------
 (C)2022 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 01/26/2022 First version
----------------------------------------------------------------------------
 [Blog] : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @plugindesc Always game active plugin.
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AlwaysGameActive.js
 * @author Triacontan.
 *
 * @help AlwaysGameActive.js
 *
 * Repeal the MZ spec where the game stops when the window loses focus, and
 * * Makes the game keep running even when out of focus.
 *
 * Terms of use:.
 * * You can modify and redistribute the game without permission of the author, and there are no restrictions on the type of use (commercial, 18 banned use, etc.)
 * * You can modify and redistribute this plugin without permission of the author.
 * This plugin is now yours.
 */

(() => {
    'use strict';
    SceneManager.isGameActive = function() {
        return true;
    };
})();
