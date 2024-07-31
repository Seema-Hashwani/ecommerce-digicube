// app/admin/products/edit/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../../../types';

const EditProduct = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) throw new Error('Product not found');

        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: name === 'price' ? parseFloat(value) : value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error('Error updating product');

      router.push('/admin/products');
    } catch (error) {
      setError('Error updating product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-1">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product?.name || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-lg font-medium mb-1">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product?.price || 0}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-lg font-medium mb-1">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product?.image || ''}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
