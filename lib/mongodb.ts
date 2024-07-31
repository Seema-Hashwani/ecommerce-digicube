// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  console.error('MONGODB_URI is not defined');
  process.exit(1);
}

let client: MongoClient;

async function getClient() {
  if (!client) {
    client = new MongoClient(uri);
  }
  return client;
}

export { getClient };
