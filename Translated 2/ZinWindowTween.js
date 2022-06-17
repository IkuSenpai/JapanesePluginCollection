//=============================================================================
// RPG Maker MZ - WindowTween
//
// Copyright 2021 Huuzin
// Released under the MIT license
// https://opensource.org/licenses/mit-license.php
//
// ver 1.0.1    Release data: 2021/01/12
//              外部プラグイン連携時に予期しないウインドウが生成されるとエラーが出る不具合を修正
// ver 1.0.0	Release data: 2021/01/11
//				初版公開(First release)
// 
// https://huuzin.net
// 
//=============================================================================

/*:
* @target MZ
* @plugindesc ver 1.0.1 Controls the movement of the window as it appears and disappears.
* @author Huuzin
* @url https://huuzin.net/2021/1/11/windowtween/
* @base ZinTween
* @orderAfter ZinTween
* @base PluginCommonBase
* @orderAfter PluginCommonBase
*
* @help
* This plugin controls the movement of the windows as they appear and disappear.
* The current version supports the title scene and menu scene.
*
* ---How to use---
* 1. Turn on the plugin.
* 2. Adjust the plugin parameters according to your preference.
*
* ---Operating conditions---
* RPG MZ version：v1.1.1
* PluginCommonBase and ZinTween are required for this plugin to work.
* PluginCommonBase: https://triacontane.blogspot.com/2020/08/rpgmz.html
* ZinTween: https://huuzin.net/2020/09/06/zintween/

* @param ***Basic Tween***
* @param windowGoldTween
* @text Gold window
* @desc Tween settings to be applied to opening and closing of the Gold window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowHelpTween
* @text Help window
* @desc Tween settings to be applied to opening and closing of the help window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}


* @param ***Menu Tween***
* @param windowMenuStatusTween
* @text Main menu actor window
* @desc Tween settings to be applied to opening and closing of the main menu actor window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowMenuCommandTween
* @text Main menu command window
* @desc Tween settings to be applied to opening and closing of the main menu command window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowItemCategoryTween
* @text Item category window
* @desc Tween settings to be applied to opening and closing of the item category window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowItemListTween
* @text Item list window
* @desc Tween settings to be applied to opening and closing of the item list window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}


* @param windowMenuActorTween
* @text Actor selection window
* @desc Tween settings to be applied to opening and closing of the actor selection window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"50%","moveY":"0","alpha":"255","easing":"OutSine","duration":"0.200","delay":"0"}

* @param windowSkillTypeTween
* @text Skill type window
* @desc Tween settings to be applied to opening and closing of the skill type window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowSkillStatusTween
* @text Skill status window
* @desc Tween settings to be applied to opening and closing of the skill status window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowSkillListTween
* @text Skill list window
* @desc Tween settings to be applied to opening and closing of the skill list window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowEquipStatusTween
* @text Equip status window
* @desc Tween settings to be applied to opening and closing of the equip status window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowEquipCommandTween
* @text Equip command window
* @desc Tween settings to be applied to opening and closing of the equip command window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowEquipSlotTween
* @text Equip slot window
* @desc Tween settings to be applied to opening and closing of the equip slot window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowStatusTween
* @text Status window
* @desc Tween settings to be applied to opening and closing of the status window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowStatusParamTween
* @text Status parameter window
* @desc Tween settings to be applied to opening and closing of the status parameter window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowStatusEquipTween
* @text Equip status window (Status menu)
* @desc Tween settings to be applied to opening and closing of the equip status window (Status menu).
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowOptionTween
* @text Configuration window
* @desc Tween settings to be applied to opening and closing of the configuration status window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"InOutSine","duration":"0.600","delay":"0"}

* @param windowSavefileListTween
* @text Save file list window
* @desc Tween settings to be applied to opening and closing of the save file list window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"OutSine","duration":"0.400","delay":"0.200"}

* @param windowGameEndTween
* @text Game-end command window
* @desc Tween settings to be applied to opening and closing of the game-end command window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"InOutSine","duration":"0.600","delay":"0"}

* @param ***Title Tween***
* @param windowTitleCommandTween
* @text Title command window
* @desc Tween settings to be applied to opening and closing of the title command window.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"0","alpha":"0","easing":"InOutSine","duration":"1.200","delay":"0"}


* @param ***Custom tween***
* @param customTweens
* @text Additional window
* @desc Apply tweening to windows added by plugins, etc.
* @type struct<TweenWindow>[]
* @default ["{\"windowName\":\"_listWindow.mzkp_statusWindow\",\"sceneType\":\"Save\",\"tween\":\"{\\\"enable\\\":\\\"true\\\",\\\"moveX\\\":\\\"0\\\",\\\"moveY\\\":\\\"200\\\",\\\"alpha\\\":\\\"0\\\",\\\"easing\\\":\\\"OutSine\\\",\\\"duration\\\":\\\"0.400\\\",\\\"delay\\\":\\\"0.400\\\"}\"}"]

*
*/

