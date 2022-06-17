/*=============================================================================
 CSVN_tmpSavePartyActors.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/13 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Save actors data and party data temporarily
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/nea3e0510a921
 *
 * @help CSVN_tmpSavePartyActors.js
 *
 * Use the plugin command "save" to temporarily save the party data and
 * actor data, and then "load" to reload it.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @command save
 * @text Save
 * @desc
 *
 * @command load
 * @text Load
 * @desc
 */

/*:ja
 * @target MZ
 * @plugindesc パーティーとアクターの状態の一時保存
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/nea3e0510a921
 *
 * @help CSVN_tmpSavePartyActors.js
 *
 * プラグインコマンド "save" でパーティー情報とアクターの情報を
 * 一時保存し、"load" で再度読み込みます。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @command save
 * @text 保存
 * @desc
 *
 * @command load
 * @text 読み込み
 * @desc
 */

(() => {
    'use strict';
    PluginManagerEx.registerCommand(document.currentScript, 'save', args => {
        $gameTemp.tmpSave();
    });
    PluginManagerEx.registerCommand(document.currentScript, 'load', args => {
        $gameTemp.tmpLoad();
    });

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.call(this);

        this._tempGameParty = null;
        this._tempGameActors = null;
    };

    Game_Temp.prototype.tmpSave = function() {
        this._tempGameParty = JsonEx.makeDeepCopy($gameParty);
        this._tempGameActors = JsonEx.makeDeepCopy($gameActors);
    };

    Game_Temp.prototype.tmpLoad = function() {
        $gameParty = this._tempGameParty;
        $gameActors = this._tempGameActors;
    };
})();