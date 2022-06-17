
//=============================================================================
//  Keke_VignetteEffect - ビネットエフェクト
// バージョン: 2.7.5
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ビネット画像を生成・操作
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 * @help
 * 【ver.2.7.5】
 * 中抜き画像を生成し表示するビネットエフェクト
 * + ビネットを滑らかに変化させるアイリスエフェクト
 *
 *
 *
 * ◉特徴 ◉
 * 
 * ■ビネットエフェクト
 * ◎色・大きさ・形など自由に設定できる
 * ◎アニメーションをさせられる
 * ◎特定のキャラを自動追尾させられる
 * ◎画像を用意しなくても使える
 * ◎好きな画像を使うこともできる
 * ◎マップ・バトル両用
 *
 * ■アイリスエフェクト
 * ◎ビネットを滑らかに形状変化させられる
 * ◎画面を色々な形で閉じたり広げたりできる
 * ◎トランジションにもなる
 * 
 *
 *
 * ◉使い方 ◉
 * 
 *
 * ■【基本1】ビネットを表示する
 * => プラグインコマンド → ビネット表示
 * ◎特定の図形で中抜きにした画像を生成し表示する
 * ◎ビネットは同時に何個でも表示できる
 * ◎名前を設定しなくても表示できるが、
 * 　設定しておいた方がアイリスエフェクト等で対象ビネットを指定しやすい
 * ◎『ピクチャ使用』で好きな画像を使える。使わなければ無地画像になる
 * 　あらかじめ プラグインパラメータ → ピクチャ登録 で
 * 　ピクチャを登録しておく必要がある
 * ◎『ビネット持ち越し』を true にするとシーン移動しても消えなくなる
 * 　消す時はプラグインコマンド『ビネット削除』を使って手動で
 *
 *
 * ■【基本2】アイリスエフェクトを開始する
 * => プラグインコマンド → アイリスエフェクト
 * ◎ビネットを滑らかに形状変化させていくエフェクト
 * ◎あらかじめビネットを表示しておく必要がある
 * ◎対象ビネットを指定して実行する。ビネット名を設定しておくと指定しやすい
 * ◎変化させたい項目だけ入力する。その他は空欄のままでよい
 * 　内枠-半径Xを 0 にすれば、半径Xが 0 に向かって変化していく
 * ◎アイリスエフェクトは一度にひとつしか実行できない
 * 　複数設定するとひとつずつ順番に実行される
 * ◎『アニメ枚数』で動きの滑らかさを調整できる
 * 　枚数が多いほど滑らかだが重い。15枚以下を推奨
 *
 *
 * ■【基本3】ビネットを移動・拡縮・回転させる
 * => プラグインコマンド → ビネット操作
 * ◎ビネットを自在に操作できる
 * ◎あらかじめビネットを表示しておく必要がある
* ◎対象ビネットを指定して実行する。ビネット名を設定しておくと指定しやすい
 * ◎変化させたい項目だけ入力する。その他は空欄のままでよい
 * 　ずらしXを 0 にすれば、ずらしXが 0 に向かって変化していく 
 *
 *
 * ■【基本4】ビネットの設定を変更する
 * => プラグインコマンド → ビネット設定変更
 * ◎ビネットの各種設定を変更できる
 * ◎あらかじめビネットを表示しておく必要がある
*  ◎対象ビネットを指定して実行する。ビネット名を設定しておくと指定しやすい
 * ◎変化させたい項目だけ入力する。その他は空欄のままでよい
 * 
 *
 * ■【基本5】ビネットを削除する
 * => プラグインコマンド → ビネット削除
 * ◎全て消すか、指定のビネットだけを消すか
 * 　ビネット名を設定しておくと指定しやすい
 *
 *
 * ■【応用1】ビネットコモン/アイリスコモン
 * ◎あらかじめコモンを登録しておき、
 * 　ビネット表示とアイリスコモンを手軽に実行できる
 * [1] プラグインパラメータ → コモン登録　でコモンを登録
 * [2] プラグインコマンド → ビネットコモン/アイリスコモン で実行
 * ◎実行する際は、『呼び出すコモン』の欄に登録したコモン名を書く
 * ◎コモンはパラパラアニメのような画像の連続体になっている
 * 　そのうちの1枚を抜き出すのがビネットコモン
 * 　連続して再生するのがアイリスコモン
 * ◎ビネットコモン『取得ポイント』で、どの位置の画像を取得するか選べる
 * ◎アイリスコモン『開始ポイント』『終了ポイント』で、
 * 　どの位置から再生を開始し、終了するか設定できる。逆再生も可能
 *
 *
 * ■【応用2】ビネットを懐中電灯にする
 * 【1】プラグインコマンド → ビネット作成
 * 【2】内装-フォーム を 『真円』(楕円でもよい)
 * 【3】フォーム設定 → 円形-扇型化 を 『60, 120』 (一例。数値は自由でよい)
 * 【4】追尾設定 → 対象キャラ-名前 を『プレイヤー』
 * 　　 向きによる回転 を『true』
 *
 *
 * ★【補足】開始時に適用
 * ◎プラグインコマンドの『開始時に適用』を true にすると、
 * 　シーン開始時に自動的に実行される
 * ◎イベントを自動実行する必要はない
* 　自動実行すると2回実行されてしまうので注意
 * ◎イベントの有効なページに置く必要がある
 * 　バトルの場合はバトルイベントの1ページ目
 * ◎自動実行よりも実行が早いのが特徴
 * 　開始後ただちに適用したい処理に
 *
 *
 *
 * ◉利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 * @param ピクチャ登録
 * @desc ビネット画像として使用するピクチャを登録する
 * @type struct<picture>[]
 * @default
 *
 * @param コモン登録
 * @desc ビネットのコモンを登録する。パラパラアニメのような複数の画像で構成される
 * @type struct<vignetteCommon>[]
 * @default
 *
 *
 *
 * @command ビネット表示
 * @desc ビネットを表示する
 * 
 * @arg タグ
 * @desc 何を書いてもいい欄
 *
 * @arg ビネット名
 * @desc ビネットに付ける名前。アイリスエフェクト・ビネット消去で対象ビネットを指定するのに使う
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
 * @arg レイヤー
 * @desc 配置レイヤー。A はキャラの下、B はキャラの上、Cはウインドウの下、Dはウインドウの上。数字が大きいほど上に表示
 * @type select
 * @option レイヤーA1
 * @option レイヤーA2
 * @option レイヤーA3
 * @option レイヤーB1
 * @option レイヤーB2
 * @option レイヤーB3
 * @option レイヤーC1
 * @option レイヤーC2
 * @option レイヤーC3
 * @option レイヤーD1
 * @option レイヤーD2
 * @option レイヤーD3
 * @default レイヤーC1
 *
 * @arg …挿入位置
 * @desc 既存のビネットの上に表示するか、下に表示するか
 * @type select
 * @option 上
 * @option 下
 * @default 上
 *
 * @arg フェードイン時間
 * @desc ビネットの出現フェード時間。5 なら 5フレーム、1s なら 1秒
 * @default 0
 *
 * @arg …動作中ウェイト
 * @desc フェードインが完了するまで待つ
 * @type boolean
 * @default false
 *
 * @arg ビネット持ち越し
 * @desc マップ移動・戦闘移行時にビネットを消さずに持ち越す
 * @type boolean
 * @default false
 * 
 * @arg 内枠-フォーム
 * @desc ビネット内枠の形状
 * @type select
 * @option スクエア
 * @option 真円
 * @option 楕円
 * @option 横アーモンド
 * @option 縦アーモンド
 * @option ダイヤ
 * @option ギザギザ
 * @option ギザギザ-滑らか
 * @option 上下帯
 * @option 左右帯
 * @option 上帯
 * @option 下帯
 * @option 左帯
 * @option 右帯
 * @option フリー
 * @default スクエア
 *
 * @arg …フォーム設定
 * @desc 各フォームの詳細な設定
 * @type struct<formCfg>
 *
 * @arg 内枠-半径X
 * @desc ビネット内枠の横半径。50 なら 画面横サイズの 50%
 * @default 45
 *
 * @arg 内枠-半径Y
 * @desc ビネット内枠の縦半径。50 なら 画面縦サイズの 50%
 * @default 45
 *
 * @arg ピクチャ使用
 * @desc ピクチャを使用する。プラグインパラメータでピクチャを登録→その名前を書く。\v[番号]で変数使用可能
 *
 * @arg カラー赤
 * @desc ビネットの赤み。0〜255
 * @default 0
 *
 * @arg カラー緑
 * @desc ビネットの緑み。0〜255
 * @default 0
 *
 * @arg カラー青
 * @desc ビネットの青み。0〜255
 * @default 0
 *
 * @arg ぼかし度
 * @desc ビネットのぼかしの強さ。0〜
 * @default 5
 *
 * @arg 不透明度
 * @desc ビネットの不透明度。0〜255
 * @default 255
 *
 * @arg ずらしX
 * @desc ビネットの横ずらし。5 なら右に 5ピクセル
 * @default 0
 *
 * @arg ずらしY
 * @desc ビネットの縦ずらし。5 なら下に 5ピクセル
 * @default 0
 *
 * @arg スケールX
 * @desc ビネットの横拡大率。1.5 なら 1.5倍
 * @default 1
 *
 * @arg スケールY
 * @desc ビネットを縦拡大率。1.5 なら 1.5倍
 * @default 1
 *
 * @arg 回転角
 * @desc ビネットを回転角。0〜360。90 で右に 90度、-90 で左に 90度
 * @default 0
 *
 * @arg アニメーション
 * @desc アニメーションの設定をする。拡縮アニメと明滅アニメ
 * @type struct<animation>
 * @default
 *
 * @arg 追尾設定
 * @desc 特定のキャラクターが常に中央に来るように追尾する。マップ時のみ
 * @type struct<chaseParam>
 * @default
 *
 *
 *
 * @command アイリスエフェクト
 * @desc ビネットを滑らかに形状変化させる
 *
 * @arg タグ
 * @desc 何を書いてもいい欄
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
 * @arg 対象ビネット-名前
 * @desc 名前で対象ビネットを指定する。名前は表示時に設定したもの。, で区切って複数指定できる
 *
 * @arg 対象ビネット-ID
 * @desc IDで対象ビネットを指定する。IDは下に表示されてるのから順に 1〜。, で区切って複数指定できる
 *
 * @arg 動作時間
 * @desc アイリスエフェクトの所用時間。5 なら 5フレーム、1s なら 1秒
 * @default 20
 *
 * @arg …アニメ枚数
 * @desc アイリスエフェクトに使う画像の枚数。多いほど変化が滑らかだが、読み込みに時間がかかる。15以下推奨
 * @default 10
 *
 * @arg …動作中ウェイト
 * @desc エフェクトが完了するまで待つ
 * @type boolean
 * @default false
 *
 * @arg 止めずに読み込み
 * @desc ゲームを止めずにデータを読み込む。止めないぶん少し読み込みが遅くなる
 * @type boolean
 * @default false
 *
 * @arg 実行後消去
 * @desc エフェクト実行後に自動的にビネットを消去する
 * @type boolean
 * @default false
 *
 * @arg イージング
 * @desc エフェクトに緩急をつける。イージング:遅→速→遅、イージングイン:遅→速、イージングアウト:速→遅
 * @type select
 * @option イージング無し
 * @option イージング
 * @option イージングイン
 * @option イージングアウト
 * @default イージング
 *
 * @arg 内枠-フォーム
 * @desc ビネット内枠の形状を変更する
 * @type select
 * @option スクエア
 * @option 真円
 * @option 楕円
 * @option 横アーモンド
 * @option 縦アーモンド
 * @option ダイヤ
 * @option ギザギザ
 * @option ギザギザ-滑らか
 * @option 上下帯
 * @option 左右帯
 * @option 上帯
 * @option 下帯
 * @option 左帯
 * @option 右帯
 * @option フリー
 *
 * @arg …フォーム設定
 * @desc 各形状に関する詳細な設定
 * @type struct<formCfg>
 *
 * @arg 内枠-半径X
 * @desc ビネットの内枠横半径を変える。50 なら 画面横サイズの 50% にする
 *
 * @arg 内枠-半径Y
 * @desc ビネットの内枠縦半径を変える。50 なら 画面縦サイズの 50% にする
 *
 * @arg カラー赤
 * @desc ビネットの赤みを変える。0〜255
 *
 * @arg カラー緑
 * @desc ビネットの緑みを変える。0〜255。
 *
 * @arg カラー青
 * @desc ビネットの青みを変える。0〜255
 *
 * @arg ぼかし度
 * @desc ビネットのぼかし度を変える。0〜
 *
 * @arg 不透明度
 * @desc ビネットの不透明度を変える。0〜255
 *
 * @arg ずらしX
 * @desc ビネットを横にずらす。5 なら右に 5ピクセル にする。即座に変わる
 *
 * @arg ずらしY
 * @desc ビネットを縦にずらす。5 なら下に 5ピクセル にする。即座に変わる
 *
 *
 *
 * @command ビネット操作
 * @desc ビネットを移動・拡大・回転させる
 *
 * @arg タグ
 * @desc 何を書いてもいい欄
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
 * @arg 対象ビネット-名前
 * @desc 名前で対象ビネットを指定する。名前は表示時に設定したもの。, で区切って複数指定できる
 *
 * @arg 対象ビネット-ID
 * @desc IDで対象ビネットを指定する。IDは下に表示されてるのから順に 1〜。, で区切って複数指定できる
 *
 * @arg 動作時間
 * @desc アイリスエフェクトの所用時間。5 なら 5フレーム、1s なら 1秒
 * @default 20
 *
 * @arg …動作中ウェイト
 * @desc エフェクトが完了するまで待つ
 * @type boolean
 * @default false
 *
 * @arg イージング
 * @desc エフェクトに緩急をつける。イージング:遅→速→遅、イージングアウト:速→遅、イージングイン:遅→速
 * @type select
 * @option イージング無し
 * @option イージング
 * @option イージングアウト
 * @option イージングイン
 * @default イージング
 *
 * @arg ずらしX
 * @desc ビネットを横にずらす。5 なら右に 5ピクセル にする
 *
 * @arg ずらしY
 * @desc ビネットを縦にずらす。5 なら下に 5ピクセル にする
 *
 * @arg スケールX
 * @desc ビネットを横に拡大する。1.5 なら 1.5倍 にする
 *
 * @arg スケールY
 * @desc ビネットを縦に拡大する。1.5 なら 1.5倍 にする
 *
 * @arg 回転角
 * @desc ビネットを回転させる。0〜360。90 で右に 90度、-90 で左に 90度 にする
 *
 *
 *
 * @command ビネット設定変更
 * @desc ビネットの追尾とアニメーションの設定を変更する
 *
 * @arg タグ
 * @desc 何を書いてもいい欄
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
 * @arg 対象ビネット-名前
 * @desc 名前で対象ビネットを指定する。名前は表示時に設定したもの。, で区切って複数指定できる
 *
 * @arg 対象ビネット-ID
 * @desc IDで対象ビネットを指定する。IDは下に表示されてるのから順に 1〜。, で区切って複数指定できる
 *
 * @arg ビネット持ち越し
 * @desc マップ移動・戦闘移行時にビネットを消さずに持ち越す
 * @type boolean
 * @default
 *
 * @arg アニメーション
 * @desc アニメーションの変更をする。拡縮アニメと明滅アニメ
 * @type struct<animation>
 * @default
 *
 * @arg 追尾設定
 * @desc 特定のキャラクターが常に中央に来るように追尾する。マップ時のみ
 * @type struct<chaseParam>
 * @default
 *
 *
 *
 * @command ビネットコモン
 * @desc ビネットコモンを呼び出す
 * 
 * @arg タグ
 * @desc 何を書いてもいい欄
 *
 * @arg ビネット名
 * @desc ビネットに付ける名前。アイリスエフェクト・ビネット消去で対象ビネットを指定するのに使う
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
 * @arg 呼び出すコモン
 * @desc 呼び出すコモン。プラグインパラメータ→ビネットコモン で登録し、そのコモン名を書く。\v[番号]で変数使用可能
 *
 * @arg …取得ポイント
 * @desc ビネットコモンのどの地点の画像を取得するか。50 なら 50%地点
 * @default 0
 * 
 * @arg レイヤー
 * @desc 配置レイヤー。A はキャラの下、B はキャラの上、Cはウインドウの下、Dはウインドウの上。数字が大きいほど上に表示
 * @type select
 * @option レイヤーA1
 * @option レイヤーA2
 * @option レイヤーA3
 * @option レイヤーB1
 * @option レイヤーB2
 * @option レイヤーB3
 * @option レイヤーC1
 * @option レイヤーC2
 * @option レイヤーC3
 * @option レイヤーD1
 * @option レイヤーD2
 * @option レイヤーD3
 * @default レイヤーC1
 *
 * @arg …挿入位置
 * @desc 既存のビネットの上に表示するか、下に表示するか
 * @type select
 * @option 上
 * @option 下
 * @default 上
 *
 * @arg フェードイン時間
 * @desc ビネットの出現フェード時間。5 なら 5フレーム、1s なら 1秒
 * @default 0
 *
 * @arg …動作中ウェイト
 * @desc フェードインが完了するまで待つ
 * @type boolean
 * @default false
 *
 * @arg ビネット持ち越し
 * @desc マップ移動・戦闘移行時にビネットを消さずに持ち越す
 * @type boolean
 * @default false
 *
 * @arg カラー赤
 * @desc ビネットの赤み。0〜255
 * @default 0
 *
 * @arg カラー緑
 * @desc ビネットの緑み。0〜255
 * @default 0
 *
 * @arg カラー青
 * @desc ビネットの青み。0〜255
 * @default 0
 *
 * @arg 不透明度
 * @desc ビネットの不透明度。0〜255
 * @default 255
 *
 * @arg ずらしX
 * @desc ビネットを横にずらす。5 なら右に 5ピクセル ずらす
 * @default 0
 *
 * @arg ずらしY
 * @desc ビネットを縦にずらす。5 なら下に 5ピクセル ずらす
 * @default 0
 *
 * @arg スケールX
 * @desc ビネットを横に拡大する。1.5 なら 1.5倍
 * @default 1
 *
 * @arg スケールY
 * @desc ビネットを縦に拡大する。1.5 なら 1.5倍
 * @default 1
 *
 * @arg 回転角
 * @desc ビネットを回転させる。0〜360。90 で右に 90度、-90 で左に 90度
 * @default 0
 *
 * @arg アニメーション
 * @desc アニメーションの設定をする。拡縮アニメと明滅アニメ
 * @type struct<animation>
 * @default
 *
 * @arg 追尾設定
 * @desc 特定のキャラクターが常に中央に来るように追尾する。マップ時のみ
 * @type struct<chaseParam>
 * @default
 *
 *
 *
 * @command アイリスコモン
 * @desc アイリスコモンを呼び出す
 * 
 * @arg タグ
 * @desc 何を書いてもいい欄
 *
 * @arg 開始時に適用
 * @desc シーン開始時に自動的に実行する
 * @type boolean
 * @default false
 *
 * @arg 対象ビネット-名前
 * @desc 名前で対象ビネットを指定する。名前は表示時に設定したもの。, で区切って複数指定できる
 *
 * @arg 対象ビネット-ID
 * @desc IDで対象ビネットを指定する。IDは下に表示されてるのから順に 1〜。, で区切って複数指定できる
 *
 * @arg 呼び出すコモン
 * @desc 呼び出すコモンの名前。プラグインパラメータ→ビネットコモン で登録し、そのコモン名を書く。\v[番号]で変数使用可能
 *
 * @arg …開始ポイント
 * @desc ビネットコモンの開始点。50 なら 50%地点 から開始
 * @default 0
 *
 * @arg …終了ポイント
 * @desc ビネットコモンの終了点。50 なら 50%地点で終了
 * @default 100
 *
 * @arg 動作時間
 * @desc アイリスエフェクトの所用時間。5 なら 5フレーム、1s なら 1秒
 * @default 20
 *
 * @arg …動作中ウェイト
 * @desc エフェクトが完了するまで待つ
 * @type boolean
 * @default false
 *
 * @arg 止めずに読み込み
 * @desc ゲームを止めずにデータを読み込む。止めないぶん少し読み込みが遅くなる
 * @type boolean
 * @default false
 *
 * @arg 実行後消去
 * @desc エフェクト実行後に自動的にビネットを消去する
 * @type boolean
 * @default false
 *
 * @arg カラー赤
 * @desc ビネットの赤みを変える。0〜255
 *
 * @arg カラー緑
 * @desc ビネットの緑みを変える。0〜255
 *
 * @arg カラー青
 * @desc ビネットの青みを変える。0〜255
 *
 * @arg 不透明度
 * @desc ビネットの不透明度を変える。0〜255
 *
 * @arg ずらしX
 * @desc ビネットを横にずらす。5 なら右に 5ピクセル にする。即座に変わる
 *
 * @arg ずらしY
 * @desc ビネットを縦にずらす。5 なら下に 5ピクセル にする。即座に変わる
 *
 *
 *
 * @command ビネット削除
 * @desc ビネットを削除する
 *
 * @arg タグ
 * @desc 何を書いてもいい欄
 *
 * @arg フェードアウト時間
 * @desc ビネットの消去フェード時間。5 なら 5フレーム、1s なら 1秒
 * @default 0
 *
 * @arg …動作中ウェイト
 * @desc フェードアウトが完了するまで待つ
 * @type boolean
 * @default false
 *
 * @arg 名前で削除
 * @desc ビネット名でビネットを選択し削除する, で区切って複数指定可能
 *
 * @arg IDで削除
 * @desc IDでビネットを選択し削除する。IDは下に表示されてるのから順に 1〜。, で区切って複数指定できる
 *
 * @arg すべて削除
 * @desc 全てのビネットを削除する
 * @type boolean
 * @default false
 */
 
 
 
