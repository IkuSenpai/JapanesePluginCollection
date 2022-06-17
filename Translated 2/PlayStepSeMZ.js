//=============================================================================
// Plugin for RPG Maker MZ
// PlayStepSeMZ.js
//=============================================================================
// This plugin is the MZ version of PlayStepSE.js the RMMV plugin.
// [Update History of PlayStepSE.js]
// 2016.Aug.02 Ver1.0.0 First Release
// 2020.Aug.25 Ver1.1.0 Add switch setting for special situation
// [Update History]
// 2020.Sep.12 Ver1.0.0 First Release
// 2020.Sep.24 Ver1.1.0 Enable to work with AudioSource.js by Kuramubon.

/*:
 * @target MZ
 * @plugindesc [Ver1.1.0]Play footstep SE for each character, each region
 * @author Sasuke KANNAZUKI
 * 
 * @param Play Player Step SE
 * @desc Whether to play footstep SE of Player by default (true/false)
 * @default false
 * 
 * @param Default SE Filename
 * @desc default footstep SE filename for every characters
 * @default Equip2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param Default Volume
 * @desc default footstep SE volume. (90 is normal)
 * @default 20
 * 
 * @param Default Pitch
 * @desc default footstep SE pitch (100 is normal)
 * @default 60
 * 
 * @param Default Interval
 * @desc default interval. it'll play SE for each this count step.
 * @default 1
 * 
 * @param Enable in EventRunning
 * @desc Whether to play footstep SE at event running(true/false)
 * @default false
 * 
 * @param Original Situation Switch ID
 * @text Special Situation Switch ID
 * @desc When the switch is ON, it is special situation. Set 0 to never become the situation.
 * @type switch
 * @min 0
 * @default 1

 * @param Original Situation SE
 * @desc Original Situation SE Filename
 * @parent Original Situation Switch ID
 * @default Down2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param Original Situation Volume
 * @parent Original Situation Switch ID
 * @desc Original Situation SE's Volume
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param Original Situation Pitch
 * @parent Original Situation Switch ID
 * @desc Original Situation SE's Pitch
 * @type number
 * @min 0
 * @max 100000
 * @default 150
 *
 * @param Original Situation Interval
 * @parent Original Situation Switch ID
 * @desc Interval for original situation.
 * @type number
 * @min 1
 * @default 1
 * 
 * @command setStepSound
 * @text Change Default Step Sound
 * @desc 
 *
 * @arg target
 * @desc Set whose default step sound?
 * @type select
 * @option default
 * @option player
 * @option event
 * @default default
 *
 * @arg eventId
 * @text Event ID
 * @desc Event ID when target is an event.
 * Otherwise, this setting is ignored.
 * @type number
 * @min 1
 * @default 1
 *
 * @arg se
 * @text New SE
 * @desc New SE and Interval
 * @type struct<Audio>
 * @default
 * 
 * @command resetStepSound
 * @text Reset Step Sound
 * @desc 
 *
 * @arg target
 * @desc Target to reset step sound
 * @type select
 * @option default
 * @option player
 * @option event
 * @default default
 *
 * @arg eventId
 * @text Event ID
 * @desc Event ID when target is an event.
 * Otherwise, this setting is ignored.
 * @type number
 * @min 1
 * @default 1
 *
 * @command setRegionStepSound
 * @text Set Step Sound of Region
 * @desc 
 *
 * @arg regionId
 * @text Region ID
 * @desc Region ID to set step sound
 * @type number
 * @min 1
 * @default 1
 *
 * @arg target
 * @text Target
 * @desc Set whose step sound on the region
 * @type select
 * @option default
 * @option player
 * @option event
 * @option all of above
 * @value all
 * @default all
 *
 * @arg eventId
 * @text Event ID
 * @desc Event ID when target is an event.
 * Otherwise, this setting is ignored.
 * @type number
 * @min 1
 * @default 1
 *
 * @arg se
 * @text New SE
 * @desc New SE and Interval
 * @type struct<Audio>
 * @default
 * 
 * @command resetRegionStepSound
 * @text Reset Step Sound of Region
 * @desc 
 *
 * @arg regionId
 * @text Region ID
 * @desc Region ID to set step sound
 * @type number
 * @min 1
 * @default 1
 *
 * @arg target
 * @text Target
 * @desc Reset whose step sound on the region
 * @type select
 * @option default
 * @option player
 * @option event
 * @option all of above
 * @value all
 * @default all
 *
 * @arg eventId
 * @text Event ID
 * @desc Event ID when target is an event.
 * Otherwise, this setting is ignored.
 * @type number
 * @min 1
 * @default 1
 *
 * @command playOrStop
 * @text Play SE or Stop it
 * @desc
 *
 * @arg isPlay
 * @text Play or Stop
 * @desc true:Play(Start), false:Stop
 * @type boolean
 * @on Start to Play
 * @off Stop
 * @default true
 *
 * @arg targetEventId
 * @text Event ID
 * @desc Set -1 to set Player.
 * @type number
 * @min -1
 * @default -1
 *
 * @command playOnEvent
 * @text Does play during event
 * @desc Whether to play step sound also during event or not.
 *
 * @arg doesPlay
 * @text Play or Stop
 * @desc true:Play, false:Not Play
 * @type boolean
 * @on Play
 * @off Not Play
 * @default false
 *
 * @help
 * This plugin runs under RPG Maker MZ.
 *
 * This plugin enables player and events' footstep SE.
 * It can set different SE for each character and each region.
 * You can configure footstep SE by plugin command, note in map/event,
 * and plugin parameter.(the former is higher priority)
 * 
 * [PARAMETER]
 * - You can set default SE and whether to play player's footstep SE.
 * - This priority is lower than note and plugin commands
 * 
 * ［NOTE］
 * ・MAP
 * <StepSE:filename,volume,pitch,interval>  #=> default footstep SE in the map
 * <StepRegion<regionId>SE:filename,volume,pitch,interval>
 *  #=> default footstep SE in the specified region of the map
 * 
 * - At the map with no StepSE notation in note, defalut footstep SE becomes
 *   the one set in the plugin command, otherwise default in parameter.
 * - In order to validate map SE configuration, set the character's footstep
 *   setting be ON by either plugin command , note, or parameter.
 * - Where 'StepRegion<regionId>SE' means replace <regionId> to the number,
 *   such as StepRegion1SE or StepRegion255SE.
 * - When you describe without after : like <StepSE><StepRegion10SE>,
 *   silence is set as the default.
 * 
 * ・EVENT
 * <StepSE:filename,volume,pitch,interval> #=> default footstep SE by the event
 * <StepRegion<regionId>SE:filename,volume,pitch,interval>
 *  #=> default footstep SE at the specified region of the event
 * 
 * - You may cannot enumurate so much notations in Event's note,
 *   so I recommend you to set several event's configuration by plugin command.
 * - When you write above at a event note, the event's footstep SE
 *   is ON by default, otherwise OFF by default.
 * 
 * ・COMMON SETTING IN NOTE
 * - you can set SE to plural regions. if the region's SE is not set,
 *   it'll play default footstep SE.
 * - filename, volume, pitch, and interval are omissible.
 *  default is empty string,100,90,1.
 *  where interval set, it'll play SE for each the count step.
 * 
 * example of notations:
 * <StepSe:Coin,100>
 * <StepRegion12SE:Coin,90,150>
 * <StepRegion5SE:Noise,20,150,3>
 * 
 * [PLUGIN COMMANDS]
 * This plugin provides following plugin commands:
 * ・SET/RESET DEFAULT FOOTSTEP SE
 *   Object: default, player and event
 * ・SET/RESET REGION FOOTSTEP SE:
 *   Object: default, player, event and all of them
 *   - events' setting is all reset when map transfer performed,
 *     while player's settings are remain forever unless perform reset.
 * ・PLAY/STOP FOOTSTEP SE
 *   Object: player and event
 *   - events' setting are reset when map transform performed,
 *     while player's setting remains forever.
 * ・PLAY/STOP FOOTSTEP SE ON EVENT
 * 
 * [SUMMARY OF FOOTSTEP SE SETTING PRIORITY]
 * former is higher priority.
 * ・WHETHER TO PLAY PLAYER'S FOOTSTEP
 *  - setting by plugin command
 *  - setting in parameter (Play Player Step SE)
 * ・WHETHER TO PLAY EVENTS' FOOTSTEP
 *  - setting by plugin command
 *  - ON if setting in note, otherwise OFF
 * ・PLAYER'S FOOTSTEP SE
 *  - original situation SE when specified switch is ON(Ver1.1.0)
 *  - player's region SE set by plugin command
 *  - common region SE set by plugin command
 *  - region SE setting in the map note (StepRegion???SE)
 *  - player's SE set by plugin command
 *  - common SE setting in the map note (StepSE)
 *  - default SE set by the plugin command
 *  - parameter(Default SE Filename)
 * ・EVENT'S FOOTSTEP SE
 *  - event's region SE set by plugin command
 *  - region SE setting in the event note (StepRegion???SE)
 *  - common region SE set by plugin command
 *  - region SE setting in the map note (StepRegion???SE)
 *  - event's SE set by plugin command
 *  - common SE setting in the event note (StepSE)
 *  - common SE setting in the map note (StepSE)
 *  - default SE set by the plugin command
 *  - parameter(Default SE Filename)
 * 
 * [Advanced Option]
 * Add special situation to player.
 * When specified switch is ON, its setting is the highest priority.
 * 
 * [CAUTION]
 * SE files set in either map/event note or plugin command may be excluded
 * when check 'Exclude unused files' option at deproyment!
 * To prevent this, for example, make dummy event and set SE files at
 * command 'Play SE'.
 *
 * [Advanced Option] (Ver1.1.0以降)
 * This plugin can work with AudioSource.js by Kuramubon.
 * See: https://forum.tkool.jp/index.php?threads/4260/ (Jpn. site)
 * AudioSource.js is the plugin that changes SE's volume and pan dynamically
 * based on specified sound source position and listening character's one.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MZ
 * @plugindesc [Ver1.1.0]プレイヤーとイベントの足音を演奏します
 * @author 神無月サスケ
 * 
 * @param Play Player Step SE
 * @text プレイヤーの足音ON？
 * @desc デフォルトでプレイヤーの足音を出す？
 * @type boolean
 * @on する
 * @off しない
 * @default false
 * 
 * @param Default SE Filename
 * @text デフォルトの足音SE
 * @desc デフォルトの足音SEファイル名
 * @default Equip2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param Default Volume
 * @text 足音ボリューム
 * @parent Default SE Filename
 * @desc デフォルトの足音ボリューム 
 * @type number
 * @min 0
 * @max 100000
 * @default 20
 * 
 * @param Default Pitch
 * @text 足音ピッチ
 * @parent Default SE Filename
 * @desc デフォルトの足音ピッチ
 * @type number
 * @min 0
 * @max 100000
 * @default 60
 * 
 * @param Default Interval
 * @text インターバル歩数
 * @desc デフォルトのインターバル。n歩ごとにSEを演奏
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Enable in EventRunning
 * @text イベント中演奏？
 * @desc イベント中に音を出すか
 * @type boolean
 * @on する
 * @off しない
 * @default false
 * 
 * @param Original Situation Switch ID
 * @text 浮遊時スイッチID
 * @desc このスイッチがONの際、浮遊状態とみなされ、オリジナルの足音を演奏します。0の時は常になりません。
 * @type switch
 * @min 0
 * @default 1

 * @param Original Situation SE Filename
 * @text 浮遊時の足音SE
 * @desc 浮遊時の足音SEファイル名
 * @parent Original Situation Switch ID
 * @default Down2
 * @require 1
 * @dir audio/se/
 * @type file
 * 
 * @param Original Situation Volume
 * @text 浮遊時のボリューム
 * @parent Original Situation Switch ID
 * @desc 浮遊時の足音ボリューム 
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param Original Situation Pitch
 * @text 浮遊時の足音ピッチ
 * @parent Original Situation Switch ID
 * @desc 浮遊時の足音ピッチ
 * @type number
 * @min 0
 * @max 100000
 * @default 150
 *
 * @param Original Situation Interval
 * @text 浮遊時インターバル歩数
 * @parent Original Situation Switch ID
 * @desc 浮遊時のインターバル。n歩ごとにSEを演奏
 * @type number
 * @min 1
 * @default 1
 * 
 * @command setStepSound
 * @text デフォルト足音の一時的変更
 * @desc 
 *
 * @arg target
 * @text ターゲット
 * @desc 足音変更対象
 * @type select
 * @option デフォルト
 * @value default
 * @option プレイヤー
 * @default player
 * @option イベント
 * @default event
 * @default default
 *
 * @arg eventId
 * @text イベントID
 * @desc ターゲットをイベントにした時のIDです。
 * それ以外では無視されます。
 * @type number
 * @min 1
 * @default 1
 *
 * @arg se
 * @text 変更後SE
 * @desc 変更するSEとインターバル
 * @type struct<Audio>
 * @default
 * 
 * @command resetStepSound
 * @text デフォルト足音のリセット
 * @desc 
 *
 * @arg target
 * @text ターゲット
 * @desc 足音リセット対象
 * @type select
 * @option デフォルト
 * @value default
 * @option プレイヤー
 * @default player
 * @option イベント
 * @default default
 *
 * @arg eventId
 * @text イベントID
 * @desc ターゲットをイベントにした時のIDです。
 * それ以外では無視されます。
 * @type number
 * @min 1
 * @default 1
 *
 * @command setRegionStepSound
 * @text リージョン関係の足音の一時的変更
 * @desc 
 *
 * @arg regionId
 * @text リージョンID
 * @desc 足音を変更するリージョンID
 * @type number
 * @min 1
 * @default 1
 *
 * @arg target
 * @text ターゲット
 * @desc 足音変更対象
 * @type select
 * @option 共通
 * @value default
 * @option プレイヤー
 * @value player
 * @option イベント
 * @value event
 * @option 全て
 * @value all
 * @default all
 *
 * @arg eventId
 * @text イベントID
 * @desc ターゲットをイベントにした時のIDです。
 * それ以外では無視されます。
 * @type number
 * @min 1
 * @default 1
 *
 * @arg se
 * @text 変更後SE
 * @desc 変更するSEとインターバル
 * @type struct<Audio>
 * @default
 * 
 * @command resetRegionStepSound
 * @text リージョン関係の足音のリセット
 * @desc 
 *
 * @arg regionId
 * @text リージョンID
 * @desc 足音をリセットするリージョンID
 * @type number
 * @min 1
 * @default 1
 *
 * @arg target
 * @text ターゲット
 * @desc 足音リセット対象
 * @type select
 * @option デフォルト
 * @value default
 * @option プレイヤー
 * @value player
 * @option イベント
 * @value event
 * @option そのリージョンの全て
 * @default all
 *
 * @arg eventId
 * @text イベントID
 * @desc ターゲットをイベントにした時のIDです。
 * それ以外では無視されます。
 * @type number
 * @min 1
 * @default 1
 *
 * @command playOrStop
 * @text 設定音の演奏開始・停止
 * @desc
 *
 * @arg isPlay
 * @text 開始？終了？
 * @desc true＝開始、false＝終了
 * @type boolean
 * @on 演奏開始
 * @off 終了
 * @default true
 *
 * @arg targetEventId
 * @text イベントID
 * @desc 対象のイベントID。-1を指定するとプレイヤーになります。
 * @type number
 * @min -1
 * @default -1
 *
 * @command playOnEvent
 * @text イベント中の足音設定変更
 * @desc
 *
 * @arg doesPlay
 * @text 演奏する？
 * @desc イベント中にも足音を演奏するか
 * @type boolean
 * @on する
 * @off しない
 * @default false
 *
 * @help
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * プレイヤーとイベントの足音の設定を行います。
 * リージョン毎の指定も可能なのが特徴です。
 * 優先順位順にプラグインコマンド、マップやイベントでのメモ、
 * パラメータでの設定が可能です。
 * 
 * [パラメータ]
 * - デフォルトのSEおよびプレイヤーの演奏の是非を設定
 * - メモやプラグインコマンドに設定がある場合、そちらが優先
 * 
 * ［メモ］
 * ・マップ
 * <StepSE:filename,volume,pitch,interval> マップ内のデフォルトの足音を設定
 * <StepRegion<regionId>SE:filename,volume,pitch,interval> マップ内の
 *  指定したリージョンでの足音を設定
 * 
 * - StepSE設定のないマップでは「パラメータまたはプラグインコマンドで設定した
 *   デフォルト」に
 * - マップのメモに設定があっても、自動的にはONにならない。
 *   プラグインコマンドで各キャラをONにする必要あり
 * - StepRegion<regionId>SE とは、StepRegion1SE やStepRegion255SE のように
 *   RegionIdを指定する形式のこと
 * - <StepSE><StepRegion10SE>のように : 以下を省略した場合、無音が設定される
 * 
 * ・イベント
 * <StepSE:filename,volume,pitch,interval> イベントのデフォルトの足音を設定
 * <StepRegion<regionId>SE:filename,volume,pitch,interval>
 *  イベントの指定したリージョンでの足音を設定
 * 
 * - イベントのメモに設定がある場合、デフォルトで足音ON。そうでない場合、OFF
 * - イベントのメモ欄に多数は書けないので、
 *   イベントのリージョンを多数指定したい場合、
 *   いくつかはプラグインコマンドで書くといい
 * 
 * ・メモ共通
 * - リージョンは複数指定可能。指定のないリージョンではデフォルトの足音を採用
 * - filename,volume,pitch,interval は省略可。
 *  省略の場合 空文字,100,90,1が設定される。
 *  interval とは何歩毎にSEを演奏するか
 * 
 * 例：
 * <StepSe:Coin,100>
 * <StepRegion12SE:Coin,90,150>
 * <StepRegion5SE:Noise,20,150,3>
 * 
 * [プラグインコマンド]
 * 以下のコマンドが準備されています。
 * ・デフォルト足音の一時的変更
 *   対象：デフォルト、プレイヤー、イベント
 * ・デフォルト足音のリセット
 * ・リージョン関係の足音の一時的変更
 *   リージョンを選択して足音を変更します。
 *   対象：デフォルト、プレイヤー、イベント、全て
 *   - イベントの設定は、マップ移動が行われると、自動的にリセット
 *   - プレイヤー、リージョンの設定はマップ移動が行われても持続。
 *     よってマップの設定に変更したい場合下記のコマンドでリセットを行うこと
 * ・リージョン関係の足音のリセット
 * ・設定音の演奏・停止の変更
 *   対象：プレイヤー、イベント
 *   - プレイヤーの設定は持続する。イベントの設定はマップ移動で自動的にリセット
 * ・イベント中足音演奏・停止の変更
 *
 * [拡張機能]
 * オプションに特別な状態（例：浮遊状態）用のスイッチを追加。
 * プレイヤーの足音演奏時、この設定が最優先されます。
 * 
 * [足音決定の優先順位の整理]
 * 設定がいろいろ複雑なので、優先順位を確認してください。
 * これで不便な場合、プラグイン作者までご連絡ください。
 * 
 * ・プレイヤーの足音を演奏するか
 *  - プラグインコマンドでの設定が優先
 *  - プラグインコマンドで設定しない場合、パラメータの設定
 * ・イベントの足音を演奏するか
 *  - プラグインコマンドでの設定が優先
 *  - プラグインコマンドで設定していない場合、イベントのメモに記述があればON、
 *    なければOFF
 * ・プレイヤーの足音
 *  - 浮遊時のスイッチONの際の足音(Ver1.1.0で追加)
 *  - プラグインコマンドでのプレイヤーのリージョンSE
 *    (set で設定、 reset で設定解除。以下のプラグインコマンドも同様)
 *  - プラグインコマンドでの共通リージョンのSE
 *  - マップのメモのStepRegion???SE
 *  - プラグインコマンドでのプレイヤーのSE
 *  - マップのメモのStepSE
 *  - プラグインコマンドでのデフォルトのSE
 *  - パラメータ(デフォルトの足音SE)
 * ・イベントの足音
 *  - プラグインコマンドでのイベントのリージョンSE
 *  - イベントのメモでのStepRegion???SE
 *  - プラグインコマンドでの共通リージョンSE
 *  - マップのメモのStepRegion???SE
 *  - プラグインコマンドでのイベントのSE
 *  - イベントのメモでのStepSE
 *  - マップのメモのStepSE
 *  - プラグインコマンドでのデフォルトのSE
 *  - パラメータ(デフォルトの足音SE)
 * 
 * [注意]
 * - プラグインコマンドやメモで設定したSEファイルは不要ファイル削除ツールに
 *   必要ファイルとして登録されない。不要ファイル削除ツールを使う想定の場合
 *   ダミーのイベントを作成し、そこで設定するなど工夫が必要
 *
 * [連携可能なプラグイン] (Ver1.1.0以降)
 * くらむぼん様の AudioSource.js と併用が可能です。
 * https://forum.tkool.jp/index.php?threads/4260/
 * AudioSource.js は音源の位置を設定し、そのキャラのいる場所に基づいて
 * ボリュームや位相を変更するプラグインです。
 *
 * [ライセンス表記]
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

 /*~struct~Audio:
 *
 * @param filename
 * @desc file name of SE
 * @type file
 * @dir audio/se/
 * @default 
 * 
 * @param volume
 * @desc (Default:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param pitch
 * @desc (Default:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param interval
 * @desc It'll play SE for each this count step.
 * @type number
 * @min 1
 * @default 1
 */

 /*~struct~Audio:ja:
 *
 * @param filename
 * @text ファイル名
 * @desc SEのファイル名
 * @type file
 * @dir audio/se/
 * @default 
 * 
 * @param volume
 * @text ボリューム
 * @desc (既定値:90)
 * @type number
 * @min 0
 * @max 100000
 * @default 90
 * 
 * @param pitch
 * @text ピッチ
 * @desc (既定値:100)
 * @type number
 * @min 10
 * @max 100000
 * @default 100
 *
 * @param interval
 * @text インターバル歩数
 * @desc デフォルトのインターバル。n歩ごとにSEを演奏
 * @type number
 * @min 1
 * @default 1
 */

