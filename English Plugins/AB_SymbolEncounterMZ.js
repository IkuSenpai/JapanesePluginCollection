//=============================================================================
// AB_SymbolEncounter.js
//=============================================================================
// // SymbolEncounter.js
// Plugin for RPG Tskool MZ Random Symbol Encounter System
// //SymbolEncounter.js // // SymbolEncounter.js
//=============================================================================
// Author misty_rain
// Homepage Anti-Belphetan
// http://kilisamenosekai.web.fc2.com/
//
// Copyright (c) 2016 misty_rain
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// =============================================================================
// ver 1.0 2016/04/14 released
// ver 1.1 2016/04/18 Fixed unreadable parameters.
// ver 1.2 2016/08/30 Compatible with Tcool MV 1.3.1
// ver 1.3 2017/01/10 Fixed enemy symbols only activate with opacity 255
// ver 1.4 2017/02/06 Added the ability for enemy symbols to slip through friends in formation
// ver 1.5 2020/09/29 Add enemy symbol without discovery mode
// ver 2.0 2021/04/30 ported to Tcool MZ
//=============================================================================
/*:
 * @target MZ
 * @plugindesc
 * @plugindesc Random symbol encounter system
 *
 * @author misty_rain
 * @translator NamiBoops
 *
 * @help If you name an event "EnemySymbol", then
 * The event will move in a symbol-encounting direction.
 * If you specify "<Region:1>" in the note, the event will only appear in region 1.
 * If you specify "<Region:2,3>", the event will appear in regions 2 and 3.
 *
 * * Normally, it will rotate 90 degrees to the right or left, take one step forward, etc. * * When the player comes into view, the event will appear in the mode that it finds.
 * * ・If the player comes into view, it will enter discovery mode.
 * * * The event's field of view is 6 (default) and 3 (fixed) wide in the direction the event is facing. If you approach from the side or from behind, you will not be detected.
 * When you are in discovery mode, you will move closer to the player.
 * * In find mode, you will lose them if they are further away from the player than the default distance of 8. It doesn't matter which direction you are facing.
 * In normal mode, it will disappear after a certain period of time or when it gets further away from the player than the default distance of 10.
 * - After it disappears, it will appear at the specified region number within 10(default) distance from the player after a while.
 * ・Specify the movement route in the event execution: If you set opacity to 0 in this event, it will still appear somewhere.
 * ・The execution contents of the event, such as the processing of the battle, should be created by Tsukurah. Specify the move route at the end: If you set the opacity to 0 in this event, it will disappear.
 * ・It will disappear when the event starts. It will not reappear during the event.
 * - If a player is contacted from behind in discovery mode, a surprise attack → can be prevented by using the party ability "Disable surprise attack".
 * Normally, if a player comes in contact with the event from behind, the event will attack first. The front of the event will be in detection mode first).
 * ・Enemy visibility can be visualized with a switch.
 * - If you specify the event name as "EnemySymbol_noFind", the enemy symbol will not be in find mode.
 *
 * The following is an advanced version. If you don't use it well, it may not work.
 * * There is no plugin command, but if you specify "this.checkPlayerInSightToSelfSwA();" in the script to specify the move route, it will
 * Checks if the player is in sight, and if so, self-switch A is turned on, if not, it is turned off.
 * Similarly, "this.checkPlayerInSightToSelfSwB();" will turn self-switch B on and self-switch B off.
 * Similarly, "this.checkPlayerInSightToSelfSwC();" will turn on self-switch C, "this.checkPlayerInSightToSelfSwC();" will turn off self-switch C, and "this.checkPlayerInSightToSelfSwC();" will turn off self-switch C.
 * "this.checkPlayerInSightToSelfSwD();" will turn on self-switch D.
 * Also, "this.checkPlayerInSightToSwitch(switch No to turn on);" will put the check result into the switch with the specified No.
 *
 * ・If the script "this.stareEffect(distance)" is specified in specifying the movement route of an event, the event within the specified distance will be
 * * * The event will stare at the direction where the event is for a certain period of time. For example, to turn around when it hears a suspicious sound.
 * When "this.checkStareToSelfSwA();" is specified in the script by specifying the move route, * the event will stare at the direction where the event is for a certain period of time.
 * If "this.checkStareToSelfSwA();" is specified in the script by specifying the move route, the action during staring is performed, and if it is staring, self switch A turns ON, if not, it turns OFF.
 * Similarly, by specifying "this.checkStareToSelfSwA();", self-switch B, self-switch B, self-switch A, and self-switch B are set to ON and OFF, respectively.
 * Similarly, "this.checkStareToSelfSwB();" returns self-switch C, "this.
 * "this.checkStareToSelfSwC();" turns on self switch D.
 * Also, "this.checkStareToSwitch(switch No. to turn ON);" puts the check result into the switch with the specified No.
 * - If the script "this.moveTowardStare();" is specified in the specification of the movement route of the event, it will move one step closer to the staring point.
 * (For example, if the event is moving along a certain route, it will not return to the original route when it realizes there is nothing to stare at after it is brought close to the staring point.)
 * - If the script "this.moveToward(x,y);" is specified in the event's move route specification, it will move one step closer to the coordinates specified by x,y.
 *
 * =============================================================================
 * @param FindBalloon.
 * @desc Balloon number when in find mode.
 * @default 1
 * @type number
 *
 * @param LoseBalloon
 * @desc Balloon number when lost in find mode.
 * @default 2
 * @type number
 *
 * @param FindMoveSpeed
 * @desc Walking speed in find mode.
 * @default 4
 * @type number
 *
 * @param NormalMoveSpeed
 * @desc Normal speed
 * @default 3
 * @type number
 *
 * @param AppearanceTime
 * @desc Time until it disappears under normal conditions.
 * @default 100
 * @type number
 *
 * @param SightArea
 * @desc Distance of the sight area.
 * @default 5
 * @type number
 *
 * @param WarpTryTime
 * @desc Randomly determines where to reappear after it disappears, and determines if the regions match. It will not reappear until it matches. Number of times.
 * @default 10
 * @type number
 *
 * @param ChaseArea
 * @desc Distance to chase when in find mode. If it exceeds this distance, it will be lost.
 * @default 8
 * @type number
 *
 * @param AppearanceArea
 * @desc Normally, if the player is further away than this distance, it will be forced to disappear and reappear.
 * @default 15
 * @type number
 *
 * @param WarpArea
 * @desc Warp area. The area around the player, within which the warp will randomly appear.
 * @default 10
 * @type number
 *
 * @param LoseCount
 * @desc In find mode, the count from when the player is lost until find mode is turned off.
 * @default 100
 * @type number
 *
 * @param MinWaitTime
 * @desc Minimum count of time to wait for an action normally.
 * @default 60
 * @type number
 *
 * @param RndWaitTime
 * @desc Width of count to wait for the action normally (minimum + wait for a random minute, pointing to the random).
 * @default 60
 * @type number
 *
 * @param SightColor
 * @desc The color of the enemy's sight field when it is visualized.
 * @default red
 * @type number
 *
 * @param SightVisibleSwId
 * @desc Number of the switch that makes the enemy's visible field of view visible If 1, switch 1 ON makes the enemy's visible field of view visible.
 * @default 1
 * @type number
 *
 * @param SightOpacity
 * @desc Opacity of the enemy's sight field when visualizing the enemy's sight field.
 * @default 64
 * @type number
 *
 * @param StareCountMin
 * @desc Minimum time to stare at a suspicious sound.
 * @default 180
 * @type number
 *
 * @param FollowersThrough
 * @desc If set to 1, enemy symbols will follow through your followers in formation.
 * @default 0
 * @type number
 *
 * =============================================================================
 */

