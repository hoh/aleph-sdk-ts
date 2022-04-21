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
exports.NewAccount = exports.ImportAccountFromPrivateKey = exports.SOLAccount = void 0;
const account_1 = require("./account");
const message_1 = require("../messages/message");
const messages_1 = require("../messages");
const solanajs = __importStar(require("@solana/web3.js"));
const tweetnacl_1 = __importDefault(require("tweetnacl"));
const bs58_1 = __importDefault(require("bs58"));
/**
 * SOLAccount implements the Account class for the Solana protocol.
 * It is used to represent an solana account when publishing a message on the Aleph network.
 */
class SOLAccount extends account_1.Account {
    constructor(wallet) {
        super(wallet.publicKey.toString(), wallet.publicKey.toString());
        this.wallet = wallet;
    }
    GetChain() {
        return message_1.Chain.SOL;
    }
    /**
     * Put content into a tweetnacl secret box for a solana account.
     * THIS ENCRYPTION IS NOT SAFE as the nonce is returned by the function.
     *
     * @param content The content to encrypt.
     */
    encrypt(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const pkey = bs58_1.default.decode(this.publicKey);
            const nonce = tweetnacl_1.default.randomBytes(tweetnacl_1.default.secretbox.nonceLength);
            const encrypt = tweetnacl_1.default.secretbox(content, nonce, pkey);
            return this.encapsulateBox({ nonce: nonce, ciphertext: encrypt });
        });
    }
    /**
     * Decrypt a given content using a solana account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = this.decapsulateBox(encryptedContent);
            const pkey = bs58_1.default.decode(this.publicKey);
            const result = tweetnacl_1.default.secretbox.open(opts.ciphertext, opts.nonce, pkey);
            if (result === null)
                throw new Error("could not decrypt");
            return Buffer.from(result);
        });
    }
    /**
     * Concat the nonce with the secret box content into a single Buffer.
     * @param opts contain the nonce used during box creation and the result of the box in ciphertext.
     * @private
     */
    encapsulateBox(opts) {
        if (!opts.nonce) {
            throw new Error("No nonce found");
        }
        return Buffer.concat([opts.nonce, opts.ciphertext]);
    }
    /**
     * Decomposed the result of the Solana's Encrypt method to be interpreted in Decrypt method.
     * @param content, A concatenation of a nonce and a Buffer used for creating a box.
     * @private
     */
    decapsulateBox(content) {
        return {
            nonce: content.slice(0, tweetnacl_1.default.secretbox.nonceLength),
            ciphertext: content.slice(tweetnacl_1.default.secretbox.nonceLength),
        };
    }
    /**
     * The Sign method provides a way to sign a given Aleph message using an solana account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * nacl is used to sign the payload with the account's private key.
     * The final message's signature is composed of the signed payload and the user's public key.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message) {
        const buffer = (0, messages_1.GetVerificationBuffer)(message);
        return new Promise((resolve) => {
            const bufferSignature = tweetnacl_1.default.sign.detached(buffer, this.wallet.secretKey);
            resolve(JSON.stringify({
                signature: bs58_1.default.encode(bufferSignature),
                publicKey: this.publicKey,
            }));
        });
    }
}
exports.SOLAccount = SOLAccount;
/**
 * Imports an solana account given a private key and the Keypair solana/web3js package's class.
 *
 * It creates an solana wallet containing information about the account, extracted in the SOLAccount constructor.
 *
 * @param privateKey The private key of the account to import.
 */
function ImportAccountFromPrivateKey(privateKey) {
    const wallet = solanajs.Keypair.fromSecretKey(privateKey);
    return new SOLAccount(wallet);
}
exports.ImportAccountFromPrivateKey = ImportAccountFromPrivateKey;
/**
 * Creates a new solana account using a randomly generated solana keypair.
 */
function NewAccount() {
    const account = new solanajs.Keypair();
    return { account: ImportAccountFromPrivateKey(account.secretKey), privateKey: account.secretKey };
}
exports.NewAccount = NewAccount;
