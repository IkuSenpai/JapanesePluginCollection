//=============================================================================
// RPG Maker MZ - Tukkomi Message
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Tukkomi Message.
 * @author gabacho(Ichiro Meiken)
 * @url https://star-write-dream.com/
 * @help GABA_TukkomiMessage.js(ver1.1.0)
 *
 * Display the second message while holding the message.
 * The position of the second window is automatically determined.
 *
 * ----------------------------------------------------------------------------
 *
 * ■ How to use
 * 1. Call "Prepare second window" of this plug-in from "Plug-in command".
 *    Set the waiting time.
 *    Set the switch you want to turn on arbitrarily.
 * 2. Set the second message in "Display text".
 * 3. Set the first message in "Display text".
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @command set
 * @text Prepare second window
 * @desc Execute just before the second message.
 *
 * @arg waitTime
 * @type number
 * @text Waiting time
 * @default 60
 * @desc Specify the interval between the first message and the second message.
 *
 * @arg optionalSwitch
 * @type switch
 * @text Optionnal switch
 * @desc Specify the switch to be turned on at the same time as the second message.
 *
 */

/*:ja
 * @target MZ
 * @plugindesc メッセージをキープしたまま二つ目のメッセージを表示します。
 * @author ガバチョ（溟犬一六）
 * @url https://star-write-dream.com/
 * @help GABA_TukkomiMessage.js(ver1.1.0)
 *  ----------------------------------------------------------------------------
 * ■概要
 *
 * 【メイン機能】
 *  １つ目のメッセージ（以下、ボケ）を表示したまま、任意の時間待ってから、
 *  ２つ目のメッセージ（以下、ツッコミ）を表示できるようになります。
 *  ※ツッコミの文章は１つのメッセージウィンドウにおさめてください。
 *
 * ----------------------------------------------------------------------------
 *
 * ■使い方
 *  1.「プラグインコマンド」より本プラグインの「ツッコミ準備」を呼び出します。
 *    待ち時間を設定します。ONにしたいスイッチを任意で設定します。
 *  2.「文章の表示」でツッコミメッセージを設定します。
 *  3.「文章の表示」でボケメッセージを設定します。
 *
 * ゲームを実行すると、
 * ボケ->ツッコミの順にメッセージが表示されます。
 * ・待ち時間は、ボケの表示が終わってからツッコミの表示を開始するまでの時間です。
 *
 * -----------------------------------------------
 *
 * （任意のスイッチの使用例）
 * ツッコミが決まると、任意スイッチは自動的にONになります。
 * 並列のコモンイベントを用意しておくと、ツッコミを華麗に演出できます。
 *
 *  コモンイベント例
 *     名前：ツッコミ演出
 *     トリガー：並列処理
 *     スイッチ：「任意のスイッチ」と同じスイッチ。
 *   ・実行内容：画面を揺らす、フラッシュする、効果音を鳴らす、など。
 *   ・実行内容の最終行：スイッチをオフにする。
 *   これで、ツッコミの開始時に１回だけ演出が実行されます。
 *
 *
 * --------------------------
 * Copyright (c) 2020 Gabacho(Ichiro Meiken)
 * Released under the MIT license
 * https://opensource.org/licenses/mit-license.php
 * --------------------------
 *
 * @command set
 * @text ツッコミ準備
 * @desc ツッコミメッセージの直前に実行します。
 *
 * @arg waitTime
 * @type number
 * @text 待ち時間
 * @default 60
 * @desc ツッコミを入れるまでの時間をフレーム数で指定してください。
 *       例）1秒待ちたい：60
 *
 * @arg optionalSwitch
 * @type switch
 * @text 任意のスイッチ
 * @desc ツッコミと同時にONにしたいスイッチを指定してください。
 *       指定は任意です。
 *
 */

