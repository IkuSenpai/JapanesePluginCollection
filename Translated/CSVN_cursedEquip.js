/*=============================================================================
 CSVN_cursedEquip.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/8/15 初版
 1.0.1 2021/8/15 「すべてはずす」ではずれてしまう問題の修正
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc State where equipment cannot be changed
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n5a1f63a5397a
 *
 * @help CSVN_cursedEquip.js
 *
 * When the set state is reached, the equipment cannot be changed.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param curseStateId
 * @text State that equipment cannot be changed
 * @desc
 * @type state
 */

/*:ja
 * @target MZ
 * @plugindesc 装備変更できなくなるステート
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n5a1f63a5397a
 *
 * @help CSVN_cursedEquip.js
 *
 * 設定したステートになると、装備の変更ができなくなるようにします。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param curseStateId
 * @text 装備変更不可になるステート
 * @desc
 * @type state
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    const _Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
    Scene_Equip.prototype.onSlotOk = function() {
        if (this.actor().isStateAffected(params.curseStateId)) {
            SoundManager.playBuzzer();
            this.onSlotCancel();
        } else {
            _Scene_Equip_onSlotOk.call(this);
        }
    };

    const _Scene_Equip_commandEquip = Scene_Equip.prototype.commandEquip;
    Scene_Equip.prototype.commandEquip = function() {
        if (this.actor().isStateAffected(params.curseStateId)) {
            SoundManager.playBuzzer();
            this._statusWindow.refresh();
            this._slotWindow.refresh();
            this._commandWindow.activate();
        } else {
            _Scene_Equip_commandEquip.call(this);
        }
    };

    const _Scene_Equip_commandOptimize = Scene_Equip.prototype.commandOptimize;
    Scene_Equip.prototype.commandOptimize = function() {
        if (this.actor().isStateAffected(params.curseStateId)) {
            SoundManager.playBuzzer();
            this._statusWindow.refresh();
            this._slotWindow.refresh();
            this._commandWindow.activate();
        } else {
            _Scene_Equip_commandOptimize.call(this);
        }
    };

    const _Scene_Equip_commandClear = Scene_Equip.prototype.commandClear;
    Scene_Equip.prototype.commandClear = function() {
        if (this.actor().isStateAffected(params.curseStateId)) {
            SoundManager.playBuzzer();
            this._statusWindow.refresh();
            this._slotWindow.refresh();
            this._commandWindow.activate();
        } else {
            _Scene_Equip_commandClear.call(this);
        }
    };
})();