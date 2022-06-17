//=============================================================================
// MOG_BattleHud.js   -   (Template 11)
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.1) Permite customizar o layout de batalha.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param Hud X-Axis
 * @text X-Axis
 * @desc Definição da posição X-Axis da Hud.
 * @default -90
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Y-Axis
 * @text Y-Axis
 * @desc Definição da posição Y-Axis da Hud.
 * @default 480
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Space X
 * @text Space X
 * @desc Define o espaço na horizontal entre as huds.
 * @default 0
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Space Y
 * @text Space Y
 * @desc Define o espaço na vertical entre as huds.
 * @default 0
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Slide X
 * @text Slide Animation X
 * @desc Deslizar X-Axis.
 * @default 0
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Slide Y
 * @text Slide Animation Y
 * @desc Deslizar Y-Axis.
 * @default 250
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Vertical Mode
 * @desc Deixar a Hud na posição vertical.
 * @default false 
 * @type boolean
 * @on Vertical Mode
 * @off Horizontal Mode 
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Max Battle Members
 * @desc Quantidade de maxima de battler na batalha.
 * @type number
 * @min 1 
 * @default 4
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Layout2 Visible
 * @text Visible
 * @desc Ativar o segunda imagem do layout, esta imagem 
 * ficará acima das faces e medidores.
 * @default true
 * @type boolean 
 * @parent -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout2 X-Axis
 * @text X-Axis
 * @desc Definição da posição X-Axis da Hud.
 * @default 0
 * @parent -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout2 Y-Axis
 * @text Y-Axis
 * @desc Definição da posição Y-Axis da Hud.
 * @default 0
 * @parent -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *
 * @param Turn Visible
 * @text Visible
 * @desc Apresentar a imagem do turno.
 * @default true
 * @type boolean
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn X-Axis
 * @text X-Axis
 * @desc Definição da posição X-Axis do turno.
 * @default -5
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn Y-Axis
 * @text Y-Axis
 * @desc Definição da posição Y-Axis do turno.
 * @default -160
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn Rotation Speed
 * @text Rotation Animation Speed
 * @desc Definição da velocidade de rotação da imagem.
 * @default 0
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn Zoom Animation
 * @text Zoom Animation
 * @desc Ativar a animação de zoom ao ativar.
 * @default true
 * @type boolean 
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 *
 * @param Face Visible
 * @text Visible
 * @desc Apresentar a imagem da face.
 * @default true
 * @type boolean 
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face X-Axis
 * @text X-Axis
 * @desc Definição da posição X-Axis da face.
 * @default 70
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Y-Axis
 * @text Y-Axis
 * @desc Definição da posição Y-Axis da face.
 * @default 40
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Face Shake Animation
 * @text Shake Animation
 * @desc Ativar animação de tremer da face.
 * @default true
 * @type boolean 
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Face Zoom Animation
 * @text Zoom Animation
 * @desc Ativar animação de zoom de ação.
 * @default true
 * @type boolean 
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Face Frame Animation
 * @text Animated (Frames)
 * @desc Ativar animação por frames.
 *       É necessário dividir a imagem por 5.
 * @default true
 * @type boolean 
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Face Priority
 * @text Priority
 * @desc Prioridade da Face. (0 Low - 1 High)
 * @type select
 * @option Low (Below of Gauge)
 * @value 0
 * @option High (Above of Gauge)
 * @value 1
 * @default 0
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 * 
 * @param -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Name Visible
 * @text Visible
 * @desc Apresentar o nome do personagem.
 * @default true
 * @type boolean 
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name X-Axis
 * @text X-Axis
 * @desc Definição da posição X-Axis do nome.
 * @default -45
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Name Y-Axis
 * @text Y-Axis
 * @desc Definição da posição Y-Axis do nome.
 * @default 65
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Name Align
 * @text Text Alignment
 * @desc Alinhamento do nome.
 * 0 - Left  1 - Center   2 - Right
 * @type select
 * @option Left
 * @value 0
 * @option Center
 * @value 1
 * @option Right
 * @value 2 
 * @default 1
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Name Font Size
 * @text Font Size
 * @desc Definição do tamanho da fonte do nome.
 * @default 20
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Name Bold Size
 * @text Bold Size
 * @desc Definição do tamanho do contorno.
 * @default 4
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Name Font Italic
 * @text Font Italic
 * @desc Ativar fonte em itálico.
 * @default false
 * @type boolean 
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 * 
 * @param -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * @desc  
 * 
 * @param HP Meter Visible
 * @text Gauge Visible
 * @desc Apresentar o medidor de HP
 * @default true
 * @type boolean 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter X-Axis
 * @text Gauge X-Axis
 * @desc Definição da posição X-Axis do medidor de HP.
 * @default 87
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param HP Meter Y-Axis
 * @text Gauge Y-Axis
 * @desc Definição da posição Y-Axis do medidor de HP.
 * @default 7
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param HP Meter Angle
 * @text Gauge Angle
 * @desc Ángulo do medidor.
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param HP Meter Flow Anime
 * @text Gradient Animation
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default true
 * @type boolean 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param HP Number Visible
 * @text Number Visible
 * @desc Apresentar o numero de HP
 * @default true
 * @type boolean 
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param HP Number Align type
 * @text Number Alignment
 * @desc Definição do tipo de alinhamento dos números.
 * (0 - right / 1 - Center / 2 - Left / 3 - Diagonal)
 * @type select
 * @option Right
 * @value 0
 * @option Center
 * @value 1
 * @option Left
 * @value 2
 * @option Diagonal
 * @value 3
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param HP Number X-Axis
 * @text Number X-Axis
 * @desc Definição da posição X-Axis do numero de HP.
 * @default 170
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param HP Number Y-Axis
 * @text Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de HP.
 * @default -11
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param MaxHP Number Visible
 * @text Max HP Visible
 * @desc Apresentar o numero de HP maximo.
 * @default false
 * @type boolean
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MaxHP Number X-Axis
 * @text Max HP X-Axis
 * @desc Definição da posição X-Axis do numero de HP maximo.
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MaxHP Number Y-Axis
 * @text Max HP Y-Axis
 * @desc Definição da posição Y-Axis do numero de HP maximo.
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 * 
 * @param -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param MP Meter Visible
 * @text Gauge Visible
 * @desc Apresentar o medidor de MP
 * @default true
 * @type boolean
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter X-Axis
 * @text Gauge X-Axis
 * @desc Definição da posição X-Axis do medidor de MP.
 * @default 104
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MP Meter Y-Axis
 * @text Gauge Y-Axis
 * @desc Definição da posição Y-Axis do medidor de MP.
 * @default 33
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MP Meter Angle
 * @text Gauge Angle
 * @desc Ángulo do medidor.
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MP Meter Flow Anime
 * @text Gradient Animation
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default true
 * @type boolean
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MP Number Visible
 * @text Number Visible
 * @desc Apresentar o numero de MP
 * @default true
 * @type boolean
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MP Number Align type
 * @text Number Alignment
 * @desc Definição do tipo de alinhamento dos números.
 * (0 - right / 1 - Center / 2 - Left / 3 - Diagonal)
 * @type select
 * @option Right
 * @value 0
 * @option Center
 * @value 1
 * @option Left
 * @value 2
 * @option Diagonal
 * @value 3
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param MP Number X-Axis
 * @text Number X-Axis
 * @desc Definição da posição X-Axis do numero de MP.
 * @default 187
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MP Number Y-Axis
 * @text Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de MP.
 * @default 26
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MaxMP Number Visible
 * @text Max MP Visible
 * @desc Apresentar o numero de MP maximo.
 * @default false
 * @type boolean
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MaxMP Number X-Axis
 * @text Max HP X-Axis
 * @desc Definição da posição X-Axis do numero de MP maximo.
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param MaxMP Number Y-Axis
 * @text Max HP Y-Axis
 * @desc Definição da posição Y-Axis do numero de MP maximo.
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 * 
 * @param -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param TP Meter Visible
 * @text Gauge Visible
 * @desc Apresentar o medidor de TP
 * @default true
 * @type boolean
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter X-Axis
 * @text Gauge X-Axis
 * @desc Definição da posição X-Axis do medidor de TP.
 * @default 104
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Y-Axis
 * @text Gauge Y-Axis
 * @desc Definição da posição Y-Axis do medidor de TP.
 * @default 59
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Angle
 * @text Gauge Angle
 * @desc Ángulo do medidor.
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Flow Anime
 * @text Gradient Animation
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default true
 * @type boolean
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Visible
 * @text Number Visible
 * @desc Apresentar o numero de TP.
 * @default true
 * @type boolean
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Align type
 * @text Number Alignment
 * @desc Definição do tipo de alinhamento dos números.
 * (0 - right / 1 - Center / 2 - Left / 3 - Diagonal)
 * @type select
 * @option Right
 * @value 0
 * @option Center
 * @value 1
 * @option Left
 * @value 2
 * @option Diagonal
 * @value 3
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number X-Axis
 * @text Number X-Axis
 * @desc Definição da posição X-Axis do numero de TP.
 * @default 187
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Y-Axis
 * @text Number Y-Axis
 * @desc Definição da posição Y-Axis do numero de TP.
 * @default 43
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxTP Number Visible
 * @text Max TP Visible
 * @desc Apresentar o numero de TP maximo.
 * @default false
 * @type boolean
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxTP Number X-Axis
 * @text Max TP X-Axis
 * @desc Definição da posição X-Axis do numero de TP maximo.
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxTP Number Y-Axis
 * @text Max TP Y-Axis
 * @desc Definição da posição Y-Axis do numero de TP maximo.
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param ATB Meter Visible
 * @text Gauge Visible
 * @desc Apresentar o medidor de TP
 * @default true
 * @type boolean
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter X-Axis
 * @text Gauge X-Axis
 * @desc Definição da posição X-Axis do medidor de ATB.
 * @default 69
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter Y-Axis
 * @text Gauge Y-Axis
 * @desc Definição da posição Y-Axis do medidor de ATB.
 * @default 117
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter Angle
 * @text Gauge Angle
 * @desc Ángulo do medidor.
 * @default 0
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter Flow Anime
 * @text Gradient Animation
 * @desc Ativar animação de gradiente no medidor.
 * É necessário que a imagem tenha 3x a largura do medidor.
 * @default true
 * @type boolean
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param States Visible
 * @text Visible
 * @desc Apresentar o numero as condições.
 * @default true
 * @type boolean
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States X-Axis
 * @text X-Axis
 * @desc Definição da posição X-Axis das condições.
 * @default 102
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param States Y-Axis
 * @text Y-Axis
 * @desc Definição da posição Y-Axis das condições.
 * @default 76
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param States Mode
 * @text View Mode
 * @desc Definição do modo apresentado das condições.
 * 0 - Timing Mode     1 - Line Mode
 * @type select
 * @option Timing Mode (Show one state for second)
 * @value 0
 * @option Line Mode (Show all states)
 * @value 1 
 * @default 0
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param States Max
 * @text Max number of states
 * @desc Quantidade maxima de ícones apresentados.
 * @type number
 * @min 1 
 * @default 4
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param States Align
 * @text Alignment
 * @desc Alinhamento dos ícones.
 * 0 - Left  1 - Right  2 - Upper  3 - Below
 * @type select
 * @option Left
 * @value 0
 * @option Right
 * @value 1
 * @option Upper
 * @value 2
 * @option Below
 * @value 3 
 * @default 0
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 * 
 * @param -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> Window Command <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Command Auto Adjust
 * @text Position Mode
 * @desc Ativar ajuste automático baseado na posição
 * da Hud.
 * @type select
 * @option Auto
 * @value 0
 * @option Static
 * @value 1
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis do comando.
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Y-Axis
 * @text Y-Axis
 * @desc Definição do posição Y-axis do comando.
 * @default -120
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Width
 * @text Width
 * @desc Definição da largura da janela.
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Height
 * @text Height
 * @desc Definição da altura da janela.
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Slide X
 * @text Slide Animation X
 * @desc Animação de slide X-Axis.
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Slide Y
 * @text Slide Animation Y
 * @desc Animação de slide Y-Axis.
 * @default 64
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Layout Command
 * @text Layout (Picture)
 * @desc Ativar a imagem de layout.
 * @default true
 * @type boolean
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Command X-Axis
 * @text Layout X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default -20
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Command Y-Axis
 * @text Layout Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -25
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> Window Party <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param W Party X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 325
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Y-Axis
 * @text Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 170
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Width
 * @text Width
 * @desc Definição da largura da janela.
 * @default 0
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Height
 * @text Height
 * @desc Definição da altura da janela.
 * @default 0
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Slide X
 * @text Slide Animation X
 * @desc Animação de Slide X-Axis.
 * @default 0
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Slide Y
 * @text Slide Animation Y
 * @desc Animação de Slide Y-Axis.
 * @default -100
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Party
 * @text Layout (Picture)
 * @desc Ativar a imagem de layout.
 * @default true
 * @type boolean
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Party X-Axis
 * @text Layout X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default -325
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Party Y-Axis
 * @text Layout Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -42
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> Window Help <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param W Help X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Y-Axis
 * @text Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Width
 * @text Width
 * @desc Definição da largura da janela.
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Height
 * @text Height
 * @desc Definição da altura da janela.
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Slide X
 * @text Slide Animation X
 * @desc Animação de Slide X-Axis.
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Slide Y
 * @text Slide Animation Y
 * @desc Animação de Slide Y-Axis.
 * @default -50
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Help
 * @text Layout (Picture)
 * @desc Ativar a imagem de layout.
 * @default true
 * @type boolean
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Help X-Axis
 * @text Layout X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Help Y-Axis
 * @text Layout Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> Window Skill <<<<<<<<<<<<<<<<<<<<<<< 
 * @desc 
 *
 * @param W Skill X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Y-Axis
 * @text Y-Axis 
 * @desc Definição do posição Y-axis do janela.
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Width
 * @text Width 
 * @desc Definição da largura da janela.
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Height
 * @text Height 
 * @desc Definição da altura da janela.
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill maxCols
 * @text Max Columns
 * @desc Definição da quantidade de colunas da janela.
 * @type number
 * @min 1 
 * @default 2
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Slide X
 * @text Slide Animation X
 * @desc Animação de Slide X-Axis.
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param W Skill Slide Y
 * @text Slide Animation Y
 * @desc Animação de Slide Y-Axis.
 * @default 50
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Layout Skill
 * @text Layout (Picture)
 * @desc Ativar a imagem de layout.
 * @default true
 * @type boolean
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Skill X-Axis
 * @text Layout X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Skill Y-Axis
 * @text Layout Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> Window Item <<<<<<<<<<<<<<<<<<<<<<< 
 * @desc 
 * @default  
 *
 * @param W Item X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Y-Axis
 * @text Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Width
 * @text Width
 * @desc Definição da largura da janela.
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Height
 * @text Height
 * @desc Definição da altura da janela.
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item maxCols
 * @text Max Columns
 * @desc Definição da quantidade de colunas da janela.
 * @type number
 * @min 1 
 * @default 2
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Slide X
 * @text Slide Animation X 
 * @desc Animação de Slide X-Axis.
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Slide Y
 * @text Slide Animation Y
 * @desc Animação de Slide Y-Axis.
 * @default 50
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Layout Item
 * @text Layout (Picture)
 * @desc Ativar a imagem de layout.
 * @default true
 * @type boolean
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Item X-Axis
 * @text Layout X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Item Y-Axis
 * @text Layout Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> Window Actor <<<<<<<<<<<<<<<<<<<<<<< 
 * @desc 
 *
 * @param W Actor X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Y-Axis
 * @text Y-Axis
 * @desc Definição do posição Y-axis do janela.
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Width
 * @text Width
 * @desc Definição da largura da janela.
 * @default 200
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Height
 * @text Height
 * @desc Definição da altura da janela.
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor maxCols
 * @text Max Columns
 * @desc Definição da quantidade de colunas da janela.
 * @type number
 * @min 1 
 * @default 1
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Slide X
 * @text Slide Animation X
 * @desc Animação de Slide X-Axis.
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Slide Y
 * @text Slide Animation Y
 * @desc Animação de Slide Y-Axis.
 * @default 50
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Layout Actor
 * @text Layout (Picture)
 * @desc Ativar a imagem de layout.
 * @default true
 * @type boolean
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Actor X-Axis
 * @text Layout X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Actor Y-Axis
 * @text Layout Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> Window Enemy <<<<<<<<<<<<<<<<<<<<<<< 
 * @desc 
 *
 * @param W Enemy X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis da janela.
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Y-Axis
 * @text Y-Axis 
 * @desc Definição do posição Y-axis do janela.
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Width
 * @text Width
 * @desc Definição da largura da janela.
 * @default 200
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Height
 * @text Height
 * @desc Definição da altura da janela.
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy maxCols
 * @text Max Columns
 * @desc Definição da quantidade de colunas da janela.
 * @type number
 * @min 1 
 * @default 2
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Slide X
 * @text Slide Animation X
 * @desc Animação de Slide X-Axis.
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Slide Y
 * @text Slide Animation Y
 * @desc Animação de Slide Y-Axis.
 * @default 50
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Layout Enemy
 * @text Layout (Picture)
 * @desc Ativar a imagem de layout.
 * @default true
 * @type boolean
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Enemy X-Axis
 * @text Layout X-Axis
 * @desc Definição do posição X-axis do layout.
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Enemy Y-Axis
 * @text Layout Y-Axis
 * @desc Definição do posição Y-axis do layout.
 * @default -67
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Screen Layout
 * @text Visible
 * @desc Ativar o Layout da tela.
 * @default true
 * @type boolean
 * @parent -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Screen X-Axis
 * @text X-Axis
 * @desc Definição do posição X-axis da imagem.
 * @default 0
 * @parent -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Screen Y-Axis
 * @text Y-Axis 
 * @desc Definição do posição Y-axis da imagem.
 * @default 0
 * @parent -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Custom Position 1
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 2
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 3
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 4
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 5
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 6
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 7
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 8
 * @desc Definição da posição da hud.
 * Ex -     200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @help  
 * =============================================================================
 * +++ MOG_BattleHud (v1.1) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * =============================================================================
 * O plugin permite customizar o layout de batalha.
 *
 * =============================================================================
 * - REQUIRED FILES
 * ============================================================================= 
 * Serão necessários os arquivos. (img/battlehud/)
 *
 * ->  HP_Meter.png
 * ->  HP_Number.png
 * ->  MP_Meter.png
 * ->  MP_Number.png
 * ->  TP_Meter.png
 * ->  TP_Number.png
 * ->  ATB_Meter.png
 * ->  Layout.png
 * ->  Layout_Actor.png
 * ->  Layout_Command.png
 * ->  Layout_Enemy.png
 * ->  Layout_Help.png
 * ->  Layout_Item.png
 * ->  Layout_Party.png
 * ->  Layout_Screen.png
 * ->  Layout_Skill.png
 * ->  Turn.png
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
 * - NOTETAGS
 * =============================================================================
 * Para ativar o efeito de respirar nas faces utilize a notetag abaixo
 *
 * Face Breath Effect
 *
 * =============================================================================
 * - SCRIPT COMMANDS
 * ============================================================================= 
 * Para ocultar a hud use o comando abaixo.
 *
 *     $gameSystem._bhud_visible = false
 *
 * Para apresentar a hud use o commando abaixo.
 *
 *     $gameSystem._bhud_visible = true
 *
 * =============================================================================
 * * HISTÓRICO
 * ============================================================================= 
 * (v1.1) - Compatibilidade com MOG_Menu_Cursor e outros plugins.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc (v1.1) 戦闘のレイアウトをカスタマイズできます。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_BattleHud.js
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD全般 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -90
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 480
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Space X
 * @text X軸間隔
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Space Y
 * @text Y軸間隔
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Slide X
 * @text X軸スライド量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud Slide Y
 * @text Y軸スライド量
 * @type number
 * @min -9007
 * @max 9007
 * @default 250
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Vertical Mode
 * @text 並べ方
 * @default false
 * @type boolean
 * @on 縦モード
 * @off 水平モード
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Max Battle Members
 * @text 戦闘の最大参加人数
 * @type number
 * @min 1
 * @max 9007
 * @default 4
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> レイアウト2(上レイヤー) <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout2 Visible
 * @text レイアウト2の表示
 * @desc 顔、ゲージの上レイヤーに表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout2 X-Axis
 * @text HUDのX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout2 Y-Axis
 * @text HUDのY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> LAYOUT OVERLAY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> ターン画像 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn Visible
 * @text 表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -5
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -160
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn Rotation Speed
 * @text 回転速度
 * @type number
 * @min -9007
 * @max 9007
 * @decimals 2
 * @default 0
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Turn Zoom Animation
 * @text 拡大アニメーション有効
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> TURN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 顔画像 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Visible
 * @text 表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face X-Axis
 * @text X軸位置
 * @default 70
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 40
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Shake Animation
 * @text 振動アニメーションの有効化
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Zoom Animation
 * @text 拡大アニメーションの有効化
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Frame Animation
 * @text フレーム有効化
 * @desc 顔画像フレーム有効化。画像が5分割されます。左から 待機時 / HP回復時 / 行動時 / 被ダメージ時・瀕死時 / 戦闘不能時
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Face Priority
 * @text 優先順位
 * @type select
 * @option 低い(ゲージの下)
 * @value 0
 * @option 高い(ゲージの上)
 * @value 1
 * @default 0
 * @parent -> FACE <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> アクター名 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Visible
 * @text 表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -45
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 65
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Align
 * @text 文字配置
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @default 1
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Font Size
 * @text フォントサイズ
 * @type number
 * @max 9007
 * @default 20
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Bold Size
 * @text 文字太さ
 * @type number
 * @max 9007
 * @default 4
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Name Font Italic
 * @text フォントをイタリック化
 * @default false
 * @type boolean
 * @on イタリック
 * @off 通常
 * @parent -> NAME <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter Visible
 * @text メーター表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter X-Axis
 * @text メーターX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 87
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter Y-Axis
 * @text メーターY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 7
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter Angle
 * @text メーター角度
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Meter Flow Anime
 * @text メーターのフローアニメ有効化
 * @desc 画像はHPメータの幅の3倍である必要があります。
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number Visible
 * @text 値の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number Align type
 * @text 値の文字配置
 * @type select
 * @option 右
 * @value 0
 * @option 中央
 * @value 1
 * @option 左
 * @value 2
 * @option 対角線
 * @value 3
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number X-Axis
 * @text HP値のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 170
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param HP Number Y-Axis
 * @text HP値のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -11
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxHP Number Visible
 * @text 最大HP値の表示
 * @default false
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxHP Number X-Axis
 * @text 最大HP値のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxHP Number Y-Axis
 * @text 最大HP値のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> HP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> MP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter Visible
 * @text メーターの表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter X-Axis
 * @text メーターのX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 104
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter Y-Axis
 * @text メーターのY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 33
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter Angle
 * @text メーターの角度設定
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Meter Flow Anime
 * @text メーターのフローアニメ有効化
 * @desc 画像はゲージの幅の3倍である必要があります。
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number Visible
 * @text 値の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number Align type
 * @text 値の文字配置
 * @type select
 * @option 右
 * @value 0
 * @option 中央
 * @value 1
 * @option 左
 * @value 2
 * @option 対角線
 * @value 3
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number X-Axis
 * @text 値のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 187
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MP Number Y-Axis
 * @text 値のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 26
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxMP Number Visible
 * @text 最大値の表示
 * @default false
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxMP Number X-Axis
 * @text 最大値のX軸位置
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxMP Number Y-Axis
 * @text 最大値のY軸位置
 * @default 0
 * @parent -> MP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> TP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Visible
 * @text メーターの表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter X-Axis
 * @text メーターのX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 104
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Y-Axis
 * @text メーターのY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 59
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Angle
 * @text メーターの角度設定
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Meter Flow Anime
 * @text メーターのフローアニメ有効化
 * @desc 画像はゲージの幅の3倍である必要があります。
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Visible
 * @text 値の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Align type
 * @text 値の文字配置
 * @type select
 * @option 右
 * @value 0
 * @option 中央
 * @value 1
 * @option 左
 * @value 2
 * @option 対角線
 * @value 3
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number X-Axis
 * @text 値のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 187
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param TP Number Y-Axis
 * @text 値のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 43
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxTP Number Visible
 * @text 最大値の表示
 * @default false
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxTP Number X-Axis
 * @text 最大値のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param MaxTP Number Y-Axis
 * @text 最大値のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> TP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter Visible
 * @text メーターの表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter X-Axis
 * @text メーターのX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 69
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter Y-Axis
 * @text メーターのY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 117
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter Angle
 * @text メーターの角度
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param ATB Meter Flow Anime
 * @text メーターのフローアニメ有効化
 * @desc 画像はゲージの幅の3倍である必要があります。
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> ATB <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> ステートアイコン <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Visible
 * @text 表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 102
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 76
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Mode
 * @text 表示モード
 * @desc 0:タイミングモード / 1:ラインモード
 * @type select
 * @option タイミングモード (1つのステートアイコンを交代で表示)
 * @value 0
 * @option ラインモード (ステートアイコンを並べて表示)
 * @value 1
 * @default 0
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Max
 * @text 並ぶ最大数
 * @type number
 * @min 1
 * @max 9007
 * @default 4
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param States Align
 * @text 配置開始位置
 * @desc 0:左 / 1:右 / 2:上 / 3:下
 * @type select
 * @option 左
 * @value 0
 * @option 右
 * @value 1
 * @option 上
 * @value 2
 * @option 下
 * @value 3
 * @default 0
 * @parent -> STATES <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> コマンドウィンドウ <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Command Auto Adjust
 * @text 自動位置調整の有効化
 * @desc 0:自動調整 / 1:固定
 * @type select
 * @option 自動調整
 * @value 0
 * @option 固定
 * @value 1
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -120
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Width
 * @text 幅
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Height
 * @text 高さ
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Slide X
 * @text スライドアニメX量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Command Slide Y
 * @text スライドアニメY量
 * @type number
 * @min -9007
 * @max 9007
 * @default 64
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Command
 * @text レイアウト画像を表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Command X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -20
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Command Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -25
 * @parent -> W COMMAND <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> パーティウィンドウ <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 325
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 170
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Width
 * @text 幅
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Height
 * @text 高さ
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Slide X
 * @text スライドアニメX量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Party Slide Y
 * @text スライドアニメY量
 * @type number
 * @min -9007
 * @max 9007
 * @default -100
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Party
 * @text レイアウト画像の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Party X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -325
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Party Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -42
 * @parent -> W PARTY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> ヘルプウィンドウ <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Width
 * @text 幅
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Height
 * @text 高さ
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Slide X
 * @text スライドアニメX量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Help Slide Y
 * @text スライドアニメY量
 * @type number
 * @min -9007
 * @max 9007
 * @default -50
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Help
 * @text レイアウト画像の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Help X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Help Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W HELP <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> スキルウィンドウ <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Width
 * @text 幅
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Height
 * @text 高さ
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill maxCols
 * @text 最大列数
 * @type number
 * @min 1
 * @max 9007
 * @default 2
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Slide X
 * @text スライドアニメX量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Skill Slide Y
 * @text スライドアニメY量
 * @type number
 * @min -9007
 * @max 9007
 * @default 50
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Skill
 * @text レイアウト画像の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Skill X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Skill Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -67
 * @parent -> W SKILL <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> アイテムウィンドウ <<<<<<<<<<<<<<<<<<<<<<<
 * @default
 *
 * @param W Item X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Width
 * @text 幅
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Height
 * @text 高さ
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item maxCols
 * @text 最大列数
 * @type number
 * @min 1
 * @max 9007
 * @default 2
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Slide X
 * @text スライドアニメX量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Item Slide Y
 * @text スライドアニメY量
 * @type number
 * @min -9007
 * @max 9007
 * @default 50
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Item
 * @text レイアウト画像の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Item X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Item Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -67
 * @parent -> W ITEM <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> アクターウィンドウ <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Width
 * @text 幅
 * @type number
 * @min -9007
 * @max 9007
 * @default 200
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Height
 * @text 高さ
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor maxCols
 * @text 最大列数
 * @type number
 * @min 1
 * @max 9007
 * @default 1
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Slide X
 * @text スライドアニメX量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Actor Slide Y
 * @text スライドアニメY量
 * @type number
 * @min -9007
 * @max 9007
 * @default 50
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Actor
 * @text レイアウト画像の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Actor X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Actor Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -67
 * @parent -> W ACTOR <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 敵ウィンドウ <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy X-Axis
 * @text X軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Y-Axis
 * @text Y軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Width
 * @text 幅
 * @type number
 * @min -9007
 * @max 9007
 * @default 200
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Height
 * @text 高さ
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy maxCols
 * @text 最大列数
 * @type number
 * @min 1
 * @max 9007
 * @default 2
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Slide X
 * @text スライドアニメX量
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param W Enemy Slide Y
 * @text スライドアニメY量
 * @type number
 * @min -9007
 * @max 9007
 * @default 50
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Layout Enemy
 * @text レイアウト画像の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Enemy X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param L Enemy Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default -67
 * @parent -> W ENEMY <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> スクリーン全体 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Screen Layout
 * @text レイアウト画像の表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Screen X-Axis
 * @text レイアウト画像のX軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Screen Y-Axis
 * @text レイアウト画像のY軸位置
 * @type number
 * @min -9007
 * @max 9007
 * @default 0
 * @parent -> SCREEN LAYOUT <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> 位置調整 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 1
 * @text アクター1HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 2
 * @text アクター2HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 3
 * @text アクター3HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 4
 * @text アクター4HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 5
 * @text アクター5HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 6
 * @text アクター6HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 7
 * @text アクター7HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Custom Position 8
 * @text アクター8HUD
 * @desc 例: 200,200
 * @default
 * @parent -> CUSTOM POSITION <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * +++ MOG_BattleHud (v1.1) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * このプラグインは戦闘のレイアウトをカスタマイズします。
 *
 * ===========================================================================
 * - 必要なファイル
 * ===========================================================================
 * 以下のファイルが必要になります。 (img/battlehud/)
 *
 * ->  HP_Meter.png
 * ->  HP_Number.png
 * ->  MP_Meter.png
 * ->  MP_Number.png
 * ->  TP_Meter.png
 * ->  TP_Number.png
 * ->  ATB_Meter.png
 * ->  Layout.png
 * ->  Layout2.png
 * ->  Layout_Actor.png
 * ->  Layout_Command.png
 * ->  Layout_Enemy.png
 * ->  Layout_Help.png
 * ->  Layout_Item.png
 * ->  Layout_Party.png
 * ->  Layout_Screen.png
 * ->  Layout_Skill.png
 * ->  Turn.png
 *
 * ===========================================================================
 * アクターの顔画像には、以下のように名前を付けます。
 *
 * Face_ + ACTOR_ID.png
 *
 * Face_1.png
 * Face_2.png
 * Face_3.png
 * ...
 *
 * ===========================================================================
 * - メモタグ
 * ===========================================================================
 * 顔の呼吸エフェクトを有効にするには、下のメモタグを使います。
 *
 * Face Breath Effect
 *
 * ===========================================================================
 * - スクリプトコマンド
 * ===========================================================================
 * HUDを隠すには、以下のコマンドを使います。
 *
 *     $gameSystem._bhud_visible = false
 *
 * HUDを表示するには、以下のコマンドを使います。
 *
 *     $gameSystem._bhud_visible = true
 *
 * ===========================================================================
 * - 更新履歴
 * ===========================================================================
 * (v1.1) - MOG_Menu_Cursorなどのプラグインとの互換性。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================

