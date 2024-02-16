import { MongoClient, MongoClientOptions } from 'mongodb'

const options: MongoClientOptions = {
    minPoolSize: 2,
    maxPoolSize: 20
};


const {
    MONGO_URI = 'mongodb://user:pass@localhost/Rinha?authSource=admin',
} = process.env

export const client = new MongoClient(MONGO_URI, options); //Limita o numero de conexoes

export const db = client.db();
