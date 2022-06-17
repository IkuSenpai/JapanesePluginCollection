//=============================================================================
// MPP_TpbCooldown.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc You will be able to create items / skills that require a cooldown over time.
 * @author Mokusei Penguin
 * @url 
 * 
 * @help [version 2.0.0]
 * This plugin is for RPG Maker MZ.
 * 
 * ▼ Item / skill note
 *  〇 <Cooldown:n>
 *      n : Seconds(Decimal point can be set)
 *   - Sets the amount of time an item / skill can be reused.
 *   - The cooldown starts at the end of the action.
 * 
 *  〇 <CooldownType:type>
 *       type : Arbitrary string
 *   - Set the item / skill to [Cooldown type].
 *   - If you use an item / skill with this set, all items / skills
 *     of the same type will have a cooldown.
 *   - Items and skills are separate.
 * 
 *  〇 <PartyCooldown>
 *   - Items / skills with this set will have a cooldown shared by all parties.
 *   - The cooldown begins after using the item / skill.
 *   - Therefore, it is possible for another actor to make an action choice
 *     before performing the item / skill use.
 *   - In that case, when the action is executed, the action is terminated
 *     without doing anything.
 * 
 *  〇 <StartCooldown:n>
 *      n : Seconds(Decimal point can be set)
 *   - The cooldown specified at the beginning of the battle will occur.
 * 
 *  〇 <EffItemCd:n> / <EffSkillCd:n>
 *      n : Seconds(Decimal point can be set)
 *   - Reduces the cooldown of all items or skills by n seconds.
 *   - However, items / skills with shared cooldowns at the party are
 *     not affected.
 * 
 *  〇 <EffItemCdId id:n> / <EffSkillCdId id:n>
 *      id : Item / skill ID
 *      n  : Seconds(Decimal point can be set)
 *   - Reduces the cooldown of the item or skill with the specified ID
 *     by n seconds.
 *   - You can also specify items / skills with shared cooldowns at the party.
 * 
 * ▼ Actor / Class / Weapon / Armor / Enemy / State note
 *  〇 Cooldown Impact Rate Details
 *   - The rate of influence on the cooldown of items / skills.
 *   - The cooldown formula is
 *       [Item / skill cooldown] * (100 - [Total impact rate]) / 100
 *   - The upper limit of [Total Impact Rate] can be set by
 *     the plug-in parameter [Cooldown Rate Limit].
 * 
 *  〇 <ItemCdRate:r> / <SkillCdRate:r>
 *      r : Impact rate (shorten with plus / extend with minus)
 *   - Sets the cooldown impact rate for all items / skills.
 *   
 *  〇 <ItemCdRateId id:n> / <SkillCdRateId id:n>
 *      id : Item / skill ID
 *      r  : Impact rate (shorten with plus / extend with minus)
 *   - Sets the cooldown impact rate for the specified item / skill.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Cooldown Rate Limit
 *      @desc
 *      @type number
 *          @min 0
 *          @max 100
 *      @default 50
 *
 *  @param Dead Cooldown Type
 *      @desc 
 *      @type select
 *          @option clear
 *          @value clear
 *          @option active
 *          @value active
 *          @option stop
 *          @value stop
 *      @default stop
 *
 *  @param Gauge Type
 *      @desc Decreases over time / increases over time
 *      @type select
 *          @option decrease
 *          @value decrease
 *          @option increase
 *          @value increase
 *      @default decrease
 *
 *  @param Gauge Padding
 *      @type struct<Padding>
 *      @default {"Top":"2","Bottom":"2","Left":"34","Right":"-4"}
 *
 *  @param Gauge Color L
 *      @desc 
 *      @default 128,255,255
 *
 *  @param Gauge Color R
 *      @desc 
 *      @default 0,128,255
 *
 */

/*~struct~Padding:
 *  @param Top
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default 2
 *
 *  @param Bottom
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default 2
 *
 *  @param Left
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default 34
 *
 *  @param Right
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default -4
 *
 */

