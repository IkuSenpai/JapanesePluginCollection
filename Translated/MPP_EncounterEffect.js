//=============================================================================
// MPP_EncounterEffect.js
//=============================================================================
// Copyright (c) 2021 - 2022 Mokusei Penguin
// Released under the MIT license
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Change the effect at the time of encounter to a special effect.
 * @author Mokusei Penguin
 * @url 
 *
 * @help [version 4.1.1]
 * - This plugin is for RPG Maker MZ.
 * - Change the effect at the time of encounter to a special effect.
 * 
 * ▼ Plugin command
 *  - In the item to enter a numerical value,
 *    select the text and write 'v[N]' to refer to the variable N.
 *  
 *  〇 setType
 *   - The effect type will be changed to the specified number
 *     only once next.
 * 
 *  〇 setCharacter
 *   - The effect will be executed around the specified character
 *     only once next.
 *   - This setting is valid only for effect type 1.
 *   
 *  〇 setColor
 *   - The effect will change to the specified color only once next.
 * 
 * ▼ Effect type
 *  -1 : No SE & effects
 *  0 : Default.
 *  1 : Breaks around the character.
 *  2 : The screen splits from the left and scatters to the left.
 *  3 : The entire screen scatters to the front.
 *  4 : The screen splits from the left and scatters to the right.
 *  5 : Divide into squares and expand to the front.
 * 
 * ▼ Other
 *  - In effect type 1, if the main character is not specified,
 *    [Player] will be the center for random encounters,
 *    and [This Event] will be the center for
 *    the event command [Battle Processing].
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠ is half-width)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setType
 *      @desc Change the effect type only in the next battle.
 *      @arg type
 *          @desc 
 *          @type number
 *              @min -1
 *              @max 5
 *          @default 1
 *
 *
 *  @command setCharacter
 *      @desc Specify the main character for the next effect.
 * This setting is valid only for effect type 1.
 *      @arg character
 *          @desc -1:Player, 0:This event, 1-:Event with specified ID
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *
 *  @command setColor
 *      @desc Specifies the color of the next effect.
 *      @arg color
 *          @desc R,G,B
 *          @default 255,255,255
 *
 * 
 *  @param Effect Type
 *      @desc 
 *      @type number
 *          @min 0
 *          @max 5
 *      @default 1
 * 
 *  @param Effect Color
 *      @desc R,G,B
 *      @default 255,255,255
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc エンカウント時の演出を特殊なエフェクトに変更します。
 * @author 木星ペンギン
 * @url 
 *
 * @help [version 4.1.1]
 * - このプラグインはRPGツクールMZ用です。
 * - エンカウント時の演出を特殊なエフェクトに変更します。
 * 
 * ▼ プラグインコマンド
 *  - 数値を入力する項目で、テキストを選択して v[N] と記述することで
 *    変数N番を参照します。
 *  
 *  〇 エフェクトタイプ変更
 *   - 次の１回のみ、エフェクトタイプが指定した番号に変更されます。
 * 
 *  〇 中心キャラ指定
 *   - 次の１回のみ、エフェクトが指定したキャラクターを中心に実行されます。
 *   - この設定はエフェクトタイプ1のみ有効です。
 *   
 *  〇 エフェクト色指定
 *   - 次の１回のみ、エフェクトが指定した色に変更されます。
 * 
 * ▼ エフェクトタイプ
 *  -1: SE & エフェクトなし
 *  0 : デフォルト
 *  1 : キャラクターを中心に割れる
 *  2 : 画面が左から割れて左に散る
 *  3 : 画面全体が前面に飛び散る
 *  4 : 画面が左から割れて右に散る
 *  5 : 四角く区切り、手前に拡大する
 * 
 * ▼ その他
 *  - エフェクトタイプ1にて、中心となるキャラクターを指定していない場合、
 *    ランダムエンカウントでは[プレイヤー]、
 *    イベントコマンドの【戦闘の処理】では[このイベント]が中心となります。
 * 
 * ================================
 * Mail : wood_penguin＠yahoo.co.jp (＠は半角)
 * Blog : http://woodpenguin.blog.fc2.com/
 * License : MIT license
 * 
 *  @command setType
 *      @text エフェクトタイプ変更
 *      @desc 次に行う戦闘のみエフェクトタイプを変更します。
 *      @arg type
 *          @text タイプ
 *          @desc エフェクトタイプ
 *          @type number
 *              @min -1
 *              @max 5
 *          @default 1
 *
 *  @command setCharacter
 *      @text 中心キャラ指定
 *      @desc 次に行うエフェクトで中心となるキャラクターを指定します。
 * この設定はエフェクトタイプ1でのみ有効です。
 *      @arg character
 *          @text キャラクター
 *          @desc 中心となるキャラクター
 * -1:プレイヤー, 0:このイベント, 1～:指定したIDのイベント
 *          @type number
 *              @min -1
 *              @max 999
 *          @default 0
 *
 *  @command setColor
 *      @text エフェクト色指定
 *      @desc 次に行うエフェクトの色を指定します。
 *      @arg color
 *          @text 色(RGB)
 *          @desc 
 *          @default 255,255,255
 *
 * 
 *  @param Effect Type
 *      @text エフェクトタイプ
 *      @desc 画面割れエフェクトのタイプ
 *      @type number
 *          @min 0
 *          @max 5
 *      @default 1
 * 
 *  @param Effect Color
 *      @text エフェクト色
 *      @desc エフェクトのデフォルト色
 * (r,g,bで指定)
 *      @default 255,255,255
 * 
 *
 */

