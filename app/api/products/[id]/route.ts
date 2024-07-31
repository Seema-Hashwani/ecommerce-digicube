import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

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

export async function GET(request: Request) {
  const id = new URL(request.url).pathname.split('/').pop();

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  try {
    const client = await getClient();
    await client.connect();
    const database = client.db('ecommerce');
    const collection = database.collection('products');
    
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (product) {
      return NextResponse.json(product);
    } else {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error fetching product:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
    }
  } finally {
    // Optional: Manage connections properly at the application level
  }
}
