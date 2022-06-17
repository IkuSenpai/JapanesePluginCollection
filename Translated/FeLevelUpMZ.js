//=============================================================================
// FeLevelUpMZ.js
// ----------------------------------------------------------------------------
// (C) 2020 えーしゅん
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.3.0 2021/11/20 以下の機能を追加した。
// ・レベルアップの増加値を変更する機能
// ・レベルアップ時の表示に顔画像を追加する機能
// 1.2.0 2021/08/03 以下の更新を行った
// ・パラメータ設定で８つ設定されていない場合は警告を表示する機能の追加
// ・ヘルプ文の初期パラメータの例文が誤っていたので修正
// ・レベルアップ時の簡易表示切り替えでスイッチを参照出来ていなかったので修正
// 1.1.0 2020/11/14 PluginBaseFunctionがなくても動くように修正
// 1.0.0 2020/11/02 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://taikai-kobo.hatenablog.com
// [Twitter]: https://twitter.com/Asyun3i9t
// [GitHub] : https://github.com/HidetoshiKawaguchi/RPGMaker-plugins
//=============================================================================
//
/*:
 * @target MZ
 * @plugindesc ファイアーエムブレム風レベルアッププラグイン(MZ版)
 * @author えーしゅん
 * @url https://raw.githubusercontent.com/HidetoshiKawaguchi/RPGMaker-plugins/main/FeLevelUp/FeLevelUpMZ.js
 *
 * @param DisplayLevelUp
 * @text レベルアップ時表示ON/OFF
 * @desc レベルアップ時の表示のON/OFFを切り替えます。
 *(-1: 非表示, 0:表示, 1以上:スイッチ番号)
 * @default 0
 * @type string
 *
 * @param ShowFace
 * @text 顔画像の表示ON/OFF
 * @desc 顔画像の表示ON/OFFを切り替えます。
 *(-1: 非表示, 0:表示, 1以上:スイッチ番号)
 * @default 0
 * @type string
 *
 * @param TemplateDisplayLevelUp
 * @text 表示テンプレート
 * @desc レベルアップ時のパラメータアップ表示テンプレート
 *(%1:パラメータ名,%2:アップ前,%3:アップ後,%4:アップ値)
 * @default %1: %2 -> %3 (+%4)
 * @type string
 *
 * @param Alart
 * @text 警告表示(デバッグ用)
 * @desc デバッグ用。パラメータ設定に誤りがある場合、
 *ゲーム開始時に警告を出すか
 * @default true
 * @type select
 * @option はい
 * @value true
 * @option いいえ
 * @value false
 *
 * @command INITIALIZE_PARAMS
 * @text パラメータ初期化
 * @desc アクターのパラメータを初期化する。
 * @arg actorId
 * @text アクターID
 * @desc 初期化対象のアクターID
 * @default 1
 * @type number
 *
 * @help FeLevelUpMZ.js [ファイアーエムブレム風レベルアッププラグイン(MZ版)]
 *
 * このプラグインはファイアーエムブレム風のレベルアップ機能を実現します。
 * アクター毎に設定した成長率(確率)に応じて、レベルアップ時にランダムに
 * パラメータがアップするようになります。
 *
 * ## 使い方
 * アクター毎にパラメータの初期値と成長率を設定する必要があります。
 * オプションとして、職業・武器・防具にも成長率を設定できます。
 * その場合、アクターに設定した成長率に補正を加えることになります。
 *
 * ### アクターのパラメータの初期値を設定する(必須)
 * アクターのパラメータの初期値は、アクターのメモ欄に以下のように
 * 記述してください。
 * ```
 * <FE_INIT_PARAMS: 最大HP, 最大MP, 攻撃力, 防御力, 魔法力, 魔法防御, 敏捷性, 運>
 * ```
 * カンマ区切りで、数値を記入してください。
 * `FE_INIT_PARAMS`は`FE_初期パラメータ`でも代用できます。
 *
 * 例えば、以下のように書きます。
 * ```
 * <FE_INIT_PARAMS: 20, 12, 9, 5, 7, 2, 1, 8>
 * ```
 * これで、このアクターのパラメータの初期値は最大HPが20, 最大MPが12,
 * 攻撃力が9, 防御力が5, 魔法力が7, 魔法防御が1, 敏捷性が8, 運が6になります。
 *
 * ### アクター毎に成長率を設定する(必須)
 * アクターの成長率(確率)は、アクターのメモ欄に以下のように記述してください。
 * ```
 * <FE_GROWTH_RATES: 最大HP, 最大MP, 攻撃力, 防御力, 魔法力, 魔法防御, 敏捷性, 運>
 * ```
 * カンマ区切りで、数値を記入してください。
 * `FE_GROWTH_RATES`は`FE_成長率`でも代用できます。
 * 例えば、以下のように書きます。
 * ```
 * <FE_GROWTH_RATES: 60, 20, 50, 55, 15, 10, 40, 30>
 * ```
 * これで、このアクターはレベルアップ時に60%の確率で最大HPが1上がります。
 * 最大MPは20%, 攻撃力は50%, 防御力は55%, 魔法力は15%, 魔法防御は10%,
 * 敏捷性は40%, 運は30%の確率で1上がります。
 *
 * 100以上を設定した場合は、その値÷100の値の整数分の値が必ず上がります。
 * そして、あまりの確率で1上がるかの判定を行います。
 * 例えば、230と設定した場合は、必ず2は上がり、更に30%の確率で1上がります。
 *
 * ### 職業・武器・防具に成長率の補正を設定する
 * 職業・武器・防具にアクターの成長率への補正を設定することができます。
 * 記法はアクター毎の成長率と同じです。
 * マイナスの値を設定して、成長率を低下させることもできます。
 * 例えば、職業のメモ欄に以下のように設定すると、攻撃力の成長率が10%上がり、
 * 敏捷性の成長率が5%下がります。
 * ```
 * <FE_GROWTH_RATES: 0, 0, 10, 0, 0, 0, -5, 0>
 * ```
 *
 * ### アクターのパラメータを初期化する
 * プラグインコマンドの`パラメータ初期化`を実行することにより、指定した
 * アクターのパラメータを初期化することができます。
 *
 * このプラグインコマンドだけではレベルは下がらないので、
 * 必要に応じてツクールのイベントコマンド等で下げてください。
 *
 *
 * ### オリジナルの追加機能（上級者向け）
 * ファイアーエムブレムでは、レベルアップ時のパラメータの増加値は１ですが、
 * このプラグインでは 1 以外にも変更することができます。
 *
 * 例えば、以下のようにアクターのメモ欄に記述することで、
 * 最大HPの増加値が 2 になります。
 * ```
 * <FE_GAIN_MAXHP: 2>
 * ```
 * `MAXHP`は`最大HP`でも代用できます。( `<FE_GAIN_最大HP: 2>` )
 *
 * その他のパラメータについても、以下のように同様に設定が可能です。
 * - 最大MP: `<FE_GAIN_MAXMP: 2>`
 * - 攻撃力: `<FE_GAIN_ATTACK: 2>`
 * - 防御力: `<FE_GAIN_DEFENSE: 2>`
 * - 魔法力: `<FE_GAIN_M.ATTACK: 2>`
 * - 魔法防御: `<FE_GAIN_M.DEFENSE: 2>`
 * - 敏捷性: `<FE_GAIN_AGILITY: 2>`
 * - 運: `<FE_GAIN_LUCK: 2>`
 * `MAXMP`は`最大MP`, `ATTACK`は`攻撃力`, `DEFENSE`は`防御力`,
 * `M.ATTACK`は`魔法力`, `M.DEFENSE`は`魔法防御`,
 * `AGILITY`は`敏捷性`, `LUCK`は`運`でも代用できます。
 *
 * 更に、それぞれのパラメータで、複数の増加値を設定できます。
 * その場合、それら複数の増加値からランダムに選ばれます。
 *
 * 例えば、最大HPの増加値を1, 2, 3のいずれかからランダムに増加させたい場合は、
 * 以下のようにアクターのメモ欄に記述してください。
 * ```
 * <FE_GAIN_MAXHP: 1, 2, 3>
 * ```
 * 最大HPの成長率が50%に設定されていた場合、
 * 「50%の確率で、最大HPが1か2か3アップする」という意味になります。
 *
 * 同じ数値を複数設定することも可能です。
 * ```
 * <FE_GAIN_MAXHP: 1, 1, 1, 1, 2>
 * ```
 * 1が選ばれる確率が80%で、2が選ばれる確率が20%になります。
 *
 * この増加値は、成長率と同様に職業・武器・防具のメモ欄にも設定可能です。
 * その場合、それぞれで増加値の判定がされ、最後に合算された値が増加します。
 *
 *
 *
 * ## 連絡先/Author
 * えーしゅん
 * - Twitter:  https://twitter.com/Asyun3i9t
 * - ホームページ: taikai-kobo.hatenablog.com
 *
 * ## 利用規約
 * 作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）についても
 * 制限はありません。このプラグインはもうあなたのものです。
 */
