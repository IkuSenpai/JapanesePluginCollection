//=============================================================================
//  Keke_AnytimeFontChange - いつでもフォント変更
// バージョン: 1.1.1
//=============================================================================
// Copyright (c) 2021 ケケー
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc ゲーム中にパッとフォントを変更する
 * @author ケケー
 * @url http://kekeelabo.com
 * 
 *
 *
 * @help
 * 【1.1.1】
 * ゲーム中にパッとフォントを変更できる
 * 変更範囲はゲーム全体に及ぶ
 *
 *
 *
 * ◉ 使い方 ◉
 *
 * 【1】ファイル投入
 * フォントファイルを fontsフォルダ の中に入れる
 *
 *
 * 【2】フォント登録
 * プラグインパラメータでフォントを登録する
 * 入力事項は以下の二つ
 * ◎呼び出し名
 * フォントを呼び出す時に書く名前
 * ◎ファイル名
 * fontsフォルダに入れたファイルの名前
 *
 *
 * 【3】フォント変更
 * ゲーム中にフォントを変更する
 * 変更の仕方は二通り
 *
 * ⚫︎プラグインコマンド
 * => プラグインコマンド → フォント変更 → 呼び出し名
 * ここに【2】で登録した呼び出し名を書く
 *
 * ⚫︎制御文字
 * メッセージ中にこれを書く。場所はどこでもよい
 *  \呼び出し名\fn
 * ※fn は fontName の略
 * 例: 
 * \kee\fn
 * 呼び出し名が kee のフォントを呼び出す
 *  \m\fn
 * メインフォントに戻す
 * ※m は mainFont の略
 * このように m はメインフォント呼び出しに当てられているので、
 * 呼び出し名としては使わないこと
 *
 *
 * 【4】フォント変更の範囲
 * メインフォントを変更するため、
 * 変更範囲はメッセージ、メニュー、バトルUIなど、ゲーム全体に及ぶ
 *
 *
 *
 * ◉ 利用規約 ◉
 * MITライセンスのもと、自由に使ってくれて大丈夫です
 *
 *
 *
 *
 *
 * @param フォント登録リスト
 * @desc 使うフォントのリスト。呼び出し名は自由に。ファイル名は拡張子まで入れること。空欄ダブルクリックで何個でも追加できる
 * @type struct<fontCfg>[]
 * @default []
 *
 *
 *
 *
 *
 * @command fontChange
 * @text フォント変更
 * @desc フォントを変更する。パラメータで登録したフォント名を入力することでそのフォントに変更できる
 * @arg fontName
 * @type string
 * @text 呼び出し名
 * @desc フォントの呼び出し名。パラメータで登録した名前を入力する
 *
 *
 *
 *
 * @command fontReturn
 * @text フォント戻す
 * @desc フォントをメインフォントに戻す
 */
 
 
 
 
 
/*~struct~fontCfg:
 * @param 呼び出し名
 * @desc フォントの名前。フォントを呼び出すのに使う
 *
 * @param ファイル名
 * @desc フォントファイルの名前。fontsフォルダに置いてあるファイルの名前をそのまま入力する。拡張子まで入れること
 */





