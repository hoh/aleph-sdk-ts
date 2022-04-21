/// <reference types="node" />
import { Account } from "./account";
import { BaseMessage, Chain } from "../messages/message";
export declare const hexRegEx: RegExp;
export declare type ChainNAddress = {
    chain_id?: number;
    address_type?: number;
};
export declare type NULSImportConfig = {
    chain_id?: number;
    prefix?: string;
};
/**
 *  NULSAccount implements the Account class for the NULS protocol.
 *  It is used to represent a NULS account when publishing a message on the Aleph network.
 */
export declare class NULSAccount extends Account {
    private readonly privateKey;
    constructor(address: string, publicKey: string, privateKey: string);
    GetChain(): Chain;
    /**
     * Encrypt a content using the user's public key for a NULS account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content: Buffer): Buffer;
    /**
     * Decrypt a given content using a NULS account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent: Buffer): Buffer;
    /**
     * The Sign method provides a way to sign a given Aleph message using a NULS account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The message's signature is based on `secp256k1` package.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message: BaseMessage): Promise<string>;
}
/**
 * Creates a new NULS account using a randomly generated private key.
 *
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
export declare function NewAccount({ chain_id, prefix }?: NULSImportConfig): Promise<{
    account: NULSAccount;
    mnemonic: string;
}>;
/**
 * Imports a NULS account given a mnemonic.
 *
 * It creates an NULS account containing information about the account, extracted in the NULSAccount constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
export declare function ImportAccountFromMnemonic(mnemonic: string, { chain_id, prefix }?: NULSImportConfig): Promise<NULSAccount>;
/**
 * Imports a NULS account given a private key.
 *
 * It creates an NULS account containing information about the account, extracted in the NULSAccount constructor.
 *
 * @param privateKey The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
export declare function ImportAccountFromPrivateKey(privateKey: string, { chain_id, prefix }?: NULSImportConfig): Promise<NULSAccount>;
/**
 * Creates a XOR of an array.
 *
 * @param body The array to XOR.
 */
export declare function getXOR(body: Uint8Array): number;
/**
 * Creates a hash from a message.
 *
 * @param message The message used to create the hash.
 * @param messagePrefix The optional message's hash prefix.
 */
export declare function magicHash(message: Buffer, messagePrefix?: string | Buffer): Buffer;
/**
 * Extracts a public key from a given private key.
 *
 * @param privateKey The private key to extract from.
 */
export declare function privateKeyToPublicKey(privateKey: Uint8Array): Uint8Array;
/**
 * Creates a hash from a user's public key.
 *
 * @param publicKey The public key used to create the hash.
 * @param chain_id The optional chain id.
 * @param address_type The optional address type.
 */
export declare function publicKeyToHash(publicKey: Uint8Array, { chain_id, address_type }?: ChainNAddress): Buffer;
/**
 * Extract an address from a given hash.
 *
 * @param hash The hash containing the address.
 * @param prefix The optional address prefix.
 */
export declare function addressFromHash(hash: Uint8Array, prefix?: string): string;
/**
 * Extract a hash from a given user's address.
 *
 * @param address The address used to produce the hash.
 */
export declare function hashFromAddress(address: string): Buffer;
/**
 * Performs a hash operation on a buffer, twice.
 *
 * @param buffer The buffer to hash twice.
 */
export declare function hashTwice(buffer: Buffer): Buffer;
/**
 * Verify if an input is in string hexadecimal format.
 *
 * @param input The input to verify.
 */
export declare function isHex<T>(input: T): boolean;
/**
 * Verify if a given private key is valid.
 *
 * @param private_key The private key to verify.
 */
export declare function checkPrivateKey(private_key: string): boolean;
export declare function writeVarInt(value: number, buf: Buffer, cursor: number): number;
export declare function writeWithLength(val: Uint8Array, buf: Buffer, cursor: number): number;
