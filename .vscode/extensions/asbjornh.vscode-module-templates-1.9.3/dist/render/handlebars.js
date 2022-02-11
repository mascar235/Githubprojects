"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const change_case_1 = require("change-case");
const handlebars_1 = require("handlebars");
const value = (value, thisObj, options) => typeof options.fn === "function"
    ? value
        ? options.fn(thisObj)
        : options.inverse(thisObj)
    : value;
const stringTransform = (transform) => (maybeString) => typeof maybeString === "string" ? transform(maybeString) : maybeString;
const helpers = {
    camel: stringTransform(change_case_1.camelCase),
    capital: stringTransform(change_case_1.capitalCase),
    constant: stringTransform(change_case_1.constantCase),
    eq: function (a, b, options) {
        return value(a === b, this, options);
    },
    lower: stringTransform((str) => str.toLowerCase()),
    kebab: stringTransform(change_case_1.paramCase),
    pascal: stringTransform(change_case_1.pascalCase),
    sentence: stringTransform(change_case_1.sentenceCase),
    snake: stringTransform(change_case_1.snakeCase),
    upper: stringTransform((str) => str.toUpperCase()),
    words: stringTransform(change_case_1.noCase),
};
function render(templateText, answers, config) {
    try {
        return handlebars_1.compile(templateText)(answers, Object.assign({}, config, {
            helpers: Object.assign({}, helpers, config.helpers),
        }));
    }
    catch (error) {
        throw new Error(`Handlebars error: ${error.message}`);
    }
}
exports.default = render;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlYmFycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NvdXJjZS9yZW5kZXIvaGFuZGxlYmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZDQVNxQjtBQUNyQiwyQ0FBcUM7QUFJckMsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQ3hDLE9BQU8sT0FBTyxDQUFDLEVBQUUsS0FBSyxVQUFVO0lBQzlCLENBQUMsQ0FBQyxLQUFLO1FBQ0wsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztJQUM1QixDQUFDLENBQUMsS0FBSyxDQUFDO0FBRVosTUFBTSxlQUFlLEdBQ25CLENBQUMsU0FBa0MsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUErQixFQUFFLEVBQUUsQ0FDMUUsT0FBTyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztBQUUzRSxNQUFNLE9BQU8sR0FBRztJQUNkLEtBQUssRUFBRSxlQUFlLENBQUMsdUJBQVMsQ0FBQztJQUNqQyxPQUFPLEVBQUUsZUFBZSxDQUFDLHlCQUFXLENBQUM7SUFDckMsUUFBUSxFQUFFLGVBQWUsQ0FBQywwQkFBWSxDQUFDO0lBQ3ZDLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsT0FBTztRQUN6QixPQUFPLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsS0FBSyxFQUFFLGVBQWUsQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFELEtBQUssRUFBRSxlQUFlLENBQUMsdUJBQVMsQ0FBQztJQUNqQyxNQUFNLEVBQUUsZUFBZSxDQUFDLHdCQUFVLENBQUM7SUFDbkMsUUFBUSxFQUFFLGVBQWUsQ0FBQywwQkFBWSxDQUFDO0lBQ3ZDLEtBQUssRUFBRSxlQUFlLENBQUMsdUJBQVMsQ0FBQztJQUNqQyxLQUFLLEVBQUUsZUFBZSxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUQsS0FBSyxFQUFFLGVBQWUsQ0FBQyxvQkFBTSxDQUFDO0NBQy9CLENBQUM7QUFFRixTQUF3QixNQUFNLENBQzVCLFlBQW9CLEVBQ3BCLE9BQWdCLEVBQ2hCLE1BQTJCO0lBRTNCLElBQUk7UUFDRixPQUFPLG9CQUFPLENBQUMsWUFBWSxDQUFDLENBQzFCLE9BQU8sRUFDUCxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDeEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ3BELENBQUMsQ0FDSCxDQUFDO0tBQ0g7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ3ZEO0FBQ0gsQ0FBQztBQWZELHlCQWVDIn0=