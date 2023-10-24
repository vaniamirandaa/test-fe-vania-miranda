"use client";
import React, { useState, useEffect } from "react";

const Cashier: React.FC = () => {
  const [orders, setOrders] = useState<
    { table: number; foodId: number; quantity: number }[]
  >([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [menus, setMenus] = useState<{ id: number; name: string }[]>([]);
  const [tablesWithOrders, setTablesWithOrders] = useState<number[]>([]);
  const [receipt, setReceipt] = useState(false);

  useEffect(() => {
    const getOrders = localStorage.getItem("orders");
    if (getOrders) {
      const ordersData = JSON.parse(getOrders);
      setOrders(ordersData);

      const tables = Array.from(
        new Set(ordersData.map((order: { table: any }) => order.table))
      );
      setTablesWithOrders(tables);
    }

    const getFood = localStorage.getItem("menus");
    if (getFood) {
      const menuData = JSON.parse(getFood);
      setMenus(menuData);
    }
  }, []);

  const handleTableSelect = (tableNumber: number) => {
    setSelectedTable(tableNumber);
    setReceipt(false);
  };

  const handleReceipt = () => {
    setReceipt(true);
  };

  const getFoodName = (foodId: number): string => {
    const food = menus.find((item) => item.id === foodId);
    return food ? food.name : "Makanan Tidak Ditemukan";
  };

  const deleteItem = () => {
    localStorage.removeItem("orders");
    setOrders([]);
  };

  return (
    <div
      className="ml-8 border border-gray-300 bg-gray-100 rounded-lg h-auto p-8"
      style={{ width: 600 }}
    >
      <button
        onClick={deleteItem}
        className="bg-red-500 px-2 py-2 text-white rounded ml-auto font-bold mb-5"
      >
        Reset item
      </button>

      <h1 className="ml-1 font-bold">Meja</h1>
      <select
        value={selectedTable || ""}
        onChange={(e) => handleTableSelect(parseInt(e.target.value))}
        className="p-2.5 text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600"
        style={{ width: 333 }}
      >
        <option value="" disabled={true}>
          Pilih Nomor Meja
        </option>
        {tablesWithOrders.map((tableNumber) => (
          <option key={tableNumber} value={tableNumber}>
            Meja {tableNumber}
          </option>
        ))}
      </select>
      <button
        onClick={handleReceipt}
        className={`bg-${
          !selectedTable ? "white border border-black-700" : "black"
        } text-${
          !selectedTable ? "black" : "white"
        } font-bold py-2 px-4 rounded transition duration-300 hover:bg-gray-800 m-5`}
        disabled={!selectedTable}
      >
        Print Struk
      </button>

      {receipt && (
        <div className="mt-8  border-gray-500 bg-white rounded-lg h-auto p-8">
          <h2 className="font-bold text-xl ml-5">Meja {selectedTable}</h2>
          <table className="w-full text-sm text-left text-black dark:text-gray-400">
            <tbody>
              <tr>
                <th className="text-left px-5 py-3">Jumlah</th>
                <th className="text-left px-5 py-3">Menu</th>
                <th className="text-left px-5 py-3">Harga</th>
              </tr>

              {orders
                .filter((order) => order.table === selectedTable)
                .map((order, index) => (
                  <tr key={index}>
                    <td className="text-left  border-b dark:bg-black-800 dark:border-black-700 px-5 py-5 rounded">
                      {order.quantity}x
                    </td>
                    <td className=" border-b dark:bg-black-800 dark:border-black-700 px-5 py-5 rounded">
                      {getFoodName(order.foodId)}
                    </td>
                    <td className=" border-b dark:bg-black-800 dark:border-black-700 px-5 py-5 rounded">
                      Gratis
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <p className="text-center text-gray-600 font-bold mt-8">
            Terima kasih sudah makan di Restoran.
          </p>
        </div>
      )}
    </div>
  );
};

export default Cashier;
