/*=============================================================================
 ApngPicture.js
----------------------------------------------------------------------------
 (C)2019 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
Version
2.3.1 2022/06/06 Fixed an issue where the stop switch does not function when specifying the number of frames for apng.
2.3.0 2022/02/06 Added a parameter that allows setting the frame rate per cell on the game side.
2.2.1 2021/10/09 Added an annotation to specify the order with AltMenuScreen2MZ.
2.2.0 2021/04/26 Fixed an issue introduced in 2.1.6 where GIF files were not working, along with a change in the way GIF files are specified.
2.1.6 2021/03/10 Fixed an issue where an error occurred when using apng as a system image or enemy character image, and there was no image with the same name in the picture.
2.1.5 2021/02/01 Fixed an issue where launching with apng specified for a file consisting only of numbers resulted in an error.
2.1.4 2021/01/18 Fixed an issue introduced in 2.1.3 where attempting to display non-apng pictures or enemy characters would result in an error.
2.1.3 2021/01/17 When displaying images with the cache policy set to "Yes," fixed the issue where frames are initialized upon re-display.
2.1.2 2021/01/13 Fixed an issue introduced in 2.1.1 where attempting to re-display a picture that was once erased resulted in an error.
2.1.1 2020/12/11 Fixed an issue where setting the cache policy to anything other than "Do not cache" could result in an error during deletion.
2.1.0 2020/11/11 Added a switch to stop or fully stop APNG animations.
2.0.1 2020/11/03 Fixed to correctly retrieve the height of apng images in the plugin.
2.0.0 2020/10/29 Completely revised to work with MZ.
1.6.0 2020/10/24 Added a setting to make animations stop on the last frame instead of the first when specifying the number of plays.
1.5.0 2020/10/17 Modified to allow apng conversion for side-view enemy characters. Note that the functionality is incomplete.
1.4.3 2020/03/17 Changed the source of help to the old version because the library became unusable due to version upgrade to pixi 5.0.
1.4.2 2020/03/07 Fixed an issue where repeatedly displaying and deleting non-cached apngs would cause a memory leak.
1.4.1 2020/02/23 Fixed missing descriptions for English version plugin parameters.
1.4.0 2020/02/01 Added the ability to specify the number of loops for animations.
1.3.1 2019/12/31 Fixed an issue where the loading did not complete when starting the game without registering images.
1.3.0 2019/12/31 Added the caching feature for APNG.
1.2.1 2019/12/31 Fixed an issue where gifs were not displayed in scene additional images.
1.2.0 2019/12/31 Added support for the encryption function of the RPG Maker main unit for APNG only.
1.1.0 2019/12/29 Added the ability to set the display priority of scene additional images.
1.0.0 2019/12/27 Initial release.
----------------------------------------------------------------------------
 [Blog]   : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @plugindesc ApngSupportPlugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/ApngPicture.js
 * @base PluginCommonBase
 * @base PixiApngAndGif
 * @orderAfter PluginCommonBase
 * @orderAfter PixiApngAndGif
 * @orderBefore AltMenuScreen2MZ
 * @author triacontane
 *
 * @param PictureList
 * @desc List of picture images to be handled as APNG.
 * @default []
 * @type struct<PictureApngRecord>[]
 *
 * @param EnemyList
 * @desc List of enemy images to be handled as APNG.
 * @default []
 * @type struct<EnemyApngRecord>[]
 *
 * @param SideEnemyList
 * @desc List of enemy images to be handled as APNG.
 * @default []
 * @type struct<SideEnemyApngRecord>[]
 *
 * @param SceneApngList
 * @desc This is a list of APNG to be displayed for each scene.
 * @default []
 * @type struct<SceneApngRecord>[]
 *
 * @param DefaultLoopTimes
 * @desc The number of animation loops. It stops after looping the specified number of times.
 * @default 0
 * @type number
 *
 * @param StopLastFrame
 * @desc The animation stops at the last frame, not at the beginning.
 * @default false
 * @type boolean
 *
 * @param AllStopSwitch
 * @desc All animations stop when the specified number switch is ON.
 * @default 0
 * @type switch
 *
 * @help ApngPicture.js
 *
 * Enables handling of APNGs and GIF animations.
 * You can add APNGs to pictures, enemy characters, and any scene.
 *
 * After registering the file as an APNG from the parameters,
 * you can add You just need to designate them as pictures and enemy characters,
 * just like normal images.
 *
 * The following libraries are required for use.
 * https://github.com/sbfkcel/pixi-apngAndGif
 *
 * Download
 * https://github.com/sbfkcel/pixi-apngAndGif/blob/master/dist/PixiApngAndGif.js
 *
 * Attention!
 * It is not recommended to register a large number of images to
 * load the registered images at the start of the game.
 * In addition, loading large APNG images may slow down the display.
 * If the display is slow, please try GIF animation.
 *
 * If you want to use GIFs, please note that the editor will not recognize
 * files without a GIF extension.
 * Please enter the file name with the extension directly in the parameter.
 * You can also display the picture from a script or by using
 * Please use a dummy png file of the same name to specify it.
 * Also, GIFs are not subject to the editor's encryption feature.
 *
 * This plugin is released under the MIT License.
 */
