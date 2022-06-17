//=============================================================================
// YKP_MenuViewFormation.js
//
// Copyright (c) 2022 YukiKamijo
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

var Imported = Imported || {};
Imported.YKP_MenuViewFormation = true;

var YukiKP = YukiKP || {};
YukiKP.MenuViewFormation = YukiKP.MenuViewFormation || {};

/*:
 * @plugindesc メニュー画面「並び替え」の表示切り替えする機能を追加するプラグイン。
 * @target MZ
 * @author YukiKamijo
 * 
 * @param FormationViewSwitchId
 * @desc 「並べ替え」の表示を切り替えるスイッチID。
 * @text 「並べ替え」表示切替スイッチID
 * @type number
 * @default 0
 * 
 * @command FormationEnabled
 * @desc メニュー画面の「並べ替え」を表示状態にします。
 * @text 「並べ替え」を表示
 * 
 * @command FormationDisabled
 * @desc メニュー画面の「並べ替え」を非表示状態にします。
 * @text 「並べ替え」を非表示
 *
 * @help
 * メニュー画面「並び替え」の表示切り替えする機能を追加するプラグインです。
 * 
 * 【使い方】
 * １：このプラグインが操作するスイッチIDを指定しておく。
 * ２：プラグインコマンドを切り替えたいタイミングで実行する。
 * 　　もしくは、切り替えスイッチを直接変更する。
 * 
 * プラグインコマンドの呼び出しによって、
 * メニュー画面の「並び替え」を表示・非表示させることができます。
 * 
 * 【注意】
 * システム設定で「並び替え」が無効になっている場合はプラグインが動作しません。
 * 
 * ニューゲームの時はスイッチの状態が「非表示」になっています。
 * 最初から表示させる場合は、自動実行のイベントでスイッチをONにしてください。
 *
 * plugin version 1.0.0
 */

(function() {
    'use strict';
    const pluginName = 'YKP_MenuViewFormation';
    const parameters = PluginManager.parameters(pluginName);

    const _fomationSwitchId  = Number(parameters['FormationViewSwitchId']);

    PluginManager.registerCommand(pluginName, 'FormationEnabled', args => {
        $gameSwitches.setValue(_fomationSwitchId, true);
    });
    
    PluginManager.registerCommand(pluginName, 'FormationDisabled', args => {
        $gameSwitches.setValue(_fomationSwitchId, false);
    });

    YukiKP.Window_MenuAddFormationCommand = Window_MenuCommand.prototype.addFormationCommand;
    Window_MenuCommand.prototype.addFormationCommand = function() {
        if ($gameSwitches.value(_fomationSwitchId)) {
            YukiKP.Window_MenuAddFormationCommand.call(this);
        }
    };
})();