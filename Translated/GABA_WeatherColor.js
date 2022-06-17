//=============================================================================
// RPG Maker MZ - Weather Color
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Set the weather color.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 *
 * @help GABA_WeatherColor.js(ver1.0.1)
 *
 * Can set the color of the weather with a plugin command.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Set Color Name".
 *   2. Please specify the CSS3 color name.
 *      ex) red, blue, green...
 *
 * Assign one variable to save the color name.
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param variable
 * @type variable
 * @desc Specify the variable for saving the color name.
 *
 * @command set
 * @text Set Color Name
 * @desc Sets color name.
 *       Web colors are available.(red/blue/green..)
 *
 * @arg colorName
 * @type string
 * @text Color Name
 * @desc Sets text to color name.
 *       If you want to restore: "white"
 */

/*:ja
 * @target MZ
 * @plugindesc 天候の色を設定します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_WeatherColor.js(ver1.0.1)
 *
 * プラグインコマンドで天候の色を設定できるようになります。
 *
 * 次の手順で使用してください。
 *   1. プラグインコマンド「天候の色の設定」を呼び出します。
 *   2. colorNameに、色名を指定してください。
 *      CSS3定義の色名が使えます。
 *      red/blue/gree/crimson/navy/limeなど
 *      デフォルトは「white」です。
 *      無効な色名を指定した場合、黒くなります。
 *   3. 「天候の設定」イベントを実行すると、指定した色で雨や雪が降ります。
 *
 *   色名の保存先として変数を割り当ててください。
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param variable
 * @text 色名保存用の変数
 * @type variable
 * @desc 色名保存用の変数を指定します。
 *
 * @command set
 * @text 天候の色の設定
 * @desc 天候の色名を設定します。
 *       元に戻したい場合は「white」を指定してください。
 *
 * @arg colorName
 * @type string
 * @text 色名
 * @desc 色名を指定してください。
 *       CSS3定義の名前を使えます（red/blue/crimson/navy/など）
 */

(() => {
    "use strict";
    const pluginName = "GABA_WeatherColor";

    // パラメータ
    const parameters = PluginManager.parameters("GABA_WeatherColor");
    const colorVariable = Number(parameters["variable"]) || 0;

    // プラグインコマンド
    PluginManager.registerCommand(pluginName, "set", args => {
        if (colorVariable !== 0) {
            $gameVariables._data[colorVariable] = args.colorName || "white";
        }
    });

    // 天候の設定
    const _Game_Screen_changeWeather = Game_Screen.prototype.changeWeather;
    Game_Screen.prototype.changeWeather = function(type, power, duration) {
        changeWeatherColor();
        _Game_Screen_changeWeather.apply(this, arguments);
    };

    // 天候のスプライト
    const _Scene_Map_createSpriteset = Scene_Map.prototype.createSpriteset;
    Scene_Map.prototype.createSpriteset = function() {
        _Scene_Map_createSpriteset.apply(this, arguments);
        changeWeatherColor();
    };

    //天候の色変更
    function changeWeatherColor() {
        if (colorVariable === 0) {
            return;
        }

        const colorName = $gameVariables.value(colorVariable) || "white";
        SceneManager._scene._spriteset._weather._rainBitmap.fillAll(colorName);
        SceneManager._scene._spriteset._weather._stormBitmap.fillAll(colorName);
        SceneManager._scene._spriteset._weather._snowBitmap.drawCircle(4, 4, 4, colorName);
    };
})();
