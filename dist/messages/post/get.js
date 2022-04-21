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
/**
 * Retrieves a post message on from the Aleph network.
 * It uses the type(s) provided in the configuration given as a parameter to retrieve the wanted message.
 * It also uses the pagination and page parameter to limit the number of messages to retrieve.
 *
 * @param configuration The configuration used to get the message, including the API endpoint.
 */
function Get(configuration) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const params = {
            types: configuration.types,
            pagination: configuration.pagination,
            page: configuration.page,
        };
        if (((_a = configuration.refs) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            params.refs = configuration.refs.join(",");
        }
        if (((_b = configuration.addresses) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            params.addresses = configuration.addresses.join(",");
        }
        if (((_c = configuration.tags) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            params.tags = configuration.tags.join(",");
        }
        if (((_d = configuration.hashes) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            params.hashes = configuration.hashes.join(",");
        }
        const response = yield axios_1.default.get(`${configuration.APIServer}/api/v0/posts.json`, {
            params,
        });
        return response.data;
    });
}
exports.Get = Get;
