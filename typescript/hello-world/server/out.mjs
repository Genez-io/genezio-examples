var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// hello.ts
import { GenezioDeploy } from "@genezio/types";

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
  GenezioDeploy()
], HelloWorld);
export {
  HelloWorld,
  Season
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGVsbG8udHMiLCAidGVzdEZ1bmN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBHZW5lemlvRGVwbG95IH0gZnJvbSBcIkBnZW5lemlvL3R5cGVzXCI7XHJcbmltcG9ydCB7IHRlc3RGdW5jdGlvbiB9IGZyb20gXCIuL3Rlc3RGdW5jdGlvblwiO1xyXG5cclxuZXhwb3J0IGVudW0gU2Vhc29uIHtcclxuICBXaW50ZXIgPSBcIldpbnRlclwiLFxyXG4gIFN1bW1lciA9IFwiU3VtbWVyXCIsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBoZWxsbyB3b3JsZCBzZXJ2ZXIgdGhhdCBjYW4gYmUgZGVwbG95ZWQgb24gZ2VuZXppbyBpbmZyYXN0cnVjdHVyZVxyXG4gKiB1c2luZyBcImdlbmV6aW8gZGVwbG95XCIgY29tbWFuZCBvciB0ZXN0ZWQgbG9jYWxseSB1c2luZyBcImdlbmV6aW8gbG9jYWxcIi5cclxuICovXHJcbkBHZW5lemlvRGVwbG95KClcclxuZXhwb3J0IGNsYXNzIEhlbGxvV29ybGQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgY29uc29sZS5sb2coXCJDb25zdHJ1Y3RvciBjYWxsZWQhXCIpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTWV0aG9kIHRoYXQgcmV0dXJucyBhIFwiSGVsbG8gd29ybGRcIiBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGhlbGxvV29ybGQoKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIkhlbGxvIHdvcmxkIHJlcXVlc3QgcmVjZWl2ZWQhXCIpO1xyXG4gICAgcmV0dXJuIFwiSGVsbG8gd29ybGQhXCI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBNZXRob2QgdGhhdCByZXR1cm5zIGEgcGVyc29uYWxpemVkIFwiSGVsbG8gd29ybGRcIiBtZXNzYWdlLlxyXG4gICAqL1xyXG4gIGhlbGxvKG5hbWU6IHN0cmluZywgZnJvbTogc3RyaW5nLCB2YWx1ZTogU2Vhc29uKTogc3RyaW5nIHtcclxuICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICBgSGVsbG8gd29ybGQgcmVxdWVzdCByZWNlaXZlZCB3aXRoIG5hbWUgJHtuYW1lfSBmcm9tICR7ZnJvbX0gdmFsdWUgJHt2YWx1ZX0hYFxyXG4gICAgKTtcclxuICAgIC8vIGlmIChuYW1lLmxlbmd0aCA+IDMpIHtcclxuICAgIC8vICAgdGhyb3cgbmV3IEVycm9yKFwiTGVuZ3RoIHRvbyBiaWdcIik7XHJcbiAgICAvLyB9XHJcbiAgICBsZXQgbmFtZVRlc3RlZCA9IHRlc3RGdW5jdGlvbihuYW1lKTtcclxuICAgIGNvbnN0IG1lc3NhZ2UgPSBgSGVsbG8sICR7bmFtZVRlc3RlZH0sIGZyb20gJHtmcm9tfSBkdXJpbmcgdGhpcyAke3ZhbHVlfWA7XHJcbiAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZTtcclxuICB9XHJcbn1cclxuIiwgImV4cG9ydCBmdW5jdGlvbiB0ZXN0RnVuY3Rpb24obmFtZTogc3RyaW5nKSB7XHJcbiAgaWYgKG5hbWUubGVuZ3RoID4gMykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTGVuZ3RoIHRvbyBiaWdcIik7XHJcbiAgfVxyXG4gIHJldHVybiBuYW1lO1xyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTLHFCQUFxQjs7O0FDQXZCLFNBQVMsYUFBYSxNQUFjO0FBQ3pDLE1BQUksS0FBSyxTQUFTLEdBQUc7QUFDbkIsVUFBTSxJQUFJLE1BQU0sZ0JBQWdCO0FBQUEsRUFDbEM7QUFDQSxTQUFPO0FBQ1Q7OztBREZPLElBQUssU0FBTCxrQkFBS0EsWUFBTDtBQUNMLEVBQUFBLFFBQUEsWUFBUztBQUNULEVBQUFBLFFBQUEsWUFBUztBQUZDLFNBQUFBO0FBQUEsR0FBQTtBQVVMLElBQU0sYUFBTixNQUFpQjtBQUFBLEVBQ3RCLGNBQWM7QUFDWixZQUFRLElBQUkscUJBQXFCO0FBQUEsRUFDbkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUtBLGFBQWE7QUFDWCxZQUFRLElBQUksK0JBQStCO0FBQzNDLFdBQU87QUFBQSxFQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxNQUFNLE1BQWMsTUFBYyxPQUF1QjtBQUN2RCxZQUFRO0FBQUEsTUFDTiwwQ0FBMEMsSUFBSSxTQUFTLElBQUksVUFBVSxLQUFLO0FBQUEsSUFDNUU7QUFJQSxRQUFJLGFBQWEsYUFBYSxJQUFJO0FBQ2xDLFVBQU0sVUFBVSxVQUFVLFVBQVUsVUFBVSxJQUFJLGdCQUFnQixLQUFLO0FBQ3ZFLFlBQVEsSUFBSSxPQUFPO0FBRW5CLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUE3QmEsYUFBTjtBQUFBLEVBRE4sY0FBYztBQUFBLEdBQ0Y7IiwKICAibmFtZXMiOiBbIlNlYXNvbiJdCn0K
