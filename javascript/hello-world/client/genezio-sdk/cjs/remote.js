"use strict";
/**
* This is an auto generated code. This code should not be modified since the file can be overwritten
* if new genezio commands are executed.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remote = void 0;
var http = null;
var https = null;
var importDone = false;
function importModules() {
    return __awaiter(this, void 0, void 0, function () {
        var httpModule, httpsModule;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(typeof process !== "undefined" && process.versions != null && process.versions.node != null)) return [3 /*break*/, 3];
                    httpModule = 'http';
                    return [4 /*yield*/, Promise.resolve("".concat(httpModule)).then(function (s) { return require(s); })];
                case 1:
                    http = _a.sent();
                    httpsModule = 'https';
                    return [4 /*yield*/, Promise.resolve("".concat(httpsModule)).then(function (s) { return require(s); })];
                case 2:
                    https = _a.sent();
                    _a.label = 3;
                case 3:
                    importDone = true;
                    return [2 /*return*/];
            }
        });
    });
}
function makeRequestBrowser(request, url) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("".concat(url), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(request),
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.json()];
            }
        });
    });
}
function makeRequestNode(request, url, agent) {
    return __awaiter(this, void 0, void 0, function () {
        var data, hostUrl, options, client;
        return __generator(this, function (_a) {
            data = JSON.stringify(request);
            hostUrl = new URL(url);
            options = {
                hostname: hostUrl.hostname,
                path: hostUrl.search ? hostUrl.pathname + hostUrl.search : hostUrl.pathname,
                port: hostUrl.port,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                },
                agent: agent,
            };
            client = url.includes('https') ? https : http;
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var req = client.request(options, function (res) {
                        var body = '';
                        res.on('data', function (d) {
                            body += d;
                        });
                        res.on('end', function () {
                            return __awaiter(this, void 0, void 0, function () {
                                var response;
                                return __generator(this, function (_a) {
                                    response = JSON.parse(body);
                                    resolve(response);
                                    return [2 /*return*/];
                                });
                            });
                        });
                    });
                    req.on('error', function (error) {
                        reject(error);
                    });
                    req.write(data);
                    req.end();
                })];
        });
    });
}
/**
* The class through which all request to the Genezio backend will be passed.
*/
var Remote = /** @class */ (function () {
    function Remote(url) {
        this.url = undefined;
        this.agent = undefined;
        this.url = url;
        if (http !== null && https !== null) {
            var client = url.includes("https") ? https : http;
            this.agent = new client.Agent({ keepAlive: true });
        }
    }
    Remote.prototype.call = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var requestContent, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestContent = { "jsonrpc": "2.0", "method": method, "params": args, "id": 3 };
                        response = undefined;
                        if (!!importDone) return [3 /*break*/, 2];
                        return [4 /*yield*/, importModules()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(http !== null && https !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, makeRequestNode(requestContent, this.url, this.agent)];
                    case 3:
                        response = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, makeRequestBrowser(requestContent, this.url)];
                    case 5:
                        response = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (response.error) {
                            return [2 /*return*/, response.error.message];
                        }
                        return [2 /*return*/, response.result];
                }
            });
        });
    };
    return Remote;
}());
exports.Remote = Remote;
