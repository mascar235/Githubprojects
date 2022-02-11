"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybeRender = exports.render = void 0;
const handlebars_1 = __importDefault(require("./handlebars"));
const legacy_1 = __importDefault(require("./legacy"));
function render(engine, templateText, answers, handlebarsConfig) {
    switch (engine) {
        case "handlebars":
            return handlebars_1.default(templateText, answers, handlebarsConfig);
        case "legacy":
            return legacy_1.default(templateText, answers);
    }
}
exports.render = render;
function maybeRender(engine, templateText, answers, handlebarsconfig) {
    if (!templateText)
        return;
    return render(engine, templateText, answers, handlebarsconfig);
}
exports.maybeRender = maybeRender;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvcmVuZGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLDhEQUE0QztBQUM1QyxzREFBb0M7QUFFcEMsU0FBZ0IsTUFBTSxDQUNwQixNQUFjLEVBQ2QsWUFBb0IsRUFDcEIsT0FBZ0IsRUFDaEIsZ0JBQXFDO0lBRXJDLFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxZQUFZO1lBQ2YsT0FBTyxvQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDbkUsS0FBSyxRQUFRO1lBQ1gsT0FBTyxnQkFBWSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQztLQUM5QztBQUNILENBQUM7QUFaRCx3QkFZQztBQUVELFNBQWdCLFdBQVcsQ0FDekIsTUFBYyxFQUNkLFlBQWdDLEVBQ2hDLE9BQWdCLEVBQ2hCLGdCQUFxQztJQUVyQyxJQUFJLENBQUMsWUFBWTtRQUFFLE9BQU87SUFDMUIsT0FBTyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBUkQsa0NBUUMifQ==