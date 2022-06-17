//=============================================================================
// Plugin_Name : Settings GameOver Files
// File_Name   : RX_T_SettingsGameOverFiles.js
// Version     : 1.0.0
// Copylight   : 2021 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc It is possible to set the image, ME, and BGM to be displayed when the game over in the game event settings.
 * @author TYPE74RX-T
 * @url https://w.atwiki.jp/type74rx-t/pages/221.html
 *
 * @command GameOverFiles
 * @text Setting game over file
 * @desc Set/modify files related to game over.
 *
 * @arg gameOverPics
 * @text Image file
 * @desc The image file you want to call.
 * @type file
 *
 * @arg gameOverMe
 * @text ME file
 * @desc The ME file you want to call.
 * @type file
 * @default audio/me
 *
 *      @arg gameOverMeVolume
 *      @text ME Volume
 *      @desc The volume of ME.
 *      @type number
 *      @default 90
        @min 0
        @max 100
 *
 *      @arg gameOverMePitch
 *      @text ME Pitch
 *      @desc The pitch of ME.
        The unit is "%".
 *      @type number
 *      @default 100
 *
 *      @arg gameOverMePan
 *      @text ME Pan
 *      @desc The pan of ME.
 *      @type number
 *      @default 0
        @min -100
        @max 100
 *
 * @arg gameOverBgm
 * @text BGM file
 * @desc The BGM file you want to play. If BGM and ME are
 * set at the same time, BGM will take priority.
 * @type file
 * @default audio/bgm
 *
 *      @arg gameOverBgmVolume
 *      @text BGM volume
 *      @desc The volume of BGM.
 *      @type number
 *      @default 90
 *
 *      @arg gameOverBgmPitch
 *      @text BGM Pitch
 *      @desc The pitch of BGM.
        The unit is "%".
 *      @type number
 *      @min 50
 *      @max 150
 *      @default 100
 *
 *      @arg gameOverBgmPan
 *      @text BGM pan
 *      @desc The pan of BGM.
 *      @type number
 *      @min -100
 *      @max 100
 *      @default 0
 *
 * @arg default
 * @text Return to default
 * @desc Reset the settings to default.
 * @type boolean
 * @default false
 *
 * @help Settings GameOver Files
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * ◆Summary
 * It is possible to set the image, ME, and BGM to be displayed when the
 * game over in the game event settings.
 * 
 * ◆Plugin Command for MZ
 * Plugin File: RX_T_SettingsGameOverFiles
 *
 * ★Image File
 * Specifies the image to be displayed when the game over.
 *
 * ★ME File
 * Specifies the ME to be played when the game over.
 * 
 * ★ME Volume
 * Specifies the volume of the ME specified in the ME file.
 * The setting range is 0 to 100.
 *
 * ★ME Pitch
 * Specifies the pitch of the ME specified in the ME file.
 * The setting range is 50 to 100, and the unit is "%".
 * 
 * ★ME Pan
 * Specifies the pan of the ME specified in the ME file.
 * The setting range is -100 to 100.
 *
 * ★BGM File
 * Specifies the BGM to be played when the game over.
 * 
 * ★BGM Volume
 * Specifies the volume of the BGM specified in the BGM file.
 * The setting range is 0 to 100.
 *
 * ★BGM Pitch
 * Specifies the pitch of the BGM specified in the BGM file.
 * The setting range is 50 to 100, and the unit is "%".
 * 
 * ★BGM Pan
 * Specifies the pan of the ME specified in the ME file.
 * The setting range is -100 to 100.
 *
 * ★Return to default
 * Return the settings to default.
 * Please set it to "ON" when setting.
 * It will return to the ME set in the database and the image set as the
 * game over image from the beginning.
 * 
 * These settings will remain in effect until they are set again.
 *
 * ◆Plugin Command for MV
 * You can set the image, ME, and BGM.
 * An example of how to set is shown below.
 * If BGM and ME are set at the same time, the last setting will take
 * priority.
 *
 * ★Image File
 * Example: If you want to call an image called Gates in the titles1 folder
 *
 * GameOverPics titles1/Gates
 *
 * ★ME Settings
 * [Caution]This setting will initialize the BGM settings that were set
 * in the plugin command.
 * 
 * Example: If you want to set ME to "Mystery"
 *
 * GameOverMe Mystery
 *
 * You can also set the volume, pitch, and pan.
 * Example: To set volume to 70, pitch to 75, pan to 20
 *
 * GameOverMe Mystery,vl70pt75pn20
 *
 * And you can also set only the ones you want to change among volume, pitch,
 * and pan.
 * Example: To set pitch only
 *
 * GameOverMe Mystery,pt110
 *
 * The setting values are just an example.
 * In this case, the volume and pan are not set, so these values will be set to
 * their default values.
 *
 * ★BGM Settings
 * 
 * Example: If you want to set ME to "Mystery"
 *
 * GameOverBgm Dungeon1
 *
 * You can also set the volume, pitch, and pan.
 * Example: To set volume to 85, pitch to 90, pan to -10
 *
 * GameOverBgm Dungeon1,vl85pt90pn-10
 *
 * And you can also set only the ones you want to change among volume, pitch,
 * and pan.
 * Example: To set pan only
 *
 * GameOverMe Mystery,pn-100
 *
 * The setting values are just an example.
 * In this case, the volume and pan are not set, so these values will be set to
 * their default values.
 *
 * ★Return to default
 * Setting as follows will initialize all set values and return to default.
 * It will return to the ME set in the database and the image set as the
 * game over image from the beginning.
 *
 * GameOverDefault
 *
 * These settings will remain in effect until they are set again.
 *
 * ◆License
 * [CAUTION!]This plugin is not released under MIT license.
 * However, you can use it as usual if you observe the following two items.
 * 1.Do not distribute or sell the plug-in itself without permission from
 *   the plug-in author, and do not link directly to the plug-in.
 * 2.If you would like to publish a version of this plugin that has been
 *   partially reworked for additional functionality or other reasons,
 *   please contact the plugin author.
