// =============================================================================
// AB_HelpScene.js
// Version: 1.02
// -----------------------------------------------------------------------------
// Copyright (c) 2020 ヱビ
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// [Homepage]: ヱビのノート
//             http://www.zf.em-net.ne.jp/~ebi-games/
// =============================================================================


/*:
 * @target MZ
 * @plugindesc v1.02 画像でヘルプを表示する機能を追加します。
 * @author ヱビ
 * @url http://www.zf.em-net.ne.jp/~ebi-games/
 * 
 * 
 * @param ヘルプタイトル
 * @type string
 * @desc ヘルプタイトルの名前です。
 * @default ヘルプ
 *
 * @param メニュー表示スイッチ
 * @type switch
 * @desc ここで設定したスイッチがONの時、メニューで表示します。
 * 0を指定すると常に表示します。
 * @default 0
 *
 * @param メニュー有効化スイッチ
 * @type switch
 * @desc ここで設定したスイッチがONの時、メニューで有効化します。
 * 0を指定すると常に有効です。無効のときは灰色になります。
 * @default 0
 * 
 * @param ヘルプリスト
 * @type struct<HelpList>[]
 * @desc ヘルプリストです。
 * @default []
 * 
 * @param 未閲覧ヘルプアイコン
 * @type number
 * @desc 見ていないヘルプにつくアイコンです。
 * @default 4
 * 
 * @param 未開放ヘルプ名前
 * @type string
 * @desc 追加されていないヘルプの名前です。
 * @default ？？？
 * 
 * @param 次へ名前
 * @type string
 * @desc ヘルプ画面で次の画像に移るコマンドの名前です。
 * @default ＞
 * 
 * @param 閉じる名前
 * @type string
 * @desc ヘルプ画面で最後の画像になり、閉じるためのコマンドの名前です。
 * @default ＯＫ
 * 
 * @help
 * ============================================================================
 * 概要
 * ============================================================================
 * 
 * チュートリアルで出てくるような、数枚の画像のヘルプを、
 * ①イベントで表示できるようにし、
 * ②メニューやイベントで、後で見返せるようにする
 * プラグインです。
 * 
 * ■ヘルプ画像
 * ヘルプ画像（幅640px*高さ360px）。
 * 一つのヘルプに１～４枚程度表示することを想定しています。
 * 
 * 
 * ============================================================================
 * 作り方
 * ============================================================================
 * 
 * ■ヘルプの作成
 * 
 * １．ヘルプ画像を用意。img/picturesフォルダに格納します。
 * 
 * （幅640px*高さ360px)
 * 
 * ２．プラグインパラメータでヘルプを設定。
 * 
 * １つのヘルプにつき、
 * ①ヘルプ名
 * ②１枚以上の画像を設定できます。
 * 
 * ■プラグインコマンド
 * 
 * AB_Help Open
 * ヘルプシーンを開きます。
 * 
 * AB_Help Show 1
 * ＩＤ１番のヘルプを表示します。
 * ※この後、勝手にヘルプリストに追加され、既読になります。
 * 
 * AB_Help Add 1
 * ＩＤ１番のヘルプをヘルプシーンのリストに追加します。
 * 
 * AB_Help Remove 1
 * ＩＤ１番のヘルプをヘルプシーンのリストから削除します。
 * 
 * AB_Help Complete
 * すべてのヘルプをヘルプシーンのリストに加えます。
 * 
 * AB_Help Clear
 * すべてのヘルプをヘルプシーンのリストから削除します。
 * 
 * ============================================================================
 * 更新履歴
 * ============================================================================
 * 
 * Version 1.02
 *   メニューの表示スイッチとメニュー有効化スイッチが変数を参照していたため、
 *   スイッチに修正しました。
 * 
 * Version 1.01 
 *   ツクールMZに対応
 * 
 * Version 1.00 公開
 *   
 * 
 * ============================================================================
 * 利用規約
 * ============================================================================
 * 
 * MITライセンスです。
 * ・クレジット表記は不要
 * ・営利目的で使用可
 * ・改変可
 *     ただし、ソースコードのヘッダのライセンス表示は残してください。
 * ・素材だけの再配布も可
 * ・アダルトゲーム、残酷なゲームでの使用も可
 * 
 * 
 * @command open
 * @text ヘルプ画面を開く
 * @desc ヘルプ画面を開きます。
 * 
 * @command show
 * @text 指定したヘルプ画面を開く
 * @desc 指定したヘルプ画面を開きます。
 * 
 * @arg helpId
 * @type number
 * @text ヘルプID
 * @desc ページを開くヘルプの番号です。
 * 
 * 
 * @command add
 * @text ヘルプを追加
 * @desc ヘルプを追加します。
 * 
 * @arg helpId
 * @type number
 * @text ヘルプID
 * @desc 追加するヘルプの番号です。
 * 
 * @command remove
 * @text ヘルプを削除
 * @desc ヘルプを削除します。
 * 
 * @arg helpId
 * @type number
 * @text ヘルプID
 * @desc 削除するヘルプの番号です。
 * 
 * @command complete
 * @text ヘルプをコンプリート
 * @desc すべてのヘルプを追加します。
 * 
 * 
 * @command clear
 * @text ヘルプをクリア
 * @desc すべてのヘルプを削除します。
 * 
 */