/*:en
 * @plugindesc APNG Picture Plugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/ApngPicture.js
 * @base PluginCommonBase
 * @base PixiApngAndGif
 * @orderAfter PluginCommonBase
 * @orderAfter PixiApngAndGif
 * @orderBefore AltMenuScreen2MZ
 * @author Triacontane
 *
 * @param PictureList
 * @text List of APNG Pictures
 * @desc List of pictures to be treated as APNG. If you want to specify GIFs, enter them directly.
 * @default []
 * @type struct<PictureApngRecord>[]
 *
 * @param EnemyList
 * @text List of APNG Enemies
 * @desc List of enemy character images to be treated as APNG. If you want to specify GIFs, enter them directly.
 * @default []
 * @type struct<EnemyApngRecord>[]
 *
 * @param SideEnemyList
 * @text List of SV APNG Enemies
 * @desc List of SV enemy character images to be treated as APNG. Register here if you want to use side-view images.
 * @default []
 * @type struct<SideEnemyApngRecord>[]
 *
 * @param SceneApngList
 * @text List of Scene APNGs
 * @desc List of APNGs to be displayed for each scene. If you want to specify GIFs, enter them directly.
 * @default []
 * @type struct<SceneApngRecord>[]
 *
 * @param DefaultLoopTimes
 * @text Default Loop Times
 * @desc Number of times the animation will loop. It stops after playing the specified number of times. Set to 0 for infinite animation.
 * @default 0
 * @type number
 *
 * @param StopLastFrame
 * @text Stop at Last Frame
 * @desc When playing an animation with a specified loop count, it stops at the last frame instead of the first.
 * @default false
 * @type boolean
 *
 * @param AllStopSwitch
 * @text All Stop Switch
 * @desc All animations stop when the specified switch number is ON.
 * @default 0
 * @type switch
 *
 * @param FrameCount
 * @text Frame Count per Cell
 * @desc When set, the frame count per cell can be fixed on the game side.
 * @default 0
 * @type number
 *
 * @help ApngPicture.js
 *
 * Enables handling of APNG or GIF animations. Allows adding APNGs to pictures, enemy characters, and any scene.
 *
 * Once registered as APNG in the parameters, you can specify them as pictures or enemy characters just like regular images.
 *
 * Requires the following library for use:
 * https://github.com/sbfkcel/pixi-apngAndGif
 *
 * Please check the license and download it from the following link:
 * https://github.com/sbfkcel/pixi-apngAndGif/blob/master/dist/PixiApngAndGif.js
 *
 * Note!
 * It is not recommended to register a large number of images at the start of the game to load them.
 * Also, loading large-sized APNGs may slow down the display.
 * If the display is slow, please try using GIF animations.
 *
 * If you want to use GIFs, files with the extension gif are not recognized by the editor.
 * Enter the file name without an extension directly into the parameters.
 * Also, when displaying pictures, either show them through a script or use a dummy png file with the same name.
 * Additionally, GIFs are not subject to the editor's encryption function.
 *
 * Terms of Use:
 * Modifications and redistributions are allowed without permission from the author, and there are no restrictions on usage (commercial, 18+ use, etc.).
 * This plugin is now yours.
 */

