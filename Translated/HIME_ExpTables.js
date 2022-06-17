/*
 * あなたが私の仕事を楽しんでいるなら、
 * パトレオンで私への支援を検討してください！
 *
 * - https://www.patreon.com/himeworks
 *
 * ご質問や懸念がある場合、
 * 次のサイトのいずれかで私に連絡できます。
 *
 * - Main Website: http://himeworks.com
 * - Facebook: https://www.facebook.com/himeworkscom/
 * - Twitter: https://twitter.com/HimeWorks
 * - Youtube: https://www.youtube.com/c/HimeWorks
 * - Tumblr: http://himeworks.tumblr.com/
*/
/*:ja
 * @target MZ MV
 * @title Exp Tables
 * @author Hime --> HimeWorks (http://himeworks.com)
 * @version 1.2
 * @date Jul 1, 2020
 * @filename HIME_ExpTables.js
 * @url http://himeworks.com/2015/12/exp-tables-mv/
 *
 * @param Actor Exp Filename
 * @text アクター経験値テーブルファイル名
 * @desc アクター経験値テーブルのファイル名(拡張子含)例:ActorExp.csv
 * /data/フォルダ内に保存。使用しない場合、無入力
 * @default ActorExp.csv
 *
 * @param Class Exp Filename
 * @text 職業経験値テーブルファイル名
 * @desc 職業経験値テーブルのファイル名(拡張子含)例:ClassExp.csv
 * /data/フォルダ内に保存。使用しない場合、無入力
 * @default
 *
 * @plugindesc v1.2 経験値曲線をCSVファイルで代用できます
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * == 説明 ==
 *
 * RPGツクールMVでは、
 * 必要な経験値の量に達することでアクターをレベルアップさせることができます。
 * 必要な経験値の量は、
 * アクターの現在の職業のレベルと職業の経験値曲線によって決定されます。
 * 経験値曲線はあらかじめ決められた式を使って生成され、
 * 能力値を調整することしかできません。
 * 経験値曲線では、希望の経験値曲線が実現できないこともあります。
 * このプラグインを使用すると、
 * 各レベルに必要な経験値を完全にコントロールすることができます。
 * 例えば、各レベルに必要な経験値が1000になるようにしたい場合、
 * 曲線の調整方法を考えなくても、1000の間隔で必要な経験値を設定できます。
 * 経験値テーブルも表計算ソフトを活用してデータを管理することができます。
 *
 * == 使用方法 ==
 *
 * プラグインのパラメータでは、経験値テーブルを保持するファイル名を指定します。
 * 使わない場合、空欄のままにしておきます。
 *
 * 各経験値テーブル(CSVファイル)はプロジェクトの /data/ フォルダ内に保存します。
 *
 * -- アクター経験値テーブルの使い方 --
 *
 * 最初の4人のアクターの経験値テーブルのサンプルを
 * "テンプレート"CSVファイルをダウンロードして試すことをお勧めします。
 * 独自のCSVファイルを作成することもできます。
 * ここでは、メモ帳や表計算ソフトにコピーできる例を示します。
 *
 * Level,Actor1,Actor2,Actor3,Actor6
 * 1,0,0,0,0
 * 2,100,100,100,150
 * 3,200,200,200,300
 * 4,300,300,300,400
 *
 * 最初の行はヘッダーで構成されています。
 * このファイルはアクター専用です。
 * 各アクタは"Actor"の後にIDを記述して指定します。
 * 以降の各行は、レベルと、各アクターに必要な経験値を示しています。
 * それぞれの値は、そのレベルに到達するのに必要な総経験値を表しています。
 * つまり、レベル2からレベル3までは100の経験値が必要となります。
 *
 * -- 職業の経験値テーブル --
 *
 * このプラグインを使うと、職業の経験値テーブルを管理することができます。
 * アクター経験値テーブルと似ていますが、
 * ヘッダに"Actor"と書く代わりに"Class"と書きます。
 *
 * 以下の形式のCSVファイルを作成します。
 *
 * Level,Class1,Class2,Class3,Class6, ...
 * 1,0,0,0,0
 * 2,100,100,100,150
 * 3,200,200,200,300
 * 4,300,300,300,400
 *
 * -- 最大レベル --
 * 
 * このプラグインは最大レベルの扱いを変更します。
 * 以下のように書いたとしましょう。
 * 
 * Level,Class1,Class2
 * 1,0,0
 * 2,100,100
 * 3,,200
 * 4,,300
 * 
 * 基本的に:
 *   職業1はレベル2まで経験値が得られます。
 *   職業2はレベル4まで経験値が得られます。
 * 
 * これは、各職業の最大レベルを決定します:
 *   アクターが職業1の場合、レベル2に上限になります。
 *   アクターが職業2の場合、レベル4に上限になります。
 * 
 * 余分なエラーチェックをしたくなければ、
 * プラグインが処理してくれないので、レベル間に隙間を残すべきではありません。
 *
 * == 利用規約 ==
 *
 * - クレジットを表示する非営利プロジェクトでの使用は無料
 * - 商用利用の場合、私に連絡してください
 *
 * == Change Log ==
 *
 * 1.2 - Jul 1, 2020
 *   * add support for "max level" concept
 * 1.1 - Jun 8, 2016
 *   * No longer uses JSON. Just use the CSV directly
 *   * Added support for class exp tables.
 * 1.0 - Dec 16, 2015
 *   * Initial release
 */

