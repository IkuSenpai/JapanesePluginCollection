
//=============================================================================
// AB_SymbolEncounter.js
//=============================================================================
//
// RPGツクールMZ用プラグイン　出現位置がランダムなシンボルエンカウントシステム
//
//=============================================================================
// 作者　misty_rain
// ホームページ　Anti-Belphetan
// http://kilisamenosekai.web.fc2.com/
// 
// Copyright (c) 2016 misty_rain
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================
// ver 1.0 2016/04/14 公開
// ver 1.1 2016/04/18 パラメータが読めなくなっていたので修正
// ver 1.2 2016/08/30 ツクールMV1.3.1に対応
// ver 1.3 2017/01/10 敵シンボルは不透明度255としか起動しないよう修正
// ver 1.4 2017/02/06 敵シンボルは隊列の仲間をすり抜ける機能追加
// ver 1.5 2020/09/29 発見モードのない敵シンボル追加
// ver 2.0 2021/04/30 ツクールMZに移植
//=============================================================================
/*:
 * @target MZ
 * 
 * @plugindesc 出現位置がランダムなシンボルエンカウントシステム
 * 
 * @author misty_rain
 *
 * @help イベントの名前を「EnemySymbol」と指定すると、
 * そのイベントはシンボルエンカウント向きの動きをします。
 * メモに「<Region:1>」と指定すると、そのイベントはリージョン1でのみ出現します。
 * 「<Region:2,3>」と指定すれば、そのイベントはリージョン2と3で出現します。
 *
 * ・普段は右か左に90度回転、一歩前進などの動きをします。
 * ・プレイヤーが視界に入ると発見モードになります。
 * ・イベントが向いてる方向に距離6(デフォルト)、幅3(固定)が視界です。横とか後ろから近付いても発見されません。
 * ・発見モードになると、ひたすらプレイヤーに近づく動きになります。
 * ・発見モードでは、プレイヤーとの距離8(デフォルト)より離れると見失います。向いてる方向関係ありません。
 * ・普段の状態の場合、一定時間経過、プレイヤーとの距離10(デフォルト)より離れると消えます。
 * ・消えた後、しばらくするとプレイヤーとの距離10(デフォルト)以内で、指定したリージョン番号の場所に出現します。
 * ・イベントの実行内容で、移動ルートの指定：このイベントで不透明度0にした場合も、どこかへ出現します。
 * ・戦闘の処理など、イベントの実行内容はツクーラーさんが作成してください。最後は移動ルートの指定：このイベントで不透明度0にして消してください。
 * ・イベントが始まると消えます。イベント中は再出現しません。
 * ・発見モード時、プレイヤーの後ろから接触された場合、不意打ち　→　パーティ能力の　不意打ち無効　で防げます
 *　・普段、イベントの後ろからプレイヤーが接触すると先制攻撃　→　パーティ能力の　先制攻撃率アップ　で正面以外先制攻撃(正面だと先に発見モードになる)
 * ・敵の視界は、スイッチで可視化できます。
 * ・イベントの名前を「EnemySymbol_noFind」と指定すると、発見モードにならない敵シンボルになります。
 *
 * 以下、上級編です。上手く使わないと動かなくなったりします。
 * ・プラグインコマンドはありませんが、移動ルート指定でスクリプトに「this.checkPlayerInSightToSelfSwA();」を指定すると、
 * 　プレイヤーが視界内にいるかどうかチェックし、いればセルフスイッチAがON,いなければOFFになります。
 * ・同様に 「this.checkPlayerInSightToSelfSwB();」でセルフスイッチB、
 * 　 「this.checkPlayerInSightToSelfSwC();」でセルフスイッチC、
 * 　 「this.checkPlayerInSightToSelfSwD();」でセルフスイッチDがONになります。
 * 　また、「this.checkPlayerInSightToSwitch(ONにしたいスイッチNo);」でチェック結果を指定したNoのスイッチに入れます。
 *
 * ・イベントの移動ルートの指定にて、スクリプト「this.stareEffect(距離)」を指定すると、指定した距離内にいるイベントは、
 * 　そのイベントがいる方を一定時間凝視します。例えば、不審な音がしたのでそちらを向くなどの用途に。
 * ・移動ルート指定でスクリプトに「this.checkStareToSelfSwA();」を指定すると、
 * 　凝視中の動作を行い、凝視中ならセルフスイッチAがON,凝視していなければOFFになります。
 * ・同様に 「this.checkStareToSelfSwA();」でセルフスイッチB、
 * 　 「this.checkStareToSelfSwB();」でセルフスイッチC、
 * 　 「this.checkStareToSelfSwC();」でセルフスイッチDがONになります。
 * 　また、「this.checkStareToSwitch(ONにしたいスイッチNo);」でチェック結果を指定したNoのスイッチに入れます。
 * ・イベントの移動ルートの指定にて、スクリプト「this.moveTowardStare();」を指定すると、凝視地点へ一歩近づきます。
 * (例えば一定のルートを巡回しているような場合、凝視地点へ近付けさせた後、何もないと気付いて元のルートに戻るとかはありません)
 * ・イベントの移動ルートの指定にて、スクリプト「this.moveToward(x,y);」を指定すると、x,yで指定した座標へ一歩近づきます。
 *
 * =============================================================================
 * @param FindBalloon
 * @desc 発見モードになった時の吹き出し番号
 * @default 1
 * @type number
 *
 * @param LoseBalloon
 * @desc 発見モードで　見失った時の吹き出し番号
 * @default 2
 * @type number
 *
 * @param FindMoveSpeed
 * @desc 発見モード時の歩く速度
 * @default 4
 * @type number
 *
 * @param NormalMoveSpeed
 * @desc 普段の速度
 * @default 3
 * @type number
 *
 * @param AppearanceTime
 * @desc 普段の状態で、消えるまでの時間
 * @default 100
 * @type number
 *
 * @param SightArea
 * @desc 視界の距離
 * @default 5
 * @type number
 *
 * @param WarpTryTime
 * @desc 消えた後、再出現する位置をランダムで決め、リージョンが合うかの判定をする。合うまでは出現しない。その回数。
 * @default 10
 * @type number
 *
 * @param ChaseArea
 * @desc　発見モード時、追いかけてくる距離。これを超えると見失う。
 * @default 8
 * @type number
 *
 * @param AppearanceArea
 * @desc 普段、この距離以上にプレイヤーが離れたら強制的に消え、再出現する
 * @default 15
 * @type number
 *
 * @param WarpArea
 * @desc　出現範囲。プレイヤーを中心に、ここで指定した範囲内でランダムに出現
 * @default 10
 * @type number
 *
 * @param LoseCount
 * @desc　発見モード時、プレイヤーを見失ってから、発見モードOFFになるまでのカウント
 * @default 100
 * @type number
 *
 * @param MinWaitTime
 * @desc　普段、動作を待つカウントの最小
 * @default 60
 * @type number
 *
 * @param RndWaitTime
 * @desc　普段、動作を待つカウントの幅(最小＋ランダム分待つ、そのランダムを指す)
 * @default 60
 * @type number
 *
 * @param SightColor
 * @desc　敵視界を可視化した時の色
 * @default red
 * @type number
 *
 * @param SightVisibleSwId
 * @desc　敵視界を可視化するスイッチの番号　１ならスイッチ1ONで敵の視界を可視化する
 * @default 1
 * @type number
 *
 * @param SightOpacity
 * @desc　敵視界を可視化したとき、敵視界の不透明度
 * @default 64
 * @type number
 * 
 * @param StareCountMin
 * @desc　不審な音がした時などで、そっちの方を凝視する時間の最小
 * @default 180
 * @type number
 *
 * @param FollowersThrough
 * @desc　1にすると敵シンボルは隊列歩行の仲間たちをすり抜ける
 * @default 0
 * @type number 
 *
 * =============================================================================
 */

