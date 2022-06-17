/*:ja
 * @target MZ
 * @plugindesc ゲームのテキストデータをすべて抽出します。
 * @author 同人Reviewers
 * 
 * @param saveActors
 * @text Actors.jsonを抽出する
 * @desc アクターを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 *
 * @param saveArmors
 * @text Armors.jsonを抽出する
 * @desc 防具を抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveClasses
 * @text Classes.jsonを抽出する
 * @desc 職業を抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveCommonEvents
 * @text CommonEvents.jsonを抽出する
 * @desc コモンイベントを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveEnemies
 * @text Enemies.jsonを抽出する
 * @desc 敵キャラを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveItems
 * @text Items.jsonを抽出する
 * @desc アイテムを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveMaps
 * @text MapInfos.jsonとMapxxx.jsonを抽出する
 * @desc マップ上のイベントを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveSkills
 * @text Skills.jsonを抽出する
 * @desc スキルを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveStates
 * @text States.jsonを抽出する
 * @desc ステートを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveSystem
 * @text System.jsonを抽出する
 * @desc タイプを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveTroops
 * @text Troops.jsonを抽出する
 * @desc 敵グループを抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @param saveWeapons
 * @text Weapons.jsonを抽出する
 * @desc 武器を抽出するかどうか
 * @type boolean
 * @on する
 * @off しない
 * @default true
 * 
 * @help DRS_AllDataExtractor.js
 * このプラグインをONにした状態でツクール上の「ゲーム」から「テストプレイ」を実行してください。
 * うまく動作すればプロジェクトと同じ場所のdata_outputフォルダ内に抽出したデータを保存します。
 * 
 */
// https://tkool.jp/mz/plugin/javascript/script_reference/eventcode.pdf
// https://tkool.jp/mz/plugin/javascript/script_reference/database.pdf

