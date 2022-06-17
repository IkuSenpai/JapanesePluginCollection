//=============================================================================
// RPGツクールMZ - LL_MenuScreenShop.js v1.0.3
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ショップ画面に立ち絵を表示します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-menuscreenshop/
 * @base LL_MenuScreenBase
 * @orderAfter LL_MenuScreenBase
 *
 * @help LL_MenuScreenShop.js
 *
 * ショップの購入画面で装備品が選択されている時に、
 * 選択されているアクターの立ち絵を自動表示します。
 * ※表示する立ち絵リストは「LL_MenuScreenBase」で設定してください。
 *
 * アクター立ち絵の表示位置について:
 *   アクター立ち絵はLL_MenuScreenBaseで設定済みのX・Y座標に表示されます。
 *   (戦闘中立ち絵プラグインと連携している場合は、戦闘中立ち絵のX・Y座標)
 *   表示位置は右側の「X座標始点」「Y座標始点」で調整できます。
 *
 * 店員の立ち絵表示について:
 *   店員の立ち絵と台詞を「店員設定リスト」で設定することができます。
 *   (立ち絵のみ、台詞のみ、背景画像のみとかでも設定できます)
 *   「店員指定変数」で設定した変数でショップ毎に店員の切り替えが可能です。
 *
 * アイテムカテゴリを他プラグインで拡張している場合:
 *   「カテゴリを標準幅で表示」を有効にすると競合を解決できる場合があります。
 *   この場合は「LL_MenuScreenShop」を他プラグインよりも下に配置してください。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2022/1/24
 *
 * @param actorSettings
 * @text アクター立ち絵表示の設定
 * @desc ※この項目は使用しません
 *
 * @param shopWindowPictureX
 * @text X座標始点
 * @desc アクター立ち絵の表示位置(X)調整値です。(初期値: 0)
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -9999
 * @type number
 * @parent actorSettings
 *
 * @param shopWindowPictureY
 * @text Y座標始点
 * @desc アクター立ち絵の表示位置(Y)調整値です。(初期値: 0)
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -9999
 * @type number
 * @parent actorSettings
 *
 * @param shopSettings
 * @text 店員立ち絵表示の設定
 * @desc ※この項目は使用しません
 *
 * @param shopLists
 * @text 店員設定リスト
 * @desc ショップで表示する店員のリストを作成します。
 * @default []
 * @type struct<shopLists>[]
 * @parent shopSettings
 *
 * @param shopNumberVariable
 * @text 店員指定変数
 * @desc 店員設定リストを指定する変数IDです。
 * この変数に入っている番号の店員設定が自動で呼び出されます。
 * @type variable
 * @parent shopSettings
 *
 * @param shopMessageWindowSettings
 * @text メッセージウィンドウの設定
 * @desc ※この項目は使用しません
 *
 * @param shopMessageWindowOffsetX
 * @text X座標調整値
 * @desc ウィンドウの表示位置(X)の調整値です。
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent shopMessageWindowSettings
 *
 * @param shopMessageWindowOffsetY
 * @text Y座標調整値
 * @desc ウィンドウの表示位置(Y)の調整値です。
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -9999
 * @max 9999
 * @type number
 * @parent shopMessageWindowSettings
 *
 * @param shopMessageWindowWidth
 * @text 幅
 * @desc ウィンドウの幅です。
 * 数値かスクリプト形式で入力してください。
 * @default Graphics.boxWidth / 2
 * @type string
 * @parent shopMessageWindowSettings
 *
 * @param shopMessageWindowNumRows
 * @text 行数
 * @desc ウィンドウの高さを何行分にするか設定します。
 * @default 4
 * @type number
 * @parent shopMessageWindowSettings
 *
 * @param itemCategoryWindowDefault
 * @text カテゴリを標準幅で表示
 * @desc 売却画面のカテゴリウィンドウの幅を調整しません。
 * 他プラグインとの競合用設定です。(通常はOFFのままでOKです)
 * @default false
 * @type boolean
 */

