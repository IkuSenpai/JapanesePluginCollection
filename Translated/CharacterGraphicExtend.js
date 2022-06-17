//=============================================================================
// CharacterGraphicExtend.js
// ----------------------------------------------------------------------------
// (C)2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 2.4.1 2022/01/30 色相を変化させたとき入力した数値を反転させた内容が反映されてしまう問題を修正
// 2.4.0 2021/07/12 敵キャラやピクチャを表示する際、色相を指定できる機能を追加
// 2.3.2 2021/07/07 ヘルプの記載ミスを修正
// 2.3.1 2021/06/24 プラグイン未適用のデータをロードしたときに発生するいくつかの事象を修正
// 2.3.0 2021/05/18 プライオリティ設定に「-1」(下層タイルの背後で遠景の手前)を設定できるようにしました
// 2.2.1 2021/05/05 アイコンセットの行を変更したときに正しくトリミングできない問題を修正
// 2.2.0 2021/02/22 色調変更のタグが正常に機能していなかった問題を修正し、グレースケールを指定できるようにしました。
// 2.1.1 2020/11/28 Trb_SimpleDashMotion.jsと併用したとき、プレイヤーの拡大率を変更したときも想定通りに表示されるよう修正
// 2.1.0 2020/11/22 ApngPicture.jsと組み合わせてキャラクターとして表示したピクチャ、敵キャラ画像がアニメーションする機能を追加
// 2.0.1 2020/11/01 一部リファクタリング
// 2.0.0 2020/10/30 MZで動作するよう全面的に修正
// 1.10.4 2020/03/22 MOG_ChronoEngine.jsとの間で発生するエラーを解消(全面的な競合対策ではありません)
//                   MOG_CharPoses.jsとの競合を解消
// 1.10.3 2020/01/25 フレーム更新時に無駄な処理が実行されることでパフォーマンスが低下していた問題を修正
// 1.10.2 2018/11/19 UltraMode7との競合を解消(by けんせい様)
//                   TMNamePop.jsとの併用時、ネームポップがイベント画像の傾き、反転に影響されないよう修正
// 1.10.1 2018/10/05 敵キャラやピクチャを表示する際、エディタで元画像にインデックス1以外を指定していると画像が表示されない問題を修正
// 1.10.0 2018/09/25 イベント画像をトリミングして表示できる機能を追加
// 1.9.2 2018/07/11 EventEffects.jsとの競合を解消
// 1.9.1 2018/06/05 メモ欄タグで変数指定＋並列処理で変数操作にて発生するいくつかの問題を修正（by 奏ねこま様）
// 1.9.0 2018/02/20 不透明度をメモ欄で設定できる機能を追加
// 1.8.0 2017/08/27 マップで使用しているタイルセット以外のタイルセットを使ったイベントを作成できる機能を追加
// 1.7.0 2017/08/24 画像を別のものに変更するスクリプトを追加
// 1.6.1 2017/08/06 ヘルプを修正
// 1.6.0 2017/08/05 アクターのバトラー画像をマップ上に表示する機能を追加
// 1.5.3 2017/06/22 プラグインを適用していないデータをロードしたときにプレイヤーが表示されない問題を修正
// 1.5.2 2017/06/11 プライオリティの設定を0にすると設定が有効にならない問題を修正
// 1.5.1 2017/06/11 GALV_CamControl.jsとの競合を解消
// 1.5.0 2017/03/28 色調変更機能を追加
// 1.4.2 2017/02/03 メモ欄に制御文字\v[n]を使った場合に、一度マップ移動しないと反映されない問題を修正しました。
// 1.4.1 2016/11/27 T_dashMotion.jsとの競合を解決
// 1.4.0 2016/11/21 複数のページに対して別々の画像を割り当てる機能を追加しました。
// 1.3.0 2016/07/16 以下の機能を追加しました。
//                  遠景をイベントグラフィックとして利用可能
//                  イベント画像の原点を変更する機能、イベント画像の画面表示位置を絶対値指定する機能
// 1.2.1 2016/05/08 HalfMove.jsとの競合を解消
// 1.2.0 2016/03/19 戦闘発生時にイベントを消去しない設定を追加しました。
// 1.1.2 2016/03/04 本体バージョン1.1.0に合わせてキャラクターの乗算とスクリーンに対応しました。
// 1.1.1 2016/01/21 競合対策（YEP_MessageCore.js）
// 1.1.0 2016/01/11 キャラクターに回転角を設定する機能を追加
//                  移動ルートの指定のスクリプトから、回転角、拡大率、位置調整ができる機能を追加
// 1.0.0 2016/01/08 初版
// ----------------------------------------------------------------------------
// [Blog]   : https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc キャラクターグラフィック表示拡張プラグイン
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/CharacterGraphicExtend.js
 * @base PluginCommonBase
 * @author トリアコンタン
 *
 * @param EventHideInvalid
 * @text イベント消去無効
 * @desc エンカウント発生時にイベントを一瞬消去するエフェクトを無効にします。
 * @default false
 * @type boolean
 *
 * @help イベントのグラフィック表示方法を拡張して多彩な表現を可能にします。
 * イベントのメモ欄に所定の書式で記入してください。
 * 項目はカンマで区切ってください。文章の表示と同じ制御文字が使用できます。
 * また、ページ数に「A」と入力すると全てのページが対象になります。
 *
 * <CGピクチャ:（ページ数）,（ファイル名）>
 * 指定したページが有効になった場合のグラフィックをピクチャ画像から取得します。
 * 拡張子は不要です。歩行アニメ待機アニメは無効化されます。
 *
 * ファイル名には公式プラグイン「MaterialBase.js」の
 * 制御文字「\mi[aaa]」が使用できます。
 *
 * 例：<CGピクチャ:1,Test> or <CGPicture:1,Test>
 *
 * 〇追加機能
 * 複数のページに対して別々の画像を割り当てたい場合は
 * ページごとにタグを作成してください。
 * 以下の例だと1ページ目ではaaa.pngが、2ページ目ではbbb.pngが使用されます。
 * 他のタグも同様です。
 * 例：<CGピクチャ:1,aaa><CGピクチャ:2,bbb>
 *
 * <CG敵キャラ:（ページ数）,（ファイル名）,（色相）>
 * 指定したページが有効になった場合のグラフィックを敵キャラ画像から取得します。
 * 拡張子は不要です。歩行アニメ待機アニメは無効化されます。
 *
 * 例：<CG敵キャラ:1,Bat,90> or <CGEnemy:1,Bat,90>
 *
 * <CGアイコン:（ページ数）,（インデックス）>
 * 指定したページが有効になった場合のグラフィックをアイコン画像から取得します。
 * 歩行アニメ待機アニメは無効化されます。
 *
 * 例：<CGアイコン:1,128> or <CGIcon:1,128>
 *
 * <CGフェイス:（ページ数）,（ファイル名）,（インデックス）>
 * 指定したページが有効になった場合のグラフィックをフェイス画像から取得します。
 * 拡張子は不要です。歩行アニメ待機アニメは無効化されます。
 *
 * 例：<CGフェイス:1,Actor1,4> or <CGFace:1,Actor1,4>
 *
 * <CGアクター:（ページ数）,（ファイル名）,（インデックス）>
 * 指定したページが有効になった場合のグラフィックをバトラー画像から取得します。
 * 拡張子は不要です。歩行アニメ待機アニメは無効化されます。
 *
 * 例：<CGアクター:1, Actor1_1, 0> or <CGActor:1, Actor1_1, 0>
 *
 * <CG遠景:（ページ数）,（ファイル名）>
 * 指定したページが有効になった場合のグラフィックを遠景画像から取得します。
 * 拡張子は不要です。歩行アニメ待機アニメは無効化されます。
 *
 * 例：<CG遠景:1,Test> or <CGParallax:1,Test>
 *
 * 要注意！　これらのメモ欄でファイルを指定した場合、デプロイメント時に
 * 未使用ファイルとして除外される可能性があります。
 * その場合、削除されたファイルを入れ直す等の対応が必要です。
 *
 * <CGタイル:（ページ数）,（横幅）,（高さ）>
 * 指定したページが有効になった場合のグラフィックをタイル画像から取得します。
 * 横幅と高さを指定して本棚やベッドが一つのイベントで表現できます。
 * イベントの画像選択から一番左上のタイルを選択してください。
 *
 * 例：<CGタイル:1,2,2> or <CGTile:1,2,2>
 *
 * <CGタイルセット:（ページ数）,（タイルセットID）>
 * 指定したページが有効になった場合のタイルセットを指定します。
 * マップで使用しているタイルセット以外のタイルセット画像が使えます。
 *
 * 例：<CGタイルセット:1,2> or <CGTileset:1,2>
 *
 * <CGシフト:（ページ数）,（X座標）,（Y座標）>
 * 指定したページが有効になった場合のグラフィック表示位置を
 * 指定したピクセル分ずらして表示します。
 *
 * 例：<CGシフト:1,16,-16> or <CGShift:1,16,-16>
 *
 * <CGプライオリティ:（ページ数）,（プライオリティ）>
 * 指定したページが有効になった場合の表示優先度を設定します。
 * 1～9までの値を設定できます。
 *
 * 例：<CGプライオリティ:1,6> or <CGPriority:1,6>
 *
 * ※それぞれのプライオリティの値
 * 0 : 下層タイル
 * 1 : 通常キャラの下
 * 3 : 通常キャラと同じ
 * 4 : 上層タイル
 * 5 : 通常キャラの上
 * 6 : 飛行船の影
 * 7 : フキダシ
 * 8 : アニメーション
 * 9 : マップタッチの行き先（白く光るヤツ）
 *
 * <CG合成方法:（ページ数）,（合成方法）>
 * 指定したページが有効になった場合のグラフィックの合成方法を設定します。
 * 0:通常 1:加算 2:乗算 3:スクリーン
 *
 * 例：<CG合成方法:1,2> or <CGBlendType:1,2>
 *
 * <CG拡大率:（ページ数）,（X拡大率）（Y拡大率）>
 * 指定したページが有効になった場合のグラフィックの拡大率を設定します。
 * 負の値を設定すると画像が反転します。
 *
 * 例：<CG拡大率:1,100,-100> or <CGScale:1,100,-100>
 *
 * <CG回転角:（ページ数）,（回転角）>
 * 指定したページが有効になった場合のグラフィックの回転角を設定します。
 * 回転の中心は、キャラクターの足下になります。0～360の範囲内で設定してください。
 *
 * 例：<CG回転角:1,180> or <CGAngle:1,180>
 *
 * <CG原点:（ページ数）,（X原点）,（Y原点）>
 * 指定したページが有効になった場合のグラフィックの原点(0...100)を設定します。
 * デフォルトではX原点が50、Y原点が100(画像の足下が原点になる)です。
 *
 * 例：<CG原点:1,0,0> or <CGOrigin:1,100,100>
 *
 * <CG絶対座標:（ページ数）,（X座標）,（Y座標）>
 * 指定したページが有効になった場合のグラフィック表示位置を
 * 絶対座標(ピクチャのようにマップのスクロールとは無関係に表示する)にします。
 * ただし、イベントそのものの位置は変わりません。
 *
 * 例：<CG絶対座標:1,16,-16> or <CGAbsolute:1,16,-16>
 *
 * <CG色調:（ページ数）,（R値）,（G値）,（B値）,（グレースケール）>
 * 指定したページが有効になった場合の色調(-255～255)を設定します。
 * グレースケールは省略可能で、省略すると0になります。
 *
 * 例：<CG色調:1,-255,0,255,0> or <CGTone:1,-255,0,255,0>
 *
 * <CG不透明度:（ページ数）,（合成方法）>
 * 指定したページが有効になった場合のグラフィックの不透明度を設定します。
 * 0:透明 - 255:不透明
 *
 * 例：<CG不透明度:1,64> or <CGOpacity:1,64>
 *
 * <CGトリミング:（ページ数）,（X座標）,（Y座標）,（横幅）,（縦幅）>
 * 画像を指定した矩形でトリミングして表示します。
 *
 * 例：<CGトリミング:1,0,0,24,24> or <CGトリミング:1,0,0,24,24>
 *
 * 〇スクリプト（高度な設定。移動ルートの指定からスクリプトで実行）
 *
 * ・拡大率の設定
 * this.setScale(（X座標）,（Y座標）);
 * 例：this.setScale(100, 100);
 *
 * ・回転角の設定
 * this.setAngle(（回転角）);
 * 例：this.setAngle(180);
 *
 * ・ピクセル単位位置の設定
 * this.shiftPosition(（X座標）,（Y座標）);
 * 例：this.shiftPosition(24, 24);
 *
 * ・色調の設定
 * this.setTone(（R値）,（G値）,（B値）, （グレースケール）);
 * 例：this.setTone(255, -255, -255, 0);
 *
 * ・画像の変更
 * this.changeImage(（新しいファイル名）, （インデックス）);
 * 例：this.changeImage('Package1', 3);
 *
 * ※1 画像種別(ピクチャ⇒遠景など)を変更することはできません。
 * ※2 インデックスの指定を省略した場合、変更前の値が維持されます。
 *
 * このプラグインにはプラグインコマンドはありません。
 *
 * EventEffects.jsと併用する場合は、本プラグインを下に配置してください。
 *
 * 利用規約：
 *  作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 *  についても制限はありません。
 *  このプラグインはもうあなたのものです。
 */
