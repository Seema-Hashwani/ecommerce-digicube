import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://hashwaniseema:i8Mmkjigvn4TJEz7@cluster0.912awld.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual MongoDB connection string
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    const database = client.db('ecommerce');
    const productsCollection = database.collection('products');
    const products = await productsCollection.find({}).toArray();
    console.log('Products:', products);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testConnection();
