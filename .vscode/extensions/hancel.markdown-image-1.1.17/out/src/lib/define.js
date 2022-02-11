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
const vscode = require("vscode");
const utils_1 = require("./utils");
const utils_2 = require("./utils");
class Define {
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
                delete require.cache[this.config.DIY.path];
                let define = require(this.config.DIY.path);
                return yield define(filePath, savePath, utils_1.default.getCurrentFilePath());
            }
            catch (e) {
                vscode.window.showInformationMessage(`${utils_2.locale['upload_failed']}${e.message}`);
                return null;
            }
        });
    }
}
exports.default = Define;
//# sourceMappingURL=define.js.map