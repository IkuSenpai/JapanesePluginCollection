//=============================================================================
// DynamicEquipParam.js
// ----------------------------------------------------------------------------
// (C)2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2021/05/03 MZで動作するよう修正
// 1.0.2 2021/05/03 動的パラメータがお店のパラメータ増減に反映されていなかった問題を修正
// 1.0.1 2017/07/23 ヘルプにアクターのレベルやIDを参照する計算式を追記
// 1.0.0 2017/07/18 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc 装備品パラメータの動的設定プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/DynamicEquipParam.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author トリアコンタン
 *
 * @help 装備品のパラメータを現在のアクターの状態に応じて動的に変更します。
 * 武器と防具のメモ欄に以下の通り指定してください。
 * 設定にはJavaScript計算式を使用します。
 *
 * <DEP_攻撃力:[計算式]>   # 攻撃力に計算式を適用
 * <DEP_防御力:[計算式]>   # 防御力に計算式を適用
 * <DEP_魔法力:[計算式]>   # 魔法力に計算式を適用
 * <DEP_魔法防御:[計算式]> # 魔法防御に計算式を適用
 * <DEP_敏捷性:[計算式]>   # 敏捷性に計算式を適用
 * <DEP_運:[計算式]>       # 運に計算式を適用
 * <DEP_最大HP:[計算式]>   # 最大HPに計算式を適用
 * <DEP_最大MP:[計算式]>   # 最大MPに計算式を適用
 *
 * 計算式に使用できる要素は以下の通りです。
 * 各パラメータの値は本プラグインによる変動分は含みません。
 * param # データベースで指定した元々の値
 * a.hp  # HP
 * a.mp  # MP
 * a.tp  # TP
 * a.mhp # 最大HP
 * a.mmp # 最大MP
 * a.atk # 攻撃力
 * a.def # 防御力
 * a.mat # 魔法力
 * a.mdf # 魔法防御
 * a.agi # 敏捷性
 * a.luk # 運
 * a.hpRate() # HPレート(0.0 - 1.0)
 * a.mpRate() # MPレート(0.0 - 1.0)
 * a.tpRate() # TPレート(0.0 - 1.0)
 * a.special('aaa') # メモ欄の[aaa]の値(※)
 * a.level        # レベル
 * a.actorId()    # アクターID
 * a._classId     # 職業ID
 * a.currentExp() # 経験値
 *
 * ※特徴を有するメモ欄から指定した内容に対応する数値を取得
 * <aaa:100> # a.special('aaa')で[100]を返す。
 *
 * 特定のキャラクターが装備すると強化されたり
 * 組み合わせによる強化やステートによる強化が可能になります。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(()=> {
    'use strict';

    //=============================================================================
    // Game_Actor
    //  装備品パラメータの動的設定を追加します。
    //=============================================================================
    Game_Actor._paramNames = [
        ['DEP_最大HP', 'DEP_Mhp'],
        ['DEP_最大MP', 'DEP_Mmp'],
        ['DEP_攻撃力', 'DEP_Atk'],
        ['DEP_防御力', 'DEP_Def'],
        ['DEP_魔法力', 'DEP_Mat'],
        ['DEP_魔法防御', 'DEP_Mdf'],
        ['DEP_敏捷性', 'DEP_Agi'],
        ['DEP_運', 'DEP_Luk']
    ];

    const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function (paramId) {
        let value = _Game_Actor_paramPlus.apply(this, arguments);
        if (this._calcParam) return value;
        this._calcParam = true;
        this.equips().forEach(item => {
            if (item) value += this.paramPlusDynamic(paramId, item);
        }, this);
        this._calcParam = false;
        return value;
    };

    Game_Actor.prototype.paramPlusDynamic = function (paramId, item) {
        const paramFormula = PluginManagerEx.findMetaValue(item, Game_Actor._paramNames[paramId]);
        let value = 0;
        if (paramFormula) {
            const param = item.params[paramId];
            const a = this;
            value = Math.round(eval(paramFormula)) - param;
        }
        return value;
    };

    Game_Actor.prototype.special = function (tagName) {
        let value = 0;
        this.traitObjects().forEach(function (traitObject) {
            value += PluginManagerEx.findMetaValue(traitObject, tagName);
        });
        return Math.round(value);
    };

    // override
    Window_ShopStatus.prototype.drawActorParamChange = function (x, y, actor, item1) {
        const width = this.innerWidth - this.itemPadding() - x;
        const paramId = this.paramId();
        const targetParam = actor.paramPlusDynamic(paramId, this._item) + this._item.params[paramId];
        const equipParam = item1 ? actor.paramPlusDynamic(paramId, item1) + item1.params[paramId] : 0;
        const change = targetParam - equipParam;
        this.changeTextColor(ColorManager.paramchangeTextColor(change));
        this.drawText((change > 0 ? "+" : "") + change, x, y, width, "right");
    };
})();

