declare type StoreGetConfiguration = {
    fileHash: string;
    APIServer: string;
};
/**
 * Retrieves a store message, i.e. a message containing a File.
 *
 * @param configuration The message hash and the API Server endpoint to make the query.
 */
export declare function Get(configuration: StoreGetConfiguration): Promise<ArrayBuffer>;
export {};