(function() {

var parameters = PluginManager.parameters('AB_SymbolEncounterMZ');
var AB_SymbolEncounterMove_FindBalloon = Number(parameters['FindBalloon'] ||　1);
var AB_SymbolEncounterMove_LoseBalloon = Number(parameters['LoseBalloon'] ||　2);
var AB_SymbolEncounterMove_StareBalloon = Number(parameters['StareBalloon'] ||　1);
var AB_SymbolEncounterMove_StareEndBalloon = Number(parameters['StareEndBalloon'] ||　2);
var AB_SymbolEncounterMove_FindMoveSpeed = Number(parameters['FindMoveSpeed'] ||　4);
var AB_SymbolEncounterMove_NormalMoveSpeed = Number(parameters['NormalMoveSpeed'] ||　3);
var AB_SymbolEncounterMove_AppearanceTime = Number(parameters['AppearanceTime'] ||　100);
var AB_SymbolEncounterMove_SightArea = Number(parameters['SightArea'] ||　5);
var AB_SymbolEncounterMove_WarpTryTime = Number(parameters['WarpTryTime'] ||　10);
var AB_SymbolEncounterMove_ChaseArea = Number(parameters['ChaseArea'] ||　8);
var AB_SymbolEncounterMove_AppearanceArea = Number(parameters['AppearanceArea'] || 15);
var AB_SymbolEncounterMove_WarpArea = Number(parameters['WarpArea'] ||　10);
var AB_SymbolEncounterMove_LoseCount = Number(parameters['LoseCount'] ||　100);
var AB_SymbolEncounterMove_MinWaitTime = Number(parameters['MinWaitTime'] || 60);
var AB_SymbolEncounterMove_RndWaitTime = Number(parameters['RndWaitTime'] || 60);

var AB_SymbolEncounterMove_EnemySymbolEventName = "EnemySymbol";
var AB_SymbolEncounterMove_EnemySymbolNoFindEventName = "EnemySymbol_noFind";

var AB_SEM_SIGHT_FILLRECT_COLOR = parameters['SightColor']||"red" ;
var AB_SEM_SIGHT_FILLRECT_VISIBLE_SW_ID = Number(parameters['SightVisibleSwId'] || 1);

var AB_SEM_SIGHT_FILLRECT_OPACITY = Number(parameters['SightOpacity'] || 32);

var AB_SEM_StareCountMin = Number(parameters['StareCountMin']||180);

var AB_SEM_FollowersThrough = Number(parameters['FollowersThrough']||0);

Game_Event.prototype.checkTargetInSightStraight  = function(x,y,targetX,targetY,d,step) {
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
	return false;
};

Game_Event.prototype.checkTargetInSightDiagonally  = function(x,y,targetX,targetY,d,step) {
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
		sightY +=1;
		sightY2 +=1;
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
		sightY -=1;
		sightY2 -=1;
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
    return find;

};
Game_Event.prototype.findPlayer=function()
{
    var bef = this.findMode;
    if (bef == undefined)
    {
    	bef = false;
    }
    this.findMode = true;
    var aft = this.findMode;
    if(bef != aft)
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
    this.findMode = false;
    var aft = this.findMode;
    if(bef != aft)
    {
   		$gameTemp.requestBalloon(this,AB_SymbolEncounterMove_LoseBalloon);
    	this.mresPhase = 0;
    }
}

Tilemap.prototype.createSightLayers = function() {
    var width = this._width;
    var height = this._height;
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
    // 	this._sightLayer.addChild(new Sprite(this._sightBitmap));
    // }
    this._sightLayer.addChild(new Sprite(this._sightBitmap));
    this.addChild(this._sightLayer);
};

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
        if(events[i].fillSights !=  undefined)
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
    if (!$gameMap.isValid(x, y)) {
        return false;
    }
    if(!$gameMap.checkPassage(x, y, 0x0f)){
    	return false;
    }
    if (this.isThrough() || this.isDebugThrough()) {
        return true;
    }
    if (this.isCollidedWithCharacters(x, y)) {
        return false;
    }
    return true;
};
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
	return false;
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
    		// console.log("warpOK!"+this._x+","+this._y+"player="+$gamePlayer.x+","+$gamePlayer.y);
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
		if(this.mresPhase != 7 && this.mresPhase != 8)
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
	return this.event().name.indexOf(AB_SymbolEncounterMove_EnemySymbolEventName) != -1;
}
Game_Event.prototype.isEnemySymbolNoFindEvent= function() {
	return this.event().name.indexOf(AB_SymbolEncounterMove_EnemySymbolNoFindEventName) != -1;
}
Game_Event.prototype.getRegions= function() {
	var regions = [];
	var metaRegions = this.event().meta.Region;
	if(metaRegions != undefined)
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

		if(this._opacity == 255&& (!$gameMap.isEventRunning()))
		{
	        this.checkPlayerInSight();
	        if(!this.findMode)
	        {
				this.updateStare();
	        }
		}
    	if (!this._locked &&　this.checkStop(this.stopCountThreshold())) {
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
		AB_Game_Event_start.call(this);
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
};

Game_Event.prototype.setAbSem = function(){
	if(this.findMode == false)
	{
		if(!$gameParty.hasRaisePreemptive())
		{
			//console.log("this.direction()="+this.direction());
			if(this.direction() == 2 && this.y > $gamePlayer.y)
			{
				$gameParty.setAbSemPreemptive(true);
			}else if(this.direction() == 8 && this.y < $gamePlayer.y)
			{
				$gameParty.setAbSemPreemptive(true);
			}else if(this.direction() == 4 && this.x < $gamePlayer.x)
			{
				$gameParty.setAbSemPreemptive(true);
			}else if(this.direction() == 6 && this.x > $gamePlayer.x)
			{
				$gameParty.setAbSemPreemptive(true);
			}
		}else{
			//console.log("this.direction()="+this.direction());
			$gameParty.setAbSemPreemptive(true);
		}
	}else{
		//console.log("findMode!");
		if(!$gameParty.hasCancelSurprise())
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
};
Game_Character.prototype.turnToStare = function() {
    var sx = this.deltaXFrom(this.stareX);
    var sy = this.deltaYFrom(this.stareY);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.setDirection(sx > 0 ? 4 : 6);
    } else if (sy !== 0) {
        this.setDirection(sy > 0 ? 8 : 2);
    }
};
Game_Character.prototype.moveTowardStare = function() {
    var sx = this.deltaXFrom(this.stareX);
    var sy = this.deltaYFrom(this.stareY);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
};
Game_Character.prototype.moveToward = function(x,y) {
    var sx = this.deltaXFrom(x);
    var sy = this.deltaYFrom(y);
    if (Math.abs(sx) > Math.abs(sy)) {
        this.moveStraight(sx > 0 ? 4 : 6);
        if (!this.isMovementSucceeded() && sy !== 0) {
            this.moveStraight(sy > 0 ? 8 : 2);
        }
    } else if (sy !== 0) {
        this.moveStraight(sy > 0 ? 8 : 2);
        if (!this.isMovementSucceeded() && sx !== 0) {
            this.moveStraight(sx > 0 ? 4 : 6);
        }
    }
};
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
};
Game_Character.prototype.stareEffect = function(range) {
	var id = this._eventId;
	var x = this._x;
	var y = this._y;
	$gameMap.events().forEach(function(event) {
		//console.log("id="+id+" event._eventId"+event._eventId);
		if(id != event._eventId && event._opacity == 255)
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
	    this._surprise = ($gameParty.getAbSemSurprise() && !this._preemptive);
	}
	$gameParty.resetAbSem();
};

Game_Party.prototype.getAbSemPreemptive = function()
{
	if(this.abSemPreemptive == undefined)
	{
		this.abSemPreemptive = false;
	}
	return this.abSemPreemptive;
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
};

})();
