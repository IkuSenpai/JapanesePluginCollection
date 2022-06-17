//=============================================================================
// MOG_MenuCursor.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc (v1.0) Adiciona um cursor animado no menu de comando.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 *
 * @param -> GENERAL
 * @desc
 *
 * @param FileName
 * @parent -> GENERAL
 * @text File Name
 * @desc Definição do nome do arquivo de imagem.
 * @type file
 * @dir img/menus/
 * @default Cursor_A
 *
 * @param X-Axis Offset
 * @parent -> GENERAL
 * @text X-Axis Offset
 * @desc Definição X-axis do cursor.
 * @default 15
 *
 * @param Y-Axis Offset
 * @parent -> GENERAL
 * @text Y-Axis Offset 
 * @desc Definição Y-axis do cursor.
 * @default 0
 *
 * @param Show Selection
 * @parent -> GENERAL
 * @text Show Selection
 * @desc Apresentar a seleção padrão do cursor.
 * @type boolean
 * @default true
 *
 * @param Show Selection All
 * @parent -> GENERAL
 * @text Show Selection All
 * @desc Apresentar a seleção padrão do cursor.
 * @type boolean
 * @default true
 *
 * @param Move Animation
 * @parent -> GENERAL
 * @text Slide Animation
 * @desc Ativar a animação de deslize (Slide).
 * @type boolean
 * @default true
 *
 * @param Move Speed %
 * @parent -> GENERAL
 * @text Slide Speed %
 * @desc Definição da velocidade do cursor. (30% -> 1000%)
 * @type number
 * @min 30
 * @max 1000 
 * @default 100
 * 
 * @param Align
 * @parent -> GENERAL 
 * @desc Definição do alinhamento do cursor. 
 * @text Align
 * @type select
 * @default Left
 * @option Left
 * @value Left
 * @option Center
 * @value Center
 * @option Right
 * @value Right
 *
 * @param Animation Speed %
 * @parent -> GENERAL
 * @text Animated (Speed %)
 * @desc Definição da velocidade do cursor animado. (30% -> 500%)
 * @type number
 * @min 30
 * @max 500
 * @default 100
 *
 * @param -----------------------
 * @desc
 *
 * @param -> WAVE ANIMATION
 * @desc
 *
 * @param Wave Horizontal
 * @parent -> WAVE ANIMATION
 * @text Horizontal Wave
 * @desc Ativar a animação na horizontal.
 * @type boolean
 * @default true
 *
 * @param Wave Vertical
 * @parent -> WAVE ANIMATION
 * @text Vertical Wave
 * @desc Ativar a animação na vertical.
 * @type boolean
 * @default false
 *
 * @param Wave Range
 * @parent -> WAVE ANIMATION
 * @text Range
 * @desc Definição do espaço da animação. (5 -> 50)
 * @type number
 * @min 5
 * @max 50
 * @default 15
 *
 * @param Wave Speed %
 * @parent -> WAVE ANIMATION
 * @text Speed %
 * @desc Definição da velocidade de animação. (30% -> 400%)
 * @type number
 * @min 30
 * @max 400
 * @default 100
 *
 * @param ------------------------   
 * @desc
 *
 * @param -> ROTATION ANIMATION
 * @desc
 *
 * @param Rotation Animation
 * @parent -> ROTATION ANIMATION
 * @text Rotation Animation
 * @desc Ativar a animação de rotação.
 * @type boolean
 * @default false
 *
 * @param Rotation Speed %
 * @parent -> ROTATION ANIMATION
 * @text Speed %
 * @desc Definição da velocidade de rotação. (30% -> 1000%)
 * @type number
 * @min 30
 * @max 1000
 * @default 100
 *
 * @param -------------------------   
 * @desc
 *
 * @param -> PARTICLES
 * @desc
 *
 * @param Particles
 * @parent -> PARTICLES
 * @text Particle Effects
 * @desc Ativar partículas no cursor.
 * @type boolean
 * @default true
 *
 * @param Par File Name
 * @parent -> PARTICLES
 * @text File Name
 * @desc Definição do nome do arquivo de imagem.
 * @type file
 * @dir img/menus/
 * @default Cursor_Par01
 *
 * @param Par Number of Particles
 * @parent -> PARTICLES
 * @text Number of Particles
 * @desc Definição da quantidade de partículas. (5 -> 300)
 * @type number
 * @min 5
 * @max 300
 * @default 30
 *
 * @param Par X-Axis Offset
 * @parent -> PARTICLES
 * @text X-Axis Offset
 * @desc Definição X-axis Offset das partículas.
 * @default 0
 *
 * @param Par Y-Axis Offset
 * @parent -> PARTICLES
 * @text Y-Axis Offset
 * @desc Definição X-axis Offset das partículas.
 * @default 0
 *
 * @param Par SX-Axis
 * @parent -> PARTICLES
 * @text X-Axis Speed
 * @desc Definição da velocidade das partículas na horizontal.
 * @default -1
 *
 * @param Par SY-Axis
 * @parent -> PARTICLES
 * @text Y-Axis Speed
 * @desc Definição da velocidade das partículas na vertical.
 * @default -2
 *
 * @command MenuCursorGeneral
 * @desc Configuração do cursor de commando.
 * @text General
 *
 * @arg fileName
 * @text File Name
 * @desc Definição do nome do arquivo de imagem.
 * @type file
 * @dir img/menus/
 * @default Cursor_A
 *
 * @arg x
 * @text X-Axis Offset
 * @desc Definição X-axis do cursor.
 * @default 15
 *
 * @arg y
 * @text Y-Axis Offset 
 * @desc Definição Y-axis do cursor.
 * @default 0
 *
 * @arg slide
 * @text Slide Animation
 * @desc Ativar a animação de deslize (Slide).
 * @type boolean
 * @default true
 * 
 * @arg moveSpeed
 * @text Slide Speed %
 * @desc Definição da velocidade do cursor. (30% -> 1000%)
 * @type number
 * @min 30
 * @max 1000 
 * @default 100
 * 
 * @arg align
 * @desc Definição do alinhamento do cursor. 
 * @text Align
 * @type select
 * @default Left
 * @option Left
 * @value Left
 * @option Center
 * @value Center
 * @option Right
 * @value Right
 *
 * @arg animeSpeed
 * @text Animated (Speed %)
 * @desc Definição da velocidade do cursor animado. (30% -> 500%)
 * @type number
 * @min 30
 * @max 500
 * @default 100
 *
 * @command MenuCursorWave
 * @desc Configuração do efeito wave.
 * @text Wave Effect
 * 
 * @arg horzWave
 * @text Horizontal Mode
 * @desc Ativar a animação na horizontal.
 * @type boolean
 * @default true
 *
 * @arg vertWave
 * @text Vertical Mode
 * @desc Ativar a animação na vertical.
 * @type boolean
 * @default false
 *
 * @arg waveRange
 * @text Range
 * @desc Definição do espaço da animação. (5 -> 50)
 * @type number
 * @min 5
 * @max 50
 * @default 15
 *
 * @arg waveSpeed
 * @text Speed %
 * @desc Definição da velocidade de animação. (30% -> 400%)
 * @type number
 * @min 30
 * @max 400
 * @default 100
 * 
 * @command MenuCursorRotation
 * @desc Configuração do efeito de rotação.
 * @text Rotation Effect
 * 
 * @arg rotation
 * @text Rotation Animation
 * @desc Ativar a animação de rotação.
 * @type boolean
 * @default false
 *
 * @arg rotationSpeed
 * @text Speed %
 * @desc Definição da velocidade de rotação. (30% -> 1000%)
 * @type number
 * @min 30
 * @max 1000
 * @default 100
 * 
 * @command MenuCursorParticles
 * @desc Configuração das Partículas
 * @text Particle Effect
 *  
 * @arg parEnable
 * @text Particle Effect
 * @desc Ativar partículas no cursor.
 * @type boolean
 * @default true
 *
 * @arg parFileName
 * @text File Name
 * @desc Definição do nome do arquivo de imagem.
 * @type file
 * @dir img/menus/
 * @default Particles
 *
 * @arg parPower
 * @text Number of Particles
 * @desc Definição da quantidade de partículas. (10 -> 300)
 * @type number
 * @min 5
 * @max 300
 * @default 30
 *
 * @arg parX_Offset
 * @text X-Axis Offset
 * @desc Definição X-axis Offset das partículas.
 * @default 0
 *
 * @arg parY_Offset
 * @text Y-Axis Offset
 * @desc Definição X-axis Offset das partículas.
 * @default 0
 *
 * @arg parSX
 * @text X-Axis Speed
 * @desc Definição da velocidade das partículas na horizontal.
 * @default -1
 *
 * @arg parSY
 * @text Y-Axis Speed
 * @desc Definição da velocidade das partículas na vertical.
 * @default -2
 *
 * @help
 * =============================================================================
 * ♦♦♦ MOG - Menu Cursor ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Adiciona um cursor animado no menu de comando.
 *
 * =============================================================================
 * ■ IMAGENS
 * =============================================================================
 * Crie uma pasta com o nome de:
 *
 * /img/menus/
 *
 * E grave as imagens do seu cursor nesta pasta.
 * 
 * =============================================================================
 * ■ ANIMATED CURSOR
 * =============================================================================
 * Para animar o cursor nomeie o cursor da imagem da seguinte forma.
 *
 * FILE_NAME(X).png
 *
 * X - Numero de frames.
 *
 *
 * Cursor(5).png
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) コマンドメニューにアニメーションカーソルを追加します。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_MenuCursor.js
 *
 * @param -> GENERAL
 * @text -> 全般
 * @desc
 *
 * @param FileName
 * @parent -> GENERAL
 * @text ファイル名
 * @desc 画像ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default Cursor_A
 *
 * @param X-Axis Offset
 * @parent -> GENERAL
 * @text X軸オフセット
 * @desc カーソルX軸の指定
 * @default 15
 *
 * @param Y-Axis Offset
 * @parent -> GENERAL
 * @text Y軸オフセット
 * @desc カーソルY軸の指定
 * @default 0
 *
 * @param Show Selection
 * @parent -> GENERAL
 * @text 選択を表示
 * @desc デフォルトのカーソル選択を表示
 * @type boolean
 * @default true
 *
 * @param Show Selection All
 * @parent -> GENERAL
 * @text 選択範囲をすべて表示
 * @desc デフォルトのカーソル選択を表示
 * @type boolean
 * @default true
 *
 * @param Move Animation
 * @parent -> GENERAL
 * @text スライドアニメーション
 * @desc スライドアニメーションを有効化
 * @type boolean
 * @default true
 *
 * @param Move Speed %
 * @parent -> GENERAL
 * @text スライド速度％
 * @desc カーソル速度の指定 （30％-> 1000％）
 * @type number
 * @min 30
 * @max 1000
 * @default 100
 *
 * @param Align
 * @parent -> GENERAL
 * @desc カーソルの配置を設定します。
 * @text 整列
 * @type select
 * @default Left
 * @option 左
 * @value Left
 * @option 中央
 * @value Center
 * @option 右
 * @value Right
 *
 * @param Animation Speed %
 * @parent -> GENERAL
 * @text アニメーション（速度％）
 * @desc アニメーションカーソル速度設定。 （30％-> 500％）
 * @type number
 * @min 30
 * @max 500
 * @default 100
 *
 * @param -----------------------
 * @desc
 *
 * @param -> WAVE ANIMATION
 * @text -> 波アニメ
 * @desc
 *
 * @param Wave Horizontal
 * @parent -> WAVE ANIMATION
 * @text 水平波
 * @desc 水平方向のアニメーションを有効化
 * @type boolean
 * @default true
 *
 * @param Wave Vertical
 * @parent -> WAVE ANIMATION
 * @text 垂直波
 * @desc 垂直アニメーションを有効化
 * @type boolean
 * @default false
 *
 * @param Wave Range
 * @parent -> WAVE ANIMATION
 * @text 範囲
 * @desc アニメーション空間の指定 （5-> 50）
 * @type number
 * @min 5
 * @max 50
 * @default 15
 *
 * @param Wave Speed %
 * @parent -> WAVE ANIMATION
 * @text 速度％
 * @desc アニメーション速度の指定 （30％-> 400％）
 * @type number
 * @min 30
 * @max 400
 * @default 100
 *
 * @param ------------------------
 * @desc
 *
 * @param -> ROTATION ANIMATION
 * @text -> 回転アニメ
 * @desc
 *
 * @param Rotation Animation
 * @parent -> ROTATION ANIMATION
 * @text 回転アニメーション
 * @desc 回転アニメーションを有効化
 * @type boolean
 * @default false
 *
 * @param Rotation Speed %
 * @parent -> ROTATION ANIMATION
 * @text 速度％
 * @desc 回転速度の指定 （30％-> 1000％）
 * @type number
 * @min 30
 * @max 1000
 * @default 100
 *
 * @param -------------------------
 * @desc
 *
 * @param -> PARTICLES
 * @text -> パーティクル
 * @desc
 *
 * @param Particles
 * @parent -> PARTICLES
 * @text パーティクルエフェクト
 * @desc カーソル上でパーティクルを有効化
 * @type boolean
 * @default true
 *
 * @param Par File Name
 * @parent -> PARTICLES
 * @text ファイル名
 * @desc 画像ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default Cursor_Par01
 *
 * @param Par Number of Particles
 * @parent -> PARTICLES
 * @text 粒子数
 * @desc 粒子の量の指定 （5-> 300）
 * @type number
 * @min 5
 * @max 300
 * @default 30
 *
 * @param Par X-Axis Offset
 * @parent -> PARTICLES
 * @text X軸オフセット
 * @desc 粒子のX軸オフセットの指定
 * @default 0
 *
 * @param Par Y-Axis Offset
 * @parent -> PARTICLES
 * @text Y軸オフセット
 * @desc 粒子のX軸オフセットの指定
 * @default 0
 *
 * @param Par SX-Axis
 * @parent -> PARTICLES
 * @text X軸速度
 * @desc 水平方向の粒子速度の指定
 * @default -1
 *
 * @param Par SY-Axis
 * @parent -> PARTICLES
 * @text Y軸速度
 * @desc 垂直粒子速度の指定
 * @default -2
 *
 * @command MenuCursorGeneral
 * @desc コマンドカーソルの指定
 * @text 全般的
 *
 * @arg fileName
 * @text ファイル名
 * @desc 画像ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default Cursor_A
 *
 * @arg x
 * @text X軸オフセット
 * @desc カーソルのX軸の指定
 * @default 15
 *
 * @arg y
 * @text Y軸オフセット
 * @desc カーソルのY軸の指定
 * @default 0
 *
 * @arg slide
 * @text スライドアニメーション
 * @desc スライドアニメーションを有効化
 * @type boolean
 * @default true
 *
 * @arg moveSpeed
 * @text スライド速度％
 * @desc カーソル速度の指定 （30％-> 1000％）
 * @type number
 * @min 30
 * @max 1000
 * @default 100
 *
 * @arg align
 * @desc カーソルの配置を設定
 * @text 整列
 * @type select
 * @default Left
 * @option 左
 * @value Left
 * @option 中央
 * @value Center
 * @option 右
 * @value Right
 *
 * @arg animeSpeed
 * @text アニメーション速度（％）
 * @desc アニメーションカーソル速度設定。 （30％-> 500％）
 * @type number
 * @min 30
 * @max 500
 * @default 100
 *
 * @command MenuCursorWave
 * @desc 波の効果を設定します。
 * @text 波の効果
 *
 * @arg horzWave
 * @text 水平モード
 * @desc 水平方向のアニメーションを有効化
 * @type boolean
 * @default true
 *
 * @arg vertWave
 * @text 垂直モード
 * @desc 垂直アニメーションを有効化
 * @type boolean
 * @default false
 *
 * @arg waveRange
 * @text 範囲
 * @desc アニメーション空間の指定 （5-> 50）
 * @type number
 * @min 5
 * @max 50
 * @default 15
 *
 * @arg waveSpeed
 * @text 速度％
 * @desc アニメーション速度の指定 （30％-> 400％）
 * @type number
 * @min 30
 * @max 400
 * @default 100
 *
 * @command MenuCursorRotation
 * @desc 回転効果の指定
 * @text 回転効果
 *
 * @arg rotation
 * @text 回転アニメーション
 * @desc 回転アニメーションを有効化
 * @type boolean
 * @default false
 *
 * @arg rotationSpeed
 * @text 速度％
 * @desc 回転速度の指定 （30％-> 1000％）
 * @type number
 * @min 30
 * @max 1000
 * @default 100
 *
 * @command MenuCursorParticles
 * @desc 粒子構成
 * @text パーティクルエフェクト
 *
 * @arg parEnable
 * @text パーティクルエフェクト
 * @desc カーソル上でパーティクルを有効化
 * @type boolean
 * @default true
 *
 * @arg parFileName
 * @text ファイル名
 * @desc 画像ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default Particles
 *
 * @arg parPower
 * @text 粒子数
 * @desc 粒子の量の指定 （10-> 300）
 * @type number
 * @min 5
 * @max 300
 * @default 30
 *
 * @arg parX_Offset
 * @text X軸オフセット
 * @desc 粒子のX軸オフセットの指定
 * @default 0
 *
 * @arg parY_Offset
 * @text Y軸オフセット
 * @desc 粒子のX軸オフセットの指定
 * @default 0
 *
 * @arg parSX
 * @text X軸速度
 * @desc 水平方向の粒子速度の指定
 * @default -1
 *
 * @arg parSY
 * @text Y軸速度
 * @desc 垂直方向の粒子速度の指定
 * @default -2
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ============================================================================
 * ♦♦♦ MOG - Menu Cursor ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2020/10/18
 * https://mogplugins.wordpress.com
 * ============================================================================
 * コマンドメニューにアニメーションカーソルを追加します。
 *
 * ============================================================================
 * ■ カーソル画像
 * ============================================================================
 * 以下のフォルダにカーソル画像を保存してください。
 *
 * /img/menus/
 *
 * ============================================================================
 * ■ アニメーションカーソル
 * ============================================================================
 * アニメーション化するには、カーソル画像のファイル名を下記のようにします。
 * ※原文とファイル名の指定が異なりますが、下記でなければ動作しません。
 *
 * FILE_NAME(Fx).png
 *
 * x - フレーム数
 *
 *
 * Cursor(F5).png
 *
 * ============================================================================
 * ■ プラグインコマンド
 * ============================================================================
 * カーソル動作を変更するプラグインコマンドがあります。
 * 
 */

