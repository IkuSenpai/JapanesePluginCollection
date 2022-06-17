//=============================================================================
// YKP_DamageCalculation.js
//
// Copyright (c) 2019 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================
var Imported = Imported || {};
Imported.YKP_DamageCalculation = true;

var YukiKP = YukiKP || {};
YukiKP.DamageCalculation = YukiKP.DamageCalculation || {};

/*:
 * @plugindesc ダメージ計算式を関数化するプラグイン。
 * @target MZ
 * @author YukiKamijo
 *
 * @param MinDamage
 * @desc 最低ダメージ値を設定します。
 * default 1
 * @default 1
 *
 * @param MaxDamage
 * @desc 最高ダメージ値を設定します。
 * default 999999
 * @default 999999
 *
 * @param AttackRate
 * @desc 攻撃力の倍率を設定します。
 * default 4
 * @default 4
 *
 * @param DeffenceRate
 * @desc 防御力の倍率を設定します。
 * default 2
 * @default 2
 *
 * @param AttackLevel1
 * @desc AtkDamage-level1の倍率を設定します。
 * default 0.8
 * @default 0.8
 *
 * @param AttackLevel2
 * @desc AtkDamage-level2の倍率を設定します。
 * default 1.0
 * @default 1.0
 *
 * @param AttackLevel3
 * @desc AtkDamage-level3の倍率を設定します。
 * default 1.2
 * @default 1.2
 *
 * @param AttackLevel4
 * @desc AtkDamage-level4の倍率を設定します。
 * default 1.5
 * @default 1.5
 *
 * @param AttackLevel5
 * @desc AtkDamage-level5の倍率を設定します。
 * default 1.8
 * @default 1.8
 *
 * @param MagicRate
 * @desc 魔法力の倍率を設定します。
 * default 4
 * @default 4
 *
 * @param MagicDeffenceRate
 * @desc 魔法防御力の倍率を設定します。
 * default 2
 * @default 2
 *
 * @param MagicLevel1
 * @desc MatDamage-level1の倍率を設定します。
 * default 0.8
 * @default 0.8
 *
 * @param MagicLevel2
 * @desc MatDamage-level2の倍率を設定します。
 * default 1.0
 * @default 1.0
 *
 * @param MagicLevel3
 * @desc MatDamage-level3の倍率を設定します。
 * default 1.2
 * @default 1.2
 *
 * @param MagicLevel4
 * @desc MatDamage-level4の倍率を設定します。
 * default 1.5
 * @default 1.5
 *
 * @param MagicLevel5
 * @desc MatDamage-level5の倍率を設定します。
 * default 1.8
 * @default 1.8
 *
 * @param AtkMatRate
 * @desc 攻撃力と魔法力の複合倍率を設定します。
 * default 2
 * @default 2
 *
 * @param DefMdfRate
 * @desc 防御力と魔法防御の複合倍率を設定します。
 * default 1
 * @default 1
 *
 * @param MixLevel1
 * @desc MixDamage-level1の倍率を設定します。
 * default 0.8
 * @default 0.8
 *
 * @param MixLevel2
 * @desc MixDamage-level2の倍率を設定します。
 * default 1.0
 * @default 1.0
 *
 * @param MixLevel3
 * @desc MixDamage-level3の倍率を設定します。
 * default 1.2
 * @default 1.2
 *
 * @param MixLevel4
 * @desc MixDamage-level4の倍率を設定します。
 * default 1.5
 * @default 1.5
 *
 * @param MixLevel5
 * @desc MixDamage-level5の倍率を設定します。
 * default 1.8
 * @default 1.8
 *
 *
 * @help
 * ダメージの計算式を関数で済ませられるプラグインです。
 *
 * スキルのダメージ計算式に以下の記載をすると利用できます。
 *  base  : 基本ダメージ
 *  level : スキルのレベル(合計ダメージの倍率決定値)
 *  a.atk : 使用者の攻撃力
 *  b.def : 対象の防御力
 *  a.mat : 使用者の魔法力
 *  b.mdf : 対象の魔法防御力
 *  rate  : 各Levelに対応した倍率
 *
 * 攻撃力依存のみのダメージ計算
 *  AtkDamage(level, base,a.atk, b.def)
 *  使用計算式
 *   (base + a.atk * AttackRate - b.def * DeffenceRate) * rate
 *
 * 魔法攻撃力依存のみのダメージ計算
 *  MatDamage(level, base, a.mat, b.mdf)
 *  使用計算式
 *   (base + a.mat * MagicRate - b.def * MagicDeffenceRate) * rate
 *  AtkDamageと計算式の作りは変わりませんが、
 *  攻撃力と魔法力でダメージ倍率を変えたい場合に使えます。
 *
 * 攻撃力と魔法攻撃力依存の複合ダメージ計算
 *  MixDamage(level, base, a.atk, a.mat, b.def, bmdf)
 *  使用計算式
 *   (base + (a.atk + a.mat) * AtkMatRate - (b.def + b.mdf) * DefMdfRate) * rate
 *
 * 使用例
 *  AtkDamage(2, a.atk, b.def, 100)
 *  基本ダメージを100とし、使用者の攻撃力と対象の防御力で計算します。
 *  最終的なダメージはAttackLevel2の倍率としています。
 *
 * 参考
 *  連続攻撃などで、ダメージを通常の倍率から下げたい場合は
 *  a.atk を a.atk * 0.8 などに置き換えることで、ダメージが下がります。
 *
 *  後半の値は省略することも可能です。
 *  AtkDamage(2, a.atk) とすれば、防御力無視したダメージになります。
 *
 *
 * オプション機能
 *  対象にstateIdのステートが付与されている場合に倍率追加できます。
 *
 *  StateBonus(character ,rate, stateId...)
 *  使用計算式 : (character.isStateAffected(stateId) ? rate : 1)
 *
 *  使用例
 *   AtkDamage(2, a.atk, b.def) * StateBonus(b, 2, 4, 5)
 *   攻撃力依存のダメージ計算後に対象にステートID 4番(毒)が
 *   付与されている場合にダメージが2倍になります。
 *   さらに、対象にステートID 5番(暗闇)が付与さてれいる場合は
 *   もう一度ダメージを2倍にします。(つまり、通常の4倍になる)
 *   対象にステートID 4番がなく、ステートID 5番がある場合は2倍のみ適用されます。
 *   ステートIDが3つ以上ある場合も同様に倍率を乗算します。
 *   乗算されていくので、rateを4にしたりすると4倍、16倍、64倍と跳ね上がります。
 *
 *  StateAddBonus(character ,rate, stateId...)
 *   StateBonusが乗算されていくのに対し、こちらは加算されていきます。
 *   rateを2にすれば、2倍、4倍、6倍という感じになります。
 *   付与されているステートの数だけrateを加算したい場合はこちらを使ってください。
 *
 *  どちらも対象にステートがない場合は等倍にしてくれます。
 *
 *
 * パラメータ設定の説明。
 *  MinDamage          : この数値よりも小さいダメージが出なくなります。
 *  MaxDamage          : この数値よりも大きいダメージが出なくなります。
 *  AttackRate         : 攻撃力の反映倍率です。数字を大きくするとダメージが増えます。
 *  DeffenceRate       : 防御力の反映倍率です。数字を大きくするとダメージが減ります。
 *  AttackLevelN       : AtkDamage(N, ...)を使った時の合計ダメージに対する倍率です。
 *  MagicRate          : 魔法力の反映倍率です。数字を大きくするとダメージが増えます。
 *  MagicDeffenceRate  : 魔法防御力の反映倍率です。数字を大きくするとダメージが減ります。
 *  MagicLevelN        : MatDamage(N, ...)を使った時の合計ダメージに対する倍率です。
 *  AtkMatRate         : 攻撃力と魔法力の反映倍率です。数字を大きくするとダメージが増えます。
 *  DefMdfRate         : 防御力と魔法防御力の反映倍率です。数字を大きくするとダメージが減ります。
 *  MixLevelN          : MixDamage(N, ...)を使った時の合計ダメージに対する倍率です。
 *
 * プラグインコマンドはありません。
 *
 * plugin version 1.0.0
 */

