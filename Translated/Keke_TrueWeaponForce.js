//=============================================================================
// Keke_TrueWeaponForce - 真なる武器のチカラ
// バージョン: 1.0.0
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ショップで装備の真の性能を表示する
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.1.0.0】
 * ショップで装備の真のチカラ(特徴込み)を表示する
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 */
 
 
 
 
 
(() => {

    //- アクターのパラメータ変化量の描画(再定義)
    Window_ShopStatus.prototype.drawActorParamChange = function(
    x, y, actor, item1) {
        const width = this.innerWidth - this.itemPadding() - x;
        const paramId = this.paramId();
        const change = actor.equipChangeForceKe(paramId, this._item);
        this.changeTextColor(ColorManager.paramchangeTextColor(change));
        this.drawText((change > 0 ? "+" : "") + change, x, y, width, "right");
    };
    
    
    //- 装備による変化量
    Game_Actor.prototype.equipChangeForceKe = function(paramId, newItem) {
        const tempActor = JsonEx.makeDeepCopy(this);
        tempActor.forceChangeEquip(newItem.etypeId - 1, newItem);
        return tempActor.param(paramId) - this.param(paramId);
    };
    
})();