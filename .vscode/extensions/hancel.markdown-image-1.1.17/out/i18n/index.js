"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const i18n = require("./locale");
exports.default = () => {
    let locale = i18n.default;
    let lang = vscode.env.language;
    let langLocale = null;
    try {
        langLocale = i18n.$[lang];
    }
    catch (error) {
        lang = lang.split('-')[0];
    }
    try {
        langLocale = i18n.$[lang];
    }
    catch (error) { }
    if (langLocale) {
        locale = Object.assign(locale, langLocale);
    }
    return locale;
};
//# sourceMappingURL=index.js.map