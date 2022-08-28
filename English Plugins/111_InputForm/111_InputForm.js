//=============================================================================
// InputForm.js
// PUBLIC DOMAIN
// ----------------------------------------------------------------------------
// 2017/09/03 Fixed a bug that prevented pressing the "Decide" button on iOS & disabled clicking on the back game screen.
// 2018/12/06 Input field size follows screen size & fixed the bug of screen shift on iPhone & set text size & initial value.
// 2020/08/22 Compatible with RPG Maker MZ.
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Create form and enter text (modified version)
 * @author １１１, くらむぼん
 * @translator NamiBoops
 *
 *
 * @help
 * Display a text input form and have the user input text.
 * Unlike the event command "process name input,"
 * the familiar keyboard input, flick input, etc. can be used.
 * In addition, any character, including Kanji, can be entered.
 * 
 * ---Preparation---
 * Put 111_InputForm.css in the css folder inside your game folder (or create one if you don't have one).
 * By the way, you can change the design, width, etc. of the input form by tweaking this file.
 * If you don't know how to tweak it, google something like "how to write css"!
 * 
 * ---How to use in RPG Maker MZ---
 * Input fields can be displayed using the plugin command.
 * At a minimum, it will work if the display position is adjusted by "X position of input column"
 * and "Y position of input column" and a variable is set to "Assign input result to".
 * Try adjusting other parameters if necessary.
 * 
 * ---How to use in RPG Maker MV---
 * ◆Plug-in command: InputForm x=350;y=200;v=11;max=5;
 * Like so. In this example, it is displayed at x350,y200 and the result is saved in variable 11.
 * Maximum number of characters is 5 (max can be omitted to make it unlimited)
 *
 * If you want to make time expiration, etc., you can add if_s=3;.
 * Can be forced to exit "when switch 3 is turned on".
 * In a parallel event, let's create an event to turn on switch 3
 * （Point 1）In addition, at this time, the moment of forced termination
 * Note that the text is stored securely in the resulting variable.
 *
 * The next event command will not be read until the input is complete
 * (point 2) until the next event command is read.
 * Be careful not to overwrite the resulting variable with another parallel process because there is a short pause.
 *
 *
 * Additional Function:
 * Inputform （Omission）btn_x=100;btn_y=100;
 * I made it possible to finely adjust the position of the "OK" button.
 * The values are relative to the text box and default to btn_x=0;btn_y=50;.
 *
 * （2018/12/06 update）
 * The scale of the input fields and decision buttons now expand and contract to match the scale of the screen.
 *
 * Inputform （Omission）font_size=30;
 * You can change the size of the text in the input fields and decision buttons.
 * If font_size is not specified, font_size=24.
 *
 * Inputform （Omission）placeholder=text;
 * The contents of the "text" can be displayed in the input field from the beginning with
 * Please use this option if you wish to set a default name.
 * Note that if placeholder=$; is specified, the contents of the variable v will be displayed.
 *
 * License：
 * There are no restrictions on the usage of this plugin. Do as you wish.
 *
 * @command show
 * @text text entry process
 * @desc
 *
 * @arg target_x
 * @type number
 * @text X position of input column
 *
 * @arg target_y
 * @type number
 * @text Y position of input column
 *
 * @arg variables_id
 * @type variable
 * @text Assignment of input results to
 *
 * @arg max_count
 * @type number
 * @text Max. character count
 *
 * @arg if_switch_id
 * @type switch
 * @text When ON, input is forced to terminate
 *
 * @arg button_x
 * @type number
 * @min -10000
 * @default 0
 * @text Relative X position of the decision button
 *
 * @arg button_y
 * @type number
 * @min -10000
 * @default 50
 * @text Relative Y position of the decision button
 *
 * @arg unit_font_size
 * @type number
 * @default 24
 * @text Font size
 *
 * @arg placeholder
 * @type string
 * @text Initial value of input column
*/
(function() {
    function stopPropagation(event) {
        event.stopPropagation();
    }

    // css addition 
    (function(){
        var css = document.createElement('link');
        css.rel = "stylesheet";
        css.type = 'text/css';
        css.href = './css/111_InputForm.css';
        var b_top = document.getElementsByTagName('head')[0];
        b_top.appendChild(css);
    })();
    // To disable key entry.
    Input.form_mode = false;
    var _Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function(event) {
        if(Input.form_mode)return;
        _Input_onKeyDown.call(this , event)
    };
    var _Input_onKeyUp = Input._onKeyUp;
    Input._onKeyUp = function(event) {
        if(Input.form_mode)return;
        _Input_onKeyUp.call(this , event)
    };
    // The next event command is not read until the end of input.
    var _Game_Interpreter_updateWaitMode =
            Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function(){
        if(this._waitMode == 'input_form')return true;
        return _Game_Interpreter_updateWaitMode.call(this);
    }

    HTMLElement.prototype.postionAdjust = function(screen_postion , target_postion, unitFontSize){
        this.style.left = screen_postion[0] + target_postion[0] * Graphics._realScale + "px";
        this.style.top  = screen_postion[1] + target_postion[1] * Graphics._realScale + "px";
        this.style.fontSize = unitFontSize * Graphics._realScale + "px";
        this.style.maxWidth = 'calc(100% - ' + this.style.left + ')';
        this.style.maxHeight = 'calc(100% - ' + this.style.top + ')';
    };
    // Allow arguments like x=350;y=200;.
    var argHash = function(text , arg_names){
        var _args = new Array(arg_names.length);
        var ary = text.split(";");
        ary.forEach(function(str){
            var s_ary = str.split("=");
            var prop = s_ary[0].toLowerCase();
            var value = s_ary[1];
            _args[arg_names.indexOf(prop)] = value;
        });
        return _args;
    }
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    var _Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === 'InputForm'){
            var _ary = argHash(args[0] , ["x" , "y" , "v" , "max" , "if_s", "btn_x", "btn_y", "font_size", "placeholder"]);
            var target_x = +_ary[0];
            var target_y = +_ary[1];
            var variables_id = +_ary[2];
            var max_count = _ary[3] || null;
            var if_switch_id = Number(_ary[4]) || null;
            var button_x = +_ary[5] || 0;
            var button_y = _ary[6] === '' || isNaN(_ary[6]) ? 50 : +_ary[6];
            var unit_font_size = _ary[7] === '' || isNaN(_ary[7]) ? 24 : +_ary[7];
            var placeholder = _ary[8];
            this._inputForm(target_x, target_y, variables_id, max_count, if_switch_id, button_x, button_y, unit_font_size, placeholder);
        }
    };

    if (PluginManager.registerCommand) {
        PluginManager.registerCommand("111_InputForm", "show", function(args) {
            var { target_x, target_y, variables_id, max_count, if_switch_id, button_x, button_y, unit_font_size, placeholder } = args;
            this._inputForm(+target_x, +target_y, +variables_id, +max_count, +if_switch_id, +button_x, +button_y, +unit_font_size, placeholder);
        });
    }

    Game_Interpreter.prototype._inputForm = function(target_x, target_y, variables_id, max_count, if_switch_id, button_x, button_y, unit_font_size, placeholder) {
            var interpreter = this;
            var gui = {
                input : null ,
                submit : null ,
                is_pc : true ,
                init : function(){
                    this.is_pc = Utils.isNwjs();
                    this.create();
                    this.input.focus();
                    this.screenAdjust();
                } ,
                create : function(){
                    // Entry Form
                    this.input = document.createElement('input');
                    this.input.setAttribute('id', '_111_input');
                    if(max_count)this.input.setAttribute('maxlength', max_count);

                    if (placeholder === '$') {
                        placeholder = $gameVariables.value(variables_id);
                    }
                    this.input.setAttribute('value', placeholder || '');
                    document.body.appendChild(this.input);
                    // submit button
                    this.submit = document.createElement('input');
                    this.submit.setAttribute('type', 'submit');
                    this.submit.setAttribute('id', '_111_submit');
                    this.submit.setAttribute('value', 'decision');
                    document.body.appendChild(this.submit);
                } ,
                success : function(){
                    $gameVariables.setValue(variables_id , this.input.value);
                    this.end();
                } ,
                cancel : function(){
                    $gameVariables.setValue(variables_id , this.input.value);
                    this.end();
                } ,
                start : function(){
                    interpreter.setWaitMode('input_form');
                    Input.clear();
                    Input.form_mode = true;
                    // SceneManager._scene.stop();
                } ,
                end : function(){
                    this.input.remove(); // document.body.removeChild(this.input);
                    this.submit.remove();
                    window.removeEventListener("resize", resizeEvent, false);
                    interpreter.setWaitMode('');
                    Input.form_mode = false;
                    clearInterval(_event);
                    // SceneManager._scene.start();
                } ,
                screenAdjust : function(){ // Align with the upper left corner of the canvas
                    var screen_x , screen_y;
                    var _canvas = document.getElementById('UpperCanvas') || document.getElementById('gameCanvas');
                    var rect = _canvas.getBoundingClientRect();
                    screen_x = rect.left;
                    screen_y = rect.top;
                    this.input.postionAdjust([screen_x,screen_y] , [target_x,target_y], unit_font_size);
                    this.submit.postionAdjust([screen_x,screen_y] , [target_x + button_x,target_y + button_y], unit_font_size);
                }
            }
            //
            gui.init();
            // Event to send gui.input.onkeydown = function (e) {
            gui.input.addEventListener("keydown" ,function(e){
                if(e.keyCode === 13){ // Send with decision key
                    Input.clear();
                    gui.success();
                    // Stop event propagation to the parent (so that document's keydown does not react)
                    e.stopPropagation();
                }
            });
            gui.input.addEventListener("mousedown", stopPropagation); // Prevent click outbursts on the back game screen.
            gui.input.addEventListener("touchstart", stopPropagation); // Measures to prevent click events from being taken on iOS
            gui.submit.addEventListener("mousedown", stopPropagation); // Prevent click outbursts on the back game screen.
            gui.submit.addEventListener("touchstart", stopPropagation); // Measures to prevent click events from being taken on iOS
            gui.submit.addEventListener("click" ,function(){ // Click Submit button
                gui.success();
                return false;
            });
            // Event to be cancelled
            if (if_switch_id) {
                var _event = setInterval(function(){
                    if($gameSwitches.value(if_switch_id)){
                        // clearInterval(_event);
                        gui.cancel();
                    }
                }, 1);
            }

            // On the web, there are events that re-seek % every time the window size changes.
            //if(! gui.is_pc){
                var resizeEvent = gui.screenAdjust.bind(gui);
                window.addEventListener("resize", resizeEvent, false);
            //}
            //
            gui.start();
    };
})();
