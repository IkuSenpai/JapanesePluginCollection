//=============================================================================
// YKP_Core.js
//
// Copyright (c) 2019 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_Core = true;

var YukiKP = YukiKP || {};
YukiKP.Core = YukiKP.Core || {};

/*:
 * @plugindesc YukiKamijoPluginの基底プラグイン。
 * @target MZ
 * @author YukiKamijo
 *
 * @help YKP_Core.js
 * YukiKamijo 制作プラグインの基底プラグインです。
 * 一部のプラグインを除いて、このプラグインが必要です。
 * YKP_XxxxxXxxxx.jsの一番上に置いてください。
 *
 *
 *
 * plugin version 1.0.0
 */

(() => {
    // プラグイン引数の設定
    const pluginName = "YKP_Core";
})();

window.$gameYKPObjectData = window.$gameYKPObjectData || {};

YukiKP.Core.createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    YukiKP.Core.createGameObjects.call(this);
    $gameYKPObjectData = new Game_YKPObjectData();
};

YukiKP.Core.makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = YukiKP.Core.makeSaveContents.call(this);
    contents.YKPObjectData = $gameYKPObjectData;
    return contents;
};
YukiKP.Core.extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    YukiKP.Core.extractSaveContents.call(this, contents);
    $gameYKPObjectData = contents.YKPObjectData;
};

YukiKP.Core.processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    YukiKP.Core.processEscapeCharacter.apply(this, arguments);
    switch (code) {
    case 'N':
        this.processNewLine(textState);
        textState.index--;
        break;
    }
};

function Game_YKPObjectData() {
    this.initialize.apply(this, arguments);
}

Game_YKPObjectData.prototype.initialize = function() {
};

// string command
YukiKP.Core.strCommand = function(str) {
    return Function('return ' + str)();
};

// string => boolean
YukiKP.Core.strBoolean = function(str) {
    return Function('return ' + str + ' === true')();
};

// string lower
YukiKP.Core.strLower = function(str) {
    if ('teststr' !== 'TestStr'.toLowerCase()) {
        return str.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);});
    } else {
        return str.toLowerCase();
    }
};

// value search is key
YukiKP.Core.valueSearchKey = function(obj, value) {
    return Object.keys(obj).filter(function(k) {return obj[k] == value })[0];
};

// plugin command enable or disable
YukiKP.Core.checkEnable = function(state) {
    return state === 'enable';
};

// sort number ascending
YukiKP.Core.sortNumAsc = function(a, b) {
    return a - b;
};

// sort number descending
YukiKP.Core.sortNumDesc = function(a, b) {
    return b - a;
};

// sort boolean descending
YukiKP.Core.sortBoolDesc = function(a, b) {
    return a && !b;
};

YukiKP.Core.drawIcon = function(index) {
    return '\x1bI[' + index + ']';
};

// convert message
YukiKP.Core.convertMessage = function(str) {
    switch (str) {
    case 'mhp':
        return TextManager.param(0);
    case 'hp':
        return TextManager.basic(2);
    case 'mmp':
        return TextManager.param(1);
    case 'mp':
        return TextManager.basic(4);
    case 'atk':
        return TextManager.param(2);
    case 'def':
        return TextManager.param(3);
    case 'mat':
        return TextManager.param(4);
    case 'mdf':
        return TextManager.param(5);
    case 'agi':
        return TextManager.param(6);
    case 'luk':
        return TextManager.param(7);
    }
    return null;
};

// convert paramer number
YukiKP.Core.convertParamNum = function(str) {
    switch (str) {
    case 'mhp':
        return 0;
    case 'mmp':
        return 1;
    case 'atk':
        return 2;
    case 'def':
        return 3;
    case 'mat':
        return 4;
    case 'mdf':
        return 5;
    case 'agi':
        return 6;
    case 'luk':
        return 7;
    }
    return null;
};

YukiKP.Core.convertDatabase = function(type) {
    switch (type) {
        case 0:
        case '0':
        case 'i':
            return $dataItems;
        case 1:
        case '1':
        case 'w':
            return $dataWeapons;
        case 2:
        case '2':
        case 'a':
            return $dataArmors;
    }
    return null;
};

YukiKP.Core.convertItemtype = function(type) {
    switch (type) {
        case 0:
        case '0':
            return 'items';
        case 1:
        case '1':
            return 'weapons';
        case 2:
        case '2':
            return 'armors';
    }
    return null;
};
