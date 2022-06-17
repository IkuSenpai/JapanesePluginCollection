//=============================================================================
// MOG_PartyHud.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.1) Apresenta Huds com as condições básicas do grupo.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 * 
 * @param Skip Leader
 * @desc Ignorar o lider
 * @default true
 * @type boolean
 * @on Hide Leader
 * @off Show Leader 
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Start Visible
 * @desc Apresentar a Hud  ao iniciar o jogo.
 * @default true
 * @type boolean
 * @on Visible From Start
 * @off Hide 
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Smart Fade
 * @desc Ocultar a hud quando a hud sobrepor o personagem.
 * @default true
 * @type boolean
 * @on Overlapping Character
 * @off Always Visible
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Font Size
 * @desc Definição do tamanho da fonte.
 * @type number  
 * @default 14
 * @min 6
 * @max 60  
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 * 
 * @param Name Visible
 * @desc Apresentar o nome
 * @default true
 * @type boolean
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Name X
 * @desc Posição X-Axis do nome.
 * @default 5
 * @type number 
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Name Y
 * @desc Posição Y-Axis do nome.
 * @default -28
 * @type number
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 0
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2 
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 * 
 * @param Face Visible
 * @desc Ativar Face
 * @type boolean
 * @default true
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Face X
 * @desc Posição X-Axis da Face.
 * @default 5
 * @type number 
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Face Y
 * @desc Posição Y-Axis da Face.
 * @default 23
 * @type number 
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *  
 * @param HP Meter Visible
 * @type boolean
 * @desc Ativar Medidor de HP.
 * @default true
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param HP Meter X
 * @desc Definição do X-Axis do medidor de HP.
 * @default 52
 * @type number 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param HP Meter Y
 * @desc Definição do Y-Axis do medidor de HP.
 * @default 33
 * @type number 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param HP Number Visible
 * @desc Ativar número de HP.
 * @default true
 * @type boolean
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param HP Number X
 * @desc Definição do X-Axis do número de HP.
 * @default 90
 * @type number 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param HP Number Y
 * @desc Definição do Y-Axis do número de HP.
 * @default 12
 * @type number 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 2
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *   
 * @param MP Meter Visible
 * @desc Ativar medidor de MP.
 * @default true
 * @type boolean
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param MP Meter X
 * @desc Definição do X-Axis do medidor de MP.
 * @default 52
 * @type number 
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param MP Meter Y
 * @desc Definição do Y-Axis do medidor de MP.
 * @default 57
 * @type number 
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param MP Number Visible
 * @desc Ativar número de MP.
 * @default true
 * @type boolean
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param MP Number X
 * @desc Definição do X-Axis do número de MP.
 * @default 90
 * @type number 
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param MP Number Y
 * @desc Definição doY -Axis do número de MP.
 * @default 36
 * @type number 
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 2
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2 
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *   
 * @param TP Meter Visible
 * @desc Ativar medidor de TP.
 * @default false
 * @type boolean
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param TP Meter X
 * @desc Definição do X-Axis do medidor de TP.
 * @default 52
 * @type number 
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param TP Meter Y
 * @desc Definição do Y-Axis do medidor de TP.
 * @default 82
 * @type number 
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *  
 * @param TP Number Visible
 * @desc Ativar número de TP.
 * @type boolean
 * @default false
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param TP Number X
 * @desc Definição do X-Axis do número de TP.
 * @default 90
 * @type number 
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param TP Number Y
 * @desc Definição do Y-Axis do número de TP.
 * @default 66
 * @type number 
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 2
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2 
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> LV <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *  
 * @param LV Number Visible
 * @desc Ativar level.
 * @default true
 * @type boolean
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 *  
 * @param LV Number X
 * @desc Definição do X-Axis do level.
 * @default 30
 * @type number 
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param LV Number Y
 * @desc Definição do Y-Axis do level.
 * @default 4
 * @type number 
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param LV Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2 
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *  
 * @param Exp Visible
 * @desc Ativar a experiência.
 * @default true
 * @type boolean
 * @parent -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Exp X
 * @desc Definição do X-Axis da exp.
 * @default 30
 * @type number 
 * @parent -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Exp Y
 * @desc Definição do Y-Axis da exp.
 * @default 71
 * @type number 
 * @parent -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *  
 * @param States Visible
 * @desc Ativar as condições.
 * @default true
 * @type boolean
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param States X
 * @desc Definição do X-Axis das condições.
 * @default 4
 * @type number 
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param States Y
 * @desc Definição do Y-Axis das condições.
 * @default 24
 * @type number 
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param States Scale
 * @desc Scale/Zoom do sprite das condições.
 * @default 70
 * @type number 
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param
 *
 * @param -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *  
 * @param Hud 1 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * @type number  
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 1 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 390
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 2 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 2 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 300
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 3 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 210
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 4 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 120
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 5 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 30
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 6 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 150
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 7 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 300
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 8 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 450
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 9 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ---------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Position X
 * @desc Definição do X-Axis da Hud.
 * @default 600
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 10 Position Y
 * @desc Definição do Y-Axis da Hud.
 * @default 0
 * @type number 
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @command PartyHudVisible
 * @desc Apresentar ou ocultar a hud.
 * @text Show / Hide
 *
 * @arg visible
 * @desc Apresentar ou ocultar a hud.
 * @text Visible
 * @default true
 * @type boolean
 *
 * @help  
 * =============================================================================
 * +++ MOG - Party HUD (v1.1) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta Huds com os parâmetros básicos do personagems.
 *
 * =============================================================================
 * - REQUIRED FILES
 * =============================================================================
 * Grave as imagens na pasta /img/partyhud/
 *
 * ->  HPmeter.png
 * ->  MPmeter.png
 * ->  TPmeter.png
 * ->  Expmeter.png 
 * ->  Layout.png
 *
 * =============================================================================
 * Para nomear as faces dos battlers basta nomear da seguinte forma.
 *
 * Face_ + ACTOR_ID.png
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ...
 *
 * =============================================================================
 * * HISTÓRICO
 * =============================================================================
 * (v1.1) Correção na função sort relativo a codificação.       
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.1) パーティのHUDをマップ表示します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_PartyHud.js
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> メイン <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Skip Leader
 * @text 先頭アクターの表示有効化
 * @type boolean
 * @on 非表示
 * @off 表示
 * @default true
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Start Visible
 * @text ゲーム開始時のHUD表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Smart Fade
 * @text HUDフェード
 * @desc HUDがキャラクターと重なった時の優先表示
 * @type boolean
 * @on キャラクター優先
 * @off HUD優先
 * @default true
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Font Size
 * @text フォントサイズ
 * @type number
 * @min 6
 * @max 60
 * @default 14
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 名前 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Visible
 * @text 表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name X
 * @text X軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 5
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Y
 * @text Y軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default -28
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Align
 * @text 位置揃
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 0
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 顔画像 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Visible
 * @text 表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face X
 * @text X軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 5
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Y
 * @text Y軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 23
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter Visible
 * @text メーターの表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter X
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 52
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter Y
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 33
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number Visible
 * @text 値の表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number X
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 90
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number Y
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 12
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number Align
 * @text 値の位置揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 2
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter Visible
 * @text メーターの表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter X
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 52
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter Y
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 57
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number Visible
 * @text 値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number X
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 90
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number Y
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 36
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number Align
 * @text 値の位置揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 2
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Visible
 * @text メーターの表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter X
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 52
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Y
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 82
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Visible
 * @text 値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number X
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 90
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Y
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 66
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Align
 * @text 値の位置揃え設定
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 2
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> LV <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> レベル <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param LV Number Visible
 * @text 表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param LV Number X
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 30
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param LV Number Y
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 4
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param LV Number Align
 * @text 値の位置揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 1
 * @parent -> LV <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 経験値 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Exp Visible
 * @text 表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Exp X
 * @text X軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 30
 * @parent -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Exp Y
 * @text Y軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 71
 * @parent -> EXP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> ステート <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Visible
 * @text 表示有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default true
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States X
 * @text X軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 4
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Y
 * @text Y軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 24
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Scale
 * @text アイコンの拡大率
 * @type number
 * @default 70
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD位置 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Position X
 * @text HUD1のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Position Y
 * @text HUD1のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 390
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Position X
 * @text HUD2のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Position Y
 * @text HUD2のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 300
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Position X
 * @text HUD3のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Position Y
 * @text HUD3のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 210
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Position X
 * @text HUD4のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Position Y
 * @text HUD4のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 120
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Position X
 * @text HUD5のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Position Y
 * @text HUD5のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 30
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Position X
 * @text HUD6のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Position Y
 * @text HUD6のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Position X
 * @text HUD7のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 150
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Position Y
 * @text HUD7のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Position X
 * @text HUD8のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 300
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Position Y
 * @text HUD8のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Position X
 * @text HUD9のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 450
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Position Y
 * @text HUD9のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param --------------------------------------------------------------------
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Position X
 * @text HUD10のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @default 600
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Position Y
 * @text HUD10のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @command PartyHudVisible
 * @desc HUD 表示/非表示の切り替え
 * @text 表示/非表示
 *
 * @arg visible
 * @desc HUDを表示または非表示にします。
 * @text 表示有効化
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ============================================================================
 * +++ MOG - Party HUD (v1.1) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * ============================================================================
 * パーティのHUDをマップ表示します。
 * ===========================================================================
 * - 必要ファイル
 * ===========================================================================
 * 画像を下記フォルダに保存してください。
 * /img/partyhud/
 *
 * ->  HPmeter.png
 * ->  MPmeter.png
 * ->  TPmeter.png
 * ->  Expmeter.png
 * ->  Layout.png
 *
 * ===========================================================================
 * アクターのHUD用顔画像のファイル名は、下記のように名前を付けます。
 *
 * Face_ + ACTOR_ID.png
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ...
 *
 * ===========================================================================
 * - プラグインコマンド
 * ===========================================================================
 * HUDを表示/非表示にするプラグインコマンドがあります。
 *
 * ============================================================================
 * * 更新履歴
 * ============================================================================
 * (v1.1) エンコーディングに関連するソート機能の修正。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_PartyHud = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_PartyHud');