(() => {

	//=============================================================================
	// ** PLUGIN PARAMETERS
	//=============================================================================
	var Imported = Imported || {};
	Imported.MOG_MenuCursor = true;
	var Moghunter = Moghunter || {};

	Moghunter.parameters = PluginManager.parameters('MOG_MenuCursor');
	Moghunter.menuCursor_fileName = String(Moghunter.parameters['FileName'] || "Cursor");
	Moghunter.menuCursor_x = Number(Moghunter.parameters['X-Axis Offset'] || 15);
	Moghunter.menuCursor_y = Number(Moghunter.parameters['Y-Axis Offset'] || 0);
	Moghunter.menuCursor_showRect = String(Moghunter.parameters['Show Selection'] || true);
	Moghunter.menuCursor_showRectAll = String(Moghunter.parameters['Show Selection All'] || true);
	Moghunter.menuCursor_slide = String(Moghunter.parameters['Move Animation'] || true);
	Moghunter.menuCursor_speed = Number(Moghunter.parameters['Move Speed %'] || 100);
	Moghunter.menuCursor_align = String(Moghunter.parameters['Align'] || "Left");
	Moghunter.menuCursor_waveX = String(Moghunter.parameters['Wave Horizontal'] || true);
	Moghunter.menuCursor_waveY = String(Moghunter.parameters['Wave Vertical'] || false);
	Moghunter.menuCursor_waveR = Number(Moghunter.parameters['Wave Range'] || 15);
	Moghunter.menuCursor_waveS = Number(Moghunter.parameters['Wave Speed %'] || 100);
	Moghunter.menuCursor_animationSpeed = Number(Moghunter.parameters['Animation Speed %'] || 100);
	Moghunter.menuCursor_rotated = String(Moghunter.parameters['Rotation Animation'] || true);
	Moghunter.menuCursor_rotationSpeed = Number(Moghunter.parameters['Rotation Speed %'] || 100);
	Moghunter.menuCursor_parEnable = String(Moghunter.parameters['Particles'] || true);
	Moghunter.menuCursor_parFileName = String(Moghunter.parameters['Par File Name'] || "Particles");
	Moghunter.menuCursor_parPower = Number(Moghunter.parameters['Par Number of Particles'] || 30);
	Moghunter.menuCursor_parX = Number(Moghunter.parameters['Par X-Axis Offset'] || 0);
	Moghunter.menuCursor_parY = Number(Moghunter.parameters['Par Y-Axis Offset'] || 0);
	Moghunter.menuCursor_parSX = Number(Moghunter.parameters['Par SX-Axis'] || -1);
	Moghunter.menuCursor_parSY = Number(Moghunter.parameters['Par SY-Axis'] || -2);

	//=============================================================================
	// ■■■  PluginManager ■■■ 
	//=============================================================================

	//==============================
	// * General Command
	//==============================
	PluginManager.registerCommand('MOG_MenuCursor', "MenuCursorGeneral", data => {
		const fileName = String(data.fileName);
		const x = Number(data.x);
		const y = Number(data.y);
		const slide = String(data.slide) == "true" ? true : false;
		const align = $gameSystem.getCursorMenuAlign(String(data.align));
		const moveSpeed = Number(data.moveSpeed);
		const animeSpeed = Number(data.animeSpeed);
		const frames = fileName.match(/(F(\d+\.*\d*))/i)
		$gameSystem._menuCursorData.x = x;
		$gameSystem._menuCursorData.y = y;
		$gameSystem._menuCursorData.fileName = fileName;
		$gameSystem._menuCursorData.slide = slide;
		$gameSystem._menuCursorData.speed = (Math.min(Math.max(moveSpeed, 30), 1000));
		$gameSystem._menuCursorData.animated = frames && frames[2] > 1 ? true : false;
		$gameSystem._menuCursorData.align = Number(align);
		$gameSystem._menuCursorData.maxFrames = !$gameSystem._menuCursorData.animated ? 1 : frames[2];
		$gameSystem._menuCursorData.animationSpeed = (Math.min(Math.max(animeSpeed, 30), 500));
		$gameTemp._menuCursor.needRefresh = true;
	});

	//==============================
	// * Wave Command
	//==============================
	PluginManager.registerCommand('MOG_MenuCursor', "MenuCursorWave", data => {
		const horzWave = String(data.horzWave) == "true" ? true : false;
		const vertWave = String(data.vertWave) == "true" ? true : false;
		const waveRange = Number(data.waveRange);
		const waveSpeed = Number(data.waveSpeed);
		$gameSystem._menuCursorData.waveX = horzWave;
		$gameSystem._menuCursorData.waveY = vertWave;
		$gameSystem._menuCursorData.waveR = (Math.min(Math.max(waveRange, 5), 50));;
		$gameSystem._menuCursorData.waveS = (Math.min(Math.max(waveSpeed, 30), 400));
		$gameTemp._menuCursor.needRefresh = true;
	});

	//==============================
	// * Particles Command
	//==============================
	PluginManager.registerCommand('MOG_MenuCursor', "MenuCursorParticles", data => {
		const parEnable = String(data.parEnable) == "true" ? true : false;
		const parFileName = String(data.parFileName);
		const parPower = Number(data.parPower);
		const parX_Offset = Number(data.parX_Offset);
		const parY_Offset = Number(data.parY_Offset);
		const parSX = Number(data.parSX);
		const parSY = Number(data.parSY);
		$gameSystem._menuCursorData.particles.enabled = parEnable;
		$gameSystem._menuCursorData.particles.fileName = parFileName;
		$gameSystem._menuCursorData.particles.power = (Math.min(Math.max(parPower, 5), 300));
		$gameSystem._menuCursorData.particles.x = parX_Offset;
		$gameSystem._menuCursorData.particles.y = parY_Offset;
		$gameSystem._menuCursorData.particles.sx = parSX;
		$gameSystem._menuCursorData.particles.sy = parSY;
		$gameTemp._menuCursor.needRefresh2 = true;
	});

	//==============================
	// * Rotation Command
	//==============================
	PluginManager.registerCommand('MOG_MenuCursor', "MenuCursorRotation", data => {
		const rotation = String(data.rotation) == "true" ? true : false;
		const rotationSpeed = Number(data.rotationSpeed);
		$gameSystem._menuCursorData.rotated = String(rotation) == "true" ? true : false;
		$gameSystem._menuCursorData.rotationSpeed = (Math.min(Math.max(rotationSpeed, 30), 1000));
		$gameTemp._menuCursor.needRefresh = true;
	});

	//=============================================================================
	// ■■■ ImageManager ■■■
	//=============================================================================

	//==============================
	// * Menus
	//==============================
	ImageManager.loadMenus = function (filename) {
		return this.loadBitmap('img/menus/', filename);
	};

	//=============================================================================
	// ■■■ Game_System ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  Initialize
	//==============================
	const _mog_MenuCursor_gSystem_initialize = Game_System.prototype.initialize;
	Game_System.prototype.initialize = function () {
		_mog_MenuCursor_gSystem_initialize.call(this);
		this.setMenuCursorData();
	};

	//==============================
	// * get Cursor Menu Align
	//==============================
	Game_System.prototype.getCursorMenuAlign = function (align) {
		if (align == "Center") {
			return 1;
		} else if (align == "Right") {
			return 2;
		};
		return 0;
	};

	//==============================
	// * set Menu Cursor Data
	//==============================
	Game_System.prototype.setMenuCursorData = function () {
		this._menuCursorData = {};
		this._menuCursorData.x = Moghunter.menuCursor_x;
		this._menuCursorData.y = Moghunter.menuCursor_y;
		this._menuCursorData.visible = true;
		this._menuCursorData.fileName = String(Moghunter.menuCursor_fileName);
		this._menuCursorData.slide = String(Moghunter.menuCursor_slide) == "true" ? true : false;
		this._menuCursorData.align = this.getCursorMenuAlign(String(Moghunter.menuCursor_align));
		const frames = this._menuCursorData.fileName.match(/(F(\d+\.*\d*))/i);
		this._menuCursorData.speed = (Math.min(Math.max(Moghunter.menuCursor_speed, 30), 1000));
		this._menuCursorData.waveX = String(Moghunter.menuCursor_waveX) == "true" ? true : false;
		this._menuCursorData.waveY = String(Moghunter.menuCursor_waveY) == "true" ? true : false;
		this._menuCursorData.waveR = (Math.min(Math.max(Moghunter.menuCursor_waveR, 5), 50));
		this._menuCursorData.waveS = (Math.min(Math.max(Moghunter.menuCursor_waveS, 30), 400));
		this._menuCursorData.animated = frames && frames[2] > 1 ? true : false;
		this._menuCursorData.maxFrames = !this._menuCursorData.animated ? 1 : frames[2];
		this._menuCursorData.animationSpeed = (Math.min(Math.max(Moghunter.menuCursor_animationSpeed, 30), 500));
		this._menuCursorData.rotated = String(Moghunter.menuCursor_rotated) == "true" ? true : false;
		this._menuCursorData.rotationSpeed = (Math.min(Math.max(Moghunter.menuCursor_rotationSpeed, 30), 1000));
		this._menuCursorData.showRect = String(Moghunter.menuCursor_showRect) == "true" ? true : false;
		this._menuCursorData.showRectAll = String(Moghunter.menuCursor_showRectAll) == "true" ? true : false;
		this._menuCursorData.particles = {};
		this._menuCursorData.particles.enabled = String(Moghunter.menuCursor_parEnable) == "true" ? true : false;
		this._menuCursorData.particles.fileName = String(Moghunter.menuCursor_parFileName)
		this._menuCursorData.particles.power = (Math.min(Math.max(Moghunter.menuCursor_parPower, 5), 300));
		this._menuCursorData.particles.x = Moghunter.menuCursor_parX;
		this._menuCursorData.particles.y = Moghunter.menuCursor_parY;
		this._menuCursorData.particles.sx = Moghunter.menuCursor_parSX;
		this._menuCursorData.particles.sy = Moghunter.menuCursor_parSY;
	};

	//=============================================================================
	// ■■■ Game_Temp ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  Initialize
	//==============================
	const _mog_MenuCursor_gTemp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function () {
		_mog_MenuCursor_gTemp_initialize.call(this);
		this.setupCursorMenuInitial();
	};

	//==============================
	// * menu Cursor C
	//==============================
	Game_Temp.prototype.setupCursorMenuInitial = function () {
		this._menuCursor = {};
		this.menuCursorClear();
		this._menuCursor.x2 = this._menuCursor.x;
		this._menuCursor.y2 = this._menuCursor.y;
		this._menuCursor.w = 0;
		this._menuCursor.h = 0;
		this._menuCursor.visible = false;
		this._menuCursor.visible2 = false;
		this._menuCursor.opacity = 0;
		this._menuCursor.needRefresh = false;
		this._menuCursor.needRefresh2 = false;
	};

	//==============================
	// * menu Cursor Clear
	//==============================
	Game_Temp.prototype.menuCursorClear = function () {
		this._menuCursor.x = -100;
		this._menuCursor.y = -100;
	};

	//=============================================================================
	// ■■■ Scene Base ■■■
	//=============================================================================

	//==============================
	// * create Sprite Field
	//==============================
	Scene_Base.prototype.createSpriteField3 = function () {
		this._spriteField3 = new Sprite();
		this._spriteField3.z = 100;
		this.addChild(this._spriteField3);
	};

	//==============================
	// * sort Sprite Field
	//==============================
	Scene_Base.prototype.sortSpriteField = function () {
		if (this._spriteField1) { this._spriteField1.children.sort((a, b) => a.z - b.z) };
		if (this._spriteField2) { this._spriteField2.children.sort((a, b) => a.z - b.z) };
		if (this._spriteField3) { this._spriteField3.children.sort((a, b) => a.z - b.z) };
	};

	//==============================
	// * create Menu Cursor
	//==============================
	Scene_Base.prototype.createMenuCursor = function () {
		$gameTemp.setupCursorMenuInitial();
		this._spriteCursor = new SpriteMenuCursor();
		this._spriteCursor.z = 501;
		this._spriteField3.addChild(this._spriteCursor);
		this.sortSpriteField();
	};

	//==============================
	// * create Menu Cursor
	//==============================
	Scene_Base.prototype.createMenuCursorParticles = function () {
		this._spriteCursorParticles = new SpriteMenuCursorParticles();
		this._spriteCursorParticles.z = 500;
		this._spriteField3.addChild(this._spriteCursorParticles);
		this.sortSpriteField();
	};

	//==============================
	// ♦ ALIAS ♦  Update
	//==============================
	const _mog_menuCursor_scnBase_update = Scene_Base.prototype.update;
	Scene_Base.prototype.update = function () {
		_mog_menuCursor_scnBase_update.call(this);
		if (!this._spriteField3) { this.createSpriteField3() };
		if ($gameSystem._menuCursorData.particles.enabled && !this._spriteCursorParticles) { this.createMenuCursorParticles() };
		if (!this._spriteCursor) { this.createMenuCursor(); };
	};

	//==============================
	// ♦ ALIAS ♦  Update Children
	//==============================
	const _mog_menuCursor_scnBase_updateChildren = Scene_Base.prototype.updateChildren;
	Scene_Base.prototype.updateChildren = function () {
		$gameTemp.menuCursorClear();
		_mog_menuCursor_scnBase_updateChildren.call(this);
	};

	//=============================================================================
	// ■■■ Window Selecable ■■■
	//=============================================================================

	//==============================
	// ♦ ALIAS ♦  Initialize
	//==============================
	const _mog_MenuCursor_Window_Selectable_update = Window_Selectable.prototype.update;
	Window_Selectable.prototype.update = function () {
		_mog_MenuCursor_Window_Selectable_update.call(this);
		if (this.isMenuCursorVisible()) { this.setMenuCursorData() };
	};

	//==============================
	// * is Menu Cursor Visible
	//==============================
	Window_Selectable.prototype.isMenuCursorVisible = function () {
		if (!this.isOpenAndActive()) { return false };
		if (this._index < 0) { return false };
		return true;
	};

	//==============================
	// * set Menu Cursor Data
	//==============================
	Window_Selectable.prototype.setMenuCursorData = function () {
		const rect = this.itemRect(this.index());
		$gameTemp._menuCursor.rectX = rect.x;
		$gameTemp._menuCursor.rectX = rect.y;
		if ($gameSystem._menuCursorData.align == 1) {
			var x = !this._cursorAll ? rect.x + (rect.width / 2) : this.width / 2;
			var y = rect.y;
		} else if ($gameSystem._menuCursorData.align == 2) {
			var x = rect.x + rect.width;
			var y = !this._cursorAll ? rect.y + (rect.height / 2) : this.height / 2;
		} else {
			var x = rect.x;
			var y = !this._cursorAll ? rect.y + (rect.height / 2) : this.height / 2;
		};
		if (rect.x >= 0 && rect.y >= 0) {
			$gameTemp._menuCursor.x = x + this.x - this.origin.x;
			$gameTemp._menuCursor.y = y + this.y - this.origin.y;
		};
		$gameTemp._menuCursor.visible2 = this.checkCursorVis(rect);
	};

	//==============================
	// * checkCursorVis
	//==============================
	Window_Selectable.prototype.checkCursorVis = function (rect) {
		if ($gameTemp._menuCursor.x < this.x) { return false };
		if ($gameTemp._menuCursor.y < this.y) { return false };
		if ($gameTemp._menuCursor.x > Graphics.width) { return false };
		if ($gameTemp._menuCursor.y > Graphics.height) { return false };
		if (rect.width <= 0) { return false };
		if (rect.height <= 0) { return false };
		return true;
	};

	//==============================
	// ♦ ALIAS ♦  Refresh Cursor
	//==============================
	const _mog_menuCursor_winSel_refreshCursor = Window_Selectable.prototype.refreshCursor;
	Window_Selectable.prototype.refreshCursor = function () {
		_mog_menuCursor_winSel_refreshCursor.call(this);
		if (this._cursorAll) {
			if (!$gameSystem._menuCursorData.showRectAll) { this.setCursorRect(0, 0, 0, 0) };
		} else if (this.index() >= 0) {
			if (!$gameSystem._menuCursorData.showRect) { this.setCursorRect(0, 0, 0, 0) };
		};
	};

	//=============================================================================
	// ■■■ SpriteMenuCursorParticles ■■■
	//=============================================================================
	function SpriteMenuCursorParticles() {
		this.initialize.apply(this, arguments);
	};

	SpriteMenuCursorParticles.prototype = Object.create(Sprite.prototype);
	SpriteMenuCursorParticles.prototype.constructor = SpriteMenuCursorParticles;

	//==============================
	// ♦♦ Initialize
	//==============================
	SpriteMenuCursorParticles.prototype.initialize = function () {
		Sprite.prototype.initialize.call(this);
		this.createParticles();
	};

	//==============================
	// * File Name
	//==============================
	SpriteMenuCursorParticles.prototype.fileName = function () {
		return String($gameSystem._menuCursorData.particles.fileName);
	};

	//==============================
	// * Particles Max
	//==============================
	SpriteMenuCursorParticles.prototype.particlesMax = function () {
		return $gameSystem._menuCursorData.particles.power;
	};

	//==============================
	// * SX
	//==============================
	SpriteMenuCursorParticles.prototype.sx = function () {
		return $gameSystem._menuCursorData.particles.sx;
	};

	//==============================
	// * SY
	//==============================
	SpriteMenuCursorParticles.prototype.sy = function () {
		return $gameSystem._menuCursorData.particles.sy;
	};

	//==============================
	// * Remove Particles
	//==============================
	SpriteMenuCursorParticles.prototype.removeParticles = function () {
		for (var i = 0; i < this._particles.length; i++) {
			this.removeChild(this._particles[i]);
		};
	};

	//==============================
	// * create Particles
	//==============================
	SpriteMenuCursorParticles.prototype.createParticles = function () {
		if (this._particles) { this.removeParticles() };
		this._particles = [];
		const img = ImageManager.loadMenus(this.fileName())
		for (var i = 0; i < this.particlesMax(); i++) {
			this._particles[i] = new Sprite(img);
			this._particles[i].z = i;
			this._particles[i].blendType = 1;
			this._particles[i].anchor.x = 0.5;
			this._particles[i].anchor.y = 0.5;
			this._particles[i].sx = [0, this.sx()];
			this._particles[i].sy = [0, this.sy()];
			this._particles[i].rt = [0, Number(0)];
			this._particles[i].int = true;
			this._particles[i].duration = 60;
			this.addChild(this._particles[i]);
			this.refreshParticles(this._particles[i]);
		};
	};

	//==============================
	// * refresh Particles
	//==============================
	SpriteMenuCursorParticles.prototype.refreshParticles = function (sprite) {
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
		sprite.opacity = 0;
		sprite.duration = 5 + Math.randomInt(20);
		sprite.visible = true
		this.setPosition(sprite);
		if (sprite.int) { this.setInitial(sprite) };
	};

	//==============================
	// * set Position
	//==============================
	SpriteMenuCursorParticles.prototype.setInitial = function (sprite) {
		sprite.int = false;
		sprite.visible = false
		sprite.opacity = 30 + Math.randomInt(170);
		sprite.duration = 0;
	};

	//==============================
	// * set Position
	//==============================
	SpriteMenuCursorParticles.prototype.setPosition = function (sprite) {
		const x = $gameTemp._menuCursor.x2 + $gameSystem._menuCursorData.particles.x;
		const y = $gameTemp._menuCursor.y2 + $gameSystem._menuCursorData.particles.y;
		const w = $gameTemp._menuCursor.w;
		const h = $gameTemp._menuCursor.h;
		sprite.x = x - (w / 2) + Math.randomInt(w);
		sprite.y = y - (h / 2) + Math.randomInt(h);
	};

	//==============================
	// * Need Refresh
	//==============================
	SpriteMenuCursorParticles.prototype.needRefresh = function (sprite) {
		if (sprite.duration > 0) { return false };
		if (sprite.opacity > 0) { return false };
		return true;
	};

	//==============================
	// * update Move
	//==============================
	SpriteMenuCursorParticles.prototype.updateMove = function (sprite) {
		sprite.x += sprite.sx[0];
		sprite.y += sprite.sy[0];
		sprite.rotation += sprite.rt[0];
		if (sprite.duration > 0) {
			sprite.opacity += 15;
			sprite.duration--;
		} else {
			sprite.opacity -= 15;
		};
	};

	//==============================
	// * update Particles
	//==============================
	SpriteMenuCursorParticles.prototype.updateParticles = function () {
		for (var i = 0; i < this._particles.length; i++) {
			this.updateMove(this._particles[i]);
			if (this.needRefresh(this._particles[i])) { this.refreshParticles(this._particles[i]) };
		};
	};

	//==============================
	// * is Visible
	//==============================
	SpriteMenuCursorParticles.prototype.isVisible = function () {
		if (!$gameSystem._menuCursorData.particles.enabled) { return false };
		return $gameTemp._menuCursor.visible;
	};

	//==============================
	// * update Other
	//==============================
	SpriteMenuCursorParticles.prototype.updateOther = function () {
		this.visible = this.isVisible();
		this.opacity = $gameTemp._menuCursor.opacity;
	};

	//==============================
	// * refreshBase
	//==============================
	SpriteMenuCursorParticles.prototype.refreshBase = function () {
		$gameTemp._menuCursor.needRefresh2 = false;
		this.createParticles();
	};

	//==============================
	// * needRefreshBase
	//==============================
	SpriteMenuCursorParticles.prototype.needRefreshBase = function () {
		return $gameTemp._menuCursor.needRefresh2;
	};

	//==============================
	// ♦♦ Update
	//==============================
	SpriteMenuCursorParticles.prototype.update = function () {
		Sprite.prototype.update.call(this);
		if (this.needRefreshBase()) { this.refreshBase() };
		this.updateParticles();
		this.updateOther();
	};

	//=============================================================================
	// ■■■ SpriteMenuCursor ■■■
	//=============================================================================
	function SpriteMenuCursor() {
		this.initialize.apply(this, arguments);
	};

	SpriteMenuCursor.prototype = Object.create(Sprite.prototype);
	SpriteMenuCursor.prototype.constructor = SpriteMenuCursor;

	//==============================
	// ♦♦ Initialize
	//==============================
	SpriteMenuCursor.prototype.initialize = function () {
		Sprite.prototype.initialize.call(this);
		this._waitData = true;
		this._cw = this.width;
		this._ch = this.height;
		this._ax = this.align() == 2 ? this._cw : 0;
		this._xOffset = this.align() == 2 ? -$gameSystem._menuCursorData.x : $gameSystem._menuCursorData.x;
		this._yOffset = $gameSystem._menuCursorData.y
		this.opacity = 0;
		this._screenX = ((Graphics.width - Graphics.boxWidth) / 2);
		this._screenY = ((Graphics.height - Graphics.boxHeight) / 2);
		this.setWaveData();
		this.setAnimationData();
		this.setRotationData();
		this.createCursor();
	};

	//==============================
	// * set wave Data
	//==============================
	SpriteMenuCursor.prototype.setWaveData = function () {
		this._wave = {};
		this._wave.horz = $gameSystem._menuCursorData.waveX;
		this._wave.vert = $gameSystem._menuCursorData.waveY;
		this._wave.x = 0;
		this._wave.y = 0;
		this._wave.t = 0;
		this._wave.mx = $gameSystem._menuCursorData.waveR;
		this._wave.speed1 = $gameSystem._menuCursorData.waveS / 100;
		this._wave.speed2 = 0;
		this._wave.speed3 = 3;
		this._wave.phase = 0;
	};

	//==============================
	// * set Animation Data
	//==============================
	SpriteMenuCursor.prototype.setAnimationData = function () {
		this._anime = {};
		this._anime.frameIndex = 0;
		this._anime.maxFrame = $gameSystem._menuCursorData.maxFrames;
		this._anime.speed1 = $gameSystem._menuCursorData.animationSpeed / 100;
		this._anime.speed2 = 0;
		this._anime.speed3 = 5;
	};

	//==============================
	// * set Rotation Data
	//==============================
	SpriteMenuCursor.prototype.setRotationData = function () {
		this._rotation = {};
		const speed = 0.02 * $gameSystem._menuCursorData.rotationSpeed / 100;
		this._rotation.speed = speed;
	};

	//==============================
	// * update Rotation
	//==============================
	SpriteMenuCursor.prototype.updateRotation = function () {
		this._spriteCursor.rotation += this._rotation.speed;
	};

	//==============================
	// * refresh Frame
	//==============================
	SpriteMenuCursor.prototype.refreshFrame = function () {
		this._anime.frameIndex++;
		if (this._anime.frameIndex >= this._anime.maxFrame) { this._anime.frameIndex = 0 };
		const cw = this._cw * this._anime.frameIndex;
		this._spriteCursor.setFrame(cw, 0, this._cw, this._ch)
	};

	//==============================
	// * update Animated
	//==============================
	SpriteMenuCursor.prototype.updateAnimated = function () {
		this._anime.speed2 += this._anime.speed1;
		if (this._anime.speed2 > this._anime.speed3) {
			this._anime.speed2 = 0;
			this.refreshFrame();
		};
	};

	//==============================
	// * Get Data
	//==============================
	SpriteMenuCursor.prototype.getData = function () {
		this._waitData = false;
		this._cw = this._spriteCursor.bitmap.width / this.maxFrames();
		this._ch = this._spriteCursor.bitmap.height;
		this._ax = this.align() == 2 ? this._cw : 0;
		this._xOffset = this.align() == 2 ? -$gameSystem._menuCursorData.x : $gameSystem._menuCursorData.x;
		this._yOffset = $gameSystem._menuCursorData.y
		if (this.isAnimated()) {
			this.refreshFrame();
		} else {
			this._spriteCursor.setFrame(0, 0, this._cw, this._ch);
		};
	};

	//==============================
	// * create Cursor
	//==============================
	SpriteMenuCursor.prototype.cursorName = function () {
		return String($gameSystem._menuCursorData.fileName)
	};

	//==============================
	// * move Speed
	//==============================
	SpriteMenuCursor.prototype.moveSpeed = function () {
		return $gameSystem._menuCursorData.speed;
	};

	//==============================
	// * is Animated
	//==============================
	SpriteMenuCursor.prototype.isAnimated = function () {
		return $gameSystem._menuCursorData.animated;
	};

	//==============================
	// * is Slide
	//==============================
	SpriteMenuCursor.prototype.isSlide = function () {
		return $gameSystem._menuCursorData.slide;
	};

	//==============================
	// * is Rotated
	//==============================
	SpriteMenuCursor.prototype.isRotated = function () {
		return $gameSystem._menuCursorData.rotated;
	};

	//==============================
	// * Align
	//==============================
	SpriteMenuCursor.prototype.align = function () {
		return $gameSystem._menuCursorData.align;
	};

	//==============================
	// * create Cursor
	//==============================
	SpriteMenuCursor.prototype.createCursor = function () {
		this._spriteCursor = new Sprite();
		this.refreshCursorBitmap();
		this._spriteCursor.z = 500;
		this.addChild(this._spriteCursor);
	};

	//==============================
	// * refresh Cursor Bitmap
	//==============================
	SpriteMenuCursor.prototype.refreshCursorBitmap = function () {
		this._spriteCursor.bitmap = ImageManager.loadMenus(this.cursorName());
		this._spriteCursor.anchor.x = 0.5;
		this._spriteCursor.anchor.y = 0.5;
	};

	//==============================
	// * move Menu Cursor
	//==============================
	SpriteMenuCursor.prototype.moveMenuCursor = function (value, real_value) {
		if (value == real_value) { return value };
		var dnspeed = (5 + (Math.abs(value - real_value) / 10)) * this.moveSpeed() / 100;
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
	// * needSlideCursor
	//==============================
	SpriteMenuCursor.prototype.needSlideCursor = function () {
		if ($gameTemp._menuCursor.x > 0) { return true };
		if ($gameTemp._menuCursor.y > 0) { return true };
		return false;
	};

	//==============================
	// * maxFrames
	//==============================
	SpriteMenuCursor.prototype.maxFrames = function () {
		return this._anime.maxFrame;
	};

	//==============================
	// * cwidth
	//==============================
	SpriteMenuCursor.prototype.cwidth = function () {
		return (this._spriteCursor.bitmap.width / this.maxFrames()) / 4;
	};

	//==============================
	// * cheight
	//==============================
	SpriteMenuCursor.prototype.cheight = function () {
		return this._spriteCursor.bitmap.height / 4;
	};

	//==============================
	// * pos X
	//==============================
	SpriteMenuCursor.prototype.posX = function () {
		return $gameTemp._menuCursor.x + this._xOffset + this._screenX + this._wave.x - this.cwidth() + this._ax;
	};
	//==============================
	// * pos Y
	//==============================
	SpriteMenuCursor.prototype.posY = function () {
		return $gameTemp._menuCursor.y + this._yOffset + this._screenY + this._wave.y + this.cheight();;
	};

	//==============================
	// * update Position
	//==============================
	SpriteMenuCursor.prototype.updatePosition = function () {
		if (this.isSlide()) {
			this._spriteCursor.x = this.moveMenuCursor(this._spriteCursor.x, this.posX());
			this._spriteCursor.y = this.moveMenuCursor(this._spriteCursor.y, this.posY());
		} else {
			this._spriteCursor.x = this.posX();
			this._spriteCursor.y = this.posY();
		};
	};

	//==============================
	// * update wave
	//==============================
	SpriteMenuCursor.prototype.updateWave = function () {
		this._wave.speed2 += this._wave.speed1;
		if (this._wave.speed2 > this._wave.speed3) {
			this._wave.speed2 = 0;
			if (this._wave.phase == 0) {
				this._wave.t++;
				if (this._wave.t > this._wave.mx) {
					this._wave.t = this._wave.mx;
					this._wave.phase = 1;
				};
			} else {
				this._wave.t--;
				if (this._wave.t <= 0) {
					this._wave.t = 0;
					this._wave.phase = 0;
				};
			};
		};
		if (this._wave.horz) { this._wave.x = this._wave.t - this._wave.mx };
		if (this._wave.vert) { this._wave.y = this._wave.t - this._wave.mx };
	};

	//==============================
	// * update Position
	//==============================
	SpriteMenuCursor.prototype.spriteFade = function (value) {
		this.opacity += value;
	};

	//==============================
	// * refresh Cursor
	//==============================
	SpriteMenuCursor.prototype.refreshCursor = function () {
		$gameTemp._menuCursor.needRefresh = false;
		this._waitData = true;
		this.setWaveData();
		this.setAnimationData();
		this.setRotationData();
		this.refreshCursorBitmap();
		this._spriteCursor.rotation = 0;
		this.opacity = 0;
	};

	//==============================
	// * need Refresh Cursor
	//==============================
	SpriteMenuCursor.prototype.needRefreshCursor = function () {
		return $gameTemp._menuCursor.needRefresh;
	};

	//==============================
	// * isVisible 
	//==============================
	SpriteMenuCursor.prototype.isVisible = function () {
		return $gameTemp._menuCursor.visible2;
	};

	//==============================
	// * update Cursor
	//==============================
	SpriteMenuCursor.prototype.updateCursor = function () {
		this.visible = this.isVisible();
		if (this.needSlideCursor()) {
			this.updateWave();
			if (this.isAnimated()) { this.updateAnimated() };
			if (this.isRotated()) { this.updateRotation(); }
			this.updatePosition();
			this.spriteFade(25);
		} else {
			this.spriteFade(-55);
		};
		this.updateOther();
	};

	//==============================
	// * update Other
	//==============================
	SpriteMenuCursor.prototype.updateOther = function () {
		$gameTemp._menuCursor.x2 = this._spriteCursor.x;
		$gameTemp._menuCursor.y2 = this._spriteCursor.y;
		$gameTemp._menuCursor.w = this._cw;
		$gameTemp._menuCursor.h = this._ch;
		$gameTemp._menuCursor.visible = this.visible;
		$gameTemp._menuCursor.opacity = this.opacity;
	};

	//==============================
	// ♦♦ update
	//==============================
	SpriteMenuCursor.prototype.update = function () {
		Sprite.prototype.update.call(this);
		this.visible = false;
		if (this.needRefreshCursor()) { this.refreshCursor() };
		if (this._waitData) {
			if (this._spriteCursor.bitmap.isReady()) { this.getData() };
			return;
		};
		this.updateCursor();
	};

})();