/*~struct~SceneApngRecord:en
 *
 * @param SceneName
 * @text Target Scene
 * @desc Scene to add the image to.
 * @type select
 * @default Scene_Title
 * @option Title
 * @value Scene_Title
 * @option Game Over
 * @value Scene_Gameover
 * @option Battle
 * @value Scene_Battle
 * @option Main Menu
 * @value Scene_Menu
 * @option Item
 * @value Scene_Item
 * @option Skill
 * @value Scene_Skill
 * @option Equip
 * @value Scene_Equip
 * @option Status
 * @value Scene_Status
 * @option Options
 * @value Scene_Options
 * @option Save
 * @value Scene_Save
 * @option Load
 * @value Scene_Load
 * @option Game End
 * @value Scene_End
 * @option Shop
 * @value Scene_Shop
 * @option Name Input
 * @value Scene_Name
 * @option Debug
 * @value Scene_Debug
 * @option Sound Test
 * @value Scene_SoundTest
 * @option Glossary
 * @value Scene_Glossary
 *
 * @param FileName
 * @text File Name
 * @desc File name of the APNG to be added.
 * @default
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param Gif
 * @text GIF File
 * @desc Set to ON if the target is a GIF file. Specify the file name without the extension.
 * @default false
 * @type boolean
 *
 * @param CachePolicy
 * @text Cache Policy
 * @desc Image cache policy. Caching a large amount may impact memory usage.
 * @default 0
 * @type select
 * @option Do Not Cache
 * @value 0
 * @option Cache on First Display
 * @value 1
 * @option Cache on Game Startup
 * @value 2
 *
 * @param X
 * @text X Coordinate
 * @desc X coordinate of the added APNG.
 * @default 0
 * @type number
 *
 * @param Y
 * @text Y Coordinate
 * @desc Y coordinate of the added APNG.
 * @default 0
 * @type number
 *
 * @param Origin
 * @text Origin
 * @desc Origin of the added APNG.
 * @default 0
 * @type select
 * @option Top Left
 * @value 0
 * @option Center
 * @value 1
 *
 * @param Priority
 * @text Priority
 * @desc Display priority of the image. Using the far back is not recommended for regular use as it may not be visible on the screen.
 * @default 0
 * @type select
 * @option Frontmost
 * @value 0
 * @option Below Windows
 * @value 1
 * @option Farthest Back
 * @value 2
 *
 * @param Switch
 * @text Appearance Condition Switch
 * @desc The image will only be displayed when the specified switch is ON. If not specified, it will always be displayed.
 * @default 0
 * @type switch
 *
 * @param LoopTimes
 * @text Loop Times
 * @desc Number of times the animation will loop. Set to 0 to follow the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @text Stop Switch
 * @desc Animation stops when the specified switch number is ON.
 * @default 0
 * @type switch
 */

/*~struct~PictureApngRecord:en
 *
 * @param FileName
 * @text File Name
 * @desc File name of the APNG to be added.
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param Gif
 * @text GIF File
 * @desc Set to ON if the target is a GIF file. Specify the file name without the extension.
 * @default false
 * @type boolean
 *
 * @param CachePolicy
 * @text Cache Policy
 * @desc Image cache policy. Caching a large amount may impact memory usage.
 * @default 0
 * @type select
 * @option Do Not Cache
 * @value 0
 * @option Cache on First Display
 * @value 1
 * @option Cache on Game Startup
 * @value 2
 *
 * @param LoopTimes
 * @text Loop Times
 * @desc Number of times the animation will loop. Set to 0 to follow the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @text Stop Switch
 * @desc Animation stops when the specified switch number is ON.
 * @default 0
 * @type switch
 */

