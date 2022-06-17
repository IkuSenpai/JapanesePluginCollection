//=============================================================================
// PANDA_FindItemEvent.js
//=============================================================================
// [Update History]
// 2020-08-28 Ver.1.0.0 First Release for MZ.
// 2020-09-06 Ver.1.0.1 Added the Korean Description.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MZ
 * @plugindesc standardize item finding events.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200828185317.html
 * 
 * @help It will be helpful to install "PANDA_ConvertDataName.js" together.
 * 
 * [How to Use]
 * Input "Type character + Item ID number" in the Event Name.
 * When the Plugin Command "Find Item" is executed,
 * the player gets the Money or Item specified in the Event Name,
 * and you can get the Type number of the item in "Type Number Variable",
 * and also you can get the Item number in "Item Number Variable"
 * specified in the parameters of this plugin.
 * You can use a Common Event for the SE or messages etc. when getting items,
 * also it is easy to change the content of treasure boxes.
 * 
 * Type character and Type number
 *  g = 1 : gold (amount instead of item ID number)
 *  i = 2 : item
 *  w = 3 : weapon
 *  a = 4 : armor
 *  e = 5 : troop
 * 
 * [Example]
 * If you input "i15" as the Event Name, you can get an Item number 15,
 * you can get 2 in "Type Number Variable" and 15 in "Item Number Variable".
 * You can show the Item Name by entering "\item[\V[n]]",
 * if you have installed "PANDA_ConvertDataName.js".
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param TypeVarID
 * @text Type Number Variable ID
 * @desc The ID number of variables to get Type number.
 * @default 9
 * @type variable
 * 
 * @param ItemVarID
 * @text Item Number Variable ID
 * @desc The ID number of variables to get Item number.
 * @default 10
 * @type variable
 * 
 * @command FIND_ITEM
 * @text Find Item
 * @desc Get the item specified by the event name and get the type and item ID in the variables specified in the plugin parameters.
 */

/*:ja
 * @target MZ
 * @plugindesc アイテム発見イベントを規格化します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200828185317.html
 * 
 * @help 「PANDA_ConvertDataName.js」もあわせて導入すると便利です。
 * 
 * ■ 使い方
 * イベントの名前を「種別文字列 + アイテムID番号」としておきます。
 * 
 * プラグインコマンド「入手イベント起動」を実行すると、
 * イベントの名前に指定されたお金やアイテムを入手し、
 * パラメータで指定した「種別番号変数」に入手するアイテムの種別番号が、
 * 「アイテム番号変数」に入手するアイテムのID番号が、それぞれ取得されます。
 * 入手時の効果音やメッセージ等をコモンイベント化することができ、
 * 宝箱の中身を後から変更したい場合も、イベント名を変更するだけで済みます。
 * 
 * 種別文字列と種別番号
 *  g = 1 : お金（アイテムID番号の代わりに金額）
 *  i = 2 : アイテム
 *  w = 3 : 武器
 *  a = 4 : 防具
 *  e = 5 : 敵グループ
 * 
 * ■ 例
 * イベントの名前を「i15」とすると、15番のアイテムを1つ入手し、
 * 種別番号変数に"2"が、アイテム番号変数に"15"が代入されます。
 * PANDA_ConvertDataName.js を利用すれば、
 * 「\item[\V[n]]」の記述で該当するアイテム名を表示することが可能です。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param TypeVarID
 * @text 種別番号変数
 * @desc 種別番号を取得する変数の番号
 * @default 9
 * @type variable
 * 
 * @param ItemVarID
 * @text アイテム番号変数
 * @desc アイテム番号を取得する変数の番号
 * @default 10
 * @type variable
 * 
 * @command FIND_ITEM
 * @text 入手イベント起動
 * @desc イベントの名前で指定したアイテムを入手し、その種別・番号をプラグインのパラメータで指定された変数に取得します。
 */

