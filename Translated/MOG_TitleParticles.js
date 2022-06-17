//=============================================================================
// MOG_TitleParticles.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.3) Adiciona partículas na tela de título.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 * 
 * @param -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param P1 Visible
 * @desc Ativar partícula.
 * @default true
 * @type boolean 
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 File Name
 * @desc Nome do arquivo.
 * @default Particles
 * @type file
 * @dir img/titles2/ 
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Amount
 * @desc Quantidade de partículas.
 * @default 25
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param P1 X Speed
 * @desc Velocidade X-Axis.
 * @default -10
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Y Speed
 * @desc Velocidade Y-Axis.
 * @default -1
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Rotation Speed
 * @desc Velocidade de rotação.
 * @default 0.02
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Blend Mode
 * @desc Definição de blend.
 * @default 1
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1 
 * @option Substract
 * @value 2
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Anchor
 * @desc Definição do anchor.
 * @default 0
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Leaf Mode
 * @desc Ativar animação de folha.
 * @default false
 * @type boolean
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Transition Time
 * @desc Tempo para apresentar a imagem.
 * @default 0
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param P2 Visible
 * @desc Ativar partícula.
 * @default true
 * @type boolean 
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 File Name
 * @desc Nome do arquivo.
 * @default Particles2
 * @type file
 * @dir img/titles2/ 
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Amount
 * @desc Quantidade de partículas.
 * @default 5
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *  
 * @param P2 X Speed
 * @desc Velocidade X-Axis.
 * @default 2
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Y Speed
 * @desc Velocidade Y-Axis.
 * @default 2
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Rotation Speed
 * @desc Velocidade de rotação.
 * @default 0.01
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Blend Mode
 * @desc Definição de blend.
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1 
 * @option Substract
 * @value 2
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Anchor
 * @desc Definição do anchor.
 * @default 0
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Leaf Mode
 * @desc Ativar animação de folha.
 * @default false
 * @type boolean
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Transition Time
 * @desc Tempo para apresentar a imagem.
 * @default 0
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param P3 Visible
 * @desc Ativar partícula.
 * @default true
 * @type boolean 
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 File Name
 * @desc Nome do arquivo.
 * @default Particles3
 * @type file
 * @dir img/titles2/ 
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Amount
 * @desc Quantidade de partículas.
 * @default 5
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param P3 X Speed
 * @desc Velocidade X-Axis.
 * @default 0.5
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Y Speed
 * @desc Velocidade Y-Axis.
 * @default 0.5
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Rotation Speed
 * @desc Velocidade de rotação.
 * @default 0.006
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Blend Mode
 * @desc Definição de blend.
 * @default 0
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1 
 * @option Substract
 * @value 2
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Anchor
 * @desc Definição do anchor.
 * @default 0
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Leaf Mode
 * @desc Ativar animação de folha.
 * @default true
 * @type boolean
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Transition Time
 * @desc Tempo para apresentar a imagem.
 * @default 0
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param P4 Visible
 * @desc Ativar partícula.
 * @default false
 * @type boolean 
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 File Name
 * @desc Nome do arquivo.
 * @default Particles4
 * @type file
 * @dir img/titles2/ 
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Amount
 * @desc Quantidade de partículas.
 * @default 25
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param P4 X Speed
 * @desc Velocidade X-Axis.
 * @default 2
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Y Speed
 * @desc Velocidade Y-Axis.
 * @default 0.3
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Rotation Speed
 * @desc Velocidade de rotação.
 * @default 0.3
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Blend Mode
 * @desc Definição de blend.
 * @default 1
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1 
 * @option Substract
 * @value 2
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Anchor
 * @desc Definição do anchor.
 * @default 0
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Leaf Mode
 * @desc Ativar animação de folha.
 * @default true
 * @type boolean
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Transition Time
 * @desc Tempo para apresentar a imagem.
 * @default 0
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param P5 Visible
 * @desc Ativar partícula.
 * @default false
 * @type boolean 
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 File Name
 * @desc Nome do arquivo.
 * @default Particles5
 * @type file
 * @dir img/titles2/ 
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Amount
 * @desc Quantidade de partículas.
 * @default 25
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param P5 X Speed
 * @desc Velocidade X-Axis.
 * @default 4
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Y Speed
 * @desc Velocidade Y-Axis.
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Rotation Speed
 * @desc Velocidade de rotação.
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Blend Mode
 * @desc Definição de blend.
 * @default 1
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1 
 * @option Substract
 * @value 2
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Anchor
 * @desc Definição do anchor.
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Leaf Mode
 * @desc Ativar animação de folha.
 * @default false
 * @type boolean 
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Transition Time
 * @desc Tempo para apresentar a imagem.
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 * 
 * @param P6 Visible
 * @desc Ativar partícula.
 * @default false
 * @type boolean 
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 File Name
 * @desc Nome do arquivo.
 * @default Particles6
 * @type file
 * @dir img/titles2/ 
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Amount
 * @desc Quantidade de partículas.
 * @default 25
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 * 
 * @param P6 X Speed
 * @desc Velocidade X-Axis.
 * @default 4
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Y Speed
 * @desc Velocidade Y-Axis.
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Rotation Speed
 * @desc Velocidade de rotação.
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Blend Mode
 * @desc Definição de blend.
 * @default 1
 * @type select
 * @option Normal
 * @value 0
 * @option Add
 * @value 1 
 * @option Substract
 * @value 2
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Anchor
 * @desc Definição do anchor.
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Leaf Mode
 * @desc Ativar animação de folha.
 * @default false
 * @type boolean 
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Transition Time
 * @desc Tempo para apresentar a imagem.
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @help  
 * =============================================================================
 * +++ MOG - Title Particles (v1.3) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona partículas na tela de título.
 *
 * Grave as imagens na pasta.
 *
 * img/titles2/
 *
 * =============================================================================
 * * HISTORICO
 * =============================================================================
 * (v1.3) - Melhoria na codificação.
 * (v1.2) - Correção na função "sort relativo a codificação.    
 * (v1.1) - Melhoria no plugin parameter na seleção de arquivos.
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.3) タイトル画面にパーティクルを追加します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_TitleParticles.js
 *
 * @param -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> パーティクル 1 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param P1 Visible
 * @text 有効化
 * @desc パーティクルの有効設定
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 File Name
 * @text ファイル名
 * @desc 画像のファイル名
 * @default Particles
 * @type file
 * @dir img/titles2/
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Amount
 * @text 発生数
 * @desc パーティクルの発生数
 * @type number
 * @default 25
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 X Speed
 * @text X軸速度
 * @desc 基本位置のX軸移動速度。
 * 正:右 / 負:左。絶対値が大きいほど高速。
 * @default -10
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Y Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default -1
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Rotation Speed
 * @text 回転速度
 * @desc 正:時計回り / 負:反時計回り。絶対値が大きいほど高速。
 * @default 0.02
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Blend Mode
 * @text 合成方法
 * @desc 画像の合成方法
 * 0:通常 / 1:加算 / 2:乗算
 * @default 1
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Anchor
 * @text 基本位置範囲
 * @desc 基本位置(アンカー)からの移動半径
 * @default 0
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Leaf Mode
 * @text リーフモード有効化
 * @desc 縦横比を変化させ、横回転に見せるモード
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P1 Transition Time
 * @text 表示ウェイト
 * @desc 画像表示開始までのウェイト量
 * @default 0
 * @parent -> Particles 1 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> パーティクル 2 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param P2 Visible
 * @text 有効化
 * @desc パーティクルの有効設定
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 File Name
 * @text ファイル名
 * @desc 画像のファイル名
 * @default Particles2
 * @type file
 * @dir img/titles2/
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Amount
 * @text 発生数
 * @desc パーティクルの発生数
 * @default 5
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 X Speed
 * @text X軸速度
 * @desc 基本位置のX軸移動速度。
 * 正:右 / 負:左。絶対値が大きいほど高速。
 * @default 2
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Y Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 2
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Rotation Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 0.01
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Blend Mode
 * @text 合成方法
 * @desc 画像の合成方法
 * 0:通常 / 1:加算 / 2:乗算
 * @default 0
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Anchor
 * @text 基本位置範囲
 * @desc 基本位置(アンカー)からの移動半径
 * @default 0
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Leaf Mode
 * @text リーフモード有効化
 * @desc 縦横比を変化させ、横回転に見せるモード
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P2 Transition Time
 * @text 表示ウェイト
 * @desc 画像表示開始までのウェイト量
 * @default 0
 * @parent -> Particles 2 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> パーティクル 3 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param P3 Visible
 * @text 有効化
 * @desc パーティクルの有効設定
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 File Name
 * @text ファイル名
 * @desc 画像のファイル名
 * @default Particles3
 * @type file
 * @dir img/titles2/
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Amount
 * @text 発生数
 * @desc パーティクルの発生数
 * @default 5
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 X Speed
 * @text X軸速度
 * @desc 基本位置のX軸移動速度。
 * 正:右 / 負:左。絶対値が大きいほど高速。
 * @default 0.5
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Y Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 0.5
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Rotation Speed
 * @text 回転速度
 * @desc 正:時計回り / 負:反時計回り。絶対値が大きいほど高速。
 * @default 0.006
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Blend Mode
 * @text 合成方法
 * @desc 画像の合成方法
 * 0:通常 / 1:加算 / 2:乗算
 * @default 0
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Anchor
 * @text 基本位置範囲
 * @desc 基本位置(アンカー)からの移動半径
 * @default 0
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Leaf Mode
 * @text リーフモード有効化
 * @desc 縦横比を変化させ、横回転に見せるモード
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P3 Transition Time
 * @text 表示ウェイト
 * @desc 画像表示開始までのウェイト量
 * @default 0
 * @parent -> Particles 3 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> パーティクル 4 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param P4 Visible
 * @text 有効化
 * @desc パーティクルの有効設定
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 File Name
 * @text ファイル名
 * @desc 画像のファイル名
 * @default Particles4
 * @type file
 * @dir img/titles2/
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Amount
 * @text 発生数
 * @desc パーティクルの発生数
 * @default 25
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 X Speed
 * @text X軸速度
 * @desc 基本位置のX軸移動速度。
 * 正:右 / 負:左。絶対値が大きいほど高速。
 * @default 2
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Y Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 0.3
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Rotation Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 0.3
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Blend Mode
 * @text 合成方法
 * @desc 画像の合成方法
 * 0:通常 / 1:加算 / 2:乗算
 * @default 1
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Anchor
 * @text 基本位置範囲
 * @desc 基本位置(アンカー)からの移動半径
 * @default 0
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Leaf Mode
 * @text リーフモード有効化
 * @desc 縦横比を変化させ、横回転に見せるモード
 * @default true
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P4 Transition Time
 * @text 表示ウェイト
 * @desc 画像表示開始までのウェイト量
 * @default 0
 * @parent -> Particles 4 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> パーティクル 5 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param P5 Visible
 * @text 有効化
 * @desc パーティクルの有効設定
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 File Name
 * @text ファイル名
 * @desc 画像のファイル名
 * @default Particles5
 * @type file
 * @dir img/titles2/
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Amount
 * @text 発生数
 * @desc パーティクルの発生数
 * @default 25
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 X Speed
 * @text X軸速度
 * @desc 基本位置のX軸移動速度。
 * 正:右 / 負:左。絶対値が大きいほど高速。
 * @default 4
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Y Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Rotation Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Blend Mode
 * @text 合成方法
 * @desc 画像の合成方法
 * 0:通常 / 1:加算 / 2:乗算
 * @default 1
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Anchor
 * @text 基本位置範囲
 * @desc 基本位置(アンカー)からの移動半径
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Leaf Mode
 * @text リーフモード有効化
 * @desc 縦横比を変化させ、横回転に見せるモード
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P5 Transition Time
 * @text 表示ウェイト
 * @desc 画像表示開始までのウェイト量
 * @default 0
 * @parent -> Particles 5 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 * @text -> パーティクル 6 <<<<<<<<<<<<<<<<<<<<<<<
 * @desc
 *
 * @param P6 Visible
 * @text 有効化
 * @desc パーティクルの有効設定
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 File Name
 * @text ファイル名
 * @desc 画像のファイル名
 * @default Particles6
 * @type file
 * @dir img/titles2/
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Amount
 * @text 発生数
 * @desc パーティクルの発生数
 * @default 25
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 X Speed
 * @text X軸速度
 * @desc 基本位置のX軸移動速度。
 * 正:右 / 負:左。絶対値が大きいほど高速。
 * @default 4
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Y Speed
 * @text Y軸速度
 * @desc 基本位置のY軸移動速度。
 * 正:下 / 負:上。絶対値が大きいほど高速。
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Rotation Speed
 * @text 回転速度
 * @desc 正:時計回り / 負:反時計回り。絶対値が大きいほど高速。
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Blend Mode
 * @text 合成方法
 * @desc 画像の合成方法
 * 0:通常 / 1:加算 / 2:乗算
 * @default 1
 * @type select
 * @option 通常
 * @value 0
 * @option 加算
 * @value 1
 * @option 乗算
 * @value 2
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Anchor
 * @text 基本位置範囲
 * @desc 基本位置(アンカー)からの移動半径
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Leaf Mode
 * @text リーフモード有効化
 * @desc 縦横比を変化させ、横回転に見せるモード
 * @default false
 * @type boolean
 * @on 有効
 * @off 無効
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @param P6 Transition Time
 * @text 表示ウェイト
 * @desc 画像表示開始までのウェイト量
 * @default 0
 * @parent -> Particles 6 <<<<<<<<<<<<<<<<<<<<<<<
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ============================================================================
 * +++ MOG - Title Particles (v1.3) +++
 * By Moghunter
 * https://mogplugins.wordpress.com
 * ============================================================================
 * タイトル画面にパーティクルを追加します。
 *
 * 下記のフォルダに画像ファイルを保存してください。
 *
 * img/titles2/
 *
 * ============================================================================
 * * 更新履歴
 * ============================================================================
 *（v1.3）- コーディングが改善されました。
 *（v1.2）- 「エンコーディングに関連するソート」機能の修正。
 *（v1.1）- ファイルを選択するためのプラグインパラメーターが改善されました。
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
var Imported = Imported || {};
Imported.MOG_Title_Particles = true;
var Moghunter = Moghunter || {};