(function() {

var parameters = PluginManager.parameters('AB_SymbolEncounterMZ');
var AB_SymbolEncounterMove_FindBalloon = Number(parameters['FindBalloon'] || 1);
var AB_SymbolEncounterMove_LoseBalloon = Number(parameters['LoseBalloon'] || 2);
var AB_SymbolEncounterMove_StareBalloon = Number(parameters['StareBalloon'] || 1);
var AB_SymbolEncounterMove_StareEndBalloon = Number(parameters['StareEndBalloon'] || 2);
var AB_SymbolEncounterMove_FindMoveSpeed = Number(parameters['FindMoveSpeed'] || 4);
var AB_SymbolEncounterMove_NormalMoveSpeed = Number(parameters['NormalMoveSpeed'] || 3);
var AB_SymbolEncounterMove_AppearanceTime = Number(parameters['AppearanceTime'] || 100);
var AB_SymbolEncounterMove_SightArea = Number(parameters['SightArea'] || 5);
var AB_SymbolEncounterMove_WarpTryTime = Number(parameters['WarpTryTime'] || 10);
var AB_SymbolEncounterMove_ChaseArea = Number(parameters['ChaseArea'] || 8);
var AB_SymbolEncounterMove_AppearanceArea = Number(parameters['AppearanceArea'] || 15);
var AB_SymbolEncounterMove_WarpArea = Number(parameters['WarpArea'] || 10);
var AB_SymbolEncounterMove_LoseCount = Number(parameters['LoseCount'] || 100);
var AB_SymbolEncounterMove_MinWaitTime = Number(parameters['MinWaitTime'] || 60);
var AB_SymbolEncounterMove_RndWaitTime = Number(parameters['RndWaitTime'] || 60);

var AB_SymbolEncounterMove_EnemySymbolEventName = "EnemySymbol";
var AB_SymbolEncounterMove_EnemySymbolNoFindEventName = "EnemySymbol_noFind";

var AB_SEM_SIGHT_FILLRECT_COLOR = parameters['SightColor'] ||"red" ;
var AB_SEM_SIGHT_FILLRECT_VISIBLE_SW_ID = Number(parameters['SightVisibleSwId'] || 1);

var AB_SEM_SIGHT_FILLRECT_OPACITY = Number(parameters['SightOpacity'] || 32);

var AB_SEM_StareCountMin = Number(parameters['StareCountMin']||180);

var AB_SEM_FollowersThrough = Number(parameters['FollowersThrough']||0);

Game_Event.prototype.checkTargetInSightStraight = function(x,y,targetX,targetY,d,step) {
var sightX = x;
var sightY = y;
var findX = targetX;
var findY = targetY;

for(var i=0;i<step;i++)
{
if(!this.findMode)
{
this.fillSights.push([sightX,sightY]);
}
if(findX==sightX && findY==sightY){
return true;
}
if(!this.canPass(sightX,sightY,d)&& i<step-1)
{
i=step-1;
}
switch (d) {
case 2:
sightY+=1;
break;
case 4:
sightX-=1;
break;
case 6:
sightX+=1;
break;
case 8:
sightY-=1;
break;
}
if(!this.findMode)
{
this.fillSights.push([sightX,sightY]);
}
if(findX==sightX && findY==sightY){
return true;
}
}
} return false;
}

Game_Event.prototype.checkTargetInSightDiagonally = function(x,y,targetX,targetY,d,step) {
var horz = d;
var vert = d;
var horz2 = d;
var vert2 = d;

var sightX = x;
var sightY = y;
var sightX2 = x;
var sightY2 = y;
    switch (d) {
    case 2:
horz = 4;
horz2 = 6;
sightY += 1;
sightY2 += 1;
sightX -= 1;
sightX2 += 1;
        break;
    case 4:
vert = 8;
vert2 = 2;
sightX -= 1;
sightX2 -= 1;
sightY -= 1;
sightY2 += 1;
        break;
    case 6:
vert = 8;
vert2 = 2;
sightX += 1;
sightX2 += 1;
sightY -= 1;
sightY2 += 1;
        break;
    case 8:
horz = 4;
horz2 = 6;
sightY -= 1;
sightY2 -= 1;
sightX -= 1;
sightX2 += 1;
        break;
    }
    var find = false;
    //console.log("horz="+horz+"vert="+vert);
    if(targetX==sightX && targetY==sightY){
    return true;
    }
    if(this.canPassDiagonally(x, y, horz, vert))
    {
    find = this.checkTargetInSightStraight(sightX,sightY,targetX,targetY,d,step-1);
    }
    if(!find)
    {
    //console.log("horz="+horz+"vert="+vert);
if(targetX==sightX2 && targetY==sightY2){
return true;
}
if(this.canPassDiagonally(x, y, horz2, vert2))
{
find = this.checkTargetInSightStraight(sightX2,sightY2,targetX,targetY,d,step-1);
}
    }
    } return find;

};
Game_Event.prototype.findPlayer=function()
{
    var bef = this.findMode;
    if (bef == undefined)
    {
    bef = false;
    }
    } this.findMode = true;
    var aft = this.findMode;
    if(bef ! = aft)
    {
   $gameTemp.requestBalloon(this,AB_SymbolEncounterMove_FindBalloon);
        this.turnTowardPlayer();
    this.mresPhase = 0;
    }
}
Game_Event.prototype.losePlayer=function()
{
    var bef = this.findMode;
    if (bef == undefined)
    {
    bef = false;
    }
    } this.findMode = false;
    var aft = this.findMode;
    if(bef ! = aft)
    {
   $gameTemp.requestBalloon(this,AB_SymbolEncounterMove_LoseBalloon);
    this.mresPhase = 0;
    }
}

