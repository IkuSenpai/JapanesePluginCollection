//
//  経験値テーブル設定 ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['ExpTableSet'] = 1.00;

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Class/ExpTableSet.js
 * @plugindesc ver1.00/経験値テーブルを個別に設定できるようにします。
 * @author Yana
 * 
 * @help
 * ------------------------------------------------------
 *  プラグインコマンドはありません。
 * ------------------------------------------------------
 * ------------------------------------------------------
 * 設定方法
 * ------------------------------------------------------
 * 
 * 職業のメモ欄に
 * <経験値テーブル:x>
 * と記述すると、その職業の経験値テーブルをx番のテーブルに変更します。
 * 
 * 経験値は次のレベルまでに必要な値をカンマ区切りで10項目ずつ並べてください。
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、
 * または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 * 
 * @param Table Key
 * @text メモタグキー
 * @desc 読み取りに使う正規表現です。
 * 特に理由がない限り、変更する必要はありません。
 * @default <経験値テーブル:(\d+)>
 * 
 * @param Table1
 * @text テーブル1
 * 
 * @param Table1-0
 * @parent Table1
 * @text テーブル1-0
 * @desc テーブル1、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table1-1
 * @parent Table1
 * @text テーブル1-1
 * @desc テーブル1、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-2
 * @parent Table1
 * @text テーブル1-2
 * @desc テーブル1、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-3
 * @parent Table1
 * @text テーブル1-3
 * @desc テーブル1、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-4
 * @parent Table1
 * @text テーブル1-4
 * @desc テーブル1、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-5
 * @parent Table1
 * @text テーブル1-5
 * @desc テーブル1、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-6
 * @parent Table1
 * @text テーブル1-6
 * @desc テーブル1、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-7
 * @parent Table1
 * @text テーブル1-7
 * @desc テーブル1、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-8
 * @parent Table1
 * @text テーブル1-8
 * @desc テーブル1、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table1-9
 * @parent Table1
 * @text テーブル1-9
 * @desc テーブル1、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2
 * @text テーブル2
 * 
 * @param Table2-0
 * @parent Table2
 * @text テーブル2-0
 * @desc テーブル2、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table2-1
 * @parent Table2
 * @text テーブル2-1
 * @desc テーブル2、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-2
 * @parent Table2
 * @text テーブル2-2
 * @desc テーブル2、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-3
 * @parent Table2
 * @text テーブル2-3
 * @desc テーブル2、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-4
 * @parent Table2
 * @text テーブル2-4
 * @desc テーブル2、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-5
 * @parent Table2
 * @text テーブル2-5
 * @desc テーブル2、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-6
 * @parent Table2
 * @text テーブル2-6
 * @desc テーブル1、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-7
 * @parent Table2
 * @text テーブル2-7
 * @desc テーブル1、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-8
 * @parent Table2
 * @text テーブル2-8
 * @desc テーブル2、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table2-9
 * @parent Table2
 * @text テーブル2-9
 * @desc テーブル2、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3
 * @text テーブル3
 * 
 * @param Table3-0
 * @parent Table3
 * @text テーブル3-0
 * @desc テーブル3、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table3-1
 * @parent Table3
 * @text テーブル3-1
 * @desc テーブル3、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-2
 * @parent Table3
 * @text テーブル3-2
 * @desc テーブル3、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-3
 * @parent Table3
 * @text テーブル3-3
 * @desc テーブル3、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-4
 * @parent Table3
 * @text テーブル3-4
 * @desc テーブル3、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-5
 * @parent Table3
 * @text テーブル3-5
 * @desc テーブル3、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-6
 * @parent Table3
 * @text テーブル3-6
 * @desc テーブル3、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-7
 * @parent Table3
 * @text テーブル3-7
 * @desc テーブル3、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-8
 * @parent Table3
 * @text テーブル3-8
 * @desc テーブル3、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table3-9
 * @parent Table3
 * @text テーブル3-9
 * @desc テーブル3、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4
 * @text テーブル4
 * 
 * @param Table4-0
 * @parent Table4
 * @text テーブル4-0
 * @desc テーブル4、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table4-1
 * @parent Table4
 * @text テーブル4-1
 * @desc テーブル4、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-2
 * @parent Table4
 * @text テーブル4-2
 * @desc テーブル4、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-3
 * @parent Table4
 * @text テーブル4-3
 * @desc テーブル4、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-4
 * @parent Table4
 * @text テーブル4-4
 * @desc テーブル4、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-5
 * @parent Table4
 * @text テーブル4-5
 * @desc テーブル4、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-6
 * @parent Table4
 * @text テーブル4-6
 * @desc テーブル4、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-7
 * @parent Table4
 * @text テーブル4-7
 * @desc テーブル4、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-8
 * @parent Table4
 * @text テーブル4-8
 * @desc テーブル4、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table4-9
 * @parent Table4
 * @text テーブル4-9
 * @desc テーブル4、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5
 * @text テーブル5
 * 
 * @param Table5-0
 * @parent Table5
 * @text テーブル5-0
 * @desc テーブル5、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table5-1
 * @parent Table5
 * @text テーブル5-1
 * @desc テーブル5、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-2
 * @parent Table5
 * @text テーブル5-2
 * @desc テーブル5、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-3
 * @parent Table5
 * @text テーブル5-3
 * @desc テーブル5、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-4
 * @parent Table5
 * @text テーブル5-4
 * @desc テーブル5、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-5
 * @parent Table5
 * @text テーブル5-5
 * @desc テーブル5、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-6
 * @parent Table5
 * @text テーブル5-6
 * @desc テーブル5、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-7
 * @parent Table5
 * @text テーブル5-7
 * @desc テーブル5、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-8
 * @parent Table5
 * @text テーブル5-8
 * @desc テーブル5、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table5-9
 * @parent Table5
 * @text テーブル5-9
 * @desc テーブル5、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6
 * @text テーブル6
 * 
 * @param Table6-0
 * @parent Table6
 * @text テーブル6-0
 * @desc テーブル6、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table6-1
 * @parent Table6
 * @text テーブル6-1
 * @desc テーブル6、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-2
 * @parent Table6
 * @text テーブル6-2
 * @desc テーブル6、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-3
 * @parent Table6
 * @text テーブル6-3
 * @desc テーブル6、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-4
 * @parent Table6
 * @text テーブル6-4
 * @desc テーブル6、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-5
 * @parent Table6
 * @text テーブル6-5
 * @desc テーブル6、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-6
 * @parent Table6
 * @text テーブル6-6
 * @desc テーブル6、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-7
 * @parent Table6
 * @text テーブル6-7
 * @desc テーブル6、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-8
 * @parent Table6
 * @text テーブル6-8
 * @desc テーブル6、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table6-9
 * @parent Table6
 * @text テーブル6-9
 * @desc テーブル6、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7
 * @text テーブル7
 * 
 * @param Table7-0
 * @parent Table7
 * @text テーブル7-0
 * @desc テーブル7、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table7-1
 * @parent Table7
 * @text テーブル7-1
 * @desc テーブル7、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-2
 * @parent Table7
 * @text テーブル7-2
 * @desc テーブル7、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-3
 * @parent Table7
 * @text テーブル7-3
 * @desc テーブル7、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-4
 * @parent Table7
 * @text テーブル7-4
 * @desc テーブル7、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-5
 * @parent Table7
 * @text テーブル7-5
 * @desc テーブル7、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-6
 * @parent Table7
 * @text テーブル7-6
 * @desc テーブル7、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-7
 * @parent Table7
 * @text テーブル7-7
 * @desc テーブル7、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-8
 * @parent Table7
 * @text テーブル7-8
 * @desc テーブル7、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table7-9
 * @parent Table7
 * @text テーブル7-9
 * @desc テーブル7、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8
 * @text テーブル8
 * 
 * @param Table8-0
 * @parent Table8
 * @text テーブル8-0
 * @desc テーブル8、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table8-1
 * @parent Table8
 * @text テーブル8-1
 * @desc テーブル8、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-2
 * @parent Table8
 * @text テーブル8-2
 * @desc テーブル8、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-3
 * @parent Table8
 * @text テーブル8-3
 * @desc テーブル8、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-4
 * @parent Table8
 * @text テーブル8-4
 * @desc テーブル8、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-5
 * @parent Table8
 * @text テーブル8-5
 * @desc テーブル8、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-6
 * @parent Table8
 * @text テーブル8-6
 * @desc テーブル8、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-7
 * @parent Table8
 * @text テーブル8-7
 * @desc テーブル8、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-8
 * @parent Table8
 * @text テーブル8-8
 * @desc テーブル8、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table8-9
 * @parent Table8
 * @text テーブル8-9
 * @desc テーブル8、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9
 * @text テーブル9
 * 
 * @param Table9-0
 * @parent Table9
 * @text テーブル9-0
 * @desc テーブル9、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table9-1
 * @parent Table9
 * @text テーブル9-1
 * @desc テーブル9、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-2
 * @parent Table9
 * @text テーブル9-2
 * @desc テーブル9、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-3
 * @parent Table9
 * @text テーブル9-3
 * @desc テーブル9、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-4
 * @parent Table9
 * @text テーブル9-4
 * @desc テーブル9、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-5
 * @parent Table9
 * @text テーブル9-5
 * @desc テーブル9、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-6
 * @parent Table9
 * @text テーブル9-6
 * @desc テーブル9、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-7
 * @parent Table9
 * @text テーブル9-7
 * @desc テーブル9、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-8
 * @parent Table9
 * @text テーブル9-8
 * @desc テーブル9、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table9-9
 * @parent Table9
 * @text テーブル9-9
 * @desc テーブル9、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10
 * @text テーブル10
 * 
 * @param Table10-0
 * @parent Table10
 * @text テーブル10-0
 * @desc テーブル5、Lv1から9のNextです。
 * 0番目と1番目は0を指定してください。
 * @default 0,0,10,20,30,50,100,200,300,500
 * 
 * @param Table10-1
 * @parent Table10
 * @text テーブル10-1
 * @desc テーブル10、Lv10から19のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-2
 * @parent Table10
 * @text テーブル10-2
 * @desc テーブル10、Lv20から29のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-3
 * @parent Table10
 * @text テーブル10-3
 * @desc テーブル10、Lv30から39のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-4
 * @parent Table10
 * @text テーブル10-4
 * @desc テーブル10、Lv40から49のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-5
 * @parent Table10
 * @text テーブル10-5
 * @desc テーブル10、Lv50から59のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-6
 * @parent Table10
 * @text テーブル10-6
 * @desc テーブル10、Lv60から69のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-7
 * @parent Table10
 * @text テーブル10-7
 * @desc テーブル10、Lv70から79のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-8
 * @parent Table10
 * @text テーブル10-8
 * @desc テーブル10、Lv80から89のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 * @param Table10-9
 * @parent Table10
 * @text テーブル10-9
 * @desc テーブル10、Lv90から99のNextです。
 * @default 999,999,999,999,999,999,999,999,999,999
 * 
 */

