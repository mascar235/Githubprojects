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
const path = require("path");
const url = require("url");
const utils_1 = require("./utils");
const utils_2 = require("./utils");
const qiniu = require("qiniu");
class Qiniu {
    constructor(config) {
        this.config = config;
        this.token = '';
        this.lastTimestamp = 0;
    }
    reconfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            this.token = '';
            this.lastTimestamp = 0;
        });
    }
    upload(filePath, savePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let key = savePath.replace(/\\/g, '/') || (utils_1.default.hash(fs.readFileSync(filePath)) + path.extname(filePath));
                let token = this.getToken(key);
                let config = new qiniu.conf.Config();
                switch (this.config.qiniu.zone) {
                    case utils_2.locale['qiniu.east']:
                        config.zone = qiniu.zone.Zone_z0;
                        break;
                    case utils_2.locale['qiniu.north']:
                        config.zone = qiniu.zone.Zone_z1;
                        break;
                    case utils_2.locale['qiniu.south']:
                        config.zone = qiniu.zone.Zone_z2;
                        break;
                    case utils_2.locale['qiniu.na']:
                        config.zone = qiniu.zone.Zone_na0;
                        break;
                    case utils_2.locale['qiniu.sa']:
                        config.zone = qiniu.zone.Zone_as0;
                        break;
                }
                let formUploader = new qiniu.form_up.FormUploader(config);
                let putExtra = new qiniu.form_up.PutExtra();
                let upload = () => {
                    return new Promise((resolve, reject) => {
                        formUploader.putFile(token, key, filePath, putExtra, (respErr, respBody, respInfo) => {
                            if (respErr) {
                                reject(respErr);
                            }
                            if (respInfo.statusCode === 200) {
                                console.debug(respBody);
                                resolve(url.resolve(this.config.qiniu.domain, key));
                            }
                            else {
                                console.debug(respInfo.statusCode);
                                console.debug(respBody);
                                reject(new Error(respBody.error));
                            }
                        });
                    });
                };
                return yield upload();
            }
            catch (error) {
                let e = error;
                vscode.window.showInformationMessage(`${utils_2.locale['upload_failed']}${e.message}`);
                return null;
            }
        });
    }
    getToken(filename) {
        let mac = new qiniu.auth.digest.Mac(this.config.qiniu.accessKey, this.config.qiniu.secretKey);
        let putPolicy = new qiniu.rs.PutPolicy({
            scope: this.config.qiniu.bucket + ':' + filename,
        });
        return putPolicy.uploadToken(mac);
    }
}
exports.default = Qiniu;
//# sourceMappingURL=qiniu.js.map