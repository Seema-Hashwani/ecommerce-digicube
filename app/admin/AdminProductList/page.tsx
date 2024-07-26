// app/admin/AdminProductList/page.tsx
import { useEffect, useState } from 'react';
import AdminLayout from '../layout';
import Link from 'next/link';
import { Product } from '../../types';

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data: Product[] = await response.json();
          setProducts(data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/products', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Ensure id is a number
      });

      if (response.ok) {
        // Refresh the product list or remove the item from the local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        const result = await response.json();
        console.error('Error deleting product:', result.error);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