Moghunter.partyHud_Max = 10;
Moghunter.partyHud_SkipLeader = String(Moghunter.parameters['Skip Leader'] || 'true');
Moghunter.partyHud_StartVisible = String(Moghunter.parameters['Start Visible'] || 'true');
Moghunter.partyHud_SmartFade = String(Moghunter.parameters['Smart Fade'] || 'true');
Moghunter.partyHud_NumberFontSize = Number(Moghunter.parameters['Font Size'] || 14);
Moghunter.partyHud_FaceV = String(Moghunter.parameters['Face Visible'] || 'true');
Moghunter.partyHud_FaceX = Number(Moghunter.parameters['Face X'] || 5);
Moghunter.partyHud_FaceY = Number(Moghunter.parameters['Face Y'] || 25);
Moghunter.partyHud_HPMeterV = String(Moghunter.parameters['HP Meter Visible'] || 'true');
Moghunter.partyHud_HPMeterX = Number(Moghunter.parameters['HP Meter X'] || 52);
Moghunter.partyHud_HPMeterY = Number(Moghunter.parameters['HP Meter Y'] || 34);
Moghunter.partyHud_MPMeterV = String(Moghunter.parameters['MP Meter Visible'] || 'true');
Moghunter.partyHud_MPMeterX = Number(Moghunter.parameters['MP Meter X'] || 52);
Moghunter.partyHud_MPMeterY = Number(Moghunter.parameters['MP Meter Y'] || 58);
Moghunter.partyHud_TPMeterV = String(Moghunter.parameters['TP Meter Visible'] || 'true');
Moghunter.partyHud_TPMeterX = Number(Moghunter.parameters['TP Meter X'] || 52);
Moghunter.partyHud_TPMeterY = Number(Moghunter.parameters['TP Meter Y'] || 82);
Moghunter.partyHud_HPNumberV = String(Moghunter.parameters['HP Number Visible'] || 'true');
Moghunter.partyHud_HPNumberX = Number(Moghunter.parameters['HP Number X'] || 90);
Moghunter.partyHud_HPNumberY = Number(Moghunter.parameters['HP Number Y'] || 12);
Moghunter.partyHud_HPNumberA = Number(Moghunter.parameters['HP Number Align'] || 2);
Moghunter.partyHud_MPNumberV = String(Moghunter.parameters['MP Number Visible'] || 'true');
Moghunter.partyHud_MPNumberX = Number(Moghunter.parameters['MP Number X'] || 90);
Moghunter.partyHud_MPNumberY = Number(Moghunter.parameters['MP Number Y'] || 36);
Moghunter.partyHud_MPNumberA = Number(Moghunter.parameters['MP Number Align'] || 2);
Moghunter.partyHud_TPNumberV = String(Moghunter.parameters['TP Number Visible'] || 'true');
Moghunter.partyHud_TPNumberX = Number(Moghunter.parameters['TP Number X'] || 90);
Moghunter.partyHud_TPNumberY = Number(Moghunter.parameters['TP Number Y'] || 66);
Moghunter.partyHud_TPNumberA = Number(Moghunter.parameters['TP Number Align'] || 2);
Moghunter.partyHud_LVNumberV = String(Moghunter.parameters['LV Number Visible'] || 'true');
Moghunter.partyHud_LVNumberX = Number(Moghunter.parameters['LV Number X'] || 30);
Moghunter.partyHud_LVNumberY = Number(Moghunter.parameters['LV Number Y'] || 4);
Moghunter.partyHud_LVNumberA = Number(Moghunter.parameters['LV Number Align'] || 1);
Moghunter.partyHud_NameV = String(Moghunter.parameters['Name Visible'] || 'true');
Moghunter.partyHud_NameX = Number(Moghunter.parameters['Name X'] || 5);
Moghunter.partyHud_NameY = Number(Moghunter.parameters['Name Y'] || -28);
Moghunter.partyHud_NameA = Number(Moghunter.parameters['Name Align'] || 0);
Moghunter.partyHud_StatesV = String(Moghunter.parameters['States Visible'] || 'true');
Moghunter.partyHud_StatesX = Number(Moghunter.parameters['States X'] || 4);
Moghunter.partyHud_StatesY = Number(Moghunter.parameters['States Y'] || 26);
Moghunter.partyHud_StatesS = Number(Moghunter.parameters['States Scale'] || 70);
Moghunter.partyHud_ExpMeterV = String(Moghunter.parameters['Exp Visible'] || 'true');
Moghunter.partyHud_ExpMeterX = Number(Moghunter.parameters['Exp X'] || 30);
Moghunter.partyHud_ExpMeterY = Number(Moghunter.parameters['Exp Y'] || 71);
Moghunter.partyHud_Visible = []; Moghunter.partyHud_LayX = []; Moghunter.partyHud_LayY = [];
for (var i = 0; i < Moghunter.partyHud_Max; i++) {
	Moghunter.partyHud_LayX[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Position X'] || 0);
	Moghunter.partyHud_LayY[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Position Y'] || 0);
};

//=============================================================================
// ■■■  PluginManager ■■■ 
//=============================================================================	
PluginManager.registerCommand('MOG_PartyHud', "PartyHudVisible", data => {
	var vis = String(data.visible) == "true" ? true : false;
	$gameSystem._partyHudData[0] = vis;
});

//=============================================================================
// ■■■ ImageManager ■■■
//=============================================================================	

//=============================
// * Load Party Hud
//=============================
ImageManager.loadPartyHud = function (filename) {
	return this.loadBitmap('img/partyhud/', filename, 0, true);
};

//==============================
// * Command129
//==============================
var _mog_partyHud_command129 = Game_Interpreter.prototype.command129;
Game_Interpreter.prototype.command129 = function (params) {
	_mog_partyHud_command129.call(this, params);
	$gameSystem._partyHudData[1] = true;
	return true;
};

//=============================================================================
// ■■■ Game System ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_partyHud_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	_mog_partyHud_gsys_initialize.call(this);
	var v = String(Moghunter.partyHud_StartVisible) === 'true' ? true : false;
	this._partyHudData = [v, false];
};

//=============================================================================
// ■■■ Game BattlerBase ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_partyHud_gbat_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function () {
	_mog_partyHud_gbat_initMembers.call(this);
	this._needRefStatesHud = false;
};

