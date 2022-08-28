/*=============================================================================
 AnimationMv.js
----------------------------------------------------------------------------
 (C)2020 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version.
 1.2.3 2021/02/14 Added sound effects to the parameters in the list of materials used.
 1.2.2 30/11/2020 English help was added.
 1.2.1 2020/11/07 Fixed an error when you don't specify a project for copying by 1.2.0.
 1.2.0 2020/10/16 Changed copying process to asynchronous processing; automatic migration from MV projects is now faster.
                  Fixed a bug that the animation displayed in the upper left corner of the screen when using VisuMZ_1_BattleCore.js instead of the animation displayed in the entire screen.
 1.1.1 29/08/2020 Fixed an error in browser execution in 1.1.0
 1.1.0 2020/08/16 Added the ability to automatically copy necessary files just by specifying the MV project.
 1.0.0 2020/06/15 First version
----------------------------------------------------------------------------
 [Blog] : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc MV Animation Plugin
 * @author Triacontane
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AnimationMv.js
 *
 * @param AnimationList
 * @text Animation List
 * @desc The list of the animation material to be used. Registering it will exclude it from the "Exclude unused files" option.
 * @default []
 * @dir img/animations/
 * @type file[].
 *
 * @param SeList
 * @text SE List
 * @desc The list of the SE material to be used. Registering it will exclude it from the "Exclude unused files" option.
 * @default []
 * @dir audio/se/
 * @type file[].
 *
 * @param MvProjectPathText
 * @text The absolute path of the MV project.
 * If you leave it empty, auto-copying will be disabled.
 * @default
 * @param
 * @param NoCopyImageFile
 * @text Images do not copy
 * Useful if the copying is taking a long time.
 * @default false
 * @type boolean
 *
 * @help AnimationMv.js
 * It can be used in conjunction with the new MZ playback method with the MV animation playback method.
 *
 * Editing the animation data in the editor of RPGMaker MV
 * Editing the animation data in the editor of RPGMaker MV * * Specify the path to your MV project from the parameter.
 * During test play, the images under "img/animations" and "data/Animations.json"
 * During test play, the images under "img/animations" and "data/Animations.json" * will be stored in it will be copied automatically into your MZ project.
 * "Animations.json" will be copied to "mv/Animations.json".
 * "mv/Animations.json".
 * Particle Effects, Sound Effects, and Flash in the MZ database.
 * If it is created with everything empty (i.e., newly created), it will play the animation of the MV.
 *
 * This plugin uses the global variable "$dataMvAnimations".
 *
 * User Agreement:
 * You may alter or redistribute the plugin without permission.
 There are no restrictions on usage format * (such as adult- or commercial-use only).
 There are no restrictions on usage format * (such as adult- or commercial-use only).
 */

/*:ja
 * @target MZ
 * @plugindesc MV animation plugin
 * @author Triacontan
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AnimationMv.js
 *
 * @param AnimationList
 * @text AnimationList
 * @desc A list of animation materials to be used. If you register it, it will be excluded from unused material deletion.
 * @default [].
 * @dir img/animations/
 * @type file[].
 *
 * @param SeList
 * @text List of sound effects.
 * @desc List of sound effects to be used. If you register it, it will be removed from the list of unused sound effects.
 * @default [].
 * @dir audio/se/
 * @type file[].
 *
 * @param MvProjectPathText
 * @text Absolute path of MV project.
 * @desc The path of the MV project where the animation is edited. If it is empty, auto-copy is disabled.
 * @default
 *
 * @param NoCopyImageFile
 * @text Do not copy the image.
 * @desc Stop auto-copying animation image files. This is useful if copying takes a long time.
 * @default false
 * @type boolean
 *
 * @help AnimationMv.js
 * Can be used in conjunction with RPG Tskool MV's animation playback method and the new MZ playback method.
 * @help
 * Edit the animation data in the RPG Toolkool MV editor and specify the path to the MV project from the
 * Specify the MV project path from the parameter.
 * When you test play, images under "img/animations" and "data/Animations.json" will be
 * MZ project automatically.
 * Animations.json" will be copied to "mv/Animations.json".
 * "Animations.json" is automatically copied to MZ project.
 * Copy "Particle Effects", "Sound Effects", and "Flash" in the MZ database to the MZ project.
 * If you create a database with "Particle Effects", "Sound Effects", and "Flash" all empty (newly created state), the MV animation will be played back.
 *
 * This plugin uses the global variable "$dataMvAnimations".
 *
 * Terms of use: *
 * * You can modify and redistribute it without permission of the author, and there are no restrictions on the form of use (commercial, 18 prohibited use, etc.).
 * * You can modify and redistribute this plugin without permission of the author.
 * This plugin is now yours.
 */

