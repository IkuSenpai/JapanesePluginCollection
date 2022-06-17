// =============================================================================
// ABMZ_EquipUpgrade.js
// Version: 1.02
// -----------------------------------------------------------------------------
// Copyright (c) 2017 ヱビ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @target MZ
 * @plugindesc v1.02 装備している装備を強化するプラグインです。
 * @author ヱビ
 * @url http://www.zf.em-net.ne.jp/~ebi-games/
 * 
 * @param NextGradeName
 * @desc 次のグレードの表示名です。
 * @default Next：
 * 
 * @param CostName
 * @desc コストの表示名です。
 * @default コスト：
 *
 * @param UpgradeConfirmText
 * @desc 装備をアップグレードするときの確認テキストです。
 * %1 - 現在の装備  %2 - アップグレード後の装備
 * @default %1を%2にアップグレードしますか？
 * 
 * @param ConfirmYes
 * @desc 確認ウィンドウのOKの名前です。
 * @default はい
 * 
 * @param ConfirmNo
 * @desc 確認ウィンドウのキャンセルの名前です。
 * @default いいえ
 * 
 * 
 * @help
 * ============================================================================
 * どんなプラグイン？
 * ============================================================================
 * 
 * 装備に「次のグレードの装備のタグ」「必要なお金」「必要なアイテム」を付けると
 * 装備強化メニューで強化できるようになります。
 * 
 * ============================================================================
 * タグ
 * ============================================================================
 * 
 * 武器、防具のメモ欄のタグ：
 *   <NextGrade:x>
 *     IDxの武器（防具）にアップグレードできるようになります。
 * 
 *   <UpgradeCost>
 *   item id
 *   item id: x
 *   weapon id
 *   weapon id: x
 *   armor id
 *   armor id: x
 *   gold: x
 *   </UpgradeCost>
 *     idにアイテムのIDを、xに個数を設定します。
 *   【注意】「:」のあとに半角スペースを入れないと正しく認識されません。
 *   
 *   例：
 *   <UpgradeCost>
 *   item 1
 *   item 2: 3
 *   gold: 300
 *   </UpgradeCost>
 *     ID１のアイテムを1つ、ID2のアイテムを3つ、お金を300G必要とします。
 * 
 * ============================================================================
 * プラグインコマンド
 * ============================================================================
 * 
 * OpenEquipUpgrade
 *   装備アップグレード画面を開きます。
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.02
 *   装備アップグレードを実行するとエラーが出て停止してしまう不具合を修正しまし
 *   た。
 * 
 * Version 1.01
 *   MZに対応しました。
 * 
 * Version 1.00
 *   初回に顔グラが表示されない不具合を修正。
 * 
 * Version 0.04
 *   初回に顔グラが表示されない不具合を修正。
 * 
 * Version 0.03
 *   ゴールドの指定で反映されない不具合を修正。
 * 
 * Version 0.02
 *   素材に防具と武器を使えるように変更。コストでお金がかからないとき、お金を
 *   表示しないように変更。
 * 
 * Version 0.01
 *   作成。
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * ・MITライセンスです。
 * ・クレジット表記は不要
 * ・営利目的で使用可
 * ・改変可
 *     ただし、ソースコードのヘッダのライセンス表示は残してください。
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * 
 * @command OpenEquipUpgrade
 * @text 装備アップグレード画面
 * @desc 装備アップグレード画面を開きます。
 */

