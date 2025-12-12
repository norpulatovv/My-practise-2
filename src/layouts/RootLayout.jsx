import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import useCart from "../hooks/useCart";

function RootLayout() {
  const { getTotalItems, cart, getTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCart, setShowCart] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-[1500px] mx-auto px-5">
          <nav className="flex items-center justify-between py-5">
            <ul className="flex items-center gap-10">
              <li className="text-xl font-bold text-gray-900">Feed Up</li>
              <li className="text-lg">
                <NavLink 
                  to="/" 
                  className={({isActive}) => isActive ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500 transition"}
                >
                  Home
                </NavLink>
              </li>
              <li className="text-lg">
                <NavLink 
                  to="/aksiya" 
                  className={({isActive}) => isActive ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500 transition"}
                >
                  
                  Aksiya
                </NavLink>
              </li>
                <li className="text-lg">
                <NavLink 
                  to="/about" 
                  className={({isActive}) => isActive ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500 transition"}
                >
                  
                  About Us
                </NavLink>
              </li>
              <li className="text-lg">
                <NavLink 
                  to="/menu" 
                  className={({isActive}) => isActive ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500 transition"}
                >
                  Menu
                </NavLink>
              </li>
              <li className="text-lg">
                <NavLink 
                  to="/contact" 
                  className={({isActive}) => isActive ? "text-red-500 font-medium" : "text-gray-600 hover:text-red-500 transition"}
                >
                  Contact
                </NavLink>
              </li>
            </ul>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowCart(!showCart)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition"
              >
                <span className="text-2xl">🛒</span>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              <button className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition font-medium">
                Order Type
              </button>
            </div>
          </nav>
        </div>
      </header>

      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Savat</h2>
              <button onClick={() => setShowCart(false)} className="text-3xl hover:text-red-500">×</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Savat bo'sh</p>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-600">{item.price.toLocaleString('uz-UZ')} so'm</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-xl"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Jami:</span>
                    <span>{getTotalPrice().toLocaleString('uz-UZ')} so'm</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={clearCart}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                      Tozalash
                    </button>
                    <button 
                      onClick={() => alert(`Buyurtma qabul qilindi! Jami: ${getTotalPrice().toLocaleString('uz-UZ')} so'm`)}
                      className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-medium"
                    >
                      Buyurtma berish
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <hr />

      <main>
        <Outlet />
      </main>

      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>Footer</p>
      </footer>
    </>
  );
}

export default RootLayout;