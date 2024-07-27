// app/home/page.tsx
'use client';
import Head from 'next/head';
import Header from './/components/Header';
import Footer from './components/Footer';
import ProductCard from './components/ProductCard';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = () => {
      try {
        const products = JSON.parse(localStorage.getItem('products') || '[]') as Product[];
        // Display only the first 4 products
        setProducts(products.slice(0, 4));
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
        <title>Home | My E-commerce Site</title>
        <meta name="description" content="Welcome to our e-commerce site. Find the best products here." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store!</h1>
          <p className="text-lg">Find the best products at amazing prices.</p>
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

export default Home;