Tilemap.prototype.createSightLayers = function() {
    var width = this._width;
    var height = this._height; var margin = this._margin;
    var margin = this._margin;
    var tileCols = Math.ceil(width / this._tileWidth) + 1;
    var tileRows = Math.ceil(height / this._tileHeight) + 1;
    var layerWidth = tileCols * this._tileWidth;
    var layerHeight = tileRows * this._tileHeight;
    this._sightBitmap = new Bitmap(layerWidth, layerHeight);
    this._sightLayer = new Sprite();
    this._sightLayer.opacity = AB_SEM_SIGHT_FILLRECT_OPACITY;
    //this._sightLayer.move(-margin, -margin, width, height);
    this._sightLayer.z = 2;
    // for (var i = 0; i < 4; i++) {
    // this._sightLayer.addChild(new Sprite(this._sightBitmap));
    // }
    this._sightLayer.addChild(new Sprite(this._sightBitmap));
    this.addChild(this._sightLayer);
}

var AB_SEM_Spriteset_Map_updateTilemap = Spriteset_Map.prototype.updateTilemap;
Spriteset_Map.prototype.updateTilemap = function() {
    AB_SEM_Spriteset_Map_updateTilemap.call(this);
    var tw = $gameMap.tileWidth();
    var th = $gameMap.tileHeight();
    var tilemap = this._tilemap;
    if(tilemap._sightLayer == undefined || tilemap._sightBitmap == undefined)
    {
    tilemap.createSightLayers();
    }
tilemap._sightLayer.opacity = $gameSwitches.value(AB_SEM_SIGHT_FILLRECT_VISIBLE_SW_ID) ? AB_SEM_SIGHT_FILLRECT_OPACITY: 0;


    
    var events = $gameMap.events()

    tilemap._sightBitmap.clear();
for(var i = 0;i < events.length; i++)
{
        if(events[i].fillSights ! = undefined)
        {
for(var j = 0;j < events[i].fillSights.length; j++)
{
var xxx = events[i].fillSights[j][0];
var yyy = events[i].fillSights[j][1];
var xxxx = (xxx * tw)-tilemap.origin.x;
var yyyy = (yyy * th)-tilemap.origin.y;


	        	
tilemap._sightBitmap.fillRect(
xxxx,
yyyy,
tilemap._tileWidth,tilemap._tileHeight,
AB_SEM_SIGHT_FILLRECT_COLOR
);
}
        }
        events[i].fillSights = [];
}


   
};