(function() {
    'use strict';

    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    const getArgArrayString = function(args, upperFlg) {
        const values = getArgString(args, upperFlg).split(',');
        for (let i = 0; i < values.length; i++) values[i] = values[i].trim();
        return values;
    };

    const getArgString = function(args, upperFlg) {
        args = PluginManagerEx.convertEscapeCharacters(args);
        return upperFlg ? args.toUpperCase() : args;
    };

    const getArgNumber = function(arg, min, max) {
        if (arguments.length < 2) min = -Infinity;
        if (arguments.length < 3) max = Infinity;
        if (!arg) {
            return 0;
        }
        return (parseInt(PluginManagerEx.convertEscapeCharacters(arg), 10) || 0).clamp(min, max);
    };

    //=============================================================================
    // Game_CharacterBase
    //  拡張するプロパティを定義します。
    //=============================================================================
    const _DataManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata      = function(data) {
        _DataManager_extractMetadata.apply(this, arguments);
        this.extractMetadataArray(data);
    };

    DataManager.extractMetadataArray = function(data) {
        const re         = /<([^<>:]+)(:?)([^>]*)>/g;
        data.metaArray = {};
        let match      = true;
        while (match) {
            match = re.exec(data.note);
            if (match) {
                const metaName             = match[1];
                data.metaArray[metaName] = data.metaArray[metaName] || [];
                data.metaArray[metaName].push(match[2] === ':' ? match[3] : true);
            }
        }
    };

    //=============================================================================
    // Game_System
    //  ロード時にプレイヤーの初期化が必要な場合は初期化します。
    //=============================================================================
    const _Game_System_onAfterLoad      = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function() {
        _Game_System_onAfterLoad.apply(this, arguments);
        if (!$gamePlayer.hasOwnProperty('_customResource')) {
            $gamePlayer.clearCgInfo();
            $gamePlayer.followers().data().forEach(follower => follower.clearCgInfo());
            $gameMap.vehicles().forEach(vehicle => vehicle.clearCgInfo());
        }
    };

    //=============================================================================
    // Game_CharacterBase
    //  拡張するプロパティを定義します。
    //=============================================================================
    const _Game_CharacterBase_initMembers      = Game_CharacterBase.prototype.initMembers;
    Game_CharacterBase.prototype.initMembers = function() {
        _Game_CharacterBase_initMembers.apply(this, arguments);
        this.clearCgInfo();
    };

    Game_CharacterBase.prototype.clearCgInfo = function() {
        this._customResource  = null;
        this._graphicColumns  = 1;
        this._graphicRows     = 1;
        this._additionalX     = 0;
        this._additionalY     = 0;
        this._customPriority  = null;
        this._scaleX          = 100;
        this._scaleY          = 100;
        this._tileBlockWidth  = 1;
        this._tileBlockHeight = 1;
        this._angle           = 0;
        this._originX         = null;
        this._originY         = null;
        this._absoluteX       = null;
        this._absoluteY       = null;
        this._customTilesetId = 0;
        this._graphicHue      = 0;
        this.setBlendMode(0);
    };

    Game_CharacterBase.prototype.customResource = function() {
        return this._customResource;
    };

    Game_CharacterBase.prototype.customResourceHue = function() {
        return this._graphicHue;
    };

    Game_CharacterBase.prototype.customTilesetId = function() {
        return this._customTilesetId;
    };

    Game_CharacterBase.prototype.graphicColumns = function() {
        return this._graphicColumns;
    };

    Game_CharacterBase.prototype.graphicRows = function() {
        return this._graphicRows;
    };

    Game_CharacterBase.prototype.scaleX = function() {
        return this._scaleX;
    };

    Game_CharacterBase.prototype.scaleY = function() {
        return this._scaleY;
    };

    Game_CharacterBase.prototype.setScale = function(x, y) {
        this._scaleX = x;
        this._scaleY = y;
    };

    Game_CharacterBase.prototype.originX = function() {
        return this._originX;
    };

    Game_CharacterBase.prototype.originY = function() {
        return this._originY;
    };

    Game_CharacterBase.prototype.setOrigin = function(x, y) {
        this._originX = x / 100;
        this._originY = y / 100;
    };

    Game_CharacterBase.prototype.absoluteX = function() {
        return this._absoluteX;
    };

    Game_CharacterBase.prototype.absoluteY = function() {
        return this._absoluteY;
    };

    Game_CharacterBase.prototype.setAbsolute = function(x, y) {
        this._absoluteX = x;
        this._absoluteY = y;
    };

    Game_CharacterBase.prototype.tone = function() {
        return this._tone;
    };

    Game_CharacterBase.prototype.setTone = function(r, g, b, gray) {
        this._tone = [r, g, b, gray || 0];
    };

    Game_CharacterBase.prototype.angle = function() {
        return this._angle;
    };

    Game_CharacterBase.prototype.setAngle = function(angle) {
        this._angle = angle;
    };

    Game_CharacterBase.prototype.shiftPosition = function(x, y) {
        this._additionalX = x;
        this._additionalY = y;
    };

    Game_CharacterBase.prototype.tileBlockWidth = function() {
        return this._tileBlockWidth;
    };

    Game_CharacterBase.prototype.tileBlockHeight = function() {
        return this._tileBlockHeight;
    };

    Game_CharacterBase.prototype.getTrimRect = function() {
        return this._trimRect || null;
    };

    const _Game_CharacterBase_pos      = Game_CharacterBase.prototype.pos;
    Game_CharacterBase.prototype.pos = function(x, y) {
        if (this.tileBlockWidth() >= 2) {
            return (this._x - this.tileBlockWidth() / 2 <= x && this._x + this.tileBlockWidth() / 2 >= x) && this._y === y;
        } else {
            return _Game_CharacterBase_pos.apply(this, arguments);
        }
    };

    const _Game_CharacterBase_screenX      = Game_CharacterBase.prototype.screenX;
    Game_CharacterBase.prototype.screenX = function() {
        return this._absoluteX > 0 ? this.absoluteX() : _Game_CharacterBase_screenX.apply(this, arguments) + this._additionalX;
    };

    const _Game_CharacterBase_screenY      = Game_CharacterBase.prototype.screenY;
    Game_CharacterBase.prototype.screenY = function() {
        return this._absoluteY > 0 ? this.absoluteY() : _Game_CharacterBase_screenY.apply(this, arguments) + this._additionalY;
    };

    const _Game_CharacterBase_screenZ      = Game_CharacterBase.prototype.screenZ;
    Game_CharacterBase.prototype.screenZ = function() {
        return this._customPriority !== null ? this._customPriority : _Game_CharacterBase_screenZ.apply(this, arguments);
    };

    Game_CharacterBase.prototype.changeImage = function(fileName, fileIndex) {
        if (arguments.length < 2) {
            fileIndex = this._characterIndex;
        }
        Game_CharacterBase.prototype.setImage.call(this, fileName, fileIndex);
    };

    //=============================================================================
    // Game_Event
    //  拡張するプロパティを定義します。
    //=============================================================================
    Game_Event.blendModeParams = {
        '1': 1, '加算': 1,
        '2': 2, '乗算': 2,
        '3': 3, 'スクリーン': 3
    };

    Game_Event.prototype.getMetaCg = function(names) {
        if (!this.event().metaArray) {
            return null;
        }
        if (!Array.isArray(names)) names = [names];
        const metaParams = this.getMetaParameter(names);
        if (!metaParams) return null;
        let result = null;
        metaParams.some(function(metaParam) {
            const params = getArgArrayString(metaParam);
            if (this.isValidCgeParam(params)) {
                result = params;
                if (metaParam.match(/\\v/gi)) {
                    this._graphicDynamic = true;
                }
            }
            return result;
        }.bind(this));
        return result;
    };

    Game_Event.prototype.getMetaParameter = function(names) {
        let metaParams = null;
        names.some(function(name) {
            if (!metaParams || metaParams[0] === '') {
                metaParams = this.event().metaArray['CG' + name];
            }
            return metaParams;
        }.bind(this));
        return metaParams;
    };

    Game_Event.prototype.isValidCgeParam = function(params) {
        const pageIndex = getArgNumber(params[0]);
        return params.length > 1 && (pageIndex === this._pageIndex + 1 || params[0].toUpperCase() === 'A');
    };

    const _Game_Event_refresh      = Game_Event.prototype.refresh;
    Game_Event.prototype.refresh = function() {
        // added by nekoma start
        const moveRoute        = this._moveRoute;
        const moveRouteIndex   = this._moveRouteIndex;
        const moveRouteForcing = this._moveRouteForcing;
        const starting         = this._starting;
        // added by nekoma end
        if (this._graphicDynamic) {
            this._pageIndex = -1;
        }
        _Game_Event_refresh.apply(this, arguments);
        // added by nekoma start
        if (this._graphicDynamic) {
            this._moveRoute        = moveRoute;
            this._moveRouteIndex   = moveRouteIndex;
            this._moveRouteForcing = moveRouteForcing;
            this._starting         = starting;
        }
        // added by nekoma end
    };

    const _Game_Event_setupPageSettings      = Game_Event.prototype.setupPageSettings;
    Game_Event.prototype.setupPageSettings = function() {
        this.clearCgInfo();
        _Game_Event_setupPageSettings.apply(this, arguments);
        let cgParams = this.getMetaCg(['シフト', 'Shift']);
        if (cgParams) {
            this.shiftPosition(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]));
        }
        cgParams = this.getMetaCg(['プライオリティ', 'Priority']);
        if (cgParams) {
            this._customPriority = getArgNumber(cgParams[1]);
        }
        cgParams = this.getMetaCg(['合成方法', 'BlendType']);
        if (cgParams) {
            const blendMode = Game_Event.blendModeParams[cgParams[1]] || 0;
            this.setBlendMode(blendMode);
        }
        cgParams = this.getMetaCg(['拡大率', 'Scale']);
        if (cgParams) {
            this._scaleX = getArgNumber(cgParams[1]);
            this._scaleY = getArgNumber(cgParams[2]);
        }
        cgParams = this.getMetaCg(['回転角', 'Angle']);
        if (cgParams) {
            this.setAngle(getArgNumber(cgParams[1], 0, 360));
        }
        cgParams = this.getMetaCg(['原点', 'Origin']);
        if (cgParams) {
            this.setOrigin(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]));
        }
        cgParams = this.getMetaCg(['絶対座標', 'Absolute']);
        if (cgParams) {
            this.setAbsolute(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]));
        }
        cgParams = this.getMetaCg(['色調', 'Tone']);
        if (cgParams) {
            this.setTone(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]),
                getArgNumber(cgParams[3]), getArgNumber(cgParams[4]));
        }
        cgParams = this.getMetaCg(['不透明度', 'Opacity']);
        if (cgParams) {
            this.setOpacity(getArgNumber(cgParams[1]));
        }
        cgParams = this.getMetaCg(['トリミング', 'Trimming']);
        if (cgParams) {
            this._trimRect = new Rectangle(getArgNumber(cgParams[1]), getArgNumber(cgParams[2]), getArgNumber(cgParams[3]), getArgNumber(cgParams[4]));
        }
    };

    const _Game_Event_setTileImage      = Game_Event.prototype.setTileImage;
    Game_Event.prototype.setTileImage = function(tileId) {
        _Game_Event_setTileImage.apply(this, arguments);
        let cgParams = this.getMetaCg(['タイル', 'Tile']);
        if (cgParams) {
            this._tileBlockWidth  = getArgNumber(cgParams[1]);
            this._tileBlockHeight = getArgNumber(cgParams[2]);
        }
        cgParams = this.getMetaCg(['タイルセット', 'Tileset']);
        if (cgParams) {
            this._customTilesetId = getArgNumber(cgParams[1]);
        }
    };

    const _Game_Event_setImage      = Game_Event.prototype.setImage;
    Game_Event.prototype.setImage = function(characterName, characterIndex) {
        this._graphicHue = 0;
        let cgParams = this.getMetaCg(['ピクチャ', 'Picture']);
        if (cgParams) {
            this._customResource = 'Picture';
            this._graphicColumns = 1;
            this._graphicRows    = 1;
            this._graphicHue     = getArgNumber(cgParams[2]);
            arguments[0]         = cgParams[1];
            arguments[1]         = 0;
        }
        cgParams = this.getMetaCg(['敵キャラ', 'Enemy']);
        if (cgParams) {
            this._customResource = $gameSystem.isSideView() ? 'SvEnemy' : 'Enemy';
            this._graphicColumns = 1;
            this._graphicRows    = 1;
            this._graphicHue     = getArgNumber(cgParams[2]);
            arguments[0]         = cgParams[1];
            arguments[1]         = 0;
        }
        cgParams = this.getMetaCg(['アイコン', 'Icon']);
        if (cgParams) {
            const bitmap = ImageManager.loadSystem('IconSet');
            this._customResource = 'System';
            this._graphicColumns = 16;
            this._graphicRows    = (bitmap.height / ImageManager.iconHeight) || 20;
            arguments[0]         = 'IconSet';
            arguments[1]         = getArgNumber(cgParams[1], 0, this._graphicColumns * this._graphicRows - 1);
        }
        cgParams = this.getMetaCg(['フェイス', 'Face']);
        if (cgParams) {
            this._customResource = 'Face';
            this._graphicColumns = 4;
            this._graphicRows    = 2;
            this._graphicHue     = getArgNumber(cgParams[3]);
            arguments[0]         = cgParams[1];
            arguments[1]         = getArgNumber(cgParams[2], 0, this._graphicColumns * this._graphicRows - 1);
        }
        cgParams = this.getMetaCg(['遠景', 'Parallax']);
        if (cgParams) {
            this._customResource = 'Parallax';
            this._graphicColumns = 1;
            this._graphicRows    = 1;
            this._graphicHue     = getArgNumber(cgParams[2]);
            arguments[0]         = cgParams[1];
            arguments[1]         = 0;
        }
        cgParams = this.getMetaCg(['アクター', 'Actor']);
        if (cgParams) {
            this._customResource = 'SvActor';
            this._graphicColumns = 9;
            this._graphicRows    = 6;
            this._graphicHue     = getArgNumber(cgParams[3]);
            arguments[0]         = cgParams[1];
            arguments[1]         = getArgNumber(cgParams[2], 0, this._graphicColumns * this._graphicRows - 1);
        }
        _Game_Event_setImage.apply(this, arguments);
    };

    //=============================================================================
    // Spriteset_Map
    //  イベントを消去するエフェクトを無効にします。
    //=============================================================================
    const _Spriteset_Map_hideCharacters      = Spriteset_Map.prototype.hideCharacters;
    Spriteset_Map.prototype.hideCharacters = function() {
        if (!param.EventHideInvalid) _Spriteset_Map_hideCharacters.apply(this, arguments);
    };

    //=============================================================================
    // Sprite_Character
    //  拡張したプロパティに基づいてエフェクトを反映させます。
    //=============================================================================
    const _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
    Sprite_Character.prototype.initMembers = function() {
        _Sprite_Character_initMembers.apply(this, arguments);
        this._customTilesetId = 0;
    };

    const _Sprite_Character_tilesetBitmap      = Sprite_Character.prototype.tilesetBitmap;
    Sprite_Character.prototype.tilesetBitmap = function(tileId) {
        this._customTilesetId = this._character.customTilesetId();
        const tileSet = $dataTilesets[this._customTilesetId];
        if (this._customTilesetId && tileSet) {
            const setNumber = 5 + Math.floor(tileId / 256);
            return ImageManager.loadTileset(tileSet.tilesetNames[setNumber]);
        } else {
            return _Sprite_Character_tilesetBitmap.apply(this, arguments);
        }
    };

    const _Sprite_Character_updateBitmap      = Sprite_Character.prototype.updateBitmap;
    Sprite_Character.prototype.updateBitmap = function() {
        if (this.isImageChanged()) this._customResource = this._character.customResource();
        _Sprite_Character_updateBitmap.apply(this, arguments);
        this.updateExtend();
    };

    // Resolve conflict for MOG_CharPoses.js
    const _Sprite_Character_setBitmapCache = Sprite_Character.prototype.setBitmapCache;
    Sprite_Character.prototype.setBitmapCache = function() {
        if (this._customResource) {
            return;
        }
        _Sprite_Character_setBitmapCache.apply(this, arguments);
    };

    const _Sprite_Character_update      = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        _Sprite_Character_update.apply(this, arguments);
        // for T_dashMotion.js
        if (this.updateDashMotion) {
            this.resolveConflictForDashMotion();
        }

        // for UltraMode7.jp PRTN added ----
        if ($gameMap.useUltraMode7) {
            this.resolveConflictForUltraMode7();
        }
    };

    // PRTN added ---------
    Sprite_Character.prototype.resolveConflictForUltraMode7 = function() {
        if (this._character.scaleY() !== 100) {
            this.scale.x = this._character.scaleX() / 100 * this.scale.x;
            this.scale.y = this._character.scaleY() / 100 * this.scale.y;
        }
        if (this._character.angle() !== 0) {
            const angle = this._character.angle() * Math.PI / 180;
            if (this.rotation !== angle) this.rotation = angle;
        }
    };
    // --------------------

    Sprite_Character.prototype.resolveConflictForDashMotion = function() {
        if (this._character.scaleY() / 100 !== this.scale.y) {
            this.scale.y = this._character.scaleY() / 100 * this.scale.y;
        }
        if (this._character.angle() !== 0) {
            const angle = this._character.angle() * Math.PI / 180;
            if (this.rotation !== angle) this.rotation = angle;
        }
    };

    Sprite_Character.prototype.updateExtend = function() {
        const scaleX = this._character.scaleX() / 100;
        const scaleY = this._character.scaleY() / 100;
        this.scale.x = scaleX;
        this.scale.y = scaleY;
        // for TMNamePop.js
        if (this._namePop && this._namePopSprite) {
            this._namePopSprite.scale.x = scaleX;
            this._namePopSprite.scale.y = scaleY;
        }
        const originX  = this._character.originX();
        if (originX != null) this.anchor.x = originX;
        const originY = this._character.originY();
        if (originY != null) this.anchor.y = originY;
        const angle = this._character.angle() * Math.PI / 180;
        if (this.rotation !== angle) this.rotation = angle;
        const tone = this._character.tone();
        if (tone) this.setColorTone(tone);
    };

    // Resolve conflict by EventEffects.js
    const _Sprite_Character_updateAngle      = Sprite_Character.prototype.updateAngle;
    Sprite_Character.prototype.updateAngle = function() {
        if (this._character.originY() != null) {
            return;
        }
        _Sprite_Character_updateAngle.apply(this, arguments);
    };

    const _Sprite_Character_setFrame      = Sprite_Character.prototype.setFrame;
    Sprite_Character.prototype.setFrame = function(sx, sy, pw, ph) {
        const rect = this._character.getTrimRect();
        if (rect) {
            _Sprite_Character_setFrame.call(this, sx + rect.x, sy + rect.y, rect.width, rect.height);
        } else {
            _Sprite_Character_setFrame.call(this, sx, sy,
                pw * this._character.tileBlockWidth(), ph * this._character.tileBlockHeight());
        }
    };

    const _Sprite_Character_isImageChanged      = Sprite_Character.prototype.isImageChanged;
    Sprite_Character.prototype.isImageChanged = function() {
        return _Sprite_Character_isImageChanged.apply(this, arguments) || this.isCustomImageChanged();
    };

    Sprite_Character.prototype.isCustomImageChanged = function() {
        return this._customResource !== this._character.customResource() ||
            this._customTilesetId !== this._character.customTilesetId();
    };

    const _Sprite_Character_setCharacterBitmap      = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
        if (this._customResource) {
            const hue = this._character.customResourceHue() || 0;
            this.bitmap = ImageManager['load' + this._customResource](this._characterName);
            if (hue > 0) {
                this.setHue(hue);
            }
        } else {
            _Sprite_Character_setCharacterBitmap.apply(this, arguments);
        }
    };

    const _Sprite_Character_characterBlockX      = Sprite_Character.prototype.characterBlockX;
    Sprite_Character.prototype.characterBlockX = function() {
        if (this._customResource) {
            return this._characterIndex % this._character.graphicColumns();
        } else {
            return _Sprite_Character_characterBlockX.apply(this, arguments);
        }
    };

    const _Sprite_Character_characterBlockY      = Sprite_Character.prototype.characterBlockY;
    Sprite_Character.prototype.characterBlockY = function() {
        if (this._customResource) {
            return Math.floor(this._characterIndex / this._character.graphicColumns());
        } else {
            return _Sprite_Character_characterBlockY.apply(this, arguments);
        }
    };

    const _Sprite_Character_patternWidth      = Sprite_Character.prototype.patternWidth;
    Sprite_Character.prototype.patternWidth = function() {
        if (this._customResource) {
            return this.bitmap.width / this._character.graphicColumns();
        } else {
            return _Sprite_Character_patternWidth.apply(this, arguments);
        }
    };

    const _Sprite_Character_patternHeight      = Sprite_Character.prototype.patternHeight;
    Sprite_Character.prototype.patternHeight = function() {
        if (this._customResource) {
            return this.bitmap.height / this._character.graphicRows();
        } else {
            return _Sprite_Character_patternHeight.apply(this, arguments);
        }
    };

    const _Sprite_Character_characterPatternX      = Sprite_Character.prototype.characterPatternX;
    Sprite_Character.prototype.characterPatternX = function() {
        if (this._customResource) {
            return 0;
        } else {
            return _Sprite_Character_characterPatternX.apply(this, arguments);
        }
    };

    const _Sprite_Character_characterPatternY      = Sprite_Character.prototype.characterPatternY;
    Sprite_Character.prototype.characterPatternY = function() {
        if (this._customResource) {
            return 0;
        } else {
            return _Sprite_Character_characterPatternY.apply(this, arguments);
        }
    };

    // for ApngPicture.js
    var _Sprite_Character_setCharacterBitmap2 = Sprite_Character.prototype.setCharacterBitmap;
    Sprite_Character.prototype.setCharacterBitmap = function() {
        _Sprite_Character_setCharacterBitmap2.apply(this, arguments);
        if (this.addApngChild) {
            this.addApngChild(this._characterName);
        }
    };

    Sprite_Character.prototype.loadApngSprite = function(name) {
        switch (this._customResource) {
            case 'Picture':
                return SceneManager.tryLoadApngPicture(name);
            case 'SvEnemy':
                return SceneManager.tryLoadApngSideEnemy(name);
            case 'Enemy':
                return SceneManager.tryLoadApngEnemy(name);
            default:
                return null;
        }
    };

    var _Scene_Base_terminate = Scene_Base.prototype.terminate;
    Scene_Base.prototype.terminate = function() {
        _Scene_Base_terminate.apply(this, arguments);
        if (this._spriteset && this._spriteset.destroyApngCharacter) {
            this._spriteset.destroyApngCharacter();
        }
    };

    Spriteset_Map.prototype.destroyApngCharacter = function() {
        this._characterSprites.forEach(function(sprite) {
            if (sprite.destroyApngIfNeed) {
                sprite.destroyApngIfNeed();
            }
        })
    };
})();
