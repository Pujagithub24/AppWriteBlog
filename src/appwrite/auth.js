import conf from '../config/config.js';
import { Client, Account, ID } from "appwrite";

//we create aur class
export class AuthService {
    //we create two properties here
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

        //in this method appwrite ki jitni services hai unko call kiya hai
    //jo bhi method pass karega voh ek object dega hume jisme yeh saari values hogi 
    async createAccount({email, password, name}) {
         //yeh account creation method fail bhi ho sakta hai ->so we use try catch
        try {
            //here first parameter should be unique id according to the documentation
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
//call another method -> userAccount agar exist kar raha hai toh hum account login hi karva lenge
                return this.login({email, password});
            } 
            else {
               return  userAccount;
            }

        } 
        catch (error) {
            throw error;
        }

    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

//and simply export it (jo bhi iss class ko use karega usse object banana padega)
//export default AuthService
//so we get object here authservice
const authService = new AuthService();

//iss object ko humne yaha sidhe hi export kar diya hai
export default authService