YukiKP.Parameters = PluginManager.parameters('YKP_DamageCalculation');
YukiKP.Param = YukiKP.Param || {};

YukiKP.Param.MinDamage         = Number(YukiKP.Parameters['MinDamage']);
YukiKP.Param.MaxDamage         = Number(YukiKP.Parameters['MaxDamage']);
YukiKP.Param.AttackRate        = Number(YukiKP.Parameters['AttackRate']);
YukiKP.Param.DeffenceRate      = Number(YukiKP.Parameters['DeffenceRate']);
YukiKP.Param.AttackLevel1      = Number(YukiKP.Parameters['AttackLevel1']);
YukiKP.Param.AttackLevel2      = Number(YukiKP.Parameters['AttackLevel2']);
YukiKP.Param.AttackLevel3      = Number(YukiKP.Parameters['AttackLevel3']);
YukiKP.Param.AttackLevel4      = Number(YukiKP.Parameters['AttackLevel4']);
YukiKP.Param.AttackLevel5      = Number(YukiKP.Parameters['AttackLevel5']);
YukiKP.Param.MagicRate         = Number(YukiKP.Parameters['MagicRate']);
YukiKP.Param.MagicDeffenceRate = Number(YukiKP.Parameters['MagicDeffenceRate']);
YukiKP.Param.MagicLevel1       = Number(YukiKP.Parameters['MagicLevel1']);
YukiKP.Param.MagicLevel2       = Number(YukiKP.Parameters['MagicLevel2']);
YukiKP.Param.MagicLevel3       = Number(YukiKP.Parameters['MagicLevel3']);
YukiKP.Param.MagicLevel4       = Number(YukiKP.Parameters['MagicLevel4']);
YukiKP.Param.MagicLevel5       = Number(YukiKP.Parameters['MagicLevel5']);
YukiKP.Param.AtkMatRate        = Number(YukiKP.Parameters['AtkMatRate']);
YukiKP.Param.DefMdfRate        = Number(YukiKP.Parameters['DefMdfRate']);
YukiKP.Param.MixLevel1         = Number(YukiKP.Parameters['MixLevel1']);
YukiKP.Param.MixLevel2         = Number(YukiKP.Parameters['MixLevel2']);
YukiKP.Param.MixLevel3         = Number(YukiKP.Parameters['MixLevel3']);
YukiKP.Param.MixLevel4         = Number(YukiKP.Parameters['MixLevel4']);
YukiKP.Param.MixLevel5         = Number(YukiKP.Parameters['MixLevel5']);

