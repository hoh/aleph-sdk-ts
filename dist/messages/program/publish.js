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
const message_1 = require("../message");
const index_1 = require("../../messages/store/index");
const programModel_1 = require("./programModel");
const publish_1 = require("../create/publish");
const signature_1 = require("../create/signature");
// TODO: Check that program_ref, runtime and data_ref exist
// Guard some numbers values
function publish(configuration) {
    return __awaiter(this, void 0, void 0, function* () {
        const timestamp = Date.now() / 1000;
        const storageEngine = message_1.ItemType.storage;
        // Store the source code of the program and retrieve the hash.
        const programRef = yield (0, index_1.Publish)({
            channel: configuration.channel,
            APIServer: configuration.APIServer,
            account: configuration.account,
            storageEngine: storageEngine,
            fileObject: configuration.file,
        });
        let triggers = { http: true };
        if (configuration.subscription) {
            triggers = Object.assign(Object.assign({}, triggers), { message: configuration.subscription });
        }
        const content = {
            address: configuration.account.address,
            time: timestamp,
            type: programModel_1.MachineType.vm_function,
            allow_amend: false,
            code: {
                encoding: programModel_1.Encoding.zip,
                entrypoint: configuration.entrypoint,
                ref: programRef.item_hash,
                use_latest: true,
            },
            on: triggers,
            environment: {
                reproducible: false,
                internet: true,
                aleph_api: true,
                shared_cache: false,
            },
            resources: {
                vcpus: 1,
                memory: configuration.memory ? configuration.memory : 128,
                seconds: 30,
            },
            runtime: {
                ref: configuration.runtime
                    ? configuration.runtime
                    : "bd79839bf96e595a06da5ac0b6ba51dea6f7e2591bb913deccded04d831d29f4",
                use_latest: true,
                comment: "Aleph Alpine Linux with Python 3.8",
            },
            volumes: configuration.volumes ? configuration.volumes : [],
        };
        const message = {
            chain: configuration.account.GetChain(),
            channel: configuration.channel,
            confirmed: false,
            item_type: storageEngine,
            sender: configuration.account.address,
            signature: "",
            size: 0,
            item_content: "",
            item_hash: "",
            time: timestamp,
            type: message_1.MessageType.program,
            content: content,
        };
        yield (0, publish_1.PutContentToStorageEngine)({
            message: message,
            content: content,
            inlineRequested: true,
            storageEngine: storageEngine,
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
