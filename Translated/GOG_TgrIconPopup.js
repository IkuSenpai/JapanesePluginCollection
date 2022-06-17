/*:
 * @target MZ
 * @plugindesc トレジャーアイコンのポップアップ
 * @author GrayOgre
 * @url https://grayogre.info/rmmz/plugin/index.html
 * @help
 *
 * このプラグインは以下の機能を提供します。
 * + ドロップアイテム獲得時に、指定アイコンをポップアップ表示する。
 *  
 * アイテムのメモ欄に<RotatePopup:アイコン番号>と記載すると
 * そのアイテムがドロップした場合、指定されたアイコン番号の
 * アイコンが回転しながらポップアップする。
 * 
 * プラグインコマンドはありません。
 *
 * var 1.1.1
 * 
 * Copyright (c) 2021 GrayOgre
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * 
 *
 * @param RealtimeGain
 *   @text 即時取得
 *   @desc エネミーが倒された直後にアイテム取得処理をします。
 *   @type boolean
 *   @on 有効
 *   @off 無効
 *   @default false
 * @param AnimationType
 *   @text アニメーションタイプ
 *   @desc アイコンのアニメーション方法
 *   @type select
 *   @option バウンド
 *   @value 0
 *   @option フローティング
 *   @value 1
 *   @default 0
 * @param FadeDuration
 *   @text 表示時間
 *   @desc アイコンを表示している時間
 *   @type number
 *   @default 20
 * @param IconScale
 *   @text アイコン拡大率
 *   @desc 初期表示時のアイコン拡大率
 *   @type number
 *   @decimals 2
 *   @default 0.8
 * @param FirstIconId
 *   @text ファーストアイコンID
 *   @desc ドロップ１番目のアイコン番号
 *   @default 89
 * @param SecondIconId
 *   @text セカンドアイコンID
 *   @desc ドロップ２番目のアイコン番号
 *   @default 88
 * @param ThirdIconId
 *   @text サードアイコンID
 *   @desc ドロップ３番目のアイコン番号
 *   @default 87
 * @param RotateSpeed
 *   @text 回転時の速度
 *   @desc 回転時の速度を指定する
 *   @type number
 *   @decimals 2
 *   @default 8
 * @param RotateDirection
 *   @text 回転方向
 *   @desc 回転時の方向
 *   @type select
 *   @option 右のみ
 *   @value 1
 *   @option 左右ランダム
 *   @value 0
 *   @option 左のみ
 *   @value -1
 *   @default 1
 * 
 */

