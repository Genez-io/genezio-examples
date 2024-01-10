"use strict";
exports.__esModule = true;
exports.testFunction = void 0;
function testFunction(name) {
    if (name.length > 3) {
        throw new Error("Length too big");
    }
    return name;
}
exports.testFunction = testFunction;
