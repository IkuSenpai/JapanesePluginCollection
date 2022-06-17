//=============================================================================
// Keke_MangaLikeView - マンガライクビュー
// バージョン: 1.6.4
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ 
 * @plugindesc マンガ的表現のバトルビュー
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【1.6.4】
 * マンガ的な躍動感あるバトルビュー
 * 技名表示したりセリフを喋らせたり
 *
 *
 *
 * ◉ 特徴 ◉
 *
 * ■変幻自在なフキダシ
 * ◎フキダシの形や色などをビューごとに自由に変えられる
 * ◎文字の大きさや色も自在に変えられる
 *
 * ■技名表示
 * ◎キャラの近くに技名を表示できる
 * ◎同時に何個でも表示できる
 *
 * ■セリフ表示
 * ◎行動時、ダメージ時、勝利時など、色々な状況でのセリフを設定できる
 * ◎セリフを複数パターン設定したり、条件設定もでき
 * ◎セリフを各キャラ同時もしくは続けて発することができる
 * ◎効果音・ボイスを鳴らせる
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * ■スタイル
 * 大きさや色、形などのデザイン上の設定を『スタイル』と呼ぶ
 * スタイルには2種類ある
 * ◎テキストスタイル
 * テキストのデザイン設定
 * ◎ベーススタイル
 * テキスト背景(フキダシ)のデザイン設定
 *
 *
 * ■コモンスタイル
 * => プラグインパラメータ → ◉コモンスタイル
 * 共用スタイル。ここでスタイルを作り、各セリフに適用していく
 * ◎適用の仕方
 * コモンスタイルの名前をスタイル欄に書く
 *
 *
 * ■小窓スタイル
 * => プラグインパラメータ → ◉小窓スタイル
 * 小窓のスタイルを設定する
 * 小窓とはセリフの周りに小さく表示される部分のことで、
 * キャラ名や技名を表示できる
 * ◎小窓の表示内容はどこで設定するか
 * テキストスタイル → 小窓表示
 *
 *
 * ■基本スタイル
 * => プラグインパラメータ → ◉基本スタイル
 * セリフ種類毎に基本となるスタイルを設定する
 * 例: 戦闘開始セリフのテキストスタイルを『基本』にしたい場合
 * ◉開始セリフ → 開始テキストスタイル → 基本
 *
 *
 * ■スキル/アイテム個別にスタイルを設定
 * スキル/アイテムのメモ欄に
 * <ビュースタイル: テキストスタイル, ベーススタイル>
 * 例: 
 * <ビュースタイル: 大技, ギザギザ>
 * テキストスタイルが『大技』、ベーススタイルが『ギザギザ』になる
 *
 *
 * ■キャラのセリフを設定
 * => プラグインコマンド → セリフセット
 * ◎名前
 * 何でもよい
 * ◎タイプ
 * アクターか敵キャラか
 * ◎アクターID
 * セリフを適用するアクターのID
 * ◎敵キャラID
 * セリフを適用する敵キャラのID
 * ◎セリフ内容
 * 以下詳しく説明。必要なものだけ設定すればよい
 *
 * ★セリフ内容
 * ◎スキルID/アイテムID
 * スキルセリフ/アイテムセリフ時のみ。セリフを適用する行動のID
 * 空だとスキルなら全てのスキルに、アイテムなら全てのアイテムに適用する
 * まとめて指定もできる。詳しくは後述の『スキル/アイテムIDをまとめて指定』を参照
 * ◎テキスト
 * セリフのテキスト内容。独自の制御文字がある。詳しくは後述
 * ◎テキストスタイル、ベーススタイル
 * 適用したいコモンスタイルの名前を書く。書かなければ基本スタイルが適用される
 * ◎表示時間
 * セリフの表示時間。空欄なら基本の表示時間が適用される
 * ◎ウェイト
 * セリフを発する前のウェイト
 * ◎効果音
 * 鳴らす効果音とその設定。ボイスも鳴らせる
 * ◎連結セリフ
 * 連続して発生するセリフ
 * 他のキャラを同時に喋らせたり、続けて別のセリフを喋らせたりするのに使う
 * 空欄ダブルクリックで追加し、IDで対象を指定
 * あとは普通にセリフを入力する
 * ※連結セリフのウェイトは * を付けると変動ウェイトになる
 * 変動ウェイトとは、連結セリフの順番によって値が変わるウェイト
 * 変動ウェイトが *30 で 2番目 の連結セリフなら、30×2=60 のウェイトがかかる
 * ◎条件
 * セリフを言う条件。JS式で好きな条件を記述できる
 * 独自の条件式がある。詳しくは後述
 *
 *
 * ■スキル/アイテムIDをまとめて指定
 * 1, 2, 3
 * =>1, 2, 3 を指定
 * 1~3, 4, 5
 * =>1, 2, 3, 4, 5 を指定
 *
 *
 * ■セリフ制御文字
 * \fs[値]
 * フォントサイズ。\fs[24] ならフォントサイズ 24。
 * \fb[0/1]
 * フォントボールド。\fb[1] でボールド有効、\fs[0] で無効
 * \fi[0/1]
 * フォントイタリック。\fi[1] でイタリック有効、\fi[0] で無効
 * \fc[赤, 緑, 青, 濃度]
 * フォントカラー。fc[0, 0, 0, 1] なら 赤0、緑0、青0、濃度 1
 * 色は 0〜255、濃度は 0〜1
 * \oc[赤, 緑, 青, 濃度]
 * 縁取りカラー。fc[0, 0, 0, 1] なら 赤0、緑0、青0、濃度 1
 * 色は 0〜255、濃度は 0〜1。oc はアウトカラーの略
 * \ow[値]
 * 縁取り幅。\ow[5] なら縁取り幅 5。ow はアウトワイドの略
 * \act
 * スキル/アイテムの名前を取得する
 * \actを使う！ でポーションを使った場合「ポーションを使う！」
 * \self
 * セリフの喋り手の名前を取得する
 * この\self様が！ をプリシアが喋った場合「このプリシア様が！」
 * \n
 * 改行
 * 
 *
 * ■セリフ条件式 
 * \lv
 * キャラのレベル
 * \hp
 * キャラのHP百分率
 * \mp
 * キャラのMP百分率
 * \tp
 * キャラのTP百分率
 * \st[ID]
 * キャラがステートにかかってるか。\st[1] ならID1のステート
 * \sw[番号]
 * スイッチがオンか。\sw[1] なら 1番 のスイッチ
 * \vr[番号]
 * 変数の値。\sw[1] なら 1番 の変数
 * \rd[値]
 * セリフを言う確率。\rd[50] なら 50%。rd はランダムの略
 *
 *
 * ■複数パターンのセリフを設定
 * 条件式 \rd[値] を使う
 * 開始セリフを3パターン用意する場合
 * 「いくぞ！」　条件: \rd[33]
 * 「雑魚が！」　条件: \rd[33]
 * 「滅ぼす！」
 * 33%の確率 で「いくぞ！」になり、ならなかった場合、
 * 33%の確率で「雑魚が！」になり、ならなかった場合、
 * 「滅ぼす！」になる
 *
 *
 * ■行動セリフの一括設定
 * ◎ID0 だと全てのスキル/アイテムにセリフが適用される
 * ◎\act でスキル/アイテム名を取得できる
 * これらを利用し、たとえばアイテムセリフに
 * ID0　「\actを使うわ！」
 * と入力すると、ポーションを使えば
 * 「ポーションを使うわ！」
 * スライミュラントを使えば
 * 「スライミュラントを使うわ！」
 * となり、まとめてセリフを設定することができる
 *
 * 個別に設定したいセリフもある場合は、一括設定より上に入力する
 * ID15　「エリクサー使っちゃう！」
 * ID0　「\actを使うわ！」
 * ID15のアイテムの場合は上、それ以外は下となる
 * ※セリフは上から走査されるため、
 * 一番上に一括設定を置くと全てそれが採用されるので注意
 *
 *
 * ■即時セリフ
 * => プラグインコマンド → 即時セリフ
 * 次の行動時のセリフを指定できる。おもにイベント用
 * IDで対象を指定し、セリフを入力する
 * 
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、好きに使ってくれて大丈夫です
 *
 *
 *
 *
 *
 * @param ◉表示
 *
 * @param バトルビュー表示
 * @parent ◉表示
 * @desc バトルビューを表示するか。初期値 true
 * @type boolean
 * @default true
 *
 * @param ◉コモンスタイル
 *
 * @param コモンテキストスタイル
 * @parent ◉コモンスタイル
 * @desc 共用テキストスタイル。名前を入力することで呼び出せる
 * @type struct<textStyle>[]
 * @default ["{\"名\":\"基本\",\"可\":\"true\",\"フォントサイズ\":\"22\",\"フォントボールド\":\"false\",\"フォントイタリック\":\"false\",\"カラー\":\"255, 255, 255, 1\",\"縁取りカラー\":\"0, 0, 0, 1\",\"縁取り幅\":\"6\",\"揃え\":\"center\",\"小窓表示\":\"キャラ名\",\"アイコン表示\":\"true\",\"語頭\":\"\",\"語尾\":\"！\"}","{\"名\":\"叫び\",\"可\":\"true\",\"フォントサイズ\":\"24\",\"フォントボールド\":\"true\",\"フォントイタリック\":\"false\",\"カラー\":\"0, 0, 0, 1\",\"縁取りカラー\":\"255, 255, 96, 1\",\"縁取り幅\":\"6\",\"揃え\":\"center\",\"小窓表示\":\"キャラ名\",\"アイコン表示\":\"true\",\"語頭\":\"\",\"語尾\":\"！\"}","{\"名\":\"行動\",\"可\":\"true\",\"フォントサイズ\":\"22\",\"フォントボールド\":\"true\",\"フォントイタリック\":\"false\",\"カラー\":\"255, 255, 160, 1\",\"縁取りカラー\":\"48, 0, 0, 1\",\"縁取り幅\":\"6\",\"揃え\":\"center\",\"小窓表示\":\"キャラ名\",\"アイコン表示\":\"true\",\"語頭\":\"\",\"語尾\":\"！\"}","{\"名\":\"回復\",\"可\":\"true\",\"フォントサイズ\":\"22\",\"フォントボールド\":\"false\",\"フォントイタリック\":\"false\",\"カラー\":\"0, 255, 224, 1\",\"縁取りカラー\":\"0, 0, 0, 1\",\"縁取り幅\":\"6\",\"揃え\":\"center\",\"小窓表示\":\"キャラ名\",\"アイコン表示\":\"true\",\"語頭\":\"\",\"語尾\":\"！\"}","{\"名\":\"ダメージ\",\"可\":\"true\",\"フォントサイズ\":\"22\",\"フォントボールド\":\"false\",\"フォントイタリック\":\"false\",\"カラー\":\"192, 0, 0, 1\",\"縁取りカラー\":\"255, 255, 0, 1\",\"縁取り幅\":\"4\",\"揃え\":\"center\",\"小窓表示\":\"キャラ名\",\"アイコン表示\":\"true\",\"語頭\":\"\",\"語尾\":\"！\"}","{\"名\":\"戦闘不能\",\"可\":\"true\",\"フォントサイズ\":\"22\",\"フォントボールド\":\"true\",\"フォントイタリック\":\"false\",\"カラー\":\"192, 0, 0, 1\",\"縁取りカラー\":\"255, 255, 0, 1\",\"縁取り幅\":\"6\",\"揃え\":\"center\",\"小窓表示\":\"キャラ名\",\"アイコン表示\":\"true\",\"語頭\":\"\",\"語尾\":\"！\"}","{\"名\":\"大技\",\"可\":\"true\",\"フォントサイズ\":\"24\",\"フォントボールド\":\"true\",\"フォントイタリック\":\"false\",\"カラー\":\"255, 255, 64, 1\",\"縁取りカラー\":\"224, 0, 0, 1\",\"縁取り幅\":\"6\",\"揃え\":\"center\",\"小窓表示\":\"キャラ名\",\"アイコン表示\":\"true\",\"語頭\":\"\",\"語尾\":\"！\"}"]
 *
 * @param コモンベーススタイル
 * @parent ◉コモンスタイル
 * @desc 共用ベーススタイル。名前を入力することで呼び出せる
 * @type struct<baseStyle>[]
 * @default ["{\"名\":\"スクエア\",\"可\":\"true\",\"余白X\":\"8\",\"余白Y\":\"8\",\"不透明度\":\"255\",\"カラー\":\"128, 128, 128, 0.75\",\"縁取りカラー\":\"0, 0, 0, 1\",\"縁取り幅\":\"2\",\"フォーム\":\"スクエア\",\"変形\":\"24\",\"吹き出しツノ\":\"8\",\"位置X\":\"0\",\"位置Y\":\"-8\",\"スキン\":\"{}\"}","{\"名\":\"ギザギザ\",\"可\":\"true\",\"余白X\":\"8\",\"余白Y\":\"8\",\"不透明度\":\"255\",\"カラー\":\"128, 128, 128, 0.75\",\"縁取りカラー\":\"0, 0, 0, 1\",\"縁取り幅\":\"3\",\"フォーム\":\"ギザギザ\",\"変形\":\"1\",\"吹き出しツノ\":\"0\",\"位置X\":\"0\",\"位置Y\":\"-8\",\"スキン\":\"{}\"}","{\"名\":\"ダイヤ\",\"可\":\"true\",\"余白X\":\"32\",\"余白Y\":\"16\",\"不透明度\":\"255\",\"カラー\":\"128, 128, 128, 0.75\",\"縁取りカラー\":\"0, 0, 0, 1\",\"縁取り幅\":\"3\",\"フォーム\":\"ダイヤ\",\"変形\":\"0\",\"吹き出しツノ\":\"8\",\"位置X\":\"0\",\"位置Y\":\"-8\",\"スキン\":\"{}\"}"]
 *
 * @param ◉小窓スタイル
 *
 * @param 小窓テキストスタイル
 * @parent ◉小窓スタイル
 * @desc 小窓のテキストスタイル
 * @type struct<miniTextStyle>
 * @default {"可":"true","フォントサイズ":"16","フォントボールド":"","フォントイタリック":"","カラー":"96, 255, 255, 1","縁取りカラー":"0, 0, 0, 1","縁取り幅":"4","揃え":"center","語頭":"","語尾":""}
 *
 * @param 小窓ベーススタイル
 * @parent ◉小窓スタイル
 * @desc 小窓のベーススタイル
 * @type struct<miniBaseStyle>
 * @default {"可":"true","余白X":"0","余白Y":"0","不透明度":"255","カラー":"128, 128, 128, 0.75","縁取りカラー":"0, 0, 0, 1","縁取り幅":"2","フォーム":"横アーモンド","変形":"0","配置方向":"左上","位置X":"0","位置Y":"0","スキン":"{}"}
 *
 * @param ◉基本スタイル
 *
 * @param 基本スタイル設定
 * @parent ◉基本スタイル
 * @desc セリフ種目ごとの基本スタイル。個別にスタイルを指定しない場合これが適用される
 * @type struct<serifBasicCfg>
 * @default {"◉開始":"","開始テキストスタイル":"基本","開始ベーススタイル":"スクエア","◉入力":"","入力テキストスタイル":"基本","入力ベーススタイル":"スクエア","◉行動":"","行動テキストスタイル":"行動","行動ベーススタイル":"スクエア","◉ダメージ":"","ダメテキストスタイル":"ダメージ","ダメベーススタイル":"スクエア","◉回復":"","回復テキストスタイル":"回復","回復ベーススタイル":"スクエア","◉戦闘不能":"","倒れテキストスタイル":"戦闘不能","倒れベーススタイル":"スクエア","◉勝利":"","勝利テキストスタイル":"基本","勝利ベーススタイル":"スクエア","◉連結":"","連結テキストスタイル":"行動","連結ベーススタイル":"スクエア"}
 *
 * @param ◉表示時間
 *
 * @param 表示時間設定
 * @parent ◉表示時間
 * @desc セリフ種目ごとの表示時間。個別に時間を指定しなければこれが適用される
 * @type struct<showTimeCfg>
 * @default {"開始":"100","行動":"60","ダメージ":"40","回復":"40","戦闘不能":"80","連結":"60"}
 *
 * @param ◉表示方向
 *
 * @param 表示方向[味方]
 * @parent ◉表示方向
 * @desc 味方のビューの表示方向。上方向 か 下方向 か。初期値 上
 * @type select
 * @option 上
 * @option 下
 * @default 上
 *
 * @param 表示方向[敵]
 * @parent ◉表示方向
 * @desc 敵のビューの表示方向。上方向 か 下方向 か。初期値 上
 * @type select
 * @option 上
 * @option 下
 * @default 上
 *
 * @param 表示方向[勝利]
 * @parent ◉表示方向
 * @desc 勝利時のビューの表示方向。上方向 か 下方向 か。初期値 上
 * @type select
 * @option 上
 * @option 下
 * @default 上
 *
 * @param ◉ビュー設定
 *
 * @param ビュー移動
 * @parent ◉ビュー設定
 * @desc ビューのバトラーに合わせて移動させるか
 * @type boolean
 * @default true
 *
 * @param 表示アニメ
 * @parent ◉ビュー設定
 * @desc ビューの開閉アニメ
 * @type struct<showAnime>
 * @default {"時間":"5","方向":"横"}
 *
 * @param アイコン位置
 * @parent ◉ビュー設定
 * @desc  アイコンの位置
 * @type struct<pos>
 * @default {"X":"-4","Y":"0"}
 *
 * @param 非表示範囲
 * @parent ◉ビュー設定
 * @desc ビューを表示しない範囲。下50 なら、画面下 50ピクセル の範囲には表示しない
 * @type struct<noShowScope>
 * @default {"下":"0","左":"0","右":"0","上":"0"}
 *
 * @param ◉その他
 *
 * @param フロントビュー対応
 * @parent ◉その他
 * @desc 標準のフロントビューに対応し、味方側にもアニメーションやダメージポップを表示するようにする。初期値 true
 * @type boolean
 * @default true
 *
 * @param 音量一括
 * @parent ◉その他
 * @desc 効果音の音量を一括で調整する。50 なら全ての効果音の音量が +50 される。初期値 0
 * @default 0
 *
 * @param ピッチ一括
 * @parent ◉その他
 * @desc 効果音のピッチを一括で調整する。50 なら全ての効果音のピッチが +50 される。初期値 0
 * @default 0
 *
 * @param 位相一括
 * @parent ◉その他
 * @desc 効果音の位相を一括で調整する。50 なら全ての効果音の位相が +50 される。初期値 0
 * @default 0
 *
 *
 *
 *
 *
 * @command serifSet
 * @text セリフセット
 * @desc キャラのセリフセットを編集する
 *
 * @arg name
 * @text 名
 * @desc セリフセットの名前。何でもよい
 *
 * @arg actorId
 * @text アクターID
 * @desc セリフセットを適用するアクターのID
 * @type actor
 *
 * @arg enemyId
 * @text 敵キャラID
 * @desc セリフセットを適用する敵キャラのID
 * @type enemy
 *
 * @arg openSerifs
 * @text 開始セリフ
 * @desc 戦闘開始時のセリフ
 * @type struct<normalSerif>[]
 * @default []
 *
 * @arg inputSerifs
 * @text 入力セリフ
 * @desc コマンド入力時のセリフ
 * @type struct<normalSerif>[]
 * @default []
 *
 * @arg skillSerifs
 * @text スキルセリフ
 * @desc スキル使用時のセリフ
 * @type struct<skillSerif>[]
 * @default []
 *
 * @arg itemSerifs
 * @text アイテムセリフ
 * @desc アイテム使用時のセリフ
 * @type struct<itemSerif>[]
 * @default []
 *
 * @arg damageSerifs
 * @text ダメージセリフ
 * @desc ダメージ時のセリフ
 * @type struct<normalSerif>[]
 * @default []
 *
 * @arg healSerifs
 * @text 回復セリフ
 * @desc 回復時のセリフ
 * @type struct<normalSerif>[]
 * @default []
 *
 * @arg deadSerifs
 * @text 戦闘不能セリフ
 * @desc 戦闘不能時のセリフ
 * @type struct<normalSerif>[]
 * @default []
 *
 * @arg victorySerifs
 * @text 勝利セリフ
 * @desc 戦闘勝利時のセリフ
 * @type struct<normalSerif>[]
 * @default []
 *
 *
 *
 *
 *
 * @command instantSerif
 * @text 即時セリフ
 * @desc 次行動時の1回のみ発するセリフ
 *
 * @arg actorId
 * @text アクターID
 * @desc セリフセットを適用するアクターのID
 * @type actor
 *
 * @arg enemyId
 * @text 敵キャラID
 * @desc セリフセットを適用する敵キャラのID
 * @type enemy
 *
 * @arg serif
 * @text セリフ
 * @desc 発するセリフ
 * @type struct<normalSerif>
 */
 
 
 
 
 
