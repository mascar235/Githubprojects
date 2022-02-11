"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Hash {
    generateNew() {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 37; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map