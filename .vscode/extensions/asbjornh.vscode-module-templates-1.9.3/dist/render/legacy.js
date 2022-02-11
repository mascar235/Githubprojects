"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
function render(input, answers) {
    return Object.entries(answers).reduce((acc, [name, value]) => replaceToken(acc, name, value), input);
}
exports.default = render;
const pattern = (name, type) => new RegExp(`{${name}\.${type}}`, "g");
const replaceToken = (input, name, value) => typeof value === "string"
    ? input
        .replace(pattern(name, "raw"), value)
        .replace(pattern(name, "pascal"), change_case_1.pascalCase(value))
        .replace(pattern(name, "kebab"), change_case_1.paramCase(value))
        .replace(pattern(name, "camel"), change_case_1.camelCase(value))
        .replace(pattern(name, "snake"), change_case_1.snakeCase(value))
    : input.replace(pattern(name, "raw"), JSON.stringify(value));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc291cmNlL3JlbmRlci9sZWdhY3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2Q0FBMEU7QUFJMUUsU0FBd0IsTUFBTSxDQUFDLEtBQWEsRUFBRSxPQUFnQjtJQUM1RCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUNuQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ3RELEtBQUssQ0FDTixDQUFDO0FBQ0osQ0FBQztBQUxELHlCQUtDO0FBRUQsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUV0RSxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQWEsRUFBRSxJQUFZLEVBQUUsS0FBUyxFQUFFLEVBQUUsQ0FDOUQsT0FBTyxLQUFLLEtBQUssUUFBUTtJQUN2QixDQUFDLENBQUMsS0FBSztTQUNGLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQztTQUNwQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSx3QkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25ELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLHVCQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsdUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSx1QkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDIn0=