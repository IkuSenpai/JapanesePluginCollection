/*:
@plugindesc
ゲーム開始時実行 Ver1.0.3(2022/4/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/NewGame/NewGame.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- コピーライト更新
- リファクタ

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
ゲーム開始時に実行されるプラグインです。

## 使い方
使用したい機能のパラメータを設定してください

@param SetGold
@type boolean
@text 所持金設定
@desc ゲーム開始時の所持金を設定するか
@on 設定する
@off 設定しない
@default false

    @param StartGold
    @parent SetGold
    @type number
    @text ゲーム開始所持金
    @desc ゲーム開始時の所持金
    @default 1000
    @min 0

@param StepAnime
@type boolean
@text 初期足踏みアニメ
@desc ニューゲームで開始したときにアクターが
足踏みをするようになります
@on 足踏みする
@off 足踏みしない
@default false

@param StartDirection
@type select
@text プレイヤー初期向き
@desc プレイヤーの初期向き
@default 2
@option 下
@value 2
@option 左
@value 4
@option 右
@value 6
@option 上
@value 8
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_convertBool(bool) {
        if (bool === "false" || bool === '') {
            return false;
        } else {
            return true;
        }
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const SetGold   = Potadra_convertBool(params.SetGold);
    const StartGold = Number(params.StartGold);
    const StepAnime = Potadra_convertBool(params.StepAnime);
    const StartDirection = Number(params.StartDirection || 2);

    // 所持金設定
    if (SetGold) {
        /**
         * パーティを扱うクラスです。所持金やアイテムなどの情報が含まれます。
         * このクラスのインスタンスは $gameParty で参照されます。
         *
         * @class
         */

        /**
         * オブジェクト初期化
         */
        const _Game_Party_initialize = Game_Party.prototype.initialize;
        Game_Party.prototype.initialize = function() {
            _Game_Party_initialize.apply(this, arguments);
            this._gold = StartGold; // 所持金
        };
    }

    // 初期足踏みアニメ
    if (StepAnime) {
        /**
         * キャラクターを扱う基本のクラスです。
         * 全てのキャラクターに共通する、
         * 座標やグラフィックなどの基本的な情報を保持します。
         *
         * @class
         */

        /**
         * オブジェクト初期化
         */
        const _Game_CharacterBase_initialize = Game_CharacterBase.prototype.initialize;
        Game_CharacterBase.prototype.initialize = function() {
            _Game_CharacterBase_initialize.apply(this, arguments);
            this._stepAnime = true;
        };
    }

    /**
     * ゲーム開始時のプレイヤー位置
     */
    Game_Player.prototype.setupForNewGame = function() {
        const mapId = $dataSystem.startMapId;
        const x = $dataSystem.startX;
        const y = $dataSystem.startY;
        this.reserveTransfer(mapId, x, y, StartDirection, 0); // 下を向く
    };
})();