/*~struct~TweenWindow:
*
* @param windowName
* @text Window name
* @desc Specify the window name. Specify the window name in {} of "target-scene. {} in {_commandWindow}".
* @type string
*
* @param sceneType
* @text Scene type
* @desc Select the scene type to which you want to apply this tween.
* @type select
* @default MainMenu
* @option MainMenu[Scene_Menu]
* @value MainMenu
* @option MenuItem[Scene_Item]
* @value MenuItem
* @option SelectActor[Scene_ItemBase]
* @value SelectActor
* @option MenuSkill[Scene_Skill]
* @value MenuSkill
* @option MenuEquip[Scene_Equip]
* @value MenuEquip
* @option MenuStatus[Scene_Status]
* @value MenuStatus
* @option Save)[Scene_File]
* @value Save
* @option GameEnd[Scene_GameEnd]
* @value GameEnd
*
* @param tween
* @text Custom tween settings
* @desc Sets a custom tween.
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"0","alpha":"0","easing":"InOutSine","duration":"0.3","delay":"0"}
*
*/

/*~struct~TweenSetting:
 *
 * @param enable
 * @text Use tween
 * @desc Specifies whether or not to use this tween.
 * @type boolean
 * @default false
 * 
 * @param moveX
 * @text x movement
 * @desc Set the X movement.
 * @default 0
 * @type string
 * 
 * @param moveY
 * @text Y movement
 * @desc Set the Y movement.
 * @default 0
 * @type string
 *
 * @param alpha
 * @text Alpha
 * @desc Set the window's alpha.
 * @default 0
 * @type string
 * 
 * @param easing
 * @text Easing
 * @desc Specifies the type of easing.
 * @type select
 * @default InOutSine
 * @option Slope
 * @value Slope
 * @option InSine
 * @value InSine
 * @option OutSine
 * @value OutSine
 * @option InOutSine
 * @value InOutSine
 * @option InQuad
 * @value InQuad
 * @option OutQuad
 * @value OutQuad
 * @option InOutQuad
 * @value InOutQuad
 * @option InCubic
 * @value InCubic
 * @option OutCubic
 * @value OutCubic
 * @option InOutCubic
 * @value InOutCubic
 * @option InQuart
 * @value InQuart
 * @option OutQuart
 * @value OutQuart
 * @option InOutQuart
 * @value InOutQuart
 * @option InExpo
 * @value InExpo
 * @option OutExpo
 * @value OutExpo
 * @option InOutExpo
 * @value InOutExpo
 * @option InBack
 * @value InBack
 * @option OutBack
 * @value OutBack
 * @option InOutBack
 * @value InOutBack
 * @option InElastic
 * @value InElastic
 * @option OutElastic
 * @value OutElastic
 * @option InOutElastic
 * @value InOutElastic
 * @option InBounce
 * @value InBounce
 * @option OutBounce
 * @value OutBounce
 * @option InOutBounce
 * @value InOutBounce
 * @option Step
 * @value Step
 * @option Stairs1
 * @value Stairs1
 * @option Stairs2(For pingpong movement)
 * @value Stairs2
 *
 * @param duration
 * @text Easing duration
 * @desc Sets the time (in seconds) required to complete easing.
 * @default 0.3
 * @type number
 * @decimals 3
 * 
 * @param delay
 * @text Delay
 * @desc Sets the delay time (in seconds) to start easing.
 * @default 0
 * @type number
 * @decimals 3
 * 
*/

