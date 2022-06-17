//=============================================================================
// RPG Maker MZ - AutoMessage
//=============================================================================

/*:
 * @target MZ
 * @plugindesc メッセージの自動送りを行います。
 * @author 雪あすか
 * @url https://twitter.com/askyq
 * 
 * 
 * @help メッセージの自動送りを行うプラグインです。
 * 
 * 【使い方】
 * SwitchIdに指定した番号のスイッチがONになっている間、
 * メッセージの自動送りを行います。
 * 選択肢などが出てきた場合は、そこで止まります。
 * 
 * 
 * 【利用規約】
 * WTFPL
 * 
 * 【更新履歴】
 * 1.0 初版公開
 * 
 * 
 * @param SwitchId
 * @text スイッチ番号
 * @desc 指定した番号のスイッチがONになっているときのみ、メッセージ自動送りを行います。
 * @type switch
 * @default 0
 * 
 * @param WaitMilliseconds
 * @text 待機ミリ秒
 * @desc 待機する時間をミリ秒で指定します。変数番号に0以外の値が指定されている場合、この設定は無視されます。
 * @type number
 * @default 2500
 * 
 * @param WaitMillisecondsVariableId
 * @text 待機ミリ秒の変数番号
 * @desc 待機する時間（ミリ秒）が格納された変数の番号を指定します。0以外の値になっている場合有効です。
 * @type variable
 * @default 0
 */

(() => {
  const PLUGIN_NAME = 'AutoMessage';
  const params = PluginManager.parameters(PLUGIN_NAME);

  const switchId = parseInt(params.SwitchId);
  const waitMilliseconds = parseInt(params.WaitMilliseconds);
  const waitMillisecondsVariableId = parseInt(params.WaitMillisecondsVariableId);

  let isTimerFilled = false;
  let timerId = 0;

  const Window_Message_isTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() {
    const _isTimerFilled = isTimerFilled;
    isTimerFilled = false;
    return (
        Window_Message_isTriggered.call(this) ||
        _isTimerFilled
    );
  };

  const Window_Message_startPause = Window_Message.prototype.startPause;
  Window_Message.prototype.startPause = function() {
    Window_Message_startPause.call(this);
    
    if (switchId) {
      if ($gameSwitches.value(switchId)) {
        let time = waitMilliseconds;
        if (waitMillisecondsVariableId) {
          time = $gameVariables.value(waitMillisecondsVariableId);
        }
        timerId = setTimeout(function() {
          isTimerFilled = true;
          timerId = 0;
        }, time);
      }
    }
  };

  const Window_Message_startMessage = Window_Message.prototype.startMessage;
  Window_Message.prototype.startMessage = function() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = 0;
    }

    Window_Message_startMessage.call(this);
  };
})();
