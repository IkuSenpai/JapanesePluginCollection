/*:
 * @target MZ
 * @plugindesc スキル使用者自身を選択禁止
 * @author GrayOgre
 * @url https://grayogre.info/rmmz/plugin/index.html
 * @help
 *
 * このプラグインは、メモ欄に<CanNotSelectSubject>と記載された
 * アイテム／スキルの使用時に以下の動作をします。
 * ・使用者を対象として選択できないようにします。
 * 
 * プラグインコマンドはありません。
 * 
 * var 1.0.0
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 *
 */

(() => {
    'use strict';

    const METAKEY = "CanNotSelectSubject";

    const _scene_itembase_canUse = Scene_ItemBase.prototype.canUse;
    Scene_ItemBase.prototype.canUse = function() {
        const item = this.item();
        if (item.meta[METAKEY]) {
            const user = this.user();
            const actors = this.itemTargetActors();
            if (actors.length === 1 && actors[0]._actorId === user._actorId) {
                return false;
            }
        }
        return _scene_itembase_canUse.call(this);
    };

    const _scene_battle_onActorOk = Scene_Battle.prototype.onActorOk;
    Scene_Battle.prototype.onActorOk = function() {
        const action = BattleManager.inputtingAction();
        const item = action.item();
        if (item && item.meta[METAKEY]) {
            const target = this._actorWindow.actor(this._actorWindow.index());
            if (BattleManager.actor()._actorId === target._actorId) {
                SoundManager.playBuzzer();
                this._actorWindow.activate();
                return;
            }
        }
        _scene_battle_onActorOk.call(this);
    };
    
})();
