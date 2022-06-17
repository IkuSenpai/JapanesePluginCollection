//=============================================================================
// RPG Maker MZ - EquipMenuChangeEvent
//=============================================================================

// ----------------------------------------------------------------------------
// Copyright (c) 2021 ひち
// This software is released under the MIT License.
// ----------------------------------------------------------------------------
// Version
// 1.0.1 2021/12/29 英語版マニュアル追加（Passingbyposts様、ありがとうありがとう…）
// 1.0.0 2021/12/27 初版
// ----------------------------------------------------------------------------
// 作者もまだまだ手探り状態で作っているため、
// バグ報告などいただいても修正できるかどうかについては保証いたしかねます。
// それを承知の上、自己責任でご使用下さい。
// ----------------------------------------------------------------------------

/*:
 * @target MZ
 * @plugindesc A plugin that generates a simple event when changing equipment.
 * @author hichi
 * 
 * @help EquipMenuChangeEvent.js
 *
 * A simple event will occur when you try to change equipment.
 * It's a story that ends with fixing the equipment of the default function,
 * The point is that you can operate it until just before.
 * Made to create a special feeling of equipment.
 *
 * For example, a simple message is sent when attaching or detaching equipment, or changes are refused.
 * Operation of switches and variables, forced termination of menu screen,
 * Furthermore, you can also start a common event after the menu is forcibly terminated.
 * It may be possible to connect to a special event related to equipment.
 *
 * By the way, all of these operate from the equipment change screen of the menu
 * Only when the equipment is changed. (It does not occur when changing equipment at an event)
 * 
 * --------------------------------------------------------------------
 * Please attach a special tag to the memo field of the equipment item.
 *
 * Different types of tags can be used in combination,
 * Note that even if two or more tags of the same type are lined up, only the last set tag will be applied.
 * Do your best and make a one-line tag.
 *
 * Actor ID is specified as 0 and it targets everyone.
 * Since processing is performed in the set order, if 0 is specified at the end, only the specified character is special.
 * You can send a message and send a general-purpose message to other characters.
 *
 * If each argument has his Plugin Common Base of Triacontane God applied
 * Control characters such as variable references can be used as they are, maybe. (I'm not so confident)
 * 
 * ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
 * ・ About common specifications of each tag
 *
 * equipOn ... When new equipment is decided. It is not a candidate for the strongest equipment.
 * equipOff ... When you decide the part to change. It is not a candidate to remove all.
 * equipNull ... When the equipment is unequipped. It is not a candidate to remove all.
 * equipChange ... When the equipment is actually changed.
 *
 *: Add after the tag name. From here onwards are the parameters.
 *, Code for separating parameters.
 *; This is the code when one target has been specified. Used when specifying multiple targets.
 * ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
 * 
 * *** Refusal to attach / detach ***
 * <equipOnCancel:X1;X2; ...>
 * <equipOffCancel:X1;X2; ...>
 * <equipNullCancel:X1;X2; ...>
 * 
 * When the specified character tries to put on or take off the equipment with this tag, it will be rejected.
 * Specify the actor ID for X1 ~.
 * 
 * 
 * *** Simple message ***
 * <equipOnMessage: X1, message 1st line \ nmessage 2nd line; X2, message ...>
 * <equipOffMessage: X1, message 1st line \ nmessage 2nd line; X2, message ...>
 * <equipNullMessage: X1, message 1st line \ nmessage 2nd line; X2, message ...>
 * 
 * When the designated character tries to put on or take off the equipment with this tag,
 * A simple message is displayed regardless of whether the equipment has been changed or rejected.
 * For X1, specify the actor's ID.
 * After X1, it will be message data, and line breaks will be \ n.
 * Since it is simple, control characters such as events cannot be used.
 * In addition, usually only one page, up to 4 lines, cannot be written on more than 2 pages
 * 
 * 
 * *** Menu forced termination ***
 * <equipOnMenuEnd:X1,Y1;X2,Y2 ...>
 * <equipOffMenuEnd:X1,Y1;X2,Y2 ...>
 * <equipNullMenuEnd:X1,Y1;X2,Y2 ...>
 * 
 * When the designated character tries to put on or take off the equipment with this tag,
 * Kills the currently open menu screen.
 * If a simple message is also used, it will be processed first and then forcibly terminated.
 * For X1, specify the actor's ID.
 * For Y2, you can specify the common event that you want to fire after the menu ends, and you can omit it.
 * Only equipOffMenuEnd cannot be removed even if Cancel is not specified.
 * This is because the menu screen is forcibly terminated before going to the removal process, which is a specification.
 * 
 * 
 * *** Sound playback ***
 * <equipOnPlaySE:X1,Y1;X2,Y2 ...>
 * <equipOffPlaySE:X1,Y1;X2,Y2 ...>
 * <equipNullPlaySE:X1,Y1;X2,Y2 ...>
 * <equipOnPlayME:X1,Y1;X2,Y2 ...>
 * <equipOffPlayME:X1,Y1;X2,Y2 ...>
 * <equipNullPlayME:X1,Y1;X2,Y2 ...>
 * 
 * When the designated character tries to put on or take off the equipment with this tag,
 * Sounds a sound file (SE / ME).
 * If this tag is set, the original sound (kacha, boobu, etc.) will be
 * If the sounds are played at the same timing, the set sound has priority.
 * If you bite the message, the timing will be off, so the normal sound will also be played.
 * For X1, specify the actor's ID.
 * For Y1, specify the sound file name (no extension required).
 * 
 * 
 * *** Switch operation ***
 * <equipChangeSwitch:X1,Y1,Z1;X2,Y2,Z2 ...>
 * 
 *
 * When the specified character equips the equipment with this tag, the switch will be changed.
 * This tag is judged only when the equipment is actually changed.
 * For X1, specify the actor's ID.
 * Specify the switch number for Y1.
 * Z1 can specify what the switch should be, and can be omitted.
 * There are four types of character strings that can be specified: on off true false.
 * If omitted (blank), the value will be set according to the equipment status.
 * 
 * * *** Variable operation ***
 * <equipChangeVariable:X1,Y1,Z1;X2,Y2,Z2 ...>
 * 
 * When the specified character equips the equipment with this tag, the variable will be changed.
 * This tag is judged only when the equipment is actually changed.
 * For X1, specify the actor's ID.
 * Specify the variable number for Y1.
 * You can specify what value to put in the variable for Z1 and omit it.
 * If omitted (blank), it will be +1 if equipped and -1 if removed.
 * 
 * 
 * --------------------------------------------------------------------
 * ・Example of use
 * 
 * <equipNullCancel:0>
 * <equipNullMessage:0,This equipment cannot be removed.。>
 * 
 * It is prohibited to make it unequipped.
 * Equipment replacement is permitted as it is.
 * For example, if you enter this tag on all weapons,
 * All characters can be banned from having no weapons.
 * 
 * 
 * <equipOnMessage: 0, it's gone! \ n This is cursed equipment! >
 * <equipOnPlaySE: 0, Darkness5>
 * <equipOffMessage: 0, I can't remove the equipment with a curse! >
 * <equipOffPlaySE: 0, Paralyze3>
 * <equipOffCancel: 0>
 * 
 * This is an implementation example of cursed equipment such as a certain RPG.
 * Please dispel the curse at an event.
 * 
 * 
 * <equipOffCancel: 3>
 * <equipOffMessage: 3, I'm sorry. \ n This is my dad's keepsake ...>
 * 
 * When the character with actor ID 3 selects the slot of the equipment with this tag,
 * Refuses to display the equipment list window and displays a message.
 * 
 * 
 * <equipOnMessage: 2, this sword is really ... \ n Uh, it's a lie ...! !! !! >
 * <equipChangeSwitch: 2,5, true>
 * <equipOnMenuEnd: 2,3>
 * 
 * When the character with actor ID 2 wears the equipment with this tag
 * Display a message, turn on game switch 5 to her,
 * Starts common event 3 after forcibly terminating the menu screen.
 * It is possible to connect to an event that activates the moment you equip it.
 * 
 * --------------------------------------------------------------------
 * 
 * @param windowMenuMessageX
 * @text Window X coordinates
 * @desc Specify the X coordinate to start drawing the message window.
 * Screen width-(X value * 2) is the width of the window.
 * @type number
 * @default 20
 * @min 0
 * @max 999
 * 
 * @param windowMenuMessageY
 * @text Window Y coordinates
 * @desc Specify the Y coordinate to start drawing the message window.
 * The vertical width of the window will be the same as the window of the event.
 * @type number
 * @default 400
 * @min 0
 * @max 999
 */

