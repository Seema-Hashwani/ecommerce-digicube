'use client';
import { useEffect, useState } from 'react';
import AdminLayout from '../layout';
import Link from 'next/link';
import { Product } from '../../types';

const AdminProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        // Ensure response is ok
        const response = await fetch('/api/products');
        if (response.ok) {
          const data = await response.json();
          console.log('Fetched Products:', data);
        } else {
          console.error('Fetch Error:', response.statusText);
        }
        

        // Read the response once and parse as JSON
        const data = await response.json();

        // Validate the data structure
        if (Array.isArray(data) && data.every(item => item._id && item.name && typeof item.price === 'number')) {
          const products: Product[] = data.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 0, // Assuming quantity needs to be set here
          }));
          setProducts(products);
        } else {
          setError('Data format is incorrect');
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setError(`Error fetching products: ${message}`);
        console.error('Error fetching products:', message);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error deleting product');
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      setError(`Error deleting product: ${message}`);
      console.error('Error deleting product:', message);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-4">Manage Products</h2>
      <Link href="/admin/products/new" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4 inline-block">
        Add New Product
      </Link>
      {error && <p className="text-red-500">{error}</p>}
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
