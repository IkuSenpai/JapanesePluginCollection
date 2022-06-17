//=============================================================================
// FastMZTimer.js
// ----------------------------------------------------------------------------
// (C)2021 unaunagi
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/01/31 初版
// 1.0.1 2021/02/02 表示をもう少しわかりやすくした
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/unaunagi1/
// [GitHub] : https://github.com/unaunagi/
//=============================================================================
/*:
 * @plugindesc FastMZ Timer
 * @target MZ
 * @author unaunagi
 * @url https://github.com/unaunagi/FastMZ
 *
 * @command timerstart
 * @text Timer start
 *
 * @command timerstop
 * @text Timer stop
 *
 * @command timerstop_string
 * @text Timer stop to variable
 *
 * @arg variable
 * @type variable
 * @text Target variable
 *
 * @help Examine the performance of your game.
 *
 * // (C)2021 unaunagi
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @plugindesc FastMZ Timer 処理時間測定用
 * @target MZ
 * @author うなうなぎ
 * @url https://github.com/unaunagi/FastMZ
 *
 * @command timerstart
 * @text 処理時間の測定開始
 * @desc performance.now() を使った時間計測を始めます。
 *
 * @command timerstop
 * @text 処理時間の測定終了してメッセージ表示
 * @desc 測定時間をメッセージウィンドウに表示。メッセージ関係を改変するプラグインあると動かないかも。
 *
 * @command timerstop_string
 * @text 測定時間を指定した変数に記録
 * @desc 測定結果を文字列として変数に保存します。あとでまとめて表示したり、加工したい時用。
 *
 * @arg variable
 * @type variable
 * @text 保存用の変数を指定
 * @desc 測定結果を保存する変数を指定してください。
 *
 * @help 実際にどれぐらいの時間がかかっているか計測するためのプラグインです。
 * 計測の開始と終了でプラグインコマンドを使うことで、ストップウォッチで測るみたいな感じに出来ます。
 * 単位はミリ秒で、1000ミリ秒=1秒です。
 *
 * 他のプラグインに依存せず、単体で導入できるプラグインです。
 *
 * ■利用規約
 *
 * (C)2021 unaunagi
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 *
 * MITライセンスということ以外に制限はありません。
 * 商用利用や18禁作品での使用についても当然問題ありません。
 */

"use strict";
{
  const pluginName = "FastMZTimer";

  //処理時間計測用
  PluginManager.registerCommand(pluginName, "timerstart", () => {
    timerStart();
  });

  //処理時間計測終了_メッセージ版
  PluginManager.registerCommand(pluginName, "timerstop", function () {
    //メッセージウィンドウの呼び出し
    $gameMessage.add("計測結果(単位 ミリ秒)");
    $gameMessage.add(String(timerStop()));
    this.setWaitMode("message");
  });

  //処理時間計測終了_文字列版
  //あとでまとめて表示するとかしたい時用
  PluginManager.registerCommand(pluginName, "timerstop_string", (args) => {
    const v = args["variable"];
    if (v) $gameVariables.setValue(v, String(timerStop()));
  });

  let startTime = 0;
  const timerStart = () => (startTime = performance.now());
  const timerStop = () => performance.now() - startTime;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const timerStopConsole = () => console.log(performance.now() - startTime);
}
