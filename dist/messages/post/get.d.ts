declare type PostGetConfiguration = {
    types: string | string[];
    APIServer: string;
    pagination: number;
    page: number;
    refs: string[];
    addresses: string[];
    tags: string[];
    hashes: string[];
};
declare type PostResponse<T> = {
    _id: {
        $oid: string;
    };
    chain: string;
    item_hash: string;
    sender: string;
    type: string;
    channel: string;
    confirmed: boolean;
    content: T;
    item_content: string;
    item_type: string;
    signature: string;
    size: number;
    time: number;
    original_item_hash: string;
    original_signature: string;
    original_type: string;
    hash: string;
    address: string;
};
declare type PostQueryResponse<T> = {
    posts: PostResponse<T>[];
    pagination_page: number;
    pagination_total: number;
    pagination_per_page: number;
    pagination_item: string;
};
/**
 * Retrieves a post message on from the Aleph network.
 * It uses the type(s) provided in the configuration given as a parameter to retrieve the wanted message.
 * It also uses the pagination and page parameter to limit the number of messages to retrieve.
 *
 * @param configuration The configuration used to get the message, including the API endpoint.
 */
export declare function Get<T>(configuration: PostGetConfiguration): Promise<PostQueryResponse<T>>;
export {};
