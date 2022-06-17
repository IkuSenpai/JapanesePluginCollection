//=============================================================================
// RPG Maker MZ - Fussy Map Refresh
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Suppress unnecessary map refresh.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_FussyMapRefresh.js(ver1.0.0)
 *
 * Overwriting the process of setting variables and switches.
 * Place it at the top of the plugin list.
 *
 * - Main feature
 * When variables, switches, and self-switches are set,
 *  refreshing is skipped if the values ​​do not change.
 *
 * Also, if the variable is set to a value other than a numerical value,
 *  refreshing will be skipped.
 *
 * - Auxiliary feature: Refresh forced skip
 * Skip refresh while the parameter switch is ON.
 * For debugging.
 * Used to check if refreshing is the cause when the game gets heavy.
 * Refreshing when changing actors or items is also skipped.
 *
 * - Plug-in command
 * -- Refresh
 *   Force refresh.
 * -- Set variable
 *   Set variables without refreshing.
 *
 * --------------------------
 * Copyright (c) 2022 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param skipSwitch
 * @text Switch
 * @type switch
 * @desc Indicates whether it is during the skip period.
 * @default 0
 *
 * @command refresh
 * @text Reflesh
 * @desc Force refresh.
 *
 * @command setVarNoRefresh
 * @text Set variable
 * @desc Set variables without refreshing.
 *
 * @arg variableId
 * @type variable
 * @text Variable
 * @desc Specify a variable.
 * @default 0
 *
 * @arg value
 * @type multiline_string
 * @text Value
 * @desc Specify a value. Enclose the string in quotation.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 不要なマップリフレッシュを抑制します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_FussyMapRefresh.js(ver1.0.0)
 *
 * ※変数やスイッチを設定する処理を上書きするので、
 *   プラグインリストの上のほうに配置してください。
 *
 * ■機能
 * 変数、スイッチ、セルフスイッチを設定した時、
 * 値が変わらなければリフレッシュをスキップします。
 *
 * また、変数に数値以外を設定した場合も、
 * リフレッシュをスキップします。
 *
 * ■補助機能：リフレッシュ強制スキップ
 * ・パラメータスイッチがONの間、リフレッシュを強制スキップします。
 *   ・デバッグ用です。
 *     ゲームが重くなってしまった時に、
 *     リフレッシュが原因なのかチェックするのに使います。
 *     アクターやアイテム変更時のリフレッシュもスキップされます。
 *
 * ■プラグインコマンド
 * ・リフレッシュ実行
 *    スキップ状態を無視して、強制的にリフレッシュします。
 * ・変数設定
 *    リフレッシュなしで変数を設定します。
 *
 * --------------------------
 * Copyright (c) 2022 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param skipSwitch
 * @text 強制スキップスイッチ
 * @type switch
 * @desc 機能を有効にするスイッチを指定します。
 * @default 0
 *
 * @command refresh
 * @text リフレッシュする
 * @desc スキップ状態を無視して、強制的にリフレッシュします。
 *
 * @command setVarNoRefresh
 * @text 変数設定
 * @desc リフレッシュなしで変数を設定します。
 *
 * @arg variableId
 * @type variable
 * @text 変数
 * @desc 変数を指定します。
 * @default 0
 *
 * @arg value
 * @type multiline_string
 * @text 値
 * @desc 値を指定します。文字列はクォーテーションで囲みます。
 *
 */

(() => {
    "use strict";
    const pluginName = "GABA_FussyMapRefresh";

    const parameters = PluginManager.parameters(pluginName);
    const skipSwitch = Number(parameters["skipSwitch"]) || null;

    //プラグインコマンド：リフレッシュ実行
    PluginManager.registerCommand(pluginName, "refresh", (args) => {
        $gameMap._needsRefresh = true;
    });

    //プラグインコマンド：変数設定
    PluginManager.registerCommand(pluginName, "setVarNoRefresh", (args) => {
        if (!Number(args.variableId)) {
            dispError("SetVariable_VARIABLE IS ZERO.");
            return;
        }
        try {
            const value = getTypeValue(args.value);
            $gameVariables._data[Number(args.variableId)] = value;
        } catch {
            dispError("SetVariable_VALUE ERROR.");
        }
    });

    // スキップ判定
    function isSkip() {
        if (skipSwitch == null) {
            return false;
        }
        return $gameSwitches.value(skipSwitch);
    }

    // 変数の設定処理を上書き
    Game_Variables.prototype.setValue = function (variableId, value) {
        if (variableId > 0 && variableId < $dataSystem.variables.length) {
            const oldValue = this._data[variableId];
            if (typeof value === "number") {
                value = Math.floor(value);
            }
            this._data[variableId] = value;
            if (
                typeof value !== "object" &&
                oldValue !== this._data[variableId]
            ) {
                this.onChange();
            }
        }
    };

    // スイッチ設定処理を上書き
    Game_Switches.prototype.setValue = function (switchId, value) {
        if (switchId > 0 && switchId < $dataSystem.switches.length) {
            const oldValue = this._data[switchId];
            this._data[switchId] = value;
            if (oldValue !== this._data[switchId]) {
                this.onChange();
            }
        }
    };

    // セルフスイッチ設定処理を上書き
    Game_SelfSwitches.prototype.setValue = function (key, value) {
        const oldValue = !!this._data[key];
        if (value) {
            this._data[key] = true;
        } else {
            delete this._data[key];
        }
        if (oldValue !== !!this._data[key]) {
            this.onChange();
        }
    };

    // リクエスト処理の変更
    const _Game_Map_requestRefresh = Game_Map.prototype.requestRefresh;
    Game_Map.prototype.requestRefresh = function () {
        if (isSkip()) {
            return;
        }
        _Game_Map_requestRefresh.apply(this, arguments);
    };

    //--------------------------------------------
    // その他

    // evalの代替
    function getTypeValue(value) {
        return Function("'use strict';return (" + value + ")")();
    }

    // エラーメッセージ
    function dispError(mes) {
        console.log(`${pluginName}_${mes}`);
    }
})();
