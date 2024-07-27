// app/admin/products/new/page.tsx
'use client';

import { useState } from 'react';
import Head from 'next/head';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Product } from '../../../types'; // Ensure this import is correct
import { useRouter } from 'next/navigation';

// Function to generate a unique numeric ID
const generateUniqueId = (existingIds: Set<number>): number => {
  let newId = 1; // Start from 1 or any other initial value
  while (existingIds.has(newId)) {
    newId += 1; // Increment ID until a unique one is found
  }
  return newId;
};

const NewProduct = () => {
  const [product, setProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: name === 'price' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const products = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
      const existingIds = new Set(products.map(product => product.id)); // Collect existing IDs
      const newProduct = { ...product, id: generateUniqueId(existingIds) }; // Generate a unique ID
      localStorage.setItem('products', JSON.stringify([...products, newProduct]));
      setSuccess('Product added successfully!');
      setProduct({ name: '', price: 0, image: '' });
      router.push('/admin/products');
    } catch (error) {
      setError('Error submitting product. Please try again.');
      console.error('Error submitting product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>New Product | Admin</title>
        <meta name="description" content="Add a new product to the store." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Add New Product</h1>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-lg font-medium mb-2">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-lg font-medium mb-2">Image URL</label>
              <input
                type="text"
                id="image"
                name="image"
                value={product.image}
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
              {loading ? 'Adding...' : 'Add Product'}
            </button>
            {success && <p className="mt-4 text-green-500">{success}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default NewProduct;
