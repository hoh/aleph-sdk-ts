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
exports.PushFileToStorageEngine = exports.PutContentToStorageEngine = void 0;
const sha_js_1 = __importDefault(require("sha.js"));
const message_1 = require("../message");
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
/**
 * This function is used to update the Aleph message's fields and then publish it to the targeted storage engine.
 *
 * @param configuration The configuration used to update & publish the message.
 */
function PutContentToStorageEngine(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        if (configuration.inlineRequested) {
            const serialized = JSON.stringify(configuration.content);
            if (serialized.length > 150000) {
                configuration.inlineRequested = false;
            }
            else {
                configuration.message.item_type = message_1.ItemType.inline;
                configuration.message.item_content = serialized;
                configuration.message.item_hash = new sha_js_1.default.sha256().update(serialized).digest("hex");
            }
        }
        if (!configuration.inlineRequested) {
            configuration.message.item_type = configuration.storageEngine;
            configuration.message.item_hash = yield PushToStorageEngine({
                content: configuration.content,
                APIServer: configuration.APIServer,
                storageEngine: configuration.storageEngine,
            });
        }
    });
}
exports.PutContentToStorageEngine = PutContentToStorageEngine;
function PushToStorageEngine(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.post(`${configuration.APIServer}/api/v0/${configuration.storageEngine.toLowerCase()}/add_json`, configuration.content, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data.hash;
    });
}
function PushFileToStorageEngine(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        const isBrowser = typeof FormData !== "undefined";
        let form;
        if (isBrowser) {
            form = new FormData();
            form.append("file", new Blob([configuration.file]));
        }
        else {
            form = new form_data_1.default();
            form.append("file", configuration.file, "File");
        }
        const response = yield axios_1.default.post(`${configuration.APIServer}/api/v0/${configuration.storageEngine.toLowerCase()}/add_file`, form, {
            headers: {
                "Content-Type": isBrowser
                    ? undefined
                    : `multipart/form-data; boundary=${form.getBoundary()}`,
            },
        });
        return response.data.hash;
    });
}
exports.PushFileToStorageEngine = PushFileToStorageEngine;
