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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
const utils_2 = require("./utils");
function getTemplates(setting) {
    if (Array.isArray(setting)) {
        return setting;
    }
    else if (setting && typeof setting === "object") {
        return Object.entries(setting || {}).map(([key, value]) => {
            return Object.assign(Object.assign({}, value), { id: key });
        });
    }
    return [];
}
function getTemplate(root) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = utils_1.getConfig(root);
        const templateFiles = config.templateFiles || [];
        const templatesFromConfig = getTemplates(config.templates);
        const templatesFromFiles = templateFiles
            .map(filePath => {
            const templates = getTemplates(utils_2.readJson(root, filePath));
            if (!templates.length) {
                throw new Error(`Templates in '${filePath}' are empty or unable to be recognized`);
            }
            // NOTE: The extension resolves all file paths relative to the `.vscode` folder, but file paths are specified relative to the current templates file. This does not always work unless file paths in templates files are resolved beforehand, which is done here
            templates.forEach(template => {
                var _a;
                (_a = template.files) === null || _a === void 0 ? void 0 : _a.forEach(file => {
                    if (!file.contentFile)
                        return;
                    // NOTE: Absolute path to the directory where this templates file is stored
                    const dir = path_1.default.dirname(utils_2.resolveFilePath(root, filePath));
                    // NOTE: Replaces the relative path with an absolute one
                    file.contentFile = path_1.default.resolve(dir, file.contentFile);
                });
            });
            return templates;
        })
            .flat();
        const templates = [...templatesFromFiles, ...templatesFromConfig];
        if (templates.length === 0) {
            throw new Error("No templates found. Add some to your user, workspace or folder settings!");
        }
        if (templates.length === 1) {
            const [firstTemplate] = templates;
            return resolveInheritance(firstTemplate, templates);
        }
        else {
            const template = yield utils_2.pick("Select a template", templates
                .filter(({ displayName }) => displayName)
                .map(template => ({ label: template.displayName, value: template })));
            return template ? resolveInheritance(template, templates) : undefined;
        }
    });
}
exports.default = getTemplate;
function resolveInheritance(template, templates) {
    if (!template.extends || template.extends.length === 0)
        return template;
    const inheritedData = template.extends.map(id => {
        const data = templates.find(template => template.id === id);
        if (!data) {
            const msg = `Template extends '${id}', which was not found.`;
            vscode_1.window.showErrorMessage(msg);
            throw Error(msg);
        }
        return resolveInheritance(data, templates);
    });
    const combined = [...inheritedData, template].reduce((accum, data) => (Object.assign(Object.assign(Object.assign({}, accum), data), { extends: [], files: [...(accum.files || []), ...(data.files || [])], id: template.id, questions: Object.assign(Object.assign({}, accum.questions), data.questions) })), { displayName: template.displayName, files: [] });
    return combined;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXRlbXBsYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc291cmNlL2dldC10ZW1wbGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QjtBQUN4QixtQ0FBaUQ7QUFFakQsbUNBQW9DO0FBRXBDLG1DQUEwRDtBQUUxRCxTQUFTLFlBQVksQ0FBQyxPQUFtQztJQUN2RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDMUIsT0FBTyxPQUFPLENBQUM7S0FDaEI7U0FBTSxJQUFJLE9BQU8sSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDakQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ3hELHVDQUFZLEtBQUssS0FBRSxFQUFFLEVBQUUsR0FBRyxJQUFHO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRCxTQUE4QixXQUFXLENBQUMsSUFBcUI7O1FBQzdELE1BQU0sTUFBTSxHQUFHLGlCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUM7UUFDakQsTUFBTSxtQkFBbUIsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNELE1BQU0sa0JBQWtCLEdBQWUsYUFBYTthQUNqRCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDZCxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsZ0JBQVEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUV6RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsTUFBTSxJQUFJLEtB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