(function() {
	const pluginName = "ABMZ_EquipUpgrade";
	var parameters = PluginManager.parameters('ABMZ_EquipUpgrade');
	var NextGradeName = String(parameters['NextGradeName']);
	var CostName = String(parameters['CostName']);
	var UpgradeConfirmText = String(parameters['UpgradeConfirmText']);
	var ConfirmYes = String(parameters['ConfirmYes']);
	var ConfirmNo = String(parameters['ConfirmNo']);

    PluginManager.registerCommand(pluginName, "OpenEquipUpgrade", args => {
			SceneManager.push(Scene_EquipUpgradeSelectActor);
    });

	Window_Selectable.prototype.itemRectForText = function(index) {
	    var rect = this.itemRect(index);
	    rect.x += this.textPadding();
	    rect.width -= this.textPadding() * 2;
	    return rect;
	};
	Window_Base.prototype.standardPadding = function() {
	    return 18;
	};
	Window_Base.prototype.textPadding = function() {
		return 6;
	}
//=============================================================================
// DataManager
//=============================================================================
	var loaded_AB_EquipUpgrade = false;
	var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function() {
		if (!_DataManager_isDatabaseLoaded.call(this)) return false;
		if (!loaded_AB_EquipUpgrade) {
			this.processABEUNoteTags($dataWeapons);
			this.processABEUNoteTags($dataArmors);
			loaded_AB_EquipUpgrade = true;
		}
		return true;
	};

	DataManager.processABEUNoteTags = function(group) {
		var note1 = /<(?:UpgradeCost)>/i;
		var note2 = /<\/(?:UpgradeCost)>/i;
		for (var n = 1, nl = group.length; n < nl; n++) {
			var obj = group[n];
			var notedata = obj.note.split(/[\r\n]+/);

			obj.upgradeCost = 0;
			obj.upgradeIngredients = [];
			var gatherIngredients = false;
			for (var i = 0, l = notedata.length; i < l; i++) {
				var line = notedata[i];
				if (line.match(note1)) {
					gatherIngredients = true;
				} else if (line.match(note2)) {
					gatherIngredients = false;
				} else if (gatherIngredients) {
					this.addEquipUpgradeCost(obj, line);
				}
			}
		}
	};

	DataManager.addEquipUpgradeCost = function(obj, line) {
		var ingType;
    var ingId;
    var ingValue = 1;
    if (line.match(/GOLD:[ ](\d+)/i)) {
      obj.upgradeCost = parseInt(RegExp.$1);
      return;
    } else if (line.match(/ITEM[ ](\d+):[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 0;
      ingValue = parseInt(RegExp.$2);
    } else if (line.match(/ITEM[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 0;
      ingValue = 1;
    } else if (line.match(/WEAPON[ ](\d+):[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 1;
      ingValue = parseInt(RegExp.$2);
    } else if (line.match(/WEAPON[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 1;
      ingValue = 1;
    } else if (line.match(/ARMOR[ ](\d+):[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 2;
      ingValue = parseInt(RegExp.$2);
    } else if (line.match(/ARMOR[ ](\d+)/i)) {
      ingId = parseInt(RegExp.$1);
      ingType = 2;
      ingValue = 1;
    }
		var length = obj.upgradeIngredients.length;
    obj.upgradeIngredients[length] = [ingType, ingId, ingValue];
	};

	DataManager.isEquipUpgradeIngredientOk = function(ingId) {
		var item;
		item = $dataItems[ingId];
		if (!item) return false;
		return true;
	};

	DataManager.getEquipUpgradeIngredient = function(item, index) {
		var itemId = item.upgradeIngredients[index][1];
		if (item.upgradeIngredients[index][0] === 0) {
			return $dataItems[itemId];
		} else if (item.upgradeIngredients[index][0] === 1) {
			return $dataWeapons[itemId];
		}
		return $dataArmors[itemId];
	};

	DataManager.getEquipUpgradeQuantity = function(item, index) {
		return item.upgradeIngredients[index][2];
	};

	DataManager.getNextGradeEquip = function(item) {
		if (!item) return null;
		if (!item.meta.NextGrade) return null;
		var id = parseInt(item.meta.NextGrade);
		if (DataManager.isWeapon(item)) {
			var item = $dataWeapons[id];
		} else if (DataManager.isArmor(item)) {
			var item = $dataArmors[id];
		}
		if (!item) return null;
		return item;
	};

	DataManager.canUpgradeEquip = function(item) {
		if (!item) return false;
		if (!item.meta.NextGrade) return false;
		if ($gameParty.gold() < item.upgradeCost) return false;
		for (var i = 0, l = item.upgradeIngredients.length; i<l; i++) {
			var ing = DataManager.getEquipUpgradeIngredient(item, i);
			var quantity = DataManager.getEquipUpgradeQuantity(item, i);
			var numItems = $gameParty.numItems(ing);
			if (numItems < quantity) return false;
		}
		return true;
	};

//=============================================================================
// Game_Interpreter
//=============================================================================

	var _Game_Interpreter_prototype_pluginCommand =
		Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_prototype_pluginCommand.call(this, command, args);
		switch(command) {
		case "OpenEquipUpgrade":
			SceneManager.push(Scene_EquipUpgradeSelectActor);
			break;
		}
	};

//=============================================================================
// Window_EquipUpgradeSlot
//=============================================================================

	
	function Window_EquipUpgradeSlot() {
		this.initialize.apply(this, arguments);
	}
	
	Window_EquipUpgradeSlot.prototype = Object.create(Window_Selectable.prototype);
	Window_EquipUpgradeSlot.prototype.constructor = Window_EquipUpgradeSlot;

	Window_EquipUpgradeSlot.prototype.initialize = function(x, y, width, height) {
		var rect = new Rectangle(x, y, width, height);
		Window_Selectable.prototype.initialize.call(this, rect);
		this._actor = null;
		this.refresh();
	};

	Window_EquipUpgradeSlot.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_EquipUpgradeSlot.prototype.update = function() {
		Window_Selectable.prototype.update.call(this);
		if (this._nextGradeWindow) {
			this._nextGradeWindow.setSlotId(this.index());
		}
	};

	Window_EquipUpgradeSlot.prototype.maxItems = function() {
		return this._actor ? this._actor.equipSlots().length : 0;
	};

	Window_EquipUpgradeSlot.prototype.item = function () {
		return this._actor ? this._actor.equips()[this.index()] : null;
	};

	Window_EquipUpgradeSlot.prototype.drawItem = function(index) {
		if (this._actor) {
			var rect = this.itemRectForText(index);
			this.changeTextColor(ColorManager.systemColor());
			this.changePaintOpacity(this.isEnabled(index));
			this.drawText(this.slotName(index), rect.x, rect.y, 138, this.lineHeight());
			this.drawItemName(this._actor.equips()[index], rect.x + 138, rect.y);
			this.changePaintOpacity(true);
		}
	};

	
	Window_EquipUpgradeSlot.prototype.refresh = function() {
		Window_Selectable.prototype.refresh.call(this);
		this.callUpdateHelp();
	};

	Window_EquipUpgradeSlot.prototype.slotName = function(index) {
		var slots = this._actor.equipSlots();
		return this._actor ? $dataSystem.equipTypes[slots[index]] : '';
	};

	Window_EquipUpgradeSlot.prototype.isEnabled = function(index) {
		return this._actor ? 
						this._actor.isEquipChangeOk(index) 
						&&DataManager.canUpgradeEquip(this._actor.equips()[index]) 
						: false;
	};

	Window_EquipUpgradeSlot.prototype.isCurrentItemEnabled = function() {
		return this.isEnabled(this.index());
	};

	Window_EquipUpgradeSlot.prototype.setStatusWindow = function(statusWindow) {
		this._statusWindow = statusWindow;
		this.callUpdateHelp();
	};

	Window_EquipUpgradeSlot.prototype.setNextGradeWindow = function(nextGradeWindow) {
		this._nextGradeWindow = nextGradeWindow;
		this.update();
	};

	Window_EquipUpgradeSlot.prototype.updateHelp = function() {
		Window_Selectable.prototype.updateHelp.call(this);
		var item = this.item();
		var nextGradeItem = DataManager.getNextGradeEquip(item);
		this.setHelpWindowItem(nextGradeItem);
		if (this._statusWindow) {
			var actor = JsonEx.makeDeepCopy(this._actor);
			if (!actor) return;
			if (nextGradeItem) actor.forceChangeEquip(this.index(), nextGradeItem);
			this._statusWindow.setTempActor(actor);
		}
		if (this._nextGradeWindow) {
			this._nextGradeWindow.setSlotId(this.index());
		}
	};

//=============================================================================
// Window_EquipNextGrade
//=============================================================================


	function Window_EquipNextGrade() {
		this.initialize.apply(this, arguments);
	}
	
	Window_EquipNextGrade.prototype = Object.create(Window_Base.prototype);
	Window_EquipNextGrade.prototype.constructor = Window_EquipNextGrade;

	Window_EquipNextGrade.prototype.initialize = function(x, y, width, height) {
		var rect = new Rectangle(x, y, width, height);
		Window_Base.prototype.initialize.call(this, rect);
		this._actor = null;
		this._slotId = 0;
	};

	Window_EquipNextGrade.prototype.setActor = function(actor) {
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_EquipNextGrade.prototype.setSlotId = function(slotId) {
		if (this._slotId !== slotId) {
			this._slotId = slotId;
			this.refresh();
		}
	};

	Window_EquipNextGrade.prototype.refresh = function() {
		this.contents.clear();
		if (this._actor) {

			var item = this._actor.equips()[this._slotId];
			if (!item) return;
			var nextGradeItem = DataManager.getNextGradeEquip(item);
			var y = 0;
			var x = [0, 0];
			var n = 0;
			var w = this.contentsWidth() / 2 - this.standardPadding();
			x[1] = w + this.standardPadding();

			var nextTextW = 200;
			this.changeTextColor(ColorManager.systemColor());
			this.drawText(NextGradeName, x[0], y, nextTextW);
			this.resetTextColor();
			this.drawItemName(nextGradeItem, x[0] + nextTextW, y);
			y += this.lineHeight();

			this.changeTextColor(ColorManager.systemColor());
			this.drawText(CostName, x[0], y);
			y += this.lineHeight();

			if (item.upgradeCost) {
				n=1;
				if ($gameParty.gold() >= item.upgradeCost) {
					this.resetTextColor();
					this.drawText(item.upgradeCost +  TextManager.currencyUnit + 
					"（" + $gameParty.gold() +TextManager.currencyUnit+"）", x[0], y, w);
				} else {
					this.changeTextColor(ColorManager.textColor(6));
					this.drawText(item.upgradeCost +  TextManager.currencyUnit + 
					"（" + $gameParty.gold() +TextManager.currencyUnit+"）", x[0], y, w);
				}
			}
			

			var length = item.upgradeIngredients.length;
			for (var i=0; i<length; i++) {
				var ing = DataManager.getEquipUpgradeIngredient(item, i);
				var quantity = DataManager.getEquipUpgradeQuantity(item, i);
				var numItems = $gameParty.numItems(ing);
				var qw = 120;
				if (quantity <= numItems) {
					this.resetTextColor();
					this.drawItemName(ing, x[n], y, w - qw);
					this.drawText(quantity+"（"+numItems+ ")", x[n] +x[1]- qw, y , qw);
				} else {
					this.drawItemName(ing, x[n], y, w - qw);
					this.changeTextColor(ColorManager.textColor(6));
					this.drawText(quantity+"（"+numItems+ ")", x[n] +x[1]- qw, y , qw);
				}
				if (n == 0) {
					n = 1;
				} else {
					n = 0;
					y += this.lineHeight();
				}
			}
		}
	};

//=============================================================================
// Window_EquipGradeupConfirm
//=============================================================================


	var Window_EquipGradeupConfirm = function() {
		this.initialize.apply(this, arguments);
	};

	Window_EquipGradeupConfirm.prototype = Object.create(Window_Command.prototype);
	Window_EquipGradeupConfirm.prototype.constructor = Window_EquipGradeupConfirm;

	Window_EquipGradeupConfirm.prototype.initialize = function() {
		var rect = new Rectangle(0,0,Graphics.boxWidth, Window_Selectable.prototype.fittingHeight(3));
		Window_Command.prototype.initialize.call(this, rect);
		this.openness = 0;
	};

	Window_EquipGradeupConfirm.prototype.makeCommandList = function() {
		this.addCommand(ConfirmYes, 'confirm');
		this.addCommand(ConfirmNo, 'cancel');
	};

	Window_EquipGradeupConfirm.prototype.setData = function(actor, slotId) {
		var item = actor.equips()[slotId];
		var nextGradeItem = DataManager.getNextGradeEquip(item);
		this._text = UpgradeConfirmText.format(item.name, nextGradeItem.name);
		var ww = this.textWidthEx(this._text) + this.standardPadding() * 4;
		this.width = ww;
		this.refresh();
		this.x = (Graphics.boxWidth - this.width) / 2;
		this.y = (Graphics.boxHeight - this.height) / 2;
		this.drawTextEx(this._text, this.textPadding(), 0);
	};

	Window_EquipGradeupConfirm.prototype.textWidthEx = function(text) {
		return this.drawTextEx(text, 0, this.contents.height);
	};

	Window_EquipGradeupConfirm.prototype.itemTextAlign = function() {
		return 'center';
	};

	Window_EquipGradeupConfirm.prototype.windowHeight = function() {
		return this.fittingHeight(3);
	};

	Window_EquipGradeupConfirm.prototype.itemRect = function(index) {
		var rect = Window_Selectable.prototype.itemRect.call(this, index);
		rect.y += this.lineHeight();
		return rect;
	};

// シーンを呼び出すときはこちらを
//=============================================================================
// Scene_EquipUpgradeSelectActor
//=============================================================================

	function Scene_EquipUpgradeSelectActor() {
		this.initialize.apply(this, arguments);
	}
	
	Scene_EquipUpgradeSelectActor.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_EquipUpgradeSelectActor.prototype.constructor = Scene_EquipUpgradeSelectActor;
	
	Scene_EquipUpgradeSelectActor.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);
		var actors = $gameParty.members();
		actors.forEach(function(actor){
			ImageManager.loadFace(actor.faceName());
		});
	};

	Scene_EquipUpgradeSelectActor.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createStatusWindow();
	};


	Scene_EquipUpgradeSelectActor.prototype.createStatusWindow = function() {
		var rect = Scene_Menu.prototype.statusWindowRect.call(this);
		this._statusWindow = new Window_MenuStatus(rect);
		//this._statusWindow.reserveFaceImages();
		this.addWindow(this._statusWindow);
		this._statusWindow.setHandler('ok', this.onPersonalOk.bind(this));
		this._statusWindow.setHandler('cancel', this.popScene.bind(this));
	};
	Scene_EquipUpgradeSelectActor.prototype.start = function() {
		Scene_MenuBase.prototype.start.call(this);
		this._statusWindow.refresh();
		this._statusWindow.activate();
		this._statusWindow.select(0);
	};

	Scene_EquipUpgradeSelectActor.prototype.onPersonalOk = function() {
		SceneManager.push(Scene_EquipUpgrade);
	};



//=============================================================================
// Window_EquipStatusForUpgrade
//=============================================================================

	function Window_EquipStatusForUpgrade() {
		this.initialize.apply(this, arguments);
	}
	
	Window_EquipStatusForUpgrade.prototype = Object.create(Window_EquipStatus.prototype);
	Window_EquipStatusForUpgrade.prototype.constructor = Scene_EquipUpgrade;
	
	Window_EquipStatusForUpgrade.prototype.initialize = function(rect) {
		Window_EquipStatus.prototype.initialize.call(this, rect);

		
	};

Window_EquipStatusForUpgrade.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        const nameRect = this.itemLineRect(0);
        this.drawActorName(this._actor, nameRect.x, 0, nameRect.width);
//        this.drawActorFace(this._actor, nameRect.x, nameRect.height);
        this.drawAllParams();
    }
};
Window_EquipStatusForUpgrade.prototype.paramY = function(index) {
    //const faceHeight = ImageManager.faceHeight;
    return Math.floor(this.lineHeight() * (index + 1.5));
};
//=============================================================================
// Scene_EquipUpgrade
//=============================================================================


	function Scene_EquipUpgrade() {
		this.initialize.apply(this, arguments);
	}
	
	Scene_EquipUpgrade.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_EquipUpgrade.prototype.constructor = Scene_EquipUpgrade;
	
	Scene_EquipUpgrade.prototype.initialize = function() {
		Scene_MenuBase.prototype.initialize.call(this);

		
	};

	Scene_EquipUpgrade.prototype.create = function() {
		Scene_MenuBase.prototype.create.call(this);
		this.createHelpWindow();
		this.createStatusWindow();
		this.createEquipUpgradeSlotWindow();
		this.createNextGradeWindow();
		this.createConfirmWindow();
		this._helpWindow.y = 0;
	};

	Scene_EquipUpgrade.prototype.createStatusWindow = function() {
		var rect = new Rectangle(0,this._helpWindow.height,312, 312);
//		var rect = Scene_Equip.prototype.statusWindowRect.call(this);
		this._statusWindow = new Window_EquipStatusForUpgrade(rect);
		this.addWindow(this._statusWindow);
	};

	Scene_EquipUpgrade.prototype.createEquipUpgradeSlotWindow = function() {
		var wx = this._statusWindow.width;
		var wy = this._helpWindow.height;
		var ww = Graphics.boxWidth - this._statusWindow.width;
		var wh = this._statusWindow.height;
		this._equipUpgradeSlotWindow = new Window_EquipUpgradeSlot(wx, wy, ww, wh);
		this._equipUpgradeSlotWindow.setHelpWindow(this._helpWindow);
		this._equipUpgradeSlotWindow.setHandler('ok',       this.onSlotOk.bind(this));
		this._equipUpgradeSlotWindow.setHandler('cancel',   this.popScene.bind(this));
		this._equipUpgradeSlotWindow.setHandler('pagedown', this.nextActor.bind(this));
		this._equipUpgradeSlotWindow.setHandler('pageup',   this.previousActor.bind(this));
		this._equipUpgradeSlotWindow.setStatusWindow(this._statusWindow);
		this.addWindow(this._equipUpgradeSlotWindow);
	};

	Scene_EquipUpgrade.prototype.createNextGradeWindow = function() {
		var wx = 0;
		var wy = this._statusWindow.y + this._statusWindow.height;
		var ww = Graphics.boxWidth;
		var wh = Graphics.boxHeight - wy;
		this._equipNextGradeWindow = new Window_EquipNextGrade(wx, wy, ww, wh);
		this._equipUpgradeSlotWindow.setNextGradeWindow(this._equipNextGradeWindow);
		this.addWindow(this._equipNextGradeWindow);
	};

	Scene_EquipUpgrade.prototype.createConfirmWindow = function() {
		this._confirmWindow = new Window_EquipGradeupConfirm();
		var win = this._confirmWindow;
		win.setHandler('confirm', this.onConfirmOk.bind(this));
		win.setHandler('cancel', this.onConfirmCancel.bind(this));
		this.addWindow(win);
	};

	Scene_EquipUpgrade.prototype.start = function() {
		Scene_MenuBase.prototype.start.call(this);
		this._equipUpgradeSlotWindow.open();
		this._equipUpgradeSlotWindow.activate();
		this._equipUpgradeSlotWindow.select(0);
		this.refreshActor();
	};

	Scene_EquipUpgrade.prototype.refreshActor = function() {
		var actor = this.actor();
		this._statusWindow.setActor(actor);
		this._equipUpgradeSlotWindow.setActor(actor);
		this._equipNextGradeWindow.setActor(actor);
	};

	Scene_EquipUpgrade.prototype.onActorChange = function() {
		this.refreshActor();
		this._equipUpgradeSlotWindow.activate();
	};

	
	Scene_EquipUpgrade.prototype.onSlotOk = function() {
		var slotId = this._equipUpgradeSlotWindow.index();
		this._confirmWindow.setData(this._actor, slotId);
		this._confirmWindow.open();
		this._confirmWindow.activate();
		this._confirmWindow.select(0);
	};

	Scene_EquipUpgrade.prototype.onConfirmOk = function() {
		SoundManager.playShop();
		this.upgradeEquip();
		this._confirmWindow.deactivate();
		this._confirmWindow.close();
		this._equipUpgradeSlotWindow.activate();
		this._equipUpgradeSlotWindow.refresh();
		this._equipNextGradeWindow.refresh();
	};

	Scene_EquipUpgrade.prototype.onConfirmCancel = function() {
		this._confirmWindow.deactivate();
		this._confirmWindow.close();
		this._equipUpgradeSlotWindow.activate();
	};

	Scene_EquipUpgrade.prototype.upgradeEquip = function() {
		var actor = this.actor();
		var slotId = this._equipUpgradeSlotWindow.index();
		var item = actor.equips()[slotId];
		if (DataManager.canUpgradeEquip(item)) {
			var nextGradeItem = DataManager.getNextGradeEquip(item);
			$gameParty.gainItem(nextGradeItem, 1, false);
			actor.changeEquip(slotId, nextGradeItem);
			$gameParty.loseItem(item, 1, false);
			
			$gameParty.loseGold(item.upgradeCost);
			for (var i = 0, l = item.upgradeIngredients.length; i<l; i++) {
				var ing = DataManager.getEquipUpgradeIngredient(item, i);
				var quantity = DataManager.getEquipUpgradeQuantity(item, i);
				$gameParty.loseItem(ing, quantity, false);
			}
		}
	};



})();