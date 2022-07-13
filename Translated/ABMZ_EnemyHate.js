// =============================================================================
// ABMZ_EnemyHate.js
// Version: 1.18
// -----------------------------------------------------------------------------
// Copyright (c) 2015 ヱビ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @target MZ
 * @plugindesc v1.18 The enemy will target the actor with the most hate.
 * Hate changes with actions in battle.
 * @author ヱビ
 * @url http://www.zf.em-net.ne.jp/~ebi-games/
 *
 * @requiredAssets img/system/hateline
 * 
 * @param DisplayHateLine
 * @text Hate Line Display
 * @type boolean
 * @on Display
 * @off Hidden
 * @desc Decide whether to display hate lines.
 * @default false
 * 
 * @param DebugMode
 * @text Debug Mode
 * @type boolean
 * @on Display
 * @off Hidden
 * @desc When turned on, it outputs to the console how many points the hate has increased.
 * @default false
 * 
 * @param DamageHateFormula
 * @text Damage Hate Formula
 * @desc It is a formula for the amount of hate that increases when damage is inflicted.
 * Default： damage
 * @default damage
 * 
 * @param MPDamageHateFormula
 * @text MP Damage Hate Formula
 * @desc This is a formula for hate that increases when MP damage is inflicted.
 * Default： MPDamage * 5
 * @default MPDamage * 5
 * 
 * @param HealHateFormula
 * @text Recovery Hate Formula
 * @desc This is a formula for the amount of hate that is increased when an ally is healed.
 * Default： healPoint * 2
 * @default healPoint * 2
 * 
 * @param BuffHateFormula
 * @text Buff Hate Formula
 * @desc This is a formula for the amount of hate that is increased when a buff is added to an ally.
 * Default： enemy.atk * 4
 * @default enemy.atk * 4
 * 
 * @param DebuffHateFormula
 * @text Debuff Hate Formula
 * @desc This is a formula for the amount of hate that is increased when a debuff is added to an enemy.
 * Default： enemy.atk * 4
 * @default enemy.atk * 4
 * 
 * @param StateToEnemyHateFormula
 * @text Adding State to Enemy Hate Formula
 * @desc This is a formula for the amount of hate that is increased when adding state to an enemy.
 * Default： enemy.atk * 4
 * @default enemy.atk * 4
 * 
 * @param StateToActorHateFormula
 * @text Adding State to Actor Hate Formula
 * @desc It is a formula for the hate that is increased when a state is added to an ally.
 * Default： enemy.atk * 4
 * @default enemy.atk * 4
 * 
 * @param RemoveStateHateFormula
 * @text Actor Remove State Hate Formula
 * @desc This is the formula for the hate that is increased when a state is removed from an ally.
 * Default： enemy.atk * 4
 * @default enemy.atk * 4
 * 
 * @param ReduceOthersHate
 * @text Hate Reduction
 * @type boolean
 * @on Decrease
 * @off Don't decrease
 * @desc When you perform an action that increases hate, do you reduce the hate of your allies?
 * @default false
 * 
 * @param OthersHateRateFormula
 * @text Actor Hate Reduction Formula
 * @type string
 * @desc This is a formula for the percentage of time when allies' hate is reduced.
 * Default： (100 - (point / enemy.atk)) / 100
 * @default (100 - (point / enemy.atk)) / 100
 * 
 * @param ---EnemyList---
 * @text ---Enemy List---
 * 
 * @param ShowEnemyList
 * @text Display Enemy List
 * @parent ---EnemyList---
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do you want to see the enemy list?
 * @default false
 *
 * @param EnemyListX
 * @text Enemy list position X
 * @parent ---EnemyList---
 * @type number
 * @desc X coordinate of the enemy list.
 * @default 0
 *
 * @param EnemyListY
 * @text Enemy list position Y
 * @parent ---EnemyList---
 * @type number
 * @desc Y coordinate of the enemy list.
 * @default 0
 * 
 * @param HateIconList
 * @text Hate Icon List
 * @parent ---EnemyList---
 * @type string
 * @desc List of hate ranking icons. The further to the left, the higher the rank. Please arrange them separated by single-byte spaces. Default：64 5 4 16
 * @default 64 5 4 16
 *
 * @param EnemyListFontSize
 * @text Enemy List Fontsize
 * @parent ---EnemyList---
 * @type number
 * @desc The font size of the enemy list.
 * @default 24
 *
 * @param EnemyListLineHeight
 * @text Enemy List Line Height
 * @parent ---EnemyList---
 * @type number
 * @desc The height of the enemy list line.
 * @default 32
 *
 * @param EnemyListWidth
 * @text Enemy List Width
 * @parent ---EnemyList---
 * @type number
 * @desc The width of the enemy list.
 * @default 240
 *
 * 
 * 
 * @param HateGaugeColor1
 * @text Hate Gauge Color 1
 * @parent ---EnemyList---
 * @type number
 * @desc This is the first color of the hate gauge.
 * @default 2
 * 
 * @param HateGaugeColor2
 * @text Hate Gauge Color 2
 * @parent ---EnemyList---
 * @type number
 * @desc This is the second color of the hate gauge.
 * @default 10
 *
 * 
 * 
 * @param ---HateGauge---
 * @text Hate Gauge
 * 
 * @param ShowHateGauge
 * @text Hate Gauge Display
 * @parent ---HateGauge---
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do you want to show the party list?
 * @default false
 * 
 * @param HateGaugeWidth
 * @text Hate Gauge Width
 * @parent ---HateGauge---
 * @type number
 * @desc The width of the hate gauge.
 * @default 180
 * 
 * @param HateGaugeX
 * @text X position of the hate gauge
 * @parent ---HateGauge---
 * @type text
 * @desc The location of the X coordinate for each member of the hate gauge.
 * index:No. of members, length: No. of members
 * @default Graphics.boxWidth /6 * (index +1)
 * 
 * @param HateGaugeY
 * @text Y position of the hate gauge
 * @parent ---HateGauge---
 * @type text
 * @desc The location of the Y coordinate for each member of the hate gauge.
 * index:No. of members, length: No. of members
 * @default  320
 * 
 * @param ShowEnemyNameOnHateGauge
 * @text Enemy Name Display (Hate Gauge)
 * @parent ---HateGauge---
 * @type boolean
 * @on Yes
 * @off No
 * @desc Do you want to display the name of the enemy character on the hate gauge?
 * @default  true
 * 
 * @help
 * ============================================================================
 * What kind of plug-in?
 * ============================================================================
 * 
 * The enemy will have hate against the actor and will target the actor with the most hate.
 * Hate changes with actions in battle.
 * 
 * ============================================================================
 * Plug-in Commands
 * ============================================================================
 *  - v1.10
 * ShowHateLine
 *   Displays hate lines.
 * HideHateLine
 *   Hide hate lines.
 *  - v1.13
 * ShowEnemyHateList
 *   Displays the enemy list.
 * HideEnemyHateList
 *   Hide the enemy list.
 * ShowHateGauge
 *   Displays the hate gauge.
 * HideHateGauge
 *   Hide the hate gauge.
 * 
 * ============================================================================
 * Hate that automatically accumulates
 * ============================================================================
 * 
 * When an actor uses a skill or item that targets an enemy, 
 * hate from the target to the user increases.
 * Actions that increase hate for the enemy:
 *   HP/MP damage, debuffing, buff removal, stat addition
 * 
 * When an actor uses a skill or item that targets an ally,
 * it increases the amount of hate on the user from enemies targeting that ally.
 * Actions that increase hate for allies:
 *   HP recovery, state addition, state removal, buff addition
 * 
 * A plugin parameter allows you to set the formula for how much the hate will increase.
 * The formula allows the following,
 * ----------------------------------------------------------------------------
 * HP Damage （Only if the target is an enemy）      ： damage
 * MP Damage  （Only if the target is an enemy）     ： MPDamage
 * Recovery Points（Only if the target is an ally）： healPoint
 * Skill Users                         ： a, user
 * Skill Targets                       : b, target
 * Enemies with increasing hate        ： enemy
 * Variables                            ： v
 * ----------------------------------------------------------------------------
 * to be used.
 * 
 * Skill user, target, enemy, and variables can be treated in the same way
 * as the skill's damage formula.
 * Example１：User's maximum HP
 *         user.mhp
 * Example２：12th variable
 *         v[12]
 * 
 * HP and MP absorption attacks double the hate that increases with damage.
 * 
 * ============================================================================
 * Changes in the nature of the "target rate"
 * ============================================================================
 * 
 * The "Special Ability Value Target Rate" becomes the ease of increasing hate and is multiplied by
 * the increasing hate. This allows you to create equipment and states that are more likely
 * to increase hate on you.
 * 
 * ============================================================================
 * Hate Line
 * ============================================================================
 * 
 * In the side view, the plugin parameter DisplayHateLine can be set to 1
 * to display the hate line. To display, put "hateline.png" in the img/system folder.
 * This image is displayed & stretched vertically.
 * 
 * ============================================================================
 * Hate Increase Formula per State
 * ============================================================================
 * 
 * ステートのメモ：
 *   <HATE_formula: 式>
 *     このタグで味方や敵にステートを付加したとき、解除したときのヘイト増加式を
 *     設定できます。
 * 
 *     例えば、デフォルトでは防御しただけで、自分を狙う敵からプラグインパラメー
 *     タで設定した分だけヘイトされますが、防御のステートのメモに
 *     <HATE_formula:0>
 *     と記述するとヘイトが増加しないようにできます。
 * 
 *   <HATE_remove_formula: 式>
 *     このタグで味方からこのステートを解除したときのヘイト増加式を設定できます。
 *     付加したときと解除したときでヘイト増加式を変えたいときに使ってください。
 * 
 *   <HATE_property: 性質>
 *     デフォルトでは、敵にいいステートをかけたときや、味方に悪いステートをかけ
 *     た時もヘイトが増加しますが、このタグでステートの性質を設定するとスキルの
 *     対象によって増加させないこともできるようになります。
 * 
 *     ========================================================================
 *     性質の部分に置き換えられるもの：
 *     ------------------------------------------------------------------------
 *     good    : 味方にこのステートを付加したときだけヘイトが増加します。
 *     neutral : ヘイトは増加しません。
 *     bad     : 敵にこのステートを付加したときと、
 *               味方のこのステートを解除したときだけヘイトが増加します。
 *     ========================================================================
 * 
 * ============================================================================
 * ヘイトをコントロールするスキル、アイテム
 * ============================================================================
 * 
 * ヘイトを増減するスキルやアイテムを作ることができます。
 * 
 * スキル、アイテムのメモ：
 *   <HATE_control: 誰が, 誰を, 式>
 *     ========================================================================
 *    「誰が」の部分に設定できる文字列:
 *     ------------------------------------------------------------------------
 *     user          : スキルの使用者が敵の場合、使用者がヘイトします。
 *     target        : スキルの対象が敵の場合、対象がヘイトします。
 *     whoHateUser   : スキルの使用者がアクターの場合、使用者を狙う敵がヘイトし
 *                     ます。
 *     whoHateTarget : スキルの対象がアクターの場合、そのアクターを狙う敵がヘイ
 *                     トします。
 *     all           : 敵全員がヘイトします。
 *                     範囲が敵全員のスキルには上記targetを指定してください。
 *                     ヘイト計算はスキルの効果が発動するたびに行われるためです。
 *     exceptUser    : スキルの使用者が敵の場合、使用者以外がヘイトします。
 *     exceptTarget  : スキルの対象が敵の場合、対象以外がヘイトします。
 *     ========================================================================
 * 
 *     ========================================================================
 *    「誰を」の部分に設定できる文字列
 *     ------------------------------------------------------------------------
 *     user          : スキルの使用者がアクターの場合、使用者がヘイトされます。
 *     target        : スキルの対象がアクターの場合、対象がヘイトされます。
 *     exceptUser    : スキルの使用者がアクターの場合、使用者以外がヘイトされま
 *                     す。
 *     targetsTarget : スキルの対象が敵の場合、その敵が狙っているアクターがヘイ
 *                     トされます。
 *     ========================================================================
 * 
 *     計算式では、上記のプラグインパラメータで使えるもののほかに
 *     ------------------------------------------------------------------------
 *     ヘイトされるアクター ： actor
 *     ------------------------------------------------------------------------
 *     を使えます。
 *     計算の結果負の数になるとヘイトが減少します。
 *     このタグは同じスキルに複数設定できます。
 *     1回目のタグで敵が狙うアクターが変わると2回目のwhoHateUser, whoHateTarget
 *     の結果が変わるので、注意が必要です。
 * 
 * --- 例 ---
 * 「挑発」
 * 範囲が敵単体のスキルで、対象から自分へのヘイトを敵の攻撃力 × 12 増加させる
 * <HATE_control:target, user, enemy.atk * 12>
 * 
 * 「隠れる」
 * 範囲が使用者のスキルで、敵全員の自分へのヘイトを自分の敏捷性 × 4 減少させる
 * <HATE_control:all, user, actor.agi * -4>
 * 
 * 「かばう」
 * 範囲が味方単体のスキルで、
 * 味方を狙う敵から使用者へのヘイトを使用者の最大HPの半分増加させ、
 * 敵全員から味方へのヘイトを使用者の最大HPの4分の1減少させる
 * <HATE_control:whoHateTarget, user, user.mhp / 2>
 * <HATE_control:all, target, -user.mhp / 4>
 * 
 * 「集中攻撃の号令」（敵専用）
 * 範囲が敵単体のスキルで、敵全員の対象へのヘイトを50増加させる
 * <HATE_control: all, target, 50>
 * 
 * 「注目の笛」（アイテム）
 * 範囲が味方単体のアイテムで、敵全員の味方へのヘイトを使用者の魔法攻撃力 × 8
 * 増加させる
 * <HATE_control: all, target, user.mat * 8>
 * 
 * ============================================================================
 * ヘイトが溜まらないスキル、アイテム
 * ============================================================================
 * 
 * スキル、アイテムのメモ：
 *   <HATE_no>
 *     このタグをつけるとダメージなどでヘイトが増加しないスキルが作れます。
 *     前述のヘイトを増減させるタグは無効化しません。
 * 
 * ============================================================================
 * ヘイトが溜まらなくなるエネミーのステート - v1.03
 * ============================================================================
 * 
 * 例えば、「睡眠」など、状況が把握できなくなるステートにかかったとき、状況が
 * 把握できないはずなのにヘイトが溜まってしまうのはおかしく感じられます。
 * 
 * ステートのメモ：
 *   <HATE_cantHate>
 *     このタグをつけると、このステートにかかったエネミーのヘイトが変動しなく
 *     なります。
 * 
 * ============================================================================
 * ヘイトの確認方法
 * ============================================================================
 * 
 * プラグインパラメータ DebugMode を ON にするとどれだけヘイトが増加したか、
 * F8キーで起動する Developer Tools の Console に出力されます。
 * 
 * また、 DebugMode を ON にするとプラグインパラメータのヘイト増加式にエラーが
 * あった場合も Console に出力されます。
 * 
 * 増加したヘイトはこれで確認できますが、溜まっているヘイトを確認するには
 * 少し難しい操作が必要です。
 * 
 * 溜まっているヘイトはGame_Enemyの_hatesという配列に入っていて、添え字は
 * アクターのIDになっています。
 * 
 * 現在溜まっているヘイトを確認するには
 * Developer Toolsの Sources タブを開き、右上の Watch Expressions の＋を押して
 * $gameTroopと打ちます。
 * $gameTroopの左の右向き三角を押すと中身が見れるので、_enemiesを探します。
 * （たぶん1番上にあると思います）
 * _enemiesの中身を開くと敵の数だけ番号がありますがこれがエネミーのオブジェクト
 * です。これを開き_hatesを探し、開いてみてください。左の紫色の数字が、アクター
 * のIDで、右の青の文字が現在溜まっているヘイトです。
 * 
 * ============================================================================
 * 攻撃者以外へのヘイト減少 - v1.06
 * ============================================================================
 * 
 * 長期戦になると、ヘイトの差が開き、追いつけないものになってしまうことがありま
 * す。そこで、アクターがヘイトを稼いだとき、他のアクターへのヘイトが減少する
 * 機能を追加しました。以下のプラグインパラメータで設定ができます。
 * 
 * ReduceOthersHate
 *   この機能を使うかどうかを設定します。デフォルトではOFFになっています。
 * 
 * OthersHateRateFormula
 *   この式の計算結果が現在のヘイトに掛けられます。
 *   計算式では、
 *   --------------------------------------------------------------------------
 *   増加したヘイト           ： point
 *   敵キャラ                 ： enemy
 *   ヘイトが減少するアクター ： actor
 *   --------------------------------------------------------------------------
 *   を使えます。
 * 
 * ---例---
 * デフォルトの場合
 * (100 - (point / enemy.atk)) / 100
 * 
 * 攻撃者が敵キャラの攻撃力の4倍のヘイトを稼いだとき、
 * (100 - 4) / 100 = 0.96
 * 攻撃者以外へのヘイトの現在値が0.96倍になる。
 * 
 * 攻撃者が敵キャラの攻撃力の15倍のヘイトを稼いだとき、
 * (100 - 15) / 100 = 0.85
 * 攻撃者以外へのヘイトの現在値が0.85倍になる。
 * 
 * DebugMode を ON にしていれば、攻撃者以外のヘイトの現在値が表示されます。
 * 
 * ============================================================================
 * ヘイト2番目以下のキャラへの攻撃 - v1.09
 * ============================================================================
 * 
 * スキルのメモ欄：
 *   <HATE_target: x>
 *     ヘイトがx番目のキャラクターに攻撃します。
 *   例：
 *   <HATE_target: 3>
 *     ヘイトが3番目に高いキャラクターに攻撃します。2人しかいなかった場合2番目
 *     のキャラクターが攻撃されます。
 * 
 * 
 * ============================================================================
 * 敵リスト、パーティリスト - v1.13
 * ============================================================================
 * 
 * ○敵リスト
 *   選択中のアクターに対する敵全員のヘイトを見られるウィンドウ。
 * 
 * ◆表示されるもの
 * ・選択中アクターの名前
 * ・敵全員の
 *   ・名前
 *   ・選択中アクターのヘイト順位（ヘイトアイコン）
 *   ・選択中アクターのゲージ
 * 
 * ○ヘイトゲージ
 *   選択中、行動中の敵キャラのアクター全員へのヘイトを見られるウィンドウ。
 * 
 * ◆表示されるもの
 * ・選択中敵キャラの名前
 * ・アクター全員の
 *   ・名前
 *   ・そのアクターのヘイト順位（ヘイトアイコン）
 *   ・そのアクターのゲージ
 * 
 * プラグインパラメータで各種設定ができます。
 * プラグインコマンドでONとOFFの切り替えができます。
 * （上記プラグインコマンド参照）
 * 
 * ============================================================================
 * YEP_BattleAICore.jsの機能拡張
 * ============================================================================
 * 
 * YEP_BattleAICore.jsはYanfly氏が作成した、敵に賢い行動パターンを設定できるプラ
 * グインです。AB_EnemyHate.jsはヘイト関係の機能を追加しました。
 * この機能を利用するにはプラグインマネージャでYEP_BattleAICore.jsの下に
 * AB_EnemyHate.jsを置いてください。
 * 
 * 追加したCondition:
 * HATE ELEMENT X case
 * HATE stat PARAM eval
 * HATE STATE === state name
 * HATE STATE !== state name
 * 
 * もともとYEP_BattleAICore.jsにあったものの先頭に"HATE "を足しただけです。
 * 先頭に"HATE "をつけると最もヘイトの高いアクターの状態を見るようになります。
 * これらのConditionはターゲットを絞り込みません。
 * 
 * 追加したTargeting:
 * HATE
 * 
 * Conditionで絞り込まれたアクターの中で最もヘイトが高いアクターを狙います。
 * 
 * --- 例 ---
 * 最もヘイトの高いアクターがPoison状態ならそのアクターにAttackをし、
 * そうでなければそのアクターにPoisonをする
 * <AI Priority>
 * HATE State === Poison: Attack, HATE
 * Always: Poison, HATE
 * </AI Priority>
 * 
 * 最もヘイトの高いアクターがHP70%以下ならDual Attackをし、
 * そうでなければそのアクターにAttackをする
 * <AI Priority>
 * HATE HP% param <= 70%: Dual Attack, HATE
 * Always: Attack, HATE
 * </AI Priority>
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.18
 *   敵リストを表示しておらず、ヘイトがマイナスになったとき、エラーが出て止まっ
 *   てしまうバグを修正しました。
 * 
 * Version 1.17
 *   ヘイトゲージと敵リストを戦闘中にON、OFFにできるように修正しました。
 *   敗北時、逃走時もヘイトゲージを非表示にするように変更しました。
 * 
 * Version 1.16
 *   ツクールMZに対応
 * 
 * Version 1.15
 *   攻撃時、エラーが出てゲームが停止してしまう不具合を修正しました。
 * 
 * Version 1.14
 * ヘイトラインをONにしてもヘイトラインが表示されない不具合を修正しました。
 * 戦闘中に敵キャラを攻撃対象にした時に対象にした敵のヘイトゲージが表示されるよ
 * うにしました。
 * 戦闘終了時、ヘイトゲージが非表示になるようにしました。
 * ヘイトゲージの敵キャラ名を非表示にできるようにしました。
 * 敵キャラクターを選択した時以外非表示にしました。
 * 
 * Version 1.13
 *   パーティリストと敵リストを作りました。
 *   
 * 
 * Version 1.12
 *   ヘイトがマイナスの値のとき、ゲームが止まってしまうことがあるバグを修正しま
 *   した。
 * 
 * Version 1.11
 *   フロントビューでYEP_BattleStatusWindowを使っているとき、ステータス画面に向
 *   けてラインを伸ばすようにしました。
 * 
 * Version 1.10
 *   ヘイトラインを表示・非表示するプラグインコマンドを実装しました。
 * 
 * Version 1.09
 *   ヘイトがX番目に高いアクターを狙うスキルのタグ<HATE_target: x>を追加しまし
 *   た。
 * 
 * Version 1.08
 *   ヘイト値が同じとき、先頭に近いアクターが狙われるようにしました。
 *   ヘイトコントロールの「誰が」に「exceptUser」「exceptTarget」、
 *   「誰を」に「exceptUser」「targetsTarget」を追加しました。
 * 
 * Version 1.07
 *   ヘイトラインの表示がおかしくなることがあったので修正しました。
 *   フロントビューでもDisplayHatelineがONになっていればヘイトラインを表示する
 *   ようにしました。
 * 
 * Version 1.06
 *   攻撃者以外へのヘイト減少機能を追加しました。
 *   エラー表示を見やすくしました。
 * 
 * Version 1.05
 *   RPGツクールMVのバージョン 1.1.0 で追加された「未使用ファイルを含まない」
 *   でデプロイメントしたとき、hateline.png が含まれるように変更しました。
 * 
 * Version 1.04
 *   復活したエネミーのヘイトラインも表示されるように変更しました。
 * 
 * Version 1.03
 *   ステートのメモタグ<HATE_cantHate>を追加しました。
 * 
 * Version 1.02
 *   YEP_BattleEnginCore.js と一緒に動作させたときヘイトラインがチカチカする
 *   問題を修正
 * 
 * Version 1.01
 *   パーティにいないメンバーを後から加えた時にうまく動作しないバグを修正
 *   ※この修正後も、パーティにいないメンバーを加えるときはあらかじめそのメンバ
 *     ーを全回復するなどして$gameActorsに登録する必要があります。
 * 
 * Version 1.00
 *   公開
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・クレジット表記は不要
 * ・営利目的で使用可
 * ・改変可
 *     ただし、ソースコードのヘッダのライセンス表示は残してください。
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * 
 * 
 * @command ShowHateLine
 * @text ヘイトラインを表示
 * @desc 戦闘中、ヘイトラインを表示します。
 * 
 * @command HideHateLine
 * @text ヘイトラインを非表示
 * @desc 戦闘中、ヘイトラインを非表示にします。
 * 
 * @command ShowEnemyHateList
 * @text 敵リスト表示
 * @desc 戦闘中、選択中のアクターがどの敵から狙われているかを表示します。
 * 
 * @command HideEnemyHateList
 * @text 敵リスト非表示
 * @desc 戦闘中、選択中のアクターがどの敵から狙われているかを非表示にします。
 * 
 * @command ShowHateGauge
 * @text ヘイトゲージ表示
 * @desc 戦闘中、選択中の敵キャラがどのアクターをどれだけヘイトしているかを表示します。
 * 
 * @command HideHateGauge
 * @text ヘイトゲージ非表示
 * @desc 戦闘中、選択中の敵キャラがどのアクターをどれだけヘイトしているかを非表示にします。
 * 
 */

