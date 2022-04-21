/// <reference types="node" />
import { ethers } from "ethers";
import { Account } from "./account";
import { BaseMessage, Chain } from "../messages/message";
/**
 * ETHAccount implements the Account class for the Ethereum protocol.
 * It is used to represent an ethereum account when publishing a message on the Aleph network.
 */
export declare class ETHAccount extends Account {
    private wallet;
    constructor(wallet: ethers.Wallet);
    GetChain(): Chain;
    /**
     * Encrypt a content using the user's public key for an Ethereum account.
     *
     * @param content The content to encrypt.
     */
    encrypt(content: Buffer): Buffer;
    /**
     * Decrypt a given content using an ETHAccount.
     *
     * @param encryptedContent The encrypted content to decrypt.
     */
    decrypt(encryptedContent: Buffer): Buffer;
    /**
     * The Sign method provides a way to sign a given Aleph message using an ethereum account.
     * The full message is not used as the payload, only fields of the BaseMessage type are.
     *
     * The signMessage method of the package 'ethers' is used as the signature method.
     *
     * @param message The Aleph message to sign, using some of its fields.
     */
    Sign(message: BaseMessage): Promise<string>;
}
/**
 * Imports an ethereum account given a mnemonic and the 'ethers' package.
 *
 * It creates an ethereum wallet containing information about the account, extracted in the ETHAccount constructor.
 *
 * @param mnemonic The mnemonic of the account to import.
 * @param derivationPath The derivation path used to retrieve the list of accounts attached to the given mnemonic.
 */
export declare function ImportAccountFromMnemonic(mnemonic: string, derivationPath?: string): ETHAccount;
/**
 * Imports an ethereum account given a private key and the 'ethers' package.
 *
 * It creates an ethereum wallet containing information about the account, extracted in the ETHAccount constructor.
 *
 * @param privateKey The private key of the account to import.
 */
export declare function ImportAccountFromPrivateKey(privateKey: string): ETHAccount;
/**
 * Creates a new ethereum account using a generated mnemonic following BIP 39 standard.
 *
 * @param derivationPath
 */
export declare function NewAccount(derivationPath?: string): {
    account: ETHAccount;
    mnemonic: string;
};