YukiKP.AtkDamageLevel = [];
YukiKP.AtkDamageLevel.push(YukiKP.Param.AttackLevel1);
YukiKP.AtkDamageLevel.push(YukiKP.Param.AttackLevel2);
YukiKP.AtkDamageLevel.push(YukiKP.Param.AttackLevel3);
YukiKP.AtkDamageLevel.push(YukiKP.Param.AttackLevel4);
YukiKP.AtkDamageLevel.push(YukiKP.Param.AttackLevel5);
YukiKP.MatDamageLevel = [];
YukiKP.MatDamageLevel.push(YukiKP.Param.MagicLevel1);
YukiKP.MatDamageLevel.push(YukiKP.Param.MagicLevel2);
YukiKP.MatDamageLevel.push(YukiKP.Param.MagicLevel3);
YukiKP.MatDamageLevel.push(YukiKP.Param.MagicLevel4);
YukiKP.MatDamageLevel.push(YukiKP.Param.MagicLevel5);
YukiKP.MixDamageLevel = [];
YukiKP.MixDamageLevel.push(YukiKP.Param.MixLevel1);
YukiKP.MixDamageLevel.push(YukiKP.Param.MixLevel2);
YukiKP.MixDamageLevel.push(YukiKP.Param.MixLevel3);
YukiKP.MixDamageLevel.push(YukiKP.Param.MixLevel4);
YukiKP.MixDamageLevel.push(YukiKP.Param.MixLevel5);

