import { useEffect, useState } from "react";
import { Brand } from "../../models/Brand";
import { Promo } from "../../models/Promo";
import { BrandAPI } from "../../apis/BrandAPI";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { User } from "../../models/User";
import api from "../../apis/api";
import Lucide from "../../basic_components/Lucide";

const BrandPage = () => {
  const [brand, setBrand] = useState<Brand>();
  const [user, setUser] = useState<User>();
  const [promos, setPromos] = useState<Array<Promo>>([]);
  const [showAllPromos, setShowAllPromos] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const fetchBrandProfile = () => {
    if (params.id) {
      BrandAPI.getById(+params.id)
        .then((res) => {
          console.log(res);
          setBrand(res.data.brand);
          setUser(res.data.user);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    }
  };

  const fetchPromo = () => {
    if (params.id) {
      BrandAPI.getRelatedPromo({
        page: 0,
        id: +params.id,
      })
        .then((res) => {
          setPromos(res.data);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    }
  };

  const displayedPromos = showAllPromos ? promos : promos.slice(0, 4);

  useEffect(() => {
    fetchBrandProfile();
    fetchPromo();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-6 space-y-16">
      {/* Header */}
      <div className="text-center">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
          <img
            src={api.baseCloudPath + brand?.logo}
            alt="Brand Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-3xl font-bold mt-6">{brand?.name}</div>
        <div className="text-gray-700 mt-2">{user?.email}</div>
      </div>

      {/* Tentang */}
      <div className="border rounded-lg p-8 bg-white shadow">
        <div className="text-2xl font-bold mb-4">Tentang {brand?.name}</div>
        <div className="leading-relaxed">{brand?.description}</div>
      </div>

      {/* List Promo */}
      <div className="border rounded-lg p-8 bg-white shadow">
        <div className="text-xl font-bold mb-8 text-center">List Promo</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayedPromos.map((promo, index) => (
            <div
              key={index}
              onClick={() => navigate(`/detail/${promo.id}`)}
              className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition h-full hover:scale-105 cursor-pointer"
            >
              <img
                src={api.baseCloudPath + promo.path}
                alt="Promo"
                className="rounded w-full h-64 object-cover mb-3"
              />
              <div
                className="text-sm text-gray-700 font-medium text-left line-clamp-2 mb-2"
                style={{
                  lineHeight: "1.5",
                  height: "calc(1.5em * 2)",
                  overflow: "hidden",
                }}
              >
                {promo.name}
              </div>
              <div className="flex items-center justify-start gap-2 text-gray-500 mt-2 text-sm">
                <Lucide icon="Heart" className="fill-red-500" />
                <span>{promo.favorite_count} suka</span>
              </div>
            </div>
          ))}
        </div>

        {promos.length > 4 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAllPromos(!showAllPromos)}
              className="px-8 py-3 border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
            >
              {showAllPromos ? "Show Less" : "More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandPage;
