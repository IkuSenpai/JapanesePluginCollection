//=============================================================================
// RPG Maker MZ - ChangeMaxUnitBattleParty
// Version 1.2.1.0
// Copylight 2020 ぽえな
// License MIT(http://opensource.org/licenses/mit-license.php)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Change the maximum number of people in the battle party
 * @author Poena
 * @url https://1drv.ms/u/s!ApzzcXqwBDTHgrMUmANCWjNzVvFXUw?e=kO1Qpw
 *
 * @help ChangeMaxUnitBattleParty.js
 *
 * This plugin allows you to change the maximum number of members in a battle.
 * v1.2.1.0
 * 　・Changed the display frame to be fixed at 4 if there are less than 4 members in the current battle even if Dynamic UI Scale is turned on.
 * 　・Fixed a bug where character names were cut off due to insufficient display area when dynamic UI scale was turned off.
 * v1.2.0.0
 * 　・Fixed a bug where the character names were cut off due to insufficient height display area.
 * 　・Added item to specify font size for character names in battle.
 * v1.1.1.0
 *  Fixed an issue where character names were not properly sized
 * v1.1.0.0
 *  Fixed the size of various gauges and fonts to only change the UI during battle.
 *  Added the ability to dynamically change the UI scale according to the current number of battle members
 *
 * @param maxUnit
 * @type number
 * @text Maximum number of people
 * @desc Maximum number of players in battle
 * @min 5
 * @max 8 
 * 
 * @param isChangeUIScale
 * @type boolean
 * @text Changes to the UI scale
 * @desc Change the UI scale to fit the maximum number of users (if false, up to 4 people are shown)
 * @default true
 * 
 * @param isDynamicUIScale
 * @type boolean
 * @text Dynamic UI Scale
 * @desc Either change the UI scale dynamically to match the current number of battle members (instead of the maximum number), or
 * @default true
 * 
 * @param characterNameFontSize
 * @type number
 * @text Font size for character names
 * @desc If less than 2 is specified, it refers to the main font size (Database>System2>Advanced Settings)
 * @min 0
 * @max 26
 * @default 0
*/
/*:ja
 * @target MZ
 * @plugindesc バトルパーティの最大人数を変更します
 * @author Poena
 * @url https://1drv.ms/u/s!ApzzcXqwBDTHgrMUmANCWjNzVvFXUw?e=kO1Qpw
 *
 * @help ChangeMaxUnitBattleParty.js
 *
 * このプラグインは、バトル時のメンバーの最大人数を変更します。
 * v1.2.1.0
 * 　・動的UIスケールがONの場合でも現在のバトルメンバーが４人未満の場合、表示枠を４で固定するように変更
 * 　・動的UIスケールがOFFの場合、キャラクター名の表示領域が足りずに文字が切れる不具合を修正
 * v1.2.0.0
 * 　・キャラクター名の高さの表示領域が足りずに、文字が切れる不具合を修正
 * 　・バトル中のキャラクター名のフォントサイズを指定する項目を追加
 * v1.1.1.0
 * 　・キャラクター名のサイズが正しく調整されていなかった不具合を修正
 * v1.1.0.0
 * 　・各種ゲージやフォントのサイズ変更をバトル中のUIのみ変更するように修正
 * 　・現在のバトルメンバー数に応じてUIスケールを動的に変更する機能を追加
 *
 * @param maxUnit
 * @type number
 * @text 最大人数
 * @desc バトル時の最大人数
 * @min 5
 * @max 8 
 * 
 * @param isChangeUIScale
 * @type boolean
 * @text UIスケールの変更
 * @desc 最大人数にあわせてUIスケールを変更するか(Falseの場合、最大４人まで表示)
 * @default true
 * 
 * @param isDynamicUIScale
 * @type boolean
 * @text 動的UIスケール
 * @desc 現在のバトルメンバー数(最大人数ではなく)に合わせてUIスケールを動的に変更するか
 * @default true
 * 
 * @param characterNameFontSize
 * @type number
 * @text キャラクター名のフォントサイズ
 * @desc 2未満を指定した場合、メインフォントサイズ（データベース>システム２>高度な設定）を参照します
 * @min 0
 * @max 26
 * @default 0
*/

