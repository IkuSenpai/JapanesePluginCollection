//=============================================================================
// Mihil_NamedGameVariables.js
//
//=============================================================================
// Copyright (c) 2018- Mihiraghi
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
/*:
 * @plugindesc ゲーム内変数を名前で呼べるように
 * @author Mihigarhi
 * @target MZ

 * @help スクリプトの$gameSwitchesや$gameVariablesで変数を呼び出す/書き込む時に
 * インデックス番号の数値だけでなく変数に設定した名称でも
 * 指定できるようにするプラグインです。
 * 
 * - こんな人におすすめ
 * ・スクリプトでゲーム内変数を呼んだり書き込んだりすることが多い
 * ・インデックス番号だと何番がどの変数だったかすぐ忘れてしまう
 * 　($gameVariables.value(321)って書いてあるけど一体何の変数？)
 *   (=>$gameVariables.value("敵倒した数")だとひと目で何の変数かわかる！)
 * 
 * - メリット
 * ・文字で指定できるようになるので、変数の番号を移動させたとしても
 * 　変数名も一緒に移動させればスクリプト側の変数IDを書き換えなくて良くなります
 * ・変数名を文字列で書くことでGrep(全文検索)がしやすくなります
 * 　もし変数の名前を変えたくなっても、スクリプト側も一括で変更しやすくなります
 * ・setValueで変な値を代入しようとすると警告してくれるおせっかいな機能付き
 * 　→テストプレイ中のみ、変な型の値を代入するとコンソールにエラーが出ます
 * 　　($gameSwitches.setValue()でtrue/false以外の値を代入しようとした時など)
 * 
 * - デメリット
 * ・変数を読むための処理が増えるのでゲームが重くなるかも
 * 　→毎フレーム大量のゲーム内変数を呼び出していたりすると
 * 　　パフォーマンスに影響が出るかもしれません
 * 
 * - つかいかた
 * ・ツクールMVで「スイッチの選択」「変数の選択」ウィンドウから
 * 　変数の名前を設定しましょう
 * ・スクリプトで変数を呼び出す時に、設定した名前で呼び出すことができます
 * 　変数のID3番に「経過日数」と書いたら、スクリプトに
 * 　$gameVariables.value("経過日数")
 * 　と打てば3番の変数を読んでくれます。
 * 
 * - ちゅういてん
 * ！変数名は正確に打ち込まないと探してくれません
 * 　英字なら大文字小文字も間違えないように打ちましょう
 * ！同じ変数名が指定されていると、先に指定した名前が呼び出されてしまいます
 * 　変数名は被らないように書きましょう
 * 　(スイッチと変数で被るのは大丈夫です)
 * 
 * Ver1.1.0 制御文字でも名前で変数を呼べるようになりました。\V[name]
 * Ver1.0.1 $gameSwitches.setValueが動かなかった
 * Ver1.0.0 初版配布
 * 
 */
//-----------------------------------------------------------------------------

(function(){
    //-----------------------------------------------------------------------------
    // 型判定
    //-----------------------------------------------------------------------------
    function isBool(bool){
        return typeof bool === "boolean";
    }
    function isNumber(num){
        return Number.isFinite(num)
    }
    function canCastNumber(value){// 数値に変換可能か。ex.: "123"。true/falseは含まない。
        return isNumber(parseInt(value, 10));
    }
    function isString(str) {
        return (typeof (str) === "string" || str instanceof String);
    }
    function isUndefined(value){
        return typeof value === "undefined";
    }
    
    //-----------------------------------------------------------------------------
    // Game_Switches
    //-----------------------------------------------------------------------------
    const _Game_Switches_value = Game_Switches.prototype.value
    Game_Switches.prototype.value = function(switchId) {
        if(canCastNumber(switchId)){
            return _Game_Switches_value.call(this, switchId);
        } else if(isString(switchId)){
            const index = $dataSystem.switches.findIndex(valName => valName === switchId)
            if(index>=0){ 
                return _Game_Switches_value.call(this, index)
            }
        }
        // どちらも引っかからなかったら
        console.error(`$gameSwitches.valueが検索に引っかかりませんでした。 id=${switchId}`)
    };
    const _Game_Switches_setValue = Game_Switches.prototype.setValue
    Game_Switches.prototype.setValue = function(switchId, value) {
        if(Utils.isOptionValid('test')){
            if(!isBool(value)){
                console.error(`$gameSwitches.setValueで代入する値がtrue/faleではありません。 value=${value}`)
            }
        }
        if(canCastNumber(switchId)){
            return _Game_Switches_setValue.call(this, switchId, value);
        } else if(isString(switchId)){
            const index = $dataSystem.switches.findIndex(valName => valName === switchId)
            if(index>=0){ 
                return _Game_Switches_setValue.call(this, index, value)
            }
        }
        // どちらも引っかからなかったら
        console.error(`$gameSwitches.setValueが検索に引っかかりませんでした。 id=${switchId}`)
    };

    //-----------------------------------------------------------------------------
    // Game_Variables
    //-----------------------------------------------------------------------------
    const _Game_Variables_value = Game_Variables.prototype.value
    Game_Variables.prototype.value = function(variableId) {
        if(canCastNumber(variableId)){
            return _Game_Variables_value.call(this, variableId);
        } else if(isString(variableId)){
            const index = $dataSystem.variables.findIndex(valName => valName === variableId)
            if(index>=0){ 
                return _Game_Variables_value.call(this, index)
            }
        }
        // どちらも引っかからなかったら
        console.error(`$gameVariables.valueが検索に引っかかりませんでした。 id=${variableId}`)
    };
    const _Game_Variables_setValue = Game_Variables.prototype.setValue
    Game_Variables.prototype.setValue = function(variableId, value) {
        if(Utils.isOptionValid('test')){
            if(isUndefined(value)){
                console.error(`$gameVariables.setValueでundefinedを代入しようとしています。 value=${value}`)
            }
        }
        if(canCastNumber(variableId)){
            return _Game_Variables_setValue.call(this, variableId, value);
        } else if(isString(variableId)){
            const index = $dataSystem.variables.findIndex(valName => valName === variableId)
            if(index>=0){ 
                return _Game_Variables_setValue.call(this, index, value)
            }
        }
        // どちらも引っかからなかったら
        console.error(`$gameVariables.setValueが検索に引っかかりませんでした。 id=${variableId}`)
    };


    const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters
    Window_Base.prototype.convertEscapeCharacters = function(text) {
        text = _Window_Base_convertEscapeCharacters.apply(this, arguments)
        text = text.replace(/\x1bS\[(\w+)\]/gi, (_, p1) =>
            $gameSwitches.value(p1)
        );
        text = text.replace(/\x1bV\[(\w+)\]/gi, (_, p1) =>
            $gameVariables.value(p1)
        );
        return text;
    }
    

})();



