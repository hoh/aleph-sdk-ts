/// <reference types="node" />
import * as base from "../../accounts/account";
import { ItemType, StoreMessage } from "../message";
declare type StorePublishConfiguration = {
    channel: string;
    account: base.Account;
    fileObject: Buffer | Blob;
    storageEngine: ItemType;
    APIServer: string;
};
/**
 * Publishes a store message, containing a File.
 * You also have to provide default message properties, such as the targeted channel or the account used to sign the message.
 *
 * @param spc The configuration used to publish a store message.
 */
export declare function Publish(spc: StorePublishConfiguration): Promise<StoreMessage>;
export {};
