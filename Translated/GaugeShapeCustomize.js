//=============================================================================
// GaugeShapeCustomize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Customize the shape of the gauge depicted.
 * @author Tamaki Awana
 * @help This Plugin customize the shape of the
 *  gauge depicted without the image.
 * And, you can change the height of the gauge,
 * the color of the outline,
 * and the gradation of the gauge.
 * 
 * The gauge shape you can set looks like this,
 * Left side:  | / ( < . \
 * Right side: | / ) > . \
 * 
 * Plugin Commands:
 * This plugin does not provide plugin commands.
 *
 * Update History:
 * ver.1.0 Release
 *
 * ---
 * This plugin is released under MIT license.
 * https://opensource.org/licenses/mit-license.php
 * 
 * This plugin is based on Rocketmancer's RMMV plugin "Pretty Gauges",
 * and mjshi's RMMV plugin "Pretty Sleek Gauges".
 * Thanks to Rocketmancer and mjshi.
 * 
 *
 * @param Default Gauge Shape
 * @desc Default shape of the gauge.
 * @default //
 *
 * @param HP Gauge Shape
 * @desc Shape of the HP gauge. If you set a blank, the default value is used.
 * @default 
 *
 * @param MP Gauge Shape
 * @desc Shape of the MP gauge. If you set a blank, the default value is used.
 * @default 
 *
 * @param TP Gauge Shape
 * @desc Shape of the TP gauge. If you set a blank, the default value is used.
 * @default 
 *
 * @param CT Gauge Shape
 * @desc Shape of the CT gauge at TPB. If you set a blank, the default value is used.
 * @default ||
 *
 * @param Gauge Height
 * @desc Default height of the gauges.
 * @type number
 * @decimals 0
 * @max 9007
 * @default 12
 * 
 * @param Gauge Outline
 * @desc Whether you want to show gauge outline?
 * @type boolean
 * @on Show
 * @off Don't show
 * @default true
 * 
 * @param Gauge Outline Color
 * @desc Text color number of gauge outline.
 * @default 0
 * 
 * @param Gauge Background Color
 * @desc Text color number of gauge background.
 * @default 19
 * 
 * @param HP Gauge Color 1
 * @desc Text color number of left side of HP gauge gradient.
 * @default 20
 * 
 * @param HP Gauge Color 2
 * @desc Text color number of right side of HP gauge gradient.
 * @default 21
 * 
 * @param MP Gauge Color 1
 * @desc Text color number of left side of MP gauge gradient.
 * @default 22
 * 
 * @param MP Gauge Color 2
 * @desc Text color number of right side of MP gauge gradient.
 * @default 23
 * 
 * @param TP Gauge Color 1
 * @desc Text color number of left side of TP gauge gradient.
 * @default 28
 * 
 * @param TP Gauge Color 2
 * @desc Text color number of right side of TP gauge gradient.
 * @default 29
 * 
 * @param CT Gauge Color 1
 * @desc Text color number of left side of CT gauge gradient at TPB.
 * @default 26
 * 
 * @param CT Gauge Color 2
 * @desc Text color number of right side of CT gauge gradient at TPB.
 * @default 27
 * 
 */
