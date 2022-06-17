/*:
 * @plugindesc Join or remove actors with specified IDs
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help PartyMember.js
 * 
 * @command set
 * @text Subscribing actors with designated IDs
 * @desc Subscribing actors with designated IDs
 *
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 0
 * 
 * @arg Initialize
 * @text Initialize
 * @desc Whether or not to initialize when you join.
 * @type boolean
 * @default false
 *
 * @command reset
 * @text Remove the actor with the specified ID.
 * @desc Remove the actor with the specified ID.
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 0
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 指定IDのアクターを加入または外します
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @command set
 * @text 指定IDのアクターを加入
 * @desc 指定IDのアクターを加入します
 *
 * @arg ActorId
 * @text アクターIDの変数ID
 * @desc アクターIDの変数ID
 * @type variable
 * @default 0
 * 
 * @arg Initialize
 * @text 初期化
 * @desc 加入時に初期化するかどうか
 * @type boolean
 * @default false
 *
 * @command reset
 * @text 指定IDのアクターを外す
 * @desc 指定IDのアクターを外します
 * 
 * @arg ActorId
 * @text アクターIDの変数ID
 * @desc アクターIDの変数ID
 * @type variable
 * @default 0
 * @desc アクターのID
 * 
 * @help PartyMember.js
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 * 
 * 要するに割と自由です。
 */

(() => {
    const pluginName = 'PartyMember';

   PluginManager.registerCommand(pluginName, 'set', args => {
     let valueId = Number(args.ActorId || 0);
     let actorId = $gameVariables.value(valueId);
     let isAdd = 0;
     let init = args.Initialize === 'true';

     let params = [actorId,isAdd,init];

     //console.log('actor : ' + actorId + ' init:' + init);

     Game_Interpreter.prototype.command129(params);
   });
 
   PluginManager.registerCommand(pluginName, 'reset', args => {
    let valueId = Number(args.ActorId || 0);
    let actorId = $gameVariables.value(valueId);
    let isAdd = 1;

    //console.log('actor : ' + actorId + ':');

    let params = [actorId,isAdd];

    Game_Interpreter.prototype.command129(params);
   });

 })();
 
