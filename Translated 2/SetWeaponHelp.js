/*:
 * @target MZ
 * @plugindesc 武器防具説明文補助用プラグイン
 * @author さすらいのトム
 * @help 
 * 武器防具説明文補助用の特殊文字を定義するプラグインです。
 * 武器の説明欄に\WEAPONHELP[2]と書けば
 * 武器ID2番のパラメータ増減値説明に置き換わります。
 * 防具の説明欄に\ARMORHELP[2]と書けば
 * 防具ID2番のパラメータ増減値説明に置き換わります。
 * また、パラメータから特殊文字のフォントサイズや文字色、
 * 追加パラメータの表示非表示を指定できます。
 * 
 * 更に、メモ欄に下記タグを指定することで、説明文の内容を
 * ある程度自由に追加することが出来ます。
 * 
 * <ExtraText:追加したい文字列>
 * <ExtraText2:追加したい文字列2>
 * <ExtraText3:追加したい文字列3>
 * 
 * 
 *  利用規約 
 *  クレジットの表記等は特に必要ありません
 *  ただししていただけると作者が悦びます
 *  二次配布や無断転載等につきましても特に規制は設けません
 *  また、このプラグインを導入し発生したいかなる問題につきましては
 *  当方では責任を負いかねます。
 * 
 * @param WeaponFontSize
 * @desc 武器説明のフォントサイズを指定します。
 * @default 28
 * @type Number
 * 
 * @param ArmorFontSize
 * @desc 防具説明のフォントサイズを指定します。
 * @default 28
 * @type Number
 * 
 * @param WeaponTextColor
 * @desc 武器説明のテキストカラーを指定します。
 * @default 2
 * @type Number
 * 
 * @param ArmorTextColor
 * @desc 防具説明のテキストカラーを指定します。
 * @default 2
 * @type Number
 * 
 * @param displayhit
 * @desc 命中率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displayavd
 * @desc 回避率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displaycri
 * @desc 会心率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displaycav
 * @desc 会心回避率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displaymav
 * @desc 魔法回避率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displaymrf
 * @desc 魔法反射率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displaycnt
 * @desc 反撃率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displayhrg
 * @desc HP再生率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displaymrg
 * @desc MP再生率を表示します。
 * @default false
 * @type boolean
 * 
 * @param displaytrg
 * @desc TP再生率を表示します。
 * @default false
 * @type boolean
 * 
 */

