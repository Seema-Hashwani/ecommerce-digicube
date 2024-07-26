import { NextResponse } from 'next/server';
import { Product } from '../../types';

let products: Product[] = [
  { id: 1, name: 'Product 1', price: 29.99, image: '' },
  { id: 2, name: 'Product 2', price: 39.99, image: '' },
  { id: 3, name: 'Product 3', price: 49.99, image: '' },
];

export async function PUT(request: Request) {
  const { id, name, price, image } = await request.json();
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return NextResponse.json({ message: 'Product not found' }, { status: 404 });
  }

  products[index] = { id, name, price, image };
  return NextResponse.json(products[index]);
}