Game_Event.prototype.checkPartyInSight = function(sightX,sightY) {

var findX = $gamePlayer.x;
var findY = $gamePlayer.y;

var find = this.checkTargetInSightStraight(sightX,sightY,findX,findY,this.direction(),AB_SymbolEncounterMove_SightArea);
if(!find)
{
find = this.checkTargetInSightDiagonally(sightX,sightY,findX,findY,this.direction(),AB_SymbolEncounterMove_SightArea);
}
if(!find)
{
var followers = $gamePlayer.followers();
if(followers)
{
for(var i=0;i<followers._data.length;i++)
{
if(followers._data[i].isVisible())
{
findX = followers._data[i].x;
findY = followers._data[i].y;
find = this.checkTargetInSightStraight(sightX,sightY,findX,findY,this.direction(),AB_SymbolEncounterMove_SightArea);
if(!find)
{
find = this.checkTargetInSightDiagonally(sightX,sightY,findX,findY,this.direction(),AB_SymbolEncounterMove_SightArea);
}
if(find)
{
return find;
}

}
}
}
}

return find;
}
Game_Event.prototype.checkPlayerInSight = function() {
var sightX = this._x;
var sightY = this._y;
this.fillSights = [];
var find = this.checkPartyInSight(sightX,sightY);
if(this.isEnemySymbolNoFindEvent()){
find = false;
}
if(find)
{
this.findPlayer();
this.loseCount = AB_SymbolEncounterMove_LoseCount;
}else{
if(this.loseCount <= 0)
{
this.losePlayer();
}else{
this.loseCount--;
}
}
};


