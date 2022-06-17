/*=============================================================================
 CSVN_skillTypeSe.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/30 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:ja
 * @target MZ
 * @plugindesc Play the SE set according to the skill type
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/nb10d9e884e8d
 *
 * @help CSVN_skillTypeSe.js
 *
 * Play the SE set according to the skill type. I think that
 * it is especially useful when you have set multiple targets for the skill
 * and set the animation for single use and want to sound the SE only once
 * at the beginning.
 * 9 types are all right, right?
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param name1
 * @text filename1
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume1
 * @parent name1
 * @text volume1
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch1
 * @parent name1
 * @text pitch1
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name2
 * @text filename2
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume2
 * @parent name2
 * @text volume2
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch2
 * @parent name2
 * @text pitch2
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name3
 * @text filename3
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume3
 * @parent name3
 * @text volume3
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch3
 * @parent name3
 * @text pitch3
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name4
 * @text filename4
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume4
 * @parent name4
 * @text volume4
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch4
 * @parent name4
 * @text pitch4
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name5
 * @text filename5
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume5
 * @parent name5
 * @text volume5
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch5
 * @parent name5
 * @text pitch5
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name6
 * @text filename6
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume6
 * @parent name6
 * @text volume6
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch6
 * @parent name6
 * @text pitch6
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name7
 * @text filename7
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume7
 * @parent name7
 * @text volume7
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch7
 * @parent name7
 * @text pitch7
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name8
 * @text filename8
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume8
 * @parent name8
 * @text volume8
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch8
 * @parent name8
 * @text pitch8
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name9
 * @text filename9
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume9
 * @parent name9
 * @text volume9
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch9
 * @parent name9
 * @text pitch9
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 */

/*:ja
 * @target MZ
 * @plugindesc スキルタイプに応じて設定したSEを演奏します
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/nb10d9e884e8d
 *
 * @help CSVN_skillTypeSe.js
 *
 * スキルタイプに応じて設定したSEを演奏します。
 * 複数対象でかつアニメーションには単体用を設定していて、最初の1回だけ
 * SEを鳴らしたいときに特に有用かなと思います。
 * 9種類あればもういいよね?
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param name1
 * @text ファイル名1
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume1
 * @parent name1
 * @text ボリューム1
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch1
 * @parent name1
 * @text ピッチ1
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name2
 * @text ファイル名2
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume2
 * @parent name2
 * @text ボリューム2
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch2
 * @parent name2
 * @text ピッチ2
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name3
 * @text ファイル名3
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume3
 * @parent name3
 * @text ボリューム3
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch3
 * @parent name3
 * @text ピッチ3
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name4
 * @text ファイル名4
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume4
 * @parent name4
 * @text ボリューム4
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch4
 * @parent name4
 * @text ピッチ4
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name5
 * @text ファイル名5
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume5
 * @parent name5
 * @text ボリューム5
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch5
 * @parent name5
 * @text ピッチ5
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name6
 * @text ファイル名6
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume6
 * @parent name6
 * @text ボリューム6
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch6
 * @parent name6
 * @text ピッチ6
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name7
 * @text ファイル名7
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume7
 * @parent name7
 * @text ボリューム7
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch7
 * @parent name7
 * @text ピッチ7
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name8
 * @text ファイル名8
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume8
 * @parent name8
 * @text ボリューム8
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch8
 * @parent name8
 * @text ピッチ8
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name9
 * @text ファイル名9
 * @desc
 * @default Magic2
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume9
 * @parent name9
 * @text ボリューム9
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch9
 * @parent name9
 * @text ピッチ9
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 */
(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    SoundManager.playSkillTypeSe = function(i) {
        AudioManager.playStaticSe({
            name: params['name' + i],
            volume: params['volume' + i],
            pitch: params['pitch' + i],
        });
    };

    const _Game_Battler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        _Game_Battler_useItem.call(this, item);

        if (DataManager.isSkill(item)) {
            SoundManager.playSkillTypeSe(item.stypeId);
        }
    };
})();