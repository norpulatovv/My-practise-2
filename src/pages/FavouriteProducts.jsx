// src/pages/FavouriteProducts.jsx
import React, { useState, useEffect } from 'react';

export default function FavouriteProducts() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('favourites') || '[]');
    setFavourites(saved);

    // Agar boshqa tabda o‘zgarsa, bu yerda ham yangilansin
    const handleUpdate = () => {
      setFavourites(JSON.parse(localStorage.getItem('favourites') || '[]'));
    };
    window.addEventListener('storage', handleUpdate);
    return () => window.removeEventListener('storage', handleUpdate);
  }, []);

  // Sevimlidan o‘chirish funksiyasi
  const removeFromFavourite = (id) => {
    let favs = JSON.parse(localStorage.getItem('favourites') || '[]');
    favs = favs.filter(item => item.id !== id);
    localStorage.setItem('favourites', JSON.stringify(favs));
    setFavourites(favs);
  };

  if (favourites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <p className="text-2xl text-gray-600 mb-4">Hali hech qanday sevimli mahsulot yo‘q</p>
        <a href="/" className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Mahsulotlarga qaytish
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Sevimli Mahsulotlar ({favourites.length} ta)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favourites.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="relative h-64 bg-gray-100">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <button
                  onClick={() => removeFromFavourite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition z-10"
                >
                  <span className="text-2xl">❤️</span>
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.price?.toLocaleString('uz-UZ')} so'm
                  </span>
                  <button className="px-6 py-2 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-red-500 hover:text-white hover:border-red-500 transition font-medium">
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