(() => {
    'use strict';
    
    const pluginName = 'MPP_EncounterEffect';
    
    // Plugin Parameters
    const parameters = PluginManager.parameters(pluginName);
    const param_EffectType = Number(parameters['Effect Type'] || 1);
    const param_DefaultColor = parameters['Effect Color'].split(',').map(Number);
    
    const _importedPlugin = (...names) => {
        return names.some(name => PluginManager._scripts.includes(name));
    };
    const pluginOptions = [
        'MPP_EncounterEffect_Op1',
        'MPP_EncounterEffect_Op2'
    ];
    
    // JsExtensions 代替
    const MathExt = (() => {
        // Number.prototype.clamp と違い、下限優先
        const clamp = (x, min, max) => Math.max(Math.min(x, max), min);
        const mod = (x, n) => ((x % n) + n) % n;
        const randomInt = (x) => Math.floor(x * Math.random());
        return { clamp, mod, randomInt };
    })();

    // 各タイプのパラメータ
    const baseTypeParameters = [
        null,
        // Type 1
        {
            'Shape Type': 'square',
            'Center': 'character',
            'Break Direction': 'none',
            'Break Duration': 45,
            'Interval Duration': 45,
            'Scatter Duration': 0,
            'Move Duration': 60,
            'Split Radial': 8,
            'Radial Random Rate': 90,
            'Circle Radius': 96,
            'Circle Increase Rate': 150,
            'Circle Random Rate': 40
        },
        // Type 2
        {
            'Shape Type': 'random',
            'Break Direction': 'left',
            'Break Duration': 30,
            'Interval Duration': 45,
            'Scatter Direction': 'left',
            'Scatter Duration': 24,
            'Move Duration': 60,
            'Split X': 7,
            'X Random Rate': 80,
            'Split Y': 5,
            'Y Random Rate': 80
        },
        // Type 3
        {
            'Shape Type': 'triangle',
            'Break Direction': 'inside',
            'Break Duration': 35,
            'Interval Duration': 40,
            'Scatter Direction': 'inside',
            'Scatter Duration': 16,
            'Move Duration': 100,
            'Split X': 8,
            'X Random Rate': 80,
            'Split Y': 6,
            'Y Random Rate': 80,
            'Jump': true
        },
        // Type 4
        {
            'Shape Type': 'random',
            'Break Direction': 'left',
            'Break Duration': 30,
            'Interval Duration': 45,
            'Scatter Direction': 'right',
            'Scatter Duration': 6,
            'Move Duration': 45,
            'Split X': 9,
            'X Random Rate': 70,
            'Split Y': 7,
            'Y Random Rate': 70
        },
        // Type 5
        {
            'Shape Type': 'square',
            'Break Direction': 'outside',
            'Break Duration': 30,
            'Interval Duration': 45,
            'Scatter Direction': 'left',
            'Scatter Duration': 50,
            'Move Duration': 80,
            'Split X': 15,
            'X Random Rate': 0,
            'Split Y': 11,
            'Y Random Rate': 0
        },
    ];
    
    //-------------------------------------------------------------------------
    // EncounterEffect

    function EncounterEffect() {
        throw new Error('This is a static class');
    }
    
    if (_importedPlugin(...pluginOptions)) {
        window.EncounterEffect = EncounterEffect;
    }
    
    EncounterEffect.centerPoint = new Point();
    EncounterEffect.windowBounds = null;

    EncounterEffect.clear = function() {
        this._snapTexture = null;
        this._opacity = 0;
        this._fragments = null;
        this._type = param_EffectType;
        this._character = null;
        this._color = param_DefaultColor;
        this._angle = 0;
    };

    EncounterEffect.destroy = function() {
        if (this._snapTexture) {
            this._snapTexture.destroy();
            this._snapTexture = null;
        }
    };

    EncounterEffect.params = function() {
        return this._type >= 0 ? baseTypeParameters[this._type] : null;
    };

    EncounterEffect.type = function() {
        return this._type;
    };

    EncounterEffect.setup = function(snapTexture) {
        this._snapTexture = snapTexture;
        this._opacity = 255;
        this._opacityDelay = 0;
        this._opacityDuration = 0;
        this._params = this.params();
        this.setupWindowBounds();
        this.setupCenterPoint();
        this.createFragments();
        this.sortFragment(this.currentParam('Break Direction'));
        this.setupAngle();
    };

    EncounterEffect.setupWindowBounds = function() {
        const { width, height } = Graphics;
        this.windowBounds = { minX: 0, maxX: width, minY: 0, maxY: height };
    };

    EncounterEffect.setupCenterPoint = function() {
        if (this.currentParam('Center') === 'character') {
            const { minX, maxX, minY, maxY } = this.windowBounds;
            const character = this.centerCharacter();
            const charX = character.screenX();
            const charY = character.screenY();
            const cx = Math.round(MathExt.clamp(charX, minX, maxX));
            const cy = Math.round(MathExt.clamp(charY - 24, minY, maxY));
            this.centerPoint.set(cx, cy);
        } else {
            const cx = Graphics.width / 2;
            const cy = Graphics.height / 2;
            this.centerPoint.set(cx, cy);
        }
    };

    EncounterEffect.setupAngle = function() {
        this._angle = 0;
        this._targetAngle = 0;
        this._angleEasing = new Easing();
        if (this._type === 5) {
            const duration = this.effectSpeed();
            this._targetAngle = -3;
            this._angleEasing.start('Slow end', duration);
        }
    };

    EncounterEffect.snapTexture = function() {
        return this._snapTexture;
    };

    EncounterEffect.setType = function(type) {
        this._type = type;
    };

    EncounterEffect.opacity = function() {
        return this._opacity;
    };

    EncounterEffect.setColor = function(...color) {
        this._color = color;
    };

    EncounterEffect.color = function() {
        return this._color;
    };

    EncounterEffect.setCharacter = function(character) {
        this._character = character;
    };

    EncounterEffect.centerCharacter = function() {
        return (
            this._character ||
            $gameMap.getInterpreterCharacter(0) ||
            $gamePlayer
        );
    };

    EncounterEffect.createFragments = function() {
        this._fragments = [];
        switch (this._type) {
            case 1:
                this.createFragmentsT1();
                break;
            case 2:
            case 3:
            case 4:
            case 5:
                this.createFragmentsT2();
                break;
        }
    };

    EncounterEffect.createFragmentsT1 = function() {
        const { minX, maxX, minY, maxY } = this.windowBounds;
        const allPoints = this.createAllPointsT1();
        for (let points of this.generatorPointsT1(allPoints)) {
            points = this.cutProtrusionX(points, minX, false);
            points = this.cutProtrusionX(points, maxX, true);
            points = this.cutProtrusionY(points, minY, false);
            points = this.cutProtrusionY(points, maxY, true);
            points = this.removeOuterPoint(points);
            if (points.length >= 3) {
                this.addFragment(this.uniqPoints(points));
            }
        }
    };
    
    EncounterEffect.generatorPointsT1 = function*(allPoints) {
        const square = this.currentParam('Shape Type', 'square') === 'square';
        const max = allPoints[0] ? allPoints[0].length : 1;
        for (const [i, outPoints] of allPoints.entries()) {
            const inPoints = i > 0 ? allPoints[i - 1] : null;
            for (const [j, point2] of outPoints.entries()) {
                const point3 = outPoints[(j + 1) % max];
                if (inPoints) {
                    const point4 = inPoints[(j + 1) % max];
                    const point1 = inPoints[j];
                    if (square) {
                        yield [point1, point2, point3, point4];
                    } else {
                        yield [point1, point2, point4];
                        yield [point2, point3, point4];
                    }
                } else {
                    yield [this.centerPoint, point2, point3];
                }
            }
        }
    };

    EncounterEffect.cutProtrusionX = function(points, x, cutAbove) {
        const size = points.length;
        for (const p1 of points) {
            const i = points.indexOf(p1);
            const p2 = points[(i + 1) % points.length];
            const p3 = this.verticalIntersectionPoint(p1, p2, x);
            if (p3) {
                points.splice(i + 1, 0, p3);
            }
        }
        if (size < points.length) {
            return points.filter(p => cutAbove ? p.x <= x : p.x >= x);
        }
        return points;
    };

    EncounterEffect.verticalIntersectionPoint = function(point1, point2, x) {
        const x1 = point1.x;
        const y1 = point1.y;
        const x2 = point2.x;
        const y2 = point2.y;
        if ((x1 < x && x2 > x) || (x1 > x && x2 < x)) {
            const y = y1 + Math.round((y2 - y1) * (x - x1) / (x2 - x1));
            return new Point(x, y);
        }
        return null;
    };

    EncounterEffect.cutProtrusionY = function(points, y, cutAbove) {
        const size = points.length;
        for (const p1 of points) {
            const i = points.indexOf(p1);
            const p2 = points[(i + 1) % points.length];
            const p3 = this.horizontalIntersectionPoint(p1, p2, y);
            if (p3) {
                points.splice(i + 1, 0, p3);
            }
        }
        if (size < points.length) {
            return points.filter(p => cutAbove ? p.y <= y : p.y >= y);
        }
        return points;
    };

    EncounterEffect.horizontalIntersectionPoint = function(point1, point2, y) {
        const x1 = point1.x;
        const y1 = point1.y;
        const x2 = point2.x;
        const y2 = point2.y;
        if ((y1 < y && y2 > y) || (y1 > y && y2 < y)) {
            const x = x1 + Math.round((x2 - x1) * (y - y1) / (y2 - y1));
            return new Point(x, y);
        }
        return null;
    };

    EncounterEffect.removeOuterPoint = function(points) {
        const { minX, maxX, minY, maxY } = this.windowBounds;
        return points.filter(
            ({ x, y }) => x >= minX && x <= maxX && y >= minY && y <= maxY
        );
    };

    EncounterEffect.uniqPoints = function(points) {
        return points.filter(
            (p1, i) => points.findIndex(p2 => p2.equals(p1)) === i
        );
    };

    EncounterEffect.createAllPointsT1 = function() {
        const {
            'Shape Type': sType = 'square',
            'Split Radial': splitX = 8,
            'Circle Radius': baseRadius = 96,
            'Circle Increase Rate': circleRate = 150
        } = this._params;
        const maxRadius = this.maxRadius();

        const allPoints = [];
        let startAngle = 360 * Math.random();
        let innerR = 0;
        let currentR = baseRadius;
        for (let i = 0; i < 8; i++) {
            if (sType === 'triangle') startAngle += 180 / splitX;
            if (i === 7) innerR = 1000000;
            allPoints.push(this.createRoundPoints(startAngle, innerR, currentR));
            if (innerR > maxRadius) break;
            innerR += currentR;
            currentR *= circleRate / 100;
        }
        return allPoints;
    };

    EncounterEffect.createRoundPoints = function(startAngle, innerR, currentR) {
        const {
            'Split Radial': splitX = 8,
            'Radial Random Rate': rRate = 90,
            'Circle Random Rate': cRate = 40
        } = this._params;
        const baseAngle = 360 / splitX;
        
        const randomAngle = (n) => {
            return (startAngle + baseAngle * n +
                baseAngle * rRate * Math.random() / 100) % 360;
        };
        const randomRadius = () => {
            return innerR +
                currentR * (1 - cRate * (0.75 - Math.random()) / 100);
        };
        
        return [...Array(splitX).keys()].map(
            i => this.calculatePoint(randomAngle(i), randomRadius())
        );
    };

    EncounterEffect.calculatePoint = function(angle, radius) {
        const { x, y } = this.centerPoint;
        const sx = Math.round(radius * Math.cos(angle * Math.PI / 180));
        const sy = Math.round(radius * Math.sin(angle * Math.PI / 180));
        return new Point(x + sx, y + sy);
    };

    EncounterEffect.maxRadius = function() {
        const { width, height } = Graphics;
        const { x, y } = this.centerPoint;
        const deltaX = x < width / 2 ? width - x : x;
        const deltaY = y < height / 2 ? height - y : y;
        return Math.hypot(deltaX, deltaY);
    };

    EncounterEffect.createFragmentsT2 = function() {
        switch (this.currentParam('Shape Type', 'square')) {
            case 'square':
                this.createFragmentsT2Square();
                break;
            case 'triangle':
                this.createFragmentsT2Triangle();
                break;
            case 'random':
                this.createFragmentsT2Random();
                break;
        }
    };

    EncounterEffect.createFragmentsT2Square = function() {
        const allPoints = this.createAllPointsT2Square();
        for (const points of this.generatorPointsT2(allPoints)) {
            this.addFragment(points);
        }
    };

    EncounterEffect.generatorPointsT2 = function*(allPoints) {
        const {
            'Shape Type': sType = 'square',
            'Split X': splitX = 12,
            'Split Y': splitY = 9
        } = this._params;
        for (let i = 0; i < splitX; i++) {
            const leftPoints = allPoints[i];
            const rightPoints = allPoints[i + 1];
            for (let j = 0; j < splitY; j++) {
                const point1 = leftPoints[j];
                const point2 = rightPoints[j];
                const point3 = rightPoints[j + 1];
                const point4 = leftPoints[j + 1];
                if (sType === 'triangle') {
                    yield [point1, point2, point4];
                    yield [point2, point3, point4];
                } else {
                    yield [point1, point2, point3, point4];
                }
            }
        }
    };

    EncounterEffect.createAllPointsT2Square = function() {
        const {
            'Split X': splitX = 12,
            'Split Y': splitY = 9,
            'X Random Rate': xRate = 80,
            'Y Random Rate': yRate = 80
        } = this._params;
        const { minX, maxX, minY, maxY } = this.windowBounds;
        const width = Graphics.width / Math.max(splitX - xRate / 100, 1);
        const height = Graphics.height / Math.max(splitY - yRate / 100, 1);
        
        const pointX = (i) => {
            if (i === 0) {
                return minX;
            } else if (i === splitX) {
                return maxX;
            }
            return this.randomValue(width, i, xRate);
        };
        const pointY = (j) => {
            if (j === 0) {
                return minY;
            } else if (j === splitY) {
                return maxY;
            }
            return this.randomValue(height, j, yRate);
        };
        
        return [...Array(splitX + 1).keys()].map(i => {
            return [...Array(splitY + 1).keys()].map(j => {
                return new Point(pointX(i), pointY(j));
            });
        });
    };

    EncounterEffect.randomValue = function(value, index, rate) {
        return Math.round(value * (index - rate * Math.random() / 100));
    };

    EncounterEffect.createFragmentsT2Triangle = function() {
        const allPoints = this.createAllPointsT2Triangle();
        for (const points of this.generatorPointsT2(allPoints)) {
            this.addFragment(points);
        }
    };

    EncounterEffect.createAllPointsT2Triangle = function() {
        const {
            'Split X': splitX = 12,
            'Split Y': splitY = 9,
            'X Random Rate': xRate = 80,
            'Y Random Rate': yRate = 80
        } = this._params;
        const { minX, maxX, minY, maxY } = this.windowBounds;
        const width = Graphics.width / Math.max(splitX - xRate / 100, 1);
        const height = Graphics.height / Math.max(splitY - 0.5, 1);
        const bottomY = height / 2 * yRate / 100;
        
        const pointX = (i) =>{
            if (i === 0) {
                return minX;
            } else if (i === splitX) {
                return maxX;
            }
            return this.randomValue(width, i, xRate);
        };
        const pointY = (i, j) => {
            if (j === 0) {
                return minY;
            } else if (j === splitY) {
                return maxY;
            }
            if (i % 2 === 1 && j === 1) {
                return this.randomValue(height / 2, j, yRate);
            }
            const py = bottomY - (i % 2 === 0 ? 0 : height / 2);
            return py + this.randomValue(height, j, yRate);
        };
        
        return [...Array(splitX + 1).keys()].map(i => {
            return [...Array(splitY + 1).keys()].map(j => {
                return new Point(pointX(i), pointY(i, j));
            });
        });
    };

    EncounterEffect.createFragmentsT2Random = function() {
        const allPolygons = this.createPolygonsT2Random();
        
        const sidePolygon = (i, j, pos) => {
            const si = i + (pos === 0 || pos === 1 ? -1 : 1);
            const subPolygons = allPolygons[si];
            if (!subPolygons) {
                return null;
            }
            const sj = Math.floor(j / 2) * 2;
            const polygon2 = subPolygons[sj];
            if (Math.floor(pos / 2) === Math.floor(polygon2.pos / 2)) {
                return subPolygons[sj + 1];
            }
            return polygon2;
        };

        for (const [i, mainPolygons] of allPolygons.entries()) {
            for (const [j, polygon1] of mainPolygons.entries()) {
                if (polygon1.state === 'none') {
                    const d = MathExt.randomInt(3);
                    let polygon2;
                    if (d === 0) {
                        // 上
                        polygon2 = mainPolygons[j - 1];
                    } else if (d === 1) {
                        // 下
                        polygon2 = mainPolygons[j + 1];
                    } else {
                        // 横
                        polygon2 = sidePolygon(i, j, polygon1.pos);
                    }
                    if (polygon2 && polygon2.state === 'none') {
                        this.joinPolygon(polygon1, polygon2, d);
                    }
                }
            }
        }
        for (const polygon of allPolygons.flat()) {
            if (polygon.state === 'none' || polygon.state === 'received') {
                this.addFragment(polygon.points);
            }
        }
    };

    /**
     * 
     * @returns {array} 二次元配列。
     * pos: 分割した際の位置。0=左上, 1=左下, 2=右上, 3=右下。
     */
    EncounterEffect.createPolygonsT2Random = function() {
        const allPoints = this.createAllPointsT2Square();
        const polygons = [];
        for (const [p1, p2, p3, p4] of this.generatorPointsT2(allPoints)) {
            if (Math.random() < 0.5) {
                polygons.push(
                    { points:[p4, p1, p2], pos:0, state:'none' },
                    { points:[p4, p2, p3], pos:3, state:'none' }
                );
            } else {
                polygons.push(
                    { points:[p1, p2, p3], pos:2, state:'none' },
                    { points:[p4, p1, p3], pos:1, state:'none' }
                );
            }
        }
        
        const splitY = this.currentParam('Split Y', 9);
        const allPolygons = [];
        while (polygons.length > 0) {
            allPolygons.push(polygons.splice(0, splitY * 2));
        }
        return allPolygons;
    };

    EncounterEffect.joinPolygon = function(polygon1, polygon2, d) {
        const pos1 = polygon1.pos;
        const pos2 = polygon2.pos;
        let start = 0, index = 0;
        if (d === 0) {
            start = pos1 === 0 || pos1 === 1 ? 2 : 1;
            index = 1;
        } else if (d === 1) {
            start = 0;
            index = pos1 === 0 ? 2 : pos1 === 2 ? 0 : pos2 === 0 ? 0 : 2;
        } else {
            start = pos1 === 0 || pos1 === 1 ? 1 : 2;
            index = pos2 === 0 || pos2 === 1 ? 2 : 0;
        }
        polygon1.points.splice(start, 0, polygon2.points[index]);
        polygon1.state = 'received';
        polygon2.state = 'joined';
    };

    EncounterEffect.addFragment = function(points) {
        const fragment = new Encounter_Fragment(points);
        if (fragment.isValid()) {
            fragment.setup();
            this._fragments.push(fragment);
        }
    };

    EncounterEffect.sortFragment = function(direction) {
        const formula = this.compareFormula(direction);
        if (formula) {
            this._fragments.sort((a, b) => formula(a) - formula(b));
        }
    };

    EncounterEffect.compareFormula = function(direction) {
        const { x, y } = this.centerPoint;
        switch (direction) {
            case 'left':
                return (f) => {
                    return f._x;
                };
            case 'center':
                return (f) => {
                    return Math.abs(x - f._x);
                };
            case 'right':
                return (f) => {
                    return -f._x;
                };
            case 'inside':
                return (f) => {
                    return Math.abs(x - f._x) + Math.abs(y - f._y) * y / x;
                };
            case 'outside':
                return (f) => {
                    return -Math.abs(x - f._x) - Math.abs(y - f._y) * y / x;
                };
        }
        return null;
    };

    EncounterEffect.breakFragments = function(start, end, duration) {
        for (let i = start; i < end; i++) {
            this._fragments[i].onBreak(duration, i);
        }
    };

    EncounterEffect.onBattleStart = function() {
        const {
            'Move Duration': duration = 60,
            'Scatter Direction': direction = 'none',
            'Scatter Duration': delay = 0
        } = this._params;
        this.sortFragment(direction);
        this.startFragments(duration, delay);
        this.startOpacity(duration);
        if (this._type === 5) {
            this._targetAngle = -4;
            this._angleEasing.start('Straight', duration);
        }
    };

    EncounterEffect.startFragments = function(duration, delay) {
        const maxItems = this.maxItems();
        for (const [i, fragment] of this._fragments.entries()) {
            fragment.onBattleStart(duration, delay);
            fragment.setDelay(Math.floor(delay * i / maxItems));
        }
    };

    EncounterEffect.startOpacity = function(duration) {
        if (this._type === 5) {
            this._opacityDuration = 1;    
            this._opacityDelay = duration - 1;
        } else {
            this._opacityDelay = Math.floor(duration / 2);
            this._opacityDuration = duration - this._opacityDelay;    
        }
    };

    EncounterEffect.update = function() {
        if (this.isRunning()) {
            this._fragments.forEach(fragment => fragment.update());
            this.updateOpacity();
            this.updateAngle();
            if (this._opacity === 0) {
                this.destroy();
                this.clear();
            }
        }
    };

    EncounterEffect.updateOpacity = function() {
        if (this._opacityDuration > 0 && this.updateOpacityDelay()) {
            const d = this._opacityDuration--;
            this._opacity *= (d - 1) / d;
        }
    };

    EncounterEffect.updateOpacityDelay = function() {
        if (this._opacityDelay > 0) {
            this._opacityDelay--;
            return false;
        }
        return true;
    };

    EncounterEffect.updateAngle = function() {
        const easing = this._angleEasing;
        if (easing.isMoving()) {
            this._angle = easing.apply(this._angle, this._targetAngle);
            easing.update();
        }
    };

    EncounterEffect.maxItems = function() {
        return this._fragments ? this._fragments.length : 0;
    };

    EncounterEffect.fragments = function() {
        return this._fragments || [];
    };

    EncounterEffect.isValid = function() {
        return !!baseTypeParameters[this._type];
    };

    EncounterEffect.isRunning = function() {
        return !!this._fragments;
    };

    EncounterEffect.isReady = function() {
        return !this.isRunning() || this._opacityDuration < 45;
    };

    EncounterEffect.breakDuration = function() {
        return this.currentParam('Break Duration', 45);
    };

    EncounterEffect.effectSpeed = function() {
        const d = this.currentParam('Interval Duration', 45);
        return this.breakDuration() + d + 2;
    };

    EncounterEffect.fadeSpeed = function() {
        return this.currentParam('Move Duration', 60);
    };

    EncounterEffect.currentParam = function(name, def = null) {
        return this._params ? this._params[name] || def : def;
    };

    EncounterEffect.rotation = function() {
        return this._angle * Math.PI / 180;
    };

    //-------------------------------------------------------------------------
    // SceneManager

    SceneManager.snapTexture = function() {
        const stage = this._scene
        const width = Graphics.width;
        const height = Graphics.height;
        const renderTexture = PIXI.RenderTexture.create(width, height);
        if (stage) {
            const renderer = Graphics.app.renderer;
            renderer.render(stage, renderTexture);
            stage.worldTransform.identity();
        }
        return renderTexture;
    };
    
    //-------------------------------------------------------------------------
    // SoundManager

    const _SoundManager_playBattleStart = SoundManager.playBattleStart;
    SoundManager.playBattleStart = function() {
        if (EncounterEffect.type() >= 0) {
            _SoundManager_playBattleStart.apply(this, arguments);
        }
    };
    
    //-------------------------------------------------------------------------
    // Encounter_Fragment

    class Encounter_Fragment {
        constructor(points) {
            this._points = points;
            this.initRect(points);
            this.initMembers();
        }

        initMembers() {
            const rect = this._rect;
            this._x = rect.x + Math.floor(rect.width / 2);
            this._y = rect.y + Math.floor(rect.height / 2);
            this._targetX = 0;
            this._targetY = 0;
            this._jumpHeight = 0;
            this._scale = 1;
            this._targetScale = 1;
            this._moveEasing = new Easing();
            this._opacity = 255;
            this._opacityDuration = 0;
            this._delay = 0;
            this._flash = false;
            this._break = false;
            this._slideX = 0;
            this._slideY = 0;
            this.visible = true;
        }

        initRect(points) {
            const allX = points.map( point => point.x );
            const allY = points.map( point => point.y );
            const x = Math.min(...allX);
            const y = Math.min(...allY);
            const width = Math.max(...allX) - x;
            const height = Math.max(...allY) - y;
            this._rect = new Rectangle(x, y, width, height);
        }

        isValid() {
            return this._rect.width > 4 && this._rect.height > 4;
        }

        setDelay(delay) {
            this._delay = delay;
        }

        clearFlash() {
            this._flash = false;
        }

        isFlashRequested() {
            return this._flash;
        }

        rect() {
            return this._rect;
        }

        isBreak() {
            return this._break;
        }

        lineWidth() {
            return 4;
        }

        flashOpacity() {
            return 255;
        }

        breakRate() {
            return 1;
        }

        slideRate() {
            return 1;
        }

        rotationRate() {
            return 1;
        }

        screenX() {
            return this._x;
        }

        screenY() {
            return this._y - this._jumpHeight;
        }

        flashColor() {
            const color = [...EncounterEffect.color()];
            color[3] = this.flashOpacity();
            return color;
        }
    
        points() {
            return this._points;
        }

        setup() {
            this.setupRotation();
        }
    
        setupRotation() {
            this._speed = 0;
            this._pace = 0;
            this._rotationX = 0;
            this._rotationY = 0;
            this._rotationZ = 0;
            const rate = this.rotationRate();
            if (Math.random() < 0.5) {
                this._rotationSpeedX = (Math.random() + 0.5) * 2 * rate;
                this._rotationSpeedY = 0;
            } else {
                this._rotationSpeedX = 0;
                this._rotationSpeedY = (Math.random() + 0.5) * 2 * rate;
            }
            this._rotationSpeedZ = (Math.random() - 0.5) * 3 * rate;
        }

        textureMatrix() {
            const tx = this._break ? this._slideX : 0;
            const ty = this._break ? this._slideY : 0;
            return new PIXI.Matrix(1, 0, 0, 1, tx, ty);
        }
        
        onBreak(duration, index) {
            this.startEncounter(duration, index);
            this._flash = true;
            this._break = true;
        }
    
        startEncounter(duration, index) {
            switch (EncounterEffect.type()) {
                case 1:
                    this.setupMoveT1(duration);
                    this.setupSlideT1()
                    break;
                case 2:
                case 3:
                case 4:
                    this.setupMoveT2();
                    this.setupSlideT2();
                    break;
                case 5:
                    this.setupMoveT5(duration);
                    break;
            }
        }

        setupMoveT1(duration) {
            const breakRate = this.breakRate();
            this._moveEasing.start('Slow end', duration);
            this._speed = this.hypotSpeed(1.5) * breakRate;
            this._pace = -1;
            this.setMoveT1(breakRate / 100, breakRate / 100);
        }

        setupMoveT2() {
            const breakRate = this.breakRate();
            this._speed = 0.125 * breakRate;
            this._pace = -1;
        }

        setupSlideT1() {
            const slideRate = this.slideRate();
            const { x, y } = EncounterEffect.centerPoint;
            const radian = Math.atan2(this._y - y, this._x - x);
            this._slideX = 20 * Math.cos(radian) * slideRate;
            this._slideY = 20 * Math.sin(radian) * slideRate;
        }

        setupSlideT2() {
            const slideRate = this.slideRate();
            const { x, y, width, height } = this._rect;
            const mx = (MathExt.randomInt(21) - 10) * slideRate;
            const my = (MathExt.randomInt(21) - 10) * slideRate;
            const minX = x + width - Graphics.width;
            const minY = y + height - Graphics.height;
            this._slideX = MathExt.clamp(mx, minX, x);
            this._slideY = MathExt.clamp(my, minY, y);
        }

        setupMoveT5(duration) {
            this._moveEasing.start('Slow end', duration);
            this._speed = 0;
            this._pace = 0;
            this.setMoveAway('outside', 1.1);
        }

        update() {
            if (this.visible && this.updateDelay()) {
                this.updateMove();
                this.updateOpacity();
                this.updateRotation();
            }
        }

        updateDelay() {
            if (this._delay > 0) {
                this._delay--;
                return false;
            }
            return true;
        }

        updateMove() {
            const easing = this._moveEasing;
            if (easing.isMoving()) {
                this._x = easing.apply(this._x, this._targetX);
                this._y = easing.apply(this._y, this._targetY);
                this._scale = easing.apply(this._scale, this._targetScale);
                this.visible = this._scale < 8;
                if (EncounterEffect.currentParam('Jump')) {
                    const d = easing._duration;
                    const wd = easing._wholeDuration;
                    const m = 4 * (d - 1) / wd;
                    this._jumpHeight = (2 * 2 - Math.pow(m - 2, 2)) * 96;
                }
                easing.update();
            }
        }
        
        updateOpacity() {
            if (this._opacityDuration > 0) {
                const d = this._opacityDuration--;
                this._opacity *= (d - 1) / d;
            }
        }

        updateRotation() {
            if (this._speed > 0) {
                this._speed *= 1 + 0.04 * this._pace;
                this._rotationX += this._rotationSpeedX * this._speed;
                this._rotationY += this._rotationSpeedY * this._speed;
                this._rotationZ += this._rotationSpeedZ * this._speed;
            }
        }

        onBattleStart(duration, delay) {
            switch (EncounterEffect.type()) {
                case 1:
                    this.onBattleStartT1(duration);
                    break;
                case 2:
                    this.onBattleStartT2(Math.max(duration - delay, 1));
                    break;
                case 3:
                    this.onBattleStartT3(duration);
                    break;
                case 4:
                    this.onBattleStartT4(duration);
                    break;
                case 5:
                    this.onBattleStartT5(Math.max(duration - delay, 1));
                    break;
            }
        }

        onBattleStartT1(duration) {
            this._moveEasing.start('Slow end', duration);
            this._speed = this.hypotSpeed(40);
            this._pace = -1;
            this.setMoveT1(0.8 + Math.random() / 2, 0.8 + Math.random() / 2);
        }

        hypotSpeed(baseSpeed) {
            const { x, y } = EncounterEffect.centerPoint;
            return baseSpeed / Math.sqrt(Math.hypot(this._x - x, this._y - y));
        }

        setMoveT1(rateX, rateY) {
            const { minX, maxX, minY, maxY } = EncounterEffect.windowBounds;
            const { x: cx, y: cy } = EncounterEffect.centerPoint;
            const sx = this._x - cx;
            const sy = this._y - cy;
            let ox = sx;
            let oy = sy;
            if (ox < 0) {
                oy *= (minX - cx) / ox;
                ox = minX - cx;
            } else if (ox > 0) {
                oy *= (maxX - cx) / ox;
                ox = maxX - cx;
            } else {
                oy = oy < cy ? minY - cy : maxY - cy;
            }
            if (oy < minY - cy) {
                ox *= (minY - cy) / oy;
                oy = minY - cy;
            } else if (oy > maxY - cy) {
                ox *= (maxY - cy) / oy;
                oy = maxY - cy;
            }
            this._targetX = this._x + (ox - sx) * rateX;
            this._targetY = this._y + (oy - sy) * rateY;
        }

        onBattleStartT2(duration) {
            this._moveEasing.start('Slow start', duration);
            this._speed = 1;
            this._pace = 1;
            const dir = EncounterEffect.currentParam('Scatter Direction');
            this.setMoveT2(dir);
        }

        setMoveT2(direction) {
            const { x: cx, y: cy } = EncounterEffect.centerPoint;
            switch (direction) {
                case 'left':
                    this._targetX = this._x - Graphics.width;
                    this._targetY = this._y + (this._y - cy);
                    break;
                case 'right':
                    this._targetX = this._x + Graphics.width;
                    this._targetY = this._y + (this._y - cy);
                    break;
                case 'outside': {
                    const radian = Math.atan2(this._y - cy, this._x - cx);
                    const d = (cx + cy) / 2;
                    this._targetX = this._x + d * Math.cos(radian);
                    this._targetY = this._y + d * Math.sin(radian);
                    break;
                }
            }
        }

        onBattleStartT3(duration) {
            this._moveEasing.start('Slow end', duration);
            this._speed = 2;
            this._pace = 0;
            this.setMoveT3();
        }

        setMoveT3() {
            const { x: cx, y: cy } = EncounterEffect.centerPoint;
            const sx = this._x - cx;
            const sy = this._y - cy;

            const rate = 3;
            this._targetX = (sx + 80 * (Math.random() - 0.5)) * rate + cx;
            this._targetY = (sy + 32 * (Math.random() - 0.5)) * rate + cy * 3;

            const delta = Math.abs(sx) + Math.abs(sy);
            this._targetScale = delta < 128 && Math.random() < 0.4 ? 12 : 1;
            this._targetScale += 2.5 * Math.random();
        }

        onBattleStartT4(duration) {
            this._moveEasing.start('Slow end', duration);
            this._speed = 2;
            this._pace = -1;
            const dir = EncounterEffect.currentParam('Scatter Direction');
            this.setMoveAway(dir, 2);
        }

        onBattleStartT5(duration) {
            this._moveEasing.start('Straight', duration);
            this._speed = 0;
            this._pace = 0;
            this.setMoveAway('outside', 2.25);
            this._targetScale = 1.75;
            this._opacityDuration = duration;
        }

        setMoveAway(direction, rate) {
            let { x, y } = EncounterEffect.centerPoint;
            switch (direction) {
                case 'left':
                    x = Graphics.width;
                    break;
                case 'right':
                    x = 0;
                    break;
            }
            this._targetX = x + (this._x - x) * rate;
            this._targetY = y + (this._y - y) * rate;
        }

        opacity() {
            return this._opacity;
        }

        scaleX() {
            return Math.cos(this._rotationX * Math.PI / 180) * this._scale;
        }

        scaleY() {
            return Math.cos(this._rotationY * Math.PI / 180) * this._scale;
        }

        rotation() {
            return this._rotationZ * Math.PI / 180;
        }

    }
    
    if (_importedPlugin(...pluginOptions)) {
        window.Encounter_Fragment = Encounter_Fragment;
    }

    //-------------------------------------------------------------------------
    // Easing

    class Easing {
        constructor(type = '', duration = 0) {
            this.setType(type);
            this.setDuration(duration);
        }

        start(type, duration) {
            this.setType(type);
            this.setDuration(duration);
        }

        setType(type) {
            this._type = type || 'Slow end';
        }

        setDuration(duration) {
            this._duration = duration;
            this._wholeDuration = duration;
        }

        clear() {
            this._duration = 0;
        }

        isMoving() {
            return this._duration > 0;
        }

        update() {
            if (this._duration > 0) {
                this._duration--;
            }
        }

        apply(current, target) {
            const d = this._duration;
            const wd = this._wholeDuration;
            const lt = this.calc((wd - d) / wd);
            const t = this.calc((wd - d + 1) / wd);
            const start = (current - target * lt) / (1 - lt);
            return start + (target - start) * t;
        }

        calc(t) {
            switch (this._type) {
                case 'Slow start':
                    return this.easeIn(t);
                case 'Slow end':
                    return this.easeOut(t);
                case 'Slow start and end':
                    return this.easeInOut(t);
                default:
                    return t;
            }
        }

        easeIn(t) {
            return Math.pow(t, 2);
        }

        easeOut(t) {
            return 1 - Math.pow(1 - t, 2);
        }

        easeInOut(t) {
            if (t < 0.5) {
                return this.easeIn(t * 2) / 2;
            } else {
                return this.easeOut(t * 2 - 1) / 2 + 0.5;
            }
        }

    };

    //-------------------------------------------------------------------------
    // PluginManager
    
    PluginManager.registerCommand(pluginName, 'setType', args => {
        EncounterEffect.setType(PluginManager.mppValue(args.type));
    });

    PluginManager.registerCommand(pluginName, 'setCharacter', function(args) {
        const eId = PluginManager.mppValue(args.character);
        EncounterEffect.setCharacter(this.character(eId));
    });

    PluginManager.registerCommand(pluginName, 'setColor', args => {
        const color = args.color.split(',');
        const r = PluginManager.mppValue(color[0]);
        const g = PluginManager.mppValue(color[1]);
        const b = PluginManager.mppValue(color[2]);
        EncounterEffect.setColor(r, g, b);
    });

    PluginManager.mppValue = function(value) {
        const match = /^V\[(\d+)\]$/i.exec(value);
        return match ? $gameVariables.value(+match[1]) : +value;
    };
        
    //-------------------------------------------------------------------------
    // Game_Map

    Game_Map.prototype.getInterpreterCharacter = function(param) {
        const interpreter = this._interpreter;
        return interpreter.isRunning() ? interpreter.character(param) : null;
    };

    //-------------------------------------------------------------------------
    // Graphics_Fragment

    class Graphics_Fragment extends PIXI.Graphics {
        constructor(fragment) {
            super();
            this._fragment = fragment;
            this._blendColor = [0, 0, 0, 0];
            this._break = fragment.isBreak();
            this._flashDuration = 0;
            this.initPivot();
            this.refresh();
            this.update();
        }

        initPivot() {
            const rect = this._fragment.rect();
            const x = rect.x + Math.floor(rect.width / 2);
            const y = rect.y + Math.floor(rect.height / 2);
            this.pivot.set(x, y);
        }

        refreshIfNeeded() {
            if (!this._break && this._fragment.isBreak()) {
                this._break = true;
                this.refresh();
            }
        }

        refresh() {
            this.clear();
            const options = {
                texture: EncounterEffect.snapTexture(),
                matrix: this._fragment.textureMatrix()
            };
            this.beginTextureFill(options);
            this.drawPolygon();
            this.endFill();
            const lw = this._fragment.lineWidth() / 2;
            if (this._break && lw > 0) {
                const c = EncounterEffect.color();
                const color = c[0] * 256 * 256 + c[1] * 256 + c[2];
                this.lineStyle(lw + 0.5, color, 0.25, 0.3);
                this.drawPolygon();
                this.lineStyle(lw, color, 0.5, 0.3);
                this.drawPolygon();
            }
        }

        drawPolygon() {
            for (const [i, point] of this._fragment.points().entries()) {
                i === 0
                    ? this.moveTo(point.x, point.y)
                    : this.lineTo(point.x, point.y);
            }
            this.closePath();
        }
    
        update() {
            this.refreshIfNeeded();
            this.updatePosition();
            this.updateOpacity();
            this.updateFlash();
            this.updateVisibility();
        }
    
        updatePosition() {
            const fragment = this._fragment;
            this.x = fragment.screenX();
            this.y = fragment.screenY();
            this.scale.x = fragment.scaleX();
            this.scale.y = fragment.scaleY();
            this.rotation = fragment.rotation();
        }
    
        updateOpacity() {
            this.alpha = this._fragment.opacity() / 255;
        }
    
        updateFlash() {
            this.setupFlash();
            if (this._flashDuration > 0) {
                const d = this._flashDuration--;
                this._blendColor[3] *= (d - 1) / d;
                if (this._flashDuration % 8 === 0) {
                    this._updateColorFilter();
                }
            }
        }
    
        setupFlash() {
            if (this._fragment.isFlashRequested()) {
                this._flashDuration = 25;
                this._blendColor = this._fragment.flashColor();
                this._fragment.clearFlash();
            }
        }
    
        _createColorFilter() {
            this._colorFilter = new BlendColorFilter();
            this.filters = [this._colorFilter];
        }
        
        _removeColorFilter() {
            this.filters = null;
            this._colorFilter = null;
        }
        
        _updateColorFilter() {
            if (this._colorFilter && this._blendColor[3] === 0) {
                this._removeColorFilter();
                return;
            }
            if (!this._colorFilter) {
                this._createColorFilter();
            }
            this._colorFilter.setColor(this._blendColor);
        }
    
        updateVisibility() {
            this.visible = this._fragment.visible;
        }
    
    }

    //-------------------------------------------------------------------------
    // BlendColorFilter

    class BlendColorFilter extends PIXI.Filter {
        constructor() {
            super(null, BlendColorFilter._fragmentSrc);
            this.uniforms.blendColor = [0, 0, 0, 0];
        }

        static _fragmentSrc = (
            'varying vec2 vTextureCoord;' +
            'uniform sampler2D uSampler;' +
            'uniform vec4 blendColor;' +
            'void main() {' +
            '  vec4 sample = texture2D(uSampler, vTextureCoord);' +
            '  float a = sample.a;' +
            '  vec3 rgb = sample.rgb;' +
            '  float r = rgb.r;' +
            '  float g = rgb.g;' +
            '  float b = rgb.b;' +
            '  float r3 = blendColor.r / 255.0;' +
            '  float g3 = blendColor.g / 255.0;' +
            '  float b3 = blendColor.b / 255.0;' +
            '  float i3 = blendColor.a / 255.0;' +
            '  float i1 = 1.0 - i3;' +
            '  r = clamp(r * i1 + r3 * i3 * a, 0.0, 1.0);' +
            '  g = clamp(g * i1 + g3 * i3 * a, 0.0, 1.0);' +
            '  b = clamp(b * i1 + b3 * i3 * a, 0.0, 1.0);' +
            '  gl_FragColor = vec4(r, g, b, a);' +
            '}'
        );

        setColor(color) {
            if (!(color instanceof Array)) {
                throw new Error('Argument must be an array');
            }
            this.uniforms.blendColor = [...color];
        }
            
    }

    //-------------------------------------------------------------------------
    // Sprite_EncounterEffect
    //
    // スプライトクラスではないですが、
    // RPGツクールのSpriteクラスのような扱いをするという意味でのクラス名です。

    class Sprite_EncounterEffect extends PIXI.Container {
        constructor() {
            super();
            this.createBlackBack();
            this.createFragments();
            this._fadeDelay = 0;
            this._fadeDuration = 0;
            this.initPosition();
            this.updateRotation();
        }

        destroy() {
            const options = { children: true };
            super.destroy(options);
        }

        createBlackBack() {
            const p = 40;
            const width = Graphics.width + p * 2;
            const height = Graphics.height + p * 2;
            this._backGraphics = new PIXI.Graphics();
            this._backGraphics.beginFill(0);
            this._backGraphics.drawRect(-p, -p, width, height);
            this._backGraphics.endFill();
            this.addChild(this._backGraphics);
        }

        createFragments() {
            for (const fragment of EncounterEffect.fragments()) {
                this.addChild(new Graphics_Fragment(fragment));
            }
        }

        initPosition() {
            const { x, y } = EncounterEffect.centerPoint;
            this.x = x;
            this.y = y;
            this.pivot.set(x, y);
        }

        startFadeIn(duration) {
            const rate = 3;
            this._fadeDelay = Math.floor(duration / rate);
            this._fadeDuration = duration - this._fadeDelay;
        }

        update() {
            this.updateChildren();
            this.updateRotation();
            this.updateOpacity();
            this.updateFadeIn();
        }

        updateChildren() {
            for (const child of this.children) {
                if (child.update) {
                    child.update();
                }
            }
        }

        updateRotation() {
            this.rotation = EncounterEffect.rotation();
        }

        updateOpacity() {
            this.alpha = EncounterEffect.opacity() / 255;
        }

        updateFadeIn() {
            if (this._fadeDuration > 0 && this.updateFadeDelay()) {
                const d = this._fadeDuration;
                this._backGraphics.alpha -= this._backGraphics.alpha / d;
                this._fadeDuration--;
            }
        }

        updateFadeDelay() {
            if (this._fadeDelay > 0) {
                this._fadeDelay--;
                return false;
            }
            return true;
        }

        isSpritesetVisible() {
            return this.alpha < 1 || this._backGraphics.alpha < 1;
        }

    }

    //-------------------------------------------------------------------------
    // Sprite_Actor

    const _Sprite_Actor_updateMove = Sprite_Actor.prototype.updateMove;
    Sprite_Actor.prototype.updateMove = function() {
        if (EncounterEffect.isReady()) {
            _Sprite_Actor_updateMove.apply(this, arguments);
        }
    };

    //-------------------------------------------------------------------------
    // Spriteset_Map

    Spriteset_Map.prototype.temporaryHideDestination = function() {
        this._destinationSprite.visible = false;
    };

    //-------------------------------------------------------------------------
    // Scene_Boot

    const _Scene_Boot_create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function() {
        _Scene_Boot_create.apply(this, arguments);
        EncounterEffect.clear();
    };
    
    //-------------------------------------------------------------------------
    // Scene_Base

    Scene_Base.prototype.createEncEffSprite = function() {
        this._encEffSprite = new Sprite_EncounterEffect();
        this.addChild(this._encEffSprite);
    };

    Scene_Base.prototype.destroyEncEffSprite = function() {
        this.removeChild(this._encEffSprite);
        this._encEffSprite.destroy();
        delete this._encEffSprite;
    };

    Scene_Base.prototype.clearFade = function() {
        this._fadeSign = 0;
        this._fadeDuration = 0;
        this._fadeWhite = 0;
        this._fadeOpacity = 0;
        this.updateColorFilter();
    };

    //-------------------------------------------------------------------------
    // Scene_Map

    const _Scene_Map_startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
    Scene_Map.prototype.startEncounterEffect = function() {
        if (EncounterEffect.isValid()) {
            this.snapForBattleBackground();
            this.snapEncounterTexture();
            _Scene_Map_startEncounterEffect.apply(this, arguments);
            this.createEncEffSprite();
            this._spriteset.visible = false;
            return;
        } else if (EncounterEffect.type() < 0) {
            EncounterEffect.clear();
            this.startFadeOut(this.fadeSpeed(), false);
        } else {
            EncounterEffect.clear();
            _Scene_Map_startEncounterEffect.apply(this, arguments);
        }
    };
    
    const _Scene_Map_updateEncounterEffect = Scene_Map.prototype.updateEncounterEffect
    Scene_Map.prototype.updateEncounterEffect = function() {
        if (EncounterEffect.isRunning()) {
            this.updateMppEncounterEffect();
        } else {
            _Scene_Map_updateEncounterEffect.apply(this, arguments);
        }
    };
    
    const _Scene_Map_encounterEffectSpeed = Scene_Map.prototype.encounterEffectSpeed;
    Scene_Map.prototype.encounterEffectSpeed = function() {
        if (EncounterEffect.isRunning()) {
            return EncounterEffect.effectSpeed();
        } else {
            return _Scene_Map_encounterEffectSpeed.apply(this, arguments);
        }
    };

    Scene_Map.prototype.snapEncounterTexture = function() {
        this._windowLayer.visible = false;
        this._spriteset.temporaryHideDestination();
        EncounterEffect.setup(SceneManager.snapTexture());
    };

    Scene_Map.prototype.updateMppEncounterEffect = function() {
        EncounterEffect.update();
        if (this._encounterEffectDuration > 0) {
            this._encounterEffectDuration--;
            const speed = this.encounterEffectSpeed();
            const n = speed - this._encounterEffectDuration;
            const breakEnd = EncounterEffect.breakDuration();
            if (n > 2 && n <= breakEnd + 2) {
                const maxItems = EncounterEffect.maxItems();
                const start = Math.floor(maxItems * (n - 3) / breakEnd);
                const end = Math.floor(maxItems * (n - 2) / breakEnd);
                EncounterEffect.breakFragments(start, end, speed);
            }
            if (n === Math.floor(speed / 4)) {
                BattleManager.playBattleBgm();
            }
        }
    };
    
    //-------------------------------------------------------------------------
    // Scene_Battle

    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.apply(this, arguments);
        this.startEncounterEffect();
    };

    const _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.apply(this, arguments);
        this.updateEncounterEffect();
    };

    Scene_Battle.prototype.startEncounterEffect = function() {
        if (EncounterEffect.isRunning()) {
            this.clearFade();
            EncounterEffect.onBattleStart();
            this.createEncEffSprite();
            this._encEffSprite.startFadeIn(EncounterEffect.fadeSpeed());
        }
    };

    Scene_Battle.prototype.updateEncounterEffect = function() {
        if (EncounterEffect.isRunning()) {
            EncounterEffect.update();
            this._spriteset.visible = this._encEffSprite.isSpritesetVisible();
            if (!EncounterEffect.isRunning()) {
                this.destroyEncEffSprite();
            }
        }
    };

})();