/*:ja
 * @target MZ
 * @plugindesc 時間経過によるクールダウンを必要とするアイテム/スキルが作成できるようになります。
 * @author 木星ペンギン
 * @url 
 * 
 * @help [version 2.0.0]
 * このプラグインはRPGツクールMZ用です。
 * 
 * ▼ アイテム/スキルのメモ欄
 *  〇 <Cooldown:n>
 *      n : 秒数(小数点以下設定可能)
 *   - アイテム/スキルが再使用可能になる時間を設定します。
 *   - クールダウンはアクションが終了した時点から開始します。
 * 
 *  〇 <CooldownType:type>
 *       type : 任意の文字列
 *   - アイテム/スキルに[クールダウンタイプ]を設定します。
 *   - これが設定されたアイテム/スキルを使用した場合、
 *     同じタイプのアイテム/スキル全てにクールダウンが発生します。
 *   - アイテムとスキルは別枠です。
 * 
 *  〇 <PartyCooldown>
 *   - これが設定されたアイテム/スキルはクールダウン時間がパーティ全員で
 *     共有されます。
 *   - クールダウンはアイテム/スキルを使用した後に開始されます。
 *   - そのため、アイテム/スキル使用を実行する前に、別のアクターが
 *     行動選択することは可能です。
 *   - その場合、アクション実行時に何もしないで行動を終了します。
 * 
 *  〇 <StartCooldown:n>
 *      n : 秒数(小数点以下設定可能)
 *   - 戦闘開始時に指定した時間のクールダウンが発生します。
 * 
 *  〇 <EffItemCd:n> / <EffSkillCd:n>
 *      n : 秒数(小数点以下設定可能)
 *   - 全アイテムまたはスキルのクールダウン時間をn秒短縮します。
 *   - ただし、パーティでクールダウンが共有されているアイテム/スキルは
 *     影響を受けません。
 * 
 *  〇 <EffItemCdId id:n> / <EffSkillCdId id:n>
 *      id : アイテム/スキルのID
 *      n  : 秒数(小数点以下設定可能)
 *   - 指定したIDのアイテムまたはスキルのクールダウン時間をn秒短縮します。
 *   - パーティでクールダウンが共有されているアイテム/スキルも指定することが
 *     出来ます。
 * 
 * ▼ アクター/職業/武器/防具/敵キャラ/ステートのメモ欄
 *  〇 クールダウン影響率 詳細
 *   - アイテム/スキルのクールダウンへの影響率です。
 *   - クールダウンの計算式は
 *       [アイテム/スキルのクールダウン] * (100 - [影響率の合計]) / 100
 *     となります。
 *   - [影響率の合計]の上限値はプラグインパラメータ[クールダウン影響率上限]で
 *     設定できます。
 * 
 *  〇 <ItemCdRate:r> / <SkillCdRate:r>
 *      r : 影響率(プラスで短縮 / マイナスで延長)
 *   - 全アイテム/スキルのクールダウン影響率を設定します。
 *   
 *  〇 <ItemCdRateId id:n> / <SkillCdRateId id:n>
 *      id : アイテム/スキルのID
 *      r  : 影響率(プラスで短縮 / マイナスで延長)
 *   - 指定したアイテム/スキルのクールダウン影響率を設定します。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 *
 *  @param Cooldown Rate Limit
 *      @text クールダウン影響率上限
 *      @desc
 *      @type number
 *          @min 0
 *          @max 100
 *      @default 50
 *
 *  @param Dead Cooldown Type
 *      @text 戦闘不能中クールダウン
 *      @desc 
 *      @type select
 *          @option クリア
 *          @value clear
 *          @option アクティブ
 *          @value active
 *          @option ストップ
 *          @value stop
 *      @default stop
 *
 *  @param Gauge Type
 *      @text ゲージ表示タイプ
 *      @desc 時間経過とともに減少 / 時間経過とともに増加
 *      @type select
 *          @option 減少
 *          @value decrease
 *          @option 増加
 *          @value increase
 *      @default decrease
 *
 *  @param Gauge Padding
 *      @desc ゲージ余白
 *      @type struct<Padding>
 *      @default {"Top":"2","Bottom":"2","Left":"34","Right":"-4"}
 *
 *  @param Gauge Color L
 *      @text ゲージの色(左)
 *      @desc 
 *      @default 128,255,255
 *
 *  @param Gauge Color R
 *      @text ゲージの色(右)
 *      @desc 
 *      @default 0,128,255
 *
 */

