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
const utils_2 = require("./utils");
const path = require("path");
const vscode = require("vscode");
const GitHubPic = require("github-picbed");
class GitHub {
    constructor(config) {
        if (!GitHub.github) {
            GitHub.github = GitHubPic(config.github);
        }
        if (!GitHub.github.lastconfig ||
            GitHub.github.lastconfig.token !== config.github.token ||
            GitHub.github.lastconfig.branch !== config.github.branch ||
            GitHub.github.lastconfig.repository !== config.github.repository) {
            this.reconfig(config);
        }
        this.config = config;
    }
    reconfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.config = config;
                GitHub.github.lastconfig = config.github;
                yield GitHub.github.config(config.github);
            }
            catch (error) {
                let e = error;
                vscode.window.showErrorMessage(`${utils_2.locale['config_failed']}${e.message}`);
            }
        });
    }
    upload(filePath, savePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                while (!GitHub.github.isInitialized()) {
                    yield utils_1.default.sleep(100);
                }
                savePath = path.join(this.config.github.path, savePath).replace(/\\/g, '/').replace(/^\/|\/$/, '');
                let data = yield GitHub.github.upload({ data: filePath, filename: savePath });
                return data.url.replace('http:', 'https:');
            }
            catch (error) {
                let e = error;
                vscode.window.showErrorMessage(`${utils_2.locale['upload_failed']}${e.message}`);
                return null;
            }
        });
    }
}
exports.default = GitHub;
//# sourceMappingURL=github.js.map