(() => {
  const pluginName = 'PlayStepSeMZ';
  //
  // process options
  //
  const parameters = PluginManager.parameters(pluginName);
  const defaultPlayerStepSeEnabled = !!eval(parameters['Play Player Step SE']);
  const playStepSeOnEvent = !!eval(parameters['Enable in EventRunning']);
  let defaultStepSe = {};
  defaultStepSe.name = parameters['Default SE Filename'] || '';
  defaultStepSe.volume = Number(parameters['Default Volume'] || 90);
  defaultStepSe.pitch = Number(parameters['Default Pitch'] || 100);
  defaultStepSe.interval = Number(parameters['Default Interval'] || 1);
  // Added options at Ver1.1.0 on MV ver.
  const specialSwitchId = +(parameters['Original Situation Switch ID'] || 1);
  let specialStepSe = {};
  specialStepSe.name = parameters['Original Situation SE Filename'] || '';
  specialStepSe.volume = Number(parameters['Original Situation Volume'] || 90);
  specialStepSe.pitch = Number(parameters['Original Situation Pitch'] || 100);
  specialStepSe.interval = +(parameters['Original Situation Interval'] || 1);

  //
  // process plugin commands
  //
  const argsToSe = audio => {
    if (!audio) {
      return audio;
    }
    const audio2 = JsonEx.parse(audio);
    let se = {};
    se.name = audio2.filename;
    se.volume = +audio2.volume;
    se.pitch = +audio2.pitch;
    se.interval = +audio2.interval;
    return se;
  };

  PluginManager.registerCommand(pluginName, 'setStepSound', args => {
    switch (args.target) {
    case 'default':
      $gameMap.stepDefalutSeByCommand = argsToSe(args.se);
      break;
    case 'player':
      $gamePlayer.stepSeByCommand = argsToSe(args.se);
      break;
    case 'event':
      const event = $gameMap.event(args.eventId);
      event.stepSeEnabled = true;
      event.stepSeByCommand = argsToSe(args.se);
      break;
    }
  });

  PluginManager.registerCommand(pluginName, 'resetStepSound', args => {
    switch (args.target) {
    case 'default':
      $gameMap.stepDefalutSeByCommand = null;
      break;
    case 'player':
      $gamePlayer.stepSeByCommand = null;
      break;
    case 'event':
      const event = $gameMap.event(+args.eventId);
      event.stepSeEnabled = true;
      event.stepSeByCommand = null;
      break;
    }
  });

  const setRegionMap = (id, se) => {
    $gameMap.stepRegionSeByCommand = $gameMap.stepRegionSeByCommand || [];
    $gameMap.stepRegionSeByCommand[id] = argsToSe(se);
  };

  const setRegionPlayer = (id, se) => {
    $gamePlayer.stepRegionSeByCommand =
      $gamePlayer.stepRegionSeByCommand || [];
    $gamePlayer.stepRegionSeByCommand[id] = argsToSe(se);
  };

  const setRegionEvent = (event, se) => {
    event.stepRegionSeByCommand = event.stepRegionSeByCommand || [];
    event.stepRegionSeByCommand[id] = argsToSe(se);
  };

  const setRegionCommand = (args, se) => {
    const id = +args.regionId;
    switch (args.target) {
    case 'default':
      setRegionMap(id, se);
      break;
    case 'player':
      setRegionPlayer(id, se);
      break;
    case 'event':
      setRegionEvent($gameMap.event(+args.eventId), se);
      break;
    case 'all':
      setRegionMap(id, se);
      setRegionPlayer(id, se);
      $gameMap.events().forEach(event => setRegionEvent(event, se));
      break;
    }
  };

  PluginManager.registerCommand(pluginName, 'setRegionStepSound', args => {
    setRegionCommand(args, args.se);
  });

  PluginManager.registerCommand(pluginName, 'resetRegionStepSound', args => {
    setRegionCommand(args, null);
  });

  PluginManager.registerCommand(pluginName, 'playOrStop', args => {
    const target = target > 0 ? $gameMap.event(+args.targetEventId) :
      $gamePlayer;
    if (target) {
      target.stepEnabledByCommand = eval(args.isPlay);
    }
  });

  PluginManager.registerCommand(pluginName, 'playOnEvent', args => {
    $gameSystem.playStepSeOnEvent = eval(args.doesPlay);
  });

  //
  // routine to process note
  //
  const noteValueToSe = value => {
    if (value === true) {
      return {name:'', volume:90, pitch:100};
    } else if (value) {
      const arr = value.split(',');
      let se = {};
      se.name = arr[0];
      se.volume = Number(arr[1] || 90); 
      se.pitch = Number(arr[2] || 100); 
      se.interval = Number(arr[3] || 1); 
      return se;
    }
    return null;
  }

  const processNote = meta => {
    if (!meta) { // when note is not set (ex.event test mode)
      return false;
    }
    let someoneSet = false;
    // general setting
    this.stepSeInMemo = noteValueToSe(meta.StepSE);
    if (this.stepSeInMemo) {
      someoneSet = true;
    }
    // region setting
    for (let i = 1; i <= 255; i++) {
      const se = noteValueToSe(meta['StepRegion' + i + 'SE']);
      if (se) {
        this.stepRegionSeInMemo[i] = se;
        someoneSet = true;
      }
    }
    return someoneSet;
  };

  //
  // define variables for options (and set note)
  //
  const _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.stepSeInMemo = null;
    this.stepRegionSeInMemo = [];
    this.stepRegionSeByCommand = [];
    this.stepDefalutSeByCommand = null;
    processNote.call(this, $dataMap.meta);
  };

  const _Game_CharacterBase_initMembers = 
    Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this.stepSeEnabledByCommand = null;
    this.stepSeByCommand = null;
    this.stepRegionSeByCommand = [];
    this.stepEnabledByCommand = null;
    this.stepCount = 0;
  };

  const _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    this.stepSeEnabled = false;
    this.stepSeInMemo = null;
    this.stepRegionSeInMemo = [];
  };

  const _Game_Event_initialize = Game_Event.prototype.initialize;
  Game_Event.prototype.initialize = function(mapId, eventId) {
    _Game_Event_initialize.call(this, mapId, eventId);
    this.stepSeEnabled = processNote.call(this, this.event().meta);
  };

  const _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this.playStepSeOnEvent = null;
  };

  //
  // check routine whether to play sound or not
  //
  Game_CharacterBase.prototype.stepSoundEnabled = function() {
    return false;
  };

  Game_Player.prototype.stepSoundEnabled = function() {
    if (this.stepEnabledByCommand != null) {
      return this.stepEnabledByCommand;
    } else {
      return defaultPlayerStepSeEnabled;
    }
  };

  Game_Event.prototype.stepSoundEnabled = function() {
    if (this.stepEnabledByCommand != null) {
      return this.stepEnabledByCommand;
    } else {
      return !!this.stepSeEnabled;
    }
  };

  //
  // sound finding routine
  //
  Game_CharacterBase.prototype.stepSound = function(regionId) {
    return {name:'', volume:90, pitch:100};
  };

  Game_Player.prototype.stepSound = function(regionId) {
    let se;
    if (specialSwitchId && $gameSwitches.value(specialSwitchId)) {
      return specialStepSe;
    } else if ((se = this.stepRegionSeByCommand) && se[regionId]) {
      return se[regionId];
    } else if ((se = $gameMap.stepRegionSeByCommand) && se[regionId]) {
      return se[regionId];
    } else if ((se = $gameMap.stepRegionSeInMemo) && se[regionId]) {
      return se[regionId];
    } else if (se = this.stepSeByCommand) {
      return se;
    } else if (se = $gameMap.stepSeInMemo) {
      return se;
    } else if (se = $gameMap.stepDefalutSeByCommand) {
      return se;
    } else {
      return defaultStepSe;
    }
  };

  Game_Event.prototype.stepSound = function(regionId) {
    let se;
    if ((se = this.stepRegionSeByCommand) && se[regionId]) {
      return se[regionId];
    } else if ((se = this.stepRegionSeInMemo) && se[regionId]) {
      return se[regionId];
    } else if ((se = $gameMap.stepRegionSeByCommand) && se[regionId]) {
      return se[regionId];
    } else if ((se = $gameMap.stepRegionSeInMemo) && se[regionId]) {
      return se[regionId];
    } else if (se = this.stepSeByCommand) {
      return se;
    } else if (se = this.stepSeInMemo) {
      return se;
    } else if (se = $gameMap.stepSeInMemo ) {
      return se;
    } else if (se = $gameMap.stepDefalutSeByCommand ) {
      return se;
    } else {
      return defaultStepSe;
    }
  };

  //
  // judge occasion and interval routine
  //
  const _playStepSeOnEvent = () => {
    if ($gameSystem.playStepSeOnEvent != null) {
      return $gameSystem.playStepSeOnEvent;
    }
    return playStepSeOnEvent;
  };

  const stepSoundOccasionOK = () => {
    if (!_playStepSeOnEvent() && $gameMap.isEventRunning()) {
      return false;
    }
    return true;
  };

  const stepSoundIntervalMet = audio => {
    if (!audio.interval || audio.interval === 1) {
      return true;
    } else {
      return this.stepCount % audio.interval === 0;
    }
  };

  //
  // Added process for this version
  //
  const playSe = (audio, target) => {
    // whether to that AudioSource.js is included or not.
    if ("playAdjustSe" in AudioManager) {
      AudioManager.playAdjustSe(audio, target);
    } else {
      AudioManager.playSe(audio);
    }
  };

  //
  // routine at each step
  //
  const _Game_CharacterBase_increaseSteps =
    Game_CharacterBase.prototype.increaseSteps;
  Game_CharacterBase.prototype.increaseSteps = function() {
    _Game_CharacterBase_increaseSteps.call(this);
    this.stepCount = this.stepCount || 0;
    this.stepCount++;
    if (this.stepSoundEnabled() && stepSoundOccasionOK()) {
      const audio = this.stepSound(this.regionId());
      if (audio && stepSoundIntervalMet.call(this, audio)) {
        playSe(audio, this);
      }
    }
  };

})();
