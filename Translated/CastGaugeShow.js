/*:
 * @plugindesc Change the formula for chanting time based on launch speed (useful in progress time combat)
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help CastGaugeShow.js
 * 
 * @param CastGaugeColor1
 * @text gaugeColor1
 * @desc gaugeColor1
 * @type number
 * @default 14
 * 
 * @param CastGaugeColor2
 * @text gaugeColor2
 * @desc gaugeColor2
 * @type number
 * @default 21
 * 
 * @param ActionGaugeColor1
 * @text gaugeColor1
 * @desc gaugeColor1
 * @type number
 * @default 18
 * 
 * @param ActionGaugeColor2
 * @text gaugeColor2
 * @desc gaugeColor2
 * @type number
 * @default 10
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc プログレス戦闘でキャストタイムをゲージ表示する
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @param CastGaugeColor1
 * @text 詠唱中の色1
 * @desc 表示色のシステムID
 * @type number
 * @default 14
 * 
 * @param CastGaugeColor2
 * @text 詠唱中の色2
 * @desc 表示色のシステムID
 * @type number
 * @default 21
 * 
 * @param ActionGaugeColor1
 * @text アクション中の色1
 * @desc 表示色のシステムID
 * @type number
 * @default 18
 * 
 * @param ActionGaugeColor2
 * @text アクション中の色2
 * @desc 表示色のシステムID
 * @type number
 * @default 10
 *
 * @help CastGaugeShow.js
 * 
 * このプラグインはタイムプログレス戦闘でのみ意味を成します。
 * 
 * デフォルトでは
 * 詠唱速度を0未満にすると詠唱が発生し、
 * [発動速度の絶対値の平方根] / [敏捷性の平方根+1]
 * が必要ゲージ量となります。（1で通常のターンが回ってくる速度と同一）

 * 
 * それを
 * [発動速度の絶対値] * [castSpeedRate]
 * に変更します
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 */
(() => {

    const parameters = PluginManager.parameters('CastGaugeShow');
    const castGaugeColor1 = Number(parameters['CastGaugeColor1'] || 14);
    const castGaugeColor2 = Number(parameters['CastGaugeColor2'] || 21);
    const actionGaugeColor1 = Number(parameters['ActionGaugeColor1'] || 18);
    const actionGaugeColor2 = Number(parameters['ActionGaugeColor2'] || 10);
  
    Game_Battler.prototype.isTpbCasting = function() {
        return this._tpbState === "casting";
    };
    Game_Battler.prototype.tpbCastTime = function() {
        return this._tpbCastTime;
    };
    Sprite_Gauge._castMode = false;
    const Sprite_Gauge_initialize = Sprite_Gauge.prototype.initialize;
    Sprite_Gauge.prototype.initialize = function() {
        Sprite_Gauge_initialize.call(this);
        this._castMode = false;
        this._attackMode = false;
    };

    const Sprite_Gauge_update = Sprite_Gauge.prototype.update;

    Sprite_Gauge.prototype.update = function() {
        this._castMode = this._battler.isTpbCasting() | this._battler.isTpbReady() ;
        this._actionMode = this._battler.isActing();
        Sprite_Gauge_update.call(this);
    };

    Sprite_Gauge.prototype.currentValue = function() {
        if (this._battler) {
            switch (this._statusType) {
                case "hp":
                    return this._battler.hp;
                case "mp":
                    return this._battler.mp;
                case "tp":
                    return this._battler.tp;
                case "time":
                    if(this._castMode){
                        return this._battler.tpbCastTime();
                    }else{
                        return this._battler.tpbChargeTime();  
                    }
                    
            }
        }
        return NaN;
    };
    Sprite_Gauge.prototype.gaugeBackColor = function() {
        switch (this._statusType) {
            case "time":
                if(this._castMode || this._actionMode){
                    return ColorManager.ctGaugeColor1();
                }else{
                    return ColorManager.gaugeBackColor();
                }
            default:
                return ColorManager.gaugeBackColor();
        }
        
    };
    
    Sprite_Gauge.prototype.gaugeColor1 = function() {
        switch (this._statusType) {
            case "hp":
                return ColorManager.hpGaugeColor1();
            case "mp":
                return ColorManager.mpGaugeColor1();
            case "tp":
                return ColorManager.tpGaugeColor1();
            case "time":
                if(this._actionMode){
                    return ColorManager.textColor(actionGaugeColor1);
                }else if(this._castMode){
                    return ColorManager.textColor(castGaugeColor1);
                }else{
                    return ColorManager.ctGaugeColor1();
                }
            default:
                return ColorManager.normalColor();
        }
    };

    Sprite_Gauge.prototype.gaugeColor2 = function() {
        switch (this._statusType) {
            case "hp":
                return ColorManager.hpGaugeColor2();
            case "mp":
                return ColorManager.mpGaugeColor2();
            case "tp":
                return ColorManager.tpGaugeColor2();
            case "time":
                if(this._actionMode){
                    return ColorManager.textColor(actionGaugeColor2);
                }else if(this._castMode){
                    return ColorManager.textColor(castGaugeColor2);
                }else{
                    return ColorManager.ctGaugeColor2();
                }
            default:
                return ColorManager.normalColor();
        }
    };
})();
