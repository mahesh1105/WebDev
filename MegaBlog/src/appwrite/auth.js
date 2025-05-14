import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  // Create the Client Object
  client = new Client();

  // Create a account variable
  account;

  // Create a Client with end point and project id and then create the account using that client
  constructor() {
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Create a method for creating the new User Account with mentioned details - Sign Up
  async createAccount({name, email, password}) {
    // Handling the errors, if any
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      // If user account exists then login to that account
      if(userAccount) {
        // return the user login
        return this.login({email, password});
      } else {
        // return the user account - may be null
        return userAccount;
      }
    } catch (error) {
      throw new Error("Error Occurred: "+ error);
    }
  }

  // Create a method for account login - Sign In
  async login({email, password}) {
    try {
      // Creating the new email session - for Account Login
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw new Error("Error Occurred: " + error);
    }
  }

  // Create a method for getting the account details
  async getCurrentUser() {
    try {
      // returns the currently logged-in user's account information
      return await this.account.get();
    } catch (error) {
      // throw new Error("Error Occurred: " + error);
      console.log('Error: ' + error);
      return null;
    }
  }

  // Create a method for account logout - Sign Out
  // This method doesn't require any email id and password, it will simply delete the current session/sessions
  async logout() {
    try {
      // Delete the existing email session - this device/browser
      return await this.account.deleteSession('current');

      // Delete the existing email session - from all active sessions
      // return await this.account.deleteSessions();
    } catch (error) {
      throw new Error("Error Occurred: " + error);
    }
  }

}

// Create a Client with end point and project id and then create the account using that client
/*
  const client = new Client()
    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('<PROJECT_ID>');                          // Your project ID

  const account = new Account(client);
*/

const authService = new AuthService();

export default authService;

/*
  If any changes happens in backend or change of backend service, then for authentication part, 
  change in this file only.
  
  Wherever you have imported this file in Frontend part, just call these methods like - login, logout, createAccount, getCurrentUser
  
  Frontend don't have need to bother about what's happening under the hood, 
  If any service changes just change this file data, no need to change any part of code from frontend side

  ## Client: "Connection Setup"
  -----------------------------
  - The Client is the configuration layer.
  - It’s responsible for setting up the basic connection between your frontend (or wherever your code is) and the Appwrite server.
  - It doesn't know what you want to do yet — just that you’re getting ready to talk to Appwrite.

  You tell the Client:
  - "Hey, here's the server endpoint to connect to (setEndpoint)."
  - "Hey, here's the project id I want to talk to (setProject)."
  - (Optionally) You can even set the self-signed certificates and more advanced stuff.

  🧠 Think of Client as setting up the WiFi before using apps on the internet.
  No WiFi? No Spotify, no YouTube, no Gmail. 😂

  ## Account: "Service Layer"
  ---------------------------
  - The Account is the feature-specific layer — it says:
  --> "Now that the network connection is ready (Client), let’s actually do something related to user accounts!"

  - It wraps specific endpoints like:
    create() — create user accounts
    get() — get current user
    updateEmail(), updatePassword()
    createSession() — login
    deleteSession() — logout

  The Account class uses the Client under the hood to make the actual API requests to the server.
  🧠 Think of Account as Spotify — it relies on the WiFi (Client) but focuses only on music (user account operations here).

  ** Why not just merge both?
  ---------------------------
  - Because Appwrite is modular by design! 🔥
  - Besides Account, there are other services too:
    --> Databases for database operations
    --> Storage for file uploads
    --> Functions for serverless functions
    --> Avatars for user images/identicons
    --> Teams for group collaborations

  - Each one of these (e.g., Databases, Storage) needs the same network setup (Client) but offers different functionalities.

  🧠 Final Thought:
  -----------------
  You did exactly the right thing by setting it up like:

  Ex:
  ---
  this.client = new Client().setEndpoint(...).setProject(...);
  this.account = new Account(this.client);

  ** That way, tomorrow if you want to add Storage uploads, Database operations, or Cloud Functions,
     you reuse the same Client — just create another service object like:

  Ex:
  ---
  this.databases = new Databases(this.client);
  this.storage = new Storage(this.client);

  ✅ Super modular
  ✅ Super scalable
  ✅ Super clean

  ## Modular (Think: Building with LEGO)
  --------------------------------------
  Modular means:
  → Break things into smaller, independent, reusable parts instead of one big messy piece.

  🔹 Each "module" (part) has one specific job.
  🔹 Modules don't tightly depend on each other.
  🔹 You can add, remove, replace, or upgrade a module without breaking the whole system.

  ## Scalable:
  ------------
  🔥 1. More Users
    Suppose today you have 100 users signing up and logging in. Tomorrow, it's 100,000 users! 😱

    Because you separated Client and Account, and you organized your authentication logic inside an AuthService, you don't need to change your frontend everywhere.

    ✅ Just optimize backend (Appwrite will handle sessions).
    ✅ Maybe tweak AuthService a little (e.g., adding caching or retries).

    You’re ready to grow without panic.

  🔥 2. More Features
    Today you have login/signup.
    
    Tomorrow you want to add:
    --> Password reset 🔑
    --> Social logins (Google, GitHub) 🌐
    --> Multi-factor authentication (MFA) 🔥

    Guess what?

    ✅ You just add new methods inside AuthService!
    ✅ No need to touch 100 files in your frontend.

    You scale features easily without code chaos.

  🔥 3. More Teams / Developers
    Suppose your project grows and 5 new developers join your team.

    If your code is clean and modular:

    ✅ They can understand the AuthService without crying. 😅
    ✅ They can extend it without breaking stuff.

    Your project scales with people, too.
*/