Moghunter.parameters = PluginManager.parameters('MOG_TitleParticles');
Moghunter.tparticles_M = 6;
Moghunter.tparticles_V = []; Moghunter.tparticles_F = [];
Moghunter.tparticles_N = []; Moghunter.tparticles_X = [];
Moghunter.tparticles_Y = []; Moghunter.tparticles_R = [];
Moghunter.tparticles_B = []; Moghunter.tparticles_A = [];
Moghunter.tparticles_L = [];
Moghunter.tparticles_T = [];
for (var i = 0; i < Moghunter.tparticles_M; i++) {
	Moghunter.tparticles_V[i] = String(Moghunter.parameters['P' + String(i + 1) + " Visible"] || "true");
	Moghunter.tparticles_F[i] = String(Moghunter.parameters['P' + String(i + 1) + " File Name"] || "Particles");
	Moghunter.tparticles_N[i] = Number(Moghunter.parameters['P' + String(i + 1) + " Amount"] || 25);
	Moghunter.tparticles_X[i] = Number(Moghunter.parameters['P' + String(i + 1) + " X Speed"] || 0);
	Moghunter.tparticles_Y[i] = Number(Moghunter.parameters['P' + String(i + 1) + " Y Speed"] || -1);
	Moghunter.tparticles_R[i] = Number(Moghunter.parameters['P' + String(i + 1) + " Rotation Speed"] || 0.02);
	Moghunter.tparticles_B[i] = Number(Moghunter.parameters['P' + String(i + 1) + " Blend Mode"] || 1);
	Moghunter.tparticles_A[i] = Number(Moghunter.parameters['P' + String(i + 1) + " Anchor"] || 0);
	Moghunter.tparticles_L[i] = String(Moghunter.parameters['P' + String(i + 1) + " Leaf Mode"] || "false");
	Moghunter.tparticles_T[i] = Number(Moghunter.parameters['P' + String(i + 1) + " Transition Time"] || 60);
};

