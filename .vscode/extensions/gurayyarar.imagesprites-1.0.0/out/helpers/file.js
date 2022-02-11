"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const enum_1 = require("../utils/enum");
const options_1 = require("../utils/options");
const string_1 = require("../utils/string");
class FileHelpers {
    writeSpriteSettings(type, styleName, items, path, callback) {
        var fileVals = {
            style_name: styleName,
            folder: "",
            images: "",
            orientation: options_1.Options.getOptions().orientation,
            padding: options_1.Options.getOptions().padding,
            custom_styles: options_1.Options.getOptions().custom_styles,
            stylesheet: options_1.Options.getOptions().stylesheet,
            path_prefix: options_1.Options.getOptions().path_prefix,
            output: options_1.Options.getOptions().output,
            enable_cache_busting: options_1.Options.getOptions().enable_cache_busting
        };
        if (type === enum_1.RightClickType.Folder) {
            fileVals.folder = items;
            delete fileVals.images;
        }
        else {
            fileVals.images = items;
            delete fileVals.folder;
        }
        console.log(fileVals);
        fs.writeFile(path, JSON.stringify(fileVals, null, 3), (err) => {
            if (err) {
                string_1.StringUtils.writeErrorMsg(err, "The configuration file couldn't save!");
                throw err;
            }
            callback();
        });
    }
    writeStyle(fileName, writingText, callback) {
        fs.writeFile(fileName, writingText, (err) => {
            if (err) {
                string_1.StringUtils.writeErrorMsg(err, "The generated style file couldn't save!");
                throw err;
            }
            callback();
        });
    }
}
exports.FileHelpers = FileHelpers;
//# sourceMappingURL=file.js.map