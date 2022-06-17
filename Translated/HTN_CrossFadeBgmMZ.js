// --------------------------------------------------------------------------
//
// CrossFadeBgm
//
// Copyright (c) 2016 hatonekoe
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2019/06/10 ver0.4.0 setコマンド（startコマンド）でpositionの指定が可能に。Start From Zeroパラメータを追加
// 2019/06/10 ver0.3.1 「BGMの演奏」で、別パラメーターの同曲が再生されない不具合を修正
// 2019/06/10 ver0.3.0 startコマンドでオプションの指定ができるように
// 2017/04/18 ver0.2.1 setDurationコマンドが動作していなかったので修正、startコマンドにオプション追加
// 2016/09/13 ver0.2.0 配布jsにbabelをかまし、Internet Explorerでも動作するように
// 2016/09/12 ver0.1.2 コメントの追加や、ログ出力のコメントアウトなど
// 2016/09/11 ver0.1.1 無名BGMを再生するとクラッシュする不具合に対応、first release
// 2016/09/11 ver0.1.0 クロスフェード機能、ひとまずの完成
// 2016/09/10 ver0.0.1 開発開始
//
// --------------------------------------------------------------------------
/*:
 * @plugindesc BGMをクロスフェード
 * @target MZ
 * @base PluginCommonBase
 * @author ハトネコエ - http://hato-neko.x0.com
 *
 * @help
 *
 * 【プラグインコマンド詳細】
 * BGMの設定
 * # 次に流す曲を設定します。
 *
 * クロスフェード開始
 * # クロスフェードを開始します。BGM名以下を全て空欄にするとBGMの設定を使用します。
 *   BGM名を指定せず、音量以下に入力すると、現在のBGM同士がクロスフェードします。
 *
 * フェード時間変更
 * # デフォルトのフェード時間を新たに定義します。
 *
 * フェード時間リセット
 * # デフォルトのフェード時間を、プラグイン管理ウィンドウで指定している値に戻します。
 *
 * ------------------------------------------------------------------------
 * 2020/09/15　RPGツクールMZで動作するようにあわやまたなが改変。
 * MZに移植するにあたり、プラグインヘルプやコマンドの処理などを強引に書き換えています。
 *
 * @param Default Fade Duration Sec
 * @desc デフォルトのフェード時間（秒）
 * @default 3.0
 *
 * @param Start From Zero
 * @desc trueの場合、次の曲の再生開始位置を必ず0秒からにします（setコマンドを無視します）。
 * @type boolean
 * @on  0秒から再生
 * @off デフォルト
 * @default false
 *
 * @command set
 * @text BGMの設定
 * @desc 次に流す曲を指定します。
 *
 * @arg name
 * @text BGM名
 * @desc BGMの名前を指定します。
 * @type file
 * @dir audio/bgm/
 *
 * @arg volume
 * @text 音量
 * @desc BGMの音量を指定します。
 * @type number
 * @min 0
 * @default 90
 *
 * @arg pitch
 * @text ピッチ
 * @desc BGMのピッチを指定します。
 * @type number
 * @default 100
 *
 * @arg pan
 * @text 位相
 * @desc BGMの位相を指定します。
 * @type number
 * @min -100
 * @max 100
 * @default 0
 *
 * @arg pos
 * @text 再生開始位置
 * @desc BGMの再生開始位置（秒）を指定します。
 * 空欄にすると前の曲の現在の再生位置になります。
 *
 * @command start
 * @text クロスフェード開始
 * @desc クロスフェードを開始します。
 * 空欄にするとBGMの設定の値になります。
 *
 * @arg durationSec
 * @text フェード時間
 * @desc フェード時間（秒）を指定しつつクロスフェードを開始します。
 * デフォルトのフェード時間は変わりません。
 *
 * @arg name
 * @text BGM名
 * @desc BGMの名前を指定します。
 * @type file
 * @dir audio/bgm/
 *
 * @arg volume
 * @text 音量
 * @desc BGMの音量を指定します。
 * @type number
 * @min 0
 *
 * @arg pitch
 * @text ピッチ
 * @desc BGMのピッチを指定します。
 * @type number
 *
 * @arg pan
 * @text 位相
 * @desc BGMの位相を指定します。
 * @type number
 * @min -100
 * @max 100
 *
 * @arg pos
 * @text 再生開始位置
 * @desc BGMの再生開始位置（秒）を指定します。
 * 空欄にすると前の曲の現在の再生位置になります。
 *
 * @command setDuration
 * @text フェード時間変更
 * @desc デフォルトのフェード時間（秒）を新たに定義します。
 *
 * @arg durationSec
 * @text フェード時間変更
 * @desc フェード時間（秒）をプラグイン管理ウィンドウで指定している値から変更します。
 * @default 0
 *
 * @command resetDuration
 * @text フェード時間リセット
 * @desc デフォルトのフェード時間（秒）を、プラグイン管理ウィンドウで指定している値に戻します。
 */

