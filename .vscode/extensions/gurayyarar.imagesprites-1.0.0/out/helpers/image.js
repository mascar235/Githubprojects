"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const sizeOf = require("image-size");
const path = require("path");
var Jimp = require("jimp");
const options_1 = require("../utils/options");
const enum_1 = require("../utils/enum");
const string_1 = require("../utils/string");
class ImageHelpers {
    getImagesDetailInfo(filesOrFolderPath, callback) {
        if (typeof filesOrFolderPath === "string") {
            this.getImagesFromFolder(filesOrFolderPath, (files) => {
                let imageList = [];
                files.forEach((image) => {
                    var dimensions = sizeOf(image);
                    imageList.push({
                        file_path: image,
                        width: dimensions.width,
                        height: dimensions.height
                    });
                });
                callback(imageList);
            });
        }
        else {
            const files = filesOrFolderPath;
            let imageList = [];
            files.forEach((file) => {
                if (options_1.Options.allowImageFileExtensions().indexOf(path.extname(file)) > -1 && file.indexOf(".sprite.") === -1) {
                    var dimensions = sizeOf(file);
                    imageList.push({
                        file_path: file,
                        width: dimensions.width,
                        height: dimensions.height
                    });
                }
            });
            callback(imageList);
        }
    }
    drawSpriteImage(images, size, savePath, options, callback) {
        var jimps = [];
        // tslint:disable-next-line:no-unused-expression
        new Jimp(size[0], size[1], (err, image) => {
            images.forEach((item) => {
                jimps.push(Jimp.read(item.file_path));
            });
            Promise.all(jimps).then((datas) => {
                return Promise.all(jimps);
            }).then((datas) => {
                if (options.orientation === enum_1.Orientation.Vertical) {
                    const padding = options.padding;
                    let posY = padding;
                    datas.forEach((data, index) => {
                        image.composite(data, padding, posY);
                        posY += data.bitmap.height + padding;
                    });
                }
                else {
                    const padding = options.padding;
                    let posX = padding;
                    datas.forEach((data, index) => {
                        image.composite(data, posX, padding);
                        posX += data.bitmap.width + padding;
                    });
                }
                image.write(savePath, (err) => {
                    if (err) {
                        string_1.StringUtils.writeErrorMsg(err, "The image sprite couldn't save!");
                        throw err;
                    }
                    callback();
                });
            });
        });
    }
    getImagesFromFolder(folderPath, callback) {
        fs.readdir(folderPath, (err, files) => {
            let imageList = [];
            files.forEach((file) => {
                if (options_1.Options.allowImageFileExtensions().indexOf(path.extname(file)) > -1 && file.indexOf(".sprite.") === -1) {
                    imageList.push(`${folderPath}\\${file}`);
                }
            });
            callback(imageList);
        });
    }
}
exports.ImageHelpers = ImageHelpers;
//# sourceMappingURL=image.js.map