//=============================================================================
// Keke_AutoDeveloperTool - 自動でデベロッパーツール
// バージョン: 1.0
//=============================================================================
// Copyright (c) 2020 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 自動でデベロッパーツールを開く
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * 
 *【利用規約】
 *  MITライセンスのもと、好きに使ってくれて大丈夫
 * ただし作者は何も責任を負わないよ
 * 著作権は『ケケー』にあるよ
 */

(function() {

    // 自動でデベロッパーツール起動
    let _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        if (Utils.isNwjs() && Utils.isOptionValid('test')) {
            require('nw.gui').Window.get().showDevTools();
        }
        _SceneManager_initialize.call(this);
    };
    
    // ゲーム画面を自動で前面にする
    let _Scene_Title_initialize = Scene_Title.prototype.initialize;
    Scene_Title.prototype.initialize = function() {
        _Scene_Title_initialize.call(this);
        if (Utils.isNwjs() && Utils.isOptionValid('test')) {
            require('nw.gui').Window.get().focus();
        }
    };
}());