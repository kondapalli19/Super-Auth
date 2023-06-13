
import { Client, Account } from "appwrite";

const client = new Client();

client
    .setEndpoint('http://localhost/v1') // Your API Endpoint
    .setProject('6483c85ec8a66065e079') // Your project ID
;

const account = new Account(client);


export { account };
