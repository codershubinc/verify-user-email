import { Client, ID, Databases, Storage, Query } from "appwrite";
const conf = {
    appwriteUrl: "https://cloud.appwrite.io/v1",
    appwriteProjectId: "",
    databaseId: "",
    userConfigCollectionId: ""
    // use from env
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
