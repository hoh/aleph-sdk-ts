"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVerificationBuffer = void 0;
/**
 * Extracts some fields from an Aleph message to sign it using an account.
 *
 * @param message The message used to extract data.
 */
function GetVerificationBuffer(message) {
    return Buffer.from(`${message.chain}\n${message.sender}\n${message.type}\n${message.item_hash}`);
}
exports.GetVerificationBuffer = GetVerificationBuffer;
