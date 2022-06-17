
/*:
 * @plugindesc Change the lower limit of the Enemy's action rating.
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 * 
 * @param enemyRatingValue
 * @text Lower Rating Limit for Enemy Behavior
 * @desc Normally an action up to a rating of 2 is chosen, but we'll change that
 * @type number
 * @max 8
 * @min 0
 * @default 2
 *
 * @help EnemyActionRating.js
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc エネミーの行動レーティングの下限を変更します
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 * 
 * @param enemyRatingValue
 * @text エネミー行動のレーティング下限
 * @desc 通常はレーティング2の差までの行動が選ばれますが、それを変更します
 * @type number
 * @max 8
 * @min 0
 * @default 2
 *
 * @help EnemyActionRating.js
 * 
 * このプラグインはエネミーの行動レーティングの下限を変更します
 * 
 * 2が標準の設定で3にすると
 * 差が1だと3/4、差が2だと2/4、差が3だと1/4
 * 
 * 設定をnにすると
 * 差が1だと(n-1)/(n)、差が2だと(n-2)/(n)、差が3だと(n-3)/(n)
 * 
 * という風に行動選択ＡＩが変化します
 * 
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 * 
 * 要するに割と自由です
 */
(() => {
    const parameters = PluginManager.parameters('EnemyActionRating');
    const enemyRatingValue = Number(parameters['enemyRatingValue'] || 2);
Game_Enemy.prototype.selectAllActions = function(actionList) {
    const ratingMax = Math.max(...actionList.map(a => a.rating));
    console.log(enemyRatingValue);
    const ratingZero = ratingMax - 1 - enemyRatingValue;
    actionList = actionList.filter(a => a.rating > ratingZero);
    for (let i = 0; i < this.numActions(); i++) {
        this.action(i).setEnemyAction(
            this.selectAction(actionList, ratingZero)
        );
    }
};
})();