// ダメージレベルの共通関数
YukiKP.DamageCalculation.DamageLevel = function(mode, level) {
    var rate = 1.0;
    if (level > 5) {
        return rate;
    }
    switch (mode) {
    case 'atk':
        rate = YukiKP.AtkDamageLevel[level - 1];
        break;
    case 'mat':
        rate = YukiKP.MatDamageLevel[level - 1];
        break;
    case 'mix':
        rate = YukiKP.MixDamageLevel[level - 1];
        break;
    }
    return rate;
};

// MinDamage、MaxDamage反映関数
YukiKP.DamageCalculation.MinMaxDamageCheck = function(damage) {
    if (damage < YukiKP.Param.MinDamage) {
        return YukiKP.Param.MinDamage
    } else if (damage > YukiKP.Param.MaxDamage) {
        return YukiKP.Param.MaxDamage;
    }
    return damage;
};


// 攻撃力依存のダメージ
AtkDamage = function(level, base, a_atk, b_def) {
    var damage = 0;
    var atk    = a_atk || 0;
    var def    = b_def || 0;
    var base   = base  || 0;
    var level  = level || 1;
    var rate   = 1;
    rate = YukiKP.DamageCalculation.DamageLevel('atk', level);
    damage = Math.floor((base + atk * YukiKP.Param.AttackRate - def * YukiKP.Param.DeffenceRate) * rate);
    return YukiKP.DamageCalculation.MinMaxDamageCheck(damage);
};

// 魔法力依存のダメージ
MatDamage = function(level, base, a_mat, b_mdf) {
    var damage = 0;
    var mat    = a_mat || 0;
    var mdf    = b_mdf || 0;
    var base   = base  || 0;
    var level  = level || 1;
    var rate   = 1;
    rate = YukiKP.DamageCalculation.DamageLevel('mat', level);
    damage = Math.floor((base + mat * YukiKP.Param.MagicRate - mdf * YukiKP.Param.MagicDeffenceRate) * rate);
    return YukiKP.DamageCalculation.MinMaxDamageCheck(damage);
};

// 攻撃力/魔法力の複合ダメージ
MixDamage = function(level, base, a_atk, a_mat, b_def, b_mdf) {
    var damage = 0;
    var atk    = a_atk || 0;
    var mat    = a_mat || 0;
    var def    = b_def || 0;
    var mdf    = b_mdf || 0;
    var base   = base  || 0;
    var level  = level || 1;
    var rate   = 1;
    rate = YukiKP.DamageCalculation.DamageLevel('mix', level);
    damage = Math.floor((base + (atk + mat) * YukiKP.Param.AtkMatRate - (def + mdf) * YukiKP.Param.DefMdfRate) * rate);
    return YukiKP.DamageCalculation.MinMaxDamageCheck(damage);
};

// ステートによるダメージ倍率(乗算)
StateBonus = function(character, rate, ...args) {
    var damageRate = 1;
    while (args.length > 0) {
        var state = args.shift();
        damageRate *= character.isStateAffected(state) ? rate : 1;
    }
    return damageRate;
};

// ステートによるダメージ倍率(加算)
StateAddBonus = function(character, rate, ...args) {
    var damageRate = 0;
    while (args.length > 0) {
        var state = args.shift();
        damageRate += character.isStateAffected(state) ? rate : 0;
    }
    return damageRate !== 0 ? damageRate : 1;
};
