import config from "../config/config";
import { Client, Account, Databases, Storage, ID, Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId 
                },
            )
        } catch(error) {
            console.log("Appwrite service :: createPost :: error: ", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status 
                },
                ['read")']
            );
            
        } catch(error) {
            console.log("Appwrite service :: updatePost :: error: ", error);
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
            );

            return true;
        } catch(error) {
            console.log("Appwrite service :: deletePost :: error: ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            await this.databases.getDocument(
                config.appwriteUrl,
                config.appwriteCollectionId,
                slug
            );
            return true;
        } catch(error) {
            console.log("Appwrite service :: fetchPost :: error: ", error);
            return false;
        }
    }


    async getAllPost(queries = [Query.equal("status", "active")]) {
        try {
            await this.databases.listDocument(
                config.appwriteUrl,
                config.appwriteCollectionId,
                queries,
            );
            return true;
        } catch(error) {
            console.log("Appwrite service :: fetchPost :: error: ", error);
            return false;
        }
    }

    async fileUpload(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,

            )
        } catch(error) {
            console.log("Appwrite service :: fileUpload :: error: ", error);
            return false;
        }
    }

    async fileDelete(fileId) {
        try {

            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch(error) {
            console.log("Appwrite service :: fileDelete :: error: ", error);
            return false;
        }
    }

    filePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch(error) {
            console.log("Appwrite service :: filePreview :: error: ", error);
            return null;
        }
    }

}

const service = new Service();

export default service;