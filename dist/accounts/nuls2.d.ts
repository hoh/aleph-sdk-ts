/// <reference types="node" />
import { Account } from "./account";
import { BaseMessage, Chain } from "../messages/message";
export declare type NULS2ImportConfig = {
    chain_id?: number;
    prefix?: string;
};
/**
 *  NULS2Account implements the Account class for the NULS2 protocol.
 *  It is used to represent a NULS2 account when publishing a message on the Aleph network.
 */
export declare class NULS2Account extends Account {
    private readonly privateKey;
    constructor(address: string, publicKey: string, privateKey: string);
    GetChain(): Chain;
    /**
     * Encrypt a content using the user's public key for a NULS2 account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content: Buffer): Buffer;
    /**
     * Decrypt a given content using a NULS2 account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent: Buffer): Buffer;
    /**
     * The Sign method provides a way to sign a given Aleph message using a NULS2 account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The message's signature is based on `secp256k1` package.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message: BaseMessage): Promise<string>;
    /**
     * Append the recovery of the signature to a signature and compress it if required.
     *
     * @param signature The signature to encode.
     * @param recovery The recovery to append.
     * @param compressed The optional compress flag.
     */
    private EncodeSignature;
}
/**
 * Creates a new NULS2 account using a randomly generated private key.
 *
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
export declare function NewAccount({ chain_id, prefix }?: NULS2ImportConfig): Promise<{
    account: NULS2Account;
    mnemonic: string;
}>;
/**
 * Imports a NULS2 account given a mnemonic.
 *
 * It creates an NULS2 account containing information about the account, extracted in the NULS2Account constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
export declare function ImportAccountFromMnemonic(mnemonic: string, { chain_id, prefix }?: NULS2ImportConfig): Promise<NULS2Account>;
/**
 * Imports a NULS2 account given a private key.
 *
 * It creates an NULS2 account containing information about the account, extracted in the NULS2Account constructor.
 *
 * @param privateKey The mnemonic of the account to import.
 * @param chain_id The optional chain id.
 * @param prefix The optional address prefix.
 */
export declare function ImportAccountFromPrivateKey(privateKey: string, { chain_id, prefix }?: NULS2ImportConfig): Promise<NULS2Account>;