(() => {
    const pluginName = "ChangeMaxUnitBattleParty";

    // プラグインパラメータ
    var parameters = PluginManager.parameters(pluginName);

    // バトル時の最大人数
    var maxUnit = Number(parameters['maxUnit'] || 4);
    // UIスケールの変更
    var isChangeUIScale = parameters['isChangeUIScale'] && parameters['isChangeUIScale'].toLowerCase() === 'true';
    // 動的UIスケール
    var isDynamicUIScale = parameters['isDynamicUIScale'] && parameters['isDynamicUIScale'].toLowerCase() === 'true';
    // キャラクター名のフォントサイズ
    var characterNameFontSize = Number(parameters['characterNameFontSize'] || 0);

    // 最大人数における表示倍率
    var scalingFactorByMaxUnit = maxUnit <= 4 ? 1.0 : 4 / maxUnit;

    // 現バトルメンバー数における表示倍率
    function calcScalingFactorByCurrentUnit() {
        return $gameParty.battleMembers().length <= 4 ? 1.0 : 4 / $gameParty.battleMembers().length;
    }

    // 計算用の最低4以上を返す現在のバトルメンバー数
    function minCurrentBattleMembers() {
        return !isChangeUIScale ? 4 : isDynamicUIScale ? $gameParty.battleMembers().length <= 4 ? 4 : $gameParty.battleMembers().length : maxUnit;
    }

    // バトル時の最大人数変更
    Game_Party.prototype.maxBattleMembers = function() {
        return maxUnit;
    };

    // ステータス画面の表示最大数変更
    Window_BattleStatus.prototype.maxCols = function() {
        return isChangeUIScale ? (isDynamicUIScale ? $gameParty.battleMembers().length <= 4 ? 4 : $gameParty.battleMembers().length : maxUnit) : 4;
    };

    // ゲージスプライトの幅
    Sprite_Gauge.prototype.bitmapWidth = function() {
        return 128 * (isChangeUIScale && $gameParty.inBattle() ? (isDynamicUIScale ? calcScalingFactorByCurrentUnit() : scalingFactorByMaxUnit) : 1.0);
    };

    // 名前スプライトの幅
    let _Sprite_Name_prototype_initMembers = Sprite_Name.prototype.initMembers;
    Sprite_Name.prototype.initMembers = function() {
        _Sprite_Name_prototype_initMembers.call(this);
        // 戦闘中フラグ
        this._isInBattle = $gameParty.inBattle();
    };
    Sprite_Name.prototype.bitmapWidth = function() {
        return 128 * (isChangeUIScale && $gameParty.inBattle() ? (isDynamicUIScale ? calcScalingFactorByCurrentUnit() : scalingFactorByMaxUnit) : 1.0);
    };
    Sprite_Name.prototype.bitmapHeight = function() {
        if ($gameParty.inBattle())
        {
            return ((this.fontSize() - 2) + ((minCurrentBattleMembers() - 4) * 7)) * (isChangeUIScale ? (isDynamicUIScale ? calcScalingFactorByCurrentUnit() : scalingFactorByMaxUnit) : 1.0);;
        }
        else {
            return 24;
        }
    };
    Sprite_Name.prototype.updateBitmap = function() {
        const name = this.name();
        const color = this.textColor();
        const isBattle = $gameParty.inBattle();
        if (name !== this._name || color !== this._textColor || isBattle !== this._isInBattle) {
            this._name = name;
            this._textColor = color;
            this._isInBattle = isBattle;
            this.redraw();
        }
    };

    // 名前スプライトのフォントサイズ
    Sprite_Name.prototype.fontSize = function() {
        if ($gameParty.inBattle() && isChangeUIScale && characterNameFontSize > 1) {
            return characterNameFontSize;
        }
        else {
            return $gameSystem.mainFontSize();
        }
    };

    // ゲージスプライトのラベルのフォントサイズ
    Sprite_Gauge.prototype.labelFontSize = function() {
        return ($gameSystem.mainFontSize() - 2) * (isChangeUIScale && $gameParty.inBattle() ? (isDynamicUIScale ? calcScalingFactorByCurrentUnit() : scalingFactorByMaxUnit) : 1.0);
    };

    // バトル中のアクターの位置
    Sprite_Actor.prototype.setActorHome = function(index) {
        let homeY = index > 3 ? (index - 4) * 48 : index * 48;

        this.setHome(558 + index * 32, 280 + homeY);
    };

})();
