// pages/products.tsx
'use client';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Products = () => {
  // Example products data, replace with actual API fetch or data source
  const products: Product[] = [
    { id: 1, name: 'Product 1', price: 29.99, image: '/images/product.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: '/images/product.jpg' },
    { id: 3, name: 'Product 3', price: 49.99, image: '/images/product.jpg' },
    { id: 4, name: 'Product 4', price: 59.99, image: '/images/product.jpg' },
    // Add more products as needed
  ];

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
