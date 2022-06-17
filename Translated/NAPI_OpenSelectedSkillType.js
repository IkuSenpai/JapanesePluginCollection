//=============================================================================
// NAPI_OpenSelectedSkillType.js
//=============================================================================
// Copyright (c) 2021 napiiey
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//-----------------------------------------------------------------------------
// version
// 1.1.0 2022/01/05 スキルタイプメニューを隠すオプション追加
// 1.0.1 2022/01/05 メンバーIndexで指定できないバグを修正
// 1.0.0 2022/01/04 公開
//-----------------------------------------------------------------------------
// Twitter: @napiiey
//-----------------------------------------------------------------------------

/*:
 * @target MV MZ
 * @plugindesc 指定スキルタイプメニューを開くプラグイン
 * @author なぴぃ
 * 
 * @help 指定スキルタイプのメニューをプラグインコマンドにより直接開きます。
 * 
 * 
 * ●使い方
 * プラグインコマンドでアクターとスキルタイプを選択してメニューを開きます。
 * アクターはアクターIDとパーティーの並び順（Index）2通りの方法で指定できます。
 * スキルタイプもスキルタイプIDとメニューでの並び順2つの指定方法が利用できます。
 * 
 * 
 * ●プラグインコマンド
 * MZの場合はプラグインコマンドの説明に従って下さい。
 * 
 * MVでの指定方法
 * 指定スキルタイプメニュー パラメーター1 パラメーター2
 * の形で指定します。
 * パラメーター1には メンバーIndex、アクターID
 * パラメーター2には スキルタイプIndex、スキルタイプID が利用できます。
 * 各項目を半角スペースで区切り、数値は:（半角コロン）で区切って入力して下さい。
 * 
 * 　例1）先頭のメンバーのスキルタイプID1を開きたい場合
 * 　指定スキルタイプメニュー メンバーIndex:0 スキルタイプID:1
 * 
 * 　例2）ID2のアクターの1番上のスキルタイプを開きたい場合
 * 　指定スキルタイプメニュー アクターID:2 スキルタイプIndex:0
 * 
 * 
 * ●スクリプトでの利用（上級者向け）
 * プラグインコマンドの代わりにスクリプトとして実行する事ができます。
 * 
 * 利用できるプロパティ利用例
 * NAPI.osstActorId=2; //アクターID2番
 * NAPI.osstActorId=$gameParty.allMembers()[0].actorId() //並び順先頭のアクター
 * NAPI.osstSkillTypeId=2; //スキルタイプID2
 * NAPI.osstSkillTypeIndex=0; //1番上のスキルタイプIndex
 * 
 * 上記のいずれか2つのスクリプトでアクターとスキルタイプを指定後以下の関数を実行して下さい。
 * NAPI.OpenSelectedSkillType()
 * 
 * 
 * ●ご利用について
 * 本プラグインはMITライセンスの下で公開しています。
 * MITライセンスの内容に従ってご利用下さい。
 * https://napiiey.github.io/plugins/license.html
 * 
 * 
 * @command OpenSelectedSkillType
 * @text 指定スキルタイプメニュー
 * @desc 指定スキルタイプのメニューを直接開きます。
 *
 * @arg memberIndex
 * @text メンバーIndex
 * @desc メニューを開くアクターをパーティーメンバー順で指定します。（0で1番上のアクター）
 * @type number
 * @default 0
 * 
 * @arg actorId
 * @text アクターID
 * @desc メニューを開くアクターをアクターIDで指定します。0でメンバーインデックス優先。それ以外はこちら優先。
 * @type actor
 * @default 0
 * 
 * @arg skillTypeIndex
 * @text スキルタイプIndex
 * @desc メニューを開くスキルタイプのIndexを指定します。（1番の項目が0）
 * @type number
 * @default 0
 * 
 * @arg skillTypeId
 * @text スキルタイプID
 * @desc メニューを開くスキルタイプを指定します。0でスキルタイプIndex優先。
 * @type number
 * @default 0
 * 
 * @param HideSkillType
 * @text スキルタイプメニューを隠す
 * @desc ONにするとスキルタイプ一覧を隠します。キャンセル時はスキルタイプ選択に戻らず終了します。
 * @default false
 * @type boolean
 */

if(!window.NAPI){window.NAPI={}}

(() => {
'use strict';

const pluginName='NAPI_OpenSelectedSkillType';
const param = PluginManager.parameters(pluginName);
const pHideSkillType = param['HideSkillType']; //boolean(string

let directOpen=false;
NAPI.osstActorId=0;
NAPI.osstSkillTypeId=0;
NAPI.osstSkillTypeIndex=0;
let skillTypeWindowWidth=0;


const _Game_Interpreter_prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_prototype_pluginCommand.apply(this,arguments);
    if(command==="OpenSelectedSkillType"||command==="指定スキルタイプメニュー"){
        let rawArgs=args;
        const pluginArgs=rawArgs.map(e=>e.split(":"));
        pluginArgs.forEach(e=>{
            if(e[0].toLowerCase()==="actor"||e[0]==="アクターID"){NAPI.osstActorId=Number(e[1])};
            if(e[0].toLowerCase()==="member"||e[0]==="メンバーIndex"){NAPI.osstActorId=$gameParty.allMembers()[Number(e[1])].actorId()};
            if(e[0].toLowerCase()==="type"||e[0]==="スキルタイプID"){NAPI.osstSkillTypeId=Number(e[1])};
            if(e[0].toLowerCase()==="typeindex"||e[0]==="スキルタイプIndex"){NAPI.osstSkillTypeIndex=Number(e[1])};
        });
        NAPI.OpenSelectedSkillType();
    }
};

if(Utils.RPGMAKER_NAME==="MZ"){
    PluginManager.registerCommand(pluginName,"OpenSelectedSkillType",args => {
        NAPI.osstActorId=$gameParty.allMembers()[Number(args.memberIndex)].actorId();
        if(Number(args.actorId)){NAPI.osstActorId=Number(args.actorId)};
        NAPI.osstSkillTypeId=Number(args.skillTypeId);
        NAPI.osstSkillTypeIndex=Number(args.skillTypeIndex);
        NAPI.OpenSelectedSkillType();
    });
};

NAPI.OpenSelectedSkillType=function(){
    directOpen=true;
    if(NAPI.osstSkillTypeId){
        const actor=$gameActors.actor(NAPI.osstActorId);
        let skillTypeArray=actor.addedSkillTypes();
        if(Utils.RPGMAKER_NAME==="MZ"){
            skillTypeArray=actor.skillTypes();
        };
        NAPI.osstSkillTypeIndex=skillTypeArray.indexOf(NAPI.osstSkillTypeId);
    };
    $gameParty._menuActorId=NAPI.osstActorId;
    SceneManager.push(Scene_Skill);
};

const _Scene_Skill_prototype_start=Scene_Skill.prototype.start;
Scene_Skill.prototype.start = function() {
    _Scene_Skill_prototype_start.apply(this,arguments);
    if(directOpen){
        this._skillTypeWindow.select(NAPI.osstSkillTypeIndex);
        if(pHideSkillType==="true"){
            this._skillTypeWindow.hide();
            const wx = 0;
            const wy = this._helpWindow.height;
            const ww = Graphics.boxWidth;
            const wh = this._skillTypeWindow.height;
            this._statusWindow.move(wx, wy, ww, wh);
            skillTypeWindowWidth=this._skillTypeWindow.width;
        }else{
            this._skillTypeWindow.deactivate();
        };
        this.commandSkill();
        directOpen=false;
    };
};




})();



