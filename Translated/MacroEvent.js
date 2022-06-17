//=============================================================================
// MacroEvent（イベント命令のマクロ化プラグイン）
// by フェルミウム湾
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc イベント命令マクロ化プラグイン
 * @author フェルミウム湾
 *
 * @help イベント命令をマクロ化して呼び出せるようにします。
 * マクロはコモンイベントの呼び出しとは異なり、各々がメモリをもちます。
 * マクロ定義したイベント命令は、引数を渡してどこからでも実行できるようになり、
 * 実行結果を戻り値として、呼び出し側に返却することができます。
 * よく使う処理をマクロ定義しておくと、呼び出しが便利になります。
 * 
 * マクロの定義から実行までの流れは以下です。
 * (1) コモンイベントまたはマップイベントで、
 * 　　マクロ定義したいイベント命令を作成しておきます。
 * (2) 「マクロ定義」命令を実行し、イベント命令をマクロとして登録します。
 * (3) 「マクロ呼び出し」命令を実行すると、
 * 　　登録済みのイベント命令を呼び出し、実行することができます。
 * 
 * マクロには自身のみが使用できる3種類の変数を持たせることができます。
 * ・引数（マクロ呼び出し命令から、入力として渡された値が格納された変数）
 * ・戻り値（マクロの呼び出し元に、出力として返す値が格納された変数）
 * ・ローカル変数（マクロ自身が使用し、マクロが終了すると破棄される変数）
 * 
 * これらはマクロ定義で割り当てられた変数の番号を用いて、
 * 「変数の操作」などを使用して読み書きする命令を作成できますが、
 * 実際には割り当てられた番号の変数に読み書きされるのではなく、
 * マクロ自身がもつ内部的な一時メモリにのみ値が読み書きされます。
 * 以下の例のように、変数には値が読み書きされません。
 * 
 * 　例）
 * 　【マクロ呼び出し元】
 * 　◆マクロ呼び出し：(下記のマクロを呼び出す)
 * 　　戻り値の格納変数 = (変数20番)
 * 　
 * 　【呼び出されるマクロ】
 * 　◆変数の操作：#0012 マクロの戻り値 = 123
 * 　◆文章：マクロの戻り値は \V[12] でした。
 * 
 * 　　と 記述した場合
 * 　
 * 　・画面上の、文章の表示では「123」が表示される。
 * 　・変数12番「マクロの出力」の値は0のまま（123には書き変わらない）
 * 　・マクロの一時メモリ = 123（画面上には表示されない内部的なメモリ）
 * 　・変数20番はマクロの戻り値なので、123が格納される。
 * 
 * 例のとおり、イベント命令上は変数12番に読み書きするように作成しますが、
 * 実際にはマクロ内の一時メモリに値が読み書きされます。
 * 
 * マクロは、別のマクロや、自分自身のマクロをさらに呼び出すことができます。
 * 各々がメモリをもつことを利用して、自分自身のマクロを入れ子にして
 * 再帰的に呼び出す、再帰命令を作成することも可能です。
 * （再帰による無限呼び出しには注意ください）
 * 
 * なお、標準ではマクロをセーブデータに含めるようにしています。
 * マクロ定義されたイベント命令がそのままセーブデータに含められるので、
 * 大きな命令が登録されると、セーブデータが大きくなる可能性があります。
 * マクロをセーブデータに含めない場合は、マクロ定義をセーブするフラグを
 * falseに変更し、ロード時に再定義するようイベント実装ください。
 * 
 * ======================================================================
 * コマンド『マクロ定義（コモンイベント）』
 * --------------------------------------------------------
 * コモンイベントをマクロとして定義します。
 * --------------------------------------------------------
 * 引数1）マクロ名
 * 引数2）マクロ命令のコモンイベントID
 * 引数3）引数変数
 * 引数4）戻り値変数
 * 引数5）ローカル変数
 * --------------------------------------------------------
 * 例）
 * コモンイベント8番にて、変数11番と変数12番を掛けた値を
 * 変数13番に格納するイベント命令を作成しておきます。
 * ゲーム開始時に、本コマンドでマクロ定義します。
 * ・引数1）マクロ名「掛け算」
 * ・引数2）イベントID「8」
 * ・引数3）引数変数「変数11番、変数12番」
 * ・引数4）戻り値変数「変数13番」
 * ・引数5）ローカル変数「(なし)」
 * 変数11番, 12番は引数、変数13番は戻り値として定義され、
 * 以降は「マクロ呼び出し」コマンドにより、このイベント命令を
 * マクロとして呼び出すことができます。
 * 
 * ======================================================================
 * コマンド『マクロ定義（マップイベント）』
 * --------------------------------------------------------
 * 現在のマップにあるマップイベントをマクロとして定義します。
 * --------------------------------------------------------
 * 引数1）マクロ名
 * 引数2）マクロ命令のイベントID
 * 引数3）マクロ命令のページ番号
 * 引数4）引数変数
 * 引数5）戻り値変数
 * 引数6）ローカル変数
 * --------------------------------------------------------
 * マップイベントのイベント命令を対象に、マクロを定義します。
 * マクロの定義方法は、「マクロ定義（コモンイベント）」同様です。
 * 
 * ======================================================================
 * コマンド『マクロ呼び出し』
 * --------------------------------------------------------
 * 定義済みのイベント命令マクロを呼び出します。
 * --------------------------------------------------------
 * 引数1）マクロ名
 * 引数2）引数
 * 引数3）戻り値の格納変数
 * --------------------------------------------------------
 * 例）
 * 「マクロ定義」コマンドにより、「掛け算」を定義しておきます。
 * 掛け算をしたいタイミングで、本コマンドを呼び出します。
 * ・引数1）マクロ名「掛け算」
 * ・引数2）引数「4, 7」
 * ・引数3）戻り値の格納変数「変数20番」
 * すると、変数20番には28が返却されます。
 * 
 * ======================================================================
 * コマンド『マクロ呼び出し（引数を変数で指定）』
 * --------------------------------------------------------
 * 定義済みのイベント命令マクロを呼び出します。
 * 引数の指定に値ではなく、変数を使用できます。
 * --------------------------------------------------------
 * 引数1）マクロ名
 * 引数2）引数の格納変数
 * 引数3）戻り値の格納変数
 * --------------------------------------------------------
 * 引数に変数を使用することができます。
 * 呼び出し結果は「マクロ呼び出し」コマンドと同様です。
 * 
 * ======================================================================
 * 
 * 【利用規約】
 * 本プラグインは、著作権フリーです。
 * 改変・再配布・アダルト利用等、自由に行うことができます。
 * 使用連絡は特に不要です。
 * 
 * ご質問等がありましたら、下記メールアドレスまでご連絡お願いします。
 * fermiumbay2＠yahoo.co.jp  (← アットマークを全角にしています)
 * 
 * @param save_macro_def_flg
 * @text マクロ定義をセーブする
 * @type boolean
 * @desc マクロ定義の情報をセーブデータに含めます。無効にすると、次回ゲームロード時にマクロ定義がすべて未定義に戻ります。
 * @default true
 * 
 * @param call_event_limit
 * @text イベント入れ子上限
 * @type number
 * @desc マクロ（イベント）呼び出しを入れ子にできる上限数を定義します。
 * @min 1
 * @default 100
 * 
 * @command DefMacroCommonEvent
 * @text マクロ定義（コモンイベント）
 * @desc コモンイベントをマクロとして定義します。
 *
 * @arg macroName
 * @type string
 * @text マクロ名
 * @desc マクロの名前を指定します。
 *
 * @arg eventId
 * @type number
 * @min 1
 * @default 1
 * @text マクロ命令のコモンイベントID
 * @desc マクロ化するコモンイベントのIDを指定します。
 *
 * @arg inputVariable
 * @type variable[]
 * @text 引数変数
 * @desc 引数として扱う変数を指定します。
 *
 * @arg outputVariable
 * @type variable[]
 * @text 戻り値変数
 * @desc 戻り値として扱う変数を指定します。
 *
 * @arg localVariable
 * @type variable[]
 * @text ローカル変数
 * @desc ローカル変数として扱う変数を指定します。
 * 
 * @command DefMacroMapEvent
 * @text マクロ定義（マップイベント）
 * @desc 現在のマップにあるマップイベントをマクロとして定義します。
 *
 * @arg macroName
 * @type string
 * @text マクロ名
 * @desc マクロの名前を指定します。
 *
 * @arg eventId
 * @type number
 * @min 1
 * @default 1
 * @text マクロ命令のイベントID
 * @desc マクロ化するイベント命令のイベントIDを指定します。
 *
 * @arg pageId
 * @type number
 * @min 1
 * @default 1
 * @text マクロ命令のページ番号
 * @desc マクロ化するイベント命令のページ番号を指定します。
 *
 * @arg inputVariable
 * @type variable[]
 * @text 引数変数
 * @desc 引数として扱う変数を指定します。
 *
 * @arg outputVariable
 * @type variable[]
 * @text 戻り値変数
 * @desc 戻り値として扱う変数を指定します。
 *
 * @arg localVariable
 * @type variable[]
 * @text ローカル変数
 * @desc ローカル変数として扱う変数を指定します。
 *
 * @command CallMacro
 * @text マクロ呼び出し
 * @desc 定義済みのイベント命令マクロを呼び出します。
 *
 * @arg macroName
 * @type string
 * @text マクロ名
 * @desc 呼び出すマクロ名を指定します。
 *
 * @arg inputValue
 * @type number[]
 * @min -99999999
 * @max 99999999
 * @text 引数
 * @desc 引数を指定します。
 *
 * @arg outputVariable
 * @type variable[]
 * @text 戻り値の格納変数
 * @desc 戻り値を格納する変数を指定します。
 *
 * @command CallMacroVariable
 * @text マクロ呼び出し（引数を変数で指定）
 * @desc 定義済みのイベント命令マクロを呼び出します。
 *
 * @arg macroName
 * @type string
 * @text マクロ名
 * @desc 呼び出すマクロ名を指定します。
 *
 * @arg inputVariable
 * @type variable[]
 * @text 引数の格納変数
 * @desc 引数を格納している変数を指定します。
 *
 * @arg outputVariable
 * @type variable[]
 * @text 戻り値の格納変数
 * @desc 戻り値を格納する変数を指定します。
 */