/*:ja
 * @target MZ
 * @plugindesc 装備変更時に簡易イベントを発生させるプラグイン。
 * @author ひち
 * 
 * @help EquipMenuChangeEvent.js
 *
 * 装備変更しようとした時に簡単なイベントを発生させるよ。
 * デフォ機能の装備固定で終わる話なんだけど、
 * あえて直前まで操作できちゃうのがポイント。
 * 特別な装備感を演出するために作りました。
 * 
 * 例えば装備の着脱時に簡単なメッセージを出すとか、変更を拒否してくるとか。
 * スイッチ・変数の操作やメニュー画面の強制終了、
 * さらにはメニュー強制終了後のコモンイベント起動もできるから、
 * 装備に関わる特別なイベントに繋げる事もできるかも。
 * 
 * ちなみにこれらが作動するのは全てメニューの装備変更画面から
 * 装備を変更した時のみです。(イベントでの装備変更では発生しません)
 * 
 * --------------------------------------------------------------------
 * 装備アイテムのメモ欄に専用タグを付けて使ってね。
 * 
 * 別の種類のタグは組み合わせて使えるけど、
 * 同じ種類のタグは2つ以上並べても最後に設定したタグしか適用されないから注意。
 * 頑張ってなっが～～～～～い1行タグを作ってね。
 * 
 * アクターのIDは 0 指定で全員を対象とするよ。
 * 設定した順番に処理するから、最後に 0 を指定すれば指定キャラだけ特別な
 * メッセージを出して、それ以外のキャラは汎用メッセージなんてのもできるよ。
 * 
 * 各引数にはトリアコンタン神の PluginCommonBase が適用されている場合、
 * 変数参照とかの制御文字はそのまま使えるよ、たぶんね。（あんまり自信ない）
 * 
 * ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
 * ・各タグの共通仕様について
 * 
 * equipOn...      新しい装備を決定した時。　最強装備の候補から外れる。
 * equipOff...     変更する部位を決めた時。　全て外すの候補から外れる。
 * equipNull...    装備を無装備状態にした時。　全て外すの候補から外れる。
 * equipChange...  装備が実際に変更された時。
 * 
 *  :  タグ名の後ろに付けます。ここから後がパラメーターとなります。
 *  ,  パラメーターを区切るためのコードです。
 *  ;  ひとつの対象を指定し終えた際のコードです。複数の対象指定時に使用します。
 * ～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～
 * 
 * ＊＊＊ 着脱拒否 ＊＊＊
 * <equipOnCancel:X1;X2; ...>
 * <equipOffCancel:X1;X2; ...>
 * <equipNullCancel:X1;X2; ...>
 * 
 * 指定キャラがこのタグのついている装備品を着脱しようとした時、拒否します。
 * X1～ にはアクターのIDを指定します。
 * 
 * 
 * ＊＊＊ 簡易メッセージ ＊＊＊
 * <equipOnMessage:X1,メッセージ1行目\nメッセージ2行目;X2,メッセージ ...>
 * <equipOffMessage:X1,メッセージ1行目\nメッセージ2行目;X2,メッセージ ...>
 * <equipNullMessage:X1,メッセージ1行目\nメッセージ2行目;X2,メッセージ ...>
 * 
 * 指定キャラがこのタグのついている装備品を着脱しようとした時、
 * 装備変更した・拒否したに関わらず簡易メッセージを表示します。
 * X1 にはアクターのIDを指定します。
 * X1, 以降はメッセージデータとなり、改行は\nとなります。
 * あくまで簡易なので、イベントのような制御文字は使えません。
 * また、通常1ページのみの4行までで、2ページ以上の文章はできません。
 * 
 * 
 * ＊＊＊ メニュー強制終了 ＊＊＊
 * <equipOnMenuEnd:X1,Y1;X2,Y2 ...>
 * <equipOffMenuEnd:X1,Y1;X2,Y2 ...>
 * <equipNullMenuEnd:X1,Y1;X2,Y2 ...>
 * 
 * 指定キャラがこのタグのついている装備品を着脱しようとした時、
 * 現在開かれているメニュー画面を強制終了します。
 * 簡易メッセージが併用されている場合、先に処理してから強制終了します。
 * X1 にはアクターのIDを指定します。
 * Y2 にはメニュー終了後に起動したいコモンイベントを指定でき、省略も可能です。
 * equipOffMenuEnd のみ、Cancel の指定がなくても装備が外せなくなります。
 * これは外す工程に行くまでにメニュー画面が強制終了するためであり、仕様です。
 * 
 * 
 * ＊＊＊ サウンド再生 ＊＊＊
 * <equipOnPlaySE:X1,Y1;X2,Y2 ...>
 * <equipOffPlaySE:X1,Y1;X2,Y2 ...>
 * <equipNullPlaySE:X1,Y1;X2,Y2 ...>
 * <equipOnPlayME:X1,Y1;X2,Y2 ...>
 * <equipOffPlayME:X1,Y1;X2,Y2 ...>
 * <equipNullPlayME:X1,Y1;X2,Y2 ...>
 * 
 * 指定キャラがこのタグのついている装備品を着脱しようとした時、
 * サウンドファイル（ SE / ME ）を鳴らします。
 * このタグが設定されている場合、本来の音（カチャ、ブッブーなど）は
 * 同タイミングで鳴る場合においては設定された音が優先されます。
 * メッセージをかませた場合はタイミングがずれるため、通常の音も再生されます。
 * X1 にはアクターのIDを指定します。
 * Y1 にはサウンドファイル名（拡張子不要）を指定します。
 * 
 * 
 * ＊＊＊ スイッチ操作 ＊＊＊
 * <equipChangeSwitch:X1,Y1,Z1;X2,Y2,Z2 ...>
 * 
 * 指定キャラがこのタグのついている装備品を装備した時、スイッチを変更します。
 * このタグは実際に装備変更があった時のみ判定します。
 * X1 にはアクターのIDを指定します。
 * Y1 にはスイッチの番号を指定します。
 * Z1 にはスイッチをどのようにするかを指定でき、省略も可能です。
 * 指定できる文字列は  on  off  true  false  の4種類です。
 * 省略(空欄)した場合、装備状態に応じた値が設定されます。
 * 
 * 
 * ＊＊＊ 変数操作 ＊＊＊
 * <equipChangeVariable:X1,Y1,Z1;X2,Y2,Z2 ...>
 * 
 * 指定キャラがこのタグのついている装備品を装備した時、変数を変更します。
 * このタグは実際に装備変更があった時のみ判定します。
 * X1 にはアクターのIDを指定します。
 * Y1 には変数の番号を指定します。
 * Z1 には変数にどのような値を入れるか指定でき、省略も可能です。
 * 省略(空欄)した場合、装備した場合は +1 、外した場合は -1 します。
 * 
 * 
 * --------------------------------------------------------------------
 * ・使用例
 * 
 * <equipNullCancel:0>
 * <equipNullMessage:0,この装備を外す事はできません。>
 * 
 * 無装備状態にする事を禁止します。
 * 装備の入れ替えはそのまま許可します。
 * 例えばこのタグを全ての武器に記入すれば、
 * 全てのキャラで武器なし状態を禁止させる事ができます。
 * 
 * 
 * <equipOnMessage:0,しまった！\nこれは呪われた装備だ！>
 * <equipOnPlaySE:0,Darkness5>
 * <equipOffMessage:0,呪いで装備を外す事ができない！>
 * <equipOffPlaySE:0,Paralyze3>
 * <equipOffCancel:0>
 * 
 * 某RPGのような、呪われた装備の実装例です。
 * 解呪はイベントなどで行って下さい。
 * 
 * 
 * <equipOffCancel:3>
 * <equipOffMessage:3,ごめん。\nこれはお父さんの形見だから・・・>
 * 
 * アクターID 3 番のキャラがこのタグが付いている装備のスロットを選択すると、
 * 装備一覧ウインドウを出す事自体を拒否してメッセージを表示します。
 * 
 * 
 * <equipOnMessage:2,こ、この剣はまさか・・・\nう、嘘だ・・・！！！>
 * <equipChangeSwitch:2,5,true>
 * <equipOnMenuEnd:2,3>
 * 
 * アクターID 2 番のキャラがこのタグが付いている装備を装着すると
 * メッセージを表示し、ゲームスイッチ 5 番を ON にし、
 * メニュー画面を強制終了させた後にコモンイベント3を起動します。
 * 装備した瞬間に発動するイベントなどに繋げる事が可能です。
 * 
 * --------------------------------------------------------------------
 * 
 * @param windowMenuMessageX
 * @text ウインドウX座標
 * @desc メッセージウインドウの描画開始X座標を指定します。
 * 画面横幅 - (X値 * 2) がウインドウの横幅となります。
 * @type number
 * @default 20
 * @min 0
 * @max 999
 * 
 * @param windowMenuMessageY
 * @text ウインドウY座標
 * @desc メッセージウインドウの描画開始Y座標を指定します。
 * ウインドウの縦幅は、イベントのウインドウと同じ大きさになります。
 * @type number
 * @default 400
 * @min 0
 * @max 999
 */

