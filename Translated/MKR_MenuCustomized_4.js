//=============================================================================
// MKR_MenuCustomized_4.js
//=============================================================================
// Copyright (c) 2016-2017 マンカインド
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2017/06/23 初版公開。
// ----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//=============================================================================

/*:
 *
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/MKR-MV-plugins/master/MKR_MenuCustomized_4.js
 * @plugindesc (v1.0.0) メニューカスタマイズプラグインその4
 * @author マンカインド
 *
 * @help = メニューカスタマイズプラグインその4 ver 1.0.0 =
 *
 * このプラグインを導入することでメニューのアイテム画面に以下の変更を行います。
 *
 *   ・決定キーによるアイテム選択機能を無効化
 *
 *
 * その4 と名付けていますがこのプラグイン単体で動作します。
 *
 *
 * プラグインパラメーター:
 *   ありません。
 *
 *
 * プラグインコマンド:
 *   ありません。
 *
 *
 * スクリプトコマンド:
 *   ありません。
 *
 *
 * 利用規約:
 *   ・作者に無断で本プラグインの改変、再配布が可能です。
 *     (ただしヘッダーの著作権表示部分は残してください。)
 *
 *   ・利用形態(フリーゲーム、商用ゲーム、R-18作品等)に制限はありません。
 *     ご自由にお使いください。
 *
 *   ・本プラグインを使用したことにより発生した問題について作者は一切の責任を
 *     負いません。
 *
 *   ・要望などがある場合、本プラグインのバージョンアップを行う
 *     可能性がありますが、
 *     バージョンアップにより本プラグインの仕様が変更される可能性があります。
 *     ご了承ください。
 *
*/

var Imported = Imported || {};
Imported.MKR_MenuCustomized_4 = true;

(function () {
    'use strict';
    var PN = "MKR_MenuCustomized_4";


    //=========================================================================
    // Window_ItemList
    //  ・メニューのアイテム画面の選択動作を再定義します。
    //
    //=========================================================================
    var _Window_ItemList_processOk = Window_ItemList.prototype.processOk;
    Window_ItemList.prototype.processOk = function () {
        if (SceneManager._scene.constructor != Scene_Item) {
            _Window_ItemList_processOk.call(this);
        }
    };

})();