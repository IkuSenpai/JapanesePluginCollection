
/*:
 * @plugindesc A plugin that sets up four or more drops in the Enemy.
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA
 *
 * @help MakeDropItem.js
 * 
 * <AddDropItems:[{kind:1,dataId:22,denominator:1}]>
 * <AddDropItems:[{kind:1,dataId:22,denominator:1},{kind:2,dataId:12,denominator:3}]>
 * 
 * MIT License Copyright (c) 2020 RYBA
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
/*:ja
 * @plugindesc エネミーに4つ以上のドロップを設定するプラグイン
 * @target MZ
 * @url https://github.com/RYBA549/RYBA_RPGMakerMZ
 * @author RYBA(熱帯魚)
 *
 * @help MakeDropItem.js
 * 
 * kind = 1 : アイテム
 * kind = 2 : 武器
 * kind = 3 : 防具
 * 
 * dataIdはアイテムのID
 * 
 * denominatorは分母、3にすると1/3でドロップする。1にすると確定
 * 
 * なお、配列形式の記述でいくつでも設定可能
 * 
 * 設定例
 * <AddDropItems:[{kind:1,dataId:22,denominator:1}]>
 * <AddDropItems:[{kind:1,dataId:22,denominator:1},{kind:2,dataId:12,denominator:3}]>
 *
 * 利用規約：
 *  これにより、このソフトウェアおよび関連するドキュメントファイル（以下「ソフトウェア」）のコピーを取得するすべての人に対して、
 * 使用、コピー、変更、マージの権利を含むがこれに限定されない制限なしでソフトウェアを扱うことが許可されます。
 * 次の条件に従って、本ソフトウェアのコピーを発行、配布、サブライセンス、および/または販売し、
 * 本ソフトウェアの提供を受けた者がそうすることを許可する。
 * 
 * 要するに割と自由です。
 */

(() => {
const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
  _Scene_Boot_start.call(this);
  processAutoFreeActions();
};

const processAutoFreeActions = () => {
  for (const enemy of $dataEnemies) {
    if (!enemy) {
      continue;
    }
    if (enemy.meta.AddDropItems) {
        const array = eval(enemy.meta.AddDropItems);
        enemy.addDropItems = Array.isArray(array) ? array : null;
    } else {
        enemy.addDropItems = null;
    }
  }
};

Game_Enemy.prototype.makeDropItems = function() {
    const rate = this.dropItemRate();
    let result = this.enemy().dropItems.reduce((r, di) => {
        if (di.kind > 0 && Math.random() * di.denominator < rate) {
            return r.concat(this.itemObject(di.kind, di.dataId));
        } else {
            return r;
        }
    }, []);

    const memoDropItems = this.enemy().addDropItems;

    if(memoDropItems){
        result = memoDropItems.reduce((r, di) => {
            if (di.kind > 0 && Math.random() * di.denominator < rate) {
                return r.concat(this.itemObject(di.kind, di.dataId));
            } else {
                return r;
            }
        }, result);
    }

    return result;
};

})();