//=============================================================================
// AdditionalDescription.js
// ----------------------------------------------------------------------------
// (C)2016 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version.
// 2.0.2 2021/05/16 Annotation added.
// 2.0.1 2020/10/17 Removed keycode specification
// Created English help
// 2.0.0 2020/10/17 Added a setting to show more additional text when initially displayed
// Supported plugin type specification feature
// refactored as MZ version
// 1.1.4 2017/01/12 Fixed an issue that might cause an error if the memo field value is set to empty
// 1.1.3 2016/09/20 Added escaping to allow displaying ">" and "<" in description text
// 1.1.2 2016/09/07 Fixed an issue where switching messages were not displayed when there were consecutive items with the same description
// 1.1.1 2016/09/06 Fixed to only operate when the parent window is active
// 1.1.0 2016/09/01 Added the ability to switch by mouse or touch.
// Fixed a bug that some drawing content remains when canceling while switching
// 1.0.0 2016/09/01 First version
// ----------------------------------------------------------------------------
// [Blog]: https://triacontane.blogspot.jp/
// [Twitter]: https://twitter.com/triacontane/
// [GitHub] : https://github.com/triacontane/
//=============================================================================

/*:
 * @plugindesc AdditionalDescription
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AdditionalDescription.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author triacontane
 * @translator NamiBoops
 *
 * @param ButtonName
 * @desc The name of the button to switch help.
 * @default shift
 * @type combo
 * @option shift
 * @option control
 * @option tab
 *
 * @param ChangePage
 * @desc Page change sign string that appears in the lower right corner of the window.
 * @default Push Shift
 * @param ValidTouch
 * @param ValidTouch
 * @desc You can also switch windows by touching or left-clicking the help window.
 * @default true
 * @type boolean
 *
 * @param InitialReverse
 * @desc The page is displayed in the initial view with the pages switched.
 * @default false
 * @type boolean
 * * @help You can add a second page to the help page.
 * @help You can add a second page to the help window.
 * @help You can add a second page to the help window * to display any information you want.
 * @default false * @type boolean * * @help You can add a second page to the help window * to display any information you want.
 *
 * Please write the following in the notes section of the item/skill database.
 * <ADDescription:sampleText> # The string "sampleText" is displayed.
 * <ADScript:sampleScript> # The evaluation result of "sampleScript" is displayed.
 *
 * In both cases, a set of control characters are available.
 * In addition, the target data can be referenced in the script by a local variable called "item".
 * In addition, the target data can be referenced in the script by a local variable called "item".
 */

/*:en
 * @plugindesc help description add plugin
 * @target MZ
 * @url https://github.com/triacontane/RPGMakerMV/tree/mz_master/AdditionalDescription.js
 * @base PluginCommonBase
 * @orderAfter PluginCommonBase
 * @author Triacontan
 *
 * @param ButtonName
 * @text Button name.
 * @desc Button name to switch help.
 * @default shift
 * @type combo
 * @option shift
 * @option control
 * @option tab
 *
 * @param ChangePage
 * @text ChangePage
 * @desc The page change sign string displayed in the lower right corner of the window. Control characters can be used.
 * @default Push Shift
 *
 * @param ValidTouch
 * @text Valid touch operation.
 * @desc You can also switch windows by touching or left-clicking the help window.
 * @default true
 * @type boolean
 *
 * @param InitialReverse
 * @text InitialReverse * * @text InitialReverse
 * @desc Initially displayed with the page switched.
 * @default false
 * @type boolean
 *
 * @help Add a second page to the help window to show any information you want.
 * * @desc Switched by the specified key.
 *
 * Write the following in the memo field of the item/skill database.
 * <ADDescription:sampleText> # The string "sampleText" will be displayed.
 * <ADDescription:sampleText> # Same as above.
 * <ADScript:sampleScript> # The evaluation result of "sampleScript" is displayed.
 * <ADScript:sampleScript> # Same as above
 *
 * Both of them can use a set of control characters.
 * Also, you can refer to the target data by a local variable "item" in the script.
 * You can dynamically display database information such as consumption MP and price.
 *
 * There is no plugin command in this plugin.
 *
 * Terms of use:.
 * You can modify and redistribute this plugin without permission of the author, and there is no restriction on the form of use (commercial, 18 prohibited use, etc.).
 * You can modify and redistribute this plugin without permission of the author, and there are no restrictions on the type of use.
 * This plugin is now yours.
 */

