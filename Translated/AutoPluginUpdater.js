/*:
@target MZ
@plugindesc プラグイン自動更新プラグイン v1.0.0
@author うなぎおおとろ
@url https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/AutoPluginUpdater.js

@help
プラグインが最新であるかどうかを確認し、最新でなければ自動更新を行うプラグインです。

[使用方法]
このプラグインを導入すると、ONになっているプラグインについて、最新のものであるかをチェックして
最新のものでない可能性のファイルがある場合、一覧として表示します。
そして、一覧の中から更新したいプラグインを選択することで、自動更新を行うことができます。

なお、プラグインの更新を行う前には自動でバックアップを取得します。


[更新画面の操作について]
更新画面の操作はすべてマウスで行います。

更新したいプラグインにチェックを入れて「選択したプラグインを更新」をクリックするとプラグインが更新されます。
更新が完了するとタイトル画面に移行しますが、この段階ではファイルの更新結果が反映されないため、F5を押してリロードを行ってください。

「プラグインを更新せずにゲーム開始」をクリックした場合はプラグインを更新せずにタイトル画面に移行します。

なお、更新が必要なプラグインが存在しない場合は、更新画面を表示せずにすぐにタイトル画面に移行します。


[URLの登録]
プラグインのダウンロード先URLは、プラグイン内に記載されているURLから自動で抽出しますが、
手動で設定することもできます。この場合、プラグインパラメータの「PluginUrl」にURLを登録します。
なお、手動で設定したURLは、プラグイン内に記載されているURLよりも優先されます。

プラグインで抽出したURLは、プラグインパラメータ「WriteLog」をtrueにすることで、
ゲーム起動時に「plugin-update-log.txt」というファイルに保存されます。プラグインからのURLの抽出が上手くいかない可能性があるので、
最初にこのファイルを確認して、プラグインのURLが正しいものになっているかを確認してみてください。

[特定のプラグインを更新チェックの対象外にする]
特定のプラグインを更新チェックの対象外にする場合、プラグインパラメータの「DisableUpdatePlugin」に
対象外とするプラグイン名を指定します。


[バックアップについて]
プラグインの更新を行う場合、更新対象のプラグインについて自動でバックアップを取得します。
取得したバックアップは日時ごとに管理され、「backup/バックアップ取得日時」ディレクトリの中に保存されます。


[プラグインのチェックの仕組みについて]
プラグインのチェックについては、次の仕組みで行っています。
・ONになっているプラグインすべてについて、プラグインのソースコードをローカルから読み込む。
・プラグインからURLを抽出し、そのURLからプラグインをダウンロードする。
・ダウンロードしたプラグインとローカルのプラグインが一致しているか確認し、一致していなければ
  更新対象のプラグインとしてリストアップする。


[URLの抽出について]
URLについては、プラグイン内に記載されているURLを抽出します。
このとき、URLがGithubのURLであった場合、Rawに変換を行います。
また、GithubのリポジトリのURLであった場合、リポジトリのURL + プラグインのファイル名からなるURLを
ダウンロード先URLとして扱います。


[タイムスタンプについて]
更新対象のプラグインはタイムスタンプの管理を行い、起動するたびに何度もダウンロードされないようになっています。
タイムスタンプは「plugin-update-timestamp.json」というファイルに保存されます。
タイムスタンプの有効期限は1日で、その間はプラグインのダウンロードを行いません。
もしダウンロードをやり直したい場合は「plugin-update-timestamp.json」を削除してください。
ただし頻繁に削除することはダウンロード先のサーバに負荷を与えることになるため、必要最低限の場合に留めてください。

[ライセンス]
このプラグインは、MITライセンスの条件の下で利用可能です。

@param BackupDirName
@type string
@default backup
@desc
バックアップ先のディレクトリ名を指定します。

@param PluginUrl
@type struct<Url>[]
@desc
手動で登録するプラグインのURLを指定します。

@param DisableUpdatePlugin
@type string[]
@desc
自動更新の対象外にするプラグイン名を指定します。拡張子「.js」は省略してください。

@param WriteLog
@type boolean
@default true
@desc
trueを設定すると、ログをファイルに保存します。

@param LogFileName
@type string
@default plugin-update-log.txt
@desc
ログを保存するファイル名を指定します。

@param TimestampFileName
@type string
@default plugin-update-timestamp.json
@desc
タイムスタンプを保存するファイル名を指定します。
*/