//==============================
// ♦ ALIAS ♦  addNewState
//==============================
var _mog_partyHud_addNewState = Game_BattlerBase.prototype.addNewState
Game_BattlerBase.prototype.addNewState = function (stateId) {
	_mog_partyHud_addNewState.call(this, stateId);
	this._needRefStatesHud = true;
};

//==============================
// ♦ ALIAS ♦  eraseState
//==============================
var _mog_partyHud_eraseState = Game_BattlerBase.prototype.eraseState
Game_BattlerBase.prototype.eraseState = function (stateId) {
	_mog_partyHud_eraseState.call(this, stateId);
	this._needRefStatesHud = true;
};

//=============================================================================
// ■■■ Game Actor ■■■
//=============================================================================

//==============================
// * Current EXP R
//==============================
Game_Actor.prototype.current_exp_r = function () {
	return this.nextLevelExp() - this.nextRequiredExp() - this.expForLevel(this._level);
};

//==============================
// * Next Level EXP R
//==============================
Game_Actor.prototype.nextLevelExp_r = function () {
	return this.expForLevel(this._level + 1) - this.expForLevel(this._level);
};

//=============================================================================
// ■■■ Game_Party ■■■
//=============================================================================	

//==============================
// ♦ ALIAS ♦  Swap Order
//==============================
var _mog_partyHud_gparty_swapOrder = Game_Party.prototype.swapOrder;
Game_Party.prototype.swapOrder = function (index1, index2) {
	_mog_partyHud_gparty_swapOrder.call(this, index1, index2);
	$gameSystem._partyHudData[1] = true;
};

