"use client";

import React, { useEffect, useState } from "react";

const OrderPage: React.FC = () => {
  const [foodList, setFoodList] = useState<{ id: number; name: string }[]>([]);
  const [selectedFood, setSelectedFood] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>();
  const [table, setTable] = useState<number | null>(null);

  useEffect(() => {
    const savedMenu = localStorage.getItem("menus");
    if (savedMenu) {
      const foodData = JSON.parse(savedMenu);
      setFoodList(foodData);
    }
  }, []);

  const handleFoodSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(event.target.value, 10);
    setSelectedFood(id);
  };

  const handleQuantitySelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const qty = parseInt(event.target.value, 10);
    setQuantity(qty);
  };

  const handleTableSelect = (tableNumber: number) => {
    setTable(tableNumber);
  };

  const handleOrderSubmit = () => {
    if (selectedFood !== null && table !== null && quantity !== null) {
      const newOrder = {
        table: table,
        foodId: selectedFood,
        quantity: quantity,
      };

      const order = localStorage.getItem("orders");
      const orders = order ? JSON.parse(order) : [];
      orders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(orders));

      setSelectedFood(null);
      setQuantity(undefined);
      setTable(null);
    }
  };

  return (
    <div
      className="ml-8 border border-gray-300 bg-gray-100 rounded-lg h-auto p-8"
      style={{ width: 600 }}
    >
      <div className="mb-6">
        <button
          onClick={() => handleTableSelect(1)}
          className={`bg-${table === 1 ? "black" : "white border border-gray-300"} text-${
            table === 1 ? "white" : "black"
          } font-bold rounded-l transition duration-300 hover:bg-gray-800 py-5 px-12`}
        >
          Meja 1
        </button>

        <button
          onClick={() => handleTableSelect(2)}
          className={`bg-${table === 2 ? "black" : "white border border-gray-300"} text-${
            table === 2 ? "white" : "black"
          } font-bold transition duration-300 hover:bg-gray-800 py-5 px-12`}
        >
          Meja 2
        </button>
        <button
          onClick={() => handleTableSelect(3)}
          className={`bg-${table === 3 ? "black" : "white border border-gray-300"} text-${
            table === 3 ? "white" : "black"
          } font-bold rounded-r transition duration-300 hover:bg-gray-800 py-5 px-12`}
        >
          Meja 3
        </button>
      </div>

      <table className="w-auto">
        <tbody>
          <tr>
            <th className="text-left py-2">Menu</th>
            <th className="text-left py-2">Jumlah</th>
          </tr>
          <tr>
            <td className="pr-8">
              <select
                value={selectedFood || ""}
                onChange={handleFoodSelect}
                className="p-2.5 text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600"
                style={{ width: 290 }}
              >
                <option value="" disabled={true}>
                  Pilih makanan
                </option>
                {foodList.map((food) => (
                  <option key={food.id} value={food.id}>
                    {food.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                value={quantity}
                onChange={handleQuantitySelect}
                className="p-2.5 text-gray-700 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600"
                defaultValue=""
              >
                <option value="" disabled={true}>
                  Pilih jumlah
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </td>
            <td>
              <button
                onClick={handleOrderSubmit}
                className={`bg-${
                  !table || !selectedFood || !quantity
                    ? "white border border-black-700"
                    : "black"
                } text-${
                  !table || !selectedFood || !quantity ? "black" : "white"
                } font-bold py-2 px-4 rounded transition duration-300 hover-bg-gray-800 ml-3`}
              >
                Tambah
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
