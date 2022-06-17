
/*:
 * @target MZ
 * @plugindesc 戦闘開始時SE差し替えプラグイン
 * @author さすらいのトム
 *
 * @help
 * 特定のスイッチがオンの時だけ戦闘開始時のSEを差し替えます
 * 主にボス戦闘などで使用されると思われる
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 *
 * @param BossSwitch
 * @text ボス戦判別スイッチ
 * @desc ONにすると戦闘開始SEが変わります
 * @default 1
 * @type switch
 *
 *
 *
 * @param BossSE
 * @text ボス戦時に再生するSE
 * @desc ボス戦時に再生するSEです。
 * @default
 * @type file
 * @dir audio/se
 * @default Magic3

 * @param volume
 * @text ボス戦時に再生するSEの音量
 * @desc ボス戦時に再生するSEの音量です。
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param pitch
 * @text ボス戦時に再生するSEのピッチ
 * @desc ボス戦時に再生するSEのピッチです。
 * @type number
 * @min 0
 * @max 150
 * @default 100
 * 
 * @param pan
 * @text ボス戦時に再生するSEの位相
 * @desc ボス戦時に再生するSEの位相です。
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * 
 * 
 * @Help
 * へるぷ
 * 
 * 
 */

(() => {
    'use strict';


    const pluginName = 'CustomBattleStartSE';
    const parameters = PluginManager.parameters(pluginName);
    const BossSwitch = parameters['BossSwitch'];
    const BossSE = parameters['BossSE'];
    const volume = parameters['volume'];
    const pitch = parameters['pitch'];
    const pan = parameters['pan'];


    var SoundManager_playBattleStart = SoundManager.playBattleStart;
    SoundManager.playBattleStart = function() {
        if ($gameSwitches.value(BossSwitch)) {
            AudioManager.playSe({"name":BossSE,"volume":volume,"pitch":pitch,"pan":pan});
        } else {
            SoundManager_playBattleStart.call(this);
        }
    };
    

})();
