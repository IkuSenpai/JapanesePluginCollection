//=============================================================================
// FastMZ.js
// ----------------------------------------------------------------------------
// (C)2021 unaunagi
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/01/28 初版
// 1.1.0 2021/01/31 もっと速くした
// 1.2.0 2021/02/02 もうちょっとだけ速くして、英語用アノテーションの修正
// 1.3.0 2021/02/05 イベントスクリプトから、thisでGame_Interpreterにアクセス出来るようにした
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/unaunagi1/
// [GitHub] : https://github.com/unaunagi/
//=============================================================================

/*:
 * @plugindesc FastMZ
 * @target MZ
 * @author unaunagi
 * @url https://github.com/unaunagi/FastMZ
 * @base Fs
 * @orderAfter Fs
 *
 * @command set
 * @text FastMZ Setting
 * @desc Toggles between enabled and disabled. Enabled by default.
 *
 *    @arg fasteval
 *    @type boolean
 *    @text Eval to new Function
 *
 *    @arg fastskip
 *    @type boolean
 *    @text IF,While,Jump...
 *
 * @help This plugin will speed up your game!
 *
 * Required plug-ins
 * Fs.js
 * https://github.com/f-space/rmmz-plugins
 *
 * // (C)2021 unaunagi
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @plugindesc FastMZ RPGツクールMZ高速化プラグイン
 * @target MZ
 * @author うなうなぎ
 * @url https://github.com/unaunagi/FastMZ
 * @base Fs
 * @orderAfter Fs
 *
 * @command set
 * @text FastMZによる高速化の設定
 * @desc 各機能を有効にするか無効にするか、ゲーム中から設定ができます。デフォルトだと有効です。
 *
 *    @arg fasteval
 *    @type boolean
 *    @text スクリプトイベントの高速化
 *    @desc イベントコマンド「スクリプト」と、移動ルートの設定の「スクリプト」を高速化します。
 *
 *    @arg fastskip
 *    @type boolean
 *    @text 条件分岐・ラベルジャンプ等の高速化
 *    @desc フロー制御関係の処理を高速化します。コマンド数の多いイベント、ループ回数が多い場合に効果を発揮。
 *
 * @help RPGツクールMZ製ゲームを高速化するプラグインです。
 *
 * イベント処理やスクリプト処理を書き換えることで、だいたい2倍～数倍の高速化が見込めます。
 * 特にイベントコマンドをたくさん使ったり、ループ回数が多い場合には効いてきます。
 * ただしGame_Interpreterの中身を書き換えるプラグインとは競合する可能性があります。
 *
 * プラグインコマンドで昨日のONがOFFできます。
 * ただしOFFの状態でも一部の処理が入っちゃうので、素の状態よりちょっと遅くなります
 * 全く使わないという場合はプラグイン自体を無効にしてください。
 *
 * 前提プラグインとして f-space さんの Fs.jsが必要です。
 * FastMZ.jsより上になるようにしてください。
 * MZ用 基本機能ライブラリ Fs （β版） | ツクールフォーラム
 * https://forum.tkool.jp/index.php?threads/4276/
 *
 * ■利用規約
 * (C)2021 unaunagi
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 * MITライセンスということ以外に制限はありません。
 * 商用利用や18禁作品での使用についても当然問題ありません。
 */

