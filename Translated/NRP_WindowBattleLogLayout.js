﻿//=============================================================================
// NRP_WindowBattleLogLayout.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Change the layout of the battle log.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter SimpleMsgSideViewMZ
 * @url http://newrpg.seesaa.net/article/474864758.html
 *
 * @help Change the layout of the battle log.
 * You can change the position and size of the window.
 * 
 * [Main features]
 * - You can use the official SimpleMsgSideView plugin together.
 * - You can use gradations.
 * - Switch to normal window.
 * - You can change the background color and transparency.
 * - When the message is long, it shrinks to fit the width of the window.
 * - There is also a function to adjust the window width to the string length.
 * 
 * [Described in the skills note]
 * <NoName>
 * Hide the skill name when using it.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/474864758.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param <Window Position>
 * @desc Set up the position of the window.
 * 
 * @param x
 * @parent <Window Position>
 * @type text
 * @default 0
 * @desc The X coordinate of the window.
 * 
 * @param y
 * @parent <Window Position>
 * @type text
 * @default 0
 * @desc The Y coordinate of the window.
 * 
 * @param showFront
 * @parent <Window Position>
 * @type boolean
 * @default false
 * @desc Show the window in the front.
 * However, it's not guaranteed for windows generated by the following plugins.
 * 
 * @param <Window Size>
 * @desc Configure the window size settings.
 * 
 * @param width
 * @parent <Window Size>
 * @type text
 * @default this.windowWidth()
 * @desc The width of the window.
 * The initial value is "this.windowWidth()". This will fit the width of the screen.
 * 
 * @param autoWidth
 * @parent <Window Size>
 * @type boolean
 * @default false
 * @desc Automatically adjusts the width of the window according to the number of characters.
 * 
 * @param lineHeight
 * @parent <Window Size>
 * @type number
 * @default 36
 * @desc The height of one line.
 * The default value is 36.
 * 
 * @param <Window Message>
 * @desc Configure the window messages.
 * 
 * @param fontSize
 * @parent <Window Message>
 * @type number
 * @default 28
 * @desc Specify the size of the font.
 * The default value is 28.
 * 
 * @param padding
 * @parent <Window Message>
 * @type number
 * @default 18
 * @desc Specify the padding of the message.
 * The default value is 18.
 * 
 * @param <Window Background>
 * @desc Set the background of the window.
 * 
 * @param normalWindow
 * @parent <Window Background>
 * @type boolean
 * @default false
 * @desc Change to the same window as the normal message.
 * 
 * @param backColor
 * @parent <Window Background>
 * @type text
 * @default #000000
 * @desc The background color. (RGB value in hex, Default: #000000)
 * This doesn't make sense in the normal window.
 * 
 * @param backPaintOpacity
 * @parent <Window Background>
 * @type number
 * @default 64
 * @desc The opacity of background. (Default: 64)
 * This doesn't make sense in the normal window.
 * 
 * @param gradientType
 * @parent <Window Background>
 * @type select
 * @option 0:none @value 0
 * @option 1:horizontal @value 1
 * @option 2:vertical @value 2
 * @default 0
 * @desc This is the gradation type of the window.
 * This doesn't make sense in the normal window.
 * 
 * @param startGradientSize
 * @parent <Window Background>
 * @type text
 * @default 18
 * @desc The gradient width of the start side.
 * (Default: 18)
 * 
 * @param endGradientSize
 * @parent <Window Background>
 * @type text
 * @default 18
 * @desc The gradient width of the end side.
 * (Default: 18)
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 戦闘メッセージのレイアウトを変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter SimpleMsgSideViewMZ
 * @url http://newrpg.seesaa.net/article/474864758.html
 *
 * @help 戦闘メッセージのレイアウトを変更します。
 * ウィンドウの配置や大きさを変更可能です。
 * 
 * ■主な特徴
 * ・公式プラグインのSimpleMsgSideViewに対応。
 * ・グラデーションに対応。
 * ・通常ウィンドウに切替可能。
 * ・背景色や透明度を変更可能。
 * ・メッセージが長い場合、ウィンドウ幅に合わせて縮小。
 * ・反対に文字列長にウィンドウ幅を合わせる機能も有。
 * 
 * ■スキルのメモ欄に記述
 * <NoName>
 * スキル使用時、技名を非表示にします。
 * 
 * その他、詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/474864758.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <Window Position>
 * @text ＜配置関連＞
 * @desc 配置関連の設定を行います。
 * 
 * @param x
 * @text Ｘ座標
 * @parent <Window Position>
 * @type text
 * @default 0
 * @desc ウィンドウのＸ座標です。
 * 
 * @param y
 * @text Ｙ座標
 * @parent <Window Position>
 * @type text
 * @default 0
 * @desc ウィンドウのＹ座標です。
 * 
 * @param showFront
 * @text 前面表示する
 * @parent <Window Position>
 * @type boolean
 * @default false
 * @desc ウィンドウを前面表示します。
 * ※下位のプラグインのウィンドウに対しては未保証。
 * 
 * @param <Window Size>
 * @text ＜サイズ関連＞
 * @desc ウィンドウのサイズ関連の設定を行います。
 * 
 * @param width
 * @text 横幅
 * @parent <Window Size>
 * @type text
 * @default this.windowWidth()
 * @desc ウィンドウの横幅です。
 * 初期値はthis.windowWidth()で画面横幅に合わせます。
 * 
 * @param autoWidth
 * @text 横幅を文字数に合わせる
 * @parent <Window Size>
 * @type boolean
 * @default false
 * @desc ウィンドウの横幅を文字数に合わせて自動調整します。
 * 
 * @param lineHeight
 * @text 一行の縦幅
 * @parent <Window Size>
 * @type number
 * @default 36
 * @desc 一行の縦幅です。
 * 初期値は36です。
 * 
 * @param <Window Message>
 * @text ＜メッセージ関連＞
 * @desc ウィンドウのメッセージ関連の設定を行います。
 * 
 * @param fontSize
 * @text フォントサイズ
 * @parent <Window Message>
 * @type number
 * @default 28
 * @desc フォントの大きさを指定します。
 * 初期値は28です。
 * 
 * @param padding
 * @text メッセージの余白
 * @parent <Window Message>
 * @type number
 * @default 18
 * @desc メッセージの余白を指定します。
 * 初期値は18です。
 * 
 * @param <Window Background>
 * @text ＜背景関連＞
 * @desc ウィンドウの背景関連の設定を行います。
 * 
 * @param normalWindow
 * @text 通常ウィンドウにする
 * @parent <Window Background>
 * @type boolean
 * @default false
 * @desc 通常メッセージと同様のウィンドウに変更します。
 * 
 * @param backColor
 * @text 背景色
 * @parent <Window Background>
 * @type text
 * @default #000000
 * @desc 背景色を指定します。（16進数のRGB値、初期値:#000000）
 * 通常ウィンドウでは意味がありません。
 * 
 * @param backPaintOpacity
 * @text 背景不透明度
 * @parent <Window Background>
 * @type number
 * @default 64
 * @desc 背景の不透明度を指定します。（初期値:64）
 * 通常ウィンドウでは意味がありません。
 * 
 * @param gradientType
 * @text グラデーション方式
 * @parent <Window Background>
 * @type select
 * @option 0:なし @value 0
 * @option 1:横 @value 1
 * @option 2:縦 @value 2
 * @default 0
 * @desc ウィンドウのグラデーション方式です。
 * 通常ウィンドウでは意味がありません。
 * 
 * @param startGradientSize
 * @text 開始グラデーション幅
 * @parent <Window Background>
 * @type text
 * @default 18
 * @desc 開始側のグラデーション幅です。
 * 初期値は18です。
 * 
 * @param endGradientSize
 * @text 終了グラデーション幅
 * @parent <Window Background>
 * @type text
 * @default 18
 * @desc 終了側のグラデーション幅です。
 * 初期値は18です。
 */
(function() {
"use strict";

function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}

const parameters = PluginManager.parameters("NRP_WindowBattleLogLayout");
const pX = parameters["x"];
const pY = parameters["y"];
const pWidth = parameters["width"];
const pAutoWidth = toBoolean(parameters["autoWidth"]);
const pLineHeight = toNumber(parameters["lineHeight"]);
const pNormalWindow = toBoolean(parameters["normalWindow"]);
const pShowFront = toBoolean(parameters["showFront"]);
const pFontSize = toNumber(parameters["fontSize"]);
const pPadding = toNumber(parameters["padding"]);
const pBackColor = parameters["backColor"];
const pBackPaintOpacity = toNumber(parameters["backPaintOpacity"]);
const pGradientType = parameters["gradientType"];
const pStartGradientSize = parameters["startGradientSize"];
const pEndGradientSize = parameters["endGradientSize"];

if (pShowFront) {
    /**
     * ●全ウィンドウ作成
     */
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.apply(this, arguments);

        // 一旦削除して再追加（前面表示）
        this._windowLayer.removeChild(this._logWindow);
        this.createLogWindow();
    };
}

/**
 * ●アクション表示
 */
const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    // eval参照用
    var a = getBattlerSprite(subject);
    
    // 横幅設定
    var width;
    if (pWidth) {
        width = eval(pWidth);
    } else {
        width = this.windowWidth();
    }
    // 自動調整用に最大幅として保持しておく。
    this._maxWidth = width;
    // ウィンドウ幅自動調整以外の場合
    if (!pAutoWidth) {
        // 横幅を反映
        this.width = width;
    }

    // <NoName>の指定があれば非表示
    if (item.meta.NoName) {
        return;
    }

    _Window_BattleLog_displayAction.apply(this, arguments);
}