//=============================================================================
// ■■■ Game Character Base ■■■  
//=============================================================================

//==============================
// * Screen RealX
//==============================
Game_CharacterBase.prototype.screen_realX = function () {
	return this.scrolledX() * $gameMap.tileWidth()
};

//==============================
// * Screen RealY
//==============================
Game_CharacterBase.prototype.screen_realY = function () {
	return this.scrolledY() * $gameMap.tileHeight()
};

//=============================================================================
// ■■■ Scene Base ■■■
//=============================================================================

//==============================
// ** create Hud Field
//==============================
Scene_Base.prototype.createHudField = function () {
	this._hudField = new Sprite();
	this._hudField.z = 10;
	this.addChild(this._hudField);
};

//==============================
// ** sort MZ
//==============================
Scene_Base.prototype.sortMz = function () {
	this._hudField.children.sort((a, b) => a.z - b.z);
};

//=============================================================================
// ■■■ Scene Map ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  create Spriteset
//==============================
var _mog_partyHud_sMap_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function () {
	_mog_partyHud_sMap_createSpriteset.call(this);
	if (!this._hudField) { this.createHudField() };
	this.createPartyHud();
	this.sortMz();
};

//==============================
// ♦ ALIAS ♦  snapForBattleBackground
//==============================
var _mog_partyHud_scnMap_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
Scene_Map.prototype.snapForBattleBackground = function () {
	if (this._hudField && SceneManager.isNextScene(Scene_Battle)) { this._hudField.visible = false };
	_mog_partyHud_scnMap_snapForBattleBackground.call(this);
};

