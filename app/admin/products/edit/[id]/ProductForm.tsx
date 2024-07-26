// app/admin/products/edit/[id]/ProductForm.tsx
'use client';

import { useState } from 'react';
import { Product } from './../../../../types'; // Adjust import path if necessary

interface ProductFormProps {
  initialProduct: Product;
}

const ProductForm = ({ initialProduct }: ProductFormProps) => {
  const [editedProduct, setEditedProduct] = useState<Product>(initialProduct);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here (e.g., POST request to update product)
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={editedProduct.name}
          onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          value={editedProduct.price}
          onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default ProductForm;
