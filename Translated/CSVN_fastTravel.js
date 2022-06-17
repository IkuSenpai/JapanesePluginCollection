/*=============================================================================
 CSVN_fastTravel.js
----------------------------------------------------------------------------
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/07/24 初版
 1.0.1 2021/08/06 船上から使用した場合一時的にキャラを下船させる方向を追加
                  船上から使用した場合余計なBGMが一瞬鳴る問題に対処
                  Window_DestListの内容がおかしかったので修正
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @plugindesc Booting fast travel from item/skill.
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author cursed_steven
 * @url https://note.com/cursed_steven/n/na48705c10602
 *
 * @help CSVN_fastTravel.js
 *
 * Enable booting fast travel(teleport) from item/skill. If player has
 * large ship, it moves too.
 *
 * This plugin makes switches control each place to be selected.
 * Reserve switches before install.
 *
 * And, destination data are written directly in this script.
 * If you want, edit it.
 * As-is is only a reference.
 *
 * Terms:
 *  No permission needed for change or re-distribute this plugin.
 *  But I will be glad to being informed you used or reffered this.
 *
 * @command start
 * 	@text scene start.
 *  @desc
 */

/*:ja
 * @target MZ
 * @plugindesc アイテムやスキルから起動するファストトラベル
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author ノロワレ
 * @url https://note.com/cursed_steven/n/na48705c10602
 *
 * @help CSVN_fastTravel.js
 *
 * アイテムやスキルから行先選択してファストトラベル(テレポート)できるように
 * します。大型船を保有しているとその場所も同時に移動します。
 *
 * このプラグインでは、選択可否をスイッチで制御します。
 * 行先として指定したい行先の分だけスイッチを確保してから導入してください。
 *
 * また、行先データについては、プラグイン側の設定にすると数が膨大に
 * なってしまうので、がんばってこの中のデータを書き換えてご使用ください。
 * 配布開始時点で入っているのはあくまでも「参考例」です。
 *
 *
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 *  が、使ったとか参考にしたとか伝えてもらえると喜びます。
 *
 * @command start
 * @text 行先選択開始
 * @desc
 */

