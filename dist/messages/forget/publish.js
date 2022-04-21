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
exports.publish = void 0;
const publish_1 = require("../create/publish");
const message_1 = require("../message");
const signature_1 = require("../create/signature");
/**
 * Submit a forget object to remove content from a Post message on the network.
 *
 * Account submitting the forget message. Should either be:
 * The sender of the original message to forget.
 * the sender of the VM that created the message.
 * The address the original message was attributed to.
 *
 * @param configuration The configuration used to publish the forget message.
 */
function publish(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = Date.now() / 1000;
        const content = {
            address: configuration.account.address,
            time: timestamp,
            hashes: configuration.hashes,
            reason: configuration.reason ? configuration.reason : "None",
        };
        const message = {
            chain: configuration.account.GetChain(),
            sender: configuration.account.address,
            type: message_1.MessageType.forget,
            channel: configuration.channel,
            confirmed: false,
            signature: "",
            size: 0,
            time: timestamp,
            item_type: configuration.storageEngine,
            item_content: "",
            item_hash: "",
            content: content,
        };
        yield (0, publish_1.PutContentToStorageEngine)({
            message: message,
            content: content,
            inlineRequested: configuration.inlineRequested,
            storageEngine: configuration.storageEngine,
            APIServer: configuration.APIServer,
        });
        yield (0, signature_1.SignAndBroadcast)({
            message: message,
            account: configuration.account,
            APIServer: configuration.APIServer,
        });
        return message;
    });
}
exports.publish = publish;
