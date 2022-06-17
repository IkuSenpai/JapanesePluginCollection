/*:
 * @plugindesc Change of occupation for actors
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help EX_ChangeClass.js
 * 
 * @command changeClassVariable
 * @text Change of occupation for actors
 * @desc Change of occupation for actors
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg ClassId
 * @text ClassId
 * @desc ClassId
 * @type variable
 * @default 1
 * 
 * @arg KeepExp
 * @text KeepExp
 * @desc KeepExp
 * @type boolean
 * @default false
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 指定した変数のアクターIDのアクターの職業の変更します
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @command changeClassVariable
 * @text アクターの職業の変更
 * @desc アクターの職業の変更
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg ClassId
 * @text ClassId
 * @desc ClassId
 * @type variable
 * @default 1
 * 
 * @arg KeepExp
 * @text レベルの保持
 * @desc レベルの保持
 * @type boolean
 * @default false
 * 
 * @help EX_ChangeClass.js
 * 
 * 指定した変数のアクターIDのアクターの職業の変更します
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {
    const pluginName = 'EX_ChangeClass';

    function RYBA_exChangeClass(args,param1,param2){
        const classId = $gameVariables.value(Number(args.ClassId));
        if(!$dataClasses[classId]){
            return;
        }
        const keepExp = eval(args.KeepExp);

        Game_Interpreter.prototype.iterateActorEx(param1, param2, actor => {
            actor.changeClass(classId, keepExp);
        });
    };

    PluginManager.registerCommand(pluginName, 'changeClassVariable', args => {

        const param1 = 1;
        const param2 = Number(args.ActorId);
        
        RYBA_exChangeClass(args,param1,param2);

        return true;
    });


})();