/*~struct~textStyle:
 * @param  名
 * @desc スタイルの名前。この名前を書くことでを呼び出せる
 *
 * @param  可
 * @desc テキストを有効にするか。無効なら表示しない
 * @type boolean
 * @default true
 *
 * @param フォントサイズ
 * @desc テキストのフォントサイズ
 * @default 24
 *
 * @param フォントボールド
 * @desc テキストのフォントを太字にするか
 * @type boolean
 * @default false
 *
 * @param フォントイタリック
 * @desc テキストのフォントを斜め字にするか
 * @type boolean
 * @default false
 *
 * @param カラー
 * @desc テキストの色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1
 * @default 255, 255, 255, 1
 *
 * @param 縁取りカラー
 * @desc テキストの縁取り色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1 
 * @default 0, 0, 0, 1
 *
 * @param 縁取り幅
 * @desc テキストの縁取りの厚さ
 * @default 6
 *
 * @param 揃え
 * @desc テキストを中央揃えにするか、左揃えにするか、右揃えにするか
 * @type select
 * @option left
 * @option center
 * @option right
 * @default center
 *
 * @param 小窓表示
 * @desc 小窓に何を表示するか。何も表示しないか、キャラ名か、技名か。基準値 表示しない
 * @type select
 * @option 表示しない
 * @option キャラ名
 * @option 技名
 * @default 表示しない
 
 * @default true
 *
 * @param アイコン表示
 * @desc 技のアイコンを表示するか
 * @type boolean
 * @default true
 *
 * @param 語頭
 * @desc 語頭につけるテキスト
 * @default
 *
 * @param 語尾
 * @desc 語尾につけるテキスト
 * @default ！
 */
 
 
 
 
 
/*~struct~baseStyle:
 * @param  名
 * @desc スタイルの名前。この名前を書くことでを呼び出せる
 *
 * @param  可
 * @desc ベースを有効にするか。無効なら表示しない
 * @type boolean
 * @default true
 *
 * @param 余白X
 * @desc ベースの左右余白
 * @default 0
 *
 * @param 余白Y
 * @desc ベースの上下余白
 * @default 0
 *
 * @param 不透明度
 * @desc ベースの濃度。0〜255。数値を増やすほど濃くなる。0 だと透明。初期値 255
 * @default 255
 *
 * @param カラー
 * @desc ベースの色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1
 * @default 0, 0, 0, 0.5
 *
 * @param 縁取りカラー
 * @desc ベースの縁取り色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1 
 * @default 0, 0, 0, 1
 *
 * @param 縁取り幅
 * @desc ベースの縁取りの厚さ
 * @default 6
 *
 * @param フォーム
 * @desc ベースの形状。スクエア・ダイヤ・ギザギザは『変形』で形を調整できる
 * @type select
 * @option スクエア
 * @option 横アーモンド
 * @option 縦アーモンド
 * @option ダイヤ
 * @option ギザギザ
 * @default スクエア
 *
 * @param 変形
 * @desc フォームの変形量。ギザギザは0か1か。ダイヤはマイナスが有効
 * @default 0
 *
 * @param 吹き出しツノ
 * @desc 吹き出しのツノのサイズ(ピクセル)。0だと出ない。また、出るのはフォームがスクエアの時のみ
 * @default 24
 *
 * @param 位置X
 * @desc ボタンのX位置。5 なら右に 5ピクセル ずれる
 * @default 0
 *
 * @param 位置Y
 * @desc ボタンのY位置。5 なら下に 5ピクセル ずれる
 * @default 0
 *
 * @param スキン
 * @desc 使用するスキンとその設定
 * @type struct<skin>
 * @default {}
 */
 
 
 
 
 
 /*~struct~pos:
  * @param X
  * @desc X位置。5 なら右に 5ピクセル ずれる
  *
  * @param Y
  * @desc Y位置。5 なら下に 5ピクセル ずれる
  */
  
  
  
  
  
/*~struct~miniTextStyle:
 * @param  可
 * @desc テキストを有効にするか。無効だと表示しない
 * @type boolean
 *
 * @param フォントサイズ
 * @desc テキストのフォントサイズ
 *
 * @param フォントボールド
 * @desc テキストのフォントを太字にするか
 * @type boolean
 *
 * @param フォントイタリック
 * @desc テキストのフォントを斜め字にするか
 * @type boolean
 *
 * @param カラー
 * @desc テキストの色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1
 *
 * @param 縁取りカラー
 * @desc テキストの縁取り色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1
 * 
 * @param 縁取り幅
 * @desc テキストの縁取りの厚さ
 *
 * @param 揃え
 * @desc テキストを中央揃えにするか、左揃えにするか、右揃えにするか
 * @type select
 * @option left
 * @option center
 * @option right
 *
 * @param 語頭
 * @desc 語頭につけるテキスト
 *
 * @param 語尾
 * @desc 語尾につけるテキスト
 */
 
 
 
 
 
/*~struct~miniBaseStyle:
 * @param  可
 * @desc ベースを有効にするか。無効だと表示しない
 * @type boolean
 *
 * @param 余白X
 * @desc ベースの左右余白
 *
 * @param 余白Y
 * @desc ベースの上下余白
 *
 * @param 不透明度
 * @desc ベースの濃度。0〜255。数値を増やすほど濃くなる。0 だと透明。初期値 255
 * @default 255
 *
 * @param カラー
 * @desc ベースの色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1
 *
 * @param 縁取りカラー
 * @desc ベースの縁取り色。(赤、緑、青、不透明度)。色0〜255、不透明度0〜1 
 *
 * @param 縁取り幅
 * @desc ベースの縁取りの厚さ
 *
 * @param フォーム
 * @desc ベースの形状。スクエア・ギザギザ・ダイヤは『変形』で形を調整できる
 * @type select
 * @option スクエア
 * @option 横アーモンド
 * @option 縦アーモンド
 * @option ギザギザ
 * @option ダイヤ
 *
 * @param 変形
 * @desc フォームの変形量。ギザギザは0か1か。ダイヤはマイナスが有効
 *
 * @param 配置方向
 * @desc 名前の配置方向。左上、左下、右上、右下のどれか
 * @type select
 * @option 左上
 * @option 左下
 * @option 右上
 * @option 右下
 * @default 左上
 *
 * @param 位置X
 * @desc 名前のX軸の位置。5 なら右に 5ピクセル ずれる
 *
 * @param 位置Y
 * @desc 名前のY軸の位置。5 なら下に 5ピクセル ずれる
 *
 * @param スキン
 * @desc 使用するスキンとその設定
 * @type struct<skin>
 * @default {}
 */





/*~struct~noShowScope:
 * @param 下
 * @desc 下側の非表示範囲。50 なら 画面下端から 50ピクセル の範囲には表示しない
 *
 * @param 左
 * @desc 左側の非表示範囲。50 なら 画面左端から 50ピクセル の範囲には表示しない
 *
 * @param 右
 * @desc 右側の非表示範囲。50 なら 画面右端から 50ピクセル の範囲には表示しない
 *
 * @param 上
 * @desc 上側の非表示範囲。50 なら 画面上端から 50ピクセル の範囲には表示しない
 */
  
  
  
  
  
/*~struct~normalSerif:
 * @param 名
 * @desc セリフの名前。何でもよい
 *
 * @param テキスト
 * @desc セリフのテキスト内容
 * \self:喋り手名　\n:改行
 *
 * @param テキストスタイル
 * @desc セリフのテキストスタイル
 *
 * @param ベーススタイル
 * @desc セリフのベーススタイル
 *
 * @param 表示時間
 * @desc セリフの表示時間。50 なら 50フレーム間 表示
 *
 * @param ウェイト
 * @desc セリフを発する前のウェイト。5 なら 5フレーム 待つ
 *
 * @param 効果音
 * @desc セリフと共に鳴らす効果音とその設定。空欄ダブルクリックで追加。ボイスも鳴らせる
 * @type struct<se>[]
 * @default []
 *
 * @param フラッシュ
 * @desc 画面をフラッシュさせる
 * @type struct<flash>
 * @default {}
 *
 * @param 連結セリフ
 * @desc 連続して発生するセリフ。空欄ダブルクリックで追加、IDで対象指定してセリフを入力する
 * @type struct<chainSerif>[]
 * @default []
 *
 * @param 条件
 * @desc セリフが適用される条件。JavaScript式で記述する
 * \rd[値]:確率　\hp:HP率　\sw[値]:スイッチ　\vr[値]:変数
 */
  
  
  
  
  
/*~struct~skillSerif:
 * @param 名
 * @desc セリフの名前。何でもよい
 *
 * @param スキルID
 * @desc セリフを適用するスキルのID。1,2 と複数指定したり、1~3 とまとめて指定することも可能
 * @type skill
 *
 * @param テキスト
 * @desc セリフのテキスト内容
 * \act:スキル名　\self:喋り手名　\n:改行
 *
 * @param テキストスタイル
 * @desc セリフのテキストスタイル
 *
 * @param ベーススタイル
 * @desc セリフのベーススタイル
 *
 * @param 表示時間
 * @desc セリフの表示時間。50 なら 50フレーム間 表示
 *
 * @param ウェイト
 * @desc セリフを発する前のウェイト。5 なら 5フレーム 待つ
 *
 * @param 効果音
 * @desc セリフと共に鳴らす効果音とその設定。空欄ダブルクリックで追加。ボイスも鳴らせる
 * @type struct<se>[]
 * @default []
 *
 * @param フラッシュ
 * @desc 画面をフラッシュさせる
 * @type struct<flash>
 * @default {}
 *
 * @param 連結セリフ
 * @desc 連続して発生するセリフ。空欄ダブルクリックで追加、IDで対象指定してセリフを入力する
 * @type struct<chainSerif>[]
 * @default []
 *
 * @param 条件
 * @desc セリフが適用される条件。JavaScript式で記述する
 * \rd[値]:確率　\hp:HP率　\sw[値]:スイッチ　\vr[値]:変数
 */
  
  
  
  
  
/*~struct~itemSerif:
 * @param 名
 * @desc セリフの名前。何でもよい
 *
 * @param アイテムID
 * @desc セリフを適用するアイテムのID。1,2 と複数指定したり、1~3 とまとめて指定することも可能
 * @type item
 *
 * @param テキスト
 * @desc セリフのテキスト内容
 * \act:アイテム名　\self:喋り手名　\n:改行
 *
 * @param テキストスタイル
 * @desc セリフのテキストスタイル
 *
 * @param ベーススタイル
 * @desc セリフのベーススタイル
 *
 * @param 表示時間
 * @desc セリフの表示時間。50 なら 50フレーム間 表示
 *
 * @param ウェイト
 * @desc セリフを発する前のウェイト。5 なら 5フレーム 待つ
 *
 * @param 効果音
 * @desc セリフと共に鳴らす効果音とその設定。空欄ダブルクリックで追加。ボイスも鳴らせる
 * @type struct<se>[]
 * @default []
 *
 * @param フラッシュ
 * @desc 画面をフラッシュさせる
 * @type struct<flash>
 * @default {}
 *
 * @param 連結セリフ
 * @desc 連続して発生するセリフ。空欄ダブルクリックで追加、IDで対象指定してセリフを入力する
 * @type struct<chainSerif>[]
 * @default []
 *
 * @param 条件
 * @desc セリフが適用される条件。JavaScript式で記述する
 * \rd[値]:確率　\hp:HP率　\sw[値]:スイッチ　\vr[値]:変数
 */
 
 
 
 
 
/*~struct~chainSerif:
 * @param 名
 * @desc セリフの名前。何でもよい
 *
 * @param アクターID
 * @desc セリフを発するアクターのID。1,2 と複数指定したり、1~3 とまとめて指定することも可能
 * @type actor
 *
 * @param 敵キャラID
 * @desc セリフを発する敵キャラのID。1,2 と複数指定したり、1~3 とまとめて指定することも可能
 * @type enemy
 *
 * @param テキスト
 * @desc セリフのテキスト内容
 * \act:アイテム名　\self:喋り手名　\n:改行
 *
 * @param テキストスタイル
 * @desc セリフのテキストスタイル
 *
 * @param ベーススタイル
 * @desc セリフのベーススタイル
 *
 * @param 表示時間
 * @desc セリフの表示時間。50 なら 50フレーム間 表示
 *
 * @param ウェイト
 * @desc セリフを発する前のウェイト。5 なら 5フレーム 待つ。*を付けると変動ウェイト。*30 で二人目なら 30×2=60 になる
 *
 * @param 効果音
 * @desc セリフと共に鳴らす効果音とその設定。空欄ダブルクリックで追加。ボイスも鳴らせる
 * @type struct<se>[]
 * @default []
 *
 * @param フラッシュ
 * @desc 画面をフラッシュさせる
 * @type struct<flash>
 * @default {}
 *
 * @param 条件
 * @desc セリフが適用される条件。JavaScript式で記述する
 * \rd[値]:確率　\hp:HP率　\sw[値]:スイッチ　\vr[値]:変数
 */
  
  
  
  
  
