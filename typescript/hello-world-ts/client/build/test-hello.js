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
const hello_sdk_1 = require("./sdk/hello.sdk");
/**
 * Client that makes requests to the HelloWorldService deployed on genez.io.
 *
 * Before running this script, run either "genezio deploy" or "genezio local".
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Use the SDK to make requests to the Hello World Service.
    console.log(yield hello_sdk_1.HelloWorld.hello("George", "Tenerife", hello_sdk_1.Season.Winter));
}))();
