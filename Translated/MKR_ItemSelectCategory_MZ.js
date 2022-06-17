//=============================================================================
// MKR_ItemSelectCategory_MZ.js
//=============================================================================
// Copyright (c) 2021 マンカインド
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.1.0 2021/12/30 ・RPGツクールMZのプラグインコマンド方式に対応
//
// 2.0.0 2021/04/26 ・RPGツクールMZに対応。
//                  ・コードをリファクタリング
//
// 1.0.1 2017/12/10 ・アイテムメニューのカテゴリ設定を追加。
//
// 1.0.0 2017/10/25 ・初版公開。
// ----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//=============================================================================

/*:
 * ============================================================================
 * @plugindesc (v2.1.0) アイテム選択カテゴリ設定プラグイン
 * @author マンカインド
 * @url https://raw.githubusercontent.com/mankindGames/RPGTkoolMZ/master/MKR_ItemSelectCategory_MZ.js
 *
 * @target MZ
 *
 * @help = アイテム選択カテゴリ設定プラグイン =
 * MKR_ItemSelectCategory_MZ.js
 *
 *
 * [アイテム選択の処理]イベントコマンドで"武器"や"防具"を選択可能にします。
 * 選択後、選択したカテゴリに属するアイテムのIDが指定した変数へと格納されます。
 *
 * 本プラグインで使用可能なプラグインコマンドは下記の通りです。
 *
 * [カテゴリ変更]
 *   ・アイテム選択の処理で選択可能なアイテムのカテゴリを変更します。
 *   ・引数
 *       カテゴリ:
 *         "武器"     : カテゴリを"武器"に変更します。
 *         "防具"     : カテゴリを"防具"に変更します。
 *         "アイテム" : カテゴリを"アイテム"に設定します。(元々のカテゴリ)
 *
 *   ・アイテム選択ウィンドウが閉じられると、アイテムカテゴリは
 *     プラグインパラメータ[初期アイテムカテゴリ]で選択したものに
 *     変更されます。
 *
 *
 * スクリプトコマンド:
 *   ありません。
 *
 *
 * 【利用規約】
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
 * ============================================================================
 *
 * @param init_item_category
 * @text 初期アイテムカテゴリ
 * @desc 初期状態でアイテム選択ウィンドウに表示されるアイテムのカテゴリを設定します。(デフォルト:アイテム)
 * @type select
 * @option アイテム
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @default item
 *
 * @param item_menu_category
 * @text アイテムメニューカテゴリ
 * @desc アイテムメニューを開いたときに選択されているアイテムのカテゴリを設定します。(デフォルト:アイテム)
 * @type select
 * @option アイテム
 * @value item
 * @option 武器
 * @value weapon
 * @option 防具
 * @value armor
 * @option 大事なもの
 * @value keyItem
 * @default item
 *
 * @command category_change
 * @text カテゴリ変更
 * @desc 「アイテム選択の処理」で選択可能なアイテムのカテゴリを変更します。
 *
 * @arg category
 * @text カテゴリ
 * @desc アイテムのカテゴリです。
 * @default item
 * @type select
 * @option アイテム
 *      @value item
 * @option 武器
 *      @value weapon
 * @option 防具
 *      @value armor
 *
*/

(() => {
    'use strict';

    //=========================================================================
    // Parameter
    //  ・プラグインパラメータの取得と加工
    //
    //=========================================================================
    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
    const pluginParameter = PluginManager.parameters(pluginName);

    const settings = {
        initItemCategory: String(pluginParameter["init_item_category"]).trim(),
        itemMenuCategory: String(pluginParameter["item_menu_category"]).trim(),
    };


    //=========================================================================
    // PluginManager
    //  ・アイテムカテゴリ設定用コマンドを定義します。
    //
    //=========================================================================
    PluginManager.registerCommand(pluginName, "category_change", args => {
        $gameMessage.setItemChoiceCategory(args.category);
    });


    //=========================================================================
    // Game_Message
    //  ・アイテム選択ウィンドウに関する変数を定義します。
    //
    //=========================================================================
    const _Game_Message_clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _Game_Message_clear.call(this);
        this.setItemChoiceCategory(settings.initItemCategory);
    };

    Game_Message.prototype.itemChoiceCategory = function() {
        return this._itemChoiceCategory;
    };

    Game_Message.prototype.setItemChoiceCategory = function(category) {
        this._itemChoiceCategory = category;
    };


    //=========================================================================
    // Window_EventItem
    //  ・アイテム選択ウィンドウの項目を再定義します。
    //
    //=========================================================================
    const _Window_EventItem_includes = Window_EventItem.prototype.includes;
    Window_EventItem.prototype.includes = function(item) {
        switch($gameMessage.itemChoiceCategory()) {
            case 'armor':
                return DataManager.isArmor(item);
            case 'weapon':
                return DataManager.isWeapon(item);
            default:
                return _Window_EventItem_includes.call(this, item);
        }
    };


    //=========================================================================
    // Window_ItemCategory
    //  ・アイテムメニューのカテゴリウィンドウの項目を再定義します。
    //
    //=========================================================================
    const _Window_ItemCategory_initialize = Window_ItemCategory.prototype.initialize;
    Window_ItemCategory.prototype.initialize = function(rect) {
        _Window_ItemCategory_initialize.call(this, rect);
        this.selectSymbol(settings.itemMenuCategory);
    };

})();