(function() {
	'use strict';
	const pluginName = "ABMZ_EnemyHate";
	var parameters = PluginManager.parameters('ABMZ_EnemyHate');
	var displayHateLine = eval(parameters['DisplayHateLine']);
	var HateDebugMode = eval(parameters['DebugMode']);
	var DamageHateFormula = (parameters['DamageHateFormula'] || 0);
	var MPDamageHateFormula = (parameters['MPDamageHateFormula'] || 0);
	var HealHateFormula = (parameters['HealHateFormula'] || 0);
	var BuffHateFormula = (parameters['BuffHateFormula'] || 0);
	var DebuffHateFormula = (parameters['DebuffHateFormula'] || 0);
	var StateToEnemyHateFormula = (parameters['StateToEnemyHateFormula'] || 0);
	var StateToActorHateFormula = (parameters['StateToActorHateFormula'] || 0);
	var RemoveStateHateFormula = (parameters['RemoveStateHateFormula'] || 0);
	var ReduceOthersHate = eval(parameters['ReduceOthersHate'] == 1);
	var OthersHateRateFormula = (parameters['OthersHateRateFormula'] || 0);
	var ShowEnemyList = eval(parameters['ShowEnemyList']);
	var EnemyListX = Number(parameters['EnemyListX']);
	var EnemyListY = Number(parameters['EnemyListY']);
	var HateIconList =parameters['HateIconList'].split(' ');
	var EnemyListFontSize = Number(parameters['EnemyListFontSize']);
	var EnemyListLineHeight = Number(parameters['EnemyListLineHeight']);
	var EnemyListWidth = Number(parameters['EnemyListWidth']);
	var HateGaugeColor1 = Number(parameters['HateGaugeColor1']);
	var HateGaugeColor2 = Number(parameters['HateGaugeColor2']);
	var ShowHateGauge = eval(parameters['ShowHateGauge']);
	var HateGaugeWidth = Number(parameters['HateGaugeWidth']);
	var HateGaugeX = String(parameters['HateGaugeX']);
	var HateGaugeY = String(parameters['HateGaugeY']);
	var ShowEnemyNameOnHateGauge = eval(parameters['ShowEnemyNameOnHateGauge']);

//=============================================================================
// Game_Interpreter
//=============================================================================

//	const pluginName = "ABMZ_EnemyHate";

	PluginManager.registerCommand(pluginName, "ShowHateLine", args => {
			$gameSystem.setDispHateLine(true);
	});

	PluginManager.registerCommand(pluginName, "HideHateLine", args => {
			$gameSystem.setDispHateLine(false);
	});

	PluginManager.registerCommand(pluginName, "ShowEnemyHateList", args => {
			$gameSystem.setDispEnemyHateList(true);
			if ($gameParty.inBattle()) {
				
		    SceneManager._scene._ABEnemyListWindow.show();
			}
	});

	PluginManager.registerCommand(pluginName, "HideEnemyHateList", args => {
			$gameSystem.setDispEnemyHateList(false);
			if ($gameParty.inBattle()) {
		    SceneManager._scene._ABEnemyListWindow.hide();
			}
	});

	PluginManager.registerCommand(pluginName, "ShowHateGauge", args => {
			$gameSystem.setDispHateGauge(true);
	});

	PluginManager.registerCommand(pluginName, "HideHateGauge", args => {
			$gameSystem.setDispHateGauge(false);
			if ($gameParty.inBattle()) {
				SceneManager._scene.hideHateWindow();
			}
	});


	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'ShowHateLine') {
			$gameSystem.setDispHateLine(true);
		} else if (command === 'HideHateLine') {
			$gameSystem.setDispHateLine(false);
		} else if (command === 'ShowEnemyHateList') {
			$gameSystem.setDispEnemyHateList(true);
			if ($gameParty.inBattle()) {
		    SceneManager._scene._ABEnemyListWindow.show();
			}
		} else if (command === 'HideEnemyHateList') {
			$gameSystem.setDispEnemyHateList(false);
			if ($gameParty.inBattle()) {
		    SceneManager._scene._ABEnemyListWindow.hide();
			}
		} else if (command === 'ShowHateGauge') {
			$gameSystem.setDispHateGauge(true);
		} else if (command === 'HideHateGauge') {
			$gameSystem.setDispHateGauge(false);
			if ($gameParty.inBattle()) {
				SceneManager._scene.hideHateWindow();
			}
		}
	};