/*~struct~EnemyApngRecord:en
 *
 * @param FileName
 * @text File Name
 * @desc File name of the APNG to be added.
 * @default
 * @require 1
 * @dir img/enemies/
 * @type file
 *
 * @param Gif
 * @text GIF File
 * @desc Set to ON if the target is a GIF file. Specify the file name without the extension.
 * @default false
 * @type boolean
 *
 * @param CachePolicy
 * @text Cache Policy
 * @desc Image cache policy. Caching a large amount may impact memory usage.
 * @default 0
 * @type select
 * @option Do Not Cache
 * @value 0
 * @option Cache on First Display
 * @value 1
 * @option Cache on Game Startup
 * @value 2
 *
 * @param LoopTimes
 * @text Loop Times
 * @desc Number of times the animation will loop. Set to 0 to follow the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @text Stop Switch
 * @desc Animation stops when the specified switch number is ON.
 * @default 0
 * @type switch
 */

/*~struct~SideEnemyApngRecord:en
 *
 * @param FileName
 * @text File Name
 * @desc File name of the APNG to be added.
 * @default
 * @require 1
 * @dir img/sv_enemies/
 * @type file
 *
 * @param CachePolicy
 * @text Cache Policy
 * @desc Image cache policy. Caching a large amount may impact memory usage.
 * @default 0
 * @type select
 * @option Do Not Cache
 * @value 0
 * @option Cache on First Display
 * @value 1
 * @option Cache on Game Startup
 * @value 2
 *
 * @param LoopTimes
 * @text Loop Times
 * @desc Number of times the animation will loop. Set to 0 to follow the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @text Stop Switch
 * @desc Animation stops when the specified switch number is ON.
 * @default 0
 * @type switch
 */

/*~struct~SceneApngRecord:
 *
 * @param SceneName
 * @desc Target Scene
 * @type select
 * @default Scene_Title
 * @option Scene_Title
 * @option Scene_Gameover
 * @option Scene_Battle
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_End
 * @option Scene_Shop
 * @option Scene_Name
 * @option Scene_Debug
 * @option Scene_SoundTest
 * @option Scene_Glossary
 *
 * @param FileName
 * @desc File name of apng
 * @default
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param CachePolicy
 * @desc Cache policy
 * @default 0
 * @type select
 * @option None
 * @value 0
 * @option Cache on first display
 * @value 1
 * @option Cache at game start
 * @value 2
 *
 * @param X
 * @desc X of apng
 * @default 0
 * @type number
 *
 * @param Y
 * @desc Y of apng
 * @default 0
 * @type number
 *
 * @param Origin
 * @desc Origin of apng
 * @default 0
 * @type select
 * @option Upper left
 * @value 0
 * @option Center
 * @value 1
 *
 * @param Priority
 * @desc Priority of apng
 * @default 0
 * @type select
 * @option Front
 * @value 0
 * @option Under window
 * @value 1
 * @option Back
 * @value 2
 *
 * @param Switch
 * @desc Displayed only when the specified switch is ON
 * @default 0
 * @type switch
 *
 * @param LoopTimes
 * @desc The number of animation loops. Specifying 0 follows the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @desc The animation stops when the specified number switch is turned on.
 * @default 0
 * @type switch
 */

/*~struct~PictureApngRecord:
 *
 * @param FileName
 * @desc File name of apng
 * @default
 * @require 1
 * @dir img/pictures/
 * @type file
 *
 * @param CachePolicy
 * @desc Cache policy
 * @default 0
 * @type select
 * @option None
 * @value 0
 * @option Cache on first display
 * @value 1
 * @option Cache at game start
 * @value 2
 *
 * @param LoopTimes
 * @desc The number of animation loops. Specifying 0 follows the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @desc The animation stops when the specified number switch is turned on.
 * @default 0
 * @type switch
 */

