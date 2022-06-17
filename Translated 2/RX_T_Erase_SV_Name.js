//=============================================================================
// Plugin_Name : Deleting and restoring switch and variable names at once
// File_Name   : RX_T_Erase_SV_Name.js
// Version     : 1.00
// Copylight   : 2015,2020 TYPE74RX-T
//=============================================================================


//=============================================================================
/*:
 * @target Support for MV and MZ, but do not apply the plugin unless you need it.
 * @plugindesc Allows you to delete or restore switch and variable names at once.
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param Language
 * @text Language
 * @desc Language selection for Utility.
 * Normally, it is recommended to leave it as it is.
 * @type select
 * @default en
 * @option 1.日本語
 * @value jp
 * @option 2.English
 * @value en

 * @help Deleting and restoring switch and variable names at once
 *
 * This plugin is compatible with RPG Maker MV and RPG Maker MZ.
 *
 * The indication that this plugin is not supported in MZ is given, but this is
 * a simple measure to prevent it from being applied except when necessary.
 *
 * ◆Summary
 * Clear the names of game switches and game variables.
 * You can make it difficult for players to see what switches and variables are
 * being used for when they see the contents of your save data.
 *
 * It also has the ability to recover deleted names in case you need to
 * fix a bug.
 *
 * ◆Usage
 * When you start the game with the plugin installed, the game goes into
 * utility mode.
 * It is mainly a dialog box operation, and it will automatically terminate
 * when the operation is completed.
 *
 * The timing for using this plugin is limited to after the game development is
 * completed and just before deployment.
 *
 * This plugin is designed to be deployed after the game is completed.
 * Therefore, the text in the utility is also based on the assumption that the
 * deployment will take place after the game is completed.
 *
 * [About the dialog box]
 * Select the process in the first dialog box.
 * Type in half-width numbers and click the OK button.
 * Select 1 to enter erase mode.
 * Select 2 to enter restore mode.
 * Select 3 to finish.
 *
 * After that, read the contents of the dialog box that appears a few times and
 * click the OK button to automatically close the launched game.
 * （In RPG Maker MZ, the option to reload the project appears automatically.）
 *
 * ◆Caution
 * If the operation is wrong, the switch name and variable name cannot be
 * restored.
 * It is recommended that you perform a restore operation as soon as you have
 * performed a deployment after performing the erasure.
 *
 * ◆Notes
 * The restoration file is stored in "sw_var_names.json" in the
 * "Sw_Var_NameData" folder.
 * This folder will also remain in the deployment destination, so when you
 * publish your game, make sure that this folder is not present.
 *
 * Also, you don't need to worry about the parameters of the plugin.
 * It's just that the language of the utility is different between the English
 * and Japanese versions.
 *
 * ◆License
 * This plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
*/
/*:ja
 * @target Support for MV and MZ, but do not apply the plugin unless you need it.
 * @plugindesc スイッチ名と変数名の一括削除、または復元ができるようになります。
 * @author TYPE74RX-T
 * @url https://mdc-light.jpn.org/TYPE74RX-T/
 *
 * @param Language
 * @text 言語
 * @desc ナビゲーションの言語選択です。
 * 通常はそのままの設定を推奨します。
 * @type select
 * @default jp
 * @option 1.日本語
 * @value jp
 * @option 2.English
 * @value en

 * @help スイッチ名・変数名の一括削除と復元
 *
 * このプラグインはRPGツクールMV、RPGツクールMZに対応しています。
 *
 * このプラグインは、MZにおいては対応していない、という趣旨の表示が出ますが
 * これは必要時以外の適用を防ぐための簡単な処置です。
 *
 * ◆概要
 * ゲームスイッチやゲーム変数の名前を消去します。
 * プレイヤーにセーブデータ等の中身を見られた時どんな用途でスイッチや変数を
 * 使われているかを分かりにくくすることができます。
 *
 * バグ修正が必要になった時のために消去した名前を復元する機能も備えています。
 *
 * ◆使い方
 * プラグインを導入した状態でゲームを始めるとユーティリティモードになります。
 * ダイアログボックスでの操作が主体となり、一通り操作を終えたら終了します。
 *
 * 本プラグインの使用タイミングは、ゲーム完成後、デプロイメント直前に
 * 限られます。
 *
 * 本プラグインは、ゲーム完成後にデプロイメントを行うことを前提に
 * 作られています。
 * そのため、ユーティリティ内のテキストも、ゲーム完成後にデプロイメントを
 * 行うとみなした内容になっています。
 *
 * 【ダイアログボックスについて】
 * 最初のダイアログボックスで処理を選択します。
 * 半角数字で入力してOKボタンをクリックしてください。
 * 1を選択すると消去モードになります。
 * 2を選択すると復元モードになります。
 * 3を選択すると終了します。
 *
 * あとはダイアログボックスに記載されていることをよくお読みの上
 * OKボタンをクリックしていくと、立ち上げたゲームは終了します。
 * （RPGツクールMZでは、自動的にプロジェクトのリロードの選択肢が現れます。）
 *
 * ◆ご注意
 * 操作を間違えるとスイッチ名・変数名を復元できなくなります。
 * 消去を実行し、デプロイメントを実行したら
 * すぐに復元の操作をしておくことをおすすめします。
 *
 * ◆備考
 * 復元用ファイルは「Sw_Var_NameData」フォルダ内にある
 * sw_var_names.jsonに保存されています。
 * これはデプロイメント先にも存在していますので
 * フォルダごと消去しておいてください。
 *
 * またプラグインのパラメータを気にする必要はありません。
 * ただ、日本語版か英語版かでユーティリティの言語が違うだけです。
 *
 * ◆ライセンス
 * このプラグインはMITライセンスで公開されています。
 * http://opensource.org/licenses/mit-license.php
*/
(() => {
    'use strict';

    //RX-T original function
    const rx_ESV = PluginManager.parameters('RX_T_Erase_SV_Name');
    const rx_ESVN_Lang = rx_ESV['Language'];

    //RX-T Prosess for Name of Switch and Variable Data

    function RX_T_Sw_NmData(option) {
        this._swnames = [];
        this._varnames = [];
        this._sizeS = 0;
        this._sizeV = 0;
        if (option === 1) this.clear_sw_var_names();
        if (option === 2) this.recovery_sw_var_names();
    }

    RX_T_Sw_NmData.prototype.verRM = function() {
        const verRM = PluginManager._commands !== undefined ? "MZ" : "MV";
        return verRM;
    };

    RX_T_Sw_NmData.prototype.localFileDirPath = function(folderName, fileName) {
        const verRM = this.verRM();
        if (verRM === "MZ") return StorageManager.fileDirectoryPath().replace(/save/g, folderName) + fileName;
        if (verRM === "MV") return StorageManager.localFileDirectoryPath().replace(/save/g, folderName) + fileName;
    };

    RX_T_Sw_NmData.prototype.clear_sw_var_names = function() {
        let fs = require('fs');
        const dirPath = this.localFileDirPath("Sw_Var_NameData", "");
        const filePath = this.localFileDirPath("Sw_Var_NameData", "sw_var_names.json");
        let alertText = "";
        const sysFilePath = this.localFileDirPath('data', "System.json");
        const noop = () => {};
        if (rx_ESVN_Lang === "jp") alertText = "復元用ファイル「sw_var_names.json」を次の場所に保存しました。\n" + filePath + "\n\nこのフォルダはデプロイメント先にも残りますので\nゲーム公開時、このフォルダが無い状態にしてください。";
        if (rx_ESVN_Lang === "en") alertText = "Saved the restoration file \"sw_var_names.json\" to the following location:\n" + filePath + "\n\nThis folder will also remain in the deployment destination, so when you publish your game, make sure that this folder is not present.";
        this._sizeS = Object.keys($dataSystem.switches).length;
        this._sizeV = Object.keys($dataSystem.variables).length;
        for (let i = 0; i < this._sizeS ; i++){
            this._swnames[i] = $dataSystem.switches[i];
            $dataSystem.switches[i] = "";
        }
        for (let i = 1; i < this._sizeV ; i++){
            this._varnames[i] = $dataSystem.variables[i];
            $dataSystem.variables[i] = "";
        }
        fs.writeFile(sysFilePath, JSON.stringify($dataSystem), noop);
        fs = require('fs');
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
        }
        fs.writeFile(filePath, JSON.stringify(this), noop);
        alert(alertText);
    };

    RX_T_Sw_NmData.prototype.recovery_sw_var_names = function() {
        let fs = require('fs');
        const filePath = this.localFileDirPath('Sw_Var_NameData', "sw_var_names.json");
        let alertText = "";
        let rx_ESVNData;
        const sysFilePath = this.localFileDirPath('data', "System.json");
        if (rx_ESVN_Lang === "jp") alertText = "消去したゲームスイッチとゲーム変数の名前を元に戻しました。";
        if (rx_ESVN_Lang === "en") alertText = "Restored the names of the deleted game switches and game variables.";
        const noop = () => {};
        this._sizeS = Object.keys($dataSystem.switches).length;
        this._sizeV = Object.keys($dataSystem.variables).length;
        if (fs.existsSync(filePath)) {
            rx_ESVNData = fs.readFileSync(filePath, { encoding: 'utf8' });
        }
        const obj = (new Function("return " + rx_ESVNData))();
        for (let i = 0; i < obj._sizeS ; i++) {
            $dataSystem.switches[i] = obj._swnames[i];
        }
        for (let i = 1; i < obj._sizeV ; i++) {
            $dataSystem.variables[i] = obj._varnames[i];
        }
        fs = require('fs');
        fs.writeFile(sysFilePath, JSON.stringify($dataSystem) , noop);
        alert(alertText);
    };

    //RX-T Original Utility

    function RX_T_Sw_NmUtil() {
        this.result = false
        this.jpUtilText = "１）ゲームスイッチとゲーム変数の名前を消去\n２）消去したゲームスイッチとゲーム変数の名前を元に戻す\n３）ユーティリティの終了\n\n１～３のどれかを選んで「OK」ボタンを押してください。";
        this.enUtilText = "1)Clear the names of Game-switches and Game-variables\n2)Restore the names of deleted Game-switches and Game-variables\n3)Exit\n\nChoose a process from the above, enter a number and press the \"OK\" button.";
    }

    RX_T_Sw_NmUtil.prototype.modeUtility = function() {
        while (!this.result){
            if (rx_ESVN_Lang === "jp") $gameTemp._rx_ESVResult = parseInt(prompt(this.jpUtilText));
            if (rx_ESVN_Lang === "en") $gameTemp._rx_ESVResult = parseInt(prompt(this.enUtilText));
            if ($gameTemp._rx_ESVResult >= 1 && $gameTemp._rx_ESVResult <= 3) this.result = true;
        }
        return this.result;
    };

    // Scene_Map

    const rx_t_smu200908_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        if ($gameTemp._rx_ESVResult !== undefined) {
            if ($gameTemp._rx_ESVResult === 3) SceneManager.terminate();
            if ($gameTemp._rx_ESVResult <= 2) SceneManager.push(Scene_Debug);
        }
        const rx_ESVN = new RX_T_Sw_NmUtil(); 
        if ($gameTemp._rx_ESVResult === undefined) rx_ESVN.modeUtility();
        rx_t_smu200908_update.call(this);
    };

    // Scene_Debug

    const rx_t_sdpi200908_initialise = Scene_Debug.prototype.initialize;
    Scene_Debug.prototype.initialize = function() {
        rx_t_sdpi200908_initialise.call(this);
        new RX_T_Sw_NmData($gameTemp._rx_ESVResult);
        $gameTemp._rx_ESVProcessEnd = false;
    };

    // Window_DebugRange

    const rx_t_wdrui151110_update = Window_DebugRange.prototype.update;
    Window_DebugRange.prototype.update = function() {
        let rx_alertESVUText = "";
        rx_t_wdrui151110_update.call(this);
        if (!$gameTemp._rx_ESVProcessEnd) {
            if ($gameTemp._rx_ESVResult === 1){
                if (rx_ESVN_Lang === "jp") rx_alertESVUText = "スイッチ名と変数名が消去されていることを確認してください。\nこの画面を終了させたらユーティリティ終了です。\nこのゲームのプロジェクトを一旦閉じて再度プロジェクトを開き直してください。";
                if (rx_ESVN_Lang === "en") rx_alertESVUText = "Make sure the switch and variable names are erased.\nExit this screen and the utility is finished.\nPlease close this game's project and reopen it again.";
            }
            if ($gameTemp._rx_ESVResult === 2){
                if (rx_ESVN_Lang === "jp") rx_alertESVUText = "スイッチ名と変数名が元の状態に復元されていることを確認してください。\nこの画面を終了させたらユーティリティ終了です。\nこのゲームのプロジェクトを一旦閉じて再度プロジェクトを開き直してください。";
                if (rx_ESVN_Lang === "en") rx_alertESVUText = "Make sure that the switch and variable names are restored to their original state.\nExit this screen and the utility is finished.\nPlease close this game's project and reopen it again.";
            }
            $gameTemp._rx_ESVProcessEnd = true;
            alert(rx_alertESVUText);
        }
    };

    const rx_t_wdrpc200908_processCancel = Window_DebugRange.prototype.processCancel;
    Window_DebugRange.prototype.processCancel = function() {
        let rx_alertESVUText = "";
        rx_t_wdrpc200908_processCancel.call(this);
        if ($gameTemp._rx_ESVResult === 1){
            if (rx_ESVN_Lang === "jp") rx_alertESVUText = "ユーティリティを終了します。\nこのゲームのプロジェクトを一旦閉じて再度プロジェクトを開き直してください。\n\nまた、デプロイメントされたフォルダにある「Sw_Var_NameData」フォルダは\n必ず消去してください。";
            if (rx_ESVN_Lang === "en") rx_alertESVUText = "Exit the utility.\nPlease close this game's project and reopen it again.\n\nAnd, be sure to delete the \"Sw_Var_NameData\" folder in the deployed folder.";
        }
        if ($gameTemp._rx_ESVResult === 2){
            if (rx_ESVN_Lang === "jp") rx_alertESVUText = "ユーティリティを終了します。\nこのゲームのプロジェクトを一旦閉じて再度プロジェクトを開き直してください。\n\nまた、本プラグインは必ず無効化してください。";
            if (rx_ESVN_Lang === "en") rx_alertESVUText = "Exit the utility.\nPlease close this game's project and reopen it again.\n\nAlso, be sure to disable this plugin.";
        }
        alert(rx_alertESVUText);
        SceneManager.terminate();
    };

})();