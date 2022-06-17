//
//  移動ルート＋ ver1.00
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
Imported['MoveRoutePlus'] = 1.00;

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/MoveRoutePlus.js
 * @plugindesc ver1.00/移動ルートの設定を拡張します。
 * @author Yana
 *
 * @help
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * イベントの自立移動→カスタムの移動ルートまたは、
 * イベントコマンドの移動ルートの設定でスクリプトの項目を使って、
 * 以下のような指定をできるようにします。
 *
 * moveUp(○)
 * 上に○歩移動
 * moveLeft(○)
 * 左に○歩移動
 * moveRight(○)
 * 右に○歩移動
 * moveDown(○)
 * 下に○歩移動
 * moveLeftDown(○)
 * 左下に○歩移動
 * moveLeftUp(○)
 * 左上に○歩移動
 * moveRightDown(○)
 * 右下に○歩移動
 * moveRightUp(○)
 * 右上に○歩移動
 * 「◇◇に移動」を○個並べるのと同じ効果です。
 *
 * moveForward(○)
 * ○歩前進
 * moveBack(○)
 * ○歩後退
 * 「一歩前進」「一歩後退」を○個並べるのと同じ効果です。
 *
 * moveToward(○)
 * ○歩近づく
 * moveAway(○)
 * ○歩遠ざかる
 * 「プレイヤーに近づく」「プレイヤーから遠ざかる」を
 * ○個並べるのと同じ効果です。
 *
 * moveRandom(○)
 * ○歩ランダムに移動
 * 「ランダムに移動」を○個並べるのと同じ効果です。
 *
 * loopRoute(○,□[,×,◇…])
 * □番のコードの移動ルートを○回並べるのと同じ効果です。
 * 必要に応じて、×、◇など、追加のパラメータを設定します。
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
 * ver1.00:
 * 公開
 */

(function() {

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('MoveRoutePlus');

    ////////////////////////////////////////////////////////////////////////////////////

    var __GCharacter_setMoveRoute = Game_Character.prototype.setMoveRoute;
    Game_Character.prototype.setMoveRoute = function(moveRoute) {
        var mr = moveRoute;
        mr.list = this.deploymentMoveRoute(moveRoute);
        __GCharacter_setMoveRoute.call(this, mr);
    };

    var __GCharacter_forceMoveRoute = Game_Character.prototype.forceMoveRoute;
    Game_Character.prototype.forceMoveRoute = function(moveRoute) {
        var mr = moveRoute;
        mr.list = this.deploymentMoveRoute(moveRoute);
        __GCharacter_forceMoveRoute.call(this, mr);
    };

    Game_Character.prototype.deploymentMoveRoute = function(moveRoute) {
        var list = [];
        moveRoute.list.forEach(function(r) {
            if (r.code === 45) {
                if (r.parameters[0].match(/^(?:moveDown|下に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 1 });
                } else if (r.parameters[0].match(/^(?:moveLeft|左に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 2 });
                } else if (r.parameters[0].match(/^(?:moveRight|右に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 3 });
                } else if (r.parameters[0].match(/^(?:moveUp|上に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 4 });
                } else if (r.parameters[0].match(/^(?:moveLeftDown|左下に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 5 });
                } else if (r.parameters[0].match(/^(?:moveRightDown|右下に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 6 });
                } else if (r.parameters[0].match(/^(?:moveRightUp|右上に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 7 });
                } else if (r.parameters[0].match(/^(?:moveLeftUp|左上に)\(?(\d+)\)?(?:歩移動)?/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 8 });
                } else if (r.parameters[0].match(/^moveForward\((\d+)\)/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 12 });
                } else if (r.parameters[0].match(/^moveBack\((\d+)\)/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 13 });
                } else if (r.parameters[0].match(/^moveToward\((\d+)\)/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 10 });
                } else if (r.parameters[0].match(/^moveAway\((\d+)\)/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 11 });
                } else if (r.parameters[0].match(/^moveRandom\((\d+)\)/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 9 });
                } else if (r.parameters[0].match(/^(\d+)歩前進/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 12 });
                } else if (r.parameters[0].match(/^(\d+)歩後退/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 13 });
                } else if (r.parameters[0].match(/^(\d+)歩近づく/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 10 });
                } else if (r.parameters[0].match(/^(\d+)歩遠ざかる/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 11 });
                } else if (r.parameters[0].match(/^(\d+)歩ランダムに移動/)) {
                    for (var i = 0; i < Number(RegExp.$1); i++) list.push({ code: 9 });
                } else if (r.parameters[0].match(/loopRoute\((.+)\)/)) {
                    var params = RegExp.$1.split(',');
                    var code = Number(params[1]);
                    var command = { code: code, parameters: [] };
                    var max = Number(params[0]);
                    switch (code) {
                        case 41:
                            command.parameters[0] = params[2];
                            command.parameters[1] = Number(params[3]);
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                        case 44:
                            var se = { name: '', pan: 0, pitch: 100, volume: 100 };
                            se.name = params[2];
                            if (params[3]) se.volume = Number(params[3]);
                            if (params[4]) se.pitch = Number(params[4]);
                            if (params[5]) se.pan = Number(params[5]);
                            command.parameters[0] = se;
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                        case 45:
                            command.parameters[0] = params[2];
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                        default:
                            if (params[2]) command.parameters[0] = Number(params[2]);
                            if (params[3]) command.parameters[1] = Number(params[3]);
                            for (var i = 0; i < max; i++) list.push(command);
                            break;
                    }
                } else {
                    list.push(r);
                }
            } else {
                list.push(r);
            }
        }.bind(this));
        return list;
    };
}());