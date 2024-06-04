import { Account, Client } from "appwrite";

export class UserVerify {
    clint = new Client()
    account;

    constructor() {
        this.clint
            .setEndpoint("https://cloud.appwrite.io/v1")
            .setProject("63a0f9e4b5c0")
        this.account = new Account(this.clint);
    }

    async verifyUserEmail(
        {
            userId,
            secret

        }: {
            userId: string;
            secret: string
        }
    ) {
        try {
            return await this.account.updateVerification(userId, secret);

        } catch (error: any) {
            console.log('verifyUserEmail error: ', error);
            throw error;
        }
    }
}
const userVerify = new UserVerify();

export default userVerify