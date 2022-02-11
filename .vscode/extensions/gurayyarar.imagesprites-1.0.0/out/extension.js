'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const sprite_1 = require("./helpers/sprite");
function activate(context) {
    let disposablestartImageSprite = vscode.commands.registerCommand('extension.startImageSprite', (folder, items) => {
        const ext = path.extname(folder.fsPath);
        if (ext !== null && ext !== "" && ext !== undefined) {
            let imageItems = [];
            items.forEach((item) => {
                imageItems.push(item.fsPath);
            });
            new sprite_1.SpriteHelpers().startImageSprite(imageItems, () => {
                vscode.window.showInformationMessage("Image sprite has been generated successfully!");
            });
        }
        else {
            new sprite_1.SpriteHelpers().startImageSprite(folder.fsPath, () => {
                vscode.window.showInformationMessage("Image sprite has been generated successfully!");
            });
        }
    });
    let disposableUpdateImageSprite = vscode.commands.registerCommand('extension.updateImageSprite', (e) => {
        new sprite_1.SpriteHelpers().updateImageSprite(e.fsPath, () => {
            vscode.window.showInformationMessage("Image sprite has been updated successfully!");
        });
    });
    context.subscriptions.push(disposablestartImageSprite);
    context.subscriptions.push(disposableUpdateImageSprite);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map