(function() {
  'use strict';

  const pluginName = 'HTN_CrossFadeBgmMZ';

  /**
   * bgm は Array クラス
   * buffer は WebAudio クラス、もしくは Html5Audio クラス
   */
  class BgmBuffer {

    constructor() {
      BgmBuffer.extendAudioManager();
      BgmBuffer.setIndexForCurrentBgm(0);
    }

    /**
     * ツクールの AudioManager クラスを拡張
     *
     * @FIXME 他のプラグインが playBgm() とか拡張するとこのプラグインが動かなくなる
     */
    static extendAudioManager() {
      AudioManager._bgmArray = [];
      AudioManager._bgmBufferArray = [];

      /** BGM の再生 */
      AudioManager.playBgm = function(bgm, pos) {
        if (AudioManager.isCurrentBgm(bgm)) {
          AudioManager.updateBgmParameters(bgm);
        } else {
          AudioManager.stopBgm();
          if (bgm.name !== null) {
/*            if (Utils.hasEncryptedAudio && AudioManager.shouldUseHtml5Audio()) {
              AudioManager.playEncryptedBgm(bgm, pos);
            }*/
//            else {
              bgm.pos = pos;
              BgmBuffer.pushBuffer(bgm);
              // AudioManager._bgmBuffer = AudioManager.createBuffer('bgm', bgm.name);
              AudioManager.updateBgmParameters(bgm);
              if (!AudioManager._meBuffer) {
                // AudioManager._bgmBuffer.play(true, pos || 0);
                BgmBuffer.playAllBuffers();
              }
//            }
          }
        }
        AudioManager.updateCurrentBgm(bgm, pos);
      };

      /** playEncryptedBgm から呼ばれる。暗号化されたBGMを再生するためのバッファを作成 */
      AudioManager.createDecryptBuffer = function(url, bgm, pos) {
        AudioManager._blobUrl = url;
        bgm.pos = pos;
        BgmBuffer.pushBuffer(bgm);
        // AudioManager._bgmBuffer = AudioManager.createBuffer('bgm', bgm.name);
        AudioManager.updateBgmParameters(bgm);
        if (!AudioManager._meBuffer) {
          // AudioManager._bgmBuffer.play(true, pos || 0);
          BgmBuffer.playAllBuffers();
        }
        AudioManager.updateCurrentBgm(bgm, pos);
      };

      /**
       * BGM の再生停止
       * バッファー配列は空にする
       */
      AudioManager.stopBgm = function() {
        AudioManager._bgmBufferArray.forEach(function(buffer) {
          if (buffer !== null) {
            buffer.stop();
            buffer = null;
          }
        });
        BgmBuffer.setIndexForCurrentBgm(0);
        AudioManager._bgmArray = [];
        AudioManager._bgmBufferArray = [];
      };
    }

    /**
     * _bgmBuffer は AudioManager._bgmBufferArray から読み取る
     * _currentBgm は AudioManager._bgmArray から読み取る
     * ここでは、その _bgmBuffer, _currentBgm の書き込み・読み込みの対象となる配列のindex(0~)を指定する
     *
     * @param _indexForCurrentBgm: Number _bgmBuffer, _currentBgm の対象となる配列のindex(0~)
     */
    static setIndexForCurrentBgm(_indexForCurrentBgm) {
      const indexForCurrentBgm = parseInt(_indexForCurrentBgm);
      const length = BgmBuffer.countBuffers();

      if (indexForCurrentBgm === 0 || (0 <= indexForCurrentBgm && indexForCurrentBgm < length)) {
        Object.defineProperty(AudioManager, '_bgmBuffer', {
          get: function() {
            return AudioManager._bgmBufferArray[indexForCurrentBgm];
          },
          set: function(_buffer) {
            AudioManager._bgmBufferArray[indexForCurrentBgm] = _buffer;
          },
          configurable: true
        });

        Object.defineProperty(AudioManager, '_currentBgm', {
          get: function() {
            return AudioManager._bgmArray[indexForCurrentBgm];
          },
          set: function(_bgm) {
            AudioManager._bgmArray[indexForCurrentBgm] = _bgm;
          },
          configurable: true
        });
      } else {
        console.warn('!!WARN!! index number is not valid @ setIndexForCurrentBgm');
      }
    }

    /**
     * バッファーを後ろに足す
     *
     * @param _newBgm: Array 例 {name: 'bgm_title', volume: 90, pitch: 100, pan: 0, pos: 0}
     */
    static pushBuffer(_newBgm) {
      // 未定義の部分は現在の曲の値をセットしてあげる
      const newBgm = BgmBuffer.arrangeNewBgm(_newBgm, AudioManager._currentBgm);

      AudioManager._bgmArray.push(newBgm);

      // 無名BGMも曲として扱うが、バッファーとしてはnull
      if (newBgm.name === '') {
        AudioManager._bgmBufferArray.push(null);
      } else if (newBgm.name !== null) {
        // 暗号化されたオーディオファイルの場合 @TODO 通らないっぽいので消してもいいかも
/*        if (Utils.hasEncryptedAudio && AudioManager.shouldUseHtml5Audio()) {
          const ext = AudioManager.audioFileExt();
          let url = AudioManager._path + 'bgm/' + encodeURIComponent(bgm.name) + ext;
          url = Utils.extToEncryptExt(url);
          Utils.decryptHTML5Audio(url, bgm, bgm.pos);
          AudioManager._blobUrl = url;
        }*/
        AudioManager._bgmBufferArray.push(AudioManager.createBuffer("bgm/", newBgm.name));
      } else {
        console.warn('!!WARN!! next bgm name is null @ pushBuffer');
        AudioManager._bgmBufferArray.push(null); // _bgmArray の個数と整合性を保つため挿入
      }
      // console.log('Bufferの個数: ' + BgmBuffer.countBuffers()); // @TODO: あとで消す
    }

    /**
     * バッファーを先頭に足す
     *
     * @param _newBgm: Array 例 {name: 'bgm_title', volume: 90, pitch: 100, pan: 0, pos: 0}
     */
    static unshiftBuffer(_newBgm) {
      // 未定義の部分は現在の曲の値をセットしてあげる
      const newBgm = BgmBuffer.arrangeNewBgm(_newBgm, AudioManager._currentBgm);

      AudioManager._bgmArray.unshift(newBgm);

      // 無名BGMも曲として扱うが、バッファーとしてはnull
      if (newBgm.name === '') {
        AudioManager._bgmBufferArray.unshift(null);
      } else if (newBgm.name !== null) {
        // 暗号化されたオーディオファイルの場合 @TODO 通らないっぽいので消してもいいかも
/*        if (Utils.hasEncryptedAudio && AudioManager.shouldUseHtml5Audio()) {
          const ext = AudioManager.audioFileExt();
          let url = AudioManager._path + 'bgm/' + encodeURIComponent(bgm.name) + ext;
          url = Utils.extToEncryptExt(url);
          Utils.decryptHTML5Audio(url, bgm, bgm.pos);
          AudioManager._blobUrl = url;
        }
*/
        AudioManager._bgmBufferArray.unshift(AudioManager.createBuffer("bgm/", newBgm.name));
      } else {
        console.warn('!!WARN!! next bgm name is null @ unshiftBuffer');
        AudioManager._bgmBufferArray.unshift(null); // _bgmArray の個数と整合性を保つため挿入
      }
      // console.log('Bufferの個数: ' + BgmBuffer.countBuffers()); // @TODO: あとで消す
    }

    /**
     * バッファーの個数を数える
     *
     * @return Number
     */
    static countBuffers() {
      return AudioManager._bgmBufferArray.length;
    }

    /**
     * すべてのバッファーの再生を止める
     */
    static muteAllBuffers() {
      AudioManager._bgmBufferArray.forEach(function(buffer) {
        if (buffer !== null) {
          buffer.stop();
        }
      });
    }

    /**
     * すべてのバッファーを再生する
     */
    static playAllBuffers() {
      AudioManager._bgmBufferArray.forEach(function(buffer, index) {
        if (buffer !== null) {
          const audioParameter = AudioManager._bgmArray[index];

          if (audioParameter !== null) {
            AudioManager.updateBufferParameters(buffer, AudioManager._bgmVolume, audioParameter);
            buffer.play(true, audioParameter.pos || 0);
          }
        }
      });
    }

    /**
     * index(0~)を指定し、対象のバッファーを再生する
     *
     * @param _index: Number 対象バッファーの、バッファー配列におけるインデックス(0~)
     */
    static playBufferByIndex(_index) {
      const index = parseInt(_index);
      const length = BgmBuffer.countBuffers();

      if (0 <= index && index < length) {
        const buffer = AudioManager._bgmBufferArray[index];

        if (buffer !== null) {
          const audioParameter = AudioManager._bgmArray[index];

          if (audioParameter !== null) {
            AudioManager.updateBufferParameters(buffer, AudioManager._bgmVolume, audioParameter);
            buffer.play(true, audioParameter.pos || 0);
          }
        }
      } else {
        console.warn('!!WARN!! index number is not valid @ playBufferByIndex');
      }
    }

    /**
     * バッファーを指定個数に減らす
     *
     * @param quantity: Number この数に buffer の個数を減らす
     */
    static reduceBuffers(_quantity) {
      const quantity = parseInt(_quantity);
      const length = BgmBuffer.countBuffers();

      for (let i = quantity; i < length; ++i) {
        if (AudioManager._bgmBufferArray[i] !== null) {
          AudioManager._bgmBufferArray[i].stop();
          AudioManager._bgmBufferArray[i] = null;
        }
      }
      AudioManager._bgmArray = AudioManager._bgmArray.slice(0, quantity);
      AudioManager._bgmBufferArray = AudioManager._bgmBufferArray.slice(0, quantity);
    }

    /**
     * index(0~)を指定し、対象のバッファーを削除する
     *
     * @param _index: Number 対象バッファーの、バッファー配列におけるインデックス(0~)
     */
    static removeBufferByIndex(_index) {
      const index = parseInt(_index);
      const length = BgmBuffer.countBuffers();

      const newBgmArray = [];
      const newBgmBufferArray = [];

      if (0 <= index && index < length) {
        for (let i = 0; i < length; ++i) {
          if (i !== index) {
            newBgmArray.push(AudioManager._bgmArray[i]);
            newBgmBufferArray.push(AudioManager._bgmBufferArray[i]);
          } else {
            AudioManager._bgmBufferArray[i].stop();
            AudioManager._bgmBufferArray[i] = null;
            AudioManager._bgmArray[i] = null;
          }
        }

        AudioManager._bgmArray = newBgmArray;
        AudioManager._bgmBufferArray = newBgmBufferArray;
      } else {
        console.warn('!!WARN!! index number is not valid @ removeBufferByIndex');
      }
    }

    /**
     * index(0~)を指定し、対象のバッファーをアップデート
     *
     * @param _index: Number アップデート対象とするバッファーの、バッファー配列におけるインデックス(0~)
     * @param _newBgm: Array 例 {name: 'bgm_title', volume: 90, pitch: 100, pan: 0, pos: 0}
     */
    static updateBufferByIndex(_index, _newBgm) {
      const index = parseInt(_index);
      const length = BgmBuffer.countBuffers();

      if (0 <= index && index < length) {
        const buffer = AudioManager._bgmBufferArray[index];
        const currentBgm = AudioManager._bgmArray[index];
        const newBgm = BgmBuffer.arrangeNewBgm(_newBgm, currentBgm);

        AudioManager._bgmArray[index] = newBgm;
        AudioManager.updateBufferParameters(buffer, AudioManager._bgmVolume, newBgm);
      } else {
        console.warn('!!WARN!! index number is not valid @ updateBufferByIndex');
      }
    }

    /**
     * BGM名をもとにバッファー一覧を検索し、対象のバッファーをアップデート
     *
     * @param _bgmName: String 更新したい BGM名
     * @param _newBgm: Array 例 {name: 'bgm_title', volume: 90, pitch: 100, pan: 0, pos: 0}
     */
    static updateBufferByBgmName(_bgmName, _newBgm) {
      const bgmName = String(_bgmName);

      AudioManager._bgmArray.forEach(function(bgm, index) {
        if (bgm.name === bgmName) {
          const buffer = AudioManager._bgmBufferArray[index];
          const currentBgm = AudioManager._bgmArray[index];
          const newBgm = BgmBuffer.arrangeNewBgm(_newBgm, currentBgm);

          AudioManager._bgmArray[index] = newBgm;
          AudioManager.updateBufferParameters(buffer, AudioManager._bgmVolume, newBgm);
        }
      });
    }

    /**
     * 未定義の値は currentBgm の値を使うよう調整
     *
     * @param _newBgm: Array 新しい BGM
     * @param _currentBgm: Array 現在の BGM
     * @return newBgm: Array 調整された新しい BGM
     */
    static arrangeNewBgm(_newBgm, _currentBgm) {
      const newBgm = _newBgm;

      if (newBgm.name === null) {
        newBgm.name = _currentBgm.name;
      }
      if (newBgm.volume === null) {
        newBgm.volume = _currentBgm ? _currentBgm.volume : 90;
      }
      if (newBgm.pitch === null) {
        newBgm.pitch = _currentBgm ? _currentBgm.pitch : 100;
      }
      if (newBgm.pan === null) {
        newBgm.pan = _currentBgm ? _currentBgm.pan : 0;
      }
      if (newBgm.pos === null) {
        newBgm.pos = _currentBgm ? _currentBgm.pos : 0;
      }

      return newBgm;
    }

    /**
     * index(0~)を指定し、対象のバッファーをフェードイン
     *
     * @param _index: Number アップデート対象とするバッファーの、バッファー配列におけるインデックス(0~)
     * @param _fadeDurationSec: Number フェードインにかける時間（秒）
     */
    static fadeInBufferByIndex(_index, _fadeDurationSec) {
      const index = parseInt(_index);
      const fadeDurationSec = Number(_fadeDurationSec);
      const length = BgmBuffer.countBuffers();

      if (0 <= index && index < length) {
        const buffer = AudioManager._bgmBufferArray[index];

        if (buffer !== null) {
          buffer.fadeIn(fadeDurationSec);
        }
      } else {
        console.warn('!!WARN!! index number is not valid @ fadeInBufferByIndex');
      }
    }

    /**
     * index(0~)を指定し、対象のバッファーをフェードアウト
     *
     * @param _index: Number アップデート対象とするバッファーの、バッファー配列におけるインデックス(0~)
     * @param _fadeDurationSec: Number フェードアウトにかける時間（秒）
     */
    static fadeOutBufferByIndex(_index, _fadeDurationSec) {
      const index = parseInt(_index);
      const fadeDurationSec = Number(_fadeDurationSec);
      const length = BgmBuffer.countBuffers();

      if (0 <= index && index < length) {
        const buffer = AudioManager._bgmBufferArray[index];

        if (buffer !== null) {
          buffer.fadeOut(fadeDurationSec);
        }
      } else {
        console.warn('!!WARN!! index number is not valid @ fadeOutBufferByIndex');
      }
    }

    static getBuffersPositionByIndex(_index) {
      const index = parseInt(_index);
      const length = BgmBuffer.countBuffers();

      if (0 <= index && index < length) {
        const buffer = AudioManager._bgmBufferArray[index];

        if (buffer !== null) {
          return (buffer.seek() || 0);
        } else {
          return null;
        }
      } else {
        console.warn('!!WARN!! index number is not valid @ fadeInBufferByIndex');
      }
    }
  }

  class CrossFadeBgm {
    constructor() {
      // プラグインパラメーターからデフォルトフェード時間を設定
      const parameters = PluginManager.parameters(pluginName);
      this._defaultDurationSec = Number(parameters['Default Fade Duration Sec']);
      this.durationSec = this.defaultDurationSec;
      this.isStartFromZero = (parameters['Start From Zero'] === 'true');

      this.bgmBuffer = new BgmBuffer();

      this.nextBgm = {
        name: '',
      };
    }

    /** defaultDurationSec を取得、set はしない */
    get defaultDurationSec() {
      return this._defaultDurationSec;
    }

    /** クロスフェードを開始 */
    startCrossFade(_options) {
      let durationSec = this.durationSec;

      if (_options != null) {
        const optionsArray = _options.split(',');
        const opt1 = optionsArray.shift();
        if (!isNaN(parseFloat(opt1)) && Number(opt1) >= 0) {
          durationSec = Number(opt1);
        }

        if (optionsArray.length > 0) {
          this.setAll(optionsArray.join(','));
        }
      }

      if (AudioManager._currentBgm !== null) {
        if (this.nextBgm.name !== AudioManager._currentBgm.name) {
          const position = BgmBuffer.getBuffersPositionByIndex(0);
          if (this.isStartFromZero) {
            this.nextBgm.pos = 0;
          } else if (this.nextBgm.pos == null) {
            this.nextBgm.pos = position;
          }
          AudioManager._currentBgm.pos = position;

          this.nextBgm = BgmBuffer.arrangeNewBgm(this.nextBgm, AudioManager._currentBgm);

          BgmBuffer.unshiftBuffer(this.nextBgm);
          BgmBuffer.reduceBuffers(2);
          BgmBuffer.playAllBuffers();

          BgmBuffer.fadeInBufferByIndex(0, durationSec * 0.75);
          BgmBuffer.fadeOutBufferByIndex(1, durationSec);
        }
      } else {
        BgmBuffer.unshiftBuffer(this.nextBgm);
        BgmBuffer.reduceBuffers(2);
        BgmBuffer.playAllBuffers();
        BgmBuffer.fadeInBufferByIndex(0, durationSec * 0.75);
      }
    }

    /** フェード時間(s)を設定 */
    setDuration(_durationSec) {
//      if (Number(_durationSec) > 0) {
        this.durationSec = Number(_durationSec);
//      }
    }

    /** フェード時間(s)をデフォルトにリセット */
    resetDuration() {
      this.durationSec = this.defaultDurationSec;
    }

    /**
     * 次に流すBGMをまとめて設定
     *
     * name,volume,pan,pitch,pos の順でまとめて書く
     * カンマのあとに空白文字を置かないこと
     *
     * @param _args: String
     */
    setAll(_args) {
      const argsArray = _args.split(',');

      const name   = (argsArray[0] == null || argsArray[0] === '') ? null : String(argsArray[0]);
      const volume = isNaN(parseFloat(argsArray[1])) ? null : Number(argsArray[1]);
      const pan    = isNaN(parseFloat(argsArray[2])) ? null : Number(argsArray[2]);
      const pitch  = isNaN(parseFloat(argsArray[3])) ? null : Number(argsArray[3]);
      const pos    = isNaN(parseFloat(argsArray[4])) ? null : Number(argsArray[4]);

      this.nextBgm = {
        name  : name,
        volume: volume,
        pan   : pan,
        pitch : pitch,
        pos   : pos,
      };
    }

    /**
     * プラグインコマンドを登録
     */
    static initPluginCommands() {
        var crossFadeBgmClass = new CrossFadeBgm();
		PluginManagerEx.registerCommand(document.currentScript, "set", args => {
			const name   = args.name;
			const volume = args.volume;
			const pan    = args.pan;
			const pitch  = args.pitch;
			const pos    = args.pos;
			const data = name+","+volume+","+pan+","+pitch+","+pos;
			crossFadeBgmClass.setAll(data);
		});
		
		PluginManagerEx.registerCommand(document.currentScript, "start", args => {
			const durationSec = args.durationSec;
			const name   = args.name;
			const volume = args.volume;
			const pan    = args.pan;
			const pitch  = args.pitch;
			const pos    = args.pos;
			var toString = Object.prototype.toString;
			
			if(name=="" && volume=="" && pan=="" && pitch=="" && pos==""){
				var data = String(durationSec);
			}else{
				var data = durationSec+","+name+","+volume+","+pan+","+pitch+","+pos;
			}
			crossFadeBgmClass.startCrossFade(data);
		});
		
		PluginManagerEx.registerCommand(document.currentScript, "setDuration", args => {
			const durationSec = args.durationSec;
			crossFadeBgmClass.setDuration(durationSec);
		});
		
		PluginManagerEx.registerCommand(document.currentScript, "resetDuration", args => {
			crossFadeBgmClass.resetDuration();
		});
			
/*      const _Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;

      Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'CrossFadeBgm') {
          switch (args[0]) {
            case 'set':
              crossFadeBgmClass.setAll(args[1]);
              break;
            case 'start':
              crossFadeBgmClass.startCrossFade(args[1]);
              break;
            case 'setDuration':
              crossFadeBgmClass.setDuration(args[1]);
              break;
            case 'resetDuration':
              crossFadeBgmClass.resetDuration();
              break;
          }
        }
      };*/
    }
  }

  CrossFadeBgm.initPluginCommands();

})();
