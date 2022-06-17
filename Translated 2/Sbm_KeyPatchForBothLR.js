/*
===============================================================================
 RPG Maker MZ - Sbm KeyPatchForBothLR (1.0.0)
===============================================================================
 Copyright (c) 2021 Suib
 This software is released under the MIT License.
 http://www.opensource.org/licenses/mit-license
===============================================================================
*/

/*:
 * @target MZ
 * @plugindesc this plugin provides key patch that For both left and right uses.
 * @author Suib
 * @url https://github.com/suibotsukuiki/RPGMakerMZ/blob/main/Sbm_KeyPatchForBothLR.js
 *
 * @help Sbm_KeyPatchForBothLR.js
 *
 * -- Summary --
 * this plugin provides key patch that For both left and right uses.
 * 
 * -- Usage --
 * It is applied only by installing this plugin.
 * 
 * -- Changes --
 * <Keyboard>
 * - W          : pagedown  -> up arrow
 * - Alt        : control   -> alt
 * <Numpad>
 * - 0          : escape    -> shift
 * - 2          : down      -> cancel
 * - 4          : left      -> pageup
 * - 6          : right     -> pagedown
 * - 8          : up        -> tab
 * 
 * -- Additions --
 * <Keyboard>
 * - W/A/S/D    : up/left/down/right *(arrow)
 * - Q/E        : pageup/pagedown
 * - C          : ok
 * - R          : escape
 * - Ins/Del    : escape/ok
 * - Home/End   : ok/escape
 * <Numpad>
 * - 0/.        : shift/control
 * - 1/2/3      : ok/cancel/menu
 * - 4/6        : pageup/pagedown 
 * - 5          : escape
 * - 8          : tab
 * - +          : tab
 * - -          : escape
 * <Gamepad>
 * - LT         : tab
 * - RT         : control
 * - back       : escape
 * - start      : ok
 * 
 * -- Terms of Use --
 * Comply with the MIT license agreement.
 * http://www.opensource.org/licenses/mit-license
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 左右兼用のキー配置を適用します。
 * @author 水部
 * @url https://github.com/suibotsukuiki/RPGMakerMZ/blob/main/Sbm_KeyPatchForBothLR.js
 * 
 * @help Sbm_KeyPatchForBothLR.js
 *
 * 【概要】
 * このプラグインは、左右兼用のキー配置を適用します。
 * 「WASDキーによる移動」、「テンキーでの基本操作」などの追加改変を含みます。
 * 左手で移動、右手で決定/キャンセル。もしくは左手のみでの操作が可能です。
 * 
 * 【使用方法】
 * 本プラグインを導入するだけで適用されます。
 * 
 * 【改変内容】
 * <キーボード>
 * ・W          ：pagedown  → up arrow
 * ・Alt        ：control   → alt
 * <テンキー>
 * ・0          ：escape    → shift
 * ・2          ：down      → cancel
 * ・4          ：left      → pageup
 * ・6          ：right     → pagedown
 * ・8          ：up        → tab
 * 
 * 【追加内容】
 * <キーボード>
 * ・W/A/S/D    ：up/left/down/right *(arrow)
 * ・Q/E        ：pageup/pagedown
 * ・C          ：ok
 * ・R          ：escape
 * ・Ins/Del    ：escape/ok
 * ・Home/End   ：ok/escape
 * <テンキー>
 * ・0/.        ：shift/control
 * ・1/2/3      ：ok/cancel/menu
 * ・4/6        ：pageup/pagedown
 * ・5          ：escape
 * ・8          ：tab
 * ・+          ：tab
 * ・-          ：escape
 * <ゲームパッド>
 * ・LT         ：tab
 * ・RT         ：control
 * ・back       ：escape
 * ・start      ：ok
 * 
 * 【利用規約】
 * MITライセンス規約に準じます。
 * https://licenses.opensource.jp/MIT/MIT
 * 
 */

(() => {
    'use strict';

    // ==============================
    // Input
    // ==============================
    const keyPatch = {
        18: "alt",          // alt
        45: "escape",       // insert
        46: "ok",           // delete
        36: "ok",           // home
        35: "escape",       // end
        67: "ok",           // C
        81: "pageup",       // Q
        69: "pagedown",     // E
        82: "escape",       // R
        65: "left",         // A
        68: "right",        // D
        83: "down",         // S
        87: "up",           // W
        96: "shift",        // numpad 0
        97: "ok",           // numpad 1
        98: "cancel",       // numpad 2
        99: "menu",         // numpad 3
        100: "pageup",      // numpad 4
        101: "escape",      // numpad 5
        102: "pagedown",    // numpad 6
        104: "tab",         // numpad 8
        107: "tab",         // numpad +
        109: "escape",      // numpad -
        110: "control",     // numpad .
    }
    Object.assign(Input.keyMapper, keyPatch);

    const gamepadPatch = {
        6: "tab",       // LT
        7: "control",   // RT
        8: "escape",    // back
        9: "ok",        // start
    }
    Object.assign(Input.gamepadMapper, gamepadPatch);
})();
