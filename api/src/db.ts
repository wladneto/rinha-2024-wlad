import { MongoClient, MongoClientOptions } from 'mongodb'

require('dotenv').config();

const options: MongoClientOptions = {
    minPoolSize: 1,
    maxPoolSize: 10,
};

const mongoConnection = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`

export const client = new MongoClient(mongoConnection, options); //Limita o numero de conexoes

export const db = client.db();
