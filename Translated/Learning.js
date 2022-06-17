//
//  ラーニング ver1.03
//
// / ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['Learning'] = 1.03;

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Item_Skill/Learning.js
 * @plugindesc ver1.03/敵の攻撃を受けた時、その技を元にスキルを習得する機能を追加します。
 * @author Yana
 * 
 * @param Learning Skill Shared
 * @text ラーニングをパーティ共用
 * @desc ラーニングしたスキルをパーティで共用するかの設定です。
 * @type boolean
 * @on 共用する
 * @off 共用しない
 * @default true
 * 
 * @param Miss Learning
 * @text スキルミス時にラーニング
 * @desc スキルがミスした時、ラーニングできるかの設定です。
 * @type boolean
 * @on ラーニングする
 * @off ラーニングしない
 * @default true
 * 
 * @param Evaded Learning
 * @text スキル回避時にラーニング
 * @desc スキルを回避した時、ラーニングできるかの設定です。
 * @type boolean
 * @on ラーニングする
 * @off ラーニングしない
 * @default true
 * 
 * @param Watch Learning
 * @text スキルを見てラーニング
 * @desc スキルを見るだけでラーニングできるかの設定です。
 * @type boolean
 * @on ラーニングする
 * @off ラーニングしない
 * @default true
 * 
 * @param Instant Learning
 * @text ラーニング時に即時習得
 * @desc スキルをラーニングした時、即時習得するかの設定です。
 * @type boolean
 * @on 即時習得する
 * @off 即時習得しない
 * @default true
 * 
 * @param Display Learning Text
 * @text ラーニング時の表示ログ
 * @desc ラーニングした時にログに表示するメッセージです。
 * @default _nameは_skillをラーニング！
 * 
 * @param Display　Learning Text Shared
 * @text パーティ共用時の表示ログ
 * @desc ラーニングした時にログに表示するメッセージです。共用設定用です。
 * @default _skillをラーニング！
 * 
 * @param Log Color
 * @text ラーニング時のログ色
 * @desc ラーニング表示のログカラーです。
 * @type number
 * @default 4
 * 
 * @param Play SE Name
 * @text ラーニング時SE
 * @desc ラーニングした時に鳴らすSEのファイル名です。
 * @default Flash2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param Play SE Params
 * @text ラーニング時SEパラメータ
 * @desc ラーニングした時に鳴らすSEのパラメータです。
 * パン、ピッチ、ボリュームの順で指定してください。
 * @default 0,100,100
 * 
 * @param Info Text
 * @text 入手インフォ表示テキスト
 * @desc 入手インフォメーション併用時、表示されるテキストです。
 * _actor:アクター名 _icon:スキルアイコン _name:スキル名
 * @default _actorは「\i[_icon]_name」をラーニング！
 * 
 * @help
 * ------------------------------------------------------ 
 * 設定方法
 * ------------------------------------------------------
 * スキルのメモ欄に
 * 
 * <ラーニング スキルID,習得率%>
 * <LEARNING スキルID,習得率%>
 * 
 * と記述します。
 * 
 * 
 * そのスキルをラーニング能力を持ったアクターが受けたとき、
 * または、設定によっては見るだけで
 * 習得率%の確率で設定したIDのスキルを習得します。
 * ラーニング能力は特徴オブジェクト
 * (アクター,クラス,装備,ステートなど)のメモ欄に
 * 
 * <ラーニング能力>
 * <LEARNING_ABILITY>
 * 
 * と記述することで設定することができます。
 * 
 * 
 * また、特徴オブジェクト(アクター,クラス,装備,ステートなど)のメモ欄に
 * 
 * <ラーニング率補正:[+-]補正率>
 * <LEARNING_RATE_SUP:[+-]補正率>
 * 
 * と記述することで、ラーニング率を補正する特徴を設定することができます。
 * この補正率はそれぞれ加算で計算され、元の習得率に乗算されます。
 * 
 * ------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 注意事項
 * ------------------------------------------------------
 * 入手インフォメーションプラグインはRPGツクールMZで動作しません。
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
 * ver1.03:
 * ConditionallyCoreと併用時、ラーニングに条件を付けられるように機能を追加
 * 行動が発生する前にラーニングを行う、事前ラーニングの仕組みを追加
 * ver1.02:
 * MissLearningとEvadedLearningのパラメータが正常に機能していないバグを修正。
 * ログにラーニングの表示が出た後、次の文字カラーがラーニング時の
 * カラーになるバグを修正。
 * 入手インフォメーションと併用時エラーが発生するバグを修正。
 * ver1.011:
 * console.logを削除。
 * ver1.01:
 * 利用規約をMITライセンスに変更。
 * Learning Skill Sharedがtrueの時、ラーニングの表示が正常でないバグを修正。
 * ver1.00:
 * 公開
 */

