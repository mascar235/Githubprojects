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
const got_1 = require("got");
const formData = require("form-data");
const fs = require("fs");
const utils_1 = require("./utils");
class Imgur {
    constructor(config) {
        this.config = config;
    }
    getSavePath(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            return filePath;
        });
    }
    reconfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
        });
    }
    upload(filePath, savePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const form = new formData();
                form.append('smfile', fs.createReadStream(filePath));
                if (!this.config.sm_ms.token) {
                    vscode.window.showInformationMessage(`${utils_1.locale['smms.token-miss']}`);
                    return null;
                }
                let headers = {
                    Authorization: `Basic ${this.config.sm_ms.token}`
                };
                let rsp = yield got_1.default.post('https://sm.ms/api/v2/upload', {
                    body: form,
                    headers
                });
                let body = JSON.parse(rsp.body);
                return body.images || body.data.url;
            }
            catch (error) {
                let e = error;
                vscode.window.showInformationMessage(`${utils_1.locale['upload_failed']}${e.message}`);
                return null;
            }
        });
    }
}
exports.default = Imgur;
//# sourceMappingURL=sm.ms.js.map