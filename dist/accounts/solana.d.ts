/// <reference types="node" />
import { Account } from "./account";
import { BaseMessage, Chain } from "../messages/message";
import * as solanajs from "@solana/web3.js";
/**
 * SOLAccount implements the Account class for the Solana protocol.
 * It is used to represent an solana account when publishing a message on the Aleph network.
 */
export declare class SOLAccount extends Account {
    private wallet;
    constructor(wallet: solanajs.Keypair);
    GetChain(): Chain;
    /**
     * Put content into a tweetnacl secret box for a solana account.
     * THIS ENCRYPTION IS NOT SAFE as the nonce is returned by the function.
     *
     * @param content The content to encrypt.
     */
    encrypt(content: Buffer): Promise<Buffer>;
    /**
     * Decrypt a given content using a solana account.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent: Buffer): Promise<Buffer>;
    /**
     * Concat the nonce with the secret box content into a single Buffer.
     * @param opts contain the nonce used during box creation and the result of the box in ciphertext.
     * @private
     */
    private encapsulateBox;
    /**
     * Decomposed the result of the Solana's Encrypt method to be interpreted in Decrypt method.
     * @param content, A concatenation of a nonce and a Buffer used for creating a box.
     * @private
     */
    private decapsulateBox;
    /**
     * The Sign method provides a way to sign a given Aleph message using an solana account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * nacl is used to sign the payload with the account's private key.
     * The final message's signature is composed of the signed payload and the user's public key.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message: BaseMessage): Promise<string>;
}
/**
 * Imports an solana account given a private key and the Keypair solana/web3js package's class.
 *
 * It creates an solana wallet containing information about the account, extracted in the SOLAccount constructor.
 *
 * @param privateKey The private key of the account to import.
 */
export declare function ImportAccountFromPrivateKey(privateKey: Uint8Array): SOLAccount;
/**
 * Creates a new solana account using a randomly generated solana keypair.
 */
export declare function NewAccount(): {
    account: SOLAccount;
    privateKey: Uint8Array;
};
