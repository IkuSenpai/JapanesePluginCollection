//=============================================================================
// ClearSmallText.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Cleans the display of characters 21px or less
 * @author Tamaki Awana
 *
 * @help Fixed a bug display of characters 21px or less blurred.
 * 
 * This bug was fixed on RMMV community version core script 1.3,
 * but same bug occurred in RMMZ.
 * So, I ported the corresponding countermeasure code.
 * Thanks to RMMV community version core script committers.
 * 
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 * 
 * Update History:
 * ver.1.0.1 English supported
 * ver.1.0 Release
 * 
 * ---
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc 21px以下の文字の表示をきれいにします
 * @author 沫那環
 *
 * @help 21px以下の文字の表示が、にじんでしまう不具合を解消します。
 * 
 * コミュニティ版RPGツクールMVコアスクリプトの1.3にて
 * 解消されていた不具合なのですが、MZで同様の不具合が
 * 発生していたので、該当する対策コードを移植しました。
 * この場を借りて、コミュニティ版コアスクリプトの記述に携わった方々に、
 * お礼申し上げます。
 * 
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 * 
 * 【更新履歴】
 * 　ver.1.0.1 英語表示に対応
 * 　ver.1.0　公開
 * 
 * ---
 * このプラグインは MIT License にもとづいて提供されています。
 * https://opensource.org/licenses/mit-license.php
 */
 
(() => {
/**
 * Draws the outline text to the bitmap.
 *
 * @param {string} text - The text that will be drawn.
 * @param {number} x - The x coordinate for the left of the text.
 * @param {number} y - The y coordinate for the top of the text.
 * @param {number} maxWidth - The maximum allowed width of the text.
 * @param {number} lineHeight - The height of the text line.
 * @param {string} align - The alignment of the text.
 */
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    // [Note] Different browser makes different rendering with
    //   textBaseline == 'top'. So we use 'alphabetic' here.
    if (text !== undefined) {
        if (this.fontSize < Bitmap.minFontSize) {
            this.drawSmallText(text, x, y, maxWidth, lineHeight, align);
            return;
        }
        const context = this.context;
        const alpha = context.globalAlpha;
        maxWidth = maxWidth || 0xffffffff;
        let tx = x;
        let ty = Math.round(y + lineHeight / 2 + this.fontSize * 0.35);
        if (align === "center") {
            tx += maxWidth / 2;
        }
        if (align === "right") {
            tx += maxWidth;
        }
        context.save();
        context.font = this._makeFontNameText();
        context.textAlign = align;
        context.textBaseline = "alphabetic";
        context.globalAlpha = 1;
        this._drawTextOutline(text, tx, ty, maxWidth);
        context.globalAlpha = alpha;
        this._drawTextBody(text, tx, ty, maxWidth);
        context.restore();
        this._baseTexture.update();
    }
};

/**
 * Draws the small text big once and resize it because modern broswers are poor at drawing small text.
 *
* @method drawSmallText
* @param {String} text The text that will be drawn
* @param {Number} x The x coordinate for the left of the text
* @param {Number} y The y coordinate for the top of the text
* @param {Number} maxWidth The maximum allowed width of the text
* @param {Number} lineHeight The height of the text line
* @param {String} align The alignment of the text
*/
Bitmap.prototype.drawSmallText = function(text, x, y, maxWidth, lineHeight, align) {
   const minFontSize = Bitmap.minFontSize;
   let bitmap = Bitmap.drawSmallTextBitmap;
   bitmap.fontFace = this.fontFace;
   bitmap.fontSize = minFontSize;
   bitmap.fontItalic = this.fontItalic;
   bitmap.textColor = this.textColor;
   bitmap.outlineColor = this.outlineColor;
   bitmap.outlineWidth = this.outlineWidth * minFontSize / this.fontSize;
   maxWidth = maxWidth || 816;
   let height = this.fontSize * 1.5;
   let scaledMaxWidth = maxWidth * minFontSize / this.fontSize;
   let scaledMaxWidthWithOutline = scaledMaxWidth + bitmap.outlineWidth * 2;
   let scaledHeight = height * minFontSize / this.fontSize;
   let scaledHeightWithOutline = scaledHeight + bitmap.outlineWidth * 2;

   let bitmapWidth = bitmap.width;
   let bitmapHeight = bitmap.height;
   while (scaledMaxWidthWithOutline > bitmapWidth) bitmapWidth *= 2;
   while (scaledHeightWithOutline > bitmapHeight) bitmapHeight *= 2;
   if (bitmap.width !== bitmapWidth || bitmap.height !== bitmapHeight) bitmap.resize(bitmapWidth, bitmapHeight);

   bitmap.drawText(text, bitmap.outlineWidth, bitmap.outlineWidth, scaledMaxWidth, minFontSize, align);
   this.blt(bitmap, 0, 0, scaledMaxWidthWithOutline, scaledHeightWithOutline,
       x - this.outlineWidth, y - this.outlineWidth + (lineHeight - this.fontSize) / 2, maxWidth + this.outlineWidth * 2, height + this.outlineWidth * 2);
   bitmap.clear();
};

Bitmap.minFontSize = 21;
Bitmap.drawSmallTextBitmap = new Bitmap(1632, Bitmap.minFontSize);

})();