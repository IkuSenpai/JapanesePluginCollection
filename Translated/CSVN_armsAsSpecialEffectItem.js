/*=============================================================================
 CSVN_armsAsSpecialEffectItem.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/08 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Arms that can be used as items during battle.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n1a4a0f7659d8
 *
 * @help CSVN_armsAsSpecialEffectItem.js
 *
 * Weapons and armor that generate special effects when used as
 * items during battle will be implemented.
 *
 * If you write the skill ID with a meta tag in the memo field of the weapon
 * or armor as shown below, the skill will be activated.
 * <AsItem:123>
 *
 * Weapons and armor that you have without equipping them will be
 * available to everyone.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param othersEquip
 * @text Other actors equipments.
 * @desc
 * @type boolean
 * @on available
 * @off unavailable
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘中アイテムとして使える武器・防具。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n1a4a0f7659d8
 *
 * @help CSVN_armsAsSpecialEffectItem.js
 *
 * 戦闘中にもアイテムとして使うと特殊な効果を発揮する武器・防具を
 * 実現します。
 *
 * 武器や防具のメモ欄に以下のようにメタタグでスキルIDを書いておくと
 * そのスキルが発動します。
 * <AsItem:123>
 *
 * なお、装備せずに手持ちになっている武器・防具は全員から使用可能
 * になります。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param othersEquip
 * @text 他キャラの装備品
 * @desc 他キャラが装備中の装備品も使用可能に
 * @type boolean
 * @on する
 * @off しない
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    SceneManager.isSceneBattle = function() {
        return this._scene.constructor === Scene_Battle;
    };

    const _Scene_Battle_onItemOk = Scene_Battle.prototype.onItemOk;
    Scene_Battle.prototype.onItemOk = function() {
        if (DataManager.isWeapon(this._itemWindow.item())
         || DataManager.isArmor(this._itemWindow.item())) {
            const item = this._itemWindow.item();
            const skillId = Number(item.meta.AsItem);
            const action = BattleManager.inputtingAction();
            action.setSkill(skillId);
            $gameParty.setLastItem(item);
            this.onSelectAction();
        } else {
            _Scene_Battle_onItemOk.call(this);
        }
    };

    const _Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function() {
        _Window_ItemList_makeItemList.call(this);

        if (SceneManager.isSceneBattle()) {
            for (const member of $gameParty.members()) {
                if (!params.othersEquip) {
                    if (!BattleManager.actor()) {
                        continue;
                    }
                    if (member.actorId() != BattleManager.actor().actorId()) {
                        continue;
                    }
                }

                for (const equip of member.equips()) {
                    if (equip && equip.meta && equip.meta.AsItem) {
                        this._data.push(equip);
                    }
                }
            }
        }
    };

    const _Window_ItemList_drawItemNumber = Window_ItemList.prototype.drawItemNumber;
    Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
        if (SceneManager.isSceneBattle()) {
            if (!DataManager.isWeapon(item) && !DataManager.isArmor(item)) {
                _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
            }
        } else {
            _Window_ItemList_drawItemNumber.call(this, item, x, y, width);
        }
    };

    const _Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
    Game_BattlerBase.prototype.canUse = function(item) {
        if (!item) {
            return false;
        } else if (SceneManager.isSceneBattle()
               && (DataManager.isWeapon(item) || DataManager.isArmor(item))) {
            if (item.meta && item.meta.AsItem) {
                return true;
            }
        }

        return _Game_BattlerBase_canUse.call(this, item);
    };
})();