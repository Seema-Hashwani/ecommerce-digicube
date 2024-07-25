// pages/checkout.tsx
'use client';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  // Example cart items, replace with actual cart data from context or state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Product 1', price: 29.99, quantity: 2, image: '/images/product1.jpg' },
    { id: 2, name: 'Product 2', price: 39.99, quantity: 1, image: '/images/product2.jpg' },
    // Add more items as needed
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'creditCard', // or 'paypal'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log('Order submitted:', { ...formData, cartItems });
    // Clear form or redirect user
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <>
      <Head>
        <title>Checkout | My E-commerce Site</title>
        <meta name="description" content="Complete your purchase by entering your shipping and payment information." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-lg mb-4">Please provide your shipping and payment information to complete your purchase.</p>
        </section>
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b py-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-lg">${item.price.toFixed(2)} x {item.quantity}</p>
                  </div>
                </div>
              ))}
              <div className="mt-8 text-right">
                <h3 className="text-xl font-semibold">Total: ${getTotalPrice().toFixed(2)}</h3>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-lg font-medium mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-lg font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block text-lg font-medium mb-2">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-lg font-medium mb-2">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="state" className="block text-lg font-medium mb-2">State</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="zip" className="block text-lg font-medium mb-2">ZIP Code</label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="paymentMethod" className="block text-lg font-medium mb-2">Payment Method</label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black"
                  >
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Checkout;