"use strict";
{
  //プラグインの初期化---------------------------------------------------------------------------------
  //import Fs.js
  // eslint-disable-next-line no-undef
  const { P, Z } = Fs;
  const pluginName = Z.pluginName();

  //プラグインコマンド---------------------------------------------------------------------------------
  //有効無効の設定
  let enableFastEval = true;
  let enableSkip = true;

  PluginManager.registerCommand(pluginName, "set", (args) => {
    enableFastEval = P.parse(args["fasteval"], P.boolean);
    enableSkip = P.parse(args["fastskip"], P.boolean);
  });
  //----------------------------------------------------------------------------------------------------

  //各種prop--------------------------------------------------------------------------------------------
  const evalProp = Z.extProp(null, true); //eval用の汎用キャッシュ。スクリプト文字列をキーにしたいので強いMapを採用
  const labelProp = Z.extProp(null); //ラベルの場所を記録したMap。listごとにもたせる
  const commandProp = Z.extProp([null, null]); //[次の行き先整数、実行関数]の組。パラメータを追加すると関数に渡す。commandごとに
  const skipProp = Z.extProp(null); //次の行き先を整数示す整数。commandごとに。skipBranch用
  //----------------------------------------------------------------------------------------------------

  //command***実行用のテーブル
  //とりあえず999まで作っておく
  let isCommandTable = false;
  let commandTable = Array(1000).fill(null);
  let trueFunc = () => true;

  //evalの高速化
  const fastEval = (script) => {
    //evalではなくnew Functionを使い、生成済みの関数は捨てずに使い回す
    //別の場所から呼ばれても、コードが一致してればOK
    let f = evalProp.get(script);
    if (f === null) {
      f = new Function(script);
      evalProp.set(script, f);
    }
    return f;
  };
  //これを有効化すると外からでも使えるはず
  //globalThis.fastEval = fastEval;

  //window.topが使用できるかどうかを最初に一度だけ確かめる
  const isTopAccessible = () => {
    try {
      window.top.document.hasFocus();
      return true;
    } catch (err) {
      return false;
    }
  };
  const canTopAccessible = isTopAccessible();

  //SceneManager
  //プロトタイプではないので直接上書きする
  Z.redef(SceneManager, () => ({
    isGameActive() {
      //速度差自体は大きいけど、実行回数が少ないから大して影響はなかった
      //とはいえ毎回try catchすることはないだろうと思うので……
      return !canTopAccessible || window.top.document.hasFocus();
    },
  }));

  //Game_System
  //関数のテーブル化は速いうちに済ませたいけど、早すぎても駄目
  //プラグインを全部読み込んだ後に作りたい……ということでここに持ってきた
  Z.redef(Game_System.prototype, (base) => ({
    initialize() {
      base(this).initialize();
      if (!isCommandTable) makeCommandTable();
    },
  }));

  //Game_Interpreter
  Z.redef(Game_Interpreter.prototype, (base) => ({
    executeCommand() {
      if (!enableSkip) return base(this).executeCommand();

      const command = this.currentCommand();
      if (command) {
        this._indent = command.indent;
        const commandMethod = commandTable[command.code];
        const result = commandMethod.call(this, command.parameters);
        if (!result) return false;
        this._index += 1;
      } else {
        this.terminate();
      }
      return true;
    },
    command108(params) {
      //コメント文
      //連続したコメントを一気に飛ばす
      //this._commentsを無視してよければもう少し簡素化出来るけど
      //使うプラグインもあるかもしれないので、最後のコメントの文字列は残す
      if (!enableSkip) return base(this).command108(params);
      if (fastCommand(this)) return true; //commandProp対応

      const command = this.currentCommand();
      const comments = [params[0]];
      while (this._index < this._list.length) {
        const nextEventCode = this.nextEventCode();
        if (nextEventCode === 408) {
          comments.push(this.currentCommand().parameters[0]);
        } else if (nextEventCode === 108) {
          comments.splice(0);
          comments.push(this.currentCommand().parameters[0]);
        } else {
          break;
        }
        this._index += 1;
      }
      commandProp.set(command, [this._index, commentFunc, comments]);
      this._comments = comments;
      return true;
    },
    command113() {
      //ループの中断
      if (!enableSkip) return base(this).command113();
      if (fastCommand(this)) return true; //commandProp対応

      let depth = 0;
      let i = this._index;
      while (i < this._list.length - 1) {
        i++;
        if (this._list[i].code === 112) depth++;
        if (this._list[i].code === 413) {
          depth--;
          if (depth <= 0) break;
        }
      }
      commandProp.set(this._list[this._index], [i, null]);
      this._index = i;
      return true;
    },
    command119(params) {
      //ラベルに向かってジャンプ！
      if (!enableSkip) return base(this).command119(params);
      if (fastCommand(this)) return true; //commandProp対応

      const list = this._list;
      const command = list[this._index];
      const map = labelProp.get(list) ?? makeLabelMap(list); //ラベルマップの取得(なければ作る)
      const matagi = [];
      const next = map.get(params[0]);
      if (next === void 0) {
        //ラベルが存在しない時は次へ
        commandProp.set(command, [this._index, null]);
        return true;
      }
      const startIndex = Math.min(next, this._index);
      const endIndex = Math.max(next, this._index);
      let indent = this._indent;
      for (let i = startIndex; i <= endIndex; i++) {
        const newIndent = list[i].indent;
        if (newIndent !== indent) {
          this._branch[indent] = null;
          matagi.push(indent);
          indent = newIndent;
        }
      }
      commandProp.set(command, [next, matagiFunc, matagi]);
      this._index = next;
      return true;
    },
    command355() {
      //スクリプトイベント
      if (!enableFastEval) return base(this).command355();
      if (fastCommand(this)) return true; //commandProp対応

      //文字列の結合と評価は1度だけにする
      const command = this.currentCommand();
      //最初の1回だけ。2回目からはcommandPropの中身が実行される
      let script = this.currentCommand().parameters[0] + "\n";
      while (this.nextEventCode() === 655) {
        this._index++;
        script += this.currentCommand().parameters[0] + "\n";
      }
      //const f = fastEval(script);
      const f = fastEval(script).bind(this);
      f();
      commandProp.set(command, [this._index, f]);
      return true;
    },
    command413() {
      //ループ処理などで元に戻る時に使われる関数
      if (!enableSkip) return base(this).command413();
      if (fastCommand(this)) return true; //commandProp対応

      const command = this.currentCommand();
      do {
        this._index -= 1;
      } while (this.currentCommand().indent !== this._indent);
      commandProp.set(command, [this._index, null]);
    },
    skipBranch() {
      //ループ脱出などで汎用的に使われる、処理のスキップ
      //スキップのたびに行き先を探すのは無駄な気がするので、1回調べたら後はそのまま
      //スキップするしないは毎回変わるけど、飛び先そのものは固定
      if (!enableSkip) return base(this).skipBranch();

      const command = this.currentCommand();
      const next = skipProp.get(command);
      if (next !== null) {
        this._index = next;
        return;
      }
      while (this._list[this._index + 1].indent > this._indent) {
        this._index += 1;
      }
      skipProp.set(command, this._index);
    },
  }));

  //Game_Character
  Z.redef(Game_Character.prototype, (base) => ({
    processMoveCommand(command) {
      //イベントコマンド・移動の「移動ルートの設定」の高速化
      if (!enableSkip) return base(this).processMoveCommand(command);

      const gc = Game_Character;
      const params = command.parameters;
      if (command.code == gc.ROUTE_SCRIPT) {
        fastEval(params[0]).call(this);
        return true;
      } else {
        return base(this).processMoveCommand(command);
      }
    },
  }));

  //コマンド実行時に毎回文字連結とかしたくないので、事前に関数表を作る
  //これがあれば最速で関数を呼び出せるはず
  const makeCommandTable = () => {
    const p = Game_Interpreter.prototype;
    commandTable = commandTable.map((value, index) => {
      const methodName = "command" + index;
      if (typeof p[methodName] === "function") {
        return p[methodName];
      } else {
        return trueFunc;
      }
    });
    isCommandTable = true;
  };

  //CommandProp対応関数を高速実行する仕組み
  const fastCommand = (interpreter) => {
    //前処理済みのコマンドを統一的に扱う
    //指定した場所にジャンプして、指定したパラメータを関数に渡す
    //データがなかったらfalseで戻る
    const command = interpreter.currentCommand();
    const [next, func, ...params] = commandProp.get(command);
    if (next !== null) {
      interpreter._index = next;
      func?.(interpreter, params);
      return true;
    }
    return false;
  };

  //ラベル記録用のMapを作る（数が少ないなら配列が有利かもしれない）
  const makeLabelMap = (list) => {
    //command.codeが118の場合、ラベル名(parameters[0])とindexをペアにして記録
    const map = new Map();
    for (let i = 0; i < list.length; i++) {
      if (list[i].code === 118) {
        map.set(list[i].parameters[0], i);
      }
    }
    labelProp.set(list, map);
    return map;
  };

  //ラベルジャンプ用のインデントまたぎ処理
  const matagiFunc = (interpreter, params) => {
    for (const indent of params[0]) {
      interpreter._branch[indent] = null;
    }
  };

  //コメント
  const commentFunc = (interpreter, params) => {
    interpreter._comment = params[0];
  };
}
