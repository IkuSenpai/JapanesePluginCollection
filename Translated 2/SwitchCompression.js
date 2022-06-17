//=============================================================================
// RPG Maker MZ - SwitchCompression
//=============================================================================

// ----------------------------------------------------------------------------
// Copyright (c) 2022 ひち
// This software is released under the MIT License.
// ----------------------------------------------------------------------------
// Version
// 1.0.0 2021/ 1/31 初版
// 0.9.1 2022/ 1/23 アツマール上で動かない不具合を修正
// 0.9.0 2022/ 1/19 β版
// ----------------------------------------------------------------------------
// 作者もまだまだ手探り状態で作っているため、
// バグ報告などいただいても修正できるかどうかについては保証いたしかねます。
// それを承知の上、自己責任でご使用下さい。
// ----------------------------------------------------------------------------

/*:
 * @target MZ
 * @plugindesc スイッチとセルフスイッチを圧縮し、セーブ容量を削減するプラグイン。
 * @author ひち
 * 
 * @help SwitchCompression.js
 *
 * スイッチ・セルフスイッチのデータを圧縮し、セーブファイルの容量を削減するよ。
 * 
 * 使用方法については、基本的にプラグインを導入するだけでオッケー！
 * 設定も特別な理由がない限りデフォルトのままで大丈夫。
 * 
 * でも効果は正直微妙で、AtsumaruSaveCompression.js ほどの劇的変化はなく、
 * 大抵の場合は焼け石に水（50~200バイト程度）で終わっちゃうと思います。
 * というか、人によっては逆に増える可能性まであるから、過度な期待はしないでね！
 * 
 * AtsumaruSaveCompression.js と併用はできるので、効果を増幅させるプラグイン、
 * という風に思っていただけるといいかなーって思ってます。
 * 
 * 主にセルフスイッチを沢山使っているほど恩恵が大きい傾向があります。
 * どれだけ圧縮できるかはゲーム環境にかなり依存するので、
 * ある程度ゲームの形が出来てからプラグインコマンドで各機能の ON / OFF を
 * 切り替えながら最終的に使うかどうかを判断しちゃって下さいませ！
 * 
 * 使い方の例外として、セルフスイッチの拡張、例えば ABCD 以外の E～ とか、
 * イベントにセルフ変数とかを追加してセーブするような凝ったゲームシステムだと
 * 正常に動作しない可能性があります。（一応、対応オプション用意しています）
 * 
 * ちなみに一度このプラグインでセーブデータに圧縮をかけた後、
 * プラグイン自体を OFF にしてしまうとセーブデータが正常に読み込めなくなるよ。
 * セーブデータを元に戻したい場合は、プラグイン内のオプションを切り替えて
 * 圧縮しない方式にしてからセーブデータを読み込み、その後もう一度セーブしてね。
 * --------------------------------------------------------------------
 * 【 通常スイッチの圧縮 】
 * 
 * 通常スイッチのデータを圧縮する機能。
 * 設定で true にしておけば勝手に動作するよ。
 * 
 * 圧縮の都合上、ロード時にスイッチ最大数が 8 の倍数に修正されちゃいます。
 * 例えば、81個のスイッチを定義していた場合、88個になる、という事です。
 * 
 * 実は圧縮効率がそこまで良くない機能なので、
 * 場合によっては使わない方が容量が少ないこともあったり…
 * true / false 両方試してみて、使うかどうかを判断してね。
 * （プラグインコマンドでゲーム中でも一時的に変更できます）
 * 
 * --------------------------------------------------------------------
 * 【 セルフスイッチの圧縮 】
 * 
 * セルフスイッチのデータを圧縮する機能。
 * 設定で true にしておけば勝手に動作するよ。
 * 
 * 圧縮の都合で、ちょっとした制限がかかっちゃいます。
 * ・マップ数上限は 1023 まで
 * ・イベント数上限はひとつのマップにつき 1023 まで
 * プラグインなどで限界突破させている場合は注意してね！
 * 
 * 調べてみた限り、セルフスイッチは結構セーブ容量を食う傾向があるみたい。
 * 多用している人はかなりの恩恵があると思うので、是非とも使用してみてね。
 * （プラグインコマンドでゲーム中でも一時的に変更できます）
 * 
 * --------------------------------------------------------------------
 * 【 不要セルフスイッチの削除 】
 * 
 * セーブ時に存在しないイベントのセルフスイッチを削除する機能。
 * 設定で true にしておけば勝手に動作するよ。
 * （デフォルトは false なので、使うなら true にしてね）
 * 
 * これはセーブデータ圧縮というより、
 * 行方不明になったセルフスイッチのお掃除機能です。
 * 全てのマップを完璧にお掃除できる訳ではないので、過度な期待はしないでね。
 * （ゲーム起動時から一度でも進入した事のあるマップ内しか見ないため）
 * 
 * ゲーム全体が綺麗な設計をしている場合、使いどころはぶっちゃけ無いです。
 * （プラグインコマンドでゲーム中でも一時的に変更できます）
 * 
 * --------------------------------------------------------------------
 * 【 キーネーム 01 ～ 12 】
 * 
 * セーブ対象とするセルフスイッチのキーネーム。
 * 01 ～ 04 はよほどの理由がなければデフォルトのままにしておいてね。
 * 
 * 05 ～ は追加定義用で、プラグインなんかで ABCD だけでなく
 * E ～ のようにセルフスイッチを追加した場面を想定して用意しています。
 * よくわかんない場合は空欄にしておいてね。
 * （ちなみに追加定義分は動作確認してません！ごめん！ごめんて！）
 * 
 * --------------------------------------------------------------------
 * 
 * @command changeNormalSwitchCompression
 * @text 「通常スイッチの圧縮」の変更
 * @desc 「通常スイッチの圧縮」機能を使用するかどうか変更できます。
 * どれだけの差が出るかを見る時などにお使い下さい。
 *
 * @arg useflag
 * @text 圧縮機能の使用
 * @desc OFF(false) にするとセーブが通常処理に戻ります。
 * ロードはプラグインが有効な限り、どちらでも読めます。
 * @default true
 * @type boolean
 * 
 * @command changeSelfSwitchCompression
 * @text 「セルフスイッチの圧縮」の変更
 * @desc 「セルフスイッチの圧縮」機能を使用するかどうか変更できます。
 * どれだけの差が出るかを見る時などにお使い下さい。
 *
 * @arg useflag
 * @text 圧縮機能の使用
 * @desc OFF(false) にするとセーブが通常処理に戻ります。
 * ロードはプラグインが有効な限り、どちらでも読めます。
 * @default true
 * @type boolean
 * 
 * @command changeSelfSwitchNothingRemove
 * @text 「不要セルフスイッチの削除」の変更
 * @desc 「不要セルフスイッチの削除」機能を使用するかどうか変更できま
 * す。どれだけの差が出るかを見る時などにお使い下さい。
 *
 * @arg useflag
 * @text 削除機能の使用
 * @desc OFF(false) にすると不要セルフスイッチの削除が無効となり、
 * 全てのセルフスイッチを保存するようになります。
 * @default true
 * @type boolean
 * 
 * @param normalSwitchCompression
 * @text 通常スイッチの圧縮
 * @desc 通常スイッチを圧縮します。
 * 圧縮率が微妙なため、使用しない方が良い場合もあります。
 * @type boolean
 * @default true
 * 
 * @param selfSwitchCompression
 * @text セルフスイッチの圧縮
 * @desc セルフスイッチを圧縮します。
 * セルフスイッチは圧縮率が高いので使用推奨です。
 * @type boolean
 * @default true
 * 
 * @param selfSwitchNothingRemove
 * @text 不要セルフスイッチの削除
 * @desc 存在しないイベントのセルフスイッチを削除します。
 * ゲーム起動時から進入したマップまでを対象とします。
 * @type boolean
 * @default false
 * 
 * @param selfSwitchKey01
 * @text キーネーム 01
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 01 ～ 04 は、なるべく変更しない事をお勧めします。
 * @type string
 * @default A
 * 
 * @param selfSwitchKey02
 * @text キーネーム 02
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 01 ～ 04 は、なるべく変更しない事をお勧めします。
 * @type string
 * @default B
 * 
 * @param selfSwitchKey03
 * @text キーネーム 03
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 01 ～ 04 は、なるべく変更しない事をお勧めします。
 * @type string
 * @default C
 * 
 * @param selfSwitchKey04
 * @text キーネーム 04
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 01 ～ 04 は、なるべく変更しない事をお勧めします。
 * @type string
 * @default D
 * 
 * @param selfSwitchKey05
 * @text キーネーム 05
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 * 
 * @param selfSwitchKey06
 * @text キーネーム 06
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 * 
 * @param selfSwitchKey07
 * @text キーネーム 07
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 * 
 * @param selfSwitchKey08
 * @text キーネーム 08
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 * 
 * @param selfSwitchKey09
 * @text キーネーム 09
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 * 
 * @param selfSwitchKey10
 * @text キーネーム 10
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 * 
 * @param selfSwitchKey11
 * @text キーネーム 11
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 * 
 * @param selfSwitchKey12
 * @text キーネーム 12
 * @desc セルフスイッチの判定に使うキーネームを定義します。
 * ※ 05 ～ は ABCD 以外に追加した場合に定義して下さい。
 * @type string
 */

