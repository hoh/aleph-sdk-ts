import { Account } from "../../accounts/account";
import { ItemType, AggregateContentKey, AggregateMessage } from "../message";
/**
 * account:         The account used to sign the aggregate message.
 *
 * key:             The key used to index the aggregate message.
 *
 * content:         The aggregate message content.
 *
 * channel:         The channel in which the message will be published.
 *
 * storageEngine:   The storage engine to used when storing the message (IPFS or Aleph).
 *
 * inlineRequested: Will the message be inlined ?
 *
 * APIServer:       The API server endpoint used to carry the request to the Aleph's network.
 */
declare type AggregatePublishConfiguration<T> = {
    account: Account;
    key: string | AggregateContentKey;
    content: T;
    channel: string;
    storageEngine: ItemType;
    inlineRequested: boolean;
    APIServer: string;
};
/**
 * Publishes an aggregate message to the Aleph network.
 *
 * The message's content must respect the following format :
 * {
 *     k_1: v_1,
 *     k_2: v_2,
 * }
 *
 * This message must be indexed using a key, you can provide in the configuration.
 *
 * @param configuration The configuration used to publish the aggregate message.
 */
export declare function Publish<T>(configuration: AggregatePublishConfiguration<T>): Promise<AggregateMessage<T>>;
export {};
