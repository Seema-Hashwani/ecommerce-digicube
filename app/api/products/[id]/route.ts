// app/api/products/[id]/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const products = [
  { id: '1', name: 'Product 1', price: 29.99 },
  { id: '2', name: 'Product 2', price: 39.99 },
  { id: '5', name: 'Product 5', price: 59.99 }
];

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const product = products.find(p => p.id === id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, price } = await request.json();
  const productIndex = products.findIndex(p => p.id === id);

  if (productIndex !== -1) {
    products[productIndex] = { id, name, price };
    return NextResponse.json(products[productIndex]);
  } else {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }
}
