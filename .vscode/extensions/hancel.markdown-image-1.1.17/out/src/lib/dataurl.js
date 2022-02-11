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
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const utils_1 = require("./utils");
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
                return 'data:image/' + path.extname(filePath).substr(1) + ';base64,' + Buffer.from(fs.readFileSync(filePath)).toString('base64');
            }
            catch (e) {
                vscode.window.showInformationMessage(`${utils_1.locale['save_failed']}${e.message}`);
                return null;
            }
        });
    }
}
exports.default = Local;
//# sourceMappingURL=dataurl.js.map