// v1.10
//=============================================================================
// Game_System
//=============================================================================

	Game_System.prototype.initDispHateLine = function() {
		this._dispHateLine = displayHateLine;
	};

	Game_System.prototype.setDispHateLine = function(value) {
		this._dispHateLine = value;
	};

	Game_System.prototype.isDispHateLine = function() {
		if (this._dispHateLine === undefined) this.initDispHateLine();
		return this._dispHateLine;
	};



	Game_System.prototype.initDispEnemyHateList = function() {
		this._dispEnemyHateList = ShowEnemyList;
	};

	Game_System.prototype.setDispEnemyHateList = function(value) {
		this._dispEnemyHateList = value;
	};

	Game_System.prototype.isDispEnemyHateList = function() {
		if (this._dispEnemyHateList === undefined) this.initDispEnemyHateList();
		return this._dispEnemyHateList;
	};



	Game_System.prototype.initDispHateGauge = function() {
		this._dispHateGauge = ShowHateGauge;
	};

	Game_System.prototype.setDispHateGauge = function(value) {
		this._dispHateGauge = value;
	};

	Game_System.prototype.isDispHateGauge = function() {
		if (this._dispHateGauge === undefined) this.initDispHateGauge();
		return this._dispHateGauge;
	};


//=============================================================================
// Game_Enemy
//=============================================================================
	var Game_Enemy_prototype_setup = Game_Enemy.prototype.setup;
	Game_Enemy.prototype.setup = function(enemyId, x, y) {
		Game_Enemy_prototype_setup.call(this, enemyId, x, y);
		this._hates = [];
		var allActors = $gameActors._data;
		var enemy = this;
		allActors.forEach(function(actor) {
			if (!actor) return;
			enemy._hates[actor.actorId()] = Math.randomInt(10);
		});
	};

	Game_Enemy.prototype.hates = function() {
		return this._hates;
	};

	Game_Enemy.prototype.hate = function(index, point) {
		this._hates[index] += point;
		if (this._hates[index] < 0) this._hates[index] = 0;
		if (HateDebugMode) {
			console.log(this.name() + "の" + $gameActors.actor(index).name() + "へのヘイトが" + point + "ポイント増加");
		}
		if (point > 0) this.reduceOthersHates(index, point);
	};

	Game_Enemy.prototype.reduceOthersHates = function(index, point) {
		if (!ReduceOthersHate) return;
		var enemy = this;
		var actors = $gameParty.battleMembers();
		actors.forEach(function(actor) {
			if (actor.actorId() == index) return;
			var rate = 1;
			try {
				rate = eval(OthersHateRateFormula);
				if (isNaN(rate)) {
					throw new Error("「" + OthersHateRateFormula + "」の計算結果は数値ではありません。");
				}
			} catch (e) {
				if (HateDebugMode) {
					console.log(e.toString());
				}
				rate = 1;
			}
			enemy.multiplyHate(actor.actorId(), rate);
		});
	};

	Game_Enemy.prototype.hateOrder = function(actorId) {
		var hatesArray = [];
		
		if (typeof this._hates === "undefined") {
			return false;
		}
		var hates = this._hates;
		var max = -99999999999999999999;
	
		$gameParty.aliveMembers().forEach(function(member) {
			if (!member.isBattleMember()) return;
			var i = member.actorId();
			
			var hateObj = {};
			hateObj.i = i;
			hateObj.hate = hates[i];
			hatesArray.push(hateObj);
		});

		// 降順ソート
		hatesArray.sort(function(a,b){
			if (a.hate > b.hate) return -1;
			if (a.hate < b.hate) return 1;
			return 0;
		});
		var hateOrder = null;
		hatesArray.forEach(function(hateObj, i) {
			if (hateObj.i == actorId) {
				hateOrder = i;
				return;
			}
		});
		return hateOrder;
		
	};

	Game_Enemy.prototype.multiplyHate = function(index, rate) {
		if (rate < 0) return;
		var hate = this._hates[index] * rate;
		hate = Math.round(hate);
		this._hates[index] = hate;
		if (HateDebugMode) {
			console.log(this.name() + "の" + $gameActors.actor(index).name() + "へのヘイトが" + hate + "になった");
		}
	};

	Game_Enemy.prototype.hateTarget = function() {
		return $gameParty.hateTarget(this._hates);
	}

	Game_Enemy.prototype.hateTargetNumber = function(no) {
		return $gameParty.hateTargetNumber(this._hates, no);
	}

	Game_Enemy.prototype.hateTargetOf = function(group) {
		if (typeof this._hates === "undefined") {
			return false;
		}
		var hates = this._hates;
		var max = -99999999999999999999;
		var mainTarget;
		group.forEach(function(member) {
			if (!member.isActor()) return false;
			if (!member.isBattleMember()) return false;
			var i = member.actorId();
			if (max < hates[i]) {
				max = hates[i];
				mainTarget = member;
			}
		});
		return mainTarget;
	}

	Game_Enemy.prototype.canHate = function() {
		return !this._states.some(function(stateId){
			var state = $dataStates[stateId];
			if (!state) return false;
			if (state.meta.HATE_cantHate) return true;
			return false;
		});
	};

