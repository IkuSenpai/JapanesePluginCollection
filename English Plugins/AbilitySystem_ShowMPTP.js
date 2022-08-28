/*:
@target MZ
@plugindesc Skill replacement system MP/TP display v1.0.1
@author Eel Otoro
@translator NamiBoops
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AbilitySystem_ShowMPTP.js

@help
This is a patch to display the MP/TP consumption in the skill list of the skill replacing system.
This patch is only available when the cost function is disabled.
Please note that if you enable the cost feature, the system will not work properly.

Note that this plugin should be installed below AbilitySystem.js.

License]
This plugin is available under the terms of the MIT License.
*/

(() => {
"use strict";

const Window_AbilitiesBase = AbilitySystemClassAlias.Window_AbilitiesBase;

Window_AbilitiesBase.prototype.drawSkill = function(index) {
    const skill = this.itemAt(index);
    const rect = this.itemLineRect(index);
    const costWidth = this.costWidth();
    this.drawItemName(skill, rect.x, rect.y, rect.width - costWidth);
    this.drawSkillCost(skill, rect.x, rect.y, rect.width);
    this.changePaintOpacity(1);
    this.resetTextColor();
};

Window_AbilitiesBase.prototype.costWidth = function() {
    return this.textWidth("000");
};

Window_AbilitiesBase.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillTpCost(skill) > 0) {
        this.changeTextColor(ColorManager.tpCostColor());
        this.drawText(this._actor.skillTpCost(skill), x, y, width, "right")
    } else if (this._actor.skillMpCost(skill) > 0) {
        this.changeTextColor(ColorManager.mpCostColor());
        this.drawText(this._actor.skillMpCost(skill), x, y, width, "right")
    }
};

})();