//-------------------------------------------------------------------
//
// ここから開発者向けのメモというか備忘録
//
//-------------------------------------------------------------------
// ヘッダ情報とデータの中身の構造について（全てリトルエンディアンで保存）
//
// 4 byte : バッファサイズ
// 1 byte : 圧縮方式のバージョンラベル
//
// 1 byte : 通常スイッチである事を表すTYPE番号(1)
// 3 byte : 通常スイッチのバイナリ領域数
// 1 byte : 通常スイッチ情報
// 　　　　　... ヘッダで読み込んだ領域数分 1byte の通常スイッチ情報が続く
//
// 1 byte : セルフスイッチである事を表すTYPE番号(2)
// 3 byte : セルフスイッチのバイナリ領域数
// 4 byte : セルフスイッチ情報
// 　　　　　... ヘッダで読み込んだ領域数分 4byte のセルフスイッチ情報が続く
//
// ロード時はTYPE番号を見て存在しているデータだけ読み出します。
//-------------------------------------------------------------------
// 通常スイッチ情報(1byte)の中身は以下の通り
//
// 0b00000001 >> スイッチ 1 番 のフラグ
// 0b00000010 >> スイッチ 2 番 のフラグ
//　　　　　　～　省略　～
// 0b01000000 >> スイッチ 7 番 のフラグ
// 0b10000000 >> スイッチ 8 番 のフラグ
//
// 本来のセーブ方式では定義されている個数分 true とか false とか null が
// 文字列で保存されているので、それをビット化して 8個 のスイッチ情報を
// 1バイト内に収める、という方法で容量圧縮を実現しています。
// そのため、例えば 81個 のスイッチを定義していた場合、
// ロード時に定義数が勝手に 8 の倍数、つまり今回の例だと 88個 に
// 修正されてしまいますが、これは仕様となります。
// （81個 でも 88個 でも使用容量はほぼ変わらないのでご安心下さい）
// ちなみに null 情報は消滅し、自動的に false 扱いとなります。
//-------------------------------------------------------------------
// セルフスイッチ情報(4byte)の中身は以下の通り
//
// 0b00000000000000000000001111111111 >> 1 ～ 1023 の マップID
// 0b00000000000011111111110000000000 >> 1 ～ 1023 の イベントID
// 0b00000000000100000000000000000000 >> キーネーム A のフラグ
// 0b00000000001000000000000000000000 >> キーネーム B のフラグ
// 0b00000000010000000000000000000000 >> キーネーム C のフラグ
// 0b00000000100000000000000000000000 >> キーネーム D のフラグ
// 0b11111111000000000000000000000000 >> 追加定義用
//
// セルフスイッチはキーネーム毎に1個ずつ個別のフラグ情報として保存しており、
// 同一マップID ＆ 同一イベントID の場合でもABCDをわざわざ分けて保存しています。
// しかもご丁寧にキーネームまで一緒に、ひとつひとつ文字列として保存しています。
// このプラグインはその辺の無駄に容量食いまくっている部分を
// ビットフラグ化させることで容量圧縮を実現しています。
//-------------------------------------------------------------------
// 不要セルフスイッチの削除機能について
//
// この機能、ぶっちゃけいらないかもしれないけど、
// もしかしたら需要あるかもしれないので作ってみました。
// スクリプトやプラグインなどで本来保存すべきでないセルフスイッチが
// 残ったままになるような設計をしていた場合、素晴らしい効果を発揮します。
//
// ちなみに全マップのイベントを見れない理由は、どのマップにどのイベントIDが
// 生きているかはマップのJSONを読み込まないとわからないからです。
// 数十個程度なら強引に読みに行っても良かったのですが、数百個になると
// パフォーマンス低下の影響も無視できない事になりそうなので、
// 通常進行でマップを読んだ際にイベントIDをストックしておく方式を取りました。
//-------------------------------------------------------------------