/*~struct~se:
 * @param 名
 * @desc 効果音の名前。公式プラグイン『MaterialBase』で登録した識別子を書く
 *
 * @param 音量
 * @desc 効果音の音量。初期値 100
 * @default 100
 *
 * @param ピッチ
 * @desc 効果音のピッチ。初期値 100
 * @default 100
 *
 * @param 位相
 * @desc 効果音の位相。初期値 0
 * @default 0
 */
 
 
 
 
 
 /*~struct~flash:
 * @param 時間
 * @desc フラッシュ時間。5 なら 5フレーム かけてフラッシュ
 * @default 0
 *
 * @param 赤
 * @desc フラッシュの赤み。0〜255
 * @default 255
 *
 * @param 緑
 * @desc フラッシュの緑み。0〜255
 * @default 255
 *
 * @param 青
 * @desc フラッシュの青み。0〜255
 * @default 255
 *
 * @param 濃度
 * @desc フラッシュの濃度。0〜255
 * @default 255
 */
 
 
 
 
 
/*~struct~showAnime:
 * @param 時間
 * @desc アニメの動作時間。5 なら 5フレーム かけてアニメする。
 * @default 5
 *
 * @param 方向
 * @desc アニメの動く方向。横方向か、縦方向か、縦横両方か
 * @type select
 * @option 横
 * @option 縦
 * @option 縦横
 * @default 横
 */
 
 
 
 
 
/*~struct~skin:
 * @param 画像
 * @desc スキンとして使う画像。picturesフォルダに入れる
 * @type file
 * @dir img/pictures
 *
 * @param 位置X
 * @desc スキンのX位置。5 なら右に 5ピクセル ずれる。基準値 0
 * @default 0
 *
 * @param 位置Y
 * @desc スキンのY位置。5 なら下に 5ピクセル ずれる。基準値 0
 * @default 0
 *
 * @param 拡大X
 * @desc スキンのX軸の拡大率。1.5 なら 1.5倍 に拡大する。基準値 1
 * @default 1
 *
 * @param 拡大Y
 * @desc スキンのY軸の拡大率。1.5 なら 1.5倍 に拡大する。基準値 1
 * @default 1
 *
 * @param テキスト比率X
 * @desc 横幅をテキストサイズに合わせる。テキストサイズの何倍にするか。0 なら合わせない。基準値 1
 * @default 1
 *
 * @param テキスト比率Y
 * @desc 縦幅をテキストサイズに合わせる。テキストサイズの何倍にするか。0 なら合わせない。基準値 1
 * @default 1
 *
 * @param 不透明度
 * @desc スキンの不透明度。0〜255。値を増やすほど濃くなる。基準値 255
 * @default 255
 *
 * @param カラートーン
 * @desc スキンのカラートーン。赤(-255〜255), 緑(-255〜255), 青(-255〜255), グレー(0〜255)。基準値 0, 0, 0, 0
 * @default 0, 0, 0, 0
 *
 * @param レイヤー
 * @desc スキンを配置するレイヤー。ベースより上か下か。基準値 ベースより下
 * @type select
 * @option ベースより下
 * @option ベースより上
 * @default ベースより下
 */
 
 
 
 
 
/*~struct~serifBasicCfg:
 * @param ◉開始
 *
 * @param 開始テキストスタイル
 * @parent ◉開始
 * @desc 開始セリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 基本
 *
 * @param 開始ベーススタイル
 * @parent ◉開始
 * @desc 開始セリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 *
 * @param ◉入力
 *
 * @param 入力テキストスタイル
 * @parent ◉入力
 * @desc 入力セリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 基本
 *
 * @param 入力ベーススタイル
 * @parent ◉入力
 * @desc 入力セリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 *
 * @param ◉行動
 *
 * @param 行動テキストスタイル
 * @parent ◉行動
 * @desc 行動セリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 基本
 *
 * @param 行動ベーススタイル
 * @parent ◉行動
 * @desc 行動セリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 *
 * @param ◉ダメージ
 *
 * @param ダメテキストスタイル
 * @parent ◉ダメージ
 * @desc ダメージセリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 基本
 *
 * @param ダメベーススタイル
 * @parent ◉ダメージ
 * @desc ダメージセリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 *
 * @param ◉回復
 *
 * @param 回復テキストスタイル
 * @parent ◉回復
 * @desc 回復セリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 基本
 *
 * @param 回復ベーススタイル
 * @parent ◉回復
 * @desc 回復セリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 *
 * @param ◉戦闘不能
 *
 * @param 倒れテキストスタイル
 * @parent ◉戦闘不能
 * @desc 戦闘不能セリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 基本
 *
 * @param 倒れベーススタイル
 * @parent ◉戦闘不能
 * @desc 戦闘不能セリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 *
 * @param ◉勝利
 *
 * @param 勝利テキストスタイル
 * @parent ◉勝利
 * @desc 勝利セリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 基本
 *
 * @param 勝利ベーススタイル
 * @parent ◉勝利
 * @desc 勝利セリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 *
 * @param ◉連結
 *
 * @param 連結テキストスタイル
 * @parent ◉連結
 * @desc 連結セリフの基本テキストスタイル。個別にスタイルを指定しない場合これが適用される
 * @default 行動
 *
 * @param 連結ベーススタイル
 * @parent ◉連結
 * @desc 連結セリフの基本ベーススタイル。個別にスタイルを指定しない場合これが適用される
 * @default スクエア
 */
 
 
 
 
 