var Imported = Imported || {};
Imported.MOG_BattleHud = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_BattleHud');

// HUD POSITION
Moghunter.bhud_pos_x = Number(Moghunter.parameters['Hud X-Axis'] || -90);
Moghunter.bhud_pos_y = Number(Moghunter.parameters['Hud Y-Axis'] || 480);
Moghunter.bhud_space_x = Number(Moghunter.parameters['Hud Space X'] || 0);
Moghunter.bhud_space_y = Number(Moghunter.parameters['Hud Space Y'] || 0);
Moghunter.bhud_pos_mode = String(Moghunter.parameters['Vertical Mode'] || false);
Moghunter.bhud_max_battle_members = Number(Moghunter.parameters['Max Battle Members'] || 4);
Moghunter.bhud_slideX = Number(Moghunter.parameters['Hud Slide X'] || 0);
Moghunter.bhud_slideY = Number(Moghunter.parameters['Hud Slide Y'] || 0);

// Layout Overlay
Moghunter.bhud_layoverlay_visible = String(Moghunter.parameters['Layout2 Visible'] || "true");
Moghunter.bhud_layoverlay_x = Number(Moghunter.parameters['Layout2 X-Axis'] || 0);
Moghunter.bhud_layoverlay_y = Number(Moghunter.parameters['Layout2 Y-Axis'] || 0);

// Screen Layout
Moghunter.bhud_screen_layout = String(Moghunter.parameters['Screen Layout'] || "true");
Moghunter.bhud_screen_layout_x = Number(Moghunter.parameters['Screen X-Axis'] || 0);
Moghunter.bhud_screen_layout_y = Number(Moghunter.parameters['Screen Y-Axis'] || 0);

// TURN POSITION
Moghunter.bhud_turn_visible = String(Moghunter.parameters['Turn Visible'] || true);
Moghunter.bhud_turn_pos_x = Number(Moghunter.parameters['Turn X-Axis'] || -10);
Moghunter.bhud_turn_pos_y = Number(Moghunter.parameters['Turn Y-Axis'] || -10);
Moghunter.bhud_turn_rotation = Number(Moghunter.parameters['Turn Rotation Speed'] || 0.01);
Moghunter.bhud_turn_zoom = String(Moghunter.parameters['Turn Zoom Animation'] || "true");

// FACE POSITION
Moghunter.bhud_face_visible = String(Moghunter.parameters['Face Visible'] || true);
Moghunter.bhud_face_shake = String(Moghunter.parameters['Face Shake Animation'] || true);
Moghunter.bhud_face_zoom = String(Moghunter.parameters['Face Zoom Animation'] || true);
Moghunter.bhud_face_animated = String(Moghunter.parameters['Face Frame Animation'] || false);
Moghunter.bhud_face_pos_x = Number(Moghunter.parameters['Face X-Axis'] || 52);
Moghunter.bhud_face_pos_y = Number(Moghunter.parameters['Face Y-Axis'] || 52);
Moghunter.bhud_face_priority = Number(Moghunter.parameters['Face Priority'] || 0);

// NAME POSITION
Moghunter.bhud_name_visible = String(Moghunter.parameters['Name Visible'] || true);
Moghunter.bhud_name_font_size = Number(Moghunter.parameters['Name Font Size'] || 20);
Moghunter.bhud_name_font_bold_size = Number(Moghunter.parameters['Name Bold Size'] || 4);
Moghunter.bhud_name_font_italic = String(Moghunter.parameters['Name Font Italic'] || false);
Moghunter.bhud_name_align = Number(Moghunter.parameters['Name Align'] || 1);
Moghunter.bhud_name_pos_x = Number(Moghunter.parameters['Name X-Axis'] || -25);
Moghunter.bhud_name_pos_y = Number(Moghunter.parameters['Name Y-Axis'] || 65);

// HP METER POSITION
Moghunter.bhud_hp_meter_visible = String(Moghunter.parameters['HP Meter Visible'] || true);
Moghunter.bhud_hp_meter_pos_x = Number(Moghunter.parameters['HP Meter X-Axis'] || 87);
Moghunter.bhud_hp_meter_pos_y = Number(Moghunter.parameters['HP Meter Y-Axis'] || 7);
Moghunter.bhud_hp_meter_rotation = Number(Moghunter.parameters['HP Meter Angle'] || 0);
Moghunter.bhud_hp_meter_flow = String(Moghunter.parameters['HP Meter Flow Anime'] || true);

// HP NUMBER POSITION
Moghunter.bhud_hp_number_visible = String(Moghunter.parameters['HP Number Visible'] || true);
Moghunter.bhud_hp_number_pos_x = Number(Moghunter.parameters['HP Number X-Axis'] || 170);
Moghunter.bhud_hp_number_pos_y = Number(Moghunter.parameters['HP Number Y-Axis'] || -11);
Moghunter.bhud_maxhp_number_visible = String(Moghunter.parameters['MaxHP Number Visible'] || false);
Moghunter.bhud_maxhp_number_pos_x = Number(Moghunter.parameters['MaxHP Number X-Axis'] || 245);
Moghunter.bhud_maxhp_number_pos_y = Number(Moghunter.parameters['MaxHP Number Y-Axis'] || 20);
Moghunter.bhud_hp_align_type = Number(Moghunter.parameters['HP Number Align type'] || 0);

// MP METER POSITION
Moghunter.bhud_mp_meter_visible = String(Moghunter.parameters['MP Meter Visible'] || true);
Moghunter.bhud_mp_meter_pos_x = Number(Moghunter.parameters['MP Meter X-Axis'] || 104);
Moghunter.bhud_mp_meter_pos_y = Number(Moghunter.parameters['MP Meter Y-Axis'] || 33);
Moghunter.bhud_mp_meter_rotation = Number(Moghunter.parameters['MP Meter Angle'] || 0);
Moghunter.bhud_mp_meter_flow = String(Moghunter.parameters['MP Meter Flow Anime'] || true);

// MP NUMBER POSITION
Moghunter.bhud_mp_number_visible = String(Moghunter.parameters['MP Number Visible'] || true);
Moghunter.bhud_mp_number_pos_x = Number(Moghunter.parameters['MP Number X-Axis'] || 187);
Moghunter.bhud_mp_number_pos_y = Number(Moghunter.parameters['MP Number Y-Axis'] || 16);
Moghunter.bhud_maxmp_number_visible = String(Moghunter.parameters['MaxMP Number Visible'] || false);
Moghunter.bhud_maxmp_number_pos_x = Number(Moghunter.parameters['MaxMP Number X-Axis'] || 196);
Moghunter.bhud_maxmp_number_pos_y = Number(Moghunter.parameters['MaxMP Number Y-Axis'] || 78);
Moghunter.bhud_mp_align_type = Number(Moghunter.parameters['MP Number Align type'] || 0);
Moghunter.bhud_mp_diagonal_number = Number(Moghunter.parameters['MP Number Diagonal'] || true);