/*:ko
 * @target MZ
 * @plugindesc 아이템 발견 이벤트를 표준화합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20200828185317.html
 * 
 * @help "PANDA_ConvertDataName.js"도 함께 설치하면 편합니다.
 * 
 * [사용법]
 * 이벤트 이름을 "종별 문자열 + 아이템ID 번호"로 해둡니다.
 * 
 * 플러그인 명령 "입수 이벤트"를 실시하면,
 * 이벤트 이름에 지정된 돈이나 아이템을 입수하고,
 * 매개 변수에서 지정된 "종별 번호 변수"에 입수한 아이템의 종별 번호가,
 * "아이템 번호 변수"에 입수한 아이템의 ID번호가 각각 취득됩니다.
 * 입수할 때의 효과음이나 메세지 표시등을 공통 이벤트로 할 수가 있으며,
 * 보물 상자 내용을 나중에 변경할 경우에도 이벤트명을 변경하기만 하면 됩니다.
 * 
 * 종별 문자열과 종별 번호
 *  g = 1 : 돈 (아이템 ID번호 대신 금액)
 *  i = 2 : 아이템
 *  w = 3 : 무기
 *  a = 4 : 방어구
 *  e = 5 : 적 군단
 * 
 * [예]
 * 이벤트 이름을 "i15"로 하면 15번 아이템을 한 개 입수하며
 * 종별 번호 변수에 "2"가, が、아이템 번호 변수에 "15"가 대입됩니다.
 * PANDA_ConvertDataName.js 를 이용하면
 * "\item[\V[n]]"으로 해당하는 아이템명을 표시시킬 수 있습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param TypeVarID
 * @text 종별 번호 변수
 * @desc 종별 번호를 취득할 변수의 번호
 * @default 9
 * @type variable
 * 
 * @param ItemVarID
 * @text 아이템 번호 변수
 * @desc 아이템 번호를 취득할 변수의 번호
 * @default 10
 * @type variable
 * 
 * @command FIND_ITEM
 * @text 입수 이벤트
 * @desc 이벤트 이름에서 지정된 아이템을 입수하고 그 종류와 번호를 플러그인 매개 변수에서 지정된 변수에 취득합니다.
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const TypeVarID = parseInt(parameters['TypeVarID']) || 9;
	const ItemVarID = parseInt(parameters['ItemVarID']) || 10;
	
	
	//--------------------------------------------------
	// Plugin Command "Find Item"
	//--------------------------------------------------
	PluginManager.registerCommand(pluginName, 'FIND_ITEM', function() {
		
		// initialize variables
		$gameVariables.setValue(TypeVarID, 0);
		$gameVariables.setValue(ItemVarID, 0);
		
		// get this event data
		const event = this.character(0).event();
		
		// get name of this event
		const name = event.name;
		
		// parse name
		let result;
		if (result = name.match(/([giwae])(\d+)/i)) {
			
			// get item type and id
			let type = result[1].toLowerCase();
			let id = parseInt(result[2]);
			let item;
			
			// get item type
			switch(type) {
				
				// Gold(1)
				case 'g':
					$gameVariables.setValue(TypeVarID, 1);
					$gameVariables.setValue(ItemVarID, id);
					$gameParty.gainGold(id);
					break;
				
				// Item(2)
				case 'i':
					item = $dataItems[id];
					if (item) {
						$gameVariables.setValue(TypeVarID, 2);
						$gameVariables.setValue(ItemVarID, id);
						$gameParty.gainItem(item, 1);
					}
					break;
				
				// Weapon(3)
				case 'w':
					item = $dataWeapons[id];
					if (item) {
						$gameVariables.setValue(TypeVarID, 3);
						$gameVariables.setValue(ItemVarID, id);
						$gameParty.gainItem(item, 1);
					}
					break;
				
				// Armor(4)
				case 'a':
					item = $dataArmors[id];
					if (item) {
						$gameVariables.setValue(TypeVarID, 4);
						$gameVariables.setValue(ItemVarID, id);
						$gameParty.gainItem(item, 1);
					}
					break;
				
				// Troop(5)
				case 'e':
					item = $dataTroops[id];
					if (item) {
						$gameVariables.setValue(TypeVarID, 5);
						$gameVariables.setValue(ItemVarID, id);
					}
					break;
				
			}
		}
		
	});
	
})();
