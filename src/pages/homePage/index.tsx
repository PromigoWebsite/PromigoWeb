import { useEffect, useState } from "react";
import { Brand } from "../../models/Brand";
import { BrandAPI } from "../../apis/BrandAPI";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { PromoAPI } from "../../apis/PromoAPI";
import { Promo } from "../../models/Promo";

export default function Main() {

    const [brands,setBrands] = useState<Array<Brand>>([]);
    const [newestPromos, setNewestPromos] = useState<Array<Promo>>([]);
    const [reccomendations, setReccomendations] = useState<Array<Promo>>([]);

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
      <div className="p-6 bg-white flex justify-center">
        <div className="max-w-screen-2xl px-25 w-full">
          {/* Promo Banner */}
          <div className="w-full h-auto rounded-lg overflow-hidden shadow-md -mt-2">
            <img
              src="https://res.cloudinary.com/duht72unt/image/upload/v1742742517/KFCPromotional_kof3bx.jpg"
              alt="KFC Promo"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Affiliate Brand Section */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Affiliate Brand</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {brands.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-lg flex flex-col items-center transition-transform transform hover:scale-105"
                >
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.category}</p>
                  {/* <p className="text-xs mt-1 text-red-500 flex items-center">
                    ❤ {brand.likes} Likes
                  </p> */}
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Recommendation</h2>
            <div className="flex gap-6">
              <div className="bg-white rounded-lg shadow-lg p-4 w-2/3">
                <img
                  src={reccomendations[0]?.path}
                  alt="Starbucks Promo"
                  className="w-full h-96 rounded-md"
                />
                <h3 className="text-lg font-semibold mt-3">
                  {reccomendations[0]?.name}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={reccomendations[0]?.logo}
                    alt="Starbucks"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">
                    {reccomendations[0]?.brand_name}
                  </span>
                  <button className="ml-auto text-blue-500 font-semibold">
                    Follow
                  </button>
                </div>
                <div className="flex justify-between mt-3 text-gray-500 text-sm">
                  <button>👍 Like</button>
                  <button>💬 Share</button>
                  <button>⭐ Favorite</button>
                </div>
              </div>
              <div className="w-1/3 flex flex-col gap-2">
                {reccomendations.map(
                  (item, index) =>
                    index !== 0 && (
                      <img
                        key={index}
                        src={item.path}
                        alt={item.name || "Promo Image"}
                        className="w-72 h-48 rounded-lg shadow-md"
                      />
                    )
                )}
              </div>
            </div>
          </div>

          {/* Newest Promo Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Newest Promo</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newestPromos.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-3">
                  <img
                    src={item.path}
                    alt={item.name}
                    className="w-full rounded-md"
                  />
                  <h3 className="text-sm font-medium mt-2">{item.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}




// const brands = [
//     { name: "Starbucks", category: "Food / Drink", logo: starbucksLogo, likes: "14.5k" },
//     { name: "HokBen", category: "Food / Drink", logo: hokbenLogo, likes: "7.5k" },
//     { name: "A&W", category: "Food / Drink", logo: awLogo, likes: "14.5k" },
//     { name: "Bakmie EF", category: "Food / Drink", logo: bakmieLogo, likes: "9.8k" },
// ];

// const newestPromos = [
//     { name: "Pizza Hut Double Pizza 50% Off", image: pizzaHutPromo },
//     { name: "Pizza Hut Double Pizza 50% Off", image: pizzaHutPromo },
//     { name: "Pizza Hut Double Pizza 50% Off", image: pizzaHutPromo },
//     { name: "Pizza Hut BCA Cashback 40%", image: pizzaHutPromo },
// ];