// TP METER POSITION
Moghunter.bhud_tp_meter_visible = String(Moghunter.parameters['TP Meter Visible'] || true);
Moghunter.bhud_tp_meter_pos_x = Number(Moghunter.parameters['TP Meter X-Axis'] || 104);
Moghunter.bhud_tp_meter_pos_y = Number(Moghunter.parameters['TP Meter Y-Axis'] || 59);
Moghunter.bhud_tp_meter_rotation = Number(Moghunter.parameters['TP Meter Angle'] || 0);
Moghunter.bhud_tp_meter_flow = String(Moghunter.parameters['TP Meter Flow Anime'] || true);

// TP NUMBER POSITION
Moghunter.bhud_tp_number_visible = String(Moghunter.parameters['TP Number Visible'] || true);
Moghunter.bhud_tp_number_pos_x = Number(Moghunter.parameters['TP Number X-Axis'] || 187);
Moghunter.bhud_tp_number_pos_y = Number(Moghunter.parameters['TP Number Y-Axis'] || 43);
Moghunter.bhud_maxtp_number_visible = String(Moghunter.parameters['MaxTP Number Visible'] || false);
Moghunter.bhud_maxtp_number_pos_x = Number(Moghunter.parameters['MaxTP Number X-Axis'] || 185);
Moghunter.bhud_maxtp_number_pos_y = Number(Moghunter.parameters['MaxTP Number Y-Axis'] || 116);
Moghunter.bhud_tp_align_type = Number(Moghunter.parameters['TP Number Align type'] || 0);
Moghunter.bhud_tp_diagonal_number = Number(Moghunter.parameters['TP Number Diagonal'] || false);

// AT METER POSITION
Moghunter.bhud_at_meter_visible = String(Moghunter.parameters['ATB Meter Visible'] || true);
Moghunter.bhud_at_meter_pos_x = Number(Moghunter.parameters['ATB Meter X-Axis'] || 69);
Moghunter.bhud_at_meter_pos_y = Number(Moghunter.parameters['ATB Meter Y-Axis'] || 117);
Moghunter.bhud_at_meter_rotation = Number(Moghunter.parameters['ATB Meter Angle'] || 0);
Moghunter.bhud_at_meter_flow = String(Moghunter.parameters['ATB Meter Flow Anime'] || true);

// STATES POSITION
Moghunter.bhud_states_visible = String(Moghunter.parameters['States Visible'] || true);
Moghunter.bhud_states_pos_x = Number(Moghunter.parameters['States X-Axis'] || 102);
Moghunter.bhud_states_pos_y = Number(Moghunter.parameters['States Y-Axis'] || 76);
Moghunter.bhud_statesType = Number(Moghunter.parameters['States Mode'] || 0);
Moghunter.bhud_statesMax = Number(Moghunter.parameters['States Max'] || 4);
Moghunter.bhud_statesAlign = Number(Moghunter.parameters['States Align'] || 0);

// COMMAND WINDOWS
Moghunter.bhud_auto_pos = Number(Moghunter.parameters['Command Auto Adjust'] || 0);
Moghunter.bhud_com_x = Number(Moghunter.parameters['W Command X-Axis'] || -5);
Moghunter.bhud_com_y = Number(Moghunter.parameters['W Command Y-Axis'] || -15);
Moghunter.bhud_com_layout = String(Moghunter.parameters['Layout Command'] || true);
Moghunter.bhud_com_lay_x = Number(Moghunter.parameters['L Command X-Axis'] || -25);
Moghunter.bhud_com_lay_y = Number(Moghunter.parameters['L Command Y-Axis'] || -35);
Moghunter.bhud_com_width = Number(Moghunter.parameters['W Command Width'] || 192);
Moghunter.bhud_com_height = Number(Moghunter.parameters['W Command Height'] || 200);
Moghunter.bhud_com_slideX = Number(Moghunter.parameters['W Command Slide X'] || 0);
Moghunter.bhud_com_slideY = Number(Moghunter.parameters['W Command Slide Y'] || 64);


// PARTY WINDOWS
Moghunter.bhud_party_x = Number(Moghunter.parameters['W Party X-Axis'] || 325);
Moghunter.bhud_party_y = Number(Moghunter.parameters['W Party Y-Axis'] || 170);
Moghunter.bhud_party_layout = String(Moghunter.parameters['Layout Party'] || true);
Moghunter.bhud_party_lay_x = Number(Moghunter.parameters['L Party X-Axis'] || -325);
Moghunter.bhud_party_lay_y = Number(Moghunter.parameters['L Party Y-Axis'] || -42);
Moghunter.bhud_party_width = Number(Moghunter.parameters['W Party Width'] || 0);
Moghunter.bhud_party_height = Number(Moghunter.parameters['W Party Height'] || 0);
Moghunter.bhud_party_slide_x = Number(Moghunter.parameters['W Party Slide X'] || 0);
Moghunter.bhud_party_slide_y = Number(Moghunter.parameters['W Party Slide Y'] || -150);

// HELP WINDOW
Moghunter.bhud_help_x = Number(Moghunter.parameters['W Help X-Axis'] || 0);
Moghunter.bhud_help_y = Number(Moghunter.parameters['W Help Y-Axis'] || 0);
Moghunter.bhud_help_layout = String(Moghunter.parameters['Layout Help'] || true);
Moghunter.bhud_help_lay_x = Number(Moghunter.parameters['L Help X-Axis'] || 0);
Moghunter.bhud_help_lay_y = Number(Moghunter.parameters['L Help Y-Axis'] || 0);
Moghunter.bhud_help_width = Number(Moghunter.parameters['W Help Width'] || 0);
Moghunter.bhud_help_height = Number(Moghunter.parameters['W Help Height'] || 0);
Moghunter.bhud_help_slide_x = Number(Moghunter.parameters['W Help Slide X'] || 0);
Moghunter.bhud_help_slide_y = Number(Moghunter.parameters['W Help Slide Y'] || -150);

// SKILL WINDOW
Moghunter.bhud_skill_x = Number(Moghunter.parameters['W Skill X-Axis'] || 0);
Moghunter.bhud_skill_y = Number(Moghunter.parameters['W Skill Y-Axis'] || 416);
Moghunter.bhud_skill_layout = String(Moghunter.parameters['Layout Skill'] || true);
Moghunter.bhud_skill_lay_x = Number(Moghunter.parameters['L Skill X-Axis'] || 0);
Moghunter.bhud_skill_lay_y = Number(Moghunter.parameters['L Skill Y-Axis'] || -67);
Moghunter.bhud_skill_width = Number(Moghunter.parameters['W Skill Width'] || 0);
Moghunter.bhud_skill_height = Number(Moghunter.parameters['W Skill Height'] || 0);
Moghunter.bhud_skill_maxcols = Number(Moghunter.parameters['W Skill maxCols'] || 2);
Moghunter.bhud_skill_slide_x = Number(Moghunter.parameters['W Skill Slide X'] || 0);
Moghunter.bhud_skill_slide_y = Number(Moghunter.parameters['W Skill Slide Y'] || 100);

// ITEM WINDOW
Moghunter.bhud_item_x = Number(Moghunter.parameters['W Item X-Axis'] || 0);
Moghunter.bhud_item_y = Number(Moghunter.parameters['W Item Y-Axis'] || 416);
Moghunter.bhud_item_layout = String(Moghunter.parameters['Layout Item'] || true);
Moghunter.bhud_item_lay_x = Number(Moghunter.parameters['L Item X-Axis'] || 0);
Moghunter.bhud_item_lay_y = Number(Moghunter.parameters['L Item Y-Axis'] || -67);
Moghunter.bhud_item_width = Number(Moghunter.parameters['W Item Width'] || 0);
Moghunter.bhud_item_height = Number(Moghunter.parameters['W Item Height'] || 0);
Moghunter.bhud_item_maxcols = Number(Moghunter.parameters['W Item maxCols'] || 2);
Moghunter.bhud_item_slide_x = Number(Moghunter.parameters['W Item Slide X'] || 0);
Moghunter.bhud_item_slide_y = Number(Moghunter.parameters['W Item Slide Y'] || 150);

// ACTOR WINDOWS
Moghunter.bhud_actor_x = Number(Moghunter.parameters['W Actor X-Axis'] || 0);
Moghunter.bhud_actor_y = Number(Moghunter.parameters['W Actor Y-Axis'] || 0);
Moghunter.bhud_actor_layout = String(Moghunter.parameters['Layout Actor'] || true);
Moghunter.bhud_actor_lay_x = Number(Moghunter.parameters['L Actor X-Axis'] || 0);
Moghunter.bhud_actor_lay_y = Number(Moghunter.parameters['L Actor Y-Axis'] || -67);
Moghunter.bhud_actor_width = Number(Moghunter.parameters['W Actor Width'] || 0);
Moghunter.bhud_actor_height = Number(Moghunter.parameters['W Actor Height'] || 0);
Moghunter.bhud_actor_maxcols = Number(Moghunter.parameters['W Actor maxCols'] || 1);
Moghunter.bhud_actor_slide_x = Number(Moghunter.parameters['W Actor Slide X'] || 0);
Moghunter.bhud_actor_slide_y = Number(Moghunter.parameters['W Actor Slide Y'] || 150);

// ENEMY WINDOWS
Moghunter.bhud_enemy_x = Number(Moghunter.parameters['W Enemy X-Axis'] || 0);
Moghunter.bhud_enemy_y = Number(Moghunter.parameters['W Enemy Y-Axis'] || 416);
Moghunter.bhud_enemy_layout = String(Moghunter.parameters['Layout Enemy'] || true);
Moghunter.bhud_enemy_lay_x = Number(Moghunter.parameters['L Enemy X-Axis'] || 0);
Moghunter.bhud_enemy_lay_y = Number(Moghunter.parameters['L Enemy Y-Axis'] || -67);
Moghunter.bhud_enemy_width = Number(Moghunter.parameters['W Enemy Width'] || 0);
Moghunter.bhud_enemy_height = Number(Moghunter.parameters['W Enemy Height'] || 0);
Moghunter.bhud_enemy_maxcols = Number(Moghunter.parameters['W Enemy maxCols'] || 2);
Moghunter.bhud_enemy_slide_x = Number(Moghunter.parameters['W Enemy Slide X'] || 0);
Moghunter.bhud_enemy_slide_y = Number(Moghunter.parameters['W Enemy Slide Y'] || 150);

// Custom Position
Moghunter.bhud_custom_pos = [];
for (var i = 0; i < 8; i++) {
	Moghunter.bhud_custom_pos[i] = (Moghunter.parameters['Custom Position ' + String(i + 1)] || null);
};

//=============================================================================
//■■■■■■■■■■■■■■ SYSTEM PART ■■■■■■■■■■■■■■■■■■
//=============================================================================


//=============================================================================
// ■■■ ImageManager ■■■
//=============================================================================

//==============================
// * BHud
//==============================
ImageManager.loadBHud = function (filename) {
	return this.loadBitmap('img/battlehud/', filename);
};

//=============================================================================
// ■■■ Game_Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_mog_bhud_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
	_alias_mog_bhud_temp_initialize.call(this);
	this._bhud_position = [];
	this._bhud_position_active = null;
	this._battleEnd = false;
	this._bhud_dp = false;
	this._refreshBhud = false;
	this._forceCreateBattleHud = false;
	this._forceRemoveBattleHud = false;
};

//=============================================================================
// ■■■ Game_System ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_mog_bhud_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	_alias_mog_bhud_sys_initialize.call(this);
	this._bhud_position = [];
	for (var i = 0; i < 8; i++) {
		this._bhud_position[i] = this.set_hudcp(Moghunter.bhud_custom_pos[i]);
	};
	this._bhud_auto_com = false;
	this._bhud_pos_mode = 0;
	this._bhud_visible = true;
	this._bhudFaceBattler = String(Moghunter.bhud_face_visible) == "true" && !$dataSystem.optSideView ? true : false;
	if (String(Moghunter.bhud_pos_mode) == "true") { this._bhud_pos_mode = 1 };
	if (Number(Moghunter.bhud_auto_pos) == 0) { this._bhud_auto_com = true };
};

//==============================
// * set Hudcp
//==============================
Game_System.prototype.set_hudcp = function (value) {
	if (!value) { return null };
	var s = value.split(',');
	if (!s[0] || !s[1]) { return null };
	return [Number(s[0]), Number(s[1])];
}

//=============================================================================
// ■■■ Game Interpreter ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Command129
//==============================
var _alias_mog_bhud_command129 = Game_Interpreter.prototype.command129;
Game_Interpreter.prototype.command129 = function (params) {
	_alias_mog_bhud_command129.call(this, params);
	$gameTemp._refresh_Bhud = true;
	return true;
};

//=============================================================================
// ■■■ Game Party ■■■
//=============================================================================

//==============================
// ♦♦♦ OVEWRITE ♦♦♦  max Battle Members
//==============================
Game_Party.prototype.maxBattleMembers = function () {
	return Math.max(Number(Moghunter.bhud_max_battle_members), 1);
};

//=============================================================================
// ■■■ BattleManager ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  processVictory
//==============================
var _alias_mog_bhud_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function () {
	$gameTemp._battleEnd = true;
	_alias_mog_bhud_processVictory.call(this);
};

//==============================
// ♦ ALIAS ♦  processAbort
//==============================
var _alias_mog_bhud_processAbort = BattleManager.processAbort;
BattleManager.processAbort = function () {
	$gameTemp._battleEnd = true;
	_alias_mog_bhud_processAbort.call(this);
};

//==============================
// ♦ ALIAS ♦  processDefeat
//==============================
var _alias_mog_bhud_processDefeat = BattleManager.processDefeat;
BattleManager.processDefeat = function () {
	$gameTemp._battleEnd = true;
	_alias_mog_bhud_processDefeat.call(this);
};

//=============================================================================
// ■■■ Game BattlerBase ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_mog_bhud_gbat_initMembers = Game_BattlerBase.prototype.initMembers
Game_BattlerBase.prototype.initMembers = function () {
	_alias_mog_bhud_gbat_initMembers.call(this);
	this.need_refresh_bhud_states = false;
	this._bhud_face_data = [0, 0, 0, 0];
	this._face_pos = [0, 0];
};

//==============================
// ♦ ALIAS ♦  addNewState
//==============================
var _alias_mog_bhud_addNewState = Game_BattlerBase.prototype.addNewState
Game_BattlerBase.prototype.addNewState = function (stateId) {
	_alias_mog_bhud_addNewState.call(this, stateId);
	this.need_refresh_bhud_states = true;
};

//==============================
// ♦ ALIAS ♦  eraseState
//==============================
var _alias_mog_bhud_eraseState = Game_BattlerBase.prototype.eraseState
Game_BattlerBase.prototype.eraseState = function (stateId) {
	_alias_mog_bhud_eraseState.call(this, stateId);
	this.need_refresh_bhud_states = true;
};

