//=============================================================================
// RPG Maker MZ - Speaker Name By Tag
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Display the name with the tag in the message.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_SpeakerNameByTag.js(ver1.0.1)
 *
 * Display the name with the tag in the message.
 *
 * If the tag is specified many times in one conversation, it will be renamed each time.
 *
 * Tags can be specified by parameters.
 * case is ignored.
 *
 * ex) Conversational sentence when the name tag is "name"
 * \name[JACK]My name is Jack.
 * \Name[JACK]My name is Jack.
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param nameTag
 * @text nameTag
 * @desc If there is \tag[name] in the dialogue, the name window will be displayed. (Initial value name → \name[name])
 * @default name
 *
 */

/*:ja
 * @target MZ
 * @plugindesc メッセージ中のタグで名前を表示します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_SpeakerNameByTag.js(ver1.0.1)
 *
 * 会話文中に任意のタグがある時、名前欄を自動表示します。
 * 一度の会話でタグが何回も指定されると、その度に名前が変更されます。
 *
 * タグはパラメータで指定できます。
 * アルファベット限定で、大文字小文字は無視されます。
 *
 * 例）名前タグが「name」の場合の会話文
 * \name[太郎]ぼくの名前は太郎です。
 * \Name[太郎]ぼくの名前は太郎です。
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param nameTag
 * @text 名前タグ
 * @desc 会話文中に\tag[名前]があれば名前ウィンドウを表示します。（初期値name→\name[名前]）
 * @default name
 *
 */

(() => {
	"use strict";
    const pluginName = "GABA_SpeakerNameByTag";

    const parameters = PluginManager.parameters(pluginName);
    const nameTag = (parameters["nameTag"] || "").toUpperCase();
    const strNameTagRegExp = `/\\${nameTag}\\[(.*?)\\]/gi`;

    // 他のプラグインから参照できるように、メッセージウィンドウに保持
    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.apply(this, arguments);
        this._gabaTagName = "";
    };

    // 開始：最初のタグ名を取得
    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        this.firstGabaTagName();

        _Window_Message_startMessage.apply(this, arguments);
    }

    // 終了：タグ名をクリア
    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        this._gabaTagName = "";
        _Window_Message_terminateMessage.apply(this, arguments);
    };

    // 名前の設定
    const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        _Window_Base_processEscapeCharacter.apply(this, arguments);

        if (this._nameBoxWindow != null && nameTag != "") {
            switch (code) {
                case nameTag:
                    const tagName = GABA_NWA_obtainEscapeParam(textState);
                    this._gabaTagName = tagName;
                    const arr = tagName.split(",");
                    this._nameBoxWindow._name = arr[0];
                    //refresh()では不十分。updatePlacement()にて名前ウィンドウの幅計算が必要
                    this._nameBoxWindow.start();
                    break;
            }
        }
    };

    // 最初に出現するタグを先行取得。
    Window_Message.prototype.firstGabaTagName = function() {
        this._gabaTagName = "";
        const arr = this.gaba_SNBT_GetRegExp().exec($gameMessage.allText());
        if (arr != null) {
            this._gabaTagName = arr[1];
        }
    }

    // evalの代替
    Window_Message.prototype.gaba_SNBT_GetRegExp = function() {
        return Function("'use strict'; return (" + strNameTagRegExp + ")")();
    }

    // 名前タグの除去＋名前抽出
    function GABA_NWA_obtainEscapeParam(textState) {
        const nameRegExp = new RegExp(/(?<=\[).*?(?=\])/, "i");
        const arr = nameRegExp.exec(textState.text.slice(textState.index));
        if (arr) {
            // カッコを除去して取得しているので、2文字進める
            textState.index += arr[0].length + 2;
            return arr[0];
        } else {
            return "";
        }
    };

})();