//==============================
// ** create Party Hud
//==============================
Scene_Map.prototype.createPartyHud = function () {
	this._partyHud = [];
	var s = String(Moghunter.partyHud_SkipLeader) === 'true' ? 1 : 0;
	for (var i = 0; i < $gameParty.maxBattleMembers() - s; i++) {
		var actor = $gameParty.members()[i + s];
		this._partyHud[i] = new PartyHud(i, actor);
		this._partyHud[i].z = 105;
		this._hudField.addChild(this._partyHud[i]);
	};
};

//==============================
// * refresh Party Hud
//==============================
Scene_Map.prototype.refreshPartyHud = function () {
	$gameSystem._partyHudData[1] = false;
	for (var i = 0; i < this._partyHud.length; i++) {
		this._hudField.removeChild(this._partyHud[i]);
		this._partyHud[i].destroy();
		this._partyHud[i] = null;
	};
	this.createPartyHud();
};

//==============================
// ♦ ALIAS ♦  update
//==============================
var _mog_partyHud_scnMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
	_mog_partyHud_scnMap_update.call(this);
	if ($gameSystem._partyHudData[1]) { this.refreshPartyHud() };
};

//=============================================================================
// ■■■ Party Hud ■■■
//=============================================================================
function PartyHud() {
	this.initialize.apply(this, arguments);
};

PartyHud.prototype = Object.create(Sprite.prototype);
PartyHud.prototype.constructor = PartyHud;

//==============================
// * Initialize
//==============================
PartyHud.prototype.initialize = function (index, actor) {
	Sprite.prototype.initialize.call(this);
	this._index = index;
	this._actor = actor;
	this._actorId = null;
	this._enabled = this._actor ? true : false;
	if (this._enabled) { this.createSprites() };
};

