//=============================================================================
// NAPI_AutoFaceGraphic.js
//=============================================================================
// Copyright (c) 2021 napiiey
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//-----------------------------------------------------------------------------
// version
// 2.0.0 2021/12/26 MZ対応 文章内の名前をMZの名前枠に表示する機能を追加
// 1.1.1 2021/11/24 名前の一部が一致したキャラが一致した扱いになってしまう不具合を修正
// 1.1.0 2021/11/22 プラグイン無効化スイッチの追加
// 1.0.0 2021/11/22 公開
//-----------------------------------------------------------------------------
// Twitter: @napiiey
//-----------------------------------------------------------------------------

/*:
 * @target MV MZ
 * @plugindesc 顔グラ自動表示プラグイン
 * @author なぴぃ
 * 
 * @help 文章の表示で文章に含まれた名前に応じて自動で顔画像を表示します。
 * 表情キーを設定する事で表情も指定できます。
 * MZの場合文章内に書いた名前を名前枠に移す事ができます。
 * 
 * 
 * ●使い方
 * 顔画像リストで呼び出したい画像を設定します。
 * 文章の表示コマンドで
 * 
 * 　　名前「本文
 * 
 * の形式で入力します。
 * 
 * 　　例）
 * 　　ハロルド「自動で画像を表示するぞ！
 * 
 * すると名前に対応した画像が自動で表示されます。
 * 
 * 
 * ●表情の変更
 * 表情差分を含んだ画像を顔画像リストで登録します。
 * 表情キーリストで表情を呼び出すキーとなる文字を設定します。
 * 
 * 　　名前 表情キー「本文
 * 
 * の形式で入力します。
 * 
 * 　　例）
 * 　　ハロルド怒「自動で"怒"キーを設定したインデックスの画像を表示するぞ！
 * 
 * プレイ時には表情キーは表示されず以下のように表示されます。
 * 
 * 　　ハロルド「自動で"怒"キーを設定したインデックスの画像を表示するぞ！
 * 
 * 
 * ●スクリプト等で利用できる情報（上級者向け）
 * 文章の表示並列コモンスイッチプラグイン等を使ったコモンイベントで利用できる情報です。
 * 
 * NAPI.afgFaceImage　顔画像のファイル名
 * NAPI.afgFaceIndex　顔画像のインデックス
 * NAPI.afgBackground　ウィンドウ背景（0.ウィンドウ 1.暗くする 2.透明）
 * NAPI.afgPositionType　ウィンドウの位置（0.上 1.中 2.下）
 * NAPI.afgName　名前
 * NAPI.afgSpeakerName　MZの名前ウィンドウに表示される名前（MZで名前表示欄に表示をONにした場合のみ利用できます）
 * 
 * 文章の表示並列コモンスイッチプラグインと併用する場合はこのプラグインを上にして下さい。
 * 
 * 
 * ●ご利用について
 * 本プラグインはMITライセンスの下で公開しています。
 * MITライセンスの内容に従ってご利用下さい。
 * https://napiiey.github.io/plugins/license.html
 * 
 * 
 * @param Delimiter
 * @text 名前と本文を区切る記号
 * @desc 文章の表示の文章入力時に名前と本文を区切る記号を指定します。
 * @default 「
 * @type string
 * 
 * @param FaceGraphicList
 * @text 顔画像リスト
 * @desc 顔グラを 名前:ファイル名:標準インデックス（左上から右に0-3）の形で指定します。改行を挟み複数入力できます。(:は半角)
 * @default "ハロルド:Actor1:0\nテレーゼ:Actor1:7"
 * @type note
 * 
 * @param FacialExpressionKeyList
 * @text 表情キーリスト
 * @desc 表情を呼び出すキーとなる文字を設定します。行数がインデックスに対応しています。（左上から右に0-3、左下から右に4-7）
 * @default "常\n喜\n怒\n哀\n楽\n苦\n攻\n驚\n"
 * @type note
 * 
 * @param HideFaceGraphicKey
 * @text 顔画像非表示キー
 * @desc 顔画像を非表示にする為のキーとなる文字を設定します。
 * @default 無
 * @type string
 * 
 * @param PluginDisableSwitch
 * @text プラグイン無効化スイッチ
 * @desc ここで設定したスイッチがONになっている間このプラグインが無効になります。
 * @default 0
 * @type switch
 * 
 * @param ShowInNameWindow
 * @text 名前表示欄に表示（MZ用）
 * @desc 文章内の名前をMZの名前表示欄に表示します。
 * @default true
 * @type boolean
 * 
 */

