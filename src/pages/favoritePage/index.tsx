import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import dapurcoklat from "../../assets/logodapurcokelat.jpg";
import Hokben from "../../assets/HokbenFavoritepage.png";

interface Promo {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
}

export default function FavoritePage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Temporary data
    const tempPromos: Promo[] = [
      {
        id: 1,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 1332
      },
      {
        id: 2,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 335
      },
      {
        id: 3,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 193
      },
      {
        id: 4,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 199
      },
      {
        id: 5,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 233
      },
      {
        id: 6,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 212
      },
      {
        id: 7,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 166
      },
      {
        id: 8,
        title: "Promo Hokben Payday Deals Rp 50 Ribuan/Orang",
        imageUrl: Hokben,
        likes: 183
      }
    ];

    setPromos(tempPromos);
    setLoading(false);
  }, []);

  return (
    <div className="bg-[#e6e8ec] min-h-screen font-serif p-0">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-10 pt-8 pb-4">
          <div className="text-3xl font-extrabold tracking-wide text-gray-800 select-none">
            PROMIGO
          </div>
          <div className="flex items-center bg-white rounded-2xl shadow-lg px-6 py-3 border space-x-4 min-w-[420px]">
            <img
              src={dapurcoklat}
              alt="Avatar"
              className="w-12 h-12 rounded-full border object-cover"
            />
            <div className="text-2xl font-extrabold text-gray-900">
              Llyod Frontera's Favorite Promo
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 px-10">
          <div className="flex flex-1 bg-white rounded-xl shadow-md px-6 py-3 border items-center gap-4">
            <input
              type="text"
              placeholder="Search by name"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-[#e6e8ec] text-lg"
            />
            <button className="px-6 py-2 bg-[#7b8fa1] text-white rounded-md text-base font-semibold shadow hover:bg-[#5a6b7a] transition">
              Options
            </button>
            <select className="px-4 py-2 border border-gray-300 rounded-md text-base bg-[#e6e8ec]">
              <option>Sort By : Name</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-10 px-10 pb-10">
          <div className="bg-[#5a6b7a] rounded-2xl p-8">
            {loading ? (
              <div className="text-center text-white text-lg">Loading...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {promos.map((promo) => (
                  <div
                    key={promo.id}
                    className="bg-white rounded-2xl border border-gray-300 shadow-lg overflow-hidden flex flex-col h-full relative"
                  >
                    <div className="w-full flex justify-center items-start pt-4 pb-2 bg-white">
                      <img
                        src={promo.imageUrl}
                        alt={promo.title}
                        className="w-[90%] h-72 object-cover rounded-xl shadow-sm"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between px-4 pt-2 pb-6">
                      <div className="text-lg font-serif font-medium text-gray-700 leading-tight mb-8 text-left">
                        {promo.title}
                      </div>
                      <div className="absolute bottom-4 right-6 flex items-center text-gray-400 text-base">
                        <Heart className="w-5 h-5 mr-2 text-gray-400" strokeWidth={2} fill="none" />
                        <div className="font-light">{promo.likes.toLocaleString()} Like</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
