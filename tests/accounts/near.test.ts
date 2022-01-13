import { BaseMessage, GetVerificationBuffer, MessageType, StorageEngine } from "../../src/messages/message";
import { ChainType } from "../../src/accounts/account";
import { DEFAULT_API_V2 } from "../../src/global";
import { aggregate, near } from "../index";
import nacl from "tweetnacl";
import base58 from "bs58";

describe("Near accounts", () => {
    it("should import a random new account", () => {
        const account = near.NewAccount();

        expect(account.address).not.toBe("");
        expect(account.publicKey).not.toBe("");
    });

    it("should import an account from a private key", () => {
        const account = near.ImportAccountFromPrivateKey(
            "32BgRyhTnsFFaQrsUz51KfaRu8B76Xr9EZEbib4rPgPEFdzn1oE9he9ZNj9yznGHrrH5NLZoMWEhvS1a3XtD23wf",
        );

        expect(account.address).toBe("c344aff8c578f48955a26c58f9d380fc53a6e7b7483b0b6b01fdeb110c92a9f2");
        expect(account.publicKey).toBe("ed25519:E9FFR5xh7naWkk5rMaVYhKWntWaA1ATEDXHTE1rePd13");
    });

    it("should sign a message with near account and verify it", async () => {
        const account = near.ImportAccountFromPrivateKey(
            "32BgRyhTnsFFaQrsUz51KfaRu8B76Xr9EZEbib4rPgPEFdzn1oE9he9ZNj9yznGHrrH5NLZoMWEhvS1a3XtD23wf",
        );

        const base: BaseMessage = {
            chain: ChainType.NEAR,
            channel: "TEST",
            confirmed: false,
            item_content: "",
            item_hash: "",
            item_type: StorageEngine.STORAGE,
            sender: "",
            signature: "",
            size: 0,
            time: 0,
            type: MessageType.Post,
        };

        const nearSigned = await account.Sign(base);
        const signatureParsed = JSON.parse(nearSigned);
        const valid = nacl.sign.detached.verify(
            GetVerificationBuffer(base),
            base58.decode(signatureParsed.signature),
            Buffer.from(account.address, "hex"),
        );
        expect(nearSigned).not.toBeNull();
        expect(valid).toBe(true);
    });

    it("should publish an aggregate message", async () => {
        const account = near.ImportAccountFromPrivateKey(
            "32BgRyhTnsFFaQrsUz51KfaRu8B76Xr9EZEbib4rPgPEFdzn1oE9he9ZNj9yznGHrrH5NLZoMWEhvS1a3XtD23wf",
        );
        const key = "neeaarr";

        const content: { A: number } = {
            A: 1,
        };

        await aggregate.Publish({
            account: account,
            key: key,
            content: content,
            channel: "TEST",
            APIServer: DEFAULT_API_V2,
            inlineRequested: true,
            storageEngine: StorageEngine.STORAGE,
        });

        type T = {
            satoshi: {
                A: number;
            };
        };
        const message = await aggregate.Get<T>({
            APIServer: DEFAULT_API_V2,
            address: account.address,
            keys: [key],
        });

        const expected = {
            A: 1,
        };

        expect(message.satoshi).toStrictEqual(expected);
    });
});
