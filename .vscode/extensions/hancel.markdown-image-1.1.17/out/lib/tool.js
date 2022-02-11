"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const child_process_1 = require("child_process");
const os_1 = require("os");
const fs = require("fs");
const path = require("path");
const packages = require("../../package.json");
let pkg = packages;
function showProgress(message) {
    let show = true;
    function stopProgress() {
        show = false;
    }
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        title: message,
        cancellable: false
    }, (progress, token) => {
        return new Promise(resolve => {
            let timer = setInterval(() => {
                if (show) {
                    return;
                }
                clearInterval(timer);
                resolve();
            }, 100);
        });
    });
    return stopProgress;
}
function editorEdit(selection, text) {
    return new Promise((resolve, reject) => {
        var _a;
        (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.edit(editBuilder => {
            if (selection) {
                editBuilder.replace(selection, text);
            }
        }).then(resolve);
    });
}
function getSelections() {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null; // No open text editor
    }
    let selections = editor.selections;
    return selections;
}
function getConfig() {
    let keys = Object.keys(pkg.contributes.configuration.properties);
    let values = {};
    function toVal(str, val, cfg) {
        let keys = str.split('.');
        if (keys.length === 1) {
            cfg[keys[0]] = val;
        }
        else {
            cfg[keys[0]] = toVal(keys.slice(1).join('.'), val, cfg[keys[0]] || {});
        }
        return cfg;
    }
    keys.forEach(k => toVal(k.split('.').slice(1).join('.'), vscode.workspace.getConfiguration().get(k), values));
    return values;
}
function getPasteImage(imagePath) {
    return new Promise((resolve, reject) => {
        if (!imagePath) {
            return;
        }
        let platform = process.platform;
        if (platform === 'win32') {
            // Windows
            const scriptPath = path.join(__dirname, '..', '..', 'asserts/pc.ps1');
            let command = "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe";
            let powershellExisted = fs.existsSync(command);
            let output = '';
            if (!powershellExisted) {
                command = "powershell";
            }
            const powershell = child_process_1.spawn(command, [
                '-noprofile',
                '-noninteractive',
                '-nologo',
                '-sta',
                '-executionpolicy', 'unrestricted',
                '-windowstyle', 'hidden',
                '-file', scriptPath,
                imagePath
            ]);
            powershell.on('error', (e) => {
                if (e.code === 'ENOENT') {
                    vscode.window.showErrorMessage(`The powershell command is not in you PATH environment variables. Please add it and retry.`);
                }
                else {
                    vscode.window.showErrorMessage(e);
                }
            });
            powershell.on('exit', function (code, signal) {
                // console.debug('exit', code, signal);
            });
            powershell.stdout.on('data', (data) => {
                if (data.toString().indexOf('Active code page:') < 0) {
                    output += data.toString();
                }
            });
            powershell.on('close', (code) => {
                resolve(output.trim().split('\n').map(i => i.trim()));
            });
        }
        else if (platform === 'darwin') {
            // Mac
            let scriptPath = path.join(__dirname, '..', '..', 'asserts/mac.applescript');
            let ascript = child_process_1.spawn('osascript', [scriptPath, imagePath]);
            ascript.on('error', (e) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                // console.debug('exit', code, signal);
            });
            ascript.stdout.on('data', (data) => {
                resolve(data.toString().trim().split('\n'));
            });
        }
        else {
            // Linux 
            let scriptPath = path.join(__dirname, '..', '..', 'asserts/linux.sh');
            let ascript = child_process_1.spawn('sh', [scriptPath, imagePath]);
            ascript.on('error', (e) => {
                vscode.window.showErrorMessage(e);
            });
            ascript.on('exit', (code, signal) => {
                // console.log('exit',code,signal);
            });
            ascript.stdout.on('data', (data) => {
                let result = data.toString().trim();
                if (result === "no xclip") {
                    vscode.window.showInformationMessage('You need to install xclip command first.');
                    return;
                }
                let match = result.trim().match(/((\/[^\/]+)+\/[^\/]*?\.(jpg|jpeg|gif|bmp|png))/g);
                resolve(match || []);
            });
        }
    });
}
function getCurrentRoot() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) {
        return '';
    }
    const resource = editor.document.uri;
    if (resource.scheme !== 'file') {
        return '';
    }
    const folder = vscode.workspace.getWorkspaceFolder(resource);
    if (!folder) {
        return '';
    }
    return folder.uri.fsPath;
}
function getCurrentFilePath() {
    const editor = vscode.window.activeTextEditor;
    if (!editor || !vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length < 1) {
        return '';
    }
    return editor.document.uri.fsPath;
}
function getTmpFolder() {
    let savePath = path.join(os_1.tmpdir(), pkg.name);
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath);
    }
    return savePath;
}
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function confirm(message, options) {
    return new Promise((resolve, reject) => {
        return vscode.window.showInformationMessage(message, ...options).then(resolve);
    });
}
function prompt(message, defaultVal = '') {
    return new Promise((resolve, reject) => {
        return vscode.window.showInputBox({
            value: defaultVal,
            prompt: message
        }).then(resolve);
    });
}
exports.default = {
    showProgress,
    editorEdit,
    getConfig,
    getSelections,
    getPasteImage,
    getCurrentRoot,
    getCurrentFilePath,
    getTmpFolder,
    sleep,
    confirm,
    prompt
};
//# sourceMappingURL=tool.js.map