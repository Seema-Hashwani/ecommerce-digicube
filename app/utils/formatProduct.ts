// app/utils/formatProduct.ts
import { Product } from '../types';

export function formatProduct(product: any): Product {
  return {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: product.quantity,
  };
}
