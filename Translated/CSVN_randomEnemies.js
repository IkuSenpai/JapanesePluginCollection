/*=============================================================================
 CSVN_randomEnemies.js
----------------------------------------------------------------------------
 (C)2020 munokura
 (C)2021 cursed_steven
 This software is released under the MIT License.
 http://opensource.org/licenses/mit-license.php
----------------------------------------------------------------------------
 Version
 1.0.0 2021/08/05 初版
 1.0.1 2021/08/05 戦闘テスト以外で動作しない不具合を修正
 1.1.0 2021/10/12 バトラー画像名と敵キャラ名が同じ前提であったのを修正
 2.0.0 2021/11/01 リファクタ、サイドビューに対応、battlerImageタグを不要に。
 2.0.1 2021/11/06 サイドビューの場合完全ランダムではなくほどほどに重ならないように
                  座標を調整する仕様を追加。
 2.0.2 2021/11/12 固有名をつける処理のバグを修正、NUUN_BattleBGM対応追加。
 2.0.3 2022/02/11 横幅が大きい敵画像をSVで使うと位置が右に寄りすぎる問題の修正
----------------------------------------------------------------------------
 [Twitter]: https://twitter.com/cursed_steven
=============================================================================*/

/*:
 * @target MZ
 * @author ムノクラ(+ノロワレ)
 * @url https://note.com/cursed_steven/n/n097b817e4856
 * @plugindesc 敵グループの敵キャラをランダムに入れ替えます。
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @help 敵グループの敵キャラをランダムに入れ替えます。
 *
 * 敵キャラのメモ欄に下記のようにタグを入れてください。
 * <RandomEnemy:敵キャラID>
 * <RandomEnemy:敵キャラID,敵キャラID,敵キャラID>
 * 0は非表示になります。
 *
 * 例
 * <RandomEnemy:0,0,1,1,2,3>
 *
 * フロントビューの場合、戦闘開始時エネミー画像は、0で非表示になった分を
 * 考慮して均等に並べ直されます。
 * また、そのためのエネミー画像をプリロードするので、画像が
 * あまり多いとか重いとかだとアレかもしれません。
 * また、MVはウチに環境がないので target からは除外しました。
 * 確認可能な方はしてみてください。
 *
 * プラグインコマンドはありません。
 *
 * このプラグインは munokura =サン作の MNKR_RandomEnemies.js (v.1.0.4)を
 * ベースにしつつリライトしてかいはつされています。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 * @param boxWidth
 * @text 画面横幅
 * @desc システム２の「画面の幅」
 * @default 816
 * @type number
 *
 * @param boxHeight
 * @text 画面高さ
 * @desc システム２の「画面の高さ」
 * @default 624
 * @type number
 *
 * @param enemyIdFrom
 * @text 敵キャラIDFrom
 * @desc 画像をプリロードする敵キャラIDの範囲(From)
 * @type number
 *
 * @param enemyIdTo
 * @text 敵キャラIDTo
 * @desc 画像をプリロードする敵キャラIDの範囲(To)
 * @type number
 */