(() => {
	// プラグイン名
	const pluginName = "MacroEvent";

	// イベント呼び出し入れ子数が上限を超過したエラーメッセージ
	const errorMsg_exceedCallEventLimit = "イベント呼び出し入れ子数が上限を超過しました。";

	// 未定義のマクロが呼び出されたエラーメッセージ
	const errorMsg_callUndefinedMacro = "未定義のマクロが呼び出されました:";

	// 呼び出しマクロの引数個数が、定義されている引数個数と一致しないエラーメッセージ
	const errorMsg_errorMsg_unmatchMacroInputNum = "呼び出されたマクロの引数個数が定義に一致しません:";

	// 呼び出しマクロの戻り値個数が、定義されている戻り値個数と一致しないエラーメッセージ
	const errorMsg_errorMsg_unmatchMacroOutputNum = "呼び出されたマクロの戻り値個数が定義に一致しません:";

	// マクロ定義をセーブするフラグ
	var save_macro_def_flg = PluginManager.parameters(pluginName)["save_macro_def_flg"] === "true";

	// イベント入れ子上限
	var call_event_limit = Number(PluginManager.parameters(pluginName)["call_event_limit"]);

	// マクロ定義構造体
	function Game_MacroDef() {
		this.initialize(...arguments);
	}

	// マクロ定義構造体の初期化
	Game_MacroDef.prototype.initialize = function() {
		this.clear();
	};

	// マクロ定義構造体のデータをクリアする
	Game_MacroDef.prototype.clear = function() {
		// マクロ名とイベントリストの組
		this._macroEventMap = {};

		// マクロ名と引数の組
		this._inputVariableMap = {};

		// マクロ名と戻り値の組
		this._outputVariableMap = {};

		// マクロ名とローカル変数の組
		this._localVariableMap = {};
	};

	// マクロ定義オブジェクト
	$gameMacroDef = null;

	// マクロ定義オブジェクトの初期化を追加する
	var _DataManager_createGameObjects = DataManager.createGameObjects;
	DataManager.createGameObjects = function() {
		_DataManager_createGameObjects.apply(this);
		$gameMacroDef = new Game_MacroDef();
	}

	// セーブデータにマクロ定義を含める
	var _DataManager_makeSaveContents = DataManager.makeSaveContents;
	DataManager.makeSaveContents = function() {
		const contents = _DataManager_makeSaveContents.apply(this);
		if (save_macro_def_flg) {
			contents.macroDef = $gameMacroDef;
		}
		return contents;
	}

	// ロードデータにマクロ定義を含める
	var _DataManager_extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
		_DataManager_extractSaveContents.apply(this, arguments);
		$gameMacroDef = contents.macroDef;
		if ($gameMacroDef === undefined) {
			$gameMacroDef = new Game_MacroDef();
		}
	}

	// イベント命令実行中インタプリタ
	Game_Interpreter.prototype._commandInterpreter = null;

	// マクロ変数（変数番号と実体の組）
	Game_Interpreter.prototype._macroVariables = {};

	// マクロ変数と戻り値の変数番号(マクロ変数の場合は参照オブジェクト)の組
	Game_Interpreter.prototype._outputVariableIdMap = {};

	// 数値配列の引数文字列を、配列に変換して取得
	var getNumberArrayArg = function(arg) {
		var tmpAry = eval(arg);
		var ret = [];
		if (tmpAry != null && Array.isArray(tmpAry)) {
			ret = tmpAry.map(x => Number(x));
		}
		return ret;
	};

	// イベントコマンド各々の実行時に、実行中インタプリタをGame_Mapに伝える
	var _Game_Interpreter_prototype_executeCommand = Game_Interpreter.prototype.executeCommand;
	Game_Interpreter.prototype.executeCommand = function() {
		$gameMap._commandInterpreter = this;
		return _Game_Interpreter_prototype_executeCommand.apply(this);
	};

	// 変数の取得処理を変更
	var _Game_Variables_prototype_value = Game_Variables.prototype.value;
	Game_Variables.prototype.value = function(variableId) {
		var macroVariable = null;
		if ($gameMap._commandInterpreter != null) {
			macroVariable = $gameMap._commandInterpreter._macroVariables[variableId];
		}
		if (macroVariable != null) {
			return macroVariable[0];
		} else {
			return _Game_Variables_prototype_value.apply(this, arguments);
		}
	};

	// 変数のセット処理を変更
	var _Game_Variables_prototype_setValue = Game_Variables.prototype.setValue;
	Game_Variables.prototype.setValue = function(variableId, value) {
		var macroVariable = null;
		if ($gameMap._commandInterpreter != null) {
			macroVariable = $gameMap._commandInterpreter._macroVariables[variableId];
		}
		if (macroVariable != null) {
			$gameMap._commandInterpreter._macroVariables[variableId] = [value];

			// 戻り値の代入
			var outputVariableId = $gameMap._commandInterpreter._outputVariableIdMap[variableId];
			if (outputVariableId != null) {
				// 格納されているIDが数値の場合は変数、配列(要素1のシングルトンオブジェクトを表す)の場合はマクロ変数として取得
				if (Array.isArray(outputVariableId)) {
					// マクロ変数の値を更新
					outputVariableId[0] = value;
				} else {
					// 通常の変数の値を更新
					_Game_Variables_prototype_setValue.apply(this, [outputVariableId, value]);
				}
			}
		} else {
			_Game_Variables_prototype_setValue.apply(this, arguments);
		}
	};

	// イベント命令の呼び出し上限を任意の値に変更
	Game_Interpreter.prototype.checkOverflow = function() {
		if (this._depth >= call_event_limit) {
			throw new Error(errorMsg_exceedCallEventLimit);
		}
	};

	// マクロ定義（コモンイベント）命令を追加
	macroEvent_DefMacroCommonEvent = function(macroName, eventId, inputVariable, outputVariable, localVariable) {
		var eventList = $dataCommonEvents[eventId].list;
		$gameMacroDef._macroEventMap[macroName] = eventList;
		$gameMacroDef._inputVariableMap[macroName] = inputVariable;
		$gameMacroDef._outputVariableMap[macroName] = outputVariable;
		$gameMacroDef._localVariableMap[macroName] = localVariable;
	};
	PluginManager.registerCommand(pluginName, "DefMacroCommonEvent", args => {
		var macroName = args.macroName;
		var eventId = Number(args.eventId);
		var inputVariable = getNumberArrayArg(args.inputVariable);
		var outputVariable = getNumberArrayArg(args.outputVariable);
		var localVariable = getNumberArrayArg(args.localVariable);
		macroEvent_DefMacroCommonEvent(macroName, eventId, inputVariable, outputVariable, localVariable);
	});

	// マクロ定義（マップイベント）命令を追加
	macroEvent_DefMacroMapEvent = function(macroName, eventId, pageId, inputVariable, outputVariable, localVariable) {
		var eventList = $dataMap.events[eventId].pages[pageId - 1].list;
		$gameMacroDef._macroEventMap[macroName] = eventList;
		$gameMacroDef._inputVariableMap[macroName] = inputVariable;
		$gameMacroDef._outputVariableMap[macroName] = outputVariable;
		$gameMacroDef._localVariableMap[macroName] = localVariable;
	};
	PluginManager.registerCommand(pluginName, "DefMacroMapEvent", args => {
		var macroName = args.macroName;
		var eventId = Number(args.eventId);
		var pageId = Number(args.pageId);
		var inputVariable = getNumberArrayArg(args.inputVariable);
		var outputVariable = getNumberArrayArg(args.outputVariable);
		var localVariable = getNumberArrayArg(args.localVariable);
		macroEvent_DefMacroMapEvent(macroName, eventId, pageId, inputVariable, outputVariable, localVariable);
	});

	// マクロ呼び出し命令を追加
	macroEvent_CallMacro = function(macroName, inputValue, outputVariable) {
		// マクロ命令用インタプリタの生成
		var eventList = $gameMacroDef._macroEventMap[macroName];
		if (eventList == null) {
			throw new Error(errorMsg_callUndefinedMacro + macroName);
		}
		var nowEventId = $gameMap._interpreter._eventId;
		$gameMap._commandInterpreter.setupChild(eventList, nowEventId);

		// 引数・戻り値の個数が一致しないエラー
		if ($gameMacroDef._inputVariableMap[macroName].length != inputValue.length) {
			throw new Error(errorMsg_unmatchMacroInputNum + macroName);
		}
		if ($gameMacroDef._outputVariableMap[macroName].length != outputVariable.length) {
			throw new Error(errorMsg_unmatchMacroOutputNum + macroName);
		}

		// 生成したインタプリタにマクロ変数と戻り値変数番号を登録
		var macroVariables = {};
		var outputVariableIdMap = {};
		for (var i = 0; i < $gameMacroDef._inputVariableMap[macroName].length; i++) {
			macroVariables[$gameMacroDef._inputVariableMap[macroName][i]] = [inputValue[i]];
		}
		for (var i = 0; i < $gameMacroDef._outputVariableMap[macroName].length; i++) {
			macroVariables[$gameMacroDef._outputVariableMap[macroName][i]] = [0];

			// 戻り値がマクロ変数かどうか判定
			var macroVariable = $gameMap._commandInterpreter._macroVariables[outputVariable[i]];
			if (macroVariable != null) {
				// マクロ変数の場合は参照用に要素1の配列を格納
				outputVariableIdMap[$gameMacroDef._outputVariableMap[macroName][i]] = macroVariable;
			} else {
				// それ以外の場合は通常の変数なので変数番号を格納
				outputVariableIdMap[$gameMacroDef._outputVariableMap[macroName][i]] = outputVariable[i];
			}
		}
		for (var i = 0; i < $gameMacroDef._localVariableMap[macroName].length; i++) {
			macroVariables[$gameMacroDef._localVariableMap[macroName][i]] = [0];
		}
		$gameMap._commandInterpreter._childInterpreter._macroVariables = macroVariables;
		$gameMap._commandInterpreter._childInterpreter._outputVariableIdMap = outputVariableIdMap;
	};
	PluginManager.registerCommand(pluginName, "CallMacro", args => {
		var macroName = args.macroName;
		var inputValue = getNumberArrayArg(args.inputValue);
		var outputVariable = getNumberArrayArg(args.outputVariable);
		macroEvent_CallMacro(macroName, inputValue, outputVariable);
	});

	// マクロ呼び出し（引数を変数で指定）命令を追加
	macroEvent_CallMacroVariable = function(macroName, inputVariable, outputVariable) {
		var inputValue = inputVariable.map(x => $gameVariables.value(x));
		macroEvent_CallMacro(macroName, inputValue, outputVariable);
	};
	PluginManager.registerCommand(pluginName, "CallMacroVariable", args => {
		var macroName = args.macroName;
		var inputVariable = getNumberArrayArg(args.inputVariable);
		var outputVariable = getNumberArrayArg(args.outputVariable);
		macroEvent_CallMacroVariable(macroName, inputVariable, outputVariable);
	});

})();
