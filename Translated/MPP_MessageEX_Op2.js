//=============================================================================
// MPP_MessageEX_Op2.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc You will be able to use the original animation for [Display text].
 * @url 
 * 
 * @base MPP_MessageEX
 * @orderAfter MPP_MessageEX
 *
 * @help [version 1.0.0]
 * This plugin is for RPG Maker MV and MZ.
 * 
 * ▼ specification
 *  - Execute the described commands in order from the top.
 *  - When all is done, the animation will end and it will be drawn in its
 *    original position.
 * 
 * ▼ Command list
 *  〇 show origin x y scaleX scaleY opacity
 *       origin  : 0:upper left, 1:center / Not set is 0
 *       x       : Not set is 0
 *       y       : Not set is 0
 *       scaleX  : 1x at 100 / Not set is 100
 *       scaleY  : 1x at 100 / Not set is 100
 *       opacity : Specify from 0-255 / Not set is 255
 *   - The character is displayed at the specified position.
 *   - This command is mainly intended to be executed first.
 *  
 *  〇 move x y duration
 *       x        : Not set is 0
 *       y        : Not set is 0
 *       duration : frame / Not set is 0
 *   - Move the character.
 *   - There is no function to wait until completion.
 *  
 *  〇 scale scaleX scaleY duration
 *       scaleX   : 1x at 100 / Not set is 100
 *       scaleY   : 1x at 100 / Not set is 100
 *       duration : frame / Not set is 0
 *   - Change the enlargement ratio of characters.
 *   - There is no function to wait until completion.
 *  
 *  〇 opacity o duration
 *       o        : opacity (Specify from 0-255 / Not set is 255)
 *       duration : frame / Not set is 0
 *   - Change the opacity of the text.
 *   - There is no function to wait until completion.
 *  
 *  〇 rotate r duration
 *       r        : rotation angle (Not set is 0)
 *       duration : frame / Not set is 0
 *   - Rotates the character to the specified angle.
 *   - There is no function to wait until completion.
 *  
 *  〇 tone red green blue gray duration
 *       red      : Not set is 0
 *       green    : Not set is 0
 *       blue     : Not set is 0
 *       gray     : Not set is 0
 *       duration : frame / Not set is 0
 *   - Change the text to color.
 *   - There is no function to wait until completion.
 *  
 *  〇 frame minX minY maxX maxY duration
 *       minX     : Specify from 0-100 / Not set is 0
 *       minY     : Specify from 0-100 / Not set is 0
 *       maxX     : Specify from 0-100 / Not set is 100
 *       maxY     : Specify from 0-100 / Not set is 100
 *       duration : frame / Not set is 0)
 *   - Change the display range of characters.
 *   - There is no function to wait until completion.
 *  
 *  〇 wait duration
 *       duration : frame / Not set is 0
 *   - Pauses processing.
 *   - If you do not specify a time, wait until the command being executed
 *     finishes.
 *  
 *  〇 finish duration
 *       duration : frame / Not set is 0
 *   - Change all parameters to default values.
 *   - Wait until completion.
 *   - This command is supposed to be executed last.
 *  
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param \AT[1]
 * @desc 
 * @type note
 * @default "show 0 -6 0 100 100 0\nfinish 15"
 *
 * @param \AT[2]
 * @desc 
 * @type note
 * @default "show 0 0 0 0 100\nscale 75 100 6\nwait\nfinish 6"
 *
 * @param \AT[3]
 * @desc 
 * @type note
 * @default "show 1 0 0 0 0\nscale 60 60 7\nwait\nscale 100 100 7\nwait\nscale 120 120 8\nwait\nfinish 8"
 *
 * @param \AT[4]
 * @desc 
 * @type note
 * @default "show\nframe 0 0 0 100 0\nfinish 10"
 *
 * @param \AT[5]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[6]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[7]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[8]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[9]
 * @desc 
 * @type note
 * @default 
 *
 */