Game_Event.prototype.canWarp = function(x, y,regions,targetX,targetY) {
if(targetX == x && targetY == y)
{
return false;
}
var sa = Math.abs(targetX - x)+Math.abs(targetY - y);
//console.log("sa="+sa);
if(sa <= 5)
{
return false;
}
var foundRegion = false;
for(var i = 0;i<regions.length;i++)
{
if ($gameMap.regionId(x, y)==regions[i]) {
foundRegion = true;
break;
}
}
if(regions.length == 0)
{
foundRegion = true;
}
if(!foundRegion){
return false;
}
    if (! $gameMap.isValid(x, y)) {
        return false;
    }
    } if (! $gameMap.checkPassage(x, y, 0x0f)){
    return false;
    }
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    }
    if (this.isCollidedWithCharacters(x, y)) {
        return false;
    }
    } return true;
}
Game_Event.prototype.warpToPlayer = function(dist,regions) {
var centerX = $gamePlayer.x;
var centerY = $gamePlayer.y;
var minDistX = 3;

var warpX = centerX + (Math.randomInt(dist*2)-dist);
var warpY = centerY + (Math.randomInt(dist*2)-dist);
var times = AB_SymbolEncounterMove_WarpTryTime;
while(!this.canWarp(warpX,warpY,regions,centerX,centerY))
{
warpX = centerX + (Math.randomInt(dist*2)-dist);
warpY = centerY + (Math.randomInt(dist*2)-dist);
times--;
if(times < 1)
{
break;
}
}
if(this.canWarp(warpX,warpY,regions,centerX,centerY))
{
this.setPosition(warpX,warpY);
return true;
}
} return false;
}
Game_Event.prototype.moveRouteEnemySymbolFind = function()
{
    this.setMoveSpeed(AB_SymbolEncounterMove_FindMoveSpeed);
if(this._opacity == 255)
{
        var distance = $gameMap.distance(
        this._x, this._y, $gamePlayer.x, $gamePlayer.y);
        if(distance < AB_SymbolEncounterMove_ChaseArea)
        {
        if(!this.isBalloonPlaying())
        {
this.moveTowardPlayer();
        }
        }else{
        this.losePlayer();
        }
}else if(this._opacity == 0)
{
this.mresPhase = 7;
        this.findMode = false;
}
}
Game_Event.prototype.moveRouteEnemySymbolNormal = function(regions)
{
    this.setMoveSpeed(AB_SymbolEncounterMove_NormalMoveSpeed);
if(this.mresPhase == undefined)
{
this.mresPhase = 0;
}
if(this.mresTime == undefined)
{
this.mresTime = AB_SymbolEncounterMove_AppearanceTime;
}else if(this.mresTime>0){
this.mresTime -= 1;
}

    switch (this.mresPhase) {
    case 0:
    this.setStepAnime(true);
        //
        this.mresPhase = 1;
        break;
    case 1:
this.turnRightOrLeft90();
        this._waitCount = Math.randomInt(AB_SymbolEncounterMove_RndWaitTime)
        +AB_SymbolEncounterMove_MinWaitTime - 1;
        if(Math.randomInt(100)<50&&this.mresTime>0)
        {
this.mresPhase = 0;
        }else{
       this.mresPhase = 2;
        }
        break;
    case 2:
    case 3:
    case 4:
    case 5:
        this.moveForward();
        if(Math.randomInt(100)<25&&this.mresTime>0)
        {
this.mresPhase = 0;
        }else{
        this.mresPhase +=1;
        }
        break;
    case 6:
        this._waitCount = Math.randomInt(AB_SymbolEncounterMove_RndWaitTime)
        +AB_SymbolEncounterMove_MinWaitTime - 1;
        if(Math.randomInt(100)<10||this.mresTime<0)
        {
this.mresPhase = 7;
        }else{
       this.mresPhase = 0;
        }
        break;
    case 7:
if(!this.isBalloonPlaying())
{
if(this._opacity==255)
{
this.jump(0,0);
}
this.setOpacity(this._opacity-8);
if(this._opacity<=0)
{
// console.log("disappear");
this._opacity = 0;
this.mresPhase = 8;
this.setThrough(true);
this.setPosition(0,0);
        this._waitCount = Math.randomInt(180)+(180) - 1;
}
    }
        break;
    case 8:
        var warpOK = this.warpToPlayer(AB_SymbolEncounterMove_WarpArea,regions);
        if(warpOK)
        {
    // console.log("warpOK!"+this._x+", "+this._y+"player="+$gamePlayer.x+", "+$gamePlayer.y);
        this.mresPhase = 9;
        }
        break;
    case 9:
        this.setOpacity(this._opacity+8);
        if(this._opacity>=255)
        {
    // console.log("appear!");
this.mresTime = AB_SymbolEncounterMove_AppearanceTime;
        this.setOpacity(255);
        this.mresPhase = 10;
        this.setThrough(false);
        }
        break;
    case 10:
    this.jump(0,0);
      this.mresPhase = 0;
    break;
    default:
    this.mresPhase = 0;
    }
}
Game_Event.prototype.moveRouteEnemySymbol = function(regions)
{

    var distance = $gameMap.distance(
    this._x, this._y, $gamePlayer.x, $gamePlayer.y);
if(($gameMap.isEventRunning()&& !this._locked) || distance >= AB_SymbolEncounterMove_AppearanceArea )
{
if(this.mresPhase ! = 7 && this.mresPhase ! = 8)
{
this.mresPhase = 7;
}
        this.findMode = false;
}
if(this.findMode)
{
this.moveRouteEnemySymbolFind();
}else{
this.moveRouteEnemySymbolNormal(regions);
}


	
}
Game_Event.prototype.isEnemySymbolEvent= function() {
return this.event().name.indexOf(AB_SymbolEncounterMove_EnemySymbolEventName) ! = -1;
}
Game_Event.prototype.isEnemySymbolNoFindEvent= function() {
return this.event().name.indexOf(AB_SymbolEncounterMove_EnemySymbolNoFindEventName) ! = -1;
}
Game_Event.prototype.getRegions= function() {
var regions = [];
var metaRegions = this.event().meta.Region;
if(metaRegions ! = undefined)
{
var number = "";
for(var i = 0; i < metaRegions.length;i++){
if(metaRegions[i] == ',')
{
regions.push(parseInt(number,10));
number = "";
}else{
number = number + "" + metaRegions[i];
}
}
if(number!= "")
{
regions.push(parseInt(number,10));
}
}

return regions;
}
Game_Event.prototype.updateRoutineMove = function() {
    if (this.isEnemySymbolEvent() && !this._locked) {

if (this._waitCount > 0) {
this._waitCount--;
} else {
this.setMovementSuccess(true);
this.moveRouteEnemySymbol(this.getRegions());
            this.advanceMoveRouteIndex();
}
    }else{
Game_Character.prototype.updateRoutineMove.call(this);
    }
};
var AB_Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    if (this.isEnemySymbolEvent()) {

if(this._opacity == 255&& (! $gameMap.isEventRunning()))
{
this.checkPlayerInSight();
if(!this.findMode)
{
this.updateStare();
}
}
    if (!this._locked && this.checkStop(this.stopCountThreshold())) {
        this.moveTypeCustom();
    }
    }else{
    AB_Game_Event_updateSelfMovement.call(this);
    }
};