/*~struct~Padding:ja
 *  @param Top
 *      @text 上
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default 2
 *
 *  @param Bottom
 *      @text 下
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default 2
 *
 *  @param Left
 *      @text 左
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default 34
 *
 *  @param Right
 *      @text 右
 *      @desc
 *      @type number
 *          @min -999
 *          @max 999
 *      @default -4
 *
 */

(() => {
    'use strict';

    const pluginName = 'MPP_TpbCooldown';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const reviverParse = function(key, value) {
        try {
            return JSON.parse(value, reviverParse);
        } catch (e) {
            return value;
        }
    };
    const param_CooldownRateLimit = Number(parameters['Cooldown Rate Limit'] || 50);
    const param_DeadCooldownType = parameters['Dead Cooldown Type'] || 'stop';
    const param_GaugeType = parameters['Gauge Type'] || 'decrease';
    const param_GaugePadding = JSON.parse(parameters['Gauge Padding'] || '{}', reviverParse);
    const param_GaugeColorL = `rgb(${parameters['Gauge Color L'] || '128,255,255'})`;
    const param_GaugeColorR = `rgb(${parameters['Gauge Color R'] || '0,128,255'})`;

    // Countermeasures against conflicts with other plugins
    const __base = (obj, prop) => {
        if (obj.hasOwnProperty(prop)) {
            return obj[prop];
        } else {
            const proto = Object.getPrototypeOf(obj);
            return function () { return proto[prop].apply(this, arguments); };
        }
    };

    //-------------------------------------------------------------------------
    // Game_Temp

    const _Game_Temp_initialize = Game_Temp.prototype.initialize;
    Game_Temp.prototype.initialize = function() {
        _Game_Temp_initialize.apply(this, arguments);
        this._needsCooldownRefresh = false;
    };
    
    Game_Temp.prototype.requestCooldownRefresh = function() {
        if ($gameParty.inBattle()) {
            this._needsCooldownRefresh = true;
        }
    };
    
    Game_Temp.prototype.clearCooldownRefreshRequest = function() {
        this._needsCooldownRefresh = false;
    };
    
    Game_Temp.prototype.isCooldownRefreshRequested = function() {
        return this._needsCooldownRefresh;
    };

    //-------------------------------------------------------------------------
    // Game_TpbCooldowns

    function Game_TpbCooldowns() {
        this.initialize.apply(this, arguments);
    }

    Game_TpbCooldowns.prototype.initialize = function() {
        this._items = new Map();
        this._skills = new Map();
    };

    Game_TpbCooldowns.prototype.clear = function() {
        this._items.clear();
        this._skills.clear();
    };

    Game_TpbCooldowns.prototype.update = function() {
        this.updateCooldowns(this._items);
        this.updateCooldowns(this._skills);
    };

    Game_TpbCooldowns.prototype.updateCooldowns = function(container) {
        for (const [key, params] of container) {
            if (params.isReady && --params.value <= 0) {
                container.delete(key);
                $gameTemp.requestCooldownRefresh();
            }
        }
    };

    Game_TpbCooldowns.prototype.start = function() {
        for (const params of this._items.values()) {
            params.isReady = true;
        }
        for (const params of this._skills.values()) {
            params.isReady = true;
        }
    };

    Game_TpbCooldowns.prototype._itemKey = function(usableItem) {
        return usableItem
            ? usableItem.meta.CooldownType || usableItem.id
            : null;
    };

    Game_TpbCooldowns.prototype._itemContainer = function(usableItem) {
        return DataManager.isItem(usableItem) ? this._items : this._skills;
    };

    Game_TpbCooldowns.prototype._categoryContainer = function(category) {
        return category === 'item' ? this._items : this._skills;
    };

    Game_TpbCooldowns.prototype._itemParams = function(usableItem) {
        return this._itemContainer(usableItem).get(this._itemKey(usableItem));
    };

    Game_TpbCooldowns.prototype.has = function(usableItem) {
        return this._itemContainer(usableItem).has(this._itemKey(usableItem));
    };

    Game_TpbCooldowns.prototype.itemRate = function(usableItem) {
        const params = this._itemParams(usableItem);
        return params ? params.value / params.max : 0;
    };

    Game_TpbCooldowns.prototype.set = function(usableItem, time) {
        if (time > 0) {
            const key = this._itemKey(usableItem);
            const params = { value:time, max:time, isReady:false };
            this._itemContainer(usableItem).set(key, params);
            $gameTemp.requestCooldownRefresh();
        }
    };

    Game_TpbCooldowns.prototype.reduce = function(usableItem, time) {
        const container = this._itemContainer(usableItem);
        const key = this._itemKey(usableItem);
        const params = container.get(key);
        if (params) {
            params.value = Math.min(params.value - time, params.max);
            if (params.value <= 0) {
                container.delete(key);
                $gameTemp.requestCooldownRefresh();
            }
        }
    };

    Game_TpbCooldowns.prototype.reduceAll = function(category, time) {
        const container = this._categoryContainer(category);
        for (const [key, params] of container) {
            params.value = Math.min(params.value - time, params.max);
            if (params.value <= 0) {
                container.delete(key);
                $gameTemp.requestCooldownRefresh();
            }
        }
    };

    //-------------------------------------------------------------------------
    // Game_Action

    const _Game_Action_isValid = Game_Action.prototype.isValid;
    Game_Action.prototype.isValid = function() {
        return (
            _Game_Action_isValid.apply(this, arguments) &&
            (this._forcing || !this.subject().isTpbCooldown(this.item()))
        );
    };
    
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.apply(this, arguments);
        if (target.result().isHit()) {
            this.applyTpbCooldownEffect(target);
        }
    };

    Game_Action.prototype.applyTpbCooldownEffect = function(target) {
        const item = this.item();
        this.itemEffectReduceAllItemCooldown(target, item);
        this.itemEffectReduceItemCooldownByIds(target, item);
        this.itemEffectReduceAllSkillCooldown(target, item);
        this.itemEffectReduceSkillCooldownByIds(target, item);
    };

    Game_Action.prototype.itemEffectReduceAllItemCooldown = function(target, item) {
        const baseTime = Number(item.meta.EffItemCd || 0);
        if (baseTime > 0) {
            target.reduceTpbAllCooldown('item', Math.floor(baseTime * 60));
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.itemEffectReduceItemCooldownByIds = function(target, item) {
        const reg = /^EffItemCdId (\d+)$/;
        for (const [key, value] of Object.entries(item.meta)) {
            const arr = reg.exec(key);
            if (arr) {
                const targetItem = $dataItems[Number(arr[1])];
                const time = Math.floor(Number(value || 0) * 60);
                if (targetItem && time !== 0) {
                    target.reduceTpbCooldown(targetItem, time);
                    this.makeSuccess(target);
                }
            }
        }
    };

    Game_Action.prototype.itemEffectReduceAllSkillCooldown = function(target, item) {
        const baseTime = Number(item.meta.EffItemCd || 0);
        if (baseTime > 0) {
            target.reduceTpbAllCooldown('skill', Math.floor(baseTime * 60));
            this.makeSuccess(target);
        }
    };

    Game_Action.prototype.itemEffectReduceSkillCooldownByIds = function(target, item) {
        const reg = /^EffSkillCdId (\d+)$/;
        for (const [key, value] of Object.entries(item.meta)) {
            const arr = reg.exec(key);
            if (arr) {
                const targetSkill = $dataSkills[Number(arr[1])];
                const time = Math.floor(Number(value || 0) * 60);
                if (targetSkill && time !== 0) {
                    target.reduceTpbCooldown(targetSkill, time);
                    this.makeSuccess(target);
                }
            }
        }
    };

    //-------------------------------------------------------------------------
    // Game_BattlerBase

    Game_BattlerBase.prototype.createTpbCooldowns = function() {
        this._tpbCooldowns = new Game_TpbCooldowns();
    };
    
    Game_BattlerBase.prototype.deleteTpbCooldowns = function() {
        delete this._tpbCooldowns;
    };
    
    const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function() {
        _Game_BattlerBase_die.apply(this, arguments);
        if (this._tpbCooldowns && param_DeadCooldownType === 'clear') {
            this._tpbCooldowns.clear();
        }
    };

    Game_BattlerBase.prototype.allMetadata = function(name) {
        return this.traitObjects().map(obj => obj.meta[name]).filter(Boolean);
    };

    Game_BattlerBase.prototype.allMetaNumbers = function(name) {
        return this.allMetadata(name).map(Number);
    };

    // Game_BattlerBase.prototype.metadataPi = function(name) {
    //     return Math.floor(
    //         this.allMetaNumbers(name).reduce((r, n) => r * n / 100, 100)
    //     );
    // };

    Game_BattlerBase.prototype.metadataSum = function(name) {
        return this.allMetaNumbers(name).reduce((r, n) => r + n, 0);
    };

    Game_BattlerBase.prototype.traitCooldownRate = function(usableItem) {
        const name = DataManager.isItem(usableItem) ? 'ItemCdRate' : 'SkillCdRate';
        const rate1 = this.metadataSum(name);
        const rate2 = this.metadataSum(`${name}Id ${usableItem.id}`);
        return 100 - Math.min(rate1 + rate2, param_CooldownRateLimit);
    };

    Game_BattlerBase.prototype.usableItemCooldown = function(usableItem) {
        const baseTime = Number(usableItem.meta.Cooldown || 0);
        if (baseTime > 0) {
            const rate = this.traitCooldownRate(usableItem);
            return Math.floor(baseTime * 60 * rate / 100);
        } else {
            return 0;
        }
    };

    Game_Battler.prototype.tpbCooldownContainer = function(usableItem) {
        if (!usableItem) {
            return null;
        }
        return usableItem.meta.PartyCooldown
            ? this.friendsUnit().tpbCooldowns()
            : this._tpbCooldowns;
    };

    Game_BattlerBase.prototype.isTpbCooldown = function(usableItem) {
        const container = this.tpbCooldownContainer(usableItem);
        return container && container.has(usableItem);
    };

    Game_BattlerBase.prototype.tpbCooldownRate = function(usableItem) {
        const container = this.tpbCooldownContainer(usableItem);
        return container ? container.itemRate(usableItem) : 0;
    };

    Game_BattlerBase.prototype.setTpbCooldown = function(usableItem) {
        const container = this.tpbCooldownContainer(usableItem);
        if (container) {
            container.set(usableItem, this.usableItemCooldown(usableItem));
        }
    };

    Game_BattlerBase.prototype.reduceTpbCooldown = function(usableItem, time) {
        const container = this.tpbCooldownContainer(usableItem);
        if (container) {
            container.reduce(usableItem, time);
        }
    };

    Game_BattlerBase.prototype.reduceTpbAllCooldown = function(category, time) {
        if (this._tpbCooldowns) {
            this._tpbCooldowns.reduceAll(category, time);
        }
    };

    //-------------------------------------------------------------------------
    // Game_Battler

    const _Game_Battler_useItem = Game_Battler.prototype.useItem;
    Game_Battler.prototype.useItem = function(item) {
        _Game_Battler_useItem.apply(this, arguments);
        if ($gameParty.inBattle()) {
            this.setTpbCooldown(item);
        }
    };
    
    const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
    Game_Battler.prototype.onBattleStart = function() {
        _Game_Battler_onBattleStart.apply(this, arguments);
        this.createTpbCooldowns();
    };

    const _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
    Game_Battler.prototype.onBattleEnd = function() {
        _Game_Battler_onBattleEnd.apply(this, arguments);
        this.deleteTpbCooldowns();
    };

    const _Game_Battler_performActionEnd = Game_Battler.prototype.performActionEnd;
    Game_Battler.prototype.performActionEnd = function() {
        _Game_Battler_performActionEnd.apply(this, arguments);
        this.friendsUnit().startTpbCooldowns();
        this.startTpbCooldowns();
    };

    const _Game_Battler_updateTpb = Game_Battler.prototype.updateTpb;
    Game_Battler.prototype.updateTpb = function() {
        _Game_Battler_updateTpb.apply(this, arguments);
        if (
            this._tpbCooldowns &&
            (this.isAlive() || param_DeadCooldownType === 'active')
        ) {
            this._tpbCooldowns.update();
        }
    };

    Game_Battler.prototype.startTpbCooldowns = function() {
        if (this._tpbCooldowns) {
            this._tpbCooldowns.start();
        }
    };

    //-------------------------------------------------------------------------
    // Game_Actor

    const _Game_Actor_onBattleStart = __base(Game_Actor.prototype, 'onBattleStart');
    Game_Actor.prototype.onBattleStart = function() {
        _Game_Actor_onBattleStart.apply(this, arguments);
        this.onBattleStartCooldowns();
    };

    Game_Actor.prototype.onBattleStartCooldowns = function(isGroup = false) {
        this.skills().forEach(skill => {
            const startTime = Number(skill.meta.StartCooldown || 0);
            if (
                startTime > 0 &&
                !!skill.meta.PartyCooldown === isGroup
            ) {
                const container = this.tpbCooldownContainer(skill);
                const rate = this.traitCooldownRate(skill);
                const realTime = Math.floor(startTime * 60 * rate / 100);
                if (container) {
                    container.set(skill, realTime);
                }
            }
        });
        this.startTpbCooldowns();
    };

    //-------------------------------------------------------------------------
    // Game_Unit

    Game_Unit.prototype.createTpbCooldowns = function() {
        this._tpbCooldowns = new Game_TpbCooldowns();
    };
    
    Game_Unit.prototype.deleteTpbCooldowns = function() {
        delete this._tpbCooldowns;
    };
    
    const _Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
    Game_Unit.prototype.onBattleStart = function() {
        _Game_Unit_onBattleStart.apply(this, arguments);
        this.createTpbCooldowns();
        this.startTpbCooldowns();
    };

    const _Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
    Game_Unit.prototype.onBattleEnd = function() {
        _Game_Unit_onBattleEnd.apply(this, arguments);
        this.deleteTpbCooldowns();
    };

    Game_Unit.prototype.tpbCooldowns = function() {
        return this._tpbCooldowns;
    };

    Game_Unit.prototype.startTpbCooldowns = function() {
        if (this._tpbCooldowns) {
            this._tpbCooldowns.start();
        }
    };

    const _Game_Unit_updateTpb = Game_Unit.prototype.updateTpb;
    Game_Unit.prototype.updateTpb = function() {
        _Game_Unit_updateTpb.apply(this, arguments);
        if (this._tpbCooldowns) {
            this._tpbCooldowns.update();
        }
    };
    
    //-------------------------------------------------------------------------
    // Game_Party

    const _Game_Party_onBattleStart = __base(Game_Party.prototype, 'onBattleStart');
    Game_Party.prototype.onBattleStart = function() {
        _Game_Party_onBattleStart.apply(this, arguments);
        this.onBattleStartCooldowns();
    };

    Game_Party.prototype.onBattleStartCooldowns = function() {
        for (const member of this.members()) {
            member.onBattleStartCooldowns(true);
        }
    };

    //-------------------------------------------------------------------------
    // Sprite_CooldownGauge

    function Sprite_CooldownGauge() {
        this.initialize(...arguments);
    }
    
    Sprite_CooldownGauge.prototype = Object.create(Sprite_Gauge.prototype);
    Sprite_CooldownGauge.prototype.constructor = Sprite_CooldownGauge;
    
    Sprite_CooldownGauge.prototype.initialize = function() {
        this._bitmapWidth = 0;
        this._bitmapHeight = 0;
        Sprite_Gauge.prototype.initialize.call(this);
        this.opacity = 192;
        this._item = null;
    };
    
    Sprite_CooldownGauge.prototype.bitmapWidth = function() {
        return this._bitmapWidth;
    };
    
    Sprite_CooldownGauge.prototype.bitmapHeight = function() {
        return this._bitmapHeight;
    };
    
    Sprite_CooldownGauge.prototype.gaugeHeight = function() {
        return this.bitmapHeight();
    };
    
    Sprite_CooldownGauge.prototype.gaugeX = function() {
        return 0;
    };
    
    Sprite_CooldownGauge.prototype.setup = function(battler, item) {
        this._battler = battler;
        this._item = item;
        this._value = this.currentValue();
        this._maxValue = this.currentMaxValue();
        this.updateBitmap();
    };

    Sprite_CooldownGauge.prototype.resize = function(width, height) {
        if (this._bitmapWidth !== width || this._bitmapHeight !== height) {
            this._bitmapWidth = width;
            this._bitmapHeight = height;
            this.bitmap.destroy();
            this.createBitmap();
        }
    };
    
    Sprite_CooldownGauge.prototype.smoothness = function() {
        return 1;
    };
    
    Sprite_CooldownGauge.prototype.currentValue = function() {
        if (this._battler && this._item) {
            const rate = this._battler.tpbCooldownRate(this._item);
            if (rate > 0) {
                return param_GaugeType === 'decrease' ? rate : 1 - rate;
            }
        }
        return NaN;
    };
    
    Sprite_CooldownGauge.prototype.currentMaxValue = function() {
        if (this._battler && this._item) {
            return 1;
        }
        return NaN;
    };
    
    Sprite_CooldownGauge.prototype.gaugeColor1 = function() {
        return param_GaugeColorL;
    };
    
    Sprite_CooldownGauge.prototype.gaugeColor2 = function() {
        return param_GaugeColorR;
    };
    
    Sprite_CooldownGauge.prototype.drawLabel = function() {
    };
    
    Sprite_CooldownGauge.prototype.drawValue = function() {
    };

    //-------------------------------------------------------------------------
    // windowCooldownModule

    const windowCooldownModule = obj => {

        const _base_initialize = __base(obj, 'initialize');
        obj.initialize = function(rect) {
            _base_initialize.apply(this, arguments);
            this._additionalSprites = [];
        };

        const _base_isEnabled = __base(obj, 'isEnabled');
        obj.isEnabled = function(item) {
            return (
                _base_isEnabled.apply(this, arguments) &&
                this._actor &&
                !this._actor.isTpbCooldown(item)
            );
        };
        
        obj.itemGaugeRect = function(index) {
            const rect = this.itemLineRect(index);
            const {
                Top:top = 2,
                Bottom:bottom = 2,
                Left:left = 34,
                Right:right = -4
            } = param_GaugePadding;
            rect.x += left;
            rect.y += top;
            rect.width -= left + right;
            rect.height -= top + bottom;
            return rect;
        };
        
        const _base_drawItem = __base(obj, 'drawItem');
        obj.drawItem = function(index) {
            _base_drawItem.apply(this, arguments);
            const item = this.itemAt(index);
            if (this._actor && this._actor.isTpbCooldown(item)) {
                const rect = this.itemGaugeRect(index);
                this.placeCooldownGauge(this._actor, item, rect);
            }
        };
    
        obj.placeCooldownGauge = function(actor, item, rect) {
            const key = `cooldown-item${item.id}`;
            const sprite = this.createInnerSprite(key, Sprite_CooldownGauge);
            sprite.resize(rect.width, rect.height);
            sprite.setup(actor, item);
            sprite.move(rect.x, rect.y);
            sprite.show();
        };
        
        obj.createInnerSprite = function(key, spriteClass) {
            const dict = this._additionalSprites;
            if (dict[key]) {
                return dict[key];
            } else {
                const sprite = new spriteClass();
                dict[key] = sprite;
                this.addInnerChildToBack(sprite);
                return sprite;
            }
        };
        
        obj.addInnerChildToBack = function(child) {
            this._innerChildren.push(child);
            const backIndex = this.children.indexOf(this._contentsBackSprite);
            return this._clientArea.addChildAt(child, backIndex + 1);
        };
        
        const _base_update = __base(obj, 'update');
        obj.update = function() {
            _base_update.apply(this, arguments);
            if ($gameTemp.isCooldownRefreshRequested()) {
                this.refresh();
            }
        };
        
        const _base_refresh = __base(obj,'refresh');
        obj.refresh = function() {
            this.hideAdditionalSprites();
            _base_refresh.apply(this, arguments);
            $gameTemp.clearCooldownRefreshRequest();
        };
        
        obj.hideAdditionalSprites = function() {
            for (const sprite of Object.values(this._additionalSprites)) {
                sprite.hide();
            }
        };
    
    };

    //-------------------------------------------------------------------------
    // Window_BattleSkill

    windowCooldownModule(Window_BattleSkill.prototype);

    //-------------------------------------------------------------------------
    // Window_BattleItem

    windowCooldownModule(Window_BattleItem.prototype);

    const _Window_BattleItem_initialize = Window_BattleItem.prototype.initialize;
    Window_BattleItem.prototype.initialize = function(rect) {
        _Window_BattleItem_initialize.apply(this, arguments);
        this._actor = null;
    };

    Window_BattleItem.prototype.setActor = function(actor) {
        if (this._actor !== actor) {
            this._actor = actor;
            //this.refresh();
        }
    };

    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
    Scene_Battle.prototype.commandItem = function() {
        this._itemWindow.setActor(BattleManager.actor());
        _Scene_Battle_commandItem.apply(this, arguments);
    };

})();
