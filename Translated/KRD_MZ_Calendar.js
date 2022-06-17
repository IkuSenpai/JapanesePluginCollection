/*:
 * @target MZ
 * @plugindesc カレンダー表示
 * @url https://twitter.com/kuroudo119/
 * @url https://github.com/kuroudo119/RPGMZ-Plugin
 * @author kuroudo119 (くろうど)
 * @base KRD_MZ_Table
 * 
 * @param lineHeight
 * @text 行の高さ
 * @desc カレンダーの行の高さ。初期値の 0 の場合システムの値を使用。
 * @default 0
 * @type number
 * 
 * @param windowWidth
 * @text ウィンドウ横幅
 * @desc カレンダーウィンドウの横幅。初期値の 0 にすると画面の横幅。
 * @default 0
 * @type number
 * 
 * @param varYear
 * @text 年の変数番号
 * @desc カレンダー開始時の年を入れる変数。
 * @default 1
 * @type variable
 * 
 * @param varMonth
 * @text 月の変数番号
 * @desc カレンダー開始時の月を入れる変数。
 * @default 2
 * @type variable
 * 
 * @param varDate
 * @text 日の変数番号
 * @desc カレンダー開始時の日を入れる変数。
 * @default 3
 * @type variable
 * 
 * @command startScene
 * @text シーン開始
 * @desc Scene_Calendar を始めます。
 * 
 * @command getFullYear
 * @text 年取得
 * @desc 年(4桁)を取得します。
 * @arg result
 * @text 取得データ
 * @desc 取得した値を入れる変数番号です。
 * @type variable
 * 
 * @command getMonth
 * @text 月取得
 * @desc 月を取得します。
 * @arg result
 * @text 取得データ
 * @desc 取得した値を入れる変数番号です。
 * @type variable
 * 
 * @command getDate
 * @text 日取得
 * @desc 日を取得します。
 * @arg result
 * @text 取得データ
 * @desc 取得した値を入れる変数番号です。
 * @type variable
 * 
 * @help
# KRD_MZ_Calendar.js

カレンダー表示クラス追加

## 権利表記

(c) 2021 kuroudo119 (くろうど)

## 利用規約

このプラグインはMITライセンスです。
https://github.com/kuroudo119/RPGMZ-Plugin/blob/master/LICENSE

## 更新履歴

- ver.0.0.1 (2021/08/09) 作成開始
- ver.0.1.0 (2021/08/12) 非公開版完成
- ver.1.0.0 (2021/08/13) 公開
- ver.1.1.0 (2021/08/14) rect中心座標関数を追加
- ver.1.2.0 (2021/08/15) rect左上座標関数を追加
- ver.1.2.1 (2021/08/15) バグ修正。通常マップ用Spriteset_Map処理を追加
- ver.1.2.2 (2021/08/21) 即時関数外の変数宣言をletに修正。
- ver.1.3.0 (2021/09/19) ページ（月）切替を追加。
- ver.1.4.0 (2021/10/25) プラグインコマンドを追加。

 * 
 * 
 */

let Window_Calendar = null;
let Scene_Calendar = null;

