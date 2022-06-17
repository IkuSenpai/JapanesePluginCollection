/*=============================================================================
 CSVN_easySwitchConsoleLog.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/09/19 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc console.log ON/OFF
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n62f5ab579501
 *
 * @help CSVN_easySwitchConsoleLog.js
 *
 * If you turn off the setting of this plugin, console.log
 * written in other plugins will not be output.
 * The order is irrelevant.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param output
 * @text output
 * @desc true>will output false>will not output
 * @default true
 * @type boolean
 */

/*:ja
 * @target MZ
 * @plugindesc console.logのON/OFF
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n62f5ab579501
 *
 * @help CSVN_easySwitchConsoleLog.js
 *
 * このプラグインの設定をOFFにすると、他のプラグイン中に書かれている
 * console.log が出力されなくなります。
 * 順序は無関係です。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param output
 * @text 出力
 * @desc true>出力する false>出力しない
 * @default true
 * @type boolean
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Console_Log = console.log;
    console.log = function(msg) {
        if (params.output) {
            _Console_Log.apply(this, [msg]);
        }
    };
})();