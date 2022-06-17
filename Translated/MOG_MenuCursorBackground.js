//=============================================================================
// MOG_MenuCursorBackground.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc (v1.0) Permite customizar a imagem de seleção.
 * @author Moghunter
 * @url https://mogplugins.wordpress.com
 * 
 * @param File Name
 * @text File Name
 * @desc Definição do nome de arquivo.
 * @type file
 * @dir img/menus/
 * @default CursorBackground
 *
 * @param Scroll X
 * @text Scrolling X
 * @desc Definição X-axis da animação. 
 * @default 0.5
 *
 * @param Scroll Y
 * @text Scrolling Y
 * @desc Definição Y-axis da animação. 
 * @default 0.5
 * 
 * @param Blink Effect
 * @text Blink Effect
 * @desc Efeito de transparência.
 * @type boolean  
 * @default false
 * 
 * @help
 * =============================================================================
 * ♦♦♦ MOG - MenuCursorBackground ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/03/20
 * https://mogplugins.wordpress.com
 * =============================================================================
 * Permite customizar a imagem de seleção.
 * Grave a imagem "CursorBackground.png" na pasta /img/menus/
 *
 */
/*:ja
 * @target MZ
 * @plugindesc (v1.0) コマンド選択背景をカスタマイズできます。
 * @author Moghunter
 * @url https://raw.githubusercontent.com/harizumi/Moghunter-MZ-jp/main/MOG_MenuCursorBackground.js
 *
 * @param File Name
 * @text ファイル名
 * @desc ファイル名の指定
 * @type file
 * @dir img/menus/
 * @default CursorBackground
 *
 * @param Scroll X
 * @text X軸スクロール
 * @desc アニメーションのX軸指定
 * @default 0.5
 *
 * @param Scroll Y
 * @text Y軸スクロール
 * @desc アニメーションのY軸指定
 * @default 0.5
 *
 * @param Blink Effect
 * @text 点滅エフェクト
 * @desc 点滅エフェクト
 * @type boolean
 * @default false
 * @on 有効
 * @off 無効
 *
 * @help
 * 翻訳:
 * https://fungamemake.com/
 *
 * ===========================================================================
 * ♦♦♦ MOG - MenuCursorBackground ♦♦♦
 * Author   -   Moghunter
 * Version  -   1.0
 * Updated  -   2021/03/20
 * https://mogplugins.wordpress.com
 * ===========================================================================
 * コマンド選択背景をカスタマイズできます。
 * 画像「CursorBackground.png」を下記フォルダーに保存してください。
 * /img/menus/
 *
 */

(() => {

    //=============================================================================
    // ** PLUGIN PARAMETERS
    //=============================================================================
    var Imported = Imported || {};
    Imported.MOG_MenuCursorBackground = true;
    var Moghunter = Moghunter || {};

    Moghunter.parameters = PluginManager.parameters('MOG_MenuCursorBackground');
    Moghunter.cursorBack_fileName = String(Moghunter.parameters['File Name'] || "CursorBackground");
    Moghunter.cursorBack_blink = String(Moghunter.parameters['Blink Effect'] || false);
    Moghunter.cursorBack_SX = Number(Moghunter.parameters['Scroll X'] || 0.5);
    Moghunter.cursorBack_SY = Number(Moghunter.parameters['Scroll Y'] || 0.5);

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
    // ■■■ Window ■■■
    //=============================================================================

    //==============================
    //  ♦ ALIAS ♦  _createCursorSprite
    //==============================
    const _mog_backsel_window_createCursorSprite = Window.prototype._createCursorSprite;
    Window.prototype._createCursorSprite = function () {
        _mog_backsel_window_createCursorSprite.call(this);
        if (!this._cursorBackground) { this._createCursorBackground() };
    };

    //==============================
    // * _createCursorBackground
    //==============================
    Window.prototype._createCursorBackground = function () {
        this._cursorBackgroundImg = ImageManager.loadMenus(Moghunter.cursorBack_fileName);
        this._cursorBackground = new TilingSprite(this._cursorBackgroundImg);
        this._cursorBack_blink = String(Moghunter.cursorBack_blink) == "true" ? true : false;
        this._clientArea.addChild(this._cursorBackground);
    };

    //==============================
    //  ♦ ALIAS ♦  update Cursor
    //==============================
    const _mog_backsel_window_updateCursor = Window.prototype._updateCursor
    Window.prototype._updateCursor = function () {
        _mog_backsel_window_updateCursor.call(this);
        if (this._cursorBackground) { this._updateCursorBackground() };
    };

    //==============================
    // * _cbSX
    //==============================
    Window.prototype._cbSX = function () {
        return Moghunter.cursorBack_SX;
    };

    //==============================
    // * _cbSY
    //==============================
    Window.prototype._cbSY = function () {
        return Moghunter.cursorBack_SY;
    };

    //==============================
    // * _updateCursorBackground
    //==============================
    Window.prototype._updateCursorBackground = function () {
        this._cursorBackground.x = this._cursorSprite.x;
        this._cursorBackground.y = this._cursorSprite.y;
        this._cursorBackground.visible = this._cursorSprite.visible;
        if (this.active) {
            this._cursorBackground.origin.x += this._cbSX();
            this._cursorBackground.origin.y += this._cbSY();
        };
        if (this._cursorBack_blink) { this._cursorBackground.alpha = this._cursorSprite.alpha };
        this._cursorSprite.visible = false;
    };

    //==============================
    // * _refreshCursor
    //==============================
    const _mog_backsel_window_refreshCursor = Window.prototype._refreshCursor;
    Window.prototype._refreshCursor = function () {
        _mog_backsel_window_refreshCursor.call(this);
        if (this._cursorBackground) { this._cursorBackground.move(0, 0, this._cursorRect.width, this._cursorRect.height) };
    };

})();