(() => {
    //- プラグイン名
    const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
    
    
    
    
    
    //--  文字列オート変換 /ベーシック  --//
    
    
    //- 文字列のハッシュ化
    String.prototype.toHashKe = function() {
        let hash = {};
        let str = this;
        if (!str.length) { return; }
        const strs = JSON.parse(str);
        let val = null;
        let val2 = null;
        for (let key in strs) {
            val = strs[key];
            if (!key || !val) { continue; }
            val2 = val.toAutoKe(key);
            hash[key] = val2;
        }
        return hash;
    };
    
    
    //- 文字列のリスト化
    String.prototype.toListKe = function() {
        let array = JSON.parse(this);
        return array.map((val, i) => {
            return val.toAutoKe();
        }, this);
    };
    
    
    //- 文字列の自動処理
    String.prototype.toAutoKe = function(key = "") {
        let val = this;
        let val2 = null;
        let match = null;
        let end = false;
        if (!end) {
            if (val[0] == "{") {
                val2 = val.toHashKe();
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "[") {
                val2 = val.toListKe();
                end = true;
            }
        }
        if (!end) { val = val + ","; }
        if (!end) {
            match = val.match(/^\s*(-?\d+,\s*-?\d+,\s*-?\d+,?\s*-?\d*\.?\d*)\s*,/);
            if (match && !val.match(/[a-z]/)) {
                if (key.match(/(カラー|色)/) && !key.includes("トーン") && !key.includes("ブレンド") && !key.includes("配色") && !key.includes("着色") &&  !key.includes("フラッシュ") && !key.includes("チェンジ") &&  !key.includes("選択")) {
                    val2 =  "rgba(" +  match[1] + ")";
                } else {
                    val2 =  eval("[" +  match[1] + "]");
                }
                end = true;
            }
        }
        if (!end) {
            match = val.match(/(-?\d+\.?\d*),\s*/g);
            if (match && match.length >= 2 && !val.match(/[a-z]/) && !val.match(/~/)) {
                val2 =  eval("[" + match.reduce((r, s) => r + s) + "]");
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(true|false)\s*,/);
            if (match) {
                val2 =  match[1] == "true" ? true : false;
                end = true;
            }
        }
        if (!end) {
            match = val.match(/^(-?\d+\.?\d*)\s*,/);
            if (match && !val.match(/[a-z]/)) {
                val2 = Number(match[1]); end = true;
                end = true;
            }
        }
        if (!end) {
            if (val[0] == "\"") { val = val.slice(1); }
            val2 = val.slice(0, -1);
        }
        return val2;
    };
    
    
    
    
    
    //--  プラグインコマンド基本 /ベーシック  --//
    
    
    //- プラグインコマンド呼び出しプリターを保存
    const _PluginManager_callCommand = PluginManager.callCommand;
    PluginManager.callCommand = function(self, pluginName, commandName, args) {
        $gameTemp._pluginCmdPreterKe = self;
        _PluginManager_callCommand.call(this, self, pluginName, commandName, args);
    };
    
    



    //--  パラメータ受け取り  --//
    
    
    var parameters = PluginManager.parameters(pluginName);
    var keke_fontList = parameters["フォント登録リスト"].toListKe()





    //--  プラグインコマンド  --//
    
    
    //- フォント変更
    PluginManager.registerCommand(pluginName, "fontChange", args => {
        changeFont(args.fontName, $gameTemp._pluginCmdPreterKe);
    });
    
    
    //- フォント戻す
    PluginManager.registerCommand(pluginName, "fontReturn", args => {
        // メインフォントに変更
        changeMainFont();
    });
    
    


     
    //--  共通処理  --//
    
    
    //- フォントの変更
    function changeFont(fontName, preter) {
        if (!fontName) { return; }
        // ファイル名を取得
        const fileName = getFontFileName(fontName);
        // あったらフォント変更
        if (fileName) {
            FontManager._states["rmmz-mainfont"] = null;
            FontManager.load("rmmz-mainfont", fileName);
        }
        // フォントウェイト開始
        preter._waitsFontKe = 1;
        return fileName;
    };
    
    
    //- フォントファイル名の取得
    function getFontFileName(fontName) {
        // フォント名がないならリターン
        if (!fontName) { return ""; }
         // mならメインフォントを取得
        if (fontName == "m") {
            return $dataSystem.advanced.mainFontFilename;
        }
        // イニット
        let fileName = "";
        // フォントリスト展開
        for (const cfg of keke_fontList) {
            // 同じ名前があったらファイル名を取得
            if (cfg["呼び出し名"] == fontName) {
                fileName = cfg["ファイル名"];
            }
        }
        return fileName;
    };
    
    
    //- メインフォントに変更
    function changeMainFont(preter) {
        FontManager._states["rmmz-mainfont"] = null;
        FontManager.load("rmmz-mainfont", $dataSystem.advanced.mainFontFilename);
        // フォントウェイト開始
        preter._waitsFontKe = 1;
    };
    
    
    //- フォントウェイト(インタープリター)
    const _Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait;
    Game_Interpreter.prototype.updateWait = function() {
        let result = _Game_Interpreter_updateWait.call(this);
        // ウェイト中なら
        if (this._waitsFontKe) {
            // フォントのロード完了を待つ
            if (FontManager._states["rmmz-mainfont"] != "loaded") {
                result = true;
            // 完了したらウェイト削除
            } else {
                this._waitsFontKe = null;
            }
        }
        return result 
    };
    
    
    
    
    
    //--  制御文字でのフォント変更  --//
    
    
    const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function(params) {
        // 制御文字によるフォント変更
        if (waitFontControllChar(this)) { return false; };
        return _Game_Interpreter_command101.call(this, params);
    };
    
    
    //- 制御文字によるフォント変更
    function waitFontControllChar(preter) {
        // フォント変更済みなら飛ばす
        if ($gameTemp._changedFontKe) {
            $gameTemp._changedFontKe = null;
            return false;
        }
        let success = false;
        // メッセージを取得
        const list = preter._list;
        let i = preter._index;
        let text = "";
        while (list[i + 1] && list[i + 1].code == 401) {
            i++;
            text += list[i].parameters[0];
        }
        // 制御文字がマッチしたら
        const match = text.match(/\\([^\\]+)\\fn/);
        if (match) {
            // フォント名を取得
            const fontName = match[1];
            // フォントの変更
            success = changeFont(fontName, preter);
            if (success) {
                $gameTemp._changedFontKe = true;
                const msgWindow = SceneManager._scene._messageWindow;
                if (msgWindow) { msgWindow.open(); }
                return true;
            }
        }
        return success;
    };
    
    
    //- フォント変更文字を消去
    const _Game_Message_allText = Game_Message.prototype.allText;
    Game_Message.prototype.allText = function() {
        let text = _Game_Message_allText.call(this);
        if (text) {
            text = text.replace(/\\([^\\]+)\\fn/g, "");
        }
        return text
    };
    
    
    //- フォント変更があったら変更してウェイト
    /*const _Window_Message_prototype_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        // メッセージ中のフォント変更
        //if (waitFontMessage(this)) { return; };
        _Window_Message_prototype_startMessage.call(this);
    };
    
    
    //- メッセージ中のフォント変更
    function waitFontMessage(preter) {
        // フォント変更済みなら飛ばす
        if ( $gameTemp._changedFontKe) {
             $gameTemp._changedFontKe = null;
            return false;
        }
        let success = false;
        // メッセージを取得
        let text = $gameMessage._texts.join("/n");
        // 制御文字がマッチしたら
        const match = text.match(/\\([^\\]+)\\fn/);
        if (match) {
            // フォント名を取得
            const fontName = match[1];
            // フォントの変更
            success = changeFont(fontName, preter);
            if (success) {
                preter._index--;
                $gameTemp._changedFontKe = true;
                return true;
            }
        }
        return success;
    };
    
    
    //- フォントウェイト(メッセージ)
    const _Window_Message_updateWait = Window_Message.prototype.updateWait;
    Window_Message.prototype.updateWait = function() {
        let result =  _Window_Message_updateWait.call(this);
        // ウェイト中なら
        if (this._waitsFontKe) {
            // フォントのロード完了を待つ
            if (FontManager._states["rmmz-mainfont"] != "loaded") {
                result = true;
            // 完了したらウェイトを0に
            } else {
                this._waitsFontKe = 0;
            }
        }
        return result;
    };*/
        
})();