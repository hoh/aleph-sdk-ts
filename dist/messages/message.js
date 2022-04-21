"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemType = exports.MessageType = exports.HashType = exports.Chain = void 0;
var Chain;
(function (Chain) {
    Chain["DOT"] = "DOT";
    Chain["ETH"] = "ETH";
    Chain["SOL"] = "SOL";
    Chain["NULS"] = "NULS";
    Chain["NULS2"] = "NULS2";
    Chain["AVAX"] = "AVAX";
    Chain["CSDK"] = "CSDK";
    Chain["NEO"] = "NEO";
})(Chain = exports.Chain || (exports.Chain = {}));
/**
 * Supported hash functions
 */
var HashType;
(function (HashType) {
    HashType["sha256"] = "sha256";
})(HashType = exports.HashType || (exports.HashType = {}));
/**
 * Message types supported by Aleph
 *
 * Warning: Program is currently not supported by the TS sdk.
 */
var MessageType;
(function (MessageType) {
    MessageType["post"] = "POST";
    MessageType["aggregate"] = "AGGREGATE";
    MessageType["store"] = "STORE";
    MessageType["program"] = "PROGRAM";
    MessageType["forget"] = "FORGET";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
var ItemType;
(function (ItemType) {
    ItemType["inline"] = "inline";
    ItemType["storage"] = "storage";
    ItemType["ipfs"] = "ipfs";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