(() => {
	'use strict';
	const pluginName = "EquipMenuChangeEvent";
	let enumtop;

	const WINDOW_MENUMESSAGE_INSPACE_X = 4;
	const WINDOW_MENUMESSAGE_INSPACE_Y = 4;
	const WINDOW_MENUMESSAGE_OUTSPACE_X = Number(PluginManager.parameters(pluginName).windowMenuMessageX);
	const WINDOW_MENUMESSAGE_OUTSPACE_Y = Number(PluginManager.parameters(pluginName).windowMenuMessageY);

    // 簡易イベントの種類
    enumtop = 0;
    const equipEventCommand = {
        ON_CANCEL: enumtop++,
        NULL_CANCEL: enumtop++,
        OFF_CANCEL: enumtop++,
		ON_MESSAGE: enumtop++,
        NULL_MESSAGE: enumtop++,
        OFF_MESSAGE: enumtop++,
        ON_MENUEND: enumtop++,
        NULL_MENUEND: enumtop++,
        OFF_MENUEND: enumtop++,
        ON_PLAYSE: enumtop++,
        NULL_PLAYSE: enumtop++,
        OFF_PLAYSE: enumtop++,
        ON_PLAYME: enumtop++,
        NULL_PLAYME: enumtop++,
        OFF_PLAYME: enumtop++,
		CHANGE_SWITCH: enumtop++,
		CHANGE_VARIABLE: enumtop++,
		CHANGE_PLAYSE: enumtop++,
		CHANGE_PLAYME: enumtop++,
	};
    const equipEventCommand_TagName = [
		"equipOnCancel",
		"equipNullCancel",
		"equipOffCancel",
		"equipOnMessage",
		"equipNullMessage",
		"equipOffMessage",
		"equipOnMenuEnd",
		"equipNullMenuEnd",
		"equipOffMenuEnd",
		"equipOnPlaySE",
		"equipNullPlaySE",
		"equipOffPlaySE",
		"equipOnPlayME",
		"equipNullPlayME",
		"equipOffPlayME",
		"equipChangeSwitch",
		"equipChangeVariable",
		"equipChangePlaySE",
		"equipChangePlayME",
	];
	enumtop = 0;
    const equipEventCommand_TagCheck = {
        EQUIP_OFF: enumtop++,
        EQUIP_NULL: enumtop++,
        EQUIP_ON: enumtop++,
	};

    let equip_MenuEventParam;
    let equip_MenuEventSetSwitch;
    let equip_MenuEventSetValue;
	let equip_MenuEventCommonEvent;

    let equip_MenuMessage;
    let equip_MenuMessageNext;
	let equip_MenuEndReserve;
	let equip_NowMenu = false;
	let equip_NewEquipSound = false;

	let isEquipChangeOk_IsEquipOptimize = false;
	let isEquipChangeOk_IsEquipClear = false;

	function setparamEquipMetadate(equip_item) {
		// プラグイン内のローカル変数に対象の装備品メタデータを展開して準備する
		if(!equip_item) return false;
		const meta = equip_item.meta;
		equip_MenuEventParam = [];
		equip_MenuEventSetSwitch = false;
		equip_MenuEventSetValue = void 0;

		equipEventCommand_TagName.forEach((tagname, index) => {
			if(meta[tagname]){
				// タグを発見
				const meta_text = typeof PluginManagerEx !== 'undefined' ?
									PluginManagerEx.findMetaValue(equip_item, tagname) : meta[tagname];
				const meta_command = index; // コマンドIDはenumで連番指定しているので、ヒットした順をそのまま代入
				const eqparam_array = String(meta_text).split(";");

				// メタデータを展開
				switch (meta_command) {
				case equipEventCommand.ON_CANCEL: 		// 装備拒否
				case equipEventCommand.NULL_CANCEL: 	// 装備解除拒否
				case equipEventCommand.OFF_CANCEL: 		// 装備スロット選択拒否
					// 判定に使うアクターIDのみ
					eqparam_array.forEach(item => {
						equip_MenuEventParam.push({commandId: meta_command, actorId: parseInt(item)});
					});
					break;
				case equipEventCommand.ON_MENUEND: 		// 装備時メニュー画面強制終了
				case equipEventCommand.NULL_MENUEND: 	// 装備解除時メニュー画面強制終了
				case equipEventCommand.OFF_MENUEND: 	// 装備スロット選択時メニュー画面強制終了
					// 判定に使うアクターIDと、メニュー終了後に起動するコモンイベントIDを展開
					eqparam_array.forEach(item => {
						const eqdata_array = item.split(",");
						const setcommon = eqdata_array.length >= 2 ? parseInt(eqdata_array[1]) : 0;
						equip_MenuEventParam.push({commandId: meta_command,
							actorId: parseInt(eqdata_array[0]), commonEvent: setcommon, });
					});
					break;
				case equipEventCommand.ON_MESSAGE: 		// 装備時メッセージ
				case equipEventCommand.NULL_MESSAGE: 	// 装備解除時メッセージ
				case equipEventCommand.OFF_MESSAGE: 	// 装備スロット選択時メッセージ
					// 判定に使うアクターIDとメッセージデータを展開
					eqparam_array.forEach(item => {
						const eqtext_array = item.split(",");
						equip_MenuEventParam.push({commandId: meta_command,
							actorId: parseInt(eqtext_array[0]), equipMessage: eqtext_array[1]});
					});
					break;
				case equipEventCommand.ON_PLAYSE: 		// 装備時、SEを鳴らす
				case equipEventCommand.NULL_PLAYSE: 	// 装備解除時、SEを鳴らす
				case equipEventCommand.OFF_PLAYSE: 		// 装備スロット選択時、SEを鳴らす
				case equipEventCommand.CHANGE_PLAYSE: 	// 装備変更時、SEを鳴らす
					// 判定に使うアクターIDとサウンドファイル名を展開
					eqparam_array.forEach(item => {
						const eqtext_array = item.split(",");
						equip_MenuEventParam.push({commandId: meta_command,
							actorId: parseInt(eqtext_array[0]), equipSE: eqtext_array[1]});
					});
					break;
				case equipEventCommand.ON_PLAYME: 		// 装備時、MEを鳴らす
				case equipEventCommand.NULL_PLAYME: 	// 装備解除時、MEを鳴らす
				case equipEventCommand.OFF_PLAYME: 		// 装備スロット選択時、MEを鳴らす
				case equipEventCommand.CHANGE_PLAYME: 	// 装備変更時、MEを鳴らす
					// 判定に使うアクターIDとサウンドファイル名を展開
					eqparam_array.forEach(item => {
						const eqtext_array = item.split(",");
						equip_MenuEventParam.push({commandId: meta_command,
							actorId: parseInt(eqtext_array[0]), equipME: eqtext_array[1]});
					});
					break;
				case equipEventCommand.CHANGE_SWITCH: 	// 装備変更時、スイッチを変更
				case equipEventCommand.CHANGE_VARIABLE: // 装備変更時、変数を変更
					// 判定に使うアクターIDとスイッチ・変数操作に関する情報を展開
					eqparam_array.forEach(item => {
						const eqdata_array = item.split(",");
						if(eqdata_array.length >= 1){
							const settext = eqdata_array.length >= 3 ? eqdata_array[2] : "";
							if(meta_command === equipEventCommand.CHANGE_SWITCH){
								// スイッチ
								const lowtext = settext.toLowerCase();
								const setval = ((lowtext === "true") || (lowtext === "on")) ? true :
												((lowtext === "false") || (lowtext === "off") ? false : void 0);
								equip_MenuEventParam.push({commandId: meta_command,
									actorId: parseInt(eqdata_array[0]),
									setNumber: parseInt(eqdata_array[1]),
									setValue: setval,
								});
							}
							else{
								// 変数
								const setval = settext === "" ? void 0 :
												(!Number.isNaN(parseInt(settext)) ? parseInt(settext) : settext);
								equip_MenuEventParam.push({commandId: meta_command,
									actorId: parseInt(eqdata_array[0]),
									setNumber: parseInt(eqdata_array[1]),
									setValue: setval,
								});
							}
						}
					});
					break;
				}
			}
		});

		return equip_MenuEventParam.length > 0;
	}

	function judgeEquipMetadate(command_id, actor_id) {
		// 装備品メタデータが条件に当てはまるかを調べ、適切な処理を返却する
		for(let i = 0; i < equip_MenuEventParam.length; i++){
			const param = equip_MenuEventParam[i];
			if(param.commandId !== command_id) continue;

			let actor_hit = false;
			if((param.actorId === 0) || (param.actorId === actor_id)){
				// 対象が一致
				actor_hit = true;
			}

			switch (command_id) {
			case equipEventCommand.ON_CANCEL: 		// 装備拒否
			case equipEventCommand.NULL_CANCEL: 	// 装備解除拒否
			case equipEventCommand.OFF_CANCEL: 		// 装備スロット選択拒否
			case equipEventCommand.ON_MENUEND: 		// 装備時メニュー画面強制終了
			case equipEventCommand.NULL_MENUEND: 	// 装備解除時メニュー画面強制終了
			case equipEventCommand.OFF_MENUEND: 	// 装備スロット選択時メニュー画面強制終了
				if(actor_hit){
					// アクターIDが一致していれば true 判定とする
					switch (command_id) {
					case equipEventCommand.ON_MENUEND:
					case equipEventCommand.NULL_MENUEND:
					case equipEventCommand.OFF_MENUEND:
						// メニュー強制終了時は、コモンイベントに引き継ぐかどうかをここで調べておく
						equip_MenuEventCommonEvent = param.commonEvent;
						break;
					}
					return true;
				}
				break;
			case equipEventCommand.ON_MESSAGE: 		// 装備時メッセージ
			case equipEventCommand.NULL_MESSAGE: 	// 装備解除時メッセージ
			case equipEventCommand.OFF_MESSAGE: 	// 装備スロット選択時メッセージ
				if(actor_hit){
					// メッセージを返却
					return param.equipMessage;
				}
				break;
			case equipEventCommand.ON_PLAYSE: 		// 装備時、SEを鳴らす
			case equipEventCommand.NULL_PLAYSE: 	// 装備解除時、SEを鳴らす
			case equipEventCommand.OFF_PLAYSE: 		// 装備スロット選択時、SEを鳴らす
			case equipEventCommand.CHANGE_PLAYSE: 	// 装備変更時、SEを鳴らす
				if(actor_hit){
					// サウンドファイル名を返却
					return param.equipSE;
				}
				break;
			case equipEventCommand.ON_PLAYME: 		// 装備時、MEを鳴らす
			case equipEventCommand.NULL_PLAYME: 	// 装備解除時、MEを鳴らす
			case equipEventCommand.OFF_PLAYME: 		// 装備スロット選択時、MEを鳴らす
			case equipEventCommand.CHANGE_PLAYME: 	// 装備変更時、MEを鳴らす
				if(actor_hit){
					// サウンドファイル名を返却
					return param.equipME;
				}
				break;
			case equipEventCommand.CHANGE_SWITCH: 	// スイッチを変更
			case equipEventCommand.CHANGE_VARIABLE: // 変数を変更
				if(actor_hit){
					// 変更すべきスイッチ、変数番号を返却する
					if(command_id === equipEventCommand.CHANGE_SWITCH) equip_MenuEventSetSwitch = param.setValue;
					if(command_id === equipEventCommand.CHANGE_VARIABLE) equip_MenuEventSetValue = param.setValue;
					return param.setNumber;
				}
				break;
			}
		}

		return false;
	}

	function playEquipSound(soundname, isme) {
		// 装着音の変更（カチャッのあれ）
		if(isme){
			// ME再生
			AudioManager.playMe({name: soundname, volume: 90, pitch: 100, pan: 0});
		}
		else{
			// SE再生
			AudioManager.playSe({name: soundname, volume: 90, pitch: 100, pan: 0});
		}
		equip_NewEquipSound = true;
	}

    //-----------------------------------------------------------------------------
    // SoundManager オーバーライド
    //
    // 特別な音を鳴らす時、このプラグインで関係する各種SEを一時的に封印する
	//-----------------------------------------------------------------------------
    const _SoundManager_playEquip = SoundManager.playEquip;
	SoundManager.playEquip = function() {
		if(equip_NewEquipSound) return;
		_SoundManager_playEquip.call(this);
	};
	const _SoundManager_playOk = SoundManager.playOk;
	SoundManager.playOk = function() {
		if(equip_NewEquipSound) return;
		_SoundManager_playOk.call(this);
	};
	const _SoundManager_playBuzzer = SoundManager.playBuzzer;
	SoundManager.playBuzzer = function() {
		if(equip_NewEquipSound) return;
		_SoundManager_playBuzzer.call(this);
	};


    //-----------------------------------------------------------------------------
    // Scene_Equip 追加定義
    //
    // 装備品選択後、装備時をトリガーとするタグが設定されていないかチェック
    //-----------------------------------------------------------------------------
	Scene_Equip.prototype.equipChangeTagCheck = function(check_equip, checktype) {
		const tagcheck_list = [
			{	// equipEventCommand_TagCheck.EQUIP_OFF
				BACK_SCENE: _Scene_Equip_hideItemWindow,
				NEXT_SCENE: _Scene_Equip_onSlotCheck_equipLast,
				COMMAND_CANCEL: equipEventCommand.OFF_CANCEL,
				COMMAND_MESSAGE: equipEventCommand.OFF_MESSAGE,
				COMMAND_MENUEND: equipEventCommand.OFF_MENUEND,
				COMMAND_PLAYSE: equipEventCommand.OFF_PLAYSE,
				COMMAND_PLAYME: equipEventCommand.OFF_PLAYME,

			},{ // equipEventCommand_TagCheck.EQUIP_NULL
				BACK_SCENE: _Scene_Equip_onSlotBack,
				NEXT_SCENE: _Scene_Equip_onItemCheck_equipOn,
				COMMAND_CANCEL: equipEventCommand.NULL_CANCEL,
				COMMAND_MESSAGE: equipEventCommand.NULL_MESSAGE,
				COMMAND_MENUEND: equipEventCommand.NULL_MENUEND,
				COMMAND_PLAYSE: equipEventCommand.NULL_PLAYSE,
				COMMAND_PLAYME: equipEventCommand.NULL_PLAYME,

			},{ // equipEventCommand_TagCheck.EQUIP_ON
				BACK_SCENE: _Scene_Equip_onSlotBack,
				NEXT_SCENE: _Scene_Equip_onItemCheck_equipLast,
				COMMAND_CANCEL: equipEventCommand.ON_CANCEL,
				COMMAND_MESSAGE: equipEventCommand.ON_MESSAGE,
				COMMAND_MENUEND: equipEventCommand.ON_MENUEND,
				COMMAND_PLAYSE: equipEventCommand.ON_PLAYSE,
				COMMAND_PLAYME: equipEventCommand.ON_PLAYME,

			},
		];

		const backscene = tagcheck_list[checktype].BACK_SCENE;
		const nextscene = tagcheck_list[checktype].NEXT_SCENE;
		let target_equip = check_equip;
		let equipjudge;
		if(checktype === equipEventCommand_TagCheck.EQUIP_NULL){
			// 装備なし状態に移行したかを判定する場合
			equipjudge = target_equip === null;
			target_equip = this._slotWindow.item();
		}
		else{
			equipjudge = target_equip;
		}

		if(equipjudge){
			// 判定用メタデータの準備
			if(setparamEquipMetadate(target_equip)){
				const cmd_cancel = tagcheck_list[checktype].COMMAND_CANCEL;
				const cmd_message = tagcheck_list[checktype].COMMAND_MESSAGE;
				const cmd_menuend = tagcheck_list[checktype].COMMAND_MENUEND;
				const cmd_playse = tagcheck_list[checktype].COMMAND_PLAYSE;
				const cmd_playme = tagcheck_list[checktype].COMMAND_PLAYME;
				let meta_hit = false;
				const actor_id = this.actor().actorId();

				// メニュー画面を強制終了するかどうか
				if(judgeEquipMetadate(cmd_menuend, actor_id)){
					// メニュー画面を強制終了するフラグを立てる（メッセージイベントが残ってるならそっちを先に処理する）
					equip_MenuEndReserve = true;
				}

				const sename = judgeEquipMetadate(cmd_playse, actor_id);
				const mename = judgeEquipMetadate(cmd_playme, actor_id);
				if(sename) playEquipSound(sename, false); // SEを鳴らす
				if(mename) playEquipSound(mename, true); // MEを鳴らす

				// 装備を拒否するかどうか
				if(judgeEquipMetadate(cmd_cancel, actor_id)){
					// 装備の拒否
					if(equip_NewEquipSound === false) SoundManager.playBuzzer();
					equip_MenuMessageNext = backscene;
					meta_hit = true;
				}
				else{
					// 通常処理
					equip_MenuMessageNext = nextscene;
				}

				// 簡易メッセージがあるなら表示させる
				equip_MenuMessage = judgeEquipMetadate(cmd_message, actor_id);
				if(equip_MenuMessage){
					// 装備時のメッセージ
					this.equipWindow_popupMessage();
					if(meta_hit === false){
						if(equip_NewEquipSound === false) SoundManager.playOk();
						meta_hit = true;
					}
					return true;
				}
				else{
					// メッセージがない場合
					if(meta_hit){
						// 何かしらのタグが動作した場合、ハンドラを設定する
						equip_MenuMessageNext.call(this);
						return true;
					}
				}
			}
		}

		// ここまできた場合（例えばアイテム情報がnullだったり、タグがなかったりした場合）は、次の状態へ移行する
		return false;
	};

    //-----------------------------------------------------------------------------
    // Scene_Equip 追加定義
    //
    // 装備拒否時の遷移先を追加定義（これがないと毎回カーソル位置が先頭に戻る）
    //-----------------------------------------------------------------------------
	Scene_Equip.prototype.onSlotBack = function() {
		// 装備拒否時に装備アイテム選択状態へ戻る
		this._slotWindow.hide();
		this._itemWindow.show();
		this._itemWindow.activate();
	};
	const _Scene_Equip_onSlotBack = Scene_Equip.prototype.onSlotBack;

    //-----------------------------------------------------------------------------
    // Scene_Equip 追加定義
    //
    // メニュー強制終了する際の遷移先を追加定義
    //-----------------------------------------------------------------------------
	Scene_Equip.prototype.onMenuEnd = function() {
		// 終了前にコモンイベントに引き継ぐ指定がある場合はそれをセットしておく
		if(equip_MenuEventCommonEvent > 0){
			$gameTemp.reserveCommonEvent(equip_MenuEventCommonEvent);
			equip_MenuEventCommonEvent = 0;
		}

		// メニューにスタックされているシーンをすべて戻す事でメニュー終了を実現
		const stack_length = SceneManager.getPushSceneStack();
		for(let i = 0; i < stack_length; i++){
			this.popScene();
		}

		// (※ これ SceneManager.goto(Scene_Map) と、どっちがいいんかな？)

	};
	const _Scene_Equip_onMenuEnd = Scene_Equip.prototype.onMenuEnd;

    //-----------------------------------------------------------------------------
    // SceneManager 追加定義
    //
    // push で追加されたシーンのスタック数を返却する
    //-----------------------------------------------------------------------------
    SceneManager.getPushSceneStack = function () {
		return this._stack.length;
    };

    //-----------------------------------------------------------------------------
    // Scene_Equip オーバーライド
    //
    // 装備スロットから選ぶ際の処理に変更拒否や簡易メッセージなどのイベントを追加
    //-----------------------------------------------------------------------------
	const _Scene_Equip_hideItemWindow = Scene_Equip.prototype.hideItemWindow;
	const _Scene_Equip_onSlotOk = Scene_Equip.prototype.onSlotOk;
	Scene_Equip.prototype.onSlotOk = function() {
		this.onSlotCheck_equipOff();
	};
	Scene_Equip.prototype.onSlotCheck_equipOff = function() {
		// 段階１：タグチェック（外す部位の選択）
		if(this.equipChangeTagCheck(this._slotWindow.item(), equipEventCommand_TagCheck.EQUIP_OFF)) return;

		// 装備またはメタデータが無かったので最終工程へと移行する
		this.onSlotCheck_equipLast();
	};
	Scene_Equip.prototype.onSlotCheck_equipLast = function() {
		// 段階２：部位選択後の強制終了判定

		// メニュー画面強制終了予約が入っている場合はこのタイミングでシーンを移行させる
		if(equip_MenuEndReserve){
			equip_MenuEndReserve = false;
			equip_NewEquipSound = false;
			this.onMenuEnd();
		}
		else{
			// 通常処理に戻す
			SoundManager.playOk();
			_Scene_Equip_onSlotOk.call(this);
			equip_NewEquipSound = false;
		}
	};
	const _Scene_Equip_onSlotCheck_equipLast = Scene_Equip.prototype.onSlotCheck_equipLast;

    //-----------------------------------------------------------------------------
    // Scene_Equip オーバーライド
    //
    // 新しく装備する装備品を選ぶ際の処理に変更拒否や簡易メッセージなどのイベントを追加
    //-----------------------------------------------------------------------------
	const _Scene_Equip_onItemOk = Scene_Equip.prototype.onItemOk;
	Scene_Equip.prototype.onItemOk = function() {
		this.onItemCheck_equipNull();
	};
	Scene_Equip.prototype.onItemCheck_equipNull = function() {
		// 段階１：タグチェック（無装備状態チェック）
		if(this.equipChangeTagCheck(this._itemWindow.item(), equipEventCommand_TagCheck.EQUIP_NULL)) return;

		// 無装備状態への移行は確認されなかったので装着チェックへと移行する
		this.onItemCheck_equipOn();
	};
	Scene_Equip.prototype.onItemCheck_equipOn = function() {
		// 段階２：タグチェック（装着チェック）
		if(this.equipChangeTagCheck(this._itemWindow.item(), equipEventCommand_TagCheck.EQUIP_ON)) return;

		// 装備またはメタデータが無かったので最終工程へと移行する
		this.onItemCheck_equipLast();
	};
	const _Scene_Equip_onItemCheck_equipOn = Scene_Equip.prototype.onItemCheck_equipOn;
	Scene_Equip.prototype.onItemCheck_equipLast = function() {
		// 段階３：装着後の強制終了判定
		
		// 実際の装着処理を走らせる
		equip_NowMenu = true;
		_Scene_Equip_onItemOk.call(this);
		equip_NowMenu = false;

		equip_NewEquipSound = false;

		// メニュー画面強制終了予約が入っている場合はこのタイミングでシーンを移行させる
		if(equip_MenuEndReserve){
			equip_MenuEndReserve = false;
			this.onMenuEnd();
		}
	};
	const _Scene_Equip_onItemCheck_equipLast = Scene_Equip.prototype.onItemCheck_equipLast;

	
    //-----------------------------------------------------------------------------
    // Scene_Equip 追加定義
    //
    // 簡易メッセージウインドウ関連の処理を追加
    //-----------------------------------------------------------------------------
	Scene_Equip.prototype.equipWindow_popupMessage = function() {
		// 簡易メッセージウインドウの呼び出し
		this.createMenuMessageWindow();
		this.refreshActor();
	};
	Scene_Equip.prototype.equipWindow_closeMessage = function() {
		// 簡易メッセージウインドウの終了処理
		if(this._menuMessageWindow.isOpen()){
			this._menuMessageWindow.close();
			this._menuMessageWindow.deactivate();
			this._menuMessageWindow = void 0;
		}
	};
	Scene_Equip.prototype.onMessageOk = function() {
		// 簡易メッセージイベント終了後の処理とハンドラ設定
		equip_NewEquipSound = false;
		this.equipWindow_closeMessage();
		if(equip_MenuMessageNext === _Scene_Equip_onItemOk) equip_NowMenu = true;
		equip_MenuMessageNext.call(this);
		if(equip_NowMenu) equip_NowMenu = false;
	};
	Scene_Equip.prototype.menuMessageWindowRect = function() {
		// 簡易メッセージウインドウの矩形情報を構築
		const ww = Graphics.boxWidth - (WINDOW_MENUMESSAGE_OUTSPACE_X * 2);
		const wh = this.calcWindowHeight(WINDOW_MENUMESSAGE_INSPACE_Y, false) + (WINDOW_MENUMESSAGE_INSPACE_Y * 2);
		const wx = (Graphics.boxWidth - ww) / 2;
		const wy = WINDOW_MENUMESSAGE_OUTSPACE_Y;
		return new Rectangle(wx, wy, ww, wh);
	};
	Scene_Equip.prototype.createMenuMessageWindow = function() {
		// 簡易メッセージウインドウを生成
		const rect = this.menuMessageWindowRect();
		const actor = this.actor();
		this._menuMessageWindow = new Window_MenuMessage(rect);
		//this._menuMessageWindow.setActor(actor);
		this._menuMessageWindow.setHandler("ok", this.onMessageOk.bind(this));
		//this._menuMessageWindow.setHandler("cancel", this.onMessageOk.bind(this));
		this.addWindow(this._menuMessageWindow);
	};

    //-----------------------------------------------------------------------------
    // Scene_Equip オーバーライド
    //
    // メニュー画面中は装備品に着脱不可なタグがついていないか判定する
    //-----------------------------------------------------------------------------
	const _Scene_Equip_commandOptimize = Scene_Equip.prototype.commandOptimize;
	Scene_Equip.prototype.commandOptimize = function() {
		// 最強装備
		equip_NowMenu = true;

		_Scene_Equip_commandOptimize.call(this);

		equip_NowMenu = false;
	};
	const _Scene_Equip_commandClear = Scene_Equip.prototype.commandClear;
	Scene_Equip.prototype.commandClear = function() {
		// 全て外す
		equip_NowMenu = true;

		_Scene_Equip_commandClear.call(this);

		equip_NowMenu = false;
	};

    //-----------------------------------------------------------------------------
    // Game_Actor オーバーライド
    //
    // メニュー画面中である事を判定するための苦し紛れの処理（良い方法が浮かばなかったのです）
    //-----------------------------------------------------------------------------
	const _Game_Actor_optimizeEquipments = Game_Actor.prototype.optimizeEquipments;
	Game_Actor.prototype.optimizeEquipments = function() {
		if(equip_NowMenu) isEquipChangeOk_IsEquipOptimize = true;

		_Game_Actor_optimizeEquipments.call(this);

		if(equip_NowMenu) isEquipChangeOk_IsEquipOptimize = false;
	};
	const _Game_Actor_clearEquipments = Game_Actor.prototype.clearEquipments;
	Game_Actor.prototype.clearEquipments = function() {
		if(equip_NowMenu) isEquipChangeOk_IsEquipClear = true;
		
		_Game_Actor_clearEquipments.call(this);

		if(equip_NowMenu) isEquipChangeOk_IsEquipClear = false;
	};

    //-----------------------------------------------------------------------------
    // Game_Actor オーバーライド
    //
    // メニュー画面中は装備品に着脱不可なタグがついていないか判定する
    //-----------------------------------------------------------------------------
	const _Game_Actor_isEquipChangeOk = Game_Actor.prototype.isEquipChangeOk;
	Game_Actor.prototype.isEquipChangeOk = function(slotId) {
		let retflag = true;
		
		if(isEquipChangeOk_IsEquipClear || isEquipChangeOk_IsEquipOptimize){
			const nowequip = this.equips()[slotId];
			if(setparamEquipMetadate(nowequip)){
				// メニュー画面中でなおかつメタタグが存在している場合の処理
				const cmdarray = [
					equipEventCommand.NULL_CANCEL,
					equipEventCommand.NULL_MESSAGE,
					equipEventCommand.NULL_MENUEND,
					equipEventCommand.OFF_CANCEL,
					equipEventCommand.OFF_MESSAGE,
					equipEventCommand.OFF_MENUEND,
				];
				const actor_id = this.actorId();
				for(let i = 0; i < cmdarray.length; i++){
					if(judgeEquipMetadate(cmdarray[i], actor_id) !== false){
						// 着脱不可とするタグを発見
						retflag = false;
						break;
					}
				}
			}
		}
		return _Game_Actor_isEquipChangeOk.call(this, slotId) && retflag;
	};

    //-----------------------------------------------------------------------------
    // Game_Actor オーバーライド
    //
    // メニュー画面中は最強装備選別で着脱不可なタグがついていないか判定する
    //-----------------------------------------------------------------------------
	const _Game_Actor_bestEquipItem = Game_Actor.prototype.bestEquipItem;
	Game_Actor.prototype.bestEquipItem = function(slotId) {
		if(isEquipChangeOk_IsEquipOptimize){
			// メタタグも一緒に判定
			const etypeId = this.equipSlots()[slotId];
			const items = $gameParty
				.equipItems()
				.filter(item => item.etypeId === etypeId && this.canEquip(item));
			let bestItem = null;
			let bestPerformance = -1000;
			for (let i = 0; i < items.length; i++) {
				if(setparamEquipMetadate(items[i])){
					// メニュー画面中でなおかつメタタグが存在している場合の処理
					const actor_id = this.actorId();
					if(judgeEquipMetadate(equipEventCommand.ON_CANCEL, actor_id)) continue;
					if(judgeEquipMetadate(equipEventCommand.ON_MESSAGE, actor_id) !== false) continue;
					if(judgeEquipMetadate(equipEventCommand.ON_MENUEND, actor_id)) continue;
				}

				const performance = this.calcEquipItemPerformance(items[i]);
				if (performance > bestPerformance) {
					bestPerformance = performance;
					bestItem = items[i];
				}
			}
			return bestItem;
		}
		else{
			// 通常処理
			return _Game_Actor_bestEquipItem.call(this, slotId);
		}
	};

    //-----------------------------------------------------------------------------
    // Game_Actor オーバーライド
    //
    // 装備が実際に変更された際の処理
    //-----------------------------------------------------------------------------
	const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
	Game_Actor.prototype.changeEquip = function(slotId, item) {
		// メニュー画面中はメタタグによってスイッチの変動やSE/MEの再生を行う
		if(equip_NowMenu){
			const actor_id = this.actorId();
			const nowequip = this.equips()[slotId];
			const equiparray = [nowequip, item];
			equiparray.forEach((equipitem, index) => {
				if(setparamEquipMetadate(equipitem)){
					const cmdarray = [
						equipEventCommand.CHANGE_SWITCH,
						equipEventCommand.CHANGE_VARIABLE,
						equipEventCommand.CHANGE_PLAYSE,
						equipEventCommand.CHANGE_PLAYME,
					];
					cmdarray.forEach(command_id => {
						const metaret = judgeEquipMetadate(command_id, actor_id);
						if(metaret){
							let setvalue;
							switch (command_id) {
							case equipEventCommand.CHANGE_SWITCH:
								// スイッチ操作
								setvalue = equip_MenuEventSetSwitch;
								if(setvalue === void 0){
									// 引数を省略していた場合、装備しているならON、していないならOFFとする
									setvalue = index === 1; // 最初(0)に見るのが外れる装備、次(1)に見るのが装着する装備
								}
								$gameSwitches.setValue(metaret, setvalue);
								break;

							case equipEventCommand.CHANGE_VARIABLE:
								// 変数操作
								setvalue = equip_MenuEventSetValue;
								if(setvalue === void 0){
									// 引数を省略していた場合、装備しているならON、していないならOFFとする
									setvalue = $gameVariables.value(metaret) + (index === 1 ? 1 : -1);
								}
								$gameVariables.setValue(metaret, setvalue);
								break;

							case equipEventCommand.CHANGE_PLAYSE:
							case equipEventCommand.CHANGE_PLAYME:
								// サウンドを鳴らす
								playEquipSound(metaret, command_id === equipEventCommand.CHANGE_PLAYME);
								break;
							}
						}
					}, this);
				}
			}, this);
		}
		_Game_Actor_changeEquip.call(this, slotId, item);
	};

    //-----------------------------------------------------------------------------
    // Window_EquipSlot オーバーライド
    //
    // 装備スロット選択時のデフォルト決定音は鳴らさないようにする（別の制御箇所で個別に鳴らす）
    //-----------------------------------------------------------------------------
	Window_EquipSlot.prototype.playOkSound = function() {
		//
	};

	//-----------------------------------------------------------------------------
	// Window_MenuMessage
    //
    // メニュー画面用メッセージウインドウ
    //-----------------------------------------------------------------------------

	function Window_MenuMessage() {
		this.initialize(...arguments);
	}

	Window_MenuMessage.prototype = Object.create(Window_StatusBase.prototype);
	Window_MenuMessage.prototype.constructor = Window_MenuMessage;

	Window_MenuMessage.prototype.initialize = function(rect) {
		// メッセージウインドウの初期化処理
		Window_StatusBase.prototype.initialize.call(this, rect);
		this._actor = null;
		this.refresh();
		this.activate();

		// ウインドウを にゅっ と出す処理
		this.openness = 0;
		this.open();

		// pause を true にするとメッセージウインドウに矢印がつく
		this.pause = true;
	};

	Window_MenuMessage.prototype.setActor = function(actor) {
		// メッセージウインドウに表示するアクターの情報をセット
		if (this._actor !== actor) {
			this._actor = actor;
			this.refresh();
		}
	};

	Window_MenuMessage.prototype.refresh = function() {
		// メッセージウインドウの情報更新
		Window_StatusBase.prototype.refresh.call(this);
		if (this._actor) {
			this.drawMessageFace();
		}
		this.drawMessageText();
	};

	Window_MenuMessage.prototype.drawMessageFace = function() {
		// メッセージウインドウの顔グラフィックを描画
		const width = ImageManager.faceWidth;
		const height = this.innerHeight;
		this.drawActorFace(this._actor, WINDOW_MENUMESSAGE_INSPACE_X, 0, width, height);
	};

	Window_MenuMessage.prototype.drawMessageText = function() {
		// メッセージウインドウのテキストを描画
		const lineHeight = this.lineHeight();
		const sepcode = typeof PluginManagerEx !== 'undefined' ? String.fromCharCode(0x1b, 0x6e) : "\\n";
		const canceltext = equip_MenuMessage.split(sepcode);
		const x = (this._actor ? ImageManager.faceWidth : 0) + (WINDOW_MENUMESSAGE_INSPACE_X * 2);
		const y = WINDOW_MENUMESSAGE_INSPACE_Y;
		canceltext.forEach((ctext, i) => {
			this.drawText(ctext, x, y + (lineHeight * i), this.innerWidth - x);
		});
	};

	Window_MenuMessage.prototype.onTouchOk = function() {
		// 画面上どこをタッチしてもOKとする
		this.processOk();
	};
	//-----------------------------------------------------------------------------

    //-----------------------------------------------------------------------------
    // Scene_MenuBase オーバーライド
    //
    // 戻るボタンの表示制御
    //-----------------------------------------------------------------------------
	Scene_MenuBase.prototype.updateCancelButtons = function() {
		if (this._cancelButton) {
			const enabled = this.areCancelButtonsEnabled();
			this._cancelButton.visible = enabled;
		}
	};
	Scene_MenuBase.prototype.areCancelButtonsEnabled = function() {
		return true;
	};
	const _Scene_MenuBase_update = Scene_MenuBase.prototype.update;
	Scene_MenuBase.prototype.update = function() {
		_Scene_MenuBase_update.call(this);
		this.updateCancelButtons();
	};

    //-----------------------------------------------------------------------------
    // Scene_Equip オーバーライド
    //
    // メッセージウインドウを出している時はキャラ変更ボタンと戻るボタンを消す
    //-----------------------------------------------------------------------------
	const _Scene_Equip_arePageButtonsEnabled = Scene_Equip.prototype.arePageButtonsEnabled;
	Scene_Equip.prototype.arePageButtonsEnabled = function() {
		return _Scene_Equip_arePageButtonsEnabled.call(this) && !this._menuMessageWindow;
	};
	const _Scene_Equip_areCancelButtonsEnabled = Scene_Equip.prototype.areCancelButtonsEnabled;
	Scene_Equip.prototype.areCancelButtonsEnabled = function() {
		return _Scene_Equip_areCancelButtonsEnabled.call(this) && !this._menuMessageWindow;
	};

})();