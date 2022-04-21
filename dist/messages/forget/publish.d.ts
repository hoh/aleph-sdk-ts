import { ForgetMessage, ItemType } from "../message";
import { Account } from "../../accounts/account";
/**
 * account:         The account used to sign the forget object.
 *
 * channel:         The channel in which the object will be published.
 *
 * storageEngine:   The storage engine to used when storing the object (IPFS or Aleph).
 *
 * inlineRequested: Will the message be inlined ?
 *
 * APIServer:       The API server endpoint used to carry the request to the Aleph's network.
 *
 * hashes:          The Hashes of the Aleph's message to forget.
 *
 * reason:          An optional reason to justify this action (default value: "None").
 */
declare type ForgetPublishConfiguration = {
    account: Account;
    channel: string;
    storageEngine: ItemType;
    inlineRequested: boolean;
    APIServer: string;
    hashes: string[];
    reason?: string;
};
/**
 * Submit a forget object to remove content from a Post message on the network.
 *
 * Account submitting the forget message. Should either be:
 * The sender of the original message to forget.
 * the sender of the VM that created the message.
 * The address the original message was attributed to.
 *
 * @param configuration The configuration used to publish the forget message.
 */
export declare function publish(configuration: ForgetPublishConfiguration): Promise<ForgetMessage>;
export {};
