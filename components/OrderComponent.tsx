'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    productName: string;
    price: number;
    imageUrl: string;
  };
}

interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await fetch("/api/orders");
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        router.push("/login");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  // Calculate the total sum of prices
  const calculateTotalPrice = (order: Order) => {
    let totalPrice = 0;
    order.items.forEach((item) => {
      totalPrice += item.product.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    <div className="lg:px-10
      px-5
    pb-10">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {loading ? (
        <p className="text-center">Fetching Orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center">No orders found</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {orders.map((order) => (
            <li key={order.id} className="bg-neutral-100 p-5 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
              <p className="text-gray-600 mb-4">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
              <ul className="space-y-4">
                {order.items.map((item) => (
                  <li key={item.id} className="flex gap-4 items-center bg-neutral-50">
                    <img src={item.product.imageUrl} alt={item.product.productName} className="rounded-lg object-cover w-24 h-24" />
                    <div>
                      <h3 className="text-lg font-medium">{item.product.productName}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-gray-600">Price: ${item.product.price}</p>
                      <p className="text-gray-600">Total Price: ${item.product.price * item.quantity}</p>
                      <a href={`/products/${item.product.id}`} className="text-blue-500 hover:underline">View product</a>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="text-black mt-4 text-xl">Total Order Price: <span className='font-bold'>${calculateTotalPrice(order)}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
