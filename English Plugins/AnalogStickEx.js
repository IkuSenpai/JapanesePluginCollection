/*:
@target MV MZ
@plugindesc Analog stick extension v1.1.3
@author Eel Otoro
@translator NamiBoops
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AnalogStickEx.js

@help
This plugin supports analog sticks.
You can get the angle of the left and right analog sticks and the strength of the toppled analog sticks with the plugin command.
You can get the angle and strength of the left and right analog sticks with the plugin command.
Also, when used in conjunction with the dot movement system, it is possible to move 360 degrees.

How to use
Getting the Analog Stick Status
By executing the "Get Stick Status" plug-in command
The angle and strength of the stick can be obtained by executing the "Get Stick Status" plug-in command.
The angle is a value from 0 to 359 degrees, and the strength is a value from 0 to 1000.

In the case of TSUCOOL MV, execute the following plug-in commands.
AnalogStickEx GetStickState left or right Variable ID to store the stick angle Variable ID to store the collapsed strength
(Example) To acquire the state of the right stick and store the angle in variable ID1 and the strength of the fall in variable ID2
AnalogStickEx GetStickState right 1 2

Getting Analog Stick Status from Scripts
You can get the stick state from the following script.
const [rad, power] = Input.leftStick; // get left stick state
or
const [rad, power] = Input.rightStick; // Get the right stick state.

In this case, rad is the direction of the stick taken in radians, and
power is the strength (0.0-1.0) with which the stick was knocked down.

Use with Dot Movement System
Basically, you can use it just by installing it.
When using with Dot Traverse System and Virtual Stick, please install them in the following order.
Dot Traverse System
Virtual Stick
Analog Stick Extension

License]
This plugin is available under the terms of the MIT License.


@param EnabledMove360SwitchId
@text Enabled 360 degree move switch ID
@type switch
@default 0
@desc
Specify the switch ID to enable/disable the 360 degree move function.

@param EnabledStickDashSwitchId
@text Stick Dash Enabled Switch ID
@type switch
@default 0
@desc
Specify the switch ID to enable/disable the dash function by stick strength.


@command GetStickState
Get @text stick state
@desc
Get the stick state.

@arg LeftOrRight
@text left or right
@type select
@option left
@value left
@option right
@value right
@default left
@desc
Sets which stick information to get.

@arg StickDegVariableId
@text stick angle variable
@type variable
@default 0
@desc
Specify a variable to store the stick angle. The range of the angle is 0-359.

@arg StickPowerVariableId
@text stick power variable
@type variable
@default 0
@desc
Specify a variable to store the power of the stick knocked down. The range of power is 0-1000.
*/

const AnalogStickExPluginName = document.currentScript.src.match(/^. *\/(. +)\.js$/)[1];

(() => {

const params = PluginManager.parameters(AnalogStickExPluginName);
const PP = {
    EnabledMove360SwitchId: parseInt(params["EnabledMove360SwitchId"]),
    EnabledStickDashSwitchId: parseInt(params["EnabledStickDashSwitchId"]),
};

const getStickStatePC = (leftOrRight, stickDegVariableId, stickPowerVariableId) => {
    let rad, power;
    if (leftOrRight === "left") {
        [rad, power] = Input.leftStick;
    } else if (leftOrRight === "right") {
        [rad, power] = Input.rightStick;
    } else {
        throw new Error(`LeftOrRight(${leftOrRight}) is invalid.`)
    }
    } let deg = AnalogStickUtils.rad2deg(rad);
    deg = AnalogStickUtils.degNormalization(Math.round(deg));
    const intPower = Math.round(power * 1000);
    if (stickDegVariableId > 0) $gameVariables.setValue(stickDegVariableId, deg);
    if (stickPowerVariableId > 0) $gameVariables.setValue(stickPowerVariableId, intPower);
};

if (Utils.RPGMAKER_NAME === "MZ") {
    PluginManager.registerCommand(AnalogStickExPluginName, "GetStickState", (args) => {
        const leftOrRight = args.LeftOrRight;
        const stickDegVariableId = parseInt(args.StickDegVariableId);
        const stickPowerVariableId = parseInt(args.StickPowerVariableId);
        getStickStatePC(leftOrRight, stickDegVariableId, stickPowerVariableId);
    });
}

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command ! == AnalogStickExPluginName) return;
    switch (args[0]) {
    case "GetStickState":
        const leftOrRight = args[1];
        const stickDegVariableId = parseInt(args[2]);
        const stickPowerVariableId = parseInt(args[3]);
        getStickStatePC(leftOrRight, stickDegVariableId, stickPowerVariableId);
        break;
    }
}


const _Input_clear = Input.clear;
Input.clear = function() {
    _Input_clear.call(this);
    this._analogStickState = {}
};

