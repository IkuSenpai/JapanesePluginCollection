//=============================================================================
// YKP_FollowerStepAnime.js
//
// Copyright (c) 2021 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_FollowerStepAnime = true;

var YukiKP = YukiKP || {};
YukiKP.FollowerStepAnime = YukiKP.FollowerStepAnime || {};

/*:
 * @plugindesc 特定のフォロワーを常に足踏みアニメーションさせるプラグイン。
 * @target MZ
 * @author YukiKamijo
 *
 * @help
 * 特定フォロワーを常に足踏みアニメーションさせることが出来るプラグインです。
 *
 * 浮遊していたり羽ばたいているフォロワーが居る時に、常に足踏みさせることで
 * 移動していない時に静止する違和感をなくすことが出来ます。
 *
 * アクターのメモ欄に以下の記載をすることで可能です。
 *  <StepAnime:ON>
 *
 * plugin version 1.0.1
 *
 * 2021/10/19 - 1.0.1
 *   パーティー人数が4人未満の場合にエラーが発生していたため修正。
 */

(function() {
    "use strict";
    const pluginName = 'YKP_FollowerStepAnime';

    YukiKP.FollowerStepAnime.Game_Player_HasStepAnime = Game_Player.prototype.hasStepAnime;
    Game_Player.prototype.hasStepAnime = function(fc) {
        var stepAnime = this._stepAnime;
        if (!stepAnime && !fc) {
            var members = $gameParty.members();
            if (members.length !== 0) {
                if ($dataActors[members[0].actorId()].meta.StepAnime === 'ON') {
                    stepAnime = true;
                }
            }
        }

        return stepAnime;
    };

    YukiKP.FollowerStepAnime.Game_Follower_Update = Game_Follower.prototype.update;
    Game_Follower.prototype.update = function() {
        Game_Character.prototype.update.call(this);

        var stepAnime = $gamePlayer.hasStepAnime(true);
        var members = $gameParty.members();

        if (members[this._memberIndex]) {
            if ($dataActors[members[this._memberIndex].actorId()].meta.StepAnime === 'ON') {
                stepAnime = true;
            }
        }
        this.setMoveSpeed($gamePlayer.realMoveSpeed());
        this.setOpacity($gamePlayer.opacity());
        this.setBlendMode($gamePlayer.blendMode());
        this.setWalkAnime($gamePlayer.hasWalkAnime());
        this.setStepAnime(stepAnime);
        this.setDirectionFix($gamePlayer.isDirectionFixed());
        this.setTransparent($gamePlayer.isTransparent());
    };


})();