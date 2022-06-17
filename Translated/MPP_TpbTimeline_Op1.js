//=============================================================================
// MPP_TpbTimeline_Op1.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc We will add a function that allows you to make detailed settings.
 * @author Mokusei Penguin
 * @url 
 * 
 * @base MPP_TpbTimeline
 * @orderAfter MPP_TpbTimeline
 *
 * @help [version 1.0.1]
 * - This plugin is for RPG Maker MZ.
 * - Add a function that allows you to make detailed settings for
 *   MPP_TpbTimeline.
 * 
 * ▼ Plugin parameter details
 *  〇 Icon Move Type
 *   - Change the moving direction of the icon.
 *   - It does not support automatic generation of the timeline bar.
 *   - The origin position of the timeline is at the right end.
 *  
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Actor Symbol
 *      @desc 
 *      @type struct<ActorSymbol>
 *      @default {"Symbol Type":"none","Symbol X":"0","Symbol Y":"15","Symbol Size":"17","Symbol Align":"left"}
 * 
 *  @param Icon Move Type
 *      @desc 
 *      @type select
 *          @option default
 *          @option toLeft
 *      @default default
 * 
 */
/*~struct~ActorSymbol:
 *  @param Symbol Type
 *      @desc Characters to be displayed over the icon
 *      @type select
 *          @option none
 *          @option index
 *      @default none
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
 *      @default 15
 * 
 *  @param Symbol Size
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 64
 *      @default 17
 * 
 *  @param Symbol Align
 *      @desc
 *      @type select
 *          @option left
 *          @option center
 *          @option right
 *      @default left
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 細かな設定ができる機能を追加します。
 * @author 木星ペンギン
 * @url 
 * 
 * @base MPP_TpbTimeline
 * @orderAfter MPP_TpbTimeline
 *
 * @help [version 1.0.1]
 * - このプラグインはRPGツクールMZ用です。
 * - MPP_TpbTimeline の細かな設定ができる機能を追加します。
 * 
 * ▼ プラグインパラメータ 詳細
 *  〇 アイコン移動タイプ
 *   - アイコンの移動方向を変更します。
 *   - タイムラインバーの自動生成には対応していません。
 *   - タイムラインの原点位置は右端となります。
 *  
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Actor Symbol
 *      @text アクターシンボル
 *      @desc 
 *      @type struct<ActorSymbol>
 *      @default {"Symbol Type":"none","Symbol X":"0","Symbol Y":"15","Symbol Size":"17","Symbol Align":"left"}
 * 
 *  @param Icon Move Type
 *      @text アイコン移動タイプ
 *      @desc 
 *      @type select
 *          @option デフォルト
 *          @value default
 *          @option 左へ
 *          @value toLeft
 *      @default default
 * 
 */