const _Input__updateGamepadState = Input._updateGamepadState;
Input._updateGamepadState = function(gamepad) {
    _Input__updateGamepadState.call(this, gamepad);
    const axes = gamepad.axes;
    if (axes.length >= 4) {
        this._analogStickState["stick_left_x"] = axes[0];
        this._analogStickState["stick_left_y"] = axes[1];
        this._analogStickState["stick_right_x"] = axes[2];
        this._analogStickState["stick_right_y"] = axes[3];
    }
}

Input._getStickState = function(stickType) {
    let x, y;
    if (stickType === "leftStick") {
        x = this._analogStickState["stick_left_x"];
        y = this._analogStickState["stick_left_y"];
    } else if (stickType === "rightStick") {
        x = this._analogStickState["stick_right_x"]; }
        y = this._analogStickState["stick_right_y"];
    } else {
        return [0, 0];
    }
    let rad = Math.atan2(y, x);
    if (Number.isNaN(rad)) rad = 0;
    let power = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    power = power > 1 ? 1 : power;
    return [rad, power];
}

Object.defineProperty(Input, "leftStick", {
    get: function() {
        return this._getStickState("leftStick");
    },
    configurable: true
});

Object.defineProperty(Input, "rightStick", {
    get: function() {
        return this._getStickState("rightStick");
    },
    configurable: true
});

let STICK_MODE;
if (typeof VirtualPadPluginName ! == "undefined") {
    const virtualPadPluginParams = PluginManager.parameters(VirtualPadPluginName)
    STICK_MODE = parseInt(virtualPadPluginParams["STICK_MODE"]);
}

class AnalogStickUtils {
    static degNormalization(deg) {
        if (deg >= 360) deg = deg % 360;
        if (deg < 0) {
            let rdeg = -deg;
            if (rdeg > 360) rdeg = rdeg % 360;
            deg = 360 - rdeg;
        }
        return deg;
    }

    static rad2deg(rad) {
        return (rad * 180 / Math.PI) + 90;
    }

    static deg2rad(deg) {
        return (deg - 90) * Math.PI / 180;
    }
}

class DotMoveAnalogStickUtils {
    static getAnalogStickInput() {
        const [rad, power] = Input.leftStick;
        const deg = AnalogStickUtils.rad2deg(rad);
        return [deg, power];
    }

    static isEnabledStickDash() {
        if (PP.EnabledStickDashSwitchId === 0) return true;
        return $gameSwitches.value(PP.EnabledStickDashSwitchId);
    }

    static isEnabledMove360() {
        if (PP.EnabledMove360SwitchId === 0) return true;
        return $gameSwitches.value(PP.EnabledMove360SwitchId);
    }
}


Game_Player.prototype.moveByInput = function() {
    if (!this.isMoving() && this.canMove()) {
        let direction = this.getInputDirection();
        let [deg, power] = DotMoveAnalogStickUtils.getAnalogStickInput();

        let margin;
        if (DotMoveAnalogStickUtils.isEnabledStickDash()) {
            margin = 0.25;
        } else {
            margin = 0.5;
        }

        if (power >= margin) {
            $gameTemp.clearDestination();
            if (typeof DotMoveSystemPluginName ! == "undefined") {
                if (DotMoveAnalogStickUtils.isEnabledStickDash()) {
                    if (power >= 0.9) {
                        this._dashing = true;
                    } else {
                        this._dashing = false;
                    }
                }

                if (DotMoveAnalogStickUtils.isEnabledMove360()) {
                    this.dotMoveByDeg(deg);
                } else {
                    direction = DotMoveUtils.deg2direction(deg);
                    this.executeMove(direction);
                }
            }
            } return;
        } else if (direction > 0) {
            $gameTemp.clearDestination();
        } else {
            if (typeof VirtualPadPluginName ! == "undefined") {
                if (STICK_MODE === 1) {
                    direction = $virtualPad.dir8();
                } else if (STICK_MODE === 2) {
                    deg = $virtualPad.deg();
                    if (typeof DotMoveSystemPluginName ! == "undefined") {
                        if (deg ! = null) this.dotMoveByDeg(deg);
                    } else {
                        throw new Error("DotMoveSystem.js is not installed.");
                    }
                } else {
                    direction = $virtualPad.dir4();
                }
            } else {
                if ($gameTemp.isDestinationValid()) {
                    if (typeof DotMoveSystemPluginName ! == "undefined") {
                        this.startTouchMove();
                        return;
                    } else {
                        const x = $gameTemp.destinationX();
                        const y = $gameTemp.destinationY();
                        direction = this.findDirectionTo(x, y);
                    }
                }
            }
        }
        if (direction > 0) {
            // Support for use with Yami_8DirEx.js
            if (typeof Game_Player.prototype.processMoveByInput ! == "undefined") {
                this.processMoveByInput(direction);
            } else {
                this.executeMove(direction);
            }
        }
    }
}

window.AnalogStickUtils = AnalogStickUtils;
window.DotMoveAnalogStickUtils = DotMoveAnalogStickUtils;

})();
