import { useState, useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import { Sun, Moon, ShoppingCart, Heart } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import { FavoritesProvider, useFavorites } from './context/FavoritesContext';

function AppContent() {
  const [dark, setDark] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const { cart, totalItems, removeFromCart, updateQuantity, clearCart, getTotalPrice, addToCart } = useCart();
  const { favorites, totalFavorites, toggleFavorite, clearFavorites } = useFavorites();

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved === "dark" || (!saved && prefersDark);

    setDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <>
      {/* Dark mode tugma */}
      <button 
        onClick={toggle} 
        className="fixed top-6 right-[180px] z-50 w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-all"
      >
        {dark ? <Sun className="w-7 h-7 text-yellow-400" /> : <Moon className="w-7 h-7 text-indigo-600" />}
      </button>

      {/* Sevimlilar tugmasi */}
      <button 
        onClick={() => setShowFavorites(true)}
        className="fixed top-6 right-[100px] z-50"
      >
        <div className="relative">
          {totalFavorites > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {totalFavorites}
            </span>
          )}
          <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-all cursor-pointer">
            <Heart className="w-7 h-7 text-red-500 fill-red-500" />
          </div>
        </div>
      </button>

      {/* Savat tugmasi */}
      <button 
        onClick={() => setShowCart(true)}
        className="fixed top-6 right-6 z-50"
      >
        <div className="relative">
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
          <div className="w-14 h-14 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-all cursor-pointer">
            <ShoppingCart className="w-7 h-7 text-gray-700 dark:text-gray-300" />
          </div>
        </div>
      </button>

      {showFavorites && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4" 
          onClick={() => setShowFavorites(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Heart className="w-7 h-7 text-red-500 fill-red-500" />
                Sevimlilar
              </h2>
              <button 
                onClick={() => setShowFavorites(false)} 
                className="text-3xl hover:text-red-500 text-gray-600 dark:text-gray-300"
              >
                ×
              </button>
            </div>

            {favorites.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-xl">Sevimlilar bo'sh</p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">Mahsulotga ❤️ bosing!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {favorites.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 border dark:border-gray-700 p-4 rounded-lg"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-24 h-24 object-cover rounded" 
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {item.description}
                        </p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {item.price.toLocaleString('uz-UZ')} so'm
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => {
                            addToCart(item);
                          }}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm"
                        >
                          Savatga
                        </button>
                        <button 
                          onClick={() => toggleFavorite(item)}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
                        >
                          O'chirish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t dark:border-gray-700 pt-4">
                  <button 
                    onClick={() => {
                      if (confirm('Barcha sevimlilarni o\'chirmoqchimisiz?')) {
                        clearFavorites();
                      }
                    }}
                    className="w-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
                  >
                    Barchasini tozalash
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Savat Modal */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4" 
          onClick={() => setShowCart(false)}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Savat 🛒</h2>
              <button 
                onClick={() => setShowCart(false)} 
                className="text-3xl hover:text-red-500 text-gray-600 dark:text-gray-300"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-xl">Savat bo'sh</p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">Mahsulot qo'shing!</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-4 border-b dark:border-gray-700 pb-4"
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded" 
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.price.toLocaleString('uz-UZ')} so'm
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold"
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

                <div className="border-t dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    <span>Jami:</span>
                    <span>{getTotalPrice().toLocaleString('uz-UZ')} so'm</span>
                  </div>
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        clearCart();
                        setShowCart(false);
                      }}
                      className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium"
                    >
                      Tozalash
                    </button>
                    <button 
                      onClick={() => {
                        alert(`Buyurtma qabul qilindi! 🎉\n\nJami: ${getTotalPrice().toLocaleString('uz-UZ')} so'm`);
                        clearCart();
                        setShowCart(false);
                      }}
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

      <RouterProvider router={routes} />
    </>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </FavoritesProvider>
  );
}