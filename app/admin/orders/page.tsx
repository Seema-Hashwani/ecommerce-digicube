import AdminLayout from './/../layout';

const AdminOrders = () => {
  // Fetch orders from the API or database
  const orders = [
    { id: 1, customer: 'Customer 1', total: 59.98 },
    { id: 2, customer: 'Customer 2', total: 39.99 },
    // ...more orders
  ];

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-4">Manage Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Order ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Total</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.customer}</td>
              <td className="py-2">${order.total.toFixed(2)}</td>
              <td className="py-2">
                <button className="text-blue-500 hover:text-blue-700">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminOrders;
