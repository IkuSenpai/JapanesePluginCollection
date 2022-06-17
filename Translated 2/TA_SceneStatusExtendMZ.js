//=============================================================================
// TA_SceneStatusExtendMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Significantly customize the appearance of the status scene.
 * @author Tamaki Awana
 * @url https://razor-edge.work/
 * @help Significantly customize the appearance of the status scene.
 *
 * ･On the status scene, various ability values,
 *  element resist and state resist,
 *  and profile are displayed separately for each page.
 *  If you have some skill,
 *  you can modify the source code to add more pages on your own.
 * ･Function to display a standing picture of the file name corresponding
 *  to the face graphic currently set for the actor on the status screen will be added.
 * ･By pressing the key set in the plug-in parameter or
 *  clicking / tapping the standing picture itself,
 *  you can add the function to switch with another corresponding standing picture alternately.
 *  This function is intended for switching between small and large size images.
 * ･It is compatible with RMMZ plugin "GaugeShapeCustomize",
 *  and it is possible to change the shape of the gauge to the next level.
 *
 * How to add / set standing pictures:
 * Add the image file with the file name,
 * Face name set for actor + _(under bar) + face index set for actor
 * to the img/picture folder.
 * About face index set for actor, Please refer to the following notation.
 *
 *  0 1 2 3
 *  4 5 6 7
 *
 * Also, if you want to use a large-sized standing picture,
 * prepare the file with an identifier set in "STPictLargeLetters"
 * at the end of the file name of default sized standing picture
 * and put it in the img/picture folder.
 * Ex.Corresponds to the third from the lower left side of Actor2 → Actor2_6
 *    Large size corresponding to the first
 *    from the upper right side of Actor1 → Actor1_3_L
 *
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 *
 * Notions:
 * ･Due to the adjustable width of the status window,
 *  the width of the profile display can be very narrow,
 *  so it is recommended to use Triacontane′s plugin
 *  “UsableCarriageReturn“ together.
 * ･To prevent the standing picture file from
 *  being deleted by the unused material deletion function,
 *  it is recommended to use
 *  Triacontane′s plugin “ExcludeMaterialGuard“ together.
 * ･If you use a standing picture file with a width or height
 *  smaller than the value set in the plug-in parameter,
 *  the standing picture will not be displayed on the status screen
 *  even if it is successfully loaded.
 *  The size of the standing picture should match the value
 *  set in the plug-in parameter.
 *
 * Update History:
 * ver.1.1   Added a custom parameters page function.
 *           Changed the default setting of opacity parameters for any windows to 255.
 *           Added a function which setting to insert a blank line
 *            between each any resists at state & element resits page.
 *           Fixed a bug in the "GaugeShapeCustomize" support function.
 * ver.1.0.2 In the japanese version, refined the plugin parameter description.
 *           Added the function to switch the display setting of the standing picture.
 *           Pre-loading process of standing pictures has been optimized.
 *           Code optimized.
 * ver.1.0.1 Fixed a bug that the display order of any parameters was out of order.
 *           In the japanese version, Corrected a typographical error
 *            in the plugin parameter description.
 *           Fixed omission of help.
 *           Code optimized.
 * ver.1.0   Released.
 *
 * ---
 *
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 *
 * @param StatusBackground
 * @desc Background on Scene_Status. Select "None" to disable it.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 *
 * @param StatusForeground
 * @desc Foreground on Scene_Status. Select "None" to disable it.
 * @type file
 * @require 1
 * @dir img/system
 * @default
 *
 * @param StatusWindow
 * @desc Status window setting.
 *
 * @param WStatusX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of status window.
 * @default 0
 * @parent StatusWindow
 *
 * @param WStatusY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of status window.
 * @default 120
 * @parent StatusWindow
 *
 * @param WStatusWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of status window.
 * @default 404
 * @parent StatusWindow
 *
 * @param WStatusHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of status window.
 * @default 208
 * @parent StatusWindow
 *
 * @param WStatusOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of status window.
 * @default 255
 * @parent StatusWindow
 *
 * @param StatusDetailWindow
 * @desc Status detail window setting
 *
 * @param WStatusDetailX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of status detail window.
 * @default 0
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of status detail window.
 * @default 328
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of status detail window.
 * @default 404
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of status detail window.
 * @default 288
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of status detail window.
 * @default 255
 * @parent StatusDetailWindow
 *
 * @param HITandEVASystemTerm
 * @desc Which setting to use when displaying hit rate and evasion terms.
 * @type boolean
 * @on System Terms
 * @off Plugin Settings
 * @default true
 * @parent StatusDetailWindow
 *
 * @param EXP
 * @desc Exp setting
 * @parent StatusDetailWindow
 *
 * @param ExpHeader
 * @desc Header of Exp
 * @default EXP.
 * @parent EXP
 *
 * @param ExpNextGaugeVisible
 * @desc Gauge to the next level.
 * @type boolean
 * @on Show
 * @off Don't Show
 * @default true
 * @parent EXP
 *
 * @param ExpNextGaugeColor1
 * @desc Text color number of left side of gauge gradient to the next level.
 * @default 30
 * @parent EXP
 *
 * @param ExpNextGaugeColor2
 * @desc Text color number of right side of gauge gradient to the next level.
 * @default 31
 * @parent EXP
 *
 * @param Next EXP Gauge Shape
 * @desc Shape of the Next Level gauge. Only valid when "GaugeShapeCustomize" is turned on.
 * @default
 * @parent EXP
 *
 * @param Parameters
 * @desc Parameters setting.
 * @parent StatusDetailWindow
 *
 * @param ParametersHeader
 * @desc Header of Parameters.
 * @default Parameters
 * @parent Parameters
 *
 * @param ParametersList
 * @desc List of parameters you want to display.
 * @type struct<ParamList>[]
 * @default ["{\"ParameterId\":\"2\"}","{\"ParameterId\":\"3\"}","{\"ParameterId\":\"4\"}","{\"ParameterId\":\"5\"}","{\"ParameterId\":\"6\"}","{\"ParameterId\":\"7\"}"]
 * @parent Parameters
 *
 * @param ParametersLines
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of lines of parameters.
 * @default 6
 * @parent Parameters
 *
 * @param ParametersCols
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of columns of parameters.
 * @default 1
 * @parent Parameters
 *
 * @param ParametersNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of name of parameters.
 * @default 160
 * @parent Parameters
 *
 * @param ParametersValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of value of parameters.
 * @default 50
 * @parent Parameters
 *
 * @param ParametersMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc Margin of parameters.
 * @default 0
 * @parent Parameters
 *
 * @param ExParameters
 * @desc Ex-parameters setting.
 * @parent StatusDetailWindow
 *
 * @param ExParametersHeader
 * @desc Header of Ex-parameters.
 * @default Extra Parameters
 * @parent ExParameters
 *
 * @param ExParametersList
 * @desc List of ex-parameters you want to display.
 * @type struct<ExParamList>[]
 * @default ["{\"ExParamName\":\"Hit Rate\",\"ExParamId\":\"0\"}","{\"ExParamName\":\"Evasion Rate\",\"ExParamId\":\"1\"}","{\"ExParamName\":\"Critical Rate\",\"ExParamId\":\"2\"}","{\"ExParamName\":\"Cri. Evasion\",\"ExParamId\":\"3\"}","{\"ExParamName\":\"Mag. Evasion\",\"ExParamId\":\"4\"}","{\"ExParamName\":\"Mag. Reflection\",\"ExParamId\":\"5\"}","{\"ExParamName\":\"Counter Rate\",\"ExParamId\":\"6\"}","{\"ExParamName\":\"HP Regeneration\",\"ExParamId\":\"7\"}","{\"ExParamName\":\"MP Regeneration\",\"ExParamId\":\"8\"}","{\"ExParamName\":\"TP Regeneration\",\"ExParamId\":\"9\"}"]
 * @parent ExParameters
 *
 * @param ExParamLines
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of lines of ex-parameters.
 * @default 5
 * @parent ExParameters
 *
 * @param ExParamCols
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of columns of ex-parameters.
 * @default 2
 * @parent ExParameters
 *
 * @param ExParamNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of name of ex-parameters.
 * @default 110
 * @parent ExParameters
 *
 * @param ExParamValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of value of ex-parameters.
 * @default 50
 * @parent ExParameters
 *
 * @param ExParamMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc Margin of ex-parameters.
 * @default 30
 * @parent ExParameters
 *
 * @param SpParameters
 * @desc Sp-parameters setting.
 * @parent StatusDetailWindow
 *
 * @param SpParametersHeader
 * @desc Header of sp-parameters.
 * @default Special Parameters
 * @parent SpParameters
 *
 * @param SpParametersList
 * @desc List of sp-parameters you want to display.
 * @type struct<SpParamList>[]
 * @default ["{\"SpParamName\":\"Target Rate\",\"SpParamId\":\"0\"}","{\"SpParamName\":\"Grd. Effect Rate\",\"SpParamId\":\"1\"}","{\"SpParamName\":\"Rec. Effect Rate\",\"SpParamId\":\"2\"}","{\"SpParamName\":\"Pharmacology\",\"SpParamId\":\"3\"}","{\"SpParamName\":\"Mp Cost Rate\",\"SpParamId\":\"4\"}","{\"SpParamName\":\"TP Charge Rate\",\"SpParamId\":\"5\"}","{\"SpParamName\":\"Phy. Damage Rate\",\"SpParamId\":\"6\"}","{\"SpParamName\":\"Mag. Damage Rate\",\"SpParamId\":\"7\"}","{\"SpParamName\":\"Floor Damage Rate\",\"SpParamId\":\"8\"}","{\"SpParamName\":\"EXP. Rate\",\"SpParamId\":\"9\"}"]
 * @parent SpParameters
 *
 * @param SpParamLines
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of lines of sp-parameters.
 * @default 5
 * @parent SpParameters
 *
 * @param SpParamCols
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of columns of sp-parameters.
 * @default 2
 * @parent SpParameters
 *
 * @param SpParamNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of name of sp-parameters.
 * @default 110
 * @parent SpParameters
 *
 * @param SpParamValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of value of sd-parameters.
 * @default 50
 * @parent SpParameters
 *
 * @param SpParamMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc Margin of ex-parameters.
 * @default 30
 * @parent SpParameters
 * 
 * @param CustomParams
 * @desc Custom parameters page setting.
 * @default 
 * @parent StatusDetailWindow
 * 
 * @param CustomParamsHeader
 * @desc Header of the custom parameters page. It is displayed before the header of each parameters.
 * @default Parameters
 * @parent CustomParams
 *
 * @param Resists
 * @desc Any resists setting.
 * @parent StatusDetailWindow
 * 
 * @param ResistsBlankLine
 * @desc Which setting to insert a blank line between each any resists at state & element resits page.
 * @type boolean
 * @on Insert
 * @off Don't insert
 * @default true
 * @parent Resists
 * 
 * @param StateResist
 * @desc State resist setting.
 * @parent Resists
 *
 * @param StateResistHeader
 * @desc Header of state resist.
 * @default State Resist Rates
 * @parent StateResist
 *
 * @param StateResistList
 * @desc List of state resists you want to display.
 * @type struct<StateList>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent StateResist
 *
 * @param StateResistCols
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of columns per row of state resist.
 * @default 3
 * @parent StateResist
 *
 * @param StateResistValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of value of state resist.
 * @default 60
 * @parent StateResist
 *
 * @param StateResistMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc Margin of state resist.
 * @default 20
 * @parent StateResist
 *
 * @param ElementResist
 * @desc Element resist setting.
 * @parent Resists
 *
 * @param ElementResistHeader
 * @desc Header of element resist.
 * @default Element Resist Rates
 * @parent ElementResist
 *
 * @param ElementResistList
 * @desc List of element resists you want to display.
 * @type struct<ElementList>[]
 * @default ["{\"ElementId\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementId\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementId\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementId\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementId\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementId\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementId\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementId\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementId\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ElementResist
 *
 * @param ElementResistCols
 * @type number
 * @min 1
 * @max 9007
 * @desc Number of columns per row of element resist.
 * @default 3
 * @parent ElementResist
 *
 * @param ElementResistValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of value of element resist.
 * @default 60
 * @parent ElementResist
 *
 * @param ElementResistMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc Margin of element resist.
 * @default 30
 * @parent ElementResist
 *
 * @param Equipments
 * @desc Equipments setting.
 * @parent StatusDetailWindow
 *
 * @param EquipmentsHeader
 * @desc Header of equipments.
 * @default Equipments
 * @parent Equipments
 *
 * @param MaxEquipments
 * @type number
 * @min 0
 * @max 9007
 * @desc Max Number of equipments.
 * @default 6
 * @parent Equipments
 *
 * @param SlotNameVisible
 * @desc Which setting to display actor's slots name.
 * @type boolean
 * @on Show
 * @off Don't show
 * @default true
 * @parent Equipments
 *
 * @param SlotNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of slot name when displaying actor's slot name.
 * @default 138
 * @parent SlotNameVisible
 *
 * @param ProfileHeader
 * @desc Header of profile.
 * @default Profile
 * @parent StatusDetailWindow
 *
 * @param PageSelectWindow
 * @desc Page select window setting.
 *
 * @param PageSelectWindowVisible
 * @desc Setting about the page select window.
 * @type boolean
 * @on Show
 * @off Don't show
 * @default true
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of page select window.
 * @default 0
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of page select window.
 * @default 52
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of page select window.
 * @default 808
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of page select window.
 * @default 68
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowMaxCols
 * @type number
 * @min 0
 * @max 9007
 * @desc Number of columns per row on page select window.
 * If you set "0", display all set items on one line.
 * @default 0
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity of page select window.
 * @default 255
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowList
 * @desc List of pages you want to display on page select window.
 * @type struct<PageList>[]
 * @default ["{\"PageContents\":\"Exp\",\"PageName\":\"Experience\"}","{\"PageContents\":\"Param\",\"PageName\":\"Parameters\"}","{\"PageContents\":\"ExParam\",\"PageName\":\"Ex Parameters\"}","{\"PageContents\":\"SpParam\",\"PageName\":\"Sp Parameters\"}","{\"PageContents\":\"StateResist\",\"PageName\":\"State Resists\"}","{\"PageContents\":\"ElementResist\",\"PageName\":\"Ele. Resists\"}","{\"PageContents\":\"Equips\",\"PageName\":\"Equipments\"}","{\"PageContents\":\"Profile\",\"PageName\":\"Profile\"}"]
 * @parent PageSelectWindow
 *
 * @param StandingPicture
 * @desc Standing picture setting.
 *
 * @param STPictShow
 * @desc Setting about standing picture.
 * @type boolean
 * @on Show
 * @off Don't show
 * @default true
 * @parent StandingPicture
 * 
 * @param StandingPictureX
 * @type number
 * @min -9007
 * @max 9007
 * @desc X coordinate of standing picture.
 * @default 404
 * @parent StandingPicture
 *
 * @param StandingPictureY
 * @type number
 * @min -9007
 * @max 9007
 * @desc Y coordinate of standing picture.
 * @default 120
 * @parent StandingPicture
 *
 * @param StandingPictureWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc Width of standing picture.
 * @default 412
 * @parent StandingPicture
 *
 * @param StandingPictureHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc Height of standing picture.
 * @default 504
 * @parent StandingPicture
 *
 * @param STPictChange
 * @desc Which setting to use standing picture changing function.
 * @type boolean
 * @on Yes
 * @off No
 * @default true
 * @parent StandingPicture
 *
 * @param STPictChangeKey
 * @desc Key for changing standing picture.
 * @default ok
 * @parent STPictChange
 *
 * @param STPictChangeSE
 * @desc SE on changing standing picture. Select "None" to disable it.
 * @type file
 * @require 1
 * @dir audio/se
 * @default Cursor3
 * @parent STPictChange
 *
 * @param STPictChangeSEVolume
 * @desc Volume of SE on changing standing picture.
 * @default 90
 * @parent STPictChange
 *
 * @param STPictChangeSEPitch
 * @desc Pitch of SE on changing standing picture.
 * @default 100
 * @parent STPictChange
 *
 * @param STPictChangeSEPan
 * @desc Pan of SE on changing standing picture.
 * @default 0
 * @parent STPictChange
 *
 * @param STPictLargeLetters
 * @desc Identifier at the end of the large size standing picture file.
 * @default _L
 * @parent STPictChange
 *
 */
/*~struct~ElementList:
 * @param ElementId
 * @type number
 * @min 1
 * @max 9007
 * @desc ID of element you want to display.
 * @default 1
 *
 * @param ElementIconId
 * @desc Icon of element.
 * @default 0
 */
/*~struct~ExParamList:
* @param ExParamId
* @type select
* @option HIT rate
* @value 0
* @option EVAsion rate
* @value 1
* @option CRItical rate
* @value 2
* @option Critical EVasion rate
* @value 3
* @option Magic EVasion rate
* @value 4
* @option Magic ReFlection rate
* @value 5
* @option CouNTer attack rate
* @value 6
* @option Hp ReGeneration rate
* @value 7
* @option Mp ReGeneration rate
* @value 8
* @option Tp ReGeneration rate
* @value 9
* @default 0
* @desc Ex-parameter you want to display.

* @param ExParamName
* @desc Ex-parameter terms.
* @default 
*/
/*~struct~SpParamList:
 * @param SpParamId
 * @type select
 * @option TarGet Rate
 * @value 0
 * @option GuaRD effect rate
 * @value 1
 * @option RECovery effect rate
 * @value 2
 * @option PHArmacology
 * @value 3
 * @option Mp Cost Rate
 * @value 4
 * @option Tp Charge Rate
 * @value 5
 * @option Physical Damage Rate
 * @value 6
 * @option Magical Damage Rate
 * @value 7
 * @option Floor Damage Rate
 * @value 8
 * @option EXperience Rate
 * @value 9
 * @default 0
 * @desc Sp-parameter you want to display.
 *
 * @param SpParamName
 * @default
 * @desc Sp-parameter terms.
 */
/*~struct~StateList:
 * @param StateId
 * @type state
 * @default 0
 * @desc ID of state you want to display.
 */
/*~struct~ParamList:
 * @param ParameterId
 * @type select
 * @option Max HP
 * @value 0
 * @option Max MP
 * @value 1
 * @option Attack
 * @value 2
 * @option DEFense
 * @value 3
 * @option Magic ATtack
 * @value 4
 * @option Magic DeFense
 * @value 5
 * @option AGIlity
 * @value 6
 * @option LUcK
 * @value 7
 * @default 0
 * @desc Parameter you want to display.
 */
/*~struct~PageList:
 * @param PageContents
 * @type select
 * @option Exp
 * @value Exp
 * @option Parameters
 * @value Param
 * @option Ex Parameters
 * @value ExParam
 * @option Sp Parameters
 * @value SpParam
 * @option State Resits
 * @value StateResist
 * @option Element Resits
 * @value ElementResist
 * @option State & Element Resits
 * @value Resists
 * @option Equipments
 * @value Equips
 * @option Profile
 * @value Profile
 * @option Custom Parameters Page
 * @value CustomParam
 * @default Exp
 * @desc Page you want to display page select window.
 *
 * @param PageName
 * @desc Name of you want to display page select window.
 * @default
 */
/*:ja
 * @target MZ
 * @plugindesc ステータス画面の見た目を大幅に改変します。
 * @author 沫那環
 * @url https://razor-edge.work/
 * @help ステータス画面の見た目を大幅に改変します。
 *
 * ・ステータス画面に、各種能力値、属性有効度やステート有効度、プロフィールを
 * 　それぞれページごとに分けて表示します。
 * 　腕がある方は、ソースコードを改造して、オリジナルのページを増やすことも可能です。
 * ・アクターに現在設定されている顔グラに応じたファイル名の立ち絵を、
 * 　ステータス画面に表示する機能を追加します。
 * ・プラグインパラメータで設定したキーを押したり、
 * 　立ち絵自体をクリック・タップしたりすることで、
 * 　対応するもう一枚の立ち絵に切り替える機能をつけられます。
 * 　こちらの機能は、スモールサイズとラージサイズの画像の切り替えを想定しています。
 * ・MZ用プラグイン「GaugeShapeCustomize」に対応しており、
 * 　次のレベルまでのゲージの形状を変更することが可能です。
 *
 * 【立ち絵の追加・設定方法】
 * 　img/pictureフォルダに、
 * 　アクターに設定している顔グラのファイル名 + _（アンダーバー） + 顔グラの配列位置
 * 　というファイル名にした画像ファイルを入れてください。
 * 　また、ラージサイズの立ち絵も使用する場合、
 * 　上記のファイル名の末尾にSTPictLargeLettersで設定した
 * 　識別子を付けたものも用意して、img/pictureフォルダに入れてください。
 * 　アクターに設定している顔グラの配列については、以下を参考にしてください。
 * 　0 1 2 3
 * 　4 5 6 7
 * 　例　Actor2の下段左側から3つ目の顔グラに対応→Actor2_6
 * 　　　Actor1の上段右側から1つ目の顔グラに対応するラージサイズ→Actor1_3_L
 *
 * 【プラグインコマンドについて】
 * 　このプラグインに、プラグインコマンドはありません。
 *
 * 【注意】
 * 　・ステータスウィンドウの幅を調節できるという性質上、
 * 　　プロフィールを表示する幅が非常に狭くなる場合があるので、
 * 　　トリアコンタンさん作のプラグイン「UsableCarriageReturn」を
 * 　　一緒に利用することをおすすめします。
 * 　・未使用素材削除機能で立ち絵ファイルが削除されてしまうことを防ぐために、
 * 　　トリアコンタンさん作のプラグイン「ExcludeMaterialGuard」を
 * 　　一緒に利用することをおすすめします。
 * 　・プラグインパラメータで設定した数値より小さな幅や高さの立ち絵ファイルを使用すると、
 * 　　立ち絵の読み込みが成功していても、ステータス画面上に表示されません。
 * 　　立ち絵のサイズは、プラグインパラメータで設定した数値に合わせるようにしてください。
 *
 * 【更新履歴】
 *   ver.1.1   カスタム能力値ページ機能を追加。
 *             各種ウィンドウの透明度パラメータの標準設定を、255に変更。
 *             状態異常・属性有効度ページにて、それぞれの有効度の間に空行をはさむか
 *             どうかを設定するパラメータを追加。
 *             GaugeShapeCustomize対応機能のバグを修正。
 *   var.1.0.2 日本語版における、プラグインパラメータの説明文を改定。
 *             立ち絵の表示設定を切り替える機能を追加。
 *             立ち絵の事前読み込み処理を最適化。
 *             コードの最適化。
 * 　ver.1.0.1 各種能力値の表示順番がくずれていた不具合を修正。
 * 　　　　　　 日本語版における、プラグインパラメータの説明文の誤字を修正。
 * 　　　　　　 ヘルプの表記漏れを修正。
 * 　　　　　　 コードの最適化。
 * 　ver.1.0   公開
 *
 * ---
 *
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 *
 * @param StatusBackground
 * @desc ステータス画面の背景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 *
 * @param StatusForeground
 * @desc ステータス画面の前景です。「なし」で無効になります。
 * @type file
 * @require 1
 * @dir img/system
 * @default
 *
 * @param StatusWindow
 * @desc ステータスウィンドウのパラメーター設定です。
 *
 * @param WStatusX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ステータスウィンドウのX座標です。
 * @default 0
 * @parent StatusWindow
 *
 * @param WStatusY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ステータスウィンドウのY座標です。
 * @default 120
 * @parent StatusWindow
 *
 * @param WStatusWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ステータスウィンドウの横幅です。
 * @default 404
 * @parent StatusWindow
 *
 * @param WStatusHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ステータスウィンドウの高さです。
 * @default 208
 * @parent StatusWindow
 *
 * @param WStatusOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc ステータスウィンドウの透明度です。
 * @default 255
 * @parent StatusWindow
 *
 * @param StatusDetailWindow
 * @desc ステータス詳細ウィンドウのパラメーター設定です。
 *
 * @param WStatusDetailX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ステータス詳細ウィンドウのX座標です。
 * @default 0
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ステータス詳細ウィンドウのY座標です。
 * @default 328
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ステータス詳細ウィンドウの横幅です。
 * @default 404
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ステータス詳細ウィンドウの高さです。
 * @default 288
 * @parent StatusDetailWindow
 *
 * @param WStatusDetailOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc ステータス詳細ウィンドウの透明度です。
 * @default 255
 * @parent StatusDetailWindow
 *
 * @param HITandEVASystemTerm
 * @desc 命中率と回避率の用語表示に、システムの用語欄で設定したものを優先して使うかどうかを設定します。
 * @type boolean
 * @on システム側を優先
 * @off プラグイン側を優先
 * @default true
 * @parent StatusDetailWindow
 *
 * @param EXP
 * @desc 経験値のパラメーター設定です。
 * @parent StatusDetailWindow
 *
 * @param ExpHeader
 * @desc 経験値欄の見出しです。
 * @default 経験値
 * @parent EXP
 *
 * @param ExpNextGaugeVisible
 * @desc 次のレベルまでのゲージを表示するかどうかを設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * @parent EXP
 *
 * @param ExpNextGaugeColor1
 * @desc 次のレベルまでのゲージのグラデーションの左側のテキストカラー番号を設定します。
 * @default 30
 * @parent EXP
 *
 * @param ExpNextGaugeColor2
 * @desc 次のレベルまでのゲージのグラデーションの右側のテキストカラー番号を設定します。
 * @default 31
 * @parent EXP
 *
 * @param Next EXP Gauge Shape
 * @desc 次のレベルまでのゲージの形状を設定します。「GaugeShapeCustomize」をオンにしている時のみ有効です。
 * @default
 * @parent EXP
 *
 * @param Parameters
 * @desc 能力値のパラメーター設定です。
 * @parent StatusDetailWindow
 *
 * @param ParametersHeader
 * @desc 能力値欄の見出しです。
 * @default 能力値
 * @parent Parameters
 *
 * @param ParametersList
 * @desc 表示したい能力値のリストです。
 * @type struct<ParamList>[]
 * @default ["{\"ParameterId\":\"2\"}","{\"ParameterId\":\"3\"}","{\"ParameterId\":\"4\"}","{\"ParameterId\":\"5\"}","{\"ParameterId\":\"6\"}","{\"ParameterId\":\"7\"}"]
 * @parent Parameters
 *
 * @param ParametersLines
 * @type number
 * @min 1
 * @max 9007
 * @desc 能力値の行数です。
 * @default 6
 * @parent Parameters
 *
 * @param ParametersCols
 * @type number
 * @min 1
 * @max 9007
 * @desc 能力値の列数です。
 * @default 1
 * @parent Parameters
 *
 * @param ParametersNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の項目名の幅です。
 * @default 160
 * @parent Parameters
 *
 * @param ParametersValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値の値の幅です。
 * @default 50
 * @parent Parameters
 *
 * @param ParametersMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc 能力値同士の間隔です。
 * @default 0
 * @parent Parameters
 *
 * @param ExParameters
 * @desc 追加能力値のパラメーター設定です。
 * @parent StatusDetailWindow
 *
 * @param ExParametersHeader
 * @desc 追加能力値欄の見出しです。
 * @default 追加能力値
 * @parent ExParameters
 *
 * @param ExParametersList
 * @desc 表示したい追加能力値のリストです。
 * @type struct<ExParamList>[]
 * @default ["{\"ExParamName\":\"命中率\",\"ExParamId\":\"0\"}","{\"ExParamName\":\"回避率\",\"ExParamId\":\"1\"}","{\"ExParamName\":\"会心率\",\"ExParamId\":\"2\"}","{\"ExParamName\":\"会心回避率\",\"ExParamId\":\"3\"}","{\"ExParamName\":\"魔法回避率\",\"ExParamId\":\"4\"}","{\"ExParamName\":\"魔法反射率\",\"ExParamId\":\"5\"}","{\"ExParamName\":\"反撃率\",\"ExParamId\":\"6\"}","{\"ExParamName\":\"HP再生率\",\"ExParamId\":\"7\"}","{\"ExParamName\":\"MP再生率\",\"ExParamId\":\"8\"}","{\"ExParamName\":\"TP再生率\",\"ExParamId\":\"9\"}"]
 * @parent ExParameters
 *
 * @param ExParamLines
 * @type number
 * @min 1
 * @max 9007
 * @desc 追加能力値の行数です。
 * @default 5
 * @parent ExParameters
 *
 * @param ExParamCols
 * @type number
 * @min 1
 * @max 9007
 * @desc 追加能力値の列数です。
 * @default 2
 * @parent ExParameters
 *
 * @param ExParamNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 追加能力値の項目名の幅です。
 * @default 110
 * @parent ExParameters
 *
 * @param ExParamValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 追加能力値の値の幅です。
 * @default 50
 * @parent ExParameters
 *
 * @param ExParamMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc 追加能力値同士の間隔です。
 * @default 30
 * @parent ExParameters
 *
 * @param SpParameters
 * @desc 特殊能力値のパラメーター設定です。
 * @parent StatusDetailWindow
 *
 * @param SpParametersHeader
 * @desc 特殊能力値欄の見出しです。
 * @default 特殊能力値
 * @parent SpParameters
 *
 * @param SpParametersList
 * @desc 表示したい特殊能力値のリストです。
 * @type struct<SpParamList>[]
 * @default ["{\"SpParamName\":\"狙われやすさ\",\"SpParamId\":\"0\"}","{\"SpParamName\":\"防御効果\",\"SpParamId\":\"1\"}","{\"SpParamName\":\"回復効果\",\"SpParamId\":\"2\"}","{\"SpParamName\":\"薬の知識\",\"SpParamId\":\"3\"}","{\"SpParamName\":\"MP消費\",\"SpParamId\":\"4\"}","{\"SpParamName\":\"TPチャージ率\",\"SpParamId\":\"5\"}","{\"SpParamName\":\"物理ダメージ率\",\"SpParamId\":\"6\"}","{\"SpParamName\":\"魔法ダメージ率\",\"SpParamId\":\"7\"}","{\"SpParamName\":\"床ダメージ率\",\"SpParamId\":\"8\"}","{\"SpParamName\":\"獲得経験率\",\"SpParamId\":\"9\"}"]
 * @parent SpParameters
 *
 * @param SpParamLines
 * @type number
 * @min 1
 * @max 9007
 * @desc 特殊能力値の行数です。
 * @default 5
 * @parent SpParameters
 *
 * @param SpParamCols
 * @type number
 * @min 1
 * @max 9007
 * @desc 特殊能力値の列数です。
 * @default 2
 * @parent SpParameters
 *
 * @param SpParamNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 特殊能力値の項目名の幅です。
 * @default 110
 * @parent SpParameters
 *
 * @param SpParamValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 特殊能力値の値の幅です。
 * @default 50
 * @parent SpParameters
 *
 * @param SpParamMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc 特殊能力値同士の間隔です。
 * @default 30
 * @parent SpParameters
 * 
 * @param CustomParams
 * @desc カスタム能力値ページのパラメーター設定です。
 * @default 
 * @parent StatusDetailWindow
 * 
 * @param CustomParamsHeader
 * @desc カスタム能力値ページの見出しです。各能力値の見出しより先に表示されます。
 * @default 能力値
 * @parent CustomParams
 *
 * @param Resists
 * @desc 各種有効度のパラメーター設定です。
 * @param StatusDetailWindow
 * 
 * @param ResistsBlankLine
 * @desc 状態異常・属性有効度ページにて、それぞれの有効度の間に空行をはさむかどうか。
 * @type boolean
 * @on はさむ
 * @off はさまない
 * @default true
 * @parent Resists
 * 
 * @param Resists
 * @desc ステート有効度のパラメーター設定です。
 * @parent StatusDetailWindow
 *
 * @param StateResistHeader
 * @desc ステート有効度欄の見出しです。
 * @default 状態異常有効度
 * @parent StateResist
 *
 * @param StateResistList
 * @desc 有効度を表示するステートのリストです。
 * @type struct<StateList>[]
 * @default ["{\"StateId\":\"1\"}","{\"StateId\":\"4\"}","{\"StateId\":\"5\"}","{\"StateId\":\"6\"}","{\"StateId\":\"7\"}","{\"StateId\":\"8\"}","{\"StateId\":\"9\"}","{\"StateId\":\"10\"}","{\"StateId\":\"12\"}","{\"StateId\":\"13\"}"]
 * @parent StateResist
 *
 * @param StateResistCols
 * @type number
 * @min 1
 * @max 9007
 * @desc ステート有効度の1行あたりの列数です。
 * @default 3
 * @parent StateResist
 *
 * @param StateResistValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ステート有効度の値の幅です。
 * @default 60
 * @parent StateResist
 *
 * @param StateResistMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc ステート有効度同士の間隔です。
 * @default 20
 * @parent StateResist
 *
 * @param ElementResist
 * @desc 属性有効度のパラメーター設定です。
 * @parent Resists
 *
 * @param ElementResistHeader
 * @desc 属性有効度欄の見出しです。
 * @default 属性有効度
 * @parent ElementResist
 *
 * @param ElementResistList
 * @desc 有効度を表示する属性のリストです。
 * @type struct<ElementList>[]
 * @default ["{\"ElementId\":\"1\",\"ElementIconId\":\"76\"}","{\"ElementId\":\"2\",\"ElementIconId\":\"64\"}","{\"ElementId\":\"3\",\"ElementIconId\":\"65\"}","{\"ElementId\":\"4\",\"ElementIconId\":\"66\"}","{\"ElementId\":\"5\",\"ElementIconId\":\"67\"}","{\"ElementId\":\"6\",\"ElementIconId\":\"68\"}","{\"ElementId\":\"7\",\"ElementIconId\":\"69\"}","{\"ElementId\":\"8\",\"ElementIconId\":\"70\"}","{\"ElementId\":\"9\",\"ElementIconId\":\"71\"}"]
 * @parent ElementResist
 *
 * @param ElementResistCols
 * @type number
 * @min 1
 * @max 9007
 * @desc 属性有効度の1行あたりの列数です。
 * @default 3
 * @parent ElementResist
 *
 * @param ElementResistValueWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 属性有効度の値の幅です。
 * @default 60
 * @parent ElementResist
 *
 * @param ElementResistMargin
 * @type number
 * @min 0
 * @max 9007
 * @desc 属性有効度同士の間隔です。
 * @default 30
 * @parent ElementResist
 *
 * @param Equipments
 * @desc 装備欄のパラメーター設定です。
 * @parent StatusDetailWindow
 *
 * @param EquipmentsHeader
 * @desc 装備欄の見出しです。
 * @default 現在の装備
 * @parent Equipments
 *
 * @param maxEquipments
 * @type number
 * @min 0
 * @max 9007
 * @desc 表示する装備欄の最大数です。
 * @default 6
 * @parent Equipments
 *
 * @param SlotNameVisible
 * @desc アクターのスロット名を表示するかどうかを設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * @parent Equipments
 *
 * @param SlotNameWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc アクターのスロット名を表示するときのスロット名の幅です。
 * @default 138
 * @parent SlotNameVisible
 *
 * @param ProfileHeader
 * @desc プロフィール欄の見出しです。
 * @default プロフィール
 * @parent StatusDetailWindow
 *
 * @param PageSelectWindow
 * @desc ページ選択ウィンドウのパラメーター設定です。
 *
 * @param PageSelectWindowVisible
 * @desc ページ選択ウィンドウを表示するかどうかを設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowX
 * @type number
 * @min -9007
 * @max 9007
 * @desc ページ選択ウィンドウのX座標です。
 * @default 0
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowY
 * @type number
 * @min -9007
 * @max 9007
 * @desc ページ選択ウィンドウのY座標です。
 * @default 52
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc ページ選択ウィンドウの幅です。
 * @default 808
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc ページ選択ウィンドウの高さです。
 * @default 68
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowMaxCols
 * @type number
 * @min 0
 * @max 9007
 * @desc ページ選択ウィンドウの一行あたりに表示する項目数です。
 * 0を指定すると、設定した項目全てを一行に表示します。
 * @default 0
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowOpacity
 * @type number
 * @min 0
 * @max 255
 * @desc ページ選択ウィンドウの透明度です。
 * @default 255
 * @parent PageSelectWindow
 *
 * @param PageSelectWindowList
 * @desc 表示させるページのリストです。
 * @type struct<PageList>[]
 * @default ["{\"PageContents\":\"Exp\",\"PageName\":\"経験値\"}","{\"PageContents\":\"Param\",\"PageName\":\"能力値\"}","{\"PageContents\":\"ExParam\",\"PageName\":\"追加能力値\"}","{\"PageContents\":\"SpParam\",\"PageName\":\"特殊能力値\"}","{\"PageContents\":\"StateResist\",\"PageName\":\"ST有効度\"}","{\"PageContents\":\"ElementResist\",\"PageName\":\"属性有効度\"}","{\"PageContents\":\"Equips\",\"PageName\":\"装備\"}","{\"PageContents\":\"Profile\",\"PageName\":\"プロフィール\"}"]
 * @parent PageSelectWindow
 *
 * @param StandingPicture
 * @desc 立ち絵のパラメーター設定です。
 *
 * @param STPictShow
 * @desc 立ち絵を表示するかどうかを設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * @parent StandingPicture
 * 
 * @param StandingPictureX
 * @type number
 * @min -9007
 * @max 9007
 * @desc 立ち絵のX座標です。
 * @default 404
 * @parent StandingPicture
 *
 * @param StandingPictureY
 * @type number
 * @min -9007
 * @max 9007
 * @desc 立ち絵のY座標です。
 * @default 120
 * @parent StandingPicture
 *
 * @param StandingPictureWidth
 * @type number
 * @min 0
 * @max 9007
 * @desc 立ち絵の幅です。
 * @default 412
 * @parent StandingPicture
 *
 * @param StandingPictureHeight
 * @type number
 * @min 0
 * @max 9007
 * @desc 立ち絵の高さです。
 * @default 504
 * @parent StandingPicture
 *
 * @param STPictChange
 * @desc 立ち絵の切り替え機能を使用するかどうかを設定します。
 * @type boolean
 * @on 使用する
 * @off 使用しない
 * @default true
 * @parent StandingPicture
 *
 * @param STPictChangeKey
 * @desc 立ち絵の切り替えに使うキーです。
 * @default ok
 * @parent STPictChange
 *
 * @param STPictChangeSE
 * @desc 立ち絵の切り替え時に再生する効果音です。
 * 空欄でオフ
 * @type file
 * @require 1
 * @dir audio/se
 * @default Cursor3
 * @parent STPictChange
 *
 * @param STPictChangeSEVolume
 * @desc 立ち絵の切り替え時に再生する効果音の音量です。
 * @default 90
 * @parent STPictChange
 *
 * @param STPictChangeSEPitch
 * @desc 立ち絵の切り替え時に再生する効果音のピッチです。
 * @default 100
 * @parent STPictChange
 *
 * @param STPictChangeSEPan
 * @desc 立ち絵の切り替え時に再生する効果音の位相です。
 * @default 0
 * @parent STPictChange
 *
 * @param STPictLargeLetters
 * @desc ラージサイズな立ち絵ファイル末尾の識別子です。
 * @default _L
 * @parent STPictChange
 *
 */
/*~struct~ElementList:ja
 * @param ElementId
 * @type number
 * @min 1
 * @max 9007
 * @desc 表示させたい属性のIDです。
 * @default 1
 *
 * @param ElementIconId
 * @desc 属性のアイコンです。
 * @default 0
 */
/*~struct~ExParamList:ja
* @param ExParamId
* @type select
* @option 命中率
* @value 0
* @option 回避率
* @value 1
* @option 会心率
* @value 2
* @option 会心回避率
* @value 3
* @option 魔法回避率
* @value 4
* @option 魔法反射率
* @value 5
* @option 反撃率
* @value 6
* @option HP再生率
* @value 7
* @option MP再生率
* @value 8
* @option TP再生率
* @value 9
* @default 0
* @desc 表示させたい追加能力値です。

* @param ExParamName
* @desc 追加能力値の用語です。
* @default 
*/
/*~struct~SpParamList:ja
 * @param SpParamId
 * @type select
 * @option 狙われやすさ
 * @value 0
 * @option 防御効果
 * @value 1
 * @option 回復効果
 * @value 2
 * @option 薬の知識
 * @value 3
 * @option MP消費率
 * @value 4
 * @option TPチャージ率
 * @value 5
 * @option 物理ダメージ率
 * @value 6
 * @option 魔法ダメージ率
 * @value 7
 * @option 床ダメージ率
 * @value 8
 * @option 獲得経験率
 * @value 9
 * @default 0
 * @desc 表示させたい特殊能力値です。
 *
 * @param SpParamName
 * @default
 * @desc 特殊能力値の用語です。
 */
/*~struct~StateList:ja
 * @param StateId
 * @type state
 * @default 0
 * @desc 表示させたいステートのIDです。
 */
/*~struct~ParamList:ja
 * @param ParameterId
 * @type select
 * @option 最大HP
 * @value 0
 * @option 最大MP
 * @value 1
 * @option 攻撃力
 * @value 2
 * @option 防御力
 * @value 3
 * @option 魔法力
 * @value 4
 * @option 魔法防御
 * @value 5
 * @option 敏捷性
 * @value 6
 * @option 運
 * @value 7
 * @default 0
 * @desc 表示させたい能力値のIDです。
 */
/*~struct~PageList:
 * @param PageContents
 * @type select
 * @option 経験値
 * @value Exp
 * @option 通常能力値
 * @value Param
 * @option 追加能力値
 * @value ExParam
 * @option 特殊能力値
 * @value SpParam
 * @option 状態異常有効度
 * @value StateResist
 * @option 属性有効度
 * @value ElementResist
 * @option 状態異常・属性有効度
 * @value Resists
 * @option 装備
 * @value Equips
 * @option プロフィール
 * @value Profile
 * @option カスタム能力値ページ
 * @value CustomParam
 * @default Exp
 * @desc 表示させたいページです。
 *
 * @param PageName
 * @desc ページ選択ウィンドウに表示する名前です。
 * @default
 */
(() => {
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

  const stbg = String(parameters["StatusBackground"] || "");
  const stfg = String(parameters["StatusForeground"] || "");
  const wstx = Number(parameters["WStatusX"] || 0);
  const wsty = Number(parameters["WStatusY"] || 124);
  const wstw = Number(parameters["WStatusWidth"] || 408);
  const wsth = Number(parameters["WStatusHeight"] || 216);
  const wstop = Number(parameters["WStatusOpacity"] || 255);

  const wstdx = Number(parameters["WStatusDetailX"] || 0);
  const wstdy = Number(parameters["WStatusDetailY"] || 72);
  const wstdw = Number(parameters["WStatusDetailWidth"] || 408);
  const wstdh = Number(parameters["WStatusDetailHeight"] || 552);
  const wstdop = Number(parameters["WStatusDetailOpacity"] || 255);
  const hitevast = String(parameters["HITandEVASystemTerm"] || "true");

  const expheader = String(parameters["ExpHeader"] || "");
  const nextgauge = String(parameters["ExpNextGaugeVisible"] || "true");
  const nlgcolor1 = Number(parameters["ExpNextGaugeColor1"] || 30);
  const nlgcolor2 = Number(parameters["ExpNextGaugeColor2"] || 31);

  const paramheader = String(parameters["ParametersHeader"] || "");
  const parambase = parameters["ParametersList"];
  const params = StructConvert(parambase);
  const paramlines = Number(parameters["ParametersLines"] || 6);
  const paramcols = Number(parameters["ParametersCols"] || 1);
  const paramnw = Number(parameters["ParametersNameWidth"] || 110);
  const paramvw = Number(parameters["ParametersValueWidth"] || 50);
  const parammargin = Number(parameters["ParametersMargin"] || 0);

  const xparamheader = String(parameters["ExParametersHeader"] || "");
  const xparambase = parameters["ExParametersList"];
  const xparams = StructConvert(xparambase);

  const xplines = Number(parameters["ExParamLines"] || 5);
  const xpcols = Number(parameters["ExParamCols"] || 2);
  const xpnw = Number(parameters["ExParamNameWidth"] || 110);
  const xpvw = Number(parameters["ExParamValueWidth"] || 50);
  const xpmargin = Number(parameters["ExParamMargin"] || 30);

  const sparamheader = String(parameters["SpParametersHeader"] || "");
  const sparambase = parameters["SpParametersList"];
  const sparams = StructConvert(sparambase);

  const splines = Number(parameters["SpParamLines"] || 5);
  const spcols = Number(parameters["SpParamCols"] || 2);
  const spnw = Number(parameters["SpParamNameWidth"] || 100);
  const spvw = Number(parameters["SpParamValueWidth"] || 50);
  const spmargin = Number(parameters["SpParamMargin"] || 30);

  const cpheader = String(parameters["CustomParamsHeader"] || "");

  const sresistheader = String(parameters["StateResistHeader"] || "");
  const sresistbase = parameters["StateResistList"];
  const sresist = StructConvert(sresistbase);

  const resistsblank = String(parameters["ResistsBlankLine"] || "true");

  const strcols = Number(parameters["StateResistCols"] || 3);
  const strvw = Number(parameters["StateResistValueWidth"] || 60);
  const strmargin = Number(parameters["StateResistMargin"] || 30);

  const eresistheader = String(parameters["ElementResistHeader"] || "");
  const eresistbase = parameters["ElementResistList"];
  const eresist = StructConvert(eresistbase);

  const elrcols = Number(parameters["ElementResistCols"] || 3);
  const elrvw = Number(parameters["ElementResistValueWidth"] || 60);
  const elrmargin = Number(parameters["ElementResistMargin"] || 30);

  const equipsheader = String(parameters["EquipmentsHeader"] || "");
  const maxeq = Number(parameters["maxEquipments"] || 6);
  const slotv = String(parameters["SlotNameVisible"] || "true");
  const slotw = Number(parameters["SlotNameWidth"] || 138);

  const profheader = String(parameters["ProfileHeader"] || "");

  const wslx = Number(parameters["PageSelectWindowX"] || 0);
  const wsly = Number(parameters["PageSelectWindowY"] || 0);
  const wslw = Number(parameters["PageSelectWindowWidth"] || 816);
  const wslh = Number(parameters["PageSelectWindowHeight"] || 72);
  const wslv = String(parameters["PageSelectWindowVisible"] || "true");
  const wslcl = Number(parameters["PageSelectWindowMaxCols"] || 4);
  const wslop = Number(parameters["PageSelectWindowOpacity"] || 255);
  const wslbase = parameters["PageSelectWindowList"];
  const wslist = StructConvert(wslbase);

  const stpcshow = String(parameters["STPictShow"] || "true");
  const stpx = Number(parameters["StandingPictureX"] || 408);
  const stpy = Number(parameters["StandingPictureY"] || 72);
  const stpw = Number(parameters["StandingPictureWidth"] || 408);
  const stph = Number(parameters["StandingPictureHeight"] || 435);
  const stpc = String(parameters["STPictChange"] || "true");
  const stpckey = String(parameters["STPictChangeKey"] || "ok");
  const stpcse = String(parameters["STPictChangeSE"] || "Cursor2");
  const stpcsevol = Number(parameters["STPictChangeSEVolume"] || 90);
  const stpcsepitch = Number(parameters["STPictChangeSEPitch"] || 100);
  const stpcsepan = Number(parameters["STPictChangeSEPan"] || 0);
  const stpl = String(parameters["STPictLargeLetters"] || "_L");

  //GaugeShapeCustomize compatible
  const param_gsc = PluginManager.parameters("GaugeShapeCustomize");
  const gscison = Object.keys(param_gsc).length > 0;
  const defgaugeTypeLeft = String(param_gsc["Default Gauge Shape"]).substring(0, 1);
  const defgaugeTypeRight = String(param_gsc["Default Gauge Shape"]).substring(1, 2);
  const gaugeOutline = String(param_gsc["Gauge Outline"] || "true");
  const nexpgaugeTypeLeft = String(parameters["Next EXP Gauge Shape"]).substring(0, 1);
  const nexpgaugeTypeRight = String(parameters["Next EXP Gauge Shape"]).substring(1, 2);

  //Window_Status
  Window_Status.prototype.drawBlock1 = function () {
    const y = this.block1Y();
    this.drawActorName(this._actor, 6, y, 168);
    this.drawActorClass(this._actor, 192, y, 168);
    this.drawActorNickname(this._actor, 192, y + this.lineHeight(), 270);
  };

  Window_Status.prototype.drawBlock2 = function () {
    const y = this.block2Y();
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(192, y + this.lineHeight());
  };

  Window_Status.prototype.drawBasicInfo = function (x, y) {
    const lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.placeBasicGauges(this._actor, x, y + lineHeight * 1);
  };

  //Window_StatusDetail
  function Window_StatusDetail() {
    this.initialize(...arguments);
  }

  Window_StatusDetail.prototype = Object.create(Window_StatusBase.prototype);
  Window_StatusDetail.prototype.constructor = Window_StatusDetail;

  Window_StatusDetail.prototype.initialize = function (rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this._actor = null;
    this._page = wslist[0].PageContents;
    this.refresh();
  };

  Window_StatusDetail.prototype.setActor = function (actor) {
    if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
    }
  };

  Window_StatusDetail.prototype.refresh = function () {
    Window_StatusBase.prototype.refresh.call(this);
    if (this._actor) {
      this.drawStatusPage();
    }
  };

  Window_StatusDetail.prototype.setPage = function (page) {
    if (this._page !== page) {
      this._page = page;
      this.refresh();
    }
  };

  Window_StatusDetail.prototype.drawStatusPage = function () {
    switch (this._page) {
      case "Exp":
        return this.drawExpInfo(6, 0);
      case "Param":
        return this.drawParameters(6, 0);
      case "ExParam":
        return this.drawExParameters(6, 0);
      case "SpParam":
        return this.drawSpParameters(6, 0);
      case "StateResist":
        return this.drawStateResists(6, 0);
      case "ElementResist":
        return this.drawElementResists(6, 0);
      case "Resists":
        return this.drawResists(6, 0);
      case "Equips":
        return this.drawEquipments(6, 0);
      case "Profile":
        return this.drawProfile(6, 0);
      case "CustomParam":
          return this.drawCustomParameters(8, 0);
      default:
        return false;
    }
  };

  Window_StatusDetail.prototype.drawItemBackground = function (/*index*/) {
    //
  };

  Window_StatusDetail.prototype.drawExpInfo = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    const expTotal = TextManager.expTotal.format(TextManager.exp);
    const expNext = TextManager.expNext.format(TextManager.level);
    if (expheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(expheader, x, y, cwidth);
      this.resetTextColor();
    }
    const y2 = y + (expheader ? lineHeight : 0);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(expTotal, x, y2 + lineHeight * 0, cwidth);
    this.drawText(expNext, x, y2 + lineHeight * 2, cwidth);
    this.resetTextColor();
    this.drawText(
      this.expTotalValue(),
      x,
      y2 + lineHeight * 1,
      cwidth - 12,
      "right"
    );
    if (nextgauge == "true") {
      this.placeNextExpGauge(this._actor, x, y2 + lineHeight * 3);
    } else {
      this.drawText(
        this.expNextValue(),
        x,
        y2 + lineHeight * 3,
        cwidth - 12,
        "right"
      );
    }
  };

  Window_StatusDetail.prototype.expTotalValue = function () {
    if (this._actor.isMaxLevel()) {
      return "-------";
    } else {
      return this._actor.currentExp();
    }
  };

  Window_StatusDetail.prototype.expNextValue = function () {
    if (this._actor.isMaxLevel()) {
      return "-------";
    } else {
      return this._actor.nextRequiredExp();
    }
  };

  Window_StatusDetail.prototype.placeNextExpGauge = function (actor, x, y) {
    const key = "actor%1-gauge-%2".format(actor.actorId(), "nextexp");
    const sprite = this.createInnerSprite(key, Sprite_NextExpGauge);
    sprite.setup(actor, "nextexp");
    sprite.move(x, y);
    sprite.show();
  };

  Window_StatusDetail.prototype.drawParameters = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    let colnum = 0;
    if (paramheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(paramheader, x, y, cwidth);
    }
    for (let i = 0; i < params.length; i++) {
      const paramId = params[i].ParameterId;
      const linenum = i % paramlines;
      const x2 = x + (paramnw + paramvw + parammargin) * colnum;
      const y2 = y + lineHeight * linenum + (paramheader ? lineHeight : 0);
      this.changeTextColor(this.systemColor());
      this.drawText(TextManager.param(paramId), x2, y2, paramnw);
      this.resetTextColor();
      this.drawText(
        this._actor.param(paramId),
        x2 + paramnw,
        y2,
        paramvw,
        "right"
      );
      if (linenum == paramlines - 1) {
        if (colnum < paramcols) {
          colnum += 1;
        }
      }
    }
  };

  Window_StatusDetail.prototype.drawExParameters = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    let colnum = 0;
    if (xparamheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(xparamheader, x, y, cwidth);
    }

    for (let i = 0; i < xparams.length; i++) {
      const xparamId = xparams[i].ExParamId;
      const linenum = i % xplines;
      if (hitevast === "true" && xparamId < 2) {
        xparamName = TextManager.param(xparamId + 8);
      } else {
        xparamName = xparams[i].ExParamName;
      }
      const x2 = x + (xpnw + xpvw + xpmargin) * colnum;
      const y2 = y + lineHeight * linenum + (xparamheader ? lineHeight : 0);
      const percent = Math.floor(this._actor.xparam(xparamId) * 100);
      this.changeTextColor(this.systemColor());
      this.drawText(xparamName, x2, y2, xpnw);
      this.resetTextColor();
      this.drawText(percent + "%", x2 + xpnw, y2, xpvw, "right");
      if (linenum == xplines - 1) {
        if (colnum < xpcols) {
          colnum += 1;
        }
      }
    }
  };

  Window_StatusDetail.prototype.drawSpParameters = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    let colnum = 0;
    if (sparamheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(sparamheader, x, y, cwidth);
    }
    for (let i = 0; i < sparams.length; i++) {
      const sparamId = sparams[i].SpParamId;
      const linenum = i % splines;
      const sparamName = sparams[i].SpParamName;
      const x2 = x + (spnw + spvw + spmargin) * colnum;
      const y2 = y + lineHeight * linenum + (sparamheader ? lineHeight : 0);
      const percent = Math.floor(this._actor.sparam(sparamId) * 100);
      this.changeTextColor(this.systemColor());
      this.drawText(sparamName, x2, y2, spnw);
      this.resetTextColor();
      this.drawText(percent + "%", x2 + spnw, y2, spvw, "right");
      if (linenum == splines - 1) {
        if (colnum < spcols) {
          colnum += 1;
        }
      }
    }
  };

  Window_StatusDetail.prototype.drawCustomParameters = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    if (cpheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(cpheader, x, y, cwidth);
    }
    this.resetTextColor();
    /* This is a sample code.
  it draw parameters on the left, and draw ex-params and sp-params on the right.
  Sp-params draw under the ex-params.
  Please customize these codes to your liking!
  */
    const y2 = y + (cpheader ? lineHeight : 0);
    const x2 = x + (paramnw + paramvw + parammargin);
    const y3 = y2 + (paramheader ? lineHeight : 0);
    const y4 = y3 + (lineHeight * xplines) + (xparamheader ? lineHeight : 0);
    this.drawParameters(x, y2);
    this.drawExParameters(x2, y3);
    this.drawSpParameters(x2, y4);
  };

  Window_StatusDetail.prototype.drawResists = function (x, y) {
    const lineHeight = this.lineHeight();
    const y2 =
      y +
      lineHeight *
        (Math.floor(sresist.length / strcols) + (sparamheader ? 3 : 2));
    this.drawStateResists(x, y);
    if (resistsblank == "true") {
      y2 += lineHeight;
    }
    this.drawElementResists(x, y2);
  };

  Window_StatusDetail.prototype.drawStateResists = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    const iconBoxWidth = ImageManager.iconWidth + 4;
    if (sresistheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(sresistheader, x, y, cwidth);
      this.resetTextColor();
    }

    for (let i = 0; i < sresist.length; i++) {
      const x2 = x + (iconBoxWidth + strvw + strmargin) * (i % strcols);
      const y2 =
        y +
        lineHeight * Math.floor(i / strcols) +
        (sresistheader ? lineHeight : 0);
      const StateRateId = sresist[i].StateId;
      const percent = Math.floor(this._actor.stateRate(StateRateId) * 100);
      this.drawIcon($dataStates[StateRateId].iconIndex, x2, y2);
      this.drawText(percent + "%", x2 + iconBoxWidth, y2, 60, "right");
    }
  };

  Window_StatusDetail.prototype.drawElementResists = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    const iconBoxWidth = ImageManager.iconWidth + 4;
    if (eresistheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(eresistheader, x, y, cwidth);
      this.resetTextColor();
    }

    for (let i = 0; i < eresist.length; i++) {
      const x2 = x + (iconBoxWidth + elrvw + elrmargin) * (i % elrcols);
      const y2 =
        y +
        lineHeight * Math.floor(i / elrcols) +
        (eresistheader ? lineHeight : 0);
      const ElementRateId = eresist[i].ElementId;
      const ElementRateIcon = eresist[i].ElementIconId;
      const percent = Math.floor(this._actor.elementRate(ElementRateId) * 100);
      this.drawIcon(ElementRateIcon, x2, y2);
      this.drawText(percent + "%", x2 + iconBoxWidth, y2, 60, "right");
    }
  };

  Window_StatusDetail.prototype.drawEquipments = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    const lineHeight = this.lineHeight();
    if (equipsheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(equipsheader, x, y, cwidth);
      this.resetTextColor();
    }
    const y2 = y + (equipsheader ? lineHeight : 0);
    const equips = this._actor.equips();
    const count = Math.min(equips.length, this.maxEquipmentLines());
    for (let i = 0; i < count; i++) {
      if (slotv == "true") {
        slotName = this.actorSlotName(this._actor, i);
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(slotName, x, y2 + lineHeight * i, slotw, lineHeight);
        this.drawItemName(equips[i], x + slotw, y2 + lineHeight * i, cwidth - slotw);
      } else {
        this.drawItemName(equips[i], x, y2 + lineHeight * i, cwidth);
      }
    }
  };

  Window_StatusDetail.prototype.maxEquipmentLines = function () {
    return maxeq;
  };

  Window_StatusDetail.prototype.drawProfile = function (x, y) {
    const cwidth = this.contentsWidth() - x;
    if (profheader) {
      this.changeTextColor(this.systemColor());
      this.drawText(profheader, x, y, cwidth);
      this.resetTextColor();
    }
    const y2 = y + (profheader ? this.lineHeight() : 0);
    this.drawTextEx(this._actor.profile(), x, y2);
  };

  //Window_STList
  function Window_STList() {
    this.initialize.apply(this, arguments);
  }
  console.log(Window_StatusDetail.prototype.drawStatusPage)

  Window_STList.prototype = Object.create(Window_Command.prototype);
  Window_STList.prototype.constructor = Window_STList;

  Window_STList.prototype.initialize = function (rect) {
    Window_Command.prototype.initialize.call(this, rect);
    this.refresh();
    this.activate();
  };

  Window_STList.prototype.maxCols = function () {
    if (wslcl > 0) {
      return wslcl;
    } else {
      return wslist.length;
    }
  };

  Window_STList.prototype.itemTextAlign = function () {
    if (this.maxCols() > 1) {
      return "center";
    } else {
      return "left";
    }
  };

  Window_STList.prototype.cursorPagedown = function () {
    return;
  };

  Window_STList.prototype.cursorPageup = function () {
    return;
  };

  Window_STList.prototype.isOkEnabled = function () {
    return false;
  };

  Window_STList.prototype.update = function () {
    Window_Command.prototype.update.call(this);
    if (this._statusWindow) {
      this._statusWindow.setPage(this.currentSymbol());
    }
  };

  Window_STList.prototype.makeCommandList = function () {
    for (let i = 0; i < wslist.length; i++) {
      this.addCommand(wslist[i].PageName, wslist[i].PageContents);
    }
  };

  Window_STList.prototype.setStatusWindow = function (statusWindow) {
    this._statusWindow = statusWindow;
  };

  const def_Window_STList_cursorDown = Window_STList.prototype.cursorDown;
  Window_STList.prototype.cursorDown = function (wrap) {
    const index = this.index();
    const maxItem = this.maxItems() - 1;
    if (wslv == "true") {
      def_Window_STList_cursorDown.call(this, wrap);
    } else {
      if (index == maxItem) {
        this.select(0);
      } else if (this.maxCols() == 1) {
        def_Window_STList_cursorDown.call(this, wrap);
      } else {
        this.cursorRight(Input.isTriggered("right"));
      }
    }
  };

  const def_Window_STList_cursorUp = Window_STList.prototype.cursorUp;
  Window_STList.prototype.cursorUp = function (wrap) {
    const index = this.index();
    const maxItem = this.maxItems() - 1;
    if (wslv == "true") {
      def_Window_STList_cursorUp.call(this, wrap);
    } else {
      if (index == 0) {
        this.select(maxItem);
      } else if (this.maxCols() == 1) {
        def_Window_STList_cursorUp.call(this, wrap);
      } else {
        this.cursorLeft(Input.isTriggered("left"));
      }
    }
  };

  const def_Window_STList_cursorRight = Window_STList.prototype.cursorRight;
  Window_STList.prototype.cursorRight = function (wrap) {
    const index = this.index();
    const maxItem = this.maxItems() - 1;
    if (wslv == "true") {
      def_Window_STList_cursorRight.call(this, wrap);
    } else {
      if (index == maxItem) {
        this.select(0);
      } else if (this.maxCols() > 1) {
        def_Window_STList_cursorRight.call(this, wrap);
      } else {
        return;
      }
    }
  };

  const def_Window_STList_cursorLeft = Window_STList.prototype.cursorLeft;
  Window_STList.prototype.cursorLeft = function (wrap) {
    const index = this.index();
    const maxItem = this.maxItems() - 1;
    if (wslv == "true") {
      def_Window_STList_cursorLeft.call(this, wrap);
    } else {
      if (index == 0) {
        this.select(maxItem);
      } else if (this.maxCols() > 1) {
        def_Window_STList_cursorLeft.call(this, wrap);
      } else {
        return;
      }
    }
  };

  //Sprite_STPict
  function Sprite_STPict() {
    this.initialize.apply(this, arguments);
  }

  Sprite_STPict.prototype = Object.create(Sprite.prototype);
  Sprite_STPict.prototype.constructor = Sprite_STPict;

  Sprite_STPict.prototype.initialize = function () {
    Sprite.prototype.initialize.call(this);
    this._actor = null;
    this._pictlarge = false;
    const sprite = new Sprite();
    this.addChild(sprite);
    this._stpict = sprite;
    this.refresh();
  };

  Sprite_STPict.prototype.refresh = function () {
    this._stpict.bitmap = new Bitmap(stpw, stph);
    if (this._actor) {
      this.drawStandingPicture();
    }
  };

  Sprite_STPict.prototype.drawStandingPicture = function () {
    const actorstpict = this._actor.faceName() + "_" + this._actor.faceIndex();
    if (stpc == "true" && this._pictlarge == true) {
      bitmap = ImageManager.loadPicture(actorstpict + stpl);
    } else {
      bitmap = ImageManager.loadPicture(actorstpict);
    }
    this._stpict.bitmap.blt(bitmap, 0, 0, stpw, stph, 0, 0);
  };

  Sprite_STPict.prototype.setActor = function (actor) {
    if (this._actor !== actor) {
      this._actor = actor;
      this.refresh();
    }
  };

  //Sprite_ExpGauge
  function Sprite_NextExpGauge() {
    this.initialize(...arguments);
  }

  Sprite_NextExpGauge.prototype = Object.create(Sprite_Gauge.prototype);
  Sprite_NextExpGauge.prototype.constructor = Sprite_NextExpGauge;

  Sprite_NextExpGauge.prototype.initialize = function () {
    Sprite_Gauge.prototype.initialize.call(this);
  };

  Sprite_NextExpGauge.prototype.bitmapWidth = function () {
    return wstdw - 30;
  };

  Sprite_NextExpGauge.prototype.gaugeX = function () {
    return 6;
  };

  Sprite_NextExpGauge.prototype.currentValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case "nextexp":
          const nrexp = this._battler.nextRequiredExp();
          const clexp = this._battler.currentLevelExp();
          const nlexp = this._battler.nextLevelExp();
          return nlexp - clexp - nrexp;
      }
    }
    return NaN;
  };

  Sprite_NextExpGauge.prototype.currentMaxValue = function () {
    if (this._battler) {
      switch (this._statusType) {
        case "nextexp":
          const clexp = this._battler.currentLevelExp();
          const nlexp = this._battler.nextLevelExp();
          return nlexp - clexp;
      }
    }
    return NaN;
  };

  Sprite_NextExpGauge.prototype.gaugeColor1 = function () {
    switch (this._statusType) {
      case "nextexp":
        return ColorManager.nexpGaugeColor1();
      default:
        return ColorManager.normalColor();
    }
  };

  Sprite_NextExpGauge.prototype.gaugeColor2 = function () {
    switch (this._statusType) {
      case "nextexp":
        return ColorManager.nexpGaugeColor1();
      default:
        return ColorManager.normalColor();
    }
  };

  Sprite_NextExpGauge.prototype.redraw = function () {
    this.bitmap.clear();
    const currentValue = this.currentValue();
    if (!isNaN(currentValue)) {
      this.drawGauge();
      if (this.isValid()) {
        this.drawValue();
      }
    }
  };

  Sprite_NextExpGauge.prototype.drawValue = function () {
    const currentValue = this._battler.nextRequiredExp();
    const width = this.bitmapWidth();
    const height = this.bitmapHeight();
    this.setupValueFont();
    this.bitmap.drawText(currentValue, 0, 0, width, height, "right");
  };

  //GaugeShapeCustomize compatible
  if (gscison) {
    Sprite_NextExpGauge.prototype.drawGaugeRect = function (x, y, width, height) {
      const rate = this.gaugeRate();
      const fillW = Math.floor(width * rate);
      const color0 = this.gaugeBackColor();
      const color1 = this.gaugeColor1();
      const color2 = this.gaugeColor2();
      const color3 = this.gaugeOutlineColor();
      switch (this._statusType) {
        case "nextexp":
          gaugeTypeLeft = nexpgaugeTypeLeft || defgaugeTypeLeft;
          gaugeTypeRight = nexpgaugeTypeRight || defgaugeTypeRight;
          break;
      }
      if (gaugeOutline == "true") {
        this.bitmap.fillTrap(x + 2, y + 2, width - 4, height - 4, color0, color0);
        this.bitmap.fillTrap(x + 2, y + 2, fillW - 4, height - 4, color1, color2, "atop");
        this.bitmap.outlineTrap(x + 2, y + 2, width - 4, height - 4, color3, color3, "desover");
        this.bitmap.fillTrap(x, y, width, height, "#00000000", "#00000000");
      } else {
        this.bitmap.fillTrap(x, y, width, height, color0, color0);
        this.bitmap.fillTrap(x, y, fillW, height, color1, color2, "atop");
        this.bitmap.fillTrap(x, y, width, height, "#00000000", "#00000000");
      }
      gaugeTypeLeft = defgaugeTypeLeft;
      gaugeTypeRight = defgaugeTypeRight;
    };
  }

  //ColorManager
  ColorManager.nexpGaugeColor1 = function () {
    return this.textColor(nlgcolor1);
  };

  ColorManager.nexpGaugeColor2 = function () {
    return this.textColor(nlgcolor2);
  };

  //Scene_Status
  Scene_Status.prototype.create = function () {
    if (stpcshow == "true") {
      this.PresetStandingPictures();
    }
    Scene_MenuBase.prototype.create.call(this);
    this.createStatusListWindow();
    this.createStatusWindow();
    this.createStatusDetailWindow();
    this._statusListWindow.setStatusWindow(this._statusDetailWindow);
    this._statusListWindow.opacity = wslop;
    this._statusWindow.opacity = wstop;
    this._statusDetailWindow.opacity = wstdop;
    if (wslv == "false") {
      this._statusListWindow.x -= Graphics.width * 2;
      this._statusListWindow.y -= Graphics.height * 2;
    }
    if (stpcshow == "true") {
      this.createStandPicture();
    }
  };

  Scene_Status.prototype.helpAreaHeight = function () {
    return 0;
  };

  Scene_Status.prototype.createStatusWindow = function () {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_Status(rect);
    this._statusWindow.setHandler("cancel", this.popScene.bind(this));
    this._statusWindow.setHandler("pagedown", this.nextActor.bind(this));
    this._statusWindow.setHandler("pageup", this.previousActor.bind(this));
    this.addWindow(this._statusWindow);
  };

  Scene_Status.prototype.statusWindowRect = function () {
    const wx = wstx;
    const wy = wsty;
    const ww = wstw;
    const wh = wsth;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Status.prototype.createStatusDetailWindow = function () {
    const rect = this.statusDetailWindowRect();
    this._statusDetailWindow = new Window_StatusDetail(rect);
    this.addWindow(this._statusDetailWindow);
  };

  Scene_Status.prototype.statusDetailWindowRect = function () {
    const wx = wstdx;
    const wy = wstdy;
    const ww = wstdw;
    const wh = wstdh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Status.prototype.createStatusListWindow = function () {
    const rect = this.statusListWindowRect();
    this._statusListWindow = new Window_STList(rect);
    this.addWindow(this._statusListWindow);
  };

  Scene_Status.prototype.statusListWindowRect = function () {
    const wx = wslx;
    const wy = wsly;
    const ww = wslw;
    const wh = wslh;
    return new Rectangle(wx, wy, ww, wh);
  };

  Scene_Status.prototype.createStandPicture = function () {
    const sprite = new Sprite_STPict();
    sprite.x = stpx;
    sprite.y = stpy;
    this.addChild(sprite);
    this._statusStandingPict = sprite;
  };

  const _Scene_Status_createBackground = Scene_Status.prototype.createBackground;
  Scene_Status.prototype.createBackground = function () {
    if (!stbg) {
      _Scene_Status_createBackground.call(this);
    } else {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = ImageManager.loadSystem(stbg);
      this.addChild(this._backgroundSprite);
    }
    if (stfg) {
      this._foregroundSprite = new Sprite();
      this._foregroundSprite.bitmap = ImageManager.loadSystem(stfg);
      this.addChild(this._foregroundSprite);
    }
  };

  Scene_Status.prototype.start = function () {
    Scene_MenuBase.prototype.start.call(this);
    this.refreshActor();
  };

  Scene_Status.prototype.needsPageButtons = function () {
    return true;
  };

  Scene_Status.prototype.refreshActor = function () {
    const actor = this.actor();
    this._statusWindow.setActor(actor);
    this._statusDetailWindow.setActor(actor);
    if (stpcshow == "true") {
      if (stpc == "true") {
        const actorstpict = actor.faceName() + "_" + actor.faceIndex();
        ImageManager.loadPicture(actorstpict + stpl);
      }
      this._statusStandingPict.setActor(actor);
    }
  };

  Scene_Status.prototype.onActorChange = function () {
    Scene_MenuBase.prototype.onActorChange.call(this);
    this.refreshActor();
    this._statusWindow.activate();
  };

  Scene_Status.prototype.PresetStandingPictures = function () {
    $gameParty.members().forEach(function (actor) {
      const actorstpict = actor.faceName() + "_" + actor.faceIndex();
      ImageManager.loadPicture(actorstpict);
    }, this);
  };

  Scene_Status.prototype.ToggleStandingPicture = function () {
    if (this._statusStandingPict._pictlarge == false) {
      this._statusStandingPict._pictlarge = true;
      this._statusStandingPict.refresh();
    } else {
      this._statusStandingPict._pictlarge = false;
      this._statusStandingPict.refresh();
    }
    AudioManager.playSe({
      name: stpcse,
      volume: stpcsevol,
      pitch: stpcsepitch,
      pan: stpcsepan,
    });
  };

  if (stpcshow == "true" && stpc == "true") {
    const _Scene_Status_update = Scene_Status.prototype.update;
    Scene_Status.prototype.update = function () {
      _Scene_Status_update.call(this);
      if (Input.isTriggered(stpckey)) {
        this.ToggleStandingPicture();
      }
      if (
        TouchInput.isTriggered() &&
        TouchInput.x > stpx &&
        TouchInput.x < stpx + stpw
      ) {
        if (
          TouchInput.isTriggered() &&
          TouchInput.y > stpy &&
          TouchInput.y < stpy + stph
        ) {
          this.ToggleStandingPicture();
        }
      }
    };
  }
})();
