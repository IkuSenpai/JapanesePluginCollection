//=============================================================================
// Mihil_RandomEvent.js
//=============================================================================
// Copyright (c) 2018- Mihiraghi
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc 選択肢からランダムにイベントを選択します
 * @author Mihiraghi
 * @target MZ
 * @Thanks 
 * 
 * @command Activation
 * @text activate random events
 * @desc ランダムイベントを起動します。プラグインコマンド直下に選択肢を置いてください。
 * 
 * 
 * @help 
 * 「選択肢の表示」コマンドの中からランダムにイベントを実行します。
 * プラグインコマンド Mihil_RandomEvent > activate random events
 * を配置した後、すぐしたに「選択肢の表示」コマンドを置いてください。
 * 
 * 町のモブにランダムなパターンで話させたい場合などに有用です。
 * 
 * MPP_ChoiceEXでif文を書けば、イベントの発生を制御できます。
 * (工夫すれば乱数による確率の重み付けもできそう
 * 機会があれば重み付けも実装します)
 * 
 * 
 * ※コードレビュー歓迎します。
 * Please feel free to throw me Masakari!
 * 
 * Ver1.0.2 helpを加筆
 * Ver1.0.1 PluginManagerEx.registerCommandの書き方を修正
 * Ver1.0.0 配布
 * Ver0.0.0 仮作成
 * 
 */


(function() {
    'use strict';
    
const pluginName = document.currentScript.src.replace(/^.*\/(.*).js$/, function () {
    return arguments[1];
});

PluginManagerEx.registerCommand(document.currentScript, "Activation", function(args){
    this.turnRandomEvent(true)
});

const _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices
Game_Interpreter.prototype.setupChoices = function(params) {
    _Game_Interpreter_setupChoices.apply(this, arguments)
    this.startRandomEvent()
}

Game_Interpreter.prototype.turnRandomEvent = function(bool){
    this._standbyRandomEvent = bool;
}
Game_Interpreter.prototype.startRandomEvent = function(){
    if(!this._standbyRandomEvent){ return; }
    const choiceListWindow = SceneManager._scene._choiceListWindow
    choiceListWindow._index = this.lotteryRandomEvent()
    choiceListWindow.callOkHandler()

    this.turnRandomEvent(false)
}
Game_Interpreter.prototype.lotteryRandomEvent = function(){
    return Math.rand($gameMessage._choices.length-1)
}


})();