//=============================================================================
// ■ Scene Title ■
//=============================================================================	

//==============================
// ♦ ALIAS ♦  Create Foreground
//==============================
var _mogMZ_titleParticles_createForeground = Scene_Title.prototype.createForeground;
Scene_Title.prototype.createForeground = function () {
	if (!this._titleField2) { this.createTitleField2() };
	this.createTitleParticles();
	_mogMZ_titleParticles_createForeground.call(this);
};

//==============================
// ♦ ALIAS ♦  Create
//==============================
var _mogMZ_titleParticles_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function () {
	_mogMZ_titleParticles_create.call(this);
	if (this._titleField2) { this._titleField2.children.sort((a, b) => a.z - b.z) };
};

//==============================
// * Create Title Field 2
//==============================
Scene_Title.prototype.createTitleField2 = function () {
	this._titleField2 = new Sprite();
	this._titleField2.z = 100;
	this.addChild(this._titleField2);
};

//==============================
// * Create Title Particles
//==============================
Scene_Title.prototype.createTitleParticles = function () {
	this._tparticles = []
	for (var i = 0; i < Moghunter.tparticles_M; i++) {
		this._tparticles[i] = new TitleParticles(i);
		this._tparticles[i].z = 100 + i;
		this._titleField2.addChild(this._tparticles[i]);
	};
};

