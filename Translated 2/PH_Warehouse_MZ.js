/*:

 PH - Warehouse/Storage for RMMZ
 @target MZ
 @plugindesc This plugin allows the creation of warehouses where you can store items in the game.
 @author PrimeHover (transplanted for RMMZ by GrayOgre)
 @version 1.4.0
 @date 01/06/2022

 ---------------------------------------------------------------------------------------
 This work is licensed under the Creative Commons Attribution 4.0 International License.
 To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/
 ---------------------------------------------------------------------------------------

 @param --Options---
 @desc Use the spaces below to customize the options of the plugin
 
 @param All_Together
   @text All Together
   @desc Defines whether or not you want to show the items in separated categories
   @type boolean
   @default false

 @param Stack_Item_Quantity
   @text Stack Item Quantity
   @desc Defines whether or not you want to consider stacked items as a single space in the capacity
   @type boolean
   @default false

 @param ---Vocabulary---
 @desc Use the spaces below to personalize the vocabulary of the plugin

 @param Withdraw_Text
   @text Withdraw Text
   @desc Text shown in option "Withdraw"
   @type string
   @default Withdraw

 @param Deposit_Text
   @text Deposit Text
   @desc Text shown in option "Deposit"
   @type string
   @default Deposit

 @param All_Text
   @text All Text
   @desc Text shown in option "All" if the parameter "All Together" is set as true.
   @type string
   @default All

 @param Available_Space_Text
   @text Available Space Text
   @desc Text shown in the information window
   @type string
   @default Available Space:

 @command Create
   @text Creates a warehouse
   @desc Creates a warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criateing Warehouse 
     @type string
   @arg max_capacity
     @text maximum capacity
     @desc sets warehouse maximum capacity 
     @type number
     @default 50
   @arg rule
     @text rule
     @desc warehouse rule name
     @type string
     @default

 @command Show
   @text Shows a warehouse
   @desc Shows the warehouse specified by title.
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string

 @command Remove
   @text Remove a warehouse
   @desc Remove the warehouse specified by title.
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string

 @command LootItem
   @text add item loot bonus
   @desc Add an item for loot bonus inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Item ID
     @desc Target item ID
     @type item
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command LootWeapon
   @text add weapon loot bonus
   @desc Add a weapon for loot bonus inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Weapon ID
     @desc Target Weapon ID
     @type weapon
   @arg quantity
     @text Quantity
     @desc Quantity of weapon 
     @type number

 @command LootArmor
   @text add armor loot bonus
   @desc Add an armor for loot bonus inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Armor ID
     @desc Target armor ID
     @type armor
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command LootKeyItem
   @text add keyItem loot bonus
   @desc Add a key item for loot bonus inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Item ID
     @desc Target item ID
     @type item
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command AddItem
   @text add item immediately
   @desc Add an item immediately inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Item ID
     @desc Target item ID
     @type item
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command AddWeapon
   @text add weapon immediately
   @desc Add a weapon immediately inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Weapon ID
     @desc Target Weapon ID
     @type weapon
   @arg quantity
     @text Quantity
     @desc Quantity of weapon 
     @type number

 @command AddArmor
   @text add armor immediately
   @desc Add an armor immediately inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Armor ID
     @desc Target armor ID
     @type armor
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command AddKeyItem
   @text add keyItem immediately
   @desc Add a key item immediately inside a created warehouse
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg id
     @text Item ID
     @desc Target item ID
     @type item
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number


 @command SetMaxCapacity
   @text Set maximum capacity
   @desc Set a new maximum capacity for a warehouse already created
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command IncreaseMaxCapacity
   @text Increase maximum capacity
   @desc Increase the maximum capacity for a warehouse already created
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command DecreaseMaxCapacity
   @text Decrease maximum capacity
   @desc Decrease the maximum capacity for a warehouse already created
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string
   @arg quantity
     @text Quantity
     @desc Quantity of item 
     @type number

 @command DepositAllItems
   @text Deposit all items
   @desc Deposit all common items the party having
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string

 @command DepositAllWeapons
   @text Deposit all weapons
   @desc Deposit all weapons the party having
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string

 @command DepositAllArmors
   @text Deposit all armors
   @desc Deposit all armors the party having
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string

 @command DepositAllKeyItems
   @text Deposit all key items
   @desc Deposit all key items the party having
   @arg title
     @text Title of the Warehouse
     @desc Title of the criated Warehouse 
     @type string

@help

 Warehouse/Storage Plugin for RMMZ
 created by PrimeHover (transplanted for RMMZ by GrayOgre)

 Check out the full documentation at: https://github.com/PrimeHover/Warehouse
 Check out an illustrative example of using the commands and rules at: http://forums.rpgmakerweb.com/index.php?/topic/50503-ph-warehousestorage/
 Check out the portuguese example at: http://www.mundorpgmaker.com.br/topic/114053-ph-warehousestorage/

 ----------------------------------------------------------------------------------------------------------------------------------

 Plugin Commands:

 - Create Title-of-the-Warehouse                        # Creates a warehouse
 - Create Title-of-the-Warehouse 50                     # Creates a warehouse and sets its maximum capacity to 50
 - Create Title-of-the-Warehouse 50 rule                # Creates a warehouse, sets its maximum capacity to 50 and sets a rule

 - Show Title-of-the-Warehouse                          # Shows a warehouse
 - Remove Title-of-the-Warehouse                        # Removes a warehouse

 - LootItem Title-of-the-Warehouse id quantity          # Add an item for loot bonus inside a created warehouse
 - LootWeapon Title-of-the-Warehouse id quantity        # Add a weapon for loot bonus inside a created warehouse
 - LootArmor Title-of-the-Warehouse id quantity         # Add an armor for loot bonus inside a created warehouse
 - LootkeyItem Title-of-the-Warehouse id quantity       # Add a key item for loot bonus inside a created warehouse

 - AddItem Title-of-the-Warehouse id quantity           # Add an item immediately inside a created warehouse
 - AddWeapon Title-of-the-Warehouse id quantity         # Add a weapon immediately inside a created warehouse
 - AddArmor Title-of-the-Warehouse id quantity          # Add an armor immediately inside a created warehouse
 - AddKeyItem Title-of-the-Warehouse id quantity        # Add a key item immediately inside a created warehouse

 - SetMaxCapacity Title-of-the-Warehouse quantity       # Set a new maximum capacity for a warehouse already created
 - IncreaseMaxCapacity Title-of-the-Warehouse quantity  # Increase the maximum capacity for a warehouse already created
 - DecreaseMaxCapacity Title-of-the-Warehouse quantity  # Decrease the maximum capacity for a warehouse already created

 - DepositAllItems Title-of-the-Warehouse               # Deposit all common items the party having
 - DepositAllIWeapons Title-of-the-Warehouse            # Deposit all weapons the party having
 - DepositAllArmors Title-of-the-Warehouse              # Deposit all armors the party having
 - DepositAllKeyItems Title-of-the-Warehouse            # Deposit all key items the party having
----------------------------------------------------------------------------------------------------------------------------------

Script Commands:

 - PHPlugins.PHWarehouse.prototype.exist("Title of the Warehouse");                                # Verifies if a warehouse exists

 - PHPlugins.PHWarehouse.prototype.getMaxCapacity("Title of the Warehouse");                       # Gets the maximum capacity of a warehouse
 - PHPlugins.PHWarehouse.prototype.getCurrentCapacity("Title of the Warehouse");                   # Gets the current capacity of a warehouse

 - PHPlugins.PHWarehouse.prototype.hasItem("Title of the Warehouse", id);                          # Verifies if a warehouse has a particular item and returns the quantity of this item inside the warehouse
 - PHPlugins.PHWarehouse.prototype.hasWeapon("Title of the Warehouse", id);                        # Verifies if a warehouse has a particular weapon and returns the quantity of this item inside the warehouse
 - PHPlugins.PHWarehouse.prototype.hasArmor("Title of the Warehouse", id);                         # Verifies if a warehouse has a particular armor and returns the quantity of this item inside the warehouse
 - PHPlugins.PHWarehouse.prototype.hasKeyItem("Title of the Warehouse", id);                       # Verifies if a warehouse has a particular key item and returns the quantity of this item inside the warehouse

 ----------------------------------------------------------------------------------------------------------------------------------

Rule Commands:

    Rules are a simple way to manage which items you can store in a specific warehouse.
    In order to create a rule for your warehouse, you have to create a Common Event in the database called "PHWarehouse".
    Inside of that Common Event, you will create some comments in order to populate the rules for warehouses.
    These comments must have the following format:

    {Title of the Rule}
    [commands]

    The [commands] you can specify are as follow:

    item: 1 (Just allow the storage of the item with id 1)
    item: 1, 2, 3, 4 (Allows the storage of items with id 1, 2, 3 and 4)
    item: no (Does not allow the storage of items)
    item-n: 1 (Allows the storage of any item except the one with id 1)
    (If you don't specify the command "item" in the rule, all items will be allowed to be stored)

    weapon: 1 (Just allow the storage of the weapon with id 1)
    weapon: 1, 2, 3, 4 (Allows the storage of weapons with id 1, 2, 3 and 4)
    weapon: no (Does not allow the storage of weapons)
    weapon-n: 1 (Allows the storage of any weapon except the one with id 1)
    (If you don't specify the command "weapon" in the rule, all weapons will be allowed to be stored)

    armor: 1 (Just allow the storage of the armor with id 1)
    armor: 1, 2, 3, 4 (Allows the storage of armors with id 1, 2, 3 and 4)
    armor: no (Does not allow the storage of armors)
    armor-n: 1 (Allows the storage of any armor except the one with id 1)
    (If you don't specify the command "armor" in the rule, all armors will be allowed to be stored)

    keyItem: 1 (Just allow the storage of the key item with id 1)
    keyItem: 1, 2, 3, 4 (Allows the storage of key items with id 1, 2, 3 and 4)
    keyItem: no (Does not allow the storage of key items)
    keyItem-n: 1 (Allows the storage of any key item except the one with id 1)
    (If you don't specify the command "keyItem" in the rule, all key items will be allowed to be stored)

 */
