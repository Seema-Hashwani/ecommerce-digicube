// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid'; // Use UUID to generate unique IDs

// Simulating a database with an in-memory array
let products: Product[] = [];

export async function POST(req: Request) {
  try {
    const product = await req.json();
    const newProduct = {
      ...product,
      id: uuidv4(), // Assign a unique ID
    };
    
    products.push(newProduct); // Add the product to the "database"
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

// Define the Product type
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}
