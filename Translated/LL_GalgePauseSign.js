//=============================================================================
// RPGツクールMZ - LL_GalgePauseSign.js v1.0.2
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ノベルゲーム風改行カーソルプラグイン
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-galgepausesign/
 *
 * @help LL_GalgePauseSign.js
 *
 * ノベルゲーム風の改行カーソルを表示します。
 * カーソル用画像は、1枚のみでOKです。
 * アニメーション用のコマ送り画像を用意する必要はありません。
 *
 * プラグインコマンドはありません。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2021/8/15
 *
 * @param imageName
 * @text 画像ファイル名
 * @desc 改行カーソルとして表示する画像ファイルです。
 * 24px～36pxの正方形サイズを推奨します。
 * @dir img/system
 * @type file
 * @require 1
 *
 * @param animation
 * @text アニメーション
 * @desc 改行カーソル表示時のアニメーションです。
 * @type select
 * @default vertical
 * @option なし
 * @value none
 * @option 上下
 * @value vertical
 * @option 左右
 * @value horizontal
 * @option 点滅
 * @value blinking
 * @option ズーム
 * @value zoom
 * @option 回転
 * @value rotation
 * @option ジャンプ
 * @value jumping
 * @option 流れ星
 * @value shootingstar
 *
 * @param positionType
 * @text 表示位置
 * @desc 改行カーソルの表示位置です。
 * @type select
 * @default centerBottom
 * @option 左下
 * @value leftBottom
 * @option 中央
 * @value centerBottom
 * @option 右下
 * @value rightBottom
 * @option テキスト末尾
 * @value textEnd
 *
 * @param positionX
 * @text X座標
 * @desc 表示位置(X)の調整値です。(初期値: 0)
 * ＋で右へ、－で左へ調整します。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 *
 * @param positionY
 * @text Y座標
 * @desc 表示位置(X)の調整値です。(初期値: 0)
 * ＋で下へ、－で上へ調整します。
 * @default 0
 * @min -2000
 * @max 2000
 * @type number
 */

