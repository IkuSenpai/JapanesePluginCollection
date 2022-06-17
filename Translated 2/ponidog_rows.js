//=============================================================================
// ponidog_rows.js
// ----------------------------------------------------------------------------
// (C)2020 ぽに犬/ponidog
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//----
//ver 1.1 プラグインコマンドをMZ的に使いやすくした
//ver 1.0 必要だったので作った。
//

(function() {
  
/*:

 *@target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * 
 * @plugindesc message rows

 * @author ponidog
 
 * @help This is a plugin for MZ, not for MV.
 * This plugin changes the number of message display lines.
 * 
 * If you want to change it in-game instead of fixing it, you can use
 * After inserting the number of lines into the specified variable
 * Please execute the plugin command.
 * (If you change only variables, the change will not be reflected until the map is switched.
 * If you want to restore the default value, set the specified variable to 0 or less.
 * 
 * To use it as a plug-in command for the MV specification, do the following.
 * setRows ???
 * If only setRows is used, only the screen is reflected.
 * ex)
 * setRows 5
 * setRows \V[2]
 * setRows 0

 * @param DefaultRows
 * @desc default line count
 * @default 6
 * @type number

 * @param setRowsVariables
 * @desc Variable number used for the maximum number of lines displayed.
 * @default 0
 * @type number

 * @command setValueAndGo
 * @text Assign the number of line breaks to a variable and reflect it immediately.
 * @desc line = ???
 * 
* @arg arg0
* @text Number of line changes
* @desc number  or \V[x]

 * @command setRows
 * @text Reflect line feeds on screen
 * @desc Set the variable and then execute it.
 * If you don't do this, it will be reflected the next time you load the map.
 * 
 * @command setValue
 * @text $gameVariables.setValue(,  ????  )
 * @desc variable set. After this, run the change command.
 * 
* @arg arg0
* @text Number of line changes
* @desc number  or \V[x]
*/


/*:ja

 *@target MZ
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase

 * @plugindesc message rows 改行数変更

 * @author ponidog
 * @url https://twitter.com/ponidog
 * 
 * @help MZのプラグインです。MVには対応していません。
 * メッセージの最大表示行数を変更します。
 * 
 * 固定ではなくゲーム中に変更したい場合は
 * 指定した変数に行数を入れたあとに
 * プラグインコマンドを実行してください。
 * （変数だけを変更した場合はマップが切り替わるまで反映されない為）
 * 　デフォルト値に戻したい場合は指定した変数を０以下にして下さい。
 * 
 * MV的なプラグインコマンド記述で使う場合は
 * setRows 行数
 * 画面反映をします。setRows だけの場合は画面反映のみを行います。
 * ex)
 *  setRows 5
 *  setRows \V[2]
 * setRows 0

 * @param DefaultRows
 * @desc デフォルト行数
 * @default 6
 * @type number

 * @param setRowsVariables
 * @desc 最大表示行数につかう変数番号。
 * @default 0
 * @type number

 * @command setValueAndGo
 * @text 改行数を変数に代入して即反映
 * @desc 変数に数値をいれます。
 * 
* @arg arg0
* @text 改行数
* @desc \V[1]など制御文字も可能です。

 * @command setRows
 * @text 改行を画面反映させる
 * @desc 変数をセットした後に実行します。
 * 実行しない場合は次にマップを読み込み時に反映されます。
 * 
 * @command setValue
 * @text 行数を変数に代入
 * @desc 変数に数値をいれます。この後に変更のコマンドを実行してください。
 * 
* @arg arg0
* @text 改行数
* @desc \V[1]など制御文字も可能です。
 * 
 */

"use strict";
const  pluginName = "ponidog_rows";
let parameters = PluginManager.parameters('ponidog_rows');




//デフォルト行数
let nDefaultRows = Number(parameters['DefaultRows'] || 6);

//改行
let nSetRowsVariables =  Number(parameters['setRowsVariables']);


//行数設定
Scene_Message.prototype.numVisibleRows = function() {
    var nRows = parseInt( $gameVariables.value( nSetRowsVariables ) ) ;//
    if(nRows>0)return nRows;
    return nDefaultRows;
};


//上書き
Scene_Message.prototype.messageWindowRect = function() {
    const ww = Graphics.boxWidth;
    let nRows = this.numVisibleRows();
    let wh = this.calcWindowHeight(nRows , false) + 8  ;
    const wx = (Graphics.boxWidth - ww) / 2;
    const wy = 0;
    return new Rectangle(wx, wy, ww, wh);
};

  //=============================================================================
  // Game_Interpreter_pluginCommand
  //  プラグインコマンドが実行されたときに処理されます
  //=============================================================================

    //やってる処理について
    //ウィンドウの大きさ等はマップ切替時に作られるので
    //フェードなしでそのままマップ切り替えする処理を行っている。
    
    PluginManager.registerCommand(pluginName, 'setRows', function(args) {
        $gamePlayer._fadeType=2; 
        SceneManager.goto(Scene_Map);
    });


    PluginManager.registerCommand(pluginName, 'setValueAndGo', function(args) {
      let nSetNum = parseInt( PluginManagerEx.convertVariables( args.arg0));
      $gameVariables.setValue( nSetRowsVariables , nSetNum) ;//
      $gamePlayer._fadeType=2; 
      SceneManager.goto(Scene_Map);
  });
    
    PluginManager.registerCommand(pluginName, 'setValue', function(args) {
      let nSetNum = parseInt( PluginManagerEx.convertVariables( args.arg0));
      $gameVariables.setValue( nSetRowsVariables , nSetNum) ;//
  });


  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
   

        if ( (command)  === 'setRows') {
          debugger;
          if(args.length > 0) {
            let nSetNum = parseInt( PluginManagerEx.convertVariables( args[0]));
            $gameVariables.setValue( nSetRowsVariables , nSetNum) ;//
          }

            $gamePlayer._fadeType=2;
            SceneManager.goto(Scene_Map);

        }//comannd
  }
  //=============================================================================




})();