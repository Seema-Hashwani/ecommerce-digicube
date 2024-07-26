// app/products/page.tsx
'use client';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        const products = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
        setProducts(products);
      } catch (error) {
        setError('Error loading products.');
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Head>
        <title>Products | My E-commerce Site</title>
        <meta name="description" content="Browse our wide range of products available for purchase." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg">Explore our diverse range of products. Find what you need and more.</p>
        </section>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Products;