var AB_Game_Event_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
if(this.isEnemySymbolEvent())
{
if (this._opacity==255) {
AB_Game_Event_start.call(this);
}
}else{
AB_Game_Event_start.call(this); }
}
};


var AB_SEM_Game_Event_isNormalPriority = Game_Event.prototype.isNormalPriority;
Game_Event.prototype.isNormalPriority = function() {
if(this.isEnemySymbolEvent())
{
if(this._opacity==255&&!this.isJumping()&&this.mresPhase <7)
{
    return this._priorityType === 1;
    }else{
    return false;
    }
    }else{
    return AB_SEM_Game_Event_isNormalPriority.call(this);
    }
};
var AB_SEM_Game_Event_lock = Game_Event.prototype.lock;
Game_Event.prototype.lock = function() {
if(this.isEnemySymbolEvent())
{
//console.log("lock!");
this.setAbSem();
if (!this._locked) {
this._prelockDirection = this.direction();
this._locked = true;
}
}else{
AB_SEM_Game_Event_lock.call(this);
}
}

Game_Event.prototype.setAbSem = function(){
if(this.findMode == false)
{
if(! $gameParty.hasRaisePreemptive())
{
//console.log("this.direction()="+this.direction());
if(this.direction() == 2 && this.y > $gamePlayer.y)
{
$gameParty.setAbSemPreemptive(true);
}else if(this.direction() == 8 && this.y < $gamePlayer.y)
{
$gameParty.setAbSemPreemptive(true); }
}else if(this.direction() == 4 && this.x < $gamePlayer.x)
{
$gameParty.setAbSemPreemptive(true); }
}else if(this.direction() == 6 && this.x > $gamePlayer.x)
{
$gameParty.setAbSemPreemptive(true); }
}
}else{
//console.log("this.direction()="+this.direction());
$gameParty.setAbSemPreemptive(true); }
}
}else{
//console.log("findMode!");
if(! $gameParty.hasCancelSurprise())
{
if($gamePlayer.direction() == 2 && $gamePlayer.y > this.y)
{
$gameParty.setAbSemSurprise(true);
}else if($gamePlayer.direction() == 8 && $gamePlayer.y < this.y)
{
$gameParty.setAbSemSurprise(true);
}else if($gamePlayer.direction() == 4 && $gamePlayer.x < this.x)
{
$gameParty.setAbSemSurprise(true);
}else if($gamePlayer.direction() == 6 && $gamePlayer.x > this.x)
{
$gameParty.setAbSemSurprise(true);
}
}
}
}
Game_Event.prototype.checkPlayerInSightToSelfSwA = function() {
var key = [this._mapId, this._eventId, 'A'];
this.checkPlayerInSight();
$gameSelfSwitches.setValue(key,this.findMode);
};
Game_Event.prototype.checkPlayerInSightToSelfSwB = function() {
var key = [this._mapId, this._eventId, 'B'];
this.checkPlayerInSight();
$gameSelfSwitches.setValue(key,this.findMode);
};
Game_Event.prototype.checkPlayerInSightToSelfSwC = function() {
var key = [this._mapId, this._eventId, 'C'];
this.checkPlayerInSight();
$gameSelfSwitches.setValue(key,this.findMode);
};
Game_Event.prototype.checkPlayerInSightToSelfSwD = function() {
var key = [this._mapId, this._eventId, 'D'];
this.checkPlayerInSight();
$gameSelfSwitches.setValue(key,this.findMode);
};
Game_Character.prototype.checkPlayerInSightToSwitch = function(switchNo) {
this.checkPlayerInSight();
$gameSwitches.setValue(switchNo, this.findMode);
};