(() => {
    'use strict';
    const pluginName = "SwitchCompression";
    let enumtop;

    // 圧縮方式のバージョンラベル（何かしらの変更があった時のために）
    enumtop = 0;
    const switchCompressionDataVersion = {
        VERSION_EMPTY: enumtop++,
        //-------------------------------
        VERSION_1_0_0: enumtop++,

        //-------------------------------
        VERSION_LATEST: enumtop-1,
	};

    // ヘッダー関係
    const HEADER_SIZE = 4;
    const HEADER_VERSION_LABEL = 1;
	const HEADER_TYPE_NORMALSWITCH = 1;
	const HEADER_TYPE_SELFSWITCH   = 2;
    const HEADER_BITMASK_TYPE = 0b00000000000000000000000011111111;
    const HEADER_BITMASK_BODY = 0b00000000111111111111111111111111;
	const HEADER_BITSHIFT_BODY = 8;

    // スイッチを分解するためのビットマスク
	const BITMASK_FLAGVALUE = 0b0000000011111111;
	const BITMASK_FLAGONE   = 0b0000000000000001;

    // セルフスイッチを分解するためのビットマスク
	const BITSHIFT_IDVALUE = 10;
	const BITMASK_IDVALUE = 0b00000000000000000000001111111111;
	const BITMASK_KEYNAME = 0b00000000000000000000000000000001;

    // セルフスイッチ情報1つのサイズ
	const SELFSWITCHE_VALUELEN = 4;

    // マップ上の初期設置されたイベントIDリスト（不要セルフスイッチの削除に使う）
    let mapEventIdList = [];

    // 16進数文字列から変換されたスイッチ情報
    let normalSwitchesData;
    let selfSwitchesData;

    //-----------------------------------------------------------------------------
    // プラグインのオプション

    let normalSwitchCompression = PluginManager.parameters(pluginName).normalSwitchCompression === "true";   // 通常スイッチの圧縮
    let selfSwitchCompression = PluginManager.parameters(pluginName).selfSwitchCompression === "true";       // セルフスイッチの圧縮
    let selfSwitchNothingRemove = PluginManager.parameters(pluginName).selfSwitchNothingRemove === "true";   // 不要セルフスイッチの削除
    //-----------------------------------------------------------------------------
    // プラグインコマンド

    PluginManager.registerCommand(pluginName, 'changeNormalSwitchCompression' , args => {
        // 「通常スイッチの圧縮」の変更
        const useflag = args.useflag;
        normalSwitchCompression = JSON.parse(useflag.toLowerCase());
    });
    PluginManager.registerCommand(pluginName, 'changeSelfSwitchCompression' , args => {
        // 「セルフスイッチの圧縮」の変更
        const useflag = args.useflag;
        selfSwitchCompression = JSON.parse(useflag.toLowerCase());
    });
    PluginManager.registerCommand(pluginName, 'changeSelfSwitchNothingRemove' , args => {
        // 「不要セルフスイッチの削除」の変更
        const useflag = args.useflag;
        selfSwitchNothingRemove = JSON.parse(useflag.toLowerCase());
        if(selfSwitchNothingRemove){
            // 有効なら早速イベントIDリストの更新を試みる
            recordNewMapEventId();
        }
    });
    //-----------------------------------------------------------------------------

    function getSelfKeynameTable() {
        // キーネームテーブルの作成
        const deftable = [
            PluginManager.parameters(pluginName).selfSwitchKey01,
            PluginManager.parameters(pluginName).selfSwitchKey02,
            PluginManager.parameters(pluginName).selfSwitchKey03,
            PluginManager.parameters(pluginName).selfSwitchKey04,
            PluginManager.parameters(pluginName).selfSwitchKey05,
            PluginManager.parameters(pluginName).selfSwitchKey06,
            PluginManager.parameters(pluginName).selfSwitchKey07,
            PluginManager.parameters(pluginName).selfSwitchKey08,
            PluginManager.parameters(pluginName).selfSwitchKey09,
            PluginManager.parameters(pluginName).selfSwitchKey10,
            PluginManager.parameters(pluginName).selfSwitchKey11,
            PluginManager.parameters(pluginName).selfSwitchKey12,
        ];
        const keytable = [];
        deftable.forEach(keyname => {
            if(keyname !== ""){
                keytable.push(keyname);
            }
        });

        return keytable;
    };

    function hexStringToarrayBuffer(binstr) {
        // 16進数文字列をバイナリ配列へと変換
        const binstrlen = parseInt(encodeURI(binstr).replace(/%../g, "*").length / 2);
        //const binstrlen = parseInt(Buffer.byteLength(binstr) / 2); // ← これ使っちゃだめ！ローカルで動くけどアツマールで動かない！
        //const binstrlen = encodeURI(binstr).replace(/%../g, "*").length; // バイナリ文字列用

        let buffer = new ArrayBuffer(binstrlen);
        let buffview = new Uint8Array(buffer);
        for(let i = 0; i < binstrlen; i++){
            const hexstring = binstr.substring(i * 2, (i * 2) + 2);
            buffview[i] = parseInt(hexstring, 16);

            // ちなみにこっちはバイナリ文字列で読む処理
            // 両方試した結果、16進数文字列の方が軽かったので不採用（圧縮アルゴリズム的に恐らく効率が悪いと思われる）
            // buffview[i] = binstr.charCodeAt(i);
        }
        return buffer;
    };

    function arrayBufferToHexString(buffer) {
        // バイナリ配列を16進数文字列へと変換
        let binstr = "";
        const bytearray = new Uint8Array(buffer);
        for(let i = 0; i < bytearray.byteLength; i++){
            binstr += (bytearray[i] < 16 ? "0" : "") + bytearray[i].toString(16);

            // ちなみにこっちはバイナリ文字列で読む処理
            // 両方試した結果、16進数文字列の方が軽かったので不採用（圧縮アルゴリズム的に恐らく効率が悪いと思われる）
            // binstr += String.fromCharCode(bytearray[i]);
        }
        return binstr;
    };

    function recordNewMapEventId() {
        // 不要セルフスイッチ削除のために進入したマップ全ての設置イベントIDを記憶しておく
        if(selfSwitchNothingRemove){
            // 既に記録されているマップIDか
            const mapId = $gameMap.mapId();
            let i;
            for(i = 0; i < mapEventIdList.length; i++){
                if(mapEventIdList[i].mapid === mapId){
                    // 既に記録されているマップIDでした
                    break;
                }
            }
            if(i >= mapEventIdList.length){
                // まだ見ていないマップIDだったので記録する
                $dataMap.events.forEach(eventobj => {
                    if(eventobj){
                        mapEventIdList.push({mapid: mapId, evid: eventobj.id});
                    }
                });
            }
        }
    };

    function removeNothingSelfSwitches(selfsw) {
        // 対象となるイベントが存在しないセルフスイッチを削除する

        // 検索対象マップIDリストを作成する
        let mapidlist = [];
        let mapidpos = [];
        let nowmapid = 0;
        for(let i = 0; i < mapEventIdList.length; i++){
            if(mapEventIdList[i].mapid !== nowmapid){
                nowmapid = mapEventIdList[i].mapid;
                mapidlist.push(nowmapid);
                mapidpos.push(i);
            }
        }

        Object.keys(selfsw).forEach(function(key) {
            const keyarray = key.split(",");
            const mapid = parseInt(keyarray[0]);
            const eventid = parseInt(keyarray[1]);

            let listid = -1;
            for(let i = 0; i < mapidlist.length; i++){
                if(mapidlist[i] === mapid){
                    // 検索対象
                    listid = i;
                    break;
                }
            }
            if(listid >= 0){
                // マップIDとイベントを照らし合わせ、存在していないイベントであれば削除対象とする
                let selfflag = false;
                let listpos = mapidpos[listid];
                while(mapEventIdList[listpos].mapid === mapid){
                    if(mapEventIdList[listpos].evid === eventid){
                        selfflag = true;
                        break;
                    }
                    listpos++;
                    if(listpos >= mapEventIdList.length) break;
                }
                if(selfflag === false){
                    // 削除
                    delete this[key];
                }
            }
        }, selfsw);

        return selfsw;
    };

    function extractSelfSwitchesBuffer(buffer, buffpos, bufflen) {
        // セルフスイッチのバッファを、元のセルフスイッチの形に戻して返却する

        // キーネームのテーブル
        const keytable = getSelfKeynameTable();

        // セルフスイッチ復元用変数
        let selfdata = {};

        // セルフスイッチバッファの操作用
        let buffview = new DataView(buffer);
        let buffoffset = buffpos;
        let getself;
        let selfdata_count;
        const selfdata_size = parseInt(bufflen / SELFSWITCHE_VALUELEN);

        // バッファからセルフスイッチ情報を抜き出し、復元していく
        for(selfdata_count = 0; selfdata_count < selfdata_size; selfdata_count++){
            getself = buffview.getUint32(buffoffset, true); buffoffset += SELFSWITCHE_VALUELEN;
            const mapid = getself & BITMASK_IDVALUE;
            const eventid = (getself >> BITSHIFT_IDVALUE) & BITMASK_IDVALUE;
            const keynamebit = getself >> (BITSHIFT_IDVALUE + BITSHIFT_IDVALUE);
            for(let i = 0; i < keytable.length; i++){
                // キーネームのビットが立っていたら対応するキーネームを元にセルフスイッチを復元する
                if((keynamebit >> i) & BITMASK_KEYNAME !== 0){
                    const key = [mapid, eventid, keytable[i]];
                    selfdata[key] = true;
                }
            }
        }

        return selfdata;
    };

    function createSelfSwitchesBuffer() {
        // セルフスイッチを32bit整数へと変換した後、バイナリ配列のバッファとして返却する

        // セルフスイッチ配列の準備
        let gamesw;
        if(selfSwitchNothingRemove){
            // 事前に不要セルフスイッチの削除を行う
            gamesw = removeNothingSelfSwitches($gameSelfSwitches.getArray());
        }
        else{
            // 通常コピー
            gamesw = $gameSelfSwitches.getArray();
        }

        // キーネームのテーブル
        const keytable = getSelfKeynameTable();

        // セルフスイッチを32bit整数として保存するための配列
        let selflong = [];

        // セルフスイッチを分解する
        Object.keys(gamesw).forEach(function(key) {
            if(this[key]){
                let i;
                const keyarray = key.split(",");
                const mapid = keyarray[0] & BITMASK_IDVALUE;     // マップIDは 10 bit より上の情報は切り捨てる（上限 1023 まで）
                const eventid = keyarray[1] & BITMASK_IDVALUE;   // イベントIDも 10 bit より上の情報は切り捨てる（上限 1023 まで）
                const keyname = keyarray[2];
                let keyvalue = 0;
                for(i = 0; i < keytable.length; i++){
                    if(keytable[i] === keyname){
                        // キーネームと一致したのでインデックス分ビットをずらして保存
                        keyvalue = 1 << i;
                        break;
                    }
                }

                if(keyvalue > 0){
                    const selflongval = ((keyvalue << (BITSHIFT_IDVALUE * 2)) | (eventid << BITSHIFT_IDVALUE) | mapid);
                    const checkself = selflongval & (BITMASK_IDVALUE | (BITMASK_IDVALUE << BITSHIFT_IDVALUE));
                    for(i = 0; i < selflong.length; i++){
                        const checktarget = selflong[i] & (BITMASK_IDVALUE | (BITMASK_IDVALUE << BITSHIFT_IDVALUE));
                        if(checkself === checktarget){
                            // 同マップID & 同イベントID のキーネーム違いを発見
                            break;
                        }
                    }
                    if(i < selflong.length){
                        // 同IDの場合は節約のためにビットフラグを既存の変数へ埋め込む
                        selflong[i] |= selflongval;
                    }
                    else{
                        // 新規の変数を追加
                        selflong.push(selflongval);
                    }
                }
            }
        }, gamesw);

        // セーブ用のバイナリデータを作成
        let buffer = new ArrayBuffer(selflong.length * SELFSWITCHE_VALUELEN);
        let buffview = new DataView(buffer);
        let buffoffset = 0;
        selflong.forEach(selfval => {
            buffview.setUint32(buffoffset, selfval, true); buffoffset += SELFSWITCHE_VALUELEN;
        });

        return buffer;
    };

    function extractNormalSwitchesBuffer(buffer, buffpos, bufflen) {
        // 通常スイッチのバッファを、元のセルフスイッチの形に戻して返却する

        // スイッチ復元用変数
        let swdata = [];

        // スイッチバッファの操作用
        let buffview = new Uint8Array(buffer);

        // バッファからスイッチ情報を抜き出し、復元していく
        for(let buffoffset = buffpos; buffoffset < buffpos + bufflen; buffoffset++){
            let swvalue = buffview[buffoffset];
            for(let i = 0; i < 8; i++){
                if((swvalue >> i) & BITMASK_FLAGONE !== 0){
                    // ビットが立っている >> true
                    swdata.push(true);
                }
                else{
                    // ビットが立っていない >> false
                    swdata.push(false);
                }
            }
        }

        return swdata;
    };

    function createNormalSwitchesBuffer() {
        // 通常のスイッチをLong型変数へと変換した後、バイナリ配列のバッファとして返却する

        // スイッチを8bit整数として保存するための配列
        let swarray = [];
        let swvalue = 0;

        // ビットフラグ管理用
        let swbitcount = 0;

        // スイッチを分解する
        const gamesw = $gameSwitches.getArray();
        for(let i = 0; i < gamesw.length; i++){
            if(swbitcount < 8){
                if(gamesw[i]){
                    // true の時だけビットを立てる
                    swvalue |= 1 << swbitcount;
                }
                swbitcount++;
            }
            if(swbitcount === 8){
                // 8bit に達したらバイナリ配列にバイト情報を入れてビットカウントを初期化
                swarray.push(swvalue);
                swvalue = 0;
                swbitcount = 0;
            }
        }
        if(swbitcount > 0){
            // 保存しきれていないビット情報が残っているならそれも入れる
            swarray.push(swvalue);
        }

        // バイナリ配列に変換して返却する
        let buffer = new ArrayBuffer(swarray.length);
        let buffview = new Uint8Array(buffer);
        for(let i = 0; i < swarray.length; i++){
            buffview[i] = (swarray[i] & BITMASK_FLAGVALUE);
        }

        return buffer;
    };

    function extractSwitchesCompression(binstr) {
        // ロード時に読み込まれた16進数文字列からスイッチ情報を復元する
        let buffer = hexStringToarrayBuffer(binstr);
        let buffview = new DataView(buffer);
        let buffoffset = 0;

        // ヘッダの最初の位置から 4byte 分にバッファサイズが入っている
        const buffer_size = buffview.getUint32(buffoffset, true); buffoffset += HEADER_SIZE;

        // 圧縮方式のバージョンラベルを読み込む（このバージョンによって、この後のデータの展開を変えるかも）
        const compver = buffview.getUint8(buffoffset, true); buffoffset += HEADER_VERSION_LABEL;
        const verlabel = switchCompressionDataVersion;

        // ローカルのスイッチ情報をクリア
        normalSwitchesData = void 0;
        selfSwitchesData = void 0;

        // 圧縮方式バージョンが異常値なら展開を辞めて強制終了
        if((compver === verlabel.VERSION_EMPTY) || (compver > verlabel.VERSION_LATEST)){
            return;
        }

        while(buffoffset < buffer_size){
            // ヘッダーを読む
            const input_header = buffview.getUint32(buffoffset, true); buffoffset += HEADER_SIZE;
            const data_type = input_header & HEADER_BITMASK_TYPE;
            if(data_type > 0){
                // バイナリ配列の参照アドレス初期化
                const data_len = (input_header >> HEADER_BITSHIFT_BODY) & HEADER_BITMASK_BODY;
                const data_pos = buffoffset;
                buffoffset += data_len;

                // ヘッダータイプによって読み込むデータの種類を分ける
                if(data_type === HEADER_TYPE_NORMALSWITCH){
                    // 通常スイッチの復元
                    normalSwitchesData = extractNormalSwitchesBuffer(buffer, data_pos, data_len);
                }
                else if(data_type === HEADER_TYPE_SELFSWITCH){
                    // セルフスイッチの復元
                    selfSwitchesData = extractSelfSwitchesBuffer(buffer, data_pos, data_len);
                }
            }
            else{
                // なんかおかしな事がおきたので強制終了
                break;
            }
        }
    };

    function createSwitchesCompression() {
        // スイッチ情報を全てバイナリ化し、16進数文字列として返却する
        // （ちなみに最初はバイナリ文字列でやってたけど、圧縮効率がいまひとつだった）

        // 通常スイッチとセルフスイッチをバイナリ化
        let buffer_normal = createNormalSwitchesBuffer();
        let buffer_self = createSelfSwitchesBuffer();
        let buffnormal_view = new Uint8Array(buffer_normal);
        let buffself_view = new Uint8Array(buffer_self);

        // 保存用のバッファを用意
        const normalbuff_size = normalSwitchCompression ? HEADER_SIZE + buffer_normal.byteLength : 0;
        const selfbuff_size = selfSwitchCompression ? HEADER_SIZE + buffer_self.byteLength : 0;
        const buffer_size = HEADER_SIZE + HEADER_VERSION_LABEL + normalbuff_size + selfbuff_size;
        let buffer = new ArrayBuffer(buffer_size);
        let buffview = new DataView(buffer);
        let buffoffset = 0;

        // バッファサイズの記録
        buffview.setUint32(buffoffset, buffer_size, true); buffoffset += HEADER_SIZE;

        // 圧縮方式のバージョンラベルを記録
        buffview.setUint8(buffoffset, switchCompressionDataVersion.VERSION_LATEST, true); buffoffset += HEADER_VERSION_LABEL;

        // 通常スイッチの圧縮
        if(normalSwitchCompression){
            // 32bit整数化された通常スイッチのバイナリ領域数を記録
            const output_header = HEADER_TYPE_NORMALSWITCH | (buffer_normal.byteLength << HEADER_BITSHIFT_BODY);
            buffview.setUint32(buffoffset, output_header, true); buffoffset += HEADER_SIZE;

            // ビット化された通常スイッチ情報を記録
            for(let i = 0; i < buffer_normal.byteLength; i++){
                buffview.setUint8(buffoffset, buffnormal_view[i], true); buffoffset += 1;
            }
        }

        if(selfSwitchCompression){
            // 32bit整数化されたセルフスイッチのバイナリ領域数を記録
            const output_header = HEADER_TYPE_SELFSWITCH | (buffer_self.byteLength << HEADER_BITSHIFT_BODY);
            buffview.setUint32(buffoffset, output_header, true); buffoffset += HEADER_SIZE;

            // ビット化されたセルフスイッチ情報を記録
            for(let i = 0; i < buffer_self.byteLength; i++){
                buffview.setUint8(buffoffset, buffself_view[i], true); buffoffset += 1;
            }
        }

        let binstr;
        if(normalSwitchCompression || selfSwitchCompression){
            // 16進数文字列を作成
            binstr = arrayBufferToHexString(buffer);
            
            // ちなみになんでここで保存用の文字列なんかを作成しているのかというと、
            // どうやらツクールMZのセーブ仕様（JSON形式？）では
            // 生のバイナリデータ保存はできないっぽいので、わざわざこんな手順を踏んでいます。
        }
        else{
            binstr = void 0;
        }

        return binstr;
    };

    //-----------------------------------------------------------------------------
    // DataManager オーバーライド
    //
    // セーブ・ロードにスイッチ情報圧縮処理を追加
    //-----------------------------------------------------------------------------
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        // ロード時、追加した情報があるかどうかで処理を追加する

        // スイッチバッファが存在するかチェック
        const switch_buffer = contents.switchBuffer;
        if(switch_buffer){
            // バッファが存在する事を確認、ローカル変数へスイッチ情報を展開
            extractSwitchesCompression(switch_buffer);

            // 通常スイッチを復元
            if(normalSwitchesData){
                contents.switches = new Game_Switches();
                contents.switches._data = normalSwitchesData;
            }

            // セルフスイッチを復元
            if(selfSwitchesData){
                contents.selfSwitches = new Game_SelfSwitches();
                contents.selfSwitches._data = selfSwitchesData;
            }
        }

        // 通常の処理に引き渡す
        _DataManager_extractSaveContents.call(this, contents);
    };
    const _DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        // セーブする情報を一部書き換える

        // デフォルト情報をまず読み込んでおく
        const contents = _DataManager_makeSaveContents.call(this);
        let newcontents = contents;

        // スイッチの圧縮処理を使うかチェック
        if(normalSwitchCompression || selfSwitchCompression){
            // // 競合対策としてなるべく情報をそのまま引き継ぐ（こんなやり方でいいのかな？）
            if(normalSwitchCompression) newcontents.switches = void 0;
            if(selfSwitchCompression) newcontents.selfSwitches = void 0;
            
            // セルフスイッチのバッファを作成し、新たな要素として保存対象に加える
            newcontents.switchBuffer = createSwitchesCompression();
        }
        else{
            // 使わない場合（不要セルフスイッチ削除機能のみを使う場合）
            if(selfSwitchNothingRemove){
                newcontents.selfSwitches = removeNothingSelfSwitches(contents.selfSwitches.getArray());
            }
        }

        return newcontents;
    };

    //-----------------------------------------------------------------------------
    // Game_Switches / Game_SelfSwitches 追加定義
    //
    // スイッチの元データ参照関数を追加
    // （だってだってぇ、直接参照避けろって言うからぁ…）
    //-----------------------------------------------------------------------------
    Game_Switches.prototype.getArray = function() {
        return this._data;
    };
    Game_SelfSwitches.prototype.getArray = function() {
        return this._data;
    };

    //-----------------------------------------------------------------------------
    // Game_Map オーバーライド
    //
    // マップのセットアップ時にどれだけのイベントが存在するかを記憶しておく（動的設置されるイベントは対象外）
    //-----------------------------------------------------------------------------
    const _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.call(this, mapId);

        // イベントIDの記録
        recordNewMapEventId();
    };

})();