//==============================
// * Create Sprites
//==============================
PartyHud.prototype.createSprites = function () {
	this._smartFade = String(Moghunter.partyHud_SmartFade) === 'true' ? true : false;
	this._hud_size = [-1, 0, 0, 0];
	this._hp = [this._actor.hp, this._actor.mhp];
	this._mp = [this._actor.mp, this._actor.mmp];
	this._lv = this._actor.level;
	this._state_img = ImageManager.loadSystem("IconSet");
	this.createLayout();
	if (String(Moghunter.partyHud_FaceV) === 'true') { this.createFace() };
	if (String(Moghunter.partyHud_HPMeterV) === 'true') { this.createHPMeter() };
	if (String(Moghunter.partyHud_MPMeterV) === 'true') { this.createMPMeter() };
	if (String(Moghunter.partyHud_TPMeterV) === 'true') { this.createTPMeter() };
	if (String(Moghunter.partyHud_ExpMeterV) === 'true') { this.createExpMeter() };
	if (String(Moghunter.partyHud_HPNumberV) === 'true') { this.createHPNumber() };
	if (String(Moghunter.partyHud_MPNumberV) === 'true') { this.createMPNumber() };
	if (String(Moghunter.partyHud_TPNumberV) === 'true') { this.createTPNumber() };
	if (String(Moghunter.partyHud_LVNumberV) === 'true') { this.createLVNumber() };
	if (String(Moghunter.partyHud_StatesV) === 'true') { this.createStates() };
	if (String(Moghunter.partyHud_NameV) === 'true') { this.createName() };
	if (this.needHide()) { this.opacity = 0 };
};

//==============================
// * Create Layout
//==============================
PartyHud.prototype.createLayout = function () {
	this._layout = new Sprite(ImageManager.loadPartyHud("Layout"));
	this._layout.x = Number(Moghunter.partyHud_LayX[this._index]);
	this._layout.y = Number(Moghunter.partyHud_LayY[this._index]);
	this.addChild(this._layout);
};

//==============================
// * Create Name
//==============================
PartyHud.prototype.createName = function () {
	this._name = new Sprite(new Bitmap(200, 64));
	this._name.x = this._layout.x + Number(Moghunter.partyHud_NameX);
	this._name.y = this._layout.y + Number(Moghunter.partyHud_NameY);
	this._name.org = [this._name.x, this._name.y];
	this._name.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);
	this.addChild(this._name);
};

//==============================
// * Create Face
//==============================
PartyHud.prototype.createFace = function () {
	var fileName = "Face_" + this._actor._actorId;
	this._face = new Sprite(ImageManager.loadPartyHud(String(fileName)));
	this._face.x = this._layout.x + Number(Moghunter.partyHud_FaceX);
	this._face.y = this._layout.y + Number(Moghunter.partyHud_FaceY);
	this.refreshFace();
	this.addChild(this._face);
};

//==============================
// * Refresh Face
//==============================
PartyHud.prototype.refreshFace = function () {
	var fileName = "Face_" + this._actor._actorId;
	this._face.bitmap = ImageManager.loadPartyHud(String(fileName));
};

//==============================
// * Create HP Meter
//==============================
PartyHud.prototype.createHPMeter = function () {
	this._hpmeter = new Sprite(ImageManager.loadPartyHud("HPMeter"));
	this._hpmeter.x = this._layout.x + Number(Moghunter.partyHud_HPMeterX);
	this._hpmeter.y = this._layout.y + Number(Moghunter.partyHud_HPMeterY);
	this.addChild(this._hpmeter);
};

//==============================
// * Create MP Meter
//==============================
PartyHud.prototype.createMPMeter = function () {
	this._mpmeter = new Sprite(ImageManager.loadPartyHud("MPMeter"));
	this._mpmeter.x = this._layout.x + Number(Moghunter.partyHud_MPMeterX);
	this._mpmeter.y = this._layout.y + Number(Moghunter.partyHud_MPMeterY);
	this.addChild(this._mpmeter);
};

//==============================
// * Create TP Meter
//==============================
PartyHud.prototype.createTPMeter = function () {
	this._tpmeter = new Sprite(ImageManager.loadPartyHud("TPMeter"));
	this._tpmeter.x = this._layout.x + Number(Moghunter.partyHud_TPMeterX);
	this._tpmeter.y = this._layout.y + Number(Moghunter.partyHud_TPMeterY);
	this.addChild(this._tpmeter);
};

//==============================
// * Create Exp Meter
//==============================
PartyHud.prototype.createExpMeter = function () {
	this._expmeter = new Sprite(ImageManager.loadPartyHud("EXPmeter"));
	this._expmeter.x = this._layout.x + Number(Moghunter.partyHud_ExpMeterX);
	this._expmeter.y = this._layout.y + Number(Moghunter.partyHud_ExpMeterY);
	this.addChild(this._expmeter);
};

