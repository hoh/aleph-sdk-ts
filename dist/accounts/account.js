"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
/**
 * The Account class is used to implement protocols related accounts - Ethereum, Solana, ...
 * It contains the account's address and public key.
 *
 * All inherited classes of account must implement the GetChain and Sign methods.
 */
class Account {
    constructor(address, publicKey) {
        this.address = address;
        this.publicKey = publicKey;
    }
}
exports.Account = Account;
