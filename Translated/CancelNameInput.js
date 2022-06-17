
/*:
 * @plugindesc 名前入力キャンセルプラグイン
 * @target MZ
 * @url 
 * @author さすらいのトム
 *
 *
 * @help CancelNameInput.js
 *
 * 名前入力の処理の際、入力文字数が0文字の時に
 * デフォルトネームに戻した状態で名前入力画面を閉じる処理を追加します。
 * 
 *
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 * 
 */

(() => {
    'use strict';

    const Window_NameInput_prototype_processBack = Window_NameInput.prototype.processBack;
    Window_NameInput.prototype.processBack = function() {
        if (this._editWindow._name.length == 0) {
            this._editWindow.restoreDefault();
            SoundManager.playOk();
            this.callOkHandler();
        }
        Window_NameInput_prototype_processBack.call(this);
    };
})();
