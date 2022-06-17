//=============================================================================
// RPG Maker MZ - 戦闘背景の拡大縮小を調整 ver1.0
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 戦闘背景の拡大縮小を調整
 * @author 奈々
 * @url https://heptanas.mamagoto.com/
 * @help N7t_BattlebackScalingValue.js
 *
 * 戦闘背景の拡大縮小について、シンプルなn倍という形で指定できるようにします。
 * 計算式も使えるため、「(画面サイズ)/(素材サイズ)」とすれば画面に合わせて調整できます。
 * 
 * Copyright (c) 2021 Nana
 * This software is released under the MIT License.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param scaleRate
 * @text 拡大縮小倍率
 * @desc 素材を何倍にするか指定します。計算式でも指定可能です。
 * @type string
 * @default 816 / 1000
 * 
 */

(() => {
    'use strict';

    //プラグインパラメータの読み込み    
    const pluginName = 'N7t_BattlebackScalingValue';
    const parameters = PluginManager.parameters(pluginName);
    const scaleRate = Number(JSON.parse(String(parameters['scaleRate'])));

//-----------------------------------------------------------------------------
// Sprite_Battleback
//
// The sprite for displaying a background image in battle.

//再定義
Sprite_Battleback.prototype.adjustPosition = function() {
    this.width = this.bitmap.width * scaleRate;
    this.height = this.bitmap.height * scaleRate;
    this.x = (Graphics.width - this.width) / 2;
    if ($gameSystem.isSideView()) {
        this.y = Graphics.height - this.height;
    } else {
        this.y = 0;
    }
    this.scale.x = scaleRate;
    this.scale.y = scaleRate;
};

})();