//=============================================================================
// ■ Title Particles ■
//=============================================================================
function TitleParticles() {
	this.initialize.apply(this, arguments);
};

TitleParticles.prototype = Object.create(Sprite.prototype);
TitleParticles.prototype.constructor = TitleParticles;

//==============================
// * Initialize
//==============================
TitleParticles.prototype.initialize = function (index) {
	Sprite.prototype.initialize.call(this);
	this._index = index;
	this._enabled = String(Moghunter.tparticles_V[this._index]) === "true" ? true : false;
	this._t = Number(Moghunter.tparticles_T[this._index]);
	if (this._enabled) {
		this._img = ImageManager.loadTitle2(Moghunter.tparticles_F[this._index])
		this._start = false;
		this._img._cw = 0;
		this._img._ch = 0;
		this._img._cw2 = 0;
		this._img._ch2 = 0;
	};
};

//==============================
// * get Data
//==============================
TitleParticles.prototype.getData = function () {
	this._img._cw = this._img.width;
	this._img._cw2 = this._img._cw * 3;
	this._img._ch = this._img.height;
	this._img._ch2 = this._img._ch * 3;
	this.createParticles();
};

//==============================
// * create Particles
//==============================
TitleParticles.prototype.createParticles = function () {
	this._spriteP = [];
	for (var i = 0; i < Moghunter.tparticles_N[this._index]; i++) {
		this._spriteP[i] = new Sprite(this._img);
		this._spriteP[i].sx = [0, Number(Moghunter.tparticles_X[this._index])];
		this._spriteP[i].sy = [0, Number(Moghunter.tparticles_Y[this._index])];
		this._spriteP[i].rt = [0, Number(Moghunter.tparticles_R[this._index])];
		this._spriteP[i].blendMode = Number(Moghunter.tparticles_B[this._index]);
		this._spriteP[i].anchor.x = Number(Moghunter.tparticles_A[this._index]);
		this._spriteP[i].anchor.y = Number(Moghunter.tparticles_A[this._index]);
		this._spriteP[i].int = true;
		this._spriteP[i].lef = [String(Moghunter.tparticles_L[this._index]) === "true" ? true : false, 0, 1.00, 0];
		this.addChild(this._spriteP[i]);
		this.refreshParticles(this._spriteP[i]);
	};
	this._start = true;
};

