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
 * Publishes an aggregate message to the Aleph network.
 *
 * The message's content must respect the following format :
 * {
 *     k_1: v_1,
 *     k_2: v_2,
 * }
 *
 * This message must be indexed using a key, you can provide in the configuration.
 *
 * @param configuration The configuration used to publish the aggregate message.
 */
function Publish(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = Date.now() / 1000;
        const content = {
            address: configuration.account.address,
            key: configuration.key,
            time: timestamp,
            content: configuration.content,
        };
        const message = {
            chain: configuration.account.GetChain(),
            channel: configuration.channel,
            sender: configuration.account.address,
            type: message_1.MessageType.aggregate,
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
exports.Publish = Publish;
