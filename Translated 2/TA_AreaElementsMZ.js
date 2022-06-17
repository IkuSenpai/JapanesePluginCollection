//=============================================================================
// TA_AreaElementsMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Implement area elements system.
 * @author Tamaki Awana
 * @help By accumulating on the spot during battle,
 *  we will implement the "Area elements system" that can be used as
 *  an element to change the cost of the skill
 *  and the effect rates of the corresponding attack element.
 * Also, by executing the plugin command,
 *  we will implement the "Stable area elements system"
 *  that allows you to set area elements
 *  that can be used unlimitedly as skill costs during battle.
 *
 * 
 * About Versus Element:
 *  When the area element is added, if you attack with a skill
 *  that has the element set in advance as the corresponding versus element,
 *  the effect of lowering the element rates will be applied.
 *  Also, if you add a note tag <AE_VersusRemove> to the note of
 *  the skill or item, it will be offset and disappear
 *  when you add the area element of the versus element.
 * 
 * 
 * About Note Tag:
 *  You can enter the these note tag in the
 *  note of actor / class / equipment / skill / item / state.
 * ･<AE_Add:[element id]>
 *  When the effect of a skill or item is applied,
 *  area elements of the set element number are added.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Add: 2,3,3>.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_Remove:[element id]>
 *  When the effect of a skill or item is applied,
 *  area elements of the set element number are removed.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Remove:2,3,3>.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_FullRemove>
 *  When the effect of a skill or item is applied,
 *  delete all currently accumulated area elements.
 *  The number of accumulated area elements will be added to
 *  the element rates of the attack element.
 * 
 * ･<AE_VersusRemove>
 *  When this note tag is in the note,
 *  it activates the area elements offset effect
 *  by the area elements of the versus elements.
 * 
 * ･<AE_DontAdjust>
 *  When this note tag is in the note,
 *  the operation to add or delete area elements specified
 *  in the equipment, state, actor, and class will not be performed.
 *  By setting this tag, you can create states and skills
 *  that do not cause additional area element fluctuations.
 * 
 *
 * You can enter the these note tag in the note of skill / item.
 * ･<AE_Cost:[element id]>
 *  The condition for use is that there are area elements
 *  with the specified element number.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Cost:2,3,3>.
 *  The specified area elements will be erased
 *  when the effect of the skill or item is applied.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_Need:[element id]>
 *  The condition for use is that there are area elements
 *  with the specified element number.
 *  Multiple settings can be made by
 *  separating them with commas, such as <AE_Need:2,3,3>.
 *  Unlike the AE_Cost tag, even if you use a skill or item,
 *  the specified area elements in the tag will remain.
 *  If multiple note tags of the same type are listed,
 *  the settings of the one listed at the end will be applied.
 *
 * ･<AE_Need_Nil>
 *  The condition for using skills and items is that there are no area elements.
 *
 *
 * Plugin Commands:
 *  Add Stable Area Element [element id]
 *  Adds the element with the specified number to the stable area element.
 *  If you try to add more stable area elements than you have set,
 *  the oldest ones will be deleted.
 *  Stable area elements will remain on the map
 *  until they are removed with the "RemoveStableAreaElement" or
 *  "ClearStableAreaElement" command.
 *
 *  Remove Stable Area Element [element id]
 *  Removes the element with the specified number from the stable area element.
 *
 *  Clear Stable Area Element
 *  Delete all currently installed stable area elements.
 *
 *  Add Area Element [element id]
 *  Adds the element with the specified number to the area element.
 * 
 *  Add Area Element(VS Effect) [element id]
 *  Adds the element with the specified number to the area element.
 *  This command, if there are area element of versus element,
 *  the offset effect will be activated.
 *
 *  Remove Area Element [element id]
 *  Removes the element with the specified number from the area element.
 *  Multiple settings can be made by separating them with commas
 *
 *  Clear Area Element
 *  Delete all currently installed area elements.
 * 
 * 
 * Caution:
 * ･Since the processing related to element rate / skill and item
 *  usage conditions has been modified, there is a possibility of conflict
 *  with other plugins that modify the same part.
 * ･After using the skill or item,
 *  the area element are added / deleted by the tags described
 *  in the actor / class / equipment / state.
 * 
 * 
 * Update History:
 * ver.1.1.1 Fixed a bug that the enablement judgment
 *           may not be performed normally when the same
 *           elements is specified multiple times
 *           in the AE_Cost tag and AE_Need tag.
 *           Fixed a bug where area elements were not initialized
 *           at the end of the battle.
 * ver.1.1 Added a function to adjust the display position of the icon.
 * ver.1.0.1 Fixed a typo in the English help.
 * ver.1.0   Released.
 * 
 * ---
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * This plugin is based on ちいさな本屋's RGSS2 material
 *  "XRXSv52. 属性活性エネルギー".
 * Thanks to ちいさな本屋 (http://xrxs.at-ninja.jp/).
 *
 *
 * @param AreaElements
 * @desc Set the element to be used as the area elements.
 * @type struct<AreaElementList>[]
 * @default ["{\"ElementId\":\"2\",\"ElementIconId\":\"64\",\"VSElementId\":\"3\"}","{\"ElementId\":\"3\",\"ElementIconId\":\"65\",\"VSElementId\":\"2\"}","{\"ElementId\":\"4\",\"ElementIconId\":\"66\",\"VSElementId\":\"0\"}","{\"ElementId\":\"5\",\"ElementIconId\":\"67\",\"VSElementId\":\"0\"}","{\"ElementId\":\"6\",\"ElementIconId\":\"68\",\"VSElementId\":\"7\"}","{\"ElementId\":\"7\",\"ElementIconId\":\"69\",\"VSElementId\":\"6\"}","{\"ElementId\":\"8\",\"ElementIconId\":\"70\",\"VSElementId\":\"9\"}","{\"ElementId\":\"9\",\"ElementIconId\":\"71\",\"VSElementId\":\"8\"}"]
 *
 * @param AERate
 * @type number
 * @min -9007
 * @max 9007
 * @desc It is the change of the element rate per a area element.(unit:%) If set to 0, the element rate does not change.
 * @default 10
 * 
 * @param AEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the X-axis direction when arranging the icons of the area element.
 * @default 36
 *
 * @param AEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the Y-axis direction when arranging the icons of the area element.
 * @default 0
 *
 * @param AEWShowSelectList
 * @type boolean
 * @on Show
 * @off Don't show
 * @desc Which setting to display the area element window when selecting a skill item.
 * @default true
 * 
 * @param AEWShowBattleMes
 * @type boolean
 * @on Show
 * @off Don't show
 * @desc Which setting to display the area element window when battle message is displayed.
 * @default true
 * 
 * @param AreaElementSetting
 * @desc Setting of area element.
 * 
 * @param AENumber
 * @type number
 * @min 1
 * @max 9007
 * @default 8
 * @desc The number of area elements to accumulate.
 * Default: 8
 * @parent AreaElementSetting
 *
 * @param AEMax
 * @type select
 * @option Do not accumulate new area elements.
 * @value dontaccumulate
 * @option Erase from the oldest.
 * @value erase
 * @default erase
 * @desc Set how to handle newly added area elements when the area elements are full.
 * @parent AreaElementSetting
 *
 * @param AEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of area element window.
 * @default 308
 * @parent AreaElementSetting
 *
 * @param AEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of area element window.
 * @default 56
 * @parent AreaElementSetting
 *
 * @param AEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of area element window.
 * @default 500
 * @parent AreaElementSetting
 *
 * @param AEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of area element window.
 * @default 360
 * @parent AreaElementSetting
 *
 * @param AEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of area element window.
 * @default 255
 * @parent AreaElementSetting
 *
 * @param AEWindowBG
 * @desc Background image of area element window. Please put the background image in the img/system.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent AreaElementSetting
 * 
 * @param AEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of display start position of area element icon.
 * @default 0
 * @parent AreaElementSetting
 *
 * @param AEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of display start position of area element icon.
 * @default 0
 * @parent AreaElementSetting
 *
 * @param StableAreaElementSetting
 * @desc Setting of stable area element.
 * 
 * @param StableAENumber
 * @type number
 * @min 0
 * @max 9007
 * @default 2
 * @desc The number of stable area element. If set to 0, it will not be used. Default: 2　
 * @parent StableAreaElementSetting
 *
 * @param SAEShowing
 * @type select
 * @option Show in a dedicated window.
 * @value standalone
 * @option Display before area elements in the area element window.
 * @value beforeae
 * @option Display after area elements in the area element window.
 * @value afterae
 * @default standalone
 * @desc Sets how stable area elements are displayed.
 * @parent StableAreaElementSetting
 * 
 * @param SAEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the X-axis direction when displaying stable area elements and area elements in one window.
 * @default 16
 * @parent SAEShowing
 *
 * @param SAEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc The spacing in the Y-axis direction when displaying stable area elements and area elements in one window.
 * @default 0
 * @parent SAEShowing
 * 
 * @param SAEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of stable area element window.
 * @default 100
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of stable area element window.
 * @default 56
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of stable area element window.
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of stable area element window.
 * @default 360
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of stable area element window.
 * @default 255
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowBG
 * @desc Background image of stable area element window. Please put the background image in the img/system.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent StableAreaElementSetting
 * 
 * @param SAEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of display start position of stable area element icon.
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of display start position of stable area element icon.
 * @default 0
 * @parent StableAreaElementSetting
 * 
 * @param SEWPadding
 * @type number
 * @min -1
 * @max 9007
 * @desc The padding value for stable area element window. Specifying -1 uses the system value.
 * @default -1
 * @parent StableAreaElementSetting
 * 
 * @command AddStableAreaElement
 * @text Add Stable Area Element
 * @desc Adds the stable area element of the specified element id.
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text Element ID
 * @desc Element id that you want to add the stable area element.
 * 
 * @command RemoveStableAreaElement
 * @text Remove Stable Area Element
 * @desc Removes the stable area element of the specified element id.
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text Element ID
 * @desc Element id that you want to remove from the stable area element.
 * 
 * @command ClearStableAreaElement
 * @text Clear All Stable Area Element
 * @desc Clear all stable area element.
 * 
 * @command AddAreaElement
 * @text Add Area Element
 * @desc Adds the area element of the specified element id.
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text Element ID
 * @desc Element id that you want to add the area element.
 * 
 * @command AddAreaElementVSE
 * @text Add Area Element(VS. Element Effect)
 * @desc Adds the stable area element of the specified element id. If the area element of the versus element, it will be offset.
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text Element ID
 * @desc Element id that you want to add the area element.
 * 
 * @command RemoveAreaElement
 * @text Remove Area Element
 * @desc Removes the area element of the specified element id.
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text Element ID
 * @desc Element id that you want to remove the area element.
 * 
 * @command ClearAreaElement
 * @text Clear All Area Element
 * @desc Clear all area element.
 */
/*~struct~AreaElementList:
 * @param ElementId
 * @type number
 * @min 1
 * @max 9007
 * @desc The ID of the element used as the area element.
 * @default 1
 *
 * @param ElementIconId
 * @desc The icon of the element used as the area element.
 * @default 0
 * 
 * @param VSElementId
 * @type number
 * @min 0
 * @max 9007
 * @desc The ID of the versus element. If set to 0, the versus element will be disabled.
 * @default 0
 */
/*:ja
 * @target MZ
 * @plugindesc 空間属性システムを実装します。
 * @author 沫那環
 * @help 戦闘時にその場にためることで、スキルのコストや、
 * 対応する攻撃属性の有効度を変動させる要素として使える
 * 空間属性のシステムを実装します。
 * また、プラグインコマンドを実行することにより、戦闘時のスキルコストとして
 * 無制限に利用可能な空間属性を設置できる、固定空間属性システムを実装します。
 *
 * 
 * 【対立属性について】
 * 　空間属性が追加されている時に、対応する対立属性としてあらかじめ設定しておいた
 * 　属性を持ったスキルなどで攻撃すると、属性有効度を下げる効果が発動します。
 * 　また、スキルやアイテムのメモ欄に<AE_VersusRemove>というメモタグを追加すると、
 * 　対立属性の空間属性を追加した際に、相殺されて消える効果が発揮されます。
 * 
 * 
 * 【メモタグでの機能追加】
 * 　アクター・クラス・装備・スキル・アイテム・ステートのメモ欄に、
 * 　以下のメモタグが記載できます。
 * ・<AE_Add:属性番号>
 *  スキルおよびアイテムの効果の発動時に、設定した属性番号の空間属性を追加します。
 * 　<AE_Add:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_Remove:属性番号>
 * 　スキルおよびアイテムの効果の発動時に、設定した属性番号の空間属性を削除します。
 * 　<AE_Remove:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_FullRemove>
 * 　スキルおよびアイテムの効果の発動時に、現在たまっている
 * 　空間属性を全て削除します。
 * 　空間属性がたまっている個数分、攻撃属性の属性有効度への加算が発生します。
 * 
 * ・<AE_VersusRemove>
 * 　このメモタグがメモ内にある場合、対立属性の空間属性による、
 * 　空間属性の相殺効果を発動させます。
 * 
 * ・<AE_DontAdjust>
 * 　このメモタグがメモ内にある場合、装備・ステート・アクター・クラスで
 * 　指定された、空間属性の追加や削除を行いません。
 * 　このタグを設定することで、追加の空間属性の変動が発生しないステートやスキルを
 * 　作ることができます。
 * 　
 *
 * スキル・アイテムのメモ欄に、以下のメモタグが記載できます。
 * ・<AE_Cost:属性番号>
 * 　指定した属性番号の空間属性があることを使用条件にします。
 * 　<AE_Cost:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　指定した空間属性は、スキルやアイテムの効果の発動時に消去されます。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_Need:属性番号>
 * 　指定した属性番号の空間属性があることを使用条件にします。
 * 　<AE_Need:2,3,3>のように、コンマで区切ることで複数個設定することができます。
 * 　AE_Costタグと違い、スキルやアイテムを使用しても、タグで指定した属性は残ります。
 * 　同じ種類のメモタグを複数記載した場合、一番最後に記載したものの
 * 　設定が適応されます。
 *
 * ・<AE_Need_Nil>
 * 　空間属性が一個もない状態を、スキルやアイテムの使用条件とします。
 * 
 *
 * 【プラグインコマンド】
 * 　固定空間属性を追加する 属性番号
 * 　固定空間属性に指定した番号の属性を追加します。
 * 　設定した個数以上の空間属性を設置しようとすると、古いものから
 * 　削除されていきます。
 * 　固定空間属性は、「固定空間属性を取り除く」コマンド、
 * 　または「固定空間属性を全て削除する」コマンドで削除するまで、
 * 　マップ移動をしても残り続けます。
 *
 * 　固定空間属性を取り除く 属性番号
 * 　指定した番号の固定空間属性属性を取り除きます。
 *
 * 　固定空間属性を全て削除する
 * 　現在設置されている固定空間属性を全て削除します。
 *
 * 　空間属性を追加する 属性番号
 * 　空間属性に指定した番号の属性を追加します。
 * 
 * 　空間属性を追加する（対立属性効果） 属性番号
 * 　空間属性に指定した番号の属性を追加します。
 * 　こちらのコマンドでは、対立する空間属性がある場合、相殺効果が発動します。
 *
 * 　空間属性を取り除く 属性番号
 * 　空間属性から指定した番号の属性を取り除きます。
 *
 * 　空間属性を全て削除する
 * 　現在存在している空間属性を全て削除します。
 * 
 * 
 * 【注意】
 * 　・属性有効度・スキルやアイテムの使用条件に関する処理の改変を行っているため、
 * 　　同じような部分の機能を改造する他のプラグインと、競合する可能性があります。
 * 　・スキルまたはアイテムの使用後に、アクター・クラス・装備・ステートに
 * 　　記載されたタグによる空間属性の追加・削除の処理が行われます。
 * 
 * 
 * 【更新履歴】
 * 　ver.1.1.1 AE_CostタグとAE_Needタグで、同じ属性を複数指定したときに、
 *             正常に使用可能判定が行われないことがあるバグを修正
 *             戦闘終了時に空間属性が初期化されないバグを修正。
 * 　ver.1.1   アイコンの表示位置を調整できる機能を追加。
 * 　ver.1.0.1 英語版ヘルプの誤字を修正。
 * 　ver.1.0   公開
 * 
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * このプラグインを制作するにあたり、
 * 「ちいさな本屋」（http://xrxs.at-ninja.jp/）のRGSS2スクリプト素材
 * 「XRXSv52. 属性活性エネルギー」を参考にさせていただきました。
 * この場を借りて、お礼申し上げます。
 *
 *
 * @param AreaElements
 * @desc 空間属性として使用する属性を設定します。
 * @type struct<AreaElementList>[]
 * @default ["{\"ElementId\":\"2\",\"ElementIconId\":\"64\",\"VSElementId\":\"3\"}","{\"ElementId\":\"3\",\"ElementIconId\":\"65\",\"VSElementId\":\"2\"}","{\"ElementId\":\"4\",\"ElementIconId\":\"66\",\"VSElementId\":\"0\"}","{\"ElementId\":\"5\",\"ElementIconId\":\"67\",\"VSElementId\":\"0\"}","{\"ElementId\":\"6\",\"ElementIconId\":\"68\",\"VSElementId\":\"7\"}","{\"ElementId\":\"7\",\"ElementIconId\":\"69\",\"VSElementId\":\"6\"}","{\"ElementId\":\"8\",\"ElementIconId\":\"70\",\"VSElementId\":\"9\"}","{\"ElementId\":\"9\",\"ElementIconId\":\"71\",\"VSElementId\":\"8\"}"]
 *
 * @param AERate
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性一つあたりの属性有効率の変化です（単位：%）
 * 0を設定すると、属性有効度は変化しません。
 * @default 10
 * 
 * @param AEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性のアイコンを並べるときのX軸方向の間隔です。
 * @default 36
 *
 * @param AEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性のアイコンを並べるときのY軸方向の間隔です。
 * @default 0
 *
 * @param AEWShowSelectList
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @desc スキル・アイテム選択時に、空間属性ウィンドウを表示するかどうかの設定です。
 * @default true
 * 
 * @param AEWShowBattleMes
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @desc 戦闘メッセージが表示されている時に、空間属性ウィンドウを表示するかどうかの設定です。
 * @default true
 * 
 * @param AreaElementSetting
 * @desc 空間属性についてのパラメーター設定です。
 * 
 * @param AENumber
 * @type number
 * @min 1
 * @max 9007
 * @default 8
 * @desc ためておく空間属性の数です。
 * 初期値：8
 * @parent AreaElementSetting
 *
 * @param AEMax
 * @type select
 * @option 新しい空間属性を貯めない
 * @value dontaccumulate
 * @option 古いものから消す
 * @value erase
 * @default erase
 * @desc 空間属性が満タンになったとき、新しく追加された空間属性をどのように扱うかを設定します。
 * @parent AreaElementSetting
 *
 * @param AEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 空間属性を表示するウィンドウの幅です。
 * @default 308
 * @parent AreaElementSetting
 *
 * @param AEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 空間属性を表示するウィンドウの高さです。
 * @default 56
 * @parent AreaElementSetting
 *
 * @param AEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性を表示するウィンドウのX座標です。
 * @default 500
 * @parent AreaElementSetting
 *
 * @param AEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性を表示するウィンドウのY座標です。
 * @default 360
 * @parent AreaElementSetting
 *
 * @param AEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 空間属性を表示するウィンドウの透明度です。
 * @default 255
 * @parent AreaElementSetting
 *
 * @param AEWindowBG
 * @desc 空間属性を表示するウィンドウの背景画像です。
 * 背景画像はimg/system内においてください。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent AreaElementSetting
 * 
 * @param AEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性アイコンの表示開始位置のX座標です。
 * @default 0
 * @parent AreaElementSetting
 *
 * @param AEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 空間属性アイコンの表示開始位置のY座標です。
 * @default 0
 * @parent AreaElementSetting
 *
 * @param StableAreaElementSetting
 * @desc 空間属性についてのパラメーター設定です。
 * 
 * @param StableAENumber
 * @type number
 * @min 0
 * @max 9007
 * @default 2
 * @desc 固定空間属性の数です。0を設定すると使用しません。
 * 初期値：2
 * @parent StableAreaElementSetting
 *
 * @param SAEShowing
 * @type select
 * @option 専用のウィンドウに表示する
 * @value standalone
 * @option 空間属性ウィンドウで、空間属性の前に表示する
 * @value beforeae
 * @option 空間属性ウィンドウで、空間属性の後に表示する
 * @value aftereae
 * @default standalone
 * @desc 固定空間属性の表示方法を設定します。
 * @parent StableAreaElementSetting
 * 
 * @param SAEDistanceX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性と空間属性を一つのウィンドウで表示するときの、X軸方向の間隔です。
 * @default 16
 * @parent SAEShowing
 *
 * @param SAEDistanceY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性と空間属性を一つのウィンドウで表示するときの、Y軸方向の間隔です。
 * @default 0
 * @parent SAEShowing
 * 
 * @param SAEWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウの幅です。
 * @default 100
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウの高さです。
 * @default 56
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウのX座標です。
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性を表示するウィンドウのY座標です。
 * @default 360
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowOp
 * @type number
 * @min 0
 * @max 255
 * @desc 固定空間属性を表示するウィンドウの透明度です。
 * @default 255
 * @parent StableAreaElementSetting
 *
 * @param SAEWindowBG
 * @desc 固定空間属性を表示するウィンドウの背景画像です。
 * 背景画像はimg/system内においてください。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 * @parent StableAreaElementSetting
 * 
 * @param SAEStartX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性アイコンの表示開始位置のX座標です。
 * @default 0
 * @parent StableAreaElementSetting
 *
 * @param SAEStartY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 固定空間属性アイコンの表示開始位置のY座標です。
 * @default 0
 * @parent StableAreaElementSetting
 * 
 * @command AddStableAreaElement
 * @text 固定空間属性を追加する
 * @desc 指定した属性番号の固定空間属性を追加します。
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text 属性番号
 * @desc 固定空間属性に追加したい属性の番号です。
 * 
 * @command RemoveStableAreaElement
 * @text 固定空間属性を取り除く
 * @desc 指定した属性番号の固定空間属性を取り除きます。
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text 属性番号
 * @desc 固定空間属性から取り除きたい属性の番号です。
 * 
 * @command ClearStableAreaElement
 * @text 固定空間属性を全て削除する
 * @desc 固定空間属性を全て削除します。
 * 
 * @command AddAreaElement
 * @text 空間属性を追加する
 * @desc 指定した属性番号の空間属性を追加します。
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text 属性番号
 * @desc 空間属性に追加したい属性の番号です。
 * 
 * @command AddAreaElementVSE
 * @text 空間属性を追加する（対立属性効果）
 * @desc 指定した属性番号の空間属性を追加します。対立属性の空間属性が存在している場合、相殺されます。
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text 属性番号
 * @desc 空間属性に追加したい属性の番号です。
 * 
 * @command RemoveAreaElement
 * @text 空間属性を削除する
 * @desc 指定した属性番号の空間属性を削除します。
 * 
 * @arg ElementId
 * @type number
 * @default 0
 * @text 属性番号
 * @desc 空間属性から取り除きたい属性の番号です。 
 * 
 * @command ClearAreaElement
 * @text 空間属性を全て削除する
 * @desc 全ての空間属性を削除します。
 */
/*~struct~AreaElementList:ja
 * @param ElementId
 * @type number
 * @min 1
 * @max 9007
 * @desc 空間属性として使用する属性のIDです。
 * @default 1
 *
 * @param ElementIconId
 * @desc 空間属性として使用する属性のアイコンです。
 * @default 0
 * 
 * @param VSElementId
 * @type number
 * @min 0
 * @max 9007
 * @desc 対立する属性のIDです。0を設定すると、対立属性は無効となります。
 * @default 0
 */

(function () {
  const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
  const parameters = PluginManager.parameters(pluginName);

  function StructConvert(basestruct) {
    return JSON.parse(
      JSON.stringify(basestruct, function (key, value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          try {
            return eval(value);
          } catch (e) {
            return value;
          }
        }
      })
    );
  }

  const aebase = parameters["AreaElements"];
  const aesetting = StructConvert(aebase);
  const aenum = Number(parameters["AENumber"] || 8);
  const aemax = String(parameters["AEMax"] || "erase");
  const staenum = Number(parameters["StableAENumber"] || 2);
  const aerate = Number(parameters["AERate"] || 0.1);

  const aewwidth = Number(parameters["AEWindowWidth"] || 308);
  const aewheight = Number(parameters["AEWindowHeight"] || 56);
  const aewx = Number(parameters["AEWindowX"] || 500);
  const aewy = Number(parameters["AEWindowY"] || 360);
  const aeqop = Number(parameters["AEWindowOp"] || 255);
  const aewbg = String(parameters["AEWindowBG"]);

  const staewwidth = Number(parameters["SAEWindowWidth"] || 100);
  const staewheight = Number(parameters["SAEWindowHeight"] || 56);
  const staewx = Number(parameters["SAEWindowX"] || 0);
  const staewy = Number(parameters["SAEWindowY"] || 360);
  const staeqop = Number(parameters["SAEWindowOp"] || 255);
  const staewbg = String(parameters["SAEWindowBG"]);

  const saedp = String(parameters["SAEShowing"] || "standalone");
  const staestx = Number(parameters["SAEStartX"] || 0);
  const staesty = Number(parameters["SAEStartY"] || 0);
  const staedistx = Number(parameters["SAEDistanceX"] || 16);
  const staedisty = Number(parameters["SAEDistanceY"] || 0);

  const aestx = Number(parameters["AEStartX"] || 0);
  const aesty = Number(parameters["AEStartY"] || 0);
  const aedistx = Number(parameters["AEDistanceX"] || 36);
  const aedisty = Number(parameters["AEDistanceY"] || 0);
  const aewssel = String(parameters["AEWShowSelectList"] || "true");
  const aewsbm = String(parameters["AEWShowBattleMes"] || "true");

  //Plugin Commands
  PluginManager.registerCommand(pluginName, "AddStableAreaElement", args => {
    const staeid = Number(args.ElementId);
    $gameMap.addStableAreaElements(staeid);
  });

  PluginManager.registerCommand(pluginName, "RemoveStableAreaElement", args => {
    const staeid = Number(args.ElementId);
    $gameMap.removeStableAreaElements(staeid);
  });

  PluginManager.registerCommand(pluginName, "ClearStableAreaElement", args => {
    $gameMap.clearStableAreaElements();
  });

  PluginManager.registerCommand(pluginName, "AddAreaElement", args => {
    const aeid = Number(args.ElementId);
    $gameTemp.addAreaElements(aeid);
  });

  PluginManager.registerCommand(pluginName, "AddAreaElementVSE", args => {
    const aeid = Number(args.ElementId);
    const aeset = aesetting.filter(function ({ ElementId }) {
      return ElementId === aeid;
    });
    if (aeset.length > 0) {
      vsae = aeset[0].VSElementId;
    } else {
      vsae = 0;
    }
    const vsaeindex = $gameTemp.AreaElements().indexOf(vsae);
    if (vsaeindex !== -1) {
      $gameTemp.removeAreaElements(vsaeindex);
    } else {
      $gameTemp.addAreaElements(aeid);
    }
  });

  PluginManager.registerCommand(pluginName, "RemoveAreaElement", args => {
    const aeid = Number(args.ElementId);
    $gameTemp.removeAreaElements(aeid);
  });

  PluginManager.registerCommand(pluginName, "ClearAreaElement", args => {
    $gameTemp.clearAreaElements();
  });

  //BattleManager
  const _BattleManager_initMembers = BattleManager.initMembers;
  BattleManager.initMembers = function () {
    _BattleManager_initMembers.call(this);
    this._aeWindow = null;
    if (staenum > 0) {
      this._staeWindow = null;
    }
  };

  BattleManager.setAEWindow = function (aeWindow) {
    this._aeWindow = aeWindow;
  };

  BattleManager.setStableAEWindow = function (staeWindow) {
    this._staeWindow = staeWindow;
  };

  const _BattleManager_processVictory = BattleManager.processVictory;
  BattleManager.processVictory = function() {
    _BattleManager_processVictory.call(this);
    $gameTemp.clearAreaElements();
  };

  const _BattleManager_processAbort = BattleManager.processAbort;
  BattleManager.processAbort = function() {
    _BattleManager_processAbort.call(this);
    $gameTemp.clearAreaElements();
  };

  const _BattleManager_processDefeat = BattleManager.processDefeat;
  BattleManager.processDefeat = function() {
    _BattleManager_processDefeat.call(this);
    $gameTemp.clearAreaElements();
  };

  //Game_Temp
  const _Game_Temp_initialize = Game_Temp.prototype.initialize;
  Game_Temp.prototype.initialize = function () {
    _Game_Temp_initialize.call(this);
    this._AreaElements = new Array();
  };

  Game_Temp.prototype.AreaElements = function () {
    return this._AreaElements;
  };

  Game_Temp.prototype.addAreaElements = function (elementid) {
    if (aemax == "erase") {
      this._AreaElements.push(elementid)
      while (this.AreaElements().length > aenum) {
        this._AreaElements.shift();
        if (this.AreaElements().length <= aenum) {
          break;
        }
      }
    } else {
      if (this.AreaElements().length < aenum) {
        this._AreaElements.push(elementid);
      }
    }
  };

  Game_Temp.prototype.removeAreaElements = function (elementid) {
    const index = this.AreaElements().indexOf(elementid);
    if (index !== -1) {
      this._AreaElements.splice(index, 1);
    }
  };

  Game_Temp.prototype.clearAreaElements = function () {
    this._AreaElements.splice(0);
  };

  Game_Temp.prototype.addStableAreaElements = function (elementid) {
    console.log(this._StableAreaElements)
    this._StableAreaElements.push(elementid);
    while (this.StableAreaElements().length <= staenum) {
      this._StableAreaElements.shift();
      if (this.StableAreaElements().length <= staenum) {
        break;
      }
    }
  };

  //Game_Map
  const _Game_Map_initialize = Game_Map.prototype.initialize;
  Game_Map.prototype.initialize = function () {
    _Game_Map_initialize.call(this);
    this._StableAreaElements = new Array();
  };

  Game_Map.prototype.StableAreaElements = function () {
    return this._StableAreaElements;
  };

  Game_Map.prototype.addStableAreaElements = function (elementid) {
    this._StableAreaElements.push(elementid)
    while (this.StableAreaElements().length > staenum) {
      this._StableAreaElements.shift();
      if (this.StableAreaElements().length <= staenum) {
        break;
      }
    }
  };

  Game_Map.prototype.removeStableAreaElements = function (elementid) {
    const index = this.StableAreaElements().indexOf(elementid);
    if (index !== -1) {
      this._StableAreaElements.splice(index, 1);
    }
  };

  Game_Map.prototype.clearStableAreaElements = function () {
    this._StableAreaElements.splice(0);
  };

  //Game_BattlerBase
  const _Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
  Game_BattlerBase.prototype.meetsSkillConditions = function (skill) {
    const basemskc = _Game_BattlerBase_meetsSkillConditions.call(this, skill);
    return this.canPaySkillCostAE(skill) && basemskc;
  };

  Game_BattlerBase.prototype.allAE = function () {
    let ae = $gameTemp.AreaElements();
    if (staenum > 0) {
      let sae = $gameMap.StableAreaElements();
      return ae.concat(sae);
    } else {
      return ae;
    }
  };

  Game_BattlerBase.prototype.getVSAE = function (elementid) {
    let ae = aesetting.filter(function ({ ElementId }) {
      return ElementId === elementid;
    });
    if (ae.length > 0) {
      vsae = ae[0].VSElementId;
    } else {
      vsae = 0;
    }
    return vsae;
  }

  Game_BattlerBase.prototype.canPaySkillCostAE = function (skill) {
    const aeneed = this.AENeed(skill);
    const aecost = this.AECost(skill);
    const allae = this.allAE();
    if (skill.meta.AE_Need_Nil) {
      if (allae.length == 0) {
        return true;
      } else {
        return false;
      }
    }
    if (aeneed.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        let allaest = allae.concat();
        let aeneedst = aeneed.concat();
        let aeset = allaest.filter(i => aeneedst.indexOf(i) != -1);
        for (let i = 0, n = aeneedst.length; i < n; ++i) {
          let aesetindex = aeset.indexOf(aeneedst[i]);
          if (aesetindex !== -1) {
            aeset.splice(aesetindex, 1);
          } else {
            return false
          }
        }
        return true;
      }
    }
    if (aecost.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        let allaest = allae.concat();
        let aecostst = aecost.concat();
        let aeset = allaest.filter(i => aecostst.indexOf(i) != -1);
        for (let i = 0, n = aecostst.length; i < n; ++i) {
          let aesetindex = aeset.indexOf(aecostst[i]);
          if (aesetindex !== -1) {
            aeset.splice(aesetindex, 1);
          } else {
            return false
          }
        }
        return true;
      }
    }
    return true;
  };

  const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
	Game_BattlerBase.prototype.paySkillCost = function(skill) {
    _Game_BattlerBase_paySkillCost.call(this, skill);
    this.removeSkillAECost(skill);
  };

  Game_BattlerBase.prototype.removeSkillAECost = function(skill) {
    const aecost = this.AECost(skill);
    if (aecost.length > 0) {
      for (let i = 0; i < aecost.length; i++) {
        $gameTemp.removeAreaElements(aecost[i]);
      }
    }
  };

  const _Game_BattlerBase_meetsItemConditions = Game_BattlerBase.prototype.meetsItemConditions;
  Game_BattlerBase.prototype.meetsItemConditions = function (item) {
    const basemimc = _Game_BattlerBase_meetsItemConditions.call(this, item);
    return basemimc && this.canPayItemCostAE(item);
  };

  Game_BattlerBase.prototype.processitemAE = function(item) {
    if (item.meta.AE_FullRemove) {
      $gameTemp.clearAreaElements();
    }
    const aerem = this.AERemove(item);
    if (aerem.length > 0) {
      for (let i = 0; i < aerem.length; i++) {
        $gameTemp.removeAreaElements(aerem[i]);
      }
    }
    const addae = this.AEAdd(item);
    if (addae.length > 0) {
      if (item.meta.AE_VersusRemove) {
        let vsae = new Array();
        for (let i = 0; i < addae.length; i++) {
          vsae.push(this.getVSAE(addae[i]));
        }
        for (let i = 0; i < vsae.length; i++) {
          let vsaeindex = $gameTemp.AreaElements().indexOf(vsae[i]);
          if (vsaeindex !== -1) {
            $gameTemp.removeAreaElements(vsaeindex);
          } else {
            $gameTemp.addAreaElements(addae[i]);
          }
        }
      } else {
        for (let i = 0; i < addae.length; i++) {
          $gameTemp.addAreaElements(addae[i]);
        }
      }
    }
  };

  Game_BattlerBase.prototype.canPayItemCostAE = function (item) {
    const aeneed = this.AENeed(item);
    const aecost = this.AECost(item);
    const allae = this.allAE();
    if (item.meta.AE_Need_Nil) {
      if (allae.length == 0) {
        return true;
      } else {
        return false;
      }
    }
    if (aeneed.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        let allaest = allae.concat();
        let aeneedst = aeneed.concat();
        let aeset = allaest.filter(i => aeneedst.indexOf(i) != -1);
        for (let i = 0, n = aeneedst.length; i < n; ++i) {
          let aesetindex = aeset.indexOf(aeneedst[i]);
          if (aesetindex !== -1) {
            aeset.splice(aesetindex, 1);
          } else {
            return false
          }
        }
        return true;
      }
    }
    if (aecost.length > 0) {
      if (allae.length <= 0) {
        return false;
      } else {
        let allaest = allae.concat();
        let aecostst = aecost.concat();
        let aeset = allaest.filter(i => aecostst.indexOf(i) != -1);
        for (let i = 0, n = aecostst.length; i < n; ++i) {
          let aesetindex = aeset.indexOf(aecostst[i]);
          if (aesetindex !== -1) {
            aeset.splice(aesetindex, 1);
          } else {
            return false
          }
        }
        return true;
      }
    }
    return true;
  };

  Game_BattlerBase.prototype.AreaElementRate = function (elementId) {
    let aecounts = 0;
    const aerbase = this.allAE();
    const vsae = this.getVSAE(elementId);
    if (aerbase.length > 0) {
      for (let i = 0; i < aerbase.length; i++) {
        if (aerbase[i] == elementId) {
          aecounts++;
        } else if (vsae > 0 && aerbase[i] == vsae) {
          aecounts--;
        }
      }
    }
    return aecounts * (aerate / 100);
  };

  Game_BattlerBase.prototype.FullAreaElementRate = function () {
    const aerb = this.allAE();
    return aerb.length * (aerate / 100);
  };

  Game_BattlerBase.prototype.AEAdd = function (item) {
    let addae = new Array();
    if (item.meta.AE_Add != null) {
      const addaebase = item.meta.AE_Add.split(',').map(Number);
      for (let i = 0; i < addaebase.length; i++) {
        let ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === addaebase[i];
        });
        let aeresult = ae[0].ElementId;
        addae.push(aeresult);
      }
    }
    return addae;
  };

  Game_BattlerBase.prototype.AERemove = function (item) {
    let remae = new Array();
    if (item.meta.AE_Remove != null) {
      const remaebase = item.meta.AE_Remove.split(',').map(Number);
      for (let i = 0; i < remaebase.length; i++) {
        let ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === remaebase[i];
        });
        let aeresult = ae[0].ElementId;
        remae.push(aeresult);
      }
    }
    return remae;
  };

  Game_BattlerBase.prototype.AENeed = function (item) {
    let needae = new Array();
    if (item.meta.AE_Need != null) {
      const needaebase = item.meta.AE_Need.split(',').map(Number);
      for (let i = 0; i < needaebase.length; i++) {
        let ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === needaebase[i];
        });
        let aeresult = ae[0].ElementId;
        needae.push(aeresult)
      }
    }
    return needae;
  };

  Game_BattlerBase.prototype.AECost = function (item) {
    let costae = new Array();
    if (item.meta.AE_Cost != null) {
      const costaebase = item.meta.AE_Cost.split(',').map(Number);
      for (let i = 0; i < costaebase.length; i++) {
        let ae = aesetting.filter(function ({ ElementId }) {
          return ElementId === costaebase[i];
        });
        let aeresult = ae[0].ElementId;
        costae.push(aeresult)
      }
    }
    return costae;
  };

  //Game_Battler
  const _Game_Battler_useItem = Game_Battler.prototype.useItem;
  Game_Battler.prototype.useItem = function(item) {
    _Game_Battler_useItem.call(this, item);
    this.processitemAE(item);
  };

  const _Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
  Game_Battler.prototype.consumeItem = function(item) {
    _Game_Battler_consumeItem.call(this, item);
    this.removeItemAECost(item);
  };
  
  Game_Battler.prototype.removeItemAECost = function(item) {
    const aecost = this.AECost(item);
    if (aecost.length > 0) {
      for (let i = 0; i < aecost.length; i++) {
        $gameTemp.removeAreaElements(aecost[i]);
      }
    }
  };

  Game_Battler.prototype.traitsAEChange = function() {
    const btobj = this.traitObjects();
    for (let i = 0; i < btobj.length; i++) {
      if (btobj[i].meta.AE_FullRemove) {
        $gameTemp.clearAreaElements();
      }
    }
    for (let i = 0; i < btobj.length; i++) {
      const addae = this.AEAdd(btobj[i]);
      if (btobj[i].meta.AE_VersusRemove) {
        let vsae = new Array();
        vsae.push(this.getVSAE(addae[i]));
        if (vsae.length > 0) {
          for (let j = 0; j < vsae.length; j++) {
            const vsaeindex = $gameTemp.AreaElements().indexOf(vsae[j]);
            if (vsaeindex !== -1) {
              $gameTemp.removeAreaElements(vsaeindex);
            } else {
              $gameTemp.addAreaElements(addae[j]);
            }
          }
        }
      } else {
        if (addae.length > 0) {
          for (let j = 0; j < addae.length; j++) {
            $gameTemp.addAreaElements(addae[j]);
          }
        }
      }
    }
    for (let i = 0; i < btobj.length; i++) {
      const remae = this.AERemove(btobj[i]);
      if (remae.length > 0) {
        for (let j = 0; j < remae.length; j++) {
          $gameTemp.removeAreaElements(remae[j]);
        }
      }
    }
  };

  //Game_Action
  const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
  Game_Action.prototype.calcElementRate = function (target) {
    const baseer = _Game_Action_calcElementRate.call(this, target);
    if (this.item().meta.AE_FullRemove) {
      aer = target.FullAreaElementRate();
    } else {
      aer = target.AreaElementRate(this.item().damage.elementId);
    }
    return baseer + aer;
  };

  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);
    const btobj = this.subject().traitObjects();
    traeaj = true;
    for (let i = 0; i < btobj.length; i++) {
      if (btobj[i].meta.AE_DontAdjust) {
        traeaj = false;
      }
    }
    if (traeaj == true && !this.item().meta.AE_DontAdjust) {
      this.subject().traitsAEChange();
    };
  };

  //Window_AreaElements
  function Window_AreaElements() {
    this.initialize.apply(this, arguments);
  }

  Window_AreaElements.prototype = Object.create(Window_Base.prototype);
  Window_AreaElements.prototype.constructor = Window_AreaElements;

  Window_AreaElements.prototype.initialize = function (x, y, width, height) {
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
  };

  Window_AreaElements.prototype.drawAEIcons = function (x, y) {
    const aenow = $gameTemp.AreaElements();
    for (let i = 0; i < aenow.length; i++) {
      const aesetindex = aesetting.filter(function ({ ElementId }) {
        return ElementId === aenow[i];
      });
      if (aesetindex.length > 0) {
        const aeicon = aesetindex[0].ElementIconId;
        this.drawIcon(aeicon, x + (aedistx * i), y + (aedisty * i));
      }
    }
  };

  Window_AreaElements.prototype.drawSAEIcons = function (x, y) {
    const saenow = $gameMap.StableAreaElements();
    for (let i = 0; i < saenow.length; i++) {
      const saesetindex = aesetting.filter(function ({ ElementId }) {
        return ElementId === saenow[i];
      });
      if (saesetindex.length > 0) {
        const saeicon = saesetindex[0].ElementIconId;
        this.drawIcon(saeicon, x + (aedistx * i), y + (aedisty * i));
      }
    }
  };

  Window_AreaElements.prototype.refresh = function () {
    this.contents.clear();
    if (aewbg) {
      const bitmap = ImageManager.loadSystem(aewbg);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    }
    let aex = aestx;
    let aey = aesty;
    let staex = staestx;
    let staey = staesty;
    if (staenum > 0) {
      if (saedp == "beforeae") {
        aex = staedistx + (aedistx * staenum);
        aey = staedisty + (aedisty * staenum);
      } else if (saedp == "aftereae") {
        staex = staedistx + (aedistx * aenum);
        staey = staedisty + (aedisty * aenum);
      }
    }
    this.drawAEIcons(aex, aey);
    if (staenum > 0 && saedp != "standalone") {
      this.drawSAEIcons(staex, staey);
    }
  };

  //Window_StableAreaElements
  function Window_StableAreaElements() {
    this.initialize.apply(this, arguments);
  }

  Window_StableAreaElements.prototype = Object.create(Window_AreaElements.prototype);
  Window_StableAreaElements.prototype.constructor = Window_StableAreaElements;

  Window_StableAreaElements.prototype.initialize = function (x, y, width, height) {
    Window_AreaElements.prototype.initialize.call(this, x, y, width, height);
    this.refresh();
  };

  Window_StableAreaElements.prototype.refresh = function () {
    this.contents.clear();
    if (staewbg) {
      const bitmap = ImageManager.loadSystem(staewbg);
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    }
    this.drawSAEIcons(staestx, staesty);
  };

  //Scene_Battle
  const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
  Scene_Battle.prototype.createAllWindows = function () {
    _Scene_Battle_createAllWindows.call(this);
    this.createAreaElementsWindow();
    if (staenum > 0 && saedp == "standalone") {
      this.createStableAreaElementsWindow();
    }
  };

  Scene_Battle.prototype.createAreaElementsWindow = function () {
    const rect = this.areaElementsWindowRect();
    const aeWindow = new Window_AreaElements(rect);
    this.addWindow(aeWindow);
    this._aeWindow = aeWindow;
    this._aeWindow.opacity = aeqop;
  };

  Scene_Battle.prototype.areaElementsWindowRect = function () {
    const ww = aewwidth;
    const wh = aewheight;
    const wx = aewx;
    const wy = aewy;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Battle.prototype.createStableAreaElementsWindow = function () {
    const rect = this.stableAreaElementsWindowRect();
    const staeWindow = new Window_StableAreaElements(rect);
    this.addWindow(staeWindow);
    this._staeWindow = staeWindow;
    this._staeWindow.opacity = staeqop;
  };

  Scene_Battle.prototype.stableAreaElementsWindowRect = function () {
    const ww = staewwidth;
    const wh = staewheight;
    const wx = staewx;
    const wy = staewy;
    return new Rectangle(wx, wy, ww, wh);
  };

  const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
  Scene_Battle.prototype.createDisplayObjects = function () {
    _Scene_Battle_createDisplayObjects.call(this);
    BattleManager.setAEWindow(this._aeWindow);
    if (staenum > 0 && saedp == "standalone") {
      BattleManager.setStableAEWindow(this._staeWindow);
    }
  };

  const _Scene_Battle_stop = Scene_Battle.prototype.stop;
  Scene_Battle.prototype.stop = function () {
    _Scene_Battle_stop.call(this);
    this._aeWindow.hide();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.hide();
    }
  };

  
  const _Scene_Battle_updateStatusWindowVisibility = Scene_Battle.prototype.updateStatusWindowVisibility;
  Scene_Battle.prototype.updateStatusWindowVisibility = function () {
    _Scene_Battle_updateStatusWindowVisibility.call(this);
    if ($gameMessage.isBusy()) {
      this._aeWindow.refresh();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.refresh();
      }
      if (aewsbm == "false") {
        this._aeWindow.hide();
        if (staenum > 0 && saedp == "standalone") {
          this._staeWindow.hide();
        }
      }
    } else if (this.shouldOpenStatusWindow()) {
      this._aeWindow.refresh();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.refresh();
      }
    }
  };

  const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
  Scene_Battle.prototype.startPartyCommandSelection = function() {
    this._aeWindow.show();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.show();
    }
    this._aeWindow.refresh();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.refresh();
    }
    _Scene_Battle_startPartyCommandSelection.call(this);
  };

  const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
  Scene_Battle.prototype.startActorCommandSelection = function() {
    this._aeWindow.show();
    if (staenum > 0 && saedp == "standalone") {
      this._staeWindow.show();
    }
    _Scene_Battle_startActorCommandSelection.call(this);
  };

  if (aewssel == "false") {
    const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
    Scene_Battle.prototype.commandSkill = function() {
      _Scene_Battle_commandSkill.call(this);
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
    };

    const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
    Scene_Battle.prototype.commandItem = function() {
      _Scene_Battle_commandItem.call(this);
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
    };

    const _Scene_Battle_selectActorSelection = Scene_Battle.prototype.selectActorSelection;
    Scene_Battle.prototype.selectActorSelection = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_selectActorSelection.call(this);
    };
  
    const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
      _Scene_Battle_onActorCancel.call(this);
    };
  
    const _Scene_Battle_selectEnemySelection = Scene_Battle.prototype.selectEnemySelection;
    Scene_Battle.prototype.selectEnemySelection = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_selectEnemySelection.call(this);
    };
  
    const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
      this._aeWindow.hide();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.hide();
      }
      _Scene_Battle_onEnemyCancel.call(this);
    };
  
    const _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
    Scene_Battle.prototype.onSkillOk = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_onSkillOk.call(this);
    };
  
    const _Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
    Scene_Battle.prototype.onSkillCancel = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_onSkillCancel.call(this);
    };
  
    const _Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
    Scene_Battle.prototype.onItemCancel = function() {
      this._aeWindow.show();
      if (staenum > 0 && saedp == "standalone") {
        this._staeWindow.show();
      }
      _Scene_Battle_onItemCancel.call(this);
    };
  }
})();