//=============================================================================
// ■■■ Game Battler ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  iniMembers
//==============================
var _mog_bhud_gbattler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function () {
	_mog_bhud_gbattler_initMembers.call(this);
	this._bhud = {};
	this._bhud.faceBreath = false;
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function () {
	if (this.isEnemy()) { return this.enemy().note.split(/[\r\n]+/) };
	;; if (this.isActor()) { return this.actor().note.split(/[\r\n]+/) };
};

//==============================
// ** get Bmotion Idle
//==============================
Game_Battler.prototype.checkBhudNoteTags = function () {
	this.notetags().forEach(function (note) {
		var note_data = note.split(': ')
		if (note_data[0].toLowerCase() == "face breath effect") {
			this._bhud.faceBreath = true;
		};
	}, this);
};

//=============================================================================
// ■■■ Game Action ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Apply
//==============================
var _alias_mog_bhud_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function (target) {
	var oldhp = target.hp
	_alias_mog_bhud_apply.call(this, target);
	if (target.isActor()) {
		if (oldhp > target.hp) { target._bhud_face_data = [60, 0, 3, 60] }
		else if (oldhp < target.hp) { target._bhud_face_data = [0, 70, 1, 70] };
	};
};

//==============================
// ♦ ALIAS ♦  Prepare
//==============================
var _alias_mog_bmhud_action_prepare = Game_Action.prototype.prepare
Game_Action.prototype.prepare = function () {
	_alias_mog_bmhud_action_prepare.call(this);
	if (this.subject().isActor() && String(Moghunter.bhud_face_zoom) === "true") { this.subject()._bhud_face_data = [0, 70, 2, 70]; };
};

//=============================================================================
// ■■■ Game Actor ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Gain HP
//==============================
var _alias_mog_bhud_gainHp = Game_Battler.prototype.gainHp;
Game_Battler.prototype.gainHp = function (value) {
	_alias_mog_bhud_gainHp.call(this, value);
	if (this.isActor()) { this._bhud_face_data[3] += 1 };
};

//==============================
// ♦ ALIAS ♦  Recover All
//==============================
var _alias_mog_bhud_recoverAll = Game_Battler.prototype.recoverAll;
Game_Battler.prototype.recoverAll = function () {
	_alias_mog_bhud_recoverAll.call(this);
	if (this.isActor()) { this._bhud_face_data[3] += 1 };
};

//=============================================================================
// ■■■ Sprite Battler ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  update Position
//==============================
var _alias_mog_bhud_sprt_actor_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function () {
	if (!$gameSystem.isSideView() && this._sprite_face) {
		if (this._battler && $gameTemp._bhud_position[this._battler.index()]) {
			this.x = $gameTemp._bhud_position[this._battler.index()][0] + Moghunter.bhud_face_pos_x;
			this.y = $gameTemp._bhud_position[this._battler.index()][1] + Moghunter.bhud_face_pos_y;
			return;
		};
	};
	_alias_mog_bhud_sprt_actor_updatePosition.call(this);
};

//==============================
// ♦ ALIAS ♦  Setup Damage Popup
//==============================
var _alias_mog_bhud_sprt_actor_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup
Sprite_Battler.prototype.setupDamagePopup = function () {
	if (!$gameSystem.isSideView() && this._sprite_face) { this.setupDamagePopupBhud(); return };
	_alias_mog_bhud_sprt_actor_setupDamagePopup.call(this);
};

//==============================
// ♦ Setup Damage Popup Bhud
//==============================
Sprite_Battler.prototype.setupDamagePopupBhud = function () {
	if (this._battler.isDamagePopupRequested()) {
		var sprite = new Sprite_Damage();
		sprite.x = this.x;
		sprite.y = this.y;
		sprite.setup(this._battler);
		this._damages.push(sprite);
		this.parent.addChild(sprite);
		this._battler.clearDamagePopup();
		this._battler.clearResult();
	};
};

//=============================================================================
// ■■■ Sprite Actor ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _alias_bhud_sprt_actor_initialize = Sprite_Actor.prototype.initialize
Sprite_Actor.prototype.initialize = function (battler) {
	_alias_bhud_sprt_actor_initialize.call(this, battler);
	this._sprite_face = false;
	if (String(Moghunter.bhud_face_visible) == "true") { this._sprite_face = true };
};

//=============================================================================
// ■■■ Spriteset Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ update Actors
//==============================
var _mog_bhud_sprbat_updateActors = Spriteset_Battle.prototype.updateActors;
Spriteset_Battle.prototype.updateActors = function () {
	if (!$gameSystem.isSideView()) { return };
	_mog_bhud_sprbat_updateActors.call(this);
};

//=============================================================================
// ■■■■■■■■■■■■ SPRITESET BATTLE HUD PART■■■■■■■■■■■■
//=============================================================================

//=============================================================================
// ■■■ Game Temp ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  Initialize
//==============================
var _mog_bhud_anifTemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function () {
	_mog_bhud_anifTemp_initialize.call(this);
	this._bhud_animationQueue = null;
};

//=============================================================================
// ■■■ Spriteset Base ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  createAnimation
//==============================
var _mog_bhud_aniF_createAnimation = Spriteset_Base.prototype.createAnimation;
Spriteset_Base.prototype.createAnimation = function (request) {
	$gameTemp._bhud_animationQueue = request;
	_mog_bhud_aniF_createAnimation.call(this, request)
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
// ■■■ Scene Battle ■■■
//=============================================================================

//==============================
// * create spriteset Battle Hud
//==============================
Scene_Battle.prototype.createSpritesetBattleHud = function () {
	this._spriteSetBatHud = new (Spriteset_BattleHud);
	this._spriteSetBatHud.z = 10;
	this._hudField.addChild(this._spriteSetBatHud);
	this.sortMz()
};

//=============================================================================
// ■■■ Spriteset_BattleHud Base■■■
//=============================================================================
//=============================================================================
// * Spriteset_BattleHudBase
//=============================================================================
function Spriteset_BattleHudBase() {
	this.initialize.apply(this, arguments);
};

Spriteset_BattleHudBase.prototype = Object.create(Sprite.prototype);
Spriteset_BattleHudBase.prototype.constructor = Spriteset_BattleHudBase;

//==============================
// ♦ Initialize ♦
//==============================
Spriteset_BattleHudBase.prototype.initialize = function () {
	Sprite.prototype.initialize.call(this);
	this.createSprites();
	this.sortMz();
};

//==============================
// * sort MZ
//==============================
Spriteset_BattleHudBase.prototype.sortMz = function () {
	this.children.sort((a, b) => a.z - b.z);
};

//==============================
// * need Create Actors
//==============================
Spriteset_BattleHudBase.prototype.needCreateActors = function () {
	if (!$gameSystem.isSideView()) { return true };
	return false
};

//==============================
// * create Sprites
//==============================
Spriteset_BattleHudBase.prototype.createSprites = function () {
	this.createBattleHud();
};


//==============================
// * create Battle Hud
//==============================
Spriteset_BattleHudBase.prototype.createBattleHud = function () {
	if (String(Moghunter.bhud_screen_layout) === "true") { this.createBattleHudScreenLayout(); };
	$gameTemp.refresh_Bhud = false;
	$gameTemp._battleEnd = false;
	this._com_mode = Number($gameSystem._bhud_pos_mode)
	this._battle_hud = [];
	for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		this._battle_hud[i] = new Battle_Hud(i);
		this._battle_hud[i].z = 30 + i;
		this.addChild(this._battle_hud[i]);
	};
};

//==============================
// ** remove Battle Hud
//==============================
Spriteset_BattleHudBase.prototype.removeBattleHud = function () {
	if (!this._battle_hud) { return };
	if (this._screen_layout) {
		this.removeChild(this._screen_layout);
	};
	for (var i = 0; i < this._battle_hud.length; i++) {
		this.removeChild(this._battle_hud[i]);
	};
	this._battle_hud = null;
};

//==============================
// * Create Battle Hud Screen
//==============================
Spriteset_BattleHudBase.prototype.createBattleHudScreenLayout = function () {
	this._screen_layout = new Sprite(ImageManager.loadBHud("Layout_Screen"));
	this._screen_layout.opacity = 0;
	this._screen_layout.x = Moghunter.bhud_screen_layout_x;
	this._screen_layout.y = Moghunter.bhud_screen_layout_y;
	this._screen_layout.resize = [true, false];
	this._screen_layout.z = 10;
	this.addChild(this._screen_layout);
};

//==============================
// * needResizeScreenLayout
//==============================
Spriteset_BattleHudBase.prototype.needResizeScreenLayout = function () {
	if (!this._screen_layout) { return false };
	if (!this._screen_layout.resize[0]) { return false };
	if (this._screen_layout.resize[1]) { return false };
	if (!this._screen_layout.bitmap.isReady()) { return false };
	return true;
};

//==============================
// * Resize Screen Layout
//==============================
Spriteset_BattleHudBase.prototype.resizeScreenLayout = function () {
	if (this._screen_layout.bitmap.width < Graphics.width) {
		this._screen_layout.scale.x = Graphics.width / this._screen_layout.bitmap.width;
	};
	if (this._screen_layout.bitmap.height < Graphics.height) {
		this._screen_layout.scale.y = Graphics.height / this._screen_layout.bitmap.height;
	};
	this._screen_layout.resize[1] = true;
};

//==============================
// * create Animation Base
//==============================
Spriteset_BattleHudBase.prototype.createAnimationBase = function () {
	this._animationSprites = [];
	this._effectsContainer = new Sprite();
	this._effectsContainer.z = 80;
	this.addChild(this._effectsContainer);
};

//==============================
// * createActors
//==============================
Spriteset_BattleHudBase.prototype.createActors = function () {
	this._actorSprites = [];
	for (let i = 0; i < $gameParty.maxBattleMembers(); i++) {
		const sprite = new Sprite_Actor();
		sprite.z = 50 + i;
		this._actorSprites.push(sprite);
		this.addChild(sprite);
	}
};

//==============================
// * Update Battle Hud visible
//==============================
Spriteset_BattleHudBase.prototype.updateBattleHudVisible = function () {
	if (this.isBattleHudVisible()) { this._screen_layout.opacity += 10 }
	else { this._screen_layout.opacity -= 10 };
};

//==============================
// * Is Battle Hud Visible
//==============================
Spriteset_BattleHudBase.prototype.isBattleHudVisible = function () {
	if ($gameMessage.isBusy()) { return false };
	if ($gameTemp._battleEnd) { return false };
	if (!$gameSystem._bhud_visible) { return false };
	return true
};

//==============================
// * Refresh Battle Hud
//==============================
Spriteset_BattleHudBase.prototype.refreshBattleHud = function () {
	if (!this._battle_hud) { return };
	$gameTemp._refresh_Bhud = false;
	for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		this._battle_hud[i].refresh_bhud();
	};
};

//==============================
// * force Create Battle Hud
//==============================
Spriteset_BattleHudBase.prototype.forceCreateBattleHud = function () {
	$gameTemp._forceCreateBattleHud = false;
	this.forceRemoveBattleHud();
	this.createBattleHud();
	this.sortMz();
};

//==============================
// * force Remove Battle Hud
//==============================
Spriteset_BattleHudBase.prototype.forceRemoveBattleHud = function () {
	$gameTemp._forceRemoveBattleHud = false;
	this.removeBattleHud();
};

//==============================
// * update Animations
//==============================
Spriteset_BattleHudBase.prototype.updateAnimations = function () {
	for (const sprite of this._animationSprites) {
		if (!sprite.isPlaying()) {
			this.removeAnimation(sprite);
		};
	};
	this.processAnimationRequests();
};

//==============================
// * processAnimations Requests
//==============================
Spriteset_BattleHudBase.prototype.processAnimationRequests = function () {
	if ($gameTemp._bhud_animationQueue) {
		this.createAnimation($gameTemp._bhud_animationQueue);
	};
	$gameTemp._bhud_animationQueue = null;
};

//==============================
// ♦ ALIAS ♦  Update
//==============================
Spriteset_BattleHudBase.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._screen_layout) { this.updateBattleHudVisible() };
	if ($gameTemp._forceCreateBattleHud) { this.forceCreateBattleHud() };
	if ($gameTemp._forceRemoveBattleHud) { this.forceRemoveBattleHud() };
	if ($gameTemp._refresh_Bhud) { this.refreshBattleHud() };
};

//-------------------------------------------------------------------------
// ♣♣♣♣ Codes from "rmmz_sprites.JS" (Default Core) ♣♣♣♣
//-------------------------------------------------------------------------

//==============================
// ♣♣ create Animations ♣♣
//==============================
Spriteset_BattleHudBase.prototype.createAnimation = function (request) {
	const animation = $dataAnimations[request.animationId];
	const targets = request.targets;
	const mirror = request.mirror;
	let delay = this.animationBaseDelay();
	const nextDelay = this.animationNextDelay();
	if (this.isAnimationForEach(animation)) {
		for (const target of targets) {
			this.createAnimationSprite([target], animation, mirror, delay);
			delay += nextDelay;
		}
	} else {
		this.createAnimationSprite(targets, animation, mirror, delay);
	}
};

//==============================
// ♣♣ create Animation Sprite ♣♣
//==============================
Spriteset_BattleHudBase.prototype.createAnimationSprite = function (targets, animation, mirror, delay) {
	const mv = this.isMVAnimation(animation);
	const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
	const targetSprites = this.makeTargetSprites(targets);
	const baseDelay = this.animationBaseDelay();
	const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
	if (this.animationShouldMirror(targets[0])) {
		mirror = !mirror;
	}
	sprite.targetObjects = targets;
	sprite.setup(targetSprites, animation, mirror, delay, previous);
	this._effectsContainer.addChild(sprite);
	this._animationSprites.push(sprite);
};

//==============================
// ♣♣ findTargetSprite ♣♣
//==============================
Spriteset_BattleHudBase.prototype.findTargetSprite = function (target) {
	return this._actorSprites.find(sprite => sprite.checkBattler(target));
};

//==============================
// ♣♣ isMVAnimation ♣♣
//==============================
Spriteset_BattleHudBase.prototype.isMVAnimation = function (animation) {
	return !!animation.frames;
};

//==============================
// ♣♣ makeTargetSprites ♣♣
//==============================
Spriteset_BattleHudBase.prototype.makeTargetSprites = function (targets) {
	const targetSprites = [];
	for (const target of targets) {
		const targetSprite = this.findTargetSprite(target);
		if (targetSprite) {
			targetSprites.push(targetSprite);
		}
	}
	return targetSprites;
};

//==============================
// ♣♣ lastAnimationSprite ♣♣
//==============================
Spriteset_BattleHudBase.prototype.lastAnimationSprite = function () {
	return this._animationSprites[this._animationSprites.length - 1];
};

//==============================
// ♣♣ is AnimationFor Each ♣♣
//==============================
Spriteset_BattleHudBase.prototype.isAnimationForEach = function (animation) {
	const mv = this.isMVAnimation(animation);
	return mv ? animation.position !== 3 : animation.displayType === 0;
};

//==============================
// ♣♣ animationBaseDelay ♣♣
//==============================
Spriteset_BattleHudBase.prototype.animationBaseDelay = function () {
	return 8;
};

//==============================
// ♣♣ animationNextDelay ♣♣
//==============================
Spriteset_BattleHudBase.prototype.animationNextDelay = function () {
	return 12;
};

//==============================
// ♣♣ animationShouldMirror ♣♣
//==============================
Spriteset_BattleHudBase.prototype.animationShouldMirror = function (target) {
	return target && target.isActor && target.isActor();
};

//==============================
// ♣♣ removeAnimation ♣♣
//==============================
Spriteset_BattleHudBase.prototype.removeAnimation = function (sprite) {
	this._animationSprites.remove(sprite);
	this._effectsContainer.removeChild(sprite);
	for (const target of sprite.targetObjects) {
		if (target.endAnimation) {
			target.endAnimation();
		}
	}
	sprite.destroy();
};

//==============================
// ♣♣ removeAllAnimations ♣♣
//==============================
Spriteset_BattleHudBase.prototype.removeAllAnimations = function () {
	for (const sprite of this._animationSprites) {
		this.removeAnimation(sprite);
	}
};

//==============================
// ♣♣ isAnimationPlaying ♣♣
//==============================
Spriteset_BattleHudBase.prototype.isAnimationPlaying = function () {
	return this._animationSprites.length > 0;
};

//==============================
// ♣♣ update Actors ♣♣
//==============================
Spriteset_BattleHudBase.prototype.updateActors = function () {
	const members = $gameParty.battleMembers();
	for (let i = 0; i < this._actorSprites.length; i++) {
		this._actorSprites[i].setBattler(members[i]);
	}
};

//-------------------------------------------------------------------------
// ♣♣♣ DEFAULT CORE END ♣♣♣
//-------------------------------------------------------------------------

//=============================================================================
// ■■■ Spriteset_BattleHud ■■■
//=============================================================================

//=============================================================================
// * Spriteset_BattleHud
//=============================================================================
function Spriteset_BattleHud() {
	this.initialize.apply(this, arguments);
};

Spriteset_BattleHud.prototype = Object.create(Spriteset_BattleHudBase.prototype);
Spriteset_BattleHud.prototype.constructor = Spriteset_BattleHud;

//==============================
// ♦ Initialize ♦
//==============================
Spriteset_BattleHud.prototype.initialize = function () {
	Spriteset_BattleHudBase.prototype.initialize.call(this);
};

//==============================
// ♦ createSprites ♦
//==============================
Spriteset_BattleHud.prototype.createSprites = function () {
	Spriteset_BattleHudBase.prototype.createSprites.call(this);
	if (this.needCreateActors()) {
		this.createActors();
		this.createAnimationBase();
	};
};

//==============================
// ♦ Update ♦
//==============================
Spriteset_BattleHud.prototype.update = function () {
	Spriteset_BattleHudBase.prototype.update.call(this);
	if (this._actorSprites) { this.updateActors() };
	if (this._animationSprites) { this.updateAnimations() };
	if (this.needResizeScreenLayout()) { this.resizeScreenLayout() };
};

//=============================================================================
//■■■■■■■■■■■■ WINDOW PART ■■■■■■■■■■■■■■■■■■■■
//=============================================================================

//=============================================================================
// ■■■ Scene_Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦  startActor Selection
//==============================
var _mog_bhud_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function () {
	_mog_bhud_startActorSelection.call(this);
	this._skillWindow.hide();
	this._itemWindow.hide();
};

//==============================
// ♦ ALIAS ♦  onEnemyCancel
//==============================
var _mog_batHud_Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function () {
	_mog_batHud_Scene_Battle_onEnemyCancel.call(this);
	this._statusWindow.hide();
	this._statusWindow.close();
};

//==============================
// ♦ ALIAS ♦  onSkillCancel
//==============================
var _mog_batHud_Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function () {
	_mog_batHud_Scene_Battle_onSkillCancel.call(this);
	this._statusWindow.hide();
	this._statusWindow.close();
};

//==============================
// ♦ ALIAS ♦  onItemCancel
//==============================
var _mog_batHud_Scene_Battle_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function () {
	_mog_batHud_Scene_Battle_onItemCancel.call(this);
	this._statusWindow.hide();
	this._statusWindow.close();
};

//==============================
// ♦ ALIAS ♦  endCommandSelection
//==============================
var _mog_batHud_Scene_Battle_endCommandSelection = Scene_Battle.prototype.endCommandSelection;
Scene_Battle.prototype.endCommandSelection = function () {
	_mog_batHud_Scene_Battle_endCommandSelection.call(this);
	this._statusWindow.hide();
	this._statusWindow.close();
};

//==============================
// ♦ ALIAS ♦  endCommandSelection
//==============================
var _mog_batHud_Scene_Battle_selectPreviousCommand = Scene_Battle.prototype.selectPreviousCommand;
Scene_Battle.prototype.selectPreviousCommand = function () {
	_mog_batHud_Scene_Battle_selectPreviousCommand.call(this);
	this._statusWindow.hide();
	this._statusWindow.close();
};

//==============================
// ♦ ALIAS ♦  startActorCommandSelection
//==============================
var _mog_batHud_Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function () {
	_mog_batHud_Scene_Battle_startActorCommandSelection.call(this);
	this._statusWindow.hide();
	this._statusWindow.close();
	this._actorCommandWindow.visible = false;
};

//==============================
// ♦ ALIAS ♦  startPartyCommandSelection
//==============================
var _mog_batHud_Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function () {
	_mog_batHud_Scene_Battle_startPartyCommandSelection.call(this)
	this._statusWindow.hide();
	this._statusWindow.close();
};

//==============================
// ♦ ALIAS ♦  createStatusWindow
//==============================
var _mog_batHud_Scene_Battle_createStatusWindow = Scene_Battle.prototype.createStatusWindow;
Scene_Battle.prototype.createStatusWindow = function () {
	_mog_batHud_Scene_Battle_createStatusWindow.call(this);
	this._statusWindow.hide();
	this._statusWindow.close();
	this._statusWindow.orgSize = [this._statusWindow.width, this._statusWindow.height];
};

//==============================
// * update Status Window Visible
//==============================
Scene_Battle.prototype.updateStatusWindowVisible = function () {
	this._statusWindow.width = this._statusWindow.active ? this._statusWindow.orgSize[0] : 0;
};

//==============================
// ♦ ALIAS ♦ createWindowLayer
//==============================
var _alias_mog_bhud_createWindowLayer = Scene_Battle.prototype.createWindowLayer
Scene_Battle.prototype.createWindowLayer = function () {
	this.createLayoutWindow();
	_alias_mog_bhud_createWindowLayer.call(this);
};

//==============================
// ♦ ALIAS ♦ createAllWindows
//==============================
var _alias_mog_bhud_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function () {
	_alias_mog_bhud_createAllWindows.call(this);
	this.setNewDataAllWindows()
};

//==============================
// * setNewDataAllWindows
//==============================
Scene_Battle.prototype.setNewDataAllWindows = function () {
	if (this._actorCommandWindow) { this.setNewDataActorCommand() };
	if (this._partyCommandWindow) { this.setNewDataPartyCommandWindow() };
	if (this._helpWindow) { this.setNewDataHelpWindow() };
	if (this._skillWindow) { this.setNewDataSkillWindow() };
	if (this._itemWindow) { this.setNewDataItemWindow() };
	if (this._actorWindow) { this.setNewDataActorWindow() };
	if (this._enemyWindow) { this.setNewDataEnemyWindow() };
};

//==============================
// * create Layout Window 
//==============================
Scene_Battle.prototype.createLayoutWindow = function () {
	this._layoutField = new Sprite();
	var fx = Graphics.width === 816 ? -4 : 0;
	this._layoutField.x = fx;
	this._layoutField.y = 0;
	this.addChild(this._layoutField);
	if (String(Moghunter.bhud_com_layout) === "true") { this.createActorCommandWindowLayout() };
	if (String(Moghunter.bhud_party_layout) === "true") { this.createPartyCommandWindowLayout() };
	if (String(Moghunter.bhud_help_layout) === "true") { this.createHelpWindowLayout() };
	if (String(Moghunter.bhud_skill_layout) === "true") { this.createSkillWindowLayout() };
	if (String(Moghunter.bhud_item_layout) === "true") { this.createItemWindowLayout() };
	if (String(Moghunter.bhud_actor_layout) === "true") { this.createActorWindowLayout() };
	if (String(Moghunter.bhud_enemy_layout) === "true") { this.createEnemyWindowLayout() };
};