Game_Character.prototype.initStare = function() {
this.stareMode = false;
this.stareX = 0;
this.stareY = 0;
this.stareCount = 0;
this.stareFirstBalloon = false;
};
Game_Character.prototype.setStare = function(x,y,count) {
this.stareMode = true;
this.stareX = x;
this.stareY = y;
this.stareCount = count;
this._waitCount = 0;
};
Game_Character.prototype.checkStare = function(x,y,range) {
if(this.stareMode == undefined)
{
this.initStare();
}
var distance = Math.abs(this._x-x) + Math.abs(this._y-y);
//console.log("checkStare!");
if(distance <= range)
{
var rnd = Math.randomInt(AB_SEM_StareCountMin)+AB_SEM_StareCountMin;
var bef = this.stareMode;
this.setStare(x,y,rnd);
var aft = this.stareMode;

this.stareFirstBalloon = true;
this.turnToStare();
}
}
Game_Character.prototype.turnToStare = function() {
    var sx = this.deltaXFrom(this.stareX);
    var sy = this.deltaYFrom(this.stareY);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.setDirection(sx > 0 ? 4 : 6);
    } else if (sy ! == 0) {
        this.setDirection(sy > 0 ? 8 : 2);
    }
}
Game_Character.prototype.moveTowardStare = function() {
    var sx = this.deltaXFrom(this.stareX);
    var sy = this.deltaYFrom(this.stareY);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy ! == 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy ! == 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx ! == 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
}
Game_Character.prototype.moveToward = function(x,y) {
    var sx = this.deltaXFrom(x);
    var sy = this.deltaYFrom(y);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy ! == 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy ! == 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx ! == 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
}
Game_Character.prototype.updateStare = function() {
    if(this.stareMode)
    {
    this.turnToStare();
    if(!this.isBalloonPlaying())
    {
    if(this.stareFirstBalloon)
    {
$gameTemp.requestBalloon(this,AB_SymbolEncounterMove_StareBalloon);
this.stareFirstBalloon = false;
    }
this.stareCount-=1;
if(this.stareCount <= 0)
{
$gameTemp.requestBalloon(this,AB_SymbolEncounterMove_StareEndBalloon);
this.initStare();
}
    }
    }
}
Game_Character.prototype.stareEffect = function(range) {
var id = this._eventId;
var x = this._x;
var y = this._y;
$gameMap.events().forEach(function(event) {
//console.log("id="+id+" event._eventId "+event._eventId);
if(id ! = event._eventId && event._opacity == 255)
{
event.checkStare(x,y,range);
}
}, this);
};


