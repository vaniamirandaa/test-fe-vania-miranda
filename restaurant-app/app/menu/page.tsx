
"use client"

import React, { useState, useEffect } from 'react';
const Menu: React.FC = () => {
  const [menus, setMenus] = useState<{ id: number; name: string }[]>(
    []
  );
  const [addMenu, setAddMenu] = useState<string>('');

  useEffect(() => {
    const savedMenu = localStorage.getItem('menus');
    if (savedMenu) {
      setMenus(JSON.parse(savedMenu));
    } else {
      const menus = [
        { id: 1, name: 'Ayam Goreng Kecap' },
        { id: 2, name: 'Nasi Goreng Spesial' }
      ];
      setMenus(menus);
      localStorage.setItem('menus', JSON.stringify(menus));
    }
  }, []);

  const addFood = () => {
    if (addMenu.trim() !== '') {
      const items = { id: menus.length + 1, name: addMenu };
      setMenus([...menus, items]);
      setAddMenu('');
      localStorage.setItem('menus', JSON.stringify([...menus, items]));
    }
  };

  const deleteFood = (id: number) => {
    const updatedFood = menus.filter((item) => item.id !== id);
    setMenus(updatedFood);

    localStorage.setItem('menus', JSON.stringify(updatedFood));
  };

  return (
    <div className="ml-8 border border-gray-300 bg-gray-100 rounded-lg h-auto p-8" style={{ width: 600 }}>
      <h4 className="text-2m p-4">Menu Makanan</h4>
      <input
        type="text"
        value={addMenu}
        onChange={(e) => setAddMenu(e.target.value)}
        placeholder="Tambahkan makanan baru"
        className="p-2 border rounded mx-4"
      />
      <button onClick={addFood} className={`bg-${
          !addMenu ? "white border border-black-700" : "black"
        } text-${
          !addMenu ? "black" : "white"
        } font-bold py-2 px-4 rounded transition duration-300 hover:bg-gray-800`}>
        Tambah
      </button>
      <table className="w-full text-sm text-left text-black dark:text-gray-400 mt-5">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Food</th>
            <th className="px-4 py-2">Delete?</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((item) => (
            <tr key={item.id}>
              <td className="bg-white border-b dark:bg-black-800 dark:border-black-700 px-5 py-5 rounded">{item.id}.</td>
              <td className="bg-white border-b dark:bg-black-800 dark:border-black-700 px-5 py-5 rounded">{item.name}</td>
              <td className="bg-white border-b dark:bg-black-800 dark:border-black-700 px-5 py-5 rounded">
                <button onClick={() => deleteFood(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  
};

export default Menu;