(function() {
    'use strict'
    const prefix = 'FE_'
    //=============================================================================
    // パラメータの取得と整形
    //=============================================================================
    var createPluginParameter = function(pluginName) {
        var replacer = function(key, value) {
            if (value === 'null') {
                return value;
            }
            if (value[0] === '"' && value[value.length - 1] === '"') {
                return value;
            }
            try {
                return JSON.parse(value);
            } catch (e) {
                return value;
            }
        };
        var pMP = PluginManager.parameters(pluginName)
        var parameters = JSON.parse(JSON.stringify(pMP, replacer));
        // PluginManager.setParameters(pluginName, parameters);
        return parameters;
    };
    const pluginParams = createPluginParameter('FeLevelUpMZ');

    //=============================================================================
    // 汎用処理関数を定義
    //=============================================================================
    function addArray(array1, array2) {
        var out = [];
        for(var i=0; i < array1.length; i++) {
            var v = array2[i] ? array2[i] : 0;
            out.push(array1[i] + v);
        }
        return out;
    }

    function checkParams(params) {
        if (params.length != 8) {
            return false;
        }
        for (const p of params) {
            if (typeof(p) != 'number') {
                return false;
            }
        }
        return true;
    }

    function parseGrowthRates(meta, alartInfo) {
        var enKey = prefix + 'GROWTH_RATES';
        var jaKey = prefix + '成長率'
        var strGrowthRates = meta[enKey];
        if (strGrowthRates == undefined) {
            strGrowthRates = meta[jaKey] ? meta[jaKey] : '';
        }
        if (strGrowthRates == '') { // 設定されていないならすべて0で返す
            return new Array(8).fill(0);
        }
        // 以降，構文チェック
        var growthRates = strGrowthRates.split(',').map(Number);
        if (checkParams(growthRates) == false) {
            if (pluginParams.Alart) {
                $gameMessage.add('【警告: FeLevelUp】');
                $gameMessage.add(alartInfo + 'の成長率設定に誤りがあります。');
                $gameMessage.add('あなたの設定したのは"' + strGrowthRates + '"です。');
                $gameMessage.add('整数値をちょうど８つ並べてください。');
            }
            growthRates = new Array(8).fill(0);
        }
        return growthRates;
    }

    function convertParamIdToKeys(paramId) {
        var keys = [
            ['MAXHP', '最大HP', 'HP'],
            ['MAXMP', '最大MP', 'MP'],
            ['ATTACK', '攻撃力'],
            ['DEFENSE', '防御力'],
            ['M.ATTACK', '魔法力'],
            ['M.DEFENSE', '魔法防御'],
            ['AGILITY', '敏捷性'],
            ['LUCK', '運']
        ][paramId];
        if (keys == undefined) {
            return [];
        }
        return keys;
    }

    function parseGainRoulette(meta, paramId) {
        var keys = convertParamIdToKeys(paramId).map(function(key) {
            return prefix + 'GAIN_' + key;
        });
        var strGainRoulette = '';
        for (var i=0; i < keys.length; i++) {
            var strGainRoulette = meta[keys[i]] ? meta[keys[i]] : strGainRoulette;
        }
        if (strGainRoulette == '') {
            return [];
        }
        return strGainRoulette.split(',').map(Number);
    }

    //=============================================================================
    //  プラグインコマンドの追加
    //=============================================================================
    const callInitializeParams = function(actorId) {
        var actor = $gameActors.actor(actorId);
        if(actor) {
            actor.initializeParams();
        }
    };
    PluginManager.registerCommand('FeLevelUpMZ', 'INITIALIZE_PARAMS', function(args) {
        callInitializeParams(Number(args.actorId));
    });

    //=============================================================================
    // レベルアップ時の判定・上昇値の計算をする処理
    //=============================================================================
    Game_Actor.prototype.initializeParams = function() {
        var meta = $dataActors[this.actorId()].meta;
        var enKey = prefix + 'INIT_PARAMS'
        var jaKey = prefix + '初期パラメータ'
        if (meta[enKey] || meta[jaKey]) {
            var strParams = meta[enKey];
            if (strParams == undefined) {
                strParams = meta[jaKey] ? meta[jaKey] : ''
            }
            var params = strParams.split(',').map(Number);
            if (checkParams(params) == false) {
                if (pluginParams.Alart) {
                    $gameMessage.add('【警告: FeLevelUp】');
                    $gameMessage.add('ID' + this.actorId() + 'のアクターの初期パラメータ設定に誤りがあります。');
                    $gameMessage.add('あなたの設定したのは"' + strParams + '"です。');
                    $gameMessage.add('整数値をちょうど８つ並べてください。');
                }
                params = [1, 1, 1, 1, 1, 1, 1, 1];
            }
            this._feParams = params;
        }  // 初期パラメータが設定されていなければ何もしない
    };

    Game_Actor.prototype.growthRates = function() {
        var meta = $dataActors[this.actorId()].meta;
        var baseGrowth = parseGrowthRates(meta, 'ID' + this.actorId() + 'のアクター');
        var classGrowth = parseGrowthRates(this.currentClass().meta, 'ID' + this.currentClass().id + 'の職業');
        var weaponGrowthList = this.weapons().map(function(w){
            return parseGrowthRates(w.meta, 'ID' + w.id + 'の武器');
        });
        var armorGrowthList = this.armors().map(function(a){
            return parseGrowthRates(a.meta, 'ID' + a.id + 'の防具');
        });

        var growthRates = addArray(baseGrowth, classGrowth);
        growthRates = weaponGrowthList.reduce(addArray, growthRates);
        growthRates = armorGrowthList.reduce(addArray, growthRates);
        growthRates = growthRates.map(function(g){
            return Math.max(g, 0);
        });
        return growthRates;
    };

    Game_Actor.prototype.rouletteGain = function(paramId) {
        var meta = $dataActors[this.actorId()].meta;
        var baseRoulette = parseGainRoulette(meta, paramId);
        if (baseRoulette.length == 0) baseRoulette = [1];
        var classRoulette = parseGainRoulette(this.currentClass().meta, paramId);
        if (classRoulette.length == 0) classRoulette = [0];
        var weaponRouletteList = this.weapons().map(function(w){
            var gr = parseGainRoulette(w.meta, paramId);
            if (gr.length == 0) gr = [0];
            return gr;
        });
        var armorRouletteList = this.armors().map(function(a){
            var gr = parseGainRoulette(a.meta, paramId);
            if (gr.length == 0) gr = [0];
            return gr;
        });
        var gain = 0;
        gain += baseRoulette[Math.floor(Math.random() * baseRoulette.length)];
        gain += classRoulette[Math.floor(Math.random() * classRoulette.length)];
        for (var i=0; i < weaponRouletteList.length; i++) {
            gain += weaponRouletteList[i][Math.floor(Math.random() * weaponRouletteList[i].length)];
        }
        for (var i=0; i < armorRouletteList.length; i++) {
            gain += armorRouletteList[i][Math.floor(Math.random() * armorRouletteList[i].length)];
        }
        console.log(gain, paramId)
        return gain;
    };

    var _Game_Actor_ParamBase = Game_Actor.prototype.paramBase;
    Game_Actor.prototype.paramBase = function(paramId) {
        if (this._feParams == undefined) {
            this.initializeParams();
        }
        if (this._feParams) {
            if (this._feParams[paramId]) {
                return this._feParams[paramId];
            }
        }
        return _Game_Actor_ParamBase.apply(this, arguments);
    };

    var _Game_Actor_LevelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        if(this._level == 1) this.initializeParams();
        _Game_Actor_LevelUp.apply(this, arguments);
        var meta = $dataActors[this.actorId()].meta;
        var enKey = prefix + 'GROWTH_RATES';
        var jaKey = prefix + '成長率'
        if ((enKey || jaKey)&& this._feParams) {
            var growth = this.growthRates();
            // 判定と反映
            for (var i=0; i < this._feParams.length; i++) {
                while (growth[i] >= 100) {
                    growth[i] -= 100;
                    this._feParams[i] += this.rouletteGain(i);
                }
                if (Math.randomInt(100) < (growth[i] % 100)) {
                    this._feParams[i] += this.rouletteGain(i);
                }
            }
        }
    };

    //=============================================================================
    // レベルアップ時の表示に関する処理(簡易)
    //=============================================================================
    Game_Actor.prototype.displayFeParamsUp = function(prevFeParams, nextFeParams) {
        var template = pluginParams.TemplateDisplayLevelUp;
        for (let i=0; i < prevFeParams.length; i++) {
            let prev = prevFeParams[i];
            let next = nextFeParams[i];
            let diff = next - prev;
            if (diff != 0) {
                let name = $dataSystem.terms.params[i];
                let text = template.format(name, prev, next, diff);
                $gameMessage.add(text);
            }
        }
    }

    var _Game_Actor_ChangeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function(exp, show) {
        if (pluginParams.DisplayLevelUp < 0) {
            var display = false;
        } else if (pluginParams.DisplayLevelUp === 0) {
            var display = true;
        } else {
            var display = $gameSwitches.value(pluginParams.DisplayLevelUp);
        }
        if (display && this._feParams != undefined) {
            var prevFeParams = this._feParams.map(p => p);
            _Game_Actor_ChangeExp.apply(this, arguments);
            var nextFeParams = this._feParams.map(p => p);
            if (show) {
                if (pluginParams.ShowFace < 0) {
                    var showFace = false;
                } else if (pluginParams.ShowFace === 0) {
                    var showFace = true;
                } else {
                    var showFace = $gameSwitches.value(pluginParams.ShowFace);
                }
                if (showFace) {
                    $gameMessage.setFaceImage(this.faceName(), this.faceIndex());
                }
                this.displayFeParamsUp(prevFeParams, nextFeParams);
            }
        }
        else {
            _Game_Actor_ChangeExp.apply(this, arguments);
        }
    };
})();