/*:ja
* @target MZ
* @plugindesc ver 1.0.1 ウィンドウの出現や消去の動きをコントロールします
* @author Huuzin
* @url https://huuzin.net/2021/1/11/windowtween/
* @base ZinTween
* @orderAfter ZinTween
* @base PluginCommonBase
* @orderAfter PluginCommonBase
*
* @help
* ウィンドウの出現や消去の動きをコントロールします。
* 現在はタイトル画面及びメニュー画面に対応しています。
*
* ---使用方法---
* 1. プラグインをONにします。
* 2. 好みに合わせてプラグインパラメータを調整してください。
*
* ---動作確認---
* コアスクリプト：v1.1.1
* 本プラグインの動作にはPluginCommonBaseとZinTweenが必要です。
* PluginCommonBase: https://triacontane.blogspot.com/2020/08/rpgmz.html
* ZinTween: https://huuzin.net/2020/09/06/zintween/

* @param ***基本のトゥイーン***
* @param windowGoldTween
* @text ゴールド画面
* @desc ゴールド画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowHelpTween
* @text ヘルプ画面
* @desc ヘルプ画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}


* @param ***メニューのトゥイーン***
* @param windowMenuStatusTween
* @text メインメニューアクター画面
* @desc メインメニューアクター画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowMenuCommandTween
* @text メインメニューコマンド画面
* @desc メインメニューコマンド画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowItemCategoryTween
* @text アイテムカテゴリ画面
* @desc アイテムカテゴリ画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowItemListTween
* @text アイテムリスト画面
* @desc アイテムリスト画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}


* @param windowMenuActorTween
* @text アクター選択画面
* @desc アイテム・スキルウインドウのアクター選択画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"50%","moveY":"0","alpha":"255","easing":"OutSine","duration":"0.200","delay":"0"}

* @param windowSkillTypeTween
* @text スキルタイプ画面
* @desc スキルタイプ画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowSkillStatusTween
* @text スキルステータス画面
* @desc スキルステータス画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowSkillListTween
* @text スキルリスト画面
* @desc スキルリスト画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowEquipStatusTween
* @text 装備ステータス画面
* @desc 装備ステータス画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowEquipCommandTween
* @text 装備コマンド画面
* @desc 装備コマンド画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowEquipSlotTween
* @text 装備スロット画面
* @desc 装備スロット画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowStatusTween
* @text ステータス画面
* @desc ステータス画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"-200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowStatusParamTween
* @text ステータスパラメータ画面
* @desc ステータスパラメータ画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowStatusEquipTween
* @text ステータス装備画面
* @desc ステータス装備画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"200","moveY":"0","alpha":"0","easing":"OutSine","duration":"0.300","delay":"0"}

* @param windowOptionTween
* @text オプション画面
* @desc オプション画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"InOutSine","duration":"0.600","delay":"0"}

* @param windowSavefileListTween
* @text セーブファイルリスト画面
* @desc セーブファイルリスト画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"OutSine","duration":"0.400","delay":"0.200"}

* @param windowGameEndTween
* @text ゲーム終了コマンド画面
* @desc ゲーム終了コマンド画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"200","alpha":"0","easing":"InOutSine","duration":"0.600","delay":"0"}

* @param ***タイトルのトゥイーン***
* @param windowTitleCommandTween
* @text タイトルコマンド画面
* @desc タイトルコマンド画面の開閉に適用するトゥイーンの設定
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"0","alpha":"0","easing":"InOutSine","duration":"1.200","delay":"0"}


* @param ***カスタムトゥイーン***
* @param customTweens
* @text 追加ウィンドウ
* @desc プラグイン等で追加されたウインドウに対してトゥイーンを適用します。
* @type struct<TweenWindow>[]
* @default ["{\"windowName\":\"_listWindow.mzkp_statusWindow\",\"sceneType\":\"Save\",\"tween\":\"{\\\"enable\\\":\\\"true\\\",\\\"moveX\\\":\\\"0\\\",\\\"moveY\\\":\\\"200\\\",\\\"alpha\\\":\\\"0\\\",\\\"easing\\\":\\\"OutSine\\\",\\\"duration\\\":\\\"0.400\\\",\\\"delay\\\":\\\"0.400\\\"}\"}"]

*
*/

/*~struct~TweenWindow:ja
*
* @param windowName
* @text ウインドウ名
* @desc ウインドウ名を指定します。「対象シーン.{_commandWindow}」の{}内を記述してください。
* @type string
*
* @param sceneType
* @text シーンタイプ
* @desc このトゥイーンを適用するシーンタイプを選択します。
* @type select
* @default MainMenu
* @option メインメニュー(MainMenu)[Scene_Menu]
* @value MainMenu
* @option アイテム画面(MenuItem)[Scene_Item]
* @value MenuItem
* @option アクター選択(SelectActor)[Scene_ItemBase]
* @value SelectActor
* @option スキル画面(MenuSkill)[Scene_Skill]
* @value MenuSkill
* @option 装備画面(MenuEquip)[Scene_Equip]
* @value MenuEquip
* @option ステータス画面(MenuStatus)[Scene_Status]
* @value MenuStatus
* @option セーブ画面(Save)[Scene_File]
* @value Save
* @option ゲーム終了画面(GameEnd)[Scene_GameEnd]
* @value GameEnd
*
* @param tween
* @text カスタムトゥイーン設定
* @desc カスタムトゥイーンを設定します。
* @type struct<TweenSetting>
* @default {"enable":"true","moveX":"0","moveY":"0","alpha":"0","easing":"InOutSine","duration":"0.3","delay":"0"}
*
*/

