//=============================================================================
// Plugin for RPG Maker MV/MZ
// GR_SemifixedRandomNumber.js
// ----------------------------------------------------------------------------
// Released under the MIT License.
// https://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 1.0.2
//=============================================================================
/*:ja
 * @target MV MZ
 * @plugindesc イベントで使用する乱数を事前に100個分だけ記憶し固定します
 * @author げれげれ
 * @url https://twitter.com/geregeregere
 *
 * @command GET_RANDOM
 * @text 乱数取得
 * @desc 乱数を取得し、ゲーム変数へ代入します
 *
 * @arg VariablesScope
 * @type boolean
 * @on 単独
 * @off 範囲
 * @text 変数指定
 * @desc 乱数を代入するゲーム変数の指定
 * @default true
 *
 * @arg StartId
 * @type number
 * @text 変数番号/開始番号
 * @desc 「単独」で乱数を代入する変数番号、
 * または「範囲」指定の開始となる変数番号
 * @default 1
 * @min 1
 *
 * @arg EndId
 * @type number
 * @text 終了番号
 * @desc 「範囲」指定の終了となる変数番号
 * （「単独」選択時はこの値は無視されます）
 * @default 1
 * @min 1
 *
 * @arg StartValue
 * @type number
 * @text 開始値
 * @min -999999999999
 * @desc 乱数の開始値
 * @default 0
 *
 * @arg EndValue
 * @type number
 * @text 終了値
 * @min -999999999999
 * @desc 乱数の終了値
 * @default 0
 *
 *
 * @help
 * 乱数を事前に100個分生成し、セーブデータに記録します。
 * 記録された乱数はプラグインコマンドから取得してゲーム変数へ代入できます。
 * 生成された乱数はセーブデータに記録されているので、
 * リセット＞再開しても必ず同じ結果となります。
 * （つまりはリセット技対策）
 *
 * 乱数の取得はプラグインコマンドよりゲーム変数への代入として行います。
 * 四則演算等はイベントコマンド「変数の操作」より行ってください。
 * なお、ゲーム変数の指定は「単独」「範囲」の二通りで行えます。
 *
 * 得られる乱数は「開始値」と「終了値」の間の整数となります。
 * 小数は扱えません。これはツクールのゲーム変数側の仕様です。
 * （イベントコマンドの「変数の操作」と同じです）
 *
 * また、初回の乱数呼び出し時に配列の初期化、保存を行う仕様ですので、ゲーム開始時に一度、
 * プラグインコマンドによる乱数呼び出しを行うことで乱数配列をセットできます。
 *
 */

(() => {
  'use strict';
  const PLUGIN_NAME = 'GR_SemifixedRandomNumber';
  const COMMAND = 'GET_RANDOM';
  //MV用プラグインコマンドパラメータ名
  const COMMAND_PARAMETERS = ['VariablesScope', 'StartId', 'EndId', 'StartValue', 'EndValue'];

  //プラグインパラメータ=================================================
  //なし

  //プラグインコマンド===================================================
  //MV
  const Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function (command, args) {
    Game_Interpreter_pluginCommand.call(this, command, args);
    if (command.toUpperCase() === COMMAND) runProcess(args);
  };

  //MZ
  if (Utils.RPGMAKER_NAME === 'MZ') {
    PluginManager.registerCommand(PLUGIN_NAME, COMMAND, (args) => {
      runProcess(args);
    });
  }

  //実処理==============================================================
  function runProcess(args) {
    const parsedArgs = parseParams(args);
    setRandomNumbers(parsedArgs);
  }

  function parseParams(args) {
    const parsedArgs = {};
    if (Utils.RPGMAKER_NAME === 'MZ') {
      for (let [key, value] of Object.entries(args)) {
        parsedArgs[key] = JSON.parse(value);
      }
    } else {
      COMMAND_PARAMETERS.forEach((paramName, index) => {
        parsedArgs[paramName] = JSON.parse(args[index]);
      });
    }
    return parsedArgs;
  }

  function setRandomNumbers(args) {
    const { VariablesScope, StartId, EndId, StartValue, EndValue } = args;
    if (VariablesScope) {
      setGameVariable(StartId, StartValue, EndValue);
    } else {
      let variableCount = EndId - StartId;
      if (variableCount < 0) variableCount = 0;
      for (let i = 0; i < variableCount + 1; i++) {
        setGameVariable(StartId + i, StartValue, EndValue);
      }
    }
  }

  function makeRandomArray() {
    $gameSystem._randomArray = [];
    for (let i = 0; i < 100; i++) {
      $gameSystem._randomArray.push(Math.random());
    }
  }

  function getRandomNumber() {
    if (!$gameSystem._randomArray) makeRandomArray(); //配列が未初期化なら初期化
    const arr = $gameSystem._randomArray;
    arr.push(Math.random());
    return arr.shift();
  }

  function getNumber(startValue = 0, endValue = 0) {
    const diff = Math.abs(endValue - startValue);
    return Math.min(startValue, endValue) + getRandomNumber() * (diff + 1);
  }

  function setGameVariable(id, startValue, endValue) {
    const value = getNumber(startValue, endValue);
    $gameVariables.setValue(id, value);
  }
})();
