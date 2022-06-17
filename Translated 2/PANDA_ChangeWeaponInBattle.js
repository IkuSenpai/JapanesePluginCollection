//=============================================================================
// PANDA_ChangeWeaponInBattle.js
//=============================================================================
// [Update History]
// 2021-06-05 Ver.1.0.0 First Release for MV/MZ.
// 2021-06-23 Ver.1.1.0 fix for subfolder (MZ 1.3.0).
// 2021-07-05 Ver.1.1.1 revert fix for subfolder (MZ 1.3.2).

/*:
 * @target MV MZ
 * @plugindesc change weapon equipment by the "Item" command in battle.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210605222257.html
 * 
 * @help Weapon change function is added to the "Item" in the battle command.
 * When this plugin is installed, in addition to the usable items,
 * the weapons which the actor can equip will be displayed in the item list.
 * When you select a weapon, the actor changes the equipment to it
 * and makes a normal attack. (You can also return to command selection)
 * Changing weapons does not consume turns.
 * 
 * Dual wield characters can only change one weapon.
 * 
 * [License]
 * this plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param BattleItemText
 * @text Item command name in battle
 * @desc Specifies the command name of the "Item" in battle. If blank, it will be the same as the name in menu.
 * @type string
 * @default 
 * 
 * @param IsDirectAttack
 * @text Normal attack after changing the weapon
 * @desc After changing the weapon, Normal attack is selected and the selection of the target enemy is immediately started.
 * @type boolean
 * @default true
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc 戦闘中のアイテムコマンドに武器装備の変更機能を追加します。
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210605222257.html
 * 
 * @help 戦闘コマンドの「アイテム」に、武器装備の変更機能を追加します。
 * 
 * このプラグインを導入すると、戦闘中に使用可能なアイテムに加えて、
 * 対象アクターが装備可能な武器が、アイテムリストに表示されます。
 * 武器を選択すると、その武器に装備を変更し、通常攻撃を行います。
 * （コマンドの選択に戻ることもできます）
 * 武器の変更にはターンを消費しません。
 * 
 * 二刀流のキャラクターは片方の武器しか変更できません。
 * 
 * ■ 利用規約
 * このプラグインはMITライセンスで配布されます。
 * ご自由にお使いください。
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param BattleItemText
 * @text 戦闘中アイテムコマンド名
 * @desc 戦闘中における「アイテム」のコマンド名を指定します。空欄の場合はメニュー画面と同じになります。
 * @type string
 * @default 
 * 
 * @param IsDirectAttack
 * @text 武器変更後通常攻撃
 * @desc 武器の変更をしたら通常攻撃を選択したことにして、直ちに敵ターゲットの選択に移ります。
 * @type boolean
 * @default true
 * 
 */

/*:ko
 * @target MV MZ
 * @plugindesc 전투중의 "아이템"에 무기 장비 변경 기능을 추가합니다.
 * @author panda(werepanda.jp)
 * @url http://www.werepanda.jp/blog/20210605222257.html
 * 
 * @help 전투중 명령 "아이템"에 무기 장비 변경 기능을 추가합니다.
 * 
 * 이 플러그인을 설치하면, 전투중 사용 가능한 아이템 뿐만 아니라
 * 해당 액터가 장착 가능한 무기가 아이템 리스트에 표시됩니다.
 * 무기가 선택되면 장비를 그 무기로 바꾸고 일반 공격을 합니다.
 * (명령 선택에 돌아갈 수도 있습니다.)
 * 무기 변경은 턴을 소모하지 않습니다.
 * 
 * 듀얼 장비 캐릭터는 한쪽 무기만 변경할 수 있습니다.
 * 
 * [이용 약관]
 * 이 플러그인은 MIT 라이센스로 공개됩니다.
 * https://opensource.org/licenses/mit-license.php
 * 
 * @param BattleItemText
 * @text 전투중 아이템 명령명
 * @desc 전투중의 "아이템" 명령 명칭을 지정합니다. 입력하지 않으면 메뉴 화면과 같은 명칭이 됩니다.
 * @type string
 * @default 
 * 
 * @param IsDirectAttack
 * @text 무기 변경후 일반 공격
 * @desc 무기를 변경하면 일반 공격을 선택한 것으로 하여 즉시 대상 에너미 선택으로 전환합니다.
 * @type boolean
 * @default true
 * 
 */

(() => {
	'use strict';
	
	// This Plugin Name
	const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
	
	// Parameters
	const parameters = PluginManager.parameters(pluginName);
	const BattleItemText = parameters['BattleItemText'] || TextManager.item;
	const IsDirectAttack = (parameters['IsDirectAttack'] !== 'false');
	
	
	//--------------------------------------------------
	// Window_ActorCommand.addItemCommand
	//  [Modified Definition]
	//--------------------------------------------------
	Window_ActorCommand.prototype.addItemCommand = function() {
		this.addCommand(BattleItemText, "item");
	};
	
	
	//--------------------------------------------------
	// Window_BattleItem.includes
	//  [Additional Definition]
	//--------------------------------------------------
	const _Window_BattleItem_includes = Window_BattleItem.prototype.includes;
	Window_BattleItem.prototype.includes = function(item) {
		if (_Window_BattleItem_includes.call(this, item)) {
			return true;
		} else if (DataManager.isWeapon(item)) {
			// weapon
			return BattleManager.actor().canEquip(item);
		} else {
			return false;
		}
	};
	
	//--------------------------------------------------
	// Window_BattleItem.isEnabled
	//  [New Definition]
	//--------------------------------------------------
	Window_BattleItem.prototype.isEnabled = function(item) {
		return true;
	};
	
	
	//--------------------------------------------------
	// Scene_Battle.onItemOk
	//  [Additional Definition]
	//--------------------------------------------------
	const _Scene_Battle_onItemOk = Scene_Battle.prototype.onItemOk;
	Scene_Battle.prototype.onItemOk = function() {
		const item = this._itemWindow.item();
		if ($gameParty.canUse(item)) {
			// item : original process
			_Scene_Battle_onItemOk.call(this);
		} else if (DataManager.isWeapon(item)) {
			// weapon
			const actor = BattleManager.actor();
			if (actor) {
				if (actor.canEquip(item)) {
					// equip
					SoundManager.playEquip();
					actor.changeEquip(0, item);
					this._itemWindow.refresh();
					if (IsDirectAttack) {
						// attack
						this.commandAttack();
					} else {
						// return to actor command
						if (Utils.RPGMAKER_NAME === 'MV') {
							this._actorCommandWindow.select(0);
						} else {
							this._actorCommandWindow.forceSelect(0);
						}
						this.onItemCancel();
					}
				}
			}
		}
	};
	
})();