(() => {
    "use strict";
    const pluginName = "GABA_TukkomiMessage";

    let waitTime = 0;
    let isTukkomiPrepareStart = false;
    let optionalSwitchId = 0;
    let tukkomiGameMessage = new Game_Message();

    // プラグインコマンド
    PluginManager.registerCommand(pluginName, "set", args => {
        waitTime = Number(args.waitTime || 0);
        optionalSwitchId = Number(args.optionalSwitch || 0);
        isTukkomiPrepareStart = true;
    });


    //-----------------------------------------------------------------------------
    // Scene_Message
    //

    const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
    Scene_Message.prototype.createAllWindows = function() {
        _Scene_Message_createAllWindows.apply(this, arguments);
        // associateWindows()の処理も行う
        this.createTukkomiWindow();
    };

    Scene_Message.prototype.createTukkomiWindow = function() {
        const rect = this.messageWindowRect();
        this._tukkomiWindow = new Window_Tukkomi(rect);
        this.addWindow(this._tukkomiWindow);

        // サブウィンドウを持たせます。
        const nameBoxWindow = new Window_NameBox();
        this.addWindow(nameBoxWindow);
        nameBoxWindow.setMessageWindow(this._tukkomiWindow);
        this._tukkomiWindow.setNameBoxWindow(nameBoxWindow);

        const rect2 = this.goldWindowRect();
        const goldWindow = new Window_Gold(rect2);
        goldWindow.openness = 0;
        this.addWindow(goldWindow);
        this._tukkomiWindow.setGoldWindow(goldWindow);

        const choiceListWindow = new Window_ChoiceList();
        this.addWindow(choiceListWindow);
        choiceListWindow.setMessageWindow(this._tukkomiWindow);
        this._tukkomiWindow.setChoiceListWindow(choiceListWindow);

        const numberInputWindow = new Window_NumberInput();
        this.addWindow(numberInputWindow);
        numberInputWindow.setMessageWindow(this._tukkomiWindow);
        this._tukkomiWindow.setNumberInputWindow(numberInputWindow);

        const rect3 = this.eventItemWindowRect();
        const eventItemWindow = new Window_EventItem(rect3);
        this.addWindow(eventItemWindow);
        eventItemWindow.setMessageWindow(this._tukkomiWindow);
        this._tukkomiWindow.setEventItemWindow(eventItemWindow);

        const mWindow = this._messageWindow;
        mWindow.setTukkomiWindow(this._tukkomiWindow);
        this._tukkomiWindow.setMessageWindow(mWindow);
    };

    //-----------------------------------------------------------------------------
    // Window_Message
    //

    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.apply(this, arguments);
        this._needsTukkomi = false;
        this._isEndBoke = false;
    };

    Window_Message.prototype.setTukkomiWindow = function(tukkomiWindow) {
        this._tukkomiWindow = tukkomiWindow;
    };

    const _Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        if(isTukkomiPrepareStart){
            copyGameMessage();
            this.terminateMessage();
            this._needsTukkomi = true;
            this._isEndBoke = false;
            isTukkomiPrepareStart = false;
            return;
        }
        if (!this._needsTukkomi || (this._needsTukkomi && !this._isEndBoke)){
            _Window_Message_startMessage.apply(this,arguments);
        }
    };

    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        if (!this._needsTukkomi) {
            _Window_Message_terminateMessage.apply(this, arguments);
        }
    };

    const _Window_Message_updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function() {
        if (this.pause && this._needsTukkomi) {
            if (!this._isEndBoke) {
                this._tukkomiWindow._waitCount = waitTime;
            }
            this._isEndBoke = true;
            return true;
        }
        return _Window_Message_updateInput.apply(this, arguments);
    };

    //-----------------------------------------------------------------------------
    // Window_Tukkomi
    // メッセージウィンドウを継承し、
    // $gameMessageを参照している関数を再定義。
    // サブウィンドウにも$gameMessageを参照している部分があるが、
    // サブウィンドウは出番がないので、名前ボックスのbackgroundのみ対策。
    //

    function Window_Tukkomi() {
        this.initialize(...arguments);
    }

    Window_Tukkomi.prototype = Object.create(Window_Message.prototype);
    Window_Tukkomi.prototype.constructor = Window_Tukkomi;

    Window_Tukkomi.prototype.initMembers = function() {
        Window_Message.prototype.initMembers.call(this);
        this._isStarted = false;
    };

    Window_Tukkomi.prototype.setMessageWindow = function(messageWindow) {
        this._messageWindow = messageWindow;
    };

    Window_Tukkomi.prototype.update = function() {
        if (!this._messageWindow._isEndBoke) {
            return;
        }
        this.checkToNotClose();
        Window_Base.prototype.update.call(this);

        if (isUseGabaAutoFace(this)) {
            this.setSpecialFace();
        }

        if (isUseGabaNameLabel(this)) {
            this.updateNameLabel();
        }
        this.synchronizeNameBox();
        while (!this.isOpening() && !this.isClosing()) {
            if (this.updateWait()) {
                return;
            } else if (this.updateLoading()) {
                return;
            } else if (this.updateInput()) {
                return;
            } else if (this.updateMessage()) {
                return;
            } else if (this.canStart()) {
                this.startMessage();
            } else {
                this.startInput();
                return;
            }
        }
    };

    Window_Tukkomi.prototype.canStart = function() {
        return this._messageWindow._isEndBoke && tukkomiGameMessage.hasText() && !tukkomiGameMessage.scrollMode();
    };

    Window_Tukkomi.prototype.startMessage = function() {

        // スイッチを変更
        if (optionalSwitchId != 0){
            $gameSwitches.setValue(optionalSwitchId,true);
        }

        // GABA_NameLabel.jsと連携
        if (isUseGabaNameLabel(this)) {
            this.setNameLabelVisible(true);
            this.prepareNameLabel();
        }

        // GABA_Ruby.jsと連携
        if (isUseGabaRuby(this)) {
            this.prepareRubyDic();
        }

        // GABA_SpekerNameByTag.jsと連携
        this.firstGabaTagName();

        const text = tukkomiGameMessage.allText();
        const textState = this.createTextState(text, 0, 0, 0);
        textState.x = this.newLineX(textState);
        textState.startX = textState.x;
        this._textState = textState;
        this.newPage(this._textState);
        this.updatePlacement();
        this.updateBackground();
        this.open();
        this._nameBoxWindow.start();
        this._nameBoxWindow.setBackgroundType(tukkomiGameMessage.background());

        this._isStarted = true;
    };

    Window_Tukkomi.prototype.firstGabaTagName = function() {
        if (this._gabaTagName == null) {
            return;
        }
        this._gabaTagName = "";
        const arr = this.gaba_SNBT_GetRegExp().exec(tukkomiGameMessage.allText());
        if (arr != null) {
            this._gabaTagName = arr[1];
        }
    }

    // 顔画像有無でテキストのstartXを変更
    Window_Tukkomi.prototype.newLineX = function(textState) {
        const faceExists = tukkomiGameMessage.faceName() !== "";
        const faceWidth = ImageManager.faceWidth;
        const spacing = 20;
        const margin = faceExists ? faceWidth + spacing : 4;
        const margin1 = textState.rtl ? this.innerWidth - margin : margin;

        let margin2 = 0;
        if (isUseGabaAutoFace(this)) {
            if (this.getSpecialFaceFileName() !== "") {
                const faceWidth = ImageManager.faceWidth;
                const spacing = 20;
                const margin = faceWidth + spacing;
                margin2 = textState.rtl ? this.innerWidth - margin : margin;
            }
        }

        return Math.max(margin1, margin2);
    };

    // 表示位置。ツッコミメッセージのポジション
    Window_Tukkomi.prototype.updatePlacement = function() {

        const goldWindow = this._goldWindow;
        this._positionType = tukkomiGameMessage.positionType();
        this.y = (this._positionType * (Graphics.boxHeight - this.height)) / 2;
        if (goldWindow) {
            goldWindow.y = this.y > 0 ? 0 : Graphics.boxHeight - goldWindow.height;
        }

        if (isUseGabaMessageWindowPos(this)) {
            this.gabaMWPAdjust();
        }

        if (isUseGabaNameLabel(this)) {
            this.setNameLabelPlacement();
        }
    };

    Window_Tukkomi.prototype.updateBackground = function() {
        this._background = tukkomiGameMessage.background();
        this.setBackgroundType(this._background);
    };

    const _Window_Tukkomi_terminateMessage = Window_Tukkomi.prototype.terminateMessage;
    Window_Tukkomi.prototype.terminateMessage = function() {
        _Window_Tukkomi_terminateMessage.apply(this, arguments);

        this._messageWindow._needsTukkomi = false;
        this._messageWindow.pause = false;
        this._messageWindow.terminateMessage();

        if (isUseGabaNameLabel(this)) {
            this.setNameLabelVisible(false);
            this.clearNameLabelSprite();
        }

        tukkomiGameMessage.clear();
    };

    Window_Tukkomi.prototype.updateInput = function() {
        if (!this._isStarted) {
            return false;
        }

        if (this.isAnySubWindowActive()) {
            return true;
        }
        if (this.pause) {
            if (this.isTriggered()) {
                Input.update();
                this.pause = false;
                if (!this._textState) {
                    this.terminateMessage();
                }
            }
            return true;
        }
        return false;
    };

    Window_Tukkomi.prototype.startInput = function() {
        if (tukkomiGameMessage.isChoice()) {
            this._choiceListWindow.start();
            return true;
        } else if (tukkomiGameMessage.isNumberInput()) {
            this._numberInputWindow.start();
            return true;
        } else if (tukkomiGameMessage.isItemChoice()) {
            this._eventItemWindow.start();
            return true;
        } else {
            return false;
        }
    };

    // ウィンドウメッセージのプラグインで押せなくなると困るので定義。
    Window_Tukkomi.prototype.isTriggered = function() {
        return (
            Input.isRepeated("ok") ||
            Input.isRepeated("cancel") ||
            TouchInput.isRepeated()
        );
    };

    Window_Tukkomi.prototype.doesContinue = function() {
        return (
            tukkomiGameMessage.hasText() &&
            !tukkomiGameMessage.scrollMode() &&
            !this.areSettingsChanged()
        );
    };

    Window_Tukkomi.prototype.areSettingsChanged = function() {
        return (
            this._background !== tukkomiGameMessage.background() ||
            this._positionType !== tukkomiGameMessage.positionType()
        );
    };

    // 素早く表示します。
    Window_Tukkomi.prototype.updateShowFast = function() {
        this._showFast = true;
    };

    Window_Tukkomi.prototype.updateSpeakerName = function() {
        this._nameBoxWindow.setName(tukkomiGameMessage.speakerName());
    };

    Window_Tukkomi.prototype.loadMessageFace = function() {
        this._faceBitmap = ImageManager.loadFace(tukkomiGameMessage.faceName());
    };

    Window_Tukkomi.prototype.drawMessageFace = function() {
        const faceName = tukkomiGameMessage.faceName();
        const faceIndex = tukkomiGameMessage.faceIndex();
        const rtl = tukkomiGameMessage.isRTL();
        const width = ImageManager.faceWidth;
        const height = this.innerHeight;
        const x = rtl ? this.innerWidth - width - 4 : 4;
        this.drawFace(faceName, faceIndex, x, 0, width, height);

    };

    Window_Tukkomi.prototype.startPause = function() {
        this.startWait(10);
        this.pause = true;
    };

    Window_Tukkomi.prototype.positionType = function() {
        return tukkomiGameMessage._positionType;
    }

    // 名前の取得
    // this._gabaTagNameはGABA_SpeakerNameByTagにて設定される
    Window_Tukkomi.prototype.gabaGetName = function() {
        const gabaTagName = this._gabaTagName ? this._gabaTagName : "";
        if (gabaTagName !== "") {
            return gabaTagName;
        } else {
            return tukkomiGameMessage.speakerName();
        }
    }

    //-----------------------------------------------------
    // その他
    //-----------------------------------------------------

    // ゲームメッセージを複製
    function copyGameMessage() {
        tukkomiGameMessage = new Game_Message();
        tukkomiGameMessage._texts = $gameMessage._texts;
        tukkomiGameMessage._choices = $gameMessage._choices;
        tukkomiGameMessage._speakerName = $gameMessage._speakerName;
        tukkomiGameMessage._faceName = $gameMessage._faceName;
        tukkomiGameMessage._faceIndex = $gameMessage._faceIndex;
        tukkomiGameMessage._background = $gameMessage._background;
        tukkomiGameMessage._positionType = $gameMessage._positionType;
        tukkomiGameMessage._choiceDefaultType = $gameMessage._choiceDefaultType;
        tukkomiGameMessage._choiceCancelType = $gameMessage._choiceCancelType;
        tukkomiGameMessage._choiceBackground = $gameMessage._choiceBackground;
        tukkomiGameMessage._choicePositionType = $gameMessage._choicePositionType;
        tukkomiGameMessage._numInputVariableId = $gameMessage._numInputVariableId;
        tukkomiGameMessage._numInputMaxDigits = $gameMessage._numInputMaxDigits;
        tukkomiGameMessage._itemChoiceVariableId = $gameMessage._itemChoiceVariableId;
        tukkomiGameMessage._itemChoiceItypeId = $gameMessage._itemChoiceItypeId;
        tukkomiGameMessage._scrollMode = $gameMessage._scrollMode;
        tukkomiGameMessage._scrollSpeed = $gameMessage._scrollSpeed;
        tukkomiGameMessage._scrollNoFast = $gameMessage._scrollNoFast;
        tukkomiGameMessage._choiceCallback = $gameMessage._choiceCallback;
    }

    // GABA_Ruby.jsを使っているか
    function isUseGabaRuby(window) {
        return window.prepareRubyDic != null ? true : false;
    }

    // Gaba_NameLabel.jsを使っているか
    function isUseGabaNameLabel(window) {
        return window.synchronizeNameLabel != null ? true : false;
    }

    // GABA_AutoDisplayFaceByName.jsを使っているか
    function isUseGabaAutoFace(window) {
        return window.setSpecialFace != null ? true : false;
    }

    // GABA_MessageWindowPosition.jsを使っているか
    function isUseGabaMessageWindowPos(window) {
        return window.gabaMWPAdjust != null ? true : false;
    }
})();
