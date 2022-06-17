/*:
@target MZ
@plugindesc ドット移動システム 競合回避用パッチ v1.1.1
@author うなぎおおとろ
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/DotMoveSystem_ConflictPatch.js
@help
ドット移動システム用の競合回避パッチです。

【使用方法】
下記の順にプラグインを導入してください。
・DotMoveSystem.js
・RegionBase.js
・DotMoveSystem_ConflictPatch.js
・OverpassTile.js

【ライセンス】
このプラグインは、MITライセンスの条件の下で利用可能です。
*/

for (const className in DotMoveSystemClassAlias) {
    this[className] = DotMoveSystemClassAlias[className];
}  

(() => {
"use strict";

Game_Follower.prototype.findCollisionData = function(x, y) {
    return $gameMap.findArrayDataRegionAndTerrain(x, y, 'collisionForPlayer');
};

// OverpassTile.jsで再定義される
Game_CharacterBase.prototype.isHigherPriority = function() {
    return undefined;
};

const _CharacterCollisionChecker_checkCharacter = CharacterCollisionChecker.prototype.checkCharacter;
CharacterCollisionChecker.prototype.checkCharacter = function(x, y, d, character, opt = { origX: null, origY: null, overComplementMode: false }) {
    if (this._character.isHigherPriority() !== character.isHigherPriority()) return null;
    return _CharacterCollisionChecker_checkCharacter.call(this, x, y, d, character, opt);
};

})();
