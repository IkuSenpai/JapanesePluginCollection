/*
===============================================================================
 RPG Maker MZ - Sbm KeyPatchForGamepad (1.0.0)
===============================================================================
 Copyright (c) 2021 Suib
 This software is released under the MIT License.
 http://www.opensource.org/licenses/mit-license
===============================================================================
*/

/*:
 * @target MZ
 * @plugindesc This plugin assigns any key settings to the Gamepad.
 * @author Suib
 * @url https://github.com/suibotsukuiki/RPGMakerMZ/blob/main/Sbm_KeyPatchForGamepad.js
 * @base PluginCommonBase
 * @orderAfter Sbm_KeyPatchForBothLR
 *
 * @param keyMapArrButton
 * @text keySettings:Button
 * @desc Assign operations to buttons (multiple can be selected).
 * @type struct<KeyMapButton>[]
 * @default []
 * 
 * @param keyMapArrDpad
 * @text keySettings:D-pad
 * @desc Assign operations to D-pad (multiple can be selected).
 * @type struct<KeyMapDpad>[]
 * @default []
 * 
 * @help Sbm_KeyPatchForGamepad.js
 *
 * -- Summary --
 * This plugin assigns any key settings to the gamepad.
 * Unassigned keys retain their default key settings.
 * The key layout is for the Xbox controller.
 * 
 * -- Usage --
 * Select the setting target from "Button" or "D-pad" in the plugin parameters.
 * Select any "keycode" in the pull-down item and select the "operation" to be assigned to it.
 * 
 * -- Plugin Parameters --
 * keySettings:Button (multiple can be selected)
 * keySettings:D-pad (multiple can be selected)
 * 
 * -- Base Plugins --
 * PluginCommonBase
 * 
 * -- Terms of Use --
 * Comply with the MIT license agreement.
 * http://www.opensource.org/licenses/mit-license
 * 
 */
/*~struct~KeyMapButton:
 *
 * @param keyCode
 * @text keyCode
 * @desc Select the button to which you want to assign the operation.
 * @type select
 * @option A
 * @value 0
 * @option B
 * @value 1
 * @option X
 * @value 2
 * @option Y
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back
 * @value 8
 * @option Start
 * @value 9
 * @option LS-Press
 * @value 10
 * @option RS-Press
 * @value 11
 * 
 * @param operation
 * @text operation
 * @desc Select the operation to assign to the target button.
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option escape
 * @option tab
 * @option shift
 * @option control
 * @option alt
 * @option pageup
 * @option pagedown
 * @option left
 * @option up
 * @option right
 * @option down
 * @option debug
 */
/*~struct~KeyMapDpad:
 *
 * @param keyCode
 * @text keyCode
 * @desc Select the directional key to which you want to assign the operation.
 * @type select
 * @option up
 * @value 12
 * @option down
 * @value 13
 * @option left
 * @value 14
 * @option right
 * @value 15
 * 
 * @param operation
 * @text operation
 * @desc Select the operation to assign to the target directional key.
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option escape
 * @option tab
 * @option shift
 * @option control
 * @option alt
 * @option pageup
 * @option pagedown
 * @option left
 * @option up
 * @option right
 * @option down
 * @option debug
 */

/*:ja
 * @target MZ
 * @plugindesc このプラグインは、ゲームパッドに任意のキー設定を割り当てます。
 * @author 水部
 * @url https://github.com/suibotsukuiki/RPGMakerMZ/blob/main/Sbm_KeyPatchForGamepad.js
 * @base PluginCommonBase
 * @orderAfter Sbm_KeyPatchForBothLR
 *
 * @param keyMapArrButton
 * @text キー設定：ボタン(複数選択可)
 * @desc 各ボタンに任意の操作を割り当てます(複数選択可)。
 * @type struct<KeyMapButton>[]
 * @default []
 * 
 * @param keyMapArrDpad
 * @text キー設定：方向キー(複数選択可)
 * @desc 方向キーに任意の操作を割り当てます(複数選択可)。
 * @type struct<KeyMapDpad>[]
 * @default []
 * 
 * @help Sbm_KeyPatchForGamepad.js
 *
 * 【概要】
 * このプラグインは、ゲームパッドの各ボタンに任意のキー設定を割り当てます。
 * 割り当てが行われなかったキーはデフォルトのキー設定を保持します。
 * キーレイアウトはXboxコントローラーを想定しています。
 * 
 * 【使用方法】
 * ・プラグインパラメータで、設定対象のキーを「ボタン」または「方向キー」から選択します。
 * ・プルダウン項目で任意の「キー」を選択し、それに割り当てる「操作」を選択します。
 * 
 * 【プラグインパラメータ】
 * ・キー設定：ボタン(複数選択可)
 * ・キー設定：方向キー(複数選択可)
 * 
 * 【前提プラグイン】
 * ・PluginCommonBase
 * 
 * 【利用規約】
 * MITライセンス規約に準じます。
 * https://licenses.opensource.jp/MIT/MIT
 * 
 */
/*~struct~KeyMapButton:ja
 *
 * @param keyCode
 * @text キーコード
 * @desc 操作を割り当てる対象のボタンを選択します。
 * @type select
 * @option A
 * @value 0
 * @option B
 * @value 1
 * @option X
 * @value 2
 * @option Y
 * @value 3
 * @option LB
 * @value 4
 * @option RB
 * @value 5
 * @option LT
 * @value 6
 * @option RT
 * @value 7
 * @option Back
 * @value 8
 * @option Start
 * @value 9
 * @option LS-Press
 * @value 10
 * @option RS-Press
 * @value 11
 * 
 * @param operation
 * @text 操作
 * @desc 対象のボタンに割り当てる操作を選択します。
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option escape
 * @option tab
 * @option shift
 * @option control
 * @option alt
 * @option pageup
 * @option pagedown
 * @option left
 * @option up
 * @option right
 * @option down
 * @option debug
 */
/*~struct~KeyMapDpad:ja
 *
 * @param keyCode
 * @text キーコード
 * @desc 操作を割り当てる対象の方向キーを選択します。
 * @type select
 * @option up
 * @value 12
 * @option down
 * @value 13
 * @option left
 * @value 14
 * @option right
 * @value 15
 * 
 * @param operation
 * @text 操作
 * @desc 対象の方向キーに割り当てる操作を選択します。
 * @type select
 * @option ok
 * @option cancel
 * @option menu
 * @option escape
 * @option tab
 * @option shift
 * @option control
 * @option alt
 * @option pageup
 * @option pagedown
 * @option left
 * @option up
 * @option right
 * @option down
 * @option debug
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    const keyMapGamepad = {};
    if (Array.isArray(param.keyMapArrButton)) {
        for (const keyMap of param.keyMapArrButton) {
            Object.assign(keyMapGamepad, { [String(keyMap.keyCode)]: keyMap.operation });
        }
    }
    if (Array.isArray(param.keyMapArrDpad)) {
        for (const keyMap of param.keyMapArrDpad) {
            Object.assign(keyMapGamepad, { [String(keyMap.keyCode)]: keyMap.operation });
        }
    }
    // ==============================
    // Input
    // ==============================
    Object.assign(Input.gamepadMapper, keyMapGamepad);
})();