/*~struct~TweenSetting:ja
 *
 * @param enable
 * @text トゥイーン許可
 * @desc このトゥイーンを使用するかどうかを指定します。
 * @type boolean
 * @default false
 * 
 * @param moveX
 * @text x座標
 * @desc X移動座標を設定します。
 * @default 0
 * @type string
 * 
 * @param moveY
 * @text y座標
 * @desc Y移動座標を設定します。
 * @default 0
 * @type string
 *
 * @param alpha
 * @text 透過率
 * @desc 透過率を設定します。
 * @default 0
 * @type string
 * 
 * @param easing
 * @text イージング
 * @desc イージングの種類を指定します。
 * @type select
 * @default InOutSine
 * @option 線形変化[Slope]
 * @value Slope
 * @option サインカーブ(入り)[InSine]
 * @value InSine
 * @option サインカーブ(抜き)[OutSine]
 * @value OutSine
 * @option サインカーブ(入り抜き)[InOutSine]
 * @value InOutSine
 * @option 2乗変化(入り)[InQuad]
 * @value InQuad
 * @option 2乗変化(抜き)[OutQuad]
 * @value OutQuad
 * @option 2乗変化(入り抜き)[InOutQuad]
 * @value InOutQuad
 * @option 3乗変化(入り)[InCubic]
 * @value InCubic
 * @option 3乗変化(抜き)[OutCubic]
 * @value OutCubic
 * @option 3乗変化(入り抜き)[InOutCubic]
 * @value InOutCubic
 * @option 4乗変化(入り)[InQuart]
 * @value InQuart
 * @option 4乗変化(抜き)[OutQuart]
 * @value OutQuart
 * @option 4乗変化(入り抜き)[InOutQuart]
 * @value InOutQuart
 * @option 指数変化(入り)[InExpo]
 * @value InExpo
 * @option 指数変化(抜き)[OutExpo]
 * @value OutExpo
 * @option 指数変化(入り抜き)[InOutExpo]
 * @value InOutExpo
 * @option 反動(入り)[InBack]
 * @value InBack
 * @option 反動(抜き)[OutBack]
 * @value OutBack
 * @option 反動(入り抜き)[InOutBack]
 * @value InOutBack
 * @option 弾性(入り)[InElastic]
 * @value InElastic
 * @option 弾性(抜き)[OutElastic]
 * @value OutElastic
 * @option 弾性(入り抜き)[InOutElastic]
 * @value InOutElastic
 * @option バウンス(入り)[InBounce]
 * @value InBounce
 * @option バウンス(抜き)[OutBounce]
 * @value OutBounce
 * @option バウンス(入り抜き)[InOutBounce]
 * @value InOutBounce
 * @option ステップ変化[Step]
 * @value Step
 * @option 階段状変化１[Stairs1]
 * @value Stairs1
 * @option 階段状変化２(ピンポン動作向け)[Stairs2]
 * @value Stairs2
 *
 * @param duration
 * @text イージング時間
 * @desc イージング完了までにかかる時間[秒]
 * @default 0.3
 * @type number
 * @decimals 3
 * 
 * @param delay
 * @text ディレイ
 * @desc イージング開始までのディレイ時間[秒]
 * @default 0
 * @type number
 * @decimals 3
 * 
*/