/*~struct~shopLists:
 *
 * @param number
 * @text 番号
 * @desc 店員指定変数で呼び出される番号です。
 * 重複しない番号でリストを作成してください。
 * @max 2000
 * @min 1
 * @type number
 *
 * @param staffImageName
 * @text 店員立ち絵画像
 * @desc 店員の立ち絵として表示する画像ファイルです。
 * ※設定なしでも可
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param staffThanksImageName
 * @text 店員立ち絵画像 (お礼)
 * @desc 購入・売却完了時に立ち絵を切り替える場合に設定します。
 * ※設定なしの場合は通常立ち絵がそのまま表示されます
 * @dir img/pictures
 * @type file
 * @require 1
 *
 * @param x
 * @text X座標
 * @desc 店員立ち絵の表示位置(X)です。
 * @default 464
 * @min -9999
 * @type number
 *
 * @param y
 * @text Y座標
 * @desc 店員立ち絵の表示位置(Y)です。
 * @default 96
 * @min -9999
 * @type number
 *
 * @param commandMessage
 * @text ショップ画面メッセージ
 * @desc ショップ画面開始時に表示されるメッセージです。
 * ※設定なしでも可
 * @type multiline_string
 *
 * @param buyMessage
 * @text 購入画面メッセージ
 * @desc 購入画面で表示されるメッセージです。
 * ※設定なしでも可
 * @type multiline_string
 *
 * @param sellMessage
 * @text 売却画面メッセージ
 * @desc 売却画面で表示されるメッセージです。
 * ※設定なしでも可
 * @type multiline_string
 *
 * @param thanksMessage
 * @text お礼メッセージ
 * @desc 購入・売却完了時のメッセージです。
 * ※設定なしでも可
 * @type multiline_string
 *
 * @param backgroundImage
 * @text 背景画像
 * @desc 背景画像を表示する場合は画像を選択してください。
 * @dir img/pictures
 * @type file
 * @require 1
 */

