/*:
 * @plugindesc Acquire or forget the skill of a given variable's skill ID
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help EX_ChangeSkill.js
 * 
 * @command changeSkill
 * @text Acquire or forget the skill of a given variable's skill ID
 * @desc Acquire or forget the skill of a given variable's skill ID
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg SkillId
 * @text skillId
 * @desc skillId
 * @type variable
 * @default 0
 * 
 * @arg IsLearn
 * @text IsLearn
 * @desc IsLearn
 * @type boolean
 * @default true
 * 
 * @command changeSkillVariable
 * @text Acquire or forget the skill of a given variable's skill ID
 * @desc Acquire or forget the skill of a given variable's skill ID
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg SkillId
 * @text skillId
 * @desc skillId
 * @type variable
 * @default 0
 * 
 * @arg IsLearn
 * @text IsLearn
 * @desc IsLearn
 * @type boolean
 * @default true
 * 
 * @command changeSkillAll
 * @text Acquire or forget the skill of a given variable's skill ID
 * @desc Acquire or forget the skill of a given variable's skill ID
 * 
 * @arg SkillId
 * @text skillId
 * @desc skillId
 * @type variable
 * @default 0
 * 
 * @arg IsLearn
 * @text IsLearn
 * @desc IsLearn
 * @type boolean
 * @default true
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 指定した変数のスキルIDのスキルを習得または忘れさせます
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @command changeSkill
 * @text 指定した変数のスキルIDのスキルの増減
 * @desc 指定した変数のスキルIDのスキルの増減
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type actor
 * @default 1
 * 
 * @arg SkillId
 * @text skillId
 * @desc 対象スキルIDの変数の値
 * @type variable
 * @default 0
 * 
 * @arg IsLearn
 * @text 習得するか
 * @desc true=習得,false=忘れる
 * @type boolean
 * @default true
 * 
 * @command changeSkillVariable
 * @text [アクター変数指定]指定した変数のスキルIDのスキルの増減
 * @desc [アクター変数指定]指定した変数のスキルIDのスキルの増減
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg SkillId
 * @text skillId
 * @desc 対象スキルIDの変数の値
 * @type variable
 * @default 0
 * 
 * @arg IsLearn
 * @text 習得するか
 * @desc true=習得,false=忘れる
 * @type boolean
 * @default true
 * 
 * @command changeSkillAll
 * @text [パーティ全体]指定した変数のスキルIDのスキルの増減
 * @desc [パーティ全体]指定した変数のスキルIDのスキルの増減
 * 
 * @arg SkillId
 * @text skillId
 * @desc 対象スキルIDの変数の値
 * @type variable
 * @default 0
 * 
 * @arg IsLearn
 * @text 習得するか
 * @desc true=習得,false=忘れる
 * @type boolean
 * @default true
 * 
 * @help EX_ChangeSkill.js
 * 
 * 指定した変数のスキルIDのスキルを習得または忘れさせます。
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {
    const pluginName = 'EX_ChangeSkill';
    
    function RYBA_exChangeSkill(args,param1,param2){
        const isLearn = eval(args.IsLearn);
        const learnNum = isLearn ? 0 : 1;

        const skillId = $gameVariables.value(Number(args.SkillId));

        Game_Interpreter.prototype.iterateActorEx(param1, param2, actor => {
            if (learnNum === 0) {
                actor.learnSkill(skillId);
            } else {
                actor.forgetSkill(skillId);
            }
        });
    };

    PluginManager.registerCommand(pluginName, 'changeSkill', args => {

        const param1 = 0;
        const param2 = Number(args.ActorId);

        RYBA_exChangeSkill(args,param1,param2);

        return true;
    });

    PluginManager.registerCommand(pluginName, 'changeSkillVariable', args => {

        const param1 = 1;
        const param2 = Number(args.ActorId);
        
        RYBA_exChangeSkill(args,param1,param2);

        return true;
    });

    PluginManager.registerCommand(pluginName, 'changeSkillAll', args => {

        const param1 = 0;
        const param2 = 0;

        RYBA_exChangeSkill(args,param1,param2);

        return true;
    });
 })();