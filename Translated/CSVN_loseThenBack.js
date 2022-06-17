/*=============================================================================
 CSVN_loseThenBack.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/23 初版
 1.0.1 2021/08/07 変数とコモンイベントの指定方法を変更
 1.0.2 2021/08/11 負けた直後戻る前にONにするスイッチを導入
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Transfer to specified place when lose, and do comment event.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/n08d5c5f75770
 *
 * @help CSVN_loseThenBack.js
 *
 * Without moving to gameover screen, transfer to specified place when lose,
 * and do specified common event.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @param mapIdVarId
 * @text map Id to go back.
 * @desc
 * @type variable
 *
 * @param mapXVarId
 * @text map X to go back.
 * @desc
 * @type variable
 *
 * @param mapYVarId
 * @text map Y to go back.
 * @desc
 * @type variable
 *
 * @param commonEventId
 * @text common event id to do after lose.
 * @desc
 * @type common_event
 */

/*:ja
 * @target MZ
 * @plugindesc 全滅時、設定した場所に移動してイベント実行
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/n08d5c5f75770
 *
 * @help CSVN_loseThenBack.js
 *
 * 全滅時ゲームオーバー画面に移らず、設定した場所に移動したうえで
 * 指定したコモンイベントを実行します。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @param mapIdVarId
 * @text 戻り先マップIDを入れた変数ID
 * @desc
 * @type variable
 *
 * @param mapXVarId
 * @text 戻り先マップのX座標を入れた変数ID
 * @desc
 * @type variable
 *
 * @param mapYVarId
 * @text 戻り先マップのY座標を入れた変数ID
 * @desc
 * @type variable
 *
 * @param loseSwitchId
 * @text 負けた直後戻る前にONにするスイッチ
 * @desc
 * @type switch
 *
 * @param commonEventId
 * @text 戻った直後に実行するコモンイベントID
 * @desc
 * @type common_event
 */

(() => {
    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);

    BattleManager.updateBattleEnd = function() {
        if (this.isBattleTest()) {
            AudioManager.stopBgm();
            SceneManager.exit();
        } else if (!this._escaped && $gameParty.isAllDead()) {
            AudioManager.stopBgm();
            $gameSwitches.setValue(params.loseSwitchId, true);
            $gameParty.members()[0].revive();
            $gamePlayer.reserveTransfer(
                $gameVariables.value(params.mapIdVarId),
                $gameVariables.value(params.mapXVarId),
                $gameVariables.value(params.mapYVarId),
                8
            );
            $gameTemp.reserveCommonEvent(params.commonEventId);
            SceneManager.pop();
        } else {
            SceneManager.pop();
        }
        this._phase = "";
    };
})();