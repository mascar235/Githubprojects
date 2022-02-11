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
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = void 0;
const path = __importStar(require("path"));
const vscode_1 = require("vscode");
const context = (uri, template) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const currentDocument = (_a = vscode_1.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
    return {
        clipboard: yield vscode_1.env.clipboard.readText(),
        template,
        vscode: {
            clickedItem: {
                path: uri === null || uri === void 0 ? void 0 : uri.fsPath,
            },
            currentDocument: {
                name: currentDocument
                    ? path.basename(currentDocument.uri.fsPath)
                    : undefined,
                path: currentDocument === null || currentDocument === void 0 ? void 0 : currentDocument.uri.fsPath,
            },
            workspace: {
                name: vscode_1.workspace.name,
                path: vscode_1.workspace.rootPath,
            },
        },
    };
});
exports.context = context;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9jb250ZXh0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQ0FBNkI7QUFDN0IsbUNBQXFEO0FBRzlDLE1BQU0sT0FBTyxHQUFHLENBQU8sR0FBb0IsRUFBRSxRQUFrQixFQUFFLEVBQUU7O0lBQ3hFLE1BQU0sZUFBZSxHQUFHLE1BQUEsZUFBTSxDQUFDLGdCQUFnQiwwQ0FBRSxRQUFRLENBQUM7SUFFMUQsT0FBTztRQUNMLFNBQVMsRUFBRSxNQUFNLFlBQUcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1FBQ3pDLFFBQVE7UUFDUixNQUFNLEVBQUU7WUFDTixXQUFXLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxNQUFNO2FBQ2xCO1lBQ0QsZUFBZSxFQUFFO2dCQUNmLElBQUksRUFBRSxlQUFlO29CQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztvQkFDM0MsQ0FBQyxDQUFDLFNBQVM7Z0JBQ2IsSUFBSSxFQUFFLGVBQWUsYUFBZixlQUFlLHVCQUFmLGVBQWUsQ0FBRSxHQUFHLENBQUMsTUFBTTthQUNsQztZQUNELFNBQVMsRUFBRTtnQkFDVCxJQUFJLEVBQUUsa0JBQVMsQ0FBQyxJQUFJO2dCQUNwQixJQUFJLEVBQUUsa0JBQVMsQ0FBQyxRQUFRO2FBQ3pCO1NBQ0Y7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUM7QUF0QlcsUUFBQSxPQUFPLFdBc0JsQiJ9