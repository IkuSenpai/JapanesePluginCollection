
/*:
 * @plugindesc The number of friendly battlers displayed in the combat window and the width of the party actor command window (appearance only).
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 * 
 * @param statusMaxCols
 * @text Specifies the width of the party command actor command window
 * @desc Specifies the width of the party command actor command window
 * @type number
 * @default 2
 * 
 * @param actorCommandWindowWidth
 * @text Specifies the width of the party command actor command window
 * @desc Specifies the width of the party command actor command window
 * @type number
 * @max 1000
 * @min 1
 * @default 516
 * 
 * @param actorCommandMaxCols
 * @text Determines the number of buttons in the Party Command Actor Command window.
 * @desc Determines the number of buttons in the Party Command Actor Command window.
 * @type number
 * @max 10
 * @min 1
 * @default 2
 *
 * @help WindowBattleStataus.js
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc 戦闘中のウィンドウで味方バトラーの表示数とパーティ・アクターコマンドウィンドウの横幅を指定します（見た目のみ）
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @param statusMaxCols
 * @text 表示するバトルキャラクターの最大数
 * @desc デフォルトは4です。この設定は表示する人数だけを変更します。
 * @type number
 * @default 2
 * 
 * @param actorCommandWindowWidth
 * @text パーティコマンド・アクターコマンドウィンドウの横幅を指定します
 * @desc デフォルトは192です。バトルキャラクター1人分の情報が154なので+154ずつするのを進めます。
 * @type number
 * @max 1000
 * @min 1
 * @default 516
 * 
 * @param actorCommandMaxCols
 * @text パーティコマンド・アクターコマンドウィンドウのボタン配置数を決定します
 * @desc デフォルトは1です。2にすると1列に2ボタン表示されます
 * @type number
 * @max 10
 * @min 1
 * @default 2
 *
 * @help WindowBattleStataus.js
 * 
 * statusMaxCols
 * この設定は「表示する人数だけ」を変更します。
 * デフォルトは4です。
 * ちなみに戦闘中だけステータスが見えないだけで普通に動かせます。
 * パーティにはいるけど戦闘中はステータス表示しない仕様となります。
 * 自動戦闘を駆使すれば戦闘中のみパーティとして呼び出せる召喚獣的なことができるかもしれません。
 * 
 * actorCommandWindowWidth
 * パーティ・コマンドウィンドウの横幅を指定します。
 * デフォルトは4人表示時の時は192です。
 * 1バトラー辺り横幅154なので上記の設定に合わせて変更しましょう
 * 3人→346
 * 2人→500
 * 1人→654
 * 
 * actorCommandMaxCols
 * 1列に何ボタン表示するかを設定します。
 * デフォルトは1です。
 * 
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 * 
 * 要するに割と自由です
 */
(function() {
    const parameters = PluginManager.parameters('WindowBattleStataus');
    const statusMaxCols = Number(parameters['statusMaxCols'] || 2);
    const actorCommandWindowWidth = Number(parameters['actorCommandWindowWidth'] || 516)
    const actorCommandMaxCols = Number(parameters['actorCommandMaxCols' | 2]);
    //382,548
    //166

    Scene_Battle.prototype.partyCommandWindowRect = function() {
        const ww = actorCommandWindowWidth;
        const wh = this.windowAreaHeight();
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };
    Scene_Battle.prototype.actorCommandWindowRect = function() {
        const ww = actorCommandWindowWidth;
        const wh = this.windowAreaHeight();
        const wx = this.isRightInputMode() ? Graphics.boxWidth - ww : 0;
        const wy = Graphics.boxHeight - wh;
        return new Rectangle(wx, wy, ww, wh);
    };    

    Window_BattleStatus.prototype.maxCols = function() {
        return statusMaxCols;
    };
    Window_BattleStatus.prototype.maxItems = function() {
        let count = $gameParty.battleMembers().length;
        if( statusMaxCols < count){
            count = statusMaxCols;
        }
        return count;
        //return $gameParty.battleMembers().length;
    };
    Window_BattleStatus.prototype.preparePartyRefresh = function() {
        $gameTemp.clearBattleRefreshRequest();
        this._bitmapsReady = 0;
        let i = 0;
        for (const actor of $gameParty.members()) {
            if(i >= this.maxItems()){
                break;
            }
            const bitmap = ImageManager.loadFace(actor.faceName());
            bitmap.addLoadListener(this.performPartyRefresh.bind(this));
            i += 1;
        }
    };
    
    Window_BattleStatus.prototype.performPartyRefresh = function() {
        this._bitmapsReady++;
        if (this._bitmapsReady >= this.maxItems()) {
            this.refresh();
        }
    };

    Scene_Battle.prototype.statusWindowRect = function() {
        const extra = 10;
        let ww = Graphics.boxWidth - actorCommandWindowWidth;
        //616
        //154
        //ww  -= ww * 0.25 * (4 - statusMaxCols);
        const wh = this.windowAreaHeight() + extra;
        const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
        const wy = Graphics.boxHeight - wh + extra - 4;
        return new Rectangle(wx, wy, ww, wh);
    };

    Window_PartyCommand.prototype.maxCols = function() {
        return 2;
    };
    
    Window_PartyCommand.prototype.itemHeight = function() {
        return (Window_Scrollable.prototype.itemHeight.call(this) + 8) * 2;
    };
    
    Window_ActorCommand.prototype.maxCols = function() {
        return 2;
    };
    
    Window_ActorCommand.prototype.itemHeight = function() {
        return (Window_Scrollable.prototype.itemHeight.call(this) + 8) * 2;
    };

})();