/*~struct~HelpList:
 * 
 * @param name
 * @type string
 * @desc ヘルプの名前です。
 * @default ヘルプ
 * 
 * @param ImageList
 * @type file[]
 * @dir img/pictures
 * @desc ヘルプの画像ファイルです。
 * @default []
 * 
 */


(function() {
	const pluginName = "ABMZ_HelpScene";
	var parameters = PluginManager.parameters('ABMZ_HelpScene');
	var AB_Helptitle = String(parameters['ヘルプタイトル']);
	var ABHelp_ShowSwitchID = Number(parameters['メニュー表示スイッチ']);
	var ABHelp_EnableSwitchID = Number(parameters['メニュー有効化スイッチ']);
	var AB_HelpList = JSON.parse(parameters['ヘルプリスト']);
	for (var i=0,l=AB_HelpList.length; i<l; i++) {
		AB_HelpList[i] = JSON.parse(AB_HelpList[i]);
		AB_HelpList[i].ImageList = JSON.parse(AB_HelpList[i].ImageList);/*
		for (var j=0,jl = AB_HelpList[i].ImageList.length; j<jl; j++) {
			AB_HelpList[i].ImageList[j] = String(AB_HelpList[i].ImageList[j]);
		}*/
	}
	var AB_HelpNotRead = Number(parameters['未閲覧ヘルプアイコン']);
	var AB_HelpUnOpenName = String(parameters['未開放ヘルプ名前']);
	var AB_HelpNextName = String(parameters['次へ名前']);
	var AB_HelpCloseName = String(parameters['閉じる名前']);



//=============================================================================
// Game_System
//=============================================================================

	

	Game_System.prototype.initABHelp = function() {
		this._ABHelpList = [];
		this._ABHelpSceneIndex = -1;
	};

	Game_System.prototype.isABHelpOpenWithIndex = function() {
		if (this._ABHelpSceneIndex !=null) {
			if (this._ABHelpSceneIndex >= 0) {
				return true;
			}
		} 
		if (this._ABHelpSceneIndex === 0) {
			return true;
		}
		return false;
	};
	Game_System.prototype.getABHelpOpenWithIndex = function() {
		return this._ABHelpSceneIndex;
	};
	Game_System.prototype.setABHelpOpenWithIndex = function(id) {
		if (!this._ABHelpList) this.initABHelp();
		this._ABHelpSceneIndex = id;
	};
	
	Game_System.prototype.addABHelp = function(id) {
		if (!this._ABHelpList) this.initABHelp();
		if (this._ABHelpList[id]) return;
		this._ABHelpList[id] = 1;
	};

	Game_System.prototype.removeABHelp = function(id) {
		if (!this._ABHelpList) this.initABHelp();
		//if (this._ABHelpList[id]) return;
		this._ABHelpList[id] = 0;
	};

	Game_System.prototype.setABHelpRead = function(id) {
		if (!this._ABHelpList) this.initABHelp();
		this._ABHelpList[id] = 2;
	};
	Game_System.prototype.getABHelpRead = function(id) {
		if (!this._ABHelpList) this.initABHelp();
		return this._ABHelpList[id] == 2;
	};


	Game_System.prototype.completeABHelp = function() {
		if (!this._ABHelpList) this.initABHelp();
		for (var i = 0; i < AB_HelpList.length; i++) {
			if (this._ABHelpList[i]) continue;
			this._ABHelpList[i] = 1;
		}
	};

	Game_System.prototype.canRead = function(index) {
		if (!this._ABHelpList) return false;
		return this._ABHelpList[index];
	};



//=============================================================================
// PluginManager
//=============================================================================

    PluginManager.registerCommand(pluginName, "open", args => {
				SceneManager.push(Scene_ABHelp);
    });
    PluginManager.registerCommand(pluginName, "show", args => {
				var id = Number(args.helpId - 1);
				$gameSystem.addABHelp(id);
				$gameSystem.setABHelpOpenWithIndex(id);
				SceneManager.push(Scene_ABHelp);
    });
    PluginManager.registerCommand(pluginName, "add", args => {
				var id = Number(args.helpId - 1);
				$gameSystem.addABHelp(id);
    });
    PluginManager.registerCommand(pluginName, "remove", args => {
				var id = Number(args.helpId - 1);
				$gameSystem.removeABHelp(id);
    });
    PluginManager.registerCommand(pluginName, "complete", args => {
				$gameSystem.completeABHelp();
    });
    PluginManager.registerCommand(pluginName, "clear", args => {
				$gameSystem.initABHelp();
    });
//=============================================================================
// Game_Interpreter
//=============================================================================

	



	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		Game_Interpreter_pluginCommand.call(this, command, args);
		if (command === 'AB_Help') {
			var command2 = args[0].toLowerCase();
			switch(command2) {
			case "open":
				SceneManager.push(Scene_ABHelp);
				break;
			case "add":
				var id = Number(args[1] -1);
				$gameSystem.addABHelp(id);
				break;
			case "remove":
				var id = Number(args[1] -1);
				$gameSystem.removeABHelp(id);
				break;
			case "complete":
				$gameSystem.completeABHelp();
				break;
			case "clear":
				$gameSystem.initABHelp();
				break;
			case "show":
				var id = Number(args[1] - 1);
				$gameSystem.setABHelpOpenWithIndex(id);
				SceneManager.push(Scene_ABHelp);
				
				break;
			}
		}
	};



//=============================================================================
// Window_ABHelpName
//=============================================================================


	function Window_ABHelpName() {
	    this.initialize.apply(this, arguments);
	}
	
	Window_ABHelpName.prototype = Object.create(Window_Base.prototype);
	Window_ABHelpName.prototype.constructor = Window_ABHelpName;
	
	Window_ABHelpName.prototype.initialize = function() {
			var x = 0;
			var y = 0;
			var width = Graphics.boxWidth;
			var height = Window_Selectable.prototype.fittingHeight(1);
			var rect = new Rectangle(this, x, y, width, height);
	    Window_Base.prototype.initialize.call(this, rect);
			this.refresh();
	};
	


	Window_ABHelpName.prototype.refresh = function() {
	    this.contents.clear();
			this.drawText(AB_Helptitle, 0, 0, this.contents.width, "center");
	};


//=============================================================================
// Window_ABHelpTitle
//=============================================================================


	function Window_ABHelpTitle() {
	    this.initialize.apply(this, arguments);
	}
	
	Window_ABHelpTitle.prototype = Object.create(Window_Base.prototype);
	Window_ABHelpTitle.prototype.constructor = Window_ABHelpTitle;
	
	Window_ABHelpTitle.prototype.initialize = function() {
			var x = (Graphics.boxWidth - 676) / 2;
			var y = Window_Selectable.prototype.fittingHeight(1);
			var width = 676;//
			var height = Window_Selectable.prototype.fittingHeight(1);
			var rect = new Rectangle(x, y, width, height);
	    Window_Base.prototype.initialize.call(this, rect);
			this._item = null;
	};
	
	Window_ABHelpTitle.prototype.setItem = function(item) {
		if (this._item != item) {
			this._item = item;
			this.refresh();
		}
	}

	Window_ABHelpTitle.prototype.refresh = function() {
	    this.contents.clear();
			
			var name = this._item.name;//
			//var iw = ImageManager.iconWidth;
			/*if () {
				
			}
			this.drawIcon();*/
			this.drawText(name, 0, 0, this.contents.width, "center");
	};


//=============================================================================
// Window_ABHelpNumber
//=============================================================================


	function Window_ABHelpNumber() {
	    this.initialize.apply(this, arguments);
	}
	
	Window_ABHelpNumber.prototype = Object.create(Window_Base.prototype);
	Window_ABHelpNumber.prototype.constructor = Window_ABHelpNumber;
	
	Window_ABHelpNumber.prototype.initialize = function() {
			var x = (Graphics.boxWidth - 676) / 2;
			var y = Window_Selectable.prototype.fittingHeight(1)*2 + 396;
			var width = 478;//
			var height = Window_Selectable.prototype.fittingHeight(1);

			var rect = new Rectangle(x, y, width, height);
	    Window_Base.prototype.initialize.call(this, rect);
			this._item = null;
			this._index = null;
	};
	
	Window_ABHelpNumber.prototype.setItem = function(item) {
		if (this._item != item) {
			this._item = item;
			this._helpIndex = 0;
			this._imageIndex = 0;
			this.refresh();
		}
	};
	
/*
	Window_ABHelpNumber.prototype.setHelpIndex = function(index) {
		if (this._helpIndex != index) {
			this._helpIndex = index;
			refresh();
		}
	};*/
	Window_ABHelpNumber.prototype.setImageIndex = function(index) {
		if (this._imageIndex != index) {
			this._imageIndex = index;
			this.refresh();
		}
	};

	Window_ABHelpNumber.prototype.refresh = function() {
	    this.contents.clear();
			
			var max = this._item.ImageList.length;//
			//var iw = ImageManager.iconWidth;
			/*if () {
				
			}
			this.drawIcon();*/
			var text = "";
			for (var i=0; i<max; i++) {
				if (this._imageIndex == i) {
					text += "●　";
				} else {
					text += "〇　";
				}
			}
			var text2 = (this._imageIndex+1)+" / "+ max;
			this.drawText(text, 0,0,this.contents.width - 18 - this.textWidth(text2), "center");
			this.drawText(text2, 0, 0, this.contents.width-18, 'right');
	};
//=============================================================================
// Window_ABHelpImage
//=============================================================================


	function Window_ABHelpImage() {
	    this.initialize.apply(this, arguments);
	}

	Window_ABHelpImage.prototype = Object.create(Window_Base.prototype);
	Window_ABHelpImage.prototype.constructor = Window_ABHelpImage;
	
	Window_ABHelpImage.prototype.initialize = function() {
		var x = (Graphics.boxWidth - 676) / 2;
		var y = Window_Selectable.prototype.fittingHeight(1)*2;
		var width = 676;//
		var height = 396;
			var rect = new Rectangle(x, y, width, height);
	    Window_Base.prototype.initialize.call(this, rect);
		this._item = null;
		this._imageIndex = 0;
		this._sprite = new Sprite();
		this._sprite.x=18;
		this._sprite.y=18;
		this.addChildToBack(this._sprite);
	};
	Window_ABHelpImage.prototype.setItem = function(item) {
	    if (this._item !== item) {
	        this._item = item;
					this._imageIndex = 0;
	        this.refresh();
	    }
	};
	Window_ABHelpImage.prototype.setImageIndex = function(index) {
		if (this._imageIndex != index) {
			this._imageIndex = index;
			this.refresh();
		}
	};
	/*
	Window_ABHelpImage.prototype.nextImage = function() {
		var lastIndex = this._index;
		this._index++;
		if (this._index >=this._item.ImageList.length) {
			this._index = this._item.ImageList.length-1;
		}
		if (lastIndex == this._index) return;
		this.refresh();
	};
	
	Window_ABHelpImage.prototype.prevImage = function() {
		var lastIndex = this._index;
		this._index--;
		if (this._index < 0) {
			this._index = 0;
		}
		if (lastIndex == this._index) return;
		this.refresh();
	};
	*/
	Window_ABHelpImage.prototype.refresh = function() {
		this.contents.clear();
		if (this._item) {
			this._sprite.bitmap = ImageManager.loadPicture(this._item.ImageList[this._imageIndex]);
		}
	};

	

//=============================================================================
// Window_ABHelpList
//=============================================================================

	function Window_ABHelpList() {
		this.initialize.apply(this, arguments);
	}
	
	Window_ABHelpList.prototype = Object.create(Window_Selectable.prototype);
	Window_ABHelpList.prototype.constructor = Window_ABHelpList;
	
	Window_ABHelpList.prototype.initialize = function() {
			var x = (Graphics.boxWidth-676) / 2;
			//var y = Window_Selectable.prototype.fittingHeight(2) + 396;
			var y = Window_Selectable.prototype.fittingHeight(1)*2;
			var h = Graphics.boxHeight - Window_Selectable.prototype.fittingHeight(1)*2;
			var w = 676;
			var rect = new Rectangle(x, y, w, h);
	    Window_Selectable.prototype.initialize.call(this, rect);
			this._data = [];
	};
/*
	Window_ABHelpList.prototype.setTitleWindow = function(w) {
	    this._ABHelpTitleWindow = w;
	};
	Window_ABHelpList.prototype.setImageWindow = function(w) {
	    this._ABHelpImageWindow = w;
	};
	Window_ABHelpList.prototype.setNumberWindow = function(w) {
	    this._ABHelpNumberWindow = w;
	};
	Window_ABHelpList.prototype.setNextWindow = function(w) {
	    this._ABHelpNextWindow = w;
	};
*/

	Window_ABHelpList.prototype.isCurrentItemEnabled = function() {
	    return this.isEnabled(this.index());
	};
	Window_ABHelpList.prototype.maxCols = function() {
	    return 1;
	};
	Window_ABHelpList.prototype.maxItems = function() {
	    return this._data ? this._data.length : 1;
	};
	Window_ABHelpList.prototype.item = function() {
	    var index = this.index();
	    return this._data && index >= 0 ? this._data[index] : null;
	};

	Window_ABHelpList.prototype.isEnabled = function(index) {
	    return $gameSystem.canRead(index);
	};

	Window_ABHelpList.prototype.selectLast = function() {
	    var index = this._data.length-1;
	    this.select(index >= 0 ? index : 0);
	};

	Window_ABHelpList.prototype.drawItem = function(index) {
	    var item = this._data[index];
	    if (item) {
	        var rect = this.itemRect(index);
	        rect.width -= this.textPadding();
					var iw = ImageManager.iconWidth;
	        this.changePaintOpacity(this.isEnabled(index));
	        if (this.isEnabled(index)) {
						if (!$gameSystem.getABHelpRead(index)) {
							this.drawIcon(AB_HelpNotRead, rect.x,rect.y + 0);
						}
						this.drawText(item.name, rect.x + iw, rect.y, rect.width-iw);
						
					} else {
						this.drawText(AB_HelpUnOpenName, rect.x + iw, rect.y, rect.width-iw, 'left'); //
					}
	        this.changePaintOpacity(1);
	    }
	};

	Window_ABHelpList.prototype.makeItemList = function() {
	    this._data = AB_HelpList;
	};
	Window_ABHelpList.prototype.refresh = function() {
	    this.makeItemList();
	    this.createContents();
	    this.drawAllItems();
	};
/*
	
	Window_ABHelpList.prototype.select = function(index) {
			Window_Selectable.prototype.select.call(this, index);
			if (this.isEnabled(index))
	    this._ABHelpTitleWindow.setItem(this._date[index]);
	};*/
		
//=============================================================================
// Window_ABHelpNext
//=============================================================================
	
	function Window_ABHelpNext() {
		this.initialize.apply(this, arguments);
	}
	Window_ABHelpNext.prototype = Object.create(Window_HorzCommand.prototype);
	Window_ABHelpNext.prototype.constructor = Window_ABHelpNext;
	
	Window_ABHelpNext.prototype.initialize = function() {
			var x = Graphics.boxWidth / 2 + 140/*149*/;
			var y = Window_Selectable.prototype.fittingHeight(1)*2 + 396;
			var w = 196;
			var h = Window_Selectable.prototype.fittingHeight(1);
			var rect = new Rectangle(x, y, w, h);
	    Window_HorzCommand.prototype.initialize.call(this, rect);
			this._windowWidth = w;
			this._haveNext = false;
			this._havePrev = false;
	};
/*
	Window_ABHelpNext.prototype.setImageWindow = function(actor) {
		if (this._actor != actor) {
			this._actor = actor;
			this._systemId = 0;
			this._nextSkillId = 0;
			this.refresh();
		}
	};
	*/

	Window_ABHelpNext.prototype.windowWidth = function() {
    return 196;
	};
	
	Window_ABHelpNext.prototype.makeCommandList = function() {
		if (this._haveNext) {
	    this.addCommand(AB_HelpNextName, 'next', true);
		} else {
			this.addCommand(AB_HelpCloseName, 'end', true);
		}
	};
	Window_ABHelpNext.prototype.cursorRight = function() {
			if (this.active) {
				if (this._haveNext) {
					SoundManager.playCursor();
					this.callHandler('next');
				} else {/*
					this.callHandler('end');*/
				}
			}
	};
	Window_ABHelpNext.prototype.cursorLeft = function() {
			if (this.active) {
				if (this._havePrev) {
					SoundManager.playCursor();
					this.callHandler('cancel');
				}
			}
	};

	Window_ABHelpNext.prototype.setHaveNext = function(next) {
		this._haveNext = next;
		this.refresh();
	};

	Window_ABHelpNext.prototype.setHavePrev = function(prev) {
		this._havePrev = prev;
	};

	Window_ABHelpNext.prototype.maxCols = function() {
	    return 1;
	};
	Window_ABHelpNext.prototype.numVisibleRows = function() {
	    return 1;
	};

/*
	Window_ABHelpNext.prototype.refresh = function() {
		this.contents.clear();
		this.makeCommandList();
	};
*/

//=============================================================================
// Scene_ABHelp
//=============================================================================

	function Scene_ABHelp() {
	    this.initialize.apply(this, arguments);
	}
	
	Scene_ABHelp.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_ABHelp.prototype.constructor = Scene_ABHelp;
	
	Scene_ABHelp.prototype.initialize = function() {
	    Scene_MenuBase.prototype.initialize.call(this);
			this._ABHelpItem = null;
			this._ABHelpImageIndex = 0;
	};
	
	Scene_ABHelp.prototype.create = function() {
	    Scene_MenuBase.prototype.create.call(this);

	    this.createABHelpNameWindow();
	    this.createABHelpListWindow();
	    this.createABHelpTitleWindow();
	    this.createABHelpImageWindow();
	    this.createABHelpNextWindow();
	    this.createABHelpNumberWindow();
			if ($gameSystem.isABHelpOpenWithIndex()) {
				this.openIndex($gameSystem.getABHelpOpenWithIndex());
			} else {
				this._ABHelpNextWindow.deactivate();
				this._ABHelpNextWindow.deselect();
				this._ABHelpListWindow.activate();
				this._ABHelpListWindow.select(0);
				this._ABHelpListWindow.refresh();
			}
	};

	Scene_ABHelp.prototype.createABHelpListWindow = function() {
    this._ABHelpListWindow = new Window_ABHelpList();
		this._ABHelpListWindow.setHandler('ok', this.onItemOk.bind(this));
		this._ABHelpListWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._ABHelpListWindow);
		//this._ABHelpListWindow.openness = 0;
	};
	Scene_ABHelp.prototype.createABHelpNameWindow = function() {
    this._ABHelpNameWindow = new Window_ABHelpName();
    this.addWindow(this._ABHelpNameWindow);
		this._ABHelpNameWindow.open();
		//this._ABHelpNameWindow.openness = 0;
	};
	Scene_ABHelp.prototype.createABHelpTitleWindow = function() {
    this._ABHelpTitleWindow = new Window_ABHelpTitle();
    this.addWindow(this._ABHelpTitleWindow);
		this._ABHelpTitleWindow.openness = 0;
	};
	Scene_ABHelp.prototype.createABHelpImageWindow = function() {
    this._ABHelpImageWindow = new Window_ABHelpImage();
    this.addWindow(this._ABHelpImageWindow);
		this._ABHelpImageWindow.openness = 0;
	};
	Scene_ABHelp.prototype.createABHelpNumberWindow = function() {
    this._ABHelpNumberWindow = new Window_ABHelpNumber();
    this.addWindow(this._ABHelpNumberWindow);
		this._ABHelpNumberWindow.openness = 0;
	};
	Scene_ABHelp.prototype.createABHelpNextWindow = function() {
    this._ABHelpNextWindow = new Window_ABHelpNext();
		this._ABHelpNextWindow.openness = 0;
    //this._ABHelpNextWindow.setHelpWindow(this._helpWindow);
    this._ABHelpNextWindow.setHandler('next',    this.commandNext.bind(this));
    this._ABHelpNextWindow.setHandler('end',   this.commandEnd.bind(this));
	  this._ABHelpNextWindow.setHandler('cancel',   this.commandCancel.bind(this));
    this.addWindow(this._ABHelpNextWindow);
	};

	Scene_ABHelp.prototype.onItemOk = function() {
		var index = this._ABHelpListWindow.index();
		this._ABHelpIndex = index;
		this._ABHelpItem = this._ABHelpListWindow._data[index];
		this._ABHelpImageIndex = 0;

		
		$gameSystem.setABHelpRead(index);
		
		this._ABHelpListWindow.deactivate();
		this._ABHelpListWindow.close();
		this._ABHelpTitleWindow.setItem(this._ABHelpItem);
		this._ABHelpTitleWindow.open();
		this._ABHelpNumberWindow.setItem(this._ABHelpItem);
		this._ABHelpNumberWindow.open();
		this._ABHelpImageWindow.setItem(this._ABHelpItem);
		this._ABHelpImageWindow.open();
    this._ABHelpImageWindow.setImageIndex(this._ABHelpImageIndex);
    this._ABHelpNumberWindow.setImageIndex(this._ABHelpImageIndex);
		this._ABHelpNextWindow.setHaveNext(this._ABHelpItem.ImageList.length > 1);
		this._ABHelpNextWindow.setHavePrev(false);
		this._ABHelpNextWindow.open();
		this._ABHelpNextWindow.activate();
		this._ABHelpNextWindow.select(0);
	};



	Scene_ABHelp.prototype.commandNext = function() {
			this._ABHelpImageIndex++;
			if (this._ABHelpImageIndex >= this._ABHelpItem.ImageList.length) {
				this._ABHelpImageIndex = this._ABHelpItem.ImageList.length-1;
			}
	    this._ABHelpNextWindow.setHaveNext(this._ABHelpItem.ImageList.length > this._ABHelpImageIndex+1);
			this._ABHelpNextWindow.setHavePrev(this._ABHelpImageIndex > 0);
	    this._ABHelpImageWindow.setImageIndex(this._ABHelpImageIndex);
	    this._ABHelpNumberWindow.setImageIndex(this._ABHelpImageIndex);
			this._ABHelpNextWindow.activate();
	};

	Scene_ABHelp.prototype.commandCancel = function() {
			this._ABHelpImageIndex--;
			if (this._ABHelpImageIndex < 0) {
				this.commandEnd();
				return;
			}
	    this._ABHelpNextWindow.setHaveNext(this._ABHelpItem.ImageList.length > this._ABHelpImageIndex);
			this._ABHelpNextWindow.setHavePrev(this._ABHelpImageIndex > 0);
	    this._ABHelpImageWindow.setImageIndex(this._ABHelpImageIndex);
	    this._ABHelpNumberWindow.setImageIndex(this._ABHelpImageIndex);
			this._ABHelpNextWindow.activate();
			
	};


	

	Scene_ABHelp.prototype.commandEnd = function() {
		if ($gameSystem.isABHelpOpenWithIndex()) {
			$gameSystem.setABHelpOpenWithIndex(-1);
			this.popScene();
			return;
		}
		this._ABHelpListWindow.refresh();
		this._ABHelpListWindow.activate();
		this._ABHelpListWindow.open();
		this._ABHelpTitleWindow.close();
		this._ABHelpNumberWindow.close();
		this._ABHelpImageWindow.close();
		this._ABHelpNextWindow.close();
		this._ABHelpNextWindow.deactivate();
	};


	Scene_ABHelp.prototype.openIndex = function(index) {
		if (!AB_HelpList[index]) {
			this._ABHelpListWindow.activate();
			this._ABHelpListWindow.select(0);
			return;
		}
		this._ABHelpIndex = index;
		this._ABHelpItem = AB_HelpList[index];
		this._ABHelpImageIndex = 0;

		
		$gameSystem.setABHelpRead(index);
		
		this._ABHelpListWindow.deactivate();
		this._ABHelpListWindow.close();
		this._ABHelpTitleWindow.setItem(this._ABHelpItem);
		this._ABHelpTitleWindow.open();
		this._ABHelpNumberWindow.setItem(this._ABHelpItem);
		this._ABHelpNumberWindow.open();
		this._ABHelpImageWindow.setItem(this._ABHelpItem);
		this._ABHelpImageWindow.open();
    this._ABHelpImageWindow.setImageIndex(this._ABHelpImageIndex);
    this._ABHelpNumberWindow.setImageIndex(this._ABHelpImageIndex);
		this._ABHelpNextWindow.setHaveNext(this._ABHelpItem.ImageList.length > 1);
		this._ABHelpNextWindow.setHavePrev(false);
		this._ABHelpNextWindow.open();
		this._ABHelpNextWindow.activate();
		this._ABHelpNextWindow.select(0);
	};


//=============================================================================
// Scene_Menu
//=============================================================================

	var _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
		_Scene_Menu_prototype_createCommandWindow.call(this);
		this._commandWindow.setHandler('ABHelp',	this.commandABHelp.bind(this));
	};

	Scene_Menu.prototype.commandABHelp = function() {
		SceneManager.push(Scene_ABHelp);
	};

//=============================================================================
// Window_MenuCommand
//=============================================================================

	var _Window_MenuCommand_prototype_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function() {
		_Window_MenuCommand_prototype_addOriginalCommands.call(this);
		this.addABHelpCommand();
	};

	Window_MenuCommand.prototype.addABHelpCommand = function() {
		var show = ABHelp_ShowSwitchID === 0 ? true : $gameSwitches.value(ABHelp_ShowSwitchID);
		if (!show) return;
		var enable = ABHelp_EnableSwitchID === 0 ? true : $gameSwitches.value(ABHelp_EnableSwitchID);
		this.addCommand(AB_Helptitle, 'ABHelp', enable);
	};
})();