(() => {

"use strict";

const PLUGIN_NAME = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
const PARAM = PluginManager.parameters(PLUGIN_NAME);

const LINE_HEIGHT = Number(PARAM["lineHeight"]) || 0;
const WINDOW_WIDTH = Number(PARAM["windowWidth"]) || 0;

const VAR_YEAR = Number(PARAM["varYear"]) || 0;
const VAR_MONTH = Number(PARAM["varMonth"]) || 0;
const VAR_DATE = Number(PARAM["varDate"]) || 0;

PluginManager.registerCommand(PLUGIN_NAME, "startScene", args => {
	SceneManager.push(Scene_Calendar);
});

PluginManager.registerCommand(PLUGIN_NAME, "getFullYear", args => {
	$gameVariables.setValue(
		args.result,
		SceneManager._scene._calendarWindow.getFullYear()
	);
});

PluginManager.registerCommand(PLUGIN_NAME, "getMonth", args => {
	$gameVariables.setValue(
		args.result,
		SceneManager._scene._calendarWindow.getMonth()
	);
});

PluginManager.registerCommand(PLUGIN_NAME, "getDate", args => {
	$gameVariables.setValue(
		args.result,
		SceneManager._scene._calendarWindow.getDate()
	);
});

Window_Calendar = class extends Window_Table {
	constructor(rect, date) {
		super(...arguments);
		if (date) {
			this.setDate(date);
			this.select(this.initIndex());
			this.refresh();
		} else {
			this.setDate(this.makeDate());
			this.select(this.initIndex());
			this.refresh();
		}
	}

	makeDate() {
		const year = Number($gameVariables.value(VAR_YEAR));
		const month = Number($gameVariables.value(VAR_MONTH));
		const date = Number($gameVariables.value(VAR_DATE));
		if (year && month && date) {
			return new Date(year, month - 1, date);
		} else {
			return new Date();
		}
	}

	setDate(date) {
		this._year = date.getFullYear();
		this._month = date.getMonth();
		this._date = date.getDate();
	}

	addHeader() {
		Window_Calendar.daysJa.forEach(day => {
			this.addCommand(day, "header", false);
		}, this);
	}

	addTable() {
		for (let i = 1; i <= this.monthLength(); i++) {
			this.addCommand(i, "calendar");
		}
	}

	drawHeader() {
		const start = 0;
		const end = this.maxCols();
		const color = [10, 0, 0, 0, 0, 0, 1];
		this.drawBlockItem(start, end, color, false);
	}

	drawTable() {
		const start = this.maxCols() + this.blank();
		const end = this.maxVisibleItems();
		const color = [10, 0, 0, 0, 0, 0, 1];
		this.drawBlockItem(start, end, color, true);
	}

	monthLength() {
		// 月末日を取得する。
		// ここだけ month + 1 なので注意。
		// 日付が 0 なので、1日の前日となり、前月の月末日になるみたい。
		return new Date(this._year, this._month + 1, 0).getDate();
	}

	maxCols() {
		return 7;
	}

	blank() {
		// 始まりの曜日を取得する。
		return new Date(this._year, this._month, 1).getDay();
	}

	getFullYear() {
		return this._year;
	}

	getMonth() {
		return this._month + 1;
	}

	getDate() {
		return this.currentData().name;
	}

	getDay() {
		return new Date(this._year, this._month, this.currentData().name).getDay();
	}

	dayText() {
		return Window_Calendar.daysJa[this.getDay()];
	}

	dateText() {
		const date = new Date(this._year, this._month, this.currentData().name);
		return date.toLocaleDateString();
	}

	initIndex() {
		return super.initIndex() + this._date - 1;
	}

	lineHeight() {
		return !!LINE_HEIGHT ? LINE_HEIGHT : super.lineHeight(...arguments);
	}

	itemHeight() {
		return !!LINE_HEIGHT ? LINE_HEIGHT : super.itemHeight(...arguments);
	}

	fittingHeight(numLines) {
		return !!LINE_HEIGHT ? numLines * LINE_HEIGHT + $gameSystem.windowPadding() * 2 : super.fittingHeight(...arguments);
	}

	rectX(index) {
		const rect = this.itemRect(index);
		return this.x + rect.x + this.padding + Math.floor(this.itemPadding() / 2);
	}

	rectY(index) {
		const rect = this.itemRect(index);
		return this.y + rect.y + this.padding + Math.floor(this.itemPadding() / 2);
	}

	rectCenterX(index) {
		const rect = this.itemRect(index);
		return this.rectX(index) + Math.floor(rect.width / 2);
	}

	rectCenterY(index) {
		const rect = this.itemRect(index);
		return this.rectY(index) + Math.floor(rect.height / 2);
	}
};

Window_Calendar.daysJa = ["日", "月", "火", "水", "木", "金", "土"];

Scene_Calendar = class extends Scene_Map {
	constructor() {
		super(...arguments);
		this._spritesetFlag = true;
	}

	createDisplayObjects() {
		this.createSpriteset();
		this.createWindowLayer();
  
		this.createCalendarObjects();

		this.createAllWindows();
		this.createButtons();
		this._mapNameWindow.hide();
	};

	createCalendarObjects() {
		this.createCalendarWindow();
		this.createTitleWindow();
		this.drawTitle();
		this.createPictureLayer();
	}

	createCalendarWindow(date) {
		const rect = this.calendarWindowRect();
		const calendarWindow = new Window_Calendar(rect, date);
		calendarWindow.setHandler("calendar", this.commandDay.bind(this));
		calendarWindow.setHandler("cancel", this.commandCancel.bind(this));
		calendarWindow.setHandler("pagedown", this.nextMonth.bind(this));
		calendarWindow.setHandler("pageup", this.previousMonth.bind(this));
	  this.addWindow(calendarWindow);
		this._calendarWindow = calendarWindow;
	}

	calendarWindowRect() {
		const titleH = this.calcWindowHeight(1, false);
		const ww = WINDOW_WIDTH ? WINDOW_WIDTH : Graphics.boxWidth;
		const wh = this.calcWindowHeightCalendar(7);
		const wx = 0;
		const wy = this.buttonAreaHeight() + titleH;
		return new Rectangle(wx, wy, ww, wh);
	}

	createTitleWindow() {
		const rect = this.titleWindowRect();
		const titleWindow = new Window_Base(rect);
		this.addWindow(titleWindow);
		this._titleWindow = titleWindow;
	}

	titleWindowRect() {
		const ww = WINDOW_WIDTH ? WINDOW_WIDTH : Graphics.boxWidth;
		const wh = this.calcWindowHeight(1, false);
		const wx = 0;
		const wy = this.buttonAreaHeight();
		return new Rectangle(wx, wy, ww, wh);
	}

	calcWindowHeightCalendar(numLines) {
		return Window_Calendar.prototype.fittingHeight(numLines);
	}

	commandDay() {
		// オーバーライドして使う。
		alert(this._calendarWindow.dateText() + " (" + this._calendarWindow.dayText() + ")");
		this._calendarWindow.activate();
	}

	commandCancel() {
		// オーバーライドして使う。
		SceneManager.goto(Scene_Title);
	}

	drawTitle() {
		const year = this._calendarWindow.getFullYear();
		const month = this._calendarWindow.getMonth();
		const text = year + "年" + month + "月";
		this._titleWindow.contents.clear();
		this._titleWindow.drawText(text, 0, 0, this._titleWindow.innerWidth, "center");
	}

	createButtons() {
		if (ConfigManager.touchUI) {
				this.createCancelButton();
				this.createPageButtons();
		}
	}

	createCancelButton() {
		this._cancelButton = new Sprite_Button("cancel");
		this._cancelButton.x = Graphics.boxWidth - this._cancelButton.width - 4;
		this._cancelButton.y = this.buttonY();
		this.addWindow(this._cancelButton);
	};

	createPictureLayer() {
		this._spriteset = new Spriteset_Picture();
		this.addChild(this._spriteset);
		this._spriteset.update();
	}

	createSpriteset() {
		this._spritesetOther = new Spriteset_Map();
		this.addChild(this._spritesetOther);
		this._spritesetOther.update();
	}

	nextMonth() {
		const year = this._calendarWindow.getFullYear();
		const month = this._calendarWindow.getMonth() - 1;
		this._calendarWindow.close();
		this.createCalendarWindow(new Date(year, month + 1, 1));
		this.drawTitle();
	}

	previousMonth() {
		const year = this._calendarWindow.getFullYear();
		const month = this._calendarWindow.getMonth() - 1;
		this._calendarWindow.close();
		this.createCalendarWindow(new Date(year, month - 1, 1));
		this.drawTitle();
	}

	createPageButtons() {
		this._pageupButton = new Sprite_Button("pageup");
		this._pageupButton.x = 4;
		this._pageupButton.y = this.buttonY();
		const pageupRight = this._pageupButton.x + this._pageupButton.width;
		this._pagedownButton = new Sprite_Button("pagedown");
		this._pagedownButton.x = pageupRight + 4;
		this._pagedownButton.y = this.buttonY();
		this.addWindow(this._pageupButton);
		this.addWindow(this._pagedownButton);
		this._pageupButton.setClickHandler(this.previousMonth.bind(this));
		this._pagedownButton.setClickHandler(this.nextMonth.bind(this));
	}
};

// ピクチャ表示を最前面にする。
class Spriteset_Picture extends Spriteset_Base {
	createLowerLayer() {
		//
	}

	createUpperLayer() {
		this.createPictures();
	}

	update = function() {
		Sprite.prototype.update.call(this);
	}
}

// ここのピクチャ表示を使わない。
const KRD_Spriteset_Map_createUpperLayer = Spriteset_Map.prototype.createUpperLayer;
Spriteset_Map.prototype.createUpperLayer = function() {
	const flag = SceneManager._scene._spritesetFlag;
	if (flag) {
		this.createTimer();
		this.createOverallFilters();
	} else {
		KRD_Spriteset_Map_createUpperLayer.apply(this, arguments);
	}
};

})();
