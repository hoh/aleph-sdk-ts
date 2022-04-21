import { BaseMessage } from "../message";
import { Account } from "../../accounts/account";
declare type SignAndBroadcastConfiguration = {
    message: BaseMessage;
    account: Account;
    APIServer: string;
};
export declare function SignAndBroadcast(configuration: SignAndBroadcastConfiguration): Promise<void>;
export {};
