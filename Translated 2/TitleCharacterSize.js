//
//  タイトル文字サイズ変更 ver1.001
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['TitleCharacterSize'] = 1.001;

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Others/TitleCharacterSize.js
 * @plugindesc ver1.001/タイトルの文字サイズを変更します。
 * @author Yana
 *
 * @param FontSize
 * @text タイトルのフォントサイズ
 * @desc タイトルのフォントサイズです。
 * @default 72
 * @type number
 *
 * @help
 * ------------------------------------------------------
 * 使い方
 * ------------------------------------------------------
 * 導入することで動作します。
 * ただし、タイトルでは変数は使用できません。
 * ------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、
 * または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.001:180410
 * プラグインパラメータの仕様を1.5.0に更新。
 * ver1.00:
 * 公開
 */

(function () {

    'use strict';

    var parameters = PluginManager.parameters('TitleCharacterSize');
    var fontSize = Number(parameters['FontSize']) || 72;

    // 再定義
    Scene_Title.prototype.drawGameTitle = function () {
        var x = 20;
        var y = Graphics.height / 4;
        var maxWidth = Graphics.width - x * 2;
        var text = $dataSystem.gameTitle;
        this._gameTitleSprite.bitmap.outlineColor = 'black';
        this._gameTitleSprite.bitmap.outlineWidth = 8;
        this._gameTitleSprite.bitmap.fontSize = fontSize;
        this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
    };
}());