/*~struct~vignetteCommon:
 * @param コモン名
 * @desc ビネットコモンの名前。コモン呼び出しに使う
 *
 * @param …アニメ枚数
 * @desc アイリスエフェクトに使う画像の枚数。多いほど変化が滑らかだが、読み込みに時間がかかる。10以下推奨
 * @default 10
 *
 * @param イージング
 * @desc エフェクトに緩急をつける。イージング:遅→速→遅、イージングアウト:速→遅、イージングイン:遅→速
 * @type select
 * @option イージング無し
 * @option イージング
 * @option イージングアウト
 * @option イージングイン
 * @default イージング
 *
 * @param 内枠-フォーム
 * @desc ビネット内枠の形状
 * @type select
 * @option スクエア
 * @option 真円
 * @option 楕円
 * @option 横アーモンド
 * @option 縦アーモンド
 * @option ダイヤ
 * @option ギザギザ
 * @option ギザギザ-滑らか
 * @option 上下帯
 * @option 左右帯
 * @option 上帯
 * @option 下帯
 * @option 左帯
 * @option 右帯
 * @option フリー
 * @default スクエア
 *
 * @param …フォーム設定
 * @desc 各形状に関する詳細な設定
 * @type struct<formCfg>
 *
 * @param 内枠-半径X
 * @desc ビネット内枠の横半径。50 なら 画面横サイズの 50%
 * @default 45
 *
 * @param 内枠-半径Y
 * @desc ビネット内枠の縦半径。50 なら 画面縦サイズの 50%
 * @default 45
 *
 * @param →内枠-半径X
 * @desc ビネットの内枠横半径を変える。50 なら 画面横サイズの 50% にする
 * @default 450
 *
 * @param →内枠-半径Y
 * @desc ビネットの内枠縦半径を変える。50 なら 画面縦サイズの 50% にする
 * @default 360
 *
 * @param ピクチャ使用
 * @desc ピクチャを使用する。プラグインパラメータでピクチャを登録→その名前を書く。\v[番号]で変数使用可能
 *
 * @param ぼかし度
 * @desc ビネットのぼかしの強さ。0〜
 * @default 5
 *
 * @param →ぼかし度
 * @desc ビネットぼかし度を変える。0〜
 * @default 5
 */
 
 
 
/*~struct~formCfg:
 * @param スクエア-線丸み
 * @desc スクエア形の直線を丸くする。5 なら 5ピクセル分 丸まる
 * @default 0
 *
 * @param スクエア-角丸み
 * @desc スクエア形の角を丸くする。5 なら 5ピクセル分 丸まる
 * @default 0
 *
 * @param 円形-扇型化
 * @desc 真円と楕円形を扇型にする。0, 90 なら 右から下、180, 270 なら左から上への扇型になる
 * @default 0, 0
 *
 * @param 楕円-回転角
 * @desc 楕円形を回転させる。0〜360。90 で右に 90度、-90 で左に 90度。通常の回転角と違い、内枠部分のみ回転する
 * @default 0
 *
 * @param ダイヤ-線丸み
 * @desc ダイヤ形の直線を丸くする。5 なら 5ピクセル 丸まる
 * @default 0
 *
 * @param ギザギザ-トゲ数X
 * @desc ギザギザ形の横方向のトゲの本数。1本〜
 * @type number
 * @min 1
 * @default 1
 *
 * @param ギザギザ-トゲ数Y
 * @desc ギザギザ形の縦方向のトゲの本数。1本〜。3 以上の奇数にすると電撃形になる
 * @type number
 * @min 1
 * @default 1
 *
 * @param ギザギザ-トゲ長さX
 * @desc ギザギザ形の横方向のトゲの長さ。50 なら 50ピクセル
 * @default 50
 *
 * @param ギザギザ-トゲ長さY
 * @desc ギザギザ形の縦方向のトゲの長さ。50 なら 50ピクセル
 * @default 50
 *
 * @param ギザギザ-トゲ長さ乱数
 * @desc ギザギザ形のトゲの長さのランダム幅。20 なら 80%〜120% の範囲で散らばる
 * @default 0
 *
 * @param 帯-線丸み
 * @desc 帯形の直線を丸くする。5 なら 5ピクセル分 丸まる
 * @default 0
 *
 * @param フリー作図
 * @desc 図形を構成する点を入力。X位置 は画面左端から 0〜100、Y位置は画面上端から 0〜100。x0 y50、x100 y50 は必ず通る点に注意
 * @type struct<freePos>[]
 * @default
 */
 
 
 
/*~struct~freePos:
 * @param X位置
 * @desc 点のX座標。画面横サイズに対する百分率。0 なら 画面左端、50 なら画面中央、100 なら画面右端
 *
 * @param Y位置
 * @desc 点のY位置。画面縦サイズに対する百分率。0 なら 画面上端、50 なら画面中央、100 なら画面下端
 */
 
 
 
/*~struct~animation:
 * @param 拡縮アニメ-動き
 * @desc 拡縮アニメの動き。ノーマルは →、ターンは →←、ラウンドは →←←→ という動き
 * @type select
 * @option 拡縮無し
 * @option ノーマル
 * @option ターン
 * @option ラウンド
 * @default 拡縮無し
 *
 * @param 拡縮アニメ-時間
 * @desc 拡縮アニメの一周時間。5 なら 5フレーム、1s なら 1秒
 * @default 120
 *
 * @param 拡縮アニメ-大きさ
 * @desc 拡縮アニメの動きの大きさ。0.5 なら元の大きさの 0.5倍
 * @default 0.1
 *
 * @param 明滅アニメ-動き
 * @desc 明滅アニメの動き。ノーマルは →、ターンは →←、ラウンドは →←←→ という動き
 * @type select
 * @option 明滅無し
 * @option ノーマル
 * @option ターン
 * @option ラウンド
 * @default 明滅無し
 *
 * @param 明滅アニメ-時間
 * @desc 明滅アニメの一周時間。5 なら 5フレーム、1s なら 1秒
 * @default 120
 *
 * @param 明滅アニメ-大きさ
 * @desc 明滅アニメの不透明度の変動量。50 なら 不透明度 50
 * @default -60
 *
 * @param 回転アニメ-動き
 * @desc 回転アニメの動き。ノーマルは →、ターンは →←、ラウンドは →←←→ という動き
 * @type select
 * @option 回転無し
 * @option ノーマル
 * @option ターン
 * @option ラウンド
 * @default 回転無し
 *
 * @param 回転アニメ-時間
 * @desc 回転アニメの一周時間。5 なら 5フレーム、1s なら 1秒
 * @default 480
 *
 * @param 回転アニメ-大きさ
 * @desc 回転アニメの回転量。50 なら右に 50度、-50 なら左に 50度
 * @default 360
 */
 
 
 
/*~struct~chaseParam:
* @param 対象キャラ-名前
* @desc 名前で追尾対象を選択。***→イベント検索、セルフ→イベント自身、プレイヤー→プレイヤー、全て→全キャラ。, で複数指定可
*
* @param 対象キャラ-ID
* @desc 追尾対象ID。1〜→イベントID。0→イベント自身、-1→プレイヤー、-2→全キャラ。 , で複数指定可、~ でまとめて指定可
*
* @param 向きによる回転
* @desc 追尾対象の向きに応じてビネットを回転させる。下向きが基準
* @type boolean
* @default 
*
* @param …回転時間
* @desc 回転にかける時間。5 なら 5フレーム、1s なら 1秒
* @default 20
*
* @param 追尾解除
* @desc 追尾をやめる
* @type boolean
* @default false
*/



/*~struct~picture:
 * @param ピクチャ名
 * @desc ピクチャに付ける名前。ピクチャ呼び出しに使う
 *
 * @param ファイル-ピクチャ
 * @desc ピクチャフォルダのファイル
 * @type file
 * @dir img/pictures
 *
 * @param ファイル-タイトル
 * @desc タイトルフォルダのファイル
 * @type file
 * @dir img/titles1
 *
  * @param ファイル-遠景
 * @desc 遠景フォルダのファイル
 * @type file
 * @dir img/parallaxes
 */
 
 
 
