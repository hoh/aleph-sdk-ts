/// <reference types="node" />
import { BaseMessage, ItemType } from "../message";
/**
 * message:         The message to update and then publish.
 *
 * content:         The message's content to put in the message.
 *
 * inlineRequested: Will the message be inlined ?
 *
 * storageEngine:   The storage engine to used when storing the message (IPFS or Aleph).
 *
 * APIServer:       The API server endpoint used to carry the request to the Aleph's network.
 */
declare type PutConfiguration<T> = {
    message: BaseMessage;
    content: T;
    inlineRequested: boolean;
    storageEngine: ItemType;
    APIServer: string;
};
declare type PushFileConfiguration = {
    file: Buffer | Blob;
    APIServer: string;
    storageEngine: ItemType;
};
/**
 * This function is used to update the Aleph message's fields and then publish it to the targeted storage engine.
 *
 * @param configuration The configuration used to update & publish the message.
 */
export declare function PutContentToStorageEngine<T>(configuration: PutConfiguration<T>): Promise<void>;
export declare function PushFileToStorageEngine(configuration: PushFileConfiguration): Promise<string>;
export {};