(function () {

	var parameters = PluginManager.parameters('ExpTableSet');
	var tableKey = RegExp(parameters['Table Key'] || '<経験値テーブル:(\\d+)>');


	function ExpTableManager() {
		throw new Error('This is a static class');
	};

	ExpTableManager.getExpForLevel = function (classObject, level) {
		if (classObject._expTable === undefined) { this.initExpTable(classObject) }
		if (classObject._expTable.length === 0) { return false }
		var exp = classObject._expTable[level];
		if (!exp) { exp = classObject._expTable[classObject._expTable.length] }
		return exp;
	};

	ExpTableManager.initExpTable = function (classObject) {
		classObject._expTable = [];
		if (classObject.note.match(tableKey)) {
			var table = Number(RegExp.$1);
			var text = 'Table' + table;
			for (var i = 0; i < 10; i++) {
				var exps = parameters[text + '-' + i].split(',');
				for (j = 0; j < 10; j++) {
					if (i === 0 && j === 0) {
						classObject._expTable[0] = 0;
						continue;
					}
					classObject._expTable[i * 10 + j] = Number(classObject._expTable[i * 10 + j - 1]) + Number(exps[j]);
				}
			}
		}
	};


	var _ETS_GActor_expForLevel = Game_Actor.prototype.expForLevel;
	Game_Actor.prototype.expForLevel = function (level) {
		var c = this.currentClass();
		if (Imported['VXandAceHybridClass']) { c = this.currentStatusClass() }
		var exp = _ETS_GActor_expForLevel.call(this, level);
		var texp = ExpTableManager.getExpForLevel(c, level);
		if (texp) { exp = texp }
		return exp;
	};

	if (Imported['EnemyClass']) {
		var _ETS_GEnemy_expForLevel = Game_Enemy.prototype.expForLevel;
		Game_Enemy.prototype.expForLevel = function (level) {
			var c = this.enemyClass();
			var exp = _ETS_GEnemy_expForLevel.call(this, level);
			var texp = ExpTableManager.getExpForLevel(c, level);
			if (texp) { exp = texp }
			return exp;
		};
	}
	if (Imported['VXandAceHybridClass']) {
		var _ETS_GActor_abpForLevel = Game_Actor.prototype.abpForLevel;
		Game_Actor.prototype.abpForLevel = function (level) {
			var c = this.currentClass();
			var abp = _ETS_GActor_abpForLevel.call(this, level);
			var tabp = ExpTableManager.getExpForLevel(c, level);
			if (tabp) { abp = tabp }
			return abp;
		};
	}
}());