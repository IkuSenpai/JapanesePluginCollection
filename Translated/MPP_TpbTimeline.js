//=============================================================================
// MPP_TpbTimeline.js
//=============================================================================
// Copyright (c) 2021 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc The accumulated condition of the time gauges of all enemies and allies is displayed on one line.
 * @author Mokusei Penguin
 * @url 
 * 
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Plugin command details
 *  - In the item to enter a numerical value, select the text and
 *    write v[N] to refer to the variable N.
 *  
 *  〇 setIcon
 *       actorId   : Actor ID
 *       iconIndex : Icon Index
 *   - Change the icon number of the actor.
 *   - The default value is the ID of each actor.
 * 
 * ▼ Enemy note
 *  〇 <TimelineIcon:n>
 *   - Set the icon number when using the enemy icon image.
 * 
 * ▼ Material standard
 *  - Please put the material to be used in the img/system folder.
 *  
 *  〇 Actor icon image / Enemy icon image
 *   - For the icon image, make one block by arranging eight in the horizontal
 *     direction, and use the block that is lengthened vertically as much as
 *     necessary.
 *   - Set the height of the icon with the plugin parameters.
 * 
 * ▼ About automatic image generation
 *  - If the timeline image and actor and enemy icon images are
 *    not set, they will be automatically generated.
 *  - A walking character graphic is used for the actor's icon image.
 *  - If the walking character graphic is specified, the icon image of the
 *    enemy will be used.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @command setIcon
 *      @desc 
 *      @arg actorId
 *          @desc 
 *          @type actor
 *          @default 0
 *      @arg iconIndex
 *          @desc 
 *          @type number
 *          @default 0
 * 
 *  @command setTimelineVisible
 *      @desc 
 *      @arg visible
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 * 
 *  @param Timeline
 *      @desc When changing to the vertical type, other parameters must be changed as well.
 *      @type struct<Timeline>
 *      @default {"Type":"Horizontal","Image Name":"","X":"64","Y":"368","Start X":"6","Wait Width":"320","Action Width":"128"}
 * 
 *  @param Actor Icon
 *      @desc 
 *      @type struct<ActorIcon>
 *      @default {"Image Name":"","Height":"48","Origin X":"0","Origin Y":"-22"}
 * 
 *  @param Enemy Icon
 *      @desc 
 *      @type struct<EnemyIcon>
 *      @default {"Image Name":"","Height":"48","Origin X":"0","Origin Y":"22","Symbol Type":"letter","Symbol X":"-9","Symbol Y":"10","Symbol Size":"16"}
 * 
 *  @param Enemy Origins
 *      @desc Set the center position of the enemy graphic to be displayed.
 *      @type struct<EnemyOrigins>[]
 *      @default ["{\"Enemy Image\":\"sv_enemies/Goblin\",\"Origin X\":\"68\",\"Origin Y\":\"29\"}"]
 *      @parent Enemy Icon
 * 
 *  @param Battle Speed Rate
 *      @desc Time gauge increase rate(%)
 *      (100:Default)
 *      @type number
 *          @min 1
 *          @max 200
 *      @default 50
 * 
 *  @param Icon Stop At Force Action
 *      @desc The icon will not move while [Force Action] is running.
 *      @type boolean
 *      @default true
 * 
 */

/*~struct~Timeline:
 *  @param Type
 *      @desc 
 *      @type select
 *          @option Horizontal
 *          @option Vertical
 *      @default Horizontal
 * 
 *  @param Image Name
 *      @desc Automatically generated if not set
 *      @type file
 *          @require 1
 *          @dir img/system
 *      @default
 * 
 *  @param X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 64
 * 
 *  @param Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 368
 * 
 *  @param Z
 *      @desc 
 *      @type select
 *          @option Behind the window
 *          @option Before the window
 *      @default Behind the window
 * 
 *  @param Start X
 *      @desc In the case of vertical type, Y coordinate from the bottom
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 6
 * 
 *  @param Wait Width
 *      @desc Height for vertical type
 *      @type number
 *          @min 1
 *          @max 99999
 *      @default 320
 * 
 *  @param Action Width
 *      @desc Height for vertical type
 *      @type number
 *          @min 0
 *          @max 99999
 *      @default 128
 * 
 */

/*~struct~ActorIcon:
 *  @param Image Name
 *      @desc Automatically generated if not set
 *      @type file
 *          @require 1
 *          @dir img/system
 *      @default
 *
 *  @param Height
 *      @desc Only when you specify an image
 *      @type number
 *          @min 1
 *          @max 99999
 *      @default 48
 *      @parent Image Name
 * 
 *  @param Origin X
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default 0
 * 
 *  @param Origin Y
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default -25
 */

/*~struct~EnemyIcon:
 *  @param Image Name
 *      @desc Automatically generated if not set
 *      @type file
 *          @require 1
 *          @dir img/system
 *      @default
 *
 *  @param Height
 *      @desc Only when you specify an image
 *      @type number
 *          @min 1
 *          @max 99999
 *      @default 48
 *      @parent Image Name
 * 
 *  @param Origin X
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default 0
 * 
 *  @param Origin Y
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default 25
 * 
 *  @param Symbol Type
 *      @desc Characters to be displayed on top of the icon
 *      @type select
 *          @option none
 *          @option letter
 *          @option index
 *      @default letter
 * 
 *  @param Symbol X
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 0
 * 
 *  @param Symbol Y
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default -15
 * 
 *  @param Symbol Size
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 64
 *      @default 17
 * 
 */