/*:ja
 * PH - Warehouse/Storage for RMMZ
 * @target MZ
 * @plugindesc アイテムを保管できる倉庫を作成できます。
 *
 * @author PrimeHover (RMMZ移植：GrayOgre)
 * @version 1.4.0
 * @date 01/06/2022
 *
 * ---------------------------------------------------------------------------
 * この作品は、Creative Commons Attribution 4.0 International License の下で
 * ライセンスされています。
 * このライセンスを確認するには、次をご覧ください。
 * https://creativecommons.org/licenses/by/4.0/deed.ja
 * ---------------------------------------------------------------------------
 *
 * @param ---オプション---
 * @desc プラグインのオプションをカスタマイズしてください
 *
 * @param All_Together
 *   @text カテゴリ分け
 *   @desc アイテムを別々のカテゴリに分けて表示(false:カテゴリ分け / true:統合)
 *   @type boolean
 *   @default false
 *   @default false
 *
 * @param Stack_Item_Quantity
 *   @text 容量基準
 *   @desc 同じアイテムの複数を容量の1つの容量と見なすかどうか(false:1個で1容量 / true:1種類で1容量)
 *   @type boolean
 *   @default false
 *
 * @param ---表示テキスト---
 * @desc プラグインのテキストをカスタマイズしてください
 *
 * @param Withdraw_Text
 *   @text 引き出すテキスト
 *   @desc オプション "Withdraw"の表示テキスト
 *   @type string
 *   @default 引き出す
 *
 * @param Deposit_Text
 *   @text 預けるテキスト
 *   @desc オプション "Deposit"の表示テキスト
 *   @type string
 *   @default 預ける
 *
 * @param All_Text
 *   @text 全てテキスト
 *   @desc オプション "All"の表示テキスト("All Together"がtrueに設定されている場合のみ)
 *   @type string
 *   @default 全て
 *
 * @param Available_Space_Text
 *   @text 利用可能容量テキスト
 *   @desc 情報ウィンドウの表示テキスト
 *   @type string
 *   @default 利用可能容量:
 *
 * @command Create
 *   @text 倉庫を作成
 *   @desc 新しい倉庫を作成する
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 作成する倉庫の名前
 *     @type string
 *   @arg max_capacity
 *     @text 最大容量
 *     @desc 作成時の最大容量 
 *     @type number
 *     @default 50
 *   @arg rule
 *     @text ルール
 *     @desc 倉庫に適用するルールの名前
 *     @type string
 *     @default
 *
 * @command Show
 *   @text 倉庫を表示
 *   @desc 名前で指定された倉庫を表示する
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *
 * @command Remove
 *   @text 倉庫を削除
 *   @desc 名前で指定された倉庫を削除する
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 削除する倉庫の名前
 *     @type string
 *
 * @command LootItem
 *   @text 戦利品ボーナスアイテム追加
 *   @desc 作成した倉庫内に戦利品ボーナス用のアイテムを追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text アイテムID
 *     @desc 追加するアイテムのID
 *     @type item
 *   @arg quantity
 *     @text 追加数
 *     @desc 追加するアイテム数 
 *     @type number
 *
 * @command LootWeapon
 *   @text 戦利品ボーナス武器追加
 *   @desc 作成した倉庫内に戦利品ボーナス用の武器を追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text 武器ID
 *     @desc 追加する武器のID
 *     @type weapon
 *   @arg quantity
 *     @text 追加数
 *     @desc 追加する武器数 
 *     @type number
 *
 * @command LootArmor
 *   @text 戦利品ボーナス防具追加
 *   @desc 作成した倉庫内に戦利品ボーナス用の防具を追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text 防具ID
 *     @desc 追加する防具のID
 *     @type armor
 *   @arg quantity
 *     @text 追加数
 *     @desc 追加する防具数 
 *     @type number
 *
 * @command LootKeyItem
 *   @text 戦利品ボーナス大事なもの追加
 *   @desc 作成した倉庫内に戦利品ボーナスの大事なものを追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text アイテムID
 *     @desc 追加するアイテムのID
 *     @type item
 *   @arg quantity
 *     @text 格納数
 *     @desc 追加するアイテム数 
 *     @type number
 *
 * @command AddItem
 *   @text アイテム追加
 *   @desc 作成した倉庫内にアイテムを追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text アイテムID
 *     @desc 追加するアイテムのID
 *     @type item
 *   @arg quantity
 *     @text 格納数
 *     @desc 追加するアイテム数 
 *     @type number
 *
 * @command AddWeapon
 *   @text 武器追加
 *   @desc 作成した倉庫内に武器を追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text 武器ID
 *     @desc 追加する武器のID
 *     @type weapon
 *   @arg quantity
 *     @text 格納数
 *     @desc 追加する武器数 
 *     @type number
 *
 * @command AddArmor
 *   @text 防具追加
 *   @desc 作成した倉庫内に防具を追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text 防具ID
 *     @desc 追加する防具のID
 *     @type armor
 *   @arg quantity
 *     @text 追加数
 *     @desc 追加する防具数 
 *     @type number
 *
 * @command AddKeyItem
 *   @text 大事なもの追加
 *   @desc 作成した倉庫内に大事なものを追加
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg id
 *     @text アイテムID
 *     @desc 追加するアイテムのID
 *     @type item
 *   @arg quantity
 *     @text 格納数
 *     @desc 追加するアイテム数 
 *     @type number
 *
 * @command SetMaxCapacity
 *   @text 最大容量設定
 *   @desc 既に作成されている倉庫の新しい最大容量を設定
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg quantity
 *     @text 最大容量
 *     @desc 倉庫に設定する最大容量 
 *     @type number
 *
 * @command IncreaseMaxCapacity
 *   @text 最大容量拡張
 *   @desc 既に作成されている倉庫の最大容量を増やす
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg quantity
 *     @text 追加容量
 *     @desc 追加する容量
 *     @type number
 *
 * @command DecreaseMaxCapacity
 *   @text 最大容量削減
 *   @desc 既に作成されている倉庫の最大容量を減らす
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *   @arg quantity
 *     @text 削減容量
 *     @desc 倉庫から削減する容量 
 *     @type number
 * 
 * @command DepositAllItems
 *   @text 所持アイテムを全て保管
 *   @desc パーティが所持している全てのアイテムを倉庫に保管する
 *   @arg title
 *     @text 倉庫の名前
 *     @desc Title of the criated Warehouse 
 *     @type string
 * 
 * @command DepositAllWeapons
 *   @text 所持武器を全て保管
 *   @desc パーティが所持している全ての武器を倉庫に保管する
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 * 
 * @command DepositAllArmors
 *   @text 所持防具を全て保管
 *   @desc パーティが所持している全ての防具を倉庫に保管する
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 * 
 * @command DepositAllKeyItems
 *   @text 大事なものを全て保管
 *   @desc パーティが所持している全ての大事なものを倉庫に保管する
 *   @arg title
 *     @text 倉庫の名前
 *     @desc 使用する倉庫の名前
 *     @type string
 *
 * @help
 *
 * Warehouse/Storage Plugin for RMMZ
 * 作者: PrimeHover (RMMZ移植：GrayOgre)
 *
 * 詳細説明: https://github.com/PrimeHover/Warehouse
 * 次のURLにあるコマンドとルールの使用例を確認してください。
 * http://forums.rpgmakerweb.com/index.php?/topic/50503-ph-warehousestorage/
 * ポルトガル語の例を確認してください。
 * http://www.mundorpgmaker.com.br/topic/114053-ph-warehousestorage/
 *
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * ---------------------------------------------------------------------------
 *
 * プラグインコマンド
 *
 * - Create 預かり所の名前
 *     # 倉庫を作成
 * - Create 預かり所の名前 50
 *     # 倉庫を作成し、その最大容量を50に設定
 * - Create 預かり所の名前 50 ルール
 *     # 倉庫を作成し、最大容量を50に設定し、ルールを設定
 *
 * - Show 預かり所の名前
 *     # 倉庫を表示
 * - Remove 預かり所の名前
 *     # 倉庫を削除
 * - LootItem  預かり所の名前 アイテムid 追加数
 *     # 作成した倉庫内に戦利品ボーナス用のアイテムを追加
 * - LootWeapon 預かり所の名前 武器id 追加数
 *     # 作成した倉庫内に戦利品ボーナス用の武器を追加
 * - LootArmor  預かり所の名前 防具id 追加数
 *     # 作成した倉庫内に戦利品ボーナス用の防具を追加
 * - LootKeyItem 預かり所の名前 アイテムid 追加数
 *     # 作成した倉庫内に戦利品ボーナスの大事なものを追加
 *
 * - AddItem 預かり所の名前 id 追加数
 *     # 作成した倉庫内にアイテムを追加
 * - AddWeapon 預かり所の名前 武器id 追加数>
 *     # 作成した倉庫内に武器を追加
 * - AddArmor 預かり所の名前 防具id 追加数
 *     # 作成した倉庫内に防具を追加
 *   AddKeyItem 預かり所の名前 アイテムid 追加数
 *     # 作成した倉庫内に大事なものを追加
 *
 * - SetMaxCapacity 預かり所の名前 最大容量
 *     # 既に作成されている倉庫の新しい最大容量を設定
 *   IncreaseMaxCapacity 預かり所の名前 追加容量
 *     # 既に作成されている倉庫の最大容量を増やす
 * - DecreaseMaxCapacity 預かり所の名前 削減容量
 *     # 既に作成されている倉庫の最大容量を減らす
 *
 * - DepositAllItems 預かり所の名前
 *     # パーティが所持している全てのアイテムを倉庫に保管する
 * - DepositAllIWeapons 預かり所の名前
 *     # パーティが所持している全ての武器を倉庫に保管する
 * - DepositAllArmors 預かり所の名前
 *     # パーティが所持している全ての防具を倉庫に保管する
 * - DepositAllKeyItems 預かり所の名前
 *     # パーティが所持している全ての大事なものを倉庫に保管する
 *
 * ---------------------------------------------------------------------------
 *
 * スクリプトコマンド
 *
 * - PHPlugins.PHWarehouse.prototype.exist("預かり所の名前");
 *      # 倉庫が存在するかどうかを確認
 *
 * - PHPlugins.PHWarehouse.prototype.getMaxCapacity("預かり所の名前");
 *      # 倉庫の最大容量を取得
 * - PHPlugins.PHWarehouse.prototype.getCurrentCapacity("預かり所の名前");
 *      # 倉庫の現在の容量を取得
 *
 * - PHPlugins.PHWarehouse.prototype.hasItem("預かり所の名前", id);
 *      # 倉庫に特定のアイテムの数量を返す
 * - PHPlugins.PHWarehouse.prototype.hasWeapon("預かり所の名前", id);
 *      # 倉庫に特定の武器の数量を返す
 * - PHPlugins.PHWarehouse.prototype.hasArmor("預かり所の名前", id);
 *      # 倉庫に特定の防具の数量を返す
 * - PHPlugins.PHWarehouse.prototype.hasKeyItem("預かり所の名前", id);
 *      # 倉庫に特定の大事なものの数量を返す
 *
 * ---------------------------------------------------------------------------
 *
 * ルール
 *
 * ルールは、特定の倉庫に保管できるアイテムを管理するための簡単な方法です。
 *
 * 倉庫の規則を作成するために、
 * データベースの中に"PHWarehouse"と呼ばれる
 * コモンイベントを作成しなければなりません。
 * そのコモンイベントの中で、
 * 倉庫に関する規則を取り込むためにいくつかの注釈を作成します。
 *
 * これらの注釈は次の形式でなければなりません。
 *
 * {Title of the Rule}
 * [commands]
 *
 * 指定できる[commands]は次のとおりです。
 *
 * item: 1
 *   (アイテムIDが1の保管を許可)
 *
 * item: 1, 2, 3, 4
 *   (IDが1、2、3、4のアイテムを保管を許可)
 *
 * item: no
 *   (アイテムの保管を禁止)
 *
 * item-n: 1
 *   (IDが1のアイテム以外のアイテムの保管を許可)
 *   (ルールで'item'というコマンドを指定しなければ、
 *    全てのアイテムを保管を許可します)
 *
 * weapon: 1
 *   (ID 1の武器を保管を許可)
 *
 * weapon: 1, 2, 3, 4
 *   (ID 1、2、3、4の武器を保管を許可)
 *
 * weapon: no
 *   (武器の保管を拒否)
 *
 * weapon-n: 1
 *   (IDが1の武器以外の武器の保管を許可)
 *   (ルールで "weapon"コマンドを指定しない場合、全ての武器を保管を許可)
 *
 * armor: 1
 *   (ID 1の防具の保管を許可)
 *
 * armor: 1, 2, 3, 4
 *   (id 1、2、3、4の防具を保管可能)
 *
 * armor: no
 *   (防具の保管を拒否)
 *
 * armor-n: 1
 *   (IDが1の防具を除く全ての防具を保管可能)
 *   (ルールで"armor"コマンドを指定しない場合、全ての防具の保管を許可)
 *
 * keyItem: 1
 *   (ID 1の大事なものの保管を許可)
 *
 * keyItem: 1, 2, 3, 4
 *   (IDが1、2、3、4の大事なものを保管を許可)
 *
 * keyItem: no
 *   (大事なものの保管を禁止)
 *
 * keyItem-n: 1
 *   (IDが1のものを除く全ての大事なものの保管を許可)
 *   (ルール内でコマンド"keyItem"を指定しない場合、
 *    全ての大事なものの保管を許可)
 */

