//=============================================================================
// NAPI_ItemList.js
//=============================================================================
// Copyright (c) 2021 napiiey
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//-----------------------------------------------------------------------------
// version
// 1.1.0 2021/12/25 MZでDevToolsを操作中もゲームWindowが更新されるように修正
// 1.0.0 2021/12/24 公開
//-----------------------------------------------------------------------------
// Twitter: @napiiey
//-----------------------------------------------------------------------------

/*:
 * @target MV MZ
 * @plugindesc 配布済みアイテム一覧表示プラグイン
 * @author なぴぃ
 * 
 * @help 配布済みアイテムをDevToolsコンソールに一覧表示します。
 * どのアイテムをどこにどれぐらい設置したか確認する為のデバッグ用プラグインです。
 * 一覧はカスタマイズできる他、一覧から設置場所に飛ぶ機能もあります。
 * コモンイベントやスクリプトでのアイテム増減も検知できます。
 * （増減するアイテム等が変数で指定されていたりする場合は検知しません。）
 * 
 * ●使い方
 * プラグインを導入して起動すると自動で全マップを検索しリスト表示します。
 * プラグインパラメーターから表示項目の設定ができます。
 * 
 * 各リスト表示項目の ▶{} の部分をクリックし、中のコマンドをクリックすると
 * アイテムを設置した場所にプレイヤーを移動させる事ができます。
 * 
 * コマンドリスト▶{}という表示の ▶{} の部分をクリックすると
 * リスト表示のコマンド一覧が表示されクリックすると実行します。
 * 
 * PCのスペックやゲームの規模により検索に時間がかかりすぎると
 * すべてのデータが取得できない場合があります。
 * そういった場合はプラグインパラメーターのロード時間を長めに設定すると
 * 改善する場合があります。
 * 
 * 
 * ●ご利用について
 * 本プラグインはMITライセンスの下で公開しています。
 * MITライセンスの内容に従ってご利用下さい。
 * https://napiiey.github.io/plugins/license.html
 * 
 * 
 * @param StartUpAllSerch
 * @text 起動時全サーチ
 * @desc 起動時にアイテム付与イベントの全体サーチを行います。
 * @default true
 * @type boolean
 * 
 * @param StartUpSerchMode
 * @text 起動時サーチモード
 * @desc 起動時に表示するリストを設定します。
 * @type select
 * @option カテゴリー別リスト
 * @option タイプ別リスト1（防具は装備タイプでソート）
 * @option タイプ別リスト2（防具は防具タイプでソート）
 * @option マップID順リスト
 * @default カテゴリー別リスト
 * 
 * @param ExcludeItemReductionEvents
 * @text アイテム減少イベント除外
 * @desc onにするとアイテム減少イベントがリストに表示されなくなります。
 * @default false
 * @type boolean
 * 
 * @param DisplayList
 * @text 表示項目
 * @desc 表示される項目と順番を設定します。MapID,MapName,ItemID,ItemName,Quantity,XY,EvantId,EventName,Page,CommonEvent,Script
 * @default ["マップID","マップ名","ItemID","ItemName","Quantity","XY","EvantId","EventName","Page","EquipType","ItemType","CommonEvent","Script"]
 * @type string[]
 * 
 * @param DisplayLists
 * @text 表示項目
 * @desc 表示される項目と順番を設定します。
 * @default {"item1":"マップID","item2":"マップ名","item3":"アイテムID","item4":"アイテム名","item5":"数量","item6":"座標","item7":"イベントID","item8":"イベント名","item9":"ページ","item10":"装備タイプ","item11":"アイテムタイプ","item12":"コモンイベント","item13":"スクリプト","item14":"","item15":""}
 * @type struct<displayList>
 * 
 * @param BaseColor
 * @text 基本文字色
 * @desc 文字色が設定されてないアイテムの文字色を色名やカラーコードで指定します。CSSが使えます。
 * @default color:gray
 * @type string
 * 
 * @param MapNameColor
 * @text マップ名文字色
 * @desc マップ名の文字色を色名やカラーコードで指定します。CSSが使えます。
 * @default color:#333333
 * @type string
 * 
 * @param EventNameColor
 * @text イベント名文字色
 * @desc イベント名の文字色を色名やカラーコードで指定します。CSSが使えます。
 * @default color:#333333
 * @type string
 * 
 * @param ItemNameBaseColor
 * @text アイテム名基本色
 * @desc アイテム名の基本文字色を色名やカラーコードで指定します。CSSが使えます。
 * @default color:#333333
 * @type string
 * 
 * @param CommonEventColor
 * @text コモンイベント文字色
 * @desc コモンイベントの基本文字色を色名やカラーコードで指定します。CSSが使えます。
 * @default color:white;background:darkkhaki;padding:0px 4px;font-weight:bold
 * @type string
 * 
 * @param ScriptColor
 * @text スクリプト文字色
 * @desc スクリプトの基本文字色を色名やカラーコードで指定します。CSSが使えます。
 * @default color:white;background:cadetblue;padding:0px 4px;font-weight:bold
 * @type string
 * 
 * @param MapNameWidth
 * @text マップ名項目の幅
 * @desc マップ名項目の幅を設定します。
 * @default 20
 * @type number
 * 
 * @param ItemNameWidth
 * @text アイテム名項目の幅
 * @desc アイテム名項目の幅を設定します。
 * @default 14
 * @type number
 * 
 * @param EventNameWidth
 * @text イベント名項目の幅
 * @desc イベント名項目の幅を設定します。
 * @default 7
 * @type number
 * 
 * @param XYWidth
 * @text X座標Y座標項目の幅
 * @desc X座標Y座標項目の幅を設定します。
 * @default 5
 * @type number
 * 
 * @param LoadTime
 * @text ロード時間
 * @desc データが途中までしか読み込めない場合この数値を大きくすると改善する場合があります。
 * @default 60
 * @type number
 */

