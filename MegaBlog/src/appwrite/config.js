import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  // Create a Client Object which will basically setup the connection b/w Frontend and Appwrite
  client = new Client();

  // Create a variable for databases
  // For storing structured data (user info, product details, blog posts, etc.)
  // Data Type: Text, Numbers, Boolean, Arrays, JSON
  // Main Operations: Create, Read, Update, Delete (CRUD)
  // Organization: Collections (like tables) with Documents (like rows)
  databases;

  // Create a variable for Storage
  // For storing files (images, videos, PDFs, documents, etc.)
  // Data Type: Binary (blobs)
  // Main Operations: Upload, Download, Preview, Delete files
  // Organization: Buckets (think "folders" for files)
  bucket;

  // Create a constructor to initialize the values
  constructor() {
    // Setup the client with appwrite url and project id
    this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

    // Setup the database using the client
    this.databases = new Databases(this.client);

    // Setup the storage/bucket using the client
    this.bucket = new Storage(this.client);
  }

  // Create a method to create the post
  async createPost({title, slug, content, featuredImage, status, userId}) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,    // DATABASE_ID
        conf.appwriteCollectionId,  // COLLECTION_ID
        slug,                       // UNIQUE_ID
        {                           // Data Object
          title,
          content,
          featuredImage,
          status,
          userId
        }
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to read the single post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,    // DATABASE_ID
        conf.appwriteCollectionId,  // COLLECTION_ID
        slug,                       // UNIQUE_ID
        []                          // Queries (Optional)
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to read multiple post at once - Read all the post under this collection
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,    // DATABASE_ID
        conf.appwriteCollectionId,  // COLLECTION_ID
        queries                     // Queries (Optional)
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to update the post
  async updatePost(slug, {title, content, featuredImage, status}) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,    // DATABASE_ID
        conf.appwriteCollectionId,  // COLLECTION_ID
        slug,                       // UNIQUE_ID
        {                           // data (optional)
          title,
          content,
          featuredImage,
          status
        },
        []                          // permissions (optional)
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to delete the post
  async deletePost(slug) {
    try {
      // Its our choice, we can return the result from the below method - i.e. promise
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,    // DATABASE_ID
        conf.appwriteCollectionId,  // COLLECTION_ID
        slug                        // UNIQUE_ID
      )

      // Here we will return true, if document deleted successfully
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to upload the file
  // the below method will return the file_id
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId, // BUCKET_ID
        ID.unique(),           // UNIQUE_ID
        file                   // FILE
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to delete the file
  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
    } catch (error) {
      throw new Error(error);
    }
  }
  
  // Create a method to download the file
  async downloadFile(fileId) {
    try {
      return await this.bucket.downloadFile(
        conf.appwriteBucketId,
        fileId
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to preview the file
  previewFile(fileId) {
    try {
      return this.bucket.getFileView(
        conf.appwriteBucketId,
        fileId
      )
    } catch (error) {
      throw new Error(error);
    }
  }

  // Create a method to update the file - name or permissions
  // async updateFile(fileName, fileId) {
  //   try {
  //     return await this.bucket.updateFile(
  //       conf.appwriteBucketId,
  //       fileId,
  //       fileName
  //     )
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }
}

const service = new Service();

export default service;

/*
  🎯 Quick Real World Examples: Storage vs Databases
  --------------------------------------------------

  Use Case	                                Storage	                              Databases
  --------------------            ---------------------               --------------------------
  User uploads a profile picture	✅ Save in Storage	                ✅ User's name, email saved in Database
  Saving a product catalog	      ✅ Product images in Storage	      ✅ Product descriptions, prices in Database
  Saving chat app media	          ✅ Photos, voice notes in Storage	✅ Chat messages, user info in Database
  Resume builder app	            ✅ User uploads CV PDF to Storage	✅ Job history, skills saved in Database

  Note:
  -----

  Database is the main DB name and
  Collection is the type of Data, There can be any type of Data inside the DB, like - Books, User, Items, etc.
  That's why different collections for different types of data

  - The Databases service allows to manage the project data.
  - The Storage service allows you to manage your project files. Using the Storage service, 
    you can upload, view, download, and query all your project files.
  - Files are managed using buckets. Storage buckets are similar to Collections we have in our Databases service.

  Basically, updateFile() allows you to update only what you want.
  So:

  If you only want to change permissions?
  → Just pass permissions — no need to pass name.

  If you want to rename the file (e.g., from image1.jpg to profile_pic.jpg)?
  → Then pass the new name.

  If you pass nothing at all?
  → Appwrite throws an error because you're updating nothing 😅
*/