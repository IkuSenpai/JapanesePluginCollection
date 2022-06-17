/*
===============================================================================
 RPG Maker MZ - Sbm KeyPatchForNumpad (1.0.0)
===============================================================================
 Copyright (c) 2021 Suib
 This software is released under the MIT License.
 http://www.opensource.org/licenses/mit-license
===============================================================================
*/

/*:
 * @target MZ
 * @plugindesc This plugin assigns any key settings to the Numpad.
 * @author Suib
 * @url https://github.com/suibotsukuiki/RPGMakerMZ/blob/main/Sbm_KeyPatchForNumpad.js
 * @base PluginCommonBase
 * @orderAfter Sbm_KeyPatchForBothLR
 *
 * @param keyMapArrNumber
 * @text keySettings:Number
 * @desc Assign operations to the key to "0-9" (multiple can be selected).
 * @type struct<KeyMapNumber>[]
 * @default []
 * 
 * @param keyMapArrSymbol
 * @text keySettings:Symbol
 * @desc Assign operations to keys such as "+" and "-" (multiple can be selected).
 * @type struct<KeyMapSymbol>[]
 * @default []
 * 
 * @help Sbm_KeyPatchForNumpad.js
 *
 * -- Summary --
 * This plugin assigns any key settings to the numeric keypad.
 * Unassigned keys retain their default key settings.
 * 
 * -- Usage --
 * Select the setting target from "Number" or "Symbol" in the plugin parameters.
 * Select any "keycode" in the pull-down item and select the "operation" to be assigned to it.
 * 
 * -- Plugin Parameters --
 * keySettings:Number (multiple can be selected)
 * keySettings:Symbol (multiple can be selected)
 * 
 * -- Base Plugins --
 * PluginCommonBase
 * 
 * -- Terms of Use --
 * Comply with the MIT license agreement.
 * http://www.opensource.org/licenses/mit-license
 * 
 */
/*~struct~KeyMapNumber:
 *
 * @param keyCode
 * @text keyCode
 * @desc Select the key to which you want to assign the operation.
 * @type select
 * @option Numpad 0
 * @value 96
 * @option Numpad 1
 * @value 97
 * @option Numpad 2
 * @value 98
 * @option Numpad 3
 * @value 99
 * @option Numpad 4
 * @value 100
 * @option Numpad 5
 * @value 101
 * @option Numpad 6
 * @value 102
 * @option Numpad 7
 * @value 103
 * @option Numpad 8
 * @value 104
 * @option Numpad 9
 * @value 105
 * 
 * @param operation
 * @text operation
 * @desc Select the operation to assign to the target key.
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
/*~struct~KeyMapSymbol:
 *
 * @param keyCode
 * @text keyCode
 * @desc Select the key to which you want to assign the operation.
 * @type select
 * @option Numpad +
 * @value 107
 * @option Numpad -
 * @value 109
 * @option Numpad *
 * @value 106
 * @option Numpad /
 * @value 111
 * @option Numpad .
 * @value 110
 * 
 * @param operation
 * @text operation
 * @desc Select the operation to assign to the target key.
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
 * @plugindesc このプラグインは、テンキーに任意のキー設定を割り当てます。
 * @author 水部
 * @url https://github.com/suibotsukuiki/RPGMakerMZ/blob/main/Sbm_KeyPatchForNumpad.js
 * @base PluginCommonBase
 * @orderAfter Sbm_KeyPatchForBothLR
 *
 * @param keyMapArrNumber
 * @text キー設定：数字(複数選択可)
 * @desc 「0-9」までのキーに操作を割り当てます(複数選択可)。
 * @type struct<KeyMapNumber>[]
 * @default []
 * 
 * @param keyMapArrSymbol
 * @text キー設定：記号(複数選択可)
 * @desc 「+」や「-」等のキーに操作を割り当てます(複数選択可)。
 * @type struct<KeyMapSymbol>[]
 * @default []
 * 
 * @help Sbm_KeyPatchForNumpad.js
 *
 * 【概要】
 * このプラグインは、テンキーに任意のキー設定を割り当てます。
 * 割り当てが行われなかったキーはデフォルトのキー設定を保持します。
 * 
 * 【使用方法】
 * ・プラグインパラメータで、設定対象のキーを「数字」または「記号」から選択します。
 * ・プルダウン項目で任意の「キー」を選択し、それに割り当てる「操作」を選択します。
 * 
 * 【プラグインパラメータ】
 * ・キー設定：数字(複数選択可)
 * ・キー設定：記号(複数選択可)
 * 
 * 【前提プラグイン】
 * ・PluginCommonBase
 * 
 * 【利用規約】
 * MITライセンス規約に準じます。
 * https://licenses.opensource.jp/MIT/MIT
 * 
 */
/*~struct~KeyMapNumber:ja
 *
 * @param keyCode
 * @text キーコード
 * @desc 操作を割り当てる対象のキーを選択します。
 * @type select
 * @option Numpad 0
 * @value 96
 * @option Numpad 1
 * @value 97
 * @option Numpad 2
 * @value 98
 * @option Numpad 3
 * @value 99
 * @option Numpad 4
 * @value 100
 * @option Numpad 5
 * @value 101
 * @option Numpad 6
 * @value 102
 * @option Numpad 7
 * @value 103
 * @option Numpad 8
 * @value 104
 * @option Numpad 9
 * @value 105
 * 
 * @param operation
 * @text 操作
 * @desc 対象のキーに割り当てる操作を選択します。
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
/*~struct~KeyMapSymbol:ja
 *
 * @param keyCode
 * @text キーコード
 * @desc 操作を割り当てる対象のキーを選択します。
 * @type select
 * @option Numpad +
 * @value 107
 * @option Numpad -
 * @value 109
 * @option Numpad *
 * @value 106
 * @option Numpad /
 * @value 111
 * @option Numpad .
 * @value 110
 * 
 * @param operation
 * @text 操作
 * @desc 対象のキーに割り当てる操作を選択します。
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

    const keyMapNumpad = {};
    if (Array.isArray(param.keyMapArrNumber)) {
        for (const keyMap of param.keyMapArrNumber) {
            Object.assign(keyMapNumpad, { [String(keyMap.keyCode)]: keyMap.operation });
        }
    }
    if (Array.isArray(param.keyMapArrSymbol)) {
        for (const keyMap of param.keyMapArrSymbol) {
            Object.assign(keyMapNumpad, { [String(keyMap.keyCode)]: keyMap.operation });
        }
    }
    // ==============================
    // Input
    // ==============================
    Object.assign(Input.keyMapper, keyMapNumpad);
})();