/*:
@title Exp Tables
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.2
@date Jul 1, 2020
@filename HIME_ExpTables.js
@url http://himeworks.com/2015/12/exp-tables-mv/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

@plugindesc v1.2 - Set up the amount of experience required to level using spreadsheets
@help 
== Description ==

RPG Maker allows your actors to level up by reaching the amount of
experience points required. The amount of exp required is determined by 
the actor's level for their current class, and the class' exp curve.

Exp curves are generated using a pre-determined formula, and you only
have the ability to adjust different parameters. In some cases, your
desired exp curve is simply impossible to achieve with RPG Maker's
own exp curves.

With this plugin, you have full control over exp values requires for 
each level. For example, if you wanted to make it so that every level
required 1000 EXP, you could simply set the exp required at intervals
of 1000, without having to figure out how to adjust the curve.

You can manage your exp tables in a spreadsheet as well, allowing you
to take advantage of spreadsheet software to manage your data.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.2 - Jul 1, 2020
  * add support for "max level" concept
1.1 - Jun 8, 2016
  * No longer uses JSON. Just use the CSV directly
  * Added support for class exp tables.
1.0 - Dec 16, 2015
  * Initial release
 
== Usage == 

In the plugin parameters, specify the names of the files that will
hold your exp tables.

If you don't want to use one, leave it blank.

-- Getting Started with Actor Exp Tables --

Start by downloading the "template" CSV file that provides a sample
exp table for the first 4 actors.

Alternatively, you can also create your own CSV file. 
Here is an example you can copy into notepad or spreadsheet software:

Level,Actor1,Actor2,Actor3,Actor6
1,0,0,0,0
2,100,100,100,150
3,200,200,200,300
4,300,300,300,400

The first row consists of the headers. This file is only for actors.
Each actor is specified by writing "Actor", followed by their ID.

Each row after indicates the level, and how much exp is required for
each actor. Each value represents the total exp required to reach that
level. This means that from level 2 to level 3, 100 EXP is required.

-- Class Exp Tables --

You can use this plugin to manage exp tables for your classes.
It is similar to the actor table, except instead of writing "Actor" you would
write "Class" in the headers.

Create a CSV file with the following format

Level,Class1,Class2,Class3,Class6, ...
1,0,0,0,0
2,100,100,100,150
3,200,200,200,300
4,300,300,300,400

-- Max Level --

This plugin changes the way max level is handled. Let's say you wrote this

Level,Class1,Class2
1,0,0
2,100,100
3,,200
4,,300

Basically:
  class 1 has exp values going up to level 2
  class 2 has exp values going up to level 4

This determines the max levels for those classes:
  if your actor is class 1, it will be capped at level 2
  If your actor is class 2, it will be capped at level 4
  
You shouldn't leave any gaps between levels because the plugin doesn't handle
that since I didn't want to have to do extra error checks.

-------------------------------------------------------------------------------
@param Actor Exp Filename
@desc Name of the file that holds Actor EXP
@default actor_exp.csv

@param Class Exp Filename
@desc Name of the file that holds Class EXP
@default class_exp.csv
 */

var Imported = Imported || {};
var TH = TH || {};
Imported.ExpTables = 1;
TH.ExpTables = TH.ExpTables || {};