(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    //==================================================
    //--  スプライト追加 /ベーシック
    //==================================================
    
    //- 破棄付きスプライト
    function SpriteKeVnef() {
        this.initialize(...arguments);
    }

    SpriteKeVnef.prototype = Object.create(Sprite.prototype);
    SpriteKeVnef.prototype.constructor = SpriteKeVnef;

    SpriteKeVnef.prototype.destroy = function() {
        if (this.bitmap && !this.bitmap._url) { this.bitmap.destroy(); }
        Sprite.prototype.destroy.call(this);
    };
    
    
    
    //==================================================
    //--  パラメータ受け取り
    //==================================================
    
    const parameters = PluginManager.parameters(pluginName);
    
    //- 登録
    const keke_pictureList = parameters["ピクチャ登録"] ? JSON.parse(parameters["ピクチャ登録"]).map(d => JSON.parse(d)) : [];
    const keke_commonList = parameters["コモン登録"] ? JSON.parse(parameters["コモン登録"]).map(d => JSON.parse(d)) : [];
    
    //- 調整項目
    const keke_irisLoadSpeed = 1;
    const keke_colorToneSmooth =1;
    
    
    
    //==================================================
    //--  プラグインコマンド
    //==================================================
    
    //- ビネット表示
    PluginManager.registerCommand(pluginName, "ビネット表示", args => {
         // インタープリターを取得
        const preter = plcmPreter;
        // ウェイトをセット
        const time = makeTime(args["フェードイン時間"]) || 1;
        if (time <= 1 || eval(args["…動作中ウェイト"])) { preter.wait(time); }
        args.preter = preter;
        // ビネットの開始
        startVignette(args);
    });
    
    
    //- アイリスエフェクト
    PluginManager.registerCommand(pluginName, "アイリスエフェクト", args => {
        // インタープリターを取得
        const preter = plcmPreter;
        // 対象ビネットがなければリターン
        const vignettes = getTargetVignette(args);
        if (!vignettes || !vignettes.length) { return; }
        // アイリスウェイトのセット
        const time = makeTime(args["動作時間"]) || 1;
        if (time <= 1 || eval(args["…動作中ウェイト"])) { setIrisWait(preter); }
        args.preter = preter;
        // アイリスエフェクトの開始
        startIrisEffect(args);
    });
    
    
    //- ビネット操作
    PluginManager.registerCommand(pluginName, "ビネット操作", args => {
        // インタープリターを取得
        const preter = plcmPreter;
        // 対象ビネットがなければリターン
        const vignettes = getTargetVignette(args);
        if (!vignettes || !vignettes.length) { return; }
        // 操作ウェイトのセット
        const time = makeTime(args["動作時間"]) || 1;
        if (time <= 1 || eval(args["…動作中ウェイト"])) { setControlWait(preter); }
        args.preter = preter;
        // ビネット操作の開始
        startVignetteControl(args);
    });
    
    
    //- ビネット設定変更
    PluginManager.registerCommand(pluginName, "ビネット設定変更", args => {
        // ビネット設定の変更
        changeVignetteConfig(args);
    });
    
    
    //- ビネットコモン
    PluginManager.registerCommand(pluginName, "ビネットコモン", args => {
         // インタープリターを取得
        const preter = plcmPreter;
        // ウェイトをセット
        const time = makeTime(args["フェードイン時間"]) || 1;
        if (time <= 1 || eval(args["…動作中ウェイト"])) { preter.wait(time); }
        // ビネットコモンの開始
        startVignetteCommon(args);
    });
    
    
    //- アイリスコモン
    PluginManager.registerCommand(pluginName, "アイリスコモン", args => {
         // インタープリターを取得
        const preter = plcmPreter;
        // 対象ビネットがなければリターン
        const vignettes = getTargetVignette(args);
        if (!vignettes || !vignettes.length) { return; }
        // アイリスウェイトのセット
        const time = makeTime(args["動作時間"]) || 1;
        if (time <= 1 || eval(args["…動作中ウェイト"])) { setIrisWait(preter); }
        args.preter = preter;
        // アイリスコモンの開始
        startIrisCommon(args, preter);
    });
    
    
    //- ビネット削除
    PluginManager.registerCommand(pluginName, "ビネット削除", args => {
        // インタープリターを取得
        const preter = plcmPreter;
        // ウェイトをセット
        const time = makeTime(args["フェードアウト時間"]) || 1;
        if (time <= 1 || eval(args["…動作中ウェイト"])) { preter.wait(time); }
        // ビネットの削除
        eraseVignette(args);
    });
    
    
    //- コモンロード
    PluginManager.registerCommand(pluginName, "コモンロード", args => {
        // コモンロードの開始
        startCommonLoad(args);
    });
    
    
    // アイリスウェイトのセット
    function setIrisWait(preter) {
        if (!preter) { return; }
        if (!preter._irisEffectWaitKe) { preter._irisEffectWaitKe = 0; }
        preter._irisEffectWaitKe++;
    };
    
    
    // アイリスウェイトの解除
    function remIrisWait(preter) {
        if (!preter) { return; }
        if (preter._irisEffectWaitKe) { preter._irisEffectWaitKe--; }
    };
    
    
    // 操作ウェイトのセット
    function setControlWait(preter) {
        if (!preter) { return; }
        if (!preter._vignetteControlWaitKe) { preter._vignetteControlWaitKe = 0; }
        preter._vignetteControlWaitKe++;
    };
    
    
    // 操作ウェイトの解除
    function remControlWait(preter) {
        if (!preter) { return; }
        if (preter._vignetteControlWaitKe) { preter._vignetteControlWaitKe--; }
    };
    
    
    //- プリターウェイトの追加
    const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        let result = _Game_Interpreter_updateWaitMode.call(this);
        if (this._irisEffectWaitKe || this._vignetteControlWaitKe) { result = true; }
        return result;
    };
    
    
    
    //==================================================
    //--  共通開始
    //==================================================
    
    //- スプライトキャラクター(コア追加)
    let charaSpritePlcm = null;
    let inCharaOpen = null;
    const _Sprite_Character_initialize = Sprite_Character.prototype.initialize;
    Sprite_Character.prototype.initialize = function(character) {
        _Sprite_Character_initialize.call(this, character);
         // イベントなら開始時プラグインコマンドの実行
         if (character._eventId && !character._pcStartedKeVnef && character._pageIndex >= 0) {
             charaSpritePlcm = this;
             inCharaOpen = true;
             runPluginCmdStarting(character.list(), [ /ビネット表示/, /アイリスエフェクト/, /ビネット操作/, /ビネット設定変更/, /ビネットコモン/, /アイリスコモン/], "開始時に適用");
             charaSpritePlcm = null;
              inCharaOpen = null;
             character._pcStartedKeVnef = true;
          }
    };
    
    
    //- ゲームトループ(コア追加)
    let inBattleOpen = false;
    const _Game_Troop_setup = Game_Troop.prototype.setup;
    Game_Troop.prototype.setup = function(troopId) {
        inBattleOpen = true;
        _Game_Troop_setup.call(this, troopId);
        // 開始時プラグインコマンドを実行
        runPluginCmdStarting(this.troop().pages[0].list, [/ビネット表示/, /アイリスエフェクト/, /ビネット操作/, /ビネット設定変更/, /ビネットコモン/, /アイリスコモン/], "開始時に適用");
        inBattleOpen = false;
    };
    
    
    //- ウインドウレイヤーの作成(コア追加)
    const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function() {
        // ビネットレイヤーの作成
        createVignetteLayer(this);
        _Scene_Base_createWindowLayer.call(this);
    };
    
    
    //- シーンマップ・表示物の作成(コア追加)
    const _Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function() {
        _Scene_Map_createDisplayObjects.apply(this);
        // ビネットレイヤーの作成_2
        createVignetteLayer_2(this);
        // ビネットの再チルド
        rechildVignette(this);
    };
    
    
    //- シーンバトル・表示物の作成(コア追加)
    const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function() {
        _Scene_Battle_createDisplayObjects.apply(this);
        // ビネットレイヤーの作成_2
        createVignetteLayer_2(this);
        // ビネットの再チルド
        rechildVignette(this);
    };
    
    
    //- シーンタイトル(コア追加)
    const _Scene_Title_initialize = Scene_Title.prototype.initialize;
    Scene_Title.prototype.initialize = function() {
        // ビネットのオールクリア
        clearVignetteAuto("map");
        _Scene_Title_initialize.call(this);
    };
    
    
    
    //==================================================
    //--  共通更新
    //==================================================
    
    //- スプライトセット・マップ(コア追加)
    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.call(this);
        // ビネットの更新
        updateVignette(this, "map");
    };
    
    
    //- スプライトセット・バトル(コア追加)
    const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.call(this);
        // ビネットの更新
        updateVignette(this, "battle");
    };
    
    
    
    //==================================================
    //--  共通終了
    //==================================================
    
    // スプライトセット・ベースの破棄(コア追加)
    const _Spriteset_Base_destroy = Spriteset_Base.prototype.destroy;
    Spriteset_Base.prototype.destroy = function(options) {
        // キャッシュの全破棄
        destroyCashAll();
        _Spriteset_Base_destroy.call(this, options);
    };
    
    
    //- シーンマップ終了(コア追加)
    const _Scene_Map_terminate = Scene_Map.prototype.terminate;
    Scene_Map.prototype.terminate = function() {
        _Scene_Map_terminate.call(this);
        // マップ移行時
        if ($gamePlayer._newMapId && $gamePlayer._newMapId != $gameMap.mapId()) {
            // ビネットの自動クリア
            clearVignetteAuto("map");
        // それ以外
        } else {
            // ビネットスプライトの仮チルド-マップ
            tempChildVignetteSpriteMap();
        }
    };
    
    
    //- シーンバトル終了(コア追加)
    const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
    Scene_Battle.prototype.terminate = function() {
        _Scene_Battle_terminate.call(this);
        // マップ移行時
        const nextScene = SceneManager._nextScene;
        if (nextScene && nextScene.constructor.name == "Scene_Map") {
            // ビネットの自動クリア
            clearVignetteAuto("battle");
        }
    };
    
    
    //- ビネットの自動クリア
    function clearVignetteAuto(sceneType) {
        const gm = getGm(sceneType);
        // ビネットのクリア
        clearVignette(gm, 0, true, sceneType);
    };
    
    
    //- ビネットのクリア
    function clearVignette(gm, fadeTime, isAuto, sceneType) {
        if (!gm._vignettesKe) { return; }
        const vignettes = gm._vignettesKe;
        const sceneName = sceneType == "map" ? "Scene_Map" : "Scene_Battle";
        let del = false;
        // ビネットを全て処理
        vignettes.forEach((vnt, i) => {
            // 持ち越し時か、シーンが違う場合はリターン
            if (isAuto && (vnt.takeOver || vnt.sceneName != sceneName)) { return; }
            vnt.delFlag = true;
            // フェードのセット
            setFade(vnt, fadeTime, -1);
            // 自動クリア時はすぐ消去
            if (isAuto) {
                const spriteset = SceneManager._scene._spriteset;
                updateVignetteDel(spriteset, sceneType, vnt, vignettes, i);
                del = true;
            }
        });
        // null を消去
        if (del) {
            gm._vignettesKe = vignettes.filter(vnt => vnt);
            setVignetteSprites(vignetteSprites().filter(s => s));
        }
    };
    
    
    //- スプライトの破棄
    function destroySprite(sprite) {
        if (!sprite || sprite == "nothing") { return; }
        sprite.children.forEach(s => destroySprite(s));
        if (sprite.constructor.name == "Sprite_Character") { return; }
        if (sprite.bitmap && !sprite.bitmap._url) { sprite.bitmap.destroy(); }
        if (sprite._texture) { sprite.destroy(); }
    };
    
    
    
    //==================================================
    //--  共通処理
    //==================================================
    
    //- ビネットスプライテスの初期化
    function initVignetteSprites(i) {
        const gt = $gameTemp;
        if (!gt._vignetteSpritesKe) { gt._vignetteSpritesKe = []; };
    };
    
    
    //- ビネットスプライテスの取得
    function vignetteSprites() {
        const gt = $gameTemp;
        if (!gt._vignetteSpritesKe) { gt._vignetteSpritesKe = []; }
        return gt._vignetteSpritesKe;
    };
    
    
    //- ビネットスプライテスのセット
    function setVignetteSprites(sprites) {
        $gameTemp._vignetteSpritesKe = sprites;
    };
    
    
    //- ビネットスプライトの仮チルド-マップ
    function tempChildVignetteSpriteMap() {
        const sprites = $gameTemp._vignetteSpritesKe;
        if (sprites) {
            sprites.forEach(sprite => {
                //- ビネットスプライトの仮チルド
                tempChildVignetteSprite(sprite)
            });
        }
    };
    
    
    //- ビネットスプライトの仮チルド
    function tempChildVignetteSprite(sprite, force) {
        if (!sprite) { return; }
        const gt = $gameTemp;
        if (!gt._vignetteTempLayerKe) { gt._vignetteTempLayerKe = new PIXI.Container(); }
        const tempLayer = gt._vignetteTempLayerKe;
        tempLayer.addChild(sprite);
    };
    
    
    //- シーンタイプの取得
    function getSceneType() {
        return $gameParty.inBattle() || inBattleOpen ? "battle" : "map";
    };
    
    
    //- gm(ビネット親)の取得
    function getGm(sceneType) {
        return $gameMap;
    };
    
    
    //- バトル中か
    function inBattle(sceneType, scene) {
        if (sceneType) {
            return sceneType == "battle";
        } else if (scene) {
            return scene.constructor.name == "Scene_Battle";
        } else {
            return $gameParty.inBattle();
        }
    };
    
    
    // シーン開始時か
    function inSceneOpen() {
        if (inCharaOpen) { return "map"; }
        if (inBattleOpen) { return "battle"; }
        return false;
    };
    
    
    // 現在のシーン
    function currentScene() {
        let scene = null;
        if (inSceneOpen() == "battle") {
            scene = "Scene_Battle";
        } else {
            scene = SceneManager._scene.constructor.name;
        }
        return scene;
    };
    
    
    
    //==================================================
    //--  レイヤー
    //==================================================  
    
    //- ビネットレイヤーの作成
    function createVignetteLayer(scene) {
        const spriteset = scene._spriteset;
        if (!spriteset) { return; }
        scene._vignetteLayersKeA = [];
        for (let i = 0; i < 3; i++) {
            sprite = new SpriteKeVnef();
            scene._vignetteLayersKeA[i] = sprite;
            const field = scene.constructor.name == "Scene_Map" ? spriteset._tilemap : scene.constructor.name == "Scene_Battle" ? spriteset._battleField : scene;
            field.addChildAt(sprite, 1);
        };
        scene._vignetteLayersKeB = [];
        for (let i = 0; i < 3; i++) {
            sprite = new SpriteKeVnef();
            scene._vignetteLayersKeB[i] = sprite;
            const pictureContainer = spriteset ?  spriteset._pictureContainer : scene;
            pictureContainer.addChild(sprite);
        };
        scene._vignetteLayersKeC = [];
        for (let i = 0; i < 3; i++) {
            sprite = new SpriteKeVnef();
            scene._vignetteLayersKeC[i] = sprite;
            scene.addChild(sprite);
        };
    };
    
    
    //- ビネットレイヤーの作成_2
    function createVignetteLayer_2(scene) {
        const spriteset = scene._spriteset;
        if (!spriteset) { return; }
        scene._vignetteLayersKeD = [];
        for (let i = 0; i < 3; i++) {
            sprite = new SpriteKeVnef();
            scene._vignetteLayersKeD[i] = sprite;
            scene.addChild(sprite);
        };
    };
    
    
    //- ビネットレイヤーの破棄
    function destroyVignetteLayer() {
        const scene = SceneManager._scene;
        scene._vignetteLayersKeA.forEach(layer => destroySprite(layer));
        scene._vignetteLayersKeB.forEach(layer => destroySprite(layer));
        scene._vignetteLayersKeC.forEach(layer => destroySprite(layer));
        scene._vignetteLayersKeD.forEach(layer => destroySprite(layer));
    };
    
    
    //- ビネットのチルド
    function childVignette(sprite) {
        if (!sprite) { return; }
        const scene = SceneManager._scene;
        if (!scene._vignetteLayersKeA) { createVignetteLayer(scene); }
        const vignette = sprite._vignetteKe;
        const match = vignette.layer.match(/(レイヤー|)([ABCD])(\d+)/);
        if (!match) { return; }
        const layers = eval(scene["_vignetteLayersKe" + match[2]]);
        if (!layers) { return; }
        const layer = layers[Math.max(Number(match[3]) - 1, 1)];
        if (!layer) { return; }
        layer.addChild(sprite);
    };
    
    
    //- 画面レイヤーか
    function isScreenLayer(freeHud) {
        return freeHud.layer.match(/[CD]/i);
    };
    
    
    
    //==================================================
    //--  ピクチャイメージ
    //==================================================
    
    //- ピクチャイメージの読み込み-開始(コア追加)
    const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function() {
        let result = _Scene_Boot_isReady.call(this);
        // ピクチャイメージの読み込み
        if (!pictureImageLoaded()) {
            loadPictureImage();
            result = false;
        }
        return result;
    };
    
    
    //- ピクチャイメージの読み込み
    function loadPictureImage() {
        if (ImageManager._vignetteImagesKe) { return; }
        const im = ImageManager;
        if (!im._vignetteImagesKe) { im._vignetteImagesKe = {}; }
        const images =  im._vignetteImagesKe;
        // リストを取得
        const list = keke_pictureList || [];
        // リストを一気に処理
        let task = 0;
        let comp = 0;
        list.forEach(data => {
            const name = data["ピクチャ名"];
            const files = getPictureFile(data);
            if (!name || !files.fileName) { return; }
            // イメージを作成
            const img = new Image();
            img.src = "img/" + files.folderName + "/" + files.fileName + ".png";
            images[name] = img;
            task++;
            // 作成完了時の処理
            img.onload = function() {
                comp++;
                if (comp >= task) {
                    im._vignetteImageFinishKe = true;
                }
            };
        });
        // タスクがないなら終了
        if (!task) { im._vignetteImageFinishKe = true; }
    };
    
    
    //- ピクチャファイルの取得
    function getPictureFile(data) {
        let fileName = "";
        let folderName = "";
        if (data["ファイル-ピクチャ"]) {
            fileName = data["ファイル-ピクチャ"];
            folderName = "pictures";
        } else if (data["ファイル-タイトル"]) {
            fileName = data["ファイル-タイトル"];
            folderName = "titles1";
        } else if (data["ファイル-遠景"]) {
            fileName = data["ファイル-遠景"];
            folderName = "parallaxes";
        }
        return { fileName:fileName, folderName:folderName };
    };
    
    
    //- ピクチャイメージ読み込み完了したか
    function pictureImageLoaded() {
        return ImageManager._vignetteImageFinishKe
    };
    
    
    //- ピクチャイメージの取得
    function pictureImage(callName) {
        return ImageManager._vignetteImagesKe[callName];
    };
    
    
    
    //==================================================
    //--  コモン読み込み
    //==================================================
    
    //- コモンロードの開始
    function startCommonLoad(args) {
        let callNames = null;
        // 読み込むコモンを取得
        callNames = args["読み込むコモン"] ? args["読み込むコモン"].replace(/\s*/g, "").split(",") : null;
        if (!callNames) { return; }
        const speed = Number(args["読み込み速度"]);
        args.isCommonLoad = true;
        // アイリスキャッシュの作成-コモンから
        callNames.forEach(callName => {
            makeIrisCashByCommon(args, callName, null, speed);
        });
    };
    
    
    
    //==================================================
    //--  ビネットの開始
    //==================================================
    
    //- ビネットの開始
    function startVignette(args) {
        const gm = getGm();
        // 基本のパラムセット
        const p = {};
        // 現在のシーン
        p.sceneName = currentScene();
        // ビネットパラムの変換-基本
        convertVignetteParamBasic(p, args);
        // ビネットパラムの変換-フォーム
        convertVignetteParamForm(p, args);
        // カラートーン
        if ((args.commonName || args.commonSub || p.picture) && (args["カラー赤"] || args["カラー緑"] || args["カラー青"])) {
            p.toneRed = Number(args["カラー赤"]) || 0;
            p.toneGreen = Number(args["カラー緑"]) || 0;
            p.toneBlue = Number(args["カラー青"]) || 0;
            p.isColorTone = true;
        }
        // 不透明度
        p.opacity = Number(args["不透明度"]);
        p.opacityOri = p.opacity;
        p.animeOpacity = 0;
        // スケール
        p.scaleX = args["スケールX"] ? Number(args["スケールX"]) : 1;
        p.scaleY = args["スケールY"] ? Number(args["スケールY"]) : 1;
        p.animeScale = 1;
        // 回転角
        p.angle = args["回転角"] ? Number(args["回転角"]) : 0;
        p.anglePi = angleToRadian(p.angle);
        p.animeAngle = 0;
        p.animeAnglePi = 0;
        p.spinAngle = 0;
        p.spinAnglePi = 0;
        // ずらし
        p.offsetX = Number(args["ずらしX"]);
        p.offsetY = Number(args["ずらしY"]);
        // ビネットアニメのセット
        setVignetteAnime(p, args);
        // フェードイン
        p.fadeTime = makeTime(args["フェードイン時間"]);
        // フェードのセット
        setFade(p, p.fadeTime, 1);
        // ビネット追尾のセット
        setVignetteChase(p, args);
        // コモンセット
        p.commonName = args.commonName;
        p.commonPoint = args.commonPoint;
        // 同じ名前のビネットを消去
        const del = delVignette(gm, "", p.name);
        if (del) {
            remIrisWait(args.preter);
            remControlWait(args.preter);
        }
        // 変数セット
        p.wentX = 0;
        p.wentY = 0;
        if (!gm._vignettesKe) { gm._vignettesKe = []; }
        // 上に挿入
        if (p.insert == "上") {
            gm._vignettesKe.push(p);
        // 下に挿入
        } else {
            gm._vignettesKe.unshift(p);
            const spriteset = SceneManager._scene._spriteset;
            const sceneType = getSceneType();
            const sprites = vignetteSprites();
            if (sprites && sprites.length) {
                sprites.unshift(null);
            }
        }
        // 向きによるビネット回転
        spinVignetteByDire(p, true);
    };
    
    
    //- ビネットパラムの変換-基本
    function convertVignetteParamBasic(p, args) {
        p.name = args["ビネット名"] ? args["ビネット名"] : p.name;
        p.layer = args["レイヤー"] ? args["レイヤー"] : p.layer;
        p.insert = args["…挿入位置"] ? args["…挿入位置"] : p.insert;
        p.takeOver = args["ビネット持ち越し"] ? eval(args["ビネット持ち越し"]) : p.takeOver;
        p.picture = args["ピクチャ使用"] ? convertVariable(args["ピクチャ使用"]) : p.picture;
        p.form = args["内枠-フォーム"] ? args["内枠-フォーム"] : p.form;
        p.formCfg = args["…フォーム設定"] ? JSON.parse(args["…フォーム設定"]) : p.formCfg;
    };
    
    
    //- ビネットパラムの変換-フォーム
    function convertVignetteParamForm(p, args) {
        // 半径
        p.radiusX = args["内枠-半径X"] ? (Graphics.width * Number(args["内枠-半径X"]) / 100 || 0) : p.radiusX;
        p.radiusY = args["内枠-半径Y"] ? (Graphics.height * Number(args["内枠-半径Y"]) / 100 || 0) : p.radiusY;
        // 通常パラム
        let params = ["red", "green", "blue", "blur"];
        let words = ["カラー赤", "カラー緑", "カラー青", "ぼかし度"];
        params.forEach((param, i) => {
            const word = words[i];
            p[param] = args[word] ? (Number(args[word]) || 0) : p[param];
        });
        // フォームパラム
        const cfg = args["…フォーム設定"] ? JSON.parse(args["…フォーム設定"]) : {};
        if (cfg && Object.keys(cfg).length) {        
            params = ["squareRoundLine", "squareRoundEdge", "circleToFan", "ellipseAngle", "diyaRound", "gizaOutX", "gizaOutY", "beltRound"];
            words = ["スクエア-線丸み", "スクエア-角丸み", "円形-扇型化", "楕円-回転角", "ダイヤ-線丸み", "ギザギザ-トゲ長さX", "ギザギザ-トゲ長さY", "帯-線丸み"];
            params.forEach((param, i) => {
                const word = words[i];
                if (!cfg[word]) { return; }
                if (param == "circleToFan") {
                    p[param] = cfg[word].split(",").map(v => Number(v));
                } else {
                    p[param] = Number(cfg[word]);
                }
            });
        }
    };
    
    
    //- ビネットアニメのセット
    function setVignetteAnime(vignette, args) {
        const news = args["アニメーション"] ? JSON.parse(args["アニメーション"]) : null;
        if (!news) { return; }
        const params = ["swing", "flick", "spin"];
        const words = ["拡縮", "明滅", "回転"];
        // アニメごとにセット
        params.forEach((param, i) => {
            const word = words[i];
            const anime = vignette[param] || {};
            anime.moving = news[word+"アニメ-動き"] ? news[word+"アニメ-動き"] : anime.moving;
            anime.timeMax = news[word+"アニメ-時間"] ? makeTime(news[word+"アニメ-時間"]) : anime.timeMax;
            anime.dura = 0;
            anime.pow = news[word+"アニメ-大きさ"] ? Number(news[word+"アニメ-大きさ"]) : anime.pow;
            anime.start = param == "swing" ? 1 : param == "flick" ? 0 : 0;
            anime.speed = anime.pow / anime.timeMax;
            anime.pre = null;
            vignette[param] = anime;
        });
        // アニメーションしない時は効果量を戻す
        const swing = vignette.swing;
        if (swing.moving == "拡縮無し" || !swing.timeMax || !swing.pow) {
            vignette.animeScale = 1;
        }
        const flick = vignette.flick;
        if (flick.moving == "明滅無し" || !flick.timeMax || !flick.pow) {
            vignette.animeOpacity = 0;
        }
        const spin = vignette.spin;
        if (spin.moving == "明滅無し" || !spin.timeMax || !spin.pow) {
            vignette.animeAngle = 0;
        }
    }
    
    
    //- フェードのセット
    function setFade(p, fadeTime, rate) {
        if (!fadeTime) { return; }
        p.fadeTime = fadeTime;
        p.fadeDura = 0;
        p.fadeSpeed = p.opacity / p.fadeTime * rate;
        if (rate > 0) { p.opacity = 0; }
    };
    
    
    //- ビネット追尾のセット
    function setVignetteChase(vignette, args) {
        const params = args["追尾設定"] ? JSON.parse(args["追尾設定"]) : null;
        if (!params) { return; }
        // 扇型回転を初期化
        vignette.preDire = null;
        vignette.spinAngle = 0;
        vignette.offsetXSpin = null;
        vignette.offsetYSpin = null;
        // 追尾を解除
        if (eval(params["追尾解除"])) {
            vignette.chase = null;
            return;
        }
        // 追尾をセット
        const chase = vignette.chase || {};
        const charas = [...getCharasByName(params["対象キャラ-名前"]), ...getCharasById(params["対象キャラ-ID"])];
        if (charas[0]) { chase.target = charas[0]; }
        chase.spinByDire = params["向きによる回転"] ? eval(params["向きによる回転"]) : chase.spinByDire;
        chase.spinTime = makeTime(params["…回転時間"]);
        vignette.chase = chase;
    };
    
    
    //- ビネットスプライトの形成
    function createVignetteSprite(spriteset, sceneType, vignette, i) {
        let sprites = vignetteSprites();
        if (sprites && sprites[i]) { return; }
        if (vignette.delFlag) { sprites[i] = "nothing";  return; }
        if (!SceneManager._scene._vignetteLayersKeA) { return; }
        if (vignette.sceneName != currentScene()) { return; }
        const gw = Graphics.width;
        const gh = Graphics.height;
        // ビネットビットマップの形成
        const bitmap = vignette.commonName ? getVignetteCash(vignette.commonName, vignette.commonPoint) : createVignetteBitmap(vignette);
        // スプライト形成
        const sprite = new SpriteKeVnef(bitmap);
        sprite._vignetteKe = vignette;
        // ビネットのチルド
        childVignette(sprite, sprites);
        // ビネットスプライトの初期化
        initVignetteSprites(i);
        sprites = vignetteSprites();
        // 変数セット
        sprites[i] = sprite;
        // アンカー
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        // カラートーン
        if (vignette.isColorTone) {
            sprite.setColorTone([vignette.toneRed, vignette.toneGreen, vignette.toneBlue, 0]);
        }
        // リチルド
        if (sprites.length >= 2) {
            sprites.forEach(s => {
                childVignette(s);
            });
        }
    };
        
        
    //- ビネットビットマップの形成
    function createVignetteBitmap(vignette) {
        const gw = Graphics.width;
        const gh = Graphics.height;
        const color = `rgba(${vignette.red}, ${vignette.green}, ${vignette.blue}, 1)`;
        // ビットマップ形成
        const aWidth = gw * 3;
        const aHeight = gh * 3;
        const bitmap = new Bitmap(aWidth, aHeight);
        const context = bitmap.context;
        context.fillStyle = color;
        if (vignette.picture) {
            const img = pictureImage(vignette.picture);
            context.fillStyle = context.createPattern(img, 'repeat');
        }
        // ぼかし処理
        let blurH = 0;
        if (vignette.blur && !vignette.picture) {
            context.shadowColor = color;
            blurH = aHeight;
            vignette.blurH = blurH;
            context.shadowOffsetX = 0;
            context.shadowOffsetY = blurH;
            context.shadowBlur = vignette.blur;
        }
        // 通常パラム
        const form = vignette.form;
        const formCfg = vignette.formCfg;
        const radiusX = vignette.radiusX;
        const radiusY = vignette.radiusY;
        const lengthX = radiusX * 2;
        const lengthY = radiusY * 2;
        const outW = (gw - lengthX) / 2;
        const outH = (gh - lengthY) / 2;
        const squareW = gw - outW * 2;
        const squareH = gh - outH * 2;
        const fan = isFan(vignette);
        const circleStart = fan ? vignette.circleToFan[0] : 0;
        const circleEnd = fan ? vignette.circleToFan[1] : 360;
        // 各フォームを描画
        const beltR = vignette.beltRound;
        if (form == "スクエア") {
            designInSquare(bitmap,  0,  -blurH,  aWidth,  aHeight,  squareW,  squareH, vignette.squareRoundLine,  vignette.squareRoundEdge);
        } else if (form == "真円") {
            designInCircle(bitmap,  0,  -blurH,  aWidth,  aHeight,  Math.max(lengthX, 0) / 2,  Math.max(lengthY, 0) / 2, circleStart, circleEnd, "arc");
        } else if (form == "楕円") {
            designInCircle(bitmap,  0,  -blurH, aWidth,  aHeight,  Math.max(lengthX, 0) / 2,  Math.max(lengthY, 0) / 2, circleStart, circleEnd,  "ellipse",  vignette.ellipseAngle);
        } else if (form == "横アーモンド") {
            designInAlmondHor(bitmap,  0,  -blurH,  aWidth,  aHeight,  squareW,  squareH);
        } else if (form == "縦アーモンド") {
            designInAlmondVer(bitmap,  0,  -blurH,  aWidth,  aHeight,  squareW,  squareH);
        } else if (form == "ダイヤ") {
            designInDiya(bitmap,  0,  -blurH,  aWidth,  aHeight,   squareW, squareH, vignette.diyaRound);
        } else if (form.includes("ギザギザ")) {
            const smooth = form.includes("滑らか");
            designInGiza(bitmap,  0,  -blurH,  aWidth,  aHeight,  squareW,  squareH, formCfg, smooth, vignette.gizaOutX, vignette.gizaOutY);
        } else if (form == "上下帯") {
            designSquare(bitmap,  0,  0 - blurH - beltR * 0.4,  gw * 3,  gh + outH,  beltR);
            designSquare(bitmap,  0,  gh * 2 - outH - blurH + beltR * 0.4,  gw * 3,  gh + outH, beltR, 0,  "",  0,  true);
        } else if (form == "左右帯") {
            designSquare(bitmap,  0 - beltR * 0.4,  0 - blurH,  gw + outW,  gh * 3,   beltR);
            designSquare(bitmap,  gw * 2 - outW + beltR * 0.4,  0 - blurH,  gw + outW,  gh * 3,   beltR, 0,  "",  0,  true);
        } else if (form == "上帯") {
            designSquare(bitmap,  0,  0 - blurH - beltR * 0.4,  gw * 3,  gh + outH,  beltR);
        } else if (form == "下帯") {
            designSquare(bitmap,  0,  gh * 2 - outH - blurH + beltR * 0.4,  gw * 3,  gh + outH,  beltR);
        } else if (form == "左帯") {
            designSquare(bitmap,  0 - beltR * 0.4,  0 - blurH,   gw + outW, gh * 3,  beltR);
        } else if (form == "右帯") {
            designSquare(bitmap,  gw * 2 - outW + beltR * 0.4,  0 - blurH,  gw + outW,  gh * 3,  beltR);
        } else if (form == "フリー") {
            const freePoints = formCfg["フリー作図"] ? JSON.parse(formCfg["フリー作図"]).map(pos => JSON.parse(pos)) : []
            designInFree(bitmap,  0,  -blurH,  aWidth,  aHeight,  freePoints);
        }
        context.fill();
        return bitmap;
    };
    
    
    //- 扇型か
    function isFan(vignette) {
        if (!vignette.form.includes("円") || !vignette.circleToFan || !vignette.circleToFan.length) { return false; }
        toFan = vignette.circleToFan;
        if (toFan[0] == toFan[1] || Math.abs(toFan[1] - toFan[0]) % 360 == 0) { return false; }
        return true
    };
    
    
    //- ビネットの再チルド
    function rechildVignette(scene) {
        if (!vignetteSprites()) { return; }
        vignetteSprites().forEach(sprite => {
            if (!sprite) { return; }
            const vnt = sprite._vignetteKe;
            if (vnt.sceneName != scene.constructor.name && !vnt.takeOver) { return; }
            childVignette(sprite);
        });
    };
    
    
    
    //==================================================
    //--  ビネットの更新
    //==================================================
    
    //- ビネットの更新
    function updateVignette(spriteset, sceneType) {
        const gm = getGm();
        // アイリス画像の読み込み更新
        updateIrisImageLoad();
        // アイリス予約の更新
        updateIrisAppo(gm);
        const vignettes = gm._vignettesKe;
        if (!gm._vignettesKe || !gm._vignettesKe.length) { return; }
        // ビネットごとに処理
        let del = false;
        vignettes.forEach((vignette, i) => {
            // アイリスエフェクトの更新
            updateIrisEffect(spriteset, sceneType, vignette, i);
            // ビネット操作の更新
            updateVignetteControl(spriteset, sceneType, vignette, i);
            // 向きによるビネット回転
            spinVignetteByDire(vignette);
            // ビネットのスムーズ回転
            spinVignetteSmooth(vignette);
            // ビネットスプライトの形成
            createVignetteSprite(spriteset, sceneType, vignette, i);
            // ビネットのフェード
            fadeVignette(vignette);
            // ビネットアニメの更新
            updateVignetteAnime(vignette);
            // ビネットスプライトの更新
            updateVignetteSprite(spriteset, sceneType, vignette, i);
            // ビネット消去の更新
            const d = updateVignetteDel(spriteset, sceneType, vignette, vignettes, i);
            del = del || d;
        });
        // null を消去
        if (del) {
            gm._vignettesKe = vignettes.filter(vnt => vnt);
            setVignetteSprites(vignetteSprites().filter(s => s));
        }
    };
    
    
    //- 向きによるビネット回転
    function spinVignetteByDire(vignette, init) {
        if (!vignette.chase || !vignette.chase.target || !vignette.chase.spinByDire) { return; }
        const chara = vignette.chase.target;
        const charaDire = init ? chara._direction : getCharaDire(chara, vignette);
        if (charaDire != vignette.preDire || init) {
            vignette.spinAnglePre = vignette.spinAngle || 0;
            vignette.offsetXSpinPre = vignette.offsetXSpin || vignette.offsetX;
            vignette.offsetYSpinPre = vignette.offsetYSpin || vignette.offsetY;
            vignette.spinTimeMax = init ? 1 : vignette.chase.spinTime || 1;
            vignette.spinDuration = vignette.spinTimeMax;
            switch (charaDire) {
                // 下
                case 2:
                    vignette.spinAngleTage = 0;
                    vignette.offsetXSpinTage = vignette.offsetX;
                    vignette.offsetYSpinTage = vignette.offsetY;
                    break;
                // 左
                case 4:
                    vignette.spinAngleTage = 90;
                    vignette.offsetXSpinTage = -vignette.offsetY;
                    vignette.offsetYSpinTage = vignette.offsetX;
                    break;
                // 右
                case 6:
                    vignette.spinAngleTage = 270;
                    vignette.offsetXSpinTage = vignette.offsetY;
                    vignette.offsetYSpinTage = -vignette.offsetX;
                    break;
                // 上
                case 8:
                    vignette.spinAngleTage = 180;
                    vignette.offsetXSpinTage = -vignette.offsetX;
                    vignette.offsetYSpinTage = -vignette.offsetY;
                    break;
                // 左下
                case 1:
                    vignette.spinAngleTage = 45;
                    vignette.offsetXSpinTage = vignette.offsetX / 2 - vignette.offsetY / 2;
                    vignette.offsetYSpinTage = vignette.offsetY / 2 + vignette.offsetX / 2;
                    break;
                // 右下
                case 3:
                    vignette.spinAngleTage = 315;
                    vignette.offsetXSpinTage = -vignette.offsetX / 2 + vignette.offsetY / 2;
                    vignette.offsetYSpinTage = vignette.offsetY / 2 - vignette.offsetX / 2;
                    break;
                // 左上
                case 7:
                    vignette.spinAngleTage = 135;
                    vignette.offsetXSpinTage = -vignette.offsetX - vignette.offsetY / 2;
                    vignette.offsetYSpinTage = -vignette.offsetY + vignette.offsetX / 2;
                    break;
                // 右上
                case 9:
                    vignette.spinAngleTage = 225;
                    vignette.offsetXSpinTage = -vignette.offsetX+ vignette.offsetY / 2;
                    vignette.offsetYSpinTage = -vignette.offsetY - vignette.offsetX / 2;
                    break;
            }
        }
        vignette.preDire = charaDire;
    };
    
    
    //- キャラの向きの取得
    function getCharaDire(chara, vnt) {
        // 移動方向から斜め判定
        if (vnt.charaPreX != null) {
            const goX = chara._realX - vnt.charaPreX;
            const goY = chara._realY - vnt.charaPreY;
            // 斜め解除判定
            if (vnt.charaDiagoCount) { vnt.charaDiagoCount--; }
            if (!vnt.charaDiagoCount && (vnt.charaDiagoDire && (inputMove() || inputStraight(vnt, goX, goY)))) { vnt.charaDiagoDire = null; }
            // 斜め判定
            let diagoOk = false;
            if ((Input.isPressed("left") && Input.isPressed("up")) || (goX < 0 && goY < 0)) { vnt.charaDiagoDire = 7; diagoOk = true; } else
            if ((Input.isPressed("left") && Input.isPressed("down")) || (goX < 0 && goY > 0)) { vnt.charaDiagoDire = 1; diagoOk = true; } else
            if ((Input.isPressed("right") && Input.isPressed("up")) || (goX > 0 && goY < 0)) { vnt.charaDiagoDire = 9; diagoOk = true; } else
            if ((Input.isPressed("right") && Input.isPressed("down")) || (goX > 0 && goY > 0)) { vnt.charaDiagoDire = 3; diagoOk = true; }
            if (diagoOk) { vnt.charaDiagoCount = 10; }
            // 斜め中なら斜め
            if (vnt.charaDiagoDire) {
                vnt.charaPreX = chara._realX;
                vnt.charaPreY = chara._realY;
                return vnt.charaDiagoDire;
            }
        }
        // 向きを取得
        const charaDire = vnt.charaDiagoDire || chara._direction;
        vnt.charaPreX = chara._realX;
        vnt.charaPreY = chara._realY;
        return charaDire;
    };
    
    
    //- 移動入力をしたか
    function inputMove() {
        if (Input.isTriggered("left")) { return true; }
        if (Input.isTriggered("right")) { return true; }
        if (Input.isTriggered("up")) { return true; }
        if (Input.isTriggered("down")) { return true; }
        if (TouchInput.isTriggered()) { return true; }
        return false;
    };
    
    
    //- 直線入力をしたか
    function inputStraight(vnt, goX, goY) {
        let result = false;
        let straight = false;
        if ((goX && !goY) || (!goX && goY)) { straight = true; } else
        if (Input.isPressed("left") && !Input.isPressed("up") && !Input.isPressed("down")) { straight = true; } else
        if (Input.isPressed("right") && !Input.isPressed("up") && !Input.isPressed("down")) { straight = true; } else
        if (Input.isPressed("up") && !Input.isPressed("left") && !Input.isPressed("right")) { straight = true; } else
        if (Input.isPressed("down") && !Input.isPressed("left") && !Input.isPressed("right")) { straight = true; }
        if (straight) {
            if (!vnt.straightCount) { vnt.straightCount = 0; }
             vnt.straightCount++;
             if (vnt.straightCount >= 5) {
                 result = true;
                 vnt.straightCount = 0;
              }
        } else {
            vnt.straightCount = 0
        }
        return result;
    };
    
    
    //- ビネットのスムーズ回転
    function spinVignetteSmooth(vnt) {
        if (!vnt.spinDuration) { return; }
        vnt.spinDuration--;
        const volAngles = [];
        volAngles[0] = vnt.spinAnglePre - vnt.spinAngleTage;
        volAngles[1] = volAngles[0] + 360;
        volAngles[2] = volAngles[0] - 360;
        volAngles.sort((a, b) => Math.abs(a) - Math.abs(b));
        vnt.spinAngle = vnt.spinAngleTage + (Math.sin(Math.PI * (vnt.spinDuration / vnt.spinTimeMax + 1.5)) * volAngles[0] + volAngles[0]) / 2;
        vnt.spinAnglePi = angleToRadian(vnt.spinAngle);
        const volOffsetX = vnt.offsetXSpinPre - vnt.offsetXSpinTage;
        vnt.offsetXSpin = vnt.offsetXSpinTage + (Math.sin(Math.PI * (vnt.spinDuration / vnt.spinTimeMax + 1.5)) * volOffsetX + volOffsetX) / 2;
        const volOffsetY = vnt.offsetYSpinPre - vnt.offsetYSpinTage;
        vnt.offsetYSpin = vnt.offsetYSpinTage + (Math.sin(Math.PI * (vnt.spinDuration / vnt.spinTimeMax + 1.5)) * volOffsetY + volOffsetY) / 2;
    };
    
    
    //- ビネットのフェード
    function fadeVignette(vignette) {
        if (!vignette.fadeTime) { return; }
        const v = vignette;
        // 不透明度を変更
        v.opacity += v.fadeSpeed;
        // カウント
        v.fadeDura++;
        // 終了
        if (v.fadeDura >= v.fadeTime) {
            v.opacity = v.opacityOri;
            v.fadeTime = 0;
        }
    };
    
    
    //- ビネットアニメの更新
    function updateVignetteAnime(vignette) {
        const params = ["swing", "flick", "spin"];
        const words = ["拡縮", "明滅", "回転"];
        // アニメごとに更新
        params.forEach((param, i) => {
            const word = words[i];
            // ビネットアニメの更新-個別
            updateVignetteAnimeEach(vignette, param, word);
        });
    };
    
    
    //- ビネットアニメの更新
    function updateVignetteAnimeEach(vignette, param, word) {    
        if (!vignette[param]) { return; }
        const anime = vignette[param];
        if (!anime.moving || anime.moving == `${word}無し` || !anime.timeMax || !anime.pow) { return; }
        // パラメータ変動
        if (anime.moving == "ノーマル") {
            setAnimeResult(vignette, param, anime.speed, "+");
        } else {
            if (anime.pre) { setAnimeResult(vignette, param, anime.pre, "-"); }
            if (anime.moving == "ターン") {
                anime.pre = Math.sin(Math.PI * (anime.dura / anime.timeMax * 1)) * anime.pow;
            } else {
                anime.pre = Math.sin(Math.PI * (anime.dura / anime.timeMax * 2)) * anime.pow;
            }
            setAnimeResult(vignette, param, anime.pre, "+");
        }
        // カウントを加算
        anime.dura++;
        // ループ
        if (anime.dura >= anime.timeMax) {
            anime.dura = 0;
            anime.pre = null;
            // 初期値に戻す
            setAnimeResult(vignette, param, anime.start, "=");
        }
    };
    
    
    //- アニメ結果のセット
    function setAnimeResult(vignette, param, val, symbol = "=") {
        // 拡縮アニメ
        if (param == "swing") {
            calcBySymbol(vignette, "animeScale", val, symbol);
        // 明滅アニメ
        } else if (param == "flick") {
            calcBySymbol(vignette, "animeOpacity", val, symbol);
        // 回転アニメ
        } else {
            calcBySymbol(vignette, "animeAngle", val, symbol);
            vignette.animeAnglePi = angleToRadian(vignette.animeAngle);
        }
    };
    
    
    //- 計算記号に応じた計算
    function calcBySymbol(object, param, val, symbol) {
        if (symbol == "=") {
            object[param] = val;
        } else if (symbol == "+") {
            object[param] += val;
        } else if (symbol == "-") {
            object[param] -= val;
        }
    };
    
    
    //- ビネットスプライトの更新
    function updateVignetteSprite(spriteset, sceneType, vignette, i) {
        const sprites = vignetteSprites();
        if (!sprites) { return; }
        const sprite = sprites[i];
        if (!sprite || !sprite.parent) { return; }
        // 不透明度
        sprite.opacity = vignette.opacity + vignette.animeOpacity;
        // スケール
        const zoomRate = zoomScaleRate(vignette);
        sprite.scale.x = vignette.scaleX * vignette.animeScale * zoomRate;
        sprite.scale.y = vignette.scaleY * vignette.animeScale * zoomRate;
        // 回転角
        sprite.rotation = vignette.anglePi + vignette.animeAnglePi + vignette.spinAnglePi;
        // 位置
        sprite.x = Graphics.width * 0.5 + vignette.offsetX;
        sprite.y = Graphics.height * 0.5 + vignette.offsetY;
        const zoomOffset = getZoomScreenFix(sprite, vignette);
        sprite.x += zoomOffset.x;
        sprite.y += zoomOffset.y;
        // ビネットスプライトの追尾
        chaseVignetteSprite(sceneType, sprite, vignette, i);
    };
    
    
    //- ズーム画面固定値の取得
    function getZoomScreenFix(sprite, vignette) {
        if (isScreenLayer(vignette)) { return { x:0, y:0 }; }
        const gs = $gameScreen;
        const zoomScale = gs.zoomScale();
        if (zoomScale == 1) { return { x:0, y:0 }; }
        const rate = 1 / zoomScale;
        const offsetX = (sprite.x - gs.zoomX()) * (rate - 1);
        const offsetY = (sprite.y - gs.zoomY()) * (rate - 1);
        return { x:offsetX, y:offsetY };
    };
    
    
    //- ズームスケール率
    function zoomScaleRate(vignette) {
        if (isScreenLayer(vignette)) { return 1; }
        const zoomScale = $gameScreen.zoomScale();
        if (zoomScale >= 1) { return 1; }
        return 1 / zoomScale;
    };
    
    
    //- ビネットスプライトの追尾
    function chaseVignetteSprite(sceneType, sprite, vignette, i) {
        if (sceneType == "battle") { return; }
        if (!vignette.chase) { return; }
        const target = vignette.chase.target;
        if (!target) { return; }
        const tageSprite = searchSpriteChara(target);
        const tageH = tageSprite ? tageSprite._frame.height : 0;
        const tageX = target.screenX();
        const tageY = target.screenY() - tageH / 2;
        sprite.x = tageX + (vignette.offsetXSpin != null ? vignette.offsetXSpin : vignette.offsetX);
        sprite.y = tageY + (vignette.offsetYSpin != null ? vignette.offsetYSpin : vignette.offsetY);
    };
    
    
    
    //==================================================
    //--  アイリスエフェクトの開始
    //==================================================
    
    //- アイリスエフェクトの開始
    function startIrisEffect(args) {
        // シーン開始時か
        if (inSceneOpen()) { args.inSceneOpen = inSceneOpen(); }
        // 対象ビネットを取得
        const vignettes = getTargetVignette(args);
        // アイリスエフェクトの1個制限
        limitIrisEffectOne(args, startIrisEffect_a, vignettes);
    };
    
    
    //- アイリスエフェクトの1個制限
    function limitIrisEffectOne(args, handler, vignettes = [null]) {
        const gm = getGm();
        let vignette = vignettes[0];
        // 他がアイリス中なら予約してリターン
        if ((inIrisEffect() || !SceneManager._scene._spriteset) && !(vignette && vignette.irisEffect)) {
            // アイリス予約のセット
            vignettes.forEach(vnt => setIrisAppo(args, handler, vnt)); 
            return true;
        }
        // ターゲットが複数なら最初以外を予約
        if (vignettes.length >= 2) {
            vignettes.shift();
            // アイリス予約のセット
            vignettes.forEach(vignette => setIrisAppo(args, handler, vignette)); 
        }
        // アイリス中ならキュッシュを終了
        if (vignette && vignette.irisEffect) {
            // アイリスキャッシュの終了
            endIrisCash(vignette.irisEffect);
            vignette.irisEffect = null;
        }
        // ハンドラ実行
        handler(args, vignette);
    };
    
    
    //- アイリス予約のセット
    function setIrisAppo(args, handler, vignette) {
        const gm = getGm();
        if (!gm._irisApposKe) { gm._irisApposKe = []; }
        gm._irisApposKe.push({ args:args, handler:handler, vignette:vignette });
    };
    
    
    //- アイリス予約の更新
    function updateIrisAppo(gm) {
        if (!gm._irisApposKe || !gm._irisApposKe.length) { return; }
        if (!SceneManager._scene._spriteset) { return; }
        const appo = gm._irisApposKe[0];
        if (inIrisEffect()) { return; }
        appo.handler(appo.args, appo.vignette);
        gm._irisApposKe.shift();
    };
    
    
    //- アイリスエフェクトの開始a
    function startIrisEffect_a(args, vignette) {
        const gm = getGm();
        // アイリスエフェクトの開始2
        startIrisEffect2(args, vignette);
    };
    
    
    //- アイリスエフェクトの開始2
    function startIrisEffect2(args, vignette) {
        // アイリスキャッシュの作成-パラムから
        const wait = makeIrisCashByParam(args, vignette, startIrisEffect2_a);
        if (!wait) { startIrisEffect2_a(args, vignette); }
    };
    
    
    //- アイリスエフェクトの開始2a
    function startIrisEffect2_a(args, vignette) {
        // 対象ビネットがなければリターン
        const vignettes = getTargetVignette(args);
        if (!vignettes || !vignettes.length) {
            destroyCash(args.cashName);
            remIrisWait(args.preter);
            return;
        }
         // アイリスエフェクトの開始3
        startIrisEffect3(args, vignette);
    };
    
    
    //- アイリスエフェクトの開始3
    function startIrisEffect3(args, vignette) {
        const iris = args.iris || {};
        // アイリスパラムの変換-基本
        convertIrisParamBasic(iris, args);
        let cashs = null;
        // キャッシュ名からキャッシュを取得
        iris.cashName = args.cashName;
        cashs = getIrisCash(iris.cashName);
        // キャッシュのセット
        if (cashs) {
            // 動作速度
            const cashTime = cashs.length - 1;
            iris.cashSpeed = roundDecimal(cashTime / iris.timeMax, 100);
            // 開始ポイント
            iris.startPoint = args["…開始ポイント"] ? Number(args["…開始ポイント"]) / 100 : 0;
            // 終了ポイント
            iris.endPoint = args["…終了ポイント"] ? Number(args["…終了ポイント"]) / 100 : 1;
            // 逆再生
            if (iris.startPoint > iris.endPoint) {
                iris.backPlay = true;
                const start = iris.startPoint;
                iris.startPoint = 1 - iris.startPoint;
                iris.endPoint = 1 - iris.endPoint;
            }
            // その他
            iris.preBitmaps = [];
            iris.lastIndex = iris.backPlay ? cashs.length - 1 : 0;
        }
        // 変動をセット
        const params = ["toneRed", "toneGreen", "toneBlue", "opacity", "scaleX", "scaleY", "angle"];
        const words = ["カラー赤", "カラー緑", "カラー青", "不透明度", "スケールX", "スケールY", "回転角"];
        params.forEach((param, i) => {
            const word = words[i];
            // 非コモン・非ピクチャ時はカラートーンしない
            if (param.includes("tone") && !(args.commonName ||vignette.picture)) { return; }
            if (!args[word]) { return; }
            iris[param+"Drift"] = makeDrift(args[word],vignette[param], iris.timeMax, iris.easing, word);
            if (param.includes("tone")) { iris.toneChange = true; }
        });
        // ずらしを適用
       vignette.offsetX = args["ずらしX"] ? Number(args["ずらしX"]) : vignette.offsetX;
       vignette.offsetY = args["ずらしY"] ? Number(args["ずらしY"]) : vignette.offsetY;
        // ビネットアニメのセット
        setVignetteAnime(vignette, args);
        // ビネット追尾のセット
        setVignetteChase(vignette, args);
        // アイリスをセット
        vignette.irisEffect = iris;
        // 時間 0 の時はすぐ更新
        if (!iris.timeMax) {
            const spriteset = SceneManager._scene._spriteset;
            if (spriteset) { updateIrisEffect(spriteset, null, vignette, i); }
        }
        args.preter = null;
    };
    
    
    //- ビネット操作の開始
    function startVignetteControl(args) {
        // 対象ビネットを取得
        const targets = getTargetVignette(args);
        // アイリスパラムの変換-基本
        const ctrl = {};
        convertIrisParamBasic(ctrl, args);
        // 全ての対象に処理
        targets.forEach(vnt => {
            // 変動をセット
            const params = ["offsetX", "offsetY", "scaleX", "scaleY", "angle"];
            const words = ["ずらしX", "ずらしY", "スケールX", "スケールY", "回転角"];
            params.forEach((param, i) => {
                const word = words[i];
                if (!args[word]) { return; }
                ctrl[param+"Drift"] = makeDrift(args[word], vnt[param], ctrl.timeMax, ctrl.easing, word);
            });
            // 操作をセット
            if (!vnt.vntControls) { vnt.vntControls = []; }
            vnt.vntControls.push(ctrl);
             // 時間 0 の時はすぐ更新
            if (!ctrl.timeMax) {
                const spriteset = SceneManager._scene._spriteset;
                if (spriteset) { updateVignetteControl(spriteset, null, vnt, i); }
            }
        });
        args.preter = null;
    };
    
    
    //- ビネット設定の変更
    function changeVignetteConfig(args) {
        // 対象ビネットを取得
        const targets = getTargetVignette(args);
        if (!targets || !targets.length) { return; }
        // 全ての対象に処理
        targets.forEach(vnt => {
            // ビネット持ち越しの変更
            vnt.takeOver = args["ビネット持ち越し"] ? eval(args["ビネット持ち越し"]) : vnt.takeOver;
            // ビネットアニメのセット
            setVignetteAnime(vnt, args);
            // ビネット追尾のセット
            setVignetteChase(vnt, args);
        });
    };
    
    
    //- 対象ビネットの取得
    function getTargetVignette(args) {
        const gm = getGm();
        const vignettes = gm._vignettesKe;
        if (!vignettes) { return null; }
        let targets = [];
        // 対象ビネット情報を取得
        let names = args["対象ビネット-名前"];
        let ids = args["対象ビネット-ID"];
        if (names) { names = names.replace(/\s/g, "").split(","); }
        if (ids) { ids = ids.replace(/\s/g, "").split(",").map(id => Number(id) - 1); }
        // 対象を取得
        vignettes.forEach(vnt => {
            // 対象ビネットか判定
            let ok = false;
            if (names && names.some(n => vnt.name ? vnt.name.includes(n) : 0)) { ok = true; }
            if (ids && ids.includes(i)) { ok = true }
            if (!ok) { return; }
            targets.push(vnt);
        });
        return targets;
    };
    
    
    //- アイリスパラムの変換-基本
    function convertIrisParamBasic(p, args, toRoute) {
        p.timeMax = toRoute ? Number(args["…アニメ枚数"]) || 1 : makeTime(args["動作時間"]) || 1;
        p.dura = 0;
        let easing = args["イージング"];
        p.easing = easing == "イージング" ? "e" : easing == "イージングアウト" ? "eo" : easing == "イージングイン" ? "ei" : null;
        p.delEndAct = eval(args["実行後消去"]);
        p.preter = args.preter;
        p.commonName = args.commonName;
    };
    
    
    //- アイリスパラムの変換-形
    function convertIrisParamForm(p, args, vnt) {
        let radiusX = args["→内枠-半径X"] || args["内枠-半径X"];
        radiusX = radiusX ? (Graphics.width * Number(radiusX) / 100).toString() : null;
        let radiusY = args["→内枠-半径Y"] || args["内枠-半径Y"];
        radiusY = radiusY ? (Graphics.height * Number(radiusY) / 100).toString() : null;
        let params = ["radiusX", "radiusY", "red", "green", "blue", "blur", "squareRoundLine", "squareRoundEdge", "circleToFan", "ellipseAngle", "diyaRound", "gizaOutX", "gizaOutY", "beltRound"];
        let words = ["内枠-半径X", "内枠-半径Y", "カラー赤", "カラー緑", "カラー青", "ぼかし度", "スクエア-線丸み", "スクエア-角丸み", "円形-扇型化", "楕円-回転角", "ダイヤ-線丸み", "ギザギザ-トゲ長さX", "ギザギザ-トゲ長さY", "帯-線丸み"];
        const cfg =  args["…フォーム設定"] ? JSON.parse(args["…フォーム設定"]) : {};
        // パラムごとに処理
        params.forEach((param, i) => {
            const word = words[i];
            // 値を取得
            let v = args["→"+word] || args[word] || cfg[word];
            // 半径の処理
            if (param.includes("radius")) {
                v = v ? (Graphics.width * Number(v) / 100).toString() : null;
            }
            // 変動をセット
            if (v) {
                if (param == "circleToFan") {
                    vnt[param] = v;
                } else {
                    p[param+"Drift"] = makeDrift(v, vnt[param], p.timeMax, p.easing, word);
                }
            }
        });
        return p;
    };
    
    
    //- 変動の作成
    function makeDrift(tage, current, time, easing, word) {
        if (!tage) { return; }
        const d = {};
        if (word == "回転角") { current %= 360; }
        d.timeMax = time || 1;
        d.dura = 0;
        d.num = 1;
        d.start = roundDecimal(current, 1000000);
        d.vol = Number(tage) - d.start;
        d.end = d.start + d.vol;
        d.easing = easing;
        d.speed = d.vol / time;
        d.total = 0;
        d.pre = 0;
        if (d.start == d.end) { return null; }
        return d;
    };
    
    
    
    //==================================================
    //--  アイリスエフェクトの更新
    //==================================================
    
    //- アイリスエフェクトの更新
    function updateIrisEffect(spriteset, sceneType, vignette, i) {
        if (!vignette.irisEffect) { return; }
        const iris = vignette.irisEffect;
        // スプライテスを取得
        const sprites = vignetteSprites();
        // カウント
        iris.dura++;
        // アイリスエフェクトの更新-キャッシュ
        if (iris.cashName) { updateIrisEffectCash(sceneType, vignette, i, iris, sprites); }
        // 各パラムの更新
        const params = ["toneRed", "toneGreen", "toneBlue", "opacity", "offsetX", "offsetY", "scaleX", "scaleY", "angle"];
        const words = ["カラー赤", "カラー緑", "カラー青", "不透明度", "ずらしX", "ずらしY", "スケールX", "スケールY", "回転角"];
        params.forEach((param, i) => {
            const word = words[i];
            // トーン変更がない時はカラートーンしない
            if (param.includes("tone") && !iris.toneChange) { return; }
            // 変動を適用
            if (iris[param+"Drift"]) {
                const plus = updateDrift(iris[param+"Drift"], word)
                vignette[param] += plus;
                // 不透明度の追加処理
                if (param.includes("opacity")) { vignette.opacityOri += plus; }
                // 回転角の追加処理
                if (param.includes("angle")) { vignette.anglePi = angleToRadian(vignette.angle); }
            }
        });
        // カラートーンの追加処理
        if (iris.toneChange && sprites && sprites[i]) {
            if (iris.dura % keke_colorToneSmooth == 0 || iris.dura >= iris.timeMax - 1) {
                sprites[i].setColorTone([vignette.toneRed, vignette.toneGreen, vignette.toneBlue, 0]);
            }
        }
        // 終了
        if (iris.dura >= iris.timeMax) {
            // アイリスエフェクトの終了
            endIrisEffect(vignette, iris, i);
        }
    };
    
    
    //- アイリスエフェクトの更新-キャッシュ
    function updateIrisEffectCash(sceneType, vignette, i, iris, sprites) {
        if (!sprites) { return; }
       // 現在のスプライトを取得
        const sprite = sprites[i];
        if (!sprite) { return; }
        // キャッシュを取得
        const cashs = getIrisCash(iris.cashName);
        if (!cashs) { return; }
        // 現在のインデックスを取得
        const length = cashs.length - 1;
        const startCut = Math.floor(iris.startPoint * length);
        const totalGo = Math.max(1 - iris.startPoint - (1 - iris.endPoint), 0);
        let index = startCut + Math.ceil(iris.dura * iris.cashSpeed * totalGo);
        if (iris.backPlay) { index = length - index; }
        if (index == iris.lastIndex) { return; }
        // 前のビットマップを破棄
        if (sprite.bitmap) { sprite.bitmap.destroy(); }
        // ビットマップを差し替え
        sprite.bitmap = cashs[index];
        if (!iris.commonName) { cashs[index] = null; }
        // 最後のインデックス
        iris.lastIndex = index;
    };
    
    
    //- ビネット操作の更新
    function updateVignetteControl(spriteset, sceneType, vignette, i) {
        if (!vignette.vntControls || !vignette.vntControls.length) { return; }
        const controls = vignette.vntControls;
        let del = false;
        controls.forEach((ctrl, j) => {
            if (!ctrl) { return; }
            // ビネット操作の更新-個別
            del = updateVignetteControlEach(ctrl, controls, j, spriteset, sceneType, vignette, i)
        });
        // null を消去
        if (del) {
            vignette.vntControls = controls.filter(ctrl => ctrl);
        }
    };
    
    
    //- ビネット操作の更新-個別
    function updateVignetteControlEach(ctrl, controls, j, spriteset, sceneType, vignette, i) {
        // スプライテスを取得
        const sprites = vignetteSprites();
        // カウント
        ctrl.dura++;
        // 各パラムの更新
        const params = ["offsetX", "offsetY", "scaleX", "scaleY", "angle"];
        const words = ["ずらしX", "ずらしY", "スケールX", "スケールY", "回転角"];
        params.forEach((param, i) => {
            const word = words[i];
            // 変動を適用
            if (ctrl[param+"Drift"]) {
                const plus = updateDrift(ctrl[param+"Drift"], word)
                vignette[param] += plus;
                // 不透明度の追加処理
                if (param.includes("opacity")) { vignette.opacityOri += plus; }
                // 回転角の追加処理
                if (param.includes("angle")) { vignette.anglePi = angleToRadian(vignette.angle); }
            }
        });
        // 終了
        if (ctrl.dura >= ctrl.timeMax) {
            controls[j] = null;
            // 操作ウェイトの解除
            remControlWait(ctrl.preter);
            return true;
        }
        return false;
    };
    
    
    //- 変動の更新
    function updateDrift(d, word) {
        let r = 0;
        d.dura++;
        // イージング
        if (d.easing) {
            let next = 0;
            if (d.easing == "eo") {
                next = Math.sin(Math.PI * (d.dura / d.timeMax * 0.5)) * d.vol;
            } else if (d.easing == "ei") {
                next = Math.sin(Math.PI * (d.dura / d.timeMax * 0.5 + 1.5)) * d.vol + d.vol;
            } else if (d.easing == "e") {
                next = (Math.sin(Math.PI * (d.dura / d.timeMax * 1 + 1.5)) * d.vol + d.vol) / 2;
            }
            r = next - d.pre;
            d.pre = next;
        // 通常
        } else {
            r = d.speed;
        }
        d.total += r;
        // 終了
        if (d.dura >= d.timeMax) {
            // 終了値に合わせる
            r += roundDecimal(d.vol - d.total, 1000000);
            d.num--;
            d.dura = 0;
            d.total = 0;
        }
        return r;
    };
    
    
    //- アイリスエフェクトの終了
    function endIrisEffect(vignette, iris) {
        vignette.irisEffect = null;
        // アイリスとビネットの同期
        adjustIrisVignette(vignette, iris);
        // アイリスキャッシュの終了
        endIrisCash(iris);
        // 実行後消去
        if (iris.delEndAct) {
            vignette.delFlag = true;
        }
        // アイリスウェイトの解除
        remIrisWait(iris.preter);
        // アイリス中フラグを解除
        //getGm()._inIrisEffectKe = null;
    };
    
    
    //- 前のビットマップの破棄
    function destroyPreBitmap(iris) {
        if (!iris.preBitmap) { return; }
        const preBitmaps = iris.preBitmaps;
        preBitmaps.forEach((bitmap, i) => {
            if (!bitmap) { return; }
            bitmap.destroy();
        });
    };
    
    
    //- アイリスキャッシュの終了
    function endIrisCash(iris) {
        const callName = iris.cashName;
        // キャッシュの破棄
        destroyCash(callName, iris.lastIndex);
    };
    
    
    //- アイリスとビネットの同期
    function adjustIrisVignette(vignette, iris) {
        let params = ["radiusX", "radiusY", "red", "green", "blue", "blur", "squareRoundLine", "squareRoundEdge", "ellipseAngle", "diyaRound", "gizaOutX", "gizaOutY", "beltRound"];
        let words = ["内枠-半径X", "内枠-半径Y", "カラー赤", "カラー緑", "カラー青", "ぼかし度", "スクエア-線丸み", "スクエア-角丸み", "楕円-回転角", "ダイヤ-線丸み", "ギザギザ-トゲ長さX", "ギザギザ-トゲ長さY", "帯-線丸み"];
        params.forEach((param, i) => {
            if (iris[param+"Drift"]) { vignette[param] = iris[param+"Drift"].end; }
        });
    };
    
    
    // アイリスエフェクト中か
    function inIrisEffect() {
        const gm = getGm();
        if (!gm._vignettesKe || !gm._vignettesKe.length) { return; }
        const vignettes = gm._vignettesKe;
        return vignettes.some(vnt => {
            if (!vnt.irisEffect) { return false; }
            return vnt.irisEffect.cashName;
        });
    };
    
    
    // アイリスエフェクト中はメニュー開かない
    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        if (inIrisEffect()) { return; }
        _Scene_Map_callMenu.call(this);
    };
    
    
    
    //==================================================
    //--  キャッシュの作成
    //==================================================
    
    //- アイリスキャッシュの作成-パラムから
    function makeIrisCashByParam(args, vignette, handler) {
        // フォーム変更がなければキャッシュなし
        if (!needFormChange(args)) { return false; }
        // キャッシュ作成準備
        const im = ImageManager;
        if (!im._irisCashIdKe) { im._irisCashIdKe = 0; }
        let callName = "paramKe_" + im._irisCashIdKe;
        im._irisCashIdKe++;
        // アイリスキャッシュの作成
        const wait = makeIrisCash(args, null, callName,  vignette, handler);
        return wait;
    };
    
    
    //- フォーム変更があるか
    function needFormChange(args) {
        return args["内枠-フォーム"] || args["内枠-半径X"] || args["内枠-半径Y"] || args["カラー赤"] || args["カラー緑"] || args["カラー青"] || args["ぼかし度"]
    };
    
    
    //- アイリスキャッシュの作成-コモンから
    function makeIrisCashByCommon(args, callName, handler, speed) {
        // フォーム変更がなければキャッシュなし
        if (!callName) { return false; }
         // コモンデータの取得
        const data = getCommonData(callName);
        if (!data) { return false; }
        args.commonName = callName;
        // アイリスキャッシュの作成
        return makeIrisCash(args, data, callName, null, handler, speed);
    };
    
    
    //- アイリスキャッシュの作成
    function makeIrisCash(args, data, callName, vignette, handler, speed) {
        const im = ImageManager;
        // アイリスルートの作成
        const route = makeIrisRoute(data || args, vignette);
        if (!route) { return false; }
        // キャッシュを初期化
        if (!im._irisCashsKe) { im._irisCashsKe = {}; }
        if (!im._irisCashsKe[callName]) { im._irisCashsKe[callName] = { list:[], comp:false, sprites:[], noDestroy:false }} else { return false; }
        // シーン開始時の場合、キャッシュが破棄されないようにする
        if (args.inSceneOpen) {
            let ok = false;
            const preScene = SceneManager._previousScene;
            // マップ条件
            if (args.inSceneOpen == "map" &&  preScene && preScene._spriteset) { ok = true; }
            // バトル条件
            if (args.inSceneOpen == "battle" && SceneManager._scene.constructor.name == "Scene_Map") { ok = true; }
            if (ok) { im._irisCashsKe[callName].noDestroy = true; }
        }
        // 読み込みパックにセット
        speed = Math.max((speed || keke_irisLoadSpeed) - 1, 0);
        if (!im._irisLoadPacksEachKe) { im._irisLoadPacksEachKe = []; }
        im._irisLoadPacksEachKe.push({ route:route, callName:callName, loading:false, index:-1, speed:speed })
        const packs = im._irisLoadPacksEachKe;
        const spriteset = SceneManager._scene._spriteset;
        const sceneType = spriteset.constructor.name == "Spriteset_Map" ? "map" : "battle";
        args.cashName = callName;
        // 止めずに読み込み
        if (eval(args["止めずに読み込み"])) {
            // アイリス画像の読み込みセット
            setIrisImageLoad(packs, args, vignette, handler);
            return true;
        // 一気に読み込み
        } else {
            while (packs.length) {
                // アイリス画像の読み込み
                loadIrisImage(packs);
            }
            return false;
        }
    };
    
    
    //- アイリスルートの作成
    function makeIrisRoute(args, vignette) {
        // ビネットがなければ作成
        if (!vignette) {
            vignette = {};
            // ビネットパラムの変換-フォーム
            convertVignetteParamForm(vignette, args);
        }
        // ビネットパラムの変換-基本
        convertVignetteParamBasic(vignette, args);
        // アイリスパラムの変換-基本
        const iris = {};
        convertIrisParamBasic(iris, args, true);
        // アイリスパラムの変換-形
        convertIrisParamForm(iris, args, vignette); 
        // アイリスルートの計算
        const route = calcIrisRoute(iris, vignette);
        // アイリスを保存
        args.iris = iris;
        return route;
    };
    
    
    //- アイリスルートの計算
    function calcIrisRoute(iris, vignette) {
        const route = [];
        let r = {};
        let params = ["radiusX", "radiusY", "red", "green", "blue", "blur", "squareRoundLine", "squareRoundEdge", "ellipseAngle", "diyaRound", "gizaOutX", "gizaOutY", "beltRound"];
        let words = ["内枠-半径X", "内枠-半径Y", "カラー赤", "カラー緑", "カラー青", "ぼかし度", "スクエア-線丸み", "スクエア-角丸み", "楕円-回転角", "ダイヤ-線丸み", "ギザギザ-トゲ長さX", "ギザギザ-トゲ長さY", "帯-線丸み"];
        // ルートへのパラム渡し
        r = giveParamToRoute(vignette);
        // 最初の値を取得
        params.forEach((param, i) => {
            r[param] = vignette[param];
        });
        route[0] = r;
        const timeMax = iris.timeMax || 1;
        let i = 0;
        while (iris.dura < timeMax) {
            i++;
            // ルートへのパラム渡し
            r = giveParamToRoute(vignette);
            // 各パラムを変動
            params.forEach((param, j) => {
                const word = words[j];
                if (iris[param+"Drift"]) { r[param] = route[i - 1][param] + updateDrift(iris[param+"Drift"], word); } else { r[param] = vignette[param]; }
            });
            route[i] = r;
            // カウント
            iris.dura++;
        }
        iris.dura = 0;
        return route;
    };
    
    
    // ルートへのパラム渡し
    function giveParamToRoute(vignette) {
        const r =  {};
        r.name = vignette.name;
        r.layer = vignette.layer;
        r.insert = vignette.insert;
        r.takeOver = vignette.takeOver;
        r.picture = vignette.picture;
        r.form = vignette.form;
        r.formCfg = vignette.formCfg;
        return r;
    };
    
    
    // アイリス画像の読み込みセット
    function setIrisImageLoad(packs, args, vignette, handler) {
        const im = ImageManager;
        if (!im._irisImageLoadesKe) { im._irisImageLoadesKe = []; }
        im._irisImageLoadesKe.push({ args:args, vignette:vignette, packs:packs, handler:handler });
    };
    
    
    // アイリス画像の読み込み更新
    function updateIrisImageLoad() {
        const im = ImageManager;
        const loades = im._irisImageLoadesKe;
        if (!loades || !loades.length) { return; }
        // ひとつずつ読み込む
        const box= loades[0];
        const args = box.args;
        const vignette = box.vignette;
        const packs = box.packs;
        const handler = box.handler;
        if (!args || !args.cashName) {
            loades.shift();
            return;
        }
        // アイリス画像の読み込み
        loadIrisImage(packs);
        // 終了
        if (!packs.length) {
            im._irisImageLoadesKe = null;
            // コモンロードでなければハンドラ実行
            if (!args.isCommonLoad) {
                handler(args, vignette);
            }
        }
    };
    
    
    //- アイリス画像の読み込み
    function loadIrisImage(packs) {
        if (!packs || !packs.length) { return false; }
        if (packs[0].wait) { packs[0].wait--; return true; }
        if (packs[0].loading) { return true; }
        const im = ImageManager;
        const pack = packs[0];
        const route = pack.route;
        // カウント
        pack.index++;
        // ルートデータを取得
        const iris = route[0];
        // 読み込み済みでなければ読み込む
        const cash = im._irisCashsKe[pack.callName];
        const cashList = cash.list;
        if (!cashList[pack.index]) {
            // ビネットビットマップの形成
            const bitmap = createVignetteBitmap(iris);
            // ウェイトをセット
            pack.loading = true;
            if (pack.onBack) { pack.wait = pack.speed; }
            // 読み込み完了を待つ
            bitmap.addLoadListener(function() {
                pack.loading = false;
                // キャッシュに追加
                cashList.push(bitmap);
                // ルートを減らす
                route.shift();
            })
        }
        // 終了
        if (!route.length) {
            // キャッシュcompのセット
            setCashComp(cash);
            packs.shift();
        }
        return true;
    };
    
    
    //- ビネットキャッシュの取得
    function getVignetteCash(callName, point = 0) {
        const im = ImageManager;
        if (!im._irisCashsKe) { return; }
        const cashs = im._irisCashsKe;
        if (!cashs[callName]) { return; }
        if (!cashs[callName].comp) { return; }
        const sprites = cashs[callName].list;
        const index = Math.round((sprites.length - 1) * (point / 100));
        return sprites[index];
    };
    
    
    //- アイリスキャッシュの取得
    function getIrisCash(callName) {
        const im = ImageManager;
        if (!im._irisCashsKe) { return; }
        if (!im._irisCashsKe[callName]) { return; }
        if (!im._irisCashsKe[callName].comp) { return; }
        return im._irisCashsKe[callName].list;
    };
    
    
    //- キャッシュcompのセット
    function setCashComp(cash) {
        cash.comp = true;
    };
    
    
    
    //==================================================
    //--  キャッシュの破棄
    //==================================================
    
    //- キャッシュの破棄
    function destroyCash(cashName, lastIndex, omitOnly) {
        if (!ImageManager._irisCashsKe) { return; }
        const cashs = ImageManager._irisCashsKe;
        if (!cashs[cashName]) { return; }
        const cash = cashs[cashName];
        // 必要なら、最後のキャッシュを除外
        if (lastIndex != null) { cash.list[lastIndex] = null; }
        if (omitOnly) { return; }
        // 対象のキャッシュを破棄
        cash.list.forEach(bitmap => {
            if (!bitmap) { return; }
            bitmap.destroy();
        });
        delete cashs[cashName];
    };
    
    
    //- キャッシュの全破棄
    function destroyCashAll() {
        if (!ImageManager._irisCashsKe) { return; }
        const cashs = ImageManager._irisCashsKe;
        Object.keys(cashs).forEach(k => {
            if (!cashs[k]) { return; }
            if (cashs[k].noDestroy) {
                cashs[k].noDestroy = null;
                return;
            }
            cashs[k].list.forEach(bitmap => {
                if (bitmap) { bitmap.destroy(); }
            });
            delete cashs[k];
        });
        
    };
    
    
    
    //==================================================
    //--  ビネットコモン & アイリスコモン
    //==================================================
    
    //- ビネットコモンの開始
    function startVignetteCommon(args) {
        const callName = convertVariable(args["呼び出すコモン"]);
        if (!callName || callName == "0") { return; }
        // コモンデータのコピー
        copyCommonData(args, callName)
        args.commonSub = true;
        // ビネットの開始
        startVignette(args);
    };
    
    
    //- コモンデータのコピー
    function copyCommonData(args, callName) {
        // コモンデータの取得
        const data = getCommonData(callName);
        if (!data) { return; }
        const point = Number(args["…取得ポイント"]) / 100;
        const dRadiusX = Number(data["内枠-半径X"]);
        const dRadiusY = Number(data["内枠-半径Y"]);
        const radiusX = dRadiusX + (Number(data["→内枠-半径X"]) - dRadiusX) * point;
        const radiusY = dRadiusY + (Number(data["→内枠-半径Y"]) - dRadiusY) * point;
        // データをコピー
        args["ピクチャ使用"] = data["ピクチャ使用"];
        args["内枠-フォーム"] = data["内枠-フォーム"];
        args["…フォーム設定"] = data["…フォーム設定"];
        args["内枠-半径X"] = radiusX;
        args["内枠-半径Y"] = radiusY;
        args["ぼかし度"] = data["ぼかし度"];
        return true;
    };
    
    
     // コモンデータの取得
    function getCommonData(callName, type) {
        const datas = keke_commonList;
        let data = null;
        for (const d of datas) {
            if (d["コモン名"] == callName) {
                data = d;
                break;
            }
        } 
        return data;
    };
    
    
    //- アイリスコモンの開始
    function startIrisCommon(args) {
        // シーン開始時か
        if (inSceneOpen()) { args.inSceneOpen = inSceneOpen(); }
        let callName = convertVariable(args["呼び出すコモン"]);
        if (!callName || callName == "0") { remIrisWait(args.preter);  return; }
        args.commonName = callName;
        args.isCommon = true;
        // アイリスエフェクトの1個制限
        limitIrisEffectOne(args, startIrisCommon_a);
    };
    
    
    //- アイリスコモンの開始a
    function startIrisCommon_a(args) {
        // アイリスキャッシュの取得
        const cash = getIrisCash(args.callName);
        // キャッシュがあるならアイリスコモンの開始2
        if (cash) {
            args.cashName = args.commonName;
            startIrisCommon2(args);
            return
        }
        // ないならアイリスキャッシュの作成-コモンから
        const wait = makeIrisCashByCommon(args, args.commonName, startIrisCommon2);
        if (!wait) { startIrisCommon2(args); }
    };
    
    
    //- アイリスコモンの開始2
    function startIrisCommon2(args) {
        // 対象ビネットを取得
        const vignettes = getTargetVignette(args);
        if (!vignettes) { return; }
        // ビネットごとに処理
        vignettes.forEach((vnt, i) => {
            // アイリスエフェクトの開始3
            startIrisEffect3(args, vnt);
            vignettes[i].irisEffect = copyHash(vnt.irisEffect);
        });
    };
    
    
    
    //==================================================
    //--  ビネットの終了
    //==================================================
    
    //- ビネットの削除
    function eraseVignette(args) {
        const gm = getGm();
        if (!gm._vignettesKe) { return }
        const fadeTime = makeTime(args["フェードアウト時間"]);
        // すべて削除
        if (eval(args["すべて削除"])) { clearVignette(gm, fadeTime); }
        // IDで削除
        if (args["IDで削除"]) { delVignette(gm, args["IDで削除"], fadeTime); }
        // 名前で削除
        if (args["名前で削除"]) { delVignette(gm, null, args["名前で削除"], fadeTime); }
    };
    
    
    //- ビネットの消去
    function delVignette(gm, ids, names, fadeTime) {
        const vignettes = gm._vignettesKe;
        if (!vignettes) { return; }
        if (ids) { ids = ids.replace(/\s/g, "").split(",").map(id => Number(id) - 1); }
        if (names) { names = names.replace(/\s/g, "").split(","); }
        const dels = [];
        // データ消去
        let del = false;
        vignettes.forEach((vnt, i) => {
            if (ids && !ids.includes(i)) { return; } else
            if (names && !names.some(n => vnt.name.includes(n))) { return; }
            vnt.delFlag = true;
            // フェードのセット
            setFade(vnt, fadeTime, -1);
            // ウェイトを消去
            const iris = vnt.irisEffect;
            if (iris) { remIrisWait(iris.preter); }
            const ctrls = vnt.vntControls;
            if (ctrls && ctrls.length) { ctrls.forEach(ctrl => remControlWait(ctrl.preter)); }
            del = true;
        });
        return del;
    };
    
    
    //- ビネット消去の更新
    function updateVignetteDel(spriteset, sceneType, vignette, vignettes, i) {
        if (!vignette.delFlag) { return false; }
        if (vignette.fadeTime) { return false; }
        let deled = false;
        // 通常スプライト
        const sprites = vignetteSprites();
        if (sprites && sprites[i]) {
            // データ消去
            vignette.delFlag = false;
            vignettes[i] = null;
            // スプライト破棄
            destroySprite(sprites[i]);
            sprites[i] = null;
            deled = true;
        }
        return deled;
    };
    
    
    
    //==================================================
    //--  文字列基本 /ベーシック
    //==================================================
    
    //- 変数の置換
    function convertVariable(str) {
        if (!str) { return str; }
        str = str.toString();
        const matches = str.match(/[\x1b\\]v\[(\d+)\]/gi);
        if (!matches) { return str; }
        matches.forEach(parts => {
            const match = parts.match(/\\[vV]\[(\d+)\]/);
            const id = Number(match[1]);
            const val = $gameVariables.value(id);
            str = str.replace(match[0], val);
        });
        return str;
    };
    
    
    
    //==================================================
    //--  計算基本 /ベーシック
    //==================================================
    
    //- 小数点を丸める
    function roundDecimal(val, rate) {
        const newVal = Math.floor(val* rate) / rate
        return newVal;
    };
    
    
    //- 角度をπに
    function angleToRadian(angle) {
        if (angle == null) { return; }
        angle *= (Math.PI / 180);
        return angle;
    };
    
    
    //- 時間の作成
    function makeTime(time) {
        time = time.toString();
        return Math.round(Number(time.match(/(\d+\.?\d*)/)[0]) * (time.match(/s/i) ? 60 : 1));
    };
    
    
    
    //==================================================
    //--  配列基本 /ベーシック
    //==================================================
    
    //- ハッシュのディープコピー
    function copyHash(hash) {
        const copy = {};
        Object.keys(hash).forEach(k => {
            if (hash[k].constructor.name == "Object") {
                copy[k] = copyHash(hash[k]);
            } else if (hash[k].constructor.name == "Array") {
                copy[k] = copyArray(hash[k]);
            } else {
                copy[k] = hash[k];
            }
        });
        return copy;
    };
    
    
    //- 配列のディープコピー
    function copyArray(array) {
        const copy = [];
        array.forEach((v, i) => {
            if (v.constructor.name == "Object") {
                copy[i] = copyHash(v);
            } else if (v.constructor.name == "Array") {
                copy[i] = copyArray(v);
            } else {
                copy[i] = v;
            }
        });
        return copy;
    };
    
    
    
    //==================================================
    //--  プラグインコマンド基本 /ベーシック
    //==================================================
    
    let plcmPreter = null;
    
    
    //- プラグインコマンド呼び出しプリターを保存(コア追加)
    const _PluginManager_callCommand = PluginManager.callCommand;
    PluginManager.callCommand = function(self, pluginName, commandName, args) {
        plcmPreter = self;
        _PluginManager_callCommand.call(this, self, pluginName, commandName, args);
        plcmPreter = null;
    };
    
    
     // プラグインコマンド呼び出しイベントを取得
    function getPlcmEvent() {
        if (!plcmPreter) { return; }
        const preter = plcmPreter;
        return preter.character(preter.eventId());
    };
    
    
    //- 名前でのキャラリスト取得
    function getCharasByName(names, self) {
        if (!names) { return []; }
        const nameList = names.replace(/\s/g, "").split(",");
        let charas = [];
        let match = null;
        for (const name of nameList) {
            // イベントを取得
            $gameMap.events().forEach(event => {
                const note = event.event().name + " " + event.event().note;
                if (note.includes(name)) { charas.push(event); }
            }, this);
            // セルフを取得
            if (name.match(/^(セルフ|自分|自身|self)$/)) {
                self = self || getPlcmEvent() || charaSpritePlcm._character;
                if (self) { charas.push(self); }
            }
            // プレイヤーを取得
            if (name.match(/^(プレイヤー|操作キャラ|player)$/)) {
                charas = [...charas, $gamePlayer];
            }
            // フォロワーを取得
            match = name.match(/^(フォロワー|フォロアー|隊列|隊列キャラ|follower)(\d*)$/)
            if (match) {
                const id = match[2] ? Number(match[2]) - 1 : 0;
                charas = id ? [...charas, $gamePlayer._followers._data[id]] : [...charas, ...$gamePlayer._followers._data];
            }
            // パーティを取得
            if (name.match(/^(パーティ|味方|味方全員|味方全体|party)$/)) {
                charas = [...charas, $gamePlayer, ...$gamePlayer._followers._data];
            }
            // 乗り物を取得
            match = name.match(/^(乗り物|乗物|乗機|vehicle)(\d*)$/);
            if (match) {
                const id = match[2] ? Number(match[2]) - 1 : 0;
                charas = id ? [...charas, $gameMap._vehicles[id]] : [...charas, ...$gameMap._vehicles];
            }
            // 全て取得
            if (name.match(/^(全て|すべて|全部|全体|all)$/)) {
                charas = [...$gameMap.events(), $gamePlayer, ...$gamePlayer._followers._data, ...$gameMap._vehicles];
            }
            // 選択なし
            if (name.match(/^(なし|無し|none)$/)) {
            }
        }
        charas = charas.filter(chara => chara);
        return charas;
    };
    
    
    //- IDでのキャラリスト取得
    function getCharasById(ids, self) {
        if (!ids) { return []; }
        const idList = !ids ? [] : strToNumList(ids.toString());
        let charas = [];
        for (const id of idList) {
            // イベントを取得
            if (id > 0) { charas.push($gameMap.event(id)); }
            // セルフを取得
            if (id == 0) {
                self = self || getPlcmEvent() || charaSpritePlcm._character;
                if (self && !idList.includes(self._eventId)) { charas.push(self); }
            }
            // プレイヤーを取得
            if (id == -1) { charas = [...charas, $gamePlayer]; }
            // フォロワーを取得
            if (id <= -10 && id >= -99) {
                charas = id == -10 ? [...charas, ...$gamePlayer._followers._data] : [...charas, $gamePlayer._followers._data[Math.abs(id) - 11]];
            }
            // 乗り物を取得
            if (id <= -100) {
                charas = id == -100 ? [...charas, ...$gameMap._vehicles] : [...charas, $gameMap._vehicles[Math.abs(id) - 101]];
            }
            // 全て取得
            if (id == -2) {
                charas = [...$gameMap.events(), $gamePlayer, ...$gamePlayer._followers._data, ...$gameMap._vehicles];
            }
        }
        charas = charas.filter(chara => chara);
        return charas;
    };
    
    
    //- 文字列の数字リスト化
    function strToNumList(str) {
        const list = [];
        str = str.replace(/\[/g, "");
        str = str.replace(/\]/g, "");
        const strs = str.split(",");
        let s2 = null;
        for (let s of strs) {
            if (s.includes("~")) {
                s2 = s.split("~");
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
    
    
    
    //==================================================
    //--  開始時プラグインコマンド /ベーシック
    //==================================================
    
    //- 開始時のプラグインコマンド実行
    function runPluginCmdStarting(list, regs = [], condition = "") {
        if (!list || !list.length) { return; }
        // あるなら開始時用インタープリターを作成
        const startingIp = new Game_InterpreterStartingKeVnef();
        startingIp.setup(list, regs, condition);
        while (1) {
            if (!startingIp.executeCommand()) { break; }
        }
    };
    
    
    //- 対象のプラグインコマンドか
    function isCanPluginCmd(cmd, regs = [], condition = "") {
        if (cmd.code != 357) { return false; }
        let result = false;
        const params = cmd.parameters;
        const args = params[3];
        let condiOk = condition ? false : true;
        if (eval(args[condition])) { condiOk = true; }
        const regsOk = params[1] ? regs.filter(reg => params[1].match(reg)).length : false;
        if (regsOk && condiOk) { result = true; }
        return result;
    };
    
    
    //- 開始時用インタープリター
    function Game_InterpreterStartingKeVnef() {
        this.initialize(...arguments);
    }
    
    Game_InterpreterStartingKeVnef.prototype = Object.create(Game_Interpreter.prototype);
    Game_InterpreterStartingKeVnef.prototype.constructor = Game_InterpreterStartingKeVnef;
    
    
    //- セットアップ
    Game_InterpreterStartingKeVnef.prototype.setup = function(list, regs, condition) {
        Game_Interpreter.prototype.setup.call(this, list);
        this._regsKe = regs;
        this._conditionKe = condition;
    };
    
    
    //- コマンド実行
    Game_InterpreterStartingKeVnef.prototype.executeCommand = function() {
        const cmd = this.currentCommand();
        if (cmd) {
            this._indent = cmd.indent;
            // 対象のプラグインコマンドのみ実行
            if (this.canExecute(cmd)) {
                const methodName = "command" + cmd.code;
                if (typeof this[methodName] === "function") {
                    if (!this[methodName](cmd.parameters)) {
                        return false;
                    }
                }
            }
            this._index++;
        } else {
            return false;
        }
        return true;
    };
    
    
    //- コマンド実行するか
    Game_InterpreterStartingKeVnef.prototype.canExecute = function(cmd) {
        result = false;
        if (cmd.code == 111) { result = true; }
        if (cmd.code == 411) { result = true; }
        if (cmd.code == 117) { result = true; }
        if (cmd.code == 357) {
            result = isCanPluginCmd(cmd, this._regsKe, this._conditionKe);
        }
        return result;
    };
    
    
    //- 開始時コモンイベントのセットアップ
    Game_InterpreterStartingKeVnef.prototype.setupChild = function(list, eventId) {
        if (!this._childInterpreter) { this._childInterpreter = new Game_InterpreterStartingKeVnef(this._depth + 1); }
        this._childInterpreter.setup(list, this._regsKe, this._conditionKe);
        while (1) {
            if (!this._childInterpreter.executeCommand()) { break; }
        }
    };
    
    
    
    //==================================================
    //--  スプライト基本 /ベーシック
    //==================================================
    
    //- スプライトの検索-キャラクター
    function searchSpriteChara(chara) {
        let result = null;
        const sprites = SceneManager._scene._spriteset._characterSprites;
        for (let sprite of sprites) {
            if (isSameChara(sprite._character, chara)) {
                result = sprite;
                break;
            }
        }
        return result;
    };
    
    
    //- 同じキャラか
    function isSameChara(a, b) {
        if (!a) { return !b; }
        if (!b) { return !a; }
        if (a._eventId) {
            if (!b._eventId) { return false; }
            return a._eventId == b._eventId;
        }
        if (a._followers && b._followers) { return true; }
        if (a._memberIndex && a._memberIndex == b._memberIndex) { return true; }
        if (a._type && a._type == b._type) { return true; }
        return false;
    };
    
    
    
    //==================================================
    //--  図形描画 /ベーシック
    //==================================================
    
    //- スクエアのデザイン
    function designSquare(bitmap, x, y, w, h,  roundLine = 0, roundEdge = 0, corner = "", lineW = 0, keep = false) {
        const context = bitmap._context;
        if (!keep) { context.beginPath(); }
        const x2 = x + w / 2;
        const y2 = y + h / 2;
        const x3 = x + w;
        const y3 = y + h;
        const c1 = corner.includes("1") ? 0 : roundEdge;    // 左上
        const c2 = corner.includes("2") ? 0 : roundEdge;    // 左下
        const c3 = corner.includes("3") ? 0 : roundEdge;    // 右上
        const c4 = corner.includes("4") ? 0 : roundEdge;    // 右下
        context.moveTo(x + c1,  y);
        // 右上
        if (roundLine) {
            context.quadraticCurveTo(x2,  y + roundLine,  x3 - c3,  y);
        } else {
            context.lineTo(x3 - c3,  y);
        }
        context.quadraticCurveTo(x3,  y,  x3,  y + c3);
        // 右下
        if (roundLine) {
            context.quadraticCurveTo(x3 - roundLine,  y2,  x3,  y3 - c4);
        } else {
            context.lineTo(x3,  y3 - c4);
        }
        context.quadraticCurveTo(x3,  y3,  x3 - c4,  y3);
        // 左下
        if (roundLine) {
            context.quadraticCurveTo(x2,  y3 - roundLine,  x + c2,  y3);
        } else {
            context.lineTo(x + c2,  y3);
        }
        context.quadraticCurveTo(x,  y3,  x,  y3 - c2);
        // 左上
        if (roundLine) {
            context.quadraticCurveTo(x + roundLine,  y2,  x,  y + c1);
        } else {
            context.lineTo(x,  y + c1);
        }
        if (c1) {
            context.quadraticCurveTo(x,  y,  x + c1,  y);
        } else {
            context.lineTo(x,  y - lineW / 2);
        }
    };
    
    
    //- 中抜きスクエアのデザイン
    function designInSquare(bitmap, x, y, w, h, inW, inH,  roundLine = 0, roundEdge = 0, corner = "") {
        const context = bitmap._context;
        context.beginPath();
        const x2 = x + (w - inW) / 2;
        const x3 = x + w / 2;
        const x4 = x + w / 2 + inW / 2;
        const x5 = x + w;
        const y2 = y + (h - inH) / 2;
        const y3 = y + h / 2;
        const y4 = y + h / 2 + inH / 2;
        const y5 = y + h;
        const c1 = corner.includes("1") ? 0 : roundEdge;    // 左上
        const c2 = corner.includes("2") ? 0 : roundEdge;    // 左下
        const c3 = corner.includes("3") ? 0 : roundEdge;    // 右上
        const c4 = corner.includes("4") ? 0 : roundEdge;    // 右下
        // 上
        context.moveTo(x,  y3);
        context.lineTo(x2 - roundLine / 2,  y3);
        // 左上
        if (roundLine) {
            context.quadraticCurveTo(x2 - roundLine / 2,  (y2 + y3) / 2,  x2,  y2 + c1);
        } else {
            context.lineTo(x2,  y2 + c1);
        }
        context.quadraticCurveTo(x2,  y2,  x2 + c1,  y2);
        // 右上
        if (roundLine) {
            context.quadraticCurveTo(x3,  y2 - roundLine,  x4 - c3,  y2);
        } else {
            context.lineTo(x4 - c3,  y2);
        }
        context.quadraticCurveTo(x4,  y2,  x4,  y2 + c3);
        // 右
        if (roundLine) {
            context.quadraticCurveTo(x4 + roundLine / 2,  (y2 + y3) / 2,  x4 + roundLine / 2,  y3);
        } else {
            context.lineTo(x4,  y3);
        }
        context.lineTo(x5 + roundLine / 2,  y3);
        context.lineTo(x5,  y);
        context.lineTo(x,  y);
        context.closePath();
        // 下
        context.moveTo(x5,  y3);
        context.lineTo(x4 + roundLine / 2,  y3);
        // 右下
        if (roundLine) {
            context.quadraticCurveTo(x4 + roundLine / 2,  (y3 + y4) / 2,  x4,  y4 - c4);
        } else {
            context.lineTo(x4,  y4 - c4);
        }
        context.quadraticCurveTo(x4,  y4,  x4 - c4,  y4);
        // 左下
        if (roundLine) {
            context.quadraticCurveTo(x3,  y4 + roundLine,  x2 + c2,  y4);
        } else {
            context.lineTo(x2 + c2,  y4);
        }
        context.quadraticCurveTo(x2,  y4,  x2,  y4 - c2);
        // 左
        if (roundLine) {
            context.quadraticCurveTo(x2 - roundLine / 2,  (y3 + y4) / 2,  x2 - roundLine / 2,  y3);
        } else {
            context.lineTo(x2,  y3);
        }
        context.lineTo(x - roundLine / 2,  y3);
        context.lineTo(x,  y5);
        context.lineTo(x5,  y5);
        context.closePath();
    };
    
    
    //- 中抜きサークルのデザイン
    function designInCircle(bitmap, x, y, w, h, radiusX, radiusY, start = 0, end = 360, type, angle = 0) {
        const context = bitmap.context;
        context.beginPath();
        const x2 = x + (w - radiusX * 2) / 2;
        const x3 = x + w / 2;
        const x4 = x + w / 2 + radiusX;
        const x5 = x + w;
        const y2 = y + (h - radiusY * 2) / 2;
        const y3 = y + h / 2;
        const y4 = y + h / 2 + radiusY;
        const y5 = y + h;
        const toFan = start != end && Math.abs(start - end) % 360 != 0;
        const upStart = angleToRadian(start >= 180 ? start : end >= 180 ? 180 : null);
        const upEnd = angleToRadian(end >= 180 ? end : 0);
        const downStart = angleToRadian(start < 180 ? start : end < 180 ? 0 : null);
        const downEnd = angleToRadian(end < 180 ? end : 180);
        angle = angleToRadian(angle);
        start = angleToRadian(start);
        end = angleToRadian(end) || Math.PI * 2;
        // 上
        context.moveTo(x,  y3);
        context.lineTo(x2,  y3);
        if (toFan && upStart != null && upStart != Math.PI) { context.lineTo(x3, y3); }
        if (toFan && upStart == null) {
        } else if (type == "arc") {
            context.arc(x3,  y3,  radiusX,  upStart,  upEnd);
        } else {
            context.ellipse(x3,  y3,  radiusX,  radiusY,  angle,  upStart,  upEnd);
        }
        if (toFan && upStart != null && upEnd != 0) { context.lineTo(x3, y3); }
        context.lineTo(x5,  y3);
        context.lineTo(x5,  y);
        context.lineTo(x,  y);
        context.closePath();
        // 下
        context.moveTo(x5,  y3);
        context.lineTo(x4,  y3);
        if (toFan && downStart != null && downStart != 0) { context.lineTo(x3, y3); }
        if (toFan && downStart == null) {
        } else if (type == "arc") {
            context.arc(x3,  y3,  radiusX,  downStart,  downEnd);
        } else {
            context.ellipse(x3,  y3,  radiusX,  radiusY,  angle,  downStart,  downEnd);
        }
        if (toFan && downStart != null && downEnd != Math.PI) { context.lineTo(x3, y3); }
        context.lineTo(x,  y3);
        context.lineTo(x,  y5);
        context.lineTo(x5,  y5);
        context.closePath();
    };
    
    
    //- 中抜き横アーモンドのデザイン
    function designInAlmondHor(bitmap, x, y, w, h, inW, inH) {
        const context = bitmap.context;
        context.beginPath();
        const x2 = x + (w - inW) / 2;
        const x3 = x + w / 2;
        const x4 = x + w / 2 + inW / 2;
        const x5 = x + w;
        const y2 = y + (h - inH) / 2;
        const y3 = y + h / 2;
        const y4 = y + h / 2 + inH / 2;
        const y5 = y + h;
        // 上
        context.moveTo(x,  y3);
        context.lineTo(x2,  y3);
        context.quadraticCurveTo(x3,  y2 - inH / 2,  x4 , y3);
        context.lineTo(x5,  y3);
        context.lineTo(x5,  y);
        context.lineTo(x,  y);
        context.closePath();
        // 下
        context.moveTo(x5,  y3);
        context.lineTo(x4,  y3);
        context.quadraticCurveTo(x3,  y4 + inH / 2,  x2 , y3);
        context.lineTo(x,  y3);
        context.lineTo(x,  y5);
        context.lineTo(x5,  y5);
        context.closePath();
    };
    
    
    //- 中抜き縦アーモンドのデザイン
    function designInAlmondVer(bitmap, x, y, w, h, inW, inH) {
        const context = bitmap.context;
        context.beginPath();
        const x2 = x + (w - inW) / 2;
        const x3 = x + w / 2;
        const x4 = x + w / 2 + inW / 2;
        const x5 = x + w;
        const y2 = y + (h - inH) / 2;
        const y3 = y + h / 2;
        const y4 = y + h / 2 + inH / 2;
        const y5 = y + h;
        // 左
        context.moveTo(x3,  y);
        context.lineTo(x3,  y2);
        context.quadraticCurveTo(x2 - inW / 2,  y3,  x3 , y4);
        context.lineTo(x3,  y5);
        context.lineTo(x,  y5);
        context.lineTo(x,  y);
        context.closePath();
        // 右
        context.moveTo(x3,  y5);
        context.lineTo(x3,  y4);
        context.quadraticCurveTo(x4 + inW / 2,  y3,  x3 , y2);
        context.lineTo(x3,  y);
        context.lineTo(x5,  y);
        context.lineTo(x5,  y5);
        context.closePath();
    };
    
    
    //- 中抜きダイヤのデザイン
    function designInDiya(bitmap, x, y, w, h, inW, inH, round = 0, corner = "") {
        const context = bitmap.context;
        context.beginPath();
        const x2 = x + (w - inW) / 2;
        const x3 = x + w / 2;
        const x4 = x + w / 2 + inW / 2;
        const x5 = x + w;
        const y2 = y + (h - inH) / 2;
        const y3 = y + h / 2;
        const y4 = y + h / 2 + inH / 2;
        const y5 = y + h;
        const wq = inW * 0.3;
        const hq = inH * 0.3;
        const c1 = corner.includes("1");    // 左上
        const c2 = corner.includes("2");    // 左下
        const c3 = corner.includes("3");    // 右上
        const c4 = corner.includes("4");    // 右下
        // 上
        context.moveTo(x,  y3);
        context.lineTo(x2,  y3);
        // 左上
        if (c1) {
            context.lineTo(x2,  y2)
            context.lineTo(x3,  y2);
        } else {
            context.quadraticCurveTo(x2 + wq - round,  y2 + hq - round,  x3,  y2);
        }
        // 右上
        if (c3) {
            context.lineTo(x4,  y2)
            context.lineTo(x4,  y3);
        } else {
            context.quadraticCurveTo(x4 - wq + round,  y2 + hq - round,  x4,  y3);
        }
        context.lineTo(x5,  y3);
        context.lineTo(x5,  y);
        context.lineTo(x,  y);
        context.closePath();
        // 下
        context.moveTo(x5,  y3);
        context.lineTo(x4,  y3);
        // 右下
        if (c4) {
            context.lineTo(x4,  y4)
            context.lineTo(x3,  y4);
        } else {
            context.quadraticCurveTo(x4 - wq + round,  y4 - hq + round,  x3,  y4);
        }
        // 左下
        if (c2) {
            context.lineTo(x2,  y4)
            context.lineTo(x2,  y3);
        } else {
            context.quadraticCurveTo(x2 + wq - round,  y4 - hq + round,  x2,  y3);
        }
        context.lineTo(x,  y3);
        context.lineTo(x,  y5);
        context.lineTo(x5,  y5);
        context.closePath();
    };
    
    
    //- 中抜きギザギザのデザイン
    function designInGiza(bitmap, x, y, w, h, inW, inH, cfg = {}, smooth, outX, outY) {
        const context = bitmap.context;
        context.beginPath();
        const x2 = x + (w - inW) / 2;
        const x3 = x + w / 2;
        const x4 = x + w / 2 + inW / 2;
        const x5 = x + w;
        const y2 = y + (h - inH) / 2;
        const y3 = y + h / 2;
        const y4 = y + h / 2 + inH / 2;
        const y5 = y + h;
        const wq = inW / 4;
        const hq = inH / 4;
        
        const xNum = Number(cfg["ギザギザ-トゲ数X"]) || 1;
        const yNum = Number(cfg["ギザギザ-トゲ数Y"]) || 1;
        const xOut = Number(outX) || 50;
        const yOut = Number(outY) || 50;
        const r = Number(cfg["ギザギザ-トゲ長さ乱数"]) / 100 || 0;
        const isOdd = yNum % 2 == 1 ? true : false;
        const isEven = yNum % 2 == 0 ?true : 0;
        const xOdd = isOdd ? xOut : 0;
        const yOdd = isOdd ? 0.5 : 1;
        const xDiv = (inW) / (xNum + 1);
        const yDiv = (inH) / (yNum + 1);
        let nowX = 0
        let nowY = 0;
        
        // トゲトゲの描画
        if (!smooth) {
            // 上側の描画
            context.moveTo(x,  y3);
            context.lineTo(x2 - xOdd,  y3);
        
            // 左
            nowX = x2 - xOdd;
            nowY = y3;
            for (let i = 0; Math.ceil(i < yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                if (isEven) { context.lineTo(nowX - rand,  nowY - yDiv  * 0.5); }
                context.lineTo(nowX + xOdd,  nowY - yDiv * yOdd);
                if (isOdd) { nowX += rand; }
                nowY -= yDiv * yOdd;
            }
            // 左上
            rand = gizaRand(r);
            context.lineTo(nowX - xOut * 0.25 * rand,  nowY - yDiv  * 0.5 - yOut * 0.25 * rand);
            context.lineTo(nowX + xDiv  * 0.5,  nowY - yDiv  * 0.5);
            nowX += xDiv  * 0.5;
            nowY -= yDiv  * 0.5;
            // 上
            for (let i = 0; i < xNum; i++) {
                rand = yOut * gizaRand(r);
                context.lineTo(nowX + xDiv  * 0.5,  nowY - rand);
                context.lineTo(nowX + xDiv,  nowY);
                nowX += xDiv;
            }
            // 右上
            rand = gizaRand(r);
            context.lineTo(nowX + xDiv  * 0.5 + xOut * 0.25 * rand,  nowY - yOut * 0.25 * rand);
            context.lineTo(nowX + xDiv  * 0.5,  nowY + yDiv  * 0.5);
            nowX += xDiv  * 0.5;
            nowY += yDiv  * 0.5;
            // 右
            for (let i = 0; i < Math.ceil(yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                context.lineTo(nowX + rand,  nowY + yDiv  * 0.5);
                if (isEven) { context.lineTo(nowX,  nowY + yDiv); }
                if (isOdd) { nowX += rand; }
                nowY += yDiv * yOdd;
            }
            context.lineTo(x5,  y3);
            context.lineTo(x5,  y);
            context.lineTo(x,  y);
            context.closePath();
        
            // 下側の描画
            context.moveTo(x5,  y3);
            context.lineTo(x4 + xOdd,  y3);
        
            // 右
            nowX = x4 + xOdd;
            nowY = y3;
            for (let i = 0; i < Math.ceil(yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                if (isEven) { context.lineTo(nowX + rand,  nowY + yDiv  * 0.5); }
                context.lineTo(nowX - xOdd,  nowY + yDiv * yOdd);
                if (isOdd) { nowX -= rand; }
                nowY += yDiv * yOdd;
            }
            // 右下
            rand = gizaRand(r);
            context.lineTo(nowX + xOut * 0.25 * rand,  nowY + yDiv  * 0.5 + yOut * 0.25 * rand);
            context.lineTo(nowX - xDiv  * 0.5,  nowY + yDiv  * 0.5);
            nowX -= xDiv  * 0.5;
            nowY += yDiv  * 0.5;
            // 下
            for (let i = 0; i < xNum; i++) {
                rand =yOut * gizaRand(r);
                context.lineTo(nowX - xDiv  * 0.5,  nowY + rand);
                context.lineTo(nowX - xDiv,  nowY);
                nowX -= xDiv;
            }
            // 左下
            rand = gizaRand(r);
            context.lineTo(nowX - xDiv  * 0.5 - xOut * 0.25 * rand,  nowY + yOut * 0.25 * rand);
            context.lineTo(nowX - xDiv  * 0.5,  nowY - yDiv  * 0.5);
            nowX -= xDiv  * 0.5;
            nowY -= yDiv  * 0.5;
            // 左
            for (let i = 0; Math.ceil(i < yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                context.lineTo(nowX - rand,  nowY - yDiv  * 0.5);
                if (isEven) { context.lineTo(nowX,  nowY - yDiv); }
                if (isOdd) { nowX -= rand; }
                nowY -= yDiv;
            }
          
            context.lineTo(x,  y3);
            context.lineTo(x,  y5);
            context.lineTo(x5,  y5);
            context.closePath();
        }
        
        // なめらかの描画
        if (smooth) {
            // 上側の描画
            context.moveTo(x,  y3);
            context.lineTo(x2 - xOdd,  y3);
        
            // 左
            nowX = x2 - xOdd;
            nowY = y3;
            for (let i = 0; Math.ceil(i < yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                if (isEven) { context.quadraticCurveTo(nowX - rand * 0.5,  nowY - yDiv * 0.5,  nowX - rand,  nowY - yDiv  * 0.5); }
                context.quadraticCurveTo(isOdd ? nowX + xOdd / 2 : nowX - rand * 0.5,  isOdd ? nowY : nowY - yDiv * 0.5,  nowX + xOdd,  nowY - yDiv * yOdd);
                if (isOdd) { nowX += rand; }
                nowY -= yDiv * yOdd;
            }
            // 左上
            rand = gizaRand(r);
            context.quadraticCurveTo(nowX,  nowY - yDiv  * 0.5,  nowX - xOut * 0.25 * rand,  nowY - yDiv  * 0.5 - yOut * 0.25 * rand);
            context.quadraticCurveTo(nowX,  nowY - yDiv  * 0.5,  nowX + xDiv  * 0.5,  nowY - yDiv  * 0.5);
            nowX += xDiv  * 0.5;
            nowY -= yDiv  * 0.5;
            // 上
            for (let i = 0; i < xNum; i++) {
                rand = yOut * gizaRand(r);
                context.quadraticCurveTo(nowX + xDiv * 0.5,  nowY - rand * 0.5,  nowX + xDiv  * 0.5,  nowY - rand);
                context.quadraticCurveTo(nowX + xDiv * 0.5,  nowY - rand * 0.5,  nowX + xDiv,  nowY);
                nowX += xDiv;
            }
            // 右上
            rand = gizaRand(r);
            context.quadraticCurveTo(nowX + xDiv * 0.5,  nowY,  nowX + xDiv  * 0.5 + xOut * 0.25 * rand,  nowY - yOut * 0.25 * rand);
            context.quadraticCurveTo(nowX + xDiv * 0.5,  nowY,  nowX + xDiv  * 0.5,  nowY + yDiv  * 0.5);
            nowX += xDiv  * 0.5;
            nowY += yDiv  * 0.5;
            // 右
            for (let i = 0; i < Math.ceil(yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                context.quadraticCurveTo(nowX + rand * 0.5, nowY + yDiv * 0.5,  nowX + rand,  nowY + yDiv  * 0.5);
                if (isEven) { context.quadraticCurveTo(nowX + rand * 0.5, nowY + yDiv * 0.5,  nowX,  nowY + yDiv); }
                if (isOdd) { nowX += rand; }
                nowY += yDiv * yOdd;
            }
            context.lineTo(x5,  y3);
            context.lineTo(x5,  y);
            context.lineTo(x,  y);
            context.closePath();
        
            // 下側の描画
            context.moveTo(x5,  y3);
            context.lineTo(x4 + xOdd,  y3);
        
            // 右
            nowX = x4 + xOdd;
            nowY = y3;
            for (let i = 0; i < Math.ceil(yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                if (isEven) { context.quadraticCurveTo(nowX + rand * 0.5, nowY + yDiv * 0.5,  nowX + rand,  nowY + yDiv  * 0.5); }
                context.quadraticCurveTo(isOdd ? nowX - xOdd * 0.5 : nowX + rand * 0.5,  isOdd ? nowY : nowY + yDiv * 0.5,  nowX - xOdd,  nowY + yDiv * yOdd);
                if (isOdd) { nowX -= rand; }
                nowY += yDiv * yOdd;
            }
            // 右下
            rand = gizaRand(r);
            context.quadraticCurveTo(nowX,  nowY + yDiv * 0.5,  nowX + xOut * 0.25 * rand,  nowY + yDiv  * 0.5 + yOut * 0.25 * rand);
            context.quadraticCurveTo(nowX,  nowY + yDiv * 0.5,  nowX - xDiv  * 0.5,  nowY + yDiv  * 0.5);
            nowX -= xDiv  * 0.5;
            nowY += yDiv  * 0.5;
            // 下
            for (let i = 0; i < xNum; i++) {
                rand = yOut * gizaRand(r);
                context.quadraticCurveTo(nowX - xDiv  * 0.5,  nowY + rand / 2,  nowX - xDiv  * 0.5,  nowY + rand);
                context.quadraticCurveTo(nowX - xDiv  * 0.5,  nowY + rand / 2,  nowX - xDiv,  nowY);
                nowX -= xDiv;
            }
            // 左下
            rand = gizaRand(r);
            context.quadraticCurveTo(nowX - xDiv * 0.5,  nowY,  nowX - xDiv  * 0.5 - xOut * 0.25 * rand,  nowY + yOut * 0.25 * rand);
            context.quadraticCurveTo(nowX - xDiv * 0.5,  nowY,  nowX - xDiv  * 0.5,  nowY - yDiv  * 0.5);
            nowX -= xDiv  * 0.5;
            nowY -= yDiv  * 0.5;
            // 左
            for (let i = 0; Math.ceil(i < yNum  * 0.5); i++) {
                rand = xOdd ? xOdd : xOut * gizaRand(r);
                context.quadraticCurveTo(nowX - rand * 0.5,  nowY - yDiv * 0.5,  nowX - rand,  nowY - yDiv  * 0.5);
                if (isEven) { context.quadraticCurveTo(nowX - rand * 0.5,  nowY - yDiv * 0.5,  nowX,  nowY - yDiv); }
                if (isOdd) { nowX -= rand; }
                nowY -= yDiv;
            }
          
            context.lineTo(x,  y3);
            context.lineTo(x,  y5);
            context.lineTo(x5,  y5);
            context.closePath();
        }
    };
    
    
    //- ギザギザ系のランダム処理
    function gizaRand(r) {
        return 1 - r + Math.random() * r * 2;
    };
    
    
    //- 中抜きフリー形のデザイン
    function designInFree(bitmap, x, y, w, h, points) {
        if (!points.length) { return; }
        const context = bitmap.context;
        context.beginPath();
        const x3 = x + w / 2;
        const x5 = x + w;
        const y3 = y + h / 2;
        const y5 = y + h;
        const gw = Graphics.width;
        const gh = Graphics.height;
        const uppers = [];
        const downers = [];
        points.forEach((pos, i) => {
            const px = x3 - gw /  2 + Number(pos["X位置"]) / 100 * gw;
            const py = y3 - gh / 2 + Number(pos["Y位置"]) / 100 * gh;
            if (py <= y3) { uppers.push({ x:px, y:py }); } else
            { downers.push({ x:px, y:py }); }
        });
        uppers.sort((a, b) => a.x - b.x);
        downers.sort((a, b) => b.x - a.x);
        // 上
        context.moveTo(x,  y3);
        uppers.forEach(pos => {
            context.lineTo(pos.x,  pos.y);
        });
        context.lineTo(x5,  y3);
        context.lineTo(x5,  y);
        context.lineTo(x,  y);
        context.closePath();
        // 下
        context.moveTo(x5,  y3);
        downers.forEach(pos => {
            context.lineTo(pos.x,  pos.y);
        });
        context.lineTo(x,  y3);
        context.lineTo(x,  y5);
        context.lineTo(x5,  y5);
        context.closePath();
    };
    
})();