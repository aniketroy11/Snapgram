import {Avatars,Storage,Databases,Client,Account} from 'appwrite'

export const appwriteConfig = {
    projectId:'6571fcd26c769d166101',
    url:'https://cloud.appwrite.io/v1',
    databaseId:'6583230b30b64cf5da09',
    storageId:'6583237be0d9d39045be',
    userCollectionId:'658323204325f24d5dc8',
    postCollectionId:'658323149c7ef1c1a078',
    saveCollectionId:'658323255c182c5608bf'
}

export const client = new Client();
client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)


export const avatar = new Avatars(client);
export const account = new Account(client);
export const storage = new Storage(client);
export const database = new Databases(client);