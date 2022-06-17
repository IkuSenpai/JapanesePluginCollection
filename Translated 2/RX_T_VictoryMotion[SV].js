//=============================================================================
// Plugin_Name : [SV]Victory Motion
// File_Name   : RX_T_VictoryMotion[SV].js
// Version     : 2.00
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc You will be able to create skills whose effects are always indeterminate.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @param Sustaining motions
 * @text Sustaining motions
 * @desc Do you want the motion you set to persist after the battle?　ON:Persist　OFF:Default motion
 * @type boolean
 * @default false
 *
 * @command WinMotion
 * @text Change winning motion
 * @desc Change the actor's motion when you win.
 *
 * @arg MotionType
 * @text Motion Type
 * @desc Choose from a total of 17 different motions.
 * @default victory
 * @type select
 * @option 0.Default
 * @value victory
 * @option 1.Walk
 * @value walk
 * @option 2.Wait
 * @value wait
 * @option 3.Chant
 * @value chant
 * @option 4.Guard
 * @value guard
 * @option 5.Damage
 * @value damage
 * @option 6.Evade
 * @value evade
 * @option 7.Thrust
 * @value thrust
 * @option 8.Swing
 * @value swing
 * @option 9.Projectile Weapon(Missile)
 * @value missile
 * @option 10.Skill
 * @value skill
 * @option 11.Spell
 * @value spell
 * @option 12.Item
 * @value item
 * @option 13.Escape
 * @value escape
 * @option 14.Dying
 * @value dying
 * @option 15.Abnormal
 * @value abnormal
 * @option 16.Sleep
 * @value sleep
 * @option 17.Dead
 * @value dead
 *
 * @help [SV]Victory Motion
 * 
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 * Also, this plugin is for side-view mode only.
 *
 * ◆Summary
 * When you win a battle, you can change the actor's motion according to
 * the setting.
 * For example, it works well when you want to produce the following
 * situations.
 *
 * Example 1: When you're in a pinch at an event.
 * Example 2: When you've won, but you've run out of steam too.
 *
 * ◆Usage
 * [Configuring Plugin Parameters]
 * ★Sustaining motions
 * Decides whether or not you want the motion to persist after the fight is
 * over.
 * ON: The motion that you are setting will persist until you change the motion
 * again.
 * OFF: After the fight is over, the motions you set will return to the
 * defaults.
 *
 * [Motion settings]
 * You can set it up with the plug-in commands (MV and MZ have different
 * configuration methods).
 * Some motions can be posed and not moved from there.
 *
 * The timing of the setting can be any time until the end of the battle to
 * which you want to apply the following settings.
 *
 * ★Usage in the MZ version
 * Plugin File: RX_T_VictoryMotion[SV]
 *
 * [Motion Type]
 * Choose from a total of 17 different motions.
 *
 * ★Usage in the MV version
 * Use the plugin command to configure it as follows.
 *
 * motion 1
 *
 * Here's what poses you'll find below in which settings.
 * For example, if it is marked "Abnormal:15, abnormal, sicked"
 *
 * motion 15
 * motion abnormal
 * motion sicked
 *
 * All of these commands will have the same meaning, so enter the one you feel
 * comfortable typing.
 *
 * [List of Plug-in Commands for MV]
 * Default:0, default, victory
 * Walk:1, walk
 * Wait:2, wait
 * Chant:3, chant　
 * Guard:4, guard
 * Damage:5, damage
 * Evade:6, evade
 * Thrust:7, thrust
 * Swing:8, swing
 * Projectile weapon:9, missile
 * Skill:10, skill
 * Spell:11, spell, magic
 * Item:12, item
 * Escape:13, escape
 * Dying:14, dying
 * Abnormal:15, abnormal, sicked
 * Sleep:16, sleep
 * Dead:17, dead
 * 
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target MV MZ
 * @plugindesc 【SV用】戦闘に勝利した時、設定に応じてアクターのモーションを変化させます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command WinMotion
 * @text 勝利時モーションの変更
 * @desc 勝利時のアクターモーションを変更します。
 *
 * @arg MotionType
 * @text モーションタイプ
 * @desc モーションの種類です（全17種類）。
 * @default victory
 * @type select
 * @option 1.デフォルト
 * @value victory
 * @option 2.前進
 * @value walk
 * @option 3.待機
 * @value wait
 * @option 4.詠唱
 * @value chant
 * @option 5.防御
 * @value guard
 * @option 6.ダメージ
 * @value damage
 * @option 7.回避
 * @value evade
 * @option 8.突き刺す
 * @value thrust
 * @option 9.飛び道具
 * @value missile
 * @option 10.スキル
 * @value skill
 * @option 11.魔法
 * @value spell
 * @option 12.アイテム
 * @value item
 * @option 13.逃げる
 * @value escape
 * @option 14.瀕死
 * @value dying
 * @option 15.状態異常
 * @value abnormal
 * @option 16.睡眠
 * @value sleep
 * @option 17.戦闘不能
 * @value dead
 *
 * @param Sustaining motions
 * @text モーションの持続
 * @desc 戦闘終了後、設定したモーションを持続させますか？
 * ON:持続させる OFF:デフォルトに戻す
 * @type boolean
 * @default false
 *
 * @help 【SV】勝利時モーション
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 * また、このプラグインはサイドビューモード専用です。
 *
 * ◆概要
 * 戦闘に勝利すると、設定に応じてアクターのモーションが変化します。
 * 戦闘後、イベントでピンチになった時や、勝つには勝ったが自分も力尽きた…
 * というのを表現したい時等に効果を発揮します。
 *
 * ◆使い方
 * 【プラグインパラメータの設定】
 * ★モーションの持続
 * 戦闘終了後、設定したモーションを持続させるかを決めます。　
 * ON:次にモーションを変えるまで設定したモーションを持続させます。
 * OFF:戦闘終了後、設定したモーションはデフォルトに戻ります。
 *
 * 【モーションの設定】
 * プラグインコマンドで設定します（MVとMZでは設定方法が異なります）。
 * モーションによってはポーズを取ってそのまま動かないタイプもあります。
 *
 * 設定のタイミングは、下記設定を適用したい戦闘が終了するまでであれば
 * いつでも良いと思われます。
 *
 * ★MZ版
 * プラグインファイル：RX_T_VictoryMotion[SV]
 *
 * 【モーションタイプ】
 * 全17種類のモーションから選択します。
 *
 * ★MV版
 * プラグインコマンドで以下の要領で設定します。
 *
 * motion 1
 *
 * どの設定でどんなポーズを取るのかを下記に紹介します。
 * 例えば「前進：1, walk, 前進」と表記されている場合
 *
 * motion 1
 * motion walk
 * motion 前進
 *
 * これらはどれも同じ意味のコマンドになるので、入力しやすいと思ったものを
 * 入力してください。
 *
 * 【MV版プラグインコマンド一覧】
 * デフォルト：0, default, victory, デフォルト
 * 前進：1, walk, 前進
 * 待機：2, wait, 待機
 * 詠唱：3, chant, 詠唱　
 * 防御：4, guard, 防御
 * ダメージ：5, damage, ダメージ
 * 回避：6, evade, 回避
 * 突き刺す：7, thrust, 突く, 突き, 突き刺す
 * 振る：8, swing, 振り, 振る, スイング
 * 飛び道具：9, missile, 飛び道具, 遠距離武器
 * スキル：10, skill, スキル, 必殺技
 * 魔法：11, spell, magic, 魔法
 * アイテム：12, item, アイテム
 * 逃げる：13, escape, 逃げる, 逃走
 * 瀕死：14, dying ,瀕死
 * 状態異常：15, abnormal, sicked, 状態異常
 * 睡眠：16, sleep, 睡眠
 * 戦闘不能：17, dead, 戦闘不能, '死亡'
 * 
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

    //RX-T plugin parameters
    const rx_WinMotion = PluginManager.parameters('RX_T_VictoryMotion[SV]');
    const rx_SustainingMotions = (rx_WinMotion['Sustaining motions'] === "true");

    if (PluginManager._commands !== undefined) {
        //PluginManager
        PluginManager.registerCommand("RX_T_VictoryMotion[SV]", "WinMotion", args => {
            $gamePlayer._rx_victotyMotion = args.MotionType;
        });
    } else {
        //Game_Interpreter
        const rx_t_gipc200904_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            rx_t_gipc200904_pluginCommand.call(this, command, args);
            if (command === 'motion') {
                switch (args[0]) {
                case '0': case 'default': case 'victory': case 'デフォルト':
                    $gamePlayer._rx_victotyMotion = 'victory';
                    break;
                case '1': case 'walk': case '前進':
                    $gamePlayer._rx_victotyMotion = 'walk';
                    break;
                case '2': case 'wait': case '待機':
                    $gamePlayer._rx_victotyMotion = 'wait';
                    break;
                case '3': case 'chant': case '詠唱':
                    $gamePlayer._rx_victotyMotion = 'chant';
                    break;
                case '4': case 'guard': case '防御':
                    $gamePlayer._rx_victotyMotion = 'guard';
                    break;
                case '5': case 'damage': case 'ダメージ':
                    $gamePlayer._rx_victotyMotion = 'damage';
                    break;
                case '6': case 'evade': case '回避':
                    $gamePlayer._rx_victotyMotion = 'evade';
                    break;
                case '7': case 'thrust': case '突く': case '突き': case '突き刺す':
                    $gamePlayer._rx_victotyMotion = 'thrust';
                    break;
                case '8': case 'swing': case '振り': case '振る': case 'スイング':
                    $gamePlayer._rx_victotyMotion = 'swing';
                    break;
                case '9': case 'missile': case '飛び道具': case '遠距離武器':
                    $gamePlayer._rx_victotyMotion = 'missile';
                    break;
                case '10': case 'skill': case 'スキル': case '必殺技':
                    $gamePlayer._rx_victotyMotion = 'skill';
                    break;
                case '11': case 'spell': case 'magic': case '魔法':
                    $gamePlayer._rx_victotyMotion = 'spell';
                    break;
                case '12': case 'item': case 'アイテム':
                    $gamePlayer._rx_victotyMotion = 'item';
                    break;
                case '13': case 'escape': case '逃げる': case '逃走':
                    $gamePlayer._rx_victotyMotion = 'escape';
                    break;
                case '14': case 'dying': case '瀕死':
                    $gamePlayer._rx_victotyMotion = 'dying';
                    break;
                case '15': case 'abnormal': case 'sicked': case '状態異常':
                    $gamePlayer._rx_victotyMotion = 'abnormal';
                    break;
                case '16': case 'sleep': case '睡眠':
                    $gamePlayer._rx_victotyMotion = 'sleep';
                    break;
                case '17': case 'dead': case '戦闘不能': case '死亡':
                    $gamePlayer._rx_victotyMotion = 'dead';
                    break;
                }
            }
        };
    }

    //Game_Actor

    const rx_t_gapv2008207_performVictory = Game_Actor.prototype.performVictory;
    Game_Actor.prototype.performVictory = function() {
        this.setActionState("done");
        if (this.canMove() && $gamePlayer._rx_victotyMotion !== undefined) {
            this.requestMotion($gamePlayer._rx_victotyMotion);
            return;
        }
        rx_t_gapv2008207_performVictory.call(this);
    };

    //Game_Party

    const rx_t_gppv200904_performVictory = Game_Party.prototype.performVictory;
    Game_Party.prototype.performVictory = function() {
        rx_t_gppv200904_performVictory.call(this);
        if (!rx_SustainingMotions) $gamePlayer._rx_victotyMotion = undefined;
    };

})();