(() => {
    'use strict';
    const script = document.currentScript;
	const param  = PluginManagerEx.createParameter(script);

	//-------------------------------------------------------------------------------------------------
	//	Plugin command
    //-------------------------------------------------------------------------------------------------
    

    //-------------------------------------------------------------------------------------------------
    // Static Class
    //-------------------------------------------------------------------------------------------------
	function ZinWindowTween() {
		throw new Error('This is a static class');
	}

	ZinWindowTween.OpenTween = function(window, tweenParam) {
		if(window.refresh && tweenParam.enable){
            const easing = ZinTween.getEasing(tweenParam.easing);
            window.ztAlphaFrom(tweenParam.alpha, tweenParam.duration).setEase(easing).setDelay(tweenParam.delay);
            window.ztMoveByFrom(tweenParam.moveX, tweenParam.moveY, tweenParam.duration).setEase(easing).setDelay(tweenParam.delay);
        }
    }
    
    ZinWindowTween.CloseTween = function(window, tweenParam, delay) {
		if(window.refresh && tweenParam.enable){
            const easing = ZinTween.getReverseEasing(tweenParam.easing);
            window.ztAlphaTo(tweenParam.alpha, tweenParam.duration).setEase(easing).setDelay(delay);
            window.ztMoveBy(tweenParam.moveX, tweenParam.moveY, tweenParam.duration).setEase(easing).setDelay(delay);
        }
    }
    
    // 逆の動作を行う一連のトゥイーンを作成
    ZinWindowTween.CreateReverseTweens = function(tweenParam, delays) {
        let tweenTimes = Array(tweenParam.length);
        let maximamID = -1;
        let maxTweenTime = -1;

        // 各トゥイーンの開始時間 + イージング時間を計算
        for(let i = 0; i < tweenParam.length; i++){
            if(tweenParam[i].enable){
                tweenTimes[i] = tweenParam[i].duration + tweenParam[i].delay;
                if(tweenTimes[i] > maxTweenTime){
                    maxTweenTime = tweenTimes[i];
                }
            }else{
                tweenTimes[i] = 0;
            } 
        }

        // 各トゥイーンのdelay時間を再計算する
        // delay = maxTweenTime - t.duration - t.delay
        let maxTotalTime = -1;
        for(let i = 0; i < tweenParam.length; i++){
            delays[i] = maxTweenTime - tweenTimes[i];

            // delay + durationが最大のTweenが最後に動作完了する
            if(delays[i] + tweenParam[i].duration > maxTotalTime){
                maximamID = i;
                maxTotalTime = delays[i] + tweenParam[i].duration;
            }
        }

        return maximamID;
    }

    // 一連のトゥイーンを再生する
    ZinWindowTween.OpenTweens = function(scene, windows, tweenParams, tweenSceneType) {
        // カスタムトゥイーンを得る
        let customWindows = ZinWindowTween.GetCustomTween(tweenSceneType);
        let w;
        for(let i = 0; i < customWindows.length; i++){
            w = eval("scene." + customWindows[i].windowName);
            if(w){
                windows.push(w);
                tweenParams.push(customWindows[i].tween);
            }
        }

        for(let i = 0; i < windows.length && i < tweenParams.length; i++){
            // すぐにトゥイーンをかけるのではなく、更新タイミングでトゥイーンさせる
            if(windows[i] && tweenParams[i]){
                SceneManager._initWindowList.push({window:windows[i], tweenParam:tweenParams[i]});
            }
        }
    }

    // 一連のトゥイーンを逆転させて再生する
    ZinWindowTween.CloseTweens = function(scene, windows, tweenParams, bindFunc, tweenSceneType) {
        // カスタムトゥイーンを得る
        let customWindows = ZinWindowTween.GetCustomTween(tweenSceneType);
        let w;
        for(let i = 0; i < customWindows.length; i++){
            w = eval("scene." + customWindows[i].windowName);
            if(w){
                windows.push(w);
                tweenParams.push(customWindows[i].tween);
            }
        }

        // Reverse delay time取得
        let delays = Array(tweenParams.length);
        const id = ZinWindowTween.CreateReverseTweens(tweenParams, delays);

        for(let i = 0; i < windows.length && i < tweenParams.length; i++){
            if(windows[i] && tweenParams[i]){
                ZinWindowTween.CloseTween(windows[i], tweenParams[i], delays[i]);
            }
        }

        // 終了後呼び出し関数がセットされているなら、最大時間かかるWindowにセット
        if(bindFunc && id >= 0){
            windows[id].ztSetHandler(bindFunc);
        }
    }

    // カスタムトゥイーンを得る
    ZinWindowTween.GetCustomTween = function(tweenSceneType) {
        let tweenWindowList = [];
        for(let i = 0; i < param.customTweens.length; i++){
            if(param.customTweens[i].sceneType.indexOf(tweenSceneType) >= 0){
                tweenWindowList.push(param.customTweens[i]);
            }
        }
        return tweenWindowList;
    }

    // いずれかのトゥイーンがenableか確認する
    ZinWindowTween.IsEitherTweenEnabled = function(tweenParams) {
        for(let i = 0; i < tweenParams.length; i++){
            if(tweenParams[i].enable) return true;
        }
        return false;
    }


	//-------------------------------------------------------------------------------------------------
    // Scene_Base & SceneManager
    //-------------------------------------------------------------------------------------------------
    const _SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        _SceneManager_initialize.apply(this,arguments);
        this._initWindowList = [];
    };

    const _SceneManager_updateScene = SceneManager.updateScene;
    SceneManager.updateScene = function() {
        _SceneManager_updateScene.apply(this,arguments);
        this._initWindowList.forEach(zt => ZinWindowTween.OpenTween(zt.window, zt.tweenParam));
        this._initWindowList = [];
    };

    //-------------------------------------------------------------------------------------------------
	//	Menu main window
	//-------------------------------------------------------------------------------------------------
    const _Scene_Menu_prototype_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._statusWindow, this._commandWindow, this._goldWindow],
            [param.windowMenuStatusTween, param.windowMenuCommandTween, param.windowGoldTween],
             "MainMenu");
    };
    
    const _Scene_Menu_prototype_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_prototype_createCommandWindow.apply(this,arguments);
        if(param.windowMenuCommandTween.enable){
            this._commandWindow.setHandler("item", this.setCommandItem.bind(this));
            this._commandWindow.setHandler("formation", this.commandFormation.bind(this));
            this._commandWindow.setHandler("options", this.setCommandOptions.bind(this));
            this._commandWindow.setHandler("save", this.setCommandSave.bind(this));
            this._commandWindow.setHandler("gameEnd", this.setCommandGameEnd.bind(this));
            this._commandWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
    };
    
    const _Scene_Menu_prototype_commandPersonal = Scene_Menu.prototype.commandPersonal;
    Scene_Menu.prototype.commandPersonal = function() {
        _Scene_Menu_prototype_commandPersonal.apply(this,arguments);
        if(param.windowMenuCommandTween.enable){
            this._statusWindow.setHandler("ok", this.setOnPersonalOk.bind(this));
        }
    };

	Scene_Menu.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._statusWindow, this._commandWindow, this._goldWindow],
             [param.windowMenuStatusTween, param.windowMenuCommandTween, param.windowGoldTween],
             this.popScene.bind(this), "MainMenu");
    };

    Scene_Menu.prototype.setCommandItem = function() {
        ZinWindowTween.CloseTweens(this, [this._statusWindow, this._commandWindow, this._goldWindow],
            [param.windowMenuStatusTween, param.windowMenuCommandTween, param.windowGoldTween],
            this.commandItem.bind(this), "MainMenu");
    };

    Scene_Menu.prototype.setOnPersonalOk = function() {
        ZinWindowTween.CloseTweens(this, [this._statusWindow, this._commandWindow, this._goldWindow],
            [param.windowMenuStatusTween, param.windowMenuCommandTween, param.windowGoldTween],
            this.onPersonalOk.bind(this), "MainMenu");
    };

    Scene_Menu.prototype.setCommandOptions = function() {
        ZinWindowTween.CloseTweens(this, [this._statusWindow, this._commandWindow, this._goldWindow],
            [param.windowMenuStatusTween, param.windowMenuCommandTween, param.windowGoldTween],
            this.commandOptions.bind(this), "MainMenu");
    };

    Scene_Menu.prototype.setCommandSave = function() {
        ZinWindowTween.CloseTweens(this, [this._statusWindow, this._commandWindow, this._goldWindow],
            [param.windowMenuStatusTween, param.windowMenuCommandTween, param.windowGoldTween],
            this.commandSave.bind(this), "MainMenu");
    };

    Scene_Menu.prototype.setCommandGameEnd = function() {
        ZinWindowTween.CloseTweens(this, [this._statusWindow, this._commandWindow, this._goldWindow],
            [param.windowMenuStatusTween, param.windowMenuCommandTween, param.windowGoldTween],
            this.commandGameEnd.bind(this), "MainMenu");
    };

    //-------------------------------------------------------------------------------------------------
	//	Menu window - item
	//-------------------------------------------------------------------------------------------------
    const _Scene_Item_prototype_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function() {
        _Scene_Item_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._helpWindow, this._itemWindow, this._categoryWindow],
            [param.windowHelpTween, param.windowItemListTween, param.windowItemCategoryTween],
             "MenuItem");
    };
    
    const _Scene_Item_prototype_createCategoryWindow = Scene_Item.prototype.createCategoryWindow;
	Scene_Item.prototype.createCategoryWindow = function() {
        _Scene_Item_prototype_createCategoryWindow.apply(this,arguments);
        if(param.windowItemCategoryTween.enable){
            this._categoryWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
	};
    
    Scene_Item.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._helpWindow, this._itemWindow, this._categoryWindow],
            [param.windowHelpTween, param.windowItemListTween, param.windowItemCategoryTween],
            this.popScene.bind(this), "MenuItem");
    };
    
    const _Scene_ItemBase_prototype_showActorWindow = Scene_ItemBase.prototype.showActorWindow;
    Scene_ItemBase.prototype.showActorWindow = function() {
        _Scene_ItemBase_prototype_showActorWindow.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._actorWindow],
            [param.windowMenuActorTween], "SelectActor");
    };

	const _Scene_ItemBase_prototype_createActorWindow = Scene_ItemBase.prototype.createActorWindow;
	Scene_ItemBase.prototype.createActorWindow = function() {
        _Scene_ItemBase_prototype_createActorWindow.apply(this,arguments);
        if(param.windowMenuActorTween.enable){
            this._actorWindow.setHandler("cancel", this.setOnActorCancel.bind(this));
        }
    };

	Scene_ItemBase.prototype.setOnActorCancel = function() {
        ZinWindowTween.CloseTweens(this, [this._actorWindow],
            [param.windowMenuActorTween],
            this.onActorCancel.bind(this), "SelectActor");
    };
    
    //-------------------------------------------------------------------------------------------------
	//	Menu window - skill
	//-------------------------------------------------------------------------------------------------
	const _Scene_Skill_prototype_create = Scene_Skill.prototype.create;
    Scene_Skill.prototype.create = function() {
        _Scene_Skill_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._helpWindow, this._itemWindow,this._statusWindow, this._skillTypeWindow],
            [param.windowHelpTween, param.windowSkillListTween, param.windowSkillStatusTween, param.windowSkillTypeTween],
             "MenuSkill");
    };

    const _Scene_Skill_prototype_createSkillTypeWindow = Scene_Skill.prototype.createSkillTypeWindow;
	Scene_Skill.prototype.createSkillTypeWindow = function() {
        _Scene_Skill_prototype_createSkillTypeWindow.apply(this,arguments);
        if(param.windowSkillTypeTween.enable){
            this._skillTypeWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
	};

	Scene_Skill.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._helpWindow, this._itemWindow,this._statusWindow, this._skillTypeWindow],
            [param.windowHelpTween, param.windowSkillListTween, param.windowSkillStatusTween, param.windowSkillTypeTween],
            this.popScene.bind(this), "MenuSkill");
    };
    
    //-------------------------------------------------------------------------------------------------
	//	Menu window - equip
	//-------------------------------------------------------------------------------------------------
    const _Scene_Equip_prototype_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _Scene_Equip_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._helpWindow, this._slotWindow,this._statusWindow, this._commandWindow],
            [param.windowHelpTween, param.windowEquipSlotTween, param.windowEquipStatusTween, param.windowEquipCommandTween],
             "MenuEquip");
    };
    
    const _Scene_Equip_prototype_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
	Scene_Equip.prototype.createCommandWindow = function() {
        _Scene_Equip_prototype_createCommandWindow.apply(this,arguments);
        if(param.windowEquipCommandTween.enable){
            this._commandWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
	};

	Scene_Equip.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._helpWindow, this._slotWindow,this._statusWindow, this._commandWindow],
            [param.windowHelpTween, param.windowEquipSlotTween, param.windowEquipStatusTween, param.windowEquipCommandTween],
            this.popScene.bind(this), "MenuEquip");
    };
    
    //-------------------------------------------------------------------------------------------------
	//	Menu window - Status
	//-------------------------------------------------------------------------------------------------
    const _Scene_Status_prototype_create = Scene_Status.prototype.create;
    Scene_Status.prototype.create = function() {
        _Scene_Status_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._statusEquipWindow, this._statusParamsWindow,this._statusWindow, this._profileWindow],
            [param.windowStatusEquipTween, param.windowStatusParamTween, param.windowStatusTween, param.windowHelpTween],
             "MenuStatus");
    };
    
    const _Scene_Status_prototype_createStatusWindow = Scene_Status.prototype.createStatusWindow;
	Scene_Status.prototype.createStatusWindow = function() {
        _Scene_Status_prototype_createStatusWindow.apply(this,arguments);
        if(param.windowStatusTween.enable){
            this._statusWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
	};

	Scene_Status.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._statusEquipWindow, this._statusParamsWindow,this._statusWindow, this._profileWindow],
            [param.windowStatusEquipTween, param.windowStatusParamTween, param.windowStatusTween, param.windowHelpTween],
            this.popScene.bind(this), "MenuStatus");
    };
    
    //-------------------------------------------------------------------------------------------------
	//	Menu window - Option
	//-------------------------------------------------------------------------------------------------
    const _Scene_Options_prototype_create = Scene_Options.prototype.create;
    Scene_Options.prototype.create = function() {
        _Scene_Options_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._optionsWindow],
            [param.windowOptionTween], "Option");
    };
    
    const _Scene_Options_prototype_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
	Scene_Options.prototype.createOptionsWindow = function() {
        _Scene_Options_prototype_createOptionsWindow.apply(this,arguments);
        if(param.windowOptionTween.enable){
            this._optionsWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
	};

	Scene_Options.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._optionsWindow],
            [param.windowOptionTween], this.popScene.bind(this), "Option");
    };
    
    //-------------------------------------------------------------------------------------------------
	//	Menu window - File
	//-------------------------------------------------------------------------------------------------
    const _Scene_File_prototype_create = Scene_File.prototype.create;
    Scene_File.prototype.create = function() {
        _Scene_File_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._listWindow, this._helpWindow],
            [param.windowSavefileListTween, param.windowHelpTween], "Save");
    };
    
    const _Scene_File_prototype_createListWindow = Scene_File.prototype.createListWindow;
	Scene_File.prototype.createListWindow = function() {
        _Scene_File_prototype_createListWindow.apply(this,arguments);
        if(param.windowSavefileListTween.enable){
		    //this._listWindow.setHandler("ok", this.setOnSavefileOk.bind(this));
            this._listWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
    };
    
    /*  技術的な問題によりセーブするときのトゥイーンを実装しない
	Scene_File.prototype.setOnSavefileOk = function() {
        ZinWindowTween.CloseTweens([this._listWindow, this._helpWindow],
            [param.windowSavefileListTween, param.windowHelpTween],
            this.onSavefileOk.bind(this));
	};*/

	Scene_File.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._listWindow, this._helpWindow],
            [param.windowSavefileListTween, param.windowHelpTween],
            this.popScene.bind(this), "Save");
    };
    
    
    //-------------------------------------------------------------------------------------------------
	//	Menu window - Game end
	//-------------------------------------------------------------------------------------------------
    const _Scene_GameEnd_prototype_create = Scene_GameEnd.prototype.create;
    Scene_GameEnd.prototype.create = function() {
        _Scene_GameEnd_prototype_create.apply(this,arguments);
        ZinWindowTween.OpenTweens(this, [this._commandWindow],
            [param.windowGameEndTween], "GameEnd");
    };
    
    const _Scene_GameEnd_prototype_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
	Scene_GameEnd.prototype.createCommandWindow = function() {
        _Scene_GameEnd_prototype_createCommandWindow.apply(this,arguments);
        if(param.windowGameEndTween.enable){
            this._commandWindow.setHandler("cancel", this.setPopScene.bind(this));
        }
	};

	Scene_GameEnd.prototype.setPopScene = function() {
        ZinWindowTween.CloseTweens(this, [this._commandWindow],
            [param.windowGameEndTween],
            this.popScene.bind(this), "GameEnd");
    };


    //-------------------------------------------------------------------------------------------------
	//	Title Window
	//-------------------------------------------------------------------------------------------------
    // Window_MapName >> Window_Command
    Window_TitleCommand.prototype.ztOpenTween = function() {
        ZinWindowTween.OpenTween(this,param.windowTitleCommandTween);
    };

    Window_TitleCommand.prototype.ztCloseTween = function() {
        ZinWindowTween.CloseTween(this,param.windowTitleCommandTween,param.windowTitleCommandTween.delay);
    };

    const _Scene_Title_prototype_createCommandWindow = Scene_Title.prototype.createCommandWindow;
	Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_prototype_createCommandWindow.apply(this,arguments);
        if(param.windowTitleCommandTween.enable){
            this._commandWindow.setHandler("newGame", this.setCommandNewGame.bind(this));
            this._commandWindow.setHandler("continue", this.setCommandContinue.bind(this));
            this._commandWindow.setHandler("options", this.setCommandOption.bind(this));
        }
	};

	Scene_Title.prototype.setCommandNewGame = function() {
		this._commandWindow.ztCloseTween();
		this._commandWindow.ztSetHandler(this.commandNewGame.bind(this));
    };

    Scene_Title.prototype.setCommandContinue = function() {
		this._commandWindow.ztCloseTween();
		this._commandWindow.ztSetHandler(this.commandContinue.bind(this));
    };

    Scene_Title.prototype.setCommandOption = function() {
		this._commandWindow.ztCloseTween();
		this._commandWindow.ztSetHandler(this.commandOptions.bind(this));
    };



})();