'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '../layout';
import Link from 'next/link';
import { Product } from '../types';

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProductsFromLocalStorage = () => {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        console.error('No products found in local storage');
      }
    };

    fetchProductsFromLocalStorage();
  }, []);

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter(product => product.id !== id);

    // Update local storage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Update state
    setProducts(updatedProducts);
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-4">Manage Products</h2>
      <Link href="/admin/products/new" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 inline-block">
        Add New Product
      </Link>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 text-center">ID</th>
            <th className="py-2 text-center">Name</th>
            <th className="py-2 text-center">Price</th>
            <th className="py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="py-2 text-center">{product.id}</td>
              <td className="py-2 text-center">{product.name}</td>
              <td className="py-2 text-center">${product.price.toFixed(2)}</td>
              <td className="py-2 text-center">
                <Link
                  href={`/admin/products/edit/${product.id}`}
                  className="text-blue-500 hover:text-blue-700 border border-blue-500 hover:bg-blue-100 py-1 px-3 rounded shadow-sm transition duration-300 ease-in-out"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:text-red-700 border border-red-500 hover:bg-red-100 py-1 px-3 rounded shadow-sm ml-4 transition duration-300 ease-in-out"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminProductList;