/**
 * ●ウィンドウ描画の更新
 */
const _Window_BattleLog_refresh = Window_BattleLog.prototype.refresh;
Window_BattleLog.prototype.refresh = function() {
    // ウィンドウ幅自動調整
    if (pAutoWidth) {
        // 各行の中で最大幅を取得
        var maxWidth = 0;

        for (var line of this._lines) {
            var textWidth = this.textWidth(this.convertEscapeCharacters(line));
            var textPaddingWidth = textWidth + this.padding * 2 + this.textPadding() * 2;

            // SimpleMsgSideViewMZのアイコン分を考慮
            if (this._actionIconIndex) {
                textPaddingWidth += ImageManager.iconWidth;
            }

            if (textPaddingWidth > maxWidth) {
                maxWidth = textPaddingWidth;
            }
        }

        // 最大幅を超えた場合は調整
        if (maxWidth > this._maxWidth) {
            maxWidth = this._maxWidth;
        }

        this.width = maxWidth;
    }

    // eval参照用
    var subject = BattleManager._subject;
    if (subject) {
        var a = getBattlerSprite(subject);

        var x;
        if (pX) {
            x = eval(pX);
        } else {
            x = this.x;
        }

        var y;
        if (pY) {
            y = eval(pY);
        } else {
            y = this.y;
        }

        // 位置変更
        this.x = x;
        this.y = y;
    }

    _Window_BattleLog_refresh.apply(this, arguments);
};

