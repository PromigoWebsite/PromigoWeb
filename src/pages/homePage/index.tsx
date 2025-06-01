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

    const fetchNewestPromo = ()=>{
      PromoAPI.newest()
      .then((res)=>{
        setNewestPromos(res.data);
      })
      .catch((err)=>{
        if(err instanceof AxiosError){
          toast.error(err?.response?.data?.message || err.message);
        }
      })
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
      fetchReccomendation();
    },[]);

    useEffect(()=>{
      console.log(newestPromos);
    },[newestPromos]);

    return (
      <div className="p-6 bg-gray-50 flex justify-center">
        <div className="max-w-screen-xl w-full flex flex-col">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {brands
                .slice(0, brandExpanded ? brands.length : 4)
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-lg flex flex-col items-center transition-transform transition-duration-300 ease-in-out transform hover:scale-105"
                  >
                    <div className="w-20 h-20 rounded-full border border-gray-300 overflow-hidden border-gray-300 bg-gray-100 flex items-center justify-center">
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
            <Carousel className="pb-4">
              {reccomendations.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex-grow-0 hover:scale-105"
                  style={{
                    flex: "0 0 auto",
                    width: "auto",
                    marginRight: "1rem",
                  }}
                >
                  <button
                    className="flex flex-col bg-white rounded-lg shadow-lg p-4  inset-shadow-2xs cursor-pointer"
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <img
                      src={api.baseCloudPath + item?.path}
                      alt="img"
                      className="rounded-md size-[300px]"
                    />
                    <h3 className="text-lg font-semibold mt-3 self-start">
                      {item?.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <img
                        src={api.baseCloudPath + item?.logo}
                        alt="logo"
                        className="w-6 h-6 rounded-full border border-gray-300"
                      />
                      <span className="text-sm text-gray-600">
                        {item?.brand_name}
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
          {/* Newest Promo Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Promo Terbaru</h2>
            <Carousel className="pb-4">
              {newestPromos.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex-grow-0 hover:scale-105"
                  style={{
                    flex: "0 0 auto",
                    width: "auto",
                    marginRight: "1rem",
                  }}
                >
                  <button
                    className="flex flex-col bg-white rounded-lg shadow-lg p-4  inset-shadow-2xs cursor-pointer"
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <img
                      src={api.baseCloudPath + item.path}
                      alt="img"
                      className="w-[250px] h-[275px] rounded-md"
                    />
                    <div className="flex flex-col justify-center h-[70px]">
                      <div className="text-sm font-medium max-w-52 text-center line-clamp-2 ">
                        {item.name}
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    );
}