//=============================================================================
// Game_Party
//=============================================================================
	
	Game_Party.prototype.hateTarget = function(hates) {
		// 
		var max = -1;
		var mainTarget;
		this.aliveMembers().forEach(function(member) {
			if (!member.isBattleMember()) return;
			var i = member.actorId();
			if (max < hates[i]) {
				max = hates[i];
				mainTarget = member;
			}
		});
		return mainTarget;
	};
	Game_Party.prototype.hateTargetNumber = function(hates, no) {
		var hatesArray = [];
		var targetIndex = 0;

		var mainTarget;
		this.aliveMembers().forEach(function(member) {
			if (!member.isBattleMember()) return;
			var i = member.actorId();
			
			var hateObj = {};
			hateObj.i = i;
			hateObj.hate = hates[i];
			hatesArray.push(hateObj);
		});

		// 降順ソート
		hatesArray.sort(function(a,b){
			if (a.hate > b.hate) return -1;
			if (a.hate < b.hate) return 1;
			return 0;
		});
		
		// hatesArrayの(no-1)番目のiを選択。
		// (no-1)番目がない場合最後のインデックスを選択。
		if ((no-1) < hatesArray.length) {
			targetIndex = hatesArray[no - 1].i;
		} else {
			targetIndex = hatesArray[hatesArray.length - 1].i;
		}
		mainTarget = $gameActors.actor(targetIndex);
		return mainTarget;
		
	};
	var _Game_Party_prototype_refresh = Game_Party.prototype.refresh;
	Game_Party.prototype.refresh = function() {
		// 
		_Game_Party_prototype_refresh.call(this);
		if (this.inBattle()) {
			SceneManager._scene.initHateGaugeWindows();
		}
	};
	var _Game_Party_prototype_addActor = Game_Party.prototype.addActor;
	Game_Party.prototype.addActor = function(actorId) {
		_Game_Party_prototype_addActor.call(this, actorId);
		if (this.inBattle()) {
			SceneManager._scene.initHateGaugeWindows();
		}
	};
	var _Game_Party_prototype_removeActor = Game_Party.prototype.removeActor;
	Game_Party.prototype.removeActor = function(actorId) {
		_Game_Party_prototype_removeActor.call(this, actorId);
		
		if (this.inBattle()) {
			SceneManager._scene.initHateGaugeWindows();
		}
	};
//=============================================================================
// Game_Actor
//=============================================================================

	Game_Actor.prototype.whoHateMe = function() {
		var who = [];
		var enemies = $gameTroop.aliveMembers();
		for (var i=0,l=enemies.length; i < l; i++) {
			if (enemies[i].hateTarget() == this) {
				who.push(enemies[i]);
			}
		}
		return who;
	}
	
//=============================================================================
// Sprite_Battler
//=============================================================================

var _Sprite_Battler_prototype_updatePosition = Sprite_Battler.prototype.updatePosition;

Sprite_Actor.prototype.updatePosition = function() {
	if ($gameSystem.isSideView()) {
		_Sprite_Battler_prototype_updatePosition.call(this);
		return;
	}
	if (SceneManager._scene._statusWindow) {
		var statusWindow = SceneManager._scene._statusWindow;
		this.x = this._homeX - SceneManager._scene._partyCommandWindow.width + 80 + statusWindow.x;
		this.y = this._homeY;
	}
};