(() => {
    'use strict';
    PluginManagerEx.registerCommand(document.currentScript, 'start', args => {
        SceneManager.push(Scene_FastTravel);
    });

    //-----------------------------------------------------------------------------
    // CSVN_FastTravelDestination
    //
    // The object class of fast travel destination.

    function CSVN_FastTravelDestination() {
        this.initialize(...arguments);
    }

    CSVN_FastTravelDestination.prototype.initialize = function(
        switchId,
        name,
        desc,
        destMapId,
        destMapX,
        destMapY,
        shipMapId,
        shipMapX,
        shipMapY,
        getOffDir
    ) {
        this._switchId = switchId;
        this.name = name;
        this.description = desc;
        this._destMapId = destMapId;
        this._destMapX = destMapX;
        this._destMapY = destMapY;
        this._shipMapId = shipMapId;
        this._shipMapX = shipMapX;
        this._shipMapY = shipMapY;
        this._getOffDir = getOffDir;
    };

    CSVN_FastTravelDestination.prototype.enabled = function() {
        return $gameSwitches.value(this._switchId);
    };

    const switchIds = [72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83];
    const names = [
        'ローレシア',
        'リリザ',
        'サマルトリア',
        'ムーンペタ',
        'ルプガナ',
        'ラダトーム',
        'ベラヌール',
        'デルコンダル',
        'ザハン',
        'ペルポイ',
        'テパ',
        'ロンダルキア',
    ];
    const descs = [
        "ロト三国の一。武勇に秀でた王子がいる。",
        "ローレシアの西に位置する交通の要衝。",
        "ロト三国の一。文武両道の王子がいる。",
        "ロト三国の一、ムーンブルクの北に位置する出会いの街。",
        "北西の大陸にある港町。",
        "アレフガルドの中心にある勇者ロトゆかりの王国。",
        "南西の大陸にある水の都。",
        "南東の大陸にある武勇の国。",
        "南東の海の果ての小島にある小さな街。",
        "中央大陸の南東にある地下都市。",
        "中央大陸の奥地にある織工の村。",
        "中央大陸の高地、雪深い大地の祠。",
    ];
    const destMapIds = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
    ];
    const destMapXs = [
        213,
        167,
        159,
        124,
        28,
        57,
        35,
        213,
        240,
        147,
        70,
        138,
    ];
    const destMapYs = [
        69,
        60,
        26,
        95,
        65,
        55,
        201,
        151,
        243,
        219,
        143,
        164,
    ];
    const shipMapIds = [
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
    ];
    const shipMapXs = [
        213,
        169,
        161,
        116,
        30,
        59,
        31,
        219,
        239,
        147,
        46,
        147,
    ];
    const shipMapYs = [
        70,
        64,
        16,
        94,
        65,
        55,
        206,
        155,
        243,
        222,
        145,
        222,
    ];
    const getOffDirs = [
        8,
        8,
        2,
        6,
        4,
        4,
        6,
        6,
        6,
        2,
        4,
        2,
    ];

    const swIds = {
        item: 4,
        executing: 6,
    };
    const varIds = {
        itemId: 42,
        skillId: 255,
        user: 20,
        destMapId: 21,
        destMapX: 22,
        destMapY: 23,
        shipMapId: 24,
        shipMapX: 25,
        shipMapY: 26,
        eventId: 3,
        getOffDir: 27,
    };

    let tmp = [];
    for (let i = 0; i < switchIds.length; i++) {
        tmp.push(
            new CSVN_FastTravelDestination(
                switchIds[i],
                names[i],
                descs[i],
                destMapIds[i],
                destMapXs[i],
                destMapYs[i],
                shipMapIds[i],
                shipMapXs[i],
                shipMapYs[i],
                getOffDirs[i],
            )
        );
    }
    const destinations = tmp;

    //-----------------------------------------------------------------------------
    // Scene_FastTravel
    //
    // The scene class of the fast travel screen.

    function Scene_FastTravel() {
        this.initialize(...arguments);
    }

    Scene_FastTravel.prototype = Object.create(Scene_ItemBase.prototype);
    Scene_FastTravel.prototype.constructor = Scene_FastTravel;

    Scene_FastTravel.prototype.initialize = function() {
        Scene_ItemBase.prototype.initialize.call(this);
    };

    Scene_FastTravel.prototype.create = function() {
        Scene_ItemBase.prototype.create.call(this);
        this.createHelpWindow();
        this.createDestWindow();
    };

    Scene_FastTravel.prototype.createDestWindow = function() {
        const rect = this.destWindowRect();
        this._itemWindow = new Window_DestList(rect, destinations);
        this._itemWindow.setHelpWindow(this._helpWindow);
        this._itemWindow.setHandler('ok', this.onDestOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onDestCancel.bind(this));
        this.addWindow(this._itemWindow);

        this._itemWindow.activate();
        this._itemWindow.selectLast();
    };

    Scene_FastTravel.prototype.destWindowRect = function() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.mainAreaBottom() - wy;
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_FastTravel.prototype.onDestOk = function() {
        $gameParty.setLastItem(this.item());
        this.doFastTravel();
    };

    Scene_FastTravel.prototype.onDestCancel = function() {
        if ($gameSwitches.value(swIds.item)) {
            SceneManager.goto(Scene_Item);
        } else {
            SceneManager.goto(Scene_Skill);
        }
    };

    Scene_FastTravel.prototype.doFastTravel = function() {
        if ($gameSwitches.value(swIds.item)) {
            const fastTravelItem = $dataItems[varIds.itemId];
            $gameParty.consumeItem(fastTravelItem);
        } else {
            const actor = $gameActors.actor($gameVariables.value(varIds.user));
            const skill = $dataSkills[varIds.skillId];
            actor._mp -= actor.skillMpCost(skill);
        }

        $gameVariables.setValue(varIds.destMapId, this.item()._destMapId);
        $gameVariables.setValue(varIds.destMapX, this.item()._destMapX);
        $gameVariables.setValue(varIds.destMapY, this.item()._destMapY);
        $gameVariables.setValue(varIds.shipMapId, this.item()._shipMapId);
        $gameVariables.setValue(varIds.shipMapX, this.item()._shipMapX);
        $gameVariables.setValue(varIds.shipMapY, this.item()._shipMapY);
        $gameVariables.setValue(varIds.getOffDir, this.item()._getOffDir);

        $gameTemp.reserveCommonEvent(varIds.eventId);
        SceneManager.goto(Scene_Map);
    };

    Scene_FastTravel.prototype.playSeForItem = function() {
        SoundManager.playUseItem();
    };

    Scene_FastTravel.prototype.useItem = function() {
        Scene_ItemBase.prototype.useItem.call(this);
        this._itemWindow.redrawCurrentItem();
    };

    //-----------------------------------------------------------------------------
    // Window_DestList
    //
    // The window for selecting an destination on the fast travel screen.

    function Window_DestList() {
        this.initialize(...arguments);
    }

    Window_DestList.prototype = Object.create(Window_Selectable.prototype);
    Window_DestList.prototype.constructor = Window_DestList;

    Window_DestList.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this._data = [];
        this.refresh();
        this.scrollTo(0, 0);
    };

    Window_DestList.prototype.maxCols = function() {
        return 2;
    };

    Window_DestList.prototype.colSpacing = function() {
        return 16;
    };

    Window_DestList.prototype.maxItems = function() {
        return this._data ? this._data.length : 1;
    };

    Window_DestList.prototype.item = function() {
        return this.itemAt(this.index());
    };

    Window_DestList.prototype.itemAt = function(index) {
        return this._data && index >= 0 ? this._data[index] : null;
    };

    Window_DestList.prototype.isEnabled = function(item) {
        return $gameSwitches.value(item._switchId);
    }

    Window_DestList.prototype.makeItemList = function() {
        for (const destination of destinations) {
            if ($gameSwitches.value(destination._switchId)) {
                this._data.push(destination);
            }
        }
    };

    Window_DestList.prototype.selectLast = function() {
        const index = this._data.indexOf($gameParty.lastItem());
        this.forceSelect(index >= 0 ? index : 0);
    }

    Window_DestList.prototype.drawItem = function(index) {
        const item = this.itemAt(index);
        const rect = this.itemLineRect(index);

        if (item && item.enabled()) {
            this.drawItemName(item, rect.x, rect.y, rect.width);
        }
    };

    Window_DestList.prototype.drawItemBackground = function(index) {
        const item = this.itemAt(index);
        const rect = this.itemLineRect(index);

        if (item && item.enabled()) {
            this.drawBackgroundRect(rect);
        }
    };

    Window_DestList.prototype.updateHelp = function() {
        this.setHelpWindowItem(this.item());
    };

    Window_DestList.prototype.refresh = function() {
        this.makeItemList();
        Window_Selectable.prototype.refresh.call(this);
    };

    // [note] 船からの実行時一瞬勝手に実行前の環境のBGMがなってしまうのを抑止する
    const _Game_System_replayWalkingBgm = Game_System.prototype.replayWalkingBgm;
    Game_System.prototype.replayWalkingBgm = function() {
        if ($gameSwitches.value(swIds.executing)) {
            return;
        }

        _Game_System_replayWalkingBgm.call(this);
    };

})();