if(!window.NAPI){window.NAPI={}}

(() => {
'use strict';

const param = PluginManager.parameters('NAPI_AutoFaceGraphic');
const pDelimiter = param['Delimiter']; //string
const pFaceGraphicList = param['FaceGraphicList']; //note
const pFacialExpressionKeyList = param['FacialExpressionKeyList']; //note
const pHideFaceGraphicKey = param['HideFaceGraphicKey']; //string
const pPluginDisableSwitch = Number(param['PluginDisableSwitch']) //switch(number
const pShowInNameWindow = param['ShowInNameWindow']; //boolean(string

let faceList=pFaceGraphicList
faceList=faceList.slice(1,faceList.length-1);
faceList=faceList.split(/\\n/g);
faceList=faceList.map(function(value){return value.split(/:/g)});

let keyList=pFacialExpressionKeyList
keyList=keyList.slice(1,keyList.length-1);
keyList=keyList.split(/\\n/g);
keyList=keyList.filter(e=>e!=="");

const _Game_Interpreter=Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101=function(params) {
	if(!$gameMessage.isBusy()){
        if(Utils.RPGMAKER_NAME==="MZ"){
            NAPI.afgFaceImage=params[0];
            NAPI.afgFaceIndex=params[1];
            NAPI.afgBackground=params[2];
            NAPI.afgPositionType=params[3];
            NAPI.afgSpeakerName=params[4];
            NAPI.afgName=params[4];
        }else if(Utils.RPGMAKER_NAME==="MV"){
            NAPI.afgFaceImage=this._params[0];
            NAPI.afgFaceIndex=this._params[1];
            NAPI.afgBackground=this._params[2];
            NAPI.afgPositionType=this._params[3];
            NAPI.afgSpeakerName="";
            NAPI.afgName="";
        };
        const editorFaceImage=NAPI.afgFaceImage;
        const editorName=NAPI.afgSpeakerName;
        if(!$gameSwitches.value(pPluginDisableSwitch)){ //顔グラがない場合＆無効化スイッチがONになってない場合
            let firstLine=this._list[this._index+1].parameters[0];
            firstLine=this.afgConvertFirstLine(firstLine);
            if(Utils.RPGMAKER_NAME==="MZ"){
                if(!editorFaceImage){
                    params[0]=NAPI.afgFaceImage;
                    params[1]=NAPI.afgFaceIndex;
                }
                
            }else if(Utils.RPGMAKER_NAME==="MV"){
                if(!editorFaceImage){
                    this._params[0]=NAPI.afgFaceImage;
                    this._params[1]=NAPI.afgFaceIndex;
                }else{
                    NAPI.afgFaceImage=this._params[0];
                    NAPI.afgFaceIndex=this._params[1];
                }
            };
            this._list[this._index+1].parameters[0]=firstLine;
            if(Utils.RPGMAKER_NAME==="MZ"&&!editorName){
                params[4]=NAPI.afgSpeakerName;
            };
        };
		const result=_Game_Interpreter.apply(this, arguments);
		return result;
	}else{
		return false;
	};
};

Game_Interpreter.prototype.afgConvertFirstLine=function(firstLine){
    const reg=new RegExp('([^\\n]+)'+pDelimiter);
    const result=firstLine.replace(reg,function(){
        let nameAndIndex=arguments[1];
        let name=nameAndIndex;
        faceList.forEach(value=>{
            if(nameAndIndex.indexOf(value[0])===0){
                const thisIndex=nameAndIndex.replace(value[0],function(){
                    return "";
                });
                name=value[0];
                NAPI.afgFaceImage=value[1];
                NAPI.afgFaceIndex=Number(value[2]);
                let keyMatching=false;
                keyList.forEach((key,index)=>{
                    if(thisIndex===key){
                        NAPI.afgFaceIndex=index;
                        keyMatching=true;
                    }
                });
                if(thisIndex===pHideFaceGraphicKey){
                    NAPI.afgFaceImage="";
                    NAPI.afgFaceIndex=0;
                    keyMatching=true;
                };
                if(thisIndex!==""&&!keyMatching){
                    name=nameAndIndex;
                    NAPI.afgFaceImage="";
                    NAPI.afgFaceIndex=0;
                };
            };
        });
        let nameAndDelimiter=name+pDelimiter;
        if(Utils.RPGMAKER_NAME==="MZ"&&pShowInNameWindow==="true"){
            NAPI.afgSpeakerName=name;
            nameAndDelimiter="";
        };
        if(name){NAPI.afgName=name};
        return nameAndDelimiter;
    });
    return result;
};



})();