//=============================================================================
// Game_Action
//=====
	// 上書き
	Game_Action.prototype.targetsForOpponents = function() {
		var targets = [];
		var unit = this.opponentsUnit();
		if (this.isForRandom()) {
			for (var i = 0; i < this.numTargets(); i++) {
				targets.push(unit.randomTarget());
			}
		} else if (this.isForOne()) {
			if (this._targetIndex < 0) {
				// 使用者がアクターだった場合
				if (this._subjectActorId > 0) {
					targets.push(unit.randomTarget());

				// 使用者が敵キャラだった場合
				} else {
					// v1.09
					if (this._item.object().meta.HATE_target) {
						var no = Number(this._item.object().meta.HATE_target);
						targets.push(unit.hateTargetNumber(this.subject().hates(), no));
					} else {
						targets.push(unit.hateTarget(this.subject().hates()));
					}
				}
			} else {
				targets.push(unit.smoothTarget(this._targetIndex));
			}
		} else {
			targets = unit.aliveMembers();
		}
		return targets;
	};

	Game_Action.prototype.confusionTarget = function() {
		switch (this.subject().confusionLevel()) {
		case 1:
			if (this._subjectActorId > 0)
				return this.opponentsUnit().randomTarget();
			return this.opponentsUnit().hateTarget(this.subject().hates());
		case 2:
			if (Math.randomInt(2) === 0) {
			return this.opponentsUnit().randomTarget();
			}
			return this.friendsUnit().randomTarget();
		default:
			return this.friendsUnit().randomTarget();
		}
	};

	var Game_Action_prototype_apply = Game_Action.prototype.apply;
	Game_Action.prototype.apply = function(target) {
		Game_Action_prototype_apply.call(this, target);
		this.varyHate(target);
	};

	Game_Action.prototype.varyHate = function(target) {
		if (this._subjectActorId > 0) {
			if (target.isActor()) {
				if (!this._item.object().meta.HATE_no) {
					this.actorToActorVaryHate(target);
				}
			} else {
				if (!this._item.object().meta.HATE_no) {
					this.actorToEnemyVaryHate(target);
				}
			}
		}
		this.controlHate(target);
	};

	Game_Action.prototype.actorToEnemyVaryHate = function(target) {
		var result = target.result();
		var user = this.subject();
		var a = user;
		var b = target;
		var enemy = target;
		var v = $gameVariables._data;
		var hate = 0;

		var damage = Math.max(result.hpDamage, 0);
		var MPDamage = Math.max(result.mpDamage, 0);

		if (!enemy.canHate()) return;

		if (damage) {
			var add = 0;
			try {
				add = eval(DamageHateFormula);

				if (isNaN(add)) {
					throw new Error("「" + DamageHateFormula + "」の計算結果は数値ではありません。");
				}
			} catch (e) {
				if (HateDebugMode) {
					console.log(e.toString());
				}
				add = 0;
			}
			hate += add;
		}

		if (MPDamage) {
			var add = 0;
			try {
				add = eval(MPDamageHateFormula);
				if (isNaN(add)) {
					throw new Error("「" + MPDamageHateFormula + "」の計算結果は数値ではありません。");
				}
			} catch (e) {
				if (HateDebugMode) {
					console.log(e.toString());
				}
				add = 0;
			}
			hate += add;
		}

		if (result.drain) hate = Math.floor(hate * 2);

		var addedStateObjects = result.addedStateObjects();
		addedStateObjects.forEach(function(state) {
			var property = state.meta.HATE_property;
			if (property && (property.match(/good/) || property.match(/neutral/))) return;
			var HATE_formula = state.meta.HATE_formula;
			var add = 0;
			if (HATE_formula) {
				try {
					add = eval(HATE_formula);
					if (isNaN(add)) {
					throw new Error("「" + HATE_formula + "」の計算結果は数値ではありません。");
					}
				} catch (e) {
					if (HateDebugMode) {
						console.log(e.toString());
					}
					add = 0;
				}
			} else {
				try {
					add = eval(StateToEnemyHateFormula);
					if (isNaN(add)) {
					throw new Error("「" + StateToEnemyHateFormula + "」の計算結果は数値ではありません。");
					}
				} catch (e) {
					if (HateDebugMode) {
						console.log(e.toString());
					}
					add = 0;
				}
			}
			hate += add;
		});

		if (result.addedDebuffs.length + result.removedBuffs.length > 0) {
			var add = 0;
			try {
				add = eval(DebuffHateFormula);
				if (isNaN(add)) {
					throw new Error("「" + DebuffHateFormula + "」の計算結果は数値ではありません。");
				}
			} catch (e) {
				if (HateDebugMode) {
					console.log(e.toString());
					add = 0;
				}
			}
			add = (result.addedDebuffs.length + result.removedBuffs.length) * add;
			hate += add;
		}

		hate = Math.ceil(hate * user.tgr);

		target.hate(user.actorId(), hate);
		/*if (HateDebugMode) {
			console.log(target.name() + "の" + user.name() + "へのヘイトが" + hate + "ポイント増加");
		}*/
	
	};



	Game_Action.prototype.actorToActorVaryHate = function(target) {
		var result = target.result();
		var user = this.subject();
		var a = user;
		var b = target;
		var enemies = target.whoHateMe();
		var v = $gameVariables._data;

		var healPoint = Math.max(-result.hpDamage, 0);

		for (var i=0, l=enemies.length; i<l; i++) {
			var hate = 0;
			var enemy = enemies[i];
	
			if (!enemy.canHate()) continue;

			if (healPoint) {
				var add = 0;
				try {
					add = eval(HealHateFormula);
					if (isNaN(add)) {
						throw new Error("「" + HealHateFormula + "」の計算結果は数値ではありません。");
					}
				} catch (e) {
					if (HateDebugMode) {
						console.log(e.toString());
					}
					add = 0;
				}
				hate += add;
			}

			var addedStateObjects = result.addedStateObjects();
			addedStateObjects.forEach(function(state) {
				var property = state.meta.HATE_property;
				if (property && (property.match(/bad/) || property.match(/neutral/))) return;
				var HATE_formula = state.meta.HATE_formula;
				var add = 0;
				if (HATE_formula) {
					try {
						add = eval(HATE_formula);
						if (isNaN(add)) {
							throw new Error("「" + HATE_formula + "」の計算結果は数値ではありません。");
						}
					} catch (e) {
						if (HateDebugMode) {
							console.log(e.toString());
						}
						add = 0;
					}
				} else {
					try {
						add = eval(StateToActorHateFormula);
						if (isNaN(add)) {
							throw new Error("「" + StateToActorHateFormula + "」の計算結果は数値ではありません。");
						}
					} catch (e) {
						if (HateDebugMode) {
							console.log(e.toString());
						}
						add = 0;
					}
				}
				hate += add;
			});

			var removedStateObjects = result.removedStateObjects();
			removedStateObjects.forEach(function(state) {
				var property = state.meta.HATE_property;
				if (property && (property.match(/good/) || property.match(/neutral/))) return;
				var HATE_formula = state.meta.HATE_formula;
				var HATE_remove_formula = state.meta.HATE_remove_formula;
				var add = 0;
				
				if (HATE_remove_formula) {
					try {
						add = eval(HATE_remove_formula);
						if (isNaN(add)) {
							throw new Error("「" + HATE_remove_formula + "」の計算結果は数値ではありません。");
						}
					} catch (e) {
						if (HateDebugMode) {
							console.log(e.toString());
						}
						add = 0;
					}
				} else if (HATE_formula) {
					try {
						add = eval(HATE_formula);
						if (isNaN(add)) {
							throw new Error("「" + HATE_formula + "」の計算結果は数値ではありません。");
						}
					} catch (e) {
						if (HateDebugMode) {
							console.log(e.toString());
						}
						add = 0;
					}
				} else {
					try {
						add = eval(RemoveStateHateFormula);
						if (isNaN(add)) {
							throw new Error("「" + RemoveStateHateFormula + "」の計算結果は数値ではありません。");
						}
					} catch (e) {
						if (HateDebugMode) {
							console.log(e.toString());
						}
						add = 0;
					}
				}
				hate += add;
			});

			if (result.addedBuffs.length > 0) {
				var add = 0;
				try {
					add = eval(BuffHateFormula);
					if (isNaN(add)) {
						throw new Error("「" + BuffHateFormula + "」の計算結果は数値ではありません。");
					}
				} catch (e) {
					if (HateDebugMode) {
						console.log(e.toString());
					}
					add = 0;
				}
				add = result.addedBuffs.length * add;
				hate += add;
			}

			hate = Math.ceil(hate * user.tgr);

			enemy.hate(user.actorId(), hate);
			/*if (HateDebugMode) {
				console.log(enemy.name() + "の" + user.name() + "へのヘイトが" + hate + "ポイント増加");
			}*/
		}
	};

	Game_Action.prototype.controlHate = function(target) {
		
		var result = target.result();
		var user = this.subject();
		var a = user;
		var b = target;
		var v = $gameVariables._data;
		var enemies = [];
		var actors = [];
		var hate;
		var action = this;

		var damage = Math.max(result.hpDamage, 0);
		var MPDamage = Math.max(result.mpDamage, 0);

		var hateControls = this._item.object().hateControls;
		for (var i = 0; i < hateControls.length; i++) {
			var HATE_enemy = hateControls[i].enemy;
			var HATE_actor = hateControls[i].actor;
			var HATE_formula = hateControls[i].formula;
			var enemies = this.haterEnemies(target, HATE_enemy);
			var actors = this.hatedActors(target, HATE_actor);
			
			enemies.forEach(function(enemy) {
				if (!enemy.canHate()) return;
				actors.forEach(function(actor) {
					try {
						hate = eval(HATE_formula);
						if (isNaN(hate)) {
							throw new Error("「" + HATE_formula + "」の計算結果は数値ではありません。");
						}
					} catch(e) {
						if (HateDebugMode) {
							console.log(e.toString());
						}
						hate = 0;
					}
					hate = Math.ceil(hate * actor.tgr);
					if (hate != 0) action.makeSuccess(target);
					enemy.hate(actor.actorId(), hate);
				});
			});
		}
	};

	Game_Action.prototype.haterEnemies = function(target, HATE_enemy) {

		if (HATE_enemy.match(/^user$/i)) {
			return this.enemiesUser(target);

		} else if (HATE_enemy.match(/^target$/i)) {
			return this.enemiesTarget(target);

		} else if (HATE_enemy.match(/^whoHateUser$/i)) {
			return this.enemiesWhoHateUser(target);

		} else if (HATE_enemy.match(/^whoHateTarget$/i)) {
			return this.enemiesWhoHateTarget(target);

		} else if (HATE_enemy.match(/^all$/i)) {
			return $gameTroop.aliveMembers();

		} else if (HATE_enemy.match(/^exceptUser$/i)) {
			return this.enemiesExceptUser(target);

		} else if (HATE_enemy.match(/^exceptTarget$/i)) {
			return this.enemiesExceptTarget(target);

		}
		return [];
	};

	Game_Action.prototype.enemiesUser = function(target) {
		var enemies = [];
		var user = this.subject();
		if (user.isEnemy()) enemies.push(user);
		return enemies;
	};

	Game_Action.prototype.enemiesTarget = function(target) {
		var enemies = [];
		if (target.isEnemy()) enemies.push(target);
		return enemies;
	};

	Game_Action.prototype.enemiesWhoHateUser = function(target) {
		var enemies = [];
		var user = this.subject();
		if (user.isActor()) {
			enemies = user.whoHateMe();
		}
		return enemies;
	};

	Game_Action.prototype.enemiesWhoHateTarget = function(target) {
		var enemies = [];
		if (target.isActor()) {
			enemies = target.whoHateMe();
		}
		return enemies;
	};

	Game_Action.prototype.enemiesExceptUser = function(target) {
		var enemies = [];
		var user = this.subject();
		if (user.isEnemy()) {
			enemies = $gameTroop.aliveMembers().filter(function(enemy) {
				return enemy != user;
			});
		}
		return enemies;
	};

	Game_Action.prototype.enemiesExceptTarget = function(target) {
		var enemies = [];
		if (target.isEnemy()) {
			enemies = $gameTroop.aliveMembers().filter(function(enemy) {
				return enemy != target;
			});
		}
		return enemies;
	};


	Game_Action.prototype.hatedActors = function (target, HATE_actor) {

		if (HATE_actor.match(/^user$/i)) {
			return this.actorsUser(target);

		} else if (HATE_actor.match(/^target$/i)) {
			return this.actorsTarget(target);

		} else if (HATE_actor.match(/^exceptUser$/i)) {
			return this.actorsExceptUser(target);

		} else if (HATE_actor.match(/^targetsTarget$/i)) {
			return this.actorsTargetsTarget(target);

		}
		return [];
	};

	Game_Action.prototype.actorsUser = function(target) {
		var actors = [];
		var user = this.subject();
		if (user.isActor()) {
			actors.push(user);
		}
		return actors;
	};

	Game_Action.prototype.actorsTarget = function(target) {
		var actors = [];
		if (target.isActor()) {
			actors.push(target);
		}
		return actors;
	};

	Game_Action.prototype.actorsExceptUser = function(target) {
		var actors = [];
		var user = this.subject();
		if (user.isActor()) {
			actors = $gameParty.aliveMembers().filter(function(actor) {
				return actor != user;
			});
		}
		return actors;
	};

	Game_Action.prototype.actorsTargetsTarget = function(target) {
		var actors = [];
		if (target.isEnemy()) {
			actors.push(target.hateTarget());
		}
		return actors;
	};