(function($) {

    $.params = PluginManager.parameters("HIME_ExpTables");
    $.actorFilename = $.params["Actor Exp Filename"].trim();
    $.classFilename = $.params["Class Exp Filename"].trim();

    $.hasExpTable = function(obj) {
        return !!obj.expTable
    };

    var TH_DataManager_loadDataFile = DataManager.loadDataFile;
    DataManager.loadExpTable = function(type, src) {
        if (src === "") {
            $.actorExpTableLoaded = true;
            return;
        }
        var xhr = new XMLHttpRequest();
        var url = 'data/' + src;
        xhr.open('GET', url);
        xhr.overrideMimeType('application/csv');
        xhr.onload = function() {
            if (xhr.status < 400) {
                var data = xhr.responseText
                DataManager.onLoadExpTable(data);
            }
        };
        xhr.onerror = function() {
            DataManager._errorUrl = DataManager._errorUrl || url;
        };
        xhr.send();
    };

    DataManager.onLoadExpTable = function(data) {
        data = data.split("\n");
        $.actorExpTableLoaded = true;

        // get headers
        var objs = [];
        var headers = data[0].split(",");
        for (var i = 1; i < headers.length; i++) {
            var header = headers[i].toUpperCase();
            if (header.contains("ACTOR")) {
                var id = Math.floor(header.substring(5));
                objs[i] = $dataActors[id]
            } else if (header.contains("CLASS")) {
                var id = Math.floor(header.substring(5));
                objs[i] = $dataClasses[id]
            }
        }
        // get body
        for (var i = 1; i < data.length; i++) {
            var entry = data[i].split(",");
            var level = Math.floor(entry[0]);
            for (var j = 1; j < entry.length; j++) {
                var obj = objs[j];
                obj.expTable = obj.expTable || {};

                var exp_to_next_level = entry[j].trim();
                if (exp_to_next_level !== "") {
                    obj.expTable[level] = Math.floor(exp_to_next_level);
                    obj.maxLevel = level;
                } else {
                    obj.expTable[level] = 0;
                }
            }
        }
    };

    var TH_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        var res = TH_DataManager_isDatabaseLoaded.call(this);
        if (res) {
            if (!$.actorExpTableLoaded) {
                this.loadExpTable("actor", $.actorFilename);
                this.loadExpTable("class", $.classFilename);
                res = false;
            }
        }
        return res;
    };

    var TH_ExpTables_GameActor_expForLevel = Game_Actor.prototype.expForLevel;
    Game_Actor.prototype.expForLevel = function(level) {

        // Actor tables takes priority
        var actor = this.actor();
        if ($.hasExpTable(actor)) {
            return actor.expTable[level];
        }
        // No actor exp table, check for class exp table
        else if ($.hasExpTable(this.currentClass())) {
            return this.currentClass().expTable[level];
        }
        // No exp tables. Just use default
        else {
            return TH_ExpTables_GameActor_expForLevel.call(this, level);
        }
    };

    var TH_ExpTables_GameActor_ixMaxLevel = Game_Actor.prototype.isMaxLevel;
    Game_Actor.prototype.isMaxLevel = function() {
        if (this.isMaxClassLevel()) {
            return true;
        }
        return TH_ExpTables_GameActor_ixMaxLevel.call(this);
    }

    // Returns true if the current level has reached the max class level
    Game_Actor.prototype.isMaxClassLevel = function() {
        return this._level >= this.maxClassLevel(this.currentClass().id);
    }

    // Max class level is basically the class' max level, or the actor's max level
    // Not used by default but may be used in class-related plugins
    Game_Actor.prototype.maxClassLevel = function(classId) {
        var maxLevel = $dataClasses[classId].maxLevel;
        if (maxLevel === undefined) {
            maxLevel = this.maxLevel();
        }
        return maxLevel;
    }

    // some extra logic for Yanfly's class change core to support "class max level"
    // by default, it assumes the class max level is the actor's max level.
    if (Imported.YEP_ClassChangeCore) {

        // class level needs to be capped based on class max level or actor max level,
        // whichever is smallest
        Game_Actor.prototype.classLevel = function(classId) {
            if (Yanfly.Param.CCCMaintainLv) return this.level;
            if (this._exp[classId] === undefined) this._exp[classId] = 0;

            var maxLevel = Math.min(this.maxLevel(), this.maxClassLevel(classId));
            var level = 1;
            for (;;) {
                if (level >= maxLevel) break;
                if (this.expForClassLevel(classId, level + 1) > this._exp[classId]) break;
                level++;
            }
            return level;
        };

        Game_Actor.prototype.expForClassLevel = function(classId, level) {
            if ($.hasExpTable(this.currentClass())) {
                return $dataClasses[classId].expTable[level];
            }
        };
    }
})(TH.ExpTables);