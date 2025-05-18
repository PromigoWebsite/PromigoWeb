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
import { AuthAPI } from "../../apis/authAPI";
import axios from "../../apis/axios";
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

    const checkLogin = async ()=>{
      const user = axios.get('/user');
      console.log(user);
    };

    useEffect(() => {
      checkLogin();
    }, []);

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
          <div className="w-full rounded-lg overflow-hidden shadow-md mt-2 self-center">
            <img
              src="https://wfovnuzxqrgmlgcrahdm.supabase.co/storage/v1/object/public/promigocloud/asset/promo/starbucks%20banner.png"
              alt="KFC Promo"
              className="object-cover"
            />
          </div>

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
                        src={item.logo}
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
                      Show less{" "}
                      <Lucide icon="ChevronUp" className="ml-1 w-4 h-4" />
                    </>
                  ) : (
                    <div className="flex justify-end">
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
            <div className="flex gap-6">
              <button
                className="flex flex-col bg-white rounded-lg shadow-lg p-4  inset-shadow-2xs hover:scale-105"
                onClick={() => {
                  navigate(`/detail/${reccomendations[0].id}`);
                }}
              >
                <img
                  src={reccomendations[0]?.path}
                  alt="Starbucks Promo"
                  className="rounded-md size-[400px]"
                />
                <h3 className="text-lg font-semibold mt-3 self-start">
                  {reccomendations[0]?.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={reccomendations[0]?.logo}
                    alt="Starbucks"
                    className="w-6 h-6 rounded-full border border-gray-300"
                  />
                  <span className="text-sm text-gray-600">
                    {reccomendations[0]?.brand_name}
                  </span>
                </div>
                <div className="flex justify-start mt-3 text-gray-500 text-sm">
                  <Lucide
                    icon="Star"
                    className="h-[18px] fill-yellow-300  mr-1"
                  />
                  <button>Favorite</button>
                </div>
              </button>
              <div className="w-1/3 flex flex-col justify-between">
                {reccomendations.map(
                  (item, index) =>
                    index !== 0 && (
                      <button
                        onClick={() => {
                          navigate(`/detail/${item.id}`);
                        }}
                      >
                        <img
                          key={index}
                          src={item.path}
                          alt={item.name || "Promo Image"}
                          className="h-40 w-36 rounded-lg shadow-md hover:scale-105"
                        />
                      </button>
                    )
                )}
              </div>
            </div>
          </div>
          {/* Newest Promo Section */}
          <div className="w-full flex flex-col mt-10">
            <h2 className="text-2xl font-semibold mb-4">Promo Terbaru</h2>
            <Carousel className="pb-2">
              {newestPromos.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex-grow-0"
                  style={{
                    flex: "0 0 auto",
                    width: "auto",
                    marginRight: "1rem",
                  }}
                >
                  <button
                    className="bg-white h-[350px] rounded-lg shadow-md p-3 hover:shadow-lg transition-all duration-300 flex flex-col"
                    onClick={() => {
                      navigate(`/detail/${item.id}`);
                    }}
                  >
                    <div className="flex justify-center max-w-[200px]">
                      <img
                        src={item.path}
                        alt={item.name}
                        className="object-fill rounded-md h-[250px]"
                      />
                    </div>
                    <div className="text-sm font-medium max-w-52 self-center">
                      {item.name}
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


