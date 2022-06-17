//
//  ビークルコモン ver1.00
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
Imported['VehicleCommon'] = 1.00;
/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/VehicleCommon.js
 * @plugindesc ver1.00/乗り物へ乗降時に、コモンイベントを予約します。
 * @author Yana
 *
 * @param On Boat Common ID
 * @text 小型船乗込時コモンイベント
 * @desc 小型船に乗った時に実行するコモンイベントのIDです。
 * @type common_event
 * @default 0
 *
 * @param On Ship Common ID
 * @text 大型船乗込時コモンイベント
 * @desc 大型船に乗った時に実行するコモンイベントのIDです。
 * @type common_event
 * @default 0
 *
 * @param On Airship Common ID
 * @text 飛行船乗込時コモンイベント
 * @desc 飛行船に乗った時に実行するコモンイベントのIDです。
 * @type common_event
 * @default 0
 *
 * @param Off Boat Common ID
 * @text 小型船離去時コモンイベント
 * @desc 小型船から降りた時に実行するコモンイベントのIDです。
 * @type common_event
 * @default 0
 *
 * @param Off Ship Common ID
 * @text 大型船離去時コモンイベント
 * @desc 大型船から降りた時に実行するコモンイベントのIDです。
 * @type common_event
 * @default 0
 *
 * @param Off Airship Common ID
 * @text 飛行船離去時コモンイベント
 * @desc 飛行船から降りた時に実行するコモンイベントのIDです。
 * @type common_event
 * @default 0
 *
 * @help
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 *  導入して、プラグインパラメータを設定することで動作します。
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

    var parameters = PluginManager.parameters('VehicleCommon');
    var onCommonId = [Number(parameters['On Boat Common ID']),
        Number(parameters['On Ship Common ID']),
        Number(parameters['On Airship Common ID'])
    ];
    var offCommonId = [Number(parameters['Off Boat Common ID']),
        Number(parameters['Off Ship Common ID']),
        Number(parameters['Off Airship Common ID'])
    ];

    ////////////////////////////////////////////////////////////////////////////////////

    var __GVehicle_getOn = Game_Vehicle.prototype.getOn;
    Game_Vehicle.prototype.getOn = function() {
        __GVehicle_getOn.call(this);
        if (this.isBoat() && onCommonId[0]) $gameTemp.reserveCommonEvent(onCommonId[0]);
        if (this.isShip() && onCommonId[1]) $gameTemp.reserveCommonEvent(onCommonId[1]);
        if (this.isAirship() && onCommonId[2]) $gameTemp.reserveCommonEvent(onCommonId[2]);
    };

    var __GVehicle_getOff = Game_Vehicle.prototype.getOff;
    Game_Vehicle.prototype.getOff = function() {
        __GVehicle_getOff.call(this);
        if (this.isBoat() && offCommonId[0]) $gameTemp.reserveCommonEvent(offCommonId[0]);
        if (this.isShip() && offCommonId[1]) $gameTemp.reserveCommonEvent(offCommonId[1]);
        if (this.isAirship() && offCommonId[2]) $gameTemp.reserveCommonEvent(offCommonId[2]);
    };
}());