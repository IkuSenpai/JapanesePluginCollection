/*
 * --------------------------------------------------
 * ROR_TreatTraitsForActor.js
 *   ver.1.0.0
 * Copyright (c) 2022 R.Orio
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc アクターの特徴の追加／削除をイベントから行えるようにします。
 * @author R.Orio
 * @base ROR_BaseInsertDataToSave
 * @version 1.0.0
 *
 * @help
 * アクターの特徴の追加／削除をイベントコマンドの
 * プラグインコマンドから行えるようにします。
 *
 * 使い方:
 * プラグインコマンドから追加／削除する特徴を選択し、
 * ・追加か削除か
 * ・特徴のパラメーター
 * を設定してください。一部パラメーターは直接設定のほか、ゲーム内変数で
 * 指定することができます。削除の場合、割合を指定する特徴等については、
 * 確率が一致していなくても削除可能です。
 * 例）
 * 属性有効度120％に対して同じ属性有効度を削除する場合は有効度を指定しない
 * または150％を指定しても削除可能
 *
 * 【ご注意ください】
 * ROR_BaseInsertDataToSave.jsを併せて有効化してください。
 * 無くても動作はしますが、セーブしても更新された特徴が保存されません。
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 *
 *
 * @command addElementEfectivenessToActor
 * @text 特徴「属性有効度」の追加／削除
 * @desc アクターに特徴の属性有効度を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのID
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg element_num
 * @text 属性番号
 * @desc 追加／削除する属性有効度の属性番号（何番目の属性か）です。
 * @type number
 * @min 1
 *
 * @arg specification_type
 * @text 有効度の指定方法
 * @desc 追加する属性有効度の数値指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg effective_rate
 * @text 有効度の値
 * @desc 適用する有効度の値です。％で入力してください。
 * @type number
 * @min 0
 *
 * @arg effective_rate_variable
 * @text 有効度の値を変数で指定する場合の変数ID
 * @desc 適用する有効度の値を変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addDebuffEfectivenessToActor
 * @text 特徴「弱体有効度」の追加／削除
 * @desc アクターに特徴の弱体有効度を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのID
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg status_num
 * @text ステータス番号
 * @desc 追加／削除する弱体有効度のステータス番号（何番目のステータスか）です。
 * @type number
 * @min 1
 *
 * @arg specification_type
 * @text 有効度の指定方法
 * @desc 追加する弱体有効度の数値指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg effective_rate
 * @text 有効度の値
 * @desc 適用する有効度の値です。％で入力してください。
 * @type number
 * @min 0
 *
 * @arg effective_rate_variable
 * @text 有効度の値を変数で指定する場合の変数ID
 * @desc 適用する有効度の値を変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addStateEfectivenessToActor
 * @text 特徴「ステート有効度」の追加／削除
 * @desc アクターに特徴のステート有効度を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのID
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg state_id
 * @text ステートID
 * @desc 追加／削除するステート有効度のステートIDです。
 * @type state
 *
 * @arg specification_type
 * @text 有効度の指定方法
 * @desc 追加するステート有効度の数値指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg effective_rate
 * @text 有効度の値
 * @desc 適用する有効度の値です。％で入力してください。
 * @type number
 * @min 0
 *
 * @arg effective_rate_variable
 * @text 有効度の値を変数で指定する場合の変数ID
 * @desc 適用する有効度の値を変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addStateRegistToActor
 * @text 特徴「ステート無効化」の追加／削除
 * @desc アクターに特徴のステート無効化を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのID
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text ステートIDの指定方法
 * @desc 追加／削除するステート無効化のステートIDの指定方法を選択します。
 * @type select
 * @option 選択指定
 * @value select
 * @option 変数で指定
 * @value variable
 *
 * @arg state_id
 * @text ステートID
 * @desc 追加／削除するステート無効化のステートIDです。
 * @type state
 *
 * @arg state_id_variable
 * @text 追加／削除するステート無効化のステートIDを変数で指定する場合の変数ID
 * @desc 追加／削除するステート無効化のステートIDを変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addBaseStatusAdjustmentToActor
 * @text 特徴「通常能力値」の追加／削除
 * @desc アクターに特徴の通常能力値を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのID
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg status_num
 * @text ステータス番号
 * @desc 追加／削除する通常能力値のステータス番号（何番目のステータスか）です。
 * @type number
 * @default 1
 * @min 1
 *
 * @arg specification_type
 * @text 倍率の指定方法
 * @desc 追加する通常能力値の倍率指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg rate
 * @text 倍率
 * @desc 適用する倍率です。％で入力してください。
 * @type number
 * @min 0
 *
 * @arg rate_variable
 * @text 倍率を変数で指定する場合の変数ID
 * @desc 適用する倍率を変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addAdditionalStatusAdjustmentToActor
 * @text 特徴「追加能力値」の追加／削除
 * @desc アクターに特徴の追加能力値を追加します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのID
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg status_num
 * @text 追加能力値番号
 * @desc 追加／削除する追加能力値の番号（何番目の追加能力値か）です。
 * @type number
 * @default 1
 * @min 1
 *
 * @arg specification_type
 * @text 倍率の指定方法
 * @desc 追加する追加能力値の倍率指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg rate
 * @text 倍率
 * @desc 適用する倍率です。％で入力してください。
 * @type number
 * @min 0
 *
 * @arg rate_variable
 * @text 倍率を変数で指定する場合の変数ID
 * @desc 適用する倍率を変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addSpecialStatusAdjustmentToActor
 * @text 特徴「特殊能力値」の追加／削除
 * @desc アクターに特徴の追加能力値を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのID
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg status_num
 * @text 特殊能力値番号
 * @desc 追加／削除する特殊能力値の番号（何番目の特殊能力値か）です。
 * @type number
 * @default 1
 * @min 1
 *
 * @arg specification_type
 * @text 倍率の指定方法
 * @desc 追加する追加能力値の倍率指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg rate
 * @text 倍率
 * @desc 適用する倍率です。％で入力してください。
 * @type number
 * @min 0
 *
 * @arg rate_variable
 * @text 倍率を変数で指定する場合の変数ID
 * @desc 適用する倍率を変数で指定する場合に参照する変数のIDです。
 * @type variable
 *
 *
 *
 * @command addAttackElementToActor
 * @text 特徴「攻撃時属性」の追加／削除
 * @desc 特徴の「攻撃時属性」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 属性の指定方法
 * @desc 追加／削除する攻撃時属性の指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg element_num
 * @text 属性番号
 * @desc 追加／削除する攻撃時属性の番号（何番目の属性か）を指定します。
 * @type number
 * @default 1
 * @min 1
 *
 * @arg skill_id_variable
 * @text 属性番号を変数で指定する場合の変数ID
 * @desc 属性番号を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addAttackStateToActor
 * @text 特徴「攻撃時ステート」の追加／削除
 * @desc 特徴の「攻撃時ステート」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text ステートの指定方法
 * @desc 追加／削除する攻撃時ステートの指定方法を選択します。
 * @type select
 * @option プルダウン選択
 * @value select
 * @option 変数で指定
 * @value variable
 *
 * @arg state_id
 * @text ステートID
 * @desc 追加／削除する攻撃時ステートを指定します。
 * @type state
 *
 * @arg skill_id_variable
 * @text ステートを変数で指定する場合の変数ID
 * @desc ステートを変数で指定する場合の変数ID
 * @type variable
 *
 * @arg specification_type2
 * @text ステート付与率の指定方法
 * @desc 追加する攻撃時ステートの付与率の指定方法を選択します。
 * @type direct
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg possibility
 * @text ステート付与率
 * @desc 追加する攻撃時ステートの付与率を指定します。
 * @type number
 *
 * @arg possibility_variable
 * @text 付与率を変数で指定する場合の変数ID
 * @desc 付与率を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addAttackSpeedAdjustmentToActor
 * @text 特徴「攻撃時速度補正」の追加／削除
 * @desc 特徴の「攻撃時速度補正」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 速度補正の指定方法
 * @desc 追加する攻撃時速度補正値の指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg value
 * @text 攻撃時速度補正値
 * @desc 追加する攻撃時速度補正の値を指定します。
 * @type number
 * @default 1
 * @min 0
 *
 * @arg value_variable
 * @text 攻撃時速度補正値を変数で指定する場合の変数ID
 * @desc 攻撃時速度補正値を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addAdditionalAttackTimesToActor
 * @text 特徴「攻撃追加回数」の追加／削除
 * @desc 特徴の「攻撃追加回数」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 攻撃追加回数の指定方法
 * @desc 追加する攻撃追加回数の指定方法を選択します。
 * @type select
 * @option 直接入力
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg value
 * @text 攻撃追加回数
 * @desc 追加する攻撃時速度補正の値を指定します。
 * @type number
 * @default 1
 * @min 0
 *
 * @arg value_variable
 * @text 攻撃追加回数を変数で指定する場合の変数ID
 * @desc 攻撃追加回数を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addReplacementStandardAttackToActor
 * @text 特徴「攻撃スキル」の追加／削除
 * @desc 特徴の「攻撃スキル」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 攻撃スキルの指定方法
 * @desc 追加／削除する攻撃スキルの指定方法を選択します。
 * @type select
 * @option リスト選択
 * @value select
 * @option 変数で指定
 * @value variable
 *
 * @arg skill_id
 * @text スキルID
 * @desc 通常攻撃時に発動するスキルを指定します。
 * @type skill
 *
 * @arg skill_id_variable
 * @text 通常攻撃時に発動するスキルを変数で指定する場合の変数ID
 * @desc 通常攻撃時に発動するスキルを変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addSkillTypeToActor
 * @text 特徴「スキルタイプ追加」の追加／削除
 * @desc 特徴の「スキルタイプ追加」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text スキルタイプの指定方法
 * @desc 追加／削除するスキルタイプの指定方法を選択します。
 * @type select
 * @option 直接指定
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg skill_type_num
 * @text スキルタイプ番号
 * @desc 追加／削除するスキルタイプの番号（何番目のスキルタイプか）を指定します。
 * @type number
 *
 * @arg skill_type_num_variable
 * @text 追加／削除するスキルタイプの番号を変数で指定する場合の変数ID
 * @desc 追加／削除するスキルタイプの番号を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addSkillTypeSealingToActor
 * @text 特徴「スキルタイプ封印」の追加／削除
 * @desc 特徴の「スキルタイプ封印」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text スキルタイプの指定方法
 * @desc 封印するスキルタイプの指定方法を選択します。
 * @type select
 * @option 直接指定
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg skill_type_num
 * @text スキルタイプ番号
 * @desc 封印／封印解除するスキルタイプの番号（何番目のスキルタイプか）を指定します。
 * @type number
 *
 * @arg skill_type_num_variable
 * @text 封印／封印解除するスキルタイプの番号を変数で指定する場合の変数ID
 * @desc 封印／封印解除するスキルタイプの番号を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addSkillToActor
 * @text 特徴「スキル追加」の追加／削除
 * @desc 特徴の「スキル追加」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text スキルの指定方法
 * @desc 追加／削除するスキルの指定方法を選択します。
 * @type select
 * @option 選択指定
 * @value select
 * @option 変数で指定
 * @value variable
 *
 * @arg skill_id
 * @text スキルID
 * @desc 追加／削除するスキルのIDを指定します。
 * @type skill
 *
 * @arg skill_id_variable
 * @text スキルIDを変数で指定する場合の変数ID
 * @desc スキルIDを変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addSkillSealingToActor
 * @text 特徴「スキル封印」の追加／削除
 * @desc 特徴の「スキル封印」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text スキルの指定方法
 * @desc 封印／封印解除するスキルの指定方法を選択します。
 * @type select
 * @option 選択指定
 * @value select
 * @option 変数で指定
 * @value variable
 *
 * @arg skill_id
 * @text スキルID
 * @desc 封印／封印解除するスキルのIDを指定します。
 * @type skill
 *
 * @arg skill_id_variable
 * @text スキルIDを変数で指定する場合の変数ID
 * @desc スキルIDを変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addWeaponTypeToActor
 * @text 特徴「武器タイプ装備」の追加／削除
 * @desc 特徴の「武器タイプ装備」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 武器タイプの指定方法
 * @desc 追加／削除する武器タイプの指定方法を選択します。
 * @type select
 * @option 直接指定
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg weapon_type_num
 * @text 武器タイプ番号
 * @desc 追加／削除する武器タイプの番号（何番目の武器タイプか）を指定します。
 * @type number
 *
 * @arg weapon_type_num_variable
 * @text 追加／削除する武器タイプの番号を変数で指定する場合の変数ID
 * @desc 追加／削除する武器タイプの番号を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addArmorTypeToActor
 * @text 特徴「防具タイプ装備」の追加／削除
 * @desc 特徴の「防具タイプ装備」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 防具タイプの指定方法
 * @desc 追加／削除する防具タイプの指定方法を選択します。
 * @type select
 * @option 直接指定
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg armor_type_num
 * @text 防具タイプ番号
 * @desc 追加／削除する防具タイプの番号（何番目の防具タイプか）を指定します。
 * @type number
 *
 * @arg armor_type_num_variable
 * @text 追加／削除する防具タイプの番号を変数で指定する場合の変数ID
 * @desc 追加／削除する防具タイプの番号を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addEquipFixToActor
 * @text 特徴「装備固定」の追加／削除
 * @desc 特徴の「装備固定」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 装備タイプの指定方法
 * @desc 固定／固定解除する装備タイプの指定方法を選択します。
 * @type select
 * @option 直接指定
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg equip_type_num
 * @text 装備タイプ番号
 * @desc 固定／固定解除する装備タイプの番号（何番目の装備タイプか）を指定します。
 * @type number
 *
 * @arg armor_type_num_variable
 * @text 固定／固定解除する装備タイプの番号を変数で指定する場合の変数ID
 * @desc 固定／固定解除する装備タイプの番号を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addEquipSealingToActor
 * @text 特徴「装備封印」の追加／削除
 * @desc 特徴の「装備封印」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg specification_type
 * @text 装備タイプの指定方法
 * @desc 封印／封印解除する装備タイプの指定方法を選択します。
 * @type select
 * @option 直接指定
 * @value direct
 * @option 変数で指定
 * @value variable
 *
 * @arg equip_type_num
 * @text 装備タイプ番号
 * @desc 封印／封印解除する装備タイプの番号（何番目の装備タイプか）を指定します。
 * @type number
 *
 * @arg armor_type_num_variable
 * @text 封印／封印解除する装備タイプの番号を変数で指定する場合の変数ID
 * @desc 封印／封印解除する装備タイプの番号を変数で指定する場合の変数ID
 * @type variable
 *
 *
 *
 * @command addSlotTypeToActor
 * @text 特徴「スロットタイプ」の追加／削除
 * @desc 特徴の「スロットタイプ」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg slot_type
 * @text スロットタイプ
 * @desc 二刀流かどうかを指定します。
 * @type select
 * @option 通常
 * @value 0
 * @option 二刀流
 * @value 1
 *
 *
 *
 * @command addAdditionalTurnToActor
 * @text 特徴「行動回数追加」の追加／削除
 * @desc 特徴の「行動回数追加」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg possibility
 * @text 行動が追加される確率
 * @desc 行動が追加される確率を％で指定します。
 * @type number
 * @default 100
 * @min 0
 * @max 100
 *
 *
 *
 * @command addSpecialFlagToActor
 * @text 特徴「特殊フラグ」の追加／削除
 * @desc 特徴の「特殊フラグ」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg special_flag
 * @text 特殊フラグ
 * @desc 特殊フラグの内容を設定します。
 * @type select
 * @option 自動戦闘
 * @value 0
 * @option 防御
 * @value 1
 * @option 身代わり
 * @value 2
 * @option TP持ち込み
 * @value 3
 *
 *
 *
 * @command addDisappearEffectToActor
 * @text 特徴「消滅エフェクト」の追加／削除
 * @desc 特徴の「消滅エフェクト」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg disappear_effect
 * @text 消滅エフェクト
 * @desc 消滅エフェクトの内容を設定します。
 * @type select
 * @option 通常
 * @value 0
 * @option ボス
 * @value 1
 * @option 瞬間消去
 * @value 2
 * @option 消えない
 * @value 3
 *
 *
 *
 * @command addPartyAbilityToActor
 * @text 特徴「パーティ能力」の追加／削除
 * @desc 特徴の「パーティ能力」を追加／削除します。
 *
 * @arg actor_id
 * @text アクターID
 * @desc 特徴を追加／削除するアクターのIDを指定します。
 * @type actor
 *
 * @arg mode
 * @text 処理内容
 * @desc 実行する処理の種類を指定します。
 * @type select
 * @option 追加
 * @value 1
 * @option 削除
 * @value 2
 *
 * @arg party_ability
 * @text パーティ能力
 * @desc パーティ能力の内容を設定します。
 * @type select
 * @option エンカウント半減
 * @value 0
 * @option エンカウント無効
 * @value 1
 * @option 不意打ち無効
 * @value 2
 * @option 先制攻撃率アップ
 * @value 3
 * @option 獲得金額2倍
 * @value 4
 * @option アイテム入手率2倍
 * @value 5
 *
 *
 *
 */