/*~struct~showTimeCfg:
 * @param 開始
 * @desc 開始セリフの表示時間。50 なら 50フレーム間 表示 初期値 100
 * @default 100
 *
 * @param 行動
 * @desc 行動セリフ/ビューの表示時間。50 なら 50フレーム間 表示 初期値 50
 * @default 50
 *
 * @param ダメージ
 * @desc ダメージセリフの表示時間。50 なら 50フレーム間 表示 初期値 40
 * @default 40
 *
 * @param 回復
 * @desc 回復セリフの表示時間。50 なら 50フレーム間 表示 初期値 40
 * @default 40
 *
 * @param 戦闘不能
 * @desc 戦闘不能セリフの表示時間。50 なら 50フレーム間 表示 初期値 60
 * @default 60
 *
 * @param 連結
 * @desc 連結セリフの表示時間。50 なら 50フレーム間 表示 初期値 50
 * @default 50
 */
  
  
  
  
  
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    
    
    //--  スプライト追加 /ベーシック  --//
    
    
    //- 破棄付きスプライト
    function SpriteKeMglv() {
        this.initialize(...arguments);
    }

    SpriteKeMglv.prototype = Object.create(Sprite.prototype);
    SpriteKeMglv.prototype.constructor = SpriteKeMglv;

    SpriteKeMglv.prototype.destroy = function() {
        if (this.bitmap && !this.bitmap._url) { this.bitmap.destroy(); }
        Sprite.prototype.destroy.call(this);
    };
    
    
    
    
    
    //--  文字列オート変換 /ベーシック  --//
    
    
    //- 文字列のハッシュ化
    function strToHash(str) {
        if (!str || !str.length) { return {}; }
        let hash = {};
        const strs = JSON.parse(str);
        let val = null;
        let val2 = null;
        for (let key in strs) {
            val = strs[key];
            if (!key || !val) { continue; }
            val2 = strToAuto(val, key);
            hash[key] = val2;
        }
        return hash;
    };
    
    
    //- 文字列のリスト化
    function strToList(str) {
        if (!str || !str.length) { return []; }
        let array = JSON.parse(str);
        return array.map((val, i) => {
            return strToAuto(val);
        }, this);
    };
    
    
    //- 文字列の自動処理
    function strToAuto(val, key = "") {
        let val2 = null;
        let match = null;
        let end = false;
        if (!end) {
            if (val[0] == "{") {
                val2 = strToHash(val);
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "[") {
                val2 = strToList(val);
                end = true;
            }
        }
        if (!end) { val = val + ","; }
        if (!end) {
            match = val.match(/^\s*(-?\d+,\s*-?\d+,\s*-?\d+,?\s*-?\d*\.?\d*)\s*,$/);
            if (match && !val.match(/[a-z]/)) {
                if (key.match(/(カラー|色)/) && !key.includes("トーン") && !key.includes("ブレンド") && !key.includes("配色") && !key.includes("着色") &&  !key.includes("フラッシュ") && !key.includes("チェンジ") &&  !key.includes("選択")) {
                    val2 =  "rgba(" +  match[1] + ")";
                } else {
                    val2 =  eval("[" +  match[1] + "]");
                }
                end = true;
            }
        }
        if (!end) {
            match = val.match(/(-?\d+\.?\d*),\s*/g);
            if (match && match.length >= 2 && !val.match(/[a-z]/) && !val.match(/~/)) {
                val2 =  eval("[" + match.reduce((r, s) => r + s) + "]");
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(true|false)\s*,/);
            if (match) {
                val2 =  match[1] == "true" ? true : false;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(-?\d+\.?\d*)\s*,/);
            if (match && !val.match(/[a-z]/)) {
                val2 = Number(match[1]); end = true;
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "\"") { val = val.slice(1); }
            val2 = val.slice(0, -1);
        }
        return val2;
    };
    
    
    
    
    
    //--  パラメータ受け取り  --//
    
    
    var parameters = PluginManager.parameters(pluginName);
    
    //- 表示
    const keke_showBattleView = eval(parameters["バトルビュー表示"]);
    
    //- コモンスタイル
    const keke_commonTextStyle = strToList(parameters["コモンテキストスタイル"]);
    const keke_commonBaseStyle = strToList(parameters["コモンベーススタイル"]);
    
    //- 小窓スタイル
    const keke_miniTextStyle = strToHash(parameters["小窓テキストスタイル"]);
    const keke_miniBaseStyle = strToHash(parameters["小窓ベーススタイル"]);
    
    //- 基本スタイル
    const keke_styleBasic = strToHash(parameters["基本スタイル設定"]);
    
    //- 表示時間
    const keke_showTimeCfg = strToHash(parameters["表示時間設定"]);
    const keke_showTimeLong = Number(parameters["表示時間(長)"]);
    const keke_showTimeShort = Number(parameters["表示時間(短)"]);
    const keke_extraTime = Number(parameters["延長時間"]);
    
    //- 表示方向
    const keke_showDireActor = parameters["表示方向[味方]"];
    const keke_showDireEnemy = parameters["表示方向[敵]"];
    const keke_showDireVictory = parameters["表示方向[勝利]"];
    
    //- ビュー設定
    const keke_viewMove = eval(parameters["ビュー移動"]);
    const keke_showAnime = strToHash(parameters["表示アニメ"]);
    const keke_iconPos = strToHash(parameters["アイコン位置"]);
    const keke_hedgeScope = strToHash(parameters["非表示範囲"]);
    
    //- その他
    const keke_adaptFrontView = eval(parameters["フロントビュー対応"]);
    const keke_volumeLump = Number(parameters["音量一括"]);
    const keke_pitchLump = Number(parameters["ピッチ一括"]);
    const keke_panLump = Number(parameters["位相一括"]);
    
    
    
    
    
    //--  プラグインコマンド  --//
    
    
    //- セリフセット
    PluginManager.registerCommand(pluginName, "serifSet", args => {
        // パラム取得
        const set_ = {};
        const actorId = args.actorId;
        const enemyId = args.enemyId;
        if (!actorId && !enemyId) { return; }
        set_.type = actorId ? "actor" : "enemy";
        set_.id = Number(actorId || enemyId);
        // タイプリスト
        const typeList = ["open", "input", "skill", "item", "damage", "heal", "dead", "victory"];
        // タイプごとにセリフセットのセット
        for (const type of typeList) {
            set_[type+"Serifs"] = strToList(args[type+"Serifs"]);
            set_[type+"Serifs"].forEach(serif => {
                if (serif["スキルID"]) { serif["ID"] = serif["スキルID"]; }
                if (serif["アイテムID"]) { serif["ID"] = serif["アイテムID"]; }
            }, this);
            setEachSerif(set_, type);
        }
    });
    
    
    //- 即時セリフ
    PluginManager.registerCommand(pluginName, "instantSerif", args => {
        // パラム取得
        const set_ = {};
        const actorId = args.actorId;
        const enemyId = args.enemyId;
        if (!actorId && !enemyId) { return; }
        set_.type = actorId ? "actor" : "enemy";
        set_.id = Number(actorId || enemyId);
        set_.serif = strToHash(args.serif);
        // セット
        const key = set_.type + set_.id;
        if (!$gameSystem._instantSerifsKe) { $gameSystem._instantSerifsKe = {}; }
        $gameSystem._instantSerifsKe[key] = set_.serif;
    });
    
    
    //- セリフセットのセット
    function setEachSerif(set_, type) {
        const gs = $gameSystem;
        if (!set_[type+"Serifs"].length) { return; }
        if (!gs[type+"SerifsKe"]) { gs[type+"SerifsKe"] = {}; }
        const key = set_.type + set_.id;
        gs[type+"SerifsKe"][key] = set_[type+"Serifs"];
    };
    
    
    //- セリフセットの取得
    function getEachSerif(battler, type, id = null) {
        const gs = $gameSystem;
        if (!gs[type+"SerifsKe"]) { return; }
        // サブジェクトキー取得
        const subject = battler._actorId ? "actor" : "enemy";
        const subjeId = battler._actorId ? battler._actorId : battler._enemyId;
        const key = subject + subjeId;
        // セリフリスト取得
        let datas = gs[type+"SerifsKe"][key] || [];
        let serif = null;
        // セリフ取得
        for (const data of datas) {
            const ids = data["ID"];
            if (ids == null || strToNumList(ids.toString()).includes(id)) {
                if (battlerJudgeCondition(battler, data["条件"])) {
                    serif = data;
                    break;
                }
            }
        }
        if (serif && !Object.keys(serif).length) { serif = null; }
        return serif;
    };
    
    
    //- 即時セリフの取得
    function getInstantSerif(battler) {
        const gs = $gameSystem;
        if (!gs._instantSerifsKe) { return []; }
        // サブジェクトキー取得
        const subject = battler._actorId ? "actor" : "enemy";
        const subjeId = battler._actorId ? battler._actorId : battler._enemyId;
        const key = subject + subjeId;
        // セリフ取得
        let serif = gs._instantSerifsKe[key];
        if (serif && !Object.keys(serif).length) { serif = null; }
        return { serif:serif, key:key };
    };
    
    
    
    
     
    //--  共通開始  --//
    
    
    //- ゲームバトラー
    const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function() {
        _Game_Battler_initMembers.call(this);
        // マンガビューの初期化
        initMangaView(this);
    };
    
    
    //- スプライトバトラー
    const _Sprite_Battler_initialize = Sprite_Battler.prototype.initialize;
    Sprite_Battler.prototype.initialize = function(battler) {
        _Sprite_Battler_initialize.call(this, battler);
        // 変数イニット
        this._mangaViewSpritesKe = [];
        this._mangaViewAnimeKe = { on:false }
    };
    
    
    //- マンガビューの初期化
    function initMangaView(battler) {
        this._mangaViewPacksKe = [];
        this._mangaViewTypeKe = "";
        this._mangaViewCountKe = null;
    };
    
    
    
    
    
    //--  共通更新  --//
    
    
    //- スプライトバトラー
    const _Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function() {
        _Sprite_Battler_update.call(this);
        if (this._battler) {
            // マンガビューの形成
            createMangaView(this);
            // マンガビューの形成3
            createMangaView3(this);
            // マンガビューの移動
            moveMangaView(this);
            // マンガビューのスケール
            scaleMangaView(this);
            // マンガビューのツノ更新
            updateMangaViewTsuno(this);
            // マンガビューの消去
            delMangaView(this);
        }
    };
    
    
    
    
    
    //--  共通終了  --//
    
    
    //- スプライトセット・バトル
    const _Spriteset_Battle_destroy = Spriteset_Battle.prototype.destroy
    Spriteset_Battle.prototype.destroy = function(options) {
        // スプライトの全破棄
        destroySpriteAll(this);
        _Spriteset_Battle_destroy.call(this, options);
    };
    
    
    //- スプライトの全破棄
    function destroySpriteAll(spriteset) {
        const battlerSprites = spriteset.battlerSprites();
        battlerSprites.forEach(charaSprite => {
            if (!charaSprite._mangaViewSpritesKe) { return; }
            charaSprite._mangaViewSpritesKe.forEach(sprite => {
                destroySprite(sprite);
            });
            charaSprite._mangaViewSpritesKe = null;
        });
    };
    
    
    //- スプライトの破棄
    function destroySprite(sprite) {
        if (!sprite) { return; }
        sprite.children.forEach(s => destroySprite(s));
        if (sprite.bitmap && !sprite.bitmap._url) { sprite.bitmap.destroy(); }
        if (sprite._texture) { sprite.destroy(); }
    };
    
    
    
    
    
    //--  共通処理  --//
    
    
    //- レイヤー作成
    const _Scene_Battle_createStatusWindow  = Scene_Battle.prototype.createStatusWindow ;
    Scene_Battle.prototype.createStatusWindow  = function() {
        _Scene_Battle_createStatusWindow.call(this);
        // マンガライクレイヤーを作成
        const sprite = new Sprite;
        this.addChild(sprite);
        this._mangaLikeLayerKe = sprite;
    };
    
    
    //- フルアニメステータスASIの取得
    function getFullAnimeStatusAsi(battler, type) {
        if ($gameSystem.isSideView()) { return null; }
        if (!$gameTemp._fullAnimeStatusKe) { return null; }
        return $gameTemp.getFullAnimeStatusAsiKe(battler);
    };
    
    
    
    
    
    //--   ビュー呼び出し --//
    
    
    //- 開始ビュー呼び出しの呼び出し
    const _BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function() {
        _BattleManager_startBattle.call(this);
        // 開始ビューの呼び出し
        setTimeout(callOpenMangaView, 100);  
    };
    
    
    //- 開始ビューの呼び出し
    function callOpenMangaView() {
        // マンガビューの初期化
        $gameParty.allMembers().forEach(actor => initMangaView(actor));
        // 味方主体を取得
        const party = $gameParty.aliveMembers().filter(actor => getEachSerif(actor, "open"));
        const actor = party.length ? party[Math.randomInt(party.length)] : null;
        // 味方マンガビューの表示(開始)
        if (actor) {
            showMangaView(actor, "open", { wait:0 });
        }
        // 敵主体を取得
        const troop = $gameTroop.aliveMembers().filter(enemy => getEachSerif(enemy, "open"));
        const enemy = troop.length ? troop[Math.randomInt(troop.length)] : null;
        // 敵マンガビューの表示(開始)
        if (enemy) {
            showMangaView(enemy, "open", { wait:0 });
        }
    };
    
    
    //- 入力ビューの呼び出し
    const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
    Scene_Battle.prototype.startActorCommandSelection = function() {
        _Scene_Battle_startActorCommandSelection.call(this);
        const actor = BattleManager.actor();
        if (!actor) { return; }
        // マンガビューの表示(インプット)
        setTimeout(showMangaView, 50, actor, "input", {});
    };
    
    
    //- 入力ビューの終了
    const _BattleManager_finishActorInput = BattleManager.finishActorInput;
    BattleManager.finishActorInput = function() {
        _BattleManager_finishActorInput.call(this);
        if (!this._currentActor) { return; }
         this._currentActor._mangaViewCountKe = 0;
    };
    
    const _BattleManager_cancelActorInput = BattleManager.cancelActorInput;
    BattleManager.cancelActorInput = function() {
        _BattleManager_cancelActorInput.call(this);
        if (!this._currentActor) { return; }
        this._currentActor._mangaViewCountKe = 0;
    };
    
    
    //- 行動ビューの呼び出し
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        _BattleManager_startAction.call(this);
        // マンガビューの表示(アクト)
        setTimeout(showMangaView, 10, this._subject, "act", { action:this._action });
        // ファイナルアクターを保存
        if (this._subject._actorId) { this._finalActorKeMglv = this._subject; }
        // ファイナルエネミーを保存
        if (this._subject._enemyId) { this._finalEnemyKeMglv = this._subject; }
    };
    
    
    //- 行動ビューの終了
    const _BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function() {
        // スピードスターバトルがあるときのみ、行動表示時間のセット
        if (PluginManager._scripts.some(n => n == "Keke_SpeedStarBattle")) {
            setTimeout(setActViewTime, 20, this._subject);
        // それ以外は消す
        } else {
            this._subject._mangaViewCountKe = 0;
        }
        _BattleManager_endAction.call(this);
    };
    
    
    //- セリフ延長時間のセット
    function setActViewTime(battler) {
        battler._mangaViewCountKe = battler._mangaSerifActTimeKe != null ?  battler._mangaSerifActTimeKe : keke_showTimeCfg["行動"];
        const pack = battler._mangaViewPacksKe;
        if (pack && (pack.type == "skill" || pack.type == "item")) {
            packs.forEach(pack => pack.count = battler._mangaViewCountKe);
        }
        battler._mangaSerifActTimeKe = null;
    };
    
    
    //- ダメージ / 回復ビューの呼び出し
    const _BattleManager_invokeAction = BattleManager.invokeAction;
    BattleManager.invokeAction = function(subject, target) {
        const preHp = target._hp;
        _BattleManager_invokeAction.call(this, subject, target);
        if (isSameBattlerKe(subject, target)) { return; }
        if (target.isDead()) { return; }
        let view = null;
        // HPが変動したら
        if (target._hp < preHp) { view = "damage"; }
        if (target._hp > preHp) { view = "heal"; }
        if (view) {
            // マンガビューの表示(ダメージ・回復)
            showMangaView(target, view, { wait:1 });
        }
    };
    
    
    //- 戦闘不能ビューの呼び出し
    const _Game_Battler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        const dead = this.isDead();
        _Game_Battler_addState.call(this, stateId);
        if (!dead && stateId == this.deathStateId()) {
            // マンガビューの表示(戦闘不能)
            showMangaView(this, "dead", { wait:0 });
        }
    };
    
    
    //- 勝利ビューの呼び出し
    const _BattleManager_processVictory = BattleManager.processVictory;
    BattleManager.processVictory = function() {
        _BattleManager_processVictory.call(this);
        // 主体を取得
        let subje = this._finalActorKeMglv;
        if (!subje || !getEachSerif(subje, "victory")) {
            const party = $gameParty.aliveMembers().filter(actor => getEachSerif(actor, "victory"));
            subje = party.length ? party[Math.randomInt(party.length)] : null;
        }
        // マンガビューの表示(勝利)
        if (subje) {
             // マンガビューの表示(勝利)
             setTimeout(showMangaView, 10, subje, "victory", { wait:0 });
        }
    };
    
    
    //- 勝利ビューの呼び出し(敵)
    const _BattleManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function() {
        _BattleManager_processDefeat.call(this);
        // 主体を取得
        let subje = this._finalEnemyKeMglv;
        if (!subje || !getEachSerif(subje, "victory")) {
            const troop = $gameTroop.aliveMembers().filter(enemy => getEachSerif(enemy, "victory"));
            subje = troop.length ? troop[Math.randomInt(troop.length)] : null;
        }
        // マンガビューの表示(勝利)
        if (subje) {
             // マンガビューの表示(勝利)
              setTimeout(showMangaView, 50, subje, "victory", { wait:0 });
        }
    }
    
    
    
    
    
    //--  マンガビューの表示  --//
    
    
    //- マンガビューの表示
    function showMangaView(battler, type, cmd = { action:null, wait:0 }) {
        if (!keke_showBattleView) { return }
        // イニット
        const nowCount = battler._mangaViewCountKe;
        const preType = battler._mangaViewTypeKe;
        const nowOpen = nowCount && preType == "open";
        const times = keke_showTimeCfg;
        if (!battler._mangaViewPacksKe) { battler._mangaViewPacksKe = []; }
        // パック作成
        const pack = {};
        pack.wait = cmd.wait || 0;
        // フルアニメステータスからのデータ
        const asi = getFullAnimeStatusAsi(battler, type);
        if (asi && asi.faceBaseSprite) {
            if (asi.serifWait) {
                pack.wait += asi.serifWait;
                asi.serifWait = 0;
            }
            if (asi.serifUdReverse) {
                pack.serifUdReverse = asi.serifUdReverse;
                asi.serifUdReverse = false;
            }
        }
        // タイプに応じて処理
        switch (type) {
            // 開始
            case "open":
                pack.type = type;
                pack.count = times["開始"];
                break;
            // 入力
            case "input":
                // 出さない条件
                if (nowOpen) { return; }
                pack.type = type;
                pack.count = -1000;
                break;
            // 行動
            case "act":
                // 出さない条件
                if (nowOpen) { return; }
                const action = cmd.action || BattleManager._action;
                const item = action ? action.item() : null;
                if (item) {
                    type = action.isSkill() ? "skill" : "item";
                    pack.type = type;
                    pack.id = item.id;
                    pack.action = action;
                    pack.item = item;
                    if (item.id == battler.guardSkillId()) { pack.type = null; }
                    pack.count = -1000;
                }
                break;
            // ダメージ
            case "damage":
                // 出さない条件
                if (nowCount && preType != "heal") { return; }
                pack.type = type;
                pack.count = times["ダメージ"];
                break;
            // 回復
            case "heal":
                // 出さない条件
                if (nowCount && preType != "dead" && preType != "damage") { return; }
                pack.type = type;
                pack.count = times["回復"];
                break;
            // 戦闘不能
            case "dead":
                pack.type = type;
                pack.count = times["戦闘不能"];
                break;
            // 勝利
            case "victory":
                pack.type = type;
                pack.count = null;
                break;
        }
        // セリフセットを取得
        let serifSet = getEachSerif(battler, type, pack.id);
        // 行動時のみ即時セリフを取得
        if (type == "skill" || type == "item") {
            const instant = getInstantSerif(battler);
            if (instant.serif) {
                serifSet = instant.serif;
                $gameSystem._instantSerifsKe[instant.key] = null;
            }
        }
        pack.serifSet = serifSet;
        // セリフセットがあるとき
        if (serifSet) {
            // ウェイトを設定
            if (serifSet["ウェイト"]) { pack.wait += serifSet["ウェイト"]; }
            // 連結セリフのセット
            if (!nowOpen) { setChainSerif(serifSet, pack); }
        }
        // ビューをセット
        if (pack.type) {
            battler._mangaViewPacksKe.push(pack);
        }
    };
    
    
    //- 連結セリフのセット
    function setChainSerif(serifSet, oriPack) {
        if (!serifSet) { return; }
        // イニット
        const chainSerifs = serifSet["連結セリフ"];
        if (!chainSerifs) { return; }
        if (!chainSerifs.length) { return; }
        const type = "chain";
        // ひとつずつ処理
        let n = 1;
        chainSerifs.forEach((serif, i) => {
            // ターゲットを取得
            let targets = [];
            let ids = serif["アクターID"] || 0;
            const actorIds = strToNumList(ids.toString());
            ids = serif["敵キャラID"] || 0;
            const enemyIds = strToNumList(ids.toString());
            let actors = [];
            actorIds.forEach(id => $gameParty.members().forEach(b => b._actorId == id && b.isAppeared() && b.isAlive() ? actors.push(b) : 0));
            let enemies = [];
            enemyIds.forEach(id => $gameTroop.members().forEach(b => b._enemyd == id && b.isAppeared() && b.isAlive() ? enemies.push(b) : 0));
            targets = [...targets, ...actors, ...enemies];
            // パック作成
            const pack = {};
            pack.count = serif["表示時間"] || keke_showTimeCfg["連結"];
            pack.serifSet = serif;
            pack.type = type;
            pack.id = oriPack.id;
            pack.action = oriPack.action;
            pack.item = oriPack.item;
            // ウェイト
            const wait = serif["ウェイト"];
            const waitStr = wait ? wait.toString() : "";
            if (waitStr.includes("*")) {
                pack.wait = Number(waitStr.replace(/\*/g, "")) * n;
            } else {
                pack.wait = Number(wait);
            }
            // ターゲット全てにセリフをセット
            targets.forEach((battler, i) => {
                if (!battler) { return; }
                // 出さない条件
                if (battler._mangaViewCountKe && battler._mangaViewTypeKe == "open") { return; }
                // セット
                battler._mangaViewPacksKe.push(pack);
            }, this);
            if (targets.length) { n++ }
        }, this);
    };
    
    
    
    
    
    //--  マンガビューの作成  --//
    
    
    //- マンガビューの形成
    function createMangaView(charaSprite) {
        if (!keke_showBattleView) { return }
        const battler = charaSprite._actor || charaSprite._enemy;
        if (!battler) { return; }
        if (!battler._mangaViewPacksKe) { return; }
        if (!battler._mangaViewPacksKe.length) { return; }
        // ひとつずつ処理
        let packs = battler._mangaViewPacksKe;
        packs.forEach((pack, i) => {
            if (!pack) { return; }
            // パックウェイト
            if (pack.wait) {
                pack.wait--;
                return;
            }
            // マンガビューの形成2
            createMangaView2(charaSprite, pack);
            packs[i] = null;
        });
        packs = packs.filter(pack => pack);
    };
    
    
    //- マンガビューの形成2
    function createMangaView2(charaSprite, pack) {
        // イニット
        const battler = charaSprite._actor || charaSprite._enemy;
        let text = "";
        let textStyle = null;
        let baseStyle = null;
        let typeName = "";
        // パックを展開
        const type = pack.type;
        const id = pack.id;
        const action = pack.action;
        const item = pack.item;
        const chasesBattler = pack.chasesBattler;
        const serifSet = pack.serifSet;
        // タイプ名の取得
        typeName = getTypeName(type);
        // メモからのスタイル取得
        data = getStyleByNote(battler, type, id, action, item);
        textStyle = data.textStyle ? data.textStyle : textStyle;
        baseStyle = data.baseStyle ? data.baseStyle : data.baseStyle;
        // セリフセットの展開
        data = openSerifSet(battler, type, id, action, item, serifSet);
        text = data.text;
        textStyle = data.textStyle ? data.textStyle : textStyle;
        baseStyle = data.baseStyle ? data.baseStyle : baseStyle;
        // 基本スタイルの取得
        data = getStyleBasic(textStyle, baseStyle, typeName);
        textStyle = data.textStyle ? data.textStyle : textStyle;
        baseStyle = data.baseStyle ? data.baseStyle : data.baseStyle;
        // テキストがないならスキル・アイテムの場合のみ通常取得
        if (!text && (type == "skill" || type == "item")) {
            text = (textStyle["語頭"] || "") + item.name + (textStyle["語尾"] || "");
        }
        // テキストがなければリターン
        if (!text) { return; }
        // マンガビューの消去
        delMangaView(charaSprite, 1);
        // マンガビューの形成3フラグ
        charaSprite._toCreateMangaView3Ke = { text:text, textStyle:textStyle, baseStyle:baseStyle, pack:pack, type:type, item:item, wait:0 }
    };
    
    
    //- マンガビューの形成3
    function createMangaView3(charaSprite) {
        if (!charaSprite._toCreateMangaView3Ke) { return; }
        if (charaSprite._toCreateMangaView3Ke.wait) {
            charaSprite._toCreateMangaView3Ke.wait--;
            return;
        }
        // 1からデータ受け取り
        const _1 = charaSprite._toCreateMangaView3Ke;
        const text = _1.text;
        const textStyle = _1.textStyle;
        const baseStyle = _1.baseStyle;
        const pack = _1.pack;
        const type = _1.type;
        const item = _1.item;
        charaSprite._toCreateMangaView3Ke = null;
        // イニット
        const battler = charaSprite._actor || charaSprite._enemy;
        const gWidth = Graphics.width;
        const gHeight = Graphics.height;
        const scene = SceneManager._scene;
        const spriteset = scene._spriteset;
        let layer = scene._mangaLikeLayerKe;
        const showDire = pack.type == "victory" ? keke_showDireVictory : 
        battler._actorId ? keke_showDireActor : keke_showDireEnemy;
        if (pack.serifUdReverse) { showDire = showDire == "上" ? "下" : "上"; }
        let data = null;
        let match = null;
        let offsetX = 0;
        let offsetY = 0;
        // 表示中タイプを保存
        battler._mangaViewTypeKe = pack.type;
        // 小窓内容の取得
        const minis = {};
        if (textStyle["小窓表示"] != "表示しない") {
            if (textStyle["小窓表示"] == "キャラ名") {
                minis.text = charaSprite._actor ? charaSprite._actor.name() : charaSprite._enemy.name();
            } else if (textStyle["小窓表示"] == "技名" && (type == "skill" || type == "item" || type == "chain")) {
                minis.text = item.name;
            }
            minis.textStyle = keke_miniTextStyle;
            minis.baseStyle = keke_miniBaseStyle;
        }
        // アイコンスプライト形成
        const icons = {};
        const iconIndex = item ? item.iconIndex : null;
        if (iconIndex && textStyle["アイコン表示"]) {
            icons.sprite = createIconSprite(iconIndex);
            icons.sprite._isIcon = true;
            icons.posX = keke_iconPos["X"];
            icons.posY = keke_iconPos["Y"];
            icons.posW = -0.5;
        }
        // 位置設定
        const rel = showDire == "上" ? "up" : "down";
        let x = 0;
        let y = 0;
        let logHeightBasic = 0;
        let isAsi = false;
        // フルアニメステータスの位置設定
        const asi = getFullAnimeStatusAsi(battler, pack.type);
        if (asi && asi.faceBaseSprite) {
            const faceX = asi.faceBaseSprite.x;
            const faceY = asi.faceBaseSprite.y;
            const faceW = asi.faceOriW * asi.faceBaseSprite.scale.x / 4;
            const faceH = asi.faceOriH * asi.faceBaseSprite.scale.y / 2;
            x = Math.round(faceX + (asi.animeDire == "右" ? faceW : -faceW));
            y = Math.round(faceY + (rel == "up" ? -faceH : faceH));
            isAsi = true;
            const fast = $gameTemp._fullAnimeStatusKe;
            layer = fast._layers[fast._messageLayer];
        // 通常の位置設定
        } else {
            x = charaSprite._homeX + charaSprite._offsetX;
            y = charaSprite._homeY + charaSprite._offsetY - charaSprite._frame.height;
            //logHeightBasic = logWindow.y + $gameSystem.windowPadding();
            // アクターの場合の位置補正
            if (charaSprite._actor) {
                y += !$gameSystem.isSideView() ? 8 : -8;
            }
        }
        // テキストボックスコンフィグ
        const cfgs = { rel:rel, noOuter:true, hedges:keke_hedgeScope };
        if (isAsi) {
            cfgs.tsunoDire = asi.animeDire == "右" ? "left" : "right";
            cfgs.forceDownMax = null;
            cfgs.oriSpriteX = asi.faceBaseSprite.x;
            cfgs.oriSpriteY = asi.faceBaseSprite.y;
        } else {
            if ($gameSystem.isSideView()) {
                cfgs.tsunoDire = charaSprite._enemy  ? "left" : "right";
            } else {
                cfgs.tsunoDire = "left";
            }
            cfgs.forceDownMax = charaSprite._frontViewKe ? 0 : null;
            cfgs.oriSpriteX = charaSprite.x;
            cfgs.oriSpriteY = charaSprite.y;
        }
        cfgs.posYReverse = showDire == "下" ? -1 : 1;
        // テキストボックスの形成
        const boxData = createTextBox(text, x, y, textStyle, baseStyle, cfgs, minis, icons);
        // ボックスデータ受け取り
        const textSprite = boxData.textSprite;
        textSprite._isText = true;
        const baseSprite = boxData.baseSprite;
        const tsunoSprite = boxData.tsunoSprite;
        const miniTextSprite = boxData.miniTextSprite;
        const miniBaseSprite = boxData.miniBaseSprite;
        const skinSprite = boxData.skinSprite;
        const iconW = boxData.iconW;
        const iconH = boxData.iconH;
        // チルド & 変数セット
        const skin = baseStyle["スキン"];
        const skinOver = skin && skin["レイヤー"] == "ベースより上";
        if (skinOver) { layer.addChild(baseSprite); } 
        if (skinSprite) {
            layer.addChild(skinSprite);
            charaSprite._mangaViewSpritesKe.push(skinSprite);
            skinSprite._oriScaleX = skinSprite.scale.x;
            skinSprite._oriScaleY = skinSprite.scale.y;
        }
        if (!skinOver) { layer.addChild(baseSprite); } 
        charaSprite._mangaViewSpritesKe.push(baseSprite);
        layer.addChild(textSprite);
        charaSprite._mangaViewSpritesKe.push(textSprite);
        if (icons.sprite) {
            layer.addChild(icons.sprite);
            charaSprite._mangaViewSpritesKe.push(icons.sprite);
        }
        if (tsunoSprite) {
            layer.addChild(tsunoSprite);
            charaSprite._mangaViewSpritesKe.push(tsunoSprite);
        }
        if (miniBaseSprite) {
            layer.addChild(miniBaseSprite);
            charaSprite._mangaViewSpritesKe.push(miniBaseSprite);
        }
        if (miniTextSprite) {
            layer.addChild(miniTextSprite);
            charaSprite._mangaViewSpritesKe.push(miniTextSprite);
        }
        // スケールのセット
        if (keke_showAnime["時間"]) {
            const duraMax = keke_showAnime["時間"];
            charaSprite._mangaViewSpritesKe.forEach(sprite => {
                sprite._scaleKe = { duraMax:duraMax, duration:0, x:sprite.scale.x, y:sprite.scale.y, spdX:sprite.scale.x / duraMax, spdY:sprite.scale.y / duraMax };
                if (keke_showAnime["方向"].includes("横")) { sprite.scale.x = 0; }
                if (keke_showAnime["方向"].includes("縦")) { sprite.scale.y = 0; }
            });
        }
        // カウント開始
        battler._mangaViewCountKe = pack.count;
    };
    
    
    //- タイプ名の取得
    function getTypeName(type) {
        // タイプ名を取得
        let name = "";
        switch (type) {
            case "open":
                name = "開始";
                break;
            case "input":
                name = "入力";
                break;
            case "skill":
            case "item":
                name = "行動";
                break;
            case "damage":
                name = "ダメ";
                break;
            case "heal":
                name = "回復";
                break;
            case "dead":
                name = "倒れ";
                break;
            case "victory":
                name = "勝利";
                break;
            case "chain":
                name = "連結";
                break;
        }
        return name;
    };
    
    
    //- ビュースタイルの取得
    function getStyleByNote(battler, type, id, action, item, typeName) {
        // イニット
        let textStyle = null;
        let baseStyle = null;
        let note = item ? item.meta["viewStyle"] || item.meta["ビュースタイル"] : null;
        if (note) { note = note.replace(/\s/g, "").split(","); }
        // テキストスタイルをメモ欄から検索
        if (note && note[0]) {
            for (const style of keke_commonTextStyle) {
                if (style["名"] == note[0]) { textStyle = style; break;}
            }
        }
        // ベーススタイルをメモ欄から検索
        if (note && note[1]) {
            for (const style of keke_commonBaseStyle) {
                if (style["名"] == note[1]) { baseStyle = style; break;}
            }
        }
        return { textStyle:textStyle, baseStyle:baseStyle, typeName:name }
    };
    
    
    //- セリフセットの展開
    function openSerifSet(battler, type, id, action, item, serifSet) {
        // イニット
        let text = "";
        let textStyle = null;
        let baseStyle = null;
        // セリフセットがあったらセリフデータを取得
        if (serifSet) {
            // テキスト
            text = serifSet["テキスト"];
            // 行動時の制御文字
            if (item && text) {
                // 制御文字
                text = text.replace(/\\act/, item.name);
                text = text.replace(/\\self/, battler.name());
            }
            // スタイル
            for (const style of keke_commonTextStyle) {
                if (style["名"] == serifSet["テキストスタイル"]) { textStyle = style; break;}
            }
            for (const style of keke_commonBaseStyle) {
                if (style["名"] == serifSet["ベーススタイル"]) { baseStyle = style; break;}
            }
            // 表示時間
            if (serifSet["表示時間"]) {
                if (type == "skill" || type == "item") {
                    battler._mangaSerifActTimeKe = serifSet["表示時間"];
                } else {
                    battler._mangaViewCountKe = serifSet["表示時間"];
                }
            }
            // 効果音(マテリアルベースがある時のみ)
            if (serifSet["効果音"] && PluginManager._scripts.some(n => n == "MaterialBase")) {
                serifSet["効果音"].forEach(se => {
                    const name = $gameSystem.getMaterialAudio(se["名"]);
                    AudioManager.playSe({ name:name, volume:se["音量"] + keke_volumeLump, pitch:se["ピッチ"] + keke_pitchLump, pan:se["位相"] + keke_panLump });
                }, this);
            }
            // フラッシュ
            if (serifSet["フラッシュ"] && serifSet["フラッシュ"]["時間"]) {
                const flash = serifSet["フラッシュ"];
                const duration = flash["時間"];
                const color = [flash["赤"], flash["緑"], flash["青"], flash["濃度"]];
                $gameScreen.startFlash(color, duration);
            }
        }
        return { text:text, textStyle:textStyle, baseStyle:baseStyle }
    };
    
    
    //- 基本スタイルの取得
    function getStyleBasic(textStyle, baseStyle, typeName) {
        if (!textStyle) {
            for (const style of keke_commonTextStyle) {
                if (style["名"] == keke_styleBasic[`${typeName}テキストスタイル`]) { textStyle = style; break;}
             }
        }
        if (!baseStyle) {
            for (const style of keke_commonBaseStyle) {
                if (style["名"] == keke_styleBasic[`${typeName}ベーススタイル`]) { baseStyle = style; break;}
            }
        }
        return { textStyle:textStyle, baseStyle:baseStyle }
    };
    
    
    
    
    
    //--  マンガビューの消去  --//
    
    
    //- マンガビューの消去
    function delMangaView(charaSprite, force = null) {
        if (!keke_showBattleView) { return; }
        // マンガビューがないならリターン
        if (!charaSprite._mangaViewSpritesKe || !charaSprite._mangaViewSpritesKe.length) { return; }
        // バトラーがいないならリターン
        const battler = charaSprite._actor || charaSprite._enemy;
        if (!battler) { return; }
        // 強制ならすぐ消去
        if (force == 1) {
            delMangaView2(charaSprite);
            return;
        }
        // サブ強制ならすぐフェード開始
        if (force == 2) { battler._mangaViewCountKe = 0; }
        // カウントがnullならリターン
        if (battler._mangaViewCountKe == null || battler._mangaViewCountKe < -100) { return; }
        // カウント処理
        if (battler._mangaViewCountKe) {
            battler._mangaViewCountKe--;
            return;
        }
        // カウント削除
        battler._mangaViewCountKe = null;
        // 縮小アニメのセット
        if (keke_showAnime["時間"]) {
            const duraMax = keke_showAnime["時間"];
            charaSprite._mangaViewSpritesKe.forEach(charaSprite => {
                charaSprite._scaleKe = { duraMax:duraMax, duration:0, x:0, y:0, spdX:-charaSprite.scale.x / duraMax, spdY:-charaSprite.scale.y / duraMax, del:true };
            });
        } else {
            // マンガビューの消去2
            delMangaView2(charaSprite);
        }
    };
    
    
    //- マンガビューの消去2
    function delMangaView2(charaSprite) {
        if (!keke_showBattleView) { return; }
        // マンガビューがないならリターン
        if (!charaSprite._mangaViewSpritesKe.length) { return; }
        // イニット
        const battler = charaSprite._battler;
        const fast = $gameTemp._fullAnimeStatusKe;
        const scene = SceneManager._scene;
        const spriteset = scene._spriteset;
        // フルアニメステータス
        const asi = getFullAnimeStatusAsi(battler);
        const layer = asi && asi.faceBaseSprite ? fast._layers[fast._messageLayer] : scene._mangaLikeLayerKe;
        // 破棄
        charaSprite._mangaViewSpritesKe.forEach(sprite => {
            destroySprite(sprite);
        });
        // 変数を初期化
        battler._mangaViewCountKe = null;
        charaSprite._mangaViewSpritesKe = [];
    };
    
    
    //- バトル終了時にビュー全消去(コア追加)
    /*const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function() {
        _BattleManager_updateBattleEnd.apply(this);
        const battlerSprites = SceneManager._scene._spriteset.battlerSprites();
        battlerSprites.forEach(charaSprite => {
            delMangaView(charaSprite, 2);
        });
    };*/
    
    
    
    
    
    //--  マンガビューの移動とスケール  --//
    
    
    //- マンガビューの移動
    function moveMangaView(charaSprite) {
        if (!keke_viewMove) { return; }
        if (!charaSprite._mangaViewSpritesKe || !charaSprite._mangaViewSpritesKe.length) { return; }
        // イニット
        const battler = charaSprite._battler;
        const  nowType = battler._mangaViewTypeKe;
        const moveTypes = ["input", "skill", "item", "chain",  "open", "victory"];
        if (!moveTypes.includes( nowType)) { return; }
        const gWidth = Graphics.width;
        const gHeight = Graphics.height;
        const hedge = keke_hedgeScope;
        const gDownMax = gHeight - (hedge["下"] || 0);
        const gLeftMax = hedge["左"] || 0;
        const gRightMax = gWidth - (hedge["右"] || 0);
        const gUpMax = hedge["上"] || 0;
        // フルアニメステータス
        const asi = getFullAnimeStatusAsi(battler);
        if (asi && asi.faceBaseSprite) {
            // マンガビューの移動(フルアニメ )
            moveMangaViewFullAnime(charaSprite, asi, gDownMax, gLeftMax, gRightMax, gUpMax,  nowType);
        // 通常
        } else {
            // マンガビューの移動(通常)
            moveMangaViewNormal(charaSprite, gDownMax, gLeftMax, gRightMax, gUpMax);
        }
    };
    
    
    //- マンガビューの移動(フルアニメ)
    function moveMangaViewFullAnime(charaSprite, asi, gDownMax, gLeftMax, gRightMax, gUpMax, nowType) {
        const views = charaSprite._mangaViewSpritesKe;
        const baseSprite = views.filter(sprite => sprite._isBase)[0];
        const faceBaseSprite = asi.faceBaseSprite;
        const dire = asi.animeDire == "上" || asi.animeDire == "下" ? "y" : "x";
        const isAct =  nowType == "skill" ||  nowType == "item";
        // 初期化
        if (charaSprite._mangaViewPreXKe == null) { charaSprite._mangaViewPreXKe = faceBaseSprite.x; }
        if (charaSprite._mangaViewPreYKe == null) { charaSprite._mangaViewPreYKe = faceBaseSprite.y; }
        // 移動したか判定
        let moveX = faceBaseSprite.x - charaSprite._mangaViewPreXKe;
        let moveY = faceBaseSprite.y - charaSprite._mangaViewPreYKe;
        // 移動X
        if (moveX && (!isAct || dire == "x")) {
            views.forEach(sprite => sprite.x = faceBaseSprite.x + sprite._relativeX);
            // 画面外に出さない
            const vLeft = faceBaseSprite.x + baseSprite._relativeX + baseSprite._edgeLeft;
            if (vLeft < gLeftMax) {
                views.forEach(sprite => sprite.x += (gLeftMax - vLeft));
            }
            const vRight = faceBaseSprite.x + baseSprite._relativeX + baseSprite._edgeRight;
            if (vRight > gRightMax) {
                views.forEach(sprite => sprite.x += (gRightMax - vRight));
            }
        }
        // 移動Y
        if (moveY && (!isAct || dire == "y")) {
            views.forEach(sprite => sprite.y = faceBaseSprite.y + sprite._relativeY);
            // 画面外に出さない
            const vUp = faceBaseSprite.y + baseSprite._relativeY + baseSprite._edgeUp;
            if (vUp < gUpMax) {
                views.forEach(sprite => sprite.y += (gUpMax - vUp));
            }
            const vDown = faceBaseSprite.y + baseSprite._relativeY + baseSprite._edgeDown;
            if (vUp > gDownMax) {
                views.forEach(sprite => sprite.y += (gDownMax - vUp));
            }
        }
        // 位置を保存
        charaSprite._mangaViewPreXKe = faceBaseSprite.x;
        charaSprite._mangaViewPreYKe = faceBaseSprite.y;
    };
    
    
    //- マンガビューの移動(通常)
    function moveMangaViewNormal(charaSprite, gDownMax, gLeftMax, gRightMax, gUpMax) {
        // イニット
        const views = charaSprite._mangaViewSpritesKe;
        const baseSprite = views.filter(sprite => sprite._isBase)[0];
        const gWidth = Graphics.width;
        const gHeight = Graphics.height;
        // 初期化
        if (charaSprite._mangaViewPreXKe == null) { charaSprite._mangaViewPreXKe = charaSprite.x; }
        if (charaSprite._mangaViewPreYKe == null) { charaSprite._mangaViewPreYKe = charaSprite.y; }
        // 移動したか判定
        const moveX = charaSprite.x - charaSprite._mangaViewPreXKe;
        const moveY = charaSprite.y - charaSprite._mangaViewPreYKe;
        // 移動X
        if (moveX) {
            views.forEach(sprite => sprite.x = charaSprite.x + sprite._relativeX);
            // 画面外に出さない
            const vLeft = charaSprite.x + baseSprite._relativeX + baseSprite._edgeLeft;
            if (moveX < 0 && vLeft < gLeftMax) {
                views.forEach(sprite => sprite.x += (gLeftMax - vLeft));
            }
            const vRight = charaSprite.x + baseSprite._relativeX + baseSprite._edgeRight;
            if (moveX > 0 && vRight > gRightMax) {
                views.forEach(sprite => sprite.x += (gRightMax - vRight));
            }
        }
        // 移動Y
        if (moveY) {
            views.forEach(sprite => sprite.y = charaSprite.y + sprite._relativeY);
            // 画面外に出さない
            const vUp = charaSprite.y + baseSprite._relativeY + baseSprite._edgeUp;
            if (moveY < 0 && vUp < gUpMax) {
                views.forEach(sprite => sprite.y += (gUpMax - vUp));
            }
            const vDown = charaSprite.y + baseSprite._relativeY + baseSprite._edgeDown;
            if (moveY > 0 && vUp > gDownMax) {
                views.forEach(sprite => sprite.y += (gDownMax - vUp));
            }
        }
        // 位置を保存
        charaSprite._mangaViewPreXKe = charaSprite.x;
        charaSprite._mangaViewPreYKe = charaSprite.y;
    };
    
    
    //- マンガビューのスケール
    function scaleMangaView(charaSprite) {
        if (!keke_showBattleView) { return; }
        // ビューがないならリターン
        if (!charaSprite._mangaViewSpritesKe || !charaSprite._mangaViewSpritesKe.length) { return; }
        // イニット
        const scene = SceneManager._scene;
        const spriteset = scene._spriteset;
        const layer = scene._mangaLikeLayerKe;
        let del = false;
        // ビュー展開
        charaSprite._mangaViewSpritesKe.forEach((sprite, i) => {
            // 拡大がないなら次へ
            if (!sprite._scaleKe) { return; }
            // 拡大取得
            let scale = sprite._scaleKe;
            // 拡大
            if (keke_showAnime["方向"].includes("横")) { sprite.scale.x += scale.spdX; }
            if (keke_showAnime["方向"].includes("縦")) { sprite.scale.y += scale.spdX; }
            // 時間を足す
            scale.duration++;
            // 終了
            if (scale.duration >= scale.duraMax) {
                sprite.scale.x = scale.x;
                sprite.scale.y = scale.y;
                // スプライトを破棄
                if (scale.del) {
                    destroySprite(sprite);
                    charaSprite._mangaViewSpritesKe[i] = null;
                }
                // 拡大削除
                sprite._scaleKe= null;
            }
        }, charaSprite);
        // null を消去
        charaSprite._mangaViewSpritesKe = charaSprite._mangaViewSpritesKe.filter(sprite => sprite);
    };
    
    
    //- マンガビューのツノ更新
    function updateMangaViewTsuno(charaSprite) {
        if (!charaSprite._mangaViewSpritesKe || !charaSprite._mangaViewSpritesKe.length) { return; }
        // イニット
        const views = charaSprite._mangaViewSpritesKe;
        const tsunoSprite = views.filter(sprite => sprite._isTsuno)[0];
        if (!tsunoSprite) { return; }
        // フルアニメステータス
        const asi = getFullAnimeStatusAsi(charaSprite._battler);
        if (asi && asi.faceBaseSprite) {
            if (asi.faceBaseSprite.x < tsunoSprite.x) { tsunoSprite.scale.x = 1; }
            if (asi.faceBaseSprite.x > tsunoSprite.x) { tsunoSprite.scale.x = -1; }
        // 通常
        } else {
            if (charaSprite.x < tsunoSprite.x) { tsunoSprite.scale.x = 1; }
            if (charaSprite.x > tsunoSprite.x) { tsunoSprite.scale.x = -1; }
        }
    };
    
    
    
    
    
    //--  フロントビュー対応  --//
    
    
    //- フロントビュー時もアクタースプライトを作る
    const _Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function() {
        _Spriteset_Battle_createActors.call(this);
        if ($gameSystem.isSideView()) { return; }
        if (this._actorSprites.length) { return; }
        this._actorSprites = [];
        for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
            const sprite = new Sprite_Actor();
            this._actorSprites.push(sprite);
            this._battleField.addChild(sprite);
            sprite.visible = false;
       }
    };
    
    
    //- フロントビュー時のアニメ条件
    const _Spriteset_Battle_makeTargetSprites = Spriteset_Battle.prototype.makeTargetSprites;
    Spriteset_Battle.prototype.makeTargetSprites = function(targets) {
        let targetSprites = _Spriteset_Battle_makeTargetSprites.call(this, targets);
        // イニット
        const statusWindow = SceneManager._scene._statusWindow;
        // 選抜
        targetSprites = targetSprites.filter(sprite => {
            if (!sprite._battler) { return false; }
            if ($gameSystem.isSideView()) { return true; }
            if (sprite._enemy) { return true; }
            if (sprite._isAsFaceKe) { return true; }
           return validFrontViewAdapt(sprite);
        }, this);
        return targetSprites;
    };
    
    
    //- スプライトアクターの位置更新
    const _Sprite_Actor_updatePosition = Sprite_Actor.prototype.updatePosition;
    Sprite_Actor.prototype.updatePosition = function() {
        _Sprite_Actor_updatePosition.call(this);
        // フロントビュー位置の更新
        updateFrontViewPos(this);
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
    
    
    //- ダメージポップのレイヤー変更
    const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
    Sprite_Battler.prototype.createDamageSprite = function() {
        _Sprite_Battler_createDamageSprite.call(this);
        // レイヤー変更
        if (validFrontViewAdapt(this) && !$gameTemp._fullAnimeStatusKe) {
            const sprite = this._damages[this._damages.length - 1];
            SceneManager._scene._mangeLikeLayerKe.addChild(sprite);
        }
    };
    
    
    //- フロントビュー対応するか
    function validFrontViewAdapt(sprite) {
        const statusWindow = SceneManager._scene._statusWindow;
        return keke_adaptFrontView && !$gameSystem.isSideView() && sprite._actor && (statusWindow && statusWindow.visible);
    };
    
    
    
    
    
    //--  文字列基本 /ベーシック  --//
    
    
    //- 文字列の数字リスト化
    function strToNumList(str) {
        const list = [];
        str = str.replace(/\[/g, "");
        str = str.replace(/\]/g, "");
        const strs = str.split(",");
        let s2 = null;
        for (let s of strs) {
            s2 = s.split("~");
            if (s2.length >= 2) {
                s2 = s2.map(s => Number(s));
                if (s2[1] >= s2[0]) {
                    for (let i = s2[0]; i <= s2[1]; i++) { list.push(i); }
                } else {
                    for (let i = s2[1]; i <= s2[0]; i++) { list.push(i); }
                }
            } else {
                list.push(Number(s));
            }
        };
        return list;
    };
    
    
    
    
    
    //--  テキスト基本 /ベーシック  --//
    
    
    //- 文字列幅
    function strWidth(str, fontSize, rate = 0.5) {
        return strBytes(str) * fontSize * rate;
    };
    
    
    //- 文字列バイト数
    function strBytes(str) {
        let byte = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if ((c >= 0x0 && c < 0x81) || (c === 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) {
                byte += 1;
            } else {
                byte += 2;
            }
        }
        return byte;
    };
    
    
    
    
    
    //--  比較基本 /ベーシック  --//
    
    
    //- 同じバトラーか
    function isSameBattlerKe(a, b) {
        if (!a) { return !b; }
        if (!b) { return !a; }
        if (a._actorId) {
            if (!b._actorId) { return; }
            return a._actorId == b._actorId;
        }
        if (a._enemyId) {
            if (!b._enemyId) { return; }
            return a.index() == b.index();
        }
    };
    
    
    
    
    
    //--  バトラー条件判定 /ベーシック  --//
    
    
    //- バトラーの条件判定
    function battlerJudgeCondition(battler, condition) {
        if (!condition) { return true; }
        return eval(convertAbbreviateChar(condition));
    };
    
    
    //- 省略文字変換
    function convertAbbreviateChar(text) {
        text = text.replace(/\\lv/g, "this._level");
        text = text.replace(/\\hp/g, "this.hpRate() * 100");
        text = text.replace(/\\mp/g, "this.mpRate() * 100");
        text = text.replace(/\\tp/g, "this.tpRate() * 100");
        text = text.replace(/\\st\[(\d+)\]/g, "this.isStateAffected($1)");
        text = text.replace(/\\sw\[(\d+)\]/g, "$gameSwitches.value($1)");
        text = text.replace(/\\vr\[(\d+)\]/g, "$gameVariables.value($1)");
        text = text.replace(/\\rd\[(\d+)\]/g, "Math.randomInt(100) < $1");
        return text
    };
    
    
    
    
    
    //--  テキストボックスの形成  --//
    
    
    //- テキストボックスの形成
    function createTextBox(text, x, y, textStyle, baseStyle, cfgs = {}, minis = {}, icons = {}, handler) {
        const form = baseStyle["フォーム"];
        const align = textStyle["揃え"] || "center";
        const textOutW = textStyle["縁取り幅"] || 0;
        const marginX = baseStyle["余白X"] || 0;
        const marginY = baseStyle["余白Y"] || 0;
        const baseOutW = baseStyle["縁取り幅"] || 0;
        const miniTextOutW = minis.textStyle ? minis.textStyle["縁取り幅"] : 0;
        const iconSprite = icons.sprite;
        const gWidth = Graphics.width;
        const gHeight = Graphics.height;
        let allSprites = [];
        let match = null;
        // テキストスプライトの形成
        const textData = createTextSprite(text, x, y, textStyle, handler);
        // テキストデータ受け取り
        const textSprite = textData.sprite;
        let textW = textData.width || 0;
        let textH = textData.height || 0;
        const textLines = textData.lines;
        allSprites.push(textSprite);
        textOriY = textSprite.y;
        // 縦揃えの処理
        if (cfgs.hAlign && cfgs.hAlign == "down") {
            const h = textLines.h.reduce((a, c, i) => {
                if (i > 0) { c /= 2; }
                return a + c;
            }, 0);
            y -= h;
            textSprite.y -= h;
        }
        // アイコンスプライトの計算
        const iconData = calcIconSprite(icons, textStyle, textLines);
        const iconW = iconData.width;
        const iconH = iconData.height;
        textW += iconW;
        if (!textH) { textH = iconH; }
        // ベーススプライトの形成
        const baseData = createBaseSprite(x, y, textW, textH, baseStyle, cfgs, handler, iconW);
        // ベースデータ受け取り
        const baseSprite = baseData.sprite;
        let baseW = baseData.width || 0;
        let baseH = baseData.height || 0;
        const tsunoSprite = baseData.tsunoSprite;
        const tsunoOy= baseData.tsunoOy || 0;
        const tsunoW= baseData.tsunoW || 0;
        const tsunoAppo= baseData.tsunoAppo;
        allSprites.push(baseSprite);
        if (tsunoSprite) { allSprites.push(tsunoSprite); }
        // ギザギザ時は元の幅に
        baseW = form == "ギザギザ" ? textW + marginX * 2 + baseOutW : baseW;
        baseH = form == "ギザギザ" ? textH + marginY * 2 + baseOutW : baseH;
        // スキンの形成
        const skinData = createSkin(x, y, textW, textH, baseStyle);
        const skinSprite = skinData.sprite;
        // ミニテキストスプライト形成
        const miniTextData = createMiniTextSprite(minis, textSprite, textW, textLines, iconW);
        const miniTextSprite = miniTextData.textSprite;
        const miniBaseSprite = miniTextData.baseSprite;
        const miniBaseW = miniTextData.width || 0;
        const miniBaseH = miniTextData.height || 0;
        if (miniTextSprite) {
            allSprites.push(miniTextSprite);
            allSprites.push(miniBaseSprite);
        }
        // アイコンスプライトのセット
        if (iconSprite) {
            allSprites.push(iconSprite);
        }
        // スプライト判別フラグ
        textSprite._isText = true;
        baseSprite._isBase = true;
        if (tsunoSprite) { tsunoSprite._isTsuno = true; }
        if (miniTextSprite) {
            miniTextSprite._isMiniText = true;
            miniBaseSprite._isMiniBase = true;
        }
        if (iconSprite) { iconSprite._isIcon = true; }
        // X位置調整
        const posX = baseStyle["位置X"] || 0;
        allSprites.forEach(sprite => sprite.x += posX + iconW / 2);
        // Y位置調整
        const posY = (baseStyle["位置Y"] || 0) * (cfgs.posYReverse || 1);;
        if (cfgs.rel == "up") {
            allSprites.forEach(sprite => sprite.y += -baseH * 0.5 + posY);
        } else if (cfgs.rel == "down") {
            allSprites.forEach(sprite => sprite.y += baseH * 0.5 + posY);
        }
        // スキン位置の修正
        if (skinSprite) {
            skinSprite.y += textSprite.y - textOriY;
        }
        // 中心からの相対位置を保存
        allSprites.forEach(sprite => {
            sprite._relativeX = sprite.x - (cfgs.oriSpriteX || 0);
            sprite._relativeY = sprite.y - (cfgs.oriSpriteY || 0);
        }, this);
        // テキストポックスを画面外に出さない
        const noOuterData = noOuterTextBox(allSprites, cfgs, textW, textLines, baseSprite, baseW, baseH, iconSprite, iconW, minis, miniTextSprite, miniBaseW, miniBaseH, tsunoSprite, tsunoAppo);
        const offsetX = noOuterData.offsetX || 0;
        const offsetY = noOuterData.offsetY || 0;
        // ツノの位置設定
        posSetTsuno(tsunoSprite, tsunoAppo, tsunoW, baseSprite, baseW, offsetX, baseStyle, form, cfgs);
        return { textSprite:textSprite, baseSprite:baseSprite, tsunoSprite:tsunoSprite, miniTextSprite:miniTextSprite, miniBaseSprite:miniBaseSprite, skinSprite:skinSprite, iconW:iconW, iconH:iconH };
    };
    
    
    //- ツノの位置設定
    function posSetTsuno(tsunoSprite, tsunoAppo, tsunoW, baseSprite, baseW, offsetX, baseStyle, form, cfgs) {
        if (!tsunoSprite || !tsunoAppo) { return; }
        const t = tsunoAppo;
        // 画面外補正を戻す
        tsunoSprite.x -= offsetX;
        tsunoSprite._relativeX -= offsetX;
        t.tsuno.o -= offsetX;
        // フキダシからはみ出さない
        const baseR = baseSprite.x + baseW / 2 - baseStyle["変形"];
        const tsunoR = tsunoSprite.x + tsunoW / 2;
        let outOx = 0;
        if (tsunoR > baseR) { outOx = tsunoR - baseR }
        const baseL = baseSprite.x - baseW / 2 + baseStyle["変形"];
        const tsunoL = tsunoSprite.x - tsunoW / 2;
        if (tsunoL < baseL) { outOx = tsunoL - baseL; }
        if (outOx) {
            tsunoSprite.x = baseSprite.x;
            tsunoSprite._relativeX = baseSprite._relativeX;
            t.tsuno.o = 0;
        }
        // ベース外枠を描画
        if (t.form == "スクエア") {
            strokeSquare(t.bitmap, t.x, t.y, t.width, t.height, t.outColor, t.outH, t.shape, "", t.tsuno, t.rel);
        }
        // ツノの向き補正
        if (tsunoSprite && form == "スクエア") {
            if (cfgs.tsunoDire == "right") { tsunoSprite.scale.x *= -1; }
        }
    };
    
    
    //- アイコンスプライトの計算
    function calcIconSprite(icons, textStyle, textLines) {
        if (!icons.sprite) { return { width:0, height:0 } }
        const iconSprite = icons.sprite;
        let iconW = icons.faceW || ImageManager.iconWidth;
        let iconH = icons.faceH || ImageManager.iconHeight;
        const iconScale = icons.faceH || icons.faceH ? textStyle["顔グラ拡大率"] || textStyle["アイコン拡大率"] || 1  : textStyle["アイコン拡大率"] || 1;
        // 最大幅のラインを取得
        let maxW = 0;
        let m = 0;
        textLines.w.forEach((w, i) => {
            if (w > maxW) {
                maxW = w;
                m = i;
            } 
        }, this);
        // ラインに応じた拡大
        iconSprite.scale.y = (textLines.h[m] || iconH) / iconH * iconScale;
        iconSprite.scale.x = iconSprite.scale.y;
        iconW *= iconSprite.scale.x;
        iconH *= iconSprite.scale.y;
        //  ラインに応じた位置
        iconSprite.x = textLines.x[m] + (icons.faceH ? textStyle["顔グラX"] || 0 : textStyle["アイコンX"] || 0);
        iconSprite.y = textLines.y[m] + (icons.faceH ? textStyle["顔グラY"] || 0 : textStyle["アイコンY"] || 0);
        // 位置補正
        iconSprite.x += (icons.posX || 0) + iconW * (icons.posW || 0);
        iconSprite.y += (icons.posY || 0) + iconH * (icons.posH || 0);
        // 基本の拡大率を保存
        iconSprite._oriScaleX = iconSprite.scale.x;
        iconSprite._oriScaleY = iconSprite.scale.y;
        return { width:iconW, height:iconH };
    };
    
    
    //- ミニテキストスプライトの形成
    function createMiniTextSprite(minis, textSprite, textW, textLines, iconW) {
        if (!minis.text) { return {}; }
        if (!minis.textStyle["可"]) {
            minis.text = "";
            return {};
        }
        // ミニテキスト形成
        const miniTextData = createTextSprite(minis.text, 0, 0, minis.textStyle);
        miniTextSprite = miniTextData.sprite;
        const miniTextMaxW = miniTextData.width;
        const miniTextTotalH = miniTextData.height;
        // ミニベース形成
        const miniBaseData = createBaseSprite(0, 0, miniTextMaxW, miniTextTotalH, minis.baseStyle);
        miniBaseSprite = miniBaseData.sprite;
        miniBaseW = miniBaseData.width;
        miniBaseH = miniBaseData.height;
        // ミニテキスト位置設定
        const miniMaxW = Math.max(miniTextMaxW, miniBaseW);
        const miniMaxH = Math.max(miniTextTotalH, miniBaseH, textLines.h[0]);
        const miniMap = minis.baseStyle["配置方向"];
        let miniX = minis.baseStyle["位置X"];
        let miniY = minis.baseStyle["位置Y"];
        if (miniMap.includes("左")) {
            miniX = textSprite.x - textW / 2 + miniTextMaxW / 2 + miniX - (iconW ? iconW / 2 : 0);
        }
        if (miniMap.includes("上")) {
            miniY = textLines.y[0] - miniMaxH + miniY;
        }
        if (miniMap.includes("下")) {
            miniY = (textLines.y[textLines.y.length - 1] || 0) + (textLines.h[textLines.h.length - 1] || 0) + miniY;
        }
        if (miniMap.includes("右")) {
            miniX = textSprite.x + textW / 2 - miniTextMaxW / 2 + miniX;
        }
        miniTextSprite.x = miniX;
        miniTextSprite.y = miniY
        miniBaseSprite.x = miniX;
        miniBaseSprite.y = miniY;
        return { textSprite:miniTextSprite, baseSprite:miniBaseSprite, width:miniBaseW, height:miniBaseH };
    };
    
    
    //- テキストボックスを画面外に出さない
    function noOuterTextBox(allSprites, cfgs, textW, textLines, baseSprite, baseW, baseH, iconSprite, iconW, minis, miniTextSprite, miniBaseW, miniBaseH, tsunoSprite, tsunoAppo) {
        if (!cfgs.noOuter) { return {}; }
        const gWidth = Graphics.width;
        const gHeight = Graphics.height;
        // 画面外に出てるか計算
        const miniMap = minis.text ? minis.baseStyle["配置方向"] : "";
        const topW = textLines.w[0];
        const topH = textLines.h[0];
        const maxW = Math.max(baseW, textW) * 1.0;
        const maxDown = Math.max(baseH / 2, (minis.text && miniMap.includes("下") ? miniTextSprite.y - baseSprite.y + miniBaseH / 2 : 0));
        const maxLeft = Math.max(baseW / 2, topW / 2 + (iconSprite ? iconW : 0), (minis.text && miniMap.includes("左") ? baseSprite.x - miniTextSprite.x + miniBaseW / 2 : 0));
        const maxRight = Math.max(baseW / 2, (minis.text && miniMap.includes("右") ? miniTextSprite.x - baseSprite.x + miniBaseW / 2 : 0));
        const maxUp = Math.max(baseH / 2, (minis.text && miniMap.includes("上") ? baseSprite.y - miniTextSprite.y + miniBaseH / 2 : 0));
        const vDown = baseSprite.y + maxDown;
        const vLeft = baseSprite.x - maxLeft;
        const vRight = baseSprite.x + maxRight;
        const vUp = baseSprite.y - maxUp;
        const hedge = cfgs.hedges || {};
        const gDownMax = cfgs.forceDownMax != null ? gHeight - cfgs.forceDownMax : gHeight - (hedge["下"] || 0);
        const gLeftMax = cfgs.forceLeftMax != null ? cfgs.forceLeftMax : (hedge["左"] || 0);
        const gRightMax = cfgs.forceRightMax != null ? gWidth - cfgs.forceRightMax : gWidth - (hedge["右"] || 0);
        const gUpMax = cfgs.forceUpMax != null ? cfgs.forceUpMax : (hedge["上"] || 0);
        let offsetX = 0;
        let offsetY = 0;
        // 画面外だったら補正
        if (vDown > gDownMax) {
            offsetY = gDownMax - vDown;
            allSprites.forEach(sprite => sprite.y += offsetY);
        }
        if (vLeft < gLeftMax) {
            offsetX = gLeftMax - vLeft;
            allSprites.forEach(sprite => sprite.x += offsetX);
        }
        if (vRight > gRightMax) {
            offsetX = gRightMax - vRight;
            allSprites.forEach(sprite => sprite.x += offsetX);
        }
        if (vUp < gUpMax) {
            offsetY = gUpMax - vUp;
            allSprites.forEach(sprite => sprite.y += offsetY);
        }
        // ベースからの端の位置を保存
        baseSprite._edgeDown = maxDown;
        baseSprite._edgeLeft = -maxLeft;
        baseSprite._edgeRight = maxRight;
        baseSprite._edgeUp = -maxUp;
        return { vDown:vDown, vLeft:vLeft, vRight:vRight, vUp:vUp, offsetX:offsetX, offsetY:offsetY }
    };
    
    
    //- スキンの形成
    function createSkin(x, y, textW, textH, style) {
        if (!style["スキン"]) { return {}; }
        const skin = style["スキン"];
        if (!skin["画像"]) { return {}; }
        const textRateX = skin["テキスト比率X"];
        const textRateY = skin["テキスト比率Y"];
        // ビットマップ形成
        const bitmap = ImageManager.loadPicture(skin["画像"]);
        if (!bitmap) { return { sprite:null }; }
        // スプライト形成 & チルド
        const sprite = new SpriteKeMglv(bitmap);
        // アンカー
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        // 拡大率
        sprite.scale.x = skin["拡大X"];
        sprite.scale.y = skin["拡大Y"];
        // 不透明度
        sprite.opacity = skin["不透明度"];
        // カラートーン
        sprite.setColorTone(skin["カラートーン"]);
        // 位置
        sprite.x = x + skin["位置X"];
        sprite.y = y + skin["位置Y"];
        // テキストサイズに合わせる
        bitmap.addLoadListener(function() {
            if (textRateX) {
                const width = textW * textRateX;
                sprite.scale.x = width / bitmap.width;
                sprite._oriScaleX = sprite.scale.x;
            }
            if (textRateY) {
                const height = textH * textRateY;
                sprite.scale.y = height / bitmap.height;
                sprite._oriScaleY = sprite.scale.y;
            }
        }.bind(this));
        return { sprite:sprite };
    };
    
    
    
    
    //--  テキストスプライト /ベーシック  --//
    
    
    //- テキストスプライトの形成
    function createTextSprite(text, x, y,  textStyle, fontData = {}, handler) {
        if  (!text) { return { sprite:new SpriteKeMglv(), lines:{ x:[0], y:[0], w:[0], h:[0] } }; }
        const oriText = text;
        let lineX = 0;
        let lineY = 0;
        let charW = 0;
        let charH = 0;
        let offY = 0;
        let lineW = 0;
        let lineH = 0;
        let lines = { x:[0], y:[0], w:[0], h:[0] }
        let textMaxW = 0;
        let textTotalH = 0;
        let diffX = 0;
        let char = "";
        let scan = [];
        let i = 0;
        // フォントイニット
        const oriFonts = {};
        const align = textStyle["揃え"];
        let fontSize = fontData.size || textStyle["フォントサイズ"];
        oriFonts.size = Number(fontSize);
        let preFontSize = 0;
        oriFonts.bold = fontData.bold || textStyle["フォントボールド"];
        oriFonts.italic = fontData.italic || textStyle["フォントイタリック"];
        oriFonts.color = fontData.color || textStyle["カラー"];
        oriFonts.outColor = fontData.outColor || textStyle["縁取りカラー"];
        oriFonts.outH = fontData.outH || textStyle["縁取り幅"];
        let outH = textStyle["縁取り幅"];
        // 位置情報をスキャン
        while (text) {
            // 改行
            if (text.startsWith("\\n") || text.startsWith("\n")) {
                text = text.startsWith("\\n") ? text.slice(2) : text.slice(1);
                textMaxW = Math.max(lines.w[i], textMaxW);
                textTotalH += lines.h[i];
                i++;
                lines.y[i] = textTotalH;
            // 制御文字の読み取り
            } else if (text[0] == "\\") {
                preFontSize = fontSize;
                scan = scanControlChar(text, fontSize, oriFonts);
                text = scan.text;
                fontSize = scan.fontSize;
            // 1文字ずつ描画 
            } else {
                char = text[0];
                text = text.slice(1);
                charW = strWidth(char, fontSize);
                charH = fontSize + outH;
                if (!lines.w[i]) { lines.w[i] = 0; }
                if (!lines.h[i]) { lines.h[i] = 0; }
                lines.w[i] += charW;
                lines.h[i] = Math.max(charH, lines.h[i]);
            }
        }
        // 最後の行のサイズを加算
        if (lines.w[i]) { textMaxW = Math.max(lines.w[i], textMaxW); }
        if (lines.h[i]) { textTotalH += lines.h[i]; }
        // 最大ワイドに縁取り幅追加
        textMaxW += outH;
        // ラインXの取得
        lines.w.forEach((w, i) => {
            diffX = textMaxW - w;
            lines.x[i] = align == "left" ? 0 : align == "center" ? diffX / 2 : diffX;
        }, this);
        // テキストスプライト形成
        const textSprite = new Sprite_Clickable(handler);
        // 有効でないなら非表示
        if (textStyle["可"] != null && !textStyle["可"]) { textSprite.visible = false; }
        // アンカー
        textSprite.anchor.x = 0.5;
        textSprite.anchor.y = 0.5;
        // スタイル格納
        textSprite._styleKe = textStyle;
        // テキストビットマップ形成
        const textBitmap = new Bitmap(textMaxW, textTotalH);
        textSprite.bitmap = textBitmap;
        // フォントスタイルのセット
        setFontStyle(textBitmap, textStyle, fontData);
        // テキスト描画
        text = oriText;
        fontSize = oriFonts.size;
        i = 0;
        lineX = lines.x[i];
        lineY = lines.y[i];
        while (text) {
            // 改行
            if (text.startsWith("\\n") || text.startsWith("\n")) {
                text = text.startsWith("\\n") ? text.slice(2) : text.slice(1);
                i++;
                diffX = textMaxW - lines.w[i];
                lineX = lines.x[i];
                lineY = lines.y[i];
            // 制御文字の読み取り
            } else if (text[0] == "\\") {
                scan = scanControlChar(text, fontSize, oriFonts, textBitmap);
                text = scan.text;
                fontSize = scan.fontSize;
            // 1文字ずつ描画 
            } else {
                char = text[0];
                text = text.slice(1);
                charW = strWidth(char, fontSize);
                charH = fontSize + outH;
                offY = charH < lines.h[i] ? (lines.h[i] - charH) / 2 : 0
                textBitmap.drawText(char, lineX, lineY + offY, charW, charH);
                lineX += charW;
            }
        }
        // 位置設定
        textSprite.x = x;
        textSprite.y = y;
        lines.x = lines.x.map(x => x + textSprite.x - textMaxW / 2);
        lines.y = lines.y.map(y => y + textSprite.y - textTotalH / 2 + lines.h[0] / 2);
        // フォントスタイル取得
        fontData = getFontStyle(textBitmap);
        return { sprite:textSprite, width:textMaxW, height:textTotalH, lines:lines, fontData:fontData };
    };
    
    
    //フォントスタイルのセット
    function setFontStyle(bitmap, style, fontData = {}) {
        bitmap.fontFace = $gameSystem.mainFontFace();
        bitmap.fontSize = fontData.size || style["フォントサイズ"];
        bitmap.fontBold = fontData.bold || style["フォントボールド"];
        bitmap.fontItalic = fontData.italic || style["フォントイタリック"];
        bitmap.textColor = fontData.color || style["カラー"];
        bitmap.outlineColor =  fontData.outColor || style["縁取りカラー"];
        bitmap.outlineWidth =  fontData.outH || style["縁取り幅"];
    };
    
    
    //フォントスタイルの取得
    function getFontStyle(bitmap) {
        const fontData = {};
        fontData.size = bitmap.fontSize;
        fontData.bold = bitmap.fontBold;
        fontData.italic = bitmap.fontItalic;
        fontData.color = bitmap.textColor;
        fontData.outColor = bitmap.outlineColor;
        fontData.outH = bitmap.outlineWidth;
        return fontData;
    };
    
    
    //- 制御文字の読み取り
    function scanControlChar(text, fontSize, oriFonts, bitmap = null) {
        let matched = false;
        // テキストコモン
        match = text.match(/^[\x1b\\]c\[([^\]]*)\]/);
        if (match) {
            let common =  $gameSystem._textCommonKe ? $gameSystem._textCommonKe[match[1]] || "" : "";
            text = text.replace("\\c[" + match[1] + "]", common);
        }
        // フォントサイズ
        match = text.match(/^[\x1b\\]fs\[([^\]]*)\]/);
        if (match) {
            fontSize = !match[1] ? oriFonts.size : Number(match[1]);
            if (bitmap) { bitmap.fontSize = fontSize; }
            text = text.replace(match[0], "");
            matched = true;
        }
        // フォントボールド
        match = text.match(/^[\x1b\\]fb\[([^\]]*)\]/);
        if (match) {
            if (bitmap) { bitmap.fontBold = !match[1] ? oriFonts.bold : Number(match[1]) ? true : false; }
            text = text.replace(match[0], "");
            matched = true;
        }
        // フォントイタリック
        match = text.match(/^[\x1b\\]fi\[([^\]]*)\]/);
        if (match) {
            if (bitmap) { bitmap.fontItalic = !match[1] ? oriFonts.italic : Number(match[1]) ? true : false; }
            text = text.replace(match[0], "");
            matched = true;
        }
        // フォントカラー
        match = text.match(/^[\x1b\\]c\[([^\]]*)\]/);
        if (match) {
            if (bitmap) { bitmap.textColor = !match[1] ? oriFonts.color : strToColor(match[1]); }
            text = text.replace(match[0], "");
            matched = true;
        }
        // 縁取りカラー
        match = text.match(/^[\x1b\\]oc\[([^\]]*)\]/);
        if (match) {
            if (bitmap) { bitmap.outlineColor = !match[1] ? oriFonts.outColor : strToColor(match[1]); }
            text = text.replace(match[0], "");
            matched = true;
        }
        // 縁取り幅
        match = text.match(/^[\x1b\\]ow\[([^\]]*)\]/);
        if (match) {
            if (bitmap) { bitmap.outlineWidth = !match[1] ? oriFonts.outH : Number(match[1]); }
            text = text.replace(match[0], "");
            matched = true;
        }
        // マッチしなかったら \ だけ消去
        if (!matched) { text = text.replace(/^[\x1b\\]/, ""); }
        return { text:text, fontSize:fontSize };
    };
    
    
    //- 文字列をカラーへ
    function strToColor(str) {
        const strs = str.replace(/\s/g, "").split(",");
        const c = [0, 0, 0, 0].map((v, i) => strs[i] ? strs : i == 3 ? 1 : 0);
        return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${c[3]})`
    };
    
    
    
    
    //--  ベーススプライト /ベーシック  --//
    
    
    //- ベーススプライトの形成
    function createBaseSprite(x, y, width, height, baseStyle, cfgs = {}, handler, iconW) {
        const form = baseStyle["フォーム"];
        const marginX = baseStyle["余白X"];
        const marginY = baseStyle["余白Y"];
        const opacity = baseStyle["不透明度"];
        const color = baseStyle["カラー"];
        const outColor =  baseStyle["縁取りカラー"];
        const outH = baseStyle["縁取り幅"];
        const shape = baseStyle["変形"];
        // ベーススプライト形成
        const baseSprite = new Sprite_Clickable(handler);
        // 有効でないなら非表示
        if (baseStyle["可"] != null && !baseStyle["可"]) { baseSprite.visible = false; }
        // アンカー
        baseSprite.anchor.x = 0.5;
        baseSprite.anchor.y = 0.5;
        // 不透明度
        baseSprite.opacity = opacity != null ? opacity : 255;
        // スタイル保存
        baseSprite._styleKe = baseStyle;
        // 幅データ
        let baseW = width + marginX * 2;
        let baseH = height+ marginY * 2;
        // ギザギザ時のベース拡大
        if (form == "ギザギザ" && !cfgs.isFace) {
            baseW = (width > 800 ? width + 160 : width * 1.2) + marginX * 2;
            baseH = (height > 280 ? height + 160 : height * 1.6) + marginY * 2;
        }
        // ベースビットマップ形成
        const baseBitmap = new Bitmap(baseW + outH * 2, baseH + outH * 2);
        baseSprite.bitmap = baseBitmap;
        // スタイルに応じたビットマップ描画
        const tsunoAppo = drawBitmapByStyle(baseBitmap, outH / 2, outH / 2, baseW + outH, baseH + outH, baseStyle, cfgs.rel);
        // X座標
        baseSprite.x = x - iconW / 2;
        // Y座標
        baseSprite.y = y;
        // ツノが必要なら形成
        const tsuno = baseStyle["吹き出しツノ"] ;
        let tsunoSprite = null;
        let tsunoW = 0;
        let tsunoH = 0;
        let tsunoOy = 0;
        if (tsuno) {
            // スプライト形成
            tsunoSprite = new SpriteKeMglv();
            tsunoSprite.anchor.x = 0.5;
            tsunoSprite.anchor.y = 0.5;
            // ビットマップ形成
            const shut = form != "スクエア";
            const tsunoPlus = shut ? 1.25 : 1;
            tsunoW = tsuno + outH;
            tsunoH = tsuno + outH;
            const tsunoBitmap = new Bitmap(tsunoW + outH, tsunoH + outH);
            fillTsuno(tsunoBitmap, outH / 2, outH / 2, tsunoW, tsunoH * tsunoPlus, color, shut);
            strokeTsuno(tsunoBitmap, outH / 2, outH / 2, tsunoW, tsunoH * tsunoPlus, outColor, outH, shut);
            tsunoSprite.bitmap = tsunoBitmap;
            // 位置設定
            tsunoSprite.x = baseSprite.x;
            if (cfgs.rel == "up") {
                tsunoOy = -tsunoBitmap.height;
                tsunoSprite.y = baseSprite.y + baseBitmap.height / 2 + tsunoBitmap.height / 2 - outH;
            } else if (cfgs.rel == "down") {
                tsunoOy = tsunoBitmap.height;
                tsunoSprite.y = baseSprite.y - baseBitmap.height / 2 - tsunoBitmap.height / 2 + outH;
                tsunoSprite.scale.y *= -1;
            }
            // ツノフラグ
            tsunoSprite._isTsuno = true;
        }
        return { sprite:baseSprite, width:baseW, height:baseH, tsunoSprite:tsunoSprite, tsunoOy:tsunoOy, tsunoW:tsunoW, tsunoAppo:tsunoAppo };
    };
    
    
    //- スタイルに応じたビットマップ描画
    function drawBitmapByStyle(bitmap, x, y, width, height, style, rel = null) {
        // イニット
        const form = style["フォーム"];
        const color = style["カラー"];
        const outColor = style["縁取りカラー"];
        const outH = style["縁取り幅"];
        const shape = style["変形"];
        const tsuno = { o:0, w:style["吹き出しツノ"] };
        let tsunoAppo = null;
        // フォームごとの描画
        if (form == "スクエア") {
            fillSquare(bitmap, x, y, width, height, color, shape);
            if (outH) {
                if (tsuno.w) {
                    tsunoAppo = { form:form, bitmap:bitmap, x:x, y:y, width:width, height:height, outColor:outColor, outH:outH, shape:shape, tsuno:tsuno, rel:rel }
                } else {
                    strokeSquare(bitmap, x, y, width, height, outColor, outH, shape, "", tsuno, rel);
                }
            }
        } else if (form == "横アーモンド") {
            fillAlmond(bitmap, x, y, width, height, color, "x");
            if (outH) { strokeAlmond(bitmap, x, y, width, height, outColor, outH, "x"); }
        } else if (form == "縦アーモンド") {
            fillAlmond(bitmap, x, y, width, height, color, "y");
            if (outH) { strokeAlmond(bitmap, x, y, width, height, outColor, outH, "y"); }
        } else if (form == "ダイヤ") {
            fillDiya(bitmap, x, y, width, height, color, shape);
            if (outH) { strokeDiya(bitmap, x, y, width, height, outColor, outH, shape); }
        } else if (form == "ギザギザ") {
            gizaOuts = [];
            fillGiza(bitmap, x, y, width, height, color, shape);
            if (outH) { strokeGiza(bitmap, x, y, width, height, outColor, outH, shape); }
        }
        return tsunoAppo;
    };
    
    
    //- スタイルに応じたビットマップ切り取り
    function cutBitmapByStyle(bitmap, x, y, width, height, style) {
        // イニット
        const form = style["フォーム"];
        const shape = style["変形"];
        // フォームごとの描画
        if (form == "スクエア") {
            designSquare(bitmap, x, y, width, height, shape);
        } else if (form == "横アーモンド") {
            designAlmond(bitmap, x, y, width, height, "x");
        } else if (form == "縦アーモンド") {
            designAlmond(bitmap, x, y, width, height, "y");
        } else if (form == "ダイヤ") {
            designDiya(bitmap, x, y, width, height, shape);
        } else if (form == "ギザギザ") {
            designGiza(bitmap, x, y, width, height, shape);
        }
        bitmap.context.clip();
    };
    
    
    
    
    //--  アイコンスプライト /ベーシック  --//
    
    
    //- アイコンスプライトの形成
    function createIconSprite(iconIndex, anchorX = 0.5, anchorY = 0.5) {
        const sprite = new SpriteKeMglv();
        sprite.anchor.x = anchorX;
        sprite.anchor.y = anchorY;
        const bitmap = ImageManager.loadSystem("IconSet");
        sprite.bitmap = bitmap;
        const pw = ImageManager.iconWidth;
        const ph = ImageManager.iconHeight;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;
        sprite.setFrame(sx, sy, pw, ph);
        return sprite;
    };
    
    
    
    
    
    //--  図形描画 /ベーシック  --//
    
    
     // スクエアの塗り潰し
    function fillSquare(bitmap, x, y, width, height, color = "rgba(0,0,0,1)",  round = 0, corner = "") {
        const context = bitmap.context;
        context.save();
        context.fillStyle = color;
        designSquare(bitmap, x, y, width, height,  round, corner);
        context.fill();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- スクエアの線画
    function strokeSquare(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", lineW = 1,  round = 0, corner = "", tsuno = {}, rel = "") {
        const context = bitmap.context;
        context.strokeStyle = color;
        context.lineWidth = lineW;
        designSquare(bitmap, x, y, width, height,  round, corner, tsuno, rel, lineW);
        context.stroke();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- スクエアのデザイン
    function designSquare(bitmap, x, y, width, height,  round = 0, corner = "", tsuno = {}, rel = "", lineW = 0) {
        const context = bitmap.context;
        context.beginPath();
        const c1 = corner.includes("1") ? 0 : round;    // 左上
        const c2 = corner.includes("2") ? 0 : round;    // 左下
        const c3 = corner.includes("3") ? 0 : round;    // 右上
        const c4 = corner.includes("4") ? 0 : round;    // 右下
        context.moveTo(x +  c1, y);
        if (tsuno.w && rel == "down") {
            context.lineTo(x + width / 2 + tsuno.o - tsuno.w / 2, y);
            context.moveTo(x + width / 2 + tsuno.o + tsuno.w / 2, y);
        }
        context.lineTo(x + width -  c3, y);
        context.quadraticCurveTo(x + width, y, x + width, y +  c3);
        context.lineTo(x + width, y + height -  c4);
        context.quadraticCurveTo(x + width, y + height, x + width -  c4, y + height);
        if (tsuno.w && rel == "up") {
            context.lineTo(x + width / 2 + tsuno.o + tsuno.w / 2, y + height);
            context.moveTo(x + width / 2 + tsuno.o - tsuno.w / 2, y + height);
        }
        context.lineTo(x +  c2, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height -  c2);
        context.lineTo(x, y + c1);
        if (c1) {
            context.quadraticCurveTo(x, y, x + c1, y);
        } else {
            context.lineTo(x, y - lineW / 2);
        }
    };
    
    
    //- アーモンドの塗り潰し
    function fillAlmond(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", way = "x") {
        const context = bitmap.context;
        context.save();
        context.fillStyle = color;
        designAlmond(bitmap, x, y, width, height, way);
        context.fill();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- アーモンドの線画
    function strokeAlmond(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", lineW = 1, way = "x") {
        const context = bitmap.context;
        context.strokeStyle = color;
        context.lineWidth = lineW;
        designAlmond(bitmap, x, y, width, height, way);
        context.stroke();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- アーモンドのデザイン
    function designAlmond(bitmap, x, y, width, height, way = "x") {
        const context = bitmap.context;
        context.beginPath();
        if (way == "x") {
            context.moveTo(x, y + height / 2);
            context.quadraticCurveTo(x + width / 2, y - height / 2, x + width, y + height / 2);
            context.quadraticCurveTo(x + width / 2, y + height * 1.5, x , y + height / 2);
        } else if (way == "y") {
            context.moveTo(x + width / 2, y);
            context.quadraticCurveTo(x - width / 2, y + height / 2, x + width / 2, y + height);
            context.quadraticCurveTo(x + width * 1.5, y + height / 2, x + width / 2 , y);
        }
    };
    
    
    //- ギザギザの塗り潰し
    function fillGiza(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", shape = 1) {
        const context = bitmap.context;
        context.save();
        context.fillStyle = color;
        designGiza(bitmap, x, y, width, height, shape);
        context.fill();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- ギザギザの線画
    function strokeGiza(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", lineW = 1, shape = 1) {
        const context = bitmap.context;
        context.strokeStyle = color;
        context.lineWidth = lineW;
        designGiza(bitmap, x, y, width, height, shape);
        context.stroke();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- ギザギザのデザイン
    gizaXNum = null;
    gizaOuts = [];
    
    function designGiza(bitmap, x, y, width, height, shape = 1) {
        const context = bitmap.context;
        context.beginPath();
        const outs = gizaOuts;
        let rand = null;
        width -= x * 2;
        height -= y * 2;
        const xOut = Math.min(width / 9, 80);
        const yOut = Math.min(height / 6, 80);
        rand = gizaXNum ? gizaXNum : 50 + Math.randomInt(50);
        const xNum = Math.max(Math.floor((width - xOut * 2) / 100), 2);
        gizaXNum = rand;
        const yNum = Math.max(Math.floor((height - yOut * 2) / 50), 2);
        const r1 = 0.5;
        const r2 = 0.5;
        const xDiv = (width - xOut * 2) / xNum;
        const yDiv = (height - yOut * 2) / yNum;
        let nowX = x + xOut + xDiv / 2;
        let nowY = y + yOut;
        let newRandoms = [];
        context.moveTo(nowX, nowY);
        if (!shape) {
            // 上
            for (let i = 0; i < xNum - 1; i++) {
                rand = outs.length ? outs.shift() : yOut * r1 + Math.randomInt(yOut * r2);
                context.lineTo(nowX + xDiv / 2, nowY - rand);
                context.lineTo(nowX + xDiv, nowY);
                nowX += xDiv;
                newRandoms.push(rand);
            }
            // 右上
            context.lineTo(nowX + xDiv / 2 + xOut / 3, nowY - yOut / 3);
            context.lineTo(nowX + xDiv / 2, nowY + yDiv / 2);
            nowX += xDiv / 2;
            nowY += yDiv / 2;
            // 右
            for (let i = 0; i < yNum - 1; i++) {
                rand = outs.length ? outs.shift() : xOut * r1 + Math.randomInt(xOut * r2);
                context.lineTo(nowX + rand, nowY + yDiv / 2);
                context.lineTo(nowX, nowY + yDiv);
                nowY += yDiv;
                newRandoms.push(rand);
            }
            // 右下
            context.lineTo(nowX + xOut / 3, nowY + yDiv / 2 + yOut / 3);
            context.lineTo(nowX - xDiv / 2, nowY + yDiv / 2);
            nowX -= xDiv / 2;
            nowY += yDiv / 2;
            // 下
            for (let i = 0; i < xNum - 1; i++) {
                rand = outs.length ? outs.shift() : yOut * r1 + Math.randomInt(yOut * r2);
                context.lineTo(nowX - xDiv / 2, nowY + rand);
                context.lineTo(nowX - xDiv, nowY);
                nowX -= xDiv;
                newRandoms.push(rand);
            }
            // 左下
            context.lineTo(nowX - xDiv / 2 - xOut / 3, nowY + yOut / 3);
            context.lineTo(nowX - xDiv / 2, nowY - yDiv / 2);
            nowX -= xDiv / 2;
            nowY -= yDiv / 2;
            // 左
            for (let i = 0; i < yNum - 1; i++) {
                rand = outs.length ? outs.shift() : xOut * r1 + Math.randomInt(xOut * r2);
                context.lineTo(nowX - rand, nowY - yDiv / 2);
                context.lineTo(nowX, nowY - yDiv);
                nowY -= yDiv;
                newRandoms.push(rand);
            }
            // 左上
            context.lineTo(nowX - xOut / 3, nowY - yDiv / 2 - yOut / 3);
            context.lineTo(nowX + xDiv / 2, nowY - yDiv / 2);
            nowX += xDiv / 2;
            nowY -= yDiv / 2;
            gizaOuts = newRandoms;
            return
        }
        // 上
        for (let i = 0; i < xNum - 1; i++) {
            rand = outs.length ? outs.shift() : yOut / 2 + Math.randomInt(yOut / 2);
            context.quadraticCurveTo(nowX + xDiv / 2, nowY - yOut, nowX + xDiv / 2, nowY - rand);
            context.quadraticCurveTo(nowX + xDiv / 2, nowY, nowX + xDiv, nowY);
            nowX += xDiv;
        }
        // 右上
        context.quadraticCurveTo(nowX + xOut / 2, nowY + yDiv / 2 - yOut / 2, nowX + xDiv / 2 + xOut / 3, nowY - yOut / 3);
        context.quadraticCurveTo(nowX + xDiv / 2, nowY + yDiv / 2, nowX + xDiv / 2, nowY + yDiv / 2);
        nowX += xDiv / 2;
        nowY += yDiv / 2;
        // 右
        for (let i = 0; i < yNum - 1; i++) {
            rand = outs.length ? outs.shift() : xOut / 2 + Math.randomInt(xOut / 2);
            context.quadraticCurveTo(nowX + rand, nowY + yDiv / 2, nowX + xOut, nowY + yDiv / 2);
            context.quadraticCurveTo(nowX, nowY + yDiv, nowX, nowY + yDiv);
            nowY += yDiv;
        }
        // 右下
        context.quadraticCurveTo(nowX + xOut / 2, nowY + yOut / 2, nowX + xOut / 3, nowY + yDiv / 2 + yOut / 3);
        context.quadraticCurveTo(nowX, nowY + yDiv / 2, nowX - xDiv / 2, nowY + yDiv / 2);
        nowX -= xDiv / 2;
        nowY += yDiv / 2;
        // 下
        for (let i = 0; i < xNum - 1; i++) {
            rand = outs.length ? outs.shift() : yOut / 2 + Math.randomInt(yOut / 2);
            context.quadraticCurveTo(nowX - xDiv / 2, nowY + yOut, nowX - xDiv / 2, nowY + rand);
            context.quadraticCurveTo(nowX - xDiv / 2, nowY, nowX - xDiv, nowY);
            nowX -= xDiv;
        }
        // 左下
        context.quadraticCurveTo(nowX - xOut / 2, nowY - yDiv / 2 + yOut / 2, nowX - xDiv / 2 - xOut / 3, nowY + yOut / 3);
        context.quadraticCurveTo(nowX - xDiv / 2, nowY - yDiv / 2, nowX - xDiv / 2, nowY - yDiv / 2);
        nowX -= xDiv / 2;
        nowY -= yDiv / 2;
        // 左
        for (let i = 0; i < yNum - 1; i++) {
            rand = outs.length ? outs.shift() : xOut / 2 + Math.randomInt(xOut / 2);
            context.quadraticCurveTo(nowX - xOut, nowY - yDiv / 2, nowX - rand, nowY - yDiv / 2);
            context.quadraticCurveTo(nowX, nowY - yDiv, nowX, nowY - yDiv);
            nowY -= yDiv;
        }
        // 左上
        context.quadraticCurveTo(nowX - xOut / 2, nowY - yOut / 2, nowX - xOut / 3, nowY - yDiv / 2 - yOut / 3);
        context.quadraticCurveTo(nowX, nowY - yDiv / 2, nowX + xDiv / 2, nowY - yDiv / 2);
        nowX += xDiv / 2;
        nowY -= yDiv / 2;
        gizaOuts = newRandoms;
    };
    
    
    //- ダイヤの塗り潰し
    function fillDiya(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", round = 0, corner = "") {
        const context = bitmap.context;
        context.save();
        context.fillStyle = color;
        designDiya(bitmap, x, y, width, height, round, corner);
        context.fill();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- ダイヤの線画
    function strokeDiya(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", lineW = 1, round = 0, corner = "") {
        const context = bitmap.context;
        context.strokeStyle = color;
        context.lineWidth = lineW;
        designDiya(bitmap, x, y, width, height, round, corner);
        context.stroke();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- ダイヤのデザイン
    function designDiya(bitmap, x, y, width, height, round = 0, corner = "") {
        const context = bitmap.context;
        context.beginPath();
        const c1 = corner.includes("1");    // 左上
        const c2 = corner.includes("2");    // 左下
        const c3 = corner.includes("3");    // 右上
        const c4 = corner.includes("4");    // 右下
        if (c1) {
            context.moveTo(x, y);
            context.lineTo(x + width / 2, y);
        } else {
            context.moveTo(x + width / 2, y);
        }
        if (c3) {
            context.lineTo(x + width, y);
            context.lineTo(x + width, y + height / 2);
        } else {
            context.quadraticCurveTo(x + width * 3/4 + round, y + height * 1/4 - round, x + width, y + height / 2);
        }
        if (c4) {
            context.lineTo(x + width, y + height);
            context.lineTo(x + width / 2, y + height);
        } else {
            context.quadraticCurveTo(x + width * 3/4 + round, y + height * 3/4 + round, x + width / 2, y + height);
        }
        if (c2) {
            context.lineTo(x, y + height);
            context.lineTo(x, y + height / 2);
        } else {
            context.quadraticCurveTo(x + width * 1/4 - round, y + height * 3/4 + round, x, y + height / 2);
        }
        if (c1) {
            context.lineTo(x, y);
        } else {
            context.quadraticCurveTo(x + width * 1/4 - round, y + height * 1/4 - round, x + width / 2, y);
        }
    };
    
    
    //- ツノの塗り潰し
    function fillTsuno(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", shut) {
        const context = bitmap.context;
        context.save();
        context.fillStyle = color;
        designTsuno(bitmap, x, y, width, height, shut);
        context.fill();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- ツノの線画
    function strokeTsuno(bitmap, x, y, width, height, color = "rgba(0,0,0,1)", lineW = 1, shut) {
        const context = bitmap.context;
        context.strokeStyle = color;
        context.lineWidth = lineW;
        designTsuno(bitmap, x, y, width, height, lineW, shut);
        context.stroke();
        context.restore();
        bitmap._baseTexture.update();
    };
    
    
    //- ツノのデザイン
    function designTsuno(bitmap, x, y, width, height, lineW = 0, shut) {
        const context = bitmap.context;
        context.beginPath();
        context.moveTo(x, y);
        context.quadraticCurveTo(x + width * 3/4 - lineW, y + height / 2, x + width / 2, y + height);
        context.quadraticCurveTo(x + width * 3/4 + lineW, y + height / 2, x + width, y);
        if (shut) { context.lineTo(x, y); }
    };
    
})();