(function() {

    'use strict';

    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('Learning');
    var learningSkillShared = String(parameters['Learning Skill Shared']) === 'true';
    var missLearning = String(parameters['Miss Learning']) === 'true';
    var evadedLearning = String(parameters['Evaded Learning']) === 'true';
    var instantLearning = String(parameters['Instant Learning']) === 'true';
    var watchLearning = String(parameters['Watch Learning']) === 'true';
    var displayLearningText = String(parameters['Display Learning Text'] || '_nameは_skillをラーニング！');
    var displayLearningTextShared = String(parameters['Display Learning Text Shared'] || '_skillをラーニング！');
    var logColor = Number(parameters['Log Color'] || 4);
    var playSEName = String(parameters['Play SE Name'] || '');
    var playSEParams = String(parameters['Play SE Params'] || '');
    var infoText = String(parameters['Info Text'] || '');

    ////////////////////////////////////////////////////////////////////////////////////

    var _L_BManager_gainRewards = BattleManager.gainRewards;
    BattleManager.gainRewards = function() {
        this.showLearningSkills();
        _L_BManager_gainRewards.call(this);
    };

    BattleManager.showLearningSkills = function() {
        if (!this._learningList) { return }
        var length = this._learningList.length;
        for (var i = 0; i < length; i++) {
            var l = this._learningList[i];
            var actor = $gameActors.actor(l[0]);
            var skill = $dataSkills[l[1]];
            var text;
            if (learningSkillShared) {
                text = displayLearningTextShared;
                $gameParty.addLearningSkill(l[1]);
                $gameParty.refreshLearning();
            } else {
                text = displayLearningText;
                actor.learnSkill(l[1]);
            }
            text = text.replace(/_name/, actor.name());
            text = text.replace(/_skill/, skill.name);
            if (i === 0) { $gameMessage.newPage() }
            $gameMessage.add('\\.' + text);
        }
        this._learningList = null;
    };

    var _L_BManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        this._checkLearns = [];
        _L_BManager_startAction.call(this);
        /*
        if ($gameTemp._learnings && $gameTemp._learnings.length > 0 && learningSkillShared){
            var length = $gameTemp._learnings.length;
            for (var i=0;i<length;i++){
                var l = $gameTemp._learnings[i];
                this._logWindow.displayLearning(l[0],$dataSkills[l[1]]);
            }
            $gameTemp._learnings = [];
        }*/
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var setConditions = function(obj, text) {
        if (!obj) return;
        if (text.match(/(?:テキスト|Text)[:：](.+)]/gi)) {
            obj.text = RegExp.$1;
        } else if (text.match(/(?:ポップアップ|Popup)[:：](.+)/gi)) {
            obj.popup = RegExp.$1;
        } else if (text.match(/SE[:：](.+)/gi)) {
            obj.se = RegExp.$1;
        } else if (text.match(/(?:インフォ|Info)[:：](.+)/gi)) {
            obj.infoText = RegExp.$1;
        } else {
            var cond = text;
            if (Imported['ConditionallyCore']) cond = ConditionallyManager.makeCondition(text);
            obj.conditions.push(cond);
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.isLearningSkill = function(skill) {
        if (this.isSkill(skill)) {
            if (!skill._learningSkills) { this.initLearningSkill(skill) }
            return skill._learningSkills.length > 0;
        } else {
            return false;
        }
    };

    DataManager.initLearningSkill = function(skill) {
        var result = [
            [],
            []
        ];
        var texts = skill.note.split('\n');
        var length = texts.length;
        for (var i = 0; i < length; i++) {
            var text = texts[i];
            if (text.match(/[<＜](?:ラーニング|LEARNING)\s*(\d+)[,，](\d+)[%％]?[>＞]/)) {
                var obj = {
                    'skill': Number(RegExp.$1),
                    'rate': Number(RegExp.$2),
                    'conditions': [],
                    'text': null,
                    'popup': null,
                    'se': null,
                    'infoText': null
                };
                var ts = [];
                for (var j = i + 1; j < length; j++) {
                    if (texts[j].match(/[<＜]\/(?:ラーニング|LEARNING)[>＞]/)) {
                        for (var k = 0, max = ts.length; k < max; k++) setConditions(obj, ts[k]);
                        i = j;
                        break;
                    }
                    ts.push(texts[j]);
                }
                result[1].push(obj);
            } else if (text.match(/[<＜](?:事前ラーニング|PRE_LEARNING)\s*(\d+)[,，](\d+)[%％]?[>＞]/)) {
                var obj = { 'skill': Number(RegExp.$1), 'rate': Number(RegExp.$2), 'conditions': [] };
                var ts = [];
                for (var j = i + 1; j < length; j++) {
                    if (texts[j].match(/[<＜]\/(?:事前ラーニング|PRE_LEARNING)[>＞]/)) {
                        for (var k = 0, max = ts.length; k < max; k++) setConditions(obj, ts[k]);
                        i = j;
                        break;
                    }
                    ts.push(texts[j]);
                }
                result[0].push(obj);
            }
        }
        skill._learningSkills = result;
    };

    DataManager.learningSupply = function(item) {
        if (!item) { return 0 }
        if (item.meta['LEARNING_RATE_SUP']) { return Number(item.meta['LEARNING_RATE_SUP']) }
        if (item.meta['ラーニング率補正']) { return Number(item.meta['ラーニング率補正']) }
        return 0;
    };

    DataManager.isLearningObject = function(obj) {
        if (!obj) { return false }
        if (obj._learningObject === undefined) {
            obj._learningObject = obj.note.match(/[<＜](?:ラーニング能力|LEARNING_ABILITY)[>＞]/);
        }
        return obj._learningObject;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __BManager_invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        if (this._action) this._action.processBeforeLearning(target);
        __BManager_invokeAction.call(this, subject, target);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_BattlerBase.prototype.isEnableLearning = function() {
        return false;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var _L_GAction_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _L_GAction_apply.call(this, target);
        BattleManager._checkLearns = [];
        this.processAfterLearning(target);
    };

    Game_Action.prototype.processBeforeLearning = function(target) {
        if (this.subject().isActor()) { return }
        if (!DataManager.isLearningSkill(this.item())) { return }
        if (!$gameTemp._learnings) { $gameTemp._learnings = [] }
        var targets = [target];
        if (watchLearning) { targets = $gameParty.battleMembers() }

        this.processLearning(targets, 0);
    };

    Game_Action.prototype.processAfterLearning = function(target) {
        if (this.subject().isActor()) { return }
        if (target.result().missed && !missLearning) { return }
        if (target.result().evaded && !evadedLearning) { return }
        if (!DataManager.isLearningSkill(this.item())) { return }
        if (!$gameTemp._learnings) { $gameTemp._learnings = [] }

        var targets = [target];
        if (watchLearning) { targets = $gameParty.battleMembers() }

        this.processLearning(targets, 1);
    };

    Game_Action.prototype.processLearning = function(targets, timing) {
        var l1 = targets.length;
        var item = this.item();
        for (var i = 0; i < l1; i++) {
            var m = targets[i];
            if (!m.isAlive()) { continue }
            if (BattleManager._checkLearns) {
                if (BattleManager._checkLearns.contains(m)) { continue }
                BattleManager._checkLearns.push(m);
            }
            if (!m.isEnableLearning()) { continue }
            var ls = item._learningSkills[timing];
            var l2 = ls.length;
            for (var j = 0; j < l2; j++) {
                var s = ls[j];
                if (!m.isLearnedSkill(s['skill'])) {
                    if (Math.random() < ((s['rate'] / 100) * (m.learningSupply() / 100))) {
                        if (!Imported['ConditionallyCore'] ||
                            ConditionallyManager.checkConditions(m, this.subject(), s['conditions'])) {
                            if (instantLearning) {
                                $gameTemp._learnings.push([m, s]);
                                if (learningSkillShared) {
                                    $gameParty.addLearningSkill(s['skill']);
                                    $gameParty.refreshLearning();
                                } else {
                                    m.learnSkill(s['skill']);
                                    m.refresh();
                                }
                            } else {
                                if (BattleManager._learningList === undefined) { BattleManager._learningList = [] }
                                var r = [m.actorId(), s];
                                if (BattleManager._learningList.contains(r)) { continue }
                                BattleManager._learningList.push(r);
                            }
                        }
                    }
                }
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Actor.prototype.isEnableLearning = function() {
        var objects = this.traitObjects();
        var length = objects.length;
        for (var i = 0; i < length; i++) {
            if (DataManager.isLearningObject(objects[i])) { return true }
        }
        return false;
    };

    Game_Actor.prototype.learningSupply = function() {
        var r = 100;
        var objects = this.traitObjects();
        var length = objects.length;
        for (var i = 0; i < length; i++) { r += DataManager.learningSupply(objects[i]) }
        return r;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Party.prototype.addLearningSkill = function(skillId) {
        if (this._learningSkills === undefined) { this._learningSkills = [] }
        if (!this._learningSkills.contains(skillId)) { this._learningSkills.push(skillId) }
    };

    Game_Party.prototype.refreshLearning = function() {
        if (!this._learningSkills) { return }
        var length = this._learningSkills.length;
        for (var i = 0; i < length; i++) {
            var skillId = this._learningSkills[i];
            this.allMembers().forEach(function(actor) {
                if (actor && !actor.isLearnedSkill(skillId)) {
                    actor.learnSkill(skillId)
                }
            });
        }
    };

    var _L_GParty_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function(actorId) {
        _L_GParty_addActor.call(this, actorId);
        this.refreshLearning();
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Window_BattleLog.prototype.displayLearning = function(actor, learn) {
        var fmt;
        var skill = $dataSkills[learn.skill];
        if (playSEName) {
            if (learn.se !== 'null') {
                var sa = playSEParams.split(',');
                var pan = Number(sa[0]) || 0;
                var pitch = Number(sa[1]) || 100;
                var volume = Number(sa[2]) || 90;
                var se = { 'name': playSEName, 'pan': pan, 'pitch': pitch, 'volume': volume };
                if (learn.se) se['name'] = learn.se;
                if (learn.seSetting) {
                    var setting = learn.seSetting.split(',');
                    se['pan'] = Number(setting[0]);
                    se['pitch'] = Number(setting[1]);
                    se['volume'] = Number(setting[2]);
                }
                AudioManager.playStaticSe(se);
            }
        }
        if (learn.text !== 'null') {
            if (learningSkillShared) {
                fmt = displayLearningTextShared;
                if (learn.text) fmt = learn.text;
            } else {
                fmt = displayLearningText;
                if (learn.text) fmt = learn.text;
            }
            fmt = fmt.replace('_name', actor.name());
            fmt = fmt.replace('_skill', skill.name);
            fmt = '\\C[' + logColor + ']' + fmt + '\\C[0]';
            this.push('addText', fmt);
        }

        if (Imported['GetInformation'] && Imported['GetInformation'] >= 1.04 && learn.infoText !== 'null') {
            var it = infoText;
            if (learn.infoText) it = learn.infoText;
            if (CommonPopupManager.popEnable() && !!it) {
                CommonPopupManager.showInfo(skill, it, 'learning', actor.actorId());
            }
        }
    };

    var _L_WBattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
    Window_BattleLog.prototype.displayFailure = function(target) {
        _L_WBattleLog_displayFailure.call(this, target);
        if ($gameTemp._learnings && $gameTemp._learnings.length > 0) {
            var length = $gameTemp._learnings.length;
            for (var i = 0; i < length; i++) {
                var l = $gameTemp._learnings[i];
                this.displayLearning(l[0], l[1]);
            }
            $gameTemp._learnings = [];
        }
    };

}());