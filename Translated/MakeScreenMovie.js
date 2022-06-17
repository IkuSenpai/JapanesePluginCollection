/*=============================================================================
 MakeScreenMovie.js
----------------------------------------------------------------------------
 (C)2019 Triacontane
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.1.1 2020/10/17 ヘルプ修正
 1.1.0 2020/10/16 テストプレー以外でも使えるよう修正
                  録画したファイル名を変数に格納する機能を追加
                  録画乱れを防止するパラメータを追加
 1.0.1 2020/10/13 MZで動作するよう修正
 1.0.0 2019/01/05 初版
----------------------------------------------------------------------------
 [Blog]   : https://triacontane.blogspot.jp/
 [Twitter]: https://twitter.com/triacontane/
 [GitHub] : https://github.com/triacontane/
=============================================================================*/

/*:
 * @plugindesc ゲーム動画作成プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/MakeScreenMovie.js
 * @base PluginCommonBase
 * @author トリアコンタン
 *
 * @param FunkKeyRecord
 * @text 録画ファンクションキー
 * @desc ゲーム画面の録画と停止を行うキーです。
 * @default F10
 * @type select
 * @option none
 * @option F1
 * @option F2
 * @option F3
 * @option F4
 * @option F5
 * @option F6
 * @option F7
 * @option F8
 * @option F9
 * @option F10
 * @option F11
 * @option F12
 *
 * @param RecordSwitchId
 * @text 録画スイッチ番号
 * @desc 指定したスイッチがONになると自動で録画を開始します。
 * @default 0
 * @type switch
 *
 * @param FileName
 * @text ファイル名
 * @desc 作成した動画のファイル名です。制御文字\V[n]が使えるほか、\Dで日付文字列に変換できます。
 * @default movie_\d
 *
 * @param Location
 * @text 保存場所
 * @desc ファイルの出力パスです。相対パス、絶対パスが利用できます。
 * 区切り文字は「/」もしくは「\」で指定してください。
 * @default movies
 *
 * @param IncludeAudio
 * @text 音声を含める
 * @desc 録画した動画に音声データを含めるかどうかを選択できます。
 * @default true
 * @type boolean
 *
 * @param MovieFileVariableId
 * @text 動画ファイル名の格納変数
 * @desc 録画した動画ファイル名称文字列が格納される変数です。
 * @default 0
 * @type variable
 *
 * @param TestOnly
 * @text テストプレー時のみ有効
 * @desc プラグインの機能がテストプレー時のみ有効になります。
 * @default true
 * @type boolean
 *
 * @param PreventRecordingDisruption
 * @text 録画乱れ防止
 * @desc メッセージ表示中に稀に発生する録画乱れを防止できますが、メッセージが一瞬で表示されます。
 * @default true
 * @type boolean
 *
 * @param MimeType
 * @text MIMEタイプ
 * @desc 生成する動画のMIMEタイプです。通常は自動で問題ありません。サポート外の規格を選択すると自動選択されます。
 * @default 自動
 * @type select
 * @option 自動
 * @option video/webm;codecs=vp9
 * @option video/webm;codecs=vp8
 * @option video/webm;codecs=h264
 * @option video/webm
 *
 * @param RefreshRate
 * @text リフレッシュレート
 * @desc 動画のリフレッシュレートです。-1で自動設定、0で静止画になります。動画が不安定になる場合は下げてください。
 * @default 30
 * @type number
 * @min -1
 * @max 120
 *
 * @help MakeScreenMovie.js
 *
 * ゲーム画面を録画してwebm形式で保存できます。
 * 指定したファンクションキーを押すか、スイッチがONになると録画開始します。
 * もう一度ファンクションキーを押すか、スイッチがOFFになると録画終了します。
 * ファイル名や保存場所、音声を含めるかどうかを設定できます。
 *
 * 注意！
 * 　録画中「●REC」と表示されますが、実際の動画には含まれません。
 * 　このプラグインはローカル実行（Game.exe）でのみ動作します。
 * 　あまりに長時間の録画は動作が不安定になる場合があります。
 * 　現バージョンでは録画した動画にまれに映像乱れが生じる場合があります。
 * 　(パラメータから抑止可能)
 *
 * ・参考にした記事
 * https://qiita.com/ru_shalm/items/0930aedad12c4e100446
 *
 * ・スクリプト
 * 最後に録画した動画ファイルのフルパスを取得します。
 * StorageManager.getLatestMovieFilePath();
 *
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 *
 * We will create an English version when it works well.
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */

