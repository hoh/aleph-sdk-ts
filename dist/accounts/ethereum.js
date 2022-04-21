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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewAccount = exports.ImportAccountFromPrivateKey = exports.ImportAccountFromMnemonic = exports.ETHAccount = void 0;
const bip39 = __importStar(require("bip39"));
const ethers_1 = require("ethers");
const account_1 = require("./account");
const messages_1 = require("../messages");
const message_1 = require("../messages/message");
const eciesjs_1 = require("eciesjs");
/**
 * ETHAccount implements the Account class for the Ethereum protocol.
 * It is used to represent an ethereum account when publishing a message on the Aleph network.
 */
class ETHAccount extends account_1.Account {
    constructor(wallet) {
        super(wallet.address, wallet.publicKey);
        this.wallet = wallet;
    }
    GetChain() {
        return message_1.Chain.ETH;
    }
    /**
     * Encrypt a content using the user's public key for an Ethereum account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content) {
        return (0, eciesjs_1.encrypt)(this.publicKey, content);
    }
    /**
     * Decrypt a given content using an ETHAccount.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent) {
        const secret = this.wallet.privateKey;
        return (0, eciesjs_1.decrypt)(secret, encryptedContent);
    }
    /**
     * The Sign method provides a way to sign a given Aleph message using an ethereum account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The signMessage method of the package 'ethers' is used as the signature method.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message) {
        const buffer = (0, messages_1.GetVerificationBuffer)(message);
        return new Promise((resolve) => {
            resolve(this.wallet.signMessage(buffer.toString()));
        });
    }
}
exports.ETHAccount = ETHAccount;
/**
 * Imports an ethereum account given a mnemonic and the 'ethers' package.
 *
 * It creates an ethereum wallet containing information about the account, extracted in the ETHAccount constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 * @param derivationPath The derivation path used to retrieve the list of accounts attached to the given mnemonic.
 */
function ImportAccountFromMnemonic(mnemonic, derivationPath = "m/44'/60'/0'/0/0") {
    const wallet = ethers_1.ethers.Wallet.fromMnemonic(mnemonic, derivationPath);
    return new ETHAccount(wallet);
}
exports.ImportAccountFromMnemonic = ImportAccountFromMnemonic;
/**
 * Imports an ethereum account given a private key and the 'ethers' package.
 *
 * It creates an ethereum wallet containing information about the account, extracted in the ETHAccount constructor.
 *
 * @param privateKey The private key of the account to import.
 */
function ImportAccountFromPrivateKey(privateKey) {
    const wallet = new ethers_1.ethers.Wallet(privateKey);
    return new ETHAccount(wallet);
}
exports.ImportAccountFromPrivateKey = ImportAccountFromPrivateKey;
/**
 * Creates a new ethereum account using a generated mnemonic following BIP 39 standard.
 *
 * @param derivationPath
 */
function NewAccount(derivationPath = "m/44'/60'/0'/0/0") {
    const mnemonic = bip39.generateMnemonic();
    return { account: ImportAccountFromMnemonic(mnemonic, derivationPath), mnemonic: mnemonic };
}
exports.NewAccount = NewAccount;
