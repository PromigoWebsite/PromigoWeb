import { useEffect, useState } from "react";
import { Brand } from "../../models/Brand";
import { BrandAPI } from "../../apis/BrandAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { PromoAPI } from "../../apis/PromoAPI";
import { Promo } from "../../models/Promo";
import { useNavigate } from "react-router-dom";
import Lucide from "../../basic_components/Lucide";
import Carousel from "../../basic_components/Carousel";
import api from "../../apis/api";


export default function Main() {
    const navigate = useNavigate();
    const [brands,setBrands] = useState<Array<Brand>>([]);
    const [newestPromos, setNewestPromos] = useState<Array<Promo>>([]);
    const [newestFood, setNewestFood] = useState<Array<Promo>>([]);
    const [newestDrink, setNewestDrink] = useState<Array<Promo>>([]);
    const [reccomendations, setReccomendations] = useState<Array<Promo>>([]);
    const [brandExpanded, setBrandExpanded] = useState(false);

    const fetchBrand = ()=>{
      BrandAPI.all()
      .then((res)=>{
        setBrands(res.data);
       
      })
      .catch((err)=>{
        if(err instanceof AxiosError){
          toast.error(err?.response?.data?.message || err.message);
        }
      })
    };  

    const fetchNewestPromo = () => {
      PromoAPI.newest() // Tanpa parameter category, untuk semua promo
        .then((res) => {
          setNewestPromos(res.data);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    };

    const fetchNewestFood = () => {
      PromoAPI.newest("Makanan") // Dengan parameter category 'Food'
        .then((res) => {
          setNewestFood(res.data);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    };

    const fetchNewestDrink = () => {
      PromoAPI.newest("Minuman") // Dengan parameter category 'Drink'
        .then((res) => {
          setNewestDrink(res.data);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    };

    const fetchReccomendation = () => {
      PromoAPI.reccomendation()
        .then((res) => {
          setReccomendations(res.data);
        })
        .catch((err) => {
          if (err instanceof AxiosError) {
            toast.error(err?.response?.data?.message || err.message);
          }
        });
    };

    useEffect(()=>{
      fetchBrand();
      fetchNewestPromo();
      fetchNewestDrink();
      fetchNewestFood();
      fetchReccomendation();
    },[]);

    useEffect(()=>{
      console.log(newestPromos);
    },[newestPromos]);

    return (
      <div className="p-6 bg-gray-50 flex justify-center">
        <div className="max-w-5/6 w-full flex flex-col">
          {/* Promo Banner */}
          <button
            className="w-full rounded-lg overflow-hidden shadow-md mt-2 self-center"
            onClick={() => navigate("/detail/6")}
          >
            <img
              src="https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/asset/promo/starbucks%20banner.png"
              alt="KFC Promo"
              className="object-cover"
            />
          </button>

          {/* brand */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Rekan Brand</h2>
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-6">
              {brands
                .slice(0, brandExpanded ? brands.length : 4)
                .map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/brand/${item.id}`)}
                    className="bg-white rounded-2xl p-4 shadow-lg flex flex-col items-center transition-transform transition-duration-300 ease-in-out transform hover:scale-105 col-span-3"
                  >
                    <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={api.baseCloudPath + item.logo}
                        alt={item.name}
                        className="object-contain"
                      />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                ))}
            </div>

            {brands.length > 4 && (
              <div className="flex justify-center mt-4">
                <button
                  className="text-blue-500 font-medium hover:text-blue-700 flex items-center transform transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => setBrandExpanded(!brandExpanded)}
                >
                  {brandExpanded ? (
                    <>
                      <div className="flex justify-end cursor-pointer">
                        Show less
                        <Lucide
                          icon="ChevronUp"
                          className="ml-1 w-4 h-4 mt-1.5 cursor-pointer"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-end cursor-pointer">
                      See more ({brands.length - 4} more){" "}
                      <Lucide
                        icon="ChevronDown"
                        className="ml-1 w-4 h-4 mt-1.5"
                      />
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Recommendation Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Rekomendasi</h2>
            <Carousel slideSize="300px">
              {reccomendations.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform duration-300 ease-in-out hover:scale-105 py-4"
                >
                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-lg bg-white h-full">
                    <button
                      className="flex flex-col cursor-pointer w-full h-full p-4"
                      onClick={() => navigate(`/detail/${item.id}`)}
                    >
                      <img
                        src={api.baseCloudPath + item?.path}
                        alt="img"
                        className="w-full aspect-[6/7] rounded-md"
                      />
                      <h3 className="text-lg font-semibold mt-3 text-left line-clamp-2 min-h-[2.8em]">
                        {item?.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={api.baseCloudPath + item?.logo}
                          alt="logo"
                          className="w-7 h-7 rounded-full border border-gray-300 flex-shrink-0"
                        />
                        <span className="text-base text-gray-600 truncate font-medium">
                          {item?.brand_name}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Newest Promo Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Promo Terbaru</h2>
            <Carousel slideSize="280px">
              {newestPromos.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform duration-300 ease-in-out hover:scale-105 py-4"
                >
                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-lg bg-white h-full">
                    <button
                      className="flex flex-col cursor-pointer w-full h-full p-4"
                      onClick={() => {
                        navigate(`/detail/${item.id}`);
                      }}
                    >
                      <img
                        src={api.baseCloudPath + item.path}
                        alt="img"
                        className="w-full aspect-[10/11] rounded-md"
                      />
                      <div className="text-sm font-semibold text-left line-clamp-1 mt-3 min-h-[1.5em]">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={api.baseCloudPath + item?.logo}
                          alt="logo"
                          className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-600 truncate">
                          {item?.brand_name}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          {/* Newest Food Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Makanan Terbaru</h2>
            <Carousel className="pb-4 pt-4" slideSize="280px">
              {newestFood.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform duration-300 ease-in-out hover:scale-105 py-4"
                >
                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-lg bg-white h-full">
                    <button
                      className="flex flex-col cursor-pointer w-full h-full p-4"
                      onClick={() => {
                        navigate(`/detail/${item.id}`);
                      }}
                    >
                      <img
                        src={api.baseCloudPath + item.path}
                        alt="img"
                        className="w-full aspect-[10/11] rounded-md"
                      />
                      <div className="text-sm font-semibold text-left line-clamp-1 mt-3 min-h-[1.5em]">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={api.baseCloudPath + item?.logo}
                          alt="logo"
                          className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-600 truncate">
                          {item?.brand_name}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          {/* Newest Drink Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Minuman Terbaru</h2>
            <Carousel className="pb-4 pt-4" slideSize="280px">
              {newestDrink.map((item, index) => (
                <div
                  key={index}
                  className="transition-transform duration-300 ease-in-out hover:scale-105 py-4"
                >
                  <div className="border border-gray-300 rounded-2xl overflow-hidden shadow-lg bg-white h-full">
                    <button
                      className="flex flex-col cursor-pointer w-full h-full p-4"
                      onClick={() => {
                        navigate(`/detail/${item.id}`);
                      }}
                    >
                      <img
                        src={api.baseCloudPath + item.path}
                        alt="img"
                        className="w-full aspect-[10/11] rounded-md"
                      />
                      <div className="text-sm font-semibold text-left line-clamp-1 mt-3 min-h-[1.5em]">
                        {item.name}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src={api.baseCloudPath + item?.logo}
                          alt="logo"
                          className="w-6 h-6 rounded-full border border-gray-300 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-600 truncate">
                          {item?.brand_name}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
}


