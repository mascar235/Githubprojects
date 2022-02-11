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
const fs = require("fs");
const node_fetch_1 = require("node-fetch");
const FormData = require("form-data");
const utils_1 = require("./utils");
const cloudflareUrl = (accountId) => `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1`;
class Cloudflare {
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
                const result = yield this.doUpload(filePath, savePath);
                if (result.success) {
                    return result.result.variants[0];
                }
                throw new Error(result.errors[0].message);
            }
            catch (error) {
                let e = error;
                vscode.window.showInformationMessage(`${utils_1.locale['upload_failed']}${e.message}\n${e.stack}`);
                return null;
            }
        });
    }
    doUpload(filePath, savePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountId, apiToken } = this.config.cloudflare;
            const formData = new FormData();
            formData.append('file', fs.createReadStream(filePath), {
                filepath: savePath,
            });
            const response = yield node_fetch_1.default(cloudflareUrl(accountId), {
                method: 'POST',
                body: formData,
                headers: {
                    authorization: `Bearer ${apiToken}`,
                },
            });
            return response.json();
        });
    }
}
exports.default = Cloudflare;
//# sourceMappingURL=cloudflare.js.map