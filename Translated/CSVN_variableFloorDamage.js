/*=============================================================================
 CSVN_variableFloorDamage.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/19 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Various damage value by terrain tags.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/nd9a5777082c6
 *
 * @help CSVN_variableFloorDamage.js
 *
 * Various damage value by terrain tags.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param d0
 * @text damage value for terrain tag 0.
 * @desc
 * @default 10
 * @type number
 *
 * @param color0
 * @text flash color for terrain tag 0.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name0
 * @text SE for terrain tag 0.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume0
 * @parent name0
 * @text SE volume for terrain tag 0.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch0
 * @parent name0
 * @text SE pitch for terrain tag 0.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d1
 * @text damage value for terrain tag 1.
 * @desc
 * @default 10
 * @type number
 *
 * @param color1
 * @text flash color for terrain tag 1.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name1
 * @text SE for terrain tag 1.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume1
 * @parent name1
 * @text SE volume for terrain tag 1.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch1
 * @parent name1
 * @text SE pitch for terrain tag 1.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d2
 * @text damage value for terrain tag 2.
 * @desc
 * @default 10
 * @type number
 *
 * @param color2
 * @text flash color for terrain tag 2.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name2
 * @text SE for terrain tag 2.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume2
 * @parent name2
 * @text SE volume for terrain tag 2.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch2
 * @parent name2
 * @text SE pitch for terrain tag 2.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d3
 * @text damage value for terrain tag 3.
 * @desc
 * @default 10
 * @type number
 *
 * @param color3
 * @text flash color for terrain tag 3.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name3
 * @text SE for terrain tag 3.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume3
 * @parent name3
 * @text SE volume for terrain tag 3.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch3
 * @parent name3
 * @text SE pitch for terrain tag 3.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d4
 * @text damage value for terrain tag 4.
 * @desc
 * @default 10
 * @type number
 *
 * @param color4
 * @text flash color for terrain tag 4.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name4
 * @text SE for terrain tag 4.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume4
 * @parent name4
 * @text SE volume for terrain tag 4.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch4
 * @parent name4
 * @text SE pitch for terrain tag 4.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d5
 * @text damage value for terrain tag 5.
 * @desc
 * @default 10
 * @type number
 *
 * @param color5
 * @text flash color for terrain tag 5.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name5
 * @text SE for terrain tag 5.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume5
 * @parent name5
 * @text SE volume for terrain tag 5.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch5
 * @parent name5
 * @text SE pitch for terrain tag 5.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d6
 * @text damage value for terrain tag 6.
 * @desc
 * @default 10
 * @type number
 *
 * @param color6
 * @text flash color for terrain tag 6.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name6
 * @text SE for terrain tag 6.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume6
 * @parent name6
 * @text SE volume for terrain tag 6.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch6
 * @parent name6
 * @text SE pitch for terrain tag 6.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d7
 * @text damage value for terrain tag 7.
 * @desc
 * @default 10
 * @type number
 *
 * @param color7
 * @text flash color for terrain tag 7.
 * @desc
 * @default red
 * @type combo
 * @option red
 * @option white
 * @option yellow
 * @option blue
 * @option green
 *
 * @param name7
 * @text SE for terrain tag 7.
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume7
 * @parent name7
 * @text SE volume for terrain tag 7.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch7
 * @parent name7
 * @text SE pitch for terrain tag 7.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 */

/*:ja
 * @target MZ
 * @plugindesc 地形タグを見てダメージ床の挙動を変化させます。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/nd9a5777082c6
 *
 * @help CSVN_variableFloorDamage.js
 *
 * 地形タグを見てダメージ床の挙動を変化させます。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param d0
 * @text 地形タグ0の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color0
 * @text 地形タグ0の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name0
 * @text 地形タグ0のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume0
 * @parent name0
 * @text 地形タグ0のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch0
 * @parent name0
 * @text 地形タグ0のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d1
 * @text 地形タグ1の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color1
 * @text 地形タグ0の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name1
 * @text 地形タグ1のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume1
 * @parent name1
 * @text 地形タグ1のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch1
 * @parent name1
 * @text 地形タグ1のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d2
 * @text 地形タグ2の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color2
 * @text 地形タグ2の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name2
 * @text 地形タグ2のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume2
 * @parent name2
 * @text 地形タグ2のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch2
 * @parent name2
 * @text 地形タグ2のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d3
 * @text 地形タグ3の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color3
 * @text 地形タグ3の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name3
 * @text 地形タグ3のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume3
 * @parent name3
 * @text 地形タグ3のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch3
 * @parent name3
 * @text 地形タグ3のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d4
 * @text 地形タグ4の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color4
 * @text 地形タグ4の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name4
 * @text 地形タグ4のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume4
 * @parent name4
 * @text 地形タグ4のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch4
 * @parent name4
 * @text 地形タグ4のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d5
 * @text 地形タグ5の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color5
 * @text 地形タグ5の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name5
 * @text 地形タグ5のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume5
 * @parent name5
 * @text 地形タグ5のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch5
 * @parent name5
 * @text 地形タグ5のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d6
 * @text 地形タグ6の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color6
 * @text 地形タグ6の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name6
 * @text 地形タグ6のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume6
 * @parent name6
 * @text 地形タグ6のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch6
 * @parent name6
 * @text 地形タグ6のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 *
 * @param d7
 * @text 地形タグ7の場合のダメージ
 * @desc
 * @default 10
 * @type number
 *
 * @param color7
 * @text 地形タグ7の場合のフラッシュの色
 * @desc
 * @default 赤
 * @type combo
 * @option 赤
 * @option 白
 * @option 黄
 * @option 青
 * @option 緑
 *
 * @param name7
 * @text 地形タグ7のSEファイル名
 * @desc
 * @default Damage3
 * @dir audio/se/
 * @type file
 *
 * @param volume7
 * @parent name7
 * @text 地形タグ7のSEボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch7
 * @parent name7
 * @text 地形タグ7のSEピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 150
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    Game_Actor.prototype.basicFloorDamage = function() {
        return params['d' + $gamePlayer.terrainTag()];
    };

    Game_Screen.prototype.startFlashForDamage = function() {
        const ttag = $gamePlayer.terrainTag();
        let color;
        switch (params['color' + ttag]) {
            case '赤':
                color = [255, 0, 0, 128];
                break;
            case 'red':
                color = [255, 0, 0, 128];
                break;
            case '白':
                color = [255, 255, 255, 128];
                break;
            case 'white':
                color = [255, 255, 255, 128];
                break;
            case '黄':
                color = [255, 255, 0, 128];
                break;
            case 'yellow':
                color = [255, 255, 0, 128];
                break;
            case '青':
                color = [0, 0, 255, 128];
                break;
            case 'blue':
                color = [0, 0, 255, 128];
                break;
            case '緑':
                color = [0, 255, 255, 128];
                break;
            case 'green':
                color = [0, 255, 255, 128];
                break;
            default:
                color = [255, 0, 0, 128];
                break;
        }
        this.startFlash(color, 8);

        const se = {
            name: params['name' + ttag],
            volume: params['volume' + ttag],
            pitch: params['pitch' + ttag]
        };
        AudioManager.playStaticSe(se);
    };

})();