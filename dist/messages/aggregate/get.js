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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = void 0;
const axios_1 = __importDefault(require("axios"));
const global_1 = require("../../global");
/**
 * Retrieves an aggregate message on from the Aleph network.
 * It uses the address & key(s) provided in the configuration given as a parameter to retrieve the wanted message.
 *
 * @param configuration The configuration used to get the message, including the API endpoint.
 */
function Get({ APIServer = global_1.DEFAULT_API_V2, address = "", keys = [] } = {
    APIServer: global_1.DEFAULT_API_V2,
    address: "",
    keys: [],
}) {
    return __awaiter(this, void 0, void 0, function* () {
        const _keys = keys.length === 0 ? null : keys.join(",");
        const response = yield axios_1.default.get(`${APIServer}/api/v0/aggregates/${address}.json`, {
            params: {
                keys: _keys,
            },
        });
        if (!response.data.data) {
            throw new Error("no aggregate found");
        }
        return response.data.data;
    });
}
exports.Get = Get;
