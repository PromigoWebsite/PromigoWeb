import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { PromoAPI } from "../../apis/PromoAPI";
import { Promo } from "../../models/Promo";
import { User } from "../../models/User";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "@uidotdev/usehooks";
import Lucide from "../../basic_components/Lucide";
import { FavoriteAPI } from "../../apis/FavoriteAPI";
import api from "../../apis/api";

export default function FavoritePage() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [orderBy, setOrderBy] = useState<string>("");
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchQuery, 600);

  const fetchFavorite = () => {
    setLoading(true);

    FavoriteAPI.all({ search: searchQuery, orderBy: orderBy }).then((res) => {
      // dd(res.data.user)
      setPromos(res.data.favorite);
      setUser(res.data.user);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchFavorite();
  }, [debouncedSearchTerm, orderBy]);

  return (
    <div className="bg-[#e6e8ec] rounded-2xl min-h-screen font-serif p-0">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-10 pt-8 pb-4">
          <div className="text-3xl font-extrabold tracking-wide text-gray-800 select-none">
            Favorite Promo
          </div>
          <div className="flex items-center justify-center bg-white rounded-2xl shadow-lg px-6 py-3 border space-x-4 min-w-[220px]">
            {/* <img
              src={user?.profile_picture}
              alt="Avatar"
              className="w-12 h-12 rounded-full border object-cover"
            /> */}
            <div className="text-2xl font-extrabold text-gray-900">
              {user?.username}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 px-10">
          <div className="flex flex-1 bg-white rounded-xl shadow-md px-6 py-3 border items-center gap-4">
            <input
              type="text"
              placeholder="Cari berdasarkan nama"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none bg-[#e6e8ec] text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <label className="px-6 py-2 bg-[#7b8fa1] text-white rounded-md text-base font-semibold shadow">
              Urutkan
            </label>
            <select
              className="px-4 py-2 border border-gray-300 rounded-md text-base bg-[#e6e8ec]"
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="name">Nama</option>
              <option value="newest">Favorit terbaru</option>
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
                    className="bg-white rounded-2xl border border-gray-300 shadow-lg overflow-hidden flex flex-col h-full relative cursor-pointer hover:scale-105"
                    onClick={() => navigate(`/detail/${promo.id}`)}
                  >
                    <div className="w-full flex justify-center items-start pt-4 pb-2 bg-white">
                      <img
                        src={api.baseCloudPath + promo.path}
                        alt={promo.name}
                        className="w-[90%] h-72 object-cover rounded-xl shadow-sm"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between px-4 pt-2 pb-6">
                      <div className="text-lg font-serif font-medium text-gray-500 leading-tight mb-8 text-left">
                        {promo.name}
                      </div>
                      <button
                        className="absolute bottom-4 flex items-center text-gray-400 text-base cursor-pointer hover:scale-110"
                        onClick={(e) => {
                          e.stopPropagation(); 
                          FavoriteAPI.remove(promo.id).then(() => {
                            fetchFavorite();
                          });
                        }}
                      >
                        <Lucide
                          icon="Heart"
                          className="size-6 mr-2 fill-red-500"
                        />
                        <div className="font-light">
                          {promo.favorite_count} Like
                        </div>
                      </button>
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
