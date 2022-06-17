//=============================================================================
// RPG Maker MZ - GABA_Ruby
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Add pronunciation-word to the message.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_Ruby.js(ver1.1.4)
 *
 * Add kana alongside Chinese characters (to indicate the pronunciation).
 *
 * It does not provide plugin commands.
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param rubyTag
 * @text Ruby tag
 * @desc If there is a \tag[word, pronunciation] in the conversation, ruby is displayed. (Initial value r)
 * @default r
 *
 * @param rubySize
 * @text rubySize
 * @type number
 * @desc Enter the ruby size.
 * @default 10
 *
 * @param adjustY
 * @text Vertical adjustment
 * @type number
 * @desc Enter the value to adjust the vertical position of the ruby.
 * @default 0
 * @min -400
 *
 * @param adjustLineHeight
 * @text Adjust line spacing
 * @type number
 * @desc Enter the value to increase the line spacing.
 * @default 0
 *
 * @param rubyList
 * @text Automatic ruby list
 * @type struct<RubyInfo>[]
 * @desc If registered here, ruby will be automatically added.
 * @default ["{\"word\":\"W8 4 U.\",\"ruby\":\"Wait for you.\"}"]
 *
 */

/*:ja
 * @target MZ
 * @plugindesc メッセージにルビを振ります
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_Ruby.js(ver1.1.4)
 *
 * このプラグインは、メッセージにルビ（読み仮名）を振ります。
 * 「文章の表示」イベントで、
 * ルビを振りたい文字を以下のようにタグで囲みます。
 *
 * \tag[漢字,かんじ]
 * \Tag[RPG,ロールプレイングゲーム]
 *
 * タグはパラメータで自由に決められますが、大文字小文字は無視されます。
 *
 * また、パラメーターの「ルビリスト」に読み方を登録しておけば、
 * タグで囲まなくても自動的にルビ振りされます。
 *
 * マップシーンおよび戦闘シーンでの「文章の表示」のみ対応しています。
 * 武器アイテムの説明や、名前ボックスなどでは機能しません。
 *
 * ■制限事項
 * ・文字サイズや表示位置を変える制御文字と併用不可
 *   FS、PX、PY、{、}を使用した場合にルビ位置がずれます。
 *   対応予定はありませんので、
 *   上記制御文字を使いつつどうしてもルビを出したい場合、
 *   他のプラグインをご利用ください。
 *
 * ・アイコンの制御文字でずれる
 *   \i[X]でアイコンを表示した場合、
 *   アイコンより右側のルビの位置がずれます。
 *   ルビにスペースを入れて調整はできますが、
 *   手間なのでその時だけルビを出さないのが楽だと思います。
 *
 * ----------------------------------------------------------------------------
 *
 * （メモ）
 * ■ルビリストに登録してある文字について、メッセージ内でタグ指定した場合
 *   そのメッセージ中のみ、タグ指定の読み方が優先されます。
 *
 * ■メッセージ中に同じ文字が複数登場し、タグ指定でルビを振りたい場合
 *   メッセージ中の同じ文字すべてにタグ指定してください。
 *   その中でルビを表示したくない文字があれば、\tag[文字,]としてください。
 *
 * ■ルビ位置を左に移動させたい場合
 *   ルビは中央寄せで表示されます。
 *   送り仮名の関係などでルビを左に移動させたい時は、
 *   ルビにスペースをいくつか追加して調整してください。
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param rubyTag
 * @text ルビタグ
 * @desc 会話文中に\tag[言葉,よみかた]があればルビを表示します。（初期値r）
 * @default r
 *
 * @param rubySize
 * @text ルビサイズ
 * @type number
 * @desc ルビのサイズ（初期値：10）。
 * @default 10
 *
 * @param adjustY
 * @text 上下調整
 * @type number
 * @desc ルビの位置を上下に調整する値をピクセル数で指定します（初期値：0）。プラスで下、マイナスで上に調整します。
 * @default 0
 * @min -400
 *
 * @param adjustLineHeight
 * @text 行間調整
 * @type number
 * @desc 行間を広げる値をピクセル数で指定します（初期値：0）。
 * @default 0
 *
 * @param rubyList
 * @text ルビリスト
 * @type struct<RubyInfo>[]
 * @desc ここに登録されていると自動的にルビ振りされます。
 * @default ["{\"word\":\"漢字\",\"ruby\":\"かんじ\"}"]
 *
 */