(() => {
    'use strict';
    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    const variableName = '$dataMvAnimations';
    const variableSrc = 'mv/Animations.json';

    /**
     * MvFileCopyUtil.
     * Utility class for copying files from an MV project.
     */
    class MvFileCopyUtil {
        static async copyMvAnimationData() {
            if (!this.isAnyTest() || !param.MvProjectPathText) {
                DataManager.loadDataFile(variableName, variableSrc);
                return false;
            }
            await this.copyAllFiles('data/', 'data/mv/', /Animations.json/);
            DataManager.loadDataFile(variableName, variableSrc);
            if (!param.NoCopyImageFile) {
                await this.copyAllFiles('img/animations/', 'img/animations/');
            }
            return true;
        }

        static fileDirectoryPath(directory) {
            const path = require('path');
            const base = path.dirname(process.mainModule.filename);
            return path.join(base, `${directory}/`);
        }

        static async copyAllFiles(src, dist, regExp) {
            const srcPath = require('path').join(param.MvProjectPathText, src);
            const destPath = this.fileDirectoryPath(dist);
            const copyModel = new FileCopyModel(srcPath, destPath);
            await copyModel.copyAllFiles(regExp);
        }

        static isAnyTest() {
            return Utils.isNwjs() &&
                (Utils.isOptionValid('test') || DataManager.isBattleTest() || DataManager.isEventTest());
        }
    }

    /**
     * FileCopyModel.
     * Implement recursive asynchronous file copy.
     */
    class FileCopyModel {
        constructor(src, dist) {
            this._fs = require('fs').promises;
            this._src = src;
            this._dist = dist;
        }

        async copyAllFiles(fileReqExp = null) {
            await this._fs.mkdir(this._dist, {recursive: true});
            const dirents = await this._fs.readdir(this._src, {withFileTypes: true});
            for (const dirent of dirents) {
                const name = dirent.name;
                if (fileReqExp && !fileReqExp.test(name)) {
                    continue;
                }
                if (dirent.isDirectory()) {
                    await this._copyDirectory(name + '/');
                } else {
                    await this._copyFile(name);
                }
            }
        }

        async _copyDirectory(dirName) {
            const path = require('path');
            const src = path.join(this._src, dirName);
            const dist = path.join(this._dist, dirName);
            await this._fs.mkdir(dist, {recursive: true});
            const subCopyModel = new FileCopyModel(src, dist);
            await subCopyModel.copyAllFiles();
        }

        async _copyFile(fileName) {
            const src = this._src + fileName;
            const dist = this._dist + fileName;
            await this._fs.copyFile(src, dist);
        }
    }

    const _DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function() {
        this.loadAnimationData();
        _DataManager_loadDatabase.apply(this, arguments);
    };

    DataManager.loadAnimationData = function() {
        MvFileCopyUtil.copyMvAnimationData().then(result => {
            if (result) {
                console.log('Animation file copy complete.');
            }
        }).catch(error => {
            if (error.code === 'ENOENT') {
                PluginManagerEx.throwError(`Invalid MV Project Path :${param.MvProjectPathText}`, script);
            } else {
                throwError;
            }
        });
    };

    const _Spriteset_Base_createAnimation = Spriteset_Base.prototype.createAnimation;
    Spriteset_Base.prototype.createAnimation = function(request) {
        const mzAnimations = $dataAnimations;
        if (isEmptyAnimation($dataAnimations[request.animationId])) {
            $dataAnimations = window[variableName];
        }
        _Spriteset_Base_createAnimation.apply(this, arguments);
        $dataAnimations = mzAnimations;
    }

    function isEmptyAnimation(animation) {
        return animation && !
            !animation.effectName &&
            animation.flashTimings.length === 0 &&
            animation.soundTimings.length === 0;
    }

    const _Sprite_AnimationMV_updatePosition = Sprite_AnimationMV.prototype.updatePosition;
    Sprite_AnimationMV.prototype.updatePosition = function() {
        _Sprite_AnimationMV_updatePosition.apply(this, arguments);
        if (this._animation.position === 3) {
            this.x = Graphics.boxWidth / 2;
            this.y = Graphics.boxHeight / 2;
        }
    }
})();
