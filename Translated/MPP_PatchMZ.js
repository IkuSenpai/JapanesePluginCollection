//=============================================================================
// MPP_PatchMZ.js
//=============================================================================
// Copyright (c) 2021 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc Bug fix plugin
 * @author Mokusei Penguin
 * @url
 *
 * @help [2021/03/05]
 * This plugin is for RPG Maker MZ.
 * 
 * 1.Fixed a bug where damage sprites were updated twice
 * 2.Addition of a function that allows you to skip while waiting and
 *   a function that does not wait while skipping in [Show Text]
 * 3.Fixed to execute the movement route within one frame as much as possible
 * 4.Fixed a bug that was ignored when the end of the text was a weight in
 *   [Show Text]
 * 5.Fixed to release unnecessary filters
 * 6.Fixed a bug that the contents of choices are not displayed correctly when
 *   [Default: None] is set in [Show Choices] under certain conditions.
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Patch1 enabled?
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch2 enabled?
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch3 enabled?
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch4 enabled?
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch5 enabled?
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch6 enabled?
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc 不具合修正プラグイン
 * @author 木星ペンギン
 * @url
 *
 * @help [2021/03/05]
 * このプラグインはRPGツクールMZ用です。
 * 
 * 1.ダメージスプライトの更新が２度行われている不具合の修正
 * 2.[文章の表示]でウェイト中にもスキップが行える機能の追加と
 *   スキップ中はウェイトをしない機能の追加
 * 3.移動ルートの実行を可能な限り１フレーム以内に行うように修正
 * 4.[文章の表示]で文章の最後がウェイトだった場合、無視される不具合の修正
 * 5.不要なフィルターを解放するように修正
 * 6.特定の条件で[選択肢の表示]で[デフォルト:なし]に設定すると
 *   選択肢の内容が正しく表示されない不具合の修正
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @param Patch1 enabled?
 *      @text 修正1の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch2 enabled?
 *      @text 修正2の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch3 enabled?
 *      @text 修正3の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch4 enabled?
 *      @text 修正4の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch5 enabled?
 *      @text 修正5の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 *  @param Patch6 enabled?
 *      @text 修正6の有効/無効
 *      @desc 
 *      @type boolean
 *      @default true
 * 
 */

(() => {
    'use strict';

    const pluginName = 'MPP_PatchMZ';

    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_patch1enabled = parameters['Patch1 enabled?'] === 'true';
    const param_patch2enabled = parameters['Patch2 enabled?'] === 'true';
    const param_patch3enabled = parameters['Patch3 enabled?'] === 'true';
    const param_patch4enabled = parameters['Patch4 enabled?'] === 'true';
    const param_patch5enabled = parameters['Patch5 enabled?'] === 'true';
    const param_patch6enabled = parameters['Patch6 enabled?'] === 'true';

    /*
     * 1.ダメージスプライトの更新が２度行われている不具合の修正
     */
    if (param_patch1enabled) {

        // overwrite
        Sprite_Battler.prototype.updateDamagePopup = function() {
            this.setupDamagePopup();
            if (this._damages.length > 0) {
                // for (const damage of this._damages) {
                //     damage.update();
                // }
                if (!this._damages[0].isPlaying()) {
                    this.destroyDamageSprite(this._damages[0]);
                }
            }
        };

    }

    /*
     * 2.[文章の表示]でウェイト中にもスキップが行える機能の追加と
     *   スキップ中はウェイトをしない機能の追加
     */
    if (param_patch2enabled) {

        const _Window_Message_updateWait = Window_Message.prototype.updateWait;
        Window_Message.prototype.updateWait = function() {
            if (_Window_Message_updateWait.apply(this, arguments)) {
                this.updateShowFast();
                return !this._showFast;
            }
            return false;
        };

        const _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
        Window_Message.prototype.processEscapeCharacter = function(code, textState) {
            if ((code === '.' || code === '|') && this._showFast) {
                return;
            }
            _Window_Message_processEscapeCharacter.apply(this, arguments);
        };

    }

    /*
     * 3.移動ルートの実行を可能な限り１フレーム以内に行うように修正
     */
    if (param_patch3enabled) {

        const _Game_Character_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
        Game_Character.prototype.updateRoutineMove = function() {
            do {
                _Game_Character_updateRoutineMove.apply(this, arguments);
            } while (this.isRoutineMoveContinue());
        };

        Game_Character.prototype.isRoutineMoveContinue = function() {
            return (
                this._moveRouteForcing &&
                this.isMovementSucceeded() &&
                this.isStopping() &&
                this._waitCount === 0 &&
                this._moveRouteIndex > 0
            );
        };

        const _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
        Game_Character.prototype.processMoveCommand = function(command) {
            _Game_Character_processMoveCommand.apply(this, arguments);
            if (command.code === Game_Character.ROUTE_WAIT) {
                this._waitCount++;
            }
        };

    }

    /*
     * 4.[文章の表示]で文章の最後がウェイトだった場合、無視される不具合の修正
     */
    if (param_patch4enabled) {

        const _Window_Message_isEndOfText = Window_Message.prototype.isEndOfText;
        Window_Message.prototype.isEndOfText = function(textState) {
            return (
                this._waitCount === 0 &&
                _Window_Message_isEndOfText.apply(this, arguments)
            );
        };

    }

    /*
     * 5.不要なフィルターを解放するように修正
     */
    if (param_patch5enabled) {

        Sprite.prototype._removeColorFilter = function() {
            if (this._colorFilter) {
                this.filters.remove(this._colorFilter);
                this._colorFilter = null;
            }
        };

        const _Sprite__updateColorFilter = Sprite.prototype._updateColorFilter;
        Sprite.prototype._updateColorFilter = function() {
            if (
                this._hue === 0 &&
                this._blendColor[3] === 0 &&
                this._colorTone.equals([0, 0, 0, 0])
            ) {
                this._removeColorFilter();
            } else {
                _Sprite__updateColorFilter.apply(this, arguments);
            }
        };

    }

    /*
     * 6.特定の条件で[選択肢の表示]で[デフォルト:なし]に設定すると
     *   選択肢の内容が正しく表示されない不具合の修正
     */
    if (param_patch6enabled) {

        const _Window_ChoiceList_selectDefault = Window_ChoiceList.prototype.selectDefault
        Window_ChoiceList.prototype.selectDefault = function() {
            this.scrollTo(0, 0);
            _Window_ChoiceList_selectDefault.apply(this, arguments);
        };

    }

})();