(function() {
    'use strict';

    const script = document.currentScript;
    const param = PluginManagerEx.createParameter(script);

    //=============================================================================
    // Window_Selectable.
    // Pass a reference to itself to the help window.
    //=============================================================================
    const _Window_Selectable_setHelpWindow = Window_Selectable.prototype.setHelpWindow;
    Window_Selectable.prototype.setHelpWindow = function(helpWindow) {
        _Window_Selectable_setHelpWindow.apply(this, arguments);
        this._helpWindow.setParentWindow(this);
    };

    //=============================================================================
    // Window_Help
    // Keep and display additional help information
    //=============================================================================
    const _Window_Help_initialize = Window_Help.prototype.initialize;
    Window_Help.prototype.initialize = function(numLines) {
        _Window_Help_initialize.apply(this, arguments);
        this._parentWindows = [];
    };

    const _Window_Help_setItem = Window_Help.prototype.setItem;
    Window_Help.prototype.setItem = function(item) {
        this._anotherText = null;
        this._item = item;
        this._itemExist = true;
        if (item) {
            this.setAnother();
        }
        _Window_Help_setItem.apply(this, arguments);
        this._originalText = this._text;
        this._anotherTextVisible = false;
        this._item = null;
        this._itemExist = false;
        if (param.InitialReverse && this._anotherText) {
            this.toggleDesc();
        }
    };

    const _Window_Help_setText = Window_Help.prototype.setText;
    Window_Help.prototype.setText = function(text) {
        if (this._text === text) {
            this.refresh();
        }
        _Window_Help_setText.apply(this, arguments);
    };

    Window_Help.prototype.setParentWindow = function(parentWindow) {
        if (!this._parentWindows.contains(parentWindow)) {
            this._parentWindows.push(parentWindow);
        }
    };

    Window_Help.prototype.setAnother = function() {
        this.setAnotherDescription();
        if (this._anotherText === null) {
            this.setAnotherScript();
        }
    };

    Window_Help.prototype.setAnotherScript = function() {
        const item = this._item;
        const value = PluginManagerEx.findMetaValue(item, ['ADScript', 'ADScript']);
        if (value) {
            try {
                this._anotherText = String(eval(value));
            } catch (e) {
                console.error(e.stack);
            }
        }
    }

    Window_Help.prototype.setAnotherDescription = function() {
        const item = this._item;
        const value = PluginManagerEx.findMetaValue(item, ['AD Description', 'ADDescription']);
        if (value) {
            this._anotherText = String(value);
        }
    }

    const _Window_Help_refresh = Window_Help.prototype.refresh;
    Window_Help.prototype.refresh = function() {
        _Window_Help_refresh.apply(this, arguments);
        this.refreshChangePage();
    };

    Window_Help.prototype.refreshChangePage = function() {
        if (param.ChangePage && this._anotherText && this._itemExist) {
            const width = this.drawTextEx(param.ChangePage, 0, this.contents.height);
            const x = this.contentsWidth() - width;
            const y = this.contentsHeight() - this.lineHeight();
            this.drawTextEx(param.ChangePage, x, y);
        } else {
            this._anotherText = null;
            this._originalText = null;
        }
    };

    const _Window_Help_update = Window_Help.prototype.update;
    Window_Help.prototype.update = function() {
        if (this.hasOwnProperty('update')) {
            _Window_Help_update.apply(this, arguments);
        } else {
            Window_Base.prototype.update.call(this); }
        }
        if (this.isOpen() && this.visible) {
            this.updateAnotherDesc();
        }
    }

    Window_Help.prototype.updateAnotherDesc = function() {
        if (this._anotherText && this.isAnotherTriggered() && this.isAnyParentActive()) {
            SoundManager.playCursor();
            this.toggleDesc();
        }
    };

    Window_Help.prototype.toggleDesc = function() {
        this._anotherTextVisible = !
        this._itemExist = true;
        this.setText(this._anotherTextVisible ? this._anotherText : this._originalText);
        this._itemExist = false;
    };

    Window_Help.prototype.isAnotherTriggered = function() {
        return Input.isTriggered(param.ButtonName) ||
            (this.isTouchedInsideFrame() && TouchInput.isTriggered() && param.ValidTouch);
    };

    Window_Help.prototype.isAnyParentActive = function() {
        return this._parentWindows.some(function(win) {
            return win.active;
        });
    };

    Window_Help.prototype.isTouchedInsideFrame = Window_Selectable.prototype.isTouchedInsideFrame;
})();

