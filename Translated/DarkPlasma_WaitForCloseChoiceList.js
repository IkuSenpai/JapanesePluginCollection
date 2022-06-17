// DarkPlasma_WaitForCloseChioceList 1.0.3
// Copyright (c) 2020 DarkPlasma
// This software is released under the MIT license.
// http://opensource.org/licenses/mit-license.php

/**
 * 2021/07/05 1.0.3 MZ 1.3.2に対応
 * 2021/06/22 1.0.2 サブフォルダからの読み込みに対応
 * 2020/09/08 1.0.1 rollup構成へ移行
 * 2020/08/25 1.0.0 公開
 */

/*:ja
 * @plugindesc シーンチェンジの際に選択肢ウィンドウが閉じるのを待つ
 * @author DarkPlasma
 * @license MIT
 *
 * @target MZ
 * @url https://github.com/elleonard/DarkPlasma-MZ-Plugins/tree/release
 *
 * @help
 * version: 1.0.3
 * RPGツクールMZでは選択肢ウィンドウの選択肢が多数ある場合、
 * 新しいシーンのウィンドウの背後に選択肢ウィンドウの残骸が残ります。
 *
 * 本プラグインではシーンチェンジの際に選択肢ウィンドウが閉じきる前に
 * 別シーンのウィンドウが開いてしまうのを防ぎます。
 */

(() => {
  'use strict';

  const _Window_Message_isClosing = Window_Message.prototype.isClosing;
  Window_Message.prototype.isClosing = function () {
    if (this._choiceListWindow && this._choiceListWindow.isClosing()) {
      return true;
    }
    return _Window_Message_isClosing.call(this);
  };
})();
