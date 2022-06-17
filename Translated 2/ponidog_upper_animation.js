(function() {
    
// (C)2020 ぽに犬/ponidog
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//----
//ver 1.0 必要だったので作った。(20-8/23)
//ver 1.01 見直したらデフォルトバリューが代入されてなかった。(20-8/23)

    /*:ja
 *@target MZ
    
     * @plugindesc ピクチャより上でアニメが再生されるようにする
    
     * @author ponidog
 * @url https://twitter.com/ponidog
     
     * @help 
     *　　ピクチャより上でアニメが再生されるようになります。
     * 　　プラグインコマンドでon/offができるので場合に応じて使ってください。
     *  This software is released under the MIT License.

 * @command Anime-over-On
 * @text ピクチャの上で表示
 * @desc ピクチャの上で表示
 * 
 * @command Anime-over-Off
 * @text ピクチャの下で表示
 * @desc ピクチャの下で表示
 * 
 * @param DefaultValue
 * @desc デフォルト
 * @default true
 * @type boolean
     */
    
    /*:
 *@target MZ
    
     * @plugindesc Make the animation play above the picture
    
     * @author ponidog
 * @url https://twitter.com/ponidog
     
     * @help Make the animation play above the picture
     *　You can use the plugin command to turn it on and off,
     *  so use it when necessary.
     *  
     * *This software is released under the MIT License.

 * @command Anime-over-On
 * @text Display on the picture
 * @desc Display on the picture
 * 
 * @command Anime-over-Off
 * @text View under the picture
 * @desc View under the picture
 * 
 * @param DefaultValue
 * @desc Default
 * @default true
 * @type boolean
     */
"use strict";
const  pluginName = "ponidog_upper_animation";
let parameters = PluginManager.parameters('ponidog_upper_animation');



//デフォルト
let DefaultValue =  parameters['DefaultValue'] ;
if( DefaultValue === "true")DefaultValue =true ;
else{DefaultValue = false;}

var aboveOnSwitch =  DefaultValue;


//-------------コマンド

PluginManager.registerCommand(pluginName, "Anime-over-On", args => {

    aboveOnSwitch =  true;
});

PluginManager.registerCommand(pluginName, "Anime-over-Off", args => {
    
    aboveOnSwitch =  false;
});

//==================
// 上書き
Spriteset_Base.prototype.createAnimationSprite = function(
    targets, animation, mirror, delay
) {
    const mv = this.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = this.makeTargetSprites(targets);
    const baseDelay = this.animationBaseDelay();
    const previous = delay > baseDelay ? this.lastAnimationSprite() : null;
    if (this.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    this._effectsContainer.addChild(sprite);
    this._animationSprites.push(sprite);


    //▼付け加えた箇所
   if( aboveOnSwitch  ){
       debugger;
       SceneManager._scene._spriteset.addChild(sprite);
    } 
   else{
       SceneManager._scene._spriteset.removeChild(sprite);
    }


};

//=============================================================================






})();

