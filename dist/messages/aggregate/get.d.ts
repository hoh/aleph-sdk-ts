declare type AggregateGetConfiguration = {
    APIServer?: string;
    address: string;
    keys?: Array<string>;
};
/**
 * Retrieves an aggregate message on from the Aleph network.
 * It uses the address & key(s) provided in the configuration given as a parameter to retrieve the wanted message.
 *
 * @param configuration The configuration used to get the message, including the API endpoint.
 */
export declare function Get<T>({ APIServer, address, keys }?: AggregateGetConfiguration): Promise<T>;
export {};
