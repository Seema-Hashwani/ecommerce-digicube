'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from './components/Header';
import Footer from './components/Footer';
import { useCart } from '../hooks/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [clickedId, setClickedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (response.ok) {
          const data: Product[] = await response.json();
          setProducts(data);
          // Store in local storage
          localStorage.setItem('products', JSON.stringify(data));
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({ ...product, quantity: 1 });
    setClickedId(product.id);
    setTimeout(() => setClickedId(null), 300);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Store!</h1>
          <p className="text-lg">Find the best products at amazing prices.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded transition-transform transform ${
                      clickedId === product.id ? 'scale-95' : ''
                    } hover:bg-blue-600`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
