//=============================================================================
// Plugin_Name : Ignore attribute defenses (skills and items)
// File_Name   : RX_T_IgnoreAttributeDefenses.js
// Version     : 1.01
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================

//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You can create skills and items that deal damage while ignoring
 * attribute defenses.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param systemword
 * @text System word
 * @desc System word to fill in the notes field
 * @default IgnoreAttributeDefenses
 * @help Ignore attribute defenses (skills and items)
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * Even if the target attribute is less than 100%, you can create a skill or
 * item that deals 100% damage regardless of that.
 * Also, if the target's attribute effectiveness is greater than 100%, it
 * deals more than 100% damage as usual.
 *
 * ◆Usage
 * Fill in the notes section of the skill(or item).
 *
 * <IgnoreAttributeDefenses>
 *
 * [Notes]
 * You don't need to worry about the plugin parameters.
 * It's just that the way you set up the notes field is different depending
 * on whether you are using the English or Japanese version.
 * 
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 属性防御を無視してダメージを与えるスキル、アイテムを作成できます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param systemword
 * @text システムワード
 * @desc メモ欄に記入するシステムワード
 * @default 属性防御無視
 * @help 属性防御無視（スキルとアイテム）
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * 対象の属性有効度が100%未満でも、それを無視してダメージを与えられるスキルや
 * アイテムを作れるようになります。
 * また、対象の属性有効度が100%を超えている場合はそのまま100%超の
 * ダメージを与えます。
 *
 * ◆使い方
 * スキル（orアイテム）のメモ欄に記入します。
 *
 * <属性防御無視>
 * 
 * 【備考】
 * プラグインのパラメータを気にする必要はありません。
 * ただ、日本語版か英語版かでメモ欄の設定方法が違うだけです。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

    //RX-T plugin parameters
    let rx_IgnAttDef = PluginManager.parameters('RX_T_IgnoreAttributeDefenses');
    let rx_IADWord = rx_IgnAttDef['systemword'];

	//Game_Temp

    const rx_t_gtp151117_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        rx_t_gtp151117_initialize.call(this);
        this._rx_itemIgElTemp_in_battle = null;
    };
    
    //Game_BattlerBase

    const rx_t_gbbp151117_elementRate = Game_BattlerBase.prototype.elementRate;
    Game_BattlerBase.prototype.elementRate = function(elementId) {
        let rx_rate = this.traitsPi(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);
        let rx_elementResult = $gameTemp._rx_itemIgElTemp_in_battle.meta[rx_IADWord];
        if (rx_rate < 1 && rx_elementResult) return 1;
        return rx_t_gbbp151117_elementRate.call(this, elementId);
    };

    //Game_Battler

    var rx_t_gbp151117_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function() {
        rx_t_gbp151117_onTurnEnd.call(this);
        $gameTemp._rx_itemIgElTemp_in_battle = null;
    };

    //Game_Action

    var rx_t_gap151117_calcElementRate = Game_Action.prototype.calcElementRate;
    Game_Action.prototype.calcElementRate = function(target) {
        $gameTemp._rx_itemIgElTemp_in_battle = this.item();
        return rx_t_gap151117_calcElementRate.call(this, target);
    };

})();