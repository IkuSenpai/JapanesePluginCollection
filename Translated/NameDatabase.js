/*:
@plugindesc
名前データベース Ver0.10.4(2022/4/1)

@url https://raw.githubusercontent.com/pota-gon/RPGMakerMZ/main/plugins/Name/NameDatabase.js
@target MZ
@author ポテトードラゴン

・アップデート情報
- コピーライト更新
- リファクタ

Copyright (c) 2022 ポテトードラゴン
Released under the MIT License.
https://opensource.org/licenses/mit-license.php

@help
## 概要
データベースを入れ替えても編集が必要なくなる
メモでの名前参照データベースを提供します。

## 使い方


@param ActorEquip
@type boolean
@text アクター初期装備
@desc アクター初期装備に対応するかの設定
@on 対応する
@off 対応しない
@default true

    @param ActorEquipMetaName
    @parent ActorEquip
    @text アクター初期装備タグ
    @desc アクターの初期装備に使うノートタグの名称
    デフォルトは 装備
    @default 装備

@param AddSkill
@type boolean
@text スキル追加(特徴)
@desc スキル追加(特徴)に対応するかの設定
@on 対応する
@off 対応しない
@default true

@param Learning
@type boolean
@text 習得するスキル(職業)
@desc 習得するスキル(職業)に対応するかの設定
@on 対応する
@off 対応しない
@default true
*/
(() => {
    'use strict';

    // ベースプラグインの処理
    function Potadra_getPluginName(extension = 'js') {
        const reg = new RegExp(".+\/(.+)\." + extension);
        return decodeURIComponent(document.currentScript.src).replace(reg, '$1');
    }
    function Potadra_convertBool(bool) {
        if (bool === "false" || bool === '') {
            return false;
        } else {
            return true;
        }
    }
    function Potadra_search(data, id, column = "name", search_column = "id", val = "", initial = 1) {
        if (!id) {
            return val;
        }
        for (let i = initial; i < data.length; i++) {
            if (search_column) {
                if (data[i][search_column] == id) {
                    if (column) {
                        val = data[i][column];
                    } else {
                        val = data[i];
                    }
                    break;
                }
            } else if (i == id) {
                val = data[i];
                break;
            }
        }
        return val;
    }
    function Potadra_nameSearch(data, name, column = "id", search_column = "name", val = "", initial = 1) {
        return Potadra_search(data, name, column, search_column, val, initial);
    }
    function Potadra_metaData(meta_data, delimiter = '\n') {
        if (meta_data) {
            const data = meta_data.split(delimiter);
            if (data) {
                return data.map(datum => datum.trim());
            }
        }
        return false;
    }
    function Potadra_learnings(actor) {
        const data = Potadra_metaData(actor.currentClass().meta['スキル']);
        const learnings = [];
        if (data) {
            for (const value of data) {
                if (value) {
                    const learning_data = value.split(',');
                    learnings.push({
                        level: Number(learning_data[0]),
                        skillId: Potadra_nameSearch($dataSkills, learning_data[1].trim())
                    });
                }
            }
        }
        return learnings;
    }

    // パラメータ用変数
    const plugin_name = Potadra_getPluginName();
    const params      = PluginManager.parameters(plugin_name);

    // 各パラメータ用変数
    const ActorEquip         = Potadra_convertBool(params.ActorEquip);
    const ActorEquipMetaName = String(params.ActorEquipMetaName) || '装備';
    const AddSkill           = Potadra_convertBool(params.AddSkill);
    const Learning           = Potadra_convertBool(params.Learning);

    // アクターの初期装備
    if (ActorEquip && !Utils.isOptionValid("btest")) {
        /**
         *
         *
         * @param {} slot -
         * @returns {}
         */
        function equipData(slot) {
            if (slot === 1) {
                return $dataWeapons;
            } else {
                return $dataArmors;
            }
        }

        /**
         * アクターを扱うクラスです。
         * このクラスは Game_Actors クラス（$gameActors）の内部で使用され、
         * Game_Party クラス（$gameParty）からも参照されます。
         *
         * @class
         */

        /**
         * 装備品の初期化
         *
         * @param {array} equips - 初期装備の配列
         */
        const _Game_Actor_initEquips = Game_Actor.prototype.initEquips;
        Game_Actor.prototype.initEquips = function(equips) {
            _Game_Actor_initEquips.apply(this, arguments);

            const slots    = this.equipSlots();
            const _equips  = this._equips;
            const meta     = this.actor().meta;

            for (let j = 0; j < slots.length; j++) {
                const meta_datum = meta[ActorEquipMetaName + (j + 1)];
                if (meta_datum) {
                    const data = equipData(slots[j]);
                    _equips[j].setEquip(slots[j] === 1, Potadra_nameSearch(data, meta_datum.trim()));
                }
            }
        };
    }

    // スキル追加(特徴)
    if (AddSkill) {
        /**
         *
         *
         * @param {} data -
         * @returns {}
         */
        function skillIds(data) {
            const skill_ids = [];
            if (data) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i]) {
                        const skill_id = Potadra_nameSearch($dataSkills, data[i].trim());
                        if (skill_id) {
                            skill_ids.push(skill_id);
                        }
                    }
                }
            }
            return skill_ids;
        }

        /**
         * アクターを扱うクラスです。
         * このクラスは Game_Actors クラス（$gameActors）の内部で使用され、
         * Game_Party クラス（$gameParty）からも参照されます。
         *
         * @class
         */

        /**
         * 追加スキルの取得
         *
         * @returns {}
         */
        Game_Actor.prototype.addedSkills = function() {
            // アクター
            let data = Potadra_metaData(this.actor().meta['スキル追加']);
            const actor_skill_ids = skillIds(data);

            // 職業
            data = Potadra_metaData(this.currentClass().meta['スキル追加']);
            const class_skill_ids = skillIds(data);

            // 装備
            const equips          = this.equips();
            const equip_skill_ids = [];
            for (let j = 0; j < equips.length; j++) {
                if (equips[j]) {
                    data = Potadra_metaData(equips[j].meta['スキル追加']);
                    const ids = skillIds(data);
                    for (let k = 0; k < ids.length; k++) {
                        equip_skill_ids.push(ids[k]);
                    }
                }
            }
            const skill_ids = actor_skill_ids.concat(class_skill_ids).concat(equip_skill_ids);
            return this.traitsSet(Game_BattlerBase.TRAIT_SKILL_ADD).concat(skill_ids);
        };
    }

    // 習得するスキル(職業)
    if (Learning) {
        /**
         * アクターを扱うクラスです。
         * このクラスは Game_Actors クラス（$gameActors）の内部で使用され、
         * Game_Party クラス（$gameParty）からも参照されます。
         *
         * @class
         */

        /**
         * スキルの初期化
         */
        const _Game_Actor_initSkills = Game_Actor.prototype.initSkills;
        Game_Actor.prototype.initSkills = function() {
            _Game_Actor_initSkills.apply(this, arguments);
            const learnings = Potadra_learnings(this);
            for (const learning of learnings) {
                if (learning.level <= this._level) {
                    this.learnSkill(learning.skillId);
                }
            }
        };

        /**
         * レベルアップ
         */
        const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
        Game_Actor.prototype.levelUp = function() {
            _Game_Actor_levelUp.apply(this, arguments);
            const learnings = Potadra_learnings(this);
            for (const learning of learnings) {
                if (learning.level === this._level) {
                    this.learnSkill(learning.skillId);
                }
            }
        };
    }
})();