//==============================
// ♦ ALIAS ♦ Update
//==============================
var _alias_mog_bhud_scnbattle_update = Scene_Battle.prototype.update
Scene_Battle.prototype.update = function () {
	_alias_mog_bhud_scnbattle_update.call(this);
	this.updateBattleHud();
};

//==============================
// * update Battle Hud
//==============================
Scene_Battle.prototype.updateBattleHud = function () {
	this.updateWindowSlideEffect()
	this.updateLayoutPosition();
	if (this._statusWindow) { this.updateStatusWindowVisible() };
	if (this._layoutField) { this.updateBhudVisible() };
};

//==============================
// * updateBhudVisible
//==============================
Scene_Battle.prototype.updateBhudVisible = function () {
	this._layoutField.opacity = this.battleHudOpacity();
	this._layoutField.visible = this.battleHudVisible();
	this._spriteSetBatHud.opacity = this._layoutField.opacity;
	this._spriteSetBatHud.visible = this._layoutField.visible;
};

//==============================
// * battle Hud Visible
//==============================
Scene_Battle.prototype.battleHudVisible = function () {
	return true;
};

//==============================
// * battleHudOpacity
//==============================
Scene_Battle.prototype.battleHudOpacity = function () {
	return 255;
};

//==============================
// * setNewDataActorCommand
//==============================
Scene_Battle.prototype.setNewDataActorCommand = function () {
	var fx = ((Graphics.width - 816) / 2) + 4;
	var fy = ((Graphics.height - 624) / 2);
	var fx2 = fx - ((Graphics.width - Graphics.boxWidth) / 2);
	var fy2 = fy - ((Graphics.height - Graphics.boxHeight) / 2);
	this._actorCommandWindow.x = fx2 + Moghunter.bhud_com_x;
	this._actorCommandWindow.y = fy2 + Moghunter.bhud_com_y;
	this._actorCommandWindow.org = [this._actorCommandWindow.x, this._actorCommandWindow.y]
	this._actorCommandWindow.vis = this._actorCommandWindow.visible;
	if (String(Moghunter.bhud_com_layout) === "true") { this._actorCommandWindow.opacity = 0 };
};

//==============================
// ♦ OVERWRITE ♦  partyCommandWindowRect
//==============================
Scene_Battle.prototype.actorCommandWindowRect = function () {
	const ww = 192 + Moghunter.bhud_com_width;
	const wh = this.windowAreaHeight() + Moghunter.bhud_com_height;
	const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

//==============================
// * setNewDataPartyCommandWindow
//==============================
Scene_Battle.prototype.setNewDataPartyCommandWindow = function () {
	var fx = ((Graphics.width - 816) / 2) + 4;
	var fy = ((Graphics.height - 624) / 2);
	var fx2 = fx - ((Graphics.width - Graphics.boxWidth) / 2);
	var fy2 = fy - ((Graphics.height - Graphics.boxHeight) / 2);
	this._partyCommandWindow.x = fx2 + Moghunter.bhud_party_x;
	this._partyCommandWindow.y = fy2 + Moghunter.bhud_party_y;
	this._partyCommandWindow.org = [this._partyCommandWindow.x, this._partyCommandWindow.y];
	this._partyCommandWindow.org2 = [
		this._partyCommandWindow.org[0] + Moghunter.bhud_party_slide_x,
		this._partyCommandWindow.org[1] + Moghunter.bhud_party_slide_y
	];
	this._partyCommandWindow.slide = Moghunter.bhud_party_slide_x === 0 && Moghunter.bhud_party_slide_y === 0 ? false : true;
	this._partyCommandWindow.vis = this._partyCommandWindow.visible;
	if (String(Moghunter.bhud_party_layout) === "true") { this._partyCommandWindow.opacity = 0 };
};

//==============================
// ♦ OVERWRITE ♦  partyCommandWindowRect
//==============================
Scene_Battle.prototype.partyCommandWindowRect = function () {
	const ww = 192 + Moghunter.bhud_party_width;
	const wh = this.windowAreaHeight() + Moghunter.bhud_party_height;
	const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

//==============================
// * setNewDataHelpWindow
//==============================
Scene_Battle.prototype.setNewDataHelpWindow = function () {
	this._helpWindow.x += Moghunter.bhud_help_x;
	this._helpWindow.y += Moghunter.bhud_help_y;
	this._helpWindow.org = [this._helpWindow.x, this._helpWindow.y];
	this._helpWindow.org2 = [
		this._helpWindow.org[0] + Moghunter.bhud_help_slide_x,
		this._helpWindow.org[1] + Moghunter.bhud_help_slide_y
	];
	this._helpWindow.slide = Moghunter.bhud_help_slide_x === 0 && Moghunter.bhud_help_slide_y === 0 ? false : true;
	this._helpWindow.vis = this._helpWindow.visible;
	if (String(Moghunter.bhud_help_layout) === "true") { this._helpWindow.opacity = 0 };
};

//==============================
// ♦ OVERWRITE ♦  helpWindowRect
//==============================
Scene_Battle.prototype.helpWindowRect = function () {
	const wx = 0;
	const wy = this.helpAreaTop();
	const ww = Graphics.boxWidth + Moghunter.bhud_help_width;
	const wh = this.helpAreaHeight() + Moghunter.bhud_help_height;
	return new Rectangle(wx, wy, ww, wh);
};

//==============================
// * setNewDataSkillWindow
//==============================
Scene_Battle.prototype.setNewDataSkillWindow = function () {
	this._skillWindow.x += Moghunter.bhud_skill_x;
	this._skillWindow.y += Moghunter.bhud_skill_y;
	this._skillWindow.org = [this._skillWindow.x, this._skillWindow.y];
	this._skillWindow.org2 = [
		this._skillWindow.org[0] + Moghunter.bhud_skill_slide_x,
		this._skillWindow.org[1] + Moghunter.bhud_skill_slide_y
	];
	this._skillWindow.slide = Moghunter.bhud_skill_slide_x === 0 && Moghunter.bhud_skill_slide_y === 0 ? false : true;
	this._skillWindow.vis = this._skillWindow.visible;
	if (String(Moghunter.bhud_skill_layout) === "true") { this._skillWindow.opacity = 0 };
};

//==============================
// ♦ OVERWRITE ♦  skillWindowRect
//==============================
Scene_Battle.prototype.skillWindowRect = function () {
	const ww = Graphics.boxWidth + Moghunter.bhud_skill_width;
	const wh = this.windowAreaHeight() + Moghunter.bhud_skill_height;
	const wx = 0;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

//==============================
// * setNewDataItemWindow
//==============================
Scene_Battle.prototype.setNewDataItemWindow = function () {
	this._itemWindow.x += Moghunter.bhud_item_x;
	this._itemWindow.y += Moghunter.bhud_item_y;
	this._itemWindow.org = [this._itemWindow.x, this._itemWindow.y];
	this._itemWindow.org2 = [
		this._itemWindow.org[0] + Moghunter.bhud_item_slide_x,
		this._itemWindow.org[1] + Moghunter.bhud_item_slide_y
	];
	this._itemWindow.slide = Moghunter.bhud_item_slide_x === 0 && Moghunter.bhud_item_slide_y === 0 ? false : true;
	this._itemWindow.vis = this._itemWindow.visible;
	if (String(Moghunter.bhud_item_layout) === "true") { this._itemWindow.opacity = 0 };
};

//==============================
// ♦ OVERWRITE ♦  itemWindowRect
//==============================
Scene_Battle.prototype.itemWindowRect = function () {
	const ww = Graphics.boxWidth + Moghunter.bhud_item_width;
	const wh = this.windowAreaHeight() + Moghunter.bhud_item_height;
	const wx = 0;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

//==============================
// * setNewDataActorWindow
//==============================
Scene_Battle.prototype.setNewDataActorWindow = function () {
	this._actorWindow.x += Moghunter.bhud_actor_x;
	this._actorWindow.y += Moghunter.bhud_actor_y;
	this._actorWindow.org = [this._actorWindow.x, this._actorWindow.y];
	this._actorWindow.org2 = [
		this._actorWindow.org[0] + Moghunter.bhud_actor_slide_x,
		this._actorWindow.org[1] + Moghunter.bhud_actor_slide_y
	];
	this._actorWindow.slide = Moghunter.bhud_actor_slide_x === 0 && Moghunter.bhud_actor_slide_y === 0 ? false : true;
	this._actorWindow.vis = this._actorWindow.visible;
	if (String(Moghunter.bhud_actor_layout) === "true") { this._actorWindow.opacity = 0 };
};

//==============================
// ♦ OVERWRITE ♦  actorWindowRect
//==============================
Scene_Battle.prototype.actorWindowRect = function () {
	const extra = 10;
	const ww = (Graphics.boxWidth - 192) + Moghunter.bhud_actor_width;
	const wh = (this.windowAreaHeight() + extra) + Moghunter.bhud_actor_height;
	const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
	const wy = Graphics.boxHeight - wh + extra - 4;
	return new Rectangle(wx, wy, ww, wh);
};

//==============================
// * setNewDataEnemyWindow
//==============================
Scene_Battle.prototype.setNewDataEnemyWindow = function () {
	this._enemyWindow.x += Moghunter.bhud_enemy_x;
	this._enemyWindow.y += Moghunter.bhud_enemy_y;
	this._enemyWindow.org = [this._enemyWindow.x, this._enemyWindow.y];
	this._enemyWindow.org2 = [
		this._enemyWindow.org[0] + Moghunter.bhud_enemy_slide_x,
		this._enemyWindow.org[1] + Moghunter.bhud_enemy_slide_y,
		Graphics.width + (this._enemyWindow.width * 2),
		Graphics.height + (this._enemyWindow.height * 2)
	];
	this._enemyWindow.slide = Moghunter.bhud_enemy_slide_x === 0 && Moghunter.bhud_enemy_slide_y === 0 ? false : true;
	this._enemyWindow.vis = this._enemyWindow.visible;
	if (String(Moghunter.bhud_enemy_layout) === "true") { this._enemyWindow.opacity = 0 };
};

//==============================
// ♦ OVERWRITE ♦  enemyWindow Rect
//==============================
Scene_Battle.prototype.enemyWindowRect = function () {
	const wx = this._statusWindow.x;
	const ww = this._statusWindow.width + Moghunter.bhud_enemy_width;
	const wh = this.windowAreaHeight() + Moghunter.bhud_enemy_height;
	const wy = Graphics.boxHeight - wh;
	return new Rectangle(wx, wy, ww, wh);
};

//==============================
// * createActorCommandWindowLayout
//==============================
Scene_Battle.prototype.createActorCommandWindowLayout = function () {
	this._com_layout = new Sprite(ImageManager.loadBHud("Layout_Command"))
	this._com_layout.x = Moghunter.bhud_com_lay_x;
	this._com_layout.y = Moghunter.bhud_com_lay_y;
	this._com_layout.visible = false;
	this._layoutField.addChild(this._com_layout);
};

//==============================
// * createPartyCommandWindowLayout
//==============================
Scene_Battle.prototype.createPartyCommandWindowLayout = function () {
	this._party_layout = new Sprite(ImageManager.loadBHud("Layout_Party"))
	this._party_layout.x = Moghunter.bhud_party_lay_x;
	this._party_layout.y = Moghunter.bhud_party_lay_y;
	this._party_layout.visible = false;
	this._layoutField.addChild(this._party_layout);
};

//==============================
// * createPartyCommandWindowLayout
//==============================
Scene_Battle.prototype.needResizeWindowLayout = function (sprite) {
	if (!sprite.resize) { return false };
	if (!sprite.resize[0]) { return false };
	if (sprite.resize[1]) { return false };
	if (!sprite.bitmap.isReady()) { return false };
	return true;
};

//==============================
// * resize Window Layout
//==============================
Scene_Battle.prototype.resizeWindowLayout = function (sprite, window_r) {
	if (sprite.width < window_r.width) {
		sprite.scale.x = window_r.width / sprite.bitmap.width;
	};
	if (sprite.height < window_r.height) {
		sprite.scale.y = window_r.height / sprite.bitmap.height;
	};
	sprite.resize[1] = true;
};

//==============================
// * createHelpWindowLayout
//==============================
Scene_Battle.prototype.createHelpWindowLayout = function () {
	this._help_layout = new Sprite(ImageManager.loadBHud("Layout_Help"))
	this._help_layout.x = Moghunter.bhud_help_lay_x;
	this._help_layout.y = Moghunter.bhud_help_lay_y;
	this._help_layout.visible = false;
	this._help_layout.resize = [true, false];
	this._layoutField.addChild(this._help_layout);
};

//==============================
// * createSkillWindowLayout
//==============================
Scene_Battle.prototype.createSkillWindowLayout = function () {
	this._skill_layout = new Sprite(ImageManager.loadBHud("Layout_Skill"))
	this._skill_layout.x = Moghunter.bhud_skill_lay_x;
	this._skill_layout.y = Moghunter.bhud_skill_lay_y;
	this._skill_layout.visible = false;
	this._skill_layout.resize = [true, false];
	this._layoutField.addChild(this._skill_layout);
};

//==============================
// * createItemWindowLayout
//==============================
Scene_Battle.prototype.createItemWindowLayout = function () {
	this._item_layout = new Sprite(ImageManager.loadBHud("Layout_Item"))
	this._item_layout.x = Moghunter.bhud_item_lay_x;
	this._item_layout.y = Moghunter.bhud_item_lay_y;
	this._item_layout.visible = false;
	this._item_layout.resize = [true, false];
	this._layoutField.addChild(this._item_layout);
};

//==============================
// * createActorWindowLayout
//==============================
Scene_Battle.prototype.createActorWindowLayout = function () {
	this._actor_layout = new Sprite(ImageManager.loadBHud("Layout_Actor"))
	this._actor_layout.x = Moghunter.bhud_actor_lay_x;
	this._actor_layout.y = Moghunter.bhud_actor_lay_y;
	this._actor_layout.visible = false;
	this._actor_layout.resize = [true, false];
	this._layoutField.addChild(this._actor_layout);
};

//==============================
// * createEnemyWindowLayout
//==============================
Scene_Battle.prototype.createEnemyWindowLayout = function () {
	this._enemy_layout = new Sprite(ImageManager.loadBHud("Layout_Enemy"))
	this._enemy_layout.x = Moghunter.bhud_enemy_lay_x;
	this._enemy_layout.y = Moghunter.bhud_enemy_lay_y;
	this._enemy_layout.visible = false;
	this._enemy_layout.resize = [true, false];
	this._layoutField.addChild(this._enemy_layout);
};

//==============================
// ** updateLayoutPosition
//==============================
Scene_Battle.prototype.updateLayoutPosition = function () {
	if (this._com_layout) { this.updateCommandWindowLayout() };
	if (this._party_layout) { this.updatePartyLayout() };
	if (this._help_layout) { this.updateHelpLayout() };
	if (this._skill_layout) { this.updateSkillLayout() };
	if (this._item_layout) { this.updateItemLayout() };
	if (this._actor_layout) { this.updateActorLayout() };
	if (this._enemy_layout) { this.updateEnemyLayout() };
};

//==============================
// * Sprite Move To
//==============================
Scene_Battle.prototype.sprite_move_to = function (value, real_value) {
	if (value === real_value) { return value };
	var dnspeed = 1 + (Math.abs(value - real_value) / 12);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value };
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	return Math.floor(value);
};

//==============================
// * updateCommandWindowLayout
//==============================
Scene_Battle.prototype.updateCommandWindowLayout = function () {
	this._com_layout.x = this._windowLayer.x + Moghunter.bhud_com_lay_x + this._actorCommandWindow.x;
	this._com_layout.y = this._windowLayer.y + Moghunter.bhud_com_lay_y + this._actorCommandWindow.y;
	this._com_layout.visible = this._actorCommandWindow.isOpenAndActive();
	this._com_layout.opacity = this._actorCommandWindow.contentsOpacity;
	if (!this._actorCommandWindow.visible) { this._com_layout.visible = false };
};

//==============================
// * updatePartyLayout
//==============================
Scene_Battle.prototype.updatePartyLayout = function () {
	this._party_layout.x = this._windowLayer.x + Moghunter.bhud_party_lay_x + this._partyCommandWindow.x;
	this._party_layout.y = this._windowLayer.y + Moghunter.bhud_party_lay_y + this._partyCommandWindow.y;
	this._party_layout.visible = this._partyCommandWindow.isOpenAndActive();
	this._party_layout.opacity = this._partyCommandWindow.contentsOpacity;
	if (!this._partyCommandWindow.visible) { this._party_layout.visible = false };
};

//==============================
// * updateHelpLayout
//==============================
Scene_Battle.prototype.updateHelpLayout = function () {
	this._help_layout.x = this._windowLayer.x + Moghunter.bhud_help_lay_x + this._helpWindow.x;
	this._help_layout.y = this._windowLayer.y + Moghunter.bhud_help_lay_y + this._helpWindow.y;
	this._help_layout.visible = this._helpWindow.visible;
	this._help_layout.opacity = this._helpWindow.contentsOpacity;
	if (this.needResizeWindowLayout(this._help_layout)) { this.resizeWindowLayout(this._help_layout, this._helpWindow) };
};

//==============================
// * updateSkillLayout
//==============================
Scene_Battle.prototype.updateSkillLayout = function () {
	this._skill_layout.x = this._windowLayer.x + Moghunter.bhud_skill_lay_x + this._skillWindow.x;
	this._skill_layout.y = this._windowLayer.y + Moghunter.bhud_skill_lay_y + this._skillWindow.y;
	this._skill_layout.visible = this._skillWindow.isOpenAndActive();
	this._skill_layout.opacity = this._skillWindow.contentsOpacity;
	if (!this._skillWindow.visible) { this._skill_layout.visible = false };
	if (this.needResizeWindowLayout(this._skill_layout)) { this.resizeWindowLayout(this._skill_layout, this._skillWindow) };
};

//==============================
// * updateItemLayout
//==============================
Scene_Battle.prototype.updateItemLayout = function () {
	this._item_layout.x = this._windowLayer.x + Moghunter.bhud_item_lay_x + this._itemWindow.x;
	this._item_layout.y = this._windowLayer.y + Moghunter.bhud_item_lay_y + this._itemWindow.y;
	this._item_layout.visible = this._itemWindow.isOpenAndActive();
	this._item_layout.opacity = this._itemWindow.contentsOpacity;
	if (!this._itemWindow.visible) { this._item_layout.visible = false };
	if (this.needResizeWindowLayout(this._item_layout)) { this.resizeWindowLayout(this._item_layout, this._itemWindow) };
};

//==============================
// * updateActorLayout
//==============================
Scene_Battle.prototype.updateActorLayout = function () {
	this._actor_layout.x = this._windowLayer.x + Moghunter.bhud_actor_lay_x + this._actorWindow.x;
	this._actor_layout.y = this._windowLayer.y + Moghunter.bhud_actor_lay_y + this._actorWindow.y;
	this._actor_layout.visible = this._actorWindow.isOpenAndActive();
	this._actor_layout.opacity = this._actorWindow.contentsOpacity;
	if (!this._actorWindow.visible) { this._actor_layout.visible = false };
	if (this.needResizeWindowLayout(this._actor_layout)) { this.resizeWindowLayout(this._actor_layout, this._actorWindow) };
};

//==============================
// * updateEnemyLayout
//==============================
Scene_Battle.prototype.updateEnemyLayout = function () {
	this._enemy_layout.x = this._windowLayer.x + this._enemyWindow.x + Moghunter.bhud_enemy_lay_x;
	this._enemy_layout.y = this._windowLayer.y + this._enemyWindow.y + Moghunter.bhud_enemy_lay_y;
	this._enemy_layout.visible = this._enemyWindow.isOpenAndActive();
	this._enemy_layout.opacity = this._enemyWindow.contentsOpacity;
	if (!this._enemyWindow.visible) { this._enemy_layout.visible = false };
	if (this.needResizeWindowLayout(this._enemy_layout)) { this.resizeWindowLayout(this._enemy_layout, this._enemyWindow) };
};

//==============================
// * slideWindow
//==============================
Scene_Battle.prototype.slideWindow = function (win, vmode) {
	var vm = vmode ? win.active : win.visible;
	if (vm) {
		var np = [win.org[0], win.org[1]];
		win.contentsOpacity += 15;
	} else {
		var np = [win.org2[0], win.org2[1]];
		win.contentsOpacity = 0;
	};
	win.x = this.sprite_move_to(win.x, np[0]);
	win.y = this.sprite_move_to(win.y, np[1]);
};

//==============================
// * updateWindowSlideEffect
//==============================
Scene_Battle.prototype.updateWindowSlideEffect = function () {
	if (this._partyCommandWindow.slide) { this.slideWindow(this._partyCommandWindow, true) };
	if (this._helpWindow.slide) { this.slideWindow(this._helpWindow, false) };
	if (this._skillWindow.slide) { this.slideWindow(this._skillWindow, false) };
	if (this._itemWindow.slide) { this.slideWindow(this._itemWindow, false) };
	if (this._actorWindow.slide) { this.slideWindow(this._actorWindow, false) };
	if (this._enemyWindow.slide && this._enemyWindow.y < this._enemyWindow.org2[3]) { this.slideWindow(this._enemyWindow, false) };
	if (this._enemyWindow.y >= this._enemyWindow.org2[3]) { this.updateBHudVFix() };
};

//==============================
// * updateBHudVFix
//==============================
Scene_Battle.prototype.updateBHudVFix = function () {
	this._enemyWindow.y = this._enemyWindow.org2[3];
	if (this._enemyWindow.active) {
		if (!this._itemWindow.active) { this._itemWindow.visible = false };
		if (!this._skillWindow.active) { this._skillWindow.visible = false };
	};
};

//=============================================================================
// ■■■ Window_BattleSkill ■■■
//=============================================================================

//==============================
// * maxCols
//==============================
Window_BattleSkill.prototype.maxCols = function () {
	return Moghunter.bhud_skill_maxcols;
};

//=============================================================================
// ■■■ Window_BattleItem ■■■
//=============================================================================

//==============================
// * maxCols
//==============================
Window_BattleItem.prototype.maxCols = function () {
	return Moghunter.bhud_item_maxcols;
};

//=============================================================================
// ■■■ Window_BattleEnemy ■■■
//=============================================================================

//==============================
// * maxCols
//==============================
Window_BattleEnemy.prototype.maxCols = function () {
	return Moghunter.bhud_enemy_maxcols;
};

//=============================================================================
// ■■■ Window Actor Command ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ initialize
//==============================
var _alias_mog_bhud_wActCom_initialize = Window_ActorCommand.prototype.initialize;
Window_ActorCommand.prototype.initialize = function (rect) {
	_alias_mog_bhud_wActCom_initialize.call(this, rect);
	this._fx = (Graphics.width - Graphics.boxWidth) / 2;
	this._fy = (Graphics.height - Graphics.boxHeight) / 2;
	this._fadeW = 0;
	this._com_mode = Number($gameSystem._bhud_pos_mode);
	this._force_hide_duration = 0;
	this.org = [Moghunter.bhud_com_x, Moghunter.bhud_com_y];
	this.org2 = [
		this.org[0] + Moghunter.bhud_com_slideX,
		this.org[1] + Moghunter.bhud_com_slideY
	];
	this.slide = $gameSystem._bhud_auto_com ? true : false;
	this._actorVis != this._actor;
	this.xp = -1;
	this.yp = -1;
};

//==============================
// ♦ ALIAS ♦ Activate
//==============================
var _alias_mog_bhud_wActCom_activate = Window_ActorCommand.prototype.activate;
Window_ActorCommand.prototype.activate = function () {
	_alias_mog_bhud_wActCom_activate.call(this);
	if (String(Moghunter.bhud_com_layout) === "true") { this._force_hide_duration = 1 };
};

//==============================
// * Sprite Move To
//==============================
Window_ActorCommand.prototype.sprite_move_to = function (value, real_value) {
	if (value === real_value) { return value };
	var dnspeed = 1 + (Math.abs(value - real_value) / 12);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value };
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	return Math.floor(value);
};

//==============================
// ** slideWindow
//==============================
Window_ActorCommand.prototype.slideWindow = function (win, vmode) {
	var vm = vmode ? win.active : win.visible;
	if (vm) {
		var np = [win.org[0], win.org[1]];
		win.contentsOpacity += 15;
	} else {
		var np = [win.org2[0], win.org2[1]];
		win.contentsOpacity = 0;
	};
	win.x = this.sprite_move_to(win.x, np[0]);
	win.y = this.sprite_move_to(win.y, np[1]);
};

//==============================
// ** update Position
//==============================
Window_ActorCommand.prototype.updatePosition = function () {
	if (Imported.MOG_BattleCommands) {
		this.updateBattleCommands();
	} else {
		if (!this.slide) {
			this.updatePosN();
		} else {
			this.updatePosS();
		};
	};
};

//==============================
// * update Battle Commands
//==============================
Window_ActorCommand.prototype.updateBattleCommands = function () {
	if ($gameTemp._bhud_position_active) {
		this.visible = this.active;
		if ($gameSystem._bhud_auto_com) {
			this.x = $gameTemp._bhud_position_active[0] + Moghunter.bhud_com_x;
			if (this._com_mode === 0) {
				this.y = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y - this.height;
			} else {
				this.y = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y;
			}

		};
	};
};

//==============================
// * update Position S
//==============================
Window_ActorCommand.prototype.updatePosS = function () {
	if ($gameTemp._bhud_position_active) {
		this.visible = this.active;
		if ($gameSystem._bhud_auto_com) {
			if (this.xp != $gameTemp._bhud_position_active[0] || this.yp != $gameTemp._bhud_position_active[1]) {
				this.xp = $gameTemp._bhud_position_active[0];
				this.yp = $gameTemp._bhud_position_active[1];
				this.org[0] = $gameTemp._bhud_position_active[0] + Moghunter.bhud_com_x - this._fx;
				if (this._com_mode === 0) {
					this.org[1] = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y - this.height;
				} else {
					this.org[1] = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y;
				};
				this.org2 = [
					this.org[0] + Moghunter.bhud_com_slideX,
					this.org[1] + Moghunter.bhud_com_slideY
				];
				if (this._actorVis != this._actor) {
					this.x = this.org2[0];
					this.y = this.org2[1];
					this._actorVis = this._actor;
				};
			};
			this.slideWindow(this, false);
		} else {
			this.slideWindow(this, false);
		};
	};
};

//==============================
// * update Position N
//==============================
Window_ActorCommand.prototype.updatePosN = function () {
	if ($gameTemp._bhud_position_active) {
		this.visible = this.active;
		if ($gameSystem._bhud_auto_com) {
			this.x = $gameTemp._bhud_position_active[0] + Moghunter.bhud_com_x;
			if (this._com_mode === 0) {
				this.y = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y - this.height
			} else {
				this.y = $gameTemp._bhud_position_active[1] + Moghunter.bhud_com_y
			}
		};
	};
};

//==============================
// ♦ ALIAS ♦ Update
//==============================
Window_ActorCommand.prototype.update = function () {
	Window_Command.prototype.update.call(this);
	this.updatePosition();
	if (this._force_hide_duration > 0) { this._force_hide_duration -= 1; this.visible = false };
};

//=============================================================================
//■■■■■■■■■■■■ BATTLE HUD PART ■■■■■■■■■■■■■■■■■■
//=============================================================================

//=============================================================================
// ■■■ Scene Battle ■■■
//=============================================================================

//==============================
// ♦ ALIAS ♦ createWindowLayer
//==============================
var _mog_bhud_scBat_createSpriteset = Scene_Battle.prototype.createSpriteset;
Scene_Battle.prototype.createSpriteset = function () {
	_mog_bhud_scBat_createSpriteset.call(this);
	if (!this._hudField) { this.createHudField() };
	this.createSpritesetBattleHud();
	this.sortMz();
};

//=============================================================================
// ■■■ Battle_Hud ■■■
//=============================================================================
function Battle_Hud() {
	this.initialize.apply(this, arguments);
};

Battle_Hud.prototype = Object.create(Sprite.prototype);
Battle_Hud.prototype.constructor = Battle_Hud;

//==============================
// ♦♦ Initialize
//==============================
Battle_Hud.prototype.initialize = function (hud_id) {
	Sprite.prototype.initialize.call(this);
	this._data_initial_ref = [0, true];
	this._hud_id = hud_id;
	this._slideA = [0, Moghunter.bhud_slideX, Moghunter.bhud_slideY];
	if (this._slideA[1] != 0 || this._slideA[2] != 0) { this._slideA[0] = this._hud_id * 10 };
	this.x = this._slideA[1];
	this.y = this._slideA[2];
	this._hud_size = [0, 0];
	this.base_parameter_clear();
	this.load_img();
	this.opacity = 0;
	$gameTemp._bhud_position_active = null;
	$gameTemp._battleEnd = false;
};

//==============================
// * Load Img
//==============================
Battle_Hud.prototype.load_img = function () {
	this._layout_img = ImageManager.loadBHud("Layout");
	if (String(Moghunter.bhud_layoverlay_visible) == "true") { this._layout2_img = ImageManager.loadBHud("Layout2");; };
	this._turn_img = ImageManager.loadBHud("Turn");
	this._state_img = ImageManager.loadSystem("IconSet");
	if (String(Moghunter.bhud_hp_meter_visible) == "true") { this._hp_meter_img = ImageManager.loadBHud("HP_Meter"); };
	if (String(Moghunter.bhud_mp_meter_visible) == "true") { this._mp_meter_img = ImageManager.loadBHud("MP_Meter"); };
	if (String(Moghunter.bhud_tp_meter_visible) == "true") { this._tp_meter_img = ImageManager.loadBHud("TP_Meter"); };
	if (String(Moghunter.bhud_at_meter_visible) == "true") { this._at_meter_img = ImageManager.loadBHud("ATB_Meter"); };
	if (String(Moghunter.bhud_hp_number_visible) == "true") { this._hp_number_img = ImageManager.loadBHud("HP_Number"); };
	if (String(Moghunter.bhud_mp_number_visible) == "true") { this._mp_number_img = ImageManager.loadBHud("MP_Number"); };
	if (String(Moghunter.bhud_tp_number_visible) == "true") { this._tp_number_img = ImageManager.loadBHud("TP_Number"); };
	if (String(Moghunter.bhud_maxhp_number_visible) == "true") { this._maxhp_number_img = ImageManager.loadBHud("HP_Number2"); };
	if (String(Moghunter.bhud_maxmp_number_visible) == "true") { this._maxmp_number_img = ImageManager.loadBHud("MP_Number2"); };
	if (String(Moghunter.bhud_maxtp_number_visible) == "true") { this._maxtp_number_img = ImageManager.loadBHud("TP_Number2"); };
};

//==============================
// * Base Parameter Clear
//==============================
Battle_Hud.prototype.base_parameter_clear = function () {
	this._hp_old = [-1, -1];
	this._maxhp_old = [-1, -1];
	this._hp_old_ani = [-1, -1];
	this._hp_flow = [false, 0, 0, 0];
	this._mp_old = [-1, -1];
	this._maxmp_old = [-1, -1];
	this._mp_old_ani = [-1, -1];
	this._mp_flow = [false, 0, 0, 0];
	this._tp_old = [-1, -1];
	this._maxtp_old = [-1, -1];
	this._tp_old_ani = -1;
	this._tp_flow = [false, 0, 0, 0];
	this._at_flow = [false, 0, 0, 0];
	this._hp_number_old = -1;
	this._mp_number_old = -1;
	this._hp_number_old = -1;
	this._number_align = [];
	this._number_align[0] = Moghunter.bhud_hp_align_type;
	this._number_align[1] = Moghunter.bhud_mp_align_type;
	this._number_align[2] = Moghunter.bhud_tp_align_type;
	this._diagonal_number = [];
	this._diagonal_number[0] = Moghunter.bhud_hp_diagonal_number;
	this._diagonal_number[1] = Moghunter.bhud_mp_diagonal_number;
	this._diagonal_number[2] = Moghunter.bhud_tp_diagonal_number;
	this._hp_img_data = [0, 0, 0];
	this._mp_img_data = [0, 0, 0];
	this._tp_img_data = [0, 0, 0];
	this._states_old = [];
	this._states_data = [0, 0, 0];
	this._active = false;
	this._hud_size = [0, 0];
};

//==============================
// * Need Refresh Bhud
//==============================
Battle_Hud.prototype.need_refreh_bhud = function () {
	if (this._data_initial_ref[1]) { return true };
	if (this._battler != $gameParty.battleMembers()[this._hud_id]) { return true };
	return false;
};

//==============================
// * Refresh Bhud
//==============================
Battle_Hud.prototype.refresh_bhud = function () {
	this._data_initial_ref[1] = false;
	this._battler = $gameParty.battleMembers()[this._hud_id];
	if (this._battler) { this._battler.checkBhudNoteTags() }
	this.opacity = 0;
	this._hud_size = [0, 0];
	this.base_parameter_clear();
	this.create_base_sprites();
};

//==============================
// * Refresh Position
//==============================
Battle_Hud.prototype.refresh_position = function () {
	this.set_hud_position();
	this.create_sprites();
	this._layout.x = this._pos_x;
	this._layout.y = this._pos_y;
	if (this._face) {
		this._face.x = this._pos_x + Moghunter.bhud_face_pos_x;
		this._face.y = this._pos_y + Moghunter.bhud_face_pos_y + this._face.ph;
	};
	if (this._turn) {
		this._turn.x = this._pos_x + (this._turn.width / 2) + Moghunter.bhud_turn_pos_x;
		this._turn.y = this._pos_y + (this._turn.height / 2) + Moghunter.bhud_turn_pos_y;
	};
	if (this._layout2) {
		this._layout2.x = this._pos_x + Moghunter.bhud_layoverlay_x;
		this._layout2.y = this._pos_y + Moghunter.bhud_layoverlay_y;
	};
	if (this._face) { this._battler._face_pos = [this._face.x, this._face.y] };
};

//==============================
// * Set Hud Position
//==============================
Battle_Hud.prototype.set_hud_position = function () {
	this._hud_size = [this._layout.bitmap.width, this._layout.bitmap.height];
	this._members_max = $gameParty.battleMembers().length;
	var fx = (Graphics.width - 816) / 2;
	var fy = (Graphics.height - 624);
	var ps = [Number(Moghunter.bhud_space_x) * this._hud_id,
	Number(Moghunter.bhud_space_y) * this._hud_id];
	if ($gameSystem._bhud_position[this._hud_id]) {
		this._pos_x = $gameSystem._bhud_position[this._hud_id][0];
		this._pos_y = $gameSystem._bhud_position[this._hud_id][1];
	}
	else {
		if (Number($gameSystem._bhud_pos_mode) === 0) {
			var spc = ((Graphics.width - 14) / this._members_max);
			var px = (spc / 2) + (spc * this._hud_id);
			this._pos_x = Moghunter.bhud_pos_x + px + ps[0];
			this._pos_y = Moghunter.bhud_pos_y + ps[1];
		}
		else {
			var py = (this._hud_size[1] + 5) * this._hud_id;
			this._pos_x = Moghunter.bhud_pos_x + ps[0];
			this._pos_y = Moghunter.bhud_pos_y + py + ps[1];
		};
	};
	this._pos_y += fy
	$gameTemp._bhud_position[this._hud_id] = [this._pos_x, this._pos_y];
};

//==============================
// ♦♦ Update
//==============================
Battle_Hud.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._data_initial_ref[0] < 2) { this._data_initial_ref[0] += 1; return };
	if (this.need_refreh_bhud()) { this.refresh_bhud() };
	if (!this._battler) { return };
	if (!this._layout.bitmap.isReady()) { return };
	if (this._hud_size[0] === 0) { this.refresh_position(); return };
	this.update_sprites();
	this.updateSlide();
};