(() => {
  'use strict';
  let params = PluginManager.parameters("AllDataExtractor");
  let fs   = require('fs');
  let path = require('path');
  let data_dir = path.join(process.cwd(), 'data');
  let output_dir_name = "data_output";
  let output_dir_path = path.join(process.cwd(), output_dir_name);
  let output = "";
  if (!fs.existsSync(output_dir_path)) {
    fs.mkdirSync(output_dir_path);
  }

  /**
   * jsonを読み込んでパース
   * 
   * @param {String} json 変換したい設定ファイルの名前
   * @return {Object} パース済みオブジェクト
   */
  let getJson = json => {
    return JSON.parse(fs.readFileSync(path.join(data_dir, json)));
  };

  /**
   * ファイル出力
   * 
   * @param {String} filename 出力するファイルの名前
   * @param {String} text 出力するテキスト
   */
  let outputer = (filename, text) => {
    fs.writeFileSync(path.join(output_dir_path, filename), text);
  };

  if(JSON.parse(params.saveActors)){
    getJson('Actors.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        + d.nickname+'\r\n'
        + d.profile+'\r\n\r\n'
      }
    });
    outputer('アクター.txt', output);
  }

  if(JSON.parse(params.saveArmors)){
    output = "";
    getJson('Armors.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        +d.description+'\r\n\r\n'
      }
    });
    outputer('防具.txt', output);
  }

  if(JSON.parse(params.saveClasses)){
    output = "";
    getJson('Classes.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        +d.note+'\r\n\r\n'
      }
    });
    outputer('職業.txt', output);
  }

  if(JSON.parse(params.saveCommonEvents)){
    output = "";
    getJson('CommonEvents.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+'\r\n'
        d.list.forEach(l =>{
          if(l.code == 401 || l.code == 402){
            output += l.parameters[0]+'\r\n'
          }else if(l.code == 102){
            l.parameters[0].forEach(select_text =>{
              output += select_text+'\r\n'
            })
          }
        })
        output += '\r\n'
      }
    });
    outputer('コモンイベント.txt', output);
  }

  if(JSON.parse(params.saveEnemies)){
    output = "";
    getJson('Enemies.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        +d.note+'\r\n\r\n'
      }
    });
    outputer('敵キャラ.txt', output);
  }

  if(JSON.parse(params.saveItems)){
    output = "";
    getJson('Items.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        +d.description+'\r\n'
        +d.note+'\r\n\r\n'
      }
    });
    outputer('アイテム.txt', output);
  }

  if(JSON.parse(params.saveMaps)){
    getJson('MapInfos.json').forEach(d => {
      output = "";
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        let map_json = getJson(`Map${d.id.toString().padStart(3, '0')}.json`)
        map_json.events.forEach(event => {
          if(event){
            output += event.id.toString().padStart(3, '0')+" "+event.name+'\r\n'
            event.pages.forEach((page, i) => {
              output += `-${i+1}ページ目`+'\r\n'
              page.list.forEach(l => {
                if(l.code == 401 || l.code == 402){
                  output += l.parameters[0]+'\r\n'
                }else if(l.code == 102){
                  l.parameters[0].forEach(select_text =>{
                    output += select_text+'\r\n'
                  })
                }
              })
              output += '\r\n'
            })
            output += '\r\n'
          }
        })
        outputer(`Map${d.id.toString().padStart(3, '0')}.txt`, output);
      }
    });
  }

  if(JSON.parse(params.saveSkills)){
    output = "";
    getJson('Skills.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        +d.description+'\r\n'
        +d.message1+'\r\n'
        +d.message2+'\r\n'
        +d.note+'\r\n\r\n'
      }
    });
    outputer('スキル.txt', output);
  }

  if(JSON.parse(params.saveStates)){
    output = "";
    getJson('States.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        +d.message1+'\r\n'
        +d.message2+'\r\n'
        +d.message3+'\r\n'
        +d.message4+'\r\n'
        +d.note+'\r\n\r\n'
      }
    });
    outputer('ステート.txt', output);
  }

  if(JSON.parse(params.saveSystem)){
    output = "";
    let system = getJson('System.json')
    if(system){
      output += "・防具タイプ"
      system.armorTypes.forEach((armor, i) => {
        output += i.toString().padStart(3, '0')+" "+armor+'\r\n'
      })
      output += '\r\n'
      output += "・属性"
      system.elements.forEach((element, i) => {
        output += i.toString().padStart(3, '0')+" "+element+'\r\n'
      })
      output += '\r\n'
      output += "・装備タイプ"
      system.equipTypes.forEach((equip, i) => {
        output += i.toString().padStart(3, '0')+" "+equip+'\r\n'
      })
      output += '\r\n'
      output += "・スキルタイプ"
      system.skillTypes.forEach((skill, i) => {
        output += i.toString().padStart(3, '0')+" "+skill+'\r\n'
      })
      output += '\r\n'
      output += "・武器タイプ"
      system.weaponTypes.forEach((weapon, i) => {
        output += i.toString().padStart(3, '0')+" "+weapon+'\r\n'
      })
      output += '\r\n'
    };
    outputer('システム.txt', output);
  }

  if(JSON.parse(params.saveTroops)){
    output = "";
    getJson('Troops.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        d.pages.forEach((page, i) => {
          output += `-${i+1}ページ目`+'\r\n'
          page.list.forEach(l => {
            if(l.code == 401 || l.code == 402){
              output += l.parameters[0]+'\r\n'
            }else if(l.code == 102){
              l.parameters[0].forEach(select_text =>{
                output += select_text+'\r\n'
              })
            }
          })
          output += '\r\n'
        })
      }
    });
    outputer('敵グループ.txt', output);
  }

  if(JSON.parse(params.saveWeapons)){
    output = "";
    getJson('Weapons.json').forEach(d => {
      if(d){
        output += "・ID:"+d.id.toString().padStart(4, '0')+" "+d.name+'\r\n'
        +d.description+'\r\n'
        +d.note+'\r\n\r\n'
      }
    });
    outputer('武器.txt', output);
  }
})();