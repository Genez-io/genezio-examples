var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// node_modules/@genezio/types/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@genezio/types/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GenezioMethod = exports.GenezioDeploy = void 0;
    function GenezioDeploy2(_dict = {}) {
      return (_ctor) => {
      };
    }
    exports.GenezioDeploy = GenezioDeploy2;
    function GenezioMethod(_dict = {}) {
      return function(_target, _key, descriptor) {
        let originalMethod = descriptor.value;
        descriptor.value = function(...args) {
          return originalMethod.apply(this, args);
        };
        return descriptor;
      };
    }
    exports.GenezioMethod = GenezioMethod;
  }
});

// hello.ts
var import_types = __toESM(require_cjs(), 1);

// testFunction.ts
function testFunction(name) {
  if (name.length > 3) {
    throw new Error("Length too big");
  }
  return name;
}

// hello.ts
var Season = /* @__PURE__ */ ((Season2) => {
  Season2["Winter"] = "Winter";
  Season2["Summer"] = "Summer";
  return Season2;
})(Season || {});
var HelloWorld = class {
  constructor() {
    console.log("Constructor called!");
  }
  /**
   * Method that returns a "Hello world" message.
   */
  helloWorld() {
    console.log("Hello world request received!");
    return "Hello world!";
  }
  /**
   * Method that returns a personalized "Hello world" message.
   */
  hello(name, from, value) {
    console.log(
      `Hello world request received with name ${name} from ${from} value ${value}!`
    );
    let nameTested = testFunction(name);
    const message = `Hello, ${nameTested}, from ${from} during this ${value}`;
    console.log(message);
    return message;
  }
};
HelloWorld = __decorateClass([
  (0, import_types.GenezioDeploy)()
], HelloWorld);
export {
  HelloWorld,
  Season
};
//# sourceMappingURL=out.js.map