//==============================
// * Update Slide
//==============================
Battle_Hud.prototype.updateSlide = function () {
	if (!this.is_hud_visible()) { return };
	if (this._slideA[0] > 0) {
		this.visible = false;
		this.opacity = 0;
		this._slideA[0]--;
		return;
	};
	this.visible = true;
	this.x = this.update_dif(this.x, 0, 20);
	this.y = this.update_dif(this.y, 0, 20);
};

//==============================
// * Create Base Sprites
//==============================
Battle_Hud.prototype.create_base_sprites = function () {
	this.create_turn();
	if (Number(Moghunter.bhud_face_priority) === 0) {
		this.create_face();
		this.create_layout();
	}
	else {
		this.create_layout();
		this.create_face();
	};
};

//==============================
// * Create Sprites
//==============================
Battle_Hud.prototype.create_sprites = function () {
	this.create_hp_meter();
	this.create_mp_meter();
	this.create_tp_meter();
	if (BattleManager.isActiveTpb()) { this.create_at_meter() };
	if (String(Moghunter.bhud_layoverlay_visible) == "true") { this.create_layoutOverlay() };
	this.create_hp_number();
	this.create_maxhp_number();
	this.create_mp_number();
	this.create_maxmp_number();
	this.create_tp_number();
	this.create_maxtp_number();
	this._stateType = Number(Moghunter.bhud_statesType);
	if (this._stateType === 0) {
		this.create_states();
	} else {
		this.create_states2();
	};
	this.create_name();
};

//==============================
// * Update Sprites
//==============================
Battle_Hud.prototype.update_sprites = function () {
	this.update_active();
	this.update_visible();
	this.update_turn();
	this.update_face();
	this.update_hp();
	this.update_mp();
	this.update_tp();
	this.update_at();
	if (this._state_icon) {
		if (this._stateType === 0) {
			this.update_states();
		} else {
			this.update_states2();
		};
	};
};

//==============================
// * Update Active
//==============================
Battle_Hud.prototype.update_active = function () {
	this._active = false
	if (this._battler == BattleManager.actor()) {
		this._active = true;
		$gameTemp._bhud_position_active = $gameTemp._bhud_position[this._hud_id]
	};
};

//==============================
// * Update visible
//==============================
Battle_Hud.prototype.update_visible = function (sprite) {
	if (this.is_hud_visible()) { this.opacity += 10 }
	else { this.opacity -= 10 };
};

//==============================
// * Is Hud Visible
//==============================
Battle_Hud.prototype.is_hud_visible = function (sprite) {
	if ($gameMessage.isBusy()) { return false };
	if ($gameTemp._battleEnd) { return false };
	if (!$gameSystem._bhud_visible) { return false };
	return true
};

