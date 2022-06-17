//
//  ステップエフェクト ver1.00
//
// ------------------------------------------------------
// Copyright (c) 2016 Yana
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
// ------------------------------------------------------
//
// author Yana
//

var Imported = Imported || {};
Imported['StepEffect'] = 1.00;

/*:
 * @target MZ MV
 * @url https://raw.githubusercontent.com/munokura/Yana-MV-plugins/master/Map_Message/StepEffect.js
 * @plugindesc ver1.00/足跡などのエフェクトを追加します。
 * @author Yana
 * 
 * @param EffectWidth
 * @text エフェクト画像の横幅
 * @type number
 * @desc エフェクト画像1セルの横幅です。
 * @default 48
 * 
 * @param AnimationSpeed
 * @text エフェクト画像速度
 * @type number
 * @desc 何フレームに一度エフェクト画像を進めるかの設定です。
 * 数値を大きくするほど、遅くなります。
 * @default 8
 * 
 * @param StepSize
 * @text エフェクトサイズ
 * @type number
 * @desc エフェクトを何ドットずらすかの設定です。
 * 設定した値の半分ずつ、エフェクトが中心からずれます。
 * @default 8
 *
 * @param AudibleDistance
 * @text ステップサウンド距離
 * @type number
 * @desc プレイヤー以外のステップサウンドが聞こえる距離です。
 * XYの距離の合計値がこの値を超えると、聞こえなくなります。
 * @default 10
 *
 * @noteParam ステップエフェクト0
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップエフェクト1
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップエフェクト2
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップエフェクト3
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップエフェクト4
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップエフェクト5
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップエフェクト6
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップエフェクト7
 * @noteRequire 1
 * @noteDir img/system/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド0
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド1
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド2
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド3
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド4
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド5
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド6
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @noteParam ステップサウンド7
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData tilesets
 *
 * @help
 * ------------------------------------------------------
 * 使用方法
 * ------------------------------------------------------
 * エフェクトに使用する画像は、img/system/内に用意してください。
 *
 * タイルセットのメモ欄に、
 * <ステップエフェクト○:画像名>
 * <StepEffect○:fileName>
 * のいずれかを記述すると、○番の地形タグのタイルに踏み込んだ時に、
 * 画像の表示を行います。
 *
 * 追加で、下記のいずれかの記述を行うと、
 * <ステップエフェクト設定○:X補正値,Y補正値[,スケール%[,fitAngle[,fitStep[,dry[,wet□[,animeSpeed◇]]]]]]>
 * <StepEffectSetting○:offsetX,offsetY[,scale%[,fitAngle[,fitStep[,dry[,wet□[,animeSpeed◇]]]]]]>
 *
 * ステップエフェクトの表示位置やスケールなどの追加パラメータを指定できます。
 * fitAngle
 *   その画像はキャラクターの向きに合わせて回転するようになります。
 *
 * fitStep
 *   その画像の表示位置が一歩ごとに上下左右にぶれるようになります。
 *
 * wet□
 *   その地形を通った時に通ったキャラクターにwet状態として、
 *   □番の地形タグが関連付けられます。
 *
 * dry
 *   wet状態のキャラは現在の地形タグを□番に変更します。
 *   これにより、濡れた地形を通った後乾いた地形を通ると足跡が残る、
 *   のような仕組みが作れます。
 *
 * animeSpeed◇
 *   そのエフェクトのanimationSpeedが◇に設定されます。
 *
 *
 * また、同じ設定はイベントのメモ欄と1ページ目の注釈でも行うことができます。
 * イベントに設定がある場合、タイルセットの設定より優先されます。
 *
 * タイルセットのメモ欄に、
 * <ステップサウンド○:SE名>
 * <StepSound○:fileName>
 * のいずれかを記述すると、○番の地形タグのタイルに踏み込んだ時に、
 * 指定したSEを再生します。
 *
 * 追加で、
 * <ステップサウンド設定○:ボリューム,ピッチ>
 * <StepSoundSetting○:volume,pitch>
 * のいずれかの記述を行うと、
 * ステップサウンドのボリュームとピッチを変更できます。
 * 設定が無い場合、それぞれには100が設定されます。
 * また、ボリューム、ピッチどちらも、値を範囲指定することができます。
 * 50-70のように指定すると、50-70のランダムな値が設定されます。
 *
 * また、これらの画像名やSE名の指定にnullを指定することで
 * エフェクトやサウンドを無効化することができます。
 *
 * ------------------------------------------------------
 * ※注意※
 * このプラグインで指定した画像やSEのうちイベントに設定したものは、
 * デプロイメントを行うとき、「未使用素材を含まない」のオプションを
 * オンにすると削除されてしまいます。
 * デプロイメント後、画像をフォルダに入れなおしたり、
 * 素材削除回避プラグインを導入して、
 * そちらで削除回避の対象に指定するなどの処置が必要です。
 * 素材削除回避プラグイン>http://rpg.mitukasa.jp/src/ogrpg1408.zip
 *
 * ------------------------------------------------------
 * 利用規約
 * ------------------------------------------------------
 * 当プラグインはMITライセンスで公開されています。
 * 使用に制限はありません。商用、アダルト、いずれにも使用できます。
 * 二次配布も制限はしませんが、サポートは行いません。
 * 著作表示は任意です。行わなくても利用できます。
 * 要するに、特に規約はありません。
 * バグ報告や使用方法等のお問合せはネ実ツクールスレ、
 * または、Twitterにお願いします。
 * https://twitter.com/yanatsuki_
 * 素材利用は自己責任でお願いします。
 * ------------------------------------------------------
 * 更新履歴:
 * ver1.00:
 * 公開
 */

