/*=============================================================================
 AltKeyPatch.js
----------------------------------------------------------------------------
 (C)2020 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.1 2020/10/15 MZ compatible version was created.
 1.0.0 2020/10/15 First release
----------------------------------------------------------------------------
 [Blog] : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @plugindesc AltKeyPatchPlugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AltKeyPatch.js
 * @author triacontane
 *
 * @help AltKeyPatch.js
 *
 * In RPGMaker MV/MZ, the Ctrl and Alt keys have the same behavior.
 * In this patch, it is separated.
 * In this patch, it is separated and pressing the Alt key no
 * In this patch, it is separated and pressing the Alt key no longer behaves like the Ctrl key.
 * * Instead, the content of the code of the code has the same behavior.
 * Instead, the content of the code "alt" is assigned.
 * (This is used when you can specify the contents of the code as a plugin)
 *
 * This plugin is released under the MIT License.
 */
/*:en
 * @plugindesc Alt key separation patch
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AltKeyPatch.js
 * @author Triacontan
 *
 * @help AltKeyPatch.js
 * In Tskool MV/MZ, the Ctrl key and Alt key are assigned the same behavior.
 * This patch separates the Ctrl key from the Alt key.
 * This patch separates them, so that pressing the Alt key will not cause the Ctrl key to * behave the same way.
 *
 * Instead, the content of the code "alt" will be assigned.
 * (This is used when it is possible to specify it by plug-ins, etc.)
 *
 * Terms of use: *
 * * You can modify and redistribute without permission of the author, and there are no restrictions on the type of use (commercial, 18 prohibited use, etc.).
 * * You can modify and redistribute this plugin without permission of the author.
 * This plugin is now yours.
 */

(function() {
    'use strict';

    Input.keyMapper[18] = 'alt';
})();