//==============================
// * Update Dif
//==============================
Battle_Hud.prototype.update_dif = function (value, real_value, speed) {
	if (value == real_value) { return value };
	var dnspeed = 1 + (Math.abs(value - real_value) / speed);
	if (value > real_value) {
		value -= dnspeed;
		if (value < real_value) { value = real_value };
	}
	else if (value < real_value) {
		value += dnspeed;
		if (value > real_value) { value = real_value };
	};
	return Math.floor(value);
};

//==============================
// * Refresh Meter
//==============================
Battle_Hud.prototype.refresh_meter = function (sprite, value, value_max, type) {
	var ch = sprite.bitmap.height / 2;
	var meter_rate = sprite.bitmap.width * value / value_max;
	sprite.setFrame(0, type * ch, meter_rate, ch);
};

//==============================
// * Refresh Flow
//==============================
Battle_Hud.prototype.refresh_meter_flow = function (sprite, value, value_max, type, flow) {
	var cw = sprite.bitmap.width / 3;
	var ch = sprite.bitmap.height / 2;
	var meter_rate = cw * value / value_max;
	sprite.setFrame(flow, type * ch, meter_rate, ch);
};

//==============================
// * Refresh Number
//==============================
Battle_Hud.prototype.refresh_number = function (sprites, value, img_data, x, y, type) {
	numbers = Math.abs(value).toString().split("");
	var nx = 0;
	var ny = 0;
	var dir = 1;
	for (var i = 0; i < sprites.length; i++) {
		sprites[i].visible = false;
		if (i > numbers.length) { return };
		var n = Number(numbers[i]);
		sprites[i].setFrame(n * img_data[2], 0, img_data[2], img_data[1]);
		sprites[i].visible = true;
		if (this._number_align[type] === 0) {
			var nx = -(img_data[2] * i) + (img_data[2] * numbers.length);
		} else if (this._number_align[type] === 1) {
			var nx = -(img_data[2] * i) + ((img_data[2] / 2) * numbers.length);
		} else if (this._number_align[type] === 2) {
			var nx = -(img_data[2] * i);
		} else if (this._number_align[type] === 3) {
			var nx = -(img_data[2] * i);
			var ny = (img_data[3] * i);
		} else {
			var nx = -(img_data[2] * i) + (img_data[2] * numbers.length);
			var ny = (img_data[3] / 2) * dir;
		};
		sprites[i].x = x - nx;
		sprites[i].y = y - ny;
		dir = dir === 0 ? 1 : 0;
	};
};

//==============================
// * Need Refresh Parameter
//==============================
Battle_Hud.prototype.need_refresh_parameter = function (parameter) {
	switch (parameter) {
		case 0:
			if (this._hp_old[0] != this._battler.hp) { return true };
			if (this._hp_old[1] != this._battler.mhp) { return true };
			break;
		case 1:
			if (this._mp_old[0] != this._battler.mp) { return true };
			if (this._mp_old[1] != this._battler.mmp) { return true };
			break;
		case 2:
			if (this._tp_old[0] != this._battler.tp) { return true };
			if (this._tp_old[1] != this._battler.maxTp()) { return true };
			break;
	};
	return false;
};

//==============================
// * Create Layout
//==============================
Battle_Hud.prototype.create_layout = function () {
	this.removeChild(this._layout);
	if (!this._battler) { return };
	this._layout = new Sprite(this._layout_img);
	this.addChild(this._layout);
};

//==============================
// * Create Layout Overlay
//==============================
Battle_Hud.prototype.create_layoutOverlay = function () {
	this.removeChild(this._layout2);
	if (!this._battler) { return };
	this._layout2 = new Sprite(this._layout2_img);
	this.addChild(this._layout2);
};

//==============================
// * Create Turn
//==============================
Battle_Hud.prototype.create_turn = function () {
	if (String(Moghunter.bhud_turn_visible) != "true") { return };
	this.removeChild(this._turn);
	if (!this._battler) { return };
	this._turn = new Sprite(this._turn_img);
	this._turn.anchor.x = 0.5;
	this._turn.anchor.y = 0.5;
	this._turn.rt = Number(Moghunter.bhud_turn_rotation);
	this._turn.zt = String(Moghunter.bhud_turn_zoom) === "true" ? true : false;
	this._turn.vis = this._turn.visible;
	this._turn_blink = [0, 0];
	this.addChild(this._turn);
};

//==============================
// * Update Turn
//==============================
Battle_Hud.prototype.update_turn = function () {
	if (!this._turn) { return };
	if (!this._active) { this._turn.visible = false; return; };
	if (this._turn.rt != 0) { this._turn.rotation += this._turn.rt };
	if (this._turn.zt) { this.updateTurnZoom() };
	this._turn.visible = true;
	this._turn_blink[0] += 1
	if (this._turn_blink[0] < 60) { this._turn_blink[1] += 2 }
	else if (this._turn_blink[0] < 120) { this._turn_blink[1] -= 2 }
	else { this._turn_blink = [0, 0] };
	this._turn.opacity = 135 + this._turn_blink[1]
};

//==============================
// * Update Turn Zoom
//==============================
Battle_Hud.prototype.updateTurnZoom = function () {
	if (this._turn.vis != this._turn.visible) {
		this._turn.vis = this._turn.visible;
		this._turn.scale.x = 1.50;
		this._turn.scale.y = this._turn.scale.x;
	};
	if (this._turn.scale.x > 0) {
		this._turn.scale.x -= 0.04;
		if (this._turn.scale.x <= 1.00) { this._turn.scale.x = 1.00 };
	};
	this._turn.scale.y = this._turn.scale.x;
};

//==============================
// * Create Face
//==============================
Battle_Hud.prototype.create_face = function () {
	if (String(Moghunter.bhud_face_visible) != "true") { return };
	this.removeChild(this._face);
	if (!this._battler) { return };
	this._face = new Sprite(ImageManager.loadBHud("Face_" + this._battler._actorId));
	this._face.anchor.x = 0.5;
	this._face.anchor.y = 0.5;
	this._face_data = [0, 0, false, false, false, -1];
	this._face.ph = 0;
	this._face.animation = [-1, 0, 0, 0, 0, 0, 0, 0, 0];
	this._face.breathEffect = this._battler._bhud.faceBreath;
	this._face.scaleY = 0;
	if (String(Moghunter.bhud_face_shake) === "true") { this._face_data[2] = true }
	if (String(Moghunter.bhud_face_animated) === "true") { this._face_data[4] = true }
	this._battler._bhud_face_data = [0, 0, 0, 1]
	this.addChild(this._face);
};

//==============================
// * Update Face
//==============================
Battle_Hud.prototype.update_face = function () {
	if (!this._face) { return };
	if (!this._face.bitmap.isReady()) { return };
	if (this._face_data[4] && this._face_data[5] != this._battler._bhud_face_data[2]) { this.refresh_face(); };
	this.update_face_animation();
	this.update_face_shake();
	this.update_face_zoom();
	if (this._face.breathEffect) { this.updateFaceEffects() };
};

//==============================
// * update Face Effects
//==============================
Battle_Hud.prototype.updateFaceEffects = function () {
	if (this._face_data[5] == 0 || this._face_data[5] == 3) {
		this._face.anchor.y = 1;
		this._face.y = this._pos_y + Moghunter.bhud_face_pos_y + this._face.height / 2;
		this.updateBreathEffect()
	} else {
		this._face.anchor.y = 0.5;
		this._face.y = this._pos_y + Moghunter.bhud_face_pos_y;

	};
};

//==============================
// * set Breath Effect
//==============================
Battle_Hud.prototype.setBreathEffect = function () {
	this._face.animation[0] = 0;
	var rds = Math.randomInt(100);
	var rds2 = rds * 0.0000001;
	this._face.animation[2] = 0.000005;
	this._face.animation[3] = 0.0002;
	var int = this._face.animation[3];
	var int2 = (Math.randomInt(int) * 0.0001).toFixed(4);
	this._face.animation[1] = int2;
	this._face.animation[8] = Math.randomInt(80)
};

//==============================
// * update Breath Effect
//==============================
Battle_Hud.prototype.updateBreathEffect = function () {
	this._face.scale.y = 1.00 + this._face.scaleY;
	if (this._face.animation[0] == -1) {
		if (this._face.bitmap.isReady()) { this.setBreathEffect() }
		return
	}
	if (this._face.animation[8] > 0) {
		this._face.animation[8]--
		return
	}
	if (this._face.animation[0] == 0) {
		this._face.animation[1] -= this._face.animation[2]
		this._face.scaleY += this._face.animation[1];
		if (this._face.animation[1] <= -this._face.animation[3]) {
			this._face.animation[1] = -this._face.animation[3]
			this._face.animation[0] = 1;
		};
	} else {
		this._face.animation[1] += this._face.animation[2]
		this._face.scaleY += this._face.animation[1];
		if (this._face.animation[1] >= this._face.animation[3]) {
			this._face.animation[1] = this._face.animation[3]
			this._face.animation[0] = 0;
		};
	};
};

//==============================
// * Refresh Face
//==============================
Battle_Hud.prototype.refresh_face = function () {
	this._face_data[5] = this._battler._bhud_face_data[2];
	var cw = this._face.bitmap.width / 5;
	var ch = this._face.bitmap.height;
	this._face.setFrame(cw * this._face_data[5], 0, cw, ch);
};

//==============================
// * Update Face Animation
//==============================
Battle_Hud.prototype.update_face_animation = function () {
	if (this._battler._bhud_face_data[3] > 0) {
		this._battler._bhud_face_data[3] -= 1;
		if (this._battler._bhud_face_data[3] === 0) {
			if (this._battler.isDead()) { this._battler._bhud_face_data[2] = 4 }
			else if (this._battler.hp <= 30 * this._battler.mhp / 100) { this._battler._bhud_face_data[2] = 3 }
			else { this._battler._bhud_face_data[2] = 0 };
		};
	};
};

//==============================
// * Update Face Zoom
//==============================
Battle_Hud.prototype.update_face_zoom = function () {
	if (this._battler._bhud_face_data[1] > 0) {
		this._battler._bhud_face_data[1] -= 1;
		if (this._battler._bhud_face_data[1] == 0) { this._face.scale.x = 1.00 }
		else if (this._battler._bhud_face_data[1] < 35) {
			this._face.scale.x -= 0.005;
			if (this._face.scale.x < 1.00) { this._face.scale.x = 1.00; };
		}
		else if (this._battler._bhud_face_data[1] < 70) {
			this._face.scale.x += 0.005;
			if (this._face.scale.x > 1.25) { this._face.scale.x = 1.25; };
		};
		this._face.scale.y = this._face.scale.x;
	};
};

//==============================
// * Update Face Shake
//==============================
Battle_Hud.prototype.update_face_shake = function () {
	this._face.x = this._pos_x + Moghunter.bhud_face_pos_x;
	if (this._face_data[2] && this._battler._bhud_face_data[0] > 0) {
		this._battler._bhud_face_data[0] -= 1;
		this._face.x = this._pos_x + Moghunter.bhud_face_pos_x + ((Math.random() * 12) - 6);
	};
};

//==============================
// * Create Name
//==============================
Battle_Hud.prototype.create_name = function () {
	if (String(Moghunter.bhud_name_visible) != "true") { return };
	this.removeChild(this._name);
	if (!this._battler) { return };
	this._name = new Sprite(new Bitmap(200, 48));
	this._name.x = this._pos_x + Moghunter.bhud_name_pos_x;
	this._name.y = this._pos_y + Moghunter.bhud_name_pos_y;
	this._name.bitmap.fontSize = Number(Moghunter.bhud_name_font_size);
	if (String(Moghunter.bhud_name_font_italic) === "true") { this._name.bitmap.fontItalic = true };

	this._name.bitmap.outlineWidth = Number(Moghunter.bhud_name_font_bold_size);
	this.addChild(this._name);
	this.refresh_name();
};

//==============================
// * Refresh Name
//==============================
Battle_Hud.prototype.refresh_name = function () {
	this._name.bitmap.clear();
	var align = "left"
	if (Moghunter.bhud_name_align === 1) {
		var align = "center"
	} else if (Moghunter.bhud_name_align === 2) {
		var align = "right"
	};
	this._name.bitmap.drawText(this._battler._name, 0, 0, this._name.bitmap.width, this._name.bitmap.height, align);
};

//==============================
// * Create HP Meter
//==============================
Battle_Hud.prototype.create_hp_meter = function () {
	if (String(Moghunter.bhud_hp_meter_visible) != "true") { return };
	this.removeChild(this._hp_meter_blue);
	this.removeChild(this._hp_meter_red);
	if (!this._battler) { return };
	this._hp_meter_red = new Sprite(this._hp_meter_img);
	this._hp_meter_red.x = this._pos_x + Moghunter.bhud_hp_meter_pos_x;
	this._hp_meter_red.y = this._pos_y + Moghunter.bhud_hp_meter_pos_y;
	this._hp_meter_red.rotation = Moghunter.bhud_hp_meter_rotation * Math.PI / 180;
	this.addChild(this._hp_meter_red);
	this._hp_meter_blue = new Sprite(this._hp_meter_img);
	this._hp_meter_blue.x = this._hp_meter_red.x;
	this._hp_meter_blue.y = this._hp_meter_red.y;
	this._hp_meter_blue.rotation = this._hp_meter_red.rotation;
	this.addChild(this._hp_meter_blue);
	if (String(Moghunter.bhud_hp_meter_flow) === "true") {
		this._hp_flow[0] = true;
		this._hp_flow[2] = this._hp_meter_img.width / 3;
		this._hp_flow[3] = this._hp_flow[2] * 2;
		this._hp_flow[1] = Math.floor(Math.random() * this._hp_flow[2]);
	};
};

//==============================
// * Create HP Number
//==============================
Battle_Hud.prototype.create_hp_number = function () {
	if (String(Moghunter.bhud_hp_number_visible) != "true") { return };
	if (this._hp_number) { for (var i = 0; i < this._hp_number.length; i++) { this.removeChild(this._hp_number[i]); } };
	if (!this._battler) { return };
	this._hp_number = [];
	this._hp_img_data = [this._hp_number_img.width, this._hp_number_img.height,
	this._hp_number_img.width / 10, this._hp_number_img.height / 2,
	this._pos_x + Moghunter.bhud_hp_number_pos_x,
	this._pos_y + Moghunter.bhud_hp_number_pos_y,
	];
	for (var i = 0; i < 5; i++) {
		this._hp_number[i] = new Sprite(this._hp_number_img);
		this._hp_number[i].visible = false;
		this._hp_number[i].x = this._hp_img_data[4];
		this._hp_number[i].y = this._hp_img_data[5];
		this.addChild(this._hp_number[i]);
	};
	this._hp_number_old = this._battler.hp;
	this.refresh_number(this._hp_number, this._hp_number_old, this._hp_img_data, this._hp_img_data[4], this._hp_img_data[5], 0);
};

//==============================
// * Create maxHP Number
//==============================
Battle_Hud.prototype.create_maxhp_number = function () {
	if (String(Moghunter.bhud_maxhp_number_visible) != "true") { return };
	if (this._maxhp_number) { for (var i = 0; i < this._maxhp_number.length; i++) { this.removeChild(this._maxhp_number[i]); } };
	if (!this._battler) { return };
	this._maxhp_number = [];
	this._maxhp_img_data = [this._maxhp_number_img.width, this._maxhp_number_img.height,
	this._maxhp_number_img.width / 10, this._maxhp_number_img.height / 2,
	this._pos_x + Moghunter.bhud_maxhp_number_pos_x,
	this._pos_y + Moghunter.bhud_maxhp_number_pos_y,
	];
	for (var i = 0; i < 5; i++) {
		this._maxhp_number[i] = new Sprite(this._maxhp_number_img);
		this._maxhp_number[i].visible = false;
		this._maxhp_number[i].x = this._maxhp_img_data[4];
		this._maxhp_number[i].y = this._maxhp_img_data[5];
		this.addChild(this._maxhp_number[i]);
	};
	this._maxhp_number_old = this._battler.mhp;
	this.refresh_number(this._maxhp_number, this._maxhp_number_old, this._maxhp_img_data, this._maxhp_img_data[4], this._maxhp_img_data[5], 0);
};

//==============================
// * Update HP
//==============================
Battle_Hud.prototype.update_hp = function () {
	if (this._hp_meter_blue) {
		if (this._hp_flow[0]) {
			this.refresh_meter_flow(this._hp_meter_blue, this._battler.hp, this._battler.mhp, 0, this._hp_flow[1]);
			var dif_meter = this.update_dif(this._hp_old_ani[0], this._battler.hp, 160)
			if (this._hp_old_ani[0] != dif_meter) {
				this._hp_old_ani[0] = dif_meter;
				this.refresh_meter_flow(this._hp_meter_red, this._hp_old_ani[0], this._battler.mhp, 1, this._hp_flow[1]);
			};
			this._hp_flow[1] += 1.5;
			if (this._hp_flow[1] > this._hp_flow[3]) { this._hp_flow[1] = 0 };
		}
		else {
			if (this.need_refresh_parameter(0)) {
				this.refresh_meter(this._hp_meter_blue, this._battler.hp, this._battler.mhp, 0);
				this._hp_old = [this._battler.hp, this._battler.mhp];
			};
			var dif_meter = this.update_dif(this._hp_old_ani[0], this._battler.hp, 160)
			if (this._hp_old_ani[0] != dif_meter) {
				this._hp_old_ani[0] = dif_meter;
				this.refresh_meter(this._hp_meter_red, this._hp_old_ani[0], this._battler.mhp, 1);
			};
		};
	};
	if (this._hp_number) {
		var dif_number = this.update_dif(this._hp_number_old, this._battler.hp, 30)
		if (this._hp_number_old != dif_number) {
			this._hp_number_old = dif_number;
			this.refresh_number(this._hp_number, this._hp_number_old, this._hp_img_data, this._hp_img_data[4], this._hp_img_data[5], 0);
		};
	};
	if (this._maxhp_number) {
		if (this._maxhp_number_old != this._battler.mhp) {
			this._maxhp_number_old = this._battler.mhp;
			this.refresh_number(this._maxhp_number, this._maxhp_number_old, this._maxhp_img_data, this._maxhp_img_data[4], this._maxhp_img_data[5], 0);
		};
	};
};

//==============================
// * Create MP Meter
//==============================
Battle_Hud.prototype.create_mp_meter = function () {
	if (String(Moghunter.bhud_mp_meter_visible) != "true") { return };
	this.removeChild(this._mp_meter_blue);
	this.removeChild(this._mp_meter_red);
	if (!this._battler) { return };
	this._mp_meter_red = new Sprite(this._mp_meter_img);
	this._mp_meter_red.x = this._pos_x + Moghunter.bhud_mp_meter_pos_x;
	this._mp_meter_red.y = this._pos_y + Moghunter.bhud_mp_meter_pos_y;
	this._mp_meter_red.rotation = Moghunter.bhud_mp_meter_rotation * Math.PI / 180;
	this.addChild(this._mp_meter_red);
	this._mp_meter_blue = new Sprite(this._mp_meter_img);
	this._mp_meter_blue.x = this._mp_meter_red.x;
	this._mp_meter_blue.y = this._mp_meter_red.y;
	this._mp_meter_blue.rotation = this._mp_meter_red.rotation;
	this.addChild(this._mp_meter_blue);
	if (String(Moghunter.bhud_mp_meter_flow) === "true") {
		this._mp_flow[0] = true;
		this._mp_flow[2] = this._mp_meter_img.width / 3;
		this._mp_flow[3] = this._mp_flow[2] * 2;
		this._mp_flow[1] = Math.floor(Math.random() * this._mp_flow[2]);
	};
};

