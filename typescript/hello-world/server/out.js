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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9kZV9tb2R1bGVzL0BnZW5lemlvL3R5cGVzL2Rpc3QvY2pzL2luZGV4LmpzIiwgImhlbGxvLnRzIiwgInRlc3RGdW5jdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkdlbmV6aW9NZXRob2QgPSBleHBvcnRzLkdlbmV6aW9EZXBsb3kgPSB2b2lkIDA7XG4vLyBEZWNvcmF0b3IgdGhhdCBtYXJrcyB0aGF0IGEgY2xhc3Mgc2hvdWxkIGJlIGRlcGxveWVkIHVzaW5nIGdlbmV6aW8uXG5mdW5jdGlvbiBHZW5lemlvRGVwbG95KF9kaWN0ID0ge30pIHtcbiAgICByZXR1cm4gKF9jdG9yKSA9PiB7IH07XG59XG5leHBvcnRzLkdlbmV6aW9EZXBsb3kgPSBHZW5lemlvRGVwbG95O1xuLy8gRGVjb3JhdG9yIHRoYXQgbWFya3MgdGhhdCBhIG1ldGhvZCBzaG91bGQgYmUgZGVwbG95ZWQgdXNpbmcgZ2VuZXppby5cbmZ1bmN0aW9uIEdlbmV6aW9NZXRob2QoX2RpY3QgPSB7fSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoX3RhcmdldCwgX2tleSwgZGVzY3JpcHRvcikge1xuICAgICAgICBsZXQgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAgICAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbE1ldGhvZC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gICAgfTtcbn1cbmV4cG9ydHMuR2VuZXppb01ldGhvZCA9IEdlbmV6aW9NZXRob2Q7XG4iLCAiaW1wb3J0IHsgR2VuZXppb0RlcGxveSB9IGZyb20gXCJAZ2VuZXppby90eXBlc1wiO1xyXG5pbXBvcnQgeyB0ZXN0RnVuY3Rpb24gfSBmcm9tIFwiLi90ZXN0RnVuY3Rpb25cIjtcclxuXHJcbmV4cG9ydCBlbnVtIFNlYXNvbiB7XHJcbiAgV2ludGVyID0gXCJXaW50ZXJcIixcclxuICBTdW1tZXIgPSBcIlN1bW1lclwiLFxyXG59XHJcblxyXG4vKipcclxuICogVGhpcyBjbGFzcyByZXByZXNlbnRzIGEgaGVsbG8gd29ybGQgc2VydmVyIHRoYXQgY2FuIGJlIGRlcGxveWVkIG9uIGdlbmV6aW8gaW5mcmFzdHJ1Y3R1cmVcclxuICogdXNpbmcgXCJnZW5lemlvIGRlcGxveVwiIGNvbW1hbmQgb3IgdGVzdGVkIGxvY2FsbHkgdXNpbmcgXCJnZW5lemlvIGxvY2FsXCIuXHJcbiAqL1xyXG5AR2VuZXppb0RlcGxveSgpXHJcbmV4cG9ydCBjbGFzcyBIZWxsb1dvcmxkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiQ29uc3RydWN0b3IgY2FsbGVkIVwiKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ldGhvZCB0aGF0IHJldHVybnMgYSBcIkhlbGxvIHdvcmxkXCIgbWVzc2FnZS5cclxuICAgKi9cclxuICBoZWxsb1dvcmxkKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCByZXF1ZXN0IHJlY2VpdmVkIVwiKTtcclxuICAgIHJldHVybiBcIkhlbGxvIHdvcmxkIVwiO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRoYXQgcmV0dXJucyBhIHBlcnNvbmFsaXplZCBcIkhlbGxvIHdvcmxkXCIgbWVzc2FnZS5cclxuICAgKi9cclxuICBoZWxsbyhuYW1lOiBzdHJpbmcsIGZyb206IHN0cmluZywgdmFsdWU6IFNlYXNvbik6IHN0cmluZyB7XHJcbiAgICBjb25zb2xlLmxvZyhcclxuICAgICAgYEhlbGxvIHdvcmxkIHJlcXVlc3QgcmVjZWl2ZWQgd2l0aCBuYW1lICR7bmFtZX0gZnJvbSAke2Zyb219IHZhbHVlICR7dmFsdWV9IWBcclxuICAgICk7XHJcbiAgICAvLyBpZiAobmFtZS5sZW5ndGggPiAzKSB7XHJcbiAgICAvLyAgIHRocm93IG5ldyBFcnJvcihcIkxlbmd0aCB0b28gYmlnXCIpO1xyXG4gICAgLy8gfVxyXG4gICAgbGV0IG5hbWVUZXN0ZWQgPSB0ZXN0RnVuY3Rpb24obmFtZSk7XHJcbiAgICBjb25zdCBtZXNzYWdlID0gYEhlbGxvLCAke25hbWVUZXN0ZWR9LCBmcm9tICR7ZnJvbX0gZHVyaW5nIHRoaXMgJHt2YWx1ZX1gO1xyXG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2U7XHJcbiAgfVxyXG59XHJcbiIsICJleHBvcnQgZnVuY3Rpb24gdGVzdEZ1bmN0aW9uKG5hbWU6IHN0cmluZykge1xyXG4gIGlmIChuYW1lLmxlbmd0aCA+IDMpIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcIkxlbmd0aCB0b28gYmlnXCIpO1xyXG4gIH1cclxuICByZXR1cm4gbmFtZTtcclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQSxXQUFPLGVBQWUsU0FBUyxjQUFjLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFDNUQsWUFBUSxnQkFBZ0IsUUFBUSxnQkFBZ0I7QUFFaEQsYUFBU0EsZUFBYyxRQUFRLENBQUMsR0FBRztBQUMvQixhQUFPLENBQUMsVUFBVTtBQUFBLE1BQUU7QUFBQSxJQUN4QjtBQUNBLFlBQVEsZ0JBQWdCQTtBQUV4QixhQUFTLGNBQWMsUUFBUSxDQUFDLEdBQUc7QUFDL0IsYUFBTyxTQUFVLFNBQVMsTUFBTSxZQUFZO0FBQ3hDLFlBQUksaUJBQWlCLFdBQVc7QUFDaEMsbUJBQVcsUUFBUSxZQUFhLE1BQU07QUFDbEMsaUJBQU8sZUFBZSxNQUFNLE1BQU0sSUFBSTtBQUFBLFFBQzFDO0FBQ0EsZUFBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQ0EsWUFBUSxnQkFBZ0I7QUFBQTtBQUFBOzs7QUNsQnhCLG1CQUE4Qjs7O0FDQXZCLFNBQVMsYUFBYSxNQUFjO0FBQ3pDLE1BQUksS0FBSyxTQUFTLEdBQUc7QUFDbkIsVUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0FBQUEsRUFDbEM7QUFDQSxTQUFPO0FBQ1Q7OztBREZPLElBQUssU0FBTCxrQkFBS0MsWUFBTDtBQUNMLEVBQUFBLFFBQUEsWUFBUztBQUNULEVBQUFBLFFBQUEsWUFBUztBQUZDLFNBQUFBO0FBQUEsR0FBQTtBQVVMLElBQU0sYUFBTixNQUFpQjtBQUFBLEVBQ3RCLGNBQWM7QUFDWixZQUFRLElBQUkscUJBQXFCO0FBQUEsRUFDbkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLGFBQWE7QUFDWCxZQUFRLElBQUksK0JBQStCO0FBQzNDLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxNQUFNLE1BQWMsTUFBYyxPQUF1QjtBQUN2RCxZQUFRO0FBQUEsTUFDTiwwQ0FBMEMsSUFBSSxTQUFTLElBQUksVUFBVSxLQUFLO0FBQUEsSUFDNUU7QUFJQSxRQUFJLGFBQWEsYUFBYSxJQUFJO0FBQ2xDLFVBQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxJQUFJLGdCQUFnQixLQUFLO0FBQ3ZFLFlBQVEsSUFBSSxPQUFPO0FBRW5CLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUE3QmEsYUFBTjtBQUFBLE1BRE4sNEJBQWM7QUFBQSxHQUNGOyIsCiAgIm5hbWVzIjogWyJHZW5lemlvRGVwbG95IiwgIlNlYXNvbiJdCn0K
