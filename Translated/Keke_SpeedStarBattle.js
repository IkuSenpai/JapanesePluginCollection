//=============================================================================
// Keke_SpeedStarBattle - スピードスターバトル
// バージョン: 2.1.4
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 流れるように疾走する快速バトル
 * @author ケケー
 * @url http://kekeelabo.com
 *
 *
 *
 * @help
 * 【ver.2.1.4】
 * 流れるように疾走する快速バトル
 * スピード調整も柔軟
 * ツクールMZ/MV両対応
 *
 *
 *
 * ◉ 特徴 ◉
 *
 * ■なめらかで速い
 * ◎早送りではなく、各キャラ同時に行動していくという形で高速化を実現
 * そのため、なめらかな動きのままで速い
 * ◎普通に早送りもできる
 *
 * ■柔軟なスピード調整
 * ◎ゲーム中、動的にバトルスピードを変更できる
 * ザコ戦は速め、ボス戦はじっくりめなど
 * ◎オプションでバトルスピードを変更できる
 * プレイヤーの好みでスピード調整させることが可能
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * ■バトルウェイト
 * 本プラグイン では、素の状態では各キャラ一斉に行動する
 * ただそれでは何が何やらわからないので、行動ごとにウェイトをかける
 * このウェイトが『バトルウェイト』
 * 30 なら 30フレーム 待ったあと次のキャラが行動する
 * バトルウェイトを変えることでバトルスピードを自在に調整できる
 * ウェイトが少ないほど速く、多いほど遅くなる
 *
 * ⚫︎バトルウェイト補正
 * スキル(アイテム)のエフェクトの長さに応じてウェイトに補正をかける
 * 長いエフェクトほどウェイトも長く、短いエフェクトは短く
 * プラグインパラメータ → ◉バトルウェイト → バトルウェイト補正
 * で補正の大きさを設定できる
 * 
 * ⚫︎基本のバトルウェイトを設定
 * => プラグインパラメータ → ◉バトルウェイト → 基本バトルウェイト
 * バトルウェイト乱数も設定するとウェイトの長さをランダムにできる
 *
 * ⚫︎スキル(アイテム)個別にバトルウェイトを設定
 * スキル(アイテム)のメモ欄に
 * <バトルウェイト: 値>
 * 例: 
 * <バトルウェイト: 60>
 * バトルウェイトが 30 加算される
 *
 * ⚫︎実際のバトルウェイト値
 * 基本のバトルウェイト + スキル(アイテム)のバトルウェイト
 * つまり合計
 *
 * ※ バトルウェイトが 0 になると、
 * プラグインコマンドやオプションでのスピード調整が無意味になってしまう
 * 0 に何をかけても 0 だからである
 *
 *
 * ■各動作速度
 * ◎スキル(アイテム)のアニメーション
 * ◎バトラーの移動、モーション、エフェクト
 * の動作速度を調整できる。2 なら 2倍速に、0.5 なら 0.5倍速になる
 *
 * ⚫︎スキル(アイテム)ごとにアニメ速度を設定
 * スキル(アイテム)のメモ欄に
 * <アニメ速度: 値>
 * 例: 
 * <動作速度: 2>
 * アニメ速度が 2倍速 になる
 *
 * ⚫︎アニメ速度は演出の速度であり、バトル進行速度には影響しない
 * バトルスピードを決めるのはあくまでバトルウェイト
 *
 *
 * ■タイムプログレス速度
 * タイムプログレスバトルの進行速度を調整できる
 *
 * ⚫︎タイムオートファスト
 * タイムプログレスバトル時用の機能
 * 誰もコマンド入力や行動をしていない無意味な待ち時間を、
 * 自動的にゲージ速度を加速して飛ばす
 *
 *
 * ■ボタン長押し早送り
 * ボタン長押し(決定、シフト、タッチ)でバトルを加速できる
 * 1.5 なら 1.5倍速 に、 0.5 なら 0.5倍速 になる
 * 早送りという名前だが遅くすることも可能
 * => プラグインパラメータ → ◉ボタン長押し早送り → 早送り倍率
 * で早送りの速さを設定できる
 * 
 *
 * ■ポップウェイト
 * 行動開始からダメージポッブが出るまでの時間
 * 30 なら 30フレーム 後に出る
 * 標準では行動開始と同時にダメージポップが出るが、
 * 演出的にそれではおかしい場合に使う
 *
 * ⚫︎スキル(アイテム)個別にポップウェイトを設定
 * スキル(アイテム)のメモ欄に
 * <ポップウェイト: 値>
 * 例: 
 * <ポップウェイト: 60>
 * ポップウェイトが 60 になる
 *
 *
 * ■コラプスウェイト
 * 敵のコラプス(崩壊エフェクト)の待ち時間
 * 標準ではすぐに次のキャラの行動へいくが、
 * ボスのコラプスはしっかり見せたいという時などに使う
 *
 * ⚫︎敵キャラ個別にコラプスウェイトを設定
 * 敵キャラのメモ欄に
 * <コラプスウェイト: 値>
 * 例: 
 * <コラプスウェイト: 60>
 * コラプスウェイトが 60 になる
 *
 *
 * ■ゲーム中にバトルスピードを変更
 * ⚫︎MZの場合
 * => プラグインコマンド → バトルスピード変更  → バトルスピード
 * ⚫︎MVの場合
 * => プラグインコマンド
 * battleSpeedSpsb 速度率
 * 例: 
 * battleSpeedSpsb 1.5
 * バトルスピードが 1.5倍 になる
 * ※Spsb は SpeedStarBattle の略
 *
 *
 * ■ゲーム中にバトル高速化を無効
 * ⚫︎MZの場合
 * => プラグインコマンド → バトルスピード変更  → 高速化無効
 * ⚫︎MVの場合
 * => プラグインコマンド
 * battleSpeedSpsb on/off
 * 例: 
 * battleSpeedSpsb off
 * バトル高速化が無効になる。on で有効に戻す
 *
 *
 * ■オプションでバトルスピードを変更
 * => プラグインパラメータ → ⚫︎オプション → オプション追加リスト
 * 標準でバトルスピード項目が追加されている
 * 必要ないなら消す
 * ※MVではなし
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * @param ◉バトルウェイト
 *
 * @param 基本バトルウェイト
 * @parent ◉バトルウェイト
 * @desc 行動ごとにかかるウェイトの基本値。5 なら 5フレーム のウェイトが加算される。初期値 30
 * @default 30
 *
 * @param バトルウェイト補正(短)
 * @parent ◉バトルウェイト
 * @desc エフェクトの長さに応じてバトルウェイトに補正をかける。そのウェイトか縮まる場合の補正率。初期値 1
 * @default 1
 *
 * @param バトルウェイト補正(長)
 * @parent ◉バトルウェイト
 * @desc エフェクトの長さに応じてバトルウェイトに補正をかける。そのウェイトが伸びる場合の補正率。初期値 0.25
 * @default 0.25
 *
 * @param バトルウェイト乱数
 * @parent ◉バトルウェイト
 * @desc 行動ごとにかかるウェイトの乱数。5 なら -5〜0フレーム のウェイトが加算される。初期値 0
 * @default 0
 *
 * @param ◉各動作速度
 *
 * @param アニメ速度
 * @parent ◉各動作速度
 * @desc スキル(アイテム)のアニメーションの速さ。1.5 なら 1.5倍 の速さになる。初期値 1.1
 * @default 1.1
 *
 * @param ムーブ速度
 * @parent ◉各動作速度
 * @desc バトラーの移動前に一歩出たりとか)の速さ。1.5 なら 1.5倍 の速さになる。初期値 1.1
 * @default 1.1
 *
 * @param モーション速度
 * @parent ◉各動作速度
 * @desc バトラーのモーションの速さ。1.5 なら 1.5倍 の速さになる。初期値 1.1
 * @default 1.1
 *
 * @param エフェクト速度
 * @parent ◉各動作速度
 * @desc バトラーのエフェクト(コラプスとか)の速さ。1.5 なら 1.5倍 の速さになる。初期値 1.1
 * @default 1.1
 *
 * @param ◉タイムプログレス速度
 *
 * @param タイムゲージ速度
 * @parent ◉タイムプログレス速度
 * @desc タイムゲージが溜まる速さ。1.5 なら 1.5倍 の速さになる。初期値 1
 * @default 1
 *
 * @param タイムオートファスト
 * @parent ◉タイムプログレス速度
 * @desc タイムプログレスの待ち時間に加速する。その加速率。1.5 なら 1.5倍 に加速。初期値 5
 * @default 5
 *
 * @param ◉ボタン長押し早送り
 *
 * @param 早送り倍率
 * @parent ◉ボタン長押し早送り
 * @desc ボタン長押し(決定、シフト、タッチ)でのバトルウェイト補正。0.5 なら 0.5倍 のウェイト量になる。0 だとノーウェイト。初期値 5
 * @default 5
 *
 * @param ◉ポップウェイト
 *
 * @param 基本ポップウェイト
 * @parent ◉ポップウェイト
 * @desc ダメージポップが出るまでの時間。5 なら 5フレーム後 に出る。初期値 20
 * @default 20
 *
 * @param ◉コラプスウェイト
 *
 * @param 通常コラプスウェイト
 * @parent ◉コラプスウェイト
 * @desc 通常コラプス時の次にいくまでの時間。5 なら 5フレーム 待って次へ。-1 ならコラプス終了まで待つ。初期値 0
 * @default 0
 *
 * @param ボスコラプスウェイト
 * @parent ◉コラプスウェイト
 * @desc ボスコラプス時の次にいくまでの時間。5 なら 5フレーム 待って次へ。-1 ならコラプス終了まで待つ。初期値 60
 * @default 60
 *
 * @param ◉オプション
 *
 * @param オプション追加リスト
 * @parent ◉オプション
 * @desc このリストにある項目がオプションに表示される。名前を変えてもいいが、a- の部分は消してはいけない
 * @type string[]
 * @default ["a-バトルスピード"]
 *
 * @param ◉その他
 *
 * @param フロントビュー対応
 * @parent ◉その他
 * @desc 標準のフロントビューに対応し、味方側にもアニメーションやダメージポップを表示するようにする。初期値 true
 * @type boolean
 * @default true
 *
 * @param ダメージポップX
 * @parent ◉その他
 * @desc ダメージポップのX軸のずらし幅。5 なら右に 5ピクセル ずらす。初期値 0
 * @default 0
 *
 * @param ダメージポップY
 * @parent ◉その他
 * @desc ダメージポップのY軸のずらし幅。5 なら下に 5ピクセル ずらす。初期値 0
 * @default 0
 *
 * @param バトルログ無効
 * @parent ◉その他
 * @desc バトルログを非表示にするか。初期値 true
 * @type boolean
 * @default true
 *
 *
 *
 * @command バトルスピード変更
 * @desc バトルの各種速度を変更する
 *
 * @arg バトルスピード
 * @desc 総合的なバトル速度。1.5 なら 1.5倍速 になる。初期値 1
 * @default 1
 *
 * @arg 高速化無効
 * @desc バトル高速化を無効にする。初期値 false
 * @type boolean
 * @default false
 *
 *
 *
 * @command パラメータリセット
 * @desc バトルスピード関連のパラメータをリセットする
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    //- ツクールMVか
    function isMv() {
        return typeof(ColorManager) == "undefined";
    };
    
    
    //- ツクールMZか
    function isMz() {
        return typeof(ColorManager) != "undefined";
    };
    
    
    
    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    const parameters = PluginManager.parameters(pluginName);
    
    //- バトルウェイト
    const keke_battleWaitBasic = Number(parameters["基本バトルウェイト"]);
    const keke_battleWaitReviseShort = Number(parameters["バトルウェイト補正(短)"]);
    const keke_battleWaitReviseLong = Number(parameters["バトルウェイト補正(長)"]);
    const keke_battleWaitRandom = Number(parameters["バトルウェイト乱数"]);
    
    //- 各動作速度
    const keke_animeSpeed = Number(parameters["アニメ速度"]);
    const keke_moveSpeed = Number(parameters["ムーブ速度"]);
    const keke_motionSpeed = Number(parameters["モーション速度"]);
    const keke_effectSpeed = Number(parameters["エフェクト速度"]);
    
    //- タイムプログレス速度
    const keke_timeGaugeSpeed = Number(parameters["タイムゲージ速度"]);
    const keke_timeAutoFast = Number(parameters["タイムオートファスト"]);
    
    //- ボタン長押し早送り
    const keke_turboRate = Number(parameters["早送り倍率"]);
    
    //- ポップウェイト 
    const keke_popWaitBasic = Number(parameters["基本ポップウェイト"]);
    
    //- コラプスウェイト
    const keke_collapseWaitBasic = eval(parameters["通常コラプスウェイト"]);
    const keke_collapseWaitBoss = eval(parameters["ボスコラプスウェイト"]);
    
    //- オプション
    const keke_optionAddList = eval(parameters["オプション追加リスト"]);
    
    //- その他
    const keke_adaptFrontView = eval(parameters["フロントビュー対応"]);
    const keke_damagePopX = eval(parameters["ダメージポップX"]);
    const keke_damagePopY = eval(parameters["ダメージポップY"]);
    const keke_noBattleLog = eval(parameters["バトルログ無効"]);
    
    
    
    //==================================================
    //--  プラグインコマンド
    //==================================================
    
    //- バトルスピード変更
    if (isMz()) {
    PluginManager.registerCommand(pluginName, "バトルスピード変更", args => {
        const gs = $gameSystem;
        if (!gs._speedStarInitedKe) { gs.initSpeedStarBattleKe(); }
        if (args["バトルスピード"]) { gs._battleSpeedPlcKe = Number(args["バトルスピード"]); }
        if (args["高速化無効"]) { gs._noSpeedStarKe = eval(args["高速化無効"]); }
    });
    
    
    //- パラメータリセット
    PluginManager.registerCommand(pluginName, "パラメータリセット", args => {
        $gameSystem.initSpeedStarBattleKe();
    });
    };
    
    
    //- MVのプラグインコマンド(コア追加)
    if (isMv()) {
    const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        switch (command) {
            case  "battleSpeedSpsb":
                if (args[0] == "on") {
                    $gameSystem._noSpeedStarKe = false;
                } else if (args[0] == "off") {
                    $gameSystem._noSpeedStarKe = true;
                } else {
                    $gameSystem._battleSpeedPlcKe = Number(args[0]);
                }
        }
    };
    }
    
    
    
    //==================================================
    //--  共通開始
    //==================================================
    
     // ゲームシステム開始(コア追加)
    const _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.apply(this);
        // スピードスターバトルの初期化
        this.initSpeedStarBattleKe(this);
    };
    
    
    //- 戦闘開始(コア追加)
    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.apply(this);
        // スピードスターバトルの初期化
        const gs = $gameSystem;
        if (!gs._speedStarInitedKe) { gs.initSpeedStarBattleKe(); }
    };
    
    
    //- オプション開始(コア追加)
    const _Scene_Options_initialize = Scene_Options.prototype.initialize;
    Scene_Options.prototype.initialize = function() {
        _Scene_Options_initialize.apply(this);
        // スピードスターバトルの初期化
        const gs = $gameSystem;
        if (!gs._speedStarInitedKe) { gs.initSpeedStarBattleKe(); }
    };
    
    
    //- スピードスターバトルの初期化
    Game_System.prototype.initSpeedStarBattleKe = function() {
        // スピードスター無効
        this._noSpeedStarKe = false;
        // バトルスピード
        this._battleSpeedOptKe = 100;
        this._battleSpeedPlcKe = 1;
        // バトルウェイト
        this._battleWaitBscKe = keke_battleWaitBasic;
        this._battleWaitRdmKe = keke_battleWaitRandom;
        this._battleWaitSklKe = null;
        //this._battleWaitOptKe = null;
        // アニメ速度
        this._animeSpeedKe = keke_animeSpeed;
        this._animeSpeedOptKe = 1;
        // タイム速度
        this._timeSpeedKe = keke_timeGaugeSpeed;
        this._timeSpeedOptKe = 1;
        // バトルマネージャー
        const bm = BattleManager;
        bm._popWaitKe = 0;
        bm._battleWaitKe = 0;
        bm._actionAnimesKe = [];
        bm._collapseWaitKe = 0;
        // 初期化済みフラグ
        this._speedStarInitedKe = true;
    };
    
    
    
    //==================================================
    //--  プラグインデータ
    //==================================================
    
    //- バトルウェイト
    function battleWait() {
        const gs = $gameSystem;
        // 基本値×プラグインコマンド分×早押し分
        let speed = gs._battleWaitSklKe != null ? gs._battleWaitSklKe : (gs._battleWaitBscKe - Math.randomInt(gs._battleWaitRdmKe));
        speed = (Math.max(speed, 0)) * (1 / battleSpeed()) * (1 / longPressFast());
        return Math.round(speed);
    };
    
    
    //- アニメ速度
    function animeSpeed() {
        const gs = $gameSystem;
        return gs._animeSpeedKe * battleSpeed(true) * (longPressFast(true));
    };
    
    
    //- タイム速度
    function timeSpeed() {
        const gs = $gameSystem;
        return gs._timeSpeedKe * (longPressFast(true));
    };
    
    
    //- バトルスピード
    function battleSpeed(type, half) {
        const gs = $gameSystem;
        const speeds = [gs._battleSpeedOptKe / 100, gs._battleSpeedPlcKe];
        let result = [];
        speeds.forEach((speed, i) => {
            if (half) {
                result[i] = 1 + (speed - 1) / 2;
            } else {
                result[i] = speed;
            }
        }, gs);
        return result[0] * result[1];
    };
    
    
    //- ボタン長押し加速-システム
    function longPressFast(half) {
        let result = 1;
        // 長押し中は加速
        if ( Input.isLongPressed("ok") || Input.isPressed("shift") || TouchInput.isLongPressed()) {
            if (half) {
                result = 1 + (keke_turboRate - 1) / 2;
            } else {
                result = keke_turboRate;
            }
        }
        return result;
    };
    
    
    
    //==================================================
    //-- 同時行動の処理
    //==================================================
    
    //- インヴォークアクション(コア追加)
    const _BattleManager_invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        // ポップウェイト発動時でなければ
        if (!this._invokePopWaitKe && !$gameSystem._noSpeedStarKe) {
            // バトル&ポップウェイトの取得
            getBattlePopWait(subject, target);
            // 仮ターゲットの処理
            processTempTarget(subject, target);
            return
        }
        _BattleManager_invokeAction.apply(this, arguments);
    };
    
    
    //- バトル & ポップウェイトの取得
    function getBattlePopWait(subject, target) {
        if (!subject) { return; }
        const bm = BattleManager;
        const action = bm._action;
        const item = action.item();
        // アニメスピードを取得
        const aniSpeed = getAnimationSpeed();
        // ポップウェイトの取得
        const popWait = getPopWait(item, aniSpeed);
       // スキルのバトルウェイト取得
        getBattleWaitSkill(item, subject, aniSpeed);
        // ターゲットにウェイト & インヴォーク情報を適用
        const sprite = searchSpriteBattler(target);
        if (!sprite._popWaitsKe) { sprite._popWaitsKe = []; }
        sprite._popWaitsKe.push({ wait:popWait, subject:subject, action:action });
        // サブジェクトにポップウェイト中を加算
        if (subject._popWaitingKe == null) { subject._popWaitingKe = 0; }
        subject._popWaitingKe++;
    };
    
    
    //- 仮ターゲットの処理
    function processTempTarget(subject, target) {
        // プラグイン『スマートAI』がなければリターン
        if (!subject || !subject._aiRoutinesKe) { return; }
        const bm = BattleManager;
        //  仮バトラーズがなければ作成
        if (!bm._tempBattlersKe) { bm._tempBattlersKe = []; }
        // 仮ターゲットがなければ作成
        if (!target._tempBattlerKe) {
            target._tempBattlerKe = makeTempBattler(target);
            bm._tempBattlersKe.push(target);
        }
        // 仮サブジェクトがなければ作成
        if (!subject._tempBattlerKe) {
            subject._tempBattlerKe = makeTempBattler(subject);
            bm._tempBattlersKe.push(subject);
        }
        // 仮アプリー
        bm._action._isTempApplyKe = true;
        bm._action.apply(target._tempBattlerKe);
        bm._action._isTempApplyKe = false;
    };
    
    
    //- 仮バトラーの作成
    function makeTempBattler(battler) {
        // 影マスター対応
        const kage = battler._kageMasterKe;
        battler._kageMasterKe = null;
        const tempBattler = JsonEx.makeDeepCopy(battler);
        tempBattler._isTempKe = true;
        tempBattler._oriBattlerKe = battler;
        battler._kageMasterKe = kage;
        return tempBattler;
    };
    
    
    //- 仮アプリー中はTP変動させない(コア追加)
    const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function(target) {
        if (this._isTempApplyKe) { return; }
        _Game_Action_applyItemUserEffect.apply(this, arguments);
    };
    
    
    //- 仮サブジェクトの取得(コア追加)
    const _BattleManager_subject = BattleManager.subject;
    BattleManager.subject = function() {
        let subject = _BattleManager_subject.apply(this);
        if (subject._tempBattlerKe) { subject = subject._tempBattlerKe; }
        return subject;
    };
    
    
    //- ポップウェイトの取得
    function getPopWait(item, aniSpeed) {
        const bm = BattleManager;
        // 基本設定を取得
        let popWait = keke_popWaitBasic;
        // メモから取得
        const popMemo = item.meta["ポップウェイト"] || item.meta["popWait"];
        popWait = popMemo != null ? Number(popMemo) : popWait;
        // チェイン時はチェインウェイト取得
        if (bm._skillChainNumKe) {
            const chainMemo = item.meta["チェインウェイト"] || item.meta["chainWait"];
            popWait += chainMemo != null ? Number(chainMemo) * bm._skillChainNumKe : 0;
        }
        // アニメ速度による補正
        if (popWait > 0) {
            popWait = Math.round(popWait / aniSpeed);
        }
        // マネージャーに保存
        bm._popWaitKe = popWait;
        return popWait;
    };
    
    
    //- スキルのバトルウェイト取得
    function getBattleWaitSkill(item, subject, aniSpeed) {
        const bm = BattleManager;
        // メモからバトルウェイトを取得
        const btwMemo = item.meta["バトルウェイト"] || item.meta["battleWait"];
        $gameSystem._battleWaitSklKe = btwMemo ? Number(btwMemo) : null; 
        if (btwMemo) {
            bm._actionAnimesKe = [];
            return;
        }
        // 取得できなかったらアニメの保存
        if (!bm._actionAnimesKe) { bm._actionAnimesKe = []; }
        const animeId = item.animationId;
        // 通常攻撃アニメ
        if (animeId < 0) {
            // アクターのみ
            if (subject._actorId) {
                const atk1 = subject.attackAnimationId1();
                if (atk1) { bm._actionAnimesKe.push(atk1); }
                const atk2 = subject.attackAnimationId2();
                if (atk2) { bm._actionAnimesKe.push(atk2); }
            }
        // 通常アニメ
        } else if (animeId >= 1) {
            bm._actionAnimesKe.push({ id:animeId, speed:aniSpeed });
        }
    };
    
    
    //- エンドアクション(コア追加)
    const _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        // バトルウェイトをセット
        if (this._phase == "action" && !$gameSystem._noSpeedStarKe) {
            this._battleWaitKe = battleWait();
            // バトルウェイトの補正
            reviseBattleWait();
            // 防御ならウェイトなし
            if (this._action.item().id == this._subject.guardSkillId()) {
                this._battleWaitKe = 1;
            }
            $gameSystem._battleWaitSklKe = null;
        };
        _BattleManager_endAction.apply(this);
        // 仮バトラーの消去
        if (this._tempBattlersKe && this._tempBattlersKe.length) {
            this._tempBattlersKe.forEach(battler => battler._tempBattlerKe = null);
            this._tempBattlersKe = [];
        }
    };
    
    
    //- バトルウェイトの補正
    function reviseBattleWait() {
        const bm = BattleManager;
        if (!bm._actionAnimesKe) { return; }
        if (!bm._actionAnimesKe.length) { return; }
        let animes = bm._actionAnimesKe;
        // アニメズの重複を削除
        animes = [...new Set(animes)];
        const aniMv = $plugins.filter(p => p.name == "AnimationMv")[0];
        const dynamicMv = $plugins.filter(p => p.name == "NRP_DynamicAnimationMV2MZ")[0];
        let maxTiming = null;
        // 最大タイミングを取得
        animes.forEach(a => {
            let animation = $dataAnimations[a.id];
            let timing = null;
            if (isEmptyAnimation(animation) && (aniMv || dynamicMv)) {
                const mvAnimes = window[ '$dataMvAnimations'];
                if (!mvAnimes || !mvAnimes[a.id]) { return; }
                timing = mvAnimes[a.id].frames.length + 1;
            } else {
                timing = getAnimeMaxTimingKe(animation);
            }
            timing = timing / a.speed;
            if (timing > maxTiming) { maxTiming = timing; }
        }, bm);
        // 補正計算
        let wait = bm._battleWaitKe;
        const reviseOn = (keke_battleWaitReviseShort || keke_battleWaitReviseLong) && $gameSystem._battleWaitSklKe == null;
        if (maxTiming != null && reviseOn) {
            let reviseWait = wait * (maxTiming - 60) / 60;
            reviseWait = reviseWait > 0 ? reviseWait * keke_battleWaitReviseLong : reviseWait * keke_battleWaitReviseShort;
            wait = wait + reviseWait;
        }
        bm._battleWaitKe = Math.round(wait);
        // アニメズを消去
        bm._actionAnimesKe = [];
    };
    
    
    //- アニメがないか
    function isEmptyAnimation(animation) {
        return animation && !animation.effectName && (!animation.flashTimings || animation.flashTimings.length === 0) && (!animation.soundTimings || animation.soundTimings.length === 0);
    }
    
    
    //- アニメの最大タイミングの取得
    function getAnimeMaxTimingKe(animation) {
        if (!animation) { return 0; }
        // MVの場合
        if (isMv()) {
            return animation.frames.length * 4;
        };
        let maxTiming = 0;
        let end = 0;
        const timings = animation.soundTimings.concat(animation.flashTimings);
        for (const timing of timings) {
            end = timing.frame + (timing.duration ? timing.duration : 0);
            if (end > maxTiming) {
                maxTiming = end;
            }
        }
        return maxTiming;
    };
    
    
    //- ポップウェイトの更新呼び出し(コア追加)
    const _Sprite_Battler_updateDamagePopup = Sprite_Battler.prototype.updateDamagePopup;
    Sprite_Battler.prototype.updateDamagePopup = function() {
        // ポップウェイトの更新
        updatePopWait(this);
        // フロントビューでもダメージポップ有効に
        if (this._battler.isDamagePopupRequested()) {
            if (validFrontViewAdapt(this)) {
                this.createDamageSprite();
            }
        }
        _Sprite_Battler_updateDamagePopup.apply(this);
    };
    
    
    //- ポップウェイトの更新
    function updatePopWait(battlerSprite) {
        if ($gameSystem._noSpeedStarKe) { return; }
        if (!battlerSprite._popWaitsKe || !battlerSprite._popWaitsKe.length) { return; }
        // 戦闘終了したら終了
        if (BattleManager._phase == "battleEnd") {
            battlerSprite._popWaitsKe = [];
        }
        // ウェイト値を減らす
        battlerSprite._popWaitsKe.forEach((d, i) => {
            let wait = d.wait;
            battlerSprite._popWaitsKe[i].wait = --wait;
        });
        // 0になったのがあるか判定
        battlerSprite._popWaitsKe.forEach((p, i) => {
            // あったら
            if (p.wait <= 0) {
                const battler = battlerSprite._battler;
                // インヴォークアクション(特殊)
                invokeActionEx(p.subject, battler, p.action);
                // サブジェクトのポップウェイト中フラグを減らす
                p.subject._popWaitingKe--;
                // データ消去
                battlerSprite._popWaitsKe[i] = null;
            }
        });
        // null を消去
        battlerSprite._popWaitsKe = battlerSprite._popWaitsKe.filter(d => d != null);
    };
    
    
    //- ダメージポップアップをすぐ起動
    const _Window_BattleLog_popupDamage = Window_BattleLog.prototype.popupDamage;
    Window_BattleLog.prototype.popupDamage = function(target) {
        _Window_BattleLog_popupDamage.apply(this, arguments);
        if (!target.isDamagePopupRequested()) { return; }
        if ($gameTemp._fullAnimeStatusKe && $gameTemp._fullAnimeStatusKe.onDamagePop(target)) { return; }
        // ダメージポップアップのセットアッブ
        target._damagePopup = false;
        const battlerSprite = searchSpriteBattler(target);
        if (battlerSprite) {
            setupDamagePopup(target, battlerSprite);
        }
    };

    //- ダメージポップアップのセットアップ
    function setupDamagePopup(battler, battlerSprite) {
        battlerSprite.createDamageSprite();
        battler.clearDamagePopup();
        battler.clearResult();
    };
    
    
    //- アクション適用時の自己リザルトクリアを抑制(コア追加)
    let suppressResultClear = false;
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        suppressResultClear = true;
        _Game_Action_apply.apply(this, arguments);
        suppressResultClear = false;
    };
    
    
    //- ポップウェイト中はリザルトクリアしない(コア追加)
    const _Game_Battler_clearResult = Game_Battler.prototype.clearResult;
    Game_Battler.prototype.clearResult = function() {
        if (suppressResultClear && this._damagePopup) { return; }
        if ($gameParty.inBattle()) {
            const sprite = searchSpriteBattler(this);
            if (sprite && sprite._popWaitsKe && sprite._popWaitsKe.length) { return; }
        }
        _Game_Battler_clearResult.apply(this);
    };
    
    
    //- バトルウェイトの更新(コア追加)
    const _Spriteset_Battle_isAnimationPlaying = Spriteset_Battle.prototype.isAnimationPlaying;
    Spriteset_Battle.prototype.isAnimationPlaying = function() {
        if ($gameSystem._noSpeedStarKe) {
            return _Spriteset_Battle_isAnimationPlaying.apply(this);
        }
        let wait = false;
        // バトルウェイトがあるときはウェイト
        if (BattleManager._battleWaitKe) {
            BattleManager._battleWaitKe--;
            if (!BattleManager._battleWaitKe) {
                // バトルウェイトの終了
                endBattleWait();
            }
            wait = true;
        }
        // コラプスウェイトがあるときはウェイト
        if (BattleManager._collapseWaitKe) {
            BattleManager._collapseWaitKe--;
            wait = true;
        }
        return wait;
    };
    
    
    //- バトルウェイトの終了
    function endBattleWait() {
        // ログ消去予約のセット
        setLogClearAppo();
    };
    
    
    //- インヴォークアクション(特殊)
    function invokeActionEx(subject, target, action) {
        if (BattleManager._escaped) { return; }
        const bm = BattleManager;
        // 変数入れ替え
        const nowSubject = bm._subject;
        bm._subject = subject;
        const nowAction = bm._action;
        bm._action = action;
        // インヴォークアクション
        bm._invokePopWaitKe = true;
        bm.invokeAction(subject, target);
        bm._invokePopWaitKe = false;
        // 変数戻す
        bm._subject = nowSubject;
        bm._action = nowAction;
    };
    
    
    //- ログ一括実行(コア追加)
    const _Window_BattleLog_callNextMethod = Window_BattleLog.prototype.callNextMethod;
    Window_BattleLog.prototype.callNextMethod = function() {
        _Window_BattleLog_callNextMethod.apply(this);
        if ($gameSystem._noSpeedStarKe) { return; }
        // 一括処理
        while (this._methods.length > 0) {
            const method = this._methods.shift();
            // メソッド処理
            if (method.name && this[method.name]) {
                this[method.name].apply(this, method.params);
            } else {
                throw new Error("Method not found: " + method.name);
            }
        }
    };
    
    
    //- 移動待ちを無効(コア追加)
    const _Spriteset_Battle_isAnyoneMoving = Spriteset_Battle.prototype.isAnyoneMoving;
    Spriteset_Battle.prototype.isAnyoneMoving = function() {
        if (!$gameSystem._noSpeedStarKe) { return; }
        _Spriteset_Battle_isAnyoneMoving.apply(this);
    };
    
    
    //- ログのウェイトを無効(コア追加)
    const _Window_BattleLog_wait = Window_BattleLog.prototype.wait;
    Window_BattleLog.prototype.wait = function() {
        if (!$gameSystem._noSpeedStarKe) { return; }
        _Window_BattleLog_wait.apply(this);
    };
    
    
    //- ログの移動待ちを無効(コア追加)
    const _Window_BattleLog_waitForMovement = Window_BattleLog.prototype.waitForMovement;
    Window_BattleLog.prototype.waitForMovement = function() {
        if (!$gameSystem._noSpeedStarKe) { return; }
        _Window_BattleLog_waitForMovement.apply(this);
    };
    
    
    //- 入力中も全滅判定(コア追加)
    const _BattleManager_updateEvent = BattleManager.updateEvent;
    BattleManager.updateEvent = function() {
        let result = _BattleManager_updateEvent.apply(this);
        if (this._phase == "input" && this.checkBattleEnd()) {
            result = true;
        }
        return result;
    };
    
    
    //- 戦闘終了時にウェイト消去(コア追加)
    const _BattleManager_endBattle = BattleManager.endBattle;
    BattleManager.endBattle = function(result) {
        _BattleManager_endBattle.apply(this, arguments);
        this._battleWaitKe = 0;
    };
    
    
    //- ダメージモーションを中断させない(コア追加)
    const _Game_Battler_requestMotionRefresh = Game_Battler.prototype.requestMotionRefresh;
    Game_Battler.prototype.requestMotionRefresh = function() {
        const sprite = searchSpriteBattler(this);
        const motion = sprite ? sprite._motion : null;
        if (motion && motion.index == 4) { return; }
        _Game_Battler_requestMotionRefresh.apply(this);
    };
    
    const _BattleManager_updatePhase = BattleManager.updatePhase;
    BattleManager.updatePhase = function(timeActive) {
        _BattleManager_updatePhase.apply(this, arguments);
        if (this._phase == "input" && this._currentActor) {
            const actor = this._currentActor;
            if (actor.hp == 0 || actor.isRestricted()) {
                actor.refresh();
                this.selectNextCommand();
            }
        }
    };
    
    
    //- アニメエラー防止(コア追加)
    const _Sprite_Animation_targetSpritePosition = Sprite_Animation.prototype.targetSpritePosition;
    Sprite_Animation.prototype.targetSpritePosition = function(sprite) {
        if (!sprite) { return { x:0, y:0 }}
        return _Sprite_Animation_targetSpritePosition.apply(this, arguments);
    };
    
    
    //- アクターのポップウェイト中は前進維持(コア追加)
    const _Sprite_Actor_shouldStepForward = Sprite_Actor.prototype.shouldStepForward;
    Sprite_Actor.prototype.shouldStepForward = function() {
        let result = _Sprite_Actor_shouldStepForward.apply(this);
        if (this._actor._popWaitingKe) { result = true; }
        return result;
    };
    
    
    //- ログ消去予約のセット
    function setLogClearAppo() {
        const scene = SceneManager._scene;
        // ログ消去時間
        scene._logWindow._clearAppoKe = 30;
    };
    
    
    //- ログ消去予約の解除(コア追加)
    const _Window_BattleLog_clear = Window_BattleLog.prototype.clear;
    Window_BattleLog.prototype.clear = function() {
        _Window_BattleLog_clear.apply(this);
        this._clearAppoKe = null;
    };
    
    
    //- ログ消去予約の更新(コア追加)
    const _Window_BattleLog_update = Window_BattleLog.prototype.update;
    Window_BattleLog.prototype.update = function() {
        _Window_BattleLog_update.apply(this);
        if (this._clearAppoKe) {
            this._clearAppoKe--;
            if (!this._clearAppoKe) { this.clear(); }
        }
    };
    
    
    
    //==================================================
    //--  各動作速度
    //==================================================
    
    //- アニメ速度の取得
    function getAnimationSpeed(action = null) {
        if (!$gameParty.inBattle()) { return 1; }
        action = action ? action : BattleManager._action;
        const basic = Math.max(animeSpeed(), 0.1)
        if (!action) { return basic; }
        const item = action.item();
        if (!item) { return basic; }
        const note = item.meta["アニメ速度"] || item.meta["animeSpeed"];
        if (!note) { return basic; }
        const speed = Math.max(animeSpeed() * Number(note), 0.1);
        return speed;
    };
    
    
    //- アニメ作成時にアクション取得(コア追加)
    const _Sprite_Animation_initMembers = Sprite_Animation.prototype.initMembers;
    Sprite_Animation.prototype.initMembers = function() {
        _Sprite_Animation_initMembers.apply(this);
        if ($gameParty.inBattle()) {
            this._actionKe = BattleManager._action;
        }
    };
    
    
    //- アニメーション速度(コア追加)
    const _Sprite_Animation_updateEffectGeometry = Sprite_Animation.prototype.updateEffectGeometry;
    Sprite_Animation.prototype.updateEffectGeometry = function() {
        _Sprite_Animation_updateEffectGeometry.apply(this);
        if (!this._handle) { return; }
        // 初回のみアニメ速度の取得
        if (!this._animeSpeedKe) {
            this._animeSpeedKe = getAnimationSpeed(this._actionKe);
        }
        // パーティクル速度を変更
        const fastRate = Math.max(this._animation.speed / 100 * this._animeSpeedKe, 0.1);
        if (fastRate != 1) { this._handle.setSpeed(fastRate); }
    };
    
    
    //- アニメフラッシュ速度(コア追加)
    const _Sprite_Animation_processFlashTimings = Sprite_Animation.prototype.processFlashTimings;
    Sprite_Animation.prototype.processFlashTimings = function() {
        // 初回のみアニメ速度の取得
        if (!this._animeSpeedKe) {
            if (BattleManager._subject) {
                this._animeSpeedKe = getAnimationSpeed();
            }
        }
        // フラッシュタイミングを変更
        const fastRate = this._animeSpeedKe;
        if (fastRate != 1) {
            for (const timing of this._animation.flashTimings) {
                if (Math.round(timing.frame / fastRate) === this._frameIndex) {
                    this._flashDuration = Math.round(timing.duration / fastRate);
                }
            }
        // それ以外は通常
        } else {
            _Sprite_Animation_processFlashTimings.apply(this);
        }
    };
    
    
    //- アニメサウンド速度(コア追加)
    const _Sprite_Animation_processSoundTimings = Sprite_Animation.prototype.processSoundTimings;
    Sprite_Animation.prototype.processSoundTimings = function() {
        // 初回のみアニメ速度の取得
        if (!this._animeSpeedKe) {
            if (BattleManager._subject) {
                this._animeSpeedKe = getAnimationSpeed();
            }
        }
        // SEタイミングを変更
        const fastRate = this._animeSpeedKe;
        if (fastRate != 1) {
            for (const timing of this._animation.soundTimings) {
                if (Math.round(timing.frame / fastRate) === this._frameIndex) {
                    AudioManager.playSe(timing.se);
                }
            }
        } else {
            _Sprite_Animation_processSoundTimings.apply(this);
        }
    };
    
    
    //- アニメ作成時にアクション取得-MV(コア追加)
    if (isMz()) {
    const _Sprite_AnimationMV_initMembers = Sprite_AnimationMV.prototype.initMembers;
    Sprite_AnimationMV.prototype.initMembers = function() {
        _Sprite_AnimationMV_initMembers.apply(this);
        if ($gameParty.inBattle()) {
            this._actionKe = BattleManager._action;
        }
    };
    };
    
    
    //- アニメーション速度-MZ(コア追加)
    if (isMz()) {
    const _Sprite_AnimationMV_setupRate = Sprite_AnimationMV.prototype.setupRate;
    Sprite_AnimationMV.prototype.setupRate = function() {
        _Sprite_AnimationMV_setupRate.apply(this);
        // 初回のみアニメ速度の取得
        if (!this._animeSpeedKe) {
            this._animeSpeedKe = getAnimationSpeed(this._actionKe);
        }
        // 速度を変更
        this._rate = Math.round(this._rate / this._animeSpeedKe);
    };
    };
    
    
    //- アニメーション速度-MV(コア追加)
    if (isMv()) {
    const _Sprite_Animation_setupRate = Sprite_Animation.prototype.setupRate;
    Sprite_Animation.prototype.setupRate = function() {
        _Sprite_Animation_setupRate.apply(this);
        // 初回のみアニメ速度の取得
        if (!this._animeSpeedKe) {
            this._animeSpeedKe = getAnimationSpeed(this._actionKe);
        }
        // 速度を変更
        this._rate = Math.round(this._rate / this._animeSpeedKe);
    };
    }
    
    
    //- バトルムーブ速度(コア追加)
    const _Sprite_Battler_startMove = Sprite_Battler.prototype.startMove;
    Sprite_Battler.prototype.startMove = function(x, y, duration) {
        // 加速レート
        const fastRate = Math.max(keke_moveSpeed , 1);
        // 移動時間を変更
        duration = Math.round(duration / fastRate);
        _Sprite_Battler_startMove.apply(this, arguments);
    };
    
    
    //- モーション速度(コア追加)
    const _Sprite_Actor_motionSpeed = Sprite_Actor.prototype.motionSpeed;
    Sprite_Actor.prototype.motionSpeed = function() {
        let result = _Sprite_Actor_motionSpeed.apply(this);
        // 加速レート
        const fastRate = Math.max(keke_motionSpeed, 1);
        // 速度変更
        result = Math.round(result / fastRate);
        return result;
    };
    
    
    //- バトルエフェクト速度(コア追加)
    const _Sprite_Enemy_startEffect = Sprite_Enemy.prototype.startEffect;
    Sprite_Enemy.prototype.startEffect = function(effectType) {
        _Sprite_Enemy_startEffect.apply(this, arguments);
        // 加速レート
        const fastRate = Math.max(keke_effectSpeed, 0.1);
        // エフェクト時間を変更
        this._effectDuration = Math.round(this._effectDuration / fastRate);
    };
    
    
    
    //==================================================
    //--  タイムプログレス速度
    //==================================================
    
    //- タイム速度(コア追加)
    const _Game_Battler_tpbAcceleration = Game_Battler.prototype.tpbAcceleration;
    Game_Battler.prototype.tpbAcceleration = function() {
        let result = _Game_Battler_tpbAcceleration.apply(this);
        // グローバル速度
        result *= timeSpeed();
        // オートファストレート
        result *=  autoFastRate();
        return result;
    };
    
    
    //- オートファストレート
    function autoFastRate() {
        // パーティコマンド中はリターン
        if (SceneManager._scene._partyCommandWindow.active) { return 1; }
        // インプット時はリターン
        if (BattleManager.actor()) { return 1; }
        // アクション中はリターン
        if (BattleManager._phase == "action") { return 1; }
        // オートファストを適用
        return keke_timeAutoFast;
    };
    
    
    
    //==================================================
    //--  コラプスウェイト
    //==================================================
    
    //- コラプスウェイトの処理(コア追加)
    const _Sprite_Enemy_isEffecting = Sprite_Enemy.prototype.isEffecting;
    Sprite_Enemy.prototype.isEffecting = function() {
        // エフェクトがなくコラプスウェイトがあるなら null
        if (!this._effectType) {
            if (BattleManager._collapseWaitKe != null) { BattleManager._collapseWaitKe = null; }
        // コラプスがあってコラプスウェイトが null なら
        } else if (this._effectType.match(/[c|C]ollapse/) && BattleManager._collapseWaitKe == null) {
            // ウェイト基本値
            const isBoss = this._effectType.match(/bossCollapse/) ? true : false;
            let wait = isBoss ? keke_collapseWaitBoss : keke_collapseWaitBasic;
            // メモからウェイト値取得
            const obje = this._battler.enemy();
            if (obje) {
                const w = obje.meta["コラプスウェイト"] || obje.meta["collapseWait"];
                if (w) { wait = Number(w); }
            }
            // 0 以上のときウェイトセット
            if (wait >= 0) { BattleManager._collapseWaitKe = wait; }
        }
        // コラプスウェイトがないときは通常処理
        if (BattleManager._collapseWaitKe == null) {
            return _Sprite_Enemy_isEffecting.apply(this);
        }
    };
      
    
    
    //==================================================
    //--  フロントビュー対応
    //==================================================
    
    //- フロントビュー時もアクタースプライトを作る(コア追加)
    const _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        _Spriteset_Battle_createActors.apply(this);
        if ($gameSystem.isSideView()) { return; }
        if (this._actorSprites.length) { return; }
        this._actorSprites = [];
        for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
            const sprite = new Sprite_Actor();
            this._actorSprites.push(sprite);
            this._battleField.addChild(sprite)
            sprite.visible = false;
       }
    };
    
    
    //- フロントビュー時のアニメ条件(コア追加)
    const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
    Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
        let targetSprites = _Spriteset_Battle_makeTargetSprites.apply(this, arguments);
        const statusWindow = SceneManager._scene._statusWindow;
        targetSprites = targetSprites.filter(sprite => {
            if (!sprite._battler) { return false; }
            if ($gameSystem.isSideView()) { return true; }
            if (sprite._enemy) { return true; }
            if (sprite._isAsFaceKe) { return true; }
           return validFrontViewAdapt(sprite);
        });
        return targetSprites;
    };
    
    
    //- スプライトアクターの位置更新(コア追加)
    if (isMz()) {
    const _Sprite_Actor_updatePosition = Sprite_Actor.prototype.updatePosition;
    Sprite_Actor.prototype.updatePosition = function() {
        _Sprite_Actor_updatePosition.apply(this);
        // フロントビュー位置の更新
        updateFrontViewPos(this);
    };
    };
    
    
    //- フロントビュー位置の更新
    function updateFrontViewPos(sprite) {
        if (!validFrontViewAdapt(sprite)) { return; }
        const statusWindow = SceneManager._scene._statusWindow;
        const i = $gameParty.allMembers().indexOf(sprite._actor);
        const rect = statusWindow.faceRect(i);
        sprite._homeX = statusWindow.x + rect.x + rect.width / 2;
        sprite._homeY = statusWindow.y + rect.y;
        sprite._offsetX = 0;
        sprite._offsetY = 0;
    };
    
    
    //- ダメージポップの位置変更(コア追加)
    const _Sprite_Battler_damageOffsetX = Sprite_Battler.prototype.damageOffsetX;
    Sprite_Battler.prototype.damageOffsetX = function() {
        let result = _Sprite_Battler_damageOffsetX.apply(this);
        result += keke_damagePopX;
        return result;
    };
    
    const _Sprite_Battler_damageOffsetY = Sprite_Battler.prototype.damageOffsetY;
    Sprite_Battler.prototype.damageOffsetY = function() {
        let result = _Sprite_Battler_damageOffsetY.apply(this);
        result += keke_damagePopY;
        if (validFrontViewAdapt(this)) {
            const statusWindow = SceneManager._scene._statusWindow;
            const rect = statusWindow.faceRect(0);
            result += rect.height;
        }
        return result;
    };
    
    
    //- ダメージポップのレイヤー変更(コア追加)
    if (isMz()) {
    const _Sprite_Actor_createDamageSprite = Sprite_Actor.prototype.createDamageSprite;
    Sprite_Actor.prototype.createDamageSprite = function() {
        _Sprite_Actor_createDamageSprite.apply(this);
        if (!validFrontViewAdapt(this)) { return; }
        // レイヤー変更
        if (validFrontViewAdapt(this) && !$gameTemp._fullAnimeStatusKe) {
            const sprite = this._damages[this._damages.length - 1];
            SceneManager._scene._windowLayer.addChild(sprite);
        }
    };
    };
    
    
    //- フロントビュー対応するか
    function validFrontViewAdapt(sprite) {
        const statusWindow = SceneManager._scene._statusWindow;
        return keke_adaptFrontView && !$gameSystem.isSideView() && sprite._actor && (statusWindow && statusWindow.visible) && isMz();
    };
    
    
    //- ログ表示無効(コア追加)
    const _Scene_Battle_updateLogWindowVisibility = Scene_Battle.prototype.updateLogWindowVisibility;    Scene_Battle.prototype.updateLogWindowVisibility = function() {
        _Scene_Battle_updateLogWindowVisibility.apply(this);
        if (keke_noBattleLog) {
            this._logWindow.visible = false;
        }
    };
    
    
    //- MV時のダメージポップ位置補整(コア追加)
    if (isMv()) {
    const _Sprite_Battler_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
    Sprite_Battler.prototype.setupDamagePopup = function() {
        const requested = this._battler.isDamagePopupRequested();
        const damages = this._damages.map(d => d);
        _Sprite_Battler_setupDamagePopup.apply(this);
        if (requested) {
            if (this._battler.isSpriteVisible()) {
                const last = damages[damages.length - 1];
                if (last && last.children.length) {
                    const cur = this._damages[this._damages.length - 1];
                    cur.x = last.x + 8;
                    cur.y = last.y - 16;
                }
            }
        }
    };
    }
    
    
    
    //==================================================
    //--  エフェクト調整
    //==================================================
    
    //- 連撃時アニメーションを繰り返さない(コア追加)
    const _Window_BattleLog_showAnimation = Window_BattleLog.prototype.showAnimation;
    Window_BattleLog.prototype.showAnimation = function(subject, targets, animationId) {
        let pre = null;
        // 同ターゲットが連続したら省く
        targets = targets.filter((target, i) => {
            if (target == pre) { return false; }
            pre = target;
            return true;
        }, this);
        _Window_BattleLog_showAnimation.apply(this, arguments);
    };
    
    
    
    //==================================================
    //--  オプション
    //==================================================
    
    //- マネージャー(バトルスピード)
    Object.defineProperty(ConfigManager, "battleSpeed", {
        get: function() {
            return $gameSystem._battleSpeedOptKe;
        },
        set: function(value) {
            $gameSystem._battleSpeedOptKe = value;
        },
        configurable: true
    }); 
    
    
    //- マネージャー(バトルウェイト)
    Object.defineProperty(ConfigManager, "battleWait", {
        get: function() {
            return $gameSystem._battleWaitOptKe;
        },
        set: function(value) {
            $gameSystem._battleWaitOptKe = value;
        },
        configurable: true
    }); 
    
    
    //- マネージャー(アニメ速度)
    Object.defineProperty(ConfigManager, "animeSpeed", {
        get: function() {
            return $gameSystem._animeSpeedOptKe;
        },
        set: function(value) {
            $gameSystem._animeSpeedOptKe = value;
        },
        configurable: true
    }); 
    
    
    //- マネージャー(タイム速度)
    Object.defineProperty(ConfigManager, "timeSpeed", {
        get: function() {
            return $gameSystem._timeSpeedOptKe;
        },
        set: function(value) {
            $gameSystem._timeSpeedOptKe = value;
        },
        configurable: true
    }); 
    
    
    //- オプションに項目追加(コア追加)
    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.apply(this);
        // バトルスピードオブションの追加
        if (isMz()) {
            this.addBattleSpeedOptionsKeSpsb();
        }
    };
    
    
    //- バトルスピードオブションの追加
    Window_Options.prototype.addBattleSpeedOptionsKeSpsb = function() {
        // 追加したフラグ
        let added = false;
         // 追加項目を展開
        for (let item of keke_optionAddList) {
            // 項目名設定
            if (item.startsWith("a-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "battleSpeed");
            }
            if (item.startsWith("b-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "battleWait");
            }
            if (item.startsWith("c-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "animeSpeed");
            }
            if (item.startsWith("d-")) {
                item = item.replace(/^\w+-/, "");
                this.addCommand(item, "timeSpeed");
            }
            added = true;
        }
        // リサイズ
        this.resizeKe();
    };
    
    
    //- オプションのリサイズ
    Window_Options.prototype.resizeKe = function(){
        // コマンド数取得
        let cmdNum = this._list.length;
        // ハイト変更(画面ハイトは超えない)
        let height = Math.min(Graphics.boxHeight, this.fittingHeight(cmdNum));
        this.height = height;
        // Y位置変更
        this.y = (Graphics.boxHeight - this.height) / 2;
    };
    
    
    //- オプションウインドウのハイト拡大(コア追加)
    const _Scene_Options_optionsWindowRect = Scene_Options.prototype.optionsWindowRect;
    Scene_Options.prototype.optionsWindowRect = function() {
        let result = _Scene_Options_optionsWindowRect.apply(this);
        result.height = Graphics.height;
        return result;
    };
    
    
    //- ステータステキスト(コア追加)
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        let result = _Window_Options_statusText.apply(this, arguments);
        // シンボルと値を取得
        const symbol = this.commandSymbol(index);
        const value = this.getConfigValue(symbol);
        // バトルウェイトのとき
        if (symbol == "battleSpeed") {
            return this.volumeStatusText(value);
        // バトルウェイトのとき
        } else if (symbol == "battleWait") {
            return value + "フレーム";
        // アニメ速度のとき
        } else if (symbol == "animeSpeed") {
            return this.volumeStatusText(value);
        // タイム速度のとき
        } else if (symbol == "timeSpeed") {
            return this.volumeStatusText(value);
        }
        return result;
    };
    
    
    //- 決定ボタン時の処理(コア追加)
    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const symbol = this.commandSymbol(this.index());
        // バトルスピードのとき
        if (symbol == "battleSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, true, true);
        // バトルウェイトのとき
        } else if (symbol == "battleWait") {
            this.changeBattleSpeedValueKeSpsb(symbol, true, true);
        // アニメ速度のとき
        } else if (symbol == "animeSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, true, true);
        // タイム速度のとき
        } else if (symbol == "timeSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, true, true);
        // それ以外のとき
        } else {
            _Window_Options_processOk.apply(this);
        }
    };
    
    
    //- 右カーソルの処理(コア追加)
    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function() {
        const symbol = this.commandSymbol(this.index());
        // バトルスピードのとき
        if (symbol == "battleSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, true, true);
        // バトルウェイトのとき
        } else if (symbol == "battleWait") {
           this.changeBattleSpeedValueKeSpsb(symbol, true, true);
        // アニメ速度のとき
        } else if (symbol == "animeSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, true, true);
        // タイム速度のとき
        } else if (symbol == "timeSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, true, true);
        // それ以外のとき
        } else {
            _Window_Options_cursorRight.apply(this);
        }
    };
    
    
    //- 左カーソルの処理(コア追加)
    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function() {
        const symbol = this.commandSymbol(this.index());
        // バトルスピードのとき
        if (symbol == "battleSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, false, true);
        // バトルウェイトのとき
        } else if (symbol == "battleWait") {
            this.changeBattleSpeedValueKeSpsb(symbol, false, true);
        // アニメ速度のとき
        } else if (symbol == "animeSpeed") {
            this.changeBattleSpeedRateKeSpsb(symbol, false, true);
        // タイム速度のとき
        } else if (symbol == "timeSpeed") {
             this.changeBattleSpeedRateKeSpsb(symbol, false, true);
        // それ以外のとき
        } else {
            _Window_Options_cursorLeft.apply(this);
        }
    };
        
    
    //- 数値の変更(バトルウェイト)
    Window_Options.prototype.changeBattleSpeedValueKeSpsb = function(symbol, forward, wrap) {
        const lastValue = this.getConfigValue(symbol);
        const max = 100;
        const min = 0;
        const offset = 5;
        let value = lastValue + (forward ? offset : -offset);
        if (wrap) {
            if (value > max) { value = min; }
            if (value < min) { value = max; }
        }
        value = value.clamp(0, max);
        this.changeValue(symbol, value);
    };
    
    
    //- レートの変更-バトルスピード
    Window_Options.prototype.changeBattleSpeedRateKeSpsb = function(symbol, forward, wrap) {
        const lastValue = this.getConfigValue(symbol);
        const max = 500;
        const min = 10;
        const offset = 10;
        let value = lastValue + (forward ? offset : -offset);
        if (wrap) {
            if (value > max) { value = min; }
            if (value < min) { value = max; }
        }
        value = value.clamp(0, max);
        this.changeValue(symbol, value);
    };
    
    
    //- コンフィグデータ保存(コア追加)
    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        let config = _ConfigManager_makeData.apply(this);
        // ゲーム開始時用
        config._battleSpeedOptKe = $gameSystem._battleSpeedOptKe;
        config._battleWaitOptKe = $gameSystem._battleWaitOptKe;
        config._animeSpeedOptKe = $gameSystem._animeSpeedOptKe;
        config._timeSpeedOptKe = $gameSystem._timeSpeedOptKe;
        // ニューゲーム用
        this._battleSpeedOptKe = $gameSystem._battleSpeedOptKe;
        this._battleWaitOptKe = $gameSystem._battleWaitOptKe;
        this._animeSpeedOptKe = $gameSystem._animeSpeedOptKe;
        this._timeSpeedOptKe = $gameSystem._timeSpeedOptKe;
        return config;
    };
    
    
    //- ゲーム開始時に呼び出し(コア追加)
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        const items = keke_optionAddList;
        if (items.filter(item => item.startsWith("a-")).length) {
            this._battleSpeedOptKe = config._battleSpeedOptKe;
        }
        if (items.filter(item => item.startsWith("b-")).length) {
            this._battleWaitOptKe = config._battleWaitOptKe;
        }
         if (items.filter(item => item.startsWith("c-")).length) {
            this._animeSpeedOptKe = config._animeSpeedOptKe;
        }
        if (items.filter(item => item.startsWith("d-")).length) {
            this._timeSpeedOptKe = config._timeSpeedOptKe;
        }
    };
    
    
    //- ニューゲーム時に呼び出し(コア追加)
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.apply(this);
        cm = ConfigManager;
        if (cm._battleSpeedOptKe) {
            $gameSystem._battleSpeedOptKe = cm._battleSpeedOptKe;
        }
        if (cm._battleWaitOptKe) {
            $gameSystem._battleWaitOptKe = cm._battleWaitOptKe;
        }
        if (cm._animeSpeedOptKe) {
            $gameSystem._animeSpeedOptKe = cm._animeSpeedOptKe;
        }
        if (cm._timeSpeedOptKe) {
            $gameSystem._timeSpeedOptKe = cm._timeSpeedOptKe;
        }
    };
    
    
    
    //==================================================
    //--  メタ数値 /ベーシック
    //==================================================
    
    //- 全てのメタ値を合算
    function totalAllMetaVal(battler, words, times1 = null, times2 = null) {
        // イニット
        let data = null
        let val = 0;
        // バトラー値
        data = battler.actorId ? battler.actor() : battler.enemy();
        if (data) { val += getMetaVal(data.meta, words, times1, times2); }
        if (battler._actorId) {
            // 職業値
            data = battler.currentClass();
            if (data) { val += getMetaVal(data.meta, words, times1, times2); }
            // 装備値
            battler._equips.forEach(equip => {
                data = equip.object();
                if (data) { val += getMetaVal(data.meta, words, times1, times2); }
            }, battler);
        }
        // ステート値
        battler._states.forEach(stateId => {
            data = $dataStates[stateId];
            if (data) { val += getMetaVal(data.meta, words, times1, times2); }
        }, battler);
        // アクション値
        const actions = [BattleManager._action];
        const chainRun = BattleManager._chainRunActionKe;
        if (chainRun && chainRun != BattleManager._action) { actions.push(BattleManager._chainRunActionKe); }
        for (const action of actions) {
            if (!action) { continue; }
            data = action.item();
            if (data) { val += getMetaVal(data.meta, words, times1, times2); }
        }
        return val;
    };
    
    
    //- メタ数値を取得
    function getMetaVal(meta, words, times1 = null, times2 = null) {
        // イニット
        let val = 0;
        times1 = times1 ? times1.reduce((t, v) => t * v) : 1;
        times2 = times2 ? times2.reduce((t, v) => t * v) : 1;
        let eva = null;
        // 取得計算
        meta = meta[words[0]] || meta[words[1]];
        if (meta) {
            meta = meta.split(",");
            // eval処理
            const match = meta[0].match(/\|(.+)\|/);
            if (match) {
                eva = match[1];
                eva = eva.replace(/\\lv/g, "this._level");
            }
            if (meta[0]) { val = eva ? eval(eva) * times2 : Number(meta[0]) * times1; }
            if (meta[1]) { val = Math.max(val, Number(meta[1]) * times2); }
            if (meta[2]) { val = Math.min(val, Number(meta[2]) * times2); }
        }
        return val;
    };
    
    
    
    //==================================================
    //--  スプライト基本 /ベーシック
    //==================================================
    
    //- バトラースプライトの検索
    function searchSpriteBattler(battler) {
        const spriteset = SceneManager._scene._spriteset;
        let result = null;
        const sprites = battler._enemyId ? spriteset._enemySprites : spriteset._actorSprites;
        for (const sprite of sprites) {
            if(!sprite._battler) { continue; }
            if ((battler._actorId && sprite._battler._actorId == battler._actorId) || (battler._enemyId && sprite._battler.index() == battler.index())) {
                result = sprite;
                break;
            }
        }
        return result;
    };

})();