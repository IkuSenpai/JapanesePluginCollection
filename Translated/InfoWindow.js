// --------------------------------------------------------------------------
// 
// InfoWindow.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2020/08/24 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
 * @plugindesc 簡単な情報表示ウィンドウをマップ上に追加するプラグイン
 * @author kotonoha*
 * @target MZ
 * @help 簡単な情報表示ウィンドウをマップ画面上に配置します。
 *
 * ※このプラグインは中身の書き換えが必須です！
 * ある程度理解されている方が、
 * スクリプトの中身をエディタで編集してご活用ください。
 *
 */

(function() {

	// シーンへのウィンドウ呼び出し【変更不要】
	_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
	Scene_Map.prototype.createAllWindows = function() {
	    _Scene_Map_createAllWindows.call(this);
	    this.InfoWindow();
	};
	Scene_Map.prototype.InfoWindow = function() {
	    const rect = this.InfoWindowRect();
	    this._InfoWindow = new Window_Info(rect);
	    this.addWindow(this._InfoWindow);
	};

	// ウィンドウサイズ調整
	Scene_Map.prototype.InfoWindowRect = function() {
	    const wx = 24; // マップのX位置に表示
	    const wy = 24; // マップのY位置に表示
	    const ww = 180; // ウィンドウの幅
	    const wh = this.calcWindowHeight(2, false); // ウィンドウの高さ
	    return new Rectangle(wx, wy, ww, wh);
	};
	
	// ウィンドウの定義【変更不要】
	function Window_Info() {
	    this.initialize(...arguments);
	}

	// ウィンドウの初期化
	Window_Info.prototype = Object.create(Window_Base.prototype);
	Window_Info.prototype.constructor = Window_Info;
	Window_Info.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
		this.opacity = 255; // 背景の透明度
	    this.contentsOpacity = 255; // 情報の透明度
	    this._showCount = 0;
	    this.refresh();
	};

	// ウィンドウの更新【変更不要】
	Window_Info.prototype.update = function() {
	    Window_Base.prototype.update.call(this);
	    this.refresh(); // これを消すとメニュー開閉などを経ることで更新される
	};

	// ウィンドウ内の情報
	Window_Info.prototype.refresh = function() {
	    this.contents.clear();
        this.drawIcon(210, 1, 1);
	    this.changeTextColor(ColorManager.systemColor());
		this.drawText("拾った宝箱",40, 1);
	    this.resetTextColor();
	    // 変数ID:1（$gameVariables.value(1)）を表示
		this.drawText($gameVariables.value(1) + " 個",0,this.lineHeight());
	};

})();