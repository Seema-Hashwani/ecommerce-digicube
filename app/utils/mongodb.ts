import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);
const dbName = process.env.MONGODB_DB as string;
let db: any = null;

export async function connectToDatabase() {
  if (!db) {
    try {
      await client.connect();
      db = client.db(dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Could not connect to database');
    }
  }
  return { db };
}
