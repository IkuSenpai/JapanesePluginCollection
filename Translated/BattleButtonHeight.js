
/*:
 * @plugindesc 戦闘時戻るボタンの高さ調整プラグイン
 * @target MZ
 * @url https://drive.google.com/drive/u/0/folders/19ZSazImRgTMIgg_ZEDaYDxl48xoW0vRi
 * @author さすらいのトム
 *
 * @param BattleButtonHeight
 * @text 戻るボタンの高さ
 * @desc 戻るボタンの高さです。高ければ高いほど上に行きます。
 * @default
 * @type number
 * @default 526
 *
 * @help AdjustMenuWindow.js
 *
 * へるぷ
 */

(() => {
    'use strict';
    const parameters = PluginManager.parameters('BattleButtonHeight');
    const BattleButtonHeight = Number(parameters['BattleButtonHeight'] || 0);
    
    const Scene_Battle_prototype_buttonY = Scene_Battle.prototype.buttonY; 
    Scene_Battle.prototype.buttonY　= function() {
        if ($gameTemp.BattleButtonHeight) {
            return Graphics.height - BattleButtonHeight;
        }
        return Scene_Battle_prototype_buttonY.call(this);
    }

    const Scene_Battle_prototype_createCancelButton = Scene_Battle.prototype.createCancelButton;
    Scene_Battle.prototype.createCancelButton = function() {
        $gameTemp.BattleButtonHeight = true;
        Scene_Battle_prototype_createCancelButton.call(this);
        $gameTemp.BattleButtonHeight = false;
    };
    
})();
