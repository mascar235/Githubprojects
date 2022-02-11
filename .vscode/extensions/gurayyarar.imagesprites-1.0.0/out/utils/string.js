"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
    getCacheBustingKey() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 37; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
    static capitalizeFirstLetter(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    static writeLogMsg(message) {
        console.log(`Image Sprites - ${message}`);
    }
    static writeErrorMsg(err, message) {
        console.error(`Image Sprites - ${message}\nError Detail: ${err}`);
    }
}
exports.StringUtils = StringUtils;
//# sourceMappingURL=string.js.map