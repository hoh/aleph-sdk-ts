/// <reference types="node" />
import { Account } from "../../accounts/account";
import { ItemType, ProgramMessage } from "../message";
import { MachineVolume } from "./programModel";
declare type ProgramPublishConfiguration = {
    account: Account;
    channel: string;
    storageEngine: ItemType;
    inlineRequested: boolean;
    APIServer: string;
    file: Buffer | Blob;
    entrypoint: string;
    subscription?: Record<string, unknown>[];
    memory?: number;
    runtime?: string;
    volumes?: MachineVolume[];
};
export declare function publish(configuration: ProgramPublishConfiguration): Promise<ProgramMessage>;
export {};