//==============================
// * refresh Particles
//==============================
TitleParticles.prototype.refreshParticles = function (sprite) {
	if (sprite.sx[1] != 0) {
		var r = 0.7 + Math.abs(Math.random() * sprite.sx[1]);
		sprite.sx[0] = sprite.sx[1] > 0 ? r : -r;
	};
	if (sprite.sy[1] != 0) {
		var r = 0.7 + Math.abs(Math.random() * sprite.sy[1]);
		sprite.sy[0] = sprite.sy[1] > 0 ? r : -r;
	};
	if (sprite.rt[1] != 0) {
		var r = 0.03 + Math.abs(Math.random() * sprite.rt[1]);
		sprite.rt[0] = sprite.rt[1] > 0 ? r : -r;
	};
	var r = Math.randomInt(360) * 0.01;
	sprite.rotation = r;
	var pz = ((Math.random() * 0.5) * 1);
	sprite.scale = new PIXI.Point(0.5 + Number(pz), 0.5 + Number(pz));
	sprite.lef[1] = 0;
	sprite.lef[2] = sprite.scale.x;

	sprite.lef[3] = 120 + Math.randomInt(180);
	sprite.opacity = 255;
	this.setPosition(sprite);
};

//==============================
// * set Position
//==============================
TitleParticles.prototype.setPosition = function (sprite) {
	if (sprite.int) {
		this.setStartPosition(sprite);
	} else {
		this.setPositionX(sprite);
		this.setPositionY(sprite);
	};
};

