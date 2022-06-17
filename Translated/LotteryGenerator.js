//=============================================================================
// LotteryGenerator.js
//=============================================================================
// ----------------------------------------------------------------------------
// (C)2021 maguros
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
// Version
// 1.0.2 2021/03/21 景品名が取得できない不具合を修正
// 1.0.1 2021/03/21 排出個数に下限を設定
// 1.0.0 2021/03/20 初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/maguros3/
// [GitHub] : https://github.com/maguros/
//=============================================================================

/*:
 * @plugindesc 簡易ガチャプラグイン
 * @target MZ
 * @url https://github.com/maguros/RPGMakerMZ_Plugins/blob/master/SampleProject/js/plugins/LotteryGenerator.js
 * @author maguros
 * @base PluginCommonBase
 * 
 * @param RarityList
 * @text レアリティ一覧
 * @desc 景品に設定するレアリティの一覧です。
 * @type struct<Rarity>[]
 * 
 * @param PrizeList
 * @text 景品一覧
 * @desc ガチャの景品を設定します。
 * @type struct<Prize>[]
 * 
 * @param GotPrizeRarityVariable
 * @text 取得景品のレアリティ格納変数
 * @desc 取得した景品のレアリティを格納する変数です。
 * @type variable
 * @default 0
 * 
 * @param GotPrizeNameVariable
 * @text 取得景品名格納変数
 * @desc 取得した景品の名前を格納する変数です。
 * @type variable
 * @default 0
 * 
 * @param GotPrizeIconVariable
 * @text 取得景品アイコン格納変数
 * @desc 取得した景品のアイテムアイコンを格納する変数です。
 * @type variable
 * @default 0
 * 
 * @command START_LOTTERY
 * @text ガチャ実行
 * @desc ガチャを実行し、景品を取得します。
 * 
 * @arg confirmed_rarity
 * @text 確定レアリティ
 * @desc 確定で排出するレアリティです。確定レアリティ有効化がONの場合のみ機能します。
 * @type string
 * 
 * @arg is_confirmed_rarity
 * @text 確定レアリティ有効化
 * @desc 確定レアリティ設定の有効・無効を切り替えます。
 * @default false
 * @type boolean
 * 
 * @arg is_higher_confirmed_rarity
 * @text 設定レアリティ以上確定有効化
 * @desc 確定レアリティよりも排出個数が少ないレアリティも含めて確定対象にする設定の有効・無効を切り替えます。
 * @default false
 * @type boolean
 * 
 * @help 簡易的なガチャを実行するプラグインです。
 * レアリティ一覧、景品一覧の設定を行った上でプラグインコマンド「ガチャ実行」を
 * 実行するとレアリティ一覧で設定した排出個数に応じた割合でアイテムが排出されます。 
 * 
 * ■プラグインコマンド
 * 　ガチャ実行: ガチャを実行します。
 * 　　　　　　　排出されたアイテムは直接プレイヤーの所持品に追加されます。
 * 
 * 景品一覧に登録できる対象はアイテムのみですが、登録アイテムのメモ欄に
 * <LTG_CAT:カテゴリ名><LTGID:ID>を記載すると景品を指定した武器や防具に
 * 変換することができます。
 * 
 * メモ欄タグ記入例）
 * 　景品アイテムを武器ID:1の武器に変換したい場合:
 * 　　<LTG_CAT:weapon><LTG_ID:1>
 * 　景品アイテムを防具ID:1の防具に変換したい場合:
 * 　　<LTG_CAT:armor><LTG_ID:1>
 * 　景品アイテムをアイテムID:1のアイテムに変換したい場合:
 * 　　<LTG_CAT:item><LTG_ID:1>
 * 
 * このプラグインの利用にはベースプラグイン『PluginCommonBase.js』が必要です。
 * 『PluginCommonBase.js』は、RPGツクールMZのインストールフォルダ配下の
 * 以下のフォルダに格納されています。
 * dlc/BasicResources/plugins/official
 * 
 * 利用規約：
 * 　作者に無断で改変、再配布が可能で、利用形態（商用、18禁利用等）
 * 　についても制限はありません。
 */

/*~struct~Rarity:
 * 
 * @param RarityName
 * @text レアリティ名
 * @desc レアリティに設定する名称です。
 * 例) SSR、SRなど
 * @type string
 * 
 * @param Weight
 * @text 排出個数
 * @desc レアリティに対応する排出個数です。
 * @default 1
 * @type number
 * @min 1
 * 
 */

