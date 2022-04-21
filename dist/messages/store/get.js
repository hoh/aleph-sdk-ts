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
 * Retrieves a store message, i.e. a message containing a File.
 *
 * @param configuration The message hash and the API Server endpoint to make the query.
 */
function Get(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`${configuration.APIServer}/api/v0/storage/raw/${configuration.fileHash}?find`, {
            responseType: "arraybuffer",
        });
        return response.data;
    });
}
exports.Get = Get;
