// data/productStore.ts
import { Product } from '../app/types'; // Adjust the path according to your file structure
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

// Load products from the JSON file
const loadProducts = (): Product[] => {
  if (fs.existsSync(productsFilePath)) {
    const fileContents = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(fileContents);
  }
  return [];
};

// Save products to the JSON file
const saveProducts = (products: Product[]): void => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

let products: Product[] = loadProducts();
let idCounter = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

// Get all products
export function getProducts(): Product[] {
  return products;
}

// Add a new product
export function addProduct(newProduct: Omit<Product, 'id'>): Product {
  const productWithId = { ...newProduct, id: idCounter++ };
  products.push(productWithId);
  saveProducts(products);
  return productWithId;
}

// Update an existing product
export function updateProduct(updatedProduct: Product): boolean {
  const index = products.findIndex(p => p.id === updatedProduct.id);
  if (index !== -1) {
    products[index] = updatedProduct;
    saveProducts(products);
    return true;
  }
  return false;
}

// Delete a product
export function deleteProduct(id: number): boolean {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    saveProducts(products);
    return true;
  }
  return false;
}