/*~struct~EnemyOrigins:
 *  @param Enemy Image
 *      @desc Only the file name is used in the internal processing.
 * The battle view type and folder name do not have to match.
 *      @type file
 *          @require 1
 *          @dir img
 *      @default sv_enemies/
 * 
 *  @param Origin X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Origin Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 敵味方全員のタイムゲージのたまり具合を１ライン上に表示します。
 * @author 木星ペンギン
 * @url 
 * 
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ プラグインコマンド詳細
 *  - 数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 アイコン設定
 *       actorId   : アクターのID
 *       iconIndex : アイコン番号
 *   - アクターのアイコン番号を変更します。
 *   - デフォルト値は各アクターのIDです。
 * 
 * ▼ 敵キャラのメモ欄
 *  〇 <TimelineIcon:n>
 *   - 敵キャラアイコン画像を使用した場合のアイコン番号を設定します。
 *   - 指定していない場合は0となります。
 * 
 * ▼ 素材規格
 *  - 使用する素材は img/system フォルダに入れてください。
 *  
 *  〇 アクターアイコン画像 / 敵キャラアイコン画像
 *   - アイコン画像は横方向に8個並べたものを1ブロックとし、
 *     そのブロックを必要なだけ縦に長くしたものを使用してください。
 *   - アイコンの高さはプラグインパラメータで設定してください。
 * 
 * ▼ 画像の自動生成について
 *  - タイムライン画像とアクター及び敵キャラアイコン画像は未設定の場合、
 *    自動生成されます。
 *  - アクターのアイコン画像には歩行キャラグラフィックが使用されます。
 *  - 敵キャラのアイコン画像は、歩行キャラグラフィックを指定している場合、
 *    その画像が使用されます。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @command setIcon
 *      @text アイコン設定
 *      @desc 
 *      @arg actorId
 *          @text アクター
 *          @desc 
 *          @type actor
 *          @default 0
 *      @arg iconIndex
 *          @text アイコン番号
 *          @desc 
 *          @type number
 *          @default 0
 * 
 *  @command setTimelineVisible
 *      @text タイムライン表示設定
 *      @desc 
 *      @arg visible
 *          @text 表示/非表示
 *          @desc 
 *          @type boolean
 *          @default true
 * 
 * 
 *  @param Timeline
 *      @text タイムライン
 *      @desc 縦タイプに変更する場合、他のパラメータも合わせて変更する必要があります。
 *      @type struct<Timeline>
 *      @default {"Type":"Horizontal","Image Name":"","X":"64","Y":"368","Start X":"6","Wait Width":"320","Action Width":"128"}
 * 
 *  @param Actor Icon
 *      @text アクターアイコン
 *      @desc 
 *      @type struct<ActorIcon>
 *      @default {"Image Name":"","Height":"48","Origin X":"0","Origin Y":"-22"}
 * 
 *  @param Enemy Icon
 *      @text 敵キャラアイコン
 *      @desc 
 *      @type struct<EnemyIcon>
 *      @default {"Image Name":"","Height":"48","Origin X":"0","Origin Y":"22","Symbol Type":"letter","Symbol X":"-9","Symbol Y":"10","Symbol Size":"16"}
 * 
 *  @param Enemy Origins
 *      @text 敵キャラグラフィック原点
 *      @desc 表示する敵グラフィックの中心位置を設定します。
 *      @type struct<EnemyOrigins>[]
 *      @default ["{\"Enemy Image\":\"sv_enemies/Goblin\",\"Origin X\":\"68\",\"Origin Y\":\"29\"}"]
 *      @parent Enemy Icon
 * 
 *  @param Battle Speed Rate
 *      @text 戦闘速度
 *      @desc タイムゲージの増加率(%)
 *      (100:デフォルト)
 *      @type number
 *          @min 1
 *          @max 200
 *      @default 50
 * 
 *  @param Icon Stop At Force Action
 *      @text 戦闘行動の強制中アイコン停止
 *      @desc [戦闘行動の強制]実行中はアイコンが移動しなくなります。
 *      @type boolean
 *      @default true
 * 
 */

/*~struct~Timeline:ja
 *  @param Type
 *      @text タイプ
 *      @desc 
 *      @type select
 *          @option 横
 *          @value Horizontal
 *          @option 縦
 *          @value Vertical
 *      @default Horizontal
 * 
 *  @param Image Name
 *      @text 画像ファイル名
 *      @desc 未設定の場合は自動生成
 *      @type file
 *          @require 1
 *          @dir img/system
 *      @default
 * 
 *  @param X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 64
 * 
 *  @param Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 368
 * 
 *  @param Z
 *      @desc 
 *      @type select
 *          @option ウィンドウの下
 *          @value Behind the window
 *          @option ウィンドウの上
 *          @value Before the window
 *      @default Behind the window
 * 
 *  @param Start X
 *      @text 開始X座標
 *      @desc 縦タイプの場合は下端からのY座標
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 6
 * 
 *  @param Wait Width
 *      @text ウェイトゲージ幅
 *      @desc 縦タイプの場合は高さ
 *      @type number
 *          @min 1
 *          @max 99999
 *      @default 320
 * 
 *  @param Action Width
 *      @text アクションゲージ幅
 *      @desc 縦タイプの場合は高さ
 *      @type number
 *          @min 0
 *          @max 99999
 *      @default 128
 * 
 */

/*~struct~ActorIcon:ja
 *  @param Image Name
 *      @text 画像ファイル名
 *      @desc 未設定の場合は自動生成
 *      @type file
 *          @require 1
 *          @dir img/system
 *      @default
 *
 *  @param Height
 *      @text 高さ
 *      @desc 画像を指定した場合のみ
 *      @type number
 *          @min 1
 *          @max 99999
 *      @default 48
 *      @parent Image Name
 * 
 *  @param Origin X
 *      @text 原点X
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default 0
 * 
 *  @param Origin Y
 *      @text 原点Y
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default -25
 * 
 */