/*~struct~RubyInfo:
 *
 * @param word
 * @text Word
 * @type string
 * @desc Traget word
 *
 * @param ruby
 * @text Ruby
 * @type string
 * @desc pronunciation
 *
 */
/*~struct~RubyInfo:ja
 *
 * @param word
 * @text 対象文字
 * @type string
 * @desc ルビを振りたい言葉
 *
 * @param ruby
 * @text ふりがな
 * @type string
 * @desc 読み仮名
 *
 */

(() => {
    "use strict";
    const pluginName = "GABA_Ruby";

    const parameters = PluginManager.parameters(pluginName);
    const rubyFontSize = paramConvert(parameters["rubySize"] || 10);
    const rubyAdjustY = paramConvert(parameters["adjustY"] || 0);
    const lineHeightAdjust = paramConvert(parameters["adjustLineHeight"] || 0);
    const rubyTag = paramConvert(parameters["rubyTag"] || "").toUpperCase();
    const strRubyRegExp = "/" + "\\x1b" + rubyTag + "\\[(.*?)\\]/gi";

    const paramList = paramConvertArray(parameters["rubyList"]);
    const rubyList = initRubyList();

    // メッセージウィンドウにプロパティ追加
    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function () {
        _Window_Message_initMembers.apply(this, arguments);

        // 準備処理が完了したかどうか。メッセージウィンドウかどうかの判定にも流用。
        this._isRubyPrepeared = false;
        // メッセージ中にタグ指定されたルビリスト。作業用。
        this._messageRubyDic = {};
        // _messageRubyDicを配列化。rubyListも合流する。
        this._messageRubyList = [];
        // 実行時に参照する最終的なルビリスト。
        this._rubyExeList = [];
    };

    // メッセージウィンドウ初期化
    const _Window_Message_initialize = Window_Message.prototype.initialize;
    Window_Message.prototype.initialize = function (rect) {
        // ウィンドウサイズを調整します。
        // rectはScene_Message.prototype.messageWindowRect()で生成されたもの
        rect.height = rect.height + lineHeightAdjust * 4;

        _Window_Message_initialize.apply(this, arguments);
    };

    // 本文のタグを処理する
    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
    Window_Base.prototype.convertEscapeCharacters = function (text) {
        if (!isMessageWindow(this) || rubyTag === "") {
            return _Window_Base_convertEscapeCharacters.apply(this, arguments);
        }

        // バックスラッシュ表示指定を置換
        const STR_GABA_RUBY_REPLACE = "GABA_RUBY_BS_Replace";
        arguments[0] = arguments[0].replaceAll("\\\\", STR_GABA_RUBY_REPLACE);

        let myText = _Window_Base_convertEscapeCharacters.apply(this, arguments);

        // 独自タグを処理
        myText = myText.replace(getRegExp(), (_, p1) => this.getRubyReplaceCharacter(p1));

        this.convertMessageRubyList();

        // バックスラッシュ表示指定を反映させる。
        myText = myText.replaceAll(STR_GABA_RUBY_REPLACE, "\\");

        return myText;
    };

    // 本文の打ち出し開始位置を右にずらす。
    // 顔なしの１文字目のルビが本文より左に出た場合に見切れるのを、少しだけ抑制する効果。
    // １行に収まる文字数には影響なし
    const _Window_Message_newLineX = Window_Message.prototype.newLineX;
    Window_Message.prototype.newLineX = function (textState) {
        let startX = _Window_Message_newLineX.apply(this, arguments);
        return (startX += 4);
    };

    // テキストステート作成
    const _Window_Base_createTextState = Window_Base.prototype.createTextState;
    Window_Base.prototype.createTextState = function (text, x, y, width) {
        if (isMessageWindow(this)) {
            this.prepareRubyDic();
        }

        const textState = _Window_Base_createTextState.apply(this, arguments);

        if (isMessageWindow(this)) {
            this.prepareRubyExeList(textState);
        }

        return textState;
    };

    // 本文打ち出し後にルビを打ち出し
    const _Window_Base_flushTextState = Window_Base.prototype.flushTextState;
    Window_Base.prototype.flushTextState = function (textState) {
        _Window_Base_flushTextState.apply(this, arguments);
        if (isMessageWindow(this)) {
            this.flushRubyText(textState);
        }
    };

    // 改ページ
    const _Window_Message_newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function (textState) {
        _Window_Message_newPage.apply(this, arguments);
        // 行間調整。デフォルト設定だと１行目のルビが収まらないので下げます。
        textState.y += 6;
        textState.height += lineHeightAdjust;
    };

    // 改行
    const _Window_Message_processNewLine = Window_Message.prototype.processNewLine;
    Window_Message.prototype.processNewLine = function (textState) {
        _Window_Message_processNewLine.apply(this, arguments);
        // 行間調整。
        textState.height += lineHeightAdjust;
    };

    //-----------------------------
    // 関数追加
    //-----------------------------

    // ルビリストの初期化
    Window_Message.prototype.prepareRubyDic = function () {
        this._isRubyPrepeared = false;
        this._messageRubyDic = {};
        this._messageRubyList = [];
    };

    // 実行用ルビリストの準備
    Window_Message.prototype.prepareRubyExeList = function (textState) {
        const workTS = Object.assign({}, textState);
        this.removeControlCharacter(workTS);
        this.createRubyExeList(workTS);
        this.culcIndexRubyExeList(workTS);
        this._isRubyPrepeared = true;
    };

    // 表示文章用にルビ対象文字だけを返す。ついでにルビリストに登録
    Window_Message.prototype.getRubyReplaceCharacter = function (str) {
        const words = str.split(",");
        this.addMessageRubyDic(words);

        return words[0] != null ? words[0] : "";
    };

    // ルビリストへ登録
    Window_Message.prototype.addMessageRubyDic = function (words) {
        if (this._messageRubyDic[words[0]] == null) {
            this._messageRubyDic[words[0]] = [{ word: words[0], ruby: words[1] }];
        } else {
            this._messageRubyDic[words[0]].push({
                word: words[0],
                ruby: words[1],
            });
        }
    };

    // メッセージルビを配列に変換。パラメータ登録分(rubyList)を合流させて並び替え
    Window_Message.prototype.convertMessageRubyList = function () {
        this._messageRubyList = Object.entries(this._messageRubyDic);
        for (const data of this._messageRubyList) {
            data.push("tag");
        }

        const dic = this._messageRubyDic;
        const filterList = rubyList.filter(function (x) {
            if (dic[x[0]] == null) {
                return true;
            } else {
                false;
            }
        });

        this._messageRubyList = this._messageRubyList.concat(filterList);

        // 長い順に並び替え
        this._messageRubyList.sort(function (a, b) {
            const aKey = a[0],
                bKey = b[0];
            if (aKey.length < bKey.length) return 1;
            if (aKey.length > bKey.length) return -1;
            return 0;
        });
    };

    //実行用のルビリストを作成
    Window_Message.prototype.createRubyExeList = function (textState) {
        this._rubyExeList = [];

        for (const data of this._messageRubyList) {
            if (data[2] === "param") {
                //パラメータ指定
                this.createRubyExeListParam(textState, data[1][0], 0);
            } else {
                //data[2] === "tag"。タグ指定
                this.createRubyExeListTag(textState, data[1]);
            }
        }
    };

    // 文字の打ち出し位置を取得する前に制御文字を除去
    // 位置サイズ変更、アイコン位置は現状対応しない
    Window_Message.prototype.removeControlCharacter = function (textState) {
        textState.text = textState.text.replaceAll(/\x1b[{}$.|!><^]/gi, "");
        // アイコンはとりあえず1文字分とする
        textState.text = textState.text.replaceAll(/\x1bi\[.*]/gi, "aa");
        textState.text = textState.text.replaceAll(/\x1b.*\[.*]/gi, "");

    };

    // パラメータ分の実行用ルビリスト登録
    Window_Message.prototype.createRubyExeListParam = function (textState, obj, argPos) {
        const pos = textState.text.indexOf(obj.word, argPos);
        if (pos !== -1) {
            if (!isRegisteredPosition(pos, this._rubyExeList)) {
                this._rubyExeList.push({
                    index: pos,
                    word: obj.word,
                    ruby: obj.ruby,
                    isComplete: false,
                });
            }
            this.createRubyExeListParam(textState, obj, pos + 1);
        }
    };

    // タグ指定分の実行用ルビリスト登録
    Window_Message.prototype.createRubyExeListTag = function (textState, arr) {
        let pos = -1;
        let loopFlg = true;
        for (const data of arr) {
            loopFlg = true;
            while (loopFlg && textState.text.indexOf(data.word, pos + 1) !== -1) {
                pos = textState.text.indexOf(data.word, pos + 1);
                if (pos !== -1) {
                    if (!isRegisteredPosition(pos, this._rubyExeList)) {
                        // 各dataについて１回だけ登録
                        this._rubyExeList.push({
                            index: pos,
                            word: data.word,
                            ruby: data.ruby,
                            isComplete: false,
                        });
                        loopFlg = false;
                    }
                }
            }
        }
    };

    // 実行用のルビリストに、出力用のインデックスや行数の情報を追加
    Window_Message.prototype.culcIndexRubyExeList = function (textState) {
        let lineCount = 0;
        let charIndex = 0;
        let x = 0;

        for (let i = 0; i < textState.text.length; i++) {
            if (textState.text[i] === "\n") {
                lineCount++;
                charIndex = 0;
                x = 0;
            } else {
                for (let wData of this._rubyExeList) {
                    if (wData.index === i) {
                        wData.charIndex = charIndex;
                        wData.lineCount = lineCount;
                        wData.x = x;
                        break;
                    }
                }
                x += this.textWidth(textState.text[i]);
                charIndex++;
            }
        }
    };

    // 現在のtextStateから見て、出力する必要のあるルビデータを返す
    Window_Message.prototype.needsDrawRubyData = function (textState) {
        for (let data of this._rubyExeList) {
            if (data.index <= textState.index && !data.isComplete) {
                return data;
            }
        }
        return null;
    };

    // ルビを出力します。
    Window_Message.prototype.flushRubyText = function (textState) {
        // メッセージウィンドウを継承していれば出せる
        if (!isMessageWindow(this) || !this._isRubyPrepeared) {
            return;
        }
        if (this._rubyExeList == null || this._rubyExeList.length === 0) {
            return;
        }

        const rubyData = this.needsDrawRubyData(textState);

        if (rubyData == null) {
            return;
        }

        const bkFontSize = this.contents.fontSize;
        const kanjiText = rubyData.word;
        const kanjiWidth = this.textWidth(kanjiText);

        this.contents.fontSize = rubyFontSize;
        const text = rubyData.ruby;
        const width = this.textWidth(text);
        const height = rubyFontSize;

        // ルビを振りたい文字の開始位置を計算。
        // 瞬時表示、早送りでindexが飛ぶ。その場合にtextState.xやyも使えないので、配列作成時に計算したものを使う
        const stateX = textState.startX + rubyData.x;
        const stateY = textState.height * rubyData.lineCount;

        // 中央寄せの計算。
        const x = stateX - (width - kanjiWidth) / 2;
        // 縦位置微調整
        const y = stateY + rubyAdjustY;
        this.contents.drawText(text, x, y, width, height);
        this.contents.fontSize = bkFontSize;
        rubyData.isComplete = true;

        if (this.needsDrawRubyData(textState) != null) {
            // まだやる必要がある
            this.flushRubyText(textState);
        }
    };

    // -------------------------
    // その他
    // -------------------------

    // メッセージウィンドウかどうか。ルビ準備のプロパティ有無で判定。
    function isMessageWindow(thisWindow) {
        return thisWindow._isRubyPrepeared != null;
    }

    // 言葉の出現位置が登録済み（長い言葉に含まれている）
    function isRegisteredPosition(pos, list) {
        for (const data of list) {
            if (data.index != null && pos >= data.index && pos < data.index + data.word.length) {
                return true;
            }
        }

        return false;
    }

    // パラメーターのルビリストにひと手間加えたものを返す
    function initRubyList() {
        //重複削除
        const workList = paramList.filter(function (x, i, self) {
            for (let j = i + 1; j <= self.length - 1; j++) {
                if (x.word === self[j].word) {
                    return false;
                }
            }
            return true;
        });

        //長い順に並び替え
        workList.sort(function (a, b) {
            if (a.word.length < b.word.length) return 1;
            if (a.word.length > b.word.length) return -1;
            return 0;
        });

        // タグ指定のリストに合わせた整形
        const resultList = [];
        for (const data of workList) {
            resultList.push([data.word, [{ word: data.word, ruby: data.ruby }], "param"]);
        }

        return resultList;
    }

    // evalの代替
    function getRegExp() {
        return Function("'use strict';return (" + strRubyRegExp + ")")();
    }

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
                if (typeof value === "object") {
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
