/*:
 * @target MZ
 * @plugindesc 歩行画像合成プラグイン
 * @author GrayOgre
 * @url https://grayogre.info/rmmz/plugin/index.html
 * @help
 * 
 * このプラグインは歩行グラフィックの合成を行います。
 * 
 * このプラグインは以下のプラグインコマンドで構成されます。
 * (1) 合成
 *   複数の歩行グラフィックを合成します。
 *   合成は最初に指定されたグラフィックに上書きする形で合成されます。
 *   ファイル名には変数置換(\V[変数番号])が使えます。
 *   合成データのファイル名はリストの最初のファイル名になります。
 *   (ツクール本体では存在しない画像を指定できないため)
 *   合成データの１番目のデータを使い回す場合は、
 *   空のデータを用意してそれに合成するようにしてください。
 * 
 * 制約事項：
 * ・１つのベース画像ファイル（最初に指定する画像ファイル）に対して
 * 　複数組の合成はできません。
 * 　(file1.pngの0番目のグラフィックと1番目のグラフィックそれぞれに画像を
 * 　合成するなど)
 * ・セーブデータ一覧には合成状態が正しく反映されない場合があります。
 * 
 * このプラグインを使用するためには、
 * あらかじめ公式プラグイン PluginCommonBase.js を組み込んでおく必要があります。
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 * Version 1.0.1
 * 
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * 
 * @command merge
 *   @text 合成
 *   @desc グラフィックの合成を行う
 *   @arg list
 *     @text グラフィック一覧
 *     @desc 合成するグラフィックの一覧
 *     @type struct<graphInfo>[]
 */
/*~struct~graphInfo:
 * @param filename
 *   @text 画像ファイル名
 *   @desc 合成するグラフィックのファイル名
 *   @type file
 *   @dir img/characters
 * @param index
 *   @text グラフィックインデックス
 *   @desc 合成するグラフィックの画像内の順序位置
 *   @type number
*/

(() => {
    'use strict';

    const BASE_DIR = 'img/characters/';
    const EXT = '.png';

    let mergeInfoHash = null;
    let mergedCharacters = null;

    // プラグインコマンド：合成
    PluginManagerEx.registerCommand(document.currentScript, "merge", args => {
        if (args.list.length <= 0) {
            return;
        }
        const list = args.list;
        for (let i = 0; i < list.length; i++) {
            list[i].filename = list[i].filename.replace(/\\V\[(\d+)\]/g,(a,b) => $gameVariables.value(Number(b)));
        }
        const mergeInfo = list;
        gog_mergeCharacter(mergeInfo);
        mergeInfoHash[mergeInfo[0].filename] = mergeInfo;
    });

    // セーブヘッダ情報の画像読み込み
    const _dataManager_loadSavefileImages = DataManager.loadSavefileImages;
    DataManager.loadSavefileImages = function(info) {
        if(info.gog_mergeInfoHash) {
            const mergeInfoHash_save = info.gog_mergeInfoHash;
            for (let key in mergeInfoHash_save) {
                gog_mergeCharacter(mergeInfoHash[key]);
            }
        }
        _dataManager_loadSavefileImages.call(this, info);
    };

    // セーブヘッダ情報作成
    const _dataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function(){
        const info = _dataManager_makeSavefileInfo.call(this);
        info.gog_mergeInfoHash = mergeInfoHash;
        return info;
    };

    // データ初期化
    const _dataManager_createDataObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = (() => {
        _dataManager_createDataObjects.call(this);
        mergeInfoHash = {};
        mergedCharacters = {};
    });

    // セーブデータ本体作成
    const _dataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = (() => {
        const contents = _dataManager_makeSaveContents.call(this);
        contents.gog_mergeInfoHash = mergeInfoHash;
        return contents;
    });

    // セーブデータ本体読み込み
    const _dataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = ((contents) => {
        _dataManager_extractSaveContents.call(this, contents);
        mergeInfoHash = contents.gog_mergeInfoHash;
        for (let key in mergeInfoHash) {
            gog_mergeCharacter(mergeInfoHash[key]);
        }
    });


    // URL作成
    function gog_make_url(filename) {
        return BASE_DIR + filename + EXT;
    }

    // キャラクター画像読み込み
    const _imageManager_loadCharacter = ImageManager.loadCharacter;
    ImageManager.loadCharacter = function(filename) {
        if (mergedCharacters[filename]) {
            return mergedCharacters[filename]; 
        } else if (mergeInfoHash[filename]) {
            gog_mergeCharacter(mergeInfoHash[filename]);
            if (mergedCharacters[filename]) {
                return mergedCharacters[filename];
            }
        }
        return _imageManager_loadCharacter.call(this, filename);
    }

    // ウィンドウのキャラクター表示処理
    const _window_base_drawCharacter = Window_Base.prototype.drawCharacter;
    Window_Base.prototype.drawCharacter = function(characterName, characterIndex, x, y) {
        if (mergeInfoHash[characterName] && !mergedCharacters[characterName]) {
            gog_mergeCharacter(mergeInfoHash[characterName]);
        }
        _window_base_drawCharacter.call(this, characterName, characterIndex, x, y);
    };

    // キャラクタ画像のロード＆マージ
    function gog_mergeCharacter(mergeInfo) {
        if (!mergeInfo) {
            return;
        }
        const basename = mergeInfo[0].filename;
        const promises = [];
        for (let info of mergeInfo) {
            promises.push(gog_loadCharacter(info.filename));
        }
        Promise.all(promises).then((bitmaps) => {
            if (mergedCharacters[basename]) {
                mergedCharacters[basename].clear();
            }
            mergedCharacters[basename] = gog_mergeBitmap(bitmaps, mergeInfo);
            gog_updateCharacterSprites();
        });
    }

    // キャラクタ画像のロード
    function gog_loadCharacter(filename) {
        return new Promise((resolve, reject) => {
            const bmp = Bitmap.load(gog_make_url(filename));
            bmp.addLoadListener(() => resolve(bmp));
        });
    } 

    // スプライトの再表示
    function gog_updateCharacterSprites()
    {
        if (SceneManager._scene._spriteset) {
            if (SceneManager._scene._spriteset._characterSprites) {
                const charaSprites = SceneManager._scene._spriteset._characterSprites;
                for (let sprite of charaSprites) {
                    sprite.setCharacterBitmap();
                }
            }
        }
    }

    // ビットマップ合成
    function gog_mergeBitmap(bitmaps, mergeInfo) {
        const baseBitmap = bitmaps[0];
        const baseName = mergeInfo[0].filename;
        const baseIndex = Number(mergeInfo[0].index);
        let width = baseBitmap.width;
        let height = baseBitmap.height;
        let base_x = 0;
        let base_y = 0;
        if (!ImageManager.isBigCharacter(baseName)) {
            width = baseBitmap.width / 4;
            height = baseBitmap.height / 2;
            base_x = (baseIndex % 4) * width;
            base_y = Math.floor(baseIndex / 4) * height;
        }
        for (let i = 1; i < mergeInfo.length; i++) {
            let x = 0;
            let y = 0;
            if (!ImageManager.isBigCharacter(mergeInfo[i].filename)) {
                const index = Number(mergeInfo[i].index);
                x = (index % 4) * width;
                y = Math.floor(index / 4) * height;
            }
            baseBitmap.blt(bitmaps[i], x, y, width, height, base_x, base_y);
        }
        return baseBitmap;
    }

})();