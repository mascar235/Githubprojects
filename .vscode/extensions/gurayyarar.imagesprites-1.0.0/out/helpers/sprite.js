"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const options_1 = require("../utils/options");
const image_1 = require("./image");
const file_1 = require("./file");
const enum_1 = require("../utils/enum");
const style_generator_1 = require("./style-generator");
const string_1 = require("../utils/string");
class SpriteHelpers {
    startImageSprite(imagesOrFolderPath, callback) {
        const rightClickType = typeof imagesOrFolderPath === "string" ? enum_1.RightClickType.Folder : enum_1.RightClickType.File;
        new image_1.ImageHelpers().getImagesDetailInfo(imagesOrFolderPath, (images) => {
            if (images.length === 0) {
                vscode.window.showErrorMessage("The folder doesn't have any image for sprite!");
            }
            else {
                let saveDialogOptions = {
                    filters: { "Sprite Files": ["sprite"] },
                    defaultUri: vscode.Uri.file(rightClickType === enum_1.RightClickType.Folder ? imagesOrFolderPath : path.dirname(imagesOrFolderPath[0]))
                };
                vscode.window.showSaveDialog(saveDialogOptions).then((file) => {
                    let relativePath;
                    const fileFsPath = vscode.Uri.parse(file).fsPath;
                    const folder = path.dirname(fileFsPath);
                    const styleName = path.basename(fileFsPath, path.extname(fileFsPath));
                    if (rightClickType === enum_1.RightClickType.Folder) {
                        relativePath = path.relative(folder, imagesOrFolderPath);
                    }
                    else {
                        relativePath = [];
                        imagesOrFolderPath.forEach((itemPath) => {
                            relativePath.push(path.relative(folder, itemPath));
                        });
                    }
                    new file_1.FileHelpers().writeSpriteSettings(rightClickType, styleName, relativePath, fileFsPath, () => {
                        const styleFileName = path.join(folder, `${styleName}.sprite.${options_1.Options.getOptions().stylesheet}`);
                        const styleItem = {
                            sprite_image: styleName,
                            items: images,
                            options: options_1.Options.getOptions()
                        };
                        const styleStr = new style_generator_1.StyleGeneratorHelpers(styleItem).getStyleText();
                        new file_1.FileHelpers().writeStyle(styleFileName, styleStr, () => {
                            const imageFileName = path.join(folder, `${styleName}.sprite.${options_1.Options.getOptions().output}`);
                            const spriteImageSize = new SpriteHelpers().getSpriteImageSize(images, options_1.Options.getOptions());
                            new image_1.ImageHelpers().drawSpriteImage(images, spriteImageSize, imageFileName, options_1.Options.getOptions(), () => {
                                callback();
                            });
                        });
                    });
                });
            }
        });
    }
    updateImageSprite(spriteFilePath, callback) {
        fs.readFile(spriteFilePath, "utf8", (err, data) => {
            if (err) {
                string_1.StringUtils.writeErrorMsg(err, "The sprite configuration file couldn't read!");
                throw err;
            }
            let options = JSON.parse(data);
            let filesOrFolderPath;
            const folderPath = path.dirname(spriteFilePath);
            if (options.images === undefined) {
                filesOrFolderPath = path.resolve(folderPath, options.folder);
            }
            else {
                filesOrFolderPath = [];
                options.images.forEach((image) => {
                    filesOrFolderPath.push(path.resolve(folderPath, image));
                });
            }
            new image_1.ImageHelpers().getImagesDetailInfo(filesOrFolderPath, (images) => {
                const styleItem = {
                    sprite_image: options.style_name,
                    items: images,
                    options: options
                };
                const styleFileName = path.join(folderPath, `${options.style_name}.sprite.${options.stylesheet}`);
                const styleStr = new style_generator_1.StyleGeneratorHelpers(styleItem).getStyleText();
                new file_1.FileHelpers().writeStyle(styleFileName, styleStr, () => {
                    const imageFileName = path.join(folderPath, `${options.style_name}.sprite.${options.output}`);
                    const spriteImageSize = new SpriteHelpers().getSpriteImageSize(images, options);
                    new image_1.ImageHelpers().drawSpriteImage(images, spriteImageSize, imageFileName, options, () => {
                        callback();
                    });
                });
            });
        });
    }
    getSpriteImageSize(images, options) {
        const padding = options.padding;
        let width = 0;
        let height = 0;
        let resultArray = [];
        if (options.orientation === enum_1.Orientation.Vertical) {
            width = Math.max.apply(Math, images.map((item) => { return item.width; })) + (padding * 2);
            images.forEach((item) => { height += item.height; });
            height += (images.length + 1) * padding;
        }
        else {
            height = Math.max.apply(Math, images.map((item) => { return item.height; })) + (padding * 2);
            images.forEach((item) => { width += item.width; });
            width += (images.length + 1) * padding;
        }
        resultArray.push(width);
        resultArray.push(height);
        return resultArray;
    }
}
exports.SpriteHelpers = SpriteHelpers;
//# sourceMappingURL=sprite.js.map