//=============================================================================
// RPG Maker MZ - AutoDisplayFaceByName
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Save the position of the event.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @orderAfter GABA_NameWindowAdjustment
 * @help GABA_AutoDisplayFaceByName.js(ver1.0.0)
 *
 *  The face image is automatically displayed according to the name field of the message display.
 *
 *  It is necessary to make each face image into a separate file.
 *  Face images are excluded by "Exclude unused files" in the deployment.
 *  Finally, don"t forget to copy and paste manually.
 *
 * - Preparation of image file
 *  Please prepare a square image for one character. Displayed as 144 * 144.
 *
 * - Parameter preparation
 *  List a set of names and file names.
 *  -- Name
 *   The name of the character. Enter what you want to see in the Name window.
 *  -- File name
 *   Enter the file name you want to associate with the name, excluding the extension.
 *   ex. "jack.png", enter "jack".
 *
 * That"s it. When the name window is displayed in the message display,
 * If it is registered in the list, the face image will be displayed automatically.
 *
 * - Plugin command
  * -- Change face image
  *   Change the face image displayed in the message. Execute it in a parallel common event.
 *
 * - Use multiple face images properly with one character
 * Introduced GABA_NameWindowAdjustment.js (ver1.0.2 or later),
 * Please allow the name to be displayed by the tag in the message.
 * Switch between multiple images depending on the tag specified at that time.
 *
 * - Preparation of image file: At the end of the file name of a normal face image,
 *   Prepare one with an appropriate character string.
 *  -- Please do not use a half-width space in the file name.
 *     ex. jack.png, jackAngry.png, jackSad.png
 *     The parameter name is "JACK" and the file name is "jack".
 *     All you have to do is switch the tag specification method.
 *
 *      \tag[JACK]        -> jack.png
 *      \tag[JACK, Angry] -> jackAngry.png
 *      \tag[JACK, Sad]   -> jackSad.png
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
  *
 * @param faceDataList
 * @text Face image data list
 * @type struct<GABAFaceData>[]
 * @desc Name and image name association list.
 * @default []
 *
 * @param faceDir
 * @text Folder name to place the face image
 * @desc Please put all the face images in this folder in the img folder. Default "pictures"
 * @default pictures
 *
 * @command changeFaceImage
 * @text Change face image
 * @desc Change the face image displayed in the message. Execute it in a parallel common event.
 *
 * @arg fileName
 * @type file
 * @text Image file
 * @desc Select the face image.
 *
 */
/*~struct~GABAFaceData
 * @param characterName
 * @text Character name
 * @desc Input a character name
 *
 * @param fileName
 * @text File name
 * @desc Input a file name.(Please exclude the extension)
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 名前と顔グラフィックを関連づけて自動表示します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 * @orderAfter GABA_NameWindowAdjustment
 * @help GABA_AutoDisplayFaceByName.js(ver1.0.0)
 *
 *  メッセージ表示の名前欄に従って顔画像を自動表示します。
 *
 *  ■前知識
 *  ・キャラ1人につき顔画像を１つ用意する必要があります。
 *  ・顔画像はデプロイメントの「未使用ファイルを除外」で除外されます。
 *    最後に手動コピペを忘れずに。
 *
 * ■画像ファイルの準備
 *  正方形の画像を用意してください。144*144で表示します。
 *  ファイル名はアルファベットにしてください。
 *
 * ■パラメータの準備
 *  名前とファイル名のセットをリスト登録します。
 * ・名前
 *    キャラの名前です。名前ウィンドウに表示するものを入力します。
 * ・ファイル名
 *    名前と関連づけたいファイル名を、拡張子を除いて入力します。
 *    「taro.png」なら、「taro」と入力します。
 *
 * これで完了です。メッセージ表示で名前ウィンドウが表示される時、
 * リスト登録されていれば顔画像が自動表示されます。
 *
 * ■プラグインコマンド
 * ・顔画像を変更
 *   メッセージに表示中の顔画像を変更します。
 *   並列コモンイベントで実行してください。
 *
 * ■１キャラで複数の顔画像を使い分ける
 *  GABA_NameWindowAdjustment.js（ver1.0.2以降）を導入し、
 *  メッセージ中のタグによって名前を表示できるようにしてください。
 *  その時のタグ指定によって、複数の画像を切り替えます。
 *
 *  ○画像ファイルの用意：通常の顔画像のファイル名の末尾に、
 *    適当な文字列を付けたものを用意します。
 *     ※ファイル名に半角スペースを使わないでください。
 *    例）taro.png、taroAngry.png、taroSad.png
 *    パラメータには「太郎」「taro」を登録します。
 *
 *  名前欄に入力、または通常のタグ指定（\tag[太郎]）をすると「taro.png」が表示されます。
 *  タグ指定の際、
 *   「\tag[太郎, Angry]」とすると、「taroAngry.png」が表示されます。
 *   「\tag[太郎, Sad]」とすると、「taroSad.png」が表示されます。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param faceDataList
 * @text 顔画像データリスト
 * @type struct<GABAFaceData>[]
 * @desc 名前と画像名の関連づけリスト。
 * @default []
 *
 * @param faceDir
 * @text 顔画像を配置するフォルダ名
 * @desc 顔画像はすべて、imgフォルダの中の、このフォルダに置いてください。デフォルト「pictures」
 * @default pictures
 *
 * @command changeFaceImage
 * @text 顔画像を変更
 * @desc メッセージに表示中の顔グラフィックを変更します。並列コモンイベントで実行してください。
 *
 * @arg fileName
 * @type file
 * @text 顔画像ファイル
 * @desc 顔画像を選択してください。
 *
 */
