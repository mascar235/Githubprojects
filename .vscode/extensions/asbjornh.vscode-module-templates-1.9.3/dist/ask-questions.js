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
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const utils_1 = require("./utils");
const prompt = (question, defaultValue) => __awaiter(void 0, void 0, void 0, function* () {
    const answer = yield vscode_1.window.showInputBox({
        prompt: question,
        placeHolder: defaultValue,
    });
    return answer || defaultValue;
});
function promptAnswers(questions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (questions.length === 0)
            return [];
        const [first, ...rest] = questions;
        const [key, question] = first;
        const answer = typeof question === "string"
            ? yield prompt(question)
            : Array.isArray(question)
                ? yield utils_1.pick("Pick one!", question.map(({ displayName: label, value }) => ({ label, value })))
                : yield prompt(question.displayName, question.defaultValue);
        return rest.length > 0
            ? [[key, answer], ...(yield promptAnswers(rest))]
            : [[key, answer]];
    });
}
function ask(questions) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!questions)
            return {};
        const answers = yield promptAnswers(Object.entries(questions));
        // NOTE: `undefined` means the user cancelled (https://code.visualstudio.com/api/references/vscode-api#window.showInputBox)
        if (answers.some(([, value]) => typeof value === "undefined"))
            throw new Error("Aborting because question wasn't answered");
        return answers
            .filter(([, value]) => typeof value !== "undefined")
            .reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [key]: value })), {});
    });
}
exports.default = ask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNrLXF1ZXN0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9hc2stcXVlc3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWdDO0FBSWhDLG1DQUErQjtBQU0vQixNQUFNLE1BQU0sR0FBRyxDQUFPLFFBQWdCLEVBQUUsWUFBcUIsRUFBRSxFQUFFO0lBQy9ELE1BQU0sTUFBTSxHQUFHLE1BQU0sZUFBTSxDQUFDLFlBQVksQ0FBQztRQUN2QyxNQUFNLEVBQUUsUUFBUTtRQUNoQixXQUFXLEVBQUUsWUFBWTtLQUMxQixDQUFDLENBQUM7SUFDSCxPQUFPLE1BQU0sSUFBSSxZQUFZLENBQUM7QUFDaEMsQ0FBQyxDQUFBLENBQUM7QUFFRixTQUFlLGFBQWEsQ0FDMUIsU0FBK0I7O1FBRS9CLElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdEMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztRQUNuQyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUM5QixNQUFNLE1BQU0sR0FDVixPQUFPLFFBQVEsS0FBSyxRQUFRO1lBQzFCLENBQUMsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDeEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO2dCQUN6QixDQUFDLENBQUMsTUFBTSxZQUFJLENBQ1IsV0FBVyxFQUNYLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUNwRTtnQkFDSCxDQUFDLENBQUMsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEUsT0FBTyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0QixDQUFDO0NBQUE7QUFFRCxTQUE4QixHQUFHLENBQy9CLFNBQWdDOztRQUVoQyxJQUFJLENBQUMsU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQzFCLE1BQU0sT0FBTyxHQUFHLE1BQU0sYUFBYSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUUvRCwySEFBMkg7UUFDM0gsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUM7WUFDM0QsTUFBTSxJQUFJLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBRS9ELE9BQU8sT0FBTzthQUNYLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDO2FBQ25ELE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsaUNBQU0sR0FBRyxLQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUFBO0FBYkQsc0JBYUMifQ==