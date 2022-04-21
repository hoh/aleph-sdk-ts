/// <reference types="node" />
import { BaseMessage } from "./message";
/**
 * Extracts some fields from an Aleph message to sign it using an account.
 *
 * @param message The message used to extract data.
 */
export declare function GetVerificationBuffer(message: BaseMessage): Buffer;
