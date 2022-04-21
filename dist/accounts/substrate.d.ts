/// <reference types="node" />
import { Account } from "./account";
import { BaseMessage, Chain } from "../messages/message";
import { KeyringPair } from "@polkadot/keyring/types";
/**
 * DOTAccount implements the Account class for the substrate protocol.
 *  It is used to represent a substrate account when publishing a message on the Aleph network.
 */
export declare class DOTAccount extends Account {
    private pair;
    constructor(pair: KeyringPair);
    GetChain(): Chain;
    /**
     * The Sign method provides a way to sign a given Aleph message using a substrate account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The sign method of the package 'polkadot' is used as the signature method.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message: BaseMessage): Promise<string>;
    /**
     * Encrypt a content using the user's public key for a Substrate account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content: Buffer): Buffer;
    /**
     * Decrypt a given content using a NULS account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent: Buffer): Buffer | null;
}
/**
 * Creates a new substrate account using a randomly generated substrate keyring.
 */
export declare function NewAccount(): Promise<{
    account: DOTAccount;
    mnemonic: string;
}>;
/**
 * Imports a substrate account given a mnemonic and the 'polkadot' package.
 *
 * It creates an substrate wallet containing information about the account, extracted in the DOTAccount constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 */
export declare function ImportAccountFromMnemonic(mnemonic: string): Promise<DOTAccount>;
/**
 * Imports a substrate account given a private key and the 'polkadot/keyring' package's class.
 *
 * It creates a substrate wallet containing information about the account, extracted in the DOTAccount constructor.
 *
 * @param privateKey The private key of the account to import.
 */
export declare function ImportAccountFromPrivateKey(privateKey: string): Promise<DOTAccount>;