/*~struct~Prize:
 * 
 * @param Rarity
 * @text レアリティ
 * @desc 景品に設定するレアリティです。レアリティ一覧に設定したレアリティの中から入力してください。
 * @type string
 * 
 * @param Item
 * @text アイテム
 * @desc 景品として設定するアイテムです。
 * @type item
 *
 * @param PickSwitch
 * @text 排出条件スイッチ
 * @desc 景品排出の条件として設定するスイッチです。未設定の場合はスイッチONと同様の状態になります。
 * @type switch
 * 
 * @param PickupWeight
 * @text ピックアップ排出個数
 * @desc 数値を増やすと同一レアリティ内での排出率が上がります。
 * @default 1
 * @type number
 * @min 1
 * 
 */

(() => {
    'use strict';
    const _script = document.currentScript;
    const _param = PluginManagerEx.createParameter(_script);

    function randomChoice(weight_table) {
        const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

        const total_weight = weight_table.reduce((x, y) => x + y);
        let value = randomRange(1, total_weight);
        let index = -1;
        for (let i = 0; i < weight_table.length; ++i) {
            if (weight_table[i] >= value) {
                index = i;
                break;
            }
            value -= weight_table[i];
        }
        return index;
    }

    PluginManagerEx.registerCommand(_script, 'START_LOTTERY', function(args) {
        let rarity_list = [];
        if (args.is_confirmed_rarity) {
            if (args.is_higher_confirmed_rarity) {
                const confirmed_rarity = _param.RarityList.find(x => x.RarityName === args.confirmed_rarity);
                rarity_list = _param.RarityList.filter((x) => x.Weight <= confirmed_rarity.Weight);
            }
            else {
                rarity_list.push(_param.RarityList.find(x => x.RarityName === args.confirmed_rarity));
            }
        }
        else {
            rarity_list = _param.RarityList;
        }

        if (rarity_list.length === 0 || _param.PrizeList.length === 0) {
            $gameVariables.setValue(_param.GotPrizeRarityVariable, '不明なレアリティ');
            $gameVariables.setValue(_param.GotPrizeNameVariable, '不明なアイテム');
            return;
        }

        let rarity_weight_table = [];
        for (let i = 0; i < rarity_list.length; i++) {
            rarity_weight_table.push(rarity_list[i].Weight);
        }

        const rarity_index = randomChoice(rarity_weight_table);
        const got_rarity = (rarity_index !== -1) ? rarity_list[rarity_index].RarityName : null;
        if (!got_rarity) {
            $gameVariables.setValue(_param.GotPrizeRarityVariable, '不明なレアリティ');
            $gameVariables.setValue(_param.GotPrizeNameVariable, '不明なアイテム');
            return;
        }
        
        function getPrizeList(prize) {
            if (prize.PickSwitch > 0 && !$gameSwitches.value(prize.PickSwitch)) {
                return false;
            }
            return prize.Rarity === got_rarity;
        }
        const prize_list = _param.PrizeList.filter(getPrizeList);
        if (prize_list.length === 0) {
            $gameVariables.setValue(_param.GotPrizeRarityVariable, got_rarity);
            $gameVariables.setValue(_param.GotPrizeNameVariable, '不明なアイテム');
            return;
        }

        let prize_weight_table = [];
        for (let i = 0; i < prize_list.length; i++) {
            prize_weight_table.push(prize_list[i].PickupWeight);
        }

        const prize_index = randomChoice(prize_weight_table);
        const got_prize = (prize_index !== -1) ? $dataItems[prize_list[prize_index].Item] : null;
        if (!got_prize) {
            $gameVariables.setValue(_param.GotPrizeRarityVariable, got_rarity);
            $gameVariables.setValue(_param.GotPrizeNameVariable, '不明なアイテム');
            return;
        }
    
        let result_prize = null;
        const change_category = got_prize.meta.LTG_CAT;
        const change_id = got_prize.meta.LTG_ID;
        if (!change_category || !change_id) {
            result_prize = got_prize;
        }
        else {
            switch (change_category) {
                case 'item':
                    result_prize = $dataItems[change_id];
                    break;
                case 'weapon':
                    result_prize = $dataWeapons[change_id];
                    break;
                case 'armor':
                    result_prize = $dataArmors[change_id];
                    break;
                default:
                    result_prize = got_prise;
                    break;
            }
        }
        $gameParty.gainItem(result_prize, 1);
        $gameVariables.setValue(_param.GotPrizeRarityVariable, got_rarity);
        $gameVariables.setValue(_param.GotPrizeNameVariable, result_prize.name);
        $gameVariables.setValue(_param.GotPrizeIconVariable, result_prize.iconIndex);
    });
})();