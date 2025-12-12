// src/pages/Cart.jsx
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Savat bo‘sh</h1>
          <a href="/" className="text-red-500 text-xl underline">Mahsulotlarga qaytish</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Savatingiz ({cart.length} ta)
        </h1>
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-6 py-6 border-b dark:border-gray-700">
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">{item.name}</h3>
              <p className="text-xl text-red-500 font-bold">{item.price * item.quantity} so'm</p>
            </div>
            <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">{item.quantity} dona</span>
          </div>
        ))}
        <div className="mt-10 text-center">
          <button className="px-12 py-5 bg-green-500 hover:bg-green-600 text-white text-2xl font-bold rounded-xl">
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  );
}