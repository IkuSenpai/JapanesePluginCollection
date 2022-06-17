//=============================================================================
// Plugin for RPG Maker MZ
// GR_AddMapnameToSave.js
// ----------------------------------------------------------------------------
// Released under the MIT License.
// https://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version 1.0.0
//=============================================================================
/*:ja
 * @target MZ
 * @plugindesc セーブ/ロード画面に、プレイヤーキャラの居るマップの表示名を追加します。
 * @author げれげれ
 * @url https://twitter.com/geregeregere
 *
 * @help
 * プラグインパラメータ、プラグインコマンド、メモタグ等は
 * いずれもありません。
 * プラグイン管理に登録し、ONにすればそれだけで機能します。
 * 
 */

(() => {
    'use strict';

    //セーブファイルデータにマップの表示名を追加する
    const DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
    DataManager.makeSavefileInfo = function() {
        const info = DataManager_makeSavefileInfo.apply(this);
        info.mapname = $gameMap.displayName();
        return info;
    };

    //drawContentsにmapの表示名描画を追加
    const Window_SavefileList_drawContents = Window_SavefileList.prototype.drawContents;
    Window_SavefileList.prototype.drawContents = function(info, rect) {
        Window_SavefileList_drawContents.apply(this, arguments);
        const lineHeight = this.lineHeight();
        if (rect.height >= lineHeight * 2 + 2) {
            this.drawMapName(info, rect.x, rect.y + 6, rect.width);
        }
    };

    //mapの表示名描画処理
    Window_SavefileList.prototype.drawMapName = function(info, x, y, width) {
        if (info.mapname) {
            this.drawText(info.mapname, x, y, width, "right");
        }
    };

})();
