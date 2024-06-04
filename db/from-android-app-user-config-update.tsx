import { Client, ID, Databases, Storage, Query } from "appwrite";
const conf = {
    appwriteUrl: "https://cloud.appwrite.io/v1",
    appwriteProjectId: "662ab42b7d237361fa26",
    databaseId: "662bd67b001e4f718eca",
    userConfigCollectionId: "665f5c84002ea2b3d7a7"
}

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async updateUserConfig({ userId, isUserVerified }: { userId: string, isUserVerified: boolean }) {
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.userConfigCollectionId,
                userId,
                {
                    isUserVerified: true
                }

            );
        } catch (error: any) {
            throw error;
        }
    }
}
const service = new Service();
export default service