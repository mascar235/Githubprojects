'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class Options {
    static getOptions() {
        const configValues = vscode.workspace.getConfiguration("imageSprites.settings");
        let orientation = configValues.get("orientation");
        let output = configValues.get("output");
        let padding = configValues.get("padding");
        let stylesheet = configValues.get("stylesheet");
        let customStyles = configValues.get("custom_styles");
        let pathPrefix = configValues.get("path_prefix");
        let enableCacheBusting = configValues.get("enable_cache_busting");
        output = output === undefined ? "png" : output;
        pathPrefix = pathPrefix === undefined ? "" : pathPrefix;
        enableCacheBusting = enableCacheBusting === undefined ? true : false;
        padding = padding === undefined ? 5 : padding;
        stylesheet = stylesheet === undefined ? "css" : stylesheet;
        orientation = orientation === undefined ? "vertical" : orientation;
        customStyles = customStyles === undefined ? { "display": "inline-block" } : customStyles;
        return {
            custom_styles: customStyles,
            orientation: orientation,
            padding: padding,
            stylesheet: stylesheet,
            path_prefix: pathPrefix,
            output: output,
            enable_cache_busting: enableCacheBusting
        };
    }
    static allowImageFileExtensions() {
        return [".png", ".jpg", ".bmp"];
    }
}
exports.Options = Options;
//# sourceMappingURL=options.js.map