(() => {

    'use strict';
    const params = PluginManagerEx.createParameter(document.currentScript);
    const boxWidth = params.boxWidth ? params.boxWidth : 816;
    const boxHeight = params.boxHeight ? params.boxHeight : 624;
    const enemyIdFrom = params.enemyIdFrom ? params.enemyIdFrom : 1;
    const enemyIdTo = params.enemyIdTo ? params.enemyIdTo : 2000;

    const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        _Scene_Boot_onDatabaseLoaded.call(this);

        ImageManager.preloadEnemyImages(enemyIdFrom, enemyIdTo);
    };

    const _Scene_Map_create = Scene_Map.prototype.create;
    Scene_Map.prototype.create = function() {
        _Scene_Map_create.call(this);

        ImageManager.preloadEnemyImages(enemyIdFrom, enemyIdTo);
    };

    ImageManager.preloadEnemyImages = function(from, to) {
        for (let enemyId = from; enemyId <= to; enemyId++) {
            const dataEnemy = $dataEnemies[enemyId];
            if (dataEnemy && dataEnemy.battlerName) {
                this.loadEnemy(dataEnemy.battlerName);
            }
        }
    };

    Game_Troop.prototype.setup = function(troopId) {

        this.clear();
        this._troopId = troopId;

        let members = this.lotteryEnemyIds();

        while (members.length == 0) {

            // 全部いなくなってしまった場合は再抽選
            members = this.lotteryEnemyIds();

        }

        // フロントビューかサイドビューかを判別して敵配置
        if ($gameSystem.isSideView()) {

            // サイドビューの場合
            this.rearrangeEnemiesSV(members);

        } else {

            // フロントビューの場合
            this.rearrangeEnemiesFV(members);

        }

        // 固有名(ＡＢＣ...)をつける
        this.makeUniqueNames();

        // NUUN_BattleBGMが入っている場合はさらにBGM設定
        if (typeof Game_Troop.prototype.battleBGMsetup == 'function') {

            const bgm = this.battleBGMsetup();
            $gameSystem.setBattleBgm(bgm);

        }

    };

    Game_Troop.prototype.lotteryEnemyIds = function() {

        // RandomEnemiesタグを見て敵IDを抽選し、
        // dataEnemyオブジェクトの配列にして返す
        const troopObjs = this.troop().members;
        //console.log(troopObjs);
        // -> {enemyId, x, y, hidden}の配列

        let randomEnemyIds;
        let enemyId;
        let dEnemy;
        let dEnemies = [];
        for (let i = 0; i < troopObjs.length; i++) {

            dEnemy = $dataEnemies[troopObjs[i].enemyId];
            if (dEnemy.meta.RandomEnemy) {

                // タグ記載がある
                randomEnemyIds = dEnemy.meta.RandomEnemy.split(',');
                enemyId = randomEnemyIds[Math.randomInt(randomEnemyIds.length)];

            } else {

                // タグ記載がない
                enemyId = troopObjs[i].enemyId;

            }
            //console.log(enemyId);

            if (enemyId != 0) {

                dEnemy = $dataEnemies[enemyId];
                dEnemy.hidden = troopObjs[i].hidden;
                dEnemies.push(dEnemy);

            }

        }

        return dEnemies;

    };

    Game_Troop.prototype.rearrangeEnemiesSV = function(dEnemies) {

        // dataEnemyオブジェクトの配列を受け取って、
        // それぞれの内容からランダムに配置を決めてXY座標を決めて
        // this._enemies に追加する。

        // 一旦内容をクリア
        this._enemies = [];

        // それぞれについて Game_Enemy を定義してメンバーに追加
        let gEnemy;
        let xy = {};
        for (let i = 0; i < dEnemies.length; i++) {

            // 画面内の適切な範囲でかつ、
            // すでに座標が決まっている敵画像と重ならないようなXY座標を求める
            xy = this.getCheckedRandomXY(dEnemies[i]);

            gEnemy = new Game_Enemy(dEnemies[i].id, xy.x, xy.y);
            if (dEnemies[i].hidden) {

                gEnemy.hide();

            }

            this._enemies.push(gEnemy);

        }

    };

    Game_Troop.prototype.getCheckedRandomXY = function(dEnemy) {

        let xy = {
            x: getRandomX(dEnemy),
            y: getRandomY(dEnemy),
        };
        //console.log(`${xy.x}, ${xy.y}`);

        if (this.checkRandomXY(xy)) {

            // OKならそのまま返す
            //console.log('OK');
            return xy;

        } else {

            // NGでも敵画像サイズが大きい場合はそのまま返す
            if (boxWidth / 2 - enemyWidth(dEnemy) < 0) {
                return xy;
            } 

            // それでもNGなら再抽選して返す
            //console.log('NG');
            return this.getCheckedRandomXY(dEnemy);

        }

    }

    Game_Troop.prototype.checkRandomXY = function(xy) {

        let gEnemy;
        for (let i = 0; i < this._enemies.length; i++) {

            gEnemy = this._enemies[i];
            const x = Number(gEnemy._screenX);
            const y = Number(gEnemy._screenY);
            const id = gEnemy._enemyId;

            const minX = x - enemyWidth($dataEnemies[id]) / 3;
            const minY = y - enemyHeight($dataEnemies[id]) / 3;
            const maxX = x + enemyWidth($dataEnemies[id]) / 3;
            const maxY = y + enemyHeight($dataEnemies[id]) / 3;

            //console.log(`minX: ${minX} <= x: ${xy.x} <= maxX: ${maxX}`);
            //console.log(`minY: ${minY} <= y: ${xy.y} <= maxY: ${maxY}`);

            if (minX <= xy.x && xy.x <= maxX
             && minY <= xy.y && xy.y <= maxY) {

                return false;

            }

        }

        return true;
    }

    function getRandomX(dEnemy) {

        let randX = 0;

        if (boxWidth / 2 - enemyWidth(dEnemy) < 0) {
            // 画像の横幅が画面幅の半分を超える
            randX = Math.randomInt((boxWidth - enemyWidth(dEnemy)) / 2) + enemyWidth(dEnemy) / 2;
        } else {
            // 戦闘画面左半分で画像がはみ出さない範囲でランダム
            randX = Math.max(0, Math.randomInt(boxWidth / 2 - enemyWidth(dEnemy))) + enemyWidth(dEnemy);
        }


        return randX;

    }

    function getRandomY(dEnemy) {

        // ステータスウィンドウより上で、
        // かつ戦闘背景２と重ならない範囲でランダム
        const bswh = Window_Selectable.prototype.fittingHeight(4);
        const battlebacks2Height = 200;
        let randY = Math.randomInt(boxHeight - bswh - battlebacks2Height - enemyHeight(dEnemy) / 2);
        randY += battlebacks2Height + enemyHeight(dEnemy) / 2;

        //const randY = Math.max(0, Math.randomInt(boxHeight - bswh - enemyHeight(dEnemy))) + enemyHeight(dEnemy);

        return randY;
    }

    Game_Troop.prototype.rearrangeEnemiesFV = function(dEnemies) {

        // dataEnemyオブジェクトの配列を受け取って、
        // それぞれの内容から均等になるようにX座標を決めて
        // this._enemies に追加する。

        // 一旦内容をクリア
        this._enemies = [];

        // 登場する敵の画像の横幅を把握する
        let widths = [];
        let totalWidth = 0;
        for (let i = 0; i < dEnemies.length; i++) {

            widths.push(enemyWidth(dEnemies[i]));
            totalWidth += enemyWidth(dEnemies[i]);

        }

        // 左端空白[敵]minGap[敵]minGap...minGap[敵]minGap[敵]右端空白
        // となるようにX座標を決める
        const minGap = 24;
        const sideGap = (boxWidth - totalWidth - minGap * (widths.length - 1)) / 2;
        const bswh = Window_Selectable.prototype.fittingHeight(4);
        let gEnemy;
        let prevX;
        let x;
        const y = boxHeight - bswh;
        for (let i = 0; i < dEnemies.length; i++) {

            if (prevX) {

                // 左から２体め以降
                x = prevX + widths[i - 1] / 2 + minGap + widths[i] / 2;

            } else {

                // 左端
                x = sideGap + widths[0] / 2;

            }
            prevX = x;

            gEnemy = new Game_Enemy(dEnemies[i].id, x, y);
            if (dEnemies[i].hidden) {

                gEnemy.hide();

            }

            this._enemies.push(gEnemy);
        }
    };

    function enemyWidth(dEnemy) {

        if (!dEnemy) return 0;

        return Number(ImageManager.loadEnemy(dEnemy.battlerName).width);

    }

    function enemyHeight(dEnemy) {

        if (!dEnemy) return 0;

        return Number(ImageManager.loadEnemy(dEnemy.battlerName).height);

    }

})();