/**
 * MVの場合のみ
 */
if (Utils.RPGMAKER_NAME == "MV") {
    /**
     * 【独自実装】文章表示
     */
    Window_BattleLog.prototype.drawTextEx = function(text, x, y) {
        if (text) {
            var textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.lineHeight();

            this.resetFontSettings();

            // 文字列長がウィンドウの表示領域を超えた場合は縮小
            var textWidth = this.textWidth(textState.text);
            var textSpace = this._maxWidth - this.padding * 2;
            if (textWidth > textSpace) {
                this.contents.fontSize = Math.floor(this.standardFontSize() * textSpace / textWidth);
                textWidth = textSpace;
            }
            
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    };
}

/**
 * ●背景描画
 */
Window_BattleLog.prototype.drawBackground = function() {
    this.getBack().clear();

    // 表示するメッセージがなければ処理しない
    if (this.numLines() == 0) {
        this.opacity = 0;
        this.hide();
        return;
    }

    var rect = this.backRect();
    var w = rect.width;
    var h = rect.height;

    this.show();

    // 行数に応じて縦幅変更
    this.height = h + this.padding * 2;

    // 通常ウィンドウ表示の場合
    if (pNormalWindow) {
        this.opacity = 255;
        return;
    }

    this.getBack().paintOpacity = this.backPaintOpacity();

    var m1 = this.startGradientSize();
    var m2 = this.endGradientSize();

    // 横のグラデーション領域を確保
    if (pGradientType == 1) {
        w -= m1 + m2;

    // 縦のグラデーション領域を確保
    } else if (pGradientType == 2) {
        h -= m1 + m2;
    }
    
    // var c1 = this.dimColor1();
    var c1 = this.backColor();

    // MZ対応
    if (Utils.RPGMAKER_NAME == "MV") {
        var c2 = this.dimColor2();
    } else {
        var c2 = ColorManager.dimColor2();
    }

    // 非グラデーション部分
    this.getBack().fillRect(rect.x, rect.y, w, h, c1);

    // 横のグラデーション
    if (pGradientType == 1) {
        // 左
        this.getBack().gradientFillRect(rect.x - m1, rect.y, m1, h, c2, c1, false);
        // 右
        this.getBack().gradientFillRect(rect.x + w, rect.y, m2, h, c1, c2, false);

    // 縦のグラデーション
    } else if (pGradientType == 2) {
        // 上
        this.getBack().gradientFillRect(rect.x, rect.y - m1, w, m1, c2, c1, true);
        // 下
        this.getBack().gradientFillRect(rect.x, rect.y + h, w, m2, c1, c2, true);
    }

    this.getBack().paintOpacity = 255;
};

/**
 * 【独自】背景取得
 * MVとMZで変数名が異なるため共通化
 */
Window_BattleLog.prototype.getBack = function() {
    // MV
    if (Utils.RPGMAKER_NAME == "MV") {
        return this._backBitmap;
    // MZ
    } else {
        return this.contentsBack;
    }
}

/**
 * ●背景領域の確保
 */
Window_BattleLog.prototype.backRect = function() {
    var x = 0;
    var padding;
    var width = this.width;
    
    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        padding = this.padding;
    // MZの場合
    } else {
        // 計算方法が異なるため余白分を減算
        padding = 0;
        width -= this.padding * 2
    }
    var y = padding;

    // 横グラデーションの場合、領域を確保
    if (pGradientType == 1) {
        x += this.startGradientSize();

    // 縦グラデーションの場合、領域を確保
    } else if (pGradientType == 2) {
        var gradientSize = this.startGradientSize();
        // 初期値の余白より開始グラデーション幅が広い場合のみ設定
        if (gradientSize > padding) {
            y += this.startGradientSize();
        }
    }

    return {
        x: x,
        y: y,
        width: width,
        height: this.numLines() * this.lineHeight()
    };
};