/*:ja
 * @target MV MZ
 * @plugindesc 文章の表示にオリジナルアニメーションを使用できるようになります。
 * @url 
 * 
 * @base MPP_MessageEX
 * @orderAfter MPP_MessageEX
 *
 * @help [version 1.0.0]
 * このプラグインはRPGツクールMVおよびMZ用です。
 * 
 * ▼ 仕様
 *  - 記述したコマンドを上から順に実行していきます。
 *  - すべて実行し終えた時点でアニメーションを終了し、本来の位置に描写されます。
 * 
 * ▼ コマンド一覧
 *  〇 show origin x y scaleX scaleY opacity
 *       origin  : 原点 (0:左上, 1:中心 / 未設定は0)
 *       x       : 相対X座標 (未設定は0)
 *       y       : 相対Y座標 (未設定は0)
 *       scaleX  : 拡大率　幅 (100で等倍 / 未設定は100)
 *       scaleY  : 拡大率　高さ (100で等倍 / 未設定は100)
 *       opacity : 不透明度 (0-255で指定 / 未設定は255)
 *   - 文字を指定した位置に表示します。
 *   - 主に一番最初に実行することを想定したコマンドです。
 *  
 *  〇 move x y duration
 *       x        : 移動先X座標 (未設定は0)
 *       y        : 移動先Y座標 (未設定は0)
 *       duration : 時間 (フレーム / 未設定は0)
 *   - 文字を移動させます。
 *   - 完了までウェイトする機能はありません。
 *  
 *  〇 scale x y duration
 *       x       : 拡大率　幅 (100で等倍 / 未設定は100)
 *       y       : 拡大率　高さ (100で等倍 / 未設定は100)
 *       duration : 時間 (フレーム / 未設定は0)
 *   - 文字の拡大率を変更します。
 *   - 完了までウェイトする機能はありません。
 *  
 *  〇 opacity o duration
 *       o        : 不透明度 (0-255で指定 / 未設定は255)
 *       duration : 時間 (フレーム / 未設定は0)
 *   - 文字の不透明度を変更します。
 *   - 完了までウェイトする機能はありません。
 *  
 *  〇 rotate r duration
 *       r        : 回転角度 (未設定は0)
 *       duration : 時間 (フレーム / 未設定は0)
 *   - 文字を指定した角度まで回転させます。
 *   - 完了までウェイトする機能はありません。
 *  
 *  〇 tone red green blue gray duration
 *       red      : 赤 (未設定は0)
 *       green    : 緑 (未設定は0)
 *       blue     : 青 (未設定は0)
 *       gray     : グレー (未設定は0)
 *       duration : 時間 (フレーム / 未設定は0)
 *   - 文字を色調に変更します。
 *   - 完了までウェイトする機能はありません。
 *  
 *  〇 frame minX minY maxX maxY duration
 *       minX     : 左端 (0-100で指定 / 未設定は0)
 *       minY     : 上端 (0-100で指定 / 未設定は0)
 *       maxX     : 右端 (0-100で指定 / 未設定は100)
 *       maxY     : 下端 (0-100で指定 / 未設定は100)
 *       duration : 時間 (フレーム / 未設定は0)
 *   - 文字の表示範囲を変更します。
 *   - 完了までウェイトする機能はありません。
 *  
 *  〇 wait duration
 *       duration : 時間 (フレーム / 未設定は演出終了まで)
 *   - 指定した時間ウェイトをかけます。
 *   - 時間を指定していない場合、実行中のコマンドが終了するまでウェイトします。
 *  
 *  〇 finish duration
 *       duration : 時間 (フレーム / 未設定は0)
 *   - 指定した時間をかけて全てのパラメータをデフォルト値に変更します。
 *   - 完了までウェイトします。
 *   - 最後に実行することを想定したコマンドです。
 *  
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 * @param \AT[1]
 * @desc 
 * @type note
 * @default "show 0 -6 0 100 100 0\nfinish 15"
 *
 * @param \AT[2]
 * @desc 
 * @type note
 * @default "show 0 0 0 0 100\nscale 75 100 6\nwait\nfinish 6"
 *
 * @param \AT[3]
 * @desc 
 * @type note
 * @default "show 1 0 0 0 0\nscale 60 60 7\nwait\nscale 100 100 7\nwait\nscale 120 120 8\nwait\nfinish 8"
 *
 * @param \AT[4]
 * @desc 
 * @type note
 * @default "show\nframe 0 0 0 100 0\nfinish 10"
 *
 * @param \AT[5]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[6]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[7]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[8]
 * @desc 
 * @type note
 * @default 
 *
 * @param \AT[9]
 * @desc 
 * @type note
 * @default 
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_MessageEX_Op2';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    
    const param_animations = [];
    for (let i = 1; i <= 9; i++) {
        const name = '\\AT\[%1\]'.format(i);
        if (parameters[name]) {
            param_animations[i] = JSON.parse(parameters[name]);
        }
    }

    //-------------------------------------------------------------------------
    // Window_Message

    Window_Message.prototype.getAnimationList = function() {
        const list = param_animations[this._animeType];
        return list ? list.split('\n') : null;
    };

})();