(function() {
    ////////////////////////////////////////////////////////////////////////////////////

    var parameters = PluginManager.parameters('StepEffect');
    var characterSize = Number(parameters['EffectWidth']) || 48;
    var animationSpeed = Number(parameters['AnimationSpeed']) || 8;
    var stepSize = Number(parameters['StepSize']) || 8;
    var audibleDistance = Number(parameters['AudibleDistance']) || 100;

    ////////////////////////////////////////////////////////////////////////////////////

    DataManager.initStepEffects = function(note) {
        var stepEffects = [];
        var texts = note.split('\n');
        for (var i = 0, max = texts.length; i < max; i++) {
            if (texts[i].match(/<(?:ステップ|Step)((?:エフェクト|Effect|サウンド|Sound))(\d+):(.+)>/)) {
                var tag = Number(RegExp.$2);
                if (!stepEffects[tag]) {
                    stepEffects[tag] = { anime: '', se: '', animeSetting: '', seSetting: '' };
                }
                switch (RegExp.$1) {
                    case 'エフェクト':
                    case 'Effect':
                        stepEffects[tag].anime = RegExp.$3;
                        break;
                    case 'サウンド':
                    case 'Sound':
                        stepEffects[tag].se = RegExp.$3;
                        break;
                }
            } else if (texts[i].match(/<(?:ステップ|Step)((?:エフェクト|Effect|サウンド|Sound))(?:設定|Setting)(\d+):(.+)>/)) {
                var tag = Number(RegExp.$2);
                if (!stepEffects[tag]) {
                    stepEffects[tag] = { anime: '', se: '', animeSetting: '', seSetting: '' };
                }
                switch (RegExp.$1) {
                    case 'エフェクト':
                    case 'Effect':
                        stepEffects[tag].animeSetting = RegExp.$3;
                        break;
                    case 'サウンド':
                    case 'Sound':
                        stepEffects[tag].seSetting = RegExp.$3;
                        break;
                }
            }
        }
        return stepEffects;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    function Sprite_StepEffect() {
        this.initialize.apply(this, arguments);
    }

    Sprite_StepEffect.prototype = Object.create(Sprite.prototype);
    Sprite_StepEffect.prototype.constructor = Sprite_StepEffect;

    Sprite_StepEffect.prototype.isUsed = function() {
        return this._used;
    };

    Sprite_StepEffect.prototype.initialize = function(fileName, setting, x, y, d, character) {
        Sprite.prototype.initialize.call(this);
        this._used = true;
        var fn = setting.split(',');
        var sc = fn[2] ? Number(fn[2].replace(/[%％]/, '')) : 0;
        var ox = Number(fn[0]) ? Number(fn[0]) : 0;
        var oy = Number(fn[1]) ? Number(fn[1]) : 0;
        var scale = sc ? sc : 100;
        var wet = fn.filter(function(s) { return s.contains('wet') })[0];
        var as = fn.filter(function(s) { return s.contains('animeSpeed') })[0];
        this._fileName = fileName;
        this._nx = x * $gameMap.tileWidth() + characterSize / 2 + ox;
        this._ny = y * $gameMap.tileHeight() + characterSize / 2 + oy;
        this.x = -48;
        this.y = -48;
        this._dir = d;
        this._delay = 0;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.scale.x = scale * 0.01;
        this.scale.y = scale * 0.01;
        this._stepCount = character._stepCount;
        this._fitStep = fn.contains('fitStep');
        this._animeSpeed = animationSpeed;
        if (fn.contains('fitAngle')) {
            switch (d) {
                case 2:
                    this.rotation = 180 * 3.14159265 / 180;
                    break;
                case 4:
                    this.rotation = 270 * 3.14159265 / 180;
                    break;
                case 6:
                    this.rotation = 90 * 3.14159265 / 180;
                    break;
            }
            if (this._stepCount % 2 === 1) this.scale.x = -1;
        }
        if (wet && wet.match(/wet(\d+)/)) {
            character._wet = Number(RegExp.$1);
            character._wetStepCount = this._stepCount;
        }
        if (as && as.match(/animeSpeed(\d+)/)) this._animeSpeed = Number(RegExp.$1);
    };

    Sprite_StepEffect.prototype.update = function() {
        Sprite.prototype.update.call(this);
        if (!this.isUsed()) return;
        if (!this.bitmap) {
            var bitmap = ImageManager.loadSystem(this._fileName);
            if (bitmap.width > 0) {
                this.bitmap = bitmap;
                this._count = 0;
                this._max = (bitmap.width / characterSize) * this._animeSpeed;
                this._bh = bitmap.height;
                this.setFrame(0, 0, characterSize, this._bh);
                this._endAnime = false;
            }
        } else if (!this._endAnime && this._delay <= 0) {
            var frame = Math.floor(this._count / this._animeSpeed);
            var sx = characterSize * frame;
            this.setFrame(sx, 0, characterSize, this._bh);
            var dx = $gameMap._displayX;
            var dy = $gameMap._displayY;
            var cx = 0;
            var cy = 0;
            if (this._fitStep) {
                cx = ((this._dir === 2) ? (this._stepCount % 2) * stepSize : 0) - stepSize / 2;
                cx = this._dir === 8 ? stepSize / 2 - (this._stepCount % 2) * stepSize : cx;
                cy = ((this._dir === 4) ? (this._stepCount % 2) * stepSize : 0) - stepSize / 2;
                cy = this._dir === 6 ? stepSize / 2 - (this._stepCount % 2) * stepSize : cy;
            }
            var xx = this._nx - dx * $gameMap.tileWidth() + cx;
            var yy = this._ny - dy * $gameMap.tileHeight() + cy;
            if (xx < 0 || yy < 0) {
                if (xx < 0 && $gameMap.isLoopHorizontal()) dx -= $dataMap.width;
                if (yy < 0 && $gameMap.isLoopVertical()) dy -= $dataMap.height;
                xx = this._nx - dx * $gameMap.tileWidth() + cx;
                yy = this._ny - dy * $gameMap.tileHeight() + cy;
            }
            this.x = xx;
            this.y = yy;
            this._count++;
            if (this._count >= this._max) this._used = false;
        }
        if (this._delay > 0) this._delay--;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SSMap_createTilemap = Spriteset_Map.prototype.createTilemap;
    Spriteset_Map.prototype.createTilemap = function() {
        __SSMap_createTilemap.call(this);
        this.createStepContainer();
    };

    Spriteset_Map.prototype.createStepContainer = function() {
        this._stepContainer = new Sprite();
        this._stepContainer.setFrame(0, 0, this.width, this.height);
        this._stepContainer.z = 2;
        this._tilemap.addChild(this._stepContainer);
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Map.prototype.combineStepEffect = function(se, ce) {
        var effect = { anime: '', animeSetting: '', se: '', seSetting: '' };
        if (se) {
            if (se.anime) effect.anime = se.anime;
            if (se.animeSetting) effect.animeSetting = se.animeSetting;
            if (se.se) effect.se = se.se;
            if (se.seSetting) effect.seSetting = se.seSetting;
        }
        if (ce) {
            if (ce.anime) effect.anime = ce.anime;
            if (ce.animeSetting) effect.animeSetting = ce.animeSetting;
            if (ce.se) effect.se = ce.se;
            if (ce.seSetting) effect.seSetting = ce.seSetting;
        }
        return effect;
    };

    Game_Map.prototype.showStepEffect = function(tag, x, y, d, show, character, stepSpeed) {
        if (!show) return;
        var tileset = this.tileset();
        if (tileset) {
            var effects = this.stepEffects(tileset);
            var characterEffects = character.stepEffects();
            var ce, se, effect;
            if (character._wet >= 0) {
                se = effects[tag];
                ce = characterEffects[tag];
                effect = this.combineStepEffect(se, ce);
                if (effect.animeSetting) {
                    var as = effect.animeSetting.split(',');
                    if (as.contains('dry')) tag = character._wet;
                }
            }
            se = effects[tag];
            ce = characterEffects[tag];
            effect = this.combineStepEffect(se, ce);
            var ary = [0, 5, 4, 3, 2, 1, 0.5];
            var soundEnable = character._moveCount % (stepSpeed * ary[character.realMoveSpeed()]) === 0;
            if (soundEnable && effect.se && effect.se !== 'null') {
                var s = effect.seSetting ? se.seSetting.split(',') : ['100', '100'];
                var n = effect.se;
                var v = s[0].split('-');
                var p = s[1].split('-');
                v = v[1] ? Math.randomInt(Math.abs(Number(v[1]) - Number(v[0]))) + Number(v[0]) : Number(v[0]);
                p = p[1] ? Math.randomInt(Math.abs(Number(p[1]) - Number(p[0]))) + Number(p[0]) : Number(p[0]);
                var distance = Math.abs(character._realX - $gamePlayer._realX) + Math.abs(character._realY - $gamePlayer._realY);
                var rate = Math.max(1.0 - distance / audibleDistance, 0);
                var pan = 0;
                if (character._realX > $gamePlayer._realX) pan = 100;
                if (character._realX < $gamePlayer._realX) pan = -100;
                AudioManager.playSe({ name: n, pitch: p, volume: v * rate, pan: pan });
            }
            if (effect.anime && effect.anime !== 'null') {
                SceneManager._scene.setStepEffectAnime(effect.anime, effect.animeSetting, x, y, d, character);
            }
        }
    };

    Game_Map.prototype.stepEffects = function(tileset) {
        if (!tileset._stepEffects) tileset._stepEffects = DataManager.initStepEffects(tileset.note);
        return tileset._stepEffects;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_CharacterBase.prototype.isVisible = function() {
        return true;
    };

    Game_CharacterBase.prototype.isVehicle = function() {
        return false;
    };

    Game_CharacterBase.prototype.stepEffects = function() {
        return [];
    };

    var __GCBase_updateMove = Game_CharacterBase.prototype.updateMove;
    Game_CharacterBase.prototype.updateMove = function() {
        __GCBase_updateMove.call(this);
        if (this === $gamePlayer && this.isInVehicle()) return;
        if (this.isVehicle()) return;
        if (this._moveCount === undefined) this._moveCount = 0;
        this._moveCount++;
        var stepSpeed = 8;
        if (this.realMoveSpeed() === 6) stepSpeed = 4;
        if (this._moveCount % stepSpeed === 0) {
            if (this._wet === undefined) this._wet = -1;
            var xx = this._realX;
            var yy = this._realY;
            var tag = this.terrainTag();
            $gameMap.showStepEffect(tag, xx, yy, this.direction(), this.isVisible(), this, stepSpeed);
            if (this._wet >= 0 && this._stepCount > this._wetStepCount + 10) {
                this._wet = -1;
                this._wetStepCount = 0;
            }
        }
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Event.prototype.stepEffects = function() {
        if (this._stepEffects) return this._stepEffects;
        var note = this.event().note + '\n';
        this.event().pages[0].list.forEach(function(l) {
            if (l.code === 108) note += l.parameters + '\n';
            if (l.code === 408) note += l.parameters + '\n';
        }.bind(this));
        this._stepEffects = DataManager.initStepEffects(note);
        return this._stepEffects;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    Game_Vehicle.prototype.isVehicle = function() {
        return true;
    };

    ////////////////////////////////////////////////////////////////////////////////////

    var __SMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        __SMap_update.call(this);
        this.updateStepSprites();
    };

    Scene_Map.prototype.updateStepSprites = function() {
        if (!this._stepSprites) this._stepSprites = [];
        for (var i = 0, max = this._stepSprites.length; i < max; i++) {
            if (this._stepSprites[i] && !this._stepSprites[i].isUsed()) {
                this._spriteset._stepContainer.removeChild(this._stepSprites[i]);
                this._stepSprites[i] = null;
            }
        }
        this._stepSprites = this._stepSprites.filter(function(s) { return !!s });
    };

    Scene_Map.prototype.setStepEffectAnime = function(name, setting, x, y, d, character) {
        if (!this._stepSprites) this._stepSprites = [];
        if (character._stepCount === undefined) character._stepCount = 0;
        var sprite = new Sprite_StepEffect(name, setting, x, y, d, character);
        this._spriteset._stepContainer.addChild(sprite);
        this._stepSprites.push(sprite);
        character._stepCount++;
    };

    ////////////////////////////////////////////////////////////////////////////////////
}());