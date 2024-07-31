// app/api/products/new/route.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
  try {
    const db = client.db('ecommerce');
    const collection = db.collection('products');

    const product = await request.json();
    if (!product.name || !product.price || !product.image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await collection.insertOne(product);
    return NextResponse.json({ message: 'Product added successfully', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
