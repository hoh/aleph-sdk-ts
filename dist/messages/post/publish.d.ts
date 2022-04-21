import { Account } from "../../accounts/account";
import { ItemType, PostMessage, ChainRef } from "../message";
declare type PostSubmitConfiguration<T> = {
    APIServer: string;
    ref?: string | ChainRef;
    channel: string;
    inlineRequested: boolean;
    storageEngine: ItemType;
    account: Account;
    postType: string;
    content: T;
};
/**
 * Publishes a post message to the Aleph network.
 *
 * This message must be indexed using a type, you can provide in the configuration.
 *
 * You can amend the message using the type 'amend' and by providing the reference of the message to amend (its hash).
 *
 * @param configuration The configuration used to publish the aggregate message.
 */
export declare function Publish<T>(configuration: PostSubmitConfiguration<T>): Promise<PostMessage<T>>;
export {};
