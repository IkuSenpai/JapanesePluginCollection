// ClassDescription.js Ver.1.1.1
// MIT License (C) 2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MZ
* @plugindesc 職業の説明を追加します。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/
* @help 職業のメモ欄に<desc:なんかいい感じの説明>と書くことで
* ステータスのヘルプ欄に職業の説明が表示できます。
*
* [更新履歴]
* 2022/05/08：Ver.1.0.0　公開
* 2022/05/31：Ver.1.1.0　MVを参考に見た目を改善。
* 2022/06/01：Ver.1.1.1　ライン幅を微調整。
*
* @param profile
* @text プロフィール
* @desc ヘルプ欄に表示される項目名
* @default プロフィール
*
* @param classDesc
* @text 職業
* @desc ヘルプ欄に表示される項目名
* @default 職業
*
* @param drawItemFrame
* @text 項目枠描画
* @desc 選択肢に枠を描画します。
* @default true
* @type boolean
*
* @param horzLine
* @text 水平線
* @desc 項目名とプロフィールを区切る線。
* @default true
* @type boolean
*
*/

'use strict';
{
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const parameter = PluginManager.parameters(pluginName);
	const profText = parameter["profile"];
	const classText = parameter["classDesc"];
	const drawItemFrame = parameter["drawItemFrame"] === "true";
	const horzLine = parameter["horzLine"] === "true";

	//-----------------------------------------------------------------------------
	// Window_Status

	Window_Status.prototype.drawBlock1 = function() {
		const y = this.block1Y();
		this.drawActorFace(this._actor, 4, y);
		this.drawBasicInfo(ImageManager.faceWidth + 20, y);
		this.drawExpInfo(528, y);
	};

	Window_Status.prototype.block1Y = function() {
		return (this.innerHeight - ImageManager.faceHeight)/2
	};

	Window_Status.prototype.drawBlock2 = function() {};

	Window_Status.prototype.drawBasicInfo = function(x, y) {
		const actor = this._actor;
		const lineHeight = this.lineHeight();
		const x2 = x + 180;
		this.drawActorName(actor, x, y);
		this.drawActorNickname(actor, x, y + lineHeight);
		this.drawActorLevel(actor, x, y + lineHeight * 2);
		this.drawActorIcons(actor, x, y + lineHeight * 3);
		this.drawActorClass(actor, x2, y);
		this.placeBasicGauges(actor, x2, y + lineHeight * 2);
	};

	Window_Status.prototype.drawExpInfo = function(x, y) {
		const lineHeight = this.lineHeight();
		const expTotal = TextManager.expTotal.format(TextManager.exp);
		const expNext = TextManager.expNext.format(TextManager.level);
		const maxWidth = 270 - 24
		this.changeTextColor(ColorManager.systemColor());
		this.drawText(expTotal, x, y + lineHeight * 0, maxWidth);
		this.drawText(expNext, x, y + lineHeight * 2, maxWidth);
		this.resetTextColor();
		this.drawText(this.expTotalValue(), x, y + lineHeight * 1, maxWidth, "right");
		this.drawText(this.expNextValue(), x, y + lineHeight * 3, maxWidth, "right");
	};

	//-----------------------------------------------------------------------------
	// Window_Profile

	function Window_Profile() {
		this.initialize(...arguments);
	}

	Window_Profile.prototype = Object.create(Window_HorzCommand.prototype);
	Window_Profile.prototype.constructor = Window_Profile;

	Window_Profile.prototype.initialize = function(rect) {
		Window_HorzCommand.prototype.initialize.call(this, rect);
		this._actor = null;
	};

	if (!drawItemFrame) {
		Window_Profile.prototype.drawBackgroundRect = function(rect) {};
	}

	Window_Profile.prototype.makeCommandList = function() {
		const actor = this._actor;
		this.addCommand(profText, "profile", !!(actor && actor.profile()));
		this.addCommand(classText, "class", !!(actor && actor.currentClass().meta["desc"]));
	};

	Window_Profile.prototype.isOkEnabled = function() {
		return false;
	};

	Window_Profile.prototype.isCancelEnabled = function() {
		return false;
	};

	Window_Profile.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_Profile.prototype.actor = function() {
		return this._actor;
	};

	Window_Profile.prototype.setText = function() {};

	Window_Profile.prototype.select = function(index) {
		Window_HorzCommand.prototype.select.call(this, index);
		this.refreshProfileText();
	};

	Window_Profile.prototype.refresh = function() {
		Window_HorzCommand.prototype.refresh.call(this);
		if (horzLine) {
			this.drawHorzLine();
		}
		this.refreshProfileText();
	};

	Window_Profile.prototype.drawHorzLine = function() {
		const padding = this.itemPadding();
		const lineHeight = this.lineHeight();
		const itemY = this.itemNameY();
		const profileY = this.profileY();
		const y = Math.floor((itemY + profileY + lineHeight) / 2)-1;
		const width = this.innerWidth;
		const color = ColorManager.normalColor();
		this.contents.paintOpacity = 48;
		this.contents.fillRect(0, y, width, 2, color);
		this.contents.paintOpacity = 255;
	};

	Window_Profile.prototype.itemNameY = function() {
		return this.itemLineRect(0).y;
	};

	Window_Profile.prototype.profileY = function() {
		return this.profileRect().y;
	};

	Window_Profile.prototype.refreshProfileText = function() {
		let text = "";
		const actor = this._actor;
		if (actor) {
			switch (this.currentSymbol()) {
			case "profile":
				text = actor.profile();
				break;
			case "class":
				text = actor.currentClass().meta["desc"] || "";
				break;
			}
		}

		const rect = this.profileRect();
		this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);
		this.drawTextEx(text, rect.x, rect.y, rect.width, rect.height);
	};

	Window_Profile.prototype.profileRect = function() {
		const start = 1;
		const length = 2;
        const rect = this.itemLineRect(start*4).enlarge(this.itemLineRect(start*4+length*4-1));
		rect.y += (this.itemHeight() - Window_Scrollable.prototype.itemHeight.call(this)) * 1;
		return rect;
	};

	//-----------------------------------------------------------------------------
	// Scene_Status

	Scene_Status.prototype.createProfileWindow = function() {
		const rect = this.profileWindowRect();
		this._profileWindow = new Window_Profile(rect);
		this.addWindow(this._profileWindow);
	};

	Scene_Status.prototype.profileTabWindowRect = function() {
		const ww = Graphics.boxWidth;
		const wh = this.profileTabHeight();
		const wx = 0;
		const wy = this.profileWindowRect().y - wh;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Status.prototype.profileHeight = function() {
		return this.calcWindowHeight(3, true);
	};

	const _Scene_Status_refreshActor = Scene_Status.prototype.refreshActor;
	Scene_Status.prototype.refreshActor = function() {
		_Scene_Status_refreshActor.call(this);
		const actor = this.actor();
		this._profileWindow.setActor(actor);
	};
}