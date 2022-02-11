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
const path = require("path");
const utils_1 = require("./utils");
const cloudinary_1 = require("cloudinary");
class Cloudinary {
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
                let result = yield this.doUpload(filePath, savePath, {
                    overwrite: false,
                });
                if (result.existing) {
                    const replace = yield utils_1.default.confirm(utils_1.locale["replace_or_no"], [
                        utils_1.locale["Yes"],
                        utils_1.locale["No"],
                    ]);
                    if (replace === utils_1.locale["No"]) {
                        return null;
                    }
                    // yes, so re-upload with overwrite: true
                    result = yield this.doUpload(filePath, savePath, { overwrite: true });
                }
                return result.secure_url;
            }
            catch (e) {
                vscode.window.showInformationMessage(`${utils_1.locale["upload_failed"]}${e.message}`);
                return null;
            }
        });
    }
    doUpload(filePath, savePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            cloudinary_1.v2.config({
                cloud_name: this.config.cloudinary.cloudName,
                api_key: this.config.cloudinary.apiKey,
                api_secret: this.config.cloudinary.apiSecret,
            });
            const folder = path.join(this.config.cloudinary.folder, path.dirname(savePath));
            const filename = path.basename(savePath);
            return cloudinary_1.v2.uploader.upload(filePath, {
                folder: folder,
                filename_override: filename,
                use_filename: true,
                unique_filename: false,
                overwrite: options.overwrite,
                fetch_format: "auto",
                quality: "auto",
            });
        });
    }
}
exports.default = Cloudinary;
//# sourceMappingURL=cloudinary.js.map