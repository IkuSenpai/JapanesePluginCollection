
/*:
 * @plugindesc アクター一人称表記ゆれ防止プラグイン
 * @target MZ
 * @url https://drive.google.com/drive/u/0/folders/19ZSazImRgTMIgg_ZEDaYDxl48xoW0vRi
 * @author さすらいのトム
 * 

/*~struct~ActorName:
 *
 * @param ActorName
 * @text アクター名
 * @desc 一人称を指定するアクター名を指定してください。
 * @default ["ハロルド","テレーゼ","マーシャ","ルキウス"]
 * @type string[]
 *
 * @param FirstName
 * @text アクター一人称
 * @desc アクター名に紐づく一人称を指定してください。
 * @default ["俺","アタシ","ウチ","ボク"]
 * @type string[]
 *
 * @help SetFirstPerson.js
 *
 * アクターごとの一人称を指定する特殊文字を定義します。
 * 「アクター名」に一人称を指定するアクター名を入力し、
 * 「アクター一人称」に各アクターに対応する一人称を入力します。
 * メッセージの人物名が「アクター名」と一致すれば↓の特殊文字が
 * 「アクター一人称」に置き換わります。
 * 
 * /FIRSTNAME
 * 
 * 一人称の表記ゆれ防止に使えるかも…？
 * 
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましても
 *  当方では責任を負いかねます。
 * 
 */

(() => {
    'use strict';
    const plugin_params = PluginManager.parameters("SetFirstPerson"); 

    let   ActorName     = JSON.parse(plugin_params['ActorName']|| "[]");
    let   FirstName     = JSON.parse(plugin_params['FirstName']|| "[]");;


    const Window_Base_prototype_convertEscapeCharacters = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
            case 'FIRSTNAME':
                //let skillID  = this.obtainEscapeParam(textState);
                this.createActorFirstName(textState);
            default:
                Window_Base_prototype_convertEscapeCharacters.call(this, code, textState);
            break;
        }
    };

    Window_Base.prototype.createActorFirstName = function(textState) {
        if (!ActorName || !FirstName) {
            return;
        }
        for (var i = 0; i < Math.min(ActorName.length,FirstName.length); i++) {

            if (ActorName[i] == $gameTemp._speakerName) {

                this.drawFirstName(FirstName[i],textState);
            }
        }
    };

    
    Window_Base.prototype.drawFirstName = function(text, textState) {
        this.drawText(text, textState.x, textState.y);
        textState.x += this.textWidth(text) + 2;
    }

    const Game_Interpreter_prototype_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        $gameTemp._speakerName = null;
        if (params && params[4]) {
            $gameTemp._speakerName = params[4];
        }
        return Game_Interpreter_prototype_command101.call(this,params);
    };
})();
