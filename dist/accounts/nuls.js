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
exports.writeWithLength = exports.writeVarInt = exports.checkPrivateKey = exports.isHex = exports.hashTwice = exports.hashFromAddress = exports.addressFromHash = exports.publicKeyToHash = exports.privateKeyToPublicKey = exports.magicHash = exports.getXOR = exports.ImportAccountFromPrivateKey = exports.ImportAccountFromMnemonic = exports.NewAccount = exports.NULSAccount = exports.hexRegEx = void 0;
const bs58_1 = __importDefault(require("bs58"));
const sha_js_1 = __importDefault(require("sha.js"));
const bip32 = __importStar(require("bip32"));
const bip39 = __importStar(require("bip39"));
const ripemd160_1 = __importDefault(require("ripemd160"));
const secp256k1_1 = __importDefault(require("secp256k1"));
const account_1 = require("./account");
const message_1 = require("../messages/message");
const messages_1 = require("../messages");
const eciesjs_1 = require("eciesjs");
exports.hexRegEx = /([0-9]|[a-f])/gim;
/**
 *  NULSAccount implements the Account class for the NULS protocol.
 *  It is used to represent a NULS account when publishing a message on the Aleph network.
 */
class NULSAccount extends account_1.Account {
    constructor(address, publicKey, privateKey) {
        super(address, publicKey);
        this.privateKey = privateKey;
    }
    GetChain() {
        return message_1.Chain.NULS;
    }
    /**
     * Encrypt a content using the user's public key for a NULS account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content) {
        return (0, eciesjs_1.encrypt)(this.publicKey, content);
    }
    /**
     * Decrypt a given content using a NULS account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent) {
        const secret = this.privateKey;
        return (0, eciesjs_1.decrypt)(secret, encryptedContent);
    }
    /**
     * The Sign method provides a way to sign a given Aleph message using a NULS account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The message's signature is based on `secp256k1` package.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message) {
        const privateKeyBuffer = Buffer.from(this.privateKey, "hex");
        const digest = magicHash((0, messages_1.GetVerificationBuffer)(message));
        const publicKeyBuffer = privateKeyToPublicKey(privateKeyBuffer);
        return new Promise((resolve) => {
            const sigObj = secp256k1_1.default.ecdsaSign(digest, privateKeyBuffer);
            const signed = secp256k1_1.default.signatureExport(sigObj.signature);
            const buf = Buffer.alloc(3 + publicKeyBuffer.length + signed.length);
            let cursor = writeWithLength(publicKeyBuffer, buf, 0);
            cursor += 1; // we let a zero there for alg ECC type
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            cursor += writeWithLength(signed, buf, cursor);
            resolve(buf.toString("hex"));
        });
    }
}
exports.NULSAccount = NULSAccount;
/**
 * Creates a new NULS account using a randomly generated private key.
 *
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
function NewAccount({ chain_id = 1, prefix = "" } = { chain_id: 1, prefix: "" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const mnemonic = bip39.generateMnemonic();
        return {
            account: yield ImportAccountFromMnemonic(mnemonic, { chain_id: chain_id, prefix: prefix }),
            mnemonic: mnemonic,
        };
    });
}
exports.NewAccount = NewAccount;
/**
 * Imports a NULS account given a mnemonic.
 *
 * It creates an NULS account containing information about the account, extracted in the NULSAccount constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
function ImportAccountFromMnemonic(mnemonic, { chain_id = 1, prefix = "" } = { chain_id: 1, prefix: "" }) {
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
 * Imports a NULS account given a private key.
 *
 * It creates an NULS account containing information about the account, extracted in the NULSAccount constructor.
 *
 * @param privateKey The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
function ImportAccountFromPrivateKey(privateKey, { chain_id = 1, prefix = "" } = { chain_id: 1, prefix: "" }) {
    return __awaiter(this, void 0, void 0, function* () {
        const pub = privateKeyToPublicKey(Buffer.from(privateKey, "hex"));
        const publicKey = Buffer.from(pub).toString("hex");
        const hash = publicKeyToHash(pub, { chain_id: chain_id });
        const address = addressFromHash(hash, prefix);
        return new NULSAccount(address, publicKey, privateKey);
    });
}
exports.ImportAccountFromPrivateKey = ImportAccountFromPrivateKey;
/**
 * Creates a XOR of an array.
 *
 * @param body The array to XOR.
 */
function getXOR(body) {
    let xor = 0;
    for (let i = 0; i < body.length; i += 1) {
        xor ^= body[i];
    }
    return xor;
}
exports.getXOR = getXOR;
/**
 * Creates a hash from a message.
 *
 * @param message The message used to create the hash.
 * @param messagePrefix The optional message's hash prefix.
 */
function magicHash(message, messagePrefix) {
    if (!messagePrefix)
        messagePrefix = "\u0018NULS Signed Message:\n";
    if (!Buffer.isBuffer(messagePrefix))
        messagePrefix = Buffer.from(messagePrefix);
    let buffer = Buffer.allocUnsafe(messagePrefix.length + 6 + message.length);
    let cursor = messagePrefix.copy(buffer, 0);
    cursor += writeVarInt(message.length, buffer, cursor);
    cursor += Buffer.from(message).copy(buffer, cursor);
    buffer = buffer.slice(0, cursor);
    return new sha_js_1.default.sha256().update(buffer).digest();
}
exports.magicHash = magicHash;
/**
 * Extracts a public key from a given private key.
 *
 * @param privateKey The private key to extract from.
 */
function privateKeyToPublicKey(privateKey) {
    return secp256k1_1.default.publicKeyCreate(privateKey);
}
exports.privateKeyToPublicKey = privateKeyToPublicKey;
/**
 * Creates a hash from a user's public key.
 *
 * @param publicKey The public key used to create the hash.
 * @param chain_id The optional chain id.
 * @param address_type The optional address type.
 */
function publicKeyToHash(publicKey, { chain_id = 8964, address_type = 1 } = { chain_id: 8964, address_type: 1 }) {
    const sha = new sha_js_1.default.sha256().update(publicKey).digest();
    const publicKeyHash = new ripemd160_1.default().update(sha).digest();
    const output = Buffer.allocUnsafe(3);
    output.writeInt16LE(chain_id, 0);
    output.writeInt8(address_type, 2);
    return Buffer.concat([output, publicKeyHash]);
}
exports.publicKeyToHash = publicKeyToHash;
/**
 * Extract an address from a given hash.
 *
 * @param hash The hash containing the address.
 * @param prefix The optional address prefix.
 */
function addressFromHash(hash, prefix) {
    const address = bs58_1.default.encode(Buffer.concat([hash, Buffer.from([getXOR(hash)])]));
    if (prefix)
        return prefix + String.fromCharCode(prefix.length + 96) + address;
    return address;
}
exports.addressFromHash = addressFromHash;
/**
 * Extract a hash from a given user's address.
 *
 * @param address The address used to produce the hash.
 */
function hashFromAddress(address) {
    const hash = bs58_1.default.decode(address);
    return hash.slice(0, hash.length - 1);
}
exports.hashFromAddress = hashFromAddress;
/**
 * Performs a hash operation on a buffer, twice.
 *
 * @param buffer The buffer to hash twice.
 */
function hashTwice(buffer) {
    let sha = new sha_js_1.default.sha256().update(buffer).digest();
    sha = new sha_js_1.default.sha256().update(sha).digest();
    return sha;
}
exports.hashTwice = hashTwice;
/**
 * Verify if an input is in string hexadecimal format.
 *
 * @param input The input to verify.
 */
function isHex(input) {
    return typeof input === "string" && (input.match(exports.hexRegEx) || []).length === input.length;
}
exports.isHex = isHex;
/**
 * Verify if a given private key is valid.
 *
 * @param private_key The private key to verify.
 */
function checkPrivateKey(private_key) {
    if (!isHex(private_key))
        return false;
    if (!private_key)
        return false;
    if (private_key.length === 66 && private_key.substring(0, 2) === "00")
        private_key = private_key.substring(2, 66);
    if (private_key.length !== 64)
        return false;
    try {
        const privateKeyBuffer = Buffer.from(private_key, "hex");
        privateKeyToPublicKey(privateKeyBuffer);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.checkPrivateKey = checkPrivateKey;
function writeVarInt(value, buf, cursor) {
    let len = 1;
    if (value < 253) {
        buf[cursor] = value;
    }
    else if (value <= 0xffff) {
        buf[cursor] = 253;
        buf.writeUIntLE(value, cursor + 1, 2);
        len = 3;
    }
    else if (value <= 0xffffffff) {
        buf[cursor] = 254;
        buf.writeUIntLE(value, cursor + 1, 4);
        len = 5;
    }
    else {
        throw new Error("not implemented");
    }
    return len;
}
exports.writeVarInt = writeVarInt;
function writeWithLength(val, buf, cursor) {
    const llen = writeVarInt(val.length, buf, cursor);
    const vBuf = Buffer.from(val);
    const slen = vBuf.copy(buf, cursor + llen);
    return llen + slen;
}
exports.writeWithLength = writeWithLength;
