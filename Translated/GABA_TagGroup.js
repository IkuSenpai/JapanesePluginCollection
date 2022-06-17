//=============================================================================
// RPG Maker MZ - Tag Group
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Group management of note tags.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_TagGroup.js(ver1.0.1)
 *
 * By writing one tag in the note field, you can set multiple tags.
 *
 * Group management is done with plugin parameters.
 * Be sure to enclose it in <>.
 * Group Name Tag: Write this tag in the actual note field.
 * Member Tags: When running the game, enter the content you want to apply in the note field.
 *
 * ex.)
 * Group Name Tag：<enemyGroupA>
 * Member Tags：<specialSize:big><boss><posY:5>
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param tagGroupList
 * @text Tag group list
 * @type struct<tagGroup>[]
 * @default []
 * @desc Register group name tags and member tags.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc メモ欄のタグをグループ管理します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 *
 * @help GABA_TagGroup.js(ver1.0.1)
 *
 * メモ欄にタグを１つ記述することで、
 * 任意のタグを複数設定できるようになります。
 *
 * グループ管理はプラグインパラメーターで行います。
 * タグは必ず<>で囲んでください。
 *   グループ名タグ：実際のメモ欄にはこのタグを書き込みます。
 *   メンバータグ：ゲーム実行時、メモ欄に適用したい内容を入力します。
 *
 *  ■例
 *   グループ名タグ：<enemyGroupA>
 *   メンバータグ：<specialSize:big><boss><posY:5>
 *
 * --------------------------
 * Copyright (c) 2021 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @param tagGroupList
 * @text タググループリスト
 * @type struct<tagGroup>[]
 * @default []
 * @desc グループ名タグとそのメンバータグを登録
 *
 */
/*~struct~tagGroup:
 *
 * @param groupNameTag
 * @text Group Name Tag
 * @type string
 * @desc Enter the group name tag.
 *
 * @param memberTags
 * @text Member Tags
 * @type multiline_string
 * @desc Enter tags. When running the game, the group name tag is replaced with member tags.
 *
 * @param note
 * @text Note
 * @type multiline_string
 * @desc For example, explain the purpose of the group.
 *
 */
/*~struct~tagGroup:ja
 *
 * @param groupNameTag
 * @text グループ名タグ
 * @type string
 * @desc グループ名となるタグを入力してください。実際のメモ欄にはこれを入力します。
 *
 * @param memberTags
 * @text メンバータグ
 * @type multiline_string
 * @desc タグを設定します。ゲーム実行時、グループ名タグはメンバータグに置き換えられます。
 *
 * @param note
 * @text ただのメモ
 * @type multiline_string
 * @desc グループの用途などを記載します。
 *
 */
(() => {
    "use strict";
    const pluginName = "GABA_TagGroup";

    const parameters = PluginManager.parameters(pluginName);
	const tagGroupList = paramConvertArray(parameters["tagGroupList"]);

    // metaを作る前にnoteの文字列を置き換え
    const _DataManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function(data) {

        for (const tagGroup of tagGroupList) {
            data.note = data.note.replace(tagGroup.groupNameTag, tagGroup.memberTags);
        }

        _DataManager_extractMetadata.apply(this, arguments);
    };

    // -------------------------
    // その他
    // -------------------------

    // パラメータの型変換
    function paramConvert(param) {
        if (param == null) return param;
        if (param.toString().trim() === "") return param;
        if (param === "true") return true;
        if (param === "false") return false;
        if (isNaN(param)) return param;
        return Number(param);
    }

    // 配列パラメータの型変換
    function paramConvertArray(param) {
        try {
            if (param == null || param === "") {
                return param;
            }

            return JSON.parse(param, (_, value) => {
                if (typeof(value) === "object") {
                    for (let i = 0; i < value.length; i++) {
                        value[i] = paramConvertArray(value[i]);
                    }
                    return value;
                } else {
                    return paramConvert(value);
                }
		    });
        } catch {
            console.log(pluginName + ":リストパラメータエラー");
            return param;
        }
    }
})();
