'use client';

import config from "../config/config";
import { Account, Client, ID } from 'appwrite';

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) {
                this.login({ email, password });
            } else {
                return userAccount;
            }

        } catch(error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try{
            return await this.account.createEmailPasswordSession(email, password);
        } catch(error) {
            throw error;
        }
    }

    async currentUser() {
        try {
            return await this.account.get();
        } catch(error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }
        return null;
    }

    async logoutUser({ currentUser }) {
        try {
            await this.account.deleteSession(currentUser);
            return true;
        } catch(error) {
            throw error;
        }
    }

    // async logout() {
    //     try {
    //         await this.account.deleteSessions();
    //     } catch (error) {
    //         console.log("Appwrite serive :: logout :: error", error);
    //     }
    // }
}

const authService = new AuthService();

export default authService;