//==============================
// * Create MP Number
//==============================
Battle_Hud.prototype.create_mp_number = function () {
	if (String(Moghunter.bhud_mp_number_visible) != "true") { return };
	if (this._mp_number) { for (var i = 0; i < this._mp_number.length; i++) { this.removeChild(this._mp_number[i]); } };
	if (!this._battler) { return };
	this._mp_number = [];
	this._mp_img_data = [this._mp_number_img.width, this._mp_number_img.height,
	this._mp_number_img.width / 10, this._mp_number_img.height / 2,
	this._pos_x + Moghunter.bhud_mp_number_pos_x,
	this._pos_y + Moghunter.bhud_mp_number_pos_y,
	];
	for (var i = 0; i < 5; i++) {
		this._mp_number[i] = new Sprite(this._mp_number_img);
		this._mp_number[i].visible = false;
		this._mp_number[i].x = this._mp_img_data[4];
		this._mp_number[i].y = this._mp_img_data[5];
		this.addChild(this._mp_number[i]);
	};
	this._mp_number_old = this._battler.mp;
	this.refresh_number(this._mp_number, this._mp_number_old, this._mp_img_data, this._mp_img_data[4], this._mp_img_data[5], 1);
};

//==============================
// * Create MaxMP Number
//==============================
Battle_Hud.prototype.create_maxmp_number = function () {
	if (String(Moghunter.bhud_maxmp_number_visible) != "true") { return };
	if (this._maxmp_number) { for (var i = 0; i < this._maxmp_number.length; i++) { this.removeChild(this._maxmp_number[i]); } };
	if (!this._battler) { return };
	this._maxmp_number = [];
	this._maxmp_img_data = [this._maxmp_number_img.width, this._maxmp_number_img.height,
	this._maxmp_number_img.width / 10, this._maxmp_number_img.height / 2,
	this._pos_x + Moghunter.bhud_maxmp_number_pos_x,
	this._pos_y + Moghunter.bhud_maxmp_number_pos_y,
	];
	for (var i = 0; i < 5; i++) {
		this._maxmp_number[i] = new Sprite(this._maxmp_number_img);
		this._maxmp_number[i].visible = false;
		this._maxmp_number[i].x = this._maxmp_img_data[4];
		this._maxmp_number[i].y = this._maxmp_img_data[5];
		this.addChild(this._maxmp_number[i]);
	};
	this._maxmp_number_old = this._battler.mmp;
	this.refresh_number(this._maxmp_number, this._maxmp_number_old, this._maxmp_img_data, this._maxmp_img_data[4], this._maxmp_img_data[5], 1);
};

//==============================
// * Update MP
//==============================
Battle_Hud.prototype.update_mp = function () {
	if (this._mp_meter_blue) {
		if (this._mp_flow[0]) {
			this.refresh_meter_flow(this._mp_meter_blue, this._battler.mp, this._battler.mmp, 0, this._mp_flow[1]);
			var dif_meter = this.update_dif(this._mp_old_ani[0], this._battler.mp, 160)
			if (this._mp_old_ani[0] != dif_meter) {
				this._mp_old_ani[0] = dif_meter;
				this.refresh_meter_flow(this._mp_meter_red, this._mp_old_ani[0], this._battler.mmp, 1, this._mp_flow[1]);
			};
			this._mp_flow[1] += 1.5;
			if (this._mp_flow[1] > this._mp_flow[3]) { this._mp_flow[1] = 0 };
		}
		else {
			if (this.need_refresh_parameter(1)) {
				this.refresh_meter(this._mp_meter_blue, this._battler.mp, this._battler.mmp, 0);
				this._mp_old = [this._battler.mp, this._battler.mmp];
			};
			var dif_meter = this.update_dif(this._mp_old_ani[0], this._battler.mp, 160)
			if (this._mp_old_ani[0] != dif_meter) {
				this._mp_old_ani[0] = dif_meter;
				this.refresh_meter(this._mp_meter_red, this._mp_old_ani[0], this._battler.mmp, 1);
			};
		};
	};
	if (this._mp_number) {
		var dif_number = this.update_dif(this._mp_number_old, this._battler.mp, 30)
		if (this._mp_number_old != dif_number) {
			this._mp_number_old = dif_number;
			this.refresh_number(this._mp_number, this._mp_number_old, this._mp_img_data, this._mp_img_data[4], this._mp_img_data[5], 1);
		};
	};
	if (this._maxmp_number) {
		if (this._maxmp_number_old != this._battler.mmp) {
			this._maxmp_number_old = this._battler.mmp;
			this.refresh_number(this._maxmp_number, this._maxmp_number_old, this._maxmp_img_data, this._maxmp_img_data[4], this._maxmp_img_data[5], 1);
		};
	};

};

//==============================
// * Create TP Meter
//==============================
Battle_Hud.prototype.create_tp_meter = function () {
	if (String(Moghunter.bhud_tp_meter_visible) != "true") { return };
	this.removeChild(this._tp_meter_blue);
	this.removeChild(this._tp_meter_red);
	if (!this._battler) { return };
	this._tp_meter_red = new Sprite(this._tp_meter_img);
	this._tp_meter_red.x = this._pos_x + Moghunter.bhud_tp_meter_pos_x;
	this._tp_meter_red.y = this._pos_y + Moghunter.bhud_tp_meter_pos_y;
	this._tp_meter_red.rotation = Moghunter.bhud_tp_meter_rotation * Math.PI / 180;
	this.addChild(this._tp_meter_red);
	this._tp_meter_blue = new Sprite(this._tp_meter_img);
	this._tp_meter_blue.x = this._tp_meter_red.x;
	this._tp_meter_blue.y = this._tp_meter_red.y;
	this._tp_meter_blue.rotation = this._tp_meter_red.rotation;
	this.addChild(this._tp_meter_blue);
	if (String(Moghunter.bhud_tp_meter_flow) === "true") {
		this._tp_flow[0] = true;
		this._tp_flow[2] = this._tp_meter_img.width / 3;
		this._tp_flow[3] = this._tp_flow[2] * 2;
		this._tp_flow[1] = Math.floor(Math.random() * this._tp_flow[2]);
	};
};

//==============================
// * Create TP Number
//==============================
Battle_Hud.prototype.create_tp_number = function () {
	if (String(Moghunter.bhud_tp_number_visible) != "true") { return };
	if (this._tp_number) { for (var i = 0; i < this._tp_number.length; i++) { this.removeChild(this._tp_number[i]); } };
	if (!this._battler) { return };
	this._tp_number = [];
	this._tp_img_data = [this._tp_number_img.width, this._tp_number_img.height,
	this._tp_number_img.width / 10, this._tp_number_img.height / 2,
	this._pos_x + Moghunter.bhud_tp_number_pos_x,
	this._pos_y + Moghunter.bhud_tp_number_pos_y,
	];
	for (var i = 0; i < 5; i++) {
		this._tp_number[i] = new Sprite(this._tp_number_img);
		this._tp_number[i].visible = false;
		this._tp_number[i].x = this._tp_img_data[4];
		this._tp_number[i].y = this._tp_img_data[5];
		this.addChild(this._tp_number[i]);
	};
	this._tp_number_old = this._battler.tp;
	this.refresh_number(this._tp_number, this._tp_number_old, this._tp_img_data, this._tp_img_data[4], this._tp_img_data[5], 2);
};

//==============================
// * Create MaxTP Number
//==============================
Battle_Hud.prototype.create_maxtp_number = function () {
	if (String(Moghunter.bhud_maxtp_number_visible) != "true") { return };
	if (this._maxtp_number) { for (var i = 0; i < this._maxtp_number.length; i++) { this.removeChild(this._maxtp_number[i]); } };
	if (!this._battler) { return };
	this._maxtp_number = [];
	this._maxtp_img_data = [this._maxtp_number_img.width, this._maxtp_number_img.height,
	this._maxtp_number_img.width / 10, this._maxtp_number_img.height / 2,
	this._pos_x + Moghunter.bhud_maxtp_number_pos_x,
	this._pos_y + Moghunter.bhud_maxtp_number_pos_y,
	];
	for (var i = 0; i < 5; i++) {
		this._maxtp_number[i] = new Sprite(this._maxtp_number_img);
		this._maxtp_number[i].visible = false;
		this._maxtp_number[i].x = this._maxtp_img_data[4];
		this._maxtp_number[i].y = this._maxtp_img_data[5];
		this.addChild(this._maxtp_number[i]);
	};
	this._maxtp_number_old = this._battler.maxTp();
	this.refresh_number(this._maxtp_number, this._maxtp_number_old, this._maxtp_img_data, this._maxtp_img_data[4], this._maxtp_img_data[5], 2);
};

//==============================
// * Update TP
//==============================
Battle_Hud.prototype.update_tp = function () {
	if (this._tp_meter_blue) {
		if (this._tp_flow[0]) {
			this.refresh_meter_flow(this._tp_meter_blue, this._battler.tp, this._battler.maxTp(), 0, this._tp_flow[1]);
			var dif_meter = this.update_dif(this._tp_old_ani[0], this._battler.tp, 160)
			if (this._tp_old_ani[0] != dif_meter) {
				this._tp_old_ani[0] = dif_meter;
				this.refresh_meter_flow(this._tp_meter_red, this._tp_old_ani[0], this._battler.maxTp(), 1, this._tp_flow[1]);
			};
			this._tp_flow[1] += 1.5;
			if (this._tp_flow[1] > this._tp_flow[3]) { this._tp_flow[1] = 0 };
		}
		else {
			if (this.need_refresh_parameter(2)) {
				this.refresh_meter(this._tp_meter_blue, this._battler.tp, this._battler.maxTp(), 0);
				this._tp_old = [this._battler.tp, this._battler.maxTp()];
			};
			var dif_meter = this.update_dif(this._tp_old_ani[0], this._battler.tp, 160)
			if (this._tp_old_ani[0] != dif_meter) {
				this._tp_old_ani[0] = dif_meter;
				this.refresh_meter(this._tp_meter_red, this._tp_old_ani[0], this._battler.maxTp(), 1);
			};
		};
	};
	if (this._tp_number) {
		var dif_number = this.update_dif(this._tp_number_old, this._battler.tp, 30)
		if (this._tp_number_old != dif_number) {
			this._tp_number_old = dif_number;
			this.refresh_number(this._tp_number, this._tp_number_old, this._tp_img_data, this._tp_img_data[4], this._tp_img_data[5], 2);
		};
	};
};

//==============================
// * Create AT Meter
//==============================
Battle_Hud.prototype.create_at_meter = function () {
	if (String(Moghunter.bhud_at_meter_visible) != "true") { return };
	this.removeChild(this._at_meter);
	if (!this._battler) { return };
	this._at_meter = new Sprite(this._at_meter_img);
	this._at_meter.x = this._pos_x + Moghunter.bhud_at_meter_pos_x;
	this._at_meter.y = this._pos_y + Moghunter.bhud_at_meter_pos_y;
	this._at_meter.rotation = Moghunter.bhud_at_meter_rotation * Math.PI / 180;
	this.addChild(this._at_meter);
	if (String(Moghunter.bhud_at_meter_flow) === "true") {
		this._at_flow[0] = true;
		this._at_flow[2] = this._at_meter_img.width / 3;
		this._at_flow[3] = this._at_flow[2] * 2;
		this._at_flow[1] = Math.floor(Math.random() * this._at_flow[2]);
	};
};


//==============================
// * Update AT
//==============================
Battle_Hud.prototype.update_at = function () {
	if (this._at_meter) {
		if (!this.at === -1) { this._at_meter.visible = false; return }
		else { this._at_meter.visible = true };
		if (this._at_flow[0]) {
			if (this.is_casting()) {
				if (this.is_max_cast()) {
					this.refresh_at_meter_flow(this._at_meter, this.cast_at(), this.cast_max_at(), 3, this._at_flow[1]);
				}
				else {
					this.refresh_at_meter_flow(this._at_meter, this.cast_at(), this.cast_max_at(), 2, this._at_flow[1]);
				};
			}
			else if (this.is_max_at()) {
				this.refresh_at_meter_flow(this._at_meter, this.at(), this.max_at(), 1, this._at_flow[1]);
			}
			else {
				this.refresh_at_meter_flow(this._at_meter, this.at(), this.max_at(), 0, this._at_flow[1]);
			};

			this._at_flow[1] += 1.5;
			if (this._at_flow[1] > this._at_flow[3]) { this._at_flow[1] = 0 };
		}
		else {
			if (this.is_casting()) {
				if (this.is_max_cast()) {
					this.refresh_at_meter(this._at_meter, this.cast_at(), this.cast_max_at(), 3);
				}
				else {
					this.refresh_at_meter(this._at_meter, this.cast_at(), this.cast_max_at(), 2);
				};
			}
			else if (this.is_max_at()) {
				this.refresh_at_meter(this._at_meter, this.at(), this.max_at(), 1);
			}
			else {
				this.refresh_at_meter(this._at_meter, this.at(), this.max_at(), 0);
			};
		};
	};
};

//==============================
// * Refresh AT Meter
//==============================
Battle_Hud.prototype.refresh_at_meter = function (sprite, value, value_max, type) {
	var ch = sprite.bitmap.height / 4;
	var meter_rate = sprite.bitmap.width * value / value_max;
	sprite.setFrame(0, type * ch, meter_rate, ch);
};

//==============================
// * Refresh AT Meter Flow
//==============================
Battle_Hud.prototype.refresh_at_meter_flow = function (sprite, value, value_max, type, flow) {
	var cw = sprite.bitmap.width / 3;
	var ch = sprite.bitmap.height / 4;
	var meter_rate = cw * value / value_max;
	sprite.setFrame(flow, type * ch, meter_rate, ch);
};

//==============================
// * At
//==============================
Battle_Hud.prototype.at = function () {
	return this._battler._tpbChargeTime
}

//==============================
// * Max At
//==============================
Battle_Hud.prototype.max_at = function () {
	return 1;
};

//==============================
// * Cast AT
//==============================
Battle_Hud.prototype.cast_at = function () {
	return this._battler._tpbCastTime;
};

//==============================
// * Cast Max AT
//==============================
Battle_Hud.prototype.cast_max_at = function () {
	return this._battler.tpbRequiredCastTime();
};

//==============================
// * Is Casting
//==============================
Battle_Hud.prototype.is_casting = function () {
	return this._battler._tpbState === "casting";
};

//==============================
// * Is Max Atb
//==============================
Battle_Hud.prototype.is_max_at = function () {
	return this.at() >= this.max_at();
};

//==============================
// * Is Max Cast
//==============================
Battle_Hud.prototype.is_max_cast = function () {
	return this.cast_at() >= this.cast_max_at();
};

//==============================
// * Create States
//==============================
Battle_Hud.prototype.create_states = function () {
	if (String(Moghunter.bhud_states_visible) != "true") { return };
	this.removeChild(this._state_icon);
	if (!this._battler) { return };
	this._states_data = [0, 0, 0];
	this._state_icon = new Sprite(this._state_img);
	this._state_icon.x = this._pos_x + Moghunter.bhud_states_pos_x;
	this._state_icon.y = this._pos_y + Moghunter.bhud_states_pos_y;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states();
};

//==============================
// * Create States
//==============================
Battle_Hud.prototype.refresh_states = function () {
	this._states_data[0] = 0;
	this._states_data[2] = 0;
	this._state_icon.visible = false;
	if (this._battler.allIcons().length == 0) { this._states_data[1] = 0; return };
	if (this._battler.allIcons()[this._states_data[1]]) {
		this._states_data[0] = this._battler.allIcons()[this._states_data[1]];
		this._state_icon.visible = true;
		var sx = this._states_data[0] % 16 * 32;
		var sy = Math.floor(this._states_data[0] / 16) * 32;
		this._state_icon.setFrame(sx, sy, 32, 32);
		this._battler.need_refresh_bhud_states = false;

	};
	this._states_data[1] += 1;
	if (this._states_data[1] >= this._battler.allIcons().length) {
		this._states_data[1] = 0
	};
};

//==============================
// * Update States
//==============================
Battle_Hud.prototype.update_states = function () {
	this._states_data[2] += 1;
	if (this.need_refresh_states()) { this.refresh_states(); };
};

//==============================
// * Need Refresh States
//==============================
Battle_Hud.prototype.need_refresh_states = function () {
	if (this._battler.need_refresh_bhud_states) { return true };
	if (this._states_data[2] > 60) { return true };
	return false;
};

//==============================
// * Create States 2
//==============================
Battle_Hud.prototype.create_states2 = function () {
	if (String(Moghunter.bhud_states_visible) != "true") { return };
	this.removeChild(this._state_icon);
	if (!this._battler) { return };
	this._states_data = [0, 0, 0];
	this._stateIcons = [];
	this._state_icon = new Sprite();
	this._state_icon.x = this._pos_x + Moghunter.bhud_states_pos_x;
	this._state_icon.y = this._pos_y + Moghunter.bhud_states_pos_y;
	this._state_icon.visible = false;
	this.addChild(this._state_icon);
	this.refresh_states2();
};

//==============================
// * Create States
//==============================
Battle_Hud.prototype.refresh_states2 = function () {
	this._state_icon.visible = false;
	this._battler.need_refresh_bhud_states = false;
	for (i = 0; i < this._stateIcons.length; i++) {
		this._state_icon.removeChild(this._stateIcons[i]);
	};
	if (this._battler.allIcons().length == 0) { return };
	this._state_icon.visible = true;
	this._stateIcons = [];
	var w = ImageManager.iconWidth;
	var icons = this._battler.allIcons().slice(0, w);
	var m = Math.min(Math.max(this._battler.allIcons().length, 0), Moghunter.bhud_statesMax);
	var align = Moghunter.bhud_statesAlign;
	for (i = 0; i < m; i++) {
		this._stateIcons[i] = new Sprite(this._state_img);
		var sx = icons[i] % 16 * w;
		var sy = Math.floor(icons[i] / 16) * w;
		this._stateIcons[i].setFrame(sx, sy, w, w);
		if (align === 1) {
			this._stateIcons[i].x = -((w + 4) * i);
		} else if (align === 2) {
			this._stateIcons[i].y = (w + 4) * i;
		} else if (align === 3) {
			this._stateIcons[i].y = -((w + 4) * i);
		} else {
			this._stateIcons[i].x = (w + 4) * i;
		};
		this._state_icon.addChild(this._stateIcons[i]);
	};
};

//==============================
// * Update States 2
//==============================
Battle_Hud.prototype.update_states2 = function () {
	if (this.need_refresh_states2()) { this.refresh_states2(); };
};

//==============================
// * Need Refresh States 2
//==============================
Battle_Hud.prototype.need_refresh_states2 = function () {
	if (this._battler.need_refresh_bhud_states) { return true };
	return false;
};