//=============================================================================
// DataManager
//=============================================================================
	var DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
		if (!DataManager_isDatabaseLoaded.call(this)) return false;
		this.processHateNotetags($dataSkills);
		this.processHateNotetags($dataItems);
		return true;
	};

	DataManager.processHateNotetags = function(group) {
		var note1 = /<HATE_control:[ ]*(user|target|whoHateUser|whoHateTarget|all|exceptUser|exceptTarget)[ ]*,[ ]*(user|target|exceptUser|targetsTarget)[ ]*,[ ]*(.+)[ ]*>/i;
		for (var n = 1; n < group.length; n++) {
			var obj = group[n];
			var notedata = obj.note.split(/[\r\n]+/);

			obj.hateControls = [];

			for (var i = 0; i < notedata.length; i++) {
				var line = notedata[i];
				if (line.match(note1)) {
					var control = {};
					control.enemy = RegExp.$1;
					control.actor = RegExp.$2;
					control.formula = RegExp.$3;
					obj.hateControls.push(control);
				}
			}
		}
	};

//=============================================================================
// displayHateLine
//=============================================================================
// v1.10からコメントアウト
//	if(displayHateLine) {
//=============================================================================
// HateLine
//=============================================================================
	
		var HateLine = function() {
			this.initialize.apply(this, arguments);
		};
		HateLine.prototype = Object.create(Sprite.prototype);
		HateLine.prototype.constructer = HateLine;

		HateLine.prototype.initialize = function(enemy, spriteset) {
			Sprite.prototype.initialize.call(this);
			this._enemy = enemy;
			this._spriteset = spriteset;
			this._enemySprite = null;
			this._actorNo = -1;
			this.bitmap = ImageManager.loadSystem("hateline");
			this._ex = 0;
			this._ey = 0;	
			this._ax = 0;
			this._ay = 0;
			this.z = 0;

			this.findEnemySprite();
		};

		HateLine.prototype.findEnemySprite = function() {
			var enemy = this._enemy;
			var enemySprites = this._spriteset._enemySprites;
			for (var i=0,l=enemySprites.length; i < l; i++){
				if (enemySprites[i]._enemy == enemy) {
					this._enemySprite = enemySprites[i];
					break;
				}
			}
		};

		HateLine.prototype.updateBindSprites = function() {
			this.updateBindEnemySprite();
			this.updateBindActorSprite();
		};

		HateLine.prototype.updateBindEnemySprite = function() {
			var sprite = this._enemySprite;
			this._ex = sprite.x;
			this._ey = sprite.y;
		};

		HateLine.prototype.updateBindActorSprite = function() {
			var actor = this._enemy.hateTarget();
			if (actor) {
				if ($gameSystem.isSideView()) {
					var sprite = this._spriteset._actorSprites[actor.index()];
					this._ax = sprite.x;
					this._ay = sprite.y;
				} else {
					this._actorNo = actor.index();
					const rect = SceneManager._scene._statusWindow.itemRectWithPadding(this._actorNo);
					this._ax = rect.x + rect.width/2 + SceneManager._scene._statusWindow.x;
					this._ay = 450;
				}
			}
		};
		HateLine.prototype.updatePosition = function() {
			var dx = this._ex - this._ax;
			var dy = this._ey - this._ay;
			var distance = Math.floor(Math.pow(dx*dx+dy*dy,0.5));

			this.x = this._ax;
			this.y = this._ay;
			this.scale.y = distance / this.height;
			//this.rotation = Math.PI * 3 / 2 + Math.atan(dy/dx);
			this.rotation = Math.atan2(dy,dx) - Math.PI / 2;
		};

		HateLine.prototype.update = function() {
			Sprite.prototype.update.call(this);
			if (this._enemy.isHidden() || this._enemy.isDead()) {
				this.hide();
				return;
			}
			this.show();
			this.updateBindSprites();
			this.updatePosition();
			// v1.10
			this.updateVisible();
		};
		// v1.10
		HateLine.prototype.updateVisible = function() {
			this.visible = $gameSystem.isDispHateLine();
		};


//=============================================================================
// Spriteset_Battle
//=============================================================================
		
		Spriteset_Battle.prototype.createHateLines = function() {
			if (!$gameSystem.isDispHateLine()) return;
			var enemies = $gameTroop.members();
			var hateLines = [];
			var index = this._battleField.getChildIndex(this._enemySprites[0]);
			for (var i = 0,l = enemies.length; i < l; i++) {
				hateLines[i] = new HateLine(enemies[i], this);
				this._battleField.addChildAt(hateLines[i], index);
			}
			this._hateLines = hateLines;
		};
		
		var Spriteset_Battle_prototype_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
		Spriteset_Battle.prototype.createLowerLayer = function() {
			Spriteset_Battle_prototype_createLowerLayer.call(this);
			/*if ($gameSystem.isSideView())*/ this.createHateLines();
		}
		
//	}




//=============================================================================
// Window_ABEnemyList
//=============================================================================



	var Window_ABEnemyList = function() {
		this.initialize.apply(this, arguments);
	};

	Window_ABEnemyList.prototype = Object.create(Window_Base.prototype);
	Window_ABEnemyList.prototype.constructor = Window_ABEnemyList;

	Window_ABEnemyList.prototype.initialize = function(x, y, width, height) {
		height = 9*EnemyListLineHeight + 18*2;
		var rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
		this._actor = null;
		this._enemy = null;
		this._flag = "";
    this.contents.fontSize = EnemyListFontSize;
	};
	Window_ABEnemyList.prototype.lineHeight = function() {
		return EnemyListLineHeight;
	};
	var _Window_ABEnemyList_prototype_show = Window_ABEnemyList.prototype.show;
	Window_ABEnemyList.prototype.show = function() {
		if (!$gameSystem.isDispEnemyHateList()) return;
		_Window_ABEnemyList_prototype_show.call(this);
	};

	Window_ABEnemyList.prototype.setActorAndShow = function(actor) {
		this._actor = actor;
		this._flag = "actor";
		this.refresh();
		this.show();
	};

	Window_ABEnemyList.prototype.setEnemyAndShow = function(enemy) {
		//this._enemy = enemy;
		//this._flag = "enemy";
		//this.refresh();
		//this.show();
	};

	Window_ABEnemyList.prototype.refresh = function() {
		if (this._flag == "actor") {
			this.showEnemyList();
		} else if (this._flag == "enemy") {
			this.ShowHateGauge();
		} else {
			this.contents.clear();
		}
	};


	Window_ABEnemyList.prototype.showEnemyList = function() {
		this.contents.clear();
		var actor = this._actor;
		if (!actor) return;
		var cw = this.contents.width;
		if (!$gameSystem.isDispEnemyHateList()) return;
		this.drawText(actor.name(), 0, 0, cw);
		var y = this.lineHeight();
		var enemies = $gameTroop.aliveMembers();
		for (var i=0, l=enemies.length; i<l; i++) {
			var enemy = enemies[i];
			var hates = enemy.hates();
			var maxHate = -9999999;
			for (var j=0,jl=hates.length; j<jl; j++) {
				if (maxHate < hates[j]) {
					maxHate = hates[j];
				}
			}
			var hate = enemy._hates[actor.actorId()];
			var hateOrder = enemy.hateOrder(actor.actorId());
			// console.log(hateOrder);
			this.drawIcon(Number(HateIconList[hateOrder]), 0, y);
			var color1 = ColorManager.textColor(HateGaugeColor1);
			var color2 = ColorManager.textColor(HateGaugeColor2);
			var rate = hate/maxHate;
			if (!rate) rate = 0;
			this.drawGauge(32, y, cw-32, rate, color1, color2);
			this.drawText(enemy.name(), 32, y, cw-32);
			y += this.lineHeight();
		}
	};
	Window_ABEnemyList.prototype.ShowHateGauge = function() {
		this.contents.clear();
		var enemy = this._enemy;
		if (!enemy) return;
		if (!$gameSystem.isDispEnemyHateList()) return;
		this.drawText(enemy.name(), 0, 0, cw);
		var y = this.lineHeight();
		var actors = $gameParty.battleMembers();
		var hates = enemy.hates();
		var maxHate = -9999999;
		for (var i=0,l=hates.length; i<l; i++) {
			if (maxHate < hates[i]) {
				maxHate = hates[i];
			}
		}
		var hatesArray = [];
		$gameParty.aliveMembers().forEach(function(member) {
			if (!member.isBattleMember()) return;
			var i = member.actorId();
			
			var hateObj = {};
			hateObj.i = i;
			hateObj.hate = hates[i];
			hatesArray.push(hateObj);
		});

		// 降順ソート
		hatesArray.sort(function(a,b){
			if (a.hate > b.hate) return -1;
			if (a.hate < b.hate) return 1;
			return 0;
		});
		for (var i=0, l=hatesArray.length; i<l; i++) {
			var hate = hatesArray[i].hate;
			var actorId = hatesArray[i].i;
			var actor = $gameActors.actor(actorId);
			
			/*if (actor.isDead()) {
				y += this.lineHeight();
				continue;
			}*/
			var hate = enemy._hates[actorId];
			var hateOrder = enemy.hateOrder(actorId);
			// console.log(hateOrder);
			this.drawIcon(Number(HateIconList[hateOrder]), 0, y);
			var color1 = ColorManager.textColor(HateGaugeColor1);
			var color2 = ColorManager.textColor(HateGaugeColor2);
    	this.drawActorCharacter(actor, cw-40, y+40, 32, 32);

			var rate = hate/maxHate;
			if (!rate) rate = 0;
			this.drawGauge(32, y, cw-32, rate, color1, color2);
			this.drawText(actor.name(), 32, y, cw-32);
			y += this.lineHeight();
		}
	};