/**
 * 【独自実装】開始側のグラデーションサイズを取得
 */
Window_BattleLog.prototype.startGradientSize = function() {
    if (pStartGradientSize != undefined) {
        return eval(pStartGradientSize);
    }

    // 指定がなければ余白を取得
    return this.padding;
};

/**
 * 【独自実装】終了側のグラデーションサイズを取得
 */
Window_BattleLog.prototype.endGradientSize = function() {
    if (pEndGradientSize != undefined) {
        return eval(pEndGradientSize);
    }

    // 指定がなければ余白を取得
    return this.padding;
};

if (pLineHeight != undefined) {
    /**
     * ●一行の縦幅
     */
    Window_BattleLog.prototype.lineHeight = function() {
        return pLineHeight;
    };
}

if (pFontSize != undefined) {
    /**
     * ●フォントサイズ
     */
    Window_BattleLog.prototype.standardFontSize = function() {
        return pFontSize;
    };
}

if (pPadding != undefined) {
    /**
     * ●ウィンドウの余白
     */
    Window_BattleLog.prototype.standardPadding = function() {
        return pPadding;
    };

    /**
     * ●MZではこちらが参照される。
     */
    if (Utils.RPGMAKER_NAME != "MV") {
        Window_BattleLog.prototype.updatePadding = function() {
            this.padding = pPadding;
        };
    }
}

if (pBackColor != undefined) {
    /**
     * ●背景色
     */
    Window_BattleLog.prototype.backColor = function() {
        return pBackColor;
    };
}

if (pBackPaintOpacity != undefined) {
    /**
     * ●背景不透明度
     */
    Window_BattleLog.prototype.backPaintOpacity = function() {
        return pBackPaintOpacity;
    };
}

/**
 * 指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    var sprite;
    var sprites;

    if (battler.isActor()) {
        sprites = BattleManager._spriteset._actorSprites;
    } else {
        sprites = BattleManager._spriteset._enemySprites;
    }

    for (var i = 0; i < sprites.length; i++) {
        var s = sprites[i];
        if (s._battler == battler) {
            sprite = s;
            break;
        }
    }

    // Sprite_Actorのサイズ設定
    setActorSpriteSize(sprite);

    return sprite;
}

/**
 * 指定したアクタースプライトのサイズを設定する。
 */
function setActorSpriteSize(sprite) {
    if (sprite && sprite._battler.isActor()) {
        // Sprite_Actorのサイズが取れないのでeffectTargetのものをセットする。
        // やや強引かも……。
        if (Utils.RPGMAKER_NAME == "MV") {
            sprite.width = sprite._effectTarget.width;
            sprite.height = sprite._effectTarget.height;
        }
    }
}

/**
 * MZ対応
 */
if (Utils.RPGMAKER_NAME == "MZ") {
    Window_BattleLog.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

    Window_Base.prototype.textPadding = function() {
        return 6;
    };

    /**
     * SimpleMsgSideViewMZが登録されている場合
     */
    const isSimpleMsgSideViewMZ = PluginManager._scripts.some(function(scriptName) {
        return scriptName == "SimpleMsgSideViewMZ";
    });
    if (isSimpleMsgSideViewMZ) {
        /**
         * ●スキル名の表示
         */
        Window_BattleLog.prototype.drawLineText = function(index) {
            const text = this._lines[index];
            const rect = this.lineRect(index);
            this.contents.clearRect(rect.x, rect.y, rect.width, rect.height);

            let textX = rect.x;
            // 描画可能領域の幅（rect.width）を参照する
            let textDrawWidth = rect.width;

            if (this._actionIconIndex) {
                // 描画可能領域からアイコン幅を減算
                textDrawWidth = rect.width - ImageManager.iconWidth;
                // 実際に描画される文字列長を求める。
                const textWidth = Math.min(this.textWidth(text), textDrawWidth);

                // 中央から文字列長分左へ調整
                const x = (rect.width - textWidth) / 2 - 10;
                this.drawIcon(this._actionIconIndex, x, rect.y + 2);

                // アイコン分、右にずらす
                textX += ImageManager.iconWidth;
            }

            this.drawText(text, textX, rect.y, textDrawWidth, 'center');
        };
    }
}

})();
