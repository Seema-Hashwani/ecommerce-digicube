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

// beIa9zitE19WP2LG [password for mongodb user seemahashwani05]