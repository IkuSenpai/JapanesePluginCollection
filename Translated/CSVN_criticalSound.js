/*=============================================================================
 CSVN_criticalSound.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/17 初版
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Play specified SE when critical.
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/ne9aafd8d7c31
 *
 * @help CSVN_criticalSound.js
 *
 * Play specified SE when critical.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param name1
 * @text file name for actor's.
 * @desc
 * @default Attack3
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume1
 * @parent name1
 * @text volume for actor's.'
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch1
 * @parent name1
 * @text pitch for actor's.'
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name2
 * @text file name for actor's.
 * @desc
 * @default Damage3
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume2
 * @parent name2
 * @text volume for actor's.
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch2
 * @parent name2
 * @text pitch for actor's.
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 */

/*:ja
 * @target MZ
 * @plugindesc クリティカル発生時に指定したSEを演奏します。
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/ne9aafd8d7c31
 *
 * @help CSVN_criticalSound.js
 *
 * クリティカル発生時に指定したSEを演奏します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param name1
 * @text アクター側のファイル名
 * @desc
 * @default Attack3
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume1
 * @parent name1
 * @text アクター側のボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch1
 * @parent name1
 * @text アクター側のピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 *
 * @param name2
 * @text エネミー側のファイル名
 * @desc
 * @default Damage3
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param volume2
 * @parent name2
 * @text エネミー側のボリューム
 * @desc
 * @type number
 * @min 0
 * @default 90
 *
 * @param pitch2
 * @parent name2
 * @text エネミー側のピッチ
 * @desc
 * @type number
 * @max 1000000
 * @min 10
 * @default 100
 */
(() => {
    const pluginName = 'CSVN_criticalSound';
    const params = PluginManager.parameters(pluginName);
    const name1 = (params['name1'] || 'Attack3');
    const volume1 = Number(params['volume1'] || 90);
    const pitch1 = Number(params['pitch1'] || 100);
    const name2 = (params['name2'] || 'Damage3');
    const volume2 = Number(params['volume2'] || 90);
    const pitch2 = Number(params['pitch2'] || 100);

    function playActorCritical() {
        AudioManager.playStaticSe({
            name: name1,
            volume: volume1,
            pitch: pitch1,
        });
    }

    function playEnemyCritical() {
        AudioManager.playStaticSe({
            name: name2,
            volume: volume2,
            pitch: pitch2,
        });
    }

    Window_BattleLog.prototype.displayCritical = function(target) {
        if (target.result().critical) {
            if (target.isActor()) {
                playEnemyCritical();
                this.wait();
                this.wait();
                this.wait();
                this.push("addText", TextManager.criticalToActor);
            } else {
                playActorCritical();
                this.wait();
                this.wait();
                this.wait();
                this.push("addText", TextManager.criticalToEnemy);
            }
        }
    }
})();