import { useEffect, useState } from 'react';
import { Promo } from '../../models/Promo';
import { PromoAPI } from '../../apis/PromoAPI';
import Lucide from '../../basic_components/Lucide';
import { AxiosError } from 'axios';
import { toast } from "react-toastify";
import {  useNavigate, useSearchParams } from 'react-router-dom';
import { PromoFilter } from '../../models/Promo_filter';
import { BrandAPI } from '../../apis/BrandAPI';
import { Brand } from '../../models/Brand';
import clsx from 'clsx';


export default function PromoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || '';
  const [isLoading,setIsLoading] = useState<boolean>(false);

  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState<PromoFilter>({
    type:"",
    category:'',
    brand:'',
  });

  const [promos,setPromo] = useState<Array<Promo>>([]);
  const [brands, setBrands] = useState<Array<Brand>>([]);
  const promoTypes = [
    'Diskon',
    'Cashback',
    'Gratis Ongkir'
  ];

  const promoCategories = [
    'Makanan',
    'Minuman',
    'Elektronik',
  ]; 

  const [reset, setReset] = useState<boolean>(false);
  const [applyChanges, setApplyChanges] = useState<boolean>(false);
  const [categoryChecked,setCategoryChecked] = useState<boolean>(true);
  const [promoTypeChecked, setPromoTypeChecked] = useState<boolean>(true);
  // const debouncedSearchTerm = useDebounce(search, 600);


  const getBrands = ()=>{
    BrandAPI.all()
      .then((res) => {
        setBrands(res?.data);
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          toast.error(e?.response?.data?.message || e?.message);
        }
      });
  }

  const getItems = ()=>{
    setIsLoading(true)
    PromoAPI.all({ search: search, sort: sort ,filter: filter})
      .then((res) => {
        // console.log(res.data.data);
        setPromo(res?.data);
        setIsLoading(false);
      })
      .catch((e) => {
        if (e instanceof AxiosError) {
          toast.error(e?.response?.data?.message || e?.message);
        }
      });
  };

  const checkBox = (
    filterCategory: keyof PromoFilter,
    filterValue: string | undefined,
  ) => {
    return (
      <>
        <label>
          <input
            type="checkbox"
            checked={filter[filterCategory] === filterValue}
            onChange={() => {
              setFilter((prev) => ({
                ...prev,
                [filterCategory]:
                  prev[filterCategory] === filterValue ? "" : filterValue,
              }));
            }}
            className="mr-1"
          />
          {filterValue}
        </label>
        <br />
      </>
    );
  };

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(()=>{
    getItems();
  },[reset,applyChanges,search])


  useEffect(() => {
    console.log(filter);
  }, [filter]);
  
  

  return (
    <div className="flex gap-4 p-4">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <hr className="border-t border-gray-400 mt-2 mb-4" />
        <div className="mb-4">
          <button
            className="font-semibold flex"
            onClick={() => {
              setPromoTypeChecked(!promoTypeChecked);
            }}
          >
            Jenis Promo
            {promoTypeChecked ? (
              <div>
                <Lucide
                  icon="ChevronUp"
                  className="ml-2 h-[25px] stroke-2 relative pt-1"
                />
              </div>
            ) : (
              <div>
                <Lucide
                  icon="ChevronDown"
                  className="ml-2 h-[25px] stroke-2 relative"
                />
              </div>
            )}
          </button>

          {promoTypeChecked && (
            <div className="space-y-1 mt-2">
              {promoTypes.map((type) => checkBox("type", type))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <button
            className="font-semibold flex"
            onClick={() => {
              setCategoryChecked(!categoryChecked);
            }}
          >
            Kategori
            {categoryChecked ? (
              <div>
                <Lucide
                  icon="ChevronUp"
                  className="ml-2 h-[25px] stroke-2 relative pt-1"
                />
              </div>
            ) : (
              <div>
                <Lucide
                  icon="ChevronDown"
                  className="ml-2 h-[25px] stroke-2 relative"
                />
              </div>
            )}
          </button>

          {categoryChecked && (
            <div className="space-y-1 mt-2">
              {promoCategories.map((category) =>
                checkBox("category", category)
              )}
            </div>
          )}
        </div>

        {/* <div className="mb-4">
          <button
            className="font-semibold flex"
            onClick={() => {
              setBrandChecked(!brandChecked);
            }}
          >
            Brand
            {brandChecked ? (
              <div>
                <Lucide
                  icon="ChevronUp"
                  className="ml-2 h-[25px] stroke-2 relative pt-1"
                />
              </div>
            ) : (
              <div>
                <Lucide
                  icon="ChevronDown"
                  className="ml-2 h-[25px] stroke-2 relative"
                />
              </div>
            )}
          </button>

          {brandChecked && (
            <div className="space-y-1 mt-2">
              {brands.map((brand) => checkBox("brand", brand.name))}
            </div>
          )}
        </div> */}
        <button
          className="mb-5 text-[#567C8D] w-32 align-middle border-2 flex justify-center border-[#567C8D] hover:bg-[#567C8D] hover:text-white cursor-pointer"
          onClick={() => {
            setApplyChanges(!applyChanges);
          }}
        >
          Terapkan
        </button>
        <button
          className="text-[#567C8D] w-32 align-middle border-2 flex justify-center border-[#567C8D] hover:bg-[#567C8D] hover:text-white cursor-pointer"
          onClick={() => {
            setFilter({
              type: "",
              category: "",
            });
            setReset(!reset);
          }}
        >
          Hapus
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/*  Sort */}
        <div className="flex justify-between items-center mb-4">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Urutkan</option>
            <option value="DESC">Terbaru</option>
          </select>
        </div>
        <div className="flex mb-3 gap-2 flex-wrap">
          {brands.map((brand) => (
            <button
              className={clsx([
                "border border-gray-500 px-4 py-2 flex",
                brand.name == filter.brand
                  ? "bg-[#063EB8] text-white"
                  : "bg-[#567C8D] text-white rounded",
              ])}
              onClick={() => {
                if (brand.name == filter.brand) {
                  setFilter((prev) => ({
                    ...prev,
                    brand: "",
                  }));
                } else {
                  setFilter((prev) => ({
                    ...prev,
                    brand: brand.name,
                  }));
                }

                setApplyChanges(!applyChanges);
              }}
            >
              {brand.name}
            </button>
          ))}
        </div>

        {/* Products */}
        {!isLoading && (
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-12 gap-4">
            {promos.map((product, index) => (
              <div
                key={index}
                className=" col-span-3 rounded-lg p-4 bg-white shadow hover:shadow-xl transition flex flex-col items-center border border-gray-300"
                onClick={() => {
                  navigate(`/detail/${product.id}`);
                }}
              >
                <img
                  src={product.path}
                  alt="promos"
                  className="w-56 h-[270px] object-fit rounded mb-2 self-center"
                />
                {/* <div className="text-sm font-semibold text-red-500">
                {product.discount}%
              </div> */}
                <div className="text-lg font-bold mt-1 text-center">
                  {product.name}
                </div>
                <div className="text-gray-600 text-sm">
                  {product.brand_name}
                </div>
              </div>
            ))}
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <Lucide icon="LoaderCircle" className={`size-14 animate-spin `} />
          </div>
        )}
      </div>
    </div>
  );
}
