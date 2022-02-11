"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const utils_2 = require("./utils");
class Local {
    constructor(config) {
        this.config = config;
    }
    reconfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
        });
    }
    upload(filePath, savePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!utils_1.default.getCurrentRoot()) {
                    vscode.window.showInformationMessage(utils_2.locale['open_with_folder']);
                    return null;
                }
                let saveFolder = this.config.local.path.startsWith('/') ?
                    path.join(utils_1.default.getCurrentRoot(), this.config.local.path) :
                    path.join(path.dirname(utils_1.default.getCurrentFilePath()), this.config.local.path);
                console.debug(`Create Project Upload Folder.`);
                savePath = path.join(saveFolder, savePath);
                saveFolder = path.dirname(savePath);
                if (!fs.existsSync(saveFolder)) {
                    utils_1.default.mkdirs(saveFolder);
                }
                if (fs.existsSync(savePath) &&
                    (yield utils_1.default.confirm(utils_2.locale['replace_or_no'], [utils_2.locale['Yes'], utils_2.locale['No']])) === utils_2.locale['No']) {
                    return savePath;
                }
                fs.copyFileSync(filePath, savePath);
                if (this.config.local.referencePath === '')
                    return path.relative(path.dirname(utils_1.default.getCurrentFilePath()), savePath).replace(/\\/g, '/');
                return path.join(yield utils_1.default.formatName(this.config.local.referencePath, savePath, false), path.basename(savePath)).replace(/\\/g, '/');
            }
            catch (e) {
                vscode.window.showInformationMessage(`${utils_2.locale['save_failed']}${e.message}`);
                return null;
            }
        });
    }
}
exports.default = Local;
//# sourceMappingURL=local.js.map