"use client"
import Link from 'next/link';

const Navigation = () => {
  return (
    <div>

    <nav>
      <ul className="flex space-x-4 m-8">
        <li>
          <Link href="/menu">
            <button className="bg-black text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-gray-800">
              Menus
            </button>
          </Link>
        </li>
        <li>
          <Link href="/order">
            <button className="bg-black text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-gray-800">
              Order
            </button>
          </Link>
        </li>
        <li>
          <Link href="/kitchen">
            <button className="bg-black text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-gray-800">
              Kitchen
            </button>
          </Link>
        </li>
        <li>
          <Link href="/cashier">
            <button className="bg-black text-white font-bold py-2 px-4 rounded transition duration-300 hover:bg-gray-800">
              Kasir
            </button>
          </Link>
        </li>
        {/* <li>
        <button onClick={deleteItem} className='bg-red-500 px-2 py-2 text-white rounded ml-auto font-bold mb-5'>Reset item</button>
        </li> */}
      </ul>
    </nav>
    </div>
  );
};

export default Navigation;