/*~struct~GABAFaceData:ja
 * @param characterName
 * @text キャラ名
 * @desc キャラ名を入力してください。
 *
 * @param fileName
 * @text ファイル名
 * @desc ファイル名を入力してください。（拡張子は除いてください）
 *
 */

(() => {
    "use strict";
    const pluginName = "GABA_AutoDisplayFaceByName";

    // プラグインパラメーター
    const parameters = PluginManager.parameters(pluginName);
	const faceDir = "img\\" + parameters["faceDir"] + "\\";
	const faceDataList = paramConvertArray(parameters["faceDataList"]);
    const faceDataDic = convertDic(faceDataList);
    // 画像はwindowLayerに入れて表示します。
    // windowLayer内のウィンドウにはzIndexが設定されていません。
    // windowLayer内の他の画像との重なり順を変更したい時はこの値を変更してください。
    const ZINDEX = 9;

    // プラグインコマンド：顔の変更
    PluginManager.registerCommand(pluginName, "changeFaceImage", args => {
        if (args.fileName === "") {
            return;
        }
        if (SceneManager._scene._messageWindow == null
            || SceneManager._scene._messageWindow._specialFaceSprite == null) {
            return;
        }

        let str = args.fileName.replaceAll("/", "\\");
        const index = str.lastIndexOf("\\");
        const dir = str.slice(0, index + 1);
        const name = str.slice(index + 1);
        SceneManager._scene._messageWindow._specialFaceSprite.bitmap = ImageManager.loadBitmap(dir, name);
    });

    //--------------------
    // Window_Messageの変更
    //--------------------

    // プロパティ追加
    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.apply(this, arguments);
        this._faceFileName = "";
        this._specialFaceSprite = null;
    };

    // スタート時：顔画像初期化
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        if (this._specialFaceSprite) {
            this._faceFileName = "";
            this._specialFaceSprite.bitmapClear();
        }
        this.setSpecialFace();

        _Window_Message_startMessage.apply(this, arguments);
    };

    // textStateのstartXが決まる箇所
    const _Window_Message_newLineX = Window_Message.prototype.newLineX;
    Window_Message.prototype.newLineX = function(textState) {
        // 顔グラフィック分の余白
        let margin = _Window_Message_newLineX.apply(this, arguments);

        if (this.getSpecialFaceFileName() !== "") {
            const faceWidth = ImageManager.faceWidth;
            const spacing = 20;
            margin = faceWidth + spacing;
            margin = textState.rtl ? this.innerWidth - margin : margin;
        }

        return margin;
    };

    // 顔描画：スプライト表示か判定
    const _Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
    Window_Message.prototype.drawMessageFace = function() {
        if (this.getSpecialFaceFileName() !== "") {
            return;
        }

        _Window_Message_drawMessageFace.apply(this, arguments);
    };

    // アップデート：顔スプライト更新（チェック）
    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        _Window_Message_update.apply(this, arguments);

        this.setSpecialFace();
    }

    // メッセージ終了：顔スプライトをクリア
    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        this.clearSpecialFaceSprite();
        _Window_Message_terminateMessage.apply(this, arguments);
    };

    //--------------------
    // Window_Messageの関数追加
    //--------------------

    // 名前の取得
    // this._gabaTagNameはGABA_NameWindowAdjustmentにて設定される
    Window_Message.prototype.gabaGetName = function() {
        const gabaTagName = this._gabaTagName ? this._gabaTagName : "";
        if (gabaTagName !== "") {
            return gabaTagName;
        } else {
            return $gameMessage.speakerName();
        }
    }

    // 顔画像ファイル名の取得
    Window_Message.prototype.getSpecialFaceFileName = function() {
        const name = this.gabaGetName();
        if (name === "") {
            return "";
        }

        let result = "";
        const arr = name.split(",");
        result = faceDataDic[arr[0]] ? faceDataDic[arr[0]] : "";
        if (arr && arr.length == 2) {
            // 引数あり。空白除去してファイル名に連結
            result += arr[1].replace(/\s+/g, "");
        }
        return result;
    }

    // 顔スプライトの設定
    Window_Message.prototype.setSpecialFace = function() {
        if (this._specialFaceSprite) {
            this._specialFaceSprite.updateByMessageWindow();
        }

        const fileName = this.getSpecialFaceFileName();
        if (fileName === "" || fileName === this._faceFileName) {
            return;
        }

        this._faceFileName = fileName;
        if (this._specialFaceSprite) {
            this._specialFaceSprite.changeBitmap(fileName);
            this._specialFaceSprite.updateByMessageWindow();
        } else {
            // 初回作成
            this._specialFaceSprite = new Sprite_SpecialFace(this);
            SceneManager._scene._windowLayer.addChild(this._specialFaceSprite);
            SceneManager._scene._windowLayer.sortChildren();
        }
    }

    // 顔スプライトのクリア
    Window_Message.prototype.clearSpecialFaceSprite = function() {
        if (this._specialFaceSprite) {
            this._specialFaceSprite.bitmapClear();
        }
    }

    //--------------------
    // 顔スプライト
    // drawFaceを使わず、スプライト表示してみる
    //--------------------

    function Sprite_SpecialFace() {
        this.initialize(...arguments);
    }

    Sprite_SpecialFace.prototype = Object.create(Sprite.prototype);
    Sprite_SpecialFace.prototype.constructor = Sprite_SpecialFace;

    Sprite_SpecialFace.prototype.initialize = function(messageWindow) {
        Sprite.prototype.initialize.call(this);
        this._zIndex = ZINDEX;

        this._messageWindow = messageWindow;
        const fileName = messageWindow._faceFileName;
        this.loadBitmap(fileName);
        this._yAdjust = (messageWindow.innerHeight - messageWindow.itemPadding() - ImageManager.faceHeight) / 2;
        this._displaySuccess = true;
        this.updateByMessageWindow();
    };

    Sprite_SpecialFace.prototype.updateByMessageWindow = function() {
        if (this.isVisible()) {
            this.updateOpacity();
            this.updatePosition();
        }
    };

    Sprite_SpecialFace.prototype.isVisible = function() {
        if (this.bitmap && this.bitmap._image != null) {
            this.visible = true;
        } else {
            this.visible = false;
        }
        return this.visible;
    }

    Sprite_SpecialFace.prototype.bitmapClear = function() {
        this.bitmap = null;
        this._displaySuccess = false;
    }

    Sprite_SpecialFace.prototype.changeBitmap = function(fileName) {
        this.loadBitmap(fileName);
        this._displaySuccess = true;
    }

    Sprite_SpecialFace.prototype.updatePosition = function() {
        this.x = this._messageWindow.x + 20;
        this.y = this._messageWindow.y + 20 + this._yAdjust;
    };

    Sprite_SpecialFace.prototype.updateOpacity = function() {
        this.opacity = this._messageWindow.openness;
    };

    Sprite_SpecialFace.prototype.loadBitmap = function(fileName) {
        this.bitmap = ImageManager.loadBitmap(faceDir, fileName);
        if (this.bitmap) {
            this.bitmap._image.width = ImageManager.faceWidth;
            this.bitmap._image.height = ImageManager.faceHeight;
            this.bitmap.resize(ImageManager.faceWidth, ImageManager.faceHeight);
        }
    };


    // -------------------------
    // その他
    // -------------------------

    // 名前がキーのオブジェクトを作る
    function convertDic(param) {
        try {
            const dic = {};
            if (param.length === 0) {
                return dic;
            }
            for(const wData of param) {
                dic[wData.characterName] = wData.fileName;
            }
            return dic;
        }catch(e){
            console.error(pluginName +":パラメータ準備に失敗しました");
        }
	};

    // パラメータの型変換
    function paramConvert(param) {
        if (param == null) return param;
        if (param.toString().trim() === "") return param;
        if (param === "true") return true;
        if (param === "false") return false;
        if (isNaN(param)) return param;
        return Number(param);
    }

    // 配列パラメータの型変換
    function paramConvertArray(param) {
        try {
            if (param == null || param === "") {
                return param;
            }

            return JSON.parse(param, (_, value) => {
                if (typeof(value) === "object") {
                    for (let i = 0; i < value.length; i++) {
                        value[i] = paramConvertArray(value[i]);
                    }
                    return value;
                } else {
                    return paramConvert(value);
                }
		});
        } catch {
            console.log(pluginName + ":リストパラメータエラー");
            return param;
        }
    }
})();
