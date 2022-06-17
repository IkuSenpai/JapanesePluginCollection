/*
 * --------------------------------------------------
 * ROR_BaseInsertDataToSave.js
 *   ver.1.0.0
 * Copyright (c) 2022 R.Orio
 * This software is released under the MIT license.
 * http://opensource.org/licenses/mit-license.php
 * --------------------------------------------------
 */

/*:
 * @target MZ
 * @plugindesc 編集したデータをセーブデータに挿入して保持します
 * @author R.Orio
 * @version 1.0.0
 *
 * @help
 * 編集したデータをセーブデータに挿入して保持します。
 * 以下のプラグインを使用される場合はこのプラグインを有効化してください。
 *
 *・ROR_DynamicPriceUpdate.js
 *・ROR_TreatTraitsForActor.js
 *
 *
 *
 * 利用規約:
 *   MITライセンスです。
 *   https://licenses.opensource.jp/MIT/MIT.html
 *   作者に無断で改変、再配布が可能で、
 *   利用形態（商用、18禁利用等）についても制限はありません。
 *
 */

(() => {
	'use strict';

	const _DataManager_setupNewGame = DataManager.setupNewGame;
	DataManager.setupNewGame = function(){
		_DataManager_setupNewGame.apply(this, arguments);

		const name1 = "$dataActors";
		const src1 = "Actors.json";
		const xhr1 = new XMLHttpRequest();
		const url1 = "data/" + src1;
		xhr1.open("GET", url1);
		xhr1.overrideMimeType("application/json");
		xhr1.onload = function(){
			const DatabaseActors = JSON.parse(xhr1.response);
			for(const DatabaseActor of DatabaseActors){
				if(DatabaseActor){
					$dataActors[parseInt(DatabaseActor.id)].traits = DatabaseActor.traits;
				}
			}
		};
		xhr1.onerror = function(){
			console.log('initialize error');
		};
		xhr1.send();

		const name2 = "$dataItems";
		const src2 = "Items.json";
		const xhr2 = new XMLHttpRequest();
		const url2 = "data/" + src2;
		xhr2.open("GET", url2);
		xhr2.overrideMimeType("application/json");
		xhr2.onload = function(){
			const DatabaseItems = JSON.parse(xhr2.response);
			for(const DatabaseItem of DatabaseItems){
				if(DatabaseItem){
					$dataItems[parseInt(DatabaseItem.id)].price = DatabaseItem.price;
				}
			}
		};
		xhr2.onerror = function(){
			console.log('initialize error');
		};
		xhr2.send();
	};

	const _DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function(){

		const contents = {};

		contents.system = $gameSystem;
		contents.screen = $gameScreen;
		contents.timer = $gameTimer;
		contents.switches = $gameSwitches;
		contents.variables = $gameVariables;
		contents.selfSwitches = $gameSelfSwitches;
		contents.actors = $gameActors;
		contents.party = $gameParty;
		contents.map = $gameMap;
		contents.player = $gamePlayer;
		contents.modifiedDataActors = $dataActors;//ROR
		contents.modifiedDataItems = $dataItems;//ROR

		return contents;
	};

	const _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents){
		_DataManager_extractSaveContents.apply(this, arguments);

		if(contents.modifiedDataActors){
			$dataActors = contents.modifiedDataActors;
		}
		if(contents.modifiedDataItems){
			$dataItems = contents.modifiedDataItems;
		}
	};

	const pluginName = document.currentScript.src.split("/").pop().replace(/\.js$/, "");

})();