(() => {
    'use strict';

    const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

    const META_KEY = "RotatePopup";

    const parameters = PluginManager.parameters(pluginName);

    const realtimeGain = parameters.RealtimeGain === 'true';
    const animationType = Number(parameters.AnimationType || 0);
    const fadeDuration = Number(parameters.FadeDuration || 20);
    const iconScale = Number(parameters.IconScale || 0.8);
    const firstIconId = Number(parameters.FirstIconId || 89);
    const secondIconId = Number(parameters.SecondIconId || 88);
    const thirdIconId = Number(parameters.ThirdIconId || 87);
    const rotateSpeed = Number(parameters.RotateSpeed || 8);
    const rotateDrirection = Number(parameters.RotateDirection || 1);

    //　状態管理クラス
    class DropTreasures {
        constructor() {
            this._spriteEnemyFrame = [];
            this._iconBitmap = null;
            this._frameX = []
            this._frameY = []
            this.needPopup = false;
            this.alreadyGainItems = false;
        }

        // アイコンのビットマップのロードとアイコンごとのフレームを計算
        loadIcons() {
            this._iconBitmap = ImageManager.loadSystem("IconSet");
            const width = ImageManager.iconWidth;
            const height = ImageManager.iconHeight;
            this._iconWidth = width;
            this._iconHeight = height;
            this._frameX.push(firstIconId % 16 * width);
            this._frameY.push(Math.floor(firstIconId / 16) * height);
            this._frameX.push(secondIconId % 16 * width);
            this._frameY.push(Math.floor(secondIconId / 16) * height);
            this._frameX.push(thirdIconId % 16 * width);
            this._frameY.push(Math.floor(thirdIconId / 16) * height);
        }

        // アイコンスプライトの生成
        createIcon(item, spriteEnemy) {
            const spriteTreasure = new Sprite_Treasure(this._iconBitmap);
            if (item.isRotate) {
                const frameX = item.iconIndex % 16 * ImageManager.iconWidth;
                const frameY = Math.floor(item.iconIndex / 16) * ImageManager.iconHeight;
                spriteTreasure.init(item, frameX, frameY, this._iconWidth, this._iconHeight, spriteEnemy);
            } else {
                const index = item.index;
                spriteTreasure.init(item, this._frameX[index], this._frameY[index],
                     this._iconWidth, this._iconHeight, spriteEnemy);
            }
            return spriteTreasure;
        }

    } 

    let dropTreasures = null;

    // 敵別のアイコンを保持するスプライト
    class Sprite_EnemyFrame extends Sprite {
        constructor() {
            super();
            this.visible = false;
        }

        // エネミースプライトで初期化
        init(enemySprite) {
            this._enemySprite = enemySprite;
            this._enemy = enemySprite._enemy;
            this.createIcon();
            if (realtimeGain) {
                DropTreasures.alreadyGainItems = true;
                this.gainDropItems();
            }
        }

        // ドロップアイテム取得
        gainDropItems() {
            if (this._enemy._treasures) {
                for (let item of this._enemy._treasures) {
                    console.log(item);
                    $gameParty.gainItem(item, 1);
                }
            }

        }
        
        // アイコンの生成と登録
        createIcon() {
            this._icons = [];
            while (this._enemy._popupQueue.length > 0) {
                let item = this._enemy._popupQueue.shift();
                const newSprite = dropTreasures.createIcon(item, this._enemySprite);
                this._icons.push(newSprite);
            }
            this._icons.sort(function (a, b) { return b.intY - a.intY });
            for (let i = 0; i < this._icons.length; i++) {
                this.addChild(this._icons[i]);
                this.refreshWait(this._icons[i], i, this._icons.length);
            }
        }

        // 消滅までの時間を設定
        refreshWait(sprite, index, maxv) {
            const mv = maxv * 20;
            const mvt = mv - (20 * index)
            sprite.wait = fadeDuration + mvt;
        };

        // 更新処理
        update() {
            super.update.call(this);
            this.x = this._enemySprite.x;
            this.y = this._enemySprite.y;
            if (dropTreasures._iconBitmap.isReady()) {
                for (let i = 0; i < this._icons.length; i++) {
                    if (this._icons[i].visible) {
                        this.visible = true;
                        this._icons[i].updateSprite();
                    };
                };
            };
        };
    }

    // アイコンスプライトの本体
    class Sprite_Treasure extends Sprite {
        constructor(bitmap) {
            super(bitmap);
        }

        // 初期化
        init(item, frameX, frameY, width, height, spriteEnemy) {
            this.setFrame(frameX, frameY, width, height);
            this._mode = item.isRotate ? 2 : animationType;
            this.anchor.x = 0.5;
            this.anchor.y = 1;
            const hrandom = Math.randomInt(height);
            this.intY = ((spriteEnemy.height / 3) + hrandom) - height;
            this.dr = 60;
            this.dy = 15;
            this.y = -40;
            this.ry = this.y + this.intY;
            const randx = (Math.random() * 0.5) + (item.index / 8);
            const rands = Math.randomInt(2);
            this.theta = 0;
            if (item.isRotate) {
                const dTheta = Math.PI * rotateSpeed / 64;
                this.anchor.y = 0.5;
                switch (rotateDrirection) {
                    case 0:
                        this.sx = rands === 0 ? randx : -randx;
                        this.dTheta = rands === 0 ? dTheta : -dTheta;
                        break;
                    case -1:
                        this.sx = -randx;
                        this.dTheta = -dTheta;
                        break;
                    default:
                        this.sx = randx;
                        this.dTheta = dTheta;
                }
            } else {
                this.sx = rands === 0 ? randx : -randx;
                this.dTheta = 0;
            }
            this.scale.x = iconScale;
            this.scale.y = iconScale;
        }

        // 跳ねる動作の更新
        updateBounce() {
            this.dy += 0.6;
            this.ry += this.dy;
            if (this.ry >= 0) {
                this.ry = 0;
                this.dy *= -0.7;
            };
            this.y = -this.intY + Math.round(this.ry);
            if (this.y < -this.intY) {
                 this.x += this.sx;
            }
            if (this.y === -this.intY) {
                this.updateFade();
            }
        };

        // 浮いている動作の更新
        updateFloat() {
            this.wait--;
            if (this.wait > 0) {
                return;
            };
            this.y -= 3;
            this.opacity -= 8;
        };

        // 回転する動作の更新
        updateRotate() {
            if (this.y < -this.intY) {
                this.rotation = this.theta;
                this.theta += this.dTheta;
            } else {
                this.rotation = 0;
            }
            this.updateBounce();
        }

        // 更新動作の振り分け
        updateAnimation() {
            switch (this._mode) {
                case 2:
                    this.updateRotate();
                    break;
                case 1:
                    this.updateFloat();
                    break;
                default:
                    this.updateBounce();
            }
        }

        // 消える動作の更新
        updateFade() {
            this.wait--;
            if (this.wait > 0) {
                return;
            }
            this.anchor.y = 1;
            this.opacity -= 15;
            this.scale.x -= 0.05
            this.scale.y += 0.15
        }

        // アイコンスプライトの更新
        updateSprite() {
            this.updateAnimation();
            if (this.opacity <= 0) {
                this.visible = false;
            }
            this.update();
        }
    }

    // 敵のスプライト一覧からアイコン保持用スプライトを生成
    const _spriteset_battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _spriteset_battle_update.call(this);
        if (dropTreasures.needPopup) {
            dropTreasures.needPopup = false;
            if (!this._enemyFrames) {
                this._enemyFrames = new Array(this._enemySprites.length);
            }
            for (let i = 0; i < this._enemySprites.length; i++) {
                if (this._enemySprites[i]._enemy && this._enemySprites[i]._enemy._popupQueue.length > 0) {
                    this._enemyFrames[i] = new Sprite_EnemyFrame();
                    this._enemyFrames[i].init(this._enemySprites[i]);
                    this._enemyFrames[i].z = this._enemySprites[i].z ? this._enemySprites[i].z + 1 : 2;
                    this._battleField.addChild(this._enemyFrames[i]);
                }
            }
        }
    };

    // 勝利時のドロップアイテム取得
    const _battlemanager_gainDropItems = BattleManager.gainDropItems;
    BattleManager.gainDropItems = function () {
	    if (!DropTreasures.alreadyGainItems) {
            _battlemanager_gainDropItems.call(this);
        }
    }

    // マップシーン初期化
    const _scene_map_initialize = Scene_Map.prototype.initialize;
    Scene_Map.prototype.initialize = function () {
	    DropTreasures.alreadyGainItems = false;
	    _scene_map_initialize.call(this);
    }


    // 敵データの初期化
    const _game_enemy_initMembers = Game_Enemy.prototype.initMembers;
    Game_Enemy.prototype.initMembers = function() {
        _game_enemy_initMembers.call(this);
        if (!dropTreasures) {
            dropTreasures = new DropTreasures();
            dropTreasures.loadIcons();
        }
        // ドロップアイテム用の初期化処理
        this._treasures = null;
        this._popupQueue = [];
        this._checkTreasures = false;
    };

    // ドロップアイテムの生成
    const _game_enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
    Game_Enemy.prototype.makeDropItems = function() {
        if (!this._checkTreasures) {
            const rate = this.dropItemRate();
            return this.enemy().dropItems.reduce((r, di, index) => {
                if (di.kind > 0 && Math.random() * di.denominator < rate) {
                    const item = this.itemObject(di.kind, di.dataId);
                    checkMeta(item);
                    item.index = index;
                    this._popupQueue.push(item);
                    return r.concat(item);
                } else {
                    return r;
                }
            }, []);
        } else {
            return this._treasures;
        }
    };

    // ドロップアイテム生成の起動
    Game_Enemy.prototype.pickupTreasures = function() {
        if (!this._checkTreasures) {
            this._treasures = this.makeDropItems();
            this._checkTreasures = true;
            dropTreasures.needPopup = true;
        }
    };

    // 倒された敵スプライトの処理
    const _sprite_enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
    Sprite_Enemy.prototype.updateCollapse = function() {
        _sprite_enemy_updateCollapse.call(this);
        // ドロップアイテムの設定処理を呼ぶ
        if (this._effectDuration === 0 && !this._checkTreasures) {
            this._enemy.pickupTreasures();
        }
    };

    // 倒された敵スプライトの処理（ボス）
    const _sprite_enemy_updateBossCollapse = Sprite_Enemy.prototype.updateBossCollapse;
    Sprite_Enemy.prototype.updateBossCollapse = function() {
        _sprite_enemy_updateBossCollapse.call(this);
        // ドロップアイテムの設定処理を呼ぶ
        if (this._effectDuration === 0 && !this._checkTreasures) {
            this.pickupTreasures();
        }
    };

    // 倒されたスプライトの処理（即時）
    const _sprite_enemy_updateInstantCollapse = Sprite_Enemy.prototype.updateInstantCollapse;
    Sprite_Enemy.prototype.updateInstantCollapse = function () {
        _sprite_enemy_updateInstantCollapse.call(this);
        // ドロップアイテムの設定処理を呼ぶ
        if (this._effectDuration === 0 && !this._checkTreasures) {
            this.pickupTreasures();
        }
    }

    // メタタグがついたアイテムの処理
    function checkMeta(item) {
        if (item.meta && item.meta[META_KEY]) {
            item.iconIndex = Number(item.meta[META_KEY]);
            item.isRotate = true;
        } else {
            item.isRotate = false;
        }
    }

})();