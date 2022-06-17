/*:
 * @plugindesc Changes the actor profile of the actor ID of the specified variable.
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help EX_ChangeProfile.js
 * 
 * @command changeProfileVariable
 * @text [Actor Variables] Change actor's name
 * @desc [Actor Variables] Change actor's name
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg Text
 * @text acotr name
 * @desc actor name
 * @type multiline_string
 * @default 
 * 
 * @command changeProfileAll
 * @text Rename [party-wide] actors
 * @desc Rename [party-wide] actors
 * 
 * @arg Text
 * @text acotr name
 * @desc actor name
 * @type multiline_string
 * @default 
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 指定した変数のアクターIDのアクタープロフィールを変更します。
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @command changeProfileVariable
 * @text [アクター変数指定]アクターのプロフィールの変更
 * @desc [アクター変数指定]アクターのプロフィールの変更
 * 
 * @arg ActorId
 * @text ActorId
 * @desc ActorId
 * @type variable
 * @default 1
 * 
 * @arg Text
 * @text プロフィール
 * @desc プロフィール
 * @type multiline_string
 * @default 
 * 
 * @command changeProfileAll
 * @text [パーティ全体]アクターのプロフィールの変更
 * @desc [パーティ全体]アクターのプロフィールの変更
 * 
 * @arg Text
 * @text プロフィール
 * @desc プロフィール
 * @type multiline_string
 * @default 
 * 
 * @help EX_ChangeProfile.js
 * 
 * 指定した変数のアクターIDのアクタープロフィールを変更します。
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {
    const pluginName = 'EX_ChangeProfile';

    function RYBA_exChangeProfile(args,param1,param2){
        const text = String(args.Text);

        Game_Interpreter.prototype.iterateActorEx(param1, param2, actor => {
            actor.setProfile(text);
        });
    };

    PluginManager.registerCommand(pluginName, 'changeProfileVariable', args => {

        const param1 = 1;
        const param2 = Number(args.ActorId);
        
        RYBA_exChangeProfile(args,param1,param2);

        return true;
    });

    PluginManager.registerCommand(pluginName, 'changeProfileAll', args => {

        const param1 = 0;
        const param2 = 0;

        RYBA_exChangeProfile(args,param1,param2);

        return true;
    });
})();