//==============================
// * refresh Meter
//==============================
PartyHud.prototype.refreshMeter = function (sprite, value1, value2) {
	var w = sprite.bitmap.width;
	var h = sprite.bitmap.height;
	var wd = w * value1 / value2;
	sprite.setFrame(0, 0, wd, h);
};

//==============================
// * Create HP Number
//==============================
PartyHud.prototype.createHPNumber = function () {
	this._hpnumber = new Sprite(new Bitmap(200, 32));
	this._hpnumber.x = this._layout.x + Number(Moghunter.partyHud_HPNumberX);
	this._hpnumber.y = this._layout.y + Number(Moghunter.partyHud_HPNumberY);
	this._hpnumber.org = [this._hpnumber.x, this._hpnumber.y];
	this._hpnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);
	this.addChild(this._hpnumber);
};

//==============================
// * Create MP Number
//==============================
PartyHud.prototype.createMPNumber = function () {
	this._mpnumber = new Sprite(new Bitmap(200, 32));
	this._mpnumber.x = this._layout.x + Number(Moghunter.partyHud_MPNumberX);
	this._mpnumber.y = this._layout.y + Number(Moghunter.partyHud_MPNumberY);
	this._mpnumber.org = [this._mpnumber.x, this._mpnumber.y];
	this._mpnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);
	this.addChild(this._mpnumber);
};

//==============================
// * Create TP Number
//==============================
PartyHud.prototype.createTPNumber = function () {
	this._tpnumber = new Sprite(new Bitmap(200, 32));
	this._tpnumber.x = this._layout.x + Number(Moghunter.partyHud_TPNumberX);
	this._tpnumber.y = this._layout.y + Number(Moghunter.partyHud_TPNumberY);
	this._tpnumber.org = [this._tpnumber.x, this._tpnumber.y];
	this._tpnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);
	this.addChild(this._tpnumber);
};

//==============================
// * Create LP Number
//==============================
PartyHud.prototype.createLVNumber = function () {
	this._lvnumber = new Sprite(new Bitmap(200, 32));
	this._lvnumber.x = this._layout.x + Number(Moghunter.partyHud_LVNumberX);
	this._lvnumber.y = this._layout.y + Number(Moghunter.partyHud_LVNumberY);
	this._lvnumber.org = [this._lvnumber.x, this._lvnumber.y];
	this._lvnumber.bitmap.fontSize = Number(Moghunter.partyHud_NumberFontSize);
	this.addChild(this._lvnumber);
};

//==============================
// * Refresh Text
//==============================
PartyHud.prototype.refreshText = function (sprite, value, align) {
	sprite.bitmap.clear();
	sprite.bitmap.drawText(String(value), 0, 0, sprite.bitmap.width - 10, sprite.bitmap.height - 10, this.aligntype(align));
	if (align === 1) {
		sprite.x = sprite.org[0] - (sprite.bitmap.width / 2) + 10;
	} else if (align === 2) {
		sprite.x = sprite.org[0] - sprite.bitmap.width + 20;
	};
};

//==============================
// * Create States
//==============================
PartyHud.prototype.createStates = function () {
	this.removeChild(this._state_icon);
	if (!this._actor) { return };
	this._states_data = [0, 0, 0];
	this._state_icon = new Sprite(this._state_img);
	this._state_icon.x = this._layout.x + Number(Moghunter.partyHud_StatesX);
	this._state_icon.y = this._layout.y + Number(Moghunter.partyHud_StatesY);
	var scale = Number(Moghunter.partyHud_StatesS) * 0.01;
	this._state_icon.scale.x = scale;
	this._state_icon.scale.y = scale;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refreshStates();
};

//==============================
// * Refresh States
//==============================
PartyHud.prototype.refreshStates = function () {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._actor.allIcons().length == 0) { this._states_data[1] = 0; return };
	if (this._actor.allIcons()[this._states_data[1]]) {
		this._states_data[0] = this._actor.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
		this._actor._needRefStatesHud = false;
	};
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._actor.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Need Refresh States
//==============================
PartyHud.prototype.needRefreshStates = function () {
	if (this._actor._needRefStatesHud) { return true };
	if (this._states_data[2] > 60) { return true };
	return false;
};

//==============================
// * Update States
//==============================
PartyHud.prototype.updateStates = function () {
	this._states_data[2] += 1;
	if (this.needRefreshStates()) { this.refreshStates(); };
};

