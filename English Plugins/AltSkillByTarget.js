//=============================================================================
// RPG Maker MZ - Alternative skill for specific targets
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Alternative skill for specific targets
 * @author MihailJP
 * @translator NamiBoops
 * @url https://github.com/MihailJP/mihamzplugin/blob/master/AltSkillByTarget.js
 * @orderAfter SpeakInBattle
 *
 * @help AltSkillByTarget.js
 *
 * This plugin implements that using an alternative skill to a specific target.
 * If there is <altSkill:x> (where x is a nonzero number) at the memo of an
 * actor or an enemy character, and there is <altSkillX:Y> (where X is a
 * nonzero number and Y is skill number) at the memo of a skill, the skill
 * of given number will be used instead when the target has corresponding
 * altSkill number.
 *
 * Single-target skills only.
 * * Single-target skills only.
 * It does not provide plugin commands.
 *
 * Changelog
 * 26 Sept 2020: Fixed crash issue with out-of-battle skills.
 * 22 Sept 2020: First edition
 */

/*:ja
 * @target MZ
 * @plugindesc Use a different skill for a specific target.
 * @author MihailJP
 * @url https://github.com/MihailJP/mihamzplugin/blob/master/AltSkillByTarget.js
 * @orderAfter SpeakInBattle
 *
 * @help AltSkillByTarget.js
 *
 * This plugin implements the "use a specific skill on a specific target with another skill
 * * This plugin implements the "substitute a certain skill on a certain target with another skill" thing.
 * <altSkill:0> (non-zero number) in the Actor or Enemy character's note field, and.
 * <altSkill0:skill number> in the note field of the skill with the corresponding number.
 * When you use a skill on a battler with an altSkill, the specified skill will be used instead.
 * will be used.
 *
 * This is only valid for skills with only one target.
 *
 * There is no plugin command.
 *
 * Update History.
 * September 26, 2020 Fixed a problem that the game crashes when using a skill outside of combat.
 * September 22, 2020 First version.
 */


 
(() => {
const pluginName = "AltSkillByTarget";
const param = PluginManager.parameters(pluginName);

const orig_Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
if (($gameParty._inBattle) && (BattleManager._targets.length == 1)) {
const target = BattleManager._targets[0];
const targetData = target.isActor() ? $dataActors[target._actorId] : $dataEnemies[target._enemyId];
const altSkillType = parseInt(targetData.meta.altSkill);
const action = this._actions[0];
if ((action._item.isSkill()) && Boolean(altSkillType)) {
const altSkillId = parseInt($dataSkills[action._item._itemId].meta["altSkill" + altSkillType.toString()]);
if (altSkillId) {
action._item._itemId = altSkillId;
orig_Game_Battler_useItem.call(this, action.item());
return;
}
}
}
orig_Game_Battler_useItem.call(this, item);
}

})();
