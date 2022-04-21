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
exports.ImportAccountFromPrivateKey = exports.ImportAccountFromMnemonic = exports.NewAccount = exports.DOTAccount = void 0;
const account_1 = require("./account");
const message_1 = require("../messages/message");
const messages_1 = require("../messages");
const keyring_1 = require("@polkadot/keyring");
const util_crypto_1 = require("@polkadot/util-crypto");
const bip39_1 = require("@polkadot/util-crypto/mnemonic/bip39");
/**
 * DOTAccount implements the Account class for the substrate protocol.
 *  It is used to represent a substrate account when publishing a message on the Aleph network.
 */
class DOTAccount extends account_1.Account {
    constructor(pair) {
        const publicKey = Buffer.from(pair.publicKey).toString("hex");
        super(pair.address, publicKey);
        this.pair = pair;
    }
    GetChain() {
        return message_1.Chain.DOT;
    }
    /**
     * The Sign method provides a way to sign a given Aleph message using a substrate account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The sign method of the package 'polkadot' is used as the signature method.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message) {
        const buffer = (0, messages_1.GetVerificationBuffer)(message);
        return new Promise((resolve) => {
            const signed = `0x${Buffer.from(this.pair.sign(buffer)).toString("hex")}`;
            resolve(JSON.stringify({
                curve: "sr25519",
                data: signed,
            }));
        });
    }
    /**
     * Encrypt a content using the user's public key for a Substrate account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content) {
        return Buffer.from(this.pair.encryptMessage(content, this.pair.address));
    }
    /**
     * Decrypt a given content using a NULS account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent) {
        const res = this.pair.decryptMessage(encryptedContent, this.pair.address);
        if (res)
            return Buffer.from(res);
        throw "Error: This message can't be decoded";
    }
}
exports.DOTAccount = DOTAccount;
/**
 * Creates a new substrate account using a randomly generated substrate keyring.
 */
function NewAccount() {
    return __awaiter(this, void 0, void 0, function* () {
        const mnemonic = (0, bip39_1.generateMnemonic)();
        return { account: yield ImportAccountFromMnemonic(mnemonic), mnemonic: mnemonic };
    });
}
exports.NewAccount = NewAccount;
/**
 * Imports a substrate account given a mnemonic and the 'polkadot' package.
 *
 * It creates an substrate wallet containing information about the account, extracted in the DOTAccount constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 */
function ImportAccountFromMnemonic(mnemonic) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyRing = new keyring_1.Keyring({ type: "sr25519" });
        yield (0, util_crypto_1.cryptoWaitReady)();
        return new DOTAccount(keyRing.createFromUri(mnemonic, { name: "sr25519" }));
    });
}
exports.ImportAccountFromMnemonic = ImportAccountFromMnemonic;
/**
 * Imports a substrate account given a private key and the 'polkadot/keyring' package's class.
 *
 * It creates a substrate wallet containing information about the account, extracted in the DOTAccount constructor.
 *
 * @param privateKey The private key of the account to import.
 */
function ImportAccountFromPrivateKey(privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const keyRing = new keyring_1.Keyring({ type: "sr25519" });
        yield (0, util_crypto_1.cryptoWaitReady)();
        return new DOTAccount(keyRing.createFromUri(privateKey, { name: "sr25519" }));
    });
}
exports.ImportAccountFromPrivateKey = ImportAccountFromPrivateKey;