//==============================
// * Refresh Hud
//==============================
PartyHud.prototype.refreshHud = function () {
	if (this._hpmeter) { this.refreshMeter(this._hpmeter, this._actor.hp, this._actor.mhp) };
	if (this._mpmeter) { this.refreshMeter(this._mpmeter, this._actor.mp, this._actor.mmp) };
	if (this._tpmeter) { this.refreshMeter(this._tpmeter, this._actor.tp, 100) };
	if (this._expmeter) {
		if (this._actor.isMaxLevel()) {
			this.refreshMeter(this._expmeter, 1, 1);
		} else {
			this.refreshMeter(this._expmeter, this._actor.current_exp_r(), this._actor.nextLevelExp_r());
		};
	};
	if (this._hpnumber) { this.refreshText(this._hpnumber, this._actor.hp, Moghunter.partyHud_HPNumberA) };
	if (this._mpnumber) { this.refreshText(this._mpnumber, this._actor.mp, Moghunter.partyHud_MPNumberA) };
	if (this._tpnumber) { this.refreshText(this._tpnumber, this._actor.tp, Moghunter.partyHud_TPNumberA) };
	if (this._lvnumber) { this.refreshText(this._lvnumber, this._actor.level, Moghunter.partyHud_LVNumberA) };
	if (this._actorId != this._actor._actorId) {
		if (this._name) { this.refreshText(this._name, this._actor._name, Moghunter.partyHud_NameA) };
		if (this._face) { this.refreshFace() }
	};
};

//==============================
// * need Refresh Hud
//==============================
PartyHud.prototype.needRefreshHud = function () {
	if (!this._actor) { return false };
	if (this._hp[0] != this._actor.hp) { return true };
	if (this._hp[1] != this._actor.mhp) { return true };
	if (this._mp[0] != this._actor.mp) { return true };
	if (this._mp[1] != this._actor.mmp) { return true };
	if (this._lv != this._actor.level) { return true };
	if (this._actorId != this._actor._actorId) { return true };
	return false
};

//==============================
// * Align Type
//==============================
PartyHud.prototype.aligntype = function (align) {
	if (Number(align) === 0) {
		return "left"
	} else if (Number(align) === 1) {
		return "center"
	} else { return "right" };
};

//==============================
// * Update
//==============================
PartyHud.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._enabled) { this.updateSprites() };
};

//==============================
// * Need Hide
//==============================
PartyHud.prototype.needHide = function () {
	if ($gameMessage.isBusy()) { return true };
	if (!$gameSystem._partyHudData[0]) { return true };
	if (Imported.MOG_ChronoEngine && $gameSystem.isChronoMode()) { return true };
	if (!this._actor) { return true };
	return false
};

//==============================
// * Need Fade
//==============================
PartyHud.prototype.needFade = function () {
	if (this._hud_size[0] === -1) { return false };
	if (!this._smartFade) { return false };
	if ($gamePlayer.screen_realX() < this._hud_size[0]) { return false };
	if ($gamePlayer.screen_realX() > this._hud_size[2]) { return false };
	if ($gamePlayer.screen_realY() < this._hud_size[1]) { return false };
	if ($gamePlayer.screen_realY() > this._hud_size[3]) { return false };
	return true;
};

//==============================
// * get Data
//==============================
PartyHud.prototype.getData = function () {
	this._hud_size[0] = this._layout.x - ($gameMap.tileWidth() / 2);
	this._hud_size[1] = this._layout.y - ($gameMap.tileHeight() / 2);
	this._hud_size[2] = this._layout.x + this._layout.bitmap.width;
	this._hud_size[3] = this._layout.y + this._layout.bitmap.height;
	this.refreshHud();
};

//==============================
// * Update Visible
//==============================
PartyHud.prototype.updateVisible = function () {
	if (this.needHide()) {
		this.opacity -= 15;
	} else {
		if (this.needFade()) {
			if (this.opacity > 90) {
				this.opacity -= 10;
				if (this.opacity < 90) { this.opacity = 90 };
			};
		} else {
			this.opacity += 10;
		};
	};
};

//==============================
// * Update Sprites
//==============================
PartyHud.prototype.updateSprites = function () {
	if (this.needRefreshHud()) { this.refreshHud() };
	if (this._hud_size[0] === -1 && this._layout.bitmap.isReady()) { this.getData() };
	if (this._state_icon) { this.updateStates() };
	this.updateVisible();
};
