// --------------------------------------------------------------------------
// 
// ShiftDamagePopup.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2020/08/21 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc 多段攻撃時のダメージポップアップを整列するプラグイン
 * @author kotonoha*
 * @url https://aokikotori.com/
 * @help ツクールMZで多段攻撃を行った際、ダメージポップアップが一撃ずつ
 * ズレて表示されていきますが、それらを規則正しく整列させるプラグインです。
 *
 * 改変自由、商用利用可能です。
 * 作者名のクレジットや利用報告は不要です。ご自由にどうぞ！
 * 
 * @param Sprite_x
 * @text 二段目以降のダメージ表示（X軸）
 * @desc 二段目以降のダメージ表示位置（X軸）。数値を大きくすると斜めにズレます。
 * @default 0
 * @type number
 *
 * @param Sprite_y
 * @text 二段目以降のダメージ表示（Y軸）
 * @desc 二段目以降のダメージ表示位置（X軸）。数値を大きくすると間隔が広がります。
 * @default -24
 * @type number
 */

(function() {

	const pluginName = 'ShiftDamagePopup';

    const parameters = PluginManager.parameters(pluginName);
    const Sprite_x = Number(parameters['Sprite_x'] || 0);
    const Sprite_y = Number(parameters['Sprite_y'] || -24);

	Sprite_Battler.prototype.createDamageSprite = function() {
	    const last = this._damages[this._damages.length - 1];
	    const sprite = new Sprite_Damage();
	    if (last) {
	        sprite.x = last.x + Sprite_x;
	        sprite.y = last.y + Sprite_y;
	    } else {
	        sprite.x = this.x + this.damageOffsetX();
	        sprite.y = this.y + this.damageOffsetY();
	    }
	    sprite.setup(this._battler);
	    this._damages.push(sprite);
	    this.parent.addChild(sprite);
	};


})();