(function() {
    'use strict';
    
    var parameters                 = PluginManager.parameters('SetWeaponHelp');
    var WeaponFontSize             = Number(parameters['WeaponFontSize']);
    var ArmorFontSize              = Number(parameters['ArmorFontSize']);
    var WeaponTextColor            = Number(parameters['WeaponTextColor']);
    var ArmorTextColor             = Number(parameters['ArmorTextColor']);
    var displayhit                 = parameters['displayhit'];
    var displayavd                 = parameters['displayavd'];
    var displaycri                 = parameters['displaycri'];
    var displaycav                 = parameters['displaycav'];
    var displaymav                 = parameters['displaymav'];
    var displaymrf                 = parameters['displaymrf'];
    var displaycnt                 = parameters['displaycnt'];
    var displayhrg                 = parameters['displayhrg'];
    var displaymrg                 = parameters['displaymrg'];
    var displaytrg                 = parameters['displaytrg'];

    const Window_Base_prototype_convertEscapeCharacters = Window_Base.prototype.processEscapeCharacter;
    Window_Base.prototype.processEscapeCharacter = function(code, textState) {
        switch (code) {
            case 'WEAPONHELP':
                let weaponID  = this.obtainEscapeParam(textState);
                this.createWeaponhelp(textState,weaponID);
                break;
            case 'ARMORHELP':
                let armorID  = this.obtainEscapeParam(textState);
                this.createArmorhelp(textState,armorID);
                break;
            default:
                Window_Base_prototype_convertEscapeCharacters.call(this, code, textState);
            break;
        }
    };

    Window_Base.prototype.createWeaponhelp = function(textState,weaponID) {
        let weapon = $dataWeapons[weaponID];
        if (!$dataWeapons.contains(weapon)) {
            return;
        };

        this.contents.fontSize = WeaponFontSize;
        this.changeTextColor(ColorManager.textColor(WeaponTextColor));
        this.drawSkillText('(', textState);
        this.drawWeaponParams(weapon,textState);
        this.drawTraitParams(weapon,textState);
        this.drawWeaponExtraText(weapon,textState);
        this.drawWeaponExtraText2(weapon,textState);
        this.drawWeaponExtraText3(weapon,textState);
        this.drawSkillText(')', textState);
        this.changeTextColor(ColorManager.textColor(0));
        this.contents.fontSize = 28;
    }

    Window_Base.prototype.createArmorhelp = function(textState,armorID) {
        let armor = $dataArmors[armorID];
        if (!$dataArmors.contains(armor)) {
            return;
        }

        this.contents.fontSize = ArmorFontSize;
        this.changeTextColor(ColorManager.textColor(ArmorTextColor));
        this.drawSkillText('(', textState);
        this.drawWeaponParams(armor,textState);
        this.drawTraitParams(armor,textState);
        this.drawWeaponExtraText(armor,textState);
        this.drawWeaponExtraText2(armor,textState);
        this.drawWeaponExtraText3(armor,textState);
        this.drawSkillText(')', textState);
        this.changeTextColor(ColorManager.textColor(0));
        
        this.contents.fontSize = 28;
    }


    Window_Base.prototype.drawWeaponParams = function(weapon,textState) {
        this._secondFlg = false;
        if (!weapon.params || weapon.params.length < 8) {return;}
        for (var i = 0; i < weapon.params.length; i++) {
            if (!weapon.params[i] || weapon.params[i] === 0) {
                continue;
            }
            this.checkSecond(textState);
            var a = this.getParamLogicalNames(i);
            this.drawSkillText(a,textState);
            if (Number(weapon.params[i] > 0)) {
                this.drawSkillText("+", textState);                             
            }
            this.drawSkillText(weapon.params[i], textState);             
        }

    };

    Window_Base.prototype.getParamLogicalNames = function(paramID) {
        let value = ''

        switch (paramID) {
            case 0:
               value = '最大HP'
               break;
            case 1:
               value = '最大MP'
               break;
            case 2:
               value = '攻'
               break;
            case 3:
               value = '防'
               break;
            case 4:
               value = '魔力'
               break;
            case 5:
               value = '魔防'
               break;
            case 6:
               value = '敏捷'
               break;
            case 7:
               value = '運'
               break;		
        };
        return value;
    };

    Window_Base.prototype.drawTraitParams = function(weapon,textState) {
        
        if (!weapon.traits || weapon.traits.length < 1) {return;}
        for (var i = 0; i < weapon.traits.length;  i++) {
            if (weapon.traits[i].code == 22) {
                if (weapon.traits[i].dataId == 0 && weapon.traits[i].value != 0 && displayhit == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("命中", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
                if (weapon.traits[i].dataId == 1 && weapon.traits[i].value != 0 && displayavd == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("回避", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
                if (weapon.traits[i].dataId == 2 && weapon.traits[i].value != 0 && displaycri == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("会心", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
                if (weapon.traits[i].dataId == 3 && weapon.traits[i].value != 0 && displaycav == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("会心回避", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
                if (weapon.traits[i].dataId == 4 && weapon.traits[i].value != 0 && displaymav == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("魔法回避", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
                if (weapon.traits[i].dataId == 5 && weapon.traits[i].value != 0 && displaymrf == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("魔法反射", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
                if (weapon.traits[i].dataId == 6 && weapon.traits[i].value != 0 && displaycnt == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("反撃", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
                if (weapon.traits[i].dataId == 7 && weapon.traits[i].value != 0 && displayhrg == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("HP再生", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }

                if (weapon.traits[i].dataId == 8 && weapon.traits[i].value != 0 && displaymrg == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("MP再生", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }

                if (weapon.traits[i].dataId == 9 && weapon.traits[i].value != 0 && displaytrg == 'true') {
                    this.checkSecond(textState);
                    this.drawSkillText("TP再生", textState);
                    let avd =  Math.floor(weapon.traits[i].value * 100);
                    if (avd > 0) {
                        this.drawSkillText("+", textState);
                    }
                    this.drawSkillText(avd + '%', textState);
                }
            }
        }         
        
    };

    Window_Base.prototype.checkSecond = function(textState) {
        if (!this._secondFlg) {
            this._secondFlg = true;
        } else {
            this.drawSkillText("/", textState);  
        }
    }

    Window_Base.prototype.drawWeaponExtraText = function(weapon,textState) {
        if (!weapon || !weapon.meta) {
            return;
        }
        if (!weapon.meta.ExtraText) {
            return;
        }
        let ExtraText = weapon.meta.ExtraText;
        this.drawSkillText('/', textState);
        this.drawSkillText(ExtraText, textState);
    };

    Window_Base.prototype.drawWeaponExtraText2 = function(weapon,textState) {
        if (!weapon || !weapon.meta) {
            return;
        }
        if (!weapon.meta.ExtraText2) {
            return;
        }
        let ExtraText = weapon.meta.ExtraText2;
        this.drawSkillText('/', textState);
        this.drawSkillText(ExtraText, textState);
    };

    Window_Base.prototype.drawWeaponExtraText3 = function(weapon,textState) {
        if (!weapon || !weapon.meta) {
            return;
        }
        if (!weapon.meta.ExtraText3) {
            return;
        }
        let ExtraText = weapon.meta.ExtraText3;
        this.drawSkillText('/', textState);
        this.drawSkillText(ExtraText, textState);
    };

    Window_Base.prototype.drawSkillText = function(text, textState) {
        this.drawText(text, textState.x, textState.y);
        textState.x += this.textWidth(text) + 2;
    }

})();