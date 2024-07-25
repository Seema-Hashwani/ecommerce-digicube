'use client';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../../hooks/CartContext'; // Adjust the path if necessary
import Link from 'next/link';
import Image from 'next/image'; // Use Image from next/image

const Cart = () => {
  const { cartItems, removeItem, clearCart } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <Head>
        <title>Cart | My E-commerce Site</title>
        <meta name="description" content="View and manage items in your shopping cart." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Cart</h1>
        </section>
        <section>
          {cartItems.length === 0 ? (
            <p className="text-center text-lg">Your cart is empty.</p>
          ) : (
            <div>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center border-b py-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-24 h-24 object-cover mr-4"
                    />
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-lg">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, Math.max(item.quantity - 1, 1))}
                          className="bg-gray-200 px-2 py-1 rounded-l text-black" 
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                          className="w-12 text-center border-t border-b text-black"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded-r text-black" 
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-4 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Total: ${getTotalPrice().toFixed(2)}</h2>
                <Link href={'/checkout'}>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 mx-5 rounded hover:bg-blue-600"
                  >
                    Proceed to Checkout
                  </button>
                </Link>
                <button
                  onClick={clearCart}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );

  function handleQuantityChange(id: number, quantity: number) {
    // Function to update item quantity, assuming it's handled in the context or can be added
    // If not handled in the context, you can implement this functionality in CartContext
    // For now, you might want to update this as per your application logic
  }
};

export default Cart;