Game_Event.prototype.checkStareToSelfSwA = function() {
var key = [this._mapId, this._eventId, 'A'];
this.updateStare();
$gameSelfSwitches.setValue(key,this.stareMode);
};
Game_Event.prototype.checkStareToSelfSwB = function() {
var key = [this._mapId, this._eventId, 'B'];
this.updateStare();
$gameSelfSwitches.setValue(key,this.stareMode);
};
Game_Event.prototype.checkStareToSelfSwC = function() {
var key = [this._mapId, this._eventId, 'C'];
this.updateStare();
$gameSelfSwitches.setValue(key,this.stareMode);
};
Game_Event.prototype.checkStareToSelfSwD = function() {
var key = [this._mapId, this._eventId, 'D'];
this.updateStare();
$gameSelfSwitches.setValue(key,this.stareMode);
};
Game_Character.prototype.checkStareToSwitch = function(switchNo) {
this.updateStare();
$gameSwitches.setValue(switchNo, this.stareMode);
};





var AB_SEM_BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
AB_SEM_BattleManager_setup.call(this,troopId, canEscape, canLose);
if($gameParty.isAbSemEnable()){
this._preemptive = $gameParty.getAbSemPreemptive();
this._surprise = ($gameParty.getAbSemSurprise() && !this._preemptive)
}
$gameParty.resetAbSem();
};

Game_Party.prototype.getAbSemPreemptive = function()
{
if(this.abSemPreemptive == undefined)
{
this.abSemPreemptive = false;
}
} return this.abSemPreemptive;
}
Game_Party.prototype.getAbSemSurprise = function()
{
if(this.abSemSurprise == undefined)
{
this.abSemSurprise = false;
}
return this.abSemSurprise;
}
Game_Party.prototype.setAbSemPreemptive = function(set)
{
this.abSemPreemptive = set;
this.abSemEnable = set;
}
Game_Party.prototype.setAbSemSurprise = function(set)
{
//console.log("setAbSemSurprise!2");
this.abSemSurprise = set;
this.abSemEnable = set;
}
Game_Party.prototype.resetAbSem = function()
{
this.abSemPreemptive = false;
this.abSemSurprise = false;
this.abSemEnable = false;
}
Game_Party.prototype.isAbSemEnable = function()
{
if(this.abSemEnable == undefined)
{
this.abSemEnable = false;
}
return this.abSemEnable ;
}
var AB_SEM_Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {


	
if(this.isEnemySymbolEvent() && AB_SEM_FollowersThrough == 1) {
    return this.isNormalPriority() && $gamePlayer.isCollidedWithoutFollowers(x, y);
}else{
return AB_SEM_Game_Event_isCollidedWithPlayerCharacters.call(this,x,y);
}
};

Game_Player.prototype.isCollidedWithoutFollowers = function(x, y) {
    if (this.isThrough()) {
        return false;
    } else {
        return this.pos(x, y);
    }
}

})();