/*~struct~ActorSymbol:ja
 *  @param Symbol Type
 *      @text シンボルタイプ
 *      @desc アイコンに重ねて表示する文字
 *      @type select
 *          @option none
 *          @option index
 *      @default none
 * 
 *  @param Symbol X
 *      @text シンボルX座標
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 0
 * 
 *  @param Symbol Y
 *      @text シンボルY座標
 *      @desc 
 *      @type number
 *          @min -9999
 *          @max 9999
 *      @default 15
 * 
 *  @param Symbol Size
 *      @text シンボル文字サイズ
 *      @desc 
 *      @type number
 *          @min 4
 *          @max 64
 *      @default 17
 * 
 *  @param Symbol Align
 *      @text シンボル揃え位置
 *      @desc
 *      @type select
 *          @option 左揃え
 *          @value left
 *          @option 中央揃え
 *          @value center
 *          @option 右揃え
 *          @value right
 *      @default left
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_TpbTimeline_Op1';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const paramReplace = (key, value) => {
        try {
            return JSON.parse(value);
        } catch (e) {
            return value;
        }
    };
    const param_ActorSymbol = JSON.parse(parameters['Actor Symbol'] || '{}', paramReplace);
    const param_IconMoveType = parameters['Icon Move Type'];
    
    // Base Plugin Parameters
    const baseParameters = PluginManager.parameters('MPP_TpbTimeline');
    const param_Timeline = JSON.parse(baseParameters['Timeline'] || '{}', paramReplace);
    
    //-------------------------------------------------------------------------
    // Game_Actor

    Game_Actor.prototype.timelineSymbol = function() {
        switch (param_ActorSymbol['Symbol Type']) {
            //case 'letter':
            //    return '';
            case 'index':
                return $gameParty.size() > 1 ? this.index() + 1 : '';
        }
        return '';
    };

    //-------------------------------------------------------------------------
    // Sprite_TimelineIcon

    const _Sprite_TimelineIcon_updatePosition = Sprite_TimelineIcon.prototype.updatePosition;
    Sprite_TimelineIcon.prototype.updatePosition = function() {
        if (param_IconMoveType === 'toLeft') {
            const startX = param_Timeline['Start X'] || 6;
            this.x = -startX - this.timeWidth();
            this.y = 0;
        } else {
            _Sprite_TimelineIcon_updatePosition.call(this);
        }
    };

    //-------------------------------------------------------------------------
    // Sprite_ActorTimelineIcon

    const _methodNames = [
        'createSymbolSprite',
        'setSymbolPosition',
        'updateSymbol',
        'createSymbolBitmap',
        'redrawSymbol'
    ];
    for (const name of _methodNames) {
        Sprite_ActorTimelineIcon.prototype[name] =
                Sprite_EnemyTimelineIcon.prototype[name];
    }

    const _Sprite_ActorTimelineIcon_initialize = Sprite_ActorTimelineIcon.prototype.initialize;
    Sprite_ActorTimelineIcon.prototype.initialize = function(battler) {
        _Sprite_ActorTimelineIcon_initialize.call(this, battler);
        this.createSymbolSprite();
    };

    const _Sprite_ActorTimelineIcon_destroy = Sprite_ActorTimelineIcon.prototype.destroy;
    Sprite_ActorTimelineIcon.prototype.destroy = function(options) {
        if (this._symbolSprite.bitmap) {
            this._symbolSprite.bitmap.destroy();
        }
        this._symbolSprite.destroy();
        _Sprite_ActorTimelineIcon_destroy.call(this, options);
    };

    const _Sprite_ActorTimelineIcon_iconParam = Sprite_ActorTimelineIcon.prototype.iconParam;
    Sprite_ActorTimelineIcon.prototype.iconParam = function() {
        return {
            ..._Sprite_ActorTimelineIcon_iconParam.call(this),
            ...param_ActorSymbol
        };
    };

    const _Sprite_ActorTimelineIcon_setCharacterBitmap = Sprite_ActorTimelineIcon.prototype.setCharacterBitmap;
    Sprite_ActorTimelineIcon.prototype.setCharacterBitmap = function(x, y) {
        _Sprite_ActorTimelineIcon_setCharacterBitmap.call(this, x, y);
        this.setSymbolPosition();
    };

    Sprite_ActorTimelineIcon.prototype.update = function() {
        Sprite_TimelineIcon.prototype.update.call(this);
        if (this.visible && this.bitmap.isReady()) {
            this.updateSymbol();
        }
    };

    //-----------------------------------------------------------------------------
    // Sprite_TimelineBar

    const _Sprite_TimelineBar_initMembers = Sprite_TimelineBar.prototype.initMembers;
    Sprite_TimelineBar.prototype.initMembers = function() {
        _Sprite_TimelineBar_initMembers.call(this);
        this._original = this._original || param_IconMoveType === 'toLeft';
    };

    const _Sprite_TimelineBar_createMainSprite = Sprite_TimelineBar.prototype.createMainSprite;
    Sprite_TimelineBar.prototype.createMainSprite = function() {
        _Sprite_TimelineBar_createMainSprite.call(this);
        if (param_IconMoveType === 'toLeft') {
            this._mainSprite.anchor.x = 1;
        }
    };

})();