/*:ja
 * @target MZ
 * @plugindesc ゲージの形状をカスタマイズします
 * @author 沫那環
 * @help このプラグインを使うと、描写されるゲージの形状を
 * 画像なしでカスタマイズできます。
 * さらに、ゲージの縦幅や、ゲージの枠線の色合い、
 * ゲージ本体のグラデーションの色合いを変更することができます。
 * 
 * ゲージの形状として設定できる項目は、以下の通りです。
 * 左側： | / ( < . \
 * 右側： | / ) > . \
 * 
 * 【プラグインコマンドについて】
 * このプラグインには、プラグインコマンドはありません。
 *
 * 【更新履歴】
 * ver.1.0 公開
 *
 * ---
 * このプラグインは MIT License にもとづいて提供されます。
 * https://opensource.org/licenses/mit-license.php
 * 
 * このプラグインを制作するにあたり、Rocketmancer様作の
 * RPGツクールMV用プラグイン「Pretty Gauges」と
 * mjshi様作のRPGツクールMV用プラグイン
 * 「Pretty Sleek Gauges」を参考にさせていただきました。
 * この場を借りて、お礼申し上げます。
 * 
 *
 * @param Default Gauge Shape
 * @desc デフォルトのゲージ形状を設定します
 * @default //
 *
 * @param HP Gauge Shape
 * @desc HPゲージの形状を設定します。空欄を設定すると、デフォルトの形状を使用します。
 * @default 
 *
 * @param MP Gauge Shape
 * @desc MPゲージの形状を設定します。空欄を設定すると、デフォルトの形状を使用します。
 * @default 
 *
 * @param TP Gauge Shape
 * @desc TPゲージの形状を設定します。空欄を設定すると、デフォルトの形状を使用します。
 * @default 
 *
 * @param CT Gauge Shape
 * @desc TPBでのCTゲージの形状を設定します。空欄を設定すると、デフォルトの形状を使用します。
 * @default ||
 *
 * @param Gauge Height
 * @desc ゲージの縦幅を設定します。
 * @type number
 * @decimals 0
 * @max 9007
 * @default 12
 * 
 * @param Gauge Outline
 * @desc ゲージの枠線を表示するかどうかを設定します。
 * @type boolean
 * @on 表示する
 * @off 表示しない
 * @default true
 * 
 * @param Gauge Outline Color
 * @desc ゲージの枠線のテキストカラー番号を設定します。
 * @default 0
 * 
 * @param Gauge Background Color
 * @desc ゲージの背景のテキストカラー番号を設定します。
 * @default 19
 * 
 * @param HP Gauge Color 1
 * @desc HPゲージのグラデーションの左側のテキストカラー番号を設定します。
 * @default 20
 * 
 * @param HP Gauge Color 2
 * @desc HPゲージのグラデーションの右側のテキストカラー番号を設定します。
 * @default 21
 * 
 * @param MP Gauge Color 1
 * @desc MPゲージのグラデーションの左側のテキストカラー番号を設定します。
 * @default 22
 * 
 * @param MP Gauge Color 2
 * @desc MPゲージのグラデーションの右側のテキストカラー番号を設定します。
 * @default 23
 * 
 * @param TP Gauge Color 1
 * @desc TPゲージのグラデーションの左側のテキストカラー番号を設定します。
 * @default 28
 * 
 * @param TP Gauge Color 2
 * @desc TPゲージのグラデーションの右側のテキストカラー番号を設定します。
 * @default 29
 * 
 * @param CT Gauge Color 1
 * @desc TPBでのCTゲージのグラデーションの左側のテキストカラー番号を設定します。
 * @default 26
 * 
 * @param CT Gauge Color 2
 * @desc TPBでのCTゲージのグラデーションの右側のテキストカラー番号を設定します。
 * @default 27
 * 
 */

