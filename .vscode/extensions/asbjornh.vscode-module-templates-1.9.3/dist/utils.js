"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFolderPath = exports.getHbsConfig = exports.getEngine = exports.getConfig = exports.readFile = exports.readJson = exports.resolveFilePath = exports.getCurrentRoot = exports.pick = exports.showModal = void 0;
const vscode_1 = require("vscode");
const path = __importStar(require("path"));
const fse = __importStar(require("fs-extra"));
const handlebars = __importStar(require("handlebars"));
const untildify_1 = __importDefault(require("untildify"));
const config_1 = require("./config");
function showModal(message) {
    vscode_1.window.showInformationMessage(message, { modal: true });
}
exports.showModal = showModal;
function pick(placeHolder, alternatives) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield vscode_1.window.showQuickPick(alternatives, { placeHolder });
        return result === null || result === void 0 ? void 0 : result.value;
    });
}
exports.pick = pick;
// Returns the root folder that matches `uri`, if any. If no `uri` is provided, the uri of the currently open text file is used. If no file is open, one of the available workspace folders is returned (if any).
function getCurrentRoot(uri) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const currentUri = uri || ((_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri);
        const workspaceFolder = currentUri
            ? vscode_1.workspace.getWorkspaceFolder(currentUri)
            : undefined;
        if (workspaceFolder)
            return workspaceFolder;
        const roots = vscode_1.workspace.workspaceFolders || [];
        const selectedRoot = roots.length === 1
            ? roots[0]
            : roots.length > 1
                ? yield pick("You have more than one workspace folder. Which one do you want to use?", roots.map(folder => ({ label: folder.name, value: folder })))
                : undefined;
        if (selectedRoot)
            return selectedRoot;
        throw new Error(`Couldn't determine which folder to use.`);
    });
}
exports.getCurrentRoot = getCurrentRoot;
function resolveFilePath(root, filePath) {
    if (path.isAbsolute(filePath))
        return filePath;
    if (filePath.startsWith("~"))
        return untildify_1.default(filePath);
    if (root)
        return path.resolve(root.uri.fsPath, "./.vscode", filePath);
    throw new Error(`Couldn't resolve path for file '${filePath}'`);
}
exports.resolveFilePath = resolveFilePath;
// Reads a json file from an absolute path or a path relative to the `.vscode/settings.json` file for the current workspace
function readJson(root, filePath) {
    const resolvedPath = resolveFilePath(root, filePath);
    if (fse.pathExistsSync(resolvedPath))
        return fse.readJsonSync(resolvedPath);
    throw new Error(`File not found: '${resolvedPath}'`);
}
exports.readJson = readJson;
function readFile(root, filePath) {
    const resolvedPath = resolveFilePath(root, filePath);
    if (fse.pathExistsSync(resolvedPath))
        return fse.readFileSync(resolvedPath, { encoding: "utf8" });
    throw new Error(`File not found: '${resolvedPath}'`);
}
exports.readFile = readFile;
function getConfig(root) {
    return vscode_1.workspace.getConfiguration("module-templates", root);
}
exports.getConfig = getConfig;
function getEngine(root) {
    const engine = getConfig(root).engine || "legacy";
    if (!config_1.engines.includes(engine)) {
        throw new Error(`Unknown template engine '${engine}'`);
    }
    return engine;
}
exports.getEngine = getEngine;
const tryRequire = (path) => {
    try {
        // NOTE: Webpack does some shenanigans with `require` building (this does not happen when debugging the extension in VSCode)
        return eval(`require("${path}")`);
    }
    catch (error) {
        throw new Error(`${error.name}: ${error.message} in ${error.stack.split("\n")[0]}`);
    }
};
function getHbsConfig(root) {
    const filePath = getConfig(root).handlebarsConfig;
    if (!filePath)
        return {};
    const module = tryRequire(resolveFilePath(root, filePath));
    if (typeof module === "object")
        return module;
    if (typeof module !== "function")
        throw new Error(`File ${filePath} does not export a function`);
    const options = module(handlebars);
    if (options === undefined)
        return {};
    if (typeof options !== "object")
        throw new Error(`Function in ${filePath} does not return an object.`);
    return options;
}
exports.getHbsConfig = getHbsConfig;
function getFolderPath(uri, root, folderName, defaultPath) {
    if (uri)
        return folderName ? path.join(uri.fsPath, folderName) : uri.fsPath;
    const rootToUse = defaultPath
        ? path.join(root.uri.fsPath, defaultPath)
        : root.uri.fsPath;
    return folderName ? path.join(rootToUse, folderName) : rootToUse;
}
exports.getFolderPath = getFolderPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zb3VyY2UvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFpRTtBQUNqRSwyQ0FBNkI7QUFDN0IsOENBQWdDO0FBQ2hDLHVEQUF5QztBQUN6QywwREFBa0M7QUFFbEMscUNBQW1EO0FBRW5ELFNBQWdCLFNBQVMsQ0FBQyxPQUFlO0lBQ3ZDLGVBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMxRCxDQUFDO0FBRkQsOEJBRUM7QUFFRCxTQUFzQixJQUFJLENBQ3hCLFdBQVcsRUFDWCxZQUEyQzs7UUFFM0MsTUFBTSxNQUFNLEdBQUcsTUFBTSxlQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7UUFDekUsT0FBTyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Q0FBQTtBQU5ELG9CQU1DO0FBRUQsaU5BQWlOO0FBQ2pOLFNBQXNCLGNBQWMsQ0FBQyxHQUFvQjs7O1FBQ3ZELE1BQU0sVUFBVSxHQUFHLEdBQUcsS0FBSSxNQUFBLGVBQU0sQ0FBQyxnQkFBZ0IsMENBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQSxDQUFDO1FBQ2hFLE1BQU0sZUFBZSxHQUFHLFVBQVU7WUFDaEMsQ0FBQyxDQUFDLGtCQUFTLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDO1lBQzFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFFZCxJQUFJLGVBQWU7WUFBRSxPQUFPLGVBQWUsQ0FBQztRQUU1QyxNQUFNLEtBQUssR0FBRyxrQkFBUyxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztRQUUvQyxNQUFNLFlBQVksR0FDaEIsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lB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