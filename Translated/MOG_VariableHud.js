//=============================================================================
// MOG_VariableHud.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.2) Apresenta as variáveis através de Huds.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param Smart Fade
 * @desc Ativa transparência na hud quando a hud estiver acima do personagem.
 * @default true
 * @type boolean
 * @on Overlapping Character
 * @off Always Visible
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Auto Fade
 * @desc Oculta na hud quando a janela de messagem estiver ativada.
 * @default true
 * @type boolean
 * @on Window Message
 * @off Always Visible 
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Initial Visible
 * @desc Ativar a Hud no inicio do jogo.
 * @default true
 * @type boolean
 * @on Visible From Start
 * @off Hide
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *  
 * @param Hud 1 Enable
 * @desc Ativar Hud.
 * @default true
 * @type boolean
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 1 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 1 Variable ID
 * @desc Definição da ID da variável.
 * @default 30
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 1 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1)
 * @default 100
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 1 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_1
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 200
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 5
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Number X
 * @desc Definição da posição X-axis do número.
 * @default -7
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 10
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default true
 * @type boolean
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 2 Enable
 * @desc Ativar Hud.
 * @default true
 * @type boolean
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 2 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 2 Variable ID
 * @desc Definição da ID da variável.
 * @default 31
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 2 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 300
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 2 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_2
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 347
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 5
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Number X
 * @desc Definição da posição X-axis do número.
 * @default -7
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 10
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default true
 * @type boolean
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 3 Enable
 * @desc Ativar Hud.
 * @default true
 * @type boolean
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 3 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 3 Variable ID
 * @desc Definição da ID da variável.
 * @default 32
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 3 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 3 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_3
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 3 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 490
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 5
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Number X
 * @desc Definição da posição X-axis do número.
 * @default -7
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 10
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default true
 * @type boolean
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 4 Enable
 * @desc Ativar Hud.
 * @default true
 * @type boolean
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 4 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 4 Variable ID
 * @desc Definição da ID da variável.
 * @default 33
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 4 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 4 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_4
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 730
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 230
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Number X
 * @desc Definição da posição X-axis do número.
 * @default -50
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Show Gauge
 * @desc Apresentar o medidor.
 * @default true
 * @type boolean
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 20
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 63
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 5 Enable
 * @desc Ativar Hud.
 * @default true
 * @type boolean
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 5 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 5 Variable ID
 * @desc Definição da ID da variável.
 * @default 34
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 5 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 5 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_5
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 730
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 327
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Number X
 * @desc Definição da posição X-axis do número.
 * @default -50
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Show Gauge
 * @desc Apresentar o medidor.
 * @default true
 * @type boolean
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 20
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 63
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 6 Enable
 * @desc Ativar Hud.
 * @default true
 * @type boolean
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 6 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 6 Variable ID
 * @desc Definição da ID da variável.
 * @default 35
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 6 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 6 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_6
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 6 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 730
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 424
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Number X
 * @desc Definição da posição X-axis do número.
 * @default -50
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Show Gauge
 * @desc Apresentar o medidor.
 * @default true
 * @type boolean
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 20
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 63
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 7 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 7 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 7 Variable ID
 * @desc Definição da ID da variável.
 * @default 36
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 7 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 7 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_7
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 0
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 0
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 8 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 8 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 8 Variable ID
 * @desc Definição da ID da variável.
 * @default 37
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 8 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 8 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_8
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 50
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 50
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 9 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 9 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 9 Variable ID
 * @desc Definição da ID da variável.
 * @default 38
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 9 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 9 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_9
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 100
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 100
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 10 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 10 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 10 Variable ID
 * @desc Definição da ID da variável.
 * @default 39
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 10 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 10 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_10
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 150
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 150
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 10 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 11 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 11 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 11 Variable ID
 * @desc Definição da ID da variável.
 * @default 40
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 11 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 11 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_11
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 200
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 200
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 11 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 12 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 12 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 12 Variable ID
 * @desc Definição da ID da variável.
 * @default 41
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 12 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 12 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_12
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 250
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 250
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<  
 *
 * @param Hud 12 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 12 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 * 
 * @param -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 13 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 13 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 13 Variable ID
 * @desc Definição da ID da variável.
 * @default 42
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 13 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 13 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_13
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 300
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 300
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 * 
 * @param -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 14 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 14 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 14 Variable ID
 * @desc Definição da ID da variável.
 * @default 43
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 14 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<< 
 * 
 * @param Hud 14 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_14
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 14 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 350
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 350
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 15 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 15 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 15 Variable ID
 * @desc Definição da ID da variável.
 * @default 44
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 15 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 15 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_15
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 400
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 400
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 16 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 16 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 16 Variable ID
 * @desc Definição da ID da variável.
 * @default 45
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 16 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 16 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_16
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param Hud 16 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 450
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 450
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 17 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 17 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 17 Variable ID
 * @desc Definição da ID da variável.
 * @default 46
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 17 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 17 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_17
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 500
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 500
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 18 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 18 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 18 Variable ID
 * @desc Definição da ID da variável.
 * @default 47
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 18 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 18 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_18
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 550
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 550
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 19 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 19 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 19 Variable ID
 * @desc Definição da ID da variável.
 * @default 48
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 19 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 19 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_19
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 600
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 550
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 * 
 * @param -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc 
 *
 * @param Hud 20 Enable
 * @desc Ativar Hud.
 * @default false
 * @type boolean
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 20 Mode
 * @desc Apresentar variável ou item.
 * 0 - Variable    1 - Item
 * @default 0
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 20 Variable ID
 * @desc Definição da ID da variável.
 * @default 49
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 20 Maximum Value
 * @desc Definição do vamor máximo da variável.
 * *(Não funciona para items -> Mode 1) 
 * @default 999999
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param Hud 20 File Name
 * @desc Definição do nome da imagem da Hud.
 * @default Hud_20
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Start Visible
 * @desc Começar visível.
 * @default true
 * @type boolean
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Layout X
 * @desc Definição da posição X-axis da imagem.
 * @default 650
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Layout Y
 * @desc Definição da posição Y-axis da imagem.
 * @default 550
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Number X
 * @desc Definição da posição X-axis do número.
 * @default -10
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Number Y
 * @desc Definição da posição Y-axis do número.
 * @default 30
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Number Align
 * @desc Definição do alinhamento dos números.
 * 0 - Left    1 - Center    2 - Right
 * @default 1
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Font Size
 * @desc Definição do tamanho da fonte.
 * @default 18
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Show Max Value
 * @desc Apresentar o valor maximo.
 * @default false
 * @type boolean
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Show Gauge
 * @desc Apresentar o medidor.
 * @default false
 * @type boolean
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Gauge X-Axis
 * @desc Definição X-axis do medidor.
 * @default 0
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Gauge Y-Axis
 * @desc Definição Y-axis do medidor.
 * @default 0
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @command VariableHudVisibleField
 * @desc Apresentar ou ocultar todas as huds.
 * @text Show / Hide (All)
 *
 * @arg visible
 * @desc Apresentar ou ocultar todas as huds.
 * @text Visible
 * @default true
 * @type boolean
 *
 * @command VariableHudVisible
 * @desc Apresentar ou ocultar a hud.
 * @text Show / Hide (Index)
 *
 * @arg id
 * @desc Definição da Index (0..20)
 * @text Index
 * @default 0 
 * @type number
 * @min 0
 * @max 20
 * 
 * @arg visible
 * @desc Apresentar ou ocultar a hud.
 * @text Visible
 * @default true
 * @type boolean
 *
 * @command VariableHudMaxValue
 * @desc Define a quantidade maxima da variável.
 * @text Set Max Value
 *
 * @arg id
 * @desc Definição da Index (0..20)
 * @text Index
 * @default 0 
 * @type number
 * @min 0
 * @max 20
 * 
 * @arg maxvalue
 * @desc Define a quantidade maxima da variável.
 * @text Max Value
 * @default 100
 * @type number
 * @min 0
 * @max 999999999 
 *
 * @help  
 * =============================================================================
 * +++ MOG - Variable HUD (v1.2) +++
 * By Moghunter 
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Apresenta as variáveis através de Huds.
 *
 * =============================================================================
 * - REQUIRED FILES
 * =============================================================================
 * Grave as imagens na pasta /img/variablehud/
 * Caso a função do medidor estiver ativada será necessário ter a imagem do 
 * medidor, essa imagem deverá ser nomeada da seguinte forma.
 *
 * -> FILE_NAME + _GAUGE.png
 *
 *
 * -> HUD1_GAUGE.png
 *
 *
 * =============================================================================
 * - PLUGIN COMMANDS
 * =============================================================================
 * Para ativar ou desativar a hud use os commandos abaixo.
 *
 * show_variable_hud : HUD_ID
 * hide_variable_hud : HUD_ID
 *
 * EG
 *
 * show_variable_hud : 4
 * hide_variable_hud : 4
 *
 * =============================================================================
 * Para definir um valor máximo da variável durante o jogo use o comando abaixo.
 *
 * set_variable_max : VARIAVEL_ID : MAX_VALUE
 *
 * EG
 *
 * set_variable_max : 30 : 999
 *
 *
 * =============================================================================
 * * HISTÓRICO
 * =============================================================================
 * (v1.2) Correção do bug de piscar a hud no modo ocultar após sair do menu.
 * (v1.1) Correção na função sort relativo a codificação.       
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.2) マップ画面で変数/アイテム数をHUD表示します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_VariableHud.js
 *
 * @param -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> メイン <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Smart Fade
 * @default true
 * @text プレイヤーフェード
 * @desc HUDがプレイヤーと重なった時、HUDの優先度
 * @type boolean
 * @on プレイヤー優先
 * @off HUD優先
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Auto Fade
 * @default true
 * @text メッセージフェード
 * @desc メッセージウィンドウ表示時の表示
 * @type boolean
 * @on HUDを非表示
 * @off HUDを常に表示
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Initial Visible
 * @text ゲーム開始時有効化
 * @desc ゲームの開始時にHUDを有効化します。
 * @default true
 * @type boolean
 * @on 開始時から表示
 * @off 非表示
 * @parent -> MAIN <<<<<<<<<<<<<<<<<<<<<<< 
 *
 * @param
 *
 * @param -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Enable
 * @default true
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Variable ID
 * @default 30
 * @text 変数/アイテムID
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Maximum Value
 * @default 100
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 File Name
 * @default Hud_1
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Layout X
 * @default 200
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Layout Y
 * @default 5
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Number X
 * @default -7
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Number Y
 * @default 10
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Show Max Value
 * @default true
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 1 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Enable
 * @default true
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Variable ID
 * @default 31
 * @text 変数/アイテムID
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Maximum Value
 * @default 300
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 File Name
 * @default Hud_2
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Layout X
 * @default 347
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Layout Y
 * @default 5
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Number X
 * @default -7
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Number Y
 * @default 10
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Show Max Value
 * @default true
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 2 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Enable
 * @default true
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Variable ID
 * @default 32
 * @text 変数/アイテムID
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Maximum Value
 * @default 999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 File Name
 * @default Hud_3
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Layout X
 * @default 490
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Layout Y
 * @default 5
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Number X
 * @default -7
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Number Y
 * @default 10
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Show Max Value
 * @default true
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 3 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Enable
 * @default true
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Variable ID
 * @default 33
 * @text 変数/アイテムID
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Maximum Value
 * @default 999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 File Name
 * @default Hud_4
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Layout X
 * @default 730
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Layout Y
 * @default 230
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Number X
 * @default -50
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Show Gauge
 * @default true
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Gauge X-Axis
 * @default 20
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 4 Gauge Y-Axis
 * @default 63
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Enable
 * @default true
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Variable ID
 * @default 34
 * @text 変数/アイテムID
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Maximum Value
 * @default 999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 File Name
 * @default Hud_5
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Layout X
 * @default 730
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Layout Y
 * @default 327
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Number X
 * @default -50
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Show Gauge
 * @default true
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Gauge X-Axis
 * @default 20
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 5 Gauge Y-Axis
 * @default 63
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Enable
 * @default true
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Variable ID
 * @default 35
 * @text 変数/アイテムID
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Maximum Value
 * @default 999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 File Name
 * @default Hud_6
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Layout X
 * @default 730
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Layout Y
 * @default 424
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Number X
 * @default -50
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Show Gauge
 * @default true
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Gauge X-Axis
 * @default 20
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 6 Gauge Y-Axis
 * @default 63
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Variable ID
 * @default 36
 * @text 変数/アイテムID
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 File Name
 * @default Hud_7
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Layout X
 * @default 0
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Layout Y
 * @default 0
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 7 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 7 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Variable ID
 * @default 37
 * @text 変数/アイテムID
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 File Name
 * @default Hud_8
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Layout X
 * @default 50
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Layout Y
 * @default 50
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 8 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 8 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Variable ID
 * @default 38
 * @text 変数/アイテムID
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 File Name
 * @default Hud_9
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Layout X
 * @default 100
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Layout Y
 * @default 100
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 9 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 9 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Variable ID
 * @default 39
 * @text 変数/アイテムID
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 File Name
 * @default Hud_10
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Layout X
 * @default 150
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Layout Y
 * @default 150
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 10 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 10 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Variable ID
 * @default 40
 * @text 変数/アイテムID
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 File Name
 * @default Hud_11
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Layout X
 * @default 200
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Layout Y
 * @default 200
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 11 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 11 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Variable ID
 * @default 41
 * @text 変数/アイテムID
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 File Name
 * @default Hud_12
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Layout X
 * @default 250
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Layout Y
 * @default 250
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 12 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 12 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Variable ID
 * @default 42
 * @text 変数/アイテムID
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 File Name
 * @default Hud_13
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Layout X
 * @default 300
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Layout Y
 * @default 300
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 13 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 13 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Variable ID
 * @default 43
 * @text 変数/アイテムID
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 File Name
 * @default Hud_14
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Layout X
 * @default 350
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Layout Y
 * @default 350
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 14 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 14 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Variable ID
 * @default 44
 * @text 変数/アイテムID
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 File Name
 * @default Hud_15
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Layout X
 * @default 400
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Layout Y
 * @default 400
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 15 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 15 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Variable ID
 * @default 45
 * @text 変数/アイテムID
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 File Name
 * @default Hud_16
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Layout X
 * @default 450
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Layout Y
 * @default 450
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 16 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 16 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Variable ID
 * @default 46
 * @text 変数/アイテムID
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 File Name
 * @default Hud_17
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Layout X
 * @default 500
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Layout Y
 * @default 500
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 17 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 17 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Variable ID
 * @default 47
 * @text 変数/アイテムID
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 File Name
 * @default Hud_18
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Layout X
 * @default 550
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Layout Y
 * @default 550
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 18 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 18 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Variable ID
 * @default 48
 * @text 変数/アイテムID
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 File Name
 * @default Hud_19
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Layout X
 * @default 600
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Layout Y
 * @default 550
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 19 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 19 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param
 *
 * @param -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Enable
 * @default false
 * @text 有効化
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Mode
 * @default 0
 * @text モード(変数/アイテム)
 * @desc 0:変数 / 1:アイテム
 * @type select
 * @option 変数
 * @value 0
 * @option アイテム
 * @value 1
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Variable ID
 * @default 49
 * @text 変数/アイテムID
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Maximum Value
 * @default 999999
 * @text 変数の最大値
 * @desc アイテムには機能しません -> 表示モード1
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 File Name
 * @default Hud_20
 * @text HUD画像ファイル名
 * @type file
 * @require 1
 * @dir img/variablehud
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Start Visible
 * @default true
 * @text 開始時の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Layout X
 * @default 650
 * @text 画像のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Layout Y
 * @default 550
 * @text 画像のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Number X
 * @default -10
 * @text 値のX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Number Y
 * @default 30
 * @text 値のY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Number Align
 * @default 1
 * @text 値の文字揃え
 * @desc 0:左 / 1:中央 / 2:右
 * @type select
 * @option 左
 * @value 0
 * @option 中央
 * @value 1
 * @option 右
 * @value 2
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Font Size
 * @default 18
 * @text フォントサイズ
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Show Max Value
 * @default false
 * @text 最大値の表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Show Gauge
 * @default false
 * @text メーターの表示
 * @type boolean
 * @on 表示
 * @off 非表示
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Gauge X-Axis
 * @default 0
 * @text メーターのX軸位置
 * @desc 正:右 / 負:左
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param Hud 20 Gauge Y-Axis
 * @default 0
 * @text メーターのY軸位置
 * @desc 正:下 / 負:上
 * @type number
 * @min -9007
 * @max 9007
 * @parent -> HUD 20 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @command VariableHudVisibleField
 * @desc 全HUDを表示または非表示にします。
 * @text 表示/非表示（全て）
 *
 * @arg visible
 * @desc 全HUDを表示または非表示にします。
 * @text 表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 *
 * @command VariableHudVisible
 * @desc HUDを表示または非表示にします。
 * @text 表示/非表示（インデックス）
 *
 * @arg id
 * @desc インデックス定義（0..20）
 * @text 索引
 * @default 0
 * @type number
 * @min 0
 * @max 20
 *
 * @arg visible
 * @desc HUDを表示または非表示にします。
 * @text 表示
 * @default true
 * @type boolean
 * @on 表示
 * @off 非表示
 *
 * @command VariableHudMaxValue
 * @desc 変数の最大量を指定
 * @text 最大値を指定
 *
 * @arg id
 * @desc インデックス定義（0..20）
 * @text 索引
 * @default 0
 * @type number
 * @min 0
 * @max 20
 *
 * @arg maxvalue
 * @desc 変数の最大量を指定
 * @text 最大値
 * @default 100
 * @type number
 * @min 0
 * @max 999999999
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ============================================================================
 * +++ MOG - Variable HUD (v1.2) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * ============================================================================
 * マップ画面で変数/アイテム数をHUD表示します。
 *
 * ===========================================================================
 * - 必要ファイル
 * ===========================================================================
 * 画像を下記フォルダに保存してください。
 * /img/variablehud/
 *
 * メーター機能が有効になっている場合、メーター画像が必要になります。
 * この画像は下記のように名前を付ける必要があります。
 *
 * -> FILE_NAME + _GAUGE.png
 *
 * -> HUD1_GAUGE.png
 *
 *
 * ===========================================================================
 * - プラグインコマンド
 * ===========================================================================
 * 下記のプラグインコマンドがあります。
 * - HUDを有効/無効にする
 * - 変数の最大値を設定する
 *
 * ============================================================================
 * - 更新履歴
 * ============================================================================
 * （v1.2）メニューを終了した後の非表示モードでのHUDの点滅のバグを修正。
 * （v1.1）エンコーディングに関するソート機能を修正。
 *
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_VariableHud = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_VariableHud');
Moghunter.variableHud_smartFade = String(Moghunter.parameters['Smart Fade'] || "false");
Moghunter.variableHud_FieldVisible = String(Moghunter.parameters['Initial Visible'] || "false");
Moghunter.variableHud_Max = 20; Moghunter.variableHud_Visible = [];
Moghunter.variableHud_VisibleInt = []; Moghunter.variableHud_VariableID = [];
Moghunter.variableHud_ValueLimit = []; Moghunter.variableHud_FileName = [];
Moghunter.variableHud_LayX = []; Moghunter.variableHud_LayY = [];
Moghunter.variableHud_NumX = []; Moghunter.variableHud_NumY = [];
Moghunter.variableHud_NumAlign = []; Moghunter.variableHud_NumFontSize = [];
Moghunter.variableHud_Type = []; Moghunter.variableHud_ShowMax = [];
Moghunter.variableHud_ShowGauge = []; Moghunter.variableHud_gaugeX = [];
Moghunter.variableHud_gaugeY = []; Moghunter.variableHud_AutoFade = [];
for (var i = 0; i < Moghunter.variableHud_Max; i++) {
	Moghunter.variableHud_Visible[i] = String(Moghunter.parameters['Hud ' + String(i + 1) + ' Enable'] || 'false');
	Moghunter.variableHud_VisibleInt[i] = String(Moghunter.parameters['Hud ' + String(i + 1) + ' Start Visible'] || 'true');
	Moghunter.variableHud_Type[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Mode'] || 0);
	Moghunter.variableHud_VariableID[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Variable ID'] || 1);
	Moghunter.variableHud_ValueLimit[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Maximum Value'] || 999);
	Moghunter.variableHud_FileName[i] = String(Moghunter.parameters['Hud ' + String(i + 1) + ' File Name'] || 'Hud_');
	Moghunter.variableHud_LayX[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Layout X'] || 0);
	Moghunter.variableHud_LayY[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Layout Y'] || 0);
	Moghunter.variableHud_NumX[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Number X'] || -7);
	Moghunter.variableHud_NumY[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Number Y'] || 10);
	Moghunter.variableHud_NumAlign[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Number Align'] || 1);
	Moghunter.variableHud_NumFontSize[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Font Size'] || 18);
	Moghunter.variableHud_ShowMax[i] = String(Moghunter.parameters['Hud ' + String(i + 1) + ' Show Max Value'] || 'true');
	Moghunter.variableHud_ShowGauge[i] = String(Moghunter.parameters['Hud ' + String(i + 1) + ' Show Gauge'] || 'false');
	Moghunter.variableHud_gaugeX[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Gauge X-Axis'] || 0);
	Moghunter.variableHud_gaugeY[i] = Number(Moghunter.parameters['Hud ' + String(i + 1) + ' Gauge Y-Axis'] || 0);
	Moghunter.variableHud_AutoFade[i] = String(Moghunter.parameters['Auto Fade'] || 'true');
};

//=============================================================================
// ■■■  PluginManager ■■■ 
//=============================================================================		
PluginManager.registerCommand('MOG_VariableHud', "VariableHudVisibleField", data => {
	var vis = String(data.visible) == "true" ? true : false;
	$gameSystem._variableHudFieldVisisble = vis;
});

PluginManager.registerCommand('MOG_VariableHud', "VariableHudVisible", data => {
	var varID = Number(data.id);
	if ($gameSystem._variableHudData[varID]) {
		var vis = String(data.visible) == "true" ? true : false;
		$gameSystem._variableHudData[varID].visible = vis;
	};
});

PluginManager.registerCommand('MOG_VariableHud', "VariableHudMaxValue", data => {
	var varID = Number(data.id);
	if ($gameSystem._variableHudData[varID]) {
		var maxValue = Math.min(Math.max(data.maxvalue, 0), 99999999);
		$gameSystem._variableHudData[varID].maxValue = maxValue;
	};
});

//=============================================================================
// ** ImageManager
//=============================================================================	

//=============================
// ** Load Variable Hud
//=============================
ImageManager.loadVariableHud = function (filename) {
	return this.loadBitmap('img/variablehud/', filename, 0, true);
};

//=============================================================================
// ** Game System
//=============================================================================	

//==============================
// * Initialize
//==============================
var _mog_variableHud_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function () {
	_mog_variableHud_gsys_initialize.call(this);
	this._variableHudData = [];
	this._variableHudVisible = true;
	this._variableHudFieldVisisble = String(Moghunter.variableHud_FieldVisible) === "true" ? true : false;
};

//=============================================================================
// ** Game Character Base 
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
// ** Scene Base
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
// ** Scene Map
//=============================================================================	

//==============================
// ♦ ALIAS ♦  create Spriteset
//==============================
var _mog_VariableHud_sMap_createSpriteset = Scene_Map.prototype.createSpriteset;
Scene_Map.prototype.createSpriteset = function () {
	_mog_VariableHud_sMap_createSpriteset.call(this);
	if (!this._hudField) { this.createHudField() };
	this.createVariableHuds();
	this.sortMz();
};

//==============================
// ♦ ALIAS ♦  snapForBattleBackground
//==============================
var _mog_variableHud_scnMap_snapForBattleBackground = Scene_Map.prototype.snapForBattleBackground;
Scene_Map.prototype.snapForBattleBackground = function () {
	if (this._hudField && SceneManager.isNextScene(Scene_Battle)) { this._hudField.visible = false };
	_mog_variableHud_scnMap_snapForBattleBackground.call(this);
};

//==============================
// ♦ ALIAS ♦  Update
//==============================
var _mog_variableHud_scnMap_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function () {
	_mog_variableHud_scnMap_update.call(this);
	if (this._variableHudField) { this._variableHudField.visible = $gameSystem._variableHudFieldVisisble };
};

//==============================
// * create VariableHuds
//==============================
Scene_Map.prototype.createVariableHuds = function () {
	this._variableHudField = new Sprite();
	this._variableHudField.z = 10;
	this._hudField.addChild(this._variableHudField);
	this._variableHud = [];
	for (var i = 0; i < Moghunter.variableHud_Max; i++) {
		if (!$gameSystem._variableHudData[i]) {
			$gameSystem._variableHudData[i] = {}
			var vis = String(Moghunter.variableHud_VisibleInt[i]) === "true" ? true : false;
			$gameSystem._variableHudData[i].id = i;
			$gameSystem._variableHudData[i].visible = vis;
			$gameSystem._variableHudData[i].maxValue = Number(Moghunter.variableHud_ValueLimit[i]);
			$gameSystem._variableHudData[i].showMax = String(Moghunter.variableHud_ShowMax[i]) == "true" ? true : false;
			$gameSystem._variableHudData[i].gauge = String(Moghunter.variableHud_ShowGauge[i]) == "true" ? true : false;
			$gameSystem._variableHudData[i].gaugeX = Number(Moghunter.variableHud_gaugeX[i]);
			$gameSystem._variableHudData[i].gaugeY = Number(Moghunter.variableHud_gaugeY[i]);
			$gameSystem._variableHudData[i].autoFade = String(Moghunter.variableHud_AutoFade[i]) == "true" ? true : false;
		};
		this._variableHud[i] = new VariableHud(i);
		this._variableHud[i].z = 126;
		this._variableHudField.addChild(this._variableHud[i]);
	};
};

//=============================================================================
// ** Variable Hud
//=============================================================================
function VariableHud() {
	this.initialize.apply(this, arguments);
};

VariableHud.prototype = Object.create(Sprite.prototype);
VariableHud.prototype.constructor = VariableHud;

//==============================
// * Initialize
//==============================
VariableHud.prototype.initialize = function (index) {
	Sprite.prototype.initialize.call(this);
	this._index = index;
	this._enabled = String(Moghunter.variableHud_Visible[this._index]) === "true" ? true : false;
	this._smartFade = String(Moghunter.variableHud_smartFade) === "true" ? true : false;
	if (this._enabled) { this.createSprites() };
	this.visible = false
};


//==============================
// * data Sys
//==============================
VariableHud.prototype.dataSys = function () {
	return $gameSystem._variableHudData[this._index];
};

//==============================
// * Variable ID
//==============================
VariableHud.prototype.variableID = function () {
	return Moghunter.variableHud_VariableID[this._index]
};

//==============================
// * max Value
//==============================
VariableHud.prototype.maxValue = function () {
	return this.dataSys().maxValue;
};

//==============================
// * show Max
//==============================
VariableHud.prototype.showMax = function () {
	return this.dataSys().showMax;
};

//==============================
// * show Gauge 
//==============================
VariableHud.prototype.showGauge = function () {
	return this.dataSys().gauge;
};

//==============================
// * Type
//==============================
VariableHud.prototype.type = function () {
	return Moghunter.variableHud_Type[this._index];
};

//==============================
// * Number
//==============================
VariableHud.prototype.number = function () {
	return this.type() === 0 ? $gameVariables.value(this.variableID()) : $gameParty.numItems(this.item());
};

//==============================
// * item
//==============================
VariableHud.prototype.item = function () {
	return $dataItems[this.variableID()];
};

//==============================
// * Create Sprites
//==============================
VariableHud.prototype.createSprites = function () {
	this._variable = $gameVariables.value(this.variableID());
	this._hud_size = [-1, 0, 0, 0];
	this.x = Number(Moghunter.variableHud_LayX[this._index]);
	this.y = Number(Moghunter.variableHud_LayY[this._index]);
	this.createLayout();
	if (this.showGauge()) { this.createGauge() };
	this.createNumber();
	this.refreshHud();
	this._maxValue = this.maxValue();
};

//==============================
// * Create Layout
//==============================
VariableHud.prototype.createLayout = function () {
	var fileName = String(Moghunter.variableHud_FileName[this._index]);
	this._layout = new Sprite(ImageManager.loadVariableHud(fileName));
	this.addChild(this._layout);
};

//==============================
// * Create Gauge
//==============================
VariableHud.prototype.createGauge = function () {
	var fileName = String(Moghunter.variableHud_FileName[this._index] + "_gauge");
	this._gaugeImg = ImageManager.loadVariableHud(fileName)
	this._gauge = new Sprite(this._gaugeImg);
	this._gauge.x = this.dataSys().gaugeX;
	this._gauge.y = this.dataSys().gaugeY;
	this.addChild(this._gauge);
	this.refreshGauge();
};

//==============================
// * refresh Gauge
//==============================
VariableHud.prototype.refreshGauge = function () {
	var wd = this._gaugeImg.width * this._variable / this.maxValue();
	var ch = this._gaugeImg.height;
	this._gauge.setFrame(0, 0, wd, ch);
};

//==============================
// * Create Number
//==============================
VariableHud.prototype.createNumber = function () {
	this._number = new Sprite(new Bitmap(200, 46));
	this._number.x = Number(Moghunter.variableHud_NumX[this._index]);
	this._number.y = Number(Moghunter.variableHud_NumY[this._index]);
	this._number.bitmap.fontSize = Moghunter.variableHud_NumFontSize[this._index]
	this.addChild(this._number);
};

//==============================
// * Refresh Number
//==============================
VariableHud.prototype.refreshNumber = function () {
	this._number.bitmap.clear();
	var maxv = (Math.abs(this.maxValue()).toString().split(""));
	var maxv2 = Number(maxv.length);
	var text = this.showMax() ? (this._variable).padZero(maxv2) + "/" + this.maxValue() : String(this._variable);
	this._number.bitmap.drawText(text, 0, 0, 190, 44, this.aligntype());
};

//==============================
// * Refresh Hud
//==============================
VariableHud.prototype.refreshHud = function () {
	if (this.type() === 0) {
		if (this.number() > this.maxValue()) {
			$gameVariables.setValue(this.variableID(), this.maxValue());
		};
	};
	this._variable = this.number();
	this._maxValue = this.maxValue();
	$gameSystem._variableHudData[this._index].needRefresh = false
	this.refreshNumber();
	if (this._gauge) { this.refreshGauge() };
};

//==============================
// * need Refresh Hud
//==============================
VariableHud.prototype.needRefreshHud = function () {
	if (this._variable != this.number()) { return true };
	if (this._maxValue != this.maxValue()) { return true };
	return false
};

//==============================
// * Align Type
//==============================
VariableHud.prototype.aligntype = function () {
	if (Moghunter.variableHud_NumAlign[this._index] === 0) {
		return "left"
	} else if (Moghunter.variableHud_NumAlign[this._index] === 1) {
		return "center"
	} else { return "right" };
};

//==============================
// * Update
//==============================
VariableHud.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._enabled) { this.updateSprites() };
	if (this.needHide()) {
		this.visible = false;
	} else {
		this.visible = true;
	};
};

//==============================
// * Need Hide
//==============================
VariableHud.prototype.needHide = function () {
	if ($gameMessage.isBusy() && $gameSystem._variableHudData[this._index].autoFade) { return true };
	if ($gameSystem._variableHudData[this._index] && !$gameSystem._variableHudData[this._index].visible) { return true };
	if (Imported.MOG_ChronoEngine && $gameSystem.isChronoMode()) { return true };
	return false
};

//==============================
// * Need Fade
//==============================
VariableHud.prototype.needFade = function () {
	if (!this._smartFade) { return false };
	if (this._hud_size[0] === -1) { return false };
	if ($gamePlayer.screen_realX() < this._hud_size[0]) { return false };
	if ($gamePlayer.screen_realX() > this._hud_size[2]) { return false };
	if ($gamePlayer.screen_realY() < this._hud_size[1]) { return false };
	if ($gamePlayer.screen_realY() > this._hud_size[3]) { return false };
	return true;
};

//==============================
// * get Data
//==============================
VariableHud.prototype.getData = function () {
	this._hud_size[0] = this.x - ($gameMap.tileWidth() / 2);
	this._hud_size[1] = this.y - ($gameMap.tileHeight() / 2);
	this._hud_size[2] = this.x + this._layout.bitmap.width;
	this._hud_size[3] = this.y + this._layout.bitmap.height;
};

//==============================
// * Update Visible
//==============================
VariableHud.prototype.updateVisible = function () {
	if (this.needFade()) {
		if (this.opacity > 90) {
			this.opacity -= 10;
			if (this.opacity < 90) { this.opacity = 90 };
		};
	} else {
		this.opacity += 10;
	};
};

//==============================
// * Update Sprites
//==============================
VariableHud.prototype.updateSprites = function () {
	if (this.needRefreshHud()) { this.refreshHud() };
	if (this._layout.bitmap.isReady()) {
		this.visible = true;
		if (this._hud_size[0] === -1) { this.getData() };
	};
	this.updateVisible();
};
