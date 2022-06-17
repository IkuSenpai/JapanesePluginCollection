//=============================================================================
// HideSkillByWtype.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Hides skills not matching equipped weapon type in battle.
 * @author Toru Higuruma
 * @url https://github.com/neofuji/RPGMZ-Plugins
 *
 * @help HideSkillByWtype v1.0 (2020-08-20)
 * Copyright (c) 2020 Toru Higuruma
 * This plugin is provided under the MIT License.
 *
 * It does not provide plugin commands.
 */

/*:ja
 * @target MZ
 * @plugindesc 戦闘中、必要武器の条件を満たさないスキルを非表示にします。
 * @author Toru Higuruma
 * @url https://github.com/neofuji/RPGMZ-Plugins
 *
 * @help HideSkillByWtype v1.0 (2020-08-20)
 * Copyright (c) 2020 Toru Higuruma
 * このプラグインは MIT License の下で提供されます。
 *
 * プラグインコマンドはありません。
 */

(() => {
    const _Window_BattleSkill_includes = Window_BattleSkill.prototype.includes;
    Window_BattleSkill.prototype.includes = function(item) {
        return (
            _Window_BattleSkill_includes.apply(this, arguments) &&
            this._actor.isSkillWtypeOk(item)
        );
    };
})();