*/
/*:ja
 * @target MV MZ
 * @plugindesc ゲームオーバー時に表示する画像やME、BGMをイベントで設定できます。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @command GameOverFiles
 * @text ゲームオーバーファイルの設定
 * @desc ゲームオーバーに関するファイルを設定／変更します。
 *
 * @arg gameOverPics
 * @text 画像ファイル
 * @desc 呼び出したい画像ファイルです。
 * @type file
 *
 * @arg gameOverMe
 * @text MEファイル
 * @desc 再生したいMEファイルです。
 * @type file
 * @default audio/me
 *
 *      @arg gameOverMeVolume
 *      @text ME音量
 *      @desc MEの音量です。
 *      @type number
 *      @default 90
 *
 *      @arg gameOverMePitch
 *      @text MEピッチ
 *      @desc MEのピッチです。（単位：％）
 *      @type number
 *      @min 50
 *      @max 150
 *      @default 100
 *
 *      @arg gameOverMePan
 *      @text ME位相
 *      @desc MEの位相です。
 *      @type number
 *      @min -100
 *      @max 100
 *      @default 0
 *
 * @arg gameOverBgm
 * @text BGMファイル
 * @desc 再生したいBGMファイルです.
 * BGMとMEを同時に設定した場合はBGMが優先されます。
 * @type file
 * @default audio/bgm
 *
 *      @arg gameOverBgmVolume
 *      @text BGM音量
 *      @desc BGMの音量です。
 *      @type number
 *      @default 90
 *
 *      @arg gameOverBgmPitch
 *      @text BGMピッチ
 *      @desc BGMのピッチです。（単位：％）
 *      @type number
 *      @min 50
 *      @max 150
 *      @default 100
 *
 *      @arg gameOverBgmPan
 *      @text BGM位相
 *      @desc BGMの位相です。
 *      @type number
 *      @min -100
 *      @max 100
 *      @default 0
 *
 * @arg default
 * @text デフォルトに戻す
 * @desc 設定をデフォルトに戻します。
 * @type boolean
 * @default false
 *
 * @help ゲームオーバーファイルの設定
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * ◆概要
 * ゲームオーバー時に表示する画像やME、BGMをイベントで設定することができます。
 *
 * ◆プラグインコマンド（MZ版）
 * プラグインファイル：RX_T_SettingsGameOverFiles
 * 
 * ★画像ファイル
 * ゲームオーバー時に表示する画像を指定します。
 *
 * ★MEファイル
 * ゲームオーバー時に流すMEを指定します。
 * 
 * ★ME音量
 * MEファイルで指定したMEの音量を指定します。
 * 設定範囲は 0～100 です。
 * 
 * ★MEピッチ
 * MEファイルで指定したMEのピッチを指定します。
 * 設定範囲は 50～100 単位は「%」です。
 * 
 * ★ME位相
 * MEファイルで指定したMEの位相を指定します。
 * 設定範囲は -100～100 です。
 * 
 * ★BGMファイル
 * ゲームオーバー時に流すBGMを指定します。
 * BGMとMEを同時に設定した場合はBGMが優先されます。
 * 
 * ★BGM音量
 * BGMファイルで指定したBGMの音量を指定します。
 * 
 * ★BGMピッチ
 * BGMファイルで指定したBGMのピッチを指定します。
 * 設定範囲は 50～100 単位は「%」です。
 * 
 * ★BGM位相
 * BGMファイルで指定したBGMの位相を指定します。
 * 設定範囲は -100～100 です。
 * 
 * ★デフォルトに戻す
 * 設定をデフォルトに戻します。
 * 設定の際は「ON」に設定してください。
 * データベースに設定されたMEや初めからゲームオーバー画像として
 * 設定された画像に戻ります。
 *
 * これらの設定は再度設定されるまで有効です。
 * 
 * ◆プラグインコマンド（MV版）
 * 画像、ME、BGMを設定できます。設定方法を下記に例示します。
 * BGMとMEを同時に設定した場合、最後に設定したものが
 * 優先されます。
 * 
 * ★画像ファイル
 * 例：titles1フォルダ内のGatesという画像を呼び出したい場合
 *
 * GameOverPics titles1/Gates
 *
 * ★ME設定
 * この設定を行うとプラグインコマンドで設定していた
 * BGMの設定は初期化されます。
 * 例：MEをMysteryに設定したい場合
 *
 * GameOverMe Mystery
 *
 * 音量、ピッチ、位相を設定することもできます。
 * 例：音量70、ピッチ75、位相20に設定する場合
 *
 * GameOverMe Mystery,vl70pt75pn20
 *
 * 音量、ピッチ、位相は変更したいもののみ設定することもできます。
 * 例：ピッチのみ設定する場合
 *
 * GameOverMe Mystery,pt75
 *
 * この場合、音量と位相は設定されていないため
 * これらの値はデフォルト値に設定されます。
 *
 * ★BGM設定
 * 例：BGMをDungeon1に設定したい場合
 *
 * GameOverBgm Dungeon1
 *
 * 音量、ピッチ、位相を設定することもできます。
 * 例：音量85、ピッチ90、位相-10に設定する場合
 *
 * GameOverBgm Dungeon1,vl85pt90pn-10
 *
 * 音量、ピッチ、位相は変更したいもののみ設定することもできます。
 * 例：位相のみ設定する場合
 *
 * GameOverBgm Dungeon1,pn-100
 *
 * この場合、音量とピッチは設定されていないため
 * これらの値はデフォルト値に設定されます。
 *
 * ★デフォルトに戻す
 * 以下のように設定すると、設定された値は全て初期化され
 * デフォルトに戻ります。
 * データベースに設定されたMEや初めからゲームオーバー画像として
 * 設定された画像に戻ります。
 *
 * GameOverDefault
 *
 * これらの設定は再度設定されるまで有効です。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスではありません。
 * 下記の2項目を遵守すれば普段通りにお使い頂けます。
 * 1.プラグイン単体をプラグイン作者に無断で配布、販売、プラグインへの
 *   直リンクはご遠慮ください。
 * 2.このプラグインを改造したものを公開したい場合は
 *   プラグイン作者にご相談ください。
*/
(() => {
    'use strict';
    //RX-T original process
    class RX_T {
        static gameOverAudio(paramstr, paramtag){
            const regExp = /-?[0-9]+/g;
            const deflt = {'vl' : 90, 'pt' : 100, 'pn' : 0};
            return paramstr.indexOf(paramtag) > -1 ? parseInt(paramstr.slice(paramstr.indexOf(paramtag), paramstr.length).match(regExp)) : deflt[paramtag];
        }
    };

    if (PluginManager._commands !== undefined) {
        // PluginManager
        PluginManager.registerCommand(document.currentScript.src.match(/^.*\/(.*).js$/)[1], "GameOverFiles", args => {
            const rx_gameOverName = args.gameOverPics;
            const rx_gameOverMe = args.gameOverMe.split('/');
            const rx_gameOverBgm = args.gameOverBgm.split('/');
            const rx_defaultGameOver = args.default === 'true' ? true : false;
            $gamePlayer._rx_gameOverName = rx_gameOverName.split('/');
            $gamePlayer._rx_gameOverMe = {name: rx_gameOverMe[2], pan: parseInt(args.gameOverMePan), pitch: parseInt(args.gameOverMePitch), volume: parseInt(args.gameOverMeVolume)};
            $gamePlayer._rx_gameOverBgm = {name: rx_gameOverBgm[2], pan: parseInt(args.gameOverBgmPan), pitch: parseInt(args.gameOverBgmPitch), volume: parseInt(args.gameOverBgmVolume)};
            if (rx_defaultGameOver) $gamePlayer._rx_gameOverName = $gamePlayer._rx_gameOverMe = $gamePlayer._rx_gameOverBgm = undefined;
        });

        // ImageManager
        const rx_t_imlb210207_loadBitmapMZ = ImageManager.loadBitmap;
        ImageManager.loadBitmap = function(folder, filename) {
            if (filename) {
                if (filename === 'GameOver' && $gamePlayer._rx_gameOverName) {
                    const rx_gonPath = `${$gamePlayer._rx_gameOverName[0]}/${$gamePlayer._rx_gameOverName[1]}/${Utils.encodeURI($gamePlayer._rx_gameOverName[2])}.png`;
                    return this.loadBitmapFromUrl(rx_gonPath);
                }
            }
            return rx_t_imlb210207_loadBitmapMZ.call(this, folder, filename);
        };

    } else {
        const rx_t_gipc210211_pluginCommand = Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            rx_t_gipc210211_pluginCommand.call(this, command, args);
            const rx_ganeOverName = args;
            if (command === 'GameOverPics') {
                const rx_go_filename = args[0].split('/');
                $gamePlayer._rx_gameOverPicName = rx_go_filename[1];
                $gamePlayer._rx_gameOverFolder = `img/${rx_go_filename[0]}/`;
            }
            if (command === 'GameOverMe' || command === 'GameOverBgm') {
                const rx_go_audioName = args[0].split(',')[0];
                const rx_vol = RX_T.gameOverAudio(args[0], 'vl');
                const rx_pitch = RX_T.gameOverAudio(args[0], 'pt');
                const rx_pan = RX_T.gameOverAudio(args[0], 'pn');
                if (command === 'GameOverMe') {
                    $gamePlayer._rx_gameOverMe = {name: rx_go_audioName, pan: rx_pan, pitch: rx_pitch, volume: rx_vol};
                    $gamePlayer._rx_gameOverBgm = undefined;
                }
                if (command === 'GameOverBgm') $gamePlayer._rx_gameOverBgm = {name: rx_go_audioName, pan: rx_pan, pitch: rx_pitch, volume: rx_vol};
            }
            if (command === 'GameOverDefault') $gamePlayer._rx_gameOverPicName = $gamePlayer._rx_gameOverFolder = $gamePlayer._rx_gameOverMe = $gamePlayer._rx_gameOverBgm = undefined;
        };

        // ImageManager
        const rx_t_imls210211_loadSystem = ImageManager.loadSystem;
        ImageManager.loadSystem = function(filename, hue) {
            if (filename === 'GameOver' && $gamePlayer._rx_gameOverPicName) return this.loadBitmap($gamePlayer._rx_gameOverFolder, $gamePlayer._rx_gameOverPicName, hue, false);
            return rx_t_imls210211_loadSystem.call(this, filename, hue);
        };
    }

    // Scene_Gameover
    const rx_t_sgopgm210207_playGameoverMusic = Scene_Gameover.prototype.playGameoverMusic;
    Scene_Gameover.prototype.playGameoverMusic = function() {
        rx_t_sgopgm210207_playGameoverMusic.call(this);
        if ($gamePlayer._rx_gameOverMe !== undefined) {
            AudioManager.stopMe();
            if ($gamePlayer._rx_gameOverMe.name) AudioManager.playMe($gamePlayer._rx_gameOverMe);
        }
        if ($gamePlayer._rx_gameOverBgm !== undefined) {
            if ($gamePlayer._rx_gameOverBgm.name) AudioManager.stopMe(); AudioManager.playBgm($gamePlayer._rx_gameOverBgm);
        }
    };

})();