(() => {
	'use strict';

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

  //-----------------------------------------------------------------------------
  // PluginManager
  //

	PluginManager.registerCommand(pluginName, "addElementEfectivenessToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 11;
		let data_id = parseInt(args.element_num);//属性は1始まり
		let specification_type = args.specification_type;
		let value = 1;

		if(specification_type === 'direct'){
			value = parseInt(args.effective_rate) / 100;
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.effective_rate_variable);
			value = parseInt($gameVariables.value(variable_id)) / 100;
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addDebuffEfectivenessToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 12;
		let data_id = parseInt(args.status_num) - 1;//keyが0始まりのため調整
		let specification_type = args.specification_type;
		let value = 1;

		if(specification_type === 'direct'){
			value = parseInt(args.effective_rate) / 100;
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.effective_rate_variable);
			value = parseInt($gameVariables.value(variable_id)) / 100;
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addStateEfectivenessToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 13;
		let data_id = parseInt(args.state_id);
		let specification_type = args.specification_type;
		let value = 1;

		if(specification_type === 'direct'){
			value = parseInt(args.effective_rate) / 100;
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.effective_rate_variable);
			value = parseInt($gameVariables.value(variable_id)) / 100;
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addStateRegistToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 14;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'select'){
			data_id = parseInt(args.state_id);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.state_id_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addBaseStatusAdjustmentToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 21;
		let data_id = parseInt(args.status_num) - 1;//keyが0始まりのため調整
		let specification_type = args.specification_type;
		let value = 1;

		if(specification_type === 'direct'){
			value = parseInt(args.rate) / 100;
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.rate_variable);
			value = parseInt($gameVariables.value(variable_id)) / 100;
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addAdditionalStatusAdjustmentToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 22;
		let data_id = parseInt(args.status_num) - 1;//keyが0始まりのため調整
		let specification_type = args.specification_type;
		let value = 1;

		if(specification_type === 'direct'){
			value = parseInt(args.rate) / 100;
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.rate_variable);
			value = parseInt($gameVariables.value(variable_id)) / 100;
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addSpecialStatusAdjustmentToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 23;
		let data_id = parseInt(args.status_num) - 1;//keyが0始まりのため調整
		let specification_type = args.specification_type;
		let value = 1;

		if(specification_type === 'direct'){
			value = parseInt(args.rate) / 100;
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.rate_variable);
			value = parseInt($gameVariables.value(variable_id)) / 100;
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addAttackElementToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 31;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'direct'){
			data_id = parseInt(args.element_num);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.element_num_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addAttackStateToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 32;
		let specification_type = args.specification_type;
		let specification_type2 = args.specification_type2;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'select'){
			data_id = parseInt(args.state_id);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.state_id_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(specification_type2 === 'direct'){
			value = args.possibility / 100;
		}else if(specification_type2 === 'variable'){
			let variable_id = parseInt(args.possibility_variable);
			value = parseInt($gameVariables.value(valiable_id)) / 100;
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addAttackSpeedAdjustmentToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 33;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 0;

		if(specification_type === 'direct'){
			value = parseInt(args.value);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.value_variable);
			value = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addAdditionalAttackTimesToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 34;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 0;

		if(specification_type === 'direct'){
			value = parseInt(args.value);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.value_variable);
			value = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addReplacementStandardAttackToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 35;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'select'){
			data_id = parseInt(args.skill_id);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.value_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addSkillTypeToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 41;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'direct'){
			data_id = parseInt(args.skill_type_num);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.skill_type_num_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addSkillTypeSealingToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 42;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'direct'){
			data_id = parseInt(args.skill_type_num);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.skill_type_num_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addSkillToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 43;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'select'){
			data_id = parseInt(args.skill_id);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.skill_id_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addSkillSealingToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 44;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'select'){
			data_id = parseInt(args.skill_id);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.skill_id_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addWeaponTypeToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 51;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'direct'){
			data_id = parseInt(args.weapon_type_num);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.weapon_type_num_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addArmorTypeToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 52;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'direct'){
			data_id = parseInt(args.armor_type_num);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.armor_type_num_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addEquipFixToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 53;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'direct'){
			data_id = parseInt(args.equip_type_num);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.equip_type_num_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addEquipSealingToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 54;
		let specification_type = args.specification_type;
		let data_id = 0;
		let value = 1;

		if(specification_type === 'direct'){
			data_id = parseInt(args.equip_type_num);
		}else if(specification_type === 'variable'){
			let variable_id = parseInt(args.equip_type_num_variable);
			data_id = parseInt($gameVariables.value(variable_id));
		}else{
			console.log('exception');
			mode = 99;
		}

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addSlotTypeToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 55;
		let data_id = (args.slot_type === '1') ? 1 : 0;
		let value = 1;

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addAdditionalTurnToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 61;
		let data_id = 0;
		let value = parseInt(args.possibility) / 100;

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value, false, true);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addSpecialFlagToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 62;
		let data_id = parseInt(args.special_flag);
		let value = 1;

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addDisappearEffectToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 63;
		let data_id = parseInt(args.disappear_effect);
		let value = 1;

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "addPartyAbilityToActor", args => {

		let actor_id = parseInt(args.actor_id);
		let mode = parseInt(args.mode);
		let code = 64;
		let data_id = parseInt(args.party_ability);
		let value = 1;

		if(mode === 1){
			buildObjectAndInsert(actor_id, code, data_id, value);
		}else if(mode === 2){
			filterTrait(actor_id, code, data_id, value);
		}else{
			console.log('unexpected parameter has been thrown.');
		}
	});



	PluginManager.registerCommand(pluginName, "initialize", args => {

		initialize();
	});



	function buildObjectAndInsert(actor_id, code, data_id, value){

		const AdditionalObject = {
				code : code,
				dataId : data_id,
				value : value,
		};

		$dataActors[actor_id].traits.push(AdditionalObject);
	};



	function filterTrait(actor_id, code, data_id, value, is_ignore_data_id = false, is_ignore_value = false){

		let Traits = $dataActors[actor_id].traits;

		Traits = Traits.filter(function(Object){
			if(Object.code !== code){
				return true;
			}

			if(!is_ignore_data_id && Object.dataId){
				if(Object.dataId !== data_id){
					return true;
				}
			}

			if(!is_ignore_value && Object.value){
				if(Object.value !== value){
					return true;
				}
			}

			return false;
		});

		$dataActors[actor_id].traits = Traits;
	};

})();