//=============================================================================
// MVからの雑な移行
//=============================================================================

Window_Base.prototype.drawGauge = function(x, y, width, rate, color1, color2) {
    var fillW = Math.floor(width * rate);
    var gaugeY = y + this.lineHeight() - 8;
    this.contents.fillRect(x, gaugeY, width, 6, ColorManager.textColor(19));
    this.contents.gradientFillRect(x, gaugeY, fillW, 6, color1, color2);
};

//=============================================================================
// Window_ABHateGauge
//=============================================================================


	var Window_ABHateGauge = function() {
		this.initialize.apply(this, arguments);
	};

	Window_ABHateGauge.prototype = Object.create(Window_Base.prototype);
	Window_ABHateGauge.prototype.constructor = Window_ABHateGauge;

	Window_ABHateGauge.prototype.initialize = function(x, y, width, height) {
		//height = 1*EnemyListLineHeight;
		height = 60;
		var rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
		this._actor = null;
		this._enemy = null;
		this.anchor = 1;
		this.setBackgroundType(2);
    this.contents.fontSize = EnemyListFontSize;
		this.show();
	};
	Window_ABHateGauge.prototype.lineHeight = function() {
		return EnemyListLineHeight;
	};
	Window_ABHateGauge.prototype.standardPadding = function() {
		return 0;
	};

	var Window_ABHateGauge_prototype_show = Window_ABHateGauge.prototype.show;
	Window_ABHateGauge.prototype.show = function() {
		if (!$gameSystem.isDispHateGauge()) return;
		Window_ABHateGauge_prototype_show.call(this);
	};
	
	Window_ABHateGauge.prototype.setActor = function(actor) {
		this._actor = actor;
		this.refresh();
	};

	Window_ABHateGauge.prototype.setEnemyAndShow = function(enemy) {
		this._enemy = enemy;
		this.show();
		this.refresh();
		this.open();
	};

	Window_ABHateGauge.prototype.refresh = function() {
		this.contents.clear();
		var enemy = this._enemy;
		var cw = this.contents.width;
		if (!$gameSystem.isDispHateGauge()) return;
		if (!enemy) return;
		var actor = this._actor;
		if (!actor) return;

		var hates = enemy.hates();
		var hate = enemy._hates[actor._actorId];
		var maxHate = -9999999;
		for (var i=0,l=hates.length; i<l; i++) {
			if (maxHate < hates[i]) {
				maxHate = hates[i];
			}
		}
		if (maxHate < 0) maxHate = 1;
		var hateOrder = enemy.hateOrder(actor.actorId());
		// console.log(hateOrder);
		this.drawIcon(Number(HateIconList[hateOrder]), 0, 0);
		var color1 = ColorManager.textColor(HateGaugeColor1);
		var color2 = ColorManager.textColor(HateGaugeColor2);
    //this.drawActorCharacter(actor, cw-40, y+40, 32, 32);
		var rate = hate/maxHate;
		if (!rate) rate = 0;

		
		this.drawGauge(0, 0,  cw-32, hate/maxHate, color1, color2);
	
		if (ShowEnemyNameOnHateGauge) {
			this.drawText(enemy.name(), 32, 0, cw-32);
		}
		//y += this.lineHeight();
	
	};
var _Window_StatusBase_prototype_placeGauge = Window_StatusBase.prototype.placeGauge;
Window_StatusBase.prototype.placeGauge = function(actor, type, x, y, enemy) {
		if (type != "hate") {
			_Window_StatusBase_prototype_placeGauge.call(this, actor, type, x, y);
			return;
		}
    const key = "actor%1-gauge-%2-enemy%3".format(actor.actorId(), type, enemy.index());
    const sprite = this.createInnerSprite(key, Sprite_Gauge);
    sprite.setup(actor, type);
		sprite.setEnemy(enemy);
    sprite.move(x, y);
    sprite.show();
};

//=============================================================================
// Sprite_Gauge
//=============================================================================
var _Sprite_Gauge_prototype_valueColor = Sprite_Gauge.prototype.valueColor;
Sprite_Gauge.prototype.valueColor = function() {
    switch (this._statusType) {
        case "hate":
            return ColorManager.normalColor();
        default:
            return _Sprite_Gauge_prototype_valueColor.call(this);
    }
};
var _Sprite_Gauge_prototype_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
    switch (this._statusType) {
        case "hate":
            return ColorManager.textColor(HateGaugeColor1);
        default:
            return _Sprite_Gauge_prototype_gaugeColor1.call(this);
    }
};
var _Sprite_Gauge_prototype_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
    switch (this._statusType) {
        case "hate":
            return ColorManager.textColor(HateGaugeColor2);
        default:
            return _Sprite_Gauge_prototype_gaugeColor1.call(this);
    }
};
var _Sprite_Gauge_prototype_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
    if (this._battler && this._enemy) {
        switch (this._statusType) {
            case "hate":
                return this._enemy._hates[this._battler._actorId];
        }
    }
    return _Sprite_Gauge_prototype_currentValue.call(this);
};
var Sprite_Gauge_prototype_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
    if (this._battler && this._enemy) {
        switch (this._statusType) {
            case "hate":
								const hates = enemy.hates();
								let maxHate = -9999999;
								for (let i=0,l=hates.length; i<l; i++) {
									if (maxHate < hates[i]) {
										maxHate = hates[i];
									}
								}
								return maxHate;
        }
    }
    return Sprite_Gauge_prototype_currentMaxValue.call(this);
};

Sprite_Gauge.prototype.setEnemy = function(enemy) {
	this._enemy = enemy;
    this._statusType = statusType;
    this._value = this.currentValue();
    this._maxValue = this.currentMaxValue();
    this.updateBitmap();
}
//=============================================================================
// Scene_Battle
//=============================================================================
	var Scene_Battle_prototype_createAllWindows = 
		Scene_Battle.prototype.createAllWindows;
	Scene_Battle.prototype.createAllWindows = function() {
		Scene_Battle_prototype_createAllWindows.call(this);
		this.createHateWindows();
	};

	Scene_Battle.prototype.createHateWindows = function() {
	//	if ($gameSystem.isDispEnemyHateList()) {
			this._ABEnemyListWindow = new Window_ABEnemyList(EnemyListX, EnemyListY, EnemyListWidth, Window_Base.prototype.fittingHeight(9));
			this.addWindow(this._ABEnemyListWindow);
	//	}
		if (!$gameSystem.isDispEnemyHateList()) this._ABEnemyListWindow.hide();
		this.initHateGaugeWindows();
		//if ($gameSystem.isDispHateGauge()) {
		//	this.initHateGaugeWindows();
		//}
	};

	Scene_Battle.prototype.initHateGaugeWindows = function() {
		//console.log("initgauge");
	/*	if (!$gameSystem.isDispHateGauge()) {
			return;
		}*/
		if (this.hateGaugeWindows) {
			var enemy = this.hateGaugeWindows[0]._enemy;
			for (var i=0,l=this.hateGaugeWindows.length; i<l; i++) {
				this._windowLayer.removeChild(this.hateGaugeWindows[i]);
			}
		}
		this.hateGaugeWindows = [];
		var actors = $gameParty.battleMembers()
		for (var i=0,l=actors.length; i<l; i++) {
			var actor = actors[i];
			var index = i;
			var length = l;
			var x = eval(HateGaugeX);
			var y = eval(HateGaugeY);
			var w = HateGaugeWidth;
			var h = 40;

			this.hateGaugeWindows[i] = new Window_ABHateGauge(x, y, w, h);
			this.hateGaugeWindows[i].setActor(actor);
			if (enemy) {
				this.hateGaugeWindows[i].setEnemyAndShow(enemy);
			}
			this.addWindow(this.hateGaugeWindows[i]);
			this.hateGaugeWindows[i].hide();
		}
	}
