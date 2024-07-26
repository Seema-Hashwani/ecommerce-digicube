// app/types.ts
export interface Product {
  id: number; // Change to number
  name: string;
  price: number;
  image: string;
}

  export interface Order {
    id: number;
    customerName: string;
    products: Product[];
    totalAmount: number;
  }