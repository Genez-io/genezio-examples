"use strict";
exports.__esModule = true;
exports.HelloWorld = exports.Season = void 0;
var testFunction_1 = require("./testFunction");
var Season;
(function (Season) {
    Season["Winter"] = "Winter";
    Season["Summer"] = "Summer";
})(Season = exports.Season || (exports.Season = {}));
/**
 * This class represents a hello world server that can be deployed on genezio infrastructure
 * using "genezio deploy" command or tested locally using "genezio local".
 */
// @GenezioDeploy()
var HelloWorld = /** @class */ (function () {
    function HelloWorld() {
        console.log("Constructor called!");
    }
    /**
     * Method that returns a "Hello world" message.
     */
    HelloWorld.prototype.helloWorld = function () {
        console.log("Hello world request received!");
        return "Hello world!";
    };
    /**
     * Method that returns a personalized "Hello world" message.
     */
    HelloWorld.prototype.hello = function (name, from, value) {
        console.log("Hello world request received with name ".concat(name, " from ").concat(from, " value ").concat(value, "!"));
        // if (name.length > 3) {
        //   throw new Error("Length too big");
        // }
        var nameTested = (0, testFunction_1.testFunction)(name);
        var message = "Hello, ".concat(nameTested, ", from ").concat(from, " during this ").concat(value);
        console.log(message);
        return message;
    };
    return HelloWorld;
}());
exports.HelloWorld = HelloWorld;