var _Scene_Battle_prototype_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    _Scene_Battle_prototype_startPartyCommandSelection.call(this);
		if (this.hateGaugeWindows) this.hideHateWindow();
};

	var _Scene_Battle_prototype_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
	Scene_Battle.prototype.startActorCommandSelection = function() {
		_Scene_Battle_prototype_startActorCommandSelection.call(this);
		if (!$gameSystem.isDispEnemyHateList()) return;
		this._ABEnemyListWindow.setActorAndShow(BattleManager.actor());
		if (this.hateGaugeWindows) this.hideHateWindow();
	};
	var _Scene_Battle_prototype_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
	Scene_Battle.prototype.onSkillCancel = function() {
    _Scene_Battle_prototype_onSkillCancel.call(this);
		if (!$gameSystem.isDispEnemyHateList()) return;
		this._ABEnemyListWindow.setActorAndShow(BattleManager.actor());
		//if (this.hateGaugeWindows) this.hideHateWindow();
	};
	var _Scene_Battle_prototype_onItemCancel = Scene_Battle.prototype.onItemCancel;
	Scene_Battle.prototype.onItemCancel = function() {
		_Scene_Battle_prototype_onItemCancel.call(this);
		if (!$gameSystem.isDispEnemyHateList()) return;
		this._ABEnemyListWindow.setActorAndShow(BattleManager.actor());
		//if (this.hateGaugeWindows) this.hideHateWindow();
	};
	var _Scene_Battle_prototype_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
	Scene_Battle.prototype.onEnemyCancel = function() {
		_Scene_Battle_prototype_onEnemyCancel.call(this);
		if (this.hateGaugeWindows) this.hideHateWindow();
	};
	var _Scene_Battle_prototype_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
	Scene_Battle.prototype.onEnemyOk = function() {
		_Scene_Battle_prototype_onEnemyOk.call(this);
		if (this.hateGaugeWindows) this.hideHateWindow();
	};


	var _Scene_Battle_prototype_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
	Scene_Battle.prototype.endCommandSelection = function() {
    _Scene_Battle_prototype_endCommandSelection.call(this);
		if (!$gameSystem.isDispEnemyHateList()) return;
		this._ABEnemyListWindow.hide();
		//if (this.hateGaugeWindows) this.hideHateWindow();
	};


	Scene_Battle.prototype.selectActor = function(actor) {
		if (this._ABEnemyListWindow) this._ABEnemyListWindow.setActorAndShow(actor);
	};
	Scene_Battle.prototype.selectEnemy = function(enemy) {
		if (!enemy) return;
		if (this._ABEnemyListWindow) this._ABEnemyListWindow.setEnemyAndShow(enemy);
		if (this.hateGaugeWindows) this.setEnemyToAllHateGaugeWindow(enemy);
	};
	Scene_Battle.prototype.refreshHateWindow = function() {
		if (this._ABEnemyListWindow) this._ABEnemyListWindow.refresh();
		if (this.hateGaugeWindows) this.refreshAllHateGaugeWindow();
	};

	
	Scene_Battle.prototype.setEnemyToAllHateGaugeWindow = function(enemy) {
		if (!this.hateGaugeWindows) return;
		for (var i=0,l=this.hateGaugeWindows.length; i<l;i++) {
			this.hateGaugeWindows[i].setEnemyAndShow(enemy);
		}
	};
	Scene_Battle.prototype.refreshAllHateGaugeWindow = function() {
		if (!this.hateGaugeWindows) return;
		for (var i=0,l=this.hateGaugeWindows.length; i<l;i++) {
			this.hateGaugeWindows[i].refresh();
			//this.hateGaugeWindows[i].show();
		}
	};
	Scene_Battle.prototype.hideHateWindow = function() {
		if (!this.hateGaugeWindows) return;
		for (var i=0,l=this.hateGaugeWindows.length; i<l;i++) {
			this.hateGaugeWindows[i].hide();
			
		}
	};

	var _Scene_Battle_prototype_commandSkill = Scene_Battle.prototype.commandSkill;
	Scene_Battle.prototype.commandSkill = function() {
		_Scene_Battle_prototype_commandSkill.call(this);
		if (!$gameSystem.isDispEnemyHateList()) return;
		this._ABEnemyListWindow.hide();
	};
	var _Scene_Battle_prototype_commandItem = Scene_Battle.prototype.commandItem;
	Scene_Battle.prototype.commandItem = function() {
	    _Scene_Battle_prototype_commandItem.call(this);
			if (!$gameSystem.isDispEnemyHateList()) return;
			this._ABEnemyListWindow.hide();
	};
//=============================================================================
// BattleManager
//=============================================================================
	var _BattleManager_changeActor = BattleManager.changeActor;
	BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
		_BattleManager_changeActor.call(this, newActorIndex, lastActorActionState);
		if (!this.actor()) return;
    SceneManager._scene.selectActor(this.actor());
	};
var _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    _BattleManager_startAction.call(this);
		var subject = this._subject;
		var target = this._targets[0]
		if (subject.isActor()) {
			SceneManager._scene.selectActor(subject);
		}
		if (subject.isEnemy()) {
			SceneManager._scene.selectEnemy(subject);
		}
		this.updateHateGauge(subject, target);
};
var _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
	_BattleManager_invokeAction.call(this, subject, target);
	
	    SceneManager._scene.refreshHateWindow();
		this.updateHateGauge(subject, target);
};
var _BattleManager_processVictory = BattleManager.processVictory

BattleManager.processVictory = function() {
		_BattleManager_processVictory.call(this);
    SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};
var _BattleManager_processDefeat = BattleManager.processDefeat;

BattleManager.processDefeat = function() {
	_BattleManager_processDefeat.call(this);
	SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};

var _BattleManager_processAbort = BattleManager.processAbort;

BattleManager.processAbort = function() {
	_BattleManager_processAbort.call(this);
	SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};
var _BattleManager_processEscape = BattleManager.processEscape;

BattleManager.processEscape = function() {
	_BattleManager_processEscape.call(this);
	SceneManager._scene.hideHateWindow();
    SceneManager._scene._ABEnemyListWindow.hide();
};
	BattleManager.updateHateGauge = function(subject, target) {
		if (!target) return;
		if (target.isEnemy()) {
			SceneManager._scene.selectEnemy(target);
		}
		
	};

//=============================================================================
// Window_BattleEnemy
//=============================================================================

var _Window_BattleEnemy_prototype_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_prototype_select.call(this, index);
    SceneManager._scene.selectEnemy(this.enemy());
};
//=============================================================================
// Window_BattleActor
//=============================================================================

var _Window_BattleActor_prototype_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_prototype_select.call(this, index);
    SceneManager._scene.selectActor(this.actor());
};

//=============================================================================
// 遊び
//=============================================================================




})();
//=============================================================================
// YEP_BattleAICore.js
//=============================================================================



if ("AIManager" in window) {
	AIManager_passAIConditions = AIManager.passAIConditions;
	AIManager.passAIConditions = function(line) {
		
		// HATE ELEMENT
		if (line.match(/HATE[ ]ELEMENT(.*)/i)) {
			return this.conditionElementOfHateTarget();
		}
		// HATE PARAM EVAL
		if (line.match(/HATE[ ](.*)[ ]PARAM[ ](.*)/i)) {
			var paramId = this.getParamId(String(RegExp.$1));
			var condition = String(RegExp.$2);
			return this.conditionParamOfHateTargetEval(paramId, condition);
		}
		// HATE STATE === X
		if (line.match(/HATE[ ]STATE[ ]===[ ](.*)/i)) {
			return this.conditionHateStateHas(String(RegExp.$1));
		}
		// HATE STATE !== X
    if (line.match(/HATE[ ]STATE[ ]!==[ ](.*)/i)) {
      return this.conditionHateStateNot(String(RegExp.$1));
    }
		return AIManager_passAIConditions.call(this, line);
	};

	AIManager.conditionElementOfHateTarget = function() {
		var line = this._origCondition;
		if (line.match(/HATE[ ]ELEMENT[ ](\d+)[ ](.*)/i)) {
			var elementId = parseInt(RegExp.$1);
			var type = String(RegExp.$2).toUpperCase();
		} else if (line.match(/HATE[ ]ELEMENT[ ](.*)[ ](.*)/i)) {
			var elementId = Yanfly.ElementIdRef[String(RegExp.$1).toUpperCase()];
			var type = String(RegExp.$2).toUpperCase();
		} else {
			return false;
		}
		var user = this.battler();
		var target = user.hateTarget();
		var flag = this.elementRateMatch(target, elementId, type);
		if (flag)  {
			var group = this.getActionGroup();
			this.setProperTarget(group);
		}
		return flag;
	};

	AIManager.conditionParamOfHateTargetEval = function(paramId, condition) {
		var action = this.action();
		var item = action.item();
		var user = this.battler();
		var s = $gameSwitches._data;
		var v = $gameVariables._data;
		condition = condition.replace(/(\d+)([%％])/g, function() {
			return this.convertIntegerPercent(parseInt(arguments[1]));
		}.bind(this));
		if (paramId < 0) return false;
		if (paramId >= 0 && paramId <= 7) {
			condition = 'target.param(paramId) ' + condition;
		} else if (paramId === 8) {
			condition = 'target.hp ' + condition;
		} else if (paramId === 9) {
			condition = 'target.mp ' + condition;
		} else if (paramId === 10) {
			condition = 'target.hp / target.mhp ' + condition;
		} else if (paramId === 11) {
			condition = 'target.hp / target.mmp ' + condition;
		} else if (paramId === 12) {
			condition = 'target.level ' + condition;
		}
		var target = user.hateTarget();
		var flag = eval(condition);
		if (flag) {
			var group = this.getActionGroup();
			this.setProperTarget(group);
		}
		return flag;
	};

	AIManager.conditionHateStateHas = function(condition) {
		if (condition.match(/HATE[ ]STATE[ ](\d+)/i)) {
			var stateId = parseInt(RegExp.$1);
		} else {
			var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
			if (!stateId) return false;
		}
		if (!$dataStates[stateId]) return false;

		var user = this.battler();
		var target = user.hateTarget();
		var flag = target.hasState(stateId);
		if (flag) {
			var group = this.getActionGroup();
			this.setProperTarget(group);
		}
		return flag;
	};

	AIManager.conditionHateStateNot = function(condition) {
		if (condition.match(/HATE[ ]STATE[ ](\d+)/i)) {
			var stateId = parseInt(RegExp.$1);
		} else {
			var stateId = Yanfly.StateIdRef[condition.toUpperCase()];
			if (!stateId) return false;
		}
		if (!$dataStates[stateId]) return false;

		var user = this.battler();
		var target = user.hateTarget();
		var flag = target.notState(stateId);
		if (flag) {
			var group = this.getActionGroup();
			this.setProperTarget(group);
		}
		return flag;
	};

	var AIManager_setProperTarget = AIManager.setProperTarget;
	
	AIManager.setProperTarget = function(group) {
		var action = this.action();
		var user = this.battler();
		var randomTarget = group[Math.floor(Math.random() * group.length)];
		if (group.length <= 0) return action.setTarget(randomTarget.index());
		var line = this._aiTarget.toUpperCase();
		if (line.match(/HATE/i)) {
			if (action.isForOpponent()) {
				var target = user.hateTargetOf(group);
				if (target) {
					return action.setTarget(target.index());
				}
			}
			return action.setTarget(randomTarget.index());
		}

		return AIManager_setProperTarget.call(this, group);
	}
}
