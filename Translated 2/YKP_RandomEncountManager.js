//=============================================================================
// YKP_RandomEncountManager.js
//
// Copyright (c) 2022 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_RandomEncountManager = true;

var YukiKP = YukiKP || {};
YukiKP.RandomEncountManager = YukiKP.RandomEncountManager || {};

/*:
 * @plugindesc ランダムエンカウントを制御するプラグイン
 * @target MZ
 * @author YukiKamijo
 * 
 * @param EncountSwitch
 * @text エンカウント無効スイッチ
 * @desc ランダムエンカウントを無効にするスイッチIDを設定します。0:常にエンカウント有 -1:常に無効
 * @type switch
 * @default 0
 * 
 * @param RandomType
 * @text ランダムエンカウント計算形式
 * @desc ランダムエンカウントで使用する計算のタイプを選択します。
 * @type select
 * @default 0
 * @option 敵出現歩数重視
 * @value 0
 * @option 振れ幅内均等
 * @value 1
 * 
 * @param ShapedWidth
 * @text 歩数振れ幅
 * @desc 敵出現歩数前後の振れ幅を調整します。
 * @type number
 * @default 10
 * 
 * @param InvalidStep
 * @text エンカウント無効歩数
 * @desc エンカウントが発生しない歩数を設定します。
 * @type number
 * @default 5
 * 
 * @param MaxRetry
 * @text 再計算上限回数
 * @desc 最低歩数未満がエンカウント歩数になった場合の再計算回数。
 * @type number
 * @default 3
 *
 * @help
 * ランダムエンカウントを制御するプラグイン。
 *
 * エンカウントまでの歩数をある程度制御できるようになります。
 * 
 * シンボルエンカウントのみでも
 * イベントの「戦闘の処理」から「ランダムエンカウントと同じ」を
 * 利用したランダム戦闘を作ることが可能です。
 * この場合は、マップにエンカウントグループを設定してください。
 * 
 * ランダムエンカウントの場合
 * マップに設定された敵出現歩数から歩数振れ幅の値を利用して
 * エンカウント歩数を決定します。
 * 
 * 「エンカウント無効スイッチ」で設定したスイッチを切り替えることで
 * ランダムエンカウントの有効/無効が切り替えることができます。
 * スイッチ状態がOFFの時がエンカウント有効です。
 * 
 * 例:
 * 敵出現歩数  : 30
 * 歩数振れ幅  : 10
 * 上記の条件の場合、20～40歩でエンカウントするようになります。
 *
 * デフォルト計算式だと1～59歩の範囲がエンカウント歩数になっています。
 * 
 * 「ランダムエンカウント計算形式」によって
 * エンカウントパターンを変えることができます
 * 
 * 「敵出現歩数重視」
 * 敵出現歩数に近い歩数でエンカントの確率が高くなり、
 * 最低値/最高値に近くなるほど、確率が低くなります。
 * 
 * 「振れ幅内均等」
 * 敵出現歩数から振れ幅歩数の範囲が均等な確率でエンカウントします。
 * 
 * 
 * 「エンカウント無効歩数」は値の歩数分はエンカウントが発生しません。
 * 設定値は 0 以上にするようにしてください。
 * 
 * 「再計算上限回数」はエンカウント歩数の計算によって
 * エンカウント無効歩数以下のエンカウント歩数になった場合に
 * 再度計算を行う回数の上限値です。
 * 設定値は 0 以上にするようにしてください。
 * 再計算が上限回数になってもエンカウント歩数が無効歩数以下の場合は
 * 無効歩数 +1 がエンカウント歩数とされます。
 * 
 * 
 * plugin version 1.0.1
 * 
 * ver 1.0.1 : エンカウント無効スイッチを 0 もしくは -1 で設定したとき
 *             正しく動作していなかった問題を修正しました。
 */

(() => {
    "use strict";
    const pluginName = 'YKP_RandomEncountManager';

    const parameters    = PluginManager.parameters(pluginName);
    const EncountSwitch = Number(parameters['EncountSwitch']);
    const RandomType    = Number(parameters['RandomType']);
    const ShapedWidth   = Number(parameters['ShapedWidth']);
    const InvalidStep   = Number(parameters['InvalidStep']);
    const MaxRetry      = Number(parameters['MaxRetry']);

    YukiKP.RandomEncountManager.isEncount = function() {
        if (EncountSwitch === -1) return true;
        if (EncountSwitch === 0) return false;
        return $gameSwitches.value(EncountSwitch);
    };

    YukiKP.RandomEncountManager.getEncountCount = function() {
        const stepNum = $gameMap.encounterStep();
        let baseNum = stepNum;
        let shapedNum = 0;
        if (RandomType === 0) {
            // 敵出現歩数重視
            const lowerShaped = -1 * Math.randomInt(ShapedWidth + 1);
            const upperShaped = Math.randomInt(ShapedWidth + 1);
            shapedNum = lowerShaped + upperShaped;
        } else if (RandomType === 1) {
            // 振れ幅内均等
            baseNum = stepNum - ShapedWidth;
            shapedNum = Math.randomInt(ShapedWidth * 2 + 1);
        } else {
            // 無効データ
            baseNum = -1;
        }
        return baseNum + shapedNum;
    };

    YukiKP.RandomEncountManager.MakeEncounterCount = Game_Player.prototype.makeEncounterCount;
    Game_Player.prototype.makeEncounterCount = function() {
        // ランダムエンカウントしない場合はスキップ
        if (YukiKP.RandomEncountManager.isEncount()) return;

        let retryCount = 0;
        let encountCount = 0;
        // エンカウント無効歩数未満の計算になった場合、再計算を行う
        while (retryCount <= MaxRetry) {
            // エンカウント歩数を取得
            encountCount = YukiKP.RandomEncountManager.getEncountCount();

            // 無効歩数を超えていればループ抜け
            if (InvalidStep < encountCount) break;

            retryCount++;
        }

        // 無効歩数を越えなかった場合は 無効歩数 +1 をエンカウント歩数にする
        this._encounterCount = InvalidStep < encountCount ? encountCount : InvalidStep + 1;
    };

    YukiKP.RandomEncountManager.ExecuteEncounter = Game_Player.prototype.executeEncounter;
    Game_Player.prototype.executeEncounter = function() {
        // ランダムエンカウントしない場合はスキップ
        if (YukiKP.RandomEncountManager.isEncount()) return false;

        return YukiKP.RandomEncountManager.ExecuteEncounter.call(this);
    };

    YukiKP.RandomEncountManager.UpdateEncounterCount = Game_Player.prototype.updateEncounterCount;
    Game_Player.prototype.updateEncounterCount = function() {
        // ランダムエンカウントしない場合はスキップ
        if (YukiKP.RandomEncountManager.isEncount()) return;

        YukiKP.RandomEncountManager.UpdateEncounterCount.call(this);
    };
})();