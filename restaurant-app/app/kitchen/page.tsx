"use client"
import React, { useEffect, useState } from 'react';

const KitchenPage: React.FC = () => {
  const [orders, setOrders] = useState<
    { table: number; foodId: number; quantity: number }[]
  >([]);
  const [menus, setMenus] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const orderData = JSON.parse(storedOrders);
      setOrders(orderData);
    }

    const savedMenu = localStorage.getItem('menus');
    if (savedMenu) {
      const foodData = JSON.parse(savedMenu);
      setMenus(foodData);
    }
  }, []);

  const getOrdersByTable = (tableNumber: number) => {
    const tableOrders = orders.filter((order) => order.table === tableNumber);
    return (
      <ul>
        {tableOrders.map((order, index) => (
          <li key={index}>
            {order.quantity}x — {getFoodName(order.foodId)}
          </li>
        ))}
      </ul>
    );
  };

  const getFoodName = (foodId: number) => {
    const food = menus.find((item) => item.id === foodId);
    return food ? food.name : 'Makanan tidak ditemukan';
  };

  return (
    <div className="ml-8 border border-gray-300 bg-gray-100 rounded-lg h-auto p-8" style={{ width: 600 }}>
      <div className="flex space-x-4">
        <div className="w-1/3 pb-4 rounded-lg">
          <h2 className='text-xl font-bold'>Meja 1</h2>
          <h3 className='text-xs mt-5'>{getOrdersByTable(1)}</h3>
        </div>
        <div className="w-1/3 pb-4 rounded-lg">
          <h2 className='text-xl font-bold'>Meja 2</h2>
          <h3 className='text-xs mt-5'>{getOrdersByTable(2)}</h3>
        </div>
        <div className="w-1/3 pb-4 rounded-lg">
          <h2 className='text-xl font-bold'>Meja 3</h2>
          <h3 className='text-xs mt-5'>{getOrdersByTable(3)}</h3>
        </div>
      </div>
    </div>
  );
  
  
};

export default KitchenPage;