/*~struct~Url:
@param PluginFile
@type string
@desc
URLを手動登録するプラグイン名を指定します。拡張子「.js」は省略してください。

@param Url
@type string
@desc
プラグインのURLを指定します。
*/

(() => {
"use strict";

if (!Utils.isNwjs()) return;

const fs = require("fs");

const pluginName = document.currentScript.src.match(/.+\/(.+)\.js/)[1];
const params = PluginManager.parameters(pluginName);

const BackupDirName = params["BackupDirName"];
const WriteLog = (params["WriteLog"] === "true" ? true : false);
let PluginUrl = [];
if (params["PluginUrl"] !== "") {
    PluginUrl = JSON.parse(params["PluginUrl"]).map(v => JSON.parse(v));
}
let DisableUpdatePlugin = [];
if (params["DisableUpdatePlugin"] !== "") DisableUpdatePlugin = JSON.parse(params["DisableUpdatePlugin"]);

const BackupPath = (() => {
    if (BackupDirName === "") throw new Error("バックアップファイルを保存するBackupDirNameが指定されていません。");
    const date = new Date();
    let datefmt = "YYYY-MM-DD__hh-mm";
    datefmt = datefmt.replace(/YYYY/g, date.getFullYear());
    datefmt = datefmt.replace(/MM/g, date.getMonth() + 1);
    datefmt = datefmt.replace(/DD/g, date.getDate());
    datefmt = datefmt.replace(/hh/g, date.getHours());
    datefmt = datefmt.replace(/mm/g, date.getMinutes());
    return `${BackupDirName}/${datefmt}`;
})();

const LogFileName = params["LogFileName"];
const TimestampFileName = params["TimestampFileName"];

let $logger = null;


class HttpRequest {
    static get(path, responseCallback) {
        const req = new HttpRequest(path, "GET", responseCallback);
        req.send();
        return req;
    }

    static post(path, params, responseCallback) {
        const req = new HttpRequest(path, "POST", responseCallback);
        req.send(params);
        return req;
    }

    constructor(path, method, responseCallback) {
        this._path = path;
        this._method = method;
        this._responseCallback = responseCallback;
    }

    send(params = null) {
        const xhr = new XMLHttpRequest();
        xhr.open(this._method, this._path);
        let json = null;
        if (params) json = JSON.stringify(params);
        xhr.addEventListener("load", (e) => {
            const res = {
                result: "load",
                status: xhr.status,
                response: xhr.response,
                event: e
            };
            this._responseCallback(res);
        });
        xhr.addEventListener("error", (e) => {
            const res = {
                result: "error",
                status: xhr.status,
                response: xhr.response,
                event: e
            };
            this._responseCallback(res);
        });
        xhr.send(json);
    }
}

class PluginUrlGenerator {
    constructor(fileData) {
        this._fileData = fileData;
    }

    generateUrl() {
        const url = this.parseUrl();
        if (url === "") return "";
        if (this.isDirUrl(url)) {
            if (this.isGithubUrl(url)) {
                const rawGithubUrl = this.convertRawGithubUrl(url);
                return `${rawGithubUrl}/${this._fileData.name}.js`;
            } else {
                return `${url}/${this._fileData.name}.js`;
            }
        } else {
            if (this.isGithubUrl(url)) {
                const rawGithubUrl = this.convertRawGithubUrl(url);
                return rawGithubUrl;
            } else {
                return url;
            }
        }
    }

    parseUrl() {
        const text = this._fileData.currentFile();
        const regexpUrl = "\\@url\\s+([^\\s\\r\\n]+)[\\s\\r\\n]";
        const regexp = `\\/\\*\\:.*${regexpUrl}.*\\*\\/`;
        const matchData = text.match(new RegExp(regexp, "s"));
        if (!matchData) return "";
        return matchData[1];
    }

    isDirUrl(url) {
        const matchData = url.match(/.+\/(.+\.js)/);
        if (!matchData) return true;
        return false;
    }

    isGithubUrl(url) {
        const matchData = url.match(/github\.com/);
        if (!matchData) return false;
        return true;
    }

    convertRawGithubUrl(url) {
        return url.replace("github.com", "raw.githubusercontent.com")
                    .replace("/blob/", "/")
                    .replace("/tree/", "/");
    }
}

class PluginFileData {
    get name() { return this._name; }
    get path() { return this._path; }

    constructor(path) {
        this._path = path;
        this._name = this.path2name(path);
        this._currentFile = null;
        this._downloadFile = null;
        this._localLoadStatus = "none";
        this._downloadStatus = "none"
        this._checkResult = "none";
        this._localPluginsPath = `js/plugins/${this.path}.js`;
        this._localBackupPath = `${BackupPath}/${this.name}.js`;
        this._url = null;
        const pluginUrlFindResult = PluginUrl.find((v) => v.PluginFile === this.path);
        if (pluginUrlFindResult) this._url = pluginUrlFindResult.Url;
    }

    path2name(path) {
        const pathAry = path.split("/");
        return pathAry[pathAry.length - 1];
    }

    localLoadStatus() {
        return this._localLoadStatus;
    }

    downloadStatus() {
        return this._downloadStatus;
    }

    checkResult() {
        return this._checkResult;
    }

    currentFile() {
        return this._currentFile;
    }

    url() {
        return this._url;
    }

    loadLocalFile() {
        this._currentFile = fs.readFileSync(this._localPluginsPath).toString();
        this._localLoadStatus = "success";
        $logger.addLocalLoadLog(this._localPluginsPath);
    }

    downloadFile() {
        if (!this._url) this._url = new PluginUrlGenerator(this).generateUrl();
        if (this._url === "") {
            this._downloadStatus = "error";
            return;
        }
        HttpRequest.get(this._url, (res) => {
            $logger.addHttpResponseLog(this._url, res);
            if (res.result === "error" || res.status !== 200) {
                this._downloadStatus = "error";
                return;
            }
            this._downloadFile = res.response;
            this._downloadStatus = "success";
            if (this._currentFile === this._downloadFile) {
                this._checkResult = "new";
            } else {
                this._checkResult = "old";
            }
            $logger.addCheckResultLog(this.path, this._checkResult);
        });
    }

    saveBackupFile() {
        if (this._localLoadStatus === "error") throw new Error(`${this.path} is load error`);
        fs.writeFileSync(this._localBackupPath, this._currentFile);
        $logger.addBackupLog(this._localBackupPath)
    }

    saveDownloadFile() {
        if (this._downloadStatus !== "success") return;
        fs.writeFileSync(this._localPluginsPath, this._downloadFile);
    }
}

class TimestampManager {
    constructor(expirationDate = 60 * 60 * 24 * 1000) {
        this._expirationDate = expirationDate;
        this._timestampFileName = TimestampFileName;
        this._timestamps = this.loadTimestamps();
    }

    loadTimestamps() {
        if (fs.existsSync(this._timestampFileName)) {
            const json = fs.readFileSync(this._timestampFileName).toString();
            return JSON.parse(json);
        } else {
            fs.writeFileSync(this._timestampFileName, "{}");
            return {};
        }
    }

    saveTimestamps() {
        const json = JSON.stringify(this._timestamps);
        fs.writeFileSync(this._timestampFileName, json);
    }

    isNeedCheckUpdate(pluginData) {
        const pluginName = pluginData.path;
        if (this._timestamps[pluginName] == null) this._timestamps[pluginName] = 0;
        const now = new Date().getTime();
        if (now - this._timestamps[pluginName] >= this._expirationDate) {
            return true;
        }
        return false;
    }

    updateTimestamp(pluginData) {
        this._timestamps[pluginData.path] = new Date().getTime();
    }

    cleanTimestamps(pluginDatas) {
        const pathList = pluginDatas.map(pluginData => pluginData.path);
        for (const key in this._timestamps) {
            if (!pathList.includes(key)) {
                delete this._timestamps[key];
            }
        }
    }
}

class PluginUpdater {
    constructor() {
        this._pluginFileDatas = this.createPluginFileDatas();
        this._needCheckUpdatepluginFileDatas = [];
        this._backupDirCreated = false;
        this._updateFileDatas = [];
    }

    createPluginFileDatas() {
        const enabledPlugins = $plugins.filter((plugin => plugin.status && !DisableUpdatePlugin.includes(plugin.name)));
        return enabledPlugins.map(plugin => new PluginFileData(plugin.name));
    }

    checkTimestamp() {
        const timestampManager = new TimestampManager();
        this._needCheckUpdatepluginFileDatas = this._pluginFileDatas.filter(fileData => {
            return timestampManager.isNeedCheckUpdate(fileData);
        });
        for (const fileData of this._needCheckUpdatepluginFileDatas) {
            timestampManager.updateTimestamp(fileData);
        }
        timestampManager.cleanTimestamps(this._pluginFileDatas);
        timestampManager.saveTimestamps();
    }

    localLoad() {
        for (const fileData of this._needCheckUpdatepluginFileDatas) {
            fileData.loadLocalFile();
        }
    }

    isLocalLoadEnd() {
        for (const fileData of this._needCheckUpdatepluginFileDatas) {
            if (fileData.localLoadStatus() !== "success") return false;
        }
        return true;
    }

    download() {
        for (const fileData of this._needCheckUpdatepluginFileDatas) {
            fileData.downloadFile();
        }
    }

    isDownloadEnd() {
        for (const fileData of this._needCheckUpdatepluginFileDatas) {
            if (fileData.downloadStatus() === "none") return false;
        }
        return true;
    }

    allOldFileDatas() {
        return this._needCheckUpdatepluginFileDatas.filter(fileData => {
            return fileData.downloadStatus() === "success" && fileData.checkResult() === "old";
        });
    }

    setUpdateFileDatas(fileDatas) {
        this._updateFileDatas = fileDatas;
    }

    saveBackupFiles() {
        this.makeBackupDir();
        for (const fileData of this._updateFileDatas) {
            fileData.saveBackupFile();
        }
    }

    makeBackupDir() {
        if (this._updateFileDatas.length === 0) return;
        try {
            fs.mkdirSync(BackupDirName);
        } catch(e) {
            if (!e.message.match(/EEXIST\:/)) throw e;
        }
        try {
            fs.mkdirSync(BackupPath);
        } catch(e) {
            if (!e.message.match(/EEXIST\:/)) throw e;
        }
    }

    saveDownloadFiles() {
        for (const fileData of this._updateFileDatas) {
            fileData.saveDownloadFile();
        }
    }
}

class Logger {
    constructor() {
        this._log = [];
    }

    addLocalLoadLog(localPath) {
        this._log.push(`LOCAL LOAD: path=${localPath}`);
    }

    addHttpResponseLog(url, res) {
        this._log.push(`HTTP REQUEST: url=${url}  status=${res.status}`);
    }

    addCheckResultLog(pluginName, result) {
        const resultMessage = (result === "new" ? "match" : "mismatch");
        this._log.push(`CHECK RESULT: ${pluginName} is ${resultMessage}`);
    }

    addBackupLog(backupPath) {
        this._log.push(`BACKUP: path=${backupPath}`);
    }

    toString() {
        return this._log.join("\n");
    }

    writeLog(fileName) {
        fs.writeFileSync(fileName, this.toString());
    }
}

class Scene_AutoPluginUpdater extends Scene_Base {
    create() {
        super.create();
        $logger = new Logger();
        this.createWindowLayer();
        this.createInfoMessage();
        this.createPluginListWindow();
        this.createAllSelectCommandWindow();
        this.createUpdateButton();
        this.createUpdateYesOrNoWindow();
        this._phase = "checkTimestamp";
        this._pluginUpdater = new PluginUpdater();
    }

    isReady() {
        switch(this._phase) {
        case "checkTimestamp":
            this._pluginUpdater.checkTimestamp();
            this._phase = "localLoad";
            break;
        case "localLoad":
            this._pluginUpdater.localLoad();
            this._phase = "localLoading";
            break;
        case "localLoading":
            if (this._pluginUpdater.isLocalLoadEnd()) this._phase = "download";
            break;
        case "download":
            this._pluginUpdater.download();
            this._phase = "downloading";
            break;
        case "downloading":
            if (this._pluginUpdater.isDownloadEnd()) this._phase = "downloaded";
            break;
        }
        if (this._phase === "downloaded") return true;
        return false;
    }

    start() {
        super.start();
        const pluginList = this._pluginUpdater.allOldFileDatas();
        if (pluginList.length === 0) {
            this._phase = "title";
        } else {
            this._windowInfoMessage.show();
            this._windowPluginList.show();
            this._windowAllSelectCommand.show();
            this._windowUpdateButton.show();
            this._windowPluginList.setPluginList(pluginList);
            this._windowPluginList.activate();
        }
    }

    createInfoMessage() {
        this._windowInfoMessage = new Window_InfoMessage(this.infoMessageRect());
        this._windowInfoMessage.hide();
        this.addWindow(this._windowInfoMessage);
    }

    createPluginListWindow() {
        this._windowPluginList = new Window_PluginList(this.pluginListWindowRect());
        this._windowPluginList.setHandler("ok", this.onPluginListOk.bind(this));
        this._windowPluginList.deactivate();
        this._windowPluginList.hide();
        this.addWindow(this._windowPluginList);
    }

    createAllSelectCommandWindow() {
        this._windowAllSelectCommand = new Window_AllSelectCommand(this.allSelectCommandWindowRect());
        this._windowAllSelectCommand.setHandler("allSelect", this.pluginListAllSelect.bind(this));
        this._windowAllSelectCommand.setHandler("allDeselect", this.pluginListAllDeselect.bind(this));
        this._windowAllSelectCommand.deactivate();
        this._windowAllSelectCommand.hide();
        this.addWindow(this._windowAllSelectCommand);
    }

    createUpdateYesOrNoWindow() {
        this._windowUpdateYesOrNo = new Window_UpdateYesOrNo(this.updateYesOrNoWindowRect());
        this._windowUpdateYesOrNo.setHandler("yes", this.updateOk.bind(this));
        this._windowUpdateYesOrNo.setHandler("no", this.updateCancel.bind(this));
        this._windowUpdateYesOrNo.setHandler("cancel", this.updateCancel.bind(this));
        this._windowUpdateYesOrNo.deactivate();
        this._windowUpdateYesOrNo.hide();
        this._windowUpdateYesOrNo.close();
        this.addWindow(this._windowUpdateYesOrNo);
    }

    updateOk() {
        this.updateYesOrNoWindowEndActive();
    }

    updateCancel() {
        this.updateYesOrNoWindowEndActive();
    }

    createUpdateButton() {
        this._windowUpdateButton = new Window_UpdateButton(this.updateButtonRect());
        this._windowUpdateButton.setHandler("updatePlugin", this.updatePlugin.bind(this));
        this._windowUpdateButton.setHandler("gameStart", this.gameStart.bind(this));
        this._windowUpdateButton.deactivate();
        this._windowUpdateButton.hide();
        this.addWindow(this._windowUpdateButton);
    }

    infoMessageRect() {
        const x = 30;
        const y = 30;
        const w = Graphics.boxWidth - x * 2;
        const h = 60;
        return new Rectangle(x, y, w, h);
    }

    pluginListWindowRect() {
        const infoMessageRect = this.infoMessageRect();
        const x = infoMessageRect.x;
        const y = infoMessageRect.y + infoMessageRect.height;
        const w = infoMessageRect.width;
        const h = Graphics.boxHeight - y - 210;
        return new Rectangle(x, y, w, h);
    }

    allSelectCommandWindowRect() {
        const pluginListWindowRect = this.pluginListWindowRect();
        const x = pluginListWindowRect.x;
        const y = pluginListWindowRect.y + pluginListWindowRect.height;
        const w = pluginListWindowRect.width;
        const h = 70;
        return new Rectangle(x, y, w, h);
    }

    updateButtonRect() {
        const allSelectCommandWindowRect = this.allSelectCommandWindowRect();
        const x = allSelectCommandWindowRect.x;
        const y = allSelectCommandWindowRect.y + allSelectCommandWindowRect.height;
        const w = allSelectCommandWindowRect.width;
        const h = 120;
        return new Rectangle(x, y, w, h);
    }

    updateYesOrNoWindowRect() {
        const w = 640;
        const h = 120;
        const x = Graphics.boxWidth / 2 - w / 2;
        const y = Graphics.boxHeight / 2 - h / 2;
        return new Rectangle(x, y, w, h);
    }

    update() {
        super.update();
        this.updateWindowActivate();
        switch(this._phase) {
        case "backup":
            this._pluginUpdater.setUpdateFileDatas(this._windowPluginList.targetPluginList());
            this._pluginUpdater.saveBackupFiles();
            this._phase = "update";
        case "update":
            this._pluginUpdater.saveDownloadFiles();
            this._phase = "title";
        case "title":
            if (WriteLog) $logger.writeLog(LogFileName);
            SceneManager.goto(Scene_Title);
            break;
        }
    }

    onPluginListOk() {
        this._windowPluginList.click();
        this._windowPluginList.activate();
    }

    updateWindowActivate() {
        if (this._windowPluginList.isMouseOver()) {
            this.allSelectCommandWindowEndActive();
            this.updateButtonWindowEndActive();
            this._windowPluginList.activate();
        } else if (this._windowAllSelectCommand.isMouseOver()) {
            this.pluginListWindowEndActive();
            this.updateButtonWindowEndActive();
            this._windowAllSelectCommand.activate();
        } else if (this._windowUpdateButton.isMouseOver()) {
            this.allSelectCommandWindowEndActive();
            this.pluginListWindowEndActive();
            this._windowUpdateButton.activate();
        }
    }

    pluginListWindowEndActive() {
        this._windowPluginList.deactivate();
        this._windowPluginList.select(-1);
        this._windowPluginList.refresh();
    }

    allSelectCommandWindowEndActive() {
        this._windowAllSelectCommand.deactivate();
        this._windowAllSelectCommand.select(-1);
        this._windowAllSelectCommand.refresh();
    }

    updateButtonWindowEndActive() {
        this._windowUpdateButton.deactivate();
        this._windowUpdateButton.select(-1);
        this._windowUpdateButton.refresh();
    }

    pluginListAllSelect() {
        this._windowPluginList.allSelect();
        this._windowPluginList.refresh();
    }

    pluginListAllDeselect() {
        this._windowPluginList.allDeselect();
        this._windowPluginList.refresh();
    }

    updatePlugin() {
        this._windowPluginList.setEnabledMouseOver(false);
        this._windowAllSelectCommand.setEnabledMouseOver(false);
        this._windowUpdateButton.setEnabledMouseOver(false);
        this.allSelectCommandWindowEndActive();
        this.pluginListWindowEndActive();
        this.updateButtonWindowEndActive();
        this._windowUpdateYesOrNo.show();
        this._windowUpdateYesOrNo.open();
        this._windowUpdateYesOrNo.activate();
    }

    updateOk() {
        this.updateYesOrNoWindowEndActive();
        this._phase = "backup";
    }

    updateCancel() {
        this.updateYesOrNoWindowEndActive();
    }

    gameStart() {
        this._phase = "title";
    }

    updateYesOrNoWindowEndActive() {
        this._windowPluginList.setEnabledMouseOver(true);
        this._windowAllSelectCommand.setEnabledMouseOver(true);
        this._windowUpdateButton.setEnabledMouseOver(true);
        this._windowUpdateYesOrNo.hide();
        this._windowUpdateYesOrNo.close();
        this._windowUpdateYesOrNo.deactivate();
        this._windowUpdateYesOrNo.refresh();
    }

    writeLog(fileName) {
        fs.writeFileSync(fileName, $logger.toString());
    }
}

class Window_InfoMessage extends Window_Base {
    initialize(rect) {
        super.initialize(rect);
        this.refresh();
    }

    refresh() {
        if (this.contents) {
            this.contents.clear();
            this.draw();
        }
    }

    draw() {
        const text = "次のプラグインは配布先のものと内容が異なっています。";
        this.drawText(text, 0, 0, this.width - this.padding * 2);
    }
}

class Window_PluginList extends Window_Selectable {
    initialize(rect) {
        super.initialize(rect);
        this._mouseOver = false;
        this._enabledMouseOver = true;
        this._pluginList = [];
        this._clickedList = new Array(this._pluginList.length).map(() => false);
    }

    targetPluginList() {
        const list = [];
        for (let i = 0; i < this._pluginList.length; i++) {
            if (this._clickedList[i]) list.push(this._pluginList[i]);
        }
        return list;
    }

    setPluginList(pluginList) {
        this._pluginList = pluginList;
        this.refresh();
    }

    maxItems() {
        return this._pluginList.length;
    }

    drawItem(index) {
        const rect = this.itemLineRect(index);
        const text = this._pluginList[index].path;
        if (this._clickedList[index]) {
            this.drawText("■", rect.x, rect.y, 30);
        } else {
            this.drawText("□", rect.x, rect.y, 30);
        }
        this.drawText(text, rect.x + 30, rect.y, rect.width);
    }

    update() {
        super.update();
        if (this._enabledMouseOver) this.updateMouseOver();
    }

    enabledMouseOver() {
        return this._enabledMouseOver;
    }

    setEnabledMouseOver(enabledMouseOver) {
        this._enabledMouseOver = enabledMouseOver;
    }

    updateMouseOver() {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        const cx = localPos.x;
        const cy = localPos.y;
        if (0 <= cx && cx < this.width && 0 <= cy && cy < this.height) {
            this._mouseOver = true;
        } else {
            this._mouseOver = false;
        }
    }

    isMouseOver() {
        if (!this._enabledMouseOver) return false;
        return this._mouseOver;
    }

    click() {
        this._clickedList[this.index()] = !this._clickedList[this.index()];
        this.refresh();
    }

    allSelect() {
        for (let i = 0; i < this.maxItems(); i++) {
            this._clickedList[i] = true;
        }
    }

    allDeselect() {
        for (let i = 0; i < this.maxItems(); i++) {
            this._clickedList[i] = false;
        }
    }
}

class Window_AllSelectCommand extends Window_HorzCommand {
    initialize(rect) {
        super.initialize(rect);
        this.select(-1);
        this._mouseOver = false;
        this._enabledMouseOver = true;
    }

    makeCommandList() {
        this.addCommand("すべて選択", "allSelect");
        this.addCommand("すべて解除", "allDeselect");
    }

    maxCols() {
        return 2;
    }

    update() {
        super.update();
        if (this._enabledMouseOver) this.updateMouseOver();
    }

    enabledMouseOver() {
        return this._enabledMouseOver;
    }

    setEnabledMouseOver(enabledMouseOver) {
        this._enabledMouseOver = enabledMouseOver;
    }

    updateMouseOver() {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        const cx = localPos.x;
        const cy = localPos.y;
        if (0 <= cx && cx < this.width && 0 <= cy && cy < this.height) {
            this._mouseOver = true;
        } else {
            this._mouseOver = false;
        }
    }

    isMouseOver() {
        if (!this._enabledMouseOver) return false;
        return this._mouseOver;
    }
}

class Window_UpdateButton extends Window_Command {
    initialize(rect) {
        super.initialize(rect);
        this.select(-1);
        this._mouseOver = false;
        this._enabledMouseOver = true;
    }

    makeCommandList() {
        this.addCommand("選択したプラグインを更新", "updatePlugin");
        this.addCommand("プラグインを更新せずにゲーム開始", "gameStart");
    }

    update() {
        super.update();
        if (this._enabledMouseOver) this.updateMouseOver();
    }

    enabledMouseOver() {
        return this._enabledMouseOver;
    }

    setEnabledMouseOver(enabledMouseOver) {
        this._enabledMouseOver = enabledMouseOver;
    }

    updateMouseOver() {
        const touchPos = new Point(TouchInput.x, TouchInput.y);
        const localPos = this.worldTransform.applyInverse(touchPos);
        const cx = localPos.x;
        const cy = localPos.y;
        if (0 <= cx && cx < this.width && 0 <= cy && cy < this.height) {
            this._mouseOver = true;
        } else {
            this._mouseOver = false;
        }
    }

    isMouseOver() {
        if (!this._enabledMouseOver) return false;
        return this._mouseOver;
    }
}

class Window_UpdateYesOrNo extends Window_HorzCommand {
    makeCommandList() {
        this.addCommand("はい", "yes");
        this.addCommand("いいえ", "no");
    }

    maxCols() {
        return 2;
    }

    itemRect(index) {
        const rect = super.itemRect(index);
        rect.y += 48;
        return rect;
    }

    refresh() {
        super.refresh();
        const text = "選択したプラグインを更新します。よろしいですか？";
        this.drawText(text, 0, 0, this.width - this.padding * 2, "left");
    }
}


// Go to Scene_AutoPluginUpdater.
Scene_Boot.prototype.startNormalGame = function() {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    if (Utils.isOptionValid("test")) {
        SceneManager.goto(Scene_AutoPluginUpdater);
    } else {
        SceneManager.goto(Scene_Title);
    }
    Window_TitleCommand.initCommandPosition();
};
})();
