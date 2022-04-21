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
exports.Publish = void 0;
const message_1 = require("../message");
const publish_1 = require("../create/publish");
const signature_1 = require("../create/signature");
/**
 * Publishes a store message, containing a File.
 * You also have to provide default message properties, such as the targeted channel or the account used to sign the message.
 *
 * @param spc The configuration used to publish a store message.
 */
function Publish(spc) {
    return __awaiter(this, void 0, void 0, function* () {
        const hash = yield (0, publish_1.PushFileToStorageEngine)({
            APIServer: spc.APIServer,
            storageEngine: spc.storageEngine,
            file: spc.fileObject,
        });
        const timestamp = Date.now() / 1000;
        const content = {
            address: spc.account.address,
            item_type: spc.storageEngine,
            item_hash: hash,
            time: timestamp,
        };
        const message = {
            signature: "",
            chain: spc.account.GetChain(),
            sender: spc.account.address,
            type: message_1.MessageType.store,
            channel: spc.channel,
            confirmed: false,
            time: timestamp,
            size: 0,
            item_type: spc.storageEngine,
            item_content: "",
            item_hash: "",
            content: content,
        };
        yield (0, publish_1.PutContentToStorageEngine)({
            message: message,
            content: content,
            inlineRequested: true,
            storageEngine: spc.storageEngine,
            APIServer: spc.APIServer,
        });
        yield (0, signature_1.SignAndBroadcast)({
            message: message,
            account: spc.account,
            APIServer: spc.APIServer,
        });
        return message;
    });
}
exports.Publish = Publish;