//==============================
// * set Start Position
//==============================
TitleParticles.prototype.setStartPosition = function (sprite) {
	var r = Math.randomInt(Graphics.width + this._img._cw2);
	sprite.x = -this._img._cw + r;
	var r = Math.randomInt(Graphics.height + this._img._ch2);
	sprite.y = -this._img._ch + r;
	sprite.int = false;
};

//==============================
// * set Position X
//==============================
TitleParticles.prototype.setPositionX = function (sprite) {
	if (sprite.sx[1] > 0) {
		var r = Math.randomInt(Graphics.width - this.lx1(sprite));
		sprite.x = this.lx1(sprite) + r;
	} else if (sprite.sx[1] < 0) {
		var r = Math.randomInt(Graphics.width - this.lx1(sprite));
		sprite.x = -this.lx1(sprite) + r;
	} else {
		var r = Math.randomInt(Graphics.width + this._img._cw * 2);
		sprite.x = -this._img._cw + r;
	};
};

//==============================
// * set Position Y
//==============================
TitleParticles.prototype.setPositionY = function (sprite) {
	if (sprite.sy[1] > 0) {
		sprite.y = this.ly1();
	} else if (sprite.sy[1] < 0) {
		sprite.y = this.ly2();
	} else {
		var r = Math.randomInt(Graphics.height + this._img._ch * 2);
		sprite.y = -this._img._ch + r;
	};
};

//==============================
// * lx1 
//==============================
TitleParticles.prototype.lx1 = function (sprite) {
	if (sprite.sx[1] > 0) {
		return -Graphics.width / 2;
	} else { return -this._img._cw2 };
};

//==============================
// * lx2 
//==============================
TitleParticles.prototype.lx2 = function (sprite) {
	if (sprite.sx[1] > 0) {
		return Graphics.width + this._img._cw2;
	} else { return Graphics.width + Graphics.width / 2 };
};

//==============================
// * ly1
//==============================
TitleParticles.prototype.ly1 = function (sprite) {
	return -this._img._ch2;
};

//==============================
// * ly2 
//==============================
TitleParticles.prototype.ly2 = function (sprite) {
	return Graphics.height + this._img._ch2
};

//==============================
// * update Move
//==============================
TitleParticles.prototype.updateMove = function (sprite) {
	sprite.x += sprite.sx[0];
	sprite.y += sprite.sy[0];
	sprite.rotation += sprite.rt[0];
	sprite.opacity += 15;
	if (sprite.lef[0]) { this.updateLeaf(sprite) };
};

//==============================
// * update Leaf
//==============================
TitleParticles.prototype.updateLeaf = function (sprite) {
	sprite.lef[3]--;
	if (sprite.lef[3] > 0) { return };
	sprite.scale.x -= 0.01;
	if (sprite.scale.x < -sprite.lef[2]) {
		sprite.lef[1] = 1;
		sprite.scale.x = -sprite.lef[2];
	};
};

//==============================
// * Need Refresh
//==============================
TitleParticles.prototype.needRefresh = function (sprite) {
	if (sprite.x < this.lx1(sprite)) { return true };
	if (sprite.x > this.lx2(sprite)) { return true };
	if (sprite.y < this.ly1(sprite)) { return true };
	if (sprite.y > this.ly2(sprite)) { return true };
	return false
};

//==============================
// * update Particles
//==============================
TitleParticles.prototype.updateParticles = function () {
	if (this._img.isReady() && !this._start) { this.getData() };
	if (!this._start) { return };
	if (!this._spriteP) { return };
	for (var i = 0; i < this._spriteP.length; i++) {
		this.updateMove(this._spriteP[i]);
		if (this.needRefresh(this._spriteP[i])) { this.refreshParticles(this._spriteP[i]) };
	};
};

//==============================
// * Update
//==============================
TitleParticles.prototype.update = function () {
	Sprite.prototype.update.call(this);
	if (this._enabled) { this.updateParticles() };
};
