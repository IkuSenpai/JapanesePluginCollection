//=============================================================================
// RPGツクールMZ - LL_CustomFade.js v1.0.1
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc 切り替え時間を指定できるフェードイン・フェードアウト機能を実装します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-customfade/
 *
 * @help LL_CustomFade.js
 *
 * 切り替え時間を指定できるフェードアウト・フェードイン機能を実装します。
 * プラグインコマンドを使用して、フェードアウト・フェードインを実行します。
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
 * 作成日: 2020/11/26
 *
 * @command fadeout
 * @text フェードアウト
 * @desc 画面を徐々に暗くし、そのまま真っ暗にします。
 *
 * @arg time
 * @text 時間
 * @desc フェードアウトする時間をフレーム単位(1/60秒)で指定します。
 * @default 60
 * @type number
 *
 * @arg waiting
 * @text 完了までウェイト
 * @desc 効果が終了するまで待ちます。
 * @default true
 * @type boolean
 *
 * @command fadein
 * @text フェードイン
 * @desc フェードアウトした画面を徐々に明るくし、元に戻します。
 *
 * @arg time
 * @text 時間
 * @desc フェードインする時間をフレーム単位(1/60秒)で指定します。
 * @default 60
 * @type number
 *
 * @arg waiting
 * @text 完了までウェイト
 * @desc 効果が終了するまで待ちます。
 * @default true
 * @type boolean
 */

(() => {
    "use strict";
    const pluginName = "LL_CustomFade";

    PluginManager.registerCommand(pluginName, "fadeout", function(args) {
        const time = Number(args.time);
        const waiting = eval(args.waiting || "true");
        if (!$gameMessage.isBusy()) {
            $gameScreen.startFadeOut(time);
            if (waiting) {
                this.wait(time);
            }
        }
    });

    PluginManager.registerCommand(pluginName, "fadein", function(args) {
        const time = Number(args.time);
        const waiting = eval(args.waiting || "true");
        if (!$gameMessage.isBusy()) {
            $gameScreen.startFadeIn(time);
            if (waiting) {
                this.wait(time);
            }
        }
    });
})();
