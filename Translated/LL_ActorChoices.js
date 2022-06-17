//=============================================================================
// RPGツクールMZ - LL_ActorChoices.js v1.0.0
//-----------------------------------------------------------------------------
// ルルの教会 (Lulu's Church)
// https://nine-yusha.com/
//
// URL below for license details.
// https://nine-yusha.com/plugin/
//=============================================================================

/*:
 * @target MZ
 * @plugindesc アクターを選択するプラグインコマンドを実装します。
 * @author ルルの教会
 * @url https://nine-yusha.com/plugin-actorchoices/
 *
 * @help LL_ActorChoices.js
 *
 * アクターを選択するプラグインコマンドを実装します。
 *
 * プラグインコマンド:
 *   アクター選択の処理: アクターを選択し、結果を変数で受け取ります。
 *
 * 利用規約:
 *   ・著作権表記は必要ございません。
 *   ・利用するにあたり報告の必要は特にございません。
 *   ・商用・非商用問いません。
 *   ・R18作品にも使用制限はありません。
 *   ・ゲームに合わせて自由に改変していただいて問題ございません。
 *   ・プラグイン素材としての再配布（改変後含む）は禁止させていただきます。
 *
 * 作者: ルルの教会
 * 作成日: 2020/10/18
 *
 * @command showActorChoices
 * @text アクター選択の処理
 * @desc アクターを選択し、結果を変数で受け取ります。
 *
 * @arg selectType
 * @text アクター選択の種類
 * @desc アクター選択の種類を選択してください。
 * @type select
 * @default partyMember
 * @option 現在のパーティメンバー
 * @value partyMember
 * @option 戦闘不能のパーティメンバー
 * @value deadPartyMember
 * @option 生存しているパーティメンバー
 * @value alivePartyMember
 * @option 先頭を除くパーティメンバー
 * @value secondPartyMember
 * @option パーティ未参加メンバー
 * @value reserveMember
 * @option 全てのメンバー
 * @value allMember
 *
 * @arg variableNumber
 * @text 結果受け取り変数
 * @desc 選択結果を受け取る変数IDを指定します。
 * @type variable
 *
 * @arg cancelType
 * @text キャンセル許可
 * @desc キャンセルされた場合は-1が変数に代入されます。
 * @default true
 * @type boolean
 *
 * @arg background
 * @text 選択肢ウィンドウ背景
 * @desc 選択肢ウィンドウの背景を指定してください。
 * @type select
 * @default 0
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 *
 * @arg positionType
 * @text 選択肢ウィンドウ位置
 * @desc 選択肢ウィンドウの位置を指定してください。
 * @type select
 * @default 2
 * @option 左
 * @value 0
 * @option 中
 * @value 1
 * @option 右
 * @value 2
 *
 * @arg messageText
 * @text 文章の表示
 * @desc 選択肢と同時に文章を表示する場合は入力してください。
 * メッセージと同様の制御文字が使用可能です。
 * @type multiline_string
 *
 * @arg messageBackground
 * @text 文章ウィンドウ背景
 * @desc 文章ウィンドウの背景を指定してください。
 * @type select
 * @default 0
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 *
 * @arg messagePositionType
 * @text 文章ウィンドウ位置
 * @desc 文章ウィンドウの位置を指定してください。
 * @type select
 * @default 2
 * @option 上
 * @value 0
 * @option 中
 * @value 1
 * @option 下
 * @value 2
 *
 * @arg messageSpeakerName
 * @text 名前欄
 * @desc メッセージ表示時の名前欄と同様の設定です。
 * 空にすると名前欄は非表示になります。
 * @type string
 *
 * @arg messageFaceName
 * @text 顔グラフィック
 * @desc メッセージ表示時の顔グラフィックと同様の設定です。
 * 空にすると顔グラフィックは非表示になります。
 * @dir img/faces
 * @type file
 * @require 1
 *
 * @arg messageFaceIndex
 * @text 顔グラフィック番号
 * @desc 顔グラフィックを設定する際の表示番号を指定します。
 * 左上から0, 1, 2...で指定します。
 * @type number
 * @default 0
 * @min 0
 * @max 7
 *
 * @arg selectActorLists
 * @text アクター絞込リスト
 * @desc 設定するとリスト内のアクターのみ選択肢に表示されます。
 * 通常は空のままで問題ありません。
 * @default []
 * @type struct<selectActorLists>[]
 */

