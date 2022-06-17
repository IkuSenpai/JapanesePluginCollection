/*=============================================================================
 CSVN_playSeForItemEx.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/30 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Play SE's set for each item/skill on menu screen.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/nc24f4ef5847b
 *
 * @help CSVN_playSeForItemEx.js
 *
 * After the item/skill use SE of the system setting, the set
 * SE is played by writing a meta tag in the memo field.
 * Specify <SE:Filename|Volume|Pitch> in the item/skill memo field.
 * Multiple specifications are allowed.
 * ex. <SE:Heal3|90|100,Saint2|90|100>
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 */

/*:ja
 * @target MZ
 * @plugindesc メニュー画面でアイテム/スキルごとに設定したSEを鳴らす
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/nc24f4ef5847b
 *
 * @help CSVN_playSeForItemEx.js
 *
 * システム設定のアイテム／スキル使用効果音の後に、メモ欄にメタタグを
 * 書いて設定した効果音を演奏します。
 * アイテム／スキルのメモ欄に<SE:ファイル名|ボリューム|ピッチ>と書いて
 * 指定します。複数指定も可能です。
 * ex. <SE:Heal3|90|100,Saint2|90|100>
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 */
(() => {
    'use strict';

    SceneManager.isSceneBattle = function() {
        return this._scene.constructor === Scene_Battle;
    };

    const _Scene_Item_playSeForItem = Scene_Item.prototype.playSeForItem;
    Scene_Item.prototype.playSeForItem = function() {
        _Scene_Item_playSeForItem.call(this);

        if (!SceneManager.isSceneBattle()) {
            let item;
            if (DataManager.isItem(this.item())) {
                item = $dataItems[this.item().id];
            }
            if (item) {
                playAdditionalSe(item);
            }
        }
    };

    const _Scene_Skill_playSeForItem = Scene_Skill.prototype.playSeForItem;
    Scene_Skill.prototype.playSeForItem = function() {
        _Scene_Skill_playSeForItem.call(this);

        if (!SceneManager.isSceneBattle()) {
            let skill;
            if (DataManager.isSkill(this.item())) {
                skill = $dataSkills[this.item().id];
            }
            if (skill) {
                playAdditionalSe(skill);
            }
        }
    };

    function playAdditionalSe(item) {
        if (item.meta.SE) {
            const ses = item.meta.SE.split(',');
            let tmp, file, volume, pitch;
            for(const se of ses) {
                tmp = se.split('|');
                file = tmp[0];
                volume = tmp[1];
                pitch = tmp[2];

                AudioManager.playStaticSe({
                    name: file,
                    volume: volume,
                    pitch: pitch,
                });
            }
        }
    }
})();