/* Global variable for PH Plugins */
const PHPluginName = 'PH_Warehouse_MZ';
var PHPlugins = PHPlugins || {};
PHPlugins.Parameters = PluginManager.parameters(PHPluginName);
PHPlugins.Params = PHPlugins.Params || {};

/* Global variable for the list of quests */
PHPlugins.PHWarehouse = null;

/* Getting the parameters */
PHPlugins.Params.PHWarehouseWithdrawText = String(PHPlugins.Parameters['Withdraw_Text']);
PHPlugins.Params.PHWarehouseDepositText = String(PHPlugins.Parameters['Deposit_Text']);
PHPlugins.Params.PHWarehouseAvailableSpaceText = String(PHPlugins.Parameters['Available_Space_Text']);
PHPlugins.Params.PHWarehouseAllText = String(PHPlugins.Parameters['All_Text']);
PHPlugins.Params.PHWarehouseAllTogether = PHPlugins.Parameters['All_Together'] === 'true';
PHPlugins.Params.PHWarehouseStackItemQuantity = PHPlugins.Parameters['Stack_Item_Quantity'] === 'true';

(() => {
    'use strict';

    /* ---------------------------------------------------------- *
     *                      WAREHOUSE MANAGER                     *
     * ---------------------------------------------------------- */

    function PHWarehouseManager() {
        this._rules = {};
        this._warehouses = {};
        this._lastActive = "";
        this._lastOption = 0; // 0 = Withdraw, 1 = Deposit
        this._lastCategory = "item";
    }

    /* ---- BASIC OPERATIONS ---- */

    /* Creates a warehouse if it does not exist */
    PHWarehouseManager.prototype.createWarehouse = function(title, max_capacity, rule) {
        let capacity = max_capacity;
        if (!this._warehouses.hasOwnProperty(title)) {
            if (isNaN(capacity) || capacity <= 0) {
                capacity = 50;
            }
            this._warehouses[title] = {
                title: title,
                maxCapacity: capacity,
                currentCapacity: 0,
                rule: rule,
                lootBonus: true,
                items: {
                    item: [],
                    weapon: [],
                    armor: [],
                    keyItem: []
                },
                qtty: {
                    item: {},
                    weapon: {},
                    armor: {},
                    keyItem: {}
                }
            };
        }

        this._lastActive = title;
    };

    PluginManager.registerCommand(PHPluginName, "Create", args => {
        const title = args.title;
        const max_capacity = parseInt(args.max_capacity);
        let rule = args.rule;
        if (!rule) {
            rule = null;
        }
        PHPlugins.PHWarehouse.createWarehouse(title, max_capacity, rule);
    });

    /* Opens a warehouse */
    PHWarehouseManager.prototype.openWarehouse = function(title) {
        if (title) {
            this._lastActive = title;
            this._warehouses[this._lastActive].lootBonus = false;
        }
    };

    PluginManager.registerCommand(PHPluginName, "Show", args => {
        const title = args.title;
        PHPlugins.PHWarehouse.openWarehouse(title);
        SceneManager.push(Scene_Warehouse);
    });


    /* Remove a warehouse */
    PHWarehouseManager.prototype.removeWarehouse = function(title) {
        if (title) {
            if (this._warehouses.hasOwnProperty(title)) {
                delete this._warehouses[title];
            }
        }
    };

    PluginManager.registerCommand(PHPluginName, "Remove", args => {
        const title = args.title;
        PHPlugins.PHWarehouse.removeWarehouse(title);
    });

    /* Add a loot bonus */
    PHWarehouseManager.prototype.addLoot = function(title, id, quantity, category) {
        let qtty = quantity;
        if (title) {
            if (this._warehouses.hasOwnProperty(title) && this._warehouses[title].lootBonus && !isNaN(id) && !isNaN(quantity)) {
                const max_quantity = this._warehouses[title].maxCapacity - this._warehouses[title].currentCapacity;
                if (qtty > max_quantity) {
                    qtty = max_quantity;
                }

                if (this._warehouses[title].items[category].indexOf(id) > -1) {
                    this._warehouses[title].qtty[category][id] += qtty;
                } else {
                    this._warehouses[title].items[category].push(id);
                    this._warehouses[title].qtty[category][id] = qtty;
                }
                this._warehouses[title].currentCapacity += qtty;
            }
        }
    };

    PluginManager.registerCommand(PHPluginName, 'LootItem', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        if ($dataItems[id].itypeId === 1) {
            PHPlugins.PHWarehouse.addLoot(title, id, quantity, 'item');
        }
    });

    PluginManager.registerCommand(PHPluginName, 'LootWeapon', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        PHPlugins.PHWarehouse.addLoot(title, id, quantity, 'weapon');
    });

    PluginManager.registerCommand(PHPluginName, 'LootArmor', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        PHPlugins.PHWarehouse.addLoot(title, id, quantity, 'armor');
    });

    PluginManager.registerCommand(PHPluginName, 'LootKeyItem', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        if ($dataItems[id].itypeId === 2) {
            PHPlugins.PHWarehouse.addLoot(title, id, quantity, 'keyItem');
        }
    });

    /* Add item to a warehouse */
    PHWarehouseManager.prototype.addItems = function(title, id, quantity, category) {
        let qtty = quantity;
        if (title) {
            if (this._warehouses.hasOwnProperty(title) && !isNaN(id) && !isNaN(quantity)) {
                const max_quantity = this._warehouses[title].maxCapacity - this._warehouses[title].currentCapacity;
                if (qtty > max_quantity) {
                    qtty = max_quantity;
                }
                if (this._warehouses[title].items[category].indexOf(id) > -1) {
                    this._warehouses[title].qtty[category][id] += qtty;
                } else {
                    this._warehouses[title].items[category].push(id);
                    this._warehouses[title].qtty[category][id]= qtty;
                }
                this._warehouses[title].currentCapacity += qtty;
            }
        }
    };

    PluginManager.registerCommand(PHPluginName, 'AddItem', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        if ($dataItems[id].itypeId === 1) {
            PHPlugins.PHWarehouse.addItems(title, id, quantity, 'item');
        }
    });

    PluginManager.registerCommand(PHPluginName, 'AddWeapon', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        PHPlugins.PHWarehouse.addItems(title, id, quantity, 'weapon');
    });

    PluginManager.registerCommand(PHPluginName, 'AddArmor', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        PHPlugins.PHWarehouse.addItems(title, id, quantity, 'armor');
    });

    PluginManager.registerCommand(PHPluginName, 'AddKeyItem', args => {
        const title = args.title;
        const id = parseInt(args.id);
        const quantity = parseInt(args.quantity);
        if ($dataItems[id].itypeId === 2) {
            PHPlugins.PHWarehouse.addItems(title, id, quantity, 'keyItem');
        }
    });

    /* ---- RULE METHODS ---- */

    /* Load rules */
    PHWarehouseManager.prototype.loadRules = function() {
        let warehouseVar = null;

        if ($dataCommonEvents) {
            for (var i = 0; i < $dataCommonEvents.length; i++) {
                if ($dataCommonEvents[i] instanceof Object && $dataCommonEvents[i].name == "PHWarehouse") {
                    warehouseVar = $dataCommonEvents[i].list;
                    i = $dataCommonEvents.length;
                }
            }
        }

        if (warehouseVar != null) {
            this.populateRules(warehouseVar);
        }
    };

    /* Populate rules */
    PHWarehouseManager.prototype.populateRules = function(warehouseVar) {
        let str = '';
        let index = -1;

        for (let i = 0; i < warehouseVar.length; i++) {
            if (warehouseVar[i].parameters[0]) {
                str = warehouseVar[i].parameters[0].trim();
                if (this.checkTitle(str)) {
                    str = str.slice(1, str.length-1);
                    this._rules[str] = {
                        enabledItems: {
                            item: [],
                            weapon: [],
                            armor: [],
                            keyItem: []
                        },
                        disabledItems: {
                            item: [],
                            weapon: [],
                            armor: [],
                            keyItem: []
                        }
                    };
                    index = str;
                } else if (this._rules[index]) {
                    const rule = str.split(":");
                    rule[0] = rule[0].trim();
                    rule[1] = rule[1].trim();

                    if (rule[0].indexOf('-n') > -1) {
                        rule[0] = rule[0].replace("-n", "");
                        if (this._rules[index].disabledItems.hasOwnProperty(rule[0])) {
                            this._rules[index].disabledItems[rule[0]] = this.getItemsId(rule[1]);
                        }
                    } else {
                        if (this._rules[index].enabledItems.hasOwnProperty(rule[0])) {
                            if (rule[1].indexOf("no") > -1) {
                                this._rules[index].enabledItems[rule[0]] = false;
                            } else {
                                this._rules[index].enabledItems[rule[0]] = this.getItemsId(rule[1]);
                            }
                        }
                    }
                }
            }
        }
    };

    /* Checks if the string is a title or a description */
    PHWarehouseManager.prototype.checkTitle = function(str) {
        if (str.charAt(0) == "{" && str.charAt(str.length - 1) == "}") {
            return true;
        }
        return false;
    };

    /* Separate ids and make it an array */
    PHWarehouseManager.prototype.getItemsId = function(str) {
        const arr = str.split(",");
        for (var i = 0; i < arr; i++) {
            arr[i] = parseInt(arr[i], 10);
        }
        return arr;
    };

    /* Checks if items are enabled */
    PHWarehouseManager.prototype.isItemEnabled = function() {
        if (this._warehouses[this._lastActive].rule == null || (this._rules.hasOwnProperty(this._warehouses[this._lastActive].rule) && Array.isArray(this._rules[this._warehouses[this._lastActive].rule].enabledItems.item))) {
            return true;
        }
        return false;
    };

    /* Checks if weapons are enabled */
    PHWarehouseManager.prototype.isWeaponEnabled = function() {
        if (this._warehouses[this._lastActive].rule == null || (this._rules.hasOwnProperty(this._warehouses[this._lastActive].rule) && Array.isArray(this._rules[this._warehouses[this._lastActive].rule].enabledItems.weapon))) {
            return true;
        }
        return false;
    };

    /* Checks if armors are enabled */
    PHWarehouseManager.prototype.isArmorEnabled = function() {
        if (this._warehouses[this._lastActive].rule == null || (this._rules.hasOwnProperty(this._warehouses[this._lastActive].rule) && Array.isArray(this._rules[this._warehouses[this._lastActive].rule].enabledItems.armor))) {
            return true;
        }
        return false;
    };

    /* Checks if key items are enabled */
    PHWarehouseManager.prototype.isKeyItemEnabled = function() {
        if (this._warehouses[this._lastActive].rule == null || (this._rules.hasOwnProperty(this._warehouses[this._lastActive].rule) && Array.isArray(this._rules[this._warehouses[this._lastActive].rule].enabledItems.keyItem))) {
            return true;
        }
        return false;
    };

    /* Verifies if an item is allowed to be withdrawn or deposited */
    PHWarehouseManager.prototype.verifyItem = function(item) {
        if (item == undefined) return false;
        this.verifyAllTogether(item);
        if (this._warehouses[this._lastActive].rule == null ||
                (this._rules.hasOwnProperty(this._warehouses[this._lastActive].rule) &&
                Array.isArray(this._rules[this._warehouses[this._lastActive].rule].enabledItems[this._lastCategory]) &&
                    (this._rules[this._warehouses[this._lastActive].rule].enabledItems[this._lastCategory].indexOf(item.id) > -1) ||
                    this._rules[this._warehouses[this._lastActive].rule].enabledItems[this._lastCategory].length == 0)) {

            /* Makes a second checking to see if this item is disabled */
            if (this._warehouses[this._lastActive].rule !== null &&
                Array.isArray(this._rules[this._warehouses[this._lastActive].rule].disabledItems[this._lastCategory]) &&
                this._rules[this._warehouses[this._lastActive].rule].disabledItems[this._lastCategory].indexOf(item.id) > -1) {
                return false;
            }
            return true;
        }
        return false;
    };

    /* Changes the last category if "all together" are set as true */
    PHWarehouseManager.prototype.verifyAllTogether = function(item) {
        if (PHPlugins.Params.PHWarehouseAllTogether == true) {
            if (DataManager.isItem(item) && item.itypeId === 1) {
                this._lastCategory = 'item';
            } else if (DataManager.isArmor(item)) {
                this._lastCategory = 'armor';
            } else if (DataManager.isWeapon(item)) {
                this._lastCategory = 'weapon';
            } else if (DataManager.isItem(item) && item.itypeId === 2) {
                this._lastCategory = 'keyItem';
            }
        }
    };

    /* Undo what the previous function has done */
    PHWarehouseManager.prototype.undoAllTogetherVerification = function() {
        if (PHPlugins.Params.PHWarehouseAllTogether == true) {
            this._lastCategory = 'all';
        }
    };

    /* Changes the maximum capacity of the warehouse for the given title */
    PHWarehouseManager.prototype.setMaxCapacity = function(title, capacity) {
        if (title) {
            if (this._warehouses.hasOwnProperty(title) && !isNaN(capacity) && capacity >= this.getCurrentCapacity(title)) {
                this._warehouses[title].maxCapacity = capacity;
                if (this._warehouses[title].maxCapacity < 0) {
                    this._warehouses[title].maxCapacity = 0;
                }
            }
        }
    };

    PluginManager.registerCommand(PHPluginName, 'SetMaxCapacity', args => {
        const title = args.title;
        const quantity = parseInt(args.quantity);
        PHPlugins.PHWarehouse.setMaxCapacity(title, quantity);
    });

    /* Increases the maximum capacity of the warehouse for the given title */
    PHWarehouseManager.prototype.increaseMaxCapacity = function(title, capacity) {
        if (this._warehouses.hasOwnProperty(title) && !isNaN(capacity) && (this._warehouses[title].maxCapacity + capacity) >= this.getCurrentCapacity(title)) {
            this._warehouses[title].maxCapacity += capacity;
            if (this._warehouses[title].maxCapacity < 0) {
                this._warehouses[title].maxCapacity = 0;
            }
        }
    };

    PluginManager.registerCommand(PHPluginName, 'IncreaseMaxCapacity', args => {
        const title = args.title;
        const quantity = parseInt(args.quantity);
        PHPlugins.PHWarehouse.increaseMaxCapacity(title, quantity);
    });

    /* Decreases the maximum capacity of the warehouse for the given title */
    PHWarehouseManager.prototype.decreaseMaxCapacity = function(title, capacity) {
        if (this._warehouses.hasOwnProperty(title) && !isNaN(capacity) && (this._warehouses[title].maxCapacity - capacity) >= this.getCurrentCapacity(title)) {
                this._warehouses[title].maxCapacity -= capacity;
                if (this._warehouses[title].maxCapacity < 0) {
                    this._warehouses[title].maxCapacity = 0;
                }
            }
    };

    PluginManager.registerCommand(PHPluginName, 'DecreaseMaxCapacity', args => {
        const title = args.title;
        const quantity = parseInt(args.quantity);
        PHPlugins.PHWarehouse.decreaseMaxCapacity(title, quantity);
    });

    PHWarehouseManager.prototype.freeSpace = function(title) {
        return (this._warehouses[title].maxCapacity - this._warehouses[title].currentCapacity);
    }

    PHWarehouseManager.prototype.depositAllItems = function(title, items, type) {
        let space = this.freeSpace(title);
        items.forEach(it=>{
            let amount = $gameParty.numItems(it);
            if (amount > space) {
                amount = space;
                space = 0;
            } else {
                space -= amount;
            }
            if (amount > 0) {
                this.addItems(title, it.id, amount, type);
                $gameParty.loseItem(it, amount);
            }
        })
    } 

    PluginManager.registerCommand(PHPluginName, "DepositAllItems", args => {
        const title = args.title;
        const items = $gameParty.items().filter(value=>(value.itypeId === 1));
        PHPlugins.PHWarehouse.depositAllItems(title, items, 'item');
    });

    PluginManager.registerCommand(PHPluginName, "DepositAllWeapons", args => {
        const title = args.title;
        const weapons = $gameParty.weapons();
        PHPlugins.PHWarehouse.depositAllItems(title, weapons, 'weapon');
    });

    PluginManager.registerCommand(PHPluginName, "DepositAllArmors", args => {
        const title = args.title;
        const armors = $gameParty.armors();
        PHPlugins.PHWarehouse.depositAllItems(title, armors, 'armor');
    });

    PluginManager.registerCommand(PHPluginName, "DepositAllKeyItems", args => {
        const title = args.title;
        const items = $gameParty.items().filter(value=>(value.itypeId === 2));
        PHPlugins.PHWarehouse.depositAllItems(title, items, 'keyItem');
    });

    /* ---- MANAGEMENT METHODS ---- */

    /* Get all the items from the current warehouse */
    PHWarehouseManager.prototype.getItems = function() {
        let totalItems = this.getCommonItems();
        totalItems = totalItems.concat(this.getArmors());
        totalItems = totalItems.concat(this.getKeyItems());
        totalItems = totalItems.concat(this.getWeapons());
        return totalItems;
    };

    /* Get weapon items */
    PHWarehouseManager.prototype.getWeapons = function() {
        const totalItems = [];
        for (let i = 0; i < this._warehouses[this._lastActive].items.weapon.length; i++) {
            for (let j = 0; j < $dataWeapons.length; j++) {
                if ($dataWeapons[j] != null && this._warehouses[this._lastActive].items.weapon[i] == $dataWeapons[j].id) {
                    totalItems.push($dataWeapons[j]);
                }
            }
        }
        return totalItems;
    };

    /* Get common items */
    PHWarehouseManager.prototype.getCommonItems = function() {
        const totalItems = [];
        for (let i = 0; i < this._warehouses[this._lastActive].items.item.length; i++) {
            for (let j = 0; j < $dataItems.length; j++) {
                if ($dataItems[j] != null && this._warehouses[this._lastActive].items.item[i] == $dataItems[j].id) {
                    totalItems.push($dataItems[j]);
                }
            }
        }
        return totalItems;
    };

    /* Get armor items */
    PHWarehouseManager.prototype.getArmors = function() {
        const totalItems = [];
        for (let i = 0; i < this._warehouses[this._lastActive].items.armor.length; i++) {
            for (let j = 0; j < $dataArmors.length; j++) {
                if ($dataArmors[j] != null && this._warehouses[this._lastActive].items.armor[i] == $dataArmors[j].id) {
                    totalItems.push($dataArmors[j]);
                }
            }
        }
        return totalItems;
    };

    /* Get key items */
    PHWarehouseManager.prototype.getKeyItems = function() {
        const totalItems = [];
        for (let i = 0; i < this._warehouses[this._lastActive].items.keyItem.length; i++) {
            for (let j = 0; j < $dataItems.length; j++) {
                if ($dataItems[j] != null && this._warehouses[this._lastActive].items.keyItem[i] == $dataItems[j].id) {
                    totalItems.push($dataItems[j]);
                }
            }
        }
        return totalItems;
    };

    /* Get the quantity for the corresponding item */
    PHWarehouseManager.prototype.getQuantity = function(item) {
        this.verifyAllTogether(item);
        const qtty = this._warehouses[this._lastActive].qtty[this._lastCategory][item.id];
        this.undoAllTogetherVerification();
        return qtty;
    };

    /* Checks whether or not the warehouse is already full */
    PHWarehouseManager.prototype.checkCapacity = function() {
        const capacity = this.getCurrentCapacity(this._lastActive);
        if (capacity < this._warehouses[this._lastActive].maxCapacity) {
            return true;
        }
        return false;
    };

    /* ---- OPERATION METHODS ---- */

    /* Deposit on warehouse */
    PHWarehouseManager.prototype.deposit = function(item) {
        if (this.checkCapacity()) {
            this.verifyAllTogether(item);
            if (this._lastCategory != 'all') {
                let hasItem = false;
                if (this._warehouses[this._lastActive].items[this._lastCategory].indexOf(item.id) > -1) {
                    hasItem = true;
                }

                if (hasItem) {
                    this._warehouses[this._lastActive].qtty[this._lastCategory][item.id]++;
                } else {
                    this._warehouses[this._lastActive].items[this._lastCategory].push(item.id);
                    this._warehouses[this._lastActive].qtty[this._lastCategory][item.id] = 1;
                }
                this._warehouses[this._lastActive].currentCapacity++;
            }
            this.undoAllTogetherVerification();

        }

    };

    /* Withdraw from a warehouse */
    PHWarehouseManager.prototype.withdraw = function(item) {

        this.verifyAllTogether(item);

        if (this._lastCategory != 'all') {
            var hasItem = false;
            var index = this._warehouses[this._lastActive].items[this._lastCategory].indexOf(item.id);
            if (index > -1) {
                hasItem = true;
            }

            if (hasItem) {
                this._warehouses[this._lastActive].qtty[this._lastCategory][item.id]--;
                if (this._warehouses[this._lastActive].qtty[this._lastCategory][item.id] == 0) {
                    this._warehouses[this._lastActive].items[this._lastCategory].splice(index, 1);
                    delete this._warehouses[this._lastActive].qtty[this._lastCategory][item.id];
                }
                this._warehouses[this._lastActive].currentCapacity--;
            }
        }

        this.undoAllTogetherVerification();

    };
    



    /* ---- INTERNAL METHODS ---- */

    /* Main method for checking items inside warehouses */
    PHWarehouseManager.prototype.hasItems = function(title, id, category) {
        if (this._warehouses.hasOwnProperty(title) && this._warehouses[title].items[category].indexOf(id) > -1) {
            return this._warehouses[title].qtty[category][id];
        }
        return 0;
    };

    /* ---- ACCESSOR METHODS ---- */

    /* Return the value of the maximum capacity of the warehouse for the given title */
    PHWarehouseManager.prototype.getMaxCapacity = function(title) {
        if (this._warehouses.hasOwnProperty(title)) {
            return this._warehouses[title].maxCapacity;
        }
        return 0;
    };

    /* Return the value of the quantity of items in the warehouse for the given title */
    PHWarehouseManager.prototype.getCurrentCapacity = function(title) {
        if (this._warehouses.hasOwnProperty(title)) {
            if (PHPlugins.Params.PHWarehouseStackItemQuantity == true) {
                return (this._warehouses[title].items.item.length + this._warehouses[title].items.weapon.length + this._warehouses[title].items.keyItem.length + this._warehouses[title].items.armor.length);
            } else {
                return this._warehouses[title].currentCapacity;
            }
        }
        return 0;
    };

    /* Return whether or not the warehouse for the given title exists */
    PHWarehouseManager.prototype.exist = function(title) {
        if (this._warehouses.hasOwnProperty(title) && this._warehouses[title] !== undefined) {
            return true;
        }
        return false;
    };

    /* Checks if the given warehouse has an item */
    PHWarehouseManager.prototype.hasItem = function(title, id) {
        return this.hasItems(title, id, 'item');
    };

    /* Checks if the given warehouse has a weapon */
    PHWarehouseManager.prototype.hasWeapon = function(title, id) {
        return this.hasItems(title, id, 'weapon');
    };

    /* Checks if the given warehouse has an armor */
    PHWarehouseManager.prototype.hasArmor = function(title, id) {
        return this.hasItems(title, id, 'armor');
    };

    /* Checks if the given warehouse has a key item */
    PHWarehouseManager.prototype.hasKeyItem = function(title, id) {
        return this.hasItems(title, id, 'keyItem');
    };



    /* ---------------------------------------------------------- *
     *                      LOADING PROCESS                       *
     * ---------------------------------------------------------- */

    /* Creating PHWarehouse variable after loading the whole database */
    var _DataManager_createGameObjects_ = DataManager.createGameObjects;
    DataManager.createGameObjects = function() {
        _DataManager_createGameObjects_.call(this);
        PHPlugins.PHWarehouse = new PHWarehouseManager();
        PHPlugins.PHWarehouse.loadRules();
    };

    /* Saves the warehouses when the player saves the game */
    var _DataManager_makeSaveContents_ = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _DataManager_makeSaveContents_.call(this);
        contents.phwarehouse = PHPlugins.PHWarehouse._warehouses;
        return contents;
    };

    /* Retrieve the warehouses from the save content */
    var _DataManager_extractSaveContents_ = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents_.call(this, contents);
        PHPlugins.PHWarehouse = new PHWarehouseManager();
        if (contents.phwarehouse) {
            PHPlugins.PHWarehouse._warehouses = contents.phwarehouse;
            PHPlugins.PHWarehouse.loadRules();
        } else {
            throw "Warehouse data is missing";
        }
    };



    /* ---------------------------------------------------------- *
     *                       WINDOW PROCESS                       *
     * ---------------------------------------------------------- */

    function Window_WarehouseTitle() {
        this.initialize.apply(this, arguments);
    }
    Window_WarehouseTitle.prototype = Object.create(Window_Base.prototype);
    Window_WarehouseTitle.prototype.constructor = Window_WarehouseTitle;

    Window_WarehouseTitle.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.refresh();
    };

    Window_WarehouseTitle.prototype.refresh = function() {
        this.contents.clear();
        this.changeTextColor(ColorManager.crisisColor());
        this.drawText(PHPlugins.PHWarehouse._lastActive, 0, 0, Graphics.boxWidth, "center");
    };

    function Window_WarehouseOption() {
        this.initialize.apply(this, arguments);
    }
    Window_WarehouseOption.prototype = Object.create(Window_Selectable.prototype);
    Window_WarehouseOption.prototype.constructor = Window_WarehouseOption;

    Window_WarehouseOption.prototype.initialize = function(rect) {
        Window_Selectable.prototype.initialize.call(this, rect);
        this.withdrawText = PHPlugins.Params.PHWarehouseWithdrawText;
        this.depositText = PHPlugins.Params.PHWarehouseDepositText;
        this.refresh();
        this.select(0);
        this.activate();
    };

    Window_WarehouseOption.prototype.maxItems = function() {
        return 2;
    };

    Window_WarehouseOption.prototype.maxCols = function() {
        return 2;
    };

    Window_WarehouseOption.prototype.changeOption = function() {
        PHPlugins.PHWarehouse._lastOption = this._index;
    };

    Window_WarehouseOption.prototype.refresh = function() {
        var rectWithdraw = this.itemRect(0);
        var rectDeposit = this.itemRect(1);
        this.drawText(this.withdrawText, rectWithdraw.x, rectWithdraw.y, rectWithdraw.width, "center");
        this.drawText(this.depositText, rectDeposit.x, rectDeposit.y, rectDeposit.width, "center");
    };



    function Window_WarehouseCategory() {
        this.initialize.apply(this, arguments);
    }
    Window_WarehouseCategory.prototype = Object.create(Window_ItemCategory.prototype);
    Window_WarehouseCategory.prototype.constructor = Window_WarehouseCategory;

    Window_WarehouseCategory.prototype.initialize = function(rect) {
        Window_ItemCategory.prototype.initialize.call(this, rect);
        this.deselect();
        this.deactivate();
    };

    Window_WarehouseCategory.prototype.changeCategory = function() {
        PHPlugins.PHWarehouse._lastCategory = this.currentSymbol() || "item";
    };

    Window_WarehouseCategory.prototype.maxCols = function() {
        if (PHPlugins.Params.PHWarehouseAllTogether == true) {
            return 1;
        }
        var cols = 0;
        if (PHPlugins.PHWarehouse.isItemEnabled()) {
            cols++;
        }
        if (PHPlugins.PHWarehouse.isWeaponEnabled()) {
            cols++;
        }
        if (PHPlugins.PHWarehouse.isArmorEnabled()) {
            cols++;
        }
        if (PHPlugins.PHWarehouse.isKeyItemEnabled()) {
            cols++;
        }
        return cols;
    };

    Window_WarehouseCategory.prototype.makeCommandList = function() {
        if (PHPlugins.Params.PHWarehouseAllTogether == true) {
            this.addCommand(PHPlugins.Params.PHWarehouseAllText, 'all');
        } else {
            if (PHPlugins.PHWarehouse.isItemEnabled()) {
                this.addCommand(TextManager.item, 'item');
            }
            if (PHPlugins.PHWarehouse.isWeaponEnabled()) {
                this.addCommand(TextManager.weapon, 'weapon');
            }
            if (PHPlugins.PHWarehouse.isArmorEnabled()) {
                this.addCommand(TextManager.armor, 'armor');
            }
            if (PHPlugins.PHWarehouse.isKeyItemEnabled()) {
                this.addCommand(TextManager.keyItem, 'keyItem');
            }
        }
    };

    Window_WarehouseCategory.prototype.setItemWindow = function(itemWindow) {
        this._itemWindow = itemWindow;
        this.update();
    };

    Window_WarehouseCategory.prototype.update = function() {
        Window_ItemCategory.prototype.update.call(this);
        this.changeCategory();
        this._itemWindow.refresh();
    };



    function Window_WarehouseItemList() {
        this.initialize.apply(this, arguments);
    }
    Window_WarehouseItemList.prototype = Object.create(Window_ItemList.prototype);
    Window_WarehouseItemList.prototype.constructor = Window_WarehouseItemList;

    Window_WarehouseItemList.prototype.initialize = function(rect) {
        Window_ItemList.prototype.initialize.call(this, rect);
    };

    Window_WarehouseItemList.prototype.isCurrentItemEnabled = function() {
        if (this._data.length > 0) {
            if (PHPlugins.PHWarehouse._lastOption == 1 && PHPlugins.PHWarehouse.checkCapacity()) {
                return true;
            } else if (PHPlugins.PHWarehouse._lastOption == 0) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    Window_WarehouseItemList.prototype.makeWarehouseItemList = function() {
        var data = PHPlugins.PHWarehouse.getItems();
        this._data = data.filter(function(item) {
            if (PHPlugins.Params.PHWarehouseAllTogether == true) {
                return this.includesWarehouseAll(item);
            } else {
                return this.includes(item);
            }
        }, this);
        if (this.includes(null)) {
            this._data.push(null);
        }
    };

    Window_WarehouseItemList.prototype.includesWarehouseAll = function(item) {
        return ( (DataManager.isItem(item) && item.itypeId === 1) || (DataManager.isWeapon(item)) || (DataManager.isArmor(item)) || (DataManager.isItem(item) && item.itypeId === 2) );
    };

    Window_WarehouseItemList.prototype.makeDepositAllItemList = function() {
        this._data = $gameParty.allItems();
    };

    Window_WarehouseItemList.prototype.loadItems = function() {

        // Deposit
        if (PHPlugins.PHWarehouse._lastOption == 1) {
            if (PHPlugins.Params.PHWarehouseAllTogether == true) {
                this.makeDepositAllItemList();
            } else {
                this.makeItemList();
            }
        }
        // Withdraw
        else if (PHPlugins.PHWarehouse._lastOption == 0) {
            this.makeWarehouseItemList();
        }

    };

    Window_WarehouseItemList.prototype.drawItem = function(index) {
        var item = this._data[index];
        if (item) {
            var numberWidth = this.numberWidth();
            var rect = this.itemRect(index);
            rect.width -= this.itemPadding();

            this.changePaintOpacity(PHPlugins.PHWarehouse.verifyItem(item));
            this.drawItemName(item, rect.x, rect.y, rect.width - numberWidth);

            if (PHPlugins.PHWarehouse._lastOption == 1) {
                this.drawItemNumber(item, rect.x, rect.y, rect.width);
            } else if (PHPlugins.PHWarehouse._lastOption == 0) {
                this.drawWarehouseItemNumber(item, rect.x, rect.y, rect.width);
            }

            this.changePaintOpacity(1);
        }
    };

    Window_WarehouseItemList.prototype.drawWarehouseItemNumber = function(item, x, y, width) {
        var qtty = PHPlugins.PHWarehouse.getQuantity(item);
        if (qtty !== undefined) {
            this.drawText(':', x, y, width - this.textWidth('00'), 'right');
            this.drawText(qtty, x, y, width, 'right');
        }
    };

    Window_WarehouseItemList.prototype.refresh = function() {
        this.contents.clear();
        this.loadItems();
        this.drawAllItems();
        Window_Selectable.prototype.refresh.call(this);
    };

    Window_WarehouseItemList.prototype.moveItem = function() {

        var item = this.item();

        // Deposit
        if (PHPlugins.PHWarehouse._lastOption == 1) {
            if (PHPlugins.PHWarehouse.checkCapacity() && PHPlugins.PHWarehouse.verifyItem(item)) {
                SoundManager.playEquip();
                PHPlugins.PHWarehouse.deposit(item);
                $gameParty.loseItem(item, 1);
            } else {
                SoundManager.playBuzzer();
            }
        }

        // Withdraw
        else if (PHPlugins.PHWarehouse._lastOption == 0) {
            if (PHPlugins.PHWarehouse.verifyItem(item)) {
                var numItems = $gameParty.numItems(item);
                $gameParty.gainItem(item, 1);
                if (numItems < $gameParty.numItems(item)) {
                    SoundManager.playEquip();
                    PHPlugins.PHWarehouse.withdraw(item);
                } else {
                    SoundManager.playBuzzer();
                }
            } else {
                SoundManager.playBuzzer();
            }
        }
    };

    Window_WarehouseItemList.prototype.playOkSound = function() { };



    function Window_WarehouseInfo() {
        this.initialize.apply(this, arguments);
    }
    Window_WarehouseInfo.prototype = Object.create(Window_Base.prototype);
    Window_WarehouseInfo.prototype.constructor = Window_WarehouseInfo;

    Window_WarehouseInfo.prototype.initialize = function(rect) {
        Window_Base.prototype.initialize.call(this, rect);
        this.availableSpaceText = PHPlugins.Params.PHWarehouseAvailableSpaceText + " ";
        this.refresh();
    };

    Window_WarehouseInfo.prototype.refresh = function() {
        this.contents.clear();
        this.availableSpaceValue = (PHPlugins.PHWarehouse._warehouses[PHPlugins.PHWarehouse._lastActive].maxCapacity - PHPlugins.PHWarehouse.getCurrentCapacity(PHPlugins.PHWarehouse._lastActive)) + " / " + PHPlugins.PHWarehouse._warehouses[PHPlugins.PHWarehouse._lastActive].maxCapacity;
        this.changeTextColor(ColorManager.normalColor());
        this.drawText(this.availableSpaceText + this.availableSpaceValue, 0, 0, this.x);
    };



    /* ---------------------------------------------------------- *
     *                        SCENE PROCESS                       *
     * ---------------------------------------------------------- */

    function Scene_Warehouse() {
        this.initialize.apply(this, arguments);
    }
    Scene_Warehouse.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_Warehouse.prototype.constructor = Scene_Warehouse;

    Scene_Warehouse.prototype.initialize = function() {
        Scene_MenuBase.prototype.initialize.call(this);
    };

    Scene_Warehouse.prototype.create = function() {
        Scene_MenuBase.prototype.create.call(this);

        this.createTitle();
        this.createOptions();
        this.createCategory();
        this.createItemList();
        this.createInfoLocation();

    };

    Scene_Warehouse.prototype.createTitle = function() {
        const rect = this.WarehouseTitleWindowRect();
        this._titleWindow = new Window_WarehouseTitle(rect);
        this.addWindow(this._titleWindow);
    };

    Scene_Warehouse.prototype.WarehouseTitleWindowRect = function() {
        const wx = 0;
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Warehouse.prototype.createOptions = function() {
        const rect = this.WarehouseOptionWindowRect();
        this._optionWindow = new Window_WarehouseOption(rect);
        this._optionWindow.setHandler('cancel', this.popScene.bind(this));
        this._optionWindow.setHandler('ok', this.onOptionOk.bind(this));
        this.addWindow(this._optionWindow);
    };

    Scene_Warehouse.prototype.WarehouseOptionWindowRect = function() {
        const rect = this.WarehouseTitleWindowRect();
        const wx = 0;
        const wy = rect.y + rect.height;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Warehouse.prototype.createCategory = function() {
        const rect = this.categoryWindowRect();
        this._categoryWindow = new Window_WarehouseCategory(rect);
        this._categoryWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
        this._categoryWindow.setHandler('ok', this.onCategoryOk.bind(this));
        this.addWindow(this._categoryWindow);
    };

    Scene_Warehouse.prototype.categoryWindowRect = function() {
        const rect = this.WarehouseOptionWindowRect();
        const wx = 0;
        const wy = rect.y + rect.height;
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, true);
        return new Rectangle(wx, wy, ww, wh);
    };
    
    Scene_Warehouse.prototype.createItemList = function() {
        const rect = this.itemListWindowRect();
        this._itemWindow = new Window_WarehouseItemList(rect);
        this._itemWindow.setHandler('ok', this.onItemOk.bind(this));
        this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
        this.addWindow(this._itemWindow);
        this._categoryWindow.setItemWindow(this._itemWindow);
    };

    Scene_Warehouse.prototype.itemListWindowRect = function() {
        const rect = this.categoryWindowRect();
        const wx = 0;
        const wy = rect.y + rect.height;
        const ww = Graphics.boxWidth;
        const wh = Graphics.boxHeight - wy - this.calcWindowHeight(1, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Warehouse.prototype.createInfoLocation = function() {
        const rect = this.WarehouseInfoWindowRect();
        this._infoLocationWindow = new Window_WarehouseInfo(rect);
        this.addWindow(this._infoLocationWindow);
    };

    Scene_Warehouse.prototype.WarehouseInfoWindowRect = function() {
        const wx = 0;
        const wy = Graphics.boxHeight - this.calcWindowHeight(1, false);
        const ww = Graphics.boxWidth;
        const wh = this.calcWindowHeight(1, false);
        return new Rectangle(wx, wy, ww, wh);
    };

    Scene_Warehouse.prototype.onOptionOk = function() {
        this._optionWindow.changeOption();
        this._categoryWindow.activate();
        this._categoryWindow.select(0);
        this._optionWindow.deactivate();
    };

    Scene_Warehouse.prototype.onCategoryOk = function() {
        this._itemWindow.activate();
        if (this._itemWindow._data.length > 0) {
            this._itemWindow.select(0);
        }
        this._categoryWindow.deactivate();
    };

    Scene_Warehouse.prototype.onCategoryCancel = function() {
        this._categoryWindow.deselect();
        this._optionWindow.activate();
    };

    Scene_Warehouse.prototype.onItemCancel = function() {
        this._itemWindow.deselect();
        this._categoryWindow.activate();
    };

    Scene_Warehouse.prototype.onItemOk = function() {
        this._itemWindow.moveItem();
        this._infoLocationWindow.refresh();
        this._itemWindow.activate();
    };

})();