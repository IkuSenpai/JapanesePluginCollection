//=============================================================================
// SwapTwoPartyMembersMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc At a two-person party, if you select "Formation", the two will be replaced immediately.
 * @author Tamaki Awana(Original:Toru Higuruma)
 *
 * @help At a two-person party, if you select "Formation" on the menu scene,
 * the order of the two will be changed immediately.
 * 
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.0.1 English supported.
 * ver.1.0 Release
 * 
 * ---
 * 
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * This plugin is based on a Toru Higuruma's RGSS3 material
 * "Skip actor select in menu"(メニューのアクター選択省略).
 * Thanks to Toru Higuruma (https://github.com/neofuji).
*/
/*:ja
 * @target MZ
 * @plugindesc 2人パーティーの時、並び替えを選ぶと直ちに2人を入れ替えるようにします。
 * @author 沫那環（原案：Toru Higuruma）
 *
 * @help 2人パーティーの時、メニュー画面で並び替えを選ぶと、
 * 直ちに2人の順番を入れ替えるようにします。
 * 
 * 【プラグインコマンドについて】
 * このプラグインに、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * ver.1.0.1 英語表示に対応
 * ver.1.0 公開
 * 
 * ---
 * 
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 * 
 * このプラグインを制作するにあたり、
 * Toru Higurumaさん（https://github.com/neofuji）のRGSS3素材
 * 「メニューのアクター選択省略」を参考にさせていただきました。
 * この場を借りて、お礼申し上げます。
 */
(() => {
    
    const _Scene_Menu_commandFormation = Scene_Menu.prototype.commandFormation;
    Scene_Menu.prototype.commandFormation = function() {
    if ($gameParty.size() === 2) {
        $gameParty.swapOrder(0,1)
        this._statusWindow.refresh();
        this._commandWindow.activate();
        return
    };
        _Scene_Menu_commandFormation.call(this);
    };

})();