(() => {
	"use strict";
	const pluginName = "LL_MenuScreenShop";

	const parameters = PluginManager.parameters(pluginName);
	const shopWindowPictureX = Number(parameters["shopWindowPictureX"] || 0);
	const shopWindowPictureY = Number(parameters["shopWindowPictureY"] || 0);
	const shopNumberVariable = Number(parameters["shopNumberVariable"] || 0);
	const shopListArrays = JSON.parse(parameters["shopLists"] || "null");
	const itemCategoryWindowDefault = eval(parameters["itemCategoryWindowDefault"] || "false");
	const shopMessageWindowOffsetX = Number(parameters["shopMessageWindowOffsetX"] || 0);
	const shopMessageWindowOffsetY = Number(parameters["shopMessageWindowOffsetY"] || 0);
	const shopMessageWindowWidth = String(parameters["shopMessageWindowWidth"] || "Graphics.boxWidth / 2");
	const shopMessageWindowNumRows = Number(parameters["shopMessageWindowNumRows"] || 4);
	let shopLists = [];
	if (shopListArrays) {
		shopListArrays.forEach((elm) => {
			shopLists.push(JSON.parse(elm));
		});
	}

	let shopSettings = null;
	let callUpdateMessageWithPicture = false;


	//-----------------------------------------------------------------------------
	// Scene_Shop
	//
	// The scene class of the shop screen.

	const _Scene_Shop_initialize = Scene_Shop.prototype.initialize;
	Scene_Shop.prototype.initialize = function() {
		_Scene_Shop_initialize.apply(this, arguments);

		// ショップ設定の読み込み
		this.loadShopExSettings();
	};

	Scene_Shop.prototype.loadShopExSettings = function() {
		shopSettings = shopLists.find(function(item) {
			if (Number(item.number) == $gameVariables.value(shopNumberVariable)) return true;
		});
		if (!shopSettings) {
			shopSettings = {
				backgroundImage: "",
				buyMessage: "",
				commandMessage: "",
				number: -1,
				sellMessage: "",
				staffImageName: "",
				staffThanksImageName: "",
				thanksMessage: "",
				x: 0,
				y: 0
			};
		}
	};

	const _Scene_Shop_update = Scene_Shop.prototype.update;
	Scene_Shop.prototype.update = function() {
		_Scene_Shop_update.apply(this, arguments);

		this.updateStandingPicture();
	};

	const _Scene_Shop_create = Scene_Shop.prototype.create;
	Scene_Shop.prototype.create = function() {
		_Scene_Shop_create.apply(this, arguments);

		this.createMessageWindow();
		this.createStandingPicture();
		this.reserveStandingPictures();
		this.refreshActor();
		this.updateMessageWithPicture();

		this._dummyWindow.opacity = 0;
		if (this._pageupButton && this._pagedownButton) {
			this._pageupButton.visible = false;
			this._pagedownButton.visible = false;
		}
	};

	Scene_Shop.prototype.createStandingPicture = function() {
		// 店員立ち絵
		this._staffPicture = new Sprite();
		this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
		this._staffPicture.x = Number(shopSettings.x);
		this._staffPicture.y = Number(shopSettings.y);
		this.addChildAt(this._staffPicture, this.children.indexOf(this._windowLayer));
		// 対象アクター立ち絵
		this._actorPicture = new Sprite();
		this._actorPicture.bitmap = ImageManager.loadPicture("");
		this._actorPicture.x = 0;
		this._actorPicture.y = 0;
		this.addChildAt(this._actorPicture, this.children.indexOf(this._windowLayer));
	};

	const _Scene_Shop_createBackground = Scene_Shop.prototype.createBackground;
	Scene_Shop.prototype.createBackground = function() {
		if (shopSettings.backgroundImage) {
			// 独自の背景画像を表示
			this._backgroundSprite = new Sprite();
			this._backgroundSprite.bitmap = ImageManager.loadPicture(String(shopSettings.backgroundImage));
			this.addChild(this._backgroundSprite);
			return;
		}
		_Scene_Shop_createBackground.apply(this, arguments);
	};

	Scene_Shop.prototype.dummyWindowRect = function() {
		const wx = 0;
		const wy = this._commandWindow.y + this._commandWindow.height;
		const ww = Graphics.boxWidth / 2;
		const wh = this.mainAreaHeight() - this._commandWindow.height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.statusWindowRect = function() {
		const ww = this.statusWidth();
		const wh = this.statusHeight();
		const wx = 0;
		const wy = this._dummyWindow.y + this.buyWindowRect().height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.buyWindowRect = function() {
		const wx = 0;
		const wy = this._dummyWindow.y;
		const ww = this._dummyWindow.width;
		const wh = this._dummyWindow.height - this.statusHeight();
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.createCategoryWindow = function() {
		const rect = this.categoryWindowRect();
		this._categoryWindow = new Window_ShopItemCategory(rect);
		this._categoryWindow.setHelpWindow(this._helpWindow);
		this._categoryWindow.hide();
		this._categoryWindow.deactivate();
		this._categoryWindow.setHandler("ok", this.onCategoryOk.bind(this));
		this._categoryWindow.setHandler("cancel", this.onCategoryCancel.bind(this));
		this.addWindow(this._categoryWindow);
	};

	const _Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
	Scene_Shop.prototype.categoryWindowRect = function() {
		if (itemCategoryWindowDefault) {
			return _Scene_Shop_categoryWindowRect.apply(this, arguments);
		}

		const wx = 0;
		const wy = this._dummyWindow.y;
		const ww = this._dummyWindow.width;
		const wh = this.calcWindowHeight(2, true);
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.sellWindowRect = function() {
		const wx = 0;
		const wy = this._categoryWindow.y + this._categoryWindow.height;
		const ww = this._dummyWindow.width;
		const wh =
			this.mainAreaHeight() -
			this._commandWindow.height -
			this._categoryWindow.height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.statusWidth = function() {
		return Graphics.boxWidth / 2;
	};

	Scene_Shop.prototype.statusHeight = function() {
		return 160;
	};

	const _Scene_Shop_activateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
	Scene_Shop.prototype.activateBuyWindow = function() {
		_Scene_Shop_activateBuyWindow.apply(this, arguments);

		this.updateMessageWithPicture();
	};

	const _Scene_Shop_commandSell = Scene_Shop.prototype.commandSell;
	Scene_Shop.prototype.commandSell = function() {
		_Scene_Shop_commandSell.apply(this, arguments);

		this.updateMessageWithPicture();
	};

	const _Scene_Shop_onBuyOk = Scene_Shop.prototype.onBuyOk;
	Scene_Shop.prototype.onBuyOk = function() {
		_Scene_Shop_onBuyOk.apply(this, arguments);

		this._statusWindow.hide();
		this.updateMessageWithPicture("buy");
	};

	const _Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
	Scene_Shop.prototype.onBuyCancel = function() {
		_Scene_Shop_onBuyCancel.apply(this, arguments);

		this._messageWindow.show();
		this.updateMessageWithPicture();
	};

	const _Scene_Shop_onCategoryCancel = Scene_Shop.prototype.onCategoryCancel;
	Scene_Shop.prototype.onCategoryCancel = function() {
		_Scene_Shop_onCategoryCancel.apply(this, arguments);

		this.updateMessageWithPicture();
	};

	const _Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
	Scene_Shop.prototype.onSellOk = function() {
		_Scene_Shop_onSellOk.apply(this, arguments);

		this._statusWindow.hide();
		this.updateMessageWithPicture("sell");
	};

	const _Scene_Shop_onSellCancel = Scene_Shop.prototype.onSellCancel;
	Scene_Shop.prototype.onSellCancel = function() {
		_Scene_Shop_onSellCancel.apply(this, arguments);

		this.updateMessageWithPicture("sell");
	};

	const _Scene_Shop_onNumberOk = Scene_Shop.prototype.onNumberOk;
	Scene_Shop.prototype.onNumberOk = function() {
		_Scene_Shop_onNumberOk.apply(this, arguments);

		this.updateMessageWithPicture("thanks");
	};

	Scene_Shop.prototype.createBuyWindow = function() {
		const rect = this.buyWindowRect();
		this._buyWindow = new Window_ShopBuy(rect);
		this._buyWindow.setupGoods(this._goods);
		this._buyWindow.setHelpWindow(this._helpWindow);
		this._buyWindow.setStatusWindow(this._statusWindow);
		this._buyWindow.hide();
		this._buyWindow.setHandler("ok", this.onBuyOk.bind(this));
		this._buyWindow.setHandler("cancel", this.onBuyCancel.bind(this));
		this._buyWindow.setHandler("pagedown", this.nextActor.bind(this));
		this._buyWindow.setHandler("pageup", this.previousActor.bind(this));
		this.addWindow(this._buyWindow);
	};

	Scene_Shop.prototype.createMessageWindow = function() {
		const rect = this.messageWindowRect();
		this._messageWindow = new Window_ShopMessage(rect);
		this.addWindow(this._messageWindow);
	};

	Scene_Shop.prototype.messageWindowRect = function() {
		const ww = Graphics.boxWidth;
		const wh = this.calcWindowHeight(4, false) + 8;
		const wx = 0;
		const wy = Graphics.boxHeight - wh - this._helpWindow.height;
		return new Rectangle(wx, wy, ww, wh);
	};

	Scene_Shop.prototype.needsPageButtons = function() {
		return true;
	};

	Scene_Shop.prototype.arePageButtonsEnabled = function() {
		return (this._buyWindow && this._buyWindow.active);
	};

	Scene_Shop.prototype.onActorChange = function() {
		Scene_MenuBase.prototype.onActorChange.call(this);
		this.refreshActor();
		this.activateBuyWindow();
	};

	Scene_Shop.prototype.refreshActor = function() {
		const actor = this.actor();
		this._statusWindow.setActor(actor);
	};

	Scene_Shop.prototype.updateStandingPicture = function() {
		if (callUpdateMessageWithPicture) {
			this.updateMessageWithPicture();
			callUpdateMessageWithPicture = false;
		}

		if (this._buyWindow && this._buyWindow.active) {
			const item = this._buyWindow.item();
			if (DataManager.isWeapon(item) || DataManager.isArmor(item)) {
				const actor = this.actor();
				const equipPicture = ExMenuScreenBase.getImageName(actor.actorId());
				if (equipPicture) {
					// ピンチ判定 (旧Ver.)
					if (ExMenuScreenBase.getHpRate(actor._actorId) > Number(equipPicture.pinchPercentage) || !equipPicture.pinchImageName) {
						// 通常
						this._actorPicture.bitmap = ImageManager.loadPicture(equipPicture.imageName);
					} else {
						// ピンチ
						this._actorPicture.bitmap = ImageManager.loadPicture(equipPicture.pinchImageName);
					}
					this._actorPicture.x = Number(equipPicture.x) + shopWindowPictureX;
					this._actorPicture.y = Number(equipPicture.y) + shopWindowPictureY;
					this._actorPicture.scale.x = Number(equipPicture.scaleX) / 100;
					this._actorPicture.scale.y = Number(equipPicture.scaleY) / 100;
					this._actorPicture.opacity = 255;
					this._staffPicture.opacity = 0;
					this._messageWindow.hide();
					return;
				}
			}
		}

		this._actorPicture.opacity = 0;
		this._staffPicture.opacity = 255;
		if (this._messageWindow._text) this._messageWindow.show();
	};

	Scene_Shop.prototype.updateMessageWithPicture = function(messageType) {
		if (!messageType) {
			if (this._commandWindow && this._commandWindow.active) {
				messageType = "command";
			}
			if (this._buyWindow && this._buyWindow.active) {
				messageType = "buy";
			}
			if (this._categoryWindow && this._categoryWindow.active) {
				messageType = "sell";
			}
			if (this._sellWindow && this._sellWindow.active) {
				messageType = "sell";
			}
		}

		// ウィンドウ位置調整値
		const offsetX = shopMessageWindowOffsetX;
		const offsetY = shopMessageWindowOffsetY;
		const windowWidth = eval(shopMessageWindowWidth);
		let windowHeight = this.calcWindowHeight(shopMessageWindowNumRows, false);
		if (shopMessageWindowNumRows == 4) {
			windowHeight = this._statusWindow.height;
		}

		switch (messageType) {
			case "command":
				this._messageWindow.setText(String(shopSettings.commandMessage));
				this._messageWindow.width = Graphics.boxWidth;
				this._messageWindow.height = this.calcWindowHeight(4, false) + 8;
				this._messageWindow.x = (Graphics.boxWidth - this._messageWindow.width) / 2;
				this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height;
				this._messageWindow.show();
				this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
				break;
			case "buy":
				this._messageWindow.setText(String(shopSettings.buyMessage));
				this._messageWindow.width = windowWidth;
				this._messageWindow.height = windowHeight;
				this._messageWindow.x = this._buyWindow.width + offsetX;
				this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height - this._helpWindow.height + offsetY;
				this._messageWindow._text ? this._messageWindow.show() : this._messageWindow.hide();
				this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
				break;
			case "sell":
				this._messageWindow.setText(String(shopSettings.sellMessage));
				this._messageWindow.width = windowWidth;
				this._messageWindow.height = windowHeight;
				this._messageWindow.x = this._buyWindow.width + offsetX;
				this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height - this._helpWindow.height + offsetY;
				this._messageWindow._text ? this._messageWindow.show() : this._messageWindow.hide();
				this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffImageName));
				break;
			case "thanks":
				if (shopSettings.thanksMessage) {
					this._messageWindow.setText(String(shopSettings.thanksMessage));
					this._messageWindow.width = windowWidth;
					this._messageWindow.height = windowHeight;
					this._messageWindow.x = this._buyWindow.width + offsetX;
					this._messageWindow.y = Graphics.boxHeight - this._messageWindow.height - this._helpWindow.height + offsetY;
					this._messageWindow._text ? this._messageWindow.show() : this._messageWindow.hide();
				}
				if (shopSettings.staffThanksImageName) {
					this._staffPicture.bitmap = ImageManager.loadPicture(String(shopSettings.staffThanksImageName));
				}
				break;
		}
	}

	Scene_Shop.prototype.reserveStandingPictures = function() {
		if (shopSettings.staffImageName) ImageManager.loadPicture(String(shopSettings.staffImageName));
		if (shopSettings.staffThanksImageName) ImageManager.loadPicture(String(shopSettings.staffThanksImageName));

		$gameParty.members().forEach(function(actor) {
			const picture = ExMenuScreenBase.getImageName(actor._actorId);
			if (picture) {
				ImageManager.loadPicture(picture.imageName);
				// ピンチ時立ち絵 (旧Ver.)
				if (picture.pinchImageName) {
					ImageManager.loadPicture(picture.pinchImageName);
				}
			}
		}, this);
	};


	//-----------------------------------------------------------------------------
	// Window_ShopMessage
	//

	function Window_ShopMessage() {
		this.initialize(...arguments);
	}

	Window_ShopMessage.prototype = Object.create(Window_Base.prototype);
	Window_ShopMessage.prototype.constructor = Window_ShopMessage;

	Window_ShopMessage.prototype.initialize = function(rect) {
		Window_Base.prototype.initialize.call(this, rect);
		this._text = "";
	};

	Window_ShopMessage.prototype.setText = function(text) {
		if (this._text !== text) {
			this._text = text;
			this.refresh();
		}
	};

	Window_ShopMessage.prototype.clear = function() {
		this.setText("");
	};

	Window_ShopMessage.prototype.refresh = function() {
		const rect = this.baseTextRect();
		this.contents.clear();
		this.drawTextEx(this._text, rect.x, rect.y, rect.width);
	};

	//-----------------------------------------------------------------------------
	// Window_ShopStatus
	//
	// The window for displaying number of items in possession and the actor's
	// equipment on the shop screen.

	const _Window_ShopStatus_initialize = Window_ShopStatus.prototype.initialize;
	Window_ShopStatus.prototype.initialize = function(rect) {
		_Window_ShopStatus_initialize.apply(this, arguments, rect);

		this._actor = null;
		this._arrowCursorAnimation = 0;
		this.createArrowCursors();
	};

	const _Window_ShopStatus_update = Window_ShopStatus.prototype.update;
	Window_ShopStatus.prototype.update = function() {
		_Window_ShopStatus_update.apply(this, arguments);

		this.updateArrowCursor();
	};

	Window_ShopStatus.prototype.createArrowCursors = function() {
		const w = this._width;
		const h = this._height;
		const p = 24;
		const q = p / 2;
		const sx = 84 + p;
		const sy = 12 + p;
		this._rightArrowSprite = new Sprite();
		this.addChild(this._rightArrowSprite);
		this._rightArrowSprite.bitmap = this._windowskin;
		this._rightArrowSprite.anchor.x = 0.5;
		this._rightArrowSprite.anchor.y = 0.5;
		this._rightArrowSprite.setFrame(sx + q + 36, sy, q, p);
		this._rightArrowSprite.move(w - q / 2, h / 2 + 24);
		this._leftArrowSprite = new Sprite();
		this.addChild(this._leftArrowSprite);
		this._leftArrowSprite.bitmap = this._windowskin;
		this._leftArrowSprite.anchor.x = 0.5;
		this._leftArrowSprite.anchor.y = 0.5;
		this._leftArrowSprite.setFrame(sx + q, sy, q, p);
		this._leftArrowSprite.move(0 + q / 2, h / 2 + 24);
	}

	Window_ShopStatus.prototype.updateArrowCursor = function() {
		if (this._item && this._rightArrowSprite && this._leftArrowSprite) {
			if (this.isEquipItem() && $gameParty.size() > 1 && this._arrowCursorAnimation < 25) {
				this._rightArrowSprite.visible = true;
				this._leftArrowSprite.visible = true;
			} else {
				this._rightArrowSprite.visible = false;
				this._leftArrowSprite.visible = false;
			}
		}
		this._arrowCursorAnimation++;
		if (this._arrowCursorAnimation > 48) this._arrowCursorAnimation = 0;
	};

	Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
		const actor = this._actor;
		if (actor) {
			this.drawActorEquipInfo(x, y, actor);
		}
	};

	Window_ShopStatus.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_ShopStatus.prototype.isPageChangeEnabled = function() {
		return false;
	};


	//-----------------------------------------------------------------------------
	// Window_ShopBuy
	//
	// The window for selecting an item to buy on the shop screen.

	const _Window_ShopBuy_update = Window_ShopBuy.prototype.update;
	Window_ShopBuy.prototype.update = function() {
		const lastIndex = this.index();

		_Window_ShopBuy_update.apply(this, arguments);

		if (this.index() !== lastIndex) {
			callUpdateMessageWithPicture = true;
		}
	};

	const _Window_ShopBuy_cursorRight = Window_ShopBuy.prototype.cursorRight;
	Window_ShopBuy.prototype.cursorRight = function() {
		_Window_ShopBuy_cursorRight.apply(this, arguments);

		const item = this.item();
		const isEquipItem = DataManager.isWeapon(item) || DataManager.isArmor(item);
		if (isEquipItem) {
			this.processPagedown();
		}
	};

	const _Window_ShopBuy_cursorLeft = Window_ShopBuy.prototype.cursorLeft;
	Window_ShopBuy.prototype.cursorLeft = function() {
		_Window_ShopBuy_cursorLeft.apply(this, arguments);

		const item = this.item();
		const isEquipItem = DataManager.isWeapon(item) || DataManager.isArmor(item);
		if (isEquipItem) {
			this.processPageup();
		}
	};


	//-----------------------------------------------------------------------------
	// Window_ShopSell
	//
	// The window for selecting an item to sell on the shop screen.

	Window_ShopSell.prototype.maxCols = function() {
		return 1;
	};

	const _Window_ShopSell_update = Window_ShopSell.prototype.update;
	Window_ShopSell.prototype.update = function() {
		const lastIndex = this.index();

		_Window_ShopSell_update.apply(this, arguments);

		if (this.index() !== lastIndex) {
			callUpdateMessageWithPicture = true;
		}
	};


	//-----------------------------------------------------------------------------
	// Window_ShopItemCategory
	//

	function Window_ShopItemCategory() {
		this.initialize(...arguments);
	}

	Window_ShopItemCategory.prototype = Object.create(Window_ItemCategory.prototype);
	Window_ShopItemCategory.prototype.constructor = Window_ShopItemCategory;

	const _Window_ShopItemCategory_maxCols = Window_ShopItemCategory.prototype.maxCols;
	Window_ShopItemCategory.prototype.maxCols = function() {
		if (itemCategoryWindowDefault) {
			return _Window_ShopItemCategory_maxCols.apply(this, arguments);
		}

		return 2;
	};

})();