(() => {
    const pluginName = decodeURIComponent(document.currentScript.src).match(/([^\/]+)\.js$/)[1];
    const parameters = PluginManager.parameters(pluginName);

    const defgaugeTypeLeft = String(parameters['Default Gauge Shape']).substring(0, 1);
    const defgaugeTypeRight = String(parameters['Default Gauge Shape']).substring(1, 2);
    const hpgaugeTypeLeft = (parameters['HP Gauge Shape'].length === 2) ? String(parameters['HP Gauge Shape']).substring(0, 1) : false;
    const hpgaugeTypeRight = (parameters['HP Gauge Shape'].length === 2) ? String(parameters['HP Gauge Shape']).substring(1, 2) : false;
    const mpgaugeTypeLeft = (parameters['MP Gauge Shape'].length === 2) ? String(parameters['MP Gauge Shape']).substring(0, 1) : false;
    const mpgaugeTypeRight = (parameters['MP Gauge Shape'].length === 2) ? String(parameters['MP Gauge Shape']).substring(1, 2) : false;
    const tpgaugeTypeLeft = (parameters['TP Gauge Shape'].length === 2) ? String(parameters['TP Gauge Shape']).substring(0, 1) : false;
    const tpgaugeTypeRight = (parameters['TP Gauge Shape'].length === 2) ? String(parameters['TP Gauge Shape']).substring(1, 2) : false;
    const timegaugeTypeLeft = (parameters['CT Gauge Shape'].length === 2) ? String(parameters['CT Gauge Shape']).substring(0, 1) : false;
    const timegaugeTypeRight = (parameters['CT Gauge Shape'].length === 2) ? String(parameters['CT Gauge Shape']).substring(1, 2) : false;

    const defaultHeight = Number(parameters['Gauge Height']);
    const gaugeOutline = (parameters['Gauge Outline'] || 'true');
    const gaugeOutlineColor = Number(parameters['Gauge Outline Color'] || 0);

    const gaugeBackColor = Number(parameters['Gauge Background Color'] || 19);
    const hpGaugeColor1 = Number(parameters['HP Gauge Color 1'] || 20);
    const hpGaugeColor2 = Number(parameters['HP Gauge Color 2'] || 21);
    const mpGaugeColor1 = Number(parameters['MP Gauge Color 1'] || 22);
    const mpGaugeColor2 = Number(parameters['MP Gauge Color 2'] || 23);
    const tpGaugeColor1 = Number(parameters['TP Gauge Color 1'] || 28);
    const tpGaugeColor2 = Number(parameters['TP Gauge Color 2'] || 29);
    const ctGaugeColor1 = Number(parameters['CT Gauge Color 1'] || 26);
    const ctGaugeColor2 = Number(parameters['CT Gauge Color 2'] || 27);

    //ColorManager
    ColorManager.gaugeOutlineColor = function () {
        return this.textColor(gaugeOutlineColor);
    };

    ColorManager.gaugeBackColor = function () {
        return this.textColor(gaugeBackColor);
    };

    ColorManager.hpGaugeColor1 = function () {
        return this.textColor(hpGaugeColor1);
    };

    ColorManager.hpGaugeColor2 = function () {
        return this.textColor(hpGaugeColor2);
    };

    ColorManager.mpGaugeColor1 = function () {
        return this.textColor(mpGaugeColor1);
    };

    ColorManager.mpGaugeColor2 = function () {
        return this.textColor(mpGaugeColor2);
    };

    ColorManager.ctGaugeColor1 = function () {
        return this.textColor(ctGaugeColor1);
    };

    ColorManager.ctGaugeColor2 = function () {
        return this.textColor(ctGaugeColor2);
    };

    ColorManager.tpGaugeColor1 = function () {
        return this.textColor(tpGaugeColor1);
    };

    ColorManager.tpGaugeColor2 = function () {
        return this.textColor(tpGaugeColor2);
    };

    //Sprite_Gauge
    const _Sprite_Gauge_gaugeHeight = Sprite_Gauge.prototype.gaugeHeight;
    Sprite_Gauge.prototype.gaugeHeight = function () {
        if (defaultHeight) {
            return defaultHeight;
        } else {
            return _Sprite_Gauge_gaugeHeight.call(this);
        }
    };

    Sprite_Gauge.prototype.gaugeOutlineColor = function () {
        return ColorManager.gaugeOutlineColor();
    };

    Sprite_Gauge.prototype.drawGaugeRect = function (x, y, width, height) {
        const rate = this.gaugeRate();
        const fillW = Math.floor(width * rate);
        const color0 = this.gaugeBackColor();
        const color1 = this.gaugeColor1();
        const color2 = this.gaugeColor2();
        const color3 = this.gaugeOutlineColor();
        switch (this._statusType) {
            case "hp":
                gaugeTypeLeft = hpgaugeTypeLeft || defgaugeTypeLeft;
                gaugeTypeRight = hpgaugeTypeRight || defgaugeTypeRight;
                break;
            case "mp":
                gaugeTypeLeft = mpgaugeTypeLeft || defgaugeTypeLeft;
                gaugeTypeRight = mpgaugeTypeRight || defgaugeTypeRight;
                break;
            case "tp":
                gaugeTypeLeft = tpgaugeTypeLeft || defgaugeTypeLeft;
                gaugeTypeRight = tpgaugeTypeRight || defgaugeTypeRight;
                break;
            case "time":
                gaugeTypeLeft = timegaugeTypeLeft || defgaugeTypeLeft;
                gaugeTypeRight = timegaugeTypeRight || defgaugeTypeRight;
                break;
        };
        if (gaugeOutline == 'true') {
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

    //Bitmap
    Bitmap.prototype.fillTrap = function (x, y, width, height, color1, color2, atop) {
        const context = this._context;
        const grad = context.createLinearGradient(x, y, x + width, y);
        if (atop) {
            context.globalCompositeOperation = 'source-atop';
        } else {
            context.globalCompositeOperation = 'source-over';
        }
        let startCoords = [];

        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);

        context.save();
        context.beginPath();

        switch (gaugeTypeLeft) {
            case "|":
                startCoords = [x, y + height]
                context.moveTo(x, y + height)
                context.lineTo(x, y)
                break;
            case "/":
                startCoords = [x, y + height]
                context.moveTo(x, y + height)
                context.lineTo(x + height, y)
                break;
            case "<":
                startCoords = [x + height / 2, y + height]
                context.moveTo(x + height / 2, y + height)
                context.lineTo(x, y + height / 2)
                context.lineTo(x + height / 2, y)
                break;
            case "(":
                startCoords = [x + height, y + height]
                context.moveTo(x + height, y + height);
                context.bezierCurveTo(x, y + height, x, y, x + height, y);
                break;
            case ".":
                startCoords = [x, y + height]
                context.moveTo(x, y + height)
                break;
            case "\\":
                startCoords = [x + height, y + height]
                context.moveTo(x + height, y + height)
                context.lineTo(x, y)
                break;
        };

        switch (gaugeTypeRight) {
            case "|":
                context.lineTo(x + width, y)
                context.lineTo(x + width, y + height)
                break;
            case "/":
                context.lineTo(x + width, y)
                context.lineTo(x + width - height, y + height)
                break;
            case ">":
                context.lineTo(x + width - height / 2, y)
                context.lineTo(x + width, y + height / 2)
                context.lineTo(x + width - height / 2, y + height)
                break;
            case ")":
                context.lineTo(x + width - height, y);
                context.bezierCurveTo(x + width, y, x + width, y + height, x + width - height, y + height);
                break;
            case ".":
                context.lineTo(x + width, y + height)
                break;
            case "\\":
                context.lineTo(x + width - height, y)
                context.lineTo(x + width, y + height)
                break;
        };

        context.lineTo(startCoords[0], startCoords[1])
        context.fillStyle = grad;
        context.fill();
        context.restore();
        this._baseTexture.update();
    };

    Bitmap.prototype.outlineTrap = function (x, y, width, height, color1, color2, desover) {
        const context = this._context;
        const grad = context.createLinearGradient(x, y, x + width, y);
        if (desover) {
            context.globalCompositeOperation = 'destination-over';
        } else {
            context.globalCompositeOperation = 'source-over';
        }
        let startCoords = [];

        grad.addColorStop(0, color1);
        grad.addColorStop(1, color2);

        context.save();
        context.beginPath();

        switch (gaugeTypeLeft) {
            case "|":
                startCoords = [x, y + height]
                context.moveTo(x, y + height)
                context.lineTo(x, y)
                break;
            case "/":
                startCoords = [x, y + height]
                context.moveTo(x, y + height)
                context.lineTo(x + height, y)
                break;
            case "<":
                startCoords = [x + height / 2, y + height]
                context.moveTo(x + height / 2, y + height)
                context.lineTo(x, y + height / 2)
                context.lineTo(x + height / 2, y)
                break;
            case "(":
                startCoords = [x + height, y + height]
                context.moveTo(x + height, y + height);
                context.bezierCurveTo(x, y + height, x, y, x + height, y);
                break;
            case ".":
                startCoords = [x, y + height]
                context.moveTo(x, y + height)
                break;
            case "\\":
                startCoords = [x + height, y + height]
                context.moveTo(x + height, y + height)
                context.lineTo(x, y)
                break;
        };

        switch (gaugeTypeRight) {
            case "|":
                context.lineTo(x + width, y)
                context.lineTo(x + width, y + height)
                break;
            case "/":
                context.lineTo(x + width, y)
                context.lineTo(x + width - height, y + height)
                break;
            case ">":
                context.lineTo(x + width - height / 2, y)
                context.lineTo(x + width, y + height / 2)
                context.lineTo(x + width - height / 2, y + height)
                break;
            case ")":
                context.lineTo(x + width - height, y);
                context.bezierCurveTo(x + width, y, x + width, y + height, x + width - height, y + height);
                break;
            case ".":
                context.lineTo(x + width, y + height)
                break;
            case "\\":
                context.lineTo(x + width - height, y)
                context.lineTo(x + width, y + height)
                break;
        };

        context.lineTo(startCoords[0], startCoords[1])
        context.strokeStyle = grad;
        context.lineWidth = 2.0;
        context.stroke();
        context.restore();
        this._baseTexture.update();
    };
})();