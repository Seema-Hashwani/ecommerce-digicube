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
    const fetchProduct = () => {
      const products = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
      const foundProduct = products.find(p => p.id.toString() === params.id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    };

    fetchProduct();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      const { name, value } = e.target;
      setProduct({ ...product, [name]: name === 'price' ? parseFloat(value) : value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!product) return;
    setLoading(true);
    setError(null);
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
      const updatedProducts = products.map(p =>
        p.id.toString() === product.id.toString() ? product : p
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
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
