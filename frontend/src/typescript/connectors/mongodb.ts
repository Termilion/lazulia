import { MongoClient, Db } from "mongodb";

export interface MetaData {
    creator: string;
    created: string;
    edited: string;
}

export interface Document {
    metadata: MetaData;
    content: string;
}

export interface Connector {
    getAllDocuments(): Document[];
    insertDocument(doc: Document);
    deleteDocument(doc: Document);
    updateDocument(doc: Document); 
}

export class MongoConnector {

    database: Db;

    constructor(url: string, db: string) {
        MongoClient.connect(url, (err, client) => {
            if (!!err) {
                console.log(`failed to connect to ${url}\nError:${err}`);
            } else {
                console.log(`successfully connected to ${url}`);
                this.database = client.db(db);
            }
        });
    }
}