/*~struct~EnemyApngRecord:
 *
 * @param FileName
 * @desc File name of apng
 * @default
 * @require 1
 * @dir img/enemies/
 * @type file
 *
 * @param CachePolicy
 * @desc Cache policy
 * @default 0
 * @type select
 * @option None
 * @value 0
 * @option Cache on first display
 * @value 1
 * @option Cache at game start
 * @value 2
 *
 * @param LoopTimes
 * @desc The number of animation loops. Specifying 0 follows the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @desc The animation stops when the specified number switch is turned on.
 * @default 0
 * @type switch
 */

/*~struct~SideEnemyApngRecord:
 *
 * @param FileName
 * @desc File name of apng
 * @default
 * @require 1
 * @dir img/sv_enemies/
 * @type file
 *
 * @param CachePolicy
 * @desc Cache policy
 * @default 0
 * @type select
 * @option None
 * @value 0
 * @option Cache on first display
 * @value 1
 * @option Cache at game start
 * @value 2
 *
 * @param LoopTimes
 * @desc The number of animation loops. Specifying 0 follows the default setting.
 * @default 0
 * @type number
 *
 * @param StopSwitch
 * @desc The animation stops when the specified number switch is turned on.
 * @default 0
 * @type switch
 */

(function() {
    'use strict';

    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    /**
     * ApngLoader
     * Loads and retains APNG or GIF images.
     */
    class ApngLoader {
        constructor(folder, paramList) {
            this._folder = folder;
            this._fileHash = {};
            this._cachePolicy = {};
            this._options = {};
            this._paramList = paramList;
            if (this._paramList && this._paramList.length > 0) {
                this.addAllImage();
            }
            this._spriteCache = {};
        }

        addAllImage() {
            const option = this.getLoadOption();
            this._paramList.forEach(function(item) {
                this.addImage(item, option);
            }, this);
            PIXI.Loader.shared.onComplete.add(this.cacheStartup.bind(this));
            ApngLoader.startLoading();
        }

        addImage(item, option) {
            const name = String(item.FileName) || '';
            const ext = this.findExt(item);
            const path = name.match(/http:/) ? name : `img/${this._folder}/${name}.${ext}`;
            if (!this._fileHash.hasOwnProperty(name)) {
                this._fileHash[name] = ApngLoader.convertDecryptExt(path);
                this._cachePolicy[name] = item.CachePolicy;
                this._options[name] = item;
                PIXI.Loader.shared.add(path, option);
            }
        }

        findExt(item) {
            if (item.Gif) {
                return 'gif'
            } else {
                return Utils.hasEncryptedImages() ? 'png_' : 'png';
            }
        };

        getLoadOption() {
            return {
                loadType   : PIXI.LoaderResource.LOAD_TYPE.XHR,
                xhrType    : PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER,
                crossOrigin: ''
            }
        }

        createSprite(name) {
            if (!this.isApng(name)) {
                return null;
            }
            if (this._isNeedCache(name)) {
                if (this._spriteCache[name]) {
                    return this._spriteCache[name];
                }
                const sprite = this._createPixiApngAndGif(name);
                this._spriteCache[name] = sprite;
                return sprite;
            } else {
                return this._createPixiApngAndGif(name);
            }
        }

        _createPixiApngAndGif(name) {
            const pixiApng = new PixiApngAndGif(this._fileHash[name], ApngLoader._resource);
            const loopCount = this._options[name].LoopTimes || param.DefaultLoopTimes;
            if (loopCount > 0) {
                pixiApng.play(loopCount);
            }
            const sprite = pixiApng.sprite;
            sprite.pixiApng = pixiApng;
            sprite.pixiApngOption = this._options[name]
            return sprite;
        }

        _isNeedCache(name) {
            return this._cachePolicy[name] > 0;
        }

        isApng(name) {
            return !!this._fileHash[name];
        }

        cacheStartup() {
            Object.keys(this._cachePolicy).forEach(function(name) {
                if (this._cachePolicy[name] === 2) {
                    this.createSprite(name)
                }
            }, this);
        }

        static startLoading() {
            this._loading = true;
        };

        static onLoadResource(progress, resource) {
            this._resource = resource;
            Object.keys(this._resource).forEach(function(key) {
                if (this._resource[key].extension === 'png_') {
                    ApngLoader.decryptResource(key);
                }
            }, this);
        }

        static decryptResource(key) {
            const resource = this._resource[key];
            resource.data = Utils.decryptArrayBuffer(resource.data);
            const newKey = ApngLoader.convertDecryptExt(key);
            resource.name = newKey;
            resource.url = newKey;
            resource.extension = 'png';
            this._resource[newKey] = resource;
            delete this._resource[key];
        };

        static isReady() {
            return !!this._resource || !this._loading;
        }

        static convertDecryptExt(key) {
            return key.replace(/\.png_$/, '.png');
        }
    }
    ApngLoader._resource = null;

    const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function() {
        const result = _Scene_Boot_isReady.apply(this, arguments);
        if (result) {
            SceneManager.setupApngLoaderIfNeed();
        }
        return result && ApngLoader.isReady();
    };

    const _Scene_Base_create = Scene_Base.prototype.create;
    Scene_Base.prototype.create = function() {
        _Scene_Base_create.apply(this, arguments);
        this.createSceneApng();
    };

    Scene_Base.prototype.createSceneApng = function() {
        this._apngList = this.findSceneApngList().map(function(item) {
            return new SpriteSceneApng(item);
        }, this);
    };

    const _Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function() {
        _Scene_Base_terminate.apply(this, arguments);
        this.destroySceneApng();
        if (this._spriteset) {
            this._spriteset.destroyApngPicture();
        }
    };

    Scene_Base.prototype.destroySceneApng = function() {
        this._apngList.forEach(function(sprite) {
            sprite.destroyApngIfNeed();
        })
    };

    const _Scene_Base_start = Scene_Base.prototype.start;
    Scene_Base.prototype.start = function() {
        _Scene_Base_start.apply(this, arguments);
        this.setApngPriority();
    };

    Scene_Base.prototype.setApngPriority = function() {
        let windowLayerIndex = this._windowLayer ? this.getChildIndex(this._windowLayer) : 0;
        this._apngList.forEach(function(sprite) {
            switch (sprite.getPriority()) {
                case 0:
                    this.addChild(sprite);
                    break;
                case 1:
                    this.addChildAt(sprite, windowLayerIndex);
                    windowLayerIndex++;
                    break;
                default:
                    this.addChildAt(sprite, 0);
            }
        }, this);
    };

    Scene_Base.prototype.findSceneApngList = function() {
        const currentSceneName = PluginManagerEx.findClassName(this);
        return (param.SceneApngList || []).filter(function(data) {
            return data.SceneName === currentSceneName;
        }, this);
    };

    Spriteset_Base.prototype.destroyApngPicture = function() {
        this.destroyApngPictureContainer(this._pictureContainer);
        // for PicturePriorityCustomize.js
        this.destroyApngPictureContainer(this._pictureContainerLower);
        this.destroyApngPictureContainer(this._pictureContainerMiddle);
        this.destroyApngPictureContainer(this._pictureContainerUpper);
    };

    Spriteset_Base.prototype.destroyApngPictureContainer = function(container) {
        if (!container) {
            return;
        }
        container.children.forEach(function(sprite) {
            if (sprite.destroyApngIfNeed) {
                sprite.destroyApngIfNeed();
            }
        });
    };

    Spriteset_Battle.prototype.destroyApngPicture = function() {
        Spriteset_Base.prototype.destroyApngPicture.call(this);
        this._enemySprites.forEach(function(sprite) {
            sprite.destroyApngIfNeed();
        });
    };

    /**
     * SceneManager
     * Manages the loader for APNG.
     */
    SceneManager.setupApngLoaderIfNeed = function() {
        if (this._apngLoaderPicture) {
            return;
        }
        PIXI.Loader.shared.onComplete.add(ApngLoader.onLoadResource.bind(ApngLoader));
        this._apngLoaderPicture = new ApngLoader('pictures', param.PictureList);
        this._apngLoaderEnemy = new ApngLoader('enemies', param.EnemyList);
        this._apngLoaderSideEnemy = new ApngLoader('sv_enemies', param.SideEnemyList);
        this._apngLoaderSystem = new ApngLoader('system', param.SceneApngList);
        PIXI.Loader.shared.load();
    };

    SceneManager.tryLoadApngPicture = function(name) {
        return this._apngLoaderPicture.createSprite(name);
    };

    SceneManager.tryLoadApngEnemy = function(name) {
        return this._apngLoaderEnemy.createSprite(name);
    };

    SceneManager.tryLoadApngSideEnemy = function(name) {
        return this._apngLoaderSideEnemy.createSprite(name);
    };

    SceneManager.tryLoadApngSystem = function(name) {
        return this._apngLoaderSystem.createSprite(name);
    };

    /**
     * Sprite
     * Adds the loading process for APNG.
     */
    Sprite.prototype.addApngChild = function(name) {
        if (this._apngSprite) {
            this.destroyApngIfNeed();
        }
        this._apngSprite = this.loadApngSprite(name);
        if (this._apngSprite) {
            if (this.isApngCache()) {
                this._apngSprite.pixiApng.jumpToFrame(0);
                this._apngSprite.pixiApng.play();
            }
            this.addChild(this._apngSprite);
            if (!this.isGif()) {
                const original = this.loadStaticImage(name);
                original.addLoadListener(() => {
                    this.bitmap = new Bitmap(original.width, original.height);
                });
            } else {
                this.bitmap = ImageManager.loadPicture('');
            }
            this.updateApngAnchor();
            this.updateApngBlendMode();
        }
        this._apngLoopCount = 1;
        this._apngLoopFrame = 0;
    };

    Sprite.prototype.loadStaticImage = function(name) {
        return ImageManager.loadPicture(name);
    };

    Sprite.prototype.destroyApngIfNeed = function() {
        if (this._apngSprite) {
            if (!this.isApngCache()) {
                this.destroyApng();
            } else {
                this.removeApng();
            }
        }
    };

    Sprite.prototype.destroyApng = function() {
        const pixiApng = this._apngSprite.pixiApng;
        if (pixiApng) {
            pixiApng.textures.forEach(function(texture) {
                texture.baseTexture.destroy();
                texture.destroy();
            });
            pixiApng.stop();
        }
        this.removeApng();
    };

    Sprite.prototype.removeApng = function() {
        this.removeChild(this._apngSprite);
        this._apngSprite = null;
    };

    Sprite.prototype.isApngCache = function() {
        return this._apngSprite.pixiApngOption.CachePolicy !== 0;
    };

    Sprite.prototype.loadApngSprite = function() {
        return null;
    };

    Sprite.prototype.updateApngAnchor = function() {
        if (this._apngSprite) {
            this._apngSprite.anchor.x = this.anchor.x;
            this._apngSprite.anchor.y = this.anchor.y;
        }
    };

    Sprite.prototype.updateApngBlendMode = function() {
        if (this._apngSprite) {
            this._apngSprite.blendMode = this.blendMode;
        }
    };

    const _Sprite_update = Sprite.prototype.update;
    Sprite.prototype.update = function() {
        _Sprite_update.apply(this, arguments);
        if (this._apngSprite) {
            if (param.FrameCount > 0 && !this._apngSpritePause) {
                this.updateApngFrameFrame();
            }
            this.updateApngSwitchStop();
            this.updateApngFrameStop();
        }
    };

    Sprite.prototype.updateApngFrameFrame = function() {
        const frameLength = this._apngSprite.pixiApng.getFramesLength();
        const frame = Math.floor(Graphics.frameCount / param.FrameCount) % frameLength;
        this._apngSprite.pixiApng.jumpToFrame(frame);
    };

    Sprite.prototype.updateApngFrameStop = function() {
        if (!param.StopLastFrame) {
            return;
        }
        const frame = this._apngSprite.pixiApng.__status.frame;
        if (frame < this._apngLoopFrame) {
            this._apngLoopCount++;
        }
        this._apngLoopFrame = frame;
        const loopLimit = this.getLoopTimes();
        if (loopLimit <= 0) {
            return;
        }
        const frameLength = this._apngSprite.pixiApng.getFramesLength();
        if (loopLimit <= this._apngLoopCount && frameLength <= frame + 1) {
            this._apngSprite.pixiApng.stop();
        }
    };

    Sprite.prototype.updateApngSwitchStop = function() {
        if ($gameSwitches.value(this.getStopSwitch()) || $gameSwitches.value(param.AllStopSwitch)) {
            this._apngSprite.pixiApng.stop();
            this._apngSpritePause = true;
        } else if (this._apngSpritePause) {
            this._apngSprite.pixiApng.play();
            this._apngSpritePause = false;
        }
    };

    Sprite.prototype.getLoopTimes = function() {
        return this._apngSprite.pixiApngOption.LoopTimes || param.DefaultLoopTimes;
    };

    Sprite.prototype.getStopSwitch = function() {
        return this._apngSprite.pixiApngOption.StopSwitch;
    };

    Sprite.prototype.isGif = function() {
        return this._apngSprite && this._apngSprite.pixiApngOption.Gif;
    };

    /**
     * Sprite_Picture
     * Adds the loading of pictures registered as APNG.
     */
    const _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function() {
        _Sprite_Picture_loadBitmap.apply(this, arguments);
        this.addApngChild(this._pictureName);
    };

    Sprite_Picture.prototype.loadApngSprite = function(name) {
        return SceneManager.tryLoadApngPicture(name);
    };

    const _Sprite_Picture_updateOrigin = Sprite_Picture.prototype.updateOrigin;
    Sprite_Picture.prototype.updateOrigin = function() {
        _Sprite_Picture_updateOrigin.apply(this, arguments);
        this.updateApngAnchor();
    };

    const _Sprite_Picture_updateOther = Sprite_Picture.prototype.updateOther;
    Sprite_Picture.prototype.updateOther = function() {
        _Sprite_Picture_updateOther.apply(this, arguments);
        this.updateApngBlendMode();
    };

    const _Sprite_Picture_updateBitmap =Sprite_Picture.prototype.updateBitmap;
    Sprite_Picture.prototype.updateBitmap = function() {
        _Sprite_Picture_updateBitmap.apply(this, arguments);
        const picture = this.picture();
        if (!picture && this._apngSprite) {
            this.destroyApngIfNeed();
        }
    };

    /**
     * Sprite_Enemy
     * Adds the loading of enemies registered as APNG.
     */
    const _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function(name, hue) {
        _Sprite_Enemy_loadBitmap.apply(this, arguments);
        this.addApngChild(name);
    };

    Sprite_Enemy.prototype.loadApngSprite = function(name) {
        if ($gameSystem.isSideView()) {
            return SceneManager.tryLoadApngSideEnemy(name);
        } else {
            return SceneManager.tryLoadApngEnemy(name);
        }
    };

    Sprite_Enemy.prototype.loadStaticImage = function(name) {
        if ($gameSystem.isSideView()) {
            return ImageManager.loadSvEnemy(name);
        } else {
            return ImageManager.loadEnemy(name);
        }
    };

    /**
     * SpriteSceneApng
     * APNG sprite for additional display on the scene.
     */
    class SpriteSceneApng extends Sprite {
        constructor(item) {
            super();
            this.setup(item)
        }

        setup(item) {
            this.addApngChild(item.FileName);
            this.x = item.X;
            this.y = item.Y;
            if (item.Origin === 1) {
                this.anchor.x = 0.5;
                this.anchor.y = 0.5;
            }
            this._switch = item.Switch;
            this._priority = item.Priority;
        }

        loadApngSprite(name) {
            return SceneManager.tryLoadApngSystem(name.replace(/\..*/, ''));
        }

        update() {
            super.update();
            this.visible = this.isValid();
        }

        isValid() {
            return !this._switch || $gameSwitches.value(this._switch);
        }

        getPriority() {
            return this._priority;
        }

        loadStaticImage(name) {
            return ImageManager.loadSystem(name);
        }
    }
})();