/*~struct~EnemyIcon:ja
 *  @param Image Name
 *      @text 画像ファイル名
 *      @desc 未設定の場合は自動生成
 *      @type file
 *          @require 1
 *          @dir img/system
 *      @default
 *
 *  @param Height
 *      @text 高さ
 *      @desc 画像を指定した場合のみ
 *      @type number
 *          @min 1
 *          @max 99999
 *      @default 48
 *      @parent Image Name
 * 
 *  @param Origin X
 *      @text 原点X
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default 0
 * 
 *  @param Origin Y
 *      @text 原点Y
 *      @desc 
 *      @type number
 *          @min -100
 *          @max 100
 *      @default 25
 * 
 *  @param Symbol Type
 *      @text シンボルタイプ
 *      @desc アイコンに重ねて表示する文字
 *      @type select
 *          @option none
 *          @option letter
 *          @option index
 *      @default letter
 * 
 *  @param Symbol X
 *      @text シンボルX座標
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default -9
 * 
 *  @param Symbol Y
 *      @text シンボルY座標
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 10
 * 
 *  @param Symbol Size
 *      @text シンボル文字サイズ
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 64
 *      @default 17
 * 
 */

/*~struct~EnemyOrigins:ja
 *  @param Enemy Image
 *      @text 敵キャラ画像
 *      @desc 内部処理で使用されるのはファイル名のみです。
 * 戦闘の視点タイプとフォルダ名が一致している必要はありません
 *      @type file
 *          @require 1
 *          @dir img
 *      @default sv_enemies/
 * 
 *  @param Origin X
 *      @text 原点X
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 *  @param Origin Y
 *      @text 原点Y
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 9999
 *      @default 0
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_TpbTimeline';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReviver = (key, value) => {
        try {
            return JSON.parse(value, paramReviver);
        } catch (e) {
            return value;
        }
    };
    const param_Timeline = JSON.parse(parameters['Timeline'] || '{}', paramReviver);
    const param_ActorIcon = JSON.parse(parameters['Actor Icon'] || '{}', paramReviver);
    const param_EnemyIcon = JSON.parse(parameters['Enemy Icon'] || '{}', paramReviver);
    const param_EnemyOrigins = JSON.parse(parameters['Enemy Origins'] || '[]', paramReviver);
    const param_BattleSpeedRate = Number(parameters['Battle Speed Rate'] || 50);
    const param_IconStopAtForceAction = parameters['Icon Stop At Force Action'] === 'true';
    
    // Dealing with other plugins
    const _importedPlugin = (...names) => {
        return names.some(name => PluginManager._scripts.includes(name));
    };

    let timelineVisible = true;
    
    //-------------------------------------------------------------------------
    // BattleManager

    BattleManager.isActionForcing = function() {
        return this._subject && this._action && this._action.isForcing();
    };

    //-------------------------------------------------------------------------
    // Game_Action

    Game_Action.prototype.isForcing = function() {
        return this._forcing;
    };

    //-------------------------------------------------------------------------
    // Game_Battler

    Game_Battler.prototype.tpbCastTime = function() {
        const maxTime = this.tpbRequiredCastTime();
        return maxTime > 0 ? this._tpbCastTime / maxTime : 0;
    };

    Game_Battler.prototype.isTpbCasting = function() {
        return this._tpbState === 'casting';
    };

    const _Game_Battler_tpbAcceleration = Game_Battler.prototype.tpbAcceleration;
    Game_Battler.prototype.tpbAcceleration = function() {
        const acc = _Game_Battler_tpbAcceleration.apply(this, arguments);
        return acc * param_BattleSpeedRate / 100;
    };

    const _Game_Battler_makeTpbActions = Game_Battler.prototype.makeTpbActions;
    Game_Battler.prototype.makeTpbActions = function() {
        _Game_Battler_makeTpbActions.apply(this, arguments);
        if (!this.canInput() && this._actions.every(action => !action.item())) {
            this.clearTpbChargeTime();
            this.setActionState('undecided');
        }
    };

    const _Game_Battler_onRestrict = Game_Battler.prototype.onRestrict;
    Game_Battler.prototype.onRestrict = function() {
        _Game_Battler_onRestrict.apply(this, arguments);
        this.setActionState('undecided');
    };

    //-------------------------------------------------------------------------
    // Game_Actor

    const _Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function(actorId) {
        _Game_Actor_setup.apply(this, arguments);
        this._timelineIconIndex = actorId;
    };

    Game_Actor.prototype.timelineIconIndex = function() {
        return this._timelineIconIndex;
    };

    Game_Actor.prototype.setTimelineIcon = function(index) {
        this._timelineIconIndex = index;
    };

    //-------------------------------------------------------------------------
    // Game_Enemy

    Game_Enemy.prototype.timelineIconIndex = function() {
        return +(this.enemy().meta.TimelineIcon || 0);
    };

    Game_Enemy.prototype.timelineSymbol = function() {
        switch (param_EnemyIcon['Symbol Type']) {
            case 'letter':
                return this._plural ? this._letter : '';
            case 'index':
                return $gameTroop.members().length > 1 ? this.index() + 1 : '';
        }
        return '';
    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager.registerCommand(pluginName, 'setIcon', args => {
        const actorId = PluginManager.mppValue(args.actorId);
        const actor = $gameActors.actor(actorId);
        if (actor) {
            actor.setTimelineIcon(PluginManager.mppValue(args.iconIndex));
        }
    });

    PluginManager.registerCommand(pluginName, 'setTimelineVisible', args => {
        timelineVisible = args.visible === 'true';
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
    
    //-------------------------------------------------------------------------
    // Sprite_TimelineIcon

    class Sprite_TimelineIcon extends Sprite {
        constructor(battler) {
            super();
            this.initMembers();
            this.z = this.basePriority();
            this.anchor.set(0.5);
            this.setBattler(battler);
        }

        initMembers() {
            this._battler = null;
            this._iconSymbol = '';
            this._value = NaN;
            this._targetValue = NaN;
            this._duration = 0;
            this._flashCount = 0;
            this._original = !!this.iconParam()['Image Name'];
            this._imageName = '';
        }

        destroy() {
            this.destroyIconBitmap();
            super.destroy();
        }
    
        destroyIconBitmap() {
            if (!this._original && this.bitmap) {
                this.bitmap.destroy();
                this.bitmap = null;
            }
        }
    
        basePriority() {
            return 0;
        }
    
        iconParam() {
            return {};
        }
    
        setBattler(battler) {
            if (this._battler !== battler) {
                this._battler = battler;
                this._value = this.currentValue();
                this._imageName = '';
                this.destroyIconBitmap();
            }
        }
    
        iconBitmap() {
            if (this._battler) {
                return this.userIconBitmap() || this.createBitmap();
            }
            return null;
        }
    
        userIconBitmap() {
            const imageName = this.iconParam()['Image Name'];
            return imageName ? ImageManager.loadSystem(imageName) : null;
        }
    
        createBitmap() {
            const {
                'Origin X': originX = 0,
                'Origin Y': originY = 0
            } = this.iconParam();
            return param_Timeline.Type === 'Horizontal'
                ? this.createHorizontalBitmap(originX, originY)
                : this.createVerticalBitmap(originX, originY);
        }
    
        createHorizontalBitmap(originX, originY) {
            const bitmap = new Bitmap(34, 60);
            const x = 17;
            const y = 30;
            if (originY < -20) {
                this.drawUpTriangle(bitmap, x, y, originX);
            } else if (originY > 20) {
                this.drawDownTriangle(bitmap, x, y, originX);
            }
            this.drawSquare(bitmap, x, y);
            bitmap.baseTexture.update();
            return bitmap;
        }
    
        createVerticalBitmap(originX, originY) {
            const bitmap = new Bitmap(60, 36);
            const x = 30;
            const y = 18;
            if (originX < -20) {
                this.drawLeftTriangle(bitmap, x, y, originY);
            } else if (originX > 20) {
                this.drawRightTriangle(bitmap, x, y, originY);
            }
            this.drawSquare(bitmap, x, y);
            bitmap.baseTexture.update();
            return bitmap;
        }
    
        drawUpTriangle(bitmap, x, y, originX) {
            const context = bitmap.context;
            context.save();
            context.beginPath();
            context.moveTo(x + originX, y - 30);
            context.lineTo(x + 15, y);
            context.lineTo(x - 15, y);
            context.closePath();
            this.fillTriangle(context, x, y - 30, x, y);
            context.restore();
        }
    
        drawDownTriangle(bitmap, x, y, originX) {
            const context = bitmap.context;
            context.save();
            context.beginPath();
            context.moveTo(x + originX, y + 30);
            context.lineTo(x - 15, y);
            context.lineTo(x + 15, y);
            context.closePath();
            this.fillTriangle(context, x, y + 30, x, y);
            context.restore();
        }
    
        drawLeftTriangle(bitmap, x, y, originY) {
            const context = bitmap.context;
            context.save();
            context.beginPath();
            context.moveTo(x - 30, y + originY);
            context.lineTo(x, y - 15);
            context.lineTo(x, y + 15);
            context.closePath();
            this.fillTriangle(context, x - 30, y, x, y);
            context.restore();
        }
    
        drawRightTriangle(bitmap, x, y, originY) {
            const context = bitmap.context;
            context.save();
            context.beginPath();
            context.moveTo(x + 30, y + originY);
            context.lineTo(x, y + 15);
            context.lineTo(x, y - 15);
            context.closePath();
            this.fillTriangle(context, x + 30, y, x, y);
            context.restore();
        }
    
        fillTriangle(context, x1, y1, x2, y2) {
            const gradient = context.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, this.triangleColor1());
            gradient.addColorStop(1, this.triangleColor2());
            context.fillStyle = gradient;
            context.fill();
            context.lineJoin = 'bevel';
            context.strokeStyle = 'black';
            context.stroke();
        }
    
        triangleColor1() {
            return null;
        }
        
        triangleColor2() {
            return null;
        }
        
        drawSquare(bitmap, x, y) {
            const context = bitmap.context;
            const r = 15;
            context.save();

            context.beginPath();
            context.moveTo(x, y - r);
            context.lineTo(x + r, y);
            context.lineTo(x, y + r);
            context.lineTo(x - r, y);
            context.closePath();
            context.fillStyle = 'white';
            context.fill();
            context.lineWidth = 4;
            context.lineJoin = 'bevel';
            context.strokeStyle = 'black';
            context.stroke();

            const gradient = context.createLinearGradient(x, y - r - 1, x, y + r + 1);
            gradient.addColorStop(0, this.squareColor1());
            gradient.addColorStop(1, this.squareColor2());
            context.lineWidth = 2;
            context.strokeStyle = gradient;
            context.stroke();
            context.restore();
        }
    
        squareColor1() {
            return null;
        }
        
        squareColor2() {
            return null;
        }
    
        update() {
            super.update();
            this.updateVisibility();
            if (this.visible) {
                this.updateBitmap();
                this.updateFrame();
                this.updateMove();
                this.updateFlash();
                this.updatePriority();
            }
        }
    
        updateVisibility() {
            const battler = this._battler;
            this.visible = (battler && (battler.isActor() || battler.isAlive()));
        }
    
        updateBitmap() {
            if (!this.bitmap) {
                this.bitmap = this.iconBitmap();
            }
            if (!this._original) {
                if (this.isImageChanged()) {
                    this.changeImage();
                    this._imageBitmap = this.loadImageBitmap();
                }
                if (this._imageBitmap && this._imageBitmap.isReady()) {
                    this.drawImage(this._imageBitmap);
                    this._imageBitmap = null;
                }
            }
        }
    
        isImageChanged() {
            return false;
        }
        
        changeImage() {
        }
        
        loadImageBitmap() {
            return null;
        }
        
        drawImage() {
        }
        
        updateFrame() {
            if (this._original && this.bitmap.isReady()) {
                const iconIndex = this._battler.timelineIconIndex();
                const cw = this.bitmap.width / 8;
                const ch = this.iconParam()['Height'] || 48;
                const cx = iconIndex % 8 * cw;
                const cy = Math.floor(iconIndex / 8) * ch;
                this.setFrame(cx, cy, cw, ch);
            }
        }
    
        updateMove() {
            const value = this.currentValue();
            if (value !== this._targetValue) {
                this.updateTargetValue(value);
            }
            this.updateAnimation();
            this.updatePosition();
        }
    
        updateTargetValue(value) {
            this._targetValue = value;
            if (isNaN(this._value)) {
                this._value = value;
            } else {
                this._duration = this._value < value ? 4 : 8;
            }
        }
    
        updateAnimation() {
            if (this._duration > 0) {
                const d = this._duration;
                this._value = (this._value * (d - 1) + this._targetValue) / d;
                this._duration--;
            }
        }
    
        updatePosition() {
            const {
                'Type': type = 'Horizontal',
                'Start X': startX = 6
            } = param_Timeline;
            const timeWidth = this.timeWidth();
            if (type === 'Horizontal') {
                this.x = startX + timeWidth;
                this.y = -(this.iconParam()['Origin Y'] || 0);
            } else {
                this.x = -(this.iconParam()['Origin X'] || 0);
                this.y = -startX - timeWidth;
            }
        }
    
        timeWidth() {
            const {
                'Wait Width': waitWidth = 320,
                'Action Width': actionWidth = 128
            } = param_Timeline;
            if (this._value > 1) {
                return waitWidth + Math.floor(actionWidth * (this._value - 1));
            } else {
                return Math.floor(waitWidth * this._value);
            }
        }
    
        currentValue() {
            const battler = this._battler;
            if (battler) {
                if (battler.isTpbCasting()) {
                    return battler.tpbCastTime() + 1;
                } else if (this.isBattlerActing(battler)) {
                    return 2;
                } else {
                    return Math.max(battler.tpbChargeTime(), 0);
                }
            }
            return NaN;
        }
    
        isBattlerActing(battler) {
            return (
                (battler.isWaiting() || battler.isActing()) &&
                !this.isEventWait()
            );
        }
    
        isEventWait() {
            return (
                param_IconStopAtForceAction &&
                BattleManager.isActionForcing()
            );
        }
    
        updateFlash() {
            if (this._battler.isInputting() || this._battler.isSelected()) {
                this._flashCount++;
                if (this._flashCount % 30 < 15) {
                    this.setBlendColor(this.flashingColor1());
                } else {
                    this.setBlendColor(this.flashingColor2());
                }
            } else {
                this._flashCount = 0;
                this.setBlendColor([0, 0, 0, 0]);
            }
        }
    
        flashingColor1() {
            return [255, 255, 255, 64];
        }
    
        flashingColor2() {
            return this._battler.isSelected() ? [0, 0, 0, 0] : [0, 0, 255, 48];
        }
    
        updatePriority() {
            if (this._battler.isSelected()) {
                this.z = 3;
            } else if (this._battler.isInputting()) {
                this.z = 2;
            } else {
                this.z = this.basePriority();
            }
        }
    
    }
    
    //-------------------------------------------------------------------------
    // Sprite_ActorTimelineIcon

    class Sprite_ActorTimelineIcon extends Sprite_TimelineIcon {
        basePriority() {
            return 1;
        }
    
        iconParam() {
            return param_ActorIcon;
        }
    
        triangleColor1() {
            return 'rgb(255,255,255)';
        }
        
        triangleColor2() {
            return 'rgb(128,255,255)';
        }
        
        squareColor1() {
            return 'rgb(128,255,255)';
        }
        
        squareColor2() {
            return 'rgb(0,128,255)';
        }
        
        isImageChanged() {
            return (
                this._imageName !== this._battler.characterName() ||
                this._characterIndex !== this._battler.characterIndex()
            );
        }
        
        changeImage() {
            this._imageName = this._battler.characterName();
            this._characterIndex = this._battler.characterIndex();
        }
        
        loadImageBitmap() {
            return ImageManager.loadCharacter(this._imageName);
        }
        
        drawImage(imageBitmap) {
            const x = this.bitmap.width / 2;
            const y = this.bitmap.height / 2;
            const index = this._characterIndex;
            const isBig = ImageManager.isBigCharacter(this._imageName);
            const r = 17;
            const pw = imageBitmap.width / (isBig ? 3 : 12);
            const ph = imageBitmap.height / (isBig ? 4 : 8);
            const sx = ((isBig ? 0 : (index % 4) * 3) + 1) * pw;
            const sy = ((isBig ? 0 : Math.floor(index / 4) * 4) + 2) * ph;
            const dx = x - r;
            const dy = y - r;
            const dw = r * 2;
            const dh = Math.floor(ph * dw / pw);
            const context = this.bitmap.context;
            context.save();
            context.beginPath();
            context.moveTo(x - r, y - r);
            context.lineTo(x + r, y - r);
            context.lineTo(x + r, y);
            context.lineTo(x + r - 4, y);
            context.lineTo(x, y + r - 4);
            context.lineTo(x - r + 4, y);
            context.lineTo(x - r, y);
            context.closePath();
            context.clip();
            context.drawImage(imageBitmap.canvas, sx, sy, pw, ph, dx, dy, dw, dh);
            context.restore();
            this.bitmap.baseTexture.update();
        }
    
    }

    //-------------------------------------------------------------------------
    // Sprite_EnemyTimelineIcon

    class Sprite_EnemyTimelineIcon extends Sprite_TimelineIcon {
        constructor(battler) {
            super(battler);
            this.createSymbolSprite();
        }

        destroy() {
            this._symbolSprite.bitmap.destroy();
            super.destroy();
        }
    
        createSymbolSprite() {
            this._symbolSprite = new Sprite();
            this._symbolSprite.bitmap = this.createSymbolBitmap();
            this._symbolSprite.opacity = 224;
            this._symbolSprite.anchor.set(0.5)
            this.addChild(this._symbolSprite);
        }
    
        createSymbolBitmap() {
            const size = this.iconParam()['Symbol Size'] || 17;
            const bitmap = new Bitmap(size + 4, size + 4);
            bitmap.fontSize = size;
            bitmap.fontBold = true;
            bitmap.outlineColor = 'rgba(0, 0, 0, 0.8)';
            bitmap.outlineWidth = 4;
            return bitmap;
        }
    
        iconParam() {
            return param_EnemyIcon;
        }
    
        triangleColor1() {
            return 'rgb(255,255,255)';
        }
        
        triangleColor2() {
            return 'rgb(255,192,192)';
        }
        
        squareColor1() {
            return 'rgb(255,192,192)';
        }
        
        squareColor2() {
            return 'rgb(255,96,96)';
        }
        
        battlerOriginParams() {
            return param_EnemyOrigins.find(params => {
                const [ , battlerName ] = params['Enemy Image'].split('/');
                return battlerName === this._imageName;
            });
        }
    
        update() {
            super.update();
            if (this.visible && this.bitmap && this.bitmap.isReady()) {
                this.updateSymbol();
            }
        }
    
        isImageChanged() {
            return (
                this._imageName !== this._battler.battlerName() ||
                this._battlerHue !== this._battler.battlerHue()
            );
        }
        
        changeImage() {
            this._imageName = this._battler.battlerName();
            this._battlerHue = this._battler.battlerHue();
        }
        
        loadImageBitmap() {
            if (this.battlerOriginParams()) {
                return $gameSystem.isSideView()
                    ? ImageManager.loadSvEnemy(this._imageName)
                    : ImageManager.loadEnemy(this._imageName);
            }
            return null;
        }
        
        drawImage(battlerBitmap) {
            const x = this.bitmap.width / 2;
            const y = this.bitmap.height / 2 - 2;
            const {
                'Origin X': ox = 0,
                'Origin Y': oy = 0
            } = this.battlerOriginParams();
            const hue = this._battlerHue;
            const r = 17 - 2.25;
            const context = this.bitmap.context;
            const sw = Math.ceil(r * 3.333);
            const sh = Math.ceil(r * 3.333);
            const sx = ox - Math.floor(sw / 2);
            const sy = oy - Math.floor(sh / 2);
            const dx = x - r;
            const dy = y - r;
            const dw = r * 2;
            const dh = r * 2;
            const hueCanvas = this.rotateHueBitmap(battlerBitmap, hue, sx, sy, sw, sh);
            context.save();
            context.beginPath();
            context.moveTo(x, y - r);
            context.lineTo(x + r, y);
            context.lineTo(x, y + r);
            context.lineTo(x - r, y);
            context.closePath();
            context.clip();
            context.drawImage(hueCanvas, 0, 0, sw, sh, dx, dy, dw, dh);
            context.restore();
            this.bitmap.baseTexture.update();
        }
    
        rotateHueBitmap(baseBitmap, offset, sx, sy, sw, sh) {
            offset = ((offset % 360) + 360) % 360;
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const imageData = baseBitmap.context.getImageData(sx, sy, sw, sh);
            canvas.width = sw;
            canvas.height = sh;
            if (offset > 0) {
                function rgbToHsl(r, g, b) {
                    const cmin = Math.min(r, g, b);
                    const cmax = Math.max(r, g, b);
                    const delta = cmax - cmin;
                    let h = 0;
                    let s = 0;
                    let l = (cmin + cmax) / 2;
            
                    if (delta > 0) {
                        if (r === cmax) {
                            h = 60 * (((g - b) / delta + 6) % 6);
                        } else if (g === cmax) {
                            h = 60 * ((b - r) / delta + 2);
                        } else {
                            h = 60 * ((r - g) / delta + 4);
                        }
                        s = delta / (255 - Math.abs(2 * l - 255));
                    }
                    return [h, s, l];
                }
            
                function hslToRgb(h, s, l) {
                    const c = (255 - Math.abs(2 * l - 255)) * s;
                    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
                    const m = l - c / 2;
                    const cm = c + m;
                    const xm = x + m;
            
                    if (h < 60) {
                        return [cm, xm, m];
                    } else if (h < 120) {
                        return [xm, cm, m];
                    } else if (h < 180) {
                        return [m, cm, xm];
                    } else if (h < 240) {
                        return [m, xm, cm];
                    } else if (h < 300) {
                        return [xm, m, cm];
                    } else {
                        return [cm, m, xm];
                    }
                }
            
                const pixels = imageData.data;
                for (let i = 0; i < pixels.length; i += 4) {
                    const hsl = rgbToHsl(pixels[i + 0], pixels[i + 1], pixels[i + 2]);
                    const h = (hsl[0] + offset) % 360;
                    const s = hsl[1];
                    const l = hsl[2];
                    const rgb = hslToRgb(h, s, l);
                    pixels[i + 0] = rgb[0];
                    pixels[i + 1] = rgb[1];
                    pixels[i + 2] = rgb[2];
                }
            }
            context.putImageData(imageData, 0, 0);
            return canvas;
        }
    
        updateSymbol() {
            const symbol = this._battler.timelineSymbol();
            if (this._iconSymbol !== symbol) {
                this._iconSymbol = symbol;
                if (symbol) {
                    this.updateSymbolPosition();
                    this.redrawSymbol(symbol);
                    this._symbolSprite.visible = true;
                } else {
                    this._symbolSprite.visible = false;
                }
            }
        }
    
        updateSymbolPosition() {
            const {
                'Symbol X': symbolX = 0,
                'Symbol Y': symbolY = 0
            } = this.iconParam();
            this._symbolSprite.x = symbolX;
            this._symbolSprite.y = symbolY;
        }
    
        redrawSymbol(symbol) {
            const bitmap = this._symbolSprite.bitmap;
            bitmap.clear();
            bitmap.drawText(symbol, 0, 0, bitmap.width, bitmap.height, 'center');
        }
    
    }

    //-----------------------------------------------------------------------------
    // Sprite_TimelineBar

    class Sprite_TimelineBar extends PIXI.Container {
        constructor() {
            super();
            this.initMembers();
            this.createWaitBarSprite();
            this.createActionBarSprite();
            this.createMainSprite();
            this.updatePosition();
        }

        destroy() {
            if (this._waitBarSprite) {
                this._waitBarSprite.bitmap.destroy();
            }
            if (this._actionBarSprite) {
                this._actionBarSprite.bitmap.destroy();
            }
            if (!this._original) {
                this._mainSprite.bitmap.destroy();
            }
            const options = { children: true, texture: true };
            super.destroy(options);
        }
    
        initMembers() {
            this._original = !!param_Timeline['Image Name'];
            this._animationCount = 0;
            this.z = -1;
        }
    
        createWaitBarSprite() {
            if (!this._original) {
                this._waitBarSprite = new Sprite();
                this._waitBarSprite.bitmap = this.createWaitBarBitmap();
                this._waitBarSprite.x = 2;
                this._waitBarSprite.anchor.y = 0.5;
                this._waitBarSprite.opacity = 192;
                this.addChild(this._waitBarSprite);
                this.updateWaitBarFrame();
            }
        }
    
        createWaitBarBitmap() {
            const {
                'Start X': startX = 6,
                'Wait Width': waitWidth = 320,
                'Action Width': actionWidth = 128
            } = param_Timeline;
            const pad = (startX - 2) * (actionWidth === 0 ? 2 : 1);
            const width = Math.ceil((pad + waitWidth) / 2) * 3;
            const bitmap = new Bitmap(width, 20);
            const context = bitmap.context;
            const color1 = 'rgb(128,160,255)';
            const color2 = 'rgb(224,224,255)';
            const grad = context.createLinearGradient(0, 0, width, 0);
            for (let i = 0; i <= 6; i++) {
                grad.addColorStop(i / 6, i % 2 === 0 ? color1 : color2);
            }
            context.save();
            context.fillStyle = grad;
            context.fillRect(0, 0, width, 20);
            context.restore();
            bitmap.baseTexture.update();
            return bitmap;
        }
    
        createActionBarSprite() {
            const {
                'Start X': startX = 6,
                'Wait Width': waitWidth = 320,
                'Action Width': actionWidth = 128
            } = param_Timeline;
            if (!this._original && actionWidth > 0) {
                this._actionBarSprite = new Sprite();
                this._actionBarSprite.bitmap = this.createActionBarBitmap();
                this._actionBarSprite.x = startX + waitWidth;
                this._actionBarSprite.anchor.y = 0.5;
                this._actionBarSprite.opacity = 192;
                this.addChild(this._actionBarSprite);
                this.updateActionBarFrame();
            }
        }
    
        createActionBarBitmap() {
            const {
                'Start X': startX = 6,
                'Action Width': actionWidth = 128
            } = param_Timeline;
            const width = Math.ceil((startX + actionWidth - 2) * 5 / 3);
            const bitmap = new Bitmap(width, 20);
            const context = bitmap.context;
            const sectionWidth = Math.ceil((startX + actionWidth - 2) * 2 / 3);
            const color1 = 'rgb(192,32,0)';
            const color2 = 'rgb(255,192,128)';
            context.save();
            context.transform(1, 0, 1, 1, -20, 0);
            for (let i = 0; i < 3; i++) {
                const gx1 = sectionWidth * i;
                const grad = context.createLinearGradient(gx1, 0, gx1 + sectionWidth, 0);
                grad.addColorStop(0, color1);
                grad.addColorStop(1, color2);
                context.fillStyle = grad;
                context.fillRect(gx1, 0, sectionWidth, 20);
            }
            context.restore();
            bitmap.baseTexture.update();
            return bitmap;
        }
    
        createMainSprite() {
            this._mainSprite = new Sprite();
            this._mainSprite.bitmap = this.timelineBitmap();
            this._mainSprite.anchor.y = 0.5;
            this.addChild(this._mainSprite);
        }
    
        timelineBitmap() {
            return this._original
                ? ImageManager.loadSystem(param_Timeline['Image Name'])
                : this.createMainBitmap();
        }
    
        createMainBitmap() {
            const {
                'Start X': startX = 6,
                'Wait Width': waitWidth = 320,
                'Action Width': actionWidth = 128
            } = param_Timeline;
            const width = startX * 2 + waitWidth + actionWidth;
            const bitmap = new Bitmap(width, 48);
            this.drawBitmapBack(bitmap, 24);
            this.drawBitmapLine(bitmap, startX);
            this.drawBitmapLine(bitmap, startX + waitWidth);
            if (actionWidth > 0) {
                this.drawBitmapLine(bitmap, startX + waitWidth + actionWidth);
            }
            this.resetFontSettings(bitmap);
            this.drawBitmapText(bitmap, 'WAIT', startX + 8);
            if (actionWidth > 32) {
                bitmap.textColor = 'rgb(128,0,0)';
                const text = actionWidth >= 88 ? 'ACTION' : 'ACT';
                this.drawBitmapText(bitmap, text, startX + waitWidth + 8);
            }
            bitmap.baseTexture.update();
            return bitmap;
        }
    
        drawBitmapBack(bitmap, bh) {
            const { context, width, height } = bitmap;
            context.save();
            context.lineWidth = 2;
            context.strokeStyle = 'rgba(32,32,64,0.5)';
            context.strokeRect(1, (height - bh) / 2 + 1, width - 2, bh - 2);
            context.restore();
        }
    
        drawBitmapLine(bitmap, x) {
            const color1 = 'rgba(255,255,255,0.25)';
            const color2 = 'rgba(255,255,255,1.0)';
            const context = bitmap.context;
            const grad = context.createLinearGradient(x, 0, x, bitmap.height);
            grad.addColorStop(0, color1);
            grad.addColorStop(0.5, color2);
            grad.addColorStop(1, color1);
            context.save();
            context.fillStyle = grad;
            context.fillRect(x - 1, 0, 2, bitmap.height);
            context.restore();
        }
    
        resetFontSettings(bitmap) {
            bitmap.fontSize = 18;
            bitmap.fontBold = true;
            bitmap.fontItalic = true;
            bitmap.outlineColor = 'rgba(255,255,255,0.9)';
            bitmap.outlineWidth = 5;
            bitmap.textColor = 'rgb(0,0,128)';
        }
    
        drawBitmapText(bitmap, text, x) {
            bitmap.drawText(text, x, 10, 128, 30);
        }
    
        updatePosition() {
            if (this._original || param_Timeline.Type === 'Horizontal') {
                this.rotation = 0;
            } else {
                this.rotation = 270 * Math.PI / 180;
            }
        }
    
        update() {
            this.updateChildren();
            this.updateAnimation();
        }
    
        updateChildren() {
            for (const child of this.children) {
                if (child.update) {
                    child.update();
                }
            }
        }
        
        updateAnimation() {
            if (!this._original) {
                this._animationCount++;
                this.updateWaitBarFrame();
                this.updateActionBarFrame();
            }
        }
    
        updateWaitBarFrame() {
            const {
                'Start X': startX = 6,
                'Wait Width': waitWidth = 320,
                'Action Width': actionWidth = 128
            } = param_Timeline;
            const c = this._animationCount % 180;
            const width = (startX - 2) * (actionWidth === 0 ? 2 : 1) + waitWidth;
            const x = width / 2 * (179 - c) / 180;
            this._waitBarSprite.setFrame(x, 0, width, 20);
        }
    
        updateActionBarFrame() {
            if (this._actionBarSprite) {
                const {
                    'Start X': startX = 4,
                    'Action Width': actionWidth = 128
                } = param_Timeline;
                const c = this._animationCount % 60;
                const width = startX + actionWidth - 2;
                const x = Math.ceil(width * 2 / 3) * (59 - c) / 60;
                this._actionBarSprite.setFrame(x, 0, width, 20);
            }
        }
    
    }
    
    //-----------------------------------------------------------------------------
    // Sprite_Timeline

    class Sprite_Timeline extends PIXI.Container {
        constructor() {
            super();
            this.createTimelineBarSprite();
            this.createEnemyIcons();
            this.createActorIcons();
            this.updatePosition();
        }

        destroy() {
            const options = { children: true, texture: true };
            super.destroy(options);
        }
    
        createTimelineBarSprite() {
            this._timelineBarSprite = new Sprite_TimelineBar();
            this.addChild(this._timelineBarSprite);
        }
    
        createEnemyIcons() {
            this._enemyIconSprites = $gameTroop.members().map(enemy => {
                return new Sprite_EnemyTimelineIcon(enemy);
            });
            for (const sprite of this._enemyIconSprites) {
                this.addChild(sprite);
            }
        }
    
        createActorIcons() {
            this._actorIconSprites = [];
            for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
                const sprite = new Sprite_ActorTimelineIcon();
                this._actorIconSprites.push(sprite);
                this.addChild(sprite);
            }
        }
    
        updatePosition() {
            this.x = param_Timeline.X || 0;
            this.y = param_Timeline.Y || 0;
        }
    
        update() {
            this.updateChildren();
            this.updateActors();
            this.sortChildren();
        }
    
        updateChildren() {
            for (const child of this.children) {
                if (child.update) {
                    child.update();
                }
            }
        }
    
        updateActors() {
            const members = $gameParty.battleMembers();
            for (const [i, sprite] of this._actorIconSprites.entries()) {
                sprite.setBattler(members[i]);
            }
        }
    
        sortChildren() {
            const isHorizontal = param_Timeline.Type === 'Horizontal';
            this.children.sort((a, b) => {
                if (a.z !== b.z) {
                    return a.z - b.z;
                } else if (isHorizontal && a.x !== b.x) {
                    return a.x - b.x;
                } else if (!isHorizontal && a.y !== b.y) {
                    return b.y - a.y;
                } else {
                    return a.spriteId - b.spriteId;
                }
            });
        }
    
    }

    if (_importedPlugin('MPP_TpbTimeline_Op1')) {
        window.Sprite_TimelineIcon = Sprite_TimelineIcon;
        window.Sprite_ActorTimelineIcon = Sprite_ActorTimelineIcon;
        window.Sprite_EnemyTimelineIcon = Sprite_EnemyTimelineIcon;
        window.Sprite_TimelineBar = Sprite_TimelineBar;
    }

    //-------------------------------------------------------------------------
    // Window_BattleStatus
    
    // overwrite
    Window_BattleStatus.prototype.placeTimeGauge = function() {};

    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.apply(this, arguments);
        timelineVisible = true;
    };
    
    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.apply(this, arguments);
        this.updateTimeline();
    };

    Scene_Battle.prototype.updateTimeline = function() {
        this._timelineSprite.visible = (
            timelineVisible &&
            this._messageWindow.isClosed() &&
            !!BattleManager._phase
        );
    };

    const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.apply(this, arguments);
        this.createTimelineSprite();
    };

    Scene_Battle.prototype.createTimelineSprite = function() {
        this._timelineSprite = new Sprite_Timeline();
        let index = this.children.indexOf(this._windowLayer);
        if (param_Timeline.Z === 'Before the window') {
            index += 1;
        }
        this.addChildAt(this._timelineSprite, index);
    };

})();
