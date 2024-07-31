// app/types.ts
export interface Product {
  id: string; // MongoDB ObjectId as a string
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  id: string; // MongoDB ObjectId as a string
  customerName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  paymentMethod: string;
  totalAmount: number;
  products: {
    product: Product;
    quantity: number;
  }[];
}
