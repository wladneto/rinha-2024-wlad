import { MongoClient } from 'mongodb'

const {
    MONGO_URI = 'mongodb://user:pass@localhost/Rinha?authSource=admin',
} = process.env

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