(() => {
    "use strict";
    const pluginName = "LL_GalgePauseSign";

    const parameters = PluginManager.parameters(pluginName);
    const animation = String(parameters["animation"] || "vertical");
    const imageName = String(parameters["imageName"] || "");
    const positionType = String(parameters["positionType"] || "centerBottom");
    const positionX = Number(parameters["positionX"] || 0);
    const positionY = Number(parameters["positionY"] || 0);


    const _Window_Message_startPause = Window_Message.prototype.startPause;
    Window_Message.prototype.startPause = function() {
        _Window_Message_startPause.apply(this, arguments);

        this._refreshPauseSign();
    };

    Window_Message.prototype._refreshPauseSign = function() {
        const sx = 144;
        const sy = 96;
        const p = 24;

        // カーソル画像読み込み
        if (imageName) {
            this._pauseSignSprite.bitmap = ImageManager.loadSystem(imageName);
        } else {
            this._pauseSignSprite.bitmap = this._windowskin;
            // MZのみカーソル画像の上部に謎の見切れ線？が入るので、縦を1px縮小
            // this._pauseSignSprite.setFrame(sx, sy, p, p);
            this._pauseSignSprite.setFrame(sx, sy + 1, p, p - 1);
        }

        this._pauseSignSprite.anchor.x = 0.5;
        this._pauseSignSprite.anchor.y = 0.5;

        // 画像が読み込まれたあとに実行
        this._pauseSignSprite.bitmap.addLoadListener(function() {
            switch (positionType) {
                case "leftBottom":
                    this._pauseSignSprite.move((this._pauseSignSprite.width / 2) + positionX + this.padding, this._height - (this._pauseSignSprite.height / 2) + positionY - (this.padding / 2));
                    break;
                case "centerBottom":
                    this._pauseSignSprite.move((this._width / 2) + positionX, this._height - (this._pauseSignSprite.height / 2) + positionY);
                    break;
                case "rightBottom":
                    this._pauseSignSprite.move(this._width - (this._pauseSignSprite.width / 2) + positionX - this.padding, this._height - (this._pauseSignSprite.height / 2) + positionY - (this.padding / 2));
                    break;
                case "textEnd":
                    if (this._textState) {
                        let textStateCalcY = this._textState.outputHeight - this._textState.height + this._textState.height;
                        if (textStateCalcY < this._textState.height) textStateCalcY = this._textState.height;
                        this._pauseSignSprite.move(this._textState.x + (this._pauseSignSprite.width / 2) + this.padding + positionX, textStateCalcY + positionY);
                    } else {
                        this._pauseSignSprite.move((this._width / 2) + positionX, this._height - (this._pauseSignSprite.height / 2) + positionY - (this.padding / 2));
                    }
                    break;
            }
        }.bind(this));

        this._pauseSignSprite.alpha = 0;
        this._pauseSignSprite.animationCount = 0;

    };

    Window_Message.prototype._updatePauseSign = function() {
        const sprite = this._pauseSignSprite;
        if (!this.pause) {
            sprite.alpha = 0;
        }
        sprite.visible = this.isOpen();
    };

    const _Window_Message_update = Window_Message.prototype.update;
    Window_Message.prototype.update = function() {
        _Window_Message_update.apply(this, arguments);

        // カーソルアニメーション
        if (this.pause && this._pauseSignSprite) {
            this._animationPauseSign();
        }
    };

    Window_Message.prototype._animationPauseSign = function() {
        const sprite = this._pauseSignSprite;
        switch (animation) {
            case "vertical":  // 上下
                if (sprite.animationCount === 0) {
                    sprite.opacity = 255;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 31) {
                    sprite.y += 0.25;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 61) {
                    sprite.y -= 0.25;
                    sprite.animationCount += 1;
                } else if (this._pauseSignSprite.animationCount === 61) {
                    sprite.animationCount = 0;
                }
                break;
            case "horizontal":  // 左右
                if (sprite.animationCount === 0) {
                    sprite.opacity = 255;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 31) {
                    sprite.x += 0.25;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 61) {
                    sprite.x -= 0.25;
                    sprite.animationCount += 1;
                } else if (this._pauseSignSprite.animationCount === 61) {
                    sprite.animationCount = 0;
                }
                break;
            case "blinking":  // 点滅
                if (sprite.animationCount === 0) {
                    sprite.opacity = 255;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 31) {
                    sprite.opacity -= 255 / 30;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 61) {
                    sprite.opacity += 255 / 30;
                    sprite.animationCount += 1;
                } else if (this._pauseSignSprite.animationCount === 61) {
                    sprite.animationCount = 0;
                }
                break;
            case "zoom":  // ズーム
                if (sprite.animationCount === 0) {
                    sprite.opacity = 255;
                    sprite.scale.x = 1;
                    sprite.scale.y = 1;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 31) {
                    sprite.scale.x += 0.5 / 30;
                    sprite.scale.y += 0.5 / 30;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 61) {
                    sprite.scale.x -= 0.5 / 30;
                    sprite.scale.y -= 0.5 / 30;
                    sprite.animationCount += 1;
                } else if (this._pauseSignSprite.animationCount === 61) {
                    sprite.animationCount = 0;
                }
                break;
            case "rotation":  // 回転
                sprite.opacity = 255;
                sprite.rotation += 1 / 30;
                break;
            case "jumping":  // ジャンプ
                if (sprite.animationCount === 0) {
                    sprite.opacity = 255;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 16) {
                    sprite.y -= 0.5;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 31) {
                    sprite.y += 0.5;
                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 61) {
                    sprite.animationCount += 1;
                } else if (this._pauseSignSprite.animationCount === 61) {
                    sprite.animationCount = 0;
                }
                break;
            case "shootingstar":  // 流れ星
                if (sprite.animationCount === 0) {
                    sprite.scale.x = 0;
                    sprite.scale.y = 0;
                    sprite.rotation = 1.5;

                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 31) {
                    sprite.opacity = 255;
                    sprite.scale.x += 1 / 30;
                    sprite.scale.y += 1 / 30;
                    sprite.rotation -= 1.5 / 30;

                    sprite.animationCount += 1;
                } else if (sprite.animationCount < 61) {
                    sprite.opacity -= 10;
                    sprite.animationCount += 1;
                } else if (this._pauseSignSprite.animationCount === 61) {
                    sprite.animationCount = 0;
                }
                break;
            default:
                sprite.opacity = 255;
        }
    };
})();
