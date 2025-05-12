import { PromoAPI } from "../../apis/PromoAPI";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Promo } from "../../models/Promo";
import { Brand } from "../../models/Brand";
import dayjs from "dayjs";
export default function Main() {
  const [promo, setPromo] = useState<Promo>();
  const [brand, setBrand] = useState<Brand>();
  const params = useParams();
  

  const getItems = () => {
    PromoAPI.get(params?.id).then((res) => {
      const promoData = res.data.promo;
      setPromo({
        ...promoData,
        terms: promoData.terms ? JSON.parse(promoData.terms) : [],
      });

      setBrand(res.data.brandInfo);
    });
  };

  useEffect(() => {
    if (params?.id && !isNaN(+params.id)) {
      getItems();
    }
  }, []);

  useEffect(() => {
    console.log(promo);
  }, [promo]);
  return (
    <div className="flex flex-col md:flex-row p-6 md:justify-center">
      {/* Left Section */}

      <div className="flex flex-col mr-8">
        <div className="rounded-xl shadow-md p-8 mb-4 border border-gray-300">
          <img
            src={promo?.path}
            alt="Promo Ngabuburit"
            className="w-[500px] h-auto rounded-lg"
          />
        </div>

        <div className="rounded-xl shadow-md p-4 border border-gray-300">
          <div className="flex flex-col">
            <div className="font-bold text-lg">Location</div>
            <div className="break-words">{brand?.address}</div>
          </div>
          <div>
            <div className="font-bold text-lg">Telephone</div>
            {brand?.mobile}
          </div>
          {/* <h2 className="font-bold text-lg mb-2">Follow Us</h2>
          <div className="flex gap-4 text-2xl">
            <i className="fab fa-tiktok"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-x-twitter"></i>
          </div> */}
        </div>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 bg-white rounded-xl shadow-md px-8 py-6 border border-gray-300">
        <div className="flex justify-between items-start ">
          <div>
            <div className="text-[40px] mt-4 pr-9 font-bold mb-7 ">
              {promo?.name}
            </div>
            <div className="text-gray-700 text-xl">{brand?.name}</div>
          </div>
          <img
            src={brand?.logo}
            alt="Brand Logo"
            className="size-32 borderobject-contain"
          />
        </div>
        <hr className="border-t border-black mt-2 mb-4" />

        <div className="flex mb-4">
          <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-md mr-4 flex items-center">
            {promo?.type}
          </div>
          <div className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-md flex items-center">
            {promo?.category}
          </div>
          <span className="ml-auto text-sm text-gray-500">175k Like ♡</span>
        </div>

        <p className="mb-4 pr-11">{promo?.description}</p>

        <div className="mb-2">
          <h2 className="font-semibold mb-2 text-xl">Validity</h2>
          <ul className="list-disc pl-5 text-md">
            <li>
              Valid until{" "}
              {promo?.ended_at
                ? dayjs(promo.ended_at).format("MMMM D, YYYY")
                : "Undefined"}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold mb-2 text-xl">Terms and Conditions</h2>
          <ul className="list-disc pl-5 space-y-1 text-md">
            {promo?.terms?.length != 0 ? (
              promo?.terms?.map((term, index) => <li key={index}>{term}</li>)
            ) : (
              <li>There are no Terms and Condition for this promo</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
