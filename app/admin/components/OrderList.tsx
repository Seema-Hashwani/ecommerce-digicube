// components/OrderList.tsx
import React from 'react';
import { Order } from '..//../types';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Order List</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Customer Name</th>
            <th className="px-4 py-2 border">Products</th>
            <th className="px-4 py-2 border">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2 border">{order.id}</td>
              <td className="px-4 py-2 border">{order.customerName}</td>
              <td className="px-4 py-2 border">
                <ul>
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} - ${product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2 border">${order.totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
