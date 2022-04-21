"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ImportAccountFromPrivateKey = exports.ImportAccountFromMnemonic = exports.NewAccount = exports.NULS2Account = void 0;
const bip39 = __importStar(require("bip39"));
const bip32 = __importStar(require("bip32"));
const secp256k1_1 = __importDefault(require("secp256k1"));
const bip39_1 = require("bip39");
const account_1 = require("./account");
const message_1 = require("../messages/message");
const messages_1 = require("../messages");
const nuls_1 = require("./nuls");
const eciesjs_1 = require("eciesjs");
/**
 *  NULS2Account implements the Account class for the NULS2 protocol.
 *  It is used to represent a NULS2 account when publishing a message on the Aleph network.
 */
class NULS2Account extends account_1.Account {
    constructor(address, publicKey, privateKey) {
        super(address, publicKey);
        this.privateKey = privateKey;
    }
    GetChain() {
        return message_1.Chain.NULS2;
    }
    /**
     * Encrypt a content using the user's public key for a NULS2 account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content) {
        return (0, eciesjs_1.encrypt)(this.publicKey, content);
    }
    /**
     * Decrypt a given content using a NULS2 account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent) {
        return (0, eciesjs_1.decrypt)(this.privateKey, encryptedContent);
    }
    /**
     * The Sign method provides a way to sign a given Aleph message using a NULS2 account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The message's signature is based on `secp256k1` package.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message) {
        const digest = (0, nuls_1.magicHash)((0, messages_1.GetVerificationBuffer)(message));
        const privateKeyBuffer = Buffer.from(this.privateKey, "hex");
        return new Promise((resolve) => {
            const sigObj = secp256k1_1.default.ecdsaSign(digest, privateKeyBuffer);
            const signature = this.EncodeSignature(sigObj.signature, sigObj.recid, false);
            resolve(signature.toString("base64"));
        });
    }
    /**
     * Append the recovery of the signature to a signature and compress it if required.
     *
     * @param signature The signature to encode.
     * @param recovery The recovery to append.
     * @param compressed The optional compress flag.
     */
    EncodeSignature(signature, recovery, compressed) {
        if (compressed)
            recovery += 4;
        return Buffer.concat([Buffer.alloc(1, recovery + 27), signature]);
    }
}
exports.NULS2Account = NULS2Account;
/**
 * Creates a new NULS2 account using a randomly generated private key.
 *
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
function NewAccount({ chain_id = 1, prefix = "NULS" } = { chain_id: 1, prefix: "NULS" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const mnemonic = (0, bip39_1.generateMnemonic)();
        return {
            account: yield ImportAccountFromMnemonic(mnemonic, { chain_id: chain_id, prefix: prefix }),
            mnemonic: mnemonic,
        };
    });
}
exports.NewAccount = NewAccount;
/**
 * Imports a NULS2 account given a mnemonic.
 *
 * It creates an NULS2 account containing information about the account, extracted in the NULS2Account constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
function ImportAccountFromMnemonic(mnemonic, { chain_id = 1, prefix = "NULS" } = { chain_id: 1, prefix: "NULS" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const v = yield bip39.mnemonicToSeed(mnemonic);
        const b = bip32.fromSeed(v);
        if (!b || !b.privateKey)
            throw new Error("could not import from mnemonic");
        const privateKey = b.privateKey.toString("hex");
        return ImportAccountFromPrivateKey(privateKey, { chain_id: chain_id, prefix: prefix });
    });
}
exports.ImportAccountFromMnemonic = ImportAccountFromMnemonic;
/**
 * Imports a NULS2 account given a private key.
 *
 * It creates an NULS2 account containing information about the account, extracted in the NULS2Account constructor.
 *
 * @param privateKey The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
function ImportAccountFromPrivateKey(privateKey, { chain_id = 1, prefix = "NULS" } = { chain_id: 1, prefix: "NULS" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const pub = (0, nuls_1.privateKeyToPublicKey)(Buffer.from(privateKey, "hex"));
        const publicKey = Buffer.from(pub).toString("hex");
        const hash = (0, nuls_1.publicKeyToHash)(pub, { chain_id: chain_id });
        const address = (0, nuls_1.addressFromHash)(hash, prefix);
        return new NULS2Account(address, publicKey, privateKey);
    });
}
exports.ImportAccountFromPrivateKey = ImportAccountFromPrivateKey;
