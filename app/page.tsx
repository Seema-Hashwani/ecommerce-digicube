// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Home = async () => {
  // Example products data, replace with actual API fetch if needed
  const products: Product[] = [
    { id: 1, name: 'Product 1', price: 29.99, image: '/images/product.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, image: '/images/product.jpg' },
    { id: 3, name: 'Product 3', price: 49.99, image: '/images/product.jpg' },
    { id: 4, name: 'Product 4', price: 59.99, image: '/images/product.jpg' },
  ];

  return (
    <>
      <Header/>
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
                  <Link
                    href={`/product/${product.id}`}
                    className="mt-4 block text-center bg-blue-500 text-white py-2 rounded"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Home;
