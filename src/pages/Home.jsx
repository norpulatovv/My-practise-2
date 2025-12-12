import React from 'react';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Heart } from 'lucide-react';

function Home() {
  const { data: products, loading, error } = useFetch('http://localhost:3001/products');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
        <p className="text-xl text-red-500 mb-4">Xatolik: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Qayta urinish
        </button>
      </div>
    );
  }

  return (
    <div className='bg-[white]'>
      <div className="max-w-10xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Bizning Mahsulotlar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="relative h-64 bg-gray-100 dark:bg-gray-700">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => toggleFavorite(product)}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:scale-110 transition"
                >
                  <Heart 
                    className={`w-6 h-6 transition-all ${
                      isFavorite(product.id) 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {product.price ? product.price.toLocaleString('uz-UZ') : '0'} so'm
                  </span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="px-6 py-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;