/*~struct~displayList
 * @param item1 @text 項目1 @type select @default マップID
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item2 @text 項目2 @type select @default マップ名
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item3 @text 項目3 @type select @default アイテムID
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item4 @text 項目4 @type select @default アイテム名
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item5 @text 項目5 @type select @default 数量
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item6 @text 項目6 @type select @default 座標
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item7 @text 項目7 @type select @default イベントID
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item8 @text 項目8 @type select @default イベント名
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item9 @text 項目9 @type select @default ページ
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item10 @text 項目10 @type select @default 装備タイプ
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item11 @text 項目11 @type select @default アイテムタイプ
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item12 @text 項目12 @type select @default コモンイベント
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item13 @text 項目13 @type select @default スクリプト
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item14 @text 項目14 @type select @default 
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 * @param item15 @text 項目15 @type select @default 
 * @option マップID @option マップ名 @option アイテムID @option アイテム名 @option 数量 @option 座標 @option イベントID @option イベント名 @option ページ @option 装備タイプ @option アイテムタイプ @option コモンイベント @option スクリプト
 */



var NAPI = NAPI||{};

(() => {if(Utils.isOptionValid('test')){
'use strict';

const toBoolean=string=>String(string).toLowerCase()==='true';

const param = PluginManager.parameters('NAPI_ItemList');
const pStartUpAllSerch = toBoolean(param['StartUpAllSerch']); //boolean
const pStartUpSerchMode = param['StartUpSerchMode']; //combo srtring
const pExcludeItemReductionEvents = toBoolean(param['ExcludeItemReductionEvents']); //boolean
const pDisplayList = param['DisplayLists'].match(/(?<=\:\s*\")[^\"]+(?=\")/g); //struct array
const pBaseColor = param['BaseColor']; //string
const pMapNameColor = param['MapNameColor']; //string
const pEventNameColor = param['EventNameColor']; //string
const pItemNameColor = param['ItemNameBaseColor']; //string
const pCommonEventColor = param['CommonEventColor']; //string
const pScriptColor = param['ScriptColor']; //string
const pMapNameWidth = Number(param['MapNameWidth']); //number
const pItemNameWidth = Number(param['ItemNameWidth']); //number
const pEventNameWidth = Number(param['EventNameWidth']); //number
const pXYWidth = Number(param['XYWidth']); //number
const pLoadTime = Number(param['LoadTime']); //number

const loadTime=pLoadTime*10;
let startup=pStartUpAllSerch;
let listType=1;

let mapId=0;
let mapName="";
let eventId=0;
let eventName="";
let x=0;
let y=0;
let page=0;
let itemClass=0;
let itemClassName="";
let itypeId=0;
let wtypeId=0;
let atypeId=0;
let etypeId=0;
let itemId=0;
let itemName="";
let quantity=0;
let scriptString="";
let script="";
let commonId="";
let comonLoopCount=0;

const loadAllMap = function() {
    NAPI.dilAllMap=[];
    $dataMapInfos.forEach((e,index)=>{
        if(e!==null){
            NAPI.dilAllMap.push(null);
            const id = e.id;
            const mapName = e.name;
            const xhr = new XMLHttpRequest();
            const num = String(e.id).padZero(3);
            const url = 'data/' + 'Map'+num+'.json';
            let thisMap=0;
            xhr.open('GET', url);
            xhr.overrideMimeType('application/json');
            xhr.onload = function() {
                if (xhr.status < 400) {
                    thisMap = JSON.parse(xhr.responseText);
                    DataManager.onLoad(thisMap);
                    thisMap.mapId=id;
                    thisMap.mapName=mapName;
                    NAPI.dilAllMap[index]=thisMap;
                }
            };
            xhr.send();
        };
    });
};

const goItem = function(mapId, x, y) {
    $gamePlayer._transferring = true;
    $gamePlayer._newMapId = mapId;
    $gamePlayer._newX = x;
    $gamePlayer._newY = y+1;
    this._newDirection = 8;
    this._fadeType = 2;
    $gamePlayer.setDirection(8);
};

const ilShowDevTools = function() {
    const nwjs = require('nw.gui').Window.get();
    nwjs.showDevTools();
};

const commandList=function(){
    const start = {
        get カテゴリー別リストᐅ() {
            callShowList(1);
        },
        get タイプ別リスト1ᐅ() {
            callShowList(2);
        },
        get タイプ別リスト2ᐅ() {
            callShowList(3);
        },
        get マップID順リストᐅ() {
            callShowList(4);
        }
    };
    console.log("%cコマンドリスト%o","color:#333333",start);
};

const timeout=function(){
    if(NAPI.dilAllMap.length>=$dataMapInfos.length){
        serchAllItem();
        if(startup){
            if(pStartUpSerchMode==="カテゴリー別リスト"){listType=1;
            }else if(pStartUpSerchMode==="タイプ別リスト1（防具は装備タイプでソート）"){listType=2;
            }else if(pStartUpSerchMode==="タイプ別リスト2（防具は防具タイプでソート）"){listType=3;
            }else{listType=4;};
            startup=false;
        };
        showList();
    }else{
        setTimeout(timeout,loadTime);
    };
};

const _Scene_Boot_prototype_start=Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    ilShowDevTools();
    setTimeout(commandList,20);
    if(pStartUpAllSerch){
        loadAllMap();
        setTimeout(timeout,loadTime);
    };
    
    _Scene_Boot_prototype_start.apply(this,arguments);
};

const scriptSerch=function(inputScript){
    scriptString=inputScript;
    let reg=new RegExp('\\$gameParty\\.gainItem[\\s\\S]+data(\\w+)s\\D*(\\d+)[^\\-\\d]*([\\-\\d]+)\\)');
    //[\\s\\S]+ 改行含む全ての文字列1字以上 .*0 文字含むあらゆる文字列
    //\\sホワイトスペースのみ\\Sそれ以外 \\w半角英数のみ \\d数字のみ\\Dそれ以外
    const result=reg.exec(scriptString);
    if(result){
        itemClassName=result[1];
        if(itemClassName==="Item"){itemClass=0
        }else if(itemClassName==="Weapon"){itemClass=1
        }else if(itemClassName==="Armor"){itemClass=2};
        itemId=result[2];
        quantity=JSON.parse(result[3]);
        script=true;
    };
};

const codeSerch=function(listProp){
    if(comonLoopCount<100){
        if(listProp.code===126){ //アイテムの増減
            itemClass=0;
        }else if(listProp.code===127){ //武器の増減
            itemClass=1;
        }else if(listProp.code===128){ //防具の増減
            itemClass=2;
        };
        if(listProp.code===126||listProp.code===127||listProp.code===128){
            itemId=listProp.parameters[0];
            quantity=listProp.parameters[3];
            if(listProp.parameters[1]===1){
                quantity=quantity*-1;
            };
        }else if(listProp.code===355){ //スクリプト
            scriptSerch(listProp.parameters[0]);
        }else if(listProp.code===117){ //コモンイベント
            commonId=listProp.parameters[0];
            $dataCommonEvents[commonId].list.forEach(cCode=>{
                codeSerch(cCode);
            });
        };
    };
};

const serchAllItem=function(){
    if(!NAPI.dilSerchAllResult){NAPI.dilSerchAllResult=[]};
    NAPI.dilAllMap.forEach(eMap=>{if(eMap!==null){
        mapId=eMap.mapId;
        mapName=eMap.mapName;
        eMap.events.forEach(eEvent=>{if(eEvent!==null){
            eventId=eEvent.id;
            eventName=eEvent.name;
            x=eEvent.x;
            y=eEvent.y;
            eEvent.pages.forEach((ePage,index) => {
                page=index;
                ePage.list.forEach(eCode=>{
                    codeSerch(eCode);
                    
                    if(itemId){
                        if(itemClass===0){
                            itemClassName="item";
                            itemName=$dataItems[itemId].name;
                            itypeId=$dataItems[itemId].itypeId;
                        };
                        if(itemClass===1){
                            itemClassName="weapon";
                            itemName=$dataWeapons[itemId].name;
                            wtypeId=$dataWeapons[itemId].wtypeId;
                            etypeId=$dataWeapons[itemId].etypeId;
                        };
                        if(itemClass===2){
                            itemClassName="armor";
                            itemName=$dataArmors[itemId].name;
                            atypeId=$dataArmors[itemId].atypeId;
                            etypeId=$dataArmors[itemId].etypeId;
                        };
                        const thisItemData={mapName:mapName,itemName:itemName,mapId:mapId,eventId:eventId,
                            eventName:eventName,x:x,y:y,page:page,itemClass:itemClassName,itemId:itemId,
                            quantity:quantity,itypeId:itypeId,wtypeId:wtypeId,atypeId:atypeId,
                            etypeId:etypeId,commonId:commonId,script:script};

                        NAPI.dilSerchAllResult.push(thisItemData);
                    };
                    itemId=0;
                    itypeId=0;
                    wtypeId=0;
                    atypeId=0;
                    etypeId=0;
                    quantity=0;
                    script=false;
                    commonId=0;
                    comonLoopCount=0;
                });
            });
        }});
    }});
};

const lengthCount= (str) => {
    let len = 0;
    for (let i = 0; i < str.length; i++) {
      (str[i].match(/[ -~]/)) ? len += 1 : len += 2;
    }
    return len;
};

const padSpace=function(strings,length){
    let s=strings;
    while (s.length<length){
        s=' '+s;
    };
    return s;
};

const itemTypes=["アイテムタイプなし","通常アイテム","大事なもの","隠しアイテムA","隠しアイテムB"];

const showItemList=function(itemClass,num){
    NAPI.dilSerchAllResult.forEach(e=>{
        if(!pExcludeItemReductionEvents||pExcludeItemReductionEvents&&e.quantity>0){
            if(e.itemClass===itemClass
                ||itemClass==="all"
                ||itemClass==="iType"&&e.itemClass==="item"&&e.itypeId===num
                ||itemClass==="wType"&&e.itemClass==="weapon"&&e.wtypeId===num
                ||itemClass==="aType"&&e.itemClass==="armor"&&e.atypeId===num
                ||itemClass==="eType"&&e.itemClass==="armor"&&e.etypeId===num
                ){
                let mapName=e.mapName;
                while(lengthCount(mapName)<pMapNameWidth){mapName=mapName+" "};
                let itemName=e.itemName;
                while(lengthCount(itemName)<pItemNameWidth){itemName=itemName+" "};
                let itemType="";
                if(e.itypeId){itemType=itemTypes[e.itypeId];
                }else if(e.wtypeId){itemType=$dataSystem.weaponTypes[e.wtypeId];
                }else if(e.atypeId){itemType=$dataSystem.armorTypes[e.atypeId];}
                let equipType="";
                if(e.etypeId){equipType=$dataSystem.equipTypes[e.etypeId];};
                let quantity="";
                let quantityColor="color:teal";
                if(Number(e.quantity)>0){quantity="+"+e.quantity; quantityColor="color:crimson";
                }else{quantity=e.quantity;};
                let eventName=e.eventName;
                while(lengthCount(eventName)<pEventNameWidth){eventName=eventName+" "};
                let xy="x"+e.x+":y"+e.y;
                while(lengthCount(xy)<pXYWidth){xy=xy+" "};
                let common="",commonEventColor="";
                if(e.commonId){common="common"+e.commonId; commonEventColor=pCommonEventColor;};
                let script="";scriptColor="";
                if(e.script){script="script"; scriptColor=pScriptColor;};
                
    
                const goto = {
                    get クリックでイベントに飛ぶᐅ() {
                        goItem(e.mapId,e.x,e.y)
                    }
                };
                const display=["%c%o"];
                const css=["color:gray",goto];
                const margin="margin-right:6px;"
                pDisplayList.forEach(section=>{
                    const sec=section.toLowerCase();
                    if      (sec==="mapid"||sec==="マップid"){display.push("%c"+e.mapId.padZero(3));css.push(margin+pBaseColor);
                    }else if(sec==="mapname"||sec==="マップ名"){display.push("%c"+mapName);css.push(margin+pMapNameColor);
                    }else if(sec==="itemid"||sec==="アイテムid"){display.push("%c"+e.itemId.padZero(4));css.push(margin+pBaseColor);
                    }else if(sec==="itemname"||sec==="アイテム名"){display.push("%c"+itemName);css.push(margin+pItemNameColor);
                    }else if(sec==="quantity"||sec==="数量"){display.push("%c"+padSpace(quantity,3));css.push(margin+quantityColor);
                    }else if(sec==="xy"||sec==="座標"){display.push("%c"+xy);css.push(margin+pBaseColor);
                    }else if(sec==="eventid"||sec==="イベントid"){display.push("%c"+e.eventId.padZero(4));css.push(margin+pBaseColor);
                    }else if(sec==="eventname"||sec==="イベント名"){display.push("%c"+eventName);css.push(margin+pEventNameColor);
                    }else if(sec==="page"||sec==="ページ"){display.push("%c"+"p."+e.page);css.push(margin+pBaseColor);
                    }else if(sec==="itemtype"||sec==="アイテムタイプ"){display.push("%c"+itemType);css.push(margin+pBaseColor);
                    }else if(sec==="equiptype"||sec==="装備タイプ"){display.push("%c"+equipType);css.push(margin+pBaseColor);
                    }else if(sec==="commonevent"||sec==="コモンイベント"){display.push("%c"+common);css.push(margin+commonEventColor);
                    }else if(sec==="script"||sec==="スクリプト"){display.push("%c"+script);css.push(margin+pScriptColor);};
                });
                const displayMerge=display.join("");
                while(css.length<=16){css.push("")};
                console.log(displayMerge,css[0],css[1],css[2],css[3],css[4],css[5],css[6],css[7],css[8],css[9],css[10],css[11],css[12],css[13],css[14],css[15]);
            };
        };
    });
};

const headDecoration="background:crimson;margin-right:10px;font-size:24px"
const headStyle="color:#333333;margin:20px 0;font-weight:bold;font-size:24px"
const captionStyle="color:white;background:gray;padding:3px 180px;font-weight:bold"

const callShowList=function(type){
    listType=type;
    if(!NAPI.dilSerchAllResult){
        loadAllMap();
        setTimeout(timeout,loadTime);
    }else{
        showList()
    }
};

const showList=function(){
    switch(listType){
        case 1:showSortByCategory();break;
        case 2:showSortByType(1);break;
        case 3:showSortByType(2);break;
        case 4:showSortByMap();break;
    };
};

const showSortByCategory=function(){
    console.log("%c %cカテゴリー別リスト",headDecoration,headStyle);
    console.log("%c●アイテム items",captionStyle);
    showItemList("item");
    console.log("%c●武器 weapons  ",captionStyle);
    showItemList("weapon");
    console.log("%c●防具 armors   ",captionStyle);
    showItemList("armor");
    commandList();
};

const showSortByType=function(type){
    if(type===1){console.log("%c %cタイプ別リスト1",headDecoration,headStyle);
    }else{console.log("%c %cタイプ別リスト2",headDecoration,headStyle);
    };
    
    itemTypes.forEach((e,index)=>{
        if(e!==null){
            console.log("%c●"+e,captionStyle);
            showItemList("iType",index);
        };
    });
    const weaponTypes=$dataSystem.weaponTypes;
    weaponTypes[0]="武器タイプなし";
    weaponTypes.forEach((e,index)=>{
        if(e!==null){
            console.log("%c●"+e,captionStyle);
            showItemList("wType",index);
        };
    });
    
    if(type===1){
        let equipTypes=$dataSystem.equipTypes;
        equipTypes[0]="防具タイプなし";
        equipTypes=equipTypes.filter((e,index)=>index!==1);
        equipTypes.forEach((e,index)=>{
            if(e!==null){
                console.log("%c●"+e,captionStyle);
                showItemList("eType",index);
            };
        });
    }else{
        const armorTypes=$dataSystem.armorTypes;
        armorTypes[0]="防具タイプなし";
        armorTypes.forEach((e,index)=>{
            if(e!==null){
                console.log("%c●"+e,captionStyle);
                showItemList("aType",index);
            };
        });
    };
    commandList();
};

const showSortByMap=function(){
    console.log("%c %cマップID順リスト",headDecoration,headStyle);
    showItemList("all");
    commandList();
};

SceneManager.isGameActive=function(){
    return true;
};


}})();