(function() {
    'use strict';

    if (!Utils.isNwjs()) {
        console.error('MakeScreenMovie.js: This plugin use only Game.exe');
        return;
    }

    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    if (param.TestOnly && !Utils.isOptionValid('test')) {
        return;
    }

    const MIME_TYPES = [
        'video/webm;codecs=vp9',
        'video/webm;codecs=vp8',
        'video/webm;codecs=h264',
        'video/webm'
    ];

    /**
     * 画面を録画状態を管理するクラス
     */
    class ScreenRecorder {
        constructor() {
            this._recorder = null;
            if (!this.getMimeType()) {
                this._disable = true;
                console.warn('MakeScreenMovie.js: Supported Mime type not found.');
            }
        }

        _start() {
            if (this._disable) {
                return;
            }
            this._stream  = param.IncludeAudio ? this._createStream() : this._createCanvasStream();
            const recorder = new MediaRecorder(this._stream, {mimeType: this.getMimeType()});
            this._chunks   = [];
            recorder.addEventListener('dataavailable', event => this._chunks.push(event.data));
            recorder.addEventListener('stop', this._save.bind(this));
            recorder.start(1000);
            Graphics.showRecSign();
            this._recorder = recorder;
        }

        _stop() {
            this._recorder.stop();
            this._stream.getTracks().forEach(track => track.stop());
            this._recorder = null;
            this._stream = null;
        }

        _save() {
            const blob   = new Blob(this._chunks, {type: this.getMimeType()});
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                Graphics.hideRecSign();
                StorageManager.saveMovieToLocalFile(new Buffer(reader.result));
            });
            reader.readAsArrayBuffer(blob);
            this._chunks = null;
        }

        _createStream() {
            const tracks = this._createCanvasStream().getVideoTracks().concat(
                WebAudio.createStream().getAudioTracks());
            return new MediaStream(tracks);
        }

        _createCanvasStream() {
            if (param.RefreshRate >= 0) {
                return document.querySelector('canvas').captureStream(param.RefreshRate);
            } else {
                return document.querySelector('canvas').captureStream();
            }
        }

        toggle() {
            if (!this.isRecording()) {
                this._start();
            } else {
                this._stop();
            }
        }

        update() {
            const switchId = param.RecordSwitchId;
            if ($gameSwitches.value(switchId) && !this.isRecording()) {
                this._start();
            } else if (!$gameSwitches.value(switchId) && this.isRecording()) {
                this._stop();
            }
        }

        isRecording() {
            return !!this._recorder;
        }

        getMimeType() {
            if (MediaRecorder.isTypeSupported(param.MimeType)) {
                return param.MimeType;
            } else {
                return MIME_TYPES.filter(MediaRecorder.isTypeSupported)[0];
            }
        }
    }

    /**
     * Game_Switches
     * スイッチに連動してレコーダーを更新します。
     */
    const _Game_Switches_setValue      = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function(variableId, value) {
        _Game_Switches_setValue.apply(this, arguments);
        if (variableId === param.RecordSwitchId) {
            SceneManager.updateRecorder();
        }
    };

    /**
     * SceneManager
     *  ScreenRecorderを生成、管理します。
     */
    const _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize        = function() {
        _SceneManager_initialize.apply(this, arguments);
        this._screenRecorder = new ScreenRecorder();
    };

    const _SceneManager_onKeyDown = SceneManager.onKeyDown;
    SceneManager.onKeyDown        = function(event) {
        _SceneManager_onKeyDown.apply(this, arguments);
        this.onKeyDownForScreenMovie(event);
    };

    SceneManager.onKeyDownForScreenMovie = function(event) {
        if (event.key === param.FunkKeyRecord) {
            this._screenRecorder.toggle();
        }
    };

    SceneManager.updateRecorder = function() {
        this._screenRecorder.update();
    };

    SceneManager.isScreenRecording = function() {
        return this._screenRecorder.isRecording();
    };

    /**
     * StorageManager
     * 作成した動画ファイルを保存します。
     */
    StorageManager.saveMovieToLocalFile = function(dataBuffer) {
        const fs       = require('fs');
        const dirPath  = StorageManager.localMovieFileDirectoryPath();
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        const fileName = this.getMovieFileName();
        const filePath = dirPath + fileName + '.webm';
        this.saveMovieFileName(fileName);
        fs.writeFileSync(filePath, dataBuffer);
    };

    StorageManager.saveMovieFileName = function(fileName) {
        this._movieFilePath = fileName;
        if (param.MovieFileVariableId) {
            $gameVariables.setValue(param.MovieFileVariableId, fileName);
        }
    };

    StorageManager.localMovieFileDirectoryPath = function() {
        let filePath = param.Location;
        if (!filePath.match(/^[A-Z]:/)) {
            const path = require('path');
            filePath   = path.join(path.dirname(process.mainModule.filename), filePath);
        }
        return filePath.match(/\/$/) ? filePath : filePath + '/';
    };

    StorageManager.getMovieFileName = function() {
        const tmpText = param.FileName.replace(/\\V\[(\d+)]/gi, () => {
            return $gameVariables ? $gameVariables.value(parseInt(arguments[1])) : '0';
        });
        return tmpText.replace(/\\D/gi, this.getTimeText);
    };

    StorageManager.getLatestMovieFilePath = function() {
        return this._movieFilePath || '';
    };

    StorageManager.getTimeText = function() {
        const d = new Date();
        return `${d.getFullYear()}-${(d.getMonth() + 1).padZero(2)}-${d.getDate().padZero(2)}` +
            `_${d.getHours().padZero(2)}${d.getMinutes().padZero(2)}${d.getSeconds().padZero(2)}`;
    };

    /**
     * Graphics
     * 録画中のサインを表示します。
     */
    Graphics.showRecSign = function() {
        if (this._recSign) {
            this._recSign.style.opacity = '1';
        }
    };

    Graphics.hideRecSign = function() {
        if (this._recSign) {
            this._recSign.style.opacity = '0';
        }
    };

    const _Graphics__createAllElements = Graphics._createAllElements;
    Graphics._createAllElements        = function() {
        _Graphics__createAllElements.apply(this, arguments);
        this._createRecPrinter();
    };

    Graphics._createRecPrinter = function() {
        const text            = document.createElement('div');
        text.id               = 'recSign';
        text.style.position   = 'absolute';
        text.style.left       = '8px';
        text.style.top        = '8px';
        text.style.width      = '300px';
        text.style.fontSize   = '40px';
        text.style.fontFamily = 'monospace';
        text.style.color      = 'red';
        text.style.textAlign  = 'left';
        text.style.textShadow = '1px 1px 0 rgba(0,0,0,0.5)';
        text.innerHTML        = '●REC';
        text.style.zIndex     = '9';
        text.style.opacity    = '0';
        document.body.appendChild(text);
        this._recSign = text;
    };

    /**
     * WebAudio
     * ストリームを生成して返します。
     */
    WebAudio.createStream = function() {
        const audioContext = this._context;
        const audioNode    = this._masterGainNode;
        const destination  = audioContext.createMediaStreamDestination();
        audioNode.connect(destination);
        const oscillator = audioContext.createOscillator();
        oscillator.connect(destination);
        return destination.stream;
    };

    if (param.PreventRecordingDisruption) {
        const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
        Window_Message.prototype.updateShowFast = function() {
            _Window_Message_updateShowFast.apply(this, arguments);
            if (SceneManager.isScreenRecording()) {
                this._showFast = true;
            }
        };
    }
})();
