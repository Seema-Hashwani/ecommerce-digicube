// Import necessary libraries
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Order } from '../../types'; // Adjust the path if necessary

const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');

const fetchOrders = () => {
  if (fs.existsSync(ordersFilePath)) {
    return JSON.parse(fs.readFileSync(ordersFilePath, 'utf8')) as Order[];
  }
  return [];
};

const Orders = () => {
  const orders = fetchOrders();

  const handleCompleteOrder = (orderId: number) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    fs.writeFileSync(ordersFilePath, JSON.stringify(updatedOrders, null, 2));
    // Re-fetch updated orders
    // Note: This will not re-render the component, so you may need to handle re-rendering
  };

  return (
    <>
      <Head>
        <title>Admin Orders | My E-commerce Site</title>
        <meta name="description" content="View and manage customer orders." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <section className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Orders</h1>
          <p className="text-lg mb-4">Here you can view and manage customer orders.</p>
        </section>
        <section>
          {orders.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            <ul>
              {orders.map(order => (
                <li key={order.id} className="border-b py-4">
                  <h2 className="text-2xl font-semibold mb-2">Order #{order.id}</h2>
                  <p><strong>Customer Name:</strong> {order.customerName}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Address:</strong> {order.address}, {order.city}, {order.state}</p>
                  <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                  <ul className="mt-4">
                    {order.products.map((item, index) => (
                      <li key={index}>
                        {item.product ? (
                          <>
                            {item.product.name} - ${item.product.price.toFixed(2)} x {item.quantity}
                          </>
                        ) : (
                          <span>Product information is missing.</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleCompleteOrder(order.id)}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
                  >
                    Mark as Completed
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Orders;