/*~struct~selectActorLists:
 *
 * @param actorId
 * @text アクターID
 * @desc 選択肢に表示するアクターを選択してください。
 * @type actor
 *
 * @param switchId
 * @text スイッチID
 * @desc スイッチON時のみアクターを表示したい場合に設定します。
 * なしに設定した場合は、スイッチ条件に関わらず表示されます。
 * @type switch
 */

(() => {
    const pluginName = "LL_ActorChoices";

    PluginManager.registerCommand(pluginName, "showActorChoices", function(args) {
        if ($gameMessage.isBusy()) {
            return false;
        }

        // 設定を取得
        const variableNumber = Number(args.variableNumber);
        const cancelType = String(args.cancelType) === "true" ? -2 : -1;
        const positionType = Number(args.positionType);
        const background = Number(args.background);
        const selectType = String(args.selectType);

        const messageText = String(args.messageText);
        const messagePositionType = Number(args.messagePositionType);
        const messageBackground = Number(args.messageBackground);
        const messageSpeakerName = String(args.messageSpeakerName);
        const messageFaceName = String(args.messageFaceName);
        const messageFaceIndex = Number(args.messageFaceIndex);

        // アクター絞込リスト
        const selectActorLists = JSON.parse(args.selectActorLists || "null");
        let filterActorLists = [];
        if (selectActorLists) {
            selectActorLists.forEach(function(elm) {
                if (Number(JSON.parse(elm).switchId) === 0 || $gameSwitches.value(Number(JSON.parse(elm).switchId))) {
                    filterActorLists.push(Number(JSON.parse(elm).actorId));
                }
            });
        }

        // アクター選択リストを取得
        const actorLists = setupActorLists(selectType, filterActorLists);
        const choices = actorLists.map(item => item.name);

        // メッセージ表示
        if (messageText) {
            $gameMessage.setBackground(messageBackground);
            $gameMessage.setPositionType(messagePositionType);
            if (messageSpeakerName) $gameMessage.setSpeakerName(messageSpeakerName);
            if (messageFaceName) {
                $gameMessage.setFaceImage(messageFaceName, messageFaceIndex);
            }
            $gameMessage.add(messageText);
        }

        // アクター選択肢を表示
        $gameMessage.setChoices(choices, 0, cancelType);
        $gameMessage.setChoiceBackground(background);
        $gameMessage.setChoicePositionType(positionType);
        $gameMessage.setChoiceCallback(n => {
            if (n == -2) {
                $gameVariables.setValue(variableNumber, -1);
            } else {
                // 変数に選択されたアクターIDを代入
                $gameVariables.setValue(variableNumber, actorLists[n].id);
            }
        });

        this.setWaitMode("message");
    });

    const setupActorLists = function(selectType, filterActorLists) {
        let result = null;
        switch (selectType) {
            case "partyMember":
                // 現在のパーティメンバー
                result = $gameParty.members().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                });
                break;
            case "deadPartyMember":
                // 戦闘不能のパーティメンバー
                result = $gameParty.deadMembers().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                });
                break;
            case "alivePartyMember":
                // 生存しているパーティメンバー
                result = $gameParty.aliveMembers().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                });
                break;
            case "secondPartyMember":
                // 先頭を除くパーティメンバー
                result = partyMembers = $gameParty.members().map(function(item) {
                    if (item) return {"id": item._actorId, "name": item._name};
                }).slice(1);
                break;
            case "reserveMember":
                // パーティ未参加メンバー
                let exPartyMemberIds = $gameParty.members().map(function(item) {
                    if (item) return item._actorId;
                });
                result = $dataActors.filter(Boolean).map(function(item) {
                    if (item) return {"id": item.id, "name": item.name};
                }).filter(function(item) {
                    if (exPartyMemberIds.indexOf(item.id) === -1) return true;
                });
                break;
            default:
                // 全てのメンバー
                result = $dataActors.filter(Boolean).map(function(item) {
                    if (item) return {"id": item.id, "name": item.name};
                });
        }

        // アクター絞込 (設定時のみ)
        if (filterActorLists.length) {
            result = result.filter(function(item) {
                if (filterActorLists.indexOf(item.